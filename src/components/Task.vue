<template>
  <div class="task" :class="{active: task.done, focused: autofocus, important: important}">
    <div class="checkbox" @click="toggleTask"></div>
    <textarea
      class="input"
      type="text"
      v-model="task.title"
      @change="updateHeight"
      @keydown="updateHeight"
      @blur="doneEdit"
      @focus="editTask"
      @keydown.backspace="removeTask"
      @keydown.enter.prevent="doneEditWithEnter"
      @keyup.escape="cancelEdit"
      @paste="paste"
    ></textarea>
    <div class="label">{{ task.title }}</div>
  </div>
</template>

<script>
export default {
  name: 'Task',
  props: {
    task: Object,
    dayId: String,
    autofocus: Boolean,
    important: Boolean,
  },
  data() {
    return {
      beforeEditCache: '',
      input: null,
      label: null,
      isRemoved: false,
    }
  },
  mounted() {
    this.input = this.$el.querySelector('.input')
    this.label = this.$el.querySelector('.label')

    this.label.style.width = this.input.offsetWidth + 'px'

    this.updateHeight()

    if (this.autofocus) {
      this.$nextTick(() => {
        this.input.focus()
        this.input.setSelectionRange(
          this.input.value.length,
          this.input.value.length
        )
      })
    }
  },
  methods: {
    editTask() {
      this.beforeEditCache = this.task.title
    },
    doneEdit() {
      document.querySelector('.window--current').style.top = '0px'
      if (this.isRemoved) return

      this.task.title = this.task.title.trim()

      if (this.task.title !== this.beforeEditCache) {
        this.$emit('updateTask', this.task)
      }
      this.beforeEditCache = ''
    },
    doneEditWithEnter() {
      this.doneEdit()
      this.$emit('addEmptyTaskAfter', this.task)
    },
    cancelEdit() {
      this.task.title = this.beforeEditCache
      this.input.blur()
    },
    removeTask(e) {
      if (this.task.title.length == 0) {
        e.preventDefault()
        this.isRemoved = true
        // the last char of the previous task also get's removed
        // preventDefault alone didn't work on iOS safari
        // this solves the problem :)
        setTimeout(() => {
          this.$emit('removeTask', this.task)
        }, 50)
      }
    },
    toggleTask() {
      this.task.done = !this.task.done
      this.$emit('updateTask', this.task)
    },
    updateHeight() {
      this.$nextTick(() => {
        // this get's fired too soon, but having it prevents some flickering
        setTimeout(() => {
          // it's stupid, I know, but this is the only way I could get the textarea and div in sync
          this.input.style.height = this.label.offsetHeight + 'px'
        }, 10)
      })
    },
    paste() {
      setTimeout(() => {
        this.updateHeight()
      }, 50)
    },
  },
  watch: {
    autofocus() {
      this.input.focus()
      this.input.setSelectionRange(
        this.input.value.length,
        this.input.value.length
      )
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task {
  align-items: center;
  border-bottom: 1px solid var(--default);
  display: flex;
  font-size: 16px;
  line-height: 20px;
  outline: 0 none;
  padding: 12px 16px;
  position: relative;
}
.task.active,
.task:not(.important) {
  color: var(--default--text);
}
.task.important {
  color: var(--default--text--strong);
}
.task.sortable-ghost {
  background-color: var(--default--strong);
}
.task.sortable-drag,
.task.sortable-chosen:not(.task.sortable-ghost) {
  background-color: var(--default);
  border-bottom-color: transparent;
  opacity: 1 !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  /* box-shadow: 0 0 10px 10px var(--default); */
}

.task.sortable-ghost * {
  opacity: 0 !important;
}

.checkbox {
  border: 1px solid var(--default--text);
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  flex: 0 0 30px;
  height: 30px;
  margin-right: 16px;
  position: relative;
  width: 30px;
}

.task.active .checkbox {
  background-color: var(--accent);
  border-color: var(--accent);
}
.task.active .checkbox:after {
  border-bottom: 2px solid var(--default);
  border-left: 2px solid var(--default);
  content: '';
  display: block;
  height: 6px;
  left: 6px;
  position: absolute;
  top: 8px;
  transform: rotate(-45deg);
  width: 14px;
}

.input {
  background-color: transparent;
  border: 0 none;
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  height: 20px;
  line-height: 20px;
  margin: 0;
  min-height: 20px;
  padding: 0;
  resize: none;
  width: 100%;
}
.input:focus {
  color: var(--default--text--strong);
  outline: none;
}
.todos:not(.in-the-past) .input::-webkit-input-placeholder {
  /* Webkit */
  text-indent: -2px;
}
.label {
  background: var(--default);
  flex: 1 0 auto;
  line-height: 20px;
  min-height: 20px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  word-break: break-word;
}
</style>
