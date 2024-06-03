import { defineStore, createPinia } from "pinia";
import type { Note } from "~/interfaces";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

export const app = createPinia()
app.use(piniaPluginPersistedState)


export const useNoteStore = defineStore("notes", {
  state: () => ({
    notes: [] as Note[],
  }),
  getters: {
    getNotesById: (state) => {
      return (id: number) => state.notes.find((note: Note) => note.id === id);
    },
  },
  actions: {
    addNote(title: string, content: string) {
      const id = this.notes.length
        ? this.notes[this.notes.length - 1].id + 1
        : 1;
      this.notes.push({ id, title, content });
    },
    deleteNote(id: number) {
      const index = this.notes.findIndex(item => item.id === id)
      if(index !== -1) {
        this.notes.splice(index, 1)
      }
    },
  },
});
