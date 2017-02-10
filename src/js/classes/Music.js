/* global Audio */

import get from '../lib/get'

export default class Music {
  constructor () {
    this.audio = new Audio()
    this.audio.crossOrigin = 'anonymous'

    this.client = 'd764995c8ec4e9f30f85b3bd8396312c'

    if (window.AudioContext || window.webkitAudioContext) {
      this.context = new (window.AudioContext || window.webkitAudioContext)()

      this.analyser = this.context.createAnalyser()
      this.analyser.fftSize = 512
      this.analyser.connect(this.context.destination)

      this.src = this.context.createMediaElementSource(this.audio)
      this.src.connect(this.context.destination)
      this.src.connect(this.analyser)

      this.frequency = new Uint8Array(this.analyser.frequencyBinCount)
    }

    this.songs = [
      'https://soundcloud.com/upcastmusic/echosmith-cool-kids',
      'https://soundcloud.com/recordrecords/of-monsters-and-men-little-2',
      'https://soundcloud.com/fueled_by_ramen/paramore-aint-it-fun',
      'https://soundcloud.com/stalkinggia/secondnature',
      'https://soundcloud.com/wearecafune/dyf'
    ]

    this.song = Math.floor(Math.random() * this.songs.length)
    this.songPrev = null
    this.songNext = null

    this.load(this.song)
  }

  isPaused () {
    return this.audio.paused
  }

  isPlaying () {
    return !this.audio.paused
  }

  getFrequency () {
    this.analyser.getByteFrequencyData(this.frequency)

    return this.frequency
  }

  load (song, callback = null) {
    const _this = this

    this.song = song
    this.songPrev = (this.song !== 0) ? this.song - 1 : this.songs.length - 1
    this.songNext = (this.song !== this.songs.length - 1) ? this.song + 1 : 0

    get(
      `//api.soundcloud.com/resolve.json?url=${this.songs[song]}&client_id=${this.client}`,
      (request) => {
        const data = JSON.parse(request.responseText)

        const music = document.querySelector('.music')
        const musicTitle = document.querySelector('.music-title')
        const musicUser = document.querySelector('.music-user')

        music.classList.add('is-active')

        musicTitle.setAttribute('href', data.permalink_url)
        musicTitle.textContent = data.title

        musicUser.setAttribute('href', data.user.permalink_url)
        musicUser.textContent = data.user.username

        if (data.stream_url) {
          _this.audio.src = `${data.stream_url}?client_id=${this.client}`
        } else {
          _this.next()
        }

        if (callback) {
          callback()
        }
      }
    )
  }

  next () {
    this.load(this.songNext, () => {
      this.play()
    })
  }

  prev () {
    this.load(this.songPrev, () => {
      this.play()
    })
  }

  pause () {
    this.audio.pause()
  }

  play () {
    this.audio.play()
  }
}
