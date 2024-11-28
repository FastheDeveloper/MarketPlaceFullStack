import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStore } from "./types";

export const useAuth = create<AuthStore>()(
    persist((set) => ({
        user: null,
        token: null,

        setUser: (user: any) => set({ user }),
        setToken: (token: any) => set({ token })
    }), {
        name: 'auth-token',
        storage: createJSONStorage(() => AsyncStorage)
    })
)