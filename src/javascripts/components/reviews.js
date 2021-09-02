import clearDom from '../helpers/data/clearDom';

const showReviews = (array) => {
  clearDom();

  document.querySelector('#add-review-btn').innerHTML = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add a customer review</button>';

  array.forEach((item) => {
    document.querySelector('#review-container').innerHTML += `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${item.headline}</h5>
            <p class="card-text">${item.review}</p>
          </div>
        </div>
      `;
  });
};

const emptyReviews = () => {
  document.querySelector('#review-container').innerHTML = '<h1>No Items</h1>';
};

export { showReviews, emptyReviews };
