import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'urql';
import Loginform from 'Components/MainComponents/Forms/LoginForm/LoginForm';
import { useMeQuery } from 'GraphQl/generated/graphgql';
import { withUrqlClient } from 'next-urql';
import { client } from 'CodeBase/CreateUrqlClient';



function MyApp({ Component, pageProps }: AppProps) {
  const [{ data, fetching, error }] = useMeQuery({});

  let pageContent;

  if (fetching) {
    pageContent = (<div className="loadingDIV"><h1 className="SubTitle">FETICHING....</h1></div>)
  } else if (error) {
    pageContent = (<div className="loadingDIV"><h1 className="SubTitle">FETICHING....</h1></div>)
    console.error(error)
  } else if (data?.Me?._id) {
    pageContent = (<Component {...pageProps} />)
  } else if (!data?.Me?._id) {
    pageContent = (<div className="loadingDIV"><Loginform refreshPage></Loginform></div>)
  }

  return (
    <Provider value={client}>
      {pageContent}
    </Provider>
  )
}

export default withUrqlClient((_ssrExchange, _) => (client))(MyApp)
