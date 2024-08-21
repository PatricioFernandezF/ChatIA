'use client'

import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function ChatPage() {
  const { id } = useParams();  // Captura el ID desde la URL

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [context, setContext] = useState([]);  // Almacena el historial de la conversación
  const [sistema, setSistema] = useState<string>("");  // Estado para almacenar `profile.sistema`
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const [imagen, setImagen] = useState<string>(""); // Estado para almacenar `profile.imagen`
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/firestore?id=${id}`); // Corregir la URL para usar parámetros de consulta
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setSistema(result.data.sistema); // Accediendo a la propiedad 'sistema' del resultado
        setImagen(result.data.imagen); // Accediendo a la propiedad 'imagen' del resultado
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "You",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Actualiza la lista de mensajes con el nuevo mensaje
      setMessages([...messages, newMessage]);

      // Actualiza el contexto con el nuevo mensaje del usuario
      const updatedContext = [...context, { role: "user", content: inputValue }];

      // Limpia el input
      setInputValue("");

      try {
        // Llamada a la API de Ollama
        const res = await fetch('/api/ollama', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: inputValue, 
            system: `${sistema}`,  // Incluye `profile.sistema` en el campo `system`
            context: updatedContext,  // Envía el contexto actualizado
            id: id  // Puedes enviar el ID si es necesario para la lógica de la API
          }),
        });

        const data = await res.json();

        // Agregar la respuesta de Ollama a los mensajes
        const ollamaMessage = {
          text: data.response,  // Ajusta según la estructura de respuesta de Ollama
          sender: "Ollama",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Actualiza los mensajes y el contexto
        setMessages(prevMessages => [...prevMessages, ollamaMessage]);
        setContext([...updatedContext, { role: "assistant", content: data.response }]);  // Actualiza el contexto con la respuesta del asistente

      } catch (error) {
        console.error('Error al comunicarse con Ollama:', error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-70px)]">
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-4">

        {error ? <p>{error}</p> : null}  {/* Muestra un mensaje de error si lo hay */}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.sender === "You" ? 'justify-end' : ''}`}>
            {message.sender !== "You" && (
              <Avatar className="w-8 h-8 border">
                <AvatarImage src={imagen} alt="@shadcn" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            )}
            <div className={`rounded-lg p-3 max-w-[70%] ${message.sender === "You" ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <ReactMarkdown>{message.text}</ReactMarkdown>
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
      <div className="bg-background border-t border-muted px-4 py-2 flex items-center gap-2">
        <Textarea
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0 resize-none h-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Captura el evento de teclado
        />
        <Button type="submit" onClick={handleSendMessage} className="h-10">
          <Send className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </main>
  );
}
