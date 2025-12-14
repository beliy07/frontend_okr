interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  remainingCount?: number;
}

export function GenerateButton({
  onClick,
  disabled = false,
  remainingCount,
}: GenerateButtonProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full bg-primary text-black py-3 rounded-3xl font-medium text-base active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm">Сгенерировать</span>
          <span className="text-xs font-normal opacity-80">
            Осталось в декабре: {remainingCount}
          </span>
        </div>
      </button>
    </div>
  );
}
