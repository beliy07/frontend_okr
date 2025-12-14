import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import WebApp from "@twa-dev/sdk";

import { AudioPlayer } from "../components/AudioPlayer";
import { useGeneration } from "../lib/queries";
import { GenerationType, GenerationStatus } from "../types";

export default function GenerationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: generation, isLoading } = useGeneration(id ?? "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-large mb-4 mx-auto"></div>
          <p className="text-neutral-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!generation) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-4">Генерация не найдена</p>
          <Link to="/profile" className="text-primary hover:text-primary/80">
            Вернуться к профилю
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const telegramUrl = `https://t.me/mpit_okrug_bot/app?startapp=view_${generation.id}`;
    const shareText = `🎄 Новогоднее поздравление от ${generation.avatar.name}`;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      telegramUrl
    )}&text=${encodeURIComponent(shareText)}`;
    WebApp.openTelegramLink(shareUrl);
  };

  return (
    <div className="min-h-screen bg-neutral-900 pb-28">
      <div className="max-w-md mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/profile"
            className="text-neutral-400 hover:text-neutral-300"
          >
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold text-neutral-100 text-center flex-1">
            {generation.avatar.name}
          </h1>
          <div className="w-6" />
        </div>

        {generation.type === GenerationType.VIDEO ? (
          <div className="bg-neutral-800 rounded-3xl p-4 mb-6 relative overflow-hidden">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-700">
              {generation.status === GenerationStatus.COMPLETED &&
              generation.videoUrl ? (
                <video
                  src={generation.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={generation.avatar.imageUrl}
                    alt={generation.avatar.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                    <div className="spinner-large"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-700 mb-6">
            <img
              src={generation.avatar.imageUrl}
              alt={generation.avatar.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            {generation.status === GenerationStatus.COMPLETED &&
            generation.audioUrl ? (
              <div className="absolute bottom-4 left-4 right-4">
                <AudioPlayer src={generation.audioUrl} />
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                <div className="spinner-large"></div>
              </div>
            )}
          </div>
        )}

        <div className="bg-neutral-800 rounded-3xl p-4 mb-6">
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-400 mb-1">Промпт</p>
              <p className="text-sm text-neutral-100">{generation.text}</p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-700">
              <div>
                <p className="text-xs text-neutral-400">Формат</p>
                <p className="text-sm text-neutral-100">
                  {generation.type === GenerationType.VIDEO ? "Видео" : "Аудио"}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Дата создания</p>
                <p className="text-sm text-neutral-100">
                  {new Date(generation.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {generation.status === GenerationStatus.COMPLETED && (
          <div className="flex justify-center">
            <button
              onClick={handleShare}
              className="w-16 h-16 rounded-full bg-primary/20 hover:bg-primary/30 active:scale-95 transition-all flex items-center justify-center text-primary"
            >
              <Share2 size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
