import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import "./Styles/style.scss";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./modules/item";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: combineReducers({ item: itemReducer }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <Provider store={store}>
      <App />
    </Provider>
  </RecoilRoot>

  // </React.StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
