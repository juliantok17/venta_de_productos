var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productService from '../services/producto.service.js';
class ProductController {
    // Obtiene todos los productos
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al recuperar los productos', error });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: 'Id de producto invalido' });
                    return;
                }
                const product = yield productService.getProductById(id);
                if (!product) {
                    res.status(404).json({ message: 'Producto no encontrado' });
                    return;
                }
                res.status(200).json(product);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al recuperar el producto', error });
            }
        });
    }
    // Crea un nuevo producto
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                const newProduct = yield productService.createProduct(productData);
                res.status(201).json(newProduct);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear el producto', error });
            }
        });
    }
    // Actualiza un producto existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: 'Id de producto invalido' });
                    return;
                }
                const productData = req.body;
                const updatedProduct = yield productService.updateProduct(id, productData);
                if (!updatedProduct) {
                    res.status(404).json({ message: 'Producto no encontrado' });
                    return;
                }
                res.status(200).json(updatedProduct);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar el producto', error });
            }
        });
    }
    // Elimina un producto
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: 'Id de producto invalido' });
                    return;
                }
                const deletedProduct = yield productService.deleteProduct(id);
                if (!deletedProduct) {
                    res.status(404).json({ message: 'Producto no encontrado' });
                    return;
                }
                res.status(200).json(deletedProduct);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al intentar borrar el producto', error });
            }
        });
    }
}
export default new ProductController();
