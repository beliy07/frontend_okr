import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WebApp from "@twa-dev/sdk";

import { TabBar } from "./components/TabBar";
import Generate from "./pages/Generate";
import Profile from "./pages/Profile";
import GenerationDetail from "./pages/GenerationDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const navigate = useNavigate();
  const isTMA =
    typeof window !== "undefined" &&
    !!(window as any).Telegram?.WebApp?.initData;

  useEffect(() => {
    if (isTMA) {
      WebApp.ready();
      WebApp.expand();
      WebApp.disableVerticalSwipes();
      WebApp.setBackgroundColor("#171717");
      WebApp.setHeaderColor("#171717");

      // const startParam = WebApp.initDataUnsafe?.start_param;
      // if (startParam) {
      //   navigate(`/generation/${startParam.split("_")[0]}`, { replace: true });
      // }
    }
  }, [isTMA, navigate]);

  if (!isTMA) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-neutral-100 mb-4">
            Приложение доступно только в Telegram
          </h1>
          <p className="text-neutral-400">
            Пожалуйста, откройте это приложение в среде Telegram Mini App
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Generate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/generation/:id" element={<GenerationDetail />} />
      </Routes>
      <TabBar />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
