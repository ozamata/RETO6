'use strict';
import { nacionales } from "../utils/nacionales.js";
console.log(nacionales);

const documentReady = () => {
  const nacionalesBuscador = document.querySelector('#nacionalesBuscador');
  const nacionalesMemeContainer = document.querySelector('#nacionalesMemeContainer');

  const buscadornacionales = (e) => {
    if (e.target.value === '') {
      nacionalesMemeContainer.innerHTML = '';
      return
    }
    nacionalesMemeContainer.innerHTML = '';
    
    const nacionalesBuscados = nacionales.filter((element) => {
      return (element.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
    });

    nacionalesBuscados.forEach((element) => {
      nacionalesMemeContainer.innerHTML += `
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


  nacionalesBuscador.addEventListener('keyup', buscadornacionales);
  internacionalesBuscador.addEventListener('keyup', buscadorinternacionales);
}



document.addEventListener('DOMContentLoaded', documentReady);