import $ from 'jquery';
import { router } from 'src/router';
import Base from 'src/components/base';
import template from './_select.ejs';
import './select.scss';

export default class Select extends Base {
    static selectors = {
        select: '.select__filter'
    };

    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.attachEvents();
    };

    attachEvents = () => {
        this.elements.$window.on('/lots', this.toggle);

        this.elements.$root.on('change', Select.selectors.select, this.handleChange)
    };

    handleChange = (e) => {
        if (e.target.value) {
            router.navigate(`/lots?type=${e.target.value}`);
        } else {
            router.navigate('/lots');
        }
    };

    render = (params, query) => {
        this.elements.$root.html(template({type: new URL(window.location.href).searchParams.get('type')}));
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
