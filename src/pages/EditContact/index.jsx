import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

export default function EditContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getcontactById(id);
        contactFormRef.current.setFieldsValues(contact);
        setIsLoading(false);
      } catch {
        history.pushState('/');
        toast({
          type: 'danger',
          text: 'Contact not found',
        });
      }
    }
    loadContact();
  }, [id, history]);

  function handleSubmit() { }
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title="Editar Luis Felipe" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Editar Contato"
        onSubmit={handleSubmit}
      />
    </>
  );
}
