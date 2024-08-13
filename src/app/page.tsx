"use client"; // Esto convierte el componente en un Client Component

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Info, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const profiles = [
    { name: "John Doe", role: "Desarrollador Web", image: "/images/image1.webp" },
    { name: "Jane Smith", role: "Diseñadora UX Front", image: "/images/image2.webp" },
    { name: "Michael Johnson", role: "Analista de Datos",image: "/images/image3.webp" },
    { name: "Emily Davis", role: "Gerente de Proyecto",image: "/images/image4.webp" },
    { name: "David Lee", role: "Ingeniero de Software",image: "/images/image5.webp" },
    { name: "Sarah Chen", role: "Especialista en Marketing", image: "/images/image6.webp" }
  ];

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between mb-8">
        <p className="text-lg text-foreground flex-grow">
          Bienvenido a nuestra aplicación de perfiles de ChatIA. Aquí encontrarás a los mejores expertos en diferentes áreas, listos para ayudarte en tus proyectos. Explora y conoce a cada uno de ellos.
        </p>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground ml-4">
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {profiles.map((profile, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.09, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          >
            <Card className="bg-card text-card-foreground border">
              <div className="relative h-60 overflow-hidden rounded-lg">
                <Link href="/chat">
                  <img
                    src={profile.image}
                    alt={`Perfil de ${profile.name}`}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 hover:bg-accent/20 focus:bg-accent/20"
                >
                  <Info className="w-5 h-5 text-accent hover:text-accent-dark" />
                </Button>
              </div>
              <CardContent 
                className="p-4" 
                style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }} // Aplicando opacidad de 0.7 sobre fondo blanco puro
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.role}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-green-500/20 focus:bg-green-500/20"
                    >
                      <ThumbsUp className="w-5 h-5 text-green-500 hover:text-green-600" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-red-500/20 focus:bg-red-500/20"
                    >
                      <ThumbsDown className="w-5 h-5 text-red-500 hover:text-red-600" />
                      <span className="sr-only">Dislike</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
