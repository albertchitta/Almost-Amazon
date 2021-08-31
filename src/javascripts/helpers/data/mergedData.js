import { getSingleAuthor } from './authorData';
import { booksByAuthor, getSingleBook } from './bookData';

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

const viewAuthorDetails = (firebaseKey) => (async () => {
  const author = await getSingleAuthor(firebaseKey);
  const book = await booksByAuthor(firebaseKey);
  return ({ book, ...author });
})().catch(console.warn);

export { viewBookDetails, viewAuthorDetails };
