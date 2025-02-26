// services/product.service.ts
import productDao from '../dao/producto.dao.js';
import { IProduct } from '../dao/models/producto.js';
import { ProductDto } from '../dto/producto.dto.js';

class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return await productDao.getAll();
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await productDao.getById(id);
  }

  async createProduct(productData: ProductDto): Promise<IProduct> {
    return await productDao.create(productData);
  }

  async updateProduct(id: string, productData: Partial<ProductDto>): Promise<IProduct | null> {
    return await productDao.update(id, productData);
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    return await productDao.delete(id);
  }
}

export default new ProductService();
