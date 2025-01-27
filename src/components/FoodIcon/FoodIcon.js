import "./FoodIcon.css";
import { motion } from "framer-motion";
import Barbecue from "../Images/Barbecue.jfif";
import Desserts from "../Images/Desserts.jfif";
import Steaks from "../Images/Steaks.jfif";
import MiddleEastern from "../Images/Middle Eastern.jfif";
import fastFood from "../Images/images.jfif";
import Italian from "../Images/Italian.png";

const FoodIcon = () => {
  const images = [
    { src: Barbecue, alt: "Barbecue", link: "#Barbecue" },
    { src: Italian, alt: "Italian", link: "#Italian" },
    { src: MiddleEastern, alt: "Middle Eastern", link: "#Middle Eastern" },
    { src: Steaks, alt: "Steaks", link: "#Steaks" },
    { src: fastFood, alt: "Fast Food", link: "#Fast Food" },
    { src: Desserts, alt: "Desserts", link: "#Desserts" },
  ];

  return (
    <motion.div
      className="food-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {images.map((image, index) => (
        <motion.a
          key={index}
          href={image.link}
          className="food-item"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src={image.src} alt={image.alt} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FoodIcon;
