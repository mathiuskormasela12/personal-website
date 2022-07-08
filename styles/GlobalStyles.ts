// ========== Global Styles
// import all modules
import { createGlobalStyle } from 'styled-components';
import { Fonts } from '../themes';

export const GlobalStyles = createGlobalStyle`
	@font-face {
		src: url('/fonts/Rubik-Regular.ttf') format('truetype');
		font-family: rubik; 
	}

	@font-face {
		src: url('/fonts/Rubik-Bold.ttf') format('truetype');
		font-family: rubik-bold; 
	}

	@font-face {
		src: url('/fonts/Rubik-Light.ttf') format('truetype');
		font-family: rubik-light; 
	}

	html {
		background-color: white;
		font-size: 16px;
		font-family: ${Fonts.base};
		scroll-behavior: smooth;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	h1 {
		font-size: 2.8rem;
	}

	h2 {
		font-size: 2.6rem;
	}

	h3 {
		font-size: 2.4rem;
	}

	h4 {
		font-size: 2.2rem;
	}

	h5 {
		font-size: 2rem;
	}

	h6 {
		font-size: 1.8rem;
	}

	input[type="password"]::-ms-reveal,
	input[type="password"]::-ms-clear {
		display: none;
	}
`;
