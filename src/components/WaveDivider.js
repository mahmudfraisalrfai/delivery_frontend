import React from "react";
import { motion } from "framer-motion";

const WaveMotion = () => {
  return (
    <div style={{ overflow: "hidden", margin: "20px 0" }}>
      <motion.svg
        viewBox="0 0 1440 100"
        style={{ display: "block", width: "100%", height: "30px" }}
      >
        <motion.path
          fill="none"
          stroke="green" // لون الخط
          strokeWidth="2" // سماكة الخط
          d="M0,50 Q180,10 360,50 T720,50 T1080,50 T1440,50,50 T7200,50 T10800,50 T14400,50" // رسم الموجة
          animate={{
            translateY: [0, -10, 0, 10, 0], // التأرجح على المحور Y باستخدام نمط الموجة
          }}
          transition={{
            duration: 2, // مدة الحركة
            repeat: Infinity, // التكرار اللانهائي
            ease: "easeInOut", // تأثير سلس للحركة
          }}
        />
      </motion.svg>
    </div>
  );
};

export default WaveMotion;
