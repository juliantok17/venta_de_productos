// controllers/product.controller.ts
import { Request, Response } from 'express';
import productService from '../services/producto.service.js';

class ProductController {
  // Obtiene todos los productos
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving products', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Invalid product id' });
        return;
      }
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving product', error });
    }
  }

  // Crea un nuevo producto
  async create(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  }

  // Actualiza un producto existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Invalid product id' });
        return;
      }
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(id, productData);
      if (!updatedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
  }

  // Elimina un producto
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Invalid product id' });
        return;
      }
      const deletedProduct = await productService.deleteProduct(id);
      if (!deletedProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  }
}

export default new ProductController();
