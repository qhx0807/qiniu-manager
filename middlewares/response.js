const objectAssign = require('object-assign')

module.exports = async (ctx, next) => {
  ctx.error = (eObj) => {
    let defaultRes = {
      code: -200,
      msg: '操作失败！'
    }
    let obj = objectAssign(defaultRes, eObj)
    ctx.body = obj
  }
  ctx.success = (eObj) => {
    let defaultSucc = {
      code: 200,
      msg: '操作成功！',
    }
    let res = objectAssign(defaultSucc, eObj)
    ctx.body = res
  }
  await next()
}
