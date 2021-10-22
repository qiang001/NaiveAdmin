// 路由-菜单
import {
  IPageItem,
  IPermission,
  IColorCollection,
} from '@/interfaces/configuration'

export const pageConfig: IPageItem[] = [
  {
    name: 'Console',
    path: 'console',
    label: '主控台',
    labelPinYin: 'zhukongtai_zkt',
    icon: 'ConsoleIcon',
  },
  {
    name: 'Good',
    label: '商品管理',
    icon: 'GoodIcon',
    children: [
      {
        name: 'GoodList',
        path: 'good/list',
        label: '商品列表',
        labelPinYin: 'shangpinliebiao_splb',
        icon: 'GoodListIcon',
        ifCache: true,
      },
      {
        name: 'GoodDetails',
        path: 'good/details',
        label: '商品详情',
        ifHide: true,
        belongsTo: 'GoodList',
      },
      {
        name: 'GoodCategory',
        path: 'good/category',
        label: '商品分类',
        labelPinYin: 'shangpinfenlei_spfl',
        icon: 'GoodCategoryIcon',
        ifCache: true,
      },
    ],
  },
  {
    name: 'Order',
    label: '订单管理',
    icon: 'OrderIcon',
    children: [
      {
        name: 'OrderList',
        path: 'order/list',
        label: '订单列表',
        labelPinYin: 'dingdanliebiao_ddlb',
        icon: 'OrderListIcon',
      },
      {
        name: 'OrderDetails',
        path: 'order/details',
        label: '订单详情',
        ifHide: true,
        belongsTo: 'OrderList',
      },
    ],
  },
  {
    name: 'Marketing',
    label: '营销管理',
    icon: 'MarketingIcon',
    children: [
      {
        name: 'Overview',
        path: 'marketing/overview',
        label: '概况总览',
        labelPinYin: 'gaikuangzonglan_gkzl',
        icon: 'OverviewIcon',
      },
      {
        name: 'Plan',
        label: '策略模块',
        icon: 'PlanIcon',
        children: [
          {
            name: 'BillionsAssistance',
            path: 'marketing/plan/billions-assistance',
            label: '百亿补贴',
            labelPinYin: 'baiyibutie_bybt',
            icon: 'BillionsAssistanceIcon',
          },
          {
            name: 'Newcomer',
            path: 'marketing/plan/newcomer',
            label: '新人专享',
            labelPinYin: 'xinrenzhuanxiang_xrzx',
            icon: 'NewcomerIcon',
          },
        ],
      },
    ],
  },
  {
    name: 'Customer',
    path: 'customer',
    label: '客户管理',
    icon: 'CustomerIcon',
    children: [
      {
        name: 'CustomerList',
        path: 'customer/list',
        label: '客户列表',
        labelPinYin: 'kehuliebiao_khlb',
        icon: 'CustomerListIcon',
      },
      {
        name: 'CustomerDetails',
        path: 'customer/details',
        label: '客户详情',
        ifHide: true,
        belongsTo: 'CustomerList',
      },
      {
        name: 'CustomerType',
        path: 'customer/type',
        label: '客户类型',
        labelPinYin: 'kehuleixing_khlx',
        icon: 'CustomerTypeIcon',
      },
    ],
  },
  {
    name: 'User',
    path: 'user',
    label: '用户管理',
    icon: 'UserIcon',
    children: [
      {
        name: 'UserList',
        path: 'user/list',
        label: '用户列表',
        labelPinYin: 'yonghuliebiao_yhlb',
        icon: 'UserListIcon',
      },
      {
        name: 'Authorization',
        path: 'user/authorization',
        label: '权限管理',
        labelPinYin: 'quanxianguanli_qxgl',
        icon: 'AuthorizationIcon',
      },
    ],
  },
  {
    name: 'System',
    path: 'system',
    label: '系统信息',
    icon: 'SystemIcon',
    children: [
      {
        name: 'OperationRecording',
        path: 'system/operation-recording',
        label: '操作记录',
        labelPinYin: 'caozuojilu_czjl',
        icon: 'OperationRecordingIcon',
      },
      {
        name: 'AccessControl',
        path: 'system/access-control',
        label: '访问控制',
        labelPinYin: 'fangwenkongzhi_fwkz',
        icon: 'AccessControlIcon',
      },
    ],
  },
]

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

// 主题色预设
export const getColors: (ifDark: boolean) => IColorCollection = (ifDark) => {
  return {
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
        itemColorActive: !ifDark ? '#00c2501A' : '#000000FF',
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
        itemColorActive: !ifDark ? '#1890FF1A' : '#000000FF',
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
        itemColorActive: !ifDark ? '#1729911A' : '#000000FF',
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
        itemColorActive: !ifDark ? '#722ED11A' : '#000000FF',
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
        primaryColor: !ifDark ? '#ffd429' : '#ffd429',
        primaryColorHover: !ifDark ? '#ffe252' : '#ffc300',
        primaryColorPressed: !ifDark ? '#ffc300' : '#ffed7a',
        primaryColorSuppl: !ifDark ? '#ffe252' : '#ffc300',
      },
      Menu: {
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
      },
    },
    orange: {
      key: 'orange',
      label: '阿里淘宝橙',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#ff6a00' : '#ec6f00',
        primaryColorHover: !ifDark ? '#ff8929' : '#c75600',
        primaryColorPressed: !ifDark ? '#d95300' : '#fa9128',
        primaryColorSuppl: !ifDark ? '#ff8929' : '#c75600',
      },
      Menu: {
        // 箭头原色
        arrowColor: !ifDark ? '#333639' : '#ffffffd1',
        // 箭头激活
        arrowColorHover: !ifDark ? '#ff6a00' : '#fa9128',
        arrowColorChildActive: !ifDark ? '#ff6a00' : '#fa9128',
        arrowColorActive: !ifDark ? '#ff6a00' : '#fa9128',
        // 背景激活
        itemColorActive: !ifDark ? '#ff6a001A' : '#000000FF',
        // 内容激活
        itemTextColorActive: !ifDark ? '#ff6a00' : '#fa9128',
        itemIconColorActive: !ifDark ? '#ff6a00' : '#fa9128',
        itemTextColorChildActive: !ifDark ? '#ff6a00' : '#fa9128',
        itemIconColorChildActive: !ifDark ? '#ff6a00' : '#fa9128',
        itemTextColorHover: !ifDark ? '#ff6a00' : '#fa9128',
        itemIconColorHover: !ifDark ? '#ff6a00' : '#fa9128',
      },
      Checkbox: {
        checkMarkColor: !ifDark ? '#fff' : '#CDCDD4FF',
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

  let Menu = {}
  if (setting.Menu) Menu = { ...Menu, ...setting.Menu }

  let Checkbox = {}
  if (setting.Checkbox) Checkbox = { ...Checkbox, ...setting.Checkbox }

  let Tabs = {}
  if (setting.Tabs) Tabs = { ...Tabs, ...setting.Tabs }

  let Spin = {
    sizeTiny: '18px',
  }
  return {
    common,
    Menu,
    Checkbox,
    Tabs,
    Spin,
  }
}
