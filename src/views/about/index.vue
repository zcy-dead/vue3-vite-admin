<script setup lang="ts">

</script>

<template>
  <div class="app-contanier">
    <div>
      <div>
        <span class="title">
          Vue3-Vite-Admin
        </span>
      </div>
      <br>
      <p>
        是一个主要基于
        <a href="https://cn.vuejs.org/guide/introduction" target="_blank" class="vue"> Vue3</a>、
        <a href="https://cn.vitejs.dev/guide/" target="_blank" class="vite">Vite</a>、
        <a href="https://element-plus.org/zh-CN/component/overview.html" target="_blank" class="ep">Element-Plus</a>、
        <span class="ts">TypeScript</span>
        等前沿技术栈构建的现代化后台管理系统。它旨在为开发者提供一个高效、灵活且易于维护的开发框架，用于快速搭建功能丰富、性能卓越
        的后台管理应用。通过集成多种强大的技术组件和工具，该系统能够满足不同业务场景下的数据展示、操作与管理需求，同时具备良好的可
        扩展性和可定制性，方便开发者根据具体项目要求进行二次开发和优化。
      </p>
    </div>
    <br>
    <br>
    <br>
    <div>
      <h2>路由管理</h2>
      <br>
      <p>路由结构：</p>
      <p>│  └── 📂 router/</p>
      <p>│    ├── 📄 config.ts</p>
      <p>│    ├── 📄 guard.ts</p>
      <p>│    ├── 📄 index.ts</p>
      <p>│    ├── 📄 whiteList.ts</p>
    </div>
    <br>
    <p>1.📄 whiteList.ts:白名单</p>
    <br>
    <p>用于判断用户访问的路由是否属于免登录白名单，从而决定用户是否可以在未登录的状态下访问某些页面。<br>其中定义了两个白名单数组：<br>whiteListByPath：通过路由的路径（path）来定义免登录白名单。<br>whiteListByName：通过路由的名称（name）来定义免登录白名单。<br>然后，定义了一个名为isWhiteList的函数用于判断这个路由是否在免登录白名单中。</p>
    <br>
    <p>2.📄 config.ts:路由配置设置</p>
    <br>
    <p>用于设置Vue Router的路由模式（根据环境变量VITE_ROUTER_HISTORY选择hash模式或HTML5模式，并设置base路径为VITE_PUBLIC_PATH），以及是否开启动态路由功能（dynamic字段）</p>
    <br>
    <p>3.📄 guard.ts:全局路由守卫</p>
    <br>
    <p><strong>前置守卫beforeEach逻辑</strong>：<br><strong>未登录情况</strong>：检查用户是否有令牌（getToken），如果没有令牌：<br>--如果目标路由在免登录白名单（isWhiteList）中，允许访问。<br>--否则，重定向到登录页面（LOGIN_PATH）。<br><strong>已登录访问登录页</strong>：如果用户已登录且目标路由是登录页，重定向到首页（HOME_PATH）。<br><strong>已获取角色信息</strong>：如果用户已登录且角色信息已获取（userStore.roles.length !== 0），直接放行。<br><strong>需要获取角色信息</strong>：如果用户已登录但角色信息未获取：<br>--尝试获取用户信息（userStore.getInfo）。<br>--根据用户角色动态生成可访问路由（permissionStore.setPermissionRoutes或permissionStore.setAllRoutes）。<br>--将动态路由添加到路由表中（router.addRoute）。<br>--重定向到目标路由，且不保留历史记录（replace: true）。<br>--如果获取用户信息失败，重置令牌并重定向到登录页，同时显示错误消息。<br><strong>后置守卫afterEach逻辑</strong>：<br>监听路由变化，调用setRouteChange更新路由状态。<br>完成页面加载进度条（NProgress.done）。</p>
    <br>
    <p>4.📄 index.ts:路由配置</p>
    <br>
    <p>定义了Vue应用的路由配置，包含静态路由constantRoutes和动态路由dynamicRoutes。此外，还设置了路由模式和全局路由守卫，并提供了resetRouter函数用于重置动态路由。</p>
  </div>
</template>

<style lang="scss" scoped>
.app-contanier {
  width: 100%;
  padding: 50px;
  background-color: var(--bg-color-primary);
  .title {
    font-size: 40px;
    font-weight: bolder;
    font-style: italic;
  }
  p {
    font-size: 18px;
  }
  .vue {
    color: #42b883;
    background-color: rgba(127, 255, 212, 0.3);
    border-radius: 4px;
    padding: 0 6px;
  }
  .vite {
    color: #75b93f;
    background-color: rgba(155, 243, 155, 0.3);
    border-radius: 4px;
    padding: 0 6px;
  }
  .ep {
    color: #9499ff;
    background-color: rgba(118, 99, 241, 0.3);
    border-radius: 4px;
    padding: 0 6px;
  }
  .ts {
    color: rgb(248, 130, 248);
    background-color: rgba(241, 99, 220, 0.3);
    border-radius: 4px;
    padding: 0 6px;
  }
}
</style>
