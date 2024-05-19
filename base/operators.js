// # ?? - Nullish Coalescing Operator
const nco = () => {
const value1 = null;
const value2 = undefined;
const value3 = 'Hello';

console.log(value1 ?? 'Default'); // 'Default'
console.log(value2 ?? 'Default'); // 'Default'
console.log(value3 ?? 'Default'); // 'Hello'
}

// # || - Logical OR Operator
const lor = () => {
 const value1 = false;
const value2 = null;
const value3 = undefined;
const value4 = 0;
const value5 = '';

console.log(value1 || 'Default'); // 'Default'
console.log(value2 || 'Default'); // 'Default'
console.log(value3 || 'Default'); // 'Default'
console.log(value4 || 'Default'); // 'Default'
console.log(value5 || 'Default'); // 'Default' 
}

