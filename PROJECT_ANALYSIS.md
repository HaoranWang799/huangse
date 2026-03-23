# 📊 项目完整分析报告

## 一、项目概览

### 基本信息
- **项目名称**: AI 伴侣应用平台
- **技术栈**: React 18 + TypeScript + Vite + Tailwind CSS
- **UI框架**: Radix UI + Lucide Icons
- **目标平台**: 移动端（430px 宽度优化）
- **设计理念**: 高端 AI 陪伴 + 硬件控制中枢 + 模板商城 + 社区生态

### 项目定位
```
飞机杯硬件控制中枢 + AI场景体验 + 模板商城 + 社区生态 + 裂变增长 + 会员订阅
```

---

## 二、页面清单及功能描述

### 1️⃣ 核心用户体验流
| 页面 | 路由 | 状态 | 功能描述 |
|------|------|------|--------|
| 🎯 Home | `/` `/home` | ✅ 完成 | 首页-快速操作、推荐陪伴、会员提示、邀请横幅 |
| 📱 Onboarding | `/onboarding` | ✅ 完成 | 3步引导-隐私/沉浸/隐私要点 |
| 🔐 Login | `/login` | ✅ 完成 | 邮箱/密码/年龄确认/社交登录 |
| ✨ CreateScenario | `/create` | ⚠️ 部分 | 角色选择、场景选择、强度设置、语音选择、时长控制 |
| 🎬 ScenarioResult | `/result` | ⚠️ 部分 | AI生成完成展示、场景详情、AI参数 |
| 🎧 ImmersiveSession | `/session` | ✅ 完成 | 沉浸体验-波形可视化、进度控制、设备同步、强度调节 |

### 2️⃣ 内容浏览类
| 页面 | 路由 | 状态 | 功能描述 |
|------|------|------|--------|
| 🛍️ Explore | `/explore` | ⚠️ 部分 | 模板商城-多标签、筛选系统、模板卡片 |
| 👥 Community | `/community` | ⚠️ 部分 | 社区动态-Feed流、创作者信息、互动功能 |
| 📊 Insights | `/insights` | ⚠️ 部分 | 健康洞察-统计图表、周活跃度、偏好分析 |

### 3️⃣ 硬件及设备类
| 页面 | 路由 | 状态 | 功能描述 |
|------|------|------|--------|
| 🔌 DeviceConnect | `/device` | ⚠️ 部分 | 设备连接-已连接列表、扫描功能、信号显示 |
| ⚙️ HardwareControl | `/hardware` | ⚠️ 部分 | 硬件控制台-波形、节奏模式、强度频率调节 |

### 4️⃣ 账户及商业化
| 页面 | 路由 | 状态 | 功能描述 |
|------|------|------|--------|
| 💳 Subscription | `/subscription` | ⚠️ 部分 | 订阅方案-Free/Plus/Premium、虚拟币礼包 |
| 🎁 Referral | `/referral` | ⚠️ 部分 | 邀请体系-邀请码、统计、历史记录 |
| 👤 Profile | `/profile` | ⚠️ 部分 | 个人资料-设备信息、统计数据、菜单导航 |
| ❓ Help | `/help` | ⚠️ 部分 | 帮助中心-分类文章、FAQ、搜索 |
| 404 NotFound | `/*` | ✅ 完成 | 错误页面 |

### 状态说明
- ✅ **完成** = 页面框架完整，逻辑实现充分
- ⚠️ **部分** = 框架完整，但缺少具体业务逻辑/数据交互
- ⚠️⚠️ **缺失** = 页面框架不完整或关键功能缺失

---

## 三、详细功能缺失清单

### 📌 第1类：状态管理与数据流

#### 1.1 用户认证体系 ❌
```
缺失项：
- 登录状态持久化（localStorage/sessionStorage）
- 用户信息全局状态（useContext/Redux）
- 登录守卫和身份验证检查
- 自动登出/会话过期处理
- 社交登录集成（Google/Apple）
```

#### 1.2 数据持久化 ❌
```
缺失项：
- 本地数据存储策略
- 应用状态管理方案（Redux/Zustand）
- API 数据缓存机制
- 离线功能支持
```

#### 1.3 实时数据同步 ❌
```
缺失项：
- WebSocket 连接处理
- 长连接心跳保活
- 实时通知推送（FCM/APNs）
- 数据双向绑定
```

---

### 📌 第2类：API 集成与后端服务

