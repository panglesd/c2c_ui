<template>
  <div class="box no-print" v-if="isNormalView">
    <div class="title is-2">
      <span v-translate>Search</span>
    </div>

    <div v-for="(outing, i) of outings" :key="i">
      <component :is="link()" :class="current_index(i)" :[documentType]="outing" :query="$route.query" />
    </div>

    <div
      v-if="(!hideSeeAllResultsButton && outings.length) || showAddOutingButton"
      class="has-text-centered add-section"
    >
      <router-link
        :to="{ name: 'outings', query: allOutingsQuery }"
        class="button is-primary"
        v-if="!hideSeeAllResultsButton && outings.length"
      >
        <span v-translate>show all</span>&nbsp;<span class="badge">{{ totalOutings }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import viewModeMixin from '@/js/view-mode-mixin';

export default {
  mixins: [viewModeMixin],

  props: {
    documentType: { default: '' },
    outings: { default: [1, 2, 3] },
    index: { default: 0 },
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
  background-color: hsl(0, 0, 85%);
}
</style>
