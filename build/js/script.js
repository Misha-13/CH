'use strict';
var swiper = new window.Swiper('.swiper-container', {
  // Optional parameters
  loop: true,
  slidesPerView: 4,
  slidesPerGroup: 4,
  centeredSlides: false,
  spaceBetween: 30,
  centeredSlidesBounds: true,

  pagination: {
    el: document.querySelector('.swiper-pagination'),
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      pagination: {
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
        }
      }
    },
    600: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      pagination: {
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
        }
      }
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      pagination: {
        type: 'bullets',
        clickable: 'true',
        renderBullet: function renderBullet(index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      }
    },
    1024: {
      spaceBetween: 29,
      slidesPerView: 4,
      slidesPerGroup: 4,
      pagination: {
        type: 'bullets',
        clickable: 'true',
        renderBullet: function renderBullet(index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      }
    }
  }
});
