import React           from 'react';
import {createContext} from 'react';
import {useContext}    from 'react';
import {useState}      from 'react';

export const cardContext:any = createContext({});

export const CardContextProvider = ({children, task, invert_edit_logic}:any) => {
	const [title,          set_title]          = useState(task?task.title:"");
	const [description,    set_description]    = useState(task?task.description:"");
	const [form_error,     set_form_error]     = useState(false);
	const [edit,           set_edit]           = useState(invert_edit_logic?true:false);
	const [cancel_trigger, set_cancel_trigger] = useState(false);
	const [save_trigger,   set_save_trigger]   = useState(false);
	const [completed,      set_completed]      = useState(task?task.completed:false);

	return (
		<cardContext.Provider
			value={{
				title,          set_title,
				description,    set_description,
				form_error,     set_form_error,
				edit,           set_edit,
				cancel_trigger, set_cancel_trigger,
				save_trigger,   set_save_trigger,
				completed,      set_completed
			}}>
			{children}
		</cardContext.Provider>
	);
};



export const useCardContext : any = () => {
	const context = useContext(cardContext);
	if (!context) {
		throw new Error('Card context error');
	}
	return context;
};

