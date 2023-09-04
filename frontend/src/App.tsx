import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'

function App() {
  // Intance Apollo client (as React context) so all App will be able to interact with backend
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="container">
          <Routes >
            <Route path='/' element={<Navigate to="/projects" />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:id' element={<ProjectDetails />} />
          </Routes>
        </div>
      </BrowserRouter>

    </ApolloProvider>
  )
}

export default App

