export const Aside = {
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