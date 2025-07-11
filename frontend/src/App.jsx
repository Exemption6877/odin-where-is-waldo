import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
