"use client";
import styled from "styled-components";
import React, { useState, useRef } from "react";
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import Image from "next/image";
import PartneredWith from "@/components/PartneredWith";
import Link from "next/link";
import LearningPlatformUI from "@/components/LearningPlatformUI";
import HowWeHelpCarousel from "@/components/HowWeHelpCarousel";
import CoreOfferingsSection from "@/components/CoreOfferingsSection";
import AIHouseDifferenceSection from "@/components/AIHouseDifferenceSection";
import WorldMapSection from "@/components/WorldMapSection";
import ImageCarousel from "@/components/ImageCarousel";
import WorkshopsFAQ from "@/components/WorkshopsFAQ";
import Footer from "@/components/Footer";

// Animation variants for mirror transition effect
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

// CountingNumber component for animating numbers
const CountingNumber = ({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);

  React.useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: "linear" });
    return () => controls.stop();
  }, [value, duration, motionValue]);

  React.useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [motionValue, prefix, suffix]);

  return <span ref={ref} />;
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Responsive state for card animation
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  React.useEffect(() => {
    // Fix SSR hydration issue - ensure window is available
    if (typeof window === 'undefined') return;
    const checkScreen = () => setIsSmallScreen(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Animation variants for cards
  const cardVariants = [
    {
      x: isSmallScreen ? 0 : -15,
      y: isSmallScreen ? 0 : 5,
      scale: isSmallScreen ? 1 : 0.95,
      rotate: isSmallScreen ? 0 : -2,
      zIndex: 1,
    },
    {
      scale: 1,
      zIndex: 2,
    },
    {
      x: isSmallScreen ? 0 : 15,
      y: isSmallScreen ? 0 : 5,
      scale: isSmallScreen ? 1 : 0.95,
      rotate: isSmallScreen ? 0 : 2,
      zIndex: 1,
    },
  ];

  // Statistics data
  const stats = [
    { value: 10000, label: "Students Community" },
    { value: 2800, label: "Users on Platform" },
    { value: 100, label: "Workshops & Webinars" },
  ];

  return (
    <Wrapper>
      {/* Hero Section with Background Image */}
      <HeroSection>
        {/* Navbar with transparent background showing hero image */}
        <Navbar>
          <NavContainer>
            <LogoLink href="/">
              <Image
                src="/hidevslogo.png"
                alt="HiDevs Logo"
                width={40}
                height={47}
                priority
                loading="eager"
                fetchPriority="high"
              />
              <LogoText>HiDevs</LogoText>
            </LogoLink>

            <NavLinks>
              <NavLink href="https://www.hidevs.xyz">Features</NavLink>
              <NavLink href="/">AI House</NavLink>
              <NavLink href="https://www.hidevs.xyz/aboutus">About Us</NavLink>
              <NavLink href="https://www.hidevs.xyz/city-lead">City Lead</NavLink>
              <NavLink href="https://www.hidevs.xyz/lbl">LBL</NavLink>
            </NavLinks>

            <StartButton href="http://app.hidevs.xyz">Start Learning</StartButton>

            <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} color="#ffffff" />
            </MobileMenuButton>
          </NavContainer>
        </Navbar>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenuOverlay
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} color="#ffffff" />
              </CloseButton>
              <MobileNavContent>
                <MobileNavLink href="https://www.hidevs.xyz" onClick={() => setIsMobileMenuOpen(false)}>Features</MobileNavLink>
                <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>AI House</MobileNavLink>
                <MobileNavLink href="https://www.hidevs.xyz/aboutus" onClick={() => setIsMobileMenuOpen(false)}>About Us</MobileNavLink>
                <MobileNavLink href="https://www.hidevs.xyz/city-lead" onClick={() => setIsMobileMenuOpen(false)}>City Lead</MobileNavLink>
                <MobileNavLink href="https://www.hidevs.xyz/lbl" onClick={() => setIsMobileMenuOpen(false)}>LBL</MobileNavLink>
                <MobileStartButton href="http://app.hidevs.xyz" onClick={() => setIsMobileMenuOpen(false)}>
                  Start Learning
                </MobileStartButton>
              </MobileNavContent>
            </MobileMenuOverlay>
          )}
        </AnimatePresence>

        <OverlayWrapper>
          <MainHeadingWrapper
            as={motion.div}
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                width: "100%",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <Image
                src="/hero-workshop.png"
                alt="AI House - Bangalore's AI Innovation Hub"
                width={1200}
                height={400}
                priority
                quality={100}
                style={{
                  width: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 10px 30px rgba(114, 78, 153, 0.3))",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{
                marginTop: "0.75rem",
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                fontWeight: "700",
                color: "#724e99",
                letterSpacing: "0.2em",
                textAlign: "center",
              }}
            >
              LEARN | BUILD | LAUNCH
            </motion.div>

            <Message
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
              An always-free community home for tech builders.
            </Message>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 }}
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLScmGt3e2pM9ltxuTGf_G2__FePkX4HIOI-BvxfnOZBK5WcsrA/viewform" target="_blank" rel="noopener noreferrer">
                <MidCTAButton>
                  Join now
                </MidCTAButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
              style={{
                marginBottom: "2rem",
                width: "100%",
              }}
            >
              <CardsWrapper ref={statsRef}>
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    style={{
                      transform: `translate(${cardVariants[index % cardVariants.length].x || 0}px, ${cardVariants[index % cardVariants.length].y || 0}px) scale(${cardVariants[index % cardVariants.length].scale || 1}) rotate(${cardVariants[index % cardVariants.length].rotate || 0}deg)`,
                      zIndex: cardVariants[index % cardVariants.length].zIndex || 1,
                    }}
                  >
                    <p>
                      {isStatsInView ? (
                        <CountingNumber value={stat.value} suffix="+" />
                      ) : (
                        `${stat.value}+`
                      )}
                    </p>
                    <p>{stat.label}</p>
                  </Card>
                ))}
              </CardsWrapper>
            </motion.div>


          </MainHeadingWrapper>
        </OverlayWrapper>
      </HeroSection>
      {/* AI House Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "4rem auto 2rem",
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <AIHouseTitle>HiDevs AI House — Bangalore</AIHouseTitle>
        <AIHouseSubtitle>
          The <Highlight>execution-first</Highlight> AI House for builders who want <Highlight>real outcomes</Highlight>.
        </AIHouseSubtitle>
        <AIHouseDescription>
          HiDevs AI House is Bangalore's dedicated <Highlight>AI execution hub and free</Highlight> for engineers, builders, and early founders who are done with passive learning and want to <Highlight>build, ship, and launch</Highlight> real AI systems.
        </AIHouseDescription>
        <AIHouseDescription>
          Unlike generic communities or co-working spaces, HiDevs AI House is structured around <Highlight>learning → building → launching</Highlight>, with continuous <Highlight>evaluation, feedback, and real-world exposure</Highlight> at every step.
        </AIHouseDescription>

        {/* Downward Arrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            marginTop: "2rem",
            fontSize: "2rem",
            color: "#61116fff",
          }}
        >
          ↓
        </motion.div>
      </motion.div>

      <OverlayWrapper>
        <MidCTAWrapper
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScmGt3e2pM9ltxuTGf_G2__FePkX4HIOI-BvxfnOZBK5WcsrA/viewform" target="_blank" rel="noopener noreferrer">

          </Link>
        </MidCTAWrapper>

        <HowWeHelpCarousel />
        <PartneredWith />
        <LearningPlatformUI />
        <CoreOfferingsSection />
        <ImageCarousel />
        <AIHouseDifferenceSection />
        <WorldMapSection />
        <WorkshopsFAQ />

        {/* Final CTA Section */}
        <CTASection
          as={motion.div}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <CTAContent>
            <CTATitle>Interested in Partnering with AI House?</CTATitle>
            <CTADescription>
              AI House works with educational institutions to strengthen AI education through expert-led workshops, community engagement, and practical learning experiences.
              <br /><br />
              We design programs tailored to your institution's objectives, student profiles, and focus areas in artificial intelligence.
              <br /><br />
              Get in touch to discuss a customized collaboration.
              <br /><br />
              100% free. No credit card. No catch.
            </CTADescription>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScmGt3e2pM9ltxuTGf_G2__FePkX4HIOI-BvxfnOZBK5WcsrA/viewform" target="_blank" rel="noopener noreferrer">
              <CTAButton
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Connect with AI House
              </CTAButton>
            </Link>
          </CTAContent>
        </CTASection>

        {/* Location Section */}
        <LocationSection
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <LocationContent>
            <LocationLeft>
              <LocationTitle>Visit AI House</LocationTitle>
              <LocationAddress>
                2nd Floor, Above Titan World<br />
                HSR Layout, Bengaluru
              </LocationAddress>
              <Link href="https://maps.app.goo.gl/QbHBg35QMbjFmBjTA" target="_blank" rel="noopener noreferrer">
                <LocationButton
                  as={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                </LocationButton>
              </Link>
            </LocationLeft>
            <LocationRight>
              <MapIframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7818676448937!2d77.6515603!3d12.921736800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15ee38338501%3A0x507a8085f8da545!2sUnion%20Bank%20of%20India!5e0!3m2!1sen!2sin!4v1766392911442!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </LocationRight>
          </LocationContent>
        </LocationSection>
      </OverlayWrapper>
      <Footer />
    </Wrapper>
  );
}

