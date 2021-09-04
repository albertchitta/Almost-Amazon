import { deleteAuthor, getSingleAuthor } from './authorData';
import { booksByAuthor, deleteBook, getSingleBook } from './bookData';
import { getBookReviews, deleteReview } from './reviewData';

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
  const reviews = await getBookReviews(firebaseKey);
  return ({ reviews, author, ...book });
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
  const books = await booksByAuthor(firebaseKey);
  return ({ books, ...author });
}; // Don't need '.catch'

// DELETE AUTHOR BOOKS THEN AUTHOR
const deleteAuthorBooks = (userId, authorId) => new Promise((resolve, reject) => {
  booksByAuthor(authorId).then((authorsBookArray) => {
    const deleteBooks = authorsBookArray.map(((book) => deleteBook(userId, book.firebaseKey)));

    Promise.all(deleteBooks).then(() => resolve(deleteAuthor(userId, authorId)));
    // Can also do 'Promise.all([...deleteBooks])'
  }).catch(reject);
});

// VIEW BOOK REVIEWS
const viewBookReviews = async (firebaseKey) => {
  const book = await getSingleBook(firebaseKey);
  const reviews = await getBookReviews(firebaseKey);
  return ({ reviews, ...book });
};

// DELETE BOOK REVIEWS THEN BOOKS
const deleteBookReviews = (userId, bookId) => new Promise((resolve, reject) => {
  getBookReviews(bookId).then((bookReviewsArray) => {
    const deleteReviews = bookReviewsArray.map(((review) => deleteReview(userId, review.firebaseKey)));

    Promise.all(deleteReviews).then(() => resolve(deleteBook(userId, bookId)));
    // Can also do 'Promise.all([...deleteBooks])'
  }).catch(reject);
});

export {
  viewBookDetails,
  viewAuthorDetails,
  deleteAuthorBooks,
  viewBookReviews,
  deleteBookReviews
};
