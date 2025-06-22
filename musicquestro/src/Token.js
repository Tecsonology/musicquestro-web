
export const token = localStorage.getItem("userLogged")? true : false;

export const userToken = JSON.parse(localStorage.getItem('userLogged'))