// Styled Components
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: var(--font-geist-sans), sans-serif;
  position: relative;
`;

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('/ai-house/IMG_9043.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  
  /* Overlay for better text readability */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.25) 15%,
      rgba(0, 0, 0, 0.15) 40%,
      rgba(0, 0, 0, 0.2) 70%,
      rgba(0, 0, 0, 0.35) 100%
    );
    z-index: 0;
    pointer-events: none;
  }

  /* Ensure content is above overlay */
  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    background-attachment: scroll;
    background-position: center top;
  }
`;

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 1rem 1rem 0 1rem;
  background: transparent;
  backdrop-filter: blur(0px);
  transition: backdrop-filter 0.3s ease;

  @media (min-width: 768px) {
    padding: 1.5rem 2rem 0 2rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const LogoText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  &:hover {
    color: #e3d3f2;
  }
`;

const StartButton = styled(Link)`
  background: rgba(114, 78, 153, 0.9);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(93, 58, 123, 0.95);
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 300px;
  background: rgba(20, 10, 30, 0.95);
  backdrop-filter: blur(15px);
  z-index: 200;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 2rem;
  padding: 0.5rem;
`;

const MobileNavContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-start;
`;

const MobileNavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #724e99;
  }
`;

const MobileStartButton = styled(Link)`
  margin-top: 1rem;
  background: #724e99;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  width: 100%;
  text-align: center;
