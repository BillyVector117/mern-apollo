import { ApolloServer } from '@apollo/server'
import express from 'express'
import { expressMiddleware } from "@apollo/server/express4"
import cors from 'cors'
import http from 'http'
export const startApolloServer = async (typeDefs, resolvers) => {
    const app = express()
    const httpServer = http.createServer(app) // Create a http server based into app (So it can join to Apollo)
    // Create Apollo server (define definitions and functions to execute (url and functions to dispatch))
    const server = new ApolloServer({
        typeDefs, // typeDefs: typeDefs
        resolvers // resolvers: resolvers
    })
    await server.start();
    // Use express middleware to use node with graphql
    app.use('/graphql', cors(), express.json(), expressMiddleware(server))
    // We can add here an API rest 

    await new Promise(resolve => httpServer.listen({ port: 3000 }, resolve)) // Initialize server
    console.log('Server running at Port 3000')
}