import Header from './components/header/header.js';
import Footer from './components/footer/footer.js';
import Slider from './components/slider/slider.js';
import About from './components/about/about.js';
import Contacts from './components/contacts/contacts.js';
import start from './start';
import './app.scss';

const components = {
    Header,
    Footer,
    Slider,
    About,
    Contacts
};

start(components);
