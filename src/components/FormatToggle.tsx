import { GenerationType, type GenerationTypeValue } from "../types";

interface FormatToggleProps {
  format: GenerationTypeValue;
  onChange: (format: GenerationTypeValue) => void;
}

export function FormatToggle({ format, onChange }: FormatToggleProps) {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="relative bg-neutral-800 rounded-full p-1 flex items-center">
        <button
          onClick={() => onChange(GenerationType.VIDEO)}
          className={`relative z-10 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            format === GenerationType.VIDEO
              ? "text-neutral-900"
              : "text-neutral-400"
          }`}
        >
          Видео
        </button>
        <button
          onClick={() => onChange(GenerationType.AUDIO)}
          className={`relative z-10 px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            format === GenerationType.AUDIO
              ? "text-neutral-900"
              : "text-neutral-400"
          }`}
        >
          Аудио
        </button>
        <div
          className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ${
            format === GenerationType.VIDEO
              ? "left-1 w-[calc(50%-0.25rem)]"
              : "left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]"
          }`}
        />
      </div>
    </div>
  );
}
