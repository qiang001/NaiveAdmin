// 路由-菜单
export const configuration = [
  {
    name: 'Console',
    path: 'console',
    label: '主控台',
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
        icon: 'GoodListIcon',
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
        icon: 'GoodCategoryIcon',
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
            icon: 'BillionsAssistanceIcon',
          },
          {
            name: 'Newcomer',
            path: 'marketing/plan/newcomer',
            label: '新人专享',
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
        icon: 'UserListIcon',
      },
      {
        name: 'Authorization',
        path: 'user/authorization',
        label: '权限管理',
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
        icon: 'OperationRecordingIcon',
      },
      {
        name: 'AccessControl',
        path: 'system/access-control',
        label: '访问控制',
        icon: 'AccessControlIcon',
      },
    ],
  },
]

// 主题色预设
export const getColors = (ifDark) => {
  const colorCollection = {
    blue: {
      key: 'blue',
      name: '拂晓蓝',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#1890ff' : '#177ddc',
        primaryColorHover: !ifDark ? '#40a9ff' : '#096dd9',
        primaryColorPressed: !ifDark ? '#096dd9' : '#1890ff',
        primaryColorSuppl: !ifDark ? '#40a9ff' : '#096dd9',
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
    purple: {
      key: 'purple',
      name: '基佬紫',
      common: {
        baseColor: '#fff',
        primaryColor: !ifDark ? '#722ed1' : '#722ed1',
        primaryColorHover: !ifDark ? '#9254de' : '#9254de',
        primaryColorPressed: !ifDark ? '#531dab' : '#531dab',
        primaryColorSuppl: !ifDark ? '#9254de' : '#9254de',
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
      name: '美团黄',
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
  }
  return colorCollection
}

// 主题覆盖
export const themeOverrides = (mainColor, ifDark) => {
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

  return {
    common,
    Menu,
    Checkbox,
  }
}
