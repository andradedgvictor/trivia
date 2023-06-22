import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, composeWithDevTools(middlewares));

if (window.Cypress) {
  window.store = store;
}

export default store;
