/* global $ */
(function () {
  // define scroll function here

  function disableModalAndScroll (event, scrollTarget, scrollModal) {
    event.preventDefault()
    $(scrollModal).modal('hide')
    $('html, body').animate({ scrollTop: $(scrollTarget).offset().top }, 500)
    return false
  }

  $('[data-scroll-target]').each((index, elem) => {
    let $elem = $(elem)
    let scrollTarget = $elem.data('scroll-target')
    let scrollModal = $elem.data('scroll-modal')

    $elem.on('click', (event) => disableModalAndScroll(event, scrollTarget, scrollModal))
    // let scrollTarget = elem.
    // add event listener that call scroll function
  })
}())
