"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, PopoverHeader, PopoverTitle } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/lib/auth/store";
import { updateSearchPreferences, type SearchPreferences, type Laundry } from "@/lib/api/profile";

export function SearchPreferencesPopover() {
  const userId = useAuthStore((state) => state.session?.userId);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prefs, setPrefs] = useState<SearchPreferences>({});

  const handleSave = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await updateSearchPreferences(userId, prefs);
      toast.success("Preferences saved");
      setOpen(false);
    } catch {
      toast.error("Failed to save preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="shadow-lg h-12 w-12" size="icon">
          <Filter className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" side="top" align="end">
        <PopoverHeader>
          <PopoverTitle>Search Preferences</PopoverTitle>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Min Price</Label>
              <Input type="number" className="h-7" value={prefs.minPrice ?? ""} onChange={(e) => setPrefs({ ...prefs, minPrice: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
            <div>
              <Label className="text-xs">Max Price</Label>
              <Input type="number" className="h-7" value={prefs.maxPrice ?? ""} onChange={(e) => setPrefs({ ...prefs, maxPrice: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Min Stay</Label>
              <Input type="number" className="h-7" value={prefs.minStayMonths ?? ""} onChange={(e) => setPrefs({ ...prefs, minStayMonths: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
            <div>
              <Label className="text-xs">Max Roommates</Label>
              <Input type="number" className="h-7" value={prefs.maxRoommates ?? ""} onChange={(e) => setPrefs({ ...prefs, maxRoommates: e.target.value ? Number(e.target.value) : undefined })} />
            </div>
          </div>
          <div>
            <Label className="text-xs">Laundry</Label>
            <Select value={prefs.laundry ?? ""} onValueChange={(v) => setPrefs({ ...prefs, laundry: v as Laundry || undefined })}>
              <SelectTrigger className="w-full h-7"><SelectValue placeholder="Any" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="BUILDING">In Building</SelectItem>
                <SelectItem value="HOUSE">In House</SelectItem>
                <SelectItem value="NONE">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            {[
              { key: "furnished", label: "Furnished" },
              { key: "privateBath", label: "Private Bath" },
              { key: "privateRoom", label: "Private Room" },
              { key: "parking", label: "Parking" },
              { key: "ac", label: "AC" },
              { key: "wifi", label: "WiFi" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-1.5 text-xs">
                <Checkbox
                  checked={prefs[key as keyof SearchPreferences] as boolean ?? false}
                  onCheckedChange={(checked) => setPrefs({ ...prefs, [key]: checked || undefined })}
                />
                {label}
              </label>
            ))}
          </div>
          <Button onClick={handleSave} disabled={isLoading} size="sm" className="h-7">
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
