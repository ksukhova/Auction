import $ from 'jquery';
import router from 'src/router';
import template from './_about.ejs';

export default class About {
    constructor($root) {

        this.elements = {
            $root
        };

        this.init();
        this.attachEvents();
    }

    init() {

    }

    attachEvents() {
        router
            .on('/about', this.render, {
                before: done => done(),
                leave: this.destroy
            })
            .resolve();
    }

    render = () => {
        this.elements.$root.html(template());
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
