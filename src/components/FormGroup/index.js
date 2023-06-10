import PropTypes from 'prop-types'
import { Container } from './styles'
import Spinner from '../Spinner'

export default function FormGroup({ children, error, isLoading }){
    return (
        <Container>
            <div className="form-item">
                {children}
                {isLoading && (
                    <div className='loader'>
                        <Spinner size={16}/>
                    </div>)
                }
            </div>

            {error && <small>{error}</small>}
        </Container>
    )
}

// As linhas abaixos servem para tipar o children
FormGroup.propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool,
}

FormGroup.defaultProps = {
    error: null,
    isLoading: false
}