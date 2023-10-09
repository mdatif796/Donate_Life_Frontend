import styles from "../styles/bloodBankCard.module.css";
import phone from "../images/phone-call.png";
import { motion } from "framer-motion";
const BloodBankAndHospitalCard = (props) => {
  const { data, cardFor } = props;

  const cardVariants = {
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    hidden: { x: "250px", opacity: 0 },
  };

  return (
    <motion.div
      className={styles.cardContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <button className={styles.contactBtn}>
        <img src={phone} alt="phone" />
        {cardFor === "hospital" ? data.contact : data?.contactNumber}
      </button>
      <div className={styles.leftDiv}>
        <img src={data?.imgUrl} alt="blood bank img" />
      </div>
      <div className={styles.rightDiv}>
        <div className={styles.nameAndAddress}>
          <h2>{data?.name}</h2>
          <p>
            {data?.localAddress}, {data?.city} {data?.pinCode}
          </p>
        </div>
        <div className={styles.available}>
          <h2>{cardFor === "hospital" ? "Beds " : "Blood "} Available</h2>
          {cardFor === "hospital" ? (
            <div className={styles.bloodAvailable}>
              <span>
                ICU Beds: {data.availableIcuBeds}/{data.totalIcuBeds} Available
              </span>
            </div>
          ) : (
            <div className={styles.bloodAvailable}>
              {data?.bloods?.map((blood, index) => {
                return (
                  <p key={index} className={styles.bloodPara}>
                    <span>{blood.group}</span> : <span>{blood.unit}</span> units
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BloodBankAndHospitalCard;
