import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  :root {
    --primary-color: ${(props) => props.theme.primary};
    --gradient-color: ${(props) => props.theme?.gradient};
    --primary-color-rgb: ${(props) => {
		// Convert hex to rgb
		const hex = props.theme.primary.replace('#', '');
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return `${r}, ${g}, ${b}`;
	}};
    --background-color: ${(props) => props.theme.background};
    --card-background: ${(props) => props.theme.card};
    --text-color: ${(props) => props.theme.text};
    --text-secondary: ${(props) => props.theme.secondaryText};
    --border-radius: 1rem;
    --card-shadow: 0 .25rem 1.25rem rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
    --cta-button: linear-gradient(90deg, var(--primary-color) 0%, var(--gradient-color) 100%);
    --theme-gradient: linear-gradient(90deg, var(--primary-color) 0%, var(--gradient-color) 100%);
    }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
    background-color: var(--white);
    position: relative;
    background-image: linear-gradient(
      to right,
      rgba(128, 128, 128, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(
        to bottom,
        rgba(128, 128, 128, 0.1) 1px,
        transparent 1px
    );
    background-size: 24px 24px;
    animation: grid-move 3s linear infinite;
    z-index:10;
}

body:before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: linear-gradient(
      to right,
      rgba(128, 128, 128, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(
        to bottom,
        rgba(128, 128, 128, 0.1) 1px,
        transparent 1px
    );
    background-size: 24px 24px;
    animation: grid-move 3s linear infinite;
    mask: radial-gradient(circle at center, black 40%, transparent 90%);
	  -webkit-mask: radial-gradient(circle at center, black 40%, transparent 90%);
	pointer-events: none;
}

@keyframes grid-move {
	0% {
		background-position: 0 0;
	}

	to {
		background-position: 24px 0;
	}
}

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  section {
    margin-bottom: 3rem;
  }

  .container {
    width: 100%;
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -0.625rem;
      left: 0;
      width: 3.125rem;
      height: .1875rem;
      background-color: var(--primary-color);
    }
  }

  .card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    transition: var(--transition);
    
    &:hover {
      transform: translateY(-0.3125rem);
      box-shadow: 0 .625rem 1.875rem rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    .section-title {
      font-size: 1.75rem;
    }
  }
`;

export default GlobalStyles;
