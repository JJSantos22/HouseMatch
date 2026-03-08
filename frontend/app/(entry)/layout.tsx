import { House } from "lucide-react";

export default function EntryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-primary text-primary-foreground flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex flex-col items-center gap-2 self-center font-medium text-2xl"
        >
          <div className="bg-primary text-primary-foreground flex size-22 items-center justify-center rounded-md">
            <House className="size-20" />
          </div>
          House Match
        </a>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
}