#### 2.1 API 服务层 ❌
```
缺失项：
- HTTP 客户端配置（axios/fetch）
- API 基础 URL 配置
- 请求/响应拦截器
- 错误处理和重试机制
- 请求超时配置
```

#### 2.2 关键 API 端点 ❌
```
需要集成的接口：
1. 认证相关
   - POST /auth/login
   - POST /auth/register
   - POST /auth/logout
   - POST /auth/refresh-token
   - POST /auth/social-login

2. 场景相关
   - GET /scenarios
   - POST /scenarios/generate
   - GET /scenarios/:id
   - POST /scenarios/:id/save
   - DELETE /scenarios/:id

3. 设备相关
   - GET /devices
   - POST /devices/pair
   - DELETE /devices/:id
   - PUT /devices/:id/sync

4. 用户相关
   - GET /user/profile
   - PUT /user/profile
   - GET /user/history
   - GET /user/insights

5. 社区相关
   - GET /feeds
   - POST /feeds/:id/like
   - POST /feeds/:id/comment
   - GET /templates

6. 订阅相关
   - GET /subscriptions/plans
   - POST /subscriptions/purchase
   - GET /subscriptions/status

7. 推荐相关
   - GET /referral/code
   - POST /referral/share
   - GET /referral/history
```

#### 2.3 WebSocket 实时通信 ❌
```
缺失项：
- AI 场景生成进度推送
- 设备同步状态推送
- 社区动态实时更新
- 消息通知系统
```

---

### 📌 第3类：业务逻辑实现

#### 3.1 AI 场景生成流程 ⚠️
```
现状：CreateScenario 有 UI，但缺少：
- 实际调用 AI 生成 API
- 生成进度跟踪
- 结果持久化保存
- 生成失败重试
- 用户配额检查

需要实现：
1. 验证用户配额（Free/Plus/Premium）
2. 组合用户选择条件为 Prompt
3. 调用 AI 生成服务（OpenAI/自建）
4. 实时推送生成进度
5. 保存生成结果到数据库
6. 返回场景到 ScenarioResult 页面
```

#### 3.2 硬件控制集成 ❌
```
缺失项：
- Bluetooth 设备发现和配对（Web Bluetooth API）
- 硬件通信协议实现
- 实时参数同步（强度、节奏、频率）
- 连接状态监听
- 设备固件版本管理
- 故障诊断和断线重连

需要实现：
1. 使用 Web Bluetooth API 搜索设备
2. 实现与硬件的双向通信
3. 动态节奏生成算法
4. 参数实时推送到设备
5. 设备状态反馈处理
```

#### 3.3 会话录制与历史 ❌
```
缺失项：
- 会话数据记录
- 会话结束统计（时长、参数、强度曲线）
- 历史查询和回放
- 会话数据可视化

需要实现：
1. 开始会话时记录时间戳
2. 每秒记录主要参数
3. 会话结束时上传数据
4. 生成会话报告
5. 展示历史统计和趋势
```

#### 3.4 社区内容管理 ⚠️
```
现状：Community 页面有 mock 数据，缺少：
- 真实数据源（API）
- 点赞/评论/收藏逻辑
- 创作者关注功能
- 内容搜索和过滤
- 分页加载

需要实现：
1. 从后端获取 Feed 流
2. 点赞/评论数据上传
3. 创作者资料页面
4. 用户评论系统
5. 举报和内容审核
```

#### 3.5 模板商城 ⚠️
```
现状：Explore 页面有 UI，缺少：
- 真实模板数据
- 搜索和高级筛选
- 购买流程
- 模板预览功能
- 评价系统

需要实现：
1. 从后端加载模板列表
2. 实现搜索功能
3. 模板排序和筛选
4. 模板购买或下载
5. 用户评价展示
```

#### 3.6 订阅和支付 ⚠️
```
现状：Subscription 页面展示方案，缺少：
- 支付网关集成（Stripe/PayPal/支付宝）
- 订阅状态管理
- 自动续费逻辑
- 发票管理
- 流量控制对接

需要实现：
1. 第三方支付集成
2. 订阅后更新用户权限
3. 自动续费处理
4. 取消订阅逻辑
5. 优惠券系统
```

#### 3.7 推荐和搜索 ⚠️
```
缺失项：
- AI 推荐算法
- 个性化内容推送
- FTS 全文搜索
- 热度排序算法
- 用户行为追踪

需要实现：
1. 收集用户行为数据
2. 构建用户兴趣模型
3. 实现推荐算法
4. 搜索功能完善
5. A/B 测试框架
```

