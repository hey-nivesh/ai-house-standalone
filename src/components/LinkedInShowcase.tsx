"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

// Register global window types
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const videos = [
  { id: "FH8DhbCBwqs", title: "Project Showcase 1" },
  { id: "0CnIot_IMAQ", title: "Project Showcase 2" },
];

const LinkedInShowcase: React.FC = () => {
  const [apiReady, setApiReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if script is already loaded
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

    // Set up global callback
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (previousCallback) previousCallback();
      setApiReady(true);
    };

    // Load YouTube API if not already present
    if (!document.getElementById("youtube-player-script")) {
      const tag = document.createElement("script");
      tag.id = "youtube-player-script";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <SectionContainer id="showcase">
      <Header>
        <Subtitle>Inside AI House</Subtitle>
        <Title>Past Events</Title>
        <Description>
          Explore highlight moments from our community events and project showcases.
        </Description>
      </Header>

      <VideoGrid>
        {videos.map((video) => (
          <VideoCard key={video.id} videoId={video.id} apiReady={apiReady} />
        ))}
      </VideoGrid>
    </SectionContainer>
  );
};

const VideoCard = ({ videoId, apiReady }: { videoId: string; apiReady: boolean }) => {
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (apiReady && !playerRef.current) {
      playerRef.current = new window.YT.Player(`player-${videoId}`, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: videoId,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            setIsLoaded(true);
          },
        },
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [apiReady, videoId]);

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <VideoWrapper>
        <div id={`player-${videoId}`} style={{ width: "100%", height: "100%" }} />
        {isLoaded && (
          <VoiceButton onClick={handleToggleVoice} aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? (
              <>
                <VolumeX size={18} />
                <span>Open Voice</span>
              </>
            ) : (
              <>
                <Volume2 size={18} />
                <span>Mute</span>
              </>
            )}
          </VoiceButton>
        )}
      </VideoWrapper>
    </CardContainer>
  );
};

export default LinkedInShowcase;

const SectionContainer = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 4rem auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

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

const VideoGrid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CardContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: #000;

  @media (max-width: 480px) {
    border-radius: 1rem;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VoiceButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(114, 78, 153, 0.85);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(114, 78, 153, 1);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    bottom: 0.75rem;
    right: 0.75rem;
  }
`;

