import { defineStore } from "pinia"
import { ref } from "vue"
import { getCurrentUserApi } from "@/apis/users/index"
import { useTagsViewStore } from "@/pinia/stores/tagsview"
import { resetRouter } from "@/router"
import { setToken as _setToken, getToken, removeToken } from "@/utils/cookie"

export const useUserStore = defineStore("user", () => {
  const userId = ref<number | null>(null)

  const username = ref<string>("")

  const name = ref<string>("")

  const phone = ref<string>("")

  const email = ref<string>("")

  const roles = ref<string[]>([])

  const token = ref<string>(getToken() || "")

  const tagsViewStore = useTagsViewStore()

  // 设置 Token
  const setToken = (value: string) => {
    _setToken(value)
    token.value = value
  }

  // 获取用户详情
  const getInfo = async () => {
    const { data } = await getCurrentUserApi(token.value)
    userId.value = data.id
    username.value = data.username
    name.value = data.name
    phone.value = data.phone
    email.value = data.email
    roles.value = data.roles
  }

  // 模拟角色变化
  const changeRoles = (role: string) => {
    const newToken = `token-${role}`
    token.value = newToken
    _setToken(newToken)
    location.reload()
  }

  // 重置 Token
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
    email.value = ""
    phone.value = ""
    name.value = ""
    username.value = ""
    userId.value = null
  }

  // 重置 Visited Views 和 Cached Views
  const resetTagsView = () => {
    tagsViewStore.delAllVisitedViews()
    tagsViewStore.delAllCachedViews()
  }

  // 登出
  const logout = () => {
    resetToken()
    resetRouter()
    resetTagsView()
  }

  return { userId, username, name, phone, email, roles, token, setToken, getInfo, changeRoles, logout, resetToken }
})
