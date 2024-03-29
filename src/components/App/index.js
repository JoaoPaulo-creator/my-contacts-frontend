import  GlobalStyles from '../../assets/styles/global'
import { ThemeProvider} from 'styled-components'
import defaultTheme from '../../assets/styles/themes/default'
import { BrowserRouter } from 'react-router-dom'
import { Container } from './styles'
import Header from '../Header'
import Routes from '../../routes'
import ToastContainer from '../Toasts/ToastContainer'


function App() {
  return (
    <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
            <Container>
                <Header />
                <Routes />
            </Container>

        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
