"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore } from "@/lib/auth/store";
import { updateSearchPreferences, type SearchPreferences, type Laundry } from "@/lib/api/profile";

interface SearchPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchPreferencesModal({ open, onOpenChange }: SearchPreferencesModalProps) {
  const userId = useAuthStore((state) => state.session?.userId);
  const [isLoading, setIsLoading] = useState(false);
  const [prefs, setPrefs] = useState<SearchPreferences>({});

  const handleSave = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await updateSearchPreferences(userId, prefs);
      toast.success("Preferences saved");
      onOpenChange(false);
    } catch {
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Search Preferences</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min Price</Label>
              <Input type="number" value={prefs.minPrice ?? ""} onChange={(e) => setPrefs({ ...prefs, minPrice: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
            <div>
              <Label>Max Price</Label>
              <Input type="number" value={prefs.maxPrice ?? ""} onChange={(e) => setPrefs({ ...prefs, maxPrice: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Min Stay (months)</Label>
              <Input type="number" value={prefs.minStayMonths ?? ""} onChange={(e) => setPrefs({ ...prefs, minStayMonths: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
            <div>
              <Label>Available From</Label>
              <Input type="date" value={prefs.availableFrom ?? ""} onChange={(e) => setPrefs({ ...prefs, availableFrom: e.target.value || undefined })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Max Roommates</Label>
              <Input type="number" value={prefs.maxRoommates ?? ""} onChange={(e) => setPrefs({ ...prefs, maxRoommates: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
            <div>
              <Label>Max Bedrooms</Label>
              <Input type="number" value={prefs.maxBedrooms ?? ""} onChange={(e) => setPrefs({ ...prefs, maxBedrooms: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
          </div>
          <div>
            <Label>Laundry</Label>
            <Select value={prefs.laundry ?? ""} onValueChange={(v) => setPrefs({ ...prefs, laundry: v as Laundry || undefined })}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Any" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="BUILDING">In Building</SelectItem>
                <SelectItem value="HOUSE">In House</SelectItem>
                <SelectItem value="NONE">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "furnished", label: "Furnished" },
              { key: "privateBath", label: "Private Bath" },
              { key: "privateRoom", label: "Private Room" },
              { key: "dishwasher", label: "Dishwasher" },
              { key: "parking", label: "Parking" },
              { key: "ac", label: "AC" },
              { key: "wifi", label: "WiFi" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={prefs[key as keyof SearchPreferences] as boolean ?? false}
                  onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked || undefined })}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="w-full">
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
