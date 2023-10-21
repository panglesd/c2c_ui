<template>
  <div class="box no-print" v-if="isNormalView && documents.length !== 0">
    <div class="title is-2">
      <span v-translate>Associated Search</span>
    </div>

    <div v-for="(doc, i) of documents" :key="i">
      <component :is="link()" :class="current_index(i)" :[documentType]="doc" />
    </div>

    <div
      v-if="(!hideSeeAllResultsButton && documents.length) || showAddOutingButton"
      class="has-text-centered add-section"
    >
      <!-- <router-link -->
      <!--   :to="{ name: 'outings', query: allOutingsQuery }" -->
      <!--   class="button is-primary" -->
      <!--   v-if="!hideSeeAllResultsButton && documents.length" -->
      <!-- > -->
      <!--   <span v-translate>show all</span>&nbsp;<span class="badge">{{ totalOutings }}</span> -->
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import viewModeMixin from '@/js/view-mode-mixin';

export default {
  mixins: [viewModeMixin],

  props: {
    documentType: {
      type: String,
      default: '',
    },
    documents: {
      type: Array,
      default() {
        return [];
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    current_index(index) {
      if (index === this.index) return ['current-document'];
      else return [];
    },

    link() {
      return 'pretty-' + this.documentType + '-link';
    },
  },
};
</script>

<style scoped lang="scss">
.current-document {
  background-color: hsl(0deg, 0%, 85%);
}
</style>
