import $ from 'jquery';
import { router } from 'src/router';
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

        this.attachEvents();
    }

    attachEvents() {
        this.elements.$root.on('click', Header.selectors.button, this.handleClick)
    }

    handleClick = () => {
        const search =  $(Header.selectors.search).val();
        if (search) {
            router.navigate(`/search?query=${search}`);
        }
    }
}
