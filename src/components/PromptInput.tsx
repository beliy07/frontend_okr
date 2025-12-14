interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  maxChars: number;
}

export function PromptInput({ value, onChange, maxChars }: PromptInputProps) {
  const charCount = value.length;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="mb-4">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Введите текст поздравления..."
          className={`w-full bg-neutral-800 text-neutral-100 rounded-3xl p-4 min-h-[150px] resize-none focus:outline-none transition-all border ${
            isOverLimit
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-700 focus:border-primary"
          } placeholder:text-neutral-400`}
        />
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          <span
            className={`text-xs font-medium ${
              isOverLimit
                ? "text-red-400"
                : charCount > maxChars * 0.8
                ? "text-yellow-400"
                : "text-neutral-400"
            }`}
          >
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
    </div>
  );
}
