import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import RootLayout from "./components/Layout/RootLayout.tsx";
import { store } from "./context/redux/store.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RootLayout>
        <App />
      </RootLayout>
    </Provider>
  </StrictMode>
);
