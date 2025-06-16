import { PrimeReactProvider } from 'primereact/api';
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Loading from "@/utils/Loading";
;
import Home from "./pages/home/home_page";
import NotFound from './pages/home/notFound/notFound';
import ButtonT from './pages/Ui/button';
import ExampleForm from './pages/Ui/textinput';
import SearchResults from './components/landingPage/HomePage/SeatchResults';


function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <PrimeReactProvider >
      <main>
        {loading ? (
          <Loading message="please wait..." />
        ) : (
          <>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/ui/button" element={<ButtonT />} />
              <Route path="/ui/textinput" element={<ExampleForm />} />
            </Routes>
          </>
        )}
      </main>
    </PrimeReactProvider>
  );
}

export default App;