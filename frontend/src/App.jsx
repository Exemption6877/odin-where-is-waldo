import Nav from "./components/Layout/Nav";
import Footer from "./components/Layout/Footer";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.appContainer}>
      <Nav />
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
