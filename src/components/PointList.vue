<template>
  <div class="row justify-between items-center q-pa-md">
    <h4>Точки</h4>
    <div class="row items-center">
      <q-input v-if="searchMode" label="Поиск по названиям" v-model="inputQuery" @change="store.search(inputQuery)">
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="store.search(inputQuery)" />
        </template>
      </q-input>
      <q-btn v-if="!searchMode"
        flat
        round
        icon="search"
        @click="searchMode = !searchMode"
        color="primary"
      />
      <q-btn v-else
        flat
        round
        icon="cancel"
        @click="cancelSearch()"
        color="primary"
      />
    </div>
  </div>
  <q-checkbox
    name="selectAll"
    label="Выбрать все"
    v-model="store.isSelected"
    @update:model-value="handleAllSelected()"
  />
  <q-btn
    flat
    round
    icon="create"
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
        active-class="item-active primary"
        class="item"
        @click="store.setCurrentPoint(item)"
      >
        <q-item-section avatar>
          <q-checkbox
            :name="item.id.toString()"
            v-model="item.checked"
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
import { computed, ref, onMounted } from 'vue';

const store = usePointsStore();
const currentPoint = computed(() => store.currentPoint);

const virtualListRef = ref();

const searchMode = ref(false);

const inputQuery = ref<string>('')

function handleCreatePoint (){
  store.createPoint();
  const index = store.totalPoints

  nextTick(() => {
    virtualListRef.value.scrollTo(index, 'start-force')
  })
}

function cancelSearch() {
  store.search('');
  searchMode.value = false;
}


function handleAllSelected() {
  if (store.isSelected) {
    store.selectAll();
    store.isSelected = true;
  } else {
    store.unselectAll();
    store.isSelected = false;
  }
}

onMounted(() => {
  store.setFirstCurrent();
})
</script>

<style lang="scss">
.scroll {
  height: 400px;
}

.item {
  border: 1px solid $secondary;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  // height: 70px;
  color: $secondary;

  &-active {
    border: 2px solid $primary;
    color: $primary;
  }
}

</style>
