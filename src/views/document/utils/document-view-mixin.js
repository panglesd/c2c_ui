import DocumentViewHeader from './DocumentViewHeader';
import CommentsBox from './boxes/CommentsBox';
import ImagesBox from './boxes/ImagesBox';
import MapBox from './boxes/MapBox';
import RecentOutingsBox from './boxes/RecentOutingsBox';
import RoutesBox from './boxes/RoutesBox';
import ToolBox from './boxes/ToolBox';
import ActivitiesField from './field-viewers/ActivitiesField';
import DoubleNumericField from './field-viewers/DoubleNumericField';
import EventActivityField from './field-viewers/EventActivityField';
import FieldView from './field-viewers/FieldView';
import LabelValue from './field-viewers/LabelValue';
import MarkdownSection from './field-viewers/MarkdownSection';
import ProfilesLinks from './field-viewers/ProfilesLinks';

import constants from '@/js/constants';
import cooker from '@/js/cooker';
import imageUrls from '@/js/image-urls';
import isEditableMixin from '@/js/is-editable-mixin';
import utils from '@/js/utils';
import viewModeMixin from '@/js/view-mode-mixin';

export default {
  components: {
    DocumentViewHeader,

    CommentsBox,
    DoubleNumericField,
    FieldView,
    LabelValue,
    ActivitiesField,
    EventActivityField,
    MapBox,
    MarkdownSection,
    ProfilesLinks,
    RecentOutingsBox,
    ToolBox,
    RoutesBox,
    ImagesBox,
  },

  mixins: [viewModeMixin, isEditableMixin],

  props: {
    draft: {
      type: Object,
      default: null,
    },
    promise: {
      type: Object,
      default: null,
    },
    documentId: {
      type: Number,
      default: null,
    },
    documentType: {
      type: String,
      default: null,
    },
    fields: {
      type: Object,
      default: null,
    },
    expectedLang: {
      type: String,
      default: null,
    },
  },

  data() {
    return {};
  },

  computed: {
    /*
     * properties computed when document is loaded
     */
    document() {
      if (!this.promise || !this.promise.data) {
        return null;
      }

      const doc = this.isVersionView ? this.promise.data.document : this.promise.data;

      return doc;
    },

    version() {
      if (!this.promise.data || !this.isVersionView) {
        return null;
      }

      return this.promise.data.version;
    },

    locale() {
      return this.document ? this.document.cooked : null;
    },

    lang() {
      return this.document ? this.document.cooked.lang : null;
    },
  },
};
