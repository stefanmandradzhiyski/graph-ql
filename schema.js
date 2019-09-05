const axios = require('axios');

const {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');

//Hotel Customer Type schema
const hotelCustomerType = new GraphQLObjectType({
    name:'hotelCustomer',
    fields:() => ({
        id: {type:GraphQLInt},
        firstName: {type:GraphQLString},
        lastName: {type:GraphQLString},
        email: {type:GraphQLString},
        telephone: {type:GraphQLString},
        idCard: {type:GraphQLString}
    })
});

//Reading query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        //Retrieve specific data by id
        hotelCustomer: {
            type:hotelCustomerType,
            args:{
                id:{type:GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/hotelCustomers/' + args.id)
                    .then(res => res.data);
            }
        },
        //Retrieve the whole list
        hotelCustomers:{
            type: new GraphQLList(hotelCustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/hotelCustomers')
                .then(res => res.data);
            }
        }
    }
});

//Mutations (CRUD)
const mutation = new GraphQLObjectType({
    name:'mutation',
    fields:{
        //Create new traveler
        createHotelCustomer:{
            type:hotelCustomerType,
            args:{
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                telephone: {type: new GraphQLNonNull(GraphQLString)},
                idCard: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/hotelCustomers', {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    telephone: args.telephone,
                    idCard: args.idCard
                })
                .then(res => res.data);
            }
        },
        //Update specific traveler
        updateHotelCustomer:{
            type:hotelCustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLInt)},
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                email: {type: GraphQLString},
                telephone: {type: GraphQLString},
                idCard: {type: GraphQLString}
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/hotelCustomers/' + args.id,args)
                .then(res => res.data);
            }
        },
        //Delete specific traveler
        deleteHotelCustomer:{
            type:hotelCustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/hotelCustomers/' + args.id)
                .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});