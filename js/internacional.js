'use strict';
import { internacionales } from "../utils/internacionales.js";
console.log(internacionales);

const documentReady = () => {
  const internacionalesBuscador = document.querySelector('#internacionalesBuscador');
  const internacionalesMemeContainer = document.querySelector('#internacionalesMemeContainer');

  const buscadorinternacionales = (e) => {
    if (e.target.value === '') {
      internacionalesMemeContainer.innerHTML = '';
      return
    }
    internacionalesMemeContainer.innerHTML = '';
    
    const internacionalesBuscados = internacionales.filter((element) => {
      return (element.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
    });

    internacionalesBuscados.forEach((element) => {
      internacionalesMemeContainer.innerHTML += `
      <div class="nacionales__meme">
        <figure class="nacionales__meme-image-container">
          <img src="${element.imagen}" alt="${element.nombre}" class="nacionales__meme-image" />
        </figure>
        <h3 class="nacionales__meme-title">${element.nombre}</h3>
        <a href="${element.enlace}" class="nacionales__meme-button">Ver</a>
      </div>
    `
    });
  
};


  internacionalesBuscador.addEventListener('keyup', buscadorinternacionales);
  internacionalesBuscador.addEventListener('keyup', buscadorinternacionales);
}



document.addEventListener('DOMContentLoaded', documentReady);