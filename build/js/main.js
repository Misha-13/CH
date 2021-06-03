'use strict';

(function () {
  var initSlider = function () {
    /* var lintSwiper = ''; */
    var newItemsBlock = document.querySelector('.new-items--no-js');
    var swiperBlock = document.querySelector('.swiper--no-js');

    if (newItemsBlock) {
      newItemsBlock.classList.remove('new-items--no-js');
    }

    if (swiperBlock) {
      swiperBlock.classList.remove('swiper--no-js');
    }

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
        /* 600: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          pagination: {
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span>' + ' of ' + '<span class="' + totalClass + '"></span>';
            }
          }
        }, */
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

    /* lintSwiper = swiper;
    lintSwiper = false;
    if (lintSwiper) {
      lintSwiper = true;
    } */
    window.addEventListener('resize', function () {
      swiper.update();
    });
  };

  window.slider = {
    setSlider: function () {
      initSlider();
    }
  };
})();

(function () {
  var DESKTOP_WIDTH = 1024;
  var headerBlock = document.querySelector('.page-header');
  if (headerBlock) {
    var headerTopBlock = headerBlock.querySelector('.page-header__top-wrapper');
    var headerBottomBlock = headerBlock.querySelector('.page-header__bottom-wrapper');
    var burgerButton = headerBlock.querySelector('.page-header__burger-button');
    var loginButton = headerBlock.querySelectorAll('.login-button');
    var logoSource = headerBlock.querySelector('.logo source');

    var setHeaderState = function (currentState, newState, imgSource) {
      headerTopBlock.classList.remove('page-header__top-wrapper--js-' + currentState);
      headerBottomBlock.classList.remove('page-header__bottom-wrapper--js-' + currentState);
      headerTopBlock.classList.add('page-header__top-wrapper--js-' + newState);
      headerBottomBlock.classList.add('page-header__bottom-wrapper--js-' + newState);
      logoSource.srcset = imgSource;
      headerBlock.classList.toggle('page-header--open');
    };

    var setDefaultHeader = function () {
      headerTopBlock.classList.add('page-header__top-wrapper--js-close');
      headerBottomBlock.classList.add('page-header__bottom-wrapper--js-close');
      logoSource.srcset = 'img/logo.svg';
    };

    var clearStateHeader = function () {
      headerTopBlock.classList.remove('page-header__top-wrapper--js-open');
      headerBottomBlock.classList.remove('page-header__bottom-wrapper--js-open');
      headerTopBlock.classList.remove('page-header__top-wrapper--js-close');
      headerBottomBlock.classList.remove('page-header__bottom-wrapper--js-close');
      headerBlock.classList.remove('page-header--open');
    };

    var setEventsHeader = function () {
      burgerButton.addEventListener('click', function () {
        if (headerTopBlock.classList.contains('page-header__top-wrapper--js-close')) {
          setHeaderState('close', 'open', 'img/logo-menu.svg');
        } else {
          setHeaderState('open', 'close', 'img/logo.svg');
        }
      });
      for (var i = 0; i < loginButton.length; i++) {
        loginButton[i].addEventListener('click', function (evt) {
          var modal = document.querySelector('.login-modal');
          var body = document.querySelector('.page-body');
          if (modal) {
            evt.preventDefault();
            if (modal.classList.contains('login-modal--close')) {
              modal.classList.remove('login-modal--close');
              body.classList.add('page-body--modal');
            }
          }
        });
      }
      window.addEventListener('resize', function () {
        if (window.innerWidth > DESKTOP_WIDTH) {
          clearStateHeader();
          setDefaultHeader();
        }
      });
    };
  }

  var initHeader = function () {
    if (headerBlock) {
      setDefaultHeader();
      setEventsHeader();
    }
  };

  window.header = {
    setHeader: function () {
      initHeader();
    }
  };
})();

(function () {
  var initFaqAccordion = function () {
    var faqListBlock = document.querySelector('.faq-list');
    if (faqListBlock) {
      var element = faqListBlock.querySelectorAll('.faq-list__element');
      var button = faqListBlock.querySelectorAll('.faq-list__link');
      element.forEach(function (e) {
        e.classList.remove('faq-list__element--no-js');
      });
      button.forEach(function (e, i) {
        e.classList.remove('faq-list__link--no-js');
        e.addEventListener('click', function (evt) {
          evt.preventDefault();
          e.classList.toggle('faq-list__link--selected');
          element[i].classList.toggle('faq-list__element--selected');
        });
      });
    }
  };

  window.faq = {
    setFaq: function () {
      initFaqAccordion();
    }
  };
})();

