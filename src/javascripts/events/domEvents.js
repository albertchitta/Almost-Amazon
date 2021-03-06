import { showBooks } from '../components/books';
import { showAuthors } from '../components/authors';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import {
  createBook,
  getSingleBook,
  updateBook,
} from '../helpers/data/bookData';
import {
  createAuthor,
  getSingleAuthor,
  updateAuthor
} from '../helpers/data/authorData';
import viewBook from '../components/viewBook';
import viewAuthor from '../components/viewAuthor';
import {
  deleteAuthorBooks,
  deleteBookReviews,
  viewAuthorDetails,
  viewBookDetails,
} from '../helpers/data/mergedData';
import addReviewForm from '../components/forms/addReviewForm';
import { createReview, deleteReview } from '../helpers/data/reviewData';

let bookId = '';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id === ('submit-book')) {
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        headline: '',
        review: '',
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        uid
      };

      createBook(bookObject).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, id] = e.target.id.split('--');
      getSingleBook(id).then((bookObj) => addBookForm(uid, bookObj));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        headline: '',
        review: '',
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        firebaseKey,
        uid
      };

      updateBook(bookObject).then(showBooks);
    }

    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      if (window.confirm('Want to delete?')) {
        const [, id] = e.target.id.split('--');
        deleteBookReviews(uid, id).then(showBooks);
      }
    }

    // ADD CLICK EVENT FOR VIEWING A BOOK
    if (e.target.id.includes('view-book-btn')) {
      [, bookId] = e.target.id.split('--');
      viewBookDetails(bookId).then(viewBook);
    }

    /*-----------------------------------------------------------------------------------*/

    // ADD CLICK EVENT FOR CREATING A REVIEW
    if (e.target.id.includes('add-review-btn')) {
      addReviewForm();
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A REVIEW
    if (e.target.id.includes('submit-review')) {
      e.preventDefault();
      const reviewObject = {
        book_id: bookId,
        headline: document.querySelector('#headline').value,
        review: document.querySelector('#review').value,
      };

      createReview(reviewObject).then(viewBookDetails(reviewObject.book_id).then(viewBook));
    }

    // CLICK EVENT FOR DELETING A REVIEW
    if (e.target.id.includes('delete-review')) {
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteReview(firebaseKey).then(viewBookDetails(bookId).then(viewBook));
      }
    }

    /*-----------------------------------------------------------------------------------*/

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(uid, firebaseKey).then(showAuthors);
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id === ('submit-author')) {
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        image: document.querySelector('#image').value,
        description: document.querySelector('#description').value,
        favorite: document.querySelector('#favorite').checked,
        uid
      };

      createAuthor(authorObject).then(showAuthors);
    }

    // CLICK EVENT FOR EDITING/UPDATING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      const [, id] = e.target.id.split('--');
      getSingleAuthor(id).then((authorObj) => addAuthorForm(authorObj));
    }

    // CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      e.preventDefault();
      const [, firebaseKey] = e.target.id.split('--');
      const authorObject = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        image: document.querySelector('#image').value,
        description: document.querySelector('#description').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey,
        uid
      };

      updateAuthor(authorObject).then(showAuthors);
    }

    // ADD CLICK EVENT FOR VIEWING AN AUTHOR
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      viewAuthorDetails(firebaseKey).then(viewAuthor);
    }
  });
};

export default domEvents;
