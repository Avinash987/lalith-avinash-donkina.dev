import React, { useMemo } from 'react';
import styled from 'styled-components';
import {
	FaCode,
	FaServer,
	FaUser,
	FaDatabase,
	FaBrain,
	FaChartLine,
} from 'react-icons/fa';

const AboutContainer = styled.div`
	margin-bottom: 3rem;
`;

const AboutTitle = styled.h2`
	font-size: 2rem;
	margin-bottom: 1.5rem;
	color: var(--text-color);
	position: relative;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	svg {
		font-size: 1rem;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -0.625rem;
		left: 0;
		width: 10rem;
		height: 0.1875rem;
		background: linear-gradient(
			90deg,
			var(--primary-color) 0%,
			var(--card-background, #6d9fff) 100%
		);
	}
`;

const AboutContent = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	gap: 2rem;

	@media (min-width: 48rem) {
		grid-template-columns: 1fr;
	}
`;

const AboutText = styled.div`
	color: var(--text-color);

	ul li {
		margin: 0rem 0rem 1rem 1.5rem;
		color: var(--text-secondary);
		line-height: 1.8;
		font-size: 1.15rem;
		// list-style: none;
	}
`;

const AboutServices = styled.div`
	display: grid;
	gap: 1.5rem;
	justify-content: center;
	grid-template-columns: 1fr;
	z-index: 1;
	@media (min-width: 36rem) {
		grid-template-columns: repeat(2, minmax(300px, 380px));
	}
`;
// grid-template-columns: repeat(2, minmax(300px, 1fr));
// grid-template-columns: 1fr;

const ServiceCard = styled.div`
	background-color: var(--card-background);
	border-radius: var(--border-radius);
	padding: 1.5rem;
	box-shadow: var(--card-shadow);
	transition: var(--transition);

	&:hover {
		transform: translateY(-0.3125rem);
		box-shadow: 0 0.625rem 1.875rem rgba(0, 0, 0, 0.2);
	}
`;
const HeroTitle = styled.h2`
	font-size: 3rem;
	font-weight: 700;
	margin-top: 1rem;
	color: var(--text-color);

	span {
		color: var(--primary-color);
	}

	@media (min-width: 48rem) {
		font-size: 4rem;
	}
`;
const ServiceIcon = styled.div`
	width: 3.125rem;
	height: 3.125rem;
	border-radius: 50%;
	background-color: var(--primary-color);
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	color: white;
	font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
	font-size: 1.25rem;
	margin-bottom: 0.5rem;
	color: var(--text-color);
`;

const ServiceDescription = styled.p`
	color: var(--text-secondary);
	margin-bottom: 0;
`;

const About = () => {
	const services = useMemo(
		() => [
			{
				title: 'Backend Development',
				description:
					'Building robust server-side applications with Java, Spring Boot, RESTful APIs, and microservices.',
				icon: <FaServer />,
			},
			{
				title: 'Frontend Development',
				description:
					'Creating responsive and interactive user interfaces using React, Redux, and modern CSS frameworks.',
				icon: <FaCode />,
			},
			
			{
				title: 'Database Design',
				description:
					'Designing and optimizing databases using MySQL, MongoDB, and implementing efficient data access patterns.',
				icon: <FaDatabase />,
			},
			
			{
				title: 'Machine Learning',
				description:
					'Building machine learning models using Python, TensorFlow, and scikit-learn.',
				icon: <FaBrain />,
			},
			{
				title: 'Data Science',
				description:
					'Building data science models using Python, Pandas, and scikit-learn.',
				icon: <FaChartLine />,
			},
		],
		[]
	);

	return (
		<AboutContainer id='about'>
			<AboutTitle tabIndex='0'>
				About Me{' '}
				<FaUser
					aria-label='About icon'
					title='About icon'
				/>{' '}
			</AboutTitle>
			<AboutContent>
				<AboutText>
					<ul>
						<li>
							{/* <strong>Frontend-focused Full Stack Dev</strong>
							(React + Java Spring Boot)
							• Led frontend development for enterprise applications with 10,000+ daily users
							• Reduced load times by 40% through frontend optimization techniques
							• Contributed to open-source accessibility projects with 500+ GitHub stars*/}
							<strong>
								Full Stack Developer
							</strong>{' '}
							with <strong>3+ years</strong> of expertise in
							Java, Python, Spring Boot, and React
						</li>
						<li>
							Deeply invested with{' '}
							<strong>scalable architecture </strong>
							and <strong>high-performance UIs</strong>
						</li>
						<li>
							Driven to make tech{' '}
							<strong>accessible, inclusive,</strong> and
							enjoyable for all
						</li>
						<li>
							Strong technical problem-solver with emphasis on{' '}
							<strong>maintainable, future-proof code </strong>
							solutions
						</li>
						<li>
							<strong>0 → 1</strong> bringing ideas to life from
							scratch
						</li>
					</ul>
				</AboutText>
				<AboutServices>
					<HeroTitle tabIndex='0'>
						What I <span>Bring</span> to the Table
					</HeroTitle>
					{services.map((service, index) => (
						<ServiceCard
							tabIndex='0'
							key={index}>
							<ServiceIcon>{service.icon}</ServiceIcon>
							<ServiceTitle>{service.title}</ServiceTitle>
							<ServiceDescription>
								{service.description}
							</ServiceDescription>
						</ServiceCard>
					))}
				</AboutServices>
			</AboutContent>
		</AboutContainer>
	);
};

export default About;
