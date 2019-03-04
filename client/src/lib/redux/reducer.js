const initialStore = {
	user: undefined,
	isBusy: true,
	messages:[],
	chat: []
}

export const rootReducer = (store = initialStore, action) => {
	switch(action.type){

		case "ADD_MESSAGE":
			store = {...store, messages: [action.message]}
		break;

		case "DELETE_ALL_MESSAGES":
			store = {...store, messages: []}
		break;

		case "LOGIN":
		case "UPDATE_USER":
			store = {...store, user: action.user, isBusy: false}
		break;

		case "LOGOUT":
			store = {...store, user: null, isBusy: false}
		break;

		case "SET_BUSY":
			store = {...store, isBusy: action.status}
			break;

		case "SET_FAVOR":
			store = {...store, isBusy: false, favor: action.favor}
			break;

		case 'NEW_CHAT':
			store = {...store, chat: [...store.chat, action.chat]}
			break;

		case 'NEW_NOTIFICATION':
			store = {...store, user: {...store.user, notificationsId: [...store.user.notificationsId, action.notification]}}
			break;

		case "READ_CHAT":
			store = {...store, chat: store.chat.filter(c => c.authorId !== action.person)};
			break;

		case 'READ_NOTIFICATION':
			store = {...store, user: {...store.user, notificationsId: store.user.notificationsId.map(not => not._id === action.id ? {...not, seen: true} : not)}};
			break;

		default: return store
	}
	return store
}
