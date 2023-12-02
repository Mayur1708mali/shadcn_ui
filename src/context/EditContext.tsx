'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

type EditState = {
	edit: Recipe;
	setEdit(edit: Recipe): void;
};

export const EditContext = createContext<EditState | null>(null);

const useEdit = (): EditState => {
	const context = useContext(EditContext);

	if (!context) {
		throw new Error('Please use ThemeProvider in parent component');
	}

	return context;
};

export function EditProvider(props: PropsWithChildren) {
	const [edit, setEdit] = useState<Recipe>({
		title: '',
		image: '',
		time: 0,
		description: '',
		vegan: 'false',
		_id: '',
		__v: '',
	});

	return (
		<EditContext.Provider value={{ edit, setEdit }}>
			{props.children}
		</EditContext.Provider>
	);
}

export default useEdit;
