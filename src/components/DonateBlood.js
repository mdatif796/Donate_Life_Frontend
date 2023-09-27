import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { getBloodBank } from "../api";
import BloodBankAndHospitalCard from "./BloodBankAndHospitalCard";
import Vector from "./Vector";
import styles from "../styles/donateblood.module.css";

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
    <div className={styles.donorContainer}>
      <Vector name={"vectorUp"} />
      <Vector name={"vectorDown"} />
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

      <h1>Nearest Blood banks</h1>

      <div style={{ margin: "auto" }}>
        {nearestBloodBanks?.map((bloodBank, index) => {
          return <BloodBankAndHospitalCard key={index} data={bloodBank} />;
        })}
      </div>
    </div>
  );
};

export default DonateBlood;
