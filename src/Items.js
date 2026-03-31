import { Slug } from './Slug.js';
import { Aside } from './Aside.js';
import { Events } from './Events.js';
export const Items = {
    items:[],
    registers:[],
    loadEvents:() => {
        const List = document.querySelector("#list");
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
    showEvent:(item) => {
        
        console.log('item',item,Items.registers);
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
        const list = document.querySelector("#list");
        htmlList = '';
        if(Items.items){
            Items.items.forEach(element => {
                htmlList += Items.itemToHTML(element);
            });
        }
        list.innerHTML = htmlList;
        
    },
    itemToHTML: (element,index) => {
        console.log('element',element);
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
        </div>
        `;
    }
};
