import type { Avatar } from "../types";
import { AudioPlayer } from "./AudioPlayer";

interface VoicePreviewProps {
  avatar: Avatar | null;
}

export function VoicePreview({ avatar }: VoicePreviewProps) {
  if (!avatar || !avatar.audioUrl) {
    return null;
  }

  return (
    <div className="mb-4">
      <AudioPlayer src={avatar.audioUrl} />
    </div>
  );
}
