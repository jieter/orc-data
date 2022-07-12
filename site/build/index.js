
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
'use strict';

function noop$2() { }
const identity$3 = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop$2;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop$2;
}

const is_client = typeof window !== 'undefined';
let now$1 = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop$2;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}
function append(target, node) {
    target.appendChild(node);
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty$1() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children$1(element) {
    return Array.from(element.childNodes);
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead
let crossorigin;
function is_crossorigin() {
    if (crossorigin === undefined) {
        crossorigin = false;
        try {
            if (typeof window !== 'undefined' && window.parent) {
                void window.parent.document;
            }
        }
        catch (error) {
            crossorigin = true;
        }
    }
    return crossorigin;
}
function add_resize_listener(node, fn) {
    const computed_style = getComputedStyle(node);
    if (computed_style.position === 'static') {
        node.style.position = 'relative';
    }
    const iframe = element('iframe');
    iframe.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
        'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    const crossorigin = is_crossorigin();
    let unsubscribe;
    if (crossorigin) {
        iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
        unsubscribe = listen(window, 'message', (event) => {
            if (event.source === iframe.contentWindow)
                fn();
        });
    }
    else {
        iframe.src = 'about:blank';
        iframe.onload = () => {
            unsubscribe = listen(iframe.contentWindow, 'resize', fn);
        };
    }
    append(node, iframe);
    return () => {
        if (crossorigin) {
            unsubscribe();
        }
        else if (unsubscribe && iframe.contentWindow) {
            unsubscribe();
        }
        detach(iframe);
    };
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash$1(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash$1(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
}

function create_animation(node, from, fn, params) {
    if (!from)
        return noop$2;
    const to = node.getBoundingClientRect();
    if (from.left === to.left && from.right === to.right && from.top === to.top && from.bottom === to.bottom)
        return noop$2;
    const { delay = 0, duration = 300, easing = identity$3, 
    // @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
    start: start_time = now$1() + delay, 
    // @ts-ignore todo:
    end = start_time + duration, tick = noop$2, css } = fn(node, { from, to }, params);
    let running = true;
    let started = false;
    let name;
    function start() {
        if (css) {
            name = create_rule(node, 0, 1, duration, delay, easing, css);
        }
        if (!delay) {
            started = true;
        }
    }
    function stop() {
        if (css)
            delete_rule(node, name);
        running = false;
    }
    loop(now => {
        if (!started && now >= start_time) {
            started = true;
        }
        if (started && now >= end) {
            tick(1, 0);
            stop();
        }
        if (!running) {
            return false;
        }
        if (started) {
            const p = now - start_time;
            const t = 0 + 1 * easing(p / duration);
            tick(t, 1 - t);
        }
        return true;
    });
    start();
    tick(0, 1);
    return stop;
}
function fix_position(node) {
    const style = getComputedStyle(node);
    if (style.position !== 'absolute' && style.position !== 'fixed') {
        const { width, height } = style;
        const a = node.getBoundingClientRect();
        node.style.position = 'absolute';
        node.style.width = width;
        node.style.height = height;
        add_transform(node, a);
    }
}
function add_transform(node, a) {
    const b = node.getBoundingClientRect();
    if (a.left !== b.left || a.top !== b.top) {
        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out(block, 1, 1, () => {
                            if (info.blocks[i] === block) {
                                info.blocks[i] = null;
                            }
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component();
        promise.then(value => {
            set_current_component(current_component);
            update(info.then, 1, info.value, value);
            set_current_component(null);
        }, error => {
            set_current_component(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function update_await_block_branch(info, ctx, dirty) {
    const child_ctx = ctx.slice();
    const { resolved } = info;
    if (info.current === info.then) {
        child_ctx[info.value] = resolved;
    }
    if (info.current === info.catch) {
        child_ctx[info.error] = resolved;
    }
    info.block.p(child_ctx, dirty);
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function fix_and_outro_and_destroy_block(block, lookup) {
    block.f();
    outro_and_destroy_block(block, lookup);
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop$2,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children$1(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop$2;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.49.0' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

function ascending$1(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending$1;
    compare2 = (d, x) => ascending$1(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending$1 || f === descending ? f : zero$1;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero$1() {
  return 0;
}

function number$1(x) {
  return x === null ? NaN : +x;
}

const ascendingBisect = bisector(ascending$1);
const bisectRight = ascendingBisect.right;
bisector(number$1).center;

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    let r0 = Math.round(start / step), r1 = Math.round(stop / step);
    if (r0 * step < start) ++r0;
    if (r1 * step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n) ticks[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start * step), r1 = Math.round(stop * step);
    if (r0 / step < start) ++r0;
    if (r1 / step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n) ticks[i] = (r0 + i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

function transpose(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}

function length(d) {
  return d.length;
}

function zip() {
  return transpose(arguments);
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend$1(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb, extend$1(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend$1(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

const radians = Math.PI / 180;
const degrees$1 = 180 / Math.PI;

// https://observablehq.com/@mbostock/lab-and-rgb
const K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0$1 = 4 / 29,
    t1$1 = 6 / 29,
    t2 = 3 * t1$1 * t1$1,
    t3 = t1$1 * t1$1 * t1$1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

define(Lab, lab, extend$1(Color, {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new Rgb(
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0$1;
}

function lab2xyz(t) {
  return t > t1$1 ? t * t * t : t2 * (t - t0$1);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * degrees$1;
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * radians;
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

define(Hcl, hcl, extend$1(Color, {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));

var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Rgb)) o = rgbConvert(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * degrees$1 - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix$1(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Cubehelix, cubehelix$1, extend$1(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * radians,
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new Rgb(
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));

var constant$2 = x => () => x;

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear$1(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant$2(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$2(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant$2(isNaN(a) ? b : a);
}

var interpolateRgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb$1(start, end) {
    var r = color((start = rgb(start)).r, (end = rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb$1.gamma = rgbGamma;

  return rgb$1;
})(1);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate$1(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate$1(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function interpolateString(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate$1(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$2(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
      : b instanceof color ? interpolateRgb
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

var degrees = 180 / Math.PI;

var identity$2 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$2 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return identity$2;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$2;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

((function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      };
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
}))(Math.SQRT2, 2, 4);

function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = cubehelix$1(start)).h, (end = cubehelix$1(end)).h),
          s = nogamma(start.s, end.s),
          l = nogamma(start.l, end.l),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

cubehelix(hue);
cubehelix(nogamma);

function constants(x) {
  return function() {
    return x;
  };
}

function number(x) {
  return +x;
}

var unit = [0, 1];

function identity$1(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = interpolate$1,
      transform,
      untransform,
      unknown,
      clamp = identity$1,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$1) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$1, rescale()) : clamp !== identity$1;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer()(identity$1, identity$1);
}

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent$1(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale$1(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale$1;
var format;
var formatPrefix;

defaultLocale$1({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}

function precisionFixed(step) {
  return Math.max(0, -exponent$1(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3 - exponent$1(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent$1(max) - exponent$1(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous();

  scale.copy = function() {
    return copy(scale, linear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

var t0 = new Date,
    t1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = function(date) {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [], previous;
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}

var millisecond = newInterval(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return newInterval(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};
millisecond.range;

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;

var second = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds());
}, function(date, step) {
  date.setTime(+date + step * durationSecond);
}, function(start, end) {
  return (end - start) / durationSecond;
}, function(date) {
  return date.getUTCSeconds();
});
second.range;

var minute = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getMinutes();
});
minute.range;

var hour = newInterval(function(date) {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getHours();
});
hour.range;

var day = newInterval(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);
day.range;

function weekday(i) {
  return newInterval(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

sunday.range;
monday.range;
tuesday.range;
wednesday.range;
thursday.range;
friday.range;
saturday.range;

var month = newInterval(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});
month.range;

var year = newInterval(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};
year.range;

var utcMinute = newInterval(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationMinute);
}, function(start, end) {
  return (end - start) / durationMinute;
}, function(date) {
  return date.getUTCMinutes();
});
utcMinute.range;

var utcHour = newInterval(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * durationHour);
}, function(start, end) {
  return (end - start) / durationHour;
}, function(date) {
  return date.getUTCHours();
});
utcHour.range;

var utcDay = newInterval(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / durationDay;
}, function(date) {
  return date.getUTCDate() - 1;
});
utcDay.range;

function utcWeekday(i) {
  return newInterval(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / durationWeek;
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;

var utcMonth = newInterval(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});
utcMonth.range;

var utcYear = newInterval(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : newInterval(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};
utcYear.range;

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day$1;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day$1 = week.getUTCDay();
          week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day$1 = week.getDay();
          week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale;
var utcFormat;
var utcParse;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  locale.format;
  locale.parse;
  utcFormat = locale.utcFormat;
  utcParse = locale.utcParse;
  return locale;
}

var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

Date.prototype.toISOString
    ? formatIsoNative
    : utcFormat(isoSpecifier);

function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

+new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : utcParse(isoSpecifier);

var xhtml = "http://www.w3.org/1999/xhtml";

var namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

function none() {}

function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array$1(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

function empty() {
  return [];
}

function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

function arrayAll(select) {
  return function() {
    return array$1(select.apply(this, arguments));
  };
}

function selection_selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection$1(subgroups, parents);
}

function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

function selection_selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

function selection_selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection$1(subgroups, this._parents);
}

function sparse(update) {
  return new Array(update.length);
}

function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

function constant$1(x) {
  return function() {
    return x;
  };
}

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = constant$1(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}

function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

function selection_merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection$1(merges, this._parents);
}

function selection_order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

function selection_sort(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection$1(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

function selection_nodes() {
  return Array.from(this);
}

function selection_node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

function selection_size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

function selection_empty() {
  return !this.node();
}

function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

function selection_attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
      : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
}

function defaultView(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

function selection_style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove$1 : typeof value === "function"
            ? styleFunction$1
            : styleConstant$1)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}

function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

function selection_property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

function selection_classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

function textRemove() {
  this.textContent = "";
}

function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction$1
          : textConstant$1)(value))
      : this.node().textContent;
}

function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

function selection_html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

function selection_raise() {
  return this.each(raise);
}

function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

function selection_lower() {
  return this.each(lower);
}

function selection_append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

function constantNull() {
  return null;
}

function selection_insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

function selection_remove() {
  return this.each(remove);
}

function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames$1(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

function selection_on(typename, value, options) {
  var typenames = parseTypenames$1(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

function dispatchEvent(node, type, params) {
  var window = defaultView(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

function selection_dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

function* selection_iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

var root = [null];

function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection$1([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};

function select(selector) {
  return typeof selector === "string"
      ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
      : new Selection$1([[selector]], root);
}

var nextId = 0;

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};

const pi$1 = Math.PI,
    tau$2 = 2 * pi$1,
    epsilon$1 = 1e-6,
    tauEpsilon = tau$2 - epsilon$1;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$1));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$1) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi$1 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$1) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$1 || Math.abs(this._y1 - y0) > epsilon$1) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau$2 + tau$2;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$1) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi$1)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function constant(x) {
  return function constant() {
    return x;
  };
}

const sqrt = Math.sqrt;

const epsilon = 1e-12;
const pi = Math.PI;
const tau$1 = 2 * pi;

function array(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line(x$1, y$1) {
  var defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant(y$1);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line) : y$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

var symbolCircle = {
  draw(context, size) {
    const r = sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau$1);
  }
};

const tan30 = sqrt(1 / 3);
const tan30_2 = tan30 * 2;

var symbolDiamond = {
  draw(context, size) {
    const y = sqrt(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

function Symbol$1(type, size) {
  let context = null;

  type = typeof type === "function" ? type : constant(type || symbolCircle);
  size = typeof size === "function" ? size : constant(size === undefined ? 64 : +size);

  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop$1() {}

function point$3(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point$3(this, this._x1, this._y1); // falls through
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // falls through
      default: point$3(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
}))(0.85);

function point$2(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$2(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // falls through
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop$1,
  areaEnd: noop$1,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // falls through
      default: point$2(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function point$1(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // falls through
      default: point$1(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop$1,
  areaEnd: noop$1,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // falls through
      default: point$1(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
}))(0.5);

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

(Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

var frame = 0, // is an animation frame pending?
    timeout$1 = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

function timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

function transition_tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return get(node, id).value[name];
  };
}

function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? interpolateNumber
      : b instanceof color ? interpolateRgb
      : (c = color(b)) ? (b = c, interpolateRgb)
      : interpolateString)(a, b);
}

function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}

function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

function transition_delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : get(this.node(), id).delay;
}

function durationFunction(id, value) {
  return function() {
    set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    set(this, id).duration = value;
  };
}

function transition_duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : get(this.node(), id).duration;
}

function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    set(this, id).ease = value;
  };
}

function transition_ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : get(this.node(), id).ease;
}

function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    set(this, id).ease = v;
  };
}

function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

var Selection = selection.prototype.constructor;

function transition_selection() {
  return new Selection(this._groups, this._parents);
}

function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction(tweenValue(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}

function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

function transition_transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

function transition_end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function newId() {
  return ++id;
}

var selection_prototype = selection.prototype;

Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

var exponent = 3;

((function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
}))(exponent);

((function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
}))(exponent);

((function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
}))(exponent);

// tpmt is two power minus ten times t scaled to [0,1]
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 0.0009765625) * 1.0009775171065494;
}

var overshoot = 1.70158;

((function custom(s) {
  s = +s;

  function backIn(t) {
    return (t = +t) * t * (s * (t - 1) + t);
  }

  backIn.overshoot = custom;

  return backIn;
}))(overshoot);

((function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((t + 1) * s + t) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
}))(overshoot);

((function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
}))(overshoot);

var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

((function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * tpmt(-(--t)) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
}))(amplitude, period);

((function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
}))(amplitude, period);

((function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * tpmt(-t) * Math.sin((s - t) / p)
        : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
}))(amplitude, period);

var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;

const DEG2RAD = Math.PI / 180;

function vmg2sog(beat_angle, vmg) {
    return vmg / Math.cos(beat_angle * DEG2RAD);
}
function round(x, n) {
    return n == null ? Math.round(x) : Math.round(x * (n = Math.pow(10, n))) / n;
}
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function zeros(n) {
    return Array.apply(null, new Array(n)).map(() => 0.0);
}

function int(n) {
    return parseInt(n, 10);
}

function float(n) {
    return +n;
}

const deg2rad = (degrees, vmg) => [degrees * DEG2RAD, vmg2sog(degrees, vmg)];

function seriesFromVpp(vpp) {
    const vpp_angles = vpp.angles.map((d) => d * DEG2RAD);
    let run_data = [];

    const vpp_data = vpp.speeds.map(function (windspeed, i) {
        var series = zip(
            vpp_angles,
            vpp.angles.map((angle) => vpp[angle][i])
        );
        // filter points with zero SOG
        series = series.filter((a) => a[1] > 0);

        if (vpp.beat_angle) {
            series.unshift(deg2rad(vpp.beat_angle[i], vpp.beat_vmg[i]));
        }
        if (vpp.run_angle) {
            var run = deg2rad(vpp.run_angle[i], -vpp.run_vmg[i]);
            series.push(run);
            run_data.push(run);
        }

        return series.sort((a, b) => a[0] - b[0]);
    });
    return { vpp_data, run_data };
}

function polarplot(container) {
    if (container.substring) {
        container = document.getElementById(container.substring(1));
    }
    var width = function () {
        return container.offsetWidth;
    };
    var height = function () {
        const windowHeight = window.innerHeight;
        return Math.min(width() * 1.8, windowHeight - 60);
    };
    // Radius of the visualization
    const radius = function () {
        return Math.min(height() / 1.8 - 20, width()) - 15;
    };
    // Radial speed scale (kts)
    const r = linear().domain([0, 10]).range([0, radius()]);

    const svg = select(container)
        .append('svg')
        .attr('width', width())
        .attr('height', height())
        .append('g')
        .attr('transform', `translate(10, ${height() / 2.2})`);

    // Speed rings
    const speedScale = svg
        .append('g')
        .selectAll('g')
        .data([2, 4, 6, 8, 10, 12, 14, 16])
        .enter()
        .append('g')
        .attr('class', (d) => `r axis sog-${d}`);

    speedScale.append('circle').attr('r', r);
    speedScale
        .append('text')
        .attr('y', (speed) => -r(speed) - 2)
        .attr('transform', 'rotate(25)')
        .style('text-anchor', 'middle')
        .text((speed) => (speed <= 10 ? `${speed}kts` : '')); // show labels up to 10kts

    // True wind directions
    const graph = svg
        .append('g')
        .attr('class', 'a axis')
        .selectAll('g')
        .data([0, 45, 52, 60, 75, 90, 110, 120, 135, 150, 165])
        .enter()
        .append('g')
        .attr('transform', (bearing) => `rotate(${bearing - 90})`);

    graph.append('line').attr('x1', r(1)).attr('x2', radius());

    const xaxis = function (selection) {
        selection
            .attr('x', radius() + 6)
            .attr('dy', '.35em')
            .attr('transform', (d) => (d > 90 ? `rotate(0 ${radius() + 8}, 0)` : null))
            .text((bearing) => `${bearing}°`);
    };

    graph.append('text').attr('class', 'xlabel').call(xaxis);

    var line = lineRadial$1()
        .radius((d) => r(d[1]))
        .angle((d) => d[0])
        .curve(curveCardinal);

    // Plot VMG diamonds
    var scatter = function (shape, size) {
        return function (s) {
            s.attr('transform', (d) => `translate(${r(d[1]) * Math.sin(d[0])}, ${r(d[1]) * -Math.cos(d[0])})`);
            s.attr('d', Symbol$1(shape || symbolDiamond, size || 32));
        };
    };

    var plot = function () {};

    var vpp;
    plot.render = function (data) {
        vpp = 'vpp' in data ? data.vpp : data;

        const { vpp_data, run_data } = seriesFromVpp(vpp);

        var tws_series = function (cssClass) {
            return (selection) => selection.attr('class', (d, i) => `${cssClass} tws-${vpp.speeds[i]}`);
        };

        var run_points = svg.selectAll('.vmg-run').data(run_data);
        run_points.exit().remove();
        run_points
            .enter()
            .append('path')
            .call(tws_series('vmg-run'))
            .merge(run_points)
            .transition()
            .duration(200)
            .call(scatter());

        var lines = svg.selectAll('.line').data(vpp_data);
        lines.exit().remove();
        lines.enter().append('path').call(tws_series('line')).merge(lines).transition().duration(200).attr('d', line);
    };

    var highlight;

    select(window).on('mouseover', function (event) {
        var target = select(event.target);
        var targetClass = target.attr('class');
        if (!targetClass || targetClass.substring(0, 4) !== 'tws-') {
            svg.selectAll('.highlight').data([]).exit().remove();
            return;
        }

        var parent = select(event.target.parentNode);
        var parentClass = parent ? parent.attr('class') : '';

        if (
            targetClass &&
            targetClass.substring(0, 4) === 'tws-' &&
            parentClass &&
            parentClass.substring(0, 4) === 'twa-'
        ) {
            var tws = +targetClass.substring(4);
            var twa = +parentClass.substring(4);

            const speed = vpp[twa][vpp.speeds.indexOf(tws)];
            highlight = svg.selectAll('.highlight').data([[twa * DEG2RAD, speed]]);
        } else {
            highlight = svg.selectAll('.highlight').data([]);
        }

        highlight.exit().remove();
        highlight
            .enter()
            .append('path')
            .merge(highlight) // merge current selection
            .attr('class', 'highlight ' + (tws ? 'tws-' + tws : ''))
            .transition()
            .duration(50)
            .call(scatter(symbolCircle, 80));
    });

    var previousWidth = width();
    plot.resize = function () {
        if (width() === previousWidth) {
            return;
        }
        svg.attr({
            width: width(),
            height: height(),
            transform: `translate(10, ${height() / 2}})`,
        });
        r.range([0, radius()]);

        speedScale.selectAll('.axis.r circle').attr('r', r);
        speedScale.selectAll('.axis.r text').attr('y', (d) => -r(d) - 4);

        graph.selectAll('line').attr('x2', radius());
        svg.selectAll('.xlabel').call(xaxis);

        svg.selectAll('.line').transition().duration(200).attr('d', line);
        svg.selectAll('.vmg-run').transition().duration(200).call(scatter());

        previousWidth = width();
    };

    return plot;
}

/* site/src/components/PolarPlot.svelte generated by Svelte v3.49.0 */
const file$e = "site/src/components/PolarPlot.svelte";

function create_fragment$g(ctx) {
	let div;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			add_location(div, file$e, 18, 0, 256);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			/*div_binding*/ ctx[4](div);

			if (!mounted) {
				dispose = listen_dev(window, "resize", /*resize_handler*/ ctx[3], false, false, false);
				mounted = true;
			}
		},
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*div_binding*/ ctx[4](null);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PolarPlot', slots, []);
	let { boat } = $$props;
	let container;
	let plot;

	afterUpdate(() => {
		if (!plot) {
			$$invalidate(1, plot = polarplot(container));
		}

		plot.render(boat);
	});

	const writable_props = ['boat'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PolarPlot> was created with unknown prop '${key}'`);
	});

	const resize_handler = () => plot && plot.resize();

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(0, container);
		});
	}

	$$self.$$set = $$props => {
		if ('boat' in $$props) $$invalidate(2, boat = $$props.boat);
	};

	$$self.$capture_state = () => ({
		afterUpdate,
		polarplot,
		boat,
		container,
		plot
	});

	$$self.$inject_state = $$props => {
		if ('boat' in $$props) $$invalidate(2, boat = $$props.boat);
		if ('container' in $$props) $$invalidate(0, container = $$props.container);
		if ('plot' in $$props) $$invalidate(1, plot = $$props.plot);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [container, plot, boat, resize_handler, div_binding];
}

class PolarPlot extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, { boat: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PolarPlot",
			options,
			id: create_fragment$g.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*boat*/ ctx[2] === undefined && !('boat' in props)) {
			console.warn("<PolarPlot> was created without expected prop 'boat'");
		}
	}

	get boat() {
		throw new Error("<PolarPlot>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set boat(value) {
		throw new Error("<PolarPlot>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* site/src/components/PolarTable.svelte generated by Svelte v3.49.0 */

const file$d = "site/src/components/PolarTable.svelte";

function get_each_context$7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context_4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context_5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	child_ctx[3] = i;
	return child_ctx;
}

function get_each_context_6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (9:12) {#each vpp.speeds as speed}
function create_each_block_6(ctx) {
	let th;
	let t0_value = /*speed*/ ctx[8] + "";
	let t0;
	let t1;
	let th_class_value;

	const block = {
		c: function create() {
			th = element("th");
			t0 = text(t0_value);
			t1 = text("kts");
			attr_dev(th, "class", th_class_value = "tws-" + /*speed*/ ctx[8]);
			add_location(th, file$d, 9, 16, 195);
		},
		m: function mount(target, anchor) {
			insert_dev(target, th, anchor);
			append_dev(th, t0);
			append_dev(th, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t0_value !== (t0_value = /*speed*/ ctx[8] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*vpp*/ 1 && th_class_value !== (th_class_value = "tws-" + /*speed*/ ctx[8])) {
				attr_dev(th, "class", th_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(th);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_6.name,
		type: "each",
		source: "(9:12) {#each vpp.speeds as speed}",
		ctx
	});

	return block;
}

// (17:12) {#each vpp.beat_angle as angle, i}
function create_each_block_5(ctx) {
	let td;
	let t0_value = /*angle*/ ctx[1] + "";
	let t0;
	let t1;
	let td_class_value;

	const block = {
		c: function create() {
			td = element("td");
			t0 = text(t0_value);
			t1 = text("°");
			attr_dev(td, "class", td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]]);
			add_location(td, file$d, 17, 16, 402);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t0);
			append_dev(td, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t0_value !== (t0_value = /*angle*/ ctx[1] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*vpp*/ 1 && td_class_value !== (td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]])) {
				attr_dev(td, "class", td_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_5.name,
		type: "each",
		source: "(17:12) {#each vpp.beat_angle as angle, i}",
		ctx
	});

	return block;
}

// (23:12) {#each vpp.beat_vmg as speed, i}
function create_each_block_4(ctx) {
	let td;
	let t_value = /*speed*/ ctx[8] + "";
	let t;
	let td_class_value;

	const block = {
		c: function create() {
			td = element("td");
			t = text(t_value);
			attr_dev(td, "class", td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]]);
			add_location(td, file$d, 23, 16, 586);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t_value !== (t_value = /*speed*/ ctx[8] + "")) set_data_dev(t, t_value);

			if (dirty & /*vpp*/ 1 && td_class_value !== (td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]])) {
				attr_dev(td, "class", td_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_4.name,
		type: "each",
		source: "(23:12) {#each vpp.beat_vmg as speed, i}",
		ctx
	});

	return block;
}

// (30:16) {#each vpp['' + angle] as speed, i}
function create_each_block_3(ctx) {
	let td;
	let t_value = /*speed*/ ctx[8] + "";
	let t;
	let td_class_value;

	const block = {
		c: function create() {
			td = element("td");
			t = text(t_value);
			attr_dev(td, "class", td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]]);
			add_location(td, file$d, 30, 20, 844);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t_value !== (t_value = /*speed*/ ctx[8] + "")) set_data_dev(t, t_value);

			if (dirty & /*vpp*/ 1 && td_class_value !== (td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]])) {
				attr_dev(td, "class", td_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_3.name,
		type: "each",
		source: "(30:16) {#each vpp['' + angle] as speed, i}",
		ctx
	});

	return block;
}

// (27:8) {#each vpp.angles as angle}
function create_each_block_2(ctx) {
	let tr;
	let td;
	let t0_value = /*angle*/ ctx[1] + "";
	let t0;
	let t1;
	let t2;
	let tr_class_value;
	let each_value_3 = /*vpp*/ ctx[0]['' + /*angle*/ ctx[1]];
	validate_each_argument(each_value_3);
	let each_blocks = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	const block = {
		c: function create() {
			tr = element("tr");
			td = element("td");
			t0 = text(t0_value);
			t1 = text("°");
			t2 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			add_location(td, file$d, 28, 16, 754);
			attr_dev(tr, "class", tr_class_value = "twa-" + /*angle*/ ctx[1]);
			add_location(tr, file$d, 27, 12, 713);
		},
		m: function mount(target, anchor) {
			insert_dev(target, tr, anchor);
			append_dev(tr, td);
			append_dev(td, t0);
			append_dev(td, t1);
			append_dev(tr, t2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr, null);
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t0_value !== (t0_value = /*angle*/ ctx[1] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*vpp*/ 1) {
				each_value_3 = /*vpp*/ ctx[0]['' + /*angle*/ ctx[1]];
				validate_each_argument(each_value_3);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_3.length;
			}

			if (dirty & /*vpp*/ 1 && tr_class_value !== (tr_class_value = "twa-" + /*angle*/ ctx[1])) {
				attr_dev(tr, "class", tr_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(tr);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_2.name,
		type: "each",
		source: "(27:8) {#each vpp.angles as angle}",
		ctx
	});

	return block;
}

// (37:12) {#each vpp.run_vmg as vmg, i}
function create_each_block_1$2(ctx) {
	let td;
	let t_value = /*vmg*/ ctx[4] + "";
	let t;
	let td_class_value;

	const block = {
		c: function create() {
			td = element("td");
			t = text(t_value);
			attr_dev(td, "class", td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]]);
			add_location(td, file$d, 37, 16, 1047);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t_value !== (t_value = /*vmg*/ ctx[4] + "")) set_data_dev(t, t_value);

			if (dirty & /*vpp*/ 1 && td_class_value !== (td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]])) {
				attr_dev(td, "class", td_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$2.name,
		type: "each",
		source: "(37:12) {#each vpp.run_vmg as vmg, i}",
		ctx
	});

	return block;
}

// (43:12) {#each vpp.run_angle as angle, i}
function create_each_block$7(ctx) {
	let td;
	let t0_value = /*angle*/ ctx[1] + "";
	let t0;
	let t1;
	let td_class_value;

	const block = {
		c: function create() {
			td = element("td");
			t0 = text(t0_value);
			t1 = text("°");
			attr_dev(td, "class", td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]]);
			add_location(td, file$d, 43, 16, 1230);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t0);
			append_dev(td, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*vpp*/ 1 && t0_value !== (t0_value = /*angle*/ ctx[1] + "")) set_data_dev(t0, t0_value);

			if (dirty & /*vpp*/ 1 && td_class_value !== (td_class_value = "tws-" + /*vpp*/ ctx[0].speeds[/*i*/ ctx[3]])) {
				attr_dev(td, "class", td_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$7.name,
		type: "each",
		source: "(43:12) {#each vpp.run_angle as angle, i}",
		ctx
	});

	return block;
}

function create_fragment$f(ctx) {
	let table;
	let thead;
	let tr0;
	let th;
	let t1;
	let t2;
	let tbody;
	let tr1;
	let td0;
	let t4;
	let t5;
	let tr2;
	let td1;
	let t7;
	let t8;
	let t9;
	let tr3;
	let td2;
	let t11;
	let t12;
	let tr4;
	let td3;
	let t14;
	let each_value_6 = /*vpp*/ ctx[0].speeds;
	validate_each_argument(each_value_6);
	let each_blocks_5 = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks_5[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
	}

	let each_value_5 = /*vpp*/ ctx[0].beat_angle;
	validate_each_argument(each_value_5);
	let each_blocks_4 = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks_4[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
	}

	let each_value_4 = /*vpp*/ ctx[0].beat_vmg;
	validate_each_argument(each_value_4);
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_4.length; i += 1) {
		each_blocks_3[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
	}

	let each_value_2 = /*vpp*/ ctx[0].angles;
	validate_each_argument(each_value_2);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value_1 = /*vpp*/ ctx[0].run_vmg;
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	let each_value = /*vpp*/ ctx[0].run_angle;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			table = element("table");
			thead = element("thead");
			tr0 = element("tr");
			th = element("th");
			th.textContent = "Wind velocity";
			t1 = space();

			for (let i = 0; i < each_blocks_5.length; i += 1) {
				each_blocks_5[i].c();
			}

			t2 = space();
			tbody = element("tbody");
			tr1 = element("tr");
			td0 = element("td");
			td0.textContent = "Beat angle";
			t4 = space();

			for (let i = 0; i < each_blocks_4.length; i += 1) {
				each_blocks_4[i].c();
			}

			t5 = space();
			tr2 = element("tr");
			td1 = element("td");
			td1.textContent = "Beat VMG";
			t7 = space();

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].c();
			}

			t8 = space();

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t9 = space();
			tr3 = element("tr");
			td2 = element("td");
			td2.textContent = "Run VMG";
			t11 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t12 = space();
			tr4 = element("tr");
			td3 = element("td");
			td3.textContent = "Run angle";
			t14 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			add_location(th, file$d, 7, 12, 116);
			add_location(tr0, file$d, 6, 8, 99);
			add_location(thead, file$d, 5, 4, 83);
			add_location(td0, file$d, 15, 12, 319);
			add_location(tr1, file$d, 14, 8, 302);
			add_location(td1, file$d, 21, 12, 507);
			add_location(tr2, file$d, 20, 8, 490);
			add_location(td2, file$d, 35, 12, 972);
			add_location(tr3, file$d, 34, 8, 955);
			add_location(td3, file$d, 41, 12, 1149);
			add_location(tr4, file$d, 40, 8, 1132);
			add_location(tbody, file$d, 13, 4, 286);
			attr_dev(table, "class", "table table-sm polar-table");
			add_location(table, file$d, 4, 0, 36);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, table, anchor);
			append_dev(table, thead);
			append_dev(thead, tr0);
			append_dev(tr0, th);
			append_dev(tr0, t1);

			for (let i = 0; i < each_blocks_5.length; i += 1) {
				each_blocks_5[i].m(tr0, null);
			}

			append_dev(table, t2);
			append_dev(table, tbody);
			append_dev(tbody, tr1);
			append_dev(tr1, td0);
			append_dev(tr1, t4);

			for (let i = 0; i < each_blocks_4.length; i += 1) {
				each_blocks_4[i].m(tr1, null);
			}

			append_dev(tbody, t5);
			append_dev(tbody, tr2);
			append_dev(tr2, td1);
			append_dev(tr2, t7);

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].m(tr2, null);
			}

			append_dev(tbody, t8);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(tbody, null);
			}

			append_dev(tbody, t9);
			append_dev(tbody, tr3);
			append_dev(tr3, td2);
			append_dev(tr3, t11);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(tr3, null);
			}

			append_dev(tbody, t12);
			append_dev(tbody, tr4);
			append_dev(tr4, td3);
			append_dev(tr4, t14);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr4, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*vpp*/ 1) {
				each_value_6 = /*vpp*/ ctx[0].speeds;
				validate_each_argument(each_value_6);
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6(ctx, each_value_6, i);

					if (each_blocks_5[i]) {
						each_blocks_5[i].p(child_ctx, dirty);
					} else {
						each_blocks_5[i] = create_each_block_6(child_ctx);
						each_blocks_5[i].c();
						each_blocks_5[i].m(tr0, null);
					}
				}

				for (; i < each_blocks_5.length; i += 1) {
					each_blocks_5[i].d(1);
				}

				each_blocks_5.length = each_value_6.length;
			}

			if (dirty & /*vpp*/ 1) {
				each_value_5 = /*vpp*/ ctx[0].beat_angle;
				validate_each_argument(each_value_5);
				let i;

				for (i = 0; i < each_value_5.length; i += 1) {
					const child_ctx = get_each_context_5(ctx, each_value_5, i);

					if (each_blocks_4[i]) {
						each_blocks_4[i].p(child_ctx, dirty);
					} else {
						each_blocks_4[i] = create_each_block_5(child_ctx);
						each_blocks_4[i].c();
						each_blocks_4[i].m(tr1, null);
					}
				}

				for (; i < each_blocks_4.length; i += 1) {
					each_blocks_4[i].d(1);
				}

				each_blocks_4.length = each_value_5.length;
			}

			if (dirty & /*vpp*/ 1) {
				each_value_4 = /*vpp*/ ctx[0].beat_vmg;
				validate_each_argument(each_value_4);
				let i;

				for (i = 0; i < each_value_4.length; i += 1) {
					const child_ctx = get_each_context_4(ctx, each_value_4, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_4(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(tr2, null);
					}
				}

				for (; i < each_blocks_3.length; i += 1) {
					each_blocks_3[i].d(1);
				}

				each_blocks_3.length = each_value_4.length;
			}

			if (dirty & /*vpp*/ 1) {
				each_value_2 = /*vpp*/ ctx[0].angles;
				validate_each_argument(each_value_2);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_2(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(tbody, t9);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_2.length;
			}

			if (dirty & /*vpp*/ 1) {
				each_value_1 = /*vpp*/ ctx[0].run_vmg;
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr3, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*vpp*/ 1) {
				each_value = /*vpp*/ ctx[0].run_angle;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$7(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$7(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr4, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(table);
			destroy_each(each_blocks_5, detaching);
			destroy_each(each_blocks_4, detaching);
			destroy_each(each_blocks_3, detaching);
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('PolarTable', slots, []);
	let { vpp } = $$props;
	const writable_props = ['vpp'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PolarTable> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('vpp' in $$props) $$invalidate(0, vpp = $$props.vpp);
	};

	$$self.$capture_state = () => ({ vpp });

	$$self.$inject_state = $$props => {
		if ('vpp' in $$props) $$invalidate(0, vpp = $$props.vpp);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [vpp];
}

class PolarTable extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, { vpp: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "PolarTable",
			options,
			id: create_fragment$f.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*vpp*/ ctx[0] === undefined && !('vpp' in props)) {
			console.warn("<PolarTable> was created without expected prop 'vpp'");
		}
	}

	get vpp() {
		throw new Error("<PolarTable>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set vpp(value) {
		throw new Error("<PolarTable>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const CSV_PREAMBLE = 'twa/tws';
const CSV_SEPARATOR = ';';

function polarImport(str) {
    str = str.trim();

    if (str.indexOf(CSV_PREAMBLE) !== 0) {
        throw 'CSV should start with ' + CSV_PREAMBLE;
    }

    // split by lines, filter empty lines and comments (starting with #)
    var rows = str.split(/\r?\n/).filter((s) => s.length > 0 && s[0] != '#');

    var polar = {
        speeds: rows[0].split(CSV_SEPARATOR).slice(1).map(int),
        angles: [],
    };

    rows.slice(1).forEach(function (row) {
        var items = row.split(CSV_SEPARATOR);
        var twa = float(items[0]);

        polar.angles.push(twa);
        polar[twa] = items.slice(1).map(float);
    });

    return polar;
}

function polarExport(data, extended) {
    var vpp = 'vpp' in data ? data.vpp : data;

    var ret = [[CSV_PREAMBLE, ...vpp.speeds], zeros(vpp.speeds.length + 1)];

    if (extended) {
        vpp.beat_angle.forEach(function (beat_angle, i) {
            var beat = [beat_angle, ...zeros(vpp.speeds.length)];
            beat[i + 1] = round(vmg2sog(beat_angle, vpp.beat_vmg[i]), 2);
            ret.push(beat);
        });
    }

    vpp.angles.forEach(function (angle) {
        ret.push([angle].concat(vpp[angle]));
    });

    if (extended) {
        vpp.run_angle.forEach(function (run_angle, i) {
            var run = [run_angle, ...zeros(vpp.speeds.length)];
            run[i + 1] = round(vmg2sog(run_angle, -vpp.run_vmg[i]), 2);
            ret.push(run);
        });
    }

    return ret.map((row) => row.join(CSV_SEPARATOR)).join('\n');
}

let _index;
async function indexLoader() {
    if (!_index) {
        _index = await fetch('index.json')
            .then((response) => response.json())
            .then((items) =>
                items.map(([sailnumber, name, type]) => ({
                    sailnumber,
                    name,
                    type,
                }))
            );
    }
    return _index;
}

async function getRandomBoat() {
    const index = await indexLoader();
    return getRandomElement(index)[0];
}

let _boats = {};

function getBoat(sailnumber) {
    if (sailnumber in _boats) {
        return new Promise((resolve) => resolve(_boats[sailnumber]));
    } else {
        return fetch(`data/${sailnumber}.json`).then((response) => {
            _boats[sailnumber] = response.json();
            return _boats[sailnumber];
        });
    }
}

function getExtremes() {
    return fetch('extremes.json').then((response) => response.json());
}

/* site/src/components/Boat.svelte generated by Svelte v3.49.0 */
const file$c = "site/src/components/Boat.svelte";

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i][0];
	child_ctx[10] = list[i][1];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i][0];
	child_ctx[10] = list[i][1];
	return child_ctx;
}

// (41:0) {#if boat}
function create_if_block$7(ctx) {
	let div2;
	let div0;
	let polarplot;
	let t0;
	let div1;
	let h1;
	let t1;
	let table;
	let tr0;
	let th0;
	let th1;
	let th2;
	let t5;
	let tr1;
	let td0;
	let t6_value = /*boat*/ ctx[0].sailnumber + "";
	let t6;
	let td1;
	let t7_value = /*boat*/ ctx[0].boat.type + "";
	let t7;
	let td2;
	let t8_value = /*boat*/ ctx[0].boat.designer + "";
	let t8;
	let t9;
	let tr2;
	let th3;
	let th4;
	let th5;
	let th6;
	let t14;
	let tr3;
	let td3;
	let t15_value = /*sizes*/ ctx[2].loa + "";
	let t15;
	let t16;
	let t17;
	let td4;
	let t18_value = /*sizes*/ ctx[2].beam + "";
	let t18;
	let t19;
	let t20;
	let td5;
	let t21_value = /*sizes*/ ctx[2].draft + "";
	let t21;
	let t22;
	let t23;
	let td6;
	let t24_value = /*sizes*/ ctx[2].displacement + "";
	let t24;
	let t25;
	let t26;
	let tr4;
	let t27;
	let tr5;
	let t28;
	let tr6;
	let th7;
	let th8;
	let th9;
	let t32;
	let tr7;
	let td7;
	let t33_value = /*rating*/ ctx[3].gph + "";
	let t33;
	let td8;
	let t34_value = /*rating*/ ctx[3].osn + "";
	let t34;
	let td9;
	let t35_value = (/*boat*/ ctx[0].boat.stability_index || '?') + "";
	let t35;
	let t36;
	let tr8;
	let th10;
	let td10;
	let t38_value = /*rating*/ ctx[3].triple_inshore.join(' ') + "";
	let t38;
	let t39;
	let tr9;
	let th11;
	let td11;
	let t41_value = /*rating*/ ctx[3].triple_offshore.join(' ') + "";
	let t41;
	let t42;
	let polartable;
	let t43;
	let h5;
	let t44;
	let small;
	let label;
	let input;
	let t45;
	let t46;
	let textarea;
	let textarea_value_value;
	let current;
	let mounted;
	let dispose;

	polarplot = new PolarPlot({
			props: { boat: /*boat*/ ctx[0] },
			$$inline: true
		});

	function select_block_type(ctx, dirty) {
		if (/*boat*/ ctx[0].name) return create_if_block_1$4;
		return create_else_block$4;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);
	let each_value_1 = /*sails*/ ctx[4];
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	let each_value = /*sails*/ ctx[4];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	polartable = new PolarTable({
			props: { vpp: /*boat*/ ctx[0].vpp },
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			create_component(polarplot.$$.fragment);
			t0 = space();
			div1 = element("div");
			h1 = element("h1");
			if_block.c();
			t1 = space();
			table = element("table");
			tr0 = element("tr");
			th0 = element("th");
			th0.textContent = "Sail number";
			th1 = element("th");
			th1.textContent = "Type";
			th2 = element("th");
			th2.textContent = "Designer";
			t5 = space();
			tr1 = element("tr");
			td0 = element("td");
			t6 = text(t6_value);
			td1 = element("td");
			t7 = text(t7_value);
			td2 = element("td");
			t8 = text(t8_value);
			t9 = space();
			tr2 = element("tr");
			th3 = element("th");
			th3.textContent = "Length";
			th4 = element("th");
			th4.textContent = "Beam";
			th5 = element("th");
			th5.textContent = "Draft";
			th6 = element("th");
			th6.textContent = "Displacement";
			t14 = space();
			tr3 = element("tr");
			td3 = element("td");
			t15 = text(t15_value);
			t16 = text(" m");
			t17 = space();
			td4 = element("td");
			t18 = text(t18_value);
			t19 = text(" m");
			t20 = space();
			td5 = element("td");
			t21 = text(t21_value);
			t22 = text(" m");
			t23 = space();
			td6 = element("td");
			t24 = text(t24_value);
			t25 = text(" kg");
			t26 = space();
			tr4 = element("tr");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t27 = space();
			tr5 = element("tr");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t28 = space();
			tr6 = element("tr");
			th7 = element("th");
			th7.textContent = "GPH";
			th8 = element("th");
			th8.textContent = "OSH";
			th9 = element("th");
			th9.textContent = "Stability index";
			t32 = space();
			tr7 = element("tr");
			td7 = element("td");
			t33 = text(t33_value);
			td8 = element("td");
			t34 = text(t34_value);
			td9 = element("td");
			t35 = text(t35_value);
			t36 = space();
			tr8 = element("tr");
			th10 = element("th");
			th10.textContent = "Inshore TN";
			td10 = element("td");
			t38 = text(t38_value);
			t39 = space();
			tr9 = element("tr");
			th11 = element("th");
			th11.textContent = "Offshore TN";
			td11 = element("td");
			t41 = text(t41_value);
			t42 = space();
			create_component(polartable.$$.fragment);
			t43 = space();
			h5 = element("h5");
			t44 = text("Polar (CSV)\n                ");
			small = element("small");
			label = element("label");
			input = element("input");
			t45 = text("\n                        Extended CSV (including beat and run angles)");
			t46 = space();
			textarea = element("textarea");
			attr_dev(div0, "class", "col-sm");
			add_location(div0, file$c, 42, 8, 918);
			add_location(h1, file$c, 46, 12, 1028);
			attr_dev(th0, "class", "svelte-1on5qv8");
			add_location(th0, file$c, 55, 20, 1281);
			attr_dev(th1, "class", "svelte-1on5qv8");
			add_location(th1, file$c, 55, 40, 1301);
			attr_dev(th2, "class", "svelte-1on5qv8");
			add_location(th2, file$c, 55, 53, 1314);
			add_location(tr0, file$c, 55, 16, 1277);
			add_location(td0, file$c, 56, 20, 1357);
			add_location(td1, file$c, 56, 46, 1383);
			add_location(td2, file$c, 56, 71, 1408);
			add_location(tr1, file$c, 56, 16, 1353);
			attr_dev(th3, "class", "svelte-1on5qv8");
			add_location(th3, file$c, 57, 20, 1463);
			attr_dev(th4, "class", "svelte-1on5qv8");
			add_location(th4, file$c, 57, 35, 1478);
			attr_dev(th5, "class", "svelte-1on5qv8");
			add_location(th5, file$c, 57, 48, 1491);
			attr_dev(th6, "class", "svelte-1on5qv8");
			add_location(th6, file$c, 57, 62, 1505);
			add_location(tr2, file$c, 57, 16, 1459);
			add_location(td3, file$c, 59, 20, 1573);
			add_location(td4, file$c, 60, 20, 1616);
			add_location(td5, file$c, 61, 20, 1660);
			add_location(td6, file$c, 62, 20, 1705);
			add_location(tr3, file$c, 58, 16, 1548);
			add_location(tr4, file$c, 64, 16, 1776);
			add_location(tr5, file$c, 69, 16, 1937);
			attr_dev(th7, "class", "svelte-1on5qv8");
			add_location(th7, file$c, 75, 20, 2103);
			attr_dev(th8, "class", "svelte-1on5qv8");
			add_location(th8, file$c, 75, 32, 2115);
			attr_dev(th9, "class", "svelte-1on5qv8");
			add_location(th9, file$c, 75, 44, 2127);
			add_location(tr6, file$c, 75, 16, 2099);
			add_location(td7, file$c, 76, 20, 2177);
			add_location(td8, file$c, 76, 41, 2198);
			add_location(td9, file$c, 76, 62, 2219);
			add_location(tr7, file$c, 76, 16, 2173);
			attr_dev(th10, "class", "svelte-1on5qv8");
			add_location(th10, file$c, 78, 20, 2309);
			attr_dev(td10, "colspan", "3");
			add_location(td10, file$c, 78, 39, 2328);
			add_location(tr8, file$c, 77, 16, 2284);
			attr_dev(th11, "class", "svelte-1on5qv8");
			add_location(th11, file$c, 81, 20, 2446);
			attr_dev(td11, "colspan", "3");
			add_location(td11, file$c, 81, 40, 2466);
			add_location(tr9, file$c, 80, 16, 2421);
			attr_dev(table, "class", "table");
			add_location(table, file$c, 54, 12, 1239);
			attr_dev(input, "type", "checkbox");
			add_location(input, file$c, 89, 24, 2728);
			add_location(label, file$c, 88, 20, 2696);
			add_location(small, file$c, 87, 16, 2668);
			add_location(h5, file$c, 85, 12, 2619);
			textarea.value = textarea_value_value = "" + (polarExport(/*boat*/ ctx[0], /*extended*/ ctx[1]) + " ");
			toggle_class(textarea, "extended", /*extended*/ ctx[1]);
			add_location(textarea, file$c, 94, 12, 2931);
			attr_dev(div1, "class", "col-sm");
			add_location(div1, file$c, 45, 8, 995);
			attr_dev(div2, "class", "row p-2");
			add_location(div2, file$c, 41, 4, 888);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			mount_component(polarplot, div0, null);
			append_dev(div2, t0);
			append_dev(div2, div1);
			append_dev(div1, h1);
			if_block.m(h1, null);
			append_dev(div1, t1);
			append_dev(div1, table);
			append_dev(table, tr0);
			append_dev(tr0, th0);
			append_dev(tr0, th1);
			append_dev(tr0, th2);
			append_dev(table, t5);
			append_dev(table, tr1);
			append_dev(tr1, td0);
			append_dev(td0, t6);
			append_dev(tr1, td1);
			append_dev(td1, t7);
			append_dev(tr1, td2);
			append_dev(td2, t8);
			append_dev(table, t9);
			append_dev(table, tr2);
			append_dev(tr2, th3);
			append_dev(tr2, th4);
			append_dev(tr2, th5);
			append_dev(tr2, th6);
			append_dev(table, t14);
			append_dev(table, tr3);
			append_dev(tr3, td3);
			append_dev(td3, t15);
			append_dev(td3, t16);
			append_dev(tr3, t17);
			append_dev(tr3, td4);
			append_dev(td4, t18);
			append_dev(td4, t19);
			append_dev(tr3, t20);
			append_dev(tr3, td5);
			append_dev(td5, t21);
			append_dev(td5, t22);
			append_dev(tr3, t23);
			append_dev(tr3, td6);
			append_dev(td6, t24);
			append_dev(td6, t25);
			append_dev(table, t26);
			append_dev(table, tr4);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(tr4, null);
			}

			append_dev(table, t27);
			append_dev(table, tr5);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr5, null);
			}

			append_dev(table, t28);
			append_dev(table, tr6);
			append_dev(tr6, th7);
			append_dev(tr6, th8);
			append_dev(tr6, th9);
			append_dev(table, t32);
			append_dev(table, tr7);
			append_dev(tr7, td7);
			append_dev(td7, t33);
			append_dev(tr7, td8);
			append_dev(td8, t34);
			append_dev(tr7, td9);
			append_dev(td9, t35);
			append_dev(table, t36);
			append_dev(table, tr8);
			append_dev(tr8, th10);
			append_dev(tr8, td10);
			append_dev(td10, t38);
			append_dev(table, t39);
			append_dev(table, tr9);
			append_dev(tr9, th11);
			append_dev(tr9, td11);
			append_dev(td11, t41);
			append_dev(div1, t42);
			mount_component(polartable, div1, null);
			append_dev(div1, t43);
			append_dev(div1, h5);
			append_dev(h5, t44);
			append_dev(h5, small);
			append_dev(small, label);
			append_dev(label, input);
			input.checked = /*extended*/ ctx[1];
			append_dev(label, t45);
			append_dev(div1, t46);
			append_dev(div1, textarea);
			current = true;

			if (!mounted) {
				dispose = listen_dev(input, "change", /*input_change_handler*/ ctx[6]);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			const polarplot_changes = {};
			if (dirty & /*boat*/ 1) polarplot_changes.boat = /*boat*/ ctx[0];
			polarplot.$set(polarplot_changes);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(h1, null);
				}
			}

			if ((!current || dirty & /*boat*/ 1) && t6_value !== (t6_value = /*boat*/ ctx[0].sailnumber + "")) set_data_dev(t6, t6_value);
			if ((!current || dirty & /*boat*/ 1) && t7_value !== (t7_value = /*boat*/ ctx[0].boat.type + "")) set_data_dev(t7, t7_value);
			if ((!current || dirty & /*boat*/ 1) && t8_value !== (t8_value = /*boat*/ ctx[0].boat.designer + "")) set_data_dev(t8, t8_value);
			if ((!current || dirty & /*sizes*/ 4) && t15_value !== (t15_value = /*sizes*/ ctx[2].loa + "")) set_data_dev(t15, t15_value);
			if ((!current || dirty & /*sizes*/ 4) && t18_value !== (t18_value = /*sizes*/ ctx[2].beam + "")) set_data_dev(t18, t18_value);
			if ((!current || dirty & /*sizes*/ 4) && t21_value !== (t21_value = /*sizes*/ ctx[2].draft + "")) set_data_dev(t21, t21_value);
			if ((!current || dirty & /*sizes*/ 4) && t24_value !== (t24_value = /*sizes*/ ctx[2].displacement + "")) set_data_dev(t24, t24_value);

			if (dirty & /*sails*/ 16) {
				each_value_1 = /*sails*/ ctx[4];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr4, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*sails*/ 16) {
				each_value = /*sails*/ ctx[4];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr5, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if ((!current || dirty & /*rating*/ 8) && t33_value !== (t33_value = /*rating*/ ctx[3].gph + "")) set_data_dev(t33, t33_value);
			if ((!current || dirty & /*rating*/ 8) && t34_value !== (t34_value = /*rating*/ ctx[3].osn + "")) set_data_dev(t34, t34_value);
			if ((!current || dirty & /*boat*/ 1) && t35_value !== (t35_value = (/*boat*/ ctx[0].boat.stability_index || '?') + "")) set_data_dev(t35, t35_value);
			if ((!current || dirty & /*rating*/ 8) && t38_value !== (t38_value = /*rating*/ ctx[3].triple_inshore.join(' ') + "")) set_data_dev(t38, t38_value);
			if ((!current || dirty & /*rating*/ 8) && t41_value !== (t41_value = /*rating*/ ctx[3].triple_offshore.join(' ') + "")) set_data_dev(t41, t41_value);
			const polartable_changes = {};
			if (dirty & /*boat*/ 1) polartable_changes.vpp = /*boat*/ ctx[0].vpp;
			polartable.$set(polartable_changes);

			if (dirty & /*extended*/ 2) {
				input.checked = /*extended*/ ctx[1];
			}

			if (!current || dirty & /*boat, extended*/ 3 && textarea_value_value !== (textarea_value_value = "" + (polarExport(/*boat*/ ctx[0], /*extended*/ ctx[1]) + " "))) {
				prop_dev(textarea, "value", textarea_value_value);
			}

			if (dirty & /*extended*/ 2) {
				toggle_class(textarea, "extended", /*extended*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polarplot.$$.fragment, local);
			transition_in(polartable.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polarplot.$$.fragment, local);
			transition_out(polartable.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(polarplot);
			if_block.d();
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			destroy_component(polartable);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(41:0) {#if boat}",
		ctx
	});

	return block;
}

// (50:16) {:else}
function create_else_block$4(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			span.textContent = "Name unknown";
			attr_dev(span, "class", "text-muted");
			add_location(span, file$c, 50, 20, 1141);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		p: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$4.name,
		type: "else",
		source: "(50:16) {:else}",
		ctx
	});

	return block;
}

// (48:16) {#if boat.name}
function create_if_block_1$4(ctx) {
	let t_value = /*boat*/ ctx[0].name + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*boat*/ 1 && t_value !== (t_value = /*boat*/ ctx[0].name + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(48:16) {#if boat.name}",
		ctx
	});

	return block;
}

// (66:20) {#each sails as [name, sail]}
function create_each_block_1$1(ctx) {
	let th;
	let t_value = /*name*/ ctx[9] + "";
	let t;

	const block = {
		c: function create() {
			th = element("th");
			t = text(t_value);
			attr_dev(th, "class", "svelte-1on5qv8");
			add_location(th, file$c, 66, 24, 1855);
		},
		m: function mount(target, anchor) {
			insert_dev(target, th, anchor);
			append_dev(th, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*sails*/ 16 && t_value !== (t_value = /*name*/ ctx[9] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(th);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1$1.name,
		type: "each",
		source: "(66:20) {#each sails as [name, sail]}",
		ctx
	});

	return block;
}

// (71:20) {#each sails as [name, sail]}
function create_each_block$6(ctx) {
	let td;
	let t_value = /*sail*/ ctx[10] + "";
	let t;

	const block = {
		c: function create() {
			td = element("td");
			t = text(t_value);
			add_location(td, file$c, 71, 24, 2016);
		},
		m: function mount(target, anchor) {
			insert_dev(target, td, anchor);
			append_dev(td, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*sails*/ 16 && t_value !== (t_value = /*sail*/ ctx[10] + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(td);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$6.name,
		type: "each",
		source: "(71:20) {#each sails as [name, sail]}",
		ctx
	});

	return block;
}

function create_fragment$e(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*boat*/ ctx[0] && create_if_block$7(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty$1();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*boat*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*boat*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$7(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Boat', slots, []);
	let { sailnumber } = $$props;
	let boat;
	let extended = false;
	let sizes;
	let rating;
	let sails;

	async function loadBoat(sailnumber) {
		$$invalidate(0, boat = await getBoat(sailnumber));
		$$invalidate(2, sizes = boat.boat.sizes);
		$$invalidate(3, rating = boat.rating);
		$$invalidate(4, sails = getSails());
	}

	function getSails() {
		const sizes = boat.boat.sizes;
		const sails = [['Main', sizes.main + 'm²'], ['Genoa', sizes.genoa + 'm²']];

		if (sizes.spinnaker > 0) {
			sails.push(['Spinnaker', sizes.spinnaker + 'm²']);
		}

		if (sizes.spinnaker_asym > 0) {
			sails.push(['Asym. spinnaker', sizes.spinnaker_asym + 'm²']);
		}

		return sails;
	}

	const writable_props = ['sailnumber'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Boat> was created with unknown prop '${key}'`);
	});

	function input_change_handler() {
		extended = this.checked;
		$$invalidate(1, extended);
	}

	$$self.$$set = $$props => {
		if ('sailnumber' in $$props) $$invalidate(5, sailnumber = $$props.sailnumber);
	};

	$$self.$capture_state = () => ({
		PolarPlot,
		PolarTable,
		polarExport,
		getBoat,
		sailnumber,
		boat,
		extended,
		sizes,
		rating,
		sails,
		loadBoat,
		getSails
	});

	$$self.$inject_state = $$props => {
		if ('sailnumber' in $$props) $$invalidate(5, sailnumber = $$props.sailnumber);
		if ('boat' in $$props) $$invalidate(0, boat = $$props.boat);
		if ('extended' in $$props) $$invalidate(1, extended = $$props.extended);
		if ('sizes' in $$props) $$invalidate(2, sizes = $$props.sizes);
		if ('rating' in $$props) $$invalidate(3, rating = $$props.rating);
		if ('sails' in $$props) $$invalidate(4, sails = $$props.sails);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*sailnumber*/ 32) {
			sailnumber && loadBoat(sailnumber);
		}
	};

	return [boat, extended, sizes, rating, sails, sailnumber, input_change_handler];
}

class Boat extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, { sailnumber: 5 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Boat",
			options,
			id: create_fragment$e.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*sailnumber*/ ctx[5] === undefined && !('sailnumber' in props)) {
			console.warn("<Boat> was created without expected prop 'sailnumber'");
		}
	}

	get sailnumber() {
		throw new Error("<Boat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sailnumber(value) {
		throw new Error("<Boat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/**
 * sifter.js
 * Copyright (c) 2013–2020 Brian Reavis & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@thirdroute.com>
 */

/**
 * Textually searches arrays and hashes of objects
 * by property (or multiple properties). Designed
 * specifically for autocomplete.
 *
 * @constructor
 * @param {array|object} items
 * @param {object} items
 */
var Sifter = function(items, settings) {
    this.items = items;
    this.settings = settings || {diacritics: true};
};

/**
 * Splits a search string into an array of individual
 * regexps to be used to match results.
 *
 * @param {string} query
 * @returns {array}
 */
Sifter.prototype.tokenize = function(query, respect_word_boundaries) {
    query = trim(String(query || '').toLowerCase());
    if (!query || !query.length) return [];

    var i, n, regex, letter;
    var tokens = [];
    var words = query.split(/ +/);

    for (i = 0, n = words.length; i < n; i++) {
        regex = escape_regex(words[i]);
        if (this.settings.diacritics) {
            for (letter in DIACRITICS) {
                if (DIACRITICS.hasOwnProperty(letter)) {
                    regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
                }
            }
        }
        if (respect_word_boundaries) regex = "\\b"+regex;
        tokens.push({
            string : words[i],
            regex  : new RegExp(regex, 'i')
        });
    }

    return tokens;
};

/**
 * Iterates over arrays and hashes.
 *
 * ```
 * this.iterator(this.items, function(item, id) {
 *    // invoked for each item
 * });
 * ```
 *
 * @param {array|object} object
 */
Sifter.prototype.iterator = function(object, callback) {
    var iterator;
    if (Array.isArray(object)) {
        iterator = Array.prototype.forEach || function(callback) {
            for (var i = 0, n = this.length; i < n; i++) {
                callback(this[i], i, this);
            }
        };
    } else {
        iterator = function(callback) {
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    callback(this[key], key, this);
                }
            }
        };
    }

    iterator.apply(object, [callback]);
};

/**
 * Returns a function to be used to score individual results.
 *
 * Good matches will have a higher score than poor matches.
 * If an item is not a match, 0 will be returned by the function.
 *
 * @param {object|string} search
 * @param {object} options (optional)
 * @returns {function}
 */
Sifter.prototype.getScoreFunction = function(search, options) {
    var self, fields, tokens, token_count, nesting;

    self        = this;
    search      = self.prepareSearch(search, options);
    tokens      = search.tokens;
    fields      = search.options.fields;
    token_count = tokens.length;
    nesting     = search.options.nesting;

    /**
     * Calculates how close of a match the
     * given value is against a search token.
     *
     * @param {string | number} value
     * @param {object} token
     * @return {number}
     */
    var scoreValue = function(value, token) {
        var score, pos;

        if (!value) return 0;
        value = String(value || '');
        pos = value.search(token.regex);
        if (pos === -1) return 0;
        score = token.string.length / value.length;
        if (pos === 0) score += 0.5;
        return score;
    };

    /**
     * Calculates the score of an object
     * against the search query.
     *
     * @param {object} token
     * @param {object} data
     * @return {number}
     */
    var scoreObject = (function() {
        var field_count = fields.length;
        if (!field_count) {
            return function() { return 0; };
        }
        if (field_count === 1) {
            return function(token, data) {
                return scoreValue(getattr(data, fields[0], nesting), token);
            };
        }
        return function(token, data) {
            for (var i = 0, sum = 0; i < field_count; i++) {
                sum += scoreValue(getattr(data, fields[i], nesting), token);
            }
            return sum / field_count;
        };
    })();

    if (!token_count) {
        return function() { return 0; };
    }
    if (token_count === 1) {
        return function(data) {
            return scoreObject(tokens[0], data);
        };
    }

    if (search.options.conjunction === 'and') {
        return function(data) {
            var score;
            for (var i = 0, sum = 0; i < token_count; i++) {
                score = scoreObject(tokens[i], data);
                if (score <= 0) return 0;
                sum += score;
            }
            return sum / token_count;
        };
    } else {
        return function(data) {
            for (var i = 0, sum = 0; i < token_count; i++) {
                sum += scoreObject(tokens[i], data);
            }
            return sum / token_count;
        };
    }
};

/**
 * Returns a function that can be used to compare two
 * results, for sorting purposes. If no sorting should
 * be performed, `null` will be returned.
 *
 * @param {string|object} search
 * @param {object} options
 * @return function(a,b)
 */
Sifter.prototype.getSortFunction = function(search, options) {
    var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

    self   = this;
    search = self.prepareSearch(search, options);
    sort   = (!search.query && options.sort_empty) || options.sort;

    /**
     * Fetches the specified sort field value
     * from a search result item.
     *
     * @param  {string} name
     * @param  {object} result
     */
    get_field = function(name, result) {
        if (name === '$score') return result.score;
        return getattr(self.items[result.id], name, options.nesting);
    };

    // parse options
    fields = [];
    if (sort) {
        for (i = 0, n = sort.length; i < n; i++) {
            if (search.query || sort[i].field !== '$score') {
                fields.push(sort[i]);
            }
        }
    }

    // the "$score" field is implied to be the primary
    // sort field, unless it's manually specified
    if (search.query) {
        implicit_score = true;
        for (i = 0, n = fields.length; i < n; i++) {
            if (fields[i].field === '$score') {
                implicit_score = false;
                break;
            }
        }
        if (implicit_score) {
            fields.unshift({field: '$score', direction: 'desc'});
        }
    } else {
        for (i = 0, n = fields.length; i < n; i++) {
            if (fields[i].field === '$score') {
                fields.splice(i, 1);
                break;
            }
        }
    }

    multipliers = [];
    for (i = 0, n = fields.length; i < n; i++) {
        multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
    }

    // build function
    fields_count = fields.length;
    if (!fields_count) {
        return null;
    } else if (fields_count === 1) {
        field = fields[0].field;
        multiplier = multipliers[0];
        return function(a, b) {
            return multiplier * cmp(
                get_field(field, a),
                get_field(field, b)
            );
        };
    } else {
        return function(a, b) {
            var i, result, field;
            for (i = 0; i < fields_count; i++) {
                field = fields[i].field;
                result = multipliers[i] * cmp(
                    get_field(field, a),
                    get_field(field, b)
                );
                if (result) return result;
            }
            return 0;
        };
    }
};

/**
 * Parses a search query and returns an object
 * with tokens and fields ready to be populated
 * with results.
 *
 * @param {string} query
 * @param {object} options
 * @returns {object}
 */
Sifter.prototype.prepareSearch = function(query, options) {
    if (typeof query === 'object') return query;

    options = extend({}, options);

    var option_fields     = options.fields;
    var option_sort       = options.sort;
    var option_sort_empty = options.sort_empty;

    if (option_fields && !Array.isArray(option_fields)) options.fields = [option_fields];
    if (option_sort && !Array.isArray(option_sort)) options.sort = [option_sort];
    if (option_sort_empty && !Array.isArray(option_sort_empty)) options.sort_empty = [option_sort_empty];

    return {
        options : options,
        query   : String(query || '').toLowerCase(),
        tokens  : this.tokenize(query, options.respect_word_boundaries),
        total   : 0,
        items   : []
    };
};

/**
 * Searches through all items and returns a sorted array of matches.
 *
 * The `options` parameter can contain:
 *
 *   - fields {string|array}
 *   - sort {array}
 *   - score {function}
 *   - filter {bool}
 *   - limit {integer}
 *
 * Returns an object containing:
 *
 *   - options {object}
 *   - query {string}
 *   - tokens {array}
 *   - total {int}
 *   - items {array}
 *
 * @param {string} query
 * @param {object} options
 * @returns {object}
 */
Sifter.prototype.search = function(query, options) {
    var self = this, score, search;
    var fn_sort;
    var fn_score;

    search  = this.prepareSearch(query, options);
    options = search.options;
    query   = search.query;

    // generate result scoring function
    fn_score = options.score || self.getScoreFunction(search);

    // perform search and sort
    if (query.length) {
        self.iterator(self.items, function(item, id) {
            score = fn_score(item);
            if (options.filter === false || score > 0) {
                search.items.push({'score': score, 'id': id});
            }
        });
    } else {
        self.iterator(self.items, function(item, id) {
            search.items.push({'score': 1, 'id': id});
        });
    }

    fn_sort = self.getSortFunction(search, options);
    if (fn_sort) search.items.sort(fn_sort);

    // apply limits
    search.total = search.items.length;
    if (typeof options.limit === 'number') {
        search.items = search.items.slice(0, options.limit);
    }

    return search;
};

// utilities
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var cmp = function(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a > b ? 1 : (a < b ? -1 : 0);
    }
    a = asciifold(String(a || ''));
    b = asciifold(String(b || ''));
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
};

var extend = function(a, b) {
    var i, n, k, object;
    for (i = 1, n = arguments.length; i < n; i++) {
        object = arguments[i];
        if (!object) continue;
        for (k in object) {
            if (object.hasOwnProperty(k)) {
                a[k] = object[k];
            }
        }
    }
    return a;
};

/**
 * A property getter resolving dot-notation
 * @param  {Object}  obj     The root object to fetch property on
 * @param  {String}  name    The optionally dotted property name to fetch
 * @param  {Boolean} nesting Handle nesting or not
 * @return {Object}          The resolved property value
 */
var getattr = function(obj, name, nesting) {
    if (!obj || !name) return;
    if (!nesting) return obj[name];
    var names = name.split(".");
    while(names.length && (obj = obj[names.shift()]));
    return obj;
};

var trim = function(str) {
    return (str + '').replace(/^\s+|\s+$|/g, '');
};

var escape_regex = function(str) {
    return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
};

var DIACRITICS = {
    'a': '[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]',
    'b': '[b␢βΒB฿𐌁ᛒ]',
    'c': '[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]',
    'd': '[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]',
    'e': '[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]',
    'f': '[fƑƒḞḟ]',
    'g': '[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]',
    'h': '[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]',
    'i': '[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]',
    'j': '[jȷĴĵɈɉʝɟʲ]',
    'k': '[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]',
    'l': '[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]',
    'n': '[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]',
    'o': '[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]',
    'p': '[pṔṕṖṗⱣᵽƤƥᵱ]',
    'q': '[qꝖꝗʠɊɋꝘꝙq̃]',
    'r': '[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]',
    's': '[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]',
    't': '[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]',
    'u': '[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]',
    'v': '[vṼṽṾṿƲʋꝞꝟⱱʋ]',
    'w': '[wẂẃẀẁŴŵẄẅẆẇẈẉ]',
    'x': '[xẌẍẊẋχ]',
    'y': '[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]',
    'z': '[zŹźẐẑŽžŻżẒẓẔẕƵƶ]'
};

const asciifold = (function() {
    var i, n, k, chunk;
    var foreignletters = '';
    var lookup = {};
    for (k in DIACRITICS) {
        if (DIACRITICS.hasOwnProperty(k)) {
            chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
            foreignletters += chunk;
            for (i = 0, n = chunk.length; i < n; i++) {
                lookup[chunk.charAt(i)] = k;
            }
        }
    }
    var regexp = new RegExp('[' +  foreignletters + ']', 'g');
    return function(str) {
        return str.replace(regexp, function(foreignletter) {
            return lookup[foreignletter];
        }).toLowerCase();
    };
})();

// source: https://github.com/rob-balfre/svelte-select/blob/master/src/utils/isOutOfViewport.js
function isOutOfViewport(elem) {
  if (!elem) return false;
  const parentBounding = elem
    .parentElement  // dropdown container
    .parentElement  // component container
      .getBoundingClientRect();
  const bounding = elem.getBoundingClientRect();
  const out = {};

  out.top = parentBounding.top < 0;
  out.left = parentBounding.left < 0;
  out.bottom = parentBounding.bottom + bounding.height > (window.innerHeight || document.documentElement.clientHeight); 
  out.right = parentBounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;

  return out;
}
let xhr = null;

function fetchRemote(url) {
  return function(query, cb) {
    return new Promise((resolve, reject) => {
      xhr = new XMLHttpRequest();
      xhr.open('GET', `${url.replace('[query]', encodeURIComponent(query))}`);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            try {
              const resp = JSON.parse(this.response);
              resolve(cb ? cb(resp) : (resp.data || resp.items || resp.options || resp));
            } catch (e) {
              console.warn('[Svelecte]:Fetch - error handling fetch response', e);
              reject();
            }
          } else {
            reject();
          }
        } 
      };
    });
  }
}

function debounce(fn, delay) {
  let timeout;
	return function() {
		const self = this;
		const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
      fn.apply(self, args);
		}, delay);
	};
}
let itemHtml;

