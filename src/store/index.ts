import { createStore, combineReducers } from 'redux';

import coins from './reducers/coins.reducer';
import drawerAnalysisPdf from './reducers/drawerAnalysisPdf.reducer';
import drawerTitle from './reducers/drawerTitle.reducer';
import drawerNavigation from './reducers/drawerNavigation.reducer';

const reducers = combineReducers({
    coins,
    drawerAnalysisPdf,
    drawerTitle,
    drawerNavigation
})

const store = createStore(reducers);

export default store;