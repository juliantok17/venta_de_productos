import mongoose, { Document } from "mongoose";

const nombreCollection = "products"; 

export interface IProduct extends Document {
  title: string;
  description?: string | null;
  price: number;
  img: string;
  stock: number;
}

const productSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true     
      },
      description: {
        type: String        
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      img: {
        type: String,
        required: true       
      },      
      stock: {
        type: Number,
        required: true,
        min: 0
      }
})




const productModel = mongoose.model(nombreCollection, productSchema); 



export default productModel; 