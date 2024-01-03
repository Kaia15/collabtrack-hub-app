"use strict";

module.exports = function (Task) {
  // find all tasks
  Task.getAllTasks = async function () {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      throw error;
    }
  };

  // Find a task by ID
  Task.getTaskById = async function (id) {
    try {
      const task = await Task.findById(id);
      return task;
    } catch (error) {
      throw error;
    }
  };

  // Create a task
  Task.createTask = async function (data) {
    try {
      const task = await Task.create(data);
      return task;
    } catch (error) {
      throw error;
    }
  };

  // Update a task by ID
  Task.updateTaskById = async function (id, data) {
    try {
      const updatedTask = await Task.updateAll({ id }, data);
      return updatedTask;
    } catch (error) {
      throw error;
    }
  };

  // Delete a task by ID
  Task.deleteTaskById = async function (id) {
    try {
      const result = await Task.destroyById(id);
      return { success: result.count > 0 };
    } catch (error) {
      throw error;
    }
  };

  // Configure remote methods
  Task.remoteMethod("getAllTasks", {
    http: { verb: "get" },
    returns: { arg: "tasks", type: "array" },
  });

  Task.remoteMethod("getTaskById", {
    http: { verb: "get" },
    accepts: { arg: "id", type: "string", required: true },
    returns: { arg: "task", type: "object" },
  });

  Task.remoteMethod("createTask", {
    http: { verb: "post" },
    accepts: { arg: "data", type: "object", http: { source: "body" } },
    returns: { arg: "task", type: "object" },
  });

  Task.remoteMethod("updateTaskById", {
    http: { verb: "put" },
    accepts: [
      { arg: "id", type: "string", required: true },
      { arg: "data", type: "object", http: { source: "body" } },
    ],
    returns: { arg: "task", type: "object" },
  });

  Task.remoteMethod("deleteTaskById", {
    http: { verb: "delete" },
    accepts: { arg: "id", type: "string", required: true },
    returns: { arg: "result", type: "object" },
  });
};
