let deleteButtons = document.getElementsByClassName(
  'cart-table-tbody__delete-button'
);
let cartID = window.location.href.split('/').pop();

console.log(cartID);
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].onclick = async () => {
    deleteButtons[i].classList.remove('button-background');
    deleteButtons[i].classList.add('loader');
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartID}/product/${deleteButtons[
        i
      ].getAttribute('productid')}`,
      {
        method: 'DELETE',
      }
    ).then((res) => {
      location.reload();
    });
  };
}
