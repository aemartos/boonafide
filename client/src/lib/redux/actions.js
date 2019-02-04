
export const login = (user) => {
  return {
    type: "LOGIN",
    user
  }
}

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    user
  }
}

export const logout = () => {
  return {
    type: "LOGOUT",
  }
}

export const errorMessageAction = (message) => {
  return {
    type: "ADD_MESSAGE",
    message
  }
}

export const clearMessages = () => {
  return {
    type: "DELETE_ALL_MESSAGES",
  }
}

export const setBusy = (status) => {
  return {
    type: "SET_BUSY",
    status
  }
}
