const leftButton = document.getElementById("back-button");
const rightButton = document.getElementById("next-button");
const nameText = document.getElementById("current-name");
const box1 = document.getElementById("b1");
const box2 = document.getElementById("b2");
const box3 = document.getElementById("b3");
const box4 = document.getElementById("b4");
const page1 = document.getElementsByClassName("page-one")[0];
const page2 = document.getElementsByClassName("page-two")[0];
const page3 = document.getElementsByClassName("page-three")[0];
const page4 = document.getElementsByClassName("page-four")[0];

leftButton.onclick = function () {
    let currentText = nameText.textContent;
    if (currentText == "Ingredients!") {
        leftButton.classList.add("fade");
        nameText.textContent = "Managing a Recipe...";
        box2.classList.remove("active-box");
        box1.classList.add("active-box");
        page2.classList.add("hidden");
        page1.classList.remove("hidden");

    }
    else if (currentText == "Instructions!") {
        nameText.textContent = "Ingredients!";
        box3.classList.remove("active-box");
        box2.classList.add("active-box");
        page3.classList.add("hidden");
        page2.classList.remove("hidden");
    }
    else {
        rightButton.textContent = "Next";
        nameText.textContent = "Instructions!";
        box4.classList.remove("active-box");
        box3.classList.add("active-box");
        page4.classList.add("hidden");
        page3.classList.remove("hidden");
    }
};

rightButton.onclick = function () {
    let currentText = nameText.textContent;
    if (currentText == "Managing a Recipe...") {
        leftButton.classList.remove("fade");
        nameText.textContent = "Ingredients!";
        box1.classList.remove("active-box");
        box2.classList.add("active-box");
        page1.classList.add("hidden");
        page2.classList.remove("hidden");
    }
    else if (currentText == "Ingredients!") {
        nameText.textContent = "Instructions!";
        box2.classList.remove("active-box");
        box3.classList.add("active-box");
        page2.classList.add("hidden");
        page3.classList.remove("hidden");
    }
    else if (currentText == "Instructions!") {
        rightButton.textContent = "Save";
        nameText.textContent = "Finishing Touches";
        box3.classList.remove("active-box");
        box4.classList.add("active-box");
        page3.classList.add("hidden");
        page4.classList.remove("hidden");
    }
    else {

    }

};
