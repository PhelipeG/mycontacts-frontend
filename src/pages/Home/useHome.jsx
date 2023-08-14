import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isloading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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
      setContacts([]);// resetando quando der erro
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
  function handleDeleteContactModal(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModal(true);
  }
  function handleCloseDeleteContactModal() {
    setIsDeleteModal(false);
    setContactBeingDeleted(null);
  }
  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id === contactBeingDeleted.id,
      ));

      handleCloseDeleteContactModal();

      toast({
        type: 'success',
        text: 'Contato Deletado',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu erro ao deletar contato',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }
  return {
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
  };
}
