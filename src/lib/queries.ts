import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "./apiClient";
import type { GenerateRequest } from "../types";

export function useAvatars() {
  return useQuery({
    queryKey: ["avatars"],
    queryFn: () => apiClient.getAvatars(),
  });
}

export function useGenerations() {
  return useQuery({
    queryKey: ["generations"],
    queryFn: () => apiClient.getGenerations(),
    refetchInterval: 10000,
  });
}

export function useGeneration(id: string) {
  return useQuery({
    queryKey: ["generation", id],
    queryFn: () => apiClient.getGeneration(id),
  });
}

export function useLimits() {
  return useQuery({
    queryKey: ["limits"],
    queryFn: () => apiClient.getLimits(),
  });
}

export function useGenerate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateRequest) => apiClient.generate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generations"] });
      queryClient.invalidateQueries({ queryKey: ["limits"] });
    },
  });
}
