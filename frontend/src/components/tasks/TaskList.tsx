import React from 'react'
import TaskCard from './TaskCard'

const TaskList = ({tasks}: any)  => {
  return (
    <>
        {
            tasks.map((task: { _id: React.Key | null | undefined }, index: number) => (
                <TaskCard index={index} key={task._id} task={task} />
            ))
        }
    </>
  )
}

export default TaskList