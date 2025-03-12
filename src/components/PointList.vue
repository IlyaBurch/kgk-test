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
    virtual-scroll-slice-size="6"
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
import { computed, ref } from 'vue';

const store = usePointsStore();
const currentPoint = computed(() => store.currentPoint);

const virtualListRef = ref();

function handleCreatePoint (){
  store.createPoint();
  const index = store.totalPoints

  nextTick(() => {
    virtualListRef.value.scrollTo(index, 'start-force')
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
  // height: 70px;
  color: plum;

  &-active {
    border: 2px solid purple;
  }
}

</style>
