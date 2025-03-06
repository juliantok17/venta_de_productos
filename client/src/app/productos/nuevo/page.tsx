"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/productForm';

export default function NuevoProducto() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            // Realizar la solicitud para guardar el producto con la imagen
            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            
            // Navegar a la lista de productos al terminar
            router.push('/productos');
            router.refresh();
        } catch (error) {
            console.error("Error al crear el producto:", error);
            alert("Hubo un error al crear el producto");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="container my-4">
            <h1 className="mb-4">Nuevo Producto</h1>
            <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    );
}