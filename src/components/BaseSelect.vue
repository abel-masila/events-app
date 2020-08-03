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
import { formFieldMixin } from './../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
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
