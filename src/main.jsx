import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
   
);
