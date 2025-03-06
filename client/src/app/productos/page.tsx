import { getProducts } from '@/services/productClientService';
import Image from 'next/image';
import Link from 'next/link';

export default async function Productos() {
  const products = await getProducts();

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Productos</h1>
        <Link href="/productos/nuevo" className="btn btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((p) => (
          <div key={p._id} className="col">
            <div className="card h-100">
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                {p.img && p.img !== 'sin imagen' ? (
                  <Image
                    src={`/images/${p.img}`}
                    alt={p.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 bg-light">
                    <span className="text-muted">Sin imagen</span>
                  </div>
                )}
              </div>

              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">
                  <strong>Precio:</strong> ${p.price}
                </p>
                <p className="card-text">
                  <strong>Stock:</strong> {p.stock} unidades
                </p>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <Link href={`/productos/${p._id}`} className="btn btn-sm btn-info">
                  Ver
                </Link>
                <Link href={`/productos/${p._id}/editar`} className="btn btn-sm btn-warning">
                  Editar
                </Link>
                <Link href={`/productos/${p._id}/eliminar`} className="btn btn-sm btn-danger">
                  Eliminar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}