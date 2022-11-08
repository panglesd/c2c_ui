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
import isEditableMixin from '@/js/is-editable-mixin';
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
    document: {
      type: Object,
      default: null,
    },

    documentType: {
      type: String,
      default: null,
    },

    version: {
      type: Object,
      default: null,
    },

  },

  computed: {
    fields() {
      return constants.objectDefinitions[this.documentType].fields;
    },

    locale() {
      return this.document ? this.document.cooked : null;
    },

    lang() {
      return this.document ? this.document.cooked.lang : null;
    },

    documentId() {
      return this.document ? this.document.document_id : null;
    },
  },

};
