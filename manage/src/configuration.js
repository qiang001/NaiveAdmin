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

export const getAllAuthKeys = () => {
  let keys = []
  return extractKeys(configuration)
  function extractKeys(arr) {
    arr.forEach((item) => {
      keys = [...keys, item.name]
      if (item.children) {
        return extractKeys(item.children)
      }
    })
    return keys
  }
}
