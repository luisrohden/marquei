const events = {
    start:() => {
        //
        addEvent_list = document.querySelectorAll('.event-create');
        addEvent_list.forEach(element => {
            element.addEventListener('click',function(){
                events.add();
            })  
        });
        const Area  = document.querySelector(Aside.selector);
        Area.addEventListener('click',function(event){
            const botaoSave = event.target.closest('.event-save');
            if(botaoSave){
                events.save();     
            }
        });
        
    },
    save:() => {
        const name = document.querySelector('#field-name').value;
        console.log(name,'name');
        //alert(name);
        
    },
    add:() => {
        const form = 
        `
        <div class="formLine">
            <label>Item</label>
            <input type="text" name="item" id="field-name" />
        </div>
        <div class="formLine">
            <label>Dias</label>
            <input type="number" id="field-days" min="0" value="0" placeholder="0">
        </div>
        <div class="formLine">
            <label>Horas</label>
            <input type="number" id="field-hours" min="0" value="0" placeholder="0">
        </div>
        <div class="formLine">
            <button class="btn btn-save event-save">Salvar</button>
        </div>
        `;
        Aside.load(form);
        
    },
};

const Aside = {
    selector:'aside#overSide',
    start:() => {
        const Area  = document.querySelector(Aside.selector);
        Area.addEventListener('click',function(event){
            const botaoFechar = event.target.closest('.closeAside');
            if(botaoFechar){
                Aside.close();     
            }
        });
    },
    close:()=> {
        const Area  = document.querySelector(Aside.selector);
        Area.classList.remove('show');
    },
    load:(content) => {
        content  = `
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
        const Area  = document.querySelector(Aside.selector);
        Area.innerHTML = content;
        Area.classList.add('show');
    }
};


const iniciar = () => {
    events.start();
    Aside.start();
};


document.addEventListener('DOMContentLoaded', iniciar);