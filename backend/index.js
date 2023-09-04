import { startApolloServer } from "./app.js"
import { connectToDB } from "./db.js"
import { resolvers } from "./graphql/resolvers.js"
import { typeDefs } from "./graphql/typeDefs.js"

// First run DB then Apollo Server
connectToDB()
startApolloServer(typeDefs, resolvers)