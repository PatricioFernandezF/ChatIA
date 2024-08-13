import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
          </header>

          <div className="flex flex-grow">
            <aside className="bg-muted border-r w-64 p-4 space-y-4 overflow-y-auto">
              {/* Aquí puedes colocar los enlaces de navegación como "Home", "Chats", etc. */}
            </aside>
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
