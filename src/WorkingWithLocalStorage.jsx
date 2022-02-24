export const getFromLocalStorage = key => 
{
    const value = localStorage.getItem(key)
    let todos = null; 
    try 
    {
      const parsedJSON = JSON.parse(value)
      if (Array.isArray(parsedJSON)) todos = parsedJSON
    } catch(e) { todos = [] }
    
    return todos
  }
  
  export const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))