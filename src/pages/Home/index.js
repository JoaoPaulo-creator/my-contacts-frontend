import { Link } from 'react-router-dom'

import {
    Container,
    Header,
    ListContainer,
    Card,
    InputSearchContainer
 } from './styles'


import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import Modal from '../../components/Modal'

export default function Home(){
    return (
        <Container>
            {/*
                Quando um parâmetro boolean é passado no meu componente,
                por exemplo o danger, ele sempre será true.
                Para que esse valor seja falso, será necessário explicitar.
                Sendo assim, o parâmetro falso deveria ser escrito: danger={false}
                */}
            <Modal danger />

            <InputSearchContainer>
                <input type="text" placeholder="Pesquise pelo nome"/>
            </InputSearchContainer>


            <Header>
                <strong>3 Contatos</strong>
                <Link to='/new'>Novo Contato</Link>
            </Header>


            <ListContainer>
                <header>
                    <button type='button' className='sort-button'>
                        <span>Nome</span>
                        <img src={arrow} alt='Arrow ordenação' />
                    </button>
                </header>

                <Card>
                    <div className='info'>
                        <div className='contact-name'>
                            <strong>Joao Paulo</strong>
                            <small>Instagram</small>
                        </div>
                        <span>joao@teste.com</span>
                        <span>(41) 99999-9999</span>
                    </div>

                    <div className='actions'>
                        <Link to='/edit/123'>
                            <img src={edit} alt='edit'></img>
                        </Link>

                        <button type='button'>
                            <img src={trash} alt='delete'></img>
                        </button>
                    </div>
                </Card>

            </ListContainer>
        </Container>
    )
}