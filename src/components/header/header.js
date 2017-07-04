import $ from 'jquery';
import './header.scss';

export default class Header {
    static selectors = {
        button: '.header__enter',
        search: '.header__search'
    };

    constructor($root) {

        this.elements = {
            $root,
            $window: $(window)
        };

        this.data = null;
        this.init();
    }

    init() {

    }

    attachEvents() {
        this.elements.$root.on('click', Header.selectors.button, this.handleClick.bind(this))
    }

    handleClick() {

    }
}
