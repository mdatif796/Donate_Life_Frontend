import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks";
import { getBloodBank } from "../api";
import BloodBankAndHospitalCard from "./BloodBankAndHospitalCard";
import Vector from "./Vector";
import styles from "../styles/donateblood.module.css";
import { variants } from "../animation-variants/pageVariants";

const DonateBlood = (props) => {
  const [nearestBloodBanks, setNearestBloodBanks] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    const setBanks = async () => {
      let response = await getBloodBank(auth.user.state, auth.user.city, "");
      setNearestBloodBanks(response.bloodBanks);
    };
    setBanks();
  }, [auth.user.state, auth.user.city]);
  return (
    <>
      <Vector name={"vectorUp"} />
      <Vector name={"vectorDown"} />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        className={styles.donorContainer}
      >
        <div className={styles.donorDetailsContainer}>
          <div className={styles.donorDetails}>
            <div className={styles.leftDiv}>
              <img src={auth.user.profileImg} alt="" />
            </div>
            <div className={styles.middleDiv}>
              <h2>{auth.user.name}</h2>
              <p>
                Blood Group : <strong>{auth.user.bloodGroup}</strong>
              </p>
              <p>
                Contact : <strong>{auth.user.contact}</strong>
              </p>
              <p>
                City : <strong>{auth.user.city}</strong>
              </p>
              <p>
                State : <strong>{auth.user.state}</strong>
              </p>
            </div>
          </div>
          <div className={styles.rightDiv}>
            <button>Schedule Appointment</button>
            <button>Schedule Appointment</button>
          </div>
        </div>

        <h1 className="text-xl font-semibold m-3">Nearest Blood banks</h1>

        <div style={{ margin: "auto" }}>
          {nearestBloodBanks?.map((bloodBank, index) => {
            return <BloodBankAndHospitalCard key={index} data={bloodBank} />;
          })}
        </div>
      </motion.div>
    </>
  );
};

export default DonateBlood;
