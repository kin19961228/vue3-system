import {
  createRouter,
  createWebHashHistory,
  type RouteMeta,
  type RouteRecordRaw,
} from "vue-router";
import { usePermissStore } from "../store/permiss";

// const routes: RouteRecordRaw[] = [
//     {
//         path: '/',
//         redirect: '/dashboard',
//     },
//     {
//         path: '/',
//         name: 'Home',
//         component: Home,
//         children: [
//             {
//                 path: '/dashboard',
//                 name: 'dashboard',
//                 meta: {
//                     title: '系统首页',
//                     permiss: '1',
//                 },
//                 component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
//             },
//             {
//                 path: '/table',
//                 name: 'basetable',
//                 meta: {
//                     title: '表格',
//                     permiss: '2',
//                 },
//                 component: () => import(/* webpackChunkName: "table" */ '../views/table.vue'),
//             },
//             {
//                 path: '/charts',
//                 name: 'basecharts',
//                 meta: {
//                     title: '图表',
//                     permiss: '11',
//                 },
//                 component: () => import(/* webpackChunkName: "charts" */ '../views/charts.vue'),
//             },
//             {
//                 path: '/form',
//                 name: 'baseform',
//                 meta: {
//                     title: '表单',
//                     permiss: '5',
//                 },
//                 component: () => import(/* webpackChunkName: "form" */ '../views/form.vue'),
//             },
//             {
//                 path: '/tabs',
//                 name: 'tabs',
//                 meta: {
//                     title: 'tab标签',
//                     permiss: '3',
//                 },
//                 component: () => import(/* webpackChunkName: "tabs" */ '../views/tabs.vue'),
//             },
//             {
//                 path: '/donate',
//                 name: 'donate',
//                 meta: {
//                     title: '鼓励作者',
//                     permiss: '14',
//                 },
//                 component: () => import(/* webpackChunkName: "donate" */ '../views/donate.vue'),
//             },
//             {
//                 path: '/permission',
//                 name: 'permission',
//                 meta: {
//                     title: '权限管理',
//                     permiss: '13',
//                 },
//                 component: () => import(/* webpackChunkName: "permission" */ '../views/permission.vue'),
//             },
//             {
//                 path: '/upload',
//                 name: 'upload',
//                 meta: {
//                     title: '上传插件',
//                     permiss: '6',
//                 },
//                 component: () => import(/* webpackChunkName: "upload" */ '../views/upload.vue'),
//             },
//             {
//                 path: '/icon',
//                 name: 'icon',
//                 meta: {
//                     title: '自定义图标',
//                     permiss: '10',
//                 },
//                 component: () => import(/* webpackChunkName: "icon" */ '../views/icon.vue'),
//             },
//             {
//                 path: '/user',
//                 name: 'user',
//                 meta: {
//                     title: '个人中心',
//                 },
//                 component: () => import(/* webpackChunkName: "user" */ '../views/user.vue'),
//             },
//             {
//                 path: '/editor',
//                 name: 'editor',
//                 meta: {
//                     title: '富文本编辑器',
//                     permiss: '8',
//                 },
//                 component: () => import(/* webpackChunkName: "editor" */ '../views/editor.vue'),
//             },
//             {
//                 path: '/markdown',
//                 name: 'markdown',
//                 meta: {
//                     title: 'markdown编辑器',
//                     permiss: '9',
//                 },
//                 component: () => import(/* webpackChunkName: "markdown" */ '../views/markdown.vue'),
//             },
//             {
//                 path: '/export',
//                 name: 'export',
//                 meta: {
//                     title: '导出Excel',
//                     permiss: '2',
//                 },
//                 component: () => import(/* webpackChunkName: "export" */ '../views/export.vue'),
//             },
//             {
//                 path: '/import',
//                 name: 'import',
//                 meta: {
//                     title: '导入Excel',
//                     permiss: '2',
//                 },
//                 component: () => import(/* webpackChunkName: "import" */ '../views/import.vue'),
//             },
//         ],
//     },
//     {
//         path: '/login',
//         name: 'Login',
//         meta: {
//             title: '登录',
//         },
//         component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
//     },
//     {
//         path: '/403',
//         name: '403',
//         meta: {
//             title: '没有权限',
//         },
//         component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
//     },
// ];

const pages: Record<string, RouteMeta> = import.meta.glob(
  "../views/**/page.ts",
  {
    eager: true,
    import: "default",
  }
);

const pageComps = import.meta.glob("../views/**/index.vue");
console.log(pages);
let routes: RouteRecordRaw[] = Object.entries(pages).map(([path, config]) => {
  let pageJsPath = path;
  path = path.replace("../views", "").replace("/page.ts", "");
  path = path || "/";
  const nameArr = path.split("/").filter(Boolean);
  const name = nameArr[nameArr.length - 1];
  const compPath = pageJsPath.replace("page.ts", "index.vue");

  let redirect = config.redirect as string | undefined;
  return Object.assign(
    {
      path: (config?.path as string) || path,
      name,
      component: pageComps[compPath],
      meta: config,
    },
    redirect
      ? {
          redirect,
          children: [],
        }
      : {}
  );
});
console.log(routes);

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: routes,
// });

/**
 *
 * @param routes 一级路由
 * @returns 多级路由
 */
function createChildrenRouter(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  routes = routes.sort((a, b) => {
    return (
      a.path.split("/").filter(Boolean).length -
      b.path.split("/").filter(Boolean).length
    );
  });
  let realRoutes: RouteRecordRaw[] = [];
  for (let i = 0; i < routes.length; i++) {
    let item = routes[i];
    let pathArr = item.path.split("/").filter(Boolean);
    // 一级路由原来已经有了 无须处理
    if (pathArr.length < 2) {
      realRoutes.push(item);
    } else {
      // 将当前路由移入上一级路由下的children
      realRoutes = moveRoute(realRoutes, item);
    }
  }
  return realRoutes;
}

/**
 *
 * @param arr 多级路由
 * @param route 路由
 */
function moveRoute(routes: RouteRecordRaw[], route: RouteRecordRaw) {
  let pathArr = route.path.split("/").filter(Boolean);
  // routes = findRoute(pathArr, routes, route);
  let copyRoutes = [...routes];
  let parent = [...copyRoutes];
  for (let i = 0; i < pathArr.length; i++) {
    let path = pathArr[i];
    if (i === pathArr.length - 1) {
      parent.push(handleRoute(route));
      break;
    } else {
      for (let j = 0; j < parent.length; j++) {
        if (path === parent[j].path.replace("/", "")) {
          if (!parent[j].children) {
            parent[j].children = [];
          }
          parent = parent[j].children as RouteRecordRaw[];
          break;
        }
      }
    }
  }
  console.log(copyRoutes);
  return copyRoutes;
}

function handleRoute(route: RouteRecordRaw) {
  let { path } = route;
  let pathArr = path.split("/").filter(Boolean);

  return {
    ...route,
    path: pathArr[pathArr.length - 1],
  };
}
routes = createChildrenRouter(routes);
routes.unshift({
  path: "/",
  redirect: "/home/dashboard",
});
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  document.title = `${to.meta.title} | vue-manage-system`;
  const role = localStorage.getItem("ms_username");
  const permiss = usePermissStore();
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    // 如果没有权限，则进入403
    next("/403");
  } else {
    next();
  }
});

export default router;
