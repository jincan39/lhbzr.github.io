/* global XMLHttpRequest, Audio */

const AudioContext = window.AudioContext || window.webkitAudioContext

export default class Music {
  constructor (url) {
    this.url = url

    this.audio = new Audio()
    this.audio.crossOrigin = 'anonymous'

    this.context = new AudioContext()

    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = 2048
    this.analyser.connect(this.context.destination)

    this.src = this.context.createMediaElementSource(this.audio)
    this.src.connect(this.context.destination)
    this.src.connect(this.analyser)

    this.waveform = new Uint8Array(this.analyser.frequencyBinCount)
    this.frequencies = new Uint8Array(this.analyser.frequencyBinCount)

    this.request()
  }

  request () {
    let response

    const audio = this.audio

    const request = new XMLHttpRequest()

    request.open('GET', `//api.soundcloud.com/resolve.json?url=${this.url}&client_id=78c6552c14b382e23be3bce2fc411a82`, true)

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        response = JSON.parse(request.responseText)

        audio.src = `${response.stream_url}?client_id=78c6552c14b382e23be3bce2fc411a82`
        audio.play()

        audio.addEventListener('ended', () => {
          audio.play()
        })
      }
    }

    request.send()

    this.response = response
  }

  getRequest () {
    return this.response
  }

  getWaveform () {
    this.analyser.getByteTimeDomainData(this.waveform)

    return this.waveform
  }

  getFrequencies () {
    this.analyser.getByteFrequencyData(this.frequencies)

    return this.frequencies
  }
}

module.exports = Music
