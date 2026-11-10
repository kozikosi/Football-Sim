(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const to=!1;var io=Array.isArray,Gl=Array.prototype.indexOf,Wa=Array.prototype.includes,Bs=Array.from,$s=Object.defineProperty,ia=Object.getOwnPropertyDescriptor,Wl=Object.getOwnPropertyDescriptors,Pl=Object.prototype,Fl=Array.prototype,fo=Object.getPrototypeOf,dr=Object.isExtensible;const qe=()=>{};function Il(n){for(var e=0;e<n.length;e++)n[e]()}function co(){var n,e,a=new Promise((s,r)=>{n=s,e=r});return{promise:a,resolve:n,reject:e}}const Mn=2,ca=4,Cs=8,uo=1<<24,re=16,ue=32,Ke=64,Fs=128,Xs=256,fe=512,Tn=1024,X=2048,Vn=4096,Wn=8192,Ln=16384,Ca=32768,Pa=1<<25,ua=65536,os=1<<17,Nl=1<<18,ga=1<<19,_l=1<<20,ge=1<<25,ls=1<<21,fa=1<<22,_e=1<<23,Ma=Symbol("$state"),po=Symbol("component"),Hl=Symbol("legacy props"),Kl=Symbol(""),ho=Symbol("attributes"),Is=Symbol("class"),Ns=Symbol("style"),_s=Symbol("text"),Ha=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"},Ol=1,xl=2,Bo=4,Vl=8,zl=16,Yl=1,Ql=4,jl=8,ql=16,Ul=1,Zl=2,Co={},gn=Symbol("uninitialized"),$l="http://www.w3.org/1999/xhtml";function Xl(){console.warn("https://svelte.dev/e/derived_inert")}function nt(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function go(n){return n===this.v}function mo(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function To(n){return!mo(n,this.v)}function et(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function at(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function st(n,e,a){throw new Error("https://svelte.dev/e/each_key_duplicate")}function rt(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function ot(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function lt(n){throw new Error("https://svelte.dev/e/effect_orphan")}function tt(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function it(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function ft(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function ct(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function ut(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function pt(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let ht=!1,Jn=null;function pa(n){Jn=n}function Zn(n,e=!1,a){Jn={p:Jn,i:!1,c:null,e:null,s:n,x:null,r:Y,l:null}}function $n(n){var e=Jn,a=e.e;if(a!==null){e.e=null;for(var s of a)Io(s)}return e.i=!0,Jn=e.p,nr(n)}function nr(n={}){return $s(n,po,{value:!0}),n}function vo(){return!0}let la=[];function dt(){var n=la;la=[],Il(n)}function Fe(n){if(la.length===0){var e=la;queueMicrotask(()=>{e===la&&dt()})}la.push(n)}const Bt=-7169;function tn(n,e){n.f=n.f&Bt|e}function er(n){(n.f&fe)!==0||n.deps===null?tn(n,Tn):tn(n,Vn)}function So(n,e){(n.f&X)!==0?e.set(n,X):(n.f&Vn)!==0&&e.get(n)!==X&&e.set(n,Vn),tn(n,Tn)}function gs(n){var e=O,a=Y;Un(null),ye(null);try{return n()}finally{Un(e),ye(a)}}function Ct(n,e,a,s){const r=Fa;var o=n.filter(c=>!c.settled),l=e.map(r);if(a.length===0&&o.length===0){s(l);return}var i=Y,t=gt(),f=o.length===1?o[0].promise:o.length>1?Promise.all(o.map(c=>c.promise)):null;function u(c){if((i.f&Ln)===0){t();try{s([...l,...c])}catch(p){Ce(p,i)}ts()}}var h=yo();if(a.length===0){f.then(()=>u([])).finally(h);return}function d(){Promise.all(a.map(c=>mt(c))).then(u).catch(c=>Ce(c,i)).finally(h)}f?f.then(()=>{if((i.f&Ln)!==0){h();return}t(),d(),ts()}):d()}function gt(){var n=Y,e=O,a=Jn,s=j;return function(o=!0){ye(n),Un(e),pa(a),o&&(n.f&Ln)===0&&(s?.activate(),s?.apply())}}function ts(n=!0){ye(null),Un(null),pa(null),n&&j?.deactivate()}function yo(){var n=Y,e=n.b,a=j,s=!!e?.is_rendered();return e?.update_pending_count(1,a),a.increment(s,n),()=>{e?.update_pending_count(-1,a),a.decrement(s,n)}}function Fa(n){var e=Mn|X;return Y!==null&&(Y.f|=ga),{ctx:Jn,deps:null,effects:null,equals:go,f:e,fn:n,reactions:null,rv:0,v:gn,wv:0,parent:Y,ac:null}}const ya=Symbol("obsolete");function mt(n,e,a){let s=Y;s===null&&at();var r=void 0,o=Xe(gn),l=!O,i=new Set;return bt(()=>{var t=Y,f=co();r=f.promise;try{Promise.resolve(n()).then(f.resolve,c=>{c!==Ha&&f.reject(c)}).finally(ts)}catch(c){f.reject(c),ts()}var u=j;if(l){if((t.f&Ca)!==0)var h=yo();if(s.b?.is_rendered())u.async_deriveds.get(t)?.reject(ya);else for(const c of i.values())c.reject(ya);i.add(f),u.async_deriveds.set(t,f)}const d=(c,p=void 0)=>{h?.(),i.delete(f),p!==ya&&(u.activate(),p?(o.f|=_e,ha(o,p)):((o.f&_e)!==0&&(o.f^=_e),ha(o,c)),u.deactivate())};f.promise.then(d,c=>d(null,c||"unknown"))}),Fo(()=>{for(const t of i)t.reject(ya)}),new Promise(t=>{function f(u){function h(){u===r?t(o):f(r)}u.then(h,h)}f(r)})}function oe(n){const e=Fa(n);return xo(e),e}function Do(n){const e=Fa(n);return e.equals=To,e}function Tt(n){var e=n.effects;if(e!==null){n.effects=null;for(var a=0;a<e.length;a+=1)_n(e[a])}}function ar(n){var e,a=Y,s=n.parent;if(!Je&&s!==null&&n.v!==gn&&(s.f&(Ln|Wn))!==0)return Xl(),n.v;ye(s);try{Tt(n),e=Qo(n)}finally{ye(a)}return e}function ko(n){var e=ar(n);if(!n.equals(e)&&(n.wv=zo(),(!j?.is_fork||n.deps===null)&&(j!==null?(j.capture(n,e,!0),Hs?.capture(n,e,!0)):n.v=e,n.deps===null))){tn(n,Tn);return}Je||(le!==null?(or()||j?.is_fork)&&le.set(n,e):er(n))}function vt(n){if(n.effects!==null)for(const e of n.effects)(e.teardown||e.ac)&&(e.teardown?.(),e.ac!==null&&gs(()=>{e.ac.abort(Ha),e.ac=null}),e.fn!==null&&(e.teardown=qe),Na(e,0),ir(e))}function Ro(n){if(n.effects!==null)for(const e of n.effects)e.teardown&&e.fn!==null&&da(e)}let Ds=null,aa=null,j=null,Hs=null,le=null,Ks=null,ks=!1,Aa=null,$a=null;var Br=0;let St=1;class Oe{id=St++;started=!1;linked=!0;prev=null;next=null;async_deriveds=new Map;current=new Map;previous=new Map;#e=new Set;#i=new Set;#n=0;#l=new Map;#a=null;#s=[];#o=[];#r=new Map;#t=new Map;#h=new Set;is_fork=!1;#f=!1;constructor(){aa===null?Ds=aa=this:(aa.next=this,this.prev=aa),aa=this}#d(){if(this.is_fork)return!0;for(const e of this.#l.keys())if(!this.#g(e))return!0;return!1}#g(e){for(var a=e;a!==null;a=a.parent)if(this.#t.has(a))return!0;return!1}skip_effect(e){this.#t.has(e)||this.#t.set(e,{d:[],m:[]}),this.#h.delete(e)}unskip_effect(e,a=s=>this.schedule(s)){var s=this.#t.get(e);if(s){this.#t.delete(e);for(var r of s.d)tn(r,X),a(r);for(r of s.m)tn(r,Vn),a(r)}this.#h.add(e)}#c(){var e=[];for(const o of this.#s)if(!((o.f&Ln)!==0||(o.f&(X|Vn))===0)){for(var a=o,s=!1;a.parent!==null;){a=a.parent;var r=a.f;if((r&(Ke|ue))!==0){if((r&Tn)===0){s=!0;break}a.f^=Tn}}s||e.push(a)}return this.#s=[],e}#B(){this.started=!0;for(const[i,t]of this.#r)tn(i,t),this.schedule(i);this.apply();for(var e=Aa=[],a=[],s=$a=[];this.#s.length>0;){Br++>1e3&&(this.#p(),yt());for(const i of this.#c())try{this.#T(i,e,a)}catch(t){throw Eo(i),this.#d()||this.discard(),t}}if(j=null,s.length>0){var r=Oe.ensure();for(const i of s)r.schedule(i)}if(Aa=null,$a=null,this.#d()){this.#C(a),this.#C(e);for(const[i,t]of this.#t)wo(i,t);s.length>0&&j.#B();return}const o=this.#y();if(o){this.#C(a),this.#C(e),o.#u(this);return}this.#r.clear();for(const i of this.#e)i(this);this.#e.clear(),Hs=this,Cr(a),Cr(e),Hs=null,this.#a?.resolve();var l=j;this.#n===0&&(this.#s.length===0||l!==null)&&this.#p(),l!==null&&(me.clear(),l.#B())}#T(e,a,s){e.f^=Tn;for(var r=e.first;r!==null;){var o=r.f,l=(o&(ue|Ke))!==0,i=l&&(o&Tn)!==0,t=i||(o&Wn)!==0||this.#t.has(r);if(!t&&r.fn!==null){l?r.f^=Tn:(o&ca)!==0?a.push(r):Oa(r)&&((o&re)!==0&&this.add_dirty_reaction(r,Vn),da(r));var f=r.first;if(f!==null){r=f;continue}}for(;r!==null;){var u=r.next;if(u!==null){r=u;break}r=r.parent}}}#y(){for(var e=this.prev;e!==null;e=e.prev)if(!e.is_fork&&this.#m(e))return e;return null}#m(e){for(const[a,[,s]]of this.current)if(!s&&e.current.has(a))return!0;return!1}#u(e){for(const[s,r]of e.current)!this.previous.has(s)&&e.previous.has(s)&&this.previous.set(s,e.previous.get(s)),this.current.set(s,r);for(const[s,r]of e.async_deriveds){const o=this.async_deriveds.get(s);o&&r.promise.then(o.resolve).catch(o.reject)}e.async_deriveds.clear(),this.transfer_reactions(e.#r);const a=s=>{var r=s.reactions;if(r!==null&&!((s.f&Mn)!==0&&(s.f&(X|Vn))===0))for(const i of r){var o=i.f;if((o&Mn)!==0)a(i);else{var l=i;o&(fa|re)&&!this.async_deriveds.has(l)&&(this.#r.delete(l),tn(l,X),this.schedule(l))}}};for(const s of this.current.keys())a(s);this.oncommit(()=>e.discard()),e.#p(),j=this,this.#B()}#C(e){for(var a=0;a<e.length;a+=1)So(e[a],this.#r)}capture(e,a,s=!1){e.v!==gn&&!this.previous.has(e)&&this.previous.set(e,e.v),(e.f&_e)===0&&(this.current.set(e,[a,s]),le?.set(e,a)),this.is_fork||(e.v=a)}activate(){j=this}deactivate(){j=null,le=null}flush(){try{ks=!0,j=this,this.#B()}finally{Br=0,Ks=null,Aa=null,$a=null,ks=!1,j=null,le=null,me.clear()}}discard(){for(const e of this.#i)e(this);this.#i.clear();for(const e of this.async_deriveds.values())e.reject(ya);this.#p(),this.#a?.resolve()}register_created_effect(e){this.#o.push(e)}#v(){for(let h=Ds;h!==null;h=h.next){var e=h.id<this.id,a=[];for(const[d,[c,p]]of this.current){if(h.current.has(d)){var s=h.current.get(d)[0];if(e&&c!==s)h.current.set(d,[c,p]);else continue}a.push(d)}if(e)for(const[d,c]of this.async_deriveds){const p=h.async_deriveds.get(d);p&&c.promise.then(p.resolve).catch(p.reject)}var r=[...h.current.keys()].filter(d=>!h.current.get(d)[1]);if(!(!h.started||r.length===0)){var o=r.filter(d=>!this.current.has(d));if(o.length===0)e&&h.discard();else if(a.length>0){if(e)for(const d of this.#h)h.unskip_effect(d,c=>{(c.f&(re|fa))!==0?h.schedule(c):h.#C([c])});h.activate();var l=new Set,i=new Map;for(var t of a)Lo(t,o,l,i);i=new Map;var f=[...h.current].filter(([d,c])=>{const p=this.current.get(d);return p?p[0]!==c[0]||p[1]!==c[1]:!0}).map(([d])=>d);if(f.length>0)for(const d of this.#o)(d.f&(Ln|Wn|os))===0&&sr(d,f,i)&&((d.f&(fa|re))!==0?(tn(d,X),h.schedule(d)):h.add_dirty_reaction(d,X));if(h.#s.length>0&&!h.#f){h.apply();for(var u of h.#c())h.#T(u,[],[])}h.deactivate()}}}}increment(e,a){if(this.#n+=1,e){let s=this.#l.get(a)??0;this.#l.set(a,s+1)}}decrement(e,a){if(this.#n-=1,e){let s=this.#l.get(a)??0;s===1?this.#l.delete(a):this.#l.set(a,s-1)}this.#f||(this.#f=!0,Fe(()=>{this.#f=!1,this.linked&&this.flush()}))}transfer_reactions(e){for(const[a,s]of e)this.add_dirty_reaction(a,s);e.clear()}add_dirty_reaction(e,a){(a===X||this.#r.get(e)!==X)&&this.#r.set(e,a)}oncommit(e){this.#e.add(e)}ondiscard(e){this.#i.add(e)}settled(){return(this.#a??=co()).promise}static ensure(){if(j===null){const e=j=new Oe;ks||Fe(()=>{e.started||e.flush()})}return j}apply(){{le=null;return}}schedule(e){if(Ks=e,e.b?.is_pending&&(e.f&(ca|Cs|uo))!==0&&(e.f&Ca)===0){e.b.defer_effect(e);return}this.#s.push(e)}#p(){if(this.linked){var e=this.prev,a=this.next;e===null?Ds=a:e.next=a,a===null?aa=e:a.prev=e,this.linked=!1}}}function yt(){try{tt()}catch(n){Ce(n,Ks)}}let we=null;function Cr(n){var e=n.length;if(e!==0){for(var a=0;a<e;){var s=n[a++];if((s.f&(Ln|Wn))===0&&Oa(s)&&(we=new Set,da(s),s.deps===null&&s.first===null&&s.nodes===null&&s.teardown===null&&s.ac===null&&Ho(s),we?.size>0)){me.clear();for(const r of we){if((r.f&(Ln|Wn))!==0)continue;const o=[r];let l=r.parent;for(;l!==null;)we.has(l)&&(we.delete(l),o.push(l)),l=l.parent;for(let i=o.length-1;i>=0;i--){const t=o[i];(t.f&(Ln|Wn))===0&&da(t)}}we.clear()}}we=null}}function Lo(n,e,a,s){if(!a.has(n)&&(a.add(n),n.reactions!==null))for(const r of n.reactions){const o=r.f;(o&Mn)!==0?Lo(r,e,a,s):(o&(fa|re))!==0&&(o&X)===0&&sr(r,e,s)&&(tn(r,X),rr(r))}}function sr(n,e,a){const s=a.get(n);if(s!==void 0)return s;if(n.deps!==null)for(const r of n.deps){if(Wa.call(e,r))return!0;if((r.f&Mn)!==0&&sr(r,e,a))return a.set(r,!0),!0}return a.set(n,!1),!1}function rr(n){j.schedule(n)}function wo(n,e){if(!((n.f&ue)!==0&&(n.f&Tn)!==0)){(n.f&X)!==0?e.d.push(n):(n.f&Vn)!==0&&e.m.push(n),tn(n,Tn);for(var a=n.first;a!==null;)wo(a,e),a=a.next}}function Eo(n){tn(n,Tn);for(var e=n.first;e!==null;)Eo(e),e=e.next}let is=new Set;const me=new Map;let Jo=!1;function Xe(n,e){var a={f:0,v:n,reactions:null,equals:go,rv:0,wv:0};return a}function nn(n,e){const a=Xe(n);return xo(a),a}function Mo(n,e=!1,a=!0){const s=Xe(n);return e||(s.equals=To),s}function W(n,e,a=!1){O!==null&&(!te||(O.f&os)!==0)&&vo()&&(O.f&(Mn|re|fa|os))!==0&&(Te===null||!Te.has(n))&&ut();let s=a?Ie(e):e;return ha(n,s,$a)}var Ye=null,Os=0;function ha(n,e,a=null){if(!n.equals(e)){Je?me.set(n,e):me.has(n)||me.set(n,n.v);var s=Oe.ensure();if(s.capture(n,e),(n.f&Mn)!==0){const r=n;(n.f&X)!==0&&ar(r),le===null&&er(r)}n.wv=zo(),Ye=null,Os=0,Ao(n,X,a),Ye=null,Y!==null&&(Y.f&Tn)!==0&&(Y.f&(ue|Ke))===0&&(jn===null?Pt([n]):jn.push(n)),!s.is_fork&&is.size>0&&!Jo&&Dt()}return e}function Dt(){Jo=!1;for(const n of is){(n.f&Tn)!==0&&tn(n,Vn);let e;try{e=Oa(n)}catch{e=!0}e&&da(n)}is.clear()}function ba(n){W(n,n.v+1)}function Ao(n,e,a){var s=n.reactions;if(s!==null){var r=s.length;if(Os+=r,Os>1e5&&Ye===null&&(Ye=new Set),Ye!==null){if(Ye.has(n))return;Ye.add(n)}for(var o=0;o<r;o++){var l=s[o],i=l.f,t=(i&X)===0;if(t&&tn(l,e),(i&os)!==0)is.add(l);else if((i&Mn)!==0){var f=l;le?.delete(f),Ao(f,Vn,a)}else if(t){var u=l;(i&re)!==0&&we!==null&&we.add(u),a!==null?a.push(u):rr(u)}}}}function Ie(n){if(typeof n!="object"||n===null||Ma in n||po in n)return n;const e=fo(n);if(e!==Pl&&e!==Fl)return n;var a=new Map,s=io(n),r=nn(0),o=$e,l=i=>{if($e===o)return i();var t=O,f=$e;Un(null),Tr(o);var u=i();return Un(t),Tr(f),u};return s&&a.set("length",nn(n.length)),new Proxy(n,{defineProperty(i,t,f){(!("value"in f)||f.configurable===!1||f.enumerable===!1||f.writable===!1)&&ft();var u=a.get(t);return u===void 0?l(()=>{var h=nn(f.value);return a.set(t,h),h}):W(u,f.value,!0),!0},deleteProperty(i,t){var f=a.get(t);if(f===void 0){if(t in i){const u=l(()=>nn(gn));a.set(t,u),ba(r)}}else W(f,gn),ba(r);return!0},get(i,t,f){if(t===Ma)return n;var u=a.get(t),h=t in i;if(u===void 0&&(!h||ia(i,t)?.writable)&&(u=l(()=>{var c=Ie(h?i[t]:gn),p=nn(c);return p}),a.set(t,u)),u!==void 0){var d=m(u);return d===gn?void 0:d}return Reflect.get(i,t,f)},getOwnPropertyDescriptor(i,t){this.has?.(i,t);var f=Reflect.getOwnPropertyDescriptor(i,t),u=a.get(t);if(u!==void 0){var h=m(u);if(h===gn)return;if(f&&"value"in f)f.value=h;else return{enumerable:!0,configurable:!0,value:h,writable:!0}}return f},has(i,t){if(t===Ma)return!0;var f=a.get(t),u=f!==void 0&&f.v!==gn||Reflect.has(i,t);if(f!==void 0||(Y!==null||O!==null)&&(!u||ia(i,t)?.writable)){f===void 0&&(f=l(()=>{var d=u?Ie(i[t]):gn,c=nn(d);return c}),a.set(t,f));var h=m(f);if(h===gn)return!1}return u},set(i,t,f,u){var h=a.get(t),d=t in i;if(s&&t==="length")for(var c=f;c<h.v;c+=1){var p=a.get(c+"");p!==void 0?W(p,gn):c in i&&(p=l(()=>nn(gn)),a.set(c+"",p))}if(h===void 0)(!d||ia(i,t)?.writable)&&(h=l(()=>nn(void 0)),W(h,Ie(f)),a.set(t,h));else{d=h.v!==gn;var B=l(()=>Ie(f));W(h,B)}var C=Reflect.getOwnPropertyDescriptor(i,t);if(C?.set&&C.set.call(u,f),!d){if(s&&typeof t=="string"){var g=a.get("length"),T=Number(t);Number.isInteger(T)&&T>=g.v&&W(g,T+1)}ba(r)}return!0},ownKeys(i){m(r);var t=Reflect.ownKeys(i).filter(h=>{var d=a.get(h);return d===void 0||d.v!==gn});for(var[f,u]of a)u.v!==gn&&!(f in i)&&t.push(f);return t},setPrototypeOf(){ct()}})}var gr,bo,Go,Wo;function kt(){if(gr===void 0){gr=window,bo=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,a=Text.prototype;Go=ia(e,"firstChild").get,Wo=ia(e,"nextSibling").get,dr(n)&&(n[Is]=void 0,n[ho]=null,n[Ns]=void 0,n.__e=void 0),dr(a)&&(a[_s]=void 0)}}function Ue(n=""){return document.createTextNode(n)}function Ia(n){return Go.call(n)}function Ka(n){return Wo.call(n)}function H(n,e){return Ia(n)}function He(n,e=!1){{var a=Ia(n);return a instanceof Comment&&a.data===""?Ka(a):a}}function E(n,e=!1){return Ia(n)}function k(n,e=1,a=!1){let s=n;for(;e--;)s=Ka(s);return s}function Rt(n){n.textContent=""}function Po(){return!1}function Lt(n,e,a){return a?document.createElement(n,{is:a}):document.createElement(n)}function wt(n){var e=Y;if(e===null)return O.f|=_e,n;if((e.f&Ca)===0&&(e.f&ca)===0)throw n;Ce(n,e)}function Ce(n,e){if(n===Co)throw n;if(!(e!==null&&(e.f&Ln)!==0)){for(;e!==null;){if((e.f&Fs)!==0&&(e.f&(Ln|Pa))===0){if((e.f&Ca)===0)throw n;try{e.b.error(n);return}catch(a){n=a}}e=e.parent}throw n}}function Et(n){Y===null&&(O===null&&lt(),ot()),Je&&rt()}function Jt(n,e){var a=e.last;a===null?e.last=e.first=n:(a.next=n,n.prev=a,e.last=n)}function Me(n,e){var a=Y;a!==null&&(a.f&Wn)!==0&&(n|=Wn);var s={ctx:Jn,deps:null,nodes:null,f:n|X|fe,first:null,fn:e,last:null,next:null,parent:a,b:a&&a.b,prev:null,teardown:null,wv:0,ac:null};j?.register_created_effect(s);var r=s;if((n&ca)!==0)Aa!==null?Aa.push(s):Oe.ensure().schedule(s);else if(e!==null){try{da(s)}catch(l){throw _n(s),l}r.deps===null&&r.teardown===null&&r.nodes===null&&r.first===r.last&&(r.f&ga)===0&&(r=r.first,(n&re)!==0&&(n&ua)!==0&&r!==null&&(r.f|=ua))}if(r!==null&&(r.parent=a,a!==null&&Jt(r,a),O!==null&&(O.f&Mn)!==0&&(n&Ke)===0)){var o=O;(o.effects??=[]).push(r)}return s}function or(){return O!==null&&!te}function Fo(n){const e=Me(Cs,null);return tn(e,Tn),e.teardown=n,e}function lr(n){Et();var e=Y.f,a=!O&&(e&ue)!==0&&Jn!==null&&!Jn.i;if(a){var s=Jn;(s.e??=[]).push(n)}else return Io(n)}function Io(n){return Me(ca|_l,n)}function Mt(n){Oe.ensure();const e=Me(Ke|ga,n);return(a={})=>new Promise(s=>{a.outro?Ze(e,()=>{_n(e),s(void 0)}):(_n(e),s(void 0))})}function At(n){return Me(ca,n)}function bt(n){return Me(fa|ga,n)}function No(n,e=0){return Me(Cs|e,n)}function V(n,e=[],a=[],s=[]){Ct(s,e,a,r=>{Me(Cs,()=>{n(...r.map(m))})})}function tr(n,e=0){var a=Me(re|e,n);return a}function qn(n){return Me(ue|ga,n)}function _o(n){var e=n.teardown;if(e!==null){const a=Je,s=O;mr(!0),Un(null);try{e.call(null)}catch(r){Ce(r,n.parent)}finally{mr(a),Un(s)}}}function ir(n,e=!1){var a=n.first;for(n.first=n.last=null;a!==null;){const r=a.ac;r!==null&&gs(()=>{r.abort(Ha)});var s=a.next;(a.f&Ke)!==0?a.parent=null:_n(a,e),a=s}}function Gt(n){for(var e=n.first;e!==null;){var a=e.next;(e.f&ue)===0&&_n(e),e=a}}function _n(n,e=!0){var a=!1;(e||(n.f&Nl)!==0)&&n.nodes!==null&&n.nodes.end!==null&&(Wt(n.nodes.start,n.nodes.end),a=!0),n.f|=Pa,ir(n,e&&!a),Na(n,0);var s=n.nodes&&n.nodes.t;if(s!==null)for(const o of s)o.stop();_o(n),n.f^=Pa,n.f|=Ln;var r=n.parent;r!==null&&r.first!==null&&Ho(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Wt(n,e){for(;n!==null;){var a=n===e?null:Ka(n);n.remove(),n=a}}function Ho(n){var e=n.parent,a=n.prev,s=n.next;a!==null&&(a.next=s),s!==null&&(s.prev=a),e!==null&&(e.first===n&&(e.first=s),e.last===n&&(e.last=a))}function Ze(n,e,a=!0){var s=[];n.f|=Xs,Ko(n,s,!0);var r=()=>{a&&_n(n),e&&e()},o=s.length;if(o>0){var l=()=>--o||r();for(var i of s)i.out(l)}else r()}function Ko(n,e,a){if((n.f&Wn)===0){n.f^=Wn;var s=n.nodes&&n.nodes.t;if(s!==null)for(const i of s)(i.is_global||a)&&e.push(i);for(var r=n.first;r!==null;){var o=r.next;if((r.f&Ke)===0){var l=(r.f&ua)!==0||(r.f&ue)!==0&&(n.f&re)!==0;Ko(r,e,l?a:!1)}r=o}}}function fs(n){n.f&=~Xs,Oo(n,!0)}function Oo(n,e){if((n.f&Xs)===0&&(n.f&Wn)!==0){n.f^=Wn,(n.f&Tn)===0&&(tn(n,X),Oe.ensure().schedule(n));for(var a=n.first;a!==null;){var s=a.next,r=(a.f&ua)!==0||(a.f&ue)!==0;Oo(a,r?e:!1),a=s}var o=n.nodes&&n.nodes.t;if(o!==null)for(const l of o)(l.is_global||e)&&l.in()}}function fr(n,e){if(n.nodes)for(var a=n.nodes.start,s=n.nodes.end;a!==null;){var r=a===s?null:Ka(a);e.append(a),a=r}}let Je=!1;function mr(n){Je=n}let O=null,te=!1;function Un(n){O=n}let Y=null;function ye(n){Y=n}let Te=null;function xo(n){O!==null&&((O.f&ls)!==0||(O.f&Mn)!==0)&&(Te??=new Set).add(n)}let Nn=null,xn=0,jn=null;function Pt(n){jn=n}let Vo=1,Qe=0,$e=Qe;function Tr(n){$e=n}function zo(){return++Vo}function Oa(n){var e=n.f;if((e&X)!==0)return!0;if((e&Vn)!==0){for(var a=n.deps,s=a.length,r=0;r<s;r++){var o=a[r];if(Oa(o)&&ko(o),o.wv>n.wv)return!0}(e&fe)!==0&&le===null&&tn(n,Tn)}return!1}function Yo(n,e,a=!0){var s=n.reactions;if(s!==null&&!(Te!==null&&Te.has(n)))for(var r=0;r<s.length;r++){var o=s[r];(o.f&Mn)!==0?Yo(o,e,!1):e===o&&(a?tn(o,X):(o.f&Tn)!==0&&tn(o,Vn),rr(o))}}function Qo(n){var e=Nn,a=xn,s=jn,r=O,o=Te,l=Jn,i=te,t=$e,f=n.f;Nn=null,xn=0,jn=null,O=(f&(ue|Ke))===0?n:null,Te=null,pa(n.ctx),te=!1,$e=++Qe,n.ac!==null&&(gs(()=>{n.ac.abort(Ha)}),n.ac=null);try{n.f|=ls;var u=n.fn,h=u();n.f|=Ca;var d=vr(n);if(vo()&&jn!==null&&!te&&d!==null&&(n.f&(Mn|Vn|X))===0)for(var c=0;c<jn.length;c++)Yo(jn[c],n);if(r!==null&&r!==n){if(Qe++,r.deps!==null)for(let p=0;p<a;p+=1)r.deps[p].rv=Qe;if(e!==null)for(const p of e)p.rv=Qe;jn!==null&&(s===null?s=jn:s.push(...jn))}return(n.f&_e)!==0&&(n.f^=_e),h}catch(p){return vr(n),wt(p)}finally{n.f^=ls,Nn=e,xn=a,jn=s,O=r,Te=o,pa(l),te=i,$e=t}}function vr(n){var e=n.deps,a=j?.is_fork;if(Nn!==null){var s;if(a||Na(n,xn),e!==null&&xn>0)for(e.length=xn+Nn.length,s=0;s<Nn.length;s++)e[xn+s]=Nn[s];else n.deps=e=Nn;if(or()&&(n.f&fe)!==0)for(s=xn;s<e.length;s++)(e[s].reactions??=[]).push(n)}else!a&&e!==null&&xn<e.length&&(Na(n,xn),e.length=xn);return e}function Ft(n,e){let a=e.reactions;if(a!==null){var s=Gl.call(a,n);if(s!==-1){var r=a.length-1;r===0?a=e.reactions=null:(a[s]=a[r],a.pop())}}if(a===null&&(e.f&Mn)!==0&&(Nn===null||!Wa.call(Nn,e))){var o=e;(o.f&fe)!==0&&(o.f^=fe),o.v!==gn&&er(o),o.ac!==null&&gs(()=>{o.ac.abort(Ha),o.ac=null,tn(o,X)}),vt(o),Na(o,0)}}function Na(n,e){var a=n.deps;if(a!==null)for(var s=e;s<a.length;s++)Ft(n,a[s])}function da(n){var e=n.f;if((e&Ln)===0){tn(n,Tn);var a=Y;Y=n;try{(e&(re|uo))!==0?Gt(n):ir(n),_o(n);var s=Qo(n);n.teardown=typeof s=="function"?s:null,n.wv=Vo;var r;to&&ht&&(n.f&X)!==0&&n.deps}finally{Y=a}}}function m(n){var e=n.f,a=(e&Mn)!==0;if(O!==null&&!te){var s=Y!==null&&(Y.f&Ln)!==0;if(!s&&(Te===null||!Te.has(n))){var r=O.deps;if((O.f&ls)!==0)n.rv<Qe&&(n.rv=Qe,Nn===null&&r!==null&&r[xn]===n?xn++:Nn===null?Nn=[n]:Nn.push(n));else{O.deps??=[],Wa.call(O.deps,n)||O.deps.push(n);var o=n.reactions;o===null?n.reactions=[O]:Wa.call(o,O)||o.push(O)}}}if(Je&&me.has(n))return me.get(n);if(a){var l=n;if(Je){var i=l.v;return((l.f&Tn)===0&&l.reactions!==null||qo(l))&&(i=ar(l)),me.set(l,i),i}var t=(l.f&fe)===0&&!te&&O!==null&&(O.f&fe)!==0,f=(l.f&Ca)===0;Oa(l)&&(t&&(l.f|=fe),ko(l)),t&&!f&&(Ro(l),jo(l))}if(le?.has(n))return le.get(n);if((n.f&_e)!==0)throw n.v;return n.v}function jo(n){if(n.f|=fe,n.deps!==null)for(const a of n.deps){var e=a.reactions;e===null?a.reactions=[n]:Wa.call(e,n)||e.push(n),(a.f&Mn)!==0&&(a.f&fe)===0&&(Ro(a),jo(a))}}function qo(n){if(n.v===gn)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(me.has(e)||(e.f&Mn)!==0&&qo(e))return!0;return!1}function xa(n){var e=te;try{return te=!0,n()}finally{te=e}}const It=["touchstart","touchmove"];function Nt(n){return It.includes(n)}const Da=Symbol("events"),Uo=new Set,xs=new Set;function pn(n,e,a){(e[Da]??={})[n]=a}function pe(n){for(var e=0;e<n.length;e++)Uo.add(n[e]);for(var a of xs)a(n)}let Rs=null,Ls=!1;function Sr(n){var e=this,a=e.ownerDocument,s=n.type,r=n.composedPath?.()||[],o=r[0]||n.target;Rs=n,Ls||(Ls=!0,setTimeout(()=>{Ls=!1,Rs=null}));var l=0,i=Rs===n&&n[Da];if(i){var t=r.indexOf(i);if(t!==-1&&(e===document||e===window)){n[Da]=e;return}var f=r.indexOf(e);if(f===-1)return;t<=f&&(l=t)}if(o=r[l]||n.target,o!==e){$s(n,"currentTarget",{configurable:!0,get(){return o||a}});var u=O,h=Y;Un(null),ye(null);try{for(var d,c=[];o!==null&&o!==e;){try{var p=o[Da]?.[s];p!=null&&(!o.disabled||n.target===o)&&p.call(o,n)}catch(B){d?c.push(B):d=B}if(n.cancelBubble)break;l++,o=l<r.length?r[l]:null}if(d){for(let B of c)queueMicrotask(()=>{throw B});throw d}}finally{n[Da]=e,delete n.currentTarget,Un(u),ye(h)}}}const _t=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function Ht(n){return _t?.createHTML(n)??n}function Kt(n){var e=Lt("template");return e.innerHTML=Ht(n.replaceAll("<!>","<!---->")),e.content}function yr(n,e){var a=Y;a.nodes===null&&(a.nodes={start:n,end:e,a:null,t:null})}function F(n,e){var a=(e&Ul)!==0,s=(e&Zl)!==0,r,o=!n.startsWith("<!>");return()=>{r===void 0&&(r=Kt(o?n:"<!>"+n),a||(r=Ia(r)));var l=s||bo?document.importNode(r,!0):r.cloneNode(!0);if(a){var i=Ia(l),t=l.lastChild;yr(i,t)}else yr(l,l);return l}}function P(n,e){n!==null&&n.before(e)}function Ot(n){let e=0,a=Xe(0),s;return()=>{or()&&(m(a),No(()=>(e===0&&(s=xa(()=>n(()=>ba(a)))),e+=1,()=>{Fe(()=>{e-=1,e===0&&(s?.(),s=void 0,ba(a))})})))}}var xt=ua|ga;function Vt(n,e,a,s){new zt(n,e,a,s)}class zt{parent;is_pending=!1;transform_error;#e;#i=null;#n;#l;#a;#s=null;#o=null;#r=null;#t=null;#h=0;#f=0;#d=!1;#g=new Map;#c=null;#B=Ot(()=>(this.#c=Xe(this.#h),()=>{this.#c=null}));constructor(e,a,s,r){this.#e=e,this.#n=a,this.#l=o=>{var l=Y;l.b=this,l.f|=Fs,s(o)},this.parent=Y.b,this.transform_error=r??this.parent?.transform_error??(o=>o),this.#a=tr(()=>{this.#v()},xt)}#T(){try{this.#s=qn(()=>this.#l(this.#e))}catch(e){this.error(e)}}#y(e){const a=this.#n.failed,{reset:s,invoke_onerror:r}=this.#m(e);Fe(r),a&&(this.#r=qn(()=>{a(this.#e,()=>e,()=>s)}))}#m(e){var a=!1,s=!1;const r=()=>{if(!this.#u()){if(a){nt();return}a=!0,s&&pt(),this.#r!==null&&Ze(this.#r,()=>{this.#r=null}),this.#S(()=>{this.#v()})}};return{reset:r,invoke_onerror:()=>{if(!this.#u())try{s=!0,this.#n.onerror?.(e,r),s=!1}catch(l){Ce(l,this.#a&&this.#a.parent)}}}}#u(){return(this.#a.f&(Ln|Pa))!==0}#C(){const e=this.#n.pending;e&&(this.is_pending=!0,this.#o=qn(()=>e(this.#e)),Fe(()=>{if(!this.#u()){var a=this.#t=document.createDocumentFragment(),s=Ue(),r=!1;if(a.append(s),this.#s=this.#S(()=>{try{return qn(()=>this.#l(s))}catch(o){try{this.error(o),r=!0}catch(l){Ce(l,this.#a.parent)}return null}}),this.#s===null){this.#t=null,r&&this.#p(j);return}this.#f===0&&(this.#e.before(a),this.#t=null,Ze(this.#o,()=>{this.#o=null}),this.#p(j))}}))}#v(){try{if(this.is_pending=this.has_pending_snippet(),this.#f=0,this.#h=0,this.#s=qn(()=>{this.#l(this.#e)}),this.#f>0){var e=this.#t=document.createDocumentFragment();fr(this.#s,e);const a=this.#n.pending;this.#o=qn(()=>a(this.#e))}else this.#p(j)}catch(a){this.error(a)}}#p(e){this.is_pending=!1,e.transfer_reactions(this.#g)}defer_effect(e){So(e,this.#g)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#S(e){var a=Y,s=O,r=Jn;ye(this.#a),Un(this.#a),pa(this.#a.ctx);try{return Oe.ensure(),e()}finally{ye(a),Un(s),pa(r)}}#D(e,a){if(!this.has_pending_snippet()){this.parent&&this.parent.#D(e,a);return}this.#f+=e,this.#f===0&&(this.#p(a),this.#o&&Ze(this.#o,()=>{this.#o=null}),this.#t&&(this.#e.before(this.#t),this.#t=null))}update_pending_count(e,a){this.#D(e,a),this.#h+=e,!(!this.#c||this.#d)&&(this.#d=!0,Fe(()=>{this.#d=!1,this.#c&&ha(this.#c,this.#h)}))}get_effect_pending(){return this.#B(),m(this.#c)}error(e){if(e===Co||!this.#n.onerror&&!this.#n.failed)throw e;j?.is_fork?(this.#s&&j.skip_effect(this.#s),this.#o&&j.skip_effect(this.#o),this.#r&&j.skip_effect(this.#r),j.oncommit(()=>{this.#u()||this.#k(e)})):this.#k(e)}#k(e){this.#s&&(_n(this.#s),this.#s=null),this.#o&&(_n(this.#o),this.#o=null),this.#r&&(_n(this.#r),this.#r=null);let a=this.#n.failed;const s=r=>{if(this.#u())return;const{reset:o,invoke_onerror:l}=this.#m(r);l(),a&&!this.#u()&&(this.#r=this.#S(()=>{try{return qn(()=>{var i=Y;i.b=this,i.f|=Fs,a(this.#e,()=>r,()=>o)})}catch(i){return Ce(i,this.#a.parent),null}}))};Fe(()=>{if(!this.#u()){var r;try{r=this.transform_error(e)}catch(o){Ce(o,this.#a&&this.#a.parent);return}r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(s,o=>Ce(o,this.#a&&this.#a.parent)):s(r)}})}}function w(n,e){var a=e==null?"":typeof e=="object"?`${e}`:e;a!==(n[_s]??=n.nodeValue)&&(n[_s]=a,n.nodeValue=`${a}`)}function Yt(n,e){return Qt(n,e)}const za=new Map;function Qt(n,{target:e,anchor:a,props:s={},events:r,context:o,intro:l=!0,transformError:i}){kt();var t=void 0,f=Mt(()=>{var u=a??e.appendChild(Ue());Vt(u,{pending:()=>{}},c=>{Zn({});var p=Jn;o&&(p.c=o),r&&(s.$$events=r),t=n(c,s)||nr(),$n()},i);var h=new Set,d=c=>{for(var p=0;p<c.length;p++){var B=c[p];if(!h.has(B)){h.add(B);var C=Nt(B);for(const S of[e,document]){var g=za.get(S);g===void 0&&(g=new Map,za.set(S,g));var T=g.get(B);T===void 0?(S.addEventListener(B,Sr,{passive:C}),g.set(B,1)):g.set(B,T+1)}}}};return d(Bs(Uo)),xs.add(d),()=>{for(var c of h)for(const C of[e,document]){var p=za.get(C),B=p.get(c);--B==0?(C.removeEventListener(c,Sr),p.delete(c),p.size===0&&za.delete(C)):p.set(c,B)}xs.delete(d),u!==a&&u.parentNode?.removeChild(u)}});return jt.set(t,f),t}let jt=new WeakMap;class qt{anchor;#e=new Map;#i=new Map;#n=new Map;#l=new Set;#a=!0;constructor(e,a=!0){this.anchor=e,this.#a=a}#s=e=>{if(this.#e.has(e)){var a=this.#e.get(e),s=this.#i.get(a);if(s)fs(s),this.#l.delete(a);else{var r=this.#n.get(a);r&&(fs(r.effect),this.#i.set(a,r.effect),this.#n.delete(a),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),s=r.effect)}for(const[o,l]of this.#e){if(this.#e.delete(o),o===e)break;const i=this.#n.get(l);i&&(_n(i.effect),this.#n.delete(l))}for(const[o,l]of this.#i){if(o===a||this.#l.has(o))continue;const i=()=>{if(Array.from(this.#e.values()).includes(o)){var f=document.createDocumentFragment();fr(l,f),f.append(Ue()),this.#n.set(o,{effect:l,fragment:f})}else _n(l);this.#l.delete(o),this.#i.delete(o)};this.#a||!s?(this.#l.add(o),Ze(l,i,!1)):i()}}};#o=e=>{this.#e.delete(e);const a=Array.from(this.#e.values());for(const[s,r]of this.#n)a.includes(s)||(_n(r.effect),this.#n.delete(s))};ensure(e,a){var s=j,r=Po();if(a&&!this.#i.has(e)&&!this.#n.has(e))if(r){var o=document.createDocumentFragment(),l=Ue();o.append(l),this.#n.set(e,{effect:qn(()=>a(l)),fragment:o})}else this.#i.set(e,qn(()=>a(this.anchor)));if(this.#e.set(s,e),r){for(const[i,t]of this.#i)i===e?s.unskip_effect(t):s.skip_effect(t);for(const[i,t]of this.#n)i===e?s.unskip_effect(t.effect):s.skip_effect(t.effect);s.oncommit(this.#s),s.ondiscard(this.#o)}else this.#s(s)}}function Gn(n,e,a=!1){var s=new qt(n),r=a?ua:0;function o(l,i){s.ensure(l,i)}tr(()=>{var l=!1;e((i,t=0)=>{l=!0,o(t,i)}),l||o(-1,null)},r)}function ms(n,e){return e}function Ut(n,e,a){for(var s=[],r=e.length,o,l=e.length,i=0;i<r;i++){let h=e[i];Ze(h,()=>{if(o){if(o.pending.delete(h),o.done.add(h),o.pending.size===0){var d=n.outrogroups;Vs(n,Bs(o.done)),d.delete(o),d.size===0&&(n.outrogroups=null)}}else l-=1},!1)}if(l===0){var t=s.length===0&&a!==null&&n.pending.size===0;if(t){var f=a,u=f.parentNode;Rt(u),u.append(f),n.items.clear()}Vs(n,e,!t)}else o={pending:new Set(e),done:new Set},(n.outrogroups??=new Set).add(o)}function Vs(n,e,a=!0){var s;if(n.pending.size>0){s=new Set;for(const l of n.pending.values())for(const i of l)s.add(n.items.get(i).e)}for(var r=0;r<e.length;r++){var o=e[r];if(s?.has(o)){o.f|=ge;const l=document.createDocumentFragment();fr(o,l)}else _n(e[r],a)}}var Dr;function Hn(n,e,a,s,r,o=null){var l=n,i=new Map,t=(e&Bo)!==0;if(t){var f=n;l=f.appendChild(Ue())}var u=null,h=Do(()=>{var T=a();return io(T)?T:T==null?[]:Bs(T)}),d=new Map,c=!0;function p(T){if((g.effect.f&Ln)===0){g.pending.delete(T);var S=m(h);g.fallback=u,Zt(g,S,l,e,s),u!==null&&(S.length===0?(u.f&ge)===0?fs(u):(u.f^=ge,ka(u,null,l)):Ze(u,()=>{u=null}))}}function B(T){g.pending.delete(T)}var C=tr(()=>{for(var T=m(h),S=T.length,v=new Set,y=j,M=Po(),A=0;A<S;A+=1){var I=T[A],x=s(I,A),G=c?null:i.get(x);G?(G.v&&ha(G.v,I),G.i&&ha(G.i,A),M&&y.unskip_effect(G.e)):(G=$t(i,c?l:Dr??=Ue(),I,x,A,r,e,a),c||(G.e.f|=ge),i.set(x,G)),v.add(x)}if(S===0&&o&&!u&&(c?u=qn(()=>o(l)):(u=qn(()=>o(Dr??=Ue())),u.f|=ge)),S>v.size&&st(),!c)if(d.set(y,v),M){for(const[en,Q]of i)v.has(en)||y.skip_effect(Q.e);y.oncommit(p),y.ondiscard(B)}else p(y);m(h)}),g={effect:C,items:i,pending:d,outrogroups:null,fallback:u};c=!1}function ma(n){for(;n!==null&&(n.f&ue)===0;)n=n.next;return n}function Zt(n,e,a,s,r){var o=(s&Vl)!==0,l=e.length,i=n.items,t=ma(n.effect.first),f,u=null,h,d=[],c=[],p,B,C,g;if(o)for(g=0;g<l;g+=1)p=e[g],B=r(p,g),C=i.get(B).e,(C.f&ge)===0&&(C.nodes?.a?.measure(),(h??=new Set).add(C));for(g=0;g<l;g+=1){if(p=e[g],B=r(p,g),C=i.get(B).e,n.outrogroups!==null)for(const G of n.outrogroups)G.pending.delete(C),G.done.delete(C);if((C.f&Wn)!==0&&(fs(C),o&&(C.nodes?.a?.unfix(),(h??=new Set).delete(C))),(C.f&ge)!==0)if(C.f^=ge,C===t)ka(C,null,a);else{var T=u?u.next:t;C===n.effect.last&&(n.effect.last=C.prev),C.prev&&(C.prev.next=C.next),C.next&&(C.next.prev=C.prev),Ae(n,u,C),Ae(n,C,T),ka(C,T,a),u=C,d=[],c=[],t=ma(u.next);continue}if(C!==t){if(f!==void 0&&f.has(C)){if(d.length<c.length){var S=c[0],v;u=S.prev;var y=d[0],M=d[d.length-1];for(v=0;v<d.length;v+=1)ka(d[v],S,a);for(v=0;v<c.length;v+=1)f.delete(c[v]);Ae(n,y.prev,M.next),Ae(n,u,y),Ae(n,M,S),t=S,u=M,g-=1,d=[],c=[]}else f.delete(C),ka(C,t,a),Ae(n,C.prev,C.next),Ae(n,C,u===null?n.effect.first:u.next),Ae(n,u,C),u=C;continue}for(d=[],c=[];t!==null&&t!==C;)(f??=new Set).add(t),c.push(t),t=ma(t.next);if(t===null)continue}(C.f&ge)===0&&d.push(C),u=C,t=ma(C.next)}if(n.outrogroups!==null){for(const G of n.outrogroups)G.pending.size===0&&(Vs(n,Bs(G.done)),n.outrogroups?.delete(G));n.outrogroups.size===0&&(n.outrogroups=null)}if(t!==null||f!==void 0){var A=[];if(f!==void 0)for(C of f)(C.f&Wn)===0&&A.push(C);for(;t!==null;)(t.f&Wn)===0&&t!==n.fallback&&A.push(t),t=ma(t.next);var I=A.length;if(I>0){var x=(s&Bo)!==0&&l===0?a:null;if(o){for(g=0;g<I;g+=1)A[g].nodes?.a?.measure();for(g=0;g<I;g+=1)A[g].nodes?.a?.fix()}Ut(n,A,x)}}o&&Fe(()=>{if(h!==void 0)for(C of h)C.nodes?.a?.apply()})}function $t(n,e,a,s,r,o,l,i){var t=(l&Ol)!==0?(l&zl)===0?Mo(a,!1,!1):Xe(a):null,f=(l&xl)!==0?Xe(r):null;return{v:t,i:f,e:qn(()=>(o(e,t??a,f??r,i),()=>{n.delete(s)}))}}function ka(n,e,a){if(n.nodes)for(var s=n.nodes.start,r=n.nodes.end,o=e&&(e.f&ge)===0?e.nodes.start:a;s!==null;){var l=Ka(s);if(o.before(s),s===r)return;s=l}}function Ae(n,e,a){e===null?n.effect.first=a:e.next=a,a===null?n.effect.last=e:a.prev=e}const kr=[...` 	
\r\f \v\uFEFF`];function Xt(n,e,a){var s=n==null?"":""+n;if(e&&(s=s?s+" "+e:e),a){for(var r of Object.keys(a))if(a[r])s=s?s+" "+r:r;else if(s.length)for(var o=r.length,l=0;(l=s.indexOf(r,l))>=0;){var i=l+o;(l===0||kr.includes(s[l-1]))&&(i===s.length||kr.includes(s[i]))?s=(l===0?"":s.substring(0,l))+s.substring(i+1):l=i}}return s===""?null:s}function ni(n,e){return n==null?null:String(n)}function ve(n,e,a,s,r,o){var l=n[Is];if(l!==a||l===void 0){var i=Xt(a,s,o);i==null?n.removeAttribute("class"):n.className=i,n[Is]=a}else if(o&&r!==o)for(var t in o){var f=!!o[t];(r==null||f!==!!r[t])&&n.classList.toggle(t,f)}return o}function be(n,e,a,s){var r=n[Ns];if(r!==e){var o=ni(e);o==null?n.removeAttribute("style"):n.style.cssText=o,n[Ns]=e}return s}const ei=Symbol("is custom element"),ai=Symbol("is html");function ce(n,e,a,s){var r=si(n),o=r[e];o!==(r[e]=a)&&(e==="loading"&&(n[Kl]=a),a==null?n.removeAttribute(e):typeof a!="string"&&ri(n).has(e)?n[e]=a:n.setAttribute(e,a))}function si(n){return n[ho]??={[ei]:n.nodeName.includes("-"),[ai]:n.namespaceURI===$l}}var Rr=new Map;function ri(n){var e=n.getAttribute("is")||n.nodeName,a=Rr.get(e);if(a)return a;Rr.set(e,a=new Set);for(var s,r=n,o=Element.prototype;o!==r;){s=Wl(r);for(var l in s)s[l].set&&l!=="innerHTML"&&l!=="textContent"&&l!=="innerText"&&a.add(l);r=fo(r)}return a}function ws(n,e){return n===e||n?.[Ma]===e}function oi(n=nr(),e,a,s){var r=Jn.r,o=Y;return At(()=>{var l,i;return No(()=>{l=i,i=[],xa(()=>{ws(a(...i),n)||(e(n,...i),l&&ws(a(...l),n)&&e(null,...l))})}),()=>{let t=o;for(;t!==r&&t.parent!==null&&t.parent.f&Pa;)t=t.parent;const f=()=>{i&&ws(a(...i),n)&&e(null,...i)},u=t.teardown;t.teardown=()=>{f(),u?.()}}}),n}function Zo(n,e,a){if(n==null)return e(void 0),qe;const s=xa(()=>n.subscribe(e,a));return s.unsubscribe?()=>s.unsubscribe():s}const sa=[];function li(n,e){return{subscribe:ze(n,e).subscribe}}function ze(n,e=qe){let a=null;const s=new Set;function r(i){if(mo(n,i)&&(n=i,a)){const t=!sa.length;for(const f of s)f[1](),sa.push(f,n);if(t){for(let f=0;f<sa.length;f+=2)sa[f][0](sa[f+1]);sa.length=0}}}function o(i){r(i(n))}function l(i,t=qe){const f=[i,t];return s.add(f),s.size===1&&(a=e(r,o)||qe),i(n),()=>{s.delete(f),s.size===0&&a&&(a(),a=null)}}return{set:r,update:o,subscribe:l}}function ti(n){let e;return Zo(n,a=>e=a)(),e}let Ya=!1,zs=Symbol("unmounted");function xe(n,e,a){const s=a[e]??={store:null,source:Mo(void 0),unsubscribe:qe};if(s.store!==n&&!(zs in a))if(s.unsubscribe(),s.store=n??null,n==null)s.source.v=void 0,s.unsubscribe=qe;else{var r=!0;s.unsubscribe=Zo(n,o=>{r?s.source.v=o:W(s.source,o)}),r=!1}return n&&zs in a?ti(n):m(s.source)}function ii(){const n={};function e(){Fo(()=>{for(var a in n)n[a].unsubscribe();$s(n,zs,{enumerable:!1,value:!0})})}return[n,e]}function fi(n){var e=Ya;try{return Ya=!1,[n(),Ya]}finally{Ya=e}}function je(n,e,a,s){var r=!0,o=(a&jl)!==0,l=(a&ql)!==0,i=s,t=!0,f=void 0,u=()=>l&&r?(f??=Fa(s),m(f)):(t&&(t=!1,i=l?xa(s):s),i);let h;if(o){var d=Ma in n||Hl in n;h=ia(n,e)?.set??(d&&e in n?v=>n[e]=v:void 0)}var c,p=!1;o?[c,p]=fi(()=>n[e]):c=n[e],c===void 0&&s!==void 0&&(c=u(),h&&(it(),h(c)));var B;if(B=()=>{var v=n[e];return v===void 0?u():(t=!0,v)},(a&Ql)===0)return B;if(h){var C=n.$$legacy;return(function(v,y){return arguments.length>0?((!y||C||p)&&h(y?B():v),v):B()})}var g=!1,T=((a&Yl)!==0?Fa:Do)(()=>(g=!1,B()));o&&m(T);var S=Y;return(function(v,y){if(arguments.length>0){const M=y?m(T):o?Ie(v):v;return W(T,M),g=!0,i!==void 0&&(i=M),v}return Je&&g||(S.f&Ln)!==0?T.v:m(T)})}function ci(n){Jn===null&&et(),lr(()=>{const e=xa(n);if(typeof e=="function")return e})}const ui="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(ui);const pi=`name,pos,team,ovr,spd,str
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
`,hi=`name,pos,team,ovr,spd,str
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
`,di=`pid,name,pos,team
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
`,Bi=/^([a-z][a-z0-9]*)-p(\d{5,})$/;function Ci(n){const e=Bi.exec(n);return e?{sport:e[1],n:+e[2]}:null}const gi="pid,name,pos,team",$o=(n,e,a)=>`${n}|${e}|${a}`,mi="nfl";function Ti(n,e=mi){const a=n.split(/\r?\n/).filter(l=>l.trim().length>0);if(a.length===0||a[0].trim()!==gi)throw new Error("player-ids csv: unexpected header: "+(a[0]??"(empty)"));const s=[],r=new Set,o=new Set;for(let l=1;l<a.length;l++){const i=/^([a-z][a-z0-9]*-p\d{5,}),(.*),([A-Z]+),([^,]+)$/.exec(a[l]);if(!i)throw new Error(`player-ids csv line ${l+1}: cannot parse: ${a[l]}`);const t={pid:i[1],name:i[2],pos:i[3],team:i[4]};if(Ci(t.pid)?.sport!==e)throw new Error(`player-ids csv line ${l+1}: ${t.pid} is not a ${e} id`);if(r.has(t.pid))throw new Error("player-ids csv: duplicate pid "+t.pid);const f=$o(t.name,t.pos,t.team);if(o.has(f))throw new Error("player-ids csv: duplicate key "+f);r.add(t.pid),o.add(f),s.push(t)}return s}function vi(n){return new Map(n.map(e=>[$o(e.name,e.pos,e.team),e.pid]))}const Xo={QB:"QB",HB:"RB",FB:"FB",WR:"WR",TE:"TE",LT:"OT",RT:"OT",LG:"OG",RG:"OG",C:"C",DT:"DT",LEDG:"EDGE",REDG:"EDGE",MIKE:"ILB",WILL:"OLB",SAM:"OLB",CB:"CB",SS:"SS",FS:"FS",K:"K",P:"P",LS:"LS"},Si=n=>Xo[n];function Lr(n,e){const a=[],s=n.split(/\r?\n/).filter(r=>r.trim().length>0);if(s[0].trim()!=="name,pos,team,ovr,spd,str")throw new Error("players csv: unexpected header: "+s[0]);for(let r=1;r<s.length;r++){const o=/^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/.exec(s[r]);if(!o)throw new Error(`players csv line ${r+1}: cannot parse: ${s[r]}`);const[,l,i,t,f,u,h]=o,d=Xo[i];if(!d)throw new Error(`players csv line ${r+1}: unknown position ${i}`);a.push({id:`${l}|${i}|${t}`,name:l,pos:i,role:d,team:t,ovr:+f,spd:+u,str:+h,freeAgent:e})}return a}function yi(n,e,a){const s=[...Lr(n,!1),...Lr(e,!0)],r=vi(Ti(a)),o=new Set,l=new Set;return s.map(i=>{if(l.has(i.id))throw new Error("duplicate player "+i.id);l.add(i.id);const t=r.get(i.id);if(!t)throw new Error("no stable id for "+i.id+" (run tools/player-ids.ts sync)");if(o.has(t))throw new Error("duplicate pid "+t);return o.add(t),{...i,id:t}})}function nl(n){let e=2166136261;for(let a=0;a<n.length;a++)e^=n.charCodeAt(a),e=Math.imul(e,16777619)>>>0;return e>>>0}function na(n){let e=n>>>0,a=null;const s=()=>{e=e+1831565813>>>0;let r=e;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296};return{next:s,int:(r,o)=>r+Math.floor(s()*(o-r+1)),normal:()=>{if(a!==null){const i=a;return a=null,i}let r=0,o=0;for(;r===0;)r=s();o=s();const l=Math.sqrt(-2*Math.log(r));return a=l*Math.sin(2*Math.PI*o),l*Math.cos(2*Math.PI*o)},pick:r=>r[Math.floor(s()*r.length)],fork:r=>na((n^nl(r))>>>0)}}function Di(n,e){return(n>>>0^nl(e))>>>0}async function ki(n){const e=await globalThis.crypto.subtle.digest("SHA-256",new TextEncoder().encode(n));return[...new Uint8Array(e)].map(a=>a.toString(16).padStart(2,"0")).join("")}const el="sim",Ri=/^[a-z][a-z0-9]*$/,Li=/^[a-z0-9][a-z0-9-]*$/i,wi=["theme","settings","profile"];function al(n,e){if(!Ri.test(n))throw new Error("keys: bad sport id "+n);if(e===""||!e.split(":").every(a=>Li.test(a)))throw new Error("keys: bad key name "+e);if(wi.includes(n))throw new Error("keys: a sport cannot be called "+n);return`${el}:${n}:${e}`}const Ei=n=>n.startsWith(el+":"),Ji=["A","B","C"];function Mi(n){const e=n.split(":"),a=e[3];return e.length<4||e[2]!=="slot"||a===void 0?null:Ji.includes(a)?a:null}const sl=1,Ai=["nfl"],rl={nfl:["draft","week","season"]},ol=["A","B","C"],Qn=n=>({ok:!1,reason:"corrupt",message:n}),wr=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),Er=n=>typeof n=="number"&&Number.isInteger(n),Ge=n=>typeof n=="string";function ll(n){if(!wr(n))return Qn("envelope: not an object");const e=n.sport===void 0?"nfl":n.sport;return!Ge(e)||!Ai.includes(e)?Qn("envelope: unknown sport"):!Ge(n.kind)||!rl[e].includes(n.kind)?Qn("envelope: bad kind for "+e):!Er(n.schemaVersion)||n.schemaVersion<1?Qn("envelope: bad schemaVersion"):n.schemaVersion>sl?{ok:!1,reason:"newer-version",message:"envelope: written by a newer build (schema "+n.schemaVersion+")"}:!Ge(n.engineVersion)||!n.engineVersion?Qn("envelope: bad engineVersion"):!Ge(n.dataVersion)||!n.dataVersion?Qn("envelope: bad dataVersion"):!Ge(n.saveId)||!n.saveId?Qn("envelope: bad saveId"):!Er(n.saveRevision)||n.saveRevision<1?Qn("envelope: bad saveRevision"):!Ge(n.createdAt)||Number.isNaN(Date.parse(n.createdAt))?Qn("envelope: bad createdAt"):!Ge(n.slot)||!ol.includes(n.slot)?Qn("envelope: bad slot"):!Ge(n.savedAt)||Number.isNaN(Date.parse(n.savedAt))?Qn("envelope: bad savedAt"):wr(n.payload)?{ok:!0,value:{...n,sport:e}}:Qn("envelope: payload is not an object")}function bi(n,e,a,s,r,o){if(!rl[n].includes(e))throw new Error(`envelope: ${n} has no save kind '${e}'`);const l={sport:n,kind:e,schemaVersion:sl,engineVersion:s.engineVersion,dataVersion:s.dataVersion,saveId:s.saveId,saveRevision:s.saveRevision,createdAt:s.createdAt,slot:a,savedAt:o.toISOString(),payload:r};return Ys(l,"envelope"),JSON.stringify(l)}function Ys(n,e){if(!(n===null||typeof n=="string"||typeof n=="boolean")){if(typeof n=="number"){if(!Number.isFinite(n))throw new Error("not plain JSON at "+e+": non-finite number");return}if(Array.isArray(n)){n.forEach((a,s)=>Ys(a,e+"["+s+"]"));return}if(typeof n=="object"&&Object.getPrototypeOf(n)===Object.prototype){for(const[a,s]of Object.entries(n))Ys(s,e+"."+a);return}throw new Error("not plain JSON at "+e+": "+(n===void 0?"undefined":typeof n=="object"?"class instance, Map or Set":typeof n))}}const tl="nfl",Cn=n=>({ok:!1,reason:"corrupt",message:n}),Pe=n=>typeof n=="object"&&n!==null&&!Array.isArray(n),$=n=>typeof n=="number"&&Number.isInteger(n),mn=n=>typeof n=="string",Gi=n=>Pe(n)&&mn(n.id)&&mn(n.name)&&mn(n.pos)&&mn(n.role)&&mn(n.team)&&$(n.ovr)&&$(n.spd)&&$(n.str)&&typeof n.freeAgent=="boolean",Jr=n=>Array.isArray(n)&&n.every(e=>Pe(e)&&$(e.week)&&mn(e.home)&&mn(e.away)&&$(e.hs)&&$(e.as));function il(n){return $(n.seed)?!$(n.userTeam)||n.userTeam<0||n.userTeam>31?"draft: bad userTeam":!Array.isArray(n.picks)||!n.picks.every(e=>Pe(e)&&$(e.overall)&&$(e.team)&&mn(e.pid)&&mn(e.slot))?"draft: bad picks":!Array.isArray(n.pool)||!n.pool.every(e=>Array.isArray(e)&&e.length===8&&mn(e[0])&&mn(e[1])&&mn(e[2])&&mn(e[3])&&$(e[4])&&$(e[5])&&$(e[6])&&(e[7]===0||e[7]===1))?"draft: bad pool":null:"payload: bad seed"}function Wi(n){const e=n.payload;if(!$(e.seed))return Cn("payload: bad seed");if(n.kind==="draft"){const a=il(e);if(a)return Cn(a)}else{if(!$(e.year)||!$(e.run)||e.run<0)return Cn(n.kind+": bad year/run");if(!mn(e.userTeam))return Cn(n.kind+": bad userTeam");if(!Array.isArray(e.roster)||e.roster.length!==32||!e.roster.every(Gi))return Cn(n.kind+": roster must be 32 frozen players");if(typeof e.statsRecorded!="boolean")return Cn(n.kind+": bad statsRecorded");if(n.kind==="week"){if(!$(e.gameSeed)||!$(e.nextWeek)||e.nextWeek<1)return Cn("week: bad gameSeed/nextWeek");if(!Pe(e.ratings))return Cn("week: bad ratings");if(!Array.isArray(e.schedule)||!e.schedule.every(a=>Pe(a)&&$(a.week)&&mn(a.home)&&mn(a.away)&&mn(a.kind)))return Cn("week: bad schedule");if(!Jr(e.scores))return Cn("week: bad scores");if(e.plan!==null&&!Pe(e.plan))return Cn("week: bad plan");if(e.prevRank!==void 0&&!(Pe(e.prevRank)&&Object.values(e.prevRank).every($)))return Cn("week: bad prevRank");if(e.homeField!==void 0&&!(typeof e.homeField=="number"&&Number.isFinite(e.homeField)))return Cn("week: bad homeField")}else{if(!Array.isArray(e.table)||!e.table.every(a=>Pe(a)&&mn(a.team)&&$(a.w)&&$(a.l)&&$(a.t)&&$(a.pf)&&$(a.pa)))return Cn("season: bad table");if(!Jr(e.userResults))return Cn("season: bad userResults");if(!mn(e.champion))return Cn("season: bad champion");if(!["missed-playoffs","wild-card","divisional","conference","super-bowl-loss","champion"].includes(e.userOutcome))return Cn("season: bad userOutcome")}}return{ok:!0,value:n}}function Pi(n,e,a,s,r){return bi(tl,n,e,a,s,r)}function fl(n){let e;try{e=JSON.parse(n)}catch{return Cn("envelope: not JSON")}const a=ll(e);return a.ok?a.value.sport!==tl?Cn("envelope: this is a "+a.value.sport+" save, not an nfl save"):Wi(a.value):a}function Fi(n,e){const a=Mi(e);return a&&a!==n?"envelope: slot "+n+" written under "+e+" (that key is slot "+a+")":null}const Qs={QB:{FS:10},RB:{FB:2,WR:4,TE:6},FB:{RB:4,TE:4},WR:{RB:4,TE:4,SS:4,FS:4,NICKEL:4,DIME:4,CB:6},TE:{WR:2,FB:2,RB:4,C:6,OG:6,OT:6,EDGE:6,DT:6,ILB:6,OLB:6,SS:6,FS:6,NICKEL:6,DIME:6},OT:{OG:0,C:0,DT:4,FB:4,RB:6},OG:{C:0,OT:4,DT:4,FB:4,RB:6},C:{OG:0,OT:4,DT:4,FB:4,RB:6},DT:{OG:4,C:4,EDGE:4,FB:4,OT:6,ILB:4,OLB:4,RB:6},EDGE:{DT:2,OLB:0,ILB:4,FB:4,TE:6,RB:6,NICKEL:6},ILB:{ILB:0,OLB:0,DT:4,FB:4,EDGE:6,TE:6,SS:6,FS:6,NICKEL:6,DIME:6},OLB:{OLB:0,ILB:2,EDGE:4,NICKEL:4,DT:6,TE:6,SS:6,FS:6,FB:6,DIME:6},SS:{NICKEL:0,DIME:0,FS:2,OLB:4,CB:6,ILB:6,WR:6,TE:6,RB:6,FB:6},FS:{NICKEL:0,DIME:0,SS:2,CB:4,WR:4,ILB:4,OLB:4,TE:6,RB:6},CB:{FS:0,NICKEL:0,DIME:0,SS:2,WR:4,ILB:6,OLB:4,TE:6,RB:6},K:{P:0},P:{K:4},LS:{}},Mr=8;function Ii(n){if(n==="DT"||n==="EDGE")return 0;const e=Qs[n].DT,a=Qs[n].EDGE;return e===void 0?a:a===void 0?e:Math.min(e,a)}function Se(n,e){if(n===e)return{penalty:0,emergency:!1,legal:!0};const a=e==="DL5"?Ii(n):Qs[n][e];return a!==void 0?{penalty:a,emergency:!1,legal:!0}:n==="QB"?{penalty:Mr,emergency:!0,legal:!1}:{penalty:Mr,emergency:!0,legal:!0}}function R(n,e){const a=n[e];if(a===void 0)throw new Error(`at(): no element at index ${e} (length ${n.length})`);return a}function Ra(n,e){const a=n[e];if(a===void 0)throw new Error(`need(): no entry for key "${e}"`);return a}const De=[{id:"QB",weight:1e3,dest:"QB",unit:"offense"},{id:"WR1",weight:650,dest:"WR",unit:"offense"},{id:"OT1",weight:500,dest:"OT",unit:"offense"},{id:"OT2",weight:300,dest:"OT",unit:"offense"},{id:"WR2",weight:400,dest:"WR",unit:"offense"},{id:"C",weight:150,dest:"C",unit:"offense"},{id:"OG1",weight:400,dest:"OG",unit:"offense"},{id:"OG2",weight:250,dest:"OG",unit:"offense"},{id:"TE1",weight:250,dest:"TE",unit:"offense"},{id:"RB1",weight:250,dest:"RB",unit:"offense"},{id:"WR3",weight:100,dest:"WR",unit:"offense"},{id:"RB2",weight:100,dest:"RB",unit:"offense"},{id:"TE2",weight:150,dest:"TE",unit:"offense"},{id:"FB",weight:25,dest:"FB",unit:"offense"},{id:"TE3",weight:50,dest:"TE",unit:"offense"},{id:"WR4",weight:50,dest:"WR",unit:"offense"},{id:"DE1",weight:650,dest:"EDGE",unit:"defense"},{id:"DT1",weight:500,dest:"DT",unit:"defense"},{id:"DE2",weight:300,dest:"EDGE",unit:"defense"},{id:"DT2",weight:300,dest:"DT",unit:"defense"},{id:"DL5",weight:150,dest:"DL5",unit:"defense"},{id:"MIKE",weight:300,dest:"ILB",unit:"defense"},{id:"WILL",weight:150,dest:"OLB",unit:"defense"},{id:"SAM",weight:100,dest:"OLB",unit:"defense"},{id:"CB1",weight:400,dest:"CB",unit:"defense"},{id:"CB2",weight:250,dest:"CB",unit:"defense"},{id:"CB3",weight:100,dest:"NICKEL",unit:"defense"},{id:"DIME",weight:50,dest:"DIME",unit:"defense"},{id:"FS",weight:300,dest:"FS",unit:"defense"},{id:"SS",weight:300,dest:"SS",unit:"defense"},{id:"K",weight:50,dest:"K",unit:"special"},{id:"P",weight:50,dest:"P",unit:"special"}],Ga=De.map(n=>n.id),js=Object.fromEntries(De.map(n=>[n.id,n.weight])),Ni={WR1:"WR1",MIKE:"MIKE",WILL:"WILL",SAM:"SAM",CB3:"Nickel",DE1:"DE1",DE2:"DE2"};function cl(n){return De.map(e=>{const a={slot:e.id,dest:e.dest,row:e.id,weight:e.weight,label:Ni[e.id]??e.id};if(n==="4-3")return a;switch(e.id){case"DT1":return{...a,label:"NT"};case"MIKE":return{...a,label:"ILB1"};case"DT2":return{slot:"DT2",dest:"ILB",row:"DT2",weight:js.DT2,label:"ILB2"};case"WILL":return{slot:"WILL",dest:"OLB",row:"WILL",weight:js.WILL,label:"OLB1"};case"SAM":return{...a,label:"OLB2"};default:return a}})}const _a=32,_i=Ga.length,Ba=Object.fromEntries(De.map(n=>[n.id,n.dest])),ul=n=>n==="NICKEL"||n==="DIME"?"CB":n==="DL5"?"DT":n,Hi={topFloor:5,topFloorRounds:4,midFloor:10,midFloorRounds:8,kpFirstRound:6,noiseMax:1.5,missMax:.6,biasSd:.5,hyperP:.15,replFloor:72};function Ki(n=_a,e=_i){const a=[];for(let s=0;s<e;s++)for(let r=0;r<n;r++)a.push(s%2===0?r:n-1-r);return a}const Oi=(n,e)=>e.ovr-n.ovr||(n.id<e.id?-1:n.id>e.id?1:0),xi=Array.from(new Set(De.map(n=>n.dest)));function Vi(n,e,a=Hi,s=Ki()){const r=n.filter(i=>i.role!=="LS").slice().sort(Oi),o=e.fork("traits"),l=Array.from({length:_a},()=>({noise:.05+o.next()*(a.noiseMax-.05),miss:o.next()*a.missMax,bias:Object.fromEntries(xi.map(i=>{const t=o.next();return[i,t<a.hyperP/2?.05+o.next()*.3:t<a.hyperP?2+o.next()*3:Math.exp(a.biasSd*o.normal())]}))}));return{cfg:a,order:s,pos:0,pool:r,rosters:Array.from({length:_a},()=>({})),traits:l,log:[],repl:{},replAt:-99}}const Ts=n=>Math.floor(n.pos/_a)+1,Va=n=>Ga.filter(e=>!n[e]);function zi(n){if(n.pos-n.replAt<6)return n.repl;const e={};for(const r of n.rosters)for(const o of Va(r)){const l=ul(Ba[o]);e[l]=(e[l]??0)+1}const a={};for(const r of n.pool)(a[r.role]??=[]).push(r.ovr);const s={};for(const r of Object.keys(e)){const o=a[r]??[];s[r]=o.length?R(o,Math.min(e[r]??1,o.length)-1):0}return n.repl=s,n.replAt=n.pos,s}function qs(n,e){const a=Va(R(n.rosters,e)),s=zi(n),r={},o=[],l=Ts(n);for(const i of n.pool)if(!((r[i.role]=(r[i.role]??0)+1)>16)&&!((i.role==="K"||i.role==="P")&&l<n.cfg.kpFirstRound))for(const f of a){const u=Se(i.role,Ba[f]);if(!u.legal||u.emergency)continue;const h=i.ovr-u.penalty,d=Math.max(s[ul(Ba[f])]??0,n.cfg.replFloor);o.push({player:i,slot:f,eff:h,wins:js[f]*(h-d)})}return o}function Yi(n){const e=n.pool.length?R(n.pool,0).ovr:0,a=Ts(n),s=n.cfg;return a<=s.topFloorRounds?e-s.topFloor:a<=s.midFloorRounds?e-s.midFloor:-1/0}function pl(n,e,a){const s=R(n.traits,e),r=Yi(n);let o=qs(n,e).filter(f=>f.player.ovr>=r);if(o.length||(o=qs(n,e)),!o.length)return Qi(n,e);const l=o.map(f=>({c:f,v:f.wins*(s.bias[Ba[f.slot]]??1)*Math.max(.02,1+s.noise*a.normal())+.002*f.player.ovr}));l.sort((f,u)=>u.v-f.v);let i=0;l.length>8&&a.next()<s.miss&&(i=Math.min(l.length-1,3+Math.min(9,Math.floor(Math.abs(a.normal())*4))));const t=R(l,i).c;return{player:t.player,slot:t.slot}}function Qi(n,e){const a=Va(R(n.rosters,e));for(const s of n.pool)for(const r of a)if(Se(s.role,Ba[r]).legal)return{player:s,slot:r};throw new Error("draft: no legal pick for team "+e)}function vs(n,e,a,s){if(n.order[n.pos]!==e)throw new Error(`draft: it is not team ${e}'s pick`);if(R(n.rosters,e)[s])throw new Error("draft: spot already filled "+s);const r=n.pool.findIndex(i=>i.id===a.id);if(r<0)throw new Error("draft: player already taken "+a.id);if(!Se(a.role,Ba[s]).legal)throw new Error("draft: illegal fit");const o=R(n.pool,0).ovr;n.pool.splice(r,1),R(n.rosters,e)[s]=a;const l={overall:n.pos+1,round:Ts(n),pickInRound:n.pos%_a+1,team:e,slot:s,player:a,ovrGap:o-a.ovr};return n.log.push(l),n.pos++,l}const hl=Object.fromEntries(De.map(n=>[n.id,n.dest])),cr=new Set(De.map(n=>n.id));function ji(n){return n.filter(e=>e.role!=="LS").map(e=>[e.id,e.name,e.pos,e.team,e.ovr,e.spd,e.str,e.freeAgent?1:0])}function dl(n){return n.map(([e,a,s,r,o,l,i,t])=>{const f=Si(s);if(!f)throw new Error("save: unknown position "+s);return{id:e,name:a,pos:s,role:f,team:r,ovr:o,spd:l,str:i,freeAgent:t===1}})}function qi(n){if(!n||typeof n!="object"||Array.isArray(n))throw new Error("save: not an object");const e=il(n);if(e)throw new Error("save: "+e);const a=n;if(a.picks.length>1024)throw new Error("save: too many picks");if(!a.picks.every(s=>cr.has(s.slot)))throw new Error("save: bad pick slot");return{seed:a.seed,userTeam:a.userTeam,picks:a.picks.map(s=>({overall:s.overall,team:s.team,pid:s.pid,slot:s.slot})),pool:a.pool.map(s=>[...s])}}const Qa=(n,e,a,s)=>({seed:e,userTeam:a,pool:s,picks:n.log.map(r=>({overall:r.overall,team:r.team,pid:r.player.id,slot:r.slot}))});function Ta(n){const e=Vi(dl(n.pool),na(n.seed).fork("draft"));for(const a of n.picks){if(e.pos>=e.order.length)throw new Error("save: more picks than the draft has");if(a.overall!==e.pos+1||a.team!==e.order[e.pos])throw new Error("save: pick "+a.overall+" is out of order");const s=e.pool.find(o=>o.id===a.pid);if(!s)throw new Error("restore: player not available: "+a.pid);const r=cr.has(a.slot)?hl[a.slot]:void 0;if(!r||!Se(s.role,r).legal)throw new Error("restore: illegal fit");vs(e,a.team,s,a.slot)}return e}function Es(n,e,a){const s=na(e).fork("cpu");for(;n.pos<n.order.length;){const r=n.order[n.pos];if(r===void 0||r===a)break;const o=pl(n,r,s.fork("p"+n.pos));vs(n,r,o.player,o.slot)}}function Ui(n){let e={record:null,draft:null,status:"idle",error:null};const a=new Set,s=l=>{e=l,a.forEach(i=>i(e))},r=(l,i)=>{const t=Ta(i);return{record:i,draft:t,status:t.pos>=t.order.length?"done":"drafting",error:null}};return{getState:()=>e,dispatch:l=>{try{if(l.type==="START"){if(!Number.isInteger(l.seed)||!Number.isInteger(l.userTeam)||l.userTeam<0||l.userTeam>31)throw new Error("start: bad seed or team");const i=ji(n),t=Ta({seed:l.seed,userTeam:l.userTeam,picks:[],pool:i});Es(t,l.seed,l.userTeam),s(r(t,Qa(t,l.seed,l.userTeam,i)))}else if(l.type==="LOAD"){const i=qi(l.record),t=Ta(i);Es(t,i.seed,i.userTeam),s(r(t,Qa(t,i.seed,i.userTeam,i.pool)))}else{if(!e.record||!e.draft)throw new Error("no draft in progress");if(l.type==="PICK"){const{record:i,draft:t}=e;if(t.pos>=t.order.length||t.order[t.pos]!==i.userTeam)throw new Error("it is not your pick");if(!cr.has(l.slot))throw new Error("bad slot");const f=Ta(i),u=f.pool.find(d=>d.id===l.playerId);if(!u)throw new Error("player not available: "+l.playerId);const h=hl[l.slot];if(!h||!Se(u.role,h).legal)throw new Error("illegal fit");vs(f,i.userTeam,u,l.slot),Es(f,i.seed,i.userTeam),s(r(f,Qa(f,i.seed,i.userTeam,i.pool)))}else if(l.type==="UNDO"){const i=e.record,t=i.picks.map(h=>h.team).lastIndexOf(i.userTeam);if(t<0)throw new Error("nothing to undo");const f={...i,picks:i.picks.slice(0,t)},u=Ta(f);s(r(u,Qa(u,i.seed,i.userTeam,i.pool)))}}}catch(i){console.warn("store: action rejected:",l.type,i.message),s({...e,error:i.message})}},subscribe:l=>(a.add(l),()=>a.delete(l))}}al("nfl","draft");function Ar(n){return Ui(n)}function br(n){return li(n.getState(),e=>n.subscribe(e))}const cs={measured:"Model Value",balance:"Game balance",owner:"Owner preset"};let Re={mode:"measured",locked:!1};const ja=new Set,Ee={get(){return Re},set(n){Re.locked||(Re={...Re,mode:n},ja.forEach(e=>e(Re)))},lock(){Re={...Re,locked:!0},ja.forEach(n=>n(Re))},subscribe(n){return ja.add(n),n(Re),()=>ja.delete(n)}};function Zi(n){return{...n,pool:n.pool.slice(),rosters:n.rosters.map(e=>({...e})),log:[],repl:{...n.repl}}}function $i(n,e,a,s=30){if(n.order[n.pos]!==e)throw new Error("goneOdds: it is not the user's pick");let r=n.pos+1;for(;r<n.order.length&&n.order[r]!==e;)r++;const o=r-(n.pos+1),l=new Map;if(o<=0||r>=n.order.length)return{picksBetween:Math.max(0,o),sims:s,gone:l};for(let i=0;i<s;i++){const t=Zi(n);t.pos=n.pos+1;const f=a.fork("gone"+i);for(let u=t.pos;u<r;u++){const h=t.order[u],d=pl(t,h,f);vs(t,h,d.player,d.slot)}for(const u of t.log)l.set(u.player.id,(l.get(u.player.id)??0)+1)}for(const[i,t]of l)l.set(i,t/s);return{picksBetween:o,sims:s,gone:l}}const Xi=(n,e)=>n.gone.get(e)??0;function n0(n){if(!Number.isFinite(n))throw new Error("goneDisplay: not a number: "+n);const e=Math.round(Math.min(1,Math.max(0,n))*100);return Math.min(99,e)}function e0(n){if(!Number.isFinite(n))throw new Error("showInt: not a number: "+n);const e=Math.sign(n)*Math.round(Math.abs(n));return String(e===0?0:e)}function Gr(n,e){if(!Number.isFinite(e))throw new Error("showDecimal: not a number: "+e);const a=Math.sign(e)*Math.round(Math.abs(e)*10)/10;return(a===0?0:a).toFixed(1)}const Be=["East","North","South","West"],We=(n,e,a)=>a.map(s=>({name:s,conf:n,div:e})),Rn=[...We("AFC","East",["Buffalo Bills","Miami Dolphins","New England Patriots","NY Jets"]),...We("AFC","North",["Baltimore Ravens","Cincinnati Bengals","Cleveland Browns","Pittsburgh Steelers"]),...We("AFC","South",["Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Tennessee Titans"]),...We("AFC","West",["Denver Broncos","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers"]),...We("NFC","East",["Dallas Cowboys","NY Giants","Philadelphia Eagles","Washington Commanders"]),...We("NFC","North",["Chicago Bears","Detroit Lions","Green Bay Packers","Minnesota Vikings"]),...We("NFC","South",["Atlanta Falcons","Carolina Panthers","New Orleans Saints","Tampa Bay Buccaneers"]),...We("NFC","West",["Arizona Cardinals","Los Angeles Rams","San Francisco 49ers","Seattle Seahawks"])],ur=Object.fromEntries(Rn.map(n=>[n.name,n]));function ea(n,e){return Rn.filter(a=>a.conf===n&&a.div===e).map(a=>a.name)}function a0(n){const e=n.length;for(const t of n)if(t.length!==e)throw new Error("hungarian: matrix must be square");const a=Number.POSITIVE_INFINITY,s=new Array(e+1).fill(0),r=new Array(e+1).fill(0),o=new Array(e+1).fill(0),l=new Array(e+1).fill(0);for(let t=1;t<=e;t++){o[0]=t;let f=0;const u=new Array(e+1).fill(a),h=new Array(e+1).fill(!1);do{h[f]=!0;const d=o[f];let c=a,p=0;for(let B=1;B<=e;B++){if(h[B])continue;const C=n[d-1][B-1]-s[d]-r[B];C<u[B]&&(u[B]=C,l[B]=f),u[B]<c&&(c=u[B],p=B)}for(let B=0;B<=e;B++)h[B]?(s[o[B]]+=c,r[B]-=c):u[B]-=c;f=p}while(o[f]!==0);do{const d=l[f];o[f]=o[d],f=d}while(f!==0)}const i=new Array(e).fill(-1);for(let t=1;t<=e;t++)o[t]>0&&(i[o[t]-1]=t-1);return i}const Us=70,s0=1e12,r0=1e7,o0=1e5,l0=.00254/20;function t0(n,e,a,s=0){const r=n.length,o=e.length,l=r+o,i=[];for(let d=0;d<l;d++){const c=new Array(l).fill(0);for(let p=0;p<o;p++)if(d<r){const B=Se(n[d].role,e[p].dest);c[p]=B.legal?-(r0+e[p].weight*(n[d].ovr-B.penalty))+(B.emergency?o0:0)-(a?.get(n[d].id)===e[p].slot?s:0):s0}else c[p]=-e[p].weight*Us;i.push(c)}const t=a0(i),f=e.map(d=>({slot:d,player:null,effOvr:Us,penalty:0,emergency:!1})),u=[];for(let d=0;d<r;d++){const c=t[d];if(c>=o){u.push(n[d]);continue}const p=Se(n[d].role,e[c].dest);f[c]={slot:e[c],player:n[d],effOvr:n[d].ovr-p.penalty,penalty:p.penalty,emergency:p.emergency}}const h=f.reduce((d,c)=>d+c.slot.weight*c.effOvr,0);return{placements:f,bench:u,value:h,emergencyFills:f.filter(d=>d.emergency).length}}function Bl(n,e){return{base:e,...t0(n,cl(e))}}const Js=Object.fromEntries(De.map(n=>[n.id,n.dest])),i0=Object.fromEntries(cl("4-3").map(n=>[n.slot,n.label])),us=n=>i0[n]??n,Wr=n=>n.startsWith("-")?n:"+"+n,f0=(n,e)=>n===2||n===4||n>4&&e>20;function c0(n,e,a,s={}){const r=s.sort??"wins",o=s.limit??60,l=Ts(n),i=new Set(Va(n.rosters[e])),t=new Map;for(const c of qs(n,e))(t.get(c.player.id)??t.set(c.player.id,[]).get(c.player.id)).push(c);const f=[];for(const c of t.values()){const B=c.filter(y=>Se(y.player.role,Js[y.slot]).penalty===0).sort((y,M)=>M.wins-y.wins)[0]??c.slice().sort((y,M)=>M.wins-y.wins)[0],C=B.player,g=B.wins*l0,T=Xi(a,C.id),S=g*T,v=c.filter(y=>y.slot!==B.slot&&i.has(y.slot)).map(y=>({c:y,pen:Se(y.player.role,Js[y.slot]).penalty})).filter(y=>f0(y.pen,l)).sort((y,M)=>M.c.wins-y.c.wins).map(y=>({slotId:y.c.slot,slotLabel:us(y.c.slot),flex:y.pen===0?"":`-${y.pen} flex`}));f.push({id:C.id,name:C.name,pos:C.pos,nflTeam:C.team,ovr:e0(C.ovr),slotId:B.slot,slotLabel:us(B.slot),natural:Se(C.role,Js[B.slot]).penalty===0,wins:Wr(Gr("wins",g)),priority:Wr(Gr("priority",S)),gone:n0(T)+"%",alsoFits:v,tone:g>.05?"good":g<-.05?"bad":"neutral",_w:g,_p:S})}const u=c=>r==="ovr"?Number(c.ovr):r==="priority"?c._p:c._w;f.sort((c,p)=>u(p)-u(c)||(c.id<p.id?-1:1));const h=n.pos+1,d=Ga.length-i.size;return{header:{teamName:Rn[e].name,round:l,roundLabel:`Round ${l}`,pickInRound:n.pos%32+1,overall:h,totalPicks:n.order.length,onClock:`You're on the clock: Round ${l}, Pick ${n.pos%32+1} (overall ${h} of ${n.order.length})`},rows:f.slice(0,o).map(({_w:c,_p:p,...B})=>B),footer:{filled:d,total:Ga.length,text:`${d} of ${Ga.length} starters`},sort:r}}var u0=F('<div class="cp-hd svelte-jqmiv9"><span class="cp-team svelte-jqmiv9"> </span> <span class="cp-round svelte-jqmiv9"> </span> <span class="cp-overall svelte-jqmiv9"> </span></div> <p class="cp-onclock svelte-jqmiv9"> </p>',1);function p0(n,e){Zn(e,!0);var a=u0(),s=He(a),r=H(s),o=E(r,!0),l=k(r,2),i=E(l),t=k(l,2),f=E(t),u=k(s,2),h=E(u,!0);V(()=>{w(o,e.header.teamName),w(i,`${e.header.roundLabel??""} · Pick ${e.header.pickInRound??""}`),w(f,`overall ${e.header.overall??""} of ${e.header.totalPicks??""}`),w(h,e.header.onClock)}),P(n,a),$n()}var h0=F('<button class="cp-chip svelte-q412k"> <i class="svelte-q412k"> </i></button>'),d0=F('<div class="cp-fits svelte-q412k"><span class="cp-fitlbl svelte-q412k"> </span> <!> <button class="cp-chip cp-primary svelte-q412k"> </button></div>'),B0=F('<div><button class="cp-main svelte-q412k"><span class="cp-name svelte-q412k"> </span> <span class="cp-pos svelte-q412k"> </span> <span class="cp-nflteam svelte-q412k"> </span> <span class="cp-num cp-ovr svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-num svelte-q412k"> </span> <span class="cp-gone-wrap svelte-q412k"><span class="cp-num cp-gone svelte-q412k"> </span> <span class="cp-gonetip svelte-q412k" role="tooltip"> </span></span></button> <!></div>');function C0(n,e){Zn(e,!0);let a=je(e,"oddsMeta",3,null),s=nn(!1);const r=G=>G?`GONE% — how often the CPU took him before your next pick: the ${G.picksBetween} picks between now and your turn were replayed ${G.sims} times with the real CPU logic. It is a chance, not a promise — the weird pick is still yours.`:"GONE% — the CPU replay estimate (no replay while the CPU is on the clock).";var o=B0(),l=H(o),i=H(l),t=E(i,!0),f=k(i,2),u=E(f,!0),h=k(f,2),d=E(h,!0),c=k(h,2),p=E(c,!0),B=k(c,2),C=E(B,!0),g=k(B,2),T=E(g,!0),S=k(g,2),v=H(S),y=E(v,!0),M=k(v,2),A=E(M,!0),I=k(l,2);{var x=G=>{var en=d0(),Q=H(en),q=E(Q),U=k(Q,2);Hn(U,17,()=>e.r.alsoFits,ms,(An,yn)=>{var vn=h0(),bn=H(vn),Kn=k(bn),Pn=E(Kn,!0);V(()=>{w(bn,`${m(yn).slotLabel??""} `),w(Pn,m(yn).flex)}),pn("click",vn,()=>e.onpick(e.r.id,m(yn).slotId)),P(An,vn)});var rn=k(U,2),on=E(rn);V(()=>{w(q,`Fills ${e.r.slotLabel??""}${e.r.natural?"":" (flex)"}`),w(on,`Draft at ${e.r.slotLabel??""}`)}),pn("click",rn,()=>e.onpick(e.r.id,e.r.slotId)),P(G,en)};Gn(I,G=>{m(s)&&G(x)})}V(G=>{ve(o,1,`cp-row cp-${e.r.tone??""}`,"svelte-q412k"),ce(l,"aria-expanded",m(s)),w(t,e.r.name),w(u,e.r.pos),w(d,e.r.nflTeam),w(p,e.r.ovr),w(C,e.r.wins),w(T,e.r.priority),w(y,e.r.gone),w(A,G)},[()=>r(a())]),pn("click",l,()=>W(s,!m(s))),P(n,o),$n()}pe(["click"]);var g0=F("<button> </button>"),m0=F('<div class="cp-sorts svelte-1xb8352" role="group" aria-label="Sort the board"></div>');function T0(n,e){Zn(e,!0);const a=[{k:"wins",lbl:"Wins"},{k:"priority",lbl:"Priority"},{k:"ovr",lbl:"OVR"}];var s=m0();Hn(s,21,()=>a,ms,(r,o)=>{var l=g0();let i;var t=E(l,!0);V(()=>{i=ve(l,1,"cp-sort svelte-1xb8352",null,i,{"cp-on":e.sort===m(o).k}),w(t,m(o).lbl)}),pn("click",l,()=>e.onsort(m(o).k)),P(r,l)}),P(n,s),$n()}pe(["click"]);var v0=F('<button class="cp-play svelte-zb9xkj" data-testid="cp-play">Play week 1 →</button>'),S0=F('<div class="cp-ft svelte-zb9xkj"><!> <span class="cp-count svelte-zb9xkj"> </span> <button class="cp-undo svelte-zb9xkj">Undo my last pick</button> <!></div>');function y0(n,e){Zn(e,!0);let a=je(e,"draftDone",3,!1);var s=S0(),r=H(s);T0(r,{get sort(){return e.sort},get onsort(){return e.onsort}});var o=k(r,2),l=E(o,!0),i=k(o,2),t=k(i,2);{var f=u=>{var h=v0();pn("click",h,function(...d){e.onplay?.apply(this,d)}),P(u,h)};Gn(t,u=>{a()&&u(f)})}V(()=>{w(l,e.footer.text),i.disabled=!e.canUndo}),pn("click",i,function(...u){e.onundo?.apply(this,u)}),P(n,s),$n()}pe(["click"]);pe(["click"]);var D0=F("<button> </button>"),k0=F('<span class="cp-needs-unit svelte-2mq0wt"> </span> <!>',1),R0=F('<button class="cp-need cp-need-all svelte-2mq0wt">ALL</button>'),L0=F('<div class="cp-needs svelte-2mq0wt" data-testid="cp-needs"><span class="cp-needs-lbl svelte-2mq0wt"> </span> <!> <!></div>');function w0(n,e){Zn(e,!0);let a=je(e,"selected",19,()=>[]);const s={offense:"OFF",defense:"DEF",special:"ST"};Object.fromEntries(De.map(d=>[d.id,d.unit]));const r=d=>De.filter(c=>c.unit===d&&e.open.includes(c.id)).map(c=>c.id),o=d=>a().includes(d);var l=L0(),i=H(l),t=E(i),f=k(i,2);Hn(f,16,()=>["offense","defense","special"],d=>d,(d,c)=>{var p=k0(),B=He(p),C=E(B,!0),g=k(B,2);Hn(g,16,()=>r(c),T=>T,(T,S)=>{var v=D0();let y;var M=E(v,!0);V((A,I,x,G)=>{y=ve(v,1,"cp-need svelte-2mq0wt",null,y,{"cp-need-on":A}),ce(v,"aria-pressed",I),ce(v,"title",`filter the board to ${x??""}`),w(M,G)},[()=>o(S),()=>o(S),()=>us(S),()=>us(S)]),pn("click",v,()=>e.ontoggle(S)),P(T,v)}),V(()=>w(C,s[c])),P(d,p)});var u=k(f,2);{var h=d=>{var c=R0();pn("click",c,function(...p){e.onclear?.apply(this,p)}),P(d,c)};Gn(u,d=>{a().length&&d(h)})}V(()=>w(t,`MY NEEDS · ${e.open.length??""} OPEN`)),P(n,l),$n()}pe(["click"]);var E0=F('<p class="cp-confirm svelte-e071nj">Draft <b> </b> at <b> </b>? <button class="cp-btn cp-go svelte-e071nj">Confirm the pick</button> <button class="cp-btn svelte-e071nj">Cancel</button></p>'),J0=F('<section class="cp-board svelte-e071nj" aria-label="Draft board"><!> <!> <!> <div class="cp-rows svelte-e071nj"></div> <!></section>');function M0(n,e){Zn(e,!0);let a=je(e,"openSlots",19,()=>[]),s=je(e,"oddsMeta",3,null),r=je(e,"needsSelected",19,()=>[]),o=je(e,"draftDone",3,!1),l=nn(null),i=nn(null);const t=oe(()=>r().length===0?e.vm.rows:e.vm.rows.filter(C=>r().includes(C.slotId)||C.alsoFits.some(g=>r().includes(g.slotId))));var f=J0(),u=H(f);p0(u,{get header(){return e.vm.header}});var h=k(u,2);w0(h,{get open(){return a()},get selected(){return r()},get ontoggle(){return e.onneedtoggle},get onclear(){return e.onneedclear}});var d=k(h,2);{var c=C=>{var g=E0(),T=k(H(g)),S=E(T,!0),v=k(T,2),y=E(v,!0),M=k(v,2),A=k(M,2);V(I=>{w(S,I),w(y,m(l).slot)},[()=>e.vm.rows.find(I=>I.id===m(l).id)?.name]),pn("click",M,()=>{e.onpick(m(l).id,m(l).slot),W(l,null)}),pn("click",A,()=>W(l,null)),P(C,g)};Gn(d,C=>{m(l)&&C(c)})}var p=k(d,2);Hn(p,21,()=>m(t),C=>C.id,(C,g)=>{C0(C,{get r(){return m(g)},onpick:(T,S)=>W(l,{id:T,slot:S},!0),get oddsMeta(){return s()}})}),oi(p,C=>W(i,C),()=>m(i));var B=k(p,2);y0(B,{get footer(){return e.vm.footer},get canUndo(){return e.canUndo},get onundo(){return e.onundo},get onsort(){return e.onsort},get sort(){return e.vm.sort},get onplay(){return e.onplay},get draftDone(){return o()}}),V(()=>ce(p,"data-count",m(t).length)),P(n,f),$n()}pe(["click"]);var A0=F("<button> </button>"),b0=F('<div role="group" aria-label="Valuation mode"></div>');function G0(n,e){Zn(e,!0);let a=nn(Ie(Ee.get()));Ee.subscribe(l=>W(a,l,!0));const s=["measured","balance","owner"];var r=b0();let o;Hn(r,21,()=>s,ms,(l,i)=>{var t=A0();let f;var u=E(t,!0);V(()=>{f=ve(t,1,"cp-mode svelte-1o2iqa1",null,f,{"cp-on":m(a).mode===m(i)}),t.disabled=m(a).locked,ce(t,"title",m(a).locked?"The mode switch is disabled mid-draft":cs[m(i)]),w(u,cs[m(i)])}),pn("click",t,()=>Ee.set(m(i))),P(l,t)}),V(()=>o=ve(r,1,"cp-modes svelte-1o2iqa1",null,o,{"cp-locked":m(a).locked})),P(n,r),$n()}pe(["click"]);var W0=F('<li><span class="cp-sl svelte-lz9ww5"> </span> <b> </b></li>'),P0=F('<section class="cp-adv svelte-lz9ww5" aria-label="Lineup advice"><h3 class="svelte-lz9ww5">Best lineup from your roster</h3> <ul class="svelte-lz9ww5"></ul></section>');function F0(n,e){var a=P0(),s=k(H(a),2);Hn(s,21,()=>e.slots,ms,(r,o)=>{var l=W0(),i=H(l),t=E(i,!0),f=k(i),u=k(f),h=E(u,!0);V(()=>{w(t,m(o).label),w(f,` ${m(o).name??""} `),w(h,m(o).ovr)}),P(r,l)}),P(n,a)}const Le={olRun:{OT1:.579,OT2:.348,OG1:.705,OG2:.441,C:.263,TE1:1.436,FB:.188},olPass:{OT1:.812,OT2:.488,OG1:.588,OG2:.368,C:.221},rb:{RB1:43.113,RB2:12.177},qb:{QB:1},rec:{WR1:25.682,WR2:19.86,WR3:3.251,TE1:2.174,RB1:4.201,TE3:1.264,WR4:1.6},passRush:{DE1:.583,DE2:.255,DT1:.303,DT2:.182,MIKE:.053,WILL:.03,DL5:.114},frontRun:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.234,SS:.115,CB1:.06,CB2:.034,CB3:.009,FS:.08,DL5:.099},coverage:{CB1:.175,CB2:.107,CB3:.041,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.1},kicker:{K:1}},va={frontBase:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.334,SS:.115,CB1:.06,CB2:.034,CB3:.005,FS:.08,DL5:.099},frontNick:{DT1:.456,DT2:.273,DE1:.292,DE2:.158,MIKE:.208,WILL:.099,SAM:.032,SS:.115,CB1:.062,CB2:.048,CB3:.009,FS:.08,DL5:.099},covBase:{CB1:.175,CB2:.107,CB3:.011,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.135},covNick:{CB1:.175,CB2:.107,CB3:.045,SS:.113,FS:.122,MIKE:.069,WILL:.039,SAM:.017},covDime:{CB1:.175,CB2:.107,CB3:.045,DIME:.184,SS:.113,FS:.122,MIKE:.069}},qa={12:{WR1:25.682,WR2:27.236,TE1:2.174,TE2:22.844,RB1:4.201},13:{WR1:25.682,TE1:2.174,TE2:22.844,TE3:15.173,RB1:4.201},21:{WR1:25.682,WR2:27.236,TE1:2.174,RB1:4.201,RB2:12.177},22:{WR1:25.682,TE1:2.174,TE2:22.844,RB1:4.201,RB2:12.177}},I0={RB1:44.218,RB2:30.441},ta={11:{label:"11 personnel",run:0,runB:0,passB:0,heavy:0,tbw:0,pc:0},12:{label:"12 personnel",run:.03,runB:.03,passB:-.015,heavy:.5,tbw:.08,pc:.22},13:{label:"13 personnel",run:.06,runB:.055,passB:-.035,heavy:1,tbw:.14,pc:.42},21:{label:"21 personnel",run:.05,runB:.04,passB:-.03,heavy:.6,tbw:.03,pc:.38},22:{label:"22 personnel",run:.08,runB:.07,passB:-.045,heavy:1,tbw:.1,pc:.48}},Cl={run:{label:"run-heavy",s:.08},neutral:{label:"balanced",s:0},pass:{label:"pass-heavy",s:-.08}},gl={run:{label:"run-defense",f:1},neutral:{label:"balanced",f:0},pass:{label:"pass-defense",f:-1}},En={kRun:1.4,kPass:.85,rAmp:3,pAmp:2.5,vm:1.3,kBlock:1,predict:.38,defPredict:.15,nickRun:.05,baseRunVsHeavy:-.025,basePass:.03,defFront:2,defCov:1.5,defRush:.6,pkgFront:.8,pkgCov:.8},Bn={rb:.0208,olRun:.0495,front:.05577,qb:.00655,rec:.02045,olPass:.01403,rush:.01579,cov:.0184,lean:.013,toCov:.0204,toRush:.0105,skRush:.0268,skCov:.012,kick:.01215},La=105,wa=220,Xa=.04,ns=.07,es=3,as=.8,Ea=1.2,Ja=2.2,Zs=21.5,N0=1.7,_0=6,H0=2.36,ml=82,K0=.0194,O0=.01147,ra=[1,1,1],Pr=.15,ps={pers:"11",strat:"neutral"},hs={pkg:"nickel",focus:"neutral"},x0={off:ps,def:hs},Tl=["11","12","13","21","22"].flatMap(n=>["run","neutral","pass"].map(e=>({pers:n,strat:e}))),vl=["base","nickel"].flatMap(n=>["run","neutral","pass"].map(e=>({pkg:n,focus:e})));function V0(n){return ta[n.pers].run+Cl[n.strat].s}function z0(n){const e=1/(1+.2316419*Math.abs(n)),s=.3989423*Math.exp(-n*n/2)*e*(.3193815+e*(-.3565638+e*(1.781478+e*(-1.821256+e*1.330274))));return n>0?1-s:s}function In(n,e,a){return Math.min(a,Math.max(e,n))}function oa(n,e,a){const s=n>=0?a:-e,r=.6*s,o=Math.abs(n);if(o<=r)return n;const l=r+(s-r)*Math.tanh((o-r)/(s-r));return n>=0?l:-l}function Fr(n,e){const a=e.pers,s={...n};a!=="11"&&(s.rec=n["rec"+a]),(a==="21"||a==="22")&&(s.rb=n.rbHeavy);const r=a==="13"?(n.te2+70)/2:a==="12"||a==="22"?(n.te1+n.te2)/2:n.te1;return s.olRun=n.olRun+ta[a].tbw*(r-75)*En.kBlock,s}function Ir(n,e,a){const s=gl[e.focus].f,r=e.pkg==="nickel",o={...n};return o.frontRun=(r?n.frontNick:n.frontBase)+(a?0:(r?-.8:En.pkgFront)+En.defFront*s),o.coverage=(r?n.covNick:n.covBase)+(a?0:(r?En.pkgCov:-.8)-En.defCov*s),o.passRush=n.passRush-(a?0:En.defRush*s),o.coverage=(1-Pr)*o.coverage+Pr*n.covDime,o}function Ne(n,e,a,s=x0){const r=s.off,o=s.def,l=Fr(n,r),i=Fr(a,r),t=Ir(e,o,!1),f=Ir(a,o,!0),u=V0(r),h=1+En.rAmp*u,d=1-En.pAmp*u,c=l.rb-i.rb,p=l.olRun-i.olRun,B=l.qb-a.qb,C=l.rec-i.rec,g=l.olPass-a.olPass,T=l.kicker-a.kicker,S=t.frontRun-f.frontRun,v=t.passRush-f.passRush,y=t.coverage-f.coverage,M=Bn.lean*(.35*(n.rb-a.rb)+.65*(n.olRun-a.olRun)-(.45*B+.3*(n.rec-a.rec)+.25*g)),A=ta[r.pers].heavy,I=o.pkg==="nickel",x=ta[r.pers].runB+En.kRun*u+(I?En.nickRun*A:En.baseRunVsHeavy*A),G=ta[r.pers].passB-En.kPass*u+(I?0:En.basePass*(1-A)),en=[["rb","off",Bn.rb*c*h],["olRun","off",Bn.olRun*p*h],["frontRun","def",-.05577*S*h],["lean","off",M],["scheme","off",x]],Q=[["qb","off",Bn.qb*B*d],["rec","off",Bn.rec*C*d],["olPass","off",Bn.olPass*g*d],["passRush","def",-.01579*v*d],["coverage","def",-.0184*y*d],["lean","off",-M],["scheme","off",G]],q=[["qb","off",-.01471*B],["coverage","def",Bn.toCov*y],["passRush","def",Bn.toRush*v],["scheme","off",-1*u]],U=[["passRush","def",Bn.skRush*v],["olPass","off",-.0336*g],["coverage","def",Bn.skCov*y],["scheme","off",-.9*u]],rn=cn=>cn.reduce((J,N)=>J+N[2],0),on=oa(Bn.rb*c+Bn.olRun*p,-1.1,.4),An=oa(Bn.qb*B+Bn.rec*C+Bn.olPass*g,-.8,.27),yn=oa(on*h+M+x,-1.3,.33)-Bn.front*S*h,vn=oa(An*d-M+G,-1,.29)-(Bn.rush*v+Bn.cov*y)*d,bn=oa(rn(q),-.7,.7),Kn=oa(rn(U),-.8,.4),Pn=La*Math.exp(yn),D=wa*Math.exp(vn),L=Ea*Math.exp(bn),K=Ja*Math.exp(Kn),b=Bn.kick*T,_=H0*(Math.exp((n.ret-82)/45)-Math.exp((a.ret-82)/45)),hn=K0*(n.qbRunR-a.qbRunR),z=O0*(n.wrBlk-a.wrBlk),Dn=-.542*(Math.exp((e.p-80)/45)-Math.exp((a.p-80)/45)),wn={},dn=(cn,J,N)=>{for(const[Z,ln,un]of cn){if(Z==="lean"||Z==="scheme")continue;const ke=J(un),ee=Z+"|"+ln,zn=wn[ee]??={unit:Z,owner:ln,pts:0,kinds:{}},de=ln==="off"?ke:-ke;zn.pts+=de,zn.kinds[N]=(zn.kinds[N]??0)+de}};dn(en,cn=>Xa*La*(Math.exp(cn)-1),"ground game"),dn(Q,cn=>ns*wa*(Math.exp(cn)-1),"passing game"),dn(q,cn=>-es*Ea*(Math.exp(cn)-1),"turnovers"),dn(U,cn=>-as*Ja*(Math.exp(cn)-1),"sacks"),Math.abs(b)>.01&&(wn["kicker|off"]={unit:"kicker",owner:"off",pts:b,kinds:{"field goals":b}});const Xn=En.predict*Math.pow(Cl[r.strat].s/.08,2)-En.defPredict*Math.abs(gl[o.focus].f)+ta[r.pers].pc,ne=_+Dn+hn+z,an=Zs+Xa*(Pn-La)+ns*(D-wa)-es*(L-Ea)-as*(K-Ja)+b+ne-Xn,fn={run:Xa*(Pn-La)+hn+z,pass:ns*(D-wa),to:-es*(L-Ea),sack:-as*(K-Ja),kick:b,plan:-Xn},he=In(1-En.vm*u,.7,1.2);return{expRush:Pn,expPass:D,lamTO:L,lamSack:K,structPts:an,extraPts:ne,channels:fn,swings:Object.values(wn),sd:8*he,vm:he,sT:u,planCost:Xn,plan:{off:r,def:o}}}const Y0=[3.27,5.78,5.88,5.85,5.91,5.93,5.2,5.41,5.17,4.48,4.26,16,26.85],Q0=[.3,4.62,4.99,14.52,4.91,4.77,7.37,7.3,4.69,2.01,5.29,9.98,29.26],Nr=5.88,j0=[.073,0,0,.396,.073,0,.292,.157,0,0,0,.008,0],Sl=n=>{const e=n.reduce((a,s)=>a+s,0);return n.map(a=>a/e)},_r=Sl(Q0.map((n,e)=>e===0?Nr:Math.max(0,n-Nr*j0[e]))),Ms=Sl(Y0),q0=(()=>{const n=Ms.length,e=[0],a=[0];for(let s=0;s<n;s++)e.push(e[s]+Ms[s]),a.push(a[s]+_r[s]);return Ms.map((s,r)=>_r.map((o,l)=>s===0?r===l?1:0:Math.max(0,Math.min(e[r+1],a[l+1])-Math.max(e[r],a[l]))/s))})(),Hr=n=>n<=10?n:n<=14?11:12,Kr=n=>n===0||n===3||n>=6;function U0(n,e,a){if(a===0)return[n,n];let s=[n,e],r=1/0;for(let o=0;o<=45;o++){const l=o+a;if(!Kr(o)||!Kr(l)||l>58)continue;const i=l+o-(n+e),t=1.5*Math.abs(i)+(i<0?1.5*-i:0)+Math.abs(l-n)+Math.abs(o-e);t<r&&(r=t,s=[l,o])}return s}function Z0(n,e,a,s){const r=n===e?a:n>e,o=r?n:e,l=r?e:n,i=o-l,t=Hr(i);let f=s.next(),u=0;const h=q0[t];for(;u<h.length-1&&(f-=h[u],!(f<0));u++);let d;u<=10?d=u:u===11?d=Hr(i)===11?i:s.int(11,14):d=i>=15?i:s.int(15,24);const[c,p]=U0(o,l,d);return r?[c,p]:[p,c]}const se=n=>n==="home"?"away":"home";function ds(n,e){if(e<=0)return 0;const a=Math.exp(-e);let s=0,r=1;do s++,r*=n.next();while(r>a);return s-1}function kn(n,e){return n.next()<e}function yl(n,e){let a=0;for(const r of e)a+=r;let s=n.next()*a;for(let r=0;r<e.length;r++)if(s-=R(e,r),s<0)return r;return e.length-1}function Dl(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),r=R(e,a);e[a]=R(e,s),e[s]=r}return e}function As(n,e){const a=e.reduce((i,t)=>i+t,0),s=e.map(i=>n*i/a),r=s.map(Math.floor);let o=n-r.reduce((i,t)=>i+t,0);const l=s.map((i,t)=>[i-R(r,t),t]).sort((i,t)=>t[0]-i[0]);for(let i=0;o>0;i++,o--){const t=R(l,i%l.length)[1];r[t]=R(r,t)+1}return r}function Or(n,e){return n===1?kn(e,.5)?0:3:n===2?3:n===4?kn(e,.5)?3:6:n===5?kn(e,.5)?6:3:n}const Ua=n=>n===0||n===3||n>=6;function xr(n,e){return{rush:In(Math.round(n.expRush*Math.exp(.3*e.normal()-.045)),15,345),pass:In(Math.round(n.expPass*Math.exp(.26*n.vm*e.normal()-.0338*n.vm*n.vm)),45,520),to:In(ds(e,n.lamTO),0,6),sacks:In(ds(e,n.lamSack),0,9)}}const $0=n=>n==="xp"?1:n==="two"?2:0;function Vr(n,e,a){let s=0;for(let B=0;B<e;B++)kn(a,.12)&&s++;for(;s>0&&!Ua(n-7*s);)s--;let r=kn(a,.035)&&Ua(n-7*s-2)?1:0;const o=n-7*s-2*r;Ua(o)||(r=0,s=0);const l=n-7*s-2*r;if(!Ua(l))throw new Error("decompose: cannot score "+n);const i=l*.24/3,t=[];for(let B=0;3*B<=l;B++){const C=l-3*B;if(!(C!==0&&C<6))for(let g=Math.ceil(C/8);6*g<=C;g++){const T=C-6*g,S=Math.max(T-g,0),v=T-2*S,y=g-v-S;y<0||t.push({b:B,n:g,w:Math.exp(-.5*((B-i)/1)**2)*Math.exp(-1.4*y)+1e-6})}}const f=R(t,yl(a,t.map(B=>B.w))),u=l-3*f.b,h=u-6*f.n;let d=Math.max(h-f.n,0),c=h-2*d;for(;c>=2&&d+c-1<=f.n&&kn(a,.22);)c-=2,d+=1;const p=[];for(let B=0;B<c;B++)p.push("xp");for(let B=0;B<d;B++)p.push("two");for(let B=p.length;B<f.n;B++)p.push(kn(a,.6)?"xp_miss":"two_fail");return{td:f.n,fg:f.b,convs:Dl(a,p),dTD:s,sf:r}}function X0(n,e){return e<4?1:n<=-9?.55:n<=-4?.75:n>=17?1.85:n>=9?1.55:n>=4?1.25:n<=-1?.9:n>=1?1.1:1}const bs={TD:68,FG:46,FG_MISS:44,PUNT:24,INT:26,FUM:25,DOWNS:32,HALF:24,SAFETY:14},zr={TD:1,FG:3,FG_MISS:3,PUNT:3,INT:2,FUM:2,DOWNS:4,HALF:2,SAFETY:2};function Yr(n,e,a,s,r,o,l,i,t){const f=[];n.convs.forEach(c=>f.push({end:"TD",conv:c}));for(let c=0;c<n.fg;c++)f.push({end:"FG"});for(let c=0;c<r;c++)f.push({end:"FG_MISS"});for(let c=0;c<e;c++)f.push({end:kn(i,.65)?"INT":"FUM",defTD:c<a.dTD});for(let c=0;c<a.sf;c++)f.push({end:"SAFETY"});for(let c=0;c<s;c++)f.push({end:"DOWNS"});const u=new Array(o).fill(null),h=[t[0]?l-1:-1,t[1]?o-1:-1];for(const c of h)c>=0&&f.length<o-1&&(u[c]={end:"HALF"});Dl(i,f);let d=0;for(let c=0;c<o;c++)u[c]||(u[c]=d<f.length?R(f,d++):{end:"PUNT"});return u}function Qr(n,e,a,s,r){return n.td+n.fg+r+e+a.sf+s}function nf(n,e,a,s){const r=s.homeField??N0,o=a.fork("aggregates"),l={home:xr(n,o),away:xr(e,o)},i=(D,L,K)=>In(Zs+K+Xa*(L.rush-La)+ns*(L.pass-wa)-es*(L.to-Ea)-as*(L.sacks-Ja)+D.channels.kick+D.extraPts-D.planCost+_0*D.vm*o.normal(),0,58),t=i(n,l.home,r),f=i(e,l.away,0),u=[Or(Math.round(t),o),Or(Math.round(f),o)],[h,d]=Z0(u[0],u[1],t>=f,a.fork("margin")),c=a.fork("drives"),p={home:Vr(h,l.away.to,c),away:Vr(d,l.home.to,c)},B={home:ds(c,.35),away:ds(c,.35)},C={home:0,away:0};for(const D of["home","away"])for(let L=0;L<p[D].fg;L++)kn(c,.176)&&C[D]++;const g=In(Math.round(10.8+.9*c.normal()),9,13),T=Math.max(g,Qr(p.home,l.home.to,p.away,B.home,C.home)+1,Qr(p.away,l.away.to,p.home,B.away,C.away)+1),S=T%2===0?In(T/2+c.pick([-1,0,0,1]),3,T-3):kn(c,.5)?(T-1)/2:(T+1)/2,v=kn(c,.5)?"home":"away",y=[kn(c,.55),kn(c,.55)],M=se(v),A=v,I=D=>[y[0]&&M===D,y[1]&&A===D],x={home:Yr(p.home,l.home.to,p.away,B.home,C.home,T,S,c,I("home")),away:Yr(p.away,l.away.to,p.home,B.away,C.away,T,S,c,I("away"))},G=[],en={home:0,away:0};for(let D=0;D<2;D++){const L=D===0?S:T-S,K=D===0?v:se(v);for(let b=0;b<L;b++)for(const _ of[K,se(K)])G.push({side:_,idx:en[_]++,half:D})}const Q=G.map(D=>{const L=R(x[D.side],D.idx);return{side:D.side,period:1,start:0,secs:0,plays:0,rush:0,pass:0,sacks:0,end:L.end,pts:L.end==="TD"?6+$0(L.conv):L.end==="FG"?3:0,...L.conv!==void 0?{conv:L.conv}:{},oppPts:L.end==="SAFETY"?2:L.defTD?7:0,defTD:!!L.defTD}}),q=new Map;{const D={home:0,away:0};Q.forEach((L,K)=>{q.set(L,X0(D[L.side]-D[se(L.side)],1+Math.floor(K/Q.length*4))),D[L.side]+=L.pts,D[se(L.side)]+=L.oppPts})}for(const D of["home","away"]){const L=Q.map((z,Dn)=>[z,Dn]).filter(([z])=>z.side===D).map(([z])=>z),K=L.map(z=>bs[z.end]*Math.exp(.5*c.normal())*q.get(z)),b=L.map(z=>bs[z.end]*Math.exp(.5*c.normal())/q.get(z)),_=As(l[D].rush,K),hn=As(l[D].pass,b);L.forEach((z,Dn)=>{z.rush=R(_,Dn),z.pass=R(hn,Dn)}),L.forEach(z=>{z.plays=In(Math.max(zr[z.end],Math.round((z.rush+z.pass)/5.15+.9*c.normal())),1,22)});for(let z=0;z<l[D].sacks;z++){const Dn=yl(c,L.map(dn=>dn.plays)),wn=R(L,Dn);wn.sacks>=wn.plays-1&&wn.plays++,wn.sacks++}}let U=0;for(let D=0;D<2;D++){const L=Q.filter((b,_)=>R(G,_).half===D),K=As(1800,L.map(b=>b.plays*26*Math.exp(.28*c.normal())+(b.end==="HALF"?10:0)));L.forEach((b,_)=>{b.start=U,b.secs=R(K,_),b.period=Math.min(4,Math.floor(U/900)+1),U+=R(K,_)})}let rn=h,on=d,An=null,yn=0;if(h===d){const D=a.fork("overtime"),L=kn(D,.5)?"home":"away",K={home:0,away:0},b=s.otLimit??600;let _=5,hn=0;const z={home:n,away:e},Dn=(an,fn,he)=>{const cn=z[an].structPts/Zs,J=D.next(),N=In(.27*cn,.1,.5),Z=In(.2*Math.sqrt(cn),.08,.3),ln=In(.11/Math.sqrt(cn),.05,.2);let un="PUNT";J<N?un="TD":J<N+Z?un=kn(D,.87)?"FG":"FG_MISS":J<N+Z+ln?un=kn(D,.65)?"INT":"FUM":J<N+Z+ln+.03&&(un="DOWNS");const ke=(un==="INT"||un==="FUM")&&kn(D,.1);let ee=In(Math.round(150+50*D.normal()),30,330);ee=Math.min(ee,fn);const zn=Math.max(1,Math.round(bs[un]*Math.exp(.4*D.normal()))),de=Math.round(zn*In(.4+.1*D.normal(),.15,.7)),ae=zn-de;let sn=0,Fn;if(un==="TD"){const Yn=he(6);Fn=Yn?"none":"xp",sn=Yn?6:7}else un==="FG"&&(sn=3);return{side:an,period:_,start:3600+yn,secs:ee,plays:Math.max(zr[un],Math.round(zn/5.3)),rush:de,pass:ae,sacks:0,end:un,pts:sn,...Fn!==void 0?{conv:Fn}:{},oppPts:ke?7:0,defTD:ke}},wn=an=>{Q.push(an),yn+=an.secs,hn+=an.secs,K[an.side]+=an.pts,K[se(an.side)]+=an.oppPts};let dn=!1;const Xn=Dn(L,Math.min(330,b),()=>!1);if(wn(Xn),Xn.oppPts>0&&(dn=!0),!dn){const an=K[L],fn=Dn(se(L),Math.max(30,b-hn),he=>he>an-K[se(L)]);wn(fn),(fn.oppPts>0||K.home!==K.away)&&(dn=!0)}let ne=L;for(;!dn;){const an=b-hn;if(an<=0)break;const fn=Dn(ne,an,()=>!0);fn.secs>=an&&fn.pts===0&&fn.oppPts===0&&(fn.end="HALF"),wn(fn),(fn.pts>0||fn.oppPts>0)&&(dn=!0),ne=se(ne)}rn+=K.home,on+=K.away,An={first:L,periods:_-4,tie:rn===on}}const vn=[];Q.forEach((D,L)=>{D.pts>0&&vn.push({side:D.side,kind:D.end==="TD"?"TD":"FG",pts:D.pts,...D.conv!==void 0?{conv:D.conv}:{},drive:L,period:D.period,at:D.start+D.secs}),D.oppPts>0&&vn.push({side:se(D.side),kind:D.defTD?"DEF_TD":"SAFETY",pts:D.oppPts,drive:L,period:D.period,at:D.start+D.secs})});const bn=()=>({rush:0,pass:0,yards:0,plays:0,giveaways:0,takeaways:0,sacksTaken:0,drives:0,top:0,fgMade:0,fgMissed:0}),Kn={home:bn(),away:bn()};for(const D of Q){const L=Kn[D.side];L.rush+=D.rush,L.pass+=D.pass,L.yards+=D.rush+D.pass,L.plays+=D.plays,L.sacksTaken+=D.sacks,L.drives++,L.top+=D.secs,D.end==="FG"&&L.fgMade++,D.end==="FG_MISS"&&L.fgMissed++,(D.end==="INT"||D.end==="FUM")&&(L.giveaways++,Kn[se(D.side)].takeaways++)}const Pn={home:l.home,away:l.away};return{homeScore:rn,awayScore:on,regHome:h,regAway:d,drives:Q,events:vn,stats:Kn,agg:Pn,ot:An,otSecs:yn}}function jr(n,e,a){return z0((n.structPts-e.structPts+a)/Math.sqrt(n.sd*n.sd+e.sd*e.sd))}function qr(n,e){let a=n[0],s=-1/0;for(const r of n){const o=e(r);o>s&&(s=o,a=r)}return{o:a,v:s}}function Ur(n,e){const a={off:ps,def:hs};let s=ps,r=hs;const o=p=>jr(Ne(n,e,e,{off:p,def:a.def}),Ne(e,n,e,{off:a.off,def:r}),0),l=p=>jr(Ne(n,e,e,{off:s,def:a.def}),Ne(e,n,e,{off:a.off,def:p}),0);for(let p=0;p<2;p++)s=qr(Tl,o).o,r=qr(vl,l).o;const i=n.rb-e.rb,t=n.olRun-e.olRun,f=n.qb-e.qb,u=n.rec-e.rec,h=n.olPass-e.olPass,d=.35*i+.65*t-(.45*f+.3*u+.25*h),c=n.frontRun-e.frontRun-(.5*(n.coverage-e.coverage)+.5*(n.passRush-e.passRush));return{off:s,def:r,tilt:d,tiltD:c}}function ef(n){return n.placements.map(e=>({row:e.slot.row,ovr:e.effOvr}))}function af(n,e){let a=0,s=0;for(const r of n){const o=e[r.row];o!==void 0&&(a+=r.ovr*o,s+=o)}if(s===0)throw new Error("wavg: no spot matches the spec");return a/s}function Ve(n,e){const a=n.find(s=>s.row===e);return a?a.ovr:Us}function sf(n,e=ml){const a=l=>af(n,l),s={TE1:Ve(n,"TE1"),TE2:Ve(n,"TE2"),P:Ve(n,"P"),QB:Ve(n,"QB"),WR1:Ve(n,"WR1"),WR2:Ve(n,"WR2"),WR3:Ve(n,"WR3")},r=a(Le.rec),o={olRun:a(Le.olRun),olPass:a(Le.olPass),rb:a(Le.rb),qb:a(Le.qb),rec:r,passRush:a(Le.passRush),frontRun:a(Le.frontRun),coverage:a(Le.coverage),kicker:a(Le.kicker),rec12:a(qa[12]),rec13:a(qa[13]),rec21:a(qa[21]),rec22:a(qa[22]),rec11:r,frontBase:a(va.frontBase),frontNick:a(va.frontNick),covBase:a(va.covBase),covNick:a(va.covNick),covDime:a(va.covDime),te1:s.TE1,te2:s.TE2,rbHeavy:a(I0),ret:e,p:s.P,qbRunR:s.QB,wrBlk:(s.WR1*ra[0]+s.WR2*ra[1]+s.WR3*ra[2])/(ra[0]+ra[1]+ra[2]),passOff:0,runOff:0,off:0,def:0};return o.passOff=.45*o.qb+.3*o.rec+.25*o.olPass,o.runOff=.35*o.rb+.65*o.olRun,o.off=.6*o.passOff+.4*o.runOff,o.def=.55*(.5*o.passRush+.5*o.coverage)+.45*o.frontRun,o}function kl(n){if(!n.length)throw new Error("leagueBaseline: no teams");const e=Object.keys(n[0]),a={};for(const s of e)a[s]=n.reduce((r,o)=>r+o[s],0)/n.length;return a}const rf=[[["East","North"],["South","West"]],[["East","South"],["North","West"]],[["East","West"],["North","South"]]];function of(n,e){const a=t=>{const f=e[t];if(f===void 0)throw new Error(`schedule: no rank for ${t}`);return f},s=(t,f)=>ea(t,f).slice().sort((u,h)=>a(u)-a(h));for(const t of["AFC","NFC"])for(const f of Be)if(ea(t,f).map(h=>e[h]).sort().join()!=="1,2,3,4")throw new Error(`schedule: ranks in ${t} ${f} must be 1-4 once each`);const r=[];for(const t of["AFC","NFC"])for(const f of Be){const u=s(t,f);for(let h=0;h<4;h++)for(let d=h+1;d<4;d++)r.push({home:R(u,h),away:R(u,d),kind:"div"}),r.push({home:R(u,d),away:R(u,h),kind:"div"})}const o=R(rf,(n%3+3)%3);for(const t of["AFC","NFC"])for(const[f,u]of o){const h=s(t,f),d=s(t,u);for(let c=0;c<4;c++)for(let p=0;p<4;p++)r.push((c+p+n)%2===0?{home:R(h,c),away:R(d,p),kind:"conf4"}:{home:R(d,p),away:R(h,c),kind:"conf4"})}const l=t=>(t+n)%4,i=t=>(t+n+1+Math.floor(n/4)%3)%4;Be.forEach((t,f)=>{const u=s("AFC",t),h=s("NFC",R(Be,l(f)));for(let d=0;d<4;d++)for(let c=0;c<4;c++)r.push((d+c+n)%2===0?{home:R(u,d),away:R(h,c),kind:"inter4"}:{home:R(h,c),away:R(u,d),kind:"inter4"})});for(const t of["AFC","NFC"]){const[[f,u],[h,d]]=o,c=[[f,h],[h,u],[u,d],[d,f]];for(const[p,B]of c){const C=s(t,p),g=s(t,B);for(let T=0;T<4;T++)r.push({home:R(g,T),away:R(C,T),kind:"conf2"})}}return Be.forEach((t,f)=>{const u=s("AFC",t),h=s("NFC",R(Be,i(f)));for(let d=0;d<4;d++)r.push({home:R(u,d),away:R(h,d),kind:"inter1"})}),r}const lf=[5,6,7,8,9,10,11,12,13,14],tf=[4,4,4,4,4,4,2,2,2,2];function ff(n,e,a,s=400){const r=of(e,a),o=[...new Set(r.map(l=>l.home))];for(let l=0;l<s;l++){const i=cf(r,o,n);if(i)return i}throw new Error("schedule: no weekly assignment found")}function ss(n,e){for(let a=e.length-1;a>0;a--){const s=n.int(0,a),r=R(e,a);e[a]=R(e,s),e[s]=r}return e}function cf(n,e,a){const s=new Array(n.length).fill(0),r=new Map;n.forEach((t,f)=>{if(t.kind==="div"){const u=[t.home,t.away].sort().join("|");(r.get(u)??r.set(u,[]).get(u)).push(f)}});for(const t of["AFC","NFC"])for(const f of Be){const u=ss(a,ea(t,f));for(const[h,d]of[[R(u,0),R(u,1)],[R(u,2),R(u,3)]]){const c=r.get([h,d].sort().join("|"));s[R(c,a.int(0,1))]=18}}const o=new Map,l=[];lf.forEach((t,f)=>{for(let u=0;u<R(tf,f);u++)l.push(t)}),ss(a,l),ss(a,e.slice()).forEach((t,f)=>o.set(t,R(l,f)));const i=new Set(n.map((t,f)=>f).filter(t=>s[t]===0));for(let t=1;t<=17;t++){const f=e.filter(h=>o.get(h)!==t),u=uf(n,i,f,a);if(!u)return null;for(const h of u)s[h]=t,i.delete(h)}return i.size?null:n.map((t,f)=>({...t,week:R(s,f)}))}function uf(n,e,a,s){const r=new Set(a),o=new Map;for(const u of a)o.set(u,[]);for(const u of e){const h=R(n,u);r.has(h.home)&&r.has(h.away)&&(o.get(h.home).push(u),o.get(h.away).push(u))}const l=new Set,i=[];let t=0;const f=()=>{if(++t>4e3)return!1;let u=null,h=1e9;for(const c of a)if(!l.has(c)){const p=o.get(c).filter(B=>!l.has(R(n,B).home)&&!l.has(R(n,B).away)).length;p<h&&(h=p,u=c)}if(u===null)return!0;if(h===0)return!1;const d=ss(s,o.get(u).filter(c=>!l.has(R(n,c).home)&&!l.has(R(n,c).away)));for(const c of d){const{home:p,away:B}=R(n,c);if(l.add(p),l.add(B),i.push(c),f())return!0;l.delete(p),l.delete(B),i.pop()}return!1};return f()?i.slice():null}function Rl(n,e,a){const s=n+e+a;return s===0?0:(n+.5*a)/s}class pf{rows=new Map;constructor(e){for(const a of Rn)this.rows.set(a.name,[]);for(const a of e)this.rows.get(a.home).push({opp:a.away,pf:a.hs,pa:a.as,tdf:a.htd,tda:a.atd}),this.rows.get(a.away).push({opp:a.home,pf:a.as,pa:a.hs,tdf:a.atd,tda:a.htd})}rec(e,a=()=>!0){let s=0,r=0,o=0;for(const l of this.rows.get(e))a(l)&&(l.pf>l.pa?s++:l.pf<l.pa?r++:o++);return{w:s,l:r,t:o,n:s+r+o}}pct(e,a){const s=this.rec(e,a);return Rl(s.w,s.l,s.t)}overall(e){return this.pct(e)}net(e,a=()=>!0){let s=0;for(const r of this.rows.get(e))a(r)&&(s+=r.pf-r.pa);return s}netTD(e){let a=0;for(const s of this.rows.get(e))a+=s.tdf-s.tda;return a}sov(e){return this.oppPct(e,a=>a.pf>a.pa)}sos(e){return this.oppPct(e,()=>!0)}oppPct(e,a){let s=0,r=0;for(const o of this.rows.get(e))if(a(o)){const l=this.rec(o.opp);s+=l.w+.5*l.t,r+=l.n}return r===0?0:s/r}total(e,a){let s=0;for(const r of this.rows.get(e))s+=r[a];return s}}const ie=n=>Ra(ur,n),hf=(n,e)=>ie(n).conf===ie(e).conf&&ie(n).div===ie(e).div,Zr=(n,e)=>ie(n).conf===ie(e).conf;function $r(n,e,a){const s=n.total(e,"pf"),r=n.total(e,"pa");return 1+a.filter(o=>n.total(o,"pf")>s).length+1+a.filter(o=>n.total(o,"pa")<r).length}const Ll=1e-12;function On(n,e){const a=n.map(e),s=Math.max(...a),r=n.filter((o,l)=>R(a,l)>s-Ll);return r.length===n.length?null:r}function df(n,e){const a=B=>{if(n==="division")return On(B,C=>{let g=0,T=0,S=0;for(const v of B)if(v!==C){const y=e.rec(C,M=>M.opp===v);g+=y.w,T+=y.l,S+=y.t}return Rl(g,T,S)});if(B.length===2)return On(B,C=>e.pct(C,g=>g.opp===B.find(T=>T!==C)));for(const C of B)if(B.filter(T=>T!==C).every(T=>{const S=e.rec(C,v=>v.opp===T);return S.n>0&&S.w===S.n}))return[C];for(const C of B)if(B.filter(T=>T!==C).every(T=>{const S=e.rec(C,v=>v.opp===T);return S.n>0&&S.l===S.n}))return B.filter(T=>T!==C);return null},s=B=>On(B,C=>e.pct(C,g=>hf(C,g.opp))),r=B=>On(B,C=>e.pct(C,g=>Zr(C,g.opp))),o=B=>C=>{const g=C.map(v=>new Set(e.rows.get(v).map(y=>y.opp))),T=[...R(g,0)].filter(v=>!C.includes(v)&&g.every(y=>y.has(v))),S=v=>T.includes(v.opp);return!T.length||C.some(v=>e.rec(v,S).n<B)?null:On(C,v=>e.pct(v,S))},l=B=>On(B,C=>e.sov(C)),i=B=>On(B,C=>e.sos(C)),t=B=>Rn.filter(C=>C.conf===ie(R(B,0)).conf).map(C=>C.name),f=B=>{const C=t(B);return On(B,g=>-$r(e,g,C))},u=B=>{const C=Rn.map(g=>g.name);return On(B,g=>-$r(e,g,C))},h=B=>{const C=B.map(T=>new Set(e.rows.get(T).map(S=>S.opp))),g=[...R(C,0)].filter(T=>!B.includes(T)&&C.every(S=>S.has(T)));return g.length?On(B,T=>e.net(T,S=>g.includes(S.opp))):null},d=B=>On(B,C=>e.net(C,g=>Zr(C,g.opp))),c=B=>On(B,C=>e.net(C)),p=B=>On(B,C=>e.netTD(C));return n==="division"?[a,s,o(0),r,l,i,f,u,h,c,p]:[a,r,o(4),l,i,f,u,d,c,p]}function wl(n,e,a,s){const r=df(e,a);let o=n.slice();n:for(;o.length>1;){for(const t of r){const f=t(o);if(f&&f.length<o.length&&f.length>0){o=f;continue n}}const l=o.slice().sort(),i=s.fork("coin:"+l.join("|")).next();return R(l,Math.floor(i*l.length))}return R(o,0)}function El(n,e,a,s){const r=[];let o=n.slice();for(;o.length>1;){const l=wl(o,e,a,s);r.push(l),o=o.filter(i=>i!==l)}return r.concat(o)}function Xr(n,e,a){const s=[];let r=n.slice();for(;r.length;){const o=[];for(const i of new Set(r.map(t=>ie(t).conf+ie(t).div))){const t=r.filter(f=>ie(f).conf+ie(f).div===i);o.push(t.length>1?R(El(t,"division",e,a),0):R(t,0))}const l=o.length===1?R(o,0):wl(o,"wildcard",e,a);s.push(l),r=r.filter(i=>i!==l)}return s}function Gs(n,e){const a=n.slice().sort((r,o)=>e.overall(o)-e.overall(r)),s=[];for(const r of a){const o=s[s.length-1];o&&Math.abs(e.overall(R(o,0))-e.overall(r))<Ll?o.push(r):s.push([r])}return s}function Bf(n,e){const a=new pf(n),s={},r={},o={AFC:[],NFC:[]},l={AFC:[],NFC:[]};for(const i of["AFC","NFC"]){for(const h of Be){const d=Gs(ea(i,h),a).flatMap(c=>c.length>1?El(c,"division",a,e):c);s[`${i} ${h}`]=d,d.forEach((c,p)=>r[c]=p+1),l[i].push(R(d,0))}const t=Gs(l[i],a).flatMap(h=>h.length>1?Xr(h,a,e):h),f=Rn.filter(h=>h.conf===i&&!l[i].includes(h.name)).map(h=>h.name),u=Gs(f,a).flatMap(h=>h.length>1?Xr(h,a,e):h).slice(0,3);o[i]=[...t,...u]}return{seeds:o,divisionOrder:s,divisionRank:r,divisionWinners:l}}function Cf(n){const e=Object.fromEntries(n.map(s=>[s.name,s.ratings])),a={};for(const s of["AFC","NFC"])for(const r of Be)ea(s,r).sort((o,l)=>Ra(e,l).off+Ra(e,l).def-Ra(e,o).off-Ra(e,o).def).forEach((o,l)=>a[o]=l+1);return a}const Jl=18,rs=["Wild Card","Divisional","Conference","Super Bowl"],gf=n=>n.year+n.run,mf=n=>n.nextWeek>22,Ml=n=>n>=19&&n<=22?rs[n-19]??null:null,Tf=(n,e,a)=>e?`po:${e}:${a}`:`w${n}:${a}`,Al=(n,e,a)=>Di(n,Tf(e,Ml(e),a));function vf(n){if(mf(n))return[];const e=n.nextWeek,a=Ml(e),s=a?yf(n,a):n.schedule.filter(o=>o.week===e).map(o=>[o.home,o.away]),r=a==="Super Bowl"?0:n.homeField;return s.map(([o,l])=>({week:e,round:a,home:o,away:l,seed:Al(n.seed,e,o),...r!==void 0?{homeField:r}:{}}))}const Sf=n=>n.hs>n.as?n.home:n.away;function yf(n,e){const a=n.seeding;if(!a)throw new Error("season: playoffs before the regular season is done");const s=(o,l)=>n.playoffs.filter(i=>i.round===o&&ur[i.home]?.conf===l).map(Sf);if(e==="Super Bowl"){const o=i=>R(s("Conference",i),0);return[gf(n)%2===1?[o("AFC"),o("NFC")]:[o("NFC"),o("AFC")]]}const r=[];for(const o of["AFC","NFC"]){const l=a.seeds[o],i=t=>l.indexOf(t)+1;if(e==="Wild Card")for(const[t,f]of[[2,7],[3,6],[4,5]])r.push([R(l,t-1),R(l,f-1)]);else if(e==="Divisional"){const t=[R(l,0),...s("Wild Card",o)].sort((f,u)=>i(f)-i(u));r.push([R(t,0),R(t,t.length-1)],[R(t,1),R(t,2)])}else{const t=s("Divisional",o).sort((f,u)=>i(f)-i(u));r.push([R(t,0),R(t,1)])}}return r}const Df=["olRun","olPass","rb","qb","rec","passRush","frontRun","coverage","kicker","rec12","rec13","rec21","rec22","rec11","frontBase","frontNick","covBase","covNick","covDime","te1","te2","rbHeavy","ret","p","qbRunR","wrBlk","passOff","runOff","off","def"];function kf(n,e){const a=vf(n).find(s=>s.home===e||s.away===e);return a?a.seed:n.seed}function Rf(n){const e=[];for(const l of Rn){const i=n.ratings[l.name];if(!i||typeof i!="object")return{ok:!1,message:"week: no ratings for "+l.name};for(const t of Df)if(typeof i[t]!="number"||!Number.isFinite(i[t]))return{ok:!1,message:"week: bad rating "+t+" for "+l.name};e.push({name:l.name,ratings:{...i}})}const a=[],s=[];for(const l of n.scores){const i={week:l.week,home:l.home,away:l.away,hs:l.hs,as:l.as,htd:l.htd??0,atd:l.atd??0,...l.round?{round:l.round}:{}};(l.round?s:a).push(i)}const r={seed:n.seed,year:n.year,run:n.run,prevRank:n.prevRank?{...n.prevRank}:{},homeField:n.homeField,schedule:n.schedule.map(l=>({week:l.week,home:l.home,away:l.away,kind:l.kind})).sort((l,i)=>l.week-i.week),nextWeek:n.nextWeek,scores:a,playoffs:s,seeding:null,champion:null};r.nextWeek>Jl&&(r.seeding=Bf(a,na(n.seed).fork("seeding")));const o=s.find(l=>l.round==="Super Bowl");return o&&(r.champion=o.hs>o.as?o.home:o.away),n.prevRank?r.nextWeek<=22&&kf(r,n.userTeam)!==n.gameSeed?{ok:!1,message:"week: stored gameSeed does not match the state (changed save?)"}:{ok:!0,value:{state:r,teams:e,context:{userTeam:n.userTeam,roster:n.roster,plan:n.plan,statsRecorded:n.statsRecorded}}}:{ok:!1,message:"week: saved without prevRank (cannot rebuild a run-it-back)"}}const Lf=6,wf=4,Ef=2,Jf=1,no={"Wild Card":Lf,Divisional:wf,Conference:Ef,"Super Bowl":Jf};function Mf(n){const e=n.payload;if(!Number.isInteger(e.nextWeek)||e.nextWeek<1||e.nextWeek>Jl+4)return Sn(`week: nextWeek ${e.nextWeek} outside 1..22`);if(e.scores.find(p=>p.round==="Super Bowl")&&e.nextWeek!==22)return Sn("week: a Super Bowl score exists but nextWeek is not 22 (finished seasons are Season payloads, not week saves)");const s=p=>rs.indexOf(p);for(const p of e.scores){if(p.round&&!rs.includes(p.round))return Sn(`week: unknown playoff round '${p.round}'`);if(p.round&&p.week!==19+s(p.round))return Sn(`week: round '${p.round}' stored under week ${p.week} (expected ${19+s(p.round)})`)}for(const p of e.scores)if(!Number.isInteger(p.htd)||!Number.isInteger(p.atd))return Sn(`week: score ${p.home} vs ${p.away} (week ${p.week}) lacks htd/atd — seeding tiebreaks would silently change`);const r=(p,B,C)=>`${p}|${B}|${C}`,o=new Set(e.schedule.map(p=>r(p.week,p.home,p.away))),l=new Map;for(const p of e.scores){if(!p.round&&!o.has(r(p.week,p.home,p.away)))return Sn(`week: score ${p.away} @ ${p.home} (week ${p.week}) is not on the stored schedule`);const B=r(p.week,p.home,p.away);if(l.has(B))return Sn(`week: fixture ${p.away} @ ${p.home} (week ${p.week}) appears twice in scores`);l.set(B,p)}for(const p of e.schedule)if(!(p.week<e.nextWeek&&!p.week)&&p.week<e.nextWeek&&!l.has(r(p.week,p.home,p.away)))return Sn(`week: scheduled game ${p.away} @ ${p.home} (week ${p.week}) has no score but week ${p.week} < nextWeek ${e.nextWeek}`);const i=new Map;for(const p of e.scores)p.round&&(i.get(p.round)??i.set(p.round,[]).get(p.round)).push(p);let t=new Set;for(const p of rs){const B=i.get(p)??[];if(!B.length)break;if(B.length!==no[p])return Sn(`week: ${p} has ${B.length} games (expected ${no[p]})`);if(p!=="Wild Card"){for(const C of B)if(!t.has(C.home)&&!t.has(C.away))return Sn(`week: ${p} game ${C.away} @ ${C.home} has no participant from the previous round's winners`)}if(t=new Set(B.map(C=>C.hs>C.as?C.home:C.away)),t.size!==B.length)return Sn(`week: ${p} has a tie or a repeat winner — playoff games cannot tie`)}const u=i.get("Super Bowl")?.[0];if(u&&u.hs===u.as)return Sn("week: the Super Bowl ended level — impossible in the engine");const h=Rf(e);if(!h.ok)return Sn(h.message);const d=h.value,c=new Set(Rn.map(p=>p.name));for(const p of[...e.schedule,...e.scores])if(!c.has(p.home)||!c.has(p.away))return Sn(`week: unknown team name in ${p.away} @ ${p.home}`);return{ok:!0,value:d}}function Sn(n){return{ok:!1,code:"corrupt",message:n}}function Af(n){const e=n.payload,a=e.userResults[e.userResults.length-1];if(!a)return Sn("season: no user results");const s=a.hs>a.as?a.home:a.away;return e.champion===e.userTeam&&e.userOutcome!=="champion"?Sn("season: champion is the user but userOutcome says otherwise"):e.champion!==e.userTeam&&e.userOutcome==="champion"?Sn("season: userOutcome says champion but the stored champion is not the user"):e.champion===e.userTeam&&s!==e.userTeam?Sn("season: stored champion is the user but the last result was a loss"):{ok:!0,value:null}}const Za=n=>({ok:!1,error:n instanceof Error?n.message:String(n)});class bf{constructor(e,a={}){this.ls=e,this.o=a}ls;o;get storage(){return this.ls}async read(e){try{return{ok:!0,value:this.storage?.getItem(e)??null}}catch(a){return Za(a)}}async write(e,a){try{if(Ei(e)&&this.o.slotCheck)try{const s=ll(JSON.parse(a));if(s.ok){const r=this.o.slotCheck(s.value.slot,e);if(r)return{ok:!1,error:r}}}catch{}return this.storage?.setItem(e,a),{ok:!0,value:void 0}}catch(s){return Za(s)}}async remove(e){try{return this.storage?.removeItem(e),{ok:!0,value:void 0}}catch(a){return Za(a)}}async keys(e){try{const a=this.storage;if(!a)return{ok:!0,value:[]};const s=[];for(let r=0;r<a.length;r++){const o=a.key(r);o!==null&&o.startsWith(e)&&s.push(o)}return{ok:!0,value:s.sort()}}catch(a){return Za(a)}}async entries(e){const a=await this.keys(e);if(!a.ok)return a;const s=[];for(const r of a.value){const o=await this.read(r);o.ok&&o.value!==null&&s.push([r,o.value])}return{ok:!0,value:s}}}const Gf=(n={})=>new bf(typeof localStorage>"u"?null:localStorage,n),pr=n=>al("nfl","slot:"+n),eo=ol,hr=Gf({slotCheck:Fi}),Wf=n=>({...n});async function Pf(n,e,a,s){const r=Pi("draft",n,Wf(a),e,s),o=await hr.write(pr(n),r);return o.ok?"":"storage refused the write: "+o.error}const Ff=n=>{const e=n.state.nextWeek<=22?n.teams.length&&(n.state.schedule.find(a=>a.week===n.state.nextWeek&&(a.home===n.context.userTeam||a.away===n.context.userTeam))??null):null;return e?`${e.away} @ ${e.home}`:n.state.nextWeek>22?"season complete":"no user game this week"};async function If(n){const e=await hr.read(pr(n));if(!e.ok)return{slot:n,state:"refused",problem:"corrupt",message:"storage unavailable: "+e.error};if(e.value===null)return{slot:n,state:"empty"};const a=fl(e.value);if(!a.ok)return{slot:n,state:"refused",problem:a.reason,message:a.message};const s=a.value;if(s.kind==="draft"){const l=s.payload;return{slot:n,state:"ok",kind:"draft",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,picks:l.picks.length,userTeamIndex:l.userTeam}}const r=s.kind==="week"?Mf(s):Af(s);if(!r.ok)return{slot:n,state:"refused",problem:"corrupt",message:r.message};if(s.kind==="week"){const l=r.value;return{slot:n,state:"ok",kind:"week",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,week:l.state.nextWeek,userTeam:l.context.userTeam,nextFixture:Ff(l),played:l.state.scores.length+l.state.playoffs.length}}const o=s.payload;return{slot:n,state:"ok",kind:"season",saveId:s.saveId,saveRevision:s.saveRevision,savedAt:s.savedAt,createdAt:s.createdAt,engineVersion:s.engineVersion,dataVersion:s.dataVersion,userTeam:o.userTeam,week:23,played:o.userResults.length,nextFixture:`champion: ${o.champion}`}}async function Nf(n){const e=await hr.read(pr(n));if(!e.ok)return{ok:!1,message:"storage unavailable: "+e.error};if(e.value===null)return{ok:!1,message:"slot "+n+" is empty"};const a=fl(e.value);return a.ok?a.value.kind!=="draft"?{ok:!1,message:"slot "+n+" holds a "+a.value.kind+" save, not a draft"}:{ok:!0,record:a.value.payload}:{ok:!1,message:a.message}}var _f=F('<p class="cp-saves-notice svelte-spfs26" role="alert"> </p>'),Hf=F('<p class="cp-slot-empty svelte-spfs26">empty</p>'),Kf=F('<p class="cp-slot-refused svelte-spfs26"><b> </b> — corrupt-never-repair</p> <p class="cp-slot-msg svelte-spfs26"> </p>',1),Of=F('<p class="cp-slot-line svelte-spfs26"> </p>'),xf=F('<p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-line cp-slot-dim svelte-spfs26"> </p>',1),Vf=F('<p class="cp-slot-kind svelte-spfs26"> </p> <!> <p class="cp-slot-dim svelte-spfs26"> </p> <button class="cp-slot-load svelte-spfs26"> </button>',1),zf=F('<article><h3 class="svelte-spfs26"> </h3> <!> <button class="cp-slot-save svelte-spfs26">Save draft here</button></article>'),Yf=F(`<aside class="cp-hydrated svelte-spfs26" aria-label="Hydrated season"><h3 class="svelte-spfs26"> </h3> <p class="cp-slot-line svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26"> </p> <p class="cp-slot-dim svelte-spfs26">the season screens ride a later slice — the hydration itself is proven (this card renders the engine's LoadedWeek)</p></aside>`),Qf=F(`<section class="cp-saves svelte-spfs26" aria-label="Save and load"><header class="cp-saves-head svelte-spfs26"><h2 class="svelte-spfs26">Saves</h2> <span class="cp-saves-sub svelte-spfs26">slots A · B · C — written through the engine's envelope (saveId · revision · sha-256 dataset stamp)</span> <button class="cp-saves-x svelte-spfs26" aria-label="Close saves">✕</button></header> <!> <div class="cp-slotgrid svelte-spfs26"></div> <!> <p class="cp-saves-foot svelte-spfs26">A refused save is <b class="svelte-spfs26">never repaired</b> — the reason above is the engine's own verdict (hydrateWeek / parseEnvelope).</p></section>`);function jf(n,e){Zn(e,!0);const a=Ie({A:null,B:null,C:null});let s=nn(""),r=nn(null),o=nn(!1);async function l(){W(o,!0);for(const g of eo)a[g]=await If(g);W(o,!1)}lr(()=>{e.record,l()});async function i(g){if(W(s,""),!e.record||!e.meta){W(s,"nothing to save — no draft is in progress");return}const T=await Pf(g,e.record,e.meta,new Date);T&&W(s,T,!0),await l()}async function t(g){W(s,""),W(r,null);const T=a[g];if(!T||T.state!=="ok"){W(s,"nothing loadable in slot "+g);return}if(T.kind==="draft"){const S=await Nf(g);if(!S.ok){W(s,"refused: "+S.message),await l();return}e.onloaddraft(S.record,{saveId:T.saveId,createdAt:T.createdAt}),e.onclose();return}W(r,T,!0)}var f=Qf(),u=H(f),h=k(H(u),4),d=k(u,2);{var c=g=>{var T=_f(),S=E(T,!0);V(()=>w(S,m(s))),P(g,T)};Gn(d,g=>{m(s)&&g(c)})}var p=k(d,2);Hn(p,20,()=>eo,g=>g,(g,T)=>{const S=oe(()=>a[T]);var v=zf();let y;var M=H(v),A=E(M),I=k(M,2);{var x=q=>{var U=Hf();P(q,U)},G=q=>{var U=Kf(),rn=He(U),on=H(rn),An=E(on),yn=k(rn,2),vn=E(yn,!0);V(()=>{w(An,`REFUSED (${m(S).problem??""})`),w(vn,m(S).message)}),P(q,U)},en=q=>{var U=Vf(),rn=He(U),on=E(rn),An=k(rn,2);{var yn=L=>{var K=Of(),b=E(K);V(()=>w(b,`${m(S).picks??""} picks · ${Rn[m(S).userTeamIndex??0]?.name??"?"??""}`)),P(L,K)},vn=L=>{var K=xf(),b=He(K),_=E(b),hn=k(b,2),z=E(hn);V(()=>{w(_,`${m(S).userTeam??""} · next: week ${m(S).week??""}`),w(z,`${m(S).nextFixture??""} · ${m(S).played??""} games played`)}),P(L,K)};Gn(An,L=>{m(S).kind==="draft"?L(yn):L(vn,-1)})}var bn=k(An,2),Kn=E(bn),Pn=k(bn,2),D=E(Pn);V((L,K)=>{w(on,`${L??""} · rev ${m(S).saveRevision??""}`),w(Kn,`saved ${K??""}`),w(D,`Load ${m(S).kind??""}`)},[()=>m(S).kind?.toUpperCase(),()=>m(S).savedAt?.slice(0,16).replace("T"," ")]),pn("click",Pn,()=>t(T)),P(q,U)};Gn(I,q=>{!m(S)||m(S).state==="empty"?q(x):m(S).state==="refused"?q(G,1):q(en,-1)})}var Q=k(I,2);V(()=>{y=ve(v,1,"cp-slot svelte-spfs26",null,y,{"cp-slot-ok":m(S)?.state==="ok","cp-slot-bad":m(S)?.state==="refused"}),ce(v,"data-slot",T),w(A,`Slot ${T??""}`),Q.disabled=!e.record}),pn("click",Q,()=>i(T)),P(g,v)});var B=k(p,2);{var C=g=>{var T=Yf(),S=H(T),v=E(S),y=k(S,2),M=E(y),A=k(y,2),I=E(A);V(()=>{w(v,`Hydrated — ${m(r).kind??""} save, slot ${m(r).slot??""}`),w(M,`${m(r).userTeam??""} · next week ${m(r).week??""} · ${m(r).nextFixture??""}`),w(I,`${m(r).played??""} games played · the table, seeding and champion were RE-DERIVED by the engine (trusted: ratings, roster, scores, plan)`)}),P(g,T)};Gn(B,g=>{m(r)&&g(C)})}pn("click",h,function(...g){e.onclose?.apply(this,g)}),P(n,f),$n()}pe(["click"]);var qf=F("<button> </button>"),Uf=F('<div class="cp-ts-div svelte-qxuqmk"><h3 class="svelte-qxuqmk"> </h3> <!></div>'),Zf=F('<h2 class="cp-ts-conf svelte-qxuqmk"> </h2> <div class="cp-ts-divs svelte-qxuqmk"></div>',1),$f=F('<aside class="cp-ts-detail svelte-qxuqmk" aria-live="polite"><h3 class="svelte-qxuqmk"> </h3> <p class="cp-ts-meta svelte-qxuqmk"> </p> <p class="cp-ts-rivals svelte-qxuqmk"><b class="svelte-qxuqmk">Division rivals:</b> </p> <p class="cp-ts-note svelte-qxuqmk"> </p> <button class="cp-ts-go svelte-qxuqmk"> </button></aside>'),Xf=F('<aside class="cp-ts-detail cp-ts-idle svelte-qxuqmk" aria-live="polite"><p class="cp-ts-note svelte-qxuqmk">Select one of the 32 teams to see its details and start the draft.</p></aside>'),nc=F('<section class="cp-ts svelte-qxuqmk"><h1 class="cp-ts-title svelte-qxuqmk">Pick your team</h1> <p class="cp-prov">Every number you will see on this board reads <b> </b> — the label travels with the numbers.</p> <!> <!></section>');function ec(n,e){Zn(e,!0);let a=nn(null),s=oe(()=>m(a)==null?-1:Rn.findIndex(B=>B.name===m(a))),r=oe(()=>m(a)==null?null:ur[m(a)]),o=oe(()=>m(a)==null||!m(r)?[]:ea(m(r).conf,m(r).div).filter(B=>B!==m(r).name));function l(){m(s)<0||e.onstart(m(s))}var i=nc(),t=k(H(i),2),f=k(H(t)),u=E(f,!0),h=k(t,2);Hn(h,16,()=>["AFC","NFC"],B=>B,(B,C)=>{var g=Zf(),T=He(g),S=E(T,!0),v=k(T,2);Hn(v,20,()=>Be,y=>y,(y,M)=>{var A=Uf(),I=H(A),x=E(I),G=k(I,2);Hn(G,16,()=>ea(C,M),en=>en,(en,Q)=>{var q=qf();let U;var rn=E(q,!0);V(()=>{U=ve(q,1,"cp-ts-team svelte-qxuqmk",null,U,{"cp-on":m(a)===Q}),ce(q,"aria-pressed",m(a)===Q),w(rn,Q)}),pn("click",q,()=>W(a,Q,!0)),P(en,q)}),V(()=>w(x,`${C??""} ${M??""}`)),P(y,A)}),V(()=>w(S,C)),P(B,g)});var d=k(h,2);{var c=B=>{var C=$f(),g=H(C),T=E(g,!0),S=k(g,2),v=E(S),y=k(S,2),M=k(H(y)),A=k(y,2),I=E(A),x=k(A,2),G=E(x);V((en,Q)=>{w(T,m(r).name),w(v,`${m(r).conf??""} ${m(r).div??""}`),w(M,` ${en??""}`),w(I,`You draft as this team: the board's on-clock indicator, your picks and your roster are all ${m(r).name??""}'s.`),w(G,`DRAFT AS ${Q??""}`)},[()=>m(o).join(" · "),()=>m(r).name.toUpperCase()]),pn("click",x,l),P(B,C)},p=B=>{var C=Xf();P(B,C)};Gn(d,B=>{m(r)?B(c):B(p,-1)})}V(B=>w(u,B),[()=>cs[Ee.get().mode]]),P(n,i),$n()}pe(["click"]);var ac=F('<span class="cp-feed-dim svelte-tsx9t1"> </span>'),sc=F('<div class="cp-feed-q svelte-tsx9t1"> </div>'),ao=F('<span class="zrl-badge svelte-tsx9t1"> </span>'),rc=F('<!> <article><span class="zrl-t svelte-tsx9t1"> </span> <span class="zrl-team svelte-tsx9t1"> </span> <span class="zrl-play svelte-tsx9t1"><span class="cp-feed-summary svelte-tsx9t1"> </span> <span class="cp-feed-badges svelte-tsx9t1"><!> <!></span></span> <span class="zrl-sc svelte-tsx9t1"><b class="svelte-tsx9t1"> </b> <span class="cp-feed-dot svelte-tsx9t1">·</span> <b class="svelte-tsx9t1"> </b></span></article>',1),oc=F('<p class="cp-feed-empty svelte-tsx9t1">no drives match the filter</p>'),lc=F(`<section class="cp-feed svelte-tsx9t1" aria-label="Game feed"><header class="cp-feed-head svelte-tsx9t1"><span class="cp-feed-week svelte-tsx9t1"> </span> <span class="cp-feed-vs svelte-tsx9t1"> </span> <span class="cp-feed-tools svelte-tsx9t1"><button>NEWEST FIRST</button> <button>MY DRIVES</button> <button class="cp-feedtool svelte-tsx9t1">← BOARD</button></span></header> <div class="cp-feed-final svelte-tsx9t1"><b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-at svelte-tsx9t1">at</span> <b class="svelte-tsx9t1"><span> </span> </b> <span class="cp-feed-finalnote svelte-tsx9t1"> <!></span> <span class="cp-feed-prov svelte-tsx9t1"> </span></div> <div class="cp-feed-log svelte-tsx9t1" data-testid="cp-feed-log"><!> <!></div> <footer class="cp-feed-foot svelte-tsx9t1"><span> </span> <span class="cp-feed-dim svelte-tsx9t1">drives and scores read off the engine's own game; the feed adds nothing (yards ride a later engine field — none is faked)</span></footer></section>`);function tc(n,e){Zn(e,!0);let a=nn(!1),s=nn(!1);const r=oe(()=>m(a)?[...e.feed.drives].reverse():e.feed.drives),o=oe(()=>m(s)?m(r).filter(b=>b.me):m(r)),l=b=>b.replace(":","·"),i=b=>b==="good"?"var(--cp-good)":b==="bad"?"var(--cp-bad)":b==="gold"?"var(--cp-gold)":"var(--cp-sub)";var t=lc(),f=H(t),u=H(f),h=E(u),d=k(u,2),c=E(d),p=k(d,2),B=H(p);let C;var g=k(B,2);let T;var S=k(g,2),v=k(f,2),y=H(v),M=H(y),A=E(M,!0),I=k(M),x=k(y,4),G=H(x),en=E(G,!0),Q=k(G),q=k(x,2),U=H(q),rn=k(U);{var on=b=>{var _=ac(),hn=E(_);V(()=>w(hn,`· regulation ${e.feed.regAway??""}–${e.feed.regHome??""}`)),P(b,_)};Gn(rn,b=>{(e.feed.regHome!==e.feed.homeScore||e.feed.regAway!==e.feed.awayScore)&&b(on)})}var An=k(q,2),yn=E(An,!0),vn=k(v,2),bn=H(vn);Hn(bn,19,()=>m(o),b=>b.n,(b,_,hn)=>{var z=rc(),Dn=He(z);{var wn=sn=>{var Fn=sc(),Yn=E(Fn,!0);V(()=>w(Yn,m(_).period>=5?"OT":`Q${m(_).period}`)),P(sn,Fn)};Gn(Dn,sn=>{!m(s)&&!m(a)&&(m(hn)===0||m(o)[m(hn)-1].period!==m(_).period)&&sn(wn)})}var dn=k(Dn,2);let Xn;var ne=H(dn),an=E(ne,!0),fn=k(ne,2),he=E(fn,!0),cn=k(fn,2),J=H(cn),N=E(J,!0),Z=k(J,2),ln=H(Z);Hn(ln,17,()=>m(_).badges,sn=>sn.label,(sn,Fn)=>{var Yn=ao(),Ss=E(Yn,!0);V(ys=>{be(Yn,`color:${ys??""}`),w(Ss,m(Fn).label)},[()=>i(m(Fn).tone)]),P(sn,Yn)});var un=k(ln,2);Hn(un,17,()=>m(_).convBadges,sn=>sn.label,(sn,Fn)=>{var Yn=ao(),Ss=E(Yn,!0);V(ys=>{be(Yn,`color:${ys??""}`),w(Ss,m(Fn).label)},[()=>i(m(Fn).tone)]),P(sn,Yn)});var ke=k(cn,2),ee=H(ke),zn=E(ee,!0),de=k(ee,4),ae=E(de,!0);V(sn=>{Xn=ve(dn,1,"cp-feed-line svelte-tsx9t1",null,Xn,{"cp-me":m(_).me}),be(dn,`--beat:${m(hn)??""}`),ce(dn,"data-period",m(_).period),w(an,sn),be(fn,`color:${m(_).teamPale??""}`),w(he,m(_).teamAbbr),w(N,m(_).summary),be(ee,`color:${e.feed.awayInk.pale??""}`),w(zn,m(_).scoreAfter.away),be(de,`color:${e.feed.homeInk.pale??""}`),w(ae,m(_).scoreAfter.home)},[()=>m(_).period>=5?`OT${m(_).period-4}`:l(m(_).clock)]),P(b,z)});var Kn=k(bn,2);{var Pn=b=>{var _=oc();P(b,_)};Gn(Kn,b=>{m(o).length||b(Pn)})}var D=k(vn,2),L=H(D),K=E(L);V(()=>{w(h,`WEEK ${e.feed.week??""} · ${e.feed.year??""}`),w(c,`${e.feed.awayAbbr??""} @ ${e.feed.homeAbbr??""}`),C=ve(B,1,"cp-feedtool svelte-tsx9t1",null,C,{"cp-feedtool-on":m(a)}),ce(B,"aria-pressed",m(a)),T=ve(g,1,"cp-feedtool svelte-tsx9t1",null,T,{"cp-feedtool-on":m(s)}),ce(g,"aria-pressed",m(s)),be(M,`color:${e.feed.awayInk.pale??""}`),w(A,e.feed.awayAbbr),w(I,` ${e.feed.awayScore??""}`),be(G,`color:${e.feed.homeInk.pale??""}`),w(en,e.feed.homeAbbr),w(Q,` ${e.feed.homeScore??""}`),w(U,`${e.feed.ot?e.feed.ot.tie?`TIE — OT ×${e.feed.ot.periods} (both teams possessed)`:`FINAL — OT ×${e.feed.ot.periods} (both teams possessed)`:"FINAL"} `),w(yn,e.feed.gameSeedLabel),w(K,`${e.feed.drives.length??""} drives · ${e.feed.meDrives??""} mine · ${e.feed.leadChanges??""} lead changes`)}),pn("click",B,()=>W(a,!m(a))),pn("click",g,()=>W(s,!m(s))),pn("click",S,function(...b){e.onclose?.apply(this,b)}),P(n,t),$n()}pe(["click"]);const ic=["RB1","RB2","WR1","WR2","WR3","TE1","TE2","MIKE","WILL","SAM","CB1","CB2","CB3","SS","FS"],Ws={spd:.8,ovr:.1,str:.1};function fc(n){return Math.min(99,n.spd*Ws.spd+n.ovr*Ws.ovr+n.str*Ws.str)}function cc(n){const e=[];for(const a of n.placements)a.player&&ic.includes(a.slot.slot)&&e.push({slot:a.slot.slot,player:a.player,value:fc(a.player)});return e.sort((a,s)=>s.value-a.value||(a.player.id<s.player.id?-1:1))}function uc(n,e){const a=cc(n);return a.find(s=>s.player.id===e)??a[0]??null}function pc(n,e){return uc(n,e)?.value??ml}function so(n,e,a){return a?Math.max(...Tl.map(s=>Ne(n,e,e,{off:s,def:hs}).structPts)):-Math.min(...vl.map(s=>Ne(e,n,e,{off:ps,def:s}).structPts))}function ro(n,e){return so(n,e,!0)+so(n,e,!1)}function hc(n,e,a){const s=l=>l==="home"?e:a,r=l=>{const i=Math.min(4,Math.max(1,Math.ceil(l/900))),t=900*i-l;return`Q${i} ${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`},o=n.drives.map((l,i)=>({kind:"drive",n:i+1,team:s(l.side),period:l.period,clock:r(l.start),plays:l.plays,yards:null,end:l.end,pts:l.pts,oppPts:l.oppPts,defTD:l.defTD,scores:n.events.filter(t=>t.drive===i+1).map(t=>({team:s(t.side),kind:t.kind,pts:t.pts,conv:t.conv??"none",at:t.at})),summary:dc(l,s(l.side))}));return{v:1,home:e,away:a,homeScore:n.homeScore,awayScore:n.awayScore,regHome:n.regHome,regAway:n.regAway,ot:n.ot?{first:s(n.ot.first),periods:n.ot.periods,tie:n.ot.tie}:null,drives:o,mvpLine:null}}function dc(n,e){const a={TD:"ends in a touchdown",FG:"kicks a field goal",FG_MISS:"misses a field goal",PUNT:"punts",INT:"throws an interception",FUM:"loses a fumble",DOWNS:"turns it over on downs",HALF:"runs out the half",SAFETY:"is sacked in the end zone for a safety"},s=Math.max(1,Math.round(n.secs/60)),r=n.oppPts?` ${e} gives up ${n.oppPts} the other way.`:"";return`${e} ${a[n.end]} — ${n.plays} plays, ${s} min.${r}`}const Bc={"Arizona Cardinals":"ARI","Atlanta Falcons":"ATL","Baltimore Ravens":"BAL","Buffalo Bills":"BUF","Carolina Panthers":"CAR","Chicago Bears":"CHI","Cincinnati Bengals":"CIN","Cleveland Browns":"CLE","Dallas Cowboys":"DAL","Denver Broncos":"DEN","Detroit Lions":"DET","Green Bay Packers":"GB","Houston Texans":"HOU","Indianapolis Colts":"IND","Jacksonville Jaguars":"JAX","Kansas City Chiefs":"KC","Las Vegas Raiders":"LV","Los Angeles Chargers":"LAC","Los Angeles Rams":"LAR","Miami Dolphins":"MIA","Minnesota Vikings":"MIN","New England Patriots":"NE","New Orleans Saints":"NO","NY Giants":"NYG","NY Jets":"NYJ","Philadelphia Eagles":"PHI","Pittsburgh Steelers":"PIT","San Francisco 49ers":"SF","Seattle Seahawks":"SEA","Tampa Bay Buccaneers":"TB","Tennessee Titans":"TEN","Washington Commanders":"WAS"},Sa=n=>Bc[n]??n.slice(0,3).toUpperCase(),Cc={"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"Chicago Bears":["#0B162A","#000000","#FFFFFF"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Dallas Cowboys":["#003594","#869397","#FFFFFF"],"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"NY Giants":["#0B2265","#A71930","#A5ACAF"],"NY Jets":["#125740","#FFFFFF","#000000"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"],"Tennessee Titans":["#4B92DB","#0C2340","#C8102E"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},gc="#181114",oo=n=>{const e=n.replace("#",""),a=[0,2,4].map(s=>parseInt(e.slice(s,s+2),16)/255).map(s=>s<=.03928?s/12.92:((s+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2]},mc=(n,e)=>{const a=oo(n),s=oo(e);return(Math.max(a,s)+.05)/(Math.min(a,s)+.05)},Ps=n=>mc(n,gc);function lo(n){const s=[...Cc[n]??["#e8c87e","#f5e9dd","#c8a48f"]].sort((r,o)=>Ps(o)-Ps(r))[0];return Ps(s)>=3?{ink:s,pale:s}:{ink:s,pale:`color-mix(in srgb, ${s} 55%, #f5e9dd)`}}const bl=2027;function Tc(n){const e=dl(n.pool),a=new Map(e.map(r=>[r.id,r])),s=Rn.map(()=>[]);for(const r of n.picks){const o=a.get(r.pid);o&&s[r.team]?.push(o)}return s}function vc(n){const a=["4-3","3-4"].map(o=>Bl(n,o)).map(o=>({l:o,R:sf(ef(o),pc(o))})),s=kl(a.map(o=>o.R)),r=a[1]&&ro(a[1].R,s)>ro(a[0].R,s)?a[1]:a[0];return{lineup:r.l,ratings:r.R}}function Sc(n,e,a){const r=Tc(n).map(v=>vc(v)),o=Rn.map((v,y)=>({name:v.name,ratings:r[y].ratings})),l=ff(na(e).fork("schedule"),bl,Cf(o)).sort((v,y)=>v.week-y.week),i=Rn[a].name,t=l.find(v=>v.week===1&&(v.home===i||v.away===i));if(!t)throw new Error("feed: the user has no week-1 game on the engine schedule");const f=t.home,u=t.away,h=o[Rn.findIndex(v=>v.name===f)],d=o[Rn.findIndex(v=>v.name===u)],c=kl(o.map(v=>v.ratings)),p=Ur(h.ratings,c),B=Ur(d.ratings,c),C=Ne(h.ratings,d.ratings,c,{off:p.off,def:B.def}),g=Ne(d.ratings,h.ratings,c,{off:B.off,def:p.def}),T=Al(e,t.week,f);return{result:nf(C,g,na(T),{}),home:f,away:u,gs:T,userHome:f===i,schedule:l}}const yc={TD:{label:"TD",tone:"good"},FG:{label:"FG",tone:"good"},INT:{label:"INT",tone:"bad"},FUM:{label:"FUM",tone:"bad"},PUNT:{label:"PUNT",tone:"sub"},DOWNS:{label:"DOWNS",tone:"sub"},FG_MISS:{label:"MISS",tone:"bad"},HALF:{label:"EOH",tone:"sub"},SAFETY:{label:"SAFETY",tone:"bad"}},Dc={xp:{label:"XP",tone:"good"},two:{label:"2PT",tone:"good"},xp_miss:{label:"XP MISS",tone:"sub"},two_fail:{label:"2PT FAIL",tone:"sub"},none:{label:"NO TRY",tone:"sub"}};function kc(n,e,a){const{result:s,home:r,away:o,gs:l,userHome:i}=Sc(n,e,a),t=hc(s,r,o),f={[r]:lo(r),[o]:lo(o)},u=Rn[a].name;let h=0,d=0,c=0,p=0,B="tie";const C=t.drives.map(g=>{g.team===r?(h+=g.pts,d+=g.oppPts):(d+=g.pts,h+=g.oppPts),g.team===u&&p++;const S=h>d?"home":d>h?"away":"tie",v=S!==B&&S!=="tie";v&&c++,B=S;const y=[],M=yc[g.end]??{label:g.end,tone:"sub"};y.push(M),g.defTD&&y.push({label:"DEF TD",tone:"gold"}),v&&y.push({label:"LEAD Δ",tone:"gold"});const A=g.scores.find(x=>x.kind==="TD"&&x.team===g.team),I=A?[Dc[A.conv]].filter(x=>!!x):[];return{...g,homeAbbr:Sa(r),awayAbbr:Sa(o),teamAbbr:Sa(g.team),teamInk:f[g.team].pale,teamPale:f[g.team].pale,me:g.team===u,leadChange:v,scoreAfter:{home:h,away:d},badges:y,convBadges:I}});return{week:1,year:bl,home:r,away:o,homeAbbr:Sa(r),awayAbbr:Sa(o),homeInk:f[r],awayInk:f[o],homeScore:t.homeScore,awayScore:t.awayScore,regHome:t.regHome,regAway:t.regAway,ot:t.ot,gameSeedLabel:`gameSeed ${l} · week 1 · ${o} @ ${r} · played by the pinned engine`,drives:C,meDrives:p,leadChanges:c,userWon:t.homeScore===t.awayScore?null:t.homeScore>t.awayScore?i:!i}}var Rc=F('<button class="cp-topbar-btn svelte-1n46o8q">Saves</button>'),Lc=F('<p class="cp-note svelte-1n46o8q">Loading…</p>'),wc=F(`<section class="cp-empty svelte-1n46o8q"><h1 class="svelte-1n46o8q">76 Pancakes</h1> <p>No player dataset yet. The draft board needs the ratings file (eight columns: id, name, pos, team, ovr, spd, str, freeAgent).</p> <p class="cp-note svelte-1n46o8q">Import a dataset CSV to begin — or open a dev build with <code>?dev=1</code> (the engine's own bundled ratings, labelled DEV).</p> <p><a class="cp-devlink svelte-1n46o8q" href="?dev=1">Open the dev build →</a></p></section>`),Ec=F('<p class="cp-error svelte-1n46o8q"> </p>'),Jc=F('<!> <p class="cp-prov svelte-1n46o8q">Every number on this board reads <b class="svelte-1n46o8q"> </b> — the label travels with the numbers.</p> <!> <!>',1),Mc=F(`<main class="cp-root svelte-1n46o8q"><header class="cp-topbar svelte-1n46o8q"><span class="cp-brand svelte-1n46o8q">76 P<strong class="cp-shine svelte-1n46o8q">a</strong>ncakes</span> <span class="cp-track svelte-1n46o8q" title="the builders' track name">67 Cakepanz · slices 1-4</span> <span class="cp-topbtns svelte-1n46o8q"><!></span> <!></header> <!></main>`);function Ac(n,e){Zn(e,!0);const a=()=>xe(d,"$boot",f),s=()=>xe(C,"$vmStore",f),r=()=>xe(p,"$draftState",f),o=()=>xe(S,"$openNow",f),l=()=>xe(T,"$oddsMeta",f),i=()=>xe(v,"$needsSel",f),t=()=>xe(g,"$advice",f),[f,u]=ii(),h="67-cakepanz@4ca9a071",d=ze({phase:"loading"});let c=Ar([]),p=br(c),B="wins";const C=ze(null),g=ze([]),T=ze(null),S=ze([]),v=ze([]);let y=0,M=777,A=nn("team"),I=nn(""),x=nn(null),G=nn("sha256:pending"),en=nn(""),Q=nn("");const q=new URLSearchParams(location.search).has("dev");function U(){if(!q){d.set({phase:"empty"});return}const J=pi,ln=yi(J,hi,di);c=Ar(ln),p=br(c),d.set({phase:"ready",players:ln}),window.__cp={store:c,refresh:on,valuation:Ee},W(A,"team"),ki(J).then(un=>W(G,"sha256:"+un))}function rn(J){M=1e3+Math.floor(Math.random()*9e3),y=J,W(A,"board"),W(en,crypto?.randomUUID?.()??"save-"+M+"-"+Date.now(),!0),W(Q,new Date().toISOString(),!0),c.dispatch({type:"START",seed:M,userTeam:y}),Ee.lock(),on()}function on(){const J=c.getState();if(J.error&&W(I,J.error,!0),!J.draft||J.status==="idle"){C.set(null),T.set(null),S.set([]);return}S.set(Va(J.draft.rosters[y]));try{const N=$i(J.draft,y,na(M*7+13),30);T.set({picksBetween:N.picksBetween,sims:N.sims}),C.set(c0(J.draft,y,N,{sort:B}))}catch{}try{const N=Object.values(J.draft.rosters[y]).filter(Boolean),Z=Bl(N,"4-3");g.set(Z.placements.map(ln=>({label:ln.slot?.label??ln.slot?.slot??"?",name:ln.player?.name??"(empty)",ovr:ln.player?String(ln.effOvr??ln.player.ovr):"-"})))}catch{g.set([])}}function An(J,N){c.dispatch({type:"PICK",playerId:J,slot:N}),on()}function yn(){c.dispatch({type:"UNDO"}),on()}function vn(J){B=J,on()}function bn(J){v.update(N=>N.includes(J)?N.filter(Z=>Z!==J):[...N,J])}function Kn(){v.set([])}const Pn=()=>c.getState().record,D=()=>({engineVersion:h,dataVersion:m(G),saveId:m(en)||W(en,crypto?.randomUUID?.()??"save-"+M,!0),saveRevision:1+(c.getState().record?.picks.length??0),createdAt:m(Q)||W(Q,new Date().toISOString(),!0)});function L(J,N){const Z=J;if(!Z){W(I,"load: empty record");return}M=Z.seed,y=Z.userTeam,W(en,N?.saveId||(crypto?.randomUUID?.()??"save-"+Z.seed),!0),W(Q,N?.createdAt||new Date().toISOString(),!0),c.dispatch({type:"LOAD",record:J}),Ee.lock(),W(A,"board"),on()}function K(){const J=c.getState().record;if(!J||c.getState().status!=="done"){W(I,"the week-1 feed needs a finished draft");return}try{W(x,kc(J,M,y),!0),W(A,"feed")}catch(N){W(I,N.message,!0)}}lr(()=>{}),ci(()=>{Ee.subscribe(()=>on()),U()});var b=Mc(),_=H(b),hn=k(H(_),4),z=H(hn);{var Dn=J=>{var N=Rc();V(()=>ce(N,"aria-pressed",m(A)==="saves")),pn("click",N,()=>W(A,m(A)==="saves"?"board":"saves",!0)),P(J,N)};Gn(z,J=>{a().phase==="ready"&&J(Dn)})}var wn=k(hn,2);G0(wn,{});var dn=k(_,2);{var Xn=J=>{var N=Lc();P(J,N)},ne=J=>{var N=wc();P(J,N)},an=J=>{ec(J,{onstart:rn})},fn=J=>{{let N=oe(Pn),Z=oe(D);jf(J,{get record(){return m(N)},get meta(){return m(Z)},get userTeamIndex(){return y},onclose:()=>W(A,"board"),onloaddraft:L})}},he=J=>{tc(J,{get feed(){return m(x)},onclose:()=>{W(A,"board"),W(x,null)}})},cn=J=>{var N=Jc(),Z=He(N);{var ln=ae=>{var sn=Ec(),Fn=E(sn,!0);V(()=>w(Fn,m(I))),P(ae,sn)};Gn(Z,ae=>{m(I)&&ae(ln)})}var un=k(Z,2),ke=k(H(un)),ee=E(ke,!0),zn=k(un,2);{let ae=oe(()=>(r()?.record?.picks?.length??0)>0),sn=oe(()=>r()?.status==="done");M0(zn,{get vm(){return s()},onpick:An,onundo:yn,onsort:vn,get canUndo(){return m(ae)},get openSlots(){return o()},get oddsMeta(){return l()},get needsSelected(){return i()},onneedtoggle:bn,onneedclear:Kn,onplay:K,get draftDone(){return m(sn)}})}var de=k(zn,2);F0(de,{get slots(){return t()}}),V(ae=>w(ee,ae),[()=>cs[Ee.get().mode]]),P(J,N)};Gn(dn,J=>{a().phase==="loading"?J(Xn):a().phase==="empty"?J(ne,1):a().phase==="ready"&&m(A)==="team"?J(an,2):m(A)==="saves"?J(fn,3):m(A)==="feed"&&m(x)?J(he,4):s()&&J(cn,5)})}P(n,b),$n(),u()}pe(["click"]);Yt(Ac,{target:document.getElementById("app")});
