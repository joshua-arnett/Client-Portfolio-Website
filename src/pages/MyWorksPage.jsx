import { projectData } from "../projectData";

export default function MyWorksPage() {
    return (
        <>
            <h1>My Works:</h1>
            <div className="project-collection">
                {projectData.map((project) => (
                    <div key={project.id} className="project">
                        <img src={project.image} alt={project.description}/>
                        <p>{project.name}</p>
                    </div>
                ))}
            </div>
        </>
    )
}