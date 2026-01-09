import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {
    Landing,
    Chat,
    Profile,
    NotFound,
    Register,
    Login,
} from "./pages/index.js";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router";
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);
createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
