import clearDom from '../../helpers/data/clearDom';

const addReviewForm = (obj = {}) => {
  clearDom();

  document.querySelector('#form-container').innerHTML = `
    <form id="submit-book-form" class="mb-4">
      <div class="form-group">
        <label for="headline">Add a headline</label>
        <input type="text" class="form-control" id="headline" aria-describedby="bookTitle" placeholder="What's important to know?" value="${obj.headline || ''}" required>
      </div>
      <div class="form-group">
        <label for="review">Add a review</label>
        <textarea class="form-control" placeholder="What do you like or dislike about this book?" id="review" style="height: 100px">${obj.review || ''}</textarea>
      </div>
      <button type="submit"
        id="${obj.firebaseKey ? `submit-review--${obj.firebaseKey}` : 'submit-review'}"
        class="btn btn-primary">Submit Review
      </button>
    </form>`;
};

export default addReviewForm;
