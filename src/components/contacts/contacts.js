import $ from 'jquery';
import Base from 'src/components/base';
import template from './_contacts.ejs';
import './contacts.scss';

export default class Contacts extends Base{
    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.attachEvents();
    }

    attachEvents() {
        this.elements.$window
            .on('/contacts', this.toggle);
    }

    render = () => {
        this.elements.$root.html(template());
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
