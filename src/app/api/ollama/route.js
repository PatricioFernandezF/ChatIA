import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, system, selectedTag, context } = await req.json();

    // Construir el historial de mensajes incluyendo el contexto previo
    const messages = [
      {
        role: "system",
        content: system
      },
      ...(context || []),  // Agregar el contexto previo si existe
      {
        role: "user",
        content: prompt
      }
    ];

    const requestBody = JSON.stringify({
      model: "llama3.1",
      messages: messages,
      options: {
        temperature: 0.7,
        stream: false
      }
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    };

    const response = await fetch('http://127.0.0.1:11434/api/chat', requestOptions);
    
    // Captura la respuesta como texto
    const responseText = await response.text();

    // Divide la respuesta en líneas individuales
    const responseLines = responseText.trim().split('\n');
    
    // Parsear cada línea como JSON y combinar el contenido
    let combinedResponse = "";
    responseLines.forEach(line => {
      try {
        const jsonResponse = JSON.parse(line);
        if (jsonResponse.message && jsonResponse.message.content) {
          combinedResponse += jsonResponse.message.content;
        }
      } catch (error) {
        console.error('Error al parsear una línea de la respuesta:', error);
      }
    });

    // Agregar la respuesta del asistente al contexto para futuros mensajes
    const updatedContext = [
      ...(context || []),
      { role: "user", content: prompt },
      { role: "assistant", content: combinedResponse }
    ];

    // Devolver la respuesta combinada junto con el contexto actualizado
    return NextResponse.json({ response: combinedResponse, context: updatedContext });

  } catch (error) {
    console.error('Error al comunicarse con Ollama:', error);
    return NextResponse.json({ error: 'Error al comunicarse con Ollama: ' + error }, { status: 500 });
  }
}
