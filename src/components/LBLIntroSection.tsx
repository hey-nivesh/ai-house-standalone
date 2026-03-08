"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { zoomInOut, viewportOptionsFast } from "@/lib/animations";
import { worldMapStyles } from './styles/WorldMapSection.styles';
import Image from 'next/image';
import styled from 'styled-components';

const SectionWrapper = styled.div`
  width: 100%;
  background: white;
  padding: 1rem 0;
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const LogoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem 4rem;
  padding: 2rem 1rem;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem 1rem;
    padding: 1.5rem 0.75rem;
  }


`;

const LogoItem = styled.div`
  position: relative;
  width: 100%;
  max-width: 120px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 80px;
    height: 40px;
  }
`;

const logoPaths = [
  "/company_logos/home/ubuntu/logos/nvidia.png",
  "/company_logos/home/ubuntu/logos/amazon.png",
  "/company_logos/home/ubuntu/logos/accenture.png",
  "/company_logos/home/ubuntu/logos/dell.png",
  "/company_logos/home/ubuntu/logos/ey.png",
  "/company_logos/home/ubuntu/logos/jpmorgan_chase.png",
  "/company_logos/home/ubuntu/logos/walmart.png",
  "/company_logos/home/ubuntu/logos/hp.png",
  "/company_logos/home/ubuntu/logos/redhat.png",
  "/company_logos/home/ubuntu/logos/jio.png",
  "/company_logos/home/ubuntu/logos/okta.png",
  "/company_logos/home/ubuntu/logos/pwc.png",
  "/company_logos/home/ubuntu/logos/tata_digital.png",
  "/company_logos/home/ubuntu/logos/motorola.png",
  "/company_logos/home/ubuntu/logos/upstox.png",
  "/company_logos/home/ubuntu/logos/delta.png",
  "/company_logos/home/ubuntu/logos/quantiphi.png",
  "/company_logos/home/ubuntu/logos/urbanpro.png",
  "/company_logos/home/ubuntu/logos/volt.png",
  "/company_logos/home/ubuntu/logos/koskii.png",
  "/company_logos/home/ubuntu/logos/locus_technologies.png",
];

const TextContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto 1.5rem;
  text-align: center;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.125rem;
  color: #1a1a1a;
  line-height: 1.3;
  padding: 0 1rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const Highlight = styled.span`
  color: #724e99;
`;

export default function LBLIntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <SectionWrapper
      as={motion.div}
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptionsFast}
      variants={zoomInOut}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          willChange: 'transform, opacity',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <TextContainer>
          <Title>
            Professionals from leading tech companies are already
            <Highlight> active members </Highlight>
            of our community
          </Title>
        </TextContainer>

        <MapWrapper>
          <LogoGrid>
            {logoPaths.map((path, index) => (
              <LogoItem key={index}>
                <Image
                  src={path}
                  alt={`Company Logo ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </LogoItem>
            ))}
          </LogoGrid>
        </MapWrapper>
      </motion.div>
    </SectionWrapper>
  );
}
