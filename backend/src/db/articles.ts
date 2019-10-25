import { Article, Comment } from '../types/article';
import db from './db';

const ARTICLE_LIST_LIMIT = 20;
const COMMENT_LIST_LIMIT = 20;

/**
 * Adds a new article.
 */
export function addArticle(dusername: string, title: string, content: string): Promise<Article> {
  return db.getOne(`
    INSERT INTO Articles (username, title, content) VALUES (?, ?, ?) RETURNING *
  `, [dusername, title, content]) as Promise<Article>;
}

/**
 * Adds a new comment.
 */
export function addComment(article: Article, username: string, content: string): Promise<Comment> {
  return db.getOne(`
    INSERT INTO Comments (ausername, acreatedAt, username, content) VALUES (?, ?, ?, ?) RETURNING *
  `, [article.username, article.createdAt, username, content]) as Promise<Comment>;
}

/**
 * Deletes the given article.
 */
export function deleteArticle(article: Article): Promise<{}> {
  return db.query(`
    DELETE FROM Articles WHERE username = ? AND createdAt = ?
  `, [article.username, article.createdAt]);
}

/**
 * Deletes the given comment.
 */
export function deleteComment(comment: Comment): Promise<{}> {
  return db.query(`
    DELETE FROM Comments WHERE ausername = ? AND acreatedAt = ? AND username = ? AND createdAt = ?
  `, [comment.ausername, comment.acreatedAt, comment.username, comment.createdAt]);
}

/**
 * Gets the most recent comments by the given diner.
 */
export function getRecentCommentsByDiner(dusername: string, prev?: number): Promise<Comment[]> {
  return db.getAll(`
    SELECT * FROM Comments WHERE username = ? AND createdAt < ? ORDER BY createdAt DESC LIMIT ${COMMENT_LIST_LIMIT}
  `, [dusername, prev || Date.now()]);
}

/**
 * Gets the article with the given author and creation time.
 */
export function getArticle(dusername: string, createdAt: number): Promise<Article | null> {
  return db.getOne(`SELECT * FROM Articles WHERE username = ? AND createdAt = ?`, [dusername, createdAt]);
}

/**
 * Gets the comment with the given article, author, and creation time.
 */
export function getComment(ausername: string, acreatedAt: string,
                           username: string, createdAt: string): Promise<Comment | null> {
  return db.getOne(`
    SELECT * FROM Comments WHERE ausername = ? AND acreatedAt = ? AND username = ? AND createdAt = ?
  `, [ausername, acreatedAt, username, createdAt]);
}

/**
 * Gets the most recent articles.
 */
export function getRecentArticles(prev?: number): Promise<Article[]> {
  return db.getAll(`
    SELECT * FROM Articles WHERE createdAt < ? ORDER BY createdAt DESC LIMIT ${ARTICLE_LIST_LIMIT}
  `, [prev || Date.now()]);
}

/**
 * Gets the most recent articles by the given diner.
 */
export function getRecentArticlesByDiner(dusername: string, prev?: number): Promise<Article[]> {
  return db.getAll(`
    SELECT * FROM Articles WHERE username = ? AND createdAt < ? ORDER BY createdAt DESC LIMIT ${ARTICLE_LIST_LIMIT}
  `, [dusername, prev || Date.now()]);
}

/**
 * Gets the most recent comments on the given article.
 */
export function getRecentCommentsOnArticle(article: Article, prev?: number): Promise<Comment[]> {
  return db.getAll(`
    SELECT * FROM Comments WHERE ausername = ? AND acreatedAt = ? AND createdAt < ?
    ORDER BY createdAt DESC LIMIT ${COMMENT_LIST_LIMIT}
  `, [article.username, article.createdAt, prev || Date.now()]);
}

/**
 * Updates the title and content of the given article.
 */
export function updateArticle(article: Article, title: string, content: string): Promise<Article | null> {
  return db.getOne(`
    UPDATE Articles SET (title, content, updatedAt) = (?, ?, NOW()) WHERE username = ? AND createdAt = ? RETURNING *
  `, [title, content, article.username, article.createdAt]);
}

/**
 * Updates the content of the given comment.
 */
export function updateComment(comment: Comment, content: string): Promise<Comment | null> {
  return db.getOne(`
    UPDATE Comments SET (content, updatedAt) = (?, NOW())
    WHERE ausername = ? AND acreatedAt = ? AND username = ? AND createdAt = ? RETURNING *
  `, [content, comment.ausername, comment.acreatedAt, comment.username, comment.createdAt]);
}
