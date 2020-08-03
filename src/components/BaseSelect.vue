<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select
      type="text"
      @input="updateValue"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>