(function () {
  var ESC_KEY_CODE = 27;
  var loginModal = document.querySelector('.login-modal');

  if (loginModal) {
    var loginModalEmail = document.querySelector('#modalEmail');
    var closeModal = loginModal.querySelector('.login-modal__close-button');
    var body = document.querySelector('.page-body');

    var setStorageValue = function () {
      localStorage.setItem('modalEmail', loginModalEmail.value);
    };

    var getStorageValue = function () {
      loginModalEmail.value = localStorage.getItem('modalEmail');
    };

    var setModalEvent = function () {
      closeModal.addEventListener('click', function () {
        setStorageValue();
        loginModal.classList.add('login-modal--close');
        body.classList.remove('page-body--modal');
      });

      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEY_CODE) {
          setStorageValue();
          loginModal.classList.add('login-modal--close');
          body.classList.remove('page-body--modal');
        }
      });

      window.addEventListener('click', function (evt) {
        if (evt.target === loginModal) {
          setStorageValue();
          loginModal.classList.add('login-modal--close');
          body.classList.remove('page-body--modal');
        }
      });
    };
  }

  var initLoginModal = function () {
    getStorageValue();
    setModalEvent();
  };

  window.loginModal = {
    setLoginModal: function () {
      if (loginModal) {
        initLoginModal();
      }
    }
  };
})();

(function () {
  var DESKTOP_WIDTH = 1024;
  var filterForm = document.querySelector('.filter-form');
  var body = document.querySelector('.page-body');

  if (filterForm) {
    var filterCloseButton = filterForm.querySelector('.filter-form__close-button');

    var setAccordion = function () {
      var filterElement = filterForm.querySelectorAll('.filter-form__list');
      var filterAccordionButton = filterForm.querySelectorAll('.filter-form__restore-button');
      filterElement.forEach(function (e) {
        e.classList.remove('filter-form__list--no-js');
      });
      filterAccordionButton.forEach(function (e, i) {
        e.classList.remove('filter-form__restore-button--no-js');
        e.addEventListener('click', function (evt) {
          evt.preventDefault();
          e.classList.toggle('filter-form__restore-button--clicked');
          filterElement[i].classList.toggle('filter-form__list--closed');
        });
      });
    };

    var initFilter = function () {
      var filterOpenButton = document.querySelector('.catalog__filter-button');
      var filterBlock = document.querySelector('.catalog__form-wrapper');
      if (filterOpenButton) {
        filterOpenButton.classList.remove('catalog__filter-button--no-js');
        filterOpenButton.addEventListener('click', function (evt) {
          evt.preventDefault();
          filterForm.classList.toggle('filter-form--open');
          filterBlock.classList.toggle('catalog__form-wrapper--active');
          body.classList.toggle('page-body--filter');
        });
        filterCloseButton.addEventListener('click', function () {
          filterForm.classList.remove('filter-form--open');
          filterBlock.classList.toggle('catalog__form-wrapper--active');
          body.classList.remove('page-body--filter');
        });
        window.addEventListener('resize', function () {
          if (window.innerWidth > DESKTOP_WIDTH) {
            filterForm.classList.remove('filter-form--open');
            filterBlock.classList.toggle('catalog__form-wrapper--active');
            body.classList.remove('page-body--filter');
          }
        });
      }
      setAccordion();
    };
  }

  window.filter = {
    setFilter: function () {
      if (filterForm) {
        initFilter();
      }
    }
  };
})();

(function () {
  var ESC_KEY_CODE = 27;
  var cartModal = document.querySelector('.cart-modal');

  if (cartModal) {
    var cartAddButton = document.querySelector('.item-features__button');
    var closeModal = cartModal.querySelector('.cart-modal__close-button');

    var body = document.querySelector('.page-body');

    var setModalEvent = function () {
      closeModal.addEventListener('click', function () {
        cartModal.classList.add('cart-modal--close');
        body.classList.remove('page-body--modal');
      });

      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEY_CODE) {
          cartModal.classList.add('cart-modal--close');
          body.classList.remove('page-body--modal');
        }
      });

      window.addEventListener('click', function (evt) {
        if (evt.target === cartModal) {
          cartModal.classList.add('cart-modal--close');
          body.classList.remove('page-body--modal');
        }
      });
    };

    var setAddButtonEvent = function () {
      if (cartAddButton) {
        cartAddButton.addEventListener('click', function (evt) {
          evt.preventDefault();
          cartModal.classList.toggle('cart-modal--close');
          body.classList.toggle('page-body--modal');
        });
      }
    };
  }
  var initCartModal = function () {
    setModalEvent();
    setAddButtonEvent();
  };

  window.cartModal = {
    setLoginModal: function () {
      if (cartModal) {
        initCartModal();
      }
    }
  };
})();

window.slider.setSlider();
window.header.setHeader();
window.faq.setFaq();
window.loginModal.setLoginModal();
window.filter.setFilter();
window.cartModal.setLoginModal();
