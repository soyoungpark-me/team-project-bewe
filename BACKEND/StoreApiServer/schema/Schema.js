const { makeExecutableSchema } = require('graphql-tools');
const storeModel = require('../models/StoreModel');

const lists = async() => {
  const result = await storeModel.listAll();
  console.log('result: ',result);
  return result
};


// Some fake data
const books = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's stone",
  },
  {
    id:2,
    title: 'Jurassic Park',
  },
];

const authors = [
  { id: 1, first: 'han', last: 'manhyuk'},
  { id: 2, first: 'aa', last: 'bb'}
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];


// The GraphQL schema in string form
const typeDefs = `
  type Query {  
    lists: [List]
  }
  
  type List {
    idx: Int!
    title: String
    genre: String
    description: String
    urls:String
    created_at: String
    
  }
  
`;

// The resolvers
const resolvers = {
  Query: {
    lists: async() => {
      const result = await storeModel.listAll();
      return result;
    },
  },


};

// Put together a schema
exports.schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
