import "../styles/globals.scss";
import axios from "axios";
import UserContextProvider from "../src/context/userContext/user.context.provider";
import Layout from "../src/components/templates/Layout/Layout";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL_API;

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}

export default MyApp;
