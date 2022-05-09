'use strict';
// import { allData } from "../utils/allData.js";
// import models from "./models.js";
// import { Contacto } from "../js/Contacto.js";
// const documentReady2 = () => {
//   models(allData);
// }


let contactos = [
  new Contacto('Jose', 954495884, 'Saludos doy mi voto alianza'),
  new Contacto('Oscar', 989595884, 'Saludos mi equipo es la U'),
  new Contacto('Mario', 966595884, 'Saludos doy para melgar'),
  new Contacto('Elmer', 966595884, 'Saludos doy para melgar')
];
const contenedorAlerta = document.querySelector('#contenedorAlerta');
let timeoutId = 0;

const showAlert = (type, content) => {
  clearTimeout(timeoutId);
  contenedorAlerta.classList.remove('bg-primary');
  contenedorAlerta.classList.remove('bg-success');
  contenedorAlerta.classList.remove('bg-danger');
  switch (type) {
    case 'primary':
      contenedorAlerta.classList.add('bg-primary');
      break;
    case 'success':
      contenedorAlerta.classList.add('bg-success');
      break;
    case 'danger':
      contenedorAlerta.classList.add('bg-danger');
      break;
    default:
      contenedorAlerta.classList.add('bg-primary');
      break;
  }
  contenedorAlerta.innerHTML = content;
  timeoutId = setTimeout(() => {
    contenedorAlerta.innerHTML = '';
  }, 5000);
};

const getFormData = () => {
  const documentFormContacto = document.forms['formContacto'];
  const id = documentFormContacto['id'].value;
  const nombre = documentFormContacto['nombre'].value;
  const celular = documentFormContacto['celular'].value;
  const mensaje = documentFormContacto['mensaje'].value;

  return ({ id, nombre, celular, mensaje});
};

const validateForm = () => {
  const documentFormContacto = document.forms['formContacto'];
  const nombre = documentFormContacto['nombre'].value;
  const celular = documentFormContacto['celular'].value;
  const mensaje = documentFormContacto['mensaje'].value;

  return [nombre.trim(), celular.trim(), mensaje.trim()].includes('');
};

const resetForm = () => {
  const documentFormContacto = document.forms['formContacto'];
  documentFormContacto['id'].value = '';
  documentFormContacto['nombre'].value = '';
  documentFormContacto['celular'].value = '';
  documentFormContacto['mensaje'].value = '';
};

const createContact = () => {
  const { nombre, celular,mensaje } = getFormData();
  if (validateForm()) {
    showAlert('danger', 'Completar todos los campos');
  } else {
    contactos = [...contactos, new Contacto(nombre,celular, mensaje)];
    resetForm();
    readContact();
    showAlert('primary', 'Registro creado');
  }
};

const readContact = () => {
  const tBodyContacto = document.querySelector('#tBodyContacto');
  tBodyContacto.innerHTML = '';

  contactos.forEach((element) => {
    const { id, nombre, celular, mensaje} = element;
    tBodyContacto.innerHTML += `
      <tr>
        <th>${id}</th>
        <td>${nombre}</td>
        <td>${celular})}</td>
        <td>${mensaje}</td>
        <td>
          <button
            class="bg-success rounded border-0 p-2"
            onclick="readContactos(${id})"
          >
            ✏
          </button>
          <button
            class="bg-danger rounded border-0 p-2"
            onclick="deleteContact(${id})"
          >
            🗑
          </button>
        </td>
      </tr>
    `
  });
  showAlert('primary', 'Registros leídos');
};

const readContactos = (contactId) => {
  const documentFormContacto = document.querySelector('#formContacto');
  const formTitle = document.querySelector('#formTitle');
  const formButton = document.querySelector('#formButton');

  const contacto = contactos.find((element) => {
    return element.id === contactId;
  });
  const { id, nombre, celular, mensaje} = contacto;

  formTitle.innerHTML = 'Editar contacto';
  formButton.innerHTML = 'Editar';
  documentFormContacto['id'].value = id;
  documentFormContacto['nombre'].value = nombre;
  documentFormContacto['celular'].value = celular;
  documentFormContacto['mensaje'].value = mensaje;
  showAlert('primary', 'Registro leído');
};

const updateContact = () => {
  const { id, nombre, celular, mensaje} = getFormData();
  const formTitle = document.querySelector('#formTitle');
  const formButton = document.querySelector('#formButton');

  if (validateForm()) {
    showAlert('danger', 'Completar todos los campos');
  } else {
    contactos = contactos.map((element) => {
      if (element.id !== +id) {
        return element;
      } else {
        element.nombre = nombre;
        element.celular = celular;
        element.mensaje = mensaje;
        return element;
      }
    });

    resetForm();
    formTitle.innerHTML = 'Crear contacto';
    formButton.innerHTML = 'Crear';
    readContact();
    showAlert('success', 'Registro actualizado');
  }
};

const deleteContact = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2',
      cancelButton: 'btn btn-danger mx-2'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: '¿Está seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '¡Sí, elimínalo!',
    cancelButtonText: '¡No, cancélalo!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      contactos = contactos.filter((element) => {
        return element.id !== id;
      });
      readContact();
      showAlert('danger', 'Registro eliminado');
      swalWithBootstrapButtons.fire(
        '¡Eliminado!',
        'Tu registro ha sido eliminado.',
        'success'
      );
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'Tu registro está seguro',
        'error'
      );
    }
  });
};

const documentReady = () => {
  const formContacto = document.querySelector('#formContacto');

  const submitContact = (e) => {
    e.preventDefault();
    const id = document.getElementById('formId').value;
    if (id === '') {
      createContact();
    } else {
      updateContact();
    }
  };

  readContact();
  formContacto.addEventListener('submit', submitContact);
};

document.addEventListener('DOMContentLoaded', documentReady);
