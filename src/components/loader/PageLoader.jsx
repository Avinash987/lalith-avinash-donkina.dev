import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1) rotate(10deg);
  }
  50% {
    transform: scale(1.1) rotate(-20deg);
  }
  100% {
    transform: scale(1) rotate(10deg);
  }
`;

const LoaderContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000000;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100001;
	opacity: 1;
	visibility: visible;
	animation: ${fadeOut} 0.5s ease-in-out forwards;
	animation-delay: 1s;
`;

const LogoContainer = styled.div`
	width: 7.5rem;
	height: 7.5rem;
	border-radius: 50%;
	background: var(--theme-gradient);
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${pulse} 2s infinite ease-in-out;
	box-shadow: 0 0 1.875rem ${'rgba(var(--primary-color-rgb), 0.3	)'};
`;

const InitialsText = styled.div`
	color: white;
	font-size: 2.5rem;
	font-weight: bold;
	letter-spacing: -1px;
`;

const PageLoader = () => {
	const [isVisible, setIsVisible] = useState(true);
	const { currentTheme } = useSelector((state) => state.theme);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 1500); // 3 seconds total (1s delay + 0.5s fade)

		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) return null;

	return (
		<LoaderContainer>
			<LogoContainer>
				<InitialsText>LD</InitialsText>
			</LogoContainer>
		</LoaderContainer>
	);
};

export default PageLoader;
