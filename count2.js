const unique = new Map();
//const unique2 = new Set();
let words = 'hello';
let split = words.split('');
let join = split.join('');
console.log(join);

words = [...words];
console.log(split);
words.forEach(el => {
    unique[el] = (unique[el] || 0) + 1;
});
const unique2 = new Set(words);
console.log(unique);

let arr = [1, 4, 3];
//arr = (...arr);
console.log(Math.max(...arr));