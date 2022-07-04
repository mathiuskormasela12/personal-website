// ========== IContainerProps
// import all modules
import React from 'react';

export interface IContainerProps {
	children: React.ReactNode;
	fluid?: boolean;
	inheritHeight?: boolean;
	customSize?: {
		value: number;
	};
}
