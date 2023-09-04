import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_PROJECTS, GET_PROJECTS } from '../graphql/projects'

const NewProjectForm = () => {
  const [project, setProject] = useState({
    name: '',
    description: ''
  })
  const handleChange = (e: any) => {
    setProject({ ...project, [e.target.name]: e.target.value })
  }
  // After running createProject mutation, dispatch the GetProjects query to autorefresh data
  const [createProject, { loading, error }] = useMutation(CREATE_PROJECTS, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProjects"
    ]
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    createProject({ variables: { name: project.name, description: project.description } })
    e.target.reset()
  }

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      {
        error && <p>{error.message} </p>
      }
      <input className='input-text' placeholder='Project name...' type="text" name="name" onChange={handleChange} />
      <textarea className='text-area' name="description" id="desc" placeholder='Description...' onChange={handleChange}></textarea>
      <button className='button-styled' disabled={!project.name || !project.description || loading}>Save</button>

    </form>
  )
}

export default NewProjectForm