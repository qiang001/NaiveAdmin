import { Ref, watchEffect } from 'vue'
export const useGravityBall = (
  width: Ref<number>,
  height: Ref<number>,
  mainColors: string[],
  ifUnload: Ref<boolean>
): void => {
  // Initial Setup
  const canvas = document.querySelector('canvas')
  const c = canvas.getContext('2d')

  const colors = [...mainColors]

  const gravity = 0.2
  const friction = 0.98

  //   addEventListener('click', function (event) {
  //     init()
  //   })

  // Utility Functions
  function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Objects
  function Ball(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.update = function () {
      if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy
        this.dy = this.dy * friction
        this.dx = this.dx * friction
      } else {
        this.dy += gravity
      }

      if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx * friction
      }

      this.x += this.dx
      this.y += this.dy
      this.draw()
    }

    this.draw = function () {
      c.beginPath()
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      c.fillStyle = this.color
      c.fill()
      c.stroke()
      c.closePath()
    }
  }

  // Implementation
  let ballArray = []

  function init() {
    ballArray = []

    for (let i = 0; i < 600; i++) {
      const radius = randomIntFromRange(8, 20)
      const x = randomIntFromRange(radius, canvas.width - radius)
      const y = randomIntFromRange(0, canvas.height - radius)
      const dx = randomIntFromRange(-3, 3)
      const dy = randomIntFromRange(-2, 2)
      ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)))
    }
  }

  // Animation Loop
  function animate() {
    if (!ifUnload.value) {
      requestAnimationFrame(animate)
    }

    c.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < ballArray.length; i++) {
      ballArray[i].update()
    }
  }

  init()
  const initedAt = new Date().getTime()
  animate()

  watchEffect(() => {
    canvas.width = width.value || 0
    canvas.height = height.value || innerHeight
    if (new Date().getTime() - initedAt > 3000) {
      init()
    }
  })
}
