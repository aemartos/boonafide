const initialStore = {
	user: undefined,
	isBusy: true,
  messages:[]
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
			store = {...store, user: action.user, isBusy: false}
		break;

		case "LOGOUT":
			store = {...store, user: null, isBusy: false}
		break;
		case "SET_BUSY":
			store = {...store, isBusy: action.status}
			break;
		default: return store
	}
	return store
}
