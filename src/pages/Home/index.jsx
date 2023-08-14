/* eslint-disable react/jsx-no-useless-fragment */
import {
  Container,
} from './style';

// importacoes svg
import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import useHome from './useHome';
import InputSearch from '../../components/InputSearch';
import Header from './components/Header';
import EmptyList from './components/EmptyList';
import ErrorStatus from './components/ErrorStatus';
import SearchNotFound from './components/SearchNotFound';
import ContactList from './components/ContactList';

export default function HomePage() {
  const {
    contacts,
    orderBy,
    isloading,
    searchTerm,
    hasError,
    isDeleteModal,
    contactBeingDeleted,
    isLoadingDelete,
    filteredContacts,
    handleToggleOrderBy,
    handleDeleteContactModal,
    handleChangeSearchTerm,
    handleTryAgain,
    handleCloseDeleteContactModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
  } = useHome();

  const hasContacts = contacts.length > 0;
  const isListEmpty = !hasError && (!isloading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts.length < 1);

  return (
    <Container>
      <Loader isloading={isloading} />

      <Modal
        danger
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}" ? `}
        confirmLabel="Deletar"
        cancelLabel="Cancelar"
        onCancel={handleCloseDeleteContactModal}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModal}
      >
        <p>Esta acao nao podera ser desfeita !</p>
      </Modal>

      {hasContacts && (
      <InputSearch
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      )}

      {/* Header */}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}

      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

      {hasContacts && (
        <>
          <ContactList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContactModal}
          />
          <Modal
            danger
            visible={isDeleteModalVisible}
            isLoading={isLoadingDelete}
            title={`Tem certeza que deseja remover o contato “${contactBeingDeleted?.name}” ?`}
            confirmLabel="Deletar"
            onCancel={handleCloseDeleteContactModal}
            onConfirm={handleConfirmDeleteContact}
          >
            <p>Esta ação não poderá ser desfeita!</p>
          </Modal>
        </>
      ) }
    </Container>
  );
}
