"use strict";

function Tabs(tabElement) {
  var _this2 = this;

  this.activeIndex = 0;
  this.tabsButtons = tabElement.querySelectorAll('.tabs__button');
  this.tabsContainers = tabElement.querySelectorAll('.tabs__container');
  this.tabsMobileButtons = tabElement.querySelectorAll('.tabs__mobilebtn');

  this.changeTab = function (previndex, currentIndex) {
    if (previndex === currentIndex) return;
    this.clearActive(previndex);
    this.tabsContainers[previndex].style.height = '74px';
    this.addActive(currentIndex);
    this.tabsContainers[currentIndex].style.height = 'auto';
  };

  this.changeMobileTab = function (previndex, currentIndex) {
    var _this = this;

    if (previndex === currentIndex) return;
    this.tabsContainers[previndex].style.height = '74px';
    this.clearActive(previndex);
    this.tabsContainers[currentIndex].style.height = 'auto';
    var height = this.tabsContainers[currentIndex].clientHeight + 'px';
    this.tabsContainers[currentIndex].style.height = '74px';
    this.tabsContainers[currentIndex].addEventListener('transitionend', function (event) {
      _this.tabsContainers[currentIndex].style.height = 'auto';
    }, {
      once: true
    });
    setTimeout(function () {
      _this.tabsContainers[currentIndex].style.height = height;
    }, 0);
    this.addActive(currentIndex);
  };

  this.clearActive = function (index) {
    this.tabsButtons[index].classList.remove('active');
    this.tabsContainers[index].classList.remove('active');
  };

  this.addActive = function (index) {
    this.tabsButtons[index].classList.add('active');
    this.tabsContainers[index].classList.add('active');
  };

  this.tabsButtons.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      _this2.changeTab(_this2.activeIndex, index);

      _this2.activeIndex = index;
    });
  });
  this.tabsMobileButtons.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      _this2.changeMobileTab(_this2.activeIndex, index);

      _this2.activeIndex = index;
    });
  });
}

function Validate(form, callback) {
  var _this3 = this;

  this.inputs = form.querySelectorAll('.validate-form-required');
  this.form = form;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var error = false;

    _this3.inputs.forEach(function (input) {
      if (input.value.length) return;
      input.closest('.input').classList.add('error');
      error = true;
      input.addEventListener('input', function () {
        input.closest('.input').classList.remove('error');
      }, {
        once: true
      });
    });

    if (error) return;
    callback();

    _this3.form.reset();
  });
}