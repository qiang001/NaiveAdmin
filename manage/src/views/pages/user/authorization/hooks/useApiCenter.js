export const useApiCenter = () => {
  // 拉取角色列表
  const getRoles = (num) => {
    const samples = [
      {
        key: 0,
        name: '管理员',
        desc: '最高级别权限',
        tags: [],
      },
      {
        key: 1,
        name: '运营人员',
        desc: '市场销售相关权限',
        tags: ['商品管理', '营销管理', '客户管理'],
      },
      {
        key: 2,
        name: '仓库管理员',
        desc: '管理仓库流程相关权限',
        tags: ['订单管理'],
      },
    ]
    return Array.apply(null, { length: num }).map((_, index) => ({
      key: index,
      name: `${samples[index % 3].name} ${index}`,
      desc: samples[index % 3].desc,
      tags: samples[index % 3].tags,
    }))
  }
  // 保存编辑后的数据
  const saveToDB = (authKeys, checkedKeys) => {
    console.log(authKeys)
    console.log(checkedKeys)
  }
  return {
    getRoles,
    saveToDB,
  }
}
