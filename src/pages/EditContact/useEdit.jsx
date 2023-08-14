import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';
import useIsMounted from '../../hooks/useIsMounted';

export default function useEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const isMounted = useIsMounted();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getcontactById(id);

        if (isMounted.current) {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setContactName(contact.name);
        }
      } catch {
        if (isMounted.current) {
          history.push('/');
          toast({
            type: 'danger',
            text: 'Contact not found',
          });
        }
      }
    }
    loadContact();
  }, [id, history, isMounted]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsService.updateContact(id, contact);

      await ContactsService.updateContact(id, contact);
      setContactName(contactData.name);
      history.push('/');
      toast({
        type: 'success',
        text: 'Contato atualizado com sucesso !',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato !',
      });
    }
  }
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
