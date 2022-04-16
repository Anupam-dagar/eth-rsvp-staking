import "semantic-ui-css/semantic.min.css";
import { AuthContextProvider } from "../store/AuthContext";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AuthContextProvider>
      {getLayout(<Component {...pageProps} />)}
    </AuthContextProvider>
  );
}

export default MyApp;
