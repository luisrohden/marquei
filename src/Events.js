import { Aside } from './Aside.js';
import { Items } from './Items.js';
import { EventsForm } from './EventsForm.js';

export const Events = {
    start:() => {
        //
        addEvent_list = document.querySelectorAll('.event-create');
        addEvent_list.forEach(element => {
            element.addEventListener('click',function(){
                Events.add();
            })  
        });
        const Area  = document.querySelector(Aside.selector);
        Area.addEventListener('click',function(event){
            const botaoSave = event.target.closest('.event-save');
            if(botaoSave){
                Events.save();     
            }
        });
        
    },
    save:() => {
        const name = document.querySelector('#field-name').value;
        const type = document.querySelector('select.selectType').value;
        if(name == ''){
            return;
        }

        //days 
        let days = 0;
        fieldDays = document.querySelector('#field-days');
        if(fieldDays){
            days = parseInt(fieldDays.value);
        }
        //Hours
        const fieldHours = document.querySelector('#field-days');
        let hours = 0;
        if(fieldHours){
            const hours = parseInt(fieldHours.value);
        }


        Items.new(name,type,days,hours);
        //alert(name);
        
    },
    add:() => {
        const form = EventsForm.create();
        Aside.load(form);
        
    },
};