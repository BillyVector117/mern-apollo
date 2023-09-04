import gql from "graphql-tag";

export const typeDefs = gql`
    
    type Query {
        hello: String
        projects: [Project]
        project(projectID: ID!): Project
        task(taskID: ID!): Task
        tasks: [Task]
    }
   
    type Mutation {
        createProject(name: String, description: String): Project
        createTask(title: String, projectID: ID!): Task
        deleteProject(projectID: ID!): Project
        deleteTask(taskID: ID!): Task
        updateProject(projectID: ID!, name: String!, description: String): Project
        updateTask(taskID: ID!, title: String!, projectID: ID!): Task
    }
    type Project {
        _id: ID 
        name: String
        description: String
        createdAt: String 
        updatedAt: String
        tasks: [Task]
    }
    type Task {
        _id: ID 
        title: String
        projectID: ID
        createdAt: String 
        updatedAt: String 
        project: Project
    }
`