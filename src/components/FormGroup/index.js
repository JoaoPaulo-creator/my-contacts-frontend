import PropTypes from 'prop-types'
import { Container } from './styles'

export default function FormGroup({ children }){
    return (
        <Container>
            {children}
        </Container>
    )
}

// As linhas abaixos servem para tipar o children
FormGroup.propType = {
    children: PropTypes.node.isRequired,
}