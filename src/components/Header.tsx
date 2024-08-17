// components/Header.tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-3 px-4 flex items-center justify-between w-full shadow-lg">
      <h1 className="text-3xl font-bold text-foreground">CHATIA</h1>
      
      <div className="flex items-center space-x-4">
        <DarkModeToggle/>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="/path-to-avatar-image.jpg" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2">
            <DropdownMenuItem>
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
