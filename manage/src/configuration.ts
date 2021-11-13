// 路由-菜单
import ComponentIcon from '@vicons/material/AppsFilled'
import CommonModalIcon from '@vicons/material/PostAddSharp'
import CommonTableIcon from '@vicons/fluent/TextNumberListLtr20Regular'

import UserIcon from '@vicons/carbon/User'
import UserListIcon from '@vicons/carbon/UserMultiple'
import AuthorizationIcon from '@vicons/carbon/FingerprintRecognition'

import SystemIcon from '@vicons/fluent/DesktopSync16Regular'
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
    name: 'ComponentCollection',
    label: '组件管理',
    icon: ComponentIcon,
    children: [
      {
        name: 'CommonModal',
        path: 'component-collection/common-modal',
        label: '通用弹窗',
        labelPinYin: 'tongyongtanchuang_tytc',
        icon: CommonModalIcon,
      },
      {
        name: 'CommonTable',
        path: 'component-collection/common-table',
        label: '通用表格',
        labelPinYin: 'tongyongbiaoge_tybg',
        icon: CommonTableIcon,
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
export interface IColorInfo {
  key: string
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

export interface IColorCollection {
  [colorName: string]: IColorInfo
}

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
        itemColorActive: !ifDark ? '#1169581a' : '#111111',
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
        itemColorActive: !ifDark ? '#b4f7d01a' : '#111111',
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
    },
    blue: {
      key: 'blue',
      label: '饿了么的蓝',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#1890ff' : '#1c8aef',
        primaryColorHover: !ifDark ? '#40a9ff' : '#1890ff',
        primaryColorPressed: !ifDark ? '#096dd9' : '#6DB4F6FF',
        primaryColorSuppl: !ifDark ? '#40a9ff' : '#1890ff',
      },
      Menu: {
        // 箭头原色
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        // 箭头激活
        arrowColorHover: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        arrowColorChildActive: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        arrowColorActive: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        // 背景激活
        itemColorActive: !ifDark ? '#afd5f91a' : '#111111',
        // 内容激活
        itemTextColorActive: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        itemIconColorActive: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        itemTextColorChildActive: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        itemIconColorChildActive: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        itemTextColorHover: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
        itemIconColorHover: !ifDark ? '#1890FFFF' : '#6DB4F6FF',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
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
        itemColorActive: !ifDark ? '#959ed31a' : '#111111',
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
        itemColorActive: !ifDark ? '#ceb7ef1a' : '#111111',
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
        itemColorActive: !ifDark ? '#f5eabe1a' : '#111111',
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

  let Button = {
    textColorHover: !ifDark ? '#141414FF' : '#ffffff',
    textColorPressed: !ifDark ? '#000000FF' : '#ffffff',
    textColorFocus: !ifDark ? '#000000FF' : '#ffffff',
    textColorGhostHover: !ifDark ? '#141414FF' : '#ffffff',
    textColorGhostPressed: !ifDark ? '#000000FF' : '#ffffff',
    textColorGhostFocus: !ifDark ? '#000000FF' : '#ffffff',
    color: !ifDark ? '#ffffff' : '#ffffff0f',
    colorHover: !ifDark ? '#00000005' : '#00000005',
    colorPressed: !ifDark ? '#00000005' : '#00000005',
    colorFocus: !ifDark ? '#00000005' : '#00000005',
    borderHover: !ifDark ? '1px solid rgb(224,224,230)' : '1px solid #555555',
    borderPressed: !ifDark ? '1px solid rgb(224,224,230)' : '1px solid #555555',
    borderFocus: !ifDark ? '1px solid rgb(224,224,230)' : '1px solid #555555',
    rippleColor: !ifDark ? '#dddddd' : '#444444',
  }
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
    Spin,
  }
}
