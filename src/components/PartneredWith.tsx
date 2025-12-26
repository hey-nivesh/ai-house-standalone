"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Logo {
  name: string;
  imageUrl: string;
}

// Real logos from /public/logos
const logos: Logo[] = [
  {
    name: "Gemini",
    imageUrl: "/logos/gemini.png",
  },
  {
    name: "Google Cloud",
    imageUrl: "/logos/googleCloud.png",
  },
  {
    name: "Groq",
    imageUrl: "/logos/groq.png",
  },
  {
    name: "Hugging Face",
    imageUrl: "/logos/huggingface.png",
  },
  {
    name: "LangChain",
    imageUrl: "/logos/langchain.png",
  },
  {
    name: "LlamaIndex",
    imageUrl: "/logos/llamaIndex.png",
  },
  {
    name: "Streamlit",
    imageUrl: "/logos/streamlit.png",
  },
  {
    name: "TruLens",
    imageUrl: "/logos/trulens.png",
  },
];

const PartneredWith: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress of the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create zoom animation based on scroll
  // Zooms in as you scroll down, then zooms out as you continue
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Split logos into two rows
  const half = Math.ceil(logos.length / 2);
  const firstHalf = logos.slice(0, half);
  const secondHalf = logos.slice(half);

  // Duplicate for seamless loop
  const row1Logos = [...firstHalf, ...firstHalf];
  const row2Logos = [...secondHalf, ...secondHalf];

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        padding: "4rem 0",
        backgroundColor: "#ffffff", // Plain white background
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1rem",
          scale,
          opacity,
        }}
      >
        {/* Optional Title */}
        <motion.h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1a1a1a",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Leading Companies
        </motion.h2>

        {/* Carousel Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Gradient Overlays for fade effect */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "150px",
              background: "linear-gradient(to right, #ffffff 0%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "150px",
              background: "linear-gradient(to left, #ffffff 0%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Animated Logo Track */}
          {/* Row 1: Left to Right */}
          <motion.div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              marginBottom: "2rem",
              width: "max-content",
            }}
            animate={{
              x: ["-50%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {row1Logos.map((logo, index) => (
              <div
                key={`row1-${logo.name}-${index}`}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem 2rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(114, 78, 153, 0.08)",
                  minWidth: "150px",
                  height: "80px",
                }}
              >
                <Image
                  src={logo.imageUrl}
                  alt={logo.name}
                  width={150}
                  height={50}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "50px",
                    objectFit: "contain",
                    opacity: 1,
                  }}
                />
              </div>
            ))}
          </motion.div>

          {/* Row 2: Right to Left */}
          <motion.div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center",
              width: "max-content",
            }}
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {row2Logos.map((logo, index) => (
              <div
                key={`row2-${logo.name}-${index}`}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem 2rem",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(114, 78, 153, 0.08)",
                  minWidth: "150px",
                  height: "80px",
                }}
              >
                <Image
                  src={logo.imageUrl}
                  alt={logo.name}
                  width={150}
                  height={50}
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "50px",
                    objectFit: "contain",
                    opacity: 1,
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default PartneredWith;