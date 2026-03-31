import { Aside } from './Aside.js';
import { Events } from './Events.js';
import { EventsForm } from './EventsForm.js';
import { Items } from './Items.js';

export const Iniciar = () => {
    console.log('Iniciar()');
    Aside.start();
    Events.start();
    Items.loadEvents();
    EventsForm.loadEvents();
};