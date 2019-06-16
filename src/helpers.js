/**
converts the first letter of a string to uppercase
*/
export function uppercaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
