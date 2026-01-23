import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
                <Route path="/projects" element={<ProjectsPage theme={theme} setTheme={setTheme} />} />
            </Routes>
        </Router>
    );
}

export default App;

