function factor(number) {

  let i = 2;
  let primfac = [];
  while (i * i <= number) {
    while (number % i == 0) {
      primfac.push(i);
      number = number / i;
    }
    i = i + 1;
  }
  if (number > 1) {
    primfac.push(number);
  }

  return primfac;

}

function countSymbol(str, target) {
  let countInclude = 0;
  let pos = -1;
  while ((pos = str.indexOf(target, pos + 1)) != -1) {
    countInclude++
  }
  return countInclude;
}

function analyzePart(partExpr) {

  let countExclams = countSymbol(partExpr, '!');
  let typeFactor = '';
  let number = '';

  if (countExclams === 1) {
    typeFactor = 'all';

    return {
      typeFactor: 'all',
      number: Number(partExpr.slice(0, partExpr.length - 1))
    }

  }

  number = Number(partExpr.slice(0, partExpr.length - 2));

  if (number % 2 === 0) {
    return {
      typeFactor: 'even',
      number: number
    }
  }

  if (number % 2 !== 0) {
    return {
      typeFactor: 'odd',
      number: number
    }
  }

  if (typeFactor === '') {
    throw new Error('strange factorial!');
  }

  if (Number.isNaN(number)) {
    throw new Error('can not get number from one part!');
  }

}

function generateSequence(number, type) {

  let arrNumbers = [];

  if (type === 'all') {

    for (let i = 1; i <= number; i++) {
      arrNumbers.push(i);
    }

    return arrNumbers;

  }

  if (type === 'odd') {

    for (let i = 1; i <= number; i = i + 2) {
      arrNumbers.push(i);
    }

    return arrNumbers;

  }

  if (type === 'even') {

    for (let i = 2; i <= number; i = i + 2) {
      arrNumbers.push(i);
    }

    return arrNumbers;

  }

  throw new Error('can not generate number sequence!');

}

function zeros(expression) {

  let initialNumberSeq = [];
  let factorSeq = [];
  let periodicNumbers = {
    count2: 0,
    count5: 0
  };

  let arrParts = expression.split('*');

  let smartArrParts = [];

  for (let i = 0; i < arrParts.length; i++) {
    smartArrParts.push(analyzePart(arrParts[i]));
  }

  for (let i = 0; i < smartArrParts.length; i++) {
    initialNumberSeq = initialNumberSeq.concat(
        generateSequence(smartArrParts[i].number, smartArrParts[i].typeFactor)
    );
  }

  for (let i = 0; i < initialNumberSeq.length; i++) {
    factorSeq = factorSeq.concat(factor(initialNumberSeq[i]));
  }

  for (let i = 0; i < factorSeq.length; i++) {

    if (factorSeq[i] === 2) {
      periodicNumbers.count2++;
    }

    if (factorSeq[i] === 5) {
      periodicNumbers.count5++;
    }

  }

  return Math.min(periodicNumbers.count2, periodicNumbers.count5);

}

module.exports = zeros;


