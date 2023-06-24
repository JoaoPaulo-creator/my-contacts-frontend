import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { useState, useEffect } from "react";
import { toastEventManager } from "../../../utils/toast";

export default function ToastContainer() {

  const [messages, setMessages] = useState([])

  useEffect(() => {

    function handleAddToast({ type, text }) {

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text }
      ])
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      /**
       * remove o event listener, impedindo que o evento seja emitido infinitamente
       * O segunto argumento desta função (função nativa), recebe a função de evento.
       *
       * Com esse desmonte/remoção, o evento será emitido somente uma vez.
       * Exemplo: Se ocorre um erro na request de cadastro de contato, o toast de erro será montado uma vez a cada
       * erro emitido pelo back. Se tentei cadastrar um usuário que já 3 vezes, logo 3 mensagens de erro serão emitidas
       * */
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])


  function handleRemoveMessage(id) {
    setMessages((prevState) => prevState.filter((message) => message.id !== id))
  }


  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage} //funcao de callback para poder executar do component filho para o component pai
        />
      ))}
    </Container>
  )
}
