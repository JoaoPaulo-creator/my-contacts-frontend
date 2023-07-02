import { useEffect, useState, useRef } from "react";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { useParams } from "react-router-dom";
import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import toast from "../../utils/toast";
import { useSafeAsyncOperation } from "../../hooks/useSafeAsyncOperation";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  /**
   * @docs
   * Esta eh a referencia criada no componente pai.
   * Esta referencia foi passada para o componente filho, ao qual quero acessar de forma imperativa
   *
   * */
  const contactFormRef = useRef(null);

  const history = useHistory();
  const { id } = useParams();

  const safeAsyncOperation = useSafeAsyncOperation();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(id);

        safeAsyncOperation(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoading(false);
          setName(contact.name);
        });
      } catch (error) {
        safeAsyncOperation(() => {
          history.push("/");
          toast({
            type: "danger",
            text: "Contato não encontrado",
          });
        });
      }
    }

    loadContact();
  }, [id, history, safeAsyncOperation]);

  async function handleSubmit(formData) {
    try {
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const updatedContact = await ContactsService.updateContact(
        id,
        contactData
      );
      setName(updatedContact.name);

      toast({
        type: "success",
        text: "Contato editado com sucesso!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao editar o contato",
      });
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      {isLoading ? "Carregando..." : <PageHeader title={`Editar ${name}`} />}

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
