import { deleteAuthor, getSingleAuthor } from './authorData';
import { booksByAuthor, deleteBook, getSingleBook } from './bookData';

// ALSO WORKS
// const viewBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleBook(firebaseKey)
//     .then((bookObject) => {
//       getSingleAuthor(bookObject.author_id)
//         .then((authorObject) => {
//           resolve({ author: authorObject, ...bookObject });
//         });
//     }).catch(reject);
// });

// VIEW BOOK DETAILS
const viewBookDetails = (firebaseKey) => (async () => {
  const book = await getSingleBook(firebaseKey);
  const author = await getSingleAuthor(book.author_id);
  return ({ author, ...book });
})().catch(console.warn);

// ALSO WORKS
// const viewAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleAuthor(firebaseKey)
//     .then((authorObject) => {
//       booksByAuthor(authorObject.firebaseKey)
//         .then((bookObject) => {
//           resolve({ book: bookObject, ...authorObject });
//         });
//     }).catch(reject);
// });

// VIEW AUTHOR DETAILS
const viewAuthorDetails = async (firebaseKey) => {
  const author = await getSingleAuthor(firebaseKey);
  const book = await booksByAuthor(firebaseKey);
  return ({ book, ...author });
}; // Don't need '.catch'

// DELETE AUTHOR BOOKS THEN AUTHOR
const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  booksByAuthor(authorId).then((authorsBookArray) => {
    const deleteBooks = authorsBookArray.map(((book) => deleteBook(book.firebaseKey)));

    Promise.all(deleteBooks).then(() => resolve(deleteAuthor(authorId)));
    // Can also do 'Promise.all([...deleteBooks])'
  }).catch(reject);
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
