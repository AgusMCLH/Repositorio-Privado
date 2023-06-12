// console.log(localStorage.getItem('cartId'));
const cartID = localStorage.getItem('cartId');
const createCart = async () => {
  const response = await fetch(`http://localhost:8080/api/carts`, {
    method: 'POST',
  });
  localStorage.setItem('cartId', await response.json());
  cartID = localStorage.getItem('cartId');
};

if (cartID === null) {
  createCart();
}

const windowLocation = window.location.href;
const productId = windowLocation.split('/')[5];

console.log(document.getElementById('addToCartButton'));
if (document.getElementById('addToCartButton') !== null) {
  document.getElementById('addToCartButton').onclick = async () => {
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartID}/product/${productId}`,
      {
        method: 'POST',
      }
    );
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El producto se agrego al carrito',
      showConfirmButton: false,
      timer: 1500,
    });
  };
}

document.getElementById('cartIcon').href = `/api/carts/${cartID}`;
