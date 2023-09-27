import { useEffect, useState } from "react";
import axios from "axios";
// import Select from "react-select";
import styles from "../styles/filter.module.css";
import { bloodGroups } from "../utils";

const Filter = (props) => {
  const [states, setStates] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [currentDistrict, setCurrentDistrict] = useState("");
  const [currentBloodGroup, setCurrentBloodGroup] = useState("");
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
        // let modVal = response.data.data.states.map((state) => ({
        //   value: state.name,
        //   label: state.name,
        // }));
        // setStates(modVal);
      });
    };
    getState();
  }, []);
  const handleStateClick = async () => {
    if (!currentState) {
      return;
    }
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://countriesnow.space/api/v0.1/countries/state/cities",
      headers: {},
      data: { country: "India", state: currentState },
    };
    await axios(config).then((response) => {
      setDistricts(response.data.data);
    });
  };

  const handleStateValue = (e) => {
    setCurrentState(e.target.value);
    // setCurrentState(e.value);
    // handleStateClick();
  };
  const handleDistrictValue = (e) => {
    setCurrentDistrict(e.target.value);
  };
  const handleBloodGroup = (e) => {
    setCurrentBloodGroup(e.target.value);
  };
  // const colorStyles = {
  //   control: (styles) => ({
  //     ...styles,
  //     outline: "none",
  //     width: "200px",
  //     backgroundImage: "linear-gradient(to right, #ced3d4, #e3e5e5)",
  //     borderColor: "#62cce4",
  //   }),
  // };
  return (
    <div className={styles.filterContainer}>
      <div className={styles.firstDiv}>
        <h2>{props.filterFor}</h2>
      </div>
      <div className={styles.secondDiv}>
        <select
          onChange={handleStateValue}
          value={currentState}
          onClick={handleStateClick}
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
        {/* {currentState} */}
        {/* <Select
          defaultValue={currentState}
          onChange={handleStateValue}
          noOptionsMessage={() => "no state found"}
          styles={colorStyles}
          isSearchable
          options={states}
          placeholder="Select State"
          onClick={handleStateClick}
        /> */}
        <select
          onChange={handleDistrictValue}
          value={currentDistrict}
          name=""
          id=""
        >
          <option value="">Select District</option>
          {districts.map((district, index) => {
            return (
              <option key={index} value={district}>
                {district}
              </option>
            );
          })}
        </select>
        {props.filterFor !== "Search Hospital" ? (
          <select
            onChange={handleBloodGroup}
            value={currentBloodGroup}
            name=""
            id=""
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((blood, index) => {
              return (
                <option value={blood} key={index}>
                  {blood}
                </option>
              );
            })}
          </select>
        ) : (
          <select>
            <option>Select Area</option>
          </select>
        )}
        <button
          onClick={() => {
            if (
              currentState &&
              currentDistrict &&
              (currentBloodGroup || props.filterFor === "Search Hospital")
            )
              props.onFilter(
                currentState,
                currentDistrict,
                currentBloodGroup && currentBloodGroup
              );
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
