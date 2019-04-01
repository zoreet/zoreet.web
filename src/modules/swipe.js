// works only on touch devices
//
// based on https://stackoverflow.com/questions/2264072/detect-a-finger-swipe-through-javascript-on-the-iphone-and-android
document.addEventListener('touchstart', handleTouchStart, { passive: false })
document.addEventListener('touchmove', handleTouchMove, { passive: false })

var xDown = null
var yDown = null
var timeStart = null

var swipeLeftEvent = new Event('swipeLeft')
var swipeRightEvent = new Event('swipeRight')

function getTouches(evt) {
  return (
    evt.touches || evt.originalEvent.touches // browser API
  ) // jQuery
}

function handleTouchStart(evt) {
  // evt.preventDefault();
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
  timeStart = new Date()
}

function handleTouchMove(evt) {
  // evt.preventDefault();
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp
  var now = new Date()

  if (now - timeStart < 100) {
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        document.querySelector('.windows').dispatchEvent(swipeLeftEvent)
      } else {
        document.querySelector('.windows').dispatchEvent(swipeRightEvent)
      }
    } else {
      if (yDiff > 0) {
        console.log('swipeup')
      } else {
        console.log('swipedown')
      }
    }
  }

  /* reset values */
  xDown = null
  yDown = null
  timeStart = null
}
