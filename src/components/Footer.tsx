"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  InstagramIcon,
  Linkedin,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Styled Components
const FooterSection = styled.footer`
  height: 100%;
  width: 100%;
  background: #734e9b;
  color: white;
  padding: 3rem 3rem 2rem;
  font-family: var(--font-geist-sans), sans-serif;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;

  /* Add subtle texture overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 20%,
        rgba(139, 92, 246, 0.15) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        rgba(124, 58, 237, 0.12) 0%,
        transparent 50%
      );
    pointer-events: none;
    z-index: 1;
  }
  /* Add a subtle border at the top */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #9334e8 50%,
      transparent 100%
    );
    z-index: 2;
  }
  @media (max-width: 1024px) {
    padding: 2rem 1.5rem 1.25rem;
    min-height: 350px;
  }

  @media (max-width: 768px) {
    padding: 1.75rem 1.25rem 1.5rem;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem 1.25rem;
    min-height: auto;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;
`;

const TopSection = styled.div`
  display: flex;
  gap: 8rem;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 1024px) {
    gap: 3rem;
    flex-direction: row;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    gap: 2rem;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    flex-direction: column;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1024px) {
    gap: 0.625rem;
    margin-bottom: 0.75rem;
    h3 {
      font-size: 1.375rem;
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    h3 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 0.625rem;
    h3 {
      font-size: 1.125rem;
    }
  }
`;
const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1e3a8a;
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: #1e3a8a;
  max-width: 250px;
`;

const TaglineText = styled.p`
  color: #d1d5db;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;

  @media (max-width: 1024px) {
    font-size: 0.875rem;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    max-width: 100%;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    max-width: 100%;
    line-height: 1.5;
  }
`;

const LinksSection = styled.div`
  display: flex;
  gap: 8rem;
  align-items: flex-start;

  @media (max-width: 1024px) {
    align-items: flex-start;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    gap: 3rem;
  }
`;

const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 1024px) {
    min-width: unset;
    max-width: unset;
    gap: 0.625rem;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    min-width: unset;
    gap: 0.375rem;
  }
`;

const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  column-gap: 2rem;
  row-gap: 0.75rem;

  @media (max-width: 1024px) {
    column-gap: 1.5rem;
    row-gap: 0.625rem;
  }

  @media (max-width: 480px) {
    column-gap: 1rem;
    row-gap: 0.375rem;
  }
`;

const ColumnTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const StyledLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 400;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.25rem 0;
  display: inline-block;
  position: relative;

  &:hover {
    color: #d1d5db;
    transform: translateX(4px);
  }
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #9334e8, #c084fc);
    transition: width 0.3s ease;
  }

  &:hover:before {
    width: 0;
  }

  @media (max-width: 1024px) {
    font-size: 0.8125rem;
    white-space: normal;
    padding: 0.2rem 0;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.15rem 0;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.125rem 0;
  }
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 6rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1024px) {
    margin-top: 4rem;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    gap: 1.25rem;
    margin-top: 1.25rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: white;
  margin: 0;
  opacity: 0.9;

  @media (max-width: 1024px) {
    font-size: 0.8125rem;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.6875rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  color: white;
  transition: all 0.3s ease;
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    color: #9334e8;
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-3px) scale(1.05);
    opacity: 1;
    box-shadow: 0 8px 25px rgba(147, 52, 232, 0.3);
  }

  @media (max-width: 1024px) {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Main Footer Component
export default function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 480);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const linkColumns = [
    {
      title: "Explore",
      links: [
        { title: "Home", href: "/" },
        { title: "AI House", href: "https://www.aihouse.xyz" },
        { title: "About Us", href: "/aboutus" },
        { title: "City Lead", href: "/city-lead" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Terms & Conditions", href: "/terms" },
        { title: "Refund Policy", href: "/refund-policy" },
      ],
    },
  ];

  const socialIcons = [
    // { icon: <FacebookIcon />, href: "#" },
    { icon: <TwitterIcon />, href: "https://x.com/dchawla1307" },
    {
      icon: <InstagramIcon />,
      href: "https://www.instagram.com/hidevs_community/",
    },
    {
      icon: <Linkedin />,
      href: "https://www.linkedin.com/company/hidevs-gen-ai-workforce/",
    },
  ];
  return (
    <FooterSection>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <TopSection>
            {" "}
            <div
              style={{
                flex: "0 0 auto",
                minWidth: "280px",
                maxWidth: "400px",
                width: "100%"
              }}
              className="footer-logo-section"
            >
              {" "}
              <LogoLink href="/">
                <LogoWrapper>
                  <div
                    className="footer-logo-image"
                    style={{
                      width: 36,
                      height: 42,
                      position: "relative",
                      minWidth: "28px",
                      minHeight: "32px"
                    }}
                  >
                    <Image
                      src="/hidevslogo.png"
                      alt="HiDevs Logo"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                      sizes="(max-width: 480px) 28px, (max-width: 768px) 32px, 36px"
                    />
                  </div>
                  <h3>HiDevs</h3>
                </LogoWrapper>
              </LogoLink>
              <TaglineText>
                Empowering the next generation of developers with hands-on
                industry experience and AI-guided learning.
              </TaglineText>
            </div>
            <LinksSection>
              {linkColumns.map((column, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <LinkColumn>
                    <ColumnTitle>{column.title}</ColumnTitle>
                    {column.title === "Explore" ? (
                      <ExploreGrid>
                        {column.links.map((link, linkIndex) => (
                          <StyledLink
                            key={linkIndex}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                          >
                            {link.title}
                          </StyledLink>
                        ))}
                      </ExploreGrid>
                    ) : (
                      column.links.map((link, linkIndex) => (
                        <StyledLink
                          key={linkIndex}
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {link.title}
                        </StyledLink>
                      ))
                    )}
                  </LinkColumn>
                </motion.div>
              ))}
            </LinksSection>
          </TopSection>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <BottomSection>
            <Copyright>
              © {new Date().getFullYear()} HiDevs. All rights reserved.
            </Copyright>
            <SocialIcons>
              {socialIcons.map((icon, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialIcon
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Social media link`}
                  >
                    {React.cloneElement(icon.icon, {
                      size: isMobile ? 16 : 20
                    })}
                  </SocialIcon>
                </motion.div>
              ))}
            </SocialIcons>
          </BottomSection>
        </motion.div>
      </Container>
    </FooterSection>
  );
}
