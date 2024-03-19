const Progressbar = () => {
  const Progressbar = {
    status: null,
    settings: {
      trickleSpeed: 800,
      skipFirstLoad: false,
    },
  };
  Progressbar.configure = (options) => {
    Progressbar.settings = Object.assign({}, Progressbar.settings, options);
  };
  Progressbar.set = (n) => {
    const started = typeof Progressbar.status === 'number';

    n = clamp(n, 0.08, 1);
    Progressbar.status = n === 1 ? null : n;

    const progress = Progressbar.render(!started);
    const bar = progress.querySelector('.v-p-bar');
    const speed = 200;

    progress.offsetWidth; /* Repaint */

    queue(function (next) {
      // Add transition
      css(bar, {
        transform: `translate3d(${toBarPerc(n)}%,0,0)`,
        transition: `all ${speed}ms ease`,
      });

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1,
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(() => {
          css(progress, {
            transition: `all ${speed}ms linear`,
            opacity: 0,
          });
          setTimeout(() => {
            Progressbar.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });
  };
  Progressbar.start = () => {
    if (!Progressbar.status) {
      Progressbar.set(0);
    }

    const work = () => {
      setTimeout(() => {
        if (!Progressbar.status) {
          return;
        }

        Progressbar.trickle();
        work();
      }, Progressbar.settings.trickleSpeed);
    };

    work();
  };
  Progressbar.done = () => {
    Progressbar.inc(0.3 + 0.5 * Math.random());
    Progressbar.set(1);
  };
  Progressbar.inc = (amount) => {
    let n = Progressbar.status;

    if (!n) {
      return Progressbar.start();
    } else if (n > 1) {
      return () => {};
    } else {
      if (typeof amount !== 'number') {
        if (n >= 0 && n < 0.2) {
          amount = 0.1;
        } else if (n >= 0.2 && n < 0.5) {
          amount = 0.04;
        } else if (n >= 0.5 && n < 0.8) {
          amount = 0.02;
        } else if (n >= 0.8 && n < 0.99) {
          amount = 0.005;
        } else {
          amount = 0;
        }
      }

      n = clamp(n + amount, 0, 0.994);
      return Progressbar.set(n);
    }
  };
  Progressbar.trickle = () => {
    return Progressbar.inc();
  };
  Progressbar.render = (fromStart) => {
    if (document.getElementById('v-progressbar')) {
      return document.getElementById('v-progressbar');
    }

    const progress = document.createElement('div');
    progress.id = 'v-progressbar';
    progress.innerHTML =
      '<div class="v-p-bar"><div class="v-p-peg"></div></div>';

    const bar = progress.querySelector('.v-p-bar');
    const perc = fromStart ? '-100' : toBarPerc(Progressbar.status || 0);

    css(bar, {
      transition: 'all 0 linear',
      transform: `translate3d(${perc}%,0,0)`,
    });

    document.querySelector('body').appendChild(progress);
    return progress;
  };
  Progressbar.remove = () => {
    const progress = document.getElementById('v-progressbar');
    progress && removeElement(progress);
  };

  const clamp = (n, min, max) => {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  };
  const toBarPerc = (n) => {
    return (-1 + n) * 100;
  };
  const queue = (() => {
    const pending = [];

    const next = () => {
      const fn = pending.shift();
      if (fn) {
        fn(next);
      }
    };

    return (fn) => {
      pending.push(fn);
      if (pending.length === 1) {
        next();
      }
    };
  })();
  const css = (() => {
    return (element, properties) => {
      Object.keys(properties).forEach((name) => {
        element.style[name] = properties[name];
      });
    };
  })();
  const removeElement = (element) => {
    element && element.parentNode && element.parentNode.removeChild(element);
  };

  return Progressbar;
};
const VueProgressbar = Progressbar();

export default {
  /**
   * install function
   * @param app
   * @param options
   */
  install(app, options = {}) {
    const vueVersion = Number(app.version.split('.')[0]);
    if (vueVersion < 3) {
      return new Error('Vue version at least 3.0');
    }

    const config = Object.assign({ router: true }, options);
    const global = app.config.globalProperties;
    VueProgressbar.configure(options);
    let isFirstTime = VueProgressbar.settings.skipFirstLoad;
    global.$Progressbar = VueProgressbar;
    if (config.router && typeof window !== 'undefined' && global.$router) {
      global.$router.beforeEach(() => {
        if (isFirstTime) {
          return;
        }
        global.$Progressbar.start();
      });
      global.$router.afterEach(() => {
        if (isFirstTime) {
          isFirstTime = false;
          return;
        }
        global.$Progressbar.done();
      });
    }

    app.provide('Progressbar', VueProgressbar);
  },
};

export { VueProgressbar };
