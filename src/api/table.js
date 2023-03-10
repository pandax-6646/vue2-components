import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getSelectTableList(params) {
  return request({
    url: '/vue-admin-template/selectTable/list',
    method: 'get',
    params
  })
}
