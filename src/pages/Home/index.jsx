import { Link } from 'react-router-dom';
import {
  Container, Header, ListContainer, Card, InputSearchContainer,
} from './style';
import arrow from '../../assets/images/arrow.svg';
import edit from '../../assets/images/edit.svg';
import trash from '../../assets/images/trash.svg';
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';

export default function HomePage() {
  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo Contato</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Luis Felipe G</strong>
              <small>Instagram</small>
            </div>
            <span>luisphelipe414141@gmail.com</span>
            <span>(41)99999-9999</span>
          </div>
          <div className="actions">
            <Link to="/edit">
              <img src={edit} alt="editar contato" />
            </Link>
            <button type="button">
              <img src={trash} alt="deletar contato" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Luis Felipe G</strong>
              <small>Instagram</small>
            </div>
            <span>luisphelipe414141@gmail.com</span>
            <span>(41)99999-9999</span>
          </div>
          <div className="actions">
            <a href="/">
              <img src={edit} alt="editar contato" />
            </a>
            <button type="button">
              <img src={trash} alt="deletar contato" />
            </button>
          </div>
        </Card>
        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Luis Felipe G</strong>
              <small>Instagram</small>
            </div>
            <span>luisphelipe414141@gmail.com</span>
            <span>(41)99999-9999</span>
          </div>
          <div className="actions">
            <a href="/">
              <img src={edit} alt="editar contato" />
            </a>
            <button type="button">
              <img src={trash} alt="deletar contato" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
