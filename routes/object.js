const router = require('koa-router')()
const ObjectCtrl = require('../controllers/objectController')

router.get('/metainfo/:bucket/:key', ObjectCtrl.metainfo)
  .get('/files/:bucket', ObjectCtrl.files)
  .get('/lifecycle/:bucket/:key/:day', ObjectCtrl.lifecycle)

module.exports = router
