import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import { zoomInOut, viewportOptionsFast, staggerContainer, staggerItem } from "@/lib/animations";

// Card data for AI House programs
const cards = [
  {
    id: 1,
    title: "Build-Centric Community",
    description:
      "A curated group of AI engineers, builders, and founders working on real problems, not hypothetical ones.",
    badge: "Community",
    gradient: "from-purple-500 to-purple-700",
    bgGradient: "bg-gradient-to-br from-purple-500 to-purple-700",
    image: "/ai-house/20251219_192623.jpg",
  },
  {
    id: 2,
    title: "Execution Programs (Not Courses)",
    description:
      "No long video libraries. No passive learning. Instead: Guided project sprints, Hackathons & challenges, System-building tracks (GenAI, ML, MLOps, AI products). Every member is expected to produce output.",
    badge: "Execution",
    gradient: "from-cyan-500 to-cyan-700",
    bgGradient: "bg-gradient-to-br from-cyan-500 to-cyan-700",
    image: "/ai-house/20251219_193000.jpg",
  },
  {
    id: 3,
    title: "Real Feedback Loops",
    description:
      "Code reviews, Architecture reviews, Product & deployment feedback. You don't just 'complete' something — you improve it.",
    badge: "Feedback",
    gradient: "from-emerald-500 to-emerald-700",
    bgGradient: "bg-gradient-to-br from-emerald-500 to-emerald-700",
    image: "/ai-house/20251219_195134.jpg",
  },
  {
    id: 4,
    title: "Launch & Exposure",
    description:
      "Demo days, Hiring exposure, Startup & enterprise connections, Public proof of work (GitHub, case studies, skill scores).",
    badge: "Launch",
    gradient: "from-amber-500 to-amber-700",
    bgGradient: "bg-gradient-to-br from-amber-500 to-amber-700",
    image: "/ai-house/DSC_0061.jpg",
  },
];

// Styled components
const Container = styled.div`
  padding: 2rem;
  min-height: 100vh;
  margin-top: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
    margin-top: 1rem;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.375rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 0.5rem;

  @media (min-width: 1024px) {
    gap: 2.5rem;
    padding: 0 2rem;
  }

  @media (min-width: 1280px) {
    gap: 3rem;
    padding: 0;
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0 0.25rem;
  }
`;

const Card = styled.div`
  background: #f0f2f5;
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  transition: all 0.5s ease-out;
  cursor: pointer;
  min-height: 500px;
  overflow: hidden;

  @media (max-width: 1280px) {
    min-height: 480px;
    padding: 1.75rem;
  }

  @media (max-width: 1024px) {
    min-height: 420px;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    min-height: 240px;
    padding: 0.75rem;
    border-radius: 1rem;
  }

  @media (max-width: 480px) {
    min-height: 200px;
    padding: 0.625rem;
    border-radius: 0.875rem;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: #724e99;
      /* transform: translateY(-8px); */
      box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.25);
      border-color: #8b5cf6;
    }
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 10;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  color: #1e293b;
  margin-bottom: 1rem;
  transition: color 0.3s;

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.375rem;
  }

  @media (hover: hover) and (pointer: fine) {
    ${Card}:hover & {
      color: white;
    }
  }
`;

const CardDescription = styled.p`
  color: #475569;
  line-height: 1.625;
  margin-bottom: 1.5rem;
  transition: color 0.3s;

  @media (max-width: 1024px) {
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    line-height: 1.25;
    margin-bottom: 0.375rem;
  }

  @media (hover: hover) and (pointer: fine) {
    ${Card}:hover & {
      color: white;
    }
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: -0.4rem;
  right: -1rem;
  width: 85%;
  max-width: 480px;
  min-width: 280px;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 0.75rem;
  transition: all 0.5s ease-out;

  @media (max-width: 1280px) {
    width: 85%;
    min-width: 260px;
  }

  @media (max-width: 1024px) {
    width: 70%;
    min-width: 240px;
  }

  @media (max-width: 768px) {
    width: 50%;
    min-width: 100px;
    bottom: -0.2rem;
    right: -0.5rem;
    border-radius: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 45%;
    min-width: 80px;
    bottom: -0.15rem;
    right: -0.4rem;
    border-radius: 0.375rem;
  }

  @media (hover: hover) and (pointer: fine) {
    ${Card}:hover & {
      width: 100%;
      transform: scale(1.05);
      bottom: -0.2rem;
      right: -0.2rem;

      @media (max-width: 1280px) {
        width: 90%;
      }

      @media (max-width: 1024px) {
        width: 72%;
      }
    }
  }
`;

