import React from 'react'
import NewProjectForm from '../components/NewProjectForm'
import ProjectList from '../components/ProjectList'

const Projects = () => {

    return (
        <>
            <div className="projects-container">
                <NewProjectForm />
                <ProjectList />
            </div>
        </>
    )
}

export default Projects