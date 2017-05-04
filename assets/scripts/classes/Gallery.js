import Scrollbar from 'smooth-scrollbar'

import forEach from '../library/forEach'

export default class Gallery {
  constructor (wrapper) {
    this.wrapper = wrapper

    this.items = this.wrapper.querySelectorAll('.project-media-item')
    this.itemsCurrent = 0
    this.itemsLength = this.items.length

    this.buttons = []
    this.buttonsWrapper = null

    this.createScrollbar()
    this.createElements()
  }

  change (index) {
    if (index === this.itemsCurrent) { return }

    forEach(this.buttons, (index, button) => {
      button.classList.remove('is-active')
    })

    this.buttons[index].classList.add('is-active')

    forEach(this.items, (index, item) => {
      item.classList.remove('is-active')
    })

    this.items[index].classList.add('is-active')

    this.scrollbar.update()

    this.itemsCurrent = index
  }

  createScrollbar () {
    this.scrollbar = Scrollbar.init(this.wrapper.querySelector('.project-media-list'))
  }

  createElements () {
    this.buttonsWrapper = document.createElement('div')

    this.buttonsWrapper.className = 'project-media-btns'

    for (let i = 0; i <= this.itemsLength - 1; i++) {
      const button = document.createElement('button')

      button.addEventListener('click', function () {
        this.change(i)
      }.bind(this))

      button.innerHTML = i + 1
      button.style.height = `${100 / this.itemsLength}%`

      if (i === 0) {
        button.className = 'project-media-btn is-active'
      } else {
        button.className = 'project-media-btn'
      }

      this.buttons.push(button)
      this.buttonsWrapper.appendChild(button)
    }

    if (this.itemsLength > 1) {
      this.wrapper.appendChild(this.buttonsWrapper)
    }
  }
}
