var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productModel from './models/producto.js';
class ProductDao {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel.findById(id);
        });
    }
    // Crea un nuevo producto a partir de los datos del DTO
    create(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = new productModel(productData);
            return yield newProduct.save();
        });
    }
    //Actualiza un producto, usa Partial para poder actualizar campos específicos
    update(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel.findByIdAndUpdate(id, productData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productModel.findByIdAndDelete(id);
        });
    }
}
export default new ProductDao();
