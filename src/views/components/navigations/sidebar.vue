<template>
    <nav class="sidebar bg-sidebar p-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link class="nav-link txt-link" to="/dashboard/home">Home</router-link>
            </li>
        </ul>
    </nav>
</template>
<style scoped>
    .bg-sidebar {
        background-color: #343a40;
    }
    .txt-link {
        color: rgba(255, 255, 255, 0.5);
    }
</style>
<script setup>
</script>