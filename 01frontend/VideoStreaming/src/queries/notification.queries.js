import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios.instance";

/**
 * ============================
 * QUERY KEYS (centralized)
 * ============================
 */
export const notificationKeys = {
  all: ["notifications"],
  list: () => [...notificationKeys.all, "list"],
  unreadCount: () => [...notificationKeys.all, "unread-count"],
};

/**
 * ============================
 * FETCH ALL NOTIFICATIONS
 * Used by: Bell dropdown
 * ============================
 */
export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.list(),
    queryFn: async () => {
      const res = await api.get("/notifications");
      console.log("notifiction",res.data)
      return res.data.data;
    },
    staleTime: 60 * 1000, // 1 min
  });
};

/**
 * ============================
 * FETCH UNREAD COUNT
 * Used by: Bell badge
 * ============================
 */
export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: async () => {
      const res = await api.get("/notifications/unread-count");
      return res.data.data.count;
    },
    staleTime: 30 * 1000,
  });
};

/**
 * ============================
 * MARK SINGLE NOTIFICATION READ
 * Used when user clicks a notification
 * ============================
 */
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      const res = await api.patch(
        `/notifications/${notificationId}/read`
      );
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(notificationKeys.all);
    },
  });
};

/**
 * ============================
 * MARK ALL AS READ
 * Used by "Mark all as read" button
 * ============================
 */
export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await api.patch("/notifications/read-all");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(notificationKeys.all);
    },
  });
};

/**
 * ============================
 * DELETE NOTIFICATION (optional)
 * ============================
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      const res = await api.delete(`/notifications/${notificationId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(notificationKeys.all);
    },
  });
};
