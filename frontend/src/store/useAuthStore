import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggedIn: false,

  // ---------------- CHECK AUTH ----------------
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("Error in AuthCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ---------------- SIGN UP ----------------
  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in signup");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ---------------- lOGIN  ----------------
  login: async (data) => {
    set({ isLoggedIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Sucessfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in signup");
    } finally {
      set({ isLoggedIn: false });
    }
  },
  // ---------------- LOGOUT  ----------------
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("Logout error:", error);
    }
  },

}));
