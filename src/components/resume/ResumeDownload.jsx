import React from 'react';
import styled from 'styled-components';
import { FaDownload } from 'react-icons/fa';
import lalithResume from '../../assets/resume/Lalith.pdf'

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .75rem 1.5rem;
  background: var(--cta-button);
  color: white;
  border-radius: 3.125rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-0.1875rem);
    box-shadow: 0 .25rem .9375rem rgba(0, 0, 0, 0.4);
    text-decoration: none;
    color: white;
  }
`;

const ResumeDownload = () => {
  return (
    <ResumeButton href={lalithResume} title='Download Resume' target="_blank" aria-label="download" rel="noopener noreferrer">
      <FaDownload /> Download Resume
    </ResumeButton>
  );
};

export default ResumeDownload;
