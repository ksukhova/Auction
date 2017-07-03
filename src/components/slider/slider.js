import $ from 'jquery';
import 'slick-carousel';
import './slider.scss';
import router from 'src/router';
import template from './_slider.ejs';

export default class Slider {
    static selectors = {
        slider: '.slider'
    };

    constructor($root) {

        this.elements = {
            $root,
            $window: $(window),
            $slider: $('')
        };

        // this.init();
        this.attachEvents();
    }

    init() {
        this.elements.$slider.slick({
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            adaptiveHeight: true,
            variableWidth: true
        });
    }

    attachEvents() {
        router
            .on('/', this.render,
                {
                    before: done => done(),
                    leave: this.destroy
                });
    }

    render = () => {
        this.elements.$root.html(template());
        this.elements.$slider = this.elements.$root.find(Slider.selectors.slider);

        this.init();
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
