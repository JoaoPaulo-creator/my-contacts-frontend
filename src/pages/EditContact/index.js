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
  const [name, setName] = useState('')


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
        const contact = await ContactsService.getContactById(id)

        contactFormRef.current.setFieldsValues(contact)


        console.log(contact)
        setIsLoading(false)
        setName(contact.name)
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


          {isLoading ? 'Carregando...' :
          <PageHeader
              title={`Editar ${name}`}
          />}

          <ContactForm
            ref={contactFormRef}
            buttonLabel='Salvar Alterações'
            onSubmit={handleSubmit}
          />

      </>

  )
}
