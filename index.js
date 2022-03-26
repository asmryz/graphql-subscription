const express = require('express');
const { createServer } = require('http')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

//const MONGODB_URI = "mongodb+srv://dbUser:dbUser@cluster0.enbv6.mongodb.net/Messenger?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb://localhost:27017/Messenger";


    (async function () {
            const app = express();
            const httpServer = createServer(app);

            const schema = makeExecutableSchema({
                typeDefs,
                resolvers
            });

            const subscriptionServer = new SubscriptionServer(
                { schema, execute, subscribe },
                { server: httpServer, path: '/graphql' }
            );

            const server = new ApolloServer({
                schema,
                plugins: [
                    {
                        async serverWillStart() {
                            return {
                                async drainServer() {
                                    subscriptionServer.close();
                                }
                            };
                        }
                    }
                ]
            });

            await server.start();
            server.applyMiddleware({ app });
            mongoose.connect(MONGODB_URI);

            const PORT = 4000;
            httpServer.listen(PORT, () => {
                console.log(`Server is runnong on http://localhost:4000/graphql`);
            });
        })();