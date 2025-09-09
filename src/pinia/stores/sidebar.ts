import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { SidebarStatus } from "@/types/sidebar"
import { getSidebarStatus, setSidebarStatus } from "@/utils/localStorage"

export const useSidebarStore = defineStore("sidebar", () => {
  const status = ref<SidebarStatus>(getSidebarStatus() || SidebarStatus.Close)
  const isOpen = computed(() => status.value === SidebarStatus.Open)
  const toggleSidebar = () => {
    status.value = status.value === SidebarStatus.Open ? SidebarStatus.Close : SidebarStatus.Open
    setSidebarStatus(status.value)
  }

  return { isOpen, toggleSidebar }
})
