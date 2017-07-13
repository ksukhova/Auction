import $ from 'jquery';
import 'slick-carousel';
import './slider.scss';
import Base from 'src/components/base';
import template from './_slider.ejs';

export default class Slider extends Base {
    static selectors = {
        slider: '.slider'
    };

    constructor($root) {
        super();

        this.elements = {
            $root,
            $window: $(window)
        };

        this.attachEvents();
    }

    init() {
        this.elements.$root.find(Slider.selectors.slider).slick({
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
        this.elements.$window
            .on('/', this.toggle);
    }

    render = () => {
        this.elements.$root.html(template());

        this.init();
    };

    destroy = () => {
        this.elements.$root.html('');
    };
}
