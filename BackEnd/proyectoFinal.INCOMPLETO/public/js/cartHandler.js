let deleteButtons = document.getElementsByClassName(
  'cart-table-tbody__delete-button'
);
let cartID = window.location.href.split('/').pop();
let homeURL = window.location.href.split('/')[2];

console.log(cartID);
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].onclick = async () => {
    deleteButtons[i].classList.remove('button-background');
    deleteButtons[i].classList.add('loader');
    const response = await fetch(
      `http://${homeURL}/api/carts/${cartID}/product/${deleteButtons[
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