`;

const OverlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  max-width: 100%;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const MainHeadingWrapper = styled(motion.div)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-geist-sans), sans-serif;
  font-weight: 600;
  font-size: clamp(1.8rem, 6vw, 3rem);
  line-height: 130%;
  letter-spacing: 0%;
  width: 100%;
  text-align: center;
  padding: 0 0.5rem;

  @media (min-width: 480px) {
    margin-top: 1.25rem;
    gap: 0.5rem;
    font-size: clamp(2rem, 7vw, 4rem);
    line-height: 105%;
  }

  @media (min-width: 768px) {
    margin-top: 1.5rem;
    gap: 0.5rem;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    line-height: 100%;
    padding: 0;
  }

  @media (min-width: 1024px) {
    margin-top: 2.5rem;
    gap: 1rem;
    font-size: clamp(3rem, 5.6vw, 5rem);
  }
`;

const Message = styled(motion.p)`
  margin-top: 0.75rem;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 120%;
  letter-spacing: 0%;
  margin-inline: 1rem;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  max-width: 100%;

  @media (min-width: 480px) {
    font-size: 18px;
    margin-inline: 1.5rem;
  }

  @media (min-width: 768px) {
    margin-top: 1rem;
    font-size: 20px;
    margin-inline: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 23px;
    margin-inline: 3rem;
  }
`;

const MidCTAWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 2rem auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    margin: 2.5rem auto;
  }

  @media (min-width: 1024px) {
    margin: 3rem auto;
  }
`;

const MidCTAButton = styled.button`
  display: flex;
  align-items: center;
  gap: clamp(0.3em, 2vw, 0.6em);
  border-radius: clamp(0.8rem, 5vw, 3rem);
  padding-inline: clamp(1.3rem, 5vw, 2rem);
  padding-block: clamp(1rem, 3vw, 1.375rem);
  background-color: #724e99;
  color: white;
  font-weight: 500;
  font-size: clamp(0.85rem, 2.5vw, 1.5rem);
  line-height: 100%;
  letter-spacing: 0%;
  font-family: var(--font-geist-sans), sans-serif;
  border: none;
  cursor: pointer;
  width: auto;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  min-width: fit-content;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5d3a7b;
    color: #fff;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding-inline: 1.1rem;
    padding-block: 0.85rem;
    border-radius: 0.7rem;
    gap: 0.4em;
  }

  @media (min-width: 1024px) {
    padding-inline: 2.5rem;
    min-width: max-content;
  }
`;

const CTASection = styled.section`
  width: 100%;
  max-width: 1500px;
  margin: 2.5rem auto 1.5rem;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(135deg, #f9f6ff 0%, #ffffff 50%, #f5f0ff 100%);
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(114, 78, 153, 0.08);

  @media (min-width: 768px) {
    padding: 3rem 2.5rem;
    margin: 3rem auto 2rem;
  }

  @media (min-width: 1024px) {
    padding: 3.5rem 3rem;
    margin: 3.5rem auto 2.5rem;
  }
`;

const CTAContent = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 700;
  color: #2d1b4e;
  margin-bottom: 1rem;
  line-height: 1.2;
  font-family: var(--font-geist-sans), sans-serif;
`;

const CTADescription = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-weight: 500;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: #724e99;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 50px;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(114, 78, 153, 0.3);
  font-family: var(--font-geist-sans), sans-serif;

  @media (min-width: 768px) {
    padding: 1.3rem 2.5rem;
  }

  @media (min-width: 1024px) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(114, 78, 153, 0.4);
      background: #5d3a7b;
    }
  }
