import { ref } from 'vue'
export const useApiCenter = (users) => {
  const loading = ref(false)
  // mockdata
  const samples = [
    {
      name: '剑侠客',
      username: 'jianxiake@gmail.com',
      roles: ['客服', '运营', '仓库管理员'],
      ifActive: true,
    },
    {
      name: '龙太子',
      username: 'longtaizi@gmail.com',
      roles: ['客服', '运营', '仓库管理员'],
      ifActive: false,
    },
    {
      name: '虎头怪',
      username: 'hutouguai@gmail.com',
      roles: ['客服', '运营', '仓库管理员'],
      ifActive: true,
    },
  ]
  let totalData = Array.apply(null, { length: 203 }).map((_, index) => ({
    id: index,
    name: `${samples[index % 3].name} ${index}`,
    username: samples[index % 3].username,
    roles: samples[index % 3].roles,
    ifActive: samples[index % 3].ifActive,
  }))

  // 拉取用户列表
  const getUsers = async ({ filters, sort, pagination }) => {
    loading.value = true
    const keyBase = new Date().getTime()
    let data = [...totalData]
      .sort((a, b) => b.id - a.id)
      .map((item, index) => {
        return {
          ...item,
          key: keyBase + index,
        }
      })
    let { name, username, ifActive } = filters
    if (name) {
      name = name.replace(/\s*/g, '').toLowerCase()
      data = data.filter((item) => item.name.match(name))
    }
    if (username) {
      username = username.replace(/\s*/g, '').toLowerCase()
      data = data.filter((item) => item.username.match(username))
    }
    if (ifActive !== null) {
      data = data.filter((item) => item.ifActive.toString() == ifActive)
    }
    if (sort == 'up') {
      data = data.sort((a, b) => a.id - b.id)
    }
    if (sort == 'down') {
      data = data.sort((a, b) => b.id - a.id)
    }
    const { page, pageSize } = pagination
    await new Promise((res) => {
      setTimeout(() => {
        res()
      }, 1000)
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
        label: '客服',
        value: '客服',
      },
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
        if (type == 'edit') {
          totalData.forEach((target) => {
            if (target.id == data.id) {
              target.name = data.name
              target.username = data.username
              target.roles = [...data.roles]
              target.ifActive = data.ifActive
            }
          })
        }
        if (type == 'create') {
          let newObj = {
            ...data,
            roles: [...data.roles],
            id: totalData.length,
            key: new Date().getTime(),
          }
          totalData.push(newObj)
        }
        $message.success(`恭喜你，${type}成功！`)
        res()
      }, 1000)
    })
  }
  // 删除数据
  const deleteFromDB = async ({ data }) => {
    console.log(`删除...`)
    return new Promise((res) => {
      setTimeout(() => {
        totalData = totalData.filter((item) => item.id != data.id)
        $message.success(`恭喜你，删除成功！`)
        res()
      }, 1000)
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
