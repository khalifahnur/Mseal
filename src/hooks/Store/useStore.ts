import { create } from "zustand";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipTier: string | null;
  membershipId:string | null;
  balance: number | 0;
  createdAt: string | null;
  expDate: string | null;
}

interface UserState {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));