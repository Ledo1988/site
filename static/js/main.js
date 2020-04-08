/* eslint-env jquery */

/* signup popup */

var $sideMenu = document.querySelector('#side-menu')
var $overlay = document.querySelector('#overlay')
var hashTriggers = ['#menu', '#login', '#register']
var prices = {
  1: {
    annual: 115,
    monthly: 115,
    invocations: 10,
    volume: 25
  },
  2: {
    annual: 350,
    monthly: 350,
    invocations: 30,
    volume: 100
  },
  3: {
    annual: 700,
    monthly: 700,
    invocations: 100,
    volume: 200
  },
  4: {
    annual: 1150,
    monthly: 1150,
    invocations: 200,
    volume: 300
  }
}

checkHash()

$sideMenu.classList.add('register')

window.onpopstate = checkHash

function checkHash () {
  const hash = window.location.hash
  if (document.querySelector('#side-menu') == null) {
    $sideMenu = document.querySelector('#navigation')
  } else {
    if (hashTriggers.find(function (str) { return str === hash })) {
      $sideMenu.className = 'show'
      $overlay.classList.add('show')
      switch (hash) {
        case '#menu':
          $sideMenu.classList.add('menu')
          break
        case '#login':
          $sideMenu.classList.add('login')
          break
        case '#register':
          $sideMenu.classList.add('register')
          break
      }
    } else if (hash === '') {
      if ($sideMenu != null) { $sideMenu.className = '' }
      if ($overlay != null) { $overlay.className = '' }
    }
  }
}

function removeHash () {
  var state = ''
  var popStateEvent = new PopStateEvent('popstate', { state: state })
  history.pushState(state, document.title, window.location.pathname + window.location.search)
  dispatchEvent(popStateEvent)
}

