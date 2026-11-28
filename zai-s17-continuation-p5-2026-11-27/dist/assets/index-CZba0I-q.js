(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const Sl=!1;var Tt=Array.isArray,af=Array.prototype.indexOf,Es=Array.prototype.includes,St=Array.from,Tr=Object.defineProperty,Ya=Object.getOwnPropertyDescriptor,kl=Object.getOwnPropertyDescriptors,sf=Object.prototype,tf=Array.prototype,Sr=Object.getPrototypeOf,ro=Object.isExtensible;const Da=()=>{};function rf(n){return n()}function Xt(n){for(var e=0;e<n.length;e++)n[e]()}function wl(){var n,e,a=new Promise((s,t)=>{n=s,e=t});return{promise:a,resolve:n,reject:e}}function of(n,e){if(Array.isArray(n))return n;if(!(Symbol.iterator in n))return Array.from(n);const a=[];for(const s of n)if(a.push(s),a.length===e)break;return a}const se=2,ja=4,Ws=8,Dl=1<<24,Ee=16,We=32,va=64,$t=128,kr=256,Je=512,Un=1024,_n=2048,ve=4096,oe=8192,ee=16384,ts=32768,Ls=1<<25,qa=65536,ot=1<<17,lf=1<<18,rs=1<<19,bl=1<<20,Oe=1<<25,lt=1<<21,za=1<<22,ha=1<<23,aa=Symbol("$state"),Rl=Symbol("component"),cf=Symbol("legacy props"),ff=Symbol(""),El=Symbol("attributes"),nr=Symbol("class"),er=Symbol("style"),ar=Symbol("text"),Ps=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"},df=1,uf=2,Ll=4,pf=8,hf=16,vf=1,mf=2,gf=4,Bf=8,Cf=16,yf=1,Tf=2,Al={},zn=Symbol("uninitialized"),Sf="http://www.w3.org/1999/xhtml";function kf(){console.warn("https://svelte.dev/e/derived_inert")}function wf(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function Df(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Ml(n){return n===this.v}function Jl(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function _l(n){return!Jl(n,this.v)}function bf(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Rf(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Ef(n,e,a){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Lf(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Af(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Mf(n){throw new Error("https://svelte.dev/e/effect_orphan")}function Jf(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function _f(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function Ff(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Wf(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Pf(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Gf(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let os=!1,Nf=!1;function If(){os=!0}let Gn=null;function Za(n){Gn=n}function Rn(n,e=!1,a){Gn={p:Gn,i:!1,c:null,e:null,s:n,x:null,r:yn,l:os&&!e?{s:null,u:null,$:[]}:null}}function En(n){var e=Gn,a=e.e;if(a!==null){e.e=null;for(var s of a)ql(s)}return e.i=!0,Gn=e.p,wr(n)}function wr(n={}){return Tr(n,Rl,{value:!0}),n}function Gs(){return!os||Gn!==null&&Gn.l===null}let Na=[];function Hf(){var n=Na;Na=[],Xt(n)}function pa(n){if(Na.length===0){var e=Na;queueMicrotask(()=>{e===Na&&Hf()})}Na.push(n)}const Kf=-7169;function xn(n,e){n.f=n.f&Kf|e}function Dr(n){(n.f&Je)!==0||n.deps===null?xn(n,Un):xn(n,ve)}function Fl(n,e){(n.f&_n)!==0?e.set(n,_n):(n.f&ve)!==0&&e.get(n)!==_n&&e.set(n,ve),xn(n,Un)}function kt(n){var e=Bn,a=yn;Se(null),Ue(null);try{return n()}finally{Se(e),Ue(a)}}function xf(n,e,a,s){const t=Gs()?Xa:br;var r=n.filter(p=>!p.settled),o=e.map(t);if(a.length===0&&r.length===0){s(o);return}var l=yn,i=Of(),f=r.length===1?r[0].promise:r.length>1?Promise.all(r.map(p=>p.promise)):null;function d(p){if((l.f&ee)===0){i();try{s([...o,...p])}catch(v){xe(v,l)}it()}}var u=Wl();if(a.length===0){f.then(()=>d([])).finally(u);return}function h(){Promise.all(a.map(p=>Vf(p))).then(d).catch(p=>xe(p,l)).finally(u)}f?f.then(()=>{if((l.f&ee)!==0){u();return}i(),h(),it()}):h()}function Of(){var n=yn,e=Bn,a=Gn,s=kn;return function(r=!0){Ue(n),Se(e),Za(a),r&&(n.f&ee)===0&&(s?.activate(),s?.apply())}}function it(n=!0){Ue(null),Se(null),Za(null),n&&kn?.deactivate()}function Wl(){var n=yn,e=n.b,a=kn,s=!!e?.is_rendered();return e?.update_pending_count(1,a),a.increment(s,n),()=>{e?.update_pending_count(-1,a),a.decrement(s,n)}}function Xa(n){var e=se|_n;return yn!==null&&(yn.f|=rs),{ctx:Gn,deps:null,effects:null,equals:Ml,f:e,fn:n,reactions:null,rv:0,v:zn,wv:0,parent:yn,ac:null}}const vs=Symbol("obsolete");function Vf(n,e,a){let s=yn;s===null&&Rf();var t=void 0,r=Ea(zn),o=!Bn,l=new Set;return td(()=>{var i=yn,f=wl();t=f.promise;try{Promise.resolve(n()).then(f.resolve,p=>{p!==Ps&&f.reject(p)}).finally(it)}catch(p){f.reject(p),it()}var d=kn;if(o){if((i.f&ts)!==0)var u=Wl();if(s.b?.is_rendered())d.async_deriveds.get(i)?.reject(vs);else for(const p of l.values())p.reject(vs);l.add(f),d.async_deriveds.set(i,f)}const h=(p,v=void 0)=>{u?.(),l.delete(f),v!==vs&&(d.activate(),v?(r.f|=ha,$a(r,v)):((r.f&ha)!==0&&(r.f^=ha),$a(r,p)),d.deactivate())};f.promise.then(h,p=>h(null,p||"unknown"))}),Mr(()=>{for(const i of l)i.reject(vs)}),new Promise(i=>{function f(d){function u(){d===t?i(r):f(t)}d.then(u,u)}f(t)})}function ln(n){const e=Xa(n);return ai(e),e}function br(n){const e=Xa(n);return e.equals=_l,e}function Yf(n){var e=n.effects;if(e!==null){n.effects=null;for(var a=0;a<e.length;a+=1)fe(e[a])}}function Rr(n){var e,a=yn,s=n.parent;if(!ra&&s!==null&&n.v!==zn&&(s.f&(ee|oe))!==0)return kf(),n.v;Ue(s);try{Yf(n),e=oi(n)}finally{Ue(a)}return e}function Pl(n){var e=Rr(n);if(!n.equals(e)&&(n.wv=ti(),(!kn?.is_fork||n.deps===null)&&(kn!==null?(kn.capture(n,e,!0),sr?.capture(n,e,!0)):n.v=e,n.deps===null))){xn(n,Un);return}ra||(Le!==null?(Ar()||kn?.is_fork)&&Le.set(n,e):Dr(n))}function zf(n){if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&(e.teardown?.(),e.ac!==null&&kt(()=>{e.ac.abort(Ps),e.ac=null}),e.fn!==null&&(e.teardown=Da),Js(e,0),_r(e))}function Gl(n){if(n.effects!==null)for(const e of n.effects)e.teardown&&e.fn!==null&&ns(e)}let Ft=null,Ma=null,kn=null,sr=null,Le=null,tr=null,Wt=!1,Ts=null,at=null;var oo=0;let Qf=1;class ma{id=Qf++;started=!1;linked=!0;prev=null;next=null;async_deriveds=new Map;current=new Map;previous=new Map;#e=new Set;#i=new Set;#n=0;#o=new Map;#a=null;#s=[];#r=[];#t=new Map;#l=new Map;#p=new Set;is_fork=!1;#c=!1;constructor(){Ma===null?Ft=Ma=this:(Ma.next=this,this.prev=Ma),Ma=this}#h(){if(this.is_fork)return!0;for(const e of this.#o.keys())if(!this.#g(e))return!0;return!1}#g(e){for(var a=e;a!==null;a=a.parent)if(this.#l.has(a))return!0;return!1}skip_effect(e){this.#l.has(e)||this.#l.set(e,{d:[],m:[]}),this.#p.delete(e)}unskip_effect(e,a=s=>this.schedule(s)){var s=this.#l.get(e);if(s){this.#l.delete(e);for(var t of s.d)xn(t,_n),a(t);for(t of s.m)xn(t,ve),a(t)}this.#p.add(e)}#f(){var e=[];for(const r of this.#s)if(!((r.f&ee)!==0||(r.f&(_n|ve))===0)){for(var a=r,s=!1;a.parent!==null;){a=a.parent;var t=a.f;if((t&(va|We))!==0){if((t&Un)===0){s=!0;break}a.f^=Un}}s||e.push(a)}return this.#s=[],e}#v(){this.started=!0;for(const[l,i]of this.#t)xn(l,i),this.schedule(l);this.apply();for(var e=Ts=[],a=[],s=at=[];this.#s.length>0;){oo++>1e3&&(this.#u(),Uf());for(const l of this.#f())try{this.#C(l,e,a)}catch(i){throw Hl(l),this.#h()||this.discard(),i}}if(kn=null,s.length>0){var t=ma.ensure();for(const l of s)t.schedule(l)}if(Ts=null,at=null,this.#h()){this.#m(a),this.#m(e);for(const[l,i]of this.#l)Il(l,i);s.length>0&&kn.#v();return}const r=this.#S();if(r){this.#m(a),this.#m(e),r.#d(this);return}this.#t.clear();for(const l of this.#e)l(this);this.#e.clear(),sr=this,lo(a),lo(e),sr=null,this.#a?.resolve();var o=kn;this.#n===0&&(this.#s.length===0||o!==null)&&this.#u(),o!==null&&(Ye.clear(),o.#v())}#C(e,a,s){e.f^=Un;for(var t=e.first;t!==null;){var r=t.f,o=(r&(We|va))!==0,l=o&&(r&Un)!==0,i=l||(r&oe)!==0||this.#l.has(t);if(!i&&t.fn!==null){o?t.f^=Un:(r&ja)!==0?a.push(t):Is(t)&&((r&Ee)!==0&&this.add_dirty_reaction(t,ve),ns(t));var f=t.first;if(f!==null){t=f;continue}}for(;t!==null;){var d=t.next;if(d!==null){t=d;break}t=t.parent}}}#S(){for(var e=this.prev;e!==null;e=e.prev)if(!e.is_fork&&this.#B(e))return e;return null}#B(e){for(const[a,[,s]]of this.current)if(!s&&e.current.has(a))return!0;return!1}#d(e){for(const[s,t]of e.current)!this.previous.has(s)&&e.previous.has(s)&&this.previous.set(s,e.previous.get(s)),this.current.set(s,t);for(const[s,t]of e.async_deriveds){const r=this.async_deriveds.get(s);r&&t.promise.then(r.resolve).catch(r.reject)}e.async_deriveds.clear(),this.transfer_reactions(e.#t);const a=s=>{var t=s.reactions;if(t!==null&&!((s.f&se)!==0&&(s.f&(_n|ve))===0))for(const l of t){var r=l.f;if((r&se)!==0)a(l);else{var o=l;r&(za|Ee)&&!this.async_deriveds.has(o)&&(this.#t.delete(o),xn(o,_n),this.schedule(o))}}};for(const s of this.current.keys())a(s);this.oncommit(()=>e.discard()),e.#u(),kn=this,this.#v()}#m(e){for(var a=0;a<e.length;a+=1)Fl(e[a],this.#t)}capture(e,a,s=!1){e.v!==zn&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&ha)===0&&(this.current.set(e,[a,s]),Le?.set(e,a)),this.is_fork||(e.v=a)}activate(){kn=this}deactivate(){kn=null,Le=null}flush(){try{Wt=!0,kn=this,this.#v()}finally{oo=0,tr=null,Ts=null,at=null,Wt=!1,kn=null,Le=null,Ye.clear()}}discard(){for(const e of this.#i)e(this);this.#i.clear();for(const e of this.async_deriveds.values())e.reject(vs);this.#u(),this.#a?.resolve()}register_created_effect(e){this.#r.push(e)}#y(){for(let u=Ft;u!==null;u=u.next){var e=u.id<this.id,a=[];for(const[h,[p,v]]of this.current){if(u.current.has(h)){var s=u.current.get(h)[0];if(e&&p!==s)u.current.set(h,[p,v]);else continue}a.push(h)}if(e)for(const[h,p]of this.async_deriveds){const v=u.async_deriveds.get(h);v&&p.promise.then(v.resolve).catch(v.reject)}var t=[...u.current.keys()].filter(h=>!u.current.get(h)[1]);if(!(!u.started||t.length===0)){var r=t.filter(h=>!this.current.has(h));if(r.length===0)e&&u.discard();else if(a.length>0){if(e)for(const h of this.#p)u.unskip_effect(h,p=>{(p.f&(Ee|za))!==0?u.schedule(p):u.#m([p])});u.activate();var o=new Set,l=new Map;for(var i of a)Nl(i,r,o,l);l=new Map;var f=[...u.current].filter(([h,p])=>{const v=this.current.get(h);return v?v[0]!==p[0]||v[1]!==p[1]:!0}).map(([h])=>h);if(f.length>0)for(const h of this.#r)(h.f&(ee|oe|ot))===0&&Er(h,f,l)&&((h.f&(za|Ee))!==0?(xn(h,_n),u.schedule(h)):u.add_dirty_reaction(h,_n));if(u.#s.length>0&&!u.#c){u.apply();for(var d of u.#f())u.#C(d,[],[])}u.deactivate()}}}}increment(e,a){if(this.#n+=1,e){let s=this.#o.get(a)??0;this.#o.set(a,s+1)}}decrement(e,a){if(this.#n-=1,e){let s=this.#o.get(a)??0;s===1?this.#o.delete(a):this.#o.set(a,s-1)}this.#c||(this.#c=!0,pa(()=>{this.#c=!1,this.linked&&this.flush()}))}transfer_reactions(e){for(const[a,s]of e)this.add_dirty_reaction(a,s);e.clear()}add_dirty_reaction(e,a){(a===_n||this.#t.get(e)!==_n)&&this.#t.set(e,a)}oncommit(e){this.#e.add(e)}ondiscard(e){this.#i.add(e)}settled(){return(this.#a??=wl()).promise}static ensure(){if(kn===null){const e=kn=new ma;Wt||pa(()=>{e.started||e.flush()})}return kn}apply(){{Le=null;return}}schedule(e){if(tr=e,e.b?.is_pending&&(e.f&(ja|Ws|Dl))!==0&&(e.f&ts)===0){e.b.defer_effect(e);return}this.#s.push(e)}#u(){if(this.linked){var e=this.prev,a=this.next;e===null?Ft=a:e.next=a,a===null?Ma=e:a.prev=e,this.linked=!1}}}function Uf(){try{Jf()}catch(n){xe(n,tr)}}let na=null;function lo(n){var e=n.length;if(e!==0){for(var a=0;a<e;){var s=n[a++];if((s.f&(ee|oe))===0&&Is(s)&&(na=new Set,ns(s),s.deps===null&&s.first===null&&s.nodes===null&&s.teardown===null&&s.ac===null&&$l(s),na?.size>0)){Ye.clear();for(const t of na){if((t.f&(ee|oe))!==0)continue;const r=[t];let o=t.parent;for(;o!==null;)na.has(o)&&(na.delete(o),r.push(o)),o=o.parent;for(let l=r.length-1;l>=0;l--){const i=r[l];(i.f&(ee|oe))===0&&ns(i)}}na.clear()}}na=null}}function Nl(n,e,a,s){if(!a.has(n)&&(a.add(n),n.reactions!==null))for(const t of n.reactions){const r=t.f;(r&se)!==0?Nl(t,e,a,s):(r&(za|Ee))!==0&&(r&_n)===0&&Er(t,e,s)&&(xn(t,_n),Lr(t))}}function Er(n,e,a){const s=a.get(n);if(s!==void 0)return s;if(n.deps!==null)for(const t of n.deps){if(Es.call(e,t))return!0;if((t.f&se)!==0&&Er(t,e,a))return a.set(t,!0),!0}return a.set(n,!1),!1}function Lr(n){kn.schedule(n)}function Il(n,e){if(!((n.f&We)!==0&&(n.f&Un)!==0)){(n.f&_n)!==0?e.d.push(n):(n.f&ve)!==0&&e.m.push(n),xn(n,Un);for(var a=n.first;a!==null;)Il(a,e),a=a.next}}function Hl(n){xn(n,Un);for(var e=n.first;e!==null;)Hl(e),e=e.next}let ct=new Set;const Ye=new Map;let Kl=!1;function Ea(n,e){var a={f:0,v:n,reactions:null,equals:Ml,rv:0,wv:0};return a}function pn(n,e){const a=Ea(n);return ai(a),a}function xl(n,e=!1,a=!0){const s=Ea(n);return e||(s.equals=_l),os&&a&&Gn!==null&&Gn.l!==null&&(Gn.l.s??=[]).push(s),s}function V(n,e,a=!1){Bn!==null&&(!Ae||(Bn.f&ot)!==0)&&Gs()&&(Bn.f&(se|Ee|za|ot))!==0&&(ze===null||!ze.has(n))&&Pf();let s=a?ea(e):e;return $a(n,s,at)}var Sa=null,rr=0;function $a(n,e,a=null){if(!n.equals(e)){ra?Ye.set(n,e):Ye.has(n)||Ye.set(n,n.v);var s=ma.ensure();if(s.capture(n,e),(n.f&se)!==0){const t=n;(n.f&_n)!==0&&Rr(t),Le===null&&Dr(t)}n.wv=ti(),Sa=null,rr=0,Ol(n,_n,a),Sa=null,Gs()&&yn!==null&&(yn.f&Un)!==0&&(yn.f&(We|va))===0&&(ye===null?ld([n]):ye.push(n)),!s.is_fork&&ct.size>0&&!Kl&&jf()}return e}function jf(){Kl=!1;for(const n of ct){(n.f&Un)!==0&&xn(n,ve);let e;try{e=Is(n)}catch{e=!0}e&&ns(n)}ct.clear()}function Ss(n){V(n,n.v+1)}function Ol(n,e,a){var s=n.reactions;if(s!==null){var t=Gs(),r=s.length;if(rr+=r,rr>1e5&&Sa===null&&(Sa=new Set),Sa!==null){if(Sa.has(n))return;Sa.add(n)}for(var o=0;o<r;o++){var l=s[o],i=l.f;if(!(!t&&l===yn)){var f=(i&_n)===0;if(f&&xn(l,e),(i&ot)!==0)ct.add(l);else if((i&se)!==0){var d=l;Le?.delete(d),Ol(d,ve,a)}else if(f){var u=l;(i&Ee)!==0&&na!==null&&na.add(u),a!==null?a.push(u):Lr(u)}}}}}function ea(n){if(typeof n!="object"||n===null||aa in n||Rl in n)return n;const e=Sr(n);if(e!==sf&&e!==tf)return n;var a=new Map,s=Tt(n),t=pn(0),r=Ra,o=l=>{if(Ra===r)return l();var i=Bn,f=Ra;Se(null),uo(r);var d=l();return Se(i),uo(f),d};return s&&a.set("length",pn(n.length)),new Proxy(n,{defineProperty(l,i,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&Ff();var d=a.get(i);return d===void 0?o(()=>{var u=pn(f.value);return a.set(i,u),u}):V(d,f.value,!0),!0},deleteProperty(l,i){var f=a.get(i);if(f===void 0){if(i in l){const d=o(()=>pn(zn));a.set(i,d),Ss(t)}}else V(f,zn),Ss(t);return!0},get(l,i,f){if(i===aa)return n;var d=a.get(i),u=i in l;if(d===void 0&&(!u||Ya(l,i)?.writable)&&(d=o(()=>{var p=ea(u?l[i]:zn),v=pn(p);return v}),a.set(i,d)),d!==void 0){var h=c(d);return h===zn?void 0:h}return Reflect.get(l,i,f)},getOwnPropertyDescriptor(l,i){this.has?.(l,i);var f=Reflect.getOwnPropertyDescriptor(l,i),d=a.get(i);if(d!==void 0){var u=c(d);if(u===zn)return;if(f&&"value"in f)f.value=u;else return{enumerable:!0,configurable:!0,value:u,writable:!0}}return f},has(l,i){if(i===aa)return!0;var f=a.get(i),d=f!==void 0&&f.v!==zn||Reflect.has(l,i);if(f!==void 0||(yn!==null||Bn!==null)&&(!d||Ya(l,i)?.writable)){f===void 0&&(f=o(()=>{var h=d?ea(l[i]):zn,p=pn(h);return p}),a.set(i,f));var u=c(f);if(u===zn)return!1}return d},set(l,i,f,d){var u=a.get(i),h=i in l;if(s&&i==="length")for(var p=f;p<u.v;p+=1){var v=a.get(p+"");v!==void 0?V(v,zn):p in l&&(v=o(()=>pn(zn)),a.set(p+"",v))}if(u===void 0)(!h||Ya(l,i)?.writable)&&(u=o(()=>pn(void 0)),V(u,ea(f)),a.set(i,u));else{h=u.v!==zn;var g=o(()=>ea(f));V(u,g)}var B=Reflect.getOwnPropertyDescriptor(l,i);if(B?.set&&B.set.call(d,f),!h){if(s&&typeof i=="string"){var T=a.get("length"),S=Number(i);Number.isInteger(S)&&S>=T.v&&V(T,S+1)}Ss(t)}return!0},ownKeys(l){c(t);var i=Reflect.ownKeys(l).filter(u=>{var h=a.get(u);return h===void 0||h.v!==zn});for(var[f,d]of a)d.v!==zn&&!(f in l)&&i.push(f);return i},setPrototypeOf(){Wf()}})}function io(n){try{if(n!==null&&typeof n=="object"&&aa in n)return n[aa]}catch{}return n}function Vl(n,e){return Object.is(io(n),io(e))}var co,Yl,zl,Ql;function qf(){if(co===void 0){co=window,Yl=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,a=Text.prototype;zl=Ya(e,"firstChild").get,Ql=Ya(e,"nextSibling").get,ro(n)&&(n[nr]=void 0,n[El]=null,n[er]=void 0,n.__e=void 0),ro(a)&&(a[ar]=void 0)}}function sa(n=""){return document.createTextNode(n)}function As(n){return zl.call(n)}function Ns(n){return Ql.call(n)}function P(n,e){return As(n)}function Dn(n,e=!1){{var a=As(n);return a instanceof Comment&&a.data===""?Ns(a):a}}function k(n,e=!1){return As(n)}function m(n,e=1,a=!1){let s=n;for(;e--;)s=Ns(s);return s}function Zf(n){n.textContent=""}function Ul(){return!1}function Xf(n,e,a){return a?document.createElement(n,{is:a}):document.createElement(n)}function $f(n){var e=yn;if(e===null)return Bn.f|=ha,n;if((e.f&ts)===0&&(e.f&ja)===0)throw n;xe(n,e)}function xe(n,e){if(n===Al)throw n;if(!(e!==null&&(e.f&ee)!==0)){for(;e!==null;){if((e.f&$t)!==0&&(e.f&(ee|Ls))===0){if((e.f&ts)===0)throw n;try{e.b.error(n);return}catch(a){n=a}}e=e.parent}throw n}}function jl(n){yn===null&&(Bn===null&&Mf(),Af()),ra&&Lf()}function nd(n,e){var a=e.last;a===null?e.last=e.first=n:(a.next=n,n.prev=a,e.last=n)}function qe(n,e){var a=yn;a!==null&&(a.f&oe)!==0&&(n|=oe);var s={ctx:Gn,deps:null,nodes:null,f:n|_n|Je,first:null,fn:e,last:null,next:null,parent:a,b:a&&a.b,prev:null,teardown:null,wv:0,ac:null};kn?.register_created_effect(s);var t=s;if((n&ja)!==0)Ts!==null?Ts.push(s):ma.ensure().schedule(s);else if(e!==null){try{ns(s)}catch(o){throw fe(s),o}t.deps===null&&t.teardown===null&&t.nodes===null&&t.first===t.last&&(t.f&rs)===0&&(t=t.first,(n&Ee)!==0&&(n&qa)!==0&&t!==null&&(t.f|=qa))}if(t!==null&&(t.parent=a,a!==null&&nd(t,a),Bn!==null&&(Bn.f&se)!==0&&(n&va)===0)){var r=Bn;(r.effects??=[]).push(t)}return s}function Ar(){return Bn!==null&&!Ae}function Mr(n){const e=qe(Ws,null);return xn(e,Un),e.teardown=n,e}function Ms(n){jl();var e=yn.f,a=!Bn&&(e&We)!==0&&Gn!==null&&!Gn.i;if(a){var s=Gn;(s.e??=[]).push(n)}else return ql(n)}function ql(n){return qe(ja|bl,n)}function ed(n){return jl(),qe(Ws|bl,n)}function ad(n){ma.ensure();const e=qe(va|rs,n);return(a={})=>new Promise(s=>{a.outro?ba(e,()=>{fe(e),s(void 0)}):(fe(e),s(void 0))})}function sd(n){return qe(ja,n)}function td(n){return qe(za|rs,n)}function Zl(n,e=0){return qe(Ws|e,n)}function K(n,e=[],a=[],s=[]){xf(s,e,a,t=>{qe(Ws,()=>{n(...t.map(c))})})}function Jr(n,e=0){var a=qe(Ee|e,n);return a}function Te(n){return qe(We|rs,n)}function Xl(n){var e=n.teardown;if(e!==null){const a=ra,s=Bn;fo(!0),Se(null);try{e.call(null)}catch(t){xe(t,n.parent)}finally{fo(a),Se(s)}}}function _r(n,e=!1){var a=n.first;for(n.first=n.last=null;a!==null;){const t=a.ac;t!==null&&kt(()=>{t.abort(Ps)});var s=a.next;(a.f&va)!==0?a.parent=null:fe(a,e),a=s}}function rd(n){for(var e=n.first;e!==null;){var a=e.next;(e.f&We)===0&&fe(e),e=a}}function fe(n,e=!0){var a=!1;(e||(n.f&lf)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(od(n.nodes.start,n.nodes.end),a=!0),n.f|=Ls,_r(n,e&&!a),Js(n,0);var s=n.nodes&&n.nodes.t;if(s!==null)for(const r of s)r.stop();Xl(n),n.f^=Ls,n.f|=ee;var t=n.parent;t!==null&&t.first!==null&&$l(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function od(n,e){for(;n!==null;){var a=n===e?null:Ns(n);n.remove(),n=a}}function $l(n){var e=n.parent,a=n.prev,s=n.next;a!==null&&(a.next=s),s!==null&&(s.prev=a),e!==null&&(e.first===n&&(e.first=s),e.last===n&&(e.last=a))}function ba(n,e,a=!0){var s=[];n.f|=kr,ni(n,s,!0);var t=()=>{a&&fe(n),e&&e()},r=s.length;if(r>0){var o=()=>--r||t();for(var l of s)l.out(o)}else t()}function ni(n,e,a){if((n.f&oe)===0){n.f^=oe;var s=n.nodes&&n.nodes.t;if(s!==null)for(const l of s)(l.is_global||a)&&e.push(l);for(var t=n.first;t!==null;){var r=t.next;if((t.f&va)===0){var o=(t.f&qa)!==0||(t.f&We)!==0&&(n.f&Ee)!==0;ni(t,e,o?a:!1)}t=r}}}function ft(n){n.f&=~kr,ei(n,!0)}function ei(n,e){if((n.f&kr)===0&&(n.f&oe)!==0){n.f^=oe,(n.f&Un)===0&&(xn(n,_n),ma.ensure().schedule(n));for(var a=n.first;a!==null;){var s=a.next,t=(a.f&qa)!==0||(a.f&We)!==0;ei(a,t?e:!1),a=s}var r=n.nodes&&n.nodes.t;if(r!==null)for(const o of r)(o.is_global||e)&&o.in()}}function Fr(n,e){if(n.nodes)for(var a=n.nodes.start,s=n.nodes.end;a!==null;){var t=a===s?null:Ns(a);e.append(a),a=t}}let ra=!1;function fo(n){ra=n}let Bn=null,Ae=!1;function Se(n){Bn=n}let yn=null;function Ue(n){yn=n}let ze=null;function ai(n){Bn!==null&&((Bn.f&lt)!==0||(Bn.f&se)!==0)&&(ze??=new Set).add(n)}let ce=null,he=0,ye=null;function ld(n){ye=n}let si=1,ka=0,Ra=ka;function uo(n){Ra=n}function ti(){return++si}function Is(n){var e=n.f;if((e&_n)!==0)return!0;if((e&ve)!==0){for(var a=n.deps,s=a.length,t=0;t<s;t++){var r=a[t];if(Is(r)&&Pl(r),r.wv>n.wv)return!0}(e&Je)!==0&&Le===null&&xn(n,Un)}return!1}function ri(n,e,a=!0){var s=n.reactions;if(s!==null&&!(ze!==null&&ze.has(n)))for(var t=0;t<s.length;t++){var r=s[t];(r.f&se)!==0?ri(r,e,!1):e===r&&(a?xn(r,_n):(r.f&Un)!==0&&xn(r,ve),Lr(r))}}function oi(n){var e=ce,a=he,s=ye,t=Bn,r=ze,o=Gn,l=Ae,i=Ra,f=n.f;ce=null,he=0,ye=null,Bn=(f&(We|va))===0?n:null,ze=null,Za(n.ctx),Ae=!1,Ra=++ka,n.ac!==null&&(kt(()=>{n.ac.abort(Ps)}),n.ac=null);try{n.f|=lt;var d=n.fn,u=d();n.f|=ts;var h=po(n);if(Gs()&&ye!==null&&!Ae&&h!==null&&(n.f&(se|ve|_n))===0)for(var p=0;p<ye.length;p++)ri(ye[p],n);if(t!==null&&t!==n){if(ka++,t.deps!==null)for(let v=0;v<a;v+=1)t.deps[v].rv=ka;if(e!==null)for(const v of e)v.rv=ka;ye!==null&&(s===null?s=ye:s.push(...ye))}return(n.f&ha)!==0&&(n.f^=ha),u}catch(v){return po(n),$f(v)}finally{n.f^=lt,ce=e,he=a,ye=s,Bn=t,ze=r,Za(o),Ae=l,Ra=i}}function po(n){var e=n.deps,a=kn?.is_fork;if(ce!==null){var s;if(a||Js(n,he),e!==null&&he>0)for(e.length=he+ce.length,s=0;s<ce.length;s++)e[he+s]=ce[s];else n.deps=e=ce;if(Ar()&&(n.f&Je)!==0)for(s=he;s<e.length;s++)(e[s].reactions??=[]).push(n)}else!a&&e!==null&&he<e.length&&(Js(n,he),e.length=he);return e}function id(n,e){let a=e.reactions;if(a!==null){var s=af.call(a,n);if(s!==-1){var t=a.length-1;t===0?a=e.reactions=null:(a[s]=a[t],a.pop())}}if(a===null&&(e.f&se)!==0&&(ce===null||!Es.call(ce,e))){var r=e;(r.f&Je)!==0&&(r.f^=Je),r.v!==zn&&Dr(r),r.ac!==null&&kt(()=>{r.ac.abort(Ps),r.ac=null,xn(r,_n)}),zf(r),Js(r,0)}}function Js(n,e){var a=n.deps;if(a!==null)for(var s=e;s<a.length;s++)id(n,a[s])}function ns(n){var e=n.f;if((e&ee)===0){xn(n,Un);var a=yn;yn=n;try{(e&(Ee|Dl))!==0?rd(n):_r(n),Xl(n);var s=oi(n);n.teardown=typeof s=="function"?s:null,n.wv=si;var t;Sl&&Nf&&(n.f&_n)!==0&&n.deps}finally{yn=a}}}function c(n){var e=n.f,a=(e&se)!==0;if(Bn!==null&&!Ae){var s=yn!==null&&(yn.f&ee)!==0;if(!s&&(ze===null||!ze.has(n))){var t=Bn.deps;if((Bn.f&lt)!==0)n.rv<ka&&(n.rv=ka,ce===null&&t!==null&&t[he]===n?he++:ce===null?ce=[n]:ce.push(n));else{Bn.deps??=[],Es.call(Bn.deps,n)||Bn.deps.push(n);var r=n.reactions;r===null?n.reactions=[Bn]:Es.call(r,Bn)||r.push(Bn)}}}if(ra&&Ye.has(n))return Ye.get(n);if(a){var o=n;if(ra){var l=o.v;return((o.f&Un)===0&&o.reactions!==null||ii(o))&&(l=Rr(o)),Ye.set(o,l),l}var i=(o.f&Je)===0&&!Ae&&Bn!==null&&(Bn.f&Je)!==0,f=(o.f&ts)===0;Is(o)&&(i&&(o.f|=Je),Pl(o)),i&&!f&&(Gl(o),li(o))}if(Le?.has(n))return Le.get(n);if((n.f&ha)!==0)throw n.v;return n.v}function li(n){if(n.f|=Je,n.deps!==null)for(const a of n.deps){var e=a.reactions;e===null?a.reactions=[n]:Es.call(e,n)||e.push(n),(a.f&se)!==0&&(a.f&Je)===0&&(Gl(a),li(a))}}function ii(n){if(n.v===zn)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(Ye.has(e)||(e.f&se)!==0&&ii(e))return!0;return!1}function ls(n){var e=Ae;try{return Ae=!0,n()}finally{Ae=e}}function cd(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(aa in n)or(n);else if(!Array.isArray(n))for(let e in n){const a=n[e];typeof a=="object"&&a&&aa in a&&or(a)}}}function or(n,e=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!e.has(n)){e.add(n),n instanceof Date&&n.getTime();for(let s in n)try{or(n[s],e)}catch{}const a=Sr(n);if(a!==Object.prototype&&a!==Array.prototype&&a!==Map.prototype&&a!==Set.prototype&&a!==Date.prototype){const s=kl(a);for(let t in s){const r=s[t].get;if(r)try{r.call(n)}catch{}}}}}const fd=["touchstart","touchmove"];function dd(n){return fd.includes(n)}const ms=Symbol("events"),ci=new Set,lr=new Set;function on(n,e,a){(e[ms]??={})[n]=a}function On(n){for(var e=0;e<n.length;e++)ci.add(n[e]);for(var a of lr)a(n)}let Pt=null,Gt=!1;function ho(n){var e=this,a=e.ownerDocument,s=n.type,t=n.composedPath?.()||[],r=t[0]||n.target;Pt=n,Gt||(Gt=!0,setTimeout(()=>{Gt=!1,Pt=null}));var o=0,l=Pt===n&&n[ms];if(l){var i=t.indexOf(l);if(i!==-1&&(e===document||e===window)){n[ms]=e;return}var f=t.indexOf(e);if(f===-1)return;i<=f&&(o=i)}if(r=t[o]||n.target,r!==e){Tr(n,"currentTarget",{configurable:!0,get(){return r||a}});var d=Bn,u=yn;Se(null),Ue(null);try{for(var h,p=[];r!==null&&r!==e;){try{var v=r[ms]?.[s];v!=null&&(!r.disabled||n.target===r)&&v.call(r,n)}catch(g){h?p.push(g):h=g}if(n.cancelBubble)break;o++,r=o<t.length?t[o]:null}if(h){for(let g of p)queueMicrotask(()=>{throw g});throw h}}finally{n[ms]=e,delete n.currentTarget,Se(d),Ue(u)}}}const ud=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function pd(n){return ud?.createHTML(n)??n}function hd(n){var e=Xf("template");return e.innerHTML=pd(n.replaceAll("<!>","<!---->")),e.content}function dt(n,e){var a=yn;a.nodes===null&&(a.nodes={start:n,end:e,a:null,t:null})}function M(n,e){var a=(e&yf)!==0,s=(e&Tf)!==0,t,r=!n.startsWith("<!>");return()=>{t===void 0&&(t=hd(r?n:"<!>"+n),a||(t=As(t)));var o=s||Yl?document.importNode(t,!0):t.cloneNode(!0);if(a){var l=As(o),i=o.lastChild;dt(l,i)}else dt(o,o);return o}}function zs(n=""){{var e=sa(n+"");return dt(e,e),e}}function fi(){var n=document.createDocumentFragment(),e=document.createComment(""),a=sa();return n.append(e,a),dt(e,a),n}function L(n,e){n!==null&&n.before(e)}function vd(n){let e=0,a=Ea(0),s;return()=>{Ar()&&(c(a),Zl(()=>(e===0&&(s=ls(()=>n(()=>Ss(a)))),e+=1,()=>{pa(()=>{e-=1,e===0&&(s?.(),s=void 0,Ss(a))})})))}}var md=qa|rs;function gd(n,e,a,s){new Bd(n,e,a,s)}class Bd{parent;is_pending=!1;transform_error;#e;#i=null;#n;#o;#a;#s=null;#r=null;#t=null;#l=null;#p=0;#c=0;#h=!1;#g=new Map;#f=null;#v=vd(()=>(this.#f=Ea(this.#p),()=>{this.#f=null}));constructor(e,a,s,t){this.#e=e,this.#n=a,this.#o=r=>{var o=yn;o.b=this,o.f|=$t,s(r)},this.parent=yn.b,this.transform_error=t??this.parent?.transform_error??(r=>r),this.#a=Jr(()=>{this.#y()},md)}#C(){try{this.#s=Te(()=>this.#o(this.#e))}catch(e){this.error(e)}}#S(e){const a=this.#n.failed,{reset:s,invoke_onerror:t}=this.#B(e);pa(t),a&&(this.#t=Te(()=>{a(this.#e,()=>e,()=>s)}))}#B(e){var a=!1,s=!1;const t=()=>{if(!this.#d()){if(a){Df();return}a=!0,s&&Gf(),this.#t!==null&&ba(this.#t,()=>{this.#t=null}),this.#T(()=>{this.#y()})}};return{reset:t,invoke_onerror:()=>{if(!this.#d())try{s=!0,this.#n.onerror?.(e,t),s=!1}catch(o){xe(o,this.#a&&this.#a.parent)}}}}#d(){return(this.#a.f&(ee|Ls))!==0}#m(){const e=this.#n.pending;e&&(this.is_pending=!0,this.#r=Te(()=>e(this.#e)),pa(()=>{if(!this.#d()){var a=this.#l=document.createDocumentFragment(),s=sa(),t=!1;if(a.append(s),this.#s=this.#T(()=>{try{return Te(()=>this.#o(s))}catch(r){try{this.error(r),t=!0}catch(o){xe(o,this.#a.parent)}return null}}),this.#s===null){this.#l=null,t&&this.#u(kn);return}this.#c===0&&(this.#e.before(a),this.#l=null,ba(this.#r,()=>{this.#r=null}),this.#u(kn))}}))}#y(){try{if(this.is_pending=this.has_pending_snippet(),this.#c=0,this.#p=0,this.#s=Te(()=>{this.#o(this.#e)}),this.#c>0){var e=this.#l=document.createDocumentFragment();Fr(this.#s,e);const a=this.#n.pending;this.#r=Te(()=>a(this.#e))}else this.#u(kn)}catch(a){this.error(a)}}#u(e){this.is_pending=!1,e.transfer_reactions(this.#g)}defer_effect(e){Fl(e,this.#g)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#T(e){var a=yn,s=Bn,t=Gn;Ue(this.#a),Se(this.#a),Za(this.#a.ctx);try{return ma.ensure(),e()}finally{Ue(a),Se(s),Za(t)}}#k(e,a){if(!this.has_pending_snippet()){this.parent&&this.parent.#k(e,a);return}this.#c+=e,this.#c===0&&(this.#u(a),this.#r&&ba(this.#r,()=>{this.#r=null}),this.#l&&(this.#e.before(this.#l),this.#l=null))}update_pending_count(e,a){this.#k(e,a),this.#p+=e,!(!this.#f||this.#h)&&(this.#h=!0,pa(()=>{this.#h=!1,this.#f&&$a(this.#f,this.#p)}))}get_effect_pending(){return this.#v(),c(this.#f)}error(e){if(e===Al||!this.#n.onerror&&!this.#n.failed)throw e;kn?.is_fork?(this.#s&&kn.skip_effect(this.#s),this.#r&&kn.skip_effect(this.#r),this.#t&&kn.skip_effect(this.#t),kn.oncommit(()=>{this.#d()||this.#w(e)})):this.#w(e)}#w(e){this.#s&&(fe(this.#s),this.#s=null),this.#r&&(fe(this.#r),this.#r=null),this.#t&&(fe(this.#t),this.#t=null);let a=this.#n.failed;const s=t=>{if(this.#d())return;const{reset:r,invoke_onerror:o}=this.#B(t);o(),a&&!this.#d()&&(this.#t=this.#T(()=>{try{return Te(()=>{var l=yn;l.b=this,l.f|=$t,a(this.#e,()=>t,()=>r)})}catch(l){return xe(l,this.#a.parent),null}}))};pa(()=>{if(!this.#d()){var t;try{t=this.transform_error(e)}catch(r){xe(r,this.#a&&this.#a.parent);return}t!==null&&typeof t=="object"&&typeof t.then=="function"?t.then(s,r=>xe(r,this.#a&&this.#a.parent)):s(t)}})}}function y(n,e){var a=e==null?"":typeof e=="object"?`${e}`:e;a!==(n[ar]??=n.nodeValue)&&(n[ar]=a,n.nodeValue=`${a}`)}function Cd(n,e){return yd(n,e)}const Qs=new Map;function yd(n,{target:e,anchor:a,props:s={},events:t,context:r,intro:o=!0,transformError:l}){qf();var i=void 0,f=ad(()=>{var d=a??e.appendChild(sa());gd(d,{pending:()=>{}},p=>{Rn({});var v=Gn;r&&(v.c=r),t&&(s.$$events=t),i=n(p,s)||wr(),En()},l);var u=new Set,h=p=>{for(var v=0;v<p.length;v++){var g=p[v];if(!u.has(g)){u.add(g);var B=dd(g);for(const w of[e,document]){var T=Qs.get(w);T===void 0&&(T=new Map,Qs.set(w,T));var S=T.get(g);S===void 0?(w.addEventListener(g,ho,{passive:B}),T.set(g,1)):T.set(g,S+1)}}}};return h(St(ci)),lr.add(h),()=>{for(var p of u)for(const B of[e,document]){var v=Qs.get(B),g=v.get(p);--g==0?(B.removeEventListener(p,ho),v.delete(p),v.size===0&&Qs.delete(B)):v.set(p,g)}lr.delete(h),d!==a&&d.parentNode?.removeChild(d)}});return Td.set(i,f),i}let Td=new WeakMap;class Sd{anchor;#e=new Map;#i=new Map;#n=new Map;#o=new Set;#a=!0;constructor(e,a=!0){this.anchor=e,this.#a=a}#s=e=>{if(this.#e.has(e)){var a=this.#e.get(e),s=this.#i.get(a);if(s)ft(s),this.#o.delete(a);else{var t=this.#n.get(a);t&&(ft(t.effect),this.#i.set(a,t.effect),this.#n.delete(a),t.fragment.lastChild.remove(),this.anchor.before(t.fragment),s=t.effect)}for(const[r,o]of this.#e){if(this.#e.delete(r),r===e)break;const l=this.#n.get(o);l&&(fe(l.effect),this.#n.delete(o))}for(const[r,o]of this.#i){if(r===a||this.#o.has(r))continue;const l=()=>{if(Array.from(this.#e.values()).includes(r)){var f=document.createDocumentFragment();Fr(o,f),f.append(sa()),this.#n.set(r,{effect:o,fragment:f})}else fe(o);this.#o.delete(r),this.#i.delete(r)};this.#a||!s?(this.#o.add(r),ba(o,l,!1)):l()}}};#r=e=>{this.#e.delete(e);const a=Array.from(this.#e.values());for(const[s,t]of this.#n)a.includes(s)||(fe(t.effect),this.#n.delete(s))};ensure(e,a){var s=kn,t=Ul();if(a&&!this.#i.has(e)&&!this.#n.has(e))if(t){var r=document.createDocumentFragment(),o=sa();r.append(o),this.#n.set(e,{effect:Te(()=>a(o)),fragment:r})}else this.#i.set(e,Te(()=>a(this.anchor)));if(this.#e.set(s,e),t){for(const[l,i]of this.#i)l===e?s.unskip_effect(i):s.skip_effect(i);for(const[l,i]of this.#n)l===e?s.unskip_effect(i.effect):s.skip_effect(i.effect);s.oncommit(this.#s),s.ondiscard(this.#r)}else this.#s(s)}}function en(n,e,a=!1){var s=new Sd(n),t=a?qa:0;function r(o,l){s.ensure(o,l)}Jr(()=>{var o=!1;e((l,i=0)=>{o=!0,r(i,l)}),o||r(-1,null)},t)}function is(n,e){return e}function kd(n,e,a){for(var s=[],t=e.length,r,o=e.length,l=0;l<t;l++){let u=e[l];ba(u,()=>{if(r){if(r.pending.delete(u),r.done.add(u),r.pending.size===0){var h=n.outrogroups;ir(n,St(r.done)),h.delete(r),h.size===0&&(n.outrogroups=null)}}else o-=1},!1)}if(o===0){var i=s.length===0&&a!==null&&n.pending.size===0;if(i){var f=a,d=f.parentNode;Zf(d),d.append(f),n.items.clear()}ir(n,e,!i)}else r={pending:new Set(e),done:new Set},(n.outrogroups??=new Set).add(r)}function ir(n,e,a=!0){var s;if(n.pending.size>0){s=new Set;for(const o of n.pending.values())for(const l of o)s.add(n.items.get(l).e)}for(var t=0;t<e.length;t++){var r=e[t];if(s?.has(r)){r.f|=Oe;const o=document.createDocumentFragment();Fr(r,o)}else fe(e[t],a)}}var vo;function hn(n,e,a,s,t,r=null){var o=n,l=new Map,i=(e&Ll)!==0;if(i){var f=n;o=f.appendChild(sa())}var d=null,u=br(()=>{var S=a();return Tt(S)?S:S==null?[]:St(S)}),h=new Map,p=!0;function v(S){if((T.effect.f&ee)===0){T.pending.delete(S);var w=c(u);T.fallback=d,wd(T,w,o,e,s),d!==null&&(w.length===0?(d.f&Oe)===0?ft(d):(d.f^=Oe,gs(d,null,o)):ba(d,()=>{d=null}))}}function g(S){T.pending.delete(S)}var B=Jr(()=>{for(var S=c(u),w=S.length,D=new Set,C=kn,E=Ul(),F=0;F<w;F+=1){var G=S[F],A=s(G,F),J=p?null:l.get(A);J?(J.v&&$a(J.v,G),J.i&&$a(J.i,F),E&&C.unskip_effect(J.e)):(J=Dd(l,p?o:vo??=sa(),G,A,F,t,e,a),p||(J.e.f|=Oe),l.set(A,J)),D.add(A)}if(w===0&&r&&!d&&(p?d=Te(()=>r(o)):(d=Te(()=>r(vo??=sa())),d.f|=Oe)),w>D.size&&Ef(),!p)if(h.set(C,D),E){for(const[N,O]of l)D.has(N)||C.skip_effect(O.e);C.oncommit(v),C.ondiscard(g)}else v(C);c(u)}),T={effect:B,items:l,pending:h,outrogroups:null,fallback:d};p=!1}function ps(n){for(;n!==null&&(n.f&We)===0;)n=n.next;return n}function wd(n,e,a,s,t){var r=(s&pf)!==0,o=e.length,l=n.items,i=ps(n.effect.first),f,d=null,u,h=[],p=[],v,g,B,T;if(r)for(T=0;T<o;T+=1)v=e[T],g=t(v,T),B=l.get(g).e,(B.f&Oe)===0&&(B.nodes?.a?.measure(),(u??=new Set).add(B));for(T=0;T<o;T+=1){if(v=e[T],g=t(v,T),B=l.get(g).e,n.outrogroups!==null)for(const J of n.outrogroups)J.pending.delete(B),J.done.delete(B);if((B.f&oe)!==0&&(ft(B),r&&(B.nodes?.a?.unfix(),(u??=new Set).delete(B))),(B.f&Oe)!==0)if(B.f^=Oe,B===i)gs(B,null,a);else{var S=d?d.next:i;B===n.effect.last&&(n.effect.last=B.prev),B.prev&&(B.prev.next=B.next),B.next&&(B.next.prev=B.prev),ca(n,d,B),ca(n,B,S),gs(B,S,a),d=B,h=[],p=[],i=ps(d.next);continue}if(B!==i){if(f!==void 0&&f.has(B)){if(h.length<p.length){var w=p[0],D;d=w.prev;var C=h[0],E=h[h.length-1];for(D=0;D<h.length;D+=1)gs(h[D],w,a);for(D=0;D<p.length;D+=1)f.delete(p[D]);ca(n,C.prev,E.next),ca(n,d,C),ca(n,E,w),i=w,d=E,T-=1,h=[],p=[]}else f.delete(B),gs(B,i,a),ca(n,B.prev,B.next),ca(n,B,d===null?n.effect.first:d.next),ca(n,d,B),d=B;continue}for(h=[],p=[];i!==null&&i!==B;)(f??=new Set).add(i),p.push(i),i=ps(i.next);if(i===null)continue}(B.f&Oe)===0&&h.push(B),d=B,i=ps(B.next)}if(n.outrogroups!==null){for(const J of n.outrogroups)J.pending.size===0&&(ir(n,St(J.done)),n.outrogroups?.delete(J));n.outrogroups.size===0&&(n.outrogroups=null)}if(i!==null||f!==void 0){var F=[];if(f!==void 0)for(B of f)(B.f&oe)===0&&F.push(B);for(;i!==null;)(i.f&oe)===0&&i!==n.fallback&&F.push(i),i=ps(i.next);var G=F.length;if(G>0){var A=(s&Ll)!==0&&o===0?a:null;if(r){for(T=0;T<G;T+=1)F[T].nodes?.a?.measure();for(T=0;T<G;T+=1)F[T].nodes?.a?.fix()}kd(n,F,A)}}r&&pa(()=>{if(u!==void 0)for(B of u)B.nodes?.a?.apply()})}function Dd(n,e,a,s,t,r,o,l){var i=(o&df)!==0?(o&hf)===0?xl(a,!1,!1):Ea(a):null,f=(o&uf)!==0?Ea(t):null;return{v:i,i:f,e:Te(()=>(r(e,i??a,f??t,l),()=>{n.delete(s)}))}}function gs(n,e,a){if(n.nodes)for(var s=n.nodes.start,t=n.nodes.end,r=e&&(e.f&Oe)===0?e.nodes.start:a;s!==null;){var o=Ns(s);if(r.before(s),s===t)return;s=o}}function ca(n,e,a){e===null?n.effect.first=a:e.next=a,a===null?n.effect.last=e:a.prev=e}const mo=[...` 	
\r\f \v\uFEFF`];function bd(n,e,a){var s=n==null?"":""+n;if(e&&(s=s?s+" "+e:e),a){for(var t of Object.keys(a))if(a[t])s=s?s+" "+t:t;else if(s.length)for(var r=t.length,o=0;(o=s.indexOf(t,o))>=0;){var l=o+r;(o===0||mo.includes(s[o-1]))&&(l===s.length||mo.includes(s[l]))?s=(o===0?"":s.substring(0,o))+s.substring(l+1):o=l}}return s===""?null:s}function Rd(n,e){return n==null?null:String(n)}function Nn(n,e,a,s,t,r){var o=n[nr];if(o!==a||o===void 0){var l=bd(a,s,r);l==null?n.removeAttribute("class"):n.className=l,n[nr]=a}else if(r&&t!==r)for(var i in r){var f=!!r[i];(t==null||f!==!!t[i])&&n.classList.toggle(i,f)}return r}function Ne(n,e,a,s){var t=n[er];if(t!==e){var r=Rd(e);r==null?n.removeAttribute("style"):n.style.cssText=r,n[er]=e}return s}function Ed(n,e){e?n.hasAttribute("selected")||n.setAttribute("selected",""):n.removeAttribute("selected")}function Ld(n,e){var a=n.__defaultValue,s=n.multiple,t=s?a??[]:null;if(!(s&&!Tt(t))){n.selectedIndex;for(var r of n.options){var o=cr(r);Ed(r,s?t.includes(o):Vl(o,a))}}}function di(n,e,a=!1){if(n.multiple){if(e==null)return;if(!Tt(e))return wf();for(var s of n.options)s.selected=e.includes(cr(s));return}for(s of n.options){var t=cr(s);if(Vl(t,e)){s.selected=!0;return}}(!a||e!==void 0)&&(n.selectedIndex=-1)}function Ad(n){var e=new MutationObserver(a=>{a.every(Md)||("__defaultValue"in n&&Ld(n),"__value"in n&&di(n,n.__value))});e.observe(n,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Mr(()=>{e.disconnect()})}function cr(n){return"__value"in n?n.__value:n.value}function Md(n){if(n.target.closest("selectedcontent")!==null)return!0;if(n.type==="childList"){var e=[...n.addedNodes,...n.removedNodes];return e.length>0&&e.every(a=>a.nodeName==="SELECTEDCONTENT")}return!1}const Jd=Symbol("is custom element"),_d=Symbol("is html");function go(n,e){var a=ui(n);a.checked!==(a.checked=e??void 0)&&(n.checked=e)}function fn(n,e,a,s){var t=ui(n),r=t[e];r!==(t[e]=a)&&(e==="loading"&&(n[ff]=a),a==null?n.removeAttribute(e):typeof a!="string"&&Fd(n).has(e)?n[e]=a:n.setAttribute(e,a))}function ui(n){return n[El]??={[Jd]:n.nodeName.includes("-"),[_d]:n.namespaceURI===Sf}}var Bo=new Map;function Fd(n){var e=n.getAttribute("is")||n.nodeName,a=Bo.get(e);if(a)return a;Bo.set(e,a=new Set);for(var s,t=n,r=Element.prototype;r!==t;){s=kl(t);for(var o in s)s[o].set&&o!=="innerHTML"&&o!=="textContent"&&o!=="innerText"&&a.add(o);t=Sr(t)}return a}function Nt(n,e){return n===e||n?.[aa]===e}function Wd(n=wr(),e,a,s){var t=Gn.r,r=yn;return sd(()=>{var o,l;return Zl(()=>{o=l,l=[],ls(()=>{Nt(a(...l),n)||(e(n,...l),o&&Nt(a(...o),n)&&e(null,...o))})}),()=>{let i=r;for(;i!==t&&i.parent!==null&&i.parent.f&Ls;)i=i.parent;const f=()=>{l&&Nt(a(...l),n)&&e(null,...l)},d=i.teardown;i.teardown=()=>{f(),d?.()}}}),n}function Pd(n=!1){const e=Gn,a=e.l.u;if(!a)return;let s=()=>cd(e.s);if(n){let t=0,r={};const o=Xa(()=>{let l=!1;const i=e.s;for(const f in i)i[f]!==r[f]&&(r[f]=i[f],l=!0);return l&&t++,t});s=()=>c(o)}a.b.length&&ed(()=>{Co(e,s),Xt(a.b)}),Ms(()=>{const t=ls(()=>a.m.map(rf));return()=>{for(const r of t)typeof r=="function"&&r()}}),a.a.length&&Ms(()=>{Co(e,s),Xt(a.a)})}function Co(n,e){if(n.l.s)for(const a of n.l.s)c(a);e()}function pi(n,e,a){if(n==null)return e(void 0),Da;const s=ls(()=>n.subscribe(e,a));return s.unsubscribe?()=>s.unsubscribe():s}const Ja=[];function hi(n,e){return{subscribe:Wr(n,e).subscribe}}function Wr(n,e=Da){let a=null;const s=new Set;function t(l){if(Jl(n,l)&&(n=l,a)){const i=!Ja.length;for(const f of s)f[1](),Ja.push(f,n);if(i){for(let f=0;f<Ja.length;f+=2)Ja[f][0](Ja[f+1]);Ja.length=0}}}function r(l){t(l(n))}function o(l,i=Da){const f=[l,i];return s.add(f),s.size===1&&(a=e(t,r)||Da),l(n),()=>{s.delete(f),s.size===0&&a&&(a(),a=null)}}return{set:t,update:r,subscribe:o}}function Gd(n){let e;return pi(n,a=>e=a)(),e}let Us=!1,fr=Symbol("unmounted");function Ie(n,e,a){const s=a[e]??={store:null,source:xl(void 0),unsubscribe:Da};if(s.store!==n&&!(fr in a))if(s.unsubscribe(),s.store=n??null,n==null)s.source.v=void 0,s.unsubscribe=Da;else{var t=!0;s.unsubscribe=pi(n,r=>{t?s.source.v=r:V(s.source,r)}),t=!1}return n&&fr in a?Gd(n):c(s.source)}function Nd(){const n={};function e(){Mr(()=>{for(var a in n)n[a].unsubscribe();Tr(n,fr,{enumerable:!1,value:!0})})}return[n,e]}function Id(n){var e=Us;try{return Us=!1,[n(),Us]}finally{Us=e}}function Kn(n,e,a,s){var t=!os||(a&mf)!==0,r=(a&Bf)!==0,o=(a&Cf)!==0,l=s,i=!0,f=void 0,d=()=>o&&t?(f??=Xa(s),c(f)):(i&&(i=!1,l=o?ls(s):s),l);let u;if(r){var h=aa in n||cf in n;u=Ya(n,e)?.set??(h&&e in n?D=>n[e]=D:void 0)}var p,v=!1;r?[p,v]=Id(()=>n[e]):p=n[e],p===void 0&&s!==void 0&&(p=d(),u&&(t&&_f(),u(p)));var g;if(t?g=()=>{var D=n[e];return D===void 0?d():(i=!0,D)}:g=()=>{var D=n[e];return D!==void 0&&(l=void 0),D===void 0?l:D},t&&(a&gf)===0)return g;if(u){var B=n.$$legacy;return(function(D,C){return arguments.length>0?((!t||!C||B||v)&&u(C?g():D),D):g()})}var T=!1,S=((a&vf)!==0?Xa:br)(()=>(T=!1,g()));r&&c(S);var w=yn;return(function(D,C){if(arguments.length>0){const E=C?c(S):t&&r?ea(D):D;return V(S,E),T=!0,l!==void 0&&(l=E),D}return ra&&T||(w.f&ee)!==0?S.v:c(S)})}function Hd(n){Gn===null&&bf(),os&&Gn.l!==null?Kd(Gn).m.push(n):Ms(()=>{const e=ls(n);if(typeof e=="function")return e})}function Kd(n){var e=n.l;return e.u??={a:[],b:[],m:[]}}const xd="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(xd);const yo=`name,pos,team,ovr,spd,str
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
`,Od=`name,pos,team,ovr,spd,str
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
`,Vd=`pid,name,pos,team
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
`,vi="sim",Yd=/^[a-z][a-z0-9]*$/,zd=/^[a-z0-9][a-z0-9-]*$/i,Qd=["theme","settings","profile"];function Hs(n,e){if(!Yd.test(n))throw new Error("keys: bad sport id "+n);if(e===""||!e.split(":").every(a=>zd.test(a)))throw new Error("keys: bad key name "+e);if(Qd.includes(n))throw new Error("keys: a sport cannot be called "+n);return`${vi}:${n}:${e}`}const Ud=n=>n.startsWith(vi+":"),jd=["A","B","C"];function qd(n){const e=n.split(":"),a=e[3];return e.length<4||e[2]!=="slot"||a===void 0?null:jd.includes(a)?a:null}const mi=1,Zd=["nfl"],gi={nfl:["draft","week","season"]},Bi=["A","B","C"],Be=n=>({ok:!1,reason:"corrupt",message:n}),To=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),So=n=>typeof n=="number"&&Number.isInteger(n),fa=n=>typeof n=="string";function Ci(n){if(!To(n))return Be("envelope: not an object");const e=n.sport===void 0?"nfl":n.sport;return!fa(e)||!Zd.includes(e)?Be("envelope: unknown sport"):!fa(n.kind)||!gi[e].includes(n.kind)?Be("envelope: bad kind for "+e):!So(n.schemaVersion)||n.schemaVersion<1?Be("envelope: bad schemaVersion"):n.schemaVersion>mi?{ok:!1,reason:"newer-version",message:"envelope: written by a newer build (schema "+n.schemaVersion+")"}:!fa(n.engineVersion)||!n.engineVersion?Be("envelope: bad engineVersion"):!fa(n.dataVersion)||!n.dataVersion?Be("envelope: bad dataVersion"):!fa(n.saveId)||!n.saveId?Be("envelope: bad saveId"):!So(n.saveRevision)||n.saveRevision<1?Be("envelope: bad saveRevision"):!fa(n.createdAt)||Number.isNaN(Date.parse(n.createdAt))?Be("envelope: bad createdAt"):!fa(n.slot)||!Bi.includes(n.slot)?Be("envelope: bad slot"):!fa(n.savedAt)||Number.isNaN(Date.parse(n.savedAt))?Be("envelope: bad savedAt"):To(n.payload)?{ok:!0,value:{...n,sport:e}}:Be("envelope: payload is not an object")}function Xd(n,e,a,s,t,r){if(!gi[n].includes(e))throw new Error(`envelope: ${n} has no save kind '${e}'`);const o={sport:n,kind:e,schemaVersion:mi,engineVersion:s.engineVersion,dataVersion:s.dataVersion,saveId:s.saveId,saveRevision:s.saveRevision,createdAt:s.createdAt,slot:a,savedAt:r.toISOString(),payload:t};return dr(o,"envelope"),JSON.stringify(o)}function dr(n,e){if(!(n===null||typeof n=="string"||typeof n=="boolean")){if(typeof n=="number"){if(!Number.isFinite(n))throw new Error("not plain JSON at "+e+": non-finite number");return}if(Array.isArray(n)){n.forEach((a,s)=>dr(a,e+"["+s+"]"));return}if(typeof n=="object"&&Object.getPrototypeOf(n)===Object.prototype){for(const[a,s]of Object.entries(n))dr(s,e+"."+a);return}throw new Error("not plain JSON at "+e+": "+(n===void 0?"undefined":typeof n=="object"?"class instance, Map or Set":typeof n))}}const yi="nfl",Yn=n=>({ok:!1,reason:"corrupt",message:n}),ua=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),Mn=n=>typeof n=="number"&&Number.isInteger(n),Qn=n=>typeof n=="string",$d=n=>ua(n)&&Qn(n.id)&&Qn(n.name)&&Qn(n.pos)&&Qn(n.role)&&Qn(n.team)&&Mn(n.ovr)&&Mn(n.spd)&&Mn(n.str)&&typeof n.freeAgent=="boolean",ko=n=>Array.isArray(n)&&n.every(e=>ua(e)&&Mn(e.week)&&Qn(e.home)&&Qn(e.away)&&Mn(e.hs)&&Mn(e.as));function Ti(n){return Mn(n.seed)?!Mn(n.userTeam)||n.userTeam<0||n.userTeam>31?"draft: bad userTeam":n.pickSlot!==void 0&&!(Mn(n.pickSlot)&&n.pickSlot>=1&&n.pickSlot<=32)?"draft: bad pickSlot":!Array.isArray(n.picks)||!n.picks.every(e=>ua(e)&&Mn(e.overall)&&Mn(e.team)&&Qn(e.pid)&&Qn(e.slot))?"draft: bad picks":!Array.isArray(n.pool)||!n.pool.every(e=>Array.isArray(e)&&e.length===8&&Qn(e[0])&&Qn(e[1])&&Qn(e[2])&&Qn(e[3])&&Mn(e[4])&&Mn(e[5])&&Mn(e[6])&&(e[7]===0||e[7]===1))?"draft: bad pool":null:"payload: bad seed"}function n0(n){const e=n.payload;if(!Mn(e.seed))return Yn("payload: bad seed");if(n.kind==="draft"){const a=Ti(e);if(a)return Yn(a)}else{if(!Mn(e.year)||!Mn(e.run)||e.run<0)return Yn(n.kind+": bad year/run");if(!Qn(e.userTeam))return Yn(n.kind+": bad userTeam");if(!Array.isArray(e.roster)||e.roster.length!==32||!e.roster.every($d))return Yn(n.kind+": roster must be 32 frozen players");if(typeof e.statsRecorded!="boolean")return Yn(n.kind+": bad statsRecorded");if(n.kind==="week"){if(!Mn(e.gameSeed)||!Mn(e.nextWeek)||e.nextWeek<1)return Yn("week: bad gameSeed/nextWeek");if(!ua(e.ratings))return Yn("week: bad ratings");if(!Array.isArray(e.schedule)||!e.schedule.every(a=>ua(a)&&Mn(a.week)&&Qn(a.home)&&Qn(a.away)&&Qn(a.kind)))return Yn("week: bad schedule");if(!ko(e.scores))return Yn("week: bad scores");if(e.plan!==null&&!ua(e.plan))return Yn("week: bad plan");if(e.prevRank!==void 0&&!(ua(e.prevRank)&&Object.values(e.prevRank).every(Mn)))return Yn("week: bad prevRank");if(e.homeField!==void 0&&!(typeof e.homeField=="number"&&Number.isFinite(e.homeField)))return Yn("week: bad homeField")}else{if(!Array.isArray(e.table)||!e.table.every(a=>ua(a)&&Qn(a.team)&&Mn(a.w)&&Mn(a.l)&&Mn(a.t)&&Mn(a.pf)&&Mn(a.pa)))return Yn("season: bad table");if(!ko(e.userResults))return Yn("season: bad userResults");if(!Qn(e.champion))return Yn("season: bad champion");if(!["missed-playoffs","wild-card","divisional","conference","super-bowl-loss","champion"].includes(e.userOutcome))return Yn("season: bad userOutcome")}}return{ok:!0,value:n}}function Ks(n,e,a,s,t){return Xd(yi,n,e,a,s,t)}function wt(n){let e;try{e=JSON.parse(n)}catch{return Yn("envelope: not JSON")}const a=Ci(e);return a.ok?a.value.sport!==yi?Yn("envelope: this is a "+a.value.sport+" save, not an nfl save"):n0(a.value):a}function e0(n,e){const a=qd(e);return a&&a!==n?"envelope: slot "+n+" written under "+e+" (that key is slot "+a+")":null}const ut={QB:{FS:12},RB:{FB:0,WR:12,TE:6,SS:12,FS:12},FB:{RB:2,TE:2},WR:{RB:6,TE:6,CB:6,FS:6,SS:6,NICKEL:6,DIME:6},TE:{FB:0,WR:12,RB:6,C:6,OG:6,OT:12,EDGE:12,DT:12,OLB:6,ILB:12,SS:6,FS:12,NICKEL:6,DIME:12},OT:{OG:2,C:2,DT:6,EDGE:6,FB:0},OG:{OT:2,C:2,DT:6,EDGE:6,FB:0},C:{OG:6,OT:12,DT:12,FB:0},DT:{EDGE:6,C:6,OG:6,OT:6,FB:0},EDGE:{DT:2,OLB:2,ILB:6,C:6,OG:6,OT:6,SS:12,RB:6,FB:0,TE:6,NICKEL:6},ILB:{ILB:0,OLB:2,EDGE:12,FS:12,SS:2,FB:0,TE:6,NICKEL:6,DIME:12},OLB:{OLB:0,ILB:6,EDGE:12,FS:12,SS:6,FB:0,TE:6,NICKEL:6,DIME:12},SS:{NICKEL:0,DIME:0,FS:2,CB:6,WR:12,ILB:6,OLB:2,RB:12,TE:6},FS:{NICKEL:0,DIME:0,SS:2,CB:6,WR:12,OLB:6},CB:{FS:2,NICKEL:0,DIME:0,SS:2,WR:6},K:{P:2},P:{K:2},LS:{}},ur=8;function a0(n){if(n==="DT"||n==="EDGE")return 0;const e=ut[n].DT,a=ut[n].EDGE;return e===void 0?a:a===void 0?e:Math.min(e,a)}function Qe(n,e){if(n===e)return{penalty:0,emergency:!1,legal:!0};const a=e==="DL5"?a0(n):ut[n][e];return a!==void 0?{penalty:a,emergency:!1,legal:!0}:n==="QB"?{penalty:ur,emergency:!0,legal:!1}:{penalty:ur,emergency:!0,legal:!0}}function H(n,e){const a=n[e];if(a===void 0)throw new Error(`at(): no element at index ${e} (length ${n.length})`);return a}function Bs(n,e){const a=n[e];if(a===void 0)throw new Error(`need(): no entry for key "${e}"`);return a}const ke=[{id:"QB",weight:1e3,dest:"QB",unit:"offense"},{id:"WR1",weight:650,dest:"WR",unit:"offense"},{id:"OT1",weight:500,dest:"OT",unit:"offense"},{id:"OT2",weight:300,dest:"OT",unit:"offense"},{id:"WR2",weight:400,dest:"WR",unit:"offense"},{id:"C",weight:150,dest:"C",unit:"offense"},{id:"OG1",weight:400,dest:"OG",unit:"offense"},{id:"OG2",weight:250,dest:"OG",unit:"offense"},{id:"TE1",weight:250,dest:"TE",unit:"offense"},{id:"RB1",weight:250,dest:"RB",unit:"offense"},{id:"WR3",weight:100,dest:"WR",unit:"offense"},{id:"RB2",weight:100,dest:"RB",unit:"offense"},{id:"TE2",weight:150,dest:"TE",unit:"offense"},{id:"FB",weight:25,dest:"FB",unit:"offense"},{id:"TE3",weight:50,dest:"TE",unit:"offense"},{id:"WR4",weight:50,dest:"WR",unit:"offense"},{id:"DE1",weight:650,dest:"EDGE",unit:"defense"},{id:"DT1",weight:500,dest:"DT",unit:"defense"},{id:"DE2",weight:300,dest:"EDGE",unit:"defense"},{id:"DT2",weight:300,dest:"DT",unit:"defense"},{id:"DL5",weight:150,dest:"DL5",unit:"defense"},{id:"MIKE",weight:300,dest:"ILB",unit:"defense"},{id:"WILL",weight:150,dest:"OLB",unit:"defense"},{id:"SAM",weight:100,dest:"OLB",unit:"defense"},{id:"CB1",weight:400,dest:"CB",unit:"defense"},{id:"CB2",weight:250,dest:"CB",unit:"defense"},{id:"CB3",weight:100,dest:"NICKEL",unit:"defense"},{id:"DIME",weight:50,dest:"DIME",unit:"defense"},{id:"FS",weight:300,dest:"FS",unit:"defense"},{id:"SS",weight:300,dest:"SS",unit:"defense"},{id:"K",weight:50,dest:"K",unit:"special"},{id:"P",weight:50,dest:"P",unit:"special"}],Qa=ke.map(n=>n.id);Object.fromEntries(ke.map(n=>[n.id,n.weight]));const s0={WR1:"WR1",MIKE:"MIKE",WILL:"WILL",SAM:"SAM",CB3:"Nickel",DE1:"DE1",DE2:"DE2"};function Pr(n){return ke.map(e=>{const a={slot:e.id,dest:e.dest,row:e.id,label:s0[e.id]??e.id};if(n==="4-3")return a;switch(e.id){case"DT1":return{...a,label:"NT"};case"MIKE":return{...a,label:"ILB1"};case"DT2":return{slot:"DT2",dest:"ILB",row:"DT2",label:"ILB2"};case"WILL":return{slot:"WILL",dest:"OLB",row:"WILL",label:"OLB1"};case"SAM":return{...a,label:"OLB2"};default:return a}})}const He={olRun:{OT1:.579,OT2:.348,OG1:.705,OG2:.441,C:.263,TE1:1.436,FB:.188},olPass:{OT1:.812,OT2:.488,OG1:.588,OG2:.368,C:.221},rb:{RB1:43.113,RB2:12.177},qb:{QB:1},rec:{WR1:25.682,WR2:19.86,WR3:3.251,TE1:2.174,RB1:4.201,TE3:1.264,WR4:1.6},passRush:{DE1:.583,DE2:.255,DT1:.303,DT2:.182,MIKE:.053,WILL:.03,DL5:.114},frontRun:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.234,SS:.115,CB1:.06,CB2:.034,CB3:.009,FS:.08,DL5:.099},coverage:{CB1:.175,CB2:.107,CB3:.041,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.1},kicker:{K:1}},Ga={frontBase:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.334,SS:.115,CB1:.06,CB2:.034,CB3:.005,FS:.08,DL5:.099},frontNick:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.032,SS:.115,CB1:.062,CB2:.048,CB3:.009,FS:.08,DL5:.099},covBase:{CB1:.175,CB2:.107,CB3:.011,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.135},covNick:{CB1:.175,CB2:.107,CB3:.045,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.017},covDime:{CB1:.175,CB2:.107,CB3:.045,DIME:.184,SS:.113,FS:.122,MIKE:.069}},Cs={12:{WR1:25.682,WR2:27.236,TE1:2.174,TE2:22.844,RB1:4.201},13:{WR1:25.682,TE1:2.174,TE2:22.844,TE3:15.173,RB1:4.201},21:{WR1:25.682,WR2:27.236,TE1:2.174,RB1:4.201,RB2:12.177},22:{WR1:25.682,TE1:2.174,TE2:22.844,RB1:4.201,RB2:12.177}},Si={RB1:44.218,RB2:30.441},wa={11:{label:"11 personnel",run:0,runB:0,passB:0,heavy:0,tbw:0,pc:0},12:{label:"12 personnel",run:.03,runB:.03,passB:-.015,heavy:.5,tbw:.08,pc:.22},13:{label:"13 personnel",run:.06,runB:.055,passB:-.035,heavy:1,tbw:.14,pc:.42},21:{label:"21 personnel",run:.05,runB:.04,passB:-.03,heavy:.6,tbw:.03,pc:.38},22:{label:"22 personnel",run:.08,runB:.07,passB:-.045,heavy:1,tbw:.1,pc:.48}},Gr={run:{label:"run-heavy",s:.08},neutral:{label:"balanced",s:0},pass:{label:"pass-heavy",s:-.08}},Nr={run:{label:"run-defense",f:1},neutral:{label:"balanced",f:0},pass:{label:"pass-defense",f:-1}},Hn={kRun:1.4,kPass:.85,kTo:1,kSack:.9,rAmp:3,pAmp:2.5,vm:1.3,kBlock:1,predict:.38,defPredict:.15,baseRunPct:.39,nickRun:.05,baseRunVsHeavy:-.025,basePass:.03,defFront:2,defCov:1.5,defRush:.6,pkgFront:.8,pkgCov:.8},Jn={rb:.0208,olRun:.0495,front:.05577,qb:.00655,rec:.02045,olPass:.01403,rush:.01579,cov:.0184,lean:.013,toQb:.01471,toCov:.0204,toRush:.0105,skRush:.0268,skOl:.0336,skCov:.012,kick:.01215},Ia=105,Ha=220,ks=.04,ws=.07,Ds=3,bs=.8,Ka=1.2,xa=2.2,pt=21.5,ki=1.7,wi=6,Di=2.36,Ir=82,bi=.0194,Ri=.01147,Ta=[1,1,1],Ei=.542,pr=.15,Li=32.5,Ai=17,t0=Object.freeze(Object.defineProperty({__proto__:null,BASE_PTS:pt,DEF_FOCUS:Nr,DEF_SPECS:Ga,DIME_W:pr,GAMES:Ai,HOME_FIELD:ki,LAM_SACK:xa,LAM_TO:Ka,MC:Jn,PASS_BASE:Ha,PERS:wa,PERS_REC:Cs,PLAN_K:Hn,POINTS_PER_WIN:Li,PTS_NOISE:wi,PT_PASS:ws,PT_RUSH:ks,PT_SACK:bs,PT_TO:Ds,PUNT_PTS:Ei,QB_RUN_C:bi,RATING_SPECS:He,RB_HEAVY:Si,RET_NEUTRAL:Ir,RET_PTS:Di,RUSH_BASE:Ia,STRAT:Gr,WR_BLK_C:Ri,WR_BLK_W:Ta},Symbol.toStringTag,{value:"Module"})),ht={pers:"11",strat:"neutral"},vt={pkg:"nickel",focus:"neutral"},r0={off:ht,def:vt},Mi=["11","12","13","21","22"].flatMap(n=>["run","neutral","pass"].map(e=>({pers:n,strat:e}))),Ji=["base","nickel"].flatMap(n=>["run","neutral","pass"].map(e=>({pkg:n,focus:e})));function o0(n){return wa[n.pers].run+Gr[n.strat].s}function l0(n){const e=1/(1+.2316419*Math.abs(n)),s=.3989423*Math.exp(-n*n/2)*e*(.3193815+e*(-.3565638+e*(1.781478+e*(-1.821256+e*1.330274))));return n>0?1-s:s}function le(n,e,a){return Math.min(a,Math.max(e,n))}function _a(n,e,a){const s=n>=0?a:-e,t=.6*s,r=Math.abs(n);if(r<=t)return n;const o=t+(s-t)*Math.tanh((r-t)/(s-t));return n>=0?o:-o}function wo(n,e){const a=e.pers,s={...n};a!=="11"&&(s.rec=n["rec"+a]),(a==="21"||a==="22")&&(s.rb=n.rbHeavy);const t=a==="13"?(n.te2+70)/2:a==="12"||a==="22"?(n.te1+n.te2)/2:n.te1;return s.olRun=n.olRun+wa[a].tbw*(t-75)*Hn.kBlock,s}function Do(n,e,a){const s=Nr[e.focus].f,t=e.pkg==="nickel",r={...n};return r.frontRun=(t?n.frontNick:n.frontBase)+(a?0:(t?-Hn.pkgFront:Hn.pkgFront)+Hn.defFront*s),r.coverage=(t?n.covNick:n.covBase)+(a?0:(t?Hn.pkgCov:-Hn.pkgCov)-Hn.defCov*s),r.passRush=n.passRush-(a?0:Hn.defRush*s),r.coverage=(1-pr)*r.coverage+pr*n.covDime,r}function Ve(n,e,a,s=r0){const t=s.off,r=s.def,o=wo(n,t),l=wo(a,t),i=Do(e,r,!1),f=Do(a,r,!0),d=o0(t),u=1+Hn.rAmp*d,h=1-Hn.pAmp*d,p=o.rb-l.rb,v=o.olRun-l.olRun,g=o.qb-a.qb,B=o.rec-l.rec,T=o.olPass-a.olPass,S=o.kicker-a.kicker,w=i.frontRun-f.frontRun,D=i.passRush-f.passRush,C=i.coverage-f.coverage,E=Jn.lean*(.35*(n.rb-a.rb)+.65*(n.olRun-a.olRun)-(.45*g+.3*(n.rec-a.rec)+.25*T)),F=wa[t.pers].heavy,G=r.pkg==="nickel",A=wa[t.pers].runB+Hn.kRun*d+(G?Hn.nickRun*F:Hn.baseRunVsHeavy*F),J=wa[t.pers].passB-Hn.kPass*d+(G?0:Hn.basePass*(1-F)),N=[["rb","off",Jn.rb*p*u],["olRun","off",Jn.olRun*v*u],["frontRun","def",-Jn.front*w*u],["lean","off",E],["scheme","off",A]],O=[["qb","off",Jn.qb*g*h],["rec","off",Jn.rec*B*h],["olPass","off",Jn.olPass*T*h],["passRush","def",-Jn.rush*D*h],["coverage","def",-Jn.cov*C*h],["lean","off",-E],["scheme","off",J]],Z=[["qb","off",-Jn.toQb*g],["coverage","def",Jn.toCov*C],["passRush","def",Jn.toRush*D],["scheme","off",-Hn.kTo*d]],U=[["passRush","def",Jn.skRush*D],["olPass","off",-Jn.skOl*T],["coverage","def",Jn.skCov*C],["scheme","off",-Hn.kSack*d]],X=vn=>vn.reduce((Ln,In)=>Ln+In[2],0),an=_a(Jn.rb*p+Jn.olRun*v,-1.1,.4),sn=_a(Jn.qb*g+Jn.rec*B+Jn.olPass*T,-.8,.27),z=_a(an*u+E+A,-1.3,.33)-Jn.front*w*u,$=_a(sn*h-E+J,-1,.29)-(Jn.rush*D+Jn.cov*C)*h,W=_a(X(Z),-.7,.7),I=_a(X(U),-.8,.4),Y=Ia*Math.exp(z),b=Ha*Math.exp($),_=Ka*Math.exp(W),x=xa*Math.exp(I),j=Jn.kick*S,tn=Di*(Math.exp((n.ret-82)/45)-Math.exp((a.ret-82)/45)),dn=bi*(n.qbRunR-a.qbRunR),un=Ri*(n.wrBlk-a.wrBlk),Tn=-Ei*(Math.exp((e.p-80)/45)-Math.exp((a.p-80)/45)),nn={},rn=(vn,Ln,In)=>{for(const[Vn,$n,bn]of vn){if(Vn==="lean"||Vn==="scheme")continue;const de=Ln(bn),me=Vn+"|"+$n,ge=nn[me]??={unit:Vn,owner:$n,pts:0,kinds:{}},Pe=$n==="off"?de:-de;ge.pts+=Pe,ge.kinds[In]=(ge.kinds[In]??0)+Pe}};rn(N,vn=>ks*Ia*(Math.exp(vn)-1),"ground game"),rn(O,vn=>ws*Ha*(Math.exp(vn)-1),"passing game"),rn(Z,vn=>-Ds*Ka*(Math.exp(vn)-1),"turnovers"),rn(U,vn=>-bs*xa*(Math.exp(vn)-1),"sacks"),Math.abs(j)>.01&&(nn["kicker|off"]={unit:"kicker",owner:"off",pts:j,kinds:{"field goals":j}});const mn=Hn.predict*Math.pow(Gr[t.strat].s/.08,2)-Hn.defPredict*Math.abs(Nr[r.focus].f)+wa[t.pers].pc,cn=tn+Tn+dn+un,Sn=pt+ks*(Y-Ia)+ws*(b-Ha)-Ds*(_-Ka)-bs*(x-xa)+j+cn-mn,Fn={run:ks*(Y-Ia)+dn+un,pass:ws*(b-Ha),to:-Ds*(_-Ka),sack:-bs*(x-xa),kick:j,plan:-mn},Xn=le(1-Hn.vm*d,.7,1.2);return{expRush:Y,expPass:b,lamTO:_,lamSack:x,structPts:Sn,extraPts:cn,channels:Fn,swings:Object.values(nn),sd:8*Xn,vm:Xn,sT:d,planCost:mn,plan:{off:t,def:r}}}function i0(n){const e=n.length;for(const i of n)if(i.length!==e)throw new Error("hungarian: matrix must be square");const a=Number.POSITIVE_INFINITY,s=new Array(e+1).fill(0),t=new Array(e+1).fill(0),r=new Array(e+1).fill(0),o=new Array(e+1).fill(0);for(let i=1;i<=e;i++){r[0]=i;let f=0;const d=new Array(e+1).fill(a),u=new Array(e+1).fill(!1);do{u[f]=!0;const h=r[f];let p=a,v=0;for(let g=1;g<=e;g++){if(u[g])continue;const B=n[h-1][g-1]-s[h]-t[g];B<d[g]&&(d[g]=B,o[g]=f),d[g]<p&&(p=d[g],v=g)}for(let g=0;g<=e;g++)u[g]?(s[r[g]]+=p,t[g]-=p):d[g]-=p;f=v}while(r[f]!==0);do{const h=o[f];r[f]=r[h],f=h}while(f!==0)}const l=new Array(e).fill(-1);for(let i=1;i<=e;i++)r[i]>0&&(l[r[i]-1]=i-1);return l}const hr=70,c0=120;function f0(n,e,a){const s=c0*n.reduce((o,l)=>o+Math.abs(l),0)+1,t=s,r=(a+1)*t+s;return{emergency:t,plays:r,illegal:(e+a+1)*r*2}}const d0=(n,e,a)=>n.map(s=>e.winsPerOvr(s.row,a)/_i);function u0(n,e,a={}){const{stay:s,stayBonus:t=0,values:r=Dt,base:o="4-3"}=a,l=d0(e,r,o),i=n.length,f=e.length,d=i+f,{emergency:u,plays:h,illegal:p}=f0(l,i,f),v=[];for(let w=0;w<d;w++){const D=new Array(d).fill(0);for(let C=0;C<f;C++)if(w<i){const E=Qe(n[w].role,e[C].dest);D[C]=E.legal?-(h+H(l,C)*(n[w].ovr-E.penalty))+(E.emergency?u:0)-(s?.get(n[w].id)===e[C].slot?t:0):p}else D[C]=-H(l,C)*hr;v.push(D)}const g=i0(v),B=e.map(w=>({slot:w,player:null,effOvr:hr,penalty:0,emergency:!1})),T=[];for(let w=0;w<i;w++){const D=g[w];if(D>=f){T.push(n[w]);continue}const C=Qe(n[w].role,e[D].dest);B[D]={slot:e[D],player:n[w],effOvr:n[w].ovr-C.penalty,penalty:C.penalty,emergency:C.emergency}}const S=B.reduce((w,D,C)=>w+H(l,C)*D.effOvr,0);return{placements:B,bench:T,value:S,emergencyFills:B.filter(w=>w.emergency).length}}function Hr(n,e,a=Dt){return{base:e,...u0(n,Pr(e),{base:e,values:a})}}function p0(n){return n.placements.map(e=>({row:e.slot.row,ovr:e.effOvr}))}function h0(n,e){let a=0,s=0;for(const t of n){const r=e[t.row];r!==void 0&&(a+=t.ovr*r,s+=r)}if(s===0)throw new Error("wavg: no spot matches the spec");return a/s}function Ca(n,e){const a=n.find(s=>s.row===e);return a?a.ovr:hr}function vr(n,e=Ir){const a=o=>h0(n,o),s={TE1:Ca(n,"TE1"),TE2:Ca(n,"TE2"),P:Ca(n,"P"),QB:Ca(n,"QB"),WR1:Ca(n,"WR1"),WR2:Ca(n,"WR2"),WR3:Ca(n,"WR3")},t=a(He.rec),r={olRun:a(He.olRun),olPass:a(He.olPass),rb:a(He.rb),qb:a(He.qb),rec:t,passRush:a(He.passRush),frontRun:a(He.frontRun),coverage:a(He.coverage),kicker:a(He.kicker),rec12:a(Cs[12]),rec13:a(Cs[13]),rec21:a(Cs[21]),rec22:a(Cs[22]),rec11:t,frontBase:a(Ga.frontBase),frontNick:a(Ga.frontNick),covBase:a(Ga.covBase),covNick:a(Ga.covNick),covDime:a(Ga.covDime),te1:s.TE1,te2:s.TE2,rbHeavy:a(Si),ret:e,p:s.P,qbRunR:s.QB,wrBlk:(s.WR1*Ta[0]+s.WR2*Ta[1]+s.WR3*Ta[2])/(Ta[0]+Ta[1]+Ta[2]),passOff:0,runOff:0,off:0,def:0};return r.passOff=.45*r.qb+.3*r.rec+.25*r.olPass,r.runOff=.35*r.rb+.65*r.olRun,r.off=.6*r.passOff+.4*r.runOff,r.def=.55*(.5*r.passRush+.5*r.coverage)+.45*r.frontRun,r}function Kr(n){if(!n.length)throw new Error("leagueBaseline: no teams");const e=Object.keys(n[0]),a={};for(const s of e)a[s]=n.reduce((t,r)=>t+r[s],0)/n.length;return a}function mt(n,e,a){return a?Math.max(...Mi.map(s=>Ve(n,e,e,{off:s,def:vt}).structPts)):-Math.min(...Ji.map(s=>Ve(e,n,e,{off:ht,def:s}).structPts))}function bo(n,e){return mt(n,e,!0)+mt(n,e,!1)}const v0=n=>n==="K"||ke.find(e=>e.id===n)?.unit==="offense";function Ro(n,e,a="4-3"){const s=l=>Pr(a).map(i=>({row:i.row,ovr:i.slot===n?l:80})),t=vr(s(80)),r=Ai/Li,o=v0(n);return(mt(vr(s(e)),t,o)-mt(t,t,o))*r}function m0(n,e="4-3"){return Ro(n,90,e)-Ro(n,70,e)}const _i=.00254/20,g0=n=>Math.round(n*1e9)/1e9;function B0(){const n=new Map,e=a=>{let s=n.get(a);return s||(s=Object.fromEntries(Qa.map(t=>[t,g0(m0(t,a)/20)])),n.set(a,s)),s};return{name:"measured",winsPerOvr:(a,s)=>e(s)[a]}}const Dt=B0(),C0="4-3",es=32,y0=Qa.length,as=Object.fromEntries(ke.map(n=>[n.id,n.dest])),Fi=n=>n==="NICKEL"||n==="DIME"?"CB":n==="DL5"?"DT":n,xr={topFloor:5,topFloorRounds:4,midFloor:10,midFloorRounds:8,kpFirstRound:6,noiseMax:1.5,missMax:.6,biasSd:.5,hyperP:.15,replFloor:72};function Wi(n=es,e=y0){const a=[];for(let s=0;s<e;s++)for(let t=0;t<n;t++)a.push(s%2===0?t:n-1-t);return a}const T0=(n,e)=>e.ovr-n.ovr||(n.id<e.id?-1:n.id>e.id?1:0),S0=Array.from(new Set(ke.map(n=>n.dest)));function k0(n,e,a=xr,s=Wi()){const t=n.filter(l=>l.role!=="LS").slice().sort(T0),r=e.fork("traits"),o=Array.from({length:es},()=>({noise:.05+r.next()*(a.noiseMax-.05),miss:r.next()*a.missMax,bias:Object.fromEntries(S0.map(l=>{const i=r.next();return[l,i<a.hyperP/2?.05+r.next()*.3:i<a.hyperP?2+r.next()*3:Math.exp(a.biasSd*r.normal())]}))}));return{cfg:a,order:s,pos:0,pool:t,rosters:Array.from({length:es},()=>({})),traits:o,log:[],repl:{},replAt:-99}}const bt=n=>Math.floor(n.pos/es)+1,xs=n=>Qa.filter(e=>!n[e]);function w0(n){if(n.pos===n.replAt)return n.repl;const e={};for(const t of n.rosters)for(const r of xs(t)){const o=Fi(as[r]);e[o]=(e[o]??0)+1}const a={};for(const t of n.pool)(a[t.role]??=[]).push(t.ovr);const s={};for(const t of Object.keys(e)){const r=a[t]??[];s[t]=r.length?H(r,Math.min(e[t]??1,r.length)-1):0}return n.repl=s,n.replAt=n.pos,s}function mr(n,e,a=Dt){const s=xs(H(n.rosters,e)),t=w0(n),r={},o=[],l=bt(n);for(const i of n.pool)if(!((r[i.role]=(r[i.role]??0)+1)>16)&&!((i.role==="K"||i.role==="P")&&l<n.cfg.kpFirstRound))for(const d of s){const u=Qe(i.role,as[d]);if(!u.legal||u.emergency)continue;const h=i.ovr-u.penalty,p=Math.max(t[Fi(as[d])]??0,n.cfg.replFloor);o.push({player:i,slot:d,eff:h,wins:Math.round(a.winsPerOvr(d,C0)*(h-p)*1e9)/1e9})}return o}function D0(n){const e=n.pool.length?H(n.pool,0).ovr:0,a=bt(n),s=n.cfg;return a<=s.topFloorRounds?e-s.topFloor:a<=s.midFloorRounds?e-s.midFloor:-1/0}function Pi(n,e,a,s=Dt){const t=H(n.traits,e),r=D0(n);let o=mr(n,e,s).filter(d=>d.player.ovr>=r);if(o.length||(o=mr(n,e,s)),!o.length)return b0(n,e);const l=o.map(d=>({c:d,v:d.wins*(t.bias[as[d.slot]]??1)*Math.max(.02,1+t.noise*a.normal())+.002*_i*d.player.ovr}));l.sort((d,u)=>u.v-d.v);let i=0;l.length>8&&a.next()<t.miss&&(i=Math.min(l.length-1,3+Math.min(9,Math.floor(Math.abs(a.normal())*4))));const f=H(l,i).c;return{player:f.player,slot:f.slot}}function b0(n,e){const a=xs(H(n.rosters,e));for(const s of n.pool)for(const t of a)if(Qe(s.role,as[t]).legal)return{player:s,slot:t};throw new Error("draft: no legal pick for team "+e)}function Rt(n,e,a,s){if(n.order[n.pos]!==e)throw new Error(`draft: it is not team ${e}'s pick`);if(H(n.rosters,e)[s])throw new Error("draft: spot already filled "+s);const t=n.pool.findIndex(l=>l.id===a.id);if(t<0)throw new Error("draft: player already taken "+a.id);if(!Qe(a.role,as[s]).legal)throw new Error("draft: illegal fit");const r=H(n.pool,0).ovr;n.pool.splice(t,1),H(n.rosters,e)[s]=a;const o={overall:n.pos+1,round:bt(n),pickInRound:n.pos%es+1,team:e,slot:s,player:a,ovrGap:r-a.ovr};return n.log.push(o),n.pos++,o}const R0=/^([a-z][a-z0-9]*)-p(\d{5,})$/;function E0(n){const e=R0.exec(n);return e?{sport:e[1],n:+e[2]}:null}const L0="pid,name,pos,team",Gi=(n,e,a)=>`${n}|${e}|${a}`,A0="nfl";function M0(n,e=A0){const a=n.split(/\r?\n/).filter(o=>o.trim().length>0);if(a.length===0||a[0].trim()!==L0)throw new Error("player-ids csv: unexpected header: "+(a[0]??"(empty)"));const s=[],t=new Set,r=new Set;for(let o=1;o<a.length;o++){const l=/^([a-z][a-z0-9]*-p\d{5,}),(.*),([A-Z]+),([^,]+)$/.exec(a[o]);if(!l)throw new Error(`player-ids csv line ${o+1}: cannot parse: ${a[o]}`);const i={pid:l[1],name:l[2],pos:l[3],team:l[4]};if(E0(i.pid)?.sport!==e)throw new Error(`player-ids csv line ${o+1}: ${i.pid} is not a ${e} id`);if(t.has(i.pid))throw new Error("player-ids csv: duplicate pid "+i.pid);const f=Gi(i.name,i.pos,i.team);if(r.has(f))throw new Error("player-ids csv: duplicate key "+f);t.add(i.pid),r.add(f),s.push(i)}return s}function J0(n){return new Map(n.map(e=>[Gi(e.name,e.pos,e.team),e.pid]))}const Ni={QB:"QB",HB:"RB",FB:"FB",WR:"WR",TE:"TE",LT:"OT",RT:"OT",LG:"OG",RG:"OG",C:"C",DT:"DT",LEDG:"EDGE",REDG:"EDGE",MIKE:"ILB",WILL:"OLB",SAM:"OLB",CB:"CB",SS:"SS",FS:"FS",K:"K",P:"P",LS:"LS"},_0=n=>Ni[n];function Eo(n,e){const a=[],s=n.split(/\r?\n/).filter(t=>t.trim().length>0);if(s[0].trim()!=="name,pos,team,ovr,spd,str")throw new Error("players csv: unexpected header: "+s[0]);for(let t=1;t<s.length;t++){const r=/^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(s[t]);if(!r)throw new Error(`players csv line ${t+1}: cannot parse: ${s[t]}`);const[,o,l,i,f,d,u]=r,h=Ni[l];if(!h)throw new Error(`players csv line ${t+1}: unknown position ${l}`);a.push({id:`${o}|${l}|${i}`,name:o,pos:l,role:h,team:i,ovr:+f,spd:+d,str:+u,freeAgent:e})}return a}function F0(n,e,a){const s=[...Eo(n,!1),...Eo(e,!0)],t=J0(M0(a)),r=new Set,o=new Set;return s.map(l=>{if(o.has(l.id))throw new Error("duplicate player "+l.id);o.add(l.id);const i=t.get(l.id);if(!i)throw new Error("no stable id for "+l.id+" (run tools/player-ids.ts sync)");if(r.has(i))throw new Error("duplicate pid "+i);return r.add(i),{...l,id:i}})}function Ii(n){let e=2166136261;for(let a=0;a<n.length;a++)e^=n.charCodeAt(a),e=Math.imul(e,16777619)>>>0;return e>>>0}function je(n){let e=n>>>0,a=null;const s=()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296};return{next:s,int:(t,r)=>t+Math.floor(s()*(r-t+1)),normal:()=>{if(a!==null){const l=a;return a=null,l}let t=0,r=0;for(;t===0;)t=s();r=s();const o=Math.sqrt(-2*Math.log(t));return a=o*Math.sin(2*Math.PI*r),o*Math.cos(2*Math.PI*r)},pick:t=>t[Math.floor(s()*t.length)],fork:t=>je((n^Ii(t))>>>0)}}function W0(n,e){return(n>>>0^Ii(e))>>>0}const Hi=Object.fromEntries(ke.map(n=>[n.id,n.dest])),Or=new Set(ke.map(n=>n.id));function P0(n){return n.filter(e=>e.role!=="LS").map(e=>[e.id,e.name,e.pos,e.team,e.ovr,e.spd,e.str,e.freeAgent?1:0])}function Vr(n){return n.map(([e,a,s,t,r,o,l,i])=>{const f=_0(s);if(!f)throw new Error("save: unknown position "+s);return{id:e,name:a,pos:s,role:f,team:t,ovr:r,spd:o,str:l,freeAgent:i===1}})}function G0(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("save: not an object");const e=Ti(n);if(e)throw new Error("save: "+e);const a=n;if(a.picks.length>1024)throw new Error("save: too many picks");if(!a.picks.every(s=>Or.has(s.slot)))throw new Error("save: bad pick slot");return{seed:a.seed,userTeam:a.userTeam,...a.pickSlot===void 0?{}:{pickSlot:a.pickSlot},picks:a.picks.map(s=>({overall:s.overall,team:s.team,pid:s.pid,slot:s.slot})),pool:a.pool.map(s=>[...s])}}const js=(n,e,a)=>({seed:e.seed,userTeam:e.userTeam,...e.pickSlot===void 0?{}:{pickSlot:e.pickSlot},pool:a,picks:n.log.map(s=>({overall:s.overall,team:s.team,pid:s.player.id,slot:s.slot}))});function Ki(n,e){const a=Array.from({length:es},(s,t)=>t);if(e!==void 0&&e-1!==n){const s=e-1;[a[n],a[s]]=[a[s],a[n]]}return Wi().map(s=>a[s])}function hs(n){const e=k0(Vr(n.pool),je(n.seed).fork("draft"),xr,Ki(n.userTeam,n.pickSlot));for(const a of n.picks){if(e.pos>=e.order.length)throw new Error("save: more picks than the draft has");if(a.overall!==e.pos+1||a.team!==e.order[e.pos])throw new Error("save: pick "+a.overall+" is out of order");const s=e.pool.find(r=>r.id===a.pid);if(!s)throw new Error("restore: player not available: "+a.pid);const t=Or.has(a.slot)?Hi[a.slot]:void 0;if(!t||!Qe(s.role,t).legal)throw new Error("restore: illegal fit");Rt(e,a.team,s,a.slot)}return e}function It(n,e,a){const s=je(e).fork("cpu");for(;n.pos<n.order.length;){const t=n.order[n.pos];if(t===void 0||t===a)break;const r=Pi(n,t,s.fork("p"+n.pos));Rt(n,t,r.player,r.slot)}}function N0(n){let e={record:null,draft:null,status:"idle",error:null};const a=new Set,s=i=>{e=i,a.forEach(f=>f(e))},t=(i,f)=>{const d=hs(f);return{record:f,draft:d,status:d.pos>=d.order.length?"done":"drafting",error:null}},r=i=>{try{if(i.type==="START"){if(!Number.isInteger(i.seed)||!Number.isInteger(i.userTeam)||i.userTeam<0||i.userTeam>31)throw new Error("start: bad seed or team");if(i.pickSlot!==void 0&&!(Number.isInteger(i.pickSlot)&&i.pickSlot>=1&&i.pickSlot<=32))throw new Error("start: bad pick slot");const f={seed:i.seed,userTeam:i.userTeam,...i.pickSlot===void 0||i.pickSlot-1===i.userTeam?{}:{pickSlot:i.pickSlot}},d=P0(n),u=hs({...f,picks:[],pool:d});It(u,i.seed,i.userTeam),s(t(u,js(u,f,d)))}else if(i.type==="LOAD"){const f=G0(i.record),d=hs(f);It(d,f.seed,f.userTeam),s(t(d,js(d,f,f.pool)))}else{if(!e.record||!e.draft)throw new Error("no draft in progress");if(i.type==="PICK"){const{record:f,draft:d}=e;if(d.pos>=d.order.length||d.order[d.pos]!==f.userTeam)throw new Error("it is not your pick");if(!Or.has(i.slot))throw new Error("bad slot");const u=hs(f),h=u.pool.find(v=>v.id===i.playerId);if(!h)throw new Error("player not available: "+i.playerId);const p=Hi[i.slot];if(!p||!Qe(h.role,p).legal)throw new Error("illegal fit");Rt(u,f.userTeam,h,i.slot),It(u,f.seed,f.userTeam),s(t(u,js(u,f,f.pool)))}else if(i.type==="UNDO"){const f=e.record,d=f.picks.map(p=>p.team).lastIndexOf(f.userTeam);if(d<0)throw new Error("nothing to undo");const u={...f,picks:f.picks.slice(0,d)},h=hs(u);s(t(h,js(h,f,f.pool)))}}}catch(f){console.warn("store: action rejected:",i.type,f.message),s({...e,error:f.message})}};let o=Promise.resolve();return{getState:()=>e,dispatch:r,dispatchAsync:i=>{const f=o.then(()=>new Promise(d=>setTimeout(d,0))).then(()=>{try{r(i)}catch(d){console.warn("store: subscriber threw:",d.message)}return e});return o=f.catch(()=>{}),f},subscribe:i=>(a.add(i),()=>a.delete(i))}}Hs("nfl","draft");function I0(n){return{...n,pool:n.pool.slice(),rosters:n.rosters.map(e=>({...e})),log:[],repl:{...n.repl}}}function H0(n,e,a,s=30){if(n.order[n.pos]!==e)throw new Error("goneOdds: it is not the user's pick");let t=n.pos+1;for(;t<n.order.length&&n.order[t]!==e;)t++;const r=t-(n.pos+1),o=new Map;if(r<=0||t>=n.order.length)return{picksBetween:Math.max(0,r),sims:s,gone:o};for(let l=0;l<s;l++){const i=I0(n);i.pos=n.pos+1;const f=a.fork("gone"+l);for(let d=i.pos;d<t;d++){const u=i.order[d],h=Pi(i,u,f);Rt(i,u,h.player,h.slot)}for(const d of i.log)o.set(d.player.id,(o.get(d.player.id)??0)+1)}for(const[l,i]of o)o.set(l,i/s);return{picksBetween:r,sims:s,gone:o}}const K0=(n,e)=>n.gone.get(e)??0;function x0(n){if(!Number.isFinite(n))throw new Error("goneDisplay: not a number: "+n);const e=Math.round(Math.min(1,Math.max(0,n))*100);return Math.min(99,e)}function jn(n){if(!Number.isFinite(n))throw new Error("showInt: not a number: "+n);const e=Math.sign(n)*Math.round(Math.abs(n));return String(e===0?0:e)}function _s(n,e){if(!Number.isFinite(e))throw new Error("showDecimal: not a number: "+e);const a=Math.sign(e)*Math.round(Math.abs(e)*10)/10;return(a===0?0:a).toFixed(1)}const Ke=["East","North","South","West"],da=(n,e,a)=>a.map(s=>({name:s,conf:n,div:e})),wn=[...da("AFC","East",["Buffalo Bills","Miami Dolphins","New England Patriots","NY Jets"]),...da("AFC","North",["Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers"]),...da("AFC","South",["Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans"]),...da("AFC","West",["Denver Broncos","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers"]),...da("NFC","East",["Dallas Cowboys","NY Giants","Philadelphia Eagles","Washington Commanders"]),...da("NFC","North",["Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings"]),...da("NFC","South",["Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers"]),...da("NFC","West",["Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks"])],Et=Object.fromEntries(wn.map(n=>[n.name,n]));function La(n,e){return wn.filter(a=>a.conf===n&&a.div===e).map(a=>a.name)}const Ht=Object.fromEntries(ke.map(n=>[n.id,n.dest])),O0=Object.fromEntries(Pr("4-3").map(n=>[n.slot,n.label])),gt=n=>O0[n]??n,Lo=n=>n.startsWith("-")?n:"+"+n,V0=(n,e)=>n===2||n===4||n>4&&e>20;function Y0(n,e,a,s={}){const t=s.sort??"wins",r=s.limit??60,o=bt(n),l=new Set(xs(n.rosters[e])),i=new Map;for(const p of mr(n,e))(i.get(p.player.id)??i.set(p.player.id,[]).get(p.player.id)).push(p);const f=[];for(const p of i.values()){const g=p.filter(C=>Qe(C.player.role,Ht[C.slot]).penalty===0).sort((C,E)=>E.wins-C.wins)[0]??p.slice().sort((C,E)=>E.wins-C.wins)[0],B=g.player,T=g.wins,S=K0(a,B.id),w=T*S,D=p.filter(C=>C.slot!==g.slot&&l.has(C.slot)).map(C=>({c:C,pen:Qe(C.player.role,Ht[C.slot]).penalty})).filter(C=>V0(C.pen,o)).sort((C,E)=>E.c.wins-C.c.wins).map(C=>({slotId:C.c.slot,slotLabel:gt(C.c.slot),flex:C.pen===0?"":`-${C.pen} flex`}));f.push({id:B.id,name:B.name,pos:B.pos,nflTeam:B.team,ovr:jn(B.ovr),slotId:g.slot,slotLabel:gt(g.slot),natural:Qe(B.role,Ht[g.slot]).penalty===0,wins:Lo(_s("wins",T)),priority:Lo(_s("priority",w)),gone:x0(S)+"%",alsoFits:D,tone:T>.05?"good":T<-.05?"bad":"neutral",_w:T,_p:w})}const d=p=>t==="ovr"?Number(p.ovr):t==="priority"?p._p:p._w;f.sort((p,v)=>d(v)-d(p)||(p.id<v.id?-1:1));const u=n.pos+1,h=Qa.length-l.size;return{header:{teamName:wn[e].name,round:o,roundLabel:`Round ${o}`,pickInRound:n.pos%32+1,overall:u,totalPicks:n.order.length,onClock:`You're on the clock: Round ${o}, Pick ${n.pos%32+1} (overall ${u} of ${n.order.length})`},rows:f.slice(0,r).map(({_w:p,_p:v,...g})=>g),footer:{filled:h,total:Qa.length,text:`${h} of ${Qa.length} starters`},sort:t}}const xi={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},z0=["RB1","RB2","WR1","WR2","WR3","TE1","TE2","MIKE","WILL","SAM","CB1","CB2","CB3","SS","FS"],Kt={spd:.8,ovr:.1,str:.1};function Q0(n){return Math.min(99,n.spd*Kt.spd+n.ovr*Kt.ovr+n.str*Kt.str)}function U0(n){const e=[];for(const a of n.placements)a.player&&z0.includes(a.slot.slot)&&e.push({slot:a.slot.slot,player:a.player,value:Q0(a.player)});return e.sort((a,s)=>s.value-a.value||(a.player.id<s.player.id?-1:1))}function Oi(n,e){const a=U0(n);return a.find(s=>s.player.id===e)??a[0]??null}function j0(n,e){return Oi(n,e)?.value??Ir}const q0=[3.27,5.78,5.88,5.85,5.91,5.93,5.2,5.41,5.17,4.48,4.26,16,26.85],Z0=[.3,4.62,4.99,14.52,4.91,4.77,7.37,7.3,4.69,2.01,5.29,9.98,29.26],Ao=5.88,X0=[.073,0,0,.396,.073,0,.292,.157,0,0,0,.008,0],Vi=n=>{const e=n.reduce((a,s)=>a+s,0);return n.map(a=>a/e)},Mo=Vi(Z0.map((n,e)=>e===0?Ao:Math.max(0,n-Ao*X0[e]))),xt=Vi(q0),$0=(()=>{const n=xt.length,e=[0],a=[0];for(let s=0;s<n;s++)e.push(e[s]+xt[s]),a.push(a[s]+Mo[s]);return xt.map((s,t)=>Mo.map((r,o)=>s===0?t===o?1:0:Math.max(0,Math.min(e[t+1],a[o+1])-Math.max(e[t],a[o]))/s))})(),Jo=n=>n<=10?n:n<=14?11:12,_o=n=>n===0||n===3||n>=6;function nu(n,e,a){if(a===0)return[n,n];let s=[n,e],t=1/0;for(let r=0;r<=45;r++){const o=r+a;if(!_o(r)||!_o(o)||o>58)continue;const l=o+r-(n+e),i=1.5*Math.abs(l)+(l<0?1.5*-l:0)+Math.abs(o-n)+Math.abs(r-e);i<t&&(t=i,s=[o,r])}return s}function eu(n,e,a,s){const t=n===e?a:n>e,r=t?n:e,o=t?e:n,l=r-o,i=Jo(l);let f=s.next(),d=0;const u=$0[i];for(;d<u.length-1&&(f-=u[d],!(f<0));d++);let h;d<=10?h=d:d===11?h=Jo(l)===11?l:s.int(11,14):h=l>=15?l:s.int(15,24);const[p,v]=nu(r,o,h);return t?[p,v]:[v,p]}const be=n=>n==="home"?"away":"home";function Bt(n,e){if(e<=0)return 0;const a=Math.exp(-e);let s=0,t=1;do s++,t*=n.next();while(t>a);return s-1}function ne(n,e){return n.next()<e}function Yi(n,e){let a=0;for(const t of e)a+=t;let s=n.next()*a;for(let t=0;t<e.length;t++)if(s-=H(e,t),s<0)return t;return e.length-1}function zi(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=H(e,a);e[a]=H(e,s),e[s]=t}return e}function Ua(n,e){const a=e.reduce((l,i)=>l+i,0),s=e.map(l=>n*l/a),t=s.map(Math.floor);let r=n-t.reduce((l,i)=>l+i,0);const o=s.map((l,i)=>[l-H(t,i),i]).sort((l,i)=>i[0]-l[0]);for(let l=0;r>0;l++,r--){const i=H(o,l%o.length)[1];t[i]=H(t,i)+1}return t}function Fo(n,e){return n===1?ne(e,.5)?0:3:n===2?3:n===4?ne(e,.5)?3:6:n===5?ne(e,.5)?6:3:n}const qs=n=>n===0||n===3||n>=6;function Wo(n,e){return{rush:le(Math.round(n.expRush*Math.exp(.3*e.normal()-.045)),15,345),pass:le(Math.round(n.expPass*Math.exp(.26*n.vm*e.normal()-.0338*n.vm*n.vm)),45,520),to:le(Bt(e,n.lamTO),0,6),sacks:le(Bt(e,n.lamSack),0,9)}}const au=n=>n==="xp"?1:n==="two"?2:0;function Po(n,e,a){let s=0;for(let g=0;g<e;g++)ne(a,.12)&&s++;for(;s>0&&!qs(n-7*s);)s--;let t=ne(a,.035)&&qs(n-7*s-2)?1:0;const r=n-7*s-2*t;qs(r)||(t=0,s=0);const o=n-7*s-2*t;if(!qs(o))throw new Error("decompose: cannot score "+n);const l=o*.24/3,i=[];for(let g=0;3*g<=o;g++){const B=o-3*g;if(!(B!==0&&B<6))for(let T=Math.ceil(B/8);6*T<=B;T++){const S=B-6*T,w=Math.max(S-T,0),D=S-2*w,C=T-D-w;C<0||i.push({b:g,n:T,w:Math.exp(-.5*((g-l)/1)**2)*Math.exp(-1.4*C)+1e-6})}}const f=H(i,Yi(a,i.map(g=>g.w))),d=o-3*f.b,u=d-6*f.n;let h=Math.max(u-f.n,0),p=u-2*h;for(;p>=2&&h+p-1<=f.n&&ne(a,.22);)p-=2,h+=1;const v=[];for(let g=0;g<p;g++)v.push("xp");for(let g=0;g<h;g++)v.push("two");for(let g=v.length;g<f.n;g++)v.push(ne(a,.6)?"xp_miss":"two_fail");return{td:f.n,fg:f.b,convs:zi(a,v),dTD:s,sf:t}}function su(n,e){return e<4?1:n<=-9?.55:n<=-4?.75:n>=17?1.85:n>=9?1.55:n>=4?1.25:n<=-1?.9:n>=1?1.1:1}const Ot={TD:68,FG:46,FG_MISS:44,PUNT:24,INT:26,FUM:25,DOWNS:32,HALF:24,SAFETY:14},Go={TD:1,FG:3,FG_MISS:3,PUNT:3,INT:2,FUM:2,DOWNS:4,HALF:2,SAFETY:2};function No(n,e,a,s,t,r,o,l,i){const f=[];n.convs.forEach(p=>f.push({end:"TD",conv:p}));for(let p=0;p<n.fg;p++)f.push({end:"FG"});for(let p=0;p<t;p++)f.push({end:"FG_MISS"});for(let p=0;p<e;p++)f.push({end:ne(l,.65)?"INT":"FUM",defTD:p<a.dTD});for(let p=0;p<a.sf;p++)f.push({end:"SAFETY"});for(let p=0;p<s;p++)f.push({end:"DOWNS"});const d=new Array(r).fill(null),u=[i[0]?o-1:-1,i[1]?r-1:-1];for(const p of u)p>=0&&f.length<r-1&&(d[p]={end:"HALF"});zi(l,f);let h=0;for(let p=0;p<r;p++)d[p]||(d[p]=h<f.length?H(f,h++):{end:"PUNT"});return d}function Io(n,e,a,s,t){return n.td+n.fg+t+e+a.sf+s}function Qi(n,e,a,s){const t=s.homeField??ki,r=a.fork("aggregates"),o={home:Wo(n,r),away:Wo(e,r)},l=(b,_,x)=>le(pt+x+ks*(_.rush-Ia)+ws*(_.pass-Ha)-Ds*(_.to-Ka)-bs*(_.sacks-xa)+b.channels.kick+b.extraPts-b.planCost+wi*b.vm*r.normal(),0,58),i=l(n,o.home,t),f=l(e,o.away,0),d=[Fo(Math.round(i),r),Fo(Math.round(f),r)],[u,h]=eu(d[0],d[1],i>=f,a.fork("margin")),p=a.fork("drives"),v={home:Po(u,o.away.to,p),away:Po(h,o.home.to,p)},g={home:Bt(p,.35),away:Bt(p,.35)},B={home:0,away:0};for(const b of["home","away"])for(let _=0;_<v[b].fg;_++)ne(p,.176)&&B[b]++;const T=le(Math.round(10.8+.9*p.normal()),9,13),S=Math.max(T,Io(v.home,o.home.to,v.away,g.home,B.home)+1,Io(v.away,o.away.to,v.home,g.away,B.away)+1),w=S%2===0?le(S/2+p.pick([-1,0,0,1]),3,S-3):ne(p,.5)?(S-1)/2:(S+1)/2,D=ne(p,.5)?"home":"away",C=[ne(p,.55),ne(p,.55)],E=be(D),F=D,G=b=>[C[0]&&E===b,C[1]&&F===b],A={home:No(v.home,o.home.to,v.away,g.home,B.home,S,w,p,G("home")),away:No(v.away,o.away.to,v.home,g.away,B.away,S,w,p,G("away"))},J=[],N={home:0,away:0};for(let b=0;b<2;b++){const _=b===0?w:S-w,x=b===0?D:be(D);for(let j=0;j<_;j++)for(const tn of[x,be(x)])J.push({side:tn,idx:N[tn]++,half:b})}const O=J.map(b=>{const _=H(A[b.side],b.idx);return{side:b.side,period:1,start:0,secs:0,plays:0,rush:0,pass:0,sacks:0,end:_.end,pts:_.end==="TD"?6+au(_.conv):_.end==="FG"?3:0,..._.conv!==void 0?{conv:_.conv}:{},oppPts:_.end==="SAFETY"?2:_.defTD?7:0,defTD:!!_.defTD}}),Z=new Map;{const b={home:0,away:0};O.forEach((_,x)=>{Z.set(_,su(b[_.side]-b[be(_.side)],1+Math.floor(x/O.length*4))),b[_.side]+=_.pts,b[be(_.side)]+=_.oppPts})}for(const b of["home","away"]){const _=O.map((un,Tn)=>[un,Tn]).filter(([un])=>un.side===b).map(([un])=>un),x=_.map(un=>Ot[un.end]*Math.exp(.5*p.normal())*Z.get(un)),j=_.map(un=>Ot[un.end]*Math.exp(.5*p.normal())/Z.get(un)),tn=Ua(o[b].rush,x),dn=Ua(o[b].pass,j);_.forEach((un,Tn)=>{un.rush=H(tn,Tn),un.pass=H(dn,Tn)}),_.forEach(un=>{un.plays=le(Math.max(Go[un.end],Math.round((un.rush+un.pass)/5.15+.9*p.normal())),1,22)});for(let un=0;un<o[b].sacks;un++){const Tn=Yi(p,_.map(rn=>rn.plays)),nn=H(_,Tn);nn.sacks>=nn.plays-1&&nn.plays++,nn.sacks++}}let U=0;for(let b=0;b<2;b++){const _=O.filter((j,tn)=>H(J,tn).half===b),x=Ua(1800,_.map(j=>j.plays*26*Math.exp(.28*p.normal())+(j.end==="HALF"?10:0)));_.forEach((j,tn)=>{j.start=U,j.secs=H(x,tn),j.period=Math.min(4,Math.floor(U/900)+1),U+=H(x,tn)})}let X=u,an=h,sn=null,z=0;if(u===h){const b=a.fork("overtime"),_=ne(b,.5)?"home":"away",x={home:0,away:0},j=s.otLimit??(s.playoff?900:600);let tn=5,dn=0;const un={home:n,away:e},Tn=(Sn,Fn,Xn)=>{const vn=un[Sn].structPts/pt,Ln=b.next(),In=le(.27*vn,.1,.5),Vn=le(.2*Math.sqrt(vn),.08,.3),$n=le(.11/Math.sqrt(vn),.05,.2);let bn="PUNT";Ln<In?bn="TD":Ln<In+Vn?bn=ne(b,.87)?"FG":"FG_MISS":Ln<In+Vn+$n?bn=ne(b,.65)?"INT":"FUM":Ln<In+Vn+$n+.03&&(bn="DOWNS");const de=(bn==="INT"||bn==="FUM")&&ne(b,.1);let me=le(Math.round(150+50*b.normal()),30,330);me=Math.min(me,Fn);const ge=Math.max(1,Math.round(Ot[bn]*Math.exp(.4*b.normal()))),Pe=Math.round(ge*le(.4+.1*b.normal(),.15,.7)),fs=ge-Pe;let oa=0,ue;if(bn==="TD"){const ga=Xn(6);ue=ga?"none":"xp",oa=ga?6:7}else bn==="FG"&&(oa=3);return{side:Sn,period:tn,start:3600+z,secs:me,plays:Math.max(Go[bn],Math.round(ge/5.3)),rush:Pe,pass:fs,sacks:0,end:bn,pts:oa,...ue!==void 0?{conv:ue}:{},oppPts:de?7:0,defTD:de}},nn=Sn=>{O.push(Sn),z+=Sn.secs,dn+=Sn.secs,x[Sn.side]+=Sn.pts,x[be(Sn.side)]+=Sn.oppPts};let rn=!1;const mn=Tn(_,Math.min(330,j),()=>!1);if(nn(mn),mn.oppPts>0&&(rn=!0),!rn){const Sn=x[_],Fn=Tn(be(_),Math.max(30,j-dn),Xn=>Xn>Sn-x[be(_)]);nn(Fn),(Fn.oppPts>0||x.home!==x.away)&&(rn=!0)}let cn=_;for(;!rn;){const Sn=j-dn;if(Sn<=0){if(s.playoff){tn++,dn=0;continue}break}const Fn=Tn(cn,Sn,()=>!0);Fn.secs>=Sn&&Fn.pts===0&&Fn.oppPts===0&&(Fn.end="HALF"),nn(Fn),(Fn.pts>0||Fn.oppPts>0)&&(rn=!0),cn=be(cn)}X+=x.home,an+=x.away,sn={first:_,periods:tn-4,tie:X===an}}const $=[];O.forEach((b,_)=>{b.pts>0&&$.push({side:b.side,kind:b.end==="TD"?"TD":"FG",pts:b.pts,...b.conv!==void 0?{conv:b.conv}:{},drive:_,period:b.period,at:b.start+b.secs}),b.oppPts>0&&$.push({side:be(b.side),kind:b.defTD?"DEF_TD":"SAFETY",pts:b.oppPts,drive:_,period:b.period,at:b.start+b.secs})});const W=()=>({rush:0,pass:0,yards:0,plays:0,giveaways:0,takeaways:0,sacksTaken:0,drives:0,top:0,fgMade:0,fgMissed:0}),I={home:W(),away:W()};for(const b of O){const _=I[b.side];_.rush+=b.rush,_.pass+=b.pass,_.yards+=b.rush+b.pass,_.plays+=b.plays,_.sacksTaken+=b.sacks,_.drives++,_.top+=b.secs,b.end==="FG"&&_.fgMade++,b.end==="FG_MISS"&&_.fgMissed++,(b.end==="INT"||b.end==="FUM")&&(_.giveaways++,I[be(b.side)].takeaways++)}const Y={home:o.home,away:o.away};return{homeScore:X,awayScore:an,regHome:u,regAway:h,drives:O,events:$,stats:I,agg:Y,ot:sn,otSecs:z}}function Ho(n,e,a){return l0((n.structPts-e.structPts+a)/Math.sqrt(n.sd*n.sd+e.sd*e.sd))}function Ko(n,e){let a=n[0],s=-1/0;for(const t of n){const r=e(t);r>s&&(s=r,a=t)}return{o:a,v:s}}function gr(n,e){const a={off:ht,def:vt};let s=ht,t=vt;const r=v=>Ho(Ve(n,e,e,{off:v,def:a.def}),Ve(e,n,e,{off:a.off,def:t}),0),o=v=>Ho(Ve(n,e,e,{off:s,def:a.def}),Ve(e,n,e,{off:a.off,def:v}),0);for(let v=0;v<2;v++)s=Ko(Mi,r).o,t=Ko(Ji,o).o;const l=n.rb-e.rb,i=n.olRun-e.olRun,f=n.qb-e.qb,d=n.rec-e.rec,u=n.olPass-e.olPass,h=.35*l+.65*i-(.45*f+.3*d+.25*u),p=n.frontRun-e.frontRun-(.5*(n.coverage-e.coverage)+.5*(n.passRush-e.passRush));return{off:s,def:t,tilt:h,tiltD:p}}const tu=[[["East","North"],["South","West"]],[["East","South"],["North","West"]],[["East","West"],["North","South"]]];function ru(n,e){const a=f=>{const d=e[f];if(d===void 0)throw new Error(`schedule: no rank for ${f}`);return d},s=(f,d)=>La(f,d).slice().sort((u,h)=>a(u)-a(h));for(const f of["AFC","NFC"])for(const d of Ke)if(La(f,d).map(h=>e[h]).sort().join()!=="1,2,3,4")throw new Error(`schedule: ranks in ${f} ${d} must be 1-4 once each`);const t=[];for(const f of["AFC","NFC"])for(const d of Ke){const u=s(f,d);for(let h=0;h<4;h++)for(let p=h+1;p<4;p++)t.push({home:H(u,h),away:H(u,p),kind:"div"}),t.push({home:H(u,p),away:H(u,h),kind:"div"})}const r=H(tu,(n%3+3)%3);for(const f of["AFC","NFC"])for(const[d,u]of r){const h=s(f,d),p=s(f,u);for(let v=0;v<4;v++)for(let g=0;g<4;g++)t.push((v+g+n)%2===0?{home:H(h,v),away:H(p,g),kind:"conf4"}:{home:H(p,g),away:H(h,v),kind:"conf4"})}const o=f=>(f+n)%4,l=f=>(f+n+1+Math.floor(n/4)%3)%4;Ke.forEach((f,d)=>{const u=s("AFC",f),h=s("NFC",H(Ke,o(d)));for(let p=0;p<4;p++)for(let v=0;v<4;v++)t.push((p+v+n)%2===0?{home:H(u,p),away:H(h,v),kind:"inter4"}:{home:H(h,v),away:H(u,p),kind:"inter4"})});for(const f of["AFC","NFC"]){const[[d,u],[h,p]]=r,v=[[d,h],[h,u],[u,p],[p,d]];for(const[g,B]of v){const T=s(f,g),S=s(f,B);for(let w=0;w<4;w++)t.push(n%2===0?{home:H(T,w),away:H(S,w),kind:"conf2"}:{home:H(S,w),away:H(T,w),kind:"conf2"})}}const i=n%2===0;return Ke.forEach((f,d)=>{const u=s("AFC",f),h=s("NFC",H(Ke,l(d)));for(let p=0;p<4;p++)t.push(i?{home:H(h,p),away:H(u,p),kind:"inter1"}:{home:H(u,p),away:H(h,p),kind:"inter1"})}),t}const ou=[5,6,7,8,9,10,11,12,13,14],lu=[4,4,4,4,4,4,2,2,2,2];function iu(n,e,a,s=400){const t=ru(e,a),r=[...new Set(t.map(o=>o.home))];for(let o=0;o<s;o++){const l=cu(t,r,n);if(l)return l}throw new Error("schedule: no weekly assignment found")}function st(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),t=H(e,a);e[a]=H(e,s),e[s]=t}return e}function cu(n,e,a){const s=new Array(n.length).fill(0),t=new Map;n.forEach((i,f)=>{if(i.kind==="div"){const d=[i.home,i.away].sort().join("|");(t.get(d)??t.set(d,[]).get(d)).push(f)}});for(const i of["AFC","NFC"])for(const f of Ke){const d=st(a,La(i,f));for(const[u,h]of[[H(d,0),H(d,1)],[H(d,2),H(d,3)]]){const p=t.get([u,h].sort().join("|"));s[H(p,a.int(0,1))]=18}}const r=new Map,o=[];ou.forEach((i,f)=>{for(let d=0;d<H(lu,f);d++)o.push(i)}),st(a,o),st(a,e.slice()).forEach((i,f)=>r.set(i,H(o,f)));const l=new Set(n.map((i,f)=>f).filter(i=>s[i]===0));for(let i=1;i<=17;i++){const f=e.filter(u=>r.get(u)!==i),d=fu(n,l,f,a);if(!d)return null;for(const u of d)s[u]=i,l.delete(u)}return l.size?null:n.map((i,f)=>({...i,week:H(s,f)}))}function fu(n,e,a,s){const t=new Set(a),r=new Map;for(const d of a)r.set(d,[]);for(const d of e){const u=H(n,d);t.has(u.home)&&t.has(u.away)&&(r.get(u.home).push(d),r.get(u.away).push(d))}const o=new Set,l=[];let i=0;const f=()=>{if(++i>4e3)return!1;let d=null,u=1e9;for(const p of a)if(!o.has(p)){const v=r.get(p).filter(g=>!o.has(H(n,g).home)&&!o.has(H(n,g).away)).length;v<u&&(u=v,d=p)}if(d===null)return!0;if(u===0)return!1;const h=st(s,r.get(d).filter(p=>!o.has(H(n,p).home)&&!o.has(H(n,p).away)));for(const p of h){const{home:v,away:g}=H(n,p);if(o.add(v),o.add(g),l.push(p),f())return!0;o.delete(v),o.delete(g),l.pop()}return!1};return f()?l.slice():null}function Ui(n,e,a){const s=n+e+a;return s===0?0:(n+.5*a)/s}let du=class{rows=new Map;constructor(e){for(const a of wn)this.rows.set(a.name,[]);for(const a of e)this.rows.get(a.home).push({opp:a.away,pf:a.hs,pa:a.as,tdf:a.htd,tda:a.atd}),this.rows.get(a.away).push({opp:a.home,pf:a.as,pa:a.hs,tdf:a.atd,tda:a.htd})}rec(e,a=()=>!0){let s=0,t=0,r=0;for(const o of this.rows.get(e))a(o)&&(o.pf>o.pa?s++:o.pf<o.pa?t++:r++);return{w:s,l:t,t:r,n:s+t+r}}pct(e,a){const s=this.rec(e,a);return Ui(s.w,s.l,s.t)}overall(e){return this.pct(e)}net(e,a=()=>!0){let s=0;for(const t of this.rows.get(e))a(t)&&(s+=t.pf-t.pa);return s}netTD(e){let a=0;for(const s of this.rows.get(e))a+=s.tdf-s.tda;return a}sov(e){return this.oppPct(e,a=>a.pf>a.pa)}sos(e){return this.oppPct(e,()=>!0)}oppPct(e,a){let s=0,t=0;for(const r of this.rows.get(e))if(a(r)){const o=this.rec(r.opp);s+=o.w+.5*o.t,t+=o.n}return t===0?0:s/t}total(e,a){let s=0;for(const t of this.rows.get(e))s+=t[a];return s}};const Me=n=>Bs(Et,n),uu=(n,e)=>Me(n).conf===Me(e).conf&&Me(n).div===Me(e).div,xo=(n,e)=>Me(n).conf===Me(e).conf;function Oo(n,e,a){const s=n.total(e,"pf"),t=n.total(e,"pa");return 1+a.filter(r=>n.total(r,"pf")>s).length+1+a.filter(r=>n.total(r,"pa")<t).length}const ji=1e-12;function pe(n,e){const a=n.map(e),s=Math.max(...a),t=n.filter((r,o)=>H(a,o)>s-ji);return t.length===n.length?null:t}function pu(n,e){const a=g=>{if(n==="division")return pe(g,B=>{let T=0,S=0,w=0;for(const D of g)if(D!==B){const C=e.rec(B,E=>E.opp===D);T+=C.w,S+=C.l,w+=C.t}return Ui(T,S,w)});if(g.length===2)return pe(g,B=>e.pct(B,T=>T.opp===g.find(S=>S!==B)));for(const B of g)if(g.filter(S=>S!==B).every(S=>{const w=e.rec(B,D=>D.opp===S);return w.n>0&&w.w===w.n}))return[B];for(const B of g)if(g.filter(S=>S!==B).every(S=>{const w=e.rec(B,D=>D.opp===S);return w.n>0&&w.l===w.n}))return g.filter(S=>S!==B);return null},s=g=>pe(g,B=>e.pct(B,T=>uu(B,T.opp))),t=g=>pe(g,B=>e.pct(B,T=>xo(B,T.opp))),r=g=>B=>{const T=B.map(D=>new Set(e.rows.get(D).map(C=>C.opp))),S=[...H(T,0)].filter(D=>!B.includes(D)&&T.every(C=>C.has(D))),w=D=>S.includes(D.opp);return!S.length||B.some(D=>e.rec(D,w).n<g)?null:pe(B,D=>e.pct(D,w))},o=g=>pe(g,B=>e.sov(B)),l=g=>pe(g,B=>e.sos(B)),i=g=>wn.filter(B=>B.conf===Me(H(g,0)).conf).map(B=>B.name),f=g=>{const B=i(g);return pe(g,T=>-Oo(e,T,B))},d=g=>{const B=wn.map(T=>T.name);return pe(g,T=>-Oo(e,T,B))},u=g=>{const B=g.map(S=>new Set(e.rows.get(S).map(w=>w.opp))),T=[...H(B,0)].filter(S=>!g.includes(S)&&B.every(w=>w.has(S)));return T.length?pe(g,S=>e.net(S,w=>T.includes(w.opp))):null},h=g=>pe(g,B=>e.net(B,T=>xo(B,T.opp))),p=g=>pe(g,B=>e.net(B)),v=g=>pe(g,B=>e.netTD(B));return n==="division"?[a,s,r(0),t,o,l,f,d,u,p,v]:[a,t,r(4),o,l,f,d,h,p,v]}function qi(n,e,a,s){const t=pu(e,a);let r=n.slice();n:for(;r.length>1;){for(const i of t){const f=i(r);if(f&&f.length<r.length&&f.length>0){r=f;continue n}}const o=r.slice().sort(),l=s.fork("coin:"+o.join("|")).next();return H(o,Math.floor(l*o.length))}return H(r,0)}function Zi(n,e,a,s){const t=[];let r=n.slice();for(;r.length>1;){const o=qi(r,e,a,s);t.push(o),r=r.filter(l=>l!==o)}return t.concat(r)}function Vo(n,e,a){const s=[];let t=n.slice();for(;t.length;){const r=[];for(const l of new Set(t.map(i=>Me(i).conf+Me(i).div))){const i=t.filter(f=>Me(f).conf+Me(f).div===l);r.push(i.length>1?H(Zi(i,"division",e,a),0):H(i,0))}const o=r.length===1?H(r,0):qi(r,"wildcard",e,a);s.push(o),t=t.filter(l=>l!==o)}return s}function Vt(n,e){const a=n.slice().sort((t,r)=>e.overall(r)-e.overall(t)),s=[];for(const t of a){const r=s[s.length-1];r&&Math.abs(e.overall(H(r,0))-e.overall(t))<ji?r.push(t):s.push([t])}return s}function Xi(n,e){const a=new du(n),s={},t={},r={AFC:[],NFC:[]},o={AFC:[],NFC:[]};for(const l of["AFC","NFC"]){for(const u of Ke){const h=Vt(La(l,u),a).flatMap(p=>p.length>1?Zi(p,"division",a,e):p);s[`${l} ${u}`]=h,h.forEach((p,v)=>t[p]=v+1),o[l].push(H(h,0))}const i=Vt(o[l],a).flatMap(u=>u.length>1?Vo(u,a,e):u),f=wn.filter(u=>u.conf===l&&!o[l].includes(u.name)).map(u=>u.name),d=Vt(f,a).flatMap(u=>u.length>1?Vo(u,a,e):u).slice(0,3);r[l]=[...i,...d]}return{seeds:r,divisionOrder:s,divisionRank:t,divisionWinners:o}}function hu(n){const e=Object.fromEntries(n.map(s=>[s.name,s.ratings])),a={};for(const s of["AFC","NFC"])for(const t of Ke)La(s,t).sort((r,o)=>Bs(e,o).off+Bs(e,o).def-Bs(e,r).off-Bs(e,r).def).forEach((r,o)=>a[r]=o+1);return a}function Yo(n,e){return n.events.filter(a=>a.side===e&&(a.kind==="TD"||a.kind==="DEF_TD")).length}const Yr=18,tt=["Wild Card","Divisional","Conference","Super Bowl"],vu=n=>n.year+n.run,Lt=n=>n.nextWeek>22,zr=n=>n>=19&&n<=22?tt[n-19]??null:null;function mu(n,e){ec(n);const a=e.run??0,s=e.prevRank??hu(n),t=iu(je(e.seed).fork("schedule"),e.year+a,s).sort((r,o)=>r.week-o.week);return{seed:e.seed,year:e.year,run:a,prevRank:s,homeField:e.homeField,schedule:t,nextWeek:1,scores:[],playoffs:[],seeding:null,champion:null}}const gu=(n,e,a)=>e?`po:${e}:${a}`:`w${n}:${a}`,At=(n,e,a)=>W0(n,gu(e,zr(e),a));function $i(n){if(Lt(n))return[];const e=n.nextWeek,a=zr(e),s=a?Cu(n,a):n.schedule.filter(r=>r.week===e).map(r=>[r.home,r.away]),t=a==="Super Bowl"?0:n.homeField;return s.map(([r,o])=>({week:e,round:a,home:r,away:o,seed:At(n.seed,e,r),...t!==void 0?{homeField:t}:{}}))}function Bu(n,e){if(ec(n),Lt(e))throw new Error("season: already finished");const a=new Map(n.map(d=>[d.name,d.ratings])),s=Kr(n.map(d=>d.ratings)),t=new Map;for(const d of n){const u=gr(d.ratings,s);t.set(d.name,{off:u.off,def:u.def})}const r=$i(e),o=zr(e.nextWeek),l=r.map(d=>{const u=a.get(d.home),h=a.get(d.away),p=Ve(u,h,s,{off:t.get(d.home).off,def:t.get(d.away).def}),v=Ve(h,u,s,{off:t.get(d.away).off,def:t.get(d.home).def});return{home:d.home,away:d.away,round:o,result:Qi(p,v,je(d.seed),{playoff:o!==null,...d.homeField!==void 0?{homeField:d.homeField}:{}})}}),i=l.map(d=>({week:e.nextWeek,home:d.home,away:d.away,hs:d.result.homeScore,as:d.result.awayScore,htd:Yo(d.result,"home"),atd:Yo(d.result,"away"),...d.round?{round:d.round}:{}})),f={...e,scores:o?e.scores:[...e.scores,...i],playoffs:o?[...e.playoffs,...i]:e.playoffs,nextWeek:e.nextWeek+1};return e.nextWeek===Yr&&(f.seeding=Xi(f.scores,je(e.seed).fork("seeding"))),o==="Super Bowl"&&(f.champion=nc(H(i,0))),{state:f,games:l}}function Fs(n){const e=Object.fromEntries(wn.map(s=>[s.name,{w:0,l:0,t:0,pf:0,pa:0}])),a=s=>{const t=e[s];if(!t)throw new Error("season: unknown team "+s);return t};for(const s of n.scores){const t=a(s.home),r=a(s.away);t.pf+=s.hs,t.pa+=s.as,r.pf+=s.as,r.pa+=s.hs,s.hs>s.as?(t.w++,r.l++):s.hs<s.as?(r.w++,t.l++):(t.t++,r.t++)}return e}const nc=n=>n.hs>n.as?n.home:n.away;function Cu(n,e){const a=n.seeding;if(!a)throw new Error("season: playoffs before the regular season is done");const s=(r,o)=>n.playoffs.filter(l=>l.round===r&&Et[l.home]?.conf===o).map(nc);if(e==="Super Bowl"){const r=l=>H(s("Conference",l),0);return[vu(n)%2===1?[r("AFC"),r("NFC")]:[r("NFC"),r("AFC")]]}const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r],l=i=>o.indexOf(i)+1;if(e==="Wild Card")for(const[i,f]of[[2,7],[3,6],[4,5]])t.push([H(o,i-1),H(o,f-1)]);else if(e==="Divisional"){const i=[H(o,0),...s("Wild Card",r)].sort((f,d)=>l(f)-l(d));t.push([H(i,0),H(i,i.length-1)],[H(i,1),H(i,2)])}else{const i=s("Divisional",r).sort((f,d)=>l(f)-l(d));t.push([H(i,0),H(i,1)])}}return t}function ec(n){if(n.length!==32)throw new Error("season: 32 teams needed");const e=new Set(n.map(a=>a.name));for(const a of wn)if(!e.has(a.name))throw new Error("season: missing team "+a.name)}const ac=["att","cmp","pyd","ptd","ints","sacked","car","ryd","rtd","fumLost","tgt","rec","recYd","recTd","twoPt","tkl","tfl","sack","press","pd","intDef","intDefYd","ff","fr","defTd","safeties","fgm","fga","xpm","xpa","punts","puntYd","kr","krYd","pr","prYd"],Qr=()=>Object.fromEntries(ac.map(n=>[n,0])),yu=n=>n==="home"?"away":"home",Oa=(n,e,a)=>Math.min(a,Math.max(e,n)),Tu=["OT1","OT2","OG1","OG2","C"],zo=(n,e,a,s)=>Math.exp(e*(n.ovr-80)+a*(n.p.spd-80)+s*(n.p.str-80));function Su(n,e){switch(e){case"DE1":case"DE2":return"DE";case"DT1":return"DT";case"DT2":return n==="3-4"?"ILB":"DT";case"DL5":return"DL5";case"MIKE":return"ILB";case"WILL":case"SAM":return n==="3-4"?"OLB34":"LB";case"CB1":case"CB2":return"CB";case"CB3":case"DIME":return"NB";case"FS":return"FS";case"SS":return"SS";default:return null}}const ku={run:{DE:.075,DT:.08,DL5:.03,ILB:.17,LB:.11,OLB34:.09,CB:.035,NB:.02,FS:.06,SS:.11},pass:{DE:.02,DT:.015,DL5:.005,ILB:.09,LB:.08,OLB34:.07,CB:.12,NB:.09,FS:.13,SS:.12},sack:{DE:.3,DT:.15,DL5:.05,ILB:.03,LB:.05,OLB34:.3,CB:.01,NB:.015,FS:.005,SS:.01},press:{DE:.26,DT:.18,DL5:.05,ILB:.04,LB:.06,OLB34:.24,CB:.015,NB:.02,FS:.01,SS:.015},int:{DE:.005,DT:.003,DL5:.001,ILB:.05,LB:.055,OLB34:.045,CB:.17,NB:.12,FS:.2,SS:.13},pd:{DE:.01,DT:.005,DL5:0,ILB:.04,LB:.045,OLB34:.035,CB:.26,NB:.14,FS:.12,SS:.1}},wu={RB1:.6,RB2:.18,FB:.04,QB:.07,WR1:.01,WR2:.01,WR3:.01},Du={RB1:.55,RB2:.15,FB:.08,QB:.12,WR1:.01,WR2:.01},bu={WR1:.21,WR2:.18,WR3:.12,WR4:.02,TE1:.16,TE2:.05,TE3:.01,RB1:.1,RB2:.04,FB:.01},Ru={WR1:.22,WR2:.17,WR3:.11,WR4:.01,TE1:.22,TE2:.08,TE3:.01,RB1:.06,RB2:.03,FB:.02},Eu={WR1:1,WR2:1,WR3:1,WR4:1,TE1:.8,TE2:.8,TE3:.8,RB1:.6,RB2:.6,FB:.5};function Lu(n,e,a,s){const t={id:`ghost|${s}|${n}`,name:`Backup ${s}`,pos:s,role:s,team:n,ovr:70,spd:70,str:70,freeAgent:!1};return{line:{id:t.id,name:t.name,team:n,side:e,slot:a,label:a,stats:Qr()},p:t,ovr:70,slot:a,kind:""}}function Qo(n,e){const a=[];for(const v of n.lineup.placements){if(!v.player||Tu.includes(v.slot.slot))continue;const g=Su(n.lineup.base,v.slot.slot)??"";a.push({line:{id:v.player.id,name:v.player.name,team:n.team,side:e,slot:v.slot.slot,label:v.slot.label,stats:Qr()},p:v.player,ovr:v.effOvr,slot:v.slot.slot,kind:g})}const s=(v,g)=>{const B=a.find(S=>S.slot===v);if(B)return B;const T=Lu(n.team,e,v,g);return a.push(T),T},t=s("QB","QB"),r=s("K","K"),o=s("P","P"),l=(v,g)=>a.filter(B=>v[B.slot]!==void 0).map(B=>[B,v[B.slot]*zo(B,g,0,0)]),i=(v,g)=>{const B=l(v,g);return B.length?B:[[t,1]]},f=(v,g,B,T)=>a.filter(S=>S.kind).map(S=>[S,ku[v][S.kind]*zo(S,g,B,T)]).filter(S=>S[1]>0),d=f("run",.02,.003,.005),u=f("pass",.02,.004,.002),h=(v,g)=>v.map(([B,T],S)=>[B,(T+H(g,S)[1])/2]),p=Oi(n.lineup,n.returnerId);return{side:e,team:n.team,qb:t,k:r,pt:o,returner:p?a.find(v=>v.p.id===p.player.id)??null:null,retValue:p?.value??82,carry:i(wu,.02),carryRz:i(Du,.02),target:i(bu,.02),targetRz:i(Ru,.02),runTkl:d,passTkl:u,sack:f("sack",.035,.01,.006),press:f("press",.03,.008,.005),ints:f("int",.03,.008,0),pd:f("pd",.03,.008,0),ff:d.map(([v,g])=>[v,g*Math.exp(.008*(v.p.str-80))]),fr:h(d,u),all:a}}function re(n,e){let a=0;for(const t of e)a+=t[1];let s=n.next()*a;for(const[t,r]of e)if(s-=r,s<0)return t;return H(e,e.length-1)[0]}const ae=n=>({id:n.p.id,name:n.p.name,team:n.line.team,label:n.line.label}),Au=n=>Math.exp(.012*(n.p.spd-80)+.004*(n.p.str-80)),Mu=.645;function Ju(n,e,a,s,t){const r=n.end==="FG"||n.end==="FG_MISS"||n.end==="PUNT";let o=Math.max(0,n.plays-n.sacks-(r?1:0));o===0&&n.rush+n.pass>0&&(o=1);let l=!1;n.end==="TD"&&(l=n.pass>0&&(n.rush===0||t.next()<.28+.55*n.pass/(n.pass+n.rush)),o===0&&(o=1));const i=o?Ua(o,[n.rush/4.3+.15,n.pass/6.6+.15]):[0,0];let f=H(i,0),d=H(i,1);const u=n.end==="INT"?1:0,h=n.pass>0||l?1:0;(n.rush>0||n.end==="TD"&&!l)&&(f=Math.max(f,1)),d=Math.max(d,h+u);const p=d-u,v=Oa(Mu+.0035*(a.qb.ovr-80),.5,.78);let g=0;if(h){for(let A=0;A<p;A++)t.next()<v&&g++;g=Math.max(g,1)}const B=[];for(let A=0;A<f;A++)B.push(re(t,a.carry));let T=null;n.end==="TD"&&!l&&(T=re(t,a.carryRz),B[f-1]=T);const S=f?Ua(n.rush,B.map(A=>Math.exp(.6*t.normal())*Au(A))):[],w=(A,J)=>{if(H(A,J)>=1)return;let N=-1;for(let O=0;O<A.length;O++)O!==J&&H(A,O)>1&&(N<0||H(A,O)>H(A,N))&&(N=O);N>=0&&(A[N]=H(A,N)-1,A[J]=H(A,J)+1)};T&&w(S,f-1),B.forEach((A,J)=>{A.line.stats.car++,A.line.stats.ryd+=H(S,J)}),T&&T.line.stats.rtd++;const D=[];for(let A=0;A<g;A++)D.push(re(t,a.target));let C=null;l&&(C=re(t,a.targetRz),D[g-1]=C);const E=g?Ua(n.pass,D.map(A=>Math.exp(.55*t.normal())*(Eu[A.slot]??.7)*Math.exp(.012*(A.p.spd-80)))):[];C&&w(E,g-1),D.forEach((A,J)=>{A.line.stats.tgt++,A.line.stats.rec++,A.line.stats.recYd+=H(E,J)}),C&&C.line.stats.recTd++;for(let A=0;A<d-g;A++){const J=re(t,a.target);J.line.stats.tgt++}const F=a.qb.line.stats;F.att+=d,F.cmp+=g,F.pyd+=n.pass,F.sacked+=n.sacks,l&&F.ptd++,F.ints+=u,B.forEach((A,J)=>{if(A===T&&J===f-1)return;const N=re(t,s.runTkl);N.line.stats.tkl++,t.next()<(H(S,J)<=1?.2:H(S,J)<=3?.06:0)&&N.line.stats.tfl++}),D.forEach((A,J)=>{A===C&&J===g-1||re(t,s.passTkl).line.stats.tkl++});for(let A=0;A<n.sacks;A++){const J=re(t,s.sack).line.stats;J.sack++,J.press++,J.tkl++,J.tfl++}for(let A=0;A<d;A++)t.next()<.17&&re(t,s.press).line.stats.press++;for(let A=0;A<d-g-u;A++)t.next()<.45&&re(t,s.pd).line.stats.pd++;const G={drive:e,side:n.side,period:n.period,kind:n.end==="TD"?l?"PASS_TD":"RUSH_TD":n.end==="FG"?"FG":n.end==="FG_MISS"?"FG_MISS":n.end==="INT"?"INT":n.end==="FUM"?"FUM":n.end==="SAFETY"?"SAFETY":n.end==="PUNT"?"PUNT":n.end==="DOWNS"?"DOWNS":"HALF"};if(n.end==="TD"){const A=l?C:T;G.scorer=ae(A),G.tdYards=l?H(E,g-1):H(S,f-1),l&&(G.passer=ae(a.qb));const J=a.k.line.stats;if(n.conv!==void 0&&(G.conv=n.conv),n.conv==="xp")J.xpa++,J.xpm++,G.convKicker=ae(a.k);else if(n.conv==="xp_miss")J.xpa++,G.convKicker=ae(a.k);else if(n.conv==="two"||n.conv==="two_fail"){const N=t.next()<.55,O=re(t,N?a.targetRz:a.carryRz);G.convBy=ae(O),N&&(G.convPasser=ae(a.qb)),n.conv==="two"&&O.line.stats.twoPt++}}if(n.end==="FG"&&(a.k.line.stats.fga++,a.k.line.stats.fgm++,G.kicker=ae(a.k),G.kickYards=Oa(Math.round(35+8*t.normal()),19,63)),n.end==="FG_MISS"&&(a.k.line.stats.fga++,G.kicker=ae(a.k),G.kickYards=Oa(Math.round(46+7*t.normal()),30,66)),n.end==="PUNT"){a.pt.line.stats.punts++;const A=Oa(Math.round(45+5.5*t.normal()),28,66);a.pt.line.stats.puntYd+=A,G.kicker=ae(a.pt),G.kickYards=A}if(n.end==="INT"){const A=re(t,s.ints);A.line.stats.intDef++;const J=n.defTD?t.int(15,85):Math.max(0,Math.round(10+9*t.normal()));A.line.stats.intDefYd+=J,n.defTD&&A.line.stats.defTd++,G.giver=ae(a.qb),G.taker=ae(A),G.retYards=J,G.defTD=n.defTD}if(n.end==="FUM"){const A=[...B,...D],J=A.length?H(A,t.int(0,A.length-1)):a.qb;J.line.stats.fumLost++;const N=re(t,s.ff);N.line.stats.ff++;const O=re(t,s.fr);O.line.stats.fr++;const Z=n.defTD?t.int(5,70):t.int(0,12);n.defTD&&O.line.stats.defTd++,G.giver=ae(J),G.forcer=ae(N),G.taker=ae(O),G.retYards=Z,G.defTD=n.defTD}if((n.end==="INT"||n.end==="FUM")&&n.defTD&&(s.k.line.stats.xpa++,s.k.line.stats.xpm++,G.defKicker=ae(s.k)),n.end==="SAFETY"){const A=re(t,s.sack);A.line.stats.safeties++,G.taker=ae(A)}return G}function _u(n,e,a){const s=n.drives;for(let t=0;t<s.length;t++){const r=H(s,t),o=r.side,l=e[o];if(!l.returner)continue;const i=t>0?H(s,t-1):null,f=!i||r.start>=1800&&i.start<1800||r.period>=5&&i.period<5||i.pts>0||i.oppPts>0,d=i&&i.side!==o,u=l.returner.line.stats;f&&a.next()<.45?(u.kr++,u.krYd+=Oa(Math.round(24+.13*(l.retValue-82)+5*a.normal()),10,55)):!f&&d&&i&&i.end==="PUNT"&&a.next()<.36&&(u.pr++,u.prYd+=Oa(Math.round(8.5+.12*(l.retValue-82)+5*a.normal()),0,40))}}function Fu(n,e,a,s){const t={home:Qo(e,"home"),away:Qo(a,"away")},r=s.fork("box"),o=n.drives.map((l,i)=>Ju(l,i,t[l.side],t[yu(l.side)],r));return _u(n,t,r.fork("returns")),{home:e.team,away:a.team,lines:[...t.home.all,...t.away.all].map(l=>l.line),credits:o}}const Wu=new Set(["RB1","RB2","FB","WR1","WR2","WR3","WR4","TE1","TE2","TE3"]);function Uo(n){const e=n.stats;return n.slot==="QB"?.045*e.pyd+5*e.ptd-6*e.ints+.03*e.ryd+4*e.rtd-4*e.fumLost:.07*(e.ryd+e.recYd)+.3*e.rec+6*(e.rtd+e.recTd)+3*e.twoPt-8*e.fumLost}function Pu(n){const e=n.stats;return 4*e.sack+5*e.intDef+8*e.defTd+3*e.ff+2.5*e.fr+e.pd+.6*e.tfl+.25*e.tkl+.1*(e.press-e.sack)+4*e.safeties}const sc=n=>n.slot==="QB"||Wu.has(n.slot),Gu=n=>!sc(n)&&n.slot!=="K"&&n.slot!=="P",Nu=()=>({players:{}});function Iu(n,e){for(const a of e.lines){const s=n.players[a.id]??={id:a.id,name:a.name,team:a.team,slot:a.slot,label:a.label,games:0,stats:Qr()};s.games++,s.slot=a.slot,s.label=a.label,s.team=a.team;for(const t of ac)s.stats[t]+=a.stats[t]}}const tc=["pyd","ptd","ryd","rtd","recYd","rec","recTd","sack","intDef","tkl","ff","fgm","defTd"];function Ur(n,e,a=5){return Object.values(n.players).filter(s=>s.stats[e]>0).sort((s,t)=>t.stats[e]-s.stats[e]||(s.id<t.id?-1:1)).slice(0,a)}const jo=n=>n?n.w+n.t/2:8.5;function Hu(n,e,a){const s=Object.values(n.players).sort((h,p)=>h.id<p.id?-1:1),t=(h,p)=>h.reduce((v,g)=>v===null||p(g)>p(v)?g:v,null),r=s.filter(sc),o=s.filter(Gu),l=t(r,h=>Uo(h)*(1+.04*(jo(e[h.team])-9))),i=t(r.filter(h=>h!==l),h=>Uo(h)),f=t(o,h=>Pu(h));let d=null;for(const h of Object.keys(e).sort()){const p=jo(e[h]),v=a?.[h]??8.5,g=p-v;(!d||g>d.over||g===d.over&&p>d.wins)&&(d={team:h,wins:p,expected:v,over:g})}const u={};for(const h of tc)u[h]=Ur(n,h,5);return{mvp:l,opoy:i,dpoy:f,coach:d,leaders:u}}function Ku(n,e,a){const s=l=>l==="home"?e:a,t=l=>`${String(Math.floor(l/60)).padStart(2,"0")}:${String(l%60).padStart(2,"0")}`,r=(l,i)=>{if(i>=5)return`OT ${t(Math.max(0,l-3600))}`;const f=Math.min(4,Math.max(1,Math.ceil(l/900)));return`Q${f} ${t(Math.max(0,900*f-l))}`},o=n.drives.map((l,i)=>({kind:"drive",n:i+1,team:s(l.side),period:l.period,clock:r(l.start,l.period),plays:l.plays,yards:null,end:l.end,pts:l.pts,oppPts:l.oppPts,defTD:l.defTD,scores:n.events.filter(f=>f.drive===i+1).map(f=>({team:s(f.side),kind:f.kind,pts:f.pts,conv:f.conv??"none",at:f.at})),summary:xu(l,s(l.side))}));return{v:1,home:e,away:a,homeScore:n.homeScore,awayScore:n.awayScore,regHome:n.regHome,regAway:n.regAway,ot:n.ot?{first:s(n.ot.first),periods:n.ot.periods,tie:n.ot.tie}:null,drives:o,mvpLine:null}}function xu(n,e){const a={TD:"ends in a touchdown",FG:"kicks a field goal",FG_MISS:"misses a field goal",PUNT:"punts",INT:"throws an interception",FUM:"loses a fumble",DOWNS:"turns it over on downs",HALF:"runs out the half",SAFETY:"is sacked in the end zone for a safety"},s=Math.max(1,Math.round(n.secs/60)),t=n.oppPts?` ${e} gives up ${n.oppPts} the other way.`:"";return`${e} ${a[n.end]} — ${n.plays} plays, ${s} min.${t}`}const Ou=["olRun","olPass","rb","qb","rec","passRush","frontRun","coverage","kicker","rec12","rec13","rec21","rec22","rec11","frontBase","frontNick","covBase","covNick","covDime","te1","te2","rbHeavy","ret","p","qbRunR","wrBlk","passOff","runOff","off","def"];function rc(n,e){const a=$i(n).find(s=>s.home===e||s.away===e);return a?a.seed:n.seed}function Vu(n,e,a){const s={};for(const o of e)s[o.name]={...o.ratings};const t=o=>({week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd,atd:o.atd,...o.round?{round:o.round}:{}}),r={seed:n.seed,year:n.year,run:n.run,gameSeed:rc(n,a.userTeam),nextWeek:n.nextWeek,userTeam:a.userTeam,roster:a.roster,ratings:s,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})),scores:[...n.scores.map(t),...n.playoffs.map(t)],plan:a.plan,statsRecorded:a.statsRecorded,prevRank:{...n.prevRank}};return n.homeField!==void 0&&(r.homeField=n.homeField),r}function oc(n){const e=[];for(const o of wn){const l=n.ratings[o.name];if(!l||typeof l!="object")return{ok:!1,message:"week: no ratings for "+o.name};for(const i of Ou)if(typeof l[i]!="number"||!Number.isFinite(l[i]))return{ok:!1,message:"week: bad rating "+i+" for "+o.name};e.push({name:o.name,ratings:{...l}})}const a=[],s=[];for(const o of n.scores){const l={week:o.week,home:o.home,away:o.away,hs:o.hs,as:o.as,htd:o.htd??0,atd:o.atd??0,...o.round?{round:o.round}:{}};(o.round?s:a).push(l)}const t={seed:n.seed,year:n.year,run:n.run,prevRank:n.prevRank?{...n.prevRank}:{},homeField:n.homeField,schedule:n.schedule.map(o=>({week:o.week,home:o.home,away:o.away,kind:o.kind})).sort((o,l)=>o.week-l.week),nextWeek:n.nextWeek,scores:a,playoffs:s,seeding:null,champion:null};t.nextWeek>Yr&&(t.seeding=Xi(a,je(n.seed).fork("seeding")));const r=s.find(o=>o.round==="Super Bowl");return r&&(t.champion=r.hs>r.as?r.home:r.away),n.prevRank?t.nextWeek<=22&&rc(t,n.userTeam)!==n.gameSeed?{ok:!1,message:"week: stored gameSeed does not match the state (changed save?)"}:{ok:!0,value:{state:t,teams:e,context:{userTeam:n.userTeam,roster:n.roster,plan:n.plan,statsRecorded:n.statsRecorded}}}:{ok:!1,message:"week: saved without prevRank (cannot rebuild a run-it-back)"}}const Yu=6,zu=4,Qu=2,Uu=1,qo={"Wild Card":Yu,Divisional:zu,Conference:Qu,"Super Bowl":Uu};function lc(n){const e=n.payload;if(!Number.isInteger(e.nextWeek)||e.nextWeek<1||e.nextWeek>Yr+4)return Zn(`week: nextWeek ${e.nextWeek} outside 1..22`);if(e.scores.find(v=>v.round==="Super Bowl")&&e.nextWeek!==22)return Zn("week: a Super Bowl score exists but nextWeek is not 22 (finished seasons are Season payloads, not week saves)");const s=v=>tt.indexOf(v);for(const v of e.scores){if(v.round&&!tt.includes(v.round))return Zn(`week: unknown playoff round '${v.round}'`);if(v.round&&v.week!==19+s(v.round))return Zn(`week: round '${v.round}' stored under week ${v.week} (expected ${19+s(v.round)})`)}for(const v of e.scores)if(!Number.isInteger(v.htd)||!Number.isInteger(v.atd))return Zn(`week: score ${v.home} vs ${v.away} (week ${v.week}) lacks htd/atd — seeding tiebreaks would silently change`);const t=(v,g,B)=>`${v}|${g}|${B}`,r=new Set(e.schedule.map(v=>t(v.week,v.home,v.away))),o=new Map;for(const v of e.scores){if(!v.round&&!r.has(t(v.week,v.home,v.away)))return Zn(`week: score ${v.away} @ ${v.home} (week ${v.week}) is not on the stored schedule`);const g=t(v.week,v.home,v.away);if(o.has(g))return Zn(`week: fixture ${v.away} @ ${v.home} (week ${v.week}) appears twice in scores`);o.set(g,v)}for(const v of e.schedule)if(!(v.week<e.nextWeek&&!v.week)&&v.week<e.nextWeek&&!o.has(t(v.week,v.home,v.away)))return Zn(`week: scheduled game ${v.away} @ ${v.home} (week ${v.week}) has no score but week ${v.week} < nextWeek ${e.nextWeek}`);const l=new Map;for(const v of e.scores)v.round&&(l.get(v.round)??l.set(v.round,[]).get(v.round)).push(v);let i=new Set;for(const v of tt){const g=l.get(v)??[];if(!g.length)break;if(g.length!==qo[v])return Zn(`week: ${v} has ${g.length} games (expected ${qo[v]})`);if(v!=="Wild Card"){for(const B of g)if(!i.has(B.home)&&!i.has(B.away))return Zn(`week: ${v} game ${B.away} @ ${B.home} has no participant from the previous round's winners`)}if(i=new Set(g.map(B=>B.hs>B.as?B.home:B.away)),i.size!==g.length)return Zn(`week: ${v} has a tie or a repeat winner — playoff games cannot tie`)}const d=l.get("Super Bowl")?.[0];if(d&&d.hs===d.as)return Zn("week: the Super Bowl ended level — impossible in the engine");const u=oc(e);if(!u.ok)return Zn(u.message);const h=u.value,p=new Set(wn.map(v=>v.name));for(const v of[...e.schedule,...e.scores])if(!p.has(v.home)||!p.has(v.away))return Zn(`week: unknown team name in ${v.away} @ ${v.home}`);return{ok:!0,value:h}}function Zn(n){return{ok:!1,code:"corrupt",message:n}}function ju(n){const e=n.payload,a=e.userResults[e.userResults.length-1];if(!a)return Zn("season: no user results");const s=a.hs>a.as?a.home:a.away;return e.champion===e.userTeam&&e.userOutcome!=="champion"?Zn("season: champion is the user but userOutcome says otherwise"):e.champion!==e.userTeam&&e.userOutcome==="champion"?Zn("season: userOutcome says champion but the stored champion is not the user"):e.champion===e.userTeam&&s!==e.userTeam?Zn("season: stored champion is the user but the last result was a loss"):{ok:!0,value:null}}const qu={"Wild Card":"wild-card",Divisional:"divisional",Conference:"conference","Super Bowl":"super-bowl-loss"},Zu=n=>n.hs>n.as?n.home:n.as>n.hs?n.away:null;function Xu(n,e){const a=Et[e];if(!a)throw new Error("outcome: unknown team "+e);if(!n.seeding)return null;if(!n.seeding.seeds[a.conf].includes(e))return"missed-playoffs";for(const s of n.playoffs){if(s.home!==e&&s.away!==e)continue;const t=Zu(s);if(t!==null){if(t!==e)return qu[s.round];if(s.round==="Super Bowl")return"champion"}}return null}function $u(n,e=0){let a=3735928559^e,s=1103547991^e;for(let t=0;t<n.length;t++){const r=n.charCodeAt(t);a=Math.imul(a^r,2654435761),s=Math.imul(s^r,1597334677)}return a=Math.imul(a^a>>>16,2246822507)^Math.imul(s^s>>>13,3266489909),s=Math.imul(s^s>>>16,2246822507)^Math.imul(a^a>>>13,3266489909),(4294967296*(2097151&s)+(a>>>0)).toString(16).padStart(14,"0")}async function np(n){const e=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(e)].map(a=>a.toString(16).padStart(2,"0")).join("")}const Zs=n=>({ok:!1,error:n instanceof Error?n.message:String(n)});class ep{constructor(e,a={}){this.ls=e,this.o=a}ls;o;get storage(){return this.ls}async read(e){try{return{ok:!0,value:this.storage?.getItem(e)??null}}catch(a){return Zs(a)}}async write(e,a){try{if(Ud(e)&&this.o.slotCheck)try{const s=Ci(JSON.parse(a));if(s.ok){const t=this.o.slotCheck(s.value.slot,e);if(t)return{ok:!1,error:t}}}catch{}return this.storage?.setItem(e,a),{ok:!0,value:void 0}}catch(s){return Zs(s)}}async remove(e){try{return this.storage?.removeItem(e),{ok:!0,value:void 0}}catch(a){return Zs(a)}}async keys(e){try{const a=this.storage;if(!a)return{ok:!0,value:[]};const s=[];for(let t=0;t<a.length;t++){const r=a.key(t);r!==null&&r.startsWith(e)&&s.push(r)}return{ok:!0,value:s.sort()}}catch(a){return Zs(a)}}async entries(e){const a=await this.keys(e);if(!a.ok)return a;const s=[];for(const t of a.value){const r=await this.read(t);r.ok&&r.value!==null&&s.push([t,r.value])}return{ok:!0,value:s}}}const ap=(n={})=>new ep(typeof localStorage>"u"?null:localStorage,n),sp="nfl1";function tp(){const{RATING_SPECS:n,DEF_SPECS:e,PERS_REC:a,RB_HEAVY:s,PERS:t,STRAT:r,DEF_FOCUS:o,PLAN_K:l,MC:i,RUSH_BASE:f,PASS_BASE:d,PT_RUSH:u,PT_PASS:h,PT_TO:p,PT_SACK:v,LAM_TO:g,LAM_SACK:B,BASE_PTS:T,HOME_FIELD:S,PTS_NOISE:w,RET_PTS:D,RET_NEUTRAL:C,QB_RUN_C:E,WR_BLK_C:F,WR_BLK_W:G,PUNT_PTS:A,DIME_W:J,POINTS_PER_WIN:N,GAMES:O}=t0;return JSON.stringify([ke,ut,ur,xr,n,e,a,s,t,r,o,l,i,[f,d,u,h,p,v,g,B,T,S,w,D,C,E,F,G,A,J,N,O]])}const ta=()=>sp+"."+$u(tp()),rp={"Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB","Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","NY Giants":"NYG","NY Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"},Pn=n=>rp[n]??n.slice(0,3).toUpperCase(),op=n=>wn.find(e=>e.name===n),ic=["Wild Card","Divisional","Conference","Super Bowl"],ss=18;function Zo(n){return ss+ic.length}function lp(n,e){const a=ss;if(e<=a){const l=n.schedule.filter(i=>i.week===e).map(i=>Xo(n,i,i.kind,null));return{week:e,label:"WEEK "+e,games:l,done:l.every(i=>i.hs!==null)}}const s=ic[e-a-1]??null;if(!s)throw new Error(`weekVM: no week slot ${e}`);const r=ip(n,s).map(([o,l])=>Xo(n,{week:e,home:o,away:l},"playoff",s));return{week:e,label:s.toUpperCase(),games:r,done:r.every(o=>o.hs!==null)}}function ip(n,e){const a=n.seeding;if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}return n.playoffs.filter(t=>t.round===e).map(t=>[t.home,t.away])}function Xo(n,e,a,s){const t=s?n.playoffs.find(o=>o.round===s&&(o.home===e.home||o.away===e.home)):n.scores.find(o=>o.week===e.week&&o.home===e.home&&o.away===e.away),r=At(n.seed,e.week,e.home);return{home:e.home,away:e.away,homeAbbr:Pn(e.home),awayAbbr:Pn(e.away),hs:t?t.hs:null,as:t?t.as:null,kind:s?"playoff":a,round:s,replayLabel:s?`po:${s}:${e.home}`:`w${e.week}:${e.home}`,gameSeed:r,me:!1}}function cp(n,e){const s=Math.min(e,ss),t={};for(const f of wn)t[f.name]={w:0,l:0,t:0,pf:0,pa:0};for(const f of n.scores){if(f.week>s)continue;const d=t[f.home],u=t[f.away],h=f.hs,p=f.as;d.pf+=h,d.pa+=p,u.pf+=p,u.pa+=h,h>p?(d.w++,u.l++):p>h?(u.w++,d.l++):(d.t++,u.t++)}const r=f=>{if(!n.seeding)return null;const d=n.seeding.seeds.AFC.indexOf(f),u=n.seeding.seeds.NFC.indexOf(f);return d>=0?d+1:u>=0?u+1:null},o=f=>{const d=op(f),u=t[f],h=(u.w+.5*u.t)/Math.max(1,u.w+u.l+u.t);return{team:f,abbr:Pn(f),conf:d.conf,div:d.div,w:u.w,l:u.l,t:u.t,pf:u.pf,pa:u.pa,winPct:h===1?"1.000":h.toFixed(3),seed:r(f)}},l=wn.map(f=>o(f.name)).sort((f,d)=>d.w-f.w||f.pa-d.pa||f.team.localeCompare(d.team)),i=[];for(const f of["AFC","NFC"])for(const d of["East","North","South","West"]){const u=wn.filter(h=>h.conf===f&&h.div===d).map(h=>o(h.name)).sort((h,p)=>p.w-h.w||h.pa-p.pa||h.team.localeCompare(p.team));i.push({conf:f,div:d,rows:u})}return{throughWeek:s,league:l,divisions:i}}function fp(n,e,a,s){return Vu(n,e,{userTeam:a,roster:s,plan:null,statsRecorded:!1})}function $o(n){const e=wn.map(s=>{const t=n.ratings[s.name];return{name:s.name,ratings:{...t}}}),a=oc(n);return a.ok?{ok:!0,value:{state:a.value.state,teams:e,userTeamName:a.value.context.userTeam,roster:a.value.context.roster}}:{ok:!1,message:a.message}}function dp(n,e,a){const s=Fs(n)??{},t=wn.map(l=>{const i=s[l.name]??{w:0,l:0,t:0,pf:0,pa:0};return{team:l.name,w:i.w,l:i.l,t:i.t,pf:i.pf,pa:i.pa}}),r=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e).map(l=>({week:l.week,home:l.home,away:l.away,hs:l.hs,as:l.as,...l.round?{round:l.round}:{},htd:l.htd,atd:l.atd})),o=n.champion?Xu(n,e)??"missed-playoffs":"missed-playoffs";return{seed:n.seed,year:n.year,run:n.run,userTeam:e,roster:a,table:t,userResults:r,champion:n.champion??"",userOutcome:o,statsRecorded:!1}}let An=null,Fa=null,Wa="",Xs=[],Re=1;const Br=new Set,$s=()=>{for(const n of Br)n()},Wn={get ready(){return An!==null},get slot(){return Re},get total(){return An?Zo():ss+4},get view(){return An?lp(An,Re):null},get standings(){return An?cp(An,Re):null},get finished(){return An?Lt(An):!1},get champion(){return An?.champion??null},get userTeamName(){return Wa},get label(){return this.view?.label??""},get atLastPlayed(){return An?Re===An.nextWeek-1:!1},get runState(){return An},get userRoster(){return Xs},subscribe(n){return Br.add(n),()=>Br.delete(n)},begin(n,e,a,s,t){Fa=n,Wa=s,Xs=t,An=mu(n,{seed:e,year:a}),Re=1,$s()},resume(n,e,a,s){Fa=e,Wa=a,Xs=s,An=n,Re=Math.max(1,Math.min(n.nextWeek,Zo())),$s()},step(){if(!An||!Fa)return null;Re=An.nextWeek;const n=Bu(Fa,An);An=n.state;const e=n.games.map(a=>({home:a.home,away:a.away,round:a.round,result:a.result,gs:At(An.seed,An.nextWeek-1,a.home)}));return $s(),{week:An.nextWeek-1,games:e}},go(n){Re=Math.max(1,Math.min(this.total,n)),$s()},next(){this.go(Re+1)},prev(){this.go(Re-1)},weekPayload(){return fp(An,Fa,Wa,Xs)},snapshot(){return{state:An,teams:Fa,userTeamName:Wa,slot:Re}},scores(){return An?[...An.scores,...An.playoffs]:[]},userTeamIndex(){return wn.findIndex(n=>n.name===Wa)}},ys={mode:"system",reducedMotion:!1,newestFirst:!0,teamName:null,draftSlot:null},cc=Hs("nfl","settings");function fc(){try{return globalThis.localStorage}catch{return null}}function dc(){const n=fc();if(!n)return{...ys};try{const e=n.getItem(cc);if(!e)return{...ys};const a=JSON.parse(e);return{mode:a.mode==="light"||a.mode==="dark"||a.mode==="system"?a.mode:ys.mode,reducedMotion:a.reducedMotion===!0,newestFirst:a.newestFirst!==!1,teamName:typeof a.teamName=="string"?a.teamName:null,draftSlot:typeof a.draftSlot=="number"&&a.draftSlot>=1&&a.draftSlot<=32?a.draftSlot:null}}catch{return{...ys}}}function up(n){const e=fc();if(e)try{e.setItem(cc,JSON.stringify(n))}catch{}}function pp(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}const hp=["team","board","complete","hub","week","standings","bracket","book","awards","review","guide","cards","feed","stats","settings","saves","share"],vp=new RegExp("^#/?("+hp.join("|")+")(?:/([0-9]{1,2}))?$");function mp(n){const e=vp.exec(n);return e?{screen:e[1],param:e[2]?Number(e[2]):null}:null}function gp(n,e){return"#/"+n+(e!=null?"/"+e:"")}function Bp(){return typeof location>"u"?null:mp(location.hash)}function Cp(n,e){typeof location>"u"||(location.hash=gp(n,e))}function yp(n){return N0(n)}function Tp(n){return hi(n.getState(),e=>(e(n.getState()),n.subscribe(e)))}function ya(n){return Wr(n)}function Sp(){return hi(Yt(),n=>(n(Yt()),Wn.subscribe(()=>n(Yt()))))}function Yt(){const n=Wn;return{ready:n.ready,slot:n.slot,total:n.total,view:n.view,standings:n.standings,finished:n.finished,champion:n.champion,userTeamName:n.userTeamName,label:n.label,atLastPlayed:n.atLastPlayed,runState:n.runState}}function kp(){return Wr({...ys,...dc()})}const wp="Model Value",_e={measured:wp,balance:"Game balance",owner:"Owner preset"};let $e={mode:"measured",locked:!1};const nt=new Set,ie={get(){return $e},set(n){$e.locked||($e={...$e,mode:n},nt.forEach(e=>e($e)))},lock(){$e={...$e,locked:!0},nt.forEach(n=>n($e))},subscribe(n){return nt.add(n),n($e),()=>nt.delete(n)}},zt=2147483647,Dp=1e5,bp=99e5;function Mt(n){return"b36:"+n.toString(36)}function nl(n){const e=String(n??"").trim();if(!e)return null;if(e.slice(0,4)==="b36:"){if(!/^[0-9a-z]+$/i.test(e.slice(4)))return null;const a=parseInt(e.slice(4),36);return Number.isInteger(a)&&a>=1&&a<=zt?a:null}if(/^\d{1,10}$/.test(e)){const a=Number(e);return Number.isInteger(a)&&a>=1&&a<=zt?a:null}if(/^[0-9a-z]{1,6}$/i.test(e)){const a=parseInt(e,36);return Number.isInteger(a)&&a>=1&&a<=zt?a:null}return null}function Rp(){return Dp+Math.floor(Math.random()*bp)}function el(n){try{const e=new URL(location.href);e.searchParams.set("seed",Mt(n)),history.replaceState(null,"",e.toString())}catch{}}const Ep={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},Rs={bg:"#fdf2f6",zcream:"#53382b",gold2:"#e6c67d",goldm:"#ad7f2e",gold3:"#9a6b1f"},uc={bg:"#1e1119",gold2:"#e8c87e"},jr=["#e6c67d","#f2e7d5","#c39a4a"],pc="#291a24",hc="#ffffff",vc=Ep,Lp=n=>vc[n]??jr;function Ct(n){const e=n.replace("#","");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}function mc(n,e,a){const s=t=>Math.max(0,Math.min(255,Math.round(t))).toString(16).padStart(2,"0");return"#"+s(n)+s(e)+s(a)}function Qt(n,e,a){const s=Ct(n),t=Ct(e);return mc(s[0]+(t[0]-s[0])*a,s[1]+(t[1]-s[1])*a,s[2]+(t[2]-s[2])*a)}function Ce(n){const[e,a,s]=Ct(n).map(f=>f/255),t=Math.max(e,a,s),r=Math.min(e,a,s);let o=0,l=0;const i=(t+r)/2;if(t!==r){const f=t-r;l=i>.5?f/(2-t-r):f/(t+r),o=t===e?(a-s)/f+(a<s?6:0):t===a?(s-e)/f+2:(e-a)/f+4,o/=6}return{h:o*360,s:l,l:i}}function Va(n,e,a){const s=(1-Math.abs(2*a-1))*e,t=s*(1-Math.abs(n/60%2-1)),r=a-s/2;let o=0,l=0,i=0;return n<60?(o=s,l=t):n<120?(o=t,l=s):n<180?(l=s,i=t):n<240?(l=t,i=s):n<300?(o=t,i=s):(o=s,i=t),mc((o+r)*255,(l+r)*255,(i+r)*255)}function al(n){return Ct(n).map(e=>(e/=255,e<=.03928?e/12.92:Math.pow((e+.055)/1.055,2.4))).reduce((e,a,s)=>e+a*[.2126,.7152,.0722][s],0)}function Ap(n,e){const a=al(n),s=al(e),t=Math.max(a,s),r=Math.min(a,s);return(t+.05)/(r+.05)}function Pa(n,e,a,s){const t=Ce(n),r=Math.max(t.s,.42);let o=t.l;for(let l=0;l<90;l++){const i=Va(t.h,r,o);if(Ap(i,e)>=s)break;if(a){if(o>=.9)break;o+=.015}else{if(o<=.15)break;o-=.015}}return Va(t.h,r,o)}const Ut=Rs.bg,jt=uc.bg,Mp={"Buffalo Bills":1,"Los Angeles Rams":1};function Jp(n){const e=vc[n];if(!e){const d=[Rs.gold2,Rs.zcream,Rs.goldm];return{light:d,dark:d}}let a=e[0];if(Ce(a).s<.15&&(a=[...e].sort((d,u)=>Ce(u).s-Ce(d).s)[0]),Ce(a).s<.15&&(a=Qt(a,"#c9a24b",.45)),Mp[n]){const d=Ce(a);d.h>=195&&d.h<=255&&d.l<.45&&(a=Va(d.h,Math.min(1,d.s*.94),.47))}{const d=e.filter(u=>{const h=Ce(u);return h.s<.14&&h.l>.45});if(Ce(a).l<.26&&d.length){const u=d.find(h=>{const p=Ce(h);return p.l>=.55&&p.l<=.92})||d[d.length-1];a=Qt(a,u,.45)}}const s=e.filter(d=>d!==a),t=d=>{const u=Ce(d);if(u.l<.18||u.s<.15){const h=Ce(a);return Va(h.h,Math.max(.12,Math.min(h.s,.34)),u.l<.18?.22:Math.min(Math.max(u.l,.3),.72))}return Va(u.h,Math.max(u.s,.42),Math.min(Math.max(u.l,.3),.55))},r=d=>{const u=Ce(d);return u.h>=30&&u.h<=70&&u.l>.42?Qt(Va(u.h,Math.min(1,Math.max(u.s,.55)),.5),"#c9a24b",.45):d},o=r(t(s[0]!==void 0?s[0]:a)),l=r(t(s[1]!==void 0?s[1]:a)),i=[Pa(a,Ut,!1,4.6),Pa(o,Ut,!1,4.2),Pa(l,Ut,!1,4.2)],f=[Pa(a,jt,!0,4.6),Pa(o,jt,!0,4.2),Pa(l,jt,!0,4.2)];return{light:i,dark:f}}function _p(n){const[e,a,s]=Lp(n),t=Jp(n);return{attr:n,vars:{"--zpb-t1":e,"--zpb-t2":a,"--zpb-t3":s,"--zpb-t1L":t.light[0],"--zpb-t2L":t.light[1],"--zpb-t3L":t.light[2],"--zpb-t1D":t.dark[0],"--zpb-t2D":t.dark[1],"--zpb-t3D":t.dark[2]}}}const sl=n=>{const e=n.replace("#",""),a=[0,2,4].map(s=>parseInt(e.slice(s,s+2),16)/255).map(s=>s<=.03928?s/12.92:((s+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]},qt=(n,e)=>{const a=sl(n),s=sl(e);return(Math.max(a,s)+.05)/(Math.min(a,s)+.05)};function Cr(n,e=!0){const a=xi[n]??[...jr],s=e?pc:hc,r=[...a].sort((o,l)=>qt(l,s)-qt(o,s))[0];return qt(r,s)>=3?{ink:r,pale:r}:{ink:r,pale:`color-mix(in srgb, ${r} 55%, ${e?"#f2e7d5":"#53382b"})`}}const Fp=2027;function yt(n){const e=Vr(n.pool),a=new Map(e.map(t=>[t.id,t])),s=wn.map(()=>[]);for(const t of n.picks){const r=a.get(t.pid);r&&s[t.team]?.push(r)}return s}function gc(n){const a=["4-3","3-4"].map(r=>Hr(n,r)).map(r=>({l:r,R:vr(p0(r),j0(r))})),s=Kr(a.map(r=>r.R)),t=a[1]&&bo(a[1].R,s)>bo(a[0].R,s)?a[1]:a[0];return{lineup:t.l,ratings:t.R}}function Wp(n){return wn.map((e,a)=>({name:e.name,ratings:gc(yt(n)[a]).ratings}))}const Pp={TD:{label:"TD",tone:"good"},FG:{label:"FG",tone:"good"},INT:{label:"INT",tone:"bad"},FUM:{label:"FUM",tone:"bad"},PUNT:{label:"PUNT",tone:"sub"},DOWNS:{label:"DOWNS",tone:"sub"},FG_MISS:{label:"MISS",tone:"bad"},HALF:{label:"EOH",tone:"sub"},SAFETY:{label:"SAFETY",tone:"bad"}},Gp={xp:{label:"XP",tone:"good"},two:{label:"2PT",tone:"good"},xp_miss:{label:"XP MISS",tone:"sub"},two_fail:{label:"2PT FAIL",tone:"sub"},none:{label:"NO TRY",tone:"sub"}};function Bc(n,e,a,s){const t=s.week,r=s.year??Fp,o=Ku(n,e,a),l={[e]:Cr(e),[a]:Cr(a)},i=s.userTeamName??"";let f=0,d=0,u=0,h=0,p="tie";const v=o.drives.map(B=>{B.team===e?(f+=B.pts,d+=B.oppPts):(d+=B.pts,f+=B.oppPts),B.team===i&&h++;const S=f>d?"home":d>f?"away":"tie",w=S!==p&&S!=="tie";w&&u++,p=S;const D=[],C=Pp[B.end]??{label:B.end,tone:"sub"};D.push(C),B.defTD&&D.push({label:"DEF TD",tone:"gold"}),w&&D.push({label:"LEAD Δ",tone:"gold"});const E=B.scores.find(G=>G.kind==="TD"&&G.team===B.team),F=E?[Gp[E.conv]].filter(G=>!!G):[];return{...B,homeAbbr:Pn(e),awayAbbr:Pn(a),teamAbbr:Pn(B.team),teamInk:l[B.team].pale,teamPale:l[B.team].pale,me:B.team===i,leadChange:w,scoreAfter:{home:f,away:d},badges:D,convBadges:F}}),g=s.round?` · ${s.round}`:"";return{week:t,year:r,home:e,away:a,homeAbbr:Pn(e),awayAbbr:Pn(a),homeInk:l[e],awayInk:l[a],homeScore:o.homeScore,awayScore:o.awayScore,regHome:o.regHome,regAway:o.regAway,ot:o.ot,gameSeedLabel:`gameSeed ${s.gs??"?"} · week ${t}${g} · ${a} @ ${e} · played by the pinned engine`,drives:v,meDrives:h,leadChanges:u,userWon:o.homeScore===o.awayScore?null:o.homeScore>o.awayScore?e===i:a===i}}function Np(n,e,a,s,t=!0){const r=[...n.scores,...n.playoffs].find(T=>(T.home===a||T.away===a)&&T.week===s),o=r?.round??null,l=At(n.seed,s,r?r.home:""),i=new Map(e.map(T=>[T.name,T.ratings])),f=Kr(e.map(T=>T.ratings)),d=i.get(r?r.home:""),u=i.get(r?r.away:"");if(!d||!u||!r)return null;const h=gr(d,f),p=gr(u,f),v=Ve(d,u,f,{off:h.off,def:p.def}),g=Ve(u,d,f,{off:p.off,def:h.def}),B=Qi(v,g,je(l),{playoff:!!o});return Bc(B,r.home,r.away,{week:s,round:o,gs:l,userTeamName:a,year:n.year})}const rt={dark:uc.gold2,light:Rs.gold3},yr=n=>{const e=n.replace("#","");return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]},Ip=n=>"#"+n.map(e=>Math.max(0,Math.min(255,Math.round(e))).toString(16).padStart(2,"0")).join(""),tl=n=>{const e=yr(n).map(a=>a/255).map(a=>a<=.03928?a/12.92:((a+.055)/1.055)**2.4);return .2126*e[0]+.7152*e[1]+.0722*e[2]},Zt=(n,e)=>{const a=tl(n),s=tl(e);return(Math.max(a,s)+.05)/(Math.min(a,s)+.05)};function Hp(n,e){const s=(xi[n]??[...jr])[0],t=e==="dark"?pc:hc,r=Zt(t,rt[e]),o=d=>{const u=yr(s),h=yr(t),p=[h[0]*(1-d)+u[0]*d,h[1]*(1-d)+u[1]*d,h[2]*(1-d)+u[2]*d];return Ip(p)};let l=.12,i=o(l),f=12;for(;f-- >0&&Zt(i,rt[e])<r;)l=l/2,i=o(l);return Zt(i,rt[e])<r&&(i=t),i}function Kp(n,e){return{tint:Hp(n,e),gold:rt[e]}}function rl(n,e){if(typeof document>"u")return;const a=document.documentElement;if(!n){delete a.dataset.zpbteam;return}const s=_p(n);a.dataset.zpbteam=s.attr;for(const[r,o]of Object.entries(s.vars))a.style.setProperty(r,o);const t=Kp(n,e==="system"?"dark":e);a.style.setProperty("--cp-takeover-tint",t.tint),a.style.setProperty("--cp-takeover-gold",t.gold),a.dataset.theme=e==="system"?"":e,e==="system"&&delete a.dataset.theme}function xp(n){if(typeof document>"u")return;const e=document.documentElement;n==="system"?delete e.dataset.theme:e.dataset.theme=n}function ol(n,e){const{lineup:a}=gc(e),s=a.placements.map(t=>t.player).find(Boolean);return{team:n,lineup:a,returnerId:s?.id??null}}class ll{ss=Nu();boxes=[];addWeek(e,a){for(const s of e){const t=il(s.home),r=il(s.away);if(t<0||r<0)continue;const o=Fu(s.result,ol(s.home,a[t]??[]),ol(s.away,a[r]??[]),Vp());this.boxes.push(o),Iu(this.ss,o)}}}let Op=0;const Vp=()=>je(24231+Op++).fork("boxscore"),il=n=>wn.findIndex(e=>e.name===n),cs=n=>Hs("nfl","slot:"+n),cl=Bi,Yp=()=>{try{return new URL(import.meta.url).pathname.match(/index-[A-Za-z0-9_-]+\.js/)?.[0]??"dev"}catch{return"dev"}},Ze=ap({slotCheck:e0}),Os=n=>({...n});async function zp(n,e,a,s){const t=Ks("draft",n,Os(a),e,s),r=await Ze.write(cs(n),t);return r.ok?"":"storage refused the write: "+r.error}async function Qp(n,e,a,s){const t=Ks("week",n,Os(a),e,s),r=await Ze.write(cs(n),t);return r.ok?"":"storage refused the write: "+r.error}async function Up(n,e,a,s){const t=Ks("season",n,Os(a),e,s),r=await Ze.write(cs(n),t);return r.ok?"":"storage refused the write: "+r.error}const jp=n=>{if(Lt(n.state))return"season complete";const e=n.teams.length&&(n.state.schedule.find(a=>a.week===n.state.nextWeek&&(a.home===n.context.userTeam||a.away===n.context.userTeam))??null);return e?`${e.away} @ ${e.home}`:"no user game this week"},fl=(n,e)=>n.state!=="ok"||!n.engineVersion||n.engineVersion===e?null:"this save came from build "+n.engineVersion+" (running: "+e+") — logged picks hold; un-made picks may differ";async function qp(n){const e=await Ze.read(cs(n));if(!e.ok)return{slot:n,state:"refused",problem:"corrupt",message:"storage unavailable: "+e.error};if(e.value===null)return{slot:n,state:"empty"};const a=wt(e.value);if(!a.ok)return{slot:n,state:"refused",problem:a.reason,message:a.message};const s=a.value;if(s.kind==="draft"){const o=s.payload;return{slot:n,state:"ok",kind:"draft",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,picks:o.picks.length,userTeamIndex:o.userTeam}}const t=s.kind==="week"?lc(s):ju(s);if(!t.ok)return{slot:n,state:"refused",problem:"corrupt",message:t.message};if(s.kind==="week"){const o=t.value;return{slot:n,state:"ok",kind:"week",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,week:o.state.nextWeek,userTeam:o.context.userTeam,nextFixture:jp(o),played:o.state.scores.length+o.state.playoffs.length}}const r=s.payload;return{slot:n,state:"ok",kind:"season",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,userTeam:r.userTeam,week:23,played:r.userResults.length,champion:r.champion}}async function Zp(n){const e=await Ze.read(cs(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=wt(e.value);return a.ok?a.value.kind!=="draft"?{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a draft"}:{ok:!0,record:a.value.payload}:{ok:!1,message:a.message}}async function Xp(n){const e=await Ze.read(cs(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=wt(e.value);if(!a.ok)return{ok:!1,message:a.message};if(a.value.kind!=="week")return{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a week"};const s=a.value,t=lc(s);return t.ok?{ok:!0,env:s}:{ok:!1,message:t.message}}const Cc=Hs("nfl","autosave:draft"),qr=Hs("nfl","autosave:week");async function $p(n,e,a,s=Ze){const t=Ks("draft","A",Os(e),n,a),r=await s.write(Cc,t);return r.ok?"":"autosave refused the write: "+r.error}async function nh(n,e,a,s=Ze){const t=Ks("week","C",Os(e),n,a),r=await s.write(qr,t);return r.ok?"":"autosave refused the write: "+r.error}async function dl(n=Ze){await n.remove(qr)}async function eh(n=Ze){const e=await ul(n,Cc,"draft");if(!e.ok)return e;const a=await ul(n,qr,"week");return a.ok?{ok:!0,draft:e.value,week:a.value}:a}async function ul(n,e,a){const s=await n.read(e);if(!s.ok)return{ok:!1,message:"storage unavailable: "+s.error};if(s.value===null)return{ok:!0,value:null};const t=wt(s.value);if(!t.ok)return{ok:!1,message:t.message};const r=t.value;if(r.kind!==a)return{ok:!1,message:"autosave: "+e+" holds a "+r.kind+" save, not a "+a};const o=l=>({saveId:l.saveId,createdAt:l.createdAt,engineVersion:l.engineVersion,dataVersion:l.dataVersion,saveRevision:l.saveRevision,savedAt:l.savedAt});return a==="draft"?{ok:!0,value:{kind:"draft",record:r.payload,lineage:o(r)}}:{ok:!0,value:{kind:"week",env:r}}}function ah(n,e,a){return e===0?`best value at ${n.slotLabel}`:a.includes(n.slotId)?"fills your thinnest need":"most Wins left"}function yc(n,e){const a=r=>Number(String(r[e]).replace(/[^0-9.\-]/g,""))||0,s=[],t=Math.min(3,n.length);for(let r=0;r<t;r++)s.push(n[r].id);if(t===3){const r=a(n[2]);for(let o=3;o<n.length&&a(n[o])===r;o++)s.push(n[o].id)}return s}function sh(n,e){return!Array.isArray(n)||n.length===0||!n.every(a=>typeof a=="string"&&e.has(a))?null:n}const th="GENERATED by scripts/gen-seam-card.mjs — do not edit. ONE provenance file read by BOTH the dev-gated SeamCard chip (src/lib/components/SeamCard.svelte) and the claims gate (claims.json row seam-card-agrees). Any missing field renders UNKNOWN in the chip — never a green default. treeSha latches the card to the running build (source-tree sha); a mismatch renders the chip UNKNOWN · generated before the last edit.",rh="d536d63f0cf5a0c8149cf4e604663ac2b9f3da14b60159a5e0fe27bbf9c3baeb",oh="408410477",lh="nfl1.1ac56c28928eff",ih="nfl1.1ac56c28928eff",ch="match",fh=401,dh={total:37,packagingPhase:23,file:"claims.json",command:"node scripts/check-claims.mjs"},uh="ea6080d39204a7d6e93a528987c75314a9afd24bda12cb16d822a8a9aee18363",ph="9d5950dfac07b48fb7be99e1d6918ee64d59618d5cdabff8a7e0ef599d7c1cd6",hh={"SNAPSHOT.md":"f8c5351818500a8aed59bdd590f8fbd369c930923864e95d102b98bc41830f3e","claims.json":"ab36ee2e89014008df22a10e5e606d69370e770fb637f5a6e212f21a8c90e3a4","CHECKSUMS.txt":"c3d3e718ed024bbb026ad32ab2537420577c5675674dc023c053c25a33a99913"},Tc={meta:th,sealedOver:rh,pin:oh,stampSnapshot:lh,engineVersionRunning:ih,stampCanary:ch,sealCount:fh,claims:dh,distHash:uh,treeSha:ph,inputs:hh};var vh=M('<dl id="cp-seamdetail" class="cp-seamdetail svelte-3aphuo"><dt class="svelte-3aphuo">card latch</dt><dd class="svelte-3aphuo">UNKNOWN · generated before the last edit — no numeric fields are shown on a latch mismatch (never a green default)</dd></dl>'),mh=M('<span class="cp-seambad svelte-3aphuo" title="the card was generated before the last edit (treeSha mismatch or missing) — provenance is UNKNOWN">⚠ CARD LATCH</span> <span class="cp-seambtn svelte-3aphuo">UNKNOWN · generated before the last edit</span> <!>',1),gh=M('<span class="cp-seambad svelte-3aphuo" title="the running engine stamp does not match the card — provenance is UNKNOWN">⚠ PIN CANARY</span>'),Bh=M('<dl id="cp-seamdetail" class="cp-seamdetail svelte-3aphuo"><dt class="svelte-3aphuo">snapshot stamp</dt><dd class="svelte-3aphuo"> </dd> <dt class="svelte-3aphuo">running engineVersion</dt><dd class="svelte-3aphuo"> </dd> <dt class="svelte-3aphuo">seal entries</dt><dd class="svelte-3aphuo"> </dd> <dt class="svelte-3aphuo">claims</dt><dd class="svelte-3aphuo"> </dd> <dt class="svelte-3aphuo">dist fingerprint (at card generation)</dt><dd class="svelte-3aphuo"> </dd> <dt class="svelte-3aphuo">card treeSha (byte-latch)</dt><dd class="svelte-3aphuo"> </dd> <dt class="svelte-3aphuo">card sealed over</dt><dd class="svelte-3aphuo"> </dd></dl>'),Ch=M('<!> <span class="cp-seambtn svelte-3aphuo"> </span> <!>',1),yh=M("<div><!></div>");function Th(n,e){Rn(e,!0);const a=ln(()=>{const i=Tc,f="2d0517981b33ef693c41c2d817ba01b27becbd04bee6718269cdcd03e579ff43",d=f.length>0&&typeof i.treeSha=="string"&&i.treeSha===f,u=d?typeof e.runningStamp=="string"&&!!i.stampSnapshot&&e.runningStamp.includes(String(i.stampSnapshot).split(".").pop()??""):!1,h=u?String(i.stampSnapshot??"UNKNOWN"):"UNKNOWN",p=typeof e.runningStamp=="string"&&e.runningStamp?e.runningStamp:"UNKNOWN";return{card:i,latched:d,canaryOk:u,stampShown:h,liveStamp:p}}),s=(i,f)=>i==null||i===""?`${f}: UNKNOWN`:`${f}: ${String(i)}`,t=ln(()=>e.dev&&new URLSearchParams(location.search).has("seamcard"));var r=fi(),o=Dn(r);{var l=i=>{var f=yh();let d;var u=P(f);{var h=v=>{var g=mh(),B=m(Dn(g),4);{var T=S=>{var w=vh();L(S,w)};en(B,S=>{c(t)&&S(T)})}L(v,g)},p=v=>{var g=Ch(),B=Dn(g);{var T=E=>{var F=gh();L(E,F)};en(B,E=>{c(a).canaryOk||E(T)})}var S=m(B,2),w=k(S),D=m(S,2);{var C=E=>{var F=Bh(),G=m(P(F)),A=k(G,!0),J=m(G,3),N=k(J,!0),O=m(J,3),Z=k(O,!0),U=m(O,3),X=k(U,!0),an=m(U,3),sn=k(an,!0),z=m(an,3),$=k(z,!0),W=m(z,3),I=k(W,!0);K((Y,b,_)=>{y(A,c(a).stampShown),y(N,c(a).liveStamp),y(Z,c(a).card.sealCount??"UNKNOWN"),y(X,c(a).card.claims?`${c(a).card.claims.total} total · ${c(a).card.claims.packagingPhase} in the packaging phase — node scripts/check-claims.mjs`:"UNKNOWN"),y(sn,Y),y($,b),y(I,_)},[()=>c(a).card.distHash?String(c(a).card.distHash).slice(0,16)+"… — the dist walk WHEN THE CARD WAS GENERATED; the shipped dist identity lives in dist-manifest.json (the card rides inside the build, so it cannot hash the dist it is embedded in)":"UNKNOWN",()=>c(a).card.treeSha?String(c(a).card.treeSha).slice(0,16)+"… — latched to this build":"UNKNOWN",()=>c(a).card.sealedOver?String(c(a).card.sealedOver).slice(0,16)+"… — the receipt of record":"UNKNOWN"]),L(E,F)};en(D,E=>{c(t)&&E(C)})}K(E=>y(w,`${E??""} · seal ${c(a).card.sealCount??"UNKNOWN"??""} · claims ${c(a).card.claims?.total??"UNKNOWN"??""}`),[()=>s(c(a).card.pin,"Engine")]),L(v,g)};en(u,v=>{c(a).latched?v(p,-1):v(h)})}K(()=>d=Nn(f,1,"cp-seamcard svelte-3aphuo",null,d,{"cp-seamopen":c(t)})),L(i,f)};en(o,i=>{e.dev&&i(l)})}L(n,r),En()}const Sh=(n,e)=>n>=.5&&e>0?"hot":n>=.25||e>0?"warm":"calm";function kh(n){return n.openSlots.map(e=>{const a=n.goneBySlot[e]??0,s=n.needBySlot[e]??0;return{slot:e,risk:a,need:s,tone:Sh(a,s)}})}function wh(n,e,a){const s=String(n),t=String(e),o=s===t?"genuine tie on wins — the order is the engine's stable sort":a===null?"the engine ranks the first row ahead (wins display pair shown; no numeric delta until rawSort)":a>=.25?"clear edge — the next best is likely gone first":a>=.05?"slight edge — some gone-risk gap":"near tie — both likely available next turn";return{topWins:s,nextWins:t,goneMargin:a,verdict:o}}const pl={fresh:"fresh draft",autosave:"autosave restored",shared:"shared link",season:"restored season"};function Dh(n){return n.seasonPhase==="running"?{phase:"season-running",label:"Season in progress",tone:"active",action:"Advance the week",why:"the season facade is mid-run — the stepper owns the screen"}:n.seasonPhase==="finished"?{phase:"season-finished",label:"Season complete",tone:"done",action:"Review the season",why:"the facade reports finished — the bracket/review surfaces are live"}:n.picks===0&&n.restoredFrom&&n.restoredFrom!=="fresh"?{phase:"restored",label:`Restored (${n.restoredFrom}) — board empty`,tone:"info",action:"Draft your first player",why:"a saved state was restored with no picks yet — continue on the same board"}:n.picks===0?{phase:"fresh",label:"Fresh draft",tone:"info",action:"Draft your first player",why:"the record holds no picks yet"}:n.slotsOpen===0?{phase:"complete",label:"Draft complete",tone:"done",action:"See the Complete screen",why:"every slot is filled"}:n.restoredFrom==="autosave"||n.restoredFrom==="shared"||n.restoredFrom==="season"?{phase:"restored",label:`Restored from ${n.restoredFrom} · ${n.picks} pick${n.picks===1?"":"s"} in`,tone:"info",action:"Continue the draft",why:"a saved state was loaded — continue or start fresh from the saves panel"}:{phase:"drafting",label:`Drafting · ${n.picks} pick${n.picks===1?"":"s"} in`,tone:"active",action:n.slotsOpen<=3?"Final rounds — land the last slots":"Draft from the board",why:`${n.slotsOpen} slot${n.slotsOpen===1?"":"s"} still open`}}var bh=M('<div class="cp-hd svelte-jqmiv9"><span class="cp-team svelte-jqmiv9"> </span> <span class="cp-round svelte-jqmiv9"> </span> <span class="cp-overall svelte-jqmiv9"> </span></div> <p class="cp-onclock svelte-jqmiv9"> </p>',1);function Rh(n,e){Rn(e,!0);var a=bh(),s=Dn(a),t=P(s),r=k(t,!0),o=m(t,2),l=k(o),i=m(o,2),f=k(i),d=m(s,2),u=k(d,!0);K(()=>{y(r,e.header.teamName),y(l,`${e.header.roundLabel??""} · Pick ${e.header.pickInRound??""}`),y(f,`overall ${e.header.overall??""} of ${e.header.totalPicks??""}`),y(u,e.header.onClock)}),L(n,a),En()}const Eh={ovr:"boardVM row .ovr ← engine players.ts ratings (never ranked by)",wins:"boardVM row .wins ← engine value.ts slotWins (the ranking unit)",priority:"boardVM row .priority ← engine value.ts (the ranking unit while the Priority sort is on)",gone:"goneOdds(...) ← engine goneodds.ts CPU replay"},hl={ovr:"displayed as the engine shows it (integer)",wins:"displayed as the engine shows it (one decimal where the engine prints one)",priority:"displayed as the engine shows it",gone:"display-rounded to a whole percent — INTERIM — display-rounded (the raw value is the engine's; rawSort is filed with the Architect)"};function et(n){const e=[`${n.field.toUpperCase()} ${n.value} — source: ${Eh[n.field]} · engine pin ${n.pin}`];if(n.field==="gone"?(e.push(n.oddsMeta?`inputs: the ${n.oddsMeta.picksBetween} picks between now and your turn, replayed ${n.oddsMeta.sims} times with the real CPU logic`:"inputs: no CPU replay while the CPU is on the clock"),e.push(hl.gone)):(e.push("inputs: the madden27 ratings pool at the frozen snapshot (no UI math — the VM is the engine's)"),e.push(hl[n.field])),n.field==="wins"&&Array.isArray(n.neighbourWins)&&n.neighbourWins.length>0&&n.rawWins!==void 0){const a=String(n.rawWins),s=n.neighbourWins.filter(t=>String(t)===a).length;s>0&&e.push(`GENUINE TIE: ${s} other row${s===1?"":"s"} share these exact wins — the order here is the engine's stable sort, not a ranking`)}return e.join(" · ")}var Lh=M('<span class="cp-toptag svelte-q412k" title="One of your top three priorities right now">TOP</span>'),Ah=M('<span class="cp-why svelte-q412k"> </span>'),Mh=M('<button class="cp-chip svelte-q412k"> <i class="svelte-q412k"> </i></button>'),Jh=M('<div><div class="cp-rowtop svelte-q412k"><button class="cp-main svelte-q412k"><span class="cp-name svelte-q412k"><!> </span> <span class="cp-pos svelte-q412k"> </span> <span class="cp-nflteam svelte-q412k"> </span> <span class="cp-num cp-ovr svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-gone-wrap svelte-q412k"><span class="cp-num cp-gone svelte-q412k"> </span> <span class="cp-gonetip svelte-q412k" role="tooltip" aria-hidden="true"> </span></span></button> <span class="cp-btnwrap svelte-q412k"><button> </button></span> <!> <button type="button" class="cp-sr svelte-q412k"> </button></div> <div class="cp-fits svelte-q412k"><span class="cp-fitlbl svelte-q412k"> </span> <!> <button class="cp-chip cp-primary svelte-q412k"> </button> <p class="cp-gonehow svelte-q412k"> </p></div></div>');function _h(n,e){Rn(e,!0);let a=Kn(e,"oddsMeta",3,null),s=Kn(e,"suggest",3,!1),t=Kn(e,"why",3,""),r=Kn(e,"winsNeighbours",19,()=>[]),o=Kn(e,"busy",3,!1),l=pn(!1);const i={priority:"Priority — what the board ranks by while the Priority sort is on"},f=vn=>vn?`GONE% — how often the CPU took him before your next pick: the ${vn.picksBetween} picks between now and your turn were replayed ${vn.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.`:"GONE% — the CPU replay estimate (no replay while the CPU is on the clock).",d=Tc.pin??"UNKNOWN",u=()=>et({field:"ovr",value:e.r.ovr,pin:d}),h=()=>et({field:"wins",value:e.r.wins,rawWins:e.r.wins,neighbourWins:r(),pin:d}),p=()=>et({field:"priority",value:e.r.priority,pin:d}),v=()=>et({field:"gone",value:e.r.gone,oddsMeta:a(),pin:d});var g=Jh();let B;var T=P(g),S=P(T),w=P(S),D=P(w);{var C=vn=>{var Ln=Lh();L(vn,Ln)};en(D,vn=>{s()&&vn(C)})}var E=m(D,1,!0),F=m(w,2),G=k(F,!0),A=m(F,2),J=k(A,!0),N=m(A,2),O=k(N,!0),Z=m(N,2),U=k(Z,!0),X=m(Z,2),an=k(X,!0),sn=m(X,2),z=P(sn),$=k(z,!0),W=m(z,2),I=k(W),Y=m(S,2),b=P(Y);let _;var x=k(b),j=m(Y,2);{var tn=vn=>{var Ln=Ah(),In=k(Ln,!0);K(()=>y(In,t())),L(vn,Ln)};en(j,vn=>{s()&&t()&&vn(tn)})}var dn=m(j,2),un=k(dn,!0),Tn=m(T,2),nn=P(Tn),rn=k(nn),mn=m(nn,2);hn(mn,17,()=>e.r.alsoFits,is,(vn,Ln)=>{var In=Mh(),Vn=P(In),$n=m(Vn),bn=k($n,!0);K(()=>{In.disabled=o(),y(Vn,`${c(Ln).slotLabel??""} `),y(bn,c(Ln).flex)}),on("click",In,()=>e.onpick(e.r.id,c(Ln).slotId)),L(vn,In)});var cn=m(mn,2),Sn=k(cn),Fn=m(cn,2),Xn=k(Fn,!0);K((vn,Ln,In,Vn,$n,bn,de,me)=>{B=Nn(g,1,`cp-row cp-${e.r.tone??""}`,"svelte-q412k",B,{"cp-top3":s()}),fn(g,"data-id",e.r.id),fn(S,"aria-expanded",c(l)),fn(S,"aria-controls",`cp-fit-${e.r.id??""}`),y(E,e.r.name),y(G,e.r.pos),y(J,e.r.nflTeam),fn(N,"title",vn),fn(N,"aria-label",`${e.r.ovr??""} overall — provenance in the tooltip`),y(O,e.r.ovr),fn(Z,"title",Ln),fn(Z,"aria-label",`${e.r.wins??""} wins — provenance in the tooltip`),y(U,e.r.wins),fn(X,"title",In),fn(X,"aria-label",`${e.r.priority??""} priority — provenance in the tooltip`),y(an,e.r.priority),fn(z,"aria-label",`${e.r.gone??""} gone odds`),fn(z,"aria-describedby",`cp-gone-desc-${e.r.id??""}`),fn(z,"title",Vn),y($,e.r.gone),y(I,`${$n??""} ${bn??""}`),_=Nn(b,1,"cp-draftbtn svelte-q412k",null,_,{"cp-istop":s()}),b.disabled=o(),fn(b,"aria-label",`Draft ${e.r.name??""} at ${e.r.slotLabel??""}${s()?" — one of your top three priorities":""}`),y(x,`Draft at ${e.r.slotLabel??""}`),fn(dn,"id",`cp-gone-desc-${e.r.id??""}`),y(un,de),fn(Tn,"id",`cp-fit-${e.r.id??""}`),fn(Tn,"hidden",!c(l)),y(rn,`Fills ${e.r.slotLabel??""}${e.r.natural?"":" (flex)"}`),cn.disabled=o(),y(Sn,`Draft at ${e.r.slotLabel??""}`),y(Xn,me)},[()=>u(),()=>h(),()=>i.priority+" — "+p(),()=>v(),()=>f(a()),()=>v(),()=>f(a()),()=>f(a())]),on("click",S,()=>V(l,!c(l))),on("click",b,()=>(e.onpickDirect??e.onpick)(e.r.id,e.r.slotId)),on("click",cn,()=>e.onpick(e.r.id,e.r.slotId)),L(n,g),En()}On(["click"]);var Fh=M("<button> </button>"),Wh=M('<div class="cp-sorts svelte-1xb8352" role="group" aria-label="Sort the board"></div>');function Ph(n,e){Rn(e,!0);const a=[{k:"wins",lbl:"Wins"},{k:"priority",lbl:"Priority"},{k:"ovr",lbl:"OVR"}];var s=Wh();hn(s,21,()=>a,is,(t,r)=>{var o=Fh();let l;var i=k(o,!0);K(()=>{l=Nn(o,1,"cp-sort svelte-1xb8352",null,l,{"cp-on":e.sort===c(r).k}),y(i,c(r).lbl)}),on("click",o,()=>e.onsort(c(r).k)),L(t,o)}),L(n,s),En()}On(["click"]);var Gh=M('<span class="cp-seedcode svelte-zb9xkj">code <b class="svelte-zb9xkj"> </b></span>'),Nh=M('<button class="cp-play svelte-zb9xkj" data-testid="cp-play">Play week 1 →</button>'),Ih=M('<div class="cp-ft svelte-zb9xkj"><!> <span class="cp-count svelte-zb9xkj"> </span> <!> <button class="cp-undo svelte-zb9xkj">Undo my last pick</button> <!></div>');function Hh(n,e){Rn(e,!0);let a=Kn(e,"draftDone",3,!1),s=Kn(e,"seedCode",3,""),t=Kn(e,"busy",3,!1);var r=Ih(),o=P(r);Ph(o,{get sort(){return e.sort},get onsort(){return e.onsort}});var l=m(o,2),i=k(l,!0),f=m(l,2);{var d=v=>{var g=Gh(),B=m(P(g)),T=k(B,!0);K(()=>{fn(g,"title",`the draft code — put ?seed=${s()??""} in the URL to replay this exact draft`),y(T,s())}),L(v,g)};en(f,v=>{s()&&v(d)})}var u=m(f,2),h=m(u,2);{var p=v=>{var g=Nh();on("click",g,function(...B){e.onplay?.apply(this,B)}),L(v,g)};en(h,v=>{a()&&v(p)})}K(()=>{y(i,e.footer.text),u.disabled=!e.canUndo||t()}),on("click",u,function(...v){e.onundo?.apply(this,v)}),L(n,r),En()}On(["click"]);On(["click"]);var Kh=M("<button> </button>"),xh=M('<span class="cp-needs-unit svelte-2mq0wt"> </span> <!>',1),Oh=M('<button class="cp-need cp-need-all svelte-2mq0wt">ALL</button>'),Vh=M('<div class="cp-needs svelte-2mq0wt" data-testid="cp-needs"><span class="cp-needs-lbl svelte-2mq0wt"> </span> <!> <!></div>');function Yh(n,e){Rn(e,!0);let a=Kn(e,"selected",19,()=>[]);const s={offense:"OFF",defense:"DEF",special:"ST"};Object.fromEntries(ke.map(h=>[h.id,h.unit]));const t=h=>ke.filter(p=>p.unit===h&&e.open.includes(p.id)).map(p=>p.id),r=h=>a().includes(h);var o=Vh(),l=P(o),i=k(l),f=m(l,2);hn(f,16,()=>["offense","defense","special"],h=>h,(h,p)=>{var v=xh(),g=Dn(v),B=k(g,!0),T=m(g,2);hn(T,16,()=>t(p),S=>S,(S,w)=>{var D=Kh();let C;var E=k(D,!0);K((F,G,A,J)=>{C=Nn(D,1,"cp-need svelte-2mq0wt",null,C,{"cp-need-on":F}),fn(D,"aria-pressed",G),fn(D,"title",`filter the board to ${A??""}`),y(E,J)},[()=>r(w),()=>r(w),()=>gt(w),()=>gt(w)]),on("click",D,()=>e.ontoggle(w)),L(S,D)}),K(()=>y(B,s[p])),L(h,v)});var d=m(f,2);{var u=h=>{var p=Oh();on("click",p,function(...v){e.onclear?.apply(this,v)}),L(h,p)};en(d,h=>{a().length&&h(u)})}K(()=>y(i,`MY NEEDS · ${e.open.length??""} OPEN`)),L(n,o),En()}On(["click"]);var zh=M('<span class="cp-heatcell svelte-e071nj"> </span>'),Qh=M(`<div class="cp-heat svelte-e071nj" aria-label="Needs by open slot — gone-risk heat (the cells are the engine VM's own numbers)"></div>`),Uh=M('<p class="cp-confidence svelte-e071nj">Top pick: <b class="svelte-e071nj"> </b> wins · next best: <b class="svelte-e071nj"> </b> </p>'),jh=M('<p class="cp-drafted svelte-e071nj" role="status" aria-live="polite">Drafted <b class="svelte-e071nj"> </b> · <button class="cp-btn cp-draftedundo svelte-e071nj">Undo</button></p>'),qh=M('<p class="cp-confirm svelte-e071nj">Draft <b> </b> at <b> </b>? <button class="cp-btn cp-go svelte-e071nj">Confirm the pick</button> <button class="cp-btn svelte-e071nj">Cancel</button></p>'),Zh=M('<section class="cp-board svelte-e071nj" aria-label="Draft board"><!> <!> <!> <!> <!> <!> <div class="cp-rows svelte-e071nj"></div> <!></section>');function vl(n,e){Rn(e,!0);let a=Kn(e,"openSlots",19,()=>[]),s=Kn(e,"oddsMeta",3,null),t=Kn(e,"needsSelected",19,()=>[]),r=Kn(e,"draftDone",3,!1),o=Kn(e,"seedCode",3,""),l=Kn(e,"savedSuggest",3,null),i=Kn(e,"busy",3,!1),f=Kn(e,"heat",19,()=>[]);Kn(e,"winsNeighbours",19,()=>[]);let d=pn(null),u=pn(null),h=pn(!1),p=pn(null),v=null,g=null;const B=async(W,I)=>{if(c(h))return;V(h,!0),V(d,null);const Y=e.vm.rows.find(_=>_.id===W)?.name??"the pick";if(await e.onpick(W,I)===!1){g&&clearTimeout(g),g=setTimeout(()=>{V(h,!1)},380);return}V(p,{name:Y},!0),v&&clearTimeout(v),v=setTimeout(()=>{V(p,null)},2600),g&&clearTimeout(g),g=setTimeout(()=>{V(h,!1)},380)};let T=pn(!1),S=null;const w=()=>{!c(d)||c(T)||(V(T,!0),e.onpick(c(d).id,c(d).slot),V(d,null),S&&clearTimeout(S),S=setTimeout(()=>{V(T,!1)},380))},D=ln(()=>t().length===0?e.vm.rows:e.vm.rows.filter(W=>t().includes(W.slotId)||W.alsoFits.some(I=>t().includes(I.slotId)))),C=ln(()=>{const W=c(D),Y=sh(l(),new Set(W.map(x=>x.id)))??yc(W,e.vm.sort),b=new Map(W.map(x=>[x.id,x])),_=new Map(Y.map((x,j)=>{const tn=b.get(x);return[x,tn?ah(tn,j,[...t()]):""]}));return{ids:new Set(Y),why:_}}),E=ln(()=>{const W=[...c(C).ids];if(W.length<2)return null;const I=c(D),Y=new Map(I.map(x=>[x.id,x])),b=Y.get(W[0]),_=Y.get(W[1]);return!b||!_?null:wh(b.wins,_.wins,null)});var F=Zh(),G=P(F);Rh(G,{get header(){return e.vm.header}});var A=m(G,2);Yh(A,{get open(){return a()},get selected(){return t()},get ontoggle(){return e.onneedtoggle},get onclear(){return e.onneedclear}});var J=m(A,2);{var N=W=>{var I=Qh();hn(I,21,f,Y=>Y.slot,(Y,b)=>{var _=zh(),x=k(_,!0);K(j=>{fn(_,"data-tone",c(b).tone),fn(_,"data-slot",c(b).slot),fn(_,"title",j),y(x,c(b).slot)},[()=>`{c.slot}: gone-risk ${(c(b).risk*100).toFixed(0)}% — need ${c(b).need?"yes":"flex"}`]),L(Y,_)}),L(W,I)};en(J,W=>{f().length&&W(N)})}var O=m(J,2);{var Z=W=>{var I=Uh(),Y=m(P(I)),b=k(Y,!0),_=m(Y,2),x=k(_,!0),j=m(_);K(()=>{fn(I,"data-verdict",c(E).verdict),y(b,c(E).topWins),y(x,c(E).nextWins),y(j,` — ${c(E).verdict??""} (INTERIM — display-rounded, awaiting rawSort)`)}),L(W,I)};en(O,W=>{c(E)&&W(Z)})}var U=m(O,2);{var X=W=>{var I=jh(),Y=m(P(I)),b=k(Y,!0),_=m(Y,2);K(()=>y(b,c(p).name)),on("click",_,()=>{e.onundo(),V(p,null)}),L(W,I)};en(U,W=>{c(p)&&W(X)})}var an=m(U,2);{var sn=W=>{var I=qh(),Y=m(P(I)),b=k(Y,!0),_=m(Y,2),x=k(_,!0),j=m(_,2),tn=m(j,2);K(dn=>{y(b,dn),y(x,c(d).slot)},[()=>e.vm.rows.find(dn=>dn.id===c(d).id)?.name]),on("click",j,w),on("click",tn,()=>V(d,null)),L(W,I)};en(an,W=>{c(d)&&W(sn)})}var z=m(an,2);hn(z,21,()=>c(D),W=>W.id,(W,I)=>{{let Y=ln(()=>c(C).ids.has(c(I).id)),b=ln(()=>c(C).why.get(c(I).id)??""),_=ln(()=>c(D).filter(x=>x.id!==c(I).id).map(x=>x.wins));_h(W,{get r(){return c(I)},onpick:(x,j)=>V(d,{id:x,slot:j},!0),onpickDirect:B,get oddsMeta(){return s()},get suggest(){return c(Y)},get why(){return c(b)},get winsNeighbours(){return c(_)},get busy(){return i()}})}}),Wd(z,W=>V(u,W),()=>c(u));var $=m(z,2);Hh($,{get footer(){return e.vm.footer},get canUndo(){return e.canUndo},get onundo(){return e.onundo},get onsort(){return e.onsort},get sort(){return e.vm.sort},get onplay(){return e.onplay},get draftDone(){return r()},get seedCode(){return o()},get busy(){return i()}}),K(()=>fn(z,"data-count",c(D).length)),L(n,F),En()}On(["click"]);var Xh=M("<button> </button>"),$h=M('<div role="group" aria-label="Valuation mode"></div>');function nv(n,e){Rn(e,!0);let a=pn(ea(ie.get()));ie.subscribe(o=>V(a,o,!0));const s=["measured","balance","owner"];var t=$h();let r;hn(t,21,()=>s,is,(o,l)=>{var i=Xh();let f;var d=k(i,!0);K(()=>{f=Nn(i,1,"cp-mode svelte-1o2iqa1",null,f,{"cp-on":c(a).mode===c(l)}),i.disabled=c(a).locked,fn(i,"title",c(a).locked?"The mode switch is disabled mid-draft":_e[c(l)]),y(d,_e[c(l)])}),on("click",i,()=>ie.set(c(l))),L(o,i)}),K(()=>r=Nn(t,1,"cp-modes svelte-1o2iqa1",null,r,{"cp-locked":c(a).locked})),L(n,t),En()}On(["click"]);var ev=M('<li><span class="cp-sl svelte-lz9ww5"> </span> <span class="cp-sn"> </span> <b> </b></li>'),av=M('<section class="cp-adv svelte-lz9ww5" aria-label="Lineup advice"><h3 class="svelte-lz9ww5">Best lineup from your roster</h3> <ul class="svelte-lz9ww5"></ul></section>');function Sc(n,e){Rn(e,!0);let a=Kn(e,"weak",19,()=>[]);var s=av(),t=m(P(s),2);hn(t,21,()=>e.slots,is,(r,o,l)=>{var i=ev();let f;var d=P(i),u=k(d,!0),h=m(d,2),p=k(h,!0),v=m(h,2),g=k(v,!0);K(B=>{f=Nn(i,1,"svelte-lz9ww5",null,f,{"cp-weak":B}),y(u,c(o).label),y(p,c(o).name),y(g,c(o).ovr)},[()=>a().includes(l)]),L(r,i)}),L(n,s),En()}var sv=M('<p class="cp-saves-notice svelte-spfs26" role="alert"> </p>'),tv=M('<p class="cp-slot-empty svelte-spfs26">empty</p>'),rv=M('<p class="cp-slot-refused svelte-spfs26"><b> </b> — corrupt-never-repair</p> <p class="cp-slot-msg svelte-spfs26"> </p>',1),ov=M('<p class="cp-slot-line svelte-spfs26"> </p>'),lv=M('<p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-line cp-slot-dim svelte-spfs26"> </p>',1),iv=M('<p class="cp-slot-older svelte-spfs26"> </p>'),cv=M('<p class="cp-slot-kind svelte-spfs26"> </p> <!> <p class="cp-slot-dim svelte-spfs26"> </p> <!> <button class="cp-slot-load svelte-spfs26"> </button>',1),fv=M('<article><h3 class="svelte-spfs26"> </h3> <!> <button class="cp-slot-save svelte-spfs26">Save draft here</button></article>'),dv=M(`<aside class="cp-hydrated svelte-spfs26" aria-label="Hydrated season"><h3 class="svelte-spfs26"> </h3> <p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26">the season screens ride a later slice — the hydration itself is proven (this card renders the engine's LoadedWeek)</p></aside>`),uv=M(`<section class="cp-saves svelte-spfs26" aria-label="Save and load"><header class="cp-saves-head svelte-spfs26"><h2 class="svelte-spfs26">Saves</h2> <span class="cp-saves-sub svelte-spfs26">slots A · B · C — written through the engine's envelope (saveId · revision · sha-256 dataset stamp)</span> <button class="cp-saves-x svelte-spfs26" aria-label="Close saves">✕</button></header> <!> <div class="cp-slotgrid svelte-spfs26"></div> <!> <p class="cp-saves-foot svelte-spfs26">A refused save is <b class="svelte-spfs26">never repaired</b> — the reason above is the engine's own verdict (hydrateWeek / parseEnvelope).</p> <p class="cp-saves-foot cp-saves-stamp svelte-spfs26">This build writes its stamp into every save: <b class="svelte-spfs26"> </b> </p></section>`);function pv(n,e){Rn(e,!0);const a=ea({A:null,B:null,C:null});let s=pn(""),t=pn(null),r=pn(!1);async function o(){V(r,!0);for(const C of cl)a[C]=await qp(C);V(r,!1)}Ms(()=>{e.record,o()});async function l(C){if(V(s,""),!e.record||!e.meta){V(s,"nothing to save — no draft is in progress");return}const E=await zp(C,e.record,e.meta,new Date);E&&V(s,E,!0),await o()}async function i(C){V(s,""),V(t,null);const E=a[C];if(!E||E.state!=="ok"){V(s,"nothing loadable in slot "+C);return}if(E.kind==="draft"){const F=await Zp(C);if(!F.ok){V(s,"refused: "+F.message),await o();return}e.onloaddraft(F.record,{saveId:E.saveId,createdAt:E.createdAt}),e.onclose();return}V(t,E,!0)}var f=uv(),d=P(f),u=m(P(d),4),h=m(d,2);{var p=C=>{var E=sv(),F=k(E,!0);K(()=>y(F,c(s))),L(C,E)};en(h,C=>{c(s)&&C(p)})}var v=m(h,2);hn(v,20,()=>cl,C=>C,(C,E)=>{const F=ln(()=>a[E]);var G=fv();let A;var J=P(G),N=k(J),O=m(J,2);{var Z=sn=>{var z=tv();L(sn,z)},U=sn=>{var z=rv(),$=Dn(z),W=P($),I=k(W),Y=m($,2),b=k(Y,!0);K(()=>{y(I,`REFUSED (${c(F).problem??""})`),y(b,c(F).message)}),L(sn,z)},X=sn=>{var z=cv(),$=Dn(z),W=k($),I=m($,2);{var Y=nn=>{var rn=ov(),mn=k(rn);K(()=>y(mn,`${c(F).picks??""} picks · ${wn[c(F).userTeamIndex??0]?.name??"?"??""}`)),L(nn,rn)},b=nn=>{var rn=lv(),mn=Dn(rn),cn=k(mn),Sn=m(mn,2),Fn=k(Sn);K(()=>{y(cn,`${c(F).userTeam??""} · next: week ${c(F).week??""}`),y(Fn,`${c(F).nextFixture??""} · ${c(F).played??""} games played`)}),L(nn,rn)};en(I,nn=>{c(F).kind==="draft"?nn(Y):nn(b,-1)})}var _=m(I,2),x=k(_),j=m(_,2);{var tn=nn=>{var rn=iv(),mn=k(rn,!0);K(cn=>y(mn,cn),[()=>fl(c(F),ta())]),L(nn,rn)},dn=ln(()=>fl(c(F),ta()));en(j,nn=>{c(dn)&&nn(tn)})}var un=m(j,2),Tn=k(un);K((nn,rn)=>{y(W,`${nn??""} · rev ${c(F).saveRevision??""}`),y(x,`saved ${rn??""}`),y(Tn,`Load ${c(F).kind??""}`)},[()=>c(F).kind?.toUpperCase(),()=>c(F).savedAt?.slice(0,16).replace("T"," ")]),on("click",un,()=>i(E)),L(sn,z)};en(O,sn=>{!c(F)||c(F).state==="empty"?sn(Z):c(F).state==="refused"?sn(U,1):sn(X,-1)})}var an=m(O,2);K(()=>{A=Nn(G,1,"cp-slot svelte-spfs26",null,A,{"cp-slot-ok":c(F)?.state==="ok","cp-slot-bad":c(F)?.state==="refused"}),fn(G,"data-slot",E),y(N,`Slot ${E??""}`),an.disabled=!e.record}),on("click",an,()=>l(E)),L(C,G)});var g=m(v,2);{var B=C=>{var E=dv(),F=P(E),G=k(F),A=m(F,2),J=k(A),N=m(A,2),O=k(N);K(()=>{y(G,`Hydrated — ${c(t).kind??""} save, slot ${c(t).slot??""}`),y(J,`${c(t).userTeam??""} · next week ${c(t).week??""} · ${c(t).nextFixture??""}`),y(O,`${c(t).played??""} games played · the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)`)}),L(C,E)};en(g,C=>{c(t)&&C(B)})}var T=m(g,4),S=m(P(T)),w=k(S,!0),D=m(S);K((C,E)=>{y(w,C),y(D,` · shell ${E??""} (§4.4 — the stamp is the RUNNING engine's, never a hardcoded pin).`)},[()=>ta(),()=>Yp()]),on("click",u,function(...C){e.onclose?.apply(this,C)}),L(n,f),En()}On(["click"]);var hv=M('<p class="cp-ts-replay svelte-qxuqmk">This tab carries a replay link — starting a draft replays that exact seed. <button class="cp-ts-newseed svelte-qxuqmk">New draft · new seed</button></p>'),vv=M("<button> </button>"),mv=M('<div class="cp-ts-div svelte-qxuqmk"><h3 class="svelte-qxuqmk"> </h3> <!></div>'),gv=M('<h2 class="cp-ts-conf svelte-qxuqmk"> </h2> <div class="cp-ts-divs svelte-qxuqmk"></div>',1),Bv=M("<button></button>"),Cv=M(`No position chosen — the league's standard order decides. Slot <b class="svelte-qxuqmk"> </b> is this team's natural first pick.`,1),yv=M('You pick <b class="svelte-qxuqmk"> </b> ',1),Tv=M('<p class="cp-sub cp-ts-order svelte-qxuqmk"> </p>'),Sv=M('<aside class="cp-ts-detail svelte-qxuqmk" aria-live="polite"><h3 class="svelte-qxuqmk"> </h3> <p class="cp-ts-meta svelte-qxuqmk"> </p> <p class="cp-ts-rivals svelte-qxuqmk"><b class="svelte-qxuqmk">Division rivals:</b> </p> <p class="cp-ts-note svelte-qxuqmk"> </p> <h4 class="cp-ts-sloth svelte-qxuqmk">Your draft position</h4> <div class="cp-ts-slots svelte-qxuqmk" role="group" aria-label="Pick your draft position"></div> <p class="cp-ts-note svelte-qxuqmk"><!></p> <!> <button class="cp-ts-go svelte-qxuqmk"> </button></aside>'),kv=M('<aside class="cp-ts-detail cp-ts-idle svelte-qxuqmk" aria-live="polite"><p class="cp-ts-note svelte-qxuqmk">Select one of the 32 teams to see its details, choose a draft position, and start the draft.</p></aside>'),wv=M('<section class="cp-ts svelte-qxuqmk"><h1 class="cp-ts-title svelte-qxuqmk">Pick your team</h1> <p class="cp-cygline"><span class="cp-cygt">Can you go</span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p> <!> <p class="cp-prov">Every number you will see on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!></section>');function Dv(n,e){Rn(e,!0);let a=Kn(e,"seedPinned",3,!1),s=Kn(e,"busy",3,!1),t=pn(null),r=pn(null),o=ln(()=>c(t)==null?-1:wn.findIndex(C=>C.name===c(t))),l=ln(()=>c(t)==null?null:Et[c(t)]),i=ln(()=>c(t)==null||!c(l)?[]:La(c(l).conf,c(l).div).filter(C=>C!==c(l).name)),f=ln(()=>c(o)<0||c(r)===null?null:Ki(c(o),c(r)));function d(){c(o)<0||s()||e.onstart(c(o),c(r))}var u=wv(),h=m(P(u),4);{var p=C=>{var E=hv(),F=m(P(E));on("click",F,function(...G){e.onnewseed?.apply(this,G)}),L(C,E)};en(h,C=>{a()&&C(p)})}var v=m(h,2),g=m(P(v)),B=k(g,!0),T=m(v,2);hn(T,16,()=>["AFC","NFC"],C=>C,(C,E)=>{var F=gv(),G=Dn(F),A=k(G,!0),J=m(G,2);hn(J,20,()=>Ke,N=>N,(N,O)=>{var Z=mv(),U=P(Z),X=k(U),an=m(U,2);hn(an,16,()=>La(E,O),sn=>sn,(sn,z)=>{var $=vv();let W;var I=k($,!0);K(()=>{W=Nn($,1,"cp-ts-team svelte-qxuqmk",null,W,{"cp-on":c(t)===z}),fn($,"aria-pressed",c(t)===z),y(I,z)}),on("click",$,()=>V(t,z,!0)),L(sn,$)}),K(()=>y(X,`${E??""} ${O??""}`)),L(N,Z)}),K(()=>y(A,E)),L(C,F)});var S=m(T,2);{var w=C=>{var E=Sv(),F=P(E),G=k(F,!0),A=m(F,2),J=k(A),N=m(A,2),O=m(P(N)),Z=m(N,2),U=k(Z),X=m(Z,4);hn(X,20,()=>Array(32),is,(_,x,j)=>{var tn=Bv();let dn;tn.textContent=j+1,K(()=>{dn=Nn(tn,1,"cp-ts-slot svelte-qxuqmk",null,dn,{"cp-on":c(r)===j+1,"cp-nat":c(o)===j}),fn(tn,"aria-pressed",c(r)===j+1)}),on("click",tn,()=>V(r,c(r)===j+1?null:j+1,!0)),L(_,tn)});var an=m(X,2),sn=P(an);{var z=_=>{var x=Cv(),j=m(Dn(x)),tn=k(j,!0);K(()=>y(tn,c(o)+1)),L(_,x)},$=_=>{var x=yv(),j=m(Dn(x)),tn=k(j,!0),dn=m(j);K(()=>{y(tn,c(r)),y(dn,`${c(r)===c(o)+1?" — this team's natural spot":" first"}. The store trades your team into this slot and mirrors the trade through the snake; a save restores the same order.`)}),L(_,x)};en(sn,_=>{c(r)===null?_(z):_($,-1)})}var W=m(an,2);{var I=_=>{var x=Tv(),j=k(x);K(tn=>y(j,`Order preview (first 6): ${tn??""}`),[()=>c(f).slice(0,6).map(tn=>wn[tn].name).join(" · ")]),L(_,x)};en(W,_=>{c(f)&&c(r)!==null&&_(I)})}var Y=m(W,2),b=k(Y);K((_,x)=>{y(G,c(l).name),y(J,`${c(l).conf??""} ${c(l).div??""}`),y(O,` ${_??""}`),y(U,`You draft as this team: the board's on-clock indicator, your picks and your roster are all ${c(l).name??""}'s.`),Y.disabled=s(),y(b,`DRAFT AS ${x??""}${c(r)?` · SLOT ${c(r)}`:""}`)},[()=>c(i).join(" · "),()=>c(l).name.toUpperCase()]),on("click",Y,d),L(C,E)},D=C=>{var E=kv();L(C,E)};en(S,C=>{c(l)?C(w):C(D,-1)})}K(C=>y(B,C),[()=>_e[ie.get().mode]]),L(n,u),En()}On(["click"]);function bv(n){const e=(n.drives??[]).filter(o=>o.pts>0);if(!e.length)return null;let a=e[0];for(const o of e)(o.pts>a.pts||o.pts===a.pts&&o.n<a.n)&&(a=o);const s=(n.drives??[]).filter(o=>o.end==="INT"||o.end==="FUM").length,t=e.filter(o=>o.end==="TD").length,r=e.filter(o=>o.end==="FG").length;return{team:a.team,driveNo:a.n,summary:a.summary,pts:a.pts,line:`drive ${a.n} · ${a.pts} pts · the game's ${t} TD${t===1?"":"s"} and ${r} FG${r===1?"":"s"} across ${e.length} scoring drives`,why:`the feed's own drive data — no new math · ${s} turnover${s===1?"":"s"} named on their drive lines`}}function Rv(n,e,a){const s=a.includes(n.team),t=e.filter(i=>i!==n&&i.w===n.w&&Math.abs(parseFloat(i.winPct)-parseFloat(n.winPct))<1e-9),r=`${n.seed}. ${n.team} — ${n.w}-${n.l}-${n.t} (${n.winPct} win pct), ${s?"division winner (the engine seeds division winners first)":"wild card"}`;if(!t.length)return r;const o=t.filter(i=>(i.seed??99)<(n.seed??99));if(o.length){const i=o[0];return`${r} · tied on wins with ${i.team} — the engine's tiebreak (points allowed, lower first) puts ${i.team} ahead (${i.pa} < ${n.pa} pa)`}const l=t.filter(i=>(i.seed??0)>(n.seed??0));if(l.length){const i=l[0];return`${r} · tied on wins with ${i.team} — the engine's tiebreak (points allowed, lower first) puts this team ahead (${n.pa} < ${i.pa} pa)`}return r}const Ev=["slower","standard","faster"],Lv={slower:2,standard:1,faster:.5},Av={slower:"Slower",standard:"Standard",faster:"Faster"},Mv=n=>Math.min(2,Math.max(.5,n));var Jv=M("<button> </button>"),_v=M('<aside class="cp-gameball svelte-tsx9t1" aria-label="The game ball"><span class="cp-gameball-team"> </span> <b class="svelte-tsx9t1">GAME BALL</b> <span class="cp-gameball-why svelte-tsx9t1"> </span></aside>'),Fv=M('<span class="cp-feed-dim svelte-tsx9t1"> </span>'),Wv=M('<div class="cp-feed-q svelte-tsx9t1"> </div>'),ml=M('<span class="zrl-badge svelte-tsx9t1"> </span>'),Pv=M('<!> <article><span class="zrl-t svelte-tsx9t1"> </span> <span class="zrl-team svelte-tsx9t1"> </span> <span class="zrl-play svelte-tsx9t1"><span class="cp-feed-summary svelte-tsx9t1"> </span> <span class="cp-feed-badges svelte-tsx9t1"><!> <!></span></span> <span class="zrl-sc svelte-tsx9t1"><b class="svelte-tsx9t1"> </b> <span class="cp-feed-dot svelte-tsx9t1">·</span> <b class="svelte-tsx9t1"> </b></span></article>',1),Gv=M('<p class="cp-feed-empty svelte-tsx9t1">no drives match the filter</p>'),Nv=M(`<section class="cp-feed svelte-tsx9t1" aria-label="Game feed"><header class="cp-feed-head svelte-tsx9t1"><span class="cp-feed-week svelte-tsx9t1"> </span> <span class="cp-feed-vs svelte-tsx9t1"> </span> <span class="cp-feed-tools svelte-tsx9t1"><button>NEWEST FIRST</button> <button>MY DRIVES</button> <span class="cp-feedpace svelte-tsx9t1" role="group" aria-label="Recap pace"></span> <button class="cp-feedtool svelte-tsx9t1">← BOARD</button></span></header> <!> <div class="cp-feed-final svelte-tsx9t1"><b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-at svelte-tsx9t1">at</span> <b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-finalnote svelte-tsx9t1"> <!></span> <span class="cp-feed-prov svelte-tsx9t1"> </span></div> <div class="cp-feed-log svelte-tsx9t1" data-testid="cp-feed-log"><!> <!></div> <footer class="cp-feed-foot svelte-tsx9t1"><span> </span> <span class="cp-feed-dim svelte-tsx9t1">drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)</span></footer></section>`);function Iv(n,e){Rn(e,!0);let a=pn(!1),s=pn(!1),t=pn("standard");const r=ln(()=>bv(e.feed)),o=ln(()=>c(a)?[...e.feed.drives].reverse():e.feed.drives),l=ln(()=>c(s)?c(o).filter(nn=>nn.me):c(o)),i=nn=>nn.replace(":","·"),f=nn=>nn==="good"?"var(--cp-good)":nn==="bad"?"var(--cp-bad)":nn==="gold"?"var(--cp-gold)":"var(--cp-sub)";var d=Nv(),u=P(d),h=P(u),p=k(h),v=m(h,2),g=k(v),B=m(v,2),T=P(B);let S;var w=m(T,2);let D;var C=m(w,2);hn(C,20,()=>Ev,nn=>nn,(nn,rn)=>{var mn=Jv();let cn;var Sn=k(mn,!0);K(()=>{cn=Nn(mn,1,"cp-feedtool svelte-tsx9t1",null,cn,{"cp-feedtool-on":c(t)===rn}),fn(mn,"aria-pressed",c(t)===rn),y(Sn,Av[rn])}),on("click",mn,()=>V(t,rn,!0)),L(nn,mn)});var E=m(C,2),F=m(u,2);{var G=nn=>{var rn=_v(),mn=P(rn),cn=k(mn,!0),Sn=m(mn,3),Fn=m(Sn),Xn=k(Fn,!0);K(()=>{Ne(mn,`color:${e.feed.homeInk.pale??""}`),y(cn,c(r).team===e.feed.home?e.feed.homeAbbr:e.feed.awayAbbr),y(Sn,` — ${c(r).line??""} `),y(Xn,c(r).summary)}),L(nn,rn)};en(F,nn=>{c(r)&&nn(G)})}var A=m(F,2),J=P(A),N=P(J),O=k(N,!0),Z=m(N),U=m(J,4),X=P(U),an=k(X,!0),sn=m(X),z=m(U,2),$=P(z),W=m($);{var I=nn=>{var rn=Fv(),mn=k(rn);K(()=>y(mn,`· regulation ${e.feed.regAway??""}–${e.feed.regHome??""}`)),L(nn,rn)};en(W,nn=>{(e.feed.regHome!==e.feed.homeScore||e.feed.regAway!==e.feed.awayScore)&&nn(I)})}var Y=m(z,2),b=k(Y,!0),_=m(A,2),x=P(_);hn(x,19,()=>c(l),nn=>nn.n,(nn,rn,mn)=>{var cn=Pv(),Sn=Dn(cn);{var Fn=qn=>{var Ge=Wv(),we=k(Ge,!0);K(()=>y(we,c(rn).period>=5?"OT":`Q${c(rn).period}`)),L(qn,Ge)};en(Sn,qn=>{!c(s)&&!c(a)&&(c(mn)===0||c(l)[c(mn)-1].period!==c(rn).period)&&qn(Fn)})}var Xn=m(Sn,2);let vn;var Ln=P(Xn),In=k(Ln,!0),Vn=m(Ln,2),$n=k(Vn,!0),bn=m(Vn,2),de=P(bn),me=k(de,!0),ge=m(de,2),Pe=P(ge);hn(Pe,17,()=>c(rn).badges,qn=>qn.label,(qn,Ge)=>{var we=ml(),Aa=k(we,!0);K(ds=>{Ne(we,`color:${ds??""}`),y(Aa,c(Ge).label)},[()=>f(c(Ge).tone)]),L(qn,we)});var fs=m(Pe,2);hn(fs,17,()=>c(rn).convBadges,qn=>qn.label,(qn,Ge)=>{var we=ml(),Aa=k(we,!0);K(ds=>{Ne(we,`color:${ds??""}`),y(Aa,c(Ge).label)},[()=>f(c(Ge).tone)]),L(qn,we)});var oa=m(bn,2),ue=P(oa),ga=k(ue,!0),Ba=m(ue,4),Jt=k(Ba,!0);K(qn=>{vn=Nn(Xn,1,"cp-feed-line svelte-tsx9t1",null,vn,{"cp-me":c(rn).me}),Ne(Xn,`--beat:${c(mn)??""}`),fn(Xn,"data-period",c(rn).period),y(In,qn),Ne(Vn,`color:${c(rn).teamPale??""}`),y($n,c(rn).teamAbbr),y(me,c(rn).summary),Ne(ue,`color:${e.feed.awayInk.pale??""}`),y(ga,c(rn).scoreAfter.away),Ne(Ba,`color:${e.feed.homeInk.pale??""}`),y(Jt,c(rn).scoreAfter.home)},[()=>c(rn).period>=5?`OT${c(rn).period-4}`:i(c(rn).clock)]),L(nn,cn)});var j=m(x,2);{var tn=nn=>{var rn=Gv();L(nn,rn)};en(j,nn=>{c(l).length||nn(tn)})}var dn=m(_,2),un=P(dn),Tn=k(un);K(nn=>{y(p,`WEEK ${e.feed.week??""} · ${e.feed.year??""}`),y(g,`${e.feed.awayAbbr??""} @ ${e.feed.homeAbbr??""}`),S=Nn(T,1,"cp-feedtool svelte-tsx9t1",null,S,{"cp-feedtool-on":c(a)}),fn(T,"aria-pressed",c(a)),D=Nn(w,1,"cp-feedtool svelte-tsx9t1",null,D,{"cp-feedtool-on":c(s)}),fn(w,"aria-pressed",c(s)),Ne(N,`color:${e.feed.awayInk.pale??""}`),y(O,e.feed.awayAbbr),y(Z,` ${e.feed.awayScore??""}`),Ne(X,`color:${e.feed.homeInk.pale??""}`),y(an,e.feed.homeAbbr),y(sn,` ${e.feed.homeScore??""}`),y($,`${e.feed.ot?e.feed.ot.tie?`TIE — OT ×${e.feed.ot.periods} (both teams possessed)`:`FINAL — OT ×${e.feed.ot.periods} (both teams possessed)`:"FINAL"} `),y(b,e.feed.gameSeedLabel),Ne(_,nn),y(Tn,`${e.feed.drives.length??""} drives · ${e.feed.meDrives??""} mine · ${e.feed.leadChanges??""} lead changes`)},[()=>`--beatpace:${Mv(Lv[c(t)])}`]),on("click",T,()=>V(a,!c(a))),on("click",w,()=>V(s,!c(s))),on("click",E,function(...nn){e.onclose?.apply(this,nn)}),L(n,d),En()}On(["click"]);var Hv=M('<h1 class="cp-done-h1 svelte-14csbb6">Your draft is complete</h1>'),Kv=M('· requested slot <b class="svelte-14csbb6"> </b>',1),xv=M('<p class="cp-note cp-done-note svelte-14csbb6"><!></p>'),Ov=M('<div class="cp-rosterline svelte-14csbb6"><!></div>'),Vv=M('<section class="cp-done svelte-14csbb6"><!> <p class="cp-done-sub svelte-14csbb6"><!></p> <p class="cp-prov cp-done-prov svelte-14csbb6">seed <b class="svelte-14csbb6"> </b> · code <b class="svelte-14csbb6"> </b> · engine <b class="svelte-14csbb6"> </b> <!> · every number reads <b class="svelte-14csbb6"> </b></p> <!> <!> <div class="cp-chipline svelte-14csbb6"><button class="cp-stepbtn cp-cta">PLAY THE SEASON</button> <button class="cp-stepbtn">YOUR PLAYER CARDS</button> <button class="cp-stepbtn">THE SEASON BOOK</button></div></section>');function Yv(n,e){Rn(e,!0);let a=ln(()=>e.record.picks.length),s=ln(()=>c(a)>=1024),t=ln(()=>e.record.picks.filter(W=>W.team===e.record.userTeam).length),r=ln(()=>{if(!c(s))return[];try{const W=e.record,I=yt(e.record)[W.userTeam]??[];return(Hr(I,"4-3").placements??[]).map(b=>({label:b.slot?.label??b.slot?.slot??"?",name:b.player?.name??"(empty)",ovr:b.player?String(b.effOvr??b.player.ovr):"-"}))}catch{return[]}}),o=ln(()=>c(r).filter(W=>W.name!=="(empty)"&&W.ovr!=="-").length),l=ln(()=>c(o)<11&&c(r).length?"incomplete":"complete"),i=ln(()=>c(r).map((I,Y)=>({i:Y,v:I.name!=="(empty)"&&I.ovr!=="-"?Number(I.ovr):1/0})).filter(I=>I.v!==1/0).sort((I,Y)=>I.v-Y.v).slice(0,3).map(I=>I.i));var f=Vv(),d=P(f);{var u=W=>{var I=Hv();L(W,I)};en(d,W=>{c(s)&&W(u)})}var h=m(d,2),p=P(h);{var v=W=>{var I=zs("All 1,024 picks are in — every one of the 32 teams holds a full 32-man roster. The league is built; the season is yours to play.");L(W,I)},g=W=>{var I=zs();K((Y,b)=>y(I,`The draft has ${Y??""} of 1,024 picks in (${b??""} of yours). Come back when the board says done — the season opens from here.`),[()=>jn(c(a)),()=>jn(c(t))]),L(W,I)};en(p,W=>{c(s)?W(v):W(g,-1)})}var B=m(h,2),T=m(P(B)),S=k(T,!0),w=m(T,2),D=k(w,!0),C=m(w,2),E=k(C,!0),F=m(C),G=m(F);{var A=W=>{var I=Kv(),Y=m(Dn(I)),b=k(Y,!0);K(()=>y(b,e.requestedSlot)),L(W,I)};en(G,W=>{e.requestedSlot!==null&&W(A)})}var J=m(G,2),N=k(J,!0),O=m(B,2);{var Z=W=>{var I=xv(),Y=P(I);{var b=x=>{var j=zs();K(()=>y(j,`You drafted at slot ${e.record.pickSlot??""} — the store traded ${wn[e.record.userTeam].name??""} into that slot and mirrored the trade through the snake; the record carries it (pickSlot) and a restore replays the same order.`)),L(x,j)},_=x=>{var j=zs();K(()=>y(j,`Slot ${e.requestedSlot??""} is ${wn[e.record.userTeam].name??""}'s own spot — the standard snake ran, and a restore replays it unchanged.`)),L(x,j)};en(Y,x=>{e.record.pickSlot!==void 0?x(b):x(_,-1)})}L(W,I)};en(O,W=>{(e.requestedSlot!==null||e.record.pickSlot!==void 0)&&W(Z)})}var U=m(O,2);{var X=W=>{var I=Ov(),Y=P(I);Sc(Y,{get slots(){return c(r)},get weak(){return c(i)}}),K(()=>fn(I,"data-lineup",c(l))),L(W,I)};en(U,W=>{c(s)&&c(r).length&&W(X)})}var an=m(U,2),sn=P(an),z=m(sn,2),$=m(z,2);K((W,I,Y,b)=>{fn(f,"data-state",c(s)?"complete":"partial"),y(S,e.record.seed),y(D,W),y(E,I),y(F,` · ${Y??""} picks · ${wn[e.record.userTeam].name??""} `),y(N,b),sn.disabled=!c(s),fn(sn,"title",c(s)?void 0:"the season needs a finished draft")},[()=>Mt(e.record.seed),()=>ta(),()=>jn(c(a)),()=>_e[ie.get().mode]]),on("click",sn,function(...W){e.onseason?.apply(this,W)}),on("click",z,function(...W){e.oncards?.apply(this,W)}),on("click",$,function(...W){e.onbook?.apply(this,W)}),L(n,f),En()}On(["click"]);var zv=M('<button class="cp-stepbtn">RESTORE A SAVED WEEK</button>'),Qv=M('<div class="cp-panel"><h2 class="cp-h2">THE SEASON</h2> <p class="cp-note">No season is running. Finish a draft and the season opens from the draft-complete screen — or restore a saved week.</p> <!></div>'),Uv=M('<span class="cp-score"> </span>'),jv=M('<span class="cp-pending">NOT YET PLAYED</span>'),qv=M('<div class="cp-matchup"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div> <button class="cp-stepbtn cp-cta"> </button>',1),Zv=M('<p class="cp-note">No game for you this week — the league plays on.</p> <button class="cp-stepbtn cp-cta">PLAY THE WEEK</button>',1),Xv=M('<button class="cp-stepbtn">RESTORE</button>'),$v=M("<button> </button>"),nm=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">OPEN THE SEASON BOOK</button></div>'),em=M('<h2 class="cp-h2"> </h2> <div class="cp-hubrow svelte-k2xmuw"><div class="cp-gamecard cp-megame"><p class="cp-final"> </p> <!></div> <div class="cp-hubmeta cp-panel svelte-k2xmuw"><p class="cp-sub"> </p> <div class="cp-chipline"><button class="cp-stepbtn">WEEK VIEW</button> <button class="cp-stepbtn">STANDINGS</button> <button class="cp-stepbtn">PLAYOFFS</button> <button class="cp-stepbtn">BOOK</button> <!></div></div></div> <div class="cp-panel"><h3 class="cp-h3 svelte-k2xmuw">THE WEEKS</h3> <div class="cp-weekgrid svelte-k2xmuw"></div></div> <!>',1),am=M('<section class="cp-hub"><!></section>');function sm(n,e){Rn(e,!0);let a=ln(()=>e.season.ready?e.season.finished?"finished":"running":"none"),s=ln(()=>e.season.view?e.season.view.games.filter(f=>f.home===e.season.userTeamName||f.away===e.season.userTeamName):[]),t=ln(()=>c(s).length?c(s)[0]:null);var r=am(),o=P(r);{var l=f=>{var d=Qv(),u=m(P(d),4);{var h=p=>{var v=zv();on("click",v,function(...g){e.onrestore?.apply(this,g)}),L(p,v)};en(u,p=>{e.canRestore&&p(h)})}L(f,d)},i=f=>{var d=em(),u=Dn(d),h=k(u),p=m(u,2),v=P(p),g=P(v),B=k(g),T=m(g,2);{var S=z=>{var $=qv(),W=Dn($),I=P(W),Y=k(I,!0),b=m(I,2);{var _=Tn=>{var nn=Uv(),rn=k(nn);K(()=>y(rn,`${c(t).as??""} — ${c(t).hs??""}`)),L(Tn,nn)},x=Tn=>{var nn=jv();L(Tn,nn)};en(b,Tn=>{c(t).hs!==null?Tn(_):Tn(x,-1)})}var j=m(b,2),tn=k(j,!0),dn=m(W,2),un=k(dn,!0);K(()=>{y(Y,c(t).awayAbbr),y(tn,c(t).homeAbbr),y(un,c(t).hs!==null?"WATCH THE FEED":"PLAY THE WEEK")}),on("click",dn,function(...Tn){e.onplayweek?.apply(this,Tn)}),L(z,$)},w=z=>{var $=Zv(),W=m(Dn($),2);on("click",W,function(...I){e.onplayweek?.apply(this,I)}),L(z,$)};en(T,z=>{c(t)?z(S):z(w,-1)})}var D=m(v,2),C=P(D),E=k(C),F=m(C,2),G=P(F),A=m(G,2),J=m(A,2),N=m(J,2),O=m(N,2);{var Z=z=>{var $=Xv();on("click",$,function(...W){e.onrestore?.apply(this,W)}),L(z,$)};en(O,z=>{e.canRestore&&z(Z)})}var U=m(p,2),X=m(P(U),2);hn(X,21,()=>Array(e.season.total),is,(z,$,W)=>{const I=ln(()=>W+1);var Y=$v();let b;var _=k(Y,!0);K(()=>{b=Nn(Y,1,"cp-wk svelte-k2xmuw",null,b,{"cp-cur":c(I)===e.season.slot,"cp-played":c(I)<e.season.slot+0&&e.season.atLastPlayed===!1||c(I)<=e.season.slot-1}),y(_,c(I)>ss?["WC","DIV","CONF","SB"][c(I)-ss-1]:c(I))}),on("click",Y,()=>e.onweek(c(I))),L(z,Y)});var an=m(U,2);{var sn=z=>{var $=nm(),W=P($),I=k(W),Y=m(W,2);K(b=>y(I,`${b??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion?.toUpperCase()]),on("click",Y,function(...b){e.onbook?.apply(this,b)}),L(z,$)};en(an,z=>{e.season.finished&&z(sn)})}K((z,$,W)=>{y(h,`THE SEASON · ${z??""} · ${e.season.view?.label??""??""}`),y(B,`YOUR GAME · ${e.season.view?.label??""??""}`),y(E,`Week slot ${$??""} of ${W??""} · ${e.season.finished?"season finished":e.season.atLastPlayed?"you are at the latest played week":"reviewing an earlier week"}`)},[()=>e.season.userTeamName.toUpperCase(),()=>jn(e.season.slot),()=>jn(e.season.total)]),on("click",G,()=>e.onweek(e.season.slot)),on("click",A,function(...z){e.onstandings?.apply(this,z)}),on("click",J,function(...z){e.onbracket?.apply(this,z)}),on("click",N,function(...z){e.onbook?.apply(this,z)}),L(f,d)};en(o,f=>{c(a)==="none"?f(l):f(i,-1)})}K(()=>fn(r,"data-phase",c(a))),L(n,r),En()}On(["click"]);var gl=M('<button class="cp-stepbtn cp-cta"> </button>'),tm=M('<button class="cp-stepbtn">WATCH THE FEED</button>'),rm=M('<p class="cp-note">No season is running — open the hub to begin one.</p>'),om=M('<span class="cp-score"> </span> <span class="cp-final">FINAL</span>',1),lm=M('<span class="cp-pending"> </span>'),im=M('<div><div class="cp-matchup"><span class="cp-abbr"> </span> <!></div> <p class="cp-sub cp-gs"> </p></div>'),cm=M('<p class="cp-note">No games this slot.</p>'),fm=M('<div class="cp-grid"></div> <!>',1),dm=M('<section class="cp-week"><div class="cp-stepper"><button class="cp-stepbtn">‹ PREV</button> <span class="cp-weeklabel"> </span> <button class="cp-stepbtn">NEXT ›</button> <span class="cp-sub"> </span> <!> <!> <button class="cp-stepbtn">SAVE</button></div> <!></section>');function um(n,e){Rn(e,!0);let a=ln(()=>e.season.view),s=ln(()=>c(a)?.games.find(C=>C.home===e.season.userTeamName||C.away===e.season.userTeamName)??null);var t=dm(),r=P(t),o=P(r),l=m(o,2),i=k(l,!0),f=m(l,2),d=m(f,2),u=k(d),h=m(d,2);{var p=C=>{var E=gl(),F=k(E);K(()=>y(F,`PLAY WEEK ${e.season.slot??""}`)),on("click",E,function(...G){e.onplay?.apply(this,G)}),L(C,E)},v=C=>{var E=gl(),F=k(E);K(()=>y(F,`STEP TO WEEK ${e.season.slot+1}`)),on("click",E,function(...G){e.onplay?.apply(this,G)}),L(C,E)};en(h,C=>{c(s)&&c(s).hs===null?C(p):e.season.atLastPlayed&&!e.season.finished&&C(v,1)})}var g=m(h,2);{var B=C=>{var E=tm();on("click",E,()=>e.onfeed(c(s).home)),L(C,E)};en(g,C=>{c(s)&&c(s).hs!==null&&C(B)})}var T=m(g,2),S=m(r,2);{var w=C=>{var E=rm();L(C,E)},D=C=>{var E=fm(),F=Dn(E);hn(F,21,()=>c(a).games,J=>J.replayLabel,(J,N)=>{var O=im();let Z;var U=P(O),X=P(U),an=k(X,!0),sn=m(X,2);{var z=Y=>{var b=om(),_=Dn(b),x=k(_);K(()=>y(x,`${c(N).as??""} — ${c(N).hs??""}`)),L(Y,b)},$=Y=>{var b=lm(),_=k(b);K(()=>y(_,`@ ${c(N).homeAbbr??""} · not yet played`)),L(Y,b)};en(sn,Y=>{c(N).hs!==null?Y(z):Y($,-1)})}var W=m(U,2),I=k(W);K(Y=>{Z=Nn(O,1,"cp-gamecard",null,Z,{"cp-megame":c(N).home===e.season.userTeamName||c(N).away===e.season.userTeamName}),y(an,c(N).awayAbbr),y(I,`gameSeed ${Y??""}${c(N).round?" · "+c(N).round:""}`)},[()=>jn(c(N).gameSeed)]),L(J,O)});var G=m(F,2);{var A=J=>{var N=cm();L(J,N)};en(G,J=>{c(a).games.length===0&&J(A)})}L(C,E)};en(S,C=>{c(a)?C(D,-1):C(w)})}K((C,E)=>{o.disabled=e.season.slot<=1,y(i,e.season.label),f.disabled=e.season.slot>=e.season.total,y(u,`week slot ${C??""} / ${E??""}`)},[()=>jn(e.season.slot),()=>jn(e.season.total)]),on("click",o,()=>Wn.prev()),on("click",f,()=>Wn.next()),on("click",T,function(...C){e.onsave?.apply(this,C)}),L(n,t),En()}On(["click"]);var pm=M('<p class="cp-note">No season is running — the standings arrive with it.</p>'),hm=M('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),vm=M('<div class="cp-panel cp-stdiv"><h3 class="cp-h3"> </h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th><th class="num">PCT</th><th class="num">SEED</th></tr></thead><tbody></tbody></table></div>'),mm=M('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),gm=M('<h2 class="cp-h2"> </h2> <div class="cp-stdivs svelte-1z0ye32"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table></div> <div class="cp-chipline"><button class="cp-stepbtn cp-cta">THE PLAYOFF PICTURE</button></div>',1),Bm=M('<section class="cp-st"><!></section>');function Cm(n,e){Rn(e,!0);let a=ln(()=>e.season.standings);var s=Bm(),t=P(s);{var r=l=>{var i=pm();L(l,i)},o=l=>{var i=gm(),f=Dn(i),d=k(f),u=m(f,2);hn(u,21,()=>c(a).divisions,T=>T.conf+T.div,(T,S)=>{var w=vm(),D=P(w),C=k(D),E=m(D,2),F=m(P(E));hn(F,21,()=>c(S).rows,G=>G.team,(G,A)=>{var J=hm();let N;var O=P(J),Z=k(O),U=m(O),X=k(U,!0),an=m(U),sn=k(an,!0),z=m(an),$=k(z,!0),W=m(z),I=k(W,!0),Y=m(W),b=k(Y,!0),_=m(Y),x=k(_,!0),j=m(_),tn=k(j,!0);K(dn=>{N=Nn(J,1,"",null,N,{"cp-me":c(A).team===e.season.userTeamName}),y(Z,`${dn??""} ${c(A).team??""}`),y(X,c(A).w),y(sn,c(A).l),y($,c(A).t),y(I,c(A).pf),y(b,c(A).pa),y(x,c(A).winPct),y(tn,c(A).seed??"—")},[()=>Pn(c(A).team)]),L(G,J)}),K(()=>y(C,`${c(S).conf??""} ${c(S).div??""}`)),L(T,w)});var h=m(u,2),p=m(P(h),2),v=m(P(p));hn(v,23,()=>c(a).league,T=>T.team,(T,S,w)=>{var D=mm();let C;var E=P(D),F=k(E,!0),G=m(E),A=k(G),J=m(G),N=k(J,!0),O=m(J),Z=k(O,!0),U=m(O),X=k(U,!0),an=m(U),sn=k(an,!0),z=m(an),$=k(z,!0);K(W=>{C=Nn(D,1,"",null,C,{"cp-me":c(S).team===e.season.userTeamName}),y(F,c(w)+1),y(A,`${W??""} ${c(S).team??""}`),y(N,c(S).w),y(Z,c(S).l),y(X,c(S).t),y(sn,c(S).pf),y($,c(S).pa)},[()=>Pn(c(S).team)]),L(T,D)});var g=m(h,2),B=k(g);K(T=>y(d,`STANDINGS · THROUGH ${T??""}`),[()=>c(a).throughWeek===18?"WEEK 18":"WEEK "+jn(c(a).throughWeek)]),on("click",B,function(...T){e.onbracket?.apply(this,T)}),L(l,i)};en(t,l=>{c(a)?l(o,-1):l(r)})}L(n,s),En()}On(["click"]);const ym={"Wild Card":"WILD CARD",Divisional:"DIVISIONAL",Conference:"CONFERENCE","Super Bowl":"SUPER BOWL"},Tm=["Wild Card","Divisional","Conference","Super Bowl"],Sm=(n,e,a)=>{if(e==="Wild Card"){if(!a)return[];const t=[];for(const r of["AFC","NFC"]){const o=a.seeds[r];for(const[l,i]of[[2,7],[3,6],[4,5]])t.push([o[l-1],o[i-1]])}return t}const s=n.playoffs.filter(t=>t.round===e);if(s.length===0){const t=(r,o)=>n.playoffs.filter(l=>l.round===r&&(a?.seeds[o].includes(l.home)??!1)).map(l=>l.hs>l.as?l.home:l.away);if(e==="Divisional"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=d=>l.indexOf(d)+1,f=[l[0],...t("Wild Card",o)].sort((d,u)=>i(d)-i(u));f.length===4&&r.push([f[0],f[3]],[f[1],f[2]])}return r}if(e==="Conference"&&a){const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=d=>l.indexOf(d)+1,f=t("Divisional",o).sort((d,u)=>i(d)-i(u));f.length===2&&r.push([f[0],f[1]])}return r}if(e==="Super Bowl"){const r=["AFC","NFC"].map(o=>t("Conference",o)[0]).filter(Boolean);if(r.length===2)return[[r[0],r[1]]]}return[]}return s.map(t=>[t.home,t.away])};function km(n,e){const a=n.seeding,s=r=>(a?.seeds[r]??[]).map((o,l)=>({seed:l+1,team:o,abbr:Pn(o),me:o===e})),t=Tm.map(r=>{const o=Sm(n,r,a??null),l=n.playoffs.filter(f=>f.round===r),i=o.length===0?"pending":l.length===o.length?"played":"ready";return{round:r,label:ym[r],state:i,pairs:o.map(([f,d])=>{const u=l.find(h=>h.home===f&&h.away===d);return{home:f,away:d,homeAbbr:Pn(f),awayAbbr:Pn(d),hs:u?u.hs:null,as:u?u.as:null,winner:u?u.hs>u.as?f:u.as>u.hs?d:null:null,gameSeed:0}})}});return{seeded:!!a,seeds:{AFC:s("AFC"),NFC:s("NFC")},rounds:t,champion:n.champion,championAbbr:n.champion?Pn(n.champion):null}}var wm=M('<p class="cp-note">No season is running — the bracket arrives with it.</p>'),Dm=M(`<p class="cp-note">The field is set after week 18. Keep stepping the season — the bracket fills itself from the engine's seeding.</p>`),bm=M("<span> </span>"),Rm=M("<li> </li>"),Em=M('<h3 class="cp-h3"> </h3> <div class="cp-seeds svelte-1f06r09"></div> <ul class="cp-seedwhy"></ul>',1),Lm=M('<div class="cp-panel"></div>'),Am=M(`<p class="cp-sub">Pending — the round's pairs derive from the round before it.</p>`),Mm=M('<span class="cp-score"> </span> <span class="cp-final"> </span>',1),Jm=M('<span class="cp-pending">VS · not yet played</span>'),_m=M('<div class="cp-matchup cp-brpair svelte-1f06r09"><span class="cp-abbr"> </span> <!> <span class="cp-abbr"> </span></div>'),Fm=M('<div class="cp-brackround"><h3> </h3> <!></div>'),Wm=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Pm=M('<h2 class="cp-h2">THE PLAYOFFS</h2> <!> <div class="cp-bracket-list svelte-1f06r09"></div> <!>',1),Gm=M('<section class="cp-bracket"><!></section>');function Nm(n,e){Rn(e,!0);let a=ln(()=>e.season.runState?km(e.season.runState,e.season.userTeamName):null),s=ln(()=>e.season.standings);function t(f,d,u){const h=c(s)?.league??[],p=h.find(g=>g.abbr===d);if(!p||p.seed===null)return`seed ${f} — the standings row is not on record yet`;const v=h.filter(g=>g.conf===u).reduce((g,B)=>(g.findIndex(S=>h.find(w=>w.team===S)?.div===B.div)===-1&&g.push(B.team),g),[]);return Rv(p,h,v)}var r=Gm(),o=P(r);{var l=f=>{var d=wm();L(f,d)},i=f=>{var d=Pm(),u=m(Dn(d),2);{var h=T=>{var S=Dm();L(T,S)},p=T=>{var S=Lm();hn(S,20,()=>["AFC","NFC"],w=>w,(w,D)=>{var C=Em(),E=Dn(C),F=k(E),G=m(E,2);hn(G,21,()=>c(a).seeds[D],J=>J.seed,(J,N)=>{var O=bm();let Z;var U=k(O);K(X=>{Z=Nn(O,1,"cp-seedrow svelte-1f06r09",null,Z,{"cp-meseed":c(N).me}),fn(O,"title",X),y(U,`${c(N).seed??""}. ${c(N).abbr??""}`)},[()=>t(c(N).seed,c(N).abbr,D)]),L(J,O)});var A=m(G,2);hn(A,21,()=>c(a).seeds[D],J=>J.seed,(J,N)=>{var O=Rm(),Z=k(O,!0);K(U=>y(Z,U),[()=>t(c(N).seed,c(N).abbr,D)]),L(J,O)}),K(()=>y(F,`${D??""} FIELD`)),L(w,C)}),L(T,S)};en(u,T=>{c(a).seeded?T(p,-1):T(h)})}var v=m(u,2);hn(v,21,()=>c(a).rounds,T=>T.round,(T,S)=>{var w=Fm(),D=P(w),C=k(D,!0),E=m(D,2);{var F=A=>{var J=Am();L(A,J)},G=A=>{var J=fi(),N=Dn(J);hn(N,17,()=>c(S).pairs,O=>O.home+O.away,(O,Z)=>{var U=_m(),X=P(U),an=k(X,!0),sn=m(X,2);{var z=Y=>{var b=Mm(),_=Dn(b),x=k(_),j=m(_,2),tn=k(j);K(dn=>{y(x,`${c(Z).as??""} — ${c(Z).hs??""}`),y(tn,`FINAL · ${dn??""}`)},[()=>c(Z).winner?c(Z).winner.toUpperCase():""]),L(Y,b)},$=Y=>{var b=Jm();L(Y,b)};en(sn,Y=>{c(Z).hs!==null?Y(z):Y($,-1)})}var W=m(sn,2),I=k(W,!0);K(()=>{y(an,c(Z).awayAbbr),y(I,c(Z).homeAbbr)}),L(O,U)}),L(A,J)};en(E,A=>{c(S).pairs.length===0?A(F):A(G,-1)})}K(()=>{fn(w,"data-state",c(S).state),y(C,c(S).label)}),L(T,w)});var g=m(v,2);{var B=T=>{var S=Wm(),w=P(S),D=k(w),C=m(w,2);K(E=>y(D,`${E??""} · SUPER BOWL CHAMPIONS`),[()=>c(a).champion.toUpperCase()]),on("click",C,function(...E){e.onreview?.apply(this,E)}),L(T,S)};en(g,T=>{c(a).champion&&T(B)})}L(f,d)};en(o,f=>{c(a)?f(i,-1):f(l)})}L(n,r),En()}On(["click"]);var Im=M('<p class="cp-note">No season yet — the book opens when one has been played.</p>'),Hm=M('<div class="cp-champbanner"><div class="champ"> </div> <button class="cp-stepbtn cp-cta">THE SEASON REVIEW</button></div>'),Km=M('<div class="cp-revline"><span class="per"> </span> <span class="cp-abbr"> </span> <span class="cp-score"> </span> <span class="cp-abbr"> </span> <button class="cp-stepbtn">REPLAY FEED</button></div>'),xm=M('<p class="cp-sub">The playoffs have not been played yet.</p>'),Om=M('<div class="cp-pcard"><div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div></div>'),Vm=M('<div class="cp-cardgrid"></div>'),Ym=M(`<p class="cp-sub">The champion's draft class rides the finished draft.</p>`),zm=M('<tr><td> </td><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),Qm=M('<div class="cp-panel"><h3 class="cp-h3">FINAL STANDINGS</h3> <table class="cp-table"><thead><tr><th>#</th><th>TEAM</th><th class="num">W</th><th class="num">L</th><th class="num">T</th><th class="num">PF</th><th class="num">PA</th></tr></thead><tbody></tbody></table> <p class="cp-sub">Top 10 shown; the full table lives on Standings.</p></div>'),Um=M(`<!> <div class="cp-panel"><h3 class="cp-h3">REPLAYABLE PLAYOFF GAMES</h3> <!></div> <div class="cp-panel"><h3 class="cp-h3">THE CHAMPION'S ROSTER</h3> <!></div> <!>`,1),jm=M('<section class="cp-book"><h2 class="cp-h2"> </h2> <!></section>');function qm(n,e){Rn(e,!0);let a=ln(()=>{const f=e.draftRecord;if(!f||!e.season.champion)return[];const d=Vr(f.pool),u=new Map(d.map(p=>[p.id,p])),h=wn.findIndex(p=>p.name===e.season.champion);return h<0?[]:f.picks.filter(p=>p.team===h).map(p=>u.get(p.pid)).filter(Boolean)});var s=jm(),t=P(s),r=k(t),o=m(t,2);{var l=f=>{var d=Im();L(f,d)},i=f=>{var d=Um(),u=Dn(d);{var h=C=>{var E=Hm(),F=P(E),G=k(F),A=m(F,2);K(J=>y(G,`${J??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),on("click",A,function(...J){e.onreview?.apply(this,J)}),L(C,E)};en(u,C=>{e.season.champion&&C(h)})}var p=m(u,2),v=m(P(p),2);hn(v,17,()=>e.season.runState?.playoffs??[],C=>C.week+C.home,(C,E)=>{var F=Km(),G=P(F),A=k(G,!0),J=m(G,2),N=k(J,!0),O=m(J,2),Z=k(O),U=m(O,2),X=k(U,!0),an=m(U,2);K((sn,z,$)=>{y(A,sn),y(N,z),y(Z,`${c(E).as??""} — ${c(E).hs??""}`),y(X,$)},[()=>c(E).round?.toUpperCase(),()=>Pn(c(E).away),()=>Pn(c(E).home)]),on("click",an,()=>e.onfeed(c(E).home)),L(C,F)},C=>{var E=xm();L(C,E)});var g=m(p,2),B=m(P(g),2);{var T=C=>{var E=Vm();hn(E,23,()=>c(a),F=>F.id,(F,G,A)=>{var J=Om(),N=P(J),O=k(N,!0),Z=m(N,2),U=k(Z,!0),X=m(Z,2),an=k(X);K((sn,z,$)=>{y(O,sn),y(U,c(G).name),y(an,`${c(G).pos??""} · ${c(G).team??""} · OVR ${z??""} · pick ${$??""}`)},[()=>c(G).name.split(/\s+/).slice(0,2).map(sn=>sn[0]).join(""),()=>jn(c(G).ovr),()=>jn(c(A)+1)]),L(F,J)}),L(C,E)},S=C=>{var E=Ym();L(C,E)};en(B,C=>{c(a).length?C(T):C(S,-1)})}var w=m(g,2);{var D=C=>{var E=Qm(),F=m(P(E),2),G=m(P(F));hn(G,23,()=>e.season.standings.league.slice(0,10),A=>A.team,(A,J,N)=>{var O=zm();let Z;var U=P(O),X=k(U,!0),an=m(U),sn=k(an),z=m(an),$=k(z,!0),W=m(z),I=k(W,!0),Y=m(W),b=k(Y,!0),_=m(Y),x=k(_,!0),j=m(_),tn=k(j,!0);K(dn=>{Z=Nn(O,1,"",null,Z,{"cp-me":c(J).team===e.season.userTeamName}),y(X,c(N)+1),y(sn,`${dn??""} ${c(J).team??""}`),y($,c(J).w),y(I,c(J).l),y(b,c(J).t),y(x,c(J).pf),y(tn,c(J).pa)},[()=>Pn(c(J).team)]),L(A,O)}),L(C,E)};en(w,C=>{e.season.standings&&C(D)})}L(f,d)};en(o,f=>{e.season.ready?f(i,-1):f(l)})}K(f=>y(r,`THE SEASON BOOK${f??""}`),[()=>e.season.champion?` · ${e.season.champion.toUpperCase()}`:""]),L(n,s),En()}On(["click"]);const Bl={MVP:"MOST VALUABLE PLAYER",OPOY:"OFFENSIVE PLAYER OF THE YEAR",DPOY:"DEFENSIVE PLAYER OF THE YEAR",COACH:"COACH OF THE YEAR"},Cl={pyd:"PASSING YARDS",ptd:"PASSING TD",ryd:"RUSHING YARDS",rtd:"RUSHING TD",recYd:"RECEIVING YARDS",rec:"RECEPTIONS",recTd:"RECEIVING TD",sack:"SACKS",intDef:"INTERCEPTIONS",tkl:"TACKLES",ff:"FORCED FUMBLES",fgm:"FIELD GOALS",defTd:"DEFENSIVE TD"},Zm={pyd:"pyd",ptd:"ptd",ryd:"ryd",rtd:"rtd",recYd:"recYd",rec:"rec",recTd:"recTd",sack:"sack",intDef:"intDef",tkl:"tkl",ff:"ff",fgm:"fgm",defTd:"defTd"},yl=(n,e)=>{const a=n[e];return a?`${a.w}-${a.l}${a.t?"-"+a.t:""}`:""};function Xm(n,e){const a=Hu(n,e),s=(o,l)=>l&&{key:o,name:Bl[o]??o,winner:l.name,line:`${l.label} · ${Object.entries(l.stats).filter(([,i])=>i>0).slice(0,3).map(([i,f])=>`${i} ${f}`).join(", ")}`,team:l.team,teamAbbr:Pn(l.team),teamWins:yl(e,l.team),shimmer:!1}||null,t=[];for(const[o,l]of[["MVP",a.mvp],["OPOY",a.opoy],["DPOY",a.dpoy]]){const i=s(o,l);i&&t.push(i)}a.coach&&t.push({key:"COACH",name:Bl.COACH,winner:a.coach.team,line:`${_s("wins",a.coach.over)} over expected`,team:a.coach.team,teamAbbr:Pn(a.coach.team),teamWins:yl(e,a.coach.team),shimmer:!1});const r=tc.filter(o=>Cl[o]).map(o=>({key:o,label:Cl[o],rows:Ur(n,o,5).map(l=>({name:l.name,team:l.team,abbr:Pn(l.team),value:String(l.stats[Zm[o]??o]??0)}))}));return{regular:t,leaders:r}}var $m=M('<p class="cp-note">No season statistics yet — the awards are computed from the games the engine plays, never promised in advance.</p>'),n1=M('<div class="cp-award"><div class="aname"> </div> <div> </div> <div class="cp-sub"> </div> <div class="cp-sub"> </div></div>'),e1=M('<p class="cp-sub">The winners arrive with the finished season.</p>'),a1=M('<div class="cp-lrow svelte-1yazvx7"><span class="cp-lrank svelte-1yazvx7"> </span> <span class="cp-lteam svelte-1yazvx7"> </span> <b class="cp-lval svelte-1yazvx7"> </b></div>'),s1=M('<div class="cp-leadercol"><h4 class="cp-lh svelte-1yazvx7"> </h4> <!></div>'),t1=M('<div class="cp-awards-grid svelte-1yazvx7"></div> <div class="cp-panel"><h3 class="cp-h3">THE LEAGUE LEADERS</h3> <div class="cp-leadercols svelte-1yazvx7"></div></div>',1),r1=M('<section class="cp-awards"><h2 class="cp-h2">THE AWARDS</h2> <!></section>');function o1(n,e){Rn(e,!0);let a=ln(()=>e.stats&&e.table?Xm(e.stats,e.table):null);var s=r1(),t=m(P(s),2);{var r=l=>{var i=$m();L(l,i)},o=l=>{var i=t1(),f=Dn(i);hn(f,21,()=>c(a).regular,h=>h.key,(h,p)=>{var v=n1(),g=P(v),B=k(g,!0),T=m(g,2);let S;var w=k(T,!0),D=m(T,2),C=k(D,!0),E=m(D,2),F=k(E);K(()=>{y(B,c(p).name),S=Nn(T,1,"awinner",null,S,{"cp-shimmer90":c(p).shimmer}),y(w,c(p).winner),y(C,c(p).line),y(F,`${c(p).teamAbbr??""} · ${c(p).teamWins??""}`)}),L(h,v)},h=>{var p=e1();L(h,p)});var d=m(f,2),u=m(P(d),2);hn(u,21,()=>c(a).leaders,h=>h.key,(h,p)=>{var v=s1(),g=P(v),B=k(g,!0),T=m(g,2);hn(T,19,()=>c(p).rows,S=>S.name,(S,w,D)=>{var C=a1(),E=P(C),F=k(E,!0),G=m(E),A=m(G),J=k(A),N=m(A,2),O=k(N,!0);K(()=>{y(F,c(D)+1),y(G,` ${c(w).name??""} `),y(J,`(${c(w).abbr??""})`),y(O,c(w).value)}),L(S,C)}),K(()=>y(B,c(p).label)),L(h,v)}),L(l,i)};en(t,l=>{c(a)?l(o,-1):l(r)})}L(n,s),En()}const Tl={"missed-playoffs":"The season ended in week 18 — the playoffs went on without you.","wild-card":"Your season ended in the Wild Card round.",divisional:"Your season ended in the Divisional round.",conference:"Your season ended in the Conference championship.","super-bowl-loss":"You reached the Super Bowl and fell one game short.",champion:"You won the Super Bowl."};function l1(n,e){const a=Fs(n),s=[...n.scores,...n.playoffs].filter(l=>l.home===e||l.away===e),t=a[e]??{w:0,l:0,t:0,pf:0,pa:0},r=s.filter(l=>l.round).map(l=>l.round).pop(),o=n.champion===e?"champion":r??"missed-playoffs";return{year:n.year,userTeam:e,userAbbr:Pn(e),outcome:Tl[o]??Tl["missed-playoffs"],w:t.w,l:t.l,t:t.t,pf:t.pf,pa:t.pa,gamesPlayed:s.length,champion:n.champion??"",championAbbr:n.champion?Pn(n.champion):"",userMadePlayoffs:!!r,highlightLines:[`You played ${s.length} games and went ${t.w}-${t.l}${t.t?"-"+t.t:""}.`,`Your team scored ${t.pf} points and allowed ${t.pa}.`,n.champion?`The season's champion: ${n.champion}.`:"The season is not finished yet."]}}var i1=M('<p class="cp-note">No season to review yet — the review arrives with the run.</p>'),c1=M('<div class="cp-champbanner"><div class="champ"> </div></div>'),f1=M('<div class="cp-chipstat"><b> </b><span>TIES</span></div>'),d1=M('<p class="cp-revsummary svelte-1vfenj1"> </p>'),u1=M('<h2 class="cp-h2"> </h2> <!> <div class="cp-chipline"><div class="cp-chipstat"><b> </b><span>WINS</span></div> <div class="cp-chipstat"><b> </b><span>LOSSES</span></div> <!> <div class="cp-chipstat"><b> </b><span>POINTS FOR</span></div> <div class="cp-chipstat"><b> </b><span>POINTS AGAINST</span></div> <div class="cp-chipstat"><b> </b><span>GAMES PLAYED</span></div></div> <div class="cp-panel cp-guide"><p class="cp-done-sub"> </p> <!></div> <div class="cp-chipline"><button class="cp-stepbtn">THE BRACKET</button> <button class="cp-stepbtn">THE AWARDS</button> <button class="cp-stepbtn cp-cta">THE SEASON BOOK</button></div>',1),p1=M('<section class="cp-sreview"><!></section>');function h1(n,e){Rn(e,!0);let a=ln(()=>e.season.runState?l1(e.season.runState,e.season.userTeamName):null);var s=p1(),t=P(s);{var r=l=>{var i=i1();L(l,i)},o=l=>{var i=u1(),f=Dn(i),d=k(f),u=m(f,2);{var h=b=>{var _=c1(),x=P(_),j=k(x);K(tn=>y(j,`${tn??""} · SUPER BOWL CHAMPIONS`),[()=>e.season.champion.toUpperCase()]),L(b,_)};en(u,b=>{e.season.champion&&b(h)})}var p=m(u,2),v=P(p),g=P(v),B=k(g,!0),T=m(v,2),S=P(T),w=k(S,!0),D=m(T,2);{var C=b=>{var _=f1(),x=P(_),j=k(x,!0);K(()=>y(j,c(a).t)),L(b,_)};en(D,b=>{c(a).t&&b(C)})}var E=m(D,2),F=P(E),G=k(F,!0),A=m(E,2),J=P(A),N=k(J,!0),O=m(A,2),Z=P(O),U=k(Z,!0),X=m(p,2),an=P(X),sn=k(an,!0),z=m(an,2);hn(z,16,()=>c(a).highlightLines,b=>b,(b,_)=>{var x=d1(),j=k(x,!0);K(()=>y(j,_)),L(b,x)});var $=m(X,2),W=P($),I=m(W,2),Y=m(I,2);K((b,_,x)=>{y(d,`THE SEASON REVIEW · ${c(a).userAbbr??""} ${b??""}`),y(B,c(a).w),y(w,c(a).l),y(G,_),y(N,x),y(U,c(a).gamesPlayed),y(sn,c(a).outcome)},[()=>e.season.userTeamName.toUpperCase(),()=>jn(c(a).pf),()=>jn(c(a).pa)]),on("click",W,function(...b){e.onbracket?.apply(this,b)}),on("click",I,function(...b){e.onawards?.apply(this,b)}),on("click",Y,function(...b){e.onbook?.apply(this,b)}),L(l,i)};en(t,l=>{c(a)?l(o,-1):l(r)})}L(n,s),En()}On(["click"]);If();var v1=M(`<section class="cp-guide"><h2 class="cp-h2">HOW THIS WORKS</h2> <p class="cp-cygline"><span class="cp-cygt">Can you go</span><b class="cp-shine">20-0</b><b class="cp-shine" style="font-size:1.1em;">?</b></p> <p class="cp-note">76 Pancakes is a draft simulator: you draft real players for one of the 32 teams, the other 31 teams draft against you, and then the engine plays a full 22-week season — every game, every drive — from the rosters the draft produced. Nothing on any screen is a promise; every number is a measured value the engine computed.</p> <dl><dt>THE DRAFT</dt> <dd>32 teams, 32 rounds, one pick per slot. Your board shows the players you can still take; the CPU teams pick by the engine's own policy while you are not on the clock. You may draft a player into any slot he legally fits — a flex cost applies when he plays out of position, and the cost is the engine's own table, shown as "−N flex".</dd> <dt>THE NUMBERS (Wins · Priority · OVR)</dt> <dd><b>Wins</b> <b>Priority</b> is Wins divided by the gone odds — the value of taking him right now. <b>OVR</b> is the player's overall rating. Only these three ride the board; integers everywhere except Wins and Priority, which print one decimal.</dd> <dt>GONE%</dt> <dd>The chance the player is drafted between now and your next pick. The method, in plain words: the engine simulates the CPU draft from this point 30 times and counts how often each player is gone when your turn returns. Hover the column to see the exact counts.</dd> <dt>VALUATION MODES</dt> <dd>Every number carries a label: <b> </b> (the engine's measured default), <b> </b>, or <b> </b>. One mode at a time, never blended; the label travels with the numbers everywhere they appear; the switch locks the moment a draft starts.</dd> <dt>THE SEASON</dt> <dd>The finished rosters become 32 rated teams (the engine builds each team's lineup and rates it — no ratings are invented here). The engine builds the schedule, plays every game week by week through its drive generator, seeds the playoffs after week 18, and plays Wild Card → Divisional → Conference → Super Bowl. Each game's result is a fixed derivation of the season seed and the matchup: the same draft and seed always replay the same game, and the gameSeed stamp on every card proves it.</dd> <dt>THE FEED AND THE RECAP</dt> <dd>The feed is the play-by-play of the user's game, drive by drive, with running scores and lead-change marks. The recap names every score, every turnover and every star in plain informative lines. Overtime events appear in the overtime block; the words "expected scoring" and "sudden death" never appear anywhere in this product. There are no injuries in any sport, ever.</dd> <dt>SAVES</dt> <dd>One save blob per slot, version-checked on every read. A corrupt save is refused and shown verbatim — never repaired, never silently replaced. A save written by a newer build is refused with its version named.</dd> <dt>OFFLINE</dt> <dd>The fonts are bundled in the app (Cinzel, inlined — never loaded from Google's servers). The whole product runs from a single file on disk with no network. Shareable cards export as one self-contained file each.</dd> <dt>BUILD</dt> <dd> </dd></dl></section>`);function m1(n,e){Rn(e,!1),Pd();var a=v1(),s=m(P(a),6),t=m(P(s),6),r=m(P(t));r.nodeValue=" is the model's estimate of how many wins a player adds — the engine's weight-OVR units carried to wins (one number, one decimal). ";var o=m(t,8),l=m(P(o)),i=k(l,!0),f=m(l,2),d=k(f,!0),u=m(f,2),h=k(u,!0),p=m(o,20),v=k(p);K(g=>{y(i,_e.measured),y(d,_e.balance),y(h,_e.owner),y(v,`Engine stamp ${g??""} — the frozen snapshot this shell consumes byte-identically. The engine's own test suite runs in this tree; the shell's battery laws run against the built app.`)},[()=>ta()]),L(n,a),En()}const g1=n=>n.split(/\s+/).filter(Boolean).slice(0,2).map(e=>e[0].toUpperCase()).join("");function B1(n){return{cards:n.rows.map(a=>({id:a.id,name:a.name,pos:a.pos,nflTeam:a.nflTeam,ovr:a.ovr,wins:a.wins,priority:a.priority,slotId:a.slotId,slotLabel:a.slotLabel,tone:a.tone,alsoFits:a.alsoFits.map(s=>s.slotLabel+(s.flex?" ("+s.flex+")":"")),monogram:g1(a.name),arrow:a.tone==="good"?"up":a.tone==="bad"?"down":"flat"})),teamName:n.header.teamName,overall:n.header.overall,totalPicks:n.header.totalPicks,onClock:n.header.onClock,count:n.footer.text}}var C1=M(`<p class="cp-note">No board yet — the cards re-render the board's own rows, so a draft has to exist first.</p>`),y1=M('<div class="pmeta cp-fitsline"> </div>'),T1=M('<div class="cp-pcard"><span title="form"> </span> <div class="mono"> </div> <div class="pname"> </div> <div class="pmeta"> </div> <div class="pnum"><div><b> </b><span>WINS</span></div> <div><b> </b><span>PRIORITY</span></div> <div><b> </b><span>OVR</span></div></div> <!></div>'),S1=M('<p class="cp-sub"> </p> <div class="cp-cardgrid"></div> <p class="cp-prov">Every number on these cards reads <b> </b> </p>',1),k1=M('<section class="cp-cards"><h2 class="cp-h2"> </h2> <!></section>');function w1(n,e){Rn(e,!0);let a=ln(()=>e.vm?B1(e.vm):null);var s=k1(),t=P(s),r=k(t),o=m(t,2);{var l=f=>{var d=C1();L(f,d)},i=f=>{var d=S1(),u=Dn(d),h=k(u,!0),p=m(u,2);hn(p,21,()=>c(a).cards,S=>S.id,(S,w)=>{var D=T1(),C=P(D),E=k(C,!0),F=m(C,2),G=k(F,!0),A=m(F,2),J=k(A,!0),N=m(A,2),O=k(N),Z=m(N,2),U=P(Z),X=P(U),an=k(X,!0),sn=m(U,2),z=P(sn),$=k(z,!0),W=m(sn,2),I=P(W),Y=k(I,!0),b=m(Z,2);{var _=x=>{var j=y1(),tn=k(j,!0);K(dn=>y(tn,dn),[()=>c(w).alsoFits.join(" · ")]),L(x,j)};en(b,x=>{c(w).alsoFits.length&&x(_)})}K(()=>{fn(D,"data-tone",c(w).tone),Nn(C,1,`cp-arrow ${c(w).arrow??""}`),y(E,c(w).arrow==="up"?"▲":c(w).arrow==="down"?"▼":"—"),y(G,c(w).monogram),y(J,c(w).name),y(O,`${c(w).pos??""} · ${c(w).nflTeam??""} · fills ${c(w).slotLabel??""}`),y(an,c(w).wins),y($,c(w).priority),y(Y,c(w).ovr)}),L(S,D)});var v=m(p,2),g=m(P(v)),B=k(g,!0),T=m(g);K(S=>{y(h,c(a).onClock),y(B,S),y(T,` — the label travels with the numbers. ${c(a).count??""}.`)},[()=>_e[ie.get().mode]]),L(f,d)};en(o,f=>{c(a)?f(i,-1):f(l)})}K(()=>y(r,`PLAYER CARDS${c(a)?` · ${c(a).teamName}`:""}`)),L(n,s),En()}var D1=M('<p class="cp-note">No season statistics yet — the stats accumulate from the games the engine plays.</p>'),b1=M('<span class="cp-statp svelte-1y9sotg"> <b class="svelte-1y9sotg"> </b></span>'),R1=M('<span class="cp-statp cp-none svelte-1y9sotg">—</span>'),E1=M('<div class="cp-statrow svelte-1y9sotg"><span class="cp-statl svelte-1y9sotg"> </span> <!></div>'),L1=M('<tr><td> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td><td class="num"> </td></tr>'),A1=M(`<div class="cp-panel"><h3 class="cp-h3">THE 32 TEAMS' ENGINE RATINGS</h3> <table class="cp-table"><thead><tr><th>TEAM</th><th class="num">OFF</th><th class="num">DEF</th><th class="num">PASS</th><th class="num">RUN</th><th class="num">RUSH D</th><th class="num">COV</th><th class="num">W</th><th class="num">L</th><th class="num">T</th></tr></thead><tbody></tbody></table> <p class="cp-sub">OFF/DEF are the engine's net points vs the league baseline (Wins units, one decimal); the rest are the engine's raw rating axes.</p></div>`),M1=M(`<p class="cp-note cp-standin svelte-1y9sotg">STAND-IN: gravity and double-teams are formally measured in the live site's model, not yet by the pinned engine — filed §5 to the Architect. Everything below IS the engine's own output.</p> <div class="cp-panel"><h3 class="cp-h3">THE SEASON LINES (LEAGUE LEADERS)</h3> <!></div> <!>`,1),J1=M('<section class="cp-stats"><h2 class="cp-h2">THE STATS</h2> <!></section>');function _1(n,e){Rn(e,!0);const a=[["pyd","PASS YD"],["ptd","PASS TD"],["ryd","RUSH YD"],["rtd","RUSH TD"],["recYd","REC YD"],["rec","REC"],["sack","SACKS"],["intDef","INT"],["tkl","TACKLES"],["fgm","FG"]];var s=J1(),t=m(P(s),2);{var r=l=>{var i=D1();L(l,i)},o=l=>{var i=M1(),f=m(Dn(i),2),d=m(P(f),2);hn(d,17,()=>a,([p,v])=>p,(p,v)=>{var g=ln(()=>of(c(v),2));let B=()=>c(g)[0],T=()=>c(g)[1];const S=ln(()=>Ur(e.stats,B(),3));var w=E1(),D=P(w),C=k(D,!0),E=m(D,2);hn(E,17,()=>c(S),F=>F.id,(F,G)=>{var A=b1(),J=P(A),N=m(J),O=k(N,!0);K(Z=>{y(J,`${c(G).name??""} `),y(O,Z)},[()=>jn(c(G).stats[B()]??0)]),L(F,A)},F=>{var G=R1();L(F,G)}),K(()=>y(C,T())),L(p,w)});var u=m(f,2);{var h=p=>{var v=A1(),g=m(P(v),2),B=m(P(g));hn(B,23,()=>wn,T=>T.name,(T,S,w)=>{const D=ln(()=>e.teams[c(w)]?.ratings),C=ln(()=>e.table[c(S).name]);var E=L1(),F=P(E),G=k(F),A=m(F),J=k(A,!0),N=m(A),O=k(N,!0),Z=m(N),U=k(Z,!0),X=m(Z),an=k(X,!0),sn=m(X),z=k(sn,!0),$=m(sn),W=k($,!0),I=m($),Y=k(I,!0),b=m(I),_=k(b,!0),x=m(b),j=k(x,!0);K((tn,dn,un,Tn,nn,rn,mn)=>{y(G,`${tn??""} ${c(S).name??""}`),y(J,dn),y(O,un),y(U,Tn),y(an,nn),y(z,rn),y(W,mn),y(Y,c(C)?.w??"—"),y(_,c(C)?.l??"—"),y(j,c(C)?.t??"—")},[()=>Pn(c(S).name),()=>c(D)?_s("wins",c(D).off):"—",()=>c(D)?_s("wins",c(D).def):"—",()=>c(D)?jn(c(D).passOff):"—",()=>c(D)?jn(c(D).runOff):"—",()=>c(D)?jn(c(D).frontRun):"—",()=>c(D)?jn(c(D).coverage):"—"]),L(T,E)}),L(p,v)};en(u,p=>{e.teams&&p(h)})}L(l,i)};en(t,l=>{!e.stats||!e.table?l(r):l(o,-1)})}L(n,s),En()}var F1=M('<section class="cp-settings"><h2 class="cp-h2">SETTINGS</h2> <div class="cp-panel"><div class="cp-setrow"><label for="set-mode">Colour mode</label> <select id="set-mode"><option>Follow the system</option><option>Light (pale rose)</option><option>Dark (plum ink)</option></select></div> <div class="cp-setrow"><label for="set-motion">Reduce motion</label> <input id="set-motion" type="checkbox"/></div> <div class="cp-setrow"><label for="set-order">Feed reading: newest first</label> <input id="set-order" type="checkbox"/></div> <div class="cp-setrow"><span class="cp-cap">Valuation mode</span> <span class="cp-sub"> </span></div></div> <div class="cp-chipline"><button class="cp-stepbtn">SAVES · SLOT A · B · C</button> <button class="cp-stepbtn">CLEAR SAVED CHOICES</button></div> <p class="cp-note">Settings persist across reload. Saves are one blob per slot, version-checked on every read — a corrupt save is refused verbatim, never repaired.</p></section>');function W1(n,e){Rn(e,!0);var a=F1(),s=m(P(a),2),t=P(s),r=m(P(t),2),o=P(r);o.value=o.__value="system";var l=m(o);l.value=l.__value="light";var i=m(l);i.value=i.__value="dark";var f;Ad(r);var d=m(t,2),u=m(P(d),2),h=m(d,2),p=m(P(h),2),v=m(h,2),g=m(P(v),2),B=k(g),T=m(s,2),S=P(T),w=m(S,2);K((D,C)=>{f!==(f=e.settings.mode)&&(r.value=(r.__value=f)??"",di(r,f)),go(u,e.settings.reducedMotion),go(p,e.settings.newestFirst),y(B,`${D??""}${C??""}`)},[()=>_e[ie.get().mode],()=>ie.get().locked?" (locked mid-draft)":""]),on("change",r,D=>e.onmode(D.currentTarget.value)),on("change",u,D=>e.onmotion(D.currentTarget.checked)),on("change",p,D=>e.onorder(D.currentTarget.checked)),on("click",S,function(...D){e.onsaves?.apply(this,D)}),on("click",w,function(...D){e.onresetsave?.apply(this,D)}),L(n,a),En()}On(["change","click"]);const P1=`
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
`;function G1(n,e){const a=n.lines.map(s=>`<p class="l">${s}</p>`).join(`
      `);return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>76 Pancakes · ${n.title}</title>
<style>
${P1}
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
`}const Fe=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function N1(n){return{stage:"draft",title:"DRAFT NIGHT",teamName:n.teamName,lines:[`I drafted the <b>${Fe(n.teamName)}</b> from slot one of the board.`,`<b>${n.picks}</b> picks in the league, <b>${n.mine}</b> of them mine.`,`Best of my class: <span class="ink">${Fe(n.bestPick)}</span> at <b>${n.bestWins}</b> wins.`],stamp:`seed ${n.seed} (code ${Mt(n.seed)}) · engine ${n.engine} · played by the pinned engine`}}function I1(n){const e=n.meHome?n.hs:n.as,a=n.meHome?n.as:n.hs,s=e>a,t=n.meHome?n.away:n.home;return{stage:"week",title:`WEEK ${n.week} BRAG`,teamName:n.teamName,lines:[`${s?"I beat":e===a?"I tied":"I fell to"} the <b>${Fe(Pn(t))} ${Fe(t)}</b> <b>${e}—${a}</b> in ${Fe(n.label)}.`,s?"The board says you called it: the run continues.":"A stumble, not an ending — the season is long."],stamp:`gameSeed ${n.gs} · week ${n.week} · ${n.away} @ ${n.home} · engine ${n.engine} · played by the pinned engine`}}function H1(n){return{stage:"season",title:"THE SEASON",teamName:n.teamName,lines:[n.iChampion?`The <b>${Fe(n.teamName)}</b> are Super Bowl champions. <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b>, <b>${n.pf}</b> points scored.`:`The <b>${n.w}-${n.l}${n.t?"-"+n.t:""}</b> season is in the book — <b>${n.pf}</b> points scored.`,n.champion&&!n.iChampion?`The year belongs to the <b>${Fe(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function K1(n){return{stage:"bracket",title:"THE RUN",teamName:n.teamName,lines:[n.iChampion?"Wild Card. Divisional. Conference. <b>Super Bowl champions.</b>":n.madeIt?`The run ended in the <b>${Fe(n.lastRound??"Wild Card")}</b>.`:"The playoffs went on without me this year.",n.champion?`The bracket crowns the <b>${Fe(n.champion)}</b>.`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function x1(n){return{stage:"awards",title:"THE AWARDS",teamName:n.teamName,lines:[`The season's Most Valuable Player: <span class="ink">${Fe(n.mvp)}</span>.`,n.mvpLine?`<span class="cp-sub">${Fe(n.mvpLine)}</span>`:""].filter(Boolean),stamp:`engine ${n.engine} · played by the pinned engine`}}function O1(n){const e=n.teamName?Cr(n.teamName).ink:"#c39a4a";return G1(n,e)}const V1={},kc=V1?.VITE_BRAG_URL??"",Y1=()=>kc!=="";function z1(n,e=kc){return`I went ${`${n.w}-${n.l}${n.t?"-"+n.t:""}`} and ${n.result} with the ${n.teamName}. Can you go 20-0?${e?" "+e:""}`}function Q1(n){return n.lines.map(e=>e.replace(/<[^>]+>/g,"")).join(`
`)}var U1=M('<button class="cp-navbtn"> </button>'),j1=M('<button class="cp-stepbtn cp-cta"> </button>'),q1=M('<p class="cp-copytoast svelte-o6jlvs" role="status" aria-live="polite"> </p>'),Z1=M('<div class="cp-sharewrap svelte-o6jlvs"><iframe class="cp-shareframe svelte-o6jlvs" title="the shareable preview"></iframe> <div class="cp-sharebtns svelte-o6jlvs"><!> <p class="cp-bragtext svelte-o6jlvs"> </p> <!></div></div>'),X1=M('<p class="cp-note">Nothing to brag about yet on this stage — play it first.</p>'),$1=M('<section class="cp-share"><h2 class="cp-h2">THE SHAREABLES</h2> <p class="cp-note">One card per stage. The share is a copy-paste brag — text only, no downloads, no files, no save data, no seed (P-209). The season brag carries the link to the live game once it ships.</p> <div class="cp-chipline"></div> <!></section>');function ng(n,e){Rn(e,!0);const a=[{id:"draft",label:"DRAFT"},{id:"week",label:"WEEK"},{id:"season",label:"SEASON"},{id:"bracket",label:"BRACKET"},{id:"awards",label:"AWARDS"}];let s=pn("draft"),t=ln(()=>{const B=ta(),T=e.record,S=e.season.userTeamName||"";if(c(s)==="draft"){if(!T)return null;const w=T.picks.filter(D=>D.team===T.userTeam).length;return N1({teamName:S,seed:T.seed,picks:T.picks.length,mine:w,bestPick:"your best draft pick",bestWins:"—",engine:B})}if(c(s)==="week"){const w=e.season.view?.games.find(D=>D.home===e.season.userTeamName||D.away===e.season.userTeamName);return!w||w.hs===null?null:I1({teamName:S,week:e.season.slot,label:e.season.label,home:w.home,away:w.away,hs:w.hs,as:w.as,meHome:w.home===e.season.userTeamName,gs:w.gameSeed,engine:B})}if(c(s)==="season"){if(!e.season.runState)return null;const w=Fs(e.season.runState)[e.season.userTeamName],D=w?.w??0,C=w?.l??0,E=w?.t??0,F=w?.pf??0;return H1({teamName:S,w:D,l:C,t:E,pf:F,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:B})}if(c(s)==="bracket"){if(!e.season.runState)return null;const w=e.season.runState.playoffs.filter(C=>C.home===e.season.userTeamName||C.away===e.season.userTeamName),D=w.length?w[w.length-1].round??null:null;return K1({teamName:S,madeIt:w.length>0,lastRound:D,champion:e.season.champion??"",iChampion:e.season.champion===e.season.userTeamName&&!!e.season.champion,engine:B})}return e.stats?x1({teamName:S,mvp:e.stats.mvp,mvpLine:e.stats.mvpLine,engine:B}):null}),r=ln(()=>c(t)?O1(c(t)):null);const o=ln(()=>{if(!e.season.runState||!e.season.userTeamName)return{w:0,l:0,t:0};const B=Fs(e.season.runState)[e.season.userTeamName];return{w:B?.w??0,l:B?.l??0,t:B?.t??0}});let l=ln(()=>{if(!c(t))return"";if(c(s)==="season"&&e.season.runState){const B=e.season.champion===e.season.userTeamName&&!!e.season.champion,T=e.season.runState.playoffs.filter(w=>w.home===e.season.userTeamName||w.away===e.season.userTeamName),S=B?"won the Super Bowl":T.length?`reached the ${T[T.length-1].round??"Wild Card"}`:"missed the playoffs";return z1({w:c(o).w,l:c(o).l,t:c(o).t,teamName:e.season.userTeamName||"",result:S})}return Q1(c(t))}),i=pn(""),f=null;async function d(){if(c(l)){try{await navigator.clipboard.writeText(c(l)),V(i,"Copied — paste it anywhere.")}catch{V(i,"Copy failed — select the text below and copy it by hand.")}f&&clearTimeout(f),f=setTimeout(()=>{V(i,"")},2600)}}var u=$1(),h=m(P(u),4);hn(h,21,()=>a,B=>B.id,(B,T)=>{var S=U1(),w=k(S,!0);K(()=>{fn(S,"aria-pressed",c(s)===c(T).id),y(w,c(T).label)}),on("click",S,()=>V(s,c(T).id,!0)),L(B,S)});var p=m(h,2);{var v=B=>{var T=Z1(),S=P(T),w=m(S,2),D=P(w);{var C=N=>{var O=j1(),Z=k(O);K(U=>y(Z,`COPY THE ${U??""} BRAG`),[()=>c(s).toUpperCase()]),on("click",O,d),L(N,O)},E=ln(()=>c(s)!=="season"||Y1());en(D,N=>{c(E)&&N(C)})}var F=m(D,2),G=k(F,!0),A=m(F,2);{var J=N=>{var O=q1(),Z=k(O,!0);K(()=>y(Z,c(i))),L(N,O)};en(A,N=>{c(i)&&N(J)})}K(()=>{fn(S,"srcdoc",c(r)),y(G,c(l))}),L(B,T)},g=B=>{var T=X1();L(B,T)};en(p,B=>{c(r)?B(v):B(g,-1)})}L(n,u),En()}On(["click"]);var eg=M('<button class="cp-navbtn"> </button>'),ag=M('<nav class="cp-nav" aria-label="Screens"></nav>'),sg=M('<p class="cp-error" role="alert"> </p>'),tg=M('<p class="cp-note">Loading…</p>'),rg=M(`<section class="cp-empty"><h1>76 Pancakes</h1> <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p> <p class="cp-note">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p> <p><a class="cp-devlink" href="?dev=1">Open the dev build →</a></p></section>`),og=M('<p class="cp-sharenotice" role="status"> </p>'),lg=M('<!> <p class="cp-prov">Every number on this shell reads <b> </b> — the label travels with the numbers.</p> <!>',1),ig=M('<p class="cp-prov">Every number on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!>',1),cg=M('<main class="cp-root svelte-1n46o8q"><header class="cp-topbar"><span class="cp-brand">76 P<strong class="cp-shine">a</strong>ncakes</span> <span class="cp-topbtns"><span class="cp-stateorigin"> </span> <span class="cp-status"> </span> <!> <button class="cp-topbar-btn">Saves</button></span></header> <!> <!> <!> <!></main>');function fg(n,e){Rn(e,!0);const a=()=>Ie(G,"$openNow",h),s=()=>Ie(x,"$settingsStore",h),t=()=>Ie(C,"$vmStore",h),r=()=>Ie(w,"$draftState",h),o=()=>Ie(tn,"$seasonStats",h),l=()=>Ie(j,"$season",h),i=()=>Ie(v,"$boot",h),f=()=>Ie(F,"$oddsMeta",h),d=()=>Ie(A,"$needsSel",h),u=()=>Ie(E,"$advice",h),[h,p]=Nd(),v=ya({phase:"loading"}),g=new URLSearchParams(location.search).has("dev"),B=ta(),T=g?F0(yo,Od,Vd):[];let S=yp(T),w=Tp(S),D="wins";const C=ya(null),E=ya([]),F=ya(null),G=ya([]),A=ya([]);let J=pn(0),N=pn(777),O=ln(()=>Mt(c(N))),Z=pn(null),U=pn("team"),X=pn(""),an=pn(!1),sn=pn(""),z=pn("fresh");const $=ln(()=>{const R=S.getState().record,Q=j.phase??"none";return Dh({picks:R?.picks?.length??0,slotsOpen:a().length,seasonPhase:Q,restoredFrom:c(z)})});let W=pn(null),I=pn(null),Y=pn("sha256:pending"),b=pn(""),_=pn("");const x=kp(),j=Sp(),tn=ya(null);let dn=null;function un(R){xp(R.mode),rl(R.teamName,R.mode),typeof document<"u"&&document.body.classList.toggle("cp-reduced",R.reducedMotion||pp()),up(R)}function Tn(R){const Q={...s(),mode:R};un(Q),x.set(Q)}function nn(R){const Q={...s(),reducedMotion:R};un(Q),x.set(Q)}function rn(R){const Q={...s(),newestFirst:R};un(Q),x.set(Q)}function mn(R,Q){const q={...s(),teamName:R,draftSlot:Q};un(q),x.set(q)}function cn(R,Q){R==="board"&&S.getState().status==="done"&&(R="complete"),V(U,R,!0),Cp(R,Q)}function Sn(){const R=Bp();R&&cn(R.screen,R.param)}function Fn(){if(!g){v.set({phase:"empty"});return}v.set({phase:"ready",players:T}),window.__cp={store:S,refresh:bn,valuation:ie,seasonFacade:Wn,go:cn,vmStore:C,engineVersion:ta},np(yo).then(R=>V(Y,"sha256:"+R)),Ln(),cn("team"),Ge()}function Xn(){return nl(new URLSearchParams(location.search).get("seed")||"")??Rp()}let vn=pn(!1);function Ln(){V(vn,new URLSearchParams(location.search).has("seed"),!0)}function In(){try{const R=new URL(location.href);R.searchParams.delete("seed"),history.replaceState(null,"",R.toString())}catch{}V(vn,!1)}async function Vn(R,Q){if(!c(an)){V(z,"fresh"),V(sn,""),V(W,null),V(N,Xn(),!0),el(c(N)),Ln(),V(J,R,!0),V(Z,Q,!0),mn(wn[R].name,Q),V(an,!0);try{const q=await S.dispatchAsync({type:"START",seed:c(N),userTeam:c(J),...Q!==null&&Q-1!==c(J)?{pickSlot:Q}:{}});V(X,q.error??"",!0)}finally{V(an,!1)}cn("board"),ie.lock(),dn=null,tn.set(null),bn(),dl(),Ba()}}let $n=pn(ea([]));function bn(){const R=S.getState();if(R.error&&V(X,R.error,!0),!R.draft||R.status==="idle"){C.set(null),F.set(null),G.set([]),V($n,[],!0);return}const Q=xs(R.draft.rosters[c(J)]);if(G.set(Q),R.status==="done")F.set(null),V($n,[],!0);else try{const q=H0(R.draft,c(J),je(c(N)*7+13),30);C.set(Y0(R.draft,c(J),q,{sort:D})),F.set({picksBetween:q.picksBetween,sims:q.sims});const gn=S.getState(),Cn=new Map,te=t()?.rows??[];for(const De of te){const la=q.gone.get(De.id)??0,Xe=[De.slotId,...De.alsoFits.map(ia=>ia.slotId)];for(const ia of Xe)(!Cn.has(String(ia))||la>(Cn.get(String(ia))??0))&&Cn.set(String(ia),la)}V($n,kh({openSlots:Q.map(String),goneBySlot:Object.fromEntries(Cn),needBySlot:Object.fromEntries(Q.map(De=>[String(De),1]))}),!0)}catch{}try{const q=Object.values(R.draft.rosters[c(J)]).filter(Boolean),gn=Hr(q,"4-3");E.set(gn.placements.map(Cn=>({label:Cn.slot?.label??Cn.slot?.slot??"?",name:Cn.player?.name??"(empty)",ovr:Cn.player?String(Cn.effOvr??Cn.player.ovr):"-"})))}catch{E.set([])}}async function de(R,Q){if(c(an))return!1;V(W,null);let q=!1;V(an,!0);try{const gn=await S.dispatchAsync({type:"PICK",playerId:R,slot:Q});V(X,gn.error??"",!0),q=!!(gn.error??"")}finally{V(an,!1)}return bn(),Ba(),S.getState().status==="done"&&cn("complete"),!q}async function me(){if(!c(an)){V(W,null),V(an,!0);try{const R=await S.dispatchAsync({type:"UNDO"});V(X,R.error??"",!0)}finally{V(an,!1)}bn(),Ba()}}function ge(R){V(W,null),D=R,bn()}function Pe(R){A.update(Q=>Q.includes(R)?Q.filter(q=>q!==R):[...Q,R])}function fs(){A.set([])}const oa=()=>S.getState().record,ue=()=>({engineVersion:ta(),dataVersion:c(Y),saveId:c(b)||V(b,crypto?.randomUUID?.()??"save-"+c(N)+"-"+Date.now(),!0),saveRevision:1+(S.getState().record?.picks.length??0),createdAt:c(_)||V(_,new Date().toISOString(),!0)});async function ga(R,Q,q={}){const gn=R;if(!gn){V(X,"load: empty record");return}V(sn,""),V(W,null),V(N,gn.seed,!0),V(J,gn.userTeam,!0),el(gn.seed),Ln(),V(b,Q?.saveId||(crypto?.randomUUID?.()??"save-"+gn.seed),!0),V(_,Q?.createdAt||new Date().toISOString(),!0),V(an,!0);try{const Cn=await S.dispatchAsync({type:"LOAD",record:R});V(X,Cn.error??"",!0)}finally{V(an,!1)}ie.lock(),cn("board"),bn(),q.keepWeek||dl(),Ba()}async function Ba(){const R=oa();if(!R)return;const Q=Jt(),q=Q.length?{...R,suggestIds:Q}:R,gn=await $p(q,ue(),new Date);gn&&V(X,gn,!0)}function Jt(){let R=null;if(C.subscribe(te=>R=te)(),!R)return[];let q=[];A.subscribe(te=>q=te)();const Cn=q.length===0?R.rows:R.rows.filter(te=>q.includes(te.slotId)||te.alsoFits.some(De=>q.includes(De.slotId)));return yc(Cn,R.sort)}async function qn(){if(!Wn.snapshot().state)return;const Q=await nh(Wn.weekPayload(),ue(),new Date);Q&&V(X,Q,!0)}async function Ge(){const R=new URLSearchParams(location.search).get("seed"),Q=R===null?null:nl(R),q=await eh(),gn=q.ok&&q.draft?q.draft.record?.seed??null:null;if(Q!==null&&gn!==null&&Q!==gn){V(sn,"shared link opened; your local save is untouched"),V(z,"shared");return}if(!q.ok){V(X,"the autosave was refused: "+q.message);return}if(q.draft&&(V(z,"autosave"),await ga(q.draft.record,q.draft.lineage,{keepWeek:!!q.week})),q.draft&&V(W,Array.isArray(q.draft.record?.suggestIds)&&q.draft.record.suggestIds.length>0?q.draft.record.suggestIds:null,!0),q.week){const Cn=$o(q.week.env.payload);if(!Cn.ok){V(X,"the season autosave was refused: "+Cn.message);return}V(z,"season"),Wn.resume(Cn.value.state,Cn.value.teams,Cn.value.userTeamName,Cn.value.roster),cn("hub")}}function we(){const R=S.getState().record;if(!R||S.getState().status!=="done"){V(X,"the season needs a finished draft");return}const Q=yt(R)[c(J)].map(q=>({id:q.id,name:q.name,pos:q.pos,role:q.role,team:q.team,ovr:q.ovr,spd:q.spd,str:q.str,freeAgent:!!q.freeAgent}));Wn.begin(Wp(R),c(N),2027,wn[c(J)].name,Q),dn=new ll,tn.set(dn.ss),cn("hub"),qn()}function Aa(){dn||(dn=new ll);const R=Wn.step();if(!R){V(X,"no season is running");return}const Q=S.getState().record;Q&&dn.addWeek(R.games.map(gn=>({home:gn.home,away:gn.away,round:gn.round,result:gn.result})),yt(Q)),tn.set(dn.ss);const q=R.games.find(gn=>gn.home===Wn.userTeamName||gn.away===Wn.userTeamName);q?(V(I,Bc(q.result,q.home,q.away,{week:R.week,year:2027,gs:q.gs,userTeamName:Wn.userTeamName}),!0),cn("feed")):cn("week",R.week),Wn.finished&&Dc(),qn()}async function ds(){const R=await Xp("C");if(!R.ok){V(X,"restore refused: "+R.message);return}const Q=$o(R.env.payload);if(!Q.ok){V(X,"restore refused: "+Q.message);return}Wn.resume(Q.value.state,Q.value.teams,Q.value.userTeamName,Q.value.roster),dn=null,tn.set(null),cn("hub"),qn()}function Zr(){const R=Wn.snapshot();if(!R.state||!R.teams)return;const Q=Np(R.state,R.teams,R.userTeamName,Wn.slot);Q&&(V(I,Q,!0),cn("feed"))}async function wc(){if(!Wn.snapshot().state){V(X,"no season to save");return}const Q=Wn.weekPayload(),q=await Qp("C",Q,ue(),new Date);V(X,q?"save refused: "+q:"",!0),qn()}function Dc(){const R=Wn.snapshot();if(!R.state)return;const Q=dp(R.state,R.userTeamName,Wn.userRoster);Up("C",Q,ue(),new Date)}Ms(()=>{}),Hd(()=>{ie.subscribe(()=>bn()),window.addEventListener("hashchange",Sn);const R=dc();return un(R),x.set(R),R.teamName&&rl(R.teamName,R.mode),Fn(),()=>window.removeEventListener("hashchange",Sn)});const bc=[{id:"team",label:"TEAM",show:!0},{id:"board",label:"DRAFT",show:!0},{id:"cards",label:"CARDS",show:!0},{id:"hub",label:"SEASON",show:!0},{id:"week",label:"WEEK",show:!0},{id:"standings",label:"STANDINGS",show:!0},{id:"bracket",label:"PLAYOFFS",show:!0},{id:"awards",label:"AWARDS",show:!0},{id:"review",label:"REVIEW",show:!0},{id:"stats",label:"STATS",show:!0},{id:"book",label:"BOOK",show:!0},{id:"share",label:"SHARE",show:!0},{id:"guide",label:"GUIDE",show:!0},{id:"settings",label:"SETTINGS",show:!0}],Vs=ln(()=>r()?.record??null),Xr=ln(()=>{const R=Wn.runState;return R?Fs(R):null}),Rc=ln(()=>{const R=o();if(!R)return null;const Q=Object.values(R.players);if(!Q.length)return null;const q=Q.slice().sort((gn,Cn)=>(Cn.stats.pyd??0)+(Cn.stats.rtd??0)-((gn.stats.pyd??0)+(gn.stats.rtd??0)))[0];return{mvp:q.name,mvpLine:q.label}}),Ec=ln(()=>l().ready);var _t=cg(),$r=P(_t),Lc=m(P($r),2),Ys=P(Lc),Ac=k(Ys,!0),us=m(Ys,2),Mc=k(us),no=m(us,2);nv(no,{});var eo=m(no,2),ao=m($r,2);{var Jc=R=>{var Q=ag();hn(Q,21,()=>bc.filter(q=>q.show),q=>q.id,(q,gn)=>{var Cn=eg(),te=k(Cn,!0);K(()=>{fn(Cn,"aria-current",c(U)===c(gn).id),y(te,c(gn).label)}),on("click",Cn,()=>cn(c(gn).id)),L(q,Cn)}),L(R,Q)};en(ao,R=>{i().phase==="ready"&&R(Jc)})}var so=m(ao,2);{var _c=R=>{var Q=sg(),q=k(Q,!0);K(()=>y(q,c(X))),L(R,Q)};en(so,R=>{c(X)&&R(_c)})}var to=m(so,2);{var Fc=R=>{var Q=tg();L(R,Q)},Wc=R=>{var Q=rg();L(R,Q)},Pc=R=>{var Q=lg(),q=Dn(Q);{var gn=Xe=>{var ia=og(),ef=k(ia,!0);K(()=>y(ef,c(sn))),L(Xe,ia)};en(q,Xe=>{c(sn)&&Xe(gn)})}var Cn=m(q,2),te=m(P(Cn)),De=k(te,!0),la=m(Cn,2);Dv(la,{onstart:Vn,get seedPinned(){return c(vn)},onnewseed:In,get busy(){return c(an)}}),K(Xe=>y(De,Xe),[()=>_e[ie.get().mode]]),L(R,Q)},Gc=R=>{var Q=ig(),q=Dn(Q),gn=m(P(q)),Cn=k(gn,!0),te=m(q,2);{let la=ln(()=>(r()?.record?.picks?.length??0)>0),Xe=ln(()=>r()?.status==="done");vl(te,{get vm(){return t()},onpick:de,onundo:me,onsort:ge,get canUndo(){return c(la)},get openSlots(){return a()},get heat(){return c($n)},get oddsMeta(){return f()},get needsSelected(){return d()},onneedtoggle:Pe,onneedclear:fs,onplay:()=>cn("complete"),get draftDone(){return c(Xe)},get seedCode(){return c(O)},get savedSuggest(){return c(W)},get busy(){return c(an)}})}var De=m(te,2);Sc(De,{get slots(){return u()}}),K(la=>y(Cn,la),[()=>_e[ie.get().mode]]),L(R,Q)},Nc=R=>{Yv(R,{get record(){return c(Vs)},get requestedSlot(){return c(Z)},onseason:we,oncards:()=>cn("cards"),onbook:()=>cn("book")})},Ic=R=>{sm(R,{get season(){return l()},onplayweek:Aa,onweek:Q=>{Wn.go(Q),cn("week",Q)},onstandings:()=>cn("standings"),onbracket:()=>cn("bracket"),onrestore:ds,canRestore:!0,onbook:()=>cn("book")})},Hc=R=>{um(R,{get season(){return l()},onplay:Aa,onfeed:Zr,onsave:wc})},Kc=R=>{Cm(R,{get season(){return l()},onbracket:()=>cn("bracket")})},xc=R=>{Nm(R,{get season(){return l()},onreview:()=>cn("review")})},Oc=R=>{qm(R,{get season(){return l()},get draftRecord(){return c(Vs)},onreview:()=>cn("review"),onfeed:Zr})},Vc=R=>{o1(R,{get stats(){return o()},get table(){return c(Xr)}})},Yc=R=>{h1(R,{get season(){return l()},onbracket:()=>cn("bracket"),onbook:()=>cn("book"),onawards:()=>cn("awards")})},zc=R=>{m1(R,{})},Qc=R=>{w1(R,{get vm(){return t()}})},Uc=R=>{{let Q=ln(()=>Wn.snapshot().teams);_1(R,{get stats(){return o()},get table(){return c(Xr)},get teams(){return c(Q)}})}},jc=R=>{W1(R,{get settings(){return s()},onmode:Tn,onmotion:nn,onorder:rn,onsaves:()=>cn("saves"),onresetsave:()=>mn(s().teamName,s().draftSlot)})},qc=R=>{{let Q=ln(oa),q=ln(ue);pv(R,{get record(){return c(Q)},get meta(){return c(q)},get userTeamIndex(){return c(J)},onclose:()=>cn("board"),onloaddraft:ga})}},Zc=R=>{ng(R,{get record(){return c(Vs)},get stats(){return c(Rc)},get season(){return l()}})},Xc=R=>{Iv(R,{get feed(){return c(I)},onclose:()=>{cn(c(Ec)?"week":"board"),V(I,null)}})},$c=R=>{vl(R,{get vm(){return t()},onpick:de,onundo:me,onsort:ge,canUndo:!1,get busy(){return c(an)}})};en(to,R=>{i().phase==="loading"?R(Fc):i().phase==="empty"?R(Wc,1):c(U)==="team"?R(Pc,2):c(U)==="board"&&t()?R(Gc,3):c(U)==="complete"&&c(Vs)?R(Nc,4):c(U)==="hub"?R(Ic,5):c(U)==="week"?R(Hc,6):c(U)==="standings"?R(Kc,7):c(U)==="bracket"?R(xc,8):c(U)==="book"?R(Oc,9):c(U)==="awards"?R(Vc,10):c(U)==="review"?R(Yc,11):c(U)==="guide"?R(zc,12):c(U)==="cards"?R(Qc,13):c(U)==="stats"?R(Uc,14):c(U)==="settings"?R(jc,15):c(U)==="saves"?R(qc,16):c(U)==="share"?R(Zc,17):c(U)==="feed"&&c(I)?R(Xc,18):t()&&R($c,19)})}var nf=m(to,2);Th(nf,{get dev(){return g},get runningStamp(){return B}}),K(()=>{fn(_t,"data-screen",c(U)),fn(Ys,"data-origin",c(z)),fn(Ys,"title",`the boot origin, read from the same state that decided the restore (${pl[c(z)]})`),y(Ac,pl[c(z)]),fn(us,"data-status-phase",c($).phase),fn(us,"data-status-tone",c($).tone),fn(us,"title",c($).why),y(Mc,`${c($).label??""}${c($).action?` · ${c($).action}`:""}`),fn(eo,"aria-pressed",c(U)==="saves")}),on("click",eo,()=>cn("saves")),L(n,_t),En(),p()}On(["click"]);Cd(fg,{target:document.getElementById("app")});
