const router = require('koa-router')()
const ObjectCtrl = require('../controllers/objectController')

router.get('metainfo/:bucket/:key', ObjectCtrl.metainfo)


module.exports = router
