/* eslint-disable react/jsx-no-useless-fragment */
import { Link } from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './style';

// importacoes svg
import arrow from '../../assets/images/arrow.svg';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifier from '../../assets/images/magnifier-question.svg';

import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

import Button from '../../components/button';

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // lista de contatos filtrados
  const filteredContacts = useMemo(
    // eslint-disable-next-line max-len
    () => contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [contacts, searchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (err) {
      setHasError(true);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }
  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isloading={isloading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            type="text"
            placeholder="Pesquisar Contato"
          />
        </InputSearchContainer>
      )}

      {/* Header */}
      <Header
        justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? 'flex-end'
            : contacts.length > 0
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="erro-carregar-contatos" />
          <div className="details">
            <strong>Erro ao carregar lista de contatos</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length < 1 && !isloading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão
                <strong>”Novo contato”</strong>
                {' '}
                à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}
        </>
      )}

      {contacts.length > 0 && filteredContacts.length < 1 && (
        <SearchNotFoundContainer>
          <img src={magnifier} alt="Magnifier Question" />
          <span>
            Nenhum resultado encontrado para
            {' '}
            <strong>{searchTerm}</strong>
          </span>
        </SearchNotFoundContainer>
      )}

      {!hasError && (
        <>
          {filteredContacts.length > 0 && (
            <ListContainer orderBy={orderBy}>
              <header>
                <button
                  type="button"
                  className="sort-button"
                  onClick={handleToggleOrderBy}
                >
                  <span>Nome</span>
                  <img src={arrow} alt="Arrow" />
                </button>
              </header>
            </ListContainer>
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
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="edit-contact" />
                </Link>
                <button type="button">
                  <img src={trash} alt="delete-contact" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
