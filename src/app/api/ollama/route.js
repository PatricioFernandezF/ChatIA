import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, system, selectedTag, context } = await req.json();

    // Si el contexto ya incluye el último mensaje del usuario, no lo agregues de nuevo
    let messages = [
      {
        role: "system",
        content: system
      },
      ...(context || [])
    ];

    // Verifica si el último mensaje en el contexto no es el mismo que el prompt actual
    if (!context || context.length === 0 || context[context.length - 1].content !== prompt) {
      messages.push({
        role: "user",
        content: prompt
      });
    }


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
      ...messages,
      { role: "assistant", content: combinedResponse }
    ];

    // Devolver la respuesta combinada junto con el contexto actualizado
    return NextResponse.json({ response: combinedResponse, context: updatedContext });

  } catch (error) {
    console.error('Error al comunicarse con Ollama:', error);
    return NextResponse.json({ error: 'Error al comunicarse con Ollama: ' + error }, { status: 500 });
  }
}
