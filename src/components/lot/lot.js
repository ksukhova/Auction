import $ from 'jquery';
import Base from 'src/components/base';
import template from './_lot.ejs';
import './lot.scss';

export default class Lot extends Base {
    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.lot = null;

        this.attachEvents();
    }

    attachEvents() {
        this.elements.$window.on('/lots/:id', this.toggle);
    }

    render = (params) => {
        $.ajax({
            url: "//localhost:9000/__mocks__/data.json"
        }).then(data => {
            this.lot = data.filter(item => item.id === Number(params.id))[0];

            this.elements.$root.html(template({lot: this.lot}));
        });
        this.elements.$root.html(template({lot: this.lot}));
    };

    destroy = () => {
        this.lot = null;
        this.elements.$root.html('');
    };
}
