import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Define the schema with nested types and a fragment
const typeDefs = `#graphql
  type Author {
    name: String
    age: Int
    books: [Book]
  }

  type Book {
    title: String
    author: Author
    genre: Genre
  }

  enum Genre {
    FICTION
    NON_FICTION
    MYSTERY
    FANTASY
    SCIENCE_FICTION
  }

  type Query {
    books: [Book]
    authors: [Author]
    author(name: String!): Author
  }
`;

// Sample data with nested relationships
const authors = [
  { name: 'Kate Chopin', age: 50, books: ['The Awakening'] },
  { name: 'Paul Auster', age: 73, books: ['City of Glass'] },
];

const books = [
  { title: 'The Awakening', author: 'Kate Chopin', genre: 'FICTION' },
  { title: 'City of Glass', author: 'Paul Auster', genre: 'MYSTERY' },
];

// Define resolvers with nested query handling
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    author: (_, { name }) => authors.find(author => author.name === name),
  },
  Book: {
    author: (book) => authors.find(author => author.name === book.author),
  },
  Author: {
    books: (author) => books.filter(book => book.author === author.name),
  },
};

// Initialize the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);