`;

const CardsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  font-family: var(--font-geist-sans), sans-serif;
  font-weight: 600;
  gap: 1rem;
  margin-top: 2rem;
  align-self: stretch;
  width: 100%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  overflow: visible;

  @media (min-width: 480px) {
    gap: 1.1rem;
    margin-top: 2.25rem;
  }

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 1.2rem;
    margin-top: 2.5rem;
    padding: 0;

    & > * {
      flex: 1 1 0;
      min-width: 0;
    }
  }

  @media (min-width: 768px) {
    gap: 1.4rem;
    margin-top: 3rem;
  }

  @media (min-width: 1024px) {
    gap: 1.6rem;
    margin-top: 4rem;
  }

  @media (min-width: 1280px) {
    gap: 1.8rem;
    margin-top: 5rem;
  }
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.125rem solid #c2c2c2;
  border-radius: 1.25rem;
  background-color: white;
  padding: 1rem 1.25rem;
  gap: 1rem;
  font-weight: 700;
  width: 100%;
  box-shadow: 0 2px 8px rgba(114, 78, 153, 0.08);
  cursor: normal;
  will-change: transform;

  p:nth-child(1) {
    font-size: 1.75rem;
    line-height: 1;
    margin: 0;
    transition: color 0.3s;
  }

  p:nth-child(2) {
    font-size: 1rem;
    line-height: 1;
    text-align: center;
    margin: 0;
    transition: color 0.3s;
  }
  
  @media (min-width: 480px) {
    padding: 1.15rem 1.4rem;
    gap: 1.25rem;
    border-radius: 1.35rem;

    p:nth-child(1) {
      font-size: 2rem;
    }

    p:nth-child(2) {
      font-size: 1.15rem;
    }
  }

  @media (min-width: 640px) {
    padding: 1.25rem 1.5rem;
    gap: 1.4rem;

    p:nth-child(1) {
      font-size: 2.25rem;
    }

    p:nth-child(2) {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 768px) {
    padding: 1.4rem 1.6rem;
    gap: 1.5rem;
    border-radius: 1.4rem;

    p:nth-child(1) {
      font-size: 2.5rem;
    }

    p:nth-child(2) {
      font-size: 1.35rem;
    }
  }

  @media (min-width: 1024px) {
    padding: 1.55rem 1.75rem;
    gap: 1.75rem;
    border-radius: 1.5rem;

    p:nth-child(1) {
      font-size: 2.75rem;
    }

    p:nth-child(2) {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1280px) {
    padding: 1.688rem 2rem;
    gap: 2rem;

    p:nth-child(1) {
      font-size: 3.125rem;
    }

    p:nth-child(2) {
      font-size: 1.8rem;
    }
  }
`;

const WorkshopImageWrapper = styled(motion.div)`
  width: 100%;
  overflow: hidden;
  border-radius: 1.5rem;
  box-shadow: 0 8px 30px rgba(114, 78, 153, 0.15);

  img {
    animation: zoomInOut 8s ease-in-out infinite;
  }

  @keyframes zoomInOut {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

const AIHouseTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #000000ff;
  margin-bottom: 1rem;
  font-family: var(--font-geist-sans), sans-serif;
`;

const AIHouseSubtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  font-weight: 600;
  color: #000000ff;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-family: var(--font-geist-sans), sans-serif;
`;

const AIHouseDescription = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  color: #000000ff;
  margin-bottom: 1.25rem;
  line-height: 1.7;
  font-family: var(--font-geist-sans), sans-serif;
  text-align: left;
  padding: 0 1rem;

  @media (min-width: 768px) {
    text-align: center;
    padding: 0 2rem;
  }
`;

const Highlight = styled.span`
  color: #7413cfff;
  font-weight: 600;
`;

const LocationSection = styled.section`
  width: 100%;
  max-width: 1500px;
  margin: 3rem auto 2rem;
  padding: 0 1.5rem;

  @media (min-width: 768px) {
    margin: 4rem auto 2.5rem;
  }

  @media (min-width: 1024px) {
    margin: 5rem auto 3rem;
  }
`;

const LocationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
  }
`;

const LocationLeft = styled.div`
  flex: 1;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 3rem 2.5rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 3rem;
  }
`;

const LocationRight = styled.div`
  flex: 1;
  min-height: 350px;
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    min-height: 450px;
  }
`;

const LocationTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: #2d1b4e;
  margin: 0;
  font-family: var(--font-geist-sans), sans-serif;
`;

const LocationAddress = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: #666;
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
`;

const LocationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #724e99;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(114, 78, 153, 0.3);
  font-family: var(--font-geist-sans), sans-serif;
  width: fit-content;

  &:hover {
    background: #5d3a7b;
    box-shadow: 0 6px 20px rgba(114, 78, 153, 0.4);
  }

  @media (min-width: 768px) {
    padding: 1.2rem 2.5rem;
  }
`;

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
`;