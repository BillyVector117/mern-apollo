import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project }: any) => {
    const navigate = useNavigate()
    return (
        <div className='card' onClick={() => navigate(`/projects/${project._id}`)}>
            <h2>{project.name} </h2>
            <p>{project.description}</p>
        </div>
    )
}

export default ProjectCard