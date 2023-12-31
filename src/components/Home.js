import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import heroImage from "../images/save_a_life_img.png";
import vector1 from "../images/vector_1.png";
import bloodPouch from "../images/blood_pouch.png";
import vector2 from "../images/vector_2.png";
import vector3 from "../images/vector_3.png";
import bloodHouse from "../images/blood_home.png";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { variants } from "../animation-variants/pageVariants";
const Home = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={styles.homeContainer}
    >
      <div className={styles.firstDiv}>
        <div className={styles.innerDiv}>
          <img className={styles.vector1} src={vector1} alt="vector-1" />
          <button className={styles.donateBloodBtn}>
            <Link to="/donate-blood">Donate Blood</Link>
          </button>
        </div>
        <img
          className={styles.heroImage}
          src={heroImage}
          alt="everyone-could-be-a-hero"
        />
      </div>
      <div className={styles.firstDiv}>
        <motion.img
          initial={{ x: "-100px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={styles.bloodPouch}
          src={bloodPouch}
          alt="blood-pouch"
        />
        <img className={styles.vector2} src={vector2} alt="vector-2" />
        <h1 className={styles.bloodHeading}>Looking for blood</h1>
        <button className={styles.donorBtn}>
          <Link to="/find-donor">Find Donor</Link>
        </button>
        <button className={styles.bloodBankBtn}>
          <Link to="/blood-banks">Blood Banks Directory</Link>
        </button>
      </div>
      <div className={styles.firstDiv}>
        <img className={styles.vector3} src={vector3} alt="vector-3" />
        <motion.img
          initial={{ x: "100px", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={styles.bloodHouse}
          src={bloodHouse}
          alt="blood-house"
        />
        <h1 className={styles.availableIcuHeading}>Available ICU Beds</h1>
        <button style={{ top: "33%", left: "2%", width: "24%" }}>
          <Link to="/icu-beds">Find beds</Link>
        </button>
        <button style={{ top: "53%", left: "2%", width: "24%" }}>
          <Link to="/nearest-hospital">Nearest Hospital</Link>
        </button>
      </div>
      {/* <div className={styles.footer}> */}
      <Footer />
      {/* </div> */}
    </motion.div>
  );
};

export default Home;
