import '../styles/globals.css'
import "../CSS/HeaderSection.css"
import "../Components/BasicComponents/Button/button.css";
import "../Components/MainComponents/DescriptionBuilder/DescriptionBuilder.css";
import "../CSS/defaults.css";
import "../Components/MainComponents/Forms/popUp.css";
import "../Components/MainComponents/Forms/RegistertForm/RegisterForm.css";
import "../Components/BasicComponents/Forms/InputField.css"
import type { AppProps } from 'next/app'
import { Provider, createClient } from 'urql';
import { URQL_CLIENT_URL } from '../config';


const client = createClient({
  url: URQL_CLIENT_URL
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp
