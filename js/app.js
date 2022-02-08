//Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
//User interface
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');
//Event listenters
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener('input', datosCita);
  propietarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);
  formulario.addEventListener('submit', nuevaCita);
}
//Objeto con informacion de la cita
const citaObj = {
  mascota: '',
  propietario: '',
  telefono: '',
  fecha: '',
  hora: '',
  sintomas: '',
};
//Funciones
//Agrega datos al objeto cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}
//valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault();
  //Extraer informacion del objetoo Citas
  const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
  //validar
  if (!mascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
    ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

    return;
  } else {
    console.log('enviar datos');
  }
  //Generar un ID para cada cita
  citaObj.id = Date.now();
  //Creando nueva cita
  administrarCitas.agregarCita({...citaObj});
  //reset formulario
  formulario.reset();
  //Vaciar objeto citas
  reiniciarObjeto();
  //Mostrar citas en el DOM
  ui.imprimirCitas(administrarCitas);
}
function reiniciarObjeto() {
  citaObj.mascota = '';
  citaObj.propietario = '';
  citaObj.telefono = '';
  citaObj.fecha = '';
  citaObj.hora = '';
  citaObj.sintomas = '';
}
//Clases
class Citas {
  constructor() {
    this.citas = [];
  }
  agregarCita(cita) {
    this.citas = [...this.citas, cita];
    console.log(this.citas);
  }
}
class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('alert', 'text-center', 'col-12', 'd-block');
    if (tipo === 'error') {
      divMensaje.classList.add('alert-danger');
    } else {
      divMensaje.classList.add('alert-success');
    }
    //mensaje
    divMensaje.textContent = mensaje;
    //agregar al DOM
    document
      .querySelector('#contenido')
      .insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    //quitar mensaje error
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
  imprimirCitas({citas}) {
    console.log(citas);
    citas.forEach(cita => {
      const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
      const divCita = document.createElement('div');
      divCita.classList.add('cita', 'p-3');
      divCita.dataset.id = id;

      //Scripting de los elemento de cada cita
      const mascotaParrafo = document.createElement('h2');
      mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
      mascotaParrafo.textContent = mascota;
      //propietario
      const propietarioParrafo = document.createElement('p');
      propietarioParrafo.innerHTML = ` 
        <span class="font-weight-bolder">Propietario:</span> ${propietario}
      `;
      //Telefono
      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `
      <span class="font-weight-bolder">Propietario:</span> ${telefono}
      `;
      //Fecha
      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `
      <span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;
      //Hora
      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `
      <span class="font-weight-bolder">Hora:</span> ${hora}
      `;
      //Sintomas
      const sintomasParrafo = document.createElement('p');
      sintomasParrafo.innerHTML = `
      <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
      `;
      //Boton Eliminar
      const botonEliminar = document.createElement('button');
      botonEliminar.dataset.id = id;
      botonEliminar.classList.add('btn', 'btn-danger');
      botonEliminar.innerText = 'Eliminar';
      //Boton Editar
      const botonEditar = document.createElement('button');
      botonEditar.dataset.id = id;
      botonEditar.classList.add('btn', 'btn-primary');
      botonEditar.innerText = 'Editar';
      //agregar parrafos al div cita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(botonEditar);
      divCita.appendChild(botonEliminar);
      //agregar las citas el HTML
      contenedorCitas.appendChild(divCita);
    });
  }
}
//instancias globales
const ui = new UI();
const administrarCitas = new Citas();
