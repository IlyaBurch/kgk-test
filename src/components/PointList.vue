<template>
    <q-btn
    label="Добавить точку"
    @click="handleCreatePoint()"
    color="primary"
  />
  <q-virtual-scroll
    ref="virtualListRef"
    :items="store.points"
    class="scroll"
  >
    <template v-slot:default="{ item, index }">
      <q-item
        :key="index"
        clickable
        :active="item.id === currentPoint?.id"
        active-class="item-active"
        class="item"
        @click="store.setCurrentPoint(item)"
      >
        <q-item-section avatar>
          <q-checkbox
            :name="item.id.toString()"
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
import { computed, onBeforeMount, onMounted, ref } from 'vue';

const store = usePointsStore();
const currentPoint = computed(() => store.currentPoint);

// Ссылка на q-virtual-scroll
const virtualListRef = ref();

onBeforeMount(() => {
  store.generatePoints(100);
  console.log('Number of points:', store.points.length);

});

onMounted(() => {
  if (store.points.length < 10) {
    console.warn('Not enough points to fill the container');
  }
});

function handleCreatePoint (){
  store.createPoint();
  console.log(store.points)

  const index = store.points.length;

  nextTick(() => {
    virtualListRef.value.scrollTo(index);
  })
}

</script>

<style lang="scss">
.scroll {
  height: 400px;
}

.item {
  border: 1px solid plum;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  height: 70px;
  color: plum;

  &-active {
    border: 2px solid purple;
  }
}

</style>