$(document).ready(function () {
  const openArrow = '↑'
  const closeArrow = '↓'

  function smoothVisibility (li) {
    const $content = $(li).children('.description')
    const $arrow = $(li).find('.product-heading > span')
    $arrow.html(openArrow)
    $content.hasClass('hide') ? $content.removeClass('hide') : $content.addClass('hide')
  }

  function snapVisibility (li, show) {
    const $content = $(li).children('.description')
    const $arrow = $(li).find('.product-heading > span')
    $arrow.html(show ? openArrow : closeArrow)
    show ? $content.removeClass('hide') : $content.addClass('hide')
  }

  function closeAllOf (ul) {
    $(ul).children('li').each(function () {
      snapVisibility(this, false)
    })
  }

  $('.product-heading').on('click', function () {
    closeAllOf($(this).parent().parent())
    smoothVisibility($(this).parent(), true)
  })

  $('#navigation').on('show.bs.collapse', function () {
    $('nav').addClass('collapsedfully')
    $('html, body').css({ overflow: 'hidden', height: '100%' })
  })
  $('#navigation').on('hide.bs.collapse', function () {
    $('nav').removeClass('collapsedfully')
    $('html, body').css({ overflow: 'auto', height: 'auto' })
  })

  $('.clickable').on('click', function () {
    window.open($(this).find('a:first').attr('href'), '_self')
  })

  $('.clickable-blank').on('click', function (event) {
    event.preventDefault()
    window.open($(this).find('a:first').attr('href'), '_blank')
  })

  $('ul.sidemenu li a').on('click', function () {
    // $(this).parent('li').toggleClass('current-subject')
  })

  // full image width
  const contentWidth = $('.article-blog-wrap').width()
  $.each($('.article-full-width'), () => {
    var margin = ($(this).width() - contentWidth - 30) / 2
    $(this).css('margin-left', margin)
    $(this).css('margin-right', margin)
  })

  $('#custom').hide()
  $('#price-selector').on('change', function (e) {
    var selectedValue = $(this).val()
    if (selectedValue === 'custom') {
      $('#custom').show()
      $('#priced').hide()
    } else {
      $('#custom').hide()
      $('#priced').show()
      var priceLevel = prices[selectedValue]
      $('#annual-cost').html(priceLevel.annual)
      $('#monthly-cost').html(priceLevel.monthly)
      $('#volume').html(priceLevel.volume)
    }
  })

  // Allows bootstrap carousels to display 3 items per page rather than just one

  $('#carouselCaseStudies').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget)
    var idx = $e.index()
    var itemsPerSlide = 3
    var totalItems = $('#carouselCaseStudies .carousel-item').length
    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx)
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == 'left') {
          $(this).find('.carousel-item').eq(i).appendTo('.carousel-inner')
        } else {
          $(this).find('.carousel-item').eq(0).appendTo('.carousel-inner')
        }
      }
    }
  })

  // Allows bootstrap carousels to display 3 items per page rather than just one
  $('#carousel-example-multi').on('slide.bs.carousel', (e) => {
    const $e = $(e.relatedTarget)
    const idx = $e.index()
    const itemsPerSlide = 4
    const totalItems = $('.carousel-item').length
    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx)
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction === 'left') {
          $('.carousel-item').eq(i).appendTo('.carousel-inner')
        } else {
          $('.carousel-item').eq(0).appendTo('.carousel-inner')
        }
      }
    }
  })

  $('.smart-tabs a').click(function (event) {
    $(this).closest('.smart-tabs').find('dt').removeClass('current')
    $(this).closest('.smart-tabs').find('dd').removeClass('current')
    $(this).parent().addClass('current')
    $(this).parent().parent().find('dd').addClass('current')
    return false
  })

  if ($(window).width() > 767) {
    $('#carousel-example-multi').carousel({ interval: 4000 })
  }

  if ($('#price-slider').length > 0) {
    var slider = new Slider('#price-slider', {
      ticks: [1, 2, 3, 4],
      ticks_snap_bounds: 4,
      ticks_labels: ['25GB', '100GB', '200GB', '300GB'],
      formatter: function (value) {
        var priceLevel = prices[value]
        if (priceLevel) {
          if (value == 1) {
            $('.tooltip-main').addClass('first')
          } else {
            $('.tooltip-main').removeClass('first')
          }
          if (value == 4) {
            $('.tooltip-main').addClass('last')
          } else {
            $('.tooltip-main').removeClass('last')
          }

          if (priceLevel.annual == '0') {
            $('.no-price').removeClass('d-none')
            $('.has-price').addClass('d-none')
          } else {
            $('.has-price').removeClass('d-none')
            $('.no-price').addClass('d-none')
          }

          $('.custom-tooltip').remove()
          $('.tooltip-main').append('<div class="custom-tooltip"><span class="tooltip-value">' + priceLevel.volume + ' GB</span><span class="tooltip-desc">of ingested data</span><div>')
          $('#annual-cost').html(priceLevel.annual)
          $('#invocations').html(priceLevel.invocations)
          $('#logsize').html(priceLevel.volume)
          // return ;
        }
      },
      step: 1
    })
  }
  $('#price-slider').on('change', function (e) {
    var selectedValue = $(this).val()
    if (selectedValue === 'custom') {
      $('#custom').show()
      $('#priced').hide()
    } else {
      $('#custom').hide()
      $('#priced').show()
      var priceLevel = prices[selectedValue]
      $('#annual-cost').html(priceLevel.annual)
      $('#monthly-cost').html(priceLevel.monthly)
      $('#volume').html(priceLevel.volume)
    }
  })
  // acordion - add collapse class for all items
  $.each($('.accordion .card'), function (index, value) {
    if ($(this).find('.collapse').hasClass('hide')) {
      $(this).find('.card-header').find('h5').addClass('collapsed')
    }
    if (index == 0) {
      $(this).find('.card-header').find('h5').click()
    }
  })

  var $videoSrc
  $('.video-btn').click(function () {
    $videoSrc = $(this).data('src')
  })

  $('#demoModal').on('shown.bs.modal', function (e) {
    $('#video').attr('src', $videoSrc + '?rel=0&showinfo=0&modestbranding=1&amp;autoplay=1')
  })

  $('#demoModal').on('hide.bs.modal', function (e) {
    $('#video').attr('src', $videoSrc)
  })

  // blog-detailed CTA form
  if ($(window).width() < 1023) {
    $('body .blog-cta').insertBefore('.blog-cta__mobile')

    $('body .blog-cta__mobile').on('click', '.blog-cta__mobile-close', function (e) {
      $(this).parents('.blog-cta__mobile').addClass('inactive')
    })

    $('body .blog-cta__mobile').on('click', '.blog-cta__btn-modal', function (e) {
      $('body').find('.blog-cta').toggleClass('modal')
      $('body').toggleClass('overflow-hidden')
    })

    $(document).click(function (event) {
      if (!$(event.target).closest('.blog-cta__form, .blog-cta__btn-modal').length) {
        if ($('body').find('.blog-cta').hasClass('modal')) {
          $('body').find('.blog-cta').toggleClass('modal')
          $('body').toggleClass('overflow-hidden')
        }
      }
    })
  }

  $('body .blog-cta').on('click', '.blog-cta__btn-close', function (e) {
    if ($(window).width() > 1023) {
      $(this).parents('.blog-cta').addClass('inactive')
    } else {
      $('body').find('.blog-cta').toggleClass('modal')
      $('body').toggleClass('overflow-hidden')
    }
  })


})

// hello
let tl = new TimelineMax()
tl.set('.hero-info', {autoAlpha: 1})
  .staggerFromTo('.hero-info div > *', 1, {
    autoAlpha: 0,
    y: 50
  }, {
    autoAlpha: 1,
    y: 0,
    ease: Power4.easeOut
  }, 0.1)
