import $ from 'jquery';
import 'simple-pagination.js';
import 'simple-pagination.js/simplePagination.css';
import { router } from 'src/router';
import Base from 'src/components/base';
import template from './../preview/_preview.ejs';
import './lots.scss';

export default class Lots extends Base {
    static selectors = {
        link: '.preview__link',
        wrapper: '.preview__wrapper',
        pagination: '.pagination'
    };

    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window),
            $list: $root.find('.list'),
            $pagination: $root.find(Lots.selectors.pagination)
        };

        this.lots = null;
        this.query = null;
        this.page = 0;
        this.type = new URL(window.location.href).searchParams.get('type');
        this.sort = new URL(window.location.href).searchParams.get('sort');
        this.hasPagination = false;

        this.attachEvents();
    }

    attachEvents() {
        this.elements.$window.on('/lots', this.toggle);

        this.elements.$root.on('click', Lots.selectors.link, this.handleLink);
    }

    handleLink = (e) => {
        router.navigate(e.target.getAttribute('data-link'));
    };

    handlePageClick = (number) => {
        const shouldRender = number !== this.page;

        this.page = number;

        if (shouldRender) {
            this.render();
        }
    };

    toggle = (event, { active, params, query }) => {
        if (active) {
            this.query = query;

            if (!this.lots) {
                this.getLots();
            } else {
                this.render();
            }
        } else {
            this.destroy();
        }
    };

    getLots() {
        $.ajax({
            url: "//localhost:9000/__mocks__/data.json"
        }).then(data => {
            this.lots = data;

            return this;
        }).then(this.render);
    }

    getByType(lots, type) {
        if (!type) {
            return lots;
        }

        return lots.filter(lot => lot.type === type);
    }

    getByPrice(lots, sort) {
        if (!sort) {
            return lots;
        }
        return sort === 'ascending'
            // added concat to receive new array and avoid mutating
            ? lots.concat().sort((a, b) => a.price - b.price)
            : lots.concat().sort((a, b) => b.price - a.price);
    }

    render = () => {
        const type = new URL(window.location.href).searchParams.get('type');
        const sort = new URL(window.location.href).searchParams.get('sort');

        const typedLots = this.getByType(this.lots, type);
        const lots = this.getByPrice(typedLots, sort);

        if (type !== this.type || sort !== this.sort) {
            this.page = 1;
        }

        const itemsToRender = this.getItems(lots, this.page);

        if (!this.hasPagination) {
            this.elements.$pagination.pagination(
                {
                    items: lots.length,
                    itemsOnPage: 5,
                    onPageClick: this.handlePageClick,
                    cssStyle: 'dark-theme'
                }
            );

            this.hasPagination = true;
        } else {
            this.elements.$pagination.pagination('updateItems', lots.length);

            if (type !== this.type) {
                this.type = type;

                this.elements.$pagination.pagination('selectPage', this.page);
            } else if (sort !== this.sort) {
                this.sort = sort;

                this.elements.$pagination.pagination('selectPage', this.page);
            }
        }

        this.elements.$list.html(template({data: itemsToRender, showAll: false}));
    };

    getItems = (array, page = 0) => {
        if (!page) {
            return array.slice(0, 5);
        }
        const start = (5 * page) - 5;
        const end = start + 5;

        return array.slice(start, end);
    };

    destroy = () => {
        this.elements.$pagination.pagination('destroy');
        this.elements.$pagination.html('');
        this.elements.$list.html('');
    };
}
