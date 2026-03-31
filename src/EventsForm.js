import { Aside } from './Aside.js';

export const EventsForm = {
    extraFields:() => {
        return document.querySelector('#extraFields');
    },
    create:() => {
        const form = 
            `
            <h2>Adicionar Item</h2>
            <div class="formLine">
                <label>Item</label>
                <input type="text" name="item" id="field-name" />
            </div>
            `
             + EventsForm.type() +
            `
            <div id="extraFields"></div>
            <div class="formLine">
                <button class="btn btn-save event-save"></button>
            </div>
            `;
        return form;
    },
    type:()=>{
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
    loadEvents:function(){
        const Area  = document.querySelector(Aside.selector);
        Area.addEventListener('change',function(event){
            const selectChange = event.target.closest('.selectType');
            if(selectChange){
                const extrafields = selectChange.value;
                console.log('extrafields',extrafields);
                const area = EventsForm.extraFields();
                area.innerHTML = EventsForm[extrafields]();
            }
        });
    },
    register:function(){
        return '';
    },
    interval:function(){
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