export const configuration = [
  {
    name: 'Console',
    path: 'console',
    label: '控制台',
  },
  {
    name: 'Course',
    label: '课程管理',
    children: [
      {
        name: 'CourseList',
        path: 'course/course-list',
        label: '课程列表',
      },
      {
        name: 'CourseTemplate',
        path: 'course/course-template',
        label: '课程模板',
      },
    ],
  },
  {
    name: 'Customer',
    label: '会员管理',
    children: [
      {
        name: 'CustomerGroup',
        label: '会员分组',
        children: [
          {
            name: 'CustomerNormal',
            path: 'customer/customer-group/customer-normal',
            label: '普通会员',
          },
          {
            name: 'CustomerDetails',
            path: 'customer/customer-group/customer-details',
            label: '会员详情',
            ifHide: true,
            belongsTo:'CustomerNormal'
          },
          {
            name: 'CustomerSpecial',
            label: '特殊关注',
            children: [
              {
                name: 'CustomerVip',
                path: 'customer/customer-group/customer-special/customer-vip',
                label: '普通VIP',
              },
              {
                name: 'CustomerSuperVip',
                path: 'customer/customer-group/customer-special/customer-super-vip',
                label: '超级VIP',
              },
            ],
          },
          {
            name: 'CustomerForbidden',
            path: 'customer/customer-group/customer-forbidden',
            label: '黑名单',
          },
        ],
      },
      {
        name: 'CustomerType',
        path: 'customer/customer-type',
        label: '会员类型',
      },
    ],
  },
  {
    name: 'Order',
    path: 'order',
    label: '订单管理',
  },
  {
    name: 'Marketing',
    path: 'marketing',
    label: '营销管理',
  },
  {
    name: 'User',
    path: 'user',
    label: '用户管理',
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
