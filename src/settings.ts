/**
 * 系统配置
 */

export enum componentSize {
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export interface ISettings {
  version: string // 系统版本
  componentSize: componentSize // 组件大小
  showTagsView: boolean // 是否显示tabs
  showSidebarLogo: boolean // 是否显示侧边栏Logo
  fixedHeader: boolean // 是否固定头部
  sidebarTextTheme: boolean // 侧边栏字体颜色是否跟随主题颜色
}

// You can customize below settings :)
const settings: ISettings = {
  version: 'V0.1',
  componentSize: componentSize.small,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  sidebarTextTheme: true
}

export default settings
