import Vue from 'vue';
import Router from 'vue-router';

import config from '@/js/config';
import constants from '@/js/constants';
import DocumentView from '@/views/document/DocumentView';
import DocumentsView from '@/views/documents/DocumentsView';
import DashboardView from '@/views/portals/DashboardView';
import FeedView from '@/views/portals/FeedView';
import SophiePictureContestView from '@/views/portals/SophiePictureContestView';
import OutingsStatsView from '@/views/portals/outings-stats/OutingsStatsView';
import NotFoundView from '@/views/static-views/NotFoundView';
import SeracView from '@/views/static-views/SeracView';
import TopoguideView from '@/views/static-views/TopoguideView';
import WorkInProgressView from '@/views/static-views/WorkInProgressView';
import AccountView from '@/views/user/AccountView';
import FollowingView from '@/views/user/FollowingView';
import LoginView from '@/views/user/LoginView';
import PreferencesView from '@/views/user/PreferencesView';

// lazy-load components
// actually, only diff is quite big, because of diff computation
// but lets group together this three views.
const AreaEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/AreaEditionView');
const ArticleEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/ArticleEditionView');
const BookEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/BookEditionView');
const ImageEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/ImageEditionView');
const MapEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/MapEditionView');
const OutingEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/OutingEditionView');
const ProfileEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/ProfileEditionView');
const RouteEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/RouteEditionView');
const WaypointEditionView = () =>
  import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/WaypointEditionView');
const XreportEditionView = () => import(/* webpackChunkName: "wiki-tools" */ '@/views/wiki/edition/XreportEditionView');
const WhatsNewView = () => import(/* webpackChunkName: "wiki-tools" */ `@/views/wiki/WhatsNewView.vue`);
const HistoryView = () => import(/* webpackChunkName: "wiki-tools" */ `@/views/wiki/HistoryView.vue`);
const AssociationsHistoryView = () =>
  import(/* webpackChunkName: "wiki-tools" */ `@/views/wiki/AssociationsHistoryView.vue`);
const DiffView = () => import(/* webpackChunkName: "wiki-tools" */ `@/views/wiki/DiffView.vue`);
const YetiView = () => import(/* webpackChunkName: "yeti" */ `@/views/portals/YetiView.vue`);

const routes = [
  { path: '/', name: 'home', component: FeedView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/topoguide', name: 'topoguide', component: TopoguideView },
  { path: '/feed', name: 'feed', component: FeedView },
  { path: '/serac', name: 'serac', component: SeracView },
  { path: '/whatsnew', name: 'whatsnew', component: WhatsNewView },
  { path: '/associations-history', name: 'associations-history', component: AssociationsHistoryView },
  { path: '/auth', name: 'auth', component: LoginView },
  { path: '/auth-sso', name: 'auth-sso', component: LoginView },
  { path: '/account', name: 'account', component: AccountView },
  { path: '/following', name: 'following', component: FollowingView },
  { path: '/preferences', name: 'preferences', component: PreferencesView },
  { path: '/yeti/:document_id(\\d+)?/:page?', name: 'yeti', component: YetiView },
  { path: '/outings-stats', name: 'outings-stats', component: OutingsStatsView },
  { path: '/sophie-picture-contest/:year(\\d+)?', name: 'sophie-picture-contest', component: SophiePictureContestView },

  { path: '/wip', name: 'workinprogress', component: WorkInProgressView },

  {
    path: '/forum',
    name: 'forum',
    beforeEnter() {
      location.href = config.urls.forum;
    },
  },
];

const addDocumentTypeView = function (def, editionComponent) {
  routes.push({
    path: '/' + def.documentType + 's',
    name: def.documentType + 's',
    component: DocumentsView,
  });

  routes.push({
    path: '/' + def.documentType + 's/:id(\\d+)/:lang?/:title?',
    name: def.documentType,
    component: DocumentView,
  });

  routes.push({
    path: '/' + def.documentType + 's/version/:id(\\d+)/:lang/:version',
    name: def.documentType + '-version',
    component: DocumentView,
  });

  routes.push({
    path: '/' + def.documentType + 's/history/:id(\\d+)/:lang',
    name: def.documentType + '-history',
    component: HistoryView,
  });

  routes.push({
    path: '/' + def.documentType + 's/edit/:id(\\d+)/:lang',
    name: def.documentType + '-edit',
    component: editionComponent,
  });

  routes.push({
    path: '/' + def.documentType + 's/add/:lang',
    name: def.documentType + '-add',
    component: editionComponent,
  });

  routes.push({
    path: '/' + def.documentType + 's/diff/:id(\\d+)/:lang/:versionFrom/:versionTo',
    name: def.documentType + '-diff',
    component: DiffView,
  });
};

addDocumentTypeView(constants.objectDefinitions.area, AreaEditionView);
addDocumentTypeView(constants.objectDefinitions.article, ArticleEditionView);
addDocumentTypeView(constants.objectDefinitions.book, BookEditionView);
addDocumentTypeView(constants.objectDefinitions.image, ImageEditionView);
addDocumentTypeView(constants.objectDefinitions.map, MapEditionView);
addDocumentTypeView(constants.objectDefinitions.outing, OutingEditionView);
addDocumentTypeView(constants.objectDefinitions.profile, ProfileEditionView);
addDocumentTypeView(constants.objectDefinitions.route, RouteEditionView);
addDocumentTypeView(constants.objectDefinitions.waypoint, WaypointEditionView);
addDocumentTypeView(constants.objectDefinitions.xreport, XreportEditionView);

routes.push({ path: '*', name: '404', component: NotFoundView });

Vue.use(Router);

const router = new Router({
  routes,
  mode: config.routerMode,

  scrollBehavior(to, from, savedPosition) {
    // https://router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
    // and
    // https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js

    let position = {};

    if (to.hash) {
      // actually, scroll behavior is not fired at initial load
      // so let document-view-mixin handle hash use case, as it's the
      // only use case for a new-born tab
      // See https://github.com/vuejs/vue-router/issues/2358

      // when it will be fixed, remove scrollToHash function, and simply replace the return by this two lines :

      //   position.selector = to.hash;
      //   position.offset = { y: 50 }; // navbar height

      return false;
    } else if (savedPosition) {
      position = savedPosition;
    } else {
      // don't need to wait any data, scroll to top
      return { x: 0, y: 0 };
    }

    // we'll wait for trigger-scroll event
    return new Promise((resolve) => {
      // we add an once handler on the event
      // view will trigger it once data are present
      this.app.$root.$once('trigger-scroll', () => {
        resolve(position);
      });
    });
  },
});

export default router;
