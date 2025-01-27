import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import barbeque from "../components/Images/davide-cantelli-jpkfc5_d-DI-unsplash.jpg";
import barbeque1 from "../components/Images/istockphoto-2158296418-1024x1024.webp";
import pastry from "../components/Images/shreyak-singh-0j4bisyPo3M-unsplash.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FoodIcon from "../components/FoodIcon/FoodIcon";
import WaveDivider from "../components/WaveDivider";
import { motion } from "framer-motion";

export default function Home() {
  const [foodCat, setFoodCat] = useState(null);
  const [foodItems, setFoodItems] = useState(null);
  const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
    console.log(response);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn text-white bg-danger"
                onClick={() => setSearch("")}
              >
                X
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src={barbeque}
              className="d-block w-100 image-backg "
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={pastry}
              className="d-block w-100 image-backg "
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={barbeque1}
              className="d-block w-100 image-backg "
              style={{ filter: "brightness(30%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <FoodIcon />

        {foodCat
          ? foodCat.map((data) => (
              <div className="row mb-3" key={data.CategoryName}>
                {/* تطبيق الحركة على اسم القسم */}
                <motion.div
                  className="fs-3 m-3 text-center"
                  id={data.CategoryName}
                  initial={{ opacity: 0, x: -20 }} // بداية الحركة
                  animate={{ opacity: 1, x: 0 }} // الحركة النهائية
                  transition={{
                    duration: 6, // مدة كل دورة للحركة
                    repeat: Infinity, // الحركة لا نهائية
                    repeatType: "reverse", // عكس الاتجاه بين البداية والنهاية
                  }}
                >
                  {data.CategoryName}
                </motion.div>

                <WaveDivider />

                {foodItems ? (
                  foodItems
                    .filter(
                      (items) =>
                        items.CategoryName === data.CategoryName &&
                        items.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id} // assuming _id is a unique identifier
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodName={filterItems.name}
                          item={filterItems}
                          options={filterItems.options}
                          ImgSrc={filterItems.img}
                        />
                      </div>
                    ))
                ) : (
                  <div>No Data Available</div>
                )}
              </div>
            ))
          : ""}
      </div>
      <Footer />
    </div>
  );
}
