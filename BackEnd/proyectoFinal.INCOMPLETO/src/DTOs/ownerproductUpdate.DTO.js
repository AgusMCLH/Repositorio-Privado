export default class OwnerProductUpdateDTO {
  constructor({
    code,
    name,
    price,
    description,
    category,
    image,
    stock,
    visible,
  }) {
    this.title = name;
    this.description = description;
    this.price = Number(price);
    this.thumbnail = image;
    this.category = category;
    this.code = code;
    this.stock = Number(stock);
    this.visible = visible;
  }
}
