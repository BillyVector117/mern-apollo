import Project from "../models/Project.js"
import Task from "../models/Task.js"

export const resolvers = {
    Query: {
        hello: () => "Hello world!!",
        projects: async () => await Project.find(),
        project: async (_, { projectID }) => await Project.findById(projectID),
        tasks: async () => await Task.find(),
        task: async (_, { taskID }) => await Task.findById(taskID),
    },
    Mutation: {
        createProject: async (_, { name, description } /* = "args" */) => {
            // args acts like req.body from API rest (we can use destructuring)
            const project = new Project({
                name, description
            })
            const savedProject = await project.save() // save() records the doc into DB and returns _id
            return savedProject
        },
        createTask: async (_, { title, projectID }) => {
            const foundProject = await Project.findById(projectID)
            if (!foundProject) throw new Error('Project not found') // GraphQL error (404)
            const task = new Task({
                title, projectID
            })
            const savedTask = await task.save()
            return savedTask
        },
        deleteProject: async (_, { projectID }) => {

            const foundAndDeletedProject = await Project.findByIdAndDelete(projectID)
            if (!foundAndDeletedProject) throw new Error("Project not found");
            // Remove all tasks related to this project
            await
                Task.deleteMany({ projectID: foundAndDeletedProject._id })
            return foundAndDeletedProject
        },
        deleteTask: async (_, { taskID }) => {

            const foundAndDeletedTask = await Task.findByIdAndDelete(taskID)
            if (!foundAndDeletedTask) throw new Error("Task not found");
            return foundAndDeletedTask
        },
        updateProject: async (_, args) => {
            // new: true allows to return the updated object instead of the previous object
            const foundProject = await Project.findByIdAndUpdate(args.projectID, args, { new: true })
            if (!foundProject) throw new Error("Project not found");
            return foundProject
        },
        updateTask: async (_, { taskID, title, projectID }) => {
            const foundTask = await Task.findByIdAndUpdate(taskID, { title, taskID, projectID }, { new: true })
            if (!foundTask) throw new Error("Task not found");
            return foundTask
        }
    },

    // The "tasks" property from "Project" type will make a new DB call to populate the prop 
    Project: {
        /* parent = "_," in this case returns the parent Project */
        tasks: async (parent) => await Task.find({ projectID: parent._id }),
    },
    Task: {
        project: async (parent) => await Project.findById(parent.projectID),
    }
}