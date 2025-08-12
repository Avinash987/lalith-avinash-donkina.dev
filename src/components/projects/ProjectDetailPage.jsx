import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { media } from '../../styles/Responsive';
import { projectsData, prepareProject } from '../../sections/Projects';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  transition: var(--transition);

  &:hover { color: var(--primary-color); }
`;

const ProjectHero = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 2rem;

  ${media.mobile`
    height: 30vh;
    height: 30dvh;
  `}
`;

const HeroImage = styled.img`
  image-rendering: auto;
  -ms-interpolation-mode: bicubic;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Shimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, rgba(255,255,255,0.06) 8%, rgba(255,255,255,0.16) 18%, rgba(255,255,255,0.06) 33%);
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  @keyframes shimmer {
    to { background-position-x: -200%; }
  }
`;
const buildSrcSet = (src) => {
  try {
    const u = new URL(src);
    const host = u.hostname;
    // Clearbit logos → varying size param
    if (host.includes('logo.clearbit.com')) {
      const sizes = [128, 256, 512, 768, 1024];
      const path = `${u.origin}${u.pathname}`;
      return sizes.map((s) => `${path}?size=${s} ${s}w`).join(', ');
    }
    // Google favicon service
    if (host.includes('google.com') && u.pathname.includes('/s2/favicons')) {
      const domain = u.searchParams.get('domain');
      const sizes = [64, 128, 256, 512];
      const path = `${u.origin}${u.pathname}`;
      return sizes.map((s) => `${path}?domain=${domain}&sz=${s} ${s}w`).join(', ');
    }
    return undefined;
  } catch { return undefined; }
};

const HeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
`;

const ProjectTitle = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  ${media.mobile`font-size: 1.8rem;`}
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  ${media.mobile`grid-template-columns: 1fr;`}
`;

const ProjectDescription = styled.div`
  color: var(--text-color);
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: var(--text-color);
`;

const FeaturesList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 2rem;
`;

const Feature = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProjectMeta = styled.div`
  background-color: var(--card-background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TechTag = styled.span`
  background-color: var(--background-color);
  color: var(--text-color);
  padding: 0.25rem 0.75rem;
  border-radius: 3.125rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const MetaItem = styled.div`
  margin-bottom: 1.5rem;
`;

const MetaLabel = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
`;

const MetaValue = styled.p`
  font-size: 1rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  text-decoration: none;
  font-weight: 500;
  background-color: ${({ $primary }) => ($primary ? 'var(--primary-color)' : '#333')};
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.3rem 0.5rem rgba(0,0,0,0.2);
  }
`;

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === projectId);
    setProject(foundProject ? prepareProject(foundProject) : null);
    setLoading(false);
  }, [projectId]);

  if (loading) return <DetailContainer>Loading project details...</DetailContainer>;
  if (!project) return <DetailContainer>Project not found</DetailContainer>;

  return (
    <DetailContainer>
      <BackButton
        onClick={() => {
          navigate('/lalith-avinash-donkina.dev/#projects');
          setTimeout(() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      >
        <FaArrowLeft /> Back to Projects
      </BackButton>

      <ProjectHero>
        {project.image && (
          <>
            {!imgLoaded && <Shimmer aria-hidden />}
            <HeroImage
              src={project.image}
              srcSet={buildSrcSet(project.image)}
              sizes="(max-width: 768px) 100vw, 1200px"
              alt={project.title || 'Project image'}
              loading="lazy"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
            />
            <HeroOverlay>
              <ProjectTitle>{project.title}</ProjectTitle>
            </HeroOverlay>
          </>
        )}
      </ProjectHero>

      <ProjectInfo>
        <ProjectDescription>
          <Description>{project.description}</Description>

          {project.features?.length > 0 && (
            <>
              <SectionTitle>Key Features</SectionTitle>
              <FeaturesList>
                {project.features.map((f, i) => (
                  <Feature key={i}>{f}</Feature>
                ))}
              </FeaturesList>
            </>
          )}
        </ProjectDescription>

        <ProjectMeta>
          {project.techStack?.length > 0 && (
            <>
              <SectionTitle>Technologies</SectionTitle>
              <TechStack>
                {project.techStack.map((tech, i) => (
                  <TechTag key={i}>{tech}</TechTag>
                ))}
              </TechStack>
            </>
          )}

          {project.projectType && (
            <MetaItem>
              <MetaLabel>Project Type</MetaLabel>
              <MetaValue>{project.projectType}</MetaValue>
            </MetaItem>
          )}

          {project.completionDate && (
            <MetaItem>
              <MetaLabel>Completion Date</MetaLabel>
              <MetaValue>{project.completionDate}</MetaValue>
            </MetaItem>
          )}

          {project.client && (
            <MetaItem>
              <MetaLabel>Client</MetaLabel>
              <MetaValue>{project.client}</MetaValue>
            </MetaItem>
          )}

          {project.role && (
            <MetaItem>
              <MetaLabel>My Role</MetaLabel>
              <MetaValue>{project.role}</MetaValue>
            </MetaItem>
          )}

          <ProjectLinks>
            {project.liveDemo && (
              <ProjectLink href={project.liveDemo} target="_blank" rel="noopener noreferrer" $primary>
                <FaExternalLinkAlt /> View Live Demo
              </ProjectLink>
            )}
            {project.github && (
              <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                <FaGithub /> View Source Code
              </ProjectLink>
            )}
          </ProjectLinks>
        </ProjectMeta>
      </ProjectInfo>
    </DetailContainer>
  );
};

export default ProjectDetailPage;