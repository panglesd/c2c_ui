const BREAKPOINT_MOBILE = 768;
const BREAKPOINT_TABLET = 1023;
const BREAKPOINT_DESKTOP = 1215;
const BREAKPOINT_WIDESCREEN = 1407;

export default function install(Vue) {
  Vue.prototype.$screen = new Vue({
    name: 'Screen',

    data() {
      return {
        matchingQueryIndex: -1,
        hasHeightForAd: false,
      };
    },

    // https://bulma.io/documentation/modifiers/responsive-helpers/
    computed: {
      isMobile() {
        return this.matchingQueryIndex === 0;
      },
      isTablet() {
        return this.matchingQueryIndex === 1;
      },
      isDesktop() {
        return this.matchingQueryIndex === 2;
      },
      isWidescreen() {
        return this.matchingQueryIndex === 3;
      },
      isFullHD() {
        return this.matchingQueryIndex === -1;
      },
    },

    created() {
      this.breakpointsMediaQueryLists = [
        BREAKPOINT_MOBILE,
        BREAKPOINT_TABLET,
        BREAKPOINT_DESKTOP,
        BREAKPOINT_WIDESCREEN,
      ].map((breakpoint) => window.matchMedia(`only screen and (max-width: ${breakpoint}px)`));
      this.breakpointsMediaQueryLists.forEach((mediaQueryList) => {
        if (mediaQueryList.addEventListener) {
          mediaQueryList.addEventListener('change', this.onBreakpointMediaQueryChange);
        } else {
          // support Safari < 14
          mediaQueryList.addListener(this.onBreakpointMediaQueryChange);
        }
      });
      this.onBreakpointMediaQueryChange(); // init

      this.heightMediaQueryList = window.matchMedia('only screen and (min-height: 630px');
      if (this.heightMediaQueryList.addEventListener) {
        this.heightMediaQueryList.addEventListener('change', this.onHeightMediaQueryChange);
      } else {
        // support Safari < 14
        this.heightMediaQueryList.addListener(this.onHeightMediaQueryChange);
      }
      this.onHeightMediaQueryChange(); // init
    },

    beforeDestroy() {
      this.breakpointsMediaQueryLists.forEach((mediaQueryList) => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', this.onBreakpointMediaQueryChange);
        } else {
          mediaQueryList.removeListener(this.onBreakpointMediaQueryChange);
        }
      });
      if (heightMediaQueryList.removeEventListener) {
        heightMediaQueryList.removeEventListener('change', this.onHeightMediaQueryChange);
      } else {
        heightMediaQueryList.removeListener(this.onHeightMediaQueryChange);
      }
    },

    methods: {
      onBreakpointMediaQueryChange() {
        this.matchingQueryIndex = this.breakpointsMediaQueryLists.findIndex((mediaQueryList) => mediaQueryList.matches);
      },

      onHeightMediaQueryChange() {
        this.hasHeightForAd = this.heightMediaQueryList.matches;
      },
    },
  });
}
