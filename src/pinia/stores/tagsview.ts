import type { TagView } from "@/types/tagView"
import { defineStore } from "pinia"
import { ref, watchEffect } from "vue"
import { getCachedViews, getVisitedViews, setCachedViews, setVisitedViews } from "@/utils/localStorage"
import { useSettingStore } from "./setting"

export const useTagsViewStore = defineStore("tagsview", () => {
  const settingStore = useSettingStore()

  const visitedViews = ref<TagView[]>(settingStore.cacheTagsView ? getVisitedViews() : [])

  const cachedViews = ref<string[]>(settingStore.cacheTagsView ? getCachedViews() : [])

  /** 初始化访问和缓存标签栏数据 */
  watchEffect(() => {
    setVisitedViews(visitedViews.value)
    setCachedViews(cachedViews.value)
  })

  // 添加访问标签栏数据
  const addVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      visitedViews.value[index].fullPath !== view.fullPath && (visitedViews.value[index] = { ...view })
    } else {
      visitedViews.value.push({ ...view })
    }
  }

  // 删除访问标签栏数据
  const delVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      visitedViews.value.splice(index, 1)
    }
  }

  // 删除其他访问标签栏数据
  const delOthersVisitedViews = (view: TagView) => {
    visitedViews.value = visitedViews.value.filter(v => v.meta?.affix || v.path === view.path)
  }

  // 删除所有访问视图
  const delAllVisitedViews = () => {
    visitedViews.value = visitedViews.value.filter(tag => tag.meta?.affix)
  }

  // 添加缓存标签栏数据
  const addCachedView = (view: TagView) => {
    if (typeof view.name !== "string") return
    if (cachedViews.value.includes(view.name)) return
    if (view.meta?.keepAlive) {
      cachedViews.value.push(view.name)
    }
  }

  // 删除缓存视图
  const delCachedView = (view: TagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  // 删除其他缓存视图
  const delOthersCachedViews = (view: TagView) => {
    if (typeof view.name !== "string") return
    const index = cachedViews.value.indexOf(view.name)
    if (index !== -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      cachedViews.value = []
    }
  }

  // 删除所有缓存视图
  const delAllCachedViews = () => {
    cachedViews.value = []
  }

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    delVisitedView,
    delOthersVisitedViews,
    delAllVisitedViews,
    addCachedView,
    delCachedView,
    delOthersCachedViews,
    delAllCachedViews
  }
})