---

### 📌 第4类：页面功能完善

#### 4.1 Home 页面 ⚠️
```
缺失项：
- 实际用户数据（欢迎名字、免费次数）
- 动态推荐（基于用户历史）
- 快捷操作跳转完整化
- 上拉刷新和下拉加载
```

#### 4.2 CreateScenario 页面 ⚠️
```
缺失项：
- 实际 AI 生成调用
- 进度实时更新
- 生成参数验证
- 本地草稿保存
- 高级自定义选项
```

#### 4.3 ScenarioResult 页面 ❌
```
缺失项：
- 生成的场景数据展示
- 下载功能
- 分享功能
- 添加到收藏
- 开始会话验证和跳转
```

#### 4.4 ImmersiveSession 页面 ⚠️
```
现状：UI 和逻辑框架完整，缺少：
- 实际音频播放（Web Audio API）
- Bluetooth 设备参数推送
- 实时节奏生成
- 会话数据记录
- 优雅的错误处理（设备断联等）
```

#### 4.5 Explore 页面 ⚠️
```
缺失项：
- 真实模板数据
- 搜索功能实现
- 高级筛选执行
- 模板预览
- 分页和加载更多
```

#### 4.6 Community 页面 ⚠️
```
缺失项：
- 真实 Feed 数据
- 点赞/评论数据持久化
- 创作者资料页
- 内容举报功能
- 评论系统
```

#### 4.7 Insights 页面 ✅
```
状态：框架完整，可视化数据完整
缺失项：
- 真实数据源（从后端获取）
- 时间范围选择（周/月/年）
- 数据导出功能
```

#### 4.8 DeviceConnect 页面 ⚠️
```
缺失项：
- 实际 Bluetooth 扫描
- 配对流程完整化
- 多设备同时连接
- 设备固件更新
- 连接诊断
```

#### 4.9 HardwareControl 页面 ⚠️
```
缺失项：
- 实际设备控制
- 参数推送到设备
- 实时反馈获取
- 节奏协议实现
- 设备状态同步
```

#### 4.10 Subscription 页面 ⚠️
```
缺失项：
- 支付流程实现
- 当前订阅状态显示
- 升级降级流程
- 发票列表
- 促销码应用
```

#### 4.11 Profile 页面 ⚠️
```
缺失项：
- 真实用户数据加载
- 设备管理真实化
- 统计数据真实化
- 账户设置页面链接修复
- 隐私设置页面链接修复
```

#### 4.12 Referral 页面 ⚠️
```
缺失项：
- 真实邀请码生成
- 邀请链接生成
- 邀请历史加载
- 奖励状态管理
- 提现功能
```

#### 4.13 Help 页面 ⚠️
```
缺失项：
- 真实文章内容加载
- 分类文章列表实现
- 搜索功能实现
- FAQ 交互逻辑
- 在线客服集成
```

---

### 📌 第5类：导航和路由缺失

#### 5.1 缺失的页面路由
```
需要补充的路由：
1. /settings - 账户设置
2. /privacy - 隐私与安全
3. /saved - 收藏的场景
4. /downloads - 已下载模板
5. /payment - 支付方式
6. /help/:articleId - 帮助文章详情
7. /creator/:id - 创作者资料
8. /template/:id - 模板详情
9. /scenario/:id - 场景详情
10. /result/:id - 历史场景回放
```

#### 5.2 页面跳转完整性
```
问题页面：
- /settings - 在 Profile 菜单中引用但未创建
- /privacy - 在 Profile 菜单中引用但未创建
- /saved - 在 Profile 菜单中引用但未创建
- /downloads - 在 Profile 菜单中引用但未创建
- /payment - 在 Profile 菜单中引用但未创建
```

---

### 📌 第6类：组件库和 UI 完善

#### 6.1 现有 UI 组件库
```
✅ 已有 40+ Radix UI 组件：
- accordion, alert, alert-dialog, aspect-ratio
- avatar, badge, breadcrumb, button
- calendar, carousel, chart, checkbox
- collapsible, command, context-menu, dialog
- drawer, dropdown-menu, form, hover-card
- input, input-otp, label, menubar
- navigation-menu, pagination, popover, progress
- radio-group, resizable, scroll-area, select
- separator, sheet, sidebar, skeleton
- slider, switch, table, tabs
- textarea, toggle, toggle-group, tooltip
- 自定义 UI 组件：ImageWithFallback, AudioPlayer
```

