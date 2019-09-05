const expressGraphQL = require('express-graphql');
const express = require('express');
const schema = require('./schema.js');

const app = express();

app.use('/graphql',expressGraphQL({
    schema: schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('The server is running on port 4000. Everything is okey');
});