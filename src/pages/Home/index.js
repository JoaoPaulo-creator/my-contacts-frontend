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
    const [searchTerm, setSearchTerm] = useState('')

    // Filtrando e verificando se o contato digitado na barra de pesquisa existe e será incluído na nova lista
    // Na prática, quando incluso na nova lista criada pelo filter, então somente aqueles contatos, que estão na lista
    // deverão renderizar/aparecer na tela.


    const filteredContacts = contacts.filter((contact) => (
        /*
        Alternativas: É possível utilizar as funções startsWith() ou endsWith() no lugar do includes
        , para que assim a pesquisa só traga um contato caso este comece ou termine, com certos caractéres digitados
        */
        contact.name.toUpperCase().includes(searchTerm.toUpperCase())
    ))

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

    // toda função passada em um event listener, precisam de um argumento para receber esses eventos
    function handleChangeSarchTerm(event) {
        setSearchTerm(event.target.value)
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
                <input
                    value={searchTerm}
                    type="text"
                    placeholder="Pesquise pelo nome"
                    onChange={handleChangeSarchTerm}
                />

            </InputSearchContainer>


            <Header>
                <strong>
                    {filteredContacts.length}
                    {filteredContacts.length === 1 ? ' Contato' : ' Contatos'}
                </strong>
                <Link to='/new'>Novo Contato</Link>
            </Header>


            {filteredContacts.length > 1 && (
                <ListHeader orderBy={orderBy}>
                <button type='button' className='sort-button' onClick={handleToggleOrderBy}>
                    <span>Nome</span>
                    <img src={arrow} alt='Arrow ordenação' />
                </button>
            </ListHeader>
            )}

            {filteredContacts.map((contact) => (
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