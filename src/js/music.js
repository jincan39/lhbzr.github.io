/* global Audio */

import get from './lib/get'

export default class Music {
  constructor () {
    this.audio = new Audio()
    this.audio.crossOrigin = 'anonymous'

    if (window.AudioContext || window.webkitAudioContext) {
      this.context = new (window.AudioContext || window.webkitAudioContext)()

      this.analyser = this.context.createAnalyser()
      this.analyser.fftSize = 2048
      this.analyser.connect(this.context.destination)

      this.src = this.context.createMediaElementSource(this.audio)
      this.src.connect(this.context.destination)
      this.src.connect(this.analyser)

      this.frequency = new Uint8Array(this.analyser.frequencyBinCount)
    }

    this.songs = [
      'https://soundcloud.com/okgo/i-wont-let-you-down',
      'https://soundcloud.com/the-ting-tings/wrong-club',
      'https://soundcloud.com/theheavyyy/like-me',
      'https://soundcloud.com/fueled_by_ramen/paramore-aint-it-fun',
      'https://soundcloud.com/muse/supermassive-black-hole',
      'https://soundcloud.com/fosterthepeoplemusic/pumpedupkicks',
      'https://soundcloud.com/unablespain/the-hives-hate-to-say-i-told-you-so-unable-radio-edit',
      'https://soundcloud.com/foals/foals-my-number',
      'https://soundcloud.com/theblackkeys/fever'
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

  load (song) {
    const _this = this

    this.song = song
    this.songPrev = (this.song !== 0) ? this.song - 1 : this.songs.length - 1
    this.songNext = (this.song !== this.songs.length - 1) ? this.song + 1 : 0

    get(
      `//api.soundcloud.com/resolve.json?url=${this.songs[song]}&client_id=78c6552c14b382e23be3bce2fc411a82`,
      (request) => {
        const data = JSON.parse(request.responseText)

        const musicTitle = document.querySelector('.music-title')
        const musicUser = document.querySelector('.music-user')

        musicTitle.setAttribute('href', data.permalink_url)
        musicTitle.textContent = data.title

        musicUser.setAttribute('href', data.user.permalink_url)
        musicUser.textContent = data.user.username

        if (data.stream_url) {
          _this.audio.src = data.stream_url + '?client_id=78c6552c14b382e23be3bce2fc411a82'
          _this.audio.play()
        } else {
          _this.next()
        }
      }
    )
  }

  next () {
    this.load(this.songNext)
  }

  prev () {
    this.load(this.songPrev)
  }

  pause () {
    this.audio.pause()
  }

  play () {
    this.audio.play()
  }
}
