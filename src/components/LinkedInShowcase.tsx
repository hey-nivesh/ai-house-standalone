"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

interface Post {
  id: number;
  image: string;
  link: string;
}

const posts: Post[] = [
  { id: 1, image: "/linkedin_post_images/1.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7423813494615105537/" },
  { id: 2, image: "/linkedin_post_images/2.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7416353489657843712/" },
  { id: 3, image: "/linkedin_post_images/3.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7411451059195441152/" },
  { id: 4, image: "/linkedin_post_images/4.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7378846920938676226/" },
  { id: 5, image: "/linkedin_post_images/5.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7366735514642628610/" },
  { id: 6, image: "/linkedin_post_images/6.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7361450947778170883/" },
  { id: 7, image: "/linkedin_post_images/7.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7351935651728052224/" },
  { id: 8, image: "/linkedin_post_images/8.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7291877015899582464/" },
  { id: 9, image: "/linkedin_post_images/9.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7265361905169371138/" },
  { id: 10, image: "/linkedin_post_images/10.png", link: "https://www.linkedin.com/feed/update/urn:li:activity:7263184711013838848/" },
];

const LinkedInShowcase: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  // Get visible posts
  const getVisiblePosts = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(posts[(startIndex + i) % posts.length]);
    }
    return visible;
  };

  return (
    <SectionContainer>
      <Header>
        <Subtitle>Inside AI House</Subtitle>
        <Title>Past Events</Title>
        <Description>
          Explore highlight moments from our community events and project showcases.
        </Description>
      </Header>

      <CarouselWrapper>
        <AnimatePresence mode="popLayout" initial={false}>
          <Grid
            key={startIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {getVisiblePosts().map((post) => (
              <PostCard
                key={post.id}
                as={motion.a}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -10 }}
              >
                <ImageWrapper>
                  <Image
                    src={post.image}
                    alt={`LinkedIn Post ${post.id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="overlay">
                    <div className="play-button">
                      <Play fill="white" color="white" size={24} />
                    </div>
                  </div>
                </ImageWrapper>
              </PostCard>
            ))}
          </Grid>
        </AnimatePresence>

        <Controls>
          <NavButton onClick={prevSlide} aria-label="Previous">
            <ChevronLeft size={24} />
          </NavButton>
          <NavButton onClick={nextSlide} aria-label="Next">
            <ChevronRight size={24} />
          </NavButton>
        </Controls>
      </CarouselWrapper>
    </SectionContainer>
  );
};

export default LinkedInShowcase;

const SectionContainer = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 1.5rem auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 1rem auto;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Subtitle = styled.span`
  color: #724e99;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
  color: #666;
  font-size: 1.1rem;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const Grid = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PostCard = styled.a`
  display: block;
  aspect-ratio: 16/9;
  border-radius: 1.5rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  background: #f0f0f0;

  @media (max-width: 768px) {
    aspect-ratio: 4/3;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .play-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgba(114, 78, 153, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  ${PostCard}:hover & {
    .overlay {
      background: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }
    .play-button {
      transform: scale(1.1);
      background: #724e99;
    }
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavButton = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #724e99;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(114, 78, 153, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: #5d3a7b;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
