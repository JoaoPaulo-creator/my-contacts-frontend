import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'




export default function NewContact(){
    return (
        <>
            <PageHeader
            title='Novo contato'
            />
            <Input placeholder='Nome'/>
            <Select>
                <option value='123'>Instagram</option>
                <option value='123'>LinkdIn</option>
                <option value='123'>Twitter</option>
                <option value='123'>Telegram</option>
                <option value='123'>Instagram</option>
                <option value='123'>Instagram</option>
            </Select>

            <Button type='button'>
                Salvar contato
            </Button>

            <Button type='button' disabled>
                Teste
            </Button>

        </>
    )
}