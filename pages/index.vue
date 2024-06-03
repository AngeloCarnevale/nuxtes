<template>
  <main>
    <Header />
    <UContainer class="max-w-5xl flex flex-col">
      <UCard class="w-full">
        <form @submit.prevent="addNewNote">
          <div class="grid gap-4 ">
            <h1 class="font-semibold text-2xl">Title</h1>
            <UInput v-model="newTitle" placeholder="Some title" />
          </div>
          <div class="py-4 grid gap-2">
            <span>Content</span>
            <UTextarea placeholder="Some content" v-model="newContent" />
          </div>
          <div class="flex justify-center py-4">
            <UButton type="submit" icon="i-heroicons-plus" color="gray" variant="solid" class="px-10 py-2"
              label="Add note" />
          </div>
        </form>
      </UCard>
      <div>
        <ul class="pt-4">
          <li v-for="note in notes" :key="note.id" class="flex justify-between px-4 border-b border-gray-700 py-4">
            <span class="font-semibold">{{ note.title }}</span>
            <p class="truncate w-[100px]">{{ note.content }}</p>
            <UButton @click="deleteNote(note.id)" icon="i-heroicons-x-circle" color="white" variant="ghost" />
          </li>
        </ul>
      </div>


    </UContainer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()

const newTitle = ref('')
const newContent = ref('')

const notes = noteStore.notes

const addNewNote = () => {
  if (newTitle.value && newContent.value) {
    noteStore.addNote(newTitle.value, newContent.value)
    newTitle.value = ''
    newContent.value = ''
  }
}

const deleteNote = (id: number) => {
  noteStore.deleteNote(id)
  console.log(notes)
}

</script>