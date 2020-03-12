'use strict';
var PIN_AMOUNT = 8;
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var BOOKING_TIMES = ['12:00', '13:00', '14:00'];
var FUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var getRandomInt = function (from, to) {
  return Math.floor(Math.random() * (to - from) + from);
};

var randomFeaturesGenerator = function () {
  var arr = [];

  for (var i = 0; i < getRandomInt(1, FUTURES.length); i++) {
    arr.push(FUTURES[i]);
  }
  return arr;
};

var generatePinData = function () {
  var pins = [];
  for (var i = 1; i <= PIN_AMOUNT; i++) {
    var adressX = getRandomInt(50, 1200);
    var adressY = getRandomInt(130, 630);
    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },
      'offer': {
        'title': 'Тестовый заголовок ' + i,
        'address': adressX + ', ' + adressY,
        'price': getRandomInt(5000, 30000),
        'type': HOUSING_TYPES[getRandomInt(0, HOUSING_TYPES.length)],
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 10),
        'checkin': BOOKING_TIMES[getRandomInt(0, BOOKING_TIMES.length)],
        'checkout': BOOKING_TIMES[getRandomInt(0, BOOKING_TIMES.length)],
        'features': randomFeaturesGenerator(),
        'description': 'Описание ' + i,
        'photos': PHOTOS[getRandomInt(0, FUTURES.length)]
      },
      'location': {
        'x': adressX,
        'y': adressY,
      },
    });
  }
  return pins;
};

var drawPin = function (pin) {
  var locationX = pin.location.x - 50;
  var locationY = pin.location.y + 5;
  var pinsTemplate = document.querySelector('#pin').content;
  var newPinTemplate = pinsTemplate.querySelector('.map__pin');
  var newMessage = newPinTemplate.cloneNode(true);
  newMessage.setAttribute('style', 'left:' + locationX + 'px;top:' + locationY + 'px');
  var image = newMessage.querySelector('img');
  image.setAttribute('src', pin.author.avatar);
  image.setAttribute('alt', pin.offer.title);
  return newMessage;
};

var drawingPinsFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.append(drawPin(pins[i]));
  }
  mapPins.appendChild(fragment);
};

var init = function () {
  var pins = generatePinData();
  drawingPinsFragment(pins);
  map.classList.remove('map--faded');
};
init();
