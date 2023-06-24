import { Container } from "./styles";
import PropTypes from "prop-types";

import xCircleIcon from "../../../assets/images/toast/x-circle.svg";
import checkCircleIcon from "../../../assets/images/toast/check-circle.svg";

export default function ToastMessage({ message, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container variant={message.type} onClick={handleRemoveToast}>
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
  }),
  onRemoveMessage: PropTypes.func.isRequired,
};
