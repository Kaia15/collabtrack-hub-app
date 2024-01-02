// common/models/author.js

'use strict';

module.exports = function(Author) {
  // Find all authors
  Author.getAllAuthors = async function() {
    try {
      const authors = await Author.find();
      return authors;
    } catch (error) {
      throw error;
    }
  };

  // Find an author by ID
  Author.getAuthorById = async function(id) {
    try {
      const author = await Author.findById(id);
      return author;
    } catch (error) {
      throw error;
    }
  };

  // Create a new author
  Author.createAuthor = async function(data) {
    try {
      const author = await Author.create(data);
      return author;
    } catch (error) {
      throw error;
    }
  };

  // Update an author by ID
  Author.updateAuthorById = async function(id, data) {
    try {
      const updatedAuthor = await Author.updateAll({ id }, data);
      return updatedAuthor;
    } catch (error) {
      throw error;
    }
  };

  // Delete an author by ID
  Author.deleteAuthorById = async function(id) {
    try {
      const result = await Author.destroyById(id);
      return { success: result.count > 0 };
    } catch (error) {
      throw error;
    }
  };

  // Configure remote methods
  Author.remoteMethod('getAllAuthors', {
    http: { verb: 'get' },
    returns: { arg: 'authors', type: 'array' },
  });

  Author.remoteMethod('getAuthorById', {
    http: { verb: 'get' },
    accepts: { arg: 'id', type: 'string', required: true },
    returns: { arg: 'author', type: 'object' },
  });

  Author.remoteMethod('createAuthor', {
    http: { verb: 'post' },
    accepts: { arg: 'data', type: 'object', http: { source: 'body' } },
    returns: { arg: 'author', type: 'object' },
  });

  Author.remoteMethod('updateAuthorById', {
    http: { verb: 'put' },
    accepts: [
      { arg: 'id', type: 'string', required: true },
      { arg: 'data', type: 'object', http: { source: 'body' } },
    ],
    returns: { arg: 'author', type: 'object' },
  });

  Author.remoteMethod('deleteAuthorById', {
    http: { verb: 'delete' },
    accepts: { arg: 'id', type: 'string', required: true },
    returns: { arg: 'result', type: 'object' },
  });
};
