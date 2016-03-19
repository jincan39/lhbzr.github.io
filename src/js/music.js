/* global Audio */

import get from './lib/get'

export default class Music {
  constructor () {
    if (!(window.AudioContext || window.webkitAudioContext)) {
      throw new Error('Your browser doesn\'t support Audio Context.')
    }

    this.audio = new Audio()
    this.audio.crossOrigin = 'anonymous'

    this.context = new (window.AudioContext || window.webkitAudioContext)()

    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = 2048
    this.analyser.connect(this.context.destination)

    this.src = this.context.createMediaElementSource(this.audio)
    this.src.connect(this.context.destination)
    this.src.connect(this.analyser)

    this.frequency = new Uint8Array(this.analyser.frequencyBinCount)

    this.songs = [
      'https://soundcloud.com/jeantonique/poom-face-the-fire-jean',
      'https://soundcloud.com/user-18875822/christian-fj-buttner-nik-felice-ignite-it-instrumental',
      'https://soundcloud.com/autografmusic/metaphysical',
      'https://soundcloud.com/kleerup/let-me-in-sebastien-remix-feat-susanne-sundfor',
      'https://soundcloud.com/leagueoflegends/dj-sona-kinetic-the-crystal',
      'https://soundcloud.com/alpineband/gasoline-2',
      'https://soundcloud.com/odesza/say_my_name',
      'https://soundcloud.com/edbangerrecords/sebastian-embody',
      'https://soundcloud.com/0data0/dont-sing-feat-benny-sings',
      'https://soundcloud.com/c2cdjs/down-the-road',
      'https://soundcloud.com/madeon/pay-no-mind',
      'https://soundcloud.com/futureclassic/hayden-james-something-about-you-2',
      'https://soundcloud.com/majorlazer/major-lazer-dj-snake-lean-on-feat-mo',
      'https://soundcloud.com/themagician/lykke-li-i-follow-rivers-the-magician-remix',
      'https://soundcloud.com/rac/lana-del-rey-blue-jeans-rac',
      'https://soundcloud.com/coyotekisses/coyote-kisses-the-deep'
    ]

    this.song = Math.floor(Math.random() * this.songs.length)
    this.songPrev = null
    this.songNext = null

    this.load()
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

    get(
      `//api.soundcloud.com/resolve.json?url=${_this.songs[_this.song]}&client_id=78c6552c14b382e23be3bce2fc411a82`,
      (request) => {
        const data = JSON.parse(request.responseText)

        if (data.stream_url) {
          _this.audio.src = data.stream_url + '?client_id=78c6552c14b382e23be3bce2fc411a82'
          _this.audio.play()

          _this.audio.addEventListener('ended', () => {
            _this.next()
          })
        } else {
          _this.next()
        }

        _this.data = data
        _this.setElements()
      }
    )

    _this.song = song
    _this.songPrev = (_this.song !== 0) ? _this.song - 1 : _this.songs.length - 1
    _this.songNext = (_this.song < _this.songs.length - 1) ? _this.song + 1 : 0
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

  setElements () {
    const _this = this

    const musicTitle = document.querySelector('.music-title')
    const musicUser = document.querySelector('.music-user')

    musicTitle.setAttribute('href', _this.data.permalink_url)
    musicTitle.textContent = _this.data.title

    musicUser.setAttribute('href', _this.data.user.permalink_url)
    musicUser.textContent = _this.data.user.username

    const musicToggle = document.querySelector('.music-toggle')
    const musicPrev = document.querySelector('.music-prev')
    const musicNext = document.querySelector('.music-next')

    _this.audio.addEventListener('pause', () => {
      musicToggle.classList.add('is-paused')
    })

    _this.audio.addEventListener('play', () => {
      musicToggle.classList.remove('is-paused')
    })

    _this.audio.addEventListener('ended', () => {
      _this.load((_this.song < _this.songs.length - 1) ? _this.song + 1 : 0)
    })

    musicToggle.addEventListener('click', () => {
      if (_this.isPaused()) {
        _this.play()
      } else {
        _this.pause()
      }
    })

    musicPrev.addEventListener('click', () => {
      _this.prev()
    })

    musicNext.addEventListener('click', () => {
      _this.next()
    })
  }
}