#### 6.2 缺失的高级组件
```
需要新增：
1. 滑动验证码（Captcha）
2. 加载骨架屏（Skeleton 屏）
3. 空状态（Empty State）
4. 错误边界（Error Boundary）
5. 图片懒加载
6. 无限滚动
7. 日期选择器增强
8. 富文本编辑器
9. 图片上传器
10. 视频播放器
```

#### 6.3 主题和样式
```
现状：
- ✅ Tailwind CSS 配置完整
- ✅ 自定义颜色变量（primary, accent, destructive）
- ⚠️ 缺少 Dark/Light 主题切换逻辑
- ⚠️ 缺少字体自定义加载
```

---

### 📌 第7类：性能和优化

#### 7.1 代码分割 ❌
```
缺失项：
- 路由级懒加载（lazy loading）
- 组件级代码分割
- 动态导入
```

#### 7.2 性能优化 ❌
```
缺失项：
- 图片优化和 CDN
- 资源预加载（preload/prefetch）
- 缓存策略（HTTP Cache）
- 虚拟长列表
- 防抖和节流
```

#### 7.3 SEO 优化 ❌
```
缺失项：
- Meta 标签管理
- Open Graph 配置
- 结构化数据
- 动态 Meta 更新
```

---

### 📌 第8类：安全和合规

#### 8.1 安全防护 ❌
```
缺失项：
- XSS 防护
- CSRF 防护
- 内容安全策略（CSP）
- 密钥的环境变量管理
- 敏感数据加密
- API 请求签名验证
```

#### 8.2 授权和权限 ❌
```
缺失项：
- 角色权限管理（RBAC）
- 功能权限判断（不同订阅等级）
- 年龄验证流程
- 内容分级系统
```

#### 8.3 合规性 ❌
```
缺失项：
- 个人数据保护（GDPR 兼容）
- 年龄限制验证
- 内容审核日志
- 数据删除功能
- 隐私政策页面
- 服务条款页面
```

---

### 📌 第9类：测试和监控

#### 9.1 自动化测试 ❌
```
缺失项：
- 单元测试（Jest）
- 组件测试（React Testing Library）
- 集成测试
- E2E 测试（Cypress/Playwright）
```

#### 9.2 错误监控 ❌
```
缺失项：
- 错误日志收集（Sentry）
- 应用性能监控（APM）
- 用户分析（Google Analytics）
- 崩溃报告
```

#### 9.3 本地调试 ❌
```
缺失项：
- Redux DevTools
- React DevTools
- API 调试工具
- 本地 mock 数据
```

---

### 📌 第10类：部署和 DevOps

#### 10.1 构建配置 ✅
```
现状：
- ✅ Vite 配置完整
- ✅ TypeScript 配置完整
- ✅ Tailwind 配置完整
```

#### 10.2 环境管理 ❌
```
缺失项：
- .env 环境变量配置
- 多环境配置（dev/staging/prod）
- API 基础 URL 管理
```

#### 10.3 部署流程 ❌
```
缺失项：
- GitHub Actions/GitLab CI
- 自动化测试流程
- 版本管理（semantic versioning）
- 发布流程
```

---

## 四、路由层级问题分析

### 4.1 孤立页面（无导航入口）
```
页面                     备注
--------------------------------------
/settings             在 Profile 中引用但页面不存在
/privacy              在 Profile 中引用但页面不存在
/saved                在 Profile 中引用但页面不存在
/downloads            在 Profile 中引用但页面不存在
/payment              在 Profile 中引用但页面不存在
```

### 4.2 页面跳转链接完整性
```
✅ 正常链接：
- Home → Create/Hardware/Session/Insights/Explore/Subscription/Profile
- BottomNav → 5个主要页面完整
- Subscription → Login/Home

⚠️ 待修复链接：
- Profile 中多个菜单项指向不存在的页面
- Help 中文章详情页面缺失
- Community 中创作者资料页面缺失
- Explore 中模板详情页面缺失
```

---

## 五、数据流陷阱

### 5.1 Mock 数据问题
```
所有页面都使用了本地 mock 数据：
- Home: companions, companions 卡片
- Explore: templates 列表
- Community: feedItems
- Insights: weeklyData
- Referral: stats, recentReferrals
- Help: categories, faqs
- 等等...

这意味着：
❌ 用户数据不会持久化
❌ 多设备同步不可能
❌ 实时更新不存在
❌ 个性化内容不存在
```

