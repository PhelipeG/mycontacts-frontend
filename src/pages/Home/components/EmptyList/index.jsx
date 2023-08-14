/* eslint-disable import/no-unresolved */
import emptyBox from '../../../../assets/images/empty-box.svg';

export default function EmptyList() {
  return (
    <Container>
      <img src={emptyBox} alt="Empty Box" />

      <p>
        Você ainda não tem nenhum contato cadastrado!
        {' '}
        <br />
        Clique no botão
        {' '}
        <strong>“Novo contato”</strong>
        {' '}
        à cima para
        {' '}
        <br />
        cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
