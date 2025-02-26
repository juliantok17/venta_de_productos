export class ProductDto {
    constructor({ title, description, price, img, stock, }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.img = img;
        this.stock = stock;
    }
}
