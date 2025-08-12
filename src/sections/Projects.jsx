import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaProjectDiagram, FaThLarge, FaSlidersH } from 'react-icons/fa';
import ProjectGrid from '../components/projects/ProjectGrid';
import ProjectList from '../components/projects/ProjectList';
import { media } from '../styles/Responsive';
import { FaGlobe, FaRobot, FaCubes } from 'react-icons/fa';
import { SiAdobe, SiOpenai, SiTensorflow, SiFlutter, SiApachekafka } from 'react-icons/si';

import placeholder from '../assets/images/projects/placeholder-project.webp';

/* ---------------------------
   Auto-thumbnail helpers
---------------------------- */
const LABEL_OVERRIDES = {
  'td-us-cms': 'TD US',
  'td-canada-cms': 'TD CA',
  'mbna-canada-cms': 'MBNA',
  'td-securities-cms': 'TDS',
  'minecraft-education-web': 'MC EDU',
  'assumption-charity': 'ASSUMP',
  'yogai': 'yogAI',
  'drug-discovery': 'DRUG',
  'llm-hallucination-control': 'LLM',
  'air-quality-streaming': 'AQS',
  'text-to-sql-agent': 'T-SQL',
};

const abbrevTitle = (title = '') => {
  const words = title.replace(/[^A-Za-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  if (!words.length) return 'PRJ';
  const pick = words.slice(0, 2).map(w => w[0].toUpperCase()).join('');
  return pick || 'PRJ';
};

const hashCode = (str = '') => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

// ---- lightweight client-side cache for remote logos (Clearbit / Google Favicon)
const readCache = (k) => {
  try { return localStorage.getItem(k); } catch { return null; }
};
const writeCache = (k, v) => {
  try { localStorage.setItem(k, v); } catch {}
};
const fetchAsDataURL = async (url) => {
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error('fetch failed');
  const blob = await res.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};
// try to return cached dataURL immediately; if not, return null
const getCachedDataURL = (key) => readCache(key);
// fire-and-forget prefetch to populate cache
const prefetchAndCache = async (url, key) => {
  if (!url || !key) return;
  try {
    // avoid re-downloading if we already have it
    if (readCache(key)) return;
    const dataUrl = await fetchAsDataURL(url);
    if (dataUrl) writeCache(key, dataUrl);
  } catch { /* noop */ }
};

const makeThumb = (label, seed = 0) => {
  const hue = hashCode(String(seed)) % 360;
  const hue2 = (hue + 38) % 360;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" role="img" aria-label="${label}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue},85%,60%)"/>
        <stop offset="100%" stop-color="hsl(${hue2},85%,50%)"/>
      </linearGradient>
      <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="15" flood-opacity="0.2"/>
      </filter>
    </defs>
    <rect x="20" y="20" width="760" height="460" rx="28" fill="url(#g)" filter="url(#s)"/>
    <text x="50%" y="54%" text-anchor="middle" font-family="system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial" font-weight="800" font-size="120" fill="#fff" opacity="0.95">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const getHost = (url) => {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

const clearbitLogo = (host, size = 512) =>
  host ? `https://logo.clearbit.com/${host}?size=${size}` : null;

const googleFavicon = (host, size = 256) =>
  host ? `https://www.google.com/s2/favicons?domain=${host}&sz=${size}` : null;

/**
 * Prepare a project image that WORKS for your slider & detail page
 * - For CMS (AEM/WordPress/etc.), use a high-res brand logo (Clearbit) and
 *   fallback to Google favicon.
 * - For others (AI/ML/Data), generate a crisp SVG gradient thumbnail.
 */
export const prepareProject = (p) => {
  if (!p) return p;

  // If an explicit non-placeholder image exists, keep it.
  if (p.image && p.image !== placeholder) return p;

  const label = LABEL_OVERRIDES[p.id] || abbrevTitle(p.title);
  const host = getHost(p.liveDemo);

  if (p.category === 'Content Management Systems' && host) {
    // Prefer large, crisp logo for CMS work
    const primary = clearbitLogo(host, 512);
    const fallback = googleFavicon(host, 256);

    // try a cached dataURL first for instant, crisp rendering
    const cacheKey = `logo:${host}:512`;
    const cached = getCachedDataURL(cacheKey);
    if (cached) return { ...p, image: cached };

    // otherwise use the network URL now (fast), and we will prefetch+cache for next time
    // kick off background prefetch
    prefetchAndCache(primary, cacheKey);
    return { ...p, image: primary || fallback || makeThumb(label, p.id || p.title) };
  }

  // Personal / AI-ML / Data → generated SVG so each card is distinct
  return { ...p, image: makeThumb(label, p.id || p.title) };
};

export const getPreparedProjects = () => projectsData.map(prepareProject);

/* ---------------------------
   PROJECTS DATA
---------------------------- */
export const projectsData = [
  // WEB • WORK EXPERIENCE (CMS)
  {
    id: 'td-us-cms',
    title: 'TD Bank – United States (CMS/AEM)',
    display: true,
    status: 'completed',
    category: 'Content Management Systems',
    icon: <SiAdobe title="Adobe Experience Manager" />,
    description:
      'AEM component library and content migration supporting TD Bank US web properties. Built reusable HTL components, authoring dialogs and policies; streamlined authoring and boosted Lighthouse scores with strict accessibility and SEO checks.',
    image: placeholder,
    techStack: ['AEM', 'Java', 'HTL', 'Sling Models', 'React', 'Jenkins', 'SonarQube', 'Accessibility', 'SEO'],
    tags: ['Reusable Components', 'Authoring UX', 'Accessibility (WCAG)', 'Performance', 'SEO'],
    metrics: ['600+ pages migrated (overall program)', '20K+ assets organized', '90%+ unit test coverage on core modules'],
    personalProject: false,
    liveDemo: 'https://www.td.com/us/en/personal-banking',
    github: null,
    features: [
      'Developed 30+ configurable components (tabs, carousels, CTAs, cards, accordions, hero variants) with content policies and i18n support',
      'Wrote Sling Models and HTL templates; integrated React where interactivity/performance warranted',
      'Set up authoring guidelines, content validation and PR templates to reduce regressions',
      'Improved Core Web Vitals by optimizing images, deferring non-critical JS, and pruning render-blocking CSS',
      'Added analytics/data-layer hooks for consistent event tracking across components',
    ],
    completionDate: '2023',
    client: 'TD Bank (US)',
    role: 'Full-Stack CMS Developer',
  },
  {
    id: 'mbna-canada-cms',
    title: 'MBNA Canada – (CMS/AEM)',
    display: true,
    status: 'completed',
    category: 'Content Management Systems',
    icon: <SiAdobe title="Adobe Experience Manager" />,
    description:
      'Supported MBNA Canada credit-card marketing experiences: templates, content fragments, and SEO schema. Ensured strong performance and authoring ergonomics.',
    image: placeholder,
    techStack: ['AEM', 'HTL', 'Content Fragments', 'SEO', 'Accessibility'],
    tags: ['Credit Cards', 'Schema.org', 'Authoring', 'Performance'],
    metrics: ['Improved template authoring time by ~25% via presets'],
    personalProject: false,
    liveDemo: 'https://www.mbna.ca/en',
    github: null,
    features: [
      'Built CF-driven card comparison modules with structured data for rich-results',
      'Reusable promo blocks and page fragments for rapid campaign rollout',
      'Optimized media with smart renditions and lazy-loading strategies',
    ],
    completionDate: '2023',
    client: 'MBNA (Canada)',
    role: 'CMS Developer',
  },

  {
    id: 'minecraft-education-web',
    title: 'Minecraft Education – Web Experience',
    display: true,
    status: 'completed',
    category: 'Content Management Systems',
    icon: <FaCubes title="Minecraft Education" />,
    description:
      'Front-end/content contributions aligned to Minecraft Education web experiences. Focus on accessibility, performance, and content structure for educator journeys.',
    image: placeholder,
    techStack: ['HTML', 'CSS', 'JavaScript', 'Accessibility', 'Performance'],
    tags: ['Education', 'UX Writing', 'a11y', 'Lighthouse'],
    metrics: ['Optimized page structure for better discoverability'],
    personalProject: false,
    liveDemo: 'https://education.minecraft.net/en-us',
    github: null,
    features: [
      'Accessible component patterns (labels, roles, focus states)',
      'Refined IA and CTAs for clearer educator paths',
      'Asset optimization and deferral for faster first contentful paint',
    ],
    completionDate: '2024',
    client: 'Microsoft (Minecraft Education)',
    role: 'Web Contributor',
  },

  {
    id: 'td-canada-cms',
    title: 'TD Canada Trust – (CMS/AEM)',
    display: true,
    status: 'completed',
    category: 'Content Management Systems',
    icon: <SiAdobe title="Adobe Experience Manager" />,
    description:
      'Enabled AEM authoring patterns and component variants for TD Canada Trust pages. Focused on accessibility, localization, and performance under high traffic.',
    image: placeholder,
    techStack: ['AEM', 'HTL', 'Java', 'i18n', 'Accessibility', 'Performance', 'CI/CD'],
    tags: ['Localization', 'Core Components', 'CUG/Permissions', 'Dispatcher Cache'],
    metrics: ['Consistent 90+ Lighthouse a11y/SEO on new templates'],
    personalProject: false,
    liveDemo: 'https://www.td.com/ca/en/personal-banking',
    github: null,
    features: [
      'Extended/templated Core Components with content policies and localization keys',
      'Authored Experience Fragments for re-use across campaigns and microsites',
      'Improved dispatcher caching rules for HTML/JSON endpoints to reduce TTFB',
      'Enforced WCAG labels, keyboard support, and focus order across interactive modules',
    ],
    completionDate: '2023',
    client: 'TD Canada Trust',
    role: 'CMS Developer',
  },
  
  {
    id: 'td-securities-cms',
    title: 'TD Securities – (CMS/AEM)',
    display: true,
    status: 'completed',
    category: 'Content Management Systems',
    icon: <SiAdobe title="Adobe Experience Manager" />,
    description:
      'Enterprise content modules and authoring workflows for TD Securities properties, with emphasis on accessibility and content governance.',
    image: placeholder,
    techStack: ['AEM', 'HTL', 'Java', 'Authoring Workflows', 'Analytics'],
    tags: ['Capital Markets', 'Authoring Governance', 'Accessibility'],
    metrics: ['Reduced content rollout friction for marketing teams'],
    personalProject: false,
    liveDemo: 'https://www.tdsecurities.com/ca/en',
    github: null,
    features: [
      'Modular case-study/news components with tagging and filtering',
      'Experience Fragments to syndicate content across locales',
      'Data-layer hooks and consent checks for analytics',
    ],
    completionDate: '2023',
    client: 'TD Securities',
    role: 'CMS Developer',
  },

  
  {
    id: 'assumption-charity',
    title: 'Assumption Charity – Engagement Site',
    display: true,
    status: 'completed',
    category: 'Content Management Systems',
    icon: <FaGlobe title="Non-profit Web" />,
    description:
      'Interactive features (3D reader), newsletter funnels, and new donor pages with strong a11y and maintainability.',
    image: placeholder,
    techStack: ['WordPress', 'PHP', 'jQuery', 'GSAP/WebGL', 'Mailchimp', 'CSS3'],
    tags: ['Gutenberg Blocks', 'A11y', 'Donor Funnels'],
    metrics: ['+25% newsletter conversions (new forms)'],
    personalProject: false,
    liveDemo: 'https://assumption.us',
    github: null,
    features: [
      '3D flipbook embeds, timed popups with respectful frequency caps',
      'Reusable blocks/shortcodes for editors',
      'Anti-spam validation and nonce-secured AJAX forms',
    ],
    completionDate: 'Feb 2025',
    client: 'Assumption Charity (US)',
    role: 'WordPress Developer',
  },

  // PERSONAL • AI/ML & DATA
  {
    id: 'yogai',
    title: 'yogAI – Real-Time Yoga Pose Trainer',
    display: true,
    status: 'completed',
    category: 'AI/ML',
    icon: <SiFlutter title="Flutter" />,
    description:
      'Flutter app + TensorFlow.js PoseNet for on-device pose estimation and feedback. Privacy-preserving and fast.',
    image: placeholder,
    techStack: ['Flutter', 'TensorFlow.js', 'PoseNet', 'JavaScript'],
    tags: ['Edge Inference', 'Pose Estimation', 'HealthTech'],
    metrics: ['92% accuracy', '<50ms latency'],
    personalProject: true,
    liveDemo: null,
    github: 'https://github.com/Avinash987/yogAI',
    features: ['Keypoint tracking with stable confidence thresholds', 'Guided sessions, posture tips, and progress tracking'],
    completionDate: 'Feb 2025',
    role: 'Mobile & CV Engineer',
  },
  {
    id: 'drug-discovery',
    title: 'Drug Discovery Using Deep Learning',
    display: true,
    status: 'completed',
    category: 'AI/ML',
    icon: <SiTensorflow title="Deep Learning" />,
    description:
      'Generative RNN/Transformer for SMILES; RL and GA optimization; docking with PyRx to shortlist candidates.',
    image: placeholder,
    techStack: ['Python', 'RNN/LSTM', 'Transformers', 'Reinforcement Learning', 'PyRx'],
    tags: ['SMILES', 'Docking', 'Cheminformatics'],
    metrics: ['32K+ molecules', 'Docking ~−18'],
    personalProject: true,
    liveDemo: null,
    github: 'https://github.com/Avinash987/Drug-Discovery-Using-Deep-Learning-and-The-COVID-19',
    features: ['RL reward shaping for property constraints', 'Reproducible training/evaluation pipeline'],
    completionDate: 'Apr 2025',
    role: 'Research Lead',
  },
  {
    id: 'llm-hallucination-control',
    title: 'LLM Hallucination Control – GPT & T5 Multi-Agent',
    display: true,
    status: 'completed',
    category: 'AI/ML',
    icon: <SiOpenai title="OpenAI" />,
    description:
      'Planner/Generator/Verifier agents with entropy-based scoring and CoT prompts to reduce hallucinations.',
    image: placeholder,
    techStack: ['OpenAI GPT-4', 'T5', 'LangChain', 'JavaScript'],
    tags: ['Multi-Agent', 'Prompting', 'Evaluation'],
    metrics: ['~30% reduction in errors (internal eval)'],
    personalProject: true,
    liveDemo: null,
    github: null,
    features: ['Self-consistency and re-prompting based on uncertainty', 'Pluggable scoring hooks for different domains'],
    completionDate: 'Mar 2025',
    role: 'AI Researcher',
  },
  {
    id: 'air-quality-streaming',
    title: 'Air Quality Streaming & Dashboard',
    display: true,
    status: 'completed',
    category: 'Data',
    icon: <SiApachekafka title="Kafka" />,
    description: 'Spark + Kafka ETL for 30+ cities; forecasting and Streamlit dashboard for near real-time insights.',
    image: placeholder,
    techStack: ['Spark', 'Kafka', 'MLlib', 'Python', 'Streamlit'],
    tags: ['ETL', 'Forecasting', 'Dashboards'],
    metrics: ['−40% latency end-to-end'],
    personalProject: true,
    liveDemo: null,
    github: null,
    features: ['Resilient topics with replay/backfill', 'City/pollutant drilldowns; alert thresholds'],
    completionDate: 'Jan 2025',
    role: 'Data Engineer',
  },
  {
    id: 'text-to-sql-agent',
    title: 'Text-to-SQL Multi-Agent System',
    display: true,
    status: 'completed',
    category: 'AI/ML',
    icon: <FaRobot title="Agentic AI" />,
    description:
      'Planner–Retriever–Generator–Verifier pipeline with schema linking and self-verification; benchmarked on BIRD-SQL.',
    image: placeholder,
    techStack: ['LangChain', 'OpenAI API', 'SQLite', 'Node.js'],
    tags: ['Schema Linking', 'SQL Generation', 'Self-Verification'],
    metrics: ['68% exact-match (internal setup)'],
    personalProject: true,
    liveDemo: null,
    github: null,
    features: ['Executable verification/correction loop', 'Error taxonomy and benchmark harness'],
    completionDate: 'Dec 2024',
    role: 'AI Engineer',
  },
];

/* ---------------------------
   UI
---------------------------- */
const ProjectsSection = styled.section`
  padding: 1rem 0;
  margin: 0 auto;
`;

const ViewToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${media.xs`
    flex-direction: column;
    gap: 1.5rem;
  `}
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: var(--card-background);
  border-radius: 0.5rem;
  padding: 0.25rem;
  z-index: 1;
  box-shadow: 0 0.125rem 0.3125rem rgba(0,0,0,0.1);
`;

const ToggleButton = styled.button`
  background-color: ${({ $active }) => ($active ? 'var(--primary-color)' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'var(--text-color)')};
  border: none;
  border-radius: ${({ $position }) => ($position === 'left' ? '4px 0 0 4px' : '0 4px 4px 0')};
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  svg { margin-right: 0.375rem; }

  &:hover {
    background-color: ${({ $active }) => ($active ? 'var(--primary-color)' : 'var(--background-hover)')};
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 10rem;
    height: 0.1875rem;
    background: linear-gradient(90deg, var(--primary-color) 0%, var(--card-background, #6d9fff) 100%);
  }

  ${media.mobile`font-size: 1.75rem;`}
`;

const Projects = () => {
  const [viewMode, setViewMode] = useState('list');
  const projects = useMemo(() => getPreparedProjects(), []);

  // Warm logo cache so slider/grid show crisp brand marks even offline
  useEffect(() => {
    projects.forEach((p) => {
      const host = getHost(p.liveDemo);
      if (p.category === 'Content Management Systems' && host) {
        const url = clearbitLogo(host, 512);
        const key = `logo:${host}:512`;
        prefetchAndCache(url, key);
      }
    });
  }, [projects]);

  return (
    <ProjectsSection id="projects">
      <ViewToggleContainer>
        <SectionTitle tabIndex="0">
          Projects <FaProjectDiagram aria-label="Project icon" title="Project icon" />
        </SectionTitle>
        <ViewToggle id="project-toggle">
          <ToggleButton $position="left" $active={viewMode === 'list'} onClick={() => setViewMode('list')} aria-label="List view">
            <FaSlidersH size={18} /> Slider
          </ToggleButton>
          <ToggleButton $position="right" $active={viewMode === 'grid'} onClick={() => setViewMode('grid')} aria-label="Grid view">
            <FaThLarge size={18} /> Grid
          </ToggleButton>
        </ViewToggle>
      </ViewToggleContainer>

      {viewMode === 'grid' ? (
        <ProjectGrid projects={projects} initialCount={3} />
      ) : (
        <ProjectList projects={projects} />
      )}
    </ProjectsSection>
  );
};

export default Projects;