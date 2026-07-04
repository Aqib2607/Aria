import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profiles");
      return res.data.data[0] || null;
    },
  });
};

export const useCareers = () => {
  return useQuery({
    queryKey: ["careers"],
    queryFn: async () => {
      const res = await api.get("/careers");
      return res.data.data || [];
    },
  });
};

export const useProgress = () => {
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const res = await api.get("/progress");
      return res.data.data || [];
    },
  });
};

export const useAiHistories = () => {
  return useQuery({
    queryKey: ["ai-histories"],
    queryFn: async () => {
      const res = await api.get("/ai-histories");
      return res.data.data || [];
    },
  });
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications");
      return res.data.data || [];
    },
  });
};

export const useResources = () => {
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const res = await api.get("/resources");
      return res.data.data || [];
    },
  });
};
