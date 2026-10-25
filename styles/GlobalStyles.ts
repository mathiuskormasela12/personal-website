// ========== Global Styles
// import all modules
import { createGlobalStyle } from 'styled-components';
import { DARK_TOKENS, Fonts, LIGHT_TOKENS } from '../themes';

const toCssVariables = (tokens: typeof LIGHT_TOKENS) =>
  Object.entries(tokens)
    .map(
      ([name, value]) =>
        `--color-${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`,
    )
    .join('');

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

	:root {
		${toCssVariables(LIGHT_TOKENS)}
		color-scheme: light;
	}

	[data-theme="dark"] {
		${toCssVariables(DARK_TOKENS)}
		color-scheme: dark;
	}

	html,
	body {
		background-color: var(--color-background);
		color: var(--color-dark);
	}

	html {
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

	.swal2-popup {
		background-color: var(--color-surface);
		border: 1px solid var(--color-line);
		border-radius: 1.2rem;
	}

	.swal2-title {
		color: var(--color-dark);
		font-weight: normal;
	}

	.swal2-html-container {
		color: var(--color-light);
	}

	@media (max-height: 500px) and (orientation: landscape) {
		.swal2-container .swal2-icon {
			font-size: 0.55rem;
			margin: 0.8rem auto 0.2rem;
		}

		.swal2-container .swal2-title {
			font-size: 1.4rem;
			padding-top: 0.4rem;
		}

		.swal2-container .swal2-html-container {
			margin: 0.6rem 1.2rem 0.2rem;
		}

		.swal2-container .swal2-actions {
			margin-top: 0.8rem;
		}

		.swal2-container .swal2-popup {
			padding-bottom: 0.8rem;
		}
	}

	input[type="password"]::-ms-reveal,
	input[type="password"]::-ms-clear {
		display: none;
	}
`;
