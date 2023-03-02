const Mock = require('mockjs')
const { pagingHandel } = require('./utils')


const data = Mock.mock({
  'items|10': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})


const selectTableData = [
  {
    id: '1',
    date: '2016-05-02',
    name: '王虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    id: '2',
    date: '2016-05-04',
    name: '小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    id: '3',
    date: '2016-05-01',
    name: '小王',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    id: '4',
    date: '2016-05-03',
    name: '老王',
    address: '上海市普陀区金沙江路 1516 弄'
  },
  {
    id: '5',
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    id: '6',
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    id: '7',
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    id: '8',
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  },
  {
    id: '9',
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    id: '10',
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    id: '11',
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    id: '12',
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  },
  {
    id: '13',
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    id: '14',
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    id: '15',
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    id: '16',
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  },
  {
    id: '17',
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    id: '18',
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    id: '19',
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    id: '20',
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]

function searchSelectTable(pageParams, list) {
  const {name, address} = JSON.parse(pageParams.parameter)
  if (name) {
    list = list.filter(item => item.name.includes(name))
  }
  if (address) {
    list = list.filter(item => item.address.includes(address))
  }
  const data = pagingHandel(pageParams, list)
  return {
    data,
    limit: list.length
  }
}




module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: items,
        total: items.length * 30,
        page: 1,
        limit: 10
      }
    }
  },

  {
    url: '/vue-admin-template/selectTable/list',
    type: 'get',
    response: config => {
      const obj = searchSelectTable(config.query, selectTableData)
      return {
        code: 200,
        data: obj.data,
        total: obj.limit,
        page: Number(config.query.page),
        limit: Number(config.query.limit)
      }
    }
  }
]
