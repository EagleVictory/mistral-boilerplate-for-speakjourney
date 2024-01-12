import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar/Navbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
