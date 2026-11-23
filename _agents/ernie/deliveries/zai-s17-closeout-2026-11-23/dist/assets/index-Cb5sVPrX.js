(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const ol=!1;var dt=Array.isArray,Fc=Array.prototype.indexOf,Ts=Array.prototype.includes,pt=Array.from,cr=Object.defineProperty,Ia=Object.getOwnPropertyDescriptor,ll=Object.getOwnPropertyDescriptors,Wc=Object.prototype,Pc=Array.prototype,fr=Object.getPrototypeOf,zr=Object.isExtensible;const Ca=()=>{};function Gc(n){return n()}function Kt(n){for(var e=0;e<n.length;e++)n[e]()}function il(){var n,e,a=new Promise((s,t)=>{n=s,e=t});return{promise:a,resolve:n,reject:e}}function Nc(n,e){if(Array.isArray(n))return n;if(!(Symbol.iterator in n))return Array.from(n);const a=[];for(const s of n)if(a.push(s),a.length===e)break;return a}const ne=2,Oa=4,Es=8,cl=1<<24,be=16,Fe=32,fa=64,xt=128,ur=256,Me=512,Yn=1024,Ln=2048,he=4096,se=8192,Xn=16384,Xa=32768,Ss=1<<25,Va=65536,Zs=1<<17,Ic=1<<18,$a=1<<19,fl=1<<20,Ie=1<<25,Xs=1<<21,Ha=1<<22,ia=1<<23,Ze=Symbol("$state"),ul=Symbol("component"),Hc=Symbol("legacy props"),Kc=Symbol(""),dl=Symbol("attributes"),Ot=Symbol("class"),Vt=Symbol("style"),Yt=Symbol("text"),Ls=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"},xc=1,Oc=2,pl=4,Vc=8,Yc=16,zc=1,Qc=2,jc=4,Uc=8,qc=16,Zc=1,Xc=2,hl={},On=Symbol("uninitialized"),$c="http://www.w3.org/1999/xhtml";function nf(){console.warn("https://svelte.dev/e/derived_inert")}function ef(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function af(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function vl(n){return n===this.v}function ml(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function gl(n){return!ml(n,this.v)}function sf(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function tf(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function rf(n,e,a){throw new Error("https://svelte.dev/e/each_key_duplicate")}function of(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function lf(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function cf(n){throw new Error("https://svelte.dev/e/effect_orphan")}function ff(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function uf(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function df(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function pf(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function hf(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function vf(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let ns=!1,mf=!1;function gf(){ns=!0}let _n=null;function Ya(n){_n=n}function Rn(n,e=!1,a){_n={p:_n,i:!1,c:null,e:null,s:n,x:null,r:mn,l:ns&&!e?{s:null,u:null,$:[]}:null}}function bn(n){var e=_n,a=e.e;if(a!==null){e.e=null;for(var s of a)Fl(s)}return e.i=!0,_n=e.p,dr(n)}function dr(n={}){return cr(n,ul,{value:!0}),n}function As(){return!ns||_n!==null&&_n.l===null}let Ja=[];function Bf(){var n=Ja;Ja=[],Kt(n)}function oa(n){if(Ja.length===0){var e=Ja;queueMicrotask(()=>{e===Ja&&Bf()})}Ja.push(n)}const Cf=-7169;function Pn(n,e){n.f=n.f&Cf|e}function pr(n){(n.f&Me)!==0||n.deps===null?Pn(n,Yn):Pn(n,he)}function Bl(n,e){(n.f&Ln)!==0?e.set(n,Ln):(n.f&he)!==0&&e.get(n)!==Ln&&e.set(n,he),Pn(n,Yn)}function ht(n){var e=vn,a=mn;Se(null),Ve(null);try{return n()}finally{Se(e),Ve(a)}}function yf(n,e,a,s){const t=As()?za:hr;var r=n.filter(p=>!p.settled),o=e.map(t);if(a.length===0&&r.length===0){s(o);return}var l=mn,i=Tf(),c=r.length===1?r[0].promise:r.length>1?Promise.all(r.map(p=>p.promise)):null;function u(p){if((l.f&Xn)===0){i();try{s([...o,...p])}catch(v){Ne(v,l)}$s()}}var d=Cl();if(a.length===0){c.then(()=>u([])).finally(d);return}function h(){Promise.all(a.map(p=>Sf(p))).then(u).catch(p=>Ne(p,l)).finally(d)}c?c.then(()=>{if((l.f&Xn)!==0){d();return}i(),h(),$s()}):h()}function Tf(){var n=mn,e=vn,a=_n,s=Bn;return function(r=!0){Ve(n),Se(e),Ya(a),r&&(n.f&Xn)===0&&(s?.activate(),s?.apply())}}function $s(n=!0){Ve(null),Se(null),Ya(null),n&&Bn?.deactivate()}function Cl(){var n=mn,e=n.b,a=Bn,s=!!e?.is_rendered();return e?.update_pending_count(1,a),a.increment(s,n),()=>{e?.update_pending_count(-1,a),a.decrement(s,n)}}function za(n){var e=ne|Ln;return mn!==null&&(mn.f|=$a),{ctx:_n,deps:null,effects:null,equals:vl,f:e,fn:n,reactions:null,rv:0,v:On,wv:0,parent:mn,ac:null}}const cs=Symbol("obsolete");function Sf(n,e,a){let s=mn;s===null&&tf();var t=void 0,r=Sa(On),o=!vn,l=new Set;return Pf(()=>{var i=mn,c=il();t=c.promise;try{Promise.resolve(n()).then(c.resolve,p=>{p!==Ls&&c.reject(p)}).finally($s)}catch(p){c.reject(p),$s()}var u=Bn;if(o){if((i.f&Xa)!==0)var d=Cl();if(s.b?.is_rendered())u.async_deriveds.get(i)?.reject(cs);else for(const p of l.values())p.reject(cs);l.add(c),u.async_deriveds.set(i,c)}const h=(p,v=void 0)=>{d?.(),l.delete(c),v!==cs&&(u.activate(),v?(r.f|=ia,Qa(r,v)):((r.f&ia)!==0&&(r.f^=ia),Qa(r,p)),u.deactivate())};c.promise.then(h,p=>h(null,p||"unknown"))}),Cr(()=>{for(const i of l)i.reject(cs)}),new Promise(i=>{function c(u){function d(){u===t?i(r):c(t)}u.then(d,d)}c(t)})}function ln(n){const e=za(n);return Hl(e),e}function hr(n){const e=za(n);return e.equals=gl,e}function kf(n){var e=n.effects;if(e!==null){n.effects=null;for(var a=0;a<e.length;a+=1)ce(e[a])}}function vr(n){var e,a=mn,s=n.parent;if(!$e&&s!==null&&n.v!==On&&(s.f&(Xn|se))!==0)return nf(),n.v;Ve(s);try{kf(n),e=Vl(n)}finally{Ve(a)}return e}function yl(n){var e=vr(n);if(!n.equals(e)&&(n.wv=xl(),(!Bn?.is_fork||n.deps===null)&&(Bn!==null?(Bn.capture(n,e,!0),zt?.capture(n,e,!0)):n.v=e,n.deps===null))){Pn(n,Yn);return}$e||(Ee!==null?(Br()||Bn?.is_fork)&&Ee.set(n,e):pr(n))}function wf(n){if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&(e.teardown?.(),e.ac!==null&&ht(()=>{e.ac.abort(Ls),e.ac=null}),e.fn!==null&&(e.teardown=Ca),Ds(e,0),Tr(e))}function Tl(n){if(n.effects!==null)for(const e of n.effects)e.teardown&&e.fn!==null&&ja(e)}let wt=null,Da=null,Bn=null,zt=null,Ee=null,Qt=null,Dt=!1,vs=null,Qs=null;var Qr=0;let Df=1;class ua{id=Df++;started=!1;linked=!0;prev=null;next=null;async_deriveds=new Map;current=new Map;previous=new Map;#e=new Set;#i=new Set;#n=0;#o=new Map;#a=null;#s=[];#r=[];#t=new Map;#l=new Map;#p=new Set;is_fork=!1;#c=!1;constructor(){Da===null?wt=Da=this:(Da.next=this,this.prev=Da),Da=this}#h(){if(this.is_fork)return!0;for(const e of this.#o.keys())if(!this.#g(e))return!0;return!1}#g(e){for(var a=e;a!==null;a=a.parent)if(this.#l.has(a))return!0;return!1}skip_effect(e){this.#l.has(e)||this.#l.set(e,{d:[],m:[]}),this.#p.delete(e)}unskip_effect(e,a=s=>this.schedule(s)){var s=this.#l.get(e);if(s){this.#l.delete(e);for(var t of s.d)Pn(t,Ln),a(t);for(t of s.m)Pn(t,he),a(t)}this.#p.add(e)}#f(){var e=[];for(const r of this.#s)if(!((r.f&Xn)!==0||(r.f&(Ln|he))===0)){for(var a=r,s=!1;a.parent!==null;){a=a.parent;var t=a.f;if((t&(fa|Fe))!==0){if((t&Yn)===0){s=!0;break}a.f^=Yn}}s||e.push(a)}return this.#s=[],e}#v(){this.started=!0;for(const[l,i]of this.#t)Pn(l,i),this.schedule(l);this.apply();for(var e=vs=[],a=[],s=Qs=[];this.#s.length>0;){Qr++>1e3&&(this.#d(),Rf());for(const l of this.#f())try{this.#C(l,e,a)}catch(i){throw wl(l),this.#h()||this.discard(),i}}if(Bn=null,s.length>0){var t=ua.ensure();for(const l of s)t.schedule(l)}if(vs=null,Qs=null,this.#h()){this.#m(a),this.#m(e);for(const[l,i]of this.#l)kl(l,i);s.length>0&&Bn.#v();return}const r=this.#S();if(r){this.#m(a),this.#m(e),r.#u(this);return}this.#t.clear();for(const l of this.#e)l(this);this.#e.clear(),zt=this,jr(a),jr(e),zt=null,this.#a?.resolve();var o=Bn;this.#n===0&&(this.#s.length===0||o!==null)&&this.#d(),o!==null&&(Ke.clear(),o.#v())}#C(e,a,s){e.f^=Yn;for(var t=e.first;t!==null;){var r=t.f,o=(r&(Fe|fa))!==0,l=o&&(r&Yn)!==0,i=l||(r&se)!==0||this.#l.has(t);if(!i&&t.fn!==null){o?t.f^=Yn:(r&Oa)!==0?a.push(t):Js(t)&&((r&be)!==0&&this.add_dirty_reaction(t,he),ja(t));var c=t.first;if(c!==null){t=c;continue}}for(;t!==null;){var u=t.next;if(u!==null){t=u;break}t=t.parent}}}#S(){for(var e=this.prev;e!==null;e=e.prev)if(!e.is_fork&&this.#B(e))return e;return null}#B(e){for(const[a,[,s]]of this.current)if(!s&&e.current.has(a))return!0;return!1}#u(e){for(const[s,t]of e.current)!this.previous.has(s)&&e.previous.has(s)&&this.previous.set(s,e.previous.get(s)),this.current.set(s,t);for(const[s,t]of e.async_deriveds){const r=this.async_deriveds.get(s);r&&t.promise.then(r.resolve).catch(r.reject)}e.async_deriveds.clear(),this.transfer_reactions(e.#t);const a=s=>{var t=s.reactions;if(t!==null&&!((s.f&ne)!==0&&(s.f&(Ln|he))===0))for(const l of t){var r=l.f;if((r&ne)!==0)a(l);else{var o=l;r&(Ha|be)&&!this.async_deriveds.has(o)&&(this.#t.delete(o),Pn(o,Ln),this.schedule(o))}}};for(const s of this.current.keys())a(s);this.oncommit(()=>e.discard()),e.#d(),Bn=this,this.#v()}#m(e){for(var a=0;a<e.length;a+=1)Bl(e[a],this.#t)}capture(e,a,s=!1){e.v!==On&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&ia)===0&&(this.current.set(e,[a,s]),Ee?.set(e,a)),this.is_fork||(e.v=a)}activate(){Bn=this}deactivate(){Bn=null,Ee=null}flush(){try{Dt=!0,Bn=this,this.#v()}finally{Qr=0,Qt=null,vs=null,Qs=null,Dt=!1,Bn=null,Ee=null,Ke.clear()}}discard(){for(const e of this.#i)e(this);this.#i.clear();for(const e of this.async_deriveds.values())e.reject(cs);this.#d(),this.#a?.resolve()}register_created_effect(e){this.#r.push(e)}#y(){for(let d=wt;d!==null;d=d.next){var e=d.id<this.id,a=[];for(const[h,[p,v]]of this.current){if(d.current.has(h)){var s=d.current.get(h)[0];if(e&&p!==s)d.current.set(h,[p,v]);else continue}a.push(h)}if(e)for(const[h,p]of this.async_deriveds){const v=d.async_deriveds.get(h);v&&p.promise.then(v.resolve).catch(v.reject)}var t=[...d.current.keys()].filter(h=>!d.current.get(h)[1]);if(!(!d.started||t.length===0)){var r=t.filter(h=>!this.current.has(h));if(r.length===0)e&&d.discard();else if(a.length>0){if(e)for(const h of this.#p)d.unskip_effect(h,p=>{(p.f&(be|Ha))!==0?d.schedule(p):d.#m([p])});d.activate();var o=new Set,l=new Map;for(var i of a)Sl(i,r,o,l);l=new Map;var c=[...d.current].filter(([h,p])=>{const v=this.current.get(h);return v?v[0]!==p[0]||v[1]!==p[1]:!0}).map(([h])=>h);if(c.length>0)for(const h of this.#r)(h.f&(Xn|se|Zs))===0&&mr(h,c,l)&&((h.f&(Ha|be))!==0?(Pn(h,Ln),d.schedule(h)):d.add_dirty_reaction(h,Ln));if(d.#s.length>0&&!d.#c){d.apply();for(var u of d.#f())d.#C(u,[],[])}d.deactivate()}}}}increment(e,a){if(this.#n+=1,e){let s=this.#o.get(a)??0;this.#o.set(a,s+1)}}decrement(e,a){if(this.#n-=1,e){let s=this.#o.get(a)??0;s===1?this.#o.delete(a):this.#o.set(a,s-1)}this.#c||(this.#c=!0,oa(()=>{this.#c=!1,this.linked&&this.flush()}))}transfer_reactions(e){for(const[a,s]of e)this.add_dirty_reaction(a,s);e.clear()}add_dirty_reaction(e,a){(a===Ln||this.#t.get(e)!==Ln)&&this.#t.set(e,a)}oncommit(e){this.#e.add(e)}ondiscard(e){this.#i.add(e)}settled(){return(this.#a??=il()).promise}static ensure(){if(Bn===null){const e=Bn=new ua;Dt||oa(()=>{e.started||e.flush()})}return Bn}apply(){{Ee=null;return}}schedule(e){if(Qt=e,e.b?.is_pending&&(e.f&(Oa|Es|cl))!==0&&(e.f&Xa)===0){e.b.defer_effect(e);return}this.#s.push(e)}#d(){if(this.linked){var e=this.prev,a=this.next;e===null?wt=a:e.next=a,a===null?Da=e:a.prev=e,this.linked=!1}}}function Rf(){try{ff()}catch(n){Ne(n,Qt)}}let qe=null;function jr(n){var e=n.length;if(e!==0){for(var a=0;a<e;){var s=n[a++];if((s.f&(Xn|se))===0&&Js(s)&&(qe=new Set,ja(s),s.deps===null&&s.first===null&&s.nodes===null&&s.teardown===null&&s.ac===null&&Gl(s),qe?.size>0)){Ke.clear();for(const t of qe){if((t.f&(Xn|se))!==0)continue;const r=[t];let o=t.parent;for(;o!==null;)qe.has(o)&&(qe.delete(o),r.push(o)),o=o.parent;for(let l=r.length-1;l>=0;l--){const i=r[l];(i.f&(Xn|se))===0&&ja(i)}}qe.clear()}}qe=null}}function Sl(n,e,a,s){if(!a.has(n)&&(a.add(n),n.reactions!==null))for(const t of n.reactions){const r=t.f;(r&ne)!==0?Sl(t,e,a,s):(r&(Ha|be))!==0&&(r&Ln)===0&&mr(t,e,s)&&(Pn(t,Ln),gr(t))}}function mr(n,e,a){const s=a.get(n);if(s!==void 0)return s;if(n.deps!==null)for(const t of n.deps){if(Ts.call(e,t))return!0;if((t.f&ne)!==0&&mr(t,e,a))return a.set(t,!0),!0}return a.set(n,!1),!1}function gr(n){Bn.schedule(n)}function kl(n,e){if(!((n.f&Fe)!==0&&(n.f&Yn)!==0)){(n.f&Ln)!==0?e.d.push(n):(n.f&he)!==0&&e.m.push(n),Pn(n,Yn);for(var a=n.first;a!==null;)kl(a,e),a=a.next}}function wl(n){Pn(n,Yn);for(var e=n.first;e!==null;)wl(e),e=e.next}let nt=new Set;const Ke=new Map;let Dl=!1;function Sa(n,e){var a={f:0,v:n,reactions:null,equals:vl,rv:0,wv:0};return a}function pn(n,e){const a=Sa(n);return Hl(a),a}function Rl(n,e=!1,a=!0){const s=Sa(n);return e||(s.equals=gl),ns&&a&&_n!==null&&_n.l!==null&&(_n.l.s??=[]).push(s),s}function z(n,e,a=!1){vn!==null&&(!Le||(vn.f&Zs)!==0)&&As()&&(vn.f&(ne|be|Ha|Zs))!==0&&(xe===null||!xe.has(n))&&hf();let s=a?la(e):e;return Qa(n,s,Qs)}var ma=null,jt=0;function Qa(n,e,a=null){if(!n.equals(e)){$e?Ke.set(n,e):Ke.has(n)||Ke.set(n,n.v);var s=ua.ensure();if(s.capture(n,e),(n.f&ne)!==0){const t=n;(n.f&Ln)!==0&&vr(t),Ee===null&&pr(t)}n.wv=xl(),ma=null,jt=0,bl(n,Ln,a),ma=null,As()&&mn!==null&&(mn.f&Yn)!==0&&(mn.f&(Fe|fa))===0&&(ye===null?If([n]):ye.push(n)),!s.is_fork&&nt.size>0&&!Dl&&bf()}return e}function bf(){Dl=!1;for(const n of nt){(n.f&Yn)!==0&&Pn(n,he);let e;try{e=Js(n)}catch{e=!0}e&&ja(n)}nt.clear()}function ms(n){z(n,n.v+1)}function bl(n,e,a){var s=n.reactions;if(s!==null){var t=As(),r=s.length;if(jt+=r,jt>1e5&&ma===null&&(ma=new Set),ma!==null){if(ma.has(n))return;ma.add(n)}for(var o=0;o<r;o++){var l=s[o],i=l.f;if(!(!t&&l===mn)){var c=(i&Ln)===0;if(c&&Pn(l,e),(i&Zs)!==0)nt.add(l);else if((i&ne)!==0){var u=l;Ee?.delete(u),bl(u,he,a)}else if(c){var d=l;(i&be)!==0&&qe!==null&&qe.add(d),a!==null?a.push(d):gr(d)}}}}}function la(n){if(typeof n!="object"||n===null||Ze in n||ul in n)return n;const e=fr(n);if(e!==Wc&&e!==Pc)return n;var a=new Map,s=dt(n),t=pn(0),r=Ta,o=l=>{if(Ta===r)return l();var i=vn,c=Ta;Se(null),Xr(r);var u=l();return Se(i),Xr(c),u};return s&&a.set("length",pn(n.length)),new Proxy(n,{defineProperty(l,i,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&df();var u=a.get(i);return u===void 0?o(()=>{var d=pn(c.value);return a.set(i,d),d}):z(u,c.value,!0),!0},deleteProperty(l,i){var c=a.get(i);if(c===void 0){if(i in l){const u=o(()=>pn(On));a.set(i,u),ms(t)}}else z(c,On),ms(t);return!0},get(l,i,c){if(i===Ze)return n;var u=a.get(i),d=i in l;if(u===void 0&&(!d||Ia(l,i)?.writable)&&(u=o(()=>{var p=la(d?l[i]:On),v=pn(p);return v}),a.set(i,u)),u!==void 0){var h=f(u);return h===On?void 0:h}return Reflect.get(l,i,c)},getOwnPropertyDescriptor(l,i){this.has?.(l,i);var c=Reflect.getOwnPropertyDescriptor(l,i),u=a.get(i);if(u!==void 0){var d=f(u);if(d===On)return;if(c&&"value"in c)c.value=d;else return{enumerable:!0,configurable:!0,value:d,writable:!0}}return c},has(l,i){if(i===Ze)return!0;var c=a.get(i),u=c!==void 0&&c.v!==On||Reflect.has(l,i);if(c!==void 0||(mn!==null||vn!==null)&&(!u||Ia(l,i)?.writable)){c===void 0&&(c=o(()=>{var h=u?la(l[i]):On,p=pn(h);return p}),a.set(i,c));var d=f(c);if(d===On)return!1}return u},set(l,i,c,u){var d=a.get(i),h=i in l;if(s&&i==="length")for(var p=c;p<d.v;p+=1){var v=a.get(p+"");v!==void 0?z(v,On):p in l&&(v=o(()=>pn(On)),a.set(p+"",v))}if(d===void 0)(!h||Ia(l,i)?.writable)&&(d=o(()=>pn(void 0)),z(d,la(c)),a.set(i,d));else{h=d.v!==On;var g=o(()=>la(c));z(d,g)}var m=Reflect.getOwnPropertyDescriptor(l,i);if(m?.set&&m.set.call(u,c),!h){if(s&&typeof i=="string"){var y=a.get("length"),D=Number(i);Number.isInteger(D)&&D>=y.v&&z(y,D+1)}ms(t)}return!0},ownKeys(l){f(t);var i=Reflect.ownKeys(l).filter(d=>{var h=a.get(d);return h===void 0||h.v!==On});for(var[c,u]of a)u.v!==On&&!(c in l)&&i.push(c);return i},setPrototypeOf(){pf()}})}function Ur(n){try{if(n!==null&&typeof n=="object"&&Ze in n)return n[Ze]}catch{}return n}function El(n,e){return Object.is(Ur(n),Ur(e))}var qr,Ll,Al,Ml;function Ef(){if(qr===void 0){qr=window,Ll=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,a=Text.prototype;Al=Ia(e,"firstChild").get,Ml=Ia(e,"nextSibling").get,zr(n)&&(n[Ot]=void 0,n[dl]=null,n[Vt]=void 0,n.__e=void 0),zr(a)&&(a[Yt]=void 0)}}function Xe(n=""){return document.createTextNode(n)}function ks(n){return Al.call(n)}function Ms(n){return Ml.call(n)}function W(n,e){return ks(n)}function Sn(n,e=!1){{var a=ks(n);return a instanceof Comment&&a.data===""?Ms(a):a}}function S(n,e=!1){return ks(n)}function B(n,e=1,a=!1){let s=n;for(;e--;)s=Ms(s);return s}function Lf(n){n.textContent=""}function Jl(){return!1}function Af(n,e,a){return a?document.createElement(n,{is:a}):document.createElement(n)}function Mf(n){var e=mn;if(e===null)return vn.f|=ia,n;if((e.f&Xa)===0&&(e.f&Oa)===0)throw n;Ne(n,e)}function Ne(n,e){if(n===hl)throw n;if(!(e!==null&&(e.f&Xn)!==0)){for(;e!==null;){if((e.f&xt)!==0&&(e.f&(Xn|Ss))===0){if((e.f&Xa)===0)throw n;try{e.b.error(n);return}catch(a){n=a}}e=e.parent}throw n}}function _l(n){mn===null&&(vn===null&&cf(),lf()),$e&&of()}function Jf(n,e){var a=e.last;a===null?e.last=e.first=n:(a.next=n,n.prev=a,e.last=n)}function ze(n,e){var a=mn;a!==null&&(a.f&se)!==0&&(n|=se);var s={ctx:_n,deps:null,nodes:null,f:n|Ln|Me,first:null,fn:e,last:null,next:null,parent:a,b:a&&a.b,prev:null,teardown:null,wv:0,ac:null};Bn?.register_created_effect(s);var t=s;if((n&Oa)!==0)vs!==null?vs.push(s):ua.ensure().schedule(s);else if(e!==null){try{ja(s)}catch(o){throw ce(s),o}t.deps===null&&t.teardown===null&&t.nodes===null&&t.first===t.last&&(t.f&$a)===0&&(t=t.first,(n&be)!==0&&(n&Va)!==0&&t!==null&&(t.f|=Va))}if(t!==null&&(t.parent=a,a!==null&&Jf(t,a),vn!==null&&(vn.f&ne)!==0&&(n&fa)===0)){var r=vn;(r.effects??=[]).push(t)}return s}function Br(){return vn!==null&&!Le}function Cr(n){const e=ze(Es,null);return Pn(e,Yn),e.teardown=n,e}function ws(n){_l();var e=mn.f,a=!vn&&(e&Fe)!==0&&_n!==null&&!_n.i;if(a){var s=_n;(s.e??=[]).push(n)}else return Fl(n)}function Fl(n){return ze(Oa|fl,n)}function _f(n){return _l(),ze(Es|fl,n)}function Ff(n){ua.ensure();const e=ze(fa|$a,n);return(a={})=>new Promise(s=>{a.outro?ya(e,()=>{ce(e),s(void 0)}):(ce(e),s(void 0))})}function Wf(n){return ze(Oa,n)}function Pf(n){return ze(Ha|$a,n)}function Wl(n,e=0){return ze(Es|e,n)}function H(n,e=[],a=[],s=[]){yf(s,e,a,t=>{ze(Es,()=>{n(...t.map(f))})})}function yr(n,e=0){var a=ze(be|e,n);return a}function Te(n){return ze(Fe|$a,n)}function Pl(n){var e=n.teardown;if(e!==null){const a=$e,s=vn;Zr(!0),Se(null);try{e.call(null)}catch(t){Ne(t,n.parent)}finally{Zr(a),Se(s)}}}function Tr(n,e=!1){var a=n.first;for(n.first=n.last=null;a!==null;){const t=a.ac;t!==null&&ht(()=>{t.abort(Ls)});var s=a.next;(a.f&fa)!==0?a.parent=null:ce(a,e),a=s}}function Gf(n){for(var e=n.first;e!==null;){var a=e.next;(e.f&Fe)===0&&ce(e),e=a}}function ce(n,e=!0){var a=!1;(e||(n.f&Ic)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(Nf(n.nodes.start,n.nodes.end),a=!0),n.f|=Ss,Tr(n,e&&!a),Ds(n,0);var s=n.nodes&&n.nodes.t;if(s!==null)for(const r of s)r.stop();Pl(n),n.f^=Ss,n.f|=Xn;var t=n.parent;t!==null&&t.first!==null&&Gl(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Nf(n,e){for(;n!==null;){var a=n===e?null:Ms(n);n.remove(),n=a}}function Gl(n){var e=n.parent,a=n.prev,s=n.next;a!==null&&(a.next=s),s!==null&&(s.prev=a),e!==null&&(e.first===n&&(e.first=s),e.last===n&&(e.last=a))}function ya(n,e,a=!0){var s=[];n.f|=ur,Nl(n,s,!0);var t=()=>{a&&ce(n),e&&e()},r=s.length;if(r>0){var o=()=>--r||t();for(var l of s)l.out(o)}else t()}function Nl(n,e,a){if((n.f&se)===0){n.f^=se;var s=n.nodes&&n.nodes.t;if(s!==null)for(const l of s)(l.is_global||a)&&e.push(l);for(var t=n.first;t!==null;){var r=t.next;if((t.f&fa)===0){var o=(t.f&Va)!==0||(t.f&Fe)!==0&&(n.f&be)!==0;Nl(t,e,o?a:!1)}t=r}}}function et(n){n.f&=~ur,Il(n,!0)}function Il(n,e){if((n.f&ur)===0&&(n.f&se)!==0){n.f^=se,(n.f&Yn)===0&&(Pn(n,Ln),ua.ensure().schedule(n));for(var a=n.first;a!==null;){var s=a.next,t=(a.f&Va)!==0||(a.f&Fe)!==0;Il(a,t?e:!1),a=s}var r=n.nodes&&n.nodes.t;if(r!==null)for(const o of r)(o.is_global||e)&&o.in()}}function Sr(n,e){if(n.nodes)for(var a=n.nodes.start,s=n.nodes.end;a!==null;){var t=a===s?null:Ms(a);e.append(a),a=t}}let $e=!1;function Zr(n){$e=n}let vn=null,Le=!1;function Se(n){vn=n}let mn=null;function Ve(n){mn=n}let xe=null;function Hl(n){vn!==null&&((vn.f&Xs)!==0||(vn.f&ne)!==0)&&(xe??=new Set).add(n)}let ie=null,pe=0,ye=null;function If(n){ye=n}let Kl=1,ga=0,Ta=ga;function Xr(n){Ta=n}function xl(){return++Kl}function Js(n){var e=n.f;if((e&Ln)!==0)return!0;if((e&he)!==0){for(var a=n.deps,s=a.length,t=0;t<s;t++){var r=a[t];if(Js(r)&&yl(r),r.wv>n.wv)return!0}(e&Me)!==0&&Ee===null&&Pn(n,Yn)}return!1}function Ol(n,e,a=!0){var s=n.reactions;if(s!==null&&!(xe!==null&&xe.has(n)))for(var t=0;t<s.length;t++){var r=s[t];(r.f&ne)!==0?Ol(r,e,!1):e===r&&(a?Pn(r,Ln):(r.f&Yn)!==0&&Pn(r,he),gr(r))}}function Vl(n){var e=ie,a=pe,s=ye,t=vn,r=xe,o=_n,l=Le,i=Ta,c=n.f;ie=null,pe=0,ye=null,vn=(c&(Fe|fa))===0?n:null,xe=null,Ya(n.ctx),Le=!1,Ta=++ga,n.ac!==null&&(ht(()=>{n.ac.abort(Ls)}),n.ac=null);try{n.f|=Xs;var u=n.fn,d=u();n.f|=Xa;var h=$r(n);if(As()&&ye!==null&&!Le&&h!==null&&(n.f&(ne|he|Ln))===0)for(var p=0;p<ye.length;p++)Ol(ye[p],n);if(t!==null&&t!==n){if(ga++,t.deps!==null)for(let v=0;v<a;v+=1)t.deps[v].rv=ga;if(e!==null)for(const v of e)v.rv=ga;ye!==null&&(s===null?s=ye:s.push(...ye))}return(n.f&ia)!==0&&(n.f^=ia),d}catch(v){return $r(n),Mf(v)}finally{n.f^=Xs,ie=e,pe=a,ye=s,vn=t,xe=r,Ya(o),Le=l,Ta=i}}function $r(n){var e=n.deps,a=Bn?.is_fork;if(ie!==null){var s;if(a||Ds(n,pe),e!==null&&pe>0)for(e.length=pe+ie.length,s=0;s<ie.length;s++)e[pe+s]=ie[s];else n.deps=e=ie;if(Br()&&(n.f&Me)!==0)for(s=pe;s<e.length;s++)(e[s].reactions??=[]).push(n)}else!a&&e!==null&&pe<e.length&&(Ds(n,pe),e.length=pe);return e}function Hf(n,e){let a=e.reactions;if(a!==null){var s=Fc.call(a,n);if(s!==-1){var t=a.length-1;t===0?a=e.reactions=null:(a[s]=a[t],a.pop())}}if(a===null&&(e.f&ne)!==0&&(ie===null||!Ts.call(ie,e))){var r=e;(r.f&Me)!==0&&(r.f^=Me),r.v!==On&&pr(r),r.ac!==null&&ht(()=>{r.ac.abort(Ls),r.ac=null,Pn(r,Ln)}),wf(r),Ds(r,0)}}function Ds(n,e){var a=n.deps;if(a!==null)for(var s=e;s<a.length;s++)Hf(n,a[s])}function ja(n){var e=n.f;if((e&Xn)===0){Pn(n,Yn);var a=mn;mn=n;try{(e&(be|cl))!==0?Gf(n):Tr(n),Pl(n);var s=Vl(n);n.teardown=typeof s=="function"?s:null,n.wv=Kl;var t;ol&&mf&&(n.f&Ln)!==0&&n.deps}finally{mn=a}}}function f(n){var e=n.f,a=(e&ne)!==0;if(vn!==null&&!Le){var s=mn!==null&&(mn.f&Xn)!==0;if(!s&&(xe===null||!xe.has(n))){var t=vn.deps;if((vn.f&Xs)!==0)n.rv<ga&&(n.rv=ga,ie===null&&t!==null&&t[pe]===n?pe++:ie===null?ie=[n]:ie.push(n));else{vn.deps??=[],Ts.call(vn.deps,n)||vn.deps.push(n);var r=n.reactions;r===null?n.reactions=[vn]:Ts.call(r,vn)||r.push(vn)}}}if($e&&Ke.has(n))return Ke.get(n);if(a){var o=n;if($e){var l=o.v;return((o.f&Yn)===0&&o.reactions!==null||zl(o))&&(l=vr(o)),Ke.set(o,l),l}var i=(o.f&Me)===0&&!Le&&vn!==null&&(vn.f&Me)!==0,c=(o.f&Xa)===0;Js(o)&&(i&&(o.f|=Me),yl(o)),i&&!c&&(Tl(o),Yl(o))}if(Ee?.has(n))return Ee.get(n);if((n.f&ia)!==0)throw n.v;return n.v}function Yl(n){if(n.f|=Me,n.deps!==null)for(const a of n.deps){var e=a.reactions;e===null?a.reactions=[n]:Ts.call(e,n)||e.push(n),(a.f&ne)!==0&&(a.f&Me)===0&&(Tl(a),Yl(a))}}function zl(n){if(n.v===On)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(Ke.has(e)||(e.f&ne)!==0&&zl(e))return!0;return!1}function es(n){var e=Le;try{return Le=!0,n()}finally{Le=e}}function Kf(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(Ze in n)Ut(n);else if(!Array.isArray(n))for(let e in n){const a=n[e];typeof a=="object"&&a&&Ze in a&&Ut(a)}}}function Ut(n,e=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!e.has(n)){e.add(n),n instanceof Date&&n.getTime();for(let s in n)try{Ut(n[s],e)}catch{}const a=fr(n);if(a!==Object.prototype&&a!==Array.prototype&&a!==Map.prototype&&a!==Set.prototype&&a!==Date.prototype){const s=ll(a);for(let t in s){const r=s[t].get;if(r)try{r.call(n)}catch{}}}}}const xf=["touchstart","touchmove"];function Of(n){return xf.includes(n)}const fs=Symbol("events"),Ql=new Set,qt=new Set;function rn(n,e,a){(e[fs]??={})[n]=a}function In(n){for(var e=0;e<n.length;e++)Ql.add(n[e]);for(var a of qt)a(n)}let Rt=null,bt=!1;function no(n){var e=this,a=e.ownerDocument,s=n.type,t=n.composedPath?.()||[],r=t[0]||n.target;Rt=n,bt||(bt=!0,setTimeout(()=>{bt=!1,Rt=null}));var o=0,l=Rt===n&&n[fs];if(l){var i=t.indexOf(l);if(i!==-1&&(e===document||e===window)){n[fs]=e;return}var c=t.indexOf(e);if(c===-1)return;i<=c&&(o=i)}if(r=t[o]||n.target,r!==e){cr(n,"currentTarget",{configurable:!0,get(){return r||a}});var u=vn,d=mn;Se(null),Ve(null);try{for(var h,p=[];r!==null&&r!==e;){try{var v=r[fs]?.[s];v!=null&&(!r.disabled||n.target===r)&&v.call(r,n)}catch(g){h?p.push(g):h=g}if(n.cancelBubble)break;o++,r=o<t.length?t[o]:null}if(h){for(let g of p)queueMicrotask(()=>{throw g});throw h}}finally{n[fs]=e,delete n.currentTarget,Se(u),Ve(d)}}}const Vf=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function Yf(n){return Vf?.createHTML(n)??n}function zf(n){var e=Af("template");return e.innerHTML=Yf(n.replaceAll("<!>","<!---->")),e.content}function at(n,e){var a=mn;a.nodes===null&&(a.nodes={start:n,end:e,a:null,t:null})}function _(n,e){var a=(e&Zc)!==0,s=(e&Xc)!==0,t,r=!n.startsWith("<!>");return()=>{t===void 0&&(t=zf(r?n:"<!>"+n),a||(t=ks(t)));var o=s||Ll?document.importNode(t,!0):t.cloneNode(!0);if(a){var l=ks(o),i=o.lastChild;at(l,i)}else at(o,o);return o}}function Ns(n=""){{var e=Xe(n+"");return at(e,e),e}}function Qf(){var n=document.createDocumentFragment(),e=document.createComment(""),a=Xe();return n.append(e,a),at(e,a),n}function L(n,e){n!==null&&n.before(e)}function jf(n){let e=0,a=Sa(0),s;return()=>{Br()&&(f(a),Wl(()=>(e===0&&(s=es(()=>n(()=>ms(a)))),e+=1,()=>{oa(()=>{e-=1,e===0&&(s?.(),s=void 0,ms(a))})})))}}var Uf=Va|$a;function qf(n,e,a,s){new Zf(n,e,a,s)}class Zf{parent;is_pending=!1;transform_error;#e;#i=null;#n;#o;#a;#s=null;#r=null;#t=null;#l=null;#p=0;#c=0;#h=!1;#g=new Map;#f=null;#v=jf(()=>(this.#f=Sa(this.#p),()=>{this.#f=null}));constructor(e,a,s,t){this.#e=e,this.#n=a,this.#o=r=>{var o=mn;o.b=this,o.f|=xt,s(r)},this.parent=mn.b,this.transform_error=t??this.parent?.transform_error??(r=>r),this.#a=yr(()=>{this.#y()},Uf)}#C(){try{this.#s=Te(()=>this.#o(this.#e))}catch(e){this.error(e)}}#S(e){const a=this.#n.failed,{reset:s,invoke_onerror:t}=this.#B(e);oa(t),a&&(this.#t=Te(()=>{a(this.#e,()=>e,()=>s)}))}#B(e){var a=!1,s=!1;const t=()=>{if(!this.#u()){if(a){af();return}a=!0,s&&vf(),this.#t!==null&&ya(this.#t,()=>{this.#t=null}),this.#T(()=>{this.#y()})}};return{reset:t,invoke_onerror:()=>{if(!this.#u())try{s=!0,this.#n.onerror?.(e,t),s=!1}catch(o){Ne(o,this.#a&&this.#a.parent)}}}}#u(){return(this.#a.f&(Xn|Ss))!==0}#m(){const e=this.#n.pending;e&&(this.is_pending=!0,this.#r=Te(()=>e(this.#e)),oa(()=>{if(!this.#u()){var a=this.#l=document.createDocumentFragment(),s=Xe(),t=!1;if(a.append(s),this.#s=this.#T(()=>{try{return Te(()=>this.#o(s))}catch(r){try{this.error(r),t=!0}catch(o){Ne(o,this.#a.parent)}return null}}),this.#s===null){this.#l=null,t&&this.#d(Bn);return}this.#c===0&&(this.#e.before(a),this.#l=null,ya(this.#r,()=>{this.#r=null}),this.#d(Bn))}}))}#y(){try{if(this.is_pending=this.has_pending_snippet(),this.#c=0,this.#p=0,this.#s=Te(()=>{this.#o(this.#e)}),this.#c>0){var e=this.#l=document.createDocumentFragment();Sr(this.#s,e);const a=this.#n.pending;this.#r=Te(()=>a(this.#e))}else this.#d(Bn)}catch(a){this.error(a)}}#d(e){this.is_pending=!1,e.transfer_reactions(this.#g)}defer_effect(e){Bl(e,this.#g)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#T(e){var a=mn,s=vn,t=_n;Ve(this.#a),Se(this.#a),Ya(this.#a.ctx);try{return ua.ensure(),e()}finally{Ve(a),Se(s),Ya(t)}}#k(e,a){if(!this.has_pending_snippet()){this.parent&&this.parent.#k(e,a);return}this.#c+=e,this.#c===0&&(this.#d(a),this.#r&&ya(this.#r,()=>{this.#r=null}),this.#l&&(this.#e.before(this.#l),this.#l=null))}update_pending_count(e,a){this.#k(e,a),this.#p+=e,!(!this.#f||this.#h)&&(this.#h=!0,oa(()=>{this.#h=!1,this.#f&&Qa(this.#f,this.#p)}))}get_effect_pending(){return this.#v(),f(this.#f)}error(e){if(e===hl||!this.#n.onerror&&!this.#n.failed)throw e;Bn?.is_fork?(this.#s&&Bn.skip_effect(this.#s),this.#r&&Bn.skip_effect(this.#r),this.#t&&Bn.skip_effect(this.#t),Bn.oncommit(()=>{this.#u()||this.#w(e)})):this.#w(e)}#w(e){this.#s&&(ce(this.#s),this.#s=null),this.#r&&(ce(this.#r),this.#r=null),this.#t&&(ce(this.#t),this.#t=null);let a=this.#n.failed;const s=t=>{if(this.#u())return;const{reset:r,invoke_onerror:o}=this.#B(t);o(),a&&!this.#u()&&(this.#t=this.#T(()=>{try{return Te(()=>{var l=mn;l.b=this,l.f|=xt,a(this.#e,()=>t,()=>r)})}catch(l){return Ne(l,this.#a.parent),null}}))};oa(()=>{if(!this.#u()){var t;try{t=this.transform_error(e)}catch(r){Ne(r,this.#a&&this.#a.parent);return}t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(s,r=>Ne(r,this.#a&&this.#a.parent)):s(t)}})}}function T(n,e){var a=e==null?"":typeof e=="object"?`${e}`:e;a!==(n[Yt]??=n.nodeValue)&&(n[Yt]=a,n.nodeValue=`${a}`)}function Xf(n,e){return $f(n,e)}const Is=new Map;function $f(n,{target:e,anchor:a,props:s={},events:t,context:r,intro:o=!0,transformError:l}){Ef();var i=void 0,c=Ff(()=>{var u=a??e.appendChild(Xe());qf(u,{pending:()=>{}},p=>{Rn({});var v=_n;r&&(v.c=r),t&&(s.$$events=t),i=n(p,s)||dr(),bn()},l);var d=new Set,h=p=>{for(var v=0;v<p.length;v++){var g=p[v];if(!d.has(g)){d.add(g);var m=Of(g);for(const k of[e,document]){var y=Is.get(k);y===void 0&&(y=new Map,Is.set(k,y));var D=y.get(g);D===void 0?(k.addEventListener(g,no,{passive:m}),y.set(g,1)):y.set(g,D+1)}}}};return h(pt(Ql)),qt.add(h),()=>{for(var p of d)for(const m of[e,document]){var v=Is.get(m),g=v.get(p);--g==0?(m.removeEventListener(p,no),v.delete(p),v.size===0&&Is.delete(m)):v.set(p,g)}qt.delete(h),u!==a&&u.parentNode?.removeChild(u)}});return n0.set(i,c),i}let n0=new WeakMap;class e0{anchor;#e=new Map;#i=new Map;#n=new Map;#o=new Set;#a=!0;constructor(e,a=!0){this.anchor=e,this.#a=a}#s=e=>{if(this.#e.has(e)){var a=this.#e.get(e),s=this.#i.get(a);if(s)et(s),this.#o.delete(a);else{var t=this.#n.get(a);t&&(et(t.effect),this.#i.set(a,t.effect),this.#n.delete(a),t.fragment.lastChild.remove(),this.anchor.before(t.fragment),s=t.effect)}for(const[r,o]of this.#e){if(this.#e.delete(r),r===e)break;const l=this.#n.get(o);l&&(ce(l.effect),this.#n.delete(o))}for(const[r,o]of this.#i){if(r===a||this.#o.has(r))continue;const l=()=>{if(Array.from(this.#e.values()).includes(r)){var c=document.createDocumentFragment();Sr(o,c),c.append(Xe()),this.#n.set(r,{effect:o,fragment:c})}else ce(o);this.#o.delete(r),this.#i.delete(r)};this.#a||!s?(this.#o.add(r),ya(o,l,!1)):l()}}};#r=e=>{this.#e.delete(e);const a=Array.from(this.#e.values());for(const[s,t]of this.#n)a.includes(s)||(ce(t.effect),this.#n.delete(s))};ensure(e,a){var s=Bn,t=Jl();if(a&&!this.#i.has(e)&&!this.#n.has(e))if(t){var r=document.createDocumentFragment(),o=Xe();r.append(o),this.#n.set(e,{effect:Te(()=>a(o)),fragment:r})}else this.#i.set(e,Te(()=>a(this.anchor)));if(this.#e.set(s,e),t){for(const[l,i]of this.#i)l===e?s.unskip_effect(i):s.skip_effect(i);for(const[l,i]of this.#n)l===e?s.unskip_effect(i.effect):s.skip_effect(i.effect);s.oncommit(this.#s),s.ondiscard(this.#r)}else this.#s(s)}}function tn(n,e,a=!1){var s=new e0(n),t=a?Va:0;function r(o,l){s.ensure(o,l)}yr(()=>{var o=!1;e((l,i=0)=>{o=!0,r(i,l)}),o||r(-1,null)},t)}function as(n,e){return e}function a0(n,e,a){for(var s=[],t=e.length,r,o=e.length,l=0;l<t;l++){let d=e[l];ya(d,()=>{if(r){if(r.pending.delete(d),r.done.add(d),r.pending.size===0){var h=n.outrogroups;Zt(n,pt(r.done)),h.delete(r),h.size===0&&(n.outrogroups=null)}}else o-=1},!1)}if(o===0){var i=s.length===0&&a!==null&&n.pending.size===0;if(i){var c=a,u=c.parentNode;Lf(u),u.append(c),n.items.clear()}Zt(n,e,!i)}else r={pending:new Set(e),done:new Set},(n.outrogroups??=new Set).add(r)}function Zt(n,e,a=!0){var s;if(n.pending.size>0){s=new Set;for(const o of n.pending.values())for(const l of o)s.add(n.items.get(l).e)}for(var t=0;t<e.length;t++){var r=e[t];if(s?.has(r)){r.f|=Ie;const o=document.createDocumentFragment();Sr(r,o)}else ce(e[t],a)}}var eo;function hn(n,e,a,s,t,r=null){var o=n,l=new Map,i=(e&pl)!==0;if(i){var c=n;o=c.appendChild(Xe())}var u=null,d=hr(()=>{var D=a();return dt(D)?D:D==null?[]:pt(D)}),h=new Map,p=!0;function v(D){if((y.effect.f&Xn)===0){y.pending.delete(D);var k=f(d);y.fallback=u,s0(y,k,o,e,s),u!==null&&(k.length===0?(u.f&Ie)===0?et(u):(u.f^=Ie,us(u,null,o)):ya(u,()=>{u=null}))}}function g(D){y.pending.delete(D)}var m=yr(()=>{for(var D=f(d),k=D.length,w=new Set,C=Bn,E=Jl(),M=0;M<k;M+=1){var F=D[M],b=s(F,M),J=p?null:l.get(b);J?(J.v&&Qa(J.v,F),J.i&&Qa(J.i,M),E&&C.unskip_effect(J.e)):(J=t0(l,p?o:eo??=Xe(),F,b,M,t,e,a),p||(J.e.f|=Ie),l.set(b,J)),w.add(b)}if(k===0&&r&&!u&&(p?u=Te(()=>r(o)):(u=Te(()=>r(eo??=Xe())),u.f|=Ie)),k>w.size&&rf(),!p)if(h.set(C,w),E){for(const[I,K]of l)w.has(I)||C.skip_effect(K.e);C.oncommit(v),C.ondiscard(g)}else v(C);f(d)}),y={effect:m,items:l,pending:h,outrogroups:null,fallback:u};p=!1}function ls(n){for(;n!==null&&(n.f&Fe)===0;)n=n.next;return n}function s0(n,e,a,s,t){var r=(s&Vc)!==0,o=e.length,l=n.items,i=ls(n.effect.first),c,u=null,d,h=[],p=[],v,g,m,y;if(r)for(y=0;y<o;y+=1)v=e[y],g=t(v,y),m=l.get(g).e,(m.f&Ie)===0&&(m.nodes?.a?.measure(),(d??=new Set).add(m));for(y=0;y<o;y+=1){if(v=e[y],g=t(v,y),m=l.get(g).e,n.outrogroups!==null)for(const J of n.outrogroups)J.pending.delete(m),J.done.delete(m);if((m.f&se)!==0&&(et(m),r&&(m.nodes?.a?.unfix(),(d??=new Set).delete(m))),(m.f&Ie)!==0)if(m.f^=Ie,m===i)us(m,null,a);else{var D=u?u.next:i;m===n.effect.last&&(n.effect.last=m.prev),m.prev&&(m.prev.next=m.next),m.next&&(m.next.prev=m.prev),ea(n,u,m),ea(n,m,D),us(m,D,a),u=m,h=[],p=[],i=ls(u.next);continue}if(m!==i){if(c!==void 0&&c.has(m)){if(h.length<p.length){var k=p[0],w;u=k.prev;var C=h[0],E=h[h.length-1];for(w=0;w<h.length;w+=1)us(h[w],k,a);for(w=0;w<p.length;w+=1)c.delete(p[w]);ea(n,C.prev,E.next),ea(n,u,C),ea(n,E,k),i=k,u=E,y-=1,h=[],p=[]}else c.delete(m),us(m,i,a),ea(n,m.prev,m.next),ea(n,m,u===null?n.effect.first:u.next),ea(n,u,m),u=m;continue}for(h=[],p=[];i!==null&&i!==m;)(c??=new Set).add(i),p.push(i),i=ls(i.next);if(i===null)continue}(m.f&Ie)===0&&h.push(m),u=m,i=ls(m.next)}if(n.outrogroups!==null){for(const J of n.outrogroups)J.pending.size===0&&(Zt(n,pt(J.done)),n.outrogroups?.delete(J));n.outrogroups.size===0&&(n.outrogroups=null)}if(i!==null||c!==void 0){var M=[];if(c!==void 0)for(m of c)(m.f&se)===0&&M.push(m);for(;i!==null;)(i.f&se)===0&&i!==n.fallback&&M.push(i),i=ls(i.next);var F=M.length;if(F>0){var b=(s&pl)!==0&&o===0?a:null;if(r){for(y=0;y<F;y+=1)M[y].nodes?.a?.measure();for(y=0;y<F;y+=1)M[y].nodes?.a?.fix()}a0(n,M,b)}}r&&oa(()=>{if(d!==void 0)for(m of d)m.nodes?.a?.apply()})}function t0(n,e,a,s,t,r,o,l){var i=(o&xc)!==0?(o&Yc)===0?Rl(a,!1,!1):Sa(a):null,c=(o&Oc)!==0?Sa(t):null;return{v:i,i:c,e:Te(()=>(r(e,i??a,c??t,l),()=>{n.delete(s)}))}}function us(n,e,a){if(n.nodes)for(var s=n.nodes.start,t=n.nodes.end,r=e&&(e.f&Ie)===0?e.nodes.start:a;s!==null;){var o=Ms(s);if(r.before(s),s===t)return;s=o}}function ea(n,e,a){e===null?n.effect.first=a:e.next=a,a===null?n.effect.last=e:a.prev=e}const ao=[...` 	
\r\f \v\uFEFF`];function r0(n,e,a){var s=n==null?"":""+n;if(e&&(s=s?s+" "+e:e),a){for(var t of Object.keys(a))if(a[t])s=s?s+" "+t:t;else if(s.length)for(var r=t.length,o=0;(o=s.indexOf(t,o))>=0;){var l=o+r;(o===0||ao.includes(s[o-1]))&&(l===s.length||ao.includes(s[l]))?s=(o===0?"":s.substring(0,o))+s.substring(l+1):o=l}}return s===""?null:s}function o0(n,e){return n==null?null:String(n)}function Gn(n,e,a,s,t,r){var o=n[Ot];if(o!==a||o===void 0){var l=r0(a,s,r);l==null?n.removeAttribute("class"):n.className=l,n[Ot]=a}else if(r&&t!==r)for(var i in r){var c=!!r[i];(t==null||c!==!!t[i])&&n.classList.toggle(i,c)}return r}function aa(n,e,a,s){var t=n[Vt];if(t!==e){var r=o0(e);r==null?n.removeAttribute("style"):n.style.cssText=r,n[Vt]=e}return s}function l0(n,e){e?n.hasAttribute("selected")||n.setAttribute("selected",""):n.removeAttribute("selected")}function i0(n,e){var a=n.__defaultValue,s=n.multiple,t=s?a??[]:null;if(!(s&&!dt(t))){n.selectedIndex;for(var r of n.options){var o=Xt(r);l0(r,s?t.includes(o):El(o,a))}}}function jl(n,e,a=!1){if(n.multiple){if(e==null)return;if(!dt(e))return ef();for(var s of n.options)s.selected=e.includes(Xt(s));return}for(s of n.options){var t=Xt(s);if(El(t,e)){s.selected=!0;return}}(!a||e!==void 0)&&(n.selectedIndex=-1)}function c0(n){var e=new MutationObserver(a=>{a.every(f0)||("__defaultValue"in n&&i0(n),"__value"in n&&jl(n,n.__value))});e.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Cr(()=>{e.disconnect()})}function Xt(n){return"__value"in n?n.__value:n.value}function f0(n){if(n.target.closest("selectedcontent")!==null)return!0;if(n.type==="childList"){var e=[...n.addedNodes,...n.removedNodes];return e.length>0&&e.every(a=>a.nodeName==="SELECTEDCONTENT")}return!1}const u0=Symbol("is custom element"),d0=Symbol("is html");function so(n,e){var a=Ul(n);a.checked!==(a.checked=e??void 0)&&(n.checked=e)}function dn(n,e,a,s){var t=Ul(n),r=t[e];r!==(t[e]=a)&&(e==="loading"&&(n[Kc]=a),a==null?n.removeAttribute(e):typeof a!="string"&&p0(n).has(e)?n[e]=a:n.setAttribute(e,a))}function Ul(n){return n[dl]??={[u0]:n.nodeName.includes("-"),[d0]:n.namespaceURI===$c}}var to=new Map;function p0(n){var e=n.getAttribute("is")||n.nodeName,a=to.get(e);if(a)return a;to.set(e,a=new Set);for(var s,t=n,r=Element.prototype;r!==t;){s=ll(t);for(var o in s)s[o].set&&o!=="innerHTML"&&o!=="textContent"&&o!=="innerText"&&a.add(o);t=fr(t)}return a}function Et(n,e){return n===e||n?.[Ze]===e}function h0(n=dr(),e,a,s){var t=_n.r,r=mn;return Wf(()=>{var o,l;return Wl(()=>{o=l,l=[],es(()=>{Et(a(...l),n)||(e(n,...l),o&&Et(a(...o),n)&&e(null,...o))})}),()=>{let i=r;for(;i!==t&&i.parent!==null&&i.parent.f&Ss;)i=i.parent;const c=()=>{l&&Et(a(...l),n)&&e(null,...l)},u=i.teardown;i.teardown=()=>{c(),u?.()}}}),n}function v0(n=!1){const e=_n,a=e.l.u;if(!a)return;let s=()=>Kf(e.s);if(n){let t=0,r={};const o=za(()=>{let l=!1;const i=e.s;for(const c in i)i[c]!==r[c]&&(r[c]=i[c],l=!0);return l&&t++,t});s=()=>f(o)}a.b.length&&_f(()=>{ro(e,s),Kt(a.b)}),ws(()=>{const t=es(()=>a.m.map(Gc));return()=>{for(const r of t)typeof r=="function"&&r()}}),a.a.length&&ws(()=>{ro(e,s),Kt(a.a)})}function ro(n,e){if(n.l.s)for(const a of n.l.s)f(a);e()}function ql(n,e,a){if(n==null)return e(void 0),Ca;const s=es(()=>n.subscribe(e,a));return s.unsubscribe?()=>s.unsubscribe():s}const Ra=[];function Zl(n,e){return{subscribe:kr(n,e).subscribe}}function kr(n,e=Ca){let a=null;const s=new Set;function t(l){if(ml(n,l)&&(n=l,a)){const i=!Ra.length;for(const c of s)c[1](),Ra.push(c,n);if(i){for(let c=0;c<Ra.length;c+=2)Ra[c][0](Ra[c+1]);Ra.length=0}}}function r(l){t(l(n))}function o(l,i=Ca){const c=[l,i];return s.add(c),s.size===1&&(a=e(t,r)||Ca),l(n),()=>{s.delete(c),s.size===0&&a&&(a(),a=null)}}return{set:t,update:r,subscribe:o}}function m0(n){let e;return ql(n,a=>e=a)(),e}let Hs=!1,$t=Symbol("unmounted");function We(n,e,a){const s=a[e]??={store:null,source:Rl(void 0),unsubscribe:Ca};if(s.store!==n&&!($t in a))if(s.unsubscribe(),s.store=n??null,n==null)s.source.v=void 0,s.unsubscribe=Ca;else{var t=!0;s.unsubscribe=ql(n,r=>{t?s.source.v=r:z(s.source,r)}),t=!1}return n&&$t in a?m0(n):f(s.source)}function g0(){const n={};function e(){Cr(()=>{for(var a in n)n[a].unsubscribe();cr(n,$t,{enumerable:!1,value:!0})})}return[n,e]}function B0(n){var e=Hs;try{return Hs=!1,[n(),Hs]}finally{Hs=e}}function jn(n,e,a,s){var t=!ns||(a&Qc)!==0,r=(a&Uc)!==0,o=(a&qc)!==0,l=s,i=!0,c=void 0,u=()=>o&&t?(c??=za(s),f(c)):(i&&(i=!1,l=o?es(s):s),l);let d;if(r){var h=Ze in n||Hc in n;d=Ia(n,e)?.set??(h&&e in n?w=>n[e]=w:void 0)}var p,v=!1;r?[p,v]=B0(()=>n[e]):p=n[e],p===void 0&&s!==void 0&&(p=u(),d&&(t&&uf(),d(p)));var g;if(t?g=()=>{var w=n[e];return w===void 0?u():(i=!0,w)}:g=()=>{var w=n[e];return w!==void 0&&(l=void 0),w===void 0?l:w},t&&(a&jc)===0)return g;if(d){var m=n.$$legacy;return(function(w,C){return arguments.length>0?((!t||!C||m||v)&&d(C?g():w),w):g()})}var y=!1,D=((a&zc)!==0?za:hr)(()=>(y=!1,g()));r&&f(D);var k=mn;return(function(w,C){if(arguments.length>0){const E=C?f(D):t&&r?la(w):w;return z(D,E),y=!0,l!==void 0&&(l=E),w}return $e&&y||(k.f&Xn)!==0?D.v:f(D)})}function C0(n){_n===null&&sf(),ns&&_n.l!==null?y0(_n).m.push(n):ws(()=>{const e=es(n);if(typeof e=="function")return e})}function y0(n){var e=n.l;return e.u??={a:[],b:[],m:[]}}const T0="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(T0);const oo=`name,pos,team,ovr,spd,str
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
`,S0=`name,pos,team,ovr,spd,str
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
`,k0=`pid,name,pos,team
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
`,Xl="sim",w0=/^[a-z][a-z0-9]*$/,D0=/^[a-z0-9][a-z0-9-]*$/i,R0=["theme","settings","profile"];function _s(n,e){if(!w0.test(n))throw new Error("keys: bad sport id "+n);if(e===""||!e.split(":").every(a=>D0.test(a)))throw new Error("keys: bad key name "+e);if(R0.includes(n))throw new Error("keys: a sport cannot be called "+n);return`${Xl}:${n}:${e}`}const b0=n=>n.startsWith(Xl+":"),E0=["A","B","C"];function L0(n){const e=n.split(":"),a=e[3];return e.length<4||e[2]!=="slot"||a===void 0?null:E0.includes(a)?a:null}const $l=1,A0=["nfl"],ni={nfl:["draft","week","season"]},ei=["A","B","C"],Be=n=>({ok:!1,reason:"corrupt",message:n}),lo=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),io=n=>typeof n=="number"&&Number.isInteger(n),sa=n=>typeof n=="string";function ai(n){if(!lo(n))return Be("envelope: not an object");const e=n.sport===void 0?"nfl":n.sport;return!sa(e)||!A0.includes(e)?Be("envelope: unknown sport"):!sa(n.kind)||!ni[e].includes(n.kind)?Be("envelope: bad kind for "+e):!io(n.schemaVersion)||n.schemaVersion<1?Be("envelope: bad schemaVersion"):n.schemaVersion>$l?{ok:!1,reason:"newer-version",message:"envelope: written by a newer build (schema "+n.schemaVersion+")"}:!sa(n.engineVersion)||!n.engineVersion?Be("envelope: bad engineVersion"):!sa(n.dataVersion)||!n.dataVersion?Be("envelope: bad dataVersion"):!sa(n.saveId)||!n.saveId?Be("envelope: bad saveId"):!io(n.saveRevision)||n.saveRevision<1?Be("envelope: bad saveRevision"):!sa(n.createdAt)||Number.isNaN(Date.parse(n.createdAt))?Be("envelope: bad createdAt"):!sa(n.slot)||!ei.includes(n.slot)?Be("envelope: bad slot"):!sa(n.savedAt)||Number.isNaN(Date.parse(n.savedAt))?Be("envelope: bad savedAt"):lo(n.payload)?{ok:!0,value:{...n,sport:e}}:Be("envelope: payload is not an object")}function M0(n,e,a,s,t,r){if(!ni[n].includes(e))throw new Error(`envelope: ${n} has no save kind '${e}'`);const o={sport:n,kind:e,schemaVersion:$l,engineVersion:s.engineVersion,dataVersion:s.dataVersion,saveId:s.saveId,saveRevision:s.saveRevision,createdAt:s.createdAt,slot:a,savedAt:r.toISOString(),payload:t};return nr(o,"envelope"),JSON.stringify(o)}function nr(n,e){if(!(n===null||typeof n=="string"||typeof n=="boolean")){if(typeof n=="number"){if(!Number.isFinite(n))throw new Error("not plain JSON at "+e+": non-finite number");return}if(Array.isArray(n)){n.forEach((a,s)=>nr(a,e+"["+s+"]"));return}if(typeof n=="object"&&Object.getPrototypeOf(n)===Object.prototype){for(const[a,s]of Object.entries(n))nr(s,e+"."+a);return}throw new Error("not plain JSON at "+e+": "+(n===void 0?"undefined":typeof n=="object"?"class instance, Map or Set":typeof n))}}const si="nfl",xn=n=>({ok:!1,reason:"corrupt",message:n}),ra=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),Dn=n=>typeof n=="number"&&Number.isInteger(n),Vn=n=>typeof n=="string",J0=n=>ra(n)&&Vn(n.id)&&Vn(n.name)&&Vn(n.pos)&&Vn(n.role)&&Vn(n.team)&&Dn(n.ovr)&&Dn(n.spd)&&Dn(n.str)&&typeof n.freeAgent=="boolean",co=n=>Array.isArray(n)&&n.every(e=>ra(e)&&Dn(e.week)&&Vn(e.home)&&Vn(e.away)&&Dn(e.hs)&&Dn(e.as));function ti(n){return Dn(n.seed)?!Dn(n.userTeam)||n.userTeam<0||n.userTeam>31?"draft: bad userTeam":n.pickSlot!==void 0&&!(Dn(n.pickSlot)&&n.pickSlot>=1&&n.pickSlot<=32)?"draft: bad pickSlot":!Array.isArray(n.picks)||!n.picks.every(e=>ra(e)&&Dn(e.overall)&&Dn(e.team)&&Vn(e.pid)&&Vn(e.slot))?"draft: bad picks":!Array.isArray(n.pool)||!n.pool.every(e=>Array.isArray(e)&&e.length===8&&Vn(e[0])&&Vn(e[1])&&Vn(e[2])&&Vn(e[3])&&Dn(e[4])&&Dn(e[5])&&Dn(e[6])&&(e[7]===0||e[7]===1))?"draft: bad pool":null:"payload: bad seed"}function _0(n){const e=n.payload;if(!Dn(e.seed))return xn("payload: bad seed");if(n.kind==="draft"){const a=ti(e);if(a)return xn(a)}else{if(!Dn(e.year)||!Dn(e.run)||e.run<0)return xn(n.kind+": bad year/run");if(!Vn(e.userTeam))return xn(n.kind+": bad userTeam");if(!Array.isArray(e.roster)||e.roster.length!==32||!e.roster.every(J0))return xn(n.kind+": roster must be 32 frozen players");if(typeof e.statsRecorded!="boolean")return xn(n.kind+": bad statsRecorded");if(n.kind==="week"){if(!Dn(e.gameSeed)||!Dn(e.nextWeek)||e.nextWeek<1)return xn("week: bad gameSeed/nextWeek");if(!ra(e.ratings))return xn("week: bad ratings");if(!Array.isArray(e.schedule)||!e.schedule.every(a=>ra(a)&&Dn(a.week)&&Vn(a.home)&&Vn(a.away)&&Vn(a.kind)))return xn("week: bad schedule");if(!co(e.scores))return xn("week: bad scores");if(e.plan!==null&&!ra(e.plan))return xn("week: bad plan");if(e.prevRank!==void 0&&!(ra(e.prevRank)&&Object.values(e.prevRank).every(Dn)))return xn("week: bad prevRank");if(e.homeField!==void 0&&!(typeof e.homeField=="number"&&Number.isFinite(e.homeField)))return xn("week: bad homeField")}else{if(!Array.isArray(e.table)||!e.table.every(a=>ra(a)&&Vn(a.team)&&Dn(a.w)&&Dn(a.l)&&Dn(a.t)&&Dn(a.pf)&&Dn(a.pa)))return xn("season: bad table");if(!co(e.userResults))return xn("season: bad userResults");if(!Vn(e.champion))return xn("season: bad champion");if(!["missed-playoffs","wild-card","divisional","conference","super-bowl-loss","champion"].includes(e.userOutcome))return xn("season: bad userOutcome")}}return{ok:!0,value:n}}function Fs(n,e,a,s,t){return M0(si,n,e,a,s,t)}function vt(n){let e;try{e=JSON.parse(n)}catch{return xn("envelope: not JSON")}const a=ai(e);return a.ok?a.value.sport!==si?xn("envelope: this is a "+a.value.sport+" save, not an nfl save"):_0(a.value):a}function F0(n,e){const a=L0(e);return a&&a!==n?"envelope: slot "+n+" written under "+e+" (that key is slot "+a+")":null}const st={QB:{FS:12},RB:{FB:0,WR:12,TE:6,SS:12,FS:12},FB:{RB:2,TE:2},WR:{RB:6,TE:6,CB:6,FS:6,SS:6,NICKEL:6,DIME:6},TE:{FB:0,WR:12,RB:6,C:6,OG:6,OT:12,EDGE:12,DT:12,OLB:6,ILB:12,SS:6,FS:12,NICKEL:6,DIME:12},OT:{OG:2,C:2,DT:6,EDGE:6,FB:0},OG:{OT:2,C:2,DT:6,EDGE:6,FB:0},C:{OG:6,OT:12,DT:12,FB:0},DT:{EDGE:6,C:6,OG:6,OT:6,FB:0},EDGE:{DT:2,OLB:2,ILB:6,C:6,OG:6,OT:6,SS:12,RB:6,FB:0,TE:6,NICKEL:6},ILB:{ILB:0,OLB:2,EDGE:12,FS:12,SS:2,FB:0,TE:6,NICKEL:6,DIME:12},OLB:{OLB:0,ILB:6,EDGE:12,FS:12,SS:6,FB:0,TE:6,NICKEL:6,DIME:12},SS:{NICKEL:0,DIME:0,FS:2,CB:6,WR:12,ILB:6,OLB:2,RB:12,TE:6},FS:{NICKEL:0,DIME:0,SS:2,CB:6,WR:12,OLB:6},CB:{FS:2,NICKEL:0,DIME:0,SS:2,WR:6},K:{P:2},P:{K:2},LS:{}},er=8;function W0(n){if(n==="DT"||n==="EDGE")return 0;const e=st[n].DT,a=st[n].EDGE;return e===void 0?a:a===void 0?e:Math.min(e,a)}function Oe(n,e){if(n===e)return{penalty:0,emergency:!1,legal:!0};const a=e==="DL5"?W0(n):st[n][e];return a!==void 0?{penalty:a,emergency:!1,legal:!0}:n==="QB"?{penalty:er,emergency:!0,legal:!1}:{penalty:er,emergency:!0,legal:!0}}function G(n,e){const a=n[e];if(a===void 0)throw new Error(`at(): no element at index ${e} (length ${n.length})`);return a}function ds(n,e){const a=n[e];if(a===void 0)throw new Error(`need(): no entry for key "${e}"`);return a}const ke=[{id:"QB",weight:1e3,dest:"QB",unit:"offense"},{id:"WR1",weight:650,dest:"WR",unit:"offense"},{id:"OT1",weight:500,dest:"OT",unit:"offense"},{id:"OT2",weight:300,dest:"OT",unit:"offense"},{id:"WR2",weight:400,dest:"WR",unit:"offense"},{id:"C",weight:150,dest:"C",unit:"offense"},{id:"OG1",weight:400,dest:"OG",unit:"offense"},{id:"OG2",weight:250,dest:"OG",unit:"offense"},{id:"TE1",weight:250,dest:"TE",unit:"offense"},{id:"RB1",weight:250,dest:"RB",unit:"offense"},{id:"WR3",weight:100,dest:"WR",unit:"offense"},{id:"RB2",weight:100,dest:"RB",unit:"offense"},{id:"TE2",weight:150,dest:"TE",unit:"offense"},{id:"FB",weight:25,dest:"FB",unit:"offense"},{id:"TE3",weight:50,dest:"TE",unit:"offense"},{id:"WR4",weight:50,dest:"WR",unit:"offense"},{id:"DE1",weight:650,dest:"EDGE",unit:"defense"},{id:"DT1",weight:500,dest:"DT",unit:"defense"},{id:"DE2",weight:300,dest:"EDGE",unit:"defense"},{id:"DT2",weight:300,dest:"DT",unit:"defense"},{id:"DL5",weight:150,dest:"DL5",unit:"defense"},{id:"MIKE",weight:300,dest:"ILB",unit:"defense"},{id:"WILL",weight:150,dest:"OLB",unit:"defense"},{id:"SAM",weight:100,dest:"OLB",unit:"defense"},{id:"CB1",weight:400,dest:"CB",unit:"defense"},{id:"CB2",weight:250,dest:"CB",unit:"defense"},{id:"CB3",weight:100,dest:"NICKEL",unit:"defense"},{id:"DIME",weight:50,dest:"DIME",unit:"defense"},{id:"FS",weight:300,dest:"FS",unit:"defense"},{id:"SS",weight:300,dest:"SS",unit:"defense"},{id:"K",weight:50,dest:"K",unit:"special"},{id:"P",weight:50,dest:"P",unit:"special"}],Ka=ke.map(n=>n.id);Object.fromEntries(ke.map(n=>[n.id,n.weight]));const P0={WR1:"WR1",MIKE:"MIKE",WILL:"WILL",SAM:"SAM",CB3:"Nickel",DE1:"DE1",DE2:"DE2"};function wr(n){return ke.map(e=>{const a={slot:e.id,dest:e.dest,row:e.id,label:P0[e.id]??e.id};if(n==="4-3")return a;switch(e.id){case"DT1":return{...a,label:"NT"};case"MIKE":return{...a,label:"ILB1"};case"DT2":return{slot:"DT2",dest:"ILB",row:"DT2",label:"ILB2"};case"WILL":return{slot:"WILL",dest:"OLB",row:"WILL",label:"OLB1"};case"SAM":return{...a,label:"OLB2"};default:return a}})}const Pe={olRun:{OT1:.579,OT2:.348,OG1:.705,OG2:.441,C:.263,TE1:1.436,FB:.188},olPass:{OT1:.812,OT2:.488,OG1:.588,OG2:.368,C:.221},rb:{RB1:43.113,RB2:12.177},qb:{QB:1},rec:{WR1:25.682,WR2:19.86,WR3:3.251,TE1:2.174,RB1:4.201,TE3:1.264,WR4:1.6},passRush:{DE1:.583,DE2:.255,DT1:.303,DT2:.182,MIKE:.053,WILL:.03,DL5:.114},frontRun:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.234,SS:.115,CB1:.06,CB2:.034,CB3:.009,FS:.08,DL5:.099},coverage:{CB1:.175,CB2:.107,CB3:.041,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.1},kicker:{K:1}},Ma={frontBase:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.334,SS:.115,CB1:.06,CB2:.034,CB3:.005,FS:.08,DL5:.099},frontNick:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.032,SS:.115,CB1:.062,CB2:.048,CB3:.009,FS:.08,DL5:.099},covBase:{CB1:.175,CB2:.107,CB3:.011,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.135},covNick:{CB1:.175,CB2:.107,CB3:.045,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.017},covDime:{CB1:.175,CB2:.107,CB3:.045,DIME:.184,SS:.113,FS:.122,MIKE:.069}},ps={12:{WR1:25.682,WR2:27.236,TE1:2.174,TE2:22.844,RB1:4.201},13:{WR1:25.682,TE1:2.174,TE2:22.844,TE3:15.173,RB1:4.201},21:{WR1:25.682,WR2:27.236,TE1:2.174,RB1:4.201,RB2:12.177},22:{WR1:25.682,TE1:2.174,TE2:22.844,RB1:4.201,RB2:12.177}},ri={RB1:44.218,RB2:30.441},Ba={11:{label:"11 personnel",run:0,runB:0,passB:0,heavy:0,tbw:0,pc:0},12:{label:"12 personnel",run:.03,runB:.03,passB:-.015,heavy:.5,tbw:.08,pc:.22},13:{label:"13 personnel",run:.06,runB:.055,passB:-.035,heavy:1,tbw:.14,pc:.42},21:{label:"21 personnel",run:.05,runB:.04,passB:-.03,heavy:.6,tbw:.03,pc:.38},22:{label:"22 personnel",run:.08,runB:.07,passB:-.045,heavy:1,tbw:.1,pc:.48}},Dr={run:{label:"run-heavy",s:.08},neutral:{label:"balanced",s:0},pass:{label:"pass-heavy",s:-.08}},Rr={run:{label:"run-defense",f:1},neutral:{label:"balanced",f:0},pass:{label:"pass-defense",f:-1}},Wn={kRun:1.4,kPass:.85,kTo:1,kSack:.9,rAmp:3,pAmp:2.5,vm:1.3,kBlock:1,predict:.38,defPredict:.15,baseRunPct:.39,nickRun:.05,baseRunVsHeavy:-.025,basePass:.03,defFront:2,defCov:1.5,defRush:.6,pkgFront:.8,pkgCov:.8},En={rb:.0208,olRun:.0495,front:.05577,qb:.00655,rec:.02045,olPass:.01403,rush:.01579,cov:.0184,lean:.013,toQb:.01471,toCov:.0204,toRush:.0105,skRush:.0268,skOl:.0336,skCov:.012,kick:.01215},_a=105,Fa=220,gs=.04,Bs=.07,Cs=3,ys=.8,Wa=1.2,Pa=2.2,tt=21.5,oi=1.7,li=6,ii=2.36,br=82,ci=.0194,fi=.01147,va=[1,1,1],ui=.542,ar=.15,di=32.5,pi=17,G0=Object.freeze(Object.defineProperty({__proto__:null,BASE_PTS:tt,DEF_FOCUS:Rr,DEF_SPECS:Ma,DIME_W:ar,GAMES:pi,HOME_FIELD:oi,LAM_SACK:Pa,LAM_TO:Wa,MC:En,PASS_BASE:Fa,PERS:Ba,PERS_REC:ps,PLAN_K:Wn,POINTS_PER_WIN:di,PTS_NOISE:li,PT_PASS:Bs,PT_RUSH:gs,PT_SACK:ys,PT_TO:Cs,PUNT_PTS:ui,QB_RUN_C:ci,RATING_SPECS:Pe,RB_HEAVY:ri,RET_NEUTRAL:br,RET_PTS:ii,RUSH_BASE:_a,STRAT:Dr,WR_BLK_C:fi,WR_BLK_W:va},Symbol.toStringTag,{value:"Module"})),rt={pers:"11",strat:"neutral"},ot={pkg:"nickel",focus:"neutral"},N0={off:rt,def:ot},hi=["11","12","13","21","22"].flatMap(n=>["run","neutral","pass"].map(e=>({pers:n,strat:e}))),vi=["base","nickel"].flatMap(n=>["run","neutral","pass"].map(e=>({pkg:n,focus:e})));function I0(n){return Ba[n.pers].run+Dr[n.strat].s}function H0(n){const e=1/(1+.2316419*Math.abs(n)),s=.3989423*Math.exp(-n*n/2)*e*(.3193815+e*(-.3565638+e*(1.781478+e*(-1.821256+e*1.330274))));return n>0?1-s:s}function oe(n,e,a){return Math.min(a,Math.max(e,n))}function ba(n,e,a){const s=n>=0?a:-e,t=.6*s,r=Math.abs(n);if(r<=t)return n;const o=t+(s-t)*Math.tanh((r-t)/(s-t));return n>=0?o:-o}function fo(n,e){const a=e.pers,s={...n};a!=="11"&&(s.rec=n["rec"+a]),(a==="21"||a==="22")&&(s.rb=n.rbHeavy);const t=a==="13"?(n.te2+70)/2:a==="12"||a==="22"?(n.te1+n.te2)/2:n.te1;return s.olRun=n.olRun+Ba[a].tbw*(t-75)*Wn.kBlock,s}function uo(n,e,a){const s=Rr[e.focus].f,t=e.pkg==="nickel",r={...n};return r.frontRun=(t?n.frontNick:n.frontBase)+(a?0:(t?-Wn.pkgFront:Wn.pkgFront)+Wn.defFront*s),r.coverage=(t?n.covNick:n.covBase)+(a?0:(t?Wn.pkgCov:-Wn.pkgCov)-Wn.defCov*s),r.passRush=n.passRush-(a?0:Wn.defRush*s),r.coverage=(1-ar)*r.coverage+ar*n.covDime,r}function He(n,e,a,s=N0){const t=s.off,r=s.def,o=fo(n,t),l=fo(a,t),i=uo(e,r,!1),c=uo(a,r,!0),u=I0(t),d=1+Wn.rAmp*u,h=1-Wn.pAmp*u,p=o.rb-l.rb,v=o.olRun-l.olRun,g=o.qb-a.qb,m=o.rec-l.rec,y=o.olPass-a.olPass,D=o.kicker-a.kicker,k=i.frontRun-c.frontRun,w=i.passRush-c.passRush,C=i.coverage-c.coverage,E=En.lean*(.35*(n.rb-a.rb)+.65*(n.olRun-a.olRun)-(.45*g+.3*(n.rec-a.rec)+.25*y)),M=Ba[t.pers].heavy,F=r.pkg==="nickel",b=Ba[t.pers].runB+Wn.kRun*u+(F?Wn.nickRun*M:Wn.baseRunVsHeavy*M),J=Ba[t.pers].passB-Wn.kPass*u+(F?0:Wn.basePass*(1-M)),I=[["rb","off",En.rb*p*d],["olRun","off",En.olRun*v*d],["frontRun","def",-En.front*k*d],["lean","off",E],["scheme","off",b]],K=[["qb","off",En.qb*g*h],["rec","off",En.rec*m*h],["olPass","off",En.olPass*y*h],["passRush","def",-En.rush*w*h],["coverage","def",-En.cov*C*h],["lean","off",-E],["scheme","off",J]],U=[["qb","off",-En.toQb*g],["coverage","def",En.toCov*C],["passRush","def",En.toRush*w],["scheme","off",-Wn.kTo*u]],x=[["passRush","def",En.skRush*w],["olPass","off",-En.skOl*y],["coverage","def",En.skCov*C],["scheme","off",-Wn.kSack*u]],$=Nn=>Nn.reduce((Hn,te)=>Hn+te[2],0),sn=ba(En.rb*p+En.olRun*v,-1.1,.4),X=ba(En.qb*g+En.rec*m+En.olPass*y,-.8,.27),V=ba(sn*d+E+b,-1.3,.33)-En.front*k*d,q=ba(X*h-E+J,-1,.29)-(En.rush*w+En.cov*C)*h,N=ba($(U),-.7,.7),Y=ba($(x),-.8,.4),Z=_a*Math.exp(V),A=Fa*Math.exp(q),P=Wa*Math.exp(N),j=Pa*Math.exp(Y),O=En.kick*D,en=ii*(Math.exp((n.ret-82)/45)-Math.exp((a.ret-82)/45)),un=ci*(n.qbRunR-a.qbRunR),cn=fi*(n.wrBlk-a.wrBlk),gn=-ui*(Math.exp((e.p-80)/45)-Math.exp((a.p-80)/45)),an={},on=(Nn,Hn,te)=>{for(const[fe,me,Un]of Nn){if(fe==="lean"||fe==="scheme")continue;const je=Hn(Un),ge=fe+"|"+me,ee=an[ge]??={unit:fe,owner:me,pts:0,kinds:{}},we=me==="off"?je:-je;ee.pts+=we,ee.kinds[te]=(ee.kinds[te]??0)+we}};on(I,Nn=>gs*_a*(Math.exp(Nn)-1),"ground game"),on(K,Nn=>Bs*Fa*(Math.exp(Nn)-1),"passing game"),on(U,Nn=>-Cs*Wa*(Math.exp(Nn)-1),"turnovers"),on(x,Nn=>-ys*Pa*(Math.exp(Nn)-1),"sacks"),Math.abs(O)>.01&&(an["kicker|off"]={unit:"kicker",owner:"off",pts:O,kinds:{"field goals":O}});const Cn=Wn.predict*Math.pow(Dr[t.strat].s/.08,2)-Wn.defPredict*Math.abs(Rr[r.focus].f)+Ba[t.pers].pc,An=en+gn+un+cn,Tn=tt+gs*(Z-_a)+Bs*(A-Fa)-Cs*(P-Wa)-ys*(j-Pa)+O+An-Cn,kn={run:gs*(Z-_a)+un+cn,pass:Bs*(A-Fa),to:-Cs*(P-Wa),sack:-ys*(j-Pa),kick:O,plan:-Cn},ve=oe(1-Wn.vm*u,.7,1.2);return{expRush:Z,expPass:A,lamTO:P,lamSack:j,structPts:Tn,extraPts:An,channels:kn,swings:Object.values(an),sd:8*ve,vm:ve,sT:u,planCost:Cn,plan:{off:t,def:r}}}function K0(n){const e=n.length;for(const i of n)if(i.length!==e)throw new Error("hungarian: matrix must be square");const a=Number.POSITIVE_INFINITY,s=new Array(e+1).fill(0),t=new Array(e+1).fill(0),r=new Array(e+1).fill(0),o=new Array(e+1).fill(0);for(let i=1;i<=e;i++){r[0]=i;let c=0;const u=new Array(e+1).fill(a),d=new Array(e+1).fill(!1);do{d[c]=!0;const h=r[c];let p=a,v=0;for(let g=1;g<=e;g++){if(d[g])continue;const m=n[h-1][g-1]-s[h]-t[g];m<u[g]&&(u[g]=m,o[g]=c),u[g]<p&&(p=u[g],v=g)}for(let g=0;g<=e;g++)d[g]?(s[r[g]]+=p,t[g]-=p):u[g]-=p;c=v}while(r[c]!==0);do{const h=o[c];r[c]=r[h],c=h}while(c!==0)}const l=new Array(e).fill(-1);for(let i=1;i<=e;i++)r[i]>0&&(l[r[i]-1]=i-1);return l}const sr=70,x0=120;function O0(n,e,a){const s=x0*n.reduce((o,l)=>o+Math.abs(l),0)+1,t=s,r=(a+1)*t+s;return{emergency:t,plays:r,illegal:(e+a+1)*r*2}}const V0=(n,e,a)=>n.map(s=>e.winsPerOvr(s.row,a)/mi);function Y0(n,e,a={}){const{stay:s,stayBonus:t=0,values:r=mt,base:o="4-3"}=a,l=V0(e,r,o),i=n.length,c=e.length,u=i+c,{emergency:d,plays:h,illegal:p}=O0(l,i,c),v=[];for(let k=0;k<u;k++){const w=new Array(u).fill(0);for(let C=0;C<c;C++)if(k<i){const E=Oe(n[k].role,e[C].dest);w[C]=E.legal?-(h+G(l,C)*(n[k].ovr-E.penalty))+(E.emergency?d:0)-(s?.get(n[k].id)===e[C].slot?t:0):p}else w[C]=-G(l,C)*sr;v.push(w)}const g=K0(v),m=e.map(k=>({slot:k,player:null,effOvr:sr,penalty:0,emergency:!1})),y=[];for(let k=0;k<i;k++){const w=g[k];if(w>=c){y.push(n[k]);continue}const C=Oe(n[k].role,e[w].dest);m[w]={slot:e[w],player:n[k],effOvr:n[k].ovr-C.penalty,penalty:C.penalty,emergency:C.emergency}}const D=m.reduce((k,w,C)=>k+G(l,C)*w.effOvr,0);return{placements:m,bench:y,value:D,emergencyFills:m.filter(k=>k.emergency).length}}function Er(n,e,a=mt){return{base:e,...Y0(n,wr(e),{base:e,values:a})}}function z0(n){return n.placements.map(e=>({row:e.slot.row,ovr:e.effOvr}))}function Q0(n,e){let a=0,s=0;for(const t of n){const r=e[t.row];r!==void 0&&(a+=t.ovr*r,s+=r)}if(s===0)throw new Error("wavg: no spot matches the spec");return a/s}function pa(n,e){const a=n.find(s=>s.row===e);return a?a.ovr:sr}function tr(n,e=br){const a=o=>Q0(n,o),s={TE1:pa(n,"TE1"),TE2:pa(n,"TE2"),P:pa(n,"P"),QB:pa(n,"QB"),WR1:pa(n,"WR1"),WR2:pa(n,"WR2"),WR3:pa(n,"WR3")},t=a(Pe.rec),r={olRun:a(Pe.olRun),olPass:a(Pe.olPass),rb:a(Pe.rb),qb:a(Pe.qb),rec:t,passRush:a(Pe.passRush),frontRun:a(Pe.frontRun),coverage:a(Pe.coverage),kicker:a(Pe.kicker),rec12:a(ps[12]),rec13:a(ps[13]),rec21:a(ps[21]),rec22:a(ps[22]),rec11:t,frontBase:a(Ma.frontBase),frontNick:a(Ma.frontNick),covBase:a(Ma.covBase),covNick:a(Ma.covNick),covDime:a(Ma.covDime),te1:s.TE1,te2:s.TE2,rbHeavy:a(ri),ret:e,p:s.P,qbRunR:s.QB,wrBlk:(s.WR1*va[0]+s.WR2*va[1]+s.WR3*va[2])/(va[0]+va[1]+va[2]),passOff:0,runOff:0,off:0,def:0};return r.passOff=.45*r.qb+.3*r.rec+.25*r.olPass,r.runOff=.35*r.rb+.65*r.olRun,r.off=.6*r.passOff+.4*r.runOff,r.def=.55*(.5*r.passRush+.5*r.coverage)+.45*r.frontRun,r}function Lr(n){if(!n.length)throw new Error("leagueBaseline: no teams");const e=Object.keys(n[0]),a={};for(const s of e)a[s]=n.reduce((t,r)=>t+r[s],0)/n.length;return a}function lt(n,e,a){return a?Math.max(...hi.map(s=>He(n,e,e,{off:s,def:ot}).structPts)):-Math.min(...vi.map(s=>He(e,n,e,{off:rt,def:s}).structPts))}function po(n,e){return lt(n,e,!0)+lt(n,e,!1)}const j0=n=>n==="K"||ke.find(e=>e.id===n)?.unit==="offense";function ho(n,e,a="4-3"){const s=l=>wr(a).map(i=>({row:i.row,ovr:i.slot===n?l:80})),t=tr(s(80)),r=pi/di,o=j0(n);return(lt(tr(s(e)),t,o)-lt(t,t,o))*r}function U0(n,e="4-3"){return ho(n,90,e)-ho(n,70,e)}const mi=.00254/20,q0=n=>Math.round(n*1e9)/1e9;function Z0(){const n=new Map,e=a=>{let s=n.get(a);return s||(s=Object.fromEntries(Ka.map(t=>[t,q0(U0(t,a)/20)])),n.set(a,s)),s};return{name:"measured",winsPerOvr:(a,s)=>e(s)[a]}}const mt=Z0(),X0="4-3",Ua=32,$0=Ka.length,qa=Object.fromEntries(ke.map(n=>[n.id,n.dest])),gi=n=>n==="NICKEL"||n==="DIME"?"CB":n==="DL5"?"DT":n,Ar={topFloor:5,topFloorRounds:4,midFloor:10,midFloorRounds:8,kpFirstRound:6,noiseMax:1.5,missMax:.6,biasSd:.5,hyperP:.15,replFloor:72};function Bi(n=Ua,e=$0){const a=[];for(let s=0;s<e;s++)for(let t=0;t<n;t++)a.push(s%2===0?t:n-1-t);return a}const nu=(n,e)=>e.ovr-n.ovr||(n.id<e.id?-1:n.id>e.id?1:0),eu=Array.from(new Set(ke.map(n=>n.dest)));function au(n,e,a=Ar,s=Bi()){const t=n.filter(l=>l.role!=="LS").slice().sort(nu),r=e.fork("traits"),o=Array.from({length:Ua},()=>({noise:.05+r.next()*(a.noiseMax-.05),miss:r.next()*a.missMax,bias:Object.fromEntries(eu.map(l=>{const i=r.next();return[l,i<a.hyperP/2?.05+r.next()*.3:i<a.hyperP?2+r.next()*3:Math.exp(a.biasSd*r.normal())]}))}));return{cfg:a,order:s,pos:0,pool:t,rosters:Array.from({length:Ua},()=>({})),traits:o,log:[],repl:{},replAt:-99}}const gt=n=>Math.floor(n.pos/Ua)+1,Ws=n=>Ka.filter(e=>!n[e]);function su(n){if(n.pos===n.replAt)return n.repl;const e={};for(const t of n.rosters)for(const r of Ws(t)){const o=gi(qa[r]);e[o]=(e[o]??0)+1}const a={};for(const t of n.pool)(a[t.role]??=[]).push(t.ovr);const s={};for(const t of Object.keys(e)){const r=a[t]??[];s[t]=r.length?G(r,Math.min(e[t]??1,r.length)-1):0}return n.repl=s,n.replAt=n.pos,s}function rr(n,e,a=mt){const s=Ws(G(n.rosters,e)),t=su(n),r={},o=[],l=gt(n);for(const i of n.pool)if(!((r[i.role]=(r[i.role]??0)+1)>16)&&!((i.role==="K"||i.role==="P")&&l<n.cfg.kpFirstRound))for(const u of s){const d=Oe(i.role,qa[u]);if(!d.legal||d.emergency)continue;const h=i.ovr-d.penalty,p=Math.max(t[gi(qa[u])]??0,n.cfg.replFloor);o.push({player:i,slot:u,eff:h,wins:Math.round(a.winsPerOvr(u,X0)*(h-p)*1e9)/1e9})}return o}function tu(n){const e=n.pool.length?G(n.pool,0).ovr:0,a=gt(n),s=n.cfg;return a<=s.topFloorRounds?e-s.topFloor:a<=s.midFloorRounds?e-s.midFloor:-1/0}function Ci(n,e,a,s=mt){const t=G(n.traits,e),r=tu(n);let o=rr(n,e,s).filter(u=>u.player.ovr>=r);if(o.length||(o=rr(n,e,s)),!o.length)return ru(n,e);const l=o.map(u=>({c:u,v:u.wins*(t.bias[qa[u.slot]]??1)*Math.max(.02,1+t.noise*a.normal())+.002*mi*u.player.ovr}));l.sort((u,d)=>d.v-u.v);let i=0;l.length>8&&a.next()<t.miss&&(i=Math.min(l.length-1,3+Math.min(9,Math.floor(Math.abs(a.normal())*4))));const c=G(l,i).c;return{player:c.player,slot:c.slot}}function ru(n,e){const a=Ws(G(n.rosters,e));for(const s of n.pool)for(const t of a)if(Oe(s.role,qa[t]).legal)return{player:s,slot:t};throw new Error("draft: no legal pick for team "+e)}function Bt(n,e,a,s){if(n.order[n.pos]!==e)throw new Error(`draft: it is not team ${e}'s pick`);if(G(n.rosters,e)[s])throw new Error("draft: spot already filled "+s);const t=n.pool.findIndex(l=>l.id===a.id);if(t<0)throw new Error("draft: player already taken "+a.id);if(!Oe(a.role,qa[s]).legal)throw new Error("draft: illegal fit");const r=G(n.pool,0).ovr;n.pool.splice(t,1),G(n.rosters,e)[s]=a;const o={overall:n.pos+1,round:gt(n),pickInRound:n.pos%Ua+1,team:e,slot:s,player:a,ovrGap:r-a.ovr};return n.log.push(o),n.pos++,o}const ou=/^([a-z][a-z0-9]*)-p(\d{5,})$/;function lu(n){const e=ou.exec(n);return e?{sport:e[1],n:+e[2]}:null}const iu="pid,name,pos,team",yi=(n,e,a)=>`${n}|${e}|${a}`,cu="nfl";function fu(n,e=cu){const a=n.split(/\r?\n/).filter(o=>o.trim().length>0);if(a.length===0||a[0].trim()!==iu)throw new Error("player-ids csv: unexpected header: "+(a[0]??"(empty)"));const s=[],t=new Set,r=new Set;for(let o=1;o<a.length;o++){const l=/^([a-z][a-z0-9]*-p\d{5,}),(.*),([A-Z]+),([^,]+)$/.exec(a[o]);if(!l)throw new Error(`player-ids csv line ${o+1}: cannot parse: ${a[o]}`);const i={pid:l[1],name:l[2],pos:l[3],team:l[4]};if(lu(i.pid)?.sport!==e)throw new Error(`player-ids csv line ${o+1}: ${i.pid} is not a ${e} id`);if(t.has(i.pid))throw new Error("player-ids csv: duplicate pid "+i.pid);const c=yi(i.name,i.pos,i.team);if(r.has(c))throw new Error("player-ids csv: duplicate key "+c);t.add(i.pid),r.add(c),s.push(i)}return s}function uu(n){return new Map(n.map(e=>[yi(e.name,e.pos,e.team),e.pid]))}const Ti={QB:"QB",HB:"RB",FB:"FB",WR:"WR",TE:"TE",LT:"OT",RT:"OT",LG:"OG",RG:"OG",C:"C",DT:"DT",LEDG:"EDGE",REDG:"EDGE",MIKE:"ILB",WILL:"OLB",SAM:"OLB",CB:"CB",SS:"SS",FS:"FS",K:"K",P:"P",LS:"LS"},du=n=>Ti[n];function vo(n,e){const a=[],s=n.split(/\r?\n/).filter(t=>t.trim().length>0);if(s[0].trim()!=="name,pos,team,ovr,spd,str")throw new Error("players csv: unexpected header: "+s[0]);for(let t=1;t<s.length;t++){const r=/^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(s[t]);if(!r)throw new Error(`players csv line ${t+1}: cannot parse: ${s[t]}`);const[,o,l,i,c,u,d]=r,h=Ti[l];if(!h)throw new Error(`players csv line ${t+1}: unknown position ${l}`);a.push({id:`${o}|${l}|${i}`,name:o,pos:l,role:h,team:i,ovr:+c,spd:+u,str:+d,freeAgent:e})}return a}function pu(n,e,a){const s=[...vo(n,!1),...vo(e,!0)],t=uu(fu(a)),r=new Set,o=new Set;return s.map(l=>{if(o.has(l.id))throw new Error("duplicate player "+l.id);o.add(l.id);const i=t.get(l.id);if(!i)throw new Error("no stable id for "+l.id+" (run tools/player-ids.ts sync)");if(r.has(i))throw new Error("duplicate pid "+i);return r.add(i),{...l,id:i}})}function Si(n){let e=2166136261;for(let a=0;a<n.length;a++)e^=n.charCodeAt(a),e=Math.imul(e,16777619)>>>0;return e>>>0}function Ye(n){let e=n>>>0,a=null;const s=()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296};return{next:s,int:(t,r)=>t+Math.floor(s()*(r-t+1)),normal:()=>{if(a!==null){const l=a;return a=null,l}let t=0,r=0;for(;t===0;)t=s();r=s();const o=Math.sqrt(-2*Math.log(t));return a=o*Math.sin(2*Math.PI*r),o*Math.cos(2*Math.PI*r)},pick:t=>t[Math.floor(s()*t.length)],fork:t=>Ye((n^Si(t))>>>0)}}function hu(n,e){return(n>>>0^Si(e))>>>0}const ki=Object.fromEntries(ke.map(n=>[n.id,n.dest])),Mr=new Set(ke.map(n=>n.id));function vu(n){return n.filter(e=>e.role!=="LS").map(e=>[e.id,e.name,e.pos,e.team,e.ovr,e.spd,e.str,e.freeAgent?1:0])}function Jr(n){return n.map(([e,a,s,t,r,o,l,i])=>{const c=du(s);if(!c)throw new Error("save: unknown position "+s);return{id:e,name:a,pos:s,role:c,team:t,ovr:r,spd:o,str:l,freeAgent:i===1}})}function mu(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("save: not an object");const e=ti(n);if(e)throw new Error("save: "+e);const a=n;if(a.picks.length>1024)throw new Error("save: too many picks");if(!a.picks.every(s=>Mr.has(s.slot)))throw new Error("save: bad pick slot");return{seed:a.seed,userTeam:a.userTeam,...a.pickSlot===void 0?{}:{pickSlot:a.pickSlot},picks:a.picks.map(s=>({overall:s.overall,team:s.team,pid:s.pid,slot:s.slot})),pool:a.pool.map(s=>[...s])}}const Ks=(n,e,a)=>({seed:e.seed,userTeam:e.userTeam,...e.pickSlot===void 0?{}:{pickSlot:e.pickSlot},pool:a,picks:n.log.map(s=>({overall:s.overall,team:s.team,pid:s.player.id,slot:s.slot}))});function wi(n,e){const a=Array.from({length:Ua},(s,t)=>t);if(e!==void 0&&e-1!==n){const s=e-1;[a[n],a[s]]=[a[s],a[n]]}return Bi().map(s=>a[s])}function is(n){const e=au(Jr(n.pool),Ye(n.seed).fork("draft"),Ar,wi(n.userTeam,n.pickSlot));for(const a of n.picks){if(e.pos>=e.order.length)throw new Error("save: more picks than the draft has");if(a.overall!==e.pos+1||a.team!==e.order[e.pos])throw new Error("save: pick "+a.overall+" is out of order");const s=e.pool.find(r=>r.id===a.pid);if(!s)throw new Error("restore: player not available: "+a.pid);const t=Mr.has(a.slot)?ki[a.slot]:void 0;if(!t||!Oe(s.role,t).legal)throw new Error("restore: illegal fit");Bt(e,a.team,s,a.slot)}return e}function Lt(n,e,a){const s=Ye(e).fork("cpu");for(;n.pos<n.order.length;){const t=n.order[n.pos];if(t===void 0||t===a)break;const r=Ci(n,t,s.fork("p"+n.pos));Bt(n,t,r.player,r.slot)}}function gu(n){let e={record:null,draft:null,status:"idle",error:null};const a=new Set,s=i=>{e=i,a.forEach(c=>c(e))},t=(i,c)=>{const u=is(c);return{record:c,draft:u,status:u.pos>=u.order.length?"done":"drafting",error:null}},r=i=>{try{if(i.type==="START"){if(!Number.isInteger(i.seed)||!Number.isInteger(i.userTeam)||i.userTeam<0||i.userTeam>31)throw new Error("start: bad seed or team");if(i.pickSlot!==void 0&&!(Number.isInteger(i.pickSlot)&&i.pickSlot>=1&&i.pickSlot<=32))throw new Error("start: bad pick slot");const c={seed:i.seed,userTeam:i.userTeam,...i.pickSlot===void 0||i.pickSlot-1===i.userTeam?{}:{pickSlot:i.pickSlot}},u=vu(n),d=is({...c,picks:[],pool:u});Lt(d,i.seed,i.userTeam),s(t(d,Ks(d,c,u)))}else if(i.type==="LOAD"){const c=mu(i.record),u=is(c);Lt(u,c.seed,c.userTeam),s(t(u,Ks(u,c,c.pool)))}else{if(!e.record||!e.draft)throw new Error("no draft in progress");if(i.type==="PICK"){const{record:c,draft:u}=e;if(u.pos>=u.order.length||u.order[u.pos]!==c.userTeam)throw new Error("it is not your pick");if(!Mr.has(i.slot))throw new Error("bad slot");const d=is(c),h=d.pool.find(v=>v.id===i.playerId);if(!h)throw new Error("player not available: "+i.playerId);const p=ki[i.slot];if(!p||!Oe(h.role,p).legal)throw new Error("illegal fit");Bt(d,c.userTeam,h,i.slot),Lt(d,c.seed,c.userTeam),s(t(d,Ks(d,c,c.pool)))}else if(i.type==="UNDO"){const c=e.record,u=c.picks.map(p=>p.team).lastIndexOf(c.userTeam);if(u<0)throw new Error("nothing to undo");const d={...c,picks:c.picks.slice(0,u)},h=is(d);s(t(h,Ks(h,c,c.pool)))}}}catch(c){console.warn("store: action rejected:",i.type,c.message),s({...e,error:c.message})}};let o=Promise.resolve();return{getState:()=>e,dispatch:r,dispatchAsync:i=>{const c=o.then(()=>new Promise(u=>setTimeout(u,0))).then(()=>{try{r(i)}catch(u){console.warn("store: subscriber threw:",u.message)}return e});return o=c.catch(()=>{}),c},subscribe:i=>(a.add(i),()=>a.delete(i))}}_s("nfl","draft");function Bu(n){return{...n,pool:n.pool.slice(),rosters:n.rosters.map(e=>({...e})),log:[],repl:{...n.repl}}}function Cu(n,e,a,s=30){if(n.order[n.pos]!==e)throw new Error("goneOdds: it is not the user's pick");let t=n.pos+1;for(;t<n.order.length&&n.order[t]!==e;)t++;const r=t-(n.pos+1),o=new Map;if(r<=0||t>=n.order.length)return{picksBetween:Math.max(0,r),sims:s,gone:o};for(let l=0;l<s;l++){const i=Bu(n);i.pos=n.pos+1;const c=a.fork("gone"+l);for(let u=i.pos;u<t;u++){const d=i.order[u],h=Ci(i,d,c);Bt(i,d,h.player,h.slot)}for(const u of i.log)o.set(u.player.id,(o.get(u.player.id)??0)+1)}for(const[l,i]of o)o.set(l,i/s);return{picksBetween:r,sims:s,gone:o}}const yu=(n,e)=>n.gone.get(e)??0;function Tu(n){if(!Number.isFinite(n))throw new Error("goneDisplay: not a number: "+n);const e=Math.round(Math.min(1,Math.max(0,n))*100);return Math.min(99,e)}function zn(n){if(!Number.isFinite(n))throw new Error("showInt: not a number: "+n);const e=Math.sign(n)*Math.round(Math.abs(n));return String(e===0?0:e)}function Rs(n,e){if(!Number.isFinite(e))throw new Error("showDecimal: not a number: "+e);const a=Math.sign(e)*Math.round(Math.abs(e)*10)/10;return(a===0?0:a).toFixed(1)}const Ge=["East","North","South","West"],ta=(n,e,a)=>a.map(s=>({name:s,conf:n,div:e})),yn=[...ta("AFC","East",["Buffalo Bills","Miami Dolphins","New England Patriots","NY Jets"]),...ta("AFC","North",["Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers"]),...ta("AFC","South",["Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans"]),...ta("AFC","West",["Denver Broncos","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers"]),...ta("NFC","East",["Dallas Cowboys","NY Giants","Philadelphia Eagles","Washington Commanders"]),...ta("NFC","North",["Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings"]),...ta("NFC","South",["Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers"]),...ta("NFC","West",["Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks"])],Ct=Object.fromEntries(yn.map(n=>[n.name,n]));function ka(n,e){return yn.filter(a=>a.conf===n&&a.div===e).map(a=>a.name)}const At=Object.fromEntries(ke.map(n=>[n.id,n.dest])),Su=Object.fromEntries(wr("4-3").map(n=>[n.slot,n.label])),it=n=>Su[n]??n,mo=n=>n.startsWith("-")?n:"+"+n,ku=(n,e)=>n===2||n===4||n>4&&e>20;function wu(n,e,a,s={}){const t=s.sort??"wins",r=s.limit??60,o=gt(n),l=new Set(Ws(n.rosters[e])),i=new Map;for(const p of rr(n,e))(i.get(p.player.id)??i.set(p.player.id,[]).get(p.player.id)).push(p);const c=[];for(const p of i.values()){const g=p.filter(C=>Oe(C.player.role,At[C.slot]).penalty===0).sort((C,E)=>E.wins-C.wins)[0]??p.slice().sort((C,E)=>E.wins-C.wins)[0],m=g.player,y=g.wins,D=yu(a,m.id),k=y*D,w=p.filter(C=>C.slot!==g.slot&&l.has(C.slot)).map(C=>({c:C,pen:Oe(C.player.role,At[C.slot]).penalty})).filter(C=>ku(C.pen,o)).sort((C,E)=>E.c.wins-C.c.wins).map(C=>({slotId:C.c.slot,slotLabel:it(C.c.slot),flex:C.pen===0?"":`-${C.pen} flex`}));c.push({id:m.id,name:m.name,pos:m.pos,nflTeam:m.team,ovr:zn(m.ovr),slotId:g.slot,slotLabel:it(g.slot),natural:Oe(m.role,At[g.slot]).penalty===0,wins:mo(Rs("wins",y)),priority:mo(Rs("priority",k)),gone:Tu(D)+"%",alsoFits:w,tone:y>.05?"good":y<-.05?"bad":"neutral",_w:y,_p:k})}const u=p=>t==="ovr"?Number(p.ovr):t==="priority"?p._p:p._w;c.sort((p,v)=>u(v)-u(p)||(p.id<v.id?-1:1));const d=n.pos+1,h=Ka.length-l.size;return{header:{teamName:yn[e].name,round:o,roundLabel:`Round ${o}`,pickInRound:n.pos%32+1,overall:d,totalPicks:n.order.length,onClock:`You're on the clock: Round ${o}, Pick ${n.pos%32+1} (overall ${d} of ${n.order.length})`},rows:c.slice(0,r).map(({_w:p,_p:v,...g})=>g),footer:{filled:h,total:Ka.length,text:`${h} of ${Ka.length} starters`},sort:t}}const Du={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},Ru=["RB1","RB2","WR1","WR2","WR3","TE1","TE2","MIKE","WILL","SAM","CB1","CB2","CB3","SS","FS"],Mt={spd:.8,ovr:.1,str:.1};function bu(n){return Math.min(99,n.spd*Mt.spd+n.ovr*Mt.ovr+n.str*Mt.str)}function Eu(n){const e=[];for(const a of n.placements)a.player&&Ru.includes(a.slot.slot)&&e.push({slot:a.slot.slot,player:a.player,value:bu(a.player)});return e.sort((a,s)=>s.value-a.value||(a.player.id<s.player.id?-1:1))}function Di(n,e){const a=Eu(n);return a.find(s=>s.player.id===e)??a[0]??null}function Lu(n,e){return Di(n,e)?.value??br}const Au=[3.27,5.78,5.88,5.85,5.91,5.93,5.2,5.41,5.17,4.48,4.26,16,26.85],Mu=[.3,4.62,4.99,14.52,4.91,4.77,7.37,7.3,4.69,2.01,5.29,9.98,29.26],go=5.88,Ju=[.073,0,0,.396,.073,0,.292,.157,0,0,0,.008,0],Ri=n=>{const e=n.reduce((a,s)=>a+s,0);return n.map(a=>a/e)},Bo=Ri(Mu.map((n,e)=>e===0?go:Math.max(0,n-go*Ju[e]))),Jt=Ri(Au),_u=(()=>{const n=Jt.length,e=[0],a=[0];for(let s=0;s<n;s++)e.push(e[s]+Jt[s]),a.push(a[s]+Bo[s]);return Jt.map((s,t)=>Bo.map((r,o)=>s===0?t===o?1:0:Math.max(0,Math.min(e[t+1],a[o+1])-Math.max(e[t],a[o]))/s))})(),Co=n=>n<=10?n:n<=14?11:12,yo=n=>n===0||n===3||n>=6;function Fu(n,e,a){if(a===0)return[n,n];let s=[n,e],t=1/0;for(let r=0;r<=45;r++){const o=r+a;if(!yo(r)||!yo(o)||o>58)continue;const l=o+r-(n+e),i=1.5*Math.abs(l)+(l<0?1.5*-l:0)+Math.abs(o-n)+Math.abs(r-e);i<t&&(t=i,s=[o,r])}return s}function Wu(n,e,a,s){const t=n===e?a:n>e,r=t?n:e,o=t?e:n,l=r-o,i=Co(l);let c=s.next(),u=0;const d=_u[i];for(;u<d.length-1&&(c-=d[u],!(c<0));u++);let h;u<=10?h=u:u===11?h=Co(l)===11?l:s.int(11,14):h=l>=15?l:s.int(15,24);const[p,v]=Fu(r,o,h);return t?[p,v]:[v,p]}const De=n=>n==="home"?"away":"home";function ct(n,e){if(e<=0)return 0;const a=Math.exp(-e);let s=0,t=1;do s++,t*=n.next();while(t>a);return s-1}function Zn(n,e){return n.next()<e}function bi(n,e){let a=0;for(const t of e)a+=t;let s=n.next()*a;for(let t=0;t<e.length;t++)if(s-=G(e,t),s<0)return t;return e.length-1}function Ei(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=G(e,a);e[a]=G(e,s),e[s]=t}return e}function xa(n,e){const a=e.reduce((l,i)=>l+i,0),s=e.map(l=>n*l/a),t=s.map(Math.floor);let r=n-t.reduce((l,i)=>l+i,0);const o=s.map((l,i)=>[l-G(t,i),i]).sort((l,i)=>i[0]-l[0]);for(let l=0;r>0;l++,r--){const i=G(o,l%o.length)[1];t[i]=G(t,i)+1}return t}function To(n,e){return n===1?Zn(e,.5)?0:3:n===2?3:n===4?Zn(e,.5)?3:6:n===5?Zn(e,.5)?6:3:n}const xs=n=>n===0||n===3||n>=6;function So(n,e){return{rush:oe(Math.round(n.expRush*Math.exp(.3*e.normal()-.045)),15,345),pass:oe(Math.round(n.expPass*Math.exp(.26*n.vm*e.normal()-.0338*n.vm*n.vm)),45,520),to:oe(ct(e,n.lamTO),0,6),sacks:oe(ct(e,n.lamSack),0,9)}}const Pu=n=>n==="xp"?1:n==="two"?2:0;function ko(n,e,a){let s=0;for(let g=0;g<e;g++)Zn(a,.12)&&s++;for(;s>0&&!xs(n-7*s);)s--;let t=Zn(a,.035)&&xs(n-7*s-2)?1:0;const r=n-7*s-2*t;xs(r)||(t=0,s=0);const o=n-7*s-2*t;if(!xs(o))throw new Error("decompose: cannot score "+n);const l=o*.24/3,i=[];for(let g=0;3*g<=o;g++){const m=o-3*g;if(!(m!==0&&m<6))for(let y=Math.ceil(m/8);6*y<=m;y++){const D=m-6*y,k=Math.max(D-y,0),w=D-2*k,C=y-w-k;C<0||i.push({b:g,n:y,w:Math.exp(-.5*((g-l)/1)**2)*Math.exp(-1.4*C)+1e-6})}}const c=G(i,bi(a,i.map(g=>g.w))),u=o-3*c.b,d=u-6*c.n;let h=Math.max(d-c.n,0),p=d-2*h;for(;p>=2&&h+p-1<=c.n&&Zn(a,.22);)p-=2,h+=1;const v=[];for(let g=0;g<p;g++)v.push("xp");for(let g=0;g<h;g++)v.push("two");for(let g=v.length;g<c.n;g++)v.push(Zn(a,.6)?"xp_miss":"two_fail");return{td:c.n,fg:c.b,convs:Ei(a,v),dTD:s,sf:t}}function Gu(n,e){return e<4?1:n<=-9?.55:n<=-4?.75:n>=17?1.85:n>=9?1.55:n>=4?1.25:n<=-1?.9:n>=1?1.1:1}const _t={TD:68,FG:46,FG_MISS:44,PUNT:24,INT:26,FUM:25,DOWNS:32,HALF:24,SAFETY:14},wo={TD:1,FG:3,FG_MISS:3,PUNT:3,INT:2,FUM:2,DOWNS:4,HALF:2,SAFETY:2};function Do(n,e,a,s,t,r,o,l,i){const c=[];n.convs.forEach(p=>c.push({end:"TD",conv:p}));for(let p=0;p<n.fg;p++)c.push({end:"FG"});for(let p=0;p<t;p++)c.push({end:"FG_MISS"});for(let p=0;p<e;p++)c.push({end:Zn(l,.65)?"INT":"FUM",defTD:p<a.dTD});for(let p=0;p<a.sf;p++)c.push({end:"SAFETY"});for(let p=0;p<s;p++)c.push({end:"DOWNS"});const u=new Array(r).fill(null),d=[i[0]?o-1:-1,i[1]?r-1:-1];for(const p of d)p>=0&&c.length<r-1&&(u[p]={end:"HALF"});Ei(l,c);let h=0;for(let p=0;p<r;p++)u[p]||(u[p]=h<c.length?G(c,h++):{end:"PUNT"});return u}function Ro(n,e,a,s,t){return n.td+n.fg+t+e+a.sf+s}function Li(n,e,a,s){const t=s.homeField??oi,r=a.fork("aggregates"),o={home:So(n,r),away:So(e,r)},l=(A,P,j)=>oe(tt+j+gs*(P.rush-_a)+Bs*(P.pass-Fa)-Cs*(P.to-Wa)-ys*(P.sacks-Pa)+A.channels.kick+A.extraPts-A.planCost+li*A.vm*r.normal(),0,58),i=l(n,o.home,t),c=l(e,o.away,0),u=[To(Math.round(i),r),To(Math.round(c),r)],[d,h]=Wu(u[0],u[1],i>=c,a.fork("margin")),p=a.fork("drives"),v={home:ko(d,o.away.to,p),away:ko(h,o.home.to,p)},g={home:ct(p,.35),away:ct(p,.35)},m={home:0,away:0};for(const A of["home","away"])for(let P=0;P<v[A].fg;P++)Zn(p,.176)&&m[A]++;const y=oe(Math.round(10.8+.9*p.normal()),9,13),D=Math.max(y,Ro(v.home,o.home.to,v.away,g.home,m.home)+1,Ro(v.away,o.away.to,v.home,g.away,m.away)+1),k=D%2===0?oe(D/2+p.pick([-1,0,0,1]),3,D-3):Zn(p,.5)?(D-1)/2:(D+1)/2,w=Zn(p,.5)?"home":"away",C=[Zn(p,.55),Zn(p,.55)],E=De(w),M=w,F=A=>[C[0]&&E===A,C[1]&&M===A],b={home:Do(v.home,o.home.to,v.away,g.home,m.home,D,k,p,F("home")),away:Do(v.away,o.away.to,v.home,g.away,m.away,D,k,p,F("away"))},J=[],I={home:0,away:0};for(let A=0;A<2;A++){const P=A===0?k:D-k,j=A===0?w:De(w);for(let O=0;O<P;O++)for(const en of[j,De(j)])J.push({side:en,idx:I[en]++,half:A})}const K=J.map(A=>{const P=G(b[A.side],A.idx);return{side:A.side,period:1,start:0,secs:0,plays:0,rush:0,pass:0,sacks:0,end:P.end,pts:P.end==="TD"?6+Pu(P.conv):P.end==="FG"?3:0,...P.conv!==void 0?{conv:P.conv}:{},oppPts:P.end==="SAFETY"?2:P.defTD?7:0,defTD:!!P.defTD}}),U=new Map;{const A={home:0,away:0};K.forEach((P,j)=>{U.set(P,Gu(A[P.side]-A[De(P.side)],1+Math.floor(j/K.length*4))),A[P.side]+=P.pts,A[De(P.side)]+=P.oppPts})}for(const A of["home","away"]){const P=K.map((cn,gn)=>[cn,gn]).filter(([cn])=>cn.side===A).map(([cn])=>cn),j=P.map(cn=>_t[cn.end]*Math.exp(.5*p.normal())*U.get(cn)),O=P.map(cn=>_t[cn.end]*Math.exp(.5*p.normal())/U.get(cn)),en=xa(o[A].rush,j),un=xa(o[A].pass,O);P.forEach((cn,gn)=>{cn.rush=G(en,gn),cn.pass=G(un,gn)}),P.forEach(cn=>{cn.plays=oe(Math.max(wo[cn.end],Math.round((cn.rush+cn.pass)/5.15+.9*p.normal())),1,22)});for(let cn=0;cn<o[A].sacks;cn++){const gn=bi(p,P.map(on=>on.plays)),an=G(P,gn);an.sacks>=an.plays-1&&an.plays++,an.sacks++}}let x=0;for(let A=0;A<2;A++){const P=K.filter((O,en)=>G(J,en).half===A),j=xa(1800,P.map(O=>O.plays*26*Math.exp(.28*p.normal())+(O.end==="HALF"?10:0)));P.forEach((O,en)=>{O.start=x,O.secs=G(j,en),O.period=Math.min(4,Math.floor(x/900)+1),x+=G(j,en)})}let $=d,sn=h,X=null,V=0;if(d===h){const A=a.fork("overtime"),P=Zn(A,.5)?"home":"away",j={home:0,away:0},O=s.otLimit??(s.playoff?900:600);let en=5,un=0;const cn={home:n,away:e},gn=(Tn,kn,ve)=>{const Nn=cn[Tn].structPts/tt,Hn=A.next(),te=oe(.27*Nn,.1,.5),fe=oe(.2*Math.sqrt(Nn),.08,.3),me=oe(.11/Math.sqrt(Nn),.05,.2);let Un="PUNT";Hn<te?Un="TD":Hn<te+fe?Un=Zn(A,.87)?"FG":"FG_MISS":Hn<te+fe+me?Un=Zn(A,.65)?"INT":"FUM":Hn<te+fe+me+.03&&(Un="DOWNS");const je=(Un==="INT"||Un==="FUM")&&Zn(A,.1);let ge=oe(Math.round(150+50*A.normal()),30,330);ge=Math.min(ge,kn);const ee=Math.max(1,Math.round(_t[Un]*Math.exp(.4*A.normal()))),we=Math.round(ee*oe(.4+.1*A.normal(),.15,.7)),na=ee-we;let Kn=0,qn;if(Un==="TD"){const re=ve(6);qn=re?"none":"xp",Kn=re?6:7}else Un==="FG"&&(Kn=3);return{side:Tn,period:en,start:3600+V,secs:ge,plays:Math.max(wo[Un],Math.round(ee/5.3)),rush:we,pass:na,sacks:0,end:Un,pts:Kn,...qn!==void 0?{conv:qn}:{},oppPts:je?7:0,defTD:je}},an=Tn=>{K.push(Tn),V+=Tn.secs,un+=Tn.secs,j[Tn.side]+=Tn.pts,j[De(Tn.side)]+=Tn.oppPts};let on=!1;const Cn=gn(P,Math.min(330,O),()=>!1);if(an(Cn),Cn.oppPts>0&&(on=!0),!on){const Tn=j[P],kn=gn(De(P),Math.max(30,O-un),ve=>ve>Tn-j[De(P)]);an(kn),(kn.oppPts>0||j.home!==j.away)&&(on=!0)}let An=P;for(;!on;){const Tn=O-un;if(Tn<=0){if(s.playoff){en++,un=0;continue}break}const kn=gn(An,Tn,()=>!0);kn.secs>=Tn&&kn.pts===0&&kn.oppPts===0&&(kn.end="HALF"),an(kn),(kn.pts>0||kn.oppPts>0)&&(on=!0),An=De(An)}$+=j.home,sn+=j.away,X={first:P,periods:en-4,tie:$===sn}}const q=[];K.forEach((A,P)=>{A.pts>0&&q.push({side:A.side,kind:A.end==="TD"?"TD":"FG",pts:A.pts,...A.conv!==void 0?{conv:A.conv}:{},drive:P,period:A.period,at:A.start+A.secs}),A.oppPts>0&&q.push({side:De(A.side),kind:A.defTD?"DEF_TD":"SAFETY",pts:A.oppPts,drive:P,period:A.period,at:A.start+A.secs})});const N=()=>({rush:0,pass:0,yards:0,plays:0,giveaways:0,takeaways:0,sacksTaken:0,drives:0,top:0,fgMade:0,fgMissed:0}),Y={home:N(),away:N()};for(const A of K){const P=Y[A.side];P.rush+=A.rush,P.pass+=A.pass,P.yards+=A.rush+A.pass,P.plays+=A.plays,P.sacksTaken+=A.sacks,P.drives++,P.top+=A.secs,A.end==="FG"&&P.fgMade++,A.end==="FG_MISS"&&P.fgMissed++,(A.end==="INT"||A.end==="FUM")&&(P.giveaways++,Y[De(A.side)].takeaways++)}const Z={home:o.home,away:o.away};return{homeScore:$,awayScore:sn,regHome:d,regAway:h,drives:K,events:q,stats:Y,agg:Z,ot:X,otSecs:V}}function bo(n,e,a){return H0((n.structPts-e.structPts+a)/Math.sqrt(n.sd*n.sd+e.sd*e.sd))}function Eo(n,e){let a=n[0],s=-1/0;for(const t of n){const r=e(t);r>s&&(s=r,a=t)}return{o:a,v:s}}function or(n,e){const a={off:rt,def:ot};let s=rt,t=ot;const r=v=>bo(He(n,e,e,{off:v,def:a.def}),He(e,n,e,{off:a.off,def:t}),0),o=v=>bo(He(n,e,e,{off:s,def:a.def}),He(e,n,e,{off:a.off,def:v}),0);for(let v=0;v<2;v++)s=Eo(hi,r).o,t=Eo(vi,o).o;const l=n.rb-e.rb,i=n.olRun-e.olRun,c=n.qb-e.qb,u=n.rec-e.rec,d=n.olPass-e.olPass,h=.35*l+.65*i-(.45*c+.3*u+.25*d),p=n.frontRun-e.frontRun-(.5*(n.coverage-e.coverage)+.5*(n.passRush-e.passRush));return{off:s,def:t,tilt:h,tiltD:p}}const Nu=[[["East","North"],["South","West"]],[["East","South"],["North","West"]],[["East","West"],["North","South"]]];function Iu(n,e){const a=c=>{const u=e[c];if(u===void 0)throw new Error(`schedule: no rank for ${c}`);return u},s=(c,u)=>ka(c,u).slice().sort((d,h)=>a(d)-a(h));for(const c of["AFC","NFC"])for(const u of Ge)if(ka(c,u).map(h=>e[h]).sort().join()!=="1,2,3,4")throw new Error(`schedule: ranks in ${c} ${u} must be 1-4 once each`);const t=[];for(const c of["AFC","NFC"])for(const u of Ge){const d=s(c,u);for(let h=0;h<4;h++)for(let p=h+1;p<4;p++)t.push({home:G(d,h),away:G(d,p),kind:"div"}),t.push({home:G(d,p),away:G(d,h),kind:"div"})}const r=G(Nu,(n%3+3)%3);for(const c of["AFC","NFC"])for(const[u,d]of r){const h=s(c,u),p=s(c,d);for(let v=0;v<4;v++)for(let g=0;g<4;g++)t.push((v+g+n)%2===0?{home:G(h,v),away:G(p,g),kind:"conf4"}:{home:G(p,g),away:G(h,v),kind:"conf4"})}const o=c=>(c+n)%4,l=c=>(c+n+1+Math.floor(n/4)%3)%4;Ge.forEach((c,u)=>{const d=s("AFC",c),h=s("NFC",G(Ge,o(u)));for(let p=0;p<4;p++)for(let v=0;v<4;v++)t.push((p+v+n)%2===0?{home:G(d,p),away:G(h,v),kind:"inter4"}:{home:G(h,v),away:G(d,p),kind:"inter4"})});for(const c of["AFC","NFC"]){const[[u,d],[h,p]]=r,v=[[u,h],[h,d],[d,p],[p,u]];for(const[g,m]of v){const y=s(c,g),D=s(c,m);for(let k=0;k<4;k++)t.push(n%2===0?{home:G(y,k),away:G(D,k),kind:"conf2"}:{home:G(D,k),away:G(y,k),kind:"conf2"})}}const i=n%2===0;return Ge.forEach((c,u)=>{const d=s("AFC",c),h=s("NFC",G(Ge,l(u)));for(let p=0;p<4;p++)t.push(i?{home:G(h,p),away:G(d,p),kind:"inter1"}:{home:G(d,p),away:G(h,p),kind:"inter1"})}),t}const Hu=[5,6,7,8,9,10,11,12,13,14],Ku=[4,4,4,4,4,4,2,2,2,2];function xu(n,e,a,s=400){const t=Iu(e,a),r=[...new Set(t.map(o=>o.home))];for(let o=0;o<s;o++){const l=Ou(t,r,n);if(l)return l}throw new Error("schedule: no weekly assignment found")}function js(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=G(e,a);e[a]=G(e,s),e[s]=t}return e}function Ou(n,e,a){const s=new Array(n.length).fill(0),t=new Map;n.forEach((i,c)=>{if(i.kind==="div"){const u=[i.home,i.away].sort().join("|");(t.get(u)??t.set(u,[]).get(u)).push(c)}});for(const i of["AFC","NFC"])for(const c of Ge){const u=js(a,ka(i,c));for(const[d,h]of[[G(u,0),G(u,1)],[G(u,2),G(u,3)]]){const p=t.get([d,h].sort().join("|"));s[G(p,a.int(0,1))]=18}}const r=new Map,o=[];Hu.forEach((i,c)=>{for(let u=0;u<G(Ku,c);u++)o.push(i)}),js(a,o),js(a,e.slice()).forEach((i,c)=>r.set(i,G(o,c)));const l=new Set(n.map((i,c)=>c).filter(i=>s[i]===0));for(let i=1;i<=17;i++){const c=e.filter(d=>r.get(d)!==i),u=Vu(n,l,c,a);if(!u)return null;for(const d of u)s[d]=i,l.delete(d)}return l.size?null:n.map((i,c)=>({...i,week:G(s,c)}))}function Vu(n,e,a,s){const t=new Set(a),r=new Map;for(const u of a)r.set(u,[]);for(const u of e){const d=G(n,u);t.has(d.home)&&t.has(d.away)&&(r.get(d.home).push(u),r.get(d.away).push(u))}const o=new Set,l=[];let i=0;const c=()=>{if(++i>4e3)return!1;let u=null,d=1e9;for(const p of a)if(!o.has(p)){const v=r.get(p).filter(g=>!o.has(G(n,g).home)&&!o.has(G(n,g).away)).length;v<d&&(d=v,u=p)}if(u===null)return!0;if(d===0)return!1;const h=js(s,r.get(u).filter(p=>!o.has(G(n,p).home)&&!o.has(G(n,p).away)));for(const p of h){const{home:v,away:g}=G(n,p);if(o.add(v),o.add(g),l.push(p),c())return!0;o.delete(v),o.delete(g),l.pop()}return!1};return c()?l.slice():null}function Ai(n,e,a){const s=n+e+a;return s===0?0:(n+.5*a)/s}let Yu=class{rows=new Map;constructor(e){for(const a of yn)this.rows.set(a.name,[]);for(const a of e)this.rows.get(a.home).push({opp:a.away,pf:a.hs,pa:a.as,tdf:a.htd,tda:a.atd}),this.rows.get(a.away).push({opp:a.home,pf:a.as,pa:a.hs,tdf:a.atd,tda:a.htd})}rec(e,a=()=>!0){let s=0,t=0,r=0;for(const o of this.rows.get(e))a(o)&&(o.pf>o.pa?s++:o.pf<o.pa?t++:r++);return{w:s,l:t,t:r,n:s+t+r}}pct(e,a){const s=this.rec(e,a);return Ai(s.w,s.l,s.t)}overall(e){return this.pct(e)}net(e,a=()=>!0){let s=0;for(const t of this.rows.get(e))a(t)&&(s+=t.pf-t.pa);return s}netTD(e){let a=0;for(const s of this.rows.get(e))a+=s.tdf-s.tda;return a}sov(e){return this.oppPct(e,a=>a.pf>a.pa)}sos(e){return this.oppPct(e,()=>!0)}oppPct(e,a){let s=0,t=0;for(const r of this.rows.get(e))if(a(r)){const o=this.rec(r.opp);s+=o.w+.5*o.t,t+=o.n}return t===0?0:s/t}total(e,a){let s=0;for(const t of this.rows.get(e))s+=t[a];return s}};const Ae=n=>ds(Ct,n),zu=(n,e)=>Ae(n).conf===Ae(e).conf&&Ae(n).div===Ae(e).div,Lo=(n,e)=>Ae(n).conf===Ae(e).conf;function Ao(n,e,a){const s=n.total(e,"pf"),t=n.total(e,"pa");return 1+a.filter(r=>n.total(r,"pf")>s).length+1+a.filter(r=>n.total(r,"pa")<t).length}const Mi=1e-12;function de(n,e){const a=n.map(e),s=Math.max(...a),t=n.filter((r,o)=>G(a,o)>s-Mi);return t.length===n.length?null:t}function Qu(n,e){const a=g=>{if(n==="division")return de(g,m=>{let y=0,D=0,k=0;for(const w of g)if(w!==m){const C=e.rec(m,E=>E.opp===w);y+=C.w,D+=C.l,k+=C.t}return Ai(y,D,k)});if(g.length===2)return de(g,m=>e.pct(m,y=>y.opp===g.find(D=>D!==m)));for(const m of g)if(g.filter(D=>D!==m).every(D=>{const k=e.rec(m,w=>w.opp===D);return k.n>0&&k.w===k.n}))return[m];for(const m of g)if(g.filter(D=>D!==m).every(D=>{const k=e.rec(m,w=>w.opp===D);return k.n>0&&k.l===k.n}))return g.filter(D=>D!==m);return null},s=g=>de(g,m=>e.pct(m,y=>zu(m,y.opp))),t=g=>de(g,m=>e.pct(m,y=>Lo(m,y.opp))),r=g=>m=>{const y=m.map(w=>new Set(e.rows.get(w).map(C=>C.opp))),D=[...G(y,0)].filter(w=>!m.includes(w)&&y.every(C=>C.has(w))),k=w=>D.includes(w.opp);return!D.length||m.some(w=>e.rec(w,k).n<g)?null:de(m,w=>e.pct(w,k))},o=g=>de(g,m=>e.sov(m)),l=g=>de(g,m=>e.sos(m)),i=g=>yn.filter(m=>m.conf===Ae(G(g,0)).conf).map(m=>m.name),c=g=>{const m=i(g);return de(g,y=>-Ao(e,y,m))},u=g=>{const m=yn.map(y=>y.name);return de(g,y=>-Ao(e,y,m))},d=g=>{const m=g.map(D=>new Set(e.rows.get(D).map(k=>k.opp))),y=[...G(m,0)].filter(D=>!g.includes(D)&&m.every(k=>k.has(D)));return y.length?de(g,D=>e.net(D,k=>y.includes(k.opp))):null},h=g=>de(g,m=>e.net(m,y=>Lo(m,y.opp))),p=g=>de(g,m=>e.net(m)),v=g=>de(g,m=>e.netTD(m));return n==="division"?[a,s,r(0),t,o,l,c,u,d,p,v]:[a,t,r(4),o,l,c,u,h,p,v]}function Ji(n,e,a,s){const t=Qu(e,a);let r=n.slice();n:for(;r.length>1;){for(const i of t){const c=i(r);if(c&&c.length<r.length&&c.length>0){r=c;continue n}}const o=r.slice().sort(),l=s.fork("coin:"+o.join("|")).next();return G(o,Math.floor(l*o.length))}return G(r,0)}function _i(n,e,a,s){const t=[];let r=n.slice();for(;r.length>1;){const o=Ji(r,e,a,s);t.push(o),r=r.filter(l=>l!==o)}return t.concat(r)}function Mo(n,e,a){const s=[];let t=n.slice();for(;t.length;){const r=[];for(const l of new Set(t.map(i=>Ae(i).conf+Ae(i).div))){const i=t.filter(c=>Ae(c).conf+Ae(c).div===l);r.push(i.length>1?G(_i(i,"division",e,a),0):G(i,0))}const o=r.length===1?G(r,0):Ji(r,"wildcard",e,a);s.push(o),t=t.filter(l=>l!==o)}return s}function Ft(n,e){const a=n.slice().sort((t,r)=>e.overall(r)-e.overall(t)),s=[];for(const t of a){const r=s[s.length-1];r&&Math.abs(e.overall(G(r,0))-e.overall(t))<Mi?r.push(t):s.push([t])}return s}function Fi(n,e){const a=new Yu(n),s={},t={},r={AFC:[],NFC:[]},o={AFC:[],NFC:[]};for(const l of["AFC","NFC"]){for(const d of Ge){const h=Ft(ka(l,d),a).flatMap(p=>p.length>1?_i(p,"division",a,e):p);s[`${l} ${d}`]=h,h.forEach((p,v)=>t[p]=v+1),o[l].push(G(h,0))}const i=Ft(o[l],a).flatMap(d=>d.length>1?Mo(d,a,e):d),c=yn.filter(d=>d.conf===l&&!o[l].includes(d.name)).map(d=>d.name),u=Ft(c,a).flatMap(d=>d.length>1?Mo(d,a,e):d).slice(0,3);r[l]=[...i,...u]}return{seeds:r,divisionOrder:s,divisionRank:t,divisionWinners:o}}function ju(n){const e=Object.fromEntries(n.map(s=>[s.name,s.ratings])),a={};for(const s of["AFC","NFC"])for(const t of Ge)ka(s,t).sort((r,o)=>ds(e,o).off+ds(e,o).def-ds(e,r).off-ds(e,r).def).forEach((r,o)=>a[r]=o+1);return a}function Jo(n,e){return n.events.filter(a=>a.side===e&&(a.kind==="TD"||a.kind==="DEF_TD")).length}const _r=18,Us=["Wild Card","Divisional","Conference","Super Bowl"],Uu=n=>n.year+n.run,yt=n=>n.nextWeek>22,Fr=n=>n>=19&&n<=22?Us[n-19]??null:null;function qu(n,e){Gi(n);const a=e.run??0,s=e.prevRank??ju(n),t=xu(Ye(e.seed).fork("schedule"),e.year+a,s).sort((r,o)=>r.week-o.week);return{seed:e.seed,year:e.year,run:a,prevRank:s,homeField:e.homeField,schedule:t,nextWeek:1,scores:[],playoffs:[],seeding:null,champion:null}}const Zu=(n,e,a)=>e?`po:${e}:${a}`:`w${n}:${a}`,Tt=(n,e,a)=>hu(n,Zu(e,Fr(e),a));function Wi(n){if(yt(n))return[];const e=n.nextWeek,a=Fr(e),s=a?$u(n,a):n.schedule.filter(r=>r.week===e).map(r=>[r.home,r.away]),t=a==="Super Bowl"?0:n.homeField;return s.map(([r,o])=>({week:e,round:a,home:r,away:o,seed:Tt(n.seed,e,r),...t!==void 0?{homeField:t}:{}}))}function Xu(n,e){if(Gi(n),yt(e))throw new Error("season: already finished");const a=new Map(n.map(u=>[u.name,u.ratings])),s=Lr(n.map(u=>u.ratings)),t=new Map;for(const u of n){const d=or(u.ratings,s);t.set(u.name,{off:d.off,def:d.def})}const r=Wi(e),o=Fr(e.nextWeek),l=r.map(u=>{const d=a.get(u.home),h=a.get(u.away),p=He(d,h,s,{off:t.get(u.home).off,def:t.get(u.away).def}),v=He(h,d,s,{off:t.get(u.away).off,def:t.get(u.home).def});return{home:u.home,away:u.away,round:o,result:Li(p,v,Ye(u.seed),{playoff:o!==null,...u.homeField!==void 0?{homeField:u.homeField}:{}})}}),i=l.map(u=>({week:e.nextWeek,home:u.home,away:u.away,hs:u.result.homeScore,as:u.result.awayScore,htd:Jo(u.result,"home"),atd:Jo(u.result,"away"),...u.round?{round:u.round}:{}})),c={...e,scores:o?e.scores:[...e.scores,...i],playoffs:o?[...e.playoffs,...i]:e.playoffs,nextWeek:e.nextWeek+1};return e.nextWeek===_r&&(c.seeding=Fi(c.scores,Ye(e.seed).fork("seeding"))),o==="Super Bowl"&&(c.champion=Pi(G(i,0))),{state:c,games:l}}function bs(n){const e=Object.fromEntries(yn.map(s=>[s.name,{w:0,l:0,t:0,pf:0,pa:0}])),a=s=>{const t=e[s];if(!t)throw new Error("season: unknown team "+s);return t};for(const s of n.scores){const t=a(s.home),r=a(s.away);t.pf+=s.hs,t.pa+=s.as,r.pf+=s.as,r.pa+=s.hs,s.hs>s.as?(t.w++,r.l++):s.hs<s.as?(r.w++,t.l++):(t.t++,r.t++)}return e}const Pi=n=>n.hs>n.as?n.home:n.away;function $u(n,e){const a=n.seeding;if(!a)throw new Error("season: playoffs before the regular season is done");const s=(r,o)=>n.playoffs.filter(l=>l.round===r&&Ct[l.home]?.conf===o).map(Pi);if(e==="Super Bowl"){const r=l=>G(s("Conference",l),0);return[Uu(n)%2===1?[r("AFC"),r("NFC")]:[r("NFC"),r("AFC")]]}const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r],l=i=>o.indexOf(i)+1;if(e==="Wild Card")for(const[i,c]of[[2,7],[3,6],[4,5]])t.push([G(o,i-1),G(o,c-1)]);else if(e==="Divisional"){const i=[G(o,0),...s("Wild Card",r)].sort((c,u)=>l(c)-l(u));t.push([G(i,0),G(i,i.length-1)],[G(i,1),G(i,2)])}else{const i=s("Divisional",r).sort((c,u)=>l(c)-l(u));t.push([G(i,0),G(i,1)])}}return t}function Gi(n){if(n.length!==32)throw new Error("season: 32 teams needed");const e=new Set(n.map(a=>a.name));for(const a of yn)if(!e.has(a.name))throw new Error("season: missing team "+a.name)}const Ni=["att","cmp","pyd","ptd","ints","sacked","car","ryd","rtd","fumLost","tgt","rec","recYd","recTd","twoPt","tkl","tfl","sack","press","pd","intDef","intDefYd","ff","fr","defTd","safeties","fgm","fga","xpm","xpa","punts","puntYd","kr","krYd","pr","prYd"],Wr=()=>Object.fromEntries(Ni.map(n=>[n,0])),nd=n=>n==="home"?"away":"home",Ga=(n,e,a)=>Math.min(a,Math.max(e,n)),ed=["OT1","OT2","OG1","OG2","C"],_o=(n,e,a,s)=>Math.exp(e*(n.ovr-80)+a*(n.p.spd-80)+s*(n.p.str-80));function ad(n,e){switch(e){case"DE1":case"DE2":return"DE";case"DT1":return"DT";case"DT2":return n==="3-4"?"ILB":"DT";case"DL5":return"DL5";case"MIKE":return"ILB";case"WILL":case"SAM":return n==="3-4"?"OLB34":"LB";case"CB1":case"CB2":return"CB";case"CB3":case"DIME":return"NB";case"FS":return"FS";case"SS":return"SS";default:return null}}const sd={run:{DE:.075,DT:.08,DL5:.03,ILB:.17,LB:.11,OLB34:.09,CB:.035,NB:.02,FS:.06,SS:.11},pass:{DE:.02,DT:.015,DL5:.005,ILB:.09,LB:.08,OLB34:.07,CB:.12,NB:.09,FS:.13,SS:.12},sack:{DE:.3,DT:.15,DL5:.05,ILB:.03,LB:.05,OLB34:.3,CB:.01,NB:.015,FS:.005,SS:.01},press:{DE:.26,DT:.18,DL5:.05,ILB:.04,LB:.06,OLB34:.24,CB:.015,NB:.02,FS:.01,SS:.015},int:{DE:.005,DT:.003,DL5:.001,ILB:.05,LB:.055,OLB34:.045,CB:.17,NB:.12,FS:.2,SS:.13},pd:{DE:.01,DT:.005,DL5:0,ILB:.04,LB:.045,OLB34:.035,CB:.26,NB:.14,FS:.12,SS:.1}},td={RB1:.6,RB2:.18,FB:.04,QB:.07,WR1:.01,WR2:.01,WR3:.01},rd={RB1:.55,RB2:.15,FB:.08,QB:.12,WR1:.01,WR2:.01},od={WR1:.21,WR2:.18,WR3:.12,WR4:.02,TE1:.16,TE2:.05,TE3:.01,RB1:.1,RB2:.04,FB:.01},ld={WR1:.22,WR2:.17,WR3:.11,WR4:.01,TE1:.22,TE2:.08,TE3:.01,RB1:.06,RB2:.03,FB:.02},id={WR1:1,WR2:1,WR3:1,WR4:1,TE1:.8,TE2:.8,TE3:.8,RB1:.6,RB2:.6,FB:.5};function cd(n,e,a,s){const t={id:`ghost|${s}|${n}`,name:`Backup ${s}`,pos:s,role:s,team:n,ovr:70,spd:70,str:70,freeAgent:!1};return{line:{id:t.id,name:t.name,team:n,side:e,slot:a,label:a,stats:Wr()},p:t,ovr:70,slot:a,kind:""}}function Fo(n,e){const a=[];for(const v of n.lineup.placements){if(!v.player||ed.includes(v.slot.slot))continue;const g=ad(n.lineup.base,v.slot.slot)??"";a.push({line:{id:v.player.id,name:v.player.name,team:n.team,side:e,slot:v.slot.slot,label:v.slot.label,stats:Wr()},p:v.player,ovr:v.effOvr,slot:v.slot.slot,kind:g})}const s=(v,g)=>{const m=a.find(D=>D.slot===v);if(m)return m;const y=cd(n.team,e,v,g);return a.push(y),y},t=s("QB","QB"),r=s("K","K"),o=s("P","P"),l=(v,g)=>a.filter(m=>v[m.slot]!==void 0).map(m=>[m,v[m.slot]*_o(m,g,0,0)]),i=(v,g)=>{const m=l(v,g);return m.length?m:[[t,1]]},c=(v,g,m,y)=>a.filter(D=>D.kind).map(D=>[D,sd[v][D.kind]*_o(D,g,m,y)]).filter(D=>D[1]>0),u=c("run",.02,.003,.005),d=c("pass",.02,.004,.002),h=(v,g)=>v.map(([m,y],D)=>[m,(y+G(g,D)[1])/2]),p=Di(n.lineup,n.returnerId);return{side:e,team:n.team,qb:t,k:r,pt:o,returner:p?a.find(v=>v.p.id===p.player.id)??null:null,retValue:p?.value??82,carry:i(td,.02),carryRz:i(rd,.02),target:i(od,.02),targetRz:i(ld,.02),runTkl:u,passTkl:d,sack:c("sack",.035,.01,.006),press:c("press",.03,.008,.005),ints:c("int",.03,.008,0),pd:c("pd",.03,.008,0),ff:u.map(([v,g])=>[v,g*Math.exp(.008*(v.p.str-80))]),fr:h(u,d),all:a}}function ae(n,e){let a=0;for(const t of e)a+=t[1];let s=n.next()*a;for(const[t,r]of e)if(s-=r,s<0)return t;return G(e,e.length-1)[0]}const $n=n=>({id:n.p.id,name:n.p.name,team:n.line.team,label:n.line.label}),fd=n=>Math.exp(.012*(n.p.spd-80)+.004*(n.p.str-80)),ud=.645;function dd(n,e,a,s,t){const r=n.end==="FG"||n.end==="FG_MISS"||n.end==="PUNT";let o=Math.max(0,n.plays-n.sacks-(r?1:0));o===0&&n.rush+n.pass>0&&(o=1);let l=!1;n.end==="TD"&&(l=n.pass>0&&(n.rush===0||t.next()<.28+.55*n.pass/(n.pass+n.rush)),o===0&&(o=1));const i=o?xa(o,[n.rush/4.3+.15,n.pass/6.6+.15]):[0,0];let c=G(i,0),u=G(i,1);const d=n.end==="INT"?1:0,h=n.pass>0||l?1:0;(n.rush>0||n.end==="TD"&&!l)&&(c=Math.max(c,1)),u=Math.max(u,h+d);const p=u-d,v=Ga(ud+.0035*(a.qb.ovr-80),.5,.78);let g=0;if(h){for(let b=0;b<p;b++)t.next()<v&&g++;g=Math.max(g,1)}const m=[];for(let b=0;b<c;b++)m.push(ae(t,a.carry));let y=null;n.end==="TD"&&!l&&(y=ae(t,a.carryRz),m[c-1]=y);const D=c?xa(n.rush,m.map(b=>Math.exp(.6*t.normal())*fd(b))):[],k=(b,J)=>{if(G(b,J)>=1)return;let I=-1;for(let K=0;K<b.length;K++)K!==J&&G(b,K)>1&&(I<0||G(b,K)>G(b,I))&&(I=K);I>=0&&(b[I]=G(b,I)-1,b[J]=G(b,J)+1)};y&&k(D,c-1),m.forEach((b,J)=>{b.line.stats.car++,b.line.stats.ryd+=G(D,J)}),y&&y.line.stats.rtd++;const w=[];for(let b=0;b<g;b++)w.push(ae(t,a.target));let C=null;l&&(C=ae(t,a.targetRz),w[g-1]=C);const E=g?xa(n.pass,w.map(b=>Math.exp(.55*t.normal())*(id[b.slot]??.7)*Math.exp(.012*(b.p.spd-80)))):[];C&&k(E,g-1),w.forEach((b,J)=>{b.line.stats.tgt++,b.line.stats.rec++,b.line.stats.recYd+=G(E,J)}),C&&C.line.stats.recTd++;for(let b=0;b<u-g;b++){const J=ae(t,a.target);J.line.stats.tgt++}const M=a.qb.line.stats;M.att+=u,M.cmp+=g,M.pyd+=n.pass,M.sacked+=n.sacks,l&&M.ptd++,M.ints+=d,m.forEach((b,J)=>{if(b===y&&J===c-1)return;const I=ae(t,s.runTkl);I.line.stats.tkl++,t.next()<(G(D,J)<=1?.2:G(D,J)<=3?.06:0)&&I.line.stats.tfl++}),w.forEach((b,J)=>{b===C&&J===g-1||ae(t,s.passTkl).line.stats.tkl++});for(let b=0;b<n.sacks;b++){const J=ae(t,s.sack).line.stats;J.sack++,J.press++,J.tkl++,J.tfl++}for(let b=0;b<u;b++)t.next()<.17&&ae(t,s.press).line.stats.press++;for(let b=0;b<u-g-d;b++)t.next()<.45&&ae(t,s.pd).line.stats.pd++;const F={drive:e,side:n.side,period:n.period,kind:n.end==="TD"?l?"PASS_TD":"RUSH_TD":n.end==="FG"?"FG":n.end==="FG_MISS"?"FG_MISS":n.end==="INT"?"INT":n.end==="FUM"?"FUM":n.end==="SAFETY"?"SAFETY":n.end==="PUNT"?"PUNT":n.end==="DOWNS"?"DOWNS":"HALF"};if(n.end==="TD"){const b=l?C:y;F.scorer=$n(b),F.tdYards=l?G(E,g-1):G(D,c-1),l&&(F.passer=$n(a.qb));const J=a.k.line.stats;if(n.conv!==void 0&&(F.conv=n.conv),n.conv==="xp")J.xpa++,J.xpm++,F.convKicker=$n(a.k);else if(n.conv==="xp_miss")J.xpa++,F.convKicker=$n(a.k);else if(n.conv==="two"||n.conv==="two_fail"){const I=t.next()<.55,K=ae(t,I?a.targetRz:a.carryRz);F.convBy=$n(K),I&&(F.convPasser=$n(a.qb)),n.conv==="two"&&K.line.stats.twoPt++}}if(n.end==="FG"&&(a.k.line.stats.fga++,a.k.line.stats.fgm++,F.kicker=$n(a.k),F.kickYards=Ga(Math.round(35+8*t.normal()),19,63)),n.end==="FG_MISS"&&(a.k.line.stats.fga++,F.kicker=$n(a.k),F.kickYards=Ga(Math.round(46+7*t.normal()),30,66)),n.end==="PUNT"){a.pt.line.stats.punts++;const b=Ga(Math.round(45+5.5*t.normal()),28,66);a.pt.line.stats.puntYd+=b,F.kicker=$n(a.pt),F.kickYards=b}if(n.end==="INT"){const b=ae(t,s.ints);b.line.stats.intDef++;const J=n.defTD?t.int(15,85):Math.max(0,Math.round(10+9*t.normal()));b.line.stats.intDefYd+=J,n.defTD&&b.line.stats.defTd++,F.giver=$n(a.qb),F.taker=$n(b),F.retYards=J,F.defTD=n.defTD}if(n.end==="FUM"){const b=[...m,...w],J=b.length?G(b,t.int(0,b.length-1)):a.qb;J.line.stats.fumLost++;const I=ae(t,s.ff);I.line.stats.ff++;const K=ae(t,s.fr);K.line.stats.fr++;const U=n.defTD?t.int(5,70):t.int(0,12);n.defTD&&K.line.stats.defTd++,F.giver=$n(J),F.forcer=$n(I),F.taker=$n(K),F.retYards=U,F.defTD=n.defTD}if((n.end==="INT"||n.end==="FUM")&&n.defTD&&(s.k.line.stats.xpa++,s.k.line.stats.xpm++,F.defKicker=$n(s.k)),n.end==="SAFETY"){const b=ae(t,s.sack);b.line.stats.safeties++,F.taker=$n(b)}return F}function pd(n,e,a){const s=n.drives;for(let t=0;t<s.length;t++){const r=G(s,t),o=r.side,l=e[o];if(!l.returner)continue;const i=t>0?G(s,t-1):null,c=!i||r.start>=1800&&i.start<1800||r.period>=5&&i.period<5||i.pts>0||i.oppPts>0,u=i&&i.side!==o,d=l.returner.line.stats;c&&a.next()<.45?(d.kr++,d.krYd+=Ga(Math.round(24+.13*(l.retValue-82)+5*a.normal()),10,55)):!c&&u&&i&&i.end==="PUNT"&&a.next()<.36&&(d.pr++,d.prYd+=Ga(Math.round(8.5+.12*(l.retValue-82)+5*a.normal()),0,40))}}function hd(n,e,a,s){const t={home:Fo(e,"home"),away:Fo(a,"away")},r=s.fork("box"),o=n.drives.map((l,i)=>dd(l,i,t[l.side],t[nd(l.side)],r));return pd(n,t,r.fork("returns")),{home:e.team,away:a.team,lines:[...t.home.all,...t.away.all].map(l=>l.line),credits:o}}const vd=new Set(["RB1","RB2","FB","WR1","WR2","WR3","WR4","TE1","TE2","TE3"]);function Wo(n){const e=n.stats;return n.slot==="QB"?.045*e.pyd+5*e.ptd-6*e.ints+.03*e.ryd+4*e.rtd-4*e.fumLost:.07*(e.ryd+e.recYd)+.3*e.rec+6*(e.rtd+e.recTd)+3*e.twoPt-8*e.fumLost}function md(n){const e=n.stats;return 4*e.sack+5*e.intDef+8*e.defTd+3*e.ff+2.5*e.fr+e.pd+.6*e.tfl+.25*e.tkl+.1*(e.press-e.sack)+4*e.safeties}const Ii=n=>n.slot==="QB"||vd.has(n.slot),gd=n=>!Ii(n)&&n.slot!=="K"&&n.slot!=="P",Bd=()=>({players:{}});function Cd(n,e){for(const a of e.lines){const s=n.players[a.id]??={id:a.id,name:a.name,team:a.team,slot:a.slot,label:a.label,games:0,stats:Wr()};s.games++,s.slot=a.slot,s.label=a.label,s.team=a.team;for(const t of Ni)s.stats[t]+=a.stats[t]}}const Hi=["pyd","ptd","ryd","rtd","recYd","rec","recTd","sack","intDef","tkl","ff","fgm","defTd"];function Pr(n,e,a=5){return Object.values(n.players).filter(s=>s.stats[e]>0).sort((s,t)=>t.stats[e]-s.stats[e]||(s.id<t.id?-1:1)).slice(0,a)}const Po=n=>n?n.w+n.t/2:8.5;function yd(n,e,a){const s=Object.values(n.players).sort((h,p)=>h.id<p.id?-1:1),t=(h,p)=>h.reduce((v,g)=>v===null||p(g)>p(v)?g:v,null),r=s.filter(Ii),o=s.filter(gd),l=t(r,h=>Wo(h)*(1+.04*(Po(e[h.team])-9))),i=t(r.filter(h=>h!==l),h=>Wo(h)),c=t(o,h=>md(h));let u=null;for(const h of Object.keys(e).sort()){const p=Po(e[h]),v=a?.[h]??8.5,g=p-v;(!u||g>u.over||g===u.over&&p>u.wins)&&(u={team:h,wins:p,expected:v,over:g})}const d={};for(const h of Hi)d[h]=Pr(n,h,5);return{mvp:l,opoy:i,dpoy:c,coach:u,leaders:d}}function Td(n,e,a){const s=l=>l==="home"?e:a,t=l=>`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`,r=(l,i)=>{if(i>=5)return`OT ${t(Math.max(0,l-3600))}`;const c=Math.min(4,Math.max(1,Math.ceil(l/900)));return`Q${c} ${t(Math.max(0,900*c-l))}`},o=n.drives.map((l,i)=>({kind:"drive",n:i+1,team:s(l.side),period:l.period,clock:r(l.start,l.period),plays:l.plays,yards:null,end:l.end,pts:l.pts,oppPts:l.oppPts,defTD:l.defTD,scores:n.events.filter(c=>c.drive===i+1).map(c=>({team:s(c.side),kind:c.kind,pts:c.pts,conv:c.conv??"none",at:c.at})),summary:Sd(l,s(l.side))}));return{v:1,home:e,away:a,homeScore:n.homeScore,awayScore:n.awayScore,regHome:n.regHome,regAway:n.regAway,ot:n.ot?{first:s(n.ot.first),periods:n.ot.periods,tie:n.ot.tie}:null,drives:o,mvpLine:null}}function Sd(n,e){const a={TD:"ends in a touchdown",FG:"kicks a field goal",FG_MISS:"misses a field goal",PUNT:"punts",INT:"throws an interception",FUM:"loses a fumble",DOWNS:"turns it over on downs",HALF:"runs out the half",SAFETY:"is sacked in the end zone for a safety"},s=Math.max(1,Math.round(n.secs/60)),t=n.oppPts?` ${e} gives up ${n.oppPts} the other way.`:"";return`${e} ${a[n.end]} — ${n.plays} plays, ${s} min.${t}`}const kd=["olRun","olPass","rb","qb","rec","passRush","frontRun","coverage","kicker","rec12","rec13","rec21","rec22","rec11","frontBase","frontNick","covBase","covNick","covDime","te1","te2","rbHeavy","ret","p","qbRunR","wrBlk","passOff","runOff","off","def"];function Ki(n,e){const a=Wi(n).find(s=>s.home===e||s.away===e);return a?a.seed:n.seed}function wd(n,e,a){const s={};for(const o of e)s[o.name]={...o.ratings};const t=o=>({week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd,atd:o.atd,...o.round?{round:o.round}:{}}),r={seed:n.seed,year:n.year,run:n.run,gameSeed:Ki(n,a.userTeam),nextWeek:n.nextWeek,userTeam:a.userTeam,roster:a.roster,ratings:s,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})),scores:[...n.scores.map(t),...n.playoffs.map(t)],plan:a.plan,statsRecorded:a.statsRecorded,prevRank:{...n.prevRank}};return n.homeField!==void 0&&(r.homeField=n.homeField),r}function xi(n){const e=[];for(const o of yn){const l=n.ratings[o.name];if(!l||typeof l!="object")return{ok:!1,message:"week: no ratings for "+o.name};for(const i of kd)if(typeof l[i]!="number"||!Number.isFinite(l[i]))return{ok:!1,message:"week: bad rating "+i+" for "+o.name};e.push({name:o.name,ratings:{...l}})}const a=[],s=[];for(const o of n.scores){const l={week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd??0,atd:o.atd??0,...o.round?{round:o.round}:{}};(o.round?s:a).push(l)}const t={seed:n.seed,year:n.year,run:n.run,prevRank:n.prevRank?{...n.prevRank}:{},homeField:n.homeField,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})).sort((o,l)=>o.week-l.week),nextWeek:n.nextWeek,scores:a,playoffs:s,seeding:null,champion:null};t.nextWeek>_r&&(t.seeding=Fi(a,Ye(n.seed).fork("seeding")));const r=s.find(o=>o.round==="Super Bowl");return r&&(t.champion=r.hs>r.as?r.home:r.away),n.prevRank?t.nextWeek<=22&&Ki(t,n.userTeam)!==n.gameSeed?{ok:!1,message:"week: stored gameSeed does not match the state (changed save?)"}:{ok:!0,value:{state:t,teams:e,context:{userTeam:n.userTeam,roster:n.roster,plan:n.plan,statsRecorded:n.statsRecorded}}}:{ok:!1,message:"week: saved without prevRank (cannot rebuild a run-it-back)"}}const Dd=6,Rd=4,bd=2,Ed=1,Go={"Wild Card":Dd,Divisional:Rd,Conference:bd,"Super Bowl":Ed};function Oi(n){const e=n.payload;if(!Number.isInteger(e.nextWeek)||e.nextWeek<1||e.nextWeek>_r+4)return Qn(`week: nextWeek ${e.nextWeek} outside 1..22`);if(e.scores.find(v=>v.round==="Super Bowl")&&e.nextWeek!==22)return Qn("week: a Super Bowl score exists but nextWeek is not 22 (finished seasons are Season payloads, not week saves)");const s=v=>Us.indexOf(v);for(const v of e.scores){if(v.round&&!Us.includes(v.round))return Qn(`week: unknown playoff round '${v.round}'`);if(v.round&&v.week!==19+s(v.round))return Qn(`week: round '${v.round}' stored under week ${v.week} (expected ${19+s(v.round)})`)}for(const v of e.scores)if(!Number.isInteger(v.htd)||!Number.isInteger(v.atd))return Qn(`week: score ${v.home} vs ${v.away} (week ${v.week}) lacks htd/atd — seeding tiebreaks would silently change`);const t=(v,g,m)=>`${v}|${g}|${m}`,r=new Set(e.schedule.map(v=>t(v.week,v.home,v.away))),o=new Map;for(const v of e.scores){if(!v.round&&!r.has(t(v.week,v.home,v.away)))return Qn(`week: score ${v.away} @ ${v.home} (week ${v.week}) is not on the stored schedule`);const g=t(v.week,v.home,v.away);if(o.has(g))return Qn(`week: fixture ${v.away} @ ${v.home} (week ${v.week}) appears twice in scores`);o.set(g,v)}for(const v of e.schedule)if(!(v.week<e.nextWeek&&!v.week)&&v.week<e.nextWeek&&!o.has(t(v.week,v.home,v.away)))return Qn(`week: scheduled game ${v.away} @ ${v.home} (week ${v.week}) has no score but week ${v.week} < nextWeek ${e.nextWeek}`);const l=new Map;for(const v of e.scores)v.round&&(l.get(v.round)??l.set(v.round,[]).get(v.round)).push(v);let i=new Set;for(const v of Us){const g=l.get(v)??[];if(!g.length)break;if(g.length!==Go[v])return Qn(`week: ${v} has ${g.length} games (expected ${Go[v]})`);if(v!=="Wild Card"){for(const m of g)if(!i.has(m.home)&&!i.has(m.away))return Qn(`week: ${v} game ${m.away} @ ${m.home} has no participant from the previous round's winners`)}if(i=new Set(g.map(m=>m.hs>m.as?m.home:m.away)),i.size!==g.length)return Qn(`week: ${v} has a tie or a repeat winner — playoff games cannot tie`)}const u=l.get("Super Bowl")?.[0];if(u&&u.hs===u.as)return Qn("week: the Super Bowl ended level — impossible in the engine");const d=xi(e);if(!d.ok)return Qn(d.message);const h=d.value,p=new Set(yn.map(v=>v.name));for(const v of[...e.schedule,...e.scores])if(!p.has(v.home)||!p.has(v.away))return Qn(`week: unknown team name in ${v.away} @ ${v.home}`);return{ok:!0,value:h}}function Qn(n){return{ok:!1,code:"corrupt",message:n}}function Ld(n){const e=n.payload,a=e.userResults[e.userResults.length-1];if(!a)return Qn("season: no user results");const s=a.hs>a.as?a.home:a.away;return e.champion===e.userTeam&&e.userOutcome!=="champion"?Qn("season: champion is the user but userOutcome says otherwise"):e.champion!==e.userTeam&&e.userOutcome==="champion"?Qn("season: userOutcome says champion but the stored champion is not the user"):e.champion===e.userTeam&&s!==e.userTeam?Qn("season: stored champion is the user but the last result was a loss"):{ok:!0,value:null}}const Ad={"Wild Card":"wild-card",Divisional:"divisional",Conference:"conference","Super Bowl":"super-bowl-loss"},Md=n=>n.hs>n.as?n.home:n.as>n.hs?n.away:null;function Jd(n,e){const a=Ct[e];if(!a)throw new Error("outcome: unknown team "+e);if(!n.seeding)return null;if(!n.seeding.seeds[a.conf].includes(e))return"missed-playoffs";for(const s of n.playoffs){if(s.home!==e&&s.away!==e)continue;const t=Md(s);if(t!==null){if(t!==e)return Ad[s.round];if(s.round==="Super Bowl")return"champion"}}return null}function _d(n,e=0){let a=3735928559^e,s=1103547991^e;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);a=Math.imul(a^r,2654435761),s=Math.imul(s^r,1597334677)}return a=Math.imul(a^a>>>16,2246822507)^Math.imul(s^s>>>13,3266489909),s=Math.imul(s^s>>>16,2246822507)^Math.imul(a^a>>>13,3266489909),(4294967296*(2097151&s)+(a>>>0)).toString(16).padStart(14,"0")}async function Fd(n){const e=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(e)].map(a=>a.toString(16).padStart(2,"0")).join("")}const Os=n=>({ok:!1,error:n instanceof Error?n.message:String(n)});class Wd{constructor(e,a={}){this.ls=e,this.o=a}ls;o;get storage(){return this.ls}async read(e){try{return{ok:!0,value:this.storage?.getItem(e)??null}}catch(a){return Os(a)}}async write(e,a){try{if(b0(e)&&this.o.slotCheck)try{const s=ai(JSON.parse(a));if(s.ok){const t=this.o.slotCheck(s.value.slot,e);if(t)return{ok:!1,error:t}}}catch{}return this.storage?.setItem(e,a),{ok:!0,value:void 0}}catch(s){return Os(s)}}async remove(e){try{return this.storage?.removeItem(e),{ok:!0,value:void 0}}catch(a){return Os(a)}}async keys(e){try{const a=this.storage;if(!a)return{ok:!0,value:[]};const s=[];for(let t=0;t<a.length;t++){const r=a.key(t);r!==null&&r.startsWith(e)&&s.push(r)}return{ok:!0,value:s.sort()}}catch(a){return Os(a)}}async entries(e){const a=await this.keys(e);if(!a.ok)return a;const s=[];for(const t of a.value){const r=await this.read(t);r.ok&&r.value!==null&&s.push([t,r.value])}return{ok:!0,value:s}}}const Pd=(n={})=>new Wd(typeof localStorage>"u"?null:localStorage,n),Gd="nfl1";function Nd(){const{RATING_SPECS:n,DEF_SPECS:e,PERS_REC:a,RB_HEAVY:s,PERS:t,STRAT:r,DEF_FOCUS:o,PLAN_K:l,MC:i,RUSH_BASE:c,PASS_BASE:u,PT_RUSH:d,PT_PASS:h,PT_TO:p,PT_SACK:v,LAM_TO:g,LAM_SACK:m,BASE_PTS:y,HOME_FIELD:D,PTS_NOISE:k,RET_PTS:w,RET_NEUTRAL:C,QB_RUN_C:E,WR_BLK_C:M,WR_BLK_W:F,PUNT_PTS:b,DIME_W:J,POINTS_PER_WIN:I,GAMES:K}=G0;return JSON.stringify([ke,st,er,Ar,n,e,a,s,t,r,o,l,i,[c,u,d,h,p,v,g,m,y,D,k,w,C,E,M,F,b,J,I,K]])}const ca=()=>Gd+"."+_d(Nd()),Id={"Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB","Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","NY Giants":"NYG","NY Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"},Jn=n=>Id[n]??n.slice(0,3).toUpperCase(),Hd=n=>yn.find(e=>e.name===n),Vi=["Wild Card","Divisional","Conference","Super Bowl"],Za=18;function No(n){return Za+Vi.length}function Kd(n,e){const a=Za;if(e<=a){const l=n.schedule.filter(i=>i.week===e).map(i=>Io(n,i,i.kind,null));return{week:e,label:"WEEK "+e,games:l,done:l.every(i=>i.hs!==null)}}const s=Vi[e-a-1]??null;if(!s)throw new Error(`weekVM: no week slot ${e}`);const r=xd(n,s).map(([o,l])=>Io(n,{week:e,home:o,away:l},"playoff",s));return{week:e,label:s.toUpperCase(),games:r,done:r.every(o=>o.hs!==null)}}function xd(n,e){const a=n.seeding;if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}return n.playoffs.filter(t=>t.round===e).map(t=>[t.home,t.away])}function Io(n,e,a,s){const t=s?n.playoffs.find(o=>o.round===s&&(o.home===e.home||o.away===e.home)):n.scores.find(o=>o.week===e.week&&o.home===e.home&&o.away===e.away),r=Tt(n.seed,e.week,e.home);return{home:e.home,away:e.away,homeAbbr:Jn(e.home),awayAbbr:Jn(e.away),hs:t?t.hs:null,as:t?t.as:null,kind:s?"playoff":a,round:s,replayLabel:s?`po:${s}:${e.home}`:`w${e.week}:${e.home}`,gameSeed:r,me:!1}}function Od(n,e){const s=Math.min(e,Za),t={};for(const c of yn)t[c.name]={w:0,l:0,t:0,pf:0,pa:0};for(const c of n.scores){if(c.week>s)continue;const u=t[c.home],d=t[c.away],h=c.hs,p=c.as;u.pf+=h,u.pa+=p,d.pf+=p,d.pa+=h,h>p?(u.w++,d.l++):p>h?(d.w++,u.l++):(u.t++,d.t++)}const r=c=>{if(!n.seeding)return null;const u=n.seeding.seeds.AFC.indexOf(c),d=n.seeding.seeds.NFC.indexOf(c);return u>=0?u+1:d>=0?d+1:null},o=c=>{const u=Hd(c),d=t[c],h=(d.w+.5*d.t)/Math.max(1,d.w+d.l+d.t);return{team:c,abbr:Jn(c),conf:u.conf,div:u.div,w:d.w,l:d.l,t:d.t,pf:d.pf,pa:d.pa,winPct:h===1?"1.000":h.toFixed(3),seed:r(c)}},l=yn.map(c=>o(c.name)).sort((c,u)=>u.w-c.w||c.pa-u.pa||c.team.localeCompare(u.team)),i=[];for(const c of["AFC","NFC"])for(const u of["East","North","South","West"]){const d=yn.filter(h=>h.conf===c&&h.div===u).map(h=>o(h.name)).sort((h,p)=>p.w-h.w||h.pa-p.pa||h.team.localeCompare(p.team));i.push({conf:c,div:u,rows:d})}return{throughWeek:s,league:l,divisions:i}}function Vd(n,e,a,s){return wd(n,e,{userTeam:a,roster:s,plan:null,statsRecorded:!1})}function Ho(n){const e=yn.map(s=>{const t=n.ratings[s.name];return{name:s.name,ratings:{...t}}}),a=xi(n);return a.ok?{ok:!0,value:{state:a.value.state,teams:e,userTeamName:a.value.context.userTeam,roster:a.value.context.roster}}:{ok:!1,message:a.message}}function Yd(n,e,a){const s=bs(n)??{},t=yn.map(l=>{const i=s[l.name]??{w:0,l:0,t:0,pf:0,pa:0};return{team:l.name,w:i.w,l:i.l,t:i.t,pf:i.pf,pa:i.pa}}),r=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e).map(l=>({week:l.week,home:l.home,away:l.away,hs:l.hs,as:l.as,...l.round?{round:l.round}:{},htd:l.htd,atd:l.atd})),o=n.champion?Jd(n,e)??"missed-playoffs":"missed-playoffs";return{seed:n.seed,year:n.year,run:n.run,userTeam:e,roster:a,table:t,userResults:r,champion:n.champion??"",userOutcome:o,statsRecorded:!1}}let wn=null,Ea=null,La="",Vs=[],Re=1;const lr=new Set,Ys=()=>{for(const n of lr)n()},Mn={get ready(){return wn!==null},get slot(){return Re},get total(){return wn?No():Za+4},get view(){return wn?Kd(wn,Re):null},get standings(){return wn?Od(wn,Re):null},get finished(){return wn?yt(wn):!1},get champion(){return wn?.champion??null},get userTeamName(){return La},get label(){return this.view?.label??""},get atLastPlayed(){return wn?Re===wn.nextWeek-1:!1},get runState(){return wn},get userRoster(){return Vs},subscribe(n){return lr.add(n),()=>lr.delete(n)},begin(n,e,a,s,t){Ea=n,La=s,Vs=t,wn=qu(n,{seed:e,year:a}),Re=1,Ys()},resume(n,e,a,s){Ea=e,La=a,Vs=s,wn=n,Re=Math.max(1,Math.min(n.nextWeek,No())),Ys()},step(){if(!wn||!Ea)return null;Re=wn.nextWeek;const n=Xu(Ea,wn);wn=n.state;const e=n.games.map(a=>({home:a.home,away:a.away,round:a.round,result:a.result,gs:Tt(wn.seed,wn.nextWeek-1,a.home)}));return Ys(),{week:wn.nextWeek-1,games:e}},go(n){Re=Math.max(1,Math.min(this.total,n)),Ys()},next(){this.go(Re+1)},prev(){this.go(Re-1)},weekPayload(){return Vd(wn,Ea,La,Vs)},snapshot(){return{state:wn,teams:Ea,userTeamName:La,slot:Re}},scores(){return wn?[...wn.scores,...wn.playoffs]:[]},userTeamIndex(){return yn.findIndex(n=>n.name===La)}},hs={mode:"system",reducedMotion:!1,newestFirst:!0,teamName:null,draftSlot:null},Yi=_s("nfl","settings");function zi(){try{return globalThis.localStorage}catch{return null}}function Qi(){const n=zi();if(!n)return{...hs};try{const e=n.getItem(Yi);if(!e)return{...hs};const a=JSON.parse(e);return{mode:a.mode==="light"||a.mode==="dark"||a.mode==="system"?a.mode:hs.mode,reducedMotion:a.reducedMotion===!0,newestFirst:a.newestFirst!==!1,teamName:typeof a.teamName=="string"?a.teamName:null,draftSlot:typeof a.draftSlot=="number"&&a.draftSlot>=1&&a.draftSlot<=32?a.draftSlot:null}}catch{return{...hs}}}function zd(n){const e=zi();if(e)try{e.setItem(Yi,JSON.stringify(n))}catch{}}function Qd(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}const jd=["team","board","complete","hub","week","standings","bracket","book","awards","review","guide","cards","feed","stats","settings","saves","share"],Ud=new RegExp("^#/?("+jd.join("|")+")(?:/([0-9]{1,2}))?$");function qd(n){const e=Ud.exec(n);return e?{screen:e[1],param:e[2]?Number(e[2]):null}:null}function Zd(n,e){return"#/"+n+(e!=null?"/"+e:"")}function Xd(){return typeof location>"u"?null:qd(location.hash)}function $d(n,e){typeof location>"u"||(location.hash=Zd(n,e))}function np(n){return gu(n)}function ep(n){return Zl(n.getState(),e=>(e(n.getState()),n.subscribe(e)))}function ha(n){return kr(n)}function ap(){return Zl(Wt(),n=>(n(Wt()),Mn.subscribe(()=>n(Wt()))))}function Wt(){const n=Mn;return{ready:n.ready,slot:n.slot,total:n.total,view:n.view,standings:n.standings,finished:n.finished,champion:n.champion,userTeamName:n.userTeamName,label:n.label,atLastPlayed:n.atLastPlayed,runState:n.runState}}function sp(){return kr({...hs,...Qi()})}const tp="Model Value",Je={measured:tp,balance:"Game balance",owner:"Owner preset"};let Ue={mode:"measured",locked:!1};const zs=new Set,le={get(){return Ue},set(n){Ue.locked||(Ue={...Ue,mode:n},zs.forEach(e=>e(Ue)))},lock(){Ue={...Ue,locked:!0},zs.forEach(n=>n(Ue))},subscribe(n){return zs.add(n),n(Ue),()=>zs.delete(n)}},Pt=2147483647,rp=1e5,op=99e5;function St(n){return"b36:"+n.toString(36)}function Ko(n){const e=String(n??"").trim();if(!e)return null;if(e.slice(0,4)==="b36:"){if(!/^[0-9a-z]+$/i.test(e.slice(4)))return null;const a=parseInt(e.slice(4),36);return Number.isInteger(a)&&a>=1&&a<=Pt?a:null}if(/^\d{1,10}$/.test(e)){const a=Number(e);return Number.isInteger(a)&&a>=1&&a<=Pt?a:null}if(/^[0-9a-z]{1,6}$/i.test(e)){const a=parseInt(e,36);return Number.isInteger(a)&&a>=1&&a<=Pt?a:null}return null}function lp(){return rp+Math.floor(Math.random()*op)}function xo(n){try{const e=new URL(location.href);e.searchParams.set("seed",St(n)),history.replaceState(null,"",e.toString())}catch{}}const ip={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},qs={bg:"#fdf2f6",zcream:"#53382b",gold2:"#e6c67d",goldm:"#ad7f2e"},cp={bg:"#1e1119"},ji=["#e6c67d","#f2e7d5","#c39a4a"],fp="#291a24",up="#ffffff",Ui=ip,dp=n=>Ui[n]??ji;function ft(n){const e=n.replace("#","");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}function qi(n,e,a){const s=t=>Math.max(0,Math.min(255,Math.round(t))).toString(16).padStart(2,"0");return"#"+s(n)+s(e)+s(a)}function Gt(n,e,a){const s=ft(n),t=ft(e);return qi(s[0]+(t[0]-s[0])*a,s[1]+(t[1]-s[1])*a,s[2]+(t[2]-s[2])*a)}function Ce(n){const[e,a,s]=ft(n).map(c=>c/255),t=Math.max(e,a,s),r=Math.min(e,a,s);let o=0,l=0;const i=(t+r)/2;if(t!==r){const c=t-r;l=i>.5?c/(2-t-r):c/(t+r),o=t===e?(a-s)/c+(a<s?6:0):t===a?(s-e)/c+2:(e-a)/c+4,o/=6}return{h:o*360,s:l,l:i}}function Na(n,e,a){const s=(1-Math.abs(2*a-1))*e,t=s*(1-Math.abs(n/60%2-1)),r=a-s/2;let o=0,l=0,i=0;return n<60?(o=s,l=t):n<120?(o=t,l=s):n<180?(l=s,i=t):n<240?(l=t,i=s):n<300?(o=t,i=s):(o=s,i=t),qi((o+r)*255,(l+r)*255,(i+r)*255)}function Oo(n){return ft(n).map(e=>(e/=255,e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))).reduce((e,a,s)=>e+a*[.2126,.7152,.0722][s],0)}function pp(n,e){const a=Oo(n),s=Oo(e),t=Math.max(a,s),r=Math.min(a,s);return(t+.05)/(r+.05)}function Aa(n,e,a,s){const t=Ce(n),r=Math.max(t.s,.42);let o=t.l;for(let l=0;l<90;l++){const i=Na(t.h,r,o);if(pp(i,e)>=s)break;if(a){if(o>=.9)break;o+=.015}else{if(o<=.15)break;o-=.015}}return Na(t.h,r,o)}const Nt=qs.bg,It=cp.bg,hp={"Buffalo Bills":1,"Los Angeles Rams":1};function vp(n){const e=Ui[n];if(!e){const u=[qs.gold2,qs.zcream,qs.goldm];return{light:u,dark:u}}let a=e[0];if(Ce(a).s<.15&&(a=[...e].sort((u,d)=>Ce(d).s-Ce(u).s)[0]),Ce(a).s<.15&&(a=Gt(a,"#c9a24b",.45)),hp[n]){const u=Ce(a);u.h>=195&&u.h<=255&&u.l<.45&&(a=Na(u.h,Math.min(1,u.s*.94),.47))}{const u=e.filter(d=>{const h=Ce(d);return h.s<.14&&h.l>.45});if(Ce(a).l<.26&&u.length){const d=u.find(h=>{const p=Ce(h);return p.l>=.55&&p.l<=.92})||u[u.length-1];a=Gt(a,d,.45)}}const s=e.filter(u=>u!==a),t=u=>{const d=Ce(u);if(d.l<.18||d.s<.15){const h=Ce(a);return Na(h.h,Math.max(.12,Math.min(h.s,.34)),d.l<.18?.22:Math.min(Math.max(d.l,.3),.72))}return Na(d.h,Math.max(d.s,.42),Math.min(Math.max(d.l,.3),.55))},r=u=>{const d=Ce(u);return d.h>=30&&d.h<=70&&d.l>.42?Gt(Na(d.h,Math.min(1,Math.max(d.s,.55)),.5),"#c9a24b",.45):u},o=r(t(s[0]!==void 0?s[0]:a)),l=r(t(s[1]!==void 0?s[1]:a)),i=[Aa(a,Nt,!1,4.6),Aa(o,Nt,!1,4.2),Aa(l,Nt,!1,4.2)],c=[Aa(a,It,!0,4.6),Aa(o,It,!0,4.2),Aa(l,It,!0,4.2)];return{light:i,dark:c}}function mp(n){const[e,a,s]=dp(n),t=vp(n);return{attr:n,vars:{"--zpb-t1":e,"--zpb-t2":a,"--zpb-t3":s,"--zpb-t1L":t.light[0],"--zpb-t2L":t.light[1],"--zpb-t3L":t.light[2],"--zpb-t1D":t.dark[0],"--zpb-t2D":t.dark[1],"--zpb-t3D":t.dark[2]}}}const Vo=n=>{const e=n.replace("#",""),a=[0,2,4].map(s=>parseInt(e.slice(s,s+2),16)/255).map(s=>s<=.03928?s/12.92:((s+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]},Ht=(n,e)=>{const a=Vo(n),s=Vo(e);return(Math.max(a,s)+.05)/(Math.min(a,s)+.05)};function ir(n,e=!0){const a=Du[n]??[...ji],s=e?fp:up,r=[...a].sort((o,l)=>Ht(l,s)-Ht(o,s))[0];return Ht(r,s)>=3?{ink:r,pale:r}:{ink:r,pale:`color-mix(in srgb, ${r} 55%, ${e?"#f2e7d5":"#53382b"})`}}const gp=2027;function ut(n){const e=Jr(n.pool),a=new Map(e.map(t=>[t.id,t])),s=yn.map(()=>[]);for(const t of n.picks){const r=a.get(t.pid);r&&s[t.team]?.push(r)}return s}function Zi(n){const a=["4-3","3-4"].map(r=>Er(n,r)).map(r=>({l:r,R:tr(z0(r),Lu(r))})),s=Lr(a.map(r=>r.R)),t=a[1]&&po(a[1].R,s)>po(a[0].R,s)?a[1]:a[0];return{lineup:t.l,ratings:t.R}}function Bp(n){return yn.map((e,a)=>({name:e.name,ratings:Zi(ut(n)[a]).ratings}))}const Cp={TD:{label:"TD",tone:"good"},FG:{label:"FG",tone:"good"},INT:{label:"INT",tone:"bad"},FUM:{label:"FUM",tone:"bad"},PUNT:{label:"PUNT",tone:"sub"},DOWNS:{label:"DOWNS",tone:"sub"},FG_MISS:{label:"MISS",tone:"bad"},HALF:{label:"EOH",tone:"sub"},SAFETY:{label:"SAFETY",tone:"bad"}},yp={xp:{label:"XP",tone:"good"},two:{label:"2PT",tone:"good"},xp_miss:{label:"XP MISS",tone:"sub"},two_fail:{label:"2PT FAIL",tone:"sub"},none:{label:"NO TRY",tone:"sub"}};function Xi(n,e,a,s){const t=s.week,r=s.year??gp,o=Td(n,e,a),l={[e]:ir(e),[a]:ir(a)},i=s.userTeamName??"";let c=0,u=0,d=0,h=0,p="tie";const v=o.drives.map(m=>{m.team===e?(c+=m.pts,u+=m.oppPts):(u+=m.pts,c+=m.oppPts),m.team===i&&h++;const D=c>u?"home":u>c?"away":"tie",k=D!==p&&D!=="tie";k&&d++,p=D;const w=[],C=Cp[m.end]??{label:m.end,tone:"sub"};w.push(C),m.defTD&&w.push({label:"DEF TD",tone:"gold"}),k&&w.push({label:"LEAD Δ",tone:"gold"});const E=m.scores.find(F=>F.kind==="TD"&&F.team===m.team),M=E?[yp[E.conv]].filter(F=>!!F):[];return{...m,homeAbbr:Jn(e),awayAbbr:Jn(a),teamAbbr:Jn(m.team),teamInk:l[m.team].pale,teamPale:l[m.team].pale,me:m.team===i,leadChange:k,scoreAfter:{home:c,away:u},badges:w,convBadges:M}}),g=s.round?` · ${s.round}`:"";return{week:t,year:r,home:e,away:a,homeAbbr:Jn(e),awayAbbr:Jn(a),homeInk:l[e],awayInk:l[a],homeScore:o.homeScore,awayScore:o.awayScore,regHome:o.regHome,regAway:o.regAway,ot:o.ot,gameSeedLabel:`gameSeed ${s.gs??"?"} · week ${t}${g} · ${a} @ ${e} · played by the pinned engine`,drives:v,meDrives:h,leadChanges:d,userWon:o.homeScore===o.awayScore?null:o.homeScore>o.awayScore?e===i:a===i}}function Tp(n,e,a,s,t=!0){const r=[...n.scores,...n.playoffs].find(y=>(y.home===a||y.away===a)&&y.week===s),o=r?.round??null,l=Tt(n.seed,s,r?r.home:""),i=new Map(e.map(y=>[y.name,y.ratings])),c=Lr(e.map(y=>y.ratings)),u=i.get(r?r.home:""),d=i.get(r?r.away:"");if(!u||!d||!r)return null;const h=or(u,c),p=or(d,c),v=He(u,d,c,{off:h.off,def:p.def}),g=He(d,u,c,{off:p.off,def:h.def}),m=Li(v,g,Ye(l),{playoff:!!o});return Xi(m,r.home,r.away,{week:s,round:o,gs:l,userTeamName:a,year:n.year})}function Yo(n,e){if(typeof document>"u")return;const a=document.documentElement;if(!n){delete a.dataset.zpbteam;return}const s=mp(n);a.dataset.zpbteam=s.attr;for(const[t,r]of Object.entries(s.vars))a.style.setProperty(t,r);a.dataset.theme=e==="system"?"":e,e==="system"&&delete a.dataset.theme}function Sp(n){if(typeof document>"u")return;const e=document.documentElement;n==="system"?delete e.dataset.theme:e.dataset.theme=n}function zo(n,e){const{lineup:a}=Zi(e),s=a.placements.map(t=>t.player).find(Boolean);return{team:n,lineup:a,returnerId:s?.id??null}}class Qo{ss=Bd();boxes=[];addWeek(e,a){for(const s of e){const t=jo(s.home),r=jo(s.away);if(t<0||r<0)continue;const o=hd(s.result,zo(s.home,a[t]??[]),zo(s.away,a[r]??[]),wp());this.boxes.push(o),Cd(this.ss,o)}}}let kp=0;const wp=()=>Ye(24231+kp++).fork("boxscore"),jo=n=>yn.findIndex(e=>e.name===n),ss=n=>_s("nfl","slot:"+n),Uo=ei,Dp=()=>{try{return new URL(import.meta.url).pathname.match(/index-[A-Za-z0-9_-]+\.js/)?.[0]??"dev"}catch{return"dev"}},Qe=Pd({slotCheck:F0}),Ps=n=>({...n});async function Rp(n,e,a,s){const t=Fs("draft",n,Ps(a),e,s),r=await Qe.write(ss(n),t);return r.ok?"":"storage refused the write: "+r.error}async function bp(n,e,a,s){const t=Fs("week",n,Ps(a),e,s),r=await Qe.write(ss(n),t);return r.ok?"":"storage refused the write: "+r.error}async function Ep(n,e,a,s){const t=Fs("season",n,Ps(a),e,s),r=await Qe.write(ss(n),t);return r.ok?"":"storage refused the write: "+r.error}const Lp=n=>{if(yt(n.state))return"season complete";const e=n.teams.length&&(n.state.schedule.find(a=>a.week===n.state.nextWeek&&(a.home===n.context.userTeam||a.away===n.context.userTeam))??null);return e?`${e.away} @ ${e.home}`:"no user game this week"},qo=(n,e)=>n.state!=="ok"||!n.engineVersion||n.engineVersion===e?null:"this save came from build "+n.engineVersion+" (running: "+e+") — logged picks hold; un-made picks may differ";async function Ap(n){const e=await Qe.read(ss(n));if(!e.ok)return{slot:n,state:"refused",problem:"corrupt",message:"storage unavailable: "+e.error};if(e.value===null)return{slot:n,state:"empty"};const a=vt(e.value);if(!a.ok)return{slot:n,state:"refused",problem:a.reason,message:a.message};const s=a.value;if(s.kind==="draft"){const o=s.payload;return{slot:n,state:"ok",kind:"draft",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,picks:o.picks.length,userTeamIndex:o.userTeam}}const t=s.kind==="week"?Oi(s):Ld(s);if(!t.ok)return{slot:n,state:"refused",problem:"corrupt",message:t.message};if(s.kind==="week"){const o=t.value;return{slot:n,state:"ok",kind:"week",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,week:o.state.nextWeek,userTeam:o.context.userTeam,nextFixture:Lp(o),played:o.state.scores.length+o.state.playoffs.length}}const r=s.payload;return{slot:n,state:"ok",kind:"season",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,userTeam:r.userTeam,week:23,played:r.userResults.length,champion:r.champion}}async function Mp(n){const e=await Qe.read(ss(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=vt(e.value);return a.ok?a.value.kind!=="draft"?{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a draft"}:{ok:!0,record:a.value.payload}:{ok:!1,message:a.message}}async function Jp(n){const e=await Qe.read(ss(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=vt(e.value);if(!a.ok)return{ok:!1,message:a.message};if(a.value.kind!=="week")return{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a week"};const s=a.value,t=Oi(s);return t.ok?{ok:!0,env:s}:{ok:!1,message:t.message}}const $i=_s("nfl","autosave:draft"),Gr=_s("nfl","autosave:week");async function _p(n,e,a,s=Qe){const t=Fs("draft","A",Ps(e),n,a),r=await s.write($i,t);return r.ok?"":"autosave refused the write: "+r.error}async function Fp(n,e,a,s=Qe){const t=Fs("week","C",Ps(e),n,a),r=await s.write(Gr,t);return r.ok?"":"autosave refused the write: "+r.error}async function Zo(n=Qe){await n.remove(Gr)}async function Wp(n=Qe){const e=await Xo(n,$i,"draft");if(!e.ok)return e;const a=await Xo(n,Gr,"week");return a.ok?{ok:!0,draft:e.value,week:a.value}:a}async function Xo(n,e,a){const s=await n.read(e);if(!s.ok)return{ok:!1,message:"storage unavailable: "+s.error};if(s.value===null)return{ok:!0,value:null};const t=vt(s.value);if(!t.ok)return{ok:!1,message:t.message};const r=t.value;if(r.kind!==a)return{ok:!1,message:"autosave: "+e+" holds a "+r.kind+" save, not a "+a};const o=l=>({saveId:l.saveId,createdAt:l.createdAt,engineVersion:l.engineVersion,dataVersion:l.dataVersion,saveRevision:l.saveRevision,savedAt:l.savedAt});return a==="draft"?{ok:!0,value:{kind:"draft",record:r.payload,lineage:o(r)}}:{ok:!0,value:{kind:"week",env:r}}}function Pp(n,e,a){return e===0?`best value at ${n.slotLabel}`:a.includes(n.slotId)?"fills your thinnest need":"most Wins left"}function nc(n,e){const a=r=>Number(String(r[e]).replace(/[^0-9.\-]/g,""))||0,s=[],t=Math.min(3,n.length);for(let r=0;r<t;r++)s.push(n[r].id);if(t===3){const r=a(n[2]);for(let o=3;o<n.length&&a(n[o])===r;o++)s.push(n[o].id)}return s}function Gp(n,e){return!Array.isArray(n)||n.length===0||!n.every(a=>typeof a=="string"&&e.has(a))?null:n}var Np=_('<div class="cp-hd svelte-jqmiv9"><span class="cp-team svelte-jqmiv9"> </span> <span class="cp-round svelte-jqmiv9"> </span> <span class="cp-overall svelte-jqmiv9"> </span></div> <p class="cp-onclock svelte-jqmiv9"> </p>',1);function Ip(n,e){Rn(e,!0);var a=Np(),s=Sn(a),t=W(s),r=S(t,!0),o=B(t,2),l=S(o),i=B(o,2),c=S(i),u=B(s,2),d=S(u,!0);H(()=>{T(r,e.header.teamName),T(l,`${e.header.roundLabel??""} · Pick ${e.header.pickInRound??""}`),T(c,`overall ${e.header.overall??""} of ${e.header.totalPicks??""}`),T(d,e.header.onClock)}),L(n,a),bn()}var Hp=_('<span class="cp-toptag svelte-q412k" title="One of your top three priorities right now">TOP</span>'),Kp=_('<span class="cp-why svelte-q412k"> </span>'),xp=_('<button class="cp-chip svelte-q412k"> <i class="svelte-q412k"> </i></button>'),Op=_('<div><div class="cp-rowtop svelte-q412k"><button class="cp-main svelte-q412k"><span class="cp-name svelte-q412k"><!> </span> <span class="cp-pos svelte-q412k"> </span> <span class="cp-nflteam svelte-q412k"> </span> <span class="cp-num cp-ovr svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-gone-wrap svelte-q412k"><span class="cp-num cp-gone svelte-q412k"> </span> <span class="cp-gonetip svelte-q412k" role="tooltip" aria-hidden="true"> </span></span></button> <span class="cp-btnwrap svelte-q412k"><button> </button></span> <!> <button type="button" class="cp-sr svelte-q412k"> </button></div> <div class="cp-fits svelte-q412k"><span class="cp-fitlbl svelte-q412k"> </span> <!> <button class="cp-chip cp-primary svelte-q412k"> </button> <p class="cp-gonehow svelte-q412k"> </p></div></div>');function Vp(n,e){Rn(e,!0);let a=jn(e,"oddsMeta",3,null),s=jn(e,"suggest",3,!1),t=jn(e,"why",3,""),r=jn(e,"busy",3,!1),o=pn(!1);const l={ovr:"OVR — the raw rating; the board never ranks by it by default",wins:"Wins — what the board ranks by",priority:"Priority — what the board ranks by while the Priority sort is on"},i=on=>on?`GONE% — how often the CPU took him before your next pick: the ${on.picksBetween} picks between now and your turn were replayed ${on.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.`:"GONE% — the CPU replay estimate (no replay while the CPU is on the clock).";var c=Op();let u;var d=W(c),h=W(d),p=W(h),v=W(p);{var g=on=>{var Cn=Hp();L(on,Cn)};tn(v,on=>{s()&&on(g)})}var m=B(v,1,!0),y=B(p,2),D=S(y,!0),k=B(y,2),w=S(k,!0),C=B(k,2),E=S(C,!0),M=B(C,2),F=S(M,!0),b=B(M,2),J=S(b,!0),I=B(b,2),K=W(I),U=S(K,!0),x=B(K,2),$=S(x,!0),sn=B(h,2),X=W(sn);let V;var q=S(X),N=B(sn,2);{var Y=on=>{var Cn=Kp(),An=S(Cn,!0);H(()=>T(An,t())),L(on,Cn)};tn(N,on=>{s()&&t()&&on(Y)})}var Z=B(N,2),A=S(Z,!0),P=B(d,2),j=W(P),O=S(j),en=B(j,2);hn(en,17,()=>e.r.alsoFits,as,(on,Cn)=>{var An=xp(),Tn=W(An),kn=B(Tn),ve=S(kn,!0);H(()=>{An.disabled=r(),T(Tn,`${f(Cn).slotLabel??""} `),T(ve,f(Cn).flex)}),rn("click",An,()=>e.onpick(e.r.id,f(Cn).slotId)),L(on,An)});var un=B(en,2),cn=S(un),gn=B(un,2),an=S(gn,!0);H((on,Cn,An)=>{u=Gn(c,1,`cp-row cp-${e.r.tone??""}`,"svelte-q412k",u,{"cp-top3":s()}),dn(c,"data-id",e.r.id),dn(h,"aria-expanded",f(o)),dn(h,"aria-controls",`cp-fit-${e.r.id??""}`),T(m,e.r.name),T(D,e.r.pos),T(w,e.r.nflTeam),dn(C,"title",l.ovr),dn(C,"aria-label",`${e.r.ovr??""} overall`),T(E,e.r.ovr),dn(M,"title",l.wins),dn(M,"aria-label",`${e.r.wins??""} wins`),T(F,e.r.wins),dn(b,"title",l.priority),dn(b,"aria-label",`${e.r.priority??""} priority`),T(J,e.r.priority),dn(K,"aria-label",`${e.r.gone??""} gone odds`),dn(K,"aria-describedby",`cp-gone-desc-${e.r.id??""}`),T(U,e.r.gone),T($,on),V=Gn(X,1,"cp-draftbtn svelte-q412k",null,V,{"cp-istop":s()}),X.disabled=r(),dn(X,"aria-label",`Draft ${e.r.name??""} at ${e.r.slotLabel??""}${s()?" — one of your top three priorities":""}`),T(q,`Draft at ${e.r.slotLabel??""}`),dn(Z,"id",`cp-gone-desc-${e.r.id??""}`),T(A,Cn),dn(P,"id",`cp-fit-${e.r.id??""}`),dn(P,"hidden",!f(o)),T(O,`Fills ${e.r.slotLabel??""}${e.r.natural?"":" (flex)"}`),un.disabled=r(),T(cn,`Draft at ${e.r.slotLabel??""}`),T(an,An)},[()=>i(a()),()=>i(a()),()=>i(a())]),rn("click",h,()=>z(o,!f(o))),rn("click",X,()=>(e.onpickDirect??e.onpick)(e.r.id,e.r.slotId)),rn("click",un,()=>e.onpick(e.r.id,e.r.slotId)),L(n,c),bn()}In(["click"]);var Yp=_("<button> </button>"),zp=_('<div class="cp-sorts svelte-1xb8352" role="group" aria-label="Sort the board"></div>');function Qp(n,e){Rn(e,!0);const a=[{k:"wins",lbl:"Wins"},{k:"priority",lbl:"Priority"},{k:"ovr",lbl:"OVR"}];var s=zp();hn(s,21,()=>a,as,(t,r)=>{var o=Yp();let l;var i=S(o,!0);H(()=>{l=Gn(o,1,"cp-sort svelte-1xb8352",null,l,{"cp-on":e.sort===f(r).k}),T(i,f(r).lbl)}),rn("click",o,()=>e.onsort(f(r).k)),L(t,o)}),L(n,s),bn()}In(["click"]);var jp=_('<span class="cp-seedcode svelte-zb9xkj">code <b class="svelte-zb9xkj"> </b></span>'),Up=_('<button class="cp-play svelte-zb9xkj" data-testid="cp-play">Play week 1 →</button>'),qp=_('<div class="cp-ft svelte-zb9xkj"><!> <span class="cp-count svelte-zb9xkj"> </span> <!> <button class="cp-undo svelte-zb9xkj">Undo my last pick</button> <!></div>');function Zp(n,e){Rn(e,!0);let a=jn(e,"draftDone",3,!1),s=jn(e,"seedCode",3,""),t=jn(e,"busy",3,!1);var r=qp(),o=W(r);Qp(o,{get sort(){return e.sort},get onsort(){return e.onsort}});var l=B(o,2),i=S(l,!0),c=B(l,2);{var u=v=>{var g=jp(),m=B(W(g)),y=S(m,!0);H(()=>{dn(g,"title",`the draft code — put ?seed=${s()??""} in the URL to replay this exact draft`),T(y,s())}),L(v,g)};tn(c,v=>{s()&&v(u)})}var d=B(c,2),h=B(d,2);{var p=v=>{var g=Up();rn("click",g,function(...m){e.onplay?.apply(this,m)}),L(v,g)};tn(h,v=>{a()&&v(p)})}H(()=>{T(i,e.footer.text),d.disabled=!e.canUndo||t()}),rn("click",d,function(...v){e.onundo?.apply(this,v)}),L(n,r),bn()}In(["click"]);In(["click"]);var Xp=_("<button> </button>"),$p=_('<span class="cp-needs-unit svelte-2mq0wt"> </span> <!>',1),nh=_('<button class="cp-need cp-need-all svelte-2mq0wt">ALL</button>'),eh=_('<div class="cp-needs svelte-2mq0wt" data-testid="cp-needs"><span class="cp-needs-lbl svelte-2mq0wt"> </span> <!> <!></div>');function ah(n,e){Rn(e,!0);let a=jn(e,"selected",19,()=>[]);const s={offense:"OFF",defense:"DEF",special:"ST"};Object.fromEntries(ke.map(h=>[h.id,h.unit]));const t=h=>ke.filter(p=>p.unit===h&&e.open.includes(p.id)).map(p=>p.id),r=h=>a().includes(h);var o=eh(),l=W(o),i=S(l),c=B(l,2);hn(c,16,()=>["offense","defense","special"],h=>h,(h,p)=>{var v=$p(),g=Sn(v),m=S(g,!0),y=B(g,2);hn(y,16,()=>t(p),D=>D,(D,k)=>{var w=Xp();let C;var E=S(w,!0);H((M,F,b,J)=>{C=Gn(w,1,"cp-need svelte-2mq0wt",null,C,{"cp-need-on":M}),dn(w,"aria-pressed",F),dn(w,"title",`filter the board to ${b??""}`),T(E,J)},[()=>r(k),()=>r(k),()=>it(k),()=>it(k)]),rn("click",w,()=>e.ontoggle(k)),L(D,w)}),H(()=>T(m,s[p])),L(h,v)});var u=B(c,2);{var d=h=>{var p=nh();rn("click",p,function(...v){e.onclear?.apply(this,v)}),L(h,p)};tn(u,h=>{a().length&&h(d)})}H(()=>T(i,`MY NEEDS · ${e.open.length??""} OPEN`)),L(n,o),bn()}In(["click"]);var sh=_('<p class="cp-drafted svelte-e071nj" role="status" aria-live="polite">Drafted <b class="svelte-e071nj"> </b> · <button class="cp-btn cp-draftedundo svelte-e071nj">Undo</button></p>'),th=_('<p class="cp-confirm svelte-e071nj">Draft <b> </b> at <b> </b>? <button class="cp-btn cp-go svelte-e071nj">Confirm the pick</button> <button class="cp-btn svelte-e071nj">Cancel</button></p>'),rh=_('<section class="cp-board svelte-e071nj" aria-label="Draft board"><!> <!> <!> <!> <div class="cp-rows svelte-e071nj"></div> <!></section>');function $o(n,e){Rn(e,!0);let a=jn(e,"openSlots",19,()=>[]),s=jn(e,"oddsMeta",3,null),t=jn(e,"needsSelected",19,()=>[]),r=jn(e,"draftDone",3,!1),o=jn(e,"seedCode",3,""),l=jn(e,"savedSuggest",3,null),i=jn(e,"busy",3,!1),c=pn(null),u=pn(null),d=pn(!1),h=pn(null),p=null,v=null;const g=async(x,$)=>{if(f(d))return;z(d,!0),z(c,null);const sn=e.vm.rows.find(V=>V.id===x)?.name??"the pick";if(await e.onpick(x,$)===!1){v&&clearTimeout(v),v=setTimeout(()=>{z(d,!1)},380);return}z(h,{name:sn},!0),p&&clearTimeout(p),p=setTimeout(()=>{z(h,null)},2600),v&&clearTimeout(v),v=setTimeout(()=>{z(d,!1)},380)};let m=pn(!1),y=null;const D=()=>{!f(c)||f(m)||(z(m,!0),e.onpick(f(c).id,f(c).slot),z(c,null),y&&clearTimeout(y),y=setTimeout(()=>{z(m,!1)},380))},k=ln(()=>t().length===0?e.vm.rows:e.vm.rows.filter(x=>t().includes(x.slotId)||x.alsoFits.some($=>t().includes($.slotId)))),w=ln(()=>{const x=f(k),sn=Gp(l(),new Set(x.map(q=>q.id)))??nc(x,e.vm.sort),X=new Map(x.map(q=>[q.id,q])),V=new Map(sn.map((q,N)=>{const Y=X.get(q);return[q,Y?Pp(Y,N,[...t()]):""]}));return{ids:new Set(sn),why:V}});var C=rh(),E=W(C);Ip(E,{get header(){return e.vm.header}});var M=B(E,2);ah(M,{get open(){return a()},get selected(){return t()},get ontoggle(){return e.onneedtoggle},get onclear(){return e.onneedclear}});var F=B(M,2);{var b=x=>{var $=sh(),sn=B(W($)),X=S(sn,!0),V=B(sn,2);H(()=>T(X,f(h).name)),rn("click",V,()=>{e.onundo(),z(h,null)}),L(x,$)};tn(F,x=>{f(h)&&x(b)})}var J=B(F,2);{var I=x=>{var $=th(),sn=B(W($)),X=S(sn,!0),V=B(sn,2),q=S(V,!0),N=B(V,2),Y=B(N,2);H(Z=>{T(X,Z),T(q,f(c).slot)},[()=>e.vm.rows.find(Z=>Z.id===f(c).id)?.name]),rn("click",N,D),rn("click",Y,()=>z(c,null)),L(x,$)};tn(J,x=>{f(c)&&x(I)})}var K=B(J,2);hn(K,21,()=>f(k),x=>x.id,(x,$)=>{{let sn=ln(()=>f(w).ids.has(f($).id)),X=ln(()=>f(w).why.get(f($).id)??"");Vp(x,{get r(){return f($)},onpick:(V,q)=>z(c,{id:V,slot:q},!0),onpickDirect:g,get oddsMeta(){return s()},get suggest(){return f(sn)},get why(){return f(X)},get busy(){return i()}})}}),h0(K,x=>z(u,x),()=>f(u));var U=B(K,2);Zp(U,{get footer(){return e.vm.footer},get canUndo(){return e.canUndo},get onundo(){return e.onundo},get onsort(){return e.onsort},get sort(){return e.vm.sort},get onplay(){return e.onplay},get draftDone(){return r()},get seedCode(){return o()},get busy(){return i()}}),H(()=>dn(K,"data-count",f(k).length)),L(n,C),bn()}In(["click"]);var oh=_("<button> </button>"),lh=_('<div role="group" aria-label="Valuation mode"></div>');function ih(n,e){Rn(e,!0);let a=pn(la(le.get()));le.subscribe(o=>z(a,o,!0));const s=["measured","balance","owner"];var t=lh();let r;hn(t,21,()=>s,as,(o,l)=>{var i=oh();let c;var u=S(i,!0);H(()=>{c=Gn(i,1,"cp-mode svelte-1o2iqa1",null,c,{"cp-on":f(a).mode===f(l)}),i.disabled=f(a).locked,dn(i,"title",f(a).locked?"The mode switch is disabled mid-draft":Je[f(l)]),T(u,Je[f(l)])}),rn("click",i,()=>le.set(f(l))),L(o,i)}),H(()=>r=Gn(t,1,"cp-modes svelte-1o2iqa1",null,r,{"cp-locked":f(a).locked})),L(n,t),bn()}In(["click"]);var ch=_('<li><span class="cp-sl svelte-lz9ww5"> </span> <span class="cp-sn"> </span> <b> </b></li>'),fh=_('<section class="cp-adv svelte-lz9ww5" aria-label="Lineup advice"><h3 class="svelte-lz9ww5">Best lineup from your roster</h3> <ul class="svelte-lz9ww5"></ul></section>');function ec(n,e){Rn(e,!0);let a=jn(e,"weak",19,()=>[]);var s=fh(),t=B(W(s),2);hn(t,21,()=>e.slots,as,(r,o,l)=>{var i=ch();let c;var u=W(i),d=S(u,!0),h=B(u,2),p=S(h,!0),v=B(h,2),g=S(v,!0);H(m=>{c=Gn(i,1,"svelte-lz9ww5",null,c,{"cp-weak":m}),T(d,f(o).label),T(p,f(o).name),T(g,f(o).ovr)},[()=>a().includes(l)]),L(r,i)}),L(n,s),bn()}var uh=_('<p class="cp-saves-notice svelte-spfs26" role="alert"> </p>'),dh=_('<p class="cp-slot-empty svelte-spfs26">empty</p>'),ph=_('<p class="cp-slot-refused svelte-spfs26"><b> </b> — corrupt-never-repair</p> <p class="cp-slot-msg svelte-spfs26"> </p>',1),hh=_('<p class="cp-slot-line svelte-spfs26"> </p>'),vh=_('<p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-line cp-slot-dim svelte-spfs26"> </p>',1),mh=_('<p class="cp-slot-older svelte-spfs26"> </p>'),gh=_('<p class="cp-slot-kind svelte-spfs26"> </p> <!> <p class="cp-slot-dim svelte-spfs26"> </p> <!> <button class="cp-slot-load svelte-spfs26"> </button>',1),Bh=_('<article><h3 class="svelte-spfs26"> </h3> <!> <button class="cp-slot-save svelte-spfs26">Save draft here</button></article>'),Ch=_(`<aside class="cp-hydrated svelte-spfs26" aria-label="Hydrated season"><h3 class="svelte-spfs26"> </h3> <p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26">the season screens ride a later slice — the hydration itself is proven (this card renders the engine's LoadedWeek)</p></aside>`),yh=_(`<section class="cp-saves svelte-spfs26" aria-label="Save and load"><header class="cp-saves-head svelte-spfs26"><h2 class="svelte-spfs26">Saves</h2> <span class="cp-saves-sub svelte-spfs26">slots A · B · C — written through the engine's envelope (saveId · revision · sha-256 dataset stamp)</span> <button class="cp-saves-x svelte-spfs26" aria-label="Close saves">✕</button></header> <!> <div class="cp-slotgrid svelte-spfs26"></div> <!> <p class="cp-saves-foot svelte-spfs26">A refused save is <b class="svelte-spfs26">never repaired</b> — the reason above is the engine's own verdict (hydrateWeek / parseEnvelope).</p> <p class="cp-saves-foot cp-saves-stamp svelte-spfs26">This build writes its stamp into every save: <b class="svelte-spfs26"> </b> </p></section>`);function Th(n,e){Rn(e,!0);const a=la({A:null,B:null,C:null});let s=pn(""),t=pn(null),r=pn(!1);async function o(){z(r,!0);for(const C of Uo)a[C]=await Ap(C);z(r,!1)}ws(()=>{e.record,o()});async function l(C){if(z(s,""),!e.record||!e.meta){z(s,"nothing to save — no draft is in progress");return}const E=await Rp(C,e.record,e.meta,new Date);E&&z(s,E,!0),await o()}async function i(C){z(s,""),z(t,null);const E=a[C];if(!E||E.state!=="ok"){z(s,"nothing loadable in slot "+C);return}if(E.kind==="draft"){const M=await Mp(C);if(!M.ok){z(s,"refused: "+M.message),await o();return}e.onloaddraft(M.record,{saveId:E.saveId,createdAt:E.createdAt}),e.onclose();return}z(t,E,!0)}var c=yh(),u=W(c),d=B(W(u),4),h=B(u,2);{var p=C=>{var E=uh(),M=S(E,!0);H(()=>T(M,f(s))),L(C,E)};tn(h,C=>{f(s)&&C(p)})}var v=B(h,2);hn(v,20,()=>Uo,C=>C,(C,E)=>{const M=ln(()=>a[E]);var F=Bh();let b;var J=W(F),I=S(J),K=B(J,2);{var U=X=>{var V=dh();L(X,V)},x=X=>{var V=ph(),q=Sn(V),N=W(q),Y=S(N),Z=B(q,2),A=S(Z,!0);H(()=>{T(Y,`REFUSED (${f(M).problem??""})`),T(A,f(M).message)}),L(X,V)},$=X=>{var V=gh(),q=Sn(V),N=S(q),Y=B(q,2);{var Z=an=>{var on=hh(),Cn=S(on);H(()=>T(Cn,`${f(M).picks??""} picks · ${yn[f(M).userTeamIndex??0]?.name??"?"??""}`)),L(an,on)},A=an=>{var on=vh(),Cn=Sn(on),An=S(Cn),Tn=B(Cn,2),kn=S(Tn);H(()=>{T(An,`${f(M).userTeam??""} · next: week ${f(M).week??""}`),T(kn,`${f(M).nextFixture??""} · ${f(M).played??""} games played`)}),L(an,on)};tn(Y,an=>{f(M).kind==="draft"?an(Z):an(A,-1)})}var P=B(Y,2),j=S(P),O=B(P,2);{var en=an=>{var on=mh(),Cn=S(on,!0);H(An=>T(Cn,An),[()=>qo(f(M),ca())]),L(an,on)},un=ln(()=>qo(f(M),ca()));tn(O,an=>{f(un)&&an(en)})}var cn=B(O,2),gn=S(cn);H((an,on)=>{T(N,`${an??""} · rev ${f(M).saveRevision??""}`),T(j,`saved ${on??""}`),T(gn,`Load ${f(M).kind??""}`)},[()=>f(M).kind?.toUpperCase(),()=>f(M).savedAt?.slice(0,16).replace("T"," ")]),rn("click",cn,()=>i(E)),L(X,V)};tn(K,X=>{!f(M)||f(M).state==="empty"?X(U):f(M).state==="refused"?X(x,1):X($,-1)})}var sn=B(K,2);H(()=>{b=Gn(F,1,"cp-slot svelte-spfs26",null,b,{"cp-slot-ok":f(M)?.state==="ok","cp-slot-bad":f(M)?.state==="refused"}),dn(F,"data-slot",E),T(I,`Slot ${E??""}`),sn.disabled=!e.record}),rn("click",sn,()=>l(E)),L(C,F)});var g=B(v,2);{var m=C=>{var E=Ch(),M=W(E),F=S(M),b=B(M,2),J=S(b),I=B(b,2),K=S(I);H(()=>{T(F,`Hydrated — ${f(t).kind??""} save, slot ${f(t).slot??""}`),T(J,`${f(t).userTeam??""} · next week ${f(t).week??""} · ${f(t).nextFixture??""}`),T(K,`${f(t).played??""} games played · the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)`)}),L(C,E)};tn(g,C=>{f(t)&&C(m)})}var y=B(g,4),D=B(W(y)),k=S(D,!0),w=B(D);H((C,E)=>{T(k,C),T(w,` · shell ${E??""} (§4.4 — the stamp is the RUNNING engine's, never a hardcoded pin).`)},[()=>ca(),()=>Dp()]),rn("click",d,function(...C){e.onclose?.apply(this,C)}),L(n,c),bn()}In(["click"]);var Sh=_('<p class="cp-ts-replay svelte-qxuqmk">This tab carries a replay link — starting a draft replays that exact seed. <button class="cp-ts-newseed svelte-qxuqmk">New draft · new seed</button></p>'),kh=_("<button> </button>"),wh=_('<div class="cp-ts-div svelte-qxuqmk"><h3 class="svelte-qxuqmk"> </h3> <!></div>'),Dh=_('<h2 class="cp-ts-conf svelte-qxuqmk"> </h2> <div class="cp-ts-divs svelte-qxuqmk"></div>',1),Rh=_("<button></button>"),bh=_(`No position chosen — the league's standard order decides. Slot <b class="svelte-qxuqmk"> </b> is this team's natural first pick.`,1),Eh=_('You pick <b class="svelte-qxuqmk"> </b> ',1),Lh=_('<p class="cp-sub cp-ts-order svelte-qxuqmk"> </p>'),Ah=_('<aside class="cp-ts-detail svelte-qxuqmk" aria-live="polite"><h3 class="svelte-qxuqmk"> </h3> <p class="cp-ts-meta svelte-qxuqmk"> </p> <p class="cp-ts-rivals svelte-qxuqmk"><b class="svelte-qxuqmk">Division rivals:</b> </p> <p class="cp-ts-note svelte-qxuqmk"> </p> <h4 class="cp-ts-sloth svelte-qxuqmk">Your draft position</h4> <div class="cp-ts-slots svelte-qxuqmk" role="group" aria-label="Pick your draft position"></div> <p class="cp-ts-note svelte-qxuqmk"><!></p> <!> <button class="cp-ts-go svelte-qxuqmk"> </button></aside>'),Mh=_('<aside class="cp-ts-detail cp-ts-idle svelte-qxuqmk" aria-live="polite"><p class="cp-ts-note svelte-qxuqmk">Select one of the 32 teams to see its details, choose a draft position, and start the draft.</p></aside>'),Jh=_('<section class="cp-ts svelte-qxuqmk"><h1 class="cp-ts-title svelte-qxuqmk">Pick your team</h1> <p class="cp-cygline"><span class="cp-cygt">Can you go</span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p> <!> <p class="cp-prov">Every number you will see on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!></section>');function _h(n,e){Rn(e,!0);let a=jn(e,"seedPinned",3,!1),s=jn(e,"busy",3,!1),t=pn(null),r=pn(null),o=ln(()=>f(t)==null?-1:yn.findIndex(C=>C.name===f(t))),l=ln(()=>f(t)==null?null:Ct[f(t)]),i=ln(()=>f(t)==null||!f(l)?[]:ka(f(l).conf,f(l).div).filter(C=>C!==f(l).name)),c=ln(()=>f(o)<0||f(r)===null?null:wi(f(o),f(r)));function u(){f(o)<0||s()||e.onstart(f(o),f(r))}var d=Jh(),h=B(W(d),4);{var p=C=>{var E=Sh(),M=B(W(E));rn("click",M,function(...F){e.onnewseed?.apply(this,F)}),L(C,E)};tn(h,C=>{a()&&C(p)})}var v=B(h,2),g=B(W(v)),m=S(g,!0),y=B(v,2);hn(y,16,()=>["AFC","NFC"],C=>C,(C,E)=>{var M=Dh(),F=Sn(M),b=S(F,!0),J=B(F,2);hn(J,20,()=>Ge,I=>I,(I,K)=>{var U=wh(),x=W(U),$=S(x),sn=B(x,2);hn(sn,16,()=>ka(E,K),X=>X,(X,V)=>{var q=kh();let N;var Y=S(q,!0);H(()=>{N=Gn(q,1,"cp-ts-team svelte-qxuqmk",null,N,{"cp-on":f(t)===V}),dn(q,"aria-pressed",f(t)===V),T(Y,V)}),rn("click",q,()=>z(t,V,!0)),L(X,q)}),H(()=>T($,`${E??""} ${K??""}`)),L(I,U)}),H(()=>T(b,E)),L(C,M)});var D=B(y,2);{var k=C=>{var E=Ah(),M=W(E),F=S(M,!0),b=B(M,2),J=S(b),I=B(b,2),K=B(W(I)),U=B(I,2),x=S(U),$=B(U,4);hn($,20,()=>Array(32),as,(P,j,O)=>{var en=Rh();let un;en.textContent=O+1,H(()=>{un=Gn(en,1,"cp-ts-slot svelte-qxuqmk",null,un,{"cp-on":f(r)===O+1,"cp-nat":f(o)===O}),dn(en,"aria-pressed",f(r)===O+1)}),rn("click",en,()=>z(r,f(r)===O+1?null:O+1,!0)),L(P,en)});var sn=B($,2),X=W(sn);{var V=P=>{var j=bh(),O=B(Sn(j)),en=S(O,!0);H(()=>T(en,f(o)+1)),L(P,j)},q=P=>{var j=Eh(),O=B(Sn(j)),en=S(O,!0),un=B(O);H(()=>{T(en,f(r)),T(un,`${f(r)===f(o)+1?" — this team's natural spot":" first"}. The store trades your team into this slot and mirrors the trade through the snake; a save restores the same order.`)}),L(P,j)};tn(X,P=>{f(r)===null?P(V):P(q,-1)})}var N=B(sn,2);{var Y=P=>{var j=Lh(),O=S(j);H(en=>T(O,`Order preview (first 6): ${en??""}`),[()=>f(c).slice(0,6).map(en=>yn[en].name).join(" · ")]),L(P,j)};tn(N,P=>{f(c)&&f(r)!==null&&P(Y)})}var Z=B(N,2),A=S(Z);H((P,j)=>{T(F,f(l).name),T(J,`${f(l).conf??""} ${f(l).div??""}`),T(K,` ${P??""}`),T(x,`You draft as this team: the board's on-clock indicator, your picks and your roster are all ${f(l).name??""}'s.`),Z.disabled=s(),T(A,`DRAFT AS ${j??""}${f(r)?` · SLOT ${f(r)}`:""}`)},[()=>f(i).join(" · "),()=>f(l).name.toUpperCase()]),rn("click",Z,u),L(C,E)},w=C=>{var E=Mh();L(C,E)};tn(D,C=>{f(l)?C(k):C(w,-1)})}H(C=>T(m,C),[()=>Je[le.get().mode]]),L(n,d),bn()}In(["click"]);var Fh=_('<span class="cp-feed-dim svelte-tsx9t1"> </span>'),Wh=_('<div class="cp-feed-q svelte-tsx9t1"> </div>'),nl=_('<span class="zrl-badge svelte-tsx9t1"> </span>'),Ph=_('<!> <article><span class="zrl-t svelte-tsx9t1"> </span> <span class="zrl-team svelte-tsx9t1"> </span> <span class="zrl-play svelte-tsx9t1"><span class="cp-feed-summary svelte-tsx9t1"> </span> <span class="cp-feed-badges svelte-tsx9t1"><!> <!></span></span> <span class="zrl-sc svelte-tsx9t1"><b class="svelte-tsx9t1"> </b> <span class="cp-feed-dot svelte-tsx9t1">·</span> <b class="svelte-tsx9t1"> </b></span></article>',1),Gh=_('<p class="cp-feed-empty svelte-tsx9t1">no drives match the filter</p>'),Nh=_(`<section class="cp-feed svelte-tsx9t1" aria-label="Game feed"><header class="cp-feed-head svelte-tsx9t1"><span class="cp-feed-week svelte-tsx9t1"> </span> <span class="cp-feed-vs svelte-tsx9t1"> </span> <span class="cp-feed-tools svelte-tsx9t1"><button>NEWEST FIRST</button> <button>MY DRIVES</button> <button class="cp-feedtool svelte-tsx9t1">← BOARD</button></span></header> <div class="cp-feed-final svelte-tsx9t1"><b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-at svelte-tsx9t1">at</span> <b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-finalnote svelte-tsx9t1"> <!></span> <span class="cp-feed-prov svelte-tsx9t1"> </span></div> <div class="cp-feed-log svelte-tsx9t1" data-testid="cp-feed-log"><!> <!></div> <footer class="cp-feed-foot svelte-tsx9t1"><span> </span> <span class="cp-feed-dim svelte-tsx9t1">drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)</span></footer></section>`);function Ih(n,e){Rn(e,!0);let a=pn(!1),s=pn(!1);const t=ln(()=>f(a)?[...e.feed.drives].reverse():e.feed.drives),r=ln(()=>f(s)?f(t).filter(O=>O.me):f(t)),o=O=>O.replace(":","·"),l=O=>O==="good"?"var(--cp-good)":O==="bad"?"var(--cp-bad)":O==="gold"?"var(--cp-gold)":"var(--cp-sub)";var i=Nh(),c=W(i),u=W(c),d=S(u),h=B(u,2),p=S(h),v=B(h,2),g=W(v);let m;var y=B(g,2);let D;var k=B(y,2),w=B(c,2),C=W(w),E=W(C),M=S(E,!0),F=B(E),b=B(C,4),J=W(b),I=S(J,!0),K=B(J),U=B(b,2),x=W(U),$=B(x);{var sn=O=>{var en=Fh(),un=S(en);H(()=>T(un,`· regulation ${e.feed.regAway??""}–${e.feed.regHome??""}`)),L(O,en)};tn($,O=>{(e.feed.regHome!==e.feed.homeScore||e.feed.regAway!==e.feed.awayScore)&&O(sn)})}var X=B(U,2),V=S(X,!0),q=B(w,2),N=W(q);hn(N,19,()=>f(r),O=>O.n,(O,en,un)=>{var cn=Ph(),gn=Sn(cn);{var an=Kn=>{var qn=Wh(),re=S(qn,!0);H(()=>T(re,f(en).period>=5?"OT":`Q${f(en).period}`)),L(Kn,qn)};tn(gn,Kn=>{!f(s)&&!f(a)&&(f(un)===0||f(r)[f(un)-1].period!==f(en).period)&&Kn(an)})}var on=B(gn,2);let Cn;var An=W(on),Tn=S(An,!0),kn=B(An,2),ve=S(kn,!0),Nn=B(kn,2),Hn=W(Nn),te=S(Hn,!0),fe=B(Hn,2),me=W(fe);hn(me,17,()=>f(en).badges,Kn=>Kn.label,(Kn,qn)=>{var re=nl(),ts=S(re,!0);H(wa=>{aa(re,`color:${wa??""}`),T(ts,f(qn).label)},[()=>l(f(qn).tone)]),L(Kn,re)});var Un=B(me,2);hn(Un,17,()=>f(en).convBadges,Kn=>Kn.label,(Kn,qn)=>{var re=nl(),ts=S(re,!0);H(wa=>{aa(re,`color:${wa??""}`),T(ts,f(qn).label)},[()=>l(f(qn).tone)]),L(Kn,re)});var je=B(Nn,2),ge=W(je),ee=S(ge,!0),we=B(ge,4),na=S(we,!0);H(Kn=>{Cn=Gn(on,1,"cp-feed-line svelte-tsx9t1",null,Cn,{"cp-me":f(en).me}),aa(on,`--beat:${f(un)??""}`),dn(on,"data-period",f(en).period),T(Tn,Kn),aa(kn,`color:${f(en).teamPale??""}`),T(ve,f(en).teamAbbr),T(te,f(en).summary),aa(ge,`color:${e.feed.awayInk.pale??""}`),T(ee,f(en).scoreAfter.away),aa(we,`color:${e.feed.homeInk.pale??""}`),T(na,f(en).scoreAfter.home)},[()=>f(en).period>=5?`OT${f(en).period-4}`:o(f(en).clock)]),L(O,cn)});var Y=B(N,2);{var Z=O=>{var en=Gh();L(O,en)};tn(Y,O=>{f(r).length||O(Z)})}var A=B(q,2),P=W(A),j=S(P);H(()=>{T(d,`WEEK ${e.feed.week??""} · ${e.feed.year??""}`),T(p,`${e.feed.awayAbbr??""} @ ${e.feed.homeAbbr??""}`),m=Gn(g,1,"cp-feedtool svelte-tsx9t1",null,m,{"cp-feedtool-on":f(a)}),dn(g,"aria-pressed",f(a)),D=Gn(y,1,"cp-feedtool svelte-tsx9t1",null,D,{"cp-feedtool-on":f(s)}),dn(y,"aria-pressed",f(s)),aa(E,`color:${e.feed.awayInk.pale??""}`),T(M,e.feed.awayAbbr),T(F,` ${e.feed.awayScore??""}`),aa(J,`color:${e.feed.homeInk.pale??""}`),T(I,e.feed.homeAbbr),T(K,` ${e.feed.homeScore??""}`),T(x,`${e.feed.ot?e.feed.ot.tie?`TIE — OT ×${e.feed.ot.periods} (both teams possessed)`:`FINAL — OT ×${e.feed.ot.periods} (both teams possessed)`:"FINAL"} `),T(V,e.feed.gameSeedLabel),T(j,`${e.feed.drives.length??""} drives · ${e.feed.meDrives??""} mine · ${e.feed.leadChanges??""} lead changes`)}),rn("click",g,()=>z(a,!f(a))),rn("click",y,()=>z(s,!f(s))),rn("click",k,function(...O){e.onclose?.apply(this,O)}),L(n,i),bn()}In(["click"]);var Hh=_('<h1 class="cp-done-h1 svelte-14csbb6">Your draft is complete</h1>'),Kh=_('· requested slot <b class="svelte-14csbb6"> </b>',1),xh=_('<p class="cp-note cp-done-note svelte-14csbb6"><!></p>'),Oh=_('<div class="cp-rosterline svelte-14csbb6"><!></div>'),Vh=_('<section class="cp-done svelte-14csbb6"><!> <p class="cp-done-sub svelte-14csbb6"><!></p> <p class="cp-prov cp-done-prov svelte-14csbb6">seed <b class="svelte-14csbb6"> </b> · code <b class="svelte-14csbb6"> </b> · engine <b class="svelte-14csbb6"> </b> <!> · every number reads <b class="svelte-14csbb6"> </b></p> <!> <!> <div class="cp-chipline svelte-14csbb6"><button class="cp-stepbtn cp-cta">PLAY THE SEASON</button> <button class="cp-stepbtn">YOUR PLAYER CARDS</button> <button class="cp-stepbtn">THE SEASON BOOK</button></div></section>');function Yh(n,e){Rn(e,!0);let a=ln(()=>e.record.picks.length),s=ln(()=>f(a)>=1024),t=ln(()=>e.record.picks.filter(N=>N.team===e.record.userTeam).length),r=ln(()=>{if(!f(s))return[];try{const N=e.record,Y=ut(e.record)[N.userTeam]??[];return(Er(Y,"4-3").placements??[]).map(A=>({label:A.slot?.label??A.slot?.slot??"?",name:A.player?.name??"(empty)",ovr:A.player?String(A.effOvr??A.player.ovr):"-"}))}catch{return[]}}),o=ln(()=>f(r).filter(N=>N.name!=="(empty)"&&N.ovr!=="-").length),l=ln(()=>f(o)<11&&f(r).length?"incomplete":"complete"),i=ln(()=>f(r).map((Y,Z)=>({i:Z,v:Y.name!=="(empty)"&&Y.ovr!=="-"?Number(Y.ovr):1/0})).filter(Y=>Y.v!==1/0).sort((Y,Z)=>Y.v-Z.v).slice(0,3).map(Y=>Y.i));var c=Vh(),u=W(c);{var d=N=>{var Y=Hh();L(N,Y)};tn(u,N=>{f(s)&&N(d)})}var h=B(u,2),p=W(h);{var v=N=>{var Y=Ns("All 1,024 picks are in — every one of the 32 teams holds a full 32-man roster. The league is built; the season is yours to play.");L(N,Y)},g=N=>{var Y=Ns();H((Z,A)=>T(Y,`The draft has ${Z??""} of 1,024 picks in (${A??""} of yours). Come back when the board says done — the season opens from here.`),[()=>zn(f(a)),()=>zn(f(t))]),L(N,Y)};tn(p,N=>{f(s)?N(v):N(g,-1)})}var m=B(h,2),y=B(W(m)),D=S(y,!0),k=B(y,2),w=S(k,!0),C=B(k,2),E=S(C,!0),M=B(C),F=B(M);{var b=N=>{var Y=Kh(),Z=B(Sn(Y)),A=S(Z,!0);H(()=>T(A,e.requestedSlot)),L(N,Y)};tn(F,N=>{e.requestedSlot!==null&&N(b)})}var J=B(F,2),I=S(J,!0),K=B(m,2);{var U=N=>{var Y=xh(),Z=W(Y);{var A=j=>{var O=Ns();H(()=>T(O,`You drafted at slot ${e.record.pickSlot??""} — the store traded ${yn[e.record.userTeam].name??""} into that slot and mirrored the trade through the snake; the record carries it (pickSlot) and a restore replays the same order.`)),L(j,O)},P=j=>{var O=Ns();H(()=>T(O,`Slot ${e.requestedSlot??""} is ${yn[e.record.userTeam].name??""}'s own spot — the standard snake ran, and a restore replays it unchanged.`)),L(j,O)};tn(Z,j=>{e.record.pickSlot!==void 0?j(A):j(P,-1)})}L(N,Y)};tn(K,N=>{(e.requestedSlot!==null||e.record.pickSlot!==void 0)&&N(U)})}var x=B(K,2);{var $=N=>{var Y=Oh(),Z=W(Y);ec(Z,{get slots(){return f(r)},get weak(){return f(i)}}),H(()=>dn(Y,"data-lineup",f(l))),L(N,Y)};tn(x,N=>{f(s)&&f(r).length&&N($)})}var sn=B(x,2),X=W(sn),V=B(X,2),q=B(V,2);H((N,Y,Z,A)=>{dn(c,"data-state",f(s)?"complete":"partial"),T(D,e.record.seed),T(w,N),T(E,Y),T(M,` · ${Z??""} picks · ${yn[e.record.userTeam].name??""} `),T(I,A),X.disabled=!f(s),dn(X,"title",f(s)?void 0:"the season needs a finished draft")},[()=>St(e.record.seed),()=>ca(),()=>zn(f(a)),()=>Je[le.get().mode]]),rn("click",X,function(...N){e.onseason?.apply(this,N)}),rn("click",V,function(...N){e.oncards?.apply(this,N)}),rn("click",q,function(...N){e.onbook?.apply(this,N)}),L(n,c),bn()}In(["click"]);var zh=_('<button class="cp-stepbtn">RESTORE A SAVED WEEK</button>'),Qh=_('<div class="cp-panel"><h2 class="cp-h2">THE SEASON</h2> <p class="cp-note">No season is running. Finish a draft and the season opens from the draft-complete screen — or restore a saved week.</p> <!></div>'),jh=_('<span class="cp-score"> </span>'),Uh=_('<span class="cp-pending">NOT YET PLAYED</span>'),qh=_('<div class="cp-matchup"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div> <button class="cp-stepbtn cp-cta"> </button>',1),Zh=_('<p class="cp-note">No game for you this week — the league plays on.</p> <button class="cp-stepbtn cp-cta">PLAY THE WEEK</button>',1),Xh=_('<button class="cp-stepbtn">RESTORE</button>'),$h=_("<button> </button>"),nv=_('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">OPEN THE SEASON BOOK</button></div>'),ev=_('<h2 class="cp-h2"> </h2> <div class="cp-hubrow svelte-k2xmuw"><div class="cp-gamecard cp-megame"><p class="cp-final"> </p> <!></div> <div class="cp-hubmeta cp-panel svelte-k2xmuw"><p class="cp-sub"> </p> <div class="cp-chipline"><button class="cp-stepbtn">WEEK VIEW</button> <button class="cp-stepbtn">STANDINGS</button> <button class="cp-stepbtn">PLAYOFFS</button> <button class="cp-stepbtn">BOOK</button> <!></div></div></div> <div class="cp-panel"><h3 class="cp-h3 svelte-k2xmuw">THE WEEKS</h3> <div class="cp-weekgrid svelte-k2xmuw"></div></div> <!>',1),av=_('<section class="cp-hub"><!></section>');function sv(n,e){Rn(e,!0);let a=ln(()=>e.season.ready?e.season.finished?"finished":"running":"none"),s=ln(()=>e.season.view?e.season.view.games.filter(c=>c.home===e.season.userTeamName||c.away===e.season.userTeamName):[]),t=ln(()=>f(s).length?f(s)[0]:null);var r=av(),o=W(r);{var l=c=>{var u=Qh(),d=B(W(u),4);{var h=p=>{var v=zh();rn("click",v,function(...g){e.onrestore?.apply(this,g)}),L(p,v)};tn(d,p=>{e.canRestore&&p(h)})}L(c,u)},i=c=>{var u=ev(),d=Sn(u),h=S(d),p=B(d,2),v=W(p),g=W(v),m=S(g),y=B(g,2);{var D=V=>{var q=qh(),N=Sn(q),Y=W(N),Z=S(Y,!0),A=B(Y,2);{var P=gn=>{var an=jh(),on=S(an);H(()=>T(on,`${f(t).as??""} — ${f(t).hs??""}`)),L(gn,an)},j=gn=>{var an=Uh();L(gn,an)};tn(A,gn=>{f(t).hs!==null?gn(P):gn(j,-1)})}var O=B(A,2),en=S(O,!0),un=B(N,2),cn=S(un,!0);H(()=>{T(Z,f(t).awayAbbr),T(en,f(t).homeAbbr),T(cn,f(t).hs!==null?"WATCH THE FEED":"PLAY THE WEEK")}),rn("click",un,function(...gn){e.onplayweek?.apply(this,gn)}),L(V,q)},k=V=>{var q=Zh(),N=B(Sn(q),2);rn("click",N,function(...Y){e.onplayweek?.apply(this,Y)}),L(V,q)};tn(y,V=>{f(t)?V(D):V(k,-1)})}var w=B(v,2),C=W(w),E=S(C),M=B(C,2),F=W(M),b=B(F,2),J=B(b,2),I=B(J,2),K=B(I,2);{var U=V=>{var q=Xh();rn("click",q,function(...N){e.onrestore?.apply(this,N)}),L(V,q)};tn(K,V=>{e.canRestore&&V(U)})}var x=B(p,2),$=B(W(x),2);hn($,21,()=>Array(e.season.total),as,(V,q,N)=>{const Y=ln(()=>N+1);var Z=$h();let A;var P=S(Z,!0);H(()=>{A=Gn(Z,1,"cp-wk svelte-k2xmuw",null,A,{"cp-cur":f(Y)===e.season.slot,"cp-played":f(Y)<e.season.slot+0&&e.season.atLastPlayed===!1||f(Y)<=e.season.slot-1}),T(P,f(Y)>Za?["WC","DIV","CONF","SB"][f(Y)-Za-1]:f(Y))}),rn("click",Z,()=>e.onweek(f(Y))),L(V,Z)});var sn=B(x,2);{var X=V=>{var q=nv(),N=W(q),Y=S(N),Z=B(N,2);H(A=>T(Y,`${A??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion?.toUpperCase()]),rn("click",Z,function(...A){e.onbook?.apply(this,A)}),L(V,q)};tn(sn,V=>{e.season.finished&&V(X)})}H((V,q,N)=>{T(h,`THE SEASON · ${V??""} · ${e.season.view?.label??""??""}`),T(m,`YOUR GAME · ${e.season.view?.label??""??""}`),T(E,`Week slot ${q??""} of ${N??""} · ${e.season.finished?"season finished":e.season.atLastPlayed?"you are at the latest played week":"reviewing an earlier week"}`)},[()=>e.season.userTeamName.toUpperCase(),()=>zn(e.season.slot),()=>zn(e.season.total)]),rn("click",F,()=>e.onweek(e.season.slot)),rn("click",b,function(...V){e.onstandings?.apply(this,V)}),rn("click",J,function(...V){e.onbracket?.apply(this,V)}),rn("click",I,function(...V){e.onbook?.apply(this,V)}),L(c,u)};tn(o,c=>{f(a)==="none"?c(l):c(i,-1)})}H(()=>dn(r,"data-phase",f(a))),L(n,r),bn()}In(["click"]);var el=_('<button class="cp-stepbtn cp-cta"> </button>'),tv=_('<button class="cp-stepbtn">WATCH THE FEED</button>'),rv=_('<p class="cp-note">No season is running — open the hub to begin one.</p>'),ov=_('<span class="cp-score"> </span> <span class="cp-final">FINAL</span>',1),lv=_('<span class="cp-pending"> </span>'),iv=_('<div><div class="cp-matchup"><span class="cp-abbr"> </span> <!></div> <p class="cp-sub cp-gs"> </p></div>'),cv=_('<p class="cp-note">No games this slot.</p>'),fv=_('<div class="cp-grid"></div> <!>',1),uv=_('<section class="cp-week"><div class="cp-stepper"><button class="cp-stepbtn">‹ PREV</button> <span class="cp-weeklabel"> </span> <button class="cp-stepbtn">NEXT ›</button> <span class="cp-sub"> </span> <!> <!> <button class="cp-stepbtn">SAVE</button></div> <!></section>');function dv(n,e){Rn(e,!0);let a=ln(()=>e.season.view),s=ln(()=>f(a)?.games.find(C=>C.home===e.season.userTeamName||C.away===e.season.userTeamName)??null);var t=uv(),r=W(t),o=W(r),l=B(o,2),i=S(l,!0),c=B(l,2),u=B(c,2),d=S(u),h=B(u,2);{var p=C=>{var E=el(),M=S(E);H(()=>T(M,`PLAY WEEK ${e.season.slot??""}`)),rn("click",E,function(...F){e.onplay?.apply(this,F)}),L(C,E)},v=C=>{var E=el(),M=S(E);H(()=>T(M,`STEP TO WEEK ${e.season.slot+1}`)),rn("click",E,function(...F){e.onplay?.apply(this,F)}),L(C,E)};tn(h,C=>{f(s)&&f(s).hs===null?C(p):e.season.atLastPlayed&&!e.season.finished&&C(v,1)})}var g=B(h,2);{var m=C=>{var E=tv();rn("click",E,()=>e.onfeed(f(s).home)),L(C,E)};tn(g,C=>{f(s)&&f(s).hs!==null&&C(m)})}var y=B(g,2),D=B(r,2);{var k=C=>{var E=rv();L(C,E)},w=C=>{var E=fv(),M=Sn(E);hn(M,21,()=>f(a).games,J=>J.replayLabel,(J,I)=>{var K=iv();let U;var x=W(K),$=W(x),sn=S($,!0),X=B($,2);{var V=Z=>{var A=ov(),P=Sn(A),j=S(P);H(()=>T(j,`${f(I).as??""} — ${f(I).hs??""}`)),L(Z,A)},q=Z=>{var A=lv(),P=S(A);H(()=>T(P,`@ ${f(I).homeAbbr??""} · not yet played`)),L(Z,A)};tn(X,Z=>{f(I).hs!==null?Z(V):Z(q,-1)})}var N=B(x,2),Y=S(N);H(Z=>{U=Gn(K,1,"cp-gamecard",null,U,{"cp-megame":f(I).home===e.season.userTeamName||f(I).away===e.season.userTeamName}),T(sn,f(I).awayAbbr),T(Y,`gameSeed ${Z??""}${f(I).round?" · "+f(I).round:""}`)},[()=>zn(f(I).gameSeed)]),L(J,K)});var F=B(M,2);{var b=J=>{var I=cv();L(J,I)};tn(F,J=>{f(a).games.length===0&&J(b)})}L(C,E)};tn(D,C=>{f(a)?C(w,-1):C(k)})}H((C,E)=>{o.disabled=e.season.slot<=1,T(i,e.season.label),c.disabled=e.season.slot>=e.season.total,T(d,`week slot ${C??""} / ${E??""}`)},[()=>zn(e.season.slot),()=>zn(e.season.total)]),rn("click",o,()=>Mn.prev()),rn("click",c,()=>Mn.next()),rn("click",y,function(...C){e.onsave?.apply(this,C)}),L(n,t),bn()}In(["click"]);var pv=_('<p class="cp-note">No season is running — the standings arrive with it.</p>'),hv=_('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),vv=_('<div class="cp-panel cp-stdiv"><h3 class="cp-h3"> </h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th><th class="num">PCT</th><th class="num">SEED</th></tr></thead><tbody></tbody></table></div>'),mv=_('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),gv=_('<h2 class="cp-h2"> </h2> <div class="cp-stdivs svelte-1z0ye32"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table></div> <div class="cp-chipline"><button class="cp-stepbtn cp-cta">THE PLAYOFF PICTURE</button></div>',1),Bv=_('<section class="cp-st"><!></section>');function Cv(n,e){Rn(e,!0);let a=ln(()=>e.season.standings);var s=Bv(),t=W(s);{var r=l=>{var i=pv();L(l,i)},o=l=>{var i=gv(),c=Sn(i),u=S(c),d=B(c,2);hn(d,21,()=>f(a).divisions,y=>y.conf+y.div,(y,D)=>{var k=vv(),w=W(k),C=S(w),E=B(w,2),M=B(W(E));hn(M,21,()=>f(D).rows,F=>F.team,(F,b)=>{var J=hv();let I;var K=W(J),U=S(K),x=B(K),$=S(x,!0),sn=B(x),X=S(sn,!0),V=B(sn),q=S(V,!0),N=B(V),Y=S(N,!0),Z=B(N),A=S(Z,!0),P=B(Z),j=S(P,!0),O=B(P),en=S(O,!0);H(un=>{I=Gn(J,1,"",null,I,{"cp-me":f(b).team===e.season.userTeamName}),T(U,`${un??""} ${f(b).team??""}`),T($,f(b).w),T(X,f(b).l),T(q,f(b).t),T(Y,f(b).pf),T(A,f(b).pa),T(j,f(b).winPct),T(en,f(b).seed??"—")},[()=>Jn(f(b).team)]),L(F,J)}),H(()=>T(C,`${f(D).conf??""} ${f(D).div??""}`)),L(y,k)});var h=B(d,2),p=B(W(h),2),v=B(W(p));hn(v,23,()=>f(a).league,y=>y.team,(y,D,k)=>{var w=mv();let C;var E=W(w),M=S(E,!0),F=B(E),b=S(F),J=B(F),I=S(J,!0),K=B(J),U=S(K,!0),x=B(K),$=S(x,!0),sn=B(x),X=S(sn,!0),V=B(sn),q=S(V,!0);H(N=>{C=Gn(w,1,"",null,C,{"cp-me":f(D).team===e.season.userTeamName}),T(M,f(k)+1),T(b,`${N??""} ${f(D).team??""}`),T(I,f(D).w),T(U,f(D).l),T($,f(D).t),T(X,f(D).pf),T(q,f(D).pa)},[()=>Jn(f(D).team)]),L(y,w)});var g=B(h,2),m=S(g);H(y=>T(u,`STANDINGS · THROUGH ${y??""}`),[()=>f(a).throughWeek===18?"WEEK 18":"WEEK "+zn(f(a).throughWeek)]),rn("click",m,function(...y){e.onbracket?.apply(this,y)}),L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),bn()}In(["click"]);const yv={"Wild Card":"WILD CARD",Divisional:"DIVISIONAL",Conference:"CONFERENCE","Super Bowl":"SUPER BOWL"},Tv=["Wild Card","Divisional","Conference","Super Bowl"],Sv=(n,e,a)=>{if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}const s=n.playoffs.filter(t=>t.round===e);if(s.length===0){const t=(r,o)=>n.playoffs.filter(l=>l.round===r&&(a?.seeds[o].includes(l.home)??!1)).map(l=>l.hs>l.as?l.home:l.away);if(e==="Divisional"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=u=>l.indexOf(u)+1,c=[l[0],...t("Wild Card",o)].sort((u,d)=>i(u)-i(d));c.length===4&&r.push([c[0],c[3]],[c[1],c[2]])}return r}if(e==="Conference"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=u=>l.indexOf(u)+1,c=t("Divisional",o).sort((u,d)=>i(u)-i(d));c.length===2&&r.push([c[0],c[1]])}return r}if(e==="Super Bowl"){const r=["AFC","NFC"].map(o=>t("Conference",o)[0]).filter(Boolean);if(r.length===2)return[[r[0],r[1]]]}return[]}return s.map(t=>[t.home,t.away])};function kv(n,e){const a=n.seeding,s=r=>(a?.seeds[r]??[]).map((o,l)=>({seed:l+1,team:o,abbr:Jn(o),me:o===e})),t=Tv.map(r=>{const o=Sv(n,r,a??null),l=n.playoffs.filter(c=>c.round===r),i=o.length===0?"pending":l.length===o.length?"played":"ready";return{round:r,label:yv[r],state:i,pairs:o.map(([c,u])=>{const d=l.find(h=>h.home===c&&h.away===u);return{home:c,away:u,homeAbbr:Jn(c),awayAbbr:Jn(u),hs:d?d.hs:null,as:d?d.as:null,winner:d?d.hs>d.as?c:d.as>d.hs?u:null:null,gameSeed:0}})}});return{seeded:!!a,seeds:{AFC:s("AFC"),NFC:s("NFC")},rounds:t,champion:n.champion,championAbbr:n.champion?Jn(n.champion):null}}var wv=_('<p class="cp-note">No season is running — the bracket arrives with it.</p>'),Dv=_(`<p class="cp-note">The field is set after week 18. Keep stepping the season — the bracket fills itself from the engine's seeding.</p>`),Rv=_("<span> </span>"),bv=_('<h3 class="cp-h3"> </h3> <div class="cp-seeds svelte-1f06r09"></div>',1),Ev=_('<div class="cp-panel"></div>'),Lv=_(`<p class="cp-sub">Pending — the round's pairs derive from the round before it.</p>`),Av=_('<span class="cp-score"> </span> <span class="cp-final"> </span>',1),Mv=_('<span class="cp-pending">VS · not yet played</span>'),Jv=_('<div class="cp-matchup cp-brpair svelte-1f06r09"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div>'),_v=_('<div class="cp-brackround"><h3> </h3> <!></div>'),Fv=_('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Wv=_('<h2 class="cp-h2">THE PLAYOFFS</h2> <!> <div class="cp-bracket-list svelte-1f06r09"></div> <!>',1),Pv=_('<section class="cp-bracket"><!></section>');function Gv(n,e){Rn(e,!0);let a=ln(()=>e.season.runState?kv(e.season.runState,e.season.userTeamName):null);var s=Pv(),t=W(s);{var r=l=>{var i=wv();L(l,i)},o=l=>{var i=Wv(),c=B(Sn(i),2);{var u=g=>{var m=Dv();L(g,m)},d=g=>{var m=Ev();hn(m,20,()=>["AFC","NFC"],y=>y,(y,D)=>{var k=bv(),w=Sn(k),C=S(w),E=B(w,2);hn(E,21,()=>f(a).seeds[D],M=>M.seed,(M,F)=>{var b=Rv();let J;var I=S(b);H(()=>{J=Gn(b,1,"cp-seedrow svelte-1f06r09",null,J,{"cp-meseed":f(F).me}),T(I,`${f(F).seed??""}. ${f(F).abbr??""}`)}),L(M,b)}),H(()=>T(C,`${D??""} FIELD`)),L(y,k)}),L(g,m)};tn(c,g=>{f(a).seeded?g(d,-1):g(u)})}var h=B(c,2);hn(h,21,()=>f(a).rounds,g=>g.round,(g,m)=>{var y=_v(),D=W(y),k=S(D,!0),w=B(D,2);{var C=M=>{var F=Lv();L(M,F)},E=M=>{var F=Qf(),b=Sn(F);hn(b,17,()=>f(m).pairs,J=>J.home+J.away,(J,I)=>{var K=Jv(),U=W(K),x=S(U,!0),$=B(U,2);{var sn=N=>{var Y=Av(),Z=Sn(Y),A=S(Z),P=B(Z,2),j=S(P);H(O=>{T(A,`${f(I).as??""} — ${f(I).hs??""}`),T(j,`FINAL · ${O??""}`)},[()=>f(I).winner?f(I).winner.toUpperCase():""]),L(N,Y)},X=N=>{var Y=Mv();L(N,Y)};tn($,N=>{f(I).hs!==null?N(sn):N(X,-1)})}var V=B($,2),q=S(V,!0);H(()=>{T(x,f(I).awayAbbr),T(q,f(I).homeAbbr)}),L(J,K)}),L(M,F)};tn(w,M=>{f(m).pairs.length===0?M(C):M(E,-1)})}H(()=>{dn(y,"data-state",f(m).state),T(k,f(m).label)}),L(g,y)});var p=B(h,2);{var v=g=>{var m=Fv(),y=W(m),D=S(y),k=B(y,2);H(w=>T(D,`${w??""} · SUPER BOWL CHAMPIONS`),[()=>f(a).champion.toUpperCase()]),rn("click",k,function(...w){e.onreview?.apply(this,w)}),L(g,m)};tn(p,g=>{f(a).champion&&g(v)})}L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),bn()}In(["click"]);var Nv=_('<p class="cp-note">No season yet — the book opens when one has been played.</p>'),Iv=_('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Hv=_('<div class="cp-revline"><span class="per"> </span> <span class="cp-abbr"> </span> <span class="cp-score"> </span> <span class="cp-abbr"> </span> <button class="cp-stepbtn">REPLAY FEED</button></div>'),Kv=_('<p class="cp-sub">The playoffs have not been played yet.</p>'),xv=_('<div class="cp-pcard"><div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div></div>'),Ov=_('<div class="cp-cardgrid"></div>'),Vv=_(`<p class="cp-sub">The champion's draft class rides the finished draft.</p>`),Yv=_('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),zv=_('<div class="cp-panel"><h3 class="cp-h3">FINAL STANDINGS</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table> <p class="cp-sub">Top 10 shown; the full table lives on Standings.</p></div>'),Qv=_(`<!> <div class="cp-panel"><h3 class="cp-h3">REPLAYABLE PLAYOFF GAMES</h3> <!></div> <div class="cp-panel"><h3 class="cp-h3">THE CHAMPION'S ROSTER</h3> <!></div> <!>`,1),jv=_('<section class="cp-book"><h2 class="cp-h2"> </h2> <!></section>');function Uv(n,e){Rn(e,!0);let a=ln(()=>{const c=e.draftRecord;if(!c||!e.season.champion)return[];const u=Jr(c.pool),d=new Map(u.map(p=>[p.id,p])),h=yn.findIndex(p=>p.name===e.season.champion);return h<0?[]:c.picks.filter(p=>p.team===h).map(p=>d.get(p.pid)).filter(Boolean)});var s=jv(),t=W(s),r=S(t),o=B(t,2);{var l=c=>{var u=Nv();L(c,u)},i=c=>{var u=Qv(),d=Sn(u);{var h=C=>{var E=Iv(),M=W(E),F=S(M),b=B(M,2);H(J=>T(F,`${J??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),rn("click",b,function(...J){e.onreview?.apply(this,J)}),L(C,E)};tn(d,C=>{e.season.champion&&C(h)})}var p=B(d,2),v=B(W(p),2);hn(v,17,()=>e.season.runState?.playoffs??[],C=>C.week+C.home,(C,E)=>{var M=Hv(),F=W(M),b=S(F,!0),J=B(F,2),I=S(J,!0),K=B(J,2),U=S(K),x=B(K,2),$=S(x,!0),sn=B(x,2);H((X,V,q)=>{T(b,X),T(I,V),T(U,`${f(E).as??""} — ${f(E).hs??""}`),T($,q)},[()=>f(E).round?.toUpperCase(),()=>Jn(f(E).away),()=>Jn(f(E).home)]),rn("click",sn,()=>e.onfeed(f(E).home)),L(C,M)},C=>{var E=Kv();L(C,E)});var g=B(p,2),m=B(W(g),2);{var y=C=>{var E=Ov();hn(E,23,()=>f(a),M=>M.id,(M,F,b)=>{var J=xv(),I=W(J),K=S(I,!0),U=B(I,2),x=S(U,!0),$=B(U,2),sn=S($);H((X,V,q)=>{T(K,X),T(x,f(F).name),T(sn,`${f(F).pos??""} · ${f(F).team??""} · OVR ${V??""} · pick ${q??""}`)},[()=>f(F).name.split(/\s+/).slice(0,2).map(X=>X[0]).join(""),()=>zn(f(F).ovr),()=>zn(f(b)+1)]),L(M,J)}),L(C,E)},D=C=>{var E=Vv();L(C,E)};tn(m,C=>{f(a).length?C(y):C(D,-1)})}var k=B(g,2);{var w=C=>{var E=zv(),M=B(W(E),2),F=B(W(M));hn(F,23,()=>e.season.standings.league.slice(0,10),b=>b.team,(b,J,I)=>{var K=Yv();let U;var x=W(K),$=S(x,!0),sn=B(x),X=S(sn),V=B(sn),q=S(V,!0),N=B(V),Y=S(N,!0),Z=B(N),A=S(Z,!0),P=B(Z),j=S(P,!0),O=B(P),en=S(O,!0);H(un=>{U=Gn(K,1,"",null,U,{"cp-me":f(J).team===e.season.userTeamName}),T($,f(I)+1),T(X,`${un??""} ${f(J).team??""}`),T(q,f(J).w),T(Y,f(J).l),T(A,f(J).t),T(j,f(J).pf),T(en,f(J).pa)},[()=>Jn(f(J).team)]),L(b,K)}),L(C,E)};tn(k,C=>{e.season.standings&&C(w)})}L(c,u)};tn(o,c=>{e.season.ready?c(i,-1):c(l)})}H(c=>T(r,`THE SEASON BOOK${c??""}`),[()=>e.season.champion?` · ${e.season.champion.toUpperCase()}`:""]),L(n,s),bn()}In(["click"]);const al={MVP:"MOST VALUABLE PLAYER",OPOY:"OFFENSIVE PLAYER OF THE YEAR",DPOY:"DEFENSIVE PLAYER OF THE YEAR",COACH:"COACH OF THE YEAR"},sl={pyd:"PASSING YARDS",ptd:"PASSING TD",ryd:"RUSHING YARDS",rtd:"RUSHING TD",recYd:"RECEIVING YARDS",rec:"RECEPTIONS",recTd:"RECEIVING TD",sack:"SACKS",intDef:"INTERCEPTIONS",tkl:"TACKLES",ff:"FORCED FUMBLES",fgm:"FIELD GOALS",defTd:"DEFENSIVE TD"},qv={pyd:"pyd",ptd:"ptd",ryd:"ryd",rtd:"rtd",recYd:"recYd",rec:"rec",recTd:"recTd",sack:"sack",intDef:"intDef",tkl:"tkl",ff:"ff",fgm:"fgm",defTd:"defTd"},tl=(n,e)=>{const a=n[e];return a?`${a.w}-${a.l}${a.t?"-"+a.t:""}`:""};function Zv(n,e){const a=yd(n,e),s=(o,l)=>l&&{key:o,name:al[o]??o,winner:l.name,line:`${l.label} · ${Object.entries(l.stats).filter(([,i])=>i>0).slice(0,3).map(([i,c])=>`${i} ${c}`).join(", ")}`,team:l.team,teamAbbr:Jn(l.team),teamWins:tl(e,l.team),shimmer:!1}||null,t=[];for(const[o,l]of[["MVP",a.mvp],["OPOY",a.opoy],["DPOY",a.dpoy]]){const i=s(o,l);i&&t.push(i)}a.coach&&t.push({key:"COACH",name:al.COACH,winner:a.coach.team,line:`${Rs("wins",a.coach.over)} over expected`,team:a.coach.team,teamAbbr:Jn(a.coach.team),teamWins:tl(e,a.coach.team),shimmer:!1});const r=Hi.filter(o=>sl[o]).map(o=>({key:o,label:sl[o],rows:Pr(n,o,5).map(l=>({name:l.name,team:l.team,abbr:Jn(l.team),value:String(l.stats[qv[o]??o]??0)}))}));return{regular:t,leaders:r}}var Xv=_('<p class="cp-note">No season statistics yet — the awards are computed from the games the engine plays, never promised in advance.</p>'),$v=_('<div class="cp-award"><div class="aname"> </div> <div> </div> <div class="cp-sub"> </div> <div class="cp-sub"> </div></div>'),nm=_('<p class="cp-sub">The winners arrive with the finished season.</p>'),em=_('<div class="cp-lrow svelte-1yazvx7"><span class="cp-lrank svelte-1yazvx7"> </span> <span class="cp-lteam svelte-1yazvx7"> </span> <b class="cp-lval svelte-1yazvx7"> </b></div>'),am=_('<div class="cp-leadercol"><h4 class="cp-lh svelte-1yazvx7"> </h4> <!></div>'),sm=_('<div class="cp-awards-grid svelte-1yazvx7"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE LEADERS</h3> <div class="cp-leadercols svelte-1yazvx7"></div></div>',1),tm=_('<section class="cp-awards"><h2 class="cp-h2">THE AWARDS</h2> <!></section>');function rm(n,e){Rn(e,!0);let a=ln(()=>e.stats&&e.table?Zv(e.stats,e.table):null);var s=tm(),t=B(W(s),2);{var r=l=>{var i=Xv();L(l,i)},o=l=>{var i=sm(),c=Sn(i);hn(c,21,()=>f(a).regular,h=>h.key,(h,p)=>{var v=$v(),g=W(v),m=S(g,!0),y=B(g,2);let D;var k=S(y,!0),w=B(y,2),C=S(w,!0),E=B(w,2),M=S(E);H(()=>{T(m,f(p).name),D=Gn(y,1,"awinner",null,D,{"cp-shimmer90":f(p).shimmer}),T(k,f(p).winner),T(C,f(p).line),T(M,`${f(p).teamAbbr??""} · ${f(p).teamWins??""}`)}),L(h,v)},h=>{var p=nm();L(h,p)});var u=B(c,2),d=B(W(u),2);hn(d,21,()=>f(a).leaders,h=>h.key,(h,p)=>{var v=am(),g=W(v),m=S(g,!0),y=B(g,2);hn(y,19,()=>f(p).rows,D=>D.name,(D,k,w)=>{var C=em(),E=W(C),M=S(E,!0),F=B(E),b=B(F),J=S(b),I=B(b,2),K=S(I,!0);H(()=>{T(M,f(w)+1),T(F,` ${f(k).name??""} `),T(J,`(${f(k).abbr??""})`),T(K,f(k).value)}),L(D,C)}),H(()=>T(m,f(p).label)),L(h,v)}),L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),bn()}const rl={"missed-playoffs":"The season ended in week 18 — the playoffs went on without you.","wild-card":"Your season ended in the Wild Card round.",divisional:"Your season ended in the Divisional round.",conference:"Your season ended in the Conference championship.","super-bowl-loss":"You reached the Super Bowl and fell one game short.",champion:"You won the Super Bowl."};function om(n,e){const a=bs(n),s=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e),t=a[e]??{w:0,l:0,t:0,pf:0,pa:0},r=s.filter(l=>l.round).map(l=>l.round).pop(),o=n.champion===e?"champion":r??"missed-playoffs";return{year:n.year,userTeam:e,userAbbr:Jn(e),outcome:rl[o]??rl["missed-playoffs"],w:t.w,l:t.l,t:t.t,pf:t.pf,pa:t.pa,gamesPlayed:s.length,champion:n.champion??"",championAbbr:n.champion?Jn(n.champion):"",userMadePlayoffs:!!r,highlightLines:[`You played ${s.length} games and went ${t.w}-${t.l}${t.t?"-"+t.t:""}.`,`Your team scored ${t.pf} points and allowed ${t.pa}.`,n.champion?`The season's champion: ${n.champion}.`:"The season is not finished yet."]}}var lm=_('<p class="cp-note">No season to review yet — the review arrives with the run.</p>'),im=_('<div class="cp-champbanner"><div class="champ"> </div></div>'),cm=_('<div class="cp-chipstat"><b> </b><span>TIES</span></div>'),fm=_('<p class="cp-revsummary svelte-1vfenj1"> </p>'),um=_('<h2 class="cp-h2"> </h2> <!> <div class="cp-chipline"><div class="cp-chipstat"><b> </b><span>WINS</span></div> <div class="cp-chipstat"><b> </b><span>LOSSES</span></div> <!> <div class="cp-chipstat"><b> </b><span>POINTS FOR</span></div> <div class="cp-chipstat"><b> </b><span>POINTS AGAINST</span></div> <div class="cp-chipstat"><b> </b><span>GAMES PLAYED</span></div></div> <div class="cp-panel cp-guide"><p class="cp-done-sub"> </p> <!></div> <div class="cp-chipline"><button class="cp-stepbtn">THE BRACKET</button> <button class="cp-stepbtn">THE AWARDS</button> <button class="cp-stepbtn cp-cta">THE SEASON BOOK</button></div>',1),dm=_('<section class="cp-sreview"><!></section>');function pm(n,e){Rn(e,!0);let a=ln(()=>e.season.runState?om(e.season.runState,e.season.userTeamName):null);var s=dm(),t=W(s);{var r=l=>{var i=lm();L(l,i)},o=l=>{var i=um(),c=Sn(i),u=S(c),d=B(c,2);{var h=A=>{var P=im(),j=W(P),O=S(j);H(en=>T(O,`${en??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),L(A,P)};tn(d,A=>{e.season.champion&&A(h)})}var p=B(d,2),v=W(p),g=W(v),m=S(g,!0),y=B(v,2),D=W(y),k=S(D,!0),w=B(y,2);{var C=A=>{var P=cm(),j=W(P),O=S(j,!0);H(()=>T(O,f(a).t)),L(A,P)};tn(w,A=>{f(a).t&&A(C)})}var E=B(w,2),M=W(E),F=S(M,!0),b=B(E,2),J=W(b),I=S(J,!0),K=B(b,2),U=W(K),x=S(U,!0),$=B(p,2),sn=W($),X=S(sn,!0),V=B(sn,2);hn(V,16,()=>f(a).highlightLines,A=>A,(A,P)=>{var j=fm(),O=S(j,!0);H(()=>T(O,P)),L(A,j)});var q=B($,2),N=W(q),Y=B(N,2),Z=B(Y,2);H((A,P,j)=>{T(u,`THE SEASON REVIEW · ${f(a).userAbbr??""} ${A??""}`),T(m,f(a).w),T(k,f(a).l),T(F,P),T(I,j),T(x,f(a).gamesPlayed),T(X,f(a).outcome)},[()=>e.season.userTeamName.toUpperCase(),()=>zn(f(a).pf),()=>zn(f(a).pa)]),rn("click",N,function(...A){e.onbracket?.apply(this,A)}),rn("click",Y,function(...A){e.onawards?.apply(this,A)}),rn("click",Z,function(...A){e.onbook?.apply(this,A)}),L(l,i)};tn(t,l=>{f(a)?l(o,-1):l(r)})}L(n,s),bn()}In(["click"]);gf();var hm=_(`<section class="cp-guide"><h2 class="cp-h2">HOW THIS WORKS</h2> <p class="cp-cygline"><span class="cp-cygt">Can you go</span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p> <p class="cp-note">76 Pancakes is a draft simulator: you draft real players for one of the 32 teams, the other 31 teams draft against you, and then the engine plays a full 22-week season — every game, every drive — from the rosters the draft produced. Nothing on any screen is a promise; every number is a measured value the engine computed.</p> <dl><dt>THE DRAFT</dt> <dd>32 teams, 32 rounds, one pick per slot. Your board shows the players you can still take; the CPU teams pick by the engine's own policy while you are not on the clock. You may draft a player into any slot he legally fits — a flex cost applies when he plays out of position, and the cost is the engine's own table, shown as "−N flex".</dd> <dt>THE NUMBERS (Wins · Priority · OVR)</dt> <dd><b>Wins</b> <b>Priority</b> is Wins divided by the gone odds — the value of taking him right now. <b>OVR</b> is the player's overall rating. Only these three ride the board; integers everywhere except Wins and Priority, which print one decimal.</dd> <dt>GONE%</dt> <dd>The chance the player is drafted between now and your next pick. The method, in plain words: the engine simulates the CPU draft from this point 30 times and counts how often each player is gone when your turn returns. Hover the column to see the exact counts.</dd> <dt>VALUATION MODES</dt> <dd>Every number carries a label: <b> </b> (the engine's measured default), <b> </b>, or <b> </b>. One mode at a time, never blended; the label travels with the numbers everywhere they appear; the switch locks the moment a draft starts.</dd> <dt>THE SEASON</dt> <dd>The finished rosters become 32 rated teams (the engine builds each team's lineup and rates it — no ratings are invented here). The engine builds the schedule, plays every game week by week through its drive generator, seeds the playoffs after week 18, and plays Wild Card → Divisional → Conference → Super Bowl. Each game's result is a fixed derivation of the season seed and the matchup: the same draft and seed always replay the same game, and the gameSeed stamp on every card proves it.</dd> <dt>THE FEED AND THE RECAP</dt> <dd>The feed is the play-by-play of the user's game, drive by drive, with running scores and lead-change marks. The recap names every score, every turnover and every star in plain informative lines. Overtime events appear in the overtime block; the words "expected scoring" and "sudden death" never appear anywhere in this product. There are no injuries in any sport, ever.</dd> <dt>SAVES</dt> <dd>One save blob per slot, version-checked on every read. A corrupt save is refused and shown verbatim — never repaired, never silently replaced. A save written by a newer build is refused with its version named.</dd> <dt>OFFLINE</dt> <dd>The fonts are bundled in the app (Cinzel, inlined — never loaded from Google's servers). The whole product runs from a single file on disk with no network. Shareable cards export as one self-contained file each.</dd> <dt>BUILD</dt> <dd> </dd></dl></section>`);function vm(n,e){Rn(e,!1),v0();var a=hm(),s=B(W(a),6),t=B(W(s),6),r=B(W(t));r.nodeValue=" is the model's estimate of how many wins a player adds — the engine's weight-OVR units carried to wins (one number, one decimal). ";var o=B(t,8),l=B(W(o)),i=S(l,!0),c=B(l,2),u=S(c,!0),d=B(c,2),h=S(d,!0),p=B(o,20),v=S(p);H(g=>{T(i,Je.measured),T(u,Je.balance),T(h,Je.owner),T(v,`Engine stamp ${g??""} — the frozen snapshot this shell consumes byte-identically. The engine's own test suite runs in this tree; the shell's battery laws run against the built app.`)},[()=>ca()]),L(n,a),bn()}const mm=n=>n.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0].toUpperCase()).join("");function gm(n){return{cards:n.rows.map(a=>({id:a.id,name:a.name,pos:a.pos,nflTeam:a.nflTeam,ovr:a.ovr,wins:a.wins,priority:a.priority,slotId:a.slotId,slotLabel:a.slotLabel,tone:a.tone,alsoFits:a.alsoFits.map(s=>s.slotLabel+(s.flex?" ("+s.flex+")":"")),monogram:mm(a.name),arrow:a.tone==="good"?"up":a.tone==="bad"?"down":"flat"})),teamName:n.header.teamName,overall:n.header.overall,totalPicks:n.header.totalPicks,onClock:n.header.onClock,count:n.footer.text}}var Bm=_(`<p class="cp-note">No board yet — the cards re-render the board's own rows, so a draft has to exist first.</p>`),Cm=_('<div class="pmeta cp-fitsline"> </div>'),ym=_('<div class="cp-pcard"><span title="form"> </span> <div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div> <div class="pnum"><div><b> </b><span>WINS</span></div> <div><b> </b><span>PRIORITY</span></div> <div><b> </b><span>OVR</span></div></div> <!></div>'),Tm=_('<p class="cp-sub"> </p> <div class="cp-cardgrid"></div> <p class="cp-prov">Every number on these cards reads <b> </b> </p>',1),Sm=_('<section class="cp-cards"><h2 class="cp-h2"> </h2> <!></section>');function km(n,e){Rn(e,!0);let a=ln(()=>e.vm?gm(e.vm):null);var s=Sm(),t=W(s),r=S(t),o=B(t,2);{var l=c=>{var u=Bm();L(c,u)},i=c=>{var u=Tm(),d=Sn(u),h=S(d,!0),p=B(d,2);hn(p,21,()=>f(a).cards,D=>D.id,(D,k)=>{var w=ym(),C=W(w),E=S(C,!0),M=B(C,2),F=S(M,!0),b=B(M,2),J=S(b,!0),I=B(b,2),K=S(I),U=B(I,2),x=W(U),$=W(x),sn=S($,!0),X=B(x,2),V=W(X),q=S(V,!0),N=B(X,2),Y=W(N),Z=S(Y,!0),A=B(U,2);{var P=j=>{var O=Cm(),en=S(O,!0);H(un=>T(en,un),[()=>f(k).alsoFits.join(" · ")]),L(j,O)};tn(A,j=>{f(k).alsoFits.length&&j(P)})}H(()=>{dn(w,"data-tone",f(k).tone),Gn(C,1,`cp-arrow ${f(k).arrow??""}`),T(E,f(k).arrow==="up"?"▲":f(k).arrow==="down"?"▼":"—"),T(F,f(k).monogram),T(J,f(k).name),T(K,`${f(k).pos??""} · ${f(k).nflTeam??""} · fills ${f(k).slotLabel??""}`),T(sn,f(k).wins),T(q,f(k).priority),T(Z,f(k).ovr)}),L(D,w)});var v=B(p,2),g=B(W(v)),m=S(g,!0),y=B(g);H(D=>{T(h,f(a).onClock),T(m,D),T(y,` — the label travels with the numbers. ${f(a).count??""}.`)},[()=>Je[le.get().mode]]),L(c,u)};tn(o,c=>{f(a)?c(i,-1):c(l)})}H(()=>T(r,`PLAYER CARDS${f(a)?` · ${f(a).teamName}`:""}`)),L(n,s),bn()}var wm=_('<p class="cp-note">No season statistics yet — the stats accumulate from the games the engine plays.</p>'),Dm=_('<span class="cp-statp svelte-1y9sotg"> <b class="svelte-1y9sotg"> </b></span>'),Rm=_('<span class="cp-statp cp-none svelte-1y9sotg">—</span>'),bm=_('<div class="cp-statrow svelte-1y9sotg"><span class="cp-statl svelte-1y9sotg"> </span> <!></div>'),Em=_('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),Lm=_(`<div class="cp-panel"><h3 class="cp-h3">THE 32 TEAMS' ENGINE RATINGS</h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">OFF</th><th class="num">DEF</th><th class="num">PASS</th><th class="num">RUN</th><th class="num">RUSH D</th><th class="num">COV</th><th class="num">W</th><th class="num">L</th><th class="num">T</th></tr></thead><tbody></tbody></table> <p class="cp-sub">OFF/DEF are the engine's net points vs the league baseline (Wins units, one decimal); the rest are the engine's raw rating axes.</p></div>`),Am=_(`<p class="cp-note cp-standin svelte-1y9sotg">STAND-IN: gravity and double-teams are formally measured in the live site's model, not yet by the pinned engine — filed §5 to the Architect. Everything below IS the engine's own output.</p> <div class="cp-panel"><h3 class="cp-h3">THE SEASON LINES (LEAGUE LEADERS)</h3> <!></div> <!>`,1),Mm=_('<section class="cp-stats"><h2 class="cp-h2">THE STATS</h2> <!></section>');function Jm(n,e){Rn(e,!0);const a=[["pyd","PASS YD"],["ptd","PASS TD"],["ryd","RUSH YD"],["rtd","RUSH TD"],["recYd","REC YD"],["rec","REC"],["sack","SACKS"],["intDef","INT"],["tkl","TACKLES"],["fgm","FG"]];var s=Mm(),t=B(W(s),2);{var r=l=>{var i=wm();L(l,i)},o=l=>{var i=Am(),c=B(Sn(i),2),u=B(W(c),2);hn(u,17,()=>a,([p,v])=>p,(p,v)=>{var g=ln(()=>Nc(f(v),2));let m=()=>f(g)[0],y=()=>f(g)[1];const D=ln(()=>Pr(e.stats,m(),3));var k=bm(),w=W(k),C=S(w,!0),E=B(w,2);hn(E,17,()=>f(D),M=>M.id,(M,F)=>{var b=Dm(),J=W(b),I=B(J),K=S(I,!0);H(U=>{T(J,`${f(F).name??""} `),T(K,U)},[()=>zn(f(F).stats[m()]??0)]),L(M,b)},M=>{var F=Rm();L(M,F)}),H(()=>T(C,y())),L(p,k)});var d=B(c,2);{var h=p=>{var v=Lm(),g=B(W(v),2),m=B(W(g));hn(m,23,()=>yn,y=>y.name,(y,D,k)=>{const w=ln(()=>e.teams[f(k)]?.ratings),C=ln(()=>e.table[f(D).name]);var E=Em(),M=W(E),F=S(M),b=B(M),J=S(b,!0),I=B(b),K=S(I,!0),U=B(I),x=S(U,!0),$=B(U),sn=S($,!0),X=B($),V=S(X,!0),q=B(X),N=S(q,!0),Y=B(q),Z=S(Y,!0),A=B(Y),P=S(A,!0),j=B(A),O=S(j,!0);H((en,un,cn,gn,an,on,Cn)=>{T(F,`${en??""} ${f(D).name??""}`),T(J,un),T(K,cn),T(x,gn),T(sn,an),T(V,on),T(N,Cn),T(Z,f(C)?.w??"—"),T(P,f(C)?.l??"—"),T(O,f(C)?.t??"—")},[()=>Jn(f(D).name),()=>f(w)?Rs("wins",f(w).off):"—",()=>f(w)?Rs("wins",f(w).def):"—",()=>f(w)?zn(f(w).passOff):"—",()=>f(w)?zn(f(w).runOff):"—",()=>f(w)?zn(f(w).frontRun):"—",()=>f(w)?zn(f(w).coverage):"—"]),L(y,E)}),L(p,v)};tn(d,p=>{e.teams&&p(h)})}L(l,i)};tn(t,l=>{!e.stats||!e.table?l(r):l(o,-1)})}L(n,s),bn()}var _m=_('<section class="cp-settings"><h2 class="cp-h2">SETTINGS</h2> <div class="cp-panel"><div class="cp-setrow"><label for="set-mode">Colour mode</label> <select id="set-mode"><option>Follow the system</option><option>Light (pale rose)</option><option>Dark (plum ink)</option></select></div> <div class="cp-setrow"><label for="set-motion">Reduce motion</label> <input id="set-motion" type="checkbox"/></div> <div class="cp-setrow"><label for="set-order">Feed reading: newest first</label> <input id="set-order" type="checkbox"/></div> <div class="cp-setrow"><span class="cp-cap">Valuation mode</span> <span class="cp-sub"> </span></div></div> <div class="cp-chipline"><button class="cp-stepbtn">SAVES · SLOT A · B · C</button> <button class="cp-stepbtn">CLEAR SAVED CHOICES</button></div> <p class="cp-note">Settings persist across reload. Saves are one blob per slot, version-checked on every read — a corrupt save is refused verbatim, never repaired.</p></section>');function Fm(n,e){Rn(e,!0);var a=_m(),s=B(W(a),2),t=W(s),r=B(W(t),2),o=W(r);o.value=o.__value="system";var l=B(o);l.value=l.__value="light";var i=B(l);i.value=i.__value="dark";var c;c0(r);var u=B(t,2),d=B(W(u),2),h=B(u,2),p=B(W(h),2),v=B(h,2),g=B(W(v),2),m=S(g),y=B(s,2),D=W(y),k=B(D,2);H((w,C)=>{c!==(c=e.settings.mode)&&(r.value=(r.__value=c)??"",jl(r,c)),so(d,e.settings.reducedMotion),so(p,e.settings.newestFirst),T(m,`${w??""}${C??""}`)},[()=>Je[le.get().mode],()=>le.get().locked?" (locked mid-draft)":""]),rn("change",r,w=>e.onmode(w.currentTarget.value)),rn("change",d,w=>e.onmotion(w.currentTarget.checked)),rn("change",p,w=>e.onorder(w.currentTarget.checked)),rn("click",D,function(...w){e.onsaves?.apply(this,w)}),rn("click",k,function(...w){e.onresetsave?.apply(this,w)}),L(n,a),bn()}In(["change","click"]);const Wm=`
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
`;function Pm(n,e){const a=n.lines.map(s=>`<p class="l">${s}</p>`).join(`
      `);return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>76 Pancakes · ${n.title}</title>
<style>
${Wm}
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
`}const _e=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function Gm(n){return{stage:"draft",title:"DRAFT NIGHT",teamName:n.teamName,lines:[`I drafted the <b>${_e(n.teamName)}</b> from slot one of the board.`,`<b>${n.picks}</b> picks in the league, <b>${n.mine}</b> of them mine.`,`Best of my class: <span class="ink">${_e(n.bestPick)}</span> at <b>${n.bestWins}</b> wins.`],stamp:`seed ${n.seed} (code ${St(n.seed)}) · engine ${n.engine} · played by the pinned engine`}}function Nm(n){const e=n.meHome?n.hs:n.as,a=n.meHome?n.as:n.hs,s=e>a,t=n.meHome?n.away:n.home;return{stage:"week",title:`WEEK ${n.week} BRAG`,teamName:n.teamName,lines:[`${s?"I beat":e===a?"I tied":"I fell to"} the <b>${_e(Jn(t))} ${_e(t)}</b> <b>${e}—${a}</b> in ${_e(n.label)}.`,s?"The board says you called it: the run continues.":"A stumble, not an ending — the season is long."],stamp:`gameSeed ${n.gs} · week ${n.week} · ${n.away} @ ${n.home} · engine ${n.engine} · played by the pinned engine`}}function Im(n){return{stage:"season",title:"THE SEASON",teamName:n.teamName,lines:[n.iChampion?`The <b>${_e(n.teamName)}</b> are Super Bowl champions. <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b>, <b>${n.pf}</b> points scored.`:`The <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b> season is in the book — <b>${n.pf}</b> points scored.`,n.champion&&!n.iChampion?`The year belongs to the <b>${_e(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Hm(n){return{stage:"bracket",title:"THE RUN",teamName:n.teamName,lines:[n.iChampion?"Wild Card. Divisional. Conference. <b>Super Bowl champions.</b>":n.madeIt?`The run ended in the <b>${_e(n.lastRound??"Wild Card")}</b>.`:"The playoffs went on without me this year.",n.champion?`The bracket crowns the <b>${_e(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function Km(n){return{stage:"awards",title:"THE AWARDS",teamName:n.teamName,lines:[`The season's Most Valuable Player: <span class="ink">${_e(n.mvp)}</span>.`,n.mvpLine?`<span class="cp-sub">${_e(n.mvpLine)}</span>`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function xm(n){const e=n.teamName?ir(n.teamName).ink:"#c39a4a";return Pm(n,e)}const Om={},ac=Om?.VITE_BRAG_URL??"",Vm=()=>ac!=="";function Ym(n,e=ac){return`I went ${`${n.w}-${n.l}${n.t?"-"+n.t:""}`} and ${n.result} with the ${n.teamName}. Can you go 20-0?${e?" "+e:""}`}function zm(n){return n.lines.map(e=>e.replace(/<[^>]+>/g,"")).join(`
`)}var Qm=_('<button class="cp-navbtn"> </button>'),jm=_('<button class="cp-stepbtn cp-cta"> </button>'),Um=_('<p class="cp-copytoast svelte-o6jlvs" role="status" aria-live="polite"> </p>'),qm=_('<div class="cp-sharewrap svelte-o6jlvs"><iframe class="cp-shareframe svelte-o6jlvs" title="the shareable preview"></iframe> <div class="cp-sharebtns svelte-o6jlvs"><!> <p class="cp-bragtext svelte-o6jlvs"> </p> <!></div></div>'),Zm=_('<p class="cp-note">Nothing to brag about yet on this stage — play it first.</p>'),Xm=_('<section class="cp-share"><h2 class="cp-h2">THE SHAREABLES</h2> <p class="cp-note">One card per stage. The share is a copy-paste brag — text only, no downloads, no files, no save data, no seed (P-209). The season brag carries the link to the live game once it ships.</p> <div class="cp-chipline"></div> <!></section>');function $m(n,e){Rn(e,!0);const a=[{id:"draft",label:"DRAFT"},{id:"week",label:"WEEK"},{id:"season",label:"SEASON"},{id:"bracket",label:"BRACKET"},{id:"awards",label:"AWARDS"}];let s=pn("draft"),t=ln(()=>{const m=ca(),y=e.record,D=e.season.userTeamName||"";if(f(s)==="draft"){if(!y)return null;const k=y.picks.filter(w=>w.team===y.userTeam).length;return Gm({teamName:D,seed:y.seed,picks:y.picks.length,mine:k,bestPick:"your best draft pick",bestWins:"—",engine:m})}if(f(s)==="week"){const k=e.season.view?.games.find(w=>w.home===e.season.userTeamName||w.away===e.season.userTeamName);return!k||k.hs===null?null:Nm({teamName:D,week:e.season.slot,label:e.season.label,home:k.home,away:k.away,hs:k.hs,as:k.as,meHome:k.home===e.season.userTeamName,gs:k.gameSeed,engine:m})}if(f(s)==="season"){if(!e.season.runState)return null;const k=bs(e.season.runState)[e.season.userTeamName],w=k?.w??0,C=k?.l??0,E=k?.t??0,M=k?.pf??0;return Im({teamName:D,w,l:C,t:E,pf:M,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:m})}if(f(s)==="bracket"){if(!e.season.runState)return null;const k=e.season.runState.playoffs.filter(C=>C.home===e.season.userTeamName||C.away===e.season.userTeamName),w=k.length?k[k.length-1].round??null:null;return Hm({teamName:D,madeIt:k.length>0,lastRound:w,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:m})}return e.stats?Km({teamName:D,mvp:e.stats.mvp,mvpLine:e.stats.mvpLine,engine:m}):null}),r=ln(()=>f(t)?xm(f(t)):null);const o=ln(()=>{if(!e.season.runState||!e.season.userTeamName)return{w:0,l:0,t:0};const m=bs(e.season.runState)[e.season.userTeamName];return{w:m?.w??0,l:m?.l??0,t:m?.t??0}});let l=ln(()=>{if(!f(t))return"";if(f(s)==="season"&&e.season.runState){const m=e.season.champion===e.season.userTeamName&&!!e.season.champion,y=e.season.runState.playoffs.filter(k=>k.home===e.season.userTeamName||k.away===e.season.userTeamName),D=m?"won the Super Bowl":y.length?`reached the ${y[y.length-1].round??"Wild Card"}`:"missed the playoffs";return Ym({w:f(o).w,l:f(o).l,t:f(o).t,teamName:e.season.userTeamName||"",result:D})}return zm(f(t))}),i=pn(""),c=null;async function u(){if(f(l)){try{await navigator.clipboard.writeText(f(l)),z(i,"Copied — paste it anywhere.")}catch{z(i,"Copy failed — select the text below and copy it by hand.")}c&&clearTimeout(c),c=setTimeout(()=>{z(i,"")},2600)}}var d=Xm(),h=B(W(d),4);hn(h,21,()=>a,m=>m.id,(m,y)=>{var D=Qm(),k=S(D,!0);H(()=>{dn(D,"aria-pressed",f(s)===f(y).id),T(k,f(y).label)}),rn("click",D,()=>z(s,f(y).id,!0)),L(m,D)});var p=B(h,2);{var v=m=>{var y=qm(),D=W(y),k=B(D,2),w=W(k);{var C=I=>{var K=jm(),U=S(K);H(x=>T(U,`COPY THE ${x??""} BRAG`),[()=>f(s).toUpperCase()]),rn("click",K,u),L(I,K)},E=ln(()=>f(s)!=="season"||Vm());tn(w,I=>{f(E)&&I(C)})}var M=B(w,2),F=S(M,!0),b=B(M,2);{var J=I=>{var K=Um(),U=S(K,!0);H(()=>T(U,f(i))),L(I,K)};tn(b,I=>{f(i)&&I(J)})}H(()=>{dn(D,"srcdoc",f(r)),T(F,f(l))}),L(m,y)},g=m=>{var y=Zm();L(m,y)};tn(p,m=>{f(r)?m(v):m(g,-1)})}L(n,d),bn()}In(["click"]);var n1=_('<button class="cp-navbtn"> </button>'),e1=_('<nav class="cp-nav" aria-label="Screens"></nav>'),a1=_('<p class="cp-error" role="alert"> </p>'),s1=_('<p class="cp-note">Loading…</p>'),t1=_(`<section class="cp-empty"><h1>76 Pancakes</h1> <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p> <p class="cp-note">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p> <p><a class="cp-devlink" href="?dev=1">Open the dev build →</a></p></section>`),r1=_('<p class="cp-sharenotice" role="status"> </p>'),o1=_('<!> <p class="cp-prov">Every number on this shell reads <b> </b> — the label travels with the numbers.</p> <!>',1),l1=_('<p class="cp-prov">Every number on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!>',1),i1=_('<main class="cp-root svelte-1n46o8q"><header class="cp-topbar"><span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span> <span class="cp-topbtns"><!> <button class="cp-topbar-btn">Saves</button></span></header> <!> <!> <!></main>');function c1(n,e){Rn(e,!0);const a=()=>We(Z,"$settingsStore",h),s=()=>We(D,"$draftState",h),t=()=>We(P,"$seasonStats",h),r=()=>We(A,"$season",h),o=()=>We(v,"$boot",h),l=()=>We(w,"$vmStore",h),i=()=>We(M,"$openNow",h),c=()=>We(E,"$oddsMeta",h),u=()=>We(F,"$needsSel",h),d=()=>We(C,"$advice",h),[h,p]=g0(),v=ha({phase:"loading"}),g=new URLSearchParams(location.search).has("dev"),m=g?pu(oo,S0,k0):[];let y=np(m),D=ep(y),k="wins";const w=ha(null),C=ha([]),E=ha(null),M=ha([]),F=ha([]);let b=pn(0),J=pn(777),I=ln(()=>St(f(J))),K=pn(null),U=pn("team"),x=pn(""),$=pn(!1),sn=pn(""),X=pn(null),V=pn(null),q=pn("sha256:pending"),N=pn(""),Y=pn("");const Z=sp(),A=ap(),P=ha(null);let j=null;function O(R){Sp(R.mode),Yo(R.teamName,R.mode),typeof document<"u"&&document.body.classList.toggle("cp-reduced",R.reducedMotion||Qd()),zd(R)}function en(R){const Q={...a(),mode:R};O(Q),Z.set(Q)}function un(R){const Q={...a(),reducedMotion:R};O(Q),Z.set(Q)}function cn(R){const Q={...a(),newestFirst:R};O(Q),Z.set(Q)}function gn(R,Q){const nn={...a(),teamName:R,draftSlot:Q};O(nn),Z.set(nn)}function an(R,Q){R==="board"&&y.getState().status==="done"&&(R="complete"),z(U,R,!0),$d(R,Q)}function on(){const R=Xd();R&&an(R.screen,R.param)}function Cn(){if(!g){v.set({phase:"empty"});return}v.set({phase:"ready",players:m}),window.__cp={store:y,refresh:Hn,valuation:le,seasonFacade:Mn,go:an,vmStore:w,engineVersion:ca},Fd(oo).then(R=>z(q,"sha256:"+R)),kn(),an("team"),re()}function An(){return Ko(new URLSearchParams(location.search).get("seed")||"")??lp()}let Tn=pn(!1);function kn(){z(Tn,new URLSearchParams(location.search).has("seed"),!0)}function ve(){try{const R=new URL(location.href);R.searchParams.delete("seed"),history.replaceState(null,"",R.toString())}catch{}z(Tn,!1)}async function Nn(R,Q){if(!f($)){z(sn,""),z(X,null),z(J,An(),!0),xo(f(J)),kn(),z(b,R,!0),z(K,Q,!0),gn(yn[R].name,Q),z($,!0);try{const nn=await y.dispatchAsync({type:"START",seed:f(J),userTeam:f(b),...Q!==null&&Q-1!==f(b)?{pickSlot:Q}:{}});z(x,nn.error??"",!0)}finally{z($,!1)}an("board"),le.lock(),j=null,P.set(null),Hn(),Zo(),na()}}function Hn(){const R=y.getState();if(R.error&&z(x,R.error,!0),!R.draft||R.status==="idle"){w.set(null),E.set(null),M.set([]);return}if(M.set(Ws(R.draft.rosters[f(b)])),R.status==="done")E.set(null);else try{const Q=Cu(R.draft,f(b),Ye(f(J)*7+13),30);w.set(wu(R.draft,f(b),Q,{sort:k})),E.set({picksBetween:Q.picksBetween,sims:Q.sims})}catch{}try{const Q=Object.values(R.draft.rosters[f(b)]).filter(Boolean),nn=Er(Q,"4-3");C.set(nn.placements.map(fn=>({label:fn.slot?.label??fn.slot?.slot??"?",name:fn.player?.name??"(empty)",ovr:fn.player?String(fn.effOvr??fn.player.ovr):"-"})))}catch{C.set([])}}async function te(R,Q){if(f($))return!1;z(X,null);let nn=!1;z($,!0);try{const fn=await y.dispatchAsync({type:"PICK",playerId:R,slot:Q});z(x,fn.error??"",!0),nn=!!(fn.error??"")}finally{z($,!1)}return Hn(),na(),y.getState().status==="done"&&an("complete"),!nn}async function fe(){if(!f($)){z(X,null),z($,!0);try{const R=await y.dispatchAsync({type:"UNDO"});z(x,R.error??"",!0)}finally{z($,!1)}Hn(),na()}}function me(R){z(X,null),k=R,Hn()}function Un(R){F.update(Q=>Q.includes(R)?Q.filter(nn=>nn!==R):[...Q,R])}function je(){F.set([])}const ge=()=>y.getState().record,ee=()=>({engineVersion:ca(),dataVersion:f(q),saveId:f(N)||z(N,crypto?.randomUUID?.()??"save-"+f(J)+"-"+Date.now(),!0),saveRevision:1+(y.getState().record?.picks.length??0),createdAt:f(Y)||z(Y,new Date().toISOString(),!0)});async function we(R,Q,nn={}){const fn=R;if(!fn){z(x,"load: empty record");return}z(sn,""),z(X,null),z(J,fn.seed,!0),z(b,fn.userTeam,!0),xo(fn.seed),kn(),z(N,Q?.saveId||(crypto?.randomUUID?.()??"save-"+fn.seed),!0),z(Y,Q?.createdAt||new Date().toISOString(),!0),z($,!0);try{const Fn=await y.dispatchAsync({type:"LOAD",record:R});z(x,Fn.error??"",!0)}finally{z($,!1)}le.lock(),an("board"),Hn(),nn.keepWeek||Zo(),na()}async function na(){const R=ge();if(!R)return;const Q=Kn(),nn=Q.length?{...R,suggestIds:Q}:R,fn=await _p(nn,ee(),new Date);fn&&z(x,fn,!0)}function Kn(){let R=null;if(w.subscribe(ue=>R=ue)(),!R)return[];let nn=[];F.subscribe(ue=>nn=ue)();const Fn=nn.length===0?R.rows:R.rows.filter(ue=>nn.includes(ue.slotId)||ue.alsoFits.some(rs=>nn.includes(rs.slotId)));return nc(Fn,R.sort)}async function qn(){if(!Mn.snapshot().state)return;const Q=await Fp(Mn.weekPayload(),ee(),new Date);Q&&z(x,Q,!0)}async function re(){const R=new URLSearchParams(location.search).get("seed"),Q=R===null?null:Ko(R),nn=await Wp(),fn=nn.ok&&nn.draft?nn.draft.record?.seed??null:null;if(Q!==null&&fn!==null&&Q!==fn){z(sn,"shared link opened; your local save is untouched");return}if(!nn.ok){z(x,"the autosave was refused: "+nn.message);return}if(nn.draft&&await we(nn.draft.record,nn.draft.lineage,{keepWeek:!!nn.week}),nn.draft&&z(X,Array.isArray(nn.draft.record?.suggestIds)&&nn.draft.record.suggestIds.length>0?nn.draft.record.suggestIds:null,!0),nn.week){const Fn=Ho(nn.week.env.payload);if(!Fn.ok){z(x,"the season autosave was refused: "+Fn.message);return}Mn.resume(Fn.value.state,Fn.value.teams,Fn.value.userTeamName,Fn.value.roster),an("hub")}}function ts(){const R=y.getState().record;if(!R||y.getState().status!=="done"){z(x,"the season needs a finished draft");return}const Q=ut(R)[f(b)].map(nn=>({id:nn.id,name:nn.name,pos:nn.pos,role:nn.role,team:nn.team,ovr:nn.ovr,spd:nn.spd,str:nn.str,freeAgent:!!nn.freeAgent}));Mn.begin(Bp(R),f(J),2027,yn[f(b)].name,Q),j=new Qo,P.set(j.ss),an("hub"),qn()}function wa(){j||(j=new Qo);const R=Mn.step();if(!R){z(x,"no season is running");return}const Q=y.getState().record;Q&&j.addWeek(R.games.map(fn=>({home:fn.home,away:fn.away,round:fn.round,result:fn.result})),ut(Q)),P.set(j.ss);const nn=R.games.find(fn=>fn.home===Mn.userTeamName||fn.away===Mn.userTeamName);nn?(z(V,Xi(nn.result,nn.home,nn.away,{week:R.week,year:2027,gs:nn.gs,userTeamName:Mn.userTeamName}),!0),an("feed")):an("week",R.week),Mn.finished&&rc(),qn()}async function sc(){const R=await Jp("C");if(!R.ok){z(x,"restore refused: "+R.message);return}const Q=Ho(R.env.payload);if(!Q.ok){z(x,"restore refused: "+Q.message);return}Mn.resume(Q.value.state,Q.value.teams,Q.value.userTeamName,Q.value.roster),j=null,P.set(null),an("hub"),qn()}function Nr(){const R=Mn.snapshot();if(!R.state||!R.teams)return;const Q=Tp(R.state,R.teams,R.userTeamName,Mn.slot);Q&&(z(V,Q,!0),an("feed"))}async function tc(){if(!Mn.snapshot().state){z(x,"no season to save");return}const Q=Mn.weekPayload(),nn=await bp("C",Q,ee(),new Date);z(x,nn?"save refused: "+nn:"",!0),qn()}function rc(){const R=Mn.snapshot();if(!R.state)return;const Q=Yd(R.state,R.userTeamName,Mn.userRoster);Ep("C",Q,ee(),new Date)}ws(()=>{}),C0(()=>{le.subscribe(()=>Hn()),window.addEventListener("hashchange",on);const R=Qi();return O(R),Z.set(R),R.teamName&&Yo(R.teamName,R.mode),Cn(),()=>window.removeEventListener("hashchange",on)});const oc=[{id:"team",label:"TEAM",show:!0},{id:"board",label:"DRAFT",show:!0},{id:"cards",label:"CARDS",show:!0},{id:"hub",label:"SEASON",show:!0},{id:"week",label:"WEEK",show:!0},{id:"standings",label:"STANDINGS",show:!0},{id:"bracket",label:"PLAYOFFS",show:!0},{id:"awards",label:"AWARDS",show:!0},{id:"review",label:"REVIEW",show:!0},{id:"stats",label:"STATS",show:!0},{id:"book",label:"BOOK",show:!0},{id:"share",label:"SHARE",show:!0},{id:"guide",label:"GUIDE",show:!0},{id:"settings",label:"SETTINGS",show:!0}],Gs=ln(()=>s()?.record??null),Ir=ln(()=>{const R=Mn.runState;return R?bs(R):null}),lc=ln(()=>{const R=t();if(!R)return null;const Q=Object.values(R.players);if(!Q.length)return null;const nn=Q.slice().sort((fn,Fn)=>(Fn.stats.pyd??0)+(Fn.stats.rtd??0)-((fn.stats.pyd??0)+(fn.stats.rtd??0)))[0];return{mvp:nn.name,mvpLine:nn.label}}),ic=ln(()=>r().ready);var kt=i1(),Hr=W(kt),cc=B(W(Hr),2),Kr=W(cc);ih(Kr,{});var xr=B(Kr,2),Or=B(Hr,2);{var fc=R=>{var Q=e1();hn(Q,21,()=>oc.filter(nn=>nn.show),nn=>nn.id,(nn,fn)=>{var Fn=n1(),ue=S(Fn,!0);H(()=>{dn(Fn,"aria-current",f(U)===f(fn).id),T(ue,f(fn).label)}),rn("click",Fn,()=>an(f(fn).id)),L(nn,Fn)}),L(R,Q)};tn(Or,R=>{o().phase==="ready"&&R(fc)})}var Vr=B(Or,2);{var uc=R=>{var Q=a1(),nn=S(Q,!0);H(()=>T(nn,f(x))),L(R,Q)};tn(Vr,R=>{f(x)&&R(uc)})}var dc=B(Vr,2);{var pc=R=>{var Q=s1();L(R,Q)},hc=R=>{var Q=t1();L(R,Q)},vc=R=>{var Q=o1(),nn=Sn(Q);{var fn=da=>{var Yr=r1(),_c=S(Yr,!0);H(()=>T(_c,f(sn))),L(da,Yr)};tn(nn,da=>{f(sn)&&da(fn)})}var Fn=B(nn,2),ue=B(W(Fn)),rs=S(ue,!0),os=B(Fn,2);_h(os,{onstart:Nn,get seedPinned(){return f(Tn)},onnewseed:ve,get busy(){return f($)}}),H(da=>T(rs,da),[()=>Je[le.get().mode]]),L(R,Q)},mc=R=>{var Q=l1(),nn=Sn(Q),fn=B(W(nn)),Fn=S(fn,!0),ue=B(nn,2);{let os=ln(()=>(s()?.record?.picks?.length??0)>0),da=ln(()=>s()?.status==="done");$o(ue,{get vm(){return l()},onpick:te,onundo:fe,onsort:me,get canUndo(){return f(os)},get openSlots(){return i()},get oddsMeta(){return c()},get needsSelected(){return u()},onneedtoggle:Un,onneedclear:je,onplay:()=>an("complete"),get draftDone(){return f(da)},get seedCode(){return f(I)},get savedSuggest(){return f(X)},get busy(){return f($)}})}var rs=B(ue,2);ec(rs,{get slots(){return d()}}),H(os=>T(Fn,os),[()=>Je[le.get().mode]]),L(R,Q)},gc=R=>{Yh(R,{get record(){return f(Gs)},get requestedSlot(){return f(K)},onseason:ts,oncards:()=>an("cards"),onbook:()=>an("book")})},Bc=R=>{sv(R,{get season(){return r()},onplayweek:wa,onweek:Q=>{Mn.go(Q),an("week",Q)},onstandings:()=>an("standings"),onbracket:()=>an("bracket"),onrestore:sc,canRestore:!0,onbook:()=>an("book")})},Cc=R=>{dv(R,{get season(){return r()},onplay:wa,onfeed:Nr,onsave:tc})},yc=R=>{Cv(R,{get season(){return r()},onbracket:()=>an("bracket")})},Tc=R=>{Gv(R,{get season(){return r()},onreview:()=>an("review")})},Sc=R=>{Uv(R,{get season(){return r()},get draftRecord(){return f(Gs)},onreview:()=>an("review"),onfeed:Nr})},kc=R=>{rm(R,{get stats(){return t()},get table(){return f(Ir)}})},wc=R=>{pm(R,{get season(){return r()},onbracket:()=>an("bracket"),onbook:()=>an("book"),onawards:()=>an("awards")})},Dc=R=>{vm(R,{})},Rc=R=>{km(R,{get vm(){return l()}})},bc=R=>{{let Q=ln(()=>Mn.snapshot().teams);Jm(R,{get stats(){return t()},get table(){return f(Ir)},get teams(){return f(Q)}})}},Ec=R=>{Fm(R,{get settings(){return a()},onmode:en,onmotion:un,onorder:cn,onsaves:()=>an("saves"),onresetsave:()=>gn(a().teamName,a().draftSlot)})},Lc=R=>{{let Q=ln(ge),nn=ln(ee);Th(R,{get record(){return f(Q)},get meta(){return f(nn)},get userTeamIndex(){return f(b)},onclose:()=>an("board"),onloaddraft:we})}},Ac=R=>{$m(R,{get record(){return f(Gs)},get stats(){return f(lc)},get season(){return r()}})},Mc=R=>{Ih(R,{get feed(){return f(V)},onclose:()=>{an(f(ic)?"week":"board"),z(V,null)}})},Jc=R=>{$o(R,{get vm(){return l()},onpick:te,onundo:fe,onsort:me,canUndo:!1,get busy(){return f($)}})};tn(dc,R=>{o().phase==="loading"?R(pc):o().phase==="empty"?R(hc,1):f(U)==="team"?R(vc,2):f(U)==="board"&&l()?R(mc,3):f(U)==="complete"&&f(Gs)?R(gc,4):f(U)==="hub"?R(Bc,5):f(U)==="week"?R(Cc,6):f(U)==="standings"?R(yc,7):f(U)==="bracket"?R(Tc,8):f(U)==="book"?R(Sc,9):f(U)==="awards"?R(kc,10):f(U)==="review"?R(wc,11):f(U)==="guide"?R(Dc,12):f(U)==="cards"?R(Rc,13):f(U)==="stats"?R(bc,14):f(U)==="settings"?R(Ec,15):f(U)==="saves"?R(Lc,16):f(U)==="share"?R(Ac,17):f(U)==="feed"&&f(V)?R(Mc,18):l()&&R(Jc,19)})}H(()=>{dn(kt,"data-screen",f(U)),dn(xr,"aria-pressed",f(U)==="saves")}),rn("click",xr,()=>an("saves")),L(n,kt),bn(),p()}In(["click"]);Xf(c1,{target:document.getElementById("app")});
