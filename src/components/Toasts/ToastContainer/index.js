import { Container } from "./styles";
import ToastMessage from "../ToastMessage";
import { useState, useEffect } from "react";

export default function ToastContainer() {

  const messageList = [
    { id: Math.random(), type: "default", text: "Default text" },
    { id: Math.random(), type: "danger", text: "Danger text" },
    { id: Math.random(), type: "success", text: "Success text" },
  ];

  const [messages, setMessages] = useState([])

  useEffect(() => {

    function handleAddToast(event) {
      const { type, text } = event.detail
      setMessages((prevState) => [
        ...prevState,
        {id: Math.random(), type, text}
      ])
    }

    document.addEventListener('addtoast', handleAddToast)

    return () => {
      /**
       * remove o event listener, impedindo que o evento seja emitido infinitamente
       * O segunto argumento desta função (função nativa), recebe a função de evento.
       *
       * Com esse desmonte/remoção, o evento será emitido somente uma vez.
       * Exemplo: Se ocorre um erro na request de cadastro de contato, o toast de erro será montado uma vez a cada
       * erro emitido pelo back. Se tentei cadastrar um usuário que já 3 vezes, logo 3 mensagens de erro serão emitidas
       * */
      document.removeEventListener('addtoast', handleAddToast)
    }
  })


  return (
    <Container>
      {messages.map(({ id, type, text }) => (
        <ToastMessage key={id} type={type} text={text} />
      ))}
    </Container>
  )
}
