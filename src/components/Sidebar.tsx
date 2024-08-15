"use client";

import Link from "next/link";
import { Home, Users, Settings, Camera } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="bg-muted border-r w-64 p-4 space-y-4 overflow-y-auto">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        prefetch={false}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link
        href="/chat"
        className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        prefetch={false}
      >
        <Camera className="w-5 h-5" />
        <span>Chats</span>
      </Link>
      <Link
        href="/crear"
        className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        prefetch={false}
      >
        <Users className="w-5 h-5" />
        <span>Crear</span>
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
        prefetch={false}
      >
        <Settings className="w-5 h-5" />
        <span>Settings</span>
      </Link>
    </aside>
  );
}
