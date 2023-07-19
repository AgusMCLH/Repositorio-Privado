try {
  let productHTMLCollection = document.getElementsByClassName(
    'product-item__rating'
  );

  for (let i = 0; i < productHTMLCollection.length; i++) {
    let numOfStars = productHTMLCollection[i].childElementCount;
    let starsToInsert = 5 - numOfStars;

    for (let l = 0; l < starsToInsert; l++) {
      productHTMLCollection[i].innerHTML +=
        '<img src="/img/icon/emptystar.png" alt="star-empty">';
    }
  }
} catch (error) {}
