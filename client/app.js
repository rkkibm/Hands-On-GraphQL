async function fetchBooks() {
    const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            books {
              title
              author
            }
          }
        `,
      }),
    });
  
    const { data } = await response.json();
    return data.books;
  }
  
  // Fetch books and display them
  fetchBooks().then((books) => {
    const bookElement = document.getElementById('book');
    if (books && books.length > 0) {
      bookElement.textContent = books.map(book => `${book.title} by ${book.author}`).join(', ');
    } else {
      bookElement.textContent = 'No books available';
    }
  });
  