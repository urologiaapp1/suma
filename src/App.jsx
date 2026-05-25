
import React,{useState} from "react";

export default function App(){
const TOTAL=30;
const [view,setView]=useState("home");
const [questions,setQuestions]=useState([]);
const [idx,setIdx]=useState(0);
const [score,setScore]=useState(0);
const [answer,setAnswer]=useState("");
const [feedback,setFeedback]=useState(null);
const [balls,setBalls]=useState([]);
const [mode,setMode] = useState(10);

const makeGame=(limit)=>{
 let q=[];
 for(let i=0;i<TOTAL;i++){
  let a,b;
  do{
   a=Math.floor(Math.random()*(limit+1));
   b=Math.floor(Math.random()*(limit+1));
  }while(a+b>limit);
  const r=a+b;
  let opts=[r,Math.max(0,r-1),r+1].sort(()=>Math.random()-0.5);
  q.push({a,b,r,opts});
 }
 setMode(limit);
setQuestions(q);
setIdx(0);
setScore(0);
setView("game");
};

if(feedback){

 return (
   <div style={styles.home}>

     <div style={{
       fontSize:80,
       marginBottom:20
     }}>
       {feedback.correct ? "🎉" : "😢"}
     </div>

     <h1>
{feedback.correct
? "🎉 ¡Muy bien!"
: "😢 Te equivocaste"}
     </h1>

     <h2>
       La respuesta correcta era:
       {" "}
       {feedback.correctAnswer}
     </h2>

     <button
       style={styles.btn}
       onClick={continueGame}
     >
       Siguiente →
     </button>

   </div>
 );
}

if(view==="home") return <div style={styles.home}>
<h1 style={styles.logo}>➕ SUMA</h1>
<p>Aprendamos jugando</p>
<button style={styles.btn} onClick={()=>makeGame(10)}>Sumas hasta 10</button>
<button style={styles.btn} onClick={()=>makeGame(20)}>Sumas hasta 20</button>
</div>;

if(view==="result"){
 const pct=Math.round(score/TOTAL*100);
 let msg="¡Sigue practicando!";
 if(score>=15) msg="¡Buen trabajo!";
 if(score>=25) msg="¡Muy bien!";
 if(score===30) msg="¡Excelente! ¡Eres un campeón de las sumas!";
 return <div style={styles.home}>
 <div style={{fontSize:80}}>🎉🎊✨</div>
 <h1>{score}/30</h1>
 <h2>{pct}%</h2>
 <h2>{msg}</h2>
 <button style={styles.btn} onClick={()=>setView("home")}>Jugar nuevamente</button>
 </div>
}

const next=(ok)=>{

 if(ok){
   setScore(s=>s+1);
 }

 setFeedback({
   correct: ok,
   correctAnswer: q.r
 });

};

const continueGame=()=>{

 if(idx===TOTAL-1){
   setView("result");
   return;
 }

 setIdx(idx+1);
 setAnswer("");
 setBalls([]);
 setFeedback(null);

}; 

return <div style={styles.game}>
<h2>Pregunta {idx+1} de 30</h2>
<div style={styles.bar}><div style={{...styles.fill,width:`${((idx+1)/30)*100}%`}}/></div>
<div style={styles.sum}>{q.a} + {q.b} = ?</div>

{idx<10 ? <>
<div style={styles.row}>
{Array(q.a).fill(0).map((_,i)=>
<span key={i}>🔵</span>
)}
</div>

<div style={styles.row}>
{Array(q.b).fill(0).map((_,i)=>
<span key={i}>🟠</span>
)}
</div>
<div>{q.opts.map(o=><button key={o} style={styles.opt} onClick={()=>next(o===q.r)}>{o}</button>)}</div>
</> :
<>
<div>

<h3>Primer número ({q.a})</h3>

<div style={styles.row}>
{
Array(mode === 20 ? 20 : 10)
.fill(0)
.map((_,i)=>

<span
key={i}
style={{
fontSize:34,
cursor:"pointer"
}}
>
{i < q.a ? "🔵" : "⚪"}
</span>

)
}
</div>

<h3>Segundo número ({q.b})</h3>

<div style={styles.row}>
{
Array(mode === 20 ? 20 : 10)
.fill(0)
.map((_,i)=>

<span
key={i}
style={{
fontSize:34,
cursor:"pointer"
}}
>
{i < q.b ? "🟠" : "⚪"}
</span>

)
}
</div>

<input style={styles.input} type="number" value={answer} onChange={e=>setAnswer(e.target.value)}/>
<br/>
<button style={styles.btn} onClick={()=>next(Number(answer)===q.r)}>Responder</button>
</>}
</div>
}

const styles={
home:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",background:"linear-gradient(135deg,#ff9a9e,#fad0c4,#fbc2eb)",padding:20,textAlign:"center"},
game:{minHeight:"100vh",padding:20,textAlign:"center",background:"linear-gradient(135deg,#a8edea,#fed6e3)"},
logo:{fontSize:60,color:"#fff"},
btn:{fontSize:24,padding:"16px 28px",margin:10,borderRadius:20,border:"none"},
opt:{fontSize:28,padding:"12px 24px",margin:10,borderRadius:16,border:"none"},
sum:{fontSize:56,fontWeight:"bold",margin:20},
row:{fontSize:32,display:"flex",justifyContent:"center",gap:6,flexWrap:"wrap",margin:10},
input:{fontSize:36,width:120,textAlign:"center",padding:10,borderRadius:12},
bar:{height:20,background:"#ddd",borderRadius:20,overflow:"hidden"},
fill:{height:"100%",background:"#22c55e"}
};
