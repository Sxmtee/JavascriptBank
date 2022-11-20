let username = document.querySelector(".username");
let password = document.querySelector(".password");
class Bank {
  constructor() {
    (this.static = []),
      (this.trf_pin = ""); /* will bepopulated when user logs in */
  }

  // CREATE NEW USER
  createAccount(name, acn, pin) {
    this.static.push({
      name: name,
      acn: acn,
      pin: pin,
      balance: 100000,
      transactions: [],
    });

    console.clear();
    console.log(this.static);
    alert(`Account Number: ${acn}`);
  }

  // NEW USER REGISTRATION
  createUser() {
    const name = username.value;
    const pwd = password.value;

    function genAcn() {
      let acn = "";
      for (let index = 0; index < 10; index++) {
        acn += Math.floor(Math.random() * 10);
      }
      return acn;
    }
    this.createAccount(name, genAcn(), pwd);
  }

  // GET LAST TRANSACTION
  getLastTransaction() {
    let info = prompt("enter your account Pin");

    const person = [];
    this.static.forEach((user, id) => {
      if (info == user.pin) {
        person.push(user);
        person.push(id);
      }
    });

    if (info !== null) {
      if (person.length > 0) {
        let transactions = person[0].transactions;

        if (transactions.length > 0) {
          console.log(`Your last transaction:`);
          console.table(person[0].transactions.at(-1));
        } else {
          console.log(`${person[0].name} you have no transactions yet`);
        }
      } else {
        alert("ACCOUNT NOT FOUND");
      }
    }
  }

  // CHECK BALANCE
  checkBalance() {
    let info = prompt("enter your account Pin");

    const person = [];
    this.static.forEach((user, id) => {
      if (info == user.pin) {
        person.push(user);
        person.push(id);
      }
    });

    if (info !== null) {
      if (person.length > 0) {
        console.table(
          `${person[0].name} Your account balance is: ${person[0].balance}`
        );
      } else {
        alert("ACCOUNT NOT FOUND");
      }
    }
  }

  // VALIDATE TRANSFER
  validTransfer() {
    const pin = document.querySelector(".trf-pin");
    const trs = document.querySelector(".trs-c");
    const new_trs = document.querySelector(".n-trs");
    let pins = [];
    let known = false;
    bank.static.forEach((items, index) => {
      // pins.push(items.pin);
      if (pin.value == items.pin) {
        pins.push(items.pin);
        this.trf_pin = pins[0];
        trs.style.display = "flex";
        new_trs.style.display = "none";
        console.log(`USER LOGGED IN AS ${items.name}`);
        known = true;
      }
    });

    if (!known) {
      alert("No account with this pin code");
    }
  }

  // TRANSFER VALIDATION
  trsValid() {
    const valid = document.querySelector(".valid-pin");
    const withdraw = document.querySelector(".with-draw");
    const tras_v = document.querySelector(".tras-v");
    let persons = [];
    let known = false;
    bank.static.forEach((items, index) => {
      // pins.push(items.pin);
      if (valid.value == items.pin) {
        persons.push(items.pin);
        this.trf_pin = persons[0];
        withdraw.style.display = "flex";
        tras_v.style.display = "none";
        console.log(`USER LOGGED IN AS ${this.trf_pin}`);
        known = true;
      }
    });

    if (!known) {
      alert("No account with this pin code");
    }
  }

  // TRANSFER VALIDATION
  trsValid1() {
    const valid = document.querySelector(".valid-pin1");
    const depo = document.querySelector(".depo");
    const tras_v = document.querySelector(".tras-v1");
    let persons = [];
    let known = false;
    bank.static.forEach((items, index) => {
      // pins.push(items.pin);
      if (valid.value == items.pin) {
        persons.push(items.pin);
        this.trf_pin = persons[0];
        depo.style.display = "flex";
        tras_v.style.display = "none";
        console.log(`USER LOGGED IN AS ${this.trf_pin}`);
        known = true;
      }
    });

    if (!known) {
      alert("No account with this pin code");
    }
  }

  // ACCOUNT TRANSFER
  accountTransfer() {
    const acn = document.querySelector(".trs");
    const trf_send = document.querySelector(".trf-send");
    const trs = document.querySelector(".trs-c");
    let acns = [];
    bank.static.forEach((items, index) => {
      if (items.acn == acn.value) {
        acns.push(items);
      }
    });

    setTimeout(() => {
      if (acns.length == 0) {
        alert("account not found");
      } else {
        trf_send.style.display = "flex";
        trs.style.display = "none";
        document.querySelector(".user").value = acns[0].name;
        document.querySelector(".user_acn").value = acns[0].acn;
      }
    }, 1000);
  }

