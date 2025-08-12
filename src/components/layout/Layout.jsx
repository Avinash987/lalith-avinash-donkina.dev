import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../navbar/Navbar';
import ProfileCard from '../profile/ProfileCard';
import { media, breakpoints } from '../../styles/Responsive';

const LayoutContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	min-height: 100dvh;
	background-color: var(--background-color);
	color: var(--text-color);
	transition: background-color 0.3s ease, color 0.3s ease;

	${media.desktop`
		flex-direction: row;
	`}
	${media.mobile`
		align-self:center;
	`}
`;

const LeftSection = styled.div`
	position: relative;
	width: 100%;
	max-width: 450px;
	padding: 1rem;

	${media.tablet`
		align-self:center;
		`}
	${media.md`
			align-self:center;
  	`}
	${media.desktop`
		position: fixed;
		min-width: 350px;
		// height: 100vh;
		flex-basis: 30%;
		max-width: 30%;
		overflow-y: auto;
		padding: 2rem;
		// transform: scale(0.8);
		// top:-5.375rem;
  	`}
`;

const RightSection = styled.div`
	width: 100%;
	padding: 1rem;

	${media.desktop`
		flex-basis: 70%;
		margin-left: 30%;
		max-width: 70%;
		padding: 2rem;
	`}
`;

const MobileNavbarContainer = styled.div`
	display: block;
	position: sticky;
	top: 0;
	z-index: 100;
	${media.desktop`
    display: none;
  `}
`;

const DesktopNavbarContainer = styled.div`
	display: none;

	${media.desktop`
    display: flex;
	align-items: center;
	justify-content: center;
    margin-bottom: 2rem;
  `}
`;

const Layout = ({ children }) => {
	const [isMobile, setIsMobile] = useState(
		window.innerWidth < parseInt(breakpoints.lg)
	);

	const isProjectDetailPage =
		location.pathname.startsWith('/lalith-avinash-donkina.dev/') &&
		location.pathname !== '/lalith-avinash-donkina.dev' &&
		location.pathname !== '/lalith-avinash-donkina.dev/' &&
		location.hash === '';

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < parseInt(breakpoints.lg));
		};
		handleResize()
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const showProfile = !(isProjectDetailPage && isMobile);

	return (
		<LayoutContainer>
			{isMobile && (
				<MobileNavbarContainer>
					<Navbar isMobile={isMobile} />
				</MobileNavbarContainer>
			)}

			{showProfile && (
				<LeftSection>
					<ProfileCard />
				</LeftSection>
			)}

			<RightSection>
				{!isMobile && (
					<DesktopNavbarContainer>
						<Navbar isMobile={isMobile} />
					</DesktopNavbarContainer>
				)}
				{children}
			</RightSection>
		</LayoutContainer>
	);

	//future todo

	// return (
	// 	<LayoutContainer>
	// 		<DesktopNavbarContainer >
	// 			<Navbar isMobile={isMobile}>
	// 				<LeftSection>
	// 					<ProfileCard />
	// 				</LeftSection>
	// 				<RightSection>{children}</RightSection>
	// 			</Navbar>
	// 		</DesktopNavbarContainer>
	// 	</LayoutContainer>
	// );
};

export default Layout;
