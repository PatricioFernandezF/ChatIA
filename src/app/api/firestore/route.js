import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

// Método GET
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    console.log('ID recibido:', id);  // Log para verificar el ID

    if (id) {
      // Si hay un ID, obtener el documento específico
      const docRef = doc(db, 'Personas', id);
      const docSnap = await getDoc(docRef);

      console.log('Documento obtenido:', docSnap.exists());  // Log para verificar si el documento existe

      if (!docSnap.exists()) {
        return new Response(JSON.stringify({
          message: 'Document not found',
          data: null,
          debug: `No document found for ID: ${id}`
        }), { status: 404 });
      }

      const data = { id: docSnap.id, ...docSnap.data() };
      console.log('Datos del documento:', data);  // Log para mostrar los datos obtenidos

      return new Response(JSON.stringify({
        message: 'Document fetched successfully',
        data: data,
        debug: `Fetched document with ID: ${id}`
      }), { status: 200 });

    } else {
      // Si no hay ID, obtener todos los documentos
      const querySnapshot = await getDocs(collection(db, 'Personas'));

      if (querySnapshot.empty) {
        return new Response(JSON.stringify({
          message: 'No documents found in the collection',
          data: [],
          debug: 'Collection is empty'
        }), { status: 200 });
      }

      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Todos los documentos obtenidos:', data.length);  // Log para mostrar la cantidad de documentos

      return new Response(JSON.stringify({
        message: 'Data fetched successfully',
        data: data,
        debug: `Fetched ${data.length} documents`
      }), { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return new Response(JSON.stringify({
      error: 'Failed to fetch data',
      debug: error.message
    }), { status: 500 });
  }
}
