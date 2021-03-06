// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api:"http://localhost:4040",
  login:"/auth/login",
  autologin:"/auth/autologin",
  register:"/auth/register",
  emailver:"/auth/emailver",
  articlegetall:"/article/getall",
  articlegetone:"/article/getone",
  commentgetall:"/comment/getall",
  commentinsert:"/comment/insert",
  mediaws:"ws://localhost:4040/media/ws",
  mediaupload:"/media/upload",
  mediadel:"/media/delete",
  settings:"/auth/settings",
  publishArticle:"/article/publish",
  editArticle:"/article/edit",
  deleteArticle:"/article/delete",
  saveArticleAs:"/article/saveas",
  saveArticle:"/article/save",
  searcharticle:"/article/search",
  draftgetall:"/draft/getall",
  draftgetone:"/draft/getone",
  draftdelete:"/draft/delete",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
