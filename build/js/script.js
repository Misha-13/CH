'use strict';
var swiper = new window.Swiper('.swiper-container', {
  // Optional parameters
  loop: true,
  slidesPerView: 4,
  slidesPerGroup: 4,
  centeredSlides: false,
  spaceBetween: 30,
  centeredSlidesBounds: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
    renderBullet: function renderBullet(index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  },

  // Navigation arrows
  navigation: {
    prevEl: '.swiper-button-prev',
  }
});


