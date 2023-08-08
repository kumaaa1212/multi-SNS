function eightTenths(num, iterations) {
  for (let i = 0; i < iterations; i++) {
    num = Math.floor(num * 0.8);
  }
  return num;
}

const startingNumber = 387420489;
const iterations = 50;
const result = eightTenths(startingNumber, iterations);

console.log(result); 