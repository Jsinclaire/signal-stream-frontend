<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <main-panel/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import MainPanel from './components/MainPanel.vue';

export default {
  name: 'LayoutDefault',
  components: {
    MainPanel
  },
}
</script>
