import Navigo from 'navigo';
import $ from 'jquery';

export const router = new Navigo('');

/* rewrite @getLinkPath method to have possibility to pass links with queries*/
router.getLinkPath = item => item.getAttribute('href');

const $window = $(window);

export const registerRoute = url => {
    router.on(url, (params, query) => {
            $window.trigger(url, { active: true, params, query })
        },
        {
            before: done => done(),
            leave: () => $window.trigger(url, { active: false })
        });

    return {
        add: registerRoute,
        resolve: router.resolve.bind(router)
    };
};
