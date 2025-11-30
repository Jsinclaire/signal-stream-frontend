<template>
  <q-page>
    <q-ajax-bar ref="ajaxBar" position="top" :dark="$q.dark.isActive" />

    <div class="q-pa-md">
      <q-toggle
        v-model="isDarkMode"
        label="Dark Mode"
        @change="toggleDarkMode"
      />
      <q-badge :color="markets.length > 0 ? 'green' : 'grey'" class="market-count">
        Markets Loaded: {{ markets.length }}
      </q-badge>
    </div>

    <div class="row q-col-gutter-md q-mx-md">

    </div>
  </q-page>
</template>

<script lang="ts">
import io from 'socket.io-client';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useQuasar } from 'quasar';

import type { MarketData } from '../interfaces/interfaces';

export default {
  name: 'MarketPanel',
  // components: {
  //   CardItem
  // },
  setup() {
    const $q = useQuasar();
    const socket = io('http://localhost:3000');
    const markets = ref<MarketData[]>([]);
    const isDarkMode = ref($q.dark.isActive);

    const ajaxBar = ref(null);

    const updateMarketData = (data: MarketData) => {
      const index = markets.value.findIndex(item => item.market === data.market);

      if (index !== -1) {
        markets.value[index] = data;
      } else {
        markets.value.push(data);
      }
    };

    onMounted(() => {
      socket.on('message', (data) => {
        updateMarketData(data);
      });
    });

    onBeforeUnmount(() => {
      socket.off('message', updateMarketData);
    });

    const getColumnClass = () => {
      if (window.innerWidth < 850) {
        return 'col-12';
      } else if (window.innerWidth < 1200) {
        return 'col-6';
      } else if (window.innerWidth < 1600) {
        return 'col-4';
      } else {
        return 'col-3';
      }
    };

    const toggleDarkMode = () => {
      $q.dark.set(isDarkMode.value);
    };

    watch(isDarkMode, (newVal) => {
      $q.dark.set(newVal);
    });

    return {
      markets,
      getColumnClass,
      isDarkMode,
      ajaxBar,
      toggleDarkMode
    };
  }
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}

.market-count {
  margin-left: 16px;
  font-size: 1.1em;
  vertical-align: middle;
}
</style>
