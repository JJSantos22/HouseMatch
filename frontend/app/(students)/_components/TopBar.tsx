import Link from "next/link";

export function TopBar() {
  return (
    <header className="bg-primary z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-6 text-background">
        <Link href="/explore" className="text-xl font-bold">
          HouseMatch
        </Link>
      </div>
    </header>
  );
}