function highlightSearch(item, isSelected, $inputValue, formatter, disableHighlight) {
  const itemHtmlText = formatter ? formatter(item, isSelected, $inputValue) : item;
  
  if ($inputValue == '' || item.isSelected || disableHighlight) {
    return '<div class="sv-item-content">' + itemHtmlText + '</div>';
  }

  if (!itemHtml) {
    itemHtml = document.createElement('div');
    itemHtml.className = 'sv-item-content';
  }
  itemHtml.innerHTML = itemHtmlText;

  // const regex = new RegExp(`(${asciifold($inputValue)})`, 'ig');
  const pattern = asciifold($inputValue);
  pattern.split(' ').filter(e => e).forEach(pat => {
    highlight(itemHtml, pat);
  });
  
  return itemHtml.outerHTML;
}

/**
 * highlight function code from selectize itself. We pass raw html through @html svelte tag
 * base from https://github.com/selectize/selectize.js/blob/master/src/contrib/highlight.js & edited
 */
const highlight = function(node, regex) {
  let skip = 0;
  // Wrap matching part of text node with highlighting <span>, e.g.
  // Soccer  ->  <span class="highlight">Soc</span>cer for pattern 'soc'
  if (node.nodeType === 3) {
    const folded = asciifold(node.data);
    let pos = folded.indexOf(regex);
    pos -= (folded.substr(0, pos).toUpperCase().length - folded.substr(0, pos).length);
    if (pos >= 0 ) {
      const spannode = document.createElement('span');
      spannode.className = 'highlight';
      const middlebit = node.splitText(pos);
      middlebit.splitText(regex.length);
      const middleclone = middlebit.cloneNode(true);
      spannode.appendChild(middleclone);
      middlebit.parentNode.replaceChild(spannode, middlebit);
      skip = 1;
    }
  } 
  // Recurse element node, looking for child text nodes to highlight, unless element 
  // is childless, <script>, <style>, or already highlighted: <span class="hightlight">
  else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && ( node.className !== 'highlight' || node.tagName !== 'SPAN' )) {
    for (var i = 0; i < node.childNodes.length; ++i) {
      i += highlight(node.childNodes[i], regex);
    }
  }
  return skip;
};

/**
 * Automatic setter for 'valueField' or 'labelField' when they are not set
 */
function fieldInit(type, options, config) {
  const isValue = type === 'value';
  if (config.isOptionArray) return isValue ? 'value' : 'label';
  let val = isValue  ? 'value' : 'text';              // selectize style defaults
  if (options && options.length) {
    const firstItem = options[0][config.optItems] ? options[0][config.optItems][0] : options[0];
    if (!firstItem) return val;
    const autoAddItem = isValue ? 0 : 1;
    const guessList = isValue
      ? ['id', 'value', 'ID']
      : ['name', 'title', 'label'];
    val = Object.keys(firstItem).filter(prop => guessList.includes(prop))
      .concat([Object.keys(firstItem)[autoAddItem]])  // auto add field (used as fallback)
      .shift();  
  }
  return val;
}

/**
 * Detect Mac device
 * 
 * @returns {bool}
 */
function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

/**
 * Formatter of newly created items. When `''` is returned, it means new option cannot be created.
 * 
 * @param {string} val 
 * @param {array} options 
 * @returns {string}
 */
function defaultCreateFilter(val, options) {  
  return (val || '').replaceAll('\t', ' ').trim().split(' ').filter(ch => ch).join(' ');
}

/**
 * Default create function
 * 
 * @param {string} inputValue 
 * @param {string} creatablePrefix 
 * @returns {object} newly created option
 */
function defaultCreateTransform(inputValue, creatablePrefix, valueField, labelField) {
  return {
    [valueField]: inputValue,
    [labelField]: creatablePrefix + inputValue,
  }
}

const settings = {
  // html
  disabled: false,
  // basic
  valueField: null,
  labelField: null,
  groupLabelField: 'label',
  groupItemsField: 'options',
  disabledField: '$disabled',
  placeholder: 'Select',
  valueAsObject: false,
  // ui
  searchable: true,
  clearable: false,
  selectOnTab: false,
  resetOnBlur: true,
  resetOnSelect: true,
  fetchResetOnBlur: true,
  // multi
  multiple: false,
  max: 0,
  collapseSelection: false, // enable collapsible multiple selection
  // create
  creatable: false,
  creatablePrefix: '*',
  keepCreated: true,
  allowEditing: false,
  delimiter: ',',
  // remote
  fetchCallback: null,
  minQuery: 1,
  // performance
  lazyDropdown: true,
  // virtual list
  virtualList: false,
  vlItemSize: null,
  vlHeight: null,
  // i18n
  i18n: {
    empty: 'No options',
    nomatch: 'No matching options',    
    max: num => `Maximum items ${num} selected`,
    fetchBefore: 'Type to start searching',
    fetchQuery: (minQuery, inputLength) => `Type ${minQuery > 1 && minQuery > inputLength 
      ? `at least ${minQuery - inputLength} characters `
      : '' }to start searching`,
    fetchInit: 'Fetching data, please wait...',
    fetchEmpty: 'No data related to your search',
    collapsedSelection: count => `${count} selected`,
    createRowLabel: value => `Create '${value}'`
  },
  collapseSelectionFn: function(selectionCount, selection) {
    return settings.i18n.collapsedSelection(selectionCount);
  }
};

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop$2) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop$2) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop$2;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

