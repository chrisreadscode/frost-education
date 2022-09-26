export default function capitalize(word) {
  const sectionArr = word.split('-');
  const sectionArrCapitalized = sectionArr.map((word) => {
    const firstLetterCapital = word[0].toUpperCase();
    return firstLetterCapital + word.substring(1);
  });
  return sectionArrCapitalized.join(' ');
}
