import React from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PiGifBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { media } from '../../styles/Responsive';

// Container for the scrollable row
const ScrollContainer = styled.div`
	position: relative;
	width: 100%;
	padding: 1.25rem 0;
	display: flex;
	flex-direction: column;
`;

const ScrollRow = styled.div`
	display: flex;
	overflow-x: auto;
	scroll-behavior: smooth;
	padding: 1rem 0;
	scrollbar-width: none;
	position: relative;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const ScrollButton = styled.button`
	position: absolute;
	top: 53%;
	transform: translateY(-50%);
	z-index: 2;
	background: rgba(0, 0, 0, 0.6);
	color: white;
	border: none;
	width: 3rem;
	height: 180px; /* Match the height of the ProjectItem */
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	opacity: ${({ $visible }) => ($visible ? 0.7 : 0)};
	transition: opacity 0.2s ease;
	pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};

	&:hover {
		opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	}

	&:focus {
		outline: none;
	}

	${media.mobile`
    width: 2.5rem;
    height: 140px; /* Match the mobile height of ProjectItem */
  `}

	${(props) =>
		props.direction === 'left'
			? `
    left: 0;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  `
			: `
    right: 0;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  `}
`;

// Button content wrapper to center the icon
const ButtonContent = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	align-items: center;
	justify-content: center;
`;

// Category title
const CategoryTitle = styled.h3`
	font-size: 1.5rem;
	margin-bottom: 1rem;
	color: var(--text-color);
	padding-left: 1rem;
`;

// Project item in the row
const ProjectItem = styled.div`
	flex: 0 0 auto;
	width: 280px;
	height: 180px;
	margin-right: 1rem;
	border-radius: var(--border-radius);
	overflow: hidden;
	position: relative;
	cursor: pointer;
	box-shadow: var(--card-shadow);
	transition: transform 0.3s ease, box-shadow 0.3s ease;

	&:hover {
		transform: scale(1.05);
		.project-overlay {
			opacity: 1;
		}
	}

	${media.mobile`
    width: 220px;
    height: 140px;
  `}
`;

// Project image
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
		box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.3);
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

// Overlay with title and "click for details" message
const ProjectOverlay = styled.div`
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
	padding: 1rem;
	opacity: 0;
	transition: opacity 0.3s ease;

	&.project-overlay {
		opacity: 0;
	}
`;

// Project title in overlay
const ProjectTitle = styled.h4`
	color: white;
	font-size: 1.1rem;
	margin-bottom: 0.5rem;
	font-weight: 600;
`;

// Click for details message
const ViewDetailsText = styled.p`
	color: rgba(255, 255, 255, 0.8);
	font-size: 0.85rem;
	font-weight: 500;
`;

// Scroll Indicator Container
const ScrollIndicatorContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	height: 10px;
	gap: 4px;
	opacity: ${({ $visible }) => ($visible ? 1 : 0)};
	transition: opacity 0.3s ease;
`;

// Individual Scroll Indicator Dot
const ScrollIndicatorDot = styled.div`
	width: 30px;
	height: 4px;
	border-radius: 2px;
	background-color: ${({ $active }) =>
		$active ? 'var(--primary-color, #333)' : '#ccc'};
	transition: background-color 0.3s ease, width 0.3s ease;
`;

// Main container for all project categories
const ProjectCategoriesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	width: 100%;
`;

