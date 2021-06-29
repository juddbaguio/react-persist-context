import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import persistData, { cookies } from "../controllers/persistData";
import { StoreType } from "./createStore";

interface ProviderPropType {
    children: React.ReactNode;
    store: StoreType;
}

const ModifiedContext = createContext<any>(null)

export const usePersistedContext = () => useContext(ModifiedContext)


export const PersistContextProvider: React.FC<ProviderPropType> = ({ children, store = null }) => {
    const isMounted = useRef(false)
    const [state, dispatch] = useReducer(store?.reducer || (() => {}), store?.state || {}, persistData)

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = true
        } else {
            cookies.set('react-persisted-data', state)
        }
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