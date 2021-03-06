const qiniu = require('qiniu')
const axios = require('axios')
const superagent = require('superagent')
const qiniuConfig = require('../config/qiniu.config')

const Host_Config = {
  host_1: 'http://rs.qbox.me',
  host_2: 'http://rs.qiniu.com',
  host_3: 'http://api.qiniu.com',
  host_4: 'http://uc.qbox.me',
}

const mac = new qiniu.auth.digest.Mac(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY)

class BucketController {
  /**
   * 获取 Bucket 列表
   * @method GET
   * @param {}
   * @returns {Array}
   */
  static async buckets (ctx) {
    let requestURI = Host_Config.host_1 + '/buckets'
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI)
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
  /**
   * 创建 Bucket
   * @method POST
   * @param {name, regin}
   */
  static async mkbucket (ctx) {
    let name = ctx.request.body.name
    let region = ctx.request.body.region
    let safeName = qiniu.util.urlsafeBase64Encode(name)
    let requestURI = `${Host_Config.host_2}/mkbucketv2/${safeName}/region/${region}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
  /**
   * 删除 Bucket
   * @method GET
   * @param {bucket}
   */
  static async dropbuctet (ctx) {
    let bucketName = ctx.params.bucket
    let requestURI = `${Host_Config.host_2}/drop/${bucketName}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
  /**
   * 获取 Bucket 空间域名
   * @method GET
   * @param {bucket}
   * @returns {Array}
   */
  static async domainlist (ctx) {
    let bucketName = ctx.params.bucket
    let requestURI = `${Host_Config.host_3}/v6/domain/list?tbl=${bucketName}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }

  /**
   * 设置 Bucket 访问权限
   * @method POST
   * @param {bucket, private}
   */
  static async bucketPrivate (ctx) {
    let data = {
      bucket: ctx.request.body.bucket || '',
      private: ctx.request.body.private || ''
    }
    let requestURI = `${Host_Config.host_4}/private`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, `bucket=${data.bucket}&private=${data.private}`)
    try {
      let result = await axios.post(requestURI, data, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
}

module.exports = BucketController
