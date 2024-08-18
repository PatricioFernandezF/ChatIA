// src/app/api/firestore/route.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';


export default async function handler(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, 'Personas'));

    if (querySnapshot.empty) {
      return res.status(200).json({
        message: 'No documents found in the collection',
        data: [],
        debug: 'Collection is empty'
      });
    }

    const data = querySnapshot.docs.map(doc => doc.data());

    return res.status(200).json({
      message: 'Data fetched successfully',
      data: data,
      debug: `Fetched ${data.length} documents`
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch data',
      debug: error.message
    });
  }
}
