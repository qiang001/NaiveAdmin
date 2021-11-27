// 路由-菜单
import DesignStandardIcon from '@vicons/tabler/LettersCase'
import ComponentIcon from '@vicons/fluent/Box16Regular'
import ButtonIcon from '@vicons/material/BoltRound'
import TagIcon from '@vicons/fluent/TagMultiple20Regular'
import ModalIcon from '@vicons/fluent/PositionBackward20Regular'
import TableIcon from '@vicons/fluent/TextBulletListSquare24Regular'
import MenuIcon from '@vicons/material/MenuTwotone'
import SortIcon from '@vicons/fluent/ArrowSort20Filled'

import UserIcon from '@vicons/carbon/User'
import UserListIcon from '@vicons/carbon/UserMultiple'
import AuthorizationIcon from '@vicons/carbon/FingerprintRecognition'

import SystemIcon from '@vicons/ionicons5/InformationCircleOutline'
import OperationRecordingIcon from '@vicons/fluent/Record24Regular'
import AccessControlIcon from '@vicons/antd/SecurityScanFilled'
import DocsIcon from '@vicons/material/ChromeReaderModeSharp'

import { Component } from 'vue'
export interface IPageItem {
  name: string
  label: string
  labelPinYin?: string
  icon?: Component
  path?: string
  ifCache?: boolean
  ifHide?: boolean
  belongsTo?: string
  children?: IPageItem[]
}

export const pageConfig: IPageItem[] = [
  {
    name: 'DesignStandard',
    path: 'design-standard',
    label: '设计规范',
    icon: DesignStandardIcon,
  },
  {
    name: 'ComponentCollection',
    label: '组件管理',
    icon: ComponentIcon,
    children: [
      {
        name: 'Button',
        path: 'component-collection/button',
        label: '按钮',
        labelPinYin: 'anniu_an_button',
        icon: ButtonIcon,
      },
      {
        name: 'Tag',
        path: 'component-collection/tag',
        label: '标签',
        labelPinYin: 'biaoqian_bq_tag',
        icon: TagIcon,
      },
      {
        name: 'Modal',
        path: 'component-collection/modal',
        label: '弹窗',
        labelPinYin: 'tanchuang_tc_modal',
        icon: ModalIcon,
      },
      {
        name: 'Table',
        path: 'component-collection/table',
        label: '表格',
        labelPinYin: 'biaoge_bg_table',
        icon: TableIcon,
      },
      {
        name: 'Menu',
        path: 'component-collection/menu',
        label: '菜单',
        labelPinYin: 'caidan_cd_menu',
        icon: MenuIcon,
      },
      {
        name: 'Sort',
        path: 'component-collection/sort',
        label: '排序',
        labelPinYin: 'paixu_px_sort',
        icon: SortIcon,
      },
    ],
  },
  {
    name: 'User',
    path: 'user',
    label: '用户管理',
    icon: UserIcon,
    children: [
      {
        name: 'UserList',
        path: 'user/list',
        label: '用户列表',
        labelPinYin: 'yonghuliebiao_yhlb',
        icon: UserListIcon,
        ifCache: true,
      },
      {
        name: 'Authorization',
        path: 'user/authorization',
        label: '权限管理',
        labelPinYin: 'quanxianguanli_qxgl',
        icon: AuthorizationIcon,
      },
    ],
  },
  {
    name: 'System',
    path: 'system',
    label: '系统信息',
    icon: SystemIcon,
    children: [
      {
        name: 'OperationRecording',
        path: 'system/operation-recording',
        label: '操作记录',
        labelPinYin: 'caozuojilu_czjl',
        icon: OperationRecordingIcon,
      },
      {
        name: 'AccessControl',
        path: 'system/access-control',
        label: '访问控制',
        labelPinYin: 'fangwenkongzhi_fwkz',
        icon: AccessControlIcon,
      },
      {
        name: 'Docs',
        path: 'system/docs',
        label: '文档中心',
        labelPinYin: 'wendangzhongxin_wdzx',
        icon: DocsIcon,
      },
    ],
  },
]

interface IPermission {
  page: string
  label: string
  contentAuths: Array<{ key: string; desc: string }>
  logicAuths: Array<{ key: string; desc: string }>
}

export const permissionConfig: IPermission[] = [
  {
    page: 'Console',
    label: '主控台',
    contentAuths: [
      { key: '1', desc: '订单总数可见' },
      { key: '2', desc: '客户总数可见' },
    ],
    logicAuths: [{ key: '1', desc: '【查询产品库存】按钮可触发功能' }],
  },
  {
    page: 'UserList',
    label: '用户列表',
    contentAuths: [],
    logicAuths: [{ key: '1', desc: '【添加新用户】按钮可触发功能' }],
  },
]

