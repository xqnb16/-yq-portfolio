# 杨乾 YQ 个人网站：上传 GitHub Pages

这是当前网站的完整静态文件包，包含页面、插画、样式和交互动效。无需安装开发工具，也无需购买服务器。现有作品仍为明确标注的色块占位，联系邮箱为 yangqian666@nenu.edu.cn。

## 第一步：解压文件

下载 `YQ-portfolio-GitHub-Pages.zip`，右键选择“全部解压缩”。打开解压后的文件夹，你应该直接看到 `index.html`、`assets` 文件夹等内容。

**上传的是解压后的内容，不是 ZIP 压缩包。不要把外面那一层文件夹一起上传。**

最终 GitHub 仓库首页应该是：

```text
yq-portfolio/
├── index.html
├── app.js
├── styles.css
├── portfolio-data.js
├── title-motion.js
├── title-motion.css
├── assets/
│   ├── favicon.svg
│   ├── yq-bed-pillow.png
│   ├── yq-hero-source.png
│   └── yq-scene.png
├── .nojekyll
├── README.md
└── GitHub-Pages上传说明.md
```

## 第二步：创建公开仓库

1. 登录 [GitHub](https://github.com/)，右上角“＋”选择 **New repository**，也可以直接打开 [创建仓库](https://github.com/new)。
2. **Repository name** 填 `yq-portfolio`。这个名字以后会出现在网址里。
3. 选择 **Public**（公开）。GitHub 免费账户可以通过公开仓库使用 GitHub Pages。
4. 勾选添加 **README**，方便创建后直接进入文件列表。
5. 点击 **Create repository**。

## 第三步：上传网站

1. 在仓库的 **Code** 页面，选择 **Add file → Upload files**。
2. 打开刚刚解压的文件夹，把里面的所有文件和整个 `assets` 文件夹拖到上传区。保留 `assets` 这一层目录，不要只把里面的图片单独拖出来。
3. 检查上传列表里有 `index.html`，图片路径是 `assets/图片名.png`。
4. 提交说明可以写 `上传 YQ 个人网站`。
5. 选择直接提交到 **main**，点击 **Commit changes**。

如果看不到 `.nojekyll`，可在 Windows 资源管理器“查看 → 显示 → 隐藏的项目”中打开显示。包里已经包含它；它用于告诉 GitHub 直接发布静态文件。本网站的现有文件结构在未上传它时也可正常工作。

## 第四步：开启 GitHub Pages

1. 进入仓库顶部 **Settings**。
2. 左侧选择 **Pages**。
3. 在 **Build and deployment** 下，把 **Source** 设为 **Deploy from a branch**。
4. **Branch** 选择 **main**，右边文件夹选择 **/(root)**。
5. 点击 **Save**。
6. 等待部署完成，刷新这个设置页面，通过 **Visit site** 打开网站。首次发布有时需要等待约 10 分钟。

如果仓库叫 `yq-portfolio`，公开地址通常是：

```text
https://你的GitHub用户名.github.io/yq-portfolio/
```

把“你的GitHub用户名”换成真实用户名。这是访客访问的网站地址；`github.com/用户名/yq-portfolio` 则是管理文件的仓库地址。发布后，别人无需登录即可访问网站。

本网站使用 `#/work`、`#/about` 等页内地址，适用于 GitHub Pages。页面、图片和动效均使用相对路径，仓库名更换后也能使用。

## 以后怎样更新

我们完善网站后，继续使用这个仓库，不必重新建仓库或重新设置 Pages：

1. 解压新的完整网站文件包。
2. 在原仓库点击 **Add file → Upload files**。
3. 上传更新后的文件和 `assets` 文件夹，保持原来的文件名与目录结构。同路径文件会在提交后更新，无需先删除旧文件。
4. 点击 **Commit changes**，GitHub Pages 会自动重新部署。
5. 等部署完成后刷新网站。如果仍显示旧内容，可以按 **Ctrl + F5** 强制刷新。

如果未来明确删除或改名了某些文件，再单独清理不再使用的旧文件即可。保存这份原始压缩包，也方便回看当前版本。

## 常见问题

- **404**：先确认 Pages 的分支是 `main`、目录是 `/(root)`，且仓库最外层有 `index.html`；再检查网址包含仓库名，并等待部署完成。
- **页面没有图片或样式**：通常是漏传 `assets`、CSS 或 JS，或多套了一层文件夹。按照上面的目录结构补齐。
- **上传了 ZIP 但网站没有出现**：GitHub 不会自动解压，请解压后上传里面的文件。
- **只有项目说明，没有网站**：可能打开的是 GitHub 仓库页面，请从 Settings → Pages → Visit site 进入。
- **部署失败**：在仓库 **Actions** 页查看最近一次 Pages 部署是否成功。
- **中文或字体看起来稍有不同**：网站使用系统字体，不同电脑的具体字形可能略有区别。

## 文件用途（后续修改时参考）

| 文件 | 用途 |
| --- | --- |
| `index.html` | 网站入口、标题、导航和页面基础信息 |
| `app.js` | 页面布局、作品相册、交互与页面切换 |
| `portfolio-data.js` | 设计类别和作品列表；以后添加真实作品时修改这里 |
| `styles.css` | 全站配色、排版和适配 |
| `title-motion.js` / `title-motion.css` | 首页标题的点阵与鼠标交互 |
| `assets/` | IP 插画和网站图标 |
| `.nojekyll` | GitHub Pages 静态发布标记 |

此包仅包含网站公开运行文件，不包含本地 Git 历史、托管凭证或开发工具；当前已上线的网站不受导出影响。角色跌落、抛枕等尚未制作的动画不包含在这个版本中。

## GitHub 官方说明

- [创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [上传文件到仓库](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [设置 Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

导出日期：2026-10-23。
