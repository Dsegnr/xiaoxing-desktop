# 小星 · Xiaoxing Desktop

独立运行的 Electron 透明视频桌宠，无需星图账号或后端服务。支持招呼、吃饭、睡眠、左右转身和行走，内置16段正式动作；提供大小调整、暂停、自动散步、拖拽、键盘操作与托盘恢复。

## 安装与启动

目前实测 Windows；其他系统尚未进行原生验收。安装 Node.js 24 后：

```sh
cd desktop
npm ci
node node_modules/electron/install.js
npm run build
npm start
```

首次安装需要联网下载依赖和 Electron。正常运行的动作播放在本地完成，不调用AI生成接口，也不要求API密钥。

## 配置

点击人物打开面板：选择小/中/大、暂停、自动散步、回到角落、收起和退出。位置、尺寸和偏好保存在 `desktop/.local-data/preferences.json`，不随仓库分发。托盘点击恢复，右键菜单可回到角落。方向键移动，Enter/空格展开面板，Escape收起面板。

### 自定义动作包

默认素材目录为 `frontend/public/mascot/xiaoxing/`。先复制目录保存原包，再修改副本中的 `motion.json` 与 `media/` 视频：

```sh
npm start -- --review-pack="动作包的绝对目录"
```

验证模式明确显示素材审查标识；`--review-slow` 以四分之一速审查。确认素材可用后将自己的包放入默认目录。宿主正常入口要求清单 `id` 为 `xiaoxing`、`approved` 为 `true`，并通过状态机结构校验；不要直接删去过渡或伪造素材通过。

动作结构与当前完整示例见 `motion.json` 和 `frontend/src/lib/companionMotion.ts`。`clips` 定义视频及起止姿态；`actions` 定义动作序列；`bridges` 定义回正路径。保留各动作引用的片段及完整姿态过渡。左右不对称人物需要独立方向素材。位移按视频画面显示高度归一化；`travel` 支持单向区间或单调关键帧。配置后运行下列测试，并实际检查透明窗口、动作衔接和行走位移。

本项目是固定动作桌宠，不包含大模型聊天、语音克隆或屏幕读取功能。更换视频不会自动产生新的动作能力。

## 验证

```sh
node frontend/tests/companion-motion.test.mjs
node --test desktop/tests/main-window.test.cjs
```

桌面构建在 `desktop` 内执行 `npm run build`。自动测试检查状态机和窗口边界逻辑，不替代实际画面与托盘验收。原包已在本机完成网页/桌面与用户托盘操作验收；历史偶发诊断丢帧未复现、原因未定，不承诺所有机器均无卡顿。

## 来源与许可

作者：Jiahao (Dsegnr) Wang · 王佳豪。由星图小星独立桌面工程整理；仅包含桌面宿主、共享播放器/状态机和正式小星素材，不包含团队业务系统、数据库、账号、个人偏好、模型权重或其他社区角色素材。角色动作采用AI辅助生成并经人工筛选、处理和衔接审查。代码与随附小星素材按 MIT 许可提供；第三方依赖遵循各自许可。项目名称不代表对修改版本的背书。
