import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../../../lib/firebase';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const nombre = formData.get('nombre');
    const descCorta = formData.get('descCorta');
    const info = formData.get('info');
    const sistema = formData.get('sistema');
    const imagen = formData.get('imagen');

    console.log(imagen);

    if (!nombre || !descCorta || !imagen) {
      return new Response(JSON.stringify({
        error: 'Faltan datos requeridos',
        debug: 'Nombre, descripción corta e imagen son requeridos'
      }), { status: 400 });
    }

    console.log('Configurando Firebase Storage...');
    const storage = getStorage();
    let imageUrl = '';

    if (imagen) {
      //console.log('Tipo de imagen:', imagen.type);
      //console.log('Tamaño de la imagen:', imagen.size);

      const storageRef = ref(storage, `profiles/${imagen.name}`);
      console.log('Subiendo imagen al Storage...');

      try {
        const snapshot = await uploadBytes(storageRef, imagen);
        console.log('Imagen subida, obteniendo URL...');
        imageUrl = await getDownloadURL(snapshot.ref);
      } catch (uploadError) {
        console.error('Error al subir la imagen:', uploadError);
        console.error('Código de error:', uploadError.code);
        console.error('Mensaje de error:', uploadError.message);
        console.error('Detalles adicionales:', uploadError.customData);
        throw uploadError;
      }
    }

    console.log('Guardando datos en Firestore...');
    await addDoc(collection(db, 'Personas'), {
      nombre,
      descCorta,
      info,
      sistema,
      imagen: imageUrl,
    });

    return new Response(JSON.stringify({
      message: 'Perfil creado exitosamente',
    }), { status: 201 });

  } catch (error) {
    console.error('Error al crear el perfil:', error);
    return new Response(JSON.stringify({
      error: 'Error al crear el perfil',
      debug: error.message || 'Error desconocido',
    }), { status: 500 });
  }
}
