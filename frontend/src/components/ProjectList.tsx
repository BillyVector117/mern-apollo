import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../graphql/projects.js'
import ProjectCard from './ProjectCard.js'

export interface Project {
  __typename: string
  _id: string
  name: string
  description: string
  tasks: Task[]
}

export interface Task {
  __typename: string
  title: string
  _id: string
}
const ProjectList = () => {
  // Make request call with GraphQL
  const { loading, error, data }: { loading?: boolean, error?: any, data?: { projects: Project[] } } = useQuery(GET_PROJECTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <div className='card-container'>
      {
        data?.projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))
      }
    </div>
  )
}

export default ProjectList