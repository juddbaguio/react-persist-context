import React, { createContext, useContext, useEffect, useReducer } from "react";
import persistData, { cookies } from "../controllers/persistData";
import { StoreType } from "./createStore";

interface ProviderPropType {
    children: React.ReactNode;
    store: StoreType;
}

const ModifiedContext = createContext<any>(null)

export const usePersistedContext = () => useContext(ModifiedContext)


export const PersistContextProvider: React.FC<ProviderPropType> = ({ children, store = null }) => {
    const [state, dispatch] = useReducer(store?.reducer || (() => {}), store?.state || {}, persistData)

    useEffect(() => {
        if (JSON.stringify(state) === JSON.stringify(persistData(state))) {
            return () => {}
        }

        cookies.set('react-persisted-data', state)
        return () => {}
    }, [state])

    return (
        <ModifiedContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </ModifiedContext.Provider>
    )
}