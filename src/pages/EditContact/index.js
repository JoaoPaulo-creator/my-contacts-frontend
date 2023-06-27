import { useEffect, useState } from "react";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { useParams,  } from 'react-router-dom'
import ContactsService from "../../services/ContactsService";
import Loader from '../../components/Loader'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import toast from '../../utils/toast'



export default function EditContact(){

  const [isLoading, setIsLoading] = useState(true)

  const history = useHistory()
  const { id } = useParams()


  useEffect(() => {

    async function loadContact(){
      try{
        const contactData = await ContactsService.getContactById(id)
        console.log(contactData)
        setIsLoading(false)

      }catch (error) {
        history.push('/')
        toast({
          type: 'danger',
          text: 'Contato não encontrado'
        })
      }

    }

    loadContact()
  }, [id, history])

  function handleSubmit(){
    console.log('')
  }

  return (
      <>
          <Loader isLoading={isLoading}/>

          <PageHeader
              title='Editar João Paulo'
          />

          <ContactForm
              buttonLabel='Salvar Alterações'
              onSubmit={handleSubmit}
          />

      </>

  )
}
