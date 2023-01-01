import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux"
import userReducer from "./userRedux"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: "root",
    version: 1,
    storage,
}
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer)


// export const store = () => configureStore({
// ERROR : because store returns a configuredStore and in persistStore(store) the store is passed only but not invoked thus it won't run configureStore -> ERROR
export const store = configureStore({
    // reducer: {
    //     cart: cartReducer,
    //     user: persistedReducer,
    // },
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});

export let persistor = persistStore(store)
