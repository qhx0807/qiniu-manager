const qiniu = require('qiniu')
const axios = require('axios')
const qiniuConfig = require('../config/qiniu.config')

const Host_Config = {
  host_1: 'http://rs.qbox.me',
  host_2: 'http://rs.qiniu.com',
  host_3: 'http://api.qiniu.com',
}

const mac = new qiniu.auth.digest.Mac(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY)

class BucketController {

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

  static async mkbucket (ctx) {
    let name = 'test07'
    let region = 'z1'
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

  static async dropbuctet (ctx) {
    let bucketName = 'test6'
    let requestURI = `${Host_Config.host_2}/drop/${bucketName}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }

  static async domainlist (ctx) {
    let bucketName = 'test06'
    let requestURI = `${Host_Config.host_3}/v6/domain/list?tbl=${bucketName}`
    let AccessToken = qiniu.util.generateAccessToken(mac, requestURI, '')
    try {
      let result = await axios.get(requestURI, { headers: { Authorization: AccessToken } })
      return ctx.success({data: result.data})
    } catch (error) {
      return ctx.error({data: error.toString()})
    }
  }
}

module.exports = BucketController
