<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :incomes="incomes" :expenses="expenses" />
    <TransactionList
      :transactions="transactions"
      @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { formatNumber } from "./helpers/format-number";
import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from "vue";
import { v4 } from "uuid";

const toast = useToast();
const transactions = ref([]);

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

const total = computed(() => {
  return transactions.value.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
});

const incomes = computed(() => {
  const totalIncomes = transactions.value
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
  return formatNumber(totalIncomes);
});

const expenses = computed(() => {
  const totalExpenses = transactions.value
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
  return formatNumber(totalExpenses);
});

/** Pushes any transaction to transactions array */
const handleTransactionSubmitted = transaction => {
  transactions.value.push({
    id: generateUID(),
    text: transaction.text,
    amount: transaction.amount,
  });
  saveTransactionsToLocalStorage();
  toast.success("Transaction added! 🎉");
};

/** Filter's any transaction with the given id */
const handleTransactionDeleted = id => {
  transactions.value = transactions.value.filter(
    transaction => transaction.id !== id,
  );
  saveTransactionsToLocalStorage();
  toast.success("Transaction deleted! 🎉");
};

/** Generates a very simple uid */
const generateUID = () => {
  return v4();
};

/** Saves a transaction in the localstorage */
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
