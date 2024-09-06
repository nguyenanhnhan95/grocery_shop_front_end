import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { actionReducerStore } from "../utils/commonConstants";
import { profileSlice } from "../redux/slice/person/profile";
import { notificationModalSlice } from "../redux/slice/modal/notificationModal";
import { queryParameterSlice } from "../redux/slice/common/queryParameter";
import { loadingBarTopSlice } from "../redux/slice/layout/loadingBarTop";
export const staticReducers = {
    profile: profileSlice.reducer,
    notificationModal:notificationModalSlice.reducer,
    queryParameter:queryParameterSlice.reducer,
    loadingBarTop:loadingBarTopSlice.reducer
}
export function createReducerManager() {
    // Create an object which maps keys to reducers
    const reducers = { ...staticReducers }
    // Create the initial combinedReducer
    let combinedReducer = combineReducers(reducers)
    // An array which is used to delete state keys when reducers are removed
    let keysToRemove = []
    return {
        getReducerMap: () => reducers,

        // The root reducer function exposed by this object
        // This will be passed to the store
        reduce: (state, action) => {
            // If any reducers have been removed, clean up their state first
            if (keysToRemove.length > 0) {
                state = { ...state }

                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }

            // Delegate to the combined reducer
            return combinedReducer(state, action)
        },

        // Adds a new reducer with the specified key
        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return
            }

            // Add the reducer to the reducer mapping
            reducers[key] = reducer
            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        },

        // Removes a reducer with the specified key
        remove: key => {
            if (!key || !reducers[key]) {
                return
            }
            // Remove it from the reducer mapping
            delete reducers[key]

            // Add the key to the list of keys to clean up
            keysToRemove.push(key)

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        }
        , clear: () => {
            combinedReducer = combineReducers(staticReducers)
        }
    }
}
const reducerManager = createReducerManager()
export const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: () => new Tuple(...[thunk]),
    
})

store.asyncReducers = {};

store.injectReducer = (action, key, asyncReducer) => {
    switch (action) {
        case actionReducerStore.add:
            store.asyncReducers[key] = asyncReducer;
            reducerManager.add(key, asyncReducer);
            break;
        case actionReducerStore.remove:
            store.asyncReducers[key] = asyncReducer;
            reducerManager.remove(key, asyncReducer);
            break;
        case actionReducerStore.clear:
            reducerManager.clear()
            break;
        default:
            return;
    }
    store.replaceReducer(reducerManager.reduce);
};
export default store;