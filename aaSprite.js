

 function imageLoad (url)
 {
 var obj;
 obj={};
 obj.type="image";
 obj.url=url;
 obj.is_loading=true;
 obj.is_failed=false;
 obj.is_success=false;
 obj.is_canvased=false;
 obj.wid=0;
 obj.hit=0;
 obj.img=new Image();
 obj.img.crossOrigin='anonymous';
 obj.img.onload=function()  {  obj.is_success=true;  obj.is_loading=false;  }
 obj.img.onerror=function()
  {
  console.log("image load failed");
  obj.is_failed=true;
  obj.is_loading=false;
  }
 obj.img.src=obj.url;
 return obj;
 }





 function imageCancel (obj)
 {
 if(obj.type!="image") { return false; }
 obj.img.src="";
 obj.img.onload=null;
 obj.img.onerror=null;
 obj.img=null;
 obj=null;
 return true;
 }







/*-----------------------------------------------------------------------*/




 function spriteLoad (url)
 {
 var obj;
 obj={};
 obj.type="sprite";
 obj.url=url;
 obj.is_loading=true;
 obj.is_failed=false;
 obj.is_success=false;
 obj.is_canvased=false;
 obj.canvas_handle=0;
 obj.canvas_pix=null;
 obj.wid=0;
 obj.hit=0;
 obj.sheet_map=[];
 obj.img=new Image();
 obj.img.crossOrigin='anonymous';
 obj.img.src=obj.url;
 obj.img.onload=function()
  {
  obj.is_success=true;
  obj.is_loading=false;
  }
 obj.img.onerror=function()
  {
  alert("onerr "+obj.url+"  ");
  obj.is_failed=true;
  obj.is_loading=false;
  }
 return obj;
 }






 function spriteCancel (obj)
 {
 if(obj.type!="sprite") { return false; }
 obj.img.src="";
 obj.img.onload=null;
 obj.img.onerror=null;
 obj.img=null;
 obj=null;
 return true;
 }






 function spriteBounder (grp,xx,yy,ww,hh,data)
 {
 var iw,ih,x2,y2,a0,a1,a2,a3;
 var at,x,y,off,alf,ok,z;
 var obj,obja,objb,bounds;
 var vminx,vminy,vmaxx,vmaxy;
 var iminx,iminy,imaxx,imaxy;
 iw=data.width;
 ih=data.height;
 x2=(xx+ww)-1;
 y2=(yy+hh)-1;
 a0=[];
 a1=[];
 a2=[];
 a3=[];
 at=1;
 y=yy;
 while(1)
  {
  if(y>y2) { break; }
  x=xx;
  while(1)
   {
   if(x>x2) { break; }
   off=((y*iw)+x)<<2;
   alf=data.data[off+3]|0;
   if(alf<at) {  x++; continue; }
   obj={x:x,y:y};
   a0[a0.length]=obj;
   break;
   }
  y++;
  }
 y=yy;
 while(1)
  {
  if(y>y2) { break; }
  x=x2;
  while(1)
   {
   if(x<xx) { break; }
   off=((y*iw)+x)<<2;
   alf=data.data[off+3]|0;
   if(alf<at) {  x--; continue; }
   obj={x:x,y:y};
   a1[a1.length]=obj;
   break;
   }
  y++;
  }
 x=xx;
 while(1)
  {
  if(x>x2) { break; }
  y=yy;
  while(1)
   {
   if(y>y2) { break; }
   off=((y*iw)+x)<<2;
   alf=data.data[off+3]|0;
   if(alf<at) {  y++; continue; }
   obj={x:x,y:y};
   a2[a2.length]=obj;
   break;
   }
  x++;
  }
 x=x2;
 while(1)
  {
  if(x<xx) { break; }
  y=y2;
  while(1)
   {
   if(y<yy) { break; }
   off=((y*iw)+x)<<2;
   alf=data.data[off+3]|0;
   if(alf<at) {  y--; continue; }
   obj={x:x,y:y};
   a3[a3.length]=obj;
   break;
   }
  x--;
  }
 vminx=99999|0; iminx=-1; for(z=0;z<a0.length;z++) {  obja=a0[z];  if(obja.x<vminx) { vminx=obja.x; iminx=z; }  }
 vmaxx=-1|0;    imaxx=-1; for(z=0;z<a0.length;z++) {  objb=a1[z];  if(objb.x>vmaxx) { vmaxx=objb.x; imaxx=z; }  }
 vminy=99999|0; iminy=-1; for(z=0;z<a2.length;z++) {  obja=a2[z];  if(obja.y<vminy) { vminy=obja.y; iminy=z; }  }
 vmaxy=-1|0;    imaxy=-1; for(z=0;z<a3.length;z++) {  objb=a3[z];  if(objb.y>vmaxy) { vmaxy=objb.y; imaxy=z; }  }
 bounds={};
 bounds.x1=vminx;
 bounds.y1=vminy;
 bounds.x2=vmaxx;
 bounds.y2=vmaxy;
 bounds.w=(bounds.x2-bounds.x1)+1;
 bounds.h=(bounds.y2-bounds.y1)+1;
 return bounds;
 }







 function spritePixGet (x,y,pix,cmp)
 {
 var m,o;
 m=null;
 o=((y*(pix.width<<2))+(x<<2))|0;
 if(cmp!=undefined)
  {
  while(1)
   {
   m=false;
   if(pix.data[o]!=cmp.r)   { break; }
   if(pix.data[o+1]!=cmp.g) { break; }
   if(pix.data[o+2]!=cmp.b) { break; }
   if(pix.data[o+3]<cmp.a)  { break; }
   m=true;
   break;
   }
  }
 return {  w:pix.width|0,  h:pix.height|0,  r:pix.data[o+0]|0, g:pix.data[o+1]|0, b:pix.data[o+2]|0,  a:pix.data[o+3]|0, match:m };
 }










 function spriteOptimize (obj)
 {
 var grp,pix,pixd,han2;
 var ath,w,h,r,g,b,a,off,grp2;
 var data,x,y,xs,ys,ok,z,vx,vy,xx,yy,off,i,four,foff;
 var minX,minY,maxX,maxY;
 var han,bound,stored_map,stored_crc,needs_store;
 var hint,iw,ih,ms;
 var pen,hob,todo,big_crc;
 hint=[];

 obj.wid=obj.img.width;
 obj.hit=obj.img.height;
 iw=obj.wid;
 ih=obj.hit;




 han2=aa.guiCreate("canvas","cansheet2");
 aa.handleCommentSet(han2,"sprite cansheet2");
 aa.guiCssDisplaySet(han2,"absolute",3000,0.0,"none");
 grp2=aa.guiGroupGet(han2);
 aa.guiCanvasAlphaSet(grp2.han,0.0);
 aa.guiSizeSet(grp2.han,iw,ih);
 aa.guiCssAreaSet(grp2.han,null,null,iw,ih);
  han=aa.guiCreate("canvas","cansheet");
  aa.handleCommentSet(han,"sprite cansheet");
  aa.guiCssDisplaySet(han,"absolute",3000,0.0,"none");
  grp=aa.guiGroupGet(han);
  aa.guiCanvasAlphaSet(grp.han,0.0);
  aa.guiSizeSet(grp.han,iw,ih);
  aa.guiCssAreaSet(grp.han,null,null,iw,ih);


 obj.is_canvased=true;
 obj.canvas_handle=grp.han;
 aa.guiCanvasImageDraw(grp.han,0,0,iw,ih,0,0,iw,ih,obj.img);
 pix=aa.guiCanvasImageGet(grp.han,0,0,iw,ih);
 big_crc=0;
 four=0;
 for(y=0;y<ih;y++)
  {
  for(x=0;x<iw;x++)
   {
   big_crc+=pix.data[(four+0)];
   big_crc+=pix.data[(four+1)];
   big_crc+=pix.data[(four+2)];
   big_crc+=pix.data[(four+3)];
   big_crc++;
   four+=4;
   }
  }

 stored_map=JSON.parse(aa.storageRead(app.db,"sheet_map"));
 stored_crc=aa.storageRead(app.db,"sheet_crc");

 needs_store=true;
 obj.canvas_pix=pix;
 if(stored_map)
  {
  if(stored_crc==big_crc)   {   obj.sheet_map=stored_map;  needs_store=false; }
  }


 if(needs_store==true)//obj.sheet_map.length==0)
 {
 console.log("optimizing sprite");
 y=0;
 while(1)
  {
  if(y>=ih) { break; }
  x=0;
  while(1)
   {
   ok=0;
   if(x>=iw) { break; }
   pen=spritePixGet(x+0,y+0,pix,{r:255,g:0,b:220,a:1});   if(pen.match==false) { x++; continue; }
   pen=spritePixGet(x+1,y+0,pix,{r:255,g:0,b:220,a:1});   if(pen.match==false) { x++; continue; }
   pen=spritePixGet(x+0,y+1,pix,{r:255,g:0,b:220,a:1});   if(pen.match==false) { x++; continue; }
   ok=1;
   break;
   }
  if(ok==0) { y++; continue; }
  minX=maxX=x;
  minY=maxY=y;
  for(z=minX;z<iw;z++)  {   pen=spritePixGet(z,minY,pix,{r:255,g:0,b:220,a:1});  if(pen.match==false) { break; }   maxX=z;   }
  for(z=minY;z<ih;z++)  {   pen=spritePixGet(minX,z,pix,{r:255,g:0,b:220,a:1});  if(pen.match==false) { break; }   maxY=z;   }
  yy=minY;  for(xx=minX;xx<=maxX;xx++)   {   off=(((yy*iw)+xx)<<2)|0;   pix.data[off+1]=220|0; }
  yy=maxY;  for(xx=minX;xx<=maxX;xx++)   {   off=(((yy*iw)+xx)<<2)|0;   pix.data[off+1]=220|0; }
  xx=minX;  for(yy=minY;yy<=maxY;yy++)   {   off=(((yy*iw)+xx)<<2)|0;   pix.data[off+1]=220|0; }
  xx=maxX;  for(yy=minY;yy<=maxY;yy++)   {   off=(((yy*iw)+xx)<<2)|0;   pix.data[off+1]=220|0; }
  aa.guiCanvasImagePut(grp.han,0,0,0,0,iw,ih,pix);
  hob={minX:minX,maxX:maxX,minY:minY,maxY:maxY};
  hint[hint.length]=hob;
  x=0;
  if(0) { y=0; }
  }
 for(z=0;z<hint.length;z++)
  {
  hob=hint[z];
  x=hob.minX;
  y=hob.minY;
  w=(hob.maxX-hob.minX)+1;
  h=(hob.maxY-hob.minY)+1;
  bound=spriteBounder(grp,x+1,y+1,w-2,h-2,pix);
  obj.sheet_map[obj.sheet_map.length]=bound;
  }
 }

 aa.guiCanvasImagePut(grp.han,0,0,0,0,iw,ih,pix);
 grp2=aa.guiGroupGet(aa.guiIdFind("cansheet2"));
 pix2=aa.guiCanvasImageGet(grp2.han,0,0,iw,ih);
 off=0;
 todo=iw*ih*4;
 while(off<todo)
  {
  if(pix.data[off+3]>0)
   {
   r=pix.data[off+0];
   g=pix.data[off+1];
   b=pix.data[off+2];
   a=pix.data[off+3];
   r=r*0.65;
   g=g*0.65;
   b=b*0.65;
   if(r<0) { r=0; }   else   if(r>255) { r=255; }
   if(g<0) { g=0; }   else   if(g>255) { g=255; }
   if(b<0) { b=0; }   else   if(b>255) { b=255; }
   if(a<0) { a=0; }   else   if(a>255) { a=255; }
   pix2.data[off+0]=r;
   pix2.data[off+1]=g;
   pix2.data[off+2]=b;
   pix2.data[off+3]=a;
   }
  off+=4;
  }
 aa.guiCanvasImagePut(grp2.han,0,0,0,0,iw,ih,pix2);
 ///console.log(obj.sheet_map);
 //console.log(obj.sheet_map.length);
 if(needs_store==true)
  {
  aa.storageWrite(app.db,"sheet_crc",big_crc);
  aa.storageWrite(app.db,"sheet_map",JSON.stringify(obj.sheet_map,0,2));
  }
 //aa.storageWrite(app.db,"sheet_map",obj.sheet_map);

 //console.log(JSON.stringify(obj.sheet_map));
 //console.log(JSON.stringify(obj.sheet_map,0,2));
 obj.img=null;
 }






 function spriteRectGet (obj,index)
 {
 var rec;
 if(app.uix.sprite.is_loading==true) { return null; }
 if(obj.sheet_map==undefined) { return null; }
 if(obj.sheet_map.length==0) { return null; }
 if(index>=obj.sheet_map.length) { aa.debugLogger(5,"index overflow index="+index+"  "+obj.sheet_map.length);  return null;  }
 if(1&&use_profiler==true&&mb_profile_group_sprite) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 //if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
 rec=obj.sheet_map[index];
 return rec;
 }




 function spriteRectGetEx (obj,index,worh,whval)
 {
 var rec,rr,rw,rh,recx;
 if(1&&use_profiler==true&&mb_profile_group_sprite) {  aaProfilerHit(arguments.callee.name); }
 if(app.uix.sprite.is_loading==true) { return null; }
 if(obj.sheet_map==undefined) { return null; }
 if(obj.sheet_map.length==0) { return null; }
 if(index>=obj.sheet_map.length) { aa.debugLogger(5,"index overflow index="+index+"  "+obj.sheet_map.length);  return null;  }
 rec=obj.sheet_map[index];
 recx={};
 recx.x=rec.x1;
 recx.y=rec.y1;
 recx.w=rec.w;
 recx.h=rec.h;

 if(worh=='w'||worh=='W')
  {
  rr=recx.h/recx.w;
  rw=whval;
  rh=rw*rr;
  }
 else
 if(worh=='h'||worh=='H')
  {
  rr=recx.w/recx.h;
  rh=whval;
  rw=rh*rr;
  }
 else
  {
  aa.debugAlert("worh="+worh);
  }
 recx.rr=rr;
 recx.rw=rw;
 recx.rh=rh;
 return recx;
 }





 function spriteDraw (obj,canid,sx,sy,sw,sh,dx,dy,dw,dh,rot,fx)
 {
 var grp,crx,cry,iw,ih,se,sq,dv;
 var ex,ey,grad,x1,y1,x2,y2,grp2,grp3,sf;
//  if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
 if(1&&use_profiler==true&&mb_profile_group_sprite) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 grp2=aa.guiGroupGet(aa.guiIdFind("cansheet"));
 grp3=aa.guiGroupGet(aa.guiIdFind("cansheet2"));
 grp=aa.guiGroupGet(aa.guiIdFind(canid));
 grp.ctx.save();
 if(1) { se=true;   sq="high"; }
 else  { se=false;  sq="low";  }
 grp.ctx.imageSmoothingEnabled=se;
 grp.ctx.imageSmoothingQuality=sq;
 iw=obj.wid;
 ih=obj.hit;
 crx=dx+(dw/2);
 cry=dy+(dh/2);
 if(aa.dataValueExists(rot)===true&&rot!=0)
  {
  grp.ctx.translate(crx,cry);
  grp.ctx.rotate(aa.numDegreesToRadian(rot));
  grp.ctx.translate(-crx,-cry);
  }
 sf=1;
 if(fx==0)  {  aa.guiCanvasImageDraw(grp.han,sx,sy,sw,sh,dx,dy,dw,dh,grp2.dom);  }
 else       {  aa.guiCanvasImageDraw(grp.han,sx,sy,sw,sh,dx/sf,dy/sf,dw/sf,dh/sf,grp3.dom);  }
 if(se==true)
  {
  grp.ctx.imageSmoothingEnabled=false;
  grp.ctx.imageSmoothingQuality="low";
  }
 grp.ctx.restore();
 }







 function spriteDrawEx (obj,canid,sx,sy,sw,sh,dx,dy,dw,dh,rot,fx,cross)
 {
 var grp,crx,cry,iw,ih,se,sq,dv;
 var ex,ey,grad,x1,y1,x2,y2,grp2,grp3,sf;
 var ox,oy,ow,oh,mx,my;
//  if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
 if(1&&use_profiler==true&&mb_profile_group_sprite) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 grp2=aa.guiGroupGet(aa.guiIdFind("cansheet"));
 grp3=aa.guiGroupGet(aa.guiIdFind("cansheet2"));
 grp=aa.guiGroupGet(aa.guiIdFind(canid));
 grp.ctx.save();
 if(1) { se=true;   sq="high"; }
 else  { se=false;  sq="low";  }
 grp.ctx.imageSmoothingEnabled=se;
 grp.ctx.imageSmoothingQuality=sq;
 iw=obj.wid;
 ih=obj.hit;
 crx=dx+(dw/2);
 cry=dy+(dh/2);
 if(aa.dataValueExists(rot)===true&&rot!=0)
  {
  grp.ctx.translate(crx,cry);
  grp.ctx.rotate(aa.numDegreesToRadian(rot));
  grp.ctx.translate(-crx,-cry);
  }
 sf=1;
 if(fx==0)
  {
  ox=dx;
  oy=dy;
  ow=dw;
  oh=dh;
  aa.guiCanvasImageDraw(grp.han,sx,sy,sw,sh,ox,oy,ow,oh,grp2.dom);
  }
 else
  {
  ox=dx/sf;
  oy=dy/sf;
  ow=dw/sf;
  oh=dh/sf;
  aa.guiCanvasImageDraw(grp.han,sx,sy,sw,sh,ox,oy,ow,oh,grp3.dom);
  }

 if(se==true)
  {
  grp.ctx.imageSmoothingEnabled=false;
  grp.ctx.imageSmoothingQuality="low";
  }

 if(cross==true)
  {
  mx=ox+(ow/2);
  my=oy+(oh/2);
  aa.guiCanvasLine(grp.han,mx-16,oy,mx+16,oy+oh,6,app.uix.rgb_cross);
  aa.guiCanvasLine(grp.han,mx+16,oy,mx-16,oy+oh,6,app.uix.rgb_cross);
  }
 grp.ctx.restore();
 }



