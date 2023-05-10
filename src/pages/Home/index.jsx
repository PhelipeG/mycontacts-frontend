import { Link } from "react-router-dom";
import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
  ErrorContainer,
} from "./style";

//importacoes svg
import arrow from "../../assets/images/arrow.svg";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash.svg";
import sad from "../../assets/images/sad.svg";

import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { useEffect, useMemo, useState } from "react";
import ContactsService from "../../services/ContactsService";

import Button from "../../components/button";

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [contacts, searchTerm]
  );

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);
        setContacts(contactsList);
      } catch (err) {
        setHasError(true);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === "asc" ? "desc" : "asc"));
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isloading={isloading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          type="text"
          placeholder="Pesquisar Contato"
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? " contato" : " contatos"}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="erro-carregar-contatos" />
          <div className="details">
            <span>Erro ao carregar lista de contatos</span>
            <Button type="button">Tentar Novamente</Button>
          </div>
        </ErrorContainer>
      )}

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
              {contact.category_name && <small>{contact.category_name}</small>}
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
    </Container>
  );
}
