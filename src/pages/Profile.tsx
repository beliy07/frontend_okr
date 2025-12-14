import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import { useGenerations } from "../lib/queries";
import { GenerationType, GenerationStatus } from "../types";

export default function Profile() {
  const { data = [], isLoading } = useGenerations();

  return (
    <div className="min-h-screen bg-neutral-900 pb-28">
      <div className="max-w-md mx-auto px-4 pt-6">
        <h2 className="text-xl font-semibold text-neutral-100 mb-6 text-center">
          Мои генерации
        </h2>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-neutral-400">
              <p>Загрузка...</p>
            </div>
          ) : data.length > 0 ? (
            data.map((item) => (
              <Link
                key={item.id}
                to={`/generation/${item.id}`}
                className="block"
              >
                <div className="bg-neutral-800 rounded-3xl p-3 relative overflow-hidden">
                  <div className="flex gap-3">
                    <div className="relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden">
                      <img
                        src={item.avatar.imageUrl}
                        alt={item.avatar.name}
                        className="w-full h-full object-cover"
                      />
                      {item.status !== GenerationStatus.COMPLETED && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          {item.status === GenerationStatus.FAILED ? (
                            <AlertCircle className="w-6 h-6 text-red-400" />
                          ) : (
                            <div className="spinner"></div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-neutral-400 line-clamp-2 mb-1">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <span>
                          {item.type === GenerationType.VIDEO
                            ? "Видео"
                            : "Аудио"}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString(
                            "ru-RU",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-neutral-400">
              <p>Вы еще ничего не создали</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
