import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books(keyword: String!): [Book]  # required parameter
  }
`;

const books = [
  { title: 'The Awakening', author: 'Kate of Chopin' },
  { title: 'City of Glass', author: 'Paul Auster' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

const resolvers = {
  Query: {
    books: (_, { keyword }) => {
      if (keyword) {
        // Filter books that contain the provided substring in their title
        return books.filter(book => 
            book.title.toLowerCase().includes(keyword.toLowerCase()) ||
            book.author.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      return books;  // Return all books if title is not provided
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀  Server ready at: ${url}`);
