import { Container } from "./styles";
import PropTypes from "prop-types";

import xCircleIcon from "../../../assets/images/toast/x-circle.svg";
import checkCircleIcon from "../../../assets/images/toast/check-circle.svg";
import { useEffect } from "react";

export default function ToastMessage({ message, onRemoveMessage }) {
  // administrando a remoção do toast dentro de um tempo x
  useEffect(() => {
    // setTimetimeout gera um id do tipo number toda vez que é executado
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 5000);

    return () => {
      // recebe o id do timetou gerado acima, e o cancela, assim nao eh necessario ficar executando o setTimetou() ate o fim do tempo setado
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      variant={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
    >
      {message.type === "danger" && <img src={xCircleIcon} alt="error icon" />}
      {message.type === "success" && (
        <img src={checkCircleIcon} alt="check icon" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "default", "danger"]),
    duration: PropTypes.number,
  }),
  onRemoveMessage: PropTypes.func.isRequired,
};
