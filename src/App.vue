<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios'
import Character from './interface/Character'
import MetaData from './interface/MetaData'

interface ApiData {
  results: Array<Character>;
  info: MetaData;
}

const characters = ref<Array<Character>>([])
const metaData = ref<MetaData>({
  count: 0,
  pages: 0,
  next: '',
  prev: '',
})
const scrollComponent = ref<any>(null)
const isLoading = ref<boolean>(true)

const fetchCharacters = async (url: string) => {
  isLoading.value = true
  const controller = new AbortController()
  const { data }: { data: ApiData } = await axios({
    url,
    signal: controller.signal
  })

  metaData.value = await data.info
  characters.value.push(...data.results)
  isLoading.value = false
}

const handleScroll = () => {
  const element = scrollComponent.value
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    fetchCharacters(metaData.value.next)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchCharacters('https://rickandmortyapi.com/api/character')
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="scrollComponent">
    <div v-for="character in characters" :key="character.id">
      <img :src="character.image" />
      <p>
        {{ character.name }}
      </p>
    </div>

    <div v-if="isLoading">
      <p>
        Loading more characters
      </p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
