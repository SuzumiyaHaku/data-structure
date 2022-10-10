import { createStore, combineReducers, compose, applyMiddleware, AnyAction, Store } from "redux";
import thunk from 'redux-thunk';
let initData: AnyAction = {
  type: 'COUNT_ADD',
  count: 1
}
const reducer = function (state: AnyAction = initData, action: AnyAction) {
  switch (action.type) {
    case "COUNT_ADD":
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}

const postReducer = function (state: AnyAction = { type: '', list: [{ title: 'wozaizheli' }] }, action: AnyAction) {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state, list: action.payload
      }
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  reducer,
  postReducer
})



let store: Store = createStore(
  rootReducers,
  compose(applyMiddleware(...[thunk]),
  window?.devToolsExtension?.() ?? ((f: any) => f))
)


const unsubscribe = store.subscribe(() => {
  
})

store.dispatch({
  type: 'COUNT_ADD',
  payload: []
})

store.dispatch({
  type: 'LOAD_POSTS',
  payload: []
})

const getListData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(function (response) {
        return response.json()
      })
      .then(function (res) {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })
}

store.dispatch<any>(async (dispatch: Function): Promise<AnyAction> => {
  const res = await getListData();
  return dispatch({ type: "LOAD_POSTS", payload: res });
})

unsubscribe()

export const mapStateToProps = (state: AnyAction) => {
  return {
    test: store.getState()
  }
}

export default store;