export default class Base {
    toggle = (event, { active, params, query }) => {
        if (active) {
            this.render(params, query);
        } else {
            this.destroy();
        }
    };

    render() {
        throw new Error('Provide render method');
    }

    destroy() {
        throw new Error('Provide destroy method');
    }
}