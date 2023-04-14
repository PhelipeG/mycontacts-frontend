import PropTypes from 'prop-types';
import { useState } from 'react';
import FormGroup from '../FormGroup';
import Button from '../button';
import Input from '../input';
import Select from '../select';
import { Container, ButtonContainer } from './styles';

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  return (
    <Container>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      </FormGroup>
      <FormGroup
        error="o formato do email e invalido"
      >
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Input placeholder="Telefone" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="1">Celular</option>
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Container>
  );
}
ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
