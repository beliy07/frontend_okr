interface VideoSourceSelectorProps {
  value: "upload" | "ready";
  onChange: (value: "upload" | "ready") => void;
}

export function VideoSourceSelector({
  value,
  onChange,
}: VideoSourceSelectorProps) {
  return (
    <div className="mb-4">
      <div className="bg-neutral-800 rounded-3xl border border-neutral-700 overflow-hidden">
        <label className="block">
          <input
            type="radio"
            name="videoSource"
            value="ready"
            checked={value === "ready"}
            onChange={(e) => onChange(e.target.value as "upload" | "ready")}
            className="sr-only"
          />
          <div
            className={`p-3 transition-all cursor-pointer ${
              value === "ready" ? "bg-neutral-700" : "hover:bg-neutral-700/50"
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 ${
                  value === "ready"
                    ? "border-primary bg-primary"
                    : "border-neutral-500"
                }`}
              >
                {value === "ready" && (
                  <div className="w-2 h-2 rounded-full bg-neutral-900" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-neutral-100 mb-0.5">
                  Использовать готовое видео
                </h3>
                <p className="text-xs text-neutral-400">
                  Выберите из готовых видео шаблонов, которые уже настроены и
                  готовы к использованию
                </p>
              </div>
            </div>
          </div>
        </label>

        <div className="h-px bg-neutral-700" />

        <div className="opacity-60 cursor-not-allowed">
          <div className="p-3">
            <div className="flex items-start gap-2.5">
              <div className="flex-shrink-0 w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center mt-0.5"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-medium text-neutral-100">
                    Загрузить свое видео
                  </h3>
                  <span className="text-xs text-neutral-500 bg-neutral-700 px-2 py-0.5 rounded">
                    будет доступно позже
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Загрузите собственное видео файл для персонализации и создания
                  уникального контента
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
