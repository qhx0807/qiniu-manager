const qiniu = require('qiniu')
const axios = require('axios')
const qiniuConfig = require('../config/qiniu.config')

const Host_Config = {
  host_1: 'http://rs.qbox.me',
  host_2: 'http://rs.qiniu.com',
  host_3: 'http://api.qiniu.com',
  host_4: 'http://uc.qbox.me',
  host_5: 'http://rsf.qbox.me'
}

const mac = new qiniu.auth.digest.Mac(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY)

class ObjectController {
  /**
   * 资源元信息查询
   * @method GET
   * @param {bucket, key}
   */
  static async metainfo (ctx) {
    let bucket = ctx.params.bucket
    let key = ctx.params.key
    let encodedEntryURI = qiniu.util.encodedEntry(bucket, key)
    let requestURI = `${Host_Config.host_2}/stat/${encodedEntryURI}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
  /**
   * @method GET
   * @param {bucket, limit, prefix,}
   */
  static async files (ctx) {
    let bucket = ctx.params.bucket
    let limit = ctx.query.limit || 10
    let prefix = ctx.query.prefix || ''
    let marker = ctx.query.marker || ''

    let requestURI = `${Host_Config.host_5}/list?bucket=${bucket}&limit=${limit}&prefix=${prefix}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }

  static async lifecycle (ctx) {
    let bucket = ctx.params.bucket
    let key = ctx.params.key
    let days = ctx.params.day
    let encodedEntryURI = qiniu.util.encodedEntry(bucket, key)
    let requestURI = `${Host_Config.host_2}/deleteAfterDays/${encodedEntryURI}/${days}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
}

module.exports = ObjectController
