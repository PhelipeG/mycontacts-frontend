import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import useEdit from './useEdit';

export default function EditContactPage() {
  const {
    isLoading, contactName, contactFormRef, handleSubmit,
  } = useEdit();

  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Editar Contato"
        onSubmit={handleSubmit}
      />
    </>
  );
}
