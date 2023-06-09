const socket = io();

socket.on('Products', (Products) => {
  let html = Products.map((product) => {
    if (product.visible === true) {
      return `
        <a href='/api/products/${product.id}'>
            <div class="product-item">
                <div class="product-item__content">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p class="product-item__stock">Stock: ${product.stock}</p>
                    <p class="product-item__price">$ ${product.price}</p>
                </div>
            </div>
        </a>`;
    }
    return;
  });
  document.getElementById('product-list').innerHTML = html;
});
