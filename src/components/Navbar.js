import styles from "../styles/navbar.module.css";
import bloodDrop from "../images/blood_drop.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { motion } from "framer-motion";
// import { LogoutOutlined } from "@ant-design/icons";

const Navbar = () => {
  const [currentLi, setCurrentLi] = useState("Home");
  const auth = useAuth();
  const handleClick = (e) => {
    setCurrentLi(e.target.innerText);
  };
  const location = useLocation();
  useEffect(() => {
    let path = location.pathname;
    path = path.slice(1);
    path = path
      .split("-")
      .map((ele) => {
        return ele[0]?.toUpperCase() + ele?.slice(1);
      })
      .join(" ");
    path = path === "undefined" ? "Home" : path;
    setCurrentLi(path);
  }, [location.pathname]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            <Link to="/">Donate Life</Link>
          </h2>
          <motion.img
            className={styles.bloodDropImg}
            src={bloodDrop}
            alt="blood-drop"
            animate={{ scale: 1.3, opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
          />
          <div className={styles.verticalLine}></div>
        </div>
        <div className={styles.linkContainer}>
          <li
            className={
              currentLi === "Home" ? styles.activeList : styles.normalList
            }
          >
            <Link onClick={handleClick} to="/">
              Home
            </Link>
          </li>
          <li
            className={
              currentLi === "Donate Blood"
                ? styles.activeList
                : styles.normalList
            }
          >
            <Link onClick={handleClick} to="/donate-blood">
              Donate Blood
            </Link>
          </li>
          <li
            className={
              currentLi === "Find Donor" ? styles.activeList : styles.normalList
            }
          >
            <Link onClick={handleClick} to="/find-donor">
              Find Donor
            </Link>
          </li>
          <li
            className={
              currentLi === "Blood Banks"
                ? styles.activeList
                : styles.normalList
            }
          >
            <Link onClick={handleClick} to="/blood-banks">
              Blood Banks
            </Link>
          </li>
          <li
            className={
              currentLi === "ICU Beds" || currentLi === "Icu Beds"
                ? styles.activeList
                : styles.normalList
            }
          >
            <Link onClick={handleClick} to="/icu-beds">
              ICU Beds
            </Link>
          </li>
          {/* <li
            className={
              currentLi === "Nearest Hospital"
                ? styles.activeList
                : styles.normalList
            }
          >
            <Link onClick={handleClick} to="/nearest-hospital">
              Nearest Hospital
            </Link>
          </li> */}
        </div>
        {auth.user ? (
          <div className={styles.btnContainer}>
            <img
              className={styles.profileImg}
              src={auth.user.profileImg}
              alt=""
            />
            {/* <LogoutOutlined style={{ fontSize: "1rem", color: "white" }} /> */}
            <button onClick={auth.logout}> Logout</button>
          </div>
        ) : (
          <div className={styles.btnContainer}>
            <button style={{ marginRight: "14px" }}>
              <Link to="/donor-login">Donor Login</Link>
            </button>
            <button>
              <Link to="/blood-bank-login">Blood Bank Login</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
