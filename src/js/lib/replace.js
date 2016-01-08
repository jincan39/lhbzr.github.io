export default function replace(value, index, char) {
  return value.substr(0, index) + char + value.substr(index + 1);
}
