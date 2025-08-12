import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PiGifBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { media } from '../../styles/Responsive';

// Grid layout for the cards
const ProjectGridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 1.5rem;

	${media.mobile`
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  `}
`;

// Simplified project card for grid view
const MinimalProjectCard = styled.div`
	background-color: var(--card-background);
	border-radius: var(--border-radius);
	box-shadow: var(--card-shadow);
	transition: var(--transition);
	height: 200px;
	position: relative;
	overflow: hidden;
	cursor: pointer;

	&:hover {
		transform: translateY(-0.3125rem);
		box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.2);

		.card-overlay {
			opacity: 1;
		}
	}
`;

const ProjectImage = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 0.5rem;
	overflow: hidden;
	margin-bottom: 1rem;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	&:hover img {
		transform: scale(1.05);
	}
	&:hover svg {
		transform: scale(1.05);
		background: var(--primary-color);
	}

	svg {
		position: absolute;
		bottom: 20px;
		right: 20px;
		font-size: 42px;
		padding: 8px;
		border-radius: 50%;
	}
`;

const Logo = styled.div`
	font-weight: 900;
	font-size: 1.5rem;
	color: var(--primary-color);
	background: var(--background-color);
	position: absolute;
	top: 1rem;
	left: 1rem;
	font-size: 1.75rem;
	padding: 8px;
	border-radius: 0.5rem;
`;

const CardOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.8) 0%,
		rgba(0, 0, 0, 0.4) 50%,
		rgba(0, 0, 0, 0.1) 100%
	);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 1.5rem;
	opacity: 0;
	transition: opacity 0.3s ease;

	&.card-overlay {
		opacity: 0;
	}
`;

const ProjectTitle = styled.h3`
	font-size: 1.25rem;
	color: white;
	margin-bottom: 0.5rem;

	${media.mobile`
    font-size: 1.1rem;
  `}
`;

const ViewDetailsText = styled.p`
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.85rem;
`;

// Show More Button
const ShowMoreButton = styled.button`
	background-color: var(--primary-color);
	color: white;
	border: none;
	border-radius: var(--border-radius);
	padding: 0.75rem 2rem;
	font-size: 1rem;
	font-weight: 500;
	cursor: pointer;
	transition: var(--transition);
	margin: 2rem auto 0;
	display: block;

	&:hover {
		background-color: var(--primary-color-dark, #0056b3);
		transform: translateY(-2px);
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.3);
	}
`;


const ProjectGrid = React.memo(({ projects, initialCount = 3, viewMode }) => {
	const [visibleCount, setVisibleCount] = useState(initialCount);
	const navigate = useNavigate();

	const visibleProjects = projects.slice(0, visibleCount);
	const hasMoreProjects = visibleCount < projects.length;

	const handleShowMore = () => {
		setVisibleCount((prevCount) =>
			Math.min(prevCount + initialCount, projects.length)
		);
	};

	const handleProjectClick = (projectId) => {
		navigate(`/lalith-avinash-donkina.dev/${projectId}`);
	};

	return (
		<>
			<div>
				<>
					<ProjectGridContainer>
						{visibleProjects.map((project, index) => (
							<MinimalProjectCard
								key={index}
								onClick={() => handleProjectClick(project.id)}>
								<ProjectImage>
									<img
										src={project.image}
										alt={project.title}
									/>
									{project.personalProject && (
										<Logo>LD</Logo>
									)}
									{project.isGif && <PiGifBold />}
								</ProjectImage>
								<CardOverlay className='card-overlay'>
									<ProjectTitle>{project.title}</ProjectTitle>
									<ViewDetailsText>
										Click for details
									</ViewDetailsText>
								</CardOverlay>
							</MinimalProjectCard>
						))}
					</ProjectGridContainer>

					{hasMoreProjects && (
						<ShowMoreButton onClick={handleShowMore}>
							Show More
						</ShowMoreButton>
					)}
				</>
			</div>
		</>
	);
});

export default ProjectGrid;
