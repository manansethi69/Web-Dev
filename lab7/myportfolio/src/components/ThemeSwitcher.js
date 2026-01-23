import React from "react";

const ThemeSwitcher = ({ theme, setTheme }) => {
    if (!setTheme) {
        console.error("setTheme function is missing. Ensure it's passed from App.js!");
        return null;
    }

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="text-center">
            <button onClick={toggleTheme} className="btn btn-primary mode-toggle">
                Current Mode: {theme === "light" ? "Light" : "Dark"}
            </button>
        </div>
    );
};

export default ThemeSwitcher;



