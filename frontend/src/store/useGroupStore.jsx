import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useGroupStore = create((set, get) => ({
  groups: [],
  messages: [],
  isCreatingGroup: false,
  isGrpMsgLoading: false,
  chosenGroup: null,
  isGroupsLoading: false,
  isMessagesLoading: false,
  viewOtherGroups: false,
  getMyGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get("/groups/mygroups");
      console.log(res.data);
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isGroupsLoading: false });
    }
  },
  getOtherGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get("/groups/other-groups");
      console.log(res.data);
      set({ groups: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isGroupsLoading: false });
    }
  },
  setChosenGroup: (group) => {
    set({ chosenGroup: group });
  },
  setViewOtherGroups: (value) => {
    set({ viewOtherGroups: value });
  },
  joinGroup: async (groupId) => {
    try {
      const res = await axiosInstance.put(`/groups/join-group/${groupId}`);
      return res.data;
      get().getOtherGroups();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
  leaveGroup: async (groupId) => {
    try {
      const res = await axiosInstance.put(`/groups/leave-group/${groupId}`);
      await get().getMyGroups();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
  sendGroupMsg: async (groupId, data) => {
    const { messages } = get();
    try {
      const res = await axiosInstance.post(`/groups/send/${groupId}`, data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
  getGroupMsgs: async (groupId) => {
    set({ isGrpMsgLoading: true });
    const { messages } = get();
    try {
      const res = await axiosInstance.get(`/groups/${groupId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isGrpMsgLoading: false });
    }
  },
  listenToGroups: () => {
    const { chosenGroup, messages } = get();
    if (!chosenGroup) return;
    const socket = useAuthStore.getState().socket;
    socket.emit("joinGroup", chosenGroup._id);
    socket.on("newGroupMsg", (newmsg) => {
      if(newmsg.groupId!==chosenGroup._id)return;
      set((state) => ({
        messages: [...state.messages, newmsg],
      }));
    });
  },
  stopListeningToGroups: () => {
    const { chosenGroup } = get();
    const socket = useAuthStore.getState().socket;
    if (chosenGroup) {
      socket.emit("leaveGroup", chosenGroup._id);
    }
    socket.off("newGroupMsg");
  },
  createGroup: async (data) => {
    set({ isCreatingGroup: true });
    try {
      const res = await axiosInstance.post("/groups/create-group", data);
      toast.success("New group created successfully!");
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      return false;
    } finally {
      set({ isCreatingGroup: false });
    }
  },
}));
