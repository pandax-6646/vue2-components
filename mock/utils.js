/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {Object} pageParams
 * @param {Array} list
 * @returns {Array}
 */
function pagingHandel(pageParams, list) {
  const {page, limit} = pageParams
  const start = (page - 1) * limit
  const end = page * limit
  return list.slice(start, end) || []
}

module.exports = {
  param2Obj,
  pagingHandel
}
