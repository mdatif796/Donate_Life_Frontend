import { useEffect, useState } from "react";
import Filter from "./Filter";
import Vector from "./Vector";
import "../styles/icuBeds.css";
import { getHospitals } from "../api";
import Loader from "./Loader";
import BloodBankAndHospitalCard from "./BloodBankAndHospitalCard";

const IcuBeds = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const setHos = async () => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          let res = await fetch(url);
          res = await res.json();
          let response = await getHospitals(
            res.address.state ? res.address.state : "Bihar",
            res.address.city ? res.address.city : "Patna"
          );
          setHospitals(response.hospitals);
          setLoading(false);
        },
        async (err) => {
          let response = await getHospitals("Bihar", "Patna");
          setHospitals(response.hospitals);
          setLoading(false);
        }
      );
    };
    setHos();
  }, []);

  const filter = async (state = null, city = null) => {
    setLoading(true);
    let response = await getHospitals(state, city);
    setHospitals(response.hospitals);
    setLoading(false);
    return;
  };
  return (
    <div className="icuContainer">
      <Vector name={"vectorUp"} />
      <Vector name={"vectorDown"} />
      <div className={"filterAndIcuContainer"}>
        <Filter filterFor={"Search Hospital"} onFilter={filter} />
        {hospitals.length === 0 && !loading && <h1>Not found</h1>}
        {loading ? (
          <Loader />
        ) : (
          <div className="hospitals">
            {hospitals?.map((hospital) => (
              <BloodBankAndHospitalCard
                cardFor="hospital"
                key={hospital._id}
                data={hospital}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IcuBeds;
