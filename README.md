
# GraphQL Server Setup

This guide will walk you through setting up a GraphQL server with Node.js and Apollo Server. You'll also learn how to access the server using Apollo Playground.

## Prerequisites

1. **Node.js and npm**  
   Ensure that **Node.js** and **npm** (Node Package Manager) are installed on your computer. You can download and install them from the [Node.js official website](https://nodejs.org/).  
   - After installation, verify the installation by running:
     ```bash
     node -v
     npm -v
     ```

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-repository-name>
```

### 2. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Create a GraphQL Server

Create an `index.js` file in the root directory and add the following code:

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Sample type definitions and resolver for demonstration
const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(\`🚀 Server ready at \${url}\`);
});
```

### 4. Run the GraphQL Server

To start the server, use the following command:

```bash
node index.js
```

### 5. Access Apollo Playground

Once the server is running, Apollo Playground should be accessible at `http://localhost:4000` by default.

## Commands

- **Install Dependencies:** `npm install`
- **Start the Server:** `node index.js`

---

This README provides all necessary steps to set up and run a simple GraphQL server using Node.js and Apollo Server.
