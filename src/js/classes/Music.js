/* global Audio */

/**
 * Libraries.
 */
import get from '../lib/get'

/**
 * Class.
 */
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
      'https://soundcloud.com/the-ting-tings/wrong-club',
      'https://soundcloud.com/fueled_by_ramen/paramore-aint-it-fun',
      'https://soundcloud.com/unablespain/the-hives-hate-to-say-i-told-you-so-unable-radio-edit',
      'https://soundcloud.com/warnerbrosrecords/franz-ferdinand-right-action-3',
      'https://soundcloud.com/warnerbrosrecords/the-black-keys-gold-on-the',
      'https://soundcloud.com/plusonemusic/the-heavy-how-you-like-me-now',
      'https://soundcloud.com/plusonemusic/the-kooks-naive',
      'https://soundcloud.com/daftpunk-music/daft-punk-instant-crush-casablancas'
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
      `//api.soundcloud.com/resolve.json?url=${this.songs[song]}&client_id=d764995c8ec4e9f30f85b3bd8396312c`,
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
          _this.audio.src = `${data.stream_url}?client_id=78c6552c14b382e23be3bce2fc411a82`
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
