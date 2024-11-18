<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink :to="{ name: 'calendar' }">Calendar</RouterLink>
    </nav>
  </div>
</template>

<script setup></script>

<style scoped>
nav {
  text-align: center;
}
nav a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}
nav a.router-link-exact-active {
  color: #42b983;
}
</style>
