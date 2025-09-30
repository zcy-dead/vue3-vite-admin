<script setup>
import { useRouter } from "vue-router"

const router = useRouter()
const users = [
  { id: "1", name: "动态路由-1" },
  { id: "2", name: "动态路由-2" },
  { id: "3", name: "动态路由-3" },
  { id: "4", name: "动态路由-4" },
  { id: "5", name: "动态路由-5" },
  { id: "6", name: "动态路由-6" },
  { id: "7", name: "动态路由-7" },
  { id: "8", name: "动态路由-8" },
  { id: "9", name: "动态路由-9" },
  { id: "10", name: "动态路由-10" },
  { id: "11", name: "动态路由-11" },
  { id: "12", name: "动态路由-12" }

]

function goToUserProfile(userId) {
  router.push({ name: "UserProfileDetail", params: { id: userId } })
}
</script>

<template>
  <div class="app-container">
    <div class="button-container">
      <button v-for="user in users" :key="user.id" @click="goToUserProfile(user.id)" class="button">
        {{ user.name }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 600px;
  padding: 30px;
  background-color: var(--bg-color-primary);
}

.button-container {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
  gap: 30px;
}

.button {
  padding: 10px;
  border-radius: 4px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-primar);
  background-color: rgba(128, 128, 128, 0.5);
  border: none;
  flex: 1 1 calc(25% - 30px);
}

.button:hover {
  background-color: rgba(0, 195, 255, 0.404);
}
.button:active {
  color: var(--active-text-color);
  background-color: rgba(0, 195, 255, 0.404);
}
</style>
