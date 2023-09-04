import { useMutation } from '@apollo/client'
import React from 'react'
import { DELETE_TASK, GET_PROJECT, GET_PROJECTS } from '../../graphql/projects'

const TaskCard = ({ task, index }: any) => {
  const [deleteTask, { data, loading, error }] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
    ]
  })
  const handleDeleteTask = async () => {
    await deleteTask({ variables: { taskID: task._id } })
  }
  return (
    <div className='task-card'>
      <h1>{"#" + index + " - " + task.title}</h1>
      <button className='delete-task' onClick={() => handleDeleteTask()}>X</button>
    </div>
  )
}

export default TaskCard