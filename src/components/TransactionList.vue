<!-- eslint-disable prettier/prettier -->
<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in props.transactions"
      v-bind:key="transaction.id"
      v-bind:class="transaction.amount < 0 ? 'minus' : 'plus'">
      {{ transaction.text }} <span>${{ transaction.amount }}</span
      ><button class="delete-btn" @click="deleteTransaction(transaction.id)">
        x
      </button>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["transactionDeleted"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const deleteTransaction = id => {
  emit("transactionDeleted", id);
};
</script>

<style lang="scss" scoped></style>