// SingleCategoryRow component to manage one category row
const SingleCategoryRow = ({ category, projects }) => {
	const rowRef = React.useRef(null);
	const navigate = useNavigate();

	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(false);
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [totalSections, setTotalSections] = React.useState(1);

	// Calculate how many sections we can scroll through
	const calculateSections = () => {
		if (rowRef.current) {
			const { scrollWidth, clientWidth } = rowRef.current;
			// Calculate how many full "pages" we can scroll through
			const sections = Math.ceil(scrollWidth / clientWidth);
			setTotalSections(Math.max(1, sections));
		}
	};

	// Check if scrolling is possible and update the active index
	const checkForScrollPosition = () => {
		if (rowRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;

			// Can scroll left if not at the beginning
			setCanScrollLeft(scrollLeft > 0);

			// Can scroll right if not at the end
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer

			// Calculate which "section" we're currently viewing
			const maxScroll = scrollWidth - clientWidth;
			const currentIndex =
				maxScroll <= 0
					? 0
					: Math.round(
							(scrollLeft / maxScroll) * (totalSections - 1)
					  );
			setActiveIndex(currentIndex);
		}
	};

	// Set up scroll position checking
	React.useEffect(() => {
		const scrollContainer = rowRef.current;

		// Initial calculations
		calculateSections();
		checkForScrollPosition();

		// Set up event listeners
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', checkForScrollPosition);
			window.addEventListener('resize', () => {
				calculateSections();
				checkForScrollPosition();
			});

			// Check after content loads (images might change the scrollWidth)
			setTimeout(() => {
				calculateSections();
				checkForScrollPosition();
			}, 500);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener(
					'scroll',
					checkForScrollPosition
				);
				window.removeEventListener('resize', calculateSections);
			}
		};
	}, [projects, totalSections]);

	const scrollLeft = () => {
		if (rowRef.current) {
			rowRef.current.scrollBy({ left: -600, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (rowRef.current) {
			rowRef.current.scrollBy({ left: 600, behavior: 'smooth' });
		}
	};

	// Scroll to a specific section when indicator is clicked
	const scrollToSection = (index) => {
		if (rowRef.current) {
			const { scrollWidth, clientWidth } = rowRef.current;
			const maxScroll = scrollWidth - clientWidth;
			const scrollAmount = (index / (totalSections - 1)) * maxScroll;

			rowRef.current.scrollTo({
				left: totalSections === 1 ? 0 : scrollAmount,
				behavior: 'smooth',
			});
		}
	};

	const handleProjectClick = (projectId) => {
		navigate(`/lalith-avinash-donkina.dev/${projectId}`);
	};

	// Check if we need scrolling at all (more items than can fit)
	const needsScrolling = projects.length > 0 && totalSections > 1;

	return (
		<ScrollContainer>
			<CategoryTitle>{category}</CategoryTitle>

			<ScrollButton
				direction='left'
				onClick={scrollLeft}
				$visible={needsScrolling && canScrollLeft}
				aria-label='Scroll left'>
				<ButtonContent>
					<FaChevronLeft />
				</ButtonContent>
			</ScrollButton>

			<ScrollRow
				ref={rowRef}
				onLoad={() => {
					calculateSections();
					checkForScrollPosition();
				}}>
				{projects.map((project, index) => (
					<ProjectItem
						className={index === 1 ? 'project-card' : ''}
						key={index}
						onClick={() => handleProjectClick(project.id)}>
						<ProjectImage>
							<img
								src={project.image}
								alt={project.title}
								onLoad={() => {
									calculateSections();
									checkForScrollPosition();
								}}
							/>
							{project.personalProject && <Logo>LD</Logo>}
							{project.isGif && <PiGifBold />}
						</ProjectImage>
						<ProjectOverlay className='project-overlay'>
							<ProjectTitle>{project.title}</ProjectTitle>
							<ViewDetailsText>Click for details</ViewDetailsText>
						</ProjectOverlay>
					</ProjectItem>
				))}
			</ScrollRow>

			<ScrollButton
				direction='right'
				onClick={scrollRight}
				$visible={needsScrolling && canScrollRight}
				aria-label='Scroll right'>
				<ButtonContent>
					<FaChevronRight />
				</ButtonContent>
			</ScrollButton>

			<ScrollIndicatorContainer $visible={needsScrolling}>
				{Array.from({ length: totalSections }, (_, i) => (
					<ScrollIndicatorDot
						key={i}
						$active={i === activeIndex}
						onClick={() => scrollToSection(i)}
						style={{
							width: i === activeIndex ? '40px' : '30px',
							cursor: 'pointer',
						}}
					/>
				))}
			</ScrollIndicatorContainer>
		</ScrollContainer>
	);
};

// Main component that groups projects by category and renders a row for each category
const CategorizedProjects = ({ projects }) => {
	// Group projects by category
	const groupProjectsByCategory = (projects) => {
		return projects.reduce((groups, project) => {
			const category = project.category || 'Featured Projects';
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(project);
			return groups;
		}, {});
	};

	const projectsByCategory = groupProjectsByCategory(projects);

	return (
		<ProjectCategoriesContainer>
			{Object.entries(projectsByCategory).map(
				([category, categoryProjects]) => (
					<SingleCategoryRow
						key={category}
						category={category}
						projects={categoryProjects}
					/>
				)
			)}
		</ProjectCategoriesContainer>
	);
};

export default CategorizedProjects;
