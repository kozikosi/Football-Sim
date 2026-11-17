(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const Ao=!1;var Us=Array.isArray,zi=Array.prototype.indexOf,ps=Array.prototype.includes,qs=Array.from,Kt=Object.defineProperty,Wa=Object.getOwnPropertyDescriptor,Jo=Object.getOwnPropertyDescriptors,Qi=Object.prototype,ji=Array.prototype,xt=Object.getPrototypeOf,Sr=Object.isExtensible;const ma=()=>{};function Ui(n){return n()}function Bt(n){for(var e=0;e<n.length;e++)n[e]()}function Mo(){var n,e,a=new Promise((s,t)=>{n=s,e=t});return{promise:a,resolve:n,reject:e}}function qi(n,e){if(Array.isArray(n))return n;if(!(Symbol.iterator in n))return Array.from(n);const a=[];for(const s of n)if(a.push(s),a.length===e)break;return a}const jn=2,Pa=4,Ts=8,Fo=1<<24,ye=16,Ee=32,ta=64,Ct=128,Ot=256,we=512,Hn=1024,Sn=2048,ie=4096,Zn=8192,zn=16384,Ya=32768,hs=1<<25,Na=65536,Ps=1<<17,Zi=1<<18,za=1<<19,Wo=1<<20,Ge=1<<25,Ns=1<<21,_a=1<<22,sa=1<<23,ze=Symbol("$state"),_o=Symbol("component"),Xi=Symbol("legacy props"),$i=Symbol(""),Go=Symbol("attributes"),Tt=Symbol("class"),yt=Symbol("style"),St=Symbol("text"),ys=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"},nc=1,ec=2,Po=4,ac=8,sc=16,tc=1,rc=2,oc=4,lc=8,ic=16,cc=1,fc=2,No={},Nn=Symbol("uninitialized"),uc="http://www.w3.org/1999/xhtml";function dc(){console.warn("https://svelte.dev/e/derived_inert")}function pc(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function hc(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Io(n){return n===this.v}function Ho(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function Ko(n){return!Ho(n,this.v)}function mc(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function vc(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function gc(n,e,a){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Bc(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Cc(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Tc(n){throw new Error("https://svelte.dev/e/effect_orphan")}function yc(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Sc(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function kc(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Dc(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function wc(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Rc(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let Qa=!1,Ec=!1;function Lc(){Qa=!0}let Rn=null;function Ia(n){Rn=n}function kn(n,e=!1,a){Rn={p:Rn,i:!1,c:null,e:null,s:n,x:null,r:un,l:Qa&&!e?{s:null,u:null,$:[]}:null}}function Dn(n){var e=Rn,a=e.e;if(a!==null){e.e=null;for(var s of a)tl(s)}return e.i=!0,Rn=e.p,Vt(n)}function Vt(n={}){return Kt(n,_o,{value:!0}),n}function Ss(){return!Qa||Rn!==null&&Rn.l===null}let La=[];function bc(){var n=La;La=[],Bt(n)}function ea(n){if(La.length===0){var e=La;queueMicrotask(()=>{e===La&&bc()})}La.push(n)}const Ac=-7169;function Jn(n,e){n.f=n.f&Ac|e}function Yt(n){(n.f&we)!==0||n.deps===null?Jn(n,Hn):Jn(n,ie)}function xo(n,e){(n.f&Sn)!==0?e.set(n,Sn):(n.f&ie)!==0&&e.get(n)!==Sn&&e.set(n,ie),Jn(n,Hn)}function Zs(n){var e=fn,a=un;me(null),Ke(null);try{return n()}finally{me(e),Ke(a)}}function Jc(n,e,a,s){const t=Ss()?Ha:zt;var r=n.filter(d=>!d.settled),o=e.map(t);if(a.length===0&&r.length===0){s(o);return}var l=un,i=Mc(),c=r.length===1?r[0].promise:r.length>1?Promise.all(r.map(d=>d.promise)):null;function u(d){if((l.f&zn)===0){i();try{s([...o,...d])}catch(p){_e(p,l)}Is()}}var h=Oo();if(a.length===0){c.then(()=>u([])).finally(h);return}function m(){Promise.all(a.map(d=>Fc(d))).then(u).catch(d=>_e(d,l)).finally(h)}c?c.then(()=>{if((l.f&zn)!==0){h();return}i(),m(),Is()}):m()}function Mc(){var n=un,e=fn,a=Rn,s=dn;return function(r=!0){Ke(n),me(e),Ia(a),r&&(n.f&zn)===0&&(s?.activate(),s?.apply())}}function Is(n=!0){Ke(null),me(null),Ia(null),n&&dn?.deactivate()}function Oo(){var n=un,e=n.b,a=dn,s=!!e?.is_rendered();return e?.update_pending_count(1,a),a.increment(s,n),()=>{e?.update_pending_count(-1,a),a.decrement(s,n)}}function Ha(n){var e=jn|Sn;return un!==null&&(un.f|=za),{ctx:Rn,deps:null,effects:null,equals:Io,f:e,fn:n,reactions:null,rv:0,v:Nn,wv:0,parent:un,ac:null}}const ns=Symbol("obsolete");function Fc(n,e,a){let s=un;s===null&&vc();var t=void 0,r=Ba(Nn),o=!fn,l=new Set;return Qc(()=>{var i=un,c=Mo();t=c.promise;try{Promise.resolve(n()).then(c.resolve,d=>{d!==ys&&c.reject(d)}).finally(Is)}catch(d){c.reject(d),Is()}var u=dn;if(o){if((i.f&Ya)!==0)var h=Oo();if(s.b?.is_rendered())u.async_deriveds.get(i)?.reject(ns);else for(const d of l.values())d.reject(ns);l.add(c),u.async_deriveds.set(i,c)}const m=(d,p=void 0)=>{h?.(),l.delete(c),p!==ns&&(u.activate(),p?(r.f|=sa,Ka(r,p)):((r.f&sa)!==0&&(r.f^=sa),Ka(r,d)),u.deactivate())};c.promise.then(m,d=>m(null,d||"unknown"))}),Zt(()=>{for(const i of l)i.reject(ns)}),new Promise(i=>{function c(u){function h(){u===t?i(r):c(t)}u.then(h,h)}c(t)})}function ln(n){const e=Ha(n);return fl(e),e}function zt(n){const e=Ha(n);return e.equals=Ko,e}function Wc(n){var e=n.effects;if(e!==null){n.effects=null;for(var a=0;a<e.length;a+=1)te(e[a])}}function Qt(n){var e,a=un,s=n.parent;if(!je&&s!==null&&n.v!==Nn&&(s.f&(zn|Zn))!==0)return dc(),n.v;Ke(s);try{Wc(n),e=hl(n)}finally{Ke(a)}return e}function Vo(n){var e=Qt(n);if(!n.equals(e)&&(n.wv=dl(),(!dn?.is_fork||n.deps===null)&&(dn!==null?(dn.capture(n,e,!0),kt?.capture(n,e,!0)):n.v=e,n.deps===null))){Jn(n,Hn);return}je||(Se!==null?(qt()||dn?.is_fork)&&Se.set(n,e):Yt(n))}function _c(n){if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&(e.teardown?.(),e.ac!==null&&Zs(()=>{e.ac.abort(ys),e.ac=null}),e.fn!==null&&(e.teardown=ma),gs(e,0),$t(e))}function Yo(n){if(n.effects!==null)for(const e of n.effects)e.teardown&&e.fn!==null&&xa(e)}let rt=null,Sa=null,dn=null,kt=null,Se=null,Dt=null,ot=!1,os=null,Ws=null;var kr=0;let Gc=1;class ra{id=Gc++;started=!1;linked=!0;prev=null;next=null;async_deriveds=new Map;current=new Map;previous=new Map;#e=new Set;#i=new Set;#n=0;#o=new Map;#a=null;#s=[];#r=[];#t=new Map;#l=new Map;#p=new Set;is_fork=!1;#c=!1;constructor(){Sa===null?rt=Sa=this:(Sa.next=this,this.prev=Sa),Sa=this}#h(){if(this.is_fork)return!0;for(const e of this.#o.keys())if(!this.#g(e))return!0;return!1}#g(e){for(var a=e;a!==null;a=a.parent)if(this.#l.has(a))return!0;return!1}skip_effect(e){this.#l.has(e)||this.#l.set(e,{d:[],m:[]}),this.#p.delete(e)}unskip_effect(e,a=s=>this.schedule(s)){var s=this.#l.get(e);if(s){this.#l.delete(e);for(var t of s.d)Jn(t,Sn),a(t);for(t of s.m)Jn(t,ie),a(t)}this.#p.add(e)}#f(){var e=[];for(const r of this.#s)if(!((r.f&zn)!==0||(r.f&(Sn|ie))===0)){for(var a=r,s=!1;a.parent!==null;){a=a.parent;var t=a.f;if((t&(ta|Ee))!==0){if((t&Hn)===0){s=!0;break}a.f^=Hn}}s||e.push(a)}return this.#s=[],e}#m(){this.started=!0;for(const[l,i]of this.#t)Jn(l,i),this.schedule(l);this.apply();for(var e=os=[],a=[],s=Ws=[];this.#s.length>0;){kr++>1e3&&(this.#d(),Pc());for(const l of this.#f())try{this.#C(l,e,a)}catch(i){throw jo(l),this.#h()||this.discard(),i}}if(dn=null,s.length>0){var t=ra.ensure();for(const l of s)t.schedule(l)}if(os=null,Ws=null,this.#h()){this.#v(a),this.#v(e);for(const[l,i]of this.#l)Qo(l,i);s.length>0&&dn.#m();return}const r=this.#S();if(r){this.#v(a),this.#v(e),r.#u(this);return}this.#t.clear();for(const l of this.#e)l(this);this.#e.clear(),kt=this,Dr(a),Dr(e),kt=null,this.#a?.resolve();var o=dn;this.#n===0&&(this.#s.length===0||o!==null)&&this.#d(),o!==null&&(Ne.clear(),o.#m())}#C(e,a,s){e.f^=Hn;for(var t=e.first;t!==null;){var r=t.f,o=(r&(Ee|ta))!==0,l=o&&(r&Hn)!==0,i=l||(r&Zn)!==0||this.#l.has(t);if(!i&&t.fn!==null){o?t.f^=Hn:(r&Pa)!==0?a.push(t):Ds(t)&&((r&ye)!==0&&this.add_dirty_reaction(t,ie),xa(t));var c=t.first;if(c!==null){t=c;continue}}for(;t!==null;){var u=t.next;if(u!==null){t=u;break}t=t.parent}}}#S(){for(var e=this.prev;e!==null;e=e.prev)if(!e.is_fork&&this.#B(e))return e;return null}#B(e){for(const[a,[,s]]of this.current)if(!s&&e.current.has(a))return!0;return!1}#u(e){for(const[s,t]of e.current)!this.previous.has(s)&&e.previous.has(s)&&this.previous.set(s,e.previous.get(s)),this.current.set(s,t);for(const[s,t]of e.async_deriveds){const r=this.async_deriveds.get(s);r&&t.promise.then(r.resolve).catch(r.reject)}e.async_deriveds.clear(),this.transfer_reactions(e.#t);const a=s=>{var t=s.reactions;if(t!==null&&!((s.f&jn)!==0&&(s.f&(Sn|ie))===0))for(const l of t){var r=l.f;if((r&jn)!==0)a(l);else{var o=l;r&(_a|ye)&&!this.async_deriveds.has(o)&&(this.#t.delete(o),Jn(o,Sn),this.schedule(o))}}};for(const s of this.current.keys())a(s);this.oncommit(()=>e.discard()),e.#d(),dn=this,this.#m()}#v(e){for(var a=0;a<e.length;a+=1)xo(e[a],this.#t)}capture(e,a,s=!1){e.v!==Nn&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&sa)===0&&(this.current.set(e,[a,s]),Se?.set(e,a)),this.is_fork||(e.v=a)}activate(){dn=this}deactivate(){dn=null,Se=null}flush(){try{ot=!0,dn=this,this.#m()}finally{kr=0,Dt=null,os=null,Ws=null,ot=!1,dn=null,Se=null,Ne.clear()}}discard(){for(const e of this.#i)e(this);this.#i.clear();for(const e of this.async_deriveds.values())e.reject(ns);this.#d(),this.#a?.resolve()}register_created_effect(e){this.#r.push(e)}#T(){for(let h=rt;h!==null;h=h.next){var e=h.id<this.id,a=[];for(const[m,[d,p]]of this.current){if(h.current.has(m)){var s=h.current.get(m)[0];if(e&&d!==s)h.current.set(m,[d,p]);else continue}a.push(m)}if(e)for(const[m,d]of this.async_deriveds){const p=h.async_deriveds.get(m);p&&d.promise.then(p.resolve).catch(p.reject)}var t=[...h.current.keys()].filter(m=>!h.current.get(m)[1]);if(!(!h.started||t.length===0)){var r=t.filter(m=>!this.current.has(m));if(r.length===0)e&&h.discard();else if(a.length>0){if(e)for(const m of this.#p)h.unskip_effect(m,d=>{(d.f&(ye|_a))!==0?h.schedule(d):h.#v([d])});h.activate();var o=new Set,l=new Map;for(var i of a)zo(i,r,o,l);l=new Map;var c=[...h.current].filter(([m,d])=>{const p=this.current.get(m);return p?p[0]!==d[0]||p[1]!==d[1]:!0}).map(([m])=>m);if(c.length>0)for(const m of this.#r)(m.f&(zn|Zn|Ps))===0&&jt(m,c,l)&&((m.f&(_a|ye))!==0?(Jn(m,Sn),h.schedule(m)):h.add_dirty_reaction(m,Sn));if(h.#s.length>0&&!h.#c){h.apply();for(var u of h.#f())h.#C(u,[],[])}h.deactivate()}}}}increment(e,a){if(this.#n+=1,e){let s=this.#o.get(a)??0;this.#o.set(a,s+1)}}decrement(e,a){if(this.#n-=1,e){let s=this.#o.get(a)??0;s===1?this.#o.delete(a):this.#o.set(a,s-1)}this.#c||(this.#c=!0,ea(()=>{this.#c=!1,this.linked&&this.flush()}))}transfer_reactions(e){for(const[a,s]of e)this.add_dirty_reaction(a,s);e.clear()}add_dirty_reaction(e,a){(a===Sn||this.#t.get(e)!==Sn)&&this.#t.set(e,a)}oncommit(e){this.#e.add(e)}ondiscard(e){this.#i.add(e)}settled(){return(this.#a??=Mo()).promise}static ensure(){if(dn===null){const e=dn=new ra;ot||ea(()=>{e.started||e.flush()})}return dn}apply(){{Se=null;return}}schedule(e){if(Dt=e,e.b?.is_pending&&(e.f&(Pa|Ts|Fo))!==0&&(e.f&Ya)===0){e.b.defer_effect(e);return}this.#s.push(e)}#d(){if(this.linked){var e=this.prev,a=this.next;e===null?rt=a:e.next=a,a===null?Sa=e:a.prev=e,this.linked=!1}}}function Pc(){try{yc()}catch(n){_e(n,Dt)}}let Ye=null;function Dr(n){var e=n.length;if(e!==0){for(var a=0;a<e;){var s=n[a++];if((s.f&(zn|Zn))===0&&Ds(s)&&(Ye=new Set,xa(s),s.deps===null&&s.first===null&&s.nodes===null&&s.teardown===null&&s.ac===null&&ll(s),Ye?.size>0)){Ne.clear();for(const t of Ye){if((t.f&(zn|Zn))!==0)continue;const r=[t];let o=t.parent;for(;o!==null;)Ye.has(o)&&(Ye.delete(o),r.push(o)),o=o.parent;for(let l=r.length-1;l>=0;l--){const i=r[l];(i.f&(zn|Zn))===0&&xa(i)}}Ye.clear()}}Ye=null}}function zo(n,e,a,s){if(!a.has(n)&&(a.add(n),n.reactions!==null))for(const t of n.reactions){const r=t.f;(r&jn)!==0?zo(t,e,a,s):(r&(_a|ye))!==0&&(r&Sn)===0&&jt(t,e,s)&&(Jn(t,Sn),Ut(t))}}function jt(n,e,a){const s=a.get(n);if(s!==void 0)return s;if(n.deps!==null)for(const t of n.deps){if(ps.call(e,t))return!0;if((t.f&jn)!==0&&jt(t,e,a))return a.set(t,!0),!0}return a.set(n,!1),!1}function Ut(n){dn.schedule(n)}function Qo(n,e){if(!((n.f&Ee)!==0&&(n.f&Hn)!==0)){(n.f&Sn)!==0?e.d.push(n):(n.f&ie)!==0&&e.m.push(n),Jn(n,Hn);for(var a=n.first;a!==null;)Qo(a,e),a=a.next}}function jo(n){Jn(n,Hn);for(var e=n.first;e!==null;)jo(e),e=e.next}let Hs=new Set;const Ne=new Map;let Uo=!1;function Ba(n,e){var a={f:0,v:n,reactions:null,equals:Io,rv:0,wv:0};return a}function vn(n,e){const a=Ba(n);return fl(a),a}function qo(n,e=!1,a=!0){const s=Ba(n);return e||(s.equals=Ko),Qa&&a&&Rn!==null&&Rn.l!==null&&(Rn.l.s??=[]).push(s),s}function an(n,e,a=!1){fn!==null&&(!ke||(fn.f&Ps)!==0)&&Ss()&&(fn.f&(jn|ye|_a|Ps))!==0&&(Ie===null||!Ie.has(n))&&wc();let s=a?aa(e):e;return Ka(n,s,Ws)}var ua=null,wt=0;function Ka(n,e,a=null){if(!n.equals(e)){je?Ne.set(n,e):Ne.has(n)||Ne.set(n,n.v);var s=ra.ensure();if(s.capture(n,e),(n.f&jn)!==0){const t=n;(n.f&Sn)!==0&&Qt(t),Se===null&&Yt(t)}n.wv=dl(),ua=null,wt=0,Zo(n,Sn,a),ua=null,Ss()&&un!==null&&(un.f&Hn)!==0&&(un.f&(Ee|ta))===0&&(pe===null?qc([n]):pe.push(n)),!s.is_fork&&Hs.size>0&&!Uo&&Nc()}return e}function Nc(){Uo=!1;for(const n of Hs){(n.f&Hn)!==0&&Jn(n,ie);let e;try{e=Ds(n)}catch{e=!0}e&&xa(n)}Hs.clear()}function ls(n){an(n,n.v+1)}function Zo(n,e,a){var s=n.reactions;if(s!==null){var t=Ss(),r=s.length;if(wt+=r,wt>1e5&&ua===null&&(ua=new Set),ua!==null){if(ua.has(n))return;ua.add(n)}for(var o=0;o<r;o++){var l=s[o],i=l.f;if(!(!t&&l===un)){var c=(i&Sn)===0;if(c&&Jn(l,e),(i&Ps)!==0)Hs.add(l);else if((i&jn)!==0){var u=l;Se?.delete(u),Zo(u,ie,a)}else if(c){var h=l;(i&ye)!==0&&Ye!==null&&Ye.add(h),a!==null?a.push(h):Ut(h)}}}}}function aa(n){if(typeof n!="object"||n===null||ze in n||_o in n)return n;const e=xt(n);if(e!==Qi&&e!==ji)return n;var a=new Map,s=Us(n),t=vn(0),r=ga,o=l=>{if(ga===r)return l();var i=fn,c=ga;me(null),Lr(r);var u=l();return me(i),Lr(c),u};return s&&a.set("length",vn(n.length)),new Proxy(n,{defineProperty(l,i,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&kc();var u=a.get(i);return u===void 0?o(()=>{var h=vn(c.value);return a.set(i,h),h}):an(u,c.value,!0),!0},deleteProperty(l,i){var c=a.get(i);if(c===void 0){if(i in l){const u=o(()=>vn(Nn));a.set(i,u),ls(t)}}else an(c,Nn),ls(t);return!0},get(l,i,c){if(i===ze)return n;var u=a.get(i),h=i in l;if(u===void 0&&(!h||Wa(l,i)?.writable)&&(u=o(()=>{var d=aa(h?l[i]:Nn),p=vn(d);return p}),a.set(i,u)),u!==void 0){var m=f(u);return m===Nn?void 0:m}return Reflect.get(l,i,c)},getOwnPropertyDescriptor(l,i){this.has?.(l,i);var c=Reflect.getOwnPropertyDescriptor(l,i),u=a.get(i);if(u!==void 0){var h=f(u);if(h===Nn)return;if(c&&"value"in c)c.value=h;else return{enumerable:!0,configurable:!0,value:h,writable:!0}}return c},has(l,i){if(i===ze)return!0;var c=a.get(i),u=c!==void 0&&c.v!==Nn||Reflect.has(l,i);if(c!==void 0||(un!==null||fn!==null)&&(!u||Wa(l,i)?.writable)){c===void 0&&(c=o(()=>{var m=u?aa(l[i]):Nn,d=vn(m);return d}),a.set(i,c));var h=f(c);if(h===Nn)return!1}return u},set(l,i,c,u){var h=a.get(i),m=i in l;if(s&&i==="length")for(var d=c;d<h.v;d+=1){var p=a.get(d+"");p!==void 0?an(p,Nn):d in l&&(p=o(()=>vn(Nn)),a.set(d+"",p))}if(h===void 0)(!m||Wa(l,i)?.writable)&&(h=o(()=>vn(void 0)),an(h,aa(c)),a.set(i,h));else{m=h.v!==Nn;var v=o(()=>aa(c));an(h,v)}var g=Reflect.getOwnPropertyDescriptor(l,i);if(g?.set&&g.set.call(u,c),!m){if(s&&typeof i=="string"){var C=a.get("length"),T=Number(i);Number.isInteger(T)&&T>=C.v&&an(C,T+1)}ls(t)}return!0},ownKeys(l){f(t);var i=Reflect.ownKeys(l).filter(h=>{var m=a.get(h);return m===void 0||m.v!==Nn});for(var[c,u]of a)u.v!==Nn&&!(c in l)&&i.push(c);return i},setPrototypeOf(){Dc()}})}function wr(n){try{if(n!==null&&typeof n=="object"&&ze in n)return n[ze]}catch{}return n}function Xo(n,e){return Object.is(wr(n),wr(e))}var Rr,$o,nl,el;function Ic(){if(Rr===void 0){Rr=window,$o=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,a=Text.prototype;nl=Wa(e,"firstChild").get,el=Wa(e,"nextSibling").get,Sr(n)&&(n[Tt]=void 0,n[Go]=null,n[yt]=void 0,n.__e=void 0),Sr(a)&&(a[St]=void 0)}}function Qe(n=""){return document.createTextNode(n)}function ms(n){return nl.call(n)}function ks(n){return el.call(n)}function W(n,e){return ms(n)}function gn(n,e=!1){{var a=ms(n);return a instanceof Comment&&a.data===""?ks(a):a}}function D(n,e=!1){return ms(n)}function B(n,e=1,a=!1){let s=n;for(;e--;)s=ks(s);return s}function Hc(n){n.textContent=""}function al(){return!1}function Kc(n,e,a){return a?document.createElement(n,{is:a}):document.createElement(n)}function xc(n){var e=un;if(e===null)return fn.f|=sa,n;if((e.f&Ya)===0&&(e.f&Pa)===0)throw n;_e(n,e)}function _e(n,e){if(n===No)throw n;if(!(e!==null&&(e.f&zn)!==0)){for(;e!==null;){if((e.f&Ct)!==0&&(e.f&(zn|hs))===0){if((e.f&Ya)===0)throw n;try{e.b.error(n);return}catch(a){n=a}}e=e.parent}throw n}}function sl(n){un===null&&(fn===null&&Tc(),Cc()),je&&Bc()}function Oc(n,e){var a=e.last;a===null?e.last=e.first=n:(a.next=n,n.prev=a,e.last=n)}function Oe(n,e){var a=un;a!==null&&(a.f&Zn)!==0&&(n|=Zn);var s={ctx:Rn,deps:null,nodes:null,f:n|Sn|we,first:null,fn:e,last:null,next:null,parent:a,b:a&&a.b,prev:null,teardown:null,wv:0,ac:null};dn?.register_created_effect(s);var t=s;if((n&Pa)!==0)os!==null?os.push(s):ra.ensure().schedule(s);else if(e!==null){try{xa(s)}catch(o){throw te(s),o}t.deps===null&&t.teardown===null&&t.nodes===null&&t.first===t.last&&(t.f&za)===0&&(t=t.first,(n&ye)!==0&&(n&Na)!==0&&t!==null&&(t.f|=Na))}if(t!==null&&(t.parent=a,a!==null&&Oc(t,a),fn!==null&&(fn.f&jn)!==0&&(n&ta)===0)){var r=fn;(r.effects??=[]).push(t)}return s}function qt(){return fn!==null&&!ke}function Zt(n){const e=Oe(Ts,null);return Jn(e,Hn),e.teardown=n,e}function vs(n){sl();var e=un.f,a=!fn&&(e&Ee)!==0&&Rn!==null&&!Rn.i;if(a){var s=Rn;(s.e??=[]).push(n)}else return tl(n)}function tl(n){return Oe(Pa|Wo,n)}function Vc(n){return sl(),Oe(Ts|Wo,n)}function Yc(n){ra.ensure();const e=Oe(ta|za,n);return(a={})=>new Promise(s=>{a.outro?va(e,()=>{te(e),s(void 0)}):(te(e),s(void 0))})}function zc(n){return Oe(Pa,n)}function Qc(n){return Oe(_a|za,n)}function rl(n,e=0){return Oe(Ts|e,n)}function H(n,e=[],a=[],s=[]){Jc(s,e,a,t=>{Oe(Ts,()=>{n(...t.map(f))})})}function Xt(n,e=0){var a=Oe(ye|e,n);return a}function he(n){return Oe(Ee|za,n)}function ol(n){var e=n.teardown;if(e!==null){const a=je,s=fn;Er(!0),me(null);try{e.call(null)}catch(t){_e(t,n.parent)}finally{Er(a),me(s)}}}function $t(n,e=!1){var a=n.first;for(n.first=n.last=null;a!==null;){const t=a.ac;t!==null&&Zs(()=>{t.abort(ys)});var s=a.next;(a.f&ta)!==0?a.parent=null:te(a,e),a=s}}function jc(n){for(var e=n.first;e!==null;){var a=e.next;(e.f&Ee)===0&&te(e),e=a}}function te(n,e=!0){var a=!1;(e||(n.f&Zi)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(Uc(n.nodes.start,n.nodes.end),a=!0),n.f|=hs,$t(n,e&&!a),gs(n,0);var s=n.nodes&&n.nodes.t;if(s!==null)for(const r of s)r.stop();ol(n),n.f^=hs,n.f|=zn;var t=n.parent;t!==null&&t.first!==null&&ll(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Uc(n,e){for(;n!==null;){var a=n===e?null:ks(n);n.remove(),n=a}}function ll(n){var e=n.parent,a=n.prev,s=n.next;a!==null&&(a.next=s),s!==null&&(s.prev=a),e!==null&&(e.first===n&&(e.first=s),e.last===n&&(e.last=a))}function va(n,e,a=!0){var s=[];n.f|=Ot,il(n,s,!0);var t=()=>{a&&te(n),e&&e()},r=s.length;if(r>0){var o=()=>--r||t();for(var l of s)l.out(o)}else t()}function il(n,e,a){if((n.f&Zn)===0){n.f^=Zn;var s=n.nodes&&n.nodes.t;if(s!==null)for(const l of s)(l.is_global||a)&&e.push(l);for(var t=n.first;t!==null;){var r=t.next;if((t.f&ta)===0){var o=(t.f&Na)!==0||(t.f&Ee)!==0&&(n.f&ye)!==0;il(t,e,o?a:!1)}t=r}}}function Ks(n){n.f&=~Ot,cl(n,!0)}function cl(n,e){if((n.f&Ot)===0&&(n.f&Zn)!==0){n.f^=Zn,(n.f&Hn)===0&&(Jn(n,Sn),ra.ensure().schedule(n));for(var a=n.first;a!==null;){var s=a.next,t=(a.f&Na)!==0||(a.f&Ee)!==0;cl(a,t?e:!1),a=s}var r=n.nodes&&n.nodes.t;if(r!==null)for(const o of r)(o.is_global||e)&&o.in()}}function nr(n,e){if(n.nodes)for(var a=n.nodes.start,s=n.nodes.end;a!==null;){var t=a===s?null:ks(a);e.append(a),a=t}}let je=!1;function Er(n){je=n}let fn=null,ke=!1;function me(n){fn=n}let un=null;function Ke(n){un=n}let Ie=null;function fl(n){fn!==null&&((fn.f&Ns)!==0||(fn.f&jn)!==0)&&(Ie??=new Set).add(n)}let se=null,le=0,pe=null;function qc(n){pe=n}let ul=1,da=0,ga=da;function Lr(n){ga=n}function dl(){return++ul}function Ds(n){var e=n.f;if((e&Sn)!==0)return!0;if((e&ie)!==0){for(var a=n.deps,s=a.length,t=0;t<s;t++){var r=a[t];if(Ds(r)&&Vo(r),r.wv>n.wv)return!0}(e&we)!==0&&Se===null&&Jn(n,Hn)}return!1}function pl(n,e,a=!0){var s=n.reactions;if(s!==null&&!(Ie!==null&&Ie.has(n)))for(var t=0;t<s.length;t++){var r=s[t];(r.f&jn)!==0?pl(r,e,!1):e===r&&(a?Jn(r,Sn):(r.f&Hn)!==0&&Jn(r,ie),Ut(r))}}function hl(n){var e=se,a=le,s=pe,t=fn,r=Ie,o=Rn,l=ke,i=ga,c=n.f;se=null,le=0,pe=null,fn=(c&(Ee|ta))===0?n:null,Ie=null,Ia(n.ctx),ke=!1,ga=++da,n.ac!==null&&(Zs(()=>{n.ac.abort(ys)}),n.ac=null);try{n.f|=Ns;var u=n.fn,h=u();n.f|=Ya;var m=br(n);if(Ss()&&pe!==null&&!ke&&m!==null&&(n.f&(jn|ie|Sn))===0)for(var d=0;d<pe.length;d++)pl(pe[d],n);if(t!==null&&t!==n){if(da++,t.deps!==null)for(let p=0;p<a;p+=1)t.deps[p].rv=da;if(e!==null)for(const p of e)p.rv=da;pe!==null&&(s===null?s=pe:s.push(...pe))}return(n.f&sa)!==0&&(n.f^=sa),h}catch(p){return br(n),xc(p)}finally{n.f^=Ns,se=e,le=a,pe=s,fn=t,Ie=r,Ia(o),ke=l,ga=i}}function br(n){var e=n.deps,a=dn?.is_fork;if(se!==null){var s;if(a||gs(n,le),e!==null&&le>0)for(e.length=le+se.length,s=0;s<se.length;s++)e[le+s]=se[s];else n.deps=e=se;if(qt()&&(n.f&we)!==0)for(s=le;s<e.length;s++)(e[s].reactions??=[]).push(n)}else!a&&e!==null&&le<e.length&&(gs(n,le),e.length=le);return e}function Zc(n,e){let a=e.reactions;if(a!==null){var s=zi.call(a,n);if(s!==-1){var t=a.length-1;t===0?a=e.reactions=null:(a[s]=a[t],a.pop())}}if(a===null&&(e.f&jn)!==0&&(se===null||!ps.call(se,e))){var r=e;(r.f&we)!==0&&(r.f^=we),r.v!==Nn&&Yt(r),r.ac!==null&&Zs(()=>{r.ac.abort(ys),r.ac=null,Jn(r,Sn)}),_c(r),gs(r,0)}}function gs(n,e){var a=n.deps;if(a!==null)for(var s=e;s<a.length;s++)Zc(n,a[s])}function xa(n){var e=n.f;if((e&zn)===0){Jn(n,Hn);var a=un;un=n;try{(e&(ye|Fo))!==0?jc(n):$t(n),ol(n);var s=hl(n);n.teardown=typeof s=="function"?s:null,n.wv=ul;var t;Ao&&Ec&&(n.f&Sn)!==0&&n.deps}finally{un=a}}}function f(n){var e=n.f,a=(e&jn)!==0;if(fn!==null&&!ke){var s=un!==null&&(un.f&zn)!==0;if(!s&&(Ie===null||!Ie.has(n))){var t=fn.deps;if((fn.f&Ns)!==0)n.rv<da&&(n.rv=da,se===null&&t!==null&&t[le]===n?le++:se===null?se=[n]:se.push(n));else{fn.deps??=[],ps.call(fn.deps,n)||fn.deps.push(n);var r=n.reactions;r===null?n.reactions=[fn]:ps.call(r,fn)||r.push(fn)}}}if(je&&Ne.has(n))return Ne.get(n);if(a){var o=n;if(je){var l=o.v;return((o.f&Hn)===0&&o.reactions!==null||vl(o))&&(l=Qt(o)),Ne.set(o,l),l}var i=(o.f&we)===0&&!ke&&fn!==null&&(fn.f&we)!==0,c=(o.f&Ya)===0;Ds(o)&&(i&&(o.f|=we),Vo(o)),i&&!c&&(Yo(o),ml(o))}if(Se?.has(n))return Se.get(n);if((n.f&sa)!==0)throw n.v;return n.v}function ml(n){if(n.f|=we,n.deps!==null)for(const a of n.deps){var e=a.reactions;e===null?a.reactions=[n]:ps.call(e,n)||e.push(n),(a.f&jn)!==0&&(a.f&we)===0&&(Yo(a),ml(a))}}function vl(n){if(n.v===Nn)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(Ne.has(e)||(e.f&jn)!==0&&vl(e))return!0;return!1}function ja(n){var e=ke;try{return ke=!0,n()}finally{ke=e}}function Xc(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(ze in n)Rt(n);else if(!Array.isArray(n))for(let e in n){const a=n[e];typeof a=="object"&&a&&ze in a&&Rt(a)}}}function Rt(n,e=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!e.has(n)){e.add(n),n instanceof Date&&n.getTime();for(let s in n)try{Rt(n[s],e)}catch{}const a=xt(n);if(a!==Object.prototype&&a!==Array.prototype&&a!==Map.prototype&&a!==Set.prototype&&a!==Date.prototype){const s=Jo(a);for(let t in s){const r=s[t].get;if(r)try{r.call(n)}catch{}}}}}const $c=["touchstart","touchmove"];function nf(n){return $c.includes(n)}const es=Symbol("events"),gl=new Set,Et=new Set;function X(n,e,a){(e[es]??={})[n]=a}function Gn(n){for(var e=0;e<n.length;e++)gl.add(n[e]);for(var a of Et)a(n)}let lt=null,it=!1;function Ar(n){var e=this,a=e.ownerDocument,s=n.type,t=n.composedPath?.()||[],r=t[0]||n.target;lt=n,it||(it=!0,setTimeout(()=>{it=!1,lt=null}));var o=0,l=lt===n&&n[es];if(l){var i=t.indexOf(l);if(i!==-1&&(e===document||e===window)){n[es]=e;return}var c=t.indexOf(e);if(c===-1)return;i<=c&&(o=i)}if(r=t[o]||n.target,r!==e){Kt(n,"currentTarget",{configurable:!0,get(){return r||a}});var u=fn,h=un;me(null),Ke(null);try{for(var m,d=[];r!==null&&r!==e;){try{var p=r[es]?.[s];p!=null&&(!r.disabled||n.target===r)&&p.call(r,n)}catch(v){m?d.push(v):m=v}if(n.cancelBubble)break;o++,r=o<t.length?t[o]:null}if(m){for(let v of d)queueMicrotask(()=>{throw v});throw m}}finally{n[es]=e,delete n.currentTarget,me(u),Ke(h)}}}const ef=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function af(n){return ef?.createHTML(n)??n}function sf(n){var e=Kc("template");return e.innerHTML=af(n.replaceAll("<!>","<!---->")),e.content}function xs(n,e){var a=un;a.nodes===null&&(a.nodes={start:n,end:e,a:null,t:null})}function M(n,e){var a=(e&cc)!==0,s=(e&fc)!==0,t,r=!n.startsWith("<!>");return()=>{t===void 0&&(t=sf(r?n:"<!>"+n),a||(t=ms(t)));var o=s||$o?document.importNode(t,!0):t.cloneNode(!0);if(a){var l=ms(o),i=o.lastChild;xs(l,i)}else xs(o,o);return o}}function Jr(n=""){{var e=Qe(n+"");return xs(e,e),e}}function tf(){var n=document.createDocumentFragment(),e=document.createComment(""),a=Qe();return n.append(e,a),xs(e,a),n}function A(n,e){n!==null&&n.before(e)}function rf(n){let e=0,a=Ba(0),s;return()=>{qt()&&(f(a),rl(()=>(e===0&&(s=ja(()=>n(()=>ls(a)))),e+=1,()=>{ea(()=>{e-=1,e===0&&(s?.(),s=void 0,ls(a))})})))}}var of=Na|za;function lf(n,e,a,s){new cf(n,e,a,s)}class cf{parent;is_pending=!1;transform_error;#e;#i=null;#n;#o;#a;#s=null;#r=null;#t=null;#l=null;#p=0;#c=0;#h=!1;#g=new Map;#f=null;#m=rf(()=>(this.#f=Ba(this.#p),()=>{this.#f=null}));constructor(e,a,s,t){this.#e=e,this.#n=a,this.#o=r=>{var o=un;o.b=this,o.f|=Ct,s(r)},this.parent=un.b,this.transform_error=t??this.parent?.transform_error??(r=>r),this.#a=Xt(()=>{this.#T()},of)}#C(){try{this.#s=he(()=>this.#o(this.#e))}catch(e){this.error(e)}}#S(e){const a=this.#n.failed,{reset:s,invoke_onerror:t}=this.#B(e);ea(t),a&&(this.#t=he(()=>{a(this.#e,()=>e,()=>s)}))}#B(e){var a=!1,s=!1;const t=()=>{if(!this.#u()){if(a){hc();return}a=!0,s&&Rc(),this.#t!==null&&va(this.#t,()=>{this.#t=null}),this.#y(()=>{this.#T()})}};return{reset:t,invoke_onerror:()=>{if(!this.#u())try{s=!0,this.#n.onerror?.(e,t),s=!1}catch(o){_e(o,this.#a&&this.#a.parent)}}}}#u(){return(this.#a.f&(zn|hs))!==0}#v(){const e=this.#n.pending;e&&(this.is_pending=!0,this.#r=he(()=>e(this.#e)),ea(()=>{if(!this.#u()){var a=this.#l=document.createDocumentFragment(),s=Qe(),t=!1;if(a.append(s),this.#s=this.#y(()=>{try{return he(()=>this.#o(s))}catch(r){try{this.error(r),t=!0}catch(o){_e(o,this.#a.parent)}return null}}),this.#s===null){this.#l=null,t&&this.#d(dn);return}this.#c===0&&(this.#e.before(a),this.#l=null,va(this.#r,()=>{this.#r=null}),this.#d(dn))}}))}#T(){try{if(this.is_pending=this.has_pending_snippet(),this.#c=0,this.#p=0,this.#s=he(()=>{this.#o(this.#e)}),this.#c>0){var e=this.#l=document.createDocumentFragment();nr(this.#s,e);const a=this.#n.pending;this.#r=he(()=>a(this.#e))}else this.#d(dn)}catch(a){this.error(a)}}#d(e){this.is_pending=!1,e.transfer_reactions(this.#g)}defer_effect(e){xo(e,this.#g)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#y(e){var a=un,s=fn,t=Rn;Ke(this.#a),me(this.#a),Ia(this.#a.ctx);try{return ra.ensure(),e()}finally{Ke(a),me(s),Ia(t)}}#k(e,a){if(!this.has_pending_snippet()){this.parent&&this.parent.#k(e,a);return}this.#c+=e,this.#c===0&&(this.#d(a),this.#r&&va(this.#r,()=>{this.#r=null}),this.#l&&(this.#e.before(this.#l),this.#l=null))}update_pending_count(e,a){this.#k(e,a),this.#p+=e,!(!this.#f||this.#h)&&(this.#h=!0,ea(()=>{this.#h=!1,this.#f&&Ka(this.#f,this.#p)}))}get_effect_pending(){return this.#m(),f(this.#f)}error(e){if(e===No||!this.#n.onerror&&!this.#n.failed)throw e;dn?.is_fork?(this.#s&&dn.skip_effect(this.#s),this.#r&&dn.skip_effect(this.#r),this.#t&&dn.skip_effect(this.#t),dn.oncommit(()=>{this.#u()||this.#D(e)})):this.#D(e)}#D(e){this.#s&&(te(this.#s),this.#s=null),this.#r&&(te(this.#r),this.#r=null),this.#t&&(te(this.#t),this.#t=null);let a=this.#n.failed;const s=t=>{if(this.#u())return;const{reset:r,invoke_onerror:o}=this.#B(t);o(),a&&!this.#u()&&(this.#t=this.#y(()=>{try{return he(()=>{var l=un;l.b=this,l.f|=Ct,a(this.#e,()=>t,()=>r)})}catch(l){return _e(l,this.#a.parent),null}}))};ea(()=>{if(!this.#u()){var t;try{t=this.transform_error(e)}catch(r){_e(r,this.#a&&this.#a.parent);return}t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(s,r=>_e(r,this.#a&&this.#a.parent)):s(t)}})}}function y(n,e){var a=e==null?"":typeof e=="object"?`${e}`:e;a!==(n[St]??=n.nodeValue)&&(n[St]=a,n.nodeValue=`${a}`)}function ff(n,e){return uf(n,e)}const Rs=new Map;function uf(n,{target:e,anchor:a,props:s={},events:t,context:r,intro:o=!0,transformError:l}){Ic();var i=void 0,c=Yc(()=>{var u=a??e.appendChild(Qe());lf(u,{pending:()=>{}},d=>{kn({});var p=Rn;r&&(p.c=r),t&&(s.$$events=t),i=n(d,s)||Vt(),Dn()},l);var h=new Set,m=d=>{for(var p=0;p<d.length;p++){var v=d[p];if(!h.has(v)){h.add(v);var g=nf(v);for(const w of[e,document]){var C=Rs.get(w);C===void 0&&(C=new Map,Rs.set(w,C));var T=C.get(v);T===void 0?(w.addEventListener(v,Ar,{passive:g}),C.set(v,1)):C.set(v,T+1)}}}};return m(qs(gl)),Et.add(m),()=>{for(var d of h)for(const g of[e,document]){var p=Rs.get(g),v=p.get(d);--v==0?(g.removeEventListener(d,Ar),p.delete(d),p.size===0&&Rs.delete(g)):p.set(d,v)}Et.delete(m),u!==a&&u.parentNode?.removeChild(u)}});return df.set(i,c),i}let df=new WeakMap;class pf{anchor;#e=new Map;#i=new Map;#n=new Map;#o=new Set;#a=!0;constructor(e,a=!0){this.anchor=e,this.#a=a}#s=e=>{if(this.#e.has(e)){var a=this.#e.get(e),s=this.#i.get(a);if(s)Ks(s),this.#o.delete(a);else{var t=this.#n.get(a);t&&(Ks(t.effect),this.#i.set(a,t.effect),this.#n.delete(a),t.fragment.lastChild.remove(),this.anchor.before(t.fragment),s=t.effect)}for(const[r,o]of this.#e){if(this.#e.delete(r),r===e)break;const l=this.#n.get(o);l&&(te(l.effect),this.#n.delete(o))}for(const[r,o]of this.#i){if(r===a||this.#o.has(r))continue;const l=()=>{if(Array.from(this.#e.values()).includes(r)){var c=document.createDocumentFragment();nr(o,c),c.append(Qe()),this.#n.set(r,{effect:o,fragment:c})}else te(o);this.#o.delete(r),this.#i.delete(r)};this.#a||!s?(this.#o.add(r),va(o,l,!1)):l()}}};#r=e=>{this.#e.delete(e);const a=Array.from(this.#e.values());for(const[s,t]of this.#n)a.includes(s)||(te(t.effect),this.#n.delete(s))};ensure(e,a){var s=dn,t=al();if(a&&!this.#i.has(e)&&!this.#n.has(e))if(t){var r=document.createDocumentFragment(),o=Qe();r.append(o),this.#n.set(e,{effect:he(()=>a(o)),fragment:r})}else this.#i.set(e,he(()=>a(this.anchor)));if(this.#e.set(s,e),t){for(const[l,i]of this.#i)l===e?s.unskip_effect(i):s.skip_effect(i);for(const[l,i]of this.#n)l===e?s.unskip_effect(i.effect):s.skip_effect(i.effect);s.oncommit(this.#s),s.ondiscard(this.#r)}else this.#s(s)}}function sn(n,e,a=!1){var s=new pf(n),t=a?Na:0;function r(o,l){s.ensure(o,l)}Xt(()=>{var o=!1;e((l,i=0)=>{o=!0,r(i,l)}),o||r(-1,null)},t)}function Ua(n,e){return e}function hf(n,e,a){for(var s=[],t=e.length,r,o=e.length,l=0;l<t;l++){let h=e[l];va(h,()=>{if(r){if(r.pending.delete(h),r.done.add(h),r.pending.size===0){var m=n.outrogroups;Lt(n,qs(r.done)),m.delete(r),m.size===0&&(n.outrogroups=null)}}else o-=1},!1)}if(o===0){var i=s.length===0&&a!==null&&n.pending.size===0;if(i){var c=a,u=c.parentNode;Hc(u),u.append(c),n.items.clear()}Lt(n,e,!i)}else r={pending:new Set(e),done:new Set},(n.outrogroups??=new Set).add(r)}function Lt(n,e,a=!0){var s;if(n.pending.size>0){s=new Set;for(const o of n.pending.values())for(const l of o)s.add(n.items.get(l).e)}for(var t=0;t<e.length;t++){var r=e[t];if(s?.has(r)){r.f|=Ge;const o=document.createDocumentFragment();nr(r,o)}else te(e[t],a)}}var Mr;function cn(n,e,a,s,t,r=null){var o=n,l=new Map,i=(e&Po)!==0;if(i){var c=n;o=c.appendChild(Qe())}var u=null,h=zt(()=>{var T=a();return Us(T)?T:T==null?[]:qs(T)}),m=new Map,d=!0;function p(T){if((C.effect.f&zn)===0){C.pending.delete(T);var w=f(h);C.fallback=u,mf(C,w,o,e,s),u!==null&&(w.length===0?(u.f&Ge)===0?Ks(u):(u.f^=Ge,as(u,null,o)):va(u,()=>{u=null}))}}function v(T){C.pending.delete(T)}var g=Xt(()=>{for(var T=f(h),w=T.length,k=new Set,S=dn,F=al(),G=0;G<w;G+=1){var J=T[G],E=s(J,G),R=d?null:l.get(E);R?(R.v&&Ka(R.v,J),R.i&&Ka(R.i,G),F&&S.unskip_effect(R.e)):(R=vf(l,d?o:Mr??=Qe(),J,E,G,t,e,a),d||(R.e.f|=Ge),l.set(E,R)),k.add(E)}if(w===0&&r&&!u&&(d?u=he(()=>r(o)):(u=he(()=>r(Mr??=Qe())),u.f|=Ge)),w>k.size&&gc(),!d)if(m.set(S,k),F){for(const[I,P]of l)k.has(I)||S.skip_effect(P.e);S.oncommit(p),S.ondiscard(v)}else p(S);f(h)}),C={effect:g,items:l,pending:m,outrogroups:null,fallback:u};d=!1}function Xa(n){for(;n!==null&&(n.f&Ee)===0;)n=n.next;return n}function mf(n,e,a,s,t){var r=(s&ac)!==0,o=e.length,l=n.items,i=Xa(n.effect.first),c,u=null,h,m=[],d=[],p,v,g,C;if(r)for(C=0;C<o;C+=1)p=e[C],v=t(p,C),g=l.get(v).e,(g.f&Ge)===0&&(g.nodes?.a?.measure(),(h??=new Set).add(g));for(C=0;C<o;C+=1){if(p=e[C],v=t(p,C),g=l.get(v).e,n.outrogroups!==null)for(const R of n.outrogroups)R.pending.delete(g),R.done.delete(g);if((g.f&Zn)!==0&&(Ks(g),r&&(g.nodes?.a?.unfix(),(h??=new Set).delete(g))),(g.f&Ge)!==0)if(g.f^=Ge,g===i)as(g,null,a);else{var T=u?u.next:i;g===n.effect.last&&(n.effect.last=g.prev),g.prev&&(g.prev.next=g.next),g.next&&(g.next.prev=g.prev),qe(n,u,g),qe(n,g,T),as(g,T,a),u=g,m=[],d=[],i=Xa(u.next);continue}if(g!==i){if(c!==void 0&&c.has(g)){if(m.length<d.length){var w=d[0],k;u=w.prev;var S=m[0],F=m[m.length-1];for(k=0;k<m.length;k+=1)as(m[k],w,a);for(k=0;k<d.length;k+=1)c.delete(d[k]);qe(n,S.prev,F.next),qe(n,u,S),qe(n,F,w),i=w,u=F,C-=1,m=[],d=[]}else c.delete(g),as(g,i,a),qe(n,g.prev,g.next),qe(n,g,u===null?n.effect.first:u.next),qe(n,u,g),u=g;continue}for(m=[],d=[];i!==null&&i!==g;)(c??=new Set).add(i),d.push(i),i=Xa(i.next);if(i===null)continue}(g.f&Ge)===0&&m.push(g),u=g,i=Xa(g.next)}if(n.outrogroups!==null){for(const R of n.outrogroups)R.pending.size===0&&(Lt(n,qs(R.done)),n.outrogroups?.delete(R));n.outrogroups.size===0&&(n.outrogroups=null)}if(i!==null||c!==void 0){var G=[];if(c!==void 0)for(g of c)(g.f&Zn)===0&&G.push(g);for(;i!==null;)(i.f&Zn)===0&&i!==n.fallback&&G.push(i),i=Xa(i.next);var J=G.length;if(J>0){var E=(s&Po)!==0&&o===0?a:null;if(r){for(C=0;C<J;C+=1)G[C].nodes?.a?.measure();for(C=0;C<J;C+=1)G[C].nodes?.a?.fix()}hf(n,G,E)}}r&&ea(()=>{if(h!==void 0)for(g of h)g.nodes?.a?.apply()})}function vf(n,e,a,s,t,r,o,l){var i=(o&nc)!==0?(o&sc)===0?qo(a,!1,!1):Ba(a):null,c=(o&ec)!==0?Ba(t):null;return{v:i,i:c,e:he(()=>(r(e,i??a,c??t,l),()=>{n.delete(s)}))}}function as(n,e,a){if(n.nodes)for(var s=n.nodes.start,t=n.nodes.end,r=e&&(e.f&Ge)===0?e.nodes.start:a;s!==null;){var o=ks(s);if(r.before(s),s===t)return;s=o}}function qe(n,e,a){e===null?n.effect.first=a:e.next=a,a===null?n.effect.last=e:a.prev=e}const Fr=[...` 	
\r\f \v\uFEFF`];function gf(n,e,a){var s=n==null?"":""+n;if(e&&(s=s?s+" "+e:e),a){for(var t of Object.keys(a))if(a[t])s=s?s+" "+t:t;else if(s.length)for(var r=t.length,o=0;(o=s.indexOf(t,o))>=0;){var l=o+r;(o===0||Fr.includes(s[o-1]))&&(l===s.length||Fr.includes(s[l]))?s=(o===0?"":s.substring(0,o))+s.substring(l+1):o=l}}return s===""?null:s}function Bf(n,e){return n==null?null:String(n)}function xn(n,e,a,s,t,r){var o=n[Tt];if(o!==a||o===void 0){var l=gf(a,s,r);l==null?n.removeAttribute("class"):n.className=l,n[Tt]=a}else if(r&&t!==r)for(var i in r){var c=!!r[i];(t==null||c!==!!t[i])&&n.classList.toggle(i,c)}return r}function Ze(n,e,a,s){var t=n[yt];if(t!==e){var r=Bf(e);r==null?n.removeAttribute("style"):n.style.cssText=r,n[yt]=e}return s}function Cf(n,e){e?n.hasAttribute("selected")||n.setAttribute("selected",""):n.removeAttribute("selected")}function Tf(n,e){var a=n.__defaultValue,s=n.multiple,t=s?a??[]:null;if(!(s&&!Us(t))){n.selectedIndex;for(var r of n.options){var o=bt(r);Cf(r,s?t.includes(o):Xo(o,a))}}}function Bl(n,e,a=!1){if(n.multiple){if(e==null)return;if(!Us(e))return pc();for(var s of n.options)s.selected=e.includes(bt(s));return}for(s of n.options){var t=bt(s);if(Xo(t,e)){s.selected=!0;return}}(!a||e!==void 0)&&(n.selectedIndex=-1)}function yf(n){var e=new MutationObserver(a=>{a.every(Sf)||("__defaultValue"in n&&Tf(n),"__value"in n&&Bl(n,n.__value))});e.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Zt(()=>{e.disconnect()})}function bt(n){return"__value"in n?n.__value:n.value}function Sf(n){if(n.target.closest("selectedcontent")!==null)return!0;if(n.type==="childList"){var e=[...n.addedNodes,...n.removedNodes];return e.length>0&&e.every(a=>a.nodeName==="SELECTEDCONTENT")}return!1}const kf=Symbol("is custom element"),Df=Symbol("is html");function Wr(n,e){var a=Cl(n);a.checked!==(a.checked=e??void 0)&&(n.checked=e)}function _n(n,e,a,s){var t=Cl(n),r=t[e];r!==(t[e]=a)&&(e==="loading"&&(n[$i]=a),a==null?n.removeAttribute(e):typeof a!="string"&&wf(n).has(e)?n[e]=a:n.setAttribute(e,a))}function Cl(n){return n[Go]??={[kf]:n.nodeName.includes("-"),[Df]:n.namespaceURI===uc}}var _r=new Map;function wf(n){var e=n.getAttribute("is")||n.nodeName,a=_r.get(e);if(a)return a;_r.set(e,a=new Set);for(var s,t=n,r=Element.prototype;r!==t;){s=Jo(t);for(var o in s)s[o].set&&o!=="innerHTML"&&o!=="textContent"&&o!=="innerText"&&a.add(o);t=xt(t)}return a}function ct(n,e){return n===e||n?.[ze]===e}function Rf(n=Vt(),e,a,s){var t=Rn.r,r=un;return zc(()=>{var o,l;return rl(()=>{o=l,l=[],ja(()=>{ct(a(...l),n)||(e(n,...l),o&&ct(a(...o),n)&&e(null,...o))})}),()=>{let i=r;for(;i!==t&&i.parent!==null&&i.parent.f&hs;)i=i.parent;const c=()=>{l&&ct(a(...l),n)&&e(null,...l)},u=i.teardown;i.teardown=()=>{c(),u?.()}}}),n}function Ef(n=!1){const e=Rn,a=e.l.u;if(!a)return;let s=()=>Xc(e.s);if(n){let t=0,r={};const o=Ha(()=>{let l=!1;const i=e.s;for(const c in i)i[c]!==r[c]&&(r[c]=i[c],l=!0);return l&&t++,t});s=()=>f(o)}a.b.length&&Vc(()=>{Gr(e,s),Bt(a.b)}),vs(()=>{const t=ja(()=>a.m.map(Ui));return()=>{for(const r of t)typeof r=="function"&&r()}}),a.a.length&&vs(()=>{Gr(e,s),Bt(a.a)})}function Gr(n,e){if(n.l.s)for(const a of n.l.s)f(a);e()}function Tl(n,e,a){if(n==null)return e(void 0),ma;const s=ja(()=>n.subscribe(e,a));return s.unsubscribe?()=>s.unsubscribe():s}const ka=[];function yl(n,e){return{subscribe:er(n,e).subscribe}}function er(n,e=ma){let a=null;const s=new Set;function t(l){if(Ho(n,l)&&(n=l,a)){const i=!ka.length;for(const c of s)c[1](),ka.push(c,n);if(i){for(let c=0;c<ka.length;c+=2)ka[c][0](ka[c+1]);ka.length=0}}}function r(l){t(l(n))}function o(l,i=ma){const c=[l,i];return s.add(c),s.size===1&&(a=e(t,r)||ma),l(n),()=>{s.delete(c),s.size===0&&a&&(a(),a=null)}}return{set:t,update:r,subscribe:o}}function Lf(n){let e;return Tl(n,a=>e=a)(),e}let Es=!1,At=Symbol("unmounted");function Me(n,e,a){const s=a[e]??={store:null,source:qo(void 0),unsubscribe:ma};if(s.store!==n&&!(At in a))if(s.unsubscribe(),s.store=n??null,n==null)s.source.v=void 0,s.unsubscribe=ma;else{var t=!0;s.unsubscribe=Tl(n,r=>{t?s.source.v=r:an(s.source,r)}),t=!1}return n&&At in a?Lf(n):f(s.source)}function bf(){const n={};function e(){Zt(()=>{for(var a in n)n[a].unsubscribe();Kt(n,At,{enumerable:!1,value:!0})})}return[n,e]}function Af(n){var e=Es;try{return Es=!1,[n(),Es]}finally{Es=e}}function pa(n,e,a,s){var t=!Qa||(a&rc)!==0,r=(a&lc)!==0,o=(a&ic)!==0,l=s,i=!0,c=void 0,u=()=>o&&t?(c??=Ha(s),f(c)):(i&&(i=!1,l=o?ja(s):s),l);let h;if(r){var m=ze in n||Xi in n;h=Wa(n,e)?.set??(m&&e in n?k=>n[e]=k:void 0)}var d,p=!1;r?[d,p]=Af(()=>n[e]):d=n[e],d===void 0&&s!==void 0&&(d=u(),h&&(t&&Sc(),h(d)));var v;if(t?v=()=>{var k=n[e];return k===void 0?u():(i=!0,k)}:v=()=>{var k=n[e];return k!==void 0&&(l=void 0),k===void 0?l:k},t&&(a&oc)===0)return v;if(h){var g=n.$$legacy;return(function(k,S){return arguments.length>0?((!t||!S||g||p)&&h(S?v():k),k):v()})}var C=!1,T=((a&tc)!==0?Ha:zt)(()=>(C=!1,v()));r&&f(T);var w=un;return(function(k,S){if(arguments.length>0){const F=S?f(T):t&&r?aa(k):k;return an(T,F),C=!0,l!==void 0&&(l=F),k}return je&&C||(w.f&zn)!==0?T.v:f(T)})}function Jf(n){Rn===null&&mc(),Qa&&Rn.l!==null?Mf(Rn).m.push(n):vs(()=>{const e=ja(n);if(typeof e=="function")return e})}function Mf(n){var e=n.l;return e.u??={a:[],b:[],m:[]}}const Ff="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(Ff);const Pr=`name,pos,team,ovr,spd,str
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
`,Wf=`name,pos,team,ovr,spd,str
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
`,_f=`pid,name,pos,team
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
`,Sl="sim",Gf=/^[a-z][a-z0-9]*$/,Pf=/^[a-z0-9][a-z0-9-]*$/i,Nf=["theme","settings","profile"];function ar(n,e){if(!Gf.test(n))throw new Error("keys: bad sport id "+n);if(e===""||!e.split(":").every(a=>Pf.test(a)))throw new Error("keys: bad key name "+e);if(Nf.includes(n))throw new Error("keys: a sport cannot be called "+n);return`${Sl}:${n}:${e}`}const If=n=>n.startsWith(Sl+":"),Hf=["A","B","C"];function Kf(n){const e=n.split(":"),a=e[3];return e.length<4||e[2]!=="slot"||a===void 0?null:Hf.includes(a)?a:null}const kl=1,xf=["nfl"],Dl={nfl:["draft","week","season"]},wl=["A","B","C"],de=n=>({ok:!1,reason:"corrupt",message:n}),Nr=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),Ir=n=>typeof n=="number"&&Number.isInteger(n),Xe=n=>typeof n=="string";function Rl(n){if(!Nr(n))return de("envelope: not an object");const e=n.sport===void 0?"nfl":n.sport;return!Xe(e)||!xf.includes(e)?de("envelope: unknown sport"):!Xe(n.kind)||!Dl[e].includes(n.kind)?de("envelope: bad kind for "+e):!Ir(n.schemaVersion)||n.schemaVersion<1?de("envelope: bad schemaVersion"):n.schemaVersion>kl?{ok:!1,reason:"newer-version",message:"envelope: written by a newer build (schema "+n.schemaVersion+")"}:!Xe(n.engineVersion)||!n.engineVersion?de("envelope: bad engineVersion"):!Xe(n.dataVersion)||!n.dataVersion?de("envelope: bad dataVersion"):!Xe(n.saveId)||!n.saveId?de("envelope: bad saveId"):!Ir(n.saveRevision)||n.saveRevision<1?de("envelope: bad saveRevision"):!Xe(n.createdAt)||Number.isNaN(Date.parse(n.createdAt))?de("envelope: bad createdAt"):!Xe(n.slot)||!wl.includes(n.slot)?de("envelope: bad slot"):!Xe(n.savedAt)||Number.isNaN(Date.parse(n.savedAt))?de("envelope: bad savedAt"):Nr(n.payload)?{ok:!0,value:{...n,sport:e}}:de("envelope: payload is not an object")}function Of(n,e,a,s,t,r){if(!Dl[n].includes(e))throw new Error(`envelope: ${n} has no save kind '${e}'`);const o={sport:n,kind:e,schemaVersion:kl,engineVersion:s.engineVersion,dataVersion:s.dataVersion,saveId:s.saveId,saveRevision:s.saveRevision,createdAt:s.createdAt,slot:a,savedAt:r.toISOString(),payload:t};return Jt(o,"envelope"),JSON.stringify(o)}function Jt(n,e){if(!(n===null||typeof n=="string"||typeof n=="boolean")){if(typeof n=="number"){if(!Number.isFinite(n))throw new Error("not plain JSON at "+e+": non-finite number");return}if(Array.isArray(n)){n.forEach((a,s)=>Jt(a,e+"["+s+"]"));return}if(typeof n=="object"&&Object.getPrototypeOf(n)===Object.prototype){for(const[a,s]of Object.entries(n))Jt(s,e+"."+a);return}throw new Error("not plain JSON at "+e+": "+(n===void 0?"undefined":typeof n=="object"?"class instance, Map or Set":typeof n))}}const El="nfl",Pn=n=>({ok:!1,reason:"corrupt",message:n}),na=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),yn=n=>typeof n=="number"&&Number.isInteger(n),In=n=>typeof n=="string",Vf=n=>na(n)&&In(n.id)&&In(n.name)&&In(n.pos)&&In(n.role)&&In(n.team)&&yn(n.ovr)&&yn(n.spd)&&yn(n.str)&&typeof n.freeAgent=="boolean",Hr=n=>Array.isArray(n)&&n.every(e=>na(e)&&yn(e.week)&&In(e.home)&&In(e.away)&&yn(e.hs)&&yn(e.as));function Ll(n){return yn(n.seed)?!yn(n.userTeam)||n.userTeam<0||n.userTeam>31?"draft: bad userTeam":!Array.isArray(n.picks)||!n.picks.every(e=>na(e)&&yn(e.overall)&&yn(e.team)&&In(e.pid)&&In(e.slot))?"draft: bad picks":!Array.isArray(n.pool)||!n.pool.every(e=>Array.isArray(e)&&e.length===8&&In(e[0])&&In(e[1])&&In(e[2])&&In(e[3])&&yn(e[4])&&yn(e[5])&&yn(e[6])&&(e[7]===0||e[7]===1))?"draft: bad pool":null:"payload: bad seed"}function Yf(n){const e=n.payload;if(!yn(e.seed))return Pn("payload: bad seed");if(n.kind==="draft"){const a=Ll(e);if(a)return Pn(a)}else{if(!yn(e.year)||!yn(e.run)||e.run<0)return Pn(n.kind+": bad year/run");if(!In(e.userTeam))return Pn(n.kind+": bad userTeam");if(!Array.isArray(e.roster)||e.roster.length!==32||!e.roster.every(Vf))return Pn(n.kind+": roster must be 32 frozen players");if(typeof e.statsRecorded!="boolean")return Pn(n.kind+": bad statsRecorded");if(n.kind==="week"){if(!yn(e.gameSeed)||!yn(e.nextWeek)||e.nextWeek<1)return Pn("week: bad gameSeed/nextWeek");if(!na(e.ratings))return Pn("week: bad ratings");if(!Array.isArray(e.schedule)||!e.schedule.every(a=>na(a)&&yn(a.week)&&In(a.home)&&In(a.away)&&In(a.kind)))return Pn("week: bad schedule");if(!Hr(e.scores))return Pn("week: bad scores");if(e.plan!==null&&!na(e.plan))return Pn("week: bad plan");if(e.prevRank!==void 0&&!(na(e.prevRank)&&Object.values(e.prevRank).every(yn)))return Pn("week: bad prevRank");if(e.homeField!==void 0&&!(typeof e.homeField=="number"&&Number.isFinite(e.homeField)))return Pn("week: bad homeField")}else{if(!Array.isArray(e.table)||!e.table.every(a=>na(a)&&In(a.team)&&yn(a.w)&&yn(a.l)&&yn(a.t)&&yn(a.pf)&&yn(a.pa)))return Pn("season: bad table");if(!Hr(e.userResults))return Pn("season: bad userResults");if(!In(e.champion))return Pn("season: bad champion");if(!["missed-playoffs","wild-card","divisional","conference","super-bowl-loss","champion"].includes(e.userOutcome))return Pn("season: bad userOutcome")}}return{ok:!0,value:n}}function sr(n,e,a,s,t){return Of(El,n,e,a,s,t)}function tr(n){let e;try{e=JSON.parse(n)}catch{return Pn("envelope: not JSON")}const a=Rl(e);return a.ok?a.value.sport!==El?Pn("envelope: this is a "+a.value.sport+" save, not an nfl save"):Yf(a.value):a}function zf(n,e){const a=Kf(e);return a&&a!==n?"envelope: slot "+n+" written under "+e+" (that key is slot "+a+")":null}const Os={QB:{FS:12},RB:{FB:0,WR:12,TE:6,SS:12,FS:12},FB:{RB:2,TE:6},WR:{RB:6,TE:6,CB:6,FS:6,SS:6,NICKEL:6,DIME:6},TE:{FB:0,WR:12,RB:6,C:6,OG:6,OT:12,EDGE:12,DT:12,OLB:6,ILB:12,SS:6,FS:12,NICKEL:6,DIME:12},OT:{OG:0,C:2,DT:6,EDGE:6,FB:0},OG:{OT:2,C:2,DT:6,EDGE:6,FB:0},C:{OG:6,OT:12,DT:12,FB:0},DT:{EDGE:6,C:6,OG:6,OT:6,FB:0},EDGE:{DT:0,OLB:0,ILB:6,C:6,OG:6,OT:6,SS:12,RB:6,FB:0,TE:6,NICKEL:6},ILB:{ILB:0,OLB:0,EDGE:12,FS:12,SS:2,FB:0,TE:6,NICKEL:6,DIME:12},OLB:{OLB:0,ILB:6,EDGE:12,FS:12,SS:6,FB:0,TE:6,NICKEL:6,DIME:12},SS:{NICKEL:0,DIME:0,FS:2,CB:6,WR:12,ILB:6,OLB:2,RB:12,TE:6},FS:{NICKEL:0,DIME:0,SS:2,CB:6,WR:12,OLB:6},CB:{FS:0,NICKEL:0,DIME:0,SS:0,WR:6},K:{P:2},P:{K:2},LS:{}},Mt=8;function Qf(n){if(n==="DT"||n==="EDGE")return 0;const e=Os[n].DT,a=Os[n].EDGE;return e===void 0?a:a===void 0?e:Math.min(e,a)}function He(n,e){if(n===e)return{penalty:0,emergency:!1,legal:!0};const a=e==="DL5"?Qf(n):Os[n][e];return a!==void 0?{penalty:a,emergency:!1,legal:!0}:n==="QB"?{penalty:Mt,emergency:!0,legal:!1}:{penalty:Mt,emergency:!0,legal:!0}}function N(n,e){const a=n[e];if(a===void 0)throw new Error(`at(): no element at index ${e} (length ${n.length})`);return a}function ss(n,e){const a=n[e];if(a===void 0)throw new Error(`need(): no entry for key "${e}"`);return a}const Le=[{id:"QB",weight:1e3,dest:"QB",unit:"offense"},{id:"WR1",weight:650,dest:"WR",unit:"offense"},{id:"OT1",weight:500,dest:"OT",unit:"offense"},{id:"OT2",weight:300,dest:"OT",unit:"offense"},{id:"WR2",weight:400,dest:"WR",unit:"offense"},{id:"C",weight:150,dest:"C",unit:"offense"},{id:"OG1",weight:400,dest:"OG",unit:"offense"},{id:"OG2",weight:250,dest:"OG",unit:"offense"},{id:"TE1",weight:250,dest:"TE",unit:"offense"},{id:"RB1",weight:250,dest:"RB",unit:"offense"},{id:"WR3",weight:100,dest:"WR",unit:"offense"},{id:"RB2",weight:100,dest:"RB",unit:"offense"},{id:"TE2",weight:150,dest:"TE",unit:"offense"},{id:"FB",weight:25,dest:"FB",unit:"offense"},{id:"TE3",weight:50,dest:"TE",unit:"offense"},{id:"WR4",weight:50,dest:"WR",unit:"offense"},{id:"DE1",weight:650,dest:"EDGE",unit:"defense"},{id:"DT1",weight:500,dest:"DT",unit:"defense"},{id:"DE2",weight:300,dest:"EDGE",unit:"defense"},{id:"DT2",weight:300,dest:"DT",unit:"defense"},{id:"DL5",weight:150,dest:"DL5",unit:"defense"},{id:"MIKE",weight:300,dest:"ILB",unit:"defense"},{id:"WILL",weight:150,dest:"OLB",unit:"defense"},{id:"SAM",weight:100,dest:"OLB",unit:"defense"},{id:"CB1",weight:400,dest:"CB",unit:"defense"},{id:"CB2",weight:250,dest:"CB",unit:"defense"},{id:"CB3",weight:100,dest:"NICKEL",unit:"defense"},{id:"DIME",weight:50,dest:"DIME",unit:"defense"},{id:"FS",weight:300,dest:"FS",unit:"defense"},{id:"SS",weight:300,dest:"SS",unit:"defense"},{id:"K",weight:50,dest:"K",unit:"special"},{id:"P",weight:50,dest:"P",unit:"special"}],is=Le.map(n=>n.id),Ft=Object.fromEntries(Le.map(n=>[n.id,n.weight])),jf={WR1:"WR1",MIKE:"MIKE",WILL:"WILL",SAM:"SAM",CB3:"Nickel",DE1:"DE1",DE2:"DE2"};function bl(n){return Le.map(e=>{const a={slot:e.id,dest:e.dest,row:e.id,weight:e.weight,label:jf[e.id]??e.id};if(n==="4-3")return a;switch(e.id){case"DT1":return{...a,label:"NT"};case"MIKE":return{...a,label:"ILB1"};case"DT2":return{slot:"DT2",dest:"ILB",row:"DT2",weight:Ft.DT2,label:"ILB2"};case"WILL":return{slot:"WILL",dest:"OLB",row:"WILL",weight:Ft.WILL,label:"OLB1"};case"SAM":return{...a,label:"OLB2"};default:return a}})}const Bs=32,Uf=is.length,Oa=Object.fromEntries(Le.map(n=>[n.id,n.dest])),Al=n=>n==="NICKEL"||n==="DIME"?"CB":n==="DL5"?"DT":n,Jl={topFloor:5,topFloorRounds:4,midFloor:10,midFloorRounds:8,kpFirstRound:6,noiseMax:1.5,missMax:.6,biasSd:.5,hyperP:.15,replFloor:72};function Ml(n=Bs,e=Uf){const a=[];for(let s=0;s<e;s++)for(let t=0;t<n;t++)a.push(s%2===0?t:n-1-t);return a}const qf=(n,e)=>e.ovr-n.ovr||(n.id<e.id?-1:n.id>e.id?1:0),Zf=Array.from(new Set(Le.map(n=>n.dest)));function Xf(n,e,a=Jl,s=Ml()){const t=n.filter(l=>l.role!=="LS").slice().sort(qf),r=e.fork("traits"),o=Array.from({length:Bs},()=>({noise:.05+r.next()*(a.noiseMax-.05),miss:r.next()*a.missMax,bias:Object.fromEntries(Zf.map(l=>{const i=r.next();return[l,i<a.hyperP/2?.05+r.next()*.3:i<a.hyperP?2+r.next()*3:Math.exp(a.biasSd*r.normal())]}))}));return{cfg:a,order:s,pos:0,pool:t,rosters:Array.from({length:Bs},()=>({})),traits:o,log:[],repl:{},replAt:-99}}const Xs=n=>Math.floor(n.pos/Bs)+1,ws=n=>is.filter(e=>!n[e]);function $f(n){if(n.pos===n.replAt)return n.repl;const e={};for(const t of n.rosters)for(const r of ws(t)){const o=Al(Oa[r]);e[o]=(e[o]??0)+1}const a={};for(const t of n.pool)(a[t.role]??=[]).push(t.ovr);const s={};for(const t of Object.keys(e)){const r=a[t]??[];s[t]=r.length?N(r,Math.min(e[t]??1,r.length)-1):0}return n.repl=s,n.replAt=n.pos,s}function Wt(n,e){const a=ws(N(n.rosters,e)),s=$f(n),t={},r=[],o=Xs(n);for(const l of n.pool)if(!((t[l.role]=(t[l.role]??0)+1)>16)&&!((l.role==="K"||l.role==="P")&&o<n.cfg.kpFirstRound))for(const c of a){const u=He(l.role,Oa[c]);if(!u.legal||u.emergency)continue;const h=l.ovr-u.penalty,m=Math.max(s[Al(Oa[c])]??0,n.cfg.replFloor);r.push({player:l,slot:c,eff:h,wins:Ft[c]*(h-m)})}return r}function n0(n){const e=n.pool.length?N(n.pool,0).ovr:0,a=Xs(n),s=n.cfg;return a<=s.topFloorRounds?e-s.topFloor:a<=s.midFloorRounds?e-s.midFloor:-1/0}function Fl(n,e,a){const s=N(n.traits,e),t=n0(n);let r=Wt(n,e).filter(c=>c.player.ovr>=t);if(r.length||(r=Wt(n,e)),!r.length)return e0(n,e);const o=r.map(c=>({c,v:c.wins*(s.bias[Oa[c.slot]]??1)*Math.max(.02,1+s.noise*a.normal())+.002*c.player.ovr}));o.sort((c,u)=>u.v-c.v);let l=0;o.length>8&&a.next()<s.miss&&(l=Math.min(o.length-1,3+Math.min(9,Math.floor(Math.abs(a.normal())*4))));const i=N(o,l).c;return{player:i.player,slot:i.slot}}function e0(n,e){const a=ws(N(n.rosters,e));for(const s of n.pool)for(const t of a)if(He(s.role,Oa[t]).legal)return{player:s,slot:t};throw new Error("draft: no legal pick for team "+e)}function $s(n,e,a,s){if(n.order[n.pos]!==e)throw new Error(`draft: it is not team ${e}'s pick`);if(N(n.rosters,e)[s])throw new Error("draft: spot already filled "+s);const t=n.pool.findIndex(l=>l.id===a.id);if(t<0)throw new Error("draft: player already taken "+a.id);if(!He(a.role,Oa[s]).legal)throw new Error("draft: illegal fit");const r=N(n.pool,0).ovr;n.pool.splice(t,1),N(n.rosters,e)[s]=a;const o={overall:n.pos+1,round:Xs(n),pickInRound:n.pos%Bs+1,team:e,slot:s,player:a,ovrGap:r-a.ovr};return n.log.push(o),n.pos++,o}const a0=/^([a-z][a-z0-9]*)-p(\d{5,})$/;function s0(n){const e=a0.exec(n);return e?{sport:e[1],n:+e[2]}:null}const t0="pid,name,pos,team",Wl=(n,e,a)=>`${n}|${e}|${a}`,r0="nfl";function o0(n,e=r0){const a=n.split(/\r?\n/).filter(o=>o.trim().length>0);if(a.length===0||a[0].trim()!==t0)throw new Error("player-ids csv: unexpected header: "+(a[0]??"(empty)"));const s=[],t=new Set,r=new Set;for(let o=1;o<a.length;o++){const l=/^([a-z][a-z0-9]*-p\d{5,}),(.*),([A-Z]+),([^,]+)$/.exec(a[o]);if(!l)throw new Error(`player-ids csv line ${o+1}: cannot parse: ${a[o]}`);const i={pid:l[1],name:l[2],pos:l[3],team:l[4]};if(s0(i.pid)?.sport!==e)throw new Error(`player-ids csv line ${o+1}: ${i.pid} is not a ${e} id`);if(t.has(i.pid))throw new Error("player-ids csv: duplicate pid "+i.pid);const c=Wl(i.name,i.pos,i.team);if(r.has(c))throw new Error("player-ids csv: duplicate key "+c);t.add(i.pid),r.add(c),s.push(i)}return s}function l0(n){return new Map(n.map(e=>[Wl(e.name,e.pos,e.team),e.pid]))}const _l={QB:"QB",HB:"RB",FB:"FB",WR:"WR",TE:"TE",LT:"OT",RT:"OT",LG:"OG",RG:"OG",C:"C",DT:"DT",LEDG:"EDGE",REDG:"EDGE",MIKE:"ILB",WILL:"OLB",SAM:"OLB",CB:"CB",SS:"SS",FS:"FS",K:"K",P:"P",LS:"LS"},i0=n=>_l[n];function Kr(n,e){const a=[],s=n.split(/\r?\n/).filter(t=>t.trim().length>0);if(s[0].trim()!=="name,pos,team,ovr,spd,str")throw new Error("players csv: unexpected header: "+s[0]);for(let t=1;t<s.length;t++){const r=/^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(s[t]);if(!r)throw new Error(`players csv line ${t+1}: cannot parse: ${s[t]}`);const[,o,l,i,c,u,h]=r,m=_l[l];if(!m)throw new Error(`players csv line ${t+1}: unknown position ${l}`);a.push({id:`${o}|${l}|${i}`,name:o,pos:l,role:m,team:i,ovr:+c,spd:+u,str:+h,freeAgent:e})}return a}function c0(n,e,a){const s=[...Kr(n,!1),...Kr(e,!0)],t=l0(o0(a)),r=new Set,o=new Set;return s.map(l=>{if(o.has(l.id))throw new Error("duplicate player "+l.id);o.add(l.id);const i=t.get(l.id);if(!i)throw new Error("no stable id for "+l.id+" (run tools/player-ids.ts sync)");if(r.has(i))throw new Error("duplicate pid "+i);return r.add(i),{...l,id:i}})}function Gl(n){let e=2166136261;for(let a=0;a<n.length;a++)e^=n.charCodeAt(a),e=Math.imul(e,16777619)>>>0;return e>>>0}function xe(n){let e=n>>>0,a=null;const s=()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296};return{next:s,int:(t,r)=>t+Math.floor(s()*(r-t+1)),normal:()=>{if(a!==null){const l=a;return a=null,l}let t=0,r=0;for(;t===0;)t=s();r=s();const o=Math.sqrt(-2*Math.log(t));return a=o*Math.sin(2*Math.PI*r),o*Math.cos(2*Math.PI*r)},pick:t=>t[Math.floor(s()*t.length)],fork:t=>xe((n^Gl(t))>>>0)}}function f0(n,e){return(n>>>0^Gl(e))>>>0}const Pl=Object.fromEntries(Le.map(n=>[n.id,n.dest])),rr=new Set(Le.map(n=>n.id));function u0(n){return n.filter(e=>e.role!=="LS").map(e=>[e.id,e.name,e.pos,e.team,e.ovr,e.spd,e.str,e.freeAgent?1:0])}function or(n){return n.map(([e,a,s,t,r,o,l,i])=>{const c=i0(s);if(!c)throw new Error("save: unknown position "+s);return{id:e,name:a,pos:s,role:c,team:t,ovr:r,spd:o,str:l,freeAgent:i===1}})}function d0(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("save: not an object");const e=Ll(n);if(e)throw new Error("save: "+e);const a=n;if(a.picks.length>1024)throw new Error("save: too many picks");if(!a.picks.every(s=>rr.has(s.slot)))throw new Error("save: bad pick slot");return{seed:a.seed,userTeam:a.userTeam,picks:a.picks.map(s=>({overall:s.overall,team:s.team,pid:s.pid,slot:s.slot})),pool:a.pool.map(s=>[...s])}}const Ls=(n,e,a,s)=>({seed:e,userTeam:a,pool:s,picks:n.log.map(t=>({overall:t.overall,team:t.team,pid:t.player.id,slot:t.slot}))});function $a(n){const e=Xf(or(n.pool),xe(n.seed).fork("draft"));for(const a of n.picks){if(e.pos>=e.order.length)throw new Error("save: more picks than the draft has");if(a.overall!==e.pos+1||a.team!==e.order[e.pos])throw new Error("save: pick "+a.overall+" is out of order");const s=e.pool.find(r=>r.id===a.pid);if(!s)throw new Error("restore: player not available: "+a.pid);const t=rr.has(a.slot)?Pl[a.slot]:void 0;if(!t||!He(s.role,t).legal)throw new Error("restore: illegal fit");$s(e,a.team,s,a.slot)}return e}function ft(n,e,a){const s=xe(e).fork("cpu");for(;n.pos<n.order.length;){const t=n.order[n.pos];if(t===void 0||t===a)break;const r=Fl(n,t,s.fork("p"+n.pos));$s(n,t,r.player,r.slot)}}function p0(n){let e={record:null,draft:null,status:"idle",error:null};const a=new Set,s=o=>{e=o,a.forEach(l=>l(e))},t=(o,l)=>{const i=$a(l);return{record:l,draft:i,status:i.pos>=i.order.length?"done":"drafting",error:null}};return{getState:()=>e,dispatch:o=>{try{if(o.type==="START"){if(!Number.isInteger(o.seed)||!Number.isInteger(o.userTeam)||o.userTeam<0||o.userTeam>31)throw new Error("start: bad seed or team");const l=u0(n),i=$a({seed:o.seed,userTeam:o.userTeam,picks:[],pool:l});ft(i,o.seed,o.userTeam),s(t(i,Ls(i,o.seed,o.userTeam,l)))}else if(o.type==="LOAD"){const l=d0(o.record),i=$a(l);ft(i,l.seed,l.userTeam),s(t(i,Ls(i,l.seed,l.userTeam,l.pool)))}else{if(!e.record||!e.draft)throw new Error("no draft in progress");if(o.type==="PICK"){const{record:l,draft:i}=e;if(i.pos>=i.order.length||i.order[i.pos]!==l.userTeam)throw new Error("it is not your pick");if(!rr.has(o.slot))throw new Error("bad slot");const c=$a(l),u=c.pool.find(m=>m.id===o.playerId);if(!u)throw new Error("player not available: "+o.playerId);const h=Pl[o.slot];if(!h||!He(u.role,h).legal)throw new Error("illegal fit");$s(c,l.userTeam,u,o.slot),ft(c,l.seed,l.userTeam),s(t(c,Ls(c,l.seed,l.userTeam,l.pool)))}else if(o.type==="UNDO"){const l=e.record,i=l.picks.map(h=>h.team).lastIndexOf(l.userTeam);if(i<0)throw new Error("nothing to undo");const c={...l,picks:l.picks.slice(0,i)},u=$a(c);s(t(u,Ls(u,l.seed,l.userTeam,l.pool)))}}}catch(l){console.warn("store: action rejected:",o.type,l.message),s({...e,error:l.message})}},subscribe:o=>(a.add(o),()=>a.delete(o))}}ar("nfl","draft");function h0(n){return{...n,pool:n.pool.slice(),rosters:n.rosters.map(e=>({...e})),log:[],repl:{...n.repl}}}function m0(n,e,a,s=30){if(n.order[n.pos]!==e)throw new Error("goneOdds: it is not the user's pick");let t=n.pos+1;for(;t<n.order.length&&n.order[t]!==e;)t++;const r=t-(n.pos+1),o=new Map;if(r<=0||t>=n.order.length)return{picksBetween:Math.max(0,r),sims:s,gone:o};for(let l=0;l<s;l++){const i=h0(n);i.pos=n.pos+1;const c=a.fork("gone"+l);for(let u=i.pos;u<t;u++){const h=i.order[u],m=Fl(i,h,c);$s(i,h,m.player,m.slot)}for(const u of i.log)o.set(u.player.id,(o.get(u.player.id)??0)+1)}for(const[l,i]of o)o.set(l,i/s);return{picksBetween:r,sims:s,gone:o}}const v0=(n,e)=>n.gone.get(e)??0;function g0(n){if(!Number.isFinite(n))throw new Error("goneDisplay: not a number: "+n);const e=Math.round(Math.min(1,Math.max(0,n))*100);return Math.min(99,e)}function Kn(n){if(!Number.isFinite(n))throw new Error("showInt: not a number: "+n);const e=Math.sign(n)*Math.round(Math.abs(n));return String(e===0?0:e)}function Cs(n,e){if(!Number.isFinite(e))throw new Error("showDecimal: not a number: "+e);const a=Math.sign(e)*Math.round(Math.abs(e)*10)/10;return(a===0?0:a).toFixed(1)}const We=["East","North","South","West"],$e=(n,e,a)=>a.map(s=>({name:s,conf:n,div:e})),hn=[...$e("AFC","East",["Buffalo Bills","Miami Dolphins","New England Patriots","NY Jets"]),...$e("AFC","North",["Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers"]),...$e("AFC","South",["Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans"]),...$e("AFC","West",["Denver Broncos","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers"]),...$e("NFC","East",["Dallas Cowboys","NY Giants","Philadelphia Eagles","Washington Commanders"]),...$e("NFC","North",["Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings"]),...$e("NFC","South",["Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers"]),...$e("NFC","West",["Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks"])],nt=Object.fromEntries(hn.map(n=>[n.name,n]));function Ca(n,e){return hn.filter(a=>a.conf===n&&a.div===e).map(a=>a.name)}function B0(n){const e=n.length;for(const i of n)if(i.length!==e)throw new Error("hungarian: matrix must be square");const a=Number.POSITIVE_INFINITY,s=new Array(e+1).fill(0),t=new Array(e+1).fill(0),r=new Array(e+1).fill(0),o=new Array(e+1).fill(0);for(let i=1;i<=e;i++){r[0]=i;let c=0;const u=new Array(e+1).fill(a),h=new Array(e+1).fill(!1);do{h[c]=!0;const m=r[c];let d=a,p=0;for(let v=1;v<=e;v++){if(h[v])continue;const g=n[m-1][v-1]-s[m]-t[v];g<u[v]&&(u[v]=g,o[v]=c),u[v]<d&&(d=u[v],p=v)}for(let v=0;v<=e;v++)h[v]?(s[r[v]]+=d,t[v]-=d):u[v]-=d;c=p}while(r[c]!==0);do{const m=o[c];r[c]=r[m],c=m}while(c!==0)}const l=new Array(e).fill(-1);for(let i=1;i<=e;i++)r[i]>0&&(l[r[i]-1]=i-1);return l}const _t=70,C0=1e12,T0=1e7,y0=1e5,S0=.00254/20;function k0(n,e,a,s=0){const t=n.length,r=e.length,o=t+r,l=[];for(let m=0;m<o;m++){const d=new Array(o).fill(0);for(let p=0;p<r;p++)if(m<t){const v=He(n[m].role,e[p].dest);d[p]=v.legal?-(T0+e[p].weight*(n[m].ovr-v.penalty))+(v.emergency?y0:0)-(a?.get(n[m].id)===e[p].slot?s:0):C0}else d[p]=-e[p].weight*_t;l.push(d)}const i=B0(l),c=e.map(m=>({slot:m,player:null,effOvr:_t,penalty:0,emergency:!1})),u=[];for(let m=0;m<t;m++){const d=i[m];if(d>=r){u.push(n[m]);continue}const p=He(n[m].role,e[d].dest);c[d]={slot:e[d],player:n[m],effOvr:n[m].ovr-p.penalty,penalty:p.penalty,emergency:p.emergency}}const h=c.reduce((m,d)=>m+d.slot.weight*d.effOvr,0);return{placements:c,bench:u,value:h,emergencyFills:c.filter(m=>m.emergency).length}}function Nl(n,e){return{base:e,...k0(n,bl(e))}}const ut=Object.fromEntries(Le.map(n=>[n.id,n.dest])),D0=Object.fromEntries(bl("4-3").map(n=>[n.slot,n.label])),Vs=n=>D0[n]??n,xr=n=>n.startsWith("-")?n:"+"+n,w0=(n,e)=>n===2||n===4||n>4&&e>20;function R0(n,e,a,s={}){const t=s.sort??"wins",r=s.limit??60,o=Xs(n),l=new Set(ws(n.rosters[e])),i=new Map;for(const d of Wt(n,e))(i.get(d.player.id)??i.set(d.player.id,[]).get(d.player.id)).push(d);const c=[];for(const d of i.values()){const v=d.filter(S=>He(S.player.role,ut[S.slot]).penalty===0).sort((S,F)=>F.wins-S.wins)[0]??d.slice().sort((S,F)=>F.wins-S.wins)[0],g=v.player,C=v.wins*S0,T=v0(a,g.id),w=C*T,k=d.filter(S=>S.slot!==v.slot&&l.has(S.slot)).map(S=>({c:S,pen:He(S.player.role,ut[S.slot]).penalty})).filter(S=>w0(S.pen,o)).sort((S,F)=>F.c.wins-S.c.wins).map(S=>({slotId:S.c.slot,slotLabel:Vs(S.c.slot),flex:S.pen===0?"":`-${S.pen} flex`}));c.push({id:g.id,name:g.name,pos:g.pos,nflTeam:g.team,ovr:Kn(g.ovr),slotId:v.slot,slotLabel:Vs(v.slot),natural:He(g.role,ut[v.slot]).penalty===0,wins:xr(Cs("wins",C)),priority:xr(Cs("priority",w)),gone:g0(T)+"%",alsoFits:k,tone:C>.05?"good":C<-.05?"bad":"neutral",_w:C,_p:w})}const u=d=>t==="ovr"?Number(d.ovr):t==="priority"?d._p:d._w;c.sort((d,p)=>u(p)-u(d)||(d.id<p.id?-1:1));const h=n.pos+1,m=is.length-l.size;return{header:{teamName:hn[e].name,round:o,roundLabel:`Round ${o}`,pickInRound:n.pos%32+1,overall:h,totalPicks:n.order.length,onClock:`You're on the clock: Round ${o}, Pick ${n.pos%32+1} (overall ${h} of ${n.order.length})`},rows:c.slice(0,r).map(({_w:d,_p:p,...v})=>v),footer:{filled:m,total:is.length,text:`${m} of ${is.length} starters`},sort:t}}const E0={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},Fe={olRun:{OT1:.579,OT2:.348,OG1:.705,OG2:.441,C:.263,TE1:1.436,FB:.188},olPass:{OT1:.812,OT2:.488,OG1:.588,OG2:.368,C:.221},rb:{RB1:43.113,RB2:12.177},qb:{QB:1},rec:{WR1:25.682,WR2:19.86,WR3:3.251,TE1:2.174,RB1:4.201,TE3:1.264,WR4:1.6},passRush:{DE1:.583,DE2:.255,DT1:.303,DT2:.182,MIKE:.053,WILL:.03,DL5:.114},frontRun:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.234,SS:.115,CB1:.06,CB2:.034,CB3:.009,FS:.08,DL5:.099},coverage:{CB1:.175,CB2:.107,CB3:.041,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.1},kicker:{K:1}},Ea={frontBase:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.334,SS:.115,CB1:.06,CB2:.034,CB3:.005,FS:.08,DL5:.099},frontNick:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.032,SS:.115,CB1:.062,CB2:.048,CB3:.009,FS:.08,DL5:.099},covBase:{CB1:.175,CB2:.107,CB3:.011,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.135},covNick:{CB1:.175,CB2:.107,CB3:.045,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.017},covDime:{CB1:.175,CB2:.107,CB3:.045,DIME:.184,SS:.113,FS:.122,MIKE:.069}},ts={12:{WR1:25.682,WR2:27.236,TE1:2.174,TE2:22.844,RB1:4.201},13:{WR1:25.682,TE1:2.174,TE2:22.844,TE3:15.173,RB1:4.201},21:{WR1:25.682,WR2:27.236,TE1:2.174,RB1:4.201,RB2:12.177},22:{WR1:25.682,TE1:2.174,TE2:22.844,RB1:4.201,RB2:12.177}},Il={RB1:44.218,RB2:30.441},ha={11:{label:"11 personnel",run:0,runB:0,passB:0,heavy:0,tbw:0,pc:0},12:{label:"12 personnel",run:.03,runB:.03,passB:-.015,heavy:.5,tbw:.08,pc:.22},13:{label:"13 personnel",run:.06,runB:.055,passB:-.035,heavy:1,tbw:.14,pc:.42},21:{label:"21 personnel",run:.05,runB:.04,passB:-.03,heavy:.6,tbw:.03,pc:.38},22:{label:"22 personnel",run:.08,runB:.07,passB:-.045,heavy:1,tbw:.1,pc:.48}},lr={run:{label:"run-heavy",s:.08},neutral:{label:"balanced",s:0},pass:{label:"pass-heavy",s:-.08}},ir={run:{label:"run-defense",f:1},neutral:{label:"balanced",f:0},pass:{label:"pass-defense",f:-1}},An={kRun:1.4,kPass:.85,kTo:1,kSack:.9,rAmp:3,pAmp:2.5,vm:1.3,kBlock:1,predict:.38,defPredict:.15,baseRunPct:.39,nickRun:.05,baseRunVsHeavy:-.025,basePass:.03,defFront:2,defCov:1.5,defRush:.6,pkgFront:.8,pkgCov:.8},Tn={rb:.0208,olRun:.0495,front:.05577,qb:.00655,rec:.02045,olPass:.01403,rush:.01579,cov:.0184,lean:.013,toQb:.01471,toCov:.0204,toRush:.0105,skRush:.0268,skOl:.0336,skCov:.012,kick:.01215},ba=105,Aa=220,cs=.04,fs=.07,us=3,ds=.8,Ja=1.2,Ma=2.2,Ys=21.5,Hl=1.7,Kl=6,xl=2.36,cr=82,Ol=.0194,Vl=.01147,fa=[1,1,1],Yl=.542,Gt=.15,L0=32.5,b0=17,A0=Object.freeze(Object.defineProperty({__proto__:null,BASE_PTS:Ys,DEF_FOCUS:ir,DEF_SPECS:Ea,DIME_W:Gt,GAMES:b0,HOME_FIELD:Hl,LAM_SACK:Ma,LAM_TO:Ja,MC:Tn,PASS_BASE:Aa,PERS:ha,PERS_REC:ts,PLAN_K:An,POINTS_PER_WIN:L0,PTS_NOISE:Kl,PT_PASS:fs,PT_RUSH:cs,PT_SACK:ds,PT_TO:us,PUNT_PTS:Yl,QB_RUN_C:Ol,RATING_SPECS:Fe,RB_HEAVY:Il,RET_NEUTRAL:cr,RET_PTS:xl,RUSH_BASE:ba,STRAT:lr,WR_BLK_C:Vl,WR_BLK_W:fa},Symbol.toStringTag,{value:"Module"}));function J0(n){return n.placements.map(e=>({row:e.slot.row,ovr:e.effOvr}))}function M0(n,e){let a=0,s=0;for(const t of n){const r=e[t.row];r!==void 0&&(a+=t.ovr*r,s+=r)}if(s===0)throw new Error("wavg: no spot matches the spec");return a/s}function ia(n,e){const a=n.find(s=>s.row===e);return a?a.ovr:_t}function F0(n,e=cr){const a=o=>M0(n,o),s={TE1:ia(n,"TE1"),TE2:ia(n,"TE2"),P:ia(n,"P"),QB:ia(n,"QB"),WR1:ia(n,"WR1"),WR2:ia(n,"WR2"),WR3:ia(n,"WR3")},t=a(Fe.rec),r={olRun:a(Fe.olRun),olPass:a(Fe.olPass),rb:a(Fe.rb),qb:a(Fe.qb),rec:t,passRush:a(Fe.passRush),frontRun:a(Fe.frontRun),coverage:a(Fe.coverage),kicker:a(Fe.kicker),rec12:a(ts[12]),rec13:a(ts[13]),rec21:a(ts[21]),rec22:a(ts[22]),rec11:t,frontBase:a(Ea.frontBase),frontNick:a(Ea.frontNick),covBase:a(Ea.covBase),covNick:a(Ea.covNick),covDime:a(Ea.covDime),te1:s.TE1,te2:s.TE2,rbHeavy:a(Il),ret:e,p:s.P,qbRunR:s.QB,wrBlk:(s.WR1*fa[0]+s.WR2*fa[1]+s.WR3*fa[2])/(fa[0]+fa[1]+fa[2]),passOff:0,runOff:0,off:0,def:0};return r.passOff=.45*r.qb+.3*r.rec+.25*r.olPass,r.runOff=.35*r.rb+.65*r.olRun,r.off=.6*r.passOff+.4*r.runOff,r.def=.55*(.5*r.passRush+.5*r.coverage)+.45*r.frontRun,r}function fr(n){if(!n.length)throw new Error("leagueBaseline: no teams");const e=Object.keys(n[0]),a={};for(const s of e)a[s]=n.reduce((t,r)=>t+r[s],0)/n.length;return a}const W0=["RB1","RB2","WR1","WR2","WR3","TE1","TE2","MIKE","WILL","SAM","CB1","CB2","CB3","SS","FS"],dt={spd:.8,ovr:.1,str:.1};function _0(n){return Math.min(99,n.spd*dt.spd+n.ovr*dt.ovr+n.str*dt.str)}function G0(n){const e=[];for(const a of n.placements)a.player&&W0.includes(a.slot.slot)&&e.push({slot:a.slot.slot,player:a.player,value:_0(a.player)});return e.sort((a,s)=>s.value-a.value||(a.player.id<s.player.id?-1:1))}function zl(n,e){const a=G0(n);return a.find(s=>s.player.id===e)??a[0]??null}function P0(n,e){return zl(n,e)?.value??cr}const zs={pers:"11",strat:"neutral"},Qs={pkg:"nickel",focus:"neutral"},N0={off:zs,def:Qs},Ql=["11","12","13","21","22"].flatMap(n=>["run","neutral","pass"].map(e=>({pers:n,strat:e}))),jl=["base","nickel"].flatMap(n=>["run","neutral","pass"].map(e=>({pkg:n,focus:e})));function I0(n){return ha[n.pers].run+lr[n.strat].s}function H0(n){const e=1/(1+.2316419*Math.abs(n)),s=.3989423*Math.exp(-n*n/2)*e*(.3193815+e*(-.3565638+e*(1.781478+e*(-1.821256+e*1.330274))));return n>0?1-s:s}function ee(n,e,a){return Math.min(a,Math.max(e,n))}function Da(n,e,a){const s=n>=0?a:-e,t=.6*s,r=Math.abs(n);if(r<=t)return n;const o=t+(s-t)*Math.tanh((r-t)/(s-t));return n>=0?o:-o}function Or(n,e){const a=e.pers,s={...n};a!=="11"&&(s.rec=n["rec"+a]),(a==="21"||a==="22")&&(s.rb=n.rbHeavy);const t=a==="13"?(n.te2+70)/2:a==="12"||a==="22"?(n.te1+n.te2)/2:n.te1;return s.olRun=n.olRun+ha[a].tbw*(t-75)*An.kBlock,s}function Vr(n,e,a){const s=ir[e.focus].f,t=e.pkg==="nickel",r={...n};return r.frontRun=(t?n.frontNick:n.frontBase)+(a?0:(t?-An.pkgFront:An.pkgFront)+An.defFront*s),r.coverage=(t?n.covNick:n.covBase)+(a?0:(t?An.pkgCov:-An.pkgCov)-An.defCov*s),r.passRush=n.passRush-(a?0:An.defRush*s),r.coverage=(1-Gt)*r.coverage+Gt*n.covDime,r}function Pe(n,e,a,s=N0){const t=s.off,r=s.def,o=Or(n,t),l=Or(a,t),i=Vr(e,r,!1),c=Vr(a,r,!0),u=I0(t),h=1+An.rAmp*u,m=1-An.pAmp*u,d=o.rb-l.rb,p=o.olRun-l.olRun,v=o.qb-a.qb,g=o.rec-l.rec,C=o.olPass-a.olPass,T=o.kicker-a.kicker,w=i.frontRun-c.frontRun,k=i.passRush-c.passRush,S=i.coverage-c.coverage,F=Tn.lean*(.35*(n.rb-a.rb)+.65*(n.olRun-a.olRun)-(.45*v+.3*(n.rec-a.rec)+.25*C)),G=ha[t.pers].heavy,J=r.pkg==="nickel",E=ha[t.pers].runB+An.kRun*u+(J?An.nickRun*G:An.baseRunVsHeavy*G),R=ha[t.pers].passB-An.kPass*u+(J?0:An.basePass*(1-G)),I=[["rb","off",Tn.rb*d*h],["olRun","off",Tn.olRun*p*h],["frontRun","def",-Tn.front*w*h],["lean","off",F],["scheme","off",E]],P=[["qb","off",Tn.qb*v*m],["rec","off",Tn.rec*g*m],["olPass","off",Tn.olPass*C*m],["passRush","def",-Tn.rush*k*m],["coverage","def",-Tn.cov*S*m],["lean","off",-F],["scheme","off",R]],x=[["qb","off",-Tn.toQb*v],["coverage","def",Tn.toCov*S],["passRush","def",Tn.toRush*k],["scheme","off",-An.kTo*u]],Q=[["passRush","def",Tn.skRush*k],["olPass","off",-Tn.skOl*C],["coverage","def",Tn.skCov*S],["scheme","off",-An.kSack*u]],$=Fn=>Fn.reduce((Un,re)=>Un+re[2],0),en=Da(Tn.rb*d+Tn.olRun*p,-1.1,.4),tn=Da(Tn.qb*v+Tn.rec*g+Tn.olPass*C,-.8,.27),O=Da(en*h+F+E,-1.3,.33)-Tn.front*w*h,q=Da(tn*m-F+R,-1,.29)-(Tn.rush*k+Tn.cov*S)*m,j=Da($(x),-.7,.7),Y=Da($(Q),-.8,.4),U=ba*Math.exp(O),b=Aa*Math.exp(q),_=Ja*Math.exp(j),z=Ma*Math.exp(Y),V=Tn.kick*T,nn=xl*(Math.exp((n.ret-82)/45)-Math.exp((a.ret-82)/45)),Z=Ol*(n.qbRunR-a.qbRunR),on=Vl*(n.wrBlk-a.wrBlk),mn=-Yl*(Math.exp((e.p-80)/45)-Math.exp((a.p-80)/45)),En={},pn=(Fn,Un,re)=>{for(const[fe,ue,Vn]of Fn){if(fe==="lean"||fe==="scheme")continue;const Ae=Un(Vn),ve=fe+"|"+ue,ge=En[ve]??={unit:fe,owner:ue,pts:0,kinds:{}},Je=ue==="off"?Ae:-Ae;ge.pts+=Je,ge.kinds[re]=(ge.kinds[re]??0)+Je}};pn(I,Fn=>cs*ba*(Math.exp(Fn)-1),"ground game"),pn(P,Fn=>fs*Aa*(Math.exp(Fn)-1),"passing game"),pn(x,Fn=>-us*Ja*(Math.exp(Fn)-1),"turnovers"),pn(Q,Fn=>-ds*Ma*(Math.exp(Fn)-1),"sacks"),Math.abs(V)>.01&&(En["kicker|off"]={unit:"kicker",owner:"off",pts:V,kinds:{"field goals":V}});const Xn=An.predict*Math.pow(lr[t.strat].s/.08,2)-An.defPredict*Math.abs(ir[r.focus].f)+ha[t.pers].pc,ce=nn+mn+Z+on,Ln=Ys+cs*(U-ba)+fs*(b-Aa)-us*(_-Ja)-ds*(z-Ma)+V+ce-Xn,Mn={run:cs*(U-ba)+Z+on,pass:fs*(b-Aa),to:-us*(_-Ja),sack:-ds*(z-Ma),kick:V,plan:-Xn},be=ee(1-An.vm*u,.7,1.2);return{expRush:U,expPass:b,lamTO:_,lamSack:z,structPts:Ln,extraPts:ce,channels:Mn,swings:Object.values(En),sd:8*be,vm:be,sT:u,planCost:Xn,plan:{off:t,def:r}}}function Yr(n,e,a){return a?Math.max(...Ql.map(s=>Pe(n,e,e,{off:s,def:Qs}).structPts)):-Math.min(...jl.map(s=>Pe(e,n,e,{off:zs,def:s}).structPts))}function zr(n,e){return Yr(n,e,!0)+Yr(n,e,!1)}const K0=[3.27,5.78,5.88,5.85,5.91,5.93,5.2,5.41,5.17,4.48,4.26,16,26.85],x0=[.3,4.62,4.99,14.52,4.91,4.77,7.37,7.3,4.69,2.01,5.29,9.98,29.26],Qr=5.88,O0=[.073,0,0,.396,.073,0,.292,.157,0,0,0,.008,0],Ul=n=>{const e=n.reduce((a,s)=>a+s,0);return n.map(a=>a/e)},jr=Ul(x0.map((n,e)=>e===0?Qr:Math.max(0,n-Qr*O0[e]))),pt=Ul(K0),V0=(()=>{const n=pt.length,e=[0],a=[0];for(let s=0;s<n;s++)e.push(e[s]+pt[s]),a.push(a[s]+jr[s]);return pt.map((s,t)=>jr.map((r,o)=>s===0?t===o?1:0:Math.max(0,Math.min(e[t+1],a[o+1])-Math.max(e[t],a[o]))/s))})(),Ur=n=>n<=10?n:n<=14?11:12,qr=n=>n===0||n===3||n>=6;function Y0(n,e,a){if(a===0)return[n,n];let s=[n,e],t=1/0;for(let r=0;r<=45;r++){const o=r+a;if(!qr(r)||!qr(o)||o>58)continue;const l=o+r-(n+e),i=1.5*Math.abs(l)+(l<0?1.5*-l:0)+Math.abs(o-n)+Math.abs(r-e);i<t&&(t=i,s=[o,r])}return s}function z0(n,e,a,s){const t=n===e?a:n>e,r=t?n:e,o=t?e:n,l=r-o,i=Ur(l);let c=s.next(),u=0;const h=V0[i];for(;u<h.length-1&&(c-=h[u],!(c<0));u++);let m;u<=10?m=u:u===11?m=Ur(l)===11?l:s.int(11,14):m=l>=15?l:s.int(15,24);const[d,p]=Y0(r,o,m);return t?[d,p]:[p,d]}const Ce=n=>n==="home"?"away":"home";function js(n,e){if(e<=0)return 0;const a=Math.exp(-e);let s=0,t=1;do s++,t*=n.next();while(t>a);return s-1}function Yn(n,e){return n.next()<e}function ql(n,e){let a=0;for(const t of e)a+=t;let s=n.next()*a;for(let t=0;t<e.length;t++)if(s-=N(e,t),s<0)return t;return e.length-1}function Zl(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=N(e,a);e[a]=N(e,s),e[s]=t}return e}function Ga(n,e){const a=e.reduce((l,i)=>l+i,0),s=e.map(l=>n*l/a),t=s.map(Math.floor);let r=n-t.reduce((l,i)=>l+i,0);const o=s.map((l,i)=>[l-N(t,i),i]).sort((l,i)=>i[0]-l[0]);for(let l=0;r>0;l++,r--){const i=N(o,l%o.length)[1];t[i]=N(t,i)+1}return t}function Zr(n,e){return n===1?Yn(e,.5)?0:3:n===2?3:n===4?Yn(e,.5)?3:6:n===5?Yn(e,.5)?6:3:n}const bs=n=>n===0||n===3||n>=6;function Xr(n,e){return{rush:ee(Math.round(n.expRush*Math.exp(.3*e.normal()-.045)),15,345),pass:ee(Math.round(n.expPass*Math.exp(.26*n.vm*e.normal()-.0338*n.vm*n.vm)),45,520),to:ee(js(e,n.lamTO),0,6),sacks:ee(js(e,n.lamSack),0,9)}}const Q0=n=>n==="xp"?1:n==="two"?2:0;function $r(n,e,a){let s=0;for(let v=0;v<e;v++)Yn(a,.12)&&s++;for(;s>0&&!bs(n-7*s);)s--;let t=Yn(a,.035)&&bs(n-7*s-2)?1:0;const r=n-7*s-2*t;bs(r)||(t=0,s=0);const o=n-7*s-2*t;if(!bs(o))throw new Error("decompose: cannot score "+n);const l=o*.24/3,i=[];for(let v=0;3*v<=o;v++){const g=o-3*v;if(!(g!==0&&g<6))for(let C=Math.ceil(g/8);6*C<=g;C++){const T=g-6*C,w=Math.max(T-C,0),k=T-2*w,S=C-k-w;S<0||i.push({b:v,n:C,w:Math.exp(-.5*((v-l)/1)**2)*Math.exp(-1.4*S)+1e-6})}}const c=N(i,ql(a,i.map(v=>v.w))),u=o-3*c.b,h=u-6*c.n;let m=Math.max(h-c.n,0),d=h-2*m;for(;d>=2&&m+d-1<=c.n&&Yn(a,.22);)d-=2,m+=1;const p=[];for(let v=0;v<d;v++)p.push("xp");for(let v=0;v<m;v++)p.push("two");for(let v=p.length;v<c.n;v++)p.push(Yn(a,.6)?"xp_miss":"two_fail");return{td:c.n,fg:c.b,convs:Zl(a,p),dTD:s,sf:t}}function j0(n,e){return e<4?1:n<=-9?.55:n<=-4?.75:n>=17?1.85:n>=9?1.55:n>=4?1.25:n<=-1?.9:n>=1?1.1:1}const ht={TD:68,FG:46,FG_MISS:44,PUNT:24,INT:26,FUM:25,DOWNS:32,HALF:24,SAFETY:14},no={TD:1,FG:3,FG_MISS:3,PUNT:3,INT:2,FUM:2,DOWNS:4,HALF:2,SAFETY:2};function eo(n,e,a,s,t,r,o,l,i){const c=[];n.convs.forEach(d=>c.push({end:"TD",conv:d}));for(let d=0;d<n.fg;d++)c.push({end:"FG"});for(let d=0;d<t;d++)c.push({end:"FG_MISS"});for(let d=0;d<e;d++)c.push({end:Yn(l,.65)?"INT":"FUM",defTD:d<a.dTD});for(let d=0;d<a.sf;d++)c.push({end:"SAFETY"});for(let d=0;d<s;d++)c.push({end:"DOWNS"});const u=new Array(r).fill(null),h=[i[0]?o-1:-1,i[1]?r-1:-1];for(const d of h)d>=0&&c.length<r-1&&(u[d]={end:"HALF"});Zl(l,c);let m=0;for(let d=0;d<r;d++)u[d]||(u[d]=m<c.length?N(c,m++):{end:"PUNT"});return u}function ao(n,e,a,s,t){return n.td+n.fg+t+e+a.sf+s}function Xl(n,e,a,s){const t=s.homeField??Hl,r=a.fork("aggregates"),o={home:Xr(n,r),away:Xr(e,r)},l=(b,_,z)=>ee(Ys+z+cs*(_.rush-ba)+fs*(_.pass-Aa)-us*(_.to-Ja)-ds*(_.sacks-Ma)+b.channels.kick+b.extraPts-b.planCost+Kl*b.vm*r.normal(),0,58),i=l(n,o.home,t),c=l(e,o.away,0),u=[Zr(Math.round(i),r),Zr(Math.round(c),r)],[h,m]=z0(u[0],u[1],i>=c,a.fork("margin")),d=a.fork("drives"),p={home:$r(h,o.away.to,d),away:$r(m,o.home.to,d)},v={home:js(d,.35),away:js(d,.35)},g={home:0,away:0};for(const b of["home","away"])for(let _=0;_<p[b].fg;_++)Yn(d,.176)&&g[b]++;const C=ee(Math.round(10.8+.9*d.normal()),9,13),T=Math.max(C,ao(p.home,o.home.to,p.away,v.home,g.home)+1,ao(p.away,o.away.to,p.home,v.away,g.away)+1),w=T%2===0?ee(T/2+d.pick([-1,0,0,1]),3,T-3):Yn(d,.5)?(T-1)/2:(T+1)/2,k=Yn(d,.5)?"home":"away",S=[Yn(d,.55),Yn(d,.55)],F=Ce(k),G=k,J=b=>[S[0]&&F===b,S[1]&&G===b],E={home:eo(p.home,o.home.to,p.away,v.home,g.home,T,w,d,J("home")),away:eo(p.away,o.away.to,p.home,v.away,g.away,T,w,d,J("away"))},R=[],I={home:0,away:0};for(let b=0;b<2;b++){const _=b===0?w:T-w,z=b===0?k:Ce(k);for(let V=0;V<_;V++)for(const nn of[z,Ce(z)])R.push({side:nn,idx:I[nn]++,half:b})}const P=R.map(b=>{const _=N(E[b.side],b.idx);return{side:b.side,period:1,start:0,secs:0,plays:0,rush:0,pass:0,sacks:0,end:_.end,pts:_.end==="TD"?6+Q0(_.conv):_.end==="FG"?3:0,..._.conv!==void 0?{conv:_.conv}:{},oppPts:_.end==="SAFETY"?2:_.defTD?7:0,defTD:!!_.defTD}}),x=new Map;{const b={home:0,away:0};P.forEach((_,z)=>{x.set(_,j0(b[_.side]-b[Ce(_.side)],1+Math.floor(z/P.length*4))),b[_.side]+=_.pts,b[Ce(_.side)]+=_.oppPts})}for(const b of["home","away"]){const _=P.map((on,mn)=>[on,mn]).filter(([on])=>on.side===b).map(([on])=>on),z=_.map(on=>ht[on.end]*Math.exp(.5*d.normal())*x.get(on)),V=_.map(on=>ht[on.end]*Math.exp(.5*d.normal())/x.get(on)),nn=Ga(o[b].rush,z),Z=Ga(o[b].pass,V);_.forEach((on,mn)=>{on.rush=N(nn,mn),on.pass=N(Z,mn)}),_.forEach(on=>{on.plays=ee(Math.max(no[on.end],Math.round((on.rush+on.pass)/5.15+.9*d.normal())),1,22)});for(let on=0;on<o[b].sacks;on++){const mn=ql(d,_.map(pn=>pn.plays)),En=N(_,mn);En.sacks>=En.plays-1&&En.plays++,En.sacks++}}let Q=0;for(let b=0;b<2;b++){const _=P.filter((V,nn)=>N(R,nn).half===b),z=Ga(1800,_.map(V=>V.plays*26*Math.exp(.28*d.normal())+(V.end==="HALF"?10:0)));_.forEach((V,nn)=>{V.start=Q,V.secs=N(z,nn),V.period=Math.min(4,Math.floor(Q/900)+1),Q+=N(z,nn)})}let $=h,en=m,tn=null,O=0;if(h===m){const b=a.fork("overtime"),_=Yn(b,.5)?"home":"away",z={home:0,away:0},V=s.otLimit??(s.playoff?900:600);let nn=5,Z=0;const on={home:n,away:e},mn=(Ln,Mn,be)=>{const Fn=on[Ln].structPts/Ys,Un=b.next(),re=ee(.27*Fn,.1,.5),fe=ee(.2*Math.sqrt(Fn),.08,.3),ue=ee(.11/Math.sqrt(Fn),.05,.2);let Vn="PUNT";Un<re?Vn="TD":Un<re+fe?Vn=Yn(b,.87)?"FG":"FG_MISS":Un<re+fe+ue?Vn=Yn(b,.65)?"INT":"FUM":Un<re+fe+ue+.03&&(Vn="DOWNS");const Ae=(Vn==="INT"||Vn==="FUM")&&Yn(b,.1);let ve=ee(Math.round(150+50*b.normal()),30,330);ve=Math.min(ve,Mn);const ge=Math.max(1,Math.round(ht[Vn]*Math.exp(.4*b.normal()))),Je=Math.round(ge*ee(.4+.1*b.normal(),.15,.7)),Ue=ge-Je;let Wn=0,$n;if(Vn==="TD"){const ne=be(6);$n=ne?"none":"xp",Wn=ne?6:7}else Vn==="FG"&&(Wn=3);return{side:Ln,period:nn,start:3600+O,secs:ve,plays:Math.max(no[Vn],Math.round(ge/5.3)),rush:Je,pass:Ue,sacks:0,end:Vn,pts:Wn,...$n!==void 0?{conv:$n}:{},oppPts:Ae?7:0,defTD:Ae}},En=Ln=>{P.push(Ln),O+=Ln.secs,Z+=Ln.secs,z[Ln.side]+=Ln.pts,z[Ce(Ln.side)]+=Ln.oppPts};let pn=!1;const Xn=mn(_,Math.min(330,V),()=>!1);if(En(Xn),Xn.oppPts>0&&(pn=!0),!pn){const Ln=z[_],Mn=mn(Ce(_),Math.max(30,V-Z),be=>be>Ln-z[Ce(_)]);En(Mn),(Mn.oppPts>0||z.home!==z.away)&&(pn=!0)}let ce=_;for(;!pn;){const Ln=V-Z;if(Ln<=0){if(s.playoff){nn++,Z=0;continue}break}const Mn=mn(ce,Ln,()=>!0);Mn.secs>=Ln&&Mn.pts===0&&Mn.oppPts===0&&(Mn.end="HALF"),En(Mn),(Mn.pts>0||Mn.oppPts>0)&&(pn=!0),ce=Ce(ce)}$+=z.home,en+=z.away,tn={first:_,periods:nn-4,tie:$===en}}const q=[];P.forEach((b,_)=>{b.pts>0&&q.push({side:b.side,kind:b.end==="TD"?"TD":"FG",pts:b.pts,...b.conv!==void 0?{conv:b.conv}:{},drive:_,period:b.period,at:b.start+b.secs}),b.oppPts>0&&q.push({side:Ce(b.side),kind:b.defTD?"DEF_TD":"SAFETY",pts:b.oppPts,drive:_,period:b.period,at:b.start+b.secs})});const j=()=>({rush:0,pass:0,yards:0,plays:0,giveaways:0,takeaways:0,sacksTaken:0,drives:0,top:0,fgMade:0,fgMissed:0}),Y={home:j(),away:j()};for(const b of P){const _=Y[b.side];_.rush+=b.rush,_.pass+=b.pass,_.yards+=b.rush+b.pass,_.plays+=b.plays,_.sacksTaken+=b.sacks,_.drives++,_.top+=b.secs,b.end==="FG"&&_.fgMade++,b.end==="FG_MISS"&&_.fgMissed++,(b.end==="INT"||b.end==="FUM")&&(_.giveaways++,Y[Ce(b.side)].takeaways++)}const U={home:o.home,away:o.away};return{homeScore:$,awayScore:en,regHome:h,regAway:m,drives:P,events:q,stats:Y,agg:U,ot:tn,otSecs:O}}function so(n,e,a){return H0((n.structPts-e.structPts+a)/Math.sqrt(n.sd*n.sd+e.sd*e.sd))}function to(n,e){let a=n[0],s=-1/0;for(const t of n){const r=e(t);r>s&&(s=r,a=t)}return{o:a,v:s}}function Pt(n,e){const a={off:zs,def:Qs};let s=zs,t=Qs;const r=p=>so(Pe(n,e,e,{off:p,def:a.def}),Pe(e,n,e,{off:a.off,def:t}),0),o=p=>so(Pe(n,e,e,{off:s,def:a.def}),Pe(e,n,e,{off:a.off,def:p}),0);for(let p=0;p<2;p++)s=to(Ql,r).o,t=to(jl,o).o;const l=n.rb-e.rb,i=n.olRun-e.olRun,c=n.qb-e.qb,u=n.rec-e.rec,h=n.olPass-e.olPass,m=.35*l+.65*i-(.45*c+.3*u+.25*h),d=n.frontRun-e.frontRun-(.5*(n.coverage-e.coverage)+.5*(n.passRush-e.passRush));return{off:s,def:t,tilt:m,tiltD:d}}const U0=[[["East","North"],["South","West"]],[["East","South"],["North","West"]],[["East","West"],["North","South"]]];function q0(n,e){const a=c=>{const u=e[c];if(u===void 0)throw new Error(`schedule: no rank for ${c}`);return u},s=(c,u)=>Ca(c,u).slice().sort((h,m)=>a(h)-a(m));for(const c of["AFC","NFC"])for(const u of We)if(Ca(c,u).map(m=>e[m]).sort().join()!=="1,2,3,4")throw new Error(`schedule: ranks in ${c} ${u} must be 1-4 once each`);const t=[];for(const c of["AFC","NFC"])for(const u of We){const h=s(c,u);for(let m=0;m<4;m++)for(let d=m+1;d<4;d++)t.push({home:N(h,m),away:N(h,d),kind:"div"}),t.push({home:N(h,d),away:N(h,m),kind:"div"})}const r=N(U0,(n%3+3)%3);for(const c of["AFC","NFC"])for(const[u,h]of r){const m=s(c,u),d=s(c,h);for(let p=0;p<4;p++)for(let v=0;v<4;v++)t.push((p+v+n)%2===0?{home:N(m,p),away:N(d,v),kind:"conf4"}:{home:N(d,v),away:N(m,p),kind:"conf4"})}const o=c=>(c+n)%4,l=c=>(c+n+1+Math.floor(n/4)%3)%4;We.forEach((c,u)=>{const h=s("AFC",c),m=s("NFC",N(We,o(u)));for(let d=0;d<4;d++)for(let p=0;p<4;p++)t.push((d+p+n)%2===0?{home:N(h,d),away:N(m,p),kind:"inter4"}:{home:N(m,p),away:N(h,d),kind:"inter4"})});for(const c of["AFC","NFC"]){const[[u,h],[m,d]]=r,p=[[u,m],[m,h],[h,d],[d,u]];for(const[v,g]of p){const C=s(c,v),T=s(c,g);for(let w=0;w<4;w++)t.push(n%2===0?{home:N(C,w),away:N(T,w),kind:"conf2"}:{home:N(T,w),away:N(C,w),kind:"conf2"})}}const i=n%2===0;return We.forEach((c,u)=>{const h=s("AFC",c),m=s("NFC",N(We,l(u)));for(let d=0;d<4;d++)t.push(i?{home:N(m,d),away:N(h,d),kind:"inter1"}:{home:N(h,d),away:N(m,d),kind:"inter1"})}),t}const Z0=[5,6,7,8,9,10,11,12,13,14],X0=[4,4,4,4,4,4,2,2,2,2];function $0(n,e,a,s=400){const t=q0(e,a),r=[...new Set(t.map(o=>o.home))];for(let o=0;o<s;o++){const l=nu(t,r,n);if(l)return l}throw new Error("schedule: no weekly assignment found")}function _s(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=N(e,a);e[a]=N(e,s),e[s]=t}return e}function nu(n,e,a){const s=new Array(n.length).fill(0),t=new Map;n.forEach((i,c)=>{if(i.kind==="div"){const u=[i.home,i.away].sort().join("|");(t.get(u)??t.set(u,[]).get(u)).push(c)}});for(const i of["AFC","NFC"])for(const c of We){const u=_s(a,Ca(i,c));for(const[h,m]of[[N(u,0),N(u,1)],[N(u,2),N(u,3)]]){const d=t.get([h,m].sort().join("|"));s[N(d,a.int(0,1))]=18}}const r=new Map,o=[];Z0.forEach((i,c)=>{for(let u=0;u<N(X0,c);u++)o.push(i)}),_s(a,o),_s(a,e.slice()).forEach((i,c)=>r.set(i,N(o,c)));const l=new Set(n.map((i,c)=>c).filter(i=>s[i]===0));for(let i=1;i<=17;i++){const c=e.filter(h=>r.get(h)!==i),u=eu(n,l,c,a);if(!u)return null;for(const h of u)s[h]=i,l.delete(h)}return l.size?null:n.map((i,c)=>({...i,week:N(s,c)}))}function eu(n,e,a,s){const t=new Set(a),r=new Map;for(const u of a)r.set(u,[]);for(const u of e){const h=N(n,u);t.has(h.home)&&t.has(h.away)&&(r.get(h.home).push(u),r.get(h.away).push(u))}const o=new Set,l=[];let i=0;const c=()=>{if(++i>4e3)return!1;let u=null,h=1e9;for(const d of a)if(!o.has(d)){const p=r.get(d).filter(v=>!o.has(N(n,v).home)&&!o.has(N(n,v).away)).length;p<h&&(h=p,u=d)}if(u===null)return!0;if(h===0)return!1;const m=_s(s,r.get(u).filter(d=>!o.has(N(n,d).home)&&!o.has(N(n,d).away)));for(const d of m){const{home:p,away:v}=N(n,d);if(o.add(p),o.add(v),l.push(d),c())return!0;o.delete(p),o.delete(v),l.pop()}return!1};return c()?l.slice():null}function $l(n,e,a){const s=n+e+a;return s===0?0:(n+.5*a)/s}let au=class{rows=new Map;constructor(e){for(const a of hn)this.rows.set(a.name,[]);for(const a of e)this.rows.get(a.home).push({opp:a.away,pf:a.hs,pa:a.as,tdf:a.htd,tda:a.atd}),this.rows.get(a.away).push({opp:a.home,pf:a.as,pa:a.hs,tdf:a.atd,tda:a.htd})}rec(e,a=()=>!0){let s=0,t=0,r=0;for(const o of this.rows.get(e))a(o)&&(o.pf>o.pa?s++:o.pf<o.pa?t++:r++);return{w:s,l:t,t:r,n:s+t+r}}pct(e,a){const s=this.rec(e,a);return $l(s.w,s.l,s.t)}overall(e){return this.pct(e)}net(e,a=()=>!0){let s=0;for(const t of this.rows.get(e))a(t)&&(s+=t.pf-t.pa);return s}netTD(e){let a=0;for(const s of this.rows.get(e))a+=s.tdf-s.tda;return a}sov(e){return this.oppPct(e,a=>a.pf>a.pa)}sos(e){return this.oppPct(e,()=>!0)}oppPct(e,a){let s=0,t=0;for(const r of this.rows.get(e))if(a(r)){const o=this.rec(r.opp);s+=o.w+.5*o.t,t+=o.n}return t===0?0:s/t}total(e,a){let s=0;for(const t of this.rows.get(e))s+=t[a];return s}};const De=n=>ss(nt,n),su=(n,e)=>De(n).conf===De(e).conf&&De(n).div===De(e).div,ro=(n,e)=>De(n).conf===De(e).conf;function oo(n,e,a){const s=n.total(e,"pf"),t=n.total(e,"pa");return 1+a.filter(r=>n.total(r,"pf")>s).length+1+a.filter(r=>n.total(r,"pa")<t).length}const ni=1e-12;function oe(n,e){const a=n.map(e),s=Math.max(...a),t=n.filter((r,o)=>N(a,o)>s-ni);return t.length===n.length?null:t}function tu(n,e){const a=v=>{if(n==="division")return oe(v,g=>{let C=0,T=0,w=0;for(const k of v)if(k!==g){const S=e.rec(g,F=>F.opp===k);C+=S.w,T+=S.l,w+=S.t}return $l(C,T,w)});if(v.length===2)return oe(v,g=>e.pct(g,C=>C.opp===v.find(T=>T!==g)));for(const g of v)if(v.filter(T=>T!==g).every(T=>{const w=e.rec(g,k=>k.opp===T);return w.n>0&&w.w===w.n}))return[g];for(const g of v)if(v.filter(T=>T!==g).every(T=>{const w=e.rec(g,k=>k.opp===T);return w.n>0&&w.l===w.n}))return v.filter(T=>T!==g);return null},s=v=>oe(v,g=>e.pct(g,C=>su(g,C.opp))),t=v=>oe(v,g=>e.pct(g,C=>ro(g,C.opp))),r=v=>g=>{const C=g.map(k=>new Set(e.rows.get(k).map(S=>S.opp))),T=[...N(C,0)].filter(k=>!g.includes(k)&&C.every(S=>S.has(k))),w=k=>T.includes(k.opp);return!T.length||g.some(k=>e.rec(k,w).n<v)?null:oe(g,k=>e.pct(k,w))},o=v=>oe(v,g=>e.sov(g)),l=v=>oe(v,g=>e.sos(g)),i=v=>hn.filter(g=>g.conf===De(N(v,0)).conf).map(g=>g.name),c=v=>{const g=i(v);return oe(v,C=>-oo(e,C,g))},u=v=>{const g=hn.map(C=>C.name);return oe(v,C=>-oo(e,C,g))},h=v=>{const g=v.map(T=>new Set(e.rows.get(T).map(w=>w.opp))),C=[...N(g,0)].filter(T=>!v.includes(T)&&g.every(w=>w.has(T)));return C.length?oe(v,T=>e.net(T,w=>C.includes(w.opp))):null},m=v=>oe(v,g=>e.net(g,C=>ro(g,C.opp))),d=v=>oe(v,g=>e.net(g)),p=v=>oe(v,g=>e.netTD(g));return n==="division"?[a,s,r(0),t,o,l,c,u,h,d,p]:[a,t,r(4),o,l,c,u,m,d,p]}function ei(n,e,a,s){const t=tu(e,a);let r=n.slice();n:for(;r.length>1;){for(const i of t){const c=i(r);if(c&&c.length<r.length&&c.length>0){r=c;continue n}}const o=r.slice().sort(),l=s.fork("coin:"+o.join("|")).next();return N(o,Math.floor(l*o.length))}return N(r,0)}function ai(n,e,a,s){const t=[];let r=n.slice();for(;r.length>1;){const o=ei(r,e,a,s);t.push(o),r=r.filter(l=>l!==o)}return t.concat(r)}function lo(n,e,a){const s=[];let t=n.slice();for(;t.length;){const r=[];for(const l of new Set(t.map(i=>De(i).conf+De(i).div))){const i=t.filter(c=>De(c).conf+De(c).div===l);r.push(i.length>1?N(ai(i,"division",e,a),0):N(i,0))}const o=r.length===1?N(r,0):ei(r,"wildcard",e,a);s.push(o),t=t.filter(l=>l!==o)}return s}function mt(n,e){const a=n.slice().sort((t,r)=>e.overall(r)-e.overall(t)),s=[];for(const t of a){const r=s[s.length-1];r&&Math.abs(e.overall(N(r,0))-e.overall(t))<ni?r.push(t):s.push([t])}return s}function si(n,e){const a=new au(n),s={},t={},r={AFC:[],NFC:[]},o={AFC:[],NFC:[]};for(const l of["AFC","NFC"]){for(const h of We){const m=mt(Ca(l,h),a).flatMap(d=>d.length>1?ai(d,"division",a,e):d);s[`${l} ${h}`]=m,m.forEach((d,p)=>t[d]=p+1),o[l].push(N(m,0))}const i=mt(o[l],a).flatMap(h=>h.length>1?lo(h,a,e):h),c=hn.filter(h=>h.conf===l&&!o[l].includes(h.name)).map(h=>h.name),u=mt(c,a).flatMap(h=>h.length>1?lo(h,a,e):h).slice(0,3);r[l]=[...i,...u]}return{seeds:r,divisionOrder:s,divisionRank:t,divisionWinners:o}}function ru(n){const e=Object.fromEntries(n.map(s=>[s.name,s.ratings])),a={};for(const s of["AFC","NFC"])for(const t of We)Ca(s,t).sort((r,o)=>ss(e,o).off+ss(e,o).def-ss(e,r).off-ss(e,r).def).forEach((r,o)=>a[r]=o+1);return a}function io(n,e){return n.events.filter(a=>a.side===e&&(a.kind==="TD"||a.kind==="DEF_TD")).length}const ur=18,Gs=["Wild Card","Divisional","Conference","Super Bowl"],ou=n=>n.year+n.run,et=n=>n.nextWeek>22,dr=n=>n>=19&&n<=22?Gs[n-19]??null:null;function lu(n,e){oi(n);const a=e.run??0,s=e.prevRank??ru(n),t=$0(xe(e.seed).fork("schedule"),e.year+a,s).sort((r,o)=>r.week-o.week);return{seed:e.seed,year:e.year,run:a,prevRank:s,homeField:e.homeField,schedule:t,nextWeek:1,scores:[],playoffs:[],seeding:null,champion:null}}const iu=(n,e,a)=>e?`po:${e}:${a}`:`w${n}:${a}`,at=(n,e,a)=>f0(n,iu(e,dr(e),a));function ti(n){if(et(n))return[];const e=n.nextWeek,a=dr(e),s=a?fu(n,a):n.schedule.filter(r=>r.week===e).map(r=>[r.home,r.away]),t=a==="Super Bowl"?0:n.homeField;return s.map(([r,o])=>({week:e,round:a,home:r,away:o,seed:at(n.seed,e,r),...t!==void 0?{homeField:t}:{}}))}function cu(n,e){if(oi(n),et(e))throw new Error("season: already finished");const a=new Map(n.map(u=>[u.name,u.ratings])),s=fr(n.map(u=>u.ratings)),t=new Map;for(const u of n){const h=Pt(u.ratings,s);t.set(u.name,{off:h.off,def:h.def})}const r=ti(e),o=dr(e.nextWeek),l=r.map(u=>{const h=a.get(u.home),m=a.get(u.away),d=Pe(h,m,s,{off:t.get(u.home).off,def:t.get(u.away).def}),p=Pe(m,h,s,{off:t.get(u.away).off,def:t.get(u.home).def});return{home:u.home,away:u.away,round:o,result:Xl(d,p,xe(u.seed),{playoff:o!==null,...u.homeField!==void 0?{homeField:u.homeField}:{}})}}),i=l.map(u=>({week:e.nextWeek,home:u.home,away:u.away,hs:u.result.homeScore,as:u.result.awayScore,htd:io(u.result,"home"),atd:io(u.result,"away"),...u.round?{round:u.round}:{}})),c={...e,scores:o?e.scores:[...e.scores,...i],playoffs:o?[...e.playoffs,...i]:e.playoffs,nextWeek:e.nextWeek+1};return e.nextWeek===ur&&(c.seeding=si(c.scores,xe(e.seed).fork("seeding"))),o==="Super Bowl"&&(c.champion=ri(N(i,0))),{state:c,games:l}}function pr(n){const e=Object.fromEntries(hn.map(s=>[s.name,{w:0,l:0,t:0,pf:0,pa:0}])),a=s=>{const t=e[s];if(!t)throw new Error("season: unknown team "+s);return t};for(const s of n.scores){const t=a(s.home),r=a(s.away);t.pf+=s.hs,t.pa+=s.as,r.pf+=s.as,r.pa+=s.hs,s.hs>s.as?(t.w++,r.l++):s.hs<s.as?(r.w++,t.l++):(t.t++,r.t++)}return e}const ri=n=>n.hs>n.as?n.home:n.away;function fu(n,e){const a=n.seeding;if(!a)throw new Error("season: playoffs before the regular season is done");const s=(r,o)=>n.playoffs.filter(l=>l.round===r&&nt[l.home]?.conf===o).map(ri);if(e==="Super Bowl"){const r=l=>N(s("Conference",l),0);return[ou(n)%2===1?[r("AFC"),r("NFC")]:[r("NFC"),r("AFC")]]}const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r],l=i=>o.indexOf(i)+1;if(e==="Wild Card")for(const[i,c]of[[2,7],[3,6],[4,5]])t.push([N(o,i-1),N(o,c-1)]);else if(e==="Divisional"){const i=[N(o,0),...s("Wild Card",r)].sort((c,u)=>l(c)-l(u));t.push([N(i,0),N(i,i.length-1)],[N(i,1),N(i,2)])}else{const i=s("Divisional",r).sort((c,u)=>l(c)-l(u));t.push([N(i,0),N(i,1)])}}return t}function oi(n){if(n.length!==32)throw new Error("season: 32 teams needed");const e=new Set(n.map(a=>a.name));for(const a of hn)if(!e.has(a.name))throw new Error("season: missing team "+a.name)}const li=["att","cmp","pyd","ptd","ints","sacked","car","ryd","rtd","fumLost","tgt","rec","recYd","recTd","twoPt","tkl","tfl","sack","press","pd","intDef","intDefYd","ff","fr","defTd","safeties","fgm","fga","xpm","xpa","punts","puntYd","kr","krYd","pr","prYd"],hr=()=>Object.fromEntries(li.map(n=>[n,0])),uu=n=>n==="home"?"away":"home",Fa=(n,e,a)=>Math.min(a,Math.max(e,n)),du=["OT1","OT2","OG1","OG2","C"],co=(n,e,a,s)=>Math.exp(e*(n.ovr-80)+a*(n.p.spd-80)+s*(n.p.str-80));function pu(n,e){switch(e){case"DE1":case"DE2":return"DE";case"DT1":return"DT";case"DT2":return n==="3-4"?"ILB":"DT";case"DL5":return"DL5";case"MIKE":return"ILB";case"WILL":case"SAM":return n==="3-4"?"OLB34":"LB";case"CB1":case"CB2":return"CB";case"CB3":case"DIME":return"NB";case"FS":return"FS";case"SS":return"SS";default:return null}}const hu={run:{DE:.075,DT:.08,DL5:.03,ILB:.17,LB:.11,OLB34:.09,CB:.035,NB:.02,FS:.06,SS:.11},pass:{DE:.02,DT:.015,DL5:.005,ILB:.09,LB:.08,OLB34:.07,CB:.12,NB:.09,FS:.13,SS:.12},sack:{DE:.3,DT:.15,DL5:.05,ILB:.03,LB:.05,OLB34:.3,CB:.01,NB:.015,FS:.005,SS:.01},press:{DE:.26,DT:.18,DL5:.05,ILB:.04,LB:.06,OLB34:.24,CB:.015,NB:.02,FS:.01,SS:.015},int:{DE:.005,DT:.003,DL5:.001,ILB:.05,LB:.055,OLB34:.045,CB:.17,NB:.12,FS:.2,SS:.13},pd:{DE:.01,DT:.005,DL5:0,ILB:.04,LB:.045,OLB34:.035,CB:.26,NB:.14,FS:.12,SS:.1}},mu={RB1:.6,RB2:.18,FB:.04,QB:.07,WR1:.01,WR2:.01,WR3:.01},vu={RB1:.55,RB2:.15,FB:.08,QB:.12,WR1:.01,WR2:.01},gu={WR1:.21,WR2:.18,WR3:.12,WR4:.02,TE1:.16,TE2:.05,TE3:.01,RB1:.1,RB2:.04,FB:.01},Bu={WR1:.22,WR2:.17,WR3:.11,WR4:.01,TE1:.22,TE2:.08,TE3:.01,RB1:.06,RB2:.03,FB:.02},Cu={WR1:1,WR2:1,WR3:1,WR4:1,TE1:.8,TE2:.8,TE3:.8,RB1:.6,RB2:.6,FB:.5};function Tu(n,e,a,s){const t={id:`ghost|${s}|${n}`,name:`Backup ${s}`,pos:s,role:s,team:n,ovr:70,spd:70,str:70,freeAgent:!1};return{line:{id:t.id,name:t.name,team:n,side:e,slot:a,label:a,stats:hr()},p:t,ovr:70,slot:a,kind:""}}function fo(n,e){const a=[];for(const p of n.lineup.placements){if(!p.player||du.includes(p.slot.slot))continue;const v=pu(n.lineup.base,p.slot.slot)??"";a.push({line:{id:p.player.id,name:p.player.name,team:n.team,side:e,slot:p.slot.slot,label:p.slot.label,stats:hr()},p:p.player,ovr:p.effOvr,slot:p.slot.slot,kind:v})}const s=(p,v)=>{const g=a.find(T=>T.slot===p);if(g)return g;const C=Tu(n.team,e,p,v);return a.push(C),C},t=s("QB","QB"),r=s("K","K"),o=s("P","P"),l=(p,v)=>a.filter(g=>p[g.slot]!==void 0).map(g=>[g,p[g.slot]*co(g,v,0,0)]),i=(p,v)=>{const g=l(p,v);return g.length?g:[[t,1]]},c=(p,v,g,C)=>a.filter(T=>T.kind).map(T=>[T,hu[p][T.kind]*co(T,v,g,C)]).filter(T=>T[1]>0),u=c("run",.02,.003,.005),h=c("pass",.02,.004,.002),m=(p,v)=>p.map(([g,C],T)=>[g,(C+N(v,T)[1])/2]),d=zl(n.lineup,n.returnerId);return{side:e,team:n.team,qb:t,k:r,pt:o,returner:d?a.find(p=>p.p.id===d.player.id)??null:null,retValue:d?.value??82,carry:i(mu,.02),carryRz:i(vu,.02),target:i(gu,.02),targetRz:i(Bu,.02),runTkl:u,passTkl:h,sack:c("sack",.035,.01,.006),press:c("press",.03,.008,.005),ints:c("int",.03,.008,0),pd:c("pd",.03,.008,0),ff:u.map(([p,v])=>[p,v*Math.exp(.008*(p.p.str-80))]),fr:m(u,h),all:a}}function qn(n,e){let a=0;for(const t of e)a+=t[1];let s=n.next()*a;for(const[t,r]of e)if(s-=r,s<0)return t;return N(e,e.length-1)[0]}const Qn=n=>({id:n.p.id,name:n.p.name,team:n.line.team,label:n.line.label}),yu=n=>Math.exp(.012*(n.p.spd-80)+.004*(n.p.str-80)),Su=.645;function ku(n,e,a,s,t){const r=n.end==="FG"||n.end==="FG_MISS"||n.end==="PUNT";let o=Math.max(0,n.plays-n.sacks-(r?1:0));o===0&&n.rush+n.pass>0&&(o=1);let l=!1;n.end==="TD"&&(l=n.pass>0&&(n.rush===0||t.next()<.28+.55*n.pass/(n.pass+n.rush)),o===0&&(o=1));const i=o?Ga(o,[n.rush/4.3+.15,n.pass/6.6+.15]):[0,0];let c=N(i,0),u=N(i,1);const h=n.end==="INT"?1:0,m=n.pass>0||l?1:0;(n.rush>0||n.end==="TD"&&!l)&&(c=Math.max(c,1)),u=Math.max(u,m+h);const d=u-h,p=Fa(Su+.0035*(a.qb.ovr-80),.5,.78);let v=0;if(m){for(let E=0;E<d;E++)t.next()<p&&v++;v=Math.max(v,1)}const g=[];for(let E=0;E<c;E++)g.push(qn(t,a.carry));let C=null;n.end==="TD"&&!l&&(C=qn(t,a.carryRz),g[c-1]=C);const T=c?Ga(n.rush,g.map(E=>Math.exp(.6*t.normal())*yu(E))):[],w=(E,R)=>{if(N(E,R)>=1)return;let I=-1;for(let P=0;P<E.length;P++)P!==R&&N(E,P)>1&&(I<0||N(E,P)>N(E,I))&&(I=P);I>=0&&(E[I]=N(E,I)-1,E[R]=N(E,R)+1)};C&&w(T,c-1),g.forEach((E,R)=>{E.line.stats.car++,E.line.stats.ryd+=N(T,R)}),C&&C.line.stats.rtd++;const k=[];for(let E=0;E<v;E++)k.push(qn(t,a.target));let S=null;l&&(S=qn(t,a.targetRz),k[v-1]=S);const F=v?Ga(n.pass,k.map(E=>Math.exp(.55*t.normal())*(Cu[E.slot]??.7)*Math.exp(.012*(E.p.spd-80)))):[];S&&w(F,v-1),k.forEach((E,R)=>{E.line.stats.tgt++,E.line.stats.rec++,E.line.stats.recYd+=N(F,R)}),S&&S.line.stats.recTd++;for(let E=0;E<u-v;E++){const R=qn(t,a.target);R.line.stats.tgt++}const G=a.qb.line.stats;G.att+=u,G.cmp+=v,G.pyd+=n.pass,G.sacked+=n.sacks,l&&G.ptd++,G.ints+=h,g.forEach((E,R)=>{if(E===C&&R===c-1)return;const I=qn(t,s.runTkl);I.line.stats.tkl++,t.next()<(N(T,R)<=1?.2:N(T,R)<=3?.06:0)&&I.line.stats.tfl++}),k.forEach((E,R)=>{E===S&&R===v-1||qn(t,s.passTkl).line.stats.tkl++});for(let E=0;E<n.sacks;E++){const R=qn(t,s.sack).line.stats;R.sack++,R.press++,R.tkl++,R.tfl++}for(let E=0;E<u;E++)t.next()<.17&&qn(t,s.press).line.stats.press++;for(let E=0;E<u-v-h;E++)t.next()<.45&&qn(t,s.pd).line.stats.pd++;const J={drive:e,side:n.side,period:n.period,kind:n.end==="TD"?l?"PASS_TD":"RUSH_TD":n.end==="FG"?"FG":n.end==="FG_MISS"?"FG_MISS":n.end==="INT"?"INT":n.end==="FUM"?"FUM":n.end==="SAFETY"?"SAFETY":n.end==="PUNT"?"PUNT":n.end==="DOWNS"?"DOWNS":"HALF"};if(n.end==="TD"){const E=l?S:C;J.scorer=Qn(E),J.tdYards=l?N(F,v-1):N(T,c-1),l&&(J.passer=Qn(a.qb));const R=a.k.line.stats;if(n.conv!==void 0&&(J.conv=n.conv),n.conv==="xp")R.xpa++,R.xpm++,J.convKicker=Qn(a.k);else if(n.conv==="xp_miss")R.xpa++,J.convKicker=Qn(a.k);else if(n.conv==="two"||n.conv==="two_fail"){const I=t.next()<.55,P=qn(t,I?a.targetRz:a.carryRz);J.convBy=Qn(P),I&&(J.convPasser=Qn(a.qb)),n.conv==="two"&&P.line.stats.twoPt++}}if(n.end==="FG"&&(a.k.line.stats.fga++,a.k.line.stats.fgm++,J.kicker=Qn(a.k),J.kickYards=Fa(Math.round(35+8*t.normal()),19,63)),n.end==="FG_MISS"&&(a.k.line.stats.fga++,J.kicker=Qn(a.k),J.kickYards=Fa(Math.round(46+7*t.normal()),30,66)),n.end==="PUNT"){a.pt.line.stats.punts++;const E=Fa(Math.round(45+5.5*t.normal()),28,66);a.pt.line.stats.puntYd+=E,J.kicker=Qn(a.pt),J.kickYards=E}if(n.end==="INT"){const E=qn(t,s.ints);E.line.stats.intDef++;const R=n.defTD?t.int(15,85):Math.max(0,Math.round(10+9*t.normal()));E.line.stats.intDefYd+=R,n.defTD&&E.line.stats.defTd++,J.giver=Qn(a.qb),J.taker=Qn(E),J.retYards=R,J.defTD=n.defTD}if(n.end==="FUM"){const E=[...g,...k],R=E.length?N(E,t.int(0,E.length-1)):a.qb;R.line.stats.fumLost++;const I=qn(t,s.ff);I.line.stats.ff++;const P=qn(t,s.fr);P.line.stats.fr++;const x=n.defTD?t.int(5,70):t.int(0,12);n.defTD&&P.line.stats.defTd++,J.giver=Qn(R),J.forcer=Qn(I),J.taker=Qn(P),J.retYards=x,J.defTD=n.defTD}if((n.end==="INT"||n.end==="FUM")&&n.defTD&&(s.k.line.stats.xpa++,s.k.line.stats.xpm++,J.defKicker=Qn(s.k)),n.end==="SAFETY"){const E=qn(t,s.sack);E.line.stats.safeties++,J.taker=Qn(E)}return J}function Du(n,e,a){const s=n.drives;for(let t=0;t<s.length;t++){const r=N(s,t),o=r.side,l=e[o];if(!l.returner)continue;const i=t>0?N(s,t-1):null,c=!i||r.start>=1800&&i.start<1800||r.period>=5&&i.period<5||i.pts>0||i.oppPts>0,u=i&&i.side!==o,h=l.returner.line.stats;c&&a.next()<.45?(h.kr++,h.krYd+=Fa(Math.round(24+.13*(l.retValue-82)+5*a.normal()),10,55)):!c&&u&&i&&i.end==="PUNT"&&a.next()<.36&&(h.pr++,h.prYd+=Fa(Math.round(8.5+.12*(l.retValue-82)+5*a.normal()),0,40))}}function wu(n,e,a,s){const t={home:fo(e,"home"),away:fo(a,"away")},r=s.fork("box"),o=n.drives.map((l,i)=>ku(l,i,t[l.side],t[uu(l.side)],r));return Du(n,t,r.fork("returns")),{home:e.team,away:a.team,lines:[...t.home.all,...t.away.all].map(l=>l.line),credits:o}}const Ru=new Set(["RB1","RB2","FB","WR1","WR2","WR3","WR4","TE1","TE2","TE3"]);function uo(n){const e=n.stats;return n.slot==="QB"?.045*e.pyd+5*e.ptd-6*e.ints+.03*e.ryd+4*e.rtd-4*e.fumLost:.07*(e.ryd+e.recYd)+.3*e.rec+6*(e.rtd+e.recTd)+3*e.twoPt-8*e.fumLost}function Eu(n){const e=n.stats;return 4*e.sack+5*e.intDef+8*e.defTd+3*e.ff+2.5*e.fr+e.pd+.6*e.tfl+.25*e.tkl+.1*(e.press-e.sack)+4*e.safeties}const ii=n=>n.slot==="QB"||Ru.has(n.slot),Lu=n=>!ii(n)&&n.slot!=="K"&&n.slot!=="P",bu=()=>({players:{}});function Au(n,e){for(const a of e.lines){const s=n.players[a.id]??={id:a.id,name:a.name,team:a.team,slot:a.slot,label:a.label,games:0,stats:hr()};s.games++,s.slot=a.slot,s.label=a.label,s.team=a.team;for(const t of li)s.stats[t]+=a.stats[t]}}const ci=["pyd","ptd","ryd","rtd","recYd","rec","recTd","sack","intDef","tkl","ff","fgm","defTd"];function mr(n,e,a=5){return Object.values(n.players).filter(s=>s.stats[e]>0).sort((s,t)=>t.stats[e]-s.stats[e]||(s.id<t.id?-1:1)).slice(0,a)}const po=n=>n?n.w+n.t/2:8.5;function Ju(n,e,a){const s=Object.values(n.players).sort((m,d)=>m.id<d.id?-1:1),t=(m,d)=>m.reduce((p,v)=>p===null||d(v)>d(p)?v:p,null),r=s.filter(ii),o=s.filter(Lu),l=t(r,m=>uo(m)*(1+.04*(po(e[m.team])-9))),i=t(r.filter(m=>m!==l),m=>uo(m)),c=t(o,m=>Eu(m));let u=null;for(const m of Object.keys(e).sort()){const d=po(e[m]),p=a?.[m]??8.5,v=d-p;(!u||v>u.over||v===u.over&&d>u.wins)&&(u={team:m,wins:d,expected:p,over:v})}const h={};for(const m of ci)h[m]=mr(n,m,5);return{mvp:l,opoy:i,dpoy:c,coach:u,leaders:h}}function Mu(n,e,a){const s=o=>o==="home"?e:a,t=o=>{const l=Math.min(4,Math.max(1,Math.ceil(o/900))),i=900*l-o;return`Q${l} ${String(Math.floor(i/60)).padStart(2,"0")}:${String(i%60).padStart(2,"0")}`},r=n.drives.map((o,l)=>({kind:"drive",n:l+1,team:s(o.side),period:o.period,clock:t(o.start),plays:o.plays,yards:null,end:o.end,pts:o.pts,oppPts:o.oppPts,defTD:o.defTD,scores:n.events.filter(i=>i.drive===l+1).map(i=>({team:s(i.side),kind:i.kind,pts:i.pts,conv:i.conv??"none",at:i.at})),summary:Fu(o,s(o.side))}));return{v:1,home:e,away:a,homeScore:n.homeScore,awayScore:n.awayScore,regHome:n.regHome,regAway:n.regAway,ot:n.ot?{first:s(n.ot.first),periods:n.ot.periods,tie:n.ot.tie}:null,drives:r,mvpLine:null}}function Fu(n,e){const a={TD:"ends in a touchdown",FG:"kicks a field goal",FG_MISS:"misses a field goal",PUNT:"punts",INT:"throws an interception",FUM:"loses a fumble",DOWNS:"turns it over on downs",HALF:"runs out the half",SAFETY:"is sacked in the end zone for a safety"},s=Math.max(1,Math.round(n.secs/60)),t=n.oppPts?` ${e} gives up ${n.oppPts} the other way.`:"";return`${e} ${a[n.end]} — ${n.plays} plays, ${s} min.${t}`}const Wu=["olRun","olPass","rb","qb","rec","passRush","frontRun","coverage","kicker","rec12","rec13","rec21","rec22","rec11","frontBase","frontNick","covBase","covNick","covDime","te1","te2","rbHeavy","ret","p","qbRunR","wrBlk","passOff","runOff","off","def"];function fi(n,e){const a=ti(n).find(s=>s.home===e||s.away===e);return a?a.seed:n.seed}function _u(n,e,a){const s={};for(const o of e)s[o.name]={...o.ratings};const t=o=>({week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd,atd:o.atd,...o.round?{round:o.round}:{}}),r={seed:n.seed,year:n.year,run:n.run,gameSeed:fi(n,a.userTeam),nextWeek:n.nextWeek,userTeam:a.userTeam,roster:a.roster,ratings:s,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})),scores:[...n.scores.map(t),...n.playoffs.map(t)],plan:a.plan,statsRecorded:a.statsRecorded,prevRank:{...n.prevRank}};return n.homeField!==void 0&&(r.homeField=n.homeField),r}function ui(n){const e=[];for(const o of hn){const l=n.ratings[o.name];if(!l||typeof l!="object")return{ok:!1,message:"week: no ratings for "+o.name};for(const i of Wu)if(typeof l[i]!="number"||!Number.isFinite(l[i]))return{ok:!1,message:"week: bad rating "+i+" for "+o.name};e.push({name:o.name,ratings:{...l}})}const a=[],s=[];for(const o of n.scores){const l={week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd??0,atd:o.atd??0,...o.round?{round:o.round}:{}};(o.round?s:a).push(l)}const t={seed:n.seed,year:n.year,run:n.run,prevRank:n.prevRank?{...n.prevRank}:{},homeField:n.homeField,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})).sort((o,l)=>o.week-l.week),nextWeek:n.nextWeek,scores:a,playoffs:s,seeding:null,champion:null};t.nextWeek>ur&&(t.seeding=si(a,xe(n.seed).fork("seeding")));const r=s.find(o=>o.round==="Super Bowl");return r&&(t.champion=r.hs>r.as?r.home:r.away),n.prevRank?t.nextWeek<=22&&fi(t,n.userTeam)!==n.gameSeed?{ok:!1,message:"week: stored gameSeed does not match the state (changed save?)"}:{ok:!0,value:{state:t,teams:e,context:{userTeam:n.userTeam,roster:n.roster,plan:n.plan,statsRecorded:n.statsRecorded}}}:{ok:!1,message:"week: saved without prevRank (cannot rebuild a run-it-back)"}}const Gu=6,Pu=4,Nu=2,Iu=1,ho={"Wild Card":Gu,Divisional:Pu,Conference:Nu,"Super Bowl":Iu};function di(n){const e=n.payload;if(!Number.isInteger(e.nextWeek)||e.nextWeek<1||e.nextWeek>ur+4)return On(`week: nextWeek ${e.nextWeek} outside 1..22`);if(e.scores.find(p=>p.round==="Super Bowl")&&e.nextWeek!==22)return On("week: a Super Bowl score exists but nextWeek is not 22 (finished seasons are Season payloads, not week saves)");const s=p=>Gs.indexOf(p);for(const p of e.scores){if(p.round&&!Gs.includes(p.round))return On(`week: unknown playoff round '${p.round}'`);if(p.round&&p.week!==19+s(p.round))return On(`week: round '${p.round}' stored under week ${p.week} (expected ${19+s(p.round)})`)}for(const p of e.scores)if(!Number.isInteger(p.htd)||!Number.isInteger(p.atd))return On(`week: score ${p.home} vs ${p.away} (week ${p.week}) lacks htd/atd — seeding tiebreaks would silently change`);const t=(p,v,g)=>`${p}|${v}|${g}`,r=new Set(e.schedule.map(p=>t(p.week,p.home,p.away))),o=new Map;for(const p of e.scores){if(!p.round&&!r.has(t(p.week,p.home,p.away)))return On(`week: score ${p.away} @ ${p.home} (week ${p.week}) is not on the stored schedule`);const v=t(p.week,p.home,p.away);if(o.has(v))return On(`week: fixture ${p.away} @ ${p.home} (week ${p.week}) appears twice in scores`);o.set(v,p)}for(const p of e.schedule)if(!(p.week<e.nextWeek&&!p.week)&&p.week<e.nextWeek&&!o.has(t(p.week,p.home,p.away)))return On(`week: scheduled game ${p.away} @ ${p.home} (week ${p.week}) has no score but week ${p.week} < nextWeek ${e.nextWeek}`);const l=new Map;for(const p of e.scores)p.round&&(l.get(p.round)??l.set(p.round,[]).get(p.round)).push(p);let i=new Set;for(const p of Gs){const v=l.get(p)??[];if(!v.length)break;if(v.length!==ho[p])return On(`week: ${p} has ${v.length} games (expected ${ho[p]})`);if(p!=="Wild Card"){for(const g of v)if(!i.has(g.home)&&!i.has(g.away))return On(`week: ${p} game ${g.away} @ ${g.home} has no participant from the previous round's winners`)}if(i=new Set(v.map(g=>g.hs>g.as?g.home:g.away)),i.size!==v.length)return On(`week: ${p} has a tie or a repeat winner — playoff games cannot tie`)}const u=l.get("Super Bowl")?.[0];if(u&&u.hs===u.as)return On("week: the Super Bowl ended level — impossible in the engine");const h=ui(e);if(!h.ok)return On(h.message);const m=h.value,d=new Set(hn.map(p=>p.name));for(const p of[...e.schedule,...e.scores])if(!d.has(p.home)||!d.has(p.away))return On(`week: unknown team name in ${p.away} @ ${p.home}`);return{ok:!0,value:m}}function On(n){return{ok:!1,code:"corrupt",message:n}}function Hu(n){const e=n.payload,a=e.userResults[e.userResults.length-1];if(!a)return On("season: no user results");const s=a.hs>a.as?a.home:a.away;return e.champion===e.userTeam&&e.userOutcome!=="champion"?On("season: champion is the user but userOutcome says otherwise"):e.champion!==e.userTeam&&e.userOutcome==="champion"?On("season: userOutcome says champion but the stored champion is not the user"):e.champion===e.userTeam&&s!==e.userTeam?On("season: stored champion is the user but the last result was a loss"):{ok:!0,value:null}}const Ku={"Wild Card":"wild-card",Divisional:"divisional",Conference:"conference","Super Bowl":"super-bowl-loss"},xu=n=>n.hs>n.as?n.home:n.as>n.hs?n.away:null;function Ou(n,e){const a=nt[e];if(!a)throw new Error("outcome: unknown team "+e);if(!n.seeding)return null;if(!n.seeding.seeds[a.conf].includes(e))return"missed-playoffs";for(const s of n.playoffs){if(s.home!==e&&s.away!==e)continue;const t=xu(s);if(t!==null){if(t!==e)return Ku[s.round];if(s.round==="Super Bowl")return"champion"}}return null}function Vu(n,e=0){let a=3735928559^e,s=1103547991^e;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);a=Math.imul(a^r,2654435761),s=Math.imul(s^r,1597334677)}return a=Math.imul(a^a>>>16,2246822507)^Math.imul(s^s>>>13,3266489909),s=Math.imul(s^s>>>16,2246822507)^Math.imul(a^a>>>13,3266489909),(4294967296*(2097151&s)+(a>>>0)).toString(16).padStart(14,"0")}async function Yu(n){const e=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(e)].map(a=>a.toString(16).padStart(2,"0")).join("")}const As=n=>({ok:!1,error:n instanceof Error?n.message:String(n)});class zu{constructor(e,a={}){this.ls=e,this.o=a}ls;o;get storage(){return this.ls}async read(e){try{return{ok:!0,value:this.storage?.getItem(e)??null}}catch(a){return As(a)}}async write(e,a){try{if(If(e)&&this.o.slotCheck)try{const s=Rl(JSON.parse(a));if(s.ok){const t=this.o.slotCheck(s.value.slot,e);if(t)return{ok:!1,error:t}}}catch{}return this.storage?.setItem(e,a),{ok:!0,value:void 0}}catch(s){return As(s)}}async remove(e){try{return this.storage?.removeItem(e),{ok:!0,value:void 0}}catch(a){return As(a)}}async keys(e){try{const a=this.storage;if(!a)return{ok:!0,value:[]};const s=[];for(let t=0;t<a.length;t++){const r=a.key(t);r!==null&&r.startsWith(e)&&s.push(r)}return{ok:!0,value:s.sort()}}catch(a){return As(a)}}async entries(e){const a=await this.keys(e);if(!a.ok)return a;const s=[];for(const t of a.value){const r=await this.read(t);r.ok&&r.value!==null&&s.push([t,r.value])}return{ok:!0,value:s}}}const Qu=(n={})=>new zu(typeof localStorage>"u"?null:localStorage,n),ju="nfl1";function Uu(){const{RATING_SPECS:n,DEF_SPECS:e,PERS_REC:a,RB_HEAVY:s,PERS:t,STRAT:r,DEF_FOCUS:o,PLAN_K:l,MC:i,RUSH_BASE:c,PASS_BASE:u,PT_RUSH:h,PT_PASS:m,PT_TO:d,PT_SACK:p,LAM_TO:v,LAM_SACK:g,BASE_PTS:C,HOME_FIELD:T,PTS_NOISE:w,RET_PTS:k,RET_NEUTRAL:S,QB_RUN_C:F,WR_BLK_C:G,WR_BLK_W:J,PUNT_PTS:E,DIME_W:R,POINTS_PER_WIN:I,GAMES:P}=A0;return JSON.stringify([Le,Os,Mt,Jl,n,e,a,s,t,r,o,l,i,[c,u,h,m,d,p,v,g,C,T,w,k,S,F,G,J,E,R,I,P]])}const vr=()=>ju+"."+Vu(Uu()),qu={"Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB","Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","NY Giants":"NYG","NY Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"},wn=n=>qu[n]??n.slice(0,3).toUpperCase(),Zu=n=>hn.find(e=>e.name===n),pi=["Wild Card","Divisional","Conference","Super Bowl"],Va=18;function mo(n){return Va+pi.length}function Xu(n,e){const a=Va;if(e<=a){const l=n.schedule.filter(i=>i.week===e).map(i=>vo(n,i,null));return{week:e,label:"WEEK "+e,games:l,done:l.every(i=>i.hs!==null)}}const s=pi[e-a-1]??null;if(!s)throw new Error(`weekVM: no week slot ${e}`);const r=$u(n,s).map(([o,l])=>vo(n,{week:e,home:o,away:l,kind:"playoff"},s));return{week:e,label:s.toUpperCase(),games:r,done:r.every(o=>o.hs!==null)}}function $u(n,e){const a=n.seeding;if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}return n.playoffs.filter(t=>t.round===e).map(t=>[t.home,t.away])}function vo(n,e,a){const s=a?n.playoffs.find(r=>r.round===a&&(r.home===e.home||r.away===e.home)):n.scores.find(r=>r.week===e.week&&r.home===e.home&&r.away===e.away),t=at(n.seed,e.week,e.home);return{home:e.home,away:e.away,homeAbbr:wn(e.home),awayAbbr:wn(e.away),hs:s?s.hs:null,as:s?s.as:null,kind:a?"playoff":e.kind,round:a,replayLabel:a?`po:${a}:${e.home}`:`w${e.week}:${e.home}`,gameSeed:t,me:!1}}function nd(n,e){const s=Math.min(e,Va),t={};for(const c of hn)t[c.name]={w:0,l:0,t:0,pf:0,pa:0};for(const c of n.scores){if(c.week>s)continue;const u=t[c.home],h=t[c.away],m=c.hs,d=c.as;u.pf+=m,u.pa+=d,h.pf+=d,h.pa+=m,m>d?(u.w++,h.l++):d>m?(h.w++,u.l++):(u.t++,h.t++)}const r=c=>{if(!n.seeding)return null;const u=n.seeding.seeds.AFC.indexOf(c),h=n.seeding.seeds.NFC.indexOf(c);return u>=0?u+1:h>=0?h+1:null},o=c=>{const u=Zu(c),h=t[c],m=(h.w+.5*h.t)/Math.max(1,h.w+h.l+h.t);return{team:c,abbr:wn(c),conf:u.conf,div:u.div,w:h.w,l:h.l,t:h.t,pf:h.pf,pa:h.pa,winPct:m===1?"1.000":m.toFixed(3),seed:r(c)}},l=hn.map(c=>o(c.name)).sort((c,u)=>u.w-c.w||c.pa-u.pa||c.team.localeCompare(u.team)),i=[];for(const c of["AFC","NFC"])for(const u of["East","North","South","West"]){const h=hn.filter(m=>m.conf===c&&m.div===u).map(m=>o(m.name)).sort((m,d)=>d.w-m.w||m.pa-d.pa||m.team.localeCompare(d.team));i.push({conf:c,div:u,rows:h})}return{throughWeek:s,league:l,divisions:i}}function ed(n,e,a,s){return _u(n,e,{userTeam:a,roster:s,plan:null,statsRecorded:!1})}function ad(n){const e=hn.map(s=>{const t=n.ratings[s.name];return{name:s.name,ratings:{...t}}}),a=ui(n);return a.ok?{ok:!0,value:{state:a.value.state,teams:e,userTeamName:a.value.context.userTeam,roster:a.value.context.roster}}:{ok:!1,message:a.message}}function sd(n,e,a){const s=n.table??{},t=hn.map(l=>{const i=s[l.name]??{w:0,l:0,t:0,pf:0,pa:0};return{team:l.name,w:i.w,l:i.l,t:i.t,pf:i.pf,pa:i.pa}}),r=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e).map(l=>({week:l.week,home:l.home,away:l.away,hs:l.hs,as:l.as,...l.round?{round:l.round}:{},htd:l.htd,atd:l.atd})),o=n.champion?Ou(n,e)??"missed-playoffs":"missed-playoffs";return{seed:n.seed,year:n.year,run:n.run,userTeam:e,roster:a,table:t,userResults:r,champion:n.champion??"",userOutcome:o,statsRecorded:!1}}let Bn=null,wa=null,Ra="",Js=[],Te=1;const Nt=new Set,Ms=()=>{for(const n of Nt)n()},bn={get ready(){return Bn!==null},get slot(){return Te},get total(){return Bn?mo():Va+4},get view(){return Bn?Xu(Bn,Te):null},get standings(){return Bn?nd(Bn,Te):null},get finished(){return Bn?et(Bn):!1},get champion(){return Bn?.champion??null},get userTeamName(){return Ra},get label(){return this.view?.label??""},get atLastPlayed(){return Bn?Te===Bn.nextWeek-1:!1},get runState(){return Bn},get userRoster(){return Js},subscribe(n){return Nt.add(n),()=>Nt.delete(n)},begin(n,e,a,s,t){wa=n,Ra=s,Js=t,Bn=lu(n,{seed:e,year:a}),Te=1,Ms()},resume(n,e,a,s){wa=e,Ra=a,Js=s,Bn=n,Te=Math.max(1,Math.min(n.nextWeek,mo())),Ms()},step(){if(!Bn||!wa)return null;Te=Bn.nextWeek;const n=cu(wa,Bn);Bn=n.state;const e=n.games.map(a=>({home:a.home,away:a.away,round:a.round,result:a.result,gs:at(Bn.seed,Bn.nextWeek-1,a.home)}));return Ms(),{week:Bn.nextWeek-1,games:e}},go(n){Te=Math.max(1,Math.min(this.total,n)),Ms()},next(){this.go(Te+1)},prev(){this.go(Te-1)},weekPayload(){return ed(Bn,wa,Ra,Js)},snapshot(){return{state:Bn,teams:wa,userTeamName:Ra,slot:Te}},scores(){return Bn?[...Bn.scores,...Bn.playoffs]:[]},userTeamIndex(){return hn.findIndex(n=>n.name===Ra)}},rs={mode:"system",reducedMotion:!1,newestFirst:!0,teamName:null,draftSlot:null},hi=ar("nfl","settings");function mi(){try{return globalThis.localStorage}catch{return null}}function vi(){const n=mi();if(!n)return{...rs};try{const e=n.getItem(hi);if(!e)return{...rs};const a=JSON.parse(e);return{mode:a.mode==="light"||a.mode==="dark"||a.mode==="system"?a.mode:rs.mode,reducedMotion:a.reducedMotion===!0,newestFirst:a.newestFirst!==!1,teamName:typeof a.teamName=="string"?a.teamName:null,draftSlot:typeof a.draftSlot=="number"&&a.draftSlot>=1&&a.draftSlot<=32?a.draftSlot:null}}catch{return{...rs}}}function td(n){const e=mi();if(e)try{e.setItem(hi,JSON.stringify(n))}catch{}}function rd(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}const od=["team","board","complete","hub","week","standings","bracket","book","awards","review","guide","cards","feed","stats","settings","saves","share"],ld=new RegExp("^#/?("+od.join("|")+")(?:/([0-9]{1,2}))?$");function id(n){const e=ld.exec(n);return e?{screen:e[1],param:e[2]?Number(e[2]):null}:null}function cd(n,e){return"#/"+n+(e!=null?"/"+e:"")}function fd(){return typeof location>"u"?null:id(location.hash)}function ud(n,e){typeof location>"u"||(location.hash=cd(n,e))}function dd(n){return p0(n)}function pd(n){return yl(n.getState(),e=>(e(n.getState()),n.subscribe(e)))}function ca(n){return er(n)}function hd(){return yl(vt(),n=>(n(vt()),bn.subscribe(()=>n(vt()))))}function vt(){const n=bn;return{ready:n.ready,slot:n.slot,total:n.total,view:n.view,standings:n.standings,finished:n.finished,champion:n.champion,userTeamName:n.userTeamName,label:n.label,atLastPlayed:n.atLastPlayed,runState:n.runState}}function md(){return er({...rs,...vi()})}const oa={measured:"Model Value",balance:"Game balance",owner:"Owner preset"};let Ve={mode:"measured",locked:!1};const Fs=new Set,ae={get(){return Ve},set(n){Ve.locked||(Ve={...Ve,mode:n},Fs.forEach(e=>e(Ve)))},lock(){Ve={...Ve,locked:!0},Fs.forEach(n=>n(Ve))},subscribe(n){return Fs.add(n),n(Ve),()=>Fs.delete(n)}},vd={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},gi=["#e6c67d","#f2e7d5","#c39a4a"],gd="#291a24",Bd="#ffffff",Cd=vd,Td=n=>Cd[n]??gi;function yd(n){const[e,a,s]=Td(n);return{attr:n,vars:{"--zpb-t1":e,"--zpb-t2":a,"--zpb-t3":s}}}function go(n,e){if(typeof document>"u")return;const a=document.documentElement;if(!n){delete a.dataset.zpbteam;return}const s=yd(n);a.dataset.zpbteam=s.attr;for(const[t,r]of Object.entries(s.vars))a.style.setProperty(t,r);a.dataset.theme=e==="system"?"":e,e==="system"&&delete a.dataset.theme}function Sd(n){if(typeof document>"u")return;const e=document.documentElement;n==="system"?delete e.dataset.theme:e.dataset.theme=n}const Bo=n=>{const e=n.replace("#",""),a=[0,2,4].map(s=>parseInt(e.slice(s,s+2),16)/255).map(s=>s<=.03928?s/12.92:((s+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]},gt=(n,e)=>{const a=Bo(n),s=Bo(e);return(Math.max(a,s)+.05)/(Math.min(a,s)+.05)};function It(n,e=!0){const a=E0[n]??[...gi],s=e?gd:Bd,r=[...a].sort((o,l)=>gt(l,s)-gt(o,s))[0];return gt(r,s)>=3?{ink:r,pale:r}:{ink:r,pale:`color-mix(in srgb, ${r} 55%, ${e?"#f2e7d5":"#53382b"})`}}const kd=2027;function Ht(n){const e=or(n.pool),a=new Map(e.map(t=>[t.id,t])),s=hn.map(()=>[]);for(const t of n.picks){const r=a.get(t.pid);r&&s[t.team]?.push(r)}return s}function Bi(n){const a=["4-3","3-4"].map(r=>Nl(n,r)).map(r=>({l:r,R:F0(J0(r),P0(r))})),s=fr(a.map(r=>r.R)),t=a[1]&&zr(a[1].R,s)>zr(a[0].R,s)?a[1]:a[0];return{lineup:t.l,ratings:t.R}}function Dd(n){return hn.map((e,a)=>({name:e.name,ratings:Bi(Ht(n)[a]).ratings}))}const wd={TD:{label:"TD",tone:"good"},FG:{label:"FG",tone:"good"},INT:{label:"INT",tone:"bad"},FUM:{label:"FUM",tone:"bad"},PUNT:{label:"PUNT",tone:"sub"},DOWNS:{label:"DOWNS",tone:"sub"},FG_MISS:{label:"MISS",tone:"bad"},HALF:{label:"EOH",tone:"sub"},SAFETY:{label:"SAFETY",tone:"bad"}},Rd={xp:{label:"XP",tone:"good"},two:{label:"2PT",tone:"good"},xp_miss:{label:"XP MISS",tone:"sub"},two_fail:{label:"2PT FAIL",tone:"sub"},none:{label:"NO TRY",tone:"sub"}};function Ci(n,e,a,s){const t=s.week,r=s.year??kd,o=Mu(n,e,a),l={[e]:It(e),[a]:It(a)},i=s.userTeamName??"";let c=0,u=0,h=0,m=0,d="tie";const p=o.drives.map(g=>{g.team===e?(c+=g.pts,u+=g.oppPts):(u+=g.pts,c+=g.oppPts),g.team===i&&m++;const T=c>u?"home":u>c?"away":"tie",w=T!==d&&T!=="tie";w&&h++,d=T;const k=[],S=wd[g.end]??{label:g.end,tone:"sub"};k.push(S),g.defTD&&k.push({label:"DEF TD",tone:"gold"}),w&&k.push({label:"LEAD Δ",tone:"gold"});const F=g.scores.find(J=>J.kind==="TD"&&J.team===g.team),G=F?[Rd[F.conv]].filter(J=>!!J):[];return{...g,homeAbbr:wn(e),awayAbbr:wn(a),teamAbbr:wn(g.team),teamInk:l[g.team].pale,teamPale:l[g.team].pale,me:g.team===i,leadChange:w,scoreAfter:{home:c,away:u},badges:k,convBadges:G}}),v=s.round?` · ${s.round}`:"";return{week:t,year:r,home:e,away:a,homeAbbr:wn(e),awayAbbr:wn(a),homeInk:l[e],awayInk:l[a],homeScore:o.homeScore,awayScore:o.awayScore,regHome:o.regHome,regAway:o.regAway,ot:o.ot,gameSeedLabel:`gameSeed ${s.gs??"?"} · week ${t}${v} · ${a} @ ${e} · played by the pinned engine`,drives:p,meDrives:m,leadChanges:h,userWon:o.homeScore===o.awayScore?null:o.homeScore>o.awayScore?e===i:a===i}}function Ed(n,e,a,s,t=!0){const r=[...n.scores,...n.playoffs].find(C=>(C.home===a||C.away===a)&&C.week===s),o=r?.round??null,l=at(n.seed,s,r?r.home:""),i=new Map(e.map(C=>[C.name,C.ratings])),c=fr(e.map(C=>C.ratings)),u=i.get(r?r.home:""),h=i.get(r?r.away:"");if(!u||!h||!r)return null;const m=Pt(u,c),d=Pt(h,c),p=Pe(u,h,c,{off:m.off,def:d.def}),v=Pe(h,u,c,{off:d.off,def:m.def}),g=Xl(p,v,xe(l),{playoff:!!o});return Ci(g,r.home,r.away,{week:s,round:o,gs:l,userTeamName:a,year:n.year})}function Co(n,e){const{lineup:a}=Bi(e),s=a.placements.map(t=>t.player).find(Boolean);return{team:n,lineup:a,returnerId:s?.id??null}}class To{ss=bu();boxes=[];addWeek(e,a){for(const s of e){const t=yo(s.home),r=yo(s.away);if(t<0||r<0)continue;const o=wu(s.result,Co(s.home,a[t]??[]),Co(s.away,a[r]??[]),bd());this.boxes.push(o),Au(this.ss,o)}}}let Ld=0;const bd=()=>xe(24231+Ld++).fork("boxscore"),yo=n=>hn.findIndex(e=>e.name===n),qa=n=>ar("nfl","slot:"+n),So=wl,Za=Qu({slotCheck:zf}),gr=n=>({...n});async function Ad(n,e,a,s){const t=sr("draft",n,gr(a),e,s),r=await Za.write(qa(n),t);return r.ok?"":"storage refused the write: "+r.error}async function Jd(n,e,a,s){const t=sr("week",n,gr(a),e,s),r=await Za.write(qa(n),t);return r.ok?"":"storage refused the write: "+r.error}async function Md(n,e,a,s){const t=sr("season",n,gr(a),e,s),r=await Za.write(qa(n),t);return r.ok?"":"storage refused the write: "+r.error}const Fd=n=>{if(et(n.state))return"season complete";const e=n.teams.length&&(n.state.schedule.find(a=>a.week===n.state.nextWeek&&(a.home===n.context.userTeam||a.away===n.context.userTeam))??null);return e?`${e.away} @ ${e.home}`:"no user game this week"};async function Wd(n){const e=await Za.read(qa(n));if(!e.ok)return{slot:n,state:"refused",problem:"corrupt",message:"storage unavailable: "+e.error};if(e.value===null)return{slot:n,state:"empty"};const a=tr(e.value);if(!a.ok)return{slot:n,state:"refused",problem:a.reason,message:a.message};const s=a.value;if(s.kind==="draft"){const o=s.payload;return{slot:n,state:"ok",kind:"draft",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,picks:o.picks.length,userTeamIndex:o.userTeam}}const t=s.kind==="week"?di(s):Hu(s);if(!t.ok)return{slot:n,state:"refused",problem:"corrupt",message:t.message};if(s.kind==="week"){const o=t.value;return{slot:n,state:"ok",kind:"week",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,week:o.state.nextWeek,userTeam:o.context.userTeam,nextFixture:Fd(o),played:o.state.scores.length+o.state.playoffs.length}}const r=s.payload;return{slot:n,state:"ok",kind:"season",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,userTeam:r.userTeam,week:23,played:r.userResults.length,champion:r.champion}}async function _d(n){const e=await Za.read(qa(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=tr(e.value);return a.ok?a.value.kind!=="draft"?{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a draft"}:{ok:!0,record:a.value.payload}:{ok:!1,message:a.message}}async function Gd(n){const e=await Za.read(qa(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=tr(e.value);if(!a.ok)return{ok:!1,message:a.message};if(a.value.kind!=="week")return{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a week"};const s=a.value,t=di(s);return t.ok?{ok:!0,env:s}:{ok:!1,message:t.message}}var Pd=M('<div class="cp-hd svelte-jqmiv9"><span class="cp-team svelte-jqmiv9"> </span> <span class="cp-round svelte-jqmiv9"> </span> <span class="cp-overall svelte-jqmiv9"> </span></div> <p class="cp-onclock svelte-jqmiv9"> </p>',1);function Nd(n,e){kn(e,!0);var a=Pd(),s=gn(a),t=W(s),r=D(t,!0),o=B(t,2),l=D(o),i=B(o,2),c=D(i),u=B(s,2),h=D(u,!0);H(()=>{y(r,e.header.teamName),y(l,`${e.header.roundLabel??""} · Pick ${e.header.pickInRound??""}`),y(c,`overall ${e.header.overall??""} of ${e.header.totalPicks??""}`),y(h,e.header.onClock)}),A(n,a),Dn()}var Id=M('<button class="cp-chip svelte-q412k"> <i class="svelte-q412k"> </i></button>'),Hd=M('<div class="cp-fits svelte-q412k"><span class="cp-fitlbl svelte-q412k"> </span> <!> <button class="cp-chip cp-primary svelte-q412k"> </button></div>'),Kd=M('<div><button class="cp-main svelte-q412k"><span class="cp-name svelte-q412k"> </span> <span class="cp-pos svelte-q412k"> </span> <span class="cp-nflteam svelte-q412k"> </span> <span class="cp-num cp-ovr svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-gone-wrap svelte-q412k"><span class="cp-num cp-gone svelte-q412k"> </span> <span class="cp-gonetip svelte-q412k" role="tooltip"> </span></span></button> <!></div>');function xd(n,e){kn(e,!0);let a=pa(e,"oddsMeta",3,null),s=vn(!1);const t=R=>R?`GONE% — how often the CPU took him before your next pick: the ${R.picksBetween} picks between now and your turn were replayed ${R.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.`:"GONE% — the CPU replay estimate (no replay while the CPU is on the clock).";var r=Kd(),o=W(r),l=W(o),i=D(l,!0),c=B(l,2),u=D(c,!0),h=B(c,2),m=D(h,!0),d=B(h,2),p=D(d,!0),v=B(d,2),g=D(v,!0),C=B(v,2),T=D(C,!0),w=B(C,2),k=W(w),S=D(k,!0),F=B(k,2),G=D(F,!0),J=B(o,2);{var E=R=>{var I=Hd(),P=W(I),x=D(P),Q=B(P,2);cn(Q,17,()=>e.r.alsoFits,Ua,(tn,O)=>{var q=Id(),j=W(q),Y=B(j),U=D(Y,!0);H(()=>{y(j,`${f(O).slotLabel??""} `),y(U,f(O).flex)}),X("click",q,()=>e.onpick(e.r.id,f(O).slotId)),A(tn,q)});var $=B(Q,2),en=D($);H(()=>{y(x,`Fills ${e.r.slotLabel??""}${e.r.natural?"":" (flex)"}`),y(en,`Draft at ${e.r.slotLabel??""}`)}),X("click",$,()=>e.onpick(e.r.id,e.r.slotId)),A(R,I)};sn(J,R=>{f(s)&&R(E)})}H(R=>{xn(r,1,`cp-row cp-${e.r.tone??""}`,"svelte-q412k"),_n(o,"aria-expanded",f(s)),y(i,e.r.name),y(u,e.r.pos),y(m,e.r.nflTeam),y(p,e.r.ovr),y(g,e.r.wins),y(T,e.r.priority),y(S,e.r.gone),y(G,R)},[()=>t(a())]),X("click",o,()=>an(s,!f(s))),A(n,r),Dn()}Gn(["click"]);var Od=M("<button> </button>"),Vd=M('<div class="cp-sorts svelte-1xb8352" role="group" aria-label="Sort the board"></div>');function Yd(n,e){kn(e,!0);const a=[{k:"wins",lbl:"Wins"},{k:"priority",lbl:"Priority"},{k:"ovr",lbl:"OVR"}];var s=Vd();cn(s,21,()=>a,Ua,(t,r)=>{var o=Od();let l;var i=D(o,!0);H(()=>{l=xn(o,1,"cp-sort svelte-1xb8352",null,l,{"cp-on":e.sort===f(r).k}),y(i,f(r).lbl)}),X("click",o,()=>e.onsort(f(r).k)),A(t,o)}),A(n,s),Dn()}Gn(["click"]);var zd=M('<button class="cp-play svelte-zb9xkj" data-testid="cp-play">Play week 1 →</button>'),Qd=M('<div class="cp-ft svelte-zb9xkj"><!> <span class="cp-count svelte-zb9xkj"> </span> <button class="cp-undo svelte-zb9xkj">Undo my last pick</button> <!></div>');function jd(n,e){kn(e,!0);let a=pa(e,"draftDone",3,!1);var s=Qd(),t=W(s);Yd(t,{get sort(){return e.sort},get onsort(){return e.onsort}});var r=B(t,2),o=D(r,!0),l=B(r,2),i=B(l,2);{var c=u=>{var h=zd();X("click",h,function(...m){e.onplay?.apply(this,m)}),A(u,h)};sn(i,u=>{a()&&u(c)})}H(()=>{y(o,e.footer.text),l.disabled=!e.canUndo}),X("click",l,function(...u){e.onundo?.apply(this,u)}),A(n,s),Dn()}Gn(["click"]);Gn(["click"]);var Ud=M("<button> </button>"),qd=M('<span class="cp-needs-unit svelte-2mq0wt"> </span> <!>',1),Zd=M('<button class="cp-need cp-need-all svelte-2mq0wt">ALL</button>'),Xd=M('<div class="cp-needs svelte-2mq0wt" data-testid="cp-needs"><span class="cp-needs-lbl svelte-2mq0wt"> </span> <!> <!></div>');function $d(n,e){kn(e,!0);let a=pa(e,"selected",19,()=>[]);const s={offense:"OFF",defense:"DEF",special:"ST"};Object.fromEntries(Le.map(m=>[m.id,m.unit]));const t=m=>Le.filter(d=>d.unit===m&&e.open.includes(d.id)).map(d=>d.id),r=m=>a().includes(m);var o=Xd(),l=W(o),i=D(l),c=B(l,2);cn(c,16,()=>["offense","defense","special"],m=>m,(m,d)=>{var p=qd(),v=gn(p),g=D(v,!0),C=B(v,2);cn(C,16,()=>t(d),T=>T,(T,w)=>{var k=Ud();let S;var F=D(k,!0);H((G,J,E,R)=>{S=xn(k,1,"cp-need svelte-2mq0wt",null,S,{"cp-need-on":G}),_n(k,"aria-pressed",J),_n(k,"title",`filter the board to ${E??""}`),y(F,R)},[()=>r(w),()=>r(w),()=>Vs(w),()=>Vs(w)]),X("click",k,()=>e.ontoggle(w)),A(T,k)}),H(()=>y(g,s[d])),A(m,p)});var u=B(c,2);{var h=m=>{var d=Zd();X("click",d,function(...p){e.onclear?.apply(this,p)}),A(m,d)};sn(u,m=>{a().length&&m(h)})}H(()=>y(i,`MY NEEDS · ${e.open.length??""} OPEN`)),A(n,o),Dn()}Gn(["click"]);var np=M('<p class="cp-confirm svelte-e071nj">Draft <b> </b> at <b> </b>? <button class="cp-btn cp-go svelte-e071nj">Confirm the pick</button> <button class="cp-btn svelte-e071nj">Cancel</button></p>'),ep=M('<section class="cp-board svelte-e071nj" aria-label="Draft board"><!> <!> <!> <div class="cp-rows svelte-e071nj"></div> <!></section>');function ko(n,e){kn(e,!0);let a=pa(e,"openSlots",19,()=>[]),s=pa(e,"oddsMeta",3,null),t=pa(e,"needsSelected",19,()=>[]),r=pa(e,"draftDone",3,!1),o=vn(null),l=vn(null);const i=ln(()=>t().length===0?e.vm.rows:e.vm.rows.filter(g=>t().includes(g.slotId)||g.alsoFits.some(C=>t().includes(C.slotId))));var c=ep(),u=W(c);Nd(u,{get header(){return e.vm.header}});var h=B(u,2);$d(h,{get open(){return a()},get selected(){return t()},get ontoggle(){return e.onneedtoggle},get onclear(){return e.onneedclear}});var m=B(h,2);{var d=g=>{var C=np(),T=B(W(C)),w=D(T,!0),k=B(T,2),S=D(k,!0),F=B(k,2),G=B(F,2);H(J=>{y(w,J),y(S,f(o).slot)},[()=>e.vm.rows.find(J=>J.id===f(o).id)?.name]),X("click",F,()=>{e.onpick(f(o).id,f(o).slot),an(o,null)}),X("click",G,()=>an(o,null)),A(g,C)};sn(m,g=>{f(o)&&g(d)})}var p=B(m,2);cn(p,21,()=>f(i),g=>g.id,(g,C)=>{xd(g,{get r(){return f(C)},onpick:(T,w)=>an(o,{id:T,slot:w},!0),get oddsMeta(){return s()}})}),Rf(p,g=>an(l,g),()=>f(l));var v=B(p,2);jd(v,{get footer(){return e.vm.footer},get canUndo(){return e.canUndo},get onundo(){return e.onundo},get onsort(){return e.onsort},get sort(){return e.vm.sort},get onplay(){return e.onplay},get draftDone(){return r()}}),H(()=>_n(p,"data-count",f(i).length)),A(n,c),Dn()}Gn(["click"]);var ap=M("<button> </button>"),sp=M('<div role="group" aria-label="Valuation mode"></div>');function tp(n,e){kn(e,!0);let a=vn(aa(ae.get()));ae.subscribe(o=>an(a,o,!0));const s=["measured","balance","owner"];var t=sp();let r;cn(t,21,()=>s,Ua,(o,l)=>{var i=ap();let c;var u=D(i,!0);H(()=>{c=xn(i,1,"cp-mode svelte-1o2iqa1",null,c,{"cp-on":f(a).mode===f(l)}),i.disabled=f(a).locked,_n(i,"title",f(a).locked?"The mode switch is disabled mid-draft":oa[f(l)]),y(u,oa[f(l)])}),X("click",i,()=>ae.set(f(l))),A(o,i)}),H(()=>r=xn(t,1,"cp-modes svelte-1o2iqa1",null,r,{"cp-locked":f(a).locked})),A(n,t),Dn()}Gn(["click"]);var rp=M('<li><span class="cp-sl svelte-lz9ww5"> </span> <b> </b></li>'),op=M('<section class="cp-adv svelte-lz9ww5" aria-label="Lineup advice"><h3 class="svelte-lz9ww5">Best lineup from your roster</h3> <ul class="svelte-lz9ww5"></ul></section>');function lp(n,e){var a=op(),s=B(W(a),2);cn(s,21,()=>e.slots,Ua,(t,r)=>{var o=rp(),l=W(o),i=D(l,!0),c=B(l),u=B(c),h=D(u,!0);H(()=>{y(i,f(r).label),y(c,` ${f(r).name??""} `),y(h,f(r).ovr)}),A(t,o)}),A(n,a)}var ip=M('<p class="cp-saves-notice svelte-spfs26" role="alert"> </p>'),cp=M('<p class="cp-slot-empty svelte-spfs26">empty</p>'),fp=M('<p class="cp-slot-refused svelte-spfs26"><b> </b> — corrupt-never-repair</p> <p class="cp-slot-msg svelte-spfs26"> </p>',1),up=M('<p class="cp-slot-line svelte-spfs26"> </p>'),dp=M('<p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-line cp-slot-dim svelte-spfs26"> </p>',1),pp=M('<p class="cp-slot-kind svelte-spfs26"> </p> <!> <p class="cp-slot-dim svelte-spfs26"> </p> <button class="cp-slot-load svelte-spfs26"> </button>',1),hp=M('<article><h3 class="svelte-spfs26"> </h3> <!> <button class="cp-slot-save svelte-spfs26">Save draft here</button></article>'),mp=M(`<aside class="cp-hydrated svelte-spfs26" aria-label="Hydrated season"><h3 class="svelte-spfs26"> </h3> <p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26">the season screens ride a later slice — the hydration itself is proven (this card renders the engine's LoadedWeek)</p></aside>`),vp=M(`<section class="cp-saves svelte-spfs26" aria-label="Save and load"><header class="cp-saves-head svelte-spfs26"><h2 class="svelte-spfs26">Saves</h2> <span class="cp-saves-sub svelte-spfs26">slots A · B · C — written through the engine's envelope (saveId · revision · sha-256 dataset stamp)</span> <button class="cp-saves-x svelte-spfs26" aria-label="Close saves">✕</button></header> <!> <div class="cp-slotgrid svelte-spfs26"></div> <!> <p class="cp-saves-foot svelte-spfs26">A refused save is <b class="svelte-spfs26">never repaired</b> — the reason above is the engine's own verdict (hydrateWeek / parseEnvelope).</p></section>`);function gp(n,e){kn(e,!0);const a=aa({A:null,B:null,C:null});let s=vn(""),t=vn(null),r=vn(!1);async function o(){an(r,!0);for(const C of So)a[C]=await Wd(C);an(r,!1)}vs(()=>{e.record,o()});async function l(C){if(an(s,""),!e.record||!e.meta){an(s,"nothing to save — no draft is in progress");return}const T=await Ad(C,e.record,e.meta,new Date);T&&an(s,T,!0),await o()}async function i(C){an(s,""),an(t,null);const T=a[C];if(!T||T.state!=="ok"){an(s,"nothing loadable in slot "+C);return}if(T.kind==="draft"){const w=await _d(C);if(!w.ok){an(s,"refused: "+w.message),await o();return}e.onloaddraft(w.record,{saveId:T.saveId,createdAt:T.createdAt}),e.onclose();return}an(t,T,!0)}var c=vp(),u=W(c),h=B(W(u),4),m=B(u,2);{var d=C=>{var T=ip(),w=D(T,!0);H(()=>y(w,f(s))),A(C,T)};sn(m,C=>{f(s)&&C(d)})}var p=B(m,2);cn(p,20,()=>So,C=>C,(C,T)=>{const w=ln(()=>a[T]);var k=hp();let S;var F=W(k),G=D(F),J=B(F,2);{var E=x=>{var Q=cp();A(x,Q)},R=x=>{var Q=fp(),$=gn(Q),en=W($),tn=D(en),O=B($,2),q=D(O,!0);H(()=>{y(tn,`REFUSED (${f(w).problem??""})`),y(q,f(w).message)}),A(x,Q)},I=x=>{var Q=pp(),$=gn(Q),en=D($),tn=B($,2);{var O=_=>{var z=up(),V=D(z);H(()=>y(V,`${f(w).picks??""} picks · ${hn[f(w).userTeamIndex??0]?.name??"?"??""}`)),A(_,z)},q=_=>{var z=dp(),V=gn(z),nn=D(V),Z=B(V,2),on=D(Z);H(()=>{y(nn,`${f(w).userTeam??""} · next: week ${f(w).week??""}`),y(on,`${f(w).nextFixture??""} · ${f(w).played??""} games played`)}),A(_,z)};sn(tn,_=>{f(w).kind==="draft"?_(O):_(q,-1)})}var j=B(tn,2),Y=D(j),U=B(j,2),b=D(U);H((_,z)=>{y(en,`${_??""} · rev ${f(w).saveRevision??""}`),y(Y,`saved ${z??""}`),y(b,`Load ${f(w).kind??""}`)},[()=>f(w).kind?.toUpperCase(),()=>f(w).savedAt?.slice(0,16).replace("T"," ")]),X("click",U,()=>i(T)),A(x,Q)};sn(J,x=>{!f(w)||f(w).state==="empty"?x(E):f(w).state==="refused"?x(R,1):x(I,-1)})}var P=B(J,2);H(()=>{S=xn(k,1,"cp-slot svelte-spfs26",null,S,{"cp-slot-ok":f(w)?.state==="ok","cp-slot-bad":f(w)?.state==="refused"}),_n(k,"data-slot",T),y(G,`Slot ${T??""}`),P.disabled=!e.record}),X("click",P,()=>l(T)),A(C,k)});var v=B(p,2);{var g=C=>{var T=mp(),w=W(T),k=D(w),S=B(w,2),F=D(S),G=B(S,2),J=D(G);H(()=>{y(k,`Hydrated — ${f(t).kind??""} save, slot ${f(t).slot??""}`),y(F,`${f(t).userTeam??""} · next week ${f(t).week??""} · ${f(t).nextFixture??""}`),y(J,`${f(t).played??""} games played · the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)`)}),A(C,T)};sn(v,C=>{f(t)&&C(g)})}X("click",h,function(...C){e.onclose?.apply(this,C)}),A(n,c),Dn()}Gn(["click"]);var Bp=M("<button> </button>"),Cp=M('<div class="cp-ts-div svelte-qxuqmk"><h3 class="svelte-qxuqmk"> </h3> <!></div>'),Tp=M('<h2 class="cp-ts-conf svelte-qxuqmk"> </h2> <div class="cp-ts-divs svelte-qxuqmk"></div>',1),yp=M("<button></button>"),Sp=M(`No position chosen — the league's standard order decides. Slot <b class="svelte-qxuqmk"> </b> is this team's natural first pick.`,1),kp=M('You pick <b class="svelte-qxuqmk"> </b> ',1),Dp=M('<p class="cp-sub cp-ts-order svelte-qxuqmk"> </p>'),wp=M('<aside class="cp-ts-detail svelte-qxuqmk" aria-live="polite"><h3 class="svelte-qxuqmk"> </h3> <p class="cp-ts-meta svelte-qxuqmk"> </p> <p class="cp-ts-rivals svelte-qxuqmk"><b class="svelte-qxuqmk">Division rivals:</b> </p> <p class="cp-ts-note svelte-qxuqmk"> </p> <h4 class="cp-ts-sloth svelte-qxuqmk">Your draft position</h4> <div class="cp-ts-slots svelte-qxuqmk" role="group" aria-label="Pick your draft position"></div> <p class="cp-ts-note svelte-qxuqmk"><!></p> <!> <button class="cp-ts-go svelte-qxuqmk"> </button></aside>'),Rp=M('<aside class="cp-ts-detail cp-ts-idle svelte-qxuqmk" aria-live="polite"><p class="cp-ts-note svelte-qxuqmk">Select one of the 32 teams to see its details, choose a draft position, and start the draft.</p></aside>'),Ep=M('<section class="cp-ts svelte-qxuqmk"><h1 class="cp-ts-title svelte-qxuqmk">Pick your team</h1> <p class="cp-prov">Every number you will see on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!></section>');function Lp(n,e){kn(e,!0);let a=vn(null),s=vn(null),t=ln(()=>f(a)==null?-1:hn.findIndex(T=>T.name===f(a))),r=ln(()=>f(a)==null?null:nt[f(a)]),o=ln(()=>f(a)==null||!f(r)?[]:Ca(f(r).conf,f(r).div).filter(T=>T!==f(r).name)),l=ln(()=>f(t)<0?null:i(f(t),f(s)));function i(T,w){const k=Ml();if(w===null)return k;const S=k.slice(0,32),F=S.filter(J=>J!==T);for(let J=0;J<32;J++)S[J]=J+1===w?T:-1;let G=0;for(let J=0;J<32;J++)S[J]===-1&&(S[J]=F[G++]);return[...S,...k.slice(32)]}function c(){f(t)<0||e.onstart(f(t),f(s))}var u=Ep(),h=B(W(u),2),m=B(W(h)),d=D(m,!0),p=B(h,2);cn(p,16,()=>["AFC","NFC"],T=>T,(T,w)=>{var k=Tp(),S=gn(k),F=D(S,!0),G=B(S,2);cn(G,20,()=>We,J=>J,(J,E)=>{var R=Cp(),I=W(R),P=D(I),x=B(I,2);cn(x,16,()=>Ca(w,E),Q=>Q,(Q,$)=>{var en=Bp();let tn;var O=D(en,!0);H(()=>{tn=xn(en,1,"cp-ts-team svelte-qxuqmk",null,tn,{"cp-on":f(a)===$}),_n(en,"aria-pressed",f(a)===$),y(O,$)}),X("click",en,()=>an(a,$,!0)),A(Q,en)}),H(()=>y(P,`${w??""} ${E??""}`)),A(J,R)}),H(()=>y(F,w)),A(T,k)});var v=B(p,2);{var g=T=>{var w=wp(),k=W(w),S=D(k,!0),F=B(k,2),G=D(F),J=B(F,2),E=B(W(J)),R=B(J,2),I=D(R),P=B(R,4);cn(P,20,()=>Array(32),Ua,(Y,U,b)=>{var _=yp();let z;_.textContent=b+1,H(()=>{z=xn(_,1,"cp-ts-slot svelte-qxuqmk",null,z,{"cp-on":f(s)===b+1,"cp-nat":f(t)===b}),_n(_,"aria-pressed",f(s)===b+1)}),X("click",_,()=>an(s,f(s)===b+1?null:b+1,!0)),A(Y,_)});var x=B(P,2),Q=W(x);{var $=Y=>{var U=Sp(),b=B(gn(U)),_=D(b,!0);H(()=>y(_,f(t)+1)),A(Y,U)},en=Y=>{var U=kp(),b=B(gn(U)),_=D(b,!0),z=B(b);H(()=>{y(_,f(s)),y(z,`${f(s)===f(t)+1?" — this team's natural spot":""} first.
          The engine's draft order supports this today; the STORE's slot wiring is the Architect's piece (P-317, filed — no engine internals guessed here).`)}),A(Y,U)};sn(Q,Y=>{f(s)===null?Y($):Y(en,-1)})}var tn=B(x,2);{var O=Y=>{var U=Dp(),b=D(U);H(_=>y(b,`Order preview (first 6): ${_??""}`),[()=>f(l).slice(0,6).map(_=>hn[_].name).join(" · ")]),A(Y,U)};sn(tn,Y=>{f(l)&&f(s)!==null&&Y(O)})}var q=B(tn,2),j=D(q);H((Y,U)=>{y(S,f(r).name),y(G,`${f(r).conf??""} ${f(r).div??""}`),y(E,` ${Y??""}`),y(I,`You draft as this team: the board's on-clock indicator, your picks and your roster are all ${f(r).name??""}'s.`),y(j,`DRAFT AS ${U??""}${f(s)?` · SLOT ${f(s)}`:""}`)},[()=>f(o).join(" · "),()=>f(r).name.toUpperCase()]),X("click",q,c),A(T,w)},C=T=>{var w=Rp();A(T,w)};sn(v,T=>{f(r)?T(g):T(C,-1)})}H(T=>y(d,T),[()=>oa[ae.get().mode]]),A(n,u),Dn()}Gn(["click"]);var bp=M('<span class="cp-feed-dim svelte-tsx9t1"> </span>'),Ap=M('<div class="cp-feed-q svelte-tsx9t1"> </div>'),Do=M('<span class="zrl-badge svelte-tsx9t1"> </span>'),Jp=M('<!> <article><span class="zrl-t svelte-tsx9t1"> </span> <span class="zrl-team svelte-tsx9t1"> </span> <span class="zrl-play svelte-tsx9t1"><span class="cp-feed-summary svelte-tsx9t1"> </span> <span class="cp-feed-badges svelte-tsx9t1"><!> <!></span></span> <span class="zrl-sc svelte-tsx9t1"><b class="svelte-tsx9t1"> </b> <span class="cp-feed-dot svelte-tsx9t1">·</span> <b class="svelte-tsx9t1"> </b></span></article>',1),Mp=M('<p class="cp-feed-empty svelte-tsx9t1">no drives match the filter</p>'),Fp=M(`<section class="cp-feed svelte-tsx9t1" aria-label="Game feed"><header class="cp-feed-head svelte-tsx9t1"><span class="cp-feed-week svelte-tsx9t1"> </span> <span class="cp-feed-vs svelte-tsx9t1"> </span> <span class="cp-feed-tools svelte-tsx9t1"><button>NEWEST FIRST</button> <button>MY DRIVES</button> <button class="cp-feedtool svelte-tsx9t1">← BOARD</button></span></header> <div class="cp-feed-final svelte-tsx9t1"><b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-at svelte-tsx9t1">at</span> <b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-finalnote svelte-tsx9t1"> <!></span> <span class="cp-feed-prov svelte-tsx9t1"> </span></div> <div class="cp-feed-log svelte-tsx9t1" data-testid="cp-feed-log"><!> <!></div> <footer class="cp-feed-foot svelte-tsx9t1"><span> </span> <span class="cp-feed-dim svelte-tsx9t1">drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)</span></footer></section>`);function Wp(n,e){kn(e,!0);let a=vn(!1),s=vn(!1);const t=ln(()=>f(a)?[...e.feed.drives].reverse():e.feed.drives),r=ln(()=>f(s)?f(t).filter(V=>V.me):f(t)),o=V=>V.replace(":","·"),l=V=>V==="good"?"var(--cp-good)":V==="bad"?"var(--cp-bad)":V==="gold"?"var(--cp-gold)":"var(--cp-sub)";var i=Fp(),c=W(i),u=W(c),h=D(u),m=B(u,2),d=D(m),p=B(m,2),v=W(p);let g;var C=B(v,2);let T;var w=B(C,2),k=B(c,2),S=W(k),F=W(S),G=D(F,!0),J=B(F),E=B(S,4),R=W(E),I=D(R,!0),P=B(R),x=B(E,2),Q=W(x),$=B(Q);{var en=V=>{var nn=bp(),Z=D(nn);H(()=>y(Z,`· regulation ${e.feed.regAway??""}–${e.feed.regHome??""}`)),A(V,nn)};sn($,V=>{(e.feed.regHome!==e.feed.homeScore||e.feed.regAway!==e.feed.awayScore)&&V(en)})}var tn=B(x,2),O=D(tn,!0),q=B(k,2),j=W(q);cn(j,19,()=>f(r),V=>V.n,(V,nn,Z)=>{var on=Jp(),mn=gn(on);{var En=Wn=>{var $n=Ap(),ne=D($n,!0);H(()=>y(ne,f(nn).period>=5?"OT":`Q${f(nn).period}`)),A(Wn,$n)};sn(mn,Wn=>{!f(s)&&!f(a)&&(f(Z)===0||f(r)[f(Z)-1].period!==f(nn).period)&&Wn(En)})}var pn=B(mn,2);let Xn;var ce=W(pn),Ln=D(ce,!0),Mn=B(ce,2),be=D(Mn,!0),Fn=B(Mn,2),Un=W(Fn),re=D(Un,!0),fe=B(Un,2),ue=W(fe);cn(ue,17,()=>f(nn).badges,Wn=>Wn.label,(Wn,$n)=>{var ne=Do(),la=D(ne,!0);H(Ta=>{Ze(ne,`color:${Ta??""}`),y(la,f($n).label)},[()=>l(f($n).tone)]),A(Wn,ne)});var Vn=B(ue,2);cn(Vn,17,()=>f(nn).convBadges,Wn=>Wn.label,(Wn,$n)=>{var ne=Do(),la=D(ne,!0);H(Ta=>{Ze(ne,`color:${Ta??""}`),y(la,f($n).label)},[()=>l(f($n).tone)]),A(Wn,ne)});var Ae=B(Fn,2),ve=W(Ae),ge=D(ve,!0),Je=B(ve,4),Ue=D(Je,!0);H(Wn=>{Xn=xn(pn,1,"cp-feed-line svelte-tsx9t1",null,Xn,{"cp-me":f(nn).me}),Ze(pn,`--beat:${f(Z)??""}`),_n(pn,"data-period",f(nn).period),y(Ln,Wn),Ze(Mn,`color:${f(nn).teamPale??""}`),y(be,f(nn).teamAbbr),y(re,f(nn).summary),Ze(ve,`color:${e.feed.awayInk.pale??""}`),y(ge,f(nn).scoreAfter.away),Ze(Je,`color:${e.feed.homeInk.pale??""}`),y(Ue,f(nn).scoreAfter.home)},[()=>f(nn).period>=5?`OT${f(nn).period-4}`:o(f(nn).clock)]),A(V,on)});var Y=B(j,2);{var U=V=>{var nn=Mp();A(V,nn)};sn(Y,V=>{f(r).length||V(U)})}var b=B(q,2),_=W(b),z=D(_);H(()=>{y(h,`WEEK ${e.feed.week??""} · ${e.feed.year??""}`),y(d,`${e.feed.awayAbbr??""} @ ${e.feed.homeAbbr??""}`),g=xn(v,1,"cp-feedtool svelte-tsx9t1",null,g,{"cp-feedtool-on":f(a)}),_n(v,"aria-pressed",f(a)),T=xn(C,1,"cp-feedtool svelte-tsx9t1",null,T,{"cp-feedtool-on":f(s)}),_n(C,"aria-pressed",f(s)),Ze(F,`color:${e.feed.awayInk.pale??""}`),y(G,e.feed.awayAbbr),y(J,` ${e.feed.awayScore??""}`),Ze(R,`color:${e.feed.homeInk.pale??""}`),y(I,e.feed.homeAbbr),y(P,` ${e.feed.homeScore??""}`),y(Q,`${e.feed.ot?e.feed.ot.tie?`TIE — OT ×${e.feed.ot.periods} (both teams possessed)`:`FINAL — OT ×${e.feed.ot.periods} (both teams possessed)`:"FINAL"} `),y(O,e.feed.gameSeedLabel),y(z,`${e.feed.drives.length??""} drives · ${e.feed.meDrives??""} mine · ${e.feed.leadChanges??""} lead changes`)}),X("click",v,()=>an(a,!f(a))),X("click",C,()=>an(s,!f(s))),X("click",w,function(...V){e.onclose?.apply(this,V)}),A(n,i),Dn()}Gn(["click"]);var _p=M('· requested slot <b class="svelte-14csbb6"> </b>',1),Gp=M('<p class="cp-note cp-done-note svelte-14csbb6"> </p>'),Pp=M('<section class="cp-done svelte-14csbb6"><h1 class="cp-done-h1 svelte-14csbb6">Your draft is complete</h1> <p class="cp-done-sub svelte-14csbb6"><!></p> <p class="cp-prov cp-done-prov svelte-14csbb6">seed <b class="svelte-14csbb6"> </b> · engine <b class="svelte-14csbb6"> </b> <!> · every number reads <b class="svelte-14csbb6"> </b></p> <!> <div class="cp-chipline"><button class="cp-stepbtn cp-cta">PLAY THE SEASON</button> <button class="cp-stepbtn">YOUR PLAYER CARDS</button> <button class="cp-stepbtn">THE SEASON BOOK</button></div></section>');function Np(n,e){kn(e,!0);let a=ln(()=>e.record.picks.length),s=ln(()=>f(a)>=1024),t=ln(()=>e.record.picks.filter(R=>R.team===e.record.userTeam).length);var r=Pp(),o=B(W(r),2),l=W(o);{var i=R=>{var I=Jr("All 1,024 picks are in — every one of the 32 teams holds a full 32-man roster. The league is built; the season is yours to play.");A(R,I)},c=R=>{var I=Jr();H((P,x)=>y(I,`The draft has ${P??""} of 1,024 picks in (${x??""} of yours). Come back when the board says done — the season opens from here.`),[()=>Kn(f(a)),()=>Kn(f(t))]),A(R,I)};sn(l,R=>{f(s)?R(i):R(c,-1)})}var u=B(o,2),h=B(W(u)),m=D(h,!0),d=B(h,2),p=D(d,!0),v=B(d),g=B(v);{var C=R=>{var I=_p(),P=B(gn(I)),x=D(P,!0);H(()=>y(x,e.requestedSlot)),A(R,I)};sn(g,R=>{e.requestedSlot!==null&&R(C)})}var T=B(g,2),w=D(T,!0),k=B(u,2);{var S=R=>{var I=Gp(),P=D(I);H(()=>y(P,`You asked for draft slot ${e.requestedSlot??""}; the store ran the standard order — the store's slot wiring is the Architect's piece (P-317, filed §5). The engine's own order parameter supports it (proven node-side).`)),A(R,I)};sn(k,R=>{e.requestedSlot!==null&&R(S)})}var F=B(k,2),G=W(F),J=B(G,2),E=B(J,2);H((R,I,P)=>{_n(r,"data-state",f(s)?"complete":"partial"),y(m,e.record.seed),y(p,R),y(v,` · ${I??""} picks · ${hn[e.record.userTeam].name??""} `),y(w,P)},[()=>vr(),()=>Kn(f(a)),()=>oa[ae.get().mode]]),X("click",G,function(...R){e.onseason?.apply(this,R)}),X("click",J,function(...R){e.oncards?.apply(this,R)}),X("click",E,function(...R){e.onbook?.apply(this,R)}),A(n,r),Dn()}Gn(["click"]);var Ip=M('<button class="cp-stepbtn">RESTORE A SAVED WEEK</button>'),Hp=M('<div class="cp-panel"><h2 class="cp-h2">THE SEASON</h2> <p class="cp-note">No season is running. Finish a draft and the season opens from the draft-complete screen — or restore a saved week.</p> <!></div>'),Kp=M('<span class="cp-score"> </span>'),xp=M('<span class="cp-pending">NOT YET PLAYED</span>'),Op=M('<div class="cp-matchup"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div> <button class="cp-stepbtn cp-cta"> </button>',1),Vp=M('<p class="cp-note">No game for you this week — the league plays on.</p> <button class="cp-stepbtn cp-cta">PLAY THE WEEK</button>',1),Yp=M('<button class="cp-stepbtn">RESTORE</button>'),zp=M("<button> </button>"),Qp=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">OPEN THE SEASON BOOK</button></div>'),jp=M('<h2 class="cp-h2"> </h2> <div class="cp-hubrow svelte-k2xmuw"><div class="cp-gamecard cp-megame"><p class="cp-final"> </p> <!></div> <div class="cp-hubmeta cp-panel svelte-k2xmuw"><p class="cp-sub"> </p> <div class="cp-chipline"><button class="cp-stepbtn">WEEK VIEW</button> <button class="cp-stepbtn">STANDINGS</button> <button class="cp-stepbtn">PLAYOFFS</button> <button class="cp-stepbtn">BOOK</button> <!></div></div></div> <div class="cp-panel"><h3 class="cp-h3 svelte-k2xmuw">THE WEEKS</h3> <div class="cp-weekgrid svelte-k2xmuw"></div></div> <!>',1),Up=M('<section class="cp-hub"><!></section>');function qp(n,e){kn(e,!0);let a=ln(()=>e.season.ready?e.season.finished?"finished":"running":"none"),s=ln(()=>e.season.view?e.season.view.games.filter(c=>c.home===e.season.userTeamName||c.away===e.season.userTeamName):[]),t=ln(()=>f(s).length?f(s)[0]:null);var r=Up(),o=W(r);{var l=c=>{var u=Hp(),h=B(W(u),4);{var m=d=>{var p=Ip();X("click",p,function(...v){e.onrestore?.apply(this,v)}),A(d,p)};sn(h,d=>{e.canRestore&&d(m)})}A(c,u)},i=c=>{var u=jp(),h=gn(u),m=D(h),d=B(h,2),p=W(d),v=W(p),g=D(v),C=B(v,2);{var T=O=>{var q=Op(),j=gn(q),Y=W(j),U=D(Y,!0),b=B(Y,2);{var _=mn=>{var En=Kp(),pn=D(En);H(()=>y(pn,`${f(t).as??""} — ${f(t).hs??""}`)),A(mn,En)},z=mn=>{var En=xp();A(mn,En)};sn(b,mn=>{f(t).hs!==null?mn(_):mn(z,-1)})}var V=B(b,2),nn=D(V,!0),Z=B(j,2),on=D(Z,!0);H(()=>{y(U,f(t).awayAbbr),y(nn,f(t).homeAbbr),y(on,f(t).hs!==null?"WATCH THE FEED":"PLAY THE WEEK")}),X("click",Z,function(...mn){e.onplayweek?.apply(this,mn)}),A(O,q)},w=O=>{var q=Vp(),j=B(gn(q),2);X("click",j,function(...Y){e.onplayweek?.apply(this,Y)}),A(O,q)};sn(C,O=>{f(t)?O(T):O(w,-1)})}var k=B(p,2),S=W(k),F=D(S),G=B(S,2),J=W(G),E=B(J,2),R=B(E,2),I=B(R,2),P=B(I,2);{var x=O=>{var q=Yp();X("click",q,function(...j){e.onrestore?.apply(this,j)}),A(O,q)};sn(P,O=>{e.canRestore&&O(x)})}var Q=B(d,2),$=B(W(Q),2);cn($,21,()=>Array(e.season.total),Ua,(O,q,j)=>{const Y=ln(()=>j+1);var U=zp();let b;var _=D(U,!0);H(()=>{b=xn(U,1,"cp-wk svelte-k2xmuw",null,b,{"cp-cur":f(Y)===e.season.slot,"cp-played":f(Y)<e.season.slot+0&&e.season.atLastPlayed===!1||f(Y)<=e.season.slot-1}),y(_,f(Y)>Va?["WC","DIV","CONF","SB"][f(Y)-Va-1]:f(Y))}),X("click",U,()=>e.onweek(f(Y))),A(O,U)});var en=B(Q,2);{var tn=O=>{var q=Qp(),j=W(q),Y=D(j),U=B(j,2);H(b=>y(Y,`${b??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion?.toUpperCase()]),X("click",U,function(...b){e.onbook?.apply(this,b)}),A(O,q)};sn(en,O=>{e.season.finished&&O(tn)})}H((O,q,j)=>{y(m,`THE SEASON · ${O??""} · ${e.season.view?.label??""??""}`),y(g,`YOUR GAME · ${e.season.view?.label??""??""}`),y(F,`Week slot ${q??""} of ${j??""} · ${e.season.finished?"season finished":e.season.atLastPlayed?"you are at the latest played week":"reviewing an earlier week"}`)},[()=>e.season.userTeamName.toUpperCase(),()=>Kn(e.season.slot),()=>Kn(e.season.total)]),X("click",J,()=>e.onweek(e.season.slot)),X("click",E,function(...O){e.onstandings?.apply(this,O)}),X("click",R,function(...O){e.onbracket?.apply(this,O)}),X("click",I,function(...O){e.onbook?.apply(this,O)}),A(c,u)};sn(o,c=>{f(a)==="none"?c(l):c(i,-1)})}H(()=>_n(r,"data-phase",f(a))),A(n,r),Dn()}Gn(["click"]);var wo=M('<button class="cp-stepbtn cp-cta"> </button>'),Zp=M('<button class="cp-stepbtn">WATCH THE FEED</button>'),Xp=M('<p class="cp-note">No season is running — open the hub to begin one.</p>'),$p=M('<span class="cp-score"> </span> <span class="cp-final">FINAL</span>',1),nh=M('<span class="cp-pending"> </span>'),eh=M('<div><div class="cp-matchup"><span class="cp-abbr"> </span> <!></div> <p class="cp-sub cp-gs"> </p></div>'),ah=M('<p class="cp-note">No games this slot.</p>'),sh=M('<div class="cp-grid"></div> <!>',1),th=M('<section class="cp-week"><div class="cp-stepper"><button class="cp-stepbtn">‹ PREV</button> <span class="cp-weeklabel"> </span> <button class="cp-stepbtn">NEXT ›</button> <span class="cp-sub"> </span> <!> <!> <button class="cp-stepbtn">SAVE</button></div> <!></section>');function rh(n,e){kn(e,!0);let a=ln(()=>e.season.view),s=ln(()=>f(a)?.games.find(S=>S.home===e.season.userTeamName||S.away===e.season.userTeamName)??null);var t=th(),r=W(t),o=W(r),l=B(o,2),i=D(l,!0),c=B(l,2),u=B(c,2),h=D(u),m=B(u,2);{var d=S=>{var F=wo(),G=D(F);H(()=>y(G,`PLAY WEEK ${e.season.slot??""}`)),X("click",F,function(...J){e.onplay?.apply(this,J)}),A(S,F)},p=S=>{var F=wo(),G=D(F);H(()=>y(G,`STEP TO WEEK ${e.season.slot+1}`)),X("click",F,function(...J){e.onplay?.apply(this,J)}),A(S,F)};sn(m,S=>{f(s)&&f(s).hs===null?S(d):e.season.atLastPlayed&&!e.season.finished&&S(p,1)})}var v=B(m,2);{var g=S=>{var F=Zp();X("click",F,()=>e.onfeed(f(s).home)),A(S,F)};sn(v,S=>{f(s)&&f(s).hs!==null&&S(g)})}var C=B(v,2),T=B(r,2);{var w=S=>{var F=Xp();A(S,F)},k=S=>{var F=sh(),G=gn(F);cn(G,21,()=>f(a).games,R=>R.replayLabel,(R,I)=>{var P=eh();let x;var Q=W(P),$=W(Q),en=D($,!0),tn=B($,2);{var O=U=>{var b=$p(),_=gn(b),z=D(_);H(()=>y(z,`${f(I).as??""} — ${f(I).hs??""}`)),A(U,b)},q=U=>{var b=nh(),_=D(b);H(()=>y(_,`@ ${f(I).homeAbbr??""} · not yet played`)),A(U,b)};sn(tn,U=>{f(I).hs!==null?U(O):U(q,-1)})}var j=B(Q,2),Y=D(j);H(U=>{x=xn(P,1,"cp-gamecard",null,x,{"cp-megame":f(I).home===e.season.userTeamName||f(I).away===e.season.userTeamName}),y(en,f(I).awayAbbr),y(Y,`gameSeed ${U??""}${f(I).round?" · "+f(I).round:""}`)},[()=>Kn(f(I).gameSeed)]),A(R,P)});var J=B(G,2);{var E=R=>{var I=ah();A(R,I)};sn(J,R=>{f(a).games.length===0&&R(E)})}A(S,F)};sn(T,S=>{f(a)?S(k,-1):S(w)})}H((S,F)=>{o.disabled=e.season.slot<=1,y(i,e.season.label),c.disabled=e.season.slot>=e.season.total,y(h,`week slot ${S??""} / ${F??""}`)},[()=>Kn(e.season.slot),()=>Kn(e.season.total)]),X("click",o,()=>bn.prev()),X("click",c,()=>bn.next()),X("click",C,function(...S){e.onsave?.apply(this,S)}),A(n,t),Dn()}Gn(["click"]);var oh=M('<p class="cp-note">No season is running — the standings arrive with it.</p>'),lh=M('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),ih=M('<div class="cp-panel cp-stdiv"><h3 class="cp-h3"> </h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th><th class="num">PCT</th><th class="num">SEED</th></tr></thead><tbody></tbody></table></div>'),ch=M('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),fh=M('<h2 class="cp-h2"> </h2> <div class="cp-stdivs svelte-1z0ye32"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table></div> <div class="cp-chipline"><button class="cp-stepbtn cp-cta">THE PLAYOFF PICTURE</button></div>',1),uh=M('<section class="cp-st"><!></section>');function dh(n,e){kn(e,!0);let a=ln(()=>e.season.standings);var s=uh(),t=W(s);{var r=l=>{var i=oh();A(l,i)},o=l=>{var i=fh(),c=gn(i),u=D(c),h=B(c,2);cn(h,21,()=>f(a).divisions,C=>C.conf+C.div,(C,T)=>{var w=ih(),k=W(w),S=D(k),F=B(k,2),G=B(W(F));cn(G,21,()=>f(T).rows,J=>J.team,(J,E)=>{var R=lh();let I;var P=W(R),x=D(P),Q=B(P),$=D(Q,!0),en=B(Q),tn=D(en,!0),O=B(en),q=D(O,!0),j=B(O),Y=D(j,!0),U=B(j),b=D(U,!0),_=B(U),z=D(_,!0),V=B(_),nn=D(V,!0);H(Z=>{I=xn(R,1,"",null,I,{"cp-me":f(E).team===e.season.userTeamName}),y(x,`${Z??""} ${f(E).team??""}`),y($,f(E).w),y(tn,f(E).l),y(q,f(E).t),y(Y,f(E).pf),y(b,f(E).pa),y(z,f(E).winPct),y(nn,f(E).seed??"—")},[()=>wn(f(E).team)]),A(J,R)}),H(()=>y(S,`${f(T).conf??""} ${f(T).div??""}`)),A(C,w)});var m=B(h,2),d=B(W(m),2),p=B(W(d));cn(p,23,()=>f(a).league,C=>C.team,(C,T,w)=>{var k=ch();let S;var F=W(k),G=D(F,!0),J=B(F),E=D(J),R=B(J),I=D(R,!0),P=B(R),x=D(P,!0),Q=B(P),$=D(Q,!0),en=B(Q),tn=D(en,!0),O=B(en),q=D(O,!0);H(j=>{S=xn(k,1,"",null,S,{"cp-me":f(T).team===e.season.userTeamName}),y(G,f(w)+1),y(E,`${j??""} ${f(T).team??""}`),y(I,f(T).w),y(x,f(T).l),y($,f(T).t),y(tn,f(T).pf),y(q,f(T).pa)},[()=>wn(f(T).team)]),A(C,k)});var v=B(m,2),g=D(v);H(C=>y(u,`STANDINGS · THROUGH ${C??""}`),[()=>f(a).throughWeek===18?"WEEK 18":"WEEK "+Kn(f(a).throughWeek)]),X("click",g,function(...C){e.onbracket?.apply(this,C)}),A(l,i)};sn(t,l=>{f(a)?l(o,-1):l(r)})}A(n,s),Dn()}Gn(["click"]);const ph={"Wild Card":"WILD CARD",Divisional:"DIVISIONAL",Conference:"CONFERENCE","Super Bowl":"SUPER BOWL"},hh=["Wild Card","Divisional","Conference","Super Bowl"],mh=(n,e,a)=>{if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}const s=n.playoffs.filter(t=>t.round===e);if(s.length===0){const t=(r,o)=>n.playoffs.filter(l=>l.round===r&&(a?.seeds[o].includes(l.home)??!1)).map(l=>l.hs>l.as?l.home:l.away);if(e==="Divisional"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=u=>l.indexOf(u)+1,c=[l[0],...t("Wild Card",o)].sort((u,h)=>i(u)-i(h));c.length===4&&r.push([c[0],c[3]],[c[1],c[2]])}return r}if(e==="Conference"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=u=>l.indexOf(u)+1,c=t("Divisional",o).sort((u,h)=>i(u)-i(h));c.length===2&&r.push([c[0],c[1]])}return r}if(e==="Super Bowl"){const r=["AFC","NFC"].map(o=>t("Conference",o)[0]).filter(Boolean);if(r.length===2)return[[r[0],r[1]]]}return[]}return s.map(t=>[t.home,t.away])};function vh(n,e){const a=n.seeding,s=r=>(a?.seeds[r]??[]).map((o,l)=>({seed:l+1,team:o,abbr:wn(o),me:o===e})),t=hh.map(r=>{const o=mh(n,r,a??null),l=n.playoffs.filter(c=>c.round===r),i=o.length===0?"pending":l.length===o.length?"played":"ready";return{round:r,label:ph[r],state:i,pairs:o.map(([c,u])=>{const h=l.find(m=>m.home===c&&m.away===u);return{home:c,away:u,homeAbbr:wn(c),awayAbbr:wn(u),hs:h?h.hs:null,as:h?h.as:null,winner:h?h.hs>h.as?c:h.as>h.hs?u:null:null,gameSeed:0}})}});return{seeded:!!a,seeds:{AFC:s("AFC"),NFC:s("NFC")},rounds:t,champion:n.champion,championAbbr:n.champion?wn(n.champion):null}}var gh=M('<p class="cp-note">No season is running — the bracket arrives with it.</p>'),Bh=M(`<p class="cp-note">The field is set after week 18. Keep stepping the season — the bracket fills itself from the engine's seeding.</p>`),Ch=M("<span> </span>"),Th=M('<h3 class="cp-h3"> </h3> <div class="cp-seeds svelte-1f06r09"></div>',1),yh=M('<div class="cp-panel"></div>'),Sh=M(`<p class="cp-sub">Pending — the round's pairs derive from the round before it.</p>`),kh=M('<span class="cp-score"> </span> <span class="cp-final"> </span>',1),Dh=M('<span class="cp-pending">VS · not yet played</span>'),wh=M('<div class="cp-matchup cp-brpair svelte-1f06r09"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div>'),Rh=M('<div class="cp-brackround"><h3> </h3> <!></div>'),Eh=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Lh=M('<h2 class="cp-h2">THE PLAYOFFS</h2> <!> <div class="cp-bracket-list svelte-1f06r09"></div> <!>',1),bh=M('<section class="cp-bracket"><!></section>');function Ah(n,e){kn(e,!0);let a=ln(()=>e.season.runState?vh(e.season.runState,e.season.userTeamName):null);var s=bh(),t=W(s);{var r=l=>{var i=gh();A(l,i)},o=l=>{var i=Lh(),c=B(gn(i),2);{var u=v=>{var g=Bh();A(v,g)},h=v=>{var g=yh();cn(g,20,()=>["AFC","NFC"],C=>C,(C,T)=>{var w=Th(),k=gn(w),S=D(k),F=B(k,2);cn(F,21,()=>f(a).seeds[T],G=>G.seed,(G,J)=>{var E=Ch();let R;var I=D(E);H(()=>{R=xn(E,1,"cp-seedrow svelte-1f06r09",null,R,{"cp-meseed":f(J).me}),y(I,`${f(J).seed??""}. ${f(J).abbr??""}`)}),A(G,E)}),H(()=>y(S,`${T??""} FIELD`)),A(C,w)}),A(v,g)};sn(c,v=>{f(a).seeded?v(h,-1):v(u)})}var m=B(c,2);cn(m,21,()=>f(a).rounds,v=>v.round,(v,g)=>{var C=Rh(),T=W(C),w=D(T,!0),k=B(T,2);{var S=G=>{var J=Sh();A(G,J)},F=G=>{var J=tf(),E=gn(J);cn(E,17,()=>f(g).pairs,R=>R.home+R.away,(R,I)=>{var P=wh(),x=W(P),Q=D(x,!0),$=B(x,2);{var en=j=>{var Y=kh(),U=gn(Y),b=D(U),_=B(U,2),z=D(_);H(V=>{y(b,`${f(I).as??""} — ${f(I).hs??""}`),y(z,`FINAL · ${V??""}`)},[()=>f(I).winner?f(I).winner.toUpperCase():""]),A(j,Y)},tn=j=>{var Y=Dh();A(j,Y)};sn($,j=>{f(I).hs!==null?j(en):j(tn,-1)})}var O=B($,2),q=D(O,!0);H(()=>{y(Q,f(I).awayAbbr),y(q,f(I).homeAbbr)}),A(R,P)}),A(G,J)};sn(k,G=>{f(g).pairs.length===0?G(S):G(F,-1)})}H(()=>{_n(C,"data-state",f(g).state),y(w,f(g).label)}),A(v,C)});var d=B(m,2);{var p=v=>{var g=Eh(),C=W(g),T=D(C),w=B(C,2);H(k=>y(T,`${k??""} · SUPER BOWL CHAMPIONS`),[()=>f(a).champion.toUpperCase()]),X("click",w,function(...k){e.onreview?.apply(this,k)}),A(v,g)};sn(d,v=>{f(a).champion&&v(p)})}A(l,i)};sn(t,l=>{f(a)?l(o,-1):l(r)})}A(n,s),Dn()}Gn(["click"]);var Jh=M('<p class="cp-note">No season yet — the book opens when one has been played.</p>'),Mh=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Fh=M('<div class="cp-revline"><span class="per"> </span> <span class="cp-abbr"> </span> <span class="cp-score"> </span> <span class="cp-abbr"> </span> <button class="cp-stepbtn">REPLAY FEED</button></div>'),Wh=M('<p class="cp-sub">The playoffs have not been played yet.</p>'),_h=M('<div class="cp-pcard"><div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div></div>'),Gh=M('<div class="cp-cardgrid"></div>'),Ph=M(`<p class="cp-sub">The champion's draft class rides the finished draft.</p>`),Nh=M('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),Ih=M('<div class="cp-panel"><h3 class="cp-h3">FINAL STANDINGS</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table> <p class="cp-sub">Top 10 shown; the full table lives on Standings.</p></div>'),Hh=M(`<!> <div class="cp-panel"><h3 class="cp-h3">REPLAYABLE PLAYOFF GAMES</h3> <!></div> <div class="cp-panel"><h3 class="cp-h3">THE CHAMPION'S ROSTER</h3> <!></div> <!>`,1),Kh=M('<section class="cp-book"><h2 class="cp-h2"> </h2> <!></section>');function xh(n,e){kn(e,!0);let a=ln(()=>{const c=e.draftRecord;if(!c||!e.season.champion)return[];const u=or(c.pool),h=new Map(u.map(d=>[d.id,d])),m=hn.findIndex(d=>d.name===e.season.champion);return m<0?[]:c.picks.filter(d=>d.team===m).map(d=>h.get(d.pid)).filter(Boolean)});var s=Kh(),t=W(s),r=D(t),o=B(t,2);{var l=c=>{var u=Jh();A(c,u)},i=c=>{var u=Hh(),h=gn(u);{var m=S=>{var F=Mh(),G=W(F),J=D(G),E=B(G,2);H(R=>y(J,`${R??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),X("click",E,function(...R){e.onreview?.apply(this,R)}),A(S,F)};sn(h,S=>{e.season.champion&&S(m)})}var d=B(h,2),p=B(W(d),2);cn(p,17,()=>e.season.runState?.playoffs??[],S=>S.week+S.home,(S,F)=>{var G=Fh(),J=W(G),E=D(J,!0),R=B(J,2),I=D(R,!0),P=B(R,2),x=D(P),Q=B(P,2),$=D(Q,!0),en=B(Q,2);H((tn,O,q)=>{y(E,tn),y(I,O),y(x,`${f(F).as??""} — ${f(F).hs??""}`),y($,q)},[()=>f(F).round?.toUpperCase(),()=>wn(f(F).away),()=>wn(f(F).home)]),X("click",en,()=>e.onfeed(f(F).home)),A(S,G)},S=>{var F=Wh();A(S,F)});var v=B(d,2),g=B(W(v),2);{var C=S=>{var F=Gh();cn(F,23,()=>f(a),G=>G.id,(G,J,E)=>{var R=_h(),I=W(R),P=D(I,!0),x=B(I,2),Q=D(x,!0),$=B(x,2),en=D($);H((tn,O,q)=>{y(P,tn),y(Q,f(J).name),y(en,`${f(J).pos??""} · ${f(J).team??""} · OVR ${O??""} · pick ${q??""}`)},[()=>f(J).name.split(/\s+/).slice(0,2).map(tn=>tn[0]).join(""),()=>Kn(f(J).ovr),()=>Kn(f(E)+1)]),A(G,R)}),A(S,F)},T=S=>{var F=Ph();A(S,F)};sn(g,S=>{f(a).length?S(C):S(T,-1)})}var w=B(v,2);{var k=S=>{var F=Ih(),G=B(W(F),2),J=B(W(G));cn(J,23,()=>e.season.standings.league.slice(0,10),E=>E.team,(E,R,I)=>{var P=Nh();let x;var Q=W(P),$=D(Q,!0),en=B(Q),tn=D(en),O=B(en),q=D(O,!0),j=B(O),Y=D(j,!0),U=B(j),b=D(U,!0),_=B(U),z=D(_,!0),V=B(_),nn=D(V,!0);H(Z=>{x=xn(P,1,"",null,x,{"cp-me":f(R).team===e.season.userTeamName}),y($,f(I)+1),y(tn,`${Z??""} ${f(R).team??""}`),y(q,f(R).w),y(Y,f(R).l),y(b,f(R).t),y(z,f(R).pf),y(nn,f(R).pa)},[()=>wn(f(R).team)]),A(E,P)}),A(S,F)};sn(w,S=>{e.season.standings&&S(k)})}A(c,u)};sn(o,c=>{e.season.ready?c(i,-1):c(l)})}H(c=>y(r,`THE SEASON BOOK${c??""}`),[()=>e.season.champion?` · ${e.season.champion.toUpperCase()}`:""]),A(n,s),Dn()}Gn(["click"]);const Ro={MVP:"MOST VALUABLE PLAYER",OPOY:"OFFENSIVE PLAYER OF THE YEAR",DPOY:"DEFENSIVE PLAYER OF THE YEAR",COACH:"COACH OF THE YEAR"},Eo={pyd:"PASSING YARDS",ptd:"PASSING TD",ryd:"RUSHING YARDS",rtd:"RUSHING TD",recYd:"RECEIVING YARDS",rec:"RECEPTIONS",recTd:"RECEIVING TD",sack:"SACKS",intDef:"INTERCEPTIONS",tkl:"TACKLES",ff:"FORCED FUMBLES",fgm:"FIELD GOALS",defTd:"DEFENSIVE TD"},Oh={pyd:"pyd",ptd:"ptd",ryd:"ryd",rtd:"rtd",recYd:"recYd",rec:"rec",recTd:"recTd",sack:"sack",intDef:"intDef",tkl:"tkl",ff:"ff",fgm:"fgm",defTd:"defTd"},Lo=(n,e)=>{const a=n[e];return a?`${a.w}-${a.l}${a.t?"-"+a.t:""}`:""};function Vh(n,e){const a=Ju(n,e),s=(o,l)=>l&&{key:o,name:Ro[o]??o,winner:l.name,line:`${l.label} · ${Object.entries(l.stats).filter(([,i])=>i>0).slice(0,3).map(([i,c])=>`${i} ${c}`).join(", ")}`,team:l.team,teamAbbr:wn(l.team),teamWins:Lo(e,l.team),shimmer:!1}||null,t=[];for(const[o,l]of[["MVP",a.mvp],["OPOY",a.opoy],["DPOY",a.dpoy]]){const i=s(o,l);i&&t.push(i)}a.coach&&t.push({key:"COACH",name:Ro.COACH,winner:a.coach.team,line:`${Cs("wins",a.coach.over)} over expected`,team:a.coach.team,teamAbbr:wn(a.coach.team),teamWins:Lo(e,a.coach.team),shimmer:!1});const r=ci.filter(o=>Eo[o]).map(o=>({key:o,label:Eo[o],rows:mr(n,o,5).map(l=>({name:l.name,team:l.team,abbr:wn(l.team),value:String(l.stats[Oh[o]??o]??0)}))}));return{regular:t,leaders:r}}var Yh=M('<p class="cp-note">No season statistics yet — the awards are computed from the games the engine plays, never promised in advance.</p>'),zh=M('<div class="cp-award"><div class="aname"> </div> <div> </div> <div class="cp-sub"> </div> <div class="cp-sub"> </div></div>'),Qh=M('<p class="cp-sub">The winners arrive with the finished season.</p>'),jh=M('<div class="cp-lrow svelte-1yazvx7"><span class="cp-lrank svelte-1yazvx7"> </span> <span class="cp-lteam svelte-1yazvx7"> </span> <b class="cp-lval svelte-1yazvx7"> </b></div>'),Uh=M('<div class="cp-leadercol"><h4 class="cp-lh svelte-1yazvx7"> </h4> <!></div>'),qh=M('<div class="cp-awards-grid svelte-1yazvx7"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE LEADERS</h3> <div class="cp-leadercols svelte-1yazvx7"></div></div>',1),Zh=M('<section class="cp-awards"><h2 class="cp-h2">THE AWARDS</h2> <!></section>');function Xh(n,e){kn(e,!0);let a=ln(()=>e.stats&&e.table?Vh(e.stats,e.table):null);var s=Zh(),t=B(W(s),2);{var r=l=>{var i=Yh();A(l,i)},o=l=>{var i=qh(),c=gn(i);cn(c,21,()=>f(a).regular,m=>m.key,(m,d)=>{var p=zh(),v=W(p),g=D(v,!0),C=B(v,2);let T;var w=D(C,!0),k=B(C,2),S=D(k,!0),F=B(k,2),G=D(F);H(()=>{y(g,f(d).name),T=xn(C,1,"awinner",null,T,{"cp-shimmer90":f(d).shimmer}),y(w,f(d).winner),y(S,f(d).line),y(G,`${f(d).teamAbbr??""} · ${f(d).teamWins??""}`)}),A(m,p)},m=>{var d=Qh();A(m,d)});var u=B(c,2),h=B(W(u),2);cn(h,21,()=>f(a).leaders,m=>m.key,(m,d)=>{var p=Uh(),v=W(p),g=D(v,!0),C=B(v,2);cn(C,19,()=>f(d).rows,T=>T.name,(T,w,k)=>{var S=jh(),F=W(S),G=D(F,!0),J=B(F),E=B(J),R=D(E),I=B(E,2),P=D(I,!0);H(()=>{y(G,f(k)+1),y(J,` ${f(w).name??""} `),y(R,`(${f(w).abbr??""})`),y(P,f(w).value)}),A(T,S)}),H(()=>y(g,f(d).label)),A(m,p)}),A(l,i)};sn(t,l=>{f(a)?l(o,-1):l(r)})}A(n,s),Dn()}const bo={"missed-playoffs":"The season ended in week 18 — the playoffs went on without you.","wild-card":"Your season ended in the Wild Card round.",divisional:"Your season ended in the Divisional round.",conference:"Your season ended in the Conference championship.","super-bowl-loss":"You reached the Super Bowl and fell one game short.",champion:"You won the Super Bowl."};function $h(n,e){const a=pr(n),s=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e),t=a[e]??{w:0,l:0,t:0,pf:0,pa:0},r=s.filter(l=>l.round).map(l=>l.round).pop(),o=n.champion===e?"champion":r??"missed-playoffs";return{year:n.year,userTeam:e,userAbbr:wn(e),outcome:bo[o]??bo["missed-playoffs"],w:t.w,l:t.l,t:t.t,pf:t.pf,pa:t.pa,gamesPlayed:s.length,champion:n.champion??"",championAbbr:n.champion?wn(n.champion):"",userMadePlayoffs:!!r,highlightLines:[`You played ${s.length} games and went ${t.w}-${t.l}${t.t?"-"+t.t:""}.`,`Your team scored ${t.pf} points and allowed ${t.pa}.`,n.champion?`The season's champion: ${n.champion}.`:"The season is not finished yet."]}}var nm=M('<p class="cp-note">No season to review yet — the review arrives with the run.</p>'),em=M('<div class="cp-champbanner"><div class="champ"> </div></div>'),am=M('<div class="cp-chipstat"><b> </b><span>TIES</span></div>'),sm=M('<p class="cp-revsummary svelte-1vfenj1"> </p>'),tm=M('<h2 class="cp-h2"> </h2> <!> <div class="cp-chipline"><div class="cp-chipstat"><b> </b><span>WINS</span></div> <div class="cp-chipstat"><b> </b><span>LOSSES</span></div> <!> <div class="cp-chipstat"><b> </b><span>POINTS FOR</span></div> <div class="cp-chipstat"><b> </b><span>POINTS AGAINST</span></div> <div class="cp-chipstat"><b> </b><span>GAMES PLAYED</span></div></div> <div class="cp-panel cp-guide"><p class="cp-done-sub"> </p> <!></div> <div class="cp-chipline"><button class="cp-stepbtn">THE BRACKET</button> <button class="cp-stepbtn">THE AWARDS</button> <button class="cp-stepbtn cp-cta">THE SEASON BOOK</button></div>',1),rm=M('<section class="cp-sreview"><!></section>');function om(n,e){kn(e,!0);let a=ln(()=>e.season.runState?$h(e.season.runState,e.season.userTeamName):null);var s=rm(),t=W(s);{var r=l=>{var i=nm();A(l,i)},o=l=>{var i=tm(),c=gn(i),u=D(c),h=B(c,2);{var m=b=>{var _=em(),z=W(_),V=D(z);H(nn=>y(V,`${nn??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),A(b,_)};sn(h,b=>{e.season.champion&&b(m)})}var d=B(h,2),p=W(d),v=W(p),g=D(v,!0),C=B(p,2),T=W(C),w=D(T,!0),k=B(C,2);{var S=b=>{var _=am(),z=W(_),V=D(z,!0);H(()=>y(V,f(a).t)),A(b,_)};sn(k,b=>{f(a).t&&b(S)})}var F=B(k,2),G=W(F),J=D(G,!0),E=B(F,2),R=W(E),I=D(R,!0),P=B(E,2),x=W(P),Q=D(x,!0),$=B(d,2),en=W($),tn=D(en,!0),O=B(en,2);cn(O,16,()=>f(a).highlightLines,b=>b,(b,_)=>{var z=sm(),V=D(z,!0);H(()=>y(V,_)),A(b,z)});var q=B($,2),j=W(q),Y=B(j,2),U=B(Y,2);H((b,_,z)=>{y(u,`THE SEASON REVIEW · ${f(a).userAbbr??""} ${b??""}`),y(g,f(a).w),y(w,f(a).l),y(J,_),y(I,z),y(Q,f(a).gamesPlayed),y(tn,f(a).outcome)},[()=>e.season.userTeamName.toUpperCase(),()=>Kn(f(a).pf),()=>Kn(f(a).pa)]),X("click",j,function(...b){e.onbracket?.apply(this,b)}),X("click",Y,function(...b){e.onawards?.apply(this,b)}),X("click",U,function(...b){e.onbook?.apply(this,b)}),A(l,i)};sn(t,l=>{f(a)?l(o,-1):l(r)})}A(n,s),Dn()}Gn(["click"]);Lc();var lm=M(`<section class="cp-guide"><h2 class="cp-h2">HOW THIS WORKS</h2> <p class="cp-note">76 Pancakes is a draft simulator: you draft real players for one of the 32 teams, the other 31 teams draft against you, and then the engine plays a full 22-week season — every game, every drive — from the rosters the draft produced. Nothing on any screen is a promise; every number is a measured value the engine computed.</p> <dl><dt>THE DRAFT</dt> <dd>32 teams, 32 rounds, one pick per slot. Your board shows the players you can still take; the CPU teams pick by the engine's own policy while you are not on the clock. You may draft a player into any slot he legally fits — a flex cost applies when he plays out of position, and the cost is the engine's own table, shown as "−N flex".</dd> <dt>THE NUMBERS (Wins · Priority · OVR)</dt> <dd><b>Wins</b> <b>Priority</b> is Wins divided by the gone odds — the value of taking him right now. <b>OVR</b> is the player's overall rating. Only these three ride the board; integers everywhere except Wins and Priority, which print one decimal.</dd> <dt>GONE%</dt> <dd>The chance the player is drafted between now and your next pick. The method, in plain words: the engine simulates the CPU draft from this point 30 times and counts how often each player is gone when your turn returns. Hover the column to see the exact counts.</dd> <dt>VALUATION MODES</dt> <dd>Every number carries a label: <b>Model Value</b> (the engine's measured default), <b>Game balance</b>, or <b>Owner preset</b>. One mode at a time, never blended; the label travels with the numbers everywhere they appear; the switch locks the moment a draft starts.</dd> <dt>THE SEASON</dt> <dd>The finished rosters become 32 rated teams (the engine builds each team's lineup and rates it — no ratings are invented here). The engine builds the schedule, plays every game week by week through its drive generator, seeds the playoffs after week 18, and plays Wild Card → Divisional → Conference → Super Bowl. Each game's result is a fixed derivation of the season seed and the matchup: the same draft and seed always replay the same game, and the gameSeed stamp on every card proves it.</dd> <dt>THE FEED AND THE RECAP</dt> <dd>The feed is the play-by-play of the user's game, drive by drive, with running scores and lead-change marks. The recap names every score, every turnover and every star in plain informative lines. Overtime events appear in the overtime block; the words "expected scoring" and "sudden death" never appear anywhere in this product. There are no injuries in any sport, ever.</dd> <dt>SAVES</dt> <dd>One save blob per slot, version-checked on every read. A corrupt save is refused and shown verbatim — never repaired, never silently replaced. A save written by a newer build is refused with its version named.</dd> <dt>OFFLINE</dt> <dd>The fonts are bundled in the app (Cinzel, inlined — never loaded from Google's servers). The whole product runs from a single file on disk with no network. Shareable cards export as one self-contained file each.</dd> <dt>BUILD</dt> <dd> </dd></dl></section>`);function im(n,e){kn(e,!1),Ef();var a=lm(),s=B(W(a),4),t=B(W(s),6),r=B(W(t));r.nodeValue=" is the model's estimate of how many wins a player adds — the engine's weight-OVR units carried to wins (one number, one decimal). ";var o=B(t,28),l=D(o);H(i=>y(l,`Engine stamp ${i??""} — the frozen snapshot this shell consumes byte-identically. The engine's own test suite runs in this tree; the shell's battery laws run against the built app.`),[()=>vr()]),A(n,a),Dn()}const cm=n=>n.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0].toUpperCase()).join("");function fm(n){return{cards:n.rows.map(a=>({id:a.id,name:a.name,pos:a.pos,nflTeam:a.nflTeam,ovr:a.ovr,wins:a.wins,priority:a.priority,slotId:a.slotId,slotLabel:a.slotLabel,tone:a.tone,alsoFits:a.alsoFits.map(s=>s.slotLabel+(s.flex?" ("+s.flex+")":"")),monogram:cm(a.name),arrow:a.tone==="good"?"up":a.tone==="bad"?"down":"flat"})),teamName:n.header.teamName,overall:n.header.overall,totalPicks:n.header.totalPicks,onClock:n.header.onClock,count:n.footer.text}}var um=M(`<p class="cp-note">No board yet — the cards re-render the board's own rows, so a draft has to exist first.</p>`),dm=M('<div class="pmeta cp-fitsline"> </div>'),pm=M('<div class="cp-pcard"><span title="form"> </span> <div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div> <div class="pnum"><div><b> </b><span>WINS</span></div> <div><b> </b><span>PRIORITY</span></div> <div><b> </b><span>OVR</span></div></div> <!></div>'),hm=M('<p class="cp-sub"> </p> <div class="cp-cardgrid"></div> <p class="cp-prov">Every number on these cards reads <b> </b> </p>',1),mm=M('<section class="cp-cards"><h2 class="cp-h2"> </h2> <!></section>');function vm(n,e){kn(e,!0);let a=ln(()=>e.vm?fm(e.vm):null);var s=mm(),t=W(s),r=D(t),o=B(t,2);{var l=c=>{var u=um();A(c,u)},i=c=>{var u=hm(),h=gn(u),m=D(h,!0),d=B(h,2);cn(d,21,()=>f(a).cards,T=>T.id,(T,w)=>{var k=pm(),S=W(k),F=D(S,!0),G=B(S,2),J=D(G,!0),E=B(G,2),R=D(E,!0),I=B(E,2),P=D(I),x=B(I,2),Q=W(x),$=W(Q),en=D($,!0),tn=B(Q,2),O=W(tn),q=D(O,!0),j=B(tn,2),Y=W(j),U=D(Y,!0),b=B(x,2);{var _=z=>{var V=dm(),nn=D(V,!0);H(Z=>y(nn,Z),[()=>f(w).alsoFits.join(" · ")]),A(z,V)};sn(b,z=>{f(w).alsoFits.length&&z(_)})}H(()=>{_n(k,"data-tone",f(w).tone),xn(S,1,`cp-arrow ${f(w).arrow??""}`),y(F,f(w).arrow==="up"?"▲":f(w).arrow==="down"?"▼":"—"),y(J,f(w).monogram),y(R,f(w).name),y(P,`${f(w).pos??""} · ${f(w).nflTeam??""} · fills ${f(w).slotLabel??""}`),y(en,f(w).wins),y(q,f(w).priority),y(U,f(w).ovr)}),A(T,k)});var p=B(d,2),v=B(W(p)),g=D(v,!0),C=B(v);H(T=>{y(m,f(a).onClock),y(g,T),y(C,` — the label travels with the numbers. ${f(a).count??""}.`)},[()=>oa[ae.get().mode]]),A(c,u)};sn(o,c=>{f(a)?c(i,-1):c(l)})}H(()=>y(r,`PLAYER CARDS${f(a)?` · ${f(a).teamName}`:""}`)),A(n,s),Dn()}var gm=M('<p class="cp-note">No season statistics yet — the stats accumulate from the games the engine plays.</p>'),Bm=M('<span class="cp-statp svelte-1y9sotg"> <b class="svelte-1y9sotg"> </b></span>'),Cm=M('<span class="cp-statp cp-none svelte-1y9sotg">—</span>'),Tm=M('<div class="cp-statrow svelte-1y9sotg"><span class="cp-statl svelte-1y9sotg"> </span> <!></div>'),ym=M('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),Sm=M(`<div class="cp-panel"><h3 class="cp-h3">THE 32 TEAMS' ENGINE RATINGS</h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">OFF</th><th class="num">DEF</th><th class="num">PASS</th><th class="num">RUN</th><th class="num">RUSH D</th><th class="num">COV</th><th class="num">W</th><th class="num">L</th><th class="num">T</th></tr></thead><tbody></tbody></table> <p class="cp-sub">OFF/DEF are the engine's net points vs the league baseline (Wins units, one decimal); the rest are the engine's raw rating axes.</p></div>`),km=M(`<p class="cp-note cp-standin svelte-1y9sotg">STAND-IN: gravity and double-teams are formally measured in the live site's model, not yet by the pinned engine — filed §5 to the Architect. Everything below IS the engine's own output.</p> <div class="cp-panel"><h3 class="cp-h3">THE SEASON LINES (LEAGUE LEADERS)</h3> <!></div> <!>`,1),Dm=M('<section class="cp-stats"><h2 class="cp-h2">THE STATS</h2> <!></section>');function wm(n,e){kn(e,!0);const a=[["pyd","PASS YD"],["ptd","PASS TD"],["ryd","RUSH YD"],["rtd","RUSH TD"],["recYd","REC YD"],["rec","REC"],["sack","SACKS"],["intDef","INT"],["tkl","TACKLES"],["fgm","FG"]];var s=Dm(),t=B(W(s),2);{var r=l=>{var i=gm();A(l,i)},o=l=>{var i=km(),c=B(gn(i),2),u=B(W(c),2);cn(u,17,()=>a,([d,p])=>d,(d,p)=>{var v=ln(()=>qi(f(p),2));let g=()=>f(v)[0],C=()=>f(v)[1];const T=ln(()=>mr(e.stats,g(),3));var w=Tm(),k=W(w),S=D(k,!0),F=B(k,2);cn(F,17,()=>f(T),G=>G.id,(G,J)=>{var E=Bm(),R=W(E),I=B(R),P=D(I,!0);H(x=>{y(R,`${f(J).name??""} `),y(P,x)},[()=>Kn(f(J).stats[g()]??0)]),A(G,E)},G=>{var J=Cm();A(G,J)}),H(()=>y(S,C())),A(d,w)});var h=B(c,2);{var m=d=>{var p=Sm(),v=B(W(p),2),g=B(W(v));cn(g,23,()=>hn,C=>C.name,(C,T,w)=>{const k=ln(()=>e.teams[f(w)]?.ratings),S=ln(()=>e.table[f(T).name]);var F=ym(),G=W(F),J=D(G),E=B(G),R=D(E,!0),I=B(E),P=D(I,!0),x=B(I),Q=D(x,!0),$=B(x),en=D($,!0),tn=B($),O=D(tn,!0),q=B(tn),j=D(q,!0),Y=B(q),U=D(Y,!0),b=B(Y),_=D(b,!0),z=B(b),V=D(z,!0);H((nn,Z,on,mn,En,pn,Xn)=>{y(J,`${nn??""} ${f(T).name??""}`),y(R,Z),y(P,on),y(Q,mn),y(en,En),y(O,pn),y(j,Xn),y(U,f(S)?.w??"—"),y(_,f(S)?.l??"—"),y(V,f(S)?.t??"—")},[()=>wn(f(T).name),()=>f(k)?Cs("wins",f(k).off):"—",()=>f(k)?Cs("wins",f(k).def):"—",()=>f(k)?Kn(f(k).passOff):"—",()=>f(k)?Kn(f(k).runOff):"—",()=>f(k)?Kn(f(k).frontRun):"—",()=>f(k)?Kn(f(k).coverage):"—"]),A(C,F)}),A(d,p)};sn(h,d=>{e.teams&&d(m)})}A(l,i)};sn(t,l=>{!e.stats||!e.table?l(r):l(o,-1)})}A(n,s),Dn()}var Rm=M('<section class="cp-settings"><h2 class="cp-h2">SETTINGS</h2> <div class="cp-panel"><div class="cp-setrow"><label for="set-mode">Colour mode</label> <select id="set-mode"><option>Follow the system</option><option>Light (pale rose)</option><option>Dark (plum ink)</option></select></div> <div class="cp-setrow"><label for="set-motion">Reduce motion</label> <input id="set-motion" type="checkbox"/></div> <div class="cp-setrow"><label for="set-order">Feed reading: newest first</label> <input id="set-order" type="checkbox"/></div> <div class="cp-setrow"><label>Valuation mode</label> <span class="cp-sub"> </span></div></div> <div class="cp-chipline"><button class="cp-stepbtn">SAVES · SLOT A · B · C</button> <button class="cp-stepbtn">CLEAR SAVED CHOICES</button></div> <p class="cp-note">Settings persist across reload. Saves are one blob per slot, version-checked on every read — a corrupt save is refused verbatim, never repaired.</p></section>');function Em(n,e){kn(e,!0);var a=Rm(),s=B(W(a),2),t=W(s),r=B(W(t),2),o=W(r);o.value=o.__value="system";var l=B(o);l.value=l.__value="light";var i=B(l);i.value=i.__value="dark";var c;yf(r);var u=B(t,2),h=B(W(u),2),m=B(u,2),d=B(W(m),2),p=B(m,2),v=B(W(p),2),g=D(v),C=B(s,2),T=W(C),w=B(T,2);H((k,S)=>{c!==(c=e.settings.mode)&&(r.value=(r.__value=c)??"",Bl(r,c)),Wr(h,e.settings.reducedMotion),Wr(d,e.settings.newestFirst),y(g,`${k??""}${S??""}`)},[()=>oa[ae.get().mode],()=>ae.get().locked?" (locked mid-draft)":""]),X("change",r,k=>e.onmode(k.currentTarget.value)),X("change",h,k=>e.onmotion(k.currentTarget.checked)),X("change",d,k=>e.onorder(k.currentTarget.checked)),X("click",T,function(...k){e.onsaves?.apply(this,k)}),X("click",w,function(...k){e.onresetsave?.apply(this,k)}),A(n,a),Dn()}Gn(["change","click"]);const Lm=`
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
`;function bm(n,e){const a=n.lines.map(s=>`<p class="l">${s}</p>`).join(`
      `);return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>76 Pancakes · ${n.title}</title>
<style>
${Lm}
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
`}const Re=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Am(n){return{stage:"draft",title:"DRAFT NIGHT",teamName:n.teamName,lines:[`I drafted the <b>${Re(n.teamName)}</b> from slot one of the board.`,`<b>${n.picks}</b> picks in the league, <b>${n.mine}</b> of them mine.`,`Best of my class: <span class="ink">${Re(n.bestPick)}</span> at <b>${n.bestWins}</b> wins.`],stamp:`seed ${n.seed} · engine ${n.engine} · played by the pinned engine`}}function Jm(n){const e=n.meHome?n.hs:n.as,a=n.meHome?n.as:n.hs,s=e>a,t=n.meHome?n.away:n.home;return{stage:"week",title:`WEEK ${n.week} BRAG`,teamName:n.teamName,lines:[`${s?"I beat":e===a?"I tied":"I fell to"} the <b>${Re(wn(t))} ${Re(t)}</b> <b>${e}—${a}</b> in ${Re(n.label)}.`,s?"The board says you called it: the run continues.":"A stumble, not an ending — the season is long."],stamp:`gameSeed ${n.gs} · week ${n.week} · ${n.away} @ ${n.home} · engine ${n.engine} · played by the pinned engine`}}function Mm(n){return{stage:"season",title:"THE SEASON",teamName:n.teamName,lines:[n.iChampion?`The <b>${Re(n.teamName)}</b> are Super Bowl champions. <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b>, <b>${n.pf}</b> points scored.`:`The <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b> season is in the book — <b>${n.pf}</b> points scored.`,n.champion&&!n.iChampion?`The year belongs to the <b>${Re(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Fm(n){return{stage:"bracket",title:"THE RUN",teamName:n.teamName,lines:[n.iChampion?"Wild Card. Divisional. Conference. <b>Super Bowl champions.</b>":n.madeIt?`The run ended in the <b>${Re(n.lastRound??"Wild Card")}</b>.`:"The playoffs went on without me this year.",n.champion?`The bracket crowns the <b>${Re(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Wm(n){return{stage:"awards",title:"THE AWARDS",teamName:n.teamName,lines:[`The season's Most Valuable Player: <span class="ink">${Re(n.mvp)}</span>.`,n.mvpLine?`<span class="cp-sub">${Re(n.mvpLine)}</span>`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Ti(n){const e=n.teamName?It(n.teamName).ink:"#c39a4a";return bm(n,e)}function _m(n){const e=Ti(n),a=new Blob([e],{type:"text/html"}),s=document.createElement("a");s.href=URL.createObjectURL(a),s.download=`76pancakes-${n.stage}-brag.html`,document.body.appendChild(s),s.click(),s.remove()}var Gm=M('<button class="cp-navbtn"> </button>'),Pm=M('<div class="cp-sharewrap svelte-o6jlvs"><iframe class="cp-shareframe svelte-o6jlvs" title="the shareable preview"></iframe> <div class="cp-sharebtns svelte-o6jlvs"><button class="cp-stepbtn cp-cta"> </button></div></div>'),Nm=M('<p class="cp-note">Nothing to brag about yet on this stage — play it first.</p>'),Im=M('<section class="cp-share"><h2 class="cp-h2">THE SHAREABLES</h2> <p class="cp-note">One card per stage. Each export is one self-contained HTML file — inline styles, no network, provenance stamped — that opens offline, even from the desktop.</p> <div class="cp-chipline"></div> <!></section>');function Hm(n,e){kn(e,!0);const a=[{id:"draft",label:"DRAFT"},{id:"week",label:"WEEK"},{id:"season",label:"SEASON"},{id:"bracket",label:"BRACKET"},{id:"awards",label:"AWARDS"}];let s=vn("draft"),t=ln(()=>{const h=vr(),m=e.record,d=e.season.userTeamName||"";if(f(s)==="draft"){if(!m)return null;const p=m.picks.filter(v=>v.team===m.userTeam).length;return Am({teamName:d,seed:m.seed,picks:m.picks.length,mine:p,bestPick:"your best draft pick",bestWins:"—",engine:h})}if(f(s)==="week"){const p=e.season.view?.games.find(v=>v.home===e.season.userTeamName||v.away===e.season.userTeamName);return!p||p.hs===null?null:Jm({teamName:d,week:e.season.slot,label:e.season.label,home:p.home,away:p.away,hs:p.hs,as:p.as,meHome:p.home===e.season.userTeamName,gs:p.gameSeed,engine:h})}if(f(s)==="season"){if(!e.season.runState)return null;const p=pr(e.season.runState)[e.season.userTeamName],v=p?.w??0,g=p?.l??0,C=p?.t??0,T=p?.pf??0;return Mm({teamName:d,w:v,l:g,t:C,pf:T,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:h})}if(f(s)==="bracket"){if(!e.season.runState)return null;const p=e.season.runState.playoffs.filter(g=>g.home===e.season.userTeamName||g.away===e.season.userTeamName),v=p.length?p[p.length-1].round??null:null;return Fm({teamName:d,madeIt:p.length>0,lastRound:v,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:h})}return e.stats?Wm({teamName:d,mvp:e.stats.mvp,mvpLine:e.stats.mvpLine,engine:h}):null}),r=ln(()=>f(t)?Ti(f(t)):null);var o=Im(),l=B(W(o),4);cn(l,21,()=>a,h=>h.id,(h,m)=>{var d=Gm(),p=D(d,!0);H(()=>{_n(d,"aria-pressed",f(s)===f(m).id),y(p,f(m).label)}),X("click",d,()=>an(s,f(m).id,!0)),A(h,d)});var i=B(l,2);{var c=h=>{var m=Pm(),d=W(m),p=B(d,2),v=W(p),g=D(v);H(C=>{_n(d,"srcdoc",f(r)),y(g,`DOWNLOAD THE ${C??""} BRAG`)},[()=>f(s).toUpperCase()]),X("click",v,()=>f(t)&&_m(f(t))),A(h,m)},u=h=>{var m=Nm();A(h,m)};sn(i,h=>{f(r)?h(c):h(u,-1)})}A(n,o),Dn()}Gn(["click"]);var Km=M('<button class="cp-navbtn"> </button>'),xm=M('<nav class="cp-nav" aria-label="Screens"></nav>'),Om=M('<p class="cp-error" role="alert"> </p>'),Vm=M('<p class="cp-note">Loading…</p>'),Ym=M(`<section class="cp-empty"><h1>76 Pancakes</h1> <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p> <p class="cp-note">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p> <p><a class="cp-devlink" href="?dev=1">Open the dev build →</a></p></section>`),zm=M('<p class="cp-prov">Every number on this shell reads <b> </b> — the label travels with the numbers.</p> <!>',1),Qm=M('<p class="cp-prov">Every number on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!>',1),jm=M(`<main class="cp-root svelte-1n46o8q"><header class="cp-topbar"><span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span> <span class="cp-track" title="the builders' track name">67 Cakepanz · the shell</span> <span class="cp-topbtns"><!> <button class="cp-topbar-btn">Saves</button></span></header> <!> <!> <!></main>`);function Um(n,e){kn(e,!0);const a=()=>Me(O,"$settingsStore",m),s=()=>Me(T,"$draftState",m),t=()=>Me(j,"$seasonStats",m),r=()=>Me(q,"$season",m),o=()=>Me(p,"$boot",m),l=()=>Me(k,"$vmStore",m),i=()=>Me(G,"$openNow",m),c=()=>Me(F,"$oddsMeta",m),u=()=>Me(J,"$needsSel",m),h=()=>Me(S,"$advice",m),[m,d]=bf(),p=ca({phase:"loading"}),v=new URLSearchParams(location.search).has("dev"),g=v?c0(Pr,Wf,_f):[];let C=dd(g),T=pd(C),w="wins";const k=ca(null),S=ca([]),F=ca(null),G=ca([]),J=ca([]);let E=vn(0),R=777,I=vn(null),P=vn("team"),x=vn(""),Q=vn(null),$=vn("sha256:pending"),en=vn(""),tn=vn("");const O=md(),q=hd(),j=ca(null);let Y=null;const U="67-cakepanz@d3bd81d2";function b(L){Sd(L.mode),go(L.teamName,L.mode),typeof document<"u"&&document.body.classList.toggle("cp-reduced",L.reducedMotion||rd()),td(L)}function _(L){const K={...a(),mode:L};b(K),O.set(K)}function z(L){const K={...a(),reducedMotion:L};b(K),O.set(K)}function V(L){const K={...a(),newestFirst:L};b(K),O.set(K)}function nn(L,K){const rn={...a(),teamName:L,draftSlot:K};b(rn),O.set(rn)}function Z(L,K){an(P,L,!0),ud(L,K)}function on(){const L=fd();L&&an(P,L.screen,!0)}function mn(){if(!v){p.set({phase:"empty"});return}p.set({phase:"ready",players:g}),window.__cp={store:C,refresh:pn,valuation:ae,seasonFacade:bn,go:Z},Yu(Pr).then(L=>an($,"sha256:"+L)),Z("team")}function En(L,K){R=1e3+Math.floor(Math.random()*9e3),an(E,L,!0),an(I,K,!0),nn(hn[L].name,K),Z("board"),C.dispatch({type:"START",seed:R,userTeam:f(E)}),ae.lock(),Y=null,j.set(null),pn()}function pn(){const L=C.getState();if(L.error&&an(x,L.error,!0),!L.draft||L.status==="idle"){k.set(null),F.set(null),G.set([]);return}G.set(ws(L.draft.rosters[f(E)]));try{const K=m0(L.draft,f(E),xe(R*7+13),30);k.set(R0(L.draft,f(E),K,{sort:w})),F.set({picksBetween:K.picksBetween,sims:K.sims})}catch{}try{const K=Object.values(L.draft.rosters[f(E)]).filter(Boolean),rn=Nl(K,"4-3");S.set(rn.placements.map(Cn=>({label:Cn.slot?.label??Cn.slot?.slot??"?",name:Cn.player?.name??"(empty)",ovr:Cn.player?String(Cn.effOvr??Cn.player.ovr):"-"})))}catch{S.set([])}}function Xn(L,K){C.dispatch({type:"PICK",playerId:L,slot:K}),pn()}function ce(){C.dispatch({type:"UNDO"}),pn()}function Ln(L){w=L,pn()}function Mn(L){J.update(K=>K.includes(L)?K.filter(rn=>rn!==L):[...K,L])}function be(){J.set([])}const Fn=()=>C.getState().record,Un=()=>({engineVersion:U,dataVersion:f($),saveId:f(en)||an(en,crypto?.randomUUID?.()??"save-"+R+"-"+Date.now(),!0),saveRevision:1+(C.getState().record?.picks.length??0),createdAt:f(tn)||an(tn,new Date().toISOString(),!0)});function re(L,K){const rn=L;if(!rn){an(x,"load: empty record");return}R=rn.seed,an(E,rn.userTeam,!0),an(en,K?.saveId||(crypto?.randomUUID?.()??"save-"+rn.seed),!0),an(tn,K?.createdAt||new Date().toISOString(),!0),C.dispatch({type:"LOAD",record:L}),ae.lock(),Z("board"),pn()}function fe(){const L=C.getState().record;if(!L||C.getState().status!=="done"){an(x,"the season needs a finished draft");return}const K=Ht(L)[f(E)].map(rn=>({id:rn.id,name:rn.name,pos:rn.pos,role:rn.role,team:rn.team,ovr:rn.ovr,spd:rn.spd,str:rn.str,freeAgent:!!rn.freeAgent}));bn.begin(Dd(L),R,2027,hn[f(E)].name,K),Y=new To,j.set(Y.ss),Z("hub")}function ue(){Y||(Y=new To);const L=bn.step();if(!L){an(x,"no season is running");return}const K=C.getState().record;K&&Y.addWeek(L.games.map(Cn=>({home:Cn.home,away:Cn.away,round:Cn.round,result:Cn.result})),Ht(K)),j.set(Y.ss);const rn=L.games.find(Cn=>Cn.home===bn.userTeamName||Cn.away===bn.userTeamName);rn?(an(Q,Ci(rn.result,rn.home,rn.away,{week:L.week,year:2027,gs:rn.gs,userTeamName:bn.userTeamName}),!0),Z("feed")):Z("week",L.week),bn.finished&&ge()}async function Vn(){const L=await Gd("C");if(!L.ok){an(x,"restore refused: "+L.message);return}const K=ad(L.env.payload);if(!K.ok){an(x,"restore refused: "+K.message);return}bn.resume(K.value.state,K.value.teams,K.value.userTeamName,K.value.roster),Y=null,j.set(null),Z("hub")}function Ae(){const L=bn.snapshot();if(!L.state||!L.teams)return;const K=Ed(L.state,L.teams,L.userTeamName,bn.slot);K&&(an(Q,K,!0),Z("feed"))}async function ve(){if(!bn.snapshot().state){an(x,"no season to save");return}const K=bn.weekPayload(),rn=await Jd("C",K,Un(),new Date);an(x,rn?"save refused: "+rn:"",!0)}function ge(){const L=bn.snapshot();if(!L.state)return;const K=sd(L.state,L.userTeamName,bn.userRoster);Md("C",K,Un(),new Date)}vs(()=>{}),Jf(()=>{ae.subscribe(()=>pn()),window.addEventListener("hashchange",on);const L=vi();return b(L),O.set(L),L.teamName&&go(L.teamName,L.mode),mn(),()=>window.removeEventListener("hashchange",on)});const Je=[{id:"team",label:"TEAM",show:!0},{id:"board",label:"DRAFT",show:!0},{id:"cards",label:"CARDS",show:!0},{id:"hub",label:"SEASON",show:!0},{id:"week",label:"WEEK",show:!0},{id:"standings",label:"STANDINGS",show:!0},{id:"bracket",label:"PLAYOFFS",show:!0},{id:"awards",label:"AWARDS",show:!0},{id:"review",label:"REVIEW",show:!0},{id:"stats",label:"STATS",show:!0},{id:"book",label:"BOOK",show:!0},{id:"share",label:"SHARE",show:!0},{id:"guide",label:"GUIDE",show:!0},{id:"settings",label:"SETTINGS",show:!0}],Ue=ln(()=>s()?.record??null),Wn=ln(()=>{const L=bn.runState;return L?pr(L):null}),$n=ln(()=>{const L=t();if(!L)return null;const K=Object.values(L.players);if(!K.length)return null;const rn=K.slice().sort((Cn,Be)=>(Be.stats.pyd??0)+(Be.stats.rtd??0)-((Cn.stats.pyd??0)+(Cn.stats.rtd??0)))[0];return{mvp:rn.name,mvpLine:rn.label}}),ne=ln(()=>r().ready);var la=jm(),Ta=W(la),yi=B(W(Ta),4),Br=W(yi);tp(Br,{});var Cr=B(Br,2),Tr=B(Ta,2);{var Si=L=>{var K=xm();cn(K,21,()=>Je.filter(rn=>rn.show),rn=>rn.id,(rn,Cn)=>{var Be=Km(),ya=D(Be,!0);H(()=>{_n(Be,"aria-current",f(P)===f(Cn).id),y(ya,f(Cn).label)}),X("click",Be,()=>Z(f(Cn).id)),A(rn,Be)}),A(L,K)};sn(Tr,L=>{o().phase==="ready"&&L(Si)})}var yr=B(Tr,2);{var ki=L=>{var K=Om(),rn=D(K,!0);H(()=>y(rn,f(x))),A(L,K)};sn(yr,L=>{f(x)&&L(ki)})}var Di=B(yr,2);{var wi=L=>{var K=Vm();A(L,K)},Ri=L=>{var K=Ym();A(L,K)},Ei=L=>{var K=zm(),rn=gn(K),Cn=B(W(rn)),Be=D(Cn,!0),ya=B(rn,2);Lp(ya,{onstart:En}),H(st=>y(Be,st),[()=>oa[ae.get().mode]]),A(L,K)},Li=L=>{var K=Qm(),rn=gn(K),Cn=B(W(rn)),Be=D(Cn,!0),ya=B(rn,2);{let tt=ln(()=>(s()?.record?.picks?.length??0)>0),Yi=ln(()=>s()?.status==="done");ko(ya,{get vm(){return l()},onpick:Xn,onundo:ce,onsort:Ln,get canUndo(){return f(tt)},get openSlots(){return i()},get oddsMeta(){return c()},get needsSelected(){return u()},onneedtoggle:Mn,onneedclear:be,onplay:()=>Z("complete"),get draftDone(){return f(Yi)}})}var st=B(ya,2);lp(st,{get slots(){return h()}}),H(tt=>y(Be,tt),[()=>oa[ae.get().mode]]),A(L,K)},bi=L=>{Np(L,{get record(){return f(Ue)},get requestedSlot(){return f(I)},onseason:fe,oncards:()=>Z("cards"),onbook:()=>Z("book")})},Ai=L=>{qp(L,{get season(){return r()},onplayweek:ue,onweek:K=>{bn.go(K),Z("week",K)},onstandings:()=>Z("standings"),onbracket:()=>Z("bracket"),onrestore:Vn,canRestore:!0,onbook:()=>Z("book")})},Ji=L=>{rh(L,{get season(){return r()},onplay:ue,onfeed:Ae,onsave:ve})},Mi=L=>{dh(L,{get season(){return r()},onbracket:()=>Z("bracket")})},Fi=L=>{Ah(L,{get season(){return r()},onreview:()=>Z("review")})},Wi=L=>{xh(L,{get season(){return r()},get draftRecord(){return f(Ue)},onreview:()=>Z("review"),onfeed:Ae})},_i=L=>{Xh(L,{get stats(){return t()},get table(){return f(Wn)}})},Gi=L=>{om(L,{get season(){return r()},onbracket:()=>Z("bracket"),onbook:()=>Z("book"),onawards:()=>Z("awards")})},Pi=L=>{im(L,{})},Ni=L=>{vm(L,{get vm(){return l()}})},Ii=L=>{{let K=ln(()=>bn.snapshot().teams);wm(L,{get stats(){return t()},get table(){return f(Wn)},get teams(){return f(K)}})}},Hi=L=>{Em(L,{get settings(){return a()},onmode:_,onmotion:z,onorder:V,onsaves:()=>Z("saves"),onresetsave:()=>nn(a().teamName,a().draftSlot)})},Ki=L=>{{let K=ln(Fn),rn=ln(Un);gp(L,{get record(){return f(K)},get meta(){return f(rn)},get userTeamIndex(){return f(E)},onclose:()=>Z("board"),onloaddraft:re})}},xi=L=>{Hm(L,{get record(){return f(Ue)},get stats(){return f($n)},get season(){return r()}})},Oi=L=>{Wp(L,{get feed(){return f(Q)},onclose:()=>{Z(f(ne)?"week":"board"),an(Q,null)}})},Vi=L=>{ko(L,{get vm(){return l()},onpick:Xn,onundo:ce,onsort:Ln,canUndo:!1})};sn(Di,L=>{o().phase==="loading"?L(wi):o().phase==="empty"?L(Ri,1):f(P)==="team"?L(Ei,2):f(P)==="board"&&l()?L(Li,3):f(P)==="complete"&&f(Ue)?L(bi,4):f(P)==="hub"?L(Ai,5):f(P)==="week"?L(Ji,6):f(P)==="standings"?L(Mi,7):f(P)==="bracket"?L(Fi,8):f(P)==="book"?L(Wi,9):f(P)==="awards"?L(_i,10):f(P)==="review"?L(Gi,11):f(P)==="guide"?L(Pi,12):f(P)==="cards"?L(Ni,13):f(P)==="stats"?L(Ii,14):f(P)==="settings"?L(Hi,15):f(P)==="saves"?L(Ki,16):f(P)==="share"?L(xi,17):f(P)==="feed"&&f(Q)?L(Oi,18):l()&&L(Vi,19)})}H(()=>{_n(la,"data-screen",f(P)),_n(Cr,"aria-pressed",f(P)==="saves")}),X("click",Cr,()=>Z("saves")),A(n,la),Dn(),d()}Gn(["click"]);ff(Um,{target:document.getElementById("app")});
