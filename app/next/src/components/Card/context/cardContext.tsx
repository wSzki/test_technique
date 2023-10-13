import React, { createContext, useReducer, useContext, useState } from 'react';

export const cardContext:any = createContext({});

export const CardContextProvider = ({children, task}:any) => {
	const [title,       set_title]       = useState(task?task.title:"");
	const [description, set_description] = useState(task?task.description:"");
	const [form_error,  set_form_error]  = useState(false);
	const [edit,  set_edit]  = useState(false);

	return (
		<cardContext.Provider
			value={{
				title, set_title,
				description, set_description,
				form_error, set_form_error,
				edit, set_edit
			}}>
			{children}
		</cardContext.Provider>
	);
};



export const useCardContext : any= () => {
	const context = useContext(cardContext);
	if (!context) {
		throw new Error('Card context error');
	}
	return context;
};

