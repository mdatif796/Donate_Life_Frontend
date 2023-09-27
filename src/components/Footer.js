import footerImg from "../images/footer_img.png";
import blood from "../images/blood_drop.png";
import styles from "../styles/footer.module.css";
const Footer = () => {
  return (
    <footer>
      <img className={styles.footerImg} src={footerImg} alt="footer-img" />
      <div className={styles.footerDetail}>
        <img src={blood} alt="blood-logo" />
        <p>Donate Life</p>
        <span>© 2023 Donate Life. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
