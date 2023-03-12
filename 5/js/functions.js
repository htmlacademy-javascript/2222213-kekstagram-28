const checkString = (someString, stringLength) => {
  if (someString.length <= stringLength) {
    return true;
  } return false;
};
// Пример использования функции.
// const test = checkString('hello, WORLD!', 20);
// console.log(test);
checkString('hello, WORLD!', 10);


const getPalindromString = (someString) => {
  const formatedSomeString = someString.split(' ').join('').toLowerCase();
  const reversedSomeString = formatedSomeString.split('').reverse().join('');
  // console.log(formatedSomeString);
  // console.log(reversedSomeString);
  return formatedSomeString === reversedSomeString;
};

getPalindromString('Лёша на полке клопа нашёл');


const getNumbersFromString = (someString) => {
  const newNumbers = Math.abs(someString.split(' ').join('').replace(/\D/g,''));
  // console.log(newNumbers || NaN);
  return newNumbers || NaN;
};

getNumbersFromString('1 кефир, 0.5 батона');

const returnOriginalString = (someString, minLength, additionalString) => {
  const actualAdditionalString = minLength - someString.length;
  if (actualAdditionalString <= 0) {
    return someString;
  }
  return additionalString.slice(0, actualAdditionalString % additionalString.length) + additionalString.repeat(actualAdditionalString / additionalString.length) + someString;
};

returnOriginalString('qwerty', 4, '0');

