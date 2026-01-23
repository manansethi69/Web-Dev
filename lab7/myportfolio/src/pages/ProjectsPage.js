import ThemeSwitcher from "../components/ThemeSwitcher";
import Projects from "../components/Projects";

const ProjectsPage = ({ theme, setTheme }) => {
    return (
        <div className={`container-fluid ${theme}-mode`}>
            <ThemeSwitcher theme={theme} setTheme={setTheme} /><br/>

            <h2 className="projects-title">My Projects</h2>

            <Projects/>
        </div>
    );
};

export default ProjectsPage;
