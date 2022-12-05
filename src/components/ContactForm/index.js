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
                <Input
                    placeholder='Nome'
                    onChange={() => console.log('Digitou...')}
                />
            </FormGroup>

            <FormGroup
                error="O formato do email é inválido"
            >
                <Input placeholder='Email' error/>
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