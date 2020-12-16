const randomFaces = [
	'ressources/hammer.png',
	'ressources/tiny_happy.png',
	'ressources/tiny_oof.png',
	'ressources/tiny_riant_a_gorge_deployee.png',
	'ressources/tiny_wink.png'
]

let isPasContentModeStarted = false
const body = document.querySelector('body')
const container = document.querySelector('.container')
const tallContainer = document.querySelector('.tall')
const tallImage = document.querySelector('.tall_image')

class randomTinyFace {
	constructor(element, options = {}) {
		this.element = element

		/* Default values if options argument is empty */
		this.options = Object.assign(
			{},
			{
				face: 'ressources/tiny_wink.png',
				height: '120'
			},
			options
		)

		this.face = this.options.face
		this.height = this.options.height
		this.position = this.options.position

		/* DOM manipulation */
		this.div = this.createDivWithClass('tinyface')
		this.img = this.createImage()

		this.div.appendChild(this.img)
		this.element.prepend(this.div)

		this.positionTinyFace(this.div)
		const animation = this.animateTinyFace(this.div)
		animation.onfinish = () => this.destroyTinyFace(this.div)
	}

	/**
	 * Calculate length of tinyFace animation according to its height
	 * (Big face : 1 second, smallest face : 10 seconds)
	 * @param {int} height
	 * @returns {int}
	 */
	calculateDuration(height) {
		return (11 - height / 30) * 1000
	}

	/**
	 * Destroy tinyFace div
	 * @param {HTMLElement} div
	 */
	destroyTinyFace(div) {
		div.remove()
	}

	/**
	 * A random Tiny face is falling from the sky!
	 * @param {HTMLElement} div
	 * @returns {HTMLElement}
	 */
	animateTinyFace(div) {
		const keyFrames = [
			{
				// from
				top: `-${div.offsetHeight}px`
			},
			{
				// to
				top: '100%'
			}
		]

		const options = {
			duration: this.calculateDuration(this.div.offsetHeight)
		}

		return this.div.animate(keyFrames, options)
	}

	/**
	 * Set the tinyFace on a random horizontal position
	 * Set its z-index accordingly to is height
	 * @param {HTMLElement} div
	 */
	positionTinyFace(div) {
		div.style.left = `${this.getRandomPosition(100)}%`
		div.style.top = `-${div.offsetHeight}px`
		div.style.zIndex = div.offsetHeight
	}

	/**
	 * Create and return the div
	 * @param {string} className
	 * @returns {HTMLElement}
	 */
	createDivWithClass(className) {
		let div = document.createElement('div')
		div.setAttribute('class', className)
		return div
	}

	/**
	 * Create abd returns the img
	 * @param {string} className
	 * @returns {HTMLElement}
	 */
	createImage() {
		let img = document.createElement('img')
		img.setAttribute('alt', 'randomTinyFace')
		img.setAttribute('src', this.options.face)
		img.style.height = this.options.height + 'px'
		return img
	}

	/**
	 * Returns a random value between 1 and max-1
	 * @param {int} max
	 * @returns {string}
	 */
	getRandomPosition(max) {
		const result = Math.floor(Math.random() * Math.floor(max))
		return result.toString()
	}
}

function pasContentMode() {
	tallContainer.classList.add('godmode')
	container.classList.add('flashy_background')
	const music = document.querySelector('#doom_music')
	music.play()
	music.volume = 0.1
	setInterval(() => {
		createRandomTinyFace()
	}, 500)
}

function initiatePasContentMode() {
	tallImage.src = 'ressources/tall_inveigh.png'
	tallImage.style.transform = 'scale(3)'
	setTimeout(() => {
		tallImage.src = 'ressources/tall_discontent.png'
		tallImage.style.transform = 'scale(5) rotate(2880deg)'
		tallImage.addEventListener('transitionend', () => {
			pasContentMode()
		})
	}, 2000)
}

function getRandomIntFromRange(min, max) {
	return Math.floor(Math.random() * (+max - +min) + +min)
}

function getRandomElementFromArray(array) {
	return array[Math.floor(Math.random() * array.length)]
}

function createRandomTinyFace() {
	return new randomTinyFace(body, {
		face: getRandomElementFromArray(randomFaces),
		height: getRandomIntFromRange(30, 300)
	})
}

tallContainer.addEventListener('click', () => {
	if (!isPasContentModeStarted) {
		isPasContentModeStarted = true
		tallContainer.classList.remove('click_pointer')
		initiatePasContentMode()
	}
})
