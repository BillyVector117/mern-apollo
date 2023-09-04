import { gql } from "@apollo/client"

// This file will allow to normalize the endpoint request so user can get only the data defined here
// Basically we can just copy the queries/mutations from Apollo interface and paste here
export const GET_PROJECTS = gql`{
     projects {
    _id 
    name
    description
     tasks {
      title
      _id
    } 
  }
}`
export const GET_TASKS = gql` query tasks {
  _id
  title
  updatedAt
}`
export const GET_PROJECT = gql`query getProject($projectID: ID!){
  project(projectID: $projectID) {
    _id
    name
    description
    tasks {
      _id
      title
      updatedAt
    }
  }
}`
export const CREATE_PROJECTS = gql`mutation ($name: String, $description: String) {
  createProject(name: $name, description: $description) {
    _id
    name
    description
  }
}`
export const CREATE_TASK = gql`mutation createTask($title: String, $projectID: ID!) {
  createTask(title: $title, projectID: $projectID) {
    _id
    title
    updatedAt
  }
}`
export const DELETE_TASK = gql`mutation ($taskID: ID!) {
  deleteTask(taskID: $taskID) {
    _id
    title
    projectID
  }
}`
export const DELETE_PROJECT = gql`mutation ($projectID: ID!) {
  deleteProject(projectID: $projectID) {
    _id
    name
    description
  }
}`




