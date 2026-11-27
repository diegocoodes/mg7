import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import './tailwind.css';
import "./styles.css";
import "./reviews.css";
import "./video.css";
import './ink.css';
import './hero-video.css';
import './motion.css';
import './site-intro.css';

const root = document.getElementById("root");
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
