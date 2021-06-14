# The Light
the light is a content management system for blogging and is made with angular framework (frontend) and golang (backend).
The light depends on quill.js for WYSIWYG // What you see is what you get text-editor.
This is the frontend of the light project.

## NGRX Explanation
there are 7 reducers, action, and effects in this project.
1. adm-Article
this is for admin-only article management, like publish article, save article, save as article, and edit article
2. Article
this is for public consume related to article, like get all articles or get one article. This implements caching management which if article.ID is already available in ArticleCache, it will try to use that article instead of fetching article from server. ArticlesCache contains all articles that had been fetched, Articles contains 6 or less articles that being viewed.
3. Auth
this is for admin authentication, like login, autologin, change settings. After user is logging in, the token is given from server and will be stored in the localStorage. Whenever user login, the app will dispatch an action to autologin, which will sent token from localStorage and the server will respond with everything related to user but not sensitive info, like ID, Bio, AvatarURL, Name. If the token is in between range, the refreshtoken is given and will be store in localStorage and renew old token. If token is expired or invalid, the error response will be given with Clear-Bearer exposed header which then be intercepted and the app do logging out.
4. Comment
this is for comment.
5. Draft
this is for admin draft (edit draft, view draft)
6. Media
this is for admin media repository purposes, like view all media, upload a new media, and delete media.
7. Search
this is created special for search features. Although everything on search redux is essentially the same like article redux, but search's reducer must be separated because it will be destroyed frequently. For example, if the user already searched something and want to search something else, the article on search's reducer will be destroyed first before trying to get new search.

# Component Explanation

1. Admin
basically contain everything related to admin-only article management
1.a admin dashboard
this component shows all button for routing, like view drafts, create article, settings, and media. This component also display all articles with each article item has 'edit' and 'delete' button.
1.b admin create article
this component is for creating a new articles, there are publish, save as, save, and preview button. publish is to store the article to articles database, save as is to store article to drafts database, save is to update article to drafts database, and preview is to see how the article is going to look.
1.c admin edit-article
to edit article, basically has same button like admin create article but with edit button instead of publish button.
1.d login
to login
1.e article-preview
special page to preview how article is going to look.
1.f media
this components is to see all media and or uploading new media or delete
1.g settings
this components is to change user's settings, for example : user's name, user's bio etc

2. Landing-page
this contains components that is going to be seen first when the user hit the domain. There are article-list that view all articles, header, and search-bar.
3. Search
this component specially designed for searching feature.
4. Others
    App-Paginator : To paginate something, it sends onPageEvent containing page number
    WriterInfo    : To render writer's information
    Comment       : To render article comments
    Navbar        : a navbar, (round hamburger icon)

#TODO

1. Analytics
for example, article hit counter, geography tracking, user agent tracking, etc

2. Server side rendering
because this is a blogging medium, this web app needs to be exposed to search engine. But,
server side rendering for angular is using node.js and not golang, i'll find a way to make it possible to work with golang. Maybe, i make two separated entities, nodejs for handling the static things (like serving images, html, css, js) and golang for handling data processing.

3. Hashmap data structure
use hashmap instead of array for frontend article cache so that when user want to view specific article it can be done with O(1) complexity