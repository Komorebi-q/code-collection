export const routeConfigs = [
  {
    path: "/",
    name: "bashboard",
    icon: "dash-board-",
    component: () =>
      import(/* webpackChunkName "dashboard" */ "@page/dashboard")
  },
  {
    path: "juejin",
    name: "掘金",
    icon: "juejin",
    component: () => import(/* webpackChunkName "juejin" */ "@page/juejin")
  },
  {
    path: "douban",
    name: "豆瓣",
    icon: "douban",
    component: () => import(/* webpackChunkName "douban" */ "@page/douban")
  },
  {
    path: "zhihu",
    name: "知乎",
    icon: "zhihu",
    component: () => import(/* webpackChunkName "zhihu" */ "@page/zhihu")
  },
  {
    path: "github",
    name: "github",
    icon: "git",
    component: () => import(/* webpackChunkName "github" */ "@page/github")
  },
  {
    path: "code-open",
    name: "codeOpen",
    component: () => import(/* webpackChunkName "codeOpen" */ "@page/codeOpen")
  },
  {
    path: "collection",
    name: "收藏夹",
    icon: "shoucangjia",
    component: () =>
      import(/* webpackChunkName "collection" */ "@page/collection")
  }
  // {
  //   path: "/free-code-camp",
  //   name: "freeCodeCamp"
  // }
];

/**
 * 掘金
 * 简书
 * 豆瓣
 * 知乎
 * github
 * codeOpen
 * freeCodeCamp
 */
