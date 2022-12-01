import { Form, ButtonContainer } from './styles'
import PropTypes from 'prop-types'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'


export default function ContactForm({ buttonLabel }){
    return (
        <Form>
            <FormGroup>
                <Input placeholder='Nome'/>
            </FormGroup>

            <FormGroup>
                <Input placeholder='Email'/>
            </FormGroup>
            <FormGroup>
                <Input placeholder='Telefone'/>
            </FormGroup>

            <FormGroup>
                <Select>
                    <option value='Instragram'>Instragram</option>
                    <option value='LinkdIn'>LinkdIn</option>
                    <option value='Twitter'>Twitter</option>
                </Select>
            </FormGroup>
            <ButtonContainer>
                <Button type='submit'>
                    {buttonLabel}
                </Button>
            </ButtonContainer>
        </Form>
    )
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}