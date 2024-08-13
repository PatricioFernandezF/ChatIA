import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Home, Users, Settings, Camera } from "lucide-react";

// Importación de los componentes necesarios de Shadcn UI
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Application",
  description: "A modern chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
        <div className="flex flex-col h-screen">
          <header className="bg-primary text-primary-foreground py-3 px-4 flex items-center justify-between w-full shadow-lg">
            <h1 className="text-3xl font-bold text-foreground">CHATIA</h1>
            {/* Avatar con Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage src="/path-to-avatar-image.jpg" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2">
                <DropdownMenuItem>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <div className="flex flex-grow overflow-hidden">
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
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                prefetch={false}
              >
                <Users className="w-5 h-5" />
                <span>Contacts</span>
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
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
