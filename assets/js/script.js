'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
    // Update ARIA expanded state
    const isExpanded = this.classList.contains("active");
    this.setAttribute("aria-expanded", isExpanded);
  });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.textContent = this.innerText;
      elementToggleFunc(select);
      select.setAttribute("aria-expanded", "false");
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (const item of filterItems) {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.textContent = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    lastClickedBtn.setAttribute("aria-selected", "false");
    this.classList.add("active");
    this.setAttribute("aria-selected", "true");
    lastClickedBtn = this;
  });
}

// Publication tabs
const pubTabs = document.querySelectorAll(".pub-tab");
const pubItems = document.querySelectorAll(".pub-item");

pubTabs.forEach(tab => {
  tab.addEventListener("click", function() {
    // Update active tab
    pubTabs.forEach(t => t.classList.remove("active"));
    this.classList.add("active");

    const filter = this.dataset.filter;

    pubItems.forEach(item => {
      if (filter === "all") {
        item.classList.remove("hidden");
      } else if (filter === "selected") {
        if (item.dataset.selected === "true") {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      }
    });
  });
});

// Initialize: show only selected publications
document.addEventListener("DOMContentLoaded", function() {
  pubItems.forEach(item => {
    if (item.dataset.selected !== "true") {
      item.classList.add("hidden");
    }
  });
});

