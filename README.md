# YOYOPicsUploader

一个将剪贴板或本地图片优雅地上传到 Minio 的 VSCode 扩展。

## 0x01 功能

开发完成的功能：

- ✅ 支持从剪贴板直接粘贴图片
- ✅ 自动生成并插入 Markdown 图片链接
- ✅ 自定义 Minio 服务器连接配置
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

在 VS Code 设置 - 扩展 - YOYOPicsUploader 中配置`Server Address` `Access Key` `Secret Key` `Bucket` `Directory`。

或者在`settings.json`中添加以下配置：

```json
{
  "yoyo-pics-uploader.serverAddress": "your-minio-service-server-address",
  "yoyo-pics-uploader.accessKey": "your-access-key",
  "yoyo-pics-uploader.secretKey": "your-secret-key",
  "yoyo-pics-uploader.bucket": "your-bucket-name",
  "yoyo-pics-uploader.directory": "your-images-directory",
}
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
