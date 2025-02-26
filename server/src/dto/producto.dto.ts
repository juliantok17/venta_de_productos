
export class ProductDto {
  title: string;
  description?: string;
  price: number;
  img: string;
  stock: number;

  constructor({
    title,
    description,
    price,
    img,
    stock,
  }: {
    title: string;
    description?: string;
    price: number;
    img: string;
    stock: number;
  }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.img = img;
    this.stock = stock;
  }
}