function initSelection(initialValue, valueAsObject, config) {
  if (valueAsObject) return Array.isArray(initialValue) ? initialValue : [initialValue];

  const _initialValue = Array.isArray(initialValue) ? initialValue : [initialValue];
  const valueField = config.labelAsValue ? config.labelField : config.valueField;

  const initialSelection = this/** options */.reduce((res, val, i) => {
    if (val.options) {  // handle groups
      const selected = val.options.reduce((res, groupVal) => {
        if (_initialValue.includes(groupVal[valueField])) res.push(groupVal);
        return res;
      }, []);
      if (selected.length) {
        res.push(...selected);
        return res;
      }
    }
    if (_initialValue.includes(typeof val === 'object' ? val[valueField] : (config.labelAsValue ? val : i))) {
      if (config.isOptionArray) {
        // initial options are not transformed, therefore we need to create object from given option
        val = {
          [config.valueField]: i,
          [config.labelField]: val
        };
      }
      res.push(val);
    }    return res;
  }, []);

  return initialSelection
    .sort((a, b) => _initialValue.indexOf(a[valueField]) < _initialValue.indexOf(b[valueField]) ? -1 : 1)
}

function flatList(options, config) {
  const flatOpts = options.reduce((res, opt, i) => {
    if (config.isOptionArray) {
      res.push({
        [config.valueField]: i,
        [config.labelField]: opt
      });
      return res;
    }
    if (opt[config.optItems] && opt[config.optItems].length) {
      config.optionsWithGroups = true;
      res.push({ label: opt[config.optLabel], $isGroupHeader: true });
      res.push(...opt[config.optItems].map(_opt => {
        _opt.$isGroupItem = true;
        return _opt;
      }));
      return res;
    }
    res.push(opt);
    return res;
  }, []);
  updateOptionProps(flatOpts, config);
  return flatOpts;
}

function updateOptionProps(options, config) {
  if (config.isOptionArray) {
    if (!config.optionProps) {
      config.optionProps = ['value', 'label'];
    }
  }
  options.some(opt => {
    if (opt.$isGroupHeader) return false;
    config.optionProps = getFilterProps(opt);
    return true;
  });
}

function getFilterProps(object) {
  if (object.options) object = object.options[0];
  const exclude = ['$disabled', '$isGroupHeader', '$isGroupItem'];
  return Object.keys(object).filter(prop => !exclude.includes(prop));
}

function filterList(options, inputValue, excludeSelected, sifterSearchField, sifterSortField, config) {
  if (excludeSelected) {
    options = options
      .filter(opt => !excludeSelected.has(opt[config.valueField]))
      .filter((opt, idx, self) => {
        if (opt.$isGroupHeader &&
          (
            (self[idx + 1] && self[idx + 1].$isGroupHeader) 
          || self.length <= 1
          || self.length - 1 === idx
          )
        ) return false;
        return true;
      });
  }
  if (!inputValue) return options;

  const sifter = new Sifter(options);
  /**
   * Sifter is used for searching to provide rich filter functionality.
   * But it degradate nicely, when optgroups are present
  */
  if (config.optionsWithGroups) {  // disable sorting 
    sifter.getSortFunction = () => null;
  }
  let conjunction = 'and';
  if (inputValue.startsWith('|| ')) {
    conjunction = 'or';
    inputValue = inputValue.substr(2);
  }

  const result = sifter.search(inputValue, {
    fields: sifterSearchField || config.optionProps,
    sort: createSifterSortField(sifterSortField || config.labelField),
    conjunction: conjunction
  });

  const mapped = config.optionsWithGroups
    ? result.items.reduce((res, item) => {
        const opt = options[item.id];
        if (excludeSelected && opt.isSelected) return res;
        const lastPos = res.push(opt);
        if (opt.$isGroupItem) {
          const prevItems = options.slice(0, item.id);
          let prev = null;
          do {
            prev = prevItems.pop();
            prev && prev.$isGroupHeader && !res.includes(prev) && res.splice(lastPos - 1, 0, prev);
          } while (prev && !prev.$isGroupHeader);
        }
        return res;
      }, [])
    : result.items.map(item => options[item.id]);
  return mapped;
}

function createSifterSortField(prop) {
  return [{ field: prop, direction: 'asc'}];
}

function indexList(options, includeCreateRow, config)  {
  const map = config.optionsWithGroups
    ? options.reduce((res, opt, index) => {
      res.push(opt.$isGroupHeader ? '' : index);
      return res;
    }, [])
    : Object.keys(options);

  return {
    map: map,
    first:  map[0] !== '' ? 0 : 1,
    last: map.length ? map.length - (includeCreateRow ? 0 : 1) : 0,
    hasCreateRow: !!includeCreateRow,
    next(curr, prevOnUndefined) {
      const val = this.map[++curr];
      if (this.hasCreateRow && curr === this.last) return this.last;
      if (val === '') return this.next(curr);
      if (val === undefined) {
        if (!this.map.length) return 0;   // ref #26
        if (curr > this.map.length) curr = this.first - 1;
        return prevOnUndefined === true ? this.prev(curr) : this.next(curr);
      }
      return val;
    },
    prev(curr) {
      const val = this.map[--curr];
      if (this.hasCreateRow && curr === this.first) return this.first;
      if (val === '') return this.prev(curr);
      if (!val) return this.last;
      return val;
    }
  };
}

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

function flip(node, { from, to }, params = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const [ox, oy] = style.transformOrigin.split(' ').map(parseFloat);
    const dx = (from.left + from.width * ox / to.width) - (to.left + ox);
    const dy = (from.top + from.height * oy / to.height) - (to.top + oy);
    const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
    return {
        delay,
        duration: is_function(duration) ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
        easing,
        css: (t, u) => {
            const x = u * dx;
            const y = u * dy;
            const sx = t + u * from.width / to.width;
            const sy = t + u * from.height / to.height;
            return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
        }
    };
}

/* node_modules/svelecte/src/components/Input.svelte generated by Svelte v3.49.0 */
const file$b = "node_modules/svelecte/src/components/Input.svelte";

function create_fragment$d(ctx) {
	let input;
	let input_readonly_value;
	let t0;
	let div;
	let t1;
	let div_resize_listener;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			input = element("input");
			t0 = space();
			div = element("div");
			t1 = text(/*shadowText*/ ctx[10]);
			attr_dev(input, "type", "text");
			attr_dev(input, "class", "inputBox svelte-x1t6fd");
			input.disabled = /*disabled*/ ctx[2];
			input.readOnly = input_readonly_value = !/*searchable*/ ctx[1];
			attr_dev(input, "id", /*inputId*/ ctx[0]);
			attr_dev(input, "style", /*inputStyle*/ ctx[9]);
			attr_dev(input, "placeholder", /*placeholderText*/ ctx[6]);
			add_location(input, file$b, 43, 0, 1294);
			attr_dev(div, "class", "shadow-text svelte-x1t6fd");
			add_render_callback(() => /*div_elementresize_handler*/ ctx[25].call(div));
			add_location(div, file$b, 57, 0, 1617);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, input, anchor);
			/*input_binding*/ ctx[23](input);
			set_input_value(input, /*$inputValue*/ ctx[7]);
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);
			append_dev(div, t1);
			div_resize_listener = add_resize_listener(div, /*div_elementresize_handler*/ ctx[25].bind(div));

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*input_input_handler*/ ctx[24]),
					listen_dev(input, "focus", /*focus_handler*/ ctx[19], false, false, false),
					listen_dev(input, "blur", /*blur_handler*/ ctx[20], false, false, false),
					listen_dev(input, "keydown", /*onKeyDown*/ ctx[11], false, false, false),
					listen_dev(input, "keyup", /*onKeyUp*/ ctx[12], false, false, false),
					listen_dev(input, "paste", /*paste_handler*/ ctx[21], false, false, false),
					listen_dev(input, "change", stop_propagation(/*change_handler*/ ctx[22]), false, false, true)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*disabled*/ 4) {
				prop_dev(input, "disabled", /*disabled*/ ctx[2]);
			}

			if (dirty & /*searchable*/ 2 && input_readonly_value !== (input_readonly_value = !/*searchable*/ ctx[1])) {
				prop_dev(input, "readOnly", input_readonly_value);
			}

			if (dirty & /*inputId*/ 1) {
				attr_dev(input, "id", /*inputId*/ ctx[0]);
			}

			if (dirty & /*inputStyle*/ 512) {
				attr_dev(input, "style", /*inputStyle*/ ctx[9]);
			}

			if (dirty & /*placeholderText*/ 64) {
				attr_dev(input, "placeholder", /*placeholderText*/ ctx[6]);
			}

			if (dirty & /*$inputValue*/ 128 && input.value !== /*$inputValue*/ ctx[7]) {
				set_input_value(input, /*$inputValue*/ ctx[7]);
			}

			if (dirty & /*shadowText*/ 1024) set_data_dev(t1, /*shadowText*/ ctx[10]);
		},
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(input);
			/*input_binding*/ ctx[23](null);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			div_resize_listener();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	let isSingleFilled;
	let placeholderText;
	let shadowText;
	let widthAddition;
	let inputStyle;

	let $hasDropdownOpened,
		$$unsubscribe_hasDropdownOpened = noop$2,
		$$subscribe_hasDropdownOpened = () => ($$unsubscribe_hasDropdownOpened(), $$unsubscribe_hasDropdownOpened = subscribe(hasDropdownOpened, $$value => $$invalidate(27, $hasDropdownOpened = $$value)), hasDropdownOpened);

	let $inputValue,
		$$unsubscribe_inputValue = noop$2,
		$$subscribe_inputValue = () => ($$unsubscribe_inputValue(), $$unsubscribe_inputValue = subscribe(inputValue, $$value => $$invalidate(7, $inputValue = $$value)), inputValue);

	$$self.$$.on_destroy.push(() => $$unsubscribe_hasDropdownOpened());
	$$self.$$.on_destroy.push(() => $$unsubscribe_inputValue());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Input', slots, []);
	const focus = () => inputRef.focus();
	let { inputId } = $$props;
	let { placeholder } = $$props;
	let { searchable } = $$props;
	let { disabled } = $$props;
	let { multiple } = $$props;
	let { inputValue } = $$props;
	validate_store(inputValue, 'inputValue');
	$$subscribe_inputValue();
	let { hasDropdownOpened } = $$props;
	validate_store(hasDropdownOpened, 'hasDropdownOpened');
	$$subscribe_hasDropdownOpened();
	let { selectedOptions } = $$props;
	let inputRef = null;
	let shadowWidth = 0;
	const dispatch = createEventDispatcher();
	let disableEventBubble = false;

	function onKeyDown(e) {
		disableEventBubble = ['Enter', 'Escape'].includes(e.key) && $hasDropdownOpened;
		dispatch('keydown', e);
	}

	/** Stop event propagation on keyup, when dropdown is opened. Typically this will prevent form submit */
	function onKeyUp(e) {
		if (disableEventBubble) {
			e.stopImmediatePropagation();
			e.preventDefault();
		}

		disableEventBubble = false;
	}

	const writable_props = [
		'inputId',
		'placeholder',
		'searchable',
		'disabled',
		'multiple',
		'inputValue',
		'hasDropdownOpened',
		'selectedOptions'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Input> was created with unknown prop '${key}'`);
	});

	function focus_handler(event) {
		bubble.call(this, $$self, event);
	}

	function blur_handler(event) {
		bubble.call(this, $$self, event);
	}

	function paste_handler(event) {
		bubble.call(this, $$self, event);
	}

	function change_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			inputRef = $$value;
			$$invalidate(8, inputRef);
		});
	}

	function input_input_handler() {
		$inputValue = this.value;
		inputValue.set($inputValue);
	}

	function div_elementresize_handler() {
		shadowWidth = this.clientWidth;
		$$invalidate(5, shadowWidth);
	}

	$$self.$$set = $$props => {
		if ('inputId' in $$props) $$invalidate(0, inputId = $$props.inputId);
		if ('placeholder' in $$props) $$invalidate(14, placeholder = $$props.placeholder);
		if ('searchable' in $$props) $$invalidate(1, searchable = $$props.searchable);
		if ('disabled' in $$props) $$invalidate(2, disabled = $$props.disabled);
		if ('multiple' in $$props) $$invalidate(15, multiple = $$props.multiple);
		if ('inputValue' in $$props) $$subscribe_inputValue($$invalidate(3, inputValue = $$props.inputValue));
		if ('hasDropdownOpened' in $$props) $$subscribe_hasDropdownOpened($$invalidate(4, hasDropdownOpened = $$props.hasDropdownOpened));
		if ('selectedOptions' in $$props) $$invalidate(16, selectedOptions = $$props.selectedOptions);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		focus,
		inputId,
		placeholder,
		searchable,
		disabled,
		multiple,
		inputValue,
		hasDropdownOpened,
		selectedOptions,
		inputRef,
		shadowWidth,
		dispatch,
		disableEventBubble,
		onKeyDown,
		onKeyUp,
		widthAddition,
		isSingleFilled,
		inputStyle,
		placeholderText,
		shadowText,
		$hasDropdownOpened,
		$inputValue
	});

	$$self.$inject_state = $$props => {
		if ('inputId' in $$props) $$invalidate(0, inputId = $$props.inputId);
		if ('placeholder' in $$props) $$invalidate(14, placeholder = $$props.placeholder);
		if ('searchable' in $$props) $$invalidate(1, searchable = $$props.searchable);
		if ('disabled' in $$props) $$invalidate(2, disabled = $$props.disabled);
		if ('multiple' in $$props) $$invalidate(15, multiple = $$props.multiple);
		if ('inputValue' in $$props) $$subscribe_inputValue($$invalidate(3, inputValue = $$props.inputValue));
		if ('hasDropdownOpened' in $$props) $$subscribe_hasDropdownOpened($$invalidate(4, hasDropdownOpened = $$props.hasDropdownOpened));
		if ('selectedOptions' in $$props) $$invalidate(16, selectedOptions = $$props.selectedOptions);
		if ('inputRef' in $$props) $$invalidate(8, inputRef = $$props.inputRef);
		if ('shadowWidth' in $$props) $$invalidate(5, shadowWidth = $$props.shadowWidth);
		if ('disableEventBubble' in $$props) disableEventBubble = $$props.disableEventBubble;
		if ('widthAddition' in $$props) $$invalidate(17, widthAddition = $$props.widthAddition);
		if ('isSingleFilled' in $$props) $$invalidate(18, isSingleFilled = $$props.isSingleFilled);
		if ('inputStyle' in $$props) $$invalidate(9, inputStyle = $$props.inputStyle);
		if ('placeholderText' in $$props) $$invalidate(6, placeholderText = $$props.placeholderText);
		if ('shadowText' in $$props) $$invalidate(10, shadowText = $$props.shadowText);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*selectedOptions, multiple*/ 98304) {
			$$invalidate(18, isSingleFilled = selectedOptions.length > 0 && multiple === false);
		}

		if ($$self.$$.dirty & /*selectedOptions, placeholder*/ 81920) {
			$$invalidate(6, placeholderText = selectedOptions.length > 0 ? '' : placeholder);
		}

		if ($$self.$$.dirty & /*$inputValue, placeholderText*/ 192) {
			$$invalidate(10, shadowText = $inputValue || placeholderText);
		}

		if ($$self.$$.dirty & /*selectedOptions*/ 65536) {
			$$invalidate(17, widthAddition = selectedOptions.length === 0 ? 19 : 12);
		}

		if ($$self.$$.dirty & /*isSingleFilled, shadowWidth, widthAddition*/ 393248) {
			$$invalidate(9, inputStyle = `width: ${isSingleFilled ? 2 : shadowWidth + widthAddition}px`);
		}
	};

	return [
		inputId,
		searchable,
		disabled,
		inputValue,
		hasDropdownOpened,
		shadowWidth,
		placeholderText,
		$inputValue,
		inputRef,
		inputStyle,
		shadowText,
		onKeyDown,
		onKeyUp,
		focus,
		placeholder,
		multiple,
		selectedOptions,
		widthAddition,
		isSingleFilled,
		focus_handler,
		blur_handler,
		paste_handler,
		change_handler,
		input_binding,
		input_input_handler,
		div_elementresize_handler
	];
}

class Input extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$d, create_fragment$d, safe_not_equal, {
			focus: 13,
			inputId: 0,
			placeholder: 14,
			searchable: 1,
			disabled: 2,
			multiple: 15,
			inputValue: 3,
			hasDropdownOpened: 4,
			selectedOptions: 16
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Input",
			options,
			id: create_fragment$d.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*inputId*/ ctx[0] === undefined && !('inputId' in props)) {
			console.warn("<Input> was created without expected prop 'inputId'");
		}

		if (/*placeholder*/ ctx[14] === undefined && !('placeholder' in props)) {
			console.warn("<Input> was created without expected prop 'placeholder'");
		}

		if (/*searchable*/ ctx[1] === undefined && !('searchable' in props)) {
			console.warn("<Input> was created without expected prop 'searchable'");
		}

		if (/*disabled*/ ctx[2] === undefined && !('disabled' in props)) {
			console.warn("<Input> was created without expected prop 'disabled'");
		}

		if (/*multiple*/ ctx[15] === undefined && !('multiple' in props)) {
			console.warn("<Input> was created without expected prop 'multiple'");
		}

		if (/*inputValue*/ ctx[3] === undefined && !('inputValue' in props)) {
			console.warn("<Input> was created without expected prop 'inputValue'");
		}

		if (/*hasDropdownOpened*/ ctx[4] === undefined && !('hasDropdownOpened' in props)) {
			console.warn("<Input> was created without expected prop 'hasDropdownOpened'");
		}

		if (/*selectedOptions*/ ctx[16] === undefined && !('selectedOptions' in props)) {
			console.warn("<Input> was created without expected prop 'selectedOptions'");
		}
	}

	get focus() {
		return this.$$.ctx[13];
	}

	set focus(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputId() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputId(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get placeholder() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set placeholder(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get searchable() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set searchable(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get multiple() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set multiple(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputValue() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputValue(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasDropdownOpened() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasDropdownOpened(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedOptions() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedOptions(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelecte/src/components/Control.svelte generated by Svelte v3.49.0 */
const file$a = "node_modules/svelecte/src/components/Control.svelte";

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[38] = list[i];
	return child_ctx;
}

const get_icon_slot_changes$1 = dirty => ({});
const get_icon_slot_context$1 = ctx => ({});

// (75:4) {#if selectedOptions.length }
function create_if_block_2$2(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_3$2, create_else_block$3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*multiple*/ ctx[5] && /*collapseSelection*/ ctx[6] && /*doCollapse*/ ctx[17]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty$1();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(75:4) {#if selectedOptions.length }",
		ctx
	});

	return block;
}

// (78:6) {:else}
function create_else_block$3(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = /*selectedOptions*/ ctx[11];
	validate_each_argument(each_value);
	const get_key = ctx => /*opt*/ ctx[38][/*currentValueField*/ ctx[14]];
	validate_each_keys(ctx, each_value, get_each_context$5, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$5(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$5(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty$1();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*itemComponent, renderer, selectedOptions, multiple, $inputValue, currentValueField*/ 575524) {
				each_value = /*selectedOptions*/ ctx[11];
				validate_each_argument(each_value);
				group_outros();
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].r();
				validate_each_keys(ctx, each_value, get_each_context$5, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, fix_and_outro_and_destroy_block, create_each_block$5, each_1_anchor, get_each_context$5);
				for (let i = 0; i < each_blocks.length; i += 1) each_blocks[i].a();
				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$3.name,
		type: "else",
		source: "(78:6) {:else}",
		ctx
	});

	return block;
}

// (76:6) {#if multiple && collapseSelection && doCollapse}
function create_if_block_3$2(ctx) {
	let t_value = /*collapseSelection*/ ctx[6](/*selectedOptions*/ ctx[11].length, /*selectedOptions*/ ctx[11]) + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*collapseSelection, selectedOptions*/ 2112 && t_value !== (t_value = /*collapseSelection*/ ctx[6](/*selectedOptions*/ ctx[11].length, /*selectedOptions*/ ctx[11]) + "")) set_data_dev(t, t_value);
		},
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$2.name,
		type: "if",
		source: "(76:6) {#if multiple && collapseSelection && doCollapse}",
		ctx
	});

	return block;
}

// (79:8) {#each selectedOptions as opt (opt[currentValueField])}
function create_each_block$5(key_1, ctx) {
	let div;
	let switch_instance;
	let t;
	let rect;
	let stop_animation = noop$2;
	let current;
	var switch_value = /*itemComponent*/ ctx[15];

	function switch_props(ctx) {
		return {
			props: {
				formatter: /*renderer*/ ctx[2],
				item: /*opt*/ ctx[38],
				isSelected: true,
				isMultiple: /*multiple*/ ctx[5],
				inputValue: /*$inputValue*/ ctx[19]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("deselect", /*deselect_handler*/ ctx[32]);
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
			add_location(div, file$a, 79, 8, 2196);
			this.first = div;
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			append_dev(div, t);
			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty[0] & /*renderer*/ 4) switch_instance_changes.formatter = /*renderer*/ ctx[2];
			if (dirty[0] & /*selectedOptions*/ 2048) switch_instance_changes.item = /*opt*/ ctx[38];
			if (dirty[0] & /*multiple*/ 32) switch_instance_changes.isMultiple = /*multiple*/ ctx[5];
			if (dirty[0] & /*$inputValue*/ 524288) switch_instance_changes.inputValue = /*$inputValue*/ ctx[19];

			if (switch_value !== (switch_value = /*itemComponent*/ ctx[15])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("deselect", /*deselect_handler*/ ctx[32]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, t);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		r: function measure() {
			rect = div.getBoundingClientRect();
		},
		f: function fix() {
			fix_position(div);
			stop_animation();
		},
		a: function animate() {
			stop_animation();
			stop_animation = create_animation(div, rect, flip, { duration: flipDurationMs });
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$5.name,
		type: "each",
		source: "(79:8) {#each selectedOptions as opt (opt[currentValueField])}",
		ctx
	});

	return block;
}

// (98:4) {#if clearable && selectedOptions.length && !disabled}
function create_if_block_1$3(ctx) {
	let div;
	let svg;
	let path;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "d", "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z");
			add_location(path, file$a, 102, 114, 3173);
			attr_dev(svg, "class", "indicator-icon svelte-v9xikc");
			attr_dev(svg, "height", "20");
			attr_dev(svg, "width", "20");
			attr_dev(svg, "viewBox", "0 0 20 20");
			attr_dev(svg, "aria-hidden", "true");
			attr_dev(svg, "focusable", "false");
			add_location(svg, file$a, 102, 6, 3065);
			attr_dev(div, "aria-hidden", "true");
			attr_dev(div, "class", "indicator-container close-icon svelte-v9xikc");
			add_location(div, file$a, 98, 4, 2908);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, svg);
			append_dev(svg, path);

			if (!mounted) {
				dispose = [
					listen_dev(div, "mousedown", prevent_default(/*mousedown_handler_1*/ ctx[29]), false, true, false),
					listen_dev(div, "click", /*click_handler*/ ctx[36], false, false, false)
				];

				mounted = true;
			}
		},
		p: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(98:4) {#if clearable && selectedOptions.length && !disabled}",
		ctx
	});

	return block;
}

// (106:4) {#if clearable}
function create_if_block$6(ctx) {
	let span;

	const block = {
		c: function create() {
			span = element("span");
			attr_dev(span, "class", "indicator-separator svelte-v9xikc");
			add_location(span, file$a, 106, 4, 3593);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(106:4) {#if clearable}",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
	let div3;
	let t0;
	let div0;
	let t1;
	let input;
	let dndzone_action;
	let t2;
	let div2;
	let t3;
	let t4;
	let div1;
	let svg;
	let path;
	let current;
	let mounted;
	let dispose;
	const icon_slot_template = /*#slots*/ ctx[26].icon;
	const icon_slot = create_slot(icon_slot_template, ctx, /*$$scope*/ ctx[25], get_icon_slot_context$1);
	let if_block0 = /*selectedOptions*/ ctx[11].length && create_if_block_2$2(ctx);

	let input_props = {
		disabled: /*disabled*/ ctx[3],
		searchable: /*searchable*/ ctx[1],
		placeholder: /*placeholder*/ ctx[4],
		multiple: /*multiple*/ ctx[5],
		inputId: /*inputId*/ ctx[7],
		inputValue: /*inputValue*/ ctx[8],
		hasDropdownOpened: /*hasDropdownOpened*/ ctx[10],
		selectedOptions: /*selectedOptions*/ ctx[11]
	};

	input = new Input({ props: input_props, $$inline: true });
	/*input_binding*/ ctx[33](input);
	input.$on("focus", /*onFocus*/ ctx[22]);
	input.$on("blur", /*onBlur*/ ctx[23]);
	input.$on("keydown", /*keydown_handler*/ ctx[34]);
	input.$on("paste", /*paste_handler*/ ctx[35]);
	let if_block1 = /*clearable*/ ctx[0] && /*selectedOptions*/ ctx[11].length && !/*disabled*/ ctx[3] && create_if_block_1$3(ctx);
	let if_block2 = /*clearable*/ ctx[0] && create_if_block$6(ctx);

	const block = {
		c: function create() {
			div3 = element("div");
			if (icon_slot) icon_slot.c();
			t0 = space();
			div0 = element("div");
			if (if_block0) if_block0.c();
			t1 = space();
			create_component(input.$$.fragment);
			t2 = space();
			div2 = element("div");
			if (if_block1) if_block1.c();
			t3 = space();
			if (if_block2) if_block2.c();
			t4 = space();
			div1 = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(div0, "class", "sv-content sv-input-row svelte-v9xikc");
			toggle_class(div0, "has-multiSelection", /*multiple*/ ctx[5]);
			add_location(div0, file$a, 73, 2, 1770);
			attr_dev(path, "d", "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z");
			add_location(path, file$a, 110, 8, 3857);
			attr_dev(svg, "width", "20");
			attr_dev(svg, "height", "20");
			attr_dev(svg, "class", "indicator-icon svelte-v9xikc");
			attr_dev(svg, "viewBox", "0 0 20 20");
			attr_dev(svg, "aria-hidden", "true");
			attr_dev(svg, "focusable", "false");
			add_location(svg, file$a, 109, 6, 3739);
			attr_dev(div1, "aria-hidden", "true");
			attr_dev(div1, "class", "indicator-container svelte-v9xikc");
			add_location(div1, file$a, 108, 4, 3651);
			attr_dev(div2, "class", "indicator svelte-v9xikc");
			toggle_class(div2, "is-loading", /*isFetchingData*/ ctx[12]);
			add_location(div2, file$a, 96, 2, 2784);
			attr_dev(div3, "class", "sv-control svelte-v9xikc");
			toggle_class(div3, "is-active", /*$hasFocus*/ ctx[20]);
			toggle_class(div3, "is-disabled", /*disabled*/ ctx[3]);
			add_location(div3, file$a, 67, 0, 1551);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div3, anchor);

			if (icon_slot) {
				icon_slot.m(div3, null);
			}

			append_dev(div3, t0);
			append_dev(div3, div0);
			if (if_block0) if_block0.m(div0, null);
			append_dev(div0, t1);
			mount_component(input, div0, null);
			append_dev(div3, t2);
			append_dev(div3, div2);
			if (if_block1) if_block1.m(div2, null);
			append_dev(div2, t3);
			if (if_block2) if_block2.m(div2, null);
			append_dev(div2, t4);
			append_dev(div2, div1);
			append_dev(div1, svg);
			append_dev(svg, path);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(dndzone_action = /*dndzone*/ ctx[13].call(null, div0, {
						items: /*selectedOptions*/ ctx[11],
						flipDurationMs,
						morphDisabled: true
					})),
					listen_dev(div0, "consider", /*consider_handler*/ ctx[30], false, false, false),
					listen_dev(div0, "finalize", /*finalize_handler*/ ctx[31], false, false, false),
					listen_dev(div1, "mousedown", prevent_default(/*mousedown_handler_2*/ ctx[28]), false, true, false),
					listen_dev(div3, "mousedown", prevent_default(/*mousedown_handler*/ ctx[27]), false, true, false),
					listen_dev(div3, "click", prevent_default(/*focusControl*/ ctx[16]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (icon_slot) {
				if (icon_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
					update_slot_base(
						icon_slot,
						icon_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(icon_slot_template, /*$$scope*/ ctx[25], dirty, get_icon_slot_changes$1),
						get_icon_slot_context$1
					);
				}
			}

			if (/*selectedOptions*/ ctx[11].length) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*selectedOptions*/ 2048) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div0, t1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			const input_changes = {};
			if (dirty[0] & /*disabled*/ 8) input_changes.disabled = /*disabled*/ ctx[3];
			if (dirty[0] & /*searchable*/ 2) input_changes.searchable = /*searchable*/ ctx[1];
			if (dirty[0] & /*placeholder*/ 16) input_changes.placeholder = /*placeholder*/ ctx[4];
			if (dirty[0] & /*multiple*/ 32) input_changes.multiple = /*multiple*/ ctx[5];
			if (dirty[0] & /*inputId*/ 128) input_changes.inputId = /*inputId*/ ctx[7];
			if (dirty[0] & /*inputValue*/ 256) input_changes.inputValue = /*inputValue*/ ctx[8];
			if (dirty[0] & /*hasDropdownOpened*/ 1024) input_changes.hasDropdownOpened = /*hasDropdownOpened*/ ctx[10];
			if (dirty[0] & /*selectedOptions*/ 2048) input_changes.selectedOptions = /*selectedOptions*/ ctx[11];
			input.$set(input_changes);

			if (dndzone_action && is_function(dndzone_action.update) && dirty[0] & /*selectedOptions*/ 2048) dndzone_action.update.call(null, {
				items: /*selectedOptions*/ ctx[11],
				flipDurationMs,
				morphDisabled: true
			});

			if (dirty[0] & /*multiple*/ 32) {
				toggle_class(div0, "has-multiSelection", /*multiple*/ ctx[5]);
			}

			if (/*clearable*/ ctx[0] && /*selectedOptions*/ ctx[11].length && !/*disabled*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$3(ctx);
					if_block1.c();
					if_block1.m(div2, t3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*clearable*/ ctx[0]) {
				if (if_block2) ; else {
					if_block2 = create_if_block$6(ctx);
					if_block2.c();
					if_block2.m(div2, t4);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*isFetchingData*/ 4096) {
				toggle_class(div2, "is-loading", /*isFetchingData*/ ctx[12]);
			}

			if (dirty[0] & /*$hasFocus*/ 1048576) {
				toggle_class(div3, "is-active", /*$hasFocus*/ ctx[20]);
			}

			if (dirty[0] & /*disabled*/ 8) {
				toggle_class(div3, "is-disabled", /*disabled*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon_slot, local);
			transition_in(if_block0);
			transition_in(input.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon_slot, local);
			transition_out(if_block0);
			transition_out(input.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			if (icon_slot) icon_slot.d(detaching);
			if (if_block0) if_block0.d();
			/*input_binding*/ ctx[33](null);
			destroy_component(input);
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const flipDurationMs = 100;

function instance$c($$self, $$props, $$invalidate) {
	let $inputValue,
		$$unsubscribe_inputValue = noop$2,
		$$subscribe_inputValue = () => ($$unsubscribe_inputValue(), $$unsubscribe_inputValue = subscribe(inputValue, $$value => $$invalidate(19, $inputValue = $$value)), inputValue);

	let $hasDropdownOpened,
		$$unsubscribe_hasDropdownOpened = noop$2,
		$$subscribe_hasDropdownOpened = () => ($$unsubscribe_hasDropdownOpened(), $$unsubscribe_hasDropdownOpened = subscribe(hasDropdownOpened, $$value => $$invalidate(37, $hasDropdownOpened = $$value)), hasDropdownOpened);

	let $hasFocus,
		$$unsubscribe_hasFocus = noop$2,
		$$subscribe_hasFocus = () => ($$unsubscribe_hasFocus(), $$unsubscribe_hasFocus = subscribe(hasFocus, $$value => $$invalidate(20, $hasFocus = $$value)), hasFocus);

	$$self.$$.on_destroy.push(() => $$unsubscribe_inputValue());
	$$self.$$.on_destroy.push(() => $$unsubscribe_hasDropdownOpened());
	$$self.$$.on_destroy.push(() => $$unsubscribe_hasFocus());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Control', slots, ['icon']);
	let { clearable } = $$props;
	let { searchable } = $$props;
	let { renderer } = $$props;
	let { disabled } = $$props;
	let { placeholder } = $$props;
	let { multiple } = $$props;
	let { resetOnBlur } = $$props;
	let { collapseSelection } = $$props;
	let { inputId } = $$props;
	let { inputValue } = $$props;
	validate_store(inputValue, 'inputValue');
	$$subscribe_inputValue();
	let { hasFocus } = $$props;
	validate_store(hasFocus, 'hasFocus');
	$$subscribe_hasFocus();
	let { hasDropdownOpened } = $$props;
	validate_store(hasDropdownOpened, 'hasDropdownOpened');
	$$subscribe_hasDropdownOpened();
	let { selectedOptions } = $$props;
	let { isFetchingData } = $$props;
	let { dndzone } = $$props;
	let { currentValueField } = $$props;
	let { itemComponent } = $$props;

	function focusControl(event) {
		if (disabled) return;

		if (!event) {
			!$hasFocus && refInput.focus();
			set_store_value(hasDropdownOpened, $hasDropdownOpened = true, $hasDropdownOpened);
			return;
		}

		if (!$hasFocus) {
			refInput.focus();
		} else {
			set_store_value(hasDropdownOpened, $hasDropdownOpened = !$hasDropdownOpened, $hasDropdownOpened);
		}
	}

	/** ************************************ context */
	const dispatch = createEventDispatcher();

	let doCollapse = true;
	let refInput = undefined;

	function onFocus() {
		set_store_value(hasFocus, $hasFocus = true, $hasFocus);
		set_store_value(hasDropdownOpened, $hasDropdownOpened = true, $hasDropdownOpened);

		setTimeout(
			() => {
				$$invalidate(17, doCollapse = false);
			},
			150
		);
	}

	function onBlur() {
		set_store_value(hasFocus, $hasFocus = false, $hasFocus);
		set_store_value(hasDropdownOpened, $hasDropdownOpened = false, $hasDropdownOpened);
		if (resetOnBlur) set_store_value(inputValue, $inputValue = '', $inputValue); // reset

		setTimeout(
			() => {
				$$invalidate(17, doCollapse = true);
			},
			100
		);

		dispatch('blur');
	}

	const writable_props = [
		'clearable',
		'searchable',
		'renderer',
		'disabled',
		'placeholder',
		'multiple',
		'resetOnBlur',
		'collapseSelection',
		'inputId',
		'inputValue',
		'hasFocus',
		'hasDropdownOpened',
		'selectedOptions',
		'isFetchingData',
		'dndzone',
		'currentValueField',
		'itemComponent'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Control> was created with unknown prop '${key}'`);
	});

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function mousedown_handler_2(event) {
		bubble.call(this, $$self, event);
	}

	function mousedown_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function consider_handler(event) {
		bubble.call(this, $$self, event);
	}

	function finalize_handler(event) {
		bubble.call(this, $$self, event);
	}

	function deselect_handler(event) {
		bubble.call(this, $$self, event);
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			refInput = $$value;
			$$invalidate(18, refInput);
		});
	}

	function keydown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function paste_handler(event) {
		bubble.call(this, $$self, event);
	}

	const click_handler = () => dispatch('deselect');

	$$self.$$set = $$props => {
		if ('clearable' in $$props) $$invalidate(0, clearable = $$props.clearable);
		if ('searchable' in $$props) $$invalidate(1, searchable = $$props.searchable);
		if ('renderer' in $$props) $$invalidate(2, renderer = $$props.renderer);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
		if ('placeholder' in $$props) $$invalidate(4, placeholder = $$props.placeholder);
		if ('multiple' in $$props) $$invalidate(5, multiple = $$props.multiple);
		if ('resetOnBlur' in $$props) $$invalidate(24, resetOnBlur = $$props.resetOnBlur);
		if ('collapseSelection' in $$props) $$invalidate(6, collapseSelection = $$props.collapseSelection);
		if ('inputId' in $$props) $$invalidate(7, inputId = $$props.inputId);
		if ('inputValue' in $$props) $$subscribe_inputValue($$invalidate(8, inputValue = $$props.inputValue));
		if ('hasFocus' in $$props) $$subscribe_hasFocus($$invalidate(9, hasFocus = $$props.hasFocus));
		if ('hasDropdownOpened' in $$props) $$subscribe_hasDropdownOpened($$invalidate(10, hasDropdownOpened = $$props.hasDropdownOpened));
		if ('selectedOptions' in $$props) $$invalidate(11, selectedOptions = $$props.selectedOptions);
		if ('isFetchingData' in $$props) $$invalidate(12, isFetchingData = $$props.isFetchingData);
		if ('dndzone' in $$props) $$invalidate(13, dndzone = $$props.dndzone);
		if ('currentValueField' in $$props) $$invalidate(14, currentValueField = $$props.currentValueField);
		if ('itemComponent' in $$props) $$invalidate(15, itemComponent = $$props.itemComponent);
		if ('$$scope' in $$props) $$invalidate(25, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		flip,
		Input,
		clearable,
		searchable,
		renderer,
		disabled,
		placeholder,
		multiple,
		resetOnBlur,
		collapseSelection,
		inputId,
		inputValue,
		hasFocus,
		hasDropdownOpened,
		selectedOptions,
		isFetchingData,
		dndzone,
		currentValueField,
		itemComponent,
		flipDurationMs,
		focusControl,
		dispatch,
		doCollapse,
		refInput,
		onFocus,
		onBlur,
		$inputValue,
		$hasDropdownOpened,
		$hasFocus
	});

	$$self.$inject_state = $$props => {
		if ('clearable' in $$props) $$invalidate(0, clearable = $$props.clearable);
		if ('searchable' in $$props) $$invalidate(1, searchable = $$props.searchable);
		if ('renderer' in $$props) $$invalidate(2, renderer = $$props.renderer);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
		if ('placeholder' in $$props) $$invalidate(4, placeholder = $$props.placeholder);
		if ('multiple' in $$props) $$invalidate(5, multiple = $$props.multiple);
		if ('resetOnBlur' in $$props) $$invalidate(24, resetOnBlur = $$props.resetOnBlur);
		if ('collapseSelection' in $$props) $$invalidate(6, collapseSelection = $$props.collapseSelection);
		if ('inputId' in $$props) $$invalidate(7, inputId = $$props.inputId);
		if ('inputValue' in $$props) $$subscribe_inputValue($$invalidate(8, inputValue = $$props.inputValue));
		if ('hasFocus' in $$props) $$subscribe_hasFocus($$invalidate(9, hasFocus = $$props.hasFocus));
		if ('hasDropdownOpened' in $$props) $$subscribe_hasDropdownOpened($$invalidate(10, hasDropdownOpened = $$props.hasDropdownOpened));
		if ('selectedOptions' in $$props) $$invalidate(11, selectedOptions = $$props.selectedOptions);
		if ('isFetchingData' in $$props) $$invalidate(12, isFetchingData = $$props.isFetchingData);
		if ('dndzone' in $$props) $$invalidate(13, dndzone = $$props.dndzone);
		if ('currentValueField' in $$props) $$invalidate(14, currentValueField = $$props.currentValueField);
		if ('itemComponent' in $$props) $$invalidate(15, itemComponent = $$props.itemComponent);
		if ('doCollapse' in $$props) $$invalidate(17, doCollapse = $$props.doCollapse);
		if ('refInput' in $$props) $$invalidate(18, refInput = $$props.refInput);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		clearable,
		searchable,
		renderer,
		disabled,
		placeholder,
		multiple,
		collapseSelection,
		inputId,
		inputValue,
		hasFocus,
		hasDropdownOpened,
		selectedOptions,
		isFetchingData,
		dndzone,
		currentValueField,
		itemComponent,
		focusControl,
		doCollapse,
		refInput,
		$inputValue,
		$hasFocus,
		dispatch,
		onFocus,
		onBlur,
		resetOnBlur,
		$$scope,
		slots,
		mousedown_handler,
		mousedown_handler_2,
		mousedown_handler_1,
		consider_handler,
		finalize_handler,
		deselect_handler,
		input_binding,
		keydown_handler,
		paste_handler,
		click_handler
	];
}

