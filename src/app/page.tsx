'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Info, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; 
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/firestore'); // Asumiendo que los datos se obtienen de esta ruta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data); // Accediendo a la propiedad 'data' del resultado
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TooltipProvider>
      <main className="w-full max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-8">
          <p className="text-lg text-foreground flex-grow">
            Bienvenido a nuestra aplicación de perfiles de ChatIA. Aquí encontrarás a los mejores expertos en diferentes áreas, listos para ayudarte en tus proyectos. Explora y conoce a cada uno de ellos.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data && data.length > 0 ? (
            data.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.09, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              >
                <Card className="bg-card text-card-foreground border">
                  <div className="relative h-60 overflow-hidden rounded-lg">
                    <Link href={`/chat/${profile.id}`}>
                      <img
                        src={profile.imagen} // Utiliza la URL de la imagen almacenada en Firestore
                        alt={`Perfil de ${profile.nombre || 'Desconocido'}`}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                      />
                    </Link>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 hover:bg-accent/20 focus:bg-accent/20"
                        >
                          <Info className="w-5 h-5 text-accent hover:text-accent-dark" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5}>
                        <p>{profile.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CardContent 
                    className="p-4" 
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }} 
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{profile.nombre || 'Nombre no disponible'}</h3>
                        <p className="text-muted-foreground">{profile.descCorta || 'Descripción no disponible'}</p>
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
            ))
          ) : (
            <p>No se encontraron datos.</p>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}
