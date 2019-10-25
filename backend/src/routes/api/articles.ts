import * as Router from '@koa/router';

import db from '../../db';
import { requireDiner } from '../../middleware/auth';
import { loadArticleFromParams, loadCommentFromParams, loadDinerFromUsername } from '../../middleware/helpers';
import { Article, Comment } from '../../types/article';
import { HttpStatus } from '../../types/http';

const router = new Router();

/**
 * [GET: /articles] Get most recent articles.
 * [Params] prev?.
 */
router.get('/articles', async (ctx) => {
  const articles = await db.articles.getRecentArticles(ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: articles
  };
});

/**
 * [POST: /articles] Create a new article.
 * [Params] title, content.
 */
router.post('/articles', requireDiner, async (ctx) => {
  const body = ctx.request.body;
  const username = ctx.state.user.username;
  const title = body.title.trim();
  const content = body.content.trim();

  const article = await db.articles.addArticle(username, title, content);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have created article '${title}'.`,
    data: article
  };
});

/**
 * [GET: /diners/:dusername/articles] Get most recent articles by a diner.
 * [Params] prev?.
 */
router.get('/diners/:dusername/articles', loadDinerFromUsername, async (ctx) => {
  const articles = await db.articles.getRecentArticlesByDiner(ctx.state.diner.username, ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: articles
  };
});

/**
 * [GET: /diners/:dusername/comments] Get most recent comments by a diner.
 * [Params] prev?.
 */
router.get('/diners/:dusername/comments', loadDinerFromUsername, async (ctx) => {
  const comments = await db.articles.getRecentCommentsByDiner(ctx.state.diner.username, ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: comments
  };
});

/**
 * [GET: /diners/:ausername/articles/:acreated] Get an article.
 */
router.get('/diners/:ausername/articles/:acreated', loadArticleFromParams, async (ctx) => {
  ctx.body = {
    code: HttpStatus.Ok,
    data: ctx.state.article
  };
});

/**
 * [PATCH: /diners/:ausername/articles/:acreated] Edit an article.
 * [Params] title, content.
 */
router.patch('/diners/:ausername/articles/:acreated', requireDiner, loadArticleFromParams, async (ctx) => {
  const body = ctx.request.body;
  const oldArticle: Article = ctx.state.article;

  if (ctx.state.user.username !== oldArticle.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  const title = body.title.trim();
  const content = body.content.trim();
  const article = await db.articles.updateArticle(oldArticle, title, content);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have updated '${title}'.`,
    data: article
  };
});

/**
 * [DELETE: /diners/:ausername/articles/:acreated] Delete an article.
 */
router.delete('/diners/:ausername/articles/:acreated', requireDiner, loadArticleFromParams, async (ctx) => {
  const article: Article = ctx.state.article;

  if (ctx.state.user.username !== article.username) {
    return ctx.body = {
      code: HttpStatus.Forbidden,
      msg: 'You do not have permission to do that.'
    };
  }

  await db.articles.deleteArticle(article);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have deleted '${article.title}'.`,
    data: article
  };
});

/**
 * [GET: /diners/:ausername/articles/:acreated/comments] Get most recent comments on an article.
 * [Params] prev?.
 */
router.get('/diners/:ausername/articles/:acreated/comments', loadArticleFromParams, async (ctx) => {
  const article: Article = ctx.state.article;
  const comments = await db.articles.getRecentCommentsOnArticle(article, ctx.query.prev);

  ctx.body = {
    code: HttpStatus.Ok,
    data: comments
  };
});

/**
 * [POST: /diners/:ausername/articles/:acreated/comments] Create a new comment on an article.
 * [Params] prev?.
 */
router.post('/diners/:ausername/articles/:acreated/comments', requireDiner, loadArticleFromParams, async (ctx) => {
  const body = ctx.request.body;
  const username = ctx.state.user.username;
  const article: Article = ctx.state.article;
  const content = body.content.trim();
  const comment = await db.articles.addComment(article, username, content);

  ctx.body = {
    code: HttpStatus.Ok,
    msg: `You have posted a comment on ${article.title}.`,
    data: comment
  };
});

/**
 * [PATCH: /diners/:ausername/articles/:acreated/comments/:username/:created] Edit a comment.
 * [Params] content.
 */
router.patch('/diners/:ausername/articles/:acreated/comments/:username/:created',
  requireDiner, loadCommentFromParams, async (ctx) => {
    const body = ctx.request.body;
    const oldComment: Comment = ctx.state.comment;

    if (ctx.state.user.username !== oldComment.username) {
      return ctx.body = {
        code: HttpStatus.Forbidden,
        msg: 'You do not have permission to do that.'
      };
    }

    const content = body.content.trim();
    const comment = await db.articles.updateComment(oldComment, content);

    ctx.body = {
      code: HttpStatus.Ok,
      msg: 'Your comment has been updated.',
      data: comment
    };
  });

/**
 * [DELETE: /diners/:ausername/articles/:acreated/comments/:username/:created] Delete a comment.
 */
router.delete('/diners/:ausername/articles/:acreated/comments/:username/:created',
  requireDiner, loadCommentFromParams, async (ctx) => {
    const comment: Comment = ctx.state.comment;

    if (ctx.state.user.username !== comment.username) {
      return ctx.body = {
        code: HttpStatus.Forbidden,
        msg: 'You do not have permission to do that.'
      };
    }

    await db.articles.deleteComment(comment);

    ctx.body = {
      code: HttpStatus.Ok,
      msg: 'Your comment has been deleted.'
    };
  });

export default router;
