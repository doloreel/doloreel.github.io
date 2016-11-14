const state = {

};

// -----------------------------------------------------------------------------

var concatenateValuesOf = function ( obj ) {
  let result = ''
  for (let key in obj) {
    result += `${obj[key].reduce(function(p, c) { return p += " " + c + " " })}`
  }
  return result
}

var generateCard = function ( number ) {
  return {
    baseClasses: [`slide-in`, `card`]
  , cardNumber: [`${number}`]
  }
}

var createCard = function ( cardData ) {
  var card = document.createElement('div')
  card.className = concatenateValuesOf(cardData)
}

var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(generateCard)
var cardElements = cards.map(createCard)

// -----------------------------------------------------------------------------


// d_ : dom elements
// s_ : side effects

var s_resetCards = function (cardElements) {
  cardElements.forEach(function(card) {
    card.classList.remove('slide-in-left');
    card.classList.remove('slide-in-right');
  })
}

var animationDoneCB = function ( element, index, elements ) {
  return function( e ) {
    if ( elements.length - 1 === index ) {
      s_resetCards(elements);
      animateCards();
    }
  }
}

var d_cards = document.querySelectorAll('.card')

var animateCards = function () {
  d_cards.forEach(function(card, idx) {
    var cardNo = idx + 1;
    setTimeout(function () {
      if ( idx % 2 === 0 ) {
        card.classList.add('slide-in-right')
      } else {
        card.classList.add('slide-in-left')
      }
      card.addEventListener("webkitAnimationEnd", animationDoneCB(card, idx, d_cards),false);
      card.addEventListener("animationend", animationDoneCB(card, idx, d_cards),false);
      card.addEventListener("oanimationend", animationDoneCB(card, idx, d_cards),false);
    }, cardNo * 5000);
  });
}

animateCards();



// add slide toggle in
// no repeat
// when all done
