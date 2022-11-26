const destinoLejano = 60000;
const destinoMedio = 30000;
const destinoCercano = 15000;

let millasCliente = () => {
  let millasCliente = parseInt(prompt('Ingrese su cantidad de millas'));

  while (
    millasCliente == '' ||
    isNaN(millasCliente) == true ||
    millasCliente < 1
  ) {
    millasCliente = prompt(
      'Ingrese su cantidad de millas, el valor tiene que ser numerico y mayor a 0'
    );
  }

  return millasCliente;
};
let tienePlanPlus = () => {
  let planPlus = parseInt(
    prompt("Tiene plan Plus? Pulse '1' para si, o '0' para no")
  );

  while (planPlus < 0 || planPlus > 1) {
    alert('los parametros no son correctos');
    planPlus = parseInt(
      prompt("Tiene plan Plus? Pulse '1' para si, o '0' para no")
    );
  }

  if (planPlus == 1) {
    return true;
  }
  return false;
};

let devolucionDeDatos = (millasClientesVALUE, tienePlanPlusVALUE) => {
  if (tienePlanPlusVALUE) {
    millasClientesVALUE = millasClientesVALUE * 2;
  }
  if (millasClientesVALUE >= destinoLejano) {
    alert(
      'Usted cuenta con: ' +
        millasClientesVALUE +
        ' millas. El destino mas lejano al que puede ir es Europa. Despues del viaje le sobrarian: ' +
        (millasClientesVALUE - destinoLejano) +
        ' milla(s).'
    );
  } else if (millasClientesVALUE >= destinoMedio) {
    alert(
      'Usted cuenta con: ' +
        millasClientesVALUE +
        ' millas. El destino mas lejano al que puede ir es America del Norte. Despues del viaje le sobrarian: ' +
        (millasClientesVALUE - destinoMedio) +
        ' milla(s).'
    );
  } else if (millasClientesVALUE >= destinoCercano) {
    alert(
      'Usted cuenta con: ' +
        millasClientesVALUE +
        ' millas. El destino mas lejano al que puede ir es America del Sur. Despues del viaje le sobrarian: ' +
        (millasClientesVALUE - destinoCercano) +
        ' milla(s).'
    );
  } else {
    alert('No tiene millas suficientes para ninguna de las operaciones');
  }
};

let main = () => {
  alert('Bienvenid@ al sistema de calculo de destino de PACHEAirLines');
  let millasClientesVALUE = millasCliente();
  let tienePlanPlusVALUE = tienePlanPlus();
  devolucionDeDatos(millasClientesVALUE, tienePlanPlusVALUE);
  let repetir = confirm('Quieres volver a usar el sistema?');
  if (repetir) {
    main();
  }
};

main();
