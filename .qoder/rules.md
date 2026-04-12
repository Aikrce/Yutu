# 云旅友途 - 项目开发规则与规范

> 本文档记录项目中已确认的关键设计决策和规范，任何修改不得破坏以下规则。
> 修改时请先对照本文件，避免将已验证的优秀设计改丢。

---

## 1. UI 布局固定规则（不可破坏）

### 1.1 首页头部整体固定
- **品牌栏 + 搜索栏 + 分类Tab 必须作为整体 sticky 固定**
- `sticky top-0 z-40`，背景 `bg-white/95 backdrop-blur-md`
- 分类标签（全部/景点/美食/露营/密室/城市/商务）滑动内容时不可消失
- 只有瀑布流内容区域可以滚动，头部始终可见

### 1.2 底部 TabBar 固定
- `fixed bottom-0`，背景 `bg-white/95 backdrop-blur-md`
- 安全区域适配：`paddingBottom: max(env(safe-area-inset-bottom), 4px)`
- 5个Tab：首页/发现/发布（居中凸起）/消息/我的
- 发布按钮为蓝色圆形凸起设计，不可改为平铺

### 1.3 开屏页
- 开屏时长 2200ms，蓝色背景 + 白色云朵动画 + 进度条
- 开屏后渐变过渡到主内容

---

## 2. 品牌与色彩系统（不可随意更改）

### 2.1 蓝白主色调
- 主色：`#3B82F6`（primary）
- 深蓝：`#1E40AF`（primary-dark）
- 浅蓝：`#60A5FA`（primary-light）
- 品牌IP：蓝色云朵吉祥物（开屏SVG已定义）

### 2.2 功能色
- 成功：`#10B981`（success）
- 警告：`#F97316`（warning）
- 错误：`#EF4444`（error）
- 强调：`#F59E0B`（accent）

### 2.3 详情页自适应主题色（6类）
| 内容类型 | 主色 | 辅色 | 背景 | 暗色模式 |
|---------|------|------|------|---------|
| 森林/户外/露营 | #16A34A | #84CC16 | #F0FDF4 | 否 |
| 美食 | #EA580C | #FBBF24 | #FFF7ED | 否 |
| 商务 | #1E3A5F | #D4AF37 | #F8FAFC | 否 |
| 密室/游戏 | #7C3AED | #A855F7 | #2E1065 | **是** |
| 城市/观光 | #0EA5E9 | #38BDF8 | #F0F9FF | 否 |
| 夜间/酒吧 | #6366F1 | #8B5CF6 | #1E1B4B | **是** |

### 2.4 文本色层级
- 主要文本：`#1E293B`（text-primary）
- 次要文本：`#64748B`（text-secondary）
- 辅助文本：`#94A3B8`（text-tertiary）
- 分割线：`#E2E8F0`（divider）

---

## 3. 瀑布流组件规范

### 3.1 双列布局
- 左右两列，gap `2.5`（10px）
- 外层 `px-2.5`，卡片间距 `gap-2.5`
- 卡片圆角 `rounded-md`（8px），阴影 `shadow-card`

### 3.2 内容卡片结构（不可简化）
```
卡片 = 图片(高度按id取模变化) + 分类角标 + 标题 + 定位 + 求搭子/找陪玩按钮 + 用户信息 + 点赞评论
```
- 图片高度：`120 + (item.id % 3) * 40`，形成错落感
- 分类角标：图片左上角，`bg-black/40 backdrop-blur-sm`
- 有陪玩标记时显示"求搭子"+"找陪玩"两个按钮
- 用户头像使用 Avatar 组件，无文字

### 3.3 无限滚动
- 触底加载：`window.innerHeight + window.scrollY >= document.body.offsetHeight - 400`
- 每次加载 10 条，初始 20 条
- 切换分类时重置 displayCount 为 20

