import { useEffect, useState, useRef } from "react";
import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";
import { useParams,  } from 'react-router-dom'
import ContactsService from "../../services/ContactsService";
import Loader from '../../components/Loader'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import toast from '../../utils/toast'



export default function EditContact(){

  const [isLoading, setIsLoading] = useState(true)


  /**
   * @docs
   * Esta eh a referencia criada no componente pai.
   * Esta referencia foi passada para o componente filho, ao qual quero acessar de forma imperativa
   *
   * */
  const contactFormRef = useRef(null)


  const history = useHistory()
  const { id } = useParams()


  useEffect(() => {

    async function loadContact(){
      try{
        const contactData = await ContactsService.getContactById(id)

        contactFormRef.current.setFieldsValues(contactData)


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
            ref={contactFormRef}
            buttonLabel='Salvar Alterações'
            onSubmit={handleSubmit}
          />

      </>

  )
}
