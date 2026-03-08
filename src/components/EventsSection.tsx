import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    image: "/upcoming events/secure_agent_build.png",
    title: "The Secure Agent Build: From TDD to EDD with Enkrypt AI",
    monthLabel: "Mar",
    dayNumber: "08",
    fullDate: "Sunday, March 8",
    time: "2:00 PM - 6:00 PM",
    venue: "Titan World - HSR Layout, Bengaluru",
    location: "Bengaluru, Karnataka",
    link: "https://luma.com/y8vzijyn"
  },
  {
    image: "/upcoming events/dsa_agentic_powered_by_lyzr.png",
    title: "Unlocking Dave's First Skill: Agentic DSA Powered by Lyzr",
    monthLabel: "Mar",
    dayNumber: "14",
    fullDate: "Saturday, March 14",
    time: "2:00 PM - 6:00 PM",
    venue: "Titan World - HSR Layout",
    location: "Bengaluru, Karnataka",
    link: "https://luma.com/czbzhdg6"
  },
  {
    image: "/upcoming events/open_claw_ai_agents.png",
    title: "HSRFC x OpenClaw Builders (AI Agents and Personal Assistants)",
    monthLabel: "Mar",
    dayNumber: "21",
    fullDate: "Saturday, March 21",
    time: "2:00 PM - 6:00 PM",
    venue: "OJone",
    location: "Bengaluru, Karnataka",
    link: "https://luma.com/t1jvh4av"
  },
  {
    image: "/upcoming events/hack_together.png",
    title: "Ambient Intelligence Hackathon: Building the Second Brain",
    monthLabel: "Mar",
    dayNumber: "28",
    fullDate: "Saturday, March 28",
    time: "9:00 AM - 1:00 PM",
    venue: "OJone",
    location: "Bengaluru, Karnataka",
    link: "https://luma.com/j4he39o0"
  },
];

const Section = styled.section`
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  padding: 3rem 1.5rem 1.5rem;
  background: white;

  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #4b5563;
  font-size: 1.125rem;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2.5rem;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileSlider = styled(motion.div)`
  display: flex;
  width: 100%;
`;

const MobileCardWrapper = styled.div`
  flex: 0 0 100%;
  padding: 0 0.5rem;
`;

const CardShadow = "0 10px 30px rgba(114, 78, 153, 0.06), 0 4px 10px rgba(114, 78, 153, 0.04)";
const CardHoverShadow = "0 20px 50px rgba(114, 78, 153, 0.12), 0 10px 20px rgba(114, 78, 153, 0.08)";

const Card = styled.a`
  background: white;
  border-radius: 1.25rem;
  border: 1px solid #e3d3f2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${CardShadow};
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  height: 100%;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${CardHoverShadow};
    border-color: #724e99;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;

  img {
    transition: transform 0.6s ease;
  }

  ${Card}:hover img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.125rem 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  flex: 1;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
`;

const DateCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding-top: 0.25rem;
`;

const EventTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.35;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Hosts = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: #4b5563;
  
  svg {
    color: #724e99;
    flex-shrink: 0;
  }
`;

const MonthLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #724e99;
  letter-spacing: 0.1em;
`;

const DayNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  line-height: 1;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const IconButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: #f3ebfa;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #724e99;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #724e99;
    color: white;
  }
`;

const Dots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${props => props.$active ? "1.5rem" : "0.5rem"};
  height: 0.5rem;
  border-radius: 1rem;
  background: ${props => props.$active ? "#724e99" : "#e3d3f2"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const SeeAllButton = styled.a`
  background: #724e99;
  color: white;
  padding: 0.875rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(114, 78, 153, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(114, 78, 153, 0.4);
    opacity: 0.95;
  }
`;

const EventCard = ({ event }: { event: typeof events[0] }) => (
  <Card href={event.link} target="_blank" rel="noopener noreferrer">
    <ImageWrapper>
      <Image
        src={event.image}
        alt={event.title}
        fill
        style={{ objectFit: 'cover' }}
      />
    </ImageWrapper>
    <CardContent>
      <InfoCol>
        <EventTitle title={event.title}>{event.title}</EventTitle>
        <MetaRow>
          <Calendar size={14} />
          <span>{event.fullDate}</span>
        </MetaRow>
        <MetaRow>
          <Clock size={14} />
          <span>{event.time}</span>
        </MetaRow>
        <MetaRow>
          <MapPin size={14} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {event.venue || "Bengaluru"}
          </span>
        </MetaRow>
      </InfoCol>
      <DateCol>
        <MonthLabel>{event.monthLabel}</MonthLabel>
        <DayNumber>{event.dayNumber}</DayNumber>
      </DateCol>
    </CardContent>
  </Card>
);

const EventsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const next = () => setCurrent((c) => (c === events.length - 1 ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? events.length - 1 : c - 1));

  if (!isMounted) return null;

  return (
    <Section id="events">
      <Title>Our Upcoming Events</Title>
      <Subtitle>
        Building a skilled GenAI developer workforce through advanced training, hands-on experience, & mentorship, empowering individuals and unlocking career opportunities in tech innovation.
      </Subtitle>

      <EventsGrid>
        {events.map((event, i) => (
          <EventCard key={`grid-${i}`} event={event} />
        ))}
      </EventsGrid>

      <MobileContainer>
        <MobileSlider
          animate={{ x: `-${current * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {events.map((event, i) => (
            <MobileCardWrapper key={`mobile-${i}`}>
              <EventCard event={event} />
            </MobileCardWrapper>
          ))}
        </MobileSlider>

        <Controls>
          <IconButton onClick={prev} aria-label="Previous event">
            <ChevronLeft size={20} />
          </IconButton>
          <Dots>
            {events.map((_, i) => (
              <Dot
                key={`dot-${i}`}
                $active={i === current}
                onClick={() => setCurrent(i)}
                aria-label={`Go to event ${i + 1}`}
              />
            ))}
          </Dots>
          <IconButton onClick={next} aria-label="Next event">
            <ChevronRight size={20} />
          </IconButton>
        </Controls>
      </MobileContainer>

      <CTAContainer>
        <SeeAllButton href="https://luma.com/ai_house" target="_blank" rel="noopener noreferrer">
          See All Events
        </SeeAllButton>
      </CTAContainer>
    </Section>
  );
};

export default EventsSection;
