export const configuration = [
  {
    name: 'Console',
    path: 'console',
    label: '主控台',
  },
  {
    name: 'Good',
    label: '商品管理',
    children: [
      {
        name: 'GoodList',
        path: 'good/list',
        label: '商品列表',
      },
      {
        name: 'GoodDetails',
        path: 'good/details',
        label: '商品详情',
        ifHide:true,
        belongsTo:'GoodList'
      },
      {
        name: 'GoodCategory',
        path: 'good/category',
        label: '商品分类',
      },
    ],
  },
  {
    name: 'Order',
    label: '订单管理',
    children: [
      {
        name: 'OrderList',
        path: 'order/list',
        label: '订单列表',
      },
      {
        name: 'OrderDetails',
        path: 'order/details',
        label: '订单详情',
        ifHide:true,
        belongsTo:'OrderList'
      },
    ],
  },
  {
    name: 'Marketing',
    label: '营销管理',
    children: [
      {
        name: 'Overview',
        path: 'marketing/overview',
        label: '概况总览',
      },
      {
        name: 'Plan',
        label: '策略模块',
        children: [
          {
            name: 'BillionsAssistance',
            path: 'marketing/plan/billions-assistance',
            label: '百亿补贴',
          },
          {
            name: 'Newcomer',
            path: 'marketing/plan/newcomer',
            label: '新人专享'
          },
        ],
      },
    ],
  },
  {
    name: 'Customer',
    path: 'customer',
    label: '客户管理',
    children:[
      {
        name:'CustomerList',
        path:'customer/list',
        label:'客户列表'
      },
      {
        name: 'CustomerDetails',
        path: 'customer/details',
        label: '客户详情',
        ifHide:true,
        belongsTo:'CustomerList'
      },
      {
        name:'CustomerType',
        path:'customer/type',
        label:'客户类型'
      },
    ]
  },
  {
    name: 'User',
    path: 'user',
    label: '用户管理',
    children:[
      {
        name:'UserList',
        path:'user/list',
        label:'用户列表'
      },
      {
        name:'Authorization',
        path:'user/authorization',
        label:'权限管理'
      },
    ]
  },
  {
    name: 'System',
    path: 'system',
    label: '系统信息',
    children:[
      {
        name:'OperationRecording',
        path:'system/operation-recording',
        label:'操作记录'
      },
      {
        name:'AccessControl',
        path:'system/access-control',
        label:'访问控制'
      },
    ]
  },
]

export const getAllAuthKeys = () =>{
  let keys = []
  return extractKeys(configuration)
  function extractKeys(arr){
    arr.forEach(item=>{
      keys = [...keys,item.name]
      if(item.children){
        return extractKeys(item.children)
      }
    })
    return keys
  }
}
