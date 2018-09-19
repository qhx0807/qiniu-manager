const router = require('koa-router')()
const qiniuCtrl = require('../controllers/bucketController')

// router.prefix('/api/v1')

router.get('/buckets', qiniuCtrl.buckets)
  .post('/mkbucket', qiniuCtrl.mkbucket)
  .get('/dropbuctet/:bucket', qiniuCtrl.dropbuctet)
  .get('/domainlist/:bucket', qiniuCtrl.domainlist)
  .post('/bucketPrivate', qiniuCtrl.bucketPrivate)

module.exports = router
