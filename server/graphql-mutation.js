import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Define schema with Book, Genre, Query, and Mutation, and BookInput for structured input
const typeDefs = `#graphql
  enum Genre {
    FICTION
    NON_FICTION
    SCIENCE_FICTION
    MYSTERY
    THRILLER
    FANTASY
  }

  type Book {
    title: String
    author: String
    genre: Genre
  }

  input BookInput {
    title: String!
    author: String!
    genre: Genre!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(input: BookInput!): Book
    updateBook(title: String!, author: String, genre: Genre): Book
    deleteBook(title: String!): Book
  }
`;

// Sample data
const books = [
  { title: 'The Awakening', author: 'Kate Chopin', genre: 'FICTION' },
  { title: 'City of Glass', author: 'Paul Auster', genre: 'MYSTERY' },
];

// Define resolvers with Query, Mutation, and custom error handling
const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    // Add a new book with BookInput type
    addBook: (_, { input }) => {
      const { title, author, genre } = input;
      if (books.find(book => book.title === title)) {
        throw new Error(`A book with the title "${title}" already exists.`);
      }
      const newBook = { title, author, genre };
      books.push(newBook);
      return newBook;
    },

    // Update an existing book's author or genre
    updateBook: (_, { title, author, genre }) => {
      const bookToUpdate = books.find(book => book.title === title);
      if (!bookToUpdate) {
        // Custom error if the book is not found
        const error = new Error(`Book with title "${title}" not found!`);
        error.extensions = { code: "NOT_FOUND", statusCode: 404 };
        throw error;
      }
      if (author) bookToUpdate.author = author;
      if (genre) bookToUpdate.genre = genre;
      return bookToUpdate;
    },

    // Delete a book by title
    deleteBook: (_, { title }) => {
      const bookIndex = books.findIndex(book => book.title === title);
      if (bookIndex === -1) {
        throw new Error(`Cannot delete: No book found with the title "${title}".`);
      }
      return books.splice(bookIndex, 1)[0]; // Remove and return the deleted book
    }
  }
};

// Initialize the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
