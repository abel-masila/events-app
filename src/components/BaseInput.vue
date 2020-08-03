<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      @input="updateValue"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from './../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
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
