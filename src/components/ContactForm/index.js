import isEmailValid from '../../utils/isEmailValid'

import { Form, ButtonContainer } from './styles'
import PropTypes from 'prop-types'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'
import { useState } from 'react'
import useErrors from '../../hooks/useError'


export default function ContactForm({ buttonLabel }){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [category, setCategory] = useState('')

    const { setError, removeError, getErrorByFieldName } = useErrors()



    function handleNameChange(event){
        setName(event.target.value)

        if(!event.target.value){
            setError({ field: 'name', message: 'Nome é obrigatório'})
        }else {
            removeError('name')
        }
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)

        if(event.target.value && !isEmailValid(event.target.value)){
            // verificando se erro já existe
            setError({ field: 'email', message: 'E-mail inválido'})
        }else{
            removeError('email')
        }
    }

    console.log(getErrorByFieldName('name'))

    function handleSubmit(event){
        event.preventDefault()
        console.log({
            name, email, phone, category
        })
    }


    return (
        <Form onSubmit={handleSubmit}>

            <FormGroup
                error={getErrorByFieldName('name')}
            >
                <Input
                    error={getErrorByFieldName('name')}
                    placeholder='Nome'
                    value={name}
                    onChange={handleNameChange}
                />
            </FormGroup>

            <FormGroup
                error={getErrorByFieldName('email')}
            >
                <Input
                    error={getErrorByFieldName('email')}
                    placeholder='E-mail'
                    value={email}
                    onChange={handleEmailChange}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    placeholder='Telefone'
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
            </FormGroup>

            <FormGroup>
                <Select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                >
                    <option value=''>Categoria</option>
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