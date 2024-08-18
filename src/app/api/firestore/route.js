import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

// Método GET
export async function GET(req) {
  try {
    const querySnapshot = await getDocs(collection(db, 'Personas'));

    if (querySnapshot.empty) {
      return new Response(JSON.stringify({
        message: 'No documents found in the collection',
        data: [],
        debug: 'Collection is empty'
      }), { status: 200 });
    }

    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return new Response(JSON.stringify({
      message: 'Data fetched successfully',
      data: data,
      debug: `Fetched ${data.length} documents`
    }), { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return new Response(JSON.stringify({
      error: 'Failed to fetch data',
      debug: error.message
    }), { status: 500 });
  }
}
