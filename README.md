# qiniu-manager

七牛云资源管理 Api, 根据[官方文档](https://developer.qiniu.com/kodo/api/1731/api-overview)整理.

#### bucket
1. 获取 `buckets` 列表
```
GET: /api/buckets
```

2. 创建一个新的 `Bucket`
```
POST: /api/mkbucket
data: {
  name: '' // 空间名称, 仅支持字母、短划线-、下划线_、数字的组合,
  regin: '' // 存储区域，默认华东。 z0 华东 z1 华北 z2 华南 na0 北美 as0 东南亚
}
```

3. 删除指定的 `Bucket`
```
GET: /api/dropbuctet/<bucketName>
```

4. 获取 `Bucket` 空间域名
```
GET: /api/domainlist/<bucketName>
```

5. 设置 `Bucket` 访问权限
```
POST: /api/bucketPrivate
data: {
  bucket: '',
  private: ''
}
```

#### object

1. 资源元信息查询, 仅获取资源的 `Metadata` 信息
```
GET: /api/metainfo/<bucket>/<key>
@return {
    "code": 200,
    "msg": "操作成功！",
    "data": {
        "fsize": 222605,
        "hash": "FrzkHBy8S162RKHFaxXtpHokgrdC",
        "mimeType": "image/jpeg",
        "putTime": 15024139829990268,
        "type": 0
    }
}
```

2. 更新文件生命周期, 设置指定资源的生命周期
```
GET: /api/deleteAfterDays/<bucket>/<key>
```

3. 列举指定空间里的所有文件条目
```
GET: /api/files/<bucket>?marker=<marker>&limit=<limit>&prefix=<prefix>
```

4. 设置指定资源的生命周期
```
GET: /api/lifecycle/<bucket>/<key>/<day>
```
