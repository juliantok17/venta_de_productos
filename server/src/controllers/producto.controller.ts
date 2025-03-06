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
      res.status(500).json({ message: 'Error al recuperar los productos', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Id de producto invalido' });
        return;
      }
      const product = await productService.getProductById(id);
      if (!product) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al recuperar el producto', error });
    }
  }

  // Crea un nuevo producto
  async create(req: Request, res: Response): Promise<void> {    
    try {
      const productData = req.body;      
      const newProduct = await productService.createProduct(productData);          
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }

  // Actualiza un producto existente
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Id de producto invalido' });
        return;
      }
      const productData = req.body;
      const updatedProduct = await productService.updateProduct(id, productData);
      if (!updatedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  }

  // Elimina un producto
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Id de producto invalido' });
        return;
      }
      const deletedProduct = await productService.deleteProduct(id);
      if (!deletedProduct) {
        res.status(404).json({ message: 'Producto no encontrado' });
        return;
      }
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al intentar borrar el producto', error });
    }
  }
}

export default new ProductController();
