import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "../redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* Redux Persist의 PersistGate를 사용하여 지속성 스토어가 준비될 때까지 앱을 로딩하는 동안 표시할 내용을 지정합니다. */}
    <PersistGate persistor={persistor} loading={null} />
    <App />
  </Provider>
);
