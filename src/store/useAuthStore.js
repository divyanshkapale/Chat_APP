import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({

  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile:false,

  // ---------------- CHECK AUTH (Cookie-Based Persistent Login) ----------------
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      // Backend returns the user object directly
      set({ authUser: res.data, isCheckingAuth: false });
    } catch (error) {
      console.log("Auth check failed:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  // ---------------- SIGN UP ----------------
  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      // User returned from backend
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in signup");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ---------------- LOGIN ----------------
  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      // Set user from backend response
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in login");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ---------------- LOGOUT ----------------
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
  // ---------------- UPDATE PROFILE ----------------
   updateProfile:async(data)=>{
    try{
       set({ isUpdatingProfile: true });
      const res = await axiosInstance.put('/auth/update-profile',data);
      set({authUser:res.data, isUpdatingProfile: false});
      toast.success("Profile updated successfully");
    }catch(error){
      console.log("Error updating profile:",error);
      toast.error("Failed to update profile");
      set({ isUpdatingProfile: false });
    }
  }

}));
