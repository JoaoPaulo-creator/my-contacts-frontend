import { Link } from "react-router-dom";

import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from "./styles";

import formatPhone from "../../utils/formatPhone";

import arrow from "../../assets/images/icons/arrow.svg";
import edit from "../../assets/images/icons/edit.svg";
import trash from "../../assets/images/icons/trash.svg";
import Loader from "../../components/Loader";
import sad from "../../assets/images/icons/sad.svg";
import emptyBox from "../../assets/images/icons/empty-box.svg";
import magnifierQuestion from "../../assets/images/icons/magnifier-question.svg";

import { useEffect, useState, useMemo, useCallback } from "react";
import ContactsService from "../../services/ContactsService";
import Button from "../../components/Button";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Filtrando e verificando se o contato digitado na barra de pesquisa existe e será incluído na nova lista
  // Na prática, quando incluso na nova lista criada pelo filter, então somente aqueles contatos, que estão na lista
  // deverão renderizar/aparecer na tela.

  // useMemo é um hook que guarda em cache o estado da lista de contatos, para que a lista não seja carregada/renderizada
  // toda vez que o usuário digite uma letra, por exemplo.
  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        /*
        Alternativas: É possível utilizar as funções startsWith() ou endsWith() no lugar do includes
        , para que assim a pesquisa só traga um contato caso este comece ou termine, com certos caractéres digitados
        */
        contact.name.toUpperCase().includes(searchTerm.toUpperCase())
      ),
    [contacts, searchTerm]
  );

  /*
    O useCallback nao fica criando uma nova função a cada novo render, somente se o valor do que esta no array de dependencia
    sofrer alguma alteracao.

    */

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  /*

    Funções de efeito (as funções "principais" criadas dentro de um useEffect), não podem ser assíncronas.
    Essas funções são síncronas, para evitar race condition, porém não há restrições que impessam a criação
    de funções síncronas dentro da função de efeito, que possam ser assíncronas.

    */

  /*

    A convencao do useEffect é que tudo que esta sendo utilizando dentro da funcao de efeito
    que seja externo, deve ser passado como uma dependencia no array de dependencia. Porem, isso pode
    gerar problemas, como um componente que esta sendo renderizado infinitamente.


    Outro ponto sobre o array de dependencias: Nem sempre o que eh passado no array de dependencias, eh algo
    que sera utilizado dentro da funcao de efeito. Sendo assim, essa dependencia pode ser utilizada para atender
    algum proposito muito especifico, como verificar algum log no momento de uma request, algo do tipo, monitorando um valor.

    */
  useEffect(() => {
    loadContacts();
  }, [loadContacts]); // adicionado esse array vazio, para que a requisição seja executação somente uma vez.
  // Obs.: O nome do array é: Array de dependências
  /*
            Atualizando comentário: Adicionado o state orderBy, para que seja possível alterar o estado da lista de contatos
            dentro do array, eu indico para que o react que o estado seja alterado somente uma vez. Na prática, que seja
            alterado o estado e renderizando a lista de contatos sempre que for clicado no botão de ordenação
            */

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  // toda função passada em um event listener, precisam de um argumento para receber esses eventos
  function handleChangeSarchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  async function handleDeleteContact(id) {
    await fetch(`http://localhost:3001/contacts/${id}`, {
      method: "DELETE",
    });

    setContacts((prevData) => prevData.filter((c) => c.id !== id));
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

      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise pelo nome"
            onChange={handleChangeSarchTerm}
          />
        </InputSearchContainer>
      )}

      {/* Uma prop recebendo como valor, o state de erro */}
      <Header
        justifyContent={
          hasError
            ? "flex-end"
            : contacts.length > 0
            ? "space-between"
            : "center"
        }
      >
        {/* Se nao houver erro, entao renderiza a lista de contatos */}
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? " Contato" : " Contatos"}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="ErrorImage" />
          <div className="details">
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length === 0 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="emptyBox" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{" "}
                <strong>”Novo contato”</strong> acima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />

              <span>
                Nenhum resultado foi encontrado para{" "}
                <strong>”{searchTerm}”</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 1 && (
            <ListHeader orderBy={orderBy}>
              <button
                type="button"
                className="sort-button"
                onClick={handleToggleOrderBy}
              >
                <span>Nome</span>
                <img src={arrow} alt="Arrow ordenação" />
              </button>
            </ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  {" "}
                  {/*Redirecionando para uma tela de um contato especifico*/}
                  <img src={edit} alt="edit"></img>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <img src={trash} alt="delete"></img>
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
