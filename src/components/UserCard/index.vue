<script setup lang="ts">
import { ElMessageBox } from "element-plus"

import { useUserStore } from "@/pinia/stores/user"
import router from "@/router/index"

const userStore = useUserStore()
function logout() {
  ElMessageBox.confirm(`您确定要退出系统吗`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    userStore.logout()
    router.push("/login")
  })
}
</script>

<template>
  <div>
    <el-dropdown popper-class="user-dropdown-popper" placement="bottom-end">
      <div class="main">
        <el-avatar :size="30">
          <el-icon class="usericon" :size="15">
            <UserFilled />
          </el-icon>
        </el-avatar>
      </div>
      <template #dropdown>
        <div class="card">
          <div class="userinfo">
            <el-avatar :size="40">
              <el-icon class="usericon" :size="15">
                <UserFilled />
              </el-icon>
            </el-avatar>
            <div class="detail">
              <span>{{ userStore.username }}</span>
              <span>{{ userStore.email }}</span>
            </div>
          </div>
          <el-divider />
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon>
                <User />
              </el-icon>
              <span>个人中心</span>
            </el-dropdown-item>
          </el-dropdown-menu>
          <el-divider />
          <button @click="logout" class="logout">
            退出登录
          </button>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
 .main {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  margin: 0 5px;
  .el-avatar {
    .usericon {
      color: gray !important;
    }
  }
}

.card {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .el-divider {
    margin: 0px;
  }
  .userinfo {
    display: flex;
    align-items: center;
    margin: 20px 0;
    .el-avatar {
      margin-right: 10px;
      .usericon {
        color: gray !important;
      }
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > span:nth-child(1) {
        font-size: 15px;
        color: var(--layout-navigationbar-text-color);
        font-weight: bold;
      }

      & > span:nth-child(2) {
        font-size: 12px;
        color: var(--text-color-secondary);
        font-style: italic;
      }
      span {
        font-size: 16px;
        color: var(--layout-navigationbar-text-color);
      }
    }
  }
  .logout {
    width: 100%;
    font-size: 13px;
    padding: 4px 0;
    border: 1px solid #cccccc;
    color: var(--layout-navigationbar-text-color);
    background-color: var(--bg-color-quaternary);
    margin: 20px 0px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    &:hover {
      background-color: var(--hover-bg-color);
    }
  }
}
</style>
