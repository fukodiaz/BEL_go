import './bootstrap';
import { createApp, h } from 'vue';
import { createInertiaApp, Link } from '@inertiajs/vue3';
// import { ZiggyVue } from 'ziggy-js';
// import { Ziggy } from './ziggy'
import components from './components/UI';
import 'virtual:svg-icons-register'

const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });

createInertiaApp({
    resolve: name => pages[`./Pages/${name}.vue`],
    setup({el, App, props, plugin}) {
        const app = createApp({render: () => h(App, props)})
            .use(plugin)
            // .use(ZiggyVue, Ziggy)
            .component('Link', Link);

        components.forEach(component => app.component(component.name, component));
        app.mount(el);
    }
});


//basic vue

// import App from './components/App.vue';
// import router from './router/router';

// const app = createApp(App);
// app.config.devtools = true;

// app.use(router);
// app.mount('#app');