const clearDom = () => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = '';
  document.querySelector('#view').innerHTML = '';
  document.querySelector('#author-books').innerHTML = '';
  // document.querySelector('#review-container').innerHTML = '';
};

export default clearDom;
