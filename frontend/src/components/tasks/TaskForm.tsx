import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_TASK, GET_TASKS } from '../../graphql/projects'
import { useParams } from 'react-router-dom'

const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
    })
    const params = useParams()
    const handleChange = (e: any) => {
        setTask({ ...task, [e.target.name]: e.target.value })
    }
    const [createTask, { data, loading, error }] = useMutation(CREATE_TASK, {
        refetchQueries: ['getProject'
        ]
    })
    const handleSubmit = async(e: any) => {
        e.preventDefault()
        await createTask({ variables: { title: task.title, projectID: params.id } })
        e.target.reset()
    }
    return (
        <form className='task-form' onSubmit={handleSubmit}>
            {
                error && <p>{error.message} </p>
            }
            <input className='input-text' type="text" name="title" placeholder='Title...' onChange={handleChange} />
            <button className='button-add' disabled={!task.title || loading}>Add</button>
        </form>
    )
}

export default TaskForm