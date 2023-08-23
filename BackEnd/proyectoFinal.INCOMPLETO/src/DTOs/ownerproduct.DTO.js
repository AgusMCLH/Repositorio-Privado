export default class OwnerProductDTO {
  constructor(
    { code, name, price, description, category, image, stock, visible },
    owner
  ) {
    this.title = name;
    this.description = description;
    this.price = Number(price);
    this.thumbnail = image;
    this.category = category;
    this.code = code;
    this.stock = Number(stock);
    this.visible = visible;
    this.owner = owner;
  }
}
