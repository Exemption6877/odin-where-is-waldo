import styles from "./Layout.module.css";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <h4>{new Date().getFullYear()} &copy; A Photo Tagging Game</h4>
    </footer>
  );
}

export default Footer;
