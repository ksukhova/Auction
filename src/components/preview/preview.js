import $ from 'jquery';
import { router } from 'src/router';
import Base from 'src/components/base';
import template from './_preview.ejs';
import './preview.scss';

export default class Preview extends Base {

    static selectors = {
        link: '.preview__link',
        showAll: '.preview__show-all'
    };

    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.data = null;

        this.attachEvents();
    }

    attachEvents() {
        this.elements.$window
            .on('/', this.toggle);

        this.elements.$root.on('click', Preview.selectors.link, this.handleLink);

        this.elements.$root.on('click', Preview.selectors.showAll, this.handleShowAll);
    }

    handleLink = (e) => {
        router.navigate(e.target.getAttribute('data-link'));
    };

    handleShowAll = (e) => {
        router.navigate('/lots');
    };

    render = () => {
        $.ajax({
            url: "//localhost:9000/__mocks__/data.json"
        }).then(data => {
            this.data = data;
            this.elements.$root.html(template({data: this.data.slice(0, 3), showAll: true}));
        });
    };

    destroy = () => {
        this.data = null;
        this.elements.$root.html('');
    };
}
