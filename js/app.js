class randomDoomFace {
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
		this.div = this.createDivWithClass('doomface')
		this.img = this.createImageWithClass('doomface_png')

		this.div.appendChild(this.img)
		this.element.prepend(this.div)

		this.positionDoomFace(this.div)
		const animation = this.animateDoomFace(this.div)
		animation.onfinish = () => this.destroyDoomFace(this.div)
	}

	/**
	 * Calculate length of doomFace animation according to its height
	 * (Big face : 1 second, smallest face : 10 seconds)
	 * @param {int} height
	 * @returns {int}
	 */
	calculateDuration(height) {
		return (11 - height / 30) * 1000
	}

	/**
	 * Destroy doomFace div
	 * @param {HTMLElement} div
	 */
	destroyDoomFace(div) {
		div.remove()
	}

	/**
	 * A random doom face is falling from the sky
	 * @param {HTMLElement} div
	 * @returns {HTMLElement}
	 */
	animateDoomFace(div) {
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
	 * Set the doomFace on a random horizontal position
	 * Set its z-index accordingly to is height
	 * @param {HTMLElement} div
	 */
	positionDoomFace(div) {
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
	createImageWithClass(className) {
		let img = document.createElement('img')
		img.setAttribute('class', className)
		img.setAttribute('alt', 'randomDoomFace')
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

function godMode() {
	doomGuyContainer.classList.add('godmode')
	container.classList.add('flashy_background')
	const music = document.querySelector('#doom_music')
	music.play()
	music.volume = 0.1
	setInterval(() => {
		createRandomDoomFace()
	}, 500)
}

function initiateGodMode() {
	doomGuy.src = 'ressources/tall_inveigh.png'
	doomGuy.style.transform = 'scale(2)'
	setTimeout(() => {
		doomGuy.src = 'ressources/tall_discontent.png'
		doomGuy.style.transform = 'scale(4) rotate(2880deg)'
		doomGuy.addEventListener('transitionend', () => {
			godMode()
		})
	}, 3000)
}

function getRandomIntFromRange(min, max) {
	return Math.floor(Math.random() * (+max - +min) + +min)
}

function getRandomElementFromArray(array) {
	return array[Math.floor(Math.random() * array.length)]
}

function createRandomDoomFace() {
	return new randomDoomFace(body, {
		face: getRandomElementFromArray(randomFaces),
		height: getRandomIntFromRange(30, 300)
	})
}

const randomFaces = [
	'ressources/hammer.png',
	'ressources/tiny_happy.png',
	'ressources/tiny_oof.png',
	'ressources/tiny_riant_a_gorge_deployee.png',
	'ressources/tiny_wink.png'
]

let started = false
const body = document.querySelector('body')
const container = document.querySelector('.container')
const doomGuyContainer = document.querySelector('.doomguy')
const doomGuy = document.querySelector('.doomguy_image')


doomGuyContainer.addEventListener('click', () => {
	if (started === false) {
		started = true
		doomGuyContainer.classList.remove('doomguy_click_pointer')
		initiateGodMode()
	}
})
