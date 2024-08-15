import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Sidebar from "@/components/Sidebar";

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
            <Sidebar />
            <div className="flex-1 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
