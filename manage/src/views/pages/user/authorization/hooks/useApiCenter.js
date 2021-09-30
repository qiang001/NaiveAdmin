export const useApiCenter = (roles) => {
  // 导出表格
  const exportData = async () => {
    console.log('加载中...')
    return new Promise((res) => {
      setTimeout(() => {
        console.log('导出了')
        res()
      }, 1500)
    })
  }
  // 拉取角色列表
  const getRoles = async (num) => {
    const samples = [
      {
        key: 0,
        name: '管理员',
        desc: '最高级别权限',
        tags: [
          'Good',
          'GoodList',
          'GoodDetails',
          'GoodCategory',
          'Overview',
          'Customer',
          'CustomerList',
          'CustomerDetails',
          'CustomerType',
        ],
      },
      {
        key: 1,
        name: '运营人员',
        desc: '市场销售相关权限',
        tags: ['Customer', 'CustomerList', 'CustomerDetails', 'CustomerType'],
      },
      {
        key: 2,
        name: '仓库管理员',
        desc: '管理仓库流程相关权限管理仓库流程相关权限',
        tags: ['BillionsAssistance'],
      },
    ]
    roles.value = Array.apply(null, { length: num }).map((_, index) => ({
      key: index,
      name: `${samples[index % 3].name} ${index}`,
      desc: samples[index % 3].desc,
      tags: samples[index % 3].tags,
    }))
    return console.log('数据加载完成')
  }
  // 保存编辑后的数据
  const saveToDB = async ({ data, type }) => {
    console.log(`${type}...`)
    return new Promise((res) => {
      setTimeout(() => {
        console.log(`${type}完成`, data)
        res()
      }, 1500)
    })
  }
  return {
    exportData,
    getRoles,
    saveToDB,
  }
}
