import { Link, useLocation } from "react-router-dom";
import { tabs } from "../config/tabs";
import WebApp from "@twa-dev/sdk";

export function TabBar() {
  const location = useLocation();

  const handleTabClick = (tabPath: string) => {
    if (location.pathname !== tabPath) {
      WebApp.HapticFeedback.selectionChanged();
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md">
        <div className="backdrop-blur-xl bg-neutral-800/80 border-t border-neutral-700/50">
          <div className="flex items-center justify-around h-20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;

              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => handleTabClick(tab.path)}
                  className={`flex-1 flex flex-col items-center justify-center h-full gap-1 ${
                    isActive ? "text-primary bg-primary/5" : "text-neutral-400"
                  }`}
                >
                  <Icon size={24} />
                  <span className="text-xs">{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
