'use strict';

var trainersSlides = document.querySelectorAll('.trainers__item');
var trainersPrev = document.querySelector('.trainers__click_left');
var trainersNext = document.querySelector('.trainers__click_right');
var trainersPage = document.querySelector('.trainers');

var reviewsSlides = document.querySelectorAll('.feedback__content');
var reviewsPrev = document.querySelector('.feedback__click_left');
var reviewsNext = document.querySelector('.feedback__click_right');
var reviewsPage = document.querySelector('.feedback');

// слайдер
var startIndexTrainers;
var endIndexTrainers;
var oneStepSize;

var startIndexFeedback;
var endIndexFeedback;

function optimizationSlider() {
  var maxHeight = 0;
  if (reviewsSlides) {
    for (var i = 0; i < reviewsSlides.length; i++) {
      if (maxHeight < reviewsSlides[i].clientHeight) {
        maxHeight = reviewsSlides[i].clientHeight;
      }
    }

    for (var j = 0; j < reviewsSlides.length; j++) {
      reviewsSlides[j].style.height = maxHeight + 'px';
    }
  }
}

optimizationSlider();

function showSlide(slides, n, k) {
  for (var j = 0; j < slides.length; j++) {
    slides[j].style.display = 'none';
  }

  for (var i = n; i < k; i++) {
    if (slides[i]) {
      slides[i].style.display = 'flex';
    }
  }
}

function trainersNextF() {
  if (trainersSlides) {
    if (endIndexTrainers < trainersSlides.length) {
      showSlide(trainersSlides, startIndexTrainers += oneStepSize, endIndexTrainers += oneStepSize);
    }
  }
}

function trainersPrevF() {
  if (trainersSlides) {
    if (startIndexTrainers > 0) {
      showSlide(trainersSlides, startIndexTrainers -= oneStepSize, endIndexTrainers -= oneStepSize);
    }
  }
}

function switchSliderTrainers(step, slides) {
  startIndexTrainers = 0;
  endIndexTrainers = step;
  oneStepSize = step;
  showSlide(slides, startIndexTrainers, endIndexTrainers);
}

function changetrainersSlider() {
  if (window.screen.width < 768) {
    switchSliderTrainers(1, trainersSlides, trainersPrev, trainersNext);
  } else if (window.screen.width < 1200) {
    switchSliderTrainers(2, trainersSlides, trainersPrev, trainersNext);
  } else {
    switchSliderTrainers(4, trainersSlides, trainersPrev, trainersNext);
  }
}

if (trainersPage) {
  changetrainersSlider();
  window.addEventListener('resize', changetrainersSlider);
  trainersPrev.addEventListener('click', trainersPrevF);
  trainersNext.addEventListener('click', trainersNextF);
}

function switchSliderReviews(step, slides) {
  startIndexFeedback = 0;
  endIndexFeedback = step;
  showSlide(slides, startIndexFeedback, endIndexFeedback);
}

function reviewsNextF() {
  if (reviewsSlides) {
    if (endIndexFeedback < reviewsSlides.length) {
      showSlide(reviewsSlides, startIndexFeedback += 1, endIndexFeedback += 1);
    }
  }
}

function reviewsPrevF() {
  if (reviewsSlides) {
    if (startIndexFeedback > 0) {
      showSlide(reviewsSlides, startIndexFeedback -= 1, endIndexFeedback -= 1);
    }
  }
}

if (reviewsPage) {
  switchSliderReviews(1, reviewsSlides, reviewsPrev, reviewsNext);
  reviewsPrev.addEventListener('click', reviewsPrevF);
  reviewsNext.addEventListener('click', reviewsNextF);
}

// плавный скролл до якоря
var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]'));
var animationTime = 600;
var framesCount = 30;

anchors.forEach(function (item) {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    var scroller = setInterval(function () {
      var scrollBy = coordY / framesCount;

      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        window.scrollBy(0, scrollBy);
      } else {
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    }, animationTime / framesCount);
  });
});

// маска и валидация номера телефона в форме
window.addEventListener('DOMContentLoaded', function () {
  function setCursorPosition(pos, input) {
    input.focus();
    if (input.setSelectionRange) {
      input.setSelectionRange(pos, pos);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  function mask(event) {
    var matrix = '+7(___)_______';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var tel = event.currentTarget;
    var val = tel.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    tel.value = matrix.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < (val.length + 1)) {
        return val.charAt(i++);
      } else {
        if (i >= (val.length + 1)) {
          return '';
        } else {
          return a;
        }
      }
    });
    if (event.type === 'blur') {
      if (tel.value.length === 3) {
        tel.value = '';
      }
    } else {
      if (tel.value[tel.value.length - 1] === ')') {
        tel.value = tel.value.substring(0, tel.value.length - 1);
      }
      setCursorPosition(tel.value.length, tel);
    }
  }
  function setCallBacks(element) {
    element.addEventListener('input', mask, false);
    element.addEventListener('focus', mask, false);
    element.addEventListener('blur', mask, false);
  }

  var inputTel = document.querySelector('#form-tel');
  if (inputTel) {
    setCallBacks(inputTel);
  }
});
