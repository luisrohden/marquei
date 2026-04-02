import { Slug } from './Slug.js';
import { Aside } from './Aside.js';
import { Events } from './Events.js';
export const Items = {
    items:[],
    registers:[],
    getList:() => {
        return document.querySelector("#list");
    },
    loadEvents:() => {
        const List = Items.getList();
        List.addEventListener('click',function(event){
            //Register
            const btnRegister = event.target.closest('.bnt-register');
            if(btnRegister){
                Items.registerEvent(btnRegister);     
            }
            //Show
            const btnShow = event.target.closest('.btn-show');
            if(btnShow){
                const item = btnShow.closest('.item');
                Items.showEvent(item);     
            }
        })
    },
    showEvent:(selectedItem) => {
        const List = Items.getList();
        console.log('selectedItem',selectedItem.dataset.slug);
        console.log('lista de items',Items.items);
        console.log('selectedItem.dataset.slug',selectedItem.dataset.slug);
        let info = {};
        Items.items.forEach(item => {
            if(selectedItem.dataset.slug == item.slug){
                info = item; 
                console.log('info',info);
                
            }

            console.log('item x',item);
        });
        console.log('info',info);
        let registerHTML = '';
        
        Items.registers.forEach(register => {
            const date = new Date(register.time);
            const formatada = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
            }).replace(',', ' -');

            registerHTML +=`
                <div> ` + formatada + `</div>
            `;

        });


        registersHTML = `
        <div>
            <h2>`+ registerHTML +`</h2>
        </div>
        `;
        console.log('Items.registers',Items.registers);

        console.log(List);

        List.insertAdjacentHTML('beforeend',registersHTML);


        console.log('item',item,Items.registers);
        console.log('item.dataset.slug',item.dataset.slug,Items.registers);
    },
    registerEvent:(btnRegister) => {
        const slug = btnRegister.dataset.slug;
        Items.registers.push({
            'slug':slug,
            'time': Date.now()
        });
        
    },
    new:(name,type,days,hours) => {
        Items.items.push({
            'name':name,
            'slug':Slug(name),
            'type':type,
            'days':days,
            'hours':hours
        });
        Items.show();
        Aside.close();
    },
    show:() => {
        const List = Items.getList();
        htmlList = '';
        if(Items.items){
            Items.items.forEach(element => {
                htmlList += Items.itemToHTML(element);
            });
        }
        List.innerHTML = htmlList;
        
    },
    itemToHTML: (element,index) => {
        console.log('element',element);
        let progress = ``;
        if(element.type == 'interval'){
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
