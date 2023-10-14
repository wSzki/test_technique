import React            from 'react'
import {createContext}  from 'react'
import {useContext}     from 'react'
import {useState}       from 'react'
import {ReactNode}      from 'react'
import {Dispatch}       from 'react'
import {SetStateAction} from 'react'
import Task             from '@/classes/Task'


interface TaskContextType {
	task_array               : Task[];
	task_component_array     : React.ReactNode[];
	set_task_array           : Dispatch<SetStateAction<Task[]>>;
	set_task_component_array : Dispatch<SetStateAction<React.ReactNode[]>>;
	popup                    : boolean;
	set_popup                : Dispatch<SetStateAction<boolean>>;
	save_trigger             : boolean;
	set_save_trigger         : Dispatch<SetStateAction<boolean>>;
	search				     : string;
	set_search			     : Dispatch<SetStateAction<string>>;
	save_success             : boolean;
	set_save_success         : Dispatch<SetStateAction<boolean>>;
	no_search_results        : boolean;
	set_no_search_results    : Dispatch<SetStateAction<boolean>>;
}


export const useTaskContext = () => {
	const context = useContext(TaskContext);
	if (!context) throw new Error('useTaskContext must be used within a TaskProvider');
	return context;
};

interface TaskProviderProps {
	children: ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
	const [task_array,           set_task_array]           = useState<Task[]>([]);
	const [task_component_array, set_task_component_array] = useState<React.ReactNode[]>([]);
	const [popup,                set_popup]                = useState(false);
	const [save_trigger,         set_save_trigger]         = useState(false);
	const [search,               set_search]               = useState("");
	const [save_success,         set_save_success]         = useState(false);
	const [no_search_results,    set_no_search_results]    = useState(false);

	return (
		<TaskContext.Provider value={{
			task_array,        task_component_array,
			set_task_array,    set_task_component_array,
			popup,             set_popup,
			save_trigger,      set_save_trigger,
			search,            set_search,
			save_success,      set_save_success,
			no_search_results, set_no_search_results
			}}
		>
			{children}
		</TaskContext.Provider>
	);
};

