import clearDom from '../helpers/data/clearDom';

const showReviews = (array) => {
  clearDom();

  document.querySelector('#add-review-btn').innerHTML = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add a customer review</button>';

  array.forEach((item) => {
    document.querySelector('#review-container').innerHTML += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text bold">${item.sale ? `<span class="badge bg-info"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
          <hr>
          <i class="btn btn-success fas fa-eye" id="view-book-btn--${item.firebaseKey}"></i>
          <i id="edit-book-btn--${item.firebaseKey}" class="fas fa-edit btn btn-info"></i>
          <i id="delete-book--${item.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>`;
  });
};

const emptyReviews = () => {
  document.querySelector('#review-container').innerHTML = '<h1>No Items</h1>';
};

export { showReviews, emptyReviews };
