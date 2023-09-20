const IdentificationForm = document.getElementById('IdentificationForm');
const IdFrontField = document.getElementById('IdFrontField');
const IdBackField = document.getElementById('IdBackField');

const ResidenceForm = document.getElementById('ResidenceForm');
const ResidenceField = document.getElementById('ResidenceField');

const AccStatusForm = document.getElementById('AccStatusForm');
const AccStatusField = document.getElementById('AccStatusField');

IdentificationForm.addEventListener('submit', sendIDEvent, false);
ResidenceForm.addEventListener('submit', sendResidenceEvent, false);
AccStatusForm.addEventListener('submit', sendAccStatusEvent, false);

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
