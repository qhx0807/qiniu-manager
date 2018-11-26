# qiniu-manager

七牛云资源管理 Api, 根据[官方文档](https://developer.qiniu.com/kodo/api/1731/api-overview)整理.

#### bucket
1. 获取 `buckets` 列表
```
GET: /api/buckets
```

#### object

1. 资源元信息查询, 仅获取资源的 `Metadata` 信息
```
GET: /api/metainfo/<bucket>/<key>
```

2. 更新文件生命周期, 设置指定资源的生命周期
```
GET: /api/deleteAfterDays/<bucket>/<key>
```
