<template>
    <q-btn
    label="Добавить точку"
    @click="handleCreatePoint()"
    color="primary"
  />
  <q-virtual-scroll
    ref="virtualListRef"
    :items="store.points"
    separator
    class="scroll"
    :virtual-scroll-slice-size="50"
  >
    <template v-slot:default="{ item, index }">
      <q-item
        :key="index"
        clickable
        :class="{ 'bg-grey-2': store.selectedPoints.has(item.id) }"
        :active="item.id === currentPoint?.id"
        active-class="bg-purple-1 text-purple"
        @click="store.setCurrentPoint(item)"
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="store.selectedPoints"
            :val="item.id"
            @click.stop="store.setSelected(item.id)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.address }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-virtual-scroll>
</template>

<script setup lang="ts">
import { nextTick } from 'process';
import { usePointsStore } from 'src/stores/pointStore';
import { computed, ref } from 'vue';

const store = usePointsStore();
const currentPoint = computed(() => store.currentPoint);

// Ссылка на q-virtual-scroll
const virtualListRef = ref();

function handleCreatePoint (){
  store.createPoint();

  const index = store.points.length;

  nextTick(() => {
    virtualListRef.value.scrollTo(index);
  })
}

</script>

<style lang="scss">
.scroll {
  height: 400px; /* или height: 400px; */
  overflow: auto;
}
</style>
