import React from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Weather from "../components/Weather";
import SkillList from "../components/SkillList";

const Home = ({ theme, setTheme }) => {
    return (
        <div className={`container-fluid ${theme}-mode`}>
            <br/>
            <div className="theme-switcher-container">
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
            <br/>
            <Weather /><br/>
            <SkillList />
        </div>
    );
};

export default Home;
