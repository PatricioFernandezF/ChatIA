"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function CreateProfile() {
  const [profileData, setProfileData] = useState({
    name: '',
    description: '',
    image: null,
  });

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
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos a tu backend o API
    console.log(profileData);
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
            <Label htmlFor="image">Imagen de perfil</Label>
            <Input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" className="mt-1 block w-full" />
          </div>
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} required className="mt-1 block w-full" />
          </div>
        </div>
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" name="description" value={profileData.description} onChange={handleInputChange} required className="mt-1 block w-full" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="mt-4">Crear Perfil</Button>
        </div>
      </form>
    </main>
  );
}