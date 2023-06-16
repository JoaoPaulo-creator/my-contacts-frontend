import { Container } from "./styles";
import PropTypes from "prop-types";

import xCircleIcon from "../../../assets/images/toast/x-circle.svg";
import checkCircleIcon from "../../../assets/images/toast/check-circle.svg";

export default function ToastMessage({ text, type }) {
  return (
    <Container>
      {type === "danger" && <img src={xCircleIcon} alt="error icon" />}
      {type === "success" && <img src={checkCircleIcon} alt="check icon" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "default", "danger"]),
};

ToastMessage.defaultProps = {
  type: "default",
};
