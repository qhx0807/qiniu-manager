const qiniu = require('qiniu')
const superagent = require('superagent')
const qiniuConfig = require('../config/qiniu.config')

const Host_Config = {
  host_1: 'http://rs.qbox.me',
  host_2: 'http://rs.qiniu.com',
  host_3: 'http://api.qiniu.com',
  host_4: 'http://uc.qbox.me',
}

const mac = new qiniu.auth.digest.Mac(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY)

class StatisticController {

  static async blobio (ctx) {

  }
}

module.exports = StatisticController