### 3.4 分类筛选
- 7个分类：全部/景点/美食/露营/密室/城市/商务
- 选中态：`bg-primary text-white shadow-sm`
- 未选中态：`bg-background text-text-secondary`
- 横向滚动，隐藏滚动条（scrollbar-hide）

---

## 4. 组件使用规范

### 4.1 Avatar 组件
- **不显示文字**，仅显示颜色头像 + 在线状态指示器
- 尺寸：xs/sm/md/xl
- 颜色由 name 哈希自动生成

### 4.2 通用组件库
- Button：主色/次级/文字/危险 四种变体
- Card：`bg-card rounded-md shadow-card`
- Tag：小标签，用于分类标记
- Input：带图标前缀的输入框
- Skeleton：加载骨架屏

### 4.3 云朵图标体系
- 小图标（通知铃、搜索等）统一使用 lucide-react
- 品牌云朵使用自定义 SVG，不可替换

---

## 5. 移动端适配规范

### 5.1 安全区域
- 顶部：`paddingTop: max(env(safe-area-inset-top), 8px)`
- 底部：`paddingBottom: max(env(safe-area-inset-bottom), 4px)`
- 最大宽度：`max-width: 430px`，居中显示

### 5.2 触摸交互
- 所有可点击元素添加 `touch-feedback` 类
- 按钮按下缩放：`active:scale-[0.97]`
- 禁用高亮：`-webkit-tap-highlight-color: transparent`
- 禁止过度滚动：`overscroll-behavior-y: none`

### 5.3 PWA
- 支持「添加到主屏幕」全屏运行
- manifest.json 配置 `display: standalone`
- 主题色 `#3B82F6`

---

## 6. 数据规范

### 6.1 内容数据
- 数据源：`src/data/contents.ts`
- 每分类 30+ 条真实中国场景数据
- 图片使用 `picsum.photos/seed/yutu{id}/{w}/{h}`
- 6个分类 key：spot/food/camping/escape/city/business

### 6.2 ContentItem 接口（不可删减字段）
```typescript
interface ContentItem {
  id: number;
  title: string;
  category: string;
  location: string;
  tags: string[];
  image: string;
  userName: string;
  likes: number;
  comments: number;
  hasCompanion: boolean;
}
```

---

## 7. CSS/Tailwind 规范

### 7.1 双重配置
- `index.css` 的 `@theme` 块定义 Tailwind v4 主题变量
- `tailwind.config.js` 定义 Tailwind v3 兼容配置
- **两处必须保持同步**，修改一处需同步另一处

### 7.2 自定义工具类
- `scrollbar-hide`：隐藏滚动条
- `touch-feedback`：按下透明度变化
- `skeleton`：加载骨架屏动画
- `line-clamp-1/2`：多行文本截断

### 7.3 动画时长
- 快速：150ms（按钮/切换）
- 正常：250ms（页面过渡）
- 慢速：400ms（弹窗/模态框）

---

## 8. 技术栈约束

- 框架：Vite + React + TypeScript
- 样式：Tailwind CSS v4（蓝白主色调 + 自适应主题系统）
- 状态管理：Zustand
- 路由：React Router v6
- 图标：lucide-react
- 瀑布流：自研双列组件（不使用第三方库）
- 后端：Node.js + Express + TypeScript + MySQL

---

## 9. 修改检查清单

每次修改 UI/组件/样式时，请逐项检查：

- [ ] 首页头部（品牌+搜索+分类Tab）是否保持 sticky 固定？
- [ ] 底部 TabBar 是否保持 fixed 固定？
- [ ] 分类标签滑动时是否消失？
- [ ] 瀑布流双列布局是否错落有致？
- [ ] 品牌蓝色主调是否被破坏？
- [ ] 卡片结构是否完整（图片+角标+标题+定位+按钮+用户信息）？
- [ ] Avatar 组件是否无文字？
- [ ] 安全区域适配是否生效？
- [ ] 触摸反馈是否保留？
- [ ] index.css 与 tailwind.config.js 是否同步？
