import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaCalendar, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ResumeDownload from '../resume/ResumeDownload';
import profilePicture from '../../assets/images/portfolio-photo.png';
import { media } from '../../styles/Responsive';
import BgParticles from '../animation/BgParticles';

const ProfileCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 1rem;
	background: var(--card-background);
	flex-wrap: nowrap;
	border-radius: 1rem;
	justify-content: flex-start;
	overflow: hidden;
	padding: 1.875rem 1.25rem;
	position: relative;
	box-shadow: 0rem 0rem 1.25rem rgba(143, 143, 143, 0.2);
	max-width: 400px;
	isolation: isolate;

	${media.desktop`
		padding: 1.875rem 1.25rem;
	`}
`;

const ProfileImage = styled.div`
	// box-shadow: 00rem 0rem 1rem 0rem #6565652b;
	max-width: 16.25rem;
	border-radius: 0.75rem;
	order: 0;
	width: 100%;
	overflow: hidden;
	margin-bottom: 1.5rem;
	position: relative;
	// border-radius: inherit;
	aspect-ratio: 4/5;
	${media.xs`
		max-width: 10rem;
	`}
	img {
		width: 100%;
		height: 100%;
		object-position: top;
		object-fit: cover;
	}

	&::after,
	&:focus-within {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	${media.desktop`
			max-width: 10.25rem;
	`}
`;

const Name = styled.h1`
	font-size: 2rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
	color: var(--text-color);

	${media.desktop`
		// font-size: 2.5rem;
	`}
`;

const Title = styled.p`
	font-size: 1rem;
	color: var(--text-secondary);
	margin-bottom: 0.5rem;

	${media.desktop`
		// font-size: 1.1rem;
	`}
`;

const Location = styled.p`
	font-size: 0.9rem;
	color: var(--text-secondary);
	margin-bottom: 1.5rem;

	${media.desktop`
		// font-size: 1rem;
	`}
`;

const SocialLinks = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 0.5rem;
`;

const SocialIcon = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 0.5rem;
	background-color: var(--background-color);
	color: var(--text-color);
	margin: 0 0.5rem;
	transition: all 0.3s ease;
	font-size: 1.2rem;

	&:hover {
		background-color: var(--primary-color);
		color: white;
		transform: translateY(-0.25rem);
	}
`;

const CTAButton = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	padding: 0.75rem 2rem;
	background: var(--cta-button);
	color: white;
	border-radius: 3.125rem;
	font-weight: 600;
	transition: all 0.3s ease;
	text-decoration: none;
	margin-top: 1rem;
	position: relative;

	&::after,
	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: conic-gradient(
			from var(--angle),
			transparent 70%,
			rgba(var(--primary-color-rgb), 0.8)
		);
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		padding: 2px;
		border-radius: 3.125rem;
		animation: 3s rotateRing linear infinite;
		z-index: -1;
		pointer-events: none;
		opacity: 1;
		transition: opacity 1s ease, visibility 1s ease;
	}

	&::before {
		filter: blur(1.5rem);
		opacity: 0.6;
	}

	@keyframes rotateRing {
		from {
			--angle: 0deg;
		}
		to {
			--angle: 360deg;
		}
	}

	&:hover {
		transform: translateY(-0.25rem);
		box-shadow: 0 0.25rem 0.9375rem rgba(var(--primary-color-rgb), 0.4);
		opacity: 0.9;
		text-decoration: none;
		color: #ffffff;
	}

	&:hover::after,
	&:hover::before {
		opacity: 0;
		visibility: hidden;
		animation-play-state: paused;
	}

	${media.desktop`
		box-shadow: 0 .25rem .9375rem rgba(0, 0, 0, 0.4);
	`}
`;

const Stats = styled.div`
	display: none;

	${media.desktop`
		display: flex;
		// justify-content: space-between;
		justify-content: center;
		width: 100%;
		margin-bottom: .75rem;
	`}
`;

const StatItem = styled.div`
	text-align: center;
`;

const StatNumber = styled.div`
	font-size: 2rem;
	font-weight: 700;
	color: var(--text-color);
`;

const StatLabel = styled.div`
	font-size: 0.75rem;
	color: var(--text-secondary);
	text-transform: uppercase;
	letter-spacing: 1px;
`;

const ProfileCard = () => {
	return (
		<ProfileCardContainer>
			<BgParticles
				type={'triangles'}
				containerId='profile-card-particles'
			/>
			<ProfileImage tabIndex='0'>
				<img
					src={profilePicture}
					alt='Lalith Avinash Donkina'
				/>
			</ProfileImage>
			<Name tabIndex='0'>Lalith Avinash Donkina</Name>
			{/* <Title>Full Stack Developer</Title> */}
			<Location tabIndex='0'>Maryland, USA</Location>
			<SocialLinks>
				<SocialIcon
					href='https://github.com/avinash987/'
					target='_blank'
					aria-label='Github'
					rel='noopener noreferrer'>
					<FaGithub />
				</SocialIcon>
				<SocialIcon
					href='https://www.linkedin.com/in/lalithavinashd/'
					target='_blank'
					aria-label='Linkedin'
					rel='noopener noreferrer'>
					<FaLinkedin />
				</SocialIcon>
				<SocialIcon
					href='mailto:lalithd1@umbc.edu'
					aria-label='mail'>
					<FaEnvelope />
				</SocialIcon>
			</SocialLinks>
			<Stats>
				<StatItem tabIndex='0'>
					<StatNumber>3+</StatNumber>
					<StatLabel>Years of Experience</StatLabel>
				</StatItem>
				{/* <StatItem>
					<StatNumber>+12</StatNumber>
					<StatLabel>Projects Completed</StatLabel>
				</StatItem>
				<StatItem>
					<StatNumber>+7</StatNumber>
					<StatLabel>Happy Clients</StatLabel>
				</StatItem> */}
			</Stats>
			<CTAButton
				id='talk'
				title='Open for technical discussions at your convenience – no pressure!'
				target='_blank'
				aria-label='Open for technical discussions at your convenience – no pressure!'
				href='https://calendly.com/lalithavinashdonkina/30min'>
				Let's Talk <FaCalendar />
			</CTAButton>
			<ResumeDownload />
		</ProfileCardContainer>
	);
};

export default ProfileCard;