// 布局模式
import { layoutStyleType } from '@/store'
export const getStyles: () => layoutStyleType[] = () => {
  return ['left-right', 'top-left-right', 'top-left-right-inverted']
}

// 主题色预设
export type colorName =
  | 'qingshandai'
  | 'green'
  | 'blue'
  | 'luckin'
  | 'purple'
  | 'yellow'
export interface IColorInfo {
  key: colorName
  label: string
  common: {
    baseColor?: string
    primaryColor: string
    primaryColorHover: string
    primaryColorPressed: string
    primaryColorSuppl: string
    [otherKey: string]: any
  }
  [otherComponentName: string]: any
}

export type IColorCollection = Record<colorName, IColorInfo>

export const getColors: (ifDark: boolean) => IColorCollection = (ifDark) => {
  return {
    qingshandai: {
      key: 'qingshandai',
      label: '华为青山黛',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#116958' : '#1e8f76',
        primaryColorHover: !ifDark ? '#1e8f76' : '#116958',
        primaryColorPressed: !ifDark ? '#074239' : '#30b695',
        primaryColorSuppl: !ifDark ? '#1e8f76' : '#116958',
      },
      Menu: {
        // 箭头原色
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        // 箭头激活
        arrowColorHover: !ifDark ? '#116958' : '#30b695',
        arrowColorChildActive: !ifDark ? '#116958' : '#30b695',
        arrowColorActive: !ifDark ? '#116958' : '#30b695',
        // 背景激活
        itemColorActive: !ifDark ? '#f3f8f7' : '#101715',
        // 内容激活
        itemTextColorActive: !ifDark ? '#116958' : '#30b695',
        itemIconColorActive: !ifDark ? '#116958' : '#30b695',
        itemTextColorChildActive: !ifDark ? '#116958' : '#30b695',
        itemIconColorChildActive: !ifDark ? '#116958' : '#30b695',
        itemTextColorHover: !ifDark ? '#116958' : '#30b695',
        itemIconColorHover: !ifDark ? '#116958' : '#30b695',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
      },
      Pagination: {
        itemBorderDisabled: '#0000',
        itemBorderActive: '#0000',
        itemColorActive: !ifDark ? '#116958' : '#2d2d2d',
        itemColorHover: !ifDark ? '#eeeeee' : '#2d2d2d',
        itemColorPressed: !ifDark ? '#dddddd' : '#3d3d3d',
        itemColorActiveHover: !ifDark ? '#116958' : '#2d2d2d',
        itemTextColorActive: '#fafafa',
        itemTextColorHover: !ifDark ? '#666' : '#aaaaaa',
        itemTextColorPressed: !ifDark ? '#000' : '#fafafa',
      },
    },
    green: {
      key: 'green',
      label: '微信原谅绿',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#00c250' : '#2aae67',
        primaryColorHover: !ifDark ? '#21cf64' : '#1a8750',
        primaryColorPressed: !ifDark ? '#009c46' : '#4aba7bFF',
        primaryColorSuppl: !ifDark ? '#21cf64' : '#1a8750',
      },
      Menu: {
        // 箭头原色
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        // 箭头激活
        arrowColorHover: !ifDark ? '#00c250' : '#4aba7bFF',
        arrowColorChildActive: !ifDark ? '#00c250' : '#4aba7bFF',
        arrowColorActive: !ifDark ? '#00c250' : '#4aba7bFF',
        // 背景激活
        itemColorActive: !ifDark ? '#b4f7d01a' : '#0e1914',
        // 内容激活
        itemTextColorActive: !ifDark ? '#00c250' : '#4aba7bFF',
        itemIconColorActive: !ifDark ? '#00c250' : '#4aba7bFF',
        itemTextColorChildActive: !ifDark ? '#00c250' : '#4aba7bFF',
        itemIconColorChildActive: !ifDark ? '#00c250' : '#4aba7bFF',
        itemTextColorHover: !ifDark ? '#00c250' : '#4aba7bFF',
        itemIconColorHover: !ifDark ? '#00c250' : '#4aba7bFF',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
      },
      Pagination: {
        itemBorderDisabled: '#0000',
        itemBorderActive: '#0000',
        itemColorActive: !ifDark ? '#00c250' : '#2d2d2d',
        itemColorHover: !ifDark ? '#eeeeee' : '#2d2d2d',
        itemColorPressed: !ifDark ? '#dddddd' : '#3d3d3d',
        itemColorActiveHover: !ifDark ? '#00c250' : '#2d2d2d',
        itemTextColorActive: '#fafafa',
        itemTextColorHover: !ifDark ? '#666' : '#aaaaaa',
        itemTextColorPressed: !ifDark ? '#000' : '#fafafa',
      },
    },
    blue: {
      key: 'blue',
      label: '很经典的蓝',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#1f71e0' : '#1c8aef',
        primaryColorHover: !ifDark ? '#4792ed' : '#1890ff',
        primaryColorPressed: !ifDark ? '#1152ba' : '#6DB4F6FF',
        primaryColorSuppl: !ifDark ? '#4792ed' : '#1890ff',
      },
      Menu: {
        // 箭头原色
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        // 箭头激活
        arrowColorHover: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        arrowColorChildActive: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        arrowColorActive: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        // 背景激活
        itemColorActive: !ifDark ? '#afd5f91a' : '#172129',
        // 内容激活
        itemTextColorActive: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        itemIconColorActive: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        itemTextColorChildActive: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        itemIconColorChildActive: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        itemTextColorHover: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
        itemIconColorHover: !ifDark ? '#1f71e0FF' : '#6DB4F6FF',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
      },
      Pagination: {
        itemBorderDisabled: '#0000',
        itemBorderActive: '#0000',
        itemColorActive: !ifDark ? '#1f71e0' : '#2d2d2d',
        itemColorHover: !ifDark ? '#eeeeee' : '#2d2d2d',
        itemColorPressed: !ifDark ? '#dddddd' : '#3d3d3d',
        itemColorActiveHover: !ifDark ? '#1f71e0' : '#2d2d2d',
        itemTextColorActive: '#fafafa',
        itemTextColorHover: !ifDark ? '#666' : '#aaaaaa',
        itemTextColorPressed: !ifDark ? '#000' : '#fafafa',
      },
    },
    luckin: {
      key: 'luckin',
      label: '瑞幸咖啡蓝',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#172991' : '#402db6',
        primaryColorHover: !ifDark ? '#33469e' : '#281d8f',
        primaryColorPressed: !ifDark ? '#0c176b' : '#634fc2',
        primaryColorSuppl: !ifDark ? '#33469e' : '#281d8f',
      },
      Menu: {
        // 箭头原色
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        // 箭头激活
        arrowColorHover: !ifDark ? '#172991FF' : '#634fc2',
        arrowColorChildActive: !ifDark ? '#172991FF' : '#634fc2',
        arrowColorActive: !ifDark ? '#172991FF' : '#634fc2',
        // 背景激活
        itemColorActive: !ifDark ? '#959ed31a' : '#14121f',
        // 内容激活
        itemTextColorActive: !ifDark ? '#172991FF' : '#634fc2',
        itemIconColorActive: !ifDark ? '#172991FF' : '#634fc2',
        itemTextColorChildActive: !ifDark ? '#172991FF' : '#634fc2',
        itemIconColorChildActive: !ifDark ? '#172991FF' : '#634fc2',
        itemTextColorHover: !ifDark ? '#172991FF' : '#634fc2',
        itemIconColorHover: !ifDark ? '#172991FF' : '#634fc2',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
      },
      Tabs: {
        tabTextColorActiveLine: !ifDark ? '#172991' : '#8873ee',
        tabTextColorHoverLine: !ifDark ? '#172991' : '#8873ee',
        barColor: !ifDark ? '#172991' : '#8873ee',
      },
      Pagination: {
        itemBorderDisabled: '#0000',
        itemBorderActive: '#0000',
        itemColorActive: !ifDark ? '#172991' : '#2d2d2d',
        itemColorHover: !ifDark ? '#eeeeee' : '#2d2d2d',
        itemColorPressed: !ifDark ? '#dddddd' : '#3d3d3d',
        itemColorActiveHover: !ifDark ? '#172991' : '#2d2d2d',
        itemTextColorActive: '#fafafa',
        itemTextColorHover: !ifDark ? '#666' : '#aaaaaa',
        itemTextColorPressed: !ifDark ? '#000' : '#fafafa',
      },
    },
    purple: {
      key: 'purple',
      label: '薰衣草的紫',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#722ed1' : '#9951ff',
        primaryColorHover: !ifDark ? '#9254de' : '#722ed1',
        primaryColorPressed: !ifDark ? '#531dab' : '#BE92FCFF',
        primaryColorSuppl: !ifDark ? '#9254de' : '#722ed1',
      },
      Menu: {
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        arrowColorHover: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        arrowColorChildActive: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        arrowColorActive: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        itemColorActive: !ifDark ? '#ceb7ef1a' : '#17121f',
        itemTextColorActive: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        itemIconColorActive: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        itemTextColorChildActive: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        itemIconColorChildActive: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        itemTextColorHover: !ifDark ? '#722ED1FF' : '#BE92FCFF',
        itemIconColorHover: !ifDark ? '#722ED1FF' : '#BE92FCFF',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
      },
      Pagination: {
        itemBorderDisabled: '#0000',
        itemBorderActive: '#0000',
        itemColorActive: !ifDark ? '#722ed1' : '#2d2d2d',
        itemColorHover: !ifDark ? '#eeeeee' : '#2d2d2d',
        itemColorPressed: !ifDark ? '#dddddd' : '#3d3d3d',
        itemColorActiveHover: !ifDark ? '#722ed1' : '#2d2d2d',
        itemTextColorActive: '#fafafa',
        itemTextColorHover: !ifDark ? '#666' : '#aaaaaa',
        itemTextColorPressed: !ifDark ? '#000' : '#fafafa',
      },
    },
    yellow: {
      key: 'yellow',
      label: '美团外卖黄',
      common: {
        baseColor: '#000',
        primaryColor: !ifDark ? '#ffd429' : '#ffd429',
        primaryColorHover: !ifDark ? '#ffe252' : '#ffc300',
        primaryColorPressed: !ifDark ? '#ffc300' : '#ffed7a',
        primaryColorSuppl: !ifDark ? '#ffe252' : '#ffc300',
      },
      Menu: {
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        itemColorActive: !ifDark ? '#f5eabe1a' : '#171611',
        itemTextColorActiveInverted: '#000',
        itemIconColorActiveInverted: '#000',
      },
      Checkbox: {
        color: !ifDark ? '#fff' : '#0000',
      },
      Radio: {
        color: !ifDark ? '#fff' : '#0000',
      },
      Switch: {
        textColor: '#222',
      },
      Alert: {
        colorInfo: !ifDark ? '#EDF5FEFF' : '#3889C540',
        borderInfo: !ifDark
          ? '1px solid rgba(199,223,251,1)'
          : '1px solid rgba(56,137,197,0.35)',
      },
      Pagination: {
        itemBorderDisabled: '#0000',
        itemBorderActive: '#0000',
        itemColorActive: !ifDark ? '#ffd429' : '#2d2d2d',
        itemColorHover: !ifDark ? '#eeeeee' : '#2d2d2d',
        itemColorPressed: !ifDark ? '#dddddd' : '#3d3d3d',
        itemColorActiveHover: !ifDark ? '#ffd429' : '#2d2d2d',
        itemTextColorActive: !ifDark ? '#111' : '#fafafa',
        itemTextColorHover: !ifDark ? '#666' : '#aaaaaa',
        itemTextColorPressed: !ifDark ? '#000' : '#fafafa',
      },
    },
  }
}

