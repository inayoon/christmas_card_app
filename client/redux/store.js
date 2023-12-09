import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import cardReducer from "./card/cardSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //when using local storage

//create root reducer using combineReducers. Here ! userReducer is stored as a key which is a user
const rootReducer = combineReducers({
  user: userReducer,
  card: cardReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//create new reducer applying the persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
