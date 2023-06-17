export default function toast({ type, text }) {

  /**
  * @arguments
  *  - addtoast: nome do evento
  *  - details: detalhes do evento emitido
  */

  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text
    }
  })

  document.dispatchEvent(event)
}
