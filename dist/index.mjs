var a=class{loadAssets(e){return new Promise((t,o)=>{let s=0,n=0,r=()=>{n++,setTimeout(()=>{n===s&&t(!0)},1)},c=d=>{s++;let i=new Image;return i.src=d,i.onload=r,i};e.forEach(this.prepareAsset(c))})}prepareAsset(e){return({id:t,url:o,states:s})=>{this.assets[t]={id:t,img:e(o),states:{}},s&&Object.keys(s).forEach(n=>{let r=s[n];this.assets[t][n]=e(r)})}}async setupCanvas(e){this.canvas=document.createElement("canvas"),this.canvas.id="game",this.canvas.width=e.w,this.canvas.height=e.h,document.body.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d")}};window&&(window.DumbRenderer=a);var g=a;export{g as default};
