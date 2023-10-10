const IdentificationForm = document.getElementById('IdentificationForm');
const IdFrontField = document.getElementById('IdFrontField');
const IdBackField = document.getElementById('IdBackField');

const ResidenceForm = document.getElementById('ResidenceForm');
const ResidenceField = document.getElementById('ResidenceField');

const AccStatusForm = document.getElementById('AccStatusForm');
const AccStatusField = document.getElementById('AccStatusField');

const UserAvatarForm = document.getElementById('UserAvatarForm');
const UserAvatarField = document.getElementById('UserAvatarField');

const FilesModal = document.getElementById('modalWrapper');
const OpenModalButtons = document.getElementsByClassName('uploadButton');

IdentificationForm.addEventListener('submit', sendIDEvent, false);
ResidenceForm.addEventListener('submit', sendResidenceEvent, false);
AccStatusForm.addEventListener('submit', sendAccStatusEvent, false);
UserAvatarForm.addEventListener('submit', sendUserAvatar, false);

async function sendIDEvent(event) {
  event.preventDefault();
  if (IdBackField.files.length === 0 || IdFrontField.files.length === 0) {
    alert('alguno de los campos esta vacio');
    return;
  }
  if (
    IdBackField.files[0].type.split('/')[0] !== 'image' ||
    IdFrontField.files[0].type.split('/')[0] !== 'image'
  ) {
    alert('alguno de los campos no es una imagen');
    return;
  }
  let extension = IdBackField.files[0].type.split('/')[1];
  let NewBackFile = new File(
    [IdBackField.files[0]],
    'BackIdImage.' + extension,
    { type: IdBackField.files[0].type }
  );
  extension = IdBackField.files[0].type.split('/')[1];
  let NewFrontFile = new File(
    [IdFrontField.files[0]],
    'FrontIdImage.' + extension,
    { type: IdFrontField.files[0].type }
  );
  const UserId = IdentificationForm.attributes.user.value;
  const data = await PostFiles([NewBackFile, NewFrontFile], UserId);
  console.log(data);
}

async function sendResidenceEvent(event) {
  event.preventDefault();
  if (ResidenceField.files.length === 0) {
    alert('No se ha seleccionado ningun Comprobante de Domicilio');
    return;
  }
  if (ResidenceField.files[0].type.split('/')[1] !== 'pdf') {
    console.log(ResidenceField.files[0].type);
    alert('El elemento seleccionado no es un pdf');
    return;
  }
  let extension = ResidenceField.files[0].type.split('/')[1];
  let NewResidenceFile = new File(
    [ResidenceField.files[0]],
    'Residence.' + extension,
    { type: ResidenceField.files[0].type }
  );
  const UserId = ResidenceForm.attributes.user.value;
  const data = await PostFiles([NewResidenceFile], UserId);
  console.log(data);
}

async function sendAccStatusEvent(event) {
  event.preventDefault();
  if (AccStatusField.files.length === 0) {
    alert('No se ha seleccionado ningun Comprobante de Estado de cuenta');
    return;
  }
  if (AccStatusField.files[0].type.split('/')[1] !== 'pdf') {
    console.log(AccStatusField.files[0].type);
    alert('El elemento seleccionado no es un pdf');
    return;
  }
  let extension = AccStatusField.files[0].type.split('/')[1];
  let NewAccStatusFile = new File(
    [AccStatusField.files[0]],
    'AccStatus.' + extension,
    { type: AccStatusField.files[0].type }
  );
  const UserId = ResidenceForm.attributes.user.value;
  const data = await PostFiles([NewAccStatusFile], UserId);
  console.log(data);
}

async function PostFiles(files, userId) {
  const formData = new FormData();
  files.forEach((file) => {
    console.log(file);
    formData.append('document', file);
  });
  const response = await fetch(`/users/${userId}/documents`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
}

async function sendUserAvatar(event) {
  event.preventDefault();
  if (UserAvatarField.files.length === 0) {
    alert('You must select a file to upload');
    return;
  }
  if (UserAvatarField.files[0].type.split('/')[0] !== 'image') {
    console.log(UserAvatarField.files[0].type);
    alert('The selected file is not an image');
    return;
  }
  let extension = UserAvatarField.files[0].type.split('/')[1];
  let NewAccStatusFile = new File(
    [UserAvatarField.files[0]],
    'Avatar.' + extension,
    { type: UserAvatarField.files[0].type }
  );
  const UserId = UserAvatarForm.attributes.user.value;
  const data = await PostFiles([NewAccStatusFile], UserId);
  console.log(data);
}

for (let i = 0; i < OpenModalButtons.length; i++) {
  OpenModalButtons[i].addEventListener('click', openModal);
}

function openAvatarModal() {
  let event = { target: { attributes: { file: { value: 'UserAvatar' } } } };
  openModal(event);
}

function openModal(event) {
  let FileType = event.target.attributes.file.value;

  switch (FileType) {
    case 'identification':
      document.getElementById('ModalTitle').innerText =
        'Upload your Identification files';
      document.getElementById('IdentificationForm_div').classList.add('Active');
      break;
    case 'residence':
      document.getElementById('ModalTitle').innerText =
        'Upload your Residence file';
      document.getElementById('ResidenceForm_div').classList.add('Active');
      break;
    case 'accStatus':
      document.getElementById('ModalTitle').innerText =
        'Upload your Account Status file';
      document.getElementById('AccStatusForm_div').classList.add('Active');
      break;
    case 'UserAvatar':
      document.getElementById('ModalTitle').innerText =
        'Upload your Profile Picture';
      document.getElementById('UserAvatarModal_div').classList.add('Active');
      break;
    default:
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'OCURRIO UN ERROR',
        showConfirmButton: false,
        timer: 1500,
      });
      break;
  }
  FilesModal.classList.add('Active');
}

function closemodal() {
  FilesModal.classList.remove('Active');
  document.getElementById('IdentificationForm_div').classList.remove('Active');
  document.getElementById('ResidenceForm_div').classList.remove('Active');
  document.getElementById('AccStatusForm_div').classList.remove('Active');
  document.getElementById('UserAvatarModal_div').classList.remove('Active');
}
