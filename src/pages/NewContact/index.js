import PageHeader from '../../components/PageHeader'
import ContactForm from '../../components/ContactForm'
import ContactsService from '../../services/ContactsService'
import toast from '../../utils/toast'
import { useRef } from 'react'


export default function NewContact(){


  const newContactRef = useRef(null)

  async function handleSubmit(formData){

      try {
          const contactData = {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              category_id: formData.categoryId
          }

          await ContactsService.createContact(contactData)
          newContactRef.current.resetFields(contactData)


          toast(
            {
              type: 'success',
              text: 'Contato cadastrado com sucesso!',
              duration: 3000
            }
          )

      } catch (error) {
          toast(
            {
              type: 'danger',
              text: 'Ocorreu um erro ao casdastrar o usuario'
            }
          )

      }
    }

    return (
      <>
          <PageHeader
          title='Novo contato'
          />
          <ContactForm
            ref={newContactRef}
            buttonLabel='Cadastrar'
            onSubmit={handleSubmit}
          />
      </>
    )
}
