import '../styles/globals.css'
import "../CSS/HeaderSection.css"
import "../Components/BasicComponents/Button/button.css";
import "../Components/MainComponents/DescriptionBuilder/DescriptionBuilder.css";
import "../CSS/defaults.css";
import "../Components/MainComponents/Forms/popUp.css";
import "../Components/MainComponents/Forms/RegistertForm/RegisterForm.css";
import "../Components/BasicComponents/Forms/InputField.css"
import "../CSS/applicationTable.css"
import "../Components/MainComponents/ChannelnameBuilder/channelNameBuilder.css"
import type { AppProps } from 'next/app'
import { Provider } from 'urql';
import Loginform from 'Components/MainComponents/Forms/LoginForm/LoginForm';
import { useMeQuery } from 'GraphQl/generated/graphgql';
import { withUrqlClient } from 'next-urql';
import "tailwindcss/tailwind.css"
import { client } from 'CodeBase/CreateUrqlClient';



function MyApp({ Component, pageProps }: AppProps) {
  const [{ data, fetching, error }] = useMeQuery({});

  let pageContent;

  if (fetching) {
    pageContent = (<div className="flex justify-center items-center h-screen"><h1 className="SubTitle">FETICHING....</h1></div>)
  } else if (error) {
    pageContent = (<div className="flex justify-center items-center h-screen"><h1 className="SubTitle">FETICHING....</h1></div>)
    console.error(error)
  } else if (data?.Me?._id) {
    pageContent = (<Component {...pageProps} />)
  } else if (!data?.Me?._id) {
    pageContent = (<div className="flex justify-center items-center h-screen"><Loginform refreshPage></Loginform></div>)
  }

  return (
    <Provider value={client}>
      {pageContent}
    </Provider>
  )
}

export default withUrqlClient((_ssrExchange, _) => (client))(MyApp)
