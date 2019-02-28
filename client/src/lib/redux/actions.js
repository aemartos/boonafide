
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

export const setFavor = (favor) => {
  return {
    type: "SET_FAVOR",
    favor
  }
}

export const newChat = (chat) => {
  return {
    type: "NEW_CHAT",
    chat
  }
}

export const newNotification = (notification) => {
  return {
    type: "NEW_NOTIFICATION",
    notification
  }
}

export const readChat = (person) => {
  return {
    type: "READ_CHAT",
    person
  }
}
