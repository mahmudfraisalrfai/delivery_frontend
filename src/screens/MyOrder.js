import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/myOrderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("userEmail"),
          }),
        }
      );

      const result = await response.json();
      setOrderData(result.orderData.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData
              .slice(0)
              .reverse()
              .map((orderGroup, index) => (
                <div key={index}>
                  {orderGroup.map((order, orderIndex) => (
                    <div key={orderIndex}>
                      {order.Order_date ? (
                        <div className="m-auto mt-5">
                          <strong>Order Date: </strong>
                          {order.Order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            <div className="card-body">
                              <h5 className="card-title">{order.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">Qty: {order.qty}</span>
                                <span className="m-1">Size: {order.size}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  Price: {order.price}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <h5 className="text-center mt-5">No orders found</h5>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