// 主题覆盖
export const themeOverrides: (mainColor: string, ifDark: boolean) => any = (
  mainColor,
  ifDark
) => {
  const setting = getColors(ifDark)[mainColor]

  let common = {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
  }
  if (setting.common) common = { ...common, ...setting.common }

  let Button = {}
  if (setting.Button) Button = { ...Button, ...setting.Button }

  let Menu = {}
  if (setting.Menu) Menu = { ...Menu, ...setting.Menu }

  let Checkbox = {}
  if (setting.Checkbox) Checkbox = { ...Checkbox, ...setting.Checkbox }

  let Radio = {}
  if (setting.Radio) Radio = { ...Radio, ...setting.Radio }

  let Switch = {}
  if (setting.Switch) Switch = { ...Switch, ...setting.Switch }

  let Tabs = {}
  if (setting.Tabs) Tabs = { ...Tabs, ...setting.Tabs }

  let Alert = {}
  if (setting.Alert) Alert = { ...Alert, ...setting.Alert }

  let Pagination = {}
  if (setting.Pagination) Pagination = { ...Pagination, ...setting.Pagination }

  let Spin = {
    sizeTiny: '18px',
  }
  return {
    common,
    Button,
    Menu,
    Checkbox,
    Radio,
    Switch,
    Tabs,
    Alert,
    Pagination,
    Spin,
  }
}
