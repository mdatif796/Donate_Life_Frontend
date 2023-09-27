import { Link } from "react-router-dom";
import styles from "../styles/login.module.css";
import { useState } from "react";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
const DonorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();

  // const navigate = useNavigate();
  // if (auth.user) {
  //   return navigate("/");
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      toast.error("Enter email and password");
      setLoggingIn(false);
      return;
    }
    const response = await auth.login(email, password);
    if (response.success) {
      toast.success("successfully logged In");
      // setLoggingIn(false);
      // setEmail("");
      // setPassword("");
      // return navigate("/");
    } else {
      toast.error(response.message);
    }
    setLoggingIn(false);
    setEmail("");
    setPassword("");
    return;
  };

  const formVariants = {
    hidden: {
      x: "100vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      x: "-100vw",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className={styles.loginContainer}>
      <motion.form
        className={styles.login}
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className={styles.loginHeading}>Log in</h1>
        <div className={styles.inputContainer}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.signInBtn} disabled={loggingIn}>
            {loggingIn ? "Signing In..." : "Sign in"}
          </button>
        </div>
        <p className={styles.signupPara}>
          -A new user?{" "}
          <Link style={{ marginLeft: "7px" }} to="/donor-signup">
            {" "}
            Sign Up
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default DonorLogin;
