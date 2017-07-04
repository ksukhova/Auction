import $ from 'jquery';
import Base from 'src/components/base';
import template from './_about.ejs';
import './about.scss';

export default class About extends Base {
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
            .on('/about', this.toggle);
    }

    render = () => {
        this.elements.$root.html(template());
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
