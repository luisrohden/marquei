(() => {
  // src/Aside.js
  var Aside = {
    selector: "aside#overSide",
    start: () => {
      const Area = document.querySelector(Aside.selector);
      Area.addEventListener("click", function(event) {
        const botaoFechar = event.target.closest(".closeAside");
        if (botaoFechar) {
          Aside.close();
        }
      });
    },
    close: () => {
      const Area = document.querySelector(Aside.selector);
      Area.classList.remove("show");
    },
    load: (content) => {
      content = `
        <div class="content">
            <div class="flex">
                <div class="closeAside btn btn-close">
                    <span></span>
                    <span></span>
                </div>
            </div>
            ` + content + `
        </div>
        `;
      const Area = document.querySelector(Aside.selector);
      Area.innerHTML = content;
      Area.classList.add("show");
    }
  };

  // src/Slug.js
  var Slug = (text) => text.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-");

  // src/Items.js
  var Items = {
    items: [],
    registers: [],
    getList: () => {
      return document.querySelector("#list");
    },
    loadEvents: () => {
      const List = Items.getList();
      List.addEventListener("click", function(event) {
        const btnRegister = event.target.closest(".bnt-register");
        if (btnRegister) {
          Items.registerEvent(btnRegister);
        }
        const btnShow = event.target.closest(".btn-show");
        if (btnShow) {
          const item2 = btnShow.closest(".item");
          Items.showEvent(item2);
        }
      });
    },
    showEvent: (selectedItem) => {
      const List = Items.getList();
      console.log("selectedItem", selectedItem.dataset.slug);
      console.log("lista de items", Items.items);
      console.log("selectedItem.dataset.slug", selectedItem.dataset.slug);
      let info = {};
      Items.items.forEach((item2) => {
        if (selectedItem.dataset.slug == item2.slug) {
          info = item2;
          console.log("info", info);
        }
        console.log("item x", item2);
      });
      console.log("info", info);
      let registerHTML = "";
      Items.registers.forEach((register) => {
        const date = new Date(register.time);
        const formatada = date.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).replace(",", " -");
        registerHTML += `
                <div> ` + formatada + `</div>
            `;
      });
      registersHTML = `
        <div>
            <h2>` + registerHTML + `</h2>
        </div>
        `;
      console.log("Items.registers", Items.registers);
      console.log(List);
      List.insertAdjacentHTML("beforeend", registersHTML);
      console.log("item", item, Items.registers);
      console.log("item.dataset.slug", item.dataset.slug, Items.registers);
    },
    registerEvent: (btnRegister) => {
      const slug = btnRegister.dataset.slug;
      Items.registers.push({
        "slug": slug,
        "time": Date.now()
      });
    },
    new: (name, type, days, hours) => {
      Items.items.push({
        "name": name,
        "slug": Slug(name),
        "type": type,
        "days": days,
        "hours": hours
      });
      Items.show();
      Aside.close();
    },
    show: () => {
      const List = Items.getList();
      htmlList = "";
      if (Items.items) {
        Items.items.forEach((element) => {
          htmlList += Items.itemToHTML(element);
        });
      }
      List.innerHTML = htmlList;
    },
    itemToHTML: (element, index) => {
      console.log("element", element);
      let progress = ``;
      if (element.type == "interval") {
        progress = `<div class="progress-pizza"></div>`;
      }
      return `
        <div 
            class="item item-` + element.type + `" 
            data-type="` + element.type + `" 
            data-slug="` + element.slug + `"
        >
            <div class="btn bnt-register" data-slug="` + element.slug + `">
                
            </div>
            <span class="item__name">
                ` + element.name + `
            </span>
            <div class="btn btn-show "></div>
            ` + progress + `
        </div>
        `;
    }
  };

  // src/EventsForm.js
  var EventsForm = {
    extraFields: () => {
      return document.querySelector("#extraFields");
    },
    create: () => {
      const form = `
            <h2>Adicionar Item</h2>
            <div class="formLine">
                <label>Item</label>
                <input type="text" name="item" id="field-name" />
            </div>
            ` + EventsForm.type() + `
            <div id="extraFields"></div>
            <div class="formLine">
                <button class="btn btn-save event-save">
                    <i>Salvar</i>
                </button>
            </div>
            `;
      return form;
    },
    type: () => {
      return `
        <div class="formLine">
            <label>Tipo de Item</label>
            <select name="type" class="selectType">
                <option value="register">Apenas Registro</option>
                <option value="interval">Intervalo</option>
            </select>
        </div>
        `;
    },
    loadEvents: function() {
      const Area = document.querySelector(Aside.selector);
      Area.addEventListener("change", function(event) {
        const selectChange = event.target.closest(".selectType");
        if (selectChange) {
          const extrafields = selectChange.value;
          console.log("extrafields", extrafields);
          const area = EventsForm.extraFields();
          area.innerHTML = EventsForm[extrafields]();
        }
      });
    },
    register: function() {
      return "";
    },
    interval: function() {
      return `
            <h3>Intervalo previsto</h3>
            <div class="formLine">
                <label>Dias</label>
                <input type="number" id="field-days" min="0" value="0" placeholder="0">
            </div>
            <div class="formLine">
                <label>Horas</label>
                <input type="number" id="field-hours" min="0" value="0" placeholder="0">
            </div>
            
        `;
    }
  };

  // src/Events.js
  var Events = {
    start: () => {
      addEvent_list = document.querySelectorAll(".event-create");
      addEvent_list.forEach((element) => {
        element.addEventListener("click", function() {
          Events.add();
        });
      });
      const Area = document.querySelector(Aside.selector);
      Area.addEventListener("click", function(event) {
        const botaoSave = event.target.closest(".event-save");
        if (botaoSave) {
          Events.save();
        }
      });
    },
    save: () => {
      const name = document.querySelector("#field-name").value;
      const type = document.querySelector("select.selectType").value;
      if (name == "") {
        return;
      }
      let days = 0;
      fieldDays = document.querySelector("#field-days");
      if (fieldDays) {
        days = parseInt(fieldDays.value);
      }
      const fieldHours = document.querySelector("#field-days");
      let hours = 0;
      if (fieldHours) {
        const hours2 = parseInt(fieldHours.value);
      }
      Items.new(name, type, days, hours);
    },
    add: () => {
      const form = EventsForm.create();
      Aside.load(form);
    }
  };

  // src/Iniciar.js
  var Iniciar = () => {
    console.log("Iniciar()");
    Aside.start();
    Events.start();
    Items.loadEvents();
    EventsForm.loadEvents();
  };

  // src/app.js
  document.addEventListener("DOMContentLoaded", Iniciar);
})();
