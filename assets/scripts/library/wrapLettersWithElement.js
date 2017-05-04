export default function wrapLettersWithElement (text, element) {
  return text.replace(/./g, `<${element}>$&</${element}>`)
}
