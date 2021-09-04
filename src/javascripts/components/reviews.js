const showReviews = (array) => {
  array.forEach((item) => {
    document.querySelector('#review-container').innerHTML += `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${item.headline}<i class="fas fa-times-circle btn btn-danger" id="delete-review--${item.firebaseKey}"></i></h5>
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
