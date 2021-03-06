        

    var doc = document,
      slideList = doc.querySelectorAll('.slider-container > div'),
      pageNavContainer = doc.querySelector('.nav'),
      pageNav = doc.querySelector('.nav ul'),
      toggleHandle = doc.querySelector('.nav-toggle-handle'),
      divider = window.innerHeight / 2,
      scrollTimer,
      resizeTimer;

    toggleHandle.onclick = function () {
    var classN = pageNavContainer.className;
    pageNavContainer.className = (classN.indexOf(' active') > 0) ? classN.replace(' active', '') : classN + ' active';
    };

    if (window.addEventListener) {
    window.addEventListener('scroll', function () {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(function () {
        [].forEach.call(slideList, function (el) {
          var rect = el.getBoundingClientRect(),
              navLink = pageNav.querySelector('[href="#' + el.id + '"]');
          if (rect.top <= divider && rect.bottom > divider) {
            if (navLink.className !== 'active') { navLink.className = 'active'; }
          } else {
            if (navLink.className !== '') { navLink.className = ''; }
          }
        });
      }, 100);
    });

    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(function () {
        divider = window.innerHeight / 2;
      }, 100);
    });

    pageNav.addEventListener('click', function () {
      var classN = pageNavContainer.className;
      if (classN.indexOf(' active') > 0) { pageNavContainer.className = classN.replace(' active', ''); }
    });
    }

    var mobile = 'false',
      isTestPage = false,
      isDemoPage = true,
      classIn = 'jello',
      classOut = 'rollOut',
      speed = 400,
      doc = document,
      win = window,
      ww = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
      fw = getFW(ww),
      initFns = {},
      sliders = new Object(),
      edgepadding = 50,
      gutter = 10;

    function getFW (width) {
    var sm = 400, md = 900, lg = 1400;
    return width < sm ? 150 : width >= sm && width < md ? 200 : width >= md && width < lg ? 300 : 400;
    }
    window.addEventListener('resize', function() { fw = getFW(ww); });
    </script>
    <script src="js/tiny-slider.js"></script>
    <script>

    // <script type="module">
    // import { tns } from '../src/tiny-slider.js';

    var options = {
    'responsive': {
      items: 2,
      controls: false,
      responsive: {
        350: {
          items: 3,
          controls: true,
          edgePadding: 30,
        },
        500: {
          items: 4
        }
      },
    },
    'responsive1': {
      container: '',
      gutter: 10,
      slideBy: 1,
      responsive: {
        350: {
          items: 2,
          edgePadding: 20,
        },
        500: {
          items: 3,
          gutter: 0,
          edgePadding: 40,
          slideBy: 'page',
        }
      },
    },
    'responsive2': {
      items: 3,
      autoplayTimeout: 350,
      responsive: {
        350: {
          controls: false,
          autoplay: true,
          autoplayTimeout: 1000,
          autoplayHoverPause: true,
        },
        500: {
          nav: false,
          controls: true,
          autoplay: false,
        }
      },
    },
    'responsive3': {
      items: 3,
      autoplay: true,
      responsive: {
        350: {
          controlsText: ['&lt;', '&gt;'],
          autoplayText: ['&gt;', '||'],
        },
        500: {
          controlsText: ['prev', 'next'],
          autoplayText: ['start', 'stop'],
        }
      },
    },
    'responsive4': {
      items: 3,
      responsive: {
        350: {
          touch: false,
          mouseDrag: false,
          arrowKeys: false,
        },
        500: {
          touch: true,
          mouseDrag: true,
          arrowKeys: true,
        }
      },
    },
    'responsive5': {
      fixedWidth: fw,
      autoHeight: false,
      responsive: {
        350: {
          autoHeight: true,
          fixedWidth: fw + 100,
        }
      },
    },

    'autoHeight': {
      container: '',
      autoHeight: true,
      items: 1,
      controls: false,
    },

    'center': {
      container: '',
      items: 1,
      center: true,
      loop: false,
      controls: false,
      navAsThumbnails: true,
      controlsContainer: '#customize-controls',
      navContainer: '#customize-thumbnails',
      autoplay: false,
      autoplayTimeout: 1000,
      autoplayButton: '#customize-toggle',
    },

    'customize': {
      container: '',
      items: 1,
      autoHeight: true,
      center: true,
      controlsContainer: '#customize-controls',
      navContainer: '#customize-thumbnails',
      navAsThumbnails: true,
      autoplay: false,
      autoplayTimeout: 1000,
      autoplayButton: false,
      loop: true,
    },
    };

    for (var i in options) {
    var item = options[i];
    item.container = '#' + i;
    item.swipeAngle = false;
    if (!item.speed) { item.speed = speed; }

    if (doc.querySelector(item.container)) {
      sliders[i] = tns(options[i]);

      // call test functions
      if (isTestPage && initFns[i]) { initFns[i](); }

      // insert code
      if (isDemoPage) {
        doc.querySelector('#' + i + '_wrapper').insertAdjacentHTML('beforeend', '<pre><code class="language-javascript">' + JSON.stringify(item, function (key, value) {
          if (typeof value === 'object') {
            if (value.id) {
              return "document.querySelector('#" + value.id + "')";
            }
          }
          return value;
        }, '  ') + '<\/code><\/pre>');
      }

    // test responsive pages
    } else if (i.indexOf('responsive') >= 0) {
      if (isTestPage && initFns[i]) { initFns[i](); }
    }
    }

    // goto
    if (doc.querySelector('#base_wrapper')) {
    var goto = doc.querySelector('#base_wrapper .goto-controls'),
        gotoBtn = goto.querySelector('.button'),
        gotoInput = goto.querySelector('input');

    gotoBtn.onclick = function (event) {
      var index = gotoInput.value;
      sliders['base'].goTo(index);
    };
    }