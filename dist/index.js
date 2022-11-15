var l=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var u=Object.prototype.hasOwnProperty;var A=(i,e)=>{for(var t in e)l(i,t,{get:e[t],enumerable:!0})},w=(i,e,t,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of b(e))!u.call(i,s)&&s!==t&&l(i,s,{get:()=>e[s],enumerable:!(a=f(e,s))||a.enumerable});return i};var x=i=>w(l({},"__esModule",{value:!0}),i);var R={};A(R,{default:()=>v});module.exports=x(R);var d=class{constructor(){this.baseObjects=[];this.assets={};this.dummyImg=new Image}loadAssets(e){return new Promise((t,a)=>{let s=0,o=0,h=()=>{o++,setTimeout(()=>{o===s&&t(!0)},1)},m=(c,n)=>{s++;let r=new Image;return r.src=c,r.onload=()=>{h(),n.h=n.h||r.height,n.w=n.w||r.width},r};e.forEach(this.prepareAsset(m))})}prepareAsset(e){return({id:t,src:a,states:s,w:o,h})=>{let m={w:o||0,h:h||0,id:t,img:this.dummyImg,states:{}},c=e(a,m);m.img=c,s&&Object.keys(s).forEach(n=>{let r,g=c;typeof s[n]=="string"?r={src:s[n]}:r=s[n],r.src&&(g=e(r.src,{})),m.states[n]={img:g,transform:r.transform}}),this.assets[t]=m}}setupCanvas(e){this.bg=e.bg||"#2c3e50",this.canvas=document.createElement("canvas"),this.canvas.id="game",this.canvas.width=e.w||800,this.canvas.height=e.h||450,document.body.appendChild(this.canvas);let t=this.canvas.getContext("2d");t&&(this.ctx=t),this.clearCanvas()}clearCanvas(){if(!this.ctx)throw new Error("Failed to get Canvas context, did you setupCanvas?");this.ctx.fillStyle=this.bg,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}baseRender(e){this.baseObjects=e}locateAssetImageToRender(e){let{id:t,state:a}=e,s=this.assets[t];if(s){let o={...s};return a&&s.states[a]&&(o={...o,...s.states[a]}),o}return null}render(e){this.clearCanvas(),this.baseObjects.forEach(t=>this.renderAsset(t)),e.forEach(t=>this.renderAsset(t))}renderAsset(e){let t=this.locateAssetImageToRender(e);t?(console.log(t),t.transform?(console.log(this.ctx.getTransform()),console.log(t.transform),this.ctx.translate(e.x,e.y),this.ctx.transform(...t.transform),console.log(this.ctx.getTransform()),this.ctx.drawImage(t.img,0,0,t.w,t.h),this.ctx.resetTransform()):this.ctx.drawImage(t.img,e.x,e.y,t.w,t.h)):(this.ctx.fillStyle=this.bg,this.ctx.ellipse(e.x,e.y,e.w||50,e.h||50,Math.PI/4,0,2*Math.PI))}};window&&(window.DumbRenderer=d);var v=d;0&&(module.exports={});