### 5.2 缺失的全局状态
```
问题：
- 用户登录状态缺失
- 订阅状态缺失
- 设备连接状态缺失
- 会话历史缺失
- 用户偏好设置缺失

影响：
- 刷新页面后登录状态丢失
- 无法记住用户选择
- 无法跨页面共享数据
```

---

## 六、改进优先级排序

### 🔴 高优先级（核心功能，必须实现）
```
1. 用户认证系统 - 决定产品可用性
2. API 层实现 - 所有数据来源
3. 状态管理 - 数据一致性基础
4. AI 场景生成 - 核心业务逻辑
5. 硬件控制集成 - 产品差异化
6. 会议录制功能 - 用户价值
7. 支付集成 - 商业化必需
8. 缺失页面补全 - 功能完整性
```

### 🟡 中优先级（重要功能，应尽快实现）
```
1. 社区功能完善 - 用户活跃度
2. 模板商城完善 - 内容库
3. 推荐系统 - 用户留存
4. 搜索功能 - 内容发现
5. 高级 UI 组件 - 用户体验
6. 自动化测试 - 代码质量
7. 性能优化 - 用户体验
```

### 🟢 低优先级（增强功能，可优化调整）
```
1. SEO 优化 - 需要 Web 版本
2. 国际化 i18n - 暂不需要
3. 主题切换 - 可后期支持
4. 分析监控 - MVP 后考虑
5. DevOps 完善 - 规模化后需要
```

---

## 七、建议的实现路线图

### Phase 1: MVP 核心功能（2-4周）
```
Week 1-2:
- ✅ 用户认证系统接入
- ✅ API 客户端搭建
- ✅ 全局状态管理实现

Week 2-3:
- ✅ AI 场景生成流程
- ✅ 缺失页面补全
- ✅ 路由链接修复

Week 4:
- ✅ 硬件控制基础
- ✅ 会话录制功能
- ✅ 基础测试覆盖
```

### Phase 2: 功能完善（4-6周）
```
Week 5-6:
- ✅ 社区功能完整化
- ✅ 模板商城完善
- ✅ 支付网关集成

Week 6-7:
- ✅ 搜索和推荐
- ✅ UI 组件库增强
- ✅ 性能优化

Week 8:
- ✅ 自动化测试
- ✅ 错误监控
- ✅ Beta 测试
```

### Phase 3: 商业化和运营（6+周）
```
- ✅ SEO 优化
- ✅ 分析监控完善
- ✅ DevOps 流程
- ✅ 运营功能（后台管理等）
```

---

## 八、关键依赖和集成清单

### 必需的第三方服务
```
1. AI 生成服务
   - OpenAI GPT-4 / 文心一言 / 其他
   
2. 支付服务
   - Stripe / PayPal / 支付宝 / 微信支付
   
3. 推送通知
   - FCM (Firebase) / APNs
   
4. 云存储
   - AWS S3 / 阿里 OSS / 腾讯 COS
   
5. 分析和监控
   - Sentry / DataDog / 自建
   
6. 实时通信
   - Socket.io / WebSocket
   
7. 图表库
   - Recharts (已有)
```

### 后端技术栈建议
```
- 语言：Node.js (Express/Nest.js) 或 Python (FastAPI/Django)
- 数据库：PostgreSQL + Redis
- 认证：JWT + OAuth2
- 消息队列：RabbitMQ / Kafka
- 文件存储：S3 / 本地存储
- 缓存：Redis
```

---

## 九、代码质量建议

### 代码组织改进
```
src/
├── app/
│   ├── pages/              ✅ 完整
│   ├── components/         ⚠️ 需要分层
│   │   ├── common/         (通用组件)
│   │   ├── features/       (功能组件)
│   │   ├── layout/         (布局组件)
│   │   └── ui/             ✅ 完整
│   ├── hooks/              ❌ 缺失（自定义 Hooks）
│   ├── services/           ❌ 缺失（API 服务）
│   ├── stores/             ❌ 缺失（状态管理）
│   ├── utils/              ⚠️ 待建（工具函数）
│   ├── types/              ⚠️ 待建（类型定义）
│   ├── styles/             ✅ 完整
│   └── routes.tsx          ✅ 完整
├── config/                 ❌ 缺失（配置）
└── main.tsx               ✅ 完整
```

### 类型安全
```
现状：
- ✅ TypeScript 已配置
- ✅ 大部分页面有类型

需要：
- 统一的 API 响应类型
- 环境变量类型定义
- 全局状态类型定义
- 业务数据类型库
```

