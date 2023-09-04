import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DELETE_PROJECT, GET_PROJECT, GET_PROJECTS } from '../graphql/projects'
import TaskList from '../components/tasks/TaskList'
import TaskForm from '../components/tasks/TaskForm'

const ProjectDetails = () => {
  const params = useParams()
  const navigate = useNavigate();
  const { data, loading, error }: any = useQuery(GET_PROJECT, {
    variables: {
      projectID: params.id

    },
    //skip: !params.id,
  })
  const [deleteProject, { dataProject, loadingProject, errorProject }]: any = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
    ]
  })
  const handleDeleteProject = async () => {
    await deleteProject({ variables: { projectID: params.id } })
    return navigate('/')
  }
  if (loading) return (<p>Loading...</p>)
  if (error) return (<p>error</p>)
  return (
    <div className='project-details-container'>
      <div className="project-info">
        <h1>{data.project.name} </h1>
        <p>{data.project.description} </p>
        <button onClick={() => handleDeleteProject()}>Delete Project</button>

      </div>
      <TaskForm />

      <div className="task-list-container">
        <TaskList tasks={data.project.tasks} />

      </div>

    </div>
  )
}

export default ProjectDetails