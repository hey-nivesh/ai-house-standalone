import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";

interface Logo {
  name: string;
  imageUrl: string;
}

const logos: Logo[] = [
  { name: "Gemini", imageUrl: "/logos/gemini.png" },
  { name: "Google Cloud", imageUrl: "/logos/googleCloud.png" },
  { name: "Groq", imageUrl: "/logos/groq.png" },
  { name: "Hugging Face", imageUrl: "/logos/huggingface.png" },
  { name: "LangChain", imageUrl: "/logos/langchain.png" },
  { name: "LlamaIndex", imageUrl: "/logos/llamaIndex.png" },
  { name: "Streamlit", imageUrl: "/logos/streamlit.png" },
  { name: "TruLens", imageUrl: "/logos/trulens.png" },
];

const Section = styled.section`
  width: 100%;
  padding: 1rem 0;
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
`;

const Container = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Heading = styled(motion.h2)`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const GradientOverlay = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 150px;
  z-index: 2;
  pointer-events: none;
  background: ${props => props.$position === 'left'
    ? "linear-gradient(to right, #ffffff 0%, transparent 100%)"
    : "linear-gradient(to left, #ffffff 0%, transparent 100%)"};

  @media (max-width: 768px) {
    width: 60px;
  }
`;

const LogoTrack = styled(motion.div)`
  display: flex;
  gap: 4rem;
  align-items: center;
  width: max-content;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const LogoBox = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(114, 78, 153, 0.08);
  min-width: 150px;
  height: 80px;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    min-width: 100px;
    height: 60px;
  }
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  max-height: 50px;
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 30px;
  }
`;

const PartneredWith: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const firstHalf = logos.slice(0, Math.ceil(logos.length / 2));
  const secondHalf = logos.slice(Math.ceil(logos.length / 2));

  const row1Logos = [...firstHalf, ...firstHalf];
  const row2Logos = [...secondHalf, ...secondHalf];

  return (
    <Section ref={sectionRef}>
      <Container style={{ scale, opacity }}>
        <Heading
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Leading Companies
        </Heading>

        <CarouselContainer>
          <GradientOverlay $position="left" />
          <GradientOverlay $position="right" />

          <LogoTrack
            style={{ marginBottom: "2rem" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{ x: { repeat: Infinity, duration: 20, ease: "linear" } }}
          >
            {row1Logos.map((logo, index) => (
              <LogoBox key={`row1-${logo.name}-${index}`}>
                <StyledImage src={logo.imageUrl} alt={logo.name} width={150} height={50} loading="lazy" />
              </LogoBox>
            ))}
          </LogoTrack>

          <LogoTrack
            animate={{ x: ["0%", "-50%"] }}
            transition={{ x: { repeat: Infinity, duration: 20, ease: "linear" } }}
          >
            {row2Logos.map((logo, index) => (
              <LogoBox key={`row2-${logo.name}-${index}`}>
                <StyledImage src={logo.imageUrl} alt={logo.name} width={150} height={50} loading="lazy" />
              </LogoBox>
            ))}
          </LogoTrack>
        </CarouselContainer>
      </Container>
    </Section>
  );
};

export default PartneredWith;