---

## 十、关键开发任务清单

### 第一阶段关键任务

- [ ] 1. 搭建 API 服务层（axios 配置 + 拦截器）
- [ ] 2. 实现用户认证系统（登录/注册/Token 管理）
- [ ] 3. 建立全局状态管理（Zustand/Redux）
- [ ] 4. 创建缺失的 5 个页面（settings/privacy/saved/downloads/payment）
- [ ] 5. 修复 Profile 中的路由链接
- [ ] 6. 实现 AI 场景生成 API 对接
- [ ] 7. 添加错误边界和错误处理
- [ ] 8. 实现会话数据持久化

### 第二阶段验证任务

- [ ] 1. 真实用户认证登录流程
- [ ] 2. 场景生成完整流程（端到端）
- [ ] 3. 硬件 Bluetooth 连接功能
- [ ] 4. 支付流程验证
- [ ] 5. 社区互动功能测试
- [ ] 6. 性能基准测试

### 持续进行的任务

- [ ] 编写单元测试（至少 50% 覆盖率）
- [ ] 代码审查和重构
- [ ] 文档编写
- [ ] 用户反馈收集
- [ ] Bug 修复

---

## 十一、总体评估

### 项目成熟度
```
UI 框架完整度:     ████████░░ 80%
功能实现度:        ███░░░░░░░ 30%
业务逻辑集成度:    ██░░░░░░░░ 10%
测试覆盖度:        ░░░░░░░░░░ 0%
文档完整度:        ██░░░░░░░░ 20%

总体评估: Alpha 阶段
可投入使用?: ❌ 否（缺少核心后端集成）
```

### 项目亮点
```
✨ 设计系统完善
✨ 移动端交互考虑周全
✨ 功能覆盖全面
✨ UI 组件库齐全
✨ 代码结构清晰
```

### 主要瓶颈
```
🔴 后端 API 完全缺失
🔴 用户认证系统缺失
🔴 状态管理缺失
🔴 业务逻辑缺失
🔴 测试覆盖为零
```

---

## 十二、快速启动对策

如果需要快速上线 MVP，建议：

### 1. 最小可用功能集合（2周冲刺）
```
✅ 用户登录/注册（Mock）
✅ 场景列表展示（Mock）
✅ 场景生成流程（Mock 返回）
✅ 会话播放（模拟）
✅ 用户资料页面
```

### 2. 快速测试方案
```
- 使用 Mock Server（MSW / json-server）
- 本地 JSON 文件模拟数据
- 前端自生成测试数据
- 跳过认证验证
```

### 3. 后续优化步骤
```
1. 周期 1: 真实后端接入（优先级: 认证 > 场景 > 用户）
2. 周期 2: 硬件集成调试
3. 周期 3: 支付和社区
4. 周期 4: 优化和扩展
```

---

## 附录 A: 缺失路由详细清单

```
待补充的页面：

1. /settings
   ├── 账户设置
   ├── 邮箱管理
   ├── 密码修改
   └── 两因素认证

2. /privacy
   ├── 隐私政策
   ├── 数据使用说明
   ├── 权限管理
   └── 数据导出

3. /saved
   ├── 收藏场景列表
   ├── 分类过滤
   └── 批量操作

4. /downloads
   ├── 下载模板列表
   ├── 下载进度
   └── 本地储存管理

5. /payment
   ├── 支付方式列表
   ├── 添加支付方式
   ├── 默认支付方式
   └── 交易历史

缺失的详情页：

1. /help/:articleId - 帮助文章详情
2. /creator/:id - 创作者资料页
3. /template/:id - 模板详情和预览
4. /scenario/:id - 场景详情
5. /result/:id - 历史场景回放
6. /feed/:id - 社区动态详情
```

---

## 附录 B: Mock 数据到真实数据迁移指南

### 迁移步骤
```
1. 创建 API 服务层 (src/services/)
2. 为每个 Mock 数据集创建对应 API 方法
3. 在页面中用 useEffect + API 替换 useState
4. 添加加载态和错误处理
5. 配置错误重试机制
6. 使用 React Query 或 SWR 管理缓存

示例迁移：

Before (Mock):
const [templates] = useState([
  { id: 1, title: '月光对话', ... }
])

After (Real):
const { data: templates } = useQuery('templates', () =>
  api.getTemplates()
)
```

---

**报告生成时间**: 2026-03-22
**报告版本**: 1.0
**作者**: 项目分析系统

---
