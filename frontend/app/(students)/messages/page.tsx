"use client";

import { useState } from "react";
import { ChatConversation } from "@/components/ui/chat-conversation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import type { ChatMessage } from "@/components/ui/types";

const mockLandlord = {
  id: "1",
  name: "Miguel Santos",
  avatar: "MS",
  lastMessage: "Perfect! When would you like to schedule a visit?",
  time: "3:45 PM",
};

const mockMessages: ChatMessage[] = [
  {
    content: "Hi! I'm a student at Instituto Superior Técnico and I'm looking for an apartment near Alameda. Is the T1 in Arroios still available?",
    isOwn: true,
    time: "3:20 PM",
    status: "read" as const,
  },
  {
    content: "Hello! Yes, it's still available. It's a 5-minute walk from the Técnico campus. Are you looking for the full academic year?",
    author: "Miguel Santos",
    avatarFallback: "MS",
    isOwn: false,
    time: "3:28 PM",
  },
  {
    content: "Yes, I need it from September to July. Does the €650/month include utilities?",
    isOwn: true,
    time: "3:35 PM",
    status: "read" as const,
  },
  {
    content: "Perfect! When would you like to schedule a visit?",
    author: "Miguel Santos",
    avatarFallback: "MS",
    isOwn: false,
    time: "3:45 PM",
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { content: input, isOwn: true, time: "Now", status: "sent" as const }]);
    setInput("");
  };

  if (selectedConversation) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-col h-full">
        <div className="flex items-center gap-3 border-b p-4 bg-background">
          <Button variant="ghost" size="icon" onClick={() => setSelectedConversation(null)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {mockLandlord.avatar}
          </div>
          <span className="font-medium">{mockLandlord.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <ChatConversation data={{ messages }} />
        </div>
        <div className="flex gap-2 border-t p-4 bg-background sticky bottom-0">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col p-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="mt-4">
        <button
          onClick={() => setSelectedConversation(mockLandlord.id)}
          className="flex w-full items-center gap-3 rounded-lg border p-4 text-left hover:bg-muted transition-colors"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            {mockLandlord.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <span className="font-medium">{mockLandlord.name}</span>
              <span className="text-xs text-muted-foreground">{mockLandlord.time}</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{mockLandlord.lastMessage}</p>
          </div>
        </button>
      </div>
    </main>
  );
}
