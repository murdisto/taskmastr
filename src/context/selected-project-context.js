import React, { createContext, useContext, useState } from 'react';

export const SelectedProjectContext = createContext();
export const SelectedProjectProvider = ({ children }) => {
	const [selectedProject, setSelectedProject] = useState('INBOX');
	console.log('Selected Project Provider called');
	return (
		<SelectedProjectContext.Provider
			value={{ selectedProject, setSelectedProject }}
		>
			{children}
		</SelectedProjectContext.Provider>
	);
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
