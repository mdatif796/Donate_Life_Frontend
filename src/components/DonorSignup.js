import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { toast } from "react-toastify";
import { bloodGroups } from "../utils";
import UploadProfilePic from "./UploadProfilePic";
import axios from "axios";
import { motion } from "framer-motion";

const DonorSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  useEffect(() => {
    const getState = async () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://countriesnow.space/api/v0.1/countries/states",
        headers: {},
        data: { country: "India" },
      };
      await axios(config).then((response) => {
        setStates(response.data.data.states);
      });
    };
    getState();
  }, []);
  const handleStateClick = async () => {
    // var config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "https://countriesnow.space/api/v0.1/countries/states",
    //   headers: {},
    //   data: { country: "India" },
    // };
    // await axios(config).then((response) => {
    //   setStates(response.data.data.states);
    // });
    if (!state) {
      return;
    }
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://countriesnow.space/api/v0.1/countries/state/cities",
      headers: {},
      data: { country: "India", state: state },
    };
    await axios(config).then((response) => {
      setDistricts(response.data.data);
    });
  };

  const handleStateValue = (e) => {
    setState(e.target.value);
  };
  const handleDistrictValue = (e) => {
    setCity(e.target.value);
  };

  const auth = useAuth();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    if (!email || !password || !name || !confirmPassword) {
      toast.error("Enter all the fields");
      setSigningUp(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password does not match");
      setSigningUp(false);
      return;
    }

    const response = await auth.signup(
      email,
      name,
      password,
      confirmPassword,
      profileImg,
      city,
      state,
      bloodGroup,
      contact
    );
    if (response.success) {
      toast.success("successfully sign up");
      navigate("/donor-login");
    } else {
      toast.error(response.message);
    }

    setSigningUp(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCity("");
    setState("");
    setContact("");
    setBloodGroup("");
    return;
  };

  const setProfileImgUrl = (imgUrl) => {
    setProfileImg(imgUrl);
  };

  // const handleProfilePicChange = async (e) => {
  //   let file = e.target.files[0];
  //   if (!file) {
  //     return;
  //   }
  //   const cloudName = "dq1drdyzc";
  //   const uploadPreset = "donate_life";
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", uploadPreset);
  //   const res = await fetch(
  //     `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  //     {
  //       method: "POST",
  //       body: data,
  //     }
  //   );
  //   const img = await res.json();
  //   setProfileImg(img.secure_url);
  // };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  const handleBloodGroup = (e) => {
    setBloodGroup(e.target.value);
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
    <div style={{ paddingTop: "15px" }} className={styles.loginContainer}>
      <motion.form
        style={{ padding: "20px 10px" }}
        className={styles.login}
        onSubmit={handleSubmit}
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className={styles.loginHeading}>Sign Up</h1>
        {/* <div className={styles.profilePic}>
          <input
            accept="image/*"
            className={styles.profileInput}
            type="file"
            onChange={handleProfilePicChange}
          />
          <img src={profileImg} alt="avatr" />
        </div> */}
        <div
          style={{
            position: "absolute",
            top: "9px",
            right: "36%",
          }}
        >
          <UploadProfilePic setProfileImgUrl={setProfileImgUrl} />
        </div>
        <div className={styles.inputContainer}>
          <span style={{ marginTop: "1.9rem" }}>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <span>Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Contact Number</span>
          <input
            style={{
              marginRight: "10px",
            }}
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {/* <input
            style={{
              display: "inline-block",
              width: "110px",
              marginRight: "10px",
            }}
            placeholder="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            style={{
              display: "inline-block",
              width: "110px",
              marginRight: "10px",
            }}
            placeholder="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          /> */}
          <div className={styles.selectContainer}>
            <select
              onChange={handleStateValue}
              value={state}
              onClick={handleStateClick}
              name=""
              id=""
            >
              <option value="">Select state</option>
              {states.map((state, index) => {
                return (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            <select onChange={handleDistrictValue} value={city} name="" id="">
              <option value="">Select District</option>
              {districts.map((district, index) => {
                return (
                  <option key={index} value={district}>
                    {district}
                  </option>
                );
              })}
            </select>
            <select
              onChange={handleBloodGroup}
              value={bloodGroup}
              name=""
              id=""
              style={{ width: "19%" }}
            >
              <option value="">Blood </option>
              {bloodGroups.map((blood, index) => {
                return (
                  <option value={blood} key={index}>
                    {blood}
                  </option>
                );
              })}
            </select>
          </div>
          <button className={styles.signInBtn} disabled={signingUp}>
            {signingUp ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        <p className={styles.signupPara}>
          -Already a user?{" "}
          <Link style={{ marginLeft: "7px" }} to="/donor-login">
            {" "}
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default DonorSignup;
