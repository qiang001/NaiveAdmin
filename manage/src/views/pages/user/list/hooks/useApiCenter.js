import { ref } from 'vue'
export const useApiCenter = (users) => {
  const loading = ref(false)
  // mockdata
  const samples = [
    {
      name: '剑侠客',
      username: 'jianxiake@gmail.com',
      tags: ['客服', '运营', '仓库管理员'],
      ifActive: true,
    },
    {
      name: '龙太子',
      username: 'longtaizi@gmail.com',
      tags: ['客服', '运营', '仓库管理员'],
      ifActive: false,
    },
    {
      name: '虎头怪',
      username: 'hutouguai@gmail.com',
      tags: ['客服', '运营', '仓库管理员'],
      ifActive: true,
    },
  ]
  const totalData = Array.apply(null, { length: 203 }).map((_, index) => ({
    key: index,
    name: `${samples[index % 3].name} ${index}`,
    username: samples[index % 3].username,
    tags: samples[index % 3].tags,
    ifActive: samples[index % 3].ifActive,
  }))

  // 拉取用户列表
  const getUsers = async ({ filters, sort, pagination }) => {
    loading.value = true
    let data = [...totalData]
    let { name, username } = filters
    if (name) {
      name = name.replace(/\s*/g, '').toLowerCase()
      data = data.filter((item) => item.name.match(name))
    }
    if (username) {
      username = username.replace(/\s*/g, '').toLowerCase()
      data = data.filter((item) => item.username.match(username))
    }
    if (sort == 'up') {
      data = data.sort((a, b) => a.key - b.key)
    }
    if (sort == 'down') {
      data = data.sort((a, b) => b.key - a.key)
    }
    const { page, pageSize } = pagination
    await new Promise((res) => {
      setTimeout(() => {
        res()
      }, 1500)
    })
    users.value = data.slice((page - 1) * pageSize, page * pageSize)
    console.log(`第${page}页数据加载完成`)
    loading.value = false
    return { total: data.length }
  }
  // 拉取角色options
  const getRoleOptions = async () => {
    return [
      {
        label: '运营',
        value: '运营',
      },
      {
        label: '配单员',
        value: '配单员',
      },
      {
        label: '仓库管理员',
        value: '仓库管理员',
      },
      {
        label: '后台操作员',
        value: '后台操作员',
      },
      {
        label: '送货员',
        value: '送货员',
      },
    ]
  }

  // 保存编辑后的数据
  const saveToDB = async ({ data, type }) => {
    console.log(`${type}...`)
    return new Promise((res) => {
      setTimeout(() => {
        $message.success(`恭喜你，${type}成功！`)
        console.log(`${type}完成`, data)
        res()
      }, 1500)
    })
  }
  // 删除数据
  const deleteFromDB = async ({ data }) => {
    console.log(`删除...`)
    return new Promise((res) => {
      setTimeout(() => {
        $message.success(`恭喜你，删除成功！`)
        console.log(`删除完成`, data)
        res()
      }, 1500)
    })
  }
  return {
    loading,
    getUsers,
    getRoleOptions,
    saveToDB,
    deleteFromDB,
  }
}
