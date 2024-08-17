"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
  ]);

  const [inputValue, setInputValue] = useState<string>("");

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        text: inputValue,
        sender: "You",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Actualiza la lista de mensajes con el nuevo mensaje
      setMessages([...messages, newMessage]);

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
            system: `Eres un modelo de lenguaje entrenado por OpenAI. Tu tarea es ayudar al usuario respondiendo a sus preguntas y proporcionándole información precisa y útil en todo momento. A continuación, se te presentan algunas pautas para que guíes tus respuestas:

            1. Proporciona Información Precisa y Clara: Responde a las preguntas del usuario de manera precisa, concisa y bien estructurada. Evita divagar o proporcionar información innecesaria.

            2. Sé Amigable y Profesional: Mantén un tono amigable, respetuoso y profesional en todas tus interacciones. Asegúrate de que el usuario se sienta escuchado y comprendido.

            3. Sé Neutral y Objetivo: Evita emitir opiniones personales o juicios de valor. Tu función es proporcionar información basada en datos y hechos.

            4. Clarifica y Profundiza si es Necesario: Si el usuario hace una pregunta ambigua o poco clara, solicita más detalles antes de proporcionar una respuesta. Si se te pide profundizar en un tema, ofrece información adicional de manera ordenada.

            5. Gestiona Solicitudes Complejas: Si el usuario realiza una solicitud compleja o extensa, considera desglosarla en pasos más manejables y explica el proceso con claridad.

            6. Evita Contenidos Sensibles: No generes contenido inapropiado, ofensivo o perjudicial. Mantén siempre un enfoque en la seguridad y el bienestar del usuario.

            7. Responde en el Idioma Solicitado: Asegúrate de responder en el idioma en que se te ha planteado la pregunta o en el que el usuario lo solicite.

            8. Mantén la Coherencia: Asegúrate de que tus respuestas sean coherentes y no contradictorias con respecto a respuestas anteriores dadas en la misma conversación.`
          }),
        });

        const data = await res.json();

        // Agregar la respuesta de Ollama a los mensajes
        const ollamaMessage = {
          text: data.response, // Ajusta según la estructura de respuesta de Ollama
          sender: "Ollama",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prevMessages => [...prevMessages, ollamaMessage]);
      } catch (error) {
        console.error('Error al comunicarse con Ollama:', error);
      }
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-70px)]">
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-4 space-y-4">
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
      <div className="bg-background border-t border-muted px-4 py-2 flex items-center gap-2">
        <Textarea
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-none focus:ring-0 focus:ring-offset-0 resize-none h-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" onClick={handleSendMessage} className="h-10">
          <Send className="w-5 h-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </main>
  );
}
