export default function get (url, callback) {
  const request = new XMLHttpRequest()

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      callback(request)
    }
  }

  request.open('GET', url, true)

  request.send()
}
