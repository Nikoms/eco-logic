import { combineReducers, createStore } from 'redux';
import { travelFactory } from '../interface-adapter';
import { travelReducer } from './traveling/store/traveling/travelReducer';

export const rootReducer = combineReducers({
  travel: travelReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore() {
  const store = createStore(rootReducer);
  travelFactory.viewModel.onChange((payload: any, type: any) => store.dispatch({ type, payload }));

  return store;
}
