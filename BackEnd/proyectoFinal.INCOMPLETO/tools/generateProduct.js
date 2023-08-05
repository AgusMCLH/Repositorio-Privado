import { faker } from '@faker-js/faker';

export default function generateProduct() {
  let thumbnails = () => {
    let thumbnail = [];
    let num = faker.string.numeric({ min: 1, max: 3 });
    for (let i = 0; i < 4; i++) {
      thumbnail.push(faker.image.url());
    }
    return thumbnail;
  };
  const product = {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    descriprion: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: thumbnails(),
    stock: faker.string.numeric({ min: 1, max: 100 }),
    visible: true,
    __v: 0,
    category: faker.commerce.department(),
  };
  return product;
}
