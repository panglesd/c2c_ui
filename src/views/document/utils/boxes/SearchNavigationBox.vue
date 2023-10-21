<template>
  <div class="box no-print" v-if="isNormalView && documents.length !== 0">
    <div class="title is-2">
      <span v-translate>Associated Search</span>
    </div>

    <div v-for="(doc, i) of documents" :key="i">
      <component v-if="i <= to && i >= from" :is="link" :class="current_index(i)" :[documentType]="doc" />
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

  computed: {
    link() {
      return 'pretty-' + this.documentType + '-link';
    },

    // We show 10 results centered in index.
    from() {
      // If there are less than 5 results after index, we show more results before
      return this.index - 5 - Math.max(0, this.index + 1 + 5 - this.documents.length);
    },

    to() {
      // If there are less than 5 results before index, we show more results after
      return this.documents.length, this.index + 5 + Math.max(0, 5 - this.index);
    },
  },

  methods: {
    current_index(index) {
      if (index === this.index) return ['current-document'];
      else return [];
    },
  },
};
</script>

<style scoped lang="scss">
.current-document {
  background-color: hsl(0deg, 0%, 85%);
}
</style>
