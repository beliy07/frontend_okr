import type { Avatar } from "../types";

interface AvatarSelectorProps {
  avatars: Avatar[];
  selectedAvatar: Avatar | null;
  onSelect: (avatar: Avatar) => void;
  loading?: boolean;
}

export function AvatarSelector({
  avatars,
  selectedAvatar,
  onSelect,
  loading = false,
}: AvatarSelectorProps) {
  return (
    <div className="mb-4">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-1">
          {loading ? (
            <div className="text-neutral-400 text-sm py-2">Загрузка...</div>
          ) : avatars.length ? (
            avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => onSelect(avatar)}
                className="flex-shrink-0 flex flex-col items-center gap-2 transition-all"
              >
                <div
                  className={`w-16 h-16 rounded-full overflow-hidden border transition-all ${
                    selectedAvatar?.id === avatar.id
                      ? "border-primary"
                      : "border-neutral-600 hover:border-neutral-500"
                  }`}
                >
                  <img
                    src={avatar.imageUrl}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={`text-xs text-center max-w-[70px] truncate ${
                    selectedAvatar?.id === avatar.id
                      ? "text-primary"
                      : "text-neutral-400"
                  }`}
                >
                  {avatar.name}
                </span>
              </button>
            ))
          ) : (
            <div className="text-neutral-400 text-sm py-2">
              Нет доступных аватаров
            </div>
          )}
        </div>
      </div>

      {selectedAvatar && (
        <div className="mt-4 pt-4 border-t border-neutral-700">
          <span className="text-sm">
            <span className="text-neutral-400">Выбрано: </span>
            <span className="text-neutral-100">{selectedAvatar.name}</span>
          </span>
        </div>
      )}
    </div>
  );
}
