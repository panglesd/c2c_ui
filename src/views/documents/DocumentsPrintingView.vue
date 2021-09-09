<template>
  <div class="section documents-view">
    <html-header :title="getDocumentTypeTitle(documentType)" />

    <div class="documents-container">
      <div v-for="(doc, index) in promises" :key="index" class="column">
        <component
          :is="documentType + '-view'"
          :document-type="doc.documentType"
          :version="doc.version"
          :promise="doc.promise"
          :document-id="doc.documentId"
          :expected-lang="doc.expectedLang"
          :fields="doc.fields"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import c2c from '@/js/apis/c2c';
import constants from '@/js/constants';
import AreaView from '@/views/document/AreaView';
import ArticleView from '@/views/document/ArticleView';
import BookView from '@/views/document/BookView';
import ImageView from '@/views/document/ImageView';
import MapView from '@/views/document/MapView';
import OutingView from '@/views/document/OutingView';
import ProfileView from '@/views/document/ProfileView';
import RouteView from '@/views/document/RouteView';
import WaypointView from '@/views/document/WaypointView';
import XreportView from '@/views/document/XreportView';

export default {
  name: 'DocumentsPrintingView',

  components: {
    AreaView,
    ArticleView,
    BookView,
    ImageView,
    MapView,
    OutingView,
    ProfileView,
    RouteView,
    WaypointView,
    XreportView,
  },

  data() {
    return {
      promise: null,
      promises: [],
    };
  },

  computed: {
    documentType() {
      return this.$route.name.slice(0, -'s-print'.length);
    },
  },

  watch: {
    $route: {
      handler: 'load',
      immediate: true,
    },
  },

  methods: {
    load() {
      this.promise = c2c[this.documentType].getAll(this.$route.query).then(() => {
        this.promises = this.promise.data.documents.map((doc) => {
          return {
            promise: c2c[this.documentType].getCooked(
              doc.document_id,
              this.$route.params.lang ?? this.$language.current
            ),
            documentId: doc.document_id,
            expectedLang: this.$route.params.lang ?? this.$language.current,
            documentType: this.documentType,
            version: null,
            fields: constants.objectDefinitions[this.documentType].fields,
          };
        });
        Promise.all(this.promises).then(() => {
          Vue.nextTick(function () {
            window.print();
          });
        });
      });
    },

    getDocumentTypeTitle(documentType) {
      return this.$gettext(documentType + 's');
    },
  },
};
</script>
