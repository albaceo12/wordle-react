import wordbank from "./components/wordlebank.txt";
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
export const generateWord = async () => {
  let wordset;
  let todaysWord;
  await fetch(wordbank)
    .then((res) => res.text())
    .then((result) => {
      const wordArr = result.split("\r\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordset = new Set(wordArr);
    });
  return { wordset, todaysWord };
};
