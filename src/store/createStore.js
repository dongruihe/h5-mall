import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'

import createSagaMiddleware from 'redux-saga'
import rootSaga  from './sagas'

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  // const middlewares = [thunk];
  const middlewares = [];
  const sagaMiddleware = createSagaMiddleware();
  middlewares.push(sagaMiddleware);
  middlewares.push(thunk);

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  // const store = createReduxStore(
  //   makeRootReducer(),
  //   initialState,
  //   composeEnhancers(
  //     applyMiddleware(...middlewares),
  //     ...enhancers
  //   )
  // );
  const store = composeEnhancers(
    applyMiddleware(...middlewares),
    ...enhancers
  )(createReduxStore)(
    makeRootReducer(),
    initialState
  );

  store.asyncReducers = {};

  store.unsubscribeHistory = browserHistory.listen(updateLocation(store));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  sagaMiddleware.run(rootSaga);

  return store
};

export default createStore
