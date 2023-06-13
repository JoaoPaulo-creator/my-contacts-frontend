import isEmailValid from '../../utils/isEmailValid'
import formatPhone from '../../utils/formatPhone'

import { Form, ButtonContainer } from './styles'
import PropTypes from 'prop-types'
import FormGroup from '../FormGroup'
import Input from '../Input'
import Select from '../Select'
import Button from '../Button'
import { useState, useEffect } from 'react'
import useErrors from '../../hooks/useError'
import CategoryService from '../../services/category'


export default function ContactForm({ buttonLabel, onSubmit }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [isLoadingCategories, setisLoadingCategories] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { errors, setError, removeError, getErrorByFieldName } = useErrors()

    const isFormValid = (name && errors.length === 0)


    useEffect(() => {
        async function loadCategories(){
            try {
                const categoriesList = await CategoryService.listCategories()
                setCategories(categoriesList)
            } catch {} finally {
                setisLoadingCategories(false)
            }
        }
        loadCategories()
    }, [])


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
            setError({ field: 'email', message: 'E-mail inválido'})
        }else{
            removeError('email')
        }
    }

    function handlePhoneChange(event){
        setPhone(formatPhone(event.target.value))
    }

    console.log(getErrorByFieldName('name'))

    async function handleSubmit(event){
        event.preventDefault()
        const contactData = { name, email, phone, categoryId }

        setIsSubmitting(true)
        await onSubmit(contactData)
        setIsSubmitting(false)
    }


    return (

        /*
        noValidate é usado para que o html não realize a validação, para que não quebre a execução da aplicação
        caso já exista uma função para isso
        */
        <Form onSubmit={handleSubmit} noValidate>

            <FormGroup
                error={getErrorByFieldName('name')}
            >
                <Input
                    error={getErrorByFieldName('name')}
                    placeholder='Nome *'
                    value={name}
                    disabled={isSubmitting}
                    onChange={handleNameChange}
                />
            </FormGroup>

            <FormGroup
                error={getErrorByFieldName('email')}
            >
                <Input
                    type="email"
                    error={getErrorByFieldName('email')}
                    placeholder='E-mail'
                    value={email}
                    disabled={isSubmitting}
                    onChange={handleEmailChange}
                />
            </FormGroup>
            <FormGroup>
                <Input

                    placeholder='Telefone - (DDD) Numero'
                    value={phone}
                    disabled={isSubmitting}
                    onChange={handlePhoneChange}
                    maxLength="16"
                />
            </FormGroup>

            <FormGroup isLoading={isLoadingCategories}>
                <Select
                    value={categoryId}
                    onChange={(event) => setCategoryId(event.target.value)}
                    disabled={isLoadingCategories || isSubmitting}
                >
                    <option value=''>Selecione a categoria</option>

                    {categories.map(category => (
                       <option key={category.id} value={category.id}>{category.name}</option>
                    ))}

                </Select>
            </FormGroup>
            <ButtonContainer>
                <Button
                    type='submit'
                    disabled={!isFormValid}
                    isLoading={isSubmitting}
                >
                    {buttonLabel}
            </Button>
            </ButtonContainer>
        </Form>
    )
}

ContactForm.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}