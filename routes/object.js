const router = require('koa-router')()
const ObjectCtrl = require('../controllers/objectController')

router.get('metainfo/:bucket/:key', ObjectCtrl.metainfo)
  .get('deleteAfterDays/:bucket/:key', ObjectCtrl.deleteAfterDays)


module.exports = router
