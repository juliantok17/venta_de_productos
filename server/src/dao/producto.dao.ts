import productModel, { IProduct } from './models/producto.js';
import { ProductDto } from '../dto/producto.dto.js';

class ProductDao {  
  async getAll(): Promise<IProduct[]> {
    return await productModel.find();
  }
  
  async getById(id: string): Promise<IProduct | null> {
    return await productModel.findById(id);
  }

  // Crea un nuevo producto a partir de los datos del DTO
  async create(productData: ProductDto): Promise<IProduct> {    
    const newProduct = new productModel(productData);    
    return await newProduct.save();
  }

  //Actualiza un producto, usa Partial para poder actualizar campos específicos
  async update(id: string, productData: Partial<ProductDto>): Promise<IProduct | null> {
    return await productModel.findByIdAndUpdate(id, productData, { new: true });
  }
  
  async delete(id: string): Promise<IProduct | null> {
    return await productModel.findByIdAndDelete(id);
  }
}

export default new ProductDao();
