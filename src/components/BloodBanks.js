import Filter from "./Filter";
import styles from "../styles/bloodBanks.module.css";
import { useEffect, useState } from "react";
import { getBloodBank } from "../api";
import BloodBankAndHospitalCard from "./BloodBankAndHospitalCard";
import Loader from "./Loader";
import Vector from "./Vector";

const BloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const setBanks = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          let res = await fetch(url);
          res = await res.json();
          let response = await getBloodBank(
            res.address.state ? res.address.state : "",
            res.address.city ? res.address.city : "",
            ""
          );
          setBloodBanks(response.bloodBanks);
          setLoading(false);
        },
        (err) => {
          setLoading(false);
        }
      );
    };
    setBanks();
  }, []);
  const filter = async (state = null, city = null, bloodGroup = null) => {
    setLoading(true);
    let response = await getBloodBank(state, city, bloodGroup);
    setBloodBanks(response.bloodBanks);
    setLoading(false);
    return;
  };

  return (
    <div className={styles.bloodBanksContainer}>
      {/* <img className={styles.vectorUp} src={vectorUp} alt="vector-up" />
      <img className={styles.vectorDown} src={vectorDown} alt="vector-down" /> */}
      <Vector name={"vectorUp"} />
      <Vector name={"vectorDown"} />
      <div className={styles.filterAndBloodBankContainer}>
        <Filter filterFor={"Blood Banks"} onFilter={filter} />
        {bloodBanks.length === 0 && !loading && <h1>Not found</h1>}
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.bloodBanks}>
            {bloodBanks?.map((bloodBank) => {
              return (
                <BloodBankAndHospitalCard
                  key={bloodBank._id}
                  data={bloodBank}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodBanks;
