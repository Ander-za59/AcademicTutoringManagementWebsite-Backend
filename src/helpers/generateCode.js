export const generarCodigoVerificacionUnico = () => {
  const longitud = 10
  let codigo = ''
  for (let i = 0; i < longitud; i++) {
    codigo += Math.floor(Math.random() * 10) // solo números del 0 al 9
  }
  return codigo
}
