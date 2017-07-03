import $ from 'jquery';
import './footer.scss';

export default class Footer {
    static selectors = {
        button: '.button'
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

    }

    handleClick() {

    }
}
