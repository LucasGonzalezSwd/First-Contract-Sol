const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it("migrate deployed succesfuly", async () => {
    const address = this.tasksContract.address;
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get Task List", async () => {
    const tasksCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter);
    assert.equal(task.tittle, "mi primer tarea de ejemplo");
    assert.equal(task.description, "tengo que hacer algo");
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });
  //1:23
  it("created succefuly task", async () => {
    const result = await this.tasksContract.createTask(
      "some task",
      "description two"
    );
    const taskCounter = await this.tasksContract.taskCounter();
    const taskEvent = result.logs[0].args;

    assert.equal(taskCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.tittle, "some task");
    assert.equal(taskEvent.description, "description two");
    assert.equal(taskEvent.done, false);
  });

  it("task toggle done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskFound = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskFound.done, true);
    assert.equal(taskFound.id, 1);
  });
});

// 1:51
