document.querySelector('#nav-toggle').addEventListener('click', function () {
  this.classList.toggle('active');
  this.classList.toggle('icon_active');
});

document
  .querySelector('#nav__cart_icon')
  .addEventListener('click', function () {
    this.classList.toggle('icon_active');
    if (this.a == null || this.a == '') {
      this.style.filter =
        'invert(45%) sepia(28%) saturate(4987%) hue-rotate(348deg) brightness(97%) contrast(88%)';
      this.a = 'active';
    } else {
      this.style.filter =
        'invert(86%) sepia(10%) saturate(265%) hue-rotate(357deg) brightness(93%) contrast(85%)';
      this.a = '';
    }
  });
