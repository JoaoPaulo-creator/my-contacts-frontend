import EventManager from "../lib/EventManager"

export const toastEventManager = new EventManager()

export default function toast({ type, text }) {

  /**
  * @arguments
  *  - addtoast: nome do evento
  *  - details: detalhes do evento emitido, contendo mensagem do toast, etc.
  */

  toastEventManager.emit('addtoast', { type, text })
}
