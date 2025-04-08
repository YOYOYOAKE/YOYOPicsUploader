# YOYOPicsUploader

一个将剪贴板或本地图片优雅地上传到 Minio 的 VSCode 扩展。

## 0x01 功能

开发完成的功能：

- ✅ 支持从剪贴板直接粘贴图片
- ✅ 自动生成并插入 Markdown 图片链接
- ✅ 自定义 Minio 服务器连接配置
- ✅ 配置多个 Minio 服务器和上传路径
- ✅ 自动将图片压缩为 WebP 格式

待开发的功能

- ⭕️ 本地图片上传
- ⭕️ GIF 图片上传
- ⭕️ 自定义 WebP 压缩率
- ⭕️ 其他 S3 服务支持
- ⭕️ 自动配置图片上传目录

不会开发的功能

- ❌ Linux 与 MacOS 适配（因为没有测试设备）

## 0x02 安装

1. 在 VS Code 扩展商店中搜索 "YOYOPicsUploader"
2. 点击安装即可

## 0x03 配置

在 VS Code 设置 - 扩展 - YOYOPicsUploader 中配置`Minio Services` `Upload Paths`，点击**在 settings.json 中编辑**按钮，将在`settings.json`中生成默认配置。

或者在`settings.json`中添加以下配置：

```json
  "yoyo-pics-uploader.minioServices": [
    {
      "name": "your-service-name",
      "serverAddress": "https://your-minio-server-address",
      "accessKey": "your-access-key",
      "secretKey": "your-secret-key"
    },
    {
      "name": "another-service-name",
      "serverAddress": "https://another-minio-server-address",
      "accessKey": "another-access-key",
      "secretKey": "another-secret-key"
    }
  ],
    "yoyo-pics-uploader.uploadPaths": [
    {
      "bucket": "your-bucket-name",
      "directory": "images/2025"
    },
    {
      "bucket": "another-bucket-name",
      "directory": "images/2026"
    }
  ],

```

## 0x04 使用

1. 剪贴板上传

   - 复制一张图片到剪贴板
   - 使用快捷键 `Ctrl+Shift+V` (Windows)
   - 图片会自动上传并在光标处插入 Markdown 链接

## 0x05 常见问题

- 请确保已正确配置 Minio 服务器信息
- 上传前请确保网络连接正常
- 建议定期备份重要图片

## License

MIT