  // TRANSFER
  transfer() {
    const name = document.querySelector(".user");
    const acn = document.querySelector(".user_acn");
    const amount = document.querySelector(".amount");
    const trf_amount = amount.value;

    // getting senders details
    const sender = [];
    bank.static.forEach((user, id) => {
      if (this.trf_pin == user.pin) {
        sender.push(user);
        sender.push(id);
      }
    });

    // DEBITING THE SENDER
    setTimeout(() => {
      const main_user = sender[0];
      const user_index = sender[1];

      const balance = main_user.balance - Number(amount.value);
      const new_user = { ...main_user, balance };
      bank.static[user_index] = new_user;

      // Getting the details of the receiver
      let receiver = [];
      bank.static.forEach((user, id) => {
        if (acn.value == user.acn) {
          receiver.push(user);
          receiver.push(id);
        }
      });

      // PAYING INTO THE RECEIVER
      setTimeout(() => {
        const rec_user = receiver[0];
        const rec_index = receiver[1];

        const balance = rec_user.balance + Number(amount.value);

        const rec_new_user = { ...rec_user, balance };
        bank.static[rec_index] = rec_new_user;

        this.static[user_index].transactions.push({
          type: "sending",
          to: rec_user.acn,
          amount: Number(amount.value),
          time: `${new Date()}`,
        });
        this.static[rec_index].transactions.push({
          type: "receiving",
          from: main_user.acn,
          amount: Number(amount.value),
          time: `${new Date()}`,
        });
        console.clear();
        console.log(bank.static);
      }, 1000);
    }, 1000);
  }

  // WITHDRAW
  withDraw() {
    const withdraw = document.querySelector(".with-draw");
    if (this.trf_pin == "") {
      alert("You are not logged in");
      document.querySelector(".tras-v").style.display = "flex";
      withdraw.style.display = "none";
    } else {
      const amount = document.querySelector(".with_amount");
      const with_amount = amount.value;

      // getting with details
      const withdraw = [];
      bank.static.forEach((user, id) => {
        if (this.trf_pin == user.pin) {
          withdraw.push(user);
          withdraw.push(id);
        }
      });

      // DEBITING THE SENDER
      setTimeout(() => {
        const main_user = withdraw[0];
        const user_index = withdraw[1];

        const balance = main_user.balance - Number(amount.value);
        const new_user = { ...main_user, balance };
        bank.static[user_index] = new_user;

        this.static[user_index].transactions.push({
          type: "withdraw",
          from: main_user.acn,
          amount: Number(amount.value),
          time: `${new Date()}`,
        });
        console.clear();
        console.log(this.static);
      }, 1000);
    }
  }

  // DEPOSIT
  deposit() {
    const depo = document.querySelector(".depo");
    if (this.trf_pin == "") {
      alert("You are not logged in");
      document.querySelector(".tras-v1").style.display = "flex";
      depo.style.display = "none";
    } else {
      const amount = document.querySelector(".depo_amount");
      const with_amount = amount.value;

      // getting deposit details
      const withdraw = [];
      bank.static.forEach((user, id) => {
        if (this.trf_pin == user.pin) {
          withdraw.push(user);
          withdraw.push(id);
        }
      });

      // CREDITING THE SENDER
      setTimeout(() => {
        const main_user = withdraw[0];
        const user_index = withdraw[1];

        const balance = main_user.balance + Number(amount.value);
        const new_user = { ...main_user, balance };
        bank.static[user_index] = new_user;

        // add to transaction
        this.static[user_index].transactions.push({
          type: "deposite",
          to: main_user.acn,
          amount: Number(amount.value),
          time: `${new Date()}`,
        });

        console.clear();
        console.log(this.static);
      }, 1000);
    }
  }

  // DEFAULT STATE
  defaultSate() {
    const new_act_btn = document.querySelector(".new-act-btn");
    const new_trs_btn = document.querySelector(".new-trs-btn");
    const new_with_btn = document.querySelector(".new-with-btn");
    const new_depo_btn = document.querySelector(".new-depo-btn");

    const new_act = document.querySelector(".n-act");
    const new_trs = document.querySelector(".n-trs");
    const trs = document.querySelector(".trs-c");
    const trf_send = document.querySelector(".trf-send");
    const withdraw = document.querySelector(".with-draw");
    const tras_v = document.querySelector(".tras-v");
    const tras_v1 = document.querySelector(".tras-v1");
    const depo = document.querySelector(".depo");

    new_act.style.display = "none";
    new_trs.style.display = "none";
    trs.style.display = "none";
    trf_send.style.display = "none";
    withdraw.style.display = "none";
    tras_v.style.display = "none";
    tras_v1.style.display = "none";
    depo.style.display = "none";

    new_act_btn.onclick = () => {
      new_act.style.display = "flex";
      new_trs.style.display = "none";
      withdraw.style.display = "none";
      trf_send.style.display = "none";
      tras_v.style.display = "none";
      tras_v1.style.display = "none";
      depo.style.display = "none";
    };

    new_trs_btn.onclick = () => {
      new_trs.style.display = "flex";
      new_act.style.display = "none";
      trf_send.style.display = "none";
      withdraw.style.display = "none";
      tras_v.style.display = "none";
      tras_v1.style.display = "none";
      depo.style.display = "none";
    };

    new_with_btn.onclick = () => {
      new_trs.style.display = "none";
      new_act.style.display = "none";
      tras_v.style.display = "none";
      tras_v1.style.display = "none";
      trf_send.style.display = "none";
      withdraw.style.display = "flex";
      depo.style.display = "none";
    };

    new_depo_btn.onclick = () => {
      new_trs.style.display = "none";
      new_act.style.display = "none";
      trf_send.style.display = "none";
      withdraw.style.display = "none";
      depo.style.display = "flex";
      tras_v.style.display = "none";
      tras_v1.style.display = "none";
    };
  }
}

let bank = new Bank();
bank.defaultSate();
