<template>
  <AdminLayout title="Bookings">
    <h2 class="text-2xl font-bold mb-4">List of bookingsss4</h2>
    <ul class="space-y-2">
      <li v-for="user in users" :key="user.id" class="p-2 bg-white shadow rounded">
        {{ user.name }} ({{ user.email }})
      </li>
    </ul>
  </AdminLayout>
</template>

<script setup>
  import AdminLayout from '@/Layouts/AdminLayout.vue'

  const users = [
    { id: 1, name: "Иван Иванов", email: "ivan@example.com" },
    { id: 2, name: "Петр Петров", email: "petr@example.com" }
  ]
</script>