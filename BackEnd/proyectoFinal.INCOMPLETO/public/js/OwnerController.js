console.log('hello world');

const sentButton = document.getElementById('sentAddProductButton');
const productCode = document.getElementById('productCode');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const productCategory = document.getElementById('productCategory');
const productImage = document.getElementById('productImage');
const productStock = document.getElementById('productStock');
const productVisible = document.getElementById('productVisible');

sentButton.addEventListener('click', sendProductEvent, false);

async function sendProductEvent(event) {
  event.preventDefault();
  let warn = '';
  if (
    productCode.value.trim().length <= 0 ||
    productName.value.trim().length <= 0 ||
    productPrice.value.trim().length <= 0 ||
    productDescription.value.trim().length <= 0 ||
    productCategory.value.trim().length <= 0 ||
    productImage.value.trim().length <= 0 ||
    productStock.value.trim().length <= 0
  ) {
    warn = 'algun campo esta vacio';
    return;
  }
  let product = {
    code: productCode.value,
    name: productName.value,
    price: productPrice.value,
    description: productDescription.value,
    category: productCategory.value,
    image: productImage.value,
    stock: productStock.value,
    visible: productVisible.checked,
  };
  let response = '';
  await fetch(`http://localhost:8080/ownermenu/insertproduct`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (res) => {
    response = await res.json();
  });
  console.log(response);
  let icon = '';
  response.code === 400 ? (icon = 'error') : (icon = 'success');
  Swal.fire({
    position: 'top-end',
    icon: icon,
    title: response.msg,
    showConfirmButton: false,
    timer: 1500,
  });
}
