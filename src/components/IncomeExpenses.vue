<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">{{ props.incomes }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">{{ props.expenses }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  incomes: {
    type: String,
    required: true,
  },
  expenses: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
