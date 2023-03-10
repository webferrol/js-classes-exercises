export class Mascota {
  nombre = 'Sin nombre'
  tipo = ''
  microchip = ''
  edad = 0
  sexo = 'f'

  constructor (micro) {
    this.microchip = micro
  }

  dimeSexo () {
    return (this.sexo === 'f') ? 'Femenino' : 'Masculino'
  }
}
