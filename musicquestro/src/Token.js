
export const token = localStorage.getItem("userLogged")? true : false;

export const userToken = JSON.parse(localStorage.getItem('userLogged'))


const currentUser = JSON.parse(localStorage.getItem('userLogged'))

export const userids = currentUser? currentUser.userids : null