import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.scss";

window.React = React

createRoot(
    document.getElementById("app")
).render(
    <App />
)


