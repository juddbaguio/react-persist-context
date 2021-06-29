import Cookies from "universal-cookie"
import { StateType } from "../context/createStore"

export const cookies = new Cookies()

const persistData = (initialState: StateType) => {
    const persistedData = cookies.get('react-persisted-data') || null

    if (!persistedData) {
        cookies.set('react-persisted-data', initialState)
        return {
            ...initialState
        }
    }

    return persistedData
}

export default persistData