import { getDonor } from "../api";
import styles from "../styles/findDonor.module.css";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Loader from "./Loader";
import Vector from "./Vector";
const FindDonor = () => {
  const [donors, setDonor] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getDonors = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          let res = await fetch(url);
          res = await res.json();
          let response = await getDonor(
            res.address.state ? res.address.state : "",
            res.address.city ? res.address.city : "",
            ""
          );
          let donor = response.donor;
          setDonor(donor);
          setLoading(false);
        },
        (err) => {
          setLoading(false);
        }
      );
    };
    getDonors();
  }, []);

  const filter = async (state = null, city = null, bloodGroup = null) => {
    setLoading(true);
    let response = await getDonor(state, city, bloodGroup);
    setDonor(response.donor);
    setLoading(false);
    return;
  };
  return (
    <div className={styles.donorContainer}>
      <Vector name={"vectorUp"} />
      <Vector name={"vectorDown"} />
      <div className={styles.filterContainer}>
        <Filter filterFor={"Find Donor"} onFilter={filter} />
        {donors?.length === 0 && !loading && <h1>Not found</h1>}
      </div>
      {loading ? (
        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "50%",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className={styles.donorCardContainer}>
          {donors?.map((donor) => {
            return (
              <div key={donor._id} className={styles.donorCard}>
                <div>
                  <img
                    className={styles.donorPic}
                    src={donor.profileImg}
                    alt="profile-img"
                  />
                </div>
                <p className={styles.donorName}>
                  {donor.name
                    .split(" ")
                    .map((d) => d[0].toUpperCase() + d.slice(1))
                    .join(" ")}
                </p>
                <div className={styles.contactDiv}>
                  <span>
                    {donor.bloodGroup} <span>ve</span>
                  </span>{" "}
                  <span>{donor.contact}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FindDonor;
