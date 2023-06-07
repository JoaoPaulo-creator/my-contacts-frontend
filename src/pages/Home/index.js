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
import Loader from '../../components/Loader'

import { useEffect, useState, useMemo } from 'react'
import ContactsService from '../../services/ContactsService'


export default function Home(){

    const [contacts, setContacts] = useState([])
    const [orderBy, setOrderBy] = useState('asc')
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    // Filtrando e verificando se o contato digitado na barra de pesquisa existe e será incluído na nova lista
    // Na prática, quando incluso na nova lista criada pelo filter, então somente aqueles contatos, que estão na lista
    // deverão renderizar/aparecer na tela.


    // useMemo é um hook que guarda em cache o estado da lista de contatos, para que a lista não seja carregada/renderizada
    // toda vez que o usuário digite uma letra, por exemplo.
    const filteredContacts = useMemo(() => contacts.filter((contact) => (
        /*
        Alternativas: É possível utilizar as funções startsWith() ou endsWith() no lugar do includes
        , para que assim a pesquisa só traga um contato caso este comece ou termine, com certos caractéres digitados
        */
        contact.name.toUpperCase().includes(searchTerm.toUpperCase())
    )), [contacts, searchTerm])



    /*
    Funções de efeito (as funções "principais" criadas dentro de um useEffect), não podem ser assíncronas.
    Essas funções são síncronas, para evitar race condition, porém não há restrições que impessam a criação
    de funções síncronas dentro da função de efeito, que possam ser assíncronas.
    */

    useEffect(() => {

        async function loadContact(){
            try {
                setIsLoading(true)
                const contactsList = await ContactsService.listContacts(orderBy)

                if(contactsList){
                    setContacts(contactsList)
                }else {
                    console.error('Erro')
                }

            } catch (error) {
                console.log('Name ->', error.name)
                console.log(error.response)
                console.log(error)
            } finally {
                setIsLoading(false)
            }

        }

        loadContact()

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

            <Loader isLoading={isLoading}/>

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