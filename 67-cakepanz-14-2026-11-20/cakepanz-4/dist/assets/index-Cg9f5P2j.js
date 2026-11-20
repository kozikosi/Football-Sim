(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const sl=!1;var it=Array.isArray,bc=Array.prototype.indexOf,gs=Array.prototype.includes,ct=Array.from,ir=Object.defineProperty,Pa=Object.getOwnPropertyDescriptor,tl=Object.getOwnPropertyDescriptors,Lc=Object.prototype,Ac=Array.prototype,cr=Object.getPrototypeOf,Or=Object.isExtensible;const ma=()=>{};function Mc(n){return n()}function Ht(n){for(var e=0;e<n.length;e++)n[e]()}function rl(){var n,e,a=new Promise((s,t)=>{n=s,e=t});return{promise:a,resolve:n,reject:e}}function Jc(n,e){if(Array.isArray(n))return n;if(!(Symbol.iterator in n))return Array.from(n);const a=[];for(const s of n)if(a.push(s),a.length===e)break;return a}const qn=2,Ha=4,Ds=8,ol=1<<24,Ee=16,Fe=32,la=64,Kt=128,fr=256,Me=512,Kn=1024,Rn=2048,he=4096,$n=8192,zn=16384,Ua=32768,Bs=1<<25,Ka=65536,Qs=1<<17,_c=1<<18,qa=1<<19,ll=1<<20,Ie=1<<25,js=1<<21,Ga=1<<22,oa=1<<23,qe=Symbol("$state"),il=Symbol("component"),Fc=Symbol("legacy props"),Wc=Symbol(""),cl=Symbol("attributes"),xt=Symbol("class"),Ot=Symbol("style"),Vt=Symbol("text"),ws=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"},Pc=1,Gc=2,fl=4,Nc=8,Ic=16,Hc=1,Kc=2,xc=4,Oc=8,Vc=16,Yc=1,zc=2,ul={},In=Symbol("uninitialized"),Qc="http://www.w3.org/1999/xhtml";function jc(){console.warn("https://svelte.dev/e/derived_inert")}function Uc(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function qc(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function dl(n){return n===this.v}function pl(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function hl(n){return!pl(n,this.v)}function Zc(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Xc(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function $c(n,e,a){throw new Error("https://svelte.dev/e/each_key_duplicate")}function nf(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ef(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function af(n){throw new Error("https://svelte.dev/e/effect_orphan")}function sf(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function tf(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function rf(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function of(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function lf(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function cf(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let Za=!1,ff=!1;function uf(){Za=!0}let Ln=null;function xa(n){Ln=n}function yn(n,e=!1,a){Ln={p:Ln,i:!1,c:null,e:null,s:n,x:null,r:pn,l:Za&&!e?{s:null,u:null,$:[]}:null}}function Sn(n){var e=Ln,a=e.e;if(a!==null){e.e=null;for(var s of a)Ml(s)}return e.i=!0,Ln=e.p,ur(n)}function ur(n={}){return ir(n,il,{value:!0}),n}function Rs(){return!Za||Ln!==null&&Ln.l===null}let La=[];function df(){var n=La;La=[],Ht(n)}function ta(n){if(La.length===0){var e=La;queueMicrotask(()=>{e===La&&df()})}La.push(n)}const pf=-7169;function _n(n,e){n.f=n.f&pf|e}function dr(n){(n.f&Me)!==0||n.deps===null?_n(n,Kn):_n(n,he)}function ml(n,e){(n.f&Rn)!==0?e.set(n,Rn):(n.f&he)!==0&&e.get(n)!==Rn&&e.set(n,he),_n(n,Kn)}function ft(n){var e=un,a=pn;ye(null),Ve(null);try{return n()}finally{ye(e),Ve(a)}}function hf(n,e,a,s){const t=Rs()?Oa:pr;var r=n.filter(d=>!d.settled),o=e.map(t);if(a.length===0&&r.length===0){s(o);return}var l=pn,i=mf(),c=r.length===1?r[0].promise:r.length>1?Promise.all(r.map(d=>d.promise)):null;function u(d){if((l.f&zn)===0){i();try{s([...o,...d])}catch(h){Ne(h,l)}Us()}}var p=vl();if(a.length===0){c.then(()=>u([])).finally(p);return}function m(){Promise.all(a.map(d=>vf(d))).then(u).catch(d=>Ne(d,l)).finally(p)}c?c.then(()=>{if((l.f&zn)!==0){p();return}i(),m(),Us()}):m()}function mf(){var n=pn,e=un,a=Ln,s=mn;return function(r=!0){Ve(n),ye(e),xa(a),r&&(n.f&zn)===0&&(s?.activate(),s?.apply())}}function Us(n=!0){Ve(null),ye(null),xa(null),n&&mn?.deactivate()}function vl(){var n=pn,e=n.b,a=mn,s=!!e?.is_rendered();return e?.update_pending_count(1,a),a.increment(s,n),()=>{e?.update_pending_count(-1,a),a.decrement(s,n)}}function Oa(n){var e=qn|Rn;return pn!==null&&(pn.f|=qa),{ctx:Ln,deps:null,effects:null,equals:dl,f:e,fn:n,reactions:null,rv:0,v:In,wv:0,parent:pn,ac:null}}const rs=Symbol("obsolete");function vf(n,e,a){let s=pn;s===null&&Xc();var t=void 0,r=Ba(In),o=!un,l=new Set;return Af(()=>{var i=pn,c=rl();t=c.promise;try{Promise.resolve(n()).then(c.resolve,d=>{d!==ws&&c.reject(d)}).finally(Us)}catch(d){c.reject(d),Us()}var u=mn;if(o){if((i.f&Ua)!==0)var p=vl();if(s.b?.is_rendered())u.async_deriveds.get(i)?.reject(rs);else for(const d of l.values())d.reject(rs);l.add(c),u.async_deriveds.set(i,c)}const m=(d,h=void 0)=>{p?.(),l.delete(c),h!==rs&&(u.activate(),h?(r.f|=oa,Va(r,h)):((r.f&oa)!==0&&(r.f^=oa),Va(r,d)),u.deactivate())};c.promise.then(m,d=>m(null,d||"unknown"))}),Br(()=>{for(const i of l)i.reject(rs)}),new Promise(i=>{function c(u){function p(){u===t?i(r):c(t)}u.then(p,p)}c(t)})}function on(n){const e=Oa(n);return Gl(e),e}function pr(n){const e=Oa(n);return e.equals=hl,e}function gf(n){var e=n.effects;if(e!==null){n.effects=null;for(var a=0;a<e.length;a+=1)le(e[a])}}function hr(n){var e,a=pn,s=n.parent;if(!Xe&&s!==null&&n.v!==In&&(s.f&(zn|$n))!==0)return jc(),n.v;Ve(s);try{gf(n),e=Kl(n)}finally{Ve(a)}return e}function gl(n){var e=hr(n);if(!n.equals(e)&&(n.wv=Il(),(!mn?.is_fork||n.deps===null)&&(mn!==null?(mn.capture(n,e,!0),Yt?.capture(n,e,!0)):n.v=e,n.deps===null))){_n(n,Kn);return}Xe||(be!==null?(gr()||mn?.is_fork)&&be.set(n,e):dr(n))}function Bf(n){if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&(e.teardown?.(),e.ac!==null&&ft(()=>{e.ac.abort(ws),e.ac=null}),e.fn!==null&&(e.teardown=ma),ys(e,0),Tr(e))}function Bl(n){if(n.effects!==null)for(const e of n.effects)e.teardown&&e.fn!==null&&Ya(e)}let kt=null,Sa=null,mn=null,Yt=null,be=null,zt=null,Dt=!1,us=null,Os=null;var Vr=0;let Cf=1;class ia{id=Cf++;started=!1;linked=!0;prev=null;next=null;async_deriveds=new Map;current=new Map;previous=new Map;#e=new Set;#i=new Set;#n=0;#o=new Map;#a=null;#s=[];#r=[];#t=new Map;#l=new Map;#p=new Set;is_fork=!1;#c=!1;constructor(){Sa===null?kt=Sa=this:(Sa.next=this,this.prev=Sa),Sa=this}#h(){if(this.is_fork)return!0;for(const e of this.#o.keys())if(!this.#g(e))return!0;return!1}#g(e){for(var a=e;a!==null;a=a.parent)if(this.#l.has(a))return!0;return!1}skip_effect(e){this.#l.has(e)||this.#l.set(e,{d:[],m:[]}),this.#p.delete(e)}unskip_effect(e,a=s=>this.schedule(s)){var s=this.#l.get(e);if(s){this.#l.delete(e);for(var t of s.d)_n(t,Rn),a(t);for(t of s.m)_n(t,he),a(t)}this.#p.add(e)}#f(){var e=[];for(const r of this.#s)if(!((r.f&zn)!==0||(r.f&(Rn|he))===0)){for(var a=r,s=!1;a.parent!==null;){a=a.parent;var t=a.f;if((t&(la|Fe))!==0){if((t&Kn)===0){s=!0;break}a.f^=Kn}}s||e.push(a)}return this.#s=[],e}#m(){this.started=!0;for(const[l,i]of this.#t)_n(l,i),this.schedule(l);this.apply();for(var e=us=[],a=[],s=Os=[];this.#s.length>0;){Vr++>1e3&&(this.#d(),Tf());for(const l of this.#f())try{this.#C(l,e,a)}catch(i){throw yl(l),this.#h()||this.discard(),i}}if(mn=null,s.length>0){var t=ia.ensure();for(const l of s)t.schedule(l)}if(us=null,Os=null,this.#h()){this.#v(a),this.#v(e);for(const[l,i]of this.#l)Tl(l,i);s.length>0&&mn.#m();return}const r=this.#S();if(r){this.#v(a),this.#v(e),r.#u(this);return}this.#t.clear();for(const l of this.#e)l(this);this.#e.clear(),Yt=this,Yr(a),Yr(e),Yt=null,this.#a?.resolve();var o=mn;this.#n===0&&(this.#s.length===0||o!==null)&&this.#d(),o!==null&&(Ke.clear(),o.#m())}#C(e,a,s){e.f^=Kn;for(var t=e.first;t!==null;){var r=t.f,o=(r&(Fe|la))!==0,l=o&&(r&Kn)!==0,i=l||(r&$n)!==0||this.#l.has(t);if(!i&&t.fn!==null){o?t.f^=Kn:(r&Ha)!==0?a.push(t):bs(t)&&((r&Ee)!==0&&this.add_dirty_reaction(t,he),Ya(t));var c=t.first;if(c!==null){t=c;continue}}for(;t!==null;){var u=t.next;if(u!==null){t=u;break}t=t.parent}}}#S(){for(var e=this.prev;e!==null;e=e.prev)if(!e.is_fork&&this.#B(e))return e;return null}#B(e){for(const[a,[,s]]of this.current)if(!s&&e.current.has(a))return!0;return!1}#u(e){for(const[s,t]of e.current)!this.previous.has(s)&&e.previous.has(s)&&this.previous.set(s,e.previous.get(s)),this.current.set(s,t);for(const[s,t]of e.async_deriveds){const r=this.async_deriveds.get(s);r&&t.promise.then(r.resolve).catch(r.reject)}e.async_deriveds.clear(),this.transfer_reactions(e.#t);const a=s=>{var t=s.reactions;if(t!==null&&!((s.f&qn)!==0&&(s.f&(Rn|he))===0))for(const l of t){var r=l.f;if((r&qn)!==0)a(l);else{var o=l;r&(Ga|Ee)&&!this.async_deriveds.has(o)&&(this.#t.delete(o),_n(o,Rn),this.schedule(o))}}};for(const s of this.current.keys())a(s);this.oncommit(()=>e.discard()),e.#d(),mn=this,this.#m()}#v(e){for(var a=0;a<e.length;a+=1)ml(e[a],this.#t)}capture(e,a,s=!1){e.v!==In&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&oa)===0&&(this.current.set(e,[a,s]),be?.set(e,a)),this.is_fork||(e.v=a)}activate(){mn=this}deactivate(){mn=null,be=null}flush(){try{Dt=!0,mn=this,this.#m()}finally{Vr=0,zt=null,us=null,Os=null,Dt=!1,mn=null,be=null,Ke.clear()}}discard(){for(const e of this.#i)e(this);this.#i.clear();for(const e of this.async_deriveds.values())e.reject(rs);this.#d(),this.#a?.resolve()}register_created_effect(e){this.#r.push(e)}#T(){for(let p=kt;p!==null;p=p.next){var e=p.id<this.id,a=[];for(const[m,[d,h]]of this.current){if(p.current.has(m)){var s=p.current.get(m)[0];if(e&&d!==s)p.current.set(m,[d,h]);else continue}a.push(m)}if(e)for(const[m,d]of this.async_deriveds){const h=p.async_deriveds.get(m);h&&d.promise.then(h.resolve).catch(h.reject)}var t=[...p.current.keys()].filter(m=>!p.current.get(m)[1]);if(!(!p.started||t.length===0)){var r=t.filter(m=>!this.current.has(m));if(r.length===0)e&&p.discard();else if(a.length>0){if(e)for(const m of this.#p)p.unskip_effect(m,d=>{(d.f&(Ee|Ga))!==0?p.schedule(d):p.#v([d])});p.activate();var o=new Set,l=new Map;for(var i of a)Cl(i,r,o,l);l=new Map;var c=[...p.current].filter(([m,d])=>{const h=this.current.get(m);return h?h[0]!==d[0]||h[1]!==d[1]:!0}).map(([m])=>m);if(c.length>0)for(const m of this.#r)(m.f&(zn|$n|Qs))===0&&mr(m,c,l)&&((m.f&(Ga|Ee))!==0?(_n(m,Rn),p.schedule(m)):p.add_dirty_reaction(m,Rn));if(p.#s.length>0&&!p.#c){p.apply();for(var u of p.#f())p.#C(u,[],[])}p.deactivate()}}}}increment(e,a){if(this.#n+=1,e){let s=this.#o.get(a)??0;this.#o.set(a,s+1)}}decrement(e,a){if(this.#n-=1,e){let s=this.#o.get(a)??0;s===1?this.#o.delete(a):this.#o.set(a,s-1)}this.#c||(this.#c=!0,ta(()=>{this.#c=!1,this.linked&&this.flush()}))}transfer_reactions(e){for(const[a,s]of e)this.add_dirty_reaction(a,s);e.clear()}add_dirty_reaction(e,a){(a===Rn||this.#t.get(e)!==Rn)&&this.#t.set(e,a)}oncommit(e){this.#e.add(e)}ondiscard(e){this.#i.add(e)}settled(){return(this.#a??=rl()).promise}static ensure(){if(mn===null){const e=mn=new ia;Dt||ta(()=>{e.started||e.flush()})}return mn}apply(){{be=null;return}}schedule(e){if(zt=e,e.b?.is_pending&&(e.f&(Ha|Ds|ol))!==0&&(e.f&Ua)===0){e.b.defer_effect(e);return}this.#s.push(e)}#d(){if(this.linked){var e=this.prev,a=this.next;e===null?kt=a:e.next=a,a===null?Sa=e:a.prev=e,this.linked=!1}}}function Tf(){try{sf()}catch(n){Ne(n,zt)}}let Ue=null;function Yr(n){var e=n.length;if(e!==0){for(var a=0;a<e;){var s=n[a++];if((s.f&(zn|$n))===0&&bs(s)&&(Ue=new Set,Ya(s),s.deps===null&&s.first===null&&s.nodes===null&&s.teardown===null&&s.ac===null&&Fl(s),Ue?.size>0)){Ke.clear();for(const t of Ue){if((t.f&(zn|$n))!==0)continue;const r=[t];let o=t.parent;for(;o!==null;)Ue.has(o)&&(Ue.delete(o),r.push(o)),o=o.parent;for(let l=r.length-1;l>=0;l--){const i=r[l];(i.f&(zn|$n))===0&&Ya(i)}}Ue.clear()}}Ue=null}}function Cl(n,e,a,s){if(!a.has(n)&&(a.add(n),n.reactions!==null))for(const t of n.reactions){const r=t.f;(r&qn)!==0?Cl(t,e,a,s):(r&(Ga|Ee))!==0&&(r&Rn)===0&&mr(t,e,s)&&(_n(t,Rn),vr(t))}}function mr(n,e,a){const s=a.get(n);if(s!==void 0)return s;if(n.deps!==null)for(const t of n.deps){if(gs.call(e,t))return!0;if((t.f&qn)!==0&&mr(t,e,a))return a.set(t,!0),!0}return a.set(n,!1),!1}function vr(n){mn.schedule(n)}function Tl(n,e){if(!((n.f&Fe)!==0&&(n.f&Kn)!==0)){(n.f&Rn)!==0?e.d.push(n):(n.f&he)!==0&&e.m.push(n),_n(n,Kn);for(var a=n.first;a!==null;)Tl(a,e),a=a.next}}function yl(n){_n(n,Kn);for(var e=n.first;e!==null;)yl(e),e=e.next}let qs=new Set;const Ke=new Map;let Sl=!1;function Ba(n,e){var a={f:0,v:n,reactions:null,equals:dl,rv:0,wv:0};return a}function hn(n,e){const a=Ba(n);return Gl(a),a}function kl(n,e=!1,a=!0){const s=Ba(n);return e||(s.equals=hl),Za&&a&&Ln!==null&&Ln.l!==null&&(Ln.l.s??=[]).push(s),s}function nn(n,e,a=!1){un!==null&&(!Le||(un.f&Qs)!==0)&&Rs()&&(un.f&(qn|Ee|Ga|Qs))!==0&&(xe===null||!xe.has(n))&&lf();let s=a?ra(e):e;return Va(n,s,Os)}var da=null,Qt=0;function Va(n,e,a=null){if(!n.equals(e)){Xe?Ke.set(n,e):Ke.has(n)||Ke.set(n,n.v);var s=ia.ensure();if(s.capture(n,e),(n.f&qn)!==0){const t=n;(n.f&Rn)!==0&&hr(t),be===null&&dr(t)}n.wv=Il(),da=null,Qt=0,Dl(n,Rn,a),da=null,Rs()&&pn!==null&&(pn.f&Kn)!==0&&(pn.f&(Fe|la))===0&&(Ce===null?_f([n]):Ce.push(n)),!s.is_fork&&qs.size>0&&!Sl&&yf()}return e}function yf(){Sl=!1;for(const n of qs){(n.f&Kn)!==0&&_n(n,he);let e;try{e=bs(n)}catch{e=!0}e&&Ya(n)}qs.clear()}function ds(n){nn(n,n.v+1)}function Dl(n,e,a){var s=n.reactions;if(s!==null){var t=Rs(),r=s.length;if(Qt+=r,Qt>1e5&&da===null&&(da=new Set),da!==null){if(da.has(n))return;da.add(n)}for(var o=0;o<r;o++){var l=s[o],i=l.f;if(!(!t&&l===pn)){var c=(i&Rn)===0;if(c&&_n(l,e),(i&Qs)!==0)qs.add(l);else if((i&qn)!==0){var u=l;be?.delete(u),Dl(u,he,a)}else if(c){var p=l;(i&Ee)!==0&&Ue!==null&&Ue.add(p),a!==null?a.push(p):vr(p)}}}}}function ra(n){if(typeof n!="object"||n===null||qe in n||il in n)return n;const e=cr(n);if(e!==Lc&&e!==Ac)return n;var a=new Map,s=it(n),t=hn(0),r=ga,o=l=>{if(ga===r)return l();var i=un,c=ga;ye(null),Ur(r);var u=l();return ye(i),Ur(c),u};return s&&a.set("length",hn(n.length)),new Proxy(n,{defineProperty(l,i,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&rf();var u=a.get(i);return u===void 0?o(()=>{var p=hn(c.value);return a.set(i,p),p}):nn(u,c.value,!0),!0},deleteProperty(l,i){var c=a.get(i);if(c===void 0){if(i in l){const u=o(()=>hn(In));a.set(i,u),ds(t)}}else nn(c,In),ds(t);return!0},get(l,i,c){if(i===qe)return n;var u=a.get(i),p=i in l;if(u===void 0&&(!p||Pa(l,i)?.writable)&&(u=o(()=>{var d=ra(p?l[i]:In),h=hn(d);return h}),a.set(i,u)),u!==void 0){var m=f(u);return m===In?void 0:m}return Reflect.get(l,i,c)},getOwnPropertyDescriptor(l,i){this.has?.(l,i);var c=Reflect.getOwnPropertyDescriptor(l,i),u=a.get(i);if(u!==void 0){var p=f(u);if(p===In)return;if(c&&"value"in c)c.value=p;else return{enumerable:!0,configurable:!0,value:p,writable:!0}}return c},has(l,i){if(i===qe)return!0;var c=a.get(i),u=c!==void 0&&c.v!==In||Reflect.has(l,i);if(c!==void 0||(pn!==null||un!==null)&&(!u||Pa(l,i)?.writable)){c===void 0&&(c=o(()=>{var m=u?ra(l[i]):In,d=hn(m);return d}),a.set(i,c));var p=f(c);if(p===In)return!1}return u},set(l,i,c,u){var p=a.get(i),m=i in l;if(s&&i==="length")for(var d=c;d<p.v;d+=1){var h=a.get(d+"");h!==void 0?nn(h,In):d in l&&(h=o(()=>hn(In)),a.set(d+"",h))}if(p===void 0)(!m||Pa(l,i)?.writable)&&(p=o(()=>hn(void 0)),nn(p,ra(c)),a.set(i,p));else{m=p.v!==In;var v=o(()=>ra(c));nn(p,v)}var B=Reflect.getOwnPropertyDescriptor(l,i);if(B?.set&&B.set.call(u,c),!m){if(s&&typeof i=="string"){var C=a.get("length"),k=Number(i);Number.isInteger(k)&&k>=C.v&&nn(C,k+1)}ds(t)}return!0},ownKeys(l){f(t);var i=Reflect.ownKeys(l).filter(p=>{var m=a.get(p);return m===void 0||m.v!==In});for(var[c,u]of a)u.v!==In&&!(c in l)&&i.push(c);return i},setPrototypeOf(){of()}})}function zr(n){try{if(n!==null&&typeof n=="object"&&qe in n)return n[qe]}catch{}return n}function wl(n,e){return Object.is(zr(n),zr(e))}var Qr,Rl,El,bl;function Sf(){if(Qr===void 0){Qr=window,Rl=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,a=Text.prototype;El=Pa(e,"firstChild").get,bl=Pa(e,"nextSibling").get,Or(n)&&(n[xt]=void 0,n[cl]=null,n[Ot]=void 0,n.__e=void 0),Or(a)&&(a[Vt]=void 0)}}function Ze(n=""){return document.createTextNode(n)}function Cs(n){return El.call(n)}function Es(n){return bl.call(n)}function _(n,e){return Cs(n)}function Bn(n,e=!1){{var a=Cs(n);return a instanceof Comment&&a.data===""?Es(a):a}}function D(n,e=!1){return Cs(n)}function g(n,e=1,a=!1){let s=n;for(;e--;)s=Es(s);return s}function kf(n){n.textContent=""}function Ll(){return!1}function Df(n,e,a){return a?document.createElement(n,{is:a}):document.createElement(n)}function wf(n){var e=pn;if(e===null)return un.f|=oa,n;if((e.f&Ua)===0&&(e.f&Ha)===0)throw n;Ne(n,e)}function Ne(n,e){if(n===ul)throw n;if(!(e!==null&&(e.f&zn)!==0)){for(;e!==null;){if((e.f&Kt)!==0&&(e.f&(zn|Bs))===0){if((e.f&Ua)===0)throw n;try{e.b.error(n);return}catch(a){n=a}}e=e.parent}throw n}}function Al(n){pn===null&&(un===null&&af(),ef()),Xe&&nf()}function Rf(n,e){var a=e.last;a===null?e.last=e.first=n:(a.next=n,n.prev=a,e.last=n)}function ze(n,e){var a=pn;a!==null&&(a.f&$n)!==0&&(n|=$n);var s={ctx:Ln,deps:null,nodes:null,f:n|Rn|Me,first:null,fn:e,last:null,next:null,parent:a,b:a&&a.b,prev:null,teardown:null,wv:0,ac:null};mn?.register_created_effect(s);var t=s;if((n&Ha)!==0)us!==null?us.push(s):ia.ensure().schedule(s);else if(e!==null){try{Ya(s)}catch(o){throw le(s),o}t.deps===null&&t.teardown===null&&t.nodes===null&&t.first===t.last&&(t.f&qa)===0&&(t=t.first,(n&Ee)!==0&&(n&Ka)!==0&&t!==null&&(t.f|=Ka))}if(t!==null&&(t.parent=a,a!==null&&Rf(t,a),un!==null&&(un.f&qn)!==0&&(n&la)===0)){var r=un;(r.effects??=[]).push(t)}return s}function gr(){return un!==null&&!Le}function Br(n){const e=ze(Ds,null);return _n(e,Kn),e.teardown=n,e}function Ts(n){Al();var e=pn.f,a=!un&&(e&Fe)!==0&&Ln!==null&&!Ln.i;if(a){var s=Ln;(s.e??=[]).push(n)}else return Ml(n)}function Ml(n){return ze(Ha|ll,n)}function Ef(n){return Al(),ze(Ds|ll,n)}function bf(n){ia.ensure();const e=ze(la|qa,n);return(a={})=>new Promise(s=>{a.outro?va(e,()=>{le(e),s(void 0)}):(le(e),s(void 0))})}function Lf(n){return ze(Ha,n)}function Af(n){return ze(Ga|qa,n)}function Jl(n,e=0){return ze(Ds|e,n)}function H(n,e=[],a=[],s=[]){hf(s,e,a,t=>{ze(Ds,()=>{n(...t.map(f))})})}function Cr(n,e=0){var a=ze(Ee|e,n);return a}function Te(n){return ze(Fe|qa,n)}function _l(n){var e=n.teardown;if(e!==null){const a=Xe,s=un;jr(!0),ye(null);try{e.call(null)}catch(t){Ne(t,n.parent)}finally{jr(a),ye(s)}}}function Tr(n,e=!1){var a=n.first;for(n.first=n.last=null;a!==null;){const t=a.ac;t!==null&&ft(()=>{t.abort(ws)});var s=a.next;(a.f&la)!==0?a.parent=null:le(a,e),a=s}}function Mf(n){for(var e=n.first;e!==null;){var a=e.next;(e.f&Fe)===0&&le(e),e=a}}function le(n,e=!0){var a=!1;(e||(n.f&_c)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(Jf(n.nodes.start,n.nodes.end),a=!0),n.f|=Bs,Tr(n,e&&!a),ys(n,0);var s=n.nodes&&n.nodes.t;if(s!==null)for(const r of s)r.stop();_l(n),n.f^=Bs,n.f|=zn;var t=n.parent;t!==null&&t.first!==null&&Fl(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Jf(n,e){for(;n!==null;){var a=n===e?null:Es(n);n.remove(),n=a}}function Fl(n){var e=n.parent,a=n.prev,s=n.next;a!==null&&(a.next=s),s!==null&&(s.prev=a),e!==null&&(e.first===n&&(e.first=s),e.last===n&&(e.last=a))}function va(n,e,a=!0){var s=[];n.f|=fr,Wl(n,s,!0);var t=()=>{a&&le(n),e&&e()},r=s.length;if(r>0){var o=()=>--r||t();for(var l of s)l.out(o)}else t()}function Wl(n,e,a){if((n.f&$n)===0){n.f^=$n;var s=n.nodes&&n.nodes.t;if(s!==null)for(const l of s)(l.is_global||a)&&e.push(l);for(var t=n.first;t!==null;){var r=t.next;if((t.f&la)===0){var o=(t.f&Ka)!==0||(t.f&Fe)!==0&&(n.f&Ee)!==0;Wl(t,e,o?a:!1)}t=r}}}function Zs(n){n.f&=~fr,Pl(n,!0)}function Pl(n,e){if((n.f&fr)===0&&(n.f&$n)!==0){n.f^=$n,(n.f&Kn)===0&&(_n(n,Rn),ia.ensure().schedule(n));for(var a=n.first;a!==null;){var s=a.next,t=(a.f&Ka)!==0||(a.f&Fe)!==0;Pl(a,t?e:!1),a=s}var r=n.nodes&&n.nodes.t;if(r!==null)for(const o of r)(o.is_global||e)&&o.in()}}function yr(n,e){if(n.nodes)for(var a=n.nodes.start,s=n.nodes.end;a!==null;){var t=a===s?null:Es(a);e.append(a),a=t}}let Xe=!1;function jr(n){Xe=n}let un=null,Le=!1;function ye(n){un=n}let pn=null;function Ve(n){pn=n}let xe=null;function Gl(n){un!==null&&((un.f&js)!==0||(un.f&qn)!==0)&&(xe??=new Set).add(n)}let oe=null,de=0,Ce=null;function _f(n){Ce=n}let Nl=1,pa=0,ga=pa;function Ur(n){ga=n}function Il(){return++Nl}function bs(n){var e=n.f;if((e&Rn)!==0)return!0;if((e&he)!==0){for(var a=n.deps,s=a.length,t=0;t<s;t++){var r=a[t];if(bs(r)&&gl(r),r.wv>n.wv)return!0}(e&Me)!==0&&be===null&&_n(n,Kn)}return!1}function Hl(n,e,a=!0){var s=n.reactions;if(s!==null&&!(xe!==null&&xe.has(n)))for(var t=0;t<s.length;t++){var r=s[t];(r.f&qn)!==0?Hl(r,e,!1):e===r&&(a?_n(r,Rn):(r.f&Kn)!==0&&_n(r,he),vr(r))}}function Kl(n){var e=oe,a=de,s=Ce,t=un,r=xe,o=Ln,l=Le,i=ga,c=n.f;oe=null,de=0,Ce=null,un=(c&(Fe|la))===0?n:null,xe=null,xa(n.ctx),Le=!1,ga=++pa,n.ac!==null&&(ft(()=>{n.ac.abort(ws)}),n.ac=null);try{n.f|=js;var u=n.fn,p=u();n.f|=Ua;var m=qr(n);if(Rs()&&Ce!==null&&!Le&&m!==null&&(n.f&(qn|he|Rn))===0)for(var d=0;d<Ce.length;d++)Hl(Ce[d],n);if(t!==null&&t!==n){if(pa++,t.deps!==null)for(let h=0;h<a;h+=1)t.deps[h].rv=pa;if(e!==null)for(const h of e)h.rv=pa;Ce!==null&&(s===null?s=Ce:s.push(...Ce))}return(n.f&oa)!==0&&(n.f^=oa),p}catch(h){return qr(n),wf(h)}finally{n.f^=js,oe=e,de=a,Ce=s,un=t,xe=r,xa(o),Le=l,ga=i}}function qr(n){var e=n.deps,a=mn?.is_fork;if(oe!==null){var s;if(a||ys(n,de),e!==null&&de>0)for(e.length=de+oe.length,s=0;s<oe.length;s++)e[de+s]=oe[s];else n.deps=e=oe;if(gr()&&(n.f&Me)!==0)for(s=de;s<e.length;s++)(e[s].reactions??=[]).push(n)}else!a&&e!==null&&de<e.length&&(ys(n,de),e.length=de);return e}function Ff(n,e){let a=e.reactions;if(a!==null){var s=bc.call(a,n);if(s!==-1){var t=a.length-1;t===0?a=e.reactions=null:(a[s]=a[t],a.pop())}}if(a===null&&(e.f&qn)!==0&&(oe===null||!gs.call(oe,e))){var r=e;(r.f&Me)!==0&&(r.f^=Me),r.v!==In&&dr(r),r.ac!==null&&ft(()=>{r.ac.abort(ws),r.ac=null,_n(r,Rn)}),Bf(r),ys(r,0)}}function ys(n,e){var a=n.deps;if(a!==null)for(var s=e;s<a.length;s++)Ff(n,a[s])}function Ya(n){var e=n.f;if((e&zn)===0){_n(n,Kn);var a=pn;pn=n;try{(e&(Ee|ol))!==0?Mf(n):Tr(n),_l(n);var s=Kl(n);n.teardown=typeof s=="function"?s:null,n.wv=Nl;var t;sl&&ff&&(n.f&Rn)!==0&&n.deps}finally{pn=a}}}function f(n){var e=n.f,a=(e&qn)!==0;if(un!==null&&!Le){var s=pn!==null&&(pn.f&zn)!==0;if(!s&&(xe===null||!xe.has(n))){var t=un.deps;if((un.f&js)!==0)n.rv<pa&&(n.rv=pa,oe===null&&t!==null&&t[de]===n?de++:oe===null?oe=[n]:oe.push(n));else{un.deps??=[],gs.call(un.deps,n)||un.deps.push(n);var r=n.reactions;r===null?n.reactions=[un]:gs.call(r,un)||r.push(un)}}}if(Xe&&Ke.has(n))return Ke.get(n);if(a){var o=n;if(Xe){var l=o.v;return((o.f&Kn)===0&&o.reactions!==null||Ol(o))&&(l=hr(o)),Ke.set(o,l),l}var i=(o.f&Me)===0&&!Le&&un!==null&&(un.f&Me)!==0,c=(o.f&Ua)===0;bs(o)&&(i&&(o.f|=Me),gl(o)),i&&!c&&(Bl(o),xl(o))}if(be?.has(n))return be.get(n);if((n.f&oa)!==0)throw n.v;return n.v}function xl(n){if(n.f|=Me,n.deps!==null)for(const a of n.deps){var e=a.reactions;e===null?a.reactions=[n]:gs.call(e,n)||e.push(n),(a.f&qn)!==0&&(a.f&Me)===0&&(Bl(a),xl(a))}}function Ol(n){if(n.v===In)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(Ke.has(e)||(e.f&qn)!==0&&Ol(e))return!0;return!1}function Xa(n){var e=Le;try{return Le=!0,n()}finally{Le=e}}function Wf(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(qe in n)jt(n);else if(!Array.isArray(n))for(let e in n){const a=n[e];typeof a=="object"&&a&&qe in a&&jt(a)}}}function jt(n,e=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!e.has(n)){e.add(n),n instanceof Date&&n.getTime();for(let s in n)try{jt(n[s],e)}catch{}const a=cr(n);if(a!==Object.prototype&&a!==Array.prototype&&a!==Map.prototype&&a!==Set.prototype&&a!==Date.prototype){const s=tl(a);for(let t in s){const r=s[t].get;if(r)try{r.call(n)}catch{}}}}}const Pf=["touchstart","touchmove"];function Gf(n){return Pf.includes(n)}const os=Symbol("events"),Vl=new Set,Ut=new Set;function sn(n,e,a){(e[os]??={})[n]=a}function Pn(n){for(var e=0;e<n.length;e++)Vl.add(n[e]);for(var a of Ut)a(n)}let wt=null,Rt=!1;function Zr(n){var e=this,a=e.ownerDocument,s=n.type,t=n.composedPath?.()||[],r=t[0]||n.target;wt=n,Rt||(Rt=!0,setTimeout(()=>{Rt=!1,wt=null}));var o=0,l=wt===n&&n[os];if(l){var i=t.indexOf(l);if(i!==-1&&(e===document||e===window)){n[os]=e;return}var c=t.indexOf(e);if(c===-1)return;i<=c&&(o=i)}if(r=t[o]||n.target,r!==e){ir(n,"currentTarget",{configurable:!0,get(){return r||a}});var u=un,p=pn;ye(null),Ve(null);try{for(var m,d=[];r!==null&&r!==e;){try{var h=r[os]?.[s];h!=null&&(!r.disabled||n.target===r)&&h.call(r,n)}catch(v){m?d.push(v):m=v}if(n.cancelBubble)break;o++,r=o<t.length?t[o]:null}if(m){for(let v of d)queueMicrotask(()=>{throw v});throw m}}finally{n[os]=e,delete n.currentTarget,ye(u),Ve(p)}}}const Nf=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function If(n){return Nf?.createHTML(n)??n}function Hf(n){var e=Df("template");return e.innerHTML=If(n.replaceAll("<!>","<!---->")),e.content}function Xs(n,e){var a=pn;a.nodes===null&&(a.nodes={start:n,end:e,a:null,t:null})}function M(n,e){var a=(e&Yc)!==0,s=(e&zc)!==0,t,r=!n.startsWith("<!>");return()=>{t===void 0&&(t=Hf(r?n:"<!>"+n),a||(t=Cs(t)));var o=s||Rl?document.importNode(t,!0):t.cloneNode(!0);if(a){var l=Cs(o),i=o.lastChild;Xs(l,i)}else Xs(o,o);return o}}function Fs(n=""){{var e=Ze(n+"");return Xs(e,e),e}}function Kf(){var n=document.createDocumentFragment(),e=document.createComment(""),a=Ze();return n.append(e,a),Xs(e,a),n}function L(n,e){n!==null&&n.before(e)}function xf(n){let e=0,a=Ba(0),s;return()=>{gr()&&(f(a),Jl(()=>(e===0&&(s=Xa(()=>n(()=>ds(a)))),e+=1,()=>{ta(()=>{e-=1,e===0&&(s?.(),s=void 0,ds(a))})})))}}var Of=Ka|qa;function Vf(n,e,a,s){new Yf(n,e,a,s)}class Yf{parent;is_pending=!1;transform_error;#e;#i=null;#n;#o;#a;#s=null;#r=null;#t=null;#l=null;#p=0;#c=0;#h=!1;#g=new Map;#f=null;#m=xf(()=>(this.#f=Ba(this.#p),()=>{this.#f=null}));constructor(e,a,s,t){this.#e=e,this.#n=a,this.#o=r=>{var o=pn;o.b=this,o.f|=Kt,s(r)},this.parent=pn.b,this.transform_error=t??this.parent?.transform_error??(r=>r),this.#a=Cr(()=>{this.#T()},Of)}#C(){try{this.#s=Te(()=>this.#o(this.#e))}catch(e){this.error(e)}}#S(e){const a=this.#n.failed,{reset:s,invoke_onerror:t}=this.#B(e);ta(t),a&&(this.#t=Te(()=>{a(this.#e,()=>e,()=>s)}))}#B(e){var a=!1,s=!1;const t=()=>{if(!this.#u()){if(a){qc();return}a=!0,s&&cf(),this.#t!==null&&va(this.#t,()=>{this.#t=null}),this.#y(()=>{this.#T()})}};return{reset:t,invoke_onerror:()=>{if(!this.#u())try{s=!0,this.#n.onerror?.(e,t),s=!1}catch(o){Ne(o,this.#a&&this.#a.parent)}}}}#u(){return(this.#a.f&(zn|Bs))!==0}#v(){const e=this.#n.pending;e&&(this.is_pending=!0,this.#r=Te(()=>e(this.#e)),ta(()=>{if(!this.#u()){var a=this.#l=document.createDocumentFragment(),s=Ze(),t=!1;if(a.append(s),this.#s=this.#y(()=>{try{return Te(()=>this.#o(s))}catch(r){try{this.error(r),t=!0}catch(o){Ne(o,this.#a.parent)}return null}}),this.#s===null){this.#l=null,t&&this.#d(mn);return}this.#c===0&&(this.#e.before(a),this.#l=null,va(this.#r,()=>{this.#r=null}),this.#d(mn))}}))}#T(){try{if(this.is_pending=this.has_pending_snippet(),this.#c=0,this.#p=0,this.#s=Te(()=>{this.#o(this.#e)}),this.#c>0){var e=this.#l=document.createDocumentFragment();yr(this.#s,e);const a=this.#n.pending;this.#r=Te(()=>a(this.#e))}else this.#d(mn)}catch(a){this.error(a)}}#d(e){this.is_pending=!1,e.transfer_reactions(this.#g)}defer_effect(e){ml(e,this.#g)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#y(e){var a=pn,s=un,t=Ln;Ve(this.#a),ye(this.#a),xa(this.#a.ctx);try{return ia.ensure(),e()}finally{Ve(a),ye(s),xa(t)}}#k(e,a){if(!this.has_pending_snippet()){this.parent&&this.parent.#k(e,a);return}this.#c+=e,this.#c===0&&(this.#d(a),this.#r&&va(this.#r,()=>{this.#r=null}),this.#l&&(this.#e.before(this.#l),this.#l=null))}update_pending_count(e,a){this.#k(e,a),this.#p+=e,!(!this.#f||this.#h)&&(this.#h=!0,ta(()=>{this.#h=!1,this.#f&&Va(this.#f,this.#p)}))}get_effect_pending(){return this.#m(),f(this.#f)}error(e){if(e===ul||!this.#n.onerror&&!this.#n.failed)throw e;mn?.is_fork?(this.#s&&mn.skip_effect(this.#s),this.#r&&mn.skip_effect(this.#r),this.#t&&mn.skip_effect(this.#t),mn.oncommit(()=>{this.#u()||this.#D(e)})):this.#D(e)}#D(e){this.#s&&(le(this.#s),this.#s=null),this.#r&&(le(this.#r),this.#r=null),this.#t&&(le(this.#t),this.#t=null);let a=this.#n.failed;const s=t=>{if(this.#u())return;const{reset:r,invoke_onerror:o}=this.#B(t);o(),a&&!this.#u()&&(this.#t=this.#y(()=>{try{return Te(()=>{var l=pn;l.b=this,l.f|=Kt,a(this.#e,()=>t,()=>r)})}catch(l){return Ne(l,this.#a.parent),null}}))};ta(()=>{if(!this.#u()){var t;try{t=this.transform_error(e)}catch(r){Ne(r,this.#a&&this.#a.parent);return}t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(s,r=>Ne(r,this.#a&&this.#a.parent)):s(t)}})}}function y(n,e){var a=e==null?"":typeof e=="object"?`${e}`:e;a!==(n[Vt]??=n.nodeValue)&&(n[Vt]=a,n.nodeValue=`${a}`)}function zf(n,e){return Qf(n,e)}const Ws=new Map;function Qf(n,{target:e,anchor:a,props:s={},events:t,context:r,intro:o=!0,transformError:l}){Sf();var i=void 0,c=bf(()=>{var u=a??e.appendChild(Ze());Vf(u,{pending:()=>{}},d=>{yn({});var h=Ln;r&&(h.c=r),t&&(s.$$events=t),i=n(d,s)||ur(),Sn()},l);var p=new Set,m=d=>{for(var h=0;h<d.length;h++){var v=d[h];if(!p.has(v)){p.add(v);var B=Gf(v);for(const w of[e,document]){var C=Ws.get(w);C===void 0&&(C=new Map,Ws.set(w,C));var k=C.get(v);k===void 0?(w.addEventListener(v,Zr,{passive:B}),C.set(v,1)):C.set(v,k+1)}}}};return m(ct(Vl)),Ut.add(m),()=>{for(var d of p)for(const B of[e,document]){var h=Ws.get(B),v=h.get(d);--v==0?(B.removeEventListener(d,Zr),h.delete(d),h.size===0&&Ws.delete(B)):h.set(d,v)}Ut.delete(m),u!==a&&u.parentNode?.removeChild(u)}});return jf.set(i,c),i}let jf=new WeakMap;class Uf{anchor;#e=new Map;#i=new Map;#n=new Map;#o=new Set;#a=!0;constructor(e,a=!0){this.anchor=e,this.#a=a}#s=e=>{if(this.#e.has(e)){var a=this.#e.get(e),s=this.#i.get(a);if(s)Zs(s),this.#o.delete(a);else{var t=this.#n.get(a);t&&(Zs(t.effect),this.#i.set(a,t.effect),this.#n.delete(a),t.fragment.lastChild.remove(),this.anchor.before(t.fragment),s=t.effect)}for(const[r,o]of this.#e){if(this.#e.delete(r),r===e)break;const l=this.#n.get(o);l&&(le(l.effect),this.#n.delete(o))}for(const[r,o]of this.#i){if(r===a||this.#o.has(r))continue;const l=()=>{if(Array.from(this.#e.values()).includes(r)){var c=document.createDocumentFragment();yr(o,c),c.append(Ze()),this.#n.set(r,{effect:o,fragment:c})}else le(o);this.#o.delete(r),this.#i.delete(r)};this.#a||!s?(this.#o.add(r),va(o,l,!1)):l()}}};#r=e=>{this.#e.delete(e);const a=Array.from(this.#e.values());for(const[s,t]of this.#n)a.includes(s)||(le(t.effect),this.#n.delete(s))};ensure(e,a){var s=mn,t=Ll();if(a&&!this.#i.has(e)&&!this.#n.has(e))if(t){var r=document.createDocumentFragment(),o=Ze();r.append(o),this.#n.set(e,{effect:Te(()=>a(o)),fragment:r})}else this.#i.set(e,Te(()=>a(this.anchor)));if(this.#e.set(s,e),t){for(const[l,i]of this.#i)l===e?s.unskip_effect(i):s.skip_effect(i);for(const[l,i]of this.#n)l===e?s.unskip_effect(i.effect):s.skip_effect(i.effect);s.oncommit(this.#s),s.ondiscard(this.#r)}else this.#s(s)}}function tn(n,e,a=!1){var s=new Uf(n),t=a?Ka:0;function r(o,l){s.ensure(o,l)}Cr(()=>{var o=!1;e((l,i=0)=>{o=!0,r(i,l)}),o||r(-1,null)},t)}function $a(n,e){return e}function qf(n,e,a){for(var s=[],t=e.length,r,o=e.length,l=0;l<t;l++){let p=e[l];va(p,()=>{if(r){if(r.pending.delete(p),r.done.add(p),r.pending.size===0){var m=n.outrogroups;qt(n,ct(r.done)),m.delete(r),m.size===0&&(n.outrogroups=null)}}else o-=1},!1)}if(o===0){var i=s.length===0&&a!==null&&n.pending.size===0;if(i){var c=a,u=c.parentNode;kf(u),u.append(c),n.items.clear()}qt(n,e,!i)}else r={pending:new Set(e),done:new Set},(n.outrogroups??=new Set).add(r)}function qt(n,e,a=!0){var s;if(n.pending.size>0){s=new Set;for(const o of n.pending.values())for(const l of o)s.add(n.items.get(l).e)}for(var t=0;t<e.length;t++){var r=e[t];if(s?.has(r)){r.f|=Ie;const o=document.createDocumentFragment();yr(r,o)}else le(e[t],a)}}var Xr;function cn(n,e,a,s,t,r=null){var o=n,l=new Map,i=(e&fl)!==0;if(i){var c=n;o=c.appendChild(Ze())}var u=null,p=pr(()=>{var k=a();return it(k)?k:k==null?[]:ct(k)}),m=new Map,d=!0;function h(k){if((C.effect.f&zn)===0){C.pending.delete(k);var w=f(p);C.fallback=u,Zf(C,w,o,e,s),u!==null&&(w.length===0?(u.f&Ie)===0?Zs(u):(u.f^=Ie,ls(u,null,o)):va(u,()=>{u=null}))}}function v(k){C.pending.delete(k)}var B=Cr(()=>{for(var k=f(p),w=k.length,T=new Set,S=mn,J=Ll(),P=0;P<w;P+=1){var F=k[P],b=s(F,P),A=d?null:l.get(b);A?(A.v&&Va(A.v,F),A.i&&Va(A.i,P),J&&S.unskip_effect(A.e)):(A=Xf(l,d?o:Xr??=Ze(),F,b,P,t,e,a),d||(A.e.f|=Ie),l.set(b,A)),T.add(b)}if(w===0&&r&&!u&&(d?u=Te(()=>r(o)):(u=Te(()=>r(Xr??=Ze())),u.f|=Ie)),w>T.size&&$c(),!d)if(m.set(S,T),J){for(const[O,z]of l)T.has(O)||S.skip_effect(z.e);S.oncommit(h),S.ondiscard(v)}else h(S);f(p)}),C={effect:B,items:l,pending:m,outrogroups:null,fallback:u};d=!1}function ss(n){for(;n!==null&&(n.f&Fe)===0;)n=n.next;return n}function Zf(n,e,a,s,t){var r=(s&Nc)!==0,o=e.length,l=n.items,i=ss(n.effect.first),c,u=null,p,m=[],d=[],h,v,B,C;if(r)for(C=0;C<o;C+=1)h=e[C],v=t(h,C),B=l.get(v).e,(B.f&Ie)===0&&(B.nodes?.a?.measure(),(p??=new Set).add(B));for(C=0;C<o;C+=1){if(h=e[C],v=t(h,C),B=l.get(v).e,n.outrogroups!==null)for(const A of n.outrogroups)A.pending.delete(B),A.done.delete(B);if((B.f&$n)!==0&&(Zs(B),r&&(B.nodes?.a?.unfix(),(p??=new Set).delete(B))),(B.f&Ie)!==0)if(B.f^=Ie,B===i)ls(B,null,a);else{var k=u?u.next:i;B===n.effect.last&&(n.effect.last=B.prev),B.prev&&(B.prev.next=B.next),B.next&&(B.next.prev=B.prev),$e(n,u,B),$e(n,B,k),ls(B,k,a),u=B,m=[],d=[],i=ss(u.next);continue}if(B!==i){if(c!==void 0&&c.has(B)){if(m.length<d.length){var w=d[0],T;u=w.prev;var S=m[0],J=m[m.length-1];for(T=0;T<m.length;T+=1)ls(m[T],w,a);for(T=0;T<d.length;T+=1)c.delete(d[T]);$e(n,S.prev,J.next),$e(n,u,S),$e(n,J,w),i=w,u=J,C-=1,m=[],d=[]}else c.delete(B),ls(B,i,a),$e(n,B.prev,B.next),$e(n,B,u===null?n.effect.first:u.next),$e(n,u,B),u=B;continue}for(m=[],d=[];i!==null&&i!==B;)(c??=new Set).add(i),d.push(i),i=ss(i.next);if(i===null)continue}(B.f&Ie)===0&&m.push(B),u=B,i=ss(B.next)}if(n.outrogroups!==null){for(const A of n.outrogroups)A.pending.size===0&&(qt(n,ct(A.done)),n.outrogroups?.delete(A));n.outrogroups.size===0&&(n.outrogroups=null)}if(i!==null||c!==void 0){var P=[];if(c!==void 0)for(B of c)(B.f&$n)===0&&P.push(B);for(;i!==null;)(i.f&$n)===0&&i!==n.fallback&&P.push(i),i=ss(i.next);var F=P.length;if(F>0){var b=(s&fl)!==0&&o===0?a:null;if(r){for(C=0;C<F;C+=1)P[C].nodes?.a?.measure();for(C=0;C<F;C+=1)P[C].nodes?.a?.fix()}qf(n,P,b)}}r&&ta(()=>{if(p!==void 0)for(B of p)B.nodes?.a?.apply()})}function Xf(n,e,a,s,t,r,o,l){var i=(o&Pc)!==0?(o&Ic)===0?kl(a,!1,!1):Ba(a):null,c=(o&Gc)!==0?Ba(t):null;return{v:i,i:c,e:Te(()=>(r(e,i??a,c??t,l),()=>{n.delete(s)}))}}function ls(n,e,a){if(n.nodes)for(var s=n.nodes.start,t=n.nodes.end,r=e&&(e.f&Ie)===0?e.nodes.start:a;s!==null;){var o=Es(s);if(r.before(s),s===t)return;s=o}}function $e(n,e,a){e===null?n.effect.first=a:e.next=a,a===null?n.effect.last=e:a.prev=e}const $r=[...` 	
\r\f \v\uFEFF`];function $f(n,e,a){var s=n==null?"":""+n;if(e&&(s=s?s+" "+e:e),a){for(var t of Object.keys(a))if(a[t])s=s?s+" "+t:t;else if(s.length)for(var r=t.length,o=0;(o=s.indexOf(t,o))>=0;){var l=o+r;(o===0||$r.includes(s[o-1]))&&(l===s.length||$r.includes(s[l]))?s=(o===0?"":s.substring(0,o))+s.substring(l+1):o=l}}return s===""?null:s}function n0(n,e){return n==null?null:String(n)}function Wn(n,e,a,s,t,r){var o=n[xt];if(o!==a||o===void 0){var l=$f(a,s,r);l==null?n.removeAttribute("class"):n.className=l,n[xt]=a}else if(r&&t!==r)for(var i in r){var c=!!r[i];(t==null||c!==!!t[i])&&n.classList.toggle(i,c)}return r}function na(n,e,a,s){var t=n[Ot];if(t!==e){var r=n0(e);r==null?n.removeAttribute("style"):n.style.cssText=r,n[Ot]=e}return s}function e0(n,e){e?n.hasAttribute("selected")||n.setAttribute("selected",""):n.removeAttribute("selected")}function a0(n,e){var a=n.__defaultValue,s=n.multiple,t=s?a??[]:null;if(!(s&&!it(t))){n.selectedIndex;for(var r of n.options){var o=Zt(r);e0(r,s?t.includes(o):wl(o,a))}}}function Yl(n,e,a=!1){if(n.multiple){if(e==null)return;if(!it(e))return Uc();for(var s of n.options)s.selected=e.includes(Zt(s));return}for(s of n.options){var t=Zt(s);if(wl(t,e)){s.selected=!0;return}}(!a||e!==void 0)&&(n.selectedIndex=-1)}function s0(n){var e=new MutationObserver(a=>{a.every(t0)||("__defaultValue"in n&&a0(n),"__value"in n&&Yl(n,n.__value))});e.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Br(()=>{e.disconnect()})}function Zt(n){return"__value"in n?n.__value:n.value}function t0(n){if(n.target.closest("selectedcontent")!==null)return!0;if(n.type==="childList"){var e=[...n.addedNodes,...n.removedNodes];return e.length>0&&e.every(a=>a.nodeName==="SELECTEDCONTENT")}return!1}const r0=Symbol("is custom element"),o0=Symbol("is html");function no(n,e){var a=zl(n);a.checked!==(a.checked=e??void 0)&&(n.checked=e)}function fn(n,e,a,s){var t=zl(n),r=t[e];r!==(t[e]=a)&&(e==="loading"&&(n[Wc]=a),a==null?n.removeAttribute(e):typeof a!="string"&&l0(n).has(e)?n[e]=a:n.setAttribute(e,a))}function zl(n){return n[cl]??={[r0]:n.nodeName.includes("-"),[o0]:n.namespaceURI===Qc}}var eo=new Map;function l0(n){var e=n.getAttribute("is")||n.nodeName,a=eo.get(e);if(a)return a;eo.set(e,a=new Set);for(var s,t=n,r=Element.prototype;r!==t;){s=tl(t);for(var o in s)s[o].set&&o!=="innerHTML"&&o!=="textContent"&&o!=="innerText"&&a.add(o);t=cr(t)}return a}function Et(n,e){return n===e||n?.[qe]===e}function i0(n=ur(),e,a,s){var t=Ln.r,r=pn;return Lf(()=>{var o,l;return Jl(()=>{o=l,l=[],Xa(()=>{Et(a(...l),n)||(e(n,...l),o&&Et(a(...o),n)&&e(null,...o))})}),()=>{let i=r;for(;i!==t&&i.parent!==null&&i.parent.f&Bs;)i=i.parent;const c=()=>{l&&Et(a(...l),n)&&e(null,...l)},u=i.teardown;i.teardown=()=>{c(),u?.()}}}),n}function c0(n=!1){const e=Ln,a=e.l.u;if(!a)return;let s=()=>Wf(e.s);if(n){let t=0,r={};const o=Oa(()=>{let l=!1;const i=e.s;for(const c in i)i[c]!==r[c]&&(r[c]=i[c],l=!0);return l&&t++,t});s=()=>f(o)}a.b.length&&Ef(()=>{ao(e,s),Ht(a.b)}),Ts(()=>{const t=Xa(()=>a.m.map(Mc));return()=>{for(const r of t)typeof r=="function"&&r()}}),a.a.length&&Ts(()=>{ao(e,s),Ht(a.a)})}function ao(n,e){if(n.l.s)for(const a of n.l.s)f(a);e()}function Ql(n,e,a){if(n==null)return e(void 0),ma;const s=Xa(()=>n.subscribe(e,a));return s.unsubscribe?()=>s.unsubscribe():s}const ka=[];function jl(n,e){return{subscribe:Sr(n,e).subscribe}}function Sr(n,e=ma){let a=null;const s=new Set;function t(l){if(pl(n,l)&&(n=l,a)){const i=!ka.length;for(const c of s)c[1](),ka.push(c,n);if(i){for(let c=0;c<ka.length;c+=2)ka[c][0](ka[c+1]);ka.length=0}}}function r(l){t(l(n))}function o(l,i=ma){const c=[l,i];return s.add(c),s.size===1&&(a=e(t,r)||ma),l(n),()=>{s.delete(c),s.size===0&&a&&(a(),a=null)}}return{set:t,update:r,subscribe:o}}function f0(n){let e;return Ql(n,a=>e=a)(),e}let Ps=!1,Xt=Symbol("unmounted");function We(n,e,a){const s=a[e]??={store:null,source:kl(void 0),unsubscribe:ma};if(s.store!==n&&!(Xt in a))if(s.unsubscribe(),s.store=n??null,n==null)s.source.v=void 0,s.unsubscribe=ma;else{var t=!0;s.unsubscribe=Ql(n,r=>{t?s.source.v=r:nn(s.source,r)}),t=!1}return n&&Xt in a?f0(n):f(s.source)}function u0(){const n={};function e(){Br(()=>{for(var a in n)n[a].unsubscribe();ir(n,Xt,{enumerable:!1,value:!0})})}return[n,e]}function d0(n){var e=Ps;try{return Ps=!1,[n(),Ps]}finally{Ps=e}}function pe(n,e,a,s){var t=!Za||(a&Kc)!==0,r=(a&Oc)!==0,o=(a&Vc)!==0,l=s,i=!0,c=void 0,u=()=>o&&t?(c??=Oa(s),f(c)):(i&&(i=!1,l=o?Xa(s):s),l);let p;if(r){var m=qe in n||Fc in n;p=Pa(n,e)?.set??(m&&e in n?T=>n[e]=T:void 0)}var d,h=!1;r?[d,h]=d0(()=>n[e]):d=n[e],d===void 0&&s!==void 0&&(d=u(),p&&(t&&tf(),p(d)));var v;if(t?v=()=>{var T=n[e];return T===void 0?u():(i=!0,T)}:v=()=>{var T=n[e];return T!==void 0&&(l=void 0),T===void 0?l:T},t&&(a&xc)===0)return v;if(p){var B=n.$$legacy;return(function(T,S){return arguments.length>0?((!t||!S||B||h)&&p(S?v():T),T):v()})}var C=!1,k=((a&Hc)!==0?Oa:pr)(()=>(C=!1,v()));r&&f(k);var w=pn;return(function(T,S){if(arguments.length>0){const J=S?f(k):t&&r?ra(T):T;return nn(k,J),C=!0,l!==void 0&&(l=J),T}return Xe&&C||(w.f&zn)!==0?k.v:f(k)})}function p0(n){Ln===null&&Zc(),Za&&Ln.l!==null?h0(Ln).m.push(n):Ts(()=>{const e=Xa(n);if(typeof e=="function")return e})}function h0(n){var e=n.l;return e.u??={a:[],b:[],m:[]}}const m0="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(m0);const so=`name,pos,team,ovr,spd,str
Ja'Marr Chase,WR,Cincinnati Bengals,99,96,73
Jaxon Smith-Njigba,WR,Seattle Seahawks,99,93,63
Josh Allen,QB,Buffalo Bills,99,89,81
Myles Garrett,REDG,Los Angeles Rams,99,86,96
Trey McBride,TE,Arizona Cardinals,99,88,76
Bijan Robinson,HB,Atlanta Falcons,98,96,81
Christian Gonzalez,CB,New England Patriots,98,96,59
Fred Warner,MIKE,San Francisco 49ers,98,87,80
Matthew Stafford,QB,Los Angeles Rams,98,77,66
Micah Parsons,REDG,Green Bay Packers,98,89,91
Penei Sewell,LT,Detroit Lions,98,73,97
Puka Nacua,WR,Los Angeles Rams,98,93,69
Christian McCaffrey,HB,San Francisco 49ers,97,90,74
George Kittle,TE,San Francisco 49ers,97,87,82
Jahmyr Gibbs,HB,Detroit Lions,97,98,72
Joe Burrow,QB,Cincinnati Bengals,97,83,68
Justin Jefferson,WR,Minnesota Vikings,97,91,64
Maxx Crosby,LEDG,Las Vegas Raiders,97,86,89
Pat Surtain II,CB,Denver Broncos,97,94,63
Trent Williams,LT,San Francisco 49ers,97,78,95
Amon-Ra St. Brown,WR,Detroit Lions,96,90,67
Creed Humphrey,C,Kansas City Chiefs,96,73,90
Derrick Brown,DT,Carolina Panthers,96,75,98
Garett Bolles,LT,Denver Broncos,96,74,87
Jeffery Simmons,DT,Chicago Bears,96,78,97
Joe Thuney,LG,Chicago Bears,96,72,90
Jonathan Taylor,HB,Indianapolis Colts,96,94,82
Quinn Meinerz,RG,Denver Broncos,96,75,95
T.J. Watt,LEDG,Pittsburgh Steelers,96,83,88
Trent McDuffie,CB,Los Angeles Rams,96,93,61
Aaron Donald,DT,Los Angeles Rams,95,83,97
Andrew Thomas,LT,NY Giants,95,68,90
Brock Bowers,TE,Las Vegas Raiders,95,90,75
Cam Heyward,DT,Pittsburgh Steelers,95,75,94
CeeDee Lamb,WR,Dallas Cowboys,95,89,70
Kenneth Walker,HB,Kansas City Chiefs,95,93,83
Lamar Jackson,QB,Baltimore Ravens,95,95,63
Quenton Nelson,LG,Seattle Seahawks,95,73,97
Will Anderson Jr,LEDG,Houston Texans,95,87,91
Aidan Hutchinson,LEDG,Detroit Lions,94,83,87
Chris Jones,DT,Kansas City Chiefs,94,73,96
Chris Lindstrom,RG,Atlanta Falcons,94,76,92
Denzel Ward,CB,Cleveland Browns,94,93,61
Derrick Henry,HB,Baltimore Ravens,94,93,87
Jessie Bates III,FS,Atlanta Falcons,94,90,59
Kyle Hamilton,SS,Baltimore Ravens,94,88,72
Laremy Tunsil,LT,Washington Commanders,94,71,92
Patrick Mahomes,QB,Kansas City Chiefs,94,85,70
Tristan Wirfs,LT,Tampa Bay Buccaneers,94,76,94
Vita Vea,DT,Tampa Bay Buccaneers,94,79,99
Antoine Winfield Jr,FS,Tampa Bay Buccaneers,93,93,59
Derwin James Jr,SS,Los Angeles Chargers,93,90,80
Dexter Lawrence II,DT,Cincinnati Bengals,93,80,97
Drake London,WR,Atlanta Falcons,93,88,77
Kolton Miller,LT,Las Vegas Raiders,93,75,88
Nick Bosa,LEDG,San Francisco 49ers,93,80,94
Roquan Smith,MIKE,Baltimore Ravens,93,86,80
Travis Kelce,TE,Kansas City Chiefs,93,85,81
Trey Smith,RG,Kansas City Chiefs,93,71,95
Zack Baun,WILL,Philadelphia Eagles,93,89,80
Brock Purdy,QB,San Francisco 49ers,92,86,63
Danielle Hunter,REDG,Houston Texans,92,87,82
DeForest Buckner,DT,San Francisco 49ers,92,81,90
Derek Stingley Jr,CB,Houston Texans,92,93,63
DeVonta Smith,WR,Philadelphia Eagles,92,92,49
Jalen Ramsey,FS,Pittsburgh Steelers,92,93,71
James Cook III,HB,Buffalo Bills,92,93,67
Rashawn Slater,LT,Los Angeles Chargers,92,74,93
Xavier McKinney,SS,Green Bay Packers,92,88,67
Brian Branch,SS,Detroit Lions,91,88,60
Caleb Williams,QB,Chicago Bears,91,91,65
Davante Adams,WR,Los Angeles Rams,91,91,63
Devon Witherspoon,CB,Seattle Seahawks,91,91,60
Jordan Mailata,LT,Philadelphia Eagles,91,76,97
Mike Evans,WR,San Francisco 49ers,91,88,78
Nik Bonitto,REDG,Denver Broncos,91,87,82
Quinnen Williams,DT,Dallas Cowboys,91,83,94
Saquon Barkley,HB,Philadelphia Eagles,91,95,81
Aaron Brewer,C,Miami Dolphins,90,74,88
Christian Darrisaw,LT,Minnesota Vikings,90,73,92
Dak Prescott,QB,Dallas Cowboys,90,84,75
Darnell Wright,RT,Chicago Bears,90,72,96
Demario Davis,MIKE,NY Jets,90,88,85
Greg Rousseau,LEDG,Buffalo Bills,90,86,83
Kevin Dotson,RG,Los Angeles Rams,90,69,92
Kyren Williams,HB,Los Angeles Rams,90,88,79
Leonard Williams,DT,Seattle Seahawks,90,77,91
Mark Andrews,TE,Baltimore Ravens,90,87,81
Minkah Fitzpatrick,SS,NY Jets,90,91,64
Nico Collins,WR,Houston Texans,90,93,67
Nnamdi Madubuike,DT,Baltimore Ravens,90,80,92
Quinyon Mitchell,CB,Philadelphia Eagles,90,94,66
Zay Flowers,WR,Baltimore Ravens,90,93,55
Brian Burns,REDG,NY Giants,89,88,76
Chris Olave,WR,New Orleans Saints,89,93,59
Dallas Goedert,TE,Philadelphia Eagles,89,86,78
Dion Dawkins,LT,Buffalo Bills,89,75,92
Drake Maye,QB,New England Patriots,89,89,62
Drue Tranquill,WILL,Kansas City Chiefs,89,87,80
Josh Hines-Allen,REDG,Jacksonville Jaguars,89,87,84
Josh Jacobs,HB,Green Bay Packers,89,90,83
Sauce Gardner,CB,Indianapolis Colts,89,92,65
Talanoa Hufanga,SS,Denver Broncos,89,89,58
Terry McLaurin,WR,Washington Commanders,89,95,67
Tyler Smith,LG,Dallas Cowboys,89,71,97
Zach Frazier,C,Pittsburgh Steelers,89,64,88
Zach Allen,DT,Denver Broncos,89,76,94
A.J. Terrell Jr,CB,Atlanta Falcons,88,91,60
Budda Baker,SS,Arizona Cardinals,88,90,72
Byron Murphy Jr,CB,Minnesota Vikings,88,92,60
Charvarius Ward Sr,CB,Indianapolis Colts,88,90,65
D'Andre Swift,HB,Chicago Bears,88,90,68
Devin Lloyd,WILL,Carolina Panthers,88,86,78
George Pickens,WR,Dallas Cowboys,88,91,61
Jalen Carter,DT,Philadelphia Eagles,88,82,94
Jared Verse,REDG,Cleveland Browns,88,89,92
Jared Goff,QB,Detroit Lions,88,74,64
Kerby Joseph,FS,Detroit Lions,88,88,64
Kyle Juszczyk,FB,San Francisco 49ers,88,85,79
Malik Nabers,WR,NY Giants,88,96,63
Sam Cosmi,RG,Washington Commanders,88,76,87
Sam LaPorta,TE,Detroit Lions,88,86,74
Tee Higgins,WR,Cincinnati Bengals,88,90,71
Trey Hendrickson,REDG,Baltimore Ravens,88,83,83
Tyler Linderbaum,C,Las Vegas Raiders,88,78,85
A.J. Brown,WR,New England Patriots,87,91,79
Breece Hall,HB,NY Jets,87,92,76
Brian O'Neill,RT,Minnesota Vikings,87,76,86
Chase Young,LEDG,New Orleans Saints,87,85,86
Cooper DeJean,CB,Philadelphia Eagles,87,92,65
Dalton Schultz,TE,Houston Texans,87,84,76
Damien Lewis,LG,Carolina Panthers,87,67,89
De'Von Achane,HB,Miami Dolphins,87,96,68
DeMarcus Lawrence,LEDG,Seattle Seahawks,87,84,87
Erik McCoy,C,New Orleans Saints,87,73,89
Foyesade Oluokun,MIKE,Jacksonville Jaguars,87,87,70
Garrett Wilson,WR,NY Jets,87,92,56
Harrison Smith,FS,Minnesota Vikings,87,86,73
Jack Campbell,MIKE,Detroit Lions,87,85,76
Jake Matthews,LT,Atlanta Falcons,87,70,86
Jamel Dean,CB,Pittsburgh Steelers,87,91,66
Jaycee Horn,CB,Carolina Panthers,87,91,65
Jaylon Johnson,CB,Chicago Bears,87,89,67
Jonathan Allen,DT,Cincinnati Bengals,87,72,93
Jordyn Brooks,WILL,Miami Dolphins,87,87,77
Tetairoa McMillan,WR,Carolina Panthers,87,89,76
Trevor Lawrence,QB,Jacksonville Jaguars,87,89,69
Zach Bako-Bewele,RT,Green Bay Packers,87,74,81
Alex Singleton,MIKE,Denver Broncos,86,85,72
Alex Highsmith,REDG,Pittsburgh Steelers,86,84,85
Alim McNeill,DT,Detroit Lions,86,74,94
Bernhard Raimann,LT,Indianapolis Colts,86,70,92
Brandon Aubrey,K,Dallas Cowboys,86,81,49
Bucky Irving,HB,Tampa Bay Buccaneers,86,89,65
Courtland Sutton,WR,Denver Broncos,86,90,75
Devin Bush,MIKE,Chicago Bears,86,87,74
Hunter Henry,TE,New England Patriots,86,85,75
Isaiah Rodgers Sr,CB,Minnesota Vikings,86,96,50
Jalen Pitre,CB,Houston Texans,86,90,62
Jaylen Warren,HB,Pittsburgh Steelers,86,90,75
Joe Alt,RT,Los Angeles Chargers,86,71,89
Joey Porter Jr,CB,Dallas Cowboys,86,90,67
Jordan Love,QB,Green Bay Packers,86,85,62
Julian Love,FS,Seattle Seahawks,86,89,62
Khalil Mack,REDG,Los Angeles Chargers,86,84,87
Mike Onwenu,RG,New England Patriots,86,65,91
Milton Williams,DT,New England Patriots,86,82,92
Nick Emmanwori,SS,Seattle Seahawks,86,93,70
Paris Johnson Jr,LT,Arizona Cardinals,86,73,89
Ronnie Stanley,LT,Baltimore Ravens,86,70,92
Stefon Diggs,WR,Washington Commanders,86,88,62
Alaric Jackson,LT,Los Angeles Rams,85,63,88
Ashton Jeanty,HB,Las Vegas Raiders,85,90,80
Byron Murphy II,DT,Seattle Seahawks,85,77,91
Byron Young,LEDG,Los Angeles Rams,85,92,74
Carlton Davis III,CB,New England Patriots,85,90,65
Carson Schwesinger,MIKE,Cleveland Browns,85,87,75
Charles Cross,LT,Seattle Seahawks,85,73,84
Chris Boswell,K,Pittsburgh Steelers,85,72,44
Christian Watson,WR,Green Bay Packers,85,96,65
Chuba Hubbard,HB,Carolina Panthers,85,91,75
Dre Greenlaw,WILL,San Francisco 49ers,85,85,72
Ernest Jones IV,MIKE,Seattle Seahawks,85,87,74
Jameson Williams,WR,Detroit Lions,85,98,63
Javonte Williams,HB,Dallas Cowboys,85,88,82
Jaylen Waddle,WR,Denver Broncos,85,96,57
Jevon Holland,FS,NY Giants,85,91,65
Jonathan Greenard,REDG,Philadelphia Eagles,85,86,81
Josh Sweat,REDG,Arizona Cardinals,85,85,81
Kamari Lassiter,CB,Houston Texans,85,92,52
Kevin Byard III,FS,New England Patriots,85,88,73
Kevin Zeitler,RG,Green Bay Packers,85,72,91
Kobie Turner,DT,Los Angeles Rams,85,74,89
Marlon Humphrey,CB,Baltimore Ravens,85,91,74
Michael Dickson,P,Seattle Seahawks,85,77,47
Rashee Rice,WR,Kansas City Chiefs,85,90,71
Ryan Neuzil,C,Atlanta Falcons,85,69,85
Spencer Brown,RT,Buffalo Bills,85,73,91
Travis Hunter,CB,Jacksonville Jaguars,85,93,61
Tucker Kraft,TE,Green Bay Packers,85,88,76
Alec Pierce,WR,Indianapolis Colts,84,94,67
Andrew Van Ginkel,REDG,Minnesota Vikings,84,86,76
Blake Cashman,MIKE,Minnesota Vikings,84,87,70
Camryn Bynum,FS,Indianapolis Colts,84,88,66
Chase Brown,HB,Cincinnati Bengals,84,93,69
Colton McKivitz,RT,San Francisco 49ers,84,71,84
D.J. Reader,DT,NY Giants,84,70,95
Daron Payne,DT,Washington Commanders,84,77,95
DJ Moore,WR,Buffalo Bills,84,91,66
DJ Turner II,CB,Cincinnati Bengals,84,96,43
Jalen Redmond,DT,Minnesota Vikings,84,79,85
Jalen Thompson,SS,Dallas Cowboys,84,90,60
Jonathon Cooper,LEDG,Denver Broncos,84,85,82
Jordan Addison,WR,Minnesota Vikings,84,90,52
Luke Goedeke,RT,Tampa Bay Buccaneers,84,66,88
Nate Wiggins,CB,Baltimore Ravens,84,96,49
Nate Landman,MIKE,Los Angeles Rams,84,82,76
Parker Washington,WR,Jacksonville Jaguars,84,89,66
Patrick Ricard,FB,NY Giants,84,72,88
Peter Skoronski,LG,Tennessee Titans,84,67,89
Quentin Lake,SS,Los Angeles Rams,84,89,57
Sam Darnold,QB,Seattle Seahawks,84,82,60
Spencer Shrader,K,Indianapolis Colts,84,67,42
Tanor Bortolini,C,Indianapolis Colts,84,74,88
Taron Johnson,CB,Las Vegas Raiders,84,92,63
Taylor Moton,RT,Carolina Panthers,84,68,88
Terrel Bernard,MIKE,Buffalo Bills,84,85,67
Tony Pollard,HB,Tennessee Titans,84,90,69
Travis Etienne Jr,HB,New Orleans Saints,84,92,70
Tyler Warren,TE,Indianapolis Colts,84,84,80
Tyler Booker,RG,Dallas Cowboys,84,60,95
Will Reichard,K,Minnesota Vikings,84,78,42
Aaron Jones Sr,HB,Minnesota Vikings,83,88,71
Abraham Lucas,RT,Seattle Seahawks,83,74,87
Alijah Vera-Tucker,LG,New England Patriots,83,75,91
Armand Membou,RT,NY Jets,83,74,91
Azeez Al-Shaair,MIKE,Houston Texans,83,86,77
Bobby Okereke,MIKE,Carolina Panthers,83,88,73
Brandon Jones,FS,Denver Broncos,83,88,58
Cam Skattebo,HB,NY Giants,83,85,83
Chidobe Awuzie,CB,Baltimore Ravens,83,89,69
Cooper Kupp,WR,Seattle Seahawks,83,87,66
Dalton Kincaid,TE,Buffalo Bills,83,86,71
Deommodore Lenoir,CB,San Francisco 49ers,83,90,59
DK Metcalf,WR,Pittsburgh Steelers,83,94,79
Dominick Puni,RG,San Francisco 49ers,83,61,91
Evan Williams,FS,Green Bay Packers,83,86,62
George Karlaftis,LEDG,Kansas City Chiefs,83,81,85
Grover Stewart,DT,Indianapolis Colts,83,73,90
Hjalte Froholdt,C,Arizona Cardinals,83,72,91
Jermaine Eluemunor,RT,NY Giants,83,68,92
Jonah Jackson,RG,Chicago Bears,83,68,86
Josh Metellus,SS,Minnesota Vikings,83,88,66
Justin Herbert,QB,Los Angeles Chargers,83,88,71
Kaden Elliss,WILL,New Orleans Saints,83,85,75
Kam Curl,SS,Los Angeles Rams,83,89,70
Khalil Shakir,WR,Buffalo Bills,83,90,63
Kyler Gordon,CB,Chicago Bears,83,88,66
Ladd McConkey,WR,Los Angeles Chargers,83,92,57
Nick Folk,K,Atlanta Falcons,83,66,59
Nolan Smith Jr,LEDG,Philadelphia Eagles,83,90,69
Poona Ford,DT,Los Angeles Rams,83,71,88
Reggie Gilliam,FB,New England Patriots,83,87,81
Rigoberto Sanchez,P,Indianapolis Colts,83,69,51
Riq Woolen,CB,Philadelphia Eagles,83,96,60
Robert Spillane,MIKE,New England Patriots,83,87,71
T.J. Hockenson,TE,Minnesota Vikings,83,83,80
Zach Charbonnet,HB,Seattle Seahawks,83,88,79
Zach Sieler,DT,Miami Dolphins,83,78,89
A.J. Cole,P,Las Vegas Raiders,82,71,47
Abdul Carter,LEDG,NY Giants,82,88,80
Arvell Reese,WILL,NY Giants,82,90,80
Braden Smith,RT,Houston Texans,82,66,92
Bryce Young,QB,Carolina Panthers,82,87,54
Calais Campbell,DT,Baltimore Ravens,82,73,89
Chris Godwin Jr,WR,Tampa Bay Buccaneers,82,88,72
Colston Loveland,TE,Chicago Bears,82,86,78
Dallas Turner,LEDG,Minnesota Vikings,82,90,76
David Montgomery,HB,Houston Texans,82,87,77
Donte Jackson,CB,Los Angeles Chargers,82,93,49
Ed Oliver,DT,Buffalo Bills,82,82,89
Elgton Jenkins,C,Cleveland Browns,82,73,89
Evan McPherson,K,Cincinnati Bengals,82,74,37
Grant Delpit,SS,Cleveland Browns,82,90,60
Isaiah Likely,TE,NY Giants,82,84,66
Jaelan Phillips,LEDG,Carolina Panthers,82,87,83
Jakobi Meyers,WR,Jacksonville Jaguars,82,88,62
Jason Myers,K,Seattle Seahawks,82,69,43
Jeremiah Owusu-Koramoah,WILL,Cleveland Browns,82,87,65
Jeremiyah Love,HB,Arizona Cardinals,82,94,76
Jeremy Chinn,SS,Las Vegas Raiders,82,91,70
Jeremy Crawshaw,P,Denver Broncos,82,77,60
Joe Tippmann,RG,NY Jets,82,73,89
Jordan Davis,DT,Philadelphia Eagles,82,81,96
Jourdan Lewis,CB,Jacksonville Jaguars,82,88,67
Landon Dickerson,LG,Philadelphia Eagles,82,66,93
Leo Chenal,MIKE,Washington Commanders,82,87,82
Lukas Van Ness,LEDG,Green Bay Packers,82,86,81
Mansoor Delane,CB,Kansas City Chiefs,82,93,59
Marcus Jones,CB,New England Patriots,82,92,48
Michael Wilson,WR,Arizona Cardinals,82,89,72
Mike McGlinchey,RT,Denver Broncos,82,70,88
Morgan Moses,RT,New England Patriots,82,65,90
Nick Bolton,MIKE,Kansas City Chiefs,82,87,74
Rasheed Walker,LT,Carolina Panthers,82,63,87
Rico Dowdle,HB,Pittsburgh Steelers,82,89,75
Rome Odunze,WR,Chicago Bears,82,91,65
Tony Jefferson,SS,Los Angeles Chargers,82,87,74
Tre'von Moehrig,FS,Carolina Panthers,82,89,64
Tremaine Edmunds,MIKE,NY Giants,82,85,75
TreVeyon Henderson,HB,New England Patriots,82,95,71
Wan'Dale Robinson,WR,Tennessee Titans,82,91,61
Amani Hooker,SS,Tennessee Titans,81,87,62
Antonio Johnson,SS,Jacksonville Jaguars,81,88,55
Bhayshul Tuten,HB,Jacksonville Jaguars,81,95,75
C.J. Stroud,QB,Houston Texans,81,82,61
Calen Bullock,FS,Houston Texans,81,90,54
Cam Taylor-Britt,CB,Indianapolis Colts,81,92,64
Chase McLaughlin,K,Tampa Bay Buccaneers,81,73,39
Cobie Durant,CB,Dallas Cowboys,81,92,50
Connor McGovern,C,Buffalo Bills,81,68,87
Craig Woodson,SS,New England Patriots,81,91,59
Daiyan Henley,WILL,Los Angeles Chargers,81,88,65
Darren Waller,TE,Carolina Panthers,81,87,70
David Bailey,REDG,NY Jets,81,89,80
Divine Deablo,MIKE,Atlanta Falcons,81,88,69
Emeka Egbuka,WR,Tampa Bay Buccaneers,81,90,60
Gervon Dexter Sr,DT,Atlanta Falcons,81,76,85
Grady Jarrett,DT,Chicago Bears,81,71,89
Harold Landry III,REDG,New England Patriots,81,84,78
J.K. Dobbins,HB,Denver Broncos,81,90,74
Jadeveon Clowney,LEDG,Houston Texans,81,82,84
Jauan Jennings,WR,Minnesota Vikings,81,88,78
JK Scott,P,Los Angeles Chargers,81,75,51
Josh Harris,LS,Los Angeles Chargers,81,76,68
Josh Simmons,LT,Kansas City Chiefs,81,78,88
Josh Downs,WR,Indianapolis Colts,81,90,51
Justin Reid,FS,New Orleans Saints,81,90,66
Ka'imi Fairbairn,K,Houston Texans,81,79,39
Keenan Allen,WR,Indianapolis Colts,81,88,72
Kyle Pitts Sr,TE,Atlanta Falcons,81,90,71
Mason Graham,DT,Cleveland Browns,81,78,90
Michael Pittman,WR,Pittsburgh Steelers,81,88,71
Mike Jackson,CB,Carolina Panthers,81,90,61
Montez Sweat,LEDG,Chicago Bears,81,87,80
Nick Cross,SS,Washington Commanders,81,92,67
Omarion Hampton,HB,Los Angeles Chargers,81,90,78
Patrick Paul,LT,Miami Dolphins,81,68,90
Quincy Williams,WILL,Cleveland Browns,81,87,67
Robert Hunt,RG,Carolina Panthers,81,65,89
Sheldon Rankins,DT,Houston Texans,81,75,87
Sonny Styles,MIKE,Washington Commanders,81,90,74
Steve Avila,LG,Los Angeles Rams,81,65,88
T.J. Edwards,WILL,Chicago Bears,81,85,72
Tarheeb Still,CB,Los Angeles Chargers,81,89,56
Tyler Allgeier,HB,Arizona Cardinals,81,85,80
Tyler Shough,QB,New Orleans Saints,81,87,56
Will Campbell,LT,New England Patriots,81,73,87
Woody Marks,HB,Houston Texans,81,88,70
Zyon McCollum,CB,Tampa Bay Buccaneers,81,93,60
Akheem Mesidor,REDG,Los Angeles Chargers,80,86,81
Alohi Gilman,FS,Kansas City Chiefs,80,87,63
Andrew DePaola,LS,Minnesota Vikings,80,74,75
Baker Mayfield,QB,Tampa Bay Buccaneers,80,87,69
Bo Nix,QB,Denver Broncos,80,89,60
Bryan Cook,FS,Cincinnati Bengals,80,89,67
Caleb Downs,SS,Dallas Cowboys,80,89,73
Cam Little,K,Jacksonville Jaguars,80,74,41
Cameron Dicker,K,Los Angeles Chargers,80,75,51
Christian Benford,CB,Buffalo Bills,80,89,65
Christian Barmore,DT,New England Patriots,80,74,89
Cor'Dale Flott,CB,Tennessee Titans,80,91,50
Corey Bojorquez,P,Cleveland Browns,80,70,41
D.J. Reed,CB,Detroit Lions,80,89,52
DeShon Elliott,SS,Pittsburgh Steelers,80,87,57
Edgerrin Cooper,WILL,Green Bay Packers,80,89,72
Ethan Evans,P,Los Angeles Rams,80,68,55
Ezra Cleveland,RG,Jacksonville Jaguars,80,76,88
Harold Fannin Jr,TE,Cleveland Browns,80,82,75
Harrison Butker,K,Kansas City Chiefs,80,74,44
Ikem Ekwonu,LT,Carolina Panthers,80,74,93
Isaac Seumalo,LG,Arizona Cardinals,80,68,84
Jacob Rodriguez,MIKE,Miami Dolphins,80,87,76
Jacory Croskey-Merritt,HB,Washington Commanders,80,92,67
Jake Elliott,K,Philadelphia Eagles,80,75,34
Jaquan Brisker,SS,Pittsburgh Steelers,80,89,68
Javon Hargrave,DT,Green Bay Packers,80,74,87
Jayden Reed,WR,Green Bay Packers,80,94,58
Jaylen Watson,CB,Los Angeles Rams,80,92,66
JC Latham,RT,Tennessee Titans,80,63,94
John Simpson,LG,Baltimore Ravens,80,69,92
John Franklin-Myers,DT,Tennessee Titans,80,77,90
Jordan Mason,HB,Minnesota Vikings,80,89,78
Juwan Johnson,TE,New Orleans Saints,80,86,69
Kayshon Boutte,WR,Houston Texans,80,91,58
Kenny Moore II,CB,Philadelphia Eagles,80,90,61
Kyle Monangai,HB,Chicago Bears,80,86,77
Kyle Van Noy,REDG,Minnesota Vikings,80,82,76
Laiatu Latu,LEDG,Indianapolis Colts,80,84,77
Luther Burden III,WR,Chicago Bears,80,92,69
Mack Wilson Sr,MIKE,Arizona Cardinals,80,86,79
Mason McCormick,LG,Pittsburgh Steelers,80,70,90
Matthew Golden,WR,Green Bay Packers,80,95,61
Michael Mayer,TE,Las Vegas Raiders,80,82,79
Odafe Oweh,LEDG,Washington Commanders,80,88,80
Quay Walker,WILL,Las Vegas Raiders,80,88,75
Quentin Johnston,WR,Los Angeles Chargers,80,93,70
Quinshon Judkins,HB,Cleveland Browns,80,90,77
Rhamondre Stevenson,HB,New England Patriots,80,88,82
Ricky Pearsall,WR,San Francisco 49ers,80,92,61
Travon Walker,LEDG,Jacksonville Jaguars,80,87,88
Tyler Biadasz,C,Los Angeles Chargers,80,74,85
Tytus Howard,RT,Cleveland Browns,80,72,85
Alex Anzalone,WILL,Tampa Bay Buccaneers,79,88,74
Alvin Kamara,HB,New Orleans Saints,79,87,77
Amik Robertson,CB,Washington Commanders,79,90,56
Anton Harrison,LT,Jacksonville Jaguars,79,73,84
Blake Corum,HB,Los Angeles Rams,79,93,75
Boye Mafe,REDG,Cincinnati Bengals,79,89,75
Braden Mann,P,Philadelphia Eagles,79,77,45
Braden Fiske,DT,Los Angeles Rams,79,80,93
Brenton Strange,TE,Jacksonville Jaguars,79,83,77
Brian Thomas Jr,WR,Jacksonville Jaguars,79,97,59
Brian Robinson Jr,HB,Atlanta Falcons,79,87,81
Bryan Anger,P,Dallas Cowboys,79,73,55
Cameron Jordan,REDG,New Orleans Saints,79,76,87
Carl Granderson,REDG,New Orleans Saints,79,85,80
Cole Bishop,FS,Buffalo Bills,79,91,64
Coleman Shelton,C,Los Angeles Rams,79,72,83
DaQuan Jones,DT,New England Patriots,79,70,88
David Edwards,LG,New Orleans Saints,79,67,82
Deebo Samuel Sr,WR,San Francisco 49ers,79,91,80
Dorance Armstrong,LEDG,Washington Commanders,79,78,82
Dru Phillips,CB,NY Giants,79,90,62
Dylan Parham,LG,NY Jets,79,74,86
Elijah Molden,FS,Los Angeles Chargers,79,89,57
Eric Wilson,WILL,Minnesota Vikings,79,88,79
Francis Mauigoa,RG,NY Giants,79,68,91
Frankie Luvu,WILL,Washington Commanders,79,85,83
Greg Newsome II,CB,NY Giants,79,91,60
Ja'Quan McMillian,CB,Denver Broncos,79,90,56
Jack Fox,P,Detroit Lions,79,87,50
Jacob Parrish,CB,Tampa Bay Buccaneers,79,94,65
Jalen Hurts,QB,Philadelphia Eagles,79,88,76
Jalon Walker,LEDG,Atlanta Falcons,79,86,80
James Pearce Jr,REDG,Atlanta Falcons,79,90,76
James Conner,HB,Arizona Cardinals,79,88,83
Jerry Jeudy,WR,Cleveland Browns,79,91,64
Jihaad Campbell,MIKE,Philadelphia Eagles,79,89,72
Kamren Kinchens,FS,Los Angeles Rams,79,86,59
Kenny Clark,DT,Dallas Cowboys,79,74,91
Kristian Fulton,CB,Kansas City Chiefs,79,91,59
L'Jarius Sneed,CB,Kansas City Chiefs,79,94,60
Matthew Bergeron,LG,Atlanta Falcons,79,63,89
Mike Gesicki,TE,Cincinnati Bengals,79,84,76
Nakobe Dean,MIKE,Las Vegas Raiders,79,87,66
Nohl Williams,CB,Kansas City Chiefs,79,89,63
Pat Freiermuth,TE,Pittsburgh Steelers,79,83,78
Patrick Queen,MIKE,Pittsburgh Steelers,79,87,73
Reed Blankenship,SS,Houston Texans,79,87,61
RJ Harvey,HB,Denver Broncos,79,92,73
Romeo Doubs,WR,New England Patriots,79,91,60
Spencer Fano,LT,Cleveland Browns,79,75,90
T'Vondre Sweat,DT,NY Jets,79,63,94
Tank Dell,WR,Houston Texans,79,92,50
Travis Jones,DT,Baltimore Ravens,79,74,95
Trent Brown,RT,Houston Texans,79,68,91
Trenton Simpson,WILL,Baltimore Ravens,79,91,77
Tuli Tuipulotu,LEDG,Los Angeles Chargers,79,77,88
Tykee Smith,SS,Tampa Bay Buccaneers,79,90,58
Tyler Loop,K,Baltimore Ravens,79,74,40
Tyson Campbell,CB,Cleveland Browns,79,92,58
Xavier Worthy,WR,Kansas City Chiefs,79,99,47
Yaya Diaby,REDG,Tampa Bay Buccaneers,79,89,74
Zach Wood,LS,New Orleans Saints,79,71,75
A'Shawn Robinson,DT,Tampa Bay Buccaneers,78,64,85
Aaron Rodgers,QB,Pittsburgh Steelers,78,77,59
Alontae Taylor,CB,Tennessee Titans,78,95,60
Ar'Darius Washington,FS,NY Giants,78,84,57
Bradley Chubb,REDG,Buffalo Bills,78,84,89
Bryce Baringer,P,New England Patriots,78,73,50
Cairo Santos,K,Chicago Bears,78,72,33
Calvin Ridley,WR,Tennessee Titans,78,92,59
Carnell Tate,WR,Tennessee Titans,78,91,68
Cedric Gray,WILL,Tennessee Titans,78,84,69
Christian Kirk,WR,San Francisco 49ers,78,90,65
Chuck Clark,FS,Detroit Lions,78,87,67
Cody Barton,MIKE,Tennessee Titans,78,85,78
Cole Kmet,TE,Chicago Bears,78,85,76
Dane Belton,FS,NY Jets,78,91,63
Dax Hill,CB,Cincinnati Bengals,78,92,56
Deonte Banks,CB,NY Giants,78,95,60
Derrick Harmon,DT,Pittsburgh Steelers,78,74,93
Devonte Wyatt,DT,Green Bay Packers,78,80,86
Dontayvion Wicks,WR,Philadelphia Eagles,78,89,60
Ed Ingram,RG,Houston Texans,78,71,87
Evan Engram,TE,Denver Broncos,78,86,66
Garrett Williams,CB,Arizona Cardinals,78,88,63
Hogan Hatten,LS,Detroit Lions,78,78,68
Isaiah McDuffie,SAM,Green Bay Packers,78,88,73
Jackson Powers-Johnson,RG,Las Vegas Raiders,78,70,88
Jake Brendel,C,San Francisco 49ers,78,68,84
Jake Ferguson,TE,Dallas Cowboys,78,81,69
Jake Bailey,P,Atlanta Falcons,78,81,43
Jalen Coker,WR,Carolina Panthers,78,91,63
Jarran Reed,DT,Seattle Seahawks,78,71,89
Javon Bullard,SS,Green Bay Packers,78,89,70
Jaxson Dart,QB,NY Giants,78,84,63
Jordan Battle,SS,Cincinnati Bengals,78,88,63
Kayvon Thibodeaux,LEDG,NY Giants,78,88,81
Keisean Nixon,CB,Green Bay Packers,78,92,54
Keldric Faulk,LEDG,Tennessee Titans,78,83,84
Kelvin Banks Jr,LT,New Orleans Saints,78,67,86
Kenny Gainwell,HB,Tampa Bay Buccaneers,78,89,70
Kwity Paye,REDG,Las Vegas Raiders,78,84,86
Malachi Lawrence,REDG,Dallas Cowboys,78,88,79
Malaki Starks,FS,Baltimore Ravens,78,89,63
Malcolm Koonce,LEDG,Las Vegas Raiders,78,84,75
Maliek Collins,DT,Cleveland Browns,78,70,84
Malik Hooker,FS,Dallas Cowboys,78,87,76
Matt Goncalves,RG,Indianapolis Colts,78,66,84
Nick Herbig,REDG,Pittsburgh Steelers,78,84,74
Omar Speights,WILL,Los Angeles Rams,78,84,78
Rachaad White,HB,Washington Commanders,78,89,74
Rashan Gary,LEDG,Dallas Cowboys,78,85,83
Rashid Shaheed,WR,Seattle Seahawks,78,95,61
Renardo Green,CB,San Francisco 49ers,78,90,59
Riley Moss,CB,Denver Broncos,78,91,53
Roger Rosengarten,RT,Baltimore Ravens,78,75,82
Rueben Bain Jr,LEDG,Tampa Bay Buccaneers,78,84,84
Sebastian Joseph-Day,DT,Pittsburgh Steelers,78,73,86
Tommy Townsend,P,Tennessee Titans,78,81,43
Tre Tucker,WR,Las Vegas Raiders,78,95,53
Trent Sieg,LS,Dallas Cowboys,78,75,72
Trey Amos,CB,Washington Commanders,78,91,64
Troy Franklin,WR,Denver Broncos,78,92,58
Tyleik Williams,DT,Detroit Lions,78,75,91
Tyler Guyton,LT,Dallas Cowboys,78,67,86
Tyrone Tracy Jr,HB,NY Giants,78,90,72
Vega Ioane,RG,Baltimore Ravens,78,62,89
Wil Lutz,K,Denver Broncos,78,69,54
Will McDonald IV,LEDG,NY Jets,78,82,69
Xavier Watts,SS,Atlanta Falcons,78,86,62
Zaire Franklin,MIKE,Green Bay Packers,78,84,80
Zion Johnson,LG,Cleveland Browns,78,66,90
Adonai Mitchell,WR,NY Jets,77,94,51
Andre Cisco,SS,NY Jets,77,91,65
Andre Szmyt,K,Cleveland Browns,77,73,41
Andrew Wingard,FS,Arizona Cardinals,77,88,55
Benjamin St-Juste,CB,Green Bay Packers,77,90,60
Bradley Pinion,P,Miami Dolphins,77,70,53
Brandon Stephens,CB,NY Jets,77,90,68
Calijah Kancey,DT,Tampa Bay Buccaneers,77,83,84
Carrington Valentine,CB,Green Bay Packers,77,91,49
Cashius Howell,REDG,Cincinnati Bengals,77,86,76
Chris Johnson,CB,Miami Dolphins,77,91,63
Coby Bryant,FS,Chicago Bears,77,90,63
Cody Mauch,RG,Tampa Bay Buccaneers,77,70,87
Corliss Waitman,P,San Francisco 49ers,77,70,46
Daniel Carlson,K,New Orleans Saints,77,70,52
DaRon Bland,CB,Dallas Cowboys,77,91,60
David Onyemata,DT,NY Jets,77,72,89
David Njoku,TE,Los Angeles Chargers,77,86,72
DeMario Douglas,WR,New England Patriots,77,91,57
Deone Walker,DT,Buffalo Bills,77,66,84
Derick Hall,LEDG,Seattle Seahawks,77,87,76
Derrick Moore,LEDG,Detroit Lions,77,82,85
Dillon Thieneman,SS,Chicago Bears,77,92,64
Donovan Ezeiruaku,REDG,Dallas Cowboys,77,83,79
Dre'Mont Jones,LEDG,New England Patriots,77,82,82
Eddy Pineiro,K,San Francisco 49ers,77,75,42
Elic Ayomanor,WR,Tennessee Titans,77,91,68
Eric Stokes,CB,Las Vegas Raiders,77,95,58
Harrison Phillips,DT,NY Jets,77,69,93
Jalen Nailor,WR,Las Vegas Raiders,77,90,58
James Pierre,CB,Minnesota Vikings,77,94,60
Jamien Sherwood,WILL,NY Jets,77,86,67
Jarrian Jones,CB,Jacksonville Jaguars,77,93,43
Jayden Higgins,WR,Houston Texans,77,89,67
Jaylinn Hawkins,FS,Baltimore Ravens,77,87,63
Jermaine Johnson II,REDG,Tennessee Titans,77,85,82
Josh Jobe,CB,Seattle Seahawks,77,89,63
Justice Hill,HB,Baltimore Ravens,77,90,67
Kadyn Proctor,LG,Miami Dolphins,77,65,90
Keeanu Benton,DT,Pittsburgh Steelers,77,70,89
Keon Coleman,WR,Buffalo Bills,77,87,72
Kimani Vidal,HB,Los Angeles Chargers,77,90,70
Kirk Cousins,QB,Las Vegas Raiders,77,69,52
Kyler Murray,QB,Minnesota Vikings,77,92,59
Luke Rhodes,LS,Indianapolis Colts,77,80,80
Luke Wattenberg,C,Denver Broncos,77,65,79
Mack Hollins,WR,New England Patriots,77,90,73
Malik Mustapha,SS,San Francisco 49ers,77,88,66
Martin Emerson Jr,CB,New Orleans Saints,77,88,65
Marvin Mims Jr,WR,Denver Broncos,77,92,55
Marvin Harrison Jr,WR,Houston Texans,77,88,57
Maxwell Hairston,CB,Buffalo Bills,77,96,59
Mike Danna,LEDG,Buffalo Bills,77,80,82
Moro Ojomo,DT,Philadelphia Eagles,77,71,84
Mykel Williams,REDG,San Francisco 49ers,77,81,86
Omar Cooper Jr,WR,NY Jets,77,93,72
Osa Odighizuwa,DT,San Francisco 49ers,77,76,85
Quan Martin,FS,Washington Commanders,77,90,61
R Mason Thomas,LEDG,Kansas City Chiefs,77,83,80
Rashod Bateman,WR,Baltimore Ravens,77,90,60
Rasul Douglas,CB,Washington Commanders,77,88,73
Sean Murphy-Bunting,CB,Pittsburgh Steelers,77,90,59
Shelby Harris,DT,NY Giants,77,74,85
Tank Bigsby,HB,Philadelphia Eagles,77,92,75
Tate Ratledge,RG,Detroit Lions,77,73,88
Teair Tart,DT,Los Angeles Chargers,77,70,88
Theo Johnson,TE,NY Giants,77,87,75
TJ Parker,REDG,Buffalo Bills,77,83,82
Trey Smack,K,Green Bay Packers,77,73,43
Tyjae Spears,HB,Tennessee Titans,77,88,71
Tyrel Dodson,WILL,Carolina Panthers,77,88,74
Von Miller,LEDG,Dallas Cowboys,77,83,84
Walker Little,LT,Jacksonville Jaguars,77,65,86
Walter Nolen III,DT,Arizona Cardinals,77,81,87
Will Fries,RG,Minnesota Vikings,77,58,87
Will Johnson,CB,Arizona Cardinals,77,89,62
Za'Darius Smith,LEDG,Atlanta Falcons,77,80,86
Zaven Collins,LEDG,Arizona Cardinals,77,88,76
Al-Quadin Muhammad,LEDG,Tampa Bay Buccaneers,76,79,78
Amarius Mims,RT,Cincinnati Bengals,76,70,91
Anfernee Jennings,LEDG,New Orleans Saints,76,82,81
Antonio Williams,WR,Washington Commanders,76,92,61
Arik Armstead,DT,Jacksonville Jaguars,76,73,91
Arnold Ebiketie,LEDG,Philadelphia Eagles,76,83,76
Austin Barber,RG,Cleveland Browns,76,68,86
Austin Corbett,LG,Buffalo Bills,76,68,85
B.J. Hill,DT,Cincinnati Bengals,76,72,88
Blake Miller,RT,Detroit Lions,76,71,92
Brady Christensen,RG,Carolina Panthers,76,73,88
Brandon Dorlus,DT,Atlanta Falcons,76,77,84
Caleb Banks,DT,Minnesota Vikings,76,71,87
Caleb Lomu,RT,New England Patriots,76,73,85
Cesar Ruiz,RG,New Orleans Saints,76,76,87
Chamarri Conner,SS,Kansas City Chiefs,76,89,66
Charles Omenihu,DT,Washington Commanders,76,73,83
Cooper Beebe,C,Dallas Cowboys,76,71,87
D.J. Jones,DT,Denver Broncos,76,72,88
D.J. Wonnum,REDG,Detroit Lions,76,81,82
Dalton Risner,RG,Cincinnati Bengals,76,69,86
Darnell Mooney,WR,NY Giants,76,90,58
Darnell Washington,TE,Pittsburgh Steelers,76,84,81
Davon Godchaux,DT,New Orleans Saints,76,70,93
Dawson Knox,TE,Buffalo Bills,76,86,72
De'Zhaun Stribling,WR,San Francisco 49ers,76,94,72
Dee Alford,CB,Buffalo Bills,76,91,49
Demarcus Robinson,WR,San Francisco 49ers,76,87,60
Denzel Boston,WR,Cleveland Browns,76,88,71
Denzel Perryman,MIKE,Los Angeles Chargers,76,81,84
Devaughn Vele,WR,New Orleans Saints,76,90,58
Donovan Jackson,LG,Minnesota Vikings,76,67,90
Drake Thomas,WILL,Seattle Seahawks,76,82,66
Emmanuel McNeil-Warren,FS,Cleveland Browns,76,88,61
Gabe Jacas,LEDG,New England Patriots,76,83,87
Garrett Bradbury,C,Chicago Bears,76,76,90
Graham Barton,C,Tampa Bay Buccaneers,76,74,87
Grey Zabel,LG,Seattle Seahawks,76,74,88
Isiah Pacheco,HB,Detroit Lions,76,93,80
Ivan Pace Jr,MIKE,Minnesota Vikings,76,85,72
Jack Jones,CB,San Francisco 49ers,76,94,53
Jacob Martin,LEDG,Tennessee Titans,76,86,77
Jadarian Price,HB,Seattle Seahawks,76,89,72
Jaden Hicks,SS,Kansas City Chiefs,76,89,67
Jahdae Barron,CB,Denver Broncos,76,93,54
Jake Bates,K,Detroit Lions,76,72,35
Jalyx Hunt,REDG,Philadelphia Eagles,76,84,79
Jarvis Brownlee Jr,CB,NY Jets,76,92,63
Jason Sanders,K,NY Jets,76,76,37
Jayden Daniels,QB,Washington Commanders,76,91,59
Jer'Zhan Newton,DT,Washington Commanders,76,78,85
Jonas Sanker,SS,New Orleans Saints,76,90,58
Jordan Stout,P,NY Giants,76,83,45
Jordyn Tyson,WR,New Orleans Saints,76,90,73
Joshua Uche,REDG,Miami Dolphins,76,86,73
Julian Blackmon,SS,New Orleans Saints,76,88,57
Kalif Raymond,WR,Chicago Bears,76,91,53
KaVontae Turpin,WR,Dallas Cowboys,76,97,48
KC Concepcion Jr,WR,Cleveland Browns,76,91,70
Keaton Mitchell,HB,Los Angeles Chargers,76,94,60
Kendre Miller,HB,New Orleans Saints,76,90,75
Kenyon Sadiq,TE,NY Jets,76,91,76
Kingsley Suamataia,LG,Kansas City Chiefs,76,71,89
Kool-Aid McKinstry,CB,New Orleans Saints,76,90,53
Kyle Dugger,SS,Cincinnati Bengals,76,88,77
Logan Cooke,P,Jacksonville Jaguars,76,71,56
Makai Lemon,WR,Philadelphia Eagles,76,89,69
Malcolm Roach,DT,Denver Broncos,76,74,93
Marques Sigle,SS,San Francisco 49ers,76,92,64
Mekhi Blackmon,CB,Cleveland Browns,76,90,55
Mike Green,REDG,Baltimore Ravens,76,88,79
Mitch Wishnowsky,P,New England Patriots,76,83,56
Monroe Freeling,RT,Carolina Panthers,76,75,86
Nate Hobbs,CB,San Francisco 49ers,76,90,65
Olu Fashanu,LT,NY Jets,76,69,88
Paulson Adebo,CB,NY Giants,76,92,64
Payton Wilson,WILL,Pittsburgh Steelers,76,92,67
Riley Dixon,P,Tampa Bay Buccaneers,76,76,56
Romello Height,LEDG,San Francisco 49ers,76,84,81
Ronnie Hickman,FS,Cleveland Browns,76,86,65
Ryan Flournoy,WR,Dallas Cowboys,76,92,62
Ryan Fitzgerald,K,Carolina Panthers,76,72,53
Samaje Perine,HB,Cincinnati Bengals,76,86,84
Samson Ebukam,REDG,Atlanta Falcons,76,83,83
Taliese Fuaga,RT,New Orleans Saints,76,68,93
Ted Karras,C,Cincinnati Bengals,76,68,86
Terrion Arnold,CB,Seattle Seahawks,76,90,58
Tommy Togiai,DT,Houston Texans,76,76,91
Tommy Doman Jr,P,Buffalo Bills,76,75,51
Treydan Stukes,FS,Las Vegas Raiders,76,94,62
Ty Johnson,HB,Buffalo Bills,76,90,64
Tyler Higbee,TE,Los Angeles Rams,76,82,79
Tyquan Thornton,WR,Kansas City Chiefs,76,92,55
Uchenna Nwosu,REDG,Seattle Seahawks,76,82,73
Zion Young,LEDG,Baltimore Ravens,76,81,88
A.J. Epenesa,REDG,Philadelphia Eagles,75,78,85
A.J. Barner,TE,Seattle Seahawks,75,78,78
Akeem Davis-Gaither,MIKE,Indianapolis Colts,75,86,70
Andrew Wylie,RG,Washington Commanders,75,68,85
Arden Key,REDG,Indianapolis Colts,75,80,79
Austin McNamara,P,NY Jets,75,76,45
Avieon Terrell,CB,Atlanta Falcons,75,88,61
Azareye'h Thomas,CB,NY Jets,75,86,67
Benjamin Morrison,CB,Tampa Bay Buccaneers,75,92,57
Braelon Allen,HB,NY Jets,75,88,79
Brandin Echols,CB,Pittsburgh Steelers,75,91,52
Brandon McManus,K,Los Angeles Rams,75,75,56
Brandon Aiyuk,WR,San Francisco 49ers,75,90,65
Bryan Bresee,DT,New Orleans Saints,75,78,88
Bud Clark,FS,Seattle Seahawks,75,91,65
C.J. Gardner-Johnson,SS,Buffalo Bills,75,90,68
Cade Otton,TE,Tampa Bay Buccaneers,75,81,77
Calvin Austin,WR,NY Giants,75,94,53
Cam Jurgens,C,Baltimore Ravens,75,74,83
Chad Ryland,K,Arizona Cardinals,75,73,40
Chase Bisontis,RG,Arizona Cardinals,75,72,89
Chop Robinson,LEDG,Miami Dolphins,75,88,73
Christen Miller,DT,New Orleans Saints,75,68,88
Christian Elliss,WILL,New England Patriots,75,88,74
Clark Phillips III,CB,Chicago Bears,75,89,60
Cole Holcomb,WILL,Pittsburgh Steelers,75,87,72
Colton Hood,CB,NY Giants,75,91,57
D'Angelo Ponds,CB,NY Jets,75,94,54
Dalvin Tomlinson,DT,Los Angeles Chargers,75,69,89
Daniel Jones,QB,Indianapolis Colts,75,87,67
Dante Fowler Jr,REDG,Seattle Seahawks,75,81,73
DaVon Hamilton,DT,Jacksonville Jaguars,75,70,91
Deatrich Wise Jr,DT,Washington Commanders,75,74,85
DeMarvion Overshown,MIKE,Dallas Cowboys,75,88,64
Derrick Barnes,WILL,Detroit Lions,75,85,79
Devin Singletary,HB,NY Giants,75,86,70
Dominic Zvada,K,NY Giants,75,72,44
Dylan Sampson,HB,Cleveland Browns,75,92,65
E.J. Speed,SAM,Houston Texans,75,89,74
Emanuel Wilson,HB,Seattle Seahawks,75,90,72
Emmanuel Forbes Jr,CB,Los Angeles Rams,75,94,44
Germie Bernard,WR,Pittsburgh Steelers,75,91,71
Greg Van Roten,RG,New England Patriots,75,67,84
Henry To'oTo'o,WILL,Houston Texans,75,85,65
Jahan Dotson,WR,Atlanta Falcons,75,92,61
Jahlani Tavai,MIKE,Jacksonville Jaguars,75,84,78
James Winchester,LS,Kansas City Chiefs,75,79,67
Jason Pinnock,SS,NY Giants,75,90,61
Jawaan Taylor,RT,Atlanta Falcons,75,66,87
Jaylin Lane,WR,Washington Commanders,75,94,58
Joey Slye,K,Tennessee Titans,75,71,66
John Jenkins,DT,Baltimore Ravens,75,70,90
Jon Runyan,LG,NY Giants,75,71,87
Jonah Elliss,LEDG,Denver Broncos,75,81,74
Jonathon Brooks,HB,Carolina Panthers,75,90,70
Jonnu Smith,TE,Green Bay Packers,75,88,78
Joshua Palmer,WR,Buffalo Bills,75,87,65
Joshua Williams,CB,Tennessee Titans,75,92,59
Josiah Trotter,MIKE,Tampa Bay Buccaneers,75,88,76
K'Lavon Chaisson,REDG,Washington Commanders,75,86,78
Kayden McDonald,DT,Houston Texans,75,65,88
Kendrick Bourne,WR,Arizona Cardinals,75,87,65
Kenneth Grant,DT,Miami Dolphins,75,68,92
Kevin Winston Jr,FS,Tennessee Titans,75,89,64
Keyron Crawford,REDG,Las Vegas Raiders,75,80,78
Lloyd Cushenberry,C,Buffalo Bills,75,70,85
Mac Jones,QB,San Francisco 49ers,75,84,60
Marcus Epps,SS,Philadelphia Eagles,75,87,63
Marquise Brown,WR,Philadelphia Eagles,75,94,44
Matt Gay,K,Las Vegas Raiders,75,73,41
Matt Araiza,P,Kansas City Chiefs,75,82,49
Max Iheanachor,RT,Pittsburgh Steelers,75,75,88
Micah McFadden,MIKE,NY Giants,75,84,72
Michael Hoecht,LEDG,Buffalo Bills,75,83,83
Michael Penix Jr,QB,Atlanta Falcons,75,84,57
Mike Sainristil,CB,Washington Commanders,75,90,51
Nahshon Wright,CB,NY Jets,75,90,54
Nic Scourton,LEDG,Carolina Panthers,75,82,83
Nick Scott,SS,Carolina Panthers,75,89,64
O'Cyrus Torrence,RG,Buffalo Bills,75,61,91
Ollie Gordon II,HB,Miami Dolphins,75,86,76
Orlando Brown Jr,LT,Cincinnati Bengals,75,59,94
Oronde Gadsden,TE,Los Angeles Chargers,75,86,73
Pete Werner,MIKE,New Orleans Saints,75,84,72
Peter Woods,DT,Kansas City Chiefs,75,76,89
Ray Davis,HB,Buffalo Bills,75,88,78
Roger McCreary,CB,Detroit Lions,75,88,65
Ryan Rehkow,P,Cincinnati Bengals,75,68,53
Ryan Wright,P,New Orleans Saints,75,80,62
Teddye Buchanan,WILL,Baltimore Ravens,75,86,78
Teven Jenkins,RG,Cleveland Browns,75,74,91
Tony Adams,SS,Tennessee Titans,75,89,62
Tory Taylor,P,Chicago Bears,75,81,61
Tory Horton,WR,Seattle Seahawks,75,93,68
Troy Fautanu,LT,Pittsburgh Steelers,75,72,87
Tutu Atwell,WR,Los Angeles Rams,75,93,40
Ty Okada,FS,Seattle Seahawks,75,90,62
Tyler Nubin,SS,NY Giants,75,87,62
Tyrice Knight,WILL,Seattle Seahawks,75,85,71
Tyrique Stevenson Sr,CB,Chicago Bears,75,91,60
Upton Stout,CB,San Francisco 49ers,75,91,57
A.J. Dillon,HB,Carolina Panthers,74,87,85
A.J. Haulcy,SS,Indianapolis Colts,74,88,72
Alec Ingold,FB,Los Angeles Chargers,74,82,78
Andres Borregales,K,New England Patriots,74,75,46
Andrew Mukuba,FS,Philadelphia Eagles,74,91,64
Anthony Nelson,REDG,Tampa Bay Buccaneers,74,80,77
Anthony Hill Jr.,MIKE,Tennessee Titans,74,89,73
Asante Samuel,CB,Pittsburgh Steelers,74,91,54
Austin Ekeler,HB,Washington Commanders,74,89,80
Austin Hooper,TE,Atlanta Falcons,74,84,73
Ben Bredeson,LG,Tampa Bay Buccaneers,74,70,86
Ben Powers,LG,Denver Broncos,74,70,82
Blake Gillikin,P,Arizona Cardinals,74,72,49
Bobby Brown III,DT,Carolina Panthers,74,71,86
Brandin Cooks,WR,San Francisco 49ers,74,92,54
Brashard Smith,HB,Kansas City Chiefs,74,93,64
Braxton Jones,LT,Chicago Bears,74,73,88
Cade Mays,C,Detroit Lions,74,64,82
Cam Hart,CB,Los Angeles Chargers,74,91,59
Cam Lewis,SS,Chicago Bears,74,90,51
Cameron Thomas,REDG,Atlanta Falcons,74,78,77
Chigoziem Okonkwo,TE,Washington Commanders,74,88,67
Chimere Dike,WR,Tennessee Titans,74,94,65
Christian Izien,SS,Detroit Lions,74,92,52
Da'Shawn Hand,DT,Atlanta Falcons,74,76,88
Dameon Pierce,HB,Philadelphia Eagles,74,89,84
Dani Dennis-Sutton,REDG,Green Bay Packers,74,84,83
Daniel Whelan,P,Green Bay Packers,74,77,57
Darien Porter,CB,Las Vegas Raiders,74,96,61
Darrell Baker Jr,CB,Miami Dolphins,74,91,57
Davison Igbinosun,CB,Buffalo Bills,74,91,56
Demetrius Knight Jr,WILL,Cincinnati Bengals,74,86,72
Dennis Gardeck,SAM,Jacksonville Jaguars,74,86,81
Devin Duvernay,WR,Arizona Cardinals,74,93,68
Dorian Williams,WILL,Buffalo Bills,74,89,63
Drew Stevens,K,Washington Commanders,74,72,48
Elijah Ponder,REDG,New England Patriots,74,85,76
Emmanuel Pregnon,LG,Jacksonville Jaguars,74,65,89
Eric Murray,FS,Jacksonville Jaguars,74,86,63
Felix Anudike-Uzomah,REDG,Kansas City Chiefs,74,81,72
Folorunso Fatukasi,DT,Las Vegas Raiders,74,65,91
Geno Smith,QB,NY Jets,74,84,58
Ifeatu Melifonwu,SS,Tampa Bay Buccaneers,74,88,64
Isaac TeSlaa,WR,Detroit Lions,74,91,65
J.J. Jansen,LS,Carolina Panthers,74,63,70
Jacoby Brissett,QB,Arizona Cardinals,74,81,73
Jaishawn Barham,WILL,Dallas Cowboys,74,87,73
Jake Golday,WILL,Minnesota Vikings,74,88,76
Jalen McMillan,WR,Tampa Bay Buccaneers,74,90,60
Jaylin Noel,WR,Houston Texans,74,93,66
Jedrick Wills Jr,LT,Arizona Cardinals,74,72,92
Jermod McCoy,CB,Las Vegas Raiders,74,92,58
Ji'Ayir Brown,FS,San Francisco 49ers,74,86,64
Jordan Howden,FS,New Orleans Saints,74,89,58
Josaiah Stewart,LEDG,Los Angeles Rams,74,82,79
Jowon Briggs,DT,NY Jets,74,72,88
JT Tuimoloau,REDG,Indianapolis Colts,74,80,82
Justin Strnad,WILL,Denver Broncos,74,87,71
Kai Kroeger,P,Houston Texans,74,80,53
Kaleb Johnson,HB,Green Bay Packers,74,88,76
Kei'Trel Clark,CB,Arizona Cardinals,74,92,51
Keylan Rutledge,LG,Houston Texans,74,71,87
Kris Jenkins Jr,DT,Cincinnati Bengals,74,75,87
Laken Tomlinson,LG,Green Bay Packers,74,69,86
Landon Jackson,DT,Buffalo Bills,74,83,81
Lee Hunter,DT,Carolina Panthers,74,66,88
Levi Onwuzurike,DT,Detroit Lions,74,78,87
Logan Hall,DT,Houston Texans,74,78,85
Malcolm Rodriguez,SAM,Detroit Lions,74,86,80
Mason Taylor,TE,NY Jets,74,83,75
Max Melton,CB,Arizona Cardinals,74,93,60
Michael Carter II,SS,Philadelphia Eagles,74,91,55
Mike Hughes,CB,Atlanta Falcons,74,88,66
Montaric Brown,CB,Jacksonville Jaguars,74,87,57
Myles Murphy,LEDG,Cincinnati Bengals,74,88,82
Nathan Shepherd,DT,New Orleans Saints,74,72,90
Nehemiah Pritchett,CB,Seattle Seahawks,74,94,50
Noah Fant,TE,New Orleans Saints,74,87,72
P.J. Locke,FS,Dallas Cowboys,74,90,66
Robert Hainsey,C,Jacksonville Jaguars,74,63,87
Sam Martin,P,Carolina Panthers,74,75,46
Shemar Stewart,LEDG,Cincinnati Bengals,74,86,87
Tavius Robinson,LEDG,Baltimore Ravens,74,84,79
Terence Steele,RT,Dallas Cowboys,74,74,88
Tershawn Wharton,DT,Carolina Panthers,74,78,87
Tim Patrick,WR,NY Jets,74,87,69
Tress Way,P,Washington Commanders,74,72,44
Trevin Wallace,MIKE,NY Jets,74,89,70
Trevon Diggs,CB,Seattle Seahawks,74,91,69
Treylon Burks,WR,Washington Commanders,74,89,74
Tyler Steen,RG,Philadelphia Eagles,74,64,91
Tyler Davis,DT,Los Angeles Rams,74,72,89
Tyler Bass,K,Buffalo Bills,74,85,40
Will Shipley,HB,Philadelphia Eagles,74,91,68
Wyatt Teller,LG,Houston Texans,74,71,93
Xavier Legette,WR,Carolina Panthers,74,93,73
Zane Gonzalez,K,Miami Dolphins,74,71,45
Aaron Banks,LG,Green Bay Packers,73,60,87
Adam Butler,DT,Las Vegas Raiders,73,70,85
Aireontae Ersery,LT,Houston Texans,73,72,85
Albert Regis,DT,Jacksonville Jaguars,73,76,87
Ameer Abdullah,HB,Jacksonville Jaguars,73,88,68
Andrei Iosivas,WR,Cincinnati Bengals,73,92,67
Andrew Billings,DT,Arizona Cardinals,73,69,89
Ashtyn Davis,FS,San Francisco 49ers,73,92,60
Austin Jackson,RT,Miami Dolphins,73,71,84
Austin Booker,LEDG,Chicago Bears,73,79,76
Baron Browning,LEDG,Arizona Cardinals,73,86,75
Billy Bowman Jr,CB,Atlanta Falcons,73,92,61
Blake Grupe,K,Los Angeles Rams,73,76,28
Brett Thorson,P,Minnesota Vikings,73,74,51
C.J. Henderson,CB,Atlanta Falcons,73,91,64
Caden Curry,LEDG,Indianapolis Colts,73,76,83
Caleb Ransaw,FS,Jacksonville Jaguars,73,95,62
Cam Ward,QB,Tennessee Titans,73,82,66
Cameron Johnston,P,Pittsburgh Steelers,73,75,48
Chau Smith-Wade,CB,Carolina Panthers,73,88,57
Chauncey Golston,DT,NY Giants,73,78,81
Chris Paul,LG,Washington Commanders,73,75,82
Chris Rodriguez Jr,HB,Jacksonville Jaguars,73,89,74
Christian Mahogany,LG,Detroit Lions,73,68,89
Christian Rozeboom,WILL,Tampa Bay Buccaneers,73,81,67
CJ Allen,MIKE,Indianapolis Colts,73,88,75
Colby Parkinson,TE,Los Angeles Rams,73,85,73
Connor Heyward,FB,Las Vegas Raiders,73,85,68
Damar Hamlin,FS,Buffalo Bills,73,87,62
Darius Cooper,WR,Philadelphia Eagles,73,92,65
Dayo Odeyingbo,REDG,Chicago Bears,73,79,84
Derek Barnett,LEDG,Cleveland Browns,73,76,85
Devin White,WILL,Detroit Lions,73,87,76
Domonique Orange,DT,Minnesota Vikings,73,67,86
Dyami Brown,WR,Washington Commanders,73,92,63
Elijah Moore,WR,Philadelphia Eagles,73,91,59
Fernando Mendoza,QB,Las Vegas Raiders,73,84,70
Greg Dortch,WR,Buffalo Bills,73,90,43
Greg Gaines,DT,Buffalo Bills,73,70,87
Hezekiah Masses,CB,Las Vegas Raiders,73,90,58
Isaiah McGuire,REDG,Cleveland Browns,73,79,79
Isaiah Simmons,FS,Carolina Panthers,73,91,73
Jack Gibbens,MIKE,Arizona Cardinals,73,86,68
Jack Bech,WR,Las Vegas Raiders,73,89,67
Jadon Canady,SS,Kansas City Chiefs,73,90,63
Jake Slaughter,C,Los Angeles Chargers,73,69,86
Jakobe Thomas,SS,Minnesota Vikings,73,87,66
Jakorian Bennett,CB,Philadelphia Eagles,73,95,54
Jaleel McLaughlin,HB,Cleveland Browns,73,92,66
Jalen Tolbert,WR,Miami Dolphins,73,91,61
Javon Kinlaw,DT,Washington Commanders,73,72,86
Jaylen Wright,HB,Miami Dolphins,73,93,76
Jaylon Jones,CB,Tennessee Titans,73,89,62
Jeremy Reaves,FS,Washington Commanders,73,85,61
Joe Flacco,QB,Cincinnati Bengals,73,75,66
John Metchie III,WR,Carolina Panthers,73,90,66
Jonah Coleman,HB,Denver Broncos,73,87,80
Jonathan Bullard,DT,Dallas Cowboys,73,70,81
Jordan James,HB,San Francisco 49ers,73,89,72
Jordan Meredith,RG,NY Jets,73,67,83
Jordan Burch,REDG,Arizona Cardinals,73,83,81
Joseph Ossai,LEDG,NY Jets,73,83,80
Josh Conerly Jr,RT,Washington Commanders,73,71,82
Josh Oliver,TE,Minnesota Vikings,73,85,75
JuJu Brents,CB,Miami Dolphins,73,88,52
Justin Eboigbe,DT,Los Angeles Chargers,73,66,83
Kaelon Black,HB,San Francisco 49ers,73,91,79
Keion White,REDG,San Francisco 49ers,73,82,85
Keionte Scott,CB,Tampa Bay Buccaneers,73,95,55
Kelee Ringo,CB,Philadelphia Eagles,73,94,58
Khyiris Tonga,DT,Kansas City Chiefs,73,68,91
Kingsley Enagbare,REDG,NY Jets,73,80,83
Kris Abrams-Draine,CB,Denver Broncos,73,91,40
Kyle Williams,WR,New England Patriots,73,94,66
Malachi Fields,WR,NY Giants,73,87,73
Malik Harrison,MIKE,NY Giants,73,85,75
Malik Davis,HB,Dallas Cowboys,73,88,64
Malik Washington,WR,Miami Dolphins,73,90,59
Malik Muhammad II,CB,Chicago Bears,73,92,58
MarShawn Lloyd,HB,Green Bay Packers,73,90,73
Mike Washington Jr,HB,Las Vegas Raiders,73,94,73
Noah Gray,TE,Kansas City Chiefs,73,87,69
Olamide Zaccheaus,WR,Atlanta Falcons,73,90,54
Oluwafemi Oladejo,REDG,Tennessee Titans,73,85,81
Ozzy Trapilo,LT,Chicago Bears,73,65,87
Pat Bryant II,WR,Denver Broncos,73,89,69
Patrick Mekari,RG,Jacksonville Jaguars,73,71,85
Payton Turner,LEDG,Detroit Lions,73,79,82
Quincy Riley,CB,New Orleans Saints,73,90,64
Robbie Ouzts,FB,Seattle Seahawks,73,75,82
Ruke Orhorhoro,DT,Jacksonville Jaguars,73,76,90
Ryan Eckley,P,Baltimore Ravens,73,75,47
Sam Williams,LEDG,Cleveland Browns,73,88,79
Starling Thomas V,CB,Arizona Cardinals,73,93,56
Sydney Brown,SS,Atlanta Falcons,73,90,69
T.J. Sanders,DT,Buffalo Bills,73,74,88
Tez Johnson,WR,Tampa Bay Buccaneers,73,91,58
Tommy Tremble,TE,Carolina Panthers,73,86,75
Tre' Harris,WR,Los Angeles Chargers,73,88,68
Tyler Ott,LS,Washington Commanders,73,74,72
Tyler Onyedim,DT,Denver Broncos,73,70,86
Tyree Wilson,LEDG,New Orleans Saints,73,81,85
Ventrell Miller,WILL,Jacksonville Jaguars,73,83,74
Warren McClendon Jr,RT,Los Angeles Rams,73,69,88
Wesley Williams,REDG,Jacksonville Jaguars,73,76,80
Xavier Hutchinson,WR,Houston Texans,73,88,62
Zach Harrison,DT,Atlanta Falcons,73,83,81
Zachariah Branch,WR,Atlanta Falcons,73,95,64
Adetomiwa Adebawore,DT,Indianapolis Colts,72,87,84
Alex Wright,LEDG,Cleveland Browns,72,79,73
Alfred Collins,DT,San Francisco 49ers,72,73,92
Anthony Bradford,RG,Seattle Seahawks,72,70,92
Ashton Dulin,WR,Indianapolis Colts,72,92,61
Ashton Gillotte,REDG,Kansas City Chiefs,72,84,78
Avonte Maddox,FS,Detroit Lions,72,91,55
Ben Bartch,LG,Detroit Lions,72,67,85
Bo Melton,WR,Green Bay Packers,72,94,65
Brandon Cisse,CB,Green Bay Packers,72,92,59
Braxton Berrios,WR,NY Giants,72,90,55
Brenen Thompson,WR,Los Angeles Chargers,72,97,55
Bud Dupree,LEDG,Los Angeles Chargers,72,83,76
Caleb Douglas,WR,Miami Dolphins,72,93,68
Caleb Tiernan,RT,Minnesota Vikings,72,65,87
Chris Brazzell II,WR,Carolina Panthers,72,93,60
Chris McClellan,DT,Green Bay Packers,72,71,87
Cole Strange,RG,Los Angeles Chargers,72,71,87
Cole Van Lanen,RT,Jacksonville Jaguars,72,67,79
Dadrion Taylor-Demerson,FS,Arizona Cardinals,72,92,57
Dan Moore Jr,LT,Tennessee Titans,72,64,88
Daniel Faalele,LG,Jacksonville Jaguars,72,57,90
Darius Robinson,DT,Arizona Cardinals,72,74,87
Darius Alexander,DT,NY Giants,72,74,86
Darrell Jackson Jr,DT,NY Jets,72,67,88
Daylen Everette,CB,Pittsburgh Steelers,72,93,63
Dee Winters,WILL,Dallas Cowboys,72,89,66
Denzel Burke,CB,Arizona Cardinals,72,90,61
Dillon Radunz,LG,New Orleans Saints,72,69,84
DJ Glaze,RT,Las Vegas Raiders,72,65,88
Efton Chism III,WR,New England Patriots,72,86,66
Eli Stowers,TE,Philadelphia Eagles,72,89,73
Ennis Rakestraw Jr,CB,Detroit Lions,72,89,57
Evan Brown,C,Houston Texans,72,68,90
Febechi Nwaiwu,RG,Houston Texans,72,62,88
Foster Moreau,TE,Houston Texans,72,83,76
Genesis Smith,SS,Los Angeles Chargers,72,89,62
Gennings Dunker,LG,Pittsburgh Steelers,72,66,89
Gracen Halton,DT,San Francisco 49ers,72,78,84
Hunter Luepke,FB,Dallas Cowboys,72,86,69
Isaac Yiadom,CB,Washington Commanders,72,88,54
Isaac Guerendo,HB,San Francisco 49ers,72,92,71
J.J. McCarthy,QB,NY Giants,72,85,68
Ja'Kobi Lane,WR,Baltimore Ravens,72,90,62
Ja'Marcus Ingram,CB,Houston Texans,72,90,68
Jack Sawyer,LEDG,Pittsburgh Steelers,72,80,77
Jake Tonges,TE,San Francisco 49ers,72,86,73
Jalen Farmer,RG,Indianapolis Colts,72,75,87
Jamal Adams,WILL,Minnesota Vikings,72,87,77
Jaylon Moore,RT,Kansas City Chiefs,72,62,84
Jeremy McNichols,HB,Washington Commanders,72,87,72
Jonathan Jones,CB,Philadelphia Eagles,72,91,63
Jordan Whittington,WR,Los Angeles Rams,72,89,64
Jordan Morgan,LT,Green Bay Packers,72,71,87
Josh Myers,C,NY Jets,72,61,89
Joshua Josephs,LEDG,Washington Commanders,72,82,82
Kamari Ramsey,FS,Houston Texans,72,90,62
Kindle Vildor,CB,New England Patriots,72,88,56
Logan Jones,C,Chicago Bears,72,66,83
Luke McCaffrey,WR,Washington Commanders,72,90,55
Malik Willis,QB,Miami Dolphins,72,90,72
Marcus Mariota,QB,Washington Commanders,72,86,60
Mario Edwards Jr,DT,Houston Texans,72,74,88
Markel Bell,RT,Philadelphia Eagles,72,64,87
Markquese Bell,SS,Dallas Cowboys,72,91,68
Matt Pryor,RG,New England Patriots,72,59,86
Mike Hall Jr,DT,Cleveland Browns,72,81,79
Mike Ford Jr,CB,Atlanta Falcons,72,89,58
Ogbo Okoronkwo,LEDG,San Francisco 49ers,72,81,83
Patrick Jones II,REDG,Carolina Panthers,72,76,78
Princely Umanmielen,REDG,Carolina Panthers,72,82,79
Roschon Johnson,HB,Chicago Bears,72,86,78
Ross Matiscik,LS,Jacksonville Jaguars,72,70,73
Roy Robertson-Harris,DT,NY Giants,72,76,82
Roy Lopez,DT,Arizona Cardinals,72,66,90
Shavon Revel Jr,CB,Dallas Cowboys,72,93,66
Shemar Turner,REDG,Chicago Bears,72,80,88
SirVocea Dennis,MIKE,Tampa Bay Buccaneers,72,85,66
Skyy Moore,WR,Green Bay Packers,72,88,69
Solomon Thomas,DT,Tennessee Titans,72,82,87
Ted Hurst III,WR,Tampa Bay Buccaneers,72,92,65
Thomas Hennessy,LS,NY Jets,72,73,67
Tim Settle Jr,DT,Washington Commanders,72,69,88
Trey Zuhn III,RT,Las Vegas Raiders,72,72,89
Trey Moore,LEDG,Miami Dolphins,72,87,79
Ty Robinson,DT,Philadelphia Eagles,72,78,89
Ty Chandler,HB,New Orleans Saints,72,92,65
Tyler Conklin,TE,Detroit Lions,72,83,66
Willie Gay Jr,SAM,Miami Dolphins,72,86,73
Zavion Thomas,WR,Chicago Bears,72,96,63
Adam Trautman,TE,Denver Broncos,71,81,74
Akayleb Evans,CB,Carolina Panthers,71,90,65
Andrew Vorhees,LG,Baltimore Ravens,71,65,97
Bam Knight,HB,Arizona Cardinals,71,88,69
Beaux Limmer,RG,Los Angeles Rams,71,65,85
Blake Brandel,C,Minnesota Vikings,71,68,87
Brandon Coleman,LT,Washington Commanders,71,73,85
Broderick Jones,LT,Dallas Cowboys,71,73,86
Broderick Washington Jr,DT,Baltimore Ravens,71,70,83
Chandler Rivers,CB,Baltimore Ravens,71,92,57
Chris Bell,WR,Miami Dolphins,71,90,74
Chris Manhertz,TE,NY Giants,71,78,77
Christian Haynes,LG,Seattle Seahawks,71,71,87
D'Marco Jackson,WILL,Chicago Bears,71,87,69
Damone Clark,MIKE,Detroit Lions,71,89,67
Danny Stutsman,MIKE,New Orleans Saints,71,87,74
Dante Stills,DT,Arizona Cardinals,71,76,80
Darrick Forrest,FS,San Francisco 49ers,71,90,67
David Walker,REDG,Tampa Bay Buccaneers,71,83,78
David Moore,WR,Carolina Panthers,71,87,74
DeAndre Carter,WR,Detroit Lions,71,88,60
Del'Shawn Phillips,SAM,Los Angeles Chargers,71,87,72
Devin Moore,CB,Dallas Cowboys,71,90,58
Devontez Walker,WR,Baltimore Ravens,71,94,63
Dylan Fairchild,LG,Cincinnati Bengals,71,71,86
Elijah Sarratt,WR,Baltimore Ravens,71,89,62
Elijah Arroyo,TE,Seattle Seahawks,71,87,77
Elijah Wilkinson,RT,Arizona Cardinals,71,69,85
Emery Jones Jr,RG,Baltimore Ravens,71,70,88
Emmett Johnson,HB,Kansas City Chiefs,71,89,74
Fabian Moreau,CB,Washington Commanders,71,90,65
Gunnar Helm,TE,Tennessee Titans,71,78,74
Isaiah Pola-Mao,FS,Las Vegas Raiders,71,91,57
Ja'Sir Taylor,CB,Cincinnati Bengals,71,92,53
Jack Sanborn,MIKE,Chicago Bears,71,80,72
Jacob Cowing,WR,San Francisco 49ers,71,93,52
Jake Andrews,C,Houston Texans,71,67,87
Jalen Royals,WR,Kansas City Chiefs,71,92,64
Jamaree Caldwell,DT,Los Angeles Chargers,71,67,87
Jameis Winston,QB,NY Giants,71,76,72
James Houston IV,LEDG,Dallas Cowboys,71,83,72
Jared Wilson,C,New England Patriots,71,78,86
Jay Ward,SS,Minnesota Vikings,71,87,58
Jeremiah Wright,RG,New Orleans Saints,71,61,87
Jerry Tillery,DT,Indianapolis Colts,71,74,85
Jonathan Mingo,WR,Dallas Cowboys,71,90,71
Jonathan Owens,FS,Indianapolis Colts,71,90,66
Jordan Phillips,DT,Miami Dolphins,71,72,89
Josh Jones,LT,Seattle Seahawks,71,66,85
Josh Newton,CB,Cincinnati Bengals,71,89,61
Joshua Farmer,DT,New England Patriots,71,69,88
Juice Scruggs,C,Detroit Lions,71,65,87
Julian Neal,CB,Seattle Seahawks,71,89,64
K'Von Wallace,FS,Baltimore Ravens,71,86,64
Kage Casey,LG,Denver Broncos,71,66,86
Kaleb Elarms-Orr,WILL,Buffalo Bills,71,90,71
Kaleb Proctor,DT,Arizona Cardinals,71,79,83
Kaytron Allen,HB,Miami Dolphins,71,89,79
Keagen Trost,RT,Los Angeles Rams,71,66,86
Khristian Boyd,DT,New Orleans Saints,71,63,88
Konata Mumpfield,WR,Los Angeles Rams,71,86,63
Kyle Louis,SS,Miami Dolphins,71,88,68
LeQuint Allen Jr,HB,Jacksonville Jaguars,71,89,72
LT Overton,DT,Dallas Cowboys,71,77,87
Luke Fortner,C,Carolina Panthers,71,65,87
Maason Smith,DT,Atlanta Falcons,71,72,83
Mac McWilliams,CB,Philadelphia Eagles,71,92,59
Malachi Moore,FS,NY Jets,71,87,61
Marcus Harris,CB,Tennessee Titans,71,93,59
Max Bredeson,FB,Minnesota Vikings,71,78,79
Michael Carter,HB,Tennessee Titans,71,86,66
Michael Taaffe,FS,Miami Dolphins,71,89,61
Micheal Clemons,LEDG,Indianapolis Colts,71,77,80
Mo Alie-Cox,TE,Indianapolis Colts,71,82,70
Neville Gallimore,DT,Chicago Bears,71,79,80
Nick Allegretti,C,Washington Commanders,71,67,83
Nick Martin,WILL,San Francisco 49ers,71,88,74
Noah Igbinoghene,CB,Cleveland Browns,71,90,61
Omarr Norman-Lott,DT,Kansas City Chiefs,71,67,85
Que Robinson,LEDG,Denver Broncos,71,84,73
Reid Ferguson,LS,Buffalo Bills,71,72,65
Rock Ya-Sin,CB,Detroit Lions,71,89,68
Rodney Thomas II,FS,Seattle Seahawks,71,88,61
Roman Wilson,WR,Pittsburgh Steelers,71,93,56
Ronnie Harrison Jr,WILL,Miami Dolphins,71,85,72
Sean Tucker,HB,Tampa Bay Buccaneers,71,92,76
Shy Tuttle,DT,Washington Commanders,71,74,82
Skyler Bell,WR,Buffalo Bills,71,92,67
Tacario Davis,CB,Cincinnati Bengals,71,92,58
Tahj Brooks,HB,Cincinnati Bengals,71,88,68
Tai Felton,WR,Minnesota Vikings,71,93,59
Tanoh Kpassagnon,REDG,Tennessee Titans,71,79,82
Terrell Burgess,FS,Tennessee Titans,71,88,62
Tre Brown,CB,NY Jets,71,90,55
Trevis Gipson Sr,LEDG,Carolina Panthers,71,82,79
Trevor Penning,LG,Los Angeles Chargers,71,75,89
Trevor Etienne,HB,Carolina Panthers,71,92,69
Troy Dye,WILL,Los Angeles Chargers,71,86,71
Tua Tagovailoa,QB,Atlanta Falcons,71,82,61
Ty Simpson,QB,Los Angeles Rams,71,79,62
Tylan Wallace,WR,Cleveland Browns,71,90,64
Will Lee III,CB,Carolina Panthers,71,88,62
Wyatt Milum,RG,Jacksonville Jaguars,71,63,87
Zakee Wheatley,FS,Carolina Panthers,71,87,64
Alec Anderson,LG,Buffalo Bills,70,60,86
Alex Palczewski,RG,Denver Broncos,70,63,82
Andy Dalton,QB,Atlanta Falcons,70,73,54
Anthony Belton,RT,Green Bay Packers,70,64,86
Audric Estime,HB,Cleveland Browns,70,87,75
Barion Brown,WR,New Orleans Saints,70,92,56
Barryn Sorrell,REDG,Green Bay Packers,70,83,82
Beau Stephens,RG,Seattle Seahawks,70,61,87
Ben Skowronek,WR,Pittsburgh Steelers,70,85,68
Blake Fisher,LT,Houston Texans,70,66,83
Brennan Jackson,LEDG,Las Vegas Raiders,70,83,80
Bryce Boettcher,WILL,Indianapolis Colts,70,87,74
Bryce Lance,WR,New Orleans Saints,70,94,69
Caleb Rogers,RG,Las Vegas Raiders,70,69,86
Cam Jackson,DT,Carolina Panthers,70,67,87
Casey Kreiter,LS,Arizona Cardinals,70,71,67
Cedric Johnson,LEDG,Cincinnati Bengals,70,85,79
Charles Grant,LT,Las Vegas Raiders,70,75,85
Charlie Jones,WR,NY Giants,70,90,56
Cody Simon,WILL,Arizona Cardinals,70,87,73
Colbie Young,WR,Cincinnati Bengals,70,89,67
Collin Oliver,REDG,Green Bay Packers,70,87,77
Cyrus Allen,WR,Kansas City Chiefs,70,89,57
Damarri Mathis,CB,Cleveland Browns,70,92,61
Daniel Bellinger,TE,Tennessee Titans,70,84,79
Demond Claiborne,HB,Minnesota Vikings,70,93,73
Demonte Capehart,DT,Tampa Bay Buccaneers,70,77,89
Derius Davis,WR,Los Angeles Chargers,70,94,63
Deshaun Watson,QB,Cleveland Browns,70,85,69
DeWayne Carter,DT,Buffalo Bills,70,73,82
DJ Giddens,HB,Indianapolis Colts,70,91,70
Dondrea Tillman,REDG,Denver Broncos,70,73,77
Durham Smythe,TE,Baltimore Ravens,70,80,75
Elijah Roberts,DT,Tampa Bay Buccaneers,70,80,83
Ephesians Prysock,CB,San Francisco 49ers,70,91,63
Ethan Pocic,C,Baltimore Ravens,70,70,88
Fernando Carmona Jr,RG,Tennessee Titans,70,65,86
Gardner Minshew II,QB,Arizona Cardinals,70,80,62
George Gumbs Jr,REDG,Indianapolis Colts,70,84,75
Greg Dulcich,TE,Miami Dolphins,70,84,67
Isaiah Davis,HB,NY Jets,70,87,73
Jaden Crumedy,DT,Houston Texans,70,73,84
Jalen Huskey,FS,Jacksonville Jaguars,70,87,57
Jalen Travis,RT,Indianapolis Colts,70,68,88
Jarrett Patterson,C,San Francisco 49ers,70,61,83
Jaylin Smith,CB,Houston Texans,70,91,54
Joe Milton,QB,Philadelphia Eagles,70,86,64
Jon Gaines II,RG,Arizona Cardinals,70,72,77
Jordan Hancock,SS,Buffalo Bills,70,91,60
Jovaughn Gwyn,C,Baltimore Ravens,70,68,89
Justin Fields,QB,Kansas City Chiefs,70,90,65
Justin Walley,CB,Indianapolis Colts,70,92,55
Karl Brooks,DT,Green Bay Packers,70,70,84
KeAndre Lambert-Smith,WR,Los Angeles Chargers,70,93,60
Kendrick Law,WR,Detroit Lions,70,91,66
Kentavius Street,DT,Chicago Bears,70,76,89
Kevin Coleman Jr,WR,Miami Dolphins,70,89,59
LaJohntay Wester,WR,Baltimore Ravens,70,90,62
Larry Borom,RT,Detroit Lions,70,66,83
Lathan Ransom,SS,Carolina Panthers,70,86,66
Logan Lee,DT,Pittsburgh Steelers,70,71,83
Lucas Patrick,C,Washington Commanders,70,69,84
Luke Musgrave,TE,Green Bay Packers,70,89,75
M.J. Stewart Jr,SS,Houston Texans,70,87,66
Mason Tipton,WR,New Orleans Saints,70,94,59
Max Klare,TE,Los Angeles Rams,70,84,74
Mekhi Wingo,DT,Detroit Lions,70,77,79
Myles Harden,CB,Cleveland Browns,70,89,59
Nick McCloud,CB,Chicago Bears,70,89,58
Nick Moore,LS,Baltimore Ravens,70,70,70
Nick Barrett,DT,Los Angeles Chargers,70,69,89
Noah Sewell,SAM,Chicago Bears,70,82,80
Percy Butler,FS,Washington Commanders,70,91,57
R.J. Mickens,FS,Los Angeles Chargers,70,89,63
Sai'vion Jones,DT,Denver Broncos,70,81,80
Savion Williams,WR,Green Bay Packers,70,90,71
Sean Rhyan,C,Green Bay Packers,70,63,84
Spencer Burford,LG,Las Vegas Raiders,70,65,86
T.J. Bass,LG,Dallas Cowboys,70,56,85
T.J. Tampa Jr,CB,Baltimore Ravens,70,88,60
T.J. Slaton Jr,DT,Cincinnati Bengals,70,68,87
Tatum Bethune,MIKE,San Francisco 49ers,70,81,67
Terrance Ferguson,TE,Los Angeles Rams,70,85,73
Theo Jackson,FS,Minnesota Vikings,70,90,58
Thomas Harper,FS,Detroit Lions,70,89,60
Travis Burke,RT,Los Angeles Chargers,70,67,86
Ty Hamilton,DT,Los Angeles Rams,70,75,89
Tyler Goodson,HB,Dallas Cowboys,70,91,57
Vernon Broughton,DT,New Orleans Saints,70,72,86
Zach Durfee,LEDG,Jacksonville Jaguars,70,86,77
Zak Zinter,LG,Cleveland Browns,70,63,88
Aaron Stinnie,LG,NY Giants,69,69,83
Adin Huntington,DT,Cleveland Browns,69,82,81
Anthony Gould,WR,Indianapolis Colts,69,94,47
Barrett Carter,MIKE,Cincinnati Bengals,69,85,72
Ben Sinnott,TE,Washington Commanders,69,83,70
Bilhal Kone,CB,Baltimore Ravens,69,91,58
Billy Schrauth,LG,Tampa Bay Buccaneers,69,64,87
Bo Richter,REDG,Minnesota Vikings,69,87,72
Brock Hoffman,RG,Pittsburgh Steelers,69,60,81
Byron Young,DT,Philadelphia Eagles,69,71,82
Charles Demmings,CB,Minnesota Vikings,69,92,59
Charles Snowden,LEDG,Atlanta Falcons,69,82,69
Chris Rumph II,REDG,New Orleans Saints,69,80,74
Christian Harris,MIKE,Atlanta Falcons,69,89,69
CJ West,DT,San Francisco 49ers,69,74,84
Colby Wooden,DT,New Orleans Saints,69,79,78
Connor Lew,C,Cincinnati Bengals,69,68,87
Darius Muasau,MIKE,New England Patriots,69,82,63
Darrell Luter Jr,CB,Las Vegas Raiders,69,90,50
David Sills V,WR,Tampa Bay Buccaneers,69,90,60
David Quessenberry,LT,Los Angeles Rams,69,67,85
Decamerion Richardson,CB,New Orleans Saints,69,94,52
Deion Burks,WR,Indianapolis Colts,69,95,64
Dell Pettus,SS,New England Patriots,69,89,64
DeMarcco Hellams,FS,Atlanta Falcons,69,87,70
Dominique Robinson,LEDG,Houston Texans,69,79,79
Drew Allar,QB,Pittsburgh Steelers,69,80,67
Eli Heidenreich,HB,Pittsburgh Steelers,69,91,69
Elijah Higgins,TE,Arizona Cardinals,69,89,69
Eyioma Uwazurike,DT,Denver Broncos,69,61,83
George Holani,HB,Seattle Seahawks,69,89,71
Grant Calcaterra,TE,Philadelphia Eagles,69,84,72
Ian Thomas,TE,Las Vegas Raiders,69,82,68
Isaiah Bond,WR,Cleveland Browns,69,93,60
Isaiah Adams,RG,Arizona Cardinals,69,65,86
Ja'Tavion Sanders,TE,Carolina Panthers,69,83,67
Jaden Dugger,SAM,San Francisco 49ers,69,86,71
Jahdae Walker,WR,Chicago Bears,69,91,60
Jake Bobo,WR,Seattle Seahawks,69,85,62
Jalen Brooks,WR,Arizona Cardinals,69,86,61
Jalen Sundell,C,Seattle Seahawks,69,66,84
James Lynch,DT,Chicago Bears,69,71,82
Jared Wiley,TE,Kansas City Chiefs,69,85,75
Jason Marshall Jr,CB,Miami Dolphins,69,89,60
Javon Solomon,REDG,Buffalo Bills,69,82,77
Jaylen McCollough,SS,Los Angeles Rams,69,85,63
Jaylen Reed,FS,New England Patriots,69,89,67
Jaylon Jones,CB,Jacksonville Jaguars,69,91,63
Jaylon Carlies,WILL,Indianapolis Colts,69,89,72
JD Bertrand,SAM,Atlanta Falcons,69,83,70
Jimmy Rolder,MIKE,Detroit Lions,69,86,69
Joe Andreessen,MIKE,Buffalo Bills,69,84,77
Jon Weeks,LS,San Francisco 49ers,69,69,69
Jonah Laulu,DT,Las Vegas Raiders,69,74,84
Jordan Watkins,WR,San Francisco 49ers,69,93,66
Josh Wallace,CB,Los Angeles Rams,69,86,60
Josh Hayes,CB,Tampa Bay Buccaneers,69,91,58
Josh Whyle,TE,Green Bay Packers,69,83,71
Jude Bowry,LT,Buffalo Bills,69,70,84
Kendal Daniels,WILL,Atlanta Falcons,69,86,70
Kylen Granson,TE,Tennessee Titans,69,84,69
Levi Drake Rodriguez,DT,Minnesota Vikings,69,72,84
Lil'Jordan Humphrey,WR,Denver Broncos,69,87,67
Luke Schoonmaker,TE,Dallas Cowboys,69,85,72
Malachi Corley,WR,Cleveland Browns,69,88,66
Malik Benson,WR,Las Vegas Raiders,69,93,58
Marist Liufau,LEDG,Dallas Cowboys,69,84,73
Miles Frazier,RG,Detroit Lions,69,64,89
Mitchell Evans,TE,Carolina Panthers,69,81,73
Mitchell Tinsley,WR,Cincinnati Bengals,69,86,60
Nick Singleton,HB,Tennessee Titans,69,93,78
Oren Burks,WILL,Cincinnati Bengals,69,87,72
Otito Ogbonnia,DT,Dallas Cowboys,69,61,86
Pharaoh Brown,TE,Indianapolis Colts,69,79,75
Raheim Sanders,HB,Cleveland Browns,69,90,72
Rakeem Nunez-Roches Sr,DT,Tampa Bay Buccaneers,69,72,81
Rasheen Ali,HB,Baltimore Ravens,69,92,74
Reggie Virgil,WR,Arizona Cardinals,69,89,59
Robert Longerbeam,CB,Atlanta Falcons,69,93,57
Rylie Mills,DT,Seattle Seahawks,69,73,84
Sam Mustipher,C,Jacksonville Jaguars,69,61,83
Shaun Dolac,MIKE,Los Angeles Rams,69,85,73
Shedeur Sanders,QB,Cleveland Browns,69,78,65
Shemar James,MIKE,Dallas Cowboys,69,83,73
Smael Mondon Jr,WILL,Philadelphia Eagles,69,86,70
Spencer Rattler,QB,New Orleans Saints,69,83,56
Terell Smith,CB,Pittsburgh Steelers,69,92,63
Theo Benedet,RT,Chicago Bears,69,68,83
Tommy Eichenberg,MIKE,Las Vegas Raiders,69,78,75
Trey Pipkins III,LT,Los Angeles Chargers,69,69,83
Tyler Badie,HB,Denver Broncos,69,89,74
Tyler Huntley,QB,Baltimore Ravens,69,85,53
Tyler Baron,REDG,NY Jets,69,85,76
Tyrion Ingram-Dawkins,LEDG,Minnesota Vikings,69,77,83
Tyrod Taylor,QB,Green Bay Packers,69,85,57
Zane Durant,DT,Buffalo Bills,69,79,87
Aaron Hall,DT,Carolina Panthers,68,71,81
Adam Prentice,FB,Denver Broncos,68,77,76
Ahmed Hassanein,REDG,Detroit Lions,68,80,83
Ajani Cornelius,RG,Dallas Cowboys,68,64,86
Alex Harkey,RG,Los Angeles Chargers,68,66,84
Andrew Beck,FB,NY Jets,68,85,77
Anez Cooper,RG,NY Jets,68,55,85
Anthony Richardson Sr,QB,Indianapolis Colts,68,90,73
Arian Smith,WR,NY Jets,68,94,64
Austin Schlottmann,C,Tennessee Titans,68,69,86
Brevin Jordan,TE,Houston Texans,68,86,73
Brian Parker II,LG,Cincinnati Bengals,68,68,89
British Brooks,FB,Houston Texans,68,86,78
Brycen Tremayne,WR,Carolina Panthers,68,87,68
Caedan Wallace,RT,Miami Dolphins,68,67,87
Camden Brown,WR,Dallas Cowboys,68,88,63
Carson Beck,QB,Arizona Cardinals,68,79,62
Carson Wentz,QB,Minnesota Vikings,68,82,72
Charlie Kolar,TE,Los Angeles Chargers,68,84,68
Chris Brooks,HB,Green Bay Packers,68,89,71
CJ Daniels,WR,Los Angeles Rams,68,87,61
Cody White,WR,Las Vegas Raiders,68,83,69
Connor Colby,LG,San Francisco 49ers,68,69,83
Cory Durden,DT,New England Patriots,68,65,79
Dalton Johnson,SS,Las Vegas Raiders,68,90,56
Dan Feeney,C,Tampa Bay Buccaneers,68,66,88
Dante Trader Jr,SS,Miami Dolphins,68,84,62
Dare Ogunbowale,HB,Houston Texans,68,87,71
David Long Jr,CB,New Orleans Saints,68,89,61
Dawand Jones,LT,Cleveland Browns,68,61,95
Dohnte Meyers,WR,Cincinnati Bengals,68,88,59
Dont'e Thornton Jr,WR,Las Vegas Raiders,68,96,70
Donte Kent,CB,Pittsburgh Steelers,68,93,56
Drew Shelton,RT,Dallas Cowboys,68,67,83
Drew Lock,QB,Seattle Seahawks,68,82,68
Drew Sample,TE,Cincinnati Bengals,68,81,73
Dylan Laube,HB,Las Vegas Raiders,68,88,67
Emari Demercado,HB,Dallas Cowboys,68,91,65
Enrique Cruz Jr,LT,San Francisco 49ers,68,74,85
Erick All Jr,TE,Cincinnati Bengals,68,86,72
J. Michael Sturdivant,WR,Green Bay Packers,68,92,61
Jackie Marshall,DT,Tennessee Titans,68,76,87
Jackson Hawes,TE,Buffalo Bills,68,78,72
Jackson Slater,RG,Tennessee Titans,68,72,89
Jarrett Kingston,LG,Miami Dolphins,68,72,90
Jaylin Simpson,CB,Miami Dolphins,68,90,53
Jeremiah Trotter Jr,SAM,Philadelphia Eagles,68,78,69
Jeremy Ruckert,TE,NY Jets,68,81,78
Johnny Mundt,TE,Philadelphia Eagles,68,83,74
Jonah Savaiinaea,RG,Miami Dolphins,68,74,84
Jordan van den Berg,DT,Chicago Bears,68,74,89
Jordan Magee,WILL,Washington Commanders,68,87,64
Jordon Riley,DT,Green Bay Packers,68,63,88
Josh Cameron,WR,Jacksonville Jaguars,68,88,75
Joshua Dobbs,QB,Detroit Lions,68,87,74
Julius Chestnut,HB,Tennessee Titans,68,88,76
Justin Joly,TE,Miami Dolphins,68,83,73
Kaden Wetjen,WR,Pittsburgh Steelers,68,90,58
Karon Prunty,CB,New England Patriots,68,91,59
Keith Abney II,CB,Detroit Lions,68,91,57
Korie Black,CB,NY Giants,68,94,58
L.J. Collier,DT,Arizona Cardinals,68,77,83
LaCale London,DT,Atlanta Falcons,68,71,83
Laquon Treadwell,WR,Indianapolis Colts,68,84,70
Matt Henningsen,DT,Denver Broncos,68,72,82
Micah Morris,RG,Philadelphia Eagles,68,69,89
Mike Morris,DT,Seattle Seahawks,68,74,82
Mitchell Fraboni,LS,Denver Broncos,68,79,75
Pierre Strong Jr,HB,Green Bay Packers,68,92,66
Qwan'tez Stiggers,CB,NY Jets,68,91,60
Russ Yeast,FS,Cincinnati Bengals,68,86,62
Sam Okuayinonu,LEDG,San Francisco 49ers,68,79,83
Sam Franklin Jr,FS,Buffalo Bills,68,85,66
Sam Hecht,C,Carolina Panthers,68,69,81
Scott Matlock,DT,Los Angeles Chargers,68,74,85
Sione Vaki,HB,Detroit Lions,68,89,74
Tanner Hudson,TE,Cincinnati Bengals,68,82,70
Tom Kennedy,WR,Detroit Lions,68,86,64
Tonka Hemingway,DT,Las Vegas Raiders,68,72,81
Travis Homer,HB,Pittsburgh Steelers,68,90,62
Tremon Smith,CB,Houston Texans,68,91,58
Velus Jones Jr,HB,Seattle Seahawks,68,94,64
Wade Woodaz,MIKE,Houston Texans,68,88,73
Yahya Black,DT,Pittsburgh Steelers,68,60,87
Aeneas Peebles,DT,Baltimore Ravens,67,73,81
Aidan O'Connell,QB,Las Vegas Raiders,67,75,55
Alex Forsyth,C,Denver Broncos,67,66,86
Anterio Thompson,DT,Atlanta Falcons,67,78,88
Beaux Collins,WR,Atlanta Falcons,67,88,73
Ben VanSumeren,FB,Kansas City Chiefs,67,87,75
Braiden McGregor,LEDG,NY Jets,67,80,73
Brenton Cox,LEDG,Green Bay Packers,67,78,81
Brevyn Spann-Ford,TE,Dallas Cowboys,67,80,72
Cade Klubnik,QB,NY Jets,67,83,64
Cade Stover,TE,Houston Texans,67,84,74
Carson Vinson,LT,Baltimore Ravens,67,68,81
Carver Willis,LG,San Francisco 49ers,67,69,83
Chris Roland-Wallace,FS,Kansas City Chiefs,67,86,64
Chris Blair,WR,Atlanta Falcons,67,88,62
Chukwuebuka Godrick,LT,Miami Dolphins,67,68,85
Chukwuma Okorafor,RT,NY Jets,67,67,85
Cole Payton,QB,Philadelphia Eagles,67,87,68
Corey Kiner,HB,New England Patriots,67,88,73
Dametrious Crownover,LT,New England Patriots,67,68,85
Daniel Hardy,REDG,Chicago Bears,67,82,71
Davis Allen,TE,Los Angeles Rams,67,82,69
Deane Leonard,CB,Los Angeles Chargers,67,92,60
DeeJay Dallas,HB,Minnesota Vikings,67,87,75
DJ Campbell,RG,Miami Dolphins,67,72,78
DJ Ivey,CB,Cincinnati Bengals,67,90,54
Dylan Horton,LEDG,Houston Texans,67,81,73
Elijah Hicks,SS,Chicago Bears,67,87,58
Elijah Simmons,DT,Tampa Bay Buccaneers,67,63,89
Eric Saubert,TE,Seattle Seahawks,67,82,75
Gabe Rubio,DT,Pittsburgh Steelers,67,64,86
Giovanni Manu,LT,Detroit Lions,67,70,86
Harold Perkins Jr,WILL,Atlanta Falcons,67,88,68
Isaiah Williams,WR,NY Jets,67,87,59
J.C. Davis,LT,NY Giants,67,67,84
Jack Kelly,WILL,NY Giants,67,87,69
Jack Kiser,MIKE,Cincinnati Bengals,67,83,70
Jager Burton,C,Green Bay Packers,67,72,86
Jalen Rivers,LG,Cincinnati Bengals,67,63,83
Jalon Kilgore,SS,Buffalo Bills,67,91,64
Jamree Kromah,LEDG,Chicago Bears,67,79,82
Jared Wayne,WR,Miami Dolphins,67,89,64
Javon Foster,LT,Cincinnati Bengals,67,62,83
Jaylan Ford,MIKE,New Orleans Saints,67,82,73
Jeffrey Bassa,WILL,Kansas City Chiefs,67,85,69
Jelani Woods,TE,NY Jets,67,85,78
JJ Pegues,DT,Las Vegas Raiders,67,67,84
John Michael Schmitz Jr,C,NY Giants,67,61,84
Justin Jefferson,MIKE,Cleveland Browns,67,87,69
Justin Skule,RT,Tampa Bay Buccaneers,67,64,85
Justin Dedich,RG,Los Angeles Rams,67,60,89
Kahlil Benson,LT,Kansas City Chiefs,67,70,83
Kalia Davis,DT,Cleveland Browns,67,69,84
Kamal Hadden,CB,Green Bay Packers,67,87,65
Kene Nwangwu,HB,NY Jets,67,92,68
Keyshaun Elliott,WILL,Chicago Bears,67,86,73
Khalid Kareem,REDG,San Francisco 49ers,67,78,84
Kitan Oladapo,SS,Green Bay Packers,67,86,68
Larrell Murchison,DT,Los Angeles Rams,67,70,87
Logan Taylor,LT,Los Angeles Chargers,67,66,88
Malik McClain,WR,NY Jets,67,90,65
Marcus Mbow,RT,NY Giants,67,71,84
Mason Rudolph,QB,Pittsburgh Steelers,67,73,66
Matt Peart,LT,Denver Broncos,67,68,86
Matt Hennessy,C,Dallas Cowboys,67,65,85
Micah Robinson,CB,Tennessee Titans,67,92,58
Miles Killebrew,SS,Tampa Bay Buccaneers,67,86,76
Namdi Obiazor,WILL,New England Patriots,67,88,71
Nate Boerkircher,TE,Jacksonville Jaguars,67,80,78
Nikko Remigio,WR,Kansas City Chiefs,67,87,63
Oscar Delp,TE,New Orleans Saints,67,88,75
Parker Brailsford,C,Cleveland Browns,67,72,83
Quintayvious Hutchins,REDG,New England Patriots,67,81,74
Riley Leonard,QB,Indianapolis Colts,67,86,70
Robert Tonyan,TE,Pittsburgh Steelers,67,85,74
Robert Henry Jr.,HB,Seattle Seahawks,67,88,69
Simi Fehoko,WR,Arizona Cardinals,67,90,66
Skyler Thomas,FS,Chicago Bears,67,89,64
Spencer Anderson,RG,Pittsburgh Steelers,67,67,88
Tanner McKee,QB,Philadelphia Eagles,67,77,61
Tay Martin,WR,Detroit Lions,67,89,62
Tim Smith,DT,Indianapolis Colts,67,68,83
Tony Fields II,MIKE,Chicago Bears,67,85,64
Toriano Pride Jr,CB,Cleveland Browns,67,93,55
Tyler Owens,SS,Washington Commanders,67,93,63
Winston Reid,WILL,Cleveland Browns,67,85,77
Zach Wilson,QB,New Orleans Saints,67,83,61
Ali Gaye,REDG,Houston Texans,66,82,73
Ar'maj Reed-Adams,RG,Buffalo Bills,66,63,85
Bobby Jamison-Travis,DT,NY Giants,66,64,83
Brenden Schooler,SS,New England Patriots,66,92,64
Bryan Hudson,C,NY Giants,66,62,84
Bryce Cabeldue,LG,Las Vegas Raiders,66,74,90
C.J. Williams,WR,Jacksonville Jaguars,66,88,65
Cameron Williams,RT,Atlanta Falcons,66,66,88
Channing Canada,CB,New England Patriots,66,91,61
Charles Woods,CB,New England Patriots,66,86,55
Charlie Woerner,TE,Atlanta Falcons,66,82,77
Dallis Flowers,CB,Chicago Bears,66,91,51
Daniel Thomas,SS,Cleveland Browns,66,87,65
Danny Pinter,C,Baltimore Ravens,66,73,82
Dareke Young,WR,Las Vegas Raiders,66,90,71
Davis Mills,QB,Houston Texans,66,81,56
Dean Connors,HB,Los Angeles Rams,66,91,71
Dillon Gabriel,QB,Cleveland Browns,66,83,58
DJ Herman,FB,Miami Dolphins,66,75,78
Drew Kendall,LG,Philadelphia Eagles,66,71,81
Drew Ogletree,TE,Indianapolis Colts,66,81,74
Ethan Onianwa,RT,Atlanta Falcons,66,65,84
Gunner Olszewski,WR,NY Giants,66,87,56
Hunter Long,TE,Arizona Cardinals,66,81,72
Hunter Nourzad,C,Kansas City Chiefs,66,67,83
Jack Endries,TE,Cincinnati Bengals,66,84,72
Jacob Saylors,HB,Detroit Lions,66,88,73
Jacob Monk,RG,Green Bay Packers,66,69,83
Jalen Milroe,QB,Seattle Seahawks,66,93,69
Jalen Davis,CB,Cincinnati Bengals,66,88,53
James Williams Sr,WILL,Tennessee Titans,66,84,71
James Thompson Jr,DT,San Francisco 49ers,66,72,87
Javontae Jean-Baptiste,REDG,Washington Commanders,66,84,77
Jayden Loving,DT,Chicago Bears,66,70,85
Jaylen Harrell,LEDG,Tennessee Titans,66,83,75
JL Skinner,SS,Denver Broncos,66,89,59
Joe Royer,TE,Cleveland Browns,66,84,75
John Ridgeway III,DT,New Orleans Saints,66,62,86
John Bates,TE,Washington Commanders,66,77,75
Jordan McFadden,LG,Chicago Bears,66,73,82
Joshua Ezeudu,RG,Kansas City Chiefs,66,65,81
Juanyeh Thomas,SS,Dallas Cowboys,66,87,65
Julius Wood,FS,Miami Dolphins,66,88,63
Kaevon Merriweather,SS,Jacksonville Jaguars,66,85,63
Kain Medrano,WILL,Washington Commanders,66,90,71
Karson Sharar,WILL,Arizona Cardinals,66,87,67
Kenny Pickett,QB,Carolina Panthers,66,81,68
Kevin Jobity Jr,DT,Pittsburgh Steelers,66,71,82
Kiko Mauigoa,MIKE,NY Jets,66,84,73
Kitan Crawford,SS,Arizona Cardinals,66,92,64
Landon Robinson,DT,Cincinnati Bengals,66,77,86
Lorenzo Styles Jr,SS,New Orleans Saints,66,97,54
Luke Newman,RG,Chicago Bears,66,70,87
Luke Gifford,SAM,San Francisco 49ers,66,85,75
Luke Wypler,C,Cleveland Browns,66,68,85
Marcellas Dial Jr,CB,Miami Dolphins,66,91,62
Matt Gulbin,RG,Washington Commanders,66,64,79
Max Mitchell,LT,NY Jets,66,61,85
Michael Deiter,C,Denver Broncos,66,68,86
Michael Burton,FB,Cleveland Browns,66,80,82
Montorie Foster Jr,WR,Seattle Seahawks,66,88,58
Morgan Cox,LS,Tennessee Titans,66,70,73
Myles Price,WR,Minnesota Vikings,66,92,53
Nathan Thomas,LT,Houston Texans,66,66,85
Nazir Stackhouse,DT,Tennessee Titans,66,67,85
Nick Gargiulo,LG,Denver Broncos,66,64,87
Nick Niemann,MIKE,Green Bay Packers,66,88,71
Olusegun Oluwatimi,C,Seattle Seahawks,66,60,84
Parker Hughes,WILL,Jacksonville Jaguars,66,88,71
Patrick Johnson,REDG,Las Vegas Raiders,66,82,75
Rayuan Lane III,SS,Jacksonville Jaguars,66,87,59
Reese Taylor,CB,Miami Dolphins,66,90,54
Rodney McGraw,REDG,Miami Dolphins,66,80,76
Ronnie Rivers,HB,Los Angeles Rams,66,87,63
Sebastian Valdez,DT,San Francisco 49ers,66,72,85
Sedrick Van Pran-Granger,C,Indianapolis Colts,66,66,82
Seth McGowan,HB,Indianapolis Colts,66,89,75
Siran Neal,SS,San Francisco 49ers,66,90,60
Thomas Incoom,LEDG,Carolina Panthers,66,84,77
Thomas Booker IV,DT,Las Vegas Raiders,66,74,85
Trace Ford,REDG,NY Giants,66,84,75
Trevor Keegan,RG,Minnesota Vikings,66,64,85
Trey Sermon,HB,Atlanta Falcons,66,84,78
Ty'Ron Hopper,WILL,Green Bay Packers,66,83,66
Tyler Lacy,REDG,Detroit Lions,66,69,86
Vederian Lowe,RT,San Francisco 49ers,66,64,82
Warren Brinson,DT,Green Bay Packers,66,70,83
Wesley Bailey,LEDG,Los Angeles Rams,66,83,77
Zach Carter,DT,Arizona Cardinals,66,72,76
Zayne Anderson,SS,Miami Dolphins,66,90,59
Adam Randall,HB,Baltimore Ravens,65,90,70
Alijah Clark,FS,Dallas Cowboys,65,89,64
Ameer Speed,CB,Dallas Cowboys,65,95,62
Asim Richards,LT,New Orleans Saints,65,67,87
Austen Pleasants,LT,San Francisco 49ers,65,62,84
Austin Ajiake,MIKE,Indianapolis Colts,65,86,65
Austin Brinkman,LS,Houston Texans,65,70,65
Ben Brown,C,New England Patriots,65,60,85
Ben Mann,LS,NY Giants,65,72,65
Bill Murray,LG,Los Angeles Rams,65,66,82
Brady Russell,FB,Seattle Seahawks,65,80,71
Branson Taylor,LG,Los Angeles Chargers,65,63,85
Britain Covey,WR,Philadelphia Eagles,65,88,41
Brock Wright,TE,Detroit Lions,65,85,79
Bryan Thomas Jr,LEDG,Jacksonville Jaguars,65,79,72
Bryson Eason,DT,Kansas City Chiefs,65,69,80
Case Keenum,QB,Chicago Bears,65,76,54
Chaz Chambliss,LEDG,Minnesota Vikings,65,81,79
Chigozie Anusiem,CB,Las Vegas Raiders,65,91,60
Dalton Tucker,LG,Indianapolis Colts,65,66,82
Danny Striggow,LEDG,Jacksonville Jaguars,65,78,75
Desjuan Johnson,REDG,Los Angeles Rams,65,72,79
Devon Key,FS,Denver Broncos,65,86,66
Dylan Cook,RT,Pittsburgh Steelers,65,69,80
Eli Raridon,TE,New England Patriots,65,85,74
Elijah Garcia,DT,Dallas Cowboys,65,71,83
Eric O'Neill,LEDG,Detroit Lions,65,79,79
Fred Johnson,RT,Philadelphia Eagles,65,62,85
Hayden Conner,LG,Arizona Cardinals,65,65,86
Haynes King,QB,Carolina Panthers,65,90,70
Hunter Wohler,SS,Indianapolis Colts,65,87,63
Isaiah Stalbird,WILL,New Orleans Saints,65,89,66
Jack Driscoll,LT,Pittsburgh Steelers,65,70,83
Jack Pyburn,LEDG,Kansas City Chiefs,65,79,76
Jackson Meeks,TE,Detroit Lions,65,84,65
Jackson Kuwatch,MIKE,Carolina Panthers,65,84,69
Jayden Williams,LT,Arizona Cardinals,65,72,84
Jordan Jackson,DT,Denver Broncos,65,73,78
Josh Blackwell,CB,Chicago Bears,65,94,53
Josh Cuevas,TE,Baltimore Ravens,65,83,74
Julian Ashby,LS,New England Patriots,65,74,68
Kalen King,CB,Arizona Cardinals,65,87,47
Kapena Gushiken,CB,Indianapolis Colts,65,92,59
Keyon Martin,CB,Baltimore Ravens,65,92,54
Ko Kieft,TE,Tampa Bay Buccaneers,65,72,75
Kohl Levao,LG,NY Jets,65,56,86
Kyle McCord,QB,Miami Dolphins,65,75,62
Leonard Taylor III,DT,New England Patriots,65,68,84
Matt Dickerson,DT,Jacksonville Jaguars,65,71,81
Matt Hibner,TE,Baltimore Ravens,65,87,75
Michael Jerrell,LT,Atlanta Falcons,65,74,82
Mike Caliendo,LG,Kansas City Chiefs,65,60,82
Mitchell Trubisky,QB,Tennessee Titans,65,83,71
Myles Hinton,RT,Cincinnati Bengals,65,66,82
Nephi Sewell,WILL,Chicago Bears,65,83,68
Pat Coogan,C,Tennessee Titans,65,66,82
Rejzohn Wright,CB,New Orleans Saints,65,89,53
Robert Spears-Jennings,SS,Pittsburgh Steelers,65,93,62
Rocco Underwood,LS,Philadelphia Eagles,65,74,66
Rodney Shelley,CB,Los Angeles Chargers,65,91,59
Sabastian Harsh,REDG,Houston Texans,65,84,82
Sam Roush,TE,Chicago Bears,65,82,80
Sam Howell,QB,Dallas Cowboys,65,82,64
Segun Olubi,MIKE,Las Vegas Raiders,65,89,66
Skyler Gill-Howard,DT,Detroit Lions,65,70,81
Tanner Koziol,TE,Jacksonville Jaguars,65,82,73
Taylen Green,QB,Cleveland Browns,65,92,66
Theo Wease Jr,WR,Los Angeles Chargers,65,88,62
Thomas Fidone II,TE,NY Giants,65,81,71
Tip Reiman,TE,Arizona Cardinals,65,84,77
Truman Jones,LEDG,Tennessee Titans,65,83,71
Tycen Anderson,SS,Denver Broncos,65,91,59
Tyrell Shavers,WR,Buffalo Bills,65,91,55
Tyrus Wheat,REDG,Dallas Cowboys,65,84,74
VJ Payne,SS,NY Jets,65,91,61
Walter Rouse,LG,New England Patriots,65,64,83
Will Kacmarek,TE,Miami Dolphins,65,81,77
Will Mallory,TE,Indianapolis Colts,65,87,72
Zaire Barnes,WILL,NY Giants,65,88,67
Zeek Biggers,DT,Miami Dolphins,65,69,84
Zemaiah Vaughn,CB,Minnesota Vikings,65,91,66
Alex Bachman,WR,Los Angeles Rams,64,87,61
Alijah Huzzie,CB,Jacksonville Jaguars,64,93,64
Anthony Campbell,DT,Green Bay Packers,64,72,83
Ayden Garnes,CB,Tampa Bay Buccaneers,64,91,54
BJ Green II,REDG,Jacksonville Jaguars,64,82,80
Branson Combs,WILL,Jacksonville Jaguars,64,83,71
Caleb Murphy,REDG,Los Angeles Chargers,64,79,70
Cameron Latu,TE,New England Patriots,64,80,73
Carson Bruener,MIKE,Pittsburgh Steelers,64,86,67
Chazz Surratt,SAM,Seattle Seahawks,64,85,75
Connor O'Toole,REDG,Seattle Seahawks,64,84,81
Cooper McDonald,MIKE,Kansas City Chiefs,64,84,73
Corey Levin,C,Atlanta Falcons,64,63,84
D.J. Montgomery,WR,Indianapolis Colts,64,89,53
Darryl Peterson III,REDG,Los Angeles Rams,64,77,72
Doneiko Slaughter,CB,Pittsburgh Steelers,64,92,58
Donovan Jennings,LG,Green Bay Packers,64,72,86
Dylan McMahon,C,Los Angeles Rams,64,69,80
Easton Mascarenas-Arnold,WILL,Cleveland Browns,64,86,73
Elliott Davison,FS,New England Patriots,64,91,58
Erick Hunter,MIKE,New England Patriots,64,90,69
Ethan Burke,REDG,Baltimore Ravens,64,74,71
Frank Crum,LT,Denver Broncos,64,74,85
Garrett Dellinger,LG,Tennessee Titans,64,67,88
Gavin Bartholomew,TE,Minnesota Vikings,64,82,70
Grant Stuard,WILL,Los Angeles Rams,64,84,76
Jack Heflin,DT,NY Jets,64,60,83
Jake Hansen,MIKE,Houston Texans,64,81,71
Jalen McLeod,MIKE,Jacksonville Jaguars,64,81,77
Jarrett Stidham,QB,Denver Broncos,64,82,62
Joe Giles-Harris,SAM,Cincinnati Bengals,64,82,69
Jordan Turner,WILL,Denver Broncos,64,81,75
Justin Barron,MIKE,Dallas Cowboys,64,84,70
Kameron Johnson,WR,Tampa Bay Buccaneers,64,90,63
Kayode Awosika,LG,Los Angeles Chargers,64,65,86
Kendall Williamson,FS,Los Angeles Chargers,64,91,63
Kevin Knowles,CB,Tampa Bay Buccaneers,64,90,54
Khalil Dorsey,CB,Detroit Lions,64,91,51
Khalil Jacobs,MIKE,New England Patriots,64,82,75
Kristian Welch,WILL,Green Bay Packers,64,85,75
Liam McCullough,LS,Atlanta Falcons,64,75,64
Luke Farrell,TE,San Francisco 49ers,64,77,77
Luke Haggard,RG,Tampa Bay Buccaneers,64,67,84
Marcelino McCrary-Ball,WILL,NY Jets,64,89,72
Marcus Bryant,LT,New England Patriots,64,68,85
Marlin Klein,TE,Houston Texans,64,85,74
Marlowe Wax,MIKE,Los Angeles Chargers,64,85,71
Nate Adkins,TE,Denver Broncos,64,77,74
Nic Jones,CB,NY Giants,64,89,49
Nick Vannett,TE,Baltimore Ravens,64,75,73
Nikko Reed,CB,NY Giants,64,90,62
Payne Durham,TE,Tampa Bay Buccaneers,64,77,73
Riley Nowakowski,FB,Pittsburgh Steelers,64,84,72
Ryan Van Demark,LT,Minnesota Vikings,64,63,83
Seth McLaughlin,C,Detroit Lions,64,63,89
Skylar Thompson,QB,Baltimore Ravens,64,77,65
Stetson Bennett IV,QB,Los Angeles Rams,64,84,55
Stone Forsythe,LT,Carolina Panthers,64,67,87
Swayze Bozeman,MIKE,Cincinnati Bengals,64,89,72
Travis Glover,RT,Green Bay Packers,64,63,86
Trevor Nowaske,SAM,Detroit Lions,64,88,74
Trey Lance,QB,Los Angeles Chargers,64,87,71
Will Howard,QB,Pittsburgh Steelers,64,81,68
Yasir Abdullah,SAM,Atlanta Falcons,64,90,70
Avery Smith,CB,Seattle Seahawks,63,88,58
Bam Martin-Scott,WILL,Carolina Panthers,63,85,74
Bauer Sharp,TE,Tampa Bay Buccaneers,63,85,71
Brandon Pili,DT,Seattle Seahawks,63,61,82
Brayden Willis,TE,San Francisco 49ers,63,84,76
C.J. Okoye,DT,NY Giants,63,58,89
CJ Donaldson,HB,New Orleans Saints,63,87,72
Cody Lindenberg,WILL,Las Vegas Raiders,63,82,71
Corey Bullock,LG,Carolina Panthers,63,62,85
Dallen Bentley,TE,Denver Broncos,63,85,71
Ethan Downs,REDG,Kansas City Chiefs,63,83,83
Garret Wallow,WILL,San Francisco 49ers,63,83,69
Garrett Nussmeier,QB,Kansas City Chiefs,63,78,63
Jackson Woodard,MIKE,Miami Dolphins,63,84,73
Jacob Bayer,RG,Cincinnati Bengals,63,66,86
Jacob Thomas,FS,Minnesota Vikings,63,91,63
Jacob Hummel,WILL,Houston Texans,63,86,67
Jake Briningstool,TE,Kansas City Chiefs,63,81,71
James Hudson III,LT,Tennessee Titans,63,60,82
Joey Blount,FS,Arizona Cardinals,63,91,65
Jonah Monheim,C,Jacksonville Jaguars,63,72,80
Jonathan Ford,DT,Green Bay Packers,63,56,84
Josh Fryar,RT,Arizona Cardinals,63,70,86
Julian Hill,TE,New England Patriots,63,83,75
Kurtis Rourke,QB,San Francisco 49ers,63,76,67
Kyle Hinton,LG,Atlanta Falcons,63,74,87
Lew Nichols,HB,Pittsburgh Steelers,63,85,68
Malik Herring,LEDG,Miami Dolphins,63,74,78
Mark Redman,TE,Green Bay Packers,63,78,77
Mason Richman,RT,Seattle Seahawks,63,60,84
Mason Murphy,RT,New Orleans Saints,63,62,82
Maximus Pulley,FS,Los Angeles Rams,63,88,62
Mike Brown,FS,New England Patriots,63,88,66
Nate Lynn,LEDG,NY Jets,63,78,69
PJ Jules,FS,Cincinnati Bengals,63,89,65
Quinn Ewers,QB,Jacksonville Jaguars,63,78,66
Quintin Morris,TE,Jacksonville Jaguars,63,82,72
Robert Beal Jr,REDG,Miami Dolphins,63,90,68
Seydou Traore,TE,Miami Dolphins,63,85,72
Storm Norton,LT,Atlanta Falcons,63,64,82
Tahj Chambers,WILL,Indianapolis Colts,63,85,68
Tanoa Togiai,LG,Washington Commanders,63,64,89
Teagan Quitoriano,TE,Arizona Cardinals,63,74,78
Tylan Grable,RT,Buffalo Bills,63,74,81
Tyler Batty,LEDG,Minnesota Vikings,63,80,83
William Wagner,LS,Cincinnati Bengals,63,73,71
Willie Lampkin IV,LG,Philadelphia Eagles,63,65,82
Xavier Nwankpa,FS,Kansas City Chiefs,63,90,62
Albert Reese IV,RT,Arizona Cardinals,62,65,85
Alex Ward,LS,Las Vegas Raiders,62,69,66
Andrew Meyer,C,Miami Dolphins,62,70,86
Athan Kaliakmanis,QB,Washington Commanders,62,75,65
Atonio Mafi,RG,Tennessee Titans,62,55,84
Benjamin Yurosek,TE,Minnesota Vikings,62,84,72
Bishop Fitzgerald,FS,Detroit Lions,62,87,58
Blake Whiteheart,TE,Cleveland Browns,62,82,72
Brittain Brown,HB,Chicago Bears,62,82,73
Carsen Ryan,TE,Cleveland Browns,62,82,77
Chris Stoll,LS,Seattle Seahawks,62,75,65
Christian Kuntz,LS,Pittsburgh Steelers,62,79,76
David Martin-Robinson,TE,Tennessee Titans,62,85,70
Donovan McMillon,SS,Cleveland Browns,62,90,65
Dorian Mausi,WILL,Tennessee Titans,62,83,68
Eku Leota,LEDG,Arizona Cardinals,62,78,78
Elijah Campbell,FS,NY Giants,62,89,61
Elijah Williams,DT,Minnesota Vikings,62,65,84
Garrett DiGiorgio,RG,Jacksonville Jaguars,62,60,84
Jack Cochrane,SAM,Kansas City Chiefs,62,83,70
Jacob Spomer,C,Los Angeles Chargers,62,68,86
Jake Haener,QB,NY Giants,62,83,61
Joe Huber,LG,Minnesota Vikings,62,66,86
John Williams,LT,Green Bay Packers,62,67,87
John Michael Gyllenborg,TE,Kansas City Chiefs,62,86,76
Karene Reid,MIKE,Denver Broncos,62,83,70
Keleki Latu,TE,Buffalo Bills,62,76,67
Luke Tenuta,RT,Indianapolis Colts,62,58,81
Michael Jurgens,C,Minnesota Vikings,62,58,80
Moliki Matavao,TE,New Orleans Saints,62,79,76
Nick Samac,C,Minnesota Vikings,62,65,84
Nick Muse,TE,Atlanta Falcons,62,81,80
Sam Hagen,RT,Houston Texans,62,64,84
Tanner Arkin,TE,New England Patriots,62,76,75
TeRah Edwards,DT,Carolina Panthers,62,65,87
Tristin McCollum,FS,Las Vegas Raiders,62,89,57
Wydett Williams Jr,SS,Arizona Cardinals,62,88,62
Anthony Tyus III,HB,Carolina Panthers,61,86,72
Brandon Crenshaw-Dickson,RT,Tennessee Titans,61,61,86
Colson Yankoff,TE,Washington Commanders,61,85,71
Hayden Rucci,TE,Los Angeles Chargers,61,77,73
Isaiah World,LT,Los Angeles Chargers,61,63,83
Jalon Daniels,QB,Tampa Bay Buccaneers,61,84,62
Jay Higgins IV,MIKE,Baltimore Ravens,61,78,68
Josh Woods,MIKE,Atlanta Falcons,61,83,64
Matt Orzech,LS,Green Bay Packers,61,77,73
Princeton Fant,TE,Dallas Cowboys,61,87,72
Tommy DeVito,QB,New England Patriots,61,84,62
Torricelli Simpkins III,RG,Carolina Panthers,61,57,78
Treyton Welch,TE,New Orleans Saints,61,84,77
Behren Morton,QB,New England Patriots,60,76,61
Benjamin Chukwuma,LT,Tampa Bay Buccaneers,60,61,82
Caleb Lohner,TE,Denver Broncos,60,83,75
Diego Pounds,RT,Kansas City Chiefs,60,67,81
DJ Uiagalelei,QB,Los Angeles Chargers,60,75,65
Evan Deckers,LS,Tampa Bay Buccaneers,60,67,62
Graham Mertz,QB,Houston Texans,60,77,60
Jack Strand,QB,Atlanta Falcons,60,80,64
Jaren Kanak,TE,Tennessee Titans,60,88,76
Joe Cardona,LS,Los Angeles Rams,60,74,80
Josh Sills,RG,NY Giants,60,63,78
Keondre Jackson,SS,Baltimore Ravens,60,83,65
Kyle Allen,QB,Buffalo Bills,60,81,53
Mike Reid,FS,New Orleans Saints,60,87,59
Nick Kallerup,TE,Seattle Seahawks,60,81,72
Shaka Heyward,MIKE,Miami Dolphins,60,88,74
Amen Ogbongbemiga,WILL,Detroit Lions,59,82,68
Jake Majors,C,Philadelphia Eagles,59,65,83
Jared Ivey,LEDG,Atlanta Falcons,59,67,74
Joe Fagnano,QB,Baltimore Ravens,59,78,64
Max Brosmer,QB,Minnesota Vikings,59,79,70
Scott Daly,LS,Chicago Bears,59,71,72
Tyson Bagent,QB,Chicago Bears,59,79,59
Rex Sunahara,LS,Cleveland Browns,58,69,62
Hayden Large,TE,Chicago Bears,57,82,75
Milo Eifler,MIKE,Tennessee Titans,57,85,64
Patrick O'Connell,MIKE,Seattle Seahawks,57,82,62
Sam Ehlinger,QB,Denver Broncos,57,84,67
William Sherman,C,New Orleans Saints,57,65,81
Tucker Addington,LS,Miami Dolphins,56,70,62
Feleipe Franks,TE,Carolina Panthers,55,83,65
Ryan McCollum,C,Pittsburgh Steelers,54,61,80
`,v0=`name,pos,team,ovr,spd,str
Darius Slayton,WR,Free Agent,78,93,57
Xavier Woods,FS,Free Agent,78,88,71
Najee Harris,HB,Free Agent,77,87,82
Rayshawn Jenkins,FS,Free Agent,77,88,72
Asante Samuel Jr,CB,Free Agent,76,91,54
Harrison Mevis,K,Free Agent,76,70,44
Odell Beckham Jr,WR,Free Agent,73,89,53
Chris Moore,WR,Free Agent,72,88,58
Marquez Valdes-Scantling,WR,Free Agent,72,92,63
Riley Patterson,K,Free Agent,72,76,40
Caelen Carson,CB,Free Agent,71,88,52
KhaDarel Hodge,WR,Free Agent,71,89,60
`,g0=`pid,name,pos,team
nfl-p00001,Ja'Marr Chase,WR,Cincinnati Bengals
nfl-p00002,Jaxon Smith-Njigba,WR,Seattle Seahawks
nfl-p00003,Josh Allen,QB,Buffalo Bills
nfl-p00004,Myles Garrett,REDG,Los Angeles Rams
nfl-p00005,Trey McBride,TE,Arizona Cardinals
nfl-p00006,Bijan Robinson,HB,Atlanta Falcons
nfl-p00007,Christian Gonzalez,CB,New England Patriots
nfl-p00008,Fred Warner,MIKE,San Francisco 49ers
nfl-p00009,Matthew Stafford,QB,Los Angeles Rams
nfl-p00010,Micah Parsons,REDG,Green Bay Packers
nfl-p00011,Penei Sewell,LT,Detroit Lions
nfl-p00012,Puka Nacua,WR,Los Angeles Rams
nfl-p00013,Christian McCaffrey,HB,San Francisco 49ers
nfl-p00014,George Kittle,TE,San Francisco 49ers
nfl-p00015,Jahmyr Gibbs,HB,Detroit Lions
nfl-p00016,Joe Burrow,QB,Cincinnati Bengals
nfl-p00017,Justin Jefferson,WR,Minnesota Vikings
nfl-p00018,Maxx Crosby,LEDG,Las Vegas Raiders
nfl-p00019,Pat Surtain II,CB,Denver Broncos
nfl-p00020,Trent Williams,LT,San Francisco 49ers
nfl-p00021,Amon-Ra St. Brown,WR,Detroit Lions
nfl-p00022,Creed Humphrey,C,Kansas City Chiefs
nfl-p00023,Derrick Brown,DT,Carolina Panthers
nfl-p00024,Garett Bolles,LT,Denver Broncos
nfl-p00025,Jeffery Simmons,DT,Chicago Bears
nfl-p00026,Joe Thuney,LG,Chicago Bears
nfl-p00027,Jonathan Taylor,HB,Indianapolis Colts
nfl-p00028,Quinn Meinerz,RG,Denver Broncos
nfl-p00029,T.J. Watt,LEDG,Pittsburgh Steelers
nfl-p00030,Trent McDuffie,CB,Los Angeles Rams
nfl-p00031,Aaron Donald,DT,Los Angeles Rams
nfl-p00032,Andrew Thomas,LT,NY Giants
nfl-p00033,Brock Bowers,TE,Las Vegas Raiders
nfl-p00034,Cam Heyward,DT,Pittsburgh Steelers
nfl-p00035,CeeDee Lamb,WR,Dallas Cowboys
nfl-p00036,Kenneth Walker,HB,Kansas City Chiefs
nfl-p00037,Lamar Jackson,QB,Baltimore Ravens
nfl-p00038,Quenton Nelson,LG,Seattle Seahawks
nfl-p00039,Will Anderson Jr,LEDG,Houston Texans
nfl-p00040,Aidan Hutchinson,LEDG,Detroit Lions
nfl-p00041,Chris Jones,DT,Kansas City Chiefs
nfl-p00042,Chris Lindstrom,RG,Atlanta Falcons
nfl-p00043,Denzel Ward,CB,Cleveland Browns
nfl-p00044,Derrick Henry,HB,Baltimore Ravens
nfl-p00045,Jessie Bates III,FS,Atlanta Falcons
nfl-p00046,Kyle Hamilton,SS,Baltimore Ravens
nfl-p00047,Laremy Tunsil,LT,Washington Commanders
nfl-p00048,Patrick Mahomes,QB,Kansas City Chiefs
nfl-p00049,Tristan Wirfs,LT,Tampa Bay Buccaneers
nfl-p00050,Vita Vea,DT,Tampa Bay Buccaneers
nfl-p00051,Antoine Winfield Jr,FS,Tampa Bay Buccaneers
nfl-p00052,Derwin James Jr,SS,Los Angeles Chargers
nfl-p00053,Dexter Lawrence II,DT,Cincinnati Bengals
nfl-p00054,Drake London,WR,Atlanta Falcons
nfl-p00055,Kolton Miller,LT,Las Vegas Raiders
nfl-p00056,Nick Bosa,LEDG,San Francisco 49ers
nfl-p00057,Roquan Smith,MIKE,Baltimore Ravens
nfl-p00058,Travis Kelce,TE,Kansas City Chiefs
nfl-p00059,Trey Smith,RG,Kansas City Chiefs
nfl-p00060,Zack Baun,WILL,Philadelphia Eagles
nfl-p00061,Brock Purdy,QB,San Francisco 49ers
nfl-p00062,Danielle Hunter,REDG,Houston Texans
nfl-p00063,DeForest Buckner,DT,San Francisco 49ers
nfl-p00064,Derek Stingley Jr,CB,Houston Texans
nfl-p00065,DeVonta Smith,WR,Philadelphia Eagles
nfl-p00066,Jalen Ramsey,FS,Pittsburgh Steelers
nfl-p00067,James Cook III,HB,Buffalo Bills
nfl-p00068,Rashawn Slater,LT,Los Angeles Chargers
nfl-p00069,Xavier McKinney,SS,Green Bay Packers
nfl-p00070,Brian Branch,SS,Detroit Lions
nfl-p00071,Caleb Williams,QB,Chicago Bears
nfl-p00072,Davante Adams,WR,Los Angeles Rams
nfl-p00073,Devon Witherspoon,CB,Seattle Seahawks
nfl-p00074,Jordan Mailata,LT,Philadelphia Eagles
nfl-p00075,Mike Evans,WR,San Francisco 49ers
nfl-p00076,Nik Bonitto,REDG,Denver Broncos
nfl-p00077,Quinnen Williams,DT,Dallas Cowboys
nfl-p00078,Saquon Barkley,HB,Philadelphia Eagles
nfl-p00079,Aaron Brewer,C,Miami Dolphins
nfl-p00080,Christian Darrisaw,LT,Minnesota Vikings
nfl-p00081,Dak Prescott,QB,Dallas Cowboys
nfl-p00082,Darnell Wright,RT,Chicago Bears
nfl-p00083,Demario Davis,MIKE,NY Jets
nfl-p00084,Greg Rousseau,LEDG,Buffalo Bills
nfl-p00085,Kevin Dotson,RG,Los Angeles Rams
nfl-p00086,Kyren Williams,HB,Los Angeles Rams
nfl-p00087,Leonard Williams,DT,Seattle Seahawks
nfl-p00088,Mark Andrews,TE,Baltimore Ravens
nfl-p00089,Minkah Fitzpatrick,SS,NY Jets
nfl-p00090,Nico Collins,WR,Houston Texans
nfl-p00091,Nnamdi Madubuike,DT,Baltimore Ravens
nfl-p00092,Quinyon Mitchell,CB,Philadelphia Eagles
nfl-p00093,Zay Flowers,WR,Baltimore Ravens
nfl-p00094,Brian Burns,REDG,NY Giants
nfl-p00095,Chris Olave,WR,New Orleans Saints
nfl-p00096,Dallas Goedert,TE,Philadelphia Eagles
nfl-p00097,Dion Dawkins,LT,Buffalo Bills
nfl-p00098,Drake Maye,QB,New England Patriots
nfl-p00099,Drue Tranquill,WILL,Kansas City Chiefs
nfl-p00100,Josh Hines-Allen,REDG,Jacksonville Jaguars
nfl-p00101,Josh Jacobs,HB,Green Bay Packers
nfl-p00102,Sauce Gardner,CB,Indianapolis Colts
nfl-p00103,Talanoa Hufanga,SS,Denver Broncos
nfl-p00104,Terry McLaurin,WR,Washington Commanders
nfl-p00105,Tyler Smith,LG,Dallas Cowboys
nfl-p00106,Zach Frazier,C,Pittsburgh Steelers
nfl-p00107,Zach Allen,DT,Denver Broncos
nfl-p00108,A.J. Terrell Jr,CB,Atlanta Falcons
nfl-p00109,Budda Baker,SS,Arizona Cardinals
nfl-p00110,Byron Murphy Jr,CB,Minnesota Vikings
nfl-p00111,Charvarius Ward Sr,CB,Indianapolis Colts
nfl-p00112,D'Andre Swift,HB,Chicago Bears
nfl-p00113,Devin Lloyd,WILL,Carolina Panthers
nfl-p00114,George Pickens,WR,Dallas Cowboys
nfl-p00115,Jalen Carter,DT,Philadelphia Eagles
nfl-p00116,Jared Verse,REDG,Cleveland Browns
nfl-p00117,Jared Goff,QB,Detroit Lions
nfl-p00118,Kerby Joseph,FS,Detroit Lions
nfl-p00119,Kyle Juszczyk,FB,San Francisco 49ers
nfl-p00120,Malik Nabers,WR,NY Giants
nfl-p00121,Sam Cosmi,RG,Washington Commanders
nfl-p00122,Sam LaPorta,TE,Detroit Lions
nfl-p00123,Tee Higgins,WR,Cincinnati Bengals
nfl-p00124,Trey Hendrickson,REDG,Baltimore Ravens
nfl-p00125,Tyler Linderbaum,C,Las Vegas Raiders
nfl-p00126,A.J. Brown,WR,New England Patriots
nfl-p00127,Breece Hall,HB,NY Jets
nfl-p00128,Brian O'Neill,RT,Minnesota Vikings
nfl-p00129,Chase Young,LEDG,New Orleans Saints
nfl-p00130,Cooper DeJean,CB,Philadelphia Eagles
nfl-p00131,Dalton Schultz,TE,Houston Texans
nfl-p00132,Damien Lewis,LG,Carolina Panthers
nfl-p00133,De'Von Achane,HB,Miami Dolphins
nfl-p00134,DeMarcus Lawrence,LEDG,Seattle Seahawks
nfl-p00135,Erik McCoy,C,New Orleans Saints
nfl-p00136,Foyesade Oluokun,MIKE,Jacksonville Jaguars
nfl-p00137,Garrett Wilson,WR,NY Jets
nfl-p00138,Harrison Smith,FS,Minnesota Vikings
nfl-p00139,Jack Campbell,MIKE,Detroit Lions
nfl-p00140,Jake Matthews,LT,Atlanta Falcons
nfl-p00141,Jamel Dean,CB,Pittsburgh Steelers
nfl-p00142,Jaycee Horn,CB,Carolina Panthers
nfl-p00143,Jaylon Johnson,CB,Chicago Bears
nfl-p00144,Jonathan Allen,DT,Cincinnati Bengals
nfl-p00145,Jordyn Brooks,WILL,Miami Dolphins
nfl-p00146,Tetairoa McMillan,WR,Carolina Panthers
nfl-p00147,Trevor Lawrence,QB,Jacksonville Jaguars
nfl-p00148,Zach Bako-Bewele,RT,Green Bay Packers
nfl-p00149,Alex Singleton,MIKE,Denver Broncos
nfl-p00150,Alex Highsmith,REDG,Pittsburgh Steelers
nfl-p00151,Alim McNeill,DT,Detroit Lions
nfl-p00152,Bernhard Raimann,LT,Indianapolis Colts
nfl-p00153,Brandon Aubrey,K,Dallas Cowboys
nfl-p00154,Bucky Irving,HB,Tampa Bay Buccaneers
nfl-p00155,Courtland Sutton,WR,Denver Broncos
nfl-p00156,Devin Bush,MIKE,Chicago Bears
nfl-p00157,Hunter Henry,TE,New England Patriots
nfl-p00158,Isaiah Rodgers Sr,CB,Minnesota Vikings
nfl-p00159,Jalen Pitre,CB,Houston Texans
nfl-p00160,Jaylen Warren,HB,Pittsburgh Steelers
nfl-p00161,Joe Alt,RT,Los Angeles Chargers
nfl-p00162,Joey Porter Jr,CB,Dallas Cowboys
nfl-p00163,Jordan Love,QB,Green Bay Packers
nfl-p00164,Julian Love,FS,Seattle Seahawks
nfl-p00165,Khalil Mack,REDG,Los Angeles Chargers
nfl-p00166,Mike Onwenu,RG,New England Patriots
nfl-p00167,Milton Williams,DT,New England Patriots
nfl-p00168,Nick Emmanwori,SS,Seattle Seahawks
nfl-p00169,Paris Johnson Jr,LT,Arizona Cardinals
nfl-p00170,Ronnie Stanley,LT,Baltimore Ravens
nfl-p00171,Stefon Diggs,WR,Washington Commanders
nfl-p00172,Alaric Jackson,LT,Los Angeles Rams
nfl-p00173,Ashton Jeanty,HB,Las Vegas Raiders
nfl-p00174,Byron Murphy II,DT,Seattle Seahawks
nfl-p00175,Byron Young,LEDG,Los Angeles Rams
nfl-p00176,Carlton Davis III,CB,New England Patriots
nfl-p00177,Carson Schwesinger,MIKE,Cleveland Browns
nfl-p00178,Charles Cross,LT,Seattle Seahawks
nfl-p00179,Chris Boswell,K,Pittsburgh Steelers
nfl-p00180,Christian Watson,WR,Green Bay Packers
nfl-p00181,Chuba Hubbard,HB,Carolina Panthers
nfl-p00182,Dre Greenlaw,WILL,San Francisco 49ers
nfl-p00183,Ernest Jones IV,MIKE,Seattle Seahawks
nfl-p00184,Jameson Williams,WR,Detroit Lions
nfl-p00185,Javonte Williams,HB,Dallas Cowboys
nfl-p00186,Jaylen Waddle,WR,Denver Broncos
nfl-p00187,Jevon Holland,FS,NY Giants
nfl-p00188,Jonathan Greenard,REDG,Philadelphia Eagles
nfl-p00189,Josh Sweat,REDG,Arizona Cardinals
nfl-p00190,Kamari Lassiter,CB,Houston Texans
nfl-p00191,Kevin Byard III,FS,New England Patriots
nfl-p00192,Kevin Zeitler,RG,Green Bay Packers
nfl-p00193,Kobie Turner,DT,Los Angeles Rams
nfl-p00194,Marlon Humphrey,CB,Baltimore Ravens
nfl-p00195,Michael Dickson,P,Seattle Seahawks
nfl-p00196,Rashee Rice,WR,Kansas City Chiefs
nfl-p00197,Ryan Neuzil,C,Atlanta Falcons
nfl-p00198,Spencer Brown,RT,Buffalo Bills
nfl-p00199,Travis Hunter,CB,Jacksonville Jaguars
nfl-p00200,Tucker Kraft,TE,Green Bay Packers
nfl-p00201,Alec Pierce,WR,Indianapolis Colts
nfl-p00202,Andrew Van Ginkel,REDG,Minnesota Vikings
nfl-p00203,Blake Cashman,MIKE,Minnesota Vikings
nfl-p00204,Camryn Bynum,FS,Indianapolis Colts
nfl-p00205,Chase Brown,HB,Cincinnati Bengals
nfl-p00206,Colton McKivitz,RT,San Francisco 49ers
nfl-p00207,D.J. Reader,DT,NY Giants
nfl-p00208,Daron Payne,DT,Washington Commanders
nfl-p00209,DJ Moore,WR,Buffalo Bills
nfl-p00210,DJ Turner II,CB,Cincinnati Bengals
nfl-p00211,Jalen Redmond,DT,Minnesota Vikings
nfl-p00212,Jalen Thompson,SS,Dallas Cowboys
nfl-p00213,Jonathon Cooper,LEDG,Denver Broncos
nfl-p00214,Jordan Addison,WR,Minnesota Vikings
nfl-p00215,Luke Goedeke,RT,Tampa Bay Buccaneers
nfl-p00216,Nate Wiggins,CB,Baltimore Ravens
nfl-p00217,Nate Landman,MIKE,Los Angeles Rams
nfl-p00218,Parker Washington,WR,Jacksonville Jaguars
nfl-p00219,Patrick Ricard,FB,NY Giants
nfl-p00220,Peter Skoronski,LG,Tennessee Titans
nfl-p00221,Quentin Lake,SS,Los Angeles Rams
nfl-p00222,Sam Darnold,QB,Seattle Seahawks
nfl-p00223,Spencer Shrader,K,Indianapolis Colts
nfl-p00224,Tanor Bortolini,C,Indianapolis Colts
nfl-p00225,Taron Johnson,CB,Las Vegas Raiders
nfl-p00226,Taylor Moton,RT,Carolina Panthers
nfl-p00227,Terrel Bernard,MIKE,Buffalo Bills
nfl-p00228,Tony Pollard,HB,Tennessee Titans
nfl-p00229,Travis Etienne Jr,HB,New Orleans Saints
nfl-p00230,Tyler Warren,TE,Indianapolis Colts
nfl-p00231,Tyler Booker,RG,Dallas Cowboys
nfl-p00232,Will Reichard,K,Minnesota Vikings
nfl-p00233,Aaron Jones Sr,HB,Minnesota Vikings
nfl-p00234,Abraham Lucas,RT,Seattle Seahawks
nfl-p00235,Alijah Vera-Tucker,LG,New England Patriots
nfl-p00236,Armand Membou,RT,NY Jets
nfl-p00237,Azeez Al-Shaair,MIKE,Houston Texans
nfl-p00238,Bobby Okereke,MIKE,Carolina Panthers
nfl-p00239,Brandon Jones,FS,Denver Broncos
nfl-p00240,Cam Skattebo,HB,NY Giants
nfl-p00241,Chidobe Awuzie,CB,Baltimore Ravens
nfl-p00242,Cooper Kupp,WR,Seattle Seahawks
nfl-p00243,Dalton Kincaid,TE,Buffalo Bills
nfl-p00244,Deommodore Lenoir,CB,San Francisco 49ers
nfl-p00245,DK Metcalf,WR,Pittsburgh Steelers
nfl-p00246,Dominick Puni,RG,San Francisco 49ers
nfl-p00247,Evan Williams,FS,Green Bay Packers
nfl-p00248,George Karlaftis,LEDG,Kansas City Chiefs
nfl-p00249,Grover Stewart,DT,Indianapolis Colts
nfl-p00250,Hjalte Froholdt,C,Arizona Cardinals
nfl-p00251,Jermaine Eluemunor,RT,NY Giants
nfl-p00252,Jonah Jackson,RG,Chicago Bears
nfl-p00253,Josh Metellus,SS,Minnesota Vikings
nfl-p00254,Justin Herbert,QB,Los Angeles Chargers
nfl-p00255,Kaden Elliss,WILL,New Orleans Saints
nfl-p00256,Kam Curl,SS,Los Angeles Rams
nfl-p00257,Khalil Shakir,WR,Buffalo Bills
nfl-p00258,Kyler Gordon,CB,Chicago Bears
nfl-p00259,Ladd McConkey,WR,Los Angeles Chargers
nfl-p00260,Nick Folk,K,Atlanta Falcons
nfl-p00261,Nolan Smith Jr,LEDG,Philadelphia Eagles
nfl-p00262,Poona Ford,DT,Los Angeles Rams
nfl-p00263,Reggie Gilliam,FB,New England Patriots
nfl-p00264,Rigoberto Sanchez,P,Indianapolis Colts
nfl-p00265,Riq Woolen,CB,Philadelphia Eagles
nfl-p00266,Robert Spillane,MIKE,New England Patriots
nfl-p00267,T.J. Hockenson,TE,Minnesota Vikings
nfl-p00268,Zach Charbonnet,HB,Seattle Seahawks
nfl-p00269,Zach Sieler,DT,Miami Dolphins
nfl-p00270,A.J. Cole,P,Las Vegas Raiders
nfl-p00271,Abdul Carter,LEDG,NY Giants
nfl-p00272,Arvell Reese,WILL,NY Giants
nfl-p00273,Braden Smith,RT,Houston Texans
nfl-p00274,Bryce Young,QB,Carolina Panthers
nfl-p00275,Calais Campbell,DT,Baltimore Ravens
nfl-p00276,Chris Godwin Jr,WR,Tampa Bay Buccaneers
nfl-p00277,Colston Loveland,TE,Chicago Bears
nfl-p00278,Dallas Turner,LEDG,Minnesota Vikings
nfl-p00279,David Montgomery,HB,Houston Texans
nfl-p00280,Donte Jackson,CB,Los Angeles Chargers
nfl-p00281,Ed Oliver,DT,Buffalo Bills
nfl-p00282,Elgton Jenkins,C,Cleveland Browns
nfl-p00283,Evan McPherson,K,Cincinnati Bengals
nfl-p00284,Grant Delpit,SS,Cleveland Browns
nfl-p00285,Isaiah Likely,TE,NY Giants
nfl-p00286,Jaelan Phillips,LEDG,Carolina Panthers
nfl-p00287,Jakobi Meyers,WR,Jacksonville Jaguars
nfl-p00288,Jason Myers,K,Seattle Seahawks
nfl-p00289,Jeremiah Owusu-Koramoah,WILL,Cleveland Browns
nfl-p00290,Jeremiyah Love,HB,Arizona Cardinals
nfl-p00291,Jeremy Chinn,SS,Las Vegas Raiders
nfl-p00292,Jeremy Crawshaw,P,Denver Broncos
nfl-p00293,Joe Tippmann,RG,NY Jets
nfl-p00294,Jordan Davis,DT,Philadelphia Eagles
nfl-p00295,Jourdan Lewis,CB,Jacksonville Jaguars
nfl-p00296,Landon Dickerson,LG,Philadelphia Eagles
nfl-p00297,Leo Chenal,MIKE,Washington Commanders
nfl-p00298,Lukas Van Ness,LEDG,Green Bay Packers
nfl-p00299,Mansoor Delane,CB,Kansas City Chiefs
nfl-p00300,Marcus Jones,CB,New England Patriots
nfl-p00301,Michael Wilson,WR,Arizona Cardinals
nfl-p00302,Mike McGlinchey,RT,Denver Broncos
nfl-p00303,Morgan Moses,RT,New England Patriots
nfl-p00304,Nick Bolton,MIKE,Kansas City Chiefs
nfl-p00305,Rasheed Walker,LT,Carolina Panthers
nfl-p00306,Rico Dowdle,HB,Pittsburgh Steelers
nfl-p00307,Rome Odunze,WR,Chicago Bears
nfl-p00308,Tony Jefferson,SS,Los Angeles Chargers
nfl-p00309,Tre'von Moehrig,FS,Carolina Panthers
nfl-p00310,Tremaine Edmunds,MIKE,NY Giants
nfl-p00311,TreVeyon Henderson,HB,New England Patriots
nfl-p00312,Wan'Dale Robinson,WR,Tennessee Titans
nfl-p00313,Amani Hooker,SS,Tennessee Titans
nfl-p00314,Antonio Johnson,SS,Jacksonville Jaguars
nfl-p00315,Bhayshul Tuten,HB,Jacksonville Jaguars
nfl-p00316,C.J. Stroud,QB,Houston Texans
nfl-p00317,Calen Bullock,FS,Houston Texans
nfl-p00318,Cam Taylor-Britt,CB,Indianapolis Colts
nfl-p00319,Chase McLaughlin,K,Tampa Bay Buccaneers
nfl-p00320,Cobie Durant,CB,Dallas Cowboys
nfl-p00321,Connor McGovern,C,Buffalo Bills
nfl-p00322,Craig Woodson,SS,New England Patriots
nfl-p00323,Daiyan Henley,WILL,Los Angeles Chargers
nfl-p00324,Darren Waller,TE,Carolina Panthers
nfl-p00325,David Bailey,REDG,NY Jets
nfl-p00326,Divine Deablo,MIKE,Atlanta Falcons
nfl-p00327,Emeka Egbuka,WR,Tampa Bay Buccaneers
nfl-p00328,Gervon Dexter Sr,DT,Atlanta Falcons
nfl-p00329,Grady Jarrett,DT,Chicago Bears
nfl-p00330,Harold Landry III,REDG,New England Patriots
nfl-p00331,J.K. Dobbins,HB,Denver Broncos
nfl-p00332,Jadeveon Clowney,LEDG,Houston Texans
nfl-p00333,Jauan Jennings,WR,Minnesota Vikings
nfl-p00334,JK Scott,P,Los Angeles Chargers
nfl-p00335,Josh Harris,LS,Los Angeles Chargers
nfl-p00336,Josh Simmons,LT,Kansas City Chiefs
nfl-p00337,Josh Downs,WR,Indianapolis Colts
nfl-p00338,Justin Reid,FS,New Orleans Saints
nfl-p00339,Ka'imi Fairbairn,K,Houston Texans
nfl-p00340,Keenan Allen,WR,Indianapolis Colts
nfl-p00341,Kyle Pitts Sr,TE,Atlanta Falcons
nfl-p00342,Mason Graham,DT,Cleveland Browns
nfl-p00343,Michael Pittman,WR,Pittsburgh Steelers
nfl-p00344,Mike Jackson,CB,Carolina Panthers
nfl-p00345,Montez Sweat,LEDG,Chicago Bears
nfl-p00346,Nick Cross,SS,Washington Commanders
nfl-p00347,Omarion Hampton,HB,Los Angeles Chargers
nfl-p00348,Patrick Paul,LT,Miami Dolphins
nfl-p00349,Quincy Williams,WILL,Cleveland Browns
nfl-p00350,Robert Hunt,RG,Carolina Panthers
nfl-p00351,Sheldon Rankins,DT,Houston Texans
nfl-p00352,Sonny Styles,MIKE,Washington Commanders
nfl-p00353,Steve Avila,LG,Los Angeles Rams
nfl-p00354,T.J. Edwards,WILL,Chicago Bears
nfl-p00355,Tarheeb Still,CB,Los Angeles Chargers
nfl-p00356,Tyler Allgeier,HB,Arizona Cardinals
nfl-p00357,Tyler Shough,QB,New Orleans Saints
nfl-p00358,Will Campbell,LT,New England Patriots
nfl-p00359,Woody Marks,HB,Houston Texans
nfl-p00360,Zyon McCollum,CB,Tampa Bay Buccaneers
nfl-p00361,Akheem Mesidor,REDG,Los Angeles Chargers
nfl-p00362,Alohi Gilman,FS,Kansas City Chiefs
nfl-p00363,Andrew DePaola,LS,Minnesota Vikings
nfl-p00364,Baker Mayfield,QB,Tampa Bay Buccaneers
nfl-p00365,Bo Nix,QB,Denver Broncos
nfl-p00366,Bryan Cook,FS,Cincinnati Bengals
nfl-p00367,Caleb Downs,SS,Dallas Cowboys
nfl-p00368,Cam Little,K,Jacksonville Jaguars
nfl-p00369,Cameron Dicker,K,Los Angeles Chargers
nfl-p00370,Christian Benford,CB,Buffalo Bills
nfl-p00371,Christian Barmore,DT,New England Patriots
nfl-p00372,Cor'Dale Flott,CB,Tennessee Titans
nfl-p00373,Corey Bojorquez,P,Cleveland Browns
nfl-p00374,D.J. Reed,CB,Detroit Lions
nfl-p00375,DeShon Elliott,SS,Pittsburgh Steelers
nfl-p00376,Edgerrin Cooper,WILL,Green Bay Packers
nfl-p00377,Ethan Evans,P,Los Angeles Rams
nfl-p00378,Ezra Cleveland,RG,Jacksonville Jaguars
nfl-p00379,Harold Fannin Jr,TE,Cleveland Browns
nfl-p00380,Harrison Butker,K,Kansas City Chiefs
nfl-p00381,Ikem Ekwonu,LT,Carolina Panthers
nfl-p00382,Isaac Seumalo,LG,Arizona Cardinals
nfl-p00383,Jacob Rodriguez,MIKE,Miami Dolphins
nfl-p00384,Jacory Croskey-Merritt,HB,Washington Commanders
nfl-p00385,Jake Elliott,K,Philadelphia Eagles
nfl-p00386,Jaquan Brisker,SS,Pittsburgh Steelers
nfl-p00387,Javon Hargrave,DT,Green Bay Packers
nfl-p00388,Jayden Reed,WR,Green Bay Packers
nfl-p00389,Jaylen Watson,CB,Los Angeles Rams
nfl-p00390,JC Latham,RT,Tennessee Titans
nfl-p00391,John Simpson,LG,Baltimore Ravens
nfl-p00392,John Franklin-Myers,DT,Tennessee Titans
nfl-p00393,Jordan Mason,HB,Minnesota Vikings
nfl-p00394,Juwan Johnson,TE,New Orleans Saints
nfl-p00395,Kayshon Boutte,WR,Houston Texans
nfl-p00396,Kenny Moore II,CB,Philadelphia Eagles
nfl-p00397,Kyle Monangai,HB,Chicago Bears
nfl-p00398,Kyle Van Noy,REDG,Minnesota Vikings
nfl-p00399,Laiatu Latu,LEDG,Indianapolis Colts
nfl-p00400,Luther Burden III,WR,Chicago Bears
nfl-p00401,Mack Wilson Sr,MIKE,Arizona Cardinals
nfl-p00402,Mason McCormick,LG,Pittsburgh Steelers
nfl-p00403,Matthew Golden,WR,Green Bay Packers
nfl-p00404,Michael Mayer,TE,Las Vegas Raiders
nfl-p00405,Odafe Oweh,LEDG,Washington Commanders
nfl-p00406,Quay Walker,WILL,Las Vegas Raiders
nfl-p00407,Quentin Johnston,WR,Los Angeles Chargers
nfl-p00408,Quinshon Judkins,HB,Cleveland Browns
nfl-p00409,Rhamondre Stevenson,HB,New England Patriots
nfl-p00410,Ricky Pearsall,WR,San Francisco 49ers
nfl-p00411,Travon Walker,LEDG,Jacksonville Jaguars
nfl-p00412,Tyler Biadasz,C,Los Angeles Chargers
nfl-p00413,Tytus Howard,RT,Cleveland Browns
nfl-p00414,Alex Anzalone,WILL,Tampa Bay Buccaneers
nfl-p00415,Alvin Kamara,HB,New Orleans Saints
nfl-p00416,Amik Robertson,CB,Washington Commanders
nfl-p00417,Anton Harrison,LT,Jacksonville Jaguars
nfl-p00418,Blake Corum,HB,Los Angeles Rams
nfl-p00419,Boye Mafe,REDG,Cincinnati Bengals
nfl-p00420,Braden Mann,P,Philadelphia Eagles
nfl-p00421,Braden Fiske,DT,Los Angeles Rams
nfl-p00422,Brenton Strange,TE,Jacksonville Jaguars
nfl-p00423,Brian Thomas Jr,WR,Jacksonville Jaguars
nfl-p00424,Brian Robinson Jr,HB,Atlanta Falcons
nfl-p00425,Bryan Anger,P,Dallas Cowboys
nfl-p00426,Cameron Jordan,REDG,New Orleans Saints
nfl-p00427,Carl Granderson,REDG,New Orleans Saints
nfl-p00428,Cole Bishop,FS,Buffalo Bills
nfl-p00429,Coleman Shelton,C,Los Angeles Rams
nfl-p00430,DaQuan Jones,DT,New England Patriots
nfl-p00431,David Edwards,LG,New Orleans Saints
nfl-p00432,Deebo Samuel Sr,WR,San Francisco 49ers
nfl-p00433,Dorance Armstrong,LEDG,Washington Commanders
nfl-p00434,Dru Phillips,CB,NY Giants
nfl-p00435,Dylan Parham,LG,NY Jets
nfl-p00436,Elijah Molden,FS,Los Angeles Chargers
nfl-p00437,Eric Wilson,WILL,Minnesota Vikings
nfl-p00438,Francis Mauigoa,RG,NY Giants
nfl-p00439,Frankie Luvu,WILL,Washington Commanders
nfl-p00440,Greg Newsome II,CB,NY Giants
nfl-p00441,Ja'Quan McMillian,CB,Denver Broncos
nfl-p00442,Jack Fox,P,Detroit Lions
nfl-p00443,Jacob Parrish,CB,Tampa Bay Buccaneers
nfl-p00444,Jalen Hurts,QB,Philadelphia Eagles
nfl-p00445,Jalon Walker,LEDG,Atlanta Falcons
nfl-p00446,James Pearce Jr,REDG,Atlanta Falcons
nfl-p00447,James Conner,HB,Arizona Cardinals
nfl-p00448,Jerry Jeudy,WR,Cleveland Browns
nfl-p00449,Jihaad Campbell,MIKE,Philadelphia Eagles
nfl-p00450,Kamren Kinchens,FS,Los Angeles Rams
nfl-p00451,Kenny Clark,DT,Dallas Cowboys
nfl-p00452,Kristian Fulton,CB,Kansas City Chiefs
nfl-p00453,L'Jarius Sneed,CB,Kansas City Chiefs
nfl-p00454,Matthew Bergeron,LG,Atlanta Falcons
nfl-p00455,Mike Gesicki,TE,Cincinnati Bengals
nfl-p00456,Nakobe Dean,MIKE,Las Vegas Raiders
nfl-p00457,Nohl Williams,CB,Kansas City Chiefs
nfl-p00458,Pat Freiermuth,TE,Pittsburgh Steelers
nfl-p00459,Patrick Queen,MIKE,Pittsburgh Steelers
nfl-p00460,Reed Blankenship,SS,Houston Texans
nfl-p00461,RJ Harvey,HB,Denver Broncos
nfl-p00462,Romeo Doubs,WR,New England Patriots
nfl-p00463,Spencer Fano,LT,Cleveland Browns
nfl-p00464,T'Vondre Sweat,DT,NY Jets
nfl-p00465,Tank Dell,WR,Houston Texans
nfl-p00466,Travis Jones,DT,Baltimore Ravens
nfl-p00467,Trent Brown,RT,Houston Texans
nfl-p00468,Trenton Simpson,WILL,Baltimore Ravens
nfl-p00469,Tuli Tuipulotu,LEDG,Los Angeles Chargers
nfl-p00470,Tykee Smith,SS,Tampa Bay Buccaneers
nfl-p00471,Tyler Loop,K,Baltimore Ravens
nfl-p00472,Tyson Campbell,CB,Cleveland Browns
nfl-p00473,Xavier Worthy,WR,Kansas City Chiefs
nfl-p00474,Yaya Diaby,REDG,Tampa Bay Buccaneers
nfl-p00475,Zach Wood,LS,New Orleans Saints
nfl-p00476,A'Shawn Robinson,DT,Tampa Bay Buccaneers
nfl-p00477,Aaron Rodgers,QB,Pittsburgh Steelers
nfl-p00478,Alontae Taylor,CB,Tennessee Titans
nfl-p00479,Ar'Darius Washington,FS,NY Giants
nfl-p00480,Bradley Chubb,REDG,Buffalo Bills
nfl-p00481,Bryce Baringer,P,New England Patriots
nfl-p00482,Cairo Santos,K,Chicago Bears
nfl-p00483,Calvin Ridley,WR,Tennessee Titans
nfl-p00484,Carnell Tate,WR,Tennessee Titans
nfl-p00485,Cedric Gray,WILL,Tennessee Titans
nfl-p00486,Christian Kirk,WR,San Francisco 49ers
nfl-p00487,Chuck Clark,FS,Detroit Lions
nfl-p00488,Cody Barton,MIKE,Tennessee Titans
nfl-p00489,Cole Kmet,TE,Chicago Bears
nfl-p00490,Dane Belton,FS,NY Jets
nfl-p00491,Dax Hill,CB,Cincinnati Bengals
nfl-p00492,Deonte Banks,CB,NY Giants
nfl-p00493,Derrick Harmon,DT,Pittsburgh Steelers
nfl-p00494,Devonte Wyatt,DT,Green Bay Packers
nfl-p00495,Dontayvion Wicks,WR,Philadelphia Eagles
nfl-p00496,Ed Ingram,RG,Houston Texans
nfl-p00497,Evan Engram,TE,Denver Broncos
nfl-p00498,Garrett Williams,CB,Arizona Cardinals
nfl-p00499,Hogan Hatten,LS,Detroit Lions
nfl-p00500,Isaiah McDuffie,SAM,Green Bay Packers
nfl-p00501,Jackson Powers-Johnson,RG,Las Vegas Raiders
nfl-p00502,Jake Brendel,C,San Francisco 49ers
nfl-p00503,Jake Ferguson,TE,Dallas Cowboys
nfl-p00504,Jake Bailey,P,Atlanta Falcons
nfl-p00505,Jalen Coker,WR,Carolina Panthers
nfl-p00506,Jarran Reed,DT,Seattle Seahawks
nfl-p00507,Javon Bullard,SS,Green Bay Packers
nfl-p00508,Jaxson Dart,QB,NY Giants
nfl-p00509,Jordan Battle,SS,Cincinnati Bengals
nfl-p00510,Kayvon Thibodeaux,LEDG,NY Giants
nfl-p00511,Keisean Nixon,CB,Green Bay Packers
nfl-p00512,Keldric Faulk,LEDG,Tennessee Titans
nfl-p00513,Kelvin Banks Jr,LT,New Orleans Saints
nfl-p00514,Kenny Gainwell,HB,Tampa Bay Buccaneers
nfl-p00515,Kwity Paye,REDG,Las Vegas Raiders
nfl-p00516,Malachi Lawrence,REDG,Dallas Cowboys
nfl-p00517,Malaki Starks,FS,Baltimore Ravens
nfl-p00518,Malcolm Koonce,LEDG,Las Vegas Raiders
nfl-p00519,Maliek Collins,DT,Cleveland Browns
nfl-p00520,Malik Hooker,FS,Dallas Cowboys
nfl-p00521,Matt Goncalves,RG,Indianapolis Colts
nfl-p00522,Nick Herbig,REDG,Pittsburgh Steelers
nfl-p00523,Omar Speights,WILL,Los Angeles Rams
nfl-p00524,Rachaad White,HB,Washington Commanders
nfl-p00525,Rashan Gary,LEDG,Dallas Cowboys
nfl-p00526,Rashid Shaheed,WR,Seattle Seahawks
nfl-p00527,Renardo Green,CB,San Francisco 49ers
nfl-p00528,Riley Moss,CB,Denver Broncos
nfl-p00529,Roger Rosengarten,RT,Baltimore Ravens
nfl-p00530,Rueben Bain Jr,LEDG,Tampa Bay Buccaneers
nfl-p00531,Sebastian Joseph-Day,DT,Pittsburgh Steelers
nfl-p00532,Tommy Townsend,P,Tennessee Titans
nfl-p00533,Tre Tucker,WR,Las Vegas Raiders
nfl-p00534,Trent Sieg,LS,Dallas Cowboys
nfl-p00535,Trey Amos,CB,Washington Commanders
nfl-p00536,Troy Franklin,WR,Denver Broncos
nfl-p00537,Tyleik Williams,DT,Detroit Lions
nfl-p00538,Tyler Guyton,LT,Dallas Cowboys
nfl-p00539,Tyrone Tracy Jr,HB,NY Giants
nfl-p00540,Vega Ioane,RG,Baltimore Ravens
nfl-p00541,Wil Lutz,K,Denver Broncos
nfl-p00542,Will McDonald IV,LEDG,NY Jets
nfl-p00543,Xavier Watts,SS,Atlanta Falcons
nfl-p00544,Zaire Franklin,MIKE,Green Bay Packers
nfl-p00545,Zion Johnson,LG,Cleveland Browns
nfl-p00546,Adonai Mitchell,WR,NY Jets
nfl-p00547,Andre Cisco,SS,NY Jets
nfl-p00548,Andre Szmyt,K,Cleveland Browns
nfl-p00549,Andrew Wingard,FS,Arizona Cardinals
nfl-p00550,Benjamin St-Juste,CB,Green Bay Packers
nfl-p00551,Bradley Pinion,P,Miami Dolphins
nfl-p00552,Brandon Stephens,CB,NY Jets
nfl-p00553,Calijah Kancey,DT,Tampa Bay Buccaneers
nfl-p00554,Carrington Valentine,CB,Green Bay Packers
nfl-p00555,Cashius Howell,REDG,Cincinnati Bengals
nfl-p00556,Chris Johnson,CB,Miami Dolphins
nfl-p00557,Coby Bryant,FS,Chicago Bears
nfl-p00558,Cody Mauch,RG,Tampa Bay Buccaneers
nfl-p00559,Corliss Waitman,P,San Francisco 49ers
nfl-p00560,Daniel Carlson,K,New Orleans Saints
nfl-p00561,DaRon Bland,CB,Dallas Cowboys
nfl-p00562,David Onyemata,DT,NY Jets
nfl-p00563,David Njoku,TE,Los Angeles Chargers
nfl-p00564,DeMario Douglas,WR,New England Patriots
nfl-p00565,Deone Walker,DT,Buffalo Bills
nfl-p00566,Derick Hall,LEDG,Seattle Seahawks
nfl-p00567,Derrick Moore,LEDG,Detroit Lions
nfl-p00568,Dillon Thieneman,SS,Chicago Bears
nfl-p00569,Donovan Ezeiruaku,REDG,Dallas Cowboys
nfl-p00570,Dre'Mont Jones,LEDG,New England Patriots
nfl-p00571,Eddy Pineiro,K,San Francisco 49ers
nfl-p00572,Elic Ayomanor,WR,Tennessee Titans
nfl-p00573,Eric Stokes,CB,Las Vegas Raiders
nfl-p00574,Harrison Phillips,DT,NY Jets
nfl-p00575,Jalen Nailor,WR,Las Vegas Raiders
nfl-p00576,James Pierre,CB,Minnesota Vikings
nfl-p00577,Jamien Sherwood,WILL,NY Jets
nfl-p00578,Jarrian Jones,CB,Jacksonville Jaguars
nfl-p00579,Jayden Higgins,WR,Houston Texans
nfl-p00580,Jaylinn Hawkins,FS,Baltimore Ravens
nfl-p00581,Jermaine Johnson II,REDG,Tennessee Titans
nfl-p00582,Josh Jobe,CB,Seattle Seahawks
nfl-p00583,Justice Hill,HB,Baltimore Ravens
nfl-p00584,Kadyn Proctor,LG,Miami Dolphins
nfl-p00585,Keeanu Benton,DT,Pittsburgh Steelers
nfl-p00586,Keon Coleman,WR,Buffalo Bills
nfl-p00587,Kimani Vidal,HB,Los Angeles Chargers
nfl-p00588,Kirk Cousins,QB,Las Vegas Raiders
nfl-p00589,Kyler Murray,QB,Minnesota Vikings
nfl-p00590,Luke Rhodes,LS,Indianapolis Colts
nfl-p00591,Luke Wattenberg,C,Denver Broncos
nfl-p00592,Mack Hollins,WR,New England Patriots
nfl-p00593,Malik Mustapha,SS,San Francisco 49ers
nfl-p00594,Martin Emerson Jr,CB,New Orleans Saints
nfl-p00595,Marvin Mims Jr,WR,Denver Broncos
nfl-p00596,Marvin Harrison Jr,WR,Houston Texans
nfl-p00597,Maxwell Hairston,CB,Buffalo Bills
nfl-p00598,Mike Danna,LEDG,Buffalo Bills
nfl-p00599,Moro Ojomo,DT,Philadelphia Eagles
nfl-p00600,Mykel Williams,REDG,San Francisco 49ers
nfl-p00601,Omar Cooper Jr,WR,NY Jets
nfl-p00602,Osa Odighizuwa,DT,San Francisco 49ers
nfl-p00603,Quan Martin,FS,Washington Commanders
nfl-p00604,R Mason Thomas,LEDG,Kansas City Chiefs
nfl-p00605,Rashod Bateman,WR,Baltimore Ravens
nfl-p00606,Rasul Douglas,CB,Washington Commanders
nfl-p00607,Sean Murphy-Bunting,CB,Pittsburgh Steelers
nfl-p00608,Shelby Harris,DT,NY Giants
nfl-p00609,Tank Bigsby,HB,Philadelphia Eagles
nfl-p00610,Tate Ratledge,RG,Detroit Lions
nfl-p00611,Teair Tart,DT,Los Angeles Chargers
nfl-p00612,Theo Johnson,TE,NY Giants
nfl-p00613,TJ Parker,REDG,Buffalo Bills
nfl-p00614,Trey Smack,K,Green Bay Packers
nfl-p00615,Tyjae Spears,HB,Tennessee Titans
nfl-p00616,Tyrel Dodson,WILL,Carolina Panthers
nfl-p00617,Von Miller,LEDG,Dallas Cowboys
nfl-p00618,Walker Little,LT,Jacksonville Jaguars
nfl-p00619,Walter Nolen III,DT,Arizona Cardinals
nfl-p00620,Will Fries,RG,Minnesota Vikings
nfl-p00621,Will Johnson,CB,Arizona Cardinals
nfl-p00622,Za'Darius Smith,LEDG,Atlanta Falcons
nfl-p00623,Zaven Collins,LEDG,Arizona Cardinals
nfl-p00624,Al-Quadin Muhammad,LEDG,Tampa Bay Buccaneers
nfl-p00625,Amarius Mims,RT,Cincinnati Bengals
nfl-p00626,Anfernee Jennings,LEDG,New Orleans Saints
nfl-p00627,Antonio Williams,WR,Washington Commanders
nfl-p00628,Arik Armstead,DT,Jacksonville Jaguars
nfl-p00629,Arnold Ebiketie,LEDG,Philadelphia Eagles
nfl-p00630,Austin Barber,RG,Cleveland Browns
nfl-p00631,Austin Corbett,LG,Buffalo Bills
nfl-p00632,B.J. Hill,DT,Cincinnati Bengals
nfl-p00633,Blake Miller,RT,Detroit Lions
nfl-p00634,Brady Christensen,RG,Carolina Panthers
nfl-p00635,Brandon Dorlus,DT,Atlanta Falcons
nfl-p00636,Caleb Banks,DT,Minnesota Vikings
nfl-p00637,Caleb Lomu,RT,New England Patriots
nfl-p00638,Cesar Ruiz,RG,New Orleans Saints
nfl-p00639,Chamarri Conner,SS,Kansas City Chiefs
nfl-p00640,Charles Omenihu,DT,Washington Commanders
nfl-p00641,Cooper Beebe,C,Dallas Cowboys
nfl-p00642,D.J. Jones,DT,Denver Broncos
nfl-p00643,D.J. Wonnum,REDG,Detroit Lions
nfl-p00644,Dalton Risner,RG,Cincinnati Bengals
nfl-p00645,Darnell Mooney,WR,NY Giants
nfl-p00646,Darnell Washington,TE,Pittsburgh Steelers
nfl-p00647,Davon Godchaux,DT,New Orleans Saints
nfl-p00648,Dawson Knox,TE,Buffalo Bills
nfl-p00649,De'Zhaun Stribling,WR,San Francisco 49ers
nfl-p00650,Dee Alford,CB,Buffalo Bills
nfl-p00651,Demarcus Robinson,WR,San Francisco 49ers
nfl-p00652,Denzel Boston,WR,Cleveland Browns
nfl-p00653,Denzel Perryman,MIKE,Los Angeles Chargers
nfl-p00654,Devaughn Vele,WR,New Orleans Saints
nfl-p00655,Donovan Jackson,LG,Minnesota Vikings
nfl-p00656,Drake Thomas,WILL,Seattle Seahawks
nfl-p00657,Emmanuel McNeil-Warren,FS,Cleveland Browns
nfl-p00658,Gabe Jacas,LEDG,New England Patriots
nfl-p00659,Garrett Bradbury,C,Chicago Bears
nfl-p00660,Graham Barton,C,Tampa Bay Buccaneers
nfl-p00661,Grey Zabel,LG,Seattle Seahawks
nfl-p00662,Isiah Pacheco,HB,Detroit Lions
nfl-p00663,Ivan Pace Jr,MIKE,Minnesota Vikings
nfl-p00664,Jack Jones,CB,San Francisco 49ers
nfl-p00665,Jacob Martin,LEDG,Tennessee Titans
nfl-p00666,Jadarian Price,HB,Seattle Seahawks
nfl-p00667,Jaden Hicks,SS,Kansas City Chiefs
nfl-p00668,Jahdae Barron,CB,Denver Broncos
nfl-p00669,Jake Bates,K,Detroit Lions
nfl-p00670,Jalyx Hunt,REDG,Philadelphia Eagles
nfl-p00671,Jarvis Brownlee Jr,CB,NY Jets
nfl-p00672,Jason Sanders,K,NY Jets
nfl-p00673,Jayden Daniels,QB,Washington Commanders
nfl-p00674,Jer'Zhan Newton,DT,Washington Commanders
nfl-p00675,Jonas Sanker,SS,New Orleans Saints
nfl-p00676,Jordan Stout,P,NY Giants
nfl-p00677,Jordyn Tyson,WR,New Orleans Saints
nfl-p00678,Joshua Uche,REDG,Miami Dolphins
nfl-p00679,Julian Blackmon,SS,New Orleans Saints
nfl-p00680,Kalif Raymond,WR,Chicago Bears
nfl-p00681,KaVontae Turpin,WR,Dallas Cowboys
nfl-p00682,KC Concepcion Jr,WR,Cleveland Browns
nfl-p00683,Keaton Mitchell,HB,Los Angeles Chargers
nfl-p00684,Kendre Miller,HB,New Orleans Saints
nfl-p00685,Kenyon Sadiq,TE,NY Jets
nfl-p00686,Kingsley Suamataia,LG,Kansas City Chiefs
nfl-p00687,Kool-Aid McKinstry,CB,New Orleans Saints
nfl-p00688,Kyle Dugger,SS,Cincinnati Bengals
nfl-p00689,Logan Cooke,P,Jacksonville Jaguars
nfl-p00690,Makai Lemon,WR,Philadelphia Eagles
nfl-p00691,Malcolm Roach,DT,Denver Broncos
nfl-p00692,Marques Sigle,SS,San Francisco 49ers
nfl-p00693,Mekhi Blackmon,CB,Cleveland Browns
nfl-p00694,Mike Green,REDG,Baltimore Ravens
nfl-p00695,Mitch Wishnowsky,P,New England Patriots
nfl-p00696,Monroe Freeling,RT,Carolina Panthers
nfl-p00697,Nate Hobbs,CB,San Francisco 49ers
nfl-p00698,Olu Fashanu,LT,NY Jets
nfl-p00699,Paulson Adebo,CB,NY Giants
nfl-p00700,Payton Wilson,WILL,Pittsburgh Steelers
nfl-p00701,Riley Dixon,P,Tampa Bay Buccaneers
nfl-p00702,Romello Height,LEDG,San Francisco 49ers
nfl-p00703,Ronnie Hickman,FS,Cleveland Browns
nfl-p00704,Ryan Flournoy,WR,Dallas Cowboys
nfl-p00705,Ryan Fitzgerald,K,Carolina Panthers
nfl-p00706,Samaje Perine,HB,Cincinnati Bengals
nfl-p00707,Samson Ebukam,REDG,Atlanta Falcons
nfl-p00708,Taliese Fuaga,RT,New Orleans Saints
nfl-p00709,Ted Karras,C,Cincinnati Bengals
nfl-p00710,Terrion Arnold,CB,Seattle Seahawks
nfl-p00711,Tommy Togiai,DT,Houston Texans
nfl-p00712,Tommy Doman Jr,P,Buffalo Bills
nfl-p00713,Treydan Stukes,FS,Las Vegas Raiders
nfl-p00714,Ty Johnson,HB,Buffalo Bills
nfl-p00715,Tyler Higbee,TE,Los Angeles Rams
nfl-p00716,Tyquan Thornton,WR,Kansas City Chiefs
nfl-p00717,Uchenna Nwosu,REDG,Seattle Seahawks
nfl-p00718,Zion Young,LEDG,Baltimore Ravens
nfl-p00719,A.J. Epenesa,REDG,Philadelphia Eagles
nfl-p00720,A.J. Barner,TE,Seattle Seahawks
nfl-p00721,Akeem Davis-Gaither,MIKE,Indianapolis Colts
nfl-p00722,Andrew Wylie,RG,Washington Commanders
nfl-p00723,Arden Key,REDG,Indianapolis Colts
nfl-p00724,Austin McNamara,P,NY Jets
nfl-p00725,Avieon Terrell,CB,Atlanta Falcons
nfl-p00726,Azareye'h Thomas,CB,NY Jets
nfl-p00727,Benjamin Morrison,CB,Tampa Bay Buccaneers
nfl-p00728,Braelon Allen,HB,NY Jets
nfl-p00729,Brandin Echols,CB,Pittsburgh Steelers
nfl-p00730,Brandon McManus,K,Los Angeles Rams
nfl-p00731,Brandon Aiyuk,WR,San Francisco 49ers
nfl-p00732,Bryan Bresee,DT,New Orleans Saints
nfl-p00733,Bud Clark,FS,Seattle Seahawks
nfl-p00734,C.J. Gardner-Johnson,SS,Buffalo Bills
nfl-p00735,Cade Otton,TE,Tampa Bay Buccaneers
nfl-p00736,Calvin Austin,WR,NY Giants
nfl-p00737,Cam Jurgens,C,Baltimore Ravens
nfl-p00738,Chad Ryland,K,Arizona Cardinals
nfl-p00739,Chase Bisontis,RG,Arizona Cardinals
nfl-p00740,Chop Robinson,LEDG,Miami Dolphins
nfl-p00741,Christen Miller,DT,New Orleans Saints
nfl-p00742,Christian Elliss,WILL,New England Patriots
nfl-p00743,Clark Phillips III,CB,Chicago Bears
nfl-p00744,Cole Holcomb,WILL,Pittsburgh Steelers
nfl-p00745,Colton Hood,CB,NY Giants
nfl-p00746,D'Angelo Ponds,CB,NY Jets
nfl-p00747,Dalvin Tomlinson,DT,Los Angeles Chargers
nfl-p00748,Daniel Jones,QB,Indianapolis Colts
nfl-p00749,Dante Fowler Jr,REDG,Seattle Seahawks
nfl-p00750,DaVon Hamilton,DT,Jacksonville Jaguars
nfl-p00751,Deatrich Wise Jr,DT,Washington Commanders
nfl-p00752,DeMarvion Overshown,MIKE,Dallas Cowboys
nfl-p00753,Derrick Barnes,WILL,Detroit Lions
nfl-p00754,Devin Singletary,HB,NY Giants
nfl-p00755,Dominic Zvada,K,NY Giants
nfl-p00756,Dylan Sampson,HB,Cleveland Browns
nfl-p00757,E.J. Speed,SAM,Houston Texans
nfl-p00758,Emanuel Wilson,HB,Seattle Seahawks
nfl-p00759,Emmanuel Forbes Jr,CB,Los Angeles Rams
nfl-p00760,Germie Bernard,WR,Pittsburgh Steelers
nfl-p00761,Greg Van Roten,RG,New England Patriots
nfl-p00762,Henry To'oTo'o,WILL,Houston Texans
nfl-p00763,Jahan Dotson,WR,Atlanta Falcons
nfl-p00764,Jahlani Tavai,MIKE,Jacksonville Jaguars
nfl-p00765,James Winchester,LS,Kansas City Chiefs
nfl-p00766,Jason Pinnock,SS,NY Giants
nfl-p00767,Jawaan Taylor,RT,Atlanta Falcons
nfl-p00768,Jaylin Lane,WR,Washington Commanders
nfl-p00769,Joey Slye,K,Tennessee Titans
nfl-p00770,John Jenkins,DT,Baltimore Ravens
nfl-p00771,Jon Runyan,LG,NY Giants
nfl-p00772,Jonah Elliss,LEDG,Denver Broncos
nfl-p00773,Jonathon Brooks,HB,Carolina Panthers
nfl-p00774,Jonnu Smith,TE,Green Bay Packers
nfl-p00775,Joshua Palmer,WR,Buffalo Bills
nfl-p00776,Joshua Williams,CB,Tennessee Titans
nfl-p00777,Josiah Trotter,MIKE,Tampa Bay Buccaneers
nfl-p00778,K'Lavon Chaisson,REDG,Washington Commanders
nfl-p00779,Kayden McDonald,DT,Houston Texans
nfl-p00780,Kendrick Bourne,WR,Arizona Cardinals
nfl-p00781,Kenneth Grant,DT,Miami Dolphins
nfl-p00782,Kevin Winston Jr,FS,Tennessee Titans
nfl-p00783,Keyron Crawford,REDG,Las Vegas Raiders
nfl-p00784,Lloyd Cushenberry,C,Buffalo Bills
nfl-p00785,Mac Jones,QB,San Francisco 49ers
nfl-p00786,Marcus Epps,SS,Philadelphia Eagles
nfl-p00787,Marquise Brown,WR,Philadelphia Eagles
nfl-p00788,Matt Gay,K,Las Vegas Raiders
nfl-p00789,Matt Araiza,P,Kansas City Chiefs
nfl-p00790,Max Iheanachor,RT,Pittsburgh Steelers
nfl-p00791,Micah McFadden,MIKE,NY Giants
nfl-p00792,Michael Hoecht,LEDG,Buffalo Bills
nfl-p00793,Michael Penix Jr,QB,Atlanta Falcons
nfl-p00794,Mike Sainristil,CB,Washington Commanders
nfl-p00795,Nahshon Wright,CB,NY Jets
nfl-p00796,Nic Scourton,LEDG,Carolina Panthers
nfl-p00797,Nick Scott,SS,Carolina Panthers
nfl-p00798,O'Cyrus Torrence,RG,Buffalo Bills
nfl-p00799,Ollie Gordon II,HB,Miami Dolphins
nfl-p00800,Orlando Brown Jr,LT,Cincinnati Bengals
nfl-p00801,Oronde Gadsden,TE,Los Angeles Chargers
nfl-p00802,Pete Werner,MIKE,New Orleans Saints
nfl-p00803,Peter Woods,DT,Kansas City Chiefs
nfl-p00804,Ray Davis,HB,Buffalo Bills
nfl-p00805,Roger McCreary,CB,Detroit Lions
nfl-p00806,Ryan Rehkow,P,Cincinnati Bengals
nfl-p00807,Ryan Wright,P,New Orleans Saints
nfl-p00808,Teddye Buchanan,WILL,Baltimore Ravens
nfl-p00809,Teven Jenkins,RG,Cleveland Browns
nfl-p00810,Tony Adams,SS,Tennessee Titans
nfl-p00811,Tory Taylor,P,Chicago Bears
nfl-p00812,Tory Horton,WR,Seattle Seahawks
nfl-p00813,Troy Fautanu,LT,Pittsburgh Steelers
nfl-p00814,Tutu Atwell,WR,Los Angeles Rams
nfl-p00815,Ty Okada,FS,Seattle Seahawks
nfl-p00816,Tyler Nubin,SS,NY Giants
nfl-p00817,Tyrice Knight,WILL,Seattle Seahawks
nfl-p00818,Tyrique Stevenson Sr,CB,Chicago Bears
nfl-p00819,Upton Stout,CB,San Francisco 49ers
nfl-p00820,A.J. Dillon,HB,Carolina Panthers
nfl-p00821,A.J. Haulcy,SS,Indianapolis Colts
nfl-p00822,Alec Ingold,FB,Los Angeles Chargers
nfl-p00823,Andres Borregales,K,New England Patriots
nfl-p00824,Andrew Mukuba,FS,Philadelphia Eagles
nfl-p00825,Anthony Nelson,REDG,Tampa Bay Buccaneers
nfl-p00826,Anthony Hill Jr.,MIKE,Tennessee Titans
nfl-p00827,Asante Samuel,CB,Pittsburgh Steelers
nfl-p00828,Austin Ekeler,HB,Washington Commanders
nfl-p00829,Austin Hooper,TE,Atlanta Falcons
nfl-p00830,Ben Bredeson,LG,Tampa Bay Buccaneers
nfl-p00831,Ben Powers,LG,Denver Broncos
nfl-p00832,Blake Gillikin,P,Arizona Cardinals
nfl-p00833,Bobby Brown III,DT,Carolina Panthers
nfl-p00834,Brandin Cooks,WR,San Francisco 49ers
nfl-p00835,Brashard Smith,HB,Kansas City Chiefs
nfl-p00836,Braxton Jones,LT,Chicago Bears
nfl-p00837,Cade Mays,C,Detroit Lions
nfl-p00838,Cam Hart,CB,Los Angeles Chargers
nfl-p00839,Cam Lewis,SS,Chicago Bears
nfl-p00840,Cameron Thomas,REDG,Atlanta Falcons
nfl-p00841,Chigoziem Okonkwo,TE,Washington Commanders
nfl-p00842,Chimere Dike,WR,Tennessee Titans
nfl-p00843,Christian Izien,SS,Detroit Lions
nfl-p00844,Da'Shawn Hand,DT,Atlanta Falcons
nfl-p00845,Dameon Pierce,HB,Philadelphia Eagles
nfl-p00846,Dani Dennis-Sutton,REDG,Green Bay Packers
nfl-p00847,Daniel Whelan,P,Green Bay Packers
nfl-p00848,Darien Porter,CB,Las Vegas Raiders
nfl-p00849,Darrell Baker Jr,CB,Miami Dolphins
nfl-p00850,Davison Igbinosun,CB,Buffalo Bills
nfl-p00851,Demetrius Knight Jr,WILL,Cincinnati Bengals
nfl-p00852,Dennis Gardeck,SAM,Jacksonville Jaguars
nfl-p00853,Devin Duvernay,WR,Arizona Cardinals
nfl-p00854,Dorian Williams,WILL,Buffalo Bills
nfl-p00855,Drew Stevens,K,Washington Commanders
nfl-p00856,Elijah Ponder,REDG,New England Patriots
nfl-p00857,Emmanuel Pregnon,LG,Jacksonville Jaguars
nfl-p00858,Eric Murray,FS,Jacksonville Jaguars
nfl-p00859,Felix Anudike-Uzomah,REDG,Kansas City Chiefs
nfl-p00860,Folorunso Fatukasi,DT,Las Vegas Raiders
nfl-p00861,Geno Smith,QB,NY Jets
nfl-p00862,Ifeatu Melifonwu,SS,Tampa Bay Buccaneers
nfl-p00863,Isaac TeSlaa,WR,Detroit Lions
nfl-p00864,J.J. Jansen,LS,Carolina Panthers
nfl-p00865,Jacoby Brissett,QB,Arizona Cardinals
nfl-p00866,Jaishawn Barham,WILL,Dallas Cowboys
nfl-p00867,Jake Golday,WILL,Minnesota Vikings
nfl-p00868,Jalen McMillan,WR,Tampa Bay Buccaneers
nfl-p00869,Jaylin Noel,WR,Houston Texans
nfl-p00870,Jedrick Wills Jr,LT,Arizona Cardinals
nfl-p00871,Jermod McCoy,CB,Las Vegas Raiders
nfl-p00872,Ji'Ayir Brown,FS,San Francisco 49ers
nfl-p00873,Jordan Howden,FS,New Orleans Saints
nfl-p00874,Josaiah Stewart,LEDG,Los Angeles Rams
nfl-p00875,Jowon Briggs,DT,NY Jets
nfl-p00876,JT Tuimoloau,REDG,Indianapolis Colts
nfl-p00877,Justin Strnad,WILL,Denver Broncos
nfl-p00878,Kai Kroeger,P,Houston Texans
nfl-p00879,Kaleb Johnson,HB,Green Bay Packers
nfl-p00880,Kei'Trel Clark,CB,Arizona Cardinals
nfl-p00881,Keylan Rutledge,LG,Houston Texans
nfl-p00882,Kris Jenkins Jr,DT,Cincinnati Bengals
nfl-p00883,Laken Tomlinson,LG,Green Bay Packers
nfl-p00884,Landon Jackson,DT,Buffalo Bills
nfl-p00885,Lee Hunter,DT,Carolina Panthers
nfl-p00886,Levi Onwuzurike,DT,Detroit Lions
nfl-p00887,Logan Hall,DT,Houston Texans
nfl-p00888,Malcolm Rodriguez,SAM,Detroit Lions
nfl-p00889,Mason Taylor,TE,NY Jets
nfl-p00890,Max Melton,CB,Arizona Cardinals
nfl-p00891,Michael Carter II,SS,Philadelphia Eagles
nfl-p00892,Mike Hughes,CB,Atlanta Falcons
nfl-p00893,Montaric Brown,CB,Jacksonville Jaguars
nfl-p00894,Myles Murphy,LEDG,Cincinnati Bengals
nfl-p00895,Nathan Shepherd,DT,New Orleans Saints
nfl-p00896,Nehemiah Pritchett,CB,Seattle Seahawks
nfl-p00897,Noah Fant,TE,New Orleans Saints
nfl-p00898,P.J. Locke,FS,Dallas Cowboys
nfl-p00899,Robert Hainsey,C,Jacksonville Jaguars
nfl-p00900,Sam Martin,P,Carolina Panthers
nfl-p00901,Shemar Stewart,LEDG,Cincinnati Bengals
nfl-p00902,Tavius Robinson,LEDG,Baltimore Ravens
nfl-p00903,Terence Steele,RT,Dallas Cowboys
nfl-p00904,Tershawn Wharton,DT,Carolina Panthers
nfl-p00905,Tim Patrick,WR,NY Jets
nfl-p00906,Tress Way,P,Washington Commanders
nfl-p00907,Trevin Wallace,MIKE,NY Jets
nfl-p00908,Trevon Diggs,CB,Seattle Seahawks
nfl-p00909,Treylon Burks,WR,Washington Commanders
nfl-p00910,Tyler Steen,RG,Philadelphia Eagles
nfl-p00911,Tyler Davis,DT,Los Angeles Rams
nfl-p00912,Tyler Bass,K,Buffalo Bills
nfl-p00913,Will Shipley,HB,Philadelphia Eagles
nfl-p00914,Wyatt Teller,LG,Houston Texans
nfl-p00915,Xavier Legette,WR,Carolina Panthers
nfl-p00916,Zane Gonzalez,K,Miami Dolphins
nfl-p00917,Aaron Banks,LG,Green Bay Packers
nfl-p00918,Adam Butler,DT,Las Vegas Raiders
nfl-p00919,Aireontae Ersery,LT,Houston Texans
nfl-p00920,Albert Regis,DT,Jacksonville Jaguars
nfl-p00921,Ameer Abdullah,HB,Jacksonville Jaguars
nfl-p00922,Andrei Iosivas,WR,Cincinnati Bengals
nfl-p00923,Andrew Billings,DT,Arizona Cardinals
nfl-p00924,Ashtyn Davis,FS,San Francisco 49ers
nfl-p00925,Austin Jackson,RT,Miami Dolphins
nfl-p00926,Austin Booker,LEDG,Chicago Bears
nfl-p00927,Baron Browning,LEDG,Arizona Cardinals
nfl-p00928,Billy Bowman Jr,CB,Atlanta Falcons
nfl-p00929,Blake Grupe,K,Los Angeles Rams
nfl-p00930,Brett Thorson,P,Minnesota Vikings
nfl-p00931,C.J. Henderson,CB,Atlanta Falcons
nfl-p00932,Caden Curry,LEDG,Indianapolis Colts
nfl-p00933,Caleb Ransaw,FS,Jacksonville Jaguars
nfl-p00934,Cam Ward,QB,Tennessee Titans
nfl-p00935,Cameron Johnston,P,Pittsburgh Steelers
nfl-p00936,Chau Smith-Wade,CB,Carolina Panthers
nfl-p00937,Chauncey Golston,DT,NY Giants
nfl-p00938,Chris Paul,LG,Washington Commanders
nfl-p00939,Chris Rodriguez Jr,HB,Jacksonville Jaguars
nfl-p00940,Christian Mahogany,LG,Detroit Lions
nfl-p00941,Christian Rozeboom,WILL,Tampa Bay Buccaneers
nfl-p00942,CJ Allen,MIKE,Indianapolis Colts
nfl-p00943,Colby Parkinson,TE,Los Angeles Rams
nfl-p00944,Connor Heyward,FB,Las Vegas Raiders
nfl-p00945,Damar Hamlin,FS,Buffalo Bills
nfl-p00946,Darius Cooper,WR,Philadelphia Eagles
nfl-p00947,Dayo Odeyingbo,REDG,Chicago Bears
nfl-p00948,Derek Barnett,LEDG,Cleveland Browns
nfl-p00949,Devin White,WILL,Detroit Lions
nfl-p00950,Domonique Orange,DT,Minnesota Vikings
nfl-p00951,Dyami Brown,WR,Washington Commanders
nfl-p00952,Elijah Moore,WR,Philadelphia Eagles
nfl-p00953,Fernando Mendoza,QB,Las Vegas Raiders
nfl-p00954,Greg Dortch,WR,Buffalo Bills
nfl-p00955,Greg Gaines,DT,Buffalo Bills
nfl-p00956,Hezekiah Masses,CB,Las Vegas Raiders
nfl-p00957,Isaiah McGuire,REDG,Cleveland Browns
nfl-p00958,Isaiah Simmons,FS,Carolina Panthers
nfl-p00959,Jack Gibbens,MIKE,Arizona Cardinals
nfl-p00960,Jack Bech,WR,Las Vegas Raiders
nfl-p00961,Jadon Canady,SS,Kansas City Chiefs
nfl-p00962,Jake Slaughter,C,Los Angeles Chargers
nfl-p00963,Jakobe Thomas,SS,Minnesota Vikings
nfl-p00964,Jakorian Bennett,CB,Philadelphia Eagles
nfl-p00965,Jaleel McLaughlin,HB,Cleveland Browns
nfl-p00966,Jalen Tolbert,WR,Miami Dolphins
nfl-p00967,Javon Kinlaw,DT,Washington Commanders
nfl-p00968,Jaylen Wright,HB,Miami Dolphins
nfl-p00969,Jaylon Jones,CB,Tennessee Titans
nfl-p00970,Jeremy Reaves,FS,Washington Commanders
nfl-p00971,Joe Flacco,QB,Cincinnati Bengals
nfl-p00972,John Metchie III,WR,Carolina Panthers
nfl-p00973,Jonah Coleman,HB,Denver Broncos
nfl-p00974,Jonathan Bullard,DT,Dallas Cowboys
nfl-p00975,Jordan James,HB,San Francisco 49ers
nfl-p00976,Jordan Meredith,RG,NY Jets
nfl-p00977,Jordan Burch,REDG,Arizona Cardinals
nfl-p00978,Joseph Ossai,LEDG,NY Jets
nfl-p00979,Josh Conerly Jr,RT,Washington Commanders
nfl-p00980,Josh Oliver,TE,Minnesota Vikings
nfl-p00981,JuJu Brents,CB,Miami Dolphins
nfl-p00982,Justin Eboigbe,DT,Los Angeles Chargers
nfl-p00983,Kaelon Black,HB,San Francisco 49ers
nfl-p00984,Keion White,REDG,San Francisco 49ers
nfl-p00985,Keionte Scott,CB,Tampa Bay Buccaneers
nfl-p00986,Kelee Ringo,CB,Philadelphia Eagles
nfl-p00987,Khyiris Tonga,DT,Kansas City Chiefs
nfl-p00988,Kingsley Enagbare,REDG,NY Jets
nfl-p00989,Kris Abrams-Draine,CB,Denver Broncos
nfl-p00990,Kyle Williams,WR,New England Patriots
nfl-p00991,Malachi Fields,WR,NY Giants
nfl-p00992,Malik Harrison,MIKE,NY Giants
nfl-p00993,Malik Davis,HB,Dallas Cowboys
nfl-p00994,Malik Washington,WR,Miami Dolphins
nfl-p00995,Malik Muhammad II,CB,Chicago Bears
nfl-p00996,MarShawn Lloyd,HB,Green Bay Packers
nfl-p00997,Mike Washington Jr,HB,Las Vegas Raiders
nfl-p00998,Noah Gray,TE,Kansas City Chiefs
nfl-p00999,Olamide Zaccheaus,WR,Atlanta Falcons
nfl-p01000,Oluwafemi Oladejo,REDG,Tennessee Titans
nfl-p01001,Ozzy Trapilo,LT,Chicago Bears
nfl-p01002,Pat Bryant II,WR,Denver Broncos
nfl-p01003,Patrick Mekari,RG,Jacksonville Jaguars
nfl-p01004,Payton Turner,LEDG,Detroit Lions
nfl-p01005,Quincy Riley,CB,New Orleans Saints
nfl-p01006,Robbie Ouzts,FB,Seattle Seahawks
nfl-p01007,Ruke Orhorhoro,DT,Jacksonville Jaguars
nfl-p01008,Ryan Eckley,P,Baltimore Ravens
nfl-p01009,Sam Williams,LEDG,Cleveland Browns
nfl-p01010,Starling Thomas V,CB,Arizona Cardinals
nfl-p01011,Sydney Brown,SS,Atlanta Falcons
nfl-p01012,T.J. Sanders,DT,Buffalo Bills
nfl-p01013,Tez Johnson,WR,Tampa Bay Buccaneers
nfl-p01014,Tommy Tremble,TE,Carolina Panthers
nfl-p01015,Tre' Harris,WR,Los Angeles Chargers
nfl-p01016,Tyler Ott,LS,Washington Commanders
nfl-p01017,Tyler Onyedim,DT,Denver Broncos
nfl-p01018,Tyree Wilson,LEDG,New Orleans Saints
nfl-p01019,Ventrell Miller,WILL,Jacksonville Jaguars
nfl-p01020,Warren McClendon Jr,RT,Los Angeles Rams
nfl-p01021,Wesley Williams,REDG,Jacksonville Jaguars
nfl-p01022,Xavier Hutchinson,WR,Houston Texans
nfl-p01023,Zach Harrison,DT,Atlanta Falcons
nfl-p01024,Zachariah Branch,WR,Atlanta Falcons
nfl-p01025,Adetomiwa Adebawore,DT,Indianapolis Colts
nfl-p01026,Alex Wright,LEDG,Cleveland Browns
nfl-p01027,Alfred Collins,DT,San Francisco 49ers
nfl-p01028,Anthony Bradford,RG,Seattle Seahawks
nfl-p01029,Ashton Dulin,WR,Indianapolis Colts
nfl-p01030,Ashton Gillotte,REDG,Kansas City Chiefs
nfl-p01031,Avonte Maddox,FS,Detroit Lions
nfl-p01032,Ben Bartch,LG,Detroit Lions
nfl-p01033,Bo Melton,WR,Green Bay Packers
nfl-p01034,Brandon Cisse,CB,Green Bay Packers
nfl-p01035,Braxton Berrios,WR,NY Giants
nfl-p01036,Brenen Thompson,WR,Los Angeles Chargers
nfl-p01037,Bud Dupree,LEDG,Los Angeles Chargers
nfl-p01038,Caleb Douglas,WR,Miami Dolphins
nfl-p01039,Caleb Tiernan,RT,Minnesota Vikings
nfl-p01040,Chris Brazzell II,WR,Carolina Panthers
nfl-p01041,Chris McClellan,DT,Green Bay Packers
nfl-p01042,Cole Strange,RG,Los Angeles Chargers
nfl-p01043,Cole Van Lanen,RT,Jacksonville Jaguars
nfl-p01044,Dadrion Taylor-Demerson,FS,Arizona Cardinals
nfl-p01045,Dan Moore Jr,LT,Tennessee Titans
nfl-p01046,Daniel Faalele,LG,Jacksonville Jaguars
nfl-p01047,Darius Robinson,DT,Arizona Cardinals
nfl-p01048,Darius Alexander,DT,NY Giants
nfl-p01049,Darrell Jackson Jr,DT,NY Jets
nfl-p01050,Daylen Everette,CB,Pittsburgh Steelers
nfl-p01051,Dee Winters,WILL,Dallas Cowboys
nfl-p01052,Denzel Burke,CB,Arizona Cardinals
nfl-p01053,Dillon Radunz,LG,New Orleans Saints
nfl-p01054,DJ Glaze,RT,Las Vegas Raiders
nfl-p01055,Efton Chism III,WR,New England Patriots
nfl-p01056,Eli Stowers,TE,Philadelphia Eagles
nfl-p01057,Ennis Rakestraw Jr,CB,Detroit Lions
nfl-p01058,Evan Brown,C,Houston Texans
nfl-p01059,Febechi Nwaiwu,RG,Houston Texans
nfl-p01060,Foster Moreau,TE,Houston Texans
nfl-p01061,Genesis Smith,SS,Los Angeles Chargers
nfl-p01062,Gennings Dunker,LG,Pittsburgh Steelers
nfl-p01063,Gracen Halton,DT,San Francisco 49ers
nfl-p01064,Hunter Luepke,FB,Dallas Cowboys
nfl-p01065,Isaac Yiadom,CB,Washington Commanders
nfl-p01066,Isaac Guerendo,HB,San Francisco 49ers
nfl-p01067,J.J. McCarthy,QB,NY Giants
nfl-p01068,Ja'Kobi Lane,WR,Baltimore Ravens
nfl-p01069,Ja'Marcus Ingram,CB,Houston Texans
nfl-p01070,Jack Sawyer,LEDG,Pittsburgh Steelers
nfl-p01071,Jake Tonges,TE,San Francisco 49ers
nfl-p01072,Jalen Farmer,RG,Indianapolis Colts
nfl-p01073,Jamal Adams,WILL,Minnesota Vikings
nfl-p01074,Jaylon Moore,RT,Kansas City Chiefs
nfl-p01075,Jeremy McNichols,HB,Washington Commanders
nfl-p01076,Jonathan Jones,CB,Philadelphia Eagles
nfl-p01077,Jordan Whittington,WR,Los Angeles Rams
nfl-p01078,Jordan Morgan,LT,Green Bay Packers
nfl-p01079,Josh Myers,C,NY Jets
nfl-p01080,Joshua Josephs,LEDG,Washington Commanders
nfl-p01081,Kamari Ramsey,FS,Houston Texans
nfl-p01082,Kindle Vildor,CB,New England Patriots
nfl-p01083,Logan Jones,C,Chicago Bears
nfl-p01084,Luke McCaffrey,WR,Washington Commanders
nfl-p01085,Malik Willis,QB,Miami Dolphins
nfl-p01086,Marcus Mariota,QB,Washington Commanders
nfl-p01087,Mario Edwards Jr,DT,Houston Texans
nfl-p01088,Markel Bell,RT,Philadelphia Eagles
nfl-p01089,Markquese Bell,SS,Dallas Cowboys
nfl-p01090,Matt Pryor,RG,New England Patriots
nfl-p01091,Mike Hall Jr,DT,Cleveland Browns
nfl-p01092,Mike Ford Jr,CB,Atlanta Falcons
nfl-p01093,Ogbo Okoronkwo,LEDG,San Francisco 49ers
nfl-p01094,Patrick Jones II,REDG,Carolina Panthers
nfl-p01095,Princely Umanmielen,REDG,Carolina Panthers
nfl-p01096,Roschon Johnson,HB,Chicago Bears
nfl-p01097,Ross Matiscik,LS,Jacksonville Jaguars
nfl-p01098,Roy Robertson-Harris,DT,NY Giants
nfl-p01099,Roy Lopez,DT,Arizona Cardinals
nfl-p01100,Shavon Revel Jr,CB,Dallas Cowboys
nfl-p01101,Shemar Turner,REDG,Chicago Bears
nfl-p01102,SirVocea Dennis,MIKE,Tampa Bay Buccaneers
nfl-p01103,Skyy Moore,WR,Green Bay Packers
nfl-p01104,Solomon Thomas,DT,Tennessee Titans
nfl-p01105,Ted Hurst III,WR,Tampa Bay Buccaneers
nfl-p01106,Thomas Hennessy,LS,NY Jets
nfl-p01107,Tim Settle Jr,DT,Washington Commanders
nfl-p01108,Trey Zuhn III,RT,Las Vegas Raiders
nfl-p01109,Trey Moore,LEDG,Miami Dolphins
nfl-p01110,Ty Robinson,DT,Philadelphia Eagles
nfl-p01111,Ty Chandler,HB,New Orleans Saints
nfl-p01112,Tyler Conklin,TE,Detroit Lions
nfl-p01113,Willie Gay Jr,SAM,Miami Dolphins
nfl-p01114,Zavion Thomas,WR,Chicago Bears
nfl-p01115,Adam Trautman,TE,Denver Broncos
nfl-p01116,Akayleb Evans,CB,Carolina Panthers
nfl-p01117,Andrew Vorhees,LG,Baltimore Ravens
nfl-p01118,Bam Knight,HB,Arizona Cardinals
nfl-p01119,Beaux Limmer,RG,Los Angeles Rams
nfl-p01120,Blake Brandel,C,Minnesota Vikings
nfl-p01121,Brandon Coleman,LT,Washington Commanders
nfl-p01122,Broderick Jones,LT,Dallas Cowboys
nfl-p01123,Broderick Washington Jr,DT,Baltimore Ravens
nfl-p01124,Chandler Rivers,CB,Baltimore Ravens
nfl-p01125,Chris Bell,WR,Miami Dolphins
nfl-p01126,Chris Manhertz,TE,NY Giants
nfl-p01127,Christian Haynes,LG,Seattle Seahawks
nfl-p01128,D'Marco Jackson,WILL,Chicago Bears
nfl-p01129,Damone Clark,MIKE,Detroit Lions
nfl-p01130,Danny Stutsman,MIKE,New Orleans Saints
nfl-p01131,Dante Stills,DT,Arizona Cardinals
nfl-p01132,Darrick Forrest,FS,San Francisco 49ers
nfl-p01133,David Walker,REDG,Tampa Bay Buccaneers
nfl-p01134,David Moore,WR,Carolina Panthers
nfl-p01135,DeAndre Carter,WR,Detroit Lions
nfl-p01136,Del'Shawn Phillips,SAM,Los Angeles Chargers
nfl-p01137,Devin Moore,CB,Dallas Cowboys
nfl-p01138,Devontez Walker,WR,Baltimore Ravens
nfl-p01139,Dylan Fairchild,LG,Cincinnati Bengals
nfl-p01140,Elijah Sarratt,WR,Baltimore Ravens
nfl-p01141,Elijah Arroyo,TE,Seattle Seahawks
nfl-p01142,Elijah Wilkinson,RT,Arizona Cardinals
nfl-p01143,Emery Jones Jr,RG,Baltimore Ravens
nfl-p01144,Emmett Johnson,HB,Kansas City Chiefs
nfl-p01145,Fabian Moreau,CB,Washington Commanders
nfl-p01146,Gunnar Helm,TE,Tennessee Titans
nfl-p01147,Isaiah Pola-Mao,FS,Las Vegas Raiders
nfl-p01148,Ja'Sir Taylor,CB,Cincinnati Bengals
nfl-p01149,Jack Sanborn,MIKE,Chicago Bears
nfl-p01150,Jacob Cowing,WR,San Francisco 49ers
nfl-p01151,Jake Andrews,C,Houston Texans
nfl-p01152,Jalen Royals,WR,Kansas City Chiefs
nfl-p01153,Jamaree Caldwell,DT,Los Angeles Chargers
nfl-p01154,Jameis Winston,QB,NY Giants
nfl-p01155,James Houston IV,LEDG,Dallas Cowboys
nfl-p01156,Jared Wilson,C,New England Patriots
nfl-p01157,Jay Ward,SS,Minnesota Vikings
nfl-p01158,Jeremiah Wright,RG,New Orleans Saints
nfl-p01159,Jerry Tillery,DT,Indianapolis Colts
nfl-p01160,Jonathan Mingo,WR,Dallas Cowboys
nfl-p01161,Jonathan Owens,FS,Indianapolis Colts
nfl-p01162,Jordan Phillips,DT,Miami Dolphins
nfl-p01163,Josh Jones,LT,Seattle Seahawks
nfl-p01164,Josh Newton,CB,Cincinnati Bengals
nfl-p01165,Joshua Farmer,DT,New England Patriots
nfl-p01166,Juice Scruggs,C,Detroit Lions
nfl-p01167,Julian Neal,CB,Seattle Seahawks
nfl-p01168,K'Von Wallace,FS,Baltimore Ravens
nfl-p01169,Kage Casey,LG,Denver Broncos
nfl-p01170,Kaleb Elarms-Orr,WILL,Buffalo Bills
nfl-p01171,Kaleb Proctor,DT,Arizona Cardinals
nfl-p01172,Kaytron Allen,HB,Miami Dolphins
nfl-p01173,Keagen Trost,RT,Los Angeles Rams
nfl-p01174,Khristian Boyd,DT,New Orleans Saints
nfl-p01175,Konata Mumpfield,WR,Los Angeles Rams
nfl-p01176,Kyle Louis,SS,Miami Dolphins
nfl-p01177,LeQuint Allen Jr,HB,Jacksonville Jaguars
nfl-p01178,LT Overton,DT,Dallas Cowboys
nfl-p01179,Luke Fortner,C,Carolina Panthers
nfl-p01180,Maason Smith,DT,Atlanta Falcons
nfl-p01181,Mac McWilliams,CB,Philadelphia Eagles
nfl-p01182,Malachi Moore,FS,NY Jets
nfl-p01183,Marcus Harris,CB,Tennessee Titans
nfl-p01184,Max Bredeson,FB,Minnesota Vikings
nfl-p01185,Michael Carter,HB,Tennessee Titans
nfl-p01186,Michael Taaffe,FS,Miami Dolphins
nfl-p01187,Micheal Clemons,LEDG,Indianapolis Colts
nfl-p01188,Mo Alie-Cox,TE,Indianapolis Colts
nfl-p01189,Neville Gallimore,DT,Chicago Bears
nfl-p01190,Nick Allegretti,C,Washington Commanders
nfl-p01191,Nick Martin,WILL,San Francisco 49ers
nfl-p01192,Noah Igbinoghene,CB,Cleveland Browns
nfl-p01193,Omarr Norman-Lott,DT,Kansas City Chiefs
nfl-p01194,Que Robinson,LEDG,Denver Broncos
nfl-p01195,Reid Ferguson,LS,Buffalo Bills
nfl-p01196,Rock Ya-Sin,CB,Detroit Lions
nfl-p01197,Rodney Thomas II,FS,Seattle Seahawks
nfl-p01198,Roman Wilson,WR,Pittsburgh Steelers
nfl-p01199,Ronnie Harrison Jr,WILL,Miami Dolphins
nfl-p01200,Sean Tucker,HB,Tampa Bay Buccaneers
nfl-p01201,Shy Tuttle,DT,Washington Commanders
nfl-p01202,Skyler Bell,WR,Buffalo Bills
nfl-p01203,Tacario Davis,CB,Cincinnati Bengals
nfl-p01204,Tahj Brooks,HB,Cincinnati Bengals
nfl-p01205,Tai Felton,WR,Minnesota Vikings
nfl-p01206,Tanoh Kpassagnon,REDG,Tennessee Titans
nfl-p01207,Terrell Burgess,FS,Tennessee Titans
nfl-p01208,Tre Brown,CB,NY Jets
nfl-p01209,Trevis Gipson Sr,LEDG,Carolina Panthers
nfl-p01210,Trevor Penning,LG,Los Angeles Chargers
nfl-p01211,Trevor Etienne,HB,Carolina Panthers
nfl-p01212,Troy Dye,WILL,Los Angeles Chargers
nfl-p01213,Tua Tagovailoa,QB,Atlanta Falcons
nfl-p01214,Ty Simpson,QB,Los Angeles Rams
nfl-p01215,Tylan Wallace,WR,Cleveland Browns
nfl-p01216,Will Lee III,CB,Carolina Panthers
nfl-p01217,Wyatt Milum,RG,Jacksonville Jaguars
nfl-p01218,Zakee Wheatley,FS,Carolina Panthers
nfl-p01219,Alec Anderson,LG,Buffalo Bills
nfl-p01220,Alex Palczewski,RG,Denver Broncos
nfl-p01221,Andy Dalton,QB,Atlanta Falcons
nfl-p01222,Anthony Belton,RT,Green Bay Packers
nfl-p01223,Audric Estime,HB,Cleveland Browns
nfl-p01224,Barion Brown,WR,New Orleans Saints
nfl-p01225,Barryn Sorrell,REDG,Green Bay Packers
nfl-p01226,Beau Stephens,RG,Seattle Seahawks
nfl-p01227,Ben Skowronek,WR,Pittsburgh Steelers
nfl-p01228,Blake Fisher,LT,Houston Texans
nfl-p01229,Brennan Jackson,LEDG,Las Vegas Raiders
nfl-p01230,Bryce Boettcher,WILL,Indianapolis Colts
nfl-p01231,Bryce Lance,WR,New Orleans Saints
nfl-p01232,Caleb Rogers,RG,Las Vegas Raiders
nfl-p01233,Cam Jackson,DT,Carolina Panthers
nfl-p01234,Casey Kreiter,LS,Arizona Cardinals
nfl-p01235,Cedric Johnson,LEDG,Cincinnati Bengals
nfl-p01236,Charles Grant,LT,Las Vegas Raiders
nfl-p01237,Charlie Jones,WR,NY Giants
nfl-p01238,Cody Simon,WILL,Arizona Cardinals
nfl-p01239,Colbie Young,WR,Cincinnati Bengals
nfl-p01240,Collin Oliver,REDG,Green Bay Packers
nfl-p01241,Cyrus Allen,WR,Kansas City Chiefs
nfl-p01242,Damarri Mathis,CB,Cleveland Browns
nfl-p01243,Daniel Bellinger,TE,Tennessee Titans
nfl-p01244,Demond Claiborne,HB,Minnesota Vikings
nfl-p01245,Demonte Capehart,DT,Tampa Bay Buccaneers
nfl-p01246,Derius Davis,WR,Los Angeles Chargers
nfl-p01247,Deshaun Watson,QB,Cleveland Browns
nfl-p01248,DeWayne Carter,DT,Buffalo Bills
nfl-p01249,DJ Giddens,HB,Indianapolis Colts
nfl-p01250,Dondrea Tillman,REDG,Denver Broncos
nfl-p01251,Durham Smythe,TE,Baltimore Ravens
nfl-p01252,Elijah Roberts,DT,Tampa Bay Buccaneers
nfl-p01253,Ephesians Prysock,CB,San Francisco 49ers
nfl-p01254,Ethan Pocic,C,Baltimore Ravens
nfl-p01255,Fernando Carmona Jr,RG,Tennessee Titans
nfl-p01256,Gardner Minshew II,QB,Arizona Cardinals
nfl-p01257,George Gumbs Jr,REDG,Indianapolis Colts
nfl-p01258,Greg Dulcich,TE,Miami Dolphins
nfl-p01259,Isaiah Davis,HB,NY Jets
nfl-p01260,Jaden Crumedy,DT,Houston Texans
nfl-p01261,Jalen Huskey,FS,Jacksonville Jaguars
nfl-p01262,Jalen Travis,RT,Indianapolis Colts
nfl-p01263,Jarrett Patterson,C,San Francisco 49ers
nfl-p01264,Jaylin Smith,CB,Houston Texans
nfl-p01265,Joe Milton,QB,Philadelphia Eagles
nfl-p01266,Jon Gaines II,RG,Arizona Cardinals
nfl-p01267,Jordan Hancock,SS,Buffalo Bills
nfl-p01268,Jovaughn Gwyn,C,Baltimore Ravens
nfl-p01269,Justin Fields,QB,Kansas City Chiefs
nfl-p01270,Justin Walley,CB,Indianapolis Colts
nfl-p01271,Karl Brooks,DT,Green Bay Packers
nfl-p01272,KeAndre Lambert-Smith,WR,Los Angeles Chargers
nfl-p01273,Kendrick Law,WR,Detroit Lions
nfl-p01274,Kentavius Street,DT,Chicago Bears
nfl-p01275,Kevin Coleman Jr,WR,Miami Dolphins
nfl-p01276,LaJohntay Wester,WR,Baltimore Ravens
nfl-p01277,Larry Borom,RT,Detroit Lions
nfl-p01278,Lathan Ransom,SS,Carolina Panthers
nfl-p01279,Logan Lee,DT,Pittsburgh Steelers
nfl-p01280,Lucas Patrick,C,Washington Commanders
nfl-p01281,Luke Musgrave,TE,Green Bay Packers
nfl-p01282,M.J. Stewart Jr,SS,Houston Texans
nfl-p01283,Mason Tipton,WR,New Orleans Saints
nfl-p01284,Max Klare,TE,Los Angeles Rams
nfl-p01285,Mekhi Wingo,DT,Detroit Lions
nfl-p01286,Myles Harden,CB,Cleveland Browns
nfl-p01287,Nick McCloud,CB,Chicago Bears
nfl-p01288,Nick Moore,LS,Baltimore Ravens
nfl-p01289,Nick Barrett,DT,Los Angeles Chargers
nfl-p01290,Noah Sewell,SAM,Chicago Bears
nfl-p01291,Percy Butler,FS,Washington Commanders
nfl-p01292,R.J. Mickens,FS,Los Angeles Chargers
nfl-p01293,Sai'vion Jones,DT,Denver Broncos
nfl-p01294,Savion Williams,WR,Green Bay Packers
nfl-p01295,Sean Rhyan,C,Green Bay Packers
nfl-p01296,Spencer Burford,LG,Las Vegas Raiders
nfl-p01297,T.J. Bass,LG,Dallas Cowboys
nfl-p01298,T.J. Tampa Jr,CB,Baltimore Ravens
nfl-p01299,T.J. Slaton Jr,DT,Cincinnati Bengals
nfl-p01300,Tatum Bethune,MIKE,San Francisco 49ers
nfl-p01301,Terrance Ferguson,TE,Los Angeles Rams
nfl-p01302,Theo Jackson,FS,Minnesota Vikings
nfl-p01303,Thomas Harper,FS,Detroit Lions
nfl-p01304,Travis Burke,RT,Los Angeles Chargers
nfl-p01305,Ty Hamilton,DT,Los Angeles Rams
nfl-p01306,Tyler Goodson,HB,Dallas Cowboys
nfl-p01307,Vernon Broughton,DT,New Orleans Saints
nfl-p01308,Zach Durfee,LEDG,Jacksonville Jaguars
nfl-p01309,Zak Zinter,LG,Cleveland Browns
nfl-p01310,Aaron Stinnie,LG,NY Giants
nfl-p01311,Adin Huntington,DT,Cleveland Browns
nfl-p01312,Anthony Gould,WR,Indianapolis Colts
nfl-p01313,Barrett Carter,MIKE,Cincinnati Bengals
nfl-p01314,Ben Sinnott,TE,Washington Commanders
nfl-p01315,Bilhal Kone,CB,Baltimore Ravens
nfl-p01316,Billy Schrauth,LG,Tampa Bay Buccaneers
nfl-p01317,Bo Richter,REDG,Minnesota Vikings
nfl-p01318,Brock Hoffman,RG,Pittsburgh Steelers
nfl-p01319,Byron Young,DT,Philadelphia Eagles
nfl-p01320,Charles Demmings,CB,Minnesota Vikings
nfl-p01321,Charles Snowden,LEDG,Atlanta Falcons
nfl-p01322,Chris Rumph II,REDG,New Orleans Saints
nfl-p01323,Christian Harris,MIKE,Atlanta Falcons
nfl-p01324,CJ West,DT,San Francisco 49ers
nfl-p01325,Colby Wooden,DT,New Orleans Saints
nfl-p01326,Connor Lew,C,Cincinnati Bengals
nfl-p01327,Darius Muasau,MIKE,New England Patriots
nfl-p01328,Darrell Luter Jr,CB,Las Vegas Raiders
nfl-p01329,David Sills V,WR,Tampa Bay Buccaneers
nfl-p01330,David Quessenberry,LT,Los Angeles Rams
nfl-p01331,Decamerion Richardson,CB,New Orleans Saints
nfl-p01332,Deion Burks,WR,Indianapolis Colts
nfl-p01333,Dell Pettus,SS,New England Patriots
nfl-p01334,DeMarcco Hellams,FS,Atlanta Falcons
nfl-p01335,Dominique Robinson,LEDG,Houston Texans
nfl-p01336,Drew Allar,QB,Pittsburgh Steelers
nfl-p01337,Eli Heidenreich,HB,Pittsburgh Steelers
nfl-p01338,Elijah Higgins,TE,Arizona Cardinals
nfl-p01339,Eyioma Uwazurike,DT,Denver Broncos
nfl-p01340,George Holani,HB,Seattle Seahawks
nfl-p01341,Grant Calcaterra,TE,Philadelphia Eagles
nfl-p01342,Ian Thomas,TE,Las Vegas Raiders
nfl-p01343,Isaiah Bond,WR,Cleveland Browns
nfl-p01344,Isaiah Adams,RG,Arizona Cardinals
nfl-p01345,Ja'Tavion Sanders,TE,Carolina Panthers
nfl-p01346,Jaden Dugger,SAM,San Francisco 49ers
nfl-p01347,Jahdae Walker,WR,Chicago Bears
nfl-p01348,Jake Bobo,WR,Seattle Seahawks
nfl-p01349,Jalen Brooks,WR,Arizona Cardinals
nfl-p01350,Jalen Sundell,C,Seattle Seahawks
nfl-p01351,James Lynch,DT,Chicago Bears
nfl-p01352,Jared Wiley,TE,Kansas City Chiefs
nfl-p01353,Jason Marshall Jr,CB,Miami Dolphins
nfl-p01354,Javon Solomon,REDG,Buffalo Bills
nfl-p01355,Jaylen McCollough,SS,Los Angeles Rams
nfl-p01356,Jaylen Reed,FS,New England Patriots
nfl-p01357,Jaylon Jones,CB,Jacksonville Jaguars
nfl-p01358,Jaylon Carlies,WILL,Indianapolis Colts
nfl-p01359,JD Bertrand,SAM,Atlanta Falcons
nfl-p01360,Jimmy Rolder,MIKE,Detroit Lions
nfl-p01361,Joe Andreessen,MIKE,Buffalo Bills
nfl-p01362,Jon Weeks,LS,San Francisco 49ers
nfl-p01363,Jonah Laulu,DT,Las Vegas Raiders
nfl-p01364,Jordan Watkins,WR,San Francisco 49ers
nfl-p01365,Josh Wallace,CB,Los Angeles Rams
nfl-p01366,Josh Hayes,CB,Tampa Bay Buccaneers
nfl-p01367,Josh Whyle,TE,Green Bay Packers
nfl-p01368,Jude Bowry,LT,Buffalo Bills
nfl-p01369,Kendal Daniels,WILL,Atlanta Falcons
nfl-p01370,Kylen Granson,TE,Tennessee Titans
nfl-p01371,Levi Drake Rodriguez,DT,Minnesota Vikings
nfl-p01372,Lil'Jordan Humphrey,WR,Denver Broncos
nfl-p01373,Luke Schoonmaker,TE,Dallas Cowboys
nfl-p01374,Malachi Corley,WR,Cleveland Browns
nfl-p01375,Malik Benson,WR,Las Vegas Raiders
nfl-p01376,Marist Liufau,LEDG,Dallas Cowboys
nfl-p01377,Miles Frazier,RG,Detroit Lions
nfl-p01378,Mitchell Evans,TE,Carolina Panthers
nfl-p01379,Mitchell Tinsley,WR,Cincinnati Bengals
nfl-p01380,Nick Singleton,HB,Tennessee Titans
nfl-p01381,Oren Burks,WILL,Cincinnati Bengals
nfl-p01382,Otito Ogbonnia,DT,Dallas Cowboys
nfl-p01383,Pharaoh Brown,TE,Indianapolis Colts
nfl-p01384,Raheim Sanders,HB,Cleveland Browns
nfl-p01385,Rakeem Nunez-Roches Sr,DT,Tampa Bay Buccaneers
nfl-p01386,Rasheen Ali,HB,Baltimore Ravens
nfl-p01387,Reggie Virgil,WR,Arizona Cardinals
nfl-p01388,Robert Longerbeam,CB,Atlanta Falcons
nfl-p01389,Rylie Mills,DT,Seattle Seahawks
nfl-p01390,Sam Mustipher,C,Jacksonville Jaguars
nfl-p01391,Shaun Dolac,MIKE,Los Angeles Rams
nfl-p01392,Shedeur Sanders,QB,Cleveland Browns
nfl-p01393,Shemar James,MIKE,Dallas Cowboys
nfl-p01394,Smael Mondon Jr,WILL,Philadelphia Eagles
nfl-p01395,Spencer Rattler,QB,New Orleans Saints
nfl-p01396,Terell Smith,CB,Pittsburgh Steelers
nfl-p01397,Theo Benedet,RT,Chicago Bears
nfl-p01398,Tommy Eichenberg,MIKE,Las Vegas Raiders
nfl-p01399,Trey Pipkins III,LT,Los Angeles Chargers
nfl-p01400,Tyler Badie,HB,Denver Broncos
nfl-p01401,Tyler Huntley,QB,Baltimore Ravens
nfl-p01402,Tyler Baron,REDG,NY Jets
nfl-p01403,Tyrion Ingram-Dawkins,LEDG,Minnesota Vikings
nfl-p01404,Tyrod Taylor,QB,Green Bay Packers
nfl-p01405,Zane Durant,DT,Buffalo Bills
nfl-p01406,Aaron Hall,DT,Carolina Panthers
nfl-p01407,Adam Prentice,FB,Denver Broncos
nfl-p01408,Ahmed Hassanein,REDG,Detroit Lions
nfl-p01409,Ajani Cornelius,RG,Dallas Cowboys
nfl-p01410,Alex Harkey,RG,Los Angeles Chargers
nfl-p01411,Andrew Beck,FB,NY Jets
nfl-p01412,Anez Cooper,RG,NY Jets
nfl-p01413,Anthony Richardson Sr,QB,Indianapolis Colts
nfl-p01414,Arian Smith,WR,NY Jets
nfl-p01415,Austin Schlottmann,C,Tennessee Titans
nfl-p01416,Brevin Jordan,TE,Houston Texans
nfl-p01417,Brian Parker II,LG,Cincinnati Bengals
nfl-p01418,British Brooks,FB,Houston Texans
nfl-p01419,Brycen Tremayne,WR,Carolina Panthers
nfl-p01420,Caedan Wallace,RT,Miami Dolphins
nfl-p01421,Camden Brown,WR,Dallas Cowboys
nfl-p01422,Carson Beck,QB,Arizona Cardinals
nfl-p01423,Carson Wentz,QB,Minnesota Vikings
nfl-p01424,Charlie Kolar,TE,Los Angeles Chargers
nfl-p01425,Chris Brooks,HB,Green Bay Packers
nfl-p01426,CJ Daniels,WR,Los Angeles Rams
nfl-p01427,Cody White,WR,Las Vegas Raiders
nfl-p01428,Connor Colby,LG,San Francisco 49ers
nfl-p01429,Cory Durden,DT,New England Patriots
nfl-p01430,Dalton Johnson,SS,Las Vegas Raiders
nfl-p01431,Dan Feeney,C,Tampa Bay Buccaneers
nfl-p01432,Dante Trader Jr,SS,Miami Dolphins
nfl-p01433,Dare Ogunbowale,HB,Houston Texans
nfl-p01434,David Long Jr,CB,New Orleans Saints
nfl-p01435,Dawand Jones,LT,Cleveland Browns
nfl-p01436,Dohnte Meyers,WR,Cincinnati Bengals
nfl-p01437,Dont'e Thornton Jr,WR,Las Vegas Raiders
nfl-p01438,Donte Kent,CB,Pittsburgh Steelers
nfl-p01439,Drew Shelton,RT,Dallas Cowboys
nfl-p01440,Drew Lock,QB,Seattle Seahawks
nfl-p01441,Drew Sample,TE,Cincinnati Bengals
nfl-p01442,Dylan Laube,HB,Las Vegas Raiders
nfl-p01443,Emari Demercado,HB,Dallas Cowboys
nfl-p01444,Enrique Cruz Jr,LT,San Francisco 49ers
nfl-p01445,Erick All Jr,TE,Cincinnati Bengals
nfl-p01446,J. Michael Sturdivant,WR,Green Bay Packers
nfl-p01447,Jackie Marshall,DT,Tennessee Titans
nfl-p01448,Jackson Hawes,TE,Buffalo Bills
nfl-p01449,Jackson Slater,RG,Tennessee Titans
nfl-p01450,Jarrett Kingston,LG,Miami Dolphins
nfl-p01451,Jaylin Simpson,CB,Miami Dolphins
nfl-p01452,Jeremiah Trotter Jr,SAM,Philadelphia Eagles
nfl-p01453,Jeremy Ruckert,TE,NY Jets
nfl-p01454,Johnny Mundt,TE,Philadelphia Eagles
nfl-p01455,Jonah Savaiinaea,RG,Miami Dolphins
nfl-p01456,Jordan van den Berg,DT,Chicago Bears
nfl-p01457,Jordan Magee,WILL,Washington Commanders
nfl-p01458,Jordon Riley,DT,Green Bay Packers
nfl-p01459,Josh Cameron,WR,Jacksonville Jaguars
nfl-p01460,Joshua Dobbs,QB,Detroit Lions
nfl-p01461,Julius Chestnut,HB,Tennessee Titans
nfl-p01462,Justin Joly,TE,Miami Dolphins
nfl-p01463,Kaden Wetjen,WR,Pittsburgh Steelers
nfl-p01464,Karon Prunty,CB,New England Patriots
nfl-p01465,Keith Abney II,CB,Detroit Lions
nfl-p01466,Korie Black,CB,NY Giants
nfl-p01467,L.J. Collier,DT,Arizona Cardinals
nfl-p01468,LaCale London,DT,Atlanta Falcons
nfl-p01469,Laquon Treadwell,WR,Indianapolis Colts
nfl-p01470,Matt Henningsen,DT,Denver Broncos
nfl-p01471,Micah Morris,RG,Philadelphia Eagles
nfl-p01472,Mike Morris,DT,Seattle Seahawks
nfl-p01473,Mitchell Fraboni,LS,Denver Broncos
nfl-p01474,Pierre Strong Jr,HB,Green Bay Packers
nfl-p01475,Qwan'tez Stiggers,CB,NY Jets
nfl-p01476,Russ Yeast,FS,Cincinnati Bengals
nfl-p01477,Sam Okuayinonu,LEDG,San Francisco 49ers
nfl-p01478,Sam Franklin Jr,FS,Buffalo Bills
nfl-p01479,Sam Hecht,C,Carolina Panthers
nfl-p01480,Scott Matlock,DT,Los Angeles Chargers
nfl-p01481,Sione Vaki,HB,Detroit Lions
nfl-p01482,Tanner Hudson,TE,Cincinnati Bengals
nfl-p01483,Tom Kennedy,WR,Detroit Lions
nfl-p01484,Tonka Hemingway,DT,Las Vegas Raiders
nfl-p01485,Travis Homer,HB,Pittsburgh Steelers
nfl-p01486,Tremon Smith,CB,Houston Texans
nfl-p01487,Velus Jones Jr,HB,Seattle Seahawks
nfl-p01488,Wade Woodaz,MIKE,Houston Texans
nfl-p01489,Yahya Black,DT,Pittsburgh Steelers
nfl-p01490,Aeneas Peebles,DT,Baltimore Ravens
nfl-p01491,Aidan O'Connell,QB,Las Vegas Raiders
nfl-p01492,Alex Forsyth,C,Denver Broncos
nfl-p01493,Anterio Thompson,DT,Atlanta Falcons
nfl-p01494,Beaux Collins,WR,Atlanta Falcons
nfl-p01495,Ben VanSumeren,FB,Kansas City Chiefs
nfl-p01496,Braiden McGregor,LEDG,NY Jets
nfl-p01497,Brenton Cox,LEDG,Green Bay Packers
nfl-p01498,Brevyn Spann-Ford,TE,Dallas Cowboys
nfl-p01499,Cade Klubnik,QB,NY Jets
nfl-p01500,Cade Stover,TE,Houston Texans
nfl-p01501,Carson Vinson,LT,Baltimore Ravens
nfl-p01502,Carver Willis,LG,San Francisco 49ers
nfl-p01503,Chris Roland-Wallace,FS,Kansas City Chiefs
nfl-p01504,Chris Blair,WR,Atlanta Falcons
nfl-p01505,Chukwuebuka Godrick,LT,Miami Dolphins
nfl-p01506,Chukwuma Okorafor,RT,NY Jets
nfl-p01507,Cole Payton,QB,Philadelphia Eagles
nfl-p01508,Corey Kiner,HB,New England Patriots
nfl-p01509,Dametrious Crownover,LT,New England Patriots
nfl-p01510,Daniel Hardy,REDG,Chicago Bears
nfl-p01511,Davis Allen,TE,Los Angeles Rams
nfl-p01512,Deane Leonard,CB,Los Angeles Chargers
nfl-p01513,DeeJay Dallas,HB,Minnesota Vikings
nfl-p01514,DJ Campbell,RG,Miami Dolphins
nfl-p01515,DJ Ivey,CB,Cincinnati Bengals
nfl-p01516,Dylan Horton,LEDG,Houston Texans
nfl-p01517,Elijah Hicks,SS,Chicago Bears
nfl-p01518,Elijah Simmons,DT,Tampa Bay Buccaneers
nfl-p01519,Eric Saubert,TE,Seattle Seahawks
nfl-p01520,Gabe Rubio,DT,Pittsburgh Steelers
nfl-p01521,Giovanni Manu,LT,Detroit Lions
nfl-p01522,Harold Perkins Jr,WILL,Atlanta Falcons
nfl-p01523,Isaiah Williams,WR,NY Jets
nfl-p01524,J.C. Davis,LT,NY Giants
nfl-p01525,Jack Kelly,WILL,NY Giants
nfl-p01526,Jack Kiser,MIKE,Cincinnati Bengals
nfl-p01527,Jager Burton,C,Green Bay Packers
nfl-p01528,Jalen Rivers,LG,Cincinnati Bengals
nfl-p01529,Jalon Kilgore,SS,Buffalo Bills
nfl-p01530,Jamree Kromah,LEDG,Chicago Bears
nfl-p01531,Jared Wayne,WR,Miami Dolphins
nfl-p01532,Javon Foster,LT,Cincinnati Bengals
nfl-p01533,Jaylan Ford,MIKE,New Orleans Saints
nfl-p01534,Jeffrey Bassa,WILL,Kansas City Chiefs
nfl-p01535,Jelani Woods,TE,NY Jets
nfl-p01536,JJ Pegues,DT,Las Vegas Raiders
nfl-p01537,John Michael Schmitz Jr,C,NY Giants
nfl-p01538,Justin Jefferson,MIKE,Cleveland Browns
nfl-p01539,Justin Skule,RT,Tampa Bay Buccaneers
nfl-p01540,Justin Dedich,RG,Los Angeles Rams
nfl-p01541,Kahlil Benson,LT,Kansas City Chiefs
nfl-p01542,Kalia Davis,DT,Cleveland Browns
nfl-p01543,Kamal Hadden,CB,Green Bay Packers
nfl-p01544,Kene Nwangwu,HB,NY Jets
nfl-p01545,Keyshaun Elliott,WILL,Chicago Bears
nfl-p01546,Khalid Kareem,REDG,San Francisco 49ers
nfl-p01547,Kitan Oladapo,SS,Green Bay Packers
nfl-p01548,Larrell Murchison,DT,Los Angeles Rams
nfl-p01549,Logan Taylor,LT,Los Angeles Chargers
nfl-p01550,Malik McClain,WR,NY Jets
nfl-p01551,Marcus Mbow,RT,NY Giants
nfl-p01552,Mason Rudolph,QB,Pittsburgh Steelers
nfl-p01553,Matt Peart,LT,Denver Broncos
nfl-p01554,Matt Hennessy,C,Dallas Cowboys
nfl-p01555,Micah Robinson,CB,Tennessee Titans
nfl-p01556,Miles Killebrew,SS,Tampa Bay Buccaneers
nfl-p01557,Namdi Obiazor,WILL,New England Patriots
nfl-p01558,Nate Boerkircher,TE,Jacksonville Jaguars
nfl-p01559,Nikko Remigio,WR,Kansas City Chiefs
nfl-p01560,Oscar Delp,TE,New Orleans Saints
nfl-p01561,Parker Brailsford,C,Cleveland Browns
nfl-p01562,Quintayvious Hutchins,REDG,New England Patriots
nfl-p01563,Riley Leonard,QB,Indianapolis Colts
nfl-p01564,Robert Tonyan,TE,Pittsburgh Steelers
nfl-p01565,Robert Henry Jr.,HB,Seattle Seahawks
nfl-p01566,Simi Fehoko,WR,Arizona Cardinals
nfl-p01567,Skyler Thomas,FS,Chicago Bears
nfl-p01568,Spencer Anderson,RG,Pittsburgh Steelers
nfl-p01569,Tanner McKee,QB,Philadelphia Eagles
nfl-p01570,Tay Martin,WR,Detroit Lions
nfl-p01571,Tim Smith,DT,Indianapolis Colts
nfl-p01572,Tony Fields II,MIKE,Chicago Bears
nfl-p01573,Toriano Pride Jr,CB,Cleveland Browns
nfl-p01574,Tyler Owens,SS,Washington Commanders
nfl-p01575,Winston Reid,WILL,Cleveland Browns
nfl-p01576,Zach Wilson,QB,New Orleans Saints
nfl-p01577,Ali Gaye,REDG,Houston Texans
nfl-p01578,Ar'maj Reed-Adams,RG,Buffalo Bills
nfl-p01579,Bobby Jamison-Travis,DT,NY Giants
nfl-p01580,Brenden Schooler,SS,New England Patriots
nfl-p01581,Bryan Hudson,C,NY Giants
nfl-p01582,Bryce Cabeldue,LG,Las Vegas Raiders
nfl-p01583,C.J. Williams,WR,Jacksonville Jaguars
nfl-p01584,Cameron Williams,RT,Atlanta Falcons
nfl-p01585,Channing Canada,CB,New England Patriots
nfl-p01586,Charles Woods,CB,New England Patriots
nfl-p01587,Charlie Woerner,TE,Atlanta Falcons
nfl-p01588,Dallis Flowers,CB,Chicago Bears
nfl-p01589,Daniel Thomas,SS,Cleveland Browns
nfl-p01590,Danny Pinter,C,Baltimore Ravens
nfl-p01591,Dareke Young,WR,Las Vegas Raiders
nfl-p01592,Davis Mills,QB,Houston Texans
nfl-p01593,Dean Connors,HB,Los Angeles Rams
nfl-p01594,Dillon Gabriel,QB,Cleveland Browns
nfl-p01595,DJ Herman,FB,Miami Dolphins
nfl-p01596,Drew Kendall,LG,Philadelphia Eagles
nfl-p01597,Drew Ogletree,TE,Indianapolis Colts
nfl-p01598,Ethan Onianwa,RT,Atlanta Falcons
nfl-p01599,Gunner Olszewski,WR,NY Giants
nfl-p01600,Hunter Long,TE,Arizona Cardinals
nfl-p01601,Hunter Nourzad,C,Kansas City Chiefs
nfl-p01602,Jack Endries,TE,Cincinnati Bengals
nfl-p01603,Jacob Saylors,HB,Detroit Lions
nfl-p01604,Jacob Monk,RG,Green Bay Packers
nfl-p01605,Jalen Milroe,QB,Seattle Seahawks
nfl-p01606,Jalen Davis,CB,Cincinnati Bengals
nfl-p01607,James Williams Sr,WILL,Tennessee Titans
nfl-p01608,James Thompson Jr,DT,San Francisco 49ers
nfl-p01609,Javontae Jean-Baptiste,REDG,Washington Commanders
nfl-p01610,Jayden Loving,DT,Chicago Bears
nfl-p01611,Jaylen Harrell,LEDG,Tennessee Titans
nfl-p01612,JL Skinner,SS,Denver Broncos
nfl-p01613,Joe Royer,TE,Cleveland Browns
nfl-p01614,John Ridgeway III,DT,New Orleans Saints
nfl-p01615,John Bates,TE,Washington Commanders
nfl-p01616,Jordan McFadden,LG,Chicago Bears
nfl-p01617,Joshua Ezeudu,RG,Kansas City Chiefs
nfl-p01618,Juanyeh Thomas,SS,Dallas Cowboys
nfl-p01619,Julius Wood,FS,Miami Dolphins
nfl-p01620,Kaevon Merriweather,SS,Jacksonville Jaguars
nfl-p01621,Kain Medrano,WILL,Washington Commanders
nfl-p01622,Karson Sharar,WILL,Arizona Cardinals
nfl-p01623,Kenny Pickett,QB,Carolina Panthers
nfl-p01624,Kevin Jobity Jr,DT,Pittsburgh Steelers
nfl-p01625,Kiko Mauigoa,MIKE,NY Jets
nfl-p01626,Kitan Crawford,SS,Arizona Cardinals
nfl-p01627,Landon Robinson,DT,Cincinnati Bengals
nfl-p01628,Lorenzo Styles Jr,SS,New Orleans Saints
nfl-p01629,Luke Newman,RG,Chicago Bears
nfl-p01630,Luke Gifford,SAM,San Francisco 49ers
nfl-p01631,Luke Wypler,C,Cleveland Browns
nfl-p01632,Marcellas Dial Jr,CB,Miami Dolphins
nfl-p01633,Matt Gulbin,RG,Washington Commanders
nfl-p01634,Max Mitchell,LT,NY Jets
nfl-p01635,Michael Deiter,C,Denver Broncos
nfl-p01636,Michael Burton,FB,Cleveland Browns
nfl-p01637,Montorie Foster Jr,WR,Seattle Seahawks
nfl-p01638,Morgan Cox,LS,Tennessee Titans
nfl-p01639,Myles Price,WR,Minnesota Vikings
nfl-p01640,Nathan Thomas,LT,Houston Texans
nfl-p01641,Nazir Stackhouse,DT,Tennessee Titans
nfl-p01642,Nick Gargiulo,LG,Denver Broncos
nfl-p01643,Nick Niemann,MIKE,Green Bay Packers
nfl-p01644,Olusegun Oluwatimi,C,Seattle Seahawks
nfl-p01645,Parker Hughes,WILL,Jacksonville Jaguars
nfl-p01646,Patrick Johnson,REDG,Las Vegas Raiders
nfl-p01647,Rayuan Lane III,SS,Jacksonville Jaguars
nfl-p01648,Reese Taylor,CB,Miami Dolphins
nfl-p01649,Rodney McGraw,REDG,Miami Dolphins
nfl-p01650,Ronnie Rivers,HB,Los Angeles Rams
nfl-p01651,Sebastian Valdez,DT,San Francisco 49ers
nfl-p01652,Sedrick Van Pran-Granger,C,Indianapolis Colts
nfl-p01653,Seth McGowan,HB,Indianapolis Colts
nfl-p01654,Siran Neal,SS,San Francisco 49ers
nfl-p01655,Thomas Incoom,LEDG,Carolina Panthers
nfl-p01656,Thomas Booker IV,DT,Las Vegas Raiders
nfl-p01657,Trace Ford,REDG,NY Giants
nfl-p01658,Trevor Keegan,RG,Minnesota Vikings
nfl-p01659,Trey Sermon,HB,Atlanta Falcons
nfl-p01660,Ty'Ron Hopper,WILL,Green Bay Packers
nfl-p01661,Tyler Lacy,REDG,Detroit Lions
nfl-p01662,Vederian Lowe,RT,San Francisco 49ers
nfl-p01663,Warren Brinson,DT,Green Bay Packers
nfl-p01664,Wesley Bailey,LEDG,Los Angeles Rams
nfl-p01665,Zach Carter,DT,Arizona Cardinals
nfl-p01666,Zayne Anderson,SS,Miami Dolphins
nfl-p01667,Adam Randall,HB,Baltimore Ravens
nfl-p01668,Alijah Clark,FS,Dallas Cowboys
nfl-p01669,Ameer Speed,CB,Dallas Cowboys
nfl-p01670,Asim Richards,LT,New Orleans Saints
nfl-p01671,Austen Pleasants,LT,San Francisco 49ers
nfl-p01672,Austin Ajiake,MIKE,Indianapolis Colts
nfl-p01673,Austin Brinkman,LS,Houston Texans
nfl-p01674,Ben Brown,C,New England Patriots
nfl-p01675,Ben Mann,LS,NY Giants
nfl-p01676,Bill Murray,LG,Los Angeles Rams
nfl-p01677,Brady Russell,FB,Seattle Seahawks
nfl-p01678,Branson Taylor,LG,Los Angeles Chargers
nfl-p01679,Britain Covey,WR,Philadelphia Eagles
nfl-p01680,Brock Wright,TE,Detroit Lions
nfl-p01681,Bryan Thomas Jr,LEDG,Jacksonville Jaguars
nfl-p01682,Bryson Eason,DT,Kansas City Chiefs
nfl-p01683,Case Keenum,QB,Chicago Bears
nfl-p01684,Chaz Chambliss,LEDG,Minnesota Vikings
nfl-p01685,Chigozie Anusiem,CB,Las Vegas Raiders
nfl-p01686,Dalton Tucker,LG,Indianapolis Colts
nfl-p01687,Danny Striggow,LEDG,Jacksonville Jaguars
nfl-p01688,Desjuan Johnson,REDG,Los Angeles Rams
nfl-p01689,Devon Key,FS,Denver Broncos
nfl-p01690,Dylan Cook,RT,Pittsburgh Steelers
nfl-p01691,Eli Raridon,TE,New England Patriots
nfl-p01692,Elijah Garcia,DT,Dallas Cowboys
nfl-p01693,Eric O'Neill,LEDG,Detroit Lions
nfl-p01694,Fred Johnson,RT,Philadelphia Eagles
nfl-p01695,Hayden Conner,LG,Arizona Cardinals
nfl-p01696,Haynes King,QB,Carolina Panthers
nfl-p01697,Hunter Wohler,SS,Indianapolis Colts
nfl-p01698,Isaiah Stalbird,WILL,New Orleans Saints
nfl-p01699,Jack Driscoll,LT,Pittsburgh Steelers
nfl-p01700,Jack Pyburn,LEDG,Kansas City Chiefs
nfl-p01701,Jackson Meeks,TE,Detroit Lions
nfl-p01702,Jackson Kuwatch,MIKE,Carolina Panthers
nfl-p01703,Jayden Williams,LT,Arizona Cardinals
nfl-p01704,Jordan Jackson,DT,Denver Broncos
nfl-p01705,Josh Blackwell,CB,Chicago Bears
nfl-p01706,Josh Cuevas,TE,Baltimore Ravens
nfl-p01707,Julian Ashby,LS,New England Patriots
nfl-p01708,Kalen King,CB,Arizona Cardinals
nfl-p01709,Kapena Gushiken,CB,Indianapolis Colts
nfl-p01710,Keyon Martin,CB,Baltimore Ravens
nfl-p01711,Ko Kieft,TE,Tampa Bay Buccaneers
nfl-p01712,Kohl Levao,LG,NY Jets
nfl-p01713,Kyle McCord,QB,Miami Dolphins
nfl-p01714,Leonard Taylor III,DT,New England Patriots
nfl-p01715,Matt Dickerson,DT,Jacksonville Jaguars
nfl-p01716,Matt Hibner,TE,Baltimore Ravens
nfl-p01717,Michael Jerrell,LT,Atlanta Falcons
nfl-p01718,Mike Caliendo,LG,Kansas City Chiefs
nfl-p01719,Mitchell Trubisky,QB,Tennessee Titans
nfl-p01720,Myles Hinton,RT,Cincinnati Bengals
nfl-p01721,Nephi Sewell,WILL,Chicago Bears
nfl-p01722,Pat Coogan,C,Tennessee Titans
nfl-p01723,Rejzohn Wright,CB,New Orleans Saints
nfl-p01724,Robert Spears-Jennings,SS,Pittsburgh Steelers
nfl-p01725,Rocco Underwood,LS,Philadelphia Eagles
nfl-p01726,Rodney Shelley,CB,Los Angeles Chargers
nfl-p01727,Sabastian Harsh,REDG,Houston Texans
nfl-p01728,Sam Roush,TE,Chicago Bears
nfl-p01729,Sam Howell,QB,Dallas Cowboys
nfl-p01730,Segun Olubi,MIKE,Las Vegas Raiders
nfl-p01731,Skyler Gill-Howard,DT,Detroit Lions
nfl-p01732,Tanner Koziol,TE,Jacksonville Jaguars
nfl-p01733,Taylen Green,QB,Cleveland Browns
nfl-p01734,Theo Wease Jr,WR,Los Angeles Chargers
nfl-p01735,Thomas Fidone II,TE,NY Giants
nfl-p01736,Tip Reiman,TE,Arizona Cardinals
nfl-p01737,Truman Jones,LEDG,Tennessee Titans
nfl-p01738,Tycen Anderson,SS,Denver Broncos
nfl-p01739,Tyrell Shavers,WR,Buffalo Bills
nfl-p01740,Tyrus Wheat,REDG,Dallas Cowboys
nfl-p01741,VJ Payne,SS,NY Jets
nfl-p01742,Walter Rouse,LG,New England Patriots
nfl-p01743,Will Kacmarek,TE,Miami Dolphins
nfl-p01744,Will Mallory,TE,Indianapolis Colts
nfl-p01745,Zaire Barnes,WILL,NY Giants
nfl-p01746,Zeek Biggers,DT,Miami Dolphins
nfl-p01747,Zemaiah Vaughn,CB,Minnesota Vikings
nfl-p01748,Alex Bachman,WR,Los Angeles Rams
nfl-p01749,Alijah Huzzie,CB,Jacksonville Jaguars
nfl-p01750,Anthony Campbell,DT,Green Bay Packers
nfl-p01751,Ayden Garnes,CB,Tampa Bay Buccaneers
nfl-p01752,BJ Green II,REDG,Jacksonville Jaguars
nfl-p01753,Branson Combs,WILL,Jacksonville Jaguars
nfl-p01754,Caleb Murphy,REDG,Los Angeles Chargers
nfl-p01755,Cameron Latu,TE,New England Patriots
nfl-p01756,Carson Bruener,MIKE,Pittsburgh Steelers
nfl-p01757,Chazz Surratt,SAM,Seattle Seahawks
nfl-p01758,Connor O'Toole,REDG,Seattle Seahawks
nfl-p01759,Cooper McDonald,MIKE,Kansas City Chiefs
nfl-p01760,Corey Levin,C,Atlanta Falcons
nfl-p01761,D.J. Montgomery,WR,Indianapolis Colts
nfl-p01762,Darryl Peterson III,REDG,Los Angeles Rams
nfl-p01763,Doneiko Slaughter,CB,Pittsburgh Steelers
nfl-p01764,Donovan Jennings,LG,Green Bay Packers
nfl-p01765,Dylan McMahon,C,Los Angeles Rams
nfl-p01766,Easton Mascarenas-Arnold,WILL,Cleveland Browns
nfl-p01767,Elliott Davison,FS,New England Patriots
nfl-p01768,Erick Hunter,MIKE,New England Patriots
nfl-p01769,Ethan Burke,REDG,Baltimore Ravens
nfl-p01770,Frank Crum,LT,Denver Broncos
nfl-p01771,Garrett Dellinger,LG,Tennessee Titans
nfl-p01772,Gavin Bartholomew,TE,Minnesota Vikings
nfl-p01773,Grant Stuard,WILL,Los Angeles Rams
nfl-p01774,Jack Heflin,DT,NY Jets
nfl-p01775,Jake Hansen,MIKE,Houston Texans
nfl-p01776,Jalen McLeod,MIKE,Jacksonville Jaguars
nfl-p01777,Jarrett Stidham,QB,Denver Broncos
nfl-p01778,Joe Giles-Harris,SAM,Cincinnati Bengals
nfl-p01779,Jordan Turner,WILL,Denver Broncos
nfl-p01780,Justin Barron,MIKE,Dallas Cowboys
nfl-p01781,Kameron Johnson,WR,Tampa Bay Buccaneers
nfl-p01782,Kayode Awosika,LG,Los Angeles Chargers
nfl-p01783,Kendall Williamson,FS,Los Angeles Chargers
nfl-p01784,Kevin Knowles,CB,Tampa Bay Buccaneers
nfl-p01785,Khalil Dorsey,CB,Detroit Lions
nfl-p01786,Khalil Jacobs,MIKE,New England Patriots
nfl-p01787,Kristian Welch,WILL,Green Bay Packers
nfl-p01788,Liam McCullough,LS,Atlanta Falcons
nfl-p01789,Luke Farrell,TE,San Francisco 49ers
nfl-p01790,Luke Haggard,RG,Tampa Bay Buccaneers
nfl-p01791,Marcelino McCrary-Ball,WILL,NY Jets
nfl-p01792,Marcus Bryant,LT,New England Patriots
nfl-p01793,Marlin Klein,TE,Houston Texans
nfl-p01794,Marlowe Wax,MIKE,Los Angeles Chargers
nfl-p01795,Nate Adkins,TE,Denver Broncos
nfl-p01796,Nic Jones,CB,NY Giants
nfl-p01797,Nick Vannett,TE,Baltimore Ravens
nfl-p01798,Nikko Reed,CB,NY Giants
nfl-p01799,Payne Durham,TE,Tampa Bay Buccaneers
nfl-p01800,Riley Nowakowski,FB,Pittsburgh Steelers
nfl-p01801,Ryan Van Demark,LT,Minnesota Vikings
nfl-p01802,Seth McLaughlin,C,Detroit Lions
nfl-p01803,Skylar Thompson,QB,Baltimore Ravens
nfl-p01804,Stetson Bennett IV,QB,Los Angeles Rams
nfl-p01805,Stone Forsythe,LT,Carolina Panthers
nfl-p01806,Swayze Bozeman,MIKE,Cincinnati Bengals
nfl-p01807,Travis Glover,RT,Green Bay Packers
nfl-p01808,Trevor Nowaske,SAM,Detroit Lions
nfl-p01809,Trey Lance,QB,Los Angeles Chargers
nfl-p01810,Will Howard,QB,Pittsburgh Steelers
nfl-p01811,Yasir Abdullah,SAM,Atlanta Falcons
nfl-p01812,Avery Smith,CB,Seattle Seahawks
nfl-p01813,Bam Martin-Scott,WILL,Carolina Panthers
nfl-p01814,Bauer Sharp,TE,Tampa Bay Buccaneers
nfl-p01815,Brandon Pili,DT,Seattle Seahawks
nfl-p01816,Brayden Willis,TE,San Francisco 49ers
nfl-p01817,C.J. Okoye,DT,NY Giants
nfl-p01818,CJ Donaldson,HB,New Orleans Saints
nfl-p01819,Cody Lindenberg,WILL,Las Vegas Raiders
nfl-p01820,Corey Bullock,LG,Carolina Panthers
nfl-p01821,Dallen Bentley,TE,Denver Broncos
nfl-p01822,Ethan Downs,REDG,Kansas City Chiefs
nfl-p01823,Garret Wallow,WILL,San Francisco 49ers
nfl-p01824,Garrett Nussmeier,QB,Kansas City Chiefs
nfl-p01825,Jackson Woodard,MIKE,Miami Dolphins
nfl-p01826,Jacob Bayer,RG,Cincinnati Bengals
nfl-p01827,Jacob Thomas,FS,Minnesota Vikings
nfl-p01828,Jacob Hummel,WILL,Houston Texans
nfl-p01829,Jake Briningstool,TE,Kansas City Chiefs
nfl-p01830,James Hudson III,LT,Tennessee Titans
nfl-p01831,Joey Blount,FS,Arizona Cardinals
nfl-p01832,Jonah Monheim,C,Jacksonville Jaguars
nfl-p01833,Jonathan Ford,DT,Green Bay Packers
nfl-p01834,Josh Fryar,RT,Arizona Cardinals
nfl-p01835,Julian Hill,TE,New England Patriots
nfl-p01836,Kurtis Rourke,QB,San Francisco 49ers
nfl-p01837,Kyle Hinton,LG,Atlanta Falcons
nfl-p01838,Lew Nichols,HB,Pittsburgh Steelers
nfl-p01839,Malik Herring,LEDG,Miami Dolphins
nfl-p01840,Mark Redman,TE,Green Bay Packers
nfl-p01841,Mason Richman,RT,Seattle Seahawks
nfl-p01842,Mason Murphy,RT,New Orleans Saints
nfl-p01843,Maximus Pulley,FS,Los Angeles Rams
nfl-p01844,Mike Brown,FS,New England Patriots
nfl-p01845,Nate Lynn,LEDG,NY Jets
nfl-p01846,PJ Jules,FS,Cincinnati Bengals
nfl-p01847,Quinn Ewers,QB,Jacksonville Jaguars
nfl-p01848,Quintin Morris,TE,Jacksonville Jaguars
nfl-p01849,Robert Beal Jr,REDG,Miami Dolphins
nfl-p01850,Seydou Traore,TE,Miami Dolphins
nfl-p01851,Storm Norton,LT,Atlanta Falcons
nfl-p01852,Tahj Chambers,WILL,Indianapolis Colts
nfl-p01853,Tanoa Togiai,LG,Washington Commanders
nfl-p01854,Teagan Quitoriano,TE,Arizona Cardinals
nfl-p01855,Tylan Grable,RT,Buffalo Bills
nfl-p01856,Tyler Batty,LEDG,Minnesota Vikings
nfl-p01857,William Wagner,LS,Cincinnati Bengals
nfl-p01858,Willie Lampkin IV,LG,Philadelphia Eagles
nfl-p01859,Xavier Nwankpa,FS,Kansas City Chiefs
nfl-p01860,Albert Reese IV,RT,Arizona Cardinals
nfl-p01861,Alex Ward,LS,Las Vegas Raiders
nfl-p01862,Andrew Meyer,C,Miami Dolphins
nfl-p01863,Athan Kaliakmanis,QB,Washington Commanders
nfl-p01864,Atonio Mafi,RG,Tennessee Titans
nfl-p01865,Benjamin Yurosek,TE,Minnesota Vikings
nfl-p01866,Bishop Fitzgerald,FS,Detroit Lions
nfl-p01867,Blake Whiteheart,TE,Cleveland Browns
nfl-p01868,Brittain Brown,HB,Chicago Bears
nfl-p01869,Carsen Ryan,TE,Cleveland Browns
nfl-p01870,Chris Stoll,LS,Seattle Seahawks
nfl-p01871,Christian Kuntz,LS,Pittsburgh Steelers
nfl-p01872,David Martin-Robinson,TE,Tennessee Titans
nfl-p01873,Donovan McMillon,SS,Cleveland Browns
nfl-p01874,Dorian Mausi,WILL,Tennessee Titans
nfl-p01875,Eku Leota,LEDG,Arizona Cardinals
nfl-p01876,Elijah Campbell,FS,NY Giants
nfl-p01877,Elijah Williams,DT,Minnesota Vikings
nfl-p01878,Garrett DiGiorgio,RG,Jacksonville Jaguars
nfl-p01879,Jack Cochrane,SAM,Kansas City Chiefs
nfl-p01880,Jacob Spomer,C,Los Angeles Chargers
nfl-p01881,Jake Haener,QB,NY Giants
nfl-p01882,Joe Huber,LG,Minnesota Vikings
nfl-p01883,John Williams,LT,Green Bay Packers
nfl-p01884,John Michael Gyllenborg,TE,Kansas City Chiefs
nfl-p01885,Karene Reid,MIKE,Denver Broncos
nfl-p01886,Keleki Latu,TE,Buffalo Bills
nfl-p01887,Luke Tenuta,RT,Indianapolis Colts
nfl-p01888,Michael Jurgens,C,Minnesota Vikings
nfl-p01889,Moliki Matavao,TE,New Orleans Saints
nfl-p01890,Nick Samac,C,Minnesota Vikings
nfl-p01891,Nick Muse,TE,Atlanta Falcons
nfl-p01892,Sam Hagen,RT,Houston Texans
nfl-p01893,Tanner Arkin,TE,New England Patriots
nfl-p01894,TeRah Edwards,DT,Carolina Panthers
nfl-p01895,Tristin McCollum,FS,Las Vegas Raiders
nfl-p01896,Wydett Williams Jr,SS,Arizona Cardinals
nfl-p01897,Anthony Tyus III,HB,Carolina Panthers
nfl-p01898,Brandon Crenshaw-Dickson,RT,Tennessee Titans
nfl-p01899,Colson Yankoff,TE,Washington Commanders
nfl-p01900,Hayden Rucci,TE,Los Angeles Chargers
nfl-p01901,Isaiah World,LT,Los Angeles Chargers
nfl-p01902,Jalon Daniels,QB,Tampa Bay Buccaneers
nfl-p01903,Jay Higgins IV,MIKE,Baltimore Ravens
nfl-p01904,Josh Woods,MIKE,Atlanta Falcons
nfl-p01905,Matt Orzech,LS,Green Bay Packers
nfl-p01906,Princeton Fant,TE,Dallas Cowboys
nfl-p01907,Tommy DeVito,QB,New England Patriots
nfl-p01908,Torricelli Simpkins III,RG,Carolina Panthers
nfl-p01909,Treyton Welch,TE,New Orleans Saints
nfl-p01910,Behren Morton,QB,New England Patriots
nfl-p01911,Benjamin Chukwuma,LT,Tampa Bay Buccaneers
nfl-p01912,Caleb Lohner,TE,Denver Broncos
nfl-p01913,Diego Pounds,RT,Kansas City Chiefs
nfl-p01914,DJ Uiagalelei,QB,Los Angeles Chargers
nfl-p01915,Evan Deckers,LS,Tampa Bay Buccaneers
nfl-p01916,Graham Mertz,QB,Houston Texans
nfl-p01917,Jack Strand,QB,Atlanta Falcons
nfl-p01918,Jaren Kanak,TE,Tennessee Titans
nfl-p01919,Joe Cardona,LS,Los Angeles Rams
nfl-p01920,Josh Sills,RG,NY Giants
nfl-p01921,Keondre Jackson,SS,Baltimore Ravens
nfl-p01922,Kyle Allen,QB,Buffalo Bills
nfl-p01923,Mike Reid,FS,New Orleans Saints
nfl-p01924,Nick Kallerup,TE,Seattle Seahawks
nfl-p01925,Shaka Heyward,MIKE,Miami Dolphins
nfl-p01926,Amen Ogbongbemiga,WILL,Detroit Lions
nfl-p01927,Jake Majors,C,Philadelphia Eagles
nfl-p01928,Jared Ivey,LEDG,Atlanta Falcons
nfl-p01929,Joe Fagnano,QB,Baltimore Ravens
nfl-p01930,Max Brosmer,QB,Minnesota Vikings
nfl-p01931,Scott Daly,LS,Chicago Bears
nfl-p01932,Tyson Bagent,QB,Chicago Bears
nfl-p01933,Rex Sunahara,LS,Cleveland Browns
nfl-p01934,Hayden Large,TE,Chicago Bears
nfl-p01935,Milo Eifler,MIKE,Tennessee Titans
nfl-p01936,Patrick O'Connell,MIKE,Seattle Seahawks
nfl-p01937,Sam Ehlinger,QB,Denver Broncos
nfl-p01938,William Sherman,C,New Orleans Saints
nfl-p01939,Tucker Addington,LS,Miami Dolphins
nfl-p01940,Feleipe Franks,TE,Carolina Panthers
nfl-p01941,Ryan McCollum,C,Pittsburgh Steelers
nfl-p01942,Darius Slayton,WR,Free Agent
nfl-p01943,Xavier Woods,FS,Free Agent
nfl-p01944,Najee Harris,HB,Free Agent
nfl-p01945,Rayshawn Jenkins,FS,Free Agent
nfl-p01946,Asante Samuel Jr,CB,Free Agent
nfl-p01947,Harrison Mevis,K,Free Agent
nfl-p01948,Odell Beckham Jr,WR,Free Agent
nfl-p01949,Chris Moore,WR,Free Agent
nfl-p01950,Marquez Valdes-Scantling,WR,Free Agent
nfl-p01951,Riley Patterson,K,Free Agent
nfl-p01952,Caelen Carson,CB,Free Agent
nfl-p01953,KhaDarel Hodge,WR,Free Agent
`,Ul="sim",B0=/^[a-z][a-z0-9]*$/,C0=/^[a-z0-9][a-z0-9-]*$/i,T0=["theme","settings","profile"];function Ls(n,e){if(!B0.test(n))throw new Error("keys: bad sport id "+n);if(e===""||!e.split(":").every(a=>C0.test(a)))throw new Error("keys: bad key name "+e);if(T0.includes(n))throw new Error("keys: a sport cannot be called "+n);return`${Ul}:${n}:${e}`}const y0=n=>n.startsWith(Ul+":"),S0=["A","B","C"];function k0(n){const e=n.split(":"),a=e[3];return e.length<4||e[2]!=="slot"||a===void 0?null:S0.includes(a)?a:null}const ql=1,D0=["nfl"],Zl={nfl:["draft","week","season"]},Xl=["A","B","C"],ge=n=>({ok:!1,reason:"corrupt",message:n}),to=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),ro=n=>typeof n=="number"&&Number.isInteger(n),ea=n=>typeof n=="string";function $l(n){if(!to(n))return ge("envelope: not an object");const e=n.sport===void 0?"nfl":n.sport;return!ea(e)||!D0.includes(e)?ge("envelope: unknown sport"):!ea(n.kind)||!Zl[e].includes(n.kind)?ge("envelope: bad kind for "+e):!ro(n.schemaVersion)||n.schemaVersion<1?ge("envelope: bad schemaVersion"):n.schemaVersion>ql?{ok:!1,reason:"newer-version",message:"envelope: written by a newer build (schema "+n.schemaVersion+")"}:!ea(n.engineVersion)||!n.engineVersion?ge("envelope: bad engineVersion"):!ea(n.dataVersion)||!n.dataVersion?ge("envelope: bad dataVersion"):!ea(n.saveId)||!n.saveId?ge("envelope: bad saveId"):!ro(n.saveRevision)||n.saveRevision<1?ge("envelope: bad saveRevision"):!ea(n.createdAt)||Number.isNaN(Date.parse(n.createdAt))?ge("envelope: bad createdAt"):!ea(n.slot)||!Xl.includes(n.slot)?ge("envelope: bad slot"):!ea(n.savedAt)||Number.isNaN(Date.parse(n.savedAt))?ge("envelope: bad savedAt"):to(n.payload)?{ok:!0,value:{...n,sport:e}}:ge("envelope: payload is not an object")}function w0(n,e,a,s,t,r){if(!Zl[n].includes(e))throw new Error(`envelope: ${n} has no save kind '${e}'`);const o={sport:n,kind:e,schemaVersion:ql,engineVersion:s.engineVersion,dataVersion:s.dataVersion,saveId:s.saveId,saveRevision:s.saveRevision,createdAt:s.createdAt,slot:a,savedAt:r.toISOString(),payload:t};return $t(o,"envelope"),JSON.stringify(o)}function $t(n,e){if(!(n===null||typeof n=="string"||typeof n=="boolean")){if(typeof n=="number"){if(!Number.isFinite(n))throw new Error("not plain JSON at "+e+": non-finite number");return}if(Array.isArray(n)){n.forEach((a,s)=>$t(a,e+"["+s+"]"));return}if(typeof n=="object"&&Object.getPrototypeOf(n)===Object.prototype){for(const[a,s]of Object.entries(n))$t(s,e+"."+a);return}throw new Error("not plain JSON at "+e+": "+(n===void 0?"undefined":typeof n=="object"?"class instance, Map or Set":typeof n))}}const ni="nfl",Nn=n=>({ok:!1,reason:"corrupt",message:n}),sa=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),Tn=n=>typeof n=="number"&&Number.isInteger(n),Hn=n=>typeof n=="string",R0=n=>sa(n)&&Hn(n.id)&&Hn(n.name)&&Hn(n.pos)&&Hn(n.role)&&Hn(n.team)&&Tn(n.ovr)&&Tn(n.spd)&&Tn(n.str)&&typeof n.freeAgent=="boolean",oo=n=>Array.isArray(n)&&n.every(e=>sa(e)&&Tn(e.week)&&Hn(e.home)&&Hn(e.away)&&Tn(e.hs)&&Tn(e.as));function ei(n){return Tn(n.seed)?!Tn(n.userTeam)||n.userTeam<0||n.userTeam>31?"draft: bad userTeam":n.pickSlot!==void 0&&!(Tn(n.pickSlot)&&n.pickSlot>=1&&n.pickSlot<=32)?"draft: bad pickSlot":!Array.isArray(n.picks)||!n.picks.every(e=>sa(e)&&Tn(e.overall)&&Tn(e.team)&&Hn(e.pid)&&Hn(e.slot))?"draft: bad picks":!Array.isArray(n.pool)||!n.pool.every(e=>Array.isArray(e)&&e.length===8&&Hn(e[0])&&Hn(e[1])&&Hn(e[2])&&Hn(e[3])&&Tn(e[4])&&Tn(e[5])&&Tn(e[6])&&(e[7]===0||e[7]===1))?"draft: bad pool":null:"payload: bad seed"}function E0(n){const e=n.payload;if(!Tn(e.seed))return Nn("payload: bad seed");if(n.kind==="draft"){const a=ei(e);if(a)return Nn(a)}else{if(!Tn(e.year)||!Tn(e.run)||e.run<0)return Nn(n.kind+": bad year/run");if(!Hn(e.userTeam))return Nn(n.kind+": bad userTeam");if(!Array.isArray(e.roster)||e.roster.length!==32||!e.roster.every(R0))return Nn(n.kind+": roster must be 32 frozen players");if(typeof e.statsRecorded!="boolean")return Nn(n.kind+": bad statsRecorded");if(n.kind==="week"){if(!Tn(e.gameSeed)||!Tn(e.nextWeek)||e.nextWeek<1)return Nn("week: bad gameSeed/nextWeek");if(!sa(e.ratings))return Nn("week: bad ratings");if(!Array.isArray(e.schedule)||!e.schedule.every(a=>sa(a)&&Tn(a.week)&&Hn(a.home)&&Hn(a.away)&&Hn(a.kind)))return Nn("week: bad schedule");if(!oo(e.scores))return Nn("week: bad scores");if(e.plan!==null&&!sa(e.plan))return Nn("week: bad plan");if(e.prevRank!==void 0&&!(sa(e.prevRank)&&Object.values(e.prevRank).every(Tn)))return Nn("week: bad prevRank");if(e.homeField!==void 0&&!(typeof e.homeField=="number"&&Number.isFinite(e.homeField)))return Nn("week: bad homeField")}else{if(!Array.isArray(e.table)||!e.table.every(a=>sa(a)&&Hn(a.team)&&Tn(a.w)&&Tn(a.l)&&Tn(a.t)&&Tn(a.pf)&&Tn(a.pa)))return Nn("season: bad table");if(!oo(e.userResults))return Nn("season: bad userResults");if(!Hn(e.champion))return Nn("season: bad champion");if(!["missed-playoffs","wild-card","divisional","conference","super-bowl-loss","champion"].includes(e.userOutcome))return Nn("season: bad userOutcome")}}return{ok:!0,value:n}}function As(n,e,a,s,t){return w0(ni,n,e,a,s,t)}function ut(n){let e;try{e=JSON.parse(n)}catch{return Nn("envelope: not JSON")}const a=$l(e);return a.ok?a.value.sport!==ni?Nn("envelope: this is a "+a.value.sport+" save, not an nfl save"):E0(a.value):a}function b0(n,e){const a=k0(e);return a&&a!==n?"envelope: slot "+n+" written under "+e+" (that key is slot "+a+")":null}const $s={QB:{FS:12},RB:{FB:0,WR:12,TE:6,SS:12,FS:12},FB:{RB:2,TE:2},WR:{RB:6,TE:6,CB:6,FS:6,SS:6,NICKEL:6,DIME:6},TE:{FB:0,WR:12,RB:6,C:6,OG:6,OT:12,EDGE:12,DT:12,OLB:6,ILB:12,SS:6,FS:12,NICKEL:6,DIME:12},OT:{OG:2,C:2,DT:6,EDGE:6,FB:0},OG:{OT:2,C:2,DT:6,EDGE:6,FB:0},C:{OG:6,OT:12,DT:12,FB:0},DT:{EDGE:6,C:6,OG:6,OT:6,FB:0},EDGE:{DT:2,OLB:2,ILB:6,C:6,OG:6,OT:6,SS:12,RB:6,FB:0,TE:6,NICKEL:6},ILB:{ILB:0,OLB:2,EDGE:12,FS:12,SS:2,FB:0,TE:6,NICKEL:6,DIME:12},OLB:{OLB:0,ILB:6,EDGE:12,FS:12,SS:6,FB:0,TE:6,NICKEL:6,DIME:12},SS:{NICKEL:0,DIME:0,FS:2,CB:6,WR:12,ILB:6,OLB:2,RB:12,TE:6},FS:{NICKEL:0,DIME:0,SS:2,CB:6,WR:12,OLB:6},CB:{FS:2,NICKEL:0,DIME:0,SS:2,WR:6},K:{P:2},P:{K:2},LS:{}},nr=8;function L0(n){if(n==="DT"||n==="EDGE")return 0;const e=$s[n].DT,a=$s[n].EDGE;return e===void 0?a:a===void 0?e:Math.min(e,a)}function Oe(n,e){if(n===e)return{penalty:0,emergency:!1,legal:!0};const a=e==="DL5"?L0(n):$s[n][e];return a!==void 0?{penalty:a,emergency:!1,legal:!0}:n==="QB"?{penalty:nr,emergency:!0,legal:!1}:{penalty:nr,emergency:!0,legal:!0}}function G(n,e){const a=n[e];if(a===void 0)throw new Error(`at(): no element at index ${e} (length ${n.length})`);return a}function is(n,e){const a=n[e];if(a===void 0)throw new Error(`need(): no entry for key "${e}"`);return a}const Se=[{id:"QB",weight:1e3,dest:"QB",unit:"offense"},{id:"WR1",weight:650,dest:"WR",unit:"offense"},{id:"OT1",weight:500,dest:"OT",unit:"offense"},{id:"OT2",weight:300,dest:"OT",unit:"offense"},{id:"WR2",weight:400,dest:"WR",unit:"offense"},{id:"C",weight:150,dest:"C",unit:"offense"},{id:"OG1",weight:400,dest:"OG",unit:"offense"},{id:"OG2",weight:250,dest:"OG",unit:"offense"},{id:"TE1",weight:250,dest:"TE",unit:"offense"},{id:"RB1",weight:250,dest:"RB",unit:"offense"},{id:"WR3",weight:100,dest:"WR",unit:"offense"},{id:"RB2",weight:100,dest:"RB",unit:"offense"},{id:"TE2",weight:150,dest:"TE",unit:"offense"},{id:"FB",weight:25,dest:"FB",unit:"offense"},{id:"TE3",weight:50,dest:"TE",unit:"offense"},{id:"WR4",weight:50,dest:"WR",unit:"offense"},{id:"DE1",weight:650,dest:"EDGE",unit:"defense"},{id:"DT1",weight:500,dest:"DT",unit:"defense"},{id:"DE2",weight:300,dest:"EDGE",unit:"defense"},{id:"DT2",weight:300,dest:"DT",unit:"defense"},{id:"DL5",weight:150,dest:"DL5",unit:"defense"},{id:"MIKE",weight:300,dest:"ILB",unit:"defense"},{id:"WILL",weight:150,dest:"OLB",unit:"defense"},{id:"SAM",weight:100,dest:"OLB",unit:"defense"},{id:"CB1",weight:400,dest:"CB",unit:"defense"},{id:"CB2",weight:250,dest:"CB",unit:"defense"},{id:"CB3",weight:100,dest:"NICKEL",unit:"defense"},{id:"DIME",weight:50,dest:"DIME",unit:"defense"},{id:"FS",weight:300,dest:"FS",unit:"defense"},{id:"SS",weight:300,dest:"SS",unit:"defense"},{id:"K",weight:50,dest:"K",unit:"special"},{id:"P",weight:50,dest:"P",unit:"special"}],Na=Se.map(n=>n.id);Object.fromEntries(Se.map(n=>[n.id,n.weight]));const A0={WR1:"WR1",MIKE:"MIKE",WILL:"WILL",SAM:"SAM",CB3:"Nickel",DE1:"DE1",DE2:"DE2"};function kr(n){return Se.map(e=>{const a={slot:e.id,dest:e.dest,row:e.id,label:A0[e.id]??e.id};if(n==="4-3")return a;switch(e.id){case"DT1":return{...a,label:"NT"};case"MIKE":return{...a,label:"ILB1"};case"DT2":return{slot:"DT2",dest:"ILB",row:"DT2",label:"ILB2"};case"WILL":return{slot:"WILL",dest:"OLB",row:"WILL",label:"OLB1"};case"SAM":return{...a,label:"OLB2"};default:return a}})}const Pe={olRun:{OT1:.579,OT2:.348,OG1:.705,OG2:.441,C:.263,TE1:1.436,FB:.188},olPass:{OT1:.812,OT2:.488,OG1:.588,OG2:.368,C:.221},rb:{RB1:43.113,RB2:12.177},qb:{QB:1},rec:{WR1:25.682,WR2:19.86,WR3:3.251,TE1:2.174,RB1:4.201,TE3:1.264,WR4:1.6},passRush:{DE1:.583,DE2:.255,DT1:.303,DT2:.182,MIKE:.053,WILL:.03,DL5:.114},frontRun:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.234,SS:.115,CB1:.06,CB2:.034,CB3:.009,FS:.08,DL5:.099},coverage:{CB1:.175,CB2:.107,CB3:.041,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.1},kicker:{K:1}},ba={frontBase:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.334,SS:.115,CB1:.06,CB2:.034,CB3:.005,FS:.08,DL5:.099},frontNick:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.032,SS:.115,CB1:.062,CB2:.048,CB3:.009,FS:.08,DL5:.099},covBase:{CB1:.175,CB2:.107,CB3:.011,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.135},covNick:{CB1:.175,CB2:.107,CB3:.045,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.017},covDime:{CB1:.175,CB2:.107,CB3:.045,DIME:.184,SS:.113,FS:.122,MIKE:.069}},cs={12:{WR1:25.682,WR2:27.236,TE1:2.174,TE2:22.844,RB1:4.201},13:{WR1:25.682,TE1:2.174,TE2:22.844,TE3:15.173,RB1:4.201},21:{WR1:25.682,WR2:27.236,TE1:2.174,RB1:4.201,RB2:12.177},22:{WR1:25.682,TE1:2.174,TE2:22.844,RB1:4.201,RB2:12.177}},ai={RB1:44.218,RB2:30.441},ha={11:{label:"11 personnel",run:0,runB:0,passB:0,heavy:0,tbw:0,pc:0},12:{label:"12 personnel",run:.03,runB:.03,passB:-.015,heavy:.5,tbw:.08,pc:.22},13:{label:"13 personnel",run:.06,runB:.055,passB:-.035,heavy:1,tbw:.14,pc:.42},21:{label:"21 personnel",run:.05,runB:.04,passB:-.03,heavy:.6,tbw:.03,pc:.38},22:{label:"22 personnel",run:.08,runB:.07,passB:-.045,heavy:1,tbw:.1,pc:.48}},Dr={run:{label:"run-heavy",s:.08},neutral:{label:"balanced",s:0},pass:{label:"pass-heavy",s:-.08}},wr={run:{label:"run-defense",f:1},neutral:{label:"balanced",f:0},pass:{label:"pass-defense",f:-1}},Jn={kRun:1.4,kPass:.85,kTo:1,kSack:.9,rAmp:3,pAmp:2.5,vm:1.3,kBlock:1,predict:.38,defPredict:.15,baseRunPct:.39,nickRun:.05,baseRunVsHeavy:-.025,basePass:.03,defFront:2,defCov:1.5,defRush:.6,pkgFront:.8,pkgCov:.8},wn={rb:.0208,olRun:.0495,front:.05577,qb:.00655,rec:.02045,olPass:.01403,rush:.01579,cov:.0184,lean:.013,toQb:.01471,toCov:.0204,toRush:.0105,skRush:.0268,skOl:.0336,skCov:.012,kick:.01215},Aa=105,Ma=220,ps=.04,hs=.07,ms=3,vs=.8,Ja=1.2,_a=2.2,nt=21.5,si=1.7,ti=6,ri=2.36,Rr=82,oi=.0194,li=.01147,ua=[1,1,1],ii=.542,er=.15,ci=32.5,fi=17,M0=Object.freeze(Object.defineProperty({__proto__:null,BASE_PTS:nt,DEF_FOCUS:wr,DEF_SPECS:ba,DIME_W:er,GAMES:fi,HOME_FIELD:si,LAM_SACK:_a,LAM_TO:Ja,MC:wn,PASS_BASE:Ma,PERS:ha,PERS_REC:cs,PLAN_K:Jn,POINTS_PER_WIN:ci,PTS_NOISE:ti,PT_PASS:hs,PT_RUSH:ps,PT_SACK:vs,PT_TO:ms,PUNT_PTS:ii,QB_RUN_C:oi,RATING_SPECS:Pe,RB_HEAVY:ai,RET_NEUTRAL:Rr,RET_PTS:ri,RUSH_BASE:Aa,STRAT:Dr,WR_BLK_C:li,WR_BLK_W:ua},Symbol.toStringTag,{value:"Module"})),et={pers:"11",strat:"neutral"},at={pkg:"nickel",focus:"neutral"},J0={off:et,def:at},ui=["11","12","13","21","22"].flatMap(n=>["run","neutral","pass"].map(e=>({pers:n,strat:e}))),di=["base","nickel"].flatMap(n=>["run","neutral","pass"].map(e=>({pkg:n,focus:e})));function _0(n){return ha[n.pers].run+Dr[n.strat].s}function F0(n){const e=1/(1+.2316419*Math.abs(n)),s=.3989423*Math.exp(-n*n/2)*e*(.3193815+e*(-.3565638+e*(1.781478+e*(-1.821256+e*1.330274))));return n>0?1-s:s}function te(n,e,a){return Math.min(a,Math.max(e,n))}function Da(n,e,a){const s=n>=0?a:-e,t=.6*s,r=Math.abs(n);if(r<=t)return n;const o=t+(s-t)*Math.tanh((r-t)/(s-t));return n>=0?o:-o}function lo(n,e){const a=e.pers,s={...n};a!=="11"&&(s.rec=n["rec"+a]),(a==="21"||a==="22")&&(s.rb=n.rbHeavy);const t=a==="13"?(n.te2+70)/2:a==="12"||a==="22"?(n.te1+n.te2)/2:n.te1;return s.olRun=n.olRun+ha[a].tbw*(t-75)*Jn.kBlock,s}function io(n,e,a){const s=wr[e.focus].f,t=e.pkg==="nickel",r={...n};return r.frontRun=(t?n.frontNick:n.frontBase)+(a?0:(t?-Jn.pkgFront:Jn.pkgFront)+Jn.defFront*s),r.coverage=(t?n.covNick:n.covBase)+(a?0:(t?Jn.pkgCov:-Jn.pkgCov)-Jn.defCov*s),r.passRush=n.passRush-(a?0:Jn.defRush*s),r.coverage=(1-er)*r.coverage+er*n.covDime,r}function He(n,e,a,s=J0){const t=s.off,r=s.def,o=lo(n,t),l=lo(a,t),i=io(e,r,!1),c=io(a,r,!0),u=_0(t),p=1+Jn.rAmp*u,m=1-Jn.pAmp*u,d=o.rb-l.rb,h=o.olRun-l.olRun,v=o.qb-a.qb,B=o.rec-l.rec,C=o.olPass-a.olPass,k=o.kicker-a.kicker,w=i.frontRun-c.frontRun,T=i.passRush-c.passRush,S=i.coverage-c.coverage,J=wn.lean*(.35*(n.rb-a.rb)+.65*(n.olRun-a.olRun)-(.45*v+.3*(n.rec-a.rec)+.25*C)),P=ha[t.pers].heavy,F=r.pkg==="nickel",b=ha[t.pers].runB+Jn.kRun*u+(F?Jn.nickRun*P:Jn.baseRunVsHeavy*P),A=ha[t.pers].passB-Jn.kPass*u+(F?0:Jn.basePass*(1-P)),O=[["rb","off",wn.rb*d*p],["olRun","off",wn.olRun*h*p],["frontRun","def",-wn.front*w*p],["lean","off",J],["scheme","off",b]],z=[["qb","off",wn.qb*v*m],["rec","off",wn.rec*B*m],["olPass","off",wn.olPass*C*m],["passRush","def",-wn.rush*T*m],["coverage","def",-wn.cov*S*m],["lean","off",-J],["scheme","off",A]],Q=[["qb","off",-wn.toQb*v],["coverage","def",wn.toCov*S],["passRush","def",wn.toRush*T],["scheme","off",-Jn.kTo*u]],x=[["passRush","def",wn.skRush*T],["olPass","off",-wn.skOl*C],["coverage","def",wn.skCov*S],["scheme","off",-Jn.kSack*u]],X=Mn=>Mn.reduce((ne,ee)=>ne+ee[2],0),an=Da(wn.rb*d+wn.olRun*h,-1.1,.4),en=Da(wn.qb*v+wn.rec*B+wn.olPass*C,-.8,.27),j=Da(an*p+J+b,-1.3,.33)-wn.front*w*p,$=Da(en*m-J+A,-1,.29)-(wn.rush*T+wn.cov*S)*m,N=Da(X(Q),-.7,.7),V=Da(X(x),-.8,.4),q=Aa*Math.exp(j),E=Ma*Math.exp($),W=Ja*Math.exp(N),Y=_a*Math.exp(V),I=wn.kick*k,U=ri*(Math.exp((n.ret-82)/45)-Math.exp((a.ret-82)/45)),ln=oi*(n.qbRunR-a.qbRunR),Z=li*(n.wrBlk-a.wrBlk),dn=-ii*(Math.exp((e.p-80)/45)-Math.exp((a.p-80)/45)),kn={},Dn=(Mn,ne,ee)=>{for(const[me,ke,On]of Mn){if(me==="lean"||me==="scheme")continue;const ce=ne(On),ve=me+"|"+ke,ae=kn[ve]??={unit:me,owner:ke,pts:0,kinds:{}},fe=ke==="off"?ce:-ce;ae.pts+=fe,ae.kinds[ee]=(ae.kinds[ee]??0)+fe}};Dn(O,Mn=>ps*Aa*(Math.exp(Mn)-1),"ground game"),Dn(z,Mn=>hs*Ma*(Math.exp(Mn)-1),"passing game"),Dn(Q,Mn=>-ms*Ja*(Math.exp(Mn)-1),"turnovers"),Dn(x,Mn=>-vs*_a*(Math.exp(Mn)-1),"sacks"),Math.abs(I)>.01&&(kn["kicker|off"]={unit:"kicker",owner:"off",pts:I,kinds:{"field goals":I}});const Qn=Jn.predict*Math.pow(Dr[t.strat].s/.08,2)-Jn.defPredict*Math.abs(wr[r.focus].f)+ha[t.pers].pc,ie=U+dn+ln+Z,An=nt+ps*(q-Aa)+hs*(E-Ma)-ms*(W-Ja)-vs*(Y-_a)+I+ie-Qn,Fn={run:ps*(q-Aa)+ln+Z,pass:hs*(E-Ma),to:-ms*(W-Ja),sack:-vs*(Y-_a),kick:I,plan:-Qn},jn=te(1-Jn.vm*u,.7,1.2);return{expRush:q,expPass:E,lamTO:W,lamSack:Y,structPts:An,extraPts:ie,channels:Fn,swings:Object.values(kn),sd:8*jn,vm:jn,sT:u,planCost:Qn,plan:{off:t,def:r}}}function W0(n){const e=n.length;for(const i of n)if(i.length!==e)throw new Error("hungarian: matrix must be square");const a=Number.POSITIVE_INFINITY,s=new Array(e+1).fill(0),t=new Array(e+1).fill(0),r=new Array(e+1).fill(0),o=new Array(e+1).fill(0);for(let i=1;i<=e;i++){r[0]=i;let c=0;const u=new Array(e+1).fill(a),p=new Array(e+1).fill(!1);do{p[c]=!0;const m=r[c];let d=a,h=0;for(let v=1;v<=e;v++){if(p[v])continue;const B=n[m-1][v-1]-s[m]-t[v];B<u[v]&&(u[v]=B,o[v]=c),u[v]<d&&(d=u[v],h=v)}for(let v=0;v<=e;v++)p[v]?(s[r[v]]+=d,t[v]-=d):u[v]-=d;c=h}while(r[c]!==0);do{const m=o[c];r[c]=r[m],c=m}while(c!==0)}const l=new Array(e).fill(-1);for(let i=1;i<=e;i++)r[i]>0&&(l[r[i]-1]=i-1);return l}const ar=70,P0=120;function G0(n,e,a){const s=P0*n.reduce((o,l)=>o+Math.abs(l),0)+1,t=s,r=(a+1)*t+s;return{emergency:t,plays:r,illegal:(e+a+1)*r*2}}const N0=(n,e,a)=>n.map(s=>e.winsPerOvr(s.row,a)/pi);function I0(n,e,a={}){const{stay:s,stayBonus:t=0,values:r=dt,base:o="4-3"}=a,l=N0(e,r,o),i=n.length,c=e.length,u=i+c,{emergency:p,plays:m,illegal:d}=G0(l,i,c),h=[];for(let w=0;w<u;w++){const T=new Array(u).fill(0);for(let S=0;S<c;S++)if(w<i){const J=Oe(n[w].role,e[S].dest);T[S]=J.legal?-(m+G(l,S)*(n[w].ovr-J.penalty))+(J.emergency?p:0)-(s?.get(n[w].id)===e[S].slot?t:0):d}else T[S]=-G(l,S)*ar;h.push(T)}const v=W0(h),B=e.map(w=>({slot:w,player:null,effOvr:ar,penalty:0,emergency:!1})),C=[];for(let w=0;w<i;w++){const T=v[w];if(T>=c){C.push(n[w]);continue}const S=Oe(n[w].role,e[T].dest);B[T]={slot:e[T],player:n[w],effOvr:n[w].ovr-S.penalty,penalty:S.penalty,emergency:S.emergency}}const k=B.reduce((w,T,S)=>w+G(l,S)*T.effOvr,0);return{placements:B,bench:C,value:k,emergencyFills:B.filter(w=>w.emergency).length}}function Er(n,e,a=dt){return{base:e,...I0(n,kr(e),{base:e,values:a})}}function H0(n){return n.placements.map(e=>({row:e.slot.row,ovr:e.effOvr}))}function K0(n,e){let a=0,s=0;for(const t of n){const r=e[t.row];r!==void 0&&(a+=t.ovr*r,s+=r)}if(s===0)throw new Error("wavg: no spot matches the spec");return a/s}function ca(n,e){const a=n.find(s=>s.row===e);return a?a.ovr:ar}function sr(n,e=Rr){const a=o=>K0(n,o),s={TE1:ca(n,"TE1"),TE2:ca(n,"TE2"),P:ca(n,"P"),QB:ca(n,"QB"),WR1:ca(n,"WR1"),WR2:ca(n,"WR2"),WR3:ca(n,"WR3")},t=a(Pe.rec),r={olRun:a(Pe.olRun),olPass:a(Pe.olPass),rb:a(Pe.rb),qb:a(Pe.qb),rec:t,passRush:a(Pe.passRush),frontRun:a(Pe.frontRun),coverage:a(Pe.coverage),kicker:a(Pe.kicker),rec12:a(cs[12]),rec13:a(cs[13]),rec21:a(cs[21]),rec22:a(cs[22]),rec11:t,frontBase:a(ba.frontBase),frontNick:a(ba.frontNick),covBase:a(ba.covBase),covNick:a(ba.covNick),covDime:a(ba.covDime),te1:s.TE1,te2:s.TE2,rbHeavy:a(ai),ret:e,p:s.P,qbRunR:s.QB,wrBlk:(s.WR1*ua[0]+s.WR2*ua[1]+s.WR3*ua[2])/(ua[0]+ua[1]+ua[2]),passOff:0,runOff:0,off:0,def:0};return r.passOff=.45*r.qb+.3*r.rec+.25*r.olPass,r.runOff=.35*r.rb+.65*r.olRun,r.off=.6*r.passOff+.4*r.runOff,r.def=.55*(.5*r.passRush+.5*r.coverage)+.45*r.frontRun,r}function br(n){if(!n.length)throw new Error("leagueBaseline: no teams");const e=Object.keys(n[0]),a={};for(const s of e)a[s]=n.reduce((t,r)=>t+r[s],0)/n.length;return a}function st(n,e,a){return a?Math.max(...ui.map(s=>He(n,e,e,{off:s,def:at}).structPts)):-Math.min(...di.map(s=>He(e,n,e,{off:et,def:s}).structPts))}function co(n,e){return st(n,e,!0)+st(n,e,!1)}const x0=n=>n==="K"||Se.find(e=>e.id===n)?.unit==="offense";function fo(n,e,a="4-3"){const s=l=>kr(a).map(i=>({row:i.row,ovr:i.slot===n?l:80})),t=sr(s(80)),r=fi/ci,o=x0(n);return(st(sr(s(e)),t,o)-st(t,t,o))*r}function O0(n,e="4-3"){return fo(n,90,e)-fo(n,70,e)}const pi=.00254/20,V0=n=>Math.round(n*1e9)/1e9;function Y0(){const n=new Map,e=a=>{let s=n.get(a);return s||(s=Object.fromEntries(Na.map(t=>[t,V0(O0(t,a)/20)])),n.set(a,s)),s};return{name:"measured",winsPerOvr:(a,s)=>e(s)[a]}}const dt=Y0(),z0="4-3",za=32,Q0=Na.length,Qa=Object.fromEntries(Se.map(n=>[n.id,n.dest])),hi=n=>n==="NICKEL"||n==="DIME"?"CB":n==="DL5"?"DT":n,Lr={topFloor:5,topFloorRounds:4,midFloor:10,midFloorRounds:8,kpFirstRound:6,noiseMax:1.5,missMax:.6,biasSd:.5,hyperP:.15,replFloor:72};function mi(n=za,e=Q0){const a=[];for(let s=0;s<e;s++)for(let t=0;t<n;t++)a.push(s%2===0?t:n-1-t);return a}const j0=(n,e)=>e.ovr-n.ovr||(n.id<e.id?-1:n.id>e.id?1:0),U0=Array.from(new Set(Se.map(n=>n.dest)));function q0(n,e,a=Lr,s=mi()){const t=n.filter(l=>l.role!=="LS").slice().sort(j0),r=e.fork("traits"),o=Array.from({length:za},()=>({noise:.05+r.next()*(a.noiseMax-.05),miss:r.next()*a.missMax,bias:Object.fromEntries(U0.map(l=>{const i=r.next();return[l,i<a.hyperP/2?.05+r.next()*.3:i<a.hyperP?2+r.next()*3:Math.exp(a.biasSd*r.normal())]}))}));return{cfg:a,order:s,pos:0,pool:t,rosters:Array.from({length:za},()=>({})),traits:o,log:[],repl:{},replAt:-99}}const pt=n=>Math.floor(n.pos/za)+1,Ms=n=>Na.filter(e=>!n[e]);function Z0(n){if(n.pos===n.replAt)return n.repl;const e={};for(const t of n.rosters)for(const r of Ms(t)){const o=hi(Qa[r]);e[o]=(e[o]??0)+1}const a={};for(const t of n.pool)(a[t.role]??=[]).push(t.ovr);const s={};for(const t of Object.keys(e)){const r=a[t]??[];s[t]=r.length?G(r,Math.min(e[t]??1,r.length)-1):0}return n.repl=s,n.replAt=n.pos,s}function tr(n,e,a=dt){const s=Ms(G(n.rosters,e)),t=Z0(n),r={},o=[],l=pt(n);for(const i of n.pool)if(!((r[i.role]=(r[i.role]??0)+1)>16)&&!((i.role==="K"||i.role==="P")&&l<n.cfg.kpFirstRound))for(const u of s){const p=Oe(i.role,Qa[u]);if(!p.legal||p.emergency)continue;const m=i.ovr-p.penalty,d=Math.max(t[hi(Qa[u])]??0,n.cfg.replFloor);o.push({player:i,slot:u,eff:m,wins:Math.round(a.winsPerOvr(u,z0)*(m-d)*1e9)/1e9})}return o}function X0(n){const e=n.pool.length?G(n.pool,0).ovr:0,a=pt(n),s=n.cfg;return a<=s.topFloorRounds?e-s.topFloor:a<=s.midFloorRounds?e-s.midFloor:-1/0}function vi(n,e,a,s=dt){const t=G(n.traits,e),r=X0(n);let o=tr(n,e,s).filter(u=>u.player.ovr>=r);if(o.length||(o=tr(n,e,s)),!o.length)return $0(n,e);const l=o.map(u=>({c:u,v:u.wins*(t.bias[Qa[u.slot]]??1)*Math.max(.02,1+t.noise*a.normal())+.002*pi*u.player.ovr}));l.sort((u,p)=>p.v-u.v);let i=0;l.length>8&&a.next()<t.miss&&(i=Math.min(l.length-1,3+Math.min(9,Math.floor(Math.abs(a.normal())*4))));const c=G(l,i).c;return{player:c.player,slot:c.slot}}function $0(n,e){const a=Ms(G(n.rosters,e));for(const s of n.pool)for(const t of a)if(Oe(s.role,Qa[t]).legal)return{player:s,slot:t};throw new Error("draft: no legal pick for team "+e)}function ht(n,e,a,s){if(n.order[n.pos]!==e)throw new Error(`draft: it is not team ${e}'s pick`);if(G(n.rosters,e)[s])throw new Error("draft: spot already filled "+s);const t=n.pool.findIndex(l=>l.id===a.id);if(t<0)throw new Error("draft: player already taken "+a.id);if(!Oe(a.role,Qa[s]).legal)throw new Error("draft: illegal fit");const r=G(n.pool,0).ovr;n.pool.splice(t,1),G(n.rosters,e)[s]=a;const o={overall:n.pos+1,round:pt(n),pickInRound:n.pos%za+1,team:e,slot:s,player:a,ovrGap:r-a.ovr};return n.log.push(o),n.pos++,o}const nu=/^([a-z][a-z0-9]*)-p(\d{5,})$/;function eu(n){const e=nu.exec(n);return e?{sport:e[1],n:+e[2]}:null}const au="pid,name,pos,team",gi=(n,e,a)=>`${n}|${e}|${a}`,su="nfl";function tu(n,e=su){const a=n.split(/\r?\n/).filter(o=>o.trim().length>0);if(a.length===0||a[0].trim()!==au)throw new Error("player-ids csv: unexpected header: "+(a[0]??"(empty)"));const s=[],t=new Set,r=new Set;for(let o=1;o<a.length;o++){const l=/^([a-z][a-z0-9]*-p\d{5,}),(.*),([A-Z]+),([^,]+)$/.exec(a[o]);if(!l)throw new Error(`player-ids csv line ${o+1}: cannot parse: ${a[o]}`);const i={pid:l[1],name:l[2],pos:l[3],team:l[4]};if(eu(i.pid)?.sport!==e)throw new Error(`player-ids csv line ${o+1}: ${i.pid} is not a ${e} id`);if(t.has(i.pid))throw new Error("player-ids csv: duplicate pid "+i.pid);const c=gi(i.name,i.pos,i.team);if(r.has(c))throw new Error("player-ids csv: duplicate key "+c);t.add(i.pid),r.add(c),s.push(i)}return s}function ru(n){return new Map(n.map(e=>[gi(e.name,e.pos,e.team),e.pid]))}const Bi={QB:"QB",HB:"RB",FB:"FB",WR:"WR",TE:"TE",LT:"OT",RT:"OT",LG:"OG",RG:"OG",C:"C",DT:"DT",LEDG:"EDGE",REDG:"EDGE",MIKE:"ILB",WILL:"OLB",SAM:"OLB",CB:"CB",SS:"SS",FS:"FS",K:"K",P:"P",LS:"LS"},ou=n=>Bi[n];function uo(n,e){const a=[],s=n.split(/\r?\n/).filter(t=>t.trim().length>0);if(s[0].trim()!=="name,pos,team,ovr,spd,str")throw new Error("players csv: unexpected header: "+s[0]);for(let t=1;t<s.length;t++){const r=/^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(s[t]);if(!r)throw new Error(`players csv line ${t+1}: cannot parse: ${s[t]}`);const[,o,l,i,c,u,p]=r,m=Bi[l];if(!m)throw new Error(`players csv line ${t+1}: unknown position ${l}`);a.push({id:`${o}|${l}|${i}`,name:o,pos:l,role:m,team:i,ovr:+c,spd:+u,str:+p,freeAgent:e})}return a}function lu(n,e,a){const s=[...uo(n,!1),...uo(e,!0)],t=ru(tu(a)),r=new Set,o=new Set;return s.map(l=>{if(o.has(l.id))throw new Error("duplicate player "+l.id);o.add(l.id);const i=t.get(l.id);if(!i)throw new Error("no stable id for "+l.id+" (run tools/player-ids.ts sync)");if(r.has(i))throw new Error("duplicate pid "+i);return r.add(i),{...l,id:i}})}function Ci(n){let e=2166136261;for(let a=0;a<n.length;a++)e^=n.charCodeAt(a),e=Math.imul(e,16777619)>>>0;return e>>>0}function Ye(n){let e=n>>>0,a=null;const s=()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296};return{next:s,int:(t,r)=>t+Math.floor(s()*(r-t+1)),normal:()=>{if(a!==null){const l=a;return a=null,l}let t=0,r=0;for(;t===0;)t=s();r=s();const o=Math.sqrt(-2*Math.log(t));return a=o*Math.sin(2*Math.PI*r),o*Math.cos(2*Math.PI*r)},pick:t=>t[Math.floor(s()*t.length)],fork:t=>Ye((n^Ci(t))>>>0)}}function iu(n,e){return(n>>>0^Ci(e))>>>0}const Ti=Object.fromEntries(Se.map(n=>[n.id,n.dest])),Ar=new Set(Se.map(n=>n.id));function cu(n){return n.filter(e=>e.role!=="LS").map(e=>[e.id,e.name,e.pos,e.team,e.ovr,e.spd,e.str,e.freeAgent?1:0])}function Mr(n){return n.map(([e,a,s,t,r,o,l,i])=>{const c=ou(s);if(!c)throw new Error("save: unknown position "+s);return{id:e,name:a,pos:s,role:c,team:t,ovr:r,spd:o,str:l,freeAgent:i===1}})}function fu(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("save: not an object");const e=ei(n);if(e)throw new Error("save: "+e);const a=n;if(a.picks.length>1024)throw new Error("save: too many picks");if(!a.picks.every(s=>Ar.has(s.slot)))throw new Error("save: bad pick slot");return{seed:a.seed,userTeam:a.userTeam,...a.pickSlot===void 0?{}:{pickSlot:a.pickSlot},picks:a.picks.map(s=>({overall:s.overall,team:s.team,pid:s.pid,slot:s.slot})),pool:a.pool.map(s=>[...s])}}const Gs=(n,e,a)=>({seed:e.seed,userTeam:e.userTeam,...e.pickSlot===void 0?{}:{pickSlot:e.pickSlot},pool:a,picks:n.log.map(s=>({overall:s.overall,team:s.team,pid:s.player.id,slot:s.slot}))});function yi(n,e){const a=Array.from({length:za},(s,t)=>t);if(e!==void 0&&e-1!==n){const s=e-1;[a[n],a[s]]=[a[s],a[n]]}return mi().map(s=>a[s])}function ts(n){const e=q0(Mr(n.pool),Ye(n.seed).fork("draft"),Lr,yi(n.userTeam,n.pickSlot));for(const a of n.picks){if(e.pos>=e.order.length)throw new Error("save: more picks than the draft has");if(a.overall!==e.pos+1||a.team!==e.order[e.pos])throw new Error("save: pick "+a.overall+" is out of order");const s=e.pool.find(r=>r.id===a.pid);if(!s)throw new Error("restore: player not available: "+a.pid);const t=Ar.has(a.slot)?Ti[a.slot]:void 0;if(!t||!Oe(s.role,t).legal)throw new Error("restore: illegal fit");ht(e,a.team,s,a.slot)}return e}function bt(n,e,a){const s=Ye(e).fork("cpu");for(;n.pos<n.order.length;){const t=n.order[n.pos];if(t===void 0||t===a)break;const r=vi(n,t,s.fork("p"+n.pos));ht(n,t,r.player,r.slot)}}function uu(n){let e={record:null,draft:null,status:"idle",error:null};const a=new Set,s=i=>{e=i,a.forEach(c=>c(e))},t=(i,c)=>{const u=ts(c);return{record:c,draft:u,status:u.pos>=u.order.length?"done":"drafting",error:null}},r=i=>{try{if(i.type==="START"){if(!Number.isInteger(i.seed)||!Number.isInteger(i.userTeam)||i.userTeam<0||i.userTeam>31)throw new Error("start: bad seed or team");if(i.pickSlot!==void 0&&!(Number.isInteger(i.pickSlot)&&i.pickSlot>=1&&i.pickSlot<=32))throw new Error("start: bad pick slot");const c={seed:i.seed,userTeam:i.userTeam,...i.pickSlot===void 0||i.pickSlot-1===i.userTeam?{}:{pickSlot:i.pickSlot}},u=cu(n),p=ts({...c,picks:[],pool:u});bt(p,i.seed,i.userTeam),s(t(p,Gs(p,c,u)))}else if(i.type==="LOAD"){const c=fu(i.record),u=ts(c);bt(u,c.seed,c.userTeam),s(t(u,Gs(u,c,c.pool)))}else{if(!e.record||!e.draft)throw new Error("no draft in progress");if(i.type==="PICK"){const{record:c,draft:u}=e;if(u.pos>=u.order.length||u.order[u.pos]!==c.userTeam)throw new Error("it is not your pick");if(!Ar.has(i.slot))throw new Error("bad slot");const p=ts(c),m=p.pool.find(h=>h.id===i.playerId);if(!m)throw new Error("player not available: "+i.playerId);const d=Ti[i.slot];if(!d||!Oe(m.role,d).legal)throw new Error("illegal fit");ht(p,c.userTeam,m,i.slot),bt(p,c.seed,c.userTeam),s(t(p,Gs(p,c,c.pool)))}else if(i.type==="UNDO"){const c=e.record,u=c.picks.map(d=>d.team).lastIndexOf(c.userTeam);if(u<0)throw new Error("nothing to undo");const p={...c,picks:c.picks.slice(0,u)},m=ts(p);s(t(m,Gs(m,c,c.pool)))}}}catch(c){console.warn("store: action rejected:",i.type,c.message),s({...e,error:c.message})}};let o=Promise.resolve();return{getState:()=>e,dispatch:r,dispatchAsync:i=>{const c=o.then(()=>new Promise(u=>setTimeout(u,0))).then(()=>{try{r(i)}catch(u){console.warn("store: subscriber threw:",u.message)}return e});return o=c.catch(()=>{}),c},subscribe:i=>(a.add(i),()=>a.delete(i))}}Ls("nfl","draft");function du(n){return{...n,pool:n.pool.slice(),rosters:n.rosters.map(e=>({...e})),log:[],repl:{...n.repl}}}function pu(n,e,a,s=30){if(n.order[n.pos]!==e)throw new Error("goneOdds: it is not the user's pick");let t=n.pos+1;for(;t<n.order.length&&n.order[t]!==e;)t++;const r=t-(n.pos+1),o=new Map;if(r<=0||t>=n.order.length)return{picksBetween:Math.max(0,r),sims:s,gone:o};for(let l=0;l<s;l++){const i=du(n);i.pos=n.pos+1;const c=a.fork("gone"+l);for(let u=i.pos;u<t;u++){const p=i.order[u],m=vi(i,p,c);ht(i,p,m.player,m.slot)}for(const u of i.log)o.set(u.player.id,(o.get(u.player.id)??0)+1)}for(const[l,i]of o)o.set(l,i/s);return{picksBetween:r,sims:s,gone:o}}const hu=(n,e)=>n.gone.get(e)??0;function mu(n){if(!Number.isFinite(n))throw new Error("goneDisplay: not a number: "+n);const e=Math.round(Math.min(1,Math.max(0,n))*100);return Math.min(99,e)}function xn(n){if(!Number.isFinite(n))throw new Error("showInt: not a number: "+n);const e=Math.sign(n)*Math.round(Math.abs(n));return String(e===0?0:e)}function Ss(n,e){if(!Number.isFinite(e))throw new Error("showDecimal: not a number: "+e);const a=Math.sign(e)*Math.round(Math.abs(e)*10)/10;return(a===0?0:a).toFixed(1)}const Ge=["East","North","South","West"],aa=(n,e,a)=>a.map(s=>({name:s,conf:n,div:e})),gn=[...aa("AFC","East",["Buffalo Bills","Miami Dolphins","New England Patriots","NY Jets"]),...aa("AFC","North",["Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers"]),...aa("AFC","South",["Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans"]),...aa("AFC","West",["Denver Broncos","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers"]),...aa("NFC","East",["Dallas Cowboys","NY Giants","Philadelphia Eagles","Washington Commanders"]),...aa("NFC","North",["Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings"]),...aa("NFC","South",["Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers"]),...aa("NFC","West",["Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks"])],mt=Object.fromEntries(gn.map(n=>[n.name,n]));function Ca(n,e){return gn.filter(a=>a.conf===n&&a.div===e).map(a=>a.name)}const Lt=Object.fromEntries(Se.map(n=>[n.id,n.dest])),vu=Object.fromEntries(kr("4-3").map(n=>[n.slot,n.label])),tt=n=>vu[n]??n,po=n=>n.startsWith("-")?n:"+"+n,gu=(n,e)=>n===2||n===4||n>4&&e>20;function Bu(n,e,a,s={}){const t=s.sort??"wins",r=s.limit??60,o=pt(n),l=new Set(Ms(n.rosters[e])),i=new Map;for(const d of tr(n,e))(i.get(d.player.id)??i.set(d.player.id,[]).get(d.player.id)).push(d);const c=[];for(const d of i.values()){const v=d.filter(S=>Oe(S.player.role,Lt[S.slot]).penalty===0).sort((S,J)=>J.wins-S.wins)[0]??d.slice().sort((S,J)=>J.wins-S.wins)[0],B=v.player,C=v.wins,k=hu(a,B.id),w=C*k,T=d.filter(S=>S.slot!==v.slot&&l.has(S.slot)).map(S=>({c:S,pen:Oe(S.player.role,Lt[S.slot]).penalty})).filter(S=>gu(S.pen,o)).sort((S,J)=>J.c.wins-S.c.wins).map(S=>({slotId:S.c.slot,slotLabel:tt(S.c.slot),flex:S.pen===0?"":`-${S.pen} flex`}));c.push({id:B.id,name:B.name,pos:B.pos,nflTeam:B.team,ovr:xn(B.ovr),slotId:v.slot,slotLabel:tt(v.slot),natural:Oe(B.role,Lt[v.slot]).penalty===0,wins:po(Ss("wins",C)),priority:po(Ss("priority",w)),gone:mu(k)+"%",alsoFits:T,tone:C>.05?"good":C<-.05?"bad":"neutral",_w:C,_p:w})}const u=d=>t==="ovr"?Number(d.ovr):t==="priority"?d._p:d._w;c.sort((d,h)=>u(h)-u(d)||(d.id<h.id?-1:1));const p=n.pos+1,m=Na.length-l.size;return{header:{teamName:gn[e].name,round:o,roundLabel:`Round ${o}`,pickInRound:n.pos%32+1,overall:p,totalPicks:n.order.length,onClock:`You're on the clock: Round ${o}, Pick ${n.pos%32+1} (overall ${p} of ${n.order.length})`},rows:c.slice(0,r).map(({_w:d,_p:h,...v})=>v),footer:{filled:m,total:Na.length,text:`${m} of ${Na.length} starters`},sort:t}}const Cu={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},Tu=["RB1","RB2","WR1","WR2","WR3","TE1","TE2","MIKE","WILL","SAM","CB1","CB2","CB3","SS","FS"],At={spd:.8,ovr:.1,str:.1};function yu(n){return Math.min(99,n.spd*At.spd+n.ovr*At.ovr+n.str*At.str)}function Su(n){const e=[];for(const a of n.placements)a.player&&Tu.includes(a.slot.slot)&&e.push({slot:a.slot.slot,player:a.player,value:yu(a.player)});return e.sort((a,s)=>s.value-a.value||(a.player.id<s.player.id?-1:1))}function Si(n,e){const a=Su(n);return a.find(s=>s.player.id===e)??a[0]??null}function ku(n,e){return Si(n,e)?.value??Rr}const Du=[3.27,5.78,5.88,5.85,5.91,5.93,5.2,5.41,5.17,4.48,4.26,16,26.85],wu=[.3,4.62,4.99,14.52,4.91,4.77,7.37,7.3,4.69,2.01,5.29,9.98,29.26],ho=5.88,Ru=[.073,0,0,.396,.073,0,.292,.157,0,0,0,.008,0],ki=n=>{const e=n.reduce((a,s)=>a+s,0);return n.map(a=>a/e)},mo=ki(wu.map((n,e)=>e===0?ho:Math.max(0,n-ho*Ru[e]))),Mt=ki(Du),Eu=(()=>{const n=Mt.length,e=[0],a=[0];for(let s=0;s<n;s++)e.push(e[s]+Mt[s]),a.push(a[s]+mo[s]);return Mt.map((s,t)=>mo.map((r,o)=>s===0?t===o?1:0:Math.max(0,Math.min(e[t+1],a[o+1])-Math.max(e[t],a[o]))/s))})(),vo=n=>n<=10?n:n<=14?11:12,go=n=>n===0||n===3||n>=6;function bu(n,e,a){if(a===0)return[n,n];let s=[n,e],t=1/0;for(let r=0;r<=45;r++){const o=r+a;if(!go(r)||!go(o)||o>58)continue;const l=o+r-(n+e),i=1.5*Math.abs(l)+(l<0?1.5*-l:0)+Math.abs(o-n)+Math.abs(r-e);i<t&&(t=i,s=[o,r])}return s}function Lu(n,e,a,s){const t=n===e?a:n>e,r=t?n:e,o=t?e:n,l=r-o,i=vo(l);let c=s.next(),u=0;const p=Eu[i];for(;u<p.length-1&&(c-=p[u],!(c<0));u++);let m;u<=10?m=u:u===11?m=vo(l)===11?l:s.int(11,14):m=l>=15?l:s.int(15,24);const[d,h]=bu(r,o,m);return t?[d,h]:[h,d]}const we=n=>n==="home"?"away":"home";function rt(n,e){if(e<=0)return 0;const a=Math.exp(-e);let s=0,t=1;do s++,t*=n.next();while(t>a);return s-1}function Yn(n,e){return n.next()<e}function Di(n,e){let a=0;for(const t of e)a+=t;let s=n.next()*a;for(let t=0;t<e.length;t++)if(s-=G(e,t),s<0)return t;return e.length-1}function wi(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=G(e,a);e[a]=G(e,s),e[s]=t}return e}function Ia(n,e){const a=e.reduce((l,i)=>l+i,0),s=e.map(l=>n*l/a),t=s.map(Math.floor);let r=n-t.reduce((l,i)=>l+i,0);const o=s.map((l,i)=>[l-G(t,i),i]).sort((l,i)=>i[0]-l[0]);for(let l=0;r>0;l++,r--){const i=G(o,l%o.length)[1];t[i]=G(t,i)+1}return t}function Bo(n,e){return n===1?Yn(e,.5)?0:3:n===2?3:n===4?Yn(e,.5)?3:6:n===5?Yn(e,.5)?6:3:n}const Ns=n=>n===0||n===3||n>=6;function Co(n,e){return{rush:te(Math.round(n.expRush*Math.exp(.3*e.normal()-.045)),15,345),pass:te(Math.round(n.expPass*Math.exp(.26*n.vm*e.normal()-.0338*n.vm*n.vm)),45,520),to:te(rt(e,n.lamTO),0,6),sacks:te(rt(e,n.lamSack),0,9)}}const Au=n=>n==="xp"?1:n==="two"?2:0;function To(n,e,a){let s=0;for(let v=0;v<e;v++)Yn(a,.12)&&s++;for(;s>0&&!Ns(n-7*s);)s--;let t=Yn(a,.035)&&Ns(n-7*s-2)?1:0;const r=n-7*s-2*t;Ns(r)||(t=0,s=0);const o=n-7*s-2*t;if(!Ns(o))throw new Error("decompose: cannot score "+n);const l=o*.24/3,i=[];for(let v=0;3*v<=o;v++){const B=o-3*v;if(!(B!==0&&B<6))for(let C=Math.ceil(B/8);6*C<=B;C++){const k=B-6*C,w=Math.max(k-C,0),T=k-2*w,S=C-T-w;S<0||i.push({b:v,n:C,w:Math.exp(-.5*((v-l)/1)**2)*Math.exp(-1.4*S)+1e-6})}}const c=G(i,Di(a,i.map(v=>v.w))),u=o-3*c.b,p=u-6*c.n;let m=Math.max(p-c.n,0),d=p-2*m;for(;d>=2&&m+d-1<=c.n&&Yn(a,.22);)d-=2,m+=1;const h=[];for(let v=0;v<d;v++)h.push("xp");for(let v=0;v<m;v++)h.push("two");for(let v=h.length;v<c.n;v++)h.push(Yn(a,.6)?"xp_miss":"two_fail");return{td:c.n,fg:c.b,convs:wi(a,h),dTD:s,sf:t}}function Mu(n,e){return e<4?1:n<=-9?.55:n<=-4?.75:n>=17?1.85:n>=9?1.55:n>=4?1.25:n<=-1?.9:n>=1?1.1:1}const Jt={TD:68,FG:46,FG_MISS:44,PUNT:24,INT:26,FUM:25,DOWNS:32,HALF:24,SAFETY:14},yo={TD:1,FG:3,FG_MISS:3,PUNT:3,INT:2,FUM:2,DOWNS:4,HALF:2,SAFETY:2};function So(n,e,a,s,t,r,o,l,i){const c=[];n.convs.forEach(d=>c.push({end:"TD",conv:d}));for(let d=0;d<n.fg;d++)c.push({end:"FG"});for(let d=0;d<t;d++)c.push({end:"FG_MISS"});for(let d=0;d<e;d++)c.push({end:Yn(l,.65)?"INT":"FUM",defTD:d<a.dTD});for(let d=0;d<a.sf;d++)c.push({end:"SAFETY"});for(let d=0;d<s;d++)c.push({end:"DOWNS"});const u=new Array(r).fill(null),p=[i[0]?o-1:-1,i[1]?r-1:-1];for(const d of p)d>=0&&c.length<r-1&&(u[d]={end:"HALF"});wi(l,c);let m=0;for(let d=0;d<r;d++)u[d]||(u[d]=m<c.length?G(c,m++):{end:"PUNT"});return u}function ko(n,e,a,s,t){return n.td+n.fg+t+e+a.sf+s}function Ri(n,e,a,s){const t=s.homeField??si,r=a.fork("aggregates"),o={home:Co(n,r),away:Co(e,r)},l=(E,W,Y)=>te(nt+Y+ps*(W.rush-Aa)+hs*(W.pass-Ma)-ms*(W.to-Ja)-vs*(W.sacks-_a)+E.channels.kick+E.extraPts-E.planCost+ti*E.vm*r.normal(),0,58),i=l(n,o.home,t),c=l(e,o.away,0),u=[Bo(Math.round(i),r),Bo(Math.round(c),r)],[p,m]=Lu(u[0],u[1],i>=c,a.fork("margin")),d=a.fork("drives"),h={home:To(p,o.away.to,d),away:To(m,o.home.to,d)},v={home:rt(d,.35),away:rt(d,.35)},B={home:0,away:0};for(const E of["home","away"])for(let W=0;W<h[E].fg;W++)Yn(d,.176)&&B[E]++;const C=te(Math.round(10.8+.9*d.normal()),9,13),k=Math.max(C,ko(h.home,o.home.to,h.away,v.home,B.home)+1,ko(h.away,o.away.to,h.home,v.away,B.away)+1),w=k%2===0?te(k/2+d.pick([-1,0,0,1]),3,k-3):Yn(d,.5)?(k-1)/2:(k+1)/2,T=Yn(d,.5)?"home":"away",S=[Yn(d,.55),Yn(d,.55)],J=we(T),P=T,F=E=>[S[0]&&J===E,S[1]&&P===E],b={home:So(h.home,o.home.to,h.away,v.home,B.home,k,w,d,F("home")),away:So(h.away,o.away.to,h.home,v.away,B.away,k,w,d,F("away"))},A=[],O={home:0,away:0};for(let E=0;E<2;E++){const W=E===0?w:k-w,Y=E===0?T:we(T);for(let I=0;I<W;I++)for(const U of[Y,we(Y)])A.push({side:U,idx:O[U]++,half:E})}const z=A.map(E=>{const W=G(b[E.side],E.idx);return{side:E.side,period:1,start:0,secs:0,plays:0,rush:0,pass:0,sacks:0,end:W.end,pts:W.end==="TD"?6+Au(W.conv):W.end==="FG"?3:0,...W.conv!==void 0?{conv:W.conv}:{},oppPts:W.end==="SAFETY"?2:W.defTD?7:0,defTD:!!W.defTD}}),Q=new Map;{const E={home:0,away:0};z.forEach((W,Y)=>{Q.set(W,Mu(E[W.side]-E[we(W.side)],1+Math.floor(Y/z.length*4))),E[W.side]+=W.pts,E[we(W.side)]+=W.oppPts})}for(const E of["home","away"]){const W=z.map((Z,dn)=>[Z,dn]).filter(([Z])=>Z.side===E).map(([Z])=>Z),Y=W.map(Z=>Jt[Z.end]*Math.exp(.5*d.normal())*Q.get(Z)),I=W.map(Z=>Jt[Z.end]*Math.exp(.5*d.normal())/Q.get(Z)),U=Ia(o[E].rush,Y),ln=Ia(o[E].pass,I);W.forEach((Z,dn)=>{Z.rush=G(U,dn),Z.pass=G(ln,dn)}),W.forEach(Z=>{Z.plays=te(Math.max(yo[Z.end],Math.round((Z.rush+Z.pass)/5.15+.9*d.normal())),1,22)});for(let Z=0;Z<o[E].sacks;Z++){const dn=Di(d,W.map(Dn=>Dn.plays)),kn=G(W,dn);kn.sacks>=kn.plays-1&&kn.plays++,kn.sacks++}}let x=0;for(let E=0;E<2;E++){const W=z.filter((I,U)=>G(A,U).half===E),Y=Ia(1800,W.map(I=>I.plays*26*Math.exp(.28*d.normal())+(I.end==="HALF"?10:0)));W.forEach((I,U)=>{I.start=x,I.secs=G(Y,U),I.period=Math.min(4,Math.floor(x/900)+1),x+=G(Y,U)})}let X=p,an=m,en=null,j=0;if(p===m){const E=a.fork("overtime"),W=Yn(E,.5)?"home":"away",Y={home:0,away:0},I=s.otLimit??(s.playoff?900:600);let U=5,ln=0;const Z={home:n,away:e},dn=(An,Fn,jn)=>{const Mn=Z[An].structPts/nt,ne=E.next(),ee=te(.27*Mn,.1,.5),me=te(.2*Math.sqrt(Mn),.08,.3),ke=te(.11/Math.sqrt(Mn),.05,.2);let On="PUNT";ne<ee?On="TD":ne<ee+me?On=Yn(E,.87)?"FG":"FG_MISS":ne<ee+me+ke?On=Yn(E,.65)?"INT":"FUM":ne<ee+me+ke+.03&&(On="DOWNS");const ce=(On==="INT"||On==="FUM")&&Yn(E,.1);let ve=te(Math.round(150+50*E.normal()),30,330);ve=Math.min(ve,Fn);const ae=Math.max(1,Math.round(Jt[On]*Math.exp(.4*E.normal()))),fe=Math.round(ae*te(.4+.1*E.normal(),.15,.7)),es=ae-fe;let Gn=0,Zn;if(On==="TD"){const se=jn(6);Zn=se?"none":"xp",Gn=se?6:7}else On==="FG"&&(Gn=3);return{side:An,period:U,start:3600+j,secs:ve,plays:Math.max(yo[On],Math.round(ae/5.3)),rush:fe,pass:es,sacks:0,end:On,pts:Gn,...Zn!==void 0?{conv:Zn}:{},oppPts:ce?7:0,defTD:ce}},kn=An=>{z.push(An),j+=An.secs,ln+=An.secs,Y[An.side]+=An.pts,Y[we(An.side)]+=An.oppPts};let Dn=!1;const Qn=dn(W,Math.min(330,I),()=>!1);if(kn(Qn),Qn.oppPts>0&&(Dn=!0),!Dn){const An=Y[W],Fn=dn(we(W),Math.max(30,I-ln),jn=>jn>An-Y[we(W)]);kn(Fn),(Fn.oppPts>0||Y.home!==Y.away)&&(Dn=!0)}let ie=W;for(;!Dn;){const An=I-ln;if(An<=0){if(s.playoff){U++,ln=0;continue}break}const Fn=dn(ie,An,()=>!0);Fn.secs>=An&&Fn.pts===0&&Fn.oppPts===0&&(Fn.end="HALF"),kn(Fn),(Fn.pts>0||Fn.oppPts>0)&&(Dn=!0),ie=we(ie)}X+=Y.home,an+=Y.away,en={first:W,periods:U-4,tie:X===an}}const $=[];z.forEach((E,W)=>{E.pts>0&&$.push({side:E.side,kind:E.end==="TD"?"TD":"FG",pts:E.pts,...E.conv!==void 0?{conv:E.conv}:{},drive:W,period:E.period,at:E.start+E.secs}),E.oppPts>0&&$.push({side:we(E.side),kind:E.defTD?"DEF_TD":"SAFETY",pts:E.oppPts,drive:W,period:E.period,at:E.start+E.secs})});const N=()=>({rush:0,pass:0,yards:0,plays:0,giveaways:0,takeaways:0,sacksTaken:0,drives:0,top:0,fgMade:0,fgMissed:0}),V={home:N(),away:N()};for(const E of z){const W=V[E.side];W.rush+=E.rush,W.pass+=E.pass,W.yards+=E.rush+E.pass,W.plays+=E.plays,W.sacksTaken+=E.sacks,W.drives++,W.top+=E.secs,E.end==="FG"&&W.fgMade++,E.end==="FG_MISS"&&W.fgMissed++,(E.end==="INT"||E.end==="FUM")&&(W.giveaways++,V[we(E.side)].takeaways++)}const q={home:o.home,away:o.away};return{homeScore:X,awayScore:an,regHome:p,regAway:m,drives:z,events:$,stats:V,agg:q,ot:en,otSecs:j}}function Do(n,e,a){return F0((n.structPts-e.structPts+a)/Math.sqrt(n.sd*n.sd+e.sd*e.sd))}function wo(n,e){let a=n[0],s=-1/0;for(const t of n){const r=e(t);r>s&&(s=r,a=t)}return{o:a,v:s}}function rr(n,e){const a={off:et,def:at};let s=et,t=at;const r=h=>Do(He(n,e,e,{off:h,def:a.def}),He(e,n,e,{off:a.off,def:t}),0),o=h=>Do(He(n,e,e,{off:s,def:a.def}),He(e,n,e,{off:a.off,def:h}),0);for(let h=0;h<2;h++)s=wo(ui,r).o,t=wo(di,o).o;const l=n.rb-e.rb,i=n.olRun-e.olRun,c=n.qb-e.qb,u=n.rec-e.rec,p=n.olPass-e.olPass,m=.35*l+.65*i-(.45*c+.3*u+.25*p),d=n.frontRun-e.frontRun-(.5*(n.coverage-e.coverage)+.5*(n.passRush-e.passRush));return{off:s,def:t,tilt:m,tiltD:d}}const Ju=[[["East","North"],["South","West"]],[["East","South"],["North","West"]],[["East","West"],["North","South"]]];function _u(n,e){const a=c=>{const u=e[c];if(u===void 0)throw new Error(`schedule: no rank for ${c}`);return u},s=(c,u)=>Ca(c,u).slice().sort((p,m)=>a(p)-a(m));for(const c of["AFC","NFC"])for(const u of Ge)if(Ca(c,u).map(m=>e[m]).sort().join()!=="1,2,3,4")throw new Error(`schedule: ranks in ${c} ${u} must be 1-4 once each`);const t=[];for(const c of["AFC","NFC"])for(const u of Ge){const p=s(c,u);for(let m=0;m<4;m++)for(let d=m+1;d<4;d++)t.push({home:G(p,m),away:G(p,d),kind:"div"}),t.push({home:G(p,d),away:G(p,m),kind:"div"})}const r=G(Ju,(n%3+3)%3);for(const c of["AFC","NFC"])for(const[u,p]of r){const m=s(c,u),d=s(c,p);for(let h=0;h<4;h++)for(let v=0;v<4;v++)t.push((h+v+n)%2===0?{home:G(m,h),away:G(d,v),kind:"conf4"}:{home:G(d,v),away:G(m,h),kind:"conf4"})}const o=c=>(c+n)%4,l=c=>(c+n+1+Math.floor(n/4)%3)%4;Ge.forEach((c,u)=>{const p=s("AFC",c),m=s("NFC",G(Ge,o(u)));for(let d=0;d<4;d++)for(let h=0;h<4;h++)t.push((d+h+n)%2===0?{home:G(p,d),away:G(m,h),kind:"inter4"}:{home:G(m,h),away:G(p,d),kind:"inter4"})});for(const c of["AFC","NFC"]){const[[u,p],[m,d]]=r,h=[[u,m],[m,p],[p,d],[d,u]];for(const[v,B]of h){const C=s(c,v),k=s(c,B);for(let w=0;w<4;w++)t.push(n%2===0?{home:G(C,w),away:G(k,w),kind:"conf2"}:{home:G(k,w),away:G(C,w),kind:"conf2"})}}const i=n%2===0;return Ge.forEach((c,u)=>{const p=s("AFC",c),m=s("NFC",G(Ge,l(u)));for(let d=0;d<4;d++)t.push(i?{home:G(m,d),away:G(p,d),kind:"inter1"}:{home:G(p,d),away:G(m,d),kind:"inter1"})}),t}const Fu=[5,6,7,8,9,10,11,12,13,14],Wu=[4,4,4,4,4,4,2,2,2,2];function Pu(n,e,a,s=400){const t=_u(e,a),r=[...new Set(t.map(o=>o.home))];for(let o=0;o<s;o++){const l=Gu(t,r,n);if(l)return l}throw new Error("schedule: no weekly assignment found")}function Vs(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=G(e,a);e[a]=G(e,s),e[s]=t}return e}function Gu(n,e,a){const s=new Array(n.length).fill(0),t=new Map;n.forEach((i,c)=>{if(i.kind==="div"){const u=[i.home,i.away].sort().join("|");(t.get(u)??t.set(u,[]).get(u)).push(c)}});for(const i of["AFC","NFC"])for(const c of Ge){const u=Vs(a,Ca(i,c));for(const[p,m]of[[G(u,0),G(u,1)],[G(u,2),G(u,3)]]){const d=t.get([p,m].sort().join("|"));s[G(d,a.int(0,1))]=18}}const r=new Map,o=[];Fu.forEach((i,c)=>{for(let u=0;u<G(Wu,c);u++)o.push(i)}),Vs(a,o),Vs(a,e.slice()).forEach((i,c)=>r.set(i,G(o,c)));const l=new Set(n.map((i,c)=>c).filter(i=>s[i]===0));for(let i=1;i<=17;i++){const c=e.filter(p=>r.get(p)!==i),u=Nu(n,l,c,a);if(!u)return null;for(const p of u)s[p]=i,l.delete(p)}return l.size?null:n.map((i,c)=>({...i,week:G(s,c)}))}function Nu(n,e,a,s){const t=new Set(a),r=new Map;for(const u of a)r.set(u,[]);for(const u of e){const p=G(n,u);t.has(p.home)&&t.has(p.away)&&(r.get(p.home).push(u),r.get(p.away).push(u))}const o=new Set,l=[];let i=0;const c=()=>{if(++i>4e3)return!1;let u=null,p=1e9;for(const d of a)if(!o.has(d)){const h=r.get(d).filter(v=>!o.has(G(n,v).home)&&!o.has(G(n,v).away)).length;h<p&&(p=h,u=d)}if(u===null)return!0;if(p===0)return!1;const m=Vs(s,r.get(u).filter(d=>!o.has(G(n,d).home)&&!o.has(G(n,d).away)));for(const d of m){const{home:h,away:v}=G(n,d);if(o.add(h),o.add(v),l.push(d),c())return!0;o.delete(h),o.delete(v),l.pop()}return!1};return c()?l.slice():null}function Ei(n,e,a){const s=n+e+a;return s===0?0:(n+.5*a)/s}let Iu=class{rows=new Map;constructor(e){for(const a of gn)this.rows.set(a.name,[]);for(const a of e)this.rows.get(a.home).push({opp:a.away,pf:a.hs,pa:a.as,tdf:a.htd,tda:a.atd}),this.rows.get(a.away).push({opp:a.home,pf:a.as,pa:a.hs,tdf:a.atd,tda:a.htd})}rec(e,a=()=>!0){let s=0,t=0,r=0;for(const o of this.rows.get(e))a(o)&&(o.pf>o.pa?s++:o.pf<o.pa?t++:r++);return{w:s,l:t,t:r,n:s+t+r}}pct(e,a){const s=this.rec(e,a);return Ei(s.w,s.l,s.t)}overall(e){return this.pct(e)}net(e,a=()=>!0){let s=0;for(const t of this.rows.get(e))a(t)&&(s+=t.pf-t.pa);return s}netTD(e){let a=0;for(const s of this.rows.get(e))a+=s.tdf-s.tda;return a}sov(e){return this.oppPct(e,a=>a.pf>a.pa)}sos(e){return this.oppPct(e,()=>!0)}oppPct(e,a){let s=0,t=0;for(const r of this.rows.get(e))if(a(r)){const o=this.rec(r.opp);s+=o.w+.5*o.t,t+=o.n}return t===0?0:s/t}total(e,a){let s=0;for(const t of this.rows.get(e))s+=t[a];return s}};const Ae=n=>is(mt,n),Hu=(n,e)=>Ae(n).conf===Ae(e).conf&&Ae(n).div===Ae(e).div,Ro=(n,e)=>Ae(n).conf===Ae(e).conf;function Eo(n,e,a){const s=n.total(e,"pf"),t=n.total(e,"pa");return 1+a.filter(r=>n.total(r,"pf")>s).length+1+a.filter(r=>n.total(r,"pa")<t).length}const bi=1e-12;function ue(n,e){const a=n.map(e),s=Math.max(...a),t=n.filter((r,o)=>G(a,o)>s-bi);return t.length===n.length?null:t}function Ku(n,e){const a=v=>{if(n==="division")return ue(v,B=>{let C=0,k=0,w=0;for(const T of v)if(T!==B){const S=e.rec(B,J=>J.opp===T);C+=S.w,k+=S.l,w+=S.t}return Ei(C,k,w)});if(v.length===2)return ue(v,B=>e.pct(B,C=>C.opp===v.find(k=>k!==B)));for(const B of v)if(v.filter(k=>k!==B).every(k=>{const w=e.rec(B,T=>T.opp===k);return w.n>0&&w.w===w.n}))return[B];for(const B of v)if(v.filter(k=>k!==B).every(k=>{const w=e.rec(B,T=>T.opp===k);return w.n>0&&w.l===w.n}))return v.filter(k=>k!==B);return null},s=v=>ue(v,B=>e.pct(B,C=>Hu(B,C.opp))),t=v=>ue(v,B=>e.pct(B,C=>Ro(B,C.opp))),r=v=>B=>{const C=B.map(T=>new Set(e.rows.get(T).map(S=>S.opp))),k=[...G(C,0)].filter(T=>!B.includes(T)&&C.every(S=>S.has(T))),w=T=>k.includes(T.opp);return!k.length||B.some(T=>e.rec(T,w).n<v)?null:ue(B,T=>e.pct(T,w))},o=v=>ue(v,B=>e.sov(B)),l=v=>ue(v,B=>e.sos(B)),i=v=>gn.filter(B=>B.conf===Ae(G(v,0)).conf).map(B=>B.name),c=v=>{const B=i(v);return ue(v,C=>-Eo(e,C,B))},u=v=>{const B=gn.map(C=>C.name);return ue(v,C=>-Eo(e,C,B))},p=v=>{const B=v.map(k=>new Set(e.rows.get(k).map(w=>w.opp))),C=[...G(B,0)].filter(k=>!v.includes(k)&&B.every(w=>w.has(k)));return C.length?ue(v,k=>e.net(k,w=>C.includes(w.opp))):null},m=v=>ue(v,B=>e.net(B,C=>Ro(B,C.opp))),d=v=>ue(v,B=>e.net(B)),h=v=>ue(v,B=>e.netTD(B));return n==="division"?[a,s,r(0),t,o,l,c,u,p,d,h]:[a,t,r(4),o,l,c,u,m,d,h]}function Li(n,e,a,s){const t=Ku(e,a);let r=n.slice();n:for(;r.length>1;){for(const i of t){const c=i(r);if(c&&c.length<r.length&&c.length>0){r=c;continue n}}const o=r.slice().sort(),l=s.fork("coin:"+o.join("|")).next();return G(o,Math.floor(l*o.length))}return G(r,0)}function Ai(n,e,a,s){const t=[];let r=n.slice();for(;r.length>1;){const o=Li(r,e,a,s);t.push(o),r=r.filter(l=>l!==o)}return t.concat(r)}function bo(n,e,a){const s=[];let t=n.slice();for(;t.length;){const r=[];for(const l of new Set(t.map(i=>Ae(i).conf+Ae(i).div))){const i=t.filter(c=>Ae(c).conf+Ae(c).div===l);r.push(i.length>1?G(Ai(i,"division",e,a),0):G(i,0))}const o=r.length===1?G(r,0):Li(r,"wildcard",e,a);s.push(o),t=t.filter(l=>l!==o)}return s}function _t(n,e){const a=n.slice().sort((t,r)=>e.overall(r)-e.overall(t)),s=[];for(const t of a){const r=s[s.length-1];r&&Math.abs(e.overall(G(r,0))-e.overall(t))<bi?r.push(t):s.push([t])}return s}function Mi(n,e){const a=new Iu(n),s={},t={},r={AFC:[],NFC:[]},o={AFC:[],NFC:[]};for(const l of["AFC","NFC"]){for(const p of Ge){const m=_t(Ca(l,p),a).flatMap(d=>d.length>1?Ai(d,"division",a,e):d);s[`${l} ${p}`]=m,m.forEach((d,h)=>t[d]=h+1),o[l].push(G(m,0))}const i=_t(o[l],a).flatMap(p=>p.length>1?bo(p,a,e):p),c=gn.filter(p=>p.conf===l&&!o[l].includes(p.name)).map(p=>p.name),u=_t(c,a).flatMap(p=>p.length>1?bo(p,a,e):p).slice(0,3);r[l]=[...i,...u]}return{seeds:r,divisionOrder:s,divisionRank:t,divisionWinners:o}}function xu(n){const e=Object.fromEntries(n.map(s=>[s.name,s.ratings])),a={};for(const s of["AFC","NFC"])for(const t of Ge)Ca(s,t).sort((r,o)=>is(e,o).off+is(e,o).def-is(e,r).off-is(e,r).def).forEach((r,o)=>a[r]=o+1);return a}function Lo(n,e){return n.events.filter(a=>a.side===e&&(a.kind==="TD"||a.kind==="DEF_TD")).length}const Jr=18,Ys=["Wild Card","Divisional","Conference","Super Bowl"],Ou=n=>n.year+n.run,vt=n=>n.nextWeek>22,_r=n=>n>=19&&n<=22?Ys[n-19]??null:null;function Vu(n,e){Fi(n);const a=e.run??0,s=e.prevRank??xu(n),t=Pu(Ye(e.seed).fork("schedule"),e.year+a,s).sort((r,o)=>r.week-o.week);return{seed:e.seed,year:e.year,run:a,prevRank:s,homeField:e.homeField,schedule:t,nextWeek:1,scores:[],playoffs:[],seeding:null,champion:null}}const Yu=(n,e,a)=>e?`po:${e}:${a}`:`w${n}:${a}`,gt=(n,e,a)=>iu(n,Yu(e,_r(e),a));function Ji(n){if(vt(n))return[];const e=n.nextWeek,a=_r(e),s=a?Qu(n,a):n.schedule.filter(r=>r.week===e).map(r=>[r.home,r.away]),t=a==="Super Bowl"?0:n.homeField;return s.map(([r,o])=>({week:e,round:a,home:r,away:o,seed:gt(n.seed,e,r),...t!==void 0?{homeField:t}:{}}))}function zu(n,e){if(Fi(n),vt(e))throw new Error("season: already finished");const a=new Map(n.map(u=>[u.name,u.ratings])),s=br(n.map(u=>u.ratings)),t=new Map;for(const u of n){const p=rr(u.ratings,s);t.set(u.name,{off:p.off,def:p.def})}const r=Ji(e),o=_r(e.nextWeek),l=r.map(u=>{const p=a.get(u.home),m=a.get(u.away),d=He(p,m,s,{off:t.get(u.home).off,def:t.get(u.away).def}),h=He(m,p,s,{off:t.get(u.away).off,def:t.get(u.home).def});return{home:u.home,away:u.away,round:o,result:Ri(d,h,Ye(u.seed),{playoff:o!==null,...u.homeField!==void 0?{homeField:u.homeField}:{}})}}),i=l.map(u=>({week:e.nextWeek,home:u.home,away:u.away,hs:u.result.homeScore,as:u.result.awayScore,htd:Lo(u.result,"home"),atd:Lo(u.result,"away"),...u.round?{round:u.round}:{}})),c={...e,scores:o?e.scores:[...e.scores,...i],playoffs:o?[...e.playoffs,...i]:e.playoffs,nextWeek:e.nextWeek+1};return e.nextWeek===Jr&&(c.seeding=Mi(c.scores,Ye(e.seed).fork("seeding"))),o==="Super Bowl"&&(c.champion=_i(G(i,0))),{state:c,games:l}}function Bt(n){const e=Object.fromEntries(gn.map(s=>[s.name,{w:0,l:0,t:0,pf:0,pa:0}])),a=s=>{const t=e[s];if(!t)throw new Error("season: unknown team "+s);return t};for(const s of n.scores){const t=a(s.home),r=a(s.away);t.pf+=s.hs,t.pa+=s.as,r.pf+=s.as,r.pa+=s.hs,s.hs>s.as?(t.w++,r.l++):s.hs<s.as?(r.w++,t.l++):(t.t++,r.t++)}return e}const _i=n=>n.hs>n.as?n.home:n.away;function Qu(n,e){const a=n.seeding;if(!a)throw new Error("season: playoffs before the regular season is done");const s=(r,o)=>n.playoffs.filter(l=>l.round===r&&mt[l.home]?.conf===o).map(_i);if(e==="Super Bowl"){const r=l=>G(s("Conference",l),0);return[Ou(n)%2===1?[r("AFC"),r("NFC")]:[r("NFC"),r("AFC")]]}const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r],l=i=>o.indexOf(i)+1;if(e==="Wild Card")for(const[i,c]of[[2,7],[3,6],[4,5]])t.push([G(o,i-1),G(o,c-1)]);else if(e==="Divisional"){const i=[G(o,0),...s("Wild Card",r)].sort((c,u)=>l(c)-l(u));t.push([G(i,0),G(i,i.length-1)],[G(i,1),G(i,2)])}else{const i=s("Divisional",r).sort((c,u)=>l(c)-l(u));t.push([G(i,0),G(i,1)])}}return t}function Fi(n){if(n.length!==32)throw new Error("season: 32 teams needed");const e=new Set(n.map(a=>a.name));for(const a of gn)if(!e.has(a.name))throw new Error("season: missing team "+a.name)}const Wi=["att","cmp","pyd","ptd","ints","sacked","car","ryd","rtd","fumLost","tgt","rec","recYd","recTd","twoPt","tkl","tfl","sack","press","pd","intDef","intDefYd","ff","fr","defTd","safeties","fgm","fga","xpm","xpa","punts","puntYd","kr","krYd","pr","prYd"],Fr=()=>Object.fromEntries(Wi.map(n=>[n,0])),ju=n=>n==="home"?"away":"home",Fa=(n,e,a)=>Math.min(a,Math.max(e,n)),Uu=["OT1","OT2","OG1","OG2","C"],Ao=(n,e,a,s)=>Math.exp(e*(n.ovr-80)+a*(n.p.spd-80)+s*(n.p.str-80));function qu(n,e){switch(e){case"DE1":case"DE2":return"DE";case"DT1":return"DT";case"DT2":return n==="3-4"?"ILB":"DT";case"DL5":return"DL5";case"MIKE":return"ILB";case"WILL":case"SAM":return n==="3-4"?"OLB34":"LB";case"CB1":case"CB2":return"CB";case"CB3":case"DIME":return"NB";case"FS":return"FS";case"SS":return"SS";default:return null}}const Zu={run:{DE:.075,DT:.08,DL5:.03,ILB:.17,LB:.11,OLB34:.09,CB:.035,NB:.02,FS:.06,SS:.11},pass:{DE:.02,DT:.015,DL5:.005,ILB:.09,LB:.08,OLB34:.07,CB:.12,NB:.09,FS:.13,SS:.12},sack:{DE:.3,DT:.15,DL5:.05,ILB:.03,LB:.05,OLB34:.3,CB:.01,NB:.015,FS:.005,SS:.01},press:{DE:.26,DT:.18,DL5:.05,ILB:.04,LB:.06,OLB34:.24,CB:.015,NB:.02,FS:.01,SS:.015},int:{DE:.005,DT:.003,DL5:.001,ILB:.05,LB:.055,OLB34:.045,CB:.17,NB:.12,FS:.2,SS:.13},pd:{DE:.01,DT:.005,DL5:0,ILB:.04,LB:.045,OLB34:.035,CB:.26,NB:.14,FS:.12,SS:.1}},Xu={RB1:.6,RB2:.18,FB:.04,QB:.07,WR1:.01,WR2:.01,WR3:.01},$u={RB1:.55,RB2:.15,FB:.08,QB:.12,WR1:.01,WR2:.01},nd={WR1:.21,WR2:.18,WR3:.12,WR4:.02,TE1:.16,TE2:.05,TE3:.01,RB1:.1,RB2:.04,FB:.01},ed={WR1:.22,WR2:.17,WR3:.11,WR4:.01,TE1:.22,TE2:.08,TE3:.01,RB1:.06,RB2:.03,FB:.02},ad={WR1:1,WR2:1,WR3:1,WR4:1,TE1:.8,TE2:.8,TE3:.8,RB1:.6,RB2:.6,FB:.5};function sd(n,e,a,s){const t={id:`ghost|${s}|${n}`,name:`Backup ${s}`,pos:s,role:s,team:n,ovr:70,spd:70,str:70,freeAgent:!1};return{line:{id:t.id,name:t.name,team:n,side:e,slot:a,label:a,stats:Fr()},p:t,ovr:70,slot:a,kind:""}}function Mo(n,e){const a=[];for(const h of n.lineup.placements){if(!h.player||Uu.includes(h.slot.slot))continue;const v=qu(n.lineup.base,h.slot.slot)??"";a.push({line:{id:h.player.id,name:h.player.name,team:n.team,side:e,slot:h.slot.slot,label:h.slot.label,stats:Fr()},p:h.player,ovr:h.effOvr,slot:h.slot.slot,kind:v})}const s=(h,v)=>{const B=a.find(k=>k.slot===h);if(B)return B;const C=sd(n.team,e,h,v);return a.push(C),C},t=s("QB","QB"),r=s("K","K"),o=s("P","P"),l=(h,v)=>a.filter(B=>h[B.slot]!==void 0).map(B=>[B,h[B.slot]*Ao(B,v,0,0)]),i=(h,v)=>{const B=l(h,v);return B.length?B:[[t,1]]},c=(h,v,B,C)=>a.filter(k=>k.kind).map(k=>[k,Zu[h][k.kind]*Ao(k,v,B,C)]).filter(k=>k[1]>0),u=c("run",.02,.003,.005),p=c("pass",.02,.004,.002),m=(h,v)=>h.map(([B,C],k)=>[B,(C+G(v,k)[1])/2]),d=Si(n.lineup,n.returnerId);return{side:e,team:n.team,qb:t,k:r,pt:o,returner:d?a.find(h=>h.p.id===d.player.id)??null:null,retValue:d?.value??82,carry:i(Xu,.02),carryRz:i($u,.02),target:i(nd,.02),targetRz:i(ed,.02),runTkl:u,passTkl:p,sack:c("sack",.035,.01,.006),press:c("press",.03,.008,.005),ints:c("int",.03,.008,0),pd:c("pd",.03,.008,0),ff:u.map(([h,v])=>[h,v*Math.exp(.008*(h.p.str-80))]),fr:m(u,p),all:a}}function Xn(n,e){let a=0;for(const t of e)a+=t[1];let s=n.next()*a;for(const[t,r]of e)if(s-=r,s<0)return t;return G(e,e.length-1)[0]}const Un=n=>({id:n.p.id,name:n.p.name,team:n.line.team,label:n.line.label}),td=n=>Math.exp(.012*(n.p.spd-80)+.004*(n.p.str-80)),rd=.645;function od(n,e,a,s,t){const r=n.end==="FG"||n.end==="FG_MISS"||n.end==="PUNT";let o=Math.max(0,n.plays-n.sacks-(r?1:0));o===0&&n.rush+n.pass>0&&(o=1);let l=!1;n.end==="TD"&&(l=n.pass>0&&(n.rush===0||t.next()<.28+.55*n.pass/(n.pass+n.rush)),o===0&&(o=1));const i=o?Ia(o,[n.rush/4.3+.15,n.pass/6.6+.15]):[0,0];let c=G(i,0),u=G(i,1);const p=n.end==="INT"?1:0,m=n.pass>0||l?1:0;(n.rush>0||n.end==="TD"&&!l)&&(c=Math.max(c,1)),u=Math.max(u,m+p);const d=u-p,h=Fa(rd+.0035*(a.qb.ovr-80),.5,.78);let v=0;if(m){for(let b=0;b<d;b++)t.next()<h&&v++;v=Math.max(v,1)}const B=[];for(let b=0;b<c;b++)B.push(Xn(t,a.carry));let C=null;n.end==="TD"&&!l&&(C=Xn(t,a.carryRz),B[c-1]=C);const k=c?Ia(n.rush,B.map(b=>Math.exp(.6*t.normal())*td(b))):[],w=(b,A)=>{if(G(b,A)>=1)return;let O=-1;for(let z=0;z<b.length;z++)z!==A&&G(b,z)>1&&(O<0||G(b,z)>G(b,O))&&(O=z);O>=0&&(b[O]=G(b,O)-1,b[A]=G(b,A)+1)};C&&w(k,c-1),B.forEach((b,A)=>{b.line.stats.car++,b.line.stats.ryd+=G(k,A)}),C&&C.line.stats.rtd++;const T=[];for(let b=0;b<v;b++)T.push(Xn(t,a.target));let S=null;l&&(S=Xn(t,a.targetRz),T[v-1]=S);const J=v?Ia(n.pass,T.map(b=>Math.exp(.55*t.normal())*(ad[b.slot]??.7)*Math.exp(.012*(b.p.spd-80)))):[];S&&w(J,v-1),T.forEach((b,A)=>{b.line.stats.tgt++,b.line.stats.rec++,b.line.stats.recYd+=G(J,A)}),S&&S.line.stats.recTd++;for(let b=0;b<u-v;b++){const A=Xn(t,a.target);A.line.stats.tgt++}const P=a.qb.line.stats;P.att+=u,P.cmp+=v,P.pyd+=n.pass,P.sacked+=n.sacks,l&&P.ptd++,P.ints+=p,B.forEach((b,A)=>{if(b===C&&A===c-1)return;const O=Xn(t,s.runTkl);O.line.stats.tkl++,t.next()<(G(k,A)<=1?.2:G(k,A)<=3?.06:0)&&O.line.stats.tfl++}),T.forEach((b,A)=>{b===S&&A===v-1||Xn(t,s.passTkl).line.stats.tkl++});for(let b=0;b<n.sacks;b++){const A=Xn(t,s.sack).line.stats;A.sack++,A.press++,A.tkl++,A.tfl++}for(let b=0;b<u;b++)t.next()<.17&&Xn(t,s.press).line.stats.press++;for(let b=0;b<u-v-p;b++)t.next()<.45&&Xn(t,s.pd).line.stats.pd++;const F={drive:e,side:n.side,period:n.period,kind:n.end==="TD"?l?"PASS_TD":"RUSH_TD":n.end==="FG"?"FG":n.end==="FG_MISS"?"FG_MISS":n.end==="INT"?"INT":n.end==="FUM"?"FUM":n.end==="SAFETY"?"SAFETY":n.end==="PUNT"?"PUNT":n.end==="DOWNS"?"DOWNS":"HALF"};if(n.end==="TD"){const b=l?S:C;F.scorer=Un(b),F.tdYards=l?G(J,v-1):G(k,c-1),l&&(F.passer=Un(a.qb));const A=a.k.line.stats;if(n.conv!==void 0&&(F.conv=n.conv),n.conv==="xp")A.xpa++,A.xpm++,F.convKicker=Un(a.k);else if(n.conv==="xp_miss")A.xpa++,F.convKicker=Un(a.k);else if(n.conv==="two"||n.conv==="two_fail"){const O=t.next()<.55,z=Xn(t,O?a.targetRz:a.carryRz);F.convBy=Un(z),O&&(F.convPasser=Un(a.qb)),n.conv==="two"&&z.line.stats.twoPt++}}if(n.end==="FG"&&(a.k.line.stats.fga++,a.k.line.stats.fgm++,F.kicker=Un(a.k),F.kickYards=Fa(Math.round(35+8*t.normal()),19,63)),n.end==="FG_MISS"&&(a.k.line.stats.fga++,F.kicker=Un(a.k),F.kickYards=Fa(Math.round(46+7*t.normal()),30,66)),n.end==="PUNT"){a.pt.line.stats.punts++;const b=Fa(Math.round(45+5.5*t.normal()),28,66);a.pt.line.stats.puntYd+=b,F.kicker=Un(a.pt),F.kickYards=b}if(n.end==="INT"){const b=Xn(t,s.ints);b.line.stats.intDef++;const A=n.defTD?t.int(15,85):Math.max(0,Math.round(10+9*t.normal()));b.line.stats.intDefYd+=A,n.defTD&&b.line.stats.defTd++,F.giver=Un(a.qb),F.taker=Un(b),F.retYards=A,F.defTD=n.defTD}if(n.end==="FUM"){const b=[...B,...T],A=b.length?G(b,t.int(0,b.length-1)):a.qb;A.line.stats.fumLost++;const O=Xn(t,s.ff);O.line.stats.ff++;const z=Xn(t,s.fr);z.line.stats.fr++;const Q=n.defTD?t.int(5,70):t.int(0,12);n.defTD&&z.line.stats.defTd++,F.giver=Un(A),F.forcer=Un(O),F.taker=Un(z),F.retYards=Q,F.defTD=n.defTD}if((n.end==="INT"||n.end==="FUM")&&n.defTD&&(s.k.line.stats.xpa++,s.k.line.stats.xpm++,F.defKicker=Un(s.k)),n.end==="SAFETY"){const b=Xn(t,s.sack);b.line.stats.safeties++,F.taker=Un(b)}return F}function ld(n,e,a){const s=n.drives;for(let t=0;t<s.length;t++){const r=G(s,t),o=r.side,l=e[o];if(!l.returner)continue;const i=t>0?G(s,t-1):null,c=!i||r.start>=1800&&i.start<1800||r.period>=5&&i.period<5||i.pts>0||i.oppPts>0,u=i&&i.side!==o,p=l.returner.line.stats;c&&a.next()<.45?(p.kr++,p.krYd+=Fa(Math.round(24+.13*(l.retValue-82)+5*a.normal()),10,55)):!c&&u&&i&&i.end==="PUNT"&&a.next()<.36&&(p.pr++,p.prYd+=Fa(Math.round(8.5+.12*(l.retValue-82)+5*a.normal()),0,40))}}function id(n,e,a,s){const t={home:Mo(e,"home"),away:Mo(a,"away")},r=s.fork("box"),o=n.drives.map((l,i)=>od(l,i,t[l.side],t[ju(l.side)],r));return ld(n,t,r.fork("returns")),{home:e.team,away:a.team,lines:[...t.home.all,...t.away.all].map(l=>l.line),credits:o}}const cd=new Set(["RB1","RB2","FB","WR1","WR2","WR3","WR4","TE1","TE2","TE3"]);function Jo(n){const e=n.stats;return n.slot==="QB"?.045*e.pyd+5*e.ptd-6*e.ints+.03*e.ryd+4*e.rtd-4*e.fumLost:.07*(e.ryd+e.recYd)+.3*e.rec+6*(e.rtd+e.recTd)+3*e.twoPt-8*e.fumLost}function fd(n){const e=n.stats;return 4*e.sack+5*e.intDef+8*e.defTd+3*e.ff+2.5*e.fr+e.pd+.6*e.tfl+.25*e.tkl+.1*(e.press-e.sack)+4*e.safeties}const Pi=n=>n.slot==="QB"||cd.has(n.slot),ud=n=>!Pi(n)&&n.slot!=="K"&&n.slot!=="P",dd=()=>({players:{}});function pd(n,e){for(const a of e.lines){const s=n.players[a.id]??={id:a.id,name:a.name,team:a.team,slot:a.slot,label:a.label,games:0,stats:Fr()};s.games++,s.slot=a.slot,s.label=a.label,s.team=a.team;for(const t of Wi)s.stats[t]+=a.stats[t]}}const Gi=["pyd","ptd","ryd","rtd","recYd","rec","recTd","sack","intDef","tkl","ff","fgm","defTd"];function Wr(n,e,a=5){return Object.values(n.players).filter(s=>s.stats[e]>0).sort((s,t)=>t.stats[e]-s.stats[e]||(s.id<t.id?-1:1)).slice(0,a)}const _o=n=>n?n.w+n.t/2:8.5;function hd(n,e,a){const s=Object.values(n.players).sort((m,d)=>m.id<d.id?-1:1),t=(m,d)=>m.reduce((h,v)=>h===null||d(v)>d(h)?v:h,null),r=s.filter(Pi),o=s.filter(ud),l=t(r,m=>Jo(m)*(1+.04*(_o(e[m.team])-9))),i=t(r.filter(m=>m!==l),m=>Jo(m)),c=t(o,m=>fd(m));let u=null;for(const m of Object.keys(e).sort()){const d=_o(e[m]),h=a?.[m]??8.5,v=d-h;(!u||v>u.over||v===u.over&&d>u.wins)&&(u={team:m,wins:d,expected:h,over:v})}const p={};for(const m of Gi)p[m]=Wr(n,m,5);return{mvp:l,opoy:i,dpoy:c,coach:u,leaders:p}}function md(n,e,a){const s=l=>l==="home"?e:a,t=l=>`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`,r=(l,i)=>{if(i>=5)return`OT ${t(Math.max(0,l-3600))}`;const c=Math.min(4,Math.max(1,Math.ceil(l/900)));return`Q${c} ${t(Math.max(0,900*c-l))}`},o=n.drives.map((l,i)=>({kind:"drive",n:i+1,team:s(l.side),period:l.period,clock:r(l.start,l.period),plays:l.plays,yards:null,end:l.end,pts:l.pts,oppPts:l.oppPts,defTD:l.defTD,scores:n.events.filter(c=>c.drive===i+1).map(c=>({team:s(c.side),kind:c.kind,pts:c.pts,conv:c.conv??"none",at:c.at})),summary:vd(l,s(l.side))}));return{v:1,home:e,away:a,homeScore:n.homeScore,awayScore:n.awayScore,regHome:n.regHome,regAway:n.regAway,ot:n.ot?{first:s(n.ot.first),periods:n.ot.periods,tie:n.ot.tie}:null,drives:o,mvpLine:null}}function vd(n,e){const a={TD:"ends in a touchdown",FG:"kicks a field goal",FG_MISS:"misses a field goal",PUNT:"punts",INT:"throws an interception",FUM:"loses a fumble",DOWNS:"turns it over on downs",HALF:"runs out the half",SAFETY:"is sacked in the end zone for a safety"},s=Math.max(1,Math.round(n.secs/60)),t=n.oppPts?` ${e} gives up ${n.oppPts} the other way.`:"";return`${e} ${a[n.end]} — ${n.plays} plays, ${s} min.${t}`}const gd=["olRun","olPass","rb","qb","rec","passRush","frontRun","coverage","kicker","rec12","rec13","rec21","rec22","rec11","frontBase","frontNick","covBase","covNick","covDime","te1","te2","rbHeavy","ret","p","qbRunR","wrBlk","passOff","runOff","off","def"];function Ni(n,e){const a=Ji(n).find(s=>s.home===e||s.away===e);return a?a.seed:n.seed}function Bd(n,e,a){const s={};for(const o of e)s[o.name]={...o.ratings};const t=o=>({week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd,atd:o.atd,...o.round?{round:o.round}:{}}),r={seed:n.seed,year:n.year,run:n.run,gameSeed:Ni(n,a.userTeam),nextWeek:n.nextWeek,userTeam:a.userTeam,roster:a.roster,ratings:s,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})),scores:[...n.scores.map(t),...n.playoffs.map(t)],plan:a.plan,statsRecorded:a.statsRecorded,prevRank:{...n.prevRank}};return n.homeField!==void 0&&(r.homeField=n.homeField),r}function Ii(n){const e=[];for(const o of gn){const l=n.ratings[o.name];if(!l||typeof l!="object")return{ok:!1,message:"week: no ratings for "+o.name};for(const i of gd)if(typeof l[i]!="number"||!Number.isFinite(l[i]))return{ok:!1,message:"week: bad rating "+i+" for "+o.name};e.push({name:o.name,ratings:{...l}})}const a=[],s=[];for(const o of n.scores){const l={week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd??0,atd:o.atd??0,...o.round?{round:o.round}:{}};(o.round?s:a).push(l)}const t={seed:n.seed,year:n.year,run:n.run,prevRank:n.prevRank?{...n.prevRank}:{},homeField:n.homeField,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})).sort((o,l)=>o.week-l.week),nextWeek:n.nextWeek,scores:a,playoffs:s,seeding:null,champion:null};t.nextWeek>Jr&&(t.seeding=Mi(a,Ye(n.seed).fork("seeding")));const r=s.find(o=>o.round==="Super Bowl");return r&&(t.champion=r.hs>r.as?r.home:r.away),n.prevRank?t.nextWeek<=22&&Ni(t,n.userTeam)!==n.gameSeed?{ok:!1,message:"week: stored gameSeed does not match the state (changed save?)"}:{ok:!0,value:{state:t,teams:e,context:{userTeam:n.userTeam,roster:n.roster,plan:n.plan,statsRecorded:n.statsRecorded}}}:{ok:!1,message:"week: saved without prevRank (cannot rebuild a run-it-back)"}}const Cd=6,Td=4,yd=2,Sd=1,Fo={"Wild Card":Cd,Divisional:Td,Conference:yd,"Super Bowl":Sd};function Hi(n){const e=n.payload;if(!Number.isInteger(e.nextWeek)||e.nextWeek<1||e.nextWeek>Jr+4)return Vn(`week: nextWeek ${e.nextWeek} outside 1..22`);if(e.scores.find(h=>h.round==="Super Bowl")&&e.nextWeek!==22)return Vn("week: a Super Bowl score exists but nextWeek is not 22 (finished seasons are Season payloads, not week saves)");const s=h=>Ys.indexOf(h);for(const h of e.scores){if(h.round&&!Ys.includes(h.round))return Vn(`week: unknown playoff round '${h.round}'`);if(h.round&&h.week!==19+s(h.round))return Vn(`week: round '${h.round}' stored under week ${h.week} (expected ${19+s(h.round)})`)}for(const h of e.scores)if(!Number.isInteger(h.htd)||!Number.isInteger(h.atd))return Vn(`week: score ${h.home} vs ${h.away} (week ${h.week}) lacks htd/atd — seeding tiebreaks would silently change`);const t=(h,v,B)=>`${h}|${v}|${B}`,r=new Set(e.schedule.map(h=>t(h.week,h.home,h.away))),o=new Map;for(const h of e.scores){if(!h.round&&!r.has(t(h.week,h.home,h.away)))return Vn(`week: score ${h.away} @ ${h.home} (week ${h.week}) is not on the stored schedule`);const v=t(h.week,h.home,h.away);if(o.has(v))return Vn(`week: fixture ${h.away} @ ${h.home} (week ${h.week}) appears twice in scores`);o.set(v,h)}for(const h of e.schedule)if(!(h.week<e.nextWeek&&!h.week)&&h.week<e.nextWeek&&!o.has(t(h.week,h.home,h.away)))return Vn(`week: scheduled game ${h.away} @ ${h.home} (week ${h.week}) has no score but week ${h.week} < nextWeek ${e.nextWeek}`);const l=new Map;for(const h of e.scores)h.round&&(l.get(h.round)??l.set(h.round,[]).get(h.round)).push(h);let i=new Set;for(const h of Ys){const v=l.get(h)??[];if(!v.length)break;if(v.length!==Fo[h])return Vn(`week: ${h} has ${v.length} games (expected ${Fo[h]})`);if(h!=="Wild Card"){for(const B of v)if(!i.has(B.home)&&!i.has(B.away))return Vn(`week: ${h} game ${B.away} @ ${B.home} has no participant from the previous round's winners`)}if(i=new Set(v.map(B=>B.hs>B.as?B.home:B.away)),i.size!==v.length)return Vn(`week: ${h} has a tie or a repeat winner — playoff games cannot tie`)}const u=l.get("Super Bowl")?.[0];if(u&&u.hs===u.as)return Vn("week: the Super Bowl ended level — impossible in the engine");const p=Ii(e);if(!p.ok)return Vn(p.message);const m=p.value,d=new Set(gn.map(h=>h.name));for(const h of[...e.schedule,...e.scores])if(!d.has(h.home)||!d.has(h.away))return Vn(`week: unknown team name in ${h.away} @ ${h.home}`);return{ok:!0,value:m}}function Vn(n){return{ok:!1,code:"corrupt",message:n}}function kd(n){const e=n.payload,a=e.userResults[e.userResults.length-1];if(!a)return Vn("season: no user results");const s=a.hs>a.as?a.home:a.away;return e.champion===e.userTeam&&e.userOutcome!=="champion"?Vn("season: champion is the user but userOutcome says otherwise"):e.champion!==e.userTeam&&e.userOutcome==="champion"?Vn("season: userOutcome says champion but the stored champion is not the user"):e.champion===e.userTeam&&s!==e.userTeam?Vn("season: stored champion is the user but the last result was a loss"):{ok:!0,value:null}}const Dd={"Wild Card":"wild-card",Divisional:"divisional",Conference:"conference","Super Bowl":"super-bowl-loss"},wd=n=>n.hs>n.as?n.home:n.as>n.hs?n.away:null;function Rd(n,e){const a=mt[e];if(!a)throw new Error("outcome: unknown team "+e);if(!n.seeding)return null;if(!n.seeding.seeds[a.conf].includes(e))return"missed-playoffs";for(const s of n.playoffs){if(s.home!==e&&s.away!==e)continue;const t=wd(s);if(t!==null){if(t!==e)return Dd[s.round];if(s.round==="Super Bowl")return"champion"}}return null}function Ed(n,e=0){let a=3735928559^e,s=1103547991^e;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);a=Math.imul(a^r,2654435761),s=Math.imul(s^r,1597334677)}return a=Math.imul(a^a>>>16,2246822507)^Math.imul(s^s>>>13,3266489909),s=Math.imul(s^s>>>16,2246822507)^Math.imul(a^a>>>13,3266489909),(4294967296*(2097151&s)+(a>>>0)).toString(16).padStart(14,"0")}async function bd(n){const e=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(e)].map(a=>a.toString(16).padStart(2,"0")).join("")}const Is=n=>({ok:!1,error:n instanceof Error?n.message:String(n)});class Ld{constructor(e,a={}){this.ls=e,this.o=a}ls;o;get storage(){return this.ls}async read(e){try{return{ok:!0,value:this.storage?.getItem(e)??null}}catch(a){return Is(a)}}async write(e,a){try{if(y0(e)&&this.o.slotCheck)try{const s=$l(JSON.parse(a));if(s.ok){const t=this.o.slotCheck(s.value.slot,e);if(t)return{ok:!1,error:t}}}catch{}return this.storage?.setItem(e,a),{ok:!0,value:void 0}}catch(s){return Is(s)}}async remove(e){try{return this.storage?.removeItem(e),{ok:!0,value:void 0}}catch(a){return Is(a)}}async keys(e){try{const a=this.storage;if(!a)return{ok:!0,value:[]};const s=[];for(let t=0;t<a.length;t++){const r=a.key(t);r!==null&&r.startsWith(e)&&s.push(r)}return{ok:!0,value:s.sort()}}catch(a){return Is(a)}}async entries(e){const a=await this.keys(e);if(!a.ok)return a;const s=[];for(const t of a.value){const r=await this.read(t);r.ok&&r.value!==null&&s.push([t,r.value])}return{ok:!0,value:s}}}const Ad=(n={})=>new Ld(typeof localStorage>"u"?null:localStorage,n),Md="nfl1";function Jd(){const{RATING_SPECS:n,DEF_SPECS:e,PERS_REC:a,RB_HEAVY:s,PERS:t,STRAT:r,DEF_FOCUS:o,PLAN_K:l,MC:i,RUSH_BASE:c,PASS_BASE:u,PT_RUSH:p,PT_PASS:m,PT_TO:d,PT_SACK:h,LAM_TO:v,LAM_SACK:B,BASE_PTS:C,HOME_FIELD:k,PTS_NOISE:w,RET_PTS:T,RET_NEUTRAL:S,QB_RUN_C:J,WR_BLK_C:P,WR_BLK_W:F,PUNT_PTS:b,DIME_W:A,POINTS_PER_WIN:O,GAMES:z}=M0;return JSON.stringify([Se,$s,nr,Lr,n,e,a,s,t,r,o,l,i,[c,u,p,m,d,h,v,B,C,k,w,T,S,J,P,F,b,A,O,z]])}const ks=()=>Md+"."+Ed(Jd()),_d={"Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB","Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","NY Giants":"NYG","NY Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"},bn=n=>_d[n]??n.slice(0,3).toUpperCase(),Fd=n=>gn.find(e=>e.name===n),Ki=["Wild Card","Divisional","Conference","Super Bowl"],ja=18;function Wo(n){return ja+Ki.length}function Wd(n,e){const a=ja;if(e<=a){const l=n.schedule.filter(i=>i.week===e).map(i=>Po(n,i,i.kind,null));return{week:e,label:"WEEK "+e,games:l,done:l.every(i=>i.hs!==null)}}const s=Ki[e-a-1]??null;if(!s)throw new Error(`weekVM: no week slot ${e}`);const r=Pd(n,s).map(([o,l])=>Po(n,{week:e,home:o,away:l},"playoff",s));return{week:e,label:s.toUpperCase(),games:r,done:r.every(o=>o.hs!==null)}}function Pd(n,e){const a=n.seeding;if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}return n.playoffs.filter(t=>t.round===e).map(t=>[t.home,t.away])}function Po(n,e,a,s){const t=s?n.playoffs.find(o=>o.round===s&&(o.home===e.home||o.away===e.home)):n.scores.find(o=>o.week===e.week&&o.home===e.home&&o.away===e.away),r=gt(n.seed,e.week,e.home);return{home:e.home,away:e.away,homeAbbr:bn(e.home),awayAbbr:bn(e.away),hs:t?t.hs:null,as:t?t.as:null,kind:s?"playoff":a,round:s,replayLabel:s?`po:${s}:${e.home}`:`w${e.week}:${e.home}`,gameSeed:r,me:!1}}function Gd(n,e){const s=Math.min(e,ja),t={};for(const c of gn)t[c.name]={w:0,l:0,t:0,pf:0,pa:0};for(const c of n.scores){if(c.week>s)continue;const u=t[c.home],p=t[c.away],m=c.hs,d=c.as;u.pf+=m,u.pa+=d,p.pf+=d,p.pa+=m,m>d?(u.w++,p.l++):d>m?(p.w++,u.l++):(u.t++,p.t++)}const r=c=>{if(!n.seeding)return null;const u=n.seeding.seeds.AFC.indexOf(c),p=n.seeding.seeds.NFC.indexOf(c);return u>=0?u+1:p>=0?p+1:null},o=c=>{const u=Fd(c),p=t[c],m=(p.w+.5*p.t)/Math.max(1,p.w+p.l+p.t);return{team:c,abbr:bn(c),conf:u.conf,div:u.div,w:p.w,l:p.l,t:p.t,pf:p.pf,pa:p.pa,winPct:m===1?"1.000":m.toFixed(3),seed:r(c)}},l=gn.map(c=>o(c.name)).sort((c,u)=>u.w-c.w||c.pa-u.pa||c.team.localeCompare(u.team)),i=[];for(const c of["AFC","NFC"])for(const u of["East","North","South","West"]){const p=gn.filter(m=>m.conf===c&&m.div===u).map(m=>o(m.name)).sort((m,d)=>d.w-m.w||m.pa-d.pa||m.team.localeCompare(d.team));i.push({conf:c,div:u,rows:p})}return{throughWeek:s,league:l,divisions:i}}function Nd(n,e,a,s){return Bd(n,e,{userTeam:a,roster:s,plan:null,statsRecorded:!1})}function Go(n){const e=gn.map(s=>{const t=n.ratings[s.name];return{name:s.name,ratings:{...t}}}),a=Ii(n);return a.ok?{ok:!0,value:{state:a.value.state,teams:e,userTeamName:a.value.context.userTeam,roster:a.value.context.roster}}:{ok:!1,message:a.message}}function Id(n,e,a){const s=Bt(n)??{},t=gn.map(l=>{const i=s[l.name]??{w:0,l:0,t:0,pf:0,pa:0};return{team:l.name,w:i.w,l:i.l,t:i.t,pf:i.pf,pa:i.pa}}),r=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e).map(l=>({week:l.week,home:l.home,away:l.away,hs:l.hs,as:l.as,...l.round?{round:l.round}:{},htd:l.htd,atd:l.atd})),o=n.champion?Rd(n,e)??"missed-playoffs":"missed-playoffs";return{seed:n.seed,year:n.year,run:n.run,userTeam:e,roster:a,table:t,userResults:r,champion:n.champion??"",userOutcome:o,statsRecorded:!1}}let Cn=null,wa=null,Ra="",Hs=[],Re=1;const or=new Set,Ks=()=>{for(const n of or)n()},En={get ready(){return Cn!==null},get slot(){return Re},get total(){return Cn?Wo():ja+4},get view(){return Cn?Wd(Cn,Re):null},get standings(){return Cn?Gd(Cn,Re):null},get finished(){return Cn?vt(Cn):!1},get champion(){return Cn?.champion??null},get userTeamName(){return Ra},get label(){return this.view?.label??""},get atLastPlayed(){return Cn?Re===Cn.nextWeek-1:!1},get runState(){return Cn},get userRoster(){return Hs},subscribe(n){return or.add(n),()=>or.delete(n)},begin(n,e,a,s,t){wa=n,Ra=s,Hs=t,Cn=Vu(n,{seed:e,year:a}),Re=1,Ks()},resume(n,e,a,s){wa=e,Ra=a,Hs=s,Cn=n,Re=Math.max(1,Math.min(n.nextWeek,Wo())),Ks()},step(){if(!Cn||!wa)return null;Re=Cn.nextWeek;const n=zu(wa,Cn);Cn=n.state;const e=n.games.map(a=>({home:a.home,away:a.away,round:a.round,result:a.result,gs:gt(Cn.seed,Cn.nextWeek-1,a.home)}));return Ks(),{week:Cn.nextWeek-1,games:e}},go(n){Re=Math.max(1,Math.min(this.total,n)),Ks()},next(){this.go(Re+1)},prev(){this.go(Re-1)},weekPayload(){return Nd(Cn,wa,Ra,Hs)},snapshot(){return{state:Cn,teams:wa,userTeamName:Ra,slot:Re}},scores(){return Cn?[...Cn.scores,...Cn.playoffs]:[]},userTeamIndex(){return gn.findIndex(n=>n.name===Ra)}},fs={mode:"system",reducedMotion:!1,newestFirst:!0,teamName:null,draftSlot:null},xi=Ls("nfl","settings");function Oi(){try{return globalThis.localStorage}catch{return null}}function Vi(){const n=Oi();if(!n)return{...fs};try{const e=n.getItem(xi);if(!e)return{...fs};const a=JSON.parse(e);return{mode:a.mode==="light"||a.mode==="dark"||a.mode==="system"?a.mode:fs.mode,reducedMotion:a.reducedMotion===!0,newestFirst:a.newestFirst!==!1,teamName:typeof a.teamName=="string"?a.teamName:null,draftSlot:typeof a.draftSlot=="number"&&a.draftSlot>=1&&a.draftSlot<=32?a.draftSlot:null}}catch{return{...fs}}}function Hd(n){const e=Oi();if(e)try{e.setItem(xi,JSON.stringify(n))}catch{}}function Kd(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}const xd=["team","board","complete","hub","week","standings","bracket","book","awards","review","guide","cards","feed","stats","settings","saves","share"],Od=new RegExp("^#/?("+xd.join("|")+")(?:/([0-9]{1,2}))?$");function Vd(n){const e=Od.exec(n);return e?{screen:e[1],param:e[2]?Number(e[2]):null}:null}function Yd(n,e){return"#/"+n+(e!=null?"/"+e:"")}function zd(){return typeof location>"u"?null:Vd(location.hash)}function Qd(n,e){typeof location>"u"||(location.hash=Yd(n,e))}function jd(n){return uu(n)}function Ud(n){return jl(n.getState(),e=>(e(n.getState()),n.subscribe(e)))}function fa(n){return Sr(n)}function qd(){return jl(Ft(),n=>(n(Ft()),En.subscribe(()=>n(Ft()))))}function Ft(){const n=En;return{ready:n.ready,slot:n.slot,total:n.total,view:n.view,standings:n.standings,finished:n.finished,champion:n.champion,userTeamName:n.userTeamName,label:n.label,atLastPlayed:n.atLastPlayed,runState:n.runState}}function Zd(){return Sr({...fs,...Vi()})}const Xd="Model Value",Je={measured:Xd,balance:"Game balance",owner:"Owner preset"};let je={mode:"measured",locked:!1};const xs=new Set,re={get(){return je},set(n){je.locked||(je={...je,mode:n},xs.forEach(e=>e(je)))},lock(){je={...je,locked:!0},xs.forEach(n=>n(je))},subscribe(n){return xs.add(n),n(je),()=>xs.delete(n)}},Wt=2147483647,$d=1e5,np=99e5;function Ct(n){return"b36:"+n.toString(36)}function No(n){const e=String(n??"").trim();if(!e)return null;if(e.slice(0,4)==="b36:"){if(!/^[0-9a-z]+$/i.test(e.slice(4)))return null;const a=parseInt(e.slice(4),36);return Number.isInteger(a)&&a>=1&&a<=Wt?a:null}if(/^\d{1,10}$/.test(e)){const a=Number(e);return Number.isInteger(a)&&a>=1&&a<=Wt?a:null}if(/^[0-9a-z]{1,6}$/i.test(e)){const a=parseInt(e,36);return Number.isInteger(a)&&a>=1&&a<=Wt?a:null}return null}function ep(){return $d+Math.floor(Math.random()*np)}function Io(n){try{const e=new URL(location.href);e.searchParams.set("seed",Ct(n)),history.replaceState(null,"",e.toString())}catch{}}const ap={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},zs={bg:"#fdf2f6",zcream:"#53382b",gold2:"#e6c67d",goldm:"#ad7f2e"},sp={bg:"#1e1119"},Yi=["#e6c67d","#f2e7d5","#c39a4a"],tp="#291a24",rp="#ffffff",zi=ap,op=n=>zi[n]??Yi;function ot(n){const e=n.replace("#","");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}function Qi(n,e,a){const s=t=>Math.max(0,Math.min(255,Math.round(t))).toString(16).padStart(2,"0");return"#"+s(n)+s(e)+s(a)}function Pt(n,e,a){const s=ot(n),t=ot(e);return Qi(s[0]+(t[0]-s[0])*a,s[1]+(t[1]-s[1])*a,s[2]+(t[2]-s[2])*a)}function Be(n){const[e,a,s]=ot(n).map(c=>c/255),t=Math.max(e,a,s),r=Math.min(e,a,s);let o=0,l=0;const i=(t+r)/2;if(t!==r){const c=t-r;l=i>.5?c/(2-t-r):c/(t+r),o=t===e?(a-s)/c+(a<s?6:0):t===a?(s-e)/c+2:(e-a)/c+4,o/=6}return{h:o*360,s:l,l:i}}function Wa(n,e,a){const s=(1-Math.abs(2*a-1))*e,t=s*(1-Math.abs(n/60%2-1)),r=a-s/2;let o=0,l=0,i=0;return n<60?(o=s,l=t):n<120?(o=t,l=s):n<180?(l=s,i=t):n<240?(l=t,i=s):n<300?(o=t,i=s):(o=s,i=t),Qi((o+r)*255,(l+r)*255,(i+r)*255)}function Ho(n){return ot(n).map(e=>(e/=255,e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))).reduce((e,a,s)=>e+a*[.2126,.7152,.0722][s],0)}function lp(n,e){const a=Ho(n),s=Ho(e),t=Math.max(a,s),r=Math.min(a,s);return(t+.05)/(r+.05)}function Ea(n,e,a,s){const t=Be(n),r=Math.max(t.s,.42);let o=t.l;for(let l=0;l<90;l++){const i=Wa(t.h,r,o);if(lp(i,e)>=s)break;if(a){if(o>=.9)break;o+=.015}else{if(o<=.15)break;o-=.015}}return Wa(t.h,r,o)}const Gt=zs.bg,Nt=sp.bg,ip={"Buffalo Bills":1,"Los Angeles Rams":1};function cp(n){const e=zi[n];if(!e){const u=[zs.gold2,zs.zcream,zs.goldm];return{light:u,dark:u}}let a=e[0];if(Be(a).s<.15&&(a=[...e].sort((u,p)=>Be(p).s-Be(u).s)[0]),Be(a).s<.15&&(a=Pt(a,"#c9a24b",.45)),ip[n]){const u=Be(a);u.h>=195&&u.h<=255&&u.l<.45&&(a=Wa(u.h,Math.min(1,u.s*.94),.47))}{const u=e.filter(p=>{const m=Be(p);return m.s<.14&&m.l>.45});if(Be(a).l<.26&&u.length){const p=u.find(m=>{const d=Be(m);return d.l>=.55&&d.l<=.92})||u[u.length-1];a=Pt(a,p,.45)}}const s=e.filter(u=>u!==a),t=u=>{const p=Be(u);if(p.l<.18||p.s<.15){const m=Be(a);return Wa(m.h,Math.max(.12,Math.min(m.s,.34)),p.l<.18?.22:Math.min(Math.max(p.l,.3),.72))}return Wa(p.h,Math.max(p.s,.42),Math.min(Math.max(p.l,.3),.55))},r=u=>{const p=Be(u);return p.h>=30&&p.h<=70&&p.l>.42?Pt(Wa(p.h,Math.min(1,Math.max(p.s,.55)),.5),"#c9a24b",.45):u},o=r(t(s[0]!==void 0?s[0]:a)),l=r(t(s[1]!==void 0?s[1]:a)),i=[Ea(a,Gt,!1,4.6),Ea(o,Gt,!1,4.2),Ea(l,Gt,!1,4.2)],c=[Ea(a,Nt,!0,4.6),Ea(o,Nt,!0,4.2),Ea(l,Nt,!0,4.2)];return{light:i,dark:c}}function fp(n){const[e,a,s]=op(n),t=cp(n);return{attr:n,vars:{"--zpb-t1":e,"--zpb-t2":a,"--zpb-t3":s,"--zpb-t1L":t.light[0],"--zpb-t2L":t.light[1],"--zpb-t3L":t.light[2],"--zpb-t1D":t.dark[0],"--zpb-t2D":t.dark[1],"--zpb-t3D":t.dark[2]}}}const Ko=n=>{const e=n.replace("#",""),a=[0,2,4].map(s=>parseInt(e.slice(s,s+2),16)/255).map(s=>s<=.03928?s/12.92:((s+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]},It=(n,e)=>{const a=Ko(n),s=Ko(e);return(Math.max(a,s)+.05)/(Math.min(a,s)+.05)};function lr(n,e=!0){const a=Cu[n]??[...Yi],s=e?tp:rp,r=[...a].sort((o,l)=>It(l,s)-It(o,s))[0];return It(r,s)>=3?{ink:r,pale:r}:{ink:r,pale:`color-mix(in srgb, ${r} 55%, ${e?"#f2e7d5":"#53382b"})`}}const up=2027;function lt(n){const e=Mr(n.pool),a=new Map(e.map(t=>[t.id,t])),s=gn.map(()=>[]);for(const t of n.picks){const r=a.get(t.pid);r&&s[t.team]?.push(r)}return s}function ji(n){const a=["4-3","3-4"].map(r=>Er(n,r)).map(r=>({l:r,R:sr(H0(r),ku(r))})),s=br(a.map(r=>r.R)),t=a[1]&&co(a[1].R,s)>co(a[0].R,s)?a[1]:a[0];return{lineup:t.l,ratings:t.R}}function dp(n){return gn.map((e,a)=>({name:e.name,ratings:ji(lt(n)[a]).ratings}))}const pp={TD:{label:"TD",tone:"good"},FG:{label:"FG",tone:"good"},INT:{label:"INT",tone:"bad"},FUM:{label:"FUM",tone:"bad"},PUNT:{label:"PUNT",tone:"sub"},DOWNS:{label:"DOWNS",tone:"sub"},FG_MISS:{label:"MISS",tone:"bad"},HALF:{label:"EOH",tone:"sub"},SAFETY:{label:"SAFETY",tone:"bad"}},hp={xp:{label:"XP",tone:"good"},two:{label:"2PT",tone:"good"},xp_miss:{label:"XP MISS",tone:"sub"},two_fail:{label:"2PT FAIL",tone:"sub"},none:{label:"NO TRY",tone:"sub"}};function Ui(n,e,a,s){const t=s.week,r=s.year??up,o=md(n,e,a),l={[e]:lr(e),[a]:lr(a)},i=s.userTeamName??"";let c=0,u=0,p=0,m=0,d="tie";const h=o.drives.map(B=>{B.team===e?(c+=B.pts,u+=B.oppPts):(u+=B.pts,c+=B.oppPts),B.team===i&&m++;const k=c>u?"home":u>c?"away":"tie",w=k!==d&&k!=="tie";w&&p++,d=k;const T=[],S=pp[B.end]??{label:B.end,tone:"sub"};T.push(S),B.defTD&&T.push({label:"DEF TD",tone:"gold"}),w&&T.push({label:"LEAD Δ",tone:"gold"});const J=B.scores.find(F=>F.kind==="TD"&&F.team===B.team),P=J?[hp[J.conv]].filter(F=>!!F):[];return{...B,homeAbbr:bn(e),awayAbbr:bn(a),teamAbbr:bn(B.team),teamInk:l[B.team].pale,teamPale:l[B.team].pale,me:B.team===i,leadChange:w,scoreAfter:{home:c,away:u},badges:T,convBadges:P}}),v=s.round?` · ${s.round}`:"";return{week:t,year:r,home:e,away:a,homeAbbr:bn(e),awayAbbr:bn(a),homeInk:l[e],awayInk:l[a],homeScore:o.homeScore,awayScore:o.awayScore,regHome:o.regHome,regAway:o.regAway,ot:o.ot,gameSeedLabel:`gameSeed ${s.gs??"?"} · week ${t}${v} · ${a} @ ${e} · played by the pinned engine`,drives:h,meDrives:m,leadChanges:p,userWon:o.homeScore===o.awayScore?null:o.homeScore>o.awayScore?e===i:a===i}}function mp(n,e,a,s,t=!0){const r=[...n.scores,...n.playoffs].find(C=>(C.home===a||C.away===a)&&C.week===s),o=r?.round??null,l=gt(n.seed,s,r?r.home:""),i=new Map(e.map(C=>[C.name,C.ratings])),c=br(e.map(C=>C.ratings)),u=i.get(r?r.home:""),p=i.get(r?r.away:"");if(!u||!p||!r)return null;const m=rr(u,c),d=rr(p,c),h=He(u,p,c,{off:m.off,def:d.def}),v=He(p,u,c,{off:d.off,def:m.def}),B=Ri(h,v,Ye(l),{playoff:!!o});return Ui(B,r.home,r.away,{week:s,round:o,gs:l,userTeamName:a,year:n.year})}function xo(n,e){if(typeof document>"u")return;const a=document.documentElement;if(!n){delete a.dataset.zpbteam;return}const s=fp(n);a.dataset.zpbteam=s.attr;for(const[t,r]of Object.entries(s.vars))a.style.setProperty(t,r);a.dataset.theme=e==="system"?"":e,e==="system"&&delete a.dataset.theme}function vp(n){if(typeof document>"u")return;const e=document.documentElement;n==="system"?delete e.dataset.theme:e.dataset.theme=n}function Oo(n,e){const{lineup:a}=ji(e),s=a.placements.map(t=>t.player).find(Boolean);return{team:n,lineup:a,returnerId:s?.id??null}}class Vo{ss=dd();boxes=[];addWeek(e,a){for(const s of e){const t=Yo(s.home),r=Yo(s.away);if(t<0||r<0)continue;const o=id(s.result,Oo(s.home,a[t]??[]),Oo(s.away,a[r]??[]),Bp());this.boxes.push(o),pd(this.ss,o)}}}let gp=0;const Bp=()=>Ye(24231+gp++).fork("boxscore"),Yo=n=>gn.findIndex(e=>e.name===n),ns=n=>Ls("nfl","slot:"+n),zo=Xl,Qe=Ad({slotCheck:b0}),Js=n=>({...n});async function Cp(n,e,a,s){const t=As("draft",n,Js(a),e,s),r=await Qe.write(ns(n),t);return r.ok?"":"storage refused the write: "+r.error}async function Tp(n,e,a,s){const t=As("week",n,Js(a),e,s),r=await Qe.write(ns(n),t);return r.ok?"":"storage refused the write: "+r.error}async function yp(n,e,a,s){const t=As("season",n,Js(a),e,s),r=await Qe.write(ns(n),t);return r.ok?"":"storage refused the write: "+r.error}const Sp=n=>{if(vt(n.state))return"season complete";const e=n.teams.length&&(n.state.schedule.find(a=>a.week===n.state.nextWeek&&(a.home===n.context.userTeam||a.away===n.context.userTeam))??null);return e?`${e.away} @ ${e.home}`:"no user game this week"},Qo=(n,e)=>n.state!=="ok"||!n.engineVersion||n.engineVersion===e?null:"this save came from build "+n.engineVersion+" (running: "+e+") — logged picks hold; un-made picks may differ";async function kp(n){const e=await Qe.read(ns(n));if(!e.ok)return{slot:n,state:"refused",problem:"corrupt",message:"storage unavailable: "+e.error};if(e.value===null)return{slot:n,state:"empty"};const a=ut(e.value);if(!a.ok)return{slot:n,state:"refused",problem:a.reason,message:a.message};const s=a.value;if(s.kind==="draft"){const o=s.payload;return{slot:n,state:"ok",kind:"draft",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,picks:o.picks.length,userTeamIndex:o.userTeam}}const t=s.kind==="week"?Hi(s):kd(s);if(!t.ok)return{slot:n,state:"refused",problem:"corrupt",message:t.message};if(s.kind==="week"){const o=t.value;return{slot:n,state:"ok",kind:"week",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,week:o.state.nextWeek,userTeam:o.context.userTeam,nextFixture:Sp(o),played:o.state.scores.length+o.state.playoffs.length}}const r=s.payload;return{slot:n,state:"ok",kind:"season",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,userTeam:r.userTeam,week:23,played:r.userResults.length,champion:r.champion}}async function Dp(n){const e=await Qe.read(ns(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=ut(e.value);return a.ok?a.value.kind!=="draft"?{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a draft"}:{ok:!0,record:a.value.payload}:{ok:!1,message:a.message}}async function wp(n){const e=await Qe.read(ns(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=ut(e.value);if(!a.ok)return{ok:!1,message:a.message};if(a.value.kind!=="week")return{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a week"};const s=a.value,t=Hi(s);return t.ok?{ok:!0,env:s}:{ok:!1,message:t.message}}const qi=Ls("nfl","autosave:draft"),Pr=Ls("nfl","autosave:week");async function Rp(n,e,a,s=Qe){const t=As("draft","A",Js(e),n,a),r=await s.write(qi,t);return r.ok?"":"autosave refused the write: "+r.error}async function Ep(n,e,a,s=Qe){const t=As("week","C",Js(e),n,a),r=await s.write(Pr,t);return r.ok?"":"autosave refused the write: "+r.error}async function jo(n=Qe){await n.remove(Pr)}async function bp(n=Qe){const e=await Uo(n,qi,"draft");if(!e.ok)return e;const a=await Uo(n,Pr,"week");return a.ok?{ok:!0,draft:e.value,week:a.value}:a}async function Uo(n,e,a){const s=await n.read(e);if(!s.ok)return{ok:!1,message:"storage unavailable: "+s.error};if(s.value===null)return{ok:!0,value:null};const t=ut(s.value);if(!t.ok)return{ok:!1,message:t.message};const r=t.value;if(r.kind!==a)return{ok:!1,message:"autosave: "+e+" holds a "+r.kind+" save, not a "+a};const o=l=>({saveId:l.saveId,createdAt:l.createdAt,engineVersion:l.engineVersion,dataVersion:l.dataVersion,saveRevision:l.saveRevision,savedAt:l.savedAt});return a==="draft"?{ok:!0,value:{kind:"draft",record:r.payload,lineage:o(r)}}:{ok:!0,value:{kind:"week",env:r}}}var Lp=M('<div class="cp-hd svelte-jqmiv9"><span class="cp-team svelte-jqmiv9"> </span> <span class="cp-round svelte-jqmiv9"> </span> <span class="cp-overall svelte-jqmiv9"> </span></div> <p class="cp-onclock svelte-jqmiv9"> </p>',1);function Ap(n,e){yn(e,!0);var a=Lp(),s=Bn(a),t=_(s),r=D(t,!0),o=g(t,2),l=D(o),i=g(o,2),c=D(i),u=g(s,2),p=D(u,!0);H(()=>{y(r,e.header.teamName),y(l,`${e.header.roundLabel??""} · Pick ${e.header.pickInRound??""}`),y(c,`overall ${e.header.overall??""} of ${e.header.totalPicks??""}`),y(p,e.header.onClock)}),L(n,a),Sn()}var Mp=M('<span class="cp-interim svelte-q412k" aria-hidden="true">INTERIM</span> <button class="cp-quick svelte-q412k"> </button>',1),Jp=M('<button class="cp-chip svelte-q412k"> <i class="svelte-q412k"> </i></button>'),_p=M('<div><div class="cp-rowtop svelte-q412k"><button class="cp-main svelte-q412k"><span class="cp-name svelte-q412k"> </span> <span class="cp-pos svelte-q412k"> </span> <span class="cp-nflteam svelte-q412k"> </span> <span class="cp-num cp-ovr svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-gone-wrap svelte-q412k"><span class="cp-num cp-gone svelte-q412k"> </span> <span class="cp-gonetip svelte-q412k" role="tooltip" aria-hidden="true"> </span></span></button> <!> <span class="cp-sr svelte-q412k" tabindex="0"> </span></div> <div class="cp-fits svelte-q412k"><span class="cp-fitlbl svelte-q412k"> </span> <!> <button class="cp-chip cp-primary svelte-q412k"> </button> <p class="cp-gonehow svelte-q412k"> </p></div></div>');function Fp(n,e){yn(e,!0);let a=pe(e,"oddsMeta",3,null),s=pe(e,"suggest",3,!1),t=pe(e,"glow",3,!1),r=hn(!1);const o={ovr:"OVR — the raw rating; the board never ranks by it by default",wins:"Wins — what the board ranks by",priority:"Priority — what the board ranks by while the Priority sort is on"},l=Y=>Y?`GONE% — how often the CPU took him before your next pick: the ${Y.picksBetween} picks between now and your turn were replayed ${Y.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.`:"GONE% — the CPU replay estimate (no replay while the CPU is on the clock).";var i=_p();let c;var u=_(i),p=_(u),m=_(p),d=D(m,!0),h=g(m,2),v=D(h,!0),B=g(h,2),C=D(B,!0),k=g(B,2),w=D(k,!0),T=g(k,2),S=D(T,!0),J=g(T,2),P=D(J,!0),F=g(J,2),b=_(F),A=D(b,!0),O=g(b,2),z=D(O,!0),Q=g(p,2);{var x=Y=>{var I=Mp(),U=g(Bn(I),2),ln=D(U);H(()=>y(ln,`Draft ${e.r.name??""} at ${e.r.slotLabel??""}`)),sn("click",U,()=>(e.onpickDirect??e.onpick)(e.r.id,e.r.slotId)),L(Y,I)};tn(Q,Y=>{s()&&Y(x)})}var X=g(Q,2),an=D(X,!0),en=g(u,2),j=_(en),$=D(j),N=g(j,2);cn(N,17,()=>e.r.alsoFits,$a,(Y,I)=>{var U=Jp(),ln=_(U),Z=g(ln),dn=D(Z,!0);H(()=>{y(ln,`${f(I).slotLabel??""} `),y(dn,f(I).flex)}),sn("click",U,()=>e.onpick(e.r.id,f(I).slotId)),L(Y,U)});var V=g(N,2),q=D(V),E=g(V,2),W=D(E,!0);H((Y,I,U)=>{c=Wn(i,1,`cp-row cp-${e.r.tone??""}`,"svelte-q412k",c,{"cp-suggest":s(),"cp-glow":t()}),fn(i,"data-id",e.r.id),fn(p,"aria-expanded",f(r)),fn(p,"aria-controls",`cp-fit-${e.r.id??""}`),y(d,e.r.name),y(v,e.r.pos),y(C,e.r.nflTeam),fn(k,"title",o.ovr),fn(k,"aria-label",`${e.r.ovr??""} overall`),y(w,e.r.ovr),fn(T,"title",o.wins),fn(T,"aria-label",`${e.r.wins??""} wins`),y(S,e.r.wins),fn(J,"title",o.priority),fn(J,"aria-label",`${e.r.priority??""} priority`),y(P,e.r.priority),fn(b,"aria-label",`${e.r.gone??""} gone odds`),fn(b,"aria-describedby",`cp-gone-desc-${e.r.id??""}`),y(A,e.r.gone),y(z,Y),fn(X,"id",`cp-gone-desc-${e.r.id??""}`),y(an,I),fn(en,"id",`cp-fit-${e.r.id??""}`),fn(en,"hidden",!f(r)),y($,`Fills ${e.r.slotLabel??""}${e.r.natural?"":" (flex)"}`),y(q,`Draft at ${e.r.slotLabel??""}`),y(W,U)},[()=>l(a()),()=>l(a()),()=>l(a())]),sn("click",p,()=>nn(r,!f(r))),sn("click",V,()=>e.onpick(e.r.id,e.r.slotId)),L(n,i),Sn()}Pn(["click"]);var Wp=M("<button> </button>"),Pp=M('<div class="cp-sorts svelte-1xb8352" role="group" aria-label="Sort the board"></div>');function Gp(n,e){yn(e,!0);const a=[{k:"wins",lbl:"Wins"},{k:"priority",lbl:"Priority"},{k:"ovr",lbl:"OVR"}];var s=Pp();cn(s,21,()=>a,$a,(t,r)=>{var o=Wp();let l;var i=D(o,!0);H(()=>{l=Wn(o,1,"cp-sort svelte-1xb8352",null,l,{"cp-on":e.sort===f(r).k}),y(i,f(r).lbl)}),sn("click",o,()=>e.onsort(f(r).k)),L(t,o)}),L(n,s),Sn()}Pn(["click"]);var Np=M('<span class="cp-seedcode svelte-zb9xkj">code <b class="svelte-zb9xkj"> </b></span>'),Ip=M('<button class="cp-play svelte-zb9xkj" data-testid="cp-play">Play week 1 →</button>'),Hp=M('<div class="cp-ft svelte-zb9xkj"><!> <span class="cp-count svelte-zb9xkj"> </span> <!> <button class="cp-undo svelte-zb9xkj">Undo my last pick</button> <!></div>');function Kp(n,e){yn(e,!0);let a=pe(e,"draftDone",3,!1),s=pe(e,"seedCode",3,"");var t=Hp(),r=_(t);Gp(r,{get sort(){return e.sort},get onsort(){return e.onsort}});var o=g(r,2),l=D(o,!0),i=g(o,2);{var c=d=>{var h=Np(),v=g(_(h)),B=D(v,!0);H(()=>{fn(h,"title",`the draft code — put ?seed=${s()??""} in the URL to replay this exact draft`),y(B,s())}),L(d,h)};tn(i,d=>{s()&&d(c)})}var u=g(i,2),p=g(u,2);{var m=d=>{var h=Ip();sn("click",h,function(...v){e.onplay?.apply(this,v)}),L(d,h)};tn(p,d=>{a()&&d(m)})}H(()=>{y(l,e.footer.text),u.disabled=!e.canUndo}),sn("click",u,function(...d){e.onundo?.apply(this,d)}),L(n,t),Sn()}Pn(["click"]);Pn(["click"]);var xp=M("<button> </button>"),Op=M('<span class="cp-needs-unit svelte-2mq0wt"> </span> <!>',1),Vp=M('<button class="cp-need cp-need-all svelte-2mq0wt">ALL</button>'),Yp=M('<div class="cp-needs svelte-2mq0wt" data-testid="cp-needs"><span class="cp-needs-lbl svelte-2mq0wt"> </span> <!> <!></div>');function zp(n,e){yn(e,!0);let a=pe(e,"selected",19,()=>[]);const s={offense:"OFF",defense:"DEF",special:"ST"};Object.fromEntries(Se.map(m=>[m.id,m.unit]));const t=m=>Se.filter(d=>d.unit===m&&e.open.includes(d.id)).map(d=>d.id),r=m=>a().includes(m);var o=Yp(),l=_(o),i=D(l),c=g(l,2);cn(c,16,()=>["offense","defense","special"],m=>m,(m,d)=>{var h=Op(),v=Bn(h),B=D(v,!0),C=g(v,2);cn(C,16,()=>t(d),k=>k,(k,w)=>{var T=xp();let S;var J=D(T,!0);H((P,F,b,A)=>{S=Wn(T,1,"cp-need svelte-2mq0wt",null,S,{"cp-need-on":P}),fn(T,"aria-pressed",F),fn(T,"title",`filter the board to ${b??""}`),y(J,A)},[()=>r(w),()=>r(w),()=>tt(w),()=>tt(w)]),sn("click",T,()=>e.ontoggle(w)),L(k,T)}),H(()=>y(B,s[d])),L(m,h)});var u=g(c,2);{var p=m=>{var d=Vp();sn("click",d,function(...h){e.onclear?.apply(this,h)}),L(m,d)};tn(u,m=>{a().length&&m(p)})}H(()=>y(i,`MY NEEDS · ${e.open.length??""} OPEN`)),L(n,o),Sn()}Pn(["click"]);function Qp(n,e){const a=o=>Number(String(o[e]).replace(/[^0-9.\-]/g,""))||0,s=new Set;if(n.length===0)return{ids:s,lastId:null};const t=Math.min(3,n.length);for(let o=0;o<t;o++)s.add(n[o].id);let r=t-1;if(t===3){const o=a(n[2]);for(let l=3;l<n.length&&a(n[l])===o;l++)s.add(n[l].id),r=l}return{ids:s,lastId:n[r]?.id??null}}var jp=M('<p class="cp-drafted svelte-e071nj" role="status" aria-live="polite">Drafted <b class="svelte-e071nj"> </b> · <button class="cp-btn cp-draftedundo svelte-e071nj">Undo</button></p>'),Up=M('<p class="cp-confirm svelte-e071nj">Draft <b> </b> at <b> </b>? <button class="cp-btn cp-go svelte-e071nj">Confirm the pick</button> <button class="cp-btn svelte-e071nj">Cancel</button></p>'),qp=M('<section class="cp-board svelte-e071nj" aria-label="Draft board"><!> <!> <!> <!> <div class="cp-rows svelte-e071nj"></div> <!></section>');function qo(n,e){yn(e,!0);let a=pe(e,"openSlots",19,()=>[]),s=pe(e,"oddsMeta",3,null),t=pe(e,"needsSelected",19,()=>[]),r=pe(e,"draftDone",3,!1),o=pe(e,"seedCode",3,""),l=hn(null),i=hn(null),c=hn(!1),u=hn(null),p=null,m=null;const d=(x,X)=>{f(c)||(nn(c,!0),nn(l,null),e.onpick(x,X),nn(u,{name:e.vm.rows.find(an=>an.id===x)?.name??"the pick"},!0),p&&clearTimeout(p),p=setTimeout(()=>{nn(u,null)},2600),m&&clearTimeout(m),m=setTimeout(()=>{nn(c,!1)},380))};let h=hn(!1),v=null;const B=()=>{!f(l)||f(h)||(nn(h,!0),e.onpick(f(l).id,f(l).slot),nn(l,null),v&&clearTimeout(v),v=setTimeout(()=>{nn(h,!1)},380))},C=on(()=>t().length===0?e.vm.rows:e.vm.rows.filter(x=>t().includes(x.slotId)||x.alsoFits.some(X=>t().includes(X.slotId)))),k=on(()=>Qp(f(C),e.vm.sort)),w=on(()=>f(k).ids),T=on(()=>f(k).lastId);var S=qp(),J=_(S);Ap(J,{get header(){return e.vm.header}});var P=g(J,2);zp(P,{get open(){return a()},get selected(){return t()},get ontoggle(){return e.onneedtoggle},get onclear(){return e.onneedclear}});var F=g(P,2);{var b=x=>{var X=jp(),an=g(_(X)),en=D(an,!0),j=g(an,2);H(()=>y(en,f(u).name)),sn("click",j,()=>{e.onundo(),nn(u,null)}),L(x,X)};tn(F,x=>{f(u)&&x(b)})}var A=g(F,2);{var O=x=>{var X=Up(),an=g(_(X)),en=D(an,!0),j=g(an,2),$=D(j,!0),N=g(j,2),V=g(N,2);H(q=>{y(en,q),y($,f(l).slot)},[()=>e.vm.rows.find(q=>q.id===f(l).id)?.name]),sn("click",N,B),sn("click",V,()=>nn(l,null)),L(x,X)};tn(A,x=>{f(l)&&x(O)})}var z=g(A,2);cn(z,21,()=>f(C),x=>x.id,(x,X)=>{{let an=on(()=>f(w).has(f(X).id)),en=on(()=>f(T)===f(X).id);Fp(x,{get r(){return f(X)},onpick:(j,$)=>nn(l,{id:j,slot:$},!0),onpickDirect:d,get oddsMeta(){return s()},get suggest(){return f(an)},get glow(){return f(en)}})}}),i0(z,x=>nn(i,x),()=>f(i));var Q=g(z,2);Kp(Q,{get footer(){return e.vm.footer},get canUndo(){return e.canUndo},get onundo(){return e.onundo},get onsort(){return e.onsort},get sort(){return e.vm.sort},get onplay(){return e.onplay},get draftDone(){return r()},get seedCode(){return o()}}),H(()=>fn(z,"data-count",f(C).length)),L(n,S),Sn()}Pn(["click"]);var Zp=M("<button> </button>"),Xp=M('<div role="group" aria-label="Valuation mode"></div>');function $p(n,e){yn(e,!0);let a=hn(ra(re.get()));re.subscribe(o=>nn(a,o,!0));const s=["measured","balance","owner"];var t=Xp();let r;cn(t,21,()=>s,$a,(o,l)=>{var i=Zp();let c;var u=D(i,!0);H(()=>{c=Wn(i,1,"cp-mode svelte-1o2iqa1",null,c,{"cp-on":f(a).mode===f(l)}),i.disabled=f(a).locked,fn(i,"title",f(a).locked?"The mode switch is disabled mid-draft":Je[f(l)]),y(u,Je[f(l)])}),sn("click",i,()=>re.set(f(l))),L(o,i)}),H(()=>r=Wn(t,1,"cp-modes svelte-1o2iqa1",null,r,{"cp-locked":f(a).locked})),L(n,t),Sn()}Pn(["click"]);var nh=M('<li><span class="cp-sl svelte-lz9ww5"> </span> <span class="cp-sn"> </span> <b> </b></li>'),eh=M('<section class="cp-adv svelte-lz9ww5" aria-label="Lineup advice"><h3 class="svelte-lz9ww5">Best lineup from your roster</h3> <ul class="svelte-lz9ww5"></ul></section>');function Zi(n,e){yn(e,!0);let a=pe(e,"weak",19,()=>[]);var s=eh(),t=g(_(s),2);cn(t,21,()=>e.slots,$a,(r,o,l)=>{var i=nh();let c;var u=_(i),p=D(u,!0),m=g(u,2),d=D(m,!0),h=g(m,2),v=D(h,!0);H(B=>{c=Wn(i,1,"svelte-lz9ww5",null,c,{"cp-weak":B}),y(p,f(o).label),y(d,f(o).name),y(v,f(o).ovr)},[()=>a().includes(l)]),L(r,i)}),L(n,s),Sn()}var ah=M('<p class="cp-saves-notice svelte-spfs26" role="alert"> </p>'),sh=M('<p class="cp-slot-empty svelte-spfs26">empty</p>'),th=M('<p class="cp-slot-refused svelte-spfs26"><b> </b> — corrupt-never-repair</p> <p class="cp-slot-msg svelte-spfs26"> </p>',1),rh=M('<p class="cp-slot-line svelte-spfs26"> </p>'),oh=M('<p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-line cp-slot-dim svelte-spfs26"> </p>',1),lh=M('<p class="cp-slot-older svelte-spfs26"> </p>'),ih=M('<p class="cp-slot-kind svelte-spfs26"> </p> <!> <p class="cp-slot-dim svelte-spfs26"> </p> <!> <button class="cp-slot-load svelte-spfs26"> </button>',1),ch=M('<article><h3 class="svelte-spfs26"> </h3> <!> <button class="cp-slot-save svelte-spfs26">Save draft here</button></article>'),fh=M(`<aside class="cp-hydrated svelte-spfs26" aria-label="Hydrated season"><h3 class="svelte-spfs26"> </h3> <p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26">the season screens ride a later slice — the hydration itself is proven (this card renders the engine's LoadedWeek)</p></aside>`),uh=M(`<section class="cp-saves svelte-spfs26" aria-label="Save and load"><header class="cp-saves-head svelte-spfs26"><h2 class="svelte-spfs26">Saves</h2> <span class="cp-saves-sub svelte-spfs26">slots A · B · C — written through the engine's envelope (saveId · revision · sha-256 dataset stamp)</span> <button class="cp-saves-x svelte-spfs26" aria-label="Close saves">✕</button></header> <!> <div class="cp-slotgrid svelte-spfs26"></div> <!> <p class="cp-saves-foot svelte-spfs26">A refused save is <b class="svelte-spfs26">never repaired</b> — the reason above is the engine's own verdict (hydrateWeek / parseEnvelope).</p></section>`);function dh(n,e){yn(e,!0);const a=ra({A:null,B:null,C:null});let s=hn(""),t=hn(null),r=hn(!1);async function o(){nn(r,!0);for(const C of zo)a[C]=await kp(C);nn(r,!1)}Ts(()=>{e.record,o()});async function l(C){if(nn(s,""),!e.record||!e.meta){nn(s,"nothing to save — no draft is in progress");return}const k=await Cp(C,e.record,e.meta,new Date);k&&nn(s,k,!0),await o()}async function i(C){nn(s,""),nn(t,null);const k=a[C];if(!k||k.state!=="ok"){nn(s,"nothing loadable in slot "+C);return}if(k.kind==="draft"){const w=await Dp(C);if(!w.ok){nn(s,"refused: "+w.message),await o();return}e.onloaddraft(w.record,{saveId:k.saveId,createdAt:k.createdAt}),e.onclose();return}nn(t,k,!0)}var c=uh(),u=_(c),p=g(_(u),4),m=g(u,2);{var d=C=>{var k=ah(),w=D(k,!0);H(()=>y(w,f(s))),L(C,k)};tn(m,C=>{f(s)&&C(d)})}var h=g(m,2);cn(h,20,()=>zo,C=>C,(C,k)=>{const w=on(()=>a[k]);var T=ch();let S;var J=_(T),P=D(J),F=g(J,2);{var b=Q=>{var x=sh();L(Q,x)},A=Q=>{var x=th(),X=Bn(x),an=_(X),en=D(an),j=g(X,2),$=D(j,!0);H(()=>{y(en,`REFUSED (${f(w).problem??""})`),y($,f(w).message)}),L(Q,x)},O=Q=>{var x=ih(),X=Bn(x),an=D(X),en=g(X,2);{var j=U=>{var ln=rh(),Z=D(ln);H(()=>y(Z,`${f(w).picks??""} picks · ${gn[f(w).userTeamIndex??0]?.name??"?"??""}`)),L(U,ln)},$=U=>{var ln=oh(),Z=Bn(ln),dn=D(Z),kn=g(Z,2),Dn=D(kn);H(()=>{y(dn,`${f(w).userTeam??""} · next: week ${f(w).week??""}`),y(Dn,`${f(w).nextFixture??""} · ${f(w).played??""} games played`)}),L(U,ln)};tn(en,U=>{f(w).kind==="draft"?U(j):U($,-1)})}var N=g(en,2),V=D(N),q=g(N,2);{var E=U=>{var ln=lh(),Z=D(ln,!0);H(dn=>y(Z,dn),[()=>Qo(f(w),ks())]),L(U,ln)},W=on(()=>Qo(f(w),ks()));tn(q,U=>{f(W)&&U(E)})}var Y=g(q,2),I=D(Y);H((U,ln)=>{y(an,`${U??""} · rev ${f(w).saveRevision??""}`),y(V,`saved ${ln??""}`),y(I,`Load ${f(w).kind??""}`)},[()=>f(w).kind?.toUpperCase(),()=>f(w).savedAt?.slice(0,16).replace("T"," ")]),sn("click",Y,()=>i(k)),L(Q,x)};tn(F,Q=>{!f(w)||f(w).state==="empty"?Q(b):f(w).state==="refused"?Q(A,1):Q(O,-1)})}var z=g(F,2);H(()=>{S=Wn(T,1,"cp-slot svelte-spfs26",null,S,{"cp-slot-ok":f(w)?.state==="ok","cp-slot-bad":f(w)?.state==="refused"}),fn(T,"data-slot",k),y(P,`Slot ${k??""}`),z.disabled=!e.record}),sn("click",z,()=>l(k)),L(C,T)});var v=g(h,2);{var B=C=>{var k=fh(),w=_(k),T=D(w),S=g(w,2),J=D(S),P=g(S,2),F=D(P);H(()=>{y(T,`Hydrated — ${f(t).kind??""} save, slot ${f(t).slot??""}`),y(J,`${f(t).userTeam??""} · next week ${f(t).week??""} · ${f(t).nextFixture??""}`),y(F,`${f(t).played??""} games played · the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)`)}),L(C,k)};tn(v,C=>{f(t)&&C(B)})}sn("click",p,function(...C){e.onclose?.apply(this,C)}),L(n,c),Sn()}Pn(["click"]);var ph=M('<p class="cp-ts-replay svelte-qxuqmk">This tab carries a replay link — starting a draft replays that exact seed. <button class="cp-ts-newseed svelte-qxuqmk">New draft · new seed</button></p>'),hh=M("<button> </button>"),mh=M('<div class="cp-ts-div svelte-qxuqmk"><h3 class="svelte-qxuqmk"> </h3> <!></div>'),vh=M('<h2 class="cp-ts-conf svelte-qxuqmk"> </h2> <div class="cp-ts-divs svelte-qxuqmk"></div>',1),gh=M("<button></button>"),Bh=M(`No position chosen — the league's standard order decides. Slot <b class="svelte-qxuqmk"> </b> is this team's natural first pick.`,1),Ch=M('You pick <b class="svelte-qxuqmk"> </b> ',1),Th=M('<p class="cp-sub cp-ts-order svelte-qxuqmk"> </p>'),yh=M('<aside class="cp-ts-detail svelte-qxuqmk" aria-live="polite"><h3 class="svelte-qxuqmk"> </h3> <p class="cp-ts-meta svelte-qxuqmk"> </p> <p class="cp-ts-rivals svelte-qxuqmk"><b class="svelte-qxuqmk">Division rivals:</b> </p> <p class="cp-ts-note svelte-qxuqmk"> </p> <h4 class="cp-ts-sloth svelte-qxuqmk">Your draft position</h4> <div class="cp-ts-slots svelte-qxuqmk" role="group" aria-label="Pick your draft position"></div> <p class="cp-ts-note svelte-qxuqmk"><!></p> <!> <button class="cp-ts-go svelte-qxuqmk"> </button></aside>'),Sh=M('<aside class="cp-ts-detail cp-ts-idle svelte-qxuqmk" aria-live="polite"><p class="cp-ts-note svelte-qxuqmk">Select one of the 32 teams to see its details, choose a draft position, and start the draft.</p></aside>'),kh=M('<section class="cp-ts svelte-qxuqmk"><h1 class="cp-ts-title svelte-qxuqmk">Pick your team</h1> <p class="cp-cygline"><span class="cp-cygt">Can you go</span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p> <!> <p class="cp-prov">Every number you will see on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!></section>');function Dh(n,e){yn(e,!0);let a=pe(e,"seedPinned",3,!1),s=hn(null),t=hn(null),r=on(()=>f(s)==null?-1:gn.findIndex(T=>T.name===f(s))),o=on(()=>f(s)==null?null:mt[f(s)]),l=on(()=>f(s)==null||!f(o)?[]:Ca(f(o).conf,f(o).div).filter(T=>T!==f(o).name)),i=on(()=>f(r)<0||f(t)===null?null:yi(f(r),f(t)));function c(){f(r)<0||e.onstart(f(r),f(t))}var u=kh(),p=g(_(u),4);{var m=T=>{var S=ph(),J=g(_(S));sn("click",J,function(...P){e.onnewseed?.apply(this,P)}),L(T,S)};tn(p,T=>{a()&&T(m)})}var d=g(p,2),h=g(_(d)),v=D(h,!0),B=g(d,2);cn(B,16,()=>["AFC","NFC"],T=>T,(T,S)=>{var J=vh(),P=Bn(J),F=D(P,!0),b=g(P,2);cn(b,20,()=>Ge,A=>A,(A,O)=>{var z=mh(),Q=_(z),x=D(Q),X=g(Q,2);cn(X,16,()=>Ca(S,O),an=>an,(an,en)=>{var j=hh();let $;var N=D(j,!0);H(()=>{$=Wn(j,1,"cp-ts-team svelte-qxuqmk",null,$,{"cp-on":f(s)===en}),fn(j,"aria-pressed",f(s)===en),y(N,en)}),sn("click",j,()=>nn(s,en,!0)),L(an,j)}),H(()=>y(x,`${S??""} ${O??""}`)),L(A,z)}),H(()=>y(F,S)),L(T,J)});var C=g(B,2);{var k=T=>{var S=yh(),J=_(S),P=D(J,!0),F=g(J,2),b=D(F),A=g(F,2),O=g(_(A)),z=g(A,2),Q=D(z),x=g(z,4);cn(x,20,()=>Array(32),$a,(E,W,Y)=>{var I=gh();let U;I.textContent=Y+1,H(()=>{U=Wn(I,1,"cp-ts-slot svelte-qxuqmk",null,U,{"cp-on":f(t)===Y+1,"cp-nat":f(r)===Y}),fn(I,"aria-pressed",f(t)===Y+1)}),sn("click",I,()=>nn(t,f(t)===Y+1?null:Y+1,!0)),L(E,I)});var X=g(x,2),an=_(X);{var en=E=>{var W=Bh(),Y=g(Bn(W)),I=D(Y,!0);H(()=>y(I,f(r)+1)),L(E,W)},j=E=>{var W=Ch(),Y=g(Bn(W)),I=D(Y,!0),U=g(Y);H(()=>{y(I,f(t)),y(U,`${f(t)===f(r)+1?" — this team's natural spot":" first"}. The store trades your team into this slot and mirrors the trade through the snake; a save restores the same order.`)}),L(E,W)};tn(an,E=>{f(t)===null?E(en):E(j,-1)})}var $=g(X,2);{var N=E=>{var W=Th(),Y=D(W);H(I=>y(Y,`Order preview (first 6): ${I??""}`),[()=>f(i).slice(0,6).map(I=>gn[I].name).join(" · ")]),L(E,W)};tn($,E=>{f(i)&&f(t)!==null&&E(N)})}var V=g($,2),q=D(V);H((E,W)=>{y(P,f(o).name),y(b,`${f(o).conf??""} ${f(o).div??""}`),y(O,` ${E??""}`),y(Q,`You draft as this team: the board's on-clock indicator, your picks and your roster are all ${f(o).name??""}'s.`),y(q,`DRAFT AS ${W??""}${f(t)?` · SLOT ${f(t)}`:""}`)},[()=>f(l).join(" · "),()=>f(o).name.toUpperCase()]),sn("click",V,c),L(T,S)},w=T=>{var S=Sh();L(T,S)};tn(C,T=>{f(o)?T(k):T(w,-1)})}H(T=>y(v,T),[()=>Je[re.get().mode]]),L(n,u),Sn()}Pn(["click"]);var wh=M('<span class="cp-feed-dim svelte-tsx9t1"> </span>'),Rh=M('<div class="cp-feed-q svelte-tsx9t1"> </div>'),Zo=M('<span class="zrl-badge svelte-tsx9t1"> </span>'),Eh=M('<!> <article><span class="zrl-t svelte-tsx9t1"> </span> <span class="zrl-team svelte-tsx9t1"> </span> <span class="zrl-play svelte-tsx9t1"><span class="cp-feed-summary svelte-tsx9t1"> </span> <span class="cp-feed-badges svelte-tsx9t1"><!> <!></span></span> <span class="zrl-sc svelte-tsx9t1"><b class="svelte-tsx9t1"> </b> <span class="cp-feed-dot svelte-tsx9t1">·</span> <b class="svelte-tsx9t1"> </b></span></article>',1),bh=M('<p class="cp-feed-empty svelte-tsx9t1">no drives match the filter</p>'),Lh=M(`<section class="cp-feed svelte-tsx9t1" aria-label="Game feed"><header class="cp-feed-head svelte-tsx9t1"><span class="cp-feed-week svelte-tsx9t1"> </span> <span class="cp-feed-vs svelte-tsx9t1"> </span> <span class="cp-feed-tools svelte-tsx9t1"><button>NEWEST FIRST</button> <button>MY DRIVES</button> <button class="cp-feedtool svelte-tsx9t1">← BOARD</button></span></header> <div class="cp-feed-final svelte-tsx9t1"><b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-at svelte-tsx9t1">at</span> <b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-finalnote svelte-tsx9t1"> <!></span> <span class="cp-feed-prov svelte-tsx9t1"> </span></div> <div class="cp-feed-log svelte-tsx9t1" data-testid="cp-feed-log"><!> <!></div> <footer class="cp-feed-foot svelte-tsx9t1"><span> </span> <span class="cp-feed-dim svelte-tsx9t1">drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)</span></footer></section>`);function Ah(n,e){yn(e,!0);let a=hn(!1),s=hn(!1);const t=on(()=>f(a)?[...e.feed.drives].reverse():e.feed.drives),r=on(()=>f(s)?f(t).filter(I=>I.me):f(t)),o=I=>I.replace(":","·"),l=I=>I==="good"?"var(--cp-good)":I==="bad"?"var(--cp-bad)":I==="gold"?"var(--cp-gold)":"var(--cp-sub)";var i=Lh(),c=_(i),u=_(c),p=D(u),m=g(u,2),d=D(m),h=g(m,2),v=_(h);let B;var C=g(v,2);let k;var w=g(C,2),T=g(c,2),S=_(T),J=_(S),P=D(J,!0),F=g(J),b=g(S,4),A=_(b),O=D(A,!0),z=g(A),Q=g(b,2),x=_(Q),X=g(x);{var an=I=>{var U=wh(),ln=D(U);H(()=>y(ln,`· regulation ${e.feed.regAway??""}–${e.feed.regHome??""}`)),L(I,U)};tn(X,I=>{(e.feed.regHome!==e.feed.homeScore||e.feed.regAway!==e.feed.awayScore)&&I(an)})}var en=g(Q,2),j=D(en,!0),$=g(T,2),N=_($);cn(N,19,()=>f(r),I=>I.n,(I,U,ln)=>{var Z=Eh(),dn=Bn(Z);{var kn=Gn=>{var Zn=Rh(),se=D(Zn,!0);H(()=>y(se,f(U).period>=5?"OT":`Q${f(U).period}`)),L(Gn,Zn)};tn(dn,Gn=>{!f(s)&&!f(a)&&(f(ln)===0||f(r)[f(ln)-1].period!==f(U).period)&&Gn(kn)})}var Dn=g(dn,2);let Qn;var ie=_(Dn),An=D(ie,!0),Fn=g(ie,2),jn=D(Fn,!0),Mn=g(Fn,2),ne=_(Mn),ee=D(ne,!0),me=g(ne,2),ke=_(me);cn(ke,17,()=>f(U).badges,Gn=>Gn.label,(Gn,Zn)=>{var se=Zo(),Ta=D(se,!0);H(as=>{na(se,`color:${as??""}`),y(Ta,f(Zn).label)},[()=>l(f(Zn).tone)]),L(Gn,se)});var On=g(ke,2);cn(On,17,()=>f(U).convBadges,Gn=>Gn.label,(Gn,Zn)=>{var se=Zo(),Ta=D(se,!0);H(as=>{na(se,`color:${as??""}`),y(Ta,f(Zn).label)},[()=>l(f(Zn).tone)]),L(Gn,se)});var ce=g(Mn,2),ve=_(ce),ae=D(ve,!0),fe=g(ve,4),es=D(fe,!0);H(Gn=>{Qn=Wn(Dn,1,"cp-feed-line svelte-tsx9t1",null,Qn,{"cp-me":f(U).me}),na(Dn,`--beat:${f(ln)??""}`),fn(Dn,"data-period",f(U).period),y(An,Gn),na(Fn,`color:${f(U).teamPale??""}`),y(jn,f(U).teamAbbr),y(ee,f(U).summary),na(ve,`color:${e.feed.awayInk.pale??""}`),y(ae,f(U).scoreAfter.away),na(fe,`color:${e.feed.homeInk.pale??""}`),y(es,f(U).scoreAfter.home)},[()=>f(U).period>=5?`OT${f(U).period-4}`:o(f(U).clock)]),L(I,Z)});var V=g(N,2);{var q=I=>{var U=bh();L(I,U)};tn(V,I=>{f(r).length||I(q)})}var E=g($,2),W=_(E),Y=D(W);H(()=>{y(p,`WEEK ${e.feed.week??""} · ${e.feed.year??""}`),y(d,`${e.feed.awayAbbr??""} @ ${e.feed.homeAbbr??""}`),B=Wn(v,1,"cp-feedtool svelte-tsx9t1",null,B,{"cp-feedtool-on":f(a)}),fn(v,"aria-pressed",f(a)),k=Wn(C,1,"cp-feedtool svelte-tsx9t1",null,k,{"cp-feedtool-on":f(s)}),fn(C,"aria-pressed",f(s)),na(J,`color:${e.feed.awayInk.pale??""}`),y(P,e.feed.awayAbbr),y(F,` ${e.feed.awayScore??""}`),na(A,`color:${e.feed.homeInk.pale??""}`),y(O,e.feed.homeAbbr),y(z,` ${e.feed.homeScore??""}`),y(x,`${e.feed.ot?e.feed.ot.tie?`TIE — OT ×${e.feed.ot.periods} (both teams possessed)`:`FINAL — OT ×${e.feed.ot.periods} (both teams possessed)`:"FINAL"} `),y(j,e.feed.gameSeedLabel),y(Y,`${e.feed.drives.length??""} drives · ${e.feed.meDrives??""} mine · ${e.feed.leadChanges??""} lead changes`)}),sn("click",v,()=>nn(a,!f(a))),sn("click",C,()=>nn(s,!f(s))),sn("click",w,function(...I){e.onclose?.apply(this,I)}),L(n,i),Sn()}Pn(["click"]);var Mh=M('<h1 class="cp-done-h1 svelte-14csbb6">Your draft is complete</h1>'),Jh=M('· requested slot <b class="svelte-14csbb6"> </b>',1),_h=M('<p class="cp-note cp-done-note svelte-14csbb6"><!></p>'),Fh=M('<div class="cp-rosterline svelte-14csbb6"><!></div>'),Wh=M('<section class="cp-done svelte-14csbb6"><!> <p class="cp-done-sub svelte-14csbb6"><!></p> <p class="cp-prov cp-done-prov svelte-14csbb6">seed <b class="svelte-14csbb6"> </b> · code <b class="svelte-14csbb6"> </b> · engine <b class="svelte-14csbb6"> </b> <!> · every number reads <b class="svelte-14csbb6"> </b></p> <!> <!> <div class="cp-chipline svelte-14csbb6"><button class="cp-stepbtn cp-cta">PLAY THE SEASON</button> <button class="cp-stepbtn">YOUR PLAYER CARDS</button> <button class="cp-stepbtn">THE SEASON BOOK</button></div></section>');function Ph(n,e){yn(e,!0);let a=on(()=>e.record.picks.length),s=on(()=>f(a)>=1024),t=on(()=>e.record.picks.filter(N=>N.team===e.record.userTeam).length),r=on(()=>{if(!f(s))return[];try{const N=e.record,V=lt(e.record)[N.userTeam]??[];return(Er(V,"4-3").placements??[]).map(E=>({label:E.slot?.label??E.slot?.slot??"?",name:E.player?.name??"(empty)",ovr:E.player?String(E.effOvr??E.player.ovr):"-"}))}catch{return[]}}),o=on(()=>f(r).filter(N=>N.name!=="(empty)"&&N.ovr!=="-").length),l=on(()=>f(o)<11&&f(r).length?"incomplete":"complete"),i=on(()=>f(r).map((V,q)=>({i:q,v:V.name!=="(empty)"&&V.ovr!=="-"?Number(V.ovr):1/0})).filter(V=>V.v!==1/0).sort((V,q)=>V.v-q.v).slice(0,3).map(V=>V.i));var c=Wh(),u=_(c);{var p=N=>{var V=Mh();L(N,V)};tn(u,N=>{f(s)&&N(p)})}var m=g(u,2),d=_(m);{var h=N=>{var V=Fs("All 1,024 picks are in — every one of the 32 teams holds a full 32-man roster. The league is built; the season is yours to play.");L(N,V)},v=N=>{var V=Fs();H((q,E)=>y(V,`The draft has ${q??""} of 1,024 picks in (${E??""} of yours). Come back when the board says done — the season opens from here.`),[()=>xn(f(a)),()=>xn(f(t))]),L(N,V)};tn(d,N=>{f(s)?N(h):N(v,-1)})}var B=g(m,2),C=g(_(B)),k=D(C,!0),w=g(C,2),T=D(w,!0),S=g(w,2),J=D(S,!0),P=g(S),F=g(P);{var b=N=>{var V=Jh(),q=g(Bn(V)),E=D(q,!0);H(()=>y(E,e.requestedSlot)),L(N,V)};tn(F,N=>{e.requestedSlot!==null&&N(b)})}var A=g(F,2),O=D(A,!0),z=g(B,2);{var Q=N=>{var V=_h(),q=_(V);{var E=Y=>{var I=Fs();H(()=>y(I,`You drafted at slot ${e.record.pickSlot??""} — the store traded ${gn[e.record.userTeam].name??""} into that slot and mirrored the trade through the snake; the record carries it (pickSlot) and a restore replays the same order.`)),L(Y,I)},W=Y=>{var I=Fs();H(()=>y(I,`Slot ${e.requestedSlot??""} is ${gn[e.record.userTeam].name??""}'s own spot — the standard snake ran, and a restore replays it unchanged.`)),L(Y,I)};tn(q,Y=>{e.record.pickSlot!==void 0?Y(E):Y(W,-1)})}L(N,V)};tn(z,N=>{(e.requestedSlot!==null||e.record.pickSlot!==void 0)&&N(Q)})}var x=g(z,2);{var X=N=>{var V=Fh(),q=_(V);Zi(q,{get slots(){return f(r)},get weak(){return f(i)}}),H(()=>fn(V,"data-lineup",f(l))),L(N,V)};tn(x,N=>{f(s)&&f(r).length&&N(X)})}var an=g(x,2),en=_(an),j=g(en,2),$=g(j,2);H((N,V,q,E)=>{fn(c,"data-state",f(s)?"complete":"partial"),y(k,e.record.seed),y(T,N),y(J,V),y(P,` · ${q??""} picks · ${gn[e.record.userTeam].name??""} `),y(O,E),en.disabled=!f(s),fn(en,"title",f(s)?void 0:"the season needs a finished draft")},[()=>Ct(e.record.seed),()=>ks(),()=>xn(f(a)),()=>Je[re.get().mode]]),sn("click",en,function(...N){e.onseason?.apply(this,N)}),sn("click",j,function(...N){e.oncards?.apply(this,N)}),sn("click",$,function(...N){e.onbook?.apply(this,N)}),L(n,c),Sn()}Pn(["click"]);var Gh=M('<button class="cp-stepbtn">RESTORE A SAVED WEEK</button>'),Nh=M('<div class="cp-panel"><h2 class="cp-h2">THE SEASON</h2> <p class="cp-note">No season is running. Finish a draft and the season opens from the draft-complete screen — or restore a saved week.</p> <!></div>'),Ih=M('<span class="cp-score"> </span>'),Hh=M('<span class="cp-pending">NOT YET PLAYED</span>'),Kh=M('<div class="cp-matchup"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div> <button class="cp-stepbtn cp-cta"> </button>',1),xh=M('<p class="cp-note">No game for you this week — the league plays on.</p> <button class="cp-stepbtn cp-cta">PLAY THE WEEK</button>',1),Oh=M('<button class="cp-stepbtn">RESTORE</button>'),Vh=M("<button> </button>"),Yh=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">OPEN THE SEASON BOOK</button></div>'),zh=M('<h2 class="cp-h2"> </h2> <div class="cp-hubrow svelte-k2xmuw"><div class="cp-gamecard cp-megame"><p class="cp-final"> </p> <!></div> <div class="cp-hubmeta cp-panel svelte-k2xmuw"><p class="cp-sub"> </p> <div class="cp-chipline"><button class="cp-stepbtn">WEEK VIEW</button> <button class="cp-stepbtn">STANDINGS</button> <button class="cp-stepbtn">PLAYOFFS</button> <button class="cp-stepbtn">BOOK</button> <!></div></div></div> <div class="cp-panel"><h3 class="cp-h3 svelte-k2xmuw">THE WEEKS</h3> <div class="cp-weekgrid svelte-k2xmuw"></div></div> <!>',1),Qh=M('<section class="cp-hub"><!></section>');function jh(n,e){yn(e,!0);let a=on(()=>e.season.ready?e.season.finished?"finished":"running":"none"),s=on(()=>e.season.view?e.season.view.games.filter(c=>c.home===e.season.userTeamName||c.away===e.season.userTeamName):[]),t=on(()=>f(s).length?f(s)[0]:null);var r=Qh(),o=_(r);{var l=c=>{var u=Nh(),p=g(_(u),4);{var m=d=>{var h=Gh();sn("click",h,function(...v){e.onrestore?.apply(this,v)}),L(d,h)};tn(p,d=>{e.canRestore&&d(m)})}L(c,u)},i=c=>{var u=zh(),p=Bn(u),m=D(p),d=g(p,2),h=_(d),v=_(h),B=D(v),C=g(v,2);{var k=j=>{var $=Kh(),N=Bn($),V=_(N),q=D(V,!0),E=g(V,2);{var W=dn=>{var kn=Ih(),Dn=D(kn);H(()=>y(Dn,`${f(t).as??""} — ${f(t).hs??""}`)),L(dn,kn)},Y=dn=>{var kn=Hh();L(dn,kn)};tn(E,dn=>{f(t).hs!==null?dn(W):dn(Y,-1)})}var I=g(E,2),U=D(I,!0),ln=g(N,2),Z=D(ln,!0);H(()=>{y(q,f(t).awayAbbr),y(U,f(t).homeAbbr),y(Z,f(t).hs!==null?"WATCH THE FEED":"PLAY THE WEEK")}),sn("click",ln,function(...dn){e.onplayweek?.apply(this,dn)}),L(j,$)},w=j=>{var $=xh(),N=g(Bn($),2);sn("click",N,function(...V){e.onplayweek?.apply(this,V)}),L(j,$)};tn(C,j=>{f(t)?j(k):j(w,-1)})}var T=g(h,2),S=_(T),J=D(S),P=g(S,2),F=_(P),b=g(F,2),A=g(b,2),O=g(A,2),z=g(O,2);{var Q=j=>{var $=Oh();sn("click",$,function(...N){e.onrestore?.apply(this,N)}),L(j,$)};tn(z,j=>{e.canRestore&&j(Q)})}var x=g(d,2),X=g(_(x),2);cn(X,21,()=>Array(e.season.total),$a,(j,$,N)=>{const V=on(()=>N+1);var q=Vh();let E;var W=D(q,!0);H(()=>{E=Wn(q,1,"cp-wk svelte-k2xmuw",null,E,{"cp-cur":f(V)===e.season.slot,"cp-played":f(V)<e.season.slot+0&&e.season.atLastPlayed===!1||f(V)<=e.season.slot-1}),y(W,f(V)>ja?["WC","DIV","CONF","SB"][f(V)-ja-1]:f(V))}),sn("click",q,()=>e.onweek(f(V))),L(j,q)});var an=g(x,2);{var en=j=>{var $=Yh(),N=_($),V=D(N),q=g(N,2);H(E=>y(V,`${E??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion?.toUpperCase()]),sn("click",q,function(...E){e.onbook?.apply(this,E)}),L(j,$)};tn(an,j=>{e.season.finished&&j(en)})}H((j,$,N)=>{y(m,`THE SEASON · ${j??""} · ${e.season.view?.label??""??""}`),y(B,`YOUR GAME · ${e.season.view?.label??""??""}`),y(J,`Week slot ${$??""} of ${N??""} · ${e.season.finished?"season finished":e.season.atLastPlayed?"you are at the latest played week":"reviewing an earlier week"}`)},[()=>e.season.userTeamName.toUpperCase(),()=>xn(e.season.slot),()=>xn(e.season.total)]),sn("click",F,()=>e.onweek(e.season.slot)),sn("click",b,function(...j){e.onstandings?.apply(this,j)}),sn("click",A,function(...j){e.onbracket?.apply(this,j)}),sn("click",O,function(...j){e.onbook?.apply(this,j)}),L(c,u)};tn(o,c=>{f(a)==="none"?c(l):c(i,-1)})}H(()=>fn(r,"data-phase",f(a))),L(n,r),Sn()}Pn(["click"]);var Xo=M('<button class="cp-stepbtn cp-cta"> </button>'),Uh=M('<button class="cp-stepbtn">WATCH THE FEED</button>'),qh=M('<p class="cp-note">No season is running — open the hub to begin one.</p>'),Zh=M('<span class="cp-score"> </span> <span class="cp-final">FINAL</span>',1),Xh=M('<span class="cp-pending"> </span>'),$h=M('<div><div class="cp-matchup"><span class="cp-abbr"> </span> <!></div> <p class="cp-sub cp-gs"> </p></div>'),nm=M('<p class="cp-note">No games this slot.</p>'),em=M('<div class="cp-grid"></div> <!>',1),am=M('<section class="cp-week"><div class="cp-stepper"><button class="cp-stepbtn">‹ PREV</button> <span class="cp-weeklabel"> </span> <button class="cp-stepbtn">NEXT ›</button> <span class="cp-sub"> </span> <!> <!> <button class="cp-stepbtn">SAVE</button></div> <!></section>');function sm(n,e){yn(e,!0);let a=on(()=>e.season.view),s=on(()=>f(a)?.games.find(S=>S.home===e.season.userTeamName||S.away===e.season.userTeamName)??null);var t=am(),r=_(t),o=_(r),l=g(o,2),i=D(l,!0),c=g(l,2),u=g(c,2),p=D(u),m=g(u,2);{var d=S=>{var J=Xo(),P=D(J);H(()=>y(P,`PLAY WEEK ${e.season.slot??""}`)),sn("click",J,function(...F){e.onplay?.apply(this,F)}),L(S,J)},h=S=>{var J=Xo(),P=D(J);H(()=>y(P,`STEP TO WEEK ${e.season.slot+1}`)),sn("click",J,function(...F){e.onplay?.apply(this,F)}),L(S,J)};tn(m,S=>{f(s)&&f(s).hs===null?S(d):e.season.atLastPlayed&&!e.season.finished&&S(h,1)})}var v=g(m,2);{var B=S=>{var J=Uh();sn("click",J,()=>e.onfeed(f(s).home)),L(S,J)};tn(v,S=>{f(s)&&f(s).hs!==null&&S(B)})}var C=g(v,2),k=g(r,2);{var w=S=>{var J=qh();L(S,J)},T=S=>{var J=em(),P=Bn(J);cn(P,21,()=>f(a).games,A=>A.replayLabel,(A,O)=>{var z=$h();let Q;var x=_(z),X=_(x),an=D(X,!0),en=g(X,2);{var j=q=>{var E=Zh(),W=Bn(E),Y=D(W);H(()=>y(Y,`${f(O).as??""} — ${f(O).hs??""}`)),L(q,E)},$=q=>{var E=Xh(),W=D(E);H(()=>y(W,`@ ${f(O).homeAbbr??""} · not yet played`)),L(q,E)};tn(en,q=>{f(O).hs!==null?q(j):q($,-1)})}var N=g(x,2),V=D(N);H(q=>{Q=Wn(z,1,"cp-gamecard",null,Q,{"cp-megame":f(O).home===e.season.userTeamName||f(O).away===e.season.userTeamName}),y(an,f(O).awayAbbr),y(V,`gameSeed ${q??""}${f(O).round?" · "+f(O).round:""}`)},[()=>xn(f(O).gameSeed)]),L(A,z)});var F=g(P,2);{var b=A=>{var O=nm();L(A,O)};tn(F,A=>{f(a).games.length===0&&A(b)})}L(S,J)};tn(k,S=>{f(a)?S(T,-1):S(w)})}H((S,J)=>{o.disabled=e.season.slot<=1,y(i,e.season.label),c.disabled=e.season.slot>=e.season.total,y(p,`week slot ${S??""} / ${J??""}`)},[()=>xn(e.season.slot),()=>xn(e.season.total)]),sn("click",o,()=>En.prev()),sn("click",c,()=>En.next()),sn("click",C,function(...S){e.onsave?.apply(this,S)}),L(n,t),Sn()}Pn(["click"]);var tm=M('<p class="cp-note">No season is running — the standings arrive with it.</p>'),rm=M('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),om=M('<div class="cp-panel cp-stdiv"><h3 class="cp-h3"> </h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th><th class="num">PCT</th><th class="num">SEED</th></tr></thead><tbody></tbody></table></div>'),lm=M('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),im=M('<h2 class="cp-h2"> </h2> <div class="cp-stdivs svelte-1z0ye32"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table></div> <div class="cp-chipline"><button class="cp-stepbtn cp-cta">THE PLAYOFF PICTURE</button></div>',1),cm=M('<section class="cp-st"><!></section>');function fm(n,e){yn(e,!0);let a=on(()=>e.season.standings);var s=cm(),t=_(s);{var r=l=>{var i=tm();L(l,i)},o=l=>{var i=im(),c=Bn(i),u=D(c),p=g(c,2);cn(p,21,()=>f(a).divisions,C=>C.conf+C.div,(C,k)=>{var w=om(),T=_(w),S=D(T),J=g(T,2),P=g(_(J));cn(P,21,()=>f(k).rows,F=>F.team,(F,b)=>{var A=rm();let O;var z=_(A),Q=D(z),x=g(z),X=D(x,!0),an=g(x),en=D(an,!0),j=g(an),$=D(j,!0),N=g(j),V=D(N,!0),q=g(N),E=D(q,!0),W=g(q),Y=D(W,!0),I=g(W),U=D(I,!0);H(ln=>{O=Wn(A,1,"",null,O,{"cp-me":f(b).team===e.season.userTeamName}),y(Q,`${ln??""} ${f(b).team??""}`),y(X,f(b).w),y(en,f(b).l),y($,f(b).t),y(V,f(b).pf),y(E,f(b).pa),y(Y,f(b).winPct),y(U,f(b).seed??"—")},[()=>bn(f(b).team)]),L(F,A)}),H(()=>y(S,`${f(k).conf??""} ${f(k).div??""}`)),L(C,w)});var m=g(p,2),d=g(_(m),2),h=g(_(d));cn(h,23,()=>f(a).league,C=>C.team,(C,k,w)=>{var T=lm();let S;var J=_(T),P=D(J,!0),F=g(J),b=D(F),A=g(F),O=D(A,!0),z=g(A),Q=D(z,!0),x=g(z),X=D(x,!0),an=g(x),en=D(an,!0),j=g(an),$=D(j,!0);H(N=>{S=Wn(T,1,"",null,S,{"cp-me":f(k).team===e.season.userTeamName}),y(P,f(w)+1),y(b,`${N??""} ${f(k).team??""}`),y(O,f(k).w),y(Q,f(k).l),y(X,f(k).t),y(en,f(k).pf),y($,f(k).pa)},[()=>bn(f(k).team)]),L(C,T)});var v=g(m,2),B=D(v);H(C=>y(u,`STANDINGS · THROUGH ${C??""}`),[()=>f(a).throughWeek===18?"WEEK 18":"WEEK "+xn(f(a).throughWeek)]),sn("click",B,function(...C){e.onbracket?.apply(this,C)}),L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),Sn()}Pn(["click"]);const um={"Wild Card":"WILD CARD",Divisional:"DIVISIONAL",Conference:"CONFERENCE","Super Bowl":"SUPER BOWL"},dm=["Wild Card","Divisional","Conference","Super Bowl"],pm=(n,e,a)=>{if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}const s=n.playoffs.filter(t=>t.round===e);if(s.length===0){const t=(r,o)=>n.playoffs.filter(l=>l.round===r&&(a?.seeds[o].includes(l.home)??!1)).map(l=>l.hs>l.as?l.home:l.away);if(e==="Divisional"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=u=>l.indexOf(u)+1,c=[l[0],...t("Wild Card",o)].sort((u,p)=>i(u)-i(p));c.length===4&&r.push([c[0],c[3]],[c[1],c[2]])}return r}if(e==="Conference"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=u=>l.indexOf(u)+1,c=t("Divisional",o).sort((u,p)=>i(u)-i(p));c.length===2&&r.push([c[0],c[1]])}return r}if(e==="Super Bowl"){const r=["AFC","NFC"].map(o=>t("Conference",o)[0]).filter(Boolean);if(r.length===2)return[[r[0],r[1]]]}return[]}return s.map(t=>[t.home,t.away])};function hm(n,e){const a=n.seeding,s=r=>(a?.seeds[r]??[]).map((o,l)=>({seed:l+1,team:o,abbr:bn(o),me:o===e})),t=dm.map(r=>{const o=pm(n,r,a??null),l=n.playoffs.filter(c=>c.round===r),i=o.length===0?"pending":l.length===o.length?"played":"ready";return{round:r,label:um[r],state:i,pairs:o.map(([c,u])=>{const p=l.find(m=>m.home===c&&m.away===u);return{home:c,away:u,homeAbbr:bn(c),awayAbbr:bn(u),hs:p?p.hs:null,as:p?p.as:null,winner:p?p.hs>p.as?c:p.as>p.hs?u:null:null,gameSeed:0}})}});return{seeded:!!a,seeds:{AFC:s("AFC"),NFC:s("NFC")},rounds:t,champion:n.champion,championAbbr:n.champion?bn(n.champion):null}}var mm=M('<p class="cp-note">No season is running — the bracket arrives with it.</p>'),vm=M(`<p class="cp-note">The field is set after week 18. Keep stepping the season — the bracket fills itself from the engine's seeding.</p>`),gm=M("<span> </span>"),Bm=M('<h3 class="cp-h3"> </h3> <div class="cp-seeds svelte-1f06r09"></div>',1),Cm=M('<div class="cp-panel"></div>'),Tm=M(`<p class="cp-sub">Pending — the round's pairs derive from the round before it.</p>`),ym=M('<span class="cp-score"> </span> <span class="cp-final"> </span>',1),Sm=M('<span class="cp-pending">VS · not yet played</span>'),km=M('<div class="cp-matchup cp-brpair svelte-1f06r09"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div>'),Dm=M('<div class="cp-brackround"><h3> </h3> <!></div>'),wm=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Rm=M('<h2 class="cp-h2">THE PLAYOFFS</h2> <!> <div class="cp-bracket-list svelte-1f06r09"></div> <!>',1),Em=M('<section class="cp-bracket"><!></section>');function bm(n,e){yn(e,!0);let a=on(()=>e.season.runState?hm(e.season.runState,e.season.userTeamName):null);var s=Em(),t=_(s);{var r=l=>{var i=mm();L(l,i)},o=l=>{var i=Rm(),c=g(Bn(i),2);{var u=v=>{var B=vm();L(v,B)},p=v=>{var B=Cm();cn(B,20,()=>["AFC","NFC"],C=>C,(C,k)=>{var w=Bm(),T=Bn(w),S=D(T),J=g(T,2);cn(J,21,()=>f(a).seeds[k],P=>P.seed,(P,F)=>{var b=gm();let A;var O=D(b);H(()=>{A=Wn(b,1,"cp-seedrow svelte-1f06r09",null,A,{"cp-meseed":f(F).me}),y(O,`${f(F).seed??""}. ${f(F).abbr??""}`)}),L(P,b)}),H(()=>y(S,`${k??""} FIELD`)),L(C,w)}),L(v,B)};tn(c,v=>{f(a).seeded?v(p,-1):v(u)})}var m=g(c,2);cn(m,21,()=>f(a).rounds,v=>v.round,(v,B)=>{var C=Dm(),k=_(C),w=D(k,!0),T=g(k,2);{var S=P=>{var F=Tm();L(P,F)},J=P=>{var F=Kf(),b=Bn(F);cn(b,17,()=>f(B).pairs,A=>A.home+A.away,(A,O)=>{var z=km(),Q=_(z),x=D(Q,!0),X=g(Q,2);{var an=N=>{var V=ym(),q=Bn(V),E=D(q),W=g(q,2),Y=D(W);H(I=>{y(E,`${f(O).as??""} — ${f(O).hs??""}`),y(Y,`FINAL · ${I??""}`)},[()=>f(O).winner?f(O).winner.toUpperCase():""]),L(N,V)},en=N=>{var V=Sm();L(N,V)};tn(X,N=>{f(O).hs!==null?N(an):N(en,-1)})}var j=g(X,2),$=D(j,!0);H(()=>{y(x,f(O).awayAbbr),y($,f(O).homeAbbr)}),L(A,z)}),L(P,F)};tn(T,P=>{f(B).pairs.length===0?P(S):P(J,-1)})}H(()=>{fn(C,"data-state",f(B).state),y(w,f(B).label)}),L(v,C)});var d=g(m,2);{var h=v=>{var B=wm(),C=_(B),k=D(C),w=g(C,2);H(T=>y(k,`${T??""} · SUPER BOWL CHAMPIONS`),[()=>f(a).champion.toUpperCase()]),sn("click",w,function(...T){e.onreview?.apply(this,T)}),L(v,B)};tn(d,v=>{f(a).champion&&v(h)})}L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),Sn()}Pn(["click"]);var Lm=M('<p class="cp-note">No season yet — the book opens when one has been played.</p>'),Am=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Mm=M('<div class="cp-revline"><span class="per"> </span> <span class="cp-abbr"> </span> <span class="cp-score"> </span> <span class="cp-abbr"> </span> <button class="cp-stepbtn">REPLAY FEED</button></div>'),Jm=M('<p class="cp-sub">The playoffs have not been played yet.</p>'),_m=M('<div class="cp-pcard"><div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div></div>'),Fm=M('<div class="cp-cardgrid"></div>'),Wm=M(`<p class="cp-sub">The champion's draft class rides the finished draft.</p>`),Pm=M('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),Gm=M('<div class="cp-panel"><h3 class="cp-h3">FINAL STANDINGS</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table> <p class="cp-sub">Top 10 shown; the full table lives on Standings.</p></div>'),Nm=M(`<!> <div class="cp-panel"><h3 class="cp-h3">REPLAYABLE PLAYOFF GAMES</h3> <!></div> <div class="cp-panel"><h3 class="cp-h3">THE CHAMPION'S ROSTER</h3> <!></div> <!>`,1),Im=M('<section class="cp-book"><h2 class="cp-h2"> </h2> <!></section>');function Hm(n,e){yn(e,!0);let a=on(()=>{const c=e.draftRecord;if(!c||!e.season.champion)return[];const u=Mr(c.pool),p=new Map(u.map(d=>[d.id,d])),m=gn.findIndex(d=>d.name===e.season.champion);return m<0?[]:c.picks.filter(d=>d.team===m).map(d=>p.get(d.pid)).filter(Boolean)});var s=Im(),t=_(s),r=D(t),o=g(t,2);{var l=c=>{var u=Lm();L(c,u)},i=c=>{var u=Nm(),p=Bn(u);{var m=S=>{var J=Am(),P=_(J),F=D(P),b=g(P,2);H(A=>y(F,`${A??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),sn("click",b,function(...A){e.onreview?.apply(this,A)}),L(S,J)};tn(p,S=>{e.season.champion&&S(m)})}var d=g(p,2),h=g(_(d),2);cn(h,17,()=>e.season.runState?.playoffs??[],S=>S.week+S.home,(S,J)=>{var P=Mm(),F=_(P),b=D(F,!0),A=g(F,2),O=D(A,!0),z=g(A,2),Q=D(z),x=g(z,2),X=D(x,!0),an=g(x,2);H((en,j,$)=>{y(b,en),y(O,j),y(Q,`${f(J).as??""} — ${f(J).hs??""}`),y(X,$)},[()=>f(J).round?.toUpperCase(),()=>bn(f(J).away),()=>bn(f(J).home)]),sn("click",an,()=>e.onfeed(f(J).home)),L(S,P)},S=>{var J=Jm();L(S,J)});var v=g(d,2),B=g(_(v),2);{var C=S=>{var J=Fm();cn(J,23,()=>f(a),P=>P.id,(P,F,b)=>{var A=_m(),O=_(A),z=D(O,!0),Q=g(O,2),x=D(Q,!0),X=g(Q,2),an=D(X);H((en,j,$)=>{y(z,en),y(x,f(F).name),y(an,`${f(F).pos??""} · ${f(F).team??""} · OVR ${j??""} · pick ${$??""}`)},[()=>f(F).name.split(/\s+/).slice(0,2).map(en=>en[0]).join(""),()=>xn(f(F).ovr),()=>xn(f(b)+1)]),L(P,A)}),L(S,J)},k=S=>{var J=Wm();L(S,J)};tn(B,S=>{f(a).length?S(C):S(k,-1)})}var w=g(v,2);{var T=S=>{var J=Gm(),P=g(_(J),2),F=g(_(P));cn(F,23,()=>e.season.standings.league.slice(0,10),b=>b.team,(b,A,O)=>{var z=Pm();let Q;var x=_(z),X=D(x,!0),an=g(x),en=D(an),j=g(an),$=D(j,!0),N=g(j),V=D(N,!0),q=g(N),E=D(q,!0),W=g(q),Y=D(W,!0),I=g(W),U=D(I,!0);H(ln=>{Q=Wn(z,1,"",null,Q,{"cp-me":f(A).team===e.season.userTeamName}),y(X,f(O)+1),y(en,`${ln??""} ${f(A).team??""}`),y($,f(A).w),y(V,f(A).l),y(E,f(A).t),y(Y,f(A).pf),y(U,f(A).pa)},[()=>bn(f(A).team)]),L(b,z)}),L(S,J)};tn(w,S=>{e.season.standings&&S(T)})}L(c,u)};tn(o,c=>{e.season.ready?c(i,-1):c(l)})}H(c=>y(r,`THE SEASON BOOK${c??""}`),[()=>e.season.champion?` · ${e.season.champion.toUpperCase()}`:""]),L(n,s),Sn()}Pn(["click"]);const $o={MVP:"MOST VALUABLE PLAYER",OPOY:"OFFENSIVE PLAYER OF THE YEAR",DPOY:"DEFENSIVE PLAYER OF THE YEAR",COACH:"COACH OF THE YEAR"},nl={pyd:"PASSING YARDS",ptd:"PASSING TD",ryd:"RUSHING YARDS",rtd:"RUSHING TD",recYd:"RECEIVING YARDS",rec:"RECEPTIONS",recTd:"RECEIVING TD",sack:"SACKS",intDef:"INTERCEPTIONS",tkl:"TACKLES",ff:"FORCED FUMBLES",fgm:"FIELD GOALS",defTd:"DEFENSIVE TD"},Km={pyd:"pyd",ptd:"ptd",ryd:"ryd",rtd:"rtd",recYd:"recYd",rec:"rec",recTd:"recTd",sack:"sack",intDef:"intDef",tkl:"tkl",ff:"ff",fgm:"fgm",defTd:"defTd"},el=(n,e)=>{const a=n[e];return a?`${a.w}-${a.l}${a.t?"-"+a.t:""}`:""};function xm(n,e){const a=hd(n,e),s=(o,l)=>l&&{key:o,name:$o[o]??o,winner:l.name,line:`${l.label} · ${Object.entries(l.stats).filter(([,i])=>i>0).slice(0,3).map(([i,c])=>`${i} ${c}`).join(", ")}`,team:l.team,teamAbbr:bn(l.team),teamWins:el(e,l.team),shimmer:!1}||null,t=[];for(const[o,l]of[["MVP",a.mvp],["OPOY",a.opoy],["DPOY",a.dpoy]]){const i=s(o,l);i&&t.push(i)}a.coach&&t.push({key:"COACH",name:$o.COACH,winner:a.coach.team,line:`${Ss("wins",a.coach.over)} over expected`,team:a.coach.team,teamAbbr:bn(a.coach.team),teamWins:el(e,a.coach.team),shimmer:!1});const r=Gi.filter(o=>nl[o]).map(o=>({key:o,label:nl[o],rows:Wr(n,o,5).map(l=>({name:l.name,team:l.team,abbr:bn(l.team),value:String(l.stats[Km[o]??o]??0)}))}));return{regular:t,leaders:r}}var Om=M('<p class="cp-note">No season statistics yet — the awards are computed from the games the engine plays, never promised in advance.</p>'),Vm=M('<div class="cp-award"><div class="aname"> </div> <div> </div> <div class="cp-sub"> </div> <div class="cp-sub"> </div></div>'),Ym=M('<p class="cp-sub">The winners arrive with the finished season.</p>'),zm=M('<div class="cp-lrow svelte-1yazvx7"><span class="cp-lrank svelte-1yazvx7"> </span> <span class="cp-lteam svelte-1yazvx7"> </span> <b class="cp-lval svelte-1yazvx7"> </b></div>'),Qm=M('<div class="cp-leadercol"><h4 class="cp-lh svelte-1yazvx7"> </h4> <!></div>'),jm=M('<div class="cp-awards-grid svelte-1yazvx7"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE LEADERS</h3> <div class="cp-leadercols svelte-1yazvx7"></div></div>',1),Um=M('<section class="cp-awards"><h2 class="cp-h2">THE AWARDS</h2> <!></section>');function qm(n,e){yn(e,!0);let a=on(()=>e.stats&&e.table?xm(e.stats,e.table):null);var s=Um(),t=g(_(s),2);{var r=l=>{var i=Om();L(l,i)},o=l=>{var i=jm(),c=Bn(i);cn(c,21,()=>f(a).regular,m=>m.key,(m,d)=>{var h=Vm(),v=_(h),B=D(v,!0),C=g(v,2);let k;var w=D(C,!0),T=g(C,2),S=D(T,!0),J=g(T,2),P=D(J);H(()=>{y(B,f(d).name),k=Wn(C,1,"awinner",null,k,{"cp-shimmer90":f(d).shimmer}),y(w,f(d).winner),y(S,f(d).line),y(P,`${f(d).teamAbbr??""} · ${f(d).teamWins??""}`)}),L(m,h)},m=>{var d=Ym();L(m,d)});var u=g(c,2),p=g(_(u),2);cn(p,21,()=>f(a).leaders,m=>m.key,(m,d)=>{var h=Qm(),v=_(h),B=D(v,!0),C=g(v,2);cn(C,19,()=>f(d).rows,k=>k.name,(k,w,T)=>{var S=zm(),J=_(S),P=D(J,!0),F=g(J),b=g(F),A=D(b),O=g(b,2),z=D(O,!0);H(()=>{y(P,f(T)+1),y(F,` ${f(w).name??""} `),y(A,`(${f(w).abbr??""})`),y(z,f(w).value)}),L(k,S)}),H(()=>y(B,f(d).label)),L(m,h)}),L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),Sn()}const al={"missed-playoffs":"The season ended in week 18 — the playoffs went on without you.","wild-card":"Your season ended in the Wild Card round.",divisional:"Your season ended in the Divisional round.",conference:"Your season ended in the Conference championship.","super-bowl-loss":"You reached the Super Bowl and fell one game short.",champion:"You won the Super Bowl."};function Zm(n,e){const a=Bt(n),s=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e),t=a[e]??{w:0,l:0,t:0,pf:0,pa:0},r=s.filter(l=>l.round).map(l=>l.round).pop(),o=n.champion===e?"champion":r??"missed-playoffs";return{year:n.year,userTeam:e,userAbbr:bn(e),outcome:al[o]??al["missed-playoffs"],w:t.w,l:t.l,t:t.t,pf:t.pf,pa:t.pa,gamesPlayed:s.length,champion:n.champion??"",championAbbr:n.champion?bn(n.champion):"",userMadePlayoffs:!!r,highlightLines:[`You played ${s.length} games and went ${t.w}-${t.l}${t.t?"-"+t.t:""}.`,`Your team scored ${t.pf} points and allowed ${t.pa}.`,n.champion?`The season's champion: ${n.champion}.`:"The season is not finished yet."]}}var Xm=M('<p class="cp-note">No season to review yet — the review arrives with the run.</p>'),$m=M('<div class="cp-champbanner"><div class="champ"> </div></div>'),nv=M('<div class="cp-chipstat"><b> </b><span>TIES</span></div>'),ev=M('<p class="cp-revsummary svelte-1vfenj1"> </p>'),av=M('<h2 class="cp-h2"> </h2> <!> <div class="cp-chipline"><div class="cp-chipstat"><b> </b><span>WINS</span></div> <div class="cp-chipstat"><b> </b><span>LOSSES</span></div> <!> <div class="cp-chipstat"><b> </b><span>POINTS FOR</span></div> <div class="cp-chipstat"><b> </b><span>POINTS AGAINST</span></div> <div class="cp-chipstat"><b> </b><span>GAMES PLAYED</span></div></div> <div class="cp-panel cp-guide"><p class="cp-done-sub"> </p> <!></div> <div class="cp-chipline"><button class="cp-stepbtn">THE BRACKET</button> <button class="cp-stepbtn">THE AWARDS</button> <button class="cp-stepbtn cp-cta">THE SEASON BOOK</button></div>',1),sv=M('<section class="cp-sreview"><!></section>');function tv(n,e){yn(e,!0);let a=on(()=>e.season.runState?Zm(e.season.runState,e.season.userTeamName):null);var s=sv(),t=_(s);{var r=l=>{var i=Xm();L(l,i)},o=l=>{var i=av(),c=Bn(i),u=D(c),p=g(c,2);{var m=E=>{var W=$m(),Y=_(W),I=D(Y);H(U=>y(I,`${U??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),L(E,W)};tn(p,E=>{e.season.champion&&E(m)})}var d=g(p,2),h=_(d),v=_(h),B=D(v,!0),C=g(h,2),k=_(C),w=D(k,!0),T=g(C,2);{var S=E=>{var W=nv(),Y=_(W),I=D(Y,!0);H(()=>y(I,f(a).t)),L(E,W)};tn(T,E=>{f(a).t&&E(S)})}var J=g(T,2),P=_(J),F=D(P,!0),b=g(J,2),A=_(b),O=D(A,!0),z=g(b,2),Q=_(z),x=D(Q,!0),X=g(d,2),an=_(X),en=D(an,!0),j=g(an,2);cn(j,16,()=>f(a).highlightLines,E=>E,(E,W)=>{var Y=ev(),I=D(Y,!0);H(()=>y(I,W)),L(E,Y)});var $=g(X,2),N=_($),V=g(N,2),q=g(V,2);H((E,W,Y)=>{y(u,`THE SEASON REVIEW · ${f(a).userAbbr??""} ${E??""}`),y(B,f(a).w),y(w,f(a).l),y(F,W),y(O,Y),y(x,f(a).gamesPlayed),y(en,f(a).outcome)},[()=>e.season.userTeamName.toUpperCase(),()=>xn(f(a).pf),()=>xn(f(a).pa)]),sn("click",N,function(...E){e.onbracket?.apply(this,E)}),sn("click",V,function(...E){e.onawards?.apply(this,E)}),sn("click",q,function(...E){e.onbook?.apply(this,E)}),L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),Sn()}Pn(["click"]);uf();var rv=M(`<section class="cp-guide"><h2 class="cp-h2">HOW THIS WORKS</h2> <p class="cp-cygline"><span class="cp-cygt">Can you go</span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p> <p class="cp-note">76 Pancakes is a draft simulator: you draft real players for one of the 32 teams, the other 31 teams draft against you, and then the engine plays a full 22-week season — every game, every drive — from the rosters the draft produced. Nothing on any screen is a promise; every number is a measured value the engine computed.</p> <dl><dt>THE DRAFT</dt> <dd>32 teams, 32 rounds, one pick per slot. Your board shows the players you can still take; the CPU teams pick by the engine's own policy while you are not on the clock. You may draft a player into any slot he legally fits — a flex cost applies when he plays out of position, and the cost is the engine's own table, shown as "−N flex".</dd> <dt>THE NUMBERS (Wins · Priority · OVR)</dt> <dd><b>Wins</b> <b>Priority</b> is Wins divided by the gone odds — the value of taking him right now. <b>OVR</b> is the player's overall rating. Only these three ride the board; integers everywhere except Wins and Priority, which print one decimal.</dd> <dt>GONE%</dt> <dd>The chance the player is drafted between now and your next pick. The method, in plain words: the engine simulates the CPU draft from this point 30 times and counts how often each player is gone when your turn returns. Hover the column to see the exact counts.</dd> <dt>VALUATION MODES</dt> <dd>Every number carries a label: <b> </b> (the engine's measured default), <b> </b>, or <b> </b>. One mode at a time, never blended; the label travels with the numbers everywhere they appear; the switch locks the moment a draft starts.</dd> <dt>THE SEASON</dt> <dd>The finished rosters become 32 rated teams (the engine builds each team's lineup and rates it — no ratings are invented here). The engine builds the schedule, plays every game week by week through its drive generator, seeds the playoffs after week 18, and plays Wild Card → Divisional → Conference → Super Bowl. Each game's result is a fixed derivation of the season seed and the matchup: the same draft and seed always replay the same game, and the gameSeed stamp on every card proves it.</dd> <dt>THE FEED AND THE RECAP</dt> <dd>The feed is the play-by-play of the user's game, drive by drive, with running scores and lead-change marks. The recap names every score, every turnover and every star in plain informative lines. Overtime events appear in the overtime block; the words "expected scoring" and "sudden death" never appear anywhere in this product. There are no injuries in any sport, ever.</dd> <dt>SAVES</dt> <dd>One save blob per slot, version-checked on every read. A corrupt save is refused and shown verbatim — never repaired, never silently replaced. A save written by a newer build is refused with its version named.</dd> <dt>OFFLINE</dt> <dd>The fonts are bundled in the app (Cinzel, inlined — never loaded from Google's servers). The whole product runs from a single file on disk with no network. Shareable cards export as one self-contained file each.</dd> <dt>BUILD</dt> <dd> </dd></dl></section>`);function ov(n,e){yn(e,!1),c0();var a=rv(),s=g(_(a),6),t=g(_(s),6),r=g(_(t));r.nodeValue=" is the model's estimate of how many wins a player adds — the engine's weight-OVR units carried to wins (one number, one decimal). ";var o=g(t,8),l=g(_(o)),i=D(l,!0),c=g(l,2),u=D(c,!0),p=g(c,2),m=D(p,!0),d=g(o,20),h=D(d);H(v=>{y(i,Je.measured),y(u,Je.balance),y(m,Je.owner),y(h,`Engine stamp ${v??""} — the frozen snapshot this shell consumes byte-identically. The engine's own test suite runs in this tree; the shell's battery laws run against the built app.`)},[()=>ks()]),L(n,a),Sn()}const lv=n=>n.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0].toUpperCase()).join("");function iv(n){return{cards:n.rows.map(a=>({id:a.id,name:a.name,pos:a.pos,nflTeam:a.nflTeam,ovr:a.ovr,wins:a.wins,priority:a.priority,slotId:a.slotId,slotLabel:a.slotLabel,tone:a.tone,alsoFits:a.alsoFits.map(s=>s.slotLabel+(s.flex?" ("+s.flex+")":"")),monogram:lv(a.name),arrow:a.tone==="good"?"up":a.tone==="bad"?"down":"flat"})),teamName:n.header.teamName,overall:n.header.overall,totalPicks:n.header.totalPicks,onClock:n.header.onClock,count:n.footer.text}}var cv=M(`<p class="cp-note">No board yet — the cards re-render the board's own rows, so a draft has to exist first.</p>`),fv=M('<div class="pmeta cp-fitsline"> </div>'),uv=M('<div class="cp-pcard"><span title="form"> </span> <div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div> <div class="pnum"><div><b> </b><span>WINS</span></div> <div><b> </b><span>PRIORITY</span></div> <div><b> </b><span>OVR</span></div></div> <!></div>'),dv=M('<p class="cp-sub"> </p> <div class="cp-cardgrid"></div> <p class="cp-prov">Every number on these cards reads <b> </b> </p>',1),pv=M('<section class="cp-cards"><h2 class="cp-h2"> </h2> <!></section>');function hv(n,e){yn(e,!0);let a=on(()=>e.vm?iv(e.vm):null);var s=pv(),t=_(s),r=D(t),o=g(t,2);{var l=c=>{var u=cv();L(c,u)},i=c=>{var u=dv(),p=Bn(u),m=D(p,!0),d=g(p,2);cn(d,21,()=>f(a).cards,k=>k.id,(k,w)=>{var T=uv(),S=_(T),J=D(S,!0),P=g(S,2),F=D(P,!0),b=g(P,2),A=D(b,!0),O=g(b,2),z=D(O),Q=g(O,2),x=_(Q),X=_(x),an=D(X,!0),en=g(x,2),j=_(en),$=D(j,!0),N=g(en,2),V=_(N),q=D(V,!0),E=g(Q,2);{var W=Y=>{var I=fv(),U=D(I,!0);H(ln=>y(U,ln),[()=>f(w).alsoFits.join(" · ")]),L(Y,I)};tn(E,Y=>{f(w).alsoFits.length&&Y(W)})}H(()=>{fn(T,"data-tone",f(w).tone),Wn(S,1,`cp-arrow ${f(w).arrow??""}`),y(J,f(w).arrow==="up"?"▲":f(w).arrow==="down"?"▼":"—"),y(F,f(w).monogram),y(A,f(w).name),y(z,`${f(w).pos??""} · ${f(w).nflTeam??""} · fills ${f(w).slotLabel??""}`),y(an,f(w).wins),y($,f(w).priority),y(q,f(w).ovr)}),L(k,T)});var h=g(d,2),v=g(_(h)),B=D(v,!0),C=g(v);H(k=>{y(m,f(a).onClock),y(B,k),y(C,` — the label travels with the numbers. ${f(a).count??""}.`)},[()=>Je[re.get().mode]]),L(c,u)};tn(o,c=>{f(a)?c(i,-1):c(l)})}H(()=>y(r,`PLAYER CARDS${f(a)?` · ${f(a).teamName}`:""}`)),L(n,s),Sn()}var mv=M('<p class="cp-note">No season statistics yet — the stats accumulate from the games the engine plays.</p>'),vv=M('<span class="cp-statp svelte-1y9sotg"> <b class="svelte-1y9sotg"> </b></span>'),gv=M('<span class="cp-statp cp-none svelte-1y9sotg">—</span>'),Bv=M('<div class="cp-statrow svelte-1y9sotg"><span class="cp-statl svelte-1y9sotg"> </span> <!></div>'),Cv=M('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),Tv=M(`<div class="cp-panel"><h3 class="cp-h3">THE 32 TEAMS' ENGINE RATINGS</h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">OFF</th><th class="num">DEF</th><th class="num">PASS</th><th class="num">RUN</th><th class="num">RUSH D</th><th class="num">COV</th><th class="num">W</th><th class="num">L</th><th class="num">T</th></tr></thead><tbody></tbody></table> <p class="cp-sub">OFF/DEF are the engine's net points vs the league baseline (Wins units, one decimal); the rest are the engine's raw rating axes.</p></div>`),yv=M(`<p class="cp-note cp-standin svelte-1y9sotg">STAND-IN: gravity and double-teams are formally measured in the live site's model, not yet by the pinned engine — filed §5 to the Architect. Everything below IS the engine's own output.</p> <div class="cp-panel"><h3 class="cp-h3">THE SEASON LINES (LEAGUE LEADERS)</h3> <!></div> <!>`,1),Sv=M('<section class="cp-stats"><h2 class="cp-h2">THE STATS</h2> <!></section>');function kv(n,e){yn(e,!0);const a=[["pyd","PASS YD"],["ptd","PASS TD"],["ryd","RUSH YD"],["rtd","RUSH TD"],["recYd","REC YD"],["rec","REC"],["sack","SACKS"],["intDef","INT"],["tkl","TACKLES"],["fgm","FG"]];var s=Sv(),t=g(_(s),2);{var r=l=>{var i=mv();L(l,i)},o=l=>{var i=yv(),c=g(Bn(i),2),u=g(_(c),2);cn(u,17,()=>a,([d,h])=>d,(d,h)=>{var v=on(()=>Jc(f(h),2));let B=()=>f(v)[0],C=()=>f(v)[1];const k=on(()=>Wr(e.stats,B(),3));var w=Bv(),T=_(w),S=D(T,!0),J=g(T,2);cn(J,17,()=>f(k),P=>P.id,(P,F)=>{var b=vv(),A=_(b),O=g(A),z=D(O,!0);H(Q=>{y(A,`${f(F).name??""} `),y(z,Q)},[()=>xn(f(F).stats[B()]??0)]),L(P,b)},P=>{var F=gv();L(P,F)}),H(()=>y(S,C())),L(d,w)});var p=g(c,2);{var m=d=>{var h=Tv(),v=g(_(h),2),B=g(_(v));cn(B,23,()=>gn,C=>C.name,(C,k,w)=>{const T=on(()=>e.teams[f(w)]?.ratings),S=on(()=>e.table[f(k).name]);var J=Cv(),P=_(J),F=D(P),b=g(P),A=D(b,!0),O=g(b),z=D(O,!0),Q=g(O),x=D(Q,!0),X=g(Q),an=D(X,!0),en=g(X),j=D(en,!0),$=g(en),N=D($,!0),V=g($),q=D(V,!0),E=g(V),W=D(E,!0),Y=g(E),I=D(Y,!0);H((U,ln,Z,dn,kn,Dn,Qn)=>{y(F,`${U??""} ${f(k).name??""}`),y(A,ln),y(z,Z),y(x,dn),y(an,kn),y(j,Dn),y(N,Qn),y(q,f(S)?.w??"—"),y(W,f(S)?.l??"—"),y(I,f(S)?.t??"—")},[()=>bn(f(k).name),()=>f(T)?Ss("wins",f(T).off):"—",()=>f(T)?Ss("wins",f(T).def):"—",()=>f(T)?xn(f(T).passOff):"—",()=>f(T)?xn(f(T).runOff):"—",()=>f(T)?xn(f(T).frontRun):"—",()=>f(T)?xn(f(T).coverage):"—"]),L(C,J)}),L(d,h)};tn(p,d=>{e.teams&&d(m)})}L(l,i)};tn(t,l=>{!e.stats||!e.table?l(r):l(o,-1)})}L(n,s),Sn()}var Dv=M('<section class="cp-settings"><h2 class="cp-h2">SETTINGS</h2> <div class="cp-panel"><div class="cp-setrow"><label for="set-mode">Colour mode</label> <select id="set-mode"><option>Follow the system</option><option>Light (pale rose)</option><option>Dark (plum ink)</option></select></div> <div class="cp-setrow"><label for="set-motion">Reduce motion</label> <input id="set-motion" type="checkbox"/></div> <div class="cp-setrow"><label for="set-order">Feed reading: newest first</label> <input id="set-order" type="checkbox"/></div> <div class="cp-setrow"><span class="cp-cap">Valuation mode</span> <span class="cp-sub"> </span></div></div> <div class="cp-chipline"><button class="cp-stepbtn">SAVES · SLOT A · B · C</button> <button class="cp-stepbtn">CLEAR SAVED CHOICES</button></div> <p class="cp-note">Settings persist across reload. Saves are one blob per slot, version-checked on every read — a corrupt save is refused verbatim, never repaired.</p></section>');function wv(n,e){yn(e,!0);var a=Dv(),s=g(_(a),2),t=_(s),r=g(_(t),2),o=_(r);o.value=o.__value="system";var l=g(o);l.value=l.__value="light";var i=g(l);i.value=i.__value="dark";var c;s0(r);var u=g(t,2),p=g(_(u),2),m=g(u,2),d=g(_(m),2),h=g(m,2),v=g(_(h),2),B=D(v),C=g(s,2),k=_(C),w=g(k,2);H((T,S)=>{c!==(c=e.settings.mode)&&(r.value=(r.__value=c)??"",Yl(r,c)),no(p,e.settings.reducedMotion),no(d,e.settings.newestFirst),y(B,`${T??""}${S??""}`)},[()=>Je[re.get().mode],()=>re.get().locked?" (locked mid-draft)":""]),sn("change",r,T=>e.onmode(T.currentTarget.value)),sn("change",p,T=>e.onmotion(T.currentTarget.checked)),sn("change",d,T=>e.onorder(T.currentTarget.checked)),sn("click",k,function(...T){e.onsaves?.apply(this,T)}),sn("click",w,function(...T){e.onresetsave?.apply(this,T)}),L(n,a),Sn()}Pn(["change","click"]);const Rv=`
  :root { color-scheme: light dark; }
  body { margin:0; padding:18px; background:#1e1119; color:#f2e7d5; font-family: Georgia, 'Times New Roman', serif; }
  .card { max-width:420px; margin:0 auto; border:1px solid #c39a4a; border-radius:14px; padding:22px;
          background:linear-gradient(160deg,#291a24,#1e1119); }
  .h { font-size:1.5rem; letter-spacing:.1em; color:#e8c87e; font-weight:800; margin:0 0 4px; }
  .t { font-size:.66rem; letter-spacing:.2em; color:#c99cae; margin:0 0 12px; }
  .l { font-size:.95rem; color:#f2e7d5; margin:6px 0; }
  .l b { color:#e8c87e; font-variant-numeric: tabular-nums; }
  .stamp { margin-top:14px; padding-top:10px; border-top:1px dashed #4a3040; font-size:.62rem;
           letter-spacing:.08em; color:#c99cae; }
  .ink { color:#e8c87e; }
  @media (max-width:390px){ body{padding:10px} .card{padding:16px} }
  @media (prefers-reduced-motion: reduce){ *{animation:none!important;transition:none!important} }
`;function Ev(n,e){const a=n.lines.map(s=>`<p class="l">${s}</p>`).join(`
      `);return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>76 Pancakes · ${n.title}</title>
<style>
${Rv}
  .card { border-color: ${e}; }
</style>
</head>
<body>
  <section class="card" aria-label="${n.title}">
    <h1 class="h">${n.title}</h1>
    <p class="t">${n.teamName?n.teamName.toUpperCase()+" · ":""}76 PANCAKES</p>
    ${a}
    <p class="stamp">${n.stamp}</p>
  </section>
</body>
</html>
`}const _e=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function bv(n){return{stage:"draft",title:"DRAFT NIGHT",teamName:n.teamName,lines:[`I drafted the <b>${_e(n.teamName)}</b> from slot one of the board.`,`<b>${n.picks}</b> picks in the league, <b>${n.mine}</b> of them mine.`,`Best of my class: <span class="ink">${_e(n.bestPick)}</span> at <b>${n.bestWins}</b> wins.`],stamp:`seed ${n.seed} (code ${Ct(n.seed)}) · engine ${n.engine} · played by the pinned engine`}}function Lv(n){const e=n.meHome?n.hs:n.as,a=n.meHome?n.as:n.hs,s=e>a,t=n.meHome?n.away:n.home;return{stage:"week",title:`WEEK ${n.week} BRAG`,teamName:n.teamName,lines:[`${s?"I beat":e===a?"I tied":"I fell to"} the <b>${_e(bn(t))} ${_e(t)}</b> <b>${e}—${a}</b> in ${_e(n.label)}.`,s?"The board says you called it: the run continues.":"A stumble, not an ending — the season is long."],stamp:`gameSeed ${n.gs} · week ${n.week} · ${n.away} @ ${n.home} · engine ${n.engine} · played by the pinned engine`}}function Av(n){return{stage:"season",title:"THE SEASON",teamName:n.teamName,lines:[n.iChampion?`The <b>${_e(n.teamName)}</b> are Super Bowl champions. <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b>, <b>${n.pf}</b> points scored.`:`The <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b> season is in the book — <b>${n.pf}</b> points scored.`,n.champion&&!n.iChampion?`The year belongs to the <b>${_e(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Mv(n){return{stage:"bracket",title:"THE RUN",teamName:n.teamName,lines:[n.iChampion?"Wild Card. Divisional. Conference. <b>Super Bowl champions.</b>":n.madeIt?`The run ended in the <b>${_e(n.lastRound??"Wild Card")}</b>.`:"The playoffs went on without me this year.",n.champion?`The bracket crowns the <b>${_e(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Jv(n){return{stage:"awards",title:"THE AWARDS",teamName:n.teamName,lines:[`The season's Most Valuable Player: <span class="ink">${_e(n.mvp)}</span>.`,n.mvpLine?`<span class="cp-sub">${_e(n.mvpLine)}</span>`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Xi(n){const e=n.teamName?lr(n.teamName).ink:"#c39a4a";return Ev(n,e)}function _v(n){const e=Xi(n),a=new Blob([e],{type:"text/html"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`76pancakes-${n.stage}-brag.html`,document.body.appendChild(s),s.click(),s.remove()}var Fv=M('<button class="cp-navbtn"> </button>'),Wv=M('<div class="cp-sharewrap svelte-o6jlvs"><iframe class="cp-shareframe svelte-o6jlvs" title="the shareable preview"></iframe> <div class="cp-sharebtns svelte-o6jlvs"><button class="cp-stepbtn cp-cta"> </button></div></div>'),Pv=M('<p class="cp-note">Nothing to brag about yet on this stage — play it first.</p>'),Gv=M('<section class="cp-share"><h2 class="cp-h2">THE SHAREABLES</h2> <p class="cp-note">One card per stage. Each export is one self-contained HTML file — inline styles, no network, provenance stamped — that opens offline, even from the desktop.</p> <div class="cp-chipline"></div> <!></section>');function Nv(n,e){yn(e,!0);const a=[{id:"draft",label:"DRAFT"},{id:"week",label:"WEEK"},{id:"season",label:"SEASON"},{id:"bracket",label:"BRACKET"},{id:"awards",label:"AWARDS"}];let s=hn("draft"),t=on(()=>{const p=ks(),m=e.record,d=e.season.userTeamName||"";if(f(s)==="draft"){if(!m)return null;const h=m.picks.filter(v=>v.team===m.userTeam).length;return bv({teamName:d,seed:m.seed,picks:m.picks.length,mine:h,bestPick:"your best draft pick",bestWins:"—",engine:p})}if(f(s)==="week"){const h=e.season.view?.games.find(v=>v.home===e.season.userTeamName||v.away===e.season.userTeamName);return!h||h.hs===null?null:Lv({teamName:d,week:e.season.slot,label:e.season.label,home:h.home,away:h.away,hs:h.hs,as:h.as,meHome:h.home===e.season.userTeamName,gs:h.gameSeed,engine:p})}if(f(s)==="season"){if(!e.season.runState)return null;const h=Bt(e.season.runState)[e.season.userTeamName],v=h?.w??0,B=h?.l??0,C=h?.t??0,k=h?.pf??0;return Av({teamName:d,w:v,l:B,t:C,pf:k,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:p})}if(f(s)==="bracket"){if(!e.season.runState)return null;const h=e.season.runState.playoffs.filter(B=>B.home===e.season.userTeamName||B.away===e.season.userTeamName),v=h.length?h[h.length-1].round??null:null;return Mv({teamName:d,madeIt:h.length>0,lastRound:v,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:p})}return e.stats?Jv({teamName:d,mvp:e.stats.mvp,mvpLine:e.stats.mvpLine,engine:p}):null}),r=on(()=>f(t)?Xi(f(t)):null);var o=Gv(),l=g(_(o),4);cn(l,21,()=>a,p=>p.id,(p,m)=>{var d=Fv(),h=D(d,!0);H(()=>{fn(d,"aria-pressed",f(s)===f(m).id),y(h,f(m).label)}),sn("click",d,()=>nn(s,f(m).id,!0)),L(p,d)});var i=g(l,2);{var c=p=>{var m=Wv(),d=_(m),h=g(d,2),v=_(h),B=D(v);H(C=>{fn(d,"srcdoc",f(r)),y(B,`DOWNLOAD THE ${C??""} BRAG`)},[()=>f(s).toUpperCase()]),sn("click",v,()=>f(t)&&_v(f(t))),L(p,m)},u=p=>{var m=Pv();L(p,m)};tn(i,p=>{f(r)?p(c):p(u,-1)})}L(n,o),Sn()}Pn(["click"]);var Iv=M('<button class="cp-navbtn"> </button>'),Hv=M('<nav class="cp-nav" aria-label="Screens"></nav>'),Kv=M('<p class="cp-error" role="alert"> </p>'),xv=M('<p class="cp-note">Loading…</p>'),Ov=M(`<section class="cp-empty"><h1>76 Pancakes</h1> <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p> <p class="cp-note">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p> <p><a class="cp-devlink" href="?dev=1">Open the dev build →</a></p></section>`),Vv=M('<p class="cp-prov">Every number on this shell reads <b> </b> — the label travels with the numbers.</p> <!>',1),Yv=M('<p class="cp-prov">Every number on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!>',1),zv=M('<main class="cp-root svelte-1n46o8q"><header class="cp-topbar"><span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span> <span class="cp-topbtns"><!> <button class="cp-topbar-btn">Saves</button></span></header> <!> <!> <!></main>');function Qv(n,e){yn(e,!0);const a=()=>We($,"$settingsStore",m),s=()=>We(k,"$draftState",m),t=()=>We(V,"$seasonStats",m),r=()=>We(N,"$season",m),o=()=>We(h,"$boot",m),l=()=>We(T,"$vmStore",m),i=()=>We(P,"$openNow",m),c=()=>We(J,"$oddsMeta",m),u=()=>We(F,"$needsSel",m),p=()=>We(S,"$advice",m),[m,d]=u0(),h=fa({phase:"loading"}),v=new URLSearchParams(location.search).has("dev"),B=v?lu(so,v0,g0):[];let C=jd(B),k=Ud(C),w="wins";const T=fa(null),S=fa([]),J=fa(null),P=fa([]),F=fa([]);let b=hn(0),A=hn(777),O=on(()=>Ct(f(A))),z=hn(null),Q=hn("team"),x=hn(""),X=hn(null),an=hn("sha256:pending"),en=hn(""),j=hn("");const $=Zd(),N=qd(),V=fa(null);let q=null;const E="67-cakepanz@d3bd81d2";function W(R){vp(R.mode),xo(R.teamName,R.mode),typeof document<"u"&&document.body.classList.toggle("cp-reduced",R.reducedMotion||Kd()),Hd(R)}function Y(R){const K={...a(),mode:R};W(K),$.set(K)}function I(R){const K={...a(),reducedMotion:R};W(K),$.set(K)}function U(R){const K={...a(),newestFirst:R};W(K),$.set(K)}function ln(R,K){const rn={...a(),teamName:R,draftSlot:K};W(rn),$.set(rn)}function Z(R,K){R==="board"&&C.getState().status==="done"&&(R="complete"),nn(Q,R,!0),Qd(R,K)}function dn(){const R=zd();R&&Z(R.screen,R.param)}function kn(){if(!v){h.set({phase:"empty"});return}h.set({phase:"ready",players:B}),window.__cp={store:C,refresh:jn,valuation:re,seasonFacade:En,go:Z,vmStore:T},bd(so).then(R=>nn(an,"sha256:"+R)),ie(),Z("team"),es()}function Dn(){return No(new URLSearchParams(location.search).get("seed")||"")??ep()}let Qn=hn(!1);function ie(){nn(Qn,new URLSearchParams(location.search).has("seed"),!0)}function An(){try{const R=new URL(location.href);R.searchParams.delete("seed"),history.replaceState(null,"",R.toString())}catch{}nn(Qn,!1)}function Fn(R,K){nn(A,Dn(),!0),Io(f(A)),ie(),nn(b,R,!0),nn(z,K,!0),ln(gn[R].name,K),C.dispatch({type:"START",seed:f(A),userTeam:f(b),...K!==null&&K-1!==f(b)?{pickSlot:K}:{}}),Z("board"),re.lock(),q=null,V.set(null),jn(),jo(),ae()}function jn(){const R=C.getState();if(R.error&&nn(x,R.error,!0),!R.draft||R.status==="idle"){T.set(null),J.set(null),P.set([]);return}if(P.set(Ms(R.draft.rosters[f(b)])),R.status==="done")J.set(null);else try{const K=pu(R.draft,f(b),Ye(f(A)*7+13),30);T.set(Bu(R.draft,f(b),K,{sort:w})),J.set({picksBetween:K.picksBetween,sims:K.sims})}catch{}try{const K=Object.values(R.draft.rosters[f(b)]).filter(Boolean),rn=Er(K,"4-3");S.set(rn.placements.map(vn=>({label:vn.slot?.label??vn.slot?.slot??"?",name:vn.player?.name??"(empty)",ovr:vn.player?String(vn.effOvr??vn.player.ovr):"-"})))}catch{S.set([])}}function Mn(R,K){C.dispatch({type:"PICK",playerId:R,slot:K}),jn(),ae(),C.getState().status==="done"&&Z("complete")}function ne(){C.dispatch({type:"UNDO"}),jn(),ae()}function ee(R){w=R,jn()}function me(R){F.update(K=>K.includes(R)?K.filter(rn=>rn!==R):[...K,R])}function ke(){F.set([])}const On=()=>C.getState().record,ce=()=>({engineVersion:E,dataVersion:f(an),saveId:f(en)||nn(en,crypto?.randomUUID?.()??"save-"+f(A)+"-"+Date.now(),!0),saveRevision:1+(C.getState().record?.picks.length??0),createdAt:f(j)||nn(j,new Date().toISOString(),!0)});function ve(R,K,rn={}){const vn=R;if(!vn){nn(x,"load: empty record");return}nn(A,vn.seed,!0),nn(b,vn.userTeam,!0),Io(vn.seed),ie(),nn(en,K?.saveId||(crypto?.randomUUID?.()??"save-"+vn.seed),!0),nn(j,K?.createdAt||new Date().toISOString(),!0),C.dispatch({type:"LOAD",record:R}),re.lock(),Z("board"),jn(),rn.keepWeek||jo(),ae()}async function ae(){const R=On();if(!R)return;const K=await Rp(R,ce(),new Date);K&&nn(x,K,!0)}async function fe(){if(!En.snapshot().state)return;const K=await Ep(En.weekPayload(),ce(),new Date);K&&nn(x,K,!0)}async function es(){const R=await bp();if(!R.ok){nn(x,"the autosave was refused: "+R.message);return}if(f(Qn)&&R.draft){const K=No(new URLSearchParams(location.search).get("seed")||""),rn=R.draft.record?.seed;if(K!==null&&rn!==void 0&&K!==rn)return}if(R.draft&&ve(R.draft.record,R.draft.lineage,{keepWeek:!!R.week}),R.week){const K=Go(R.week.env.payload);if(!K.ok){nn(x,"the season autosave was refused: "+K.message);return}En.resume(K.value.state,K.value.teams,K.value.userTeamName,K.value.roster),Z("hub")}}function Gn(){const R=C.getState().record;if(!R||C.getState().status!=="done"){nn(x,"the season needs a finished draft");return}const K=lt(R)[f(b)].map(rn=>({id:rn.id,name:rn.name,pos:rn.pos,role:rn.role,team:rn.team,ovr:rn.ovr,spd:rn.spd,str:rn.str,freeAgent:!!rn.freeAgent}));En.begin(dp(R),f(A),2027,gn[f(b)].name,K),q=new Vo,V.set(q.ss),Z("hub"),fe()}function Zn(){q||(q=new Vo);const R=En.step();if(!R){nn(x,"no season is running");return}const K=C.getState().record;K&&q.addWeek(R.games.map(vn=>({home:vn.home,away:vn.away,round:vn.round,result:vn.result})),lt(K)),V.set(q.ss);const rn=R.games.find(vn=>vn.home===En.userTeamName||vn.away===En.userTeamName);rn?(nn(X,Ui(rn.result,rn.home,rn.away,{week:R.week,year:2027,gs:rn.gs,userTeamName:En.userTeamName}),!0),Z("feed")):Z("week",R.week),En.finished&&$i(),fe()}async function se(){const R=await wp("C");if(!R.ok){nn(x,"restore refused: "+R.message);return}const K=Go(R.env.payload);if(!K.ok){nn(x,"restore refused: "+K.message);return}En.resume(K.value.state,K.value.teams,K.value.userTeamName,K.value.roster),q=null,V.set(null),Z("hub"),fe()}function Ta(){const R=En.snapshot();if(!R.state||!R.teams)return;const K=mp(R.state,R.teams,R.userTeamName,En.slot);K&&(nn(X,K,!0),Z("feed"))}async function as(){if(!En.snapshot().state){nn(x,"no season to save");return}const K=En.weekPayload(),rn=await Tp("C",K,ce(),new Date);nn(x,rn?"save refused: "+rn:"",!0),fe()}function $i(){const R=En.snapshot();if(!R.state)return;const K=Id(R.state,R.userTeamName,En.userRoster);yp("C",K,ce(),new Date)}Ts(()=>{}),p0(()=>{re.subscribe(()=>jn()),window.addEventListener("hashchange",dn);const R=Vi();return W(R),$.set(R),R.teamName&&xo(R.teamName,R.mode),kn(),()=>window.removeEventListener("hashchange",dn)});const nc=[{id:"team",label:"TEAM",show:!0},{id:"board",label:"DRAFT",show:!0},{id:"cards",label:"CARDS",show:!0},{id:"hub",label:"SEASON",show:!0},{id:"week",label:"WEEK",show:!0},{id:"standings",label:"STANDINGS",show:!0},{id:"bracket",label:"PLAYOFFS",show:!0},{id:"awards",label:"AWARDS",show:!0},{id:"review",label:"REVIEW",show:!0},{id:"stats",label:"STATS",show:!0},{id:"book",label:"BOOK",show:!0},{id:"share",label:"SHARE",show:!0},{id:"guide",label:"GUIDE",show:!0},{id:"settings",label:"SETTINGS",show:!0}],_s=on(()=>s()?.record??null),Gr=on(()=>{const R=En.runState;return R?Bt(R):null}),ec=on(()=>{const R=t();if(!R)return null;const K=Object.values(R.players);if(!K.length)return null;const rn=K.slice().sort((vn,De)=>(De.stats.pyd??0)+(De.stats.rtd??0)-((vn.stats.pyd??0)+(vn.stats.rtd??0)))[0];return{mvp:rn.name,mvpLine:rn.label}}),ac=on(()=>r().ready);var Tt=zv(),Nr=_(Tt),sc=g(_(Nr),2),Ir=_(sc);$p(Ir,{});var Hr=g(Ir,2),Kr=g(Nr,2);{var tc=R=>{var K=Hv();cn(K,21,()=>nc.filter(rn=>rn.show),rn=>rn.id,(rn,vn)=>{var De=Iv(),ya=D(De,!0);H(()=>{fn(De,"aria-current",f(Q)===f(vn).id),y(ya,f(vn).label)}),sn("click",De,()=>Z(f(vn).id)),L(rn,De)}),L(R,K)};tn(Kr,R=>{o().phase==="ready"&&R(tc)})}var xr=g(Kr,2);{var rc=R=>{var K=Kv(),rn=D(K,!0);H(()=>y(rn,f(x))),L(R,K)};tn(xr,R=>{f(x)&&R(rc)})}var oc=g(xr,2);{var lc=R=>{var K=xv();L(R,K)},ic=R=>{var K=Ov();L(R,K)},cc=R=>{var K=Vv(),rn=Bn(K),vn=g(_(rn)),De=D(vn,!0),ya=g(rn,2);Dh(ya,{onstart:Fn,get seedPinned(){return f(Qn)},onnewseed:An}),H(yt=>y(De,yt),[()=>Je[re.get().mode]]),L(R,K)},fc=R=>{var K=Yv(),rn=Bn(K),vn=g(_(rn)),De=D(vn,!0),ya=g(rn,2);{let St=on(()=>(s()?.record?.picks?.length??0)>0),Ec=on(()=>s()?.status==="done");qo(ya,{get vm(){return l()},onpick:Mn,onundo:ne,onsort:ee,get canUndo(){return f(St)},get openSlots(){return i()},get oddsMeta(){return c()},get needsSelected(){return u()},onneedtoggle:me,onneedclear:ke,onplay:()=>Z("complete"),get draftDone(){return f(Ec)},get seedCode(){return f(O)}})}var yt=g(ya,2);Zi(yt,{get slots(){return p()}}),H(St=>y(De,St),[()=>Je[re.get().mode]]),L(R,K)},uc=R=>{Ph(R,{get record(){return f(_s)},get requestedSlot(){return f(z)},onseason:Gn,oncards:()=>Z("cards"),onbook:()=>Z("book")})},dc=R=>{jh(R,{get season(){return r()},onplayweek:Zn,onweek:K=>{En.go(K),Z("week",K)},onstandings:()=>Z("standings"),onbracket:()=>Z("bracket"),onrestore:se,canRestore:!0,onbook:()=>Z("book")})},pc=R=>{sm(R,{get season(){return r()},onplay:Zn,onfeed:Ta,onsave:as})},hc=R=>{fm(R,{get season(){return r()},onbracket:()=>Z("bracket")})},mc=R=>{bm(R,{get season(){return r()},onreview:()=>Z("review")})},vc=R=>{Hm(R,{get season(){return r()},get draftRecord(){return f(_s)},onreview:()=>Z("review"),onfeed:Ta})},gc=R=>{qm(R,{get stats(){return t()},get table(){return f(Gr)}})},Bc=R=>{tv(R,{get season(){return r()},onbracket:()=>Z("bracket"),onbook:()=>Z("book"),onawards:()=>Z("awards")})},Cc=R=>{ov(R,{})},Tc=R=>{hv(R,{get vm(){return l()}})},yc=R=>{{let K=on(()=>En.snapshot().teams);kv(R,{get stats(){return t()},get table(){return f(Gr)},get teams(){return f(K)}})}},Sc=R=>{wv(R,{get settings(){return a()},onmode:Y,onmotion:I,onorder:U,onsaves:()=>Z("saves"),onresetsave:()=>ln(a().teamName,a().draftSlot)})},kc=R=>{{let K=on(On),rn=on(ce);dh(R,{get record(){return f(K)},get meta(){return f(rn)},get userTeamIndex(){return f(b)},onclose:()=>Z("board"),onloaddraft:ve})}},Dc=R=>{Nv(R,{get record(){return f(_s)},get stats(){return f(ec)},get season(){return r()}})},wc=R=>{Ah(R,{get feed(){return f(X)},onclose:()=>{Z(f(ac)?"week":"board"),nn(X,null)}})},Rc=R=>{qo(R,{get vm(){return l()},onpick:Mn,onundo:ne,onsort:ee,canUndo:!1})};tn(oc,R=>{o().phase==="loading"?R(lc):o().phase==="empty"?R(ic,1):f(Q)==="team"?R(cc,2):f(Q)==="board"&&l()?R(fc,3):f(Q)==="complete"&&f(_s)?R(uc,4):f(Q)==="hub"?R(dc,5):f(Q)==="week"?R(pc,6):f(Q)==="standings"?R(hc,7):f(Q)==="bracket"?R(mc,8):f(Q)==="book"?R(vc,9):f(Q)==="awards"?R(gc,10):f(Q)==="review"?R(Bc,11):f(Q)==="guide"?R(Cc,12):f(Q)==="cards"?R(Tc,13):f(Q)==="stats"?R(yc,14):f(Q)==="settings"?R(Sc,15):f(Q)==="saves"?R(kc,16):f(Q)==="share"?R(Dc,17):f(Q)==="feed"&&f(X)?R(wc,18):l()&&R(Rc,19)})}H(()=>{fn(Tt,"data-screen",f(Q)),fn(Hr,"aria-pressed",f(Q)==="saves")}),sn("click",Hr,()=>Z("saves")),L(n,Tt),Sn(),d()}Pn(["click"]);zf(Qv,{target:document.getElementById("app")});
