import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Slider from './components/slider/slider.js';
import About from './components/about/about.js';
import Contacts from './components/contacts/contacts.js';
import Preview from './components/preview/preview.js';
import Lots from './components/lots/lots.js';
import Lot from './components/lot/lot.js';
import Select from './components/select/select.js';
import start from './start';
import { registerRoute, router } from './router';
import './app.scss';

const components = {
    Header,
    Footer,
    Slider,
    About,
    Contacts,
    Preview,
    Lots,
    Lot,
    Select
};

start(components);
registerRoute('/')
    .add('/about')
    .add('/contacts')
    .add('/lots')
    .add('/lots/:id')
    .resolve();