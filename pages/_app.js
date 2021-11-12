import "../styles/globals.css";
import { AuthProvider } from "../components/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="md:container md:mx-auto">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
