module.exports = function check(str, bracketsConfig) {
  const openingBrackets = bracketsConfig.map((brackets) => brackets[0]);
  const bracketsVocabulary = {};
  bracketsConfig.forEach((brackets) => {
    bracketsVocabulary[brackets[1]] = brackets[0];
  });
  const specialBrackets = bracketsConfig
    .filter((brackets) => brackets[0] === brackets[1])
    .map((brackets) => brackets[0]);
  let stack = [];
  let lastItemFromStack;
  for (let i = 0; i < str.length; i++) {
    let currentBracket = str[i];
    lastItemFromStack = stack[stack.length - 1];
    if (specialBrackets.includes(currentBracket)) {
      lastItemFromStack === currentBracket
        ? stack.pop()
        : stack.push(currentBracket);
    } else {
      if (openingBrackets.includes(currentBracket)) {
        stack.push(currentBracket);
      } else {
        if (stack.length === 0) {
          return false;
        }
        if (lastItemFromStack === bracketsVocabulary[currentBracket]) {
          stack.pop();
        }
      }
    }
  }
  return stack.length === 0;
};
