const router = require('koa-router')()
const qiniuCtrl = require('../controllers/bucketController')

// router.prefix('/api/v1')

router.get('/buckets', qiniuCtrl.buckets)
router.post('/mkbucket', qiniuCtrl.mkbucket)
router.get('/domainlist', qiniuCtrl.domainlist)

module.exports = router
