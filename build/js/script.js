'use strict';

var trainersPage = document.querySelector('.trainers');
var trainersSlides = document.querySelectorAll('.trainers__item');
var trainersPrev = document.querySelector('.trainers__click_left');
var trainersNext = document.querySelector('.trainers__click_right');

var feedbackPage = document.querySelector('.feedback');
var feedbackSlides = document.querySelectorAll('.feedback__content');
var feedbackPrev = document.querySelector('.feedback__click_left');
var feedbackNext = document.querySelector('.feedback__click_right');

var pricePage = document.querySelector('.price');
var tabs = document.querySelectorAll('.price__period-item');
var tabControls = document.querySelector('.price__period');
var tabContent = document.querySelectorAll('.price__items');

// слайдер
var startIndexTrainers;
var endIndexTrainers;
var oneStepSize;

var startIndexFeedback;
var endIndexFeedback;

function optimizationSlider() {
  var maxHeight = 0;
  if (feedbackSlides) {
    for (var i = 0; i < feedbackSlides.length; i++) {
      if (maxHeight < feedbackSlides[i].clientHeight) {
        maxHeight = feedbackSlides[i].clientHeight;
      }
    }

    for (var j = 0; j < feedbackSlides.length; j++) {
      feedbackSlides[j].style.minHeight = maxHeight + 'px';
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
  if (window.matchMedia('(max-width: 767px)').matches) {
    switchSliderTrainers(1, trainersSlides, trainersPrev, trainersNext);
  } else if (window.matchMedia('(max-width: 1199px)').matches) {
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

function switchSliderfeedback(step, slides) {
  startIndexFeedback = 0;
  endIndexFeedback = step;
  showSlide(slides, startIndexFeedback, endIndexFeedback);
}

function feedbackNextF() {
  if (feedbackSlides) {
    if (endIndexFeedback < feedbackSlides.length) {
      showSlide(feedbackSlides, startIndexFeedback += 1, endIndexFeedback += 1);
    }
  }
}

function feedbackPrevF() {
  if (feedbackSlides) {
    if (startIndexFeedback > 0) {
      showSlide(feedbackSlides, startIndexFeedback -= 1, endIndexFeedback -= 1);
    }
  }
}

if (feedbackPage) {
  switchSliderfeedback(1, feedbackSlides, feedbackPrev, feedbackNext);
  feedbackPrev.addEventListener('click', feedbackPrevF);
  feedbackNext.addEventListener('click', feedbackNextF);
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

// переключение абонементов
function switchTabs() {
  function hideTabContent(a) {
    for (var i = a; i < tabContent.length; i++) {
      tabs[i].style.backgroundColor = 'transparent';
      tabContent[i].classList.add('hide');
      tabContent[i].classList.remove('show');
      tabs[i].classList.remove('price__period-item_active');
    }
  }

  hideTabContent(1);

  function showTabContent(b, target) {
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
      target.classList.add('price__period-item_active');
      target.style.backgroundColor = 'transparent';
    }
  }

tabs.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target && target.classList.contains('price__period-item')) {
      for (var i = 0; i < tabs.length; i++) {
        if (target === tabs[i]) {
          tabs[i].style.backgroundColor = 'transparent';
          hideTabContent(0);
          showTabContent(i, target);
          break;
        }
      }
    }
  });
});
}

if (pricePage) {
  switchTabs();
}
