"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { 
  Menu, 
  MoreHorizontal, 
  Home, 
  Users, 
  Settings, 
  Send, 
  Camera 
} from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Hey there! How's it going?", sender: "John Doe", time: "10:30 AM" },
    { text: "I'm doing great, thanks for asking!", sender: "You", time: "10:31 AM" },
    { text: "That's great to hear! I was wondering if you'd be free for a call later today?", sender: "John Doe", time: "10:32 AM" },
    { text: "Sure, I'm available anytime after 2pm. Just let me know what works best for you.", sender: "You", time: "10:33 AM" }
  ]);

  const [inputValue, setInputValue] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "You",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-3 px-4 flex items-center justify-between fixed top-0 w-full z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">CHATIA</h1>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5" />
            <span className="sr-only">More</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-grow overflow-hidden mt-[70px]"> {/* Ajuste de margen superior para compensar el encabezado */}
        <div className={`bg-muted border-r w-64 p-4 space-y-4 lg:translate-x-0 lg:block flex-shrink-0 overflow-y-auto fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground"
            prefetch={false}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="#"
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
        </div>

        <div className={`flex-1 overflow-auto p-4 space-y-4 transition-all duration-300 ${menuOpen ? 'ml-64' : ''} lg:ml-64`}>
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.sender === "You" ? 'justify-end' : ''}`}>
              {message.sender !== "You" && (
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-[70%] ${message.sender === "You" ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p>{message.text}</p>
                <div className="text-xs mt-1">{message.time}</div>
              </div>
              {message.sender === "You" && (
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`bg-background border-t border-muted px-4 py-3 flex items-center gap-2 transition-all duration-300 ${menuOpen ? 'ml-64' : ''} lg:ml-64`}>
        <Textarea
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0"
          rows={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" onClick={handleSendMessage}>
          <Send className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
