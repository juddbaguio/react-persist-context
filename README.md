# react-persist-context

Simple React state management library built on top of [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) and [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) with data persistence.

## Installation

```sh
npm i react-persist-context
```

## Usage

#### Initialization
Wrap the main entry file with **PersistentContextProvider**.
```javascript
import { PersistentContextProvider } from 'react-persist-context'
// code before returning...
return (
    <PersistentContextProvider store={store}>
        <EntryComponent {...props} />
    </PersistentContextProvider>
)
```

The **store** is an object value consisting of state and reducer (the same basic structure from [redux](https://redux.js.org/)).

```javascript
const store = {
    state: yourInitialState
    reducer: yourReducer
}
```

#### Accessing persisted context
After initializing your provider, you can now access the persisted context using ***usePersistedContext*** which returns { **state**, **dispatch** }

```javascript
// component who is accessing
import { usePersistedContext } from 'react-persist-context'

const CompononentWhoIsUsing = () => {
    const { state, dispatch } = usePersistedContext()
    /* rest of the code*/
    return (...)
}
```

## Persistence
The data persistence uses cookies and by default in session.

## License

ISC
