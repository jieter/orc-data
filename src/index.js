import App from './App.svelte';

const hash = window.location.hash;
const app = new App({
    target: document.querySelector('#container'),
    props: {
        sailnumber: hash.length > 1 ? hash.substring(1) : undefined,
    },
});

export default app;
