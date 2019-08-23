export const routeConfigs = [
  {
    path: "/",
    name: "bashboard",
    component: () =>
      import(/* webpackChunkName "dashboard" */ "@page/dashboard")
  },
  {
    path: "juejin",
    name: "掘金",
    component: () => import(/* webpackChunkName "juejin" */ "@page/juejin")
  },
  {
    path: "douban",
    name: "豆瓣",
    component: () => import(/* webpackChunkName "douban" */ "@page/douban")
  },
  {
    path: "zhihu",
    name: "知乎",
    component: () => import(/* webpackChunkName "zhihu" */ "@page/zhihu")
  },
  {
    path: "github",
    name: "github",
    component: () => import(/* webpackChunkName "github" */ "@page/github")
  },
  {
    path: "code-open",
    name: "codeOpen",
    component: () => import(/* webpackChunkName "codeOpen" */ "@page/codeOpen")
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
