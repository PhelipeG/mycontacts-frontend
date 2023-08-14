/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { SearchContainer } from './styles';

export default function InputSearch({ value, onChange }) {
  return (
    <SearchContainer>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Pesquisar Contato"
      />
    </SearchContainer>
  );
}
InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
