import React from "react";
import styled from "styled-components";
import { Send, Users, Code, MapPin, Trophy, GraduationCap } from "lucide-react";
import Image from "next/image";

const stats = [
  { value: "15,000+", label: "Community Members", icon: Send },
  { value: "100+", label: "Events, Workshops, Hackathons, Challenges", icon: Users },
  { value: "3000+", label: "Monthly Platform Users Active", icon: Code },
  { value: "5000+", label: "Mentored 1:1 in the AI Field", icon: MapPin },
  { value: "700+", label: "Speakers / Organisers / Tech Influencers", icon: Trophy },
  { value: "50+", label: "College Database", icon: GraduationCap },
];

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 5rem;
  
  @media (max-width: 768px) {
    padding: 1rem 1rem 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const CardShadow = "0 10px 30px rgba(114, 78, 153, 0.06), 0 4px 10px rgba(114, 78, 153, 0.04)";
const CardHoverShadow = "0 20px 50px rgba(114, 78, 153, 0.12), 0 10px 20px rgba(114, 78, 153, 0.08)";

const MapCard = styled.div`
  grid-row: span 2;
  background: white;
  border-radius: 1.5rem;
  border: 1px solid #e3d3f2;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: ${CardShadow};
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${CardHoverShadow};
    border-color: #724e99;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(180deg, rgba(234, 223, 245, 0) 0%, rgba(234, 223, 245, 0.3) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    grid-row: auto;
    grid-column: span 2;
    min-height: 350px;
    padding: 1.5rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2rem;
  line-height: 1.1;
  z-index: 1;
`;

const MapImageWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
  img {
    width: 100%;
    height: auto;
    max-height: 350px;
    object-fit: contain;
  }
`;

const StatCardWrapper = styled.div`
  background: white;
  border-radius: 1.5rem;
  border: 1px solid #e3d3f2;
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  box-shadow: ${CardShadow};
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${CardHoverShadow};
    border-color: #724e99;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(180deg, rgba(234, 223, 245, 0) 0%, rgba(234, 223, 245, 0.4) 100%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: auto;
    padding: 1.25rem 1rem;
  }
`;

const StatValue = styled.p`
  font-size: 2.75rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.03em;
  line-height: 1;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const StatLabel = styled.p`
  font-size: 1.05rem;
  color: #4b5563;
  margin-top: 0.75rem;
  font-weight: 500;
  line-height: 1.4;
  z-index: 1;
`;

const IconCircle = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 1rem;
  background: #f3ebfa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem auto 0;
  transition: all 0.4s ease;
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    margin-top: 1rem;
  }
`;

const StyledIcon = styled(({ className, icon: Icon }: { className?: string; icon: React.ElementType }) => (
  <Icon className={className} />
))`
  width: 1.5rem;
  height: 1.5rem;
  color: #724e99;
  transition: color 0.4s ease;

  ${StatCardWrapper}:hover & {
    color: white;
  }
`;

const CommunityStats = () => {
  return (
    <Section>
      <Title>Our Reach</Title>

      <Grid>
        <MapCard>
          <CardTitle>Across the Nation</CardTitle>
          <MapImageWrapper>
            <Image
              src="/small_indian_map.png"
              alt="India map with location pins"
              width={400}
              height={500}
              priority
            />
          </MapImageWrapper>
        </MapCard>

        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </Grid>
    </Section>
  );
};

const StatCard = ({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
}) => (
  <StatCardWrapper>
    <div>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </div>
    <IconCircle>
      <StyledIcon icon={Icon} />
    </IconCircle>
  </StatCardWrapper>
);

export default CommunityStats;
