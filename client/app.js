App = {
  contracts: {},
  web3Provider: "",

  init: async () => {
    console.log("Loaded");
    await App.loadEther();
    await App.loadAccount();
    await App.loadContracts();
    App.render();
    await App.renderTask();
  },

  loadEther: async () => {
    if (window.ethereum) {
      web3Provider = window.ethereum;

      await web3Provider.request({ method: "eth_requestAccounts" });
      console.log("wallet exist");
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      console.log(web3);
    } else {
      console.log("install metamask");
    }
  },

  loadAccount: async () => {
    const accounts = await web3Provider.request({
      method: "eth_requestAccounts",
    });
    App.account = accounts[0];
  },

  loadContracts: async () => {
    const res = await fetch("TasksContract.json");
    const taskJson = await res.json();

    App.contracts.tasksContract = TruffleContract(taskJson);

    App.contracts.tasksContract.setProvider(web3Provider);
    App.tasksContract = await App.contracts.tasksContract.deployed();
  },

  createTask: async (tittle, description) => {
    const result = await App.tasksContract.createTask(tittle, description, {
      from: App.account,
    });
    console.log(result.logs[0].args);
  },

  render: () => {
    document.getElementById("account").innerText = App.account;
  },

  renderTask: async () => {
    const taskCounter = await App.tasksContract.taskCounter();
    const taskCounterNumber = taskCounter.toNumber();

    let html = "";

    for (let i = 1; i <= taskCounterNumber; i++) {
      const task = await App.tasksContract.tasks(i);
      const taskId = task[0];
      const taskTittle = task[1];
      const taskDescription = task[2];
      const taskDone = task[3];
      const taskCreated = task[4];

      console.log(task);
      let taskElement = `<div class = "card bg-dark text-white my-2">
               
               <span>${taskTittle}</span>
               <span>${taskDescription}</span>
              
               
               <div class=" form-check form-switch ">
                  <input class="form-check-input " type="checkbox" ${
                    taskDone && "checked"
                  } onChange="App.toggleDone(this)" data-id="${taskId}">

               </div>
               <p class= "" > task was create at ${new Date(
                 taskCreated * 1000
               ).toLocaleDateString()}</p>
      </div>`;

      html += taskElement;
    }

    document.querySelector("#tasklist").innerHTML = html;
  },

  toggleDone: async (element) => {
    const taskId = element.dataset.id;
    await App.tasksContract.toggleDone(taskId, {
      from: App.account,
    });

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  },
};

// 2 horas 13 amigoooo metele mas
