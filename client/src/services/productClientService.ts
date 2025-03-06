export interface Product {
    _id?: string;
    title: string;
    description?: string;
    price: number;
    img: string;
    stock: number;
  }  
  
  const URL = 'http://localhost:5000/api/products';
  
  export async function getProducts(): Promise<Product[]> {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Error al obtener los productos');
    return await res.json();
  }
  
  export async function getProductById(id: string): Promise<Product> {
    const res = await fetch(`${URL}/${id}`);
    if (!res.ok) throw new Error('Error al obtener el producto');
    return await res.json();
  }
  
  export async function createProduct(product: Product): Promise<Product> {
    const res = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Error, no se pudo crear el producto');
    return await res.json();
  }
  
  export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const res = await fetch(`${URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Error, no se pudo actualizar el producto');
    return await res.json();
  }
  
  export async function deleteProduct(id: string): Promise<Product> {
    const res = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error, no se puedo borrar el producto');
    return await res.json();
  }
  