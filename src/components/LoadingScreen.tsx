"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const loadingSteps = [
  "Initializing AI House...",
  "Loading Hero Experience...",
  "Preparing Community Hub...",
  "Fetching Partners & Collaborators...",
  "Setting up Learning Platform...",
  "Loading Core Offerings...",
  "Retrieving Gallery Images...",
  "Calibrating World Map...",
  "Finalizing Workshops...",
  "Ready to Launch 🚀"
];

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #fbf2ff 0%, #ffffff 50%, #f0e6ff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999999;
  font-family: var(--font-geist-sans), sans-serif;
  overflow: hidden;
`;

const LogoWrapper = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 118px;
  margin-bottom: 2rem;
`;

const LoadingTextWrapper = styled.div`
  height: 2rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const LoadingText = styled(motion.p)`
  color: #724e99;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  margin: 0;
  opacity: 0.9;
`;

const ProgressBarContainer = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(114, 78, 153, 0.1);
  border-radius: 2px;
  margin-top: 1.5rem;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: #724e99;
  border-radius: 2px;
`;

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Speed up steps - 120ms per step
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        // Reduce final timeout: 400ms instead of 800ms
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
        return prev;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <LoaderContainer
      data-loading-screen="true"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LogoWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/hidevslogo.png"
          alt="HiDevs Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </LogoWrapper>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: "#724e99",
          marginBottom: "0.5rem",
          textAlign: "center"
        }}
      >
        HiDevs
      </motion.h1>

      <LoadingTextWrapper>
        <AnimatePresence mode="wait">
          <LoadingText
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loadingSteps[currentStep]}
          </LoadingText>
        </AnimatePresence>
      </LoadingTextWrapper>

      <ProgressBarContainer>
        <ProgressBar
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
          transition={{ duration: 0.25, ease: "linear" }}
        />
      </ProgressBarContainer>
    </LoaderContainer>
  );
}
