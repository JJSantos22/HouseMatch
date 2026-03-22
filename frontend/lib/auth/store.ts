"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { z } from "zod";
import { ApiError } from "@/lib/api/client";
import { loginUser, registerUser, type UserRole } from "@/lib/api/auth";

const sessionSchema = z.object({
  userId: z.uuid(),
  email: z.email(),
  accessToken: z.string().optional(),
});

export type AuthSession = z.infer<typeof sessionSchema>;

type AuthState = {
  session: AuthSession | null;
  isHydrated: boolean;
  isLoading: boolean;
  error: string | null;
  setHydrated: (isHydrated: boolean) => void;
  clearError: () => void;
  register: (payload: {
    email: string;
    password: string;
    role?: UserRole;
  }) => Promise<void>;
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof z.ZodError) {
    return "Unexpected response from server.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function validatePersistedSession(state: unknown): AuthSession | null {
  const result = sessionSchema.safeParse(state);
  return result.success ? result.data : null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      isHydrated: false,
      isLoading: false,
      error: null,
      setHydrated: (isHydrated) => set({ isHydrated }),
      clearError: () => set({ error: null }),
      register: async ({ email, password, role = "student" }) => {
        set({ isLoading: true, error: null });

        try {
          const response = await registerUser({ email, password, role });

          set({
            session: {
              userId: response.userId,
              email,
            },
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: getErrorMessage(error),
          });
          throw error;
        }
      },
      login: async ({ email, password }) => {
        set({ isLoading: true, error: null });

        try {
          const response = await loginUser({ email, password });

          set({
            session: {
              userId: response.userId,
              email,
            },
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: getErrorMessage(error),
          });
          throw error;
        }
      },
      logout: () => {
        set({ session: null, error: null });
      },
    }),
    {
      name: "housematch-auth-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ session: state.session }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as { session?: unknown };

        return {
          ...currentState,
          session: validatePersistedSession(persisted?.session),
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    },
  ),
);