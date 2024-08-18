'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateProfile() {
  const [profileData, setProfileData] = useState({
    nombre: '',
    descCorta: '',
    info: '',
    sistema: '',
    imagen: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProfileData({
      ...profileData,
      imagen: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('nombre', profileData.nombre);
      formData.append('descCorta', profileData.descCorta);
      formData.append('info', profileData.info);
      formData.append('sistema', profileData.sistema);
      if (profileData.imagen) {
        formData.append('imagen', profileData.imagen);
      }

      const response = await fetch('/api/profiles', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Perfil creado exitosamente');
        setProfileData({ nombre: '', descCorta: '', info: '', sistema: '', imagen: null });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error al crear el perfil:', error);
      alert('Error al crear el perfil');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-3">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Crear Nuevo Perfil</h1>
        <p className="text-lg text-muted-foreground">Introduce los detalles del perfil que quieres crear.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="imagen">Imagen de perfil</Label>
            <Input type="file" id="imagen" name="imagen" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full" />
          </div>
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input type="text" id="nombre" name="nombre" value={profileData.nombre} onChange={handleInputChange} required className="mt-1 block w-full" />
          </div>
          <div>
            <Label htmlFor="descCorta">Descripción Corta</Label>
            <Input type="text" id="descCorta" name="descCorta" value={profileData.descCorta} onChange={handleInputChange} required className="mt-1 block w-full" />
          </div>
          <div>
            <Label htmlFor="sistema">Sistema</Label>
            <Input type="text" id="sistema" name="sistema" value={profileData.sistema} onChange={handleInputChange} className="mt-1 block w-full" />
          </div>
        </div>
        <div>
          <Label htmlFor="info">Información Adicional</Label>
          <Textarea id="info" name="info" value={profileData.info} onChange={handleInputChange} className="mt-1 block w-full" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="mt-4" disabled={uploading}>
            {uploading ? 'Subiendo...' : 'Crear Perfil'}
          </Button>
        </div>
      </form>
    </main>
  );
}
