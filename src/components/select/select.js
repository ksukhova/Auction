import $ from 'jquery';
import { router } from 'src/router';
import Base from 'src/components/base';
import template from './_select.ejs';
import './select.scss';

export default class Select extends Base {
    static selectors = {
        select: '.select__filter',
        sorter: '.select__sorter'
    };

    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.currentFilter = '';
        this.currentSort = '';

        this.attachEvents();
    };

    attachEvents = () => {
        this.elements.$window.on('/lots', this.toggle);

        this.elements.$root.on('change', Select.selectors.select, this.handleChange);

        this.elements.$root.on('change', Select.selectors.sorter, this.handleSort);
    };

    handleChange = (e) => {
        const sort = this.currentSort ? `${this.currentSort}` : '';
        if (e.target.value) {
            this.currentFilter = `type=${e.target.value}`;
            if (sort) {
                router.navigate(`/lots?${this.currentFilter}&${sort}`);
            } else {
                router.navigate(`/lots?${this.currentFilter}`);
            }
        } else {
            this.currentFilter = '';
            if (sort) {
                router.navigate(`/lots?${sort}`);
            } else {
                router.navigate(`/lots`);
            }
        }
    };

    handleSort = (e) => {
        const filter = this.currentFilter ? `${this.currentFilter}` : '';
        if (e.target.value) {
            this.currentSort = `sort=${e.target.value}`;
            if (filter) {
                router.navigate(`/lots?${this.currentSort}&${filter}`);
            } else {
                router.navigate(`/lots?${this.currentSort}`);
            }
        } else {
            this.currentSort = '';
            if (filter) {
                router.navigate(`/lots?${filter}`);
            } else {
                router.navigate(`/lots`);
            }
        }
    };

    render = (params, query) => {
        this.elements.$root.html(template({
            type: new URL(window.location.href).searchParams.get('type'),
            sort: new URL(window.location.href).searchParams.get('sort')
        }));
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
