// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
  

    uint public taskCounter = 0;

  constructor(){
    createTask("mi primer tarea de ejemplo", "tengo que hacer algo");
  }

    event TaskCreated(
      uint id,
      string tittle,
      string description,
      bool done,
      uint createdAt
    );

    event TaskToggleDone(uint id, bool done);
   
    struct Task{
      uint256 id;
      string tittle;
      string description;
      bool done;
      uint256 createdAt;
    }


    mapping(uint256 => Task ) public tasks;


   function createTask(string memory _tittle, string memory _description ) public {
        
  taskCounter++;
  tasks[taskCounter] = Task(taskCounter , _tittle, _description, false, block.timestamp);
  emit TaskCreated(taskCounter, _tittle, _description, false, block.timestamp);

   }

   function toggleDone(uint _id) public {
   Task memory _task = tasks[_id]; 
     _task.done = !_task.done;
     tasks[_id] = _task;
     emit TaskToggleDone(_id, _task.done );
   }
   //55min




  
}
