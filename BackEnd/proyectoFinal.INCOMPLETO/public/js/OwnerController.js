const UpdateProductId = document.getElementById('Update-productID');
const UpdateProductCode = document.getElementById('Update-productCode');
const UpdateProductName = document.getElementById('Update-productName');
const UpdateProductPrice = document.getElementById('Update-productPrice');
const UpdateProductDescription = document.getElementById(
  'Update-productDescription'
);
const UpdateProductCategory = document.getElementById('Update-productCategory');
const UpdateProductImage = document.getElementById('Update-productImage');
const UpdateProductStock = document.getElementById('Update-productStock');
const UpdateProductVisible = document.getElementById('Update-productVisible');

let modalButtons = document.getElementsByClassName('modal_switch');

for (let i = 0; i < modalButtons.length; i++) {
  modalButtons[i].addEventListener('click', (e) => {
    console.log('target', e.target);
    console.log('silbing', e.target.nextElementSibling);
    e.target.nextElementSibling.classList.add('active');
  });
}

let homeURL = window.location.href.split('/')[2];
let cancelButtons = document.getElementsByClassName('cancel_update');

for (let j = 0; j < cancelButtons.length; j++) {
  console.log(cancelButtons[j]);
  cancelButtons[j].addEventListener('click', (e) => {
    for (let k = 0; k < modalButtons.length; k++) {
      modalButtons[k].nextElementSibling.classList.remove('active');
    }
  });
}

////////////////////////////////////

async function sendProductEvent() {
  if (
    UpdateProductCode.value.trim().length <= 0 ||
    UpdateProductName.value.trim().length <= 0 ||
    UpdateProductPrice.value.trim().length <= 0 ||
    UpdateProductDescription.value.trim().length <= 0 ||
    UpdateProductCategory.value.trim().length <= 0 ||
    UpdateProductImage.value.trim().length <= 0 ||
    UpdateProductVisible.value.trim().length <= 0 ||
    UpdateProductStock.value.trim().length <= 0
  ) {
    warn = 'algun campo esta vacio';
    return;
  }
  let product = {
    code: UpdateProductCode.value,
    name: UpdateProductName.value,
    price: UpdateProductPrice.value,
    description: UpdateProductDescription.value,
    category: UpdateProductCategory.value,
    image: UpdateProductImage.value,
    stock: UpdateProductStock.value,
    visible: UpdateProductVisible.checked,
  };
  let response = '';
  await fetch(`http://${homeURL}/ownermenu/insertproduct`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (res) => {
    response = await res.json();
  });
  let icon = '';
  response.code === 400 ? (icon = 'error') : (icon = 'success');
  Swal.fire({
    position: 'top-end',
    icon: icon,
    title: response.msg,
    showConfirmButton: false,
    timer: 1500,
  }).then(
    setTimeout(() => {
      location.reload();
    }, 1000)
  );
}

////////////////////////////////////

async function updateProductEvent() {
  let warn = '';
  if (
    UpdateProductId.value.trim().length <= 0 ||
    UpdateProductCode.value.trim().length <= 0 ||
    UpdateProductName.value.trim().length <= 0 ||
    UpdateProductPrice.value.trim().length <= 0 ||
    UpdateProductDescription.value.trim().length <= 0 ||
    UpdateProductCategory.value.trim().length <= 0 ||
    UpdateProductImage.value.trim().length <= 0 ||
    UpdateProductStock.value.trim().length <= 0
  ) {
    warn = 'algun campo esta vacio';
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: warn,
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }
  let product = {
    id: UpdateProductId.value,
    code: UpdateProductCode.value,
    name: UpdateProductName.value,
    price: UpdateProductPrice.value,
    description: UpdateProductDescription.value,
    category: UpdateProductCategory.value,
    image: UpdateProductImage.value,
    stock: UpdateProductStock.value,
    visible: UpdateProductVisible.checked,
  };
  console.log(product);
  let response = '';
  await fetch(`http://${homeURL}/ownermenu/updateproduct`, {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then(async (res) => {
    response = await res.json();
  });
  let icon = '';
  response.code === 400 ? (icon = 'error') : (icon = 'success');
  Swal.fire({
    position: 'center',
    icon: icon,
    title: response.msg,
    showConfirmButton: false,
    timer: 1500,
  }).then(
    setTimeout(() => {
      location.reload();
    }, 1000)
  );
}

///////////////////////////////////////////
async function deletefunction(id) {
  console.log(id);
  Swal.fire({
    title: 'Estas seguro?',
    text: 'No podras revertir esta accion!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrarlo!',
    cancelButtonText: 'Volver',
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetch(`http://${homeURL}/ownermenu/deleteproduct`, {
        method: 'delete',
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(async (res) => {
        response = await res.json();
        let icon = '';
        response.code === 400 ? (icon = 'error') : (icon = 'success');
        Swal.fire({
          position: 'center',
          icon: icon,
          title: response.msg,
          showConfirmButton: false,
          timer: 1500,
        }).then(
          setTimeout(() => {
            location.reload();
          }, 1000)
        );
      });
    }
  });
}

const closemodal = () => {
  document.getElementById('modal').classList.remove('active');
};
const showmodal = async (type, id) => {
  console.log(type);
  let modal_title = document.getElementById('modal_title');
  if (type === 'insert') {
    modal_title.innerHTML = 'Agregar Producto';
    UpdateProductId.value = '';
    UpdateProductCode.value = '';
    UpdateProductName.value = '';
    UpdateProductPrice.value = '';
    UpdateProductDescription.value = '';
    UpdateProductCategory.value = '';
    UpdateProductImage.value = '';
    UpdateProductStock.value = '';
    UpdateProductVisible.checked = false;
    document.getElementById('modal').classList.add('active');
  } else if (type === 'update') {
    modal_title.innerHTML = 'Editar Producto';
    let product = await fetch(`http://${homeURL}/api/products/${id}/json`, {
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(async (res) => {
        let product = await res.json();
        console.log('response', product);
        UpdateProductId.value = product._id;
        UpdateProductCode.value = product.code;
        UpdateProductName.value = product.title;
        UpdateProductPrice.value = product.price;
        UpdateProductDescription.value = product.description;
        UpdateProductCategory.value = product.category;
        UpdateProductImage.value = product.thumbnail[0];
        UpdateProductStock.value = product.stock;
        UpdateProductVisible.checked = product.visible;

        return product;
      })
      .then((product) => {
        document.getElementById('modal').classList.add('active');
      });
    console.log(product);
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'OCURRIO UN ERROR',
      showConfirmButton: false,
      timer: 1500,
    }).then(
      setTimeout(() => {
        location.reload();
      }, 1000)
    );
    return;
  }
};

const sendEvent = () => {
  let text = document.getElementById('modal_title').innerText.split(' ')[0];
  if (text === 'Agregar') {
    sendProductEvent();
  } else if (text === 'Editar') {
    updateProductEvent();
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'OCURRIO UN ERROR',
      showConfirmButton: false,
      timer: 1500,
    }).then(
      setTimeout(() => {
        location.reload();
      }, 1000)
    );
    return;
  }
};
