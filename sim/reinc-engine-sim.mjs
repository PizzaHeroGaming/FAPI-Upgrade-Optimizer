import { readFileSync } from 'fs';
import zlib from 'zlib';
const buf=readFileSync("C:/Users/ruien/AppData/LocalLow/Oni Gaming/Farmer Against Potatoes Idle/fapi-save.txt");
const o=JSON.parse(zlib.gunzipSync(buf).toString('utf8').replace(/^[^{]*/,'').replace(/[^}]*$/,''));
const bd=v=>(v&&typeof v==='object'&&v.mantissa!=null)?{m:v.mantissa,e:v.exponent||0}:({m:Number(v)||0,e:0});
const L10=x=>{const b=bd(x);return b.m<=0?-Infinity:Math.log10(b.m)+b.e;};  // log10 of a BD field

// ---- exact decompiled formulas, in log10 space ----
function logReincGain(CL, bestProg, confLvl, timeBonus, reincBonusL10){
  let g=Math.log10(CL);
  g+=Math.min(1000,CL)*Math.log10(1.001);
  g+=Math.log10(Math.max(1, Math.log(CL)/Math.log(5)-2));
  g+=Math.log10(Math.max(1, 1+(CL/2000-0.5)));
  g+=Math.log10(1+bestProg/5000);
  const confR=confLvl/5e6; const confBonus=1+Math.max(0,Math.min(confR, Math.log2(confR)/2+1));
  g+=Math.log10(confBonus);
  g+=Math.log10(timeBonus);
  g+=reincBonusL10;
  return g; // log10(reinc-exp gained per tick)
}
// ReincarnationExpRequiredToLevel(level) in log10 (ignoring residue/expedition reductions for the shape; they lower it)
function logReqToLevel(level, portalExpo=1){
  let L=Math.log10(5+level*5);
  L+=Math.min(level,3000)*Math.log10(Math.min(1.0025,1.00005+Math.max(0,level/500000)));
  L+=Math.max(level-3000,0)*Math.log10(1.001);
  L+=Math.log10(1+Math.max(0,Math.min(1,(level-1500)/1000)));
  return L*portalExpo;
}
const CL=o.CurrentLevel, bestProg=o.BestProgress, confLvl=o.ConfectionTotalLevel, tb=o.TimerReincBonuses;
const rbL10=L10(o.ReincarnationBonusesBD);
const reincLvl=o.ReincarnationLevel, reincReq=o.AscensionReincLevelRequired;
const gainL10=logReincGain(CL,bestProg,confLvl,tb,rbL10);
console.log('=== CURRENT STATE (from save) ===');
console.log('Ascension',o.AscensionCount,'| Reinc level',reincLvl.toLocaleString(),'/',reincReq.toLocaleString(),'('+(reincLvl/reincReq*100).toFixed(2)+'%)');
console.log('Reinc-exp GAIN/tick: 1e'+gainL10.toFixed(1));
console.log('Reinc-exp REQUIRED per level now: 1e'+logReqToLevel(reincLvl).toFixed(1),' | at ascension target: 1e'+logReqToLevel(reincReq).toFixed(1));
// THE WALL: level where required-per-level == gain (progress stalls)
let lo=reincLvl, hi=reincLvl*3;
for(let i=0;i<60;i++){const mid=(lo+hi)/2; if(logReqToLevel(mid)<gainL10) lo=mid; else hi=mid;}
const wall=Math.round(lo);
console.log('\n=== THE REINC WALL ===');
console.log('Progress stalls where required/level = gain → reinc level ~'+wall.toLocaleString());
console.log('Ascension target is '+reincReq.toLocaleString()+' → wall is '+(wall>reincReq?'ABOVE':'BELOW')+' target by '+Math.abs(wall-reincReq).toLocaleString()+' levels');
console.log('(So the ascension requirement sits right at your reinc-exp wall — you grind to the wall, ascend, and ascension raises gain so the wall moves up.)');

// ---- LUMP MODEL: reinc-exp is banked when you reincarnate (ReincarnationExpGained is a one-shot) ----
console.log('\n=== LUMP MECHANIC (the real model) ===');
const curExpL10=L10(o.ReincarnationCurrentExpBD);
console.log('Reinc-exp is BANKED in a lump each time you reincarnate (decompiled: += ReincarnationExpGained on reinc/ascend), NOT per second.');
console.log('Your pending lump if you reincarnate now: 1e'+gainL10.toFixed(1)+' reinc-exp (driven by your ×'+Math.round(tb)+' Time Bonus from a long run).');
// total exp to reach ascension target ≈ cumulative required ≈ dominated by top level
const reqAtTarget=logReqToLevel(reincReq);
console.log('Exp banked toward next level now: 1e'+curExpL10.toFixed(1)+' / 1e'+logReqToLevel(reincLvl).toFixed(1)+' needed.');
console.log('A lump of 1e'+gainL10.toFixed(1)+' vs per-level cost ~1e'+reqAtTarget.toFixed(1)+' near the target → one reincarnation jumps you ~'+Math.round((gainL10-reqAtTarget>0? Math.pow(10,Math.min(6,gainL10-reqAtTarget)) : 1)).toLocaleString()+'+ levels, past the '+reincReq.toLocaleString()+' ascension target.');
console.log('\n>>> ACTION: you can Reincarnate to bank the lump, cross the ascension requirement, then ASCEND. <<<');
console.log('(The ×'+Math.round(tb)+' Time Bonus resets to 0 on reincarnation and must rebuild — so you only reincarnate when the pending lump is worth banking, e.g. to finish an ascension.)');
