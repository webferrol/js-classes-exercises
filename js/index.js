'use strict'

import { Mascota } from './Mascota.js'

function limpiarErrores () {
  const erroresEL = document.querySelectorAll('.error') // null || NodeList[]
  if (erroresEL) {
    erroresEL.forEach((elemento) => {
      elemento.parentElement.removeChild(elemento)
    })
  }
}

function mostrarError (elementoPadre, mensajeValor) {
  const strongEL = document.createElement('strong')
  strongEL.innerHTML = mensajeValor
  strongEL.setAttribute('class', 'error')
  elementoPadre.appendChild(strongEL)
}

function validadoFormulario (form) {
  limpiarErrores()
  const expReg = /^[a-zA-Z\u00C0-\u017F\s]+$/
  if (!expReg.test(form.nombre.value)) {
    mostrarError(form.nombre.parentElement, 'Nombre no válido')
    form.nombre.focus()
    return false
  }

  if (!expReg.test(form.tipo.value)) {
    mostrarError(form.tipo.parentElement, 'Tipo no válido')
    form.tipo.focus()
    return false
  }

  if (!/^[0-9]{15}$/.test(form.microchip.value)) {
    mostrarError(form.microchip.parentElement, 'Microchip no válido 15 dígitos')
    form.microchip.focus()
    return false
  }

  if (!/^([0-9])$|^([1-4][0-9])$/.test(form.edad.value)) {
    mostrarError(form.edad.parentElement, 'Edad no válida. Rango 0-49')
    form.edad.focus()
    return false
  }

  return true
}

let mascota = null

function cargarDatos (form) {
  mascota = new Mascota(form.microchip.value.trim())
  mascota.edad = Number(form.edad.value.trim())
  mascota.nombre = form.nombre.value.trim()
  mascota.tipo = form.tipo.value.trim()
  mascota.sexo = form.sexo.value
}

function visualizarDatos () {
  const texto = `Hola me llamo <span class="nombre">${mascota.nombre}</span> y soy un <span class="tipo">${mascota.tipo}</span>. Tengo <span class="edad">${mascota.edad}</span> años y soy de sexo <span class="sexo">${mascota.dimeSexo()}</span>. Si me pierdo mi microchip es <span class="microchip">${mascota.microchip}</span>.`
  document.querySelector('.texto').innerHTML = texto
}

function gestionarFormulario (e) {
  e.preventDefault()
  if (!validadoFormulario(e.target)) return
  // haré cosas
  cargarDatos(e.target)
  // visualizar datos
  visualizarDatos()
}

document.querySelector('form')
  .addEventListener('submit', gestionarFormulario)
