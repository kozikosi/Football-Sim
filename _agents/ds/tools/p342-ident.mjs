// P-342 review: is lambda identified by the design's stated estimator (dispersion matching)?
// Toy: y_t = lambda*g_t + e_t, 32 teams, Var(g)=1, lambda=1. Compare sqrt(Var(y)/Var(g)) with Cov(y,g)/Var(g).
const mean=(a)=>a.reduce((s,x)=>s+x,0)/a.length;
const vari=(a)=>{const m=mean(a);return a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1);};
function gauss(rng){let u=0,v=0;while(!u)u=rng();while(!v)v=rng();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
function mulberry(seed){let a=seed>>>0;return()=>{a=(a+0x6d2b79f5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
const LAM=1, T=32, R=20000;
for (const res of [0.5, 1, 2]) {          // Var(e) / Var(the part explained by ratings)
  const dM=[], rM=[];
  for (let r=0;r<R;r++){
    const rng=mulberry(1234567 + r*2654435761);
    const g=[], y=[];
    for (let t=0;t<T;t++){ const x=gauss(rng); g.push(x); y.push(LAM*x + Math.sqrt(res)*gauss(rng)); }
    dM.push(Math.sqrt(vari(y)/vari(g)));       // dispersion matching, no residual subtracted
    const mg=mean(g), my=mean(y); let cov=0;
    for (let t=0;t<T;t++) cov+=(g[t]-mg)*(y[t]-my);
    rM.push((cov/(T-1))/vari(g));              // same-moment regression
  }
  console.log(`Var(e)/Var(explained)=${res}  true lambda=1.00`);
  console.log(`  dispersion matching: mean ${mean(dM).toFixed(3)} (bias ${(mean(dM)-LAM).toFixed(3)}), sd across leagues ${Math.sqrt(vari(dM)).toFixed(3)}`);
  console.log(`  regression Cov/Var:  mean ${mean(rM).toFixed(3)} (bias ${(mean(rM)-LAM).toFixed(3)}), sd across leagues ${Math.sqrt(vari(rM)).toFixed(3)}`);
}
