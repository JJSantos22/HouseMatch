"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sparkles } from "lucide-react";

interface SmartSuggestionsButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isMobile?: boolean;
}

export function SmartSuggestionsButton({
  onClick,
  isLoading = false,
  isMobile = false,
}: SmartSuggestionsButtonProps) {
  return (
    <div
      className={`pointer-events-none absolute bottom-8 flex justify-center ${
        isMobile ? "right-4" : "left-1/2 -translate-x-1/2"
      } z-40`}
    >
      <div className="pointer-events-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="shadow-lg hover:shadow-xl transition-all"
                size="lg"
                onClick={onClick}
                disabled={isLoading}
              >
                <Sparkles className="h-5 w-5" />
                <span>Smart Suggestions</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Get AI-powered house suggestions</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
