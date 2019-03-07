const initialStore = {
  user: undefined,
  isBusy: true,
  messages: [],
  chat: [],
};

export const rootReducer = (store = initialStore, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...store, messages: [action.message] };

    case 'DELETE_ALL_MESSAGES':
      return { ...store, messages: [] };

    case 'LOGIN':
    case 'UPDATE_USER':
      return { ...store, user: action.user, notificationsId: action.user.notificationsId, isBusy: false };

    case 'LOGOUT':
      return { ...store, user: null, isBusy: false };

    case 'SET_BUSY':
      return { ...store, isBusy: action.status };

    case 'SET_FAVOR':
      return { ...store, isBusy: false, favor: action.favor };

    case 'NEW_CHAT':
      return { ...store, chat: [...store.chat, action.chat] };

    case 'NEW_NOTIFICATION':
      return { ...store, user: { ...store.user, notificationsId: [...store.user.notificationsId, action.notification] } };

    case 'READ_CHAT':
      return { ...store, chat: store.chat.filter(c => c.authorId !== action.person) };

    case 'READ_NOTIFICATION':
      return { ...store, user: { ...store.user, notificationsId: store.user.notificationsId.map(not => (not._id === action.id ? { ...not, seen: true } : not)) } };

    default: return store;
  }
};
