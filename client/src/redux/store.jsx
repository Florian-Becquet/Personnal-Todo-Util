import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState } = createGlobalState({
    todos: '',
    loading: false,
    hours: '',
})

export { useGlobalState, setGlobalState}