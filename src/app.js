import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import cors  from 'cors'
import http from 'http'


export async function startApolloServer(typeDefs, resolvers){
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
          
      await server.start() 

      app.use('/graphql', cors(), express.json(), expressMiddleware(server)) 

      await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

      console.log(`🚀 Server ready at http://localhost:4000/`);
}