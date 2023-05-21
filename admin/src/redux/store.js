import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import userReducer from './userRedux'

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}
const rootReducer = combineReducers({
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

// The user is persisted in the localStorage because the user shouldn't log in again and again.
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store)