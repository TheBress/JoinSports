
export const setToken=(token)=> sessionStorage.setItem("token_JoinSports",token)

export const getToken=()=>{ return sessionStorage.getItem("token_JoinSports") }

export const removeToken=()=> sessionStorage.removeItem("token_JoinSports")