const StyledImage = styled(Image)`
  transition: transform 0.5s ease-out;
  object-fit: cover;

  ${Card}:hover & {
    /* transform: scale(1.05); */
  }
`;

// Helper: useInView hook for intersection observer

export default function LearningPlatformUI() {
  // For sequential animation per row
  const [revealed, setRevealed] = useState<boolean[]>(
    Array(cards.length).fill(false)
  );
  const cardRefs: React.RefObject<HTMLDivElement>[] = cards.map(() =>
    useRef<HTMLDivElement>(null)
  );

  // Determine cards per row (2 for all screen sizes)
  const [cardsPerRow, setCardsPerRow] = useState(2);
  useEffect(() => {
    function handleResize() {
      setCardsPerRow(2); // Always 2 cards per row
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reveal images sequentially per row when in view
  useEffect(() => {
    let timeoutIds: number[] = [];
    let isUnmounted = false;
    function triggerSequential() {
      let i = 0;
      function next() {
        if (isUnmounted) return;
        if (i >= cards.length) return;
        const row = Math.floor(i / cardsPerRow);
        const rowStart = row * cardsPerRow;
        const rowEnd = Math.min(rowStart + cardsPerRow, cards.length);
        // Check if any card in this row is in view
        const anyInView = cardRefs
          .slice(rowStart, rowEnd)
          .some(
            (ref: React.RefObject<HTMLDivElement | null>) =>
              ref.current &&
              ref.current.getBoundingClientRect().top <
              window.innerHeight * 0.85
          );
        if (anyInView) {
          for (let j = rowStart; j < rowEnd; j++) {
            timeoutIds.push(
              window.setTimeout(() => {
                setRevealed((prev) => {
                  if (prev[j]) return prev;
                  const next = [...prev];
                  next[j] = true;
                  return next;
                });
              }, (j - rowStart) * 350) // 350ms delay between cards in a row
            );
          }
          i = rowEnd;
          timeoutIds.push(
            window.setTimeout(next, (rowEnd - rowStart) * 350 + 100) // Wait for this row
          );
        } else {
          timeoutIds.push(window.setTimeout(next, 200));
        }
      }
      next();
    }
    triggerSequential();
    return () => {
      isUnmounted = true;
      timeoutIds.forEach(clearTimeout);
    };
    // eslint-disable-next-line
  }, [cardsPerRow]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptionsFast}
      variants={zoomInOut}
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
    >
      <Container>
        <motion.div variants={zoomInOut}>
          <Header>
            <Title>What Happens Inside HiDevs AI House</Title>
          </Header>
        </motion.div>

        <Grid
          as={motion.div}
          variants={staggerContainer}
        >
          {cards.map((card, idx) => (
            <Card 
              key={card.id} 
              ref={cardRefs[idx]}
              as={motion.div}
              variants={staggerItem}
            >
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>

              <ImageContainer
                as={motion.div}
                initial={{ opacity: 0, translateX: 60, translateY: 60 }}
                animate={
                  revealed[idx]
                    ? { opacity: 1, translateX: 0, translateY: 0 }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 18,
                  mass: 0.7,
                  duration: 0.7,
                }}
                style={{ pointerEvents: "none" }} // Prevent hover effect on image container
              >
                <StyledImage
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 480px) 180px, (max-width: 768px) 280px, (max-width: 1024px) 380px, 480px"
                  priority={card.id === 1}
                />
              </ImageContainer>
            </Card>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
}
