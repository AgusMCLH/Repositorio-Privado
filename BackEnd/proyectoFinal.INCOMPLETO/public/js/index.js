let images = document.getElementsByTagName('img');

console.log(images);

if (images !== undefined) {
  for (let j = 0; j < images.length; j++) {
    images[j].addEventListener('error', () => {
      images[j].src = '/img/placeHolder/placeholder-image.webp';
    });
  }
}
