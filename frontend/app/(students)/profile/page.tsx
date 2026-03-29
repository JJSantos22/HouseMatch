"use client";

import { ProfileForm, ProfileData } from "@/components/profile-form";
import { useAuthStore } from "@/lib/auth/store";
import {
  getProfile,
  updateProfile,
  mapProfileResponseToProfileData,
} from "@/lib/api/profile";
import { ApiError } from "@/lib/api/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfileHistory, HouseReview } from "./_components/ProfileHistory";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const logout = useAuthStore((state) => state.logout);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for house reviews
  const [houseReviews, setHouseReviews] = useState<HouseReview[]>([
    {
      id: "1",
      name: "Sunset Villa",
      datesOfStay: "Sep 2024 - Feb 2025",
      review: "Great location near campus with modern amenities. The roommates were friendly and the common areas were well-maintained.",
      score: 4,
    },
    {
      id: "2",
      name: "Oak Street Residence",
      datesOfStay: "Mar 2025 - Present",
      review: "",
      score: 3,
    },
  ]);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.userId) {
        router.push("/login");
        return;
      }

      try {
        const profile = await getProfile(session.userId);
        const mappedData = mapProfileResponseToProfileData(profile);
        setProfileData(mappedData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        if (error instanceof ApiError && error.status === 404) {
          // Profile doesn't exist, redirect to onboarding
          router.push("/onboarding");
        }
      } finally {
        setIsLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [session?.userId, router]);

  async function handleSubmit(data: ProfileData) {
    if (!session?.userId) {
      throw new Error("Not authenticated");
    }

    setIsSubmitting(true);
    try {
      await updateProfile(session.userId, data);
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSuccess() {
    router.push("/explore");
  }

  async function handleUpdateHouse(houseId: string, review: string, score: number) {
    // Mock update function - replace with actual API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setHouseReviews((prev) =>
          prev.map((house) =>
            house.id === houseId ? { ...house, review, score } : house
          )
        );
        toast.success("House review updated successfully!");
        resolve();
      }, 500);
    });
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground text-sm">
            Logged in as <strong>{session?.email}</strong>
            {profileData?.university ? (
              <>
                {" "}
                - <strong>{profileData.university}</strong>
              </>
            ) : null}
          </p>
        </div>
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
      <ProfileForm
        key={profileData ? "loaded" : "loading"}
        initialData={profileData || undefined}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        isInitialLoading={isLoadingProfile}
        submitButtonText="Update Profile"
        title="Profile Information"
        description="Update your profile information to improve your roommate matches."
        successMessage="Profile updated successfully!"
        onSuccess={handleSuccess}
      />

      <div className="mt-6">
        <ProfileHistory
          houses={houseReviews}
          onUpdateHouse={handleUpdateHouse}
        />
      </div>
    </main>
  );
}
