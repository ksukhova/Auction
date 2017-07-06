import $ from 'jquery';
import Base from 'src/components/base';
import { router } from 'src/router';
import template from './_search.ejs';
import './search.scss';

export default class Search extends Base {
    static selectors = {
        link: '.preview__link'
    };

    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.items = null;
        this.query = new URL(window.location.href).searchParams.get('query');

        this.attachEvents();
    }

    attachEvents() {
        this.elements.$window
            .on('/search', this.toggle);

        this.elements.$root.on('click', Search.selectors.link, this.handleLink)
    }

    handleLink = (e) => {
        router.navigate(e.target.getAttribute('data-link'));
    };

    getLots() {
        $.ajax({
            url: "//localhost:9000/__mocks__/data.json"
        }).then(data => {
            this.items = data;

            return this;
        }).then(this.render);
    }

    getByName (lots, name) {
        if (!name) {
            return lots;
        }

        return lots.filter(lot => lot.name.toLowerCase().includes(name.toLowerCase()));
    }

    toggle = (event, { active, params, query }) => {
        if (active) {
            this.query = new URL(window.location.href).searchParams.get('query');

            if (!this.items) {
                this.getLots();
            } else {
                this.render();
            }
        } else {
            this.destroy();
        }
    };

    render = () => {
        this.query = new URL(window.location.href).searchParams.get('query');
        const filteredLots = this.getByName(this.items, this.query);

        this.elements.$root.html(template({items: filteredLots}));
    };

    destroy = () => {
        this.items = null;
        this.elements.$root.html('');
    };
}
