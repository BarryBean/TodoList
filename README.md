# TodoList
XJTU敏捷web开发大作业

## 基础说明

### 分组

组长：毕宇盛

组员：王艺帆，初继波，张雪

### 实现功能

- 返回所有Todo任务
- 创建一个新的Todo任务
- 返回一个指定ID的Todo任务
- 删除一个Todo任务

### Json结构

```json
{
    "id": 1,
    "content": "xxxxx",
    "updatedTime": "2020-04-15 00:00:00"
}
```

## 使用说明

### 后端

修改`TodoList\backend\src\main\resources\application.properties`中的`todo.store.filename`，修改为相对路径或绝对路径下的`TodoList\data\Tasks.json`文件。

注：`TodoList\data\Tasks.json`使用`/`代替`\`。

### 前端

```shell
npm run start
```

### e2e

```shell
npm install
npm run test
```

若无法成功下载，请使用 `cnpm`。

## 代码提交

### 代码仓库

- Https 地址: https://github.com/BarryBean/TodoList.git
- ssh 地址: git@github.com:BarryBean/TodoList.git

### 拉取代码

命令行中使用 `git clone` 命令拉取代码。

```shell
git clone git@github.com:BarryBean/TodoList.git
```

仓库中主要包含两个分支：`master` 和 `dev` 分支。`master` 分支为功能稳定的代码，一般完成某一个版本开发工作后，将稳定的代码提交至 `master` 分支。`dev` 分支包含处于开发过程中的代码，主要开发工作在 `dev` 分支上进行。

默认 `git clone` 下来的代码只有 `master` 分支，需在本地进行如下工作：

- 使用 `git checkout -b dev` 来创建并切换至 `dev` 分支。
- 使用 `git pull origin dev` 来拉取远程仓库的 `dev` 分支。

### 开发之前

在开始开发工作之前，**需要从 `dev` 分支创建属于自己的 feature 分支，并在该分支上开始开发工作**。

```shell
git checkout -b feature-XX(你的名字) dev
```

### 提交代码

提交代码时可能会出现远程与本地的内容冲突现象，出现冲突时要手动处理冲突。具体流程分为有冲突和无冲突两种情况。

- 无冲突

```shell
git checkout dev # 切换回 develop 分支
git pull origin dev # 查看 develop 分支是否更新，若有更新则拉取最新代码
git checkout feature-XX # 切换回自己的 feature 分支
git rebase dev # 合并 develop 分支到 feature 分支，假设此处无冲突
git checkout dev # 再切换回 develop 分支，准备合并
git merge --no-ff feature-XX # 将 feature 分支合并到 develop 分支，此处无冲突
git push origin dev # 将 develop 分支推送到远程仓库
```

- 有冲突

```shell
git checkout dev # 切换回 develop 分支
git pull origin dev # 查看 develop 分支是否更新，若有更新则拉取最新代码
git checkout feature-XX # 切换回自己的 feature 分支
git rebase dev # 合并 develop 分支到 feature 分支，假设此处有冲突
# 此处需手动处理冲突处理
# 具体处理方式见下文
git add .    # 解决完冲突之后把相应的文件 add 进来
git rebase --continue    # 继续刚才的rebase操作
git checkout dev # 再切换回 develop 分支，准备合并
git merge --no-ff feature-XX # 将 feature 分支合并到 develop 分支，此处无冲突
git push origin dev # 将 develop 分支推送到远程仓库
```

### 冲突处理

使用 SmartGit GUI 处理冲突。