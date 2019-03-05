
export const login = user => ({
  type: 'LOGIN',
  user,
});

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const errorMessageAction = message => ({
  type: 'ADD_MESSAGE',
  message,
});

export const clearMessages = () => ({
  type: 'DELETE_ALL_MESSAGES',
});

export const setBusy = status => ({
  type: 'SET_BUSY',
  status,
});

export const setFavor = favor => ({
  type: 'SET_FAVOR',
  favor,
});

export const newChat = chat => ({
  type: 'NEW_CHAT',
  chat,
});

export const newNotification = notification => ({
  type: 'NEW_NOTIFICATION',
  notification,
});

export const readChat = person => ({
  type: 'READ_CHAT',
  person,
});

export const readNotification = id => ({
  type: 'READ_NOTIFICATION',
  id,
});
