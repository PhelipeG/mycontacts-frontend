/* eslint-disable max-len */
import {
  useCallback, useEffect, useState, useTransition,
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
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPending, startTransition] = useTransition();

  // lista de contatos filtrados
  // const filteredContacts = useMemo(
  //   // eslint-disable-next-line max-len
  //   () => contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
  //   [contacts, searchTerm],
  // );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
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

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  function handleChangeSearchTerm(event) {
    const { value } = event.target;
    setSearchTerm(event.target.value);

    startTransition(() => {
      setFilteredContacts(contacts.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase())));
    });
  }
  function handleTryAgain() {
    loadContacts();
  }
  const handleDeleteContactModal = useCallback((contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModal(true);
  }, []);
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
    isPending,
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
