import { Link } from 'react-router-dom'

import {
    Container,
    Header,
    ListHeader,
    Card,
    InputSearchContainer
 } from './styles'

import formatPhone from '../../utils/formatPhone'
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import { useEffect, useState } from 'react'
//import Modal from '../../components/Modal'


export default function Home(){

    const [contacts, setContacts] = useState([])
    const [orderBy, setOrderBy] = useState('asc')

    useEffect(() => {
        fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
            .then(async (response) => {
                const json = await response.json()
                setContacts(json)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [orderBy])  // adicionado esse array vazio, para que a requisição seja executação somente uma vez.
            // Obs.: O nome do array é: Array de dependências
            /*
            Atualizando comentário: Adicionado o state orderBy, para que seja possível alterar o estado da lista de contatos
            dentro do array, eu indico para que o react que o estado seja alterado somente uma vez. Na prática, que seja
            alterado o estado e renderizando a lista de contatos sempre que for clicado no botão de ordenação
            */


    function handleToggleOrderBy() {
        setOrderBy(
            (prevState) => (prevState === 'asc' ? 'desc' : 'asc')
        )
    }

    return (
        <Container>
            {/*
                Quando um parâmetro boolean é passado no meu componente,
                por exemplo o danger, ele sempre será true.
                Para que esse valor seja falso, será necessário explicitar.
                Sendo assim, o parâmetro falso deveria ser escrito: danger={false}
                */}
            {/* <Modal danger /> */}

            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome"/>
            </InputSearchContainer>


            <Header>
                <strong>
                    {contacts.length}
                    {contacts.length === 1 ? ' Contato' : ' Contatos'}
                </strong>
                <Link to='/new'>Novo Contato</Link>
            </Header>


            <ListHeader orderBy={orderBy}>
                <button type='button' className='sort-button' onClick={handleToggleOrderBy}>
                    <span>Nome</span>
                    <img src={arrow} alt='Arrow ordenação' />
                </button>
            </ListHeader>

            {contacts.map((contact) => (
                    <Card key={contact.id}>
                        <div className='info'>
                            <div className='contact-name'>
                                <strong>{contact.name}</strong>
                                {contact.category_name && (
                                    <small>{contact.category_name}</small>
                                )}
                            </div>
                            <span>{contact.email}</span>
                            <span>{formatPhone(contact.phone)}</span>
                        </div>

                        <div className='actions'>
                            <Link to={`/edit/${contact.id}`}> {/*Redirecionando para uma tela de um contato especifico*/}
                                <img src={edit} alt='edit'></img>
                            </Link>

                            <button type='button'>
                                <img src={trash} alt='delete'></img>
                            </button>
                        </div>
                    </Card>
                ))}

        </Container>
    )
}