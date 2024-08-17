import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt, system, selectedTag, context } = await req.json();

  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        //model: selectedTag,
        model: 'llama3.1',
        prompt,
        system,
        context,
        options: { temperature: 0.8 }
      }),
    };

    const response = await fetch('http://127.0.0.1:11434/api/generate', requestOptions);
    const reader = response.body?.getReader();

    if (reader) {
      let serverResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        const decodedValue = new TextDecoder('utf-8').decode(value);

        try {
          const { response, done, context: updatedContext } = JSON.parse(decodedValue);

          if (response) {
            serverResponse += response;
          }

          if (done) {
            return NextResponse.json({ response: serverResponse, context: updatedContext });
          }
        } catch (error) {
          console.error('Error al procesar la respuesta del servidor:', error);
          return NextResponse.json({ error: 'Error al procesar la respuesta del servidor' }, { status: 500 });
        }
      }
    }

  } catch (error) {
    console.error('Error al comunicarse con Ollama:', error);
    return NextResponse.json({ error: 'Error al comunicarse con Ollama' }, { status: 500 });
  }
}
