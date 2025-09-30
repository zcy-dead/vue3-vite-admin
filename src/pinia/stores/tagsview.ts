import type { TagView } from "@/types/tagView"
import { defineStore } from "pinia"
import { ref, watchEffect } from "vue"
import { getAffixedViews, getCachedViews, getVisitedViews, setAffixedViews, setCachedViews, setVisitedViews } from "@/utils/localStorage"
import { useSettingStore } from "./setting"

export const useTagsViewStore = defineStore("tagsview", () => {
  const settingStore = useSettingStore()

  const visitedViews = ref<TagView[]>(settingStore.cacheTagsView ? getVisitedViews() : [])

  const cachedViews = ref<string[]>(settingStore.cacheTagsView ? getCachedViews() : [])

  const affixedViews = ref<TagView[]>(settingStore.cacheTagsView ? getAffixedViews() : [])

  // 添加或更新访问标签栏数据
  const addVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      // 找到匹配的视图，则更新视图
      visitedViews.value.splice(index, 1, { ...view })
    } else {
      // 如果没有找到匹配的视图，则添加新的视图
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
    if (typeof view.name === "string" && !cachedViews.value.includes(view.name)) {
      if (view.meta?.keepAlive) {
        cachedViews.value.push(view.name)
      }
    }
  }

  // 删除缓存视图
  const delCachedView = (view: TagView) => {
    if (typeof view.name === "string") {
      const index = cachedViews.value.indexOf(view.name)
      if (index !== -1) {
        cachedViews.value.splice(index, 1)
      }
    }
  }

  // 删除其他缓存视图
  const delOthersCachedViews = (view: TagView) => {
    if (typeof view.name === "string") {
      const index = cachedViews.value.indexOf(view.name)
      if (index !== -1) {
        cachedViews.value = [view.name]
      } else {
        cachedViews.value = []
      }
    }
  }

  // 删除所有缓存视图
  const delAllCachedViews = () => {
    cachedViews.value = []
  }

  // 是否固定视图
  const isAffixedViews = (tag: TagView) => {
    return affixedViews.value.some(v => v.path === tag.path)
  }

  // 添加固定视图
  const addAffixedViews = (view: TagView) => {
    const isExist = affixedViews.value.some(v => v.path === view.path)
    if (!isExist) {
      affixedViews.value.push(view)
    }
  }

  // 删除固定视图
  const delAffixedViews = (view: TagView) => {
    const index = affixedViews.value.findIndex(v => v.path === view.path)
    if (index !== -1) {
      affixedViews.value.splice(index, 1)
    }
  }

  // 删除所有固定视图
  const delAllAffixedViews = () => {
    affixedViews.value = []
  }

  /** 初始化访问和缓存标签栏数据 */
  watchEffect(() => {
    setVisitedViews(visitedViews.value)
    setCachedViews(cachedViews.value)
    setAffixedViews(affixedViews.value)
  })

  return {
    visitedViews,
    cachedViews,
    affixedViews,
    addVisitedView,
    delVisitedView,
    delOthersVisitedViews,
    delAllVisitedViews,
    addCachedView,
    delCachedView,
    delOthersCachedViews,
    delAllCachedViews,
    isAffixedViews,
    addAffixedViews,
    delAffixedViews,
    delAllAffixedViews
  }
})
