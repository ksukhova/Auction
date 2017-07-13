import $ from 'jquery';
import './footer.scss';

export default class Footer {
    constructor($root) {

        this.elements = {
            $root,
            $window: $(window)
        };
    }
}
