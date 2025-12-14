import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AvatarSelector } from "../components/AvatarSelector";
import { FormatToggle } from "../components/FormatToggle";
import { VideoSourceSelector } from "../components/VideoSourceSelector";
import { VoicePreview } from "../components/VoicePreview";
import { PromptInput } from "../components/PromptInput";
import { GenerateButton } from "../components/GenerateButton";
import { useAvatars, useGenerate, useLimits } from "../lib/queries";
import { showAlert } from "../lib/telegramAlerts";
import { GenerationType, type GenerationTypeValue } from "../types";
import type { Avatar } from "../types";

export default function Generate() {
  const navigate = useNavigate();

  const { data: avatars = [], isLoading: loading } = useAvatars();
  const { data: limits } = useLimits();
  const generate = useGenerate();

  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [format, setFormat] = useState<GenerationTypeValue>(
    GenerationType.AUDIO
  );
  const [videoSource, setVideoSource] = useState<"upload" | "ready">("ready");
  const [text, setText] = useState("");

  const maxChars = format === GenerationType.AUDIO ? 250 : 170;
  const charCount = text.length;
  const isOverLimit = charCount > maxChars;
  const canGenerate =
    selectedAvatar && text.trim() && !isOverLimit && !generate.isPending;

  useEffect(() => {
    if (selectedAvatar) {
      setText(selectedAvatar.textTemplate);
    }
  }, [selectedAvatar]);

  const handleGenerate = async () => {
    if (!selectedAvatar || !text.trim() || isOverLimit) return;

    try {
      await generate.mutateAsync({
        avatarId: selectedAvatar.id,
        type: format,
        text: text.trim(),
      });

      navigate("/profile");
    } catch (error) {
      await showAlert("Ошибка. Попробуйте позже.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 pb-28">
      <div className="max-w-md mx-auto px-4 pt-4">
        <AvatarSelector
          avatars={avatars}
          selectedAvatar={selectedAvatar}
          onSelect={setSelectedAvatar}
          loading={loading}
        />

        <FormatToggle format={format} onChange={setFormat} />

        {format === GenerationType.VIDEO && (
          <VideoSourceSelector value={videoSource} onChange={setVideoSource} />
        )}

        <VoicePreview avatar={selectedAvatar} />

        <PromptInput value={text} onChange={setText} maxChars={maxChars} />

        <GenerateButton
          onClick={handleGenerate}
          disabled={!canGenerate}
          remainingCount={
            limits
              ? format === GenerationType.AUDIO
                ? limits.audio
                : limits.video
              : 0
          }
        />
      </div>
    </div>
  );
}
