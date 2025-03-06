import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Función auxiliar para asegurar que el directorio existe
async function ensureDirectoryExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
    
    const product = await response.json();
    return NextResponse.json(product);
    
  } catch (error) {
    console.error('Error obteniendo el producto:', error);
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const formData = await request.formData();
    const image = formData.get('image') as File | null;

    // Extraer datos del producto del FormData
    const productData: any = {};
    for (const [key, value] of formData.entries()) {
      if (key !== 'image' && key !== '_id') {  // Excluir _id para evitar problemas en la actualización
        // Convertir strings numéricos a números donde sea necesario
        if (key === 'price' || key === 'stock') {
          productData[key] = Number(value);
        } else {
          productData[key] = value;
        }
      }
    }
    
    // Si hay una imagen, guardarla en el servidor
    if (image) {
      const imagesDir = path.join(process.cwd(), 'public/images');
      await ensureDirectoryExists(imagesDir);
      
      // Guardar la imagen en public/images
      const buffer = Buffer.from(await image.arrayBuffer());
      await writeFile(path.join(imagesDir, productData.img), buffer);
    }
    
    // Hacer la solicitud a la API externa para actualizar el producto
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
    
    const product = await response.json();
    return NextResponse.json(product);
    
  } catch (error) {
    console.error('Error procesando la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Hacer la solicitud a la API externa para eliminar el producto
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: response.status });
    }
    
    const product = await response.json();
    return NextResponse.json(product);
    
  } catch (error) {
    console.error('Error procesando la solicitud:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}