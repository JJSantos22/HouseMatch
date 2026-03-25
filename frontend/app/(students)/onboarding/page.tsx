"use client";

import { ProfileForm, ProfileData } from "@/components/profile-form";
import { useAuthStore } from "@/lib/auth/store";
import { updateProfile } from "@/lib/api/profile";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session?.userId) {
      router.push("/login");
    }
  }, [session, router]);

  async function handleSubmit(data: ProfileData) {
    if (!session?.userId) {
      throw new Error("Not authenticated. Please log in first.");
    }

    setIsLoading(true);
    try {
      await updateProfile(session.userId, data);
    } catch (error) {
      console.error("Failed to create profile:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuccess() {
    router.push("/explore");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome to HouseMatch!</h1>
        <p className="text-muted-foreground text-sm">
          Let&apos;s set up your profile to find the perfect roommate.
        </p>
      </div>
      <ProfileForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitButtonText="Complete Profile"
        title="Create Your Profile"
        description="Fill out your profile to get personalized roommate recommendations."
        onSuccess={handleSuccess}
        successMessage="Welcome to HouseMatch! Redirecting to explore..."
      />
    </main>
  );
}
