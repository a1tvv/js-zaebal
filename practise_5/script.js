// Сумма любого количества параметров
function sumAll(...numbers) {
  return numbers.reduce(function (sum, n) {
    return sum + n;
  }, 0);
}

console.log(sumAll(2, 5, 6, 7));                 // 20
console.log(sumAll(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)); // 55
console.log(sumAll());                           // 0