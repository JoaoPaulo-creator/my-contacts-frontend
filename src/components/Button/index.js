import Spinner from "../Spinner";
import { StyledButton } from "./styles";
import PropTypes from "prop-types";

/*
    A prop children eh utilizada quando necessario criar um label, alguma string para um componente
    Na pratica,
*/
export default function Button({ type, disabled, isLoading, children }) {
    return (
        <StyledButton type={type} disabled={disabled || isLoading}>
            {!isLoading && children}
            {isLoading && <Spinner size={16}/>}
        </StyledButton>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    children: PropTypes.node,
};

Button.defaultProps = {
    type: "button",
    disabled: false,
    isLoading: false,
};
