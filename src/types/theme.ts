/** 定义主题的类型，有两种：light | dark */
export enum ThemeType {
  Light = "light",
  Dark = "dark"
}

/** 定义主题，包含名称和类型 */
export interface Theme {
  name: string
  icon: string
  type: ThemeType
}

/** 主题列表，包含可用的主题配置。 */
export const themeList: Theme[] = [
  { name: "浅色主题", icon: "Sunny", type: ThemeType.Light },
  { name: "深色主题", icon: "Moon", type: ThemeType.Dark }
]
