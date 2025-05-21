import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { KEYS } from "@/helpers/constants.helper";

// Store Reducers
import authReducer from "./slices/auth.slice";
import ninReducer from "./slices/nin.slice";
import studentReducer from "./slices/student.slice";
import uploadReducer from "./slices/upload.slice";
import permitSlice from "./slices/permit.slice";
import profileSlice from "./slices/profile.slice";
import passwordSlice from "./slices/password.slice";
import setupReducer from "./slices/setup.slice";

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: KEYS.REDUX_STORE,
  storage: storageSession,
  whitelist: ["setupStore"],
};

const rootReducer = combineReducers({
  authStore: authReducer,
  ninStore: ninReducer,
  student: studentReducer,
  uploadStore: uploadReducer,
  permitStore: permitSlice,
  profileStore: profileSlice,
  changePassword: passwordSlice,
  setupStore: setupReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