class Control extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$c,
			create_fragment$c,
			safe_not_equal,
			{
				clearable: 0,
				searchable: 1,
				renderer: 2,
				disabled: 3,
				placeholder: 4,
				multiple: 5,
				resetOnBlur: 24,
				collapseSelection: 6,
				inputId: 7,
				inputValue: 8,
				hasFocus: 9,
				hasDropdownOpened: 10,
				selectedOptions: 11,
				isFetchingData: 12,
				dndzone: 13,
				currentValueField: 14,
				itemComponent: 15,
				focusControl: 16
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Control",
			options,
			id: create_fragment$c.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*clearable*/ ctx[0] === undefined && !('clearable' in props)) {
			console.warn("<Control> was created without expected prop 'clearable'");
		}

		if (/*searchable*/ ctx[1] === undefined && !('searchable' in props)) {
			console.warn("<Control> was created without expected prop 'searchable'");
		}

		if (/*renderer*/ ctx[2] === undefined && !('renderer' in props)) {
			console.warn("<Control> was created without expected prop 'renderer'");
		}

		if (/*disabled*/ ctx[3] === undefined && !('disabled' in props)) {
			console.warn("<Control> was created without expected prop 'disabled'");
		}

		if (/*placeholder*/ ctx[4] === undefined && !('placeholder' in props)) {
			console.warn("<Control> was created without expected prop 'placeholder'");
		}

		if (/*multiple*/ ctx[5] === undefined && !('multiple' in props)) {
			console.warn("<Control> was created without expected prop 'multiple'");
		}

		if (/*resetOnBlur*/ ctx[24] === undefined && !('resetOnBlur' in props)) {
			console.warn("<Control> was created without expected prop 'resetOnBlur'");
		}

		if (/*collapseSelection*/ ctx[6] === undefined && !('collapseSelection' in props)) {
			console.warn("<Control> was created without expected prop 'collapseSelection'");
		}

		if (/*inputId*/ ctx[7] === undefined && !('inputId' in props)) {
			console.warn("<Control> was created without expected prop 'inputId'");
		}

		if (/*inputValue*/ ctx[8] === undefined && !('inputValue' in props)) {
			console.warn("<Control> was created without expected prop 'inputValue'");
		}

		if (/*hasFocus*/ ctx[9] === undefined && !('hasFocus' in props)) {
			console.warn("<Control> was created without expected prop 'hasFocus'");
		}

		if (/*hasDropdownOpened*/ ctx[10] === undefined && !('hasDropdownOpened' in props)) {
			console.warn("<Control> was created without expected prop 'hasDropdownOpened'");
		}

		if (/*selectedOptions*/ ctx[11] === undefined && !('selectedOptions' in props)) {
			console.warn("<Control> was created without expected prop 'selectedOptions'");
		}

		if (/*isFetchingData*/ ctx[12] === undefined && !('isFetchingData' in props)) {
			console.warn("<Control> was created without expected prop 'isFetchingData'");
		}

		if (/*dndzone*/ ctx[13] === undefined && !('dndzone' in props)) {
			console.warn("<Control> was created without expected prop 'dndzone'");
		}

		if (/*currentValueField*/ ctx[14] === undefined && !('currentValueField' in props)) {
			console.warn("<Control> was created without expected prop 'currentValueField'");
		}

		if (/*itemComponent*/ ctx[15] === undefined && !('itemComponent' in props)) {
			console.warn("<Control> was created without expected prop 'itemComponent'");
		}
	}

	get clearable() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set clearable(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get searchable() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set searchable(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get renderer() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set renderer(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get placeholder() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set placeholder(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get multiple() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set multiple(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get resetOnBlur() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set resetOnBlur(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get collapseSelection() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set collapseSelection(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputId() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputId(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputValue() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputValue(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasFocus() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasFocus(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasDropdownOpened() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasDropdownOpened(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectedOptions() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectedOptions(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isFetchingData() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isFetchingData(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dndzone() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dndzone(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get currentValueField() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set currentValueField(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get itemComponent() {
		throw new Error("<Control>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set itemComponent(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focusControl() {
		return this.$$.ctx[16];
	}

	set focusControl(value) {
		throw new Error("<Control>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const ALIGNMENT = {
	AUTO:   'auto',
	START:  'start',
	CENTER: 'center',
	END:    'end',
};

const DIRECTION = {
	HORIZONTAL: 'horizontal',
	VERTICAL:   'vertical',
};

const SCROLL_CHANGE_REASON = {
	OBSERVED:  0,
	REQUESTED: 1,
};

const SCROLL_PROP = {
	[DIRECTION.VERTICAL]:   'top',
	[DIRECTION.HORIZONTAL]: 'left',
};

const SCROLL_PROP_LEGACY = {
	[DIRECTION.VERTICAL]:   'scrollTop',
	[DIRECTION.HORIZONTAL]: 'scrollLeft',
};

/* Forked from react-virtualized 💖 */

/**
 * @callback ItemSizeGetter
 * @param {number} index
 * @return {number}
 */

/**
 * @typedef ItemSize
 * @type {number | number[] | ItemSizeGetter}
 */

/**
 * @typedef SizeAndPosition
 * @type {object}
 * @property {number} size
 * @property {number} offset
 */

/**
 * @typedef SizeAndPositionData
 * @type {Object.<number, SizeAndPosition>}
 */

/**
 * @typedef Options
 * @type {object}
 * @property {number} itemCount
 * @property {ItemSize} itemSize
 * @property {number} estimatedItemSize
 */

class SizeAndPositionManager {

	/**
	 * @param {Options} options
	 */
	constructor({ itemSize, itemCount, estimatedItemSize }) {
		/**
		 * @private
		 * @type {ItemSize}
		 */
		this.itemSize = itemSize;

		/**
		 * @private
		 * @type {number}
		 */
		this.itemCount = itemCount;

		/**
		 * @private
		 * @type {number}
		 */
		this.estimatedItemSize = estimatedItemSize;

		/**
		 * Cache of size and position data for items, mapped by item index.
		 *
		 * @private
		 * @type {SizeAndPositionData}
		 */
		this.itemSizeAndPositionData = {};

		/**
		 * Measurements for items up to this index can be trusted; items afterward should be estimated.
		 *
		 * @private
		 * @type {number}
		 */
		this.lastMeasuredIndex = -1;

		this.checkForMismatchItemSizeAndItemCount();

		if (!this.justInTime) this.computeTotalSizeAndPositionData();
	}

	get justInTime() {
		return typeof this.itemSize === 'function';
	}

	/**
	 * @param {Options} options
	 */
	updateConfig({ itemSize, itemCount, estimatedItemSize }) {
		if (itemCount != null) {
			this.itemCount = itemCount;
		}

		if (estimatedItemSize != null) {
			this.estimatedItemSize = estimatedItemSize;
		}

		if (itemSize != null) {
			this.itemSize = itemSize;
		}

		this.checkForMismatchItemSizeAndItemCount();

		if (this.justInTime && this.totalSize != null) {
			this.totalSize = undefined;
		} else {
			this.computeTotalSizeAndPositionData();
		}
	}

	checkForMismatchItemSizeAndItemCount() {
		if (Array.isArray(this.itemSize) && this.itemSize.length < this.itemCount) {
			throw Error(
				`When itemSize is an array, itemSize.length can't be smaller than itemCount`,
			);
		}
	}

	/**
	 * @param {number} index
	 */
	getSize(index) {
		const { itemSize } = this;

		if (typeof itemSize === 'function') {
			return itemSize(index);
		}

		return Array.isArray(itemSize) ? itemSize[index] : itemSize;
	}

	/**
	 * Compute the totalSize and itemSizeAndPositionData at the start,
	 * only when itemSize is a number or an array.
	 */
	computeTotalSizeAndPositionData() {
		let totalSize = 0;
		for (let i = 0; i < this.itemCount; i++) {
			const size = this.getSize(i);
			const offset = totalSize;
			totalSize += size;

			this.itemSizeAndPositionData[i] = {
				offset,
				size,
			};
		}

		this.totalSize = totalSize;
	}

	getLastMeasuredIndex() {
		return this.lastMeasuredIndex;
	}


	/**
	 * This method returns the size and position for the item at the specified index.
	 *
	 * @param {number} index
	 */
	getSizeAndPositionForIndex(index) {
		if (index < 0 || index >= this.itemCount) {
			throw Error(
				`Requested index ${index} is outside of range 0..${this.itemCount}`,
			);
		}

		return this.justInTime
			? this.getJustInTimeSizeAndPositionForIndex(index)
			: this.itemSizeAndPositionData[index];
	}

	/**
	 * This is used when itemSize is a function.
	 * just-in-time calculates (or used cached values) for items leading up to the index.
	 *
	 * @param {number} index
	 */
	getJustInTimeSizeAndPositionForIndex(index) {
		if (index > this.lastMeasuredIndex) {
			const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
			let offset =
				    lastMeasuredSizeAndPosition.offset + lastMeasuredSizeAndPosition.size;

			for (let i = this.lastMeasuredIndex + 1; i <= index; i++) {
				const size = this.getSize(i);

				if (size == null || isNaN(size)) {
					throw Error(`Invalid size returned for index ${i} of value ${size}`);
				}

				this.itemSizeAndPositionData[i] = {
					offset,
					size,
				};

				offset += size;
			}

			this.lastMeasuredIndex = index;
		}

		return this.itemSizeAndPositionData[index];
	}

	getSizeAndPositionOfLastMeasuredItem() {
		return this.lastMeasuredIndex >= 0
			? this.itemSizeAndPositionData[this.lastMeasuredIndex]
			: { offset: 0, size: 0 };
	}

	/**
	 * Total size of all items being measured.
	 *
	 * @return {number}
	 */
	getTotalSize() {
		// Return the pre computed totalSize when itemSize is number or array.
		if (this.totalSize) return this.totalSize;

		/**
		 * When itemSize is a function,
		 * This value will be completedly estimated initially.
		 * As items as measured the estimate will be updated.
		 */
		const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();

		return (
			lastMeasuredSizeAndPosition.offset +
			lastMeasuredSizeAndPosition.size +
			(this.itemCount - this.lastMeasuredIndex - 1) * this.estimatedItemSize
		);
	}

	/**
	 * Determines a new offset that ensures a certain item is visible, given the alignment.
	 *
	 * @param {'auto' | 'start' | 'center' | 'end'} align Desired alignment within container
	 * @param {number | undefined} containerSize Size (width or height) of the container viewport
	 * @param {number | undefined} currentOffset
	 * @param {number | undefined} targetIndex
	 * @return {number} Offset to use to ensure the specified item is visible
	 */
	getUpdatedOffsetForIndex({ align = ALIGNMENT.START, containerSize, currentOffset, targetIndex }) {
		if (containerSize <= 0) {
			return 0;
		}

		const datum = this.getSizeAndPositionForIndex(targetIndex);
		const maxOffset = datum.offset;
		const minOffset = maxOffset - containerSize + datum.size;

		let idealOffset;

		switch (align) {
			case ALIGNMENT.END:
				idealOffset = minOffset;
				break;
			case ALIGNMENT.CENTER:
				idealOffset = maxOffset - (containerSize - datum.size) / 2;
				break;
			case ALIGNMENT.START:
				idealOffset = maxOffset;
				break;
			default:
				idealOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
		}

		const totalSize = this.getTotalSize();

		return Math.max(0, Math.min(totalSize - containerSize, idealOffset));
	}

	/**
	 * @param {number} containerSize
	 * @param {number} offset
	 * @param {number} overscanCount
	 * @return {{stop: number|undefined, start: number|undefined}}
	 */
	getVisibleRange({ containerSize = 0, offset, overscanCount }) {
		const totalSize = this.getTotalSize();

		if (totalSize === 0) {
			return {};
		}

		const maxOffset = offset + containerSize;
		let start = this.findNearestItem(offset);

		if (start === undefined) {
			throw Error(`Invalid offset ${offset} specified`);
		}

		const datum = this.getSizeAndPositionForIndex(start);
		offset = datum.offset + datum.size;

		let stop = start;

		while (offset < maxOffset && stop < this.itemCount - 1) {
			stop++;
			offset += this.getSizeAndPositionForIndex(stop).size;
		}

		if (overscanCount) {
			start = Math.max(0, start - overscanCount);
			stop = Math.min(stop + overscanCount, this.itemCount - 1);
		}

		return {
			start,
			stop,
		};
	}

	/**
	 * Clear all cached values for items after the specified index.
	 * This method should be called for any item that has changed its size.
	 * It will not immediately perform any calculations; they'll be performed the next time getSizeAndPositionForIndex() is called.
	 *
	 * @param {number} index
	 */
	resetItem(index) {
		this.lastMeasuredIndex = Math.min(this.lastMeasuredIndex, index - 1);
	}

	/**
	 * Searches for the item (index) nearest the specified offset.
	 *
	 * If no exact match is found the next lowest item index will be returned.
	 * This allows partially visible items (with offsets just before/above the fold) to be visible.
	 *
	 * @param {number} offset
	 */
	findNearestItem(offset) {
		if (isNaN(offset)) {
			throw Error(`Invalid offset ${offset} specified`);
		}

		// Our search algorithms find the nearest match at or below the specified offset.
		// So make sure the offset is at least 0 or no match will be found.
		offset = Math.max(0, offset);

		const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
		const lastMeasuredIndex = Math.max(0, this.lastMeasuredIndex);

		if (lastMeasuredSizeAndPosition.offset >= offset) {
			// If we've already measured items within this range just use a binary search as it's faster.
			return this.binarySearch({
				high: lastMeasuredIndex,
				low:  0,
				offset,
			});
		} else {
			// If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
			// The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
			// The overall complexity for this approach is O(log n).
			return this.exponentialSearch({
				index: lastMeasuredIndex,
				offset,
			});
		}
	}

	/**
	 * @private
	 * @param {number} low
	 * @param {number} high
	 * @param {number} offset
	 */
	binarySearch({ low, high, offset }) {
		let middle = 0;
		let currentOffset = 0;

		while (low <= high) {
			middle = low + Math.floor((high - low) / 2);
			currentOffset = this.getSizeAndPositionForIndex(middle).offset;

			if (currentOffset === offset) {
				return middle;
			} else if (currentOffset < offset) {
				low = middle + 1;
			} else if (currentOffset > offset) {
				high = middle - 1;
			}
		}

		if (low > 0) {
			return low - 1;
		}

		return 0;
	}

	/**
	 * @private
	 * @param {number} index
	 * @param {number} offset
	 */
	exponentialSearch({ index, offset }) {
		let interval = 1;

		while (
			index < this.itemCount &&
			this.getSizeAndPositionForIndex(index).offset < offset
			) {
			index += interval;
			interval *= 2;
		}

		return this.binarySearch({
			high: Math.min(index, this.itemCount - 1),
			low:  Math.floor(index / 2),
			offset,
		});
	}
}

/* node_modules/svelte-tiny-virtual-list/src/VirtualList.svelte generated by Svelte v3.49.0 */

const { Object: Object_1$2 } = globals;

const file$9 = "node_modules/svelte-tiny-virtual-list/src/VirtualList.svelte";
const get_footer_slot_changes = dirty => ({});
const get_footer_slot_context = ctx => ({});

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	return child_ctx;
}

const get_item_slot_changes = dirty => ({
	style: dirty[0] & /*items*/ 4,
	index: dirty[0] & /*items*/ 4
});

const get_item_slot_context = ctx => ({
	style: /*item*/ ctx[37].style,
	index: /*item*/ ctx[37].index
});

const get_header_slot_changes = dirty => ({});
const get_header_slot_context = ctx => ({});

// (331:2) {#each items as item (getKey ? getKey(item.index) : item.index)}
function create_each_block$4(key_1, ctx) {
	let first;
	let current;
	const item_slot_template = /*#slots*/ ctx[21].item;
	const item_slot = create_slot(item_slot_template, ctx, /*$$scope*/ ctx[20], get_item_slot_context);

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = empty$1();
			if (item_slot) item_slot.c();
			this.first = first;
		},
		m: function mount(target, anchor) {
			insert_dev(target, first, anchor);

			if (item_slot) {
				item_slot.m(target, anchor);
			}

			current = true;
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;

			if (item_slot) {
				if (item_slot.p && (!current || dirty[0] & /*$$scope, items*/ 1048580)) {
					update_slot_base(
						item_slot,
						item_slot_template,
						ctx,
						/*$$scope*/ ctx[20],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
						: get_slot_changes(item_slot_template, /*$$scope*/ ctx[20], dirty, get_item_slot_changes),
						get_item_slot_context
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(item_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(item_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(first);
			if (item_slot) item_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$4.name,
		type: "each",
		source: "(331:2) {#each items as item (getKey ? getKey(item.index) : item.index)}",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
	let div1;
	let t0;
	let div0;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t1;
	let current;
	const header_slot_template = /*#slots*/ ctx[21].header;
	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[20], get_header_slot_context);
	let each_value = /*items*/ ctx[2];
	validate_each_argument(each_value);

	const get_key = ctx => /*getKey*/ ctx[0]
	? /*getKey*/ ctx[0](/*item*/ ctx[37].index)
	: /*item*/ ctx[37].index;

	validate_each_keys(ctx, each_value, get_each_context$4, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$4(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$4(key, child_ctx));
	}

	const footer_slot_template = /*#slots*/ ctx[21].footer;
	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[20], get_footer_slot_context);

	const block = {
		c: function create() {
			div1 = element("div");
			if (header_slot) header_slot.c();
			t0 = space();
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			if (footer_slot) footer_slot.c();
			attr_dev(div0, "class", "virtual-list-inner svelte-dwpad5");
			attr_dev(div0, "style", /*innerStyle*/ ctx[4]);
			add_location(div0, file$9, 329, 1, 7514);
			attr_dev(div1, "class", "virtual-list-wrapper svelte-dwpad5");
			attr_dev(div1, "style", /*wrapperStyle*/ ctx[3]);
			add_location(div1, file$9, 326, 0, 7412);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);

			if (header_slot) {
				header_slot.m(div1, null);
			}

			append_dev(div1, t0);
			append_dev(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			append_dev(div1, t1);

			if (footer_slot) {
				footer_slot.m(div1, null);
			}

			/*div1_binding*/ ctx[22](div1);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (header_slot) {
				if (header_slot.p && (!current || dirty[0] & /*$$scope*/ 1048576)) {
					update_slot_base(
						header_slot,
						header_slot_template,
						ctx,
						/*$$scope*/ ctx[20],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[20], dirty, get_header_slot_changes),
						get_header_slot_context
					);
				}
			}

			if (dirty[0] & /*$$scope, items, getKey*/ 1048581) {
				each_value = /*items*/ ctx[2];
				validate_each_argument(each_value);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context$4, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div0, outro_and_destroy_block, create_each_block$4, null, get_each_context$4);
				check_outros();
			}

			if (!current || dirty[0] & /*innerStyle*/ 16) {
				attr_dev(div0, "style", /*innerStyle*/ ctx[4]);
			}

			if (footer_slot) {
				if (footer_slot.p && (!current || dirty[0] & /*$$scope*/ 1048576)) {
					update_slot_base(
						footer_slot,
						footer_slot_template,
						ctx,
						/*$$scope*/ ctx[20],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[20])
						: get_slot_changes(footer_slot_template, /*$$scope*/ ctx[20], dirty, get_footer_slot_changes),
						get_footer_slot_context
					);
				}
			}

			if (!current || dirty[0] & /*wrapperStyle*/ 8) {
				attr_dev(div1, "style", /*wrapperStyle*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header_slot, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(footer_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header_slot, local);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(footer_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (header_slot) header_slot.d(detaching);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}

			if (footer_slot) footer_slot.d(detaching);
			/*div1_binding*/ ctx[22](null);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const thirdEventArg = (() => {
	let result = false;

	try {
		const arg = Object.defineProperty({}, 'passive', {
			get() {
				result = { passive: true };
				return true;
			}
		});

		window.addEventListener('testpassive', arg, arg);
		window.remove('testpassive', arg, arg);
	} catch(e) {
		
	} /* */

	return result;
})();

function instance$b($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('VirtualList', slots, ['header','item','footer']);
	let { height } = $$props;
	let { width = '100%' } = $$props;
	let { itemCount } = $$props;
	let { itemSize } = $$props;
	let { estimatedItemSize = null } = $$props;
	let { stickyIndices = null } = $$props;
	let { getKey = null } = $$props;
	let { scrollDirection = DIRECTION.VERTICAL } = $$props;
	let { scrollOffset = null } = $$props;
	let { scrollToIndex = null } = $$props;
	let { scrollToAlignment = null } = $$props;
	let { scrollToBehaviour = 'instant' } = $$props;
	let { overscanCount = 3 } = $$props;
	const dispatchEvent = createEventDispatcher();

	const sizeAndPositionManager = new SizeAndPositionManager({
			itemCount,
			itemSize,
			estimatedItemSize: getEstimatedItemSize()
		});

	let mounted = false;
	let wrapper;
	let items = [];

	let state = {
		offset: scrollOffset || scrollToIndex != null && items.length && getOffsetForIndex(scrollToIndex) || 0,
		scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED
	};

	let prevState = state;

	let prevProps = {
		scrollToIndex,
		scrollToAlignment,
		scrollOffset,
		itemCount,
		itemSize,
		estimatedItemSize
	};

	let styleCache = {};
	let wrapperStyle = '';
	let innerStyle = '';
	refresh(); // Initial Load

	onMount(() => {
		$$invalidate(18, mounted = true);
		wrapper.addEventListener('scroll', handleScroll, thirdEventArg);

		if (scrollOffset != null) {
			scrollTo(scrollOffset);
		} else if (scrollToIndex != null) {
			scrollTo(getOffsetForIndex(scrollToIndex));
		}
	});

	onDestroy(() => {
		if (mounted) wrapper.removeEventListener('scroll', handleScroll);
	});

	function propsUpdated() {
		if (!mounted) return;
		const scrollPropsHaveChanged = prevProps.scrollToIndex !== scrollToIndex || prevProps.scrollToAlignment !== scrollToAlignment;
		const itemPropsHaveChanged = prevProps.itemCount !== itemCount || prevProps.itemSize !== itemSize || prevProps.estimatedItemSize !== estimatedItemSize;

		if (itemPropsHaveChanged) {
			sizeAndPositionManager.updateConfig({
				itemSize,
				itemCount,
				estimatedItemSize: getEstimatedItemSize()
			});

			recomputeSizes();
		}

		if (prevProps.scrollOffset !== scrollOffset) {
			$$invalidate(19, state = {
				offset: scrollOffset || 0,
				scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED
			});
		} else if (typeof scrollToIndex === 'number' && (scrollPropsHaveChanged || itemPropsHaveChanged)) {
			$$invalidate(19, state = {
				offset: getOffsetForIndex(scrollToIndex, scrollToAlignment, itemCount),
				scrollChangeReason: SCROLL_CHANGE_REASON.REQUESTED
			});
		}

		prevProps = {
			scrollToIndex,
			scrollToAlignment,
			scrollOffset,
			itemCount,
			itemSize,
			estimatedItemSize
		};
	}

	function stateUpdated() {
		if (!mounted) return;
		const { offset, scrollChangeReason } = state;

		if (prevState.offset !== offset || prevState.scrollChangeReason !== scrollChangeReason) {
			refresh();
		}

		if (prevState.offset !== offset && scrollChangeReason === SCROLL_CHANGE_REASON.REQUESTED) {
			scrollTo(offset);
		}

		prevState = state;
	}

	function refresh() {
		const { offset } = state;

		const { start, stop } = sizeAndPositionManager.getVisibleRange({
			containerSize: scrollDirection === DIRECTION.VERTICAL ? height : width,
			offset,
			overscanCount
		});

		let updatedItems = [];
		const totalSize = sizeAndPositionManager.getTotalSize();

		if (scrollDirection === DIRECTION.VERTICAL) {
			$$invalidate(3, wrapperStyle = `height:${height}px;width:${width};`);
			$$invalidate(4, innerStyle = `flex-direction:column;height:${totalSize}px;`);
		} else {
			$$invalidate(3, wrapperStyle = `height:${height};width:${width}px`);
			$$invalidate(4, innerStyle = `min-height:100%;width:${totalSize}px;`);
		}

		const hasStickyIndices = stickyIndices != null && stickyIndices.length !== 0;

		if (hasStickyIndices) {
			for (let i = 0; i < stickyIndices.length; i++) {
				const index = stickyIndices[i];
				updatedItems.push({ index, style: getStyle(index, true) });
			}
		}

		if (start !== undefined && stop !== undefined) {
			for (let index = start; index <= stop; index++) {
				if (hasStickyIndices && stickyIndices.includes(index)) {
					continue;
				}

				updatedItems.push({ index, style: getStyle(index, false) });
			}

			dispatchEvent('itemsUpdated', { start, end: stop });
		}

		$$invalidate(2, items = updatedItems);
	}

	function scrollTo(value) {
		if ('scroll' in wrapper) {
			wrapper.scroll({
				[SCROLL_PROP[scrollDirection]]: value,
				behavior: scrollToBehaviour
			});
		} else {
			$$invalidate(1, wrapper[SCROLL_PROP_LEGACY[scrollDirection]] = value, wrapper);
		}
	}

	function recomputeSizes(startIndex = 0) {
		styleCache = {};
		sizeAndPositionManager.resetItem(startIndex);
		refresh();
	}

	function getOffsetForIndex(index, align = scrollToAlignment, _itemCount = itemCount) {
		if (index < 0 || index >= _itemCount) {
			index = 0;
		}

		return sizeAndPositionManager.getUpdatedOffsetForIndex({
			align,
			containerSize: scrollDirection === DIRECTION.VERTICAL ? height : width,
			currentOffset: state.offset || 0,
			targetIndex: index
		});
	}

	function handleScroll(event) {
		const offset = getWrapperOffset();
		if (offset < 0 || state.offset === offset || event.target !== wrapper) return;

		$$invalidate(19, state = {
			offset,
			scrollChangeReason: SCROLL_CHANGE_REASON.OBSERVED
		});

		dispatchEvent('afterScroll', { offset, event });
	}

	function getWrapperOffset() {
		return wrapper[SCROLL_PROP_LEGACY[scrollDirection]];
	}

	function getEstimatedItemSize() {
		return estimatedItemSize || typeof itemSize === 'number' && itemSize || 50;
	}

	function getStyle(index, sticky) {
		if (styleCache[index]) return styleCache[index];
		const { size, offset } = sizeAndPositionManager.getSizeAndPositionForIndex(index);
		let style;

		if (scrollDirection === DIRECTION.VERTICAL) {
			style = `left:0;width:100%;height:${size}px;`;

			if (sticky) {
				style += `position:sticky;flex-grow:0;z-index:1;top:0;margin-top:${offset}px;margin-bottom:${-(offset + size)}px;`;
			} else {
				style += `position:absolute;top:${offset}px;`;
			}
		} else {
			style = `top:0;width:${size}px;`;

			if (sticky) {
				style += `position:sticky;z-index:1;left:0;margin-left:${offset}px;margin-right:${-(offset + size)}px;`;
			} else {
				style += `position:absolute;height:100%;left:${offset}px;`;
			}
		}

		return styleCache[index] = style;
	}

	const writable_props = [
		'height',
		'width',
		'itemCount',
		'itemSize',
		'estimatedItemSize',
		'stickyIndices',
		'getKey',
		'scrollDirection',
		'scrollOffset',
		'scrollToIndex',
		'scrollToAlignment',
		'scrollToBehaviour',
		'overscanCount'
	];

	Object_1$2.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<VirtualList> was created with unknown prop '${key}'`);
	});

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			wrapper = $$value;
			$$invalidate(1, wrapper);
		});
	}

	$$self.$$set = $$props => {
		if ('height' in $$props) $$invalidate(5, height = $$props.height);
		if ('width' in $$props) $$invalidate(6, width = $$props.width);
		if ('itemCount' in $$props) $$invalidate(7, itemCount = $$props.itemCount);
		if ('itemSize' in $$props) $$invalidate(8, itemSize = $$props.itemSize);
		if ('estimatedItemSize' in $$props) $$invalidate(9, estimatedItemSize = $$props.estimatedItemSize);
		if ('stickyIndices' in $$props) $$invalidate(10, stickyIndices = $$props.stickyIndices);
		if ('getKey' in $$props) $$invalidate(0, getKey = $$props.getKey);
		if ('scrollDirection' in $$props) $$invalidate(11, scrollDirection = $$props.scrollDirection);
		if ('scrollOffset' in $$props) $$invalidate(12, scrollOffset = $$props.scrollOffset);
		if ('scrollToIndex' in $$props) $$invalidate(13, scrollToIndex = $$props.scrollToIndex);
		if ('scrollToAlignment' in $$props) $$invalidate(14, scrollToAlignment = $$props.scrollToAlignment);
		if ('scrollToBehaviour' in $$props) $$invalidate(15, scrollToBehaviour = $$props.scrollToBehaviour);
		if ('overscanCount' in $$props) $$invalidate(16, overscanCount = $$props.overscanCount);
		if ('$$scope' in $$props) $$invalidate(20, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		thirdEventArg,
		onMount,
		onDestroy,
		createEventDispatcher,
		SizeAndPositionManager,
		DIRECTION,
		SCROLL_CHANGE_REASON,
		SCROLL_PROP,
		SCROLL_PROP_LEGACY,
		height,
		width,
		itemCount,
		itemSize,
		estimatedItemSize,
		stickyIndices,
		getKey,
		scrollDirection,
		scrollOffset,
		scrollToIndex,
		scrollToAlignment,
		scrollToBehaviour,
		overscanCount,
		dispatchEvent,
		sizeAndPositionManager,
		mounted,
		wrapper,
		items,
		state,
		prevState,
		prevProps,
		styleCache,
		wrapperStyle,
		innerStyle,
		propsUpdated,
		stateUpdated,
		refresh,
		scrollTo,
		recomputeSizes,
		getOffsetForIndex,
		handleScroll,
		getWrapperOffset,
		getEstimatedItemSize,
		getStyle
	});

	$$self.$inject_state = $$props => {
		if ('height' in $$props) $$invalidate(5, height = $$props.height);
		if ('width' in $$props) $$invalidate(6, width = $$props.width);
		if ('itemCount' in $$props) $$invalidate(7, itemCount = $$props.itemCount);
		if ('itemSize' in $$props) $$invalidate(8, itemSize = $$props.itemSize);
		if ('estimatedItemSize' in $$props) $$invalidate(9, estimatedItemSize = $$props.estimatedItemSize);
		if ('stickyIndices' in $$props) $$invalidate(10, stickyIndices = $$props.stickyIndices);
		if ('getKey' in $$props) $$invalidate(0, getKey = $$props.getKey);
		if ('scrollDirection' in $$props) $$invalidate(11, scrollDirection = $$props.scrollDirection);
		if ('scrollOffset' in $$props) $$invalidate(12, scrollOffset = $$props.scrollOffset);
		if ('scrollToIndex' in $$props) $$invalidate(13, scrollToIndex = $$props.scrollToIndex);
		if ('scrollToAlignment' in $$props) $$invalidate(14, scrollToAlignment = $$props.scrollToAlignment);
		if ('scrollToBehaviour' in $$props) $$invalidate(15, scrollToBehaviour = $$props.scrollToBehaviour);
		if ('overscanCount' in $$props) $$invalidate(16, overscanCount = $$props.overscanCount);
		if ('mounted' in $$props) $$invalidate(18, mounted = $$props.mounted);
		if ('wrapper' in $$props) $$invalidate(1, wrapper = $$props.wrapper);
		if ('items' in $$props) $$invalidate(2, items = $$props.items);
		if ('state' in $$props) $$invalidate(19, state = $$props.state);
		if ('prevState' in $$props) prevState = $$props.prevState;
		if ('prevProps' in $$props) prevProps = $$props.prevProps;
		if ('styleCache' in $$props) styleCache = $$props.styleCache;
		if ('wrapperStyle' in $$props) $$invalidate(3, wrapperStyle = $$props.wrapperStyle);
		if ('innerStyle' in $$props) $$invalidate(4, innerStyle = $$props.innerStyle);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*scrollToIndex, scrollToAlignment, scrollOffset, itemCount, itemSize, estimatedItemSize*/ 29568) {
			{

				propsUpdated();
			}
		}

		if ($$self.$$.dirty[0] & /*state*/ 524288) {
			{

				stateUpdated();
			}
		}

		if ($$self.$$.dirty[0] & /*height, width, stickyIndices, mounted*/ 263264) {
			{

				if (mounted) recomputeSizes(0); // call scroll.reset;
			}
		}
	};

	return [
		getKey,
		wrapper,
		items,
		wrapperStyle,
		innerStyle,
		height,
		width,
		itemCount,
		itemSize,
		estimatedItemSize,
		stickyIndices,
		scrollDirection,
		scrollOffset,
		scrollToIndex,
		scrollToAlignment,
		scrollToBehaviour,
		overscanCount,
		recomputeSizes,
		mounted,
		state,
		$$scope,
		slots,
		div1_binding
	];
}

class VirtualList extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$b,
			create_fragment$b,
			safe_not_equal,
			{
				height: 5,
				width: 6,
				itemCount: 7,
				itemSize: 8,
				estimatedItemSize: 9,
				stickyIndices: 10,
				getKey: 0,
				scrollDirection: 11,
				scrollOffset: 12,
				scrollToIndex: 13,
				scrollToAlignment: 14,
				scrollToBehaviour: 15,
				overscanCount: 16,
				recomputeSizes: 17
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "VirtualList",
			options,
			id: create_fragment$b.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*height*/ ctx[5] === undefined && !('height' in props)) {
			console.warn("<VirtualList> was created without expected prop 'height'");
		}

		if (/*itemCount*/ ctx[7] === undefined && !('itemCount' in props)) {
			console.warn("<VirtualList> was created without expected prop 'itemCount'");
		}

		if (/*itemSize*/ ctx[8] === undefined && !('itemSize' in props)) {
			console.warn("<VirtualList> was created without expected prop 'itemSize'");
		}
	}

	get height() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set height(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get width() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set width(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get itemCount() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set itemCount(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get itemSize() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set itemSize(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get estimatedItemSize() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set estimatedItemSize(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get stickyIndices() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stickyIndices(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getKey() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set getKey(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollDirection() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scrollDirection(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollOffset() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scrollOffset(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollToIndex() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scrollToIndex(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollToAlignment() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scrollToAlignment(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollToBehaviour() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scrollToBehaviour(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get overscanCount() {
		throw new Error("<VirtualList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set overscanCount(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get recomputeSizes() {
		return this.$$.ctx[17];
	}

	set recomputeSizes(value) {
		throw new Error("<VirtualList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelecte/src/components/Dropdown.svelte generated by Svelte v3.49.0 */
const file$8 = "node_modules/svelecte/src/components/Dropdown.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[49] = list[i];
	child_ctx[51] = i;
	return child_ctx;
}

// (168:0) {#if isMounted && renderDropdown}
function create_if_block$5(ctx) {
	let div2;
	let div1;
	let div0;
	let t0;
	let t1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*items*/ ctx[5].length && create_if_block_4(ctx);
	let if_block1 = (/*hasEmptyList*/ ctx[18] || /*maxReached*/ ctx[2]) && create_if_block_3$1(ctx);
	let if_block2 = /*inputValue*/ ctx[8] && /*creatable*/ ctx[1] && !/*maxReached*/ ctx[2] && create_if_block_1$2(ctx);

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			attr_dev(div0, "class", "sv-dropdown-content svelte-aqpko7");
			toggle_class(div0, "max-reached", /*maxReached*/ ctx[2]);
			add_location(div0, file$8, 172, 4, 6278);
			attr_dev(div1, "class", "sv-dropdown-scroll svelte-aqpko7");
			attr_dev(div1, "tabindex", "-1");
			toggle_class(div1, "is-empty", !/*items*/ ctx[5].length);
			add_location(div1, file$8, 171, 2, 6165);
			attr_dev(div2, "class", "sv-dropdown svelte-aqpko7");
			attr_dev(div2, "aria-expanded", /*$hasDropdownOpened*/ ctx[26]);
			toggle_class(div2, "is-virtual", /*virtualList*/ ctx[7]);
			add_location(div2, file$8, 168, 0, 6037);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			if (if_block0) if_block0.m(div0, null);
			append_dev(div0, t0);
			if (if_block1) if_block1.m(div0, null);
			/*div0_binding*/ ctx[40](div0);
			/*div1_binding*/ ctx[41](div1);
			append_dev(div2, t1);
			if (if_block2) if_block2.m(div2, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(div2, "mousedown", prevent_default(/*mousedown_handler*/ ctx[34]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*items*/ ctx[5].length) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*items*/ 32) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div0, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*hasEmptyList*/ ctx[18] || /*maxReached*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_3$1(ctx);
					if_block1.c();
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*maxReached*/ 4) {
				toggle_class(div0, "max-reached", /*maxReached*/ ctx[2]);
			}

			if (dirty[0] & /*items*/ 32) {
				toggle_class(div1, "is-empty", !/*items*/ ctx[5].length);
			}

			if (/*inputValue*/ ctx[8] && /*creatable*/ ctx[1] && !/*maxReached*/ ctx[2]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_1$2(ctx);
					if_block2.c();
					if_block2.m(div2, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!current || dirty[0] & /*$hasDropdownOpened*/ 67108864) {
				attr_dev(div2, "aria-expanded", /*$hasDropdownOpened*/ ctx[26]);
			}

			if (dirty[0] & /*virtualList*/ 128) {
				toggle_class(div2, "is-virtual", /*virtualList*/ ctx[7]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			/*div0_binding*/ ctx[40](null);
			/*div1_binding*/ ctx[41](null);
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(168:0) {#if isMounted && renderDropdown}",
		ctx
	});

	return block;
}

// (174:4) {#if items.length}
function create_if_block_4(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_5, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*virtualList*/ ctx[7]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty$1();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(174:4) {#if items.length}",
		ctx
	});

	return block;
}

// (200:6) {:else}
function create_else_block$2(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*items*/ ctx[5];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty$1();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*listIndex, dropdownIndex, items, itemComponent, renderer, disabledField, inputValue, disableHighlight*/ 75065) {
				each_value = /*items*/ ctx[5];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(200:6) {:else}",
		ctx
	});

	return block;
}

// (175:6) {#if virtualList}
function create_if_block_5(ctx) {
	let virtuallist;
	let current;

	let virtuallist_props = {
		width: "100%",
		height: /*vl_listHeight*/ ctx[24],
		itemCount: /*items*/ ctx[5].length,
		itemSize: /*vl_itemSize*/ ctx[20],
		scrollToAlignment: "auto",
		scrollToIndex: !/*multiple*/ ctx[9] && /*dropdownIndex*/ ctx[0]
		? parseInt(/*dropdownIndex*/ ctx[0])
		: null,
		$$slots: {
			item: [
				create_item_slot,
				({ style, index }) => ({ 47: style, 48: index }),
				({ style, index }) => [0, (style ? 65536 : 0) | (index ? 131072 : 0)]
			]
		},
		$$scope: { ctx }
	};

	virtuallist = new VirtualList({ props: virtuallist_props, $$inline: true });
	/*virtuallist_binding*/ ctx[37](virtuallist);

	const block = {
		c: function create() {
			create_component(virtuallist.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(virtuallist, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const virtuallist_changes = {};
			if (dirty[0] & /*vl_listHeight*/ 16777216) virtuallist_changes.height = /*vl_listHeight*/ ctx[24];
			if (dirty[0] & /*items*/ 32) virtuallist_changes.itemCount = /*items*/ ctx[5].length;
			if (dirty[0] & /*vl_itemSize*/ 1048576) virtuallist_changes.itemSize = /*vl_itemSize*/ ctx[20];

			if (dirty[0] & /*multiple, dropdownIndex*/ 513) virtuallist_changes.scrollToIndex = !/*multiple*/ ctx[9] && /*dropdownIndex*/ ctx[0]
			? parseInt(/*dropdownIndex*/ ctx[0])
			: null;

			if (dirty[0] & /*dropdownIndex, items, itemComponent, renderer, listIndex, disabledField, inputValue, disableHighlight*/ 75065 | dirty[1] & /*$$scope, style, index*/ 2293760) {
				virtuallist_changes.$$scope = { dirty, ctx };
			}

			virtuallist.$set(virtuallist_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(virtuallist.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(virtuallist.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			/*virtuallist_binding*/ ctx[37](null);
			destroy_component(virtuallist, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(175:6) {#if virtualList}",
		ctx
	});

	return block;
}

// (201:8) {#each items as opt, i}
function create_each_block$3(ctx) {
	let div;
	let switch_instance;
	let t;
	let div_data_pos_value;
	let current;
	var switch_value = /*itemComponent*/ ctx[16];

	function switch_props(ctx) {
		return {
			props: {
				formatter: /*renderer*/ ctx[3],
				index: /*listIndex*/ ctx[10].map[/*i*/ ctx[51]],
				isDisabled: /*opt*/ ctx[49][/*disabledField*/ ctx[13]],
				item: /*opt*/ ctx[49],
				inputValue: /*inputValue*/ ctx[8],
				disableHighlight: /*disableHighlight*/ ctx[4]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("hover", /*hover_handler_1*/ ctx[38]);
		switch_instance.$on("select", /*select_handler_1*/ ctx[39]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
			attr_dev(div, "data-pos", div_data_pos_value = /*listIndex*/ ctx[10].map[/*i*/ ctx[51]]);
			attr_dev(div, "class", "sv-dd-item");
			toggle_class(div, "sv-dd-item-active", /*listIndex*/ ctx[10].map[/*i*/ ctx[51]] == /*dropdownIndex*/ ctx[0]);
			toggle_class(div, "sv-group-item", /*opt*/ ctx[49].$isGroupItem);
			toggle_class(div, "sv-group-header", /*opt*/ ctx[49].$isGroupHeader);
			add_location(div, file$8, 201, 10, 7436);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			append_dev(div, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*renderer*/ 8) switch_instance_changes.formatter = /*renderer*/ ctx[3];
			if (dirty[0] & /*listIndex*/ 1024) switch_instance_changes.index = /*listIndex*/ ctx[10].map[/*i*/ ctx[51]];
			if (dirty[0] & /*items, disabledField*/ 8224) switch_instance_changes.isDisabled = /*opt*/ ctx[49][/*disabledField*/ ctx[13]];
			if (dirty[0] & /*items*/ 32) switch_instance_changes.item = /*opt*/ ctx[49];
			if (dirty[0] & /*inputValue*/ 256) switch_instance_changes.inputValue = /*inputValue*/ ctx[8];
			if (dirty[0] & /*disableHighlight*/ 16) switch_instance_changes.disableHighlight = /*disableHighlight*/ ctx[4];

			if (switch_value !== (switch_value = /*itemComponent*/ ctx[16])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("hover", /*hover_handler_1*/ ctx[38]);
					switch_instance.$on("select", /*select_handler_1*/ ctx[39]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, t);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[0] & /*listIndex*/ 1024 && div_data_pos_value !== (div_data_pos_value = /*listIndex*/ ctx[10].map[/*i*/ ctx[51]])) {
				attr_dev(div, "data-pos", div_data_pos_value);
			}

			if (dirty[0] & /*listIndex, dropdownIndex*/ 1025) {
				toggle_class(div, "sv-dd-item-active", /*listIndex*/ ctx[10].map[/*i*/ ctx[51]] == /*dropdownIndex*/ ctx[0]);
			}

			if (dirty[0] & /*items*/ 32) {
				toggle_class(div, "sv-group-item", /*opt*/ ctx[49].$isGroupItem);
			}

			if (dirty[0] & /*items*/ 32) {
				toggle_class(div, "sv-group-header", /*opt*/ ctx[49].$isGroupHeader);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(201:8) {#each items as opt, i}",
		ctx
	});

	return block;
}

// (184:10) 
function create_item_slot(ctx) {
	let div;
	let switch_instance;
	let div_style_value;
	let current;
	var switch_value = /*itemComponent*/ ctx[16];

	function switch_props(ctx) {
		return {
			props: {
				formatter: /*renderer*/ ctx[3],
				index: /*listIndex*/ ctx[10].map[/*index*/ ctx[48]],
				isDisabled: /*items*/ ctx[5][/*index*/ ctx[48]][/*disabledField*/ ctx[13]],
				item: /*items*/ ctx[5][/*index*/ ctx[48]],
				inputValue: /*inputValue*/ ctx[8],
				disableHighlight: /*disableHighlight*/ ctx[4]
			},
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("hover", /*hover_handler*/ ctx[35]);
		switch_instance.$on("select", /*select_handler*/ ctx[36]);
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr_dev(div, "slot", "item");
			attr_dev(div, "style", div_style_value = /*style*/ ctx[47]);
			attr_dev(div, "class", "sv-dd-item");
			toggle_class(div, "sv-dd-item-active", /*index*/ ctx[48] == /*dropdownIndex*/ ctx[0]);
			toggle_class(div, "sv-group-item", /*items*/ ctx[5][/*index*/ ctx[48]].$isGroupItem);
			toggle_class(div, "sv-group-header", /*items*/ ctx[5][/*index*/ ctx[48]].$isGroupHeader);
			add_location(div, file$8, 183, 10, 6736);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty[0] & /*renderer*/ 8) switch_instance_changes.formatter = /*renderer*/ ctx[3];
			if (dirty[0] & /*listIndex*/ 1024 | dirty[1] & /*index*/ 131072) switch_instance_changes.index = /*listIndex*/ ctx[10].map[/*index*/ ctx[48]];
			if (dirty[0] & /*items, disabledField*/ 8224 | dirty[1] & /*index*/ 131072) switch_instance_changes.isDisabled = /*items*/ ctx[5][/*index*/ ctx[48]][/*disabledField*/ ctx[13]];
			if (dirty[0] & /*items*/ 32 | dirty[1] & /*index*/ 131072) switch_instance_changes.item = /*items*/ ctx[5][/*index*/ ctx[48]];
			if (dirty[0] & /*inputValue*/ 256) switch_instance_changes.inputValue = /*inputValue*/ ctx[8];
			if (dirty[0] & /*disableHighlight*/ 16) switch_instance_changes.disableHighlight = /*disableHighlight*/ ctx[4];

			if (switch_value !== (switch_value = /*itemComponent*/ ctx[16])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("hover", /*hover_handler*/ ctx[35]);
					switch_instance.$on("select", /*select_handler*/ ctx[36]);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[1] & /*style*/ 65536 && div_style_value !== (div_style_value = /*style*/ ctx[47])) {
				attr_dev(div, "style", div_style_value);
			}

			if (dirty[0] & /*dropdownIndex*/ 1 | dirty[1] & /*index*/ 131072) {
				toggle_class(div, "sv-dd-item-active", /*index*/ ctx[48] == /*dropdownIndex*/ ctx[0]);
			}

			if (dirty[0] & /*items*/ 32 | dirty[1] & /*index*/ 131072) {
				toggle_class(div, "sv-group-item", /*items*/ ctx[5][/*index*/ ctx[48]].$isGroupItem);
			}

			if (dirty[0] & /*items*/ 32 | dirty[1] & /*index*/ 131072) {
				toggle_class(div, "sv-group-header", /*items*/ ctx[5][/*index*/ ctx[48]].$isGroupHeader);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_item_slot.name,
		type: "slot",
		source: "(184:10) ",
		ctx
	});

	return block;
}

// (220:4) {#if hasEmptyList || maxReached}
function create_if_block_3$1(ctx) {
	let div;
	let t;

	const block = {
		c: function create() {
			div = element("div");
			t = text(/*listMessage*/ ctx[12]);
			attr_dev(div, "class", "empty-list-row svelte-aqpko7");
			add_location(div, file$8, 220, 6, 8098);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*listMessage*/ 4096) set_data_dev(t, /*listMessage*/ ctx[12]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(220:4) {#if hasEmptyList || maxReached}",
		ctx
	});

	return block;
}

// (225:2) {#if inputValue && creatable && !maxReached}
function create_if_block_1$2(ctx) {
	let div1;
	let div0;
	let html_tag;
	let raw_value = /*createLabel*/ ctx[14](/*inputValue*/ ctx[8]) + "";
	let t;
	let mounted;
	let dispose;
	let if_block = /*currentListLength*/ ctx[25] != /*dropdownIndex*/ ctx[0] && create_if_block_2$1(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			html_tag = new HtmlTag(false);
			t = space();
			if (if_block) if_block.c();
			html_tag.a = t;
			attr_dev(div0, "class", "creatable-row svelte-aqpko7");
			toggle_class(div0, "active", /*currentListLength*/ ctx[25] == /*dropdownIndex*/ ctx[0]);
			toggle_class(div0, "is-disabled", /*alreadyCreated*/ ctx[6].includes(/*inputValue*/ ctx[8]));
			add_location(div0, file$8, 226, 6, 8302);
			attr_dev(div1, "class", "creatable-row-wrap svelte-aqpko7");
			add_location(div1, file$8, 225, 4, 8262);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			html_tag.m(raw_value, div0);
			append_dev(div0, t);
			if (if_block) if_block.m(div0, null);

			if (!mounted) {
				dispose = [
					listen_dev(
						div0,
						"click",
						function () {
							if (is_function(/*dispatch*/ ctx[27]('select', /*inputValue*/ ctx[8]))) /*dispatch*/ ctx[27]('select', /*inputValue*/ ctx[8]).apply(this, arguments);
						},
						false,
						false,
						false
					),
					listen_dev(
						div0,
						"mouseenter",
						function () {
							if (is_function(/*dispatch*/ ctx[27]('hover', /*listIndex*/ ctx[10].last))) /*dispatch*/ ctx[27]('hover', /*listIndex*/ ctx[10].last).apply(this, arguments);
						},
						false,
						false,
						false
					)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*createLabel, inputValue*/ 16640 && raw_value !== (raw_value = /*createLabel*/ ctx[14](/*inputValue*/ ctx[8]) + "")) html_tag.p(raw_value);

			if (/*currentListLength*/ ctx[25] != /*dropdownIndex*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2$1(ctx);
					if_block.c();
					if_block.m(div0, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*currentListLength, dropdownIndex*/ 33554433) {
				toggle_class(div0, "active", /*currentListLength*/ ctx[25] == /*dropdownIndex*/ ctx[0]);
			}

			if (dirty[0] & /*alreadyCreated, inputValue*/ 320) {
				toggle_class(div0, "is-disabled", /*alreadyCreated*/ ctx[6].includes(/*inputValue*/ ctx[8]));
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(225:2) {#if inputValue && creatable && !maxReached}",
		ctx
	});

	return block;
}

// (232:6) {#if currentListLength != dropdownIndex}
function create_if_block_2$1(ctx) {
	let span;
	let kbd0;
	let t0;
	let t1;
	let kbd1;

	const block = {
		c: function create() {
			span = element("span");
			kbd0 = element("kbd");
			t0 = text(/*metaKey*/ ctx[15]);
			t1 = text("+");
			kbd1 = element("kbd");
			kbd1.textContent = "Enter";
			attr_dev(kbd0, "class", "svelte-aqpko7");
			add_location(kbd0, file$8, 232, 31, 8673);
			attr_dev(kbd1, "class", "svelte-aqpko7");
			add_location(kbd1, file$8, 232, 52, 8694);
			attr_dev(span, "class", "shortcut svelte-aqpko7");
			add_location(span, file$8, 232, 8, 8650);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, kbd0);
			append_dev(kbd0, t0);
			append_dev(span, t1);
			append_dev(span, kbd1);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*metaKey*/ 32768) set_data_dev(t0, /*metaKey*/ ctx[15]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(232:6) {#if currentListLength != dropdownIndex}",
		ctx
	});

	return block;
}

function create_fragment$a(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*isMounted*/ ctx[17] && /*renderDropdown*/ ctx[19] && create_if_block$5(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty$1();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*isMounted*/ ctx[17] && /*renderDropdown*/ ctx[19]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*isMounted, renderDropdown*/ 655360) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$5(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let currentListLength;
	let vl_listHeight;

	let $hasDropdownOpened,
		$$unsubscribe_hasDropdownOpened = noop$2,
		$$subscribe_hasDropdownOpened = () => ($$unsubscribe_hasDropdownOpened(), $$unsubscribe_hasDropdownOpened = subscribe(hasDropdownOpened, $$value => $$invalidate(26, $hasDropdownOpened = $$value)), hasDropdownOpened);

	$$self.$$.on_destroy.push(() => $$unsubscribe_hasDropdownOpened());
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Dropdown', slots, []);
	let { lazyDropdown } = $$props;
	let { creatable } = $$props;
	let { maxReached = false } = $$props;
	let { dropdownIndex = 0 } = $$props;
	let { renderer } = $$props;
	let { disableHighlight } = $$props;
	let { items = [] } = $$props;
	let { alreadyCreated } = $$props;
	let { virtualList } = $$props;
	let { vlItemSize } = $$props;
	let { vlHeight } = $$props;
	let { inputValue } = $$props;
	let { multiple } = $$props;
	let { listIndex } = $$props;
	let { hasDropdownOpened } = $$props;
	validate_store(hasDropdownOpened, 'hasDropdownOpened');
	$$subscribe_hasDropdownOpened();
	let { listMessage } = $$props;
	let { disabledField } = $$props;
	let { createLabel } = $$props;
	let { metaKey } = $$props;
	let { itemComponent } = $$props;

	function scrollIntoView(params) {
		if (virtualList) return;
		const focusedEl = container.querySelector(`[data-pos="${dropdownIndex}"]`);
		if (!focusedEl) return;
		const focusedRect = focusedEl.getBoundingClientRect();
		const menuRect = scrollContainer.getBoundingClientRect();
		const overScroll = focusedEl.offsetHeight / 3;

		const centerOffset = params && params.center
		? scrollContainer.offsetHeight / 2
		: 0;

		switch (true) {
			case focusedEl.offsetTop < scrollContainer.scrollTop:
				$$invalidate(22, scrollContainer.scrollTop = focusedEl.offsetTop - overScroll + centerOffset, scrollContainer);
				break;
			case focusedEl.offsetTop + focusedRect.height > scrollContainer.scrollTop + menuRect.height:
				$$invalidate(22, scrollContainer.scrollTop = focusedEl.offsetTop + focusedRect.height - scrollContainer.offsetHeight + overScroll + centerOffset, scrollContainer);
				break;
		}
	}

	function getDimensions() {
		if (virtualList) {
			return [scrollContainer.offsetHeight, vl_itemSize];
		}

		return [scrollContainer.offsetHeight, container.firstElementChild.offsetHeight];
	}

	const dispatch = createEventDispatcher();
	let container;
	let scrollContainer;
	let isMounted = false;
	let hasEmptyList = false;
	let renderDropdown = !lazyDropdown;
	let vl_height = vlHeight;
	let vl_itemSize = vlItemSize;
	let vl_autoMode = vlHeight === null && vlItemSize === null;
	let refVirtualList;

	function positionDropdown(val) {
		if (!scrollContainer && !renderDropdown) return;
		const outVp = isOutOfViewport(scrollContainer);

		if (outVp.bottom && !outVp.top) {
			$$invalidate(22, scrollContainer.parentElement.style.bottom = scrollContainer.parentElement.parentElement.clientHeight + 1 + 'px', scrollContainer);
		} else if (!val || outVp.top) {
			$$invalidate(22, scrollContainer.parentElement.style.bottom = '', scrollContainer); // FUTURE: debounce ....
		}
	}

	function virtualListDimensionsResolver() {
		if (!refVirtualList) return;

		const pixelGetter = (el, prop) => {
			const styles = window.getComputedStyle(el);
			let { groups: { value, unit } } = styles[prop].match(/(?<value>\d+)(?<unit>[a-zA-Z]+)/);
			value = parseFloat(value);

			if (unit !== 'px') {
				const el = unit === 'rem'
				? document.documentElement
				: scrollContainer.parentElement.parentElement;

				const multipler = parseFloat(window.getComputedStyle(el).fontSize.match(/\d+/).shift());
				value = multipler * value;
			}

			return value;
		};

		$$invalidate(33, vl_height = pixelGetter(scrollContainer, 'maxHeight') - pixelGetter(scrollContainer, 'paddingTop') - pixelGetter(scrollContainer, 'paddingBottom'));

		// get item size (hacky style)
		$$invalidate(22, scrollContainer.parentElement.style = 'opacity: 0; display: block', scrollContainer);

		const firstItem = refVirtualList.$$.ctx[1].firstElementChild.firstElementChild;

		if (firstItem) {
			firstItem.style = '';
			const firstSize = firstItem.getBoundingClientRect().height;
			const secondItem = refVirtualList.$$.ctx[1].firstElementChild.firstElementChild.nextElementSibling;
			let secondSize;

			if (secondItem) {
				secondItem.style = '';
				secondSize = secondItem.getBoundingClientRect().height;
			}

			if (firstSize !== secondSize) {
				const groupHeaderSize = items[0].$isGroupHeader ? firstSize : secondSize;
				const regularItemSize = items[0].$isGroupHeader ? secondSize : firstSize;
				$$invalidate(20, vl_itemSize = items.map(opt => opt.$isGroupHeader ? groupHeaderSize : regularItemSize));
			} else {
				$$invalidate(20, vl_itemSize = firstSize);
			}
		}

		$$invalidate(22, scrollContainer.parentElement.style = '', scrollContainer);
	}

	let dropdownStateSubscription = () => {
		
	};

	let onScrollHandler = null;

	/** ************************************ lifecycle */
	onMount(() => {
		/** ************************************ flawless UX related tweak */
		dropdownStateSubscription = hasDropdownOpened.subscribe(val => {
			if (!renderDropdown && val) $$invalidate(19, renderDropdown = true);

			tick().then(() => {
				positionDropdown(val);
				val && scrollIntoView({ center: true });
			});

			if (!onScrollHandler) onScrollHandler = () => positionDropdown(val);

			// bind/unbind scroll listener
			document[val ? 'addEventListener' : 'removeEventListener']('scroll', onScrollHandler, { passive: true });
		});

		$$invalidate(17, isMounted = true);
	});

	onDestroy(() => dropdownStateSubscription());

	const writable_props = [
		'lazyDropdown',
		'creatable',
		'maxReached',
		'dropdownIndex',
		'renderer',
		'disableHighlight',
		'items',
		'alreadyCreated',
		'virtualList',
		'vlItemSize',
		'vlHeight',
		'inputValue',
		'multiple',
		'listIndex',
		'hasDropdownOpened',
		'listMessage',
		'disabledField',
		'createLabel',
		'metaKey',
		'itemComponent'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dropdown> was created with unknown prop '${key}'`);
	});

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function hover_handler(event) {
		bubble.call(this, $$self, event);
	}

	function select_handler(event) {
		bubble.call(this, $$self, event);
	}

	function virtuallist_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			refVirtualList = $$value;
			$$invalidate(23, refVirtualList);
		});
	}

	function hover_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function select_handler_1(event) {
		bubble.call(this, $$self, event);
	}

	function div0_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(21, container);
		});
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			scrollContainer = $$value;
			$$invalidate(22, scrollContainer);
		});
	}

	$$self.$$set = $$props => {
		if ('lazyDropdown' in $$props) $$invalidate(28, lazyDropdown = $$props.lazyDropdown);
		if ('creatable' in $$props) $$invalidate(1, creatable = $$props.creatable);
		if ('maxReached' in $$props) $$invalidate(2, maxReached = $$props.maxReached);
		if ('dropdownIndex' in $$props) $$invalidate(0, dropdownIndex = $$props.dropdownIndex);
		if ('renderer' in $$props) $$invalidate(3, renderer = $$props.renderer);
		if ('disableHighlight' in $$props) $$invalidate(4, disableHighlight = $$props.disableHighlight);
		if ('items' in $$props) $$invalidate(5, items = $$props.items);
		if ('alreadyCreated' in $$props) $$invalidate(6, alreadyCreated = $$props.alreadyCreated);
		if ('virtualList' in $$props) $$invalidate(7, virtualList = $$props.virtualList);
		if ('vlItemSize' in $$props) $$invalidate(29, vlItemSize = $$props.vlItemSize);
		if ('vlHeight' in $$props) $$invalidate(30, vlHeight = $$props.vlHeight);
		if ('inputValue' in $$props) $$invalidate(8, inputValue = $$props.inputValue);
		if ('multiple' in $$props) $$invalidate(9, multiple = $$props.multiple);
		if ('listIndex' in $$props) $$invalidate(10, listIndex = $$props.listIndex);
		if ('hasDropdownOpened' in $$props) $$subscribe_hasDropdownOpened($$invalidate(11, hasDropdownOpened = $$props.hasDropdownOpened));
		if ('listMessage' in $$props) $$invalidate(12, listMessage = $$props.listMessage);
		if ('disabledField' in $$props) $$invalidate(13, disabledField = $$props.disabledField);
		if ('createLabel' in $$props) $$invalidate(14, createLabel = $$props.createLabel);
		if ('metaKey' in $$props) $$invalidate(15, metaKey = $$props.metaKey);
		if ('itemComponent' in $$props) $$invalidate(16, itemComponent = $$props.itemComponent);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		onDestroy,
		onMount,
		tick,
		VirtualList,
		isOutOfViewport,
		lazyDropdown,
		creatable,
		maxReached,
		dropdownIndex,
		renderer,
		disableHighlight,
		items,
		alreadyCreated,
		virtualList,
		vlItemSize,
		vlHeight,
		inputValue,
		multiple,
		listIndex,
		hasDropdownOpened,
		listMessage,
		disabledField,
		createLabel,
		metaKey,
		itemComponent,
		scrollIntoView,
		getDimensions,
		dispatch,
		container,
		scrollContainer,
		isMounted,
		hasEmptyList,
		renderDropdown,
		vl_height,
		vl_itemSize,
		vl_autoMode,
		refVirtualList,
		positionDropdown,
		virtualListDimensionsResolver,
		dropdownStateSubscription,
		onScrollHandler,
		vl_listHeight,
		currentListLength,
		$hasDropdownOpened
	});

	$$self.$inject_state = $$props => {
		if ('lazyDropdown' in $$props) $$invalidate(28, lazyDropdown = $$props.lazyDropdown);
		if ('creatable' in $$props) $$invalidate(1, creatable = $$props.creatable);
		if ('maxReached' in $$props) $$invalidate(2, maxReached = $$props.maxReached);
		if ('dropdownIndex' in $$props) $$invalidate(0, dropdownIndex = $$props.dropdownIndex);
		if ('renderer' in $$props) $$invalidate(3, renderer = $$props.renderer);
		if ('disableHighlight' in $$props) $$invalidate(4, disableHighlight = $$props.disableHighlight);
		if ('items' in $$props) $$invalidate(5, items = $$props.items);
		if ('alreadyCreated' in $$props) $$invalidate(6, alreadyCreated = $$props.alreadyCreated);
		if ('virtualList' in $$props) $$invalidate(7, virtualList = $$props.virtualList);
		if ('vlItemSize' in $$props) $$invalidate(29, vlItemSize = $$props.vlItemSize);
		if ('vlHeight' in $$props) $$invalidate(30, vlHeight = $$props.vlHeight);
		if ('inputValue' in $$props) $$invalidate(8, inputValue = $$props.inputValue);
		if ('multiple' in $$props) $$invalidate(9, multiple = $$props.multiple);
		if ('listIndex' in $$props) $$invalidate(10, listIndex = $$props.listIndex);
		if ('hasDropdownOpened' in $$props) $$subscribe_hasDropdownOpened($$invalidate(11, hasDropdownOpened = $$props.hasDropdownOpened));
		if ('listMessage' in $$props) $$invalidate(12, listMessage = $$props.listMessage);
		if ('disabledField' in $$props) $$invalidate(13, disabledField = $$props.disabledField);
		if ('createLabel' in $$props) $$invalidate(14, createLabel = $$props.createLabel);
		if ('metaKey' in $$props) $$invalidate(15, metaKey = $$props.metaKey);
		if ('itemComponent' in $$props) $$invalidate(16, itemComponent = $$props.itemComponent);
		if ('container' in $$props) $$invalidate(21, container = $$props.container);
		if ('scrollContainer' in $$props) $$invalidate(22, scrollContainer = $$props.scrollContainer);
		if ('isMounted' in $$props) $$invalidate(17, isMounted = $$props.isMounted);
		if ('hasEmptyList' in $$props) $$invalidate(18, hasEmptyList = $$props.hasEmptyList);
		if ('renderDropdown' in $$props) $$invalidate(19, renderDropdown = $$props.renderDropdown);
		if ('vl_height' in $$props) $$invalidate(33, vl_height = $$props.vl_height);
		if ('vl_itemSize' in $$props) $$invalidate(20, vl_itemSize = $$props.vl_itemSize);
		if ('vl_autoMode' in $$props) $$invalidate(44, vl_autoMode = $$props.vl_autoMode);
		if ('refVirtualList' in $$props) $$invalidate(23, refVirtualList = $$props.refVirtualList);
		if ('dropdownStateSubscription' in $$props) dropdownStateSubscription = $$props.dropdownStateSubscription;
		if ('onScrollHandler' in $$props) onScrollHandler = $$props.onScrollHandler;
		if ('vl_listHeight' in $$props) $$invalidate(24, vl_listHeight = $$props.vl_listHeight);
		if ('currentListLength' in $$props) $$invalidate(25, currentListLength = $$props.currentListLength);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*items*/ 32) {
			$$invalidate(25, currentListLength = items.length);
		}

		if ($$self.$$.dirty[0] & /*items, creatable, inputValue, virtualList, isMounted, renderDropdown, hasEmptyList*/ 917922) {
			{
				$$invalidate(18, hasEmptyList = items.length < 1 && (creatable ? !inputValue : true));

				// required when changing item list 'on-the-fly' for VL
				if (virtualList && vl_autoMode && isMounted && renderDropdown) {
					if (hasEmptyList) $$invalidate(0, dropdownIndex = null);
					$$invalidate(20, vl_itemSize = 0);
					tick().then(virtualListDimensionsResolver).then(positionDropdown);
				}
			}
		}

		if ($$self.$$.dirty[0] & /*vl_itemSize, items*/ 1048608 | $$self.$$.dirty[1] & /*vl_height*/ 4) {
			$$invalidate(24, vl_listHeight = Math.min(vl_height, Array.isArray(vl_itemSize)
			? vl_itemSize.reduce(
					(res, num) => {
						res += num;
						return res;
					},
					0
				)
			: items.length * vl_itemSize));
		}
	};

	return [
		dropdownIndex,
		creatable,
		maxReached,
		renderer,
		disableHighlight,
		items,
		alreadyCreated,
		virtualList,
		inputValue,
		multiple,
		listIndex,
		hasDropdownOpened,
		listMessage,
		disabledField,
		createLabel,
		metaKey,
		itemComponent,
		isMounted,
		hasEmptyList,
		renderDropdown,
		vl_itemSize,
		container,
		scrollContainer,
		refVirtualList,
		vl_listHeight,
		currentListLength,
		$hasDropdownOpened,
		dispatch,
		lazyDropdown,
		vlItemSize,
		vlHeight,
		scrollIntoView,
		getDimensions,
		vl_height,
		mousedown_handler,
		hover_handler,
		select_handler,
		virtuallist_binding,
		hover_handler_1,
		select_handler_1,
		div0_binding,
		div1_binding
	];
}

class Dropdown extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$a,
			create_fragment$a,
			safe_not_equal,
			{
				lazyDropdown: 28,
				creatable: 1,
				maxReached: 2,
				dropdownIndex: 0,
				renderer: 3,
				disableHighlight: 4,
				items: 5,
				alreadyCreated: 6,
				virtualList: 7,
				vlItemSize: 29,
				vlHeight: 30,
				inputValue: 8,
				multiple: 9,
				listIndex: 10,
				hasDropdownOpened: 11,
				listMessage: 12,
				disabledField: 13,
				createLabel: 14,
				metaKey: 15,
				itemComponent: 16,
				scrollIntoView: 31,
				getDimensions: 32
			},
			null,
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Dropdown",
			options,
			id: create_fragment$a.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*lazyDropdown*/ ctx[28] === undefined && !('lazyDropdown' in props)) {
			console.warn("<Dropdown> was created without expected prop 'lazyDropdown'");
		}

		if (/*creatable*/ ctx[1] === undefined && !('creatable' in props)) {
			console.warn("<Dropdown> was created without expected prop 'creatable'");
		}

		if (/*renderer*/ ctx[3] === undefined && !('renderer' in props)) {
			console.warn("<Dropdown> was created without expected prop 'renderer'");
		}

		if (/*disableHighlight*/ ctx[4] === undefined && !('disableHighlight' in props)) {
			console.warn("<Dropdown> was created without expected prop 'disableHighlight'");
		}

		if (/*alreadyCreated*/ ctx[6] === undefined && !('alreadyCreated' in props)) {
			console.warn("<Dropdown> was created without expected prop 'alreadyCreated'");
		}

		if (/*virtualList*/ ctx[7] === undefined && !('virtualList' in props)) {
			console.warn("<Dropdown> was created without expected prop 'virtualList'");
		}

		if (/*vlItemSize*/ ctx[29] === undefined && !('vlItemSize' in props)) {
			console.warn("<Dropdown> was created without expected prop 'vlItemSize'");
		}

		if (/*vlHeight*/ ctx[30] === undefined && !('vlHeight' in props)) {
			console.warn("<Dropdown> was created without expected prop 'vlHeight'");
		}

		if (/*inputValue*/ ctx[8] === undefined && !('inputValue' in props)) {
			console.warn("<Dropdown> was created without expected prop 'inputValue'");
		}

		if (/*multiple*/ ctx[9] === undefined && !('multiple' in props)) {
			console.warn("<Dropdown> was created without expected prop 'multiple'");
		}

		if (/*listIndex*/ ctx[10] === undefined && !('listIndex' in props)) {
			console.warn("<Dropdown> was created without expected prop 'listIndex'");
		}

		if (/*hasDropdownOpened*/ ctx[11] === undefined && !('hasDropdownOpened' in props)) {
			console.warn("<Dropdown> was created without expected prop 'hasDropdownOpened'");
		}

		if (/*listMessage*/ ctx[12] === undefined && !('listMessage' in props)) {
			console.warn("<Dropdown> was created without expected prop 'listMessage'");
		}

		if (/*disabledField*/ ctx[13] === undefined && !('disabledField' in props)) {
			console.warn("<Dropdown> was created without expected prop 'disabledField'");
		}

		if (/*createLabel*/ ctx[14] === undefined && !('createLabel' in props)) {
			console.warn("<Dropdown> was created without expected prop 'createLabel'");
		}

		if (/*metaKey*/ ctx[15] === undefined && !('metaKey' in props)) {
			console.warn("<Dropdown> was created without expected prop 'metaKey'");
		}

		if (/*itemComponent*/ ctx[16] === undefined && !('itemComponent' in props)) {
			console.warn("<Dropdown> was created without expected prop 'itemComponent'");
		}
	}

	get lazyDropdown() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set lazyDropdown(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get creatable() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set creatable(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get maxReached() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set maxReached(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dropdownIndex() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dropdownIndex(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get renderer() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set renderer(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disableHighlight() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disableHighlight(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get items() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set items(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get alreadyCreated() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set alreadyCreated(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get virtualList() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set virtualList(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get vlItemSize() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set vlItemSize(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get vlHeight() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set vlHeight(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputValue() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputValue(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get multiple() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set multiple(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get listIndex() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set listIndex(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasDropdownOpened() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasDropdownOpened(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get listMessage() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set listMessage(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabledField() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabledField(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get createLabel() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set createLabel(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get metaKey() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set metaKey(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get itemComponent() {
		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set itemComponent(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scrollIntoView() {
		return this.$$.ctx[31];
	}

	set scrollIntoView(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getDimensions() {
		return this.$$.ctx[32];
	}

	set getDimensions(value) {
		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelecte/src/components/ItemClose.svelte generated by Svelte v3.49.0 */

const file$7 = "node_modules/svelecte/src/components/ItemClose.svelte";

function create_fragment$9(ctx) {
	let button;
	let svg;
	let path;

	const block = {
		c: function create() {
			button = element("button");
			svg = svg_element("svg");
			path = svg_element("path");
			attr_dev(path, "d", "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z");
			add_location(path, file$7, 1, 87, 168);
			attr_dev(svg, "height", "16");
			attr_dev(svg, "width", "16");
			attr_dev(svg, "viewBox", "0 0 20 20");
			attr_dev(svg, "aria-hidden", "true");
			attr_dev(svg, "focusable", "false");
			attr_dev(svg, "class", "svelte-w7c5vi");
			add_location(svg, file$7, 1, 2, 83);
			attr_dev(button, "class", "sv-item-btn svelte-w7c5vi");
			attr_dev(button, "tabindex", "-1");
			attr_dev(button, "data-action", "deselect");
			attr_dev(button, "type", "button");
			add_location(button, file$7, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, svg);
			append_dev(svg, path);
		},
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ItemClose', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ItemClose> was created with unknown prop '${key}'`);
	});

	return [];
}

class ItemClose extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ItemClose",
			options,
			id: create_fragment$9.name
		});
	}
}

const mouseDownAction = e => e.preventDefault();

function itemActions(node, {item, index}) {

  function selectAction(e) {
    const eventType = e.target.closest('[data-action="deselect"]') ? 'deselect' : 'select';
    node.dispatchEvent(new CustomEvent(eventType, {
      bubble: true,
      detail: item
    }));
  }

  function hoverAction() {
    node.dispatchEvent(new CustomEvent('hover', {
      detail: index
    }));
  }
  node.onmousedown = mouseDownAction;
  node.onclick = selectAction;
  // !item.isSelected && 
  node.addEventListener('mouseenter', hoverAction);

  return {
    update(updated) {
      item = updated.item;
      index = updated.index;
    },
    destroy() {
      node.removeEventListener('mousedown', mouseDownAction);
      node.removeEventListener('click', selectAction);
      // !item.isSelected && 
      node.removeEventListener('mouseenter', hoverAction);
    }
  }
}

/* node_modules/svelecte/src/components/Item.svelte generated by Svelte v3.49.0 */
const file$6 = "node_modules/svelecte/src/components/Item.svelte";

// (20:0) {:else}
function create_else_block$1(ctx) {
	let div;
	let html_tag;

	let raw_value = (/*isSelected*/ ctx[3]
	? `<div class="sv-item-content">${/*formatter*/ ctx[6](/*item*/ ctx[2], /*isSelected*/ ctx[3], /*inputValue*/ ctx[0])}</div>`
	: highlightSearch(/*item*/ ctx[2], /*isSelected*/ ctx[3], /*inputValue*/ ctx[0], /*formatter*/ ctx[6], /*disableHighlight*/ ctx[7])) + "";

	let t;
	let div_title_value;
	let itemActions_action;
	let current;
	let mounted;
	let dispose;
	let if_block = /*isSelected*/ ctx[3] && /*isMultiple*/ ctx[5] && create_if_block_1$1(ctx);

	const block = {
		c: function create() {
			div = element("div");
			html_tag = new HtmlTag(false);
			t = space();
			if (if_block) if_block.c();
			html_tag.a = t;
			attr_dev(div, "class", "sv-item");
			attr_dev(div, "title", div_title_value = /*item*/ ctx[2].$created ? 'Created item' : '');
			toggle_class(div, "is-disabled", /*isDisabled*/ ctx[4]);
			add_location(div, file$6, 20, 0, 564);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			html_tag.m(raw_value, div);
			append_dev(div, t);
			if (if_block) if_block.m(div, null);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(itemActions_action = itemActions.call(null, div, {
						item: /*item*/ ctx[2],
						index: /*index*/ ctx[1]
					})),
					listen_dev(div, "select", /*select_handler*/ ctx[9], false, false, false),
					listen_dev(div, "deselect", /*deselect_handler*/ ctx[10], false, false, false),
					listen_dev(div, "hover", /*hover_handler*/ ctx[11], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*isSelected, formatter, item, inputValue, disableHighlight*/ 205) && raw_value !== (raw_value = (/*isSelected*/ ctx[3]
			? `<div class="sv-item-content">${/*formatter*/ ctx[6](/*item*/ ctx[2], /*isSelected*/ ctx[3], /*inputValue*/ ctx[0])}</div>`
			: highlightSearch(/*item*/ ctx[2], /*isSelected*/ ctx[3], /*inputValue*/ ctx[0], /*formatter*/ ctx[6], /*disableHighlight*/ ctx[7])) + "")) html_tag.p(raw_value);

			if (/*isSelected*/ ctx[3] && /*isMultiple*/ ctx[5]) {
				if (if_block) {
					if (dirty & /*isSelected, isMultiple*/ 40) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*item*/ 4 && div_title_value !== (div_title_value = /*item*/ ctx[2].$created ? 'Created item' : '')) {
				attr_dev(div, "title", div_title_value);
			}

			if (itemActions_action && is_function(itemActions_action.update) && dirty & /*item, index*/ 6) itemActions_action.update.call(null, {
				item: /*item*/ ctx[2],
				index: /*index*/ ctx[1]
			});

			if (dirty & /*isDisabled*/ 16) {
				toggle_class(div, "is-disabled", /*isDisabled*/ ctx[4]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(20:0) {:else}",
		ctx
	});

	return block;
}

// (18:0) {#if item.$isGroupHeader}
function create_if_block$4(ctx) {
	let div;
	let b;
	let t_value = /*item*/ ctx[2].label + "";
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			b = element("b");
			t = text(t_value);
			add_location(b, file$6, 18, 57, 528);
			attr_dev(div, "class", "optgroup-header svelte-1e087o6");
			add_location(div, file$6, 18, 0, 471);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, b);
			append_dev(b, t);

			if (!mounted) {
				dispose = listen_dev(div, "mousedown", prevent_default(/*mousedown_handler*/ ctx[8]), false, true, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*item*/ 4 && t_value !== (t_value = /*item*/ ctx[2].label + "")) set_data_dev(t, t_value);
		},
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(18:0) {#if item.$isGroupHeader}",
		ctx
	});

	return block;
}

// (33:2) {#if isSelected && isMultiple}
function create_if_block_1$1(ctx) {
	let itemclose;
	let current;
	itemclose = new ItemClose({ $$inline: true });

	const block = {
		c: function create() {
			create_component(itemclose.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(itemclose, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(itemclose.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(itemclose.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(itemclose, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(33:2) {#if isSelected && isMultiple}",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$4, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*item*/ ctx[2].$isGroupHeader) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty$1();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$8($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Item', slots, []);
	let { inputValue } = $$props;
	let { index = -1 } = $$props;
	let { item = {} } = $$props;
	let { isSelected = false } = $$props;
	let { isDisabled = false } = $$props;
	let { isMultiple = false } = $$props;
	let { formatter = null } = $$props;
	let { disableHighlight = false } = $$props;

	const writable_props = [
		'inputValue',
		'index',
		'item',
		'isSelected',
		'isDisabled',
		'isMultiple',
		'formatter',
		'disableHighlight'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Item> was created with unknown prop '${key}'`);
	});

	function mousedown_handler(event) {
		bubble.call(this, $$self, event);
	}

	function select_handler(event) {
		bubble.call(this, $$self, event);
	}

	function deselect_handler(event) {
		bubble.call(this, $$self, event);
	}

	function hover_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('inputValue' in $$props) $$invalidate(0, inputValue = $$props.inputValue);
		if ('index' in $$props) $$invalidate(1, index = $$props.index);
		if ('item' in $$props) $$invalidate(2, item = $$props.item);
		if ('isSelected' in $$props) $$invalidate(3, isSelected = $$props.isSelected);
		if ('isDisabled' in $$props) $$invalidate(4, isDisabled = $$props.isDisabled);
		if ('isMultiple' in $$props) $$invalidate(5, isMultiple = $$props.isMultiple);
		if ('formatter' in $$props) $$invalidate(6, formatter = $$props.formatter);
		if ('disableHighlight' in $$props) $$invalidate(7, disableHighlight = $$props.disableHighlight);
	};

	$$self.$capture_state = () => ({
		ItemClose,
		itemActions,
		highlightSearch,
		inputValue,
		index,
		item,
		isSelected,
		isDisabled,
		isMultiple,
		formatter,
		disableHighlight
	});

	$$self.$inject_state = $$props => {
		if ('inputValue' in $$props) $$invalidate(0, inputValue = $$props.inputValue);
		if ('index' in $$props) $$invalidate(1, index = $$props.index);
		if ('item' in $$props) $$invalidate(2, item = $$props.item);
		if ('isSelected' in $$props) $$invalidate(3, isSelected = $$props.isSelected);
		if ('isDisabled' in $$props) $$invalidate(4, isDisabled = $$props.isDisabled);
		if ('isMultiple' in $$props) $$invalidate(5, isMultiple = $$props.isMultiple);
		if ('formatter' in $$props) $$invalidate(6, formatter = $$props.formatter);
		if ('disableHighlight' in $$props) $$invalidate(7, disableHighlight = $$props.disableHighlight);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		inputValue,
		index,
		item,
		isSelected,
		isDisabled,
		isMultiple,
		formatter,
		disableHighlight,
		mousedown_handler,
		select_handler,
		deselect_handler,
		hover_handler
	];
}

class Item extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, {
			inputValue: 0,
			index: 1,
			item: 2,
			isSelected: 3,
			isDisabled: 4,
			isMultiple: 5,
			formatter: 6,
			disableHighlight: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Item",
			options,
			id: create_fragment$8.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*inputValue*/ ctx[0] === undefined && !('inputValue' in props)) {
			console.warn("<Item> was created without expected prop 'inputValue'");
		}
	}

	get inputValue() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputValue(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get index() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set index(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get item() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set item(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isSelected() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isSelected(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isDisabled() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isDisabled(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isMultiple() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isMultiple(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get formatter() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set formatter(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disableHighlight() {
		throw new Error("<Item>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disableHighlight(value) {
		throw new Error("<Item>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* node_modules/svelecte/src/Svelecte.svelte generated by Svelte v3.49.0 */

const { Object: Object_1$1, console: console_1 } = globals;
const file$5 = "node_modules/svelecte/src/Svelecte.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[115] = list[i];
	return child_ctx;
}

const get_icon_slot_changes = dirty => ({});
const get_icon_slot_context = ctx => ({});

// (655:4) 
function create_icon_slot(ctx) {
	let div;
	let current;
	const icon_slot_template = /*#slots*/ ctx[90].icon;
	const icon_slot = create_slot(icon_slot_template, ctx, /*$$scope*/ ctx[95], get_icon_slot_context);

	const block = {
		c: function create() {
			div = element("div");
			if (icon_slot) icon_slot.c();
			attr_dev(div, "slot", "icon");
			attr_dev(div, "class", "icon-slot svelte-1lvkhl0");
			add_location(div, file$5, 654, 4, 23771);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (icon_slot) {
				icon_slot.m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (icon_slot) {
				if (icon_slot.p && (!current || dirty[3] & /*$$scope*/ 4)) {
					update_slot_base(
						icon_slot,
						icon_slot_template,
						ctx,
						/*$$scope*/ ctx[95],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[95])
						: get_slot_changes(icon_slot_template, /*$$scope*/ ctx[95], dirty, get_icon_slot_changes),
						get_icon_slot_context
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (icon_slot) icon_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_icon_slot.name,
		type: "slot",
		source: "(655:4) ",
		ctx
	});

	return block;
}

// (669:2) {#if name && !hasAnchor}
function create_if_block$3(ctx) {
	let select;
	let mounted;
	let dispose;
	let each_value = /*selectedOptions*/ ctx[28];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(select, "id", /*__id*/ ctx[40]);
			attr_dev(select, "name", /*name*/ ctx[2]);
			select.multiple = /*multiple*/ ctx[1];
			attr_dev(select, "class", "is-hidden svelte-1lvkhl0");
			attr_dev(select, "tabindex", "-1");
			select.required = /*required*/ ctx[4];
			select.disabled = /*disabled*/ ctx[0];
			add_location(select, file$5, 669, 2, 24483);
		},
		m: function mount(target, anchor) {
			insert_dev(target, select, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			if (!mounted) {
				dispose = action_destroyer(/*refSelectAction*/ ctx[41].call(null, select, /*refSelectActionParams*/ ctx[42]));
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*selectedOptions, labelAsValue, currentLabelField, currentValueField*/ 377487360) {
				each_value = /*selectedOptions*/ ctx[28];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty[0] & /*name*/ 4) {
				attr_dev(select, "name", /*name*/ ctx[2]);
			}

			if (dirty[0] & /*multiple*/ 2) {
				prop_dev(select, "multiple", /*multiple*/ ctx[1]);
			}

			if (dirty[0] & /*required*/ 16) {
				prop_dev(select, "required", /*required*/ ctx[4]);
			}

			if (dirty[0] & /*disabled*/ 1) {
				prop_dev(select, "disabled", /*disabled*/ ctx[0]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(select);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(669:2) {#if name && !hasAnchor}",
		ctx
	});

	return block;
}

// (671:4) {#each selectedOptions as opt}
function create_each_block$2(ctx) {
	let option;
	let t_value = /*opt*/ ctx[115][/*currentLabelField*/ ctx[26]] + "";
	let t;
	let option_value_value;

	const block = {
		c: function create() {
			option = element("option");
			t = text(t_value);

			option.__value = option_value_value = /*opt*/ ctx[115][/*labelAsValue*/ ctx[23]
			? /*currentLabelField*/ ctx[26]
			: /*currentValueField*/ ctx[25]];

			option.value = option.__value;
			option.selected = true;
			add_location(option, file$5, 671, 4, 24664);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*selectedOptions, currentLabelField*/ 335544320 && t_value !== (t_value = /*opt*/ ctx[115][/*currentLabelField*/ ctx[26]] + "")) set_data_dev(t, t_value);

			if (dirty[0] & /*selectedOptions, labelAsValue, currentLabelField, currentValueField*/ 377487360 && option_value_value !== (option_value_value = /*opt*/ ctx[115][/*labelAsValue*/ ctx[23]
			? /*currentLabelField*/ ctx[26]
			: /*currentValueField*/ ctx[25]])) {
				prop_dev(option, "__value", option_value_value);
				option.value = option.__value;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(671:4) {#each selectedOptions as opt}",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let div;
	let control;
	let t0;
	let dropdown;
	let t1;
	let div_class_value;
	let current;

	let control_props = {
		renderer: /*itemRenderer*/ ctx[38],
		disabled: /*disabled*/ ctx[0],
		clearable: /*clearable*/ ctx[9],
		searchable: /*searchable*/ ctx[8],
		placeholder: /*placeholder*/ ctx[7],
		multiple: /*multiple*/ ctx[1],
		inputId: /*inputId*/ ctx[3],
		resetOnBlur: /*resetOnBlur*/ ctx[11],
		collapseSelection: /*collapseSelection*/ ctx[15]
		? config.collapseSelectionFn
		: null,
		inputValue: /*inputValue*/ ctx[43],
		hasFocus: /*hasFocus*/ ctx[44],
		hasDropdownOpened: /*hasDropdownOpened*/ ctx[45],
		selectedOptions: /*selectedOptions*/ ctx[28],
		isFetchingData: /*isFetchingData*/ ctx[35],
		dndzone: /*dndzone*/ ctx[12],
		currentValueField: /*currentValueField*/ ctx[25],
		itemComponent: /*controlItem*/ ctx[14],
		$$slots: { icon: [create_icon_slot] },
		$$scope: { ctx }
	};

	control = new Control({ props: control_props, $$inline: true });
	/*control_binding*/ ctx[91](control);
	control.$on("deselect", /*onDeselect*/ ctx[47]);
	control.$on("keydown", /*onKeyDown*/ ctx[49]);
	control.$on("paste", /*onPaste*/ ctx[50]);
	control.$on("consider", /*onDndEvent*/ ctx[51]);
	control.$on("finalize", /*onDndEvent*/ ctx[51]);
	control.$on("blur", /*blur_handler*/ ctx[92]);

	let dropdown_props = {
		renderer: /*itemRenderer*/ ctx[38],
		disableHighlight: /*disableHighlight*/ ctx[10],
		creatable: /*creatable*/ ctx[16],
		maxReached: /*maxReached*/ ctx[31],
		alreadyCreated: /*alreadyCreated*/ ctx[36],
		virtualList: /*virtualList*/ ctx[18],
		vlHeight: /*vlHeight*/ ctx[19],
		vlItemSize: /*vlItemSize*/ ctx[20],
		lazyDropdown: /*virtualList*/ ctx[18] || /*lazyDropdown*/ ctx[17],
		multiple: /*multiple*/ ctx[1],
		dropdownIndex: /*dropdownActiveIndex*/ ctx[24],
		items: /*availableItems*/ ctx[30],
		listIndex: /*listIndex*/ ctx[29],
		inputValue: /*dropdownInputValue*/ ctx[37],
		hasDropdownOpened: /*hasDropdownOpened*/ ctx[45],
		listMessage: /*listMessage*/ ctx[39],
		disabledField: /*disabledField*/ ctx[6],
		createLabel: /*_i18n*/ ctx[27].createRowLabel,
		metaKey: /*isIOS*/ ctx[34] ? '⌘' : 'Ctrl',
		itemComponent: /*dropdownItem*/ ctx[13]
	};

	dropdown = new Dropdown({ props: dropdown_props, $$inline: true });
	/*dropdown_binding*/ ctx[93](dropdown);
	dropdown.$on("select", /*onSelect*/ ctx[46]);
	dropdown.$on("hover", /*onHover*/ ctx[48]);
	dropdown.$on("createoption", /*createoption_handler*/ ctx[94]);
	let if_block = /*name*/ ctx[2] && !/*hasAnchor*/ ctx[5] && create_if_block$3(ctx);

	const block = {
		c: function create() {
			div = element("div");
			create_component(control.$$.fragment);
			t0 = space();
			create_component(dropdown.$$.fragment);
			t1 = space();
			if (if_block) if_block.c();
			attr_dev(div, "class", div_class_value = "" + (null_to_empty(`svelecte ${/*className*/ ctx[21]}`) + " svelte-1lvkhl0"));
			attr_dev(div, "style", /*style*/ ctx[22]);
			toggle_class(div, "is-disabled", /*disabled*/ ctx[0]);
			add_location(div, file$5, 641, 0, 23102);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(control, div, null);
			append_dev(div, t0);
			mount_component(dropdown, div, null);
			append_dev(div, t1);
			if (if_block) if_block.m(div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const control_changes = {};
			if (dirty[1] & /*itemRenderer*/ 128) control_changes.renderer = /*itemRenderer*/ ctx[38];
			if (dirty[0] & /*disabled*/ 1) control_changes.disabled = /*disabled*/ ctx[0];
			if (dirty[0] & /*clearable*/ 512) control_changes.clearable = /*clearable*/ ctx[9];
			if (dirty[0] & /*searchable*/ 256) control_changes.searchable = /*searchable*/ ctx[8];
			if (dirty[0] & /*placeholder*/ 128) control_changes.placeholder = /*placeholder*/ ctx[7];
			if (dirty[0] & /*multiple*/ 2) control_changes.multiple = /*multiple*/ ctx[1];
			if (dirty[0] & /*inputId*/ 8) control_changes.inputId = /*inputId*/ ctx[3];
			if (dirty[0] & /*resetOnBlur*/ 2048) control_changes.resetOnBlur = /*resetOnBlur*/ ctx[11];

			if (dirty[0] & /*collapseSelection*/ 32768) control_changes.collapseSelection = /*collapseSelection*/ ctx[15]
			? config.collapseSelectionFn
			: null;

			if (dirty[0] & /*selectedOptions*/ 268435456) control_changes.selectedOptions = /*selectedOptions*/ ctx[28];
			if (dirty[1] & /*isFetchingData*/ 16) control_changes.isFetchingData = /*isFetchingData*/ ctx[35];
			if (dirty[0] & /*dndzone*/ 4096) control_changes.dndzone = /*dndzone*/ ctx[12];
			if (dirty[0] & /*currentValueField*/ 33554432) control_changes.currentValueField = /*currentValueField*/ ctx[25];
			if (dirty[0] & /*controlItem*/ 16384) control_changes.itemComponent = /*controlItem*/ ctx[14];

			if (dirty[3] & /*$$scope*/ 4) {
				control_changes.$$scope = { dirty, ctx };
			}

			control.$set(control_changes);
			const dropdown_changes = {};
			if (dirty[1] & /*itemRenderer*/ 128) dropdown_changes.renderer = /*itemRenderer*/ ctx[38];
			if (dirty[0] & /*disableHighlight*/ 1024) dropdown_changes.disableHighlight = /*disableHighlight*/ ctx[10];
			if (dirty[0] & /*creatable*/ 65536) dropdown_changes.creatable = /*creatable*/ ctx[16];
			if (dirty[1] & /*maxReached*/ 1) dropdown_changes.maxReached = /*maxReached*/ ctx[31];
			if (dirty[1] & /*alreadyCreated*/ 32) dropdown_changes.alreadyCreated = /*alreadyCreated*/ ctx[36];
			if (dirty[0] & /*virtualList*/ 262144) dropdown_changes.virtualList = /*virtualList*/ ctx[18];
			if (dirty[0] & /*vlHeight*/ 524288) dropdown_changes.vlHeight = /*vlHeight*/ ctx[19];
			if (dirty[0] & /*vlItemSize*/ 1048576) dropdown_changes.vlItemSize = /*vlItemSize*/ ctx[20];
			if (dirty[0] & /*virtualList, lazyDropdown*/ 393216) dropdown_changes.lazyDropdown = /*virtualList*/ ctx[18] || /*lazyDropdown*/ ctx[17];
			if (dirty[0] & /*multiple*/ 2) dropdown_changes.multiple = /*multiple*/ ctx[1];
			if (dirty[0] & /*dropdownActiveIndex*/ 16777216) dropdown_changes.dropdownIndex = /*dropdownActiveIndex*/ ctx[24];
			if (dirty[0] & /*availableItems*/ 1073741824) dropdown_changes.items = /*availableItems*/ ctx[30];
			if (dirty[0] & /*listIndex*/ 536870912) dropdown_changes.listIndex = /*listIndex*/ ctx[29];
			if (dirty[1] & /*dropdownInputValue*/ 64) dropdown_changes.inputValue = /*dropdownInputValue*/ ctx[37];
			if (dirty[1] & /*listMessage*/ 256) dropdown_changes.listMessage = /*listMessage*/ ctx[39];
			if (dirty[0] & /*disabledField*/ 64) dropdown_changes.disabledField = /*disabledField*/ ctx[6];
			if (dirty[0] & /*_i18n*/ 134217728) dropdown_changes.createLabel = /*_i18n*/ ctx[27].createRowLabel;
			if (dirty[1] & /*isIOS*/ 8) dropdown_changes.metaKey = /*isIOS*/ ctx[34] ? '⌘' : 'Ctrl';
			if (dirty[0] & /*dropdownItem*/ 8192) dropdown_changes.itemComponent = /*dropdownItem*/ ctx[13];
			dropdown.$set(dropdown_changes);

			if (/*name*/ ctx[2] && !/*hasAnchor*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (!current || dirty[0] & /*className*/ 2097152 && div_class_value !== (div_class_value = "" + (null_to_empty(`svelecte ${/*className*/ ctx[21]}`) + " svelte-1lvkhl0"))) {
				attr_dev(div, "class", div_class_value);
			}

			if (!current || dirty[0] & /*style*/ 4194304) {
				attr_dev(div, "style", /*style*/ ctx[22]);
			}

			if (dirty[0] & /*className, disabled*/ 2097153) {
				toggle_class(div, "is-disabled", /*disabled*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(control.$$.fragment, local);
			transition_in(dropdown.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(control.$$.fragment, local);
			transition_out(dropdown.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			/*control_binding*/ ctx[91](null);
			destroy_component(control);
			/*dropdown_binding*/ ctx[93](null);
			destroy_component(dropdown);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const formatterList = {
	default(item) {
		return item[this.label];
	}
};

function addFormatter(name, formatFn) {
	if (name instanceof Object) {
		for (let prop in name) {
			formatterList[prop] = name[prop];
		}
	} else {
		formatterList[name] = formatFn;
	}
}
const config = settings;

function instance$7($$self, $$props, $$invalidate) {
	let flatItems;
	let maxReached;
	let availableItems;
	let currentListLength;
	let listIndex;
	let listMessage;
	let itemRenderer;
	let dropdownInputValue;
	let $inputValue;
	let $hasDropdownOpened;
	let $hasFocus;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Svelecte', slots, ['icon']);
	let { name = 'svelecte' } = $$props;
	let { inputId = null } = $$props;
	let { required = false } = $$props;
	let { hasAnchor = false } = $$props;
	let { disabled = settings.disabled } = $$props;
	let { options = [] } = $$props;
	let { valueField = settings.valueField } = $$props;
	let { labelField = settings.labelField } = $$props;
	let { groupLabelField = settings.groupLabelField } = $$props;
	let { groupItemsField = settings.groupItemsField } = $$props;
	let { disabledField = settings.disabledField } = $$props;
	let { placeholder = 'Select' } = $$props;
	let { searchable = settings.searchable } = $$props;
	let { clearable = settings.clearable } = $$props;
	let { renderer = null } = $$props;
	let { disableHighlight = false } = $$props;
	let { selectOnTab = settings.selectOnTab } = $$props;
	let { resetOnBlur = settings.resetOnBlur } = $$props;
	let { resetOnSelect = settings.resetOnSelect } = $$props;

	let { dndzone = () => ({
		noop: true,
		destroy: () => {
			
		}
	}) } = $$props;

	let { validatorAction = null } = $$props;
	let { dropdownItem = Item } = $$props;
	let { controlItem = Item } = $$props;
	let { multiple = settings.multiple } = $$props;
	let { max = settings.max } = $$props;
	let { collapseSelection = settings.collapseSelection } = $$props;
	let { creatable = settings.creatable } = $$props;
	let { creatablePrefix = settings.creatablePrefix } = $$props;
	let { allowEditing = settings.allowEditing } = $$props;
	let { keepCreated = settings.keepCreated } = $$props;
	let { delimiter = settings.delimiter } = $$props;
	let { createFilter = null } = $$props;
	let { createTransform = null } = $$props;
	let { fetch = null } = $$props;
	let { fetchMode = 'auto' } = $$props;
	let { fetchCallback = settings.fetchCallback } = $$props;
	let { fetchResetOnBlur = true } = $$props;
	let { minQuery = settings.minQuery } = $$props;
	let { lazyDropdown = settings.lazyDropdown } = $$props;
	let { virtualList = settings.virtualList } = $$props;
	let { vlHeight = settings.vlHeight } = $$props;
	let { vlItemSize = settings.vlItemSize } = $$props;
	let { searchField = null } = $$props;
	let { sortField = null } = $$props;
	let { disableSifter = false } = $$props;
	let { class: className = 'svelecte-control' } = $$props;
	let { style = null } = $$props;
	let { i18n = null } = $$props;
	let { readSelection = null } = $$props;
	let { value = null } = $$props;
	let { labelAsValue = false } = $$props;
	let { valueAsObject = settings.valueAsObject } = $$props;

	const focus = event => {
		refControl.focusControl(event);
	};

	const getSelection = onlyValues => {
		if (!selectedOptions.length) return multiple ? [] : null;

		const _selection = selectedOptions.map(opt => onlyValues
		? opt[labelAsValue ? currentLabelField : currentValueField]
		: Object.assign({}, opt));

		return multiple ? _selection : _selection[0];
	};

	const setSelection = (selection, triggerChangeEvent) => {
		handleValueUpdate(selection);
		triggerChangeEvent && emitChangeEvent();
	};

	const clearByParent = doDisable => {
		clearSelection();
		emitChangeEvent();

		if (doDisable) {
			$$invalidate(0, disabled = true);
			$$invalidate(55, fetch = null);
		}
	};

	const __id = `sv-select-${Math.random()}`.replace('.', '');
	const dispatch = createEventDispatcher();

	const itemConfig = {
		optionsWithGroups: false,
		isOptionArray: options && options.length && typeof options[0] !== 'object',
		optionProps: [],
		valueField,
		labelField,
		labelAsValue,
		optLabel: groupLabelField,
		optItems: groupItemsField
	};

	/* possibility to provide initial (selected) values in `fetch` mode **/
	if (fetch && value && valueAsObject && (!options || options && options.length === 0)) {
		options = Array.isArray(value) ? value : [value];
	}

	let isInitialized = false;
	let refDropdown;
	let refControl;
	let ignoreHover = false;
	let dropdownActiveIndex = null;
	let currentValueField = valueField || fieldInit('value', options, itemConfig);
	let currentLabelField = labelField || fieldInit('label', options, itemConfig);
	let isIOS = false;

	let refSelectAction = validatorAction
	? validatorAction.shift()
	: () => ({
			destroy: () => {
				
			}
		});

	let refSelectActionParams = validatorAction || [];
	let refSelectElement = null;
	itemConfig.valueField = currentValueField;
	itemConfig.labelField = currentLabelField;

	itemConfig.optionProps = value && valueAsObject && (multiple && Array.isArray(value)
	? value.length > 0
	: true)
	? getFilterProps(multiple ? value.slice(0, 1).shift() : value)
	: [currentValueField, currentLabelField];

	/** ************************************ automatic init */
	multiple = name && !multiple ? name.endsWith('[]') : multiple;

	if (!createFilter) createFilter = defaultCreateFilter;

	/** ************************************ Context definition */
	const inputValue = writable('');

	validate_store(inputValue, 'inputValue');
	component_subscribe($$self, inputValue, value => $$invalidate(89, $inputValue = value));
	const hasFocus = writable(false);
	validate_store(hasFocus, 'hasFocus');
	component_subscribe($$self, hasFocus, value => $$invalidate(103, $hasFocus = value));
	const hasDropdownOpened = writable(false);
	validate_store(hasDropdownOpened, 'hasDropdownOpened');
	component_subscribe($$self, hasDropdownOpened, value => $$invalidate(102, $hasDropdownOpened = value));

	/** ************************************ remote source */
	let isFetchingData = false;

	let initFetchOnly = fetchMode === 'init' || fetchMode === 'auto' && typeof fetch === 'string' && fetch.indexOf('[query]') === -1;
	let fetchInitValue = initFetchOnly ? value : null;
	let fetchUnsubscribe = null;

	function cancelXhr() {
		if (isInitialized && isFetchingData) {
			xhr && ![0, 4].includes(xhr.readyState) && xhr.abort();
			$$invalidate(35, isFetchingData = false);
		}

		return true;
	}

	function createFetch(fetch) {
		if (fetchUnsubscribe) {
			fetchUnsubscribe();
			fetchUnsubscribe = null;
		}

		if (!fetch) return null;
		cancelXhr();

		// update fetchInitValue when fetch is changed, but we are in 'init' mode, ref #113
		if (initFetchOnly && prevValue) fetchInitValue = prevValue;

		const fetchSource = typeof fetch === 'string' ? fetchRemote(fetch) : fetch;

		// reinit this if `fetch` property changes
		$$invalidate(86, initFetchOnly = fetchMode === 'init' || fetchMode === 'auto' && typeof fetch === 'string' && fetch.indexOf('[query]') === -1);

		const debouncedFetch = debounce(
			query => {
				if (query && !$inputValue.length) {
					$$invalidate(35, isFetchingData = false);
					return;
				}

				fetchSource(query, fetchCallback).then(data => {
					if (!Array.isArray(data)) {
						console.warn('[Svelecte]:Fetch - array expected, invalid property provided:', data);
						data = [];
					}

					$$invalidate(52, options = data);
				}).catch(() => {
					$$invalidate(52, options = []);
				}).finally(() => {
					$$invalidate(35, isFetchingData = false);
					$hasFocus && hasDropdownOpened.set(true);
					$$invalidate(39, listMessage = _i18n.fetchEmpty);

					tick().then(() => {
						if (initFetchOnly && fetchInitValue) {
							handleValueUpdate(fetchInitValue, true);
							fetchInitValue = null;
						}

						dispatch('fetch', options);
					});
				});
			},
			500
		);

		if (initFetchOnly) {
			if (typeof fetch === 'string' && fetch.indexOf('[parent]') !== -1) return null;
			$$invalidate(35, isFetchingData = true);
			$$invalidate(52, options = []);
			debouncedFetch(null);
			return null;
		}

		fetchUnsubscribe = inputValue.subscribe(value => {
			cancelXhr(); // cancel previous run

			if (!value) {
				if (isInitialized && fetchResetOnBlur) {
					$$invalidate(52, options = []);
				}

				return;
			}

			if (value && value.length < minQuery) return;
			!initFetchOnly && hasDropdownOpened.set(false);
			$$invalidate(35, isFetchingData = true);
			debouncedFetch(value);
		});

		return debouncedFetch;
	}

	/** ************************************ component logic */
	let prevValue = value;

	let _i18n = config.i18n;

	/** - - - - - - - - - - STORE - - - - - - - - - - - - - -*/
	let selectedOptions = value !== null
	? initSelection.call(options, value, valueAsObject, itemConfig)
	: [];

	let selectedKeys = selectedOptions.reduce(
		(set, opt) => {
			set.add(opt[currentValueField]);
			return set;
		},
		new Set()
	);

	let alreadyCreated = [''];
	let prevOptions = options;

	/**
 * Dispatch change event on add options/remove selected items
 */
	function emitChangeEvent() {
		tick().then(() => {
			dispatch('change', readSelection);
			refSelectElement && refSelectElement.dispatchEvent(new Event('input')); // required for svelte-use-form
		});
	}

	/**
 * Dispatch createoption event when user creates a new entry (with 'creatable' feature)
 */
	function emitCreateEvent(createdOpt) {
		dispatch('createoption', createdOpt);
	}

	/**
 * update inner selection, when 'value' property is changed
 * 
 * @internal it seems it was intentional to be able to set value objects (valueAsObject=true) to options out of option
 * list. I don't know why, but to keep this 'feature' and unify conditions upon which the 'invalidValue' event is
 * dispatched, `isRefetchUpdate` parameter was introduced
 * 
 * @param {bool} isRefetchUpdate - set this parameter to validate if selection is valid
 */
	function handleValueUpdate(passedVal, isRefetchUpdate = false) {
		clearSelection();

		if (passedVal) {
			let _selection = Array.isArray(passedVal) ? passedVal : [passedVal];

			const valueProp = itemConfig.labelAsValue
			? currentLabelField
			: currentValueField;

			_selection = _selection.reduce(
				(res, val) => {
					const opt = flatItems.find(item => valueAsObject
					? isRefetchUpdate
						? item[valueProp] == val[valueProp]
						: val
					: item[valueProp] == val);

					opt && res.push(opt);
					return res;
				},
				[]
			);

			let success = _selection.every(selectOption) && (multiple
			? passedVal.length === _selection.length
			: _selection.length > 0);

			if (!success) {
				// this is run only when invalid 'value' is provided, like out of option array
				console.warn('[Svelecte]: provided "value" property is invalid', passedVal);

				$$invalidate(56, value = multiple ? [] : null);
				$$invalidate(57, readSelection = value);
				dispatch('invalidValue', passedVal);
				return;
			}

			$$invalidate(57, readSelection = Array.isArray(passedVal)
			? _selection
			: _selection.shift());
		}

		$$invalidate(87, prevValue = passedVal);
	}

	/** 
 * Add given option to selection pool
 * Check if not already selected or max item selection reached
 * 
 * @returns bool
 */
	function selectOption(opt) {
		if (!opt || multiple && maxReached) return false;
		if (selectedKeys.has(opt[currentValueField])) return;

		if (typeof opt === 'string') {
			if (!creatable) return;
			opt = createFilter(opt, options);
			if (alreadyCreated.includes(opt)) return;
			!fetch && alreadyCreated.push(opt);
			opt = createTransform(opt, creatablePrefix, currentValueField, currentLabelField);
			opt.$created = true; // internal setter
			if (keepCreated) $$invalidate(52, options = [...options, opt]);
			emitCreateEvent(opt);
		}

		if (multiple) {
			selectedOptions.push(opt);
			$$invalidate(28, selectedOptions);
			selectedKeys.add(opt[currentValueField]);
		} else {
			$$invalidate(28, selectedOptions = [opt]);
			selectedKeys.clear();
			selectedKeys.add(opt[currentValueField]);
			$$invalidate(24, dropdownActiveIndex = options.indexOf(opt));
		}

		((((((((($$invalidate(88, flatItems), $$invalidate(52, options)), $$invalidate(84, itemConfig)), $$invalidate(85, isInitialized)), $$invalidate(108, prevOptions)), $$invalidate(58, valueField)), $$invalidate(25, currentValueField)), $$invalidate(59, labelField)), $$invalidate(26, currentLabelField)), $$invalidate(23, labelAsValue));
		return true;
	}

	/**
 * Remove option/all options from selection pool
 */
	function deselectOption(opt) {
		if (opt.$created && backspacePressed && allowEditing) {
			alreadyCreated.splice(alreadyCreated.findIndex(o => o === opt[labelAsValue ? currentLabelField : currentValueField]), 1);
			$$invalidate(36, alreadyCreated);

			if (keepCreated) {
				options.splice(options.findIndex(o => o === opt), 1);
				$$invalidate(52, options);
			}

			set_store_value(inputValue, $inputValue = opt[currentLabelField].replace(creatablePrefix, ''), $inputValue);
		}

		const id = opt[currentValueField];
		selectedKeys.delete(id);
		selectedOptions.splice(selectedOptions.findIndex(o => o[currentValueField] == id), 1);
		$$invalidate(28, selectedOptions);
		((((((((($$invalidate(88, flatItems), $$invalidate(52, options)), $$invalidate(84, itemConfig)), $$invalidate(85, isInitialized)), $$invalidate(108, prevOptions)), $$invalidate(58, valueField)), $$invalidate(25, currentValueField)), $$invalidate(59, labelField)), $$invalidate(26, currentLabelField)), $$invalidate(23, labelAsValue));
	}

	function clearSelection() {
		selectedKeys.clear();
		$$invalidate(28, selectedOptions = []);
		((((((((($$invalidate(88, flatItems), $$invalidate(52, options)), $$invalidate(84, itemConfig)), $$invalidate(85, isInitialized)), $$invalidate(108, prevOptions)), $$invalidate(58, valueField)), $$invalidate(25, currentValueField)), $$invalidate(59, labelField)), $$invalidate(26, currentLabelField)), $$invalidate(23, labelAsValue));
	}

	/**
 * Handle user action on select
 */
	function onSelect(event, opt) {
		opt = opt || event.detail;
		if (disabled || opt[disabledField] || opt.$isGroupHeader) return;
		selectOption(opt);
		if (multiple && resetOnSelect || !multiple) set_store_value(inputValue, $inputValue = '', $inputValue);

		if (!multiple) {
			set_store_value(hasDropdownOpened, $hasDropdownOpened = false, $hasDropdownOpened);
		} else {
			tick().then(() => {
				$$invalidate(24, dropdownActiveIndex = maxReached
				? null
				: listIndex.next(dropdownActiveIndex - 1, true));
			});
		}

		emitChangeEvent();
	}

	function onDeselect(event, opt) {
		if (disabled) return;
		opt = opt || event.detail;

		if (opt) {
			deselectOption(opt);
		} else {
			// apply for 'x' when clearable:true || ctrl+backspace || ctrl+delete
			clearSelection();
		}

		tick().then(refControl.focusControl);
		emitChangeEvent();
	}

	/**
 * Dropdown hover handler - update active item
 */
	function onHover(event) {
		if (ignoreHover) {
			ignoreHover = false;
			return;
		}

		$$invalidate(24, dropdownActiveIndex = event.detail);
	}

	/** keyboard related props */
	let backspacePressed = false;

	/**
 * Keyboard navigation
 */
	function onKeyDown(event) {
		event = event.detail; // from dispatched event

		if (creatable && delimiter.indexOf(event.key) > -1) {
			$inputValue.length > 0 && onSelect(null, $inputValue); // prevent creating item with delimiter itself
			event.preventDefault();
			return;
		}

		const Tab = selectOnTab && $hasDropdownOpened && !event.shiftKey
		? 'Tab'
		: 'No-tab';

		let ctrlKey = isIOS ? event.metaKey : event.ctrlKey;
		let isPageEvent = ['PageUp', 'PageDown'].includes(event.key);

		switch (event.key) {
			case 'End':
				if ($inputValue.length !== 0) return;
				$$invalidate(24, dropdownActiveIndex = listIndex.first);
			case 'PageDown':
				if (isPageEvent) {
					const [wrap, item] = refDropdown.getDimensions();
					$$invalidate(24, dropdownActiveIndex = Math.ceil((item * dropdownActiveIndex + wrap) / item));
				}
			case 'ArrowUp':
				event.preventDefault();
				if (!$hasDropdownOpened) {
					set_store_value(hasDropdownOpened, $hasDropdownOpened = true, $hasDropdownOpened);
					return;
				}
				$$invalidate(24, dropdownActiveIndex = listIndex.prev(dropdownActiveIndex));
				tick().then(refDropdown.scrollIntoView);
				ignoreHover = true;
				break;
			case 'Home':
				if ($inputValue.length !== 0 || $inputValue.length === 0 && availableItems.length === 0) return;
				$$invalidate(24, dropdownActiveIndex = listIndex.last);
			case 'PageUp':
				if (isPageEvent) {
					const [wrap, item] = refDropdown.getDimensions(); // ref #26
					$$invalidate(24, dropdownActiveIndex = Math.floor((item * dropdownActiveIndex - wrap) / item));
				}
			case 'ArrowDown':
				event.preventDefault();
				if (!$hasDropdownOpened) {
					set_store_value(hasDropdownOpened, $hasDropdownOpened = true, $hasDropdownOpened);
					return;
				}
				$$invalidate(24, dropdownActiveIndex = listIndex.next(dropdownActiveIndex));
				tick().then(refDropdown.scrollIntoView);
				ignoreHover = true;
				break;
			case 'Escape':
				if ($hasDropdownOpened) {
					// prevent ESC bubble in this case (interfering with modal closing etc. (bootstrap))
					event.preventDefault();

					event.stopPropagation();
				}
				if (!$inputValue) {
					set_store_value(hasDropdownOpened, $hasDropdownOpened = false, $hasDropdownOpened);
				}
				cancelXhr();
				set_store_value(inputValue, $inputValue = '', $inputValue);
				break;
			case Tab:
			case 'Enter':
				if (!$hasDropdownOpened) return;
				let activeDropdownItem = !ctrlKey ? availableItems[dropdownActiveIndex] : null;
				if (creatable && $inputValue) {
					activeDropdownItem = !activeDropdownItem || ctrlKey
					? $inputValue
					: activeDropdownItem;

					ctrlKey = false;
				}
				!ctrlKey && activeDropdownItem && onSelect(null, activeDropdownItem);
				if (availableItems.length <= dropdownActiveIndex) {
					$$invalidate(24, dropdownActiveIndex = currentListLength > 0
					? currentListLength
					: listIndex.first);
				}
				if (!activeDropdownItem && selectedOptions.length) {
					set_store_value(hasDropdownOpened, $hasDropdownOpened = false, $hasDropdownOpened);
					return;
				}
				event.preventDefault();
				break;
			case ' ':
				if (!fetch && !$hasDropdownOpened) {
					set_store_value(hasDropdownOpened, $hasDropdownOpened = true, $hasDropdownOpened); // prevent form submit
					event.preventDefault();
				}
				if (!multiple && selectedOptions.length) event.preventDefault();
				break;
			case 'Backspace':
				backspacePressed = true;
			case 'Delete':
				if ($inputValue === '' && selectedOptions.length) {
					ctrlKey
					? onDeselect({})
					: onDeselect(null, selectedOptions[selectedOptions.length - 1]); /** no detail prop */

					event.preventDefault();
				}
				backspacePressed = false;
			default:
				if (!ctrlKey && !['Tab', 'Shift'].includes(event.key) && !$hasDropdownOpened && !isFetchingData) {
					set_store_value(hasDropdownOpened, $hasDropdownOpened = true, $hasDropdownOpened);
				}
				if (!multiple && selectedOptions.length && event.key !== 'Tab') event.preventDefault();
		}
	}

	/**
 * Enable create items by pasting
 */
	function onPaste(event) {
		if (creatable) {
			event.preventDefault();
			const rx = new RegExp('([^' + delimiter + '\\n]+)', 'g');
			const pasted = event.clipboardData.getData('text/plain').replaceAll('/', '\/').replaceAll('\t', ' ');
			const matches = pasted.match(rx);

			if (matches.length === 1 && pasted.indexOf(',') === -1) {
				set_store_value(inputValue, $inputValue = matches.pop().trim(), $inputValue);
			}

			matches.forEach(opt => onSelect(null, opt.trim()));
		}
	} // do nothing otherwise

	function onDndEvent(e) {
		$$invalidate(28, selectedOptions = e.detail.items);
	}

	/** ************************************ component lifecycle related */
	onMount(() => {
		$$invalidate(85, isInitialized = true);

		if (creatable) {
			const valueProp = itemConfig.labelAsValue
			? currentLabelField
			: currentValueField;

			$$invalidate(36, alreadyCreated = [''].concat(flatItems.map(opt => opt[valueProp]).filter(opt => opt)));
		}

		$$invalidate(24, dropdownActiveIndex = listIndex.first);

		if (prevValue && !multiple) {
			const prop = labelAsValue ? currentLabelField : currentValueField;
			const selectedProp = valueAsObject ? prevValue[prop] : prevValue;
			$$invalidate(24, dropdownActiveIndex = flatItems.findIndex(opt => opt[prop] === selectedProp));
		}

		$$invalidate(34, isIOS = iOS());
		if (name && !hasAnchor) refSelectElement = document.getElementById(__id);
	});

	const writable_props = [
		'name',
		'inputId',
		'required',
		'hasAnchor',
		'disabled',
		'options',
		'valueField',
		'labelField',
		'groupLabelField',
		'groupItemsField',
		'disabledField',
		'placeholder',
		'searchable',
		'clearable',
		'renderer',
		'disableHighlight',
		'selectOnTab',
		'resetOnBlur',
		'resetOnSelect',
		'dndzone',
		'validatorAction',
		'dropdownItem',
		'controlItem',
		'multiple',
		'max',
		'collapseSelection',
		'creatable',
		'creatablePrefix',
		'allowEditing',
		'keepCreated',
		'delimiter',
		'createFilter',
		'createTransform',
		'fetch',
		'fetchMode',
		'fetchCallback',
		'fetchResetOnBlur',
		'minQuery',
		'lazyDropdown',
		'virtualList',
		'vlHeight',
		'vlItemSize',
		'searchField',
		'sortField',
		'disableSifter',
		'class',
		'style',
		'i18n',
		'readSelection',
		'value',
		'labelAsValue',
		'valueAsObject'
	];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Svelecte> was created with unknown prop '${key}'`);
	});

	function control_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			refControl = $$value;
			$$invalidate(33, refControl);
		});
	}

	function blur_handler(event) {
		bubble.call(this, $$self, event);
	}

	function dropdown_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			refDropdown = $$value;
			$$invalidate(32, refDropdown);
		});
	}

	function createoption_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
		if ('inputId' in $$props) $$invalidate(3, inputId = $$props.inputId);
		if ('required' in $$props) $$invalidate(4, required = $$props.required);
		if ('hasAnchor' in $$props) $$invalidate(5, hasAnchor = $$props.hasAnchor);
		if ('disabled' in $$props) $$invalidate(0, disabled = $$props.disabled);
		if ('options' in $$props) $$invalidate(52, options = $$props.options);
		if ('valueField' in $$props) $$invalidate(58, valueField = $$props.valueField);
		if ('labelField' in $$props) $$invalidate(59, labelField = $$props.labelField);
		if ('groupLabelField' in $$props) $$invalidate(60, groupLabelField = $$props.groupLabelField);
		if ('groupItemsField' in $$props) $$invalidate(61, groupItemsField = $$props.groupItemsField);
		if ('disabledField' in $$props) $$invalidate(6, disabledField = $$props.disabledField);
		if ('placeholder' in $$props) $$invalidate(7, placeholder = $$props.placeholder);
		if ('searchable' in $$props) $$invalidate(8, searchable = $$props.searchable);
		if ('clearable' in $$props) $$invalidate(9, clearable = $$props.clearable);
		if ('renderer' in $$props) $$invalidate(62, renderer = $$props.renderer);
		if ('disableHighlight' in $$props) $$invalidate(10, disableHighlight = $$props.disableHighlight);
		if ('selectOnTab' in $$props) $$invalidate(63, selectOnTab = $$props.selectOnTab);
		if ('resetOnBlur' in $$props) $$invalidate(11, resetOnBlur = $$props.resetOnBlur);
		if ('resetOnSelect' in $$props) $$invalidate(64, resetOnSelect = $$props.resetOnSelect);
		if ('dndzone' in $$props) $$invalidate(12, dndzone = $$props.dndzone);
		if ('validatorAction' in $$props) $$invalidate(65, validatorAction = $$props.validatorAction);
		if ('dropdownItem' in $$props) $$invalidate(13, dropdownItem = $$props.dropdownItem);
		if ('controlItem' in $$props) $$invalidate(14, controlItem = $$props.controlItem);
		if ('multiple' in $$props) $$invalidate(1, multiple = $$props.multiple);
		if ('max' in $$props) $$invalidate(66, max = $$props.max);
		if ('collapseSelection' in $$props) $$invalidate(15, collapseSelection = $$props.collapseSelection);
		if ('creatable' in $$props) $$invalidate(16, creatable = $$props.creatable);
		if ('creatablePrefix' in $$props) $$invalidate(67, creatablePrefix = $$props.creatablePrefix);
		if ('allowEditing' in $$props) $$invalidate(68, allowEditing = $$props.allowEditing);
		if ('keepCreated' in $$props) $$invalidate(69, keepCreated = $$props.keepCreated);
		if ('delimiter' in $$props) $$invalidate(70, delimiter = $$props.delimiter);
		if ('createFilter' in $$props) $$invalidate(53, createFilter = $$props.createFilter);
		if ('createTransform' in $$props) $$invalidate(54, createTransform = $$props.createTransform);
		if ('fetch' in $$props) $$invalidate(55, fetch = $$props.fetch);
		if ('fetchMode' in $$props) $$invalidate(71, fetchMode = $$props.fetchMode);
		if ('fetchCallback' in $$props) $$invalidate(72, fetchCallback = $$props.fetchCallback);
		if ('fetchResetOnBlur' in $$props) $$invalidate(73, fetchResetOnBlur = $$props.fetchResetOnBlur);
		if ('minQuery' in $$props) $$invalidate(74, minQuery = $$props.minQuery);
		if ('lazyDropdown' in $$props) $$invalidate(17, lazyDropdown = $$props.lazyDropdown);
		if ('virtualList' in $$props) $$invalidate(18, virtualList = $$props.virtualList);
		if ('vlHeight' in $$props) $$invalidate(19, vlHeight = $$props.vlHeight);
		if ('vlItemSize' in $$props) $$invalidate(20, vlItemSize = $$props.vlItemSize);
		if ('searchField' in $$props) $$invalidate(75, searchField = $$props.searchField);
		if ('sortField' in $$props) $$invalidate(76, sortField = $$props.sortField);
		if ('disableSifter' in $$props) $$invalidate(77, disableSifter = $$props.disableSifter);
		if ('class' in $$props) $$invalidate(21, className = $$props.class);
		if ('style' in $$props) $$invalidate(22, style = $$props.style);
		if ('i18n' in $$props) $$invalidate(78, i18n = $$props.i18n);
		if ('readSelection' in $$props) $$invalidate(57, readSelection = $$props.readSelection);
		if ('value' in $$props) $$invalidate(56, value = $$props.value);
		if ('labelAsValue' in $$props) $$invalidate(23, labelAsValue = $$props.labelAsValue);
		if ('valueAsObject' in $$props) $$invalidate(79, valueAsObject = $$props.valueAsObject);
		if ('$$scope' in $$props) $$invalidate(95, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		defaults: settings,
		debounce,
		xhr,
		fieldInit,
		iOS,
		formatterList,
		addFormatter,
		config,
		createEventDispatcher,
		tick,
		onMount,
		writable,
		fetchRemote,
		defaultCreateFilter,
		defaultCreateTransform,
		initSelection,
		flatList,
		filterList,
		indexList,
		getFilterProps,
		Control,
		Dropdown,
		Item,
		name,
		inputId,
		required,
		hasAnchor,
		disabled,
		options,
		valueField,
		labelField,
		groupLabelField,
		groupItemsField,
		disabledField,
		placeholder,
		searchable,
		clearable,
		renderer,
		disableHighlight,
		selectOnTab,
		resetOnBlur,
		resetOnSelect,
		dndzone,
		validatorAction,
		dropdownItem,
		controlItem,
		multiple,
		max,
		collapseSelection,
		creatable,
		creatablePrefix,
		allowEditing,
		keepCreated,
		delimiter,
		createFilter,
		createTransform,
		fetch,
		fetchMode,
		fetchCallback,
		fetchResetOnBlur,
		minQuery,
		lazyDropdown,
		virtualList,
		vlHeight,
		vlItemSize,
		searchField,
		sortField,
		disableSifter,
		className,
		style,
		i18n,
		readSelection,
		value,
		labelAsValue,
		valueAsObject,
		focus,
		getSelection,
		setSelection,
		clearByParent,
		__id,
		dispatch,
		itemConfig,
		isInitialized,
		refDropdown,
		refControl,
		ignoreHover,
		dropdownActiveIndex,
		currentValueField,
		currentLabelField,
		isIOS,
		refSelectAction,
		refSelectActionParams,
		refSelectElement,
		inputValue,
		hasFocus,
		hasDropdownOpened,
		isFetchingData,
		initFetchOnly,
		fetchInitValue,
		fetchUnsubscribe,
		cancelXhr,
		createFetch,
		prevValue,
		_i18n,
		selectedOptions,
		selectedKeys,
		alreadyCreated,
		prevOptions,
		emitChangeEvent,
		emitCreateEvent,
		handleValueUpdate,
		selectOption,
		deselectOption,
		clearSelection,
		onSelect,
		onDeselect,
		onHover,
		backspacePressed,
		onKeyDown,
		onPaste,
		onDndEvent,
		flatItems,
		listIndex,
		currentListLength,
		availableItems,
		maxReached,
		dropdownInputValue,
		itemRenderer,
		listMessage,
		$inputValue,
		$hasDropdownOpened,
		$hasFocus
	});

	$$self.$inject_state = $$props => {
		if ('name' in $$props) $$invalidate(2, name = $$props.name);
		if ('inputId' in $$props) $$invalidate(3, inputId = $$props.inputId);
		if ('required' in $$props) $$invalidate(4, required = $$props.required);
		if ('hasAnchor' in $$props) $$invalidate(5, hasAnchor = $$props.hasAnchor);
		if ('disabled' in $$props) $$invalidate(0, disabled = $$props.disabled);
		if ('options' in $$props) $$invalidate(52, options = $$props.options);
		if ('valueField' in $$props) $$invalidate(58, valueField = $$props.valueField);
		if ('labelField' in $$props) $$invalidate(59, labelField = $$props.labelField);
		if ('groupLabelField' in $$props) $$invalidate(60, groupLabelField = $$props.groupLabelField);
		if ('groupItemsField' in $$props) $$invalidate(61, groupItemsField = $$props.groupItemsField);
		if ('disabledField' in $$props) $$invalidate(6, disabledField = $$props.disabledField);
		if ('placeholder' in $$props) $$invalidate(7, placeholder = $$props.placeholder);
		if ('searchable' in $$props) $$invalidate(8, searchable = $$props.searchable);
		if ('clearable' in $$props) $$invalidate(9, clearable = $$props.clearable);
		if ('renderer' in $$props) $$invalidate(62, renderer = $$props.renderer);
		if ('disableHighlight' in $$props) $$invalidate(10, disableHighlight = $$props.disableHighlight);
		if ('selectOnTab' in $$props) $$invalidate(63, selectOnTab = $$props.selectOnTab);
		if ('resetOnBlur' in $$props) $$invalidate(11, resetOnBlur = $$props.resetOnBlur);
		if ('resetOnSelect' in $$props) $$invalidate(64, resetOnSelect = $$props.resetOnSelect);
		if ('dndzone' in $$props) $$invalidate(12, dndzone = $$props.dndzone);
		if ('validatorAction' in $$props) $$invalidate(65, validatorAction = $$props.validatorAction);
		if ('dropdownItem' in $$props) $$invalidate(13, dropdownItem = $$props.dropdownItem);
		if ('controlItem' in $$props) $$invalidate(14, controlItem = $$props.controlItem);
		if ('multiple' in $$props) $$invalidate(1, multiple = $$props.multiple);
		if ('max' in $$props) $$invalidate(66, max = $$props.max);
		if ('collapseSelection' in $$props) $$invalidate(15, collapseSelection = $$props.collapseSelection);
		if ('creatable' in $$props) $$invalidate(16, creatable = $$props.creatable);
		if ('creatablePrefix' in $$props) $$invalidate(67, creatablePrefix = $$props.creatablePrefix);
		if ('allowEditing' in $$props) $$invalidate(68, allowEditing = $$props.allowEditing);
		if ('keepCreated' in $$props) $$invalidate(69, keepCreated = $$props.keepCreated);
		if ('delimiter' in $$props) $$invalidate(70, delimiter = $$props.delimiter);
		if ('createFilter' in $$props) $$invalidate(53, createFilter = $$props.createFilter);
		if ('createTransform' in $$props) $$invalidate(54, createTransform = $$props.createTransform);
		if ('fetch' in $$props) $$invalidate(55, fetch = $$props.fetch);
		if ('fetchMode' in $$props) $$invalidate(71, fetchMode = $$props.fetchMode);
		if ('fetchCallback' in $$props) $$invalidate(72, fetchCallback = $$props.fetchCallback);
		if ('fetchResetOnBlur' in $$props) $$invalidate(73, fetchResetOnBlur = $$props.fetchResetOnBlur);
		if ('minQuery' in $$props) $$invalidate(74, minQuery = $$props.minQuery);
		if ('lazyDropdown' in $$props) $$invalidate(17, lazyDropdown = $$props.lazyDropdown);
		if ('virtualList' in $$props) $$invalidate(18, virtualList = $$props.virtualList);
		if ('vlHeight' in $$props) $$invalidate(19, vlHeight = $$props.vlHeight);
		if ('vlItemSize' in $$props) $$invalidate(20, vlItemSize = $$props.vlItemSize);
		if ('searchField' in $$props) $$invalidate(75, searchField = $$props.searchField);
		if ('sortField' in $$props) $$invalidate(76, sortField = $$props.sortField);
		if ('disableSifter' in $$props) $$invalidate(77, disableSifter = $$props.disableSifter);
		if ('className' in $$props) $$invalidate(21, className = $$props.className);
		if ('style' in $$props) $$invalidate(22, style = $$props.style);
		if ('i18n' in $$props) $$invalidate(78, i18n = $$props.i18n);
		if ('readSelection' in $$props) $$invalidate(57, readSelection = $$props.readSelection);
		if ('value' in $$props) $$invalidate(56, value = $$props.value);
		if ('labelAsValue' in $$props) $$invalidate(23, labelAsValue = $$props.labelAsValue);
		if ('valueAsObject' in $$props) $$invalidate(79, valueAsObject = $$props.valueAsObject);
		if ('isInitialized' in $$props) $$invalidate(85, isInitialized = $$props.isInitialized);
		if ('refDropdown' in $$props) $$invalidate(32, refDropdown = $$props.refDropdown);
		if ('refControl' in $$props) $$invalidate(33, refControl = $$props.refControl);
		if ('ignoreHover' in $$props) ignoreHover = $$props.ignoreHover;
		if ('dropdownActiveIndex' in $$props) $$invalidate(24, dropdownActiveIndex = $$props.dropdownActiveIndex);
		if ('currentValueField' in $$props) $$invalidate(25, currentValueField = $$props.currentValueField);
		if ('currentLabelField' in $$props) $$invalidate(26, currentLabelField = $$props.currentLabelField);
		if ('isIOS' in $$props) $$invalidate(34, isIOS = $$props.isIOS);
		if ('refSelectAction' in $$props) $$invalidate(41, refSelectAction = $$props.refSelectAction);
		if ('refSelectActionParams' in $$props) $$invalidate(42, refSelectActionParams = $$props.refSelectActionParams);
		if ('refSelectElement' in $$props) refSelectElement = $$props.refSelectElement;
		if ('isFetchingData' in $$props) $$invalidate(35, isFetchingData = $$props.isFetchingData);
		if ('initFetchOnly' in $$props) $$invalidate(86, initFetchOnly = $$props.initFetchOnly);
		if ('fetchInitValue' in $$props) fetchInitValue = $$props.fetchInitValue;
		if ('fetchUnsubscribe' in $$props) fetchUnsubscribe = $$props.fetchUnsubscribe;
		if ('prevValue' in $$props) $$invalidate(87, prevValue = $$props.prevValue);
		if ('_i18n' in $$props) $$invalidate(27, _i18n = $$props._i18n);
		if ('selectedOptions' in $$props) $$invalidate(28, selectedOptions = $$props.selectedOptions);
		if ('selectedKeys' in $$props) $$invalidate(107, selectedKeys = $$props.selectedKeys);
		if ('alreadyCreated' in $$props) $$invalidate(36, alreadyCreated = $$props.alreadyCreated);
		if ('prevOptions' in $$props) $$invalidate(108, prevOptions = $$props.prevOptions);
		if ('backspacePressed' in $$props) backspacePressed = $$props.backspacePressed;
		if ('flatItems' in $$props) $$invalidate(88, flatItems = $$props.flatItems);
		if ('listIndex' in $$props) $$invalidate(29, listIndex = $$props.listIndex);
		if ('currentListLength' in $$props) currentListLength = $$props.currentListLength;
		if ('availableItems' in $$props) $$invalidate(30, availableItems = $$props.availableItems);
		if ('maxReached' in $$props) $$invalidate(31, maxReached = $$props.maxReached);
		if ('dropdownInputValue' in $$props) $$invalidate(37, dropdownInputValue = $$props.dropdownInputValue);
		if ('itemRenderer' in $$props) $$invalidate(38, itemRenderer = $$props.itemRenderer);
		if ('listMessage' in $$props) $$invalidate(39, listMessage = $$props.listMessage);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty[1] & /*createTransform*/ 8388608) {
			if (!createTransform) $$invalidate(54, createTransform = defaultCreateTransform);
		}

		if ($$self.$$.dirty[1] & /*fetch*/ 16777216) {
			createFetch(fetch);
		}

		if ($$self.$$.dirty[0] & /*disabled*/ 1) {
			disabled && hasDropdownOpened.set(false);
		}

		if ($$self.$$.dirty[2] & /*i18n*/ 65536) {
			{
				if (i18n && typeof i18n === 'object') {
					$$invalidate(27, _i18n = Object.assign({}, config.i18n, i18n));
				}
			}
		}

		if ($$self.$$.dirty[0] & /*currentValueField, currentLabelField*/ 100663296 | $$self.$$.dirty[1] & /*options, valueField, labelField*/ 404750336 | $$self.$$.dirty[2] & /*isInitialized, itemConfig*/ 12582912) {
			{
				if (isInitialized && prevOptions !== options && options.length) {
					const ivalue = fieldInit('value', options || null, itemConfig);
					const ilabel = fieldInit('label', options || null, itemConfig);
					if (!valueField && currentValueField !== ivalue) $$invalidate(84, itemConfig.valueField = $$invalidate(25, currentValueField = ivalue), itemConfig);
					if (!labelField && currentLabelField !== ilabel) $$invalidate(84, itemConfig.labelField = $$invalidate(26, currentLabelField = ilabel), itemConfig);
				}
			}
		}

		if ($$self.$$.dirty[0] & /*labelAsValue*/ 8388608) {
			{
				$$invalidate(84, itemConfig.labelAsValue = labelAsValue, itemConfig);
			}
		}

		if ($$self.$$.dirty[1] & /*options*/ 2097152 | $$self.$$.dirty[2] & /*itemConfig*/ 4194304) {
			$$invalidate(88, flatItems = flatList(options, itemConfig));
		}

		if ($$self.$$.dirty[0] & /*selectedOptions, multiple, currentLabelField, currentValueField*/ 369098754 | $$self.$$.dirty[2] & /*itemConfig, valueAsObject, prevValue*/ 37879808) {
			{
				const _selectionArray = selectedOptions.map(opt => {
					const { '$disabled': unused1, '$isGroupItem': unused2, ...obj } = opt;
					return obj;
				});

				const _unifiedSelection = multiple
				? _selectionArray
				: _selectionArray.length ? _selectionArray[0] : null;

				const valueProp = itemConfig.labelAsValue
				? currentLabelField
				: currentValueField;

				if (!valueAsObject) {
					$$invalidate(87, prevValue = multiple
					? _unifiedSelection.map(opt => opt[valueProp])
					: selectedOptions.length
						? _unifiedSelection[valueProp]
						: null);
				} else {
					$$invalidate(87, prevValue = _unifiedSelection);
				}

				$$invalidate(56, value = prevValue);
				$$invalidate(57, readSelection = _unifiedSelection);
			}
		}

		if ($$self.$$.dirty[1] & /*value*/ 33554432 | $$self.$$.dirty[2] & /*prevValue*/ 33554432) {
			prevValue !== value && handleValueUpdate(value);
		}

		if ($$self.$$.dirty[0] & /*selectedOptions*/ 268435456 | $$self.$$.dirty[2] & /*max*/ 16) {
			$$invalidate(31, maxReached = max && selectedOptions.length === max);
		}

		if ($$self.$$.dirty[0] & /*multiple*/ 2 | $$self.$$.dirty[1] & /*maxReached*/ 1 | $$self.$$.dirty[2] & /*flatItems, disableSifter, $inputValue, searchField, sortField, itemConfig*/ 205578240) {
			$$invalidate(30, availableItems = maxReached
			? []
			: filterList(flatItems, disableSifter ? null : $inputValue, multiple ? selectedKeys : false, searchField, sortField, itemConfig));
		}

		if ($$self.$$.dirty[0] & /*creatable, availableItems*/ 1073807360 | $$self.$$.dirty[2] & /*$inputValue*/ 134217728) {
			currentListLength = creatable && $inputValue
			? availableItems.length
			: availableItems.length - 1;
		}

		if ($$self.$$.dirty[0] & /*availableItems, creatable*/ 1073807360 | $$self.$$.dirty[2] & /*$inputValue, itemConfig*/ 138412032) {
			$$invalidate(29, listIndex = indexList(availableItems, creatable && $inputValue, itemConfig));
		}

		if ($$self.$$.dirty[0] & /*dropdownActiveIndex, listIndex*/ 553648128) {
			{
				if (dropdownActiveIndex === null) {
					$$invalidate(24, dropdownActiveIndex = listIndex.first);
				} else if (dropdownActiveIndex > listIndex.last) {
					$$invalidate(24, dropdownActiveIndex = listIndex.last);
				} else if (dropdownActiveIndex < listIndex.first) {
					$$invalidate(24, dropdownActiveIndex = listIndex.first);
				}
			}
		}

		if ($$self.$$.dirty[0] & /*_i18n, availableItems*/ 1207959552 | $$self.$$.dirty[1] & /*maxReached, fetch*/ 16777217 | $$self.$$.dirty[2] & /*max, $inputValue, minQuery, initFetchOnly*/ 150999056) {
			$$invalidate(39, listMessage = maxReached
			? _i18n.max(max)
			: $inputValue.length && availableItems.length === 0 && minQuery <= 1
				? _i18n.nomatch
				: fetch
					? minQuery <= 1
						? initFetchOnly ? _i18n.fetchInit : _i18n.fetchBefore
						: _i18n.fetchQuery(minQuery, $inputValue.length)
					: _i18n.empty);
		}

		if ($$self.$$.dirty[0] & /*currentLabelField*/ 67108864 | $$self.$$.dirty[2] & /*renderer*/ 1) {
			$$invalidate(38, itemRenderer = typeof renderer === 'function'
			? renderer
			: formatterList[renderer] || formatterList.default.bind({ label: currentLabelField }));
		}

		if ($$self.$$.dirty[1] & /*createFilter, options*/ 6291456 | $$self.$$.dirty[2] & /*$inputValue*/ 134217728) {
			$$invalidate(37, dropdownInputValue = createFilter($inputValue, options));
		}
	};

	return [
		disabled,
		multiple,
		name,
		inputId,
		required,
		hasAnchor,
		disabledField,
		placeholder,
		searchable,
		clearable,
		disableHighlight,
		resetOnBlur,
		dndzone,
		dropdownItem,
		controlItem,
		collapseSelection,
		creatable,
		lazyDropdown,
		virtualList,
		vlHeight,
		vlItemSize,
		className,
		style,
		labelAsValue,
		dropdownActiveIndex,
		currentValueField,
		currentLabelField,
		_i18n,
		selectedOptions,
		listIndex,
		availableItems,
		maxReached,
		refDropdown,
		refControl,
		isIOS,
		isFetchingData,
		alreadyCreated,
		dropdownInputValue,
		itemRenderer,
		listMessage,
		__id,
		refSelectAction,
		refSelectActionParams,
		inputValue,
		hasFocus,
		hasDropdownOpened,
		onSelect,
		onDeselect,
		onHover,
		onKeyDown,
		onPaste,
		onDndEvent,
		options,
		createFilter,
		createTransform,
		fetch,
		value,
		readSelection,
		valueField,
		labelField,
		groupLabelField,
		groupItemsField,
		renderer,
		selectOnTab,
		resetOnSelect,
		validatorAction,
		max,
		creatablePrefix,
		allowEditing,
		keepCreated,
		delimiter,
		fetchMode,
		fetchCallback,
		fetchResetOnBlur,
		minQuery,
		searchField,
		sortField,
		disableSifter,
		i18n,
		valueAsObject,
		focus,
		getSelection,
		setSelection,
		clearByParent,
		itemConfig,
		isInitialized,
		initFetchOnly,
		prevValue,
		flatItems,
		$inputValue,
		slots,
		control_binding,
		blur_handler,
		dropdown_binding,
		createoption_handler,
		$$scope
	];
}

class Svelecte extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init$1(
			this,
			options,
			instance$7,
			create_fragment$7,
			safe_not_equal,
			{
				name: 2,
				inputId: 3,
				required: 4,
				hasAnchor: 5,
				disabled: 0,
				options: 52,
				valueField: 58,
				labelField: 59,
				groupLabelField: 60,
				groupItemsField: 61,
				disabledField: 6,
				placeholder: 7,
				searchable: 8,
				clearable: 9,
				renderer: 62,
				disableHighlight: 10,
				selectOnTab: 63,
				resetOnBlur: 11,
				resetOnSelect: 64,
				dndzone: 12,
				validatorAction: 65,
				dropdownItem: 13,
				controlItem: 14,
				multiple: 1,
				max: 66,
				collapseSelection: 15,
				creatable: 16,
				creatablePrefix: 67,
				allowEditing: 68,
				keepCreated: 69,
				delimiter: 70,
				createFilter: 53,
				createTransform: 54,
				fetch: 55,
				fetchMode: 71,
				fetchCallback: 72,
				fetchResetOnBlur: 73,
				minQuery: 74,
				lazyDropdown: 17,
				virtualList: 18,
				vlHeight: 19,
				vlItemSize: 20,
				searchField: 75,
				sortField: 76,
				disableSifter: 77,
				class: 21,
				style: 22,
				i18n: 78,
				readSelection: 57,
				value: 56,
				labelAsValue: 23,
				valueAsObject: 79,
				focus: 80,
				getSelection: 81,
				setSelection: 82,
				clearByParent: 83
			},
			null,
			[-1, -1, -1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Svelecte",
			options,
			id: create_fragment$7.name
		});
	}

	get name() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inputId() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inputId(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get required() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set required(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasAnchor() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasAnchor(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get options() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set options(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get labelField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set labelField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get groupLabelField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set groupLabelField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get groupItemsField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set groupItemsField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabledField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabledField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get placeholder() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set placeholder(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get searchable() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set searchable(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get clearable() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set clearable(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get renderer() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set renderer(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disableHighlight() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disableHighlight(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get selectOnTab() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set selectOnTab(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get resetOnBlur() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set resetOnBlur(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get resetOnSelect() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set resetOnSelect(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dndzone() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dndzone(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get validatorAction() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set validatorAction(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get dropdownItem() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set dropdownItem(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get controlItem() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set controlItem(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get multiple() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set multiple(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get max() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set max(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get collapseSelection() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set collapseSelection(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get creatable() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set creatable(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get creatablePrefix() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set creatablePrefix(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allowEditing() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allowEditing(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get keepCreated() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set keepCreated(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get delimiter() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set delimiter(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get createFilter() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set createFilter(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get createTransform() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set createTransform(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fetch() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fetch(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fetchMode() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fetchMode(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fetchCallback() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fetchCallback(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get fetchResetOnBlur() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set fetchResetOnBlur(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get minQuery() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set minQuery(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get lazyDropdown() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set lazyDropdown(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get virtualList() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set virtualList(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get vlHeight() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set vlHeight(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get vlItemSize() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set vlItemSize(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get searchField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set searchField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sortField() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sortField(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disableSifter() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disableSifter(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get style() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set style(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get i18n() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i18n(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get readSelection() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set readSelection(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get value() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get labelAsValue() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set labelAsValue(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get valueAsObject() {
		throw new Error("<Svelecte>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set valueAsObject(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get focus() {
		return this.$$.ctx[80];
	}

	set focus(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get getSelection() {
		return this.$$.ctx[81];
	}

	set getSelection(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get setSelection() {
		return this.$$.ctx[82];
	}

	set setSelection(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get clearByParent() {
		return this.$$.ctx[83];
	}

	set clearByParent(value) {
		throw new Error("<Svelecte>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* site/src/components/BoatSelect.svelte generated by Svelte v3.49.0 */

// (14:0) {:catch}
function create_catch_block$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Error loading index");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_catch_block$1.name,
		type: "catch",
		source: "(14:0) {:catch}",
		ctx
	});

	return block;
}

// (12:35)      <Svelecte {options}
function create_then_block$1(ctx) {
	let svelecte;
	let updating_value;
	let current;

	function svelecte_value_binding(value) {
		/*svelecte_value_binding*/ ctx[1](value);
	}

	let svelecte_props = {
		options: /*options*/ ctx[2],
		placeholder: "Sailnumber, name or type",
		virtualList: true,
		renderer
	};

	if (/*sailnumber*/ ctx[0] !== void 0) {
		svelecte_props.value = /*sailnumber*/ ctx[0];
	}

	svelecte = new Svelecte({ props: svelecte_props, $$inline: true });
	binding_callbacks.push(() => bind(svelecte, 'value', svelecte_value_binding));

	const block = {
		c: function create() {
			create_component(svelecte.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(svelecte, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const svelecte_changes = {};

			if (!updating_value && dirty & /*sailnumber*/ 1) {
				updating_value = true;
				svelecte_changes.value = /*sailnumber*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			svelecte.$set(svelecte_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(svelecte.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(svelecte.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(svelecte, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_then_block$1.name,
		type: "then",
		source: "(12:35)      <Svelecte {options}",
		ctx
	});

	return block;
}

// (1:0) <script> import Svelecte from 'svelecte'; import { indexLoader }
function create_pending_block$1(ctx) {
	const block = {
		c: noop$2,
		m: noop$2,
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: noop$2
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_pending_block$1.name,
		type: "pending",
		source: "(1:0) <script> import Svelecte from 'svelecte'; import { indexLoader }",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let await_block_anchor;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: true,
		pending: create_pending_block$1,
		then: create_then_block$1,
		catch: create_catch_block$1,
		value: 2,
		blocks: [,,,]
	};

	handle_promise(indexLoader(), info);

	const block = {
		c: function create() {
			await_block_anchor = empty$1();
			info.block.c();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			update_await_block_branch(info, ctx, dirty);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(info.block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function renderer({ sailnumber, name, type }) {
	return `<span class="sailnumber">${sailnumber}</span> ${name} (${type})`;
}

function instance$6($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BoatSelect', slots, []);
	let { sailnumber = undefined } = $$props;
	const writable_props = ['sailnumber'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BoatSelect> was created with unknown prop '${key}'`);
	});

	function svelecte_value_binding(value) {
		sailnumber = value;
		$$invalidate(0, sailnumber);
	}

	$$self.$$set = $$props => {
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
	};

	$$self.$capture_state = () => ({
		Svelecte,
		indexLoader,
		sailnumber,
		renderer
	});

	$$self.$inject_state = $$props => {
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [sailnumber, svelecte_value_binding];
}

class BoatSelect extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, { sailnumber: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BoatSelect",
			options,
			id: create_fragment$6.name
		});
	}

	get sailnumber() {
		throw new Error("<BoatSelect>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sailnumber(value) {
		throw new Error("<BoatSelect>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* site/src/components/Sailnumber.svelte generated by Svelte v3.49.0 */

const file$4 = "site/src/components/Sailnumber.svelte";

function create_fragment$5(ctx) {
	let span;
	let t_value = formatNumber(/*number*/ ctx[0]) + "";
	let t;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			attr_dev(span, "class", "sailnumber");
			add_location(span, file$4, 15, 0, 268);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*number*/ 1 && t_value !== (t_value = formatNumber(/*number*/ ctx[0]) + "")) set_data_dev(t, t_value);
		},
		i: noop$2,
		o: noop$2,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function formatNumber(sailnumber) {
	if (!sailnumber) {
		return;
	}

	if (sailnumber.substr(0, 3) == sailnumber.substr(4, 3)) {
		return sailnumber.substr(4);
	} else {
		return sailnumber;
	}
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Sailnumber', slots, []);
	let { number } = $$props;
	const writable_props = ['number'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sailnumber> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('number' in $$props) $$invalidate(0, number = $$props.number);
	};

	$$self.$capture_state = () => ({ number, formatNumber });

	$$self.$inject_state = $$props => {
		if ('number' in $$props) $$invalidate(0, number = $$props.number);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [number];
}

class Sailnumber extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, { number: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Sailnumber",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*number*/ ctx[0] === undefined && !('number' in props)) {
			console.warn("<Sailnumber> was created without expected prop 'number'");
		}
	}

	get number() {
		throw new Error("<Sailnumber>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set number(value) {
		throw new Error("<Sailnumber>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* site/src/components/CompareBoat.svelte generated by Svelte v3.49.0 */

// (17:0) {#if boat}
function create_if_block$2(ctx) {
	let sailnumber_1;
	let t0;
	let t1_value = /*boat*/ ctx[1].name + "";
	let t1;
	let t2;
	let polarplot;
	let current;

	sailnumber_1 = new Sailnumber({
			props: { number: /*sailnumber*/ ctx[0] },
			$$inline: true
		});

	polarplot = new PolarPlot({
			props: { boat: /*boat*/ ctx[1] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(sailnumber_1.$$.fragment);
			t0 = space();
			t1 = text(t1_value);
			t2 = space();
			create_component(polarplot.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(sailnumber_1, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, t2, anchor);
			mount_component(polarplot, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const sailnumber_1_changes = {};
			if (dirty & /*sailnumber*/ 1) sailnumber_1_changes.number = /*sailnumber*/ ctx[0];
			sailnumber_1.$set(sailnumber_1_changes);
			if ((!current || dirty & /*boat*/ 2) && t1_value !== (t1_value = /*boat*/ ctx[1].name + "")) set_data_dev(t1, t1_value);
			const polarplot_changes = {};
			if (dirty & /*boat*/ 2) polarplot_changes.boat = /*boat*/ ctx[1];
			polarplot.$set(polarplot_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sailnumber_1.$$.fragment, local);
			transition_in(polarplot.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sailnumber_1.$$.fragment, local);
			transition_out(polarplot.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(sailnumber_1, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(t2);
			destroy_component(polarplot, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(17:0) {#if boat}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*boat*/ ctx[1] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty$1();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*boat*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*boat*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CompareBoat', slots, []);
	let { sailnumber } = $$props;
	let boat;

	async function loadBoat(sailnumber) {
		$$invalidate(1, boat = await getBoat(sailnumber));
	}

	const writable_props = ['sailnumber'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CompareBoat> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
	};

	$$self.$capture_state = () => ({
		PolarPlot,
		Sailnumber,
		getBoat,
		sailnumber,
		boat,
		loadBoat
	});

	$$self.$inject_state = $$props => {
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
		if ('boat' in $$props) $$invalidate(1, boat = $$props.boat);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*sailnumber*/ 1) {
			sailnumber && loadBoat(sailnumber);
		}
	};

	return [sailnumber, boat];
}

class CompareBoat extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { sailnumber: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CompareBoat",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*sailnumber*/ ctx[0] === undefined && !('sailnumber' in props)) {
			console.warn("<CompareBoat> was created without expected prop 'sailnumber'");
		}
	}

	get sailnumber() {
		throw new Error("<CompareBoat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sailnumber(value) {
		throw new Error("<CompareBoat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* site/src/components/Compare.svelte generated by Svelte v3.49.0 */
const file$3 = "site/src/components/Compare.svelte";

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (42:8) {#each sailnumbers as sailnumber}
function create_each_block$1(ctx) {
	let div;
	let compareboat;
	let t;
	let current;

	compareboat = new CompareBoat({
			props: { sailnumber: /*sailnumber*/ ctx[6] },
			$$inline: true
		});

	const block = {
		c: function create() {
			div = element("div");
			create_component(compareboat.$$.fragment);
			t = space();
			attr_dev(div, "class", "col");
			add_location(div, file$3, 42, 12, 1082);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(compareboat, div, null);
			append_dev(div, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			const compareboat_changes = {};
			if (dirty & /*sailnumbers*/ 4) compareboat_changes.sailnumber = /*sailnumber*/ ctx[6];
			compareboat.$set(compareboat_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(compareboat.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(compareboat.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(compareboat);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(42:8) {#each sailnumbers as sailnumber}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let div4;
	let div2;
	let div0;
	let boatselect0;
	let updating_sailnumber;
	let t0;
	let div1;
	let boatselect1;
	let updating_sailnumber_1;
	let t1;
	let div3;
	let current;

	function boatselect0_sailnumber_binding(value) {
		/*boatselect0_sailnumber_binding*/ ctx[3](value);
	}

	let boatselect0_props = {};

	if (/*sailnumberA*/ ctx[0] !== void 0) {
		boatselect0_props.sailnumber = /*sailnumberA*/ ctx[0];
	}

	boatselect0 = new BoatSelect({ props: boatselect0_props, $$inline: true });
	binding_callbacks.push(() => bind(boatselect0, 'sailnumber', boatselect0_sailnumber_binding));

	function boatselect1_sailnumber_binding(value) {
		/*boatselect1_sailnumber_binding*/ ctx[4](value);
	}

	let boatselect1_props = {};

	if (/*sailnumberB*/ ctx[1] !== void 0) {
		boatselect1_props.sailnumber = /*sailnumberB*/ ctx[1];
	}

	boatselect1 = new BoatSelect({ props: boatselect1_props, $$inline: true });
	binding_callbacks.push(() => bind(boatselect1, 'sailnumber', boatselect1_sailnumber_binding));
	let each_value = /*sailnumbers*/ ctx[2];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div4 = element("div");
			div2 = element("div");
			div0 = element("div");
			create_component(boatselect0.$$.fragment);
			t0 = space();
			div1 = element("div");
			create_component(boatselect1.$$.fragment);
			t1 = space();
			div3 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div0, "class", "col");
			add_location(div0, file$3, 33, 8, 792);
			attr_dev(div1, "class", "col");
			add_location(div1, file$3, 36, 8, 890);
			attr_dev(div2, "class", "row p-2 row-cols-2");
			add_location(div2, file$3, 32, 4, 751);
			attr_dev(div3, "class", "row p-2 row-cols-2");
			add_location(div3, file$3, 40, 4, 995);
			attr_dev(div4, "class", "container-fluid");
			add_location(div4, file$3, 31, 0, 717);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div4, anchor);
			append_dev(div4, div2);
			append_dev(div2, div0);
			mount_component(boatselect0, div0, null);
			append_dev(div2, t0);
			append_dev(div2, div1);
			mount_component(boatselect1, div1, null);
			append_dev(div4, t1);
			append_dev(div4, div3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div3, null);
			}

			current = true;
		},
		p: function update(ctx, [dirty]) {
			const boatselect0_changes = {};

			if (!updating_sailnumber && dirty & /*sailnumberA*/ 1) {
				updating_sailnumber = true;
				boatselect0_changes.sailnumber = /*sailnumberA*/ ctx[0];
				add_flush_callback(() => updating_sailnumber = false);
			}

			boatselect0.$set(boatselect0_changes);
			const boatselect1_changes = {};

			if (!updating_sailnumber_1 && dirty & /*sailnumberB*/ 2) {
				updating_sailnumber_1 = true;
				boatselect1_changes.sailnumber = /*sailnumberB*/ ctx[1];
				add_flush_callback(() => updating_sailnumber_1 = false);
			}

			boatselect1.$set(boatselect1_changes);

			if (dirty & /*sailnumbers*/ 4) {
				each_value = /*sailnumbers*/ ctx[2];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div3, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(boatselect0.$$.fragment, local);
			transition_in(boatselect1.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(boatselect0.$$.fragment, local);
			transition_out(boatselect1.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div4);
			destroy_component(boatselect0);
			destroy_component(boatselect1);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const PREFIX = 'compare-';
const SEPARATOR = '|';

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Compare', slots, []);
	let sailnumberA = undefined;
	let sailnumberB = undefined;
	let sailnumbers = [];

	onMount(() => {
		const hash = window.location.hash.substring(1);

		if (hash.startsWith(PREFIX)) {
			$$invalidate(0, [sailnumberA, sailnumberB] = hash.substring(PREFIX.length).split(SEPARATOR), sailnumberA, $$invalidate(1, sailnumberB));
		}
	});

	function loadBoats(sailnumbers) {
		if (sailnumbers.some(x => x)) {
			window.location.hash = `${PREFIX}${sailnumbers.join(SEPARATOR)}`;
		}

		return sailnumbers;
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Compare> was created with unknown prop '${key}'`);
	});

	function boatselect0_sailnumber_binding(value) {
		sailnumberA = value;
		$$invalidate(0, sailnumberA);
	}

	function boatselect1_sailnumber_binding(value) {
		sailnumberB = value;
		$$invalidate(1, sailnumberB);
	}

	$$self.$capture_state = () => ({
		onMount,
		BoatSelect,
		CompareBoat,
		sailnumberA,
		sailnumberB,
		sailnumbers,
		PREFIX,
		SEPARATOR,
		loadBoats
	});

	$$self.$inject_state = $$props => {
		if ('sailnumberA' in $$props) $$invalidate(0, sailnumberA = $$props.sailnumberA);
		if ('sailnumberB' in $$props) $$invalidate(1, sailnumberB = $$props.sailnumberB);
		if ('sailnumbers' in $$props) $$invalidate(2, sailnumbers = $$props.sailnumbers);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*sailnumberA, sailnumberB*/ 3) {
			$$invalidate(2, sailnumbers = loadBoats([sailnumberA, sailnumberB]));
		}
	};

	return [
		sailnumberA,
		sailnumberB,
		sailnumbers,
		boatselect0_sailnumber_binding,
		boatselect1_sailnumber_binding
	];
}

class Compare extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Compare",
			options,
			id: create_fragment$3.name
		});
	}
}

/* site/src/components/CustomPlot.svelte generated by Svelte v3.49.0 */
const file$2 = "site/src/components/CustomPlot.svelte";

function create_fragment$2(ctx) {
	let div2;
	let div0;
	let polarplot;
	let t;
	let div1;
	let textarea;
	let current;
	let mounted;
	let dispose;

	polarplot = new PolarPlot({
			props: { boat: polarImport(/*polar*/ ctx[0]) },
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			create_component(polarplot.$$.fragment);
			t = space();
			div1 = element("div");
			textarea = element("textarea");
			attr_dev(div0, "class", "col-sm");
			add_location(div0, file$2, 42, 4, 1094);
			attr_dev(textarea, "class", "plot-only");
			add_location(textarea, file$2, 46, 8, 1207);
			attr_dev(div1, "class", "col-sm");
			add_location(div1, file$2, 45, 4, 1178);
			attr_dev(div2, "class", "row");
			add_location(div2, file$2, 41, 0, 1072);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			mount_component(polarplot, div0, null);
			append_dev(div2, t);
			append_dev(div2, div1);
			append_dev(div1, textarea);
			set_input_value(textarea, /*polar*/ ctx[0]);
			current = true;

			if (!mounted) {
				dispose = listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const polarplot_changes = {};
			if (dirty & /*polar*/ 1) polarplot_changes.boat = polarImport(/*polar*/ ctx[0]);
			polarplot.$set(polarplot_changes);

			if (dirty & /*polar*/ 1) {
				set_input_value(textarea, /*polar*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(polarplot.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(polarplot.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(polarplot);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('CustomPlot', slots, []);

	let polar = `twa/tws;6;8;10;12;14;16;20
0;0;0;0;0;0;0;0

# This is the polar of https://jieter.github.io/orc-data/site/#ITA14800

# Zeros are not plotted, you can use this to add optimal beat/run angles for a
# specific wind speed. In this case, VMG must be converted to SOG:
#   SOG = VMG / cos(beat_angle)

# Beat angles
44.2;5.02;0;0;0;0;0;0
42.9;0;5.99;0;0;0;0;0
42.5;0;0;6.81;0;0;0;0
40.8;0;0;0;7.17;0;0;0
39.3;0;0;0;0;7.31;0;0
38.3;0;0;0;0;0;7.39;0
38.4;0;0;0;0;0;0;7.53

52;5.58;6.71;7.54;7.9;8.06;8.15;8.25
60;5.97;7.13;7.82;8.14;8.3;8.4;8.49
75;6.33;7.46;8.03;8.36;8.62;8.83;9.02
90;6.41;7.69;8.09;8.36;8.66;8.98;9.54
110;6.35;7.63;8.31;8.79;9.07;9.27;9.68
120;6.15;7.54;8.22;8.65;9.15;9.52;10.07
135;5.48;6.78;7.75;8.26;8.69;9.2;10.45
150;4.54;5.7;6.76;7.58;8.12;8.52;9.46

# Run angles
142.1;4.98;0;0;0;0;0;0
144.7;0;6.04;0;0;0;0;0
144.9;0;0;7.15;0;0;0;0
153.4;0;0;0;7.38;0;0;0
159.4;0;0;0;0;7.71;0;0
166.9;0;0;0;0;0;7.92;0
173.1;0;0;0;0;0;0;8.54`;

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CustomPlot> was created with unknown prop '${key}'`);
	});

	function textarea_input_handler() {
		polar = this.value;
		$$invalidate(0, polar);
	}

	$$self.$capture_state = () => ({ PolarPlot, polarImport, polar });

	$$self.$inject_state = $$props => {
		if ('polar' in $$props) $$invalidate(0, polar = $$props.polar);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [polar, textarea_input_handler];
}

class CustomPlot extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "CustomPlot",
			options,
			id: create_fragment$2.name
		});
	}
}

/* site/src/components/Extremes.svelte generated by Svelte v3.49.0 */

const { Object: Object_1 } = globals;
const file$1 = "site/src/components/Extremes.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i][0];
	child_ctx[10] = list[i][1];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i][0];
	child_ctx[14] = list[i][1];
	child_ctx[15] = list[i][2];
	child_ctx[16] = list[i][3];
	return child_ctx;
}

// (1:0) <script> import { onMount }
function create_catch_block(ctx) {
	const block = {
		c: noop$2,
		m: noop$2,
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: noop$2
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_catch_block.name,
		type: "catch",
		source: "(1:0) <script> import { onMount }",
		ctx
	});

	return block;
}

// (60:48)                  <div class="row">                     {#each Object.entries(extremes) as [extreme, boats]}
function create_then_block(ctx) {
	let div;
	let current;
	let each_value = Object.entries(/*extremes*/ ctx[8]);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(div, "class", "row");
			add_location(div, file$1, 60, 16, 1790);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*Object, getExtremes, sailnumber, loadBoat, labels*/ 25) {
				each_value = Object.entries(/*extremes*/ ctx[8]);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_then_block.name,
		type: "then",
		source: "(60:48)                  <div class=\\\"row\\\">                     {#each Object.entries(extremes) as [extreme, boats]}",
		ctx
	});

	return block;
}

// (67:32) {#each boats as [number, name, type, value]}
function create_each_block_1(ctx) {
	let li;
	let sailnumber_1;
	let t0;
	let t1_value = (/*name*/ ctx[14] || '?') + "";
	let t1;
	let t2;
	let span;
	let t3_value = /*value*/ ctx[16] + "";
	let t3;
	let t4;
	let current;
	let mounted;
	let dispose;

	sailnumber_1 = new Sailnumber({
			props: { number: /*number*/ ctx[13] },
			$$inline: true
		});

	function click_handler() {
		return /*click_handler*/ ctx[6](/*number*/ ctx[13]);
	}

	function mouseenter_handler() {
		return /*mouseenter_handler*/ ctx[7](/*number*/ ctx[13]);
	}

	const block = {
		c: function create() {
			li = element("li");
			create_component(sailnumber_1.$$.fragment);
			t0 = space();
			t1 = text(t1_value);
			t2 = space();
			span = element("span");
			t3 = text(t3_value);
			t4 = space();
			attr_dev(span, "class", "float-end");
			add_location(span, file$1, 74, 40, 2563);
			attr_dev(li, "class", "boat svelte-15udm7i");
			add_location(li, file$1, 67, 36, 2152);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			mount_component(sailnumber_1, li, null);
			append_dev(li, t0);
			append_dev(li, t1);
			append_dev(li, t2);
			append_dev(li, span);
			append_dev(span, t3);
			append_dev(li, t4);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(li, "click", click_handler, false, false, false),
					listen_dev(li, "mouseenter", mouseenter_handler, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sailnumber_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sailnumber_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(sailnumber_1);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(67:32) {#each boats as [number, name, type, value]}",
		ctx
	});

	return block;
}

// (62:20) {#each Object.entries(extremes) as [extreme, boats]}
function create_each_block(ctx) {
	let div;
	let h5;
	let t0_value = /*labels*/ ctx[4][/*extreme*/ ctx[9]] + "";
	let t0;
	let t1;
	let ul;
	let t2;
	let current;
	let each_value_1 = /*boats*/ ctx[10];
	validate_each_argument(each_value_1);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div = element("div");
			h5 = element("h5");
			t0 = text(t0_value);
			t1 = space();
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			add_location(h5, file$1, 63, 28, 1956);
			attr_dev(ul, "class", "list-unstyled");
			add_location(ul, file$1, 65, 28, 2012);
			attr_dev(div, "class", "col-md-6");
			add_location(div, file$1, 62, 24, 1905);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h5);
			append_dev(h5, t0);
			append_dev(div, t1);
			append_dev(div, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_dev(div, t2);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*sailnumber, Object, getExtremes, loadBoat*/ 9) {
				each_value_1 = /*boats*/ ctx[10];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(62:20) {#each Object.entries(extremes) as [extreme, boats]}",
		ctx
	});

	return block;
}

// (1:0) <script> import { onMount }
function create_pending_block(ctx) {
	const block = {
		c: noop$2,
		m: noop$2,
		p: noop$2,
		i: noop$2,
		o: noop$2,
		d: noop$2
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_pending_block.name,
		type: "pending",
		source: "(1:0) <script> import { onMount }",
		ctx
	});

	return block;
}

// (85:12) {#if boat}
function create_if_block$1(ctx) {
	let h6;
	let sailnumber_1;
	let t0;
	let t1_value = /*boat*/ ctx[1].name + "";
	let t1;
	let t2;
	let t3_value = /*boat*/ ctx[1].boat.type + "";
	let t3;
	let t4;
	let t5;
	let polarplot;
	let current;

	sailnumber_1 = new Sailnumber({
			props: { number: /*boat*/ ctx[1].sailnumber },
			$$inline: true
		});

	polarplot = new PolarPlot({
			props: { boat: /*boat*/ ctx[1] },
			$$inline: true
		});

	const block = {
		c: function create() {
			h6 = element("h6");
			create_component(sailnumber_1.$$.fragment);
			t0 = space();
			t1 = text(t1_value);
			t2 = text(" (");
			t3 = text(t3_value);
			t4 = text(")");
			t5 = space();
			create_component(polarplot.$$.fragment);
			attr_dev(h6, "class", "svelte-15udm7i");
			add_location(h6, file$1, 85, 16, 2910);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h6, anchor);
			mount_component(sailnumber_1, h6, null);
			append_dev(h6, t0);
			append_dev(h6, t1);
			append_dev(h6, t2);
			append_dev(h6, t3);
			append_dev(h6, t4);
			insert_dev(target, t5, anchor);
			mount_component(polarplot, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const sailnumber_1_changes = {};
			if (dirty & /*boat*/ 2) sailnumber_1_changes.number = /*boat*/ ctx[1].sailnumber;
			sailnumber_1.$set(sailnumber_1_changes);
			if ((!current || dirty & /*boat*/ 2) && t1_value !== (t1_value = /*boat*/ ctx[1].name + "")) set_data_dev(t1, t1_value);
			if ((!current || dirty & /*boat*/ 2) && t3_value !== (t3_value = /*boat*/ ctx[1].boat.type + "")) set_data_dev(t3, t3_value);
			const polarplot_changes = {};
			if (dirty & /*boat*/ 2) polarplot_changes.boat = /*boat*/ ctx[1];
			polarplot.$set(polarplot_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sailnumber_1.$$.fragment, local);
			transition_in(polarplot.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sailnumber_1.$$.fragment, local);
			transition_out(polarplot.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h6);
			destroy_component(sailnumber_1);
			if (detaching) detach_dev(t5);
			destroy_component(polarplot, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(85:12) {#if boat}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div6;
	let div2;
	let div0;
	let p0;
	let t0;
	let span;
	let t2;
	let t3;
	let p1;
	let t4;
	let a0;
	let t6;
	let a1;
	let t8;
	let a2;
	let t10;
	let t11;
	let div1;
	let button;
	let t13;
	let div5;
	let div3;
	let t14;
	let div4;
	let current;
	let mounted;
	let dispose;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 8,
		blocks: [,,,]
	};

	handle_promise(getExtremes(), info);
	let if_block = /*boat*/ ctx[1] && create_if_block$1(ctx);

	const block = {
		c: function create() {
			div6 = element("div");
			div2 = element("div");
			div0 = element("div");
			p0 = element("p");
			t0 = text("Polar diagrams for sailyachts with ORC certificates. Select one of the boats below, search by\n                sailnumber, name or type or select a\n                ");
			span = element("span");
			span.textContent = "random boat";
			t2 = text(".");
			t3 = space();
			p1 = element("p");
			t4 = text("Questions/suggestions? Contact me on ");
			a0 = element("a");
			a0.textContent = "Twitter";
			t6 = text(" or\n                ");
			a1 = element("a");
			a1.textContent = "GitHub";
			t8 = text(". All data is fetched from\n                ");
			a2 = element("a");
			a2.textContent = "ORC.org";
			t10 = text(".");
			t11 = space();
			div1 = element("div");
			button = element("button");
			button.textContent = "Random boat";
			t13 = space();
			div5 = element("div");
			div3 = element("div");
			info.block.c();
			t14 = space();
			div4 = element("div");
			if (if_block) if_block.c();
			attr_dev(span, "class", "link-primary svelte-15udm7i");
			add_location(span, file$1, 43, 16, 1088);
			add_location(p0, file$1, 40, 12, 905);
			attr_dev(a0, "href", "https://twitter.com/jietermanis");
			add_location(a0, file$1, 47, 53, 1248);
			attr_dev(a1, "href", "https://github.com/jieter/orc-data");
			add_location(a1, file$1, 48, 16, 1321);
			attr_dev(a2, "href", "https://orc.org/index.asp?id=44");
			add_location(a2, file$1, 49, 16, 1419);
			add_location(p1, file$1, 46, 12, 1191);
			attr_dev(div0, "class", "col col-sm-8 p-4");
			add_location(div0, file$1, 39, 8, 862);
			attr_dev(button, "class", "btn btn-primary");
			add_location(button, file$1, 53, 12, 1553);
			attr_dev(div1, "class", "col-sm-4 p-4");
			add_location(div1, file$1, 52, 8, 1514);
			attr_dev(div2, "class", "row gx-5");
			add_location(div2, file$1, 38, 4, 831);
			attr_dev(div3, "class", "col col-sm-8 p-4");
			add_location(div3, file$1, 58, 8, 1694);
			attr_dev(div4, "class", "col-sm-4 p-4");
			add_location(div4, file$1, 83, 8, 2844);
			attr_dev(div5, "class", "row gx-5");
			add_location(div5, file$1, 57, 4, 1663);
			attr_dev(div6, "class", "container-fluid");
			add_location(div6, file$1, 37, 0, 797);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div6, anchor);
			append_dev(div6, div2);
			append_dev(div2, div0);
			append_dev(div0, p0);
			append_dev(p0, t0);
			append_dev(p0, span);
			append_dev(p0, t2);
			append_dev(div0, t3);
			append_dev(div0, p1);
			append_dev(p1, t4);
			append_dev(p1, a0);
			append_dev(p1, t6);
			append_dev(p1, a1);
			append_dev(p1, t8);
			append_dev(p1, a2);
			append_dev(p1, t10);
			append_dev(div2, t11);
			append_dev(div2, div1);
			append_dev(div1, button);
			append_dev(div6, t13);
			append_dev(div6, div5);
			append_dev(div5, div3);
			info.block.m(div3, info.anchor = null);
			info.mount = () => div3;
			info.anchor = null;
			append_dev(div5, t14);
			append_dev(div5, div4);
			if (if_block) if_block.m(div4, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(span, "click", /*loadRandomBoat*/ ctx[2], false, false, false),
					listen_dev(button, "click", /*loadRandomBoat*/ ctx[2], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;
			update_await_block_branch(info, ctx, dirty);

			if (/*boat*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*boat*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div4, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(info.block);
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div6);
			info.block.d();
			info.token = null;
			info = null;
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Extremes', slots, []);
	let { sailnumber } = $$props;
	let hoverSailnumber;
	let boat;

	async function loadRandomBoat() {
		$$invalidate(0, sailnumber = await getRandomBoat());
	}

	onMount(async () => {
		$$invalidate(5, hoverSailnumber = await getRandomBoat());
	});

	async function loadBoat(number) {
		if (number) {
			$$invalidate(1, boat = await getBoat(number));
		}
	}

	const labels = {
		max_speed: 'Greatest maximum speed (kts)',
		min_speed: 'Smallest maximum speed (kts)',
		max_length: 'Greatest length over all (m)',
		max_displacement: 'Greatest displacement (kg)',
		max_draft: 'Greatest draft (m)'
	};

	const writable_props = ['sailnumber'];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Extremes> was created with unknown prop '${key}'`);
	});

	const click_handler = number => $$invalidate(0, sailnumber = number);
	const mouseenter_handler = number => loadBoat(number);

	$$self.$$set = $$props => {
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
	};

	$$self.$capture_state = () => ({
		onMount,
		Sailnumber,
		PolarPlot,
		getBoat,
		getExtremes,
		getRandomBoat,
		sailnumber,
		hoverSailnumber,
		boat,
		loadRandomBoat,
		loadBoat,
		labels
	});

	$$self.$inject_state = $$props => {
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
		if ('hoverSailnumber' in $$props) $$invalidate(5, hoverSailnumber = $$props.hoverSailnumber);
		if ('boat' in $$props) $$invalidate(1, boat = $$props.boat);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*hoverSailnumber*/ 32) {
			loadBoat(hoverSailnumber);
		}
	};

	return [
		sailnumber,
		boat,
		loadRandomBoat,
		loadBoat,
		labels,
		hoverSailnumber,
		click_handler,
		mouseenter_handler
	];
}

class Extremes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, { sailnumber: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Extremes",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*sailnumber*/ ctx[0] === undefined && !('sailnumber' in props)) {
			console.warn("<Extremes> was created without expected prop 'sailnumber'");
		}
	}

	get sailnumber() {
		throw new Error("<Extremes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sailnumber(value) {
		throw new Error("<Extremes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* site/src/App.svelte generated by Svelte v3.49.0 */
const file = "site/src/App.svelte";

// (55:16) {#if !sailnumber || (sailnumber && !sailnumber.startsWith('compare'))}
function create_if_block_3(ctx) {
	let li;
	let boatselect;
	let updating_sailnumber;
	let current;

	function boatselect_sailnumber_binding(value) {
		/*boatselect_sailnumber_binding*/ ctx[2](value);
	}

	let boatselect_props = {};

	if (/*sailnumber*/ ctx[0] !== void 0) {
		boatselect_props.sailnumber = /*sailnumber*/ ctx[0];
	}

	boatselect = new BoatSelect({ props: boatselect_props, $$inline: true });
	binding_callbacks.push(() => bind(boatselect, 'sailnumber', boatselect_sailnumber_binding));

	const block = {
		c: function create() {
			li = element("li");
			create_component(boatselect.$$.fragment);
			attr_dev(li, "class", "nav-item d-block-md");
			add_location(li, file, 55, 20, 1801);
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			mount_component(boatselect, li, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			const boatselect_changes = {};

			if (!updating_sailnumber && dirty & /*sailnumber*/ 1) {
				updating_sailnumber = true;
				boatselect_changes.sailnumber = /*sailnumber*/ ctx[0];
				add_flush_callback(() => updating_sailnumber = false);
			}

			boatselect.$set(boatselect_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(boatselect.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(boatselect.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(boatselect);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(55:16) {#if !sailnumber || (sailnumber && !sailnumber.startsWith('compare'))}",
		ctx
	});

	return block;
}

// (79:0) {:else}
function create_else_block(ctx) {
	let boat;
	let current;

	boat = new Boat({
			props: { sailnumber: /*sailnumber*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(boat.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(boat, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const boat_changes = {};
			if (dirty & /*sailnumber*/ 1) boat_changes.sailnumber = /*sailnumber*/ ctx[0];
			boat.$set(boat_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(boat.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(boat.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(boat, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(79:0) {:else}",
		ctx
	});

	return block;
}

// (77:38) 
function create_if_block_2(ctx) {
	let compare;
	let current;
	compare = new Compare({ $$inline: true });

	const block = {
		c: function create() {
			create_component(compare.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(compare, target, anchor);
			current = true;
		},
		p: noop$2,
		i: function intro(local) {
			if (current) return;
			transition_in(compare.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(compare.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(compare, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(77:38) ",
		ctx
	});

	return block;
}

// (75:32) 
function create_if_block_1(ctx) {
	let customplot;
	let current;
	customplot = new CustomPlot({ $$inline: true });

	const block = {
		c: function create() {
			create_component(customplot.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(customplot, target, anchor);
			current = true;
		},
		p: noop$2,
		i: function intro(local) {
			if (current) return;
			transition_in(customplot.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(customplot.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(customplot, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(75:32) ",
		ctx
	});

	return block;
}

// (73:0) {#if route == 'extremes'}
function create_if_block(ctx) {
	let extremes;
	let updating_sailnumber;
	let current;

	function extremes_sailnumber_binding(value) {
		/*extremes_sailnumber_binding*/ ctx[3](value);
	}

	let extremes_props = {};

	if (/*sailnumber*/ ctx[0] !== void 0) {
		extremes_props.sailnumber = /*sailnumber*/ ctx[0];
	}

	extremes = new Extremes({ props: extremes_props, $$inline: true });
	binding_callbacks.push(() => bind(extremes, 'sailnumber', extremes_sailnumber_binding));

	const block = {
		c: function create() {
			create_component(extremes.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(extremes, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const extremes_changes = {};

			if (!updating_sailnumber && dirty & /*sailnumber*/ 1) {
				updating_sailnumber = true;
				extremes_changes.sailnumber = /*sailnumber*/ ctx[0];
				add_flush_callback(() => updating_sailnumber = false);
			}

			extremes.$set(extremes_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(extremes.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(extremes.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(extremes, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(73:0) {#if route == 'extremes'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let nav;
	let div2;
	let a0;
	let t1;
	let button;
	let span;
	let t2;
	let div1;
	let ul;
	let show_if_1 = !/*sailnumber*/ ctx[0] || /*sailnumber*/ ctx[0] && !/*sailnumber*/ ctx[0].startsWith('compare');
	let t3;
	let li0;
	let a1;
	let t5;
	let li1;
	let a2;
	let t7;
	let div0;
	let a3;
	let t9;
	let a4;
	let t11;
	let a5;
	let t13;
	let t14;
	let show_if;
	let current_block_type_index;
	let if_block1;
	let if_block1_anchor;
	let current;
	let if_block0 = show_if_1 && create_if_block_3(ctx);
	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*route*/ 2) show_if = null;
		if (/*route*/ ctx[1] == 'extremes') return 0;
		if (/*route*/ ctx[1] == 'customplot') return 1;
		if (show_if == null) show_if = !!/*route*/ ctx[1].startsWith('compare');
		if (show_if) return 2;
		return 3;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			nav = element("nav");
			div2 = element("div");
			a0 = element("a");
			a0.textContent = "ORC sailboat data (2021)";
			t1 = space();
			button = element("button");
			span = element("span");
			t2 = space();
			div1 = element("div");
			ul = element("ul");
			if (if_block0) if_block0.c();
			t3 = space();
			li0 = element("li");
			a1 = element("a");
			a1.textContent = "Compare boats";
			t5 = space();
			li1 = element("li");
			a2 = element("a");
			a2.textContent = "Plot custom CSV";
			t7 = space();
			div0 = element("div");
			a3 = element("a");
			a3.textContent = "Twitter";
			t9 = text(",\n                ");
			a4 = element("a");
			a4.textContent = "GitHub";
			t11 = text(",\n                ");
			a5 = element("a");
			a5.textContent = "Data © ORC.org";
			t13 = text("\n             ");
			t14 = space();
			if_block1.c();
			if_block1_anchor = empty$1();
			attr_dev(a0, "class", "navbar-brand");
			attr_dev(a0, "href", "#extremes");
			add_location(a0, file, 39, 8, 1118);
			attr_dev(span, "class", "navbar-toggler-icon");
			add_location(span, file, 49, 12, 1506);
			attr_dev(button, "class", "navbar-toggler");
			attr_dev(button, "type", "button");
			attr_dev(button, "data-bs-toggle", "collapse");
			attr_dev(button, "data-bs-target", "#navbarSupportedContent");
			attr_dev(button, "aria-controls", "navbarSupportedContent");
			attr_dev(button, "aria-expanded", "false");
			attr_dev(button, "aria-label", "Toggle navigation");
			add_location(button, file, 40, 8, 1196);
			attr_dev(a1, "href", "#compare");
			attr_dev(a1, "class", "nav-link");
			add_location(a1, file, 59, 37, 1974);
			attr_dev(li0, "class", "nav-item");
			add_location(li0, file, 59, 16, 1953);
			attr_dev(a2, "href", "#customplot");
			attr_dev(a2, "class", "nav-link");
			add_location(a2, file, 60, 37, 2070);
			attr_dev(li1, "class", "nav-item");
			add_location(li1, file, 60, 16, 2049);
			attr_dev(ul, "class", "navbar-nav me-auto mb-2 mb-lg-0");
			add_location(ul, file, 53, 12, 1649);
			attr_dev(a3, "href", "https://twitter.com/jietermanis");
			add_location(a3, file, 64, 16, 2214);
			attr_dev(a4, "href", "https://github.com/jieter/orc-data/");
			add_location(a4, file, 65, 16, 2285);
			attr_dev(a5, "href", "https://orc.org/index.asp?id=44");
			add_location(a5, file, 66, 16, 2359);
			attr_dev(div0, "class", "d-flex navbar-text");
			add_location(div0, file, 63, 12, 2165);
			attr_dev(div1, "class", "collapse navbar-collapse");
			attr_dev(div1, "id", "navbarSupportedContent");
			add_location(div1, file, 52, 8, 1570);
			attr_dev(div2, "class", "container-fluid");
			add_location(div2, file, 38, 4, 1080);
			attr_dev(nav, "class", "navbar navbar-expand-lg navbar-light bg-light");
			add_location(nav, file, 37, 0, 1016);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);
			append_dev(nav, div2);
			append_dev(div2, a0);
			append_dev(div2, t1);
			append_dev(div2, button);
			append_dev(button, span);
			append_dev(div2, t2);
			append_dev(div2, div1);
			append_dev(div1, ul);
			if (if_block0) if_block0.m(ul, null);
			append_dev(ul, t3);
			append_dev(ul, li0);
			append_dev(li0, a1);
			append_dev(ul, t5);
			append_dev(ul, li1);
			append_dev(li1, a2);
			append_dev(div1, t7);
			append_dev(div1, div0);
			append_dev(div0, a3);
			append_dev(div0, t9);
			append_dev(div0, a4);
			append_dev(div0, t11);
			append_dev(div0, a5);
			append_dev(div1, t13);
			insert_dev(target, t14, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*sailnumber*/ 1) show_if_1 = !/*sailnumber*/ ctx[0] || /*sailnumber*/ ctx[0] && !/*sailnumber*/ ctx[0].startsWith('compare');

			if (show_if_1) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*sailnumber*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(ul, t3);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block1 = if_blocks[current_block_type_index];

				if (!if_block1) {
					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block1.c();
				} else {
					if_block1.p(ctx, dirty);
				}

				transition_in(if_block1, 1);
				if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			if (if_block0) if_block0.d();
			if (detaching) detach_dev(t14);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	let { route = 'extremes' } = $$props;
	let { sailnumber } = $$props;

	function onhashchange() {
		const hash = window.location.hash;
		$$invalidate(1, route = hash.length > 1 ? hash.substring(1) : undefined);

		if (['extremes', 'customplot', 'compare'].some(val => route.startsWith(val))) {
			$$invalidate(0, sailnumber = null);
		} else {
			$$invalidate(0, sailnumber = route);
			$$invalidate(1, route = 'boat');
		}
	}

	onMount(() => {
		window.addEventListener('hashchange', onhashchange, false);
		return () => window.removeEventListener('hashchange', onhashchange, false);
	});

	const writable_props = ['route', 'sailnumber'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	function boatselect_sailnumber_binding(value) {
		sailnumber = value;
		$$invalidate(0, sailnumber);
	}

	function extremes_sailnumber_binding(value) {
		sailnumber = value;
		$$invalidate(0, sailnumber);
	}

	$$self.$$set = $$props => {
		if ('route' in $$props) $$invalidate(1, route = $$props.route);
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
	};

	$$self.$capture_state = () => ({
		onMount,
		Boat,
		BoatSelect,
		Compare,
		CustomPlot,
		Extremes,
		route,
		sailnumber,
		onhashchange
	});

	$$self.$inject_state = $$props => {
		if ('route' in $$props) $$invalidate(1, route = $$props.route);
		if ('sailnumber' in $$props) $$invalidate(0, sailnumber = $$props.sailnumber);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*sailnumber*/ 1) {
			{
				if (sailnumber && !['extremes', 'customplot', 'compare'].some(val => sailnumber.startsWith(val))) {
					window.location.hash = sailnumber;
				}
			}
		}
	};

	return [sailnumber, route, boatselect_sailnumber_binding, extremes_sailnumber_binding];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init$1(this, options, instance, create_fragment, safe_not_equal, { route: 1, sailnumber: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*sailnumber*/ ctx[0] === undefined && !('sailnumber' in props)) {
			console.warn("<App> was created without expected prop 'sailnumber'");
		}
	}

	get route() {
		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set route(value) {
		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get sailnumber() {
		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set sailnumber(value) {
		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const hash = window.location.hash;
const app = new App({
    target: document.querySelector('#container'),
    props: {
        sailnumber: hash.length > 1 ? hash.substring(1) : undefined,
    },
});

return app;

})();
//# sourceMappingURL=index.js.map
