import $ from 'jquery';

const start = (components, root = $(document)) => {
    const $components = root.find('[data-components]');

    $components.each((index, node) => {
        const $node = $(node);
        const className = $node.data('components');

        new components[className]($node);
    });
};

export default start;
