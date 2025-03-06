"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { Product } from "@/services/productClientService";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

interface ProductFormProps {
  initialProduct?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
}

export default function ProductForm({ initialProduct, onSubmit, isSubmitting }: ProductFormProps) {
  const [product, setProduct] = useState<Partial<Product>>(
    initialProduct || {
      title: "",
      description: "",
      price: 0,
      img: "",
      stock: 0,
    }
  );
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Si hay una imagen existente, mostrarla en la vista previa
    if (initialProduct?.img && initialProduct.img !== "sin imagen") {
      setImagePreview(`/images/${initialProduct.img}`);
    }
  }, [initialProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Crear una URL temporal para la vista previa
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Crear el FormData
    const formData = new FormData();
    
    // Generar un nombre único para la imagen si hay un archivo seleccionado
    let imgFilename = product.img;
    
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      const fileExt = file.name.split('.').pop();
      imgFilename = `${uuidv4()}.${fileExt}`;
      
      // Agregar archivo a FormData
      formData.append('image', file);
    }
    
    // Preparar datos del producto
    const productData: Partial<Product> = {
      ...product,
      img: imgFilename || "sin imagen",
    };
    
    // Agregar datos del producto
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value?.toString() || '');
    });
    
    // Si es una actualización, añadir el id
    if (initialProduct?._id) {
      formData.append('_id', initialProduct._id);
    }
    
    // Enviar al controlador
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={product.title || ""}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          value={product.description || ""}
          onChange={handleChange}
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          id="price"
          name="price"
          value={product.price || 0}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input
          type="number"
          className="form-control"
          id="stock"
          name="stock"
          value={product.stock || 0}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="image" className="form-label">Imagen</label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          accept="image/jpeg, image/png, image/gif"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </div>
      
      {imagePreview && (
        <div className="mb-3">
          <p>Vista previa:</p>
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <Image
              src={imagePreview}
              alt="Vista previa"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Guardando...' : initialProduct?._id ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}