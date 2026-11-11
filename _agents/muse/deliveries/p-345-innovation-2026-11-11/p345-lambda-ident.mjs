// P-345 Q1 (MUSE): lambda identification — what the Lab at two gaps identifies, and what it doesn't.
// World: binary outcomes P = sigmoid(beta*g), beta = lambda*theta (the PRODUCT), g = OVR gap / 20.
// The Lab measures Wins(gap) = 17*[sigmoid(beta*gap/20) - 0.5] + noise (a well-run Lab: sd 0.05 wins).
// Estimators of beta:
//   (i) one-gap linear rule: near 0, sigmoid(x) ~ 0.5 + x/4, so Wins(gap) ~ 17*beta*gap/80,
//       hence beta_hat = Wins(gap)*80/(17*gap). Two gaps give two estimates.
//   (ii) two-gap sigmoid fit: grid-search beta minimising squared error on Wins10 AND Wins20 jointly.
// Also: the ratio R = Wins20/Wins10. Linear world predicts R = 2 exactly; sigmoid predicts R < 2.
// True beta in {0.5, 1.0, 2.0}. 2000 reps per beta. Deterministic (mulberry seeds).
function mulberry(seed){let a=seed>>>0;return()=>{a=(a+0x6d2b79f5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function gauss(rng){let u=0,v=0;while(!u)u=rng();while(!v)v=rng();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
const sig=(x)=>1/(1+Math.exp(-x));
const mean=(a)=>a.reduce((s,x)=>s+x,0)/a.length;
const sd=(a)=>{const m=mean(a);return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1));};
function twoGapFit(w10, w20){
  let best=0, bestErr=Infinity;
  for (let b=0; b<=4.0001; b+=0.01){
    const e=(w10-17*(sig(b/2)-0.5))**2 + (w20-17*(sig(b)-0.5))**2;
    if (e<bestErr){bestErr=e;best=b;}
  }
  return best;
}
for (const beta of [0.5, 1.0, 2.0]){
  const lin10=[], lin20=[], fit=[], ratio=[];
  for (let r=0;r<2000;r++){
    const rng=mulberry(987654321 + r*2654435761);
    const w10=17*(sig(beta/2)-0.5)+0.05*gauss(rng);
    const w20=17*(sig(beta)-0.5)+0.05*gauss(rng);
    lin10.push(w10*80/(17*10));
    lin20.push(w20*80/(17*20));
    fit.push(twoGapFit(w10,w20));
    ratio.push(w20/w10);
  }
  console.log(`true beta=${beta.toFixed(1)} (beta = lambda*theta)`);
  console.log(`  one-gap linear from Wins10: mean ${mean(lin10).toFixed(3)} (bias ${(mean(lin10)-beta).toFixed(3)}), sd ${sd(lin10).toFixed(3)}`);
  console.log(`  one-gap linear from Wins20: mean ${mean(lin20).toFixed(3)} (bias ${(mean(lin20)-beta).toFixed(3)}), sd ${sd(lin20).toFixed(3)}`);
  console.log(`  two-gap sigmoid fit:         mean ${mean(fit).toFixed(3)} (bias ${(mean(fit)-beta).toFixed(3)}), sd ${sd(fit).toFixed(3)}`);
  console.log(`  ratio Wins20/Wins10:         mean ${mean(ratio).toFixed(3)} (linear world predicts 2.000)`);
}
// Linear world control (Wins linear in gap: Wins(gap) = 17*beta*gap/80 + noise): the two one-gap
// estimates must AGREE, and the ratio must be 2. This is the falsification check for the sigmoid form.
for (const beta of [1.0]){
  const lin10=[], lin20=[], ratio=[];
  for (let r=0;r<2000;r++){
    const rng=mulberry(555555555 + r*2654435761);
    const w10=17*beta*10/80+0.05*gauss(rng);
    const w20=17*beta*20/80+0.05*gauss(rng);
    lin10.push(w10*80/(17*10)); lin20.push(w20*80/(17*20)); ratio.push(w20/w10);
  }
  console.log(`LINEAR-WORLD control, true beta=${beta.toFixed(1)}:`);
  console.log(`  one-gap from Wins10: ${mean(lin10).toFixed(3)}; from Wins20: ${mean(lin20).toFixed(3)}; ratio Wins20/Wins10: ${mean(ratio).toFixed(3)}`);
}
