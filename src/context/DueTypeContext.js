import {createContext, useReducer} from "react";
import DueTypeReducer from "./DueTypeReducer";

const INITIAL_STATE = {
    currentDueType:"today"
}

export const DueTypeContext = createContext(INITIAL_STATE);

export const DueTypeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(DueTypeReducer, INITIAL_STATE);

    return (
        <DueTypeContext.Provider value={{currentDueType: state.currentDueType, dispatch}}>
            {children}
        </DueTypeContext.Provider>
    )
}