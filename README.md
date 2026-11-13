# AriaPilot fnOS

AriaPilot 是运行在飞牛 fnOS 上的下载管理器，自带 aria2 引擎，以 FPK 形式安装。它支持 HTTP、HTTPS、FTP、磁力链接和 `.torrent` 种子，可以在飞牛桌面或浏览器中管理下载任务、查看实时进度、暂停继续、删除任务，并配置下载目录、并发数和限速。

本仓库维护 fnOS 版本，代码从主仓库 [mh567/AriaPilot](https://github.com/mh567/AriaPilot) 的 `fnos/` 子树拆分而来。macOS 版仍在主仓库维护。

## 功能

- HTTP、HTTPS、FTP、磁力链接和 `.torrent` 种子
- 实时进度、速度、剩余时间、连接数和全局速度
- 暂停、继续、删除，删除时可选同时清理文件和 `.aria2` 控制文件
- 已完成任务历史持久化
- 在飞牛授权目录中选择和修改下载目录
- 并发数、每任务连接数、分片数、全局限速
- 内置 aria2 引擎与外部 aria2 RPC 两种模式，可读取并写入外部服务端配置
- x86 与 ARM64 双架构 FPK

## 下载与安装

从 [Releases](https://github.com/mh567/AriaPilot-fnos/releases) 下载对应架构的 FPK，在飞牛应用中心选择手动安装。

安装要求：

- fnOS 1.1.8 或更高版本
- 应用中心可用的 `nodejs_v22` 运行时
- 至少一个可写的授权目录

默认下载目录是应用共享目录 `ariapilot/downloads`，例如 `/vol1/@appshare/ariapilot/downloads`。需要下载到个人目录时，先在「应用设置 → 授权目录」授权，再在应用内选择。

详细安装、配置和排障见 [docs/FNOS.md](docs/FNOS.md)。

## 构建

```bash
bash scripts/build_fpk.sh --arch all
```

产物：

```text
dist/ariapilot_1.0.8_x86.fpk
dist/ariapilot_1.0.8_arm.fpk
```

构建机需要 `node`、`curl`、`tar`、`md5` 或 `md5sum`，以及 `rsvg-convert`、ImageMagick 或 macOS `qlmanage` 之一用于生成图标。`fnpack` 会在缺失时自动下载到 `.tools/`。

## 测试

```bash
node --test src/server/*.test.js
node test/smoke.mjs
```

冒烟测试会启动本地下载源和 AriaPilot 服务，验证添加任务、SSE、暂停继续、修改目录、越权拒绝、删除文件和历史恢复。

## 目录

```text
src/server      Node 服务端
src/public      Web 前端
package         FPK 元数据、生命周期脚本、权限与桌面入口
test            端到端冒烟测试
scripts         FPK 构建与图标生成
vendor/aria2    Linux 与 macOS 调试用 aria2 二进制
docs/FNOS.md    安装、配置和排障
```

## 版本

本仓库使用独立的 `vX.Y.Z` 标签，与 macOS 版版本号无关。当前版本 `v1.0.8`。

## 安全

- 应用以专用用户 `ariapilot` 运行，不使用 root
- aria2 RPC 只监听 `127.0.0.1`，密钥自动生成且不下发浏览器
- 下载目录必须位于飞牛授权目录内
- 删除文件时会做路径归属和符号链接检查

## 许可证

MIT
