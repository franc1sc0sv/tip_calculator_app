window.onclick = function (event) {
  activeDisablePercentage(event);
};

window.onload = function () {
  setItemEmpty();
};

function setItemEmpty() {
  sessionStorage.setItem("bill", "");
  sessionStorage.setItem("tip", "");
  sessionStorage.setItem("nPeople", "");
}

function removeClass(className) {
  let elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(className);
  }
}

function removeClassElement(className, element) {
  element.classList.remove(className);
}

function innerHTML(element, mesaje) {
  document.getElementById(element).innerHTML = mesaje;
}

function activeDisablePercentage(event) {
  if (
    event.target.matches(".disabledPercentage") &&
    !event.target.matches(".activePercentage")
  ) {
    if (event.target.value >= 0 && !isNaN(event.target.value)) {
      document.getElementById("customPercentage").value = "";
      innerHTML("errorTip", "");
      //// remove the class at active buuttons
      removeClass("activePercentage")
      document.getElementById("customPercentage").classList.remove("warning_input")
      //Add the class and keep the value un session storage
      event.target.classList.add("activePercentage");
      sessionStorage.setItem("tip", event.target.value);

      //   console.log(sessionStorage.getItem("tip"));
    } else {
      innerHTML("errorTip", "Invalid Percentaje");
    }
  } else if (
    event.target.matches(".disabledPercentage") &&
    event.target.matches(".activePercentag")
  ) {
    removeClass("activePercentage");
    sessionStorage.setItem("tip", "");
    innerHTML("errorTip", "");
  }
  calcTip();
}

function setPercentageInput(element, errorID, keySession, minValue) {
  //   console.log(element.value);
  if (element.value == "") {
    sessionStorage.setItem(keySession, "");
    innerHTML(errorID, "");
    removeClassElement("warning_input", element);
  } else if (element.value >= minValue && !isNaN(element.value)) {
    innerHTML(errorID, "");
    removeClassElement("warning_input", element);
    //// remove the class at active buuttons

    if (element.matches("#customPercentage")) {
      removeClass("activePercentage");
    }
    //Add the class and keep the value un session storage
    sessionStorage.setItem(keySession, element.value);

    // console.log(sessionStorage.getItem(keySession));
  } else {
    element.classList.add("warning_input");
    innerHTML(errorID, "Invalid amount");
    if (element.matches("#customPercentage")) {
      removeClass("activePercentage");
    }
    sessionStorage.setItem(keySession, "");
  }
  calcTip();
}

function calcTip() {
  let bill = sessionStorage.getItem("bill");
  let tip = sessionStorage.getItem("tip");
  let nPeople = sessionStorage.getItem("nPeople");
  let resetButton = document.getElementById("resetButton");

  if (bill != "" && tip != "" && nPeople != "") {
    resetButton.classList.add("activeReset");
    document.getElementById("tipAmount").innerHTML = calcTipAmount(
      bill,
      tip,
      nPeople
    ).toLocaleString("en-US", { style: "currency", currency: "USD" });
    document.getElementById("totalPerPerson").innerHTML = calcTotalPerPerson(
      bill,
      tip,
      nPeople
    ).toLocaleString("en-US", { style: "currency", currency: "USD" });

    document.getElementById("totalAmount").innerHTML = (
      (calcTipAmount(bill, tip, nPeople) +
        calcTotalPerPerson(bill, tip, nPeople)) *
      nPeople
    ).toLocaleString("en-US", { style: "currency", currency: "USD" });
  } else {
    resetButton.classList.remove("activeReset");

    document.getElementById("tipAmount").innerHTML = "$0.00";
    document.getElementById("totalPerPerson").innerHTML = "$0.00";
    document.getElementById("totalAmount").innerHTML = "$0.00";
  }
}

function calcTipAmount(bill, tip, nPeople) {
  return (tip * bill) / 100 / nPeople;
}

function calcTotalPerPerson(bill, tip, nPeople) {
  return bill / nPeople;
}

document
  .getElementById("resetButton")
  .addEventListener("click", function (event) {
    if (event.target.matches(".activeReset")) {
      setItemEmpty();
      removeClass("activePercentage");
      document.getElementById("billInput").value =
        sessionStorage.getItem("bill");
      document.getElementById("customPercentage").value =
        sessionStorage.getItem("tip");
      document.getElementById("nPeople").value =
        sessionStorage.getItem("nPeople");
      removeClass("activeReset");
    }
  });

document
  .getElementById("customPercentage")
  .addEventListener("input", function (event) {
    setPercentageInput(event.target, "errorTip", "tip", 0);
    calcTip();
  });

document
  .getElementById("billInput")
  .addEventListener("input", function (event) {
    setPercentageInput(event.target, "errorBill", "bill", 1);
    calcTip();
  });

document.getElementById("nPeople").addEventListener("input", function (event) {
  setPercentageInput(event.target, "errorPeople", "nPeople", 1);
  calcTip();
});
