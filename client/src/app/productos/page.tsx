import { getProducts } from '@/services/productClientService';




export default async function Productos() {

    const products = await getProducts();
    return (
        <div>
            <h1>Productos</h1>
            {products.map((p) => (
                <div key={p._id}>
                   <p>{p.title}</p> 
                   <p>{p.description}</p> 
                   <p>{p.price}</p> 
                   <p>{p.img}</p>                                   
                </div>
            ))}
        </div>
    );
}