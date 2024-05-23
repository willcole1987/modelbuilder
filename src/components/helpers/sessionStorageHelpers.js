// simple hooks for session storage:
export const getSessionItem = (itemName) => {
    return JSON.parse(sessionStorage.getItem(itemName))
}
    
export const setSessionItem = (itemName, Value) => {
    sessionStorage.setItem(itemName,JSON.stringify(Value))
}

export const clearAll = () => {sessionStorage.clear()}