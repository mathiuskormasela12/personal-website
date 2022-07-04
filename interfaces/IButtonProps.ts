// ========== IButtonProps
// import all modules
import React from 'react';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	rounded?: boolean;
	size: 'lg' | 'md' | 'sm';
	fluid?: boolean;
}
