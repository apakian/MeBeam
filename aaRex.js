



 function uixHudStateSet (state)
 {
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name); }
 uixElementDisplay("hud",state);
 }




 function uixAll ()
 {
 var dsz;
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 dsz=uixDispSizes();
 uixResizeAll(dsz);
 uixRepaintAll(dsz);
 }






 function uixResizeAll (dsz)
 {
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 //console.log("resize all");
 uixResizeBottomBar(dsz);
 uixResizeHud(dsz);
 uixResizePopup(dsz);
 uixResizeComms(dsz);
 }




 function uixRepaintAll(dsz)
 {
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 //console.log("repaint all");
 uixRepaintBottomBar(dsz);
 uixRepaintHud(dsz);
 uixRepaintPopup(dsz);
 uixRepaintAllOverlays(dsz);
 }


/*-----------------------------------------------------------------------*/






 function uixResizeBottomBar (dsz)
 {
 var grp,rect,hit;

 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(app.uixbb.is_started!=true) { return false; }
 if((grp=aa.guiGroupGet(aa.guiIdFind("bottombar")))==null) { aa.debugAlert(); }
 hit=dsz[1]/12;
 if(hit<90)  { hit=90; }
 hit=Math.round(hit);
 rect=aa.guiRectSet(0,dsz[1]-hit,dsz[0],hit);
 uixElementSizeSet(grp.obj.id,rect.w,rect.h,rect.x,rect.y,rect.w,rect.h);
 uixElementDisplay(grp.obj.id,true);
 }






 function uixRepaintBottomBar (dsz)
 {
 var grpb,rect,grad;
 var bcnt,bwid,fam;
 var fh,fnt,b,x,y,xx,yy,ww,hh;
 var obj,txt,mes,gry,rgb;
 var midx,spray,ihit,rat,shit,swid,areb;

 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(app.uixbb.is_started!=true) { return false; }
 if((grpb=app.uix.bottombar_grp)==null) { return false; }
 areb=aa.guiCssAreaGet(grpb.han);
 aa.guiCanvasClear(grpb.han,false);
 rect=aa.guiRectSet(0,0,grpb.dom.width,grpb.dom.height);
 grpb.obj.ctx.save();

 if(app.uixbb.button_pressed==-1)  { aa.guiCanvasAlphaSet(grpb.han,cfg_bb_alpha_lo); }
 else                              { aa.guiCanvasAlphaSet(grpb.han,cfg_bb_alpha_hi); }

 if(app.uixbb.button_pressed==-1)  { grpb.dom.style.opacity=1.0; }
 else                              { grpb.dom.style.opacity=1.0; }


// console.log(areb);
 grad=grpb.obj.ctx.createLinearGradient(areb.width/2,0,areb.width/2,areb.height*2);
 grad.addColorStop(0.0,app.uix.rgb_botbar_grad_1);
 grad.addColorStop(0.5,app.uix.rgb_botbar_grad_2);
 grad.addColorStop(1.0,app.uix.rgb_botbar_grad_3);
 aa.guiCanvasFill(grpb.han,rect.x,rect.y,rect.w,rect.h,grad);

 bcnt=app.uixbb.button_info.length;
 bwid=parseInt(rect.w/bcnt);
 fh=((rect.h/3)+4)|0;
 b=0;
 x=0;

 fam=cfg_bb_font;
 for(b=0;b<bcnt;b++)
  {
  fnt="500 "+(fh*0.8)+"px '"+fam+"'";
  obj=app.uixbb.button_info[b];
  txt=obj.text;
  aa.guiCanvasFontSet(grpb.han,fnt);
  grpb.obj.ctx.filter="none";
  mes=aa.guiCanvasTextMeasure(grpb.han,txt);

  if(b==app.uixbb.button_pressed)   {   gry=0;   rgb=app.uix.rgb_botbar_text_pressed;   }
  else                              {   gry=1;   rgb=app.uix.rgb_botbar_text;           }
  midx=(x+(bwid/2));

  if(b==2)
   {
   if(app.uixbb.is_spinning==true) { spray=app.uix.sprite.sheet_map[27];   }
   else                            { spray=app.uix.sprite.sheet_map[obj.sprite_index]; }
   }
  else
   {
   spray=app.uix.sprite.sheet_map[obj.sprite_index];
   }
  if(spray!=null)
   {
   ihit=(rect.h*0.5)|0;
   rat=spray.w/spray.h;
   shit=ihit*rat;
   swid=shit/rat;
   y=(rect.h/2)-(shit/2);
   y+=8;
   xx=spray.x1;
   yy=spray.y1;
   ww=spray.w;
   hh=spray.h;
   if(b==2)
    {
    spriteDraw(app.uix.sprite,"bottombar",xx,yy,ww,hh,x+(bwid/2)-(swid/2),y,swid,shit,app.uixbb.spin_angle,gry);
     //app.uixbb.is_spinning=true;
    }
   else
    {
    spriteDraw(app.uix.sprite,"bottombar",xx,yy,ww,hh,x+(bwid/2)-(swid/2),y,swid,shit,0,gry);
    }
   }
  grpb.obj.ctx.filter="none";
  uixText3d(grpb.han,(midx-(mes.w/2)),4,-2,-1,fnt,app.uix.rgb_botbar_text_shadow,rgb,txt);
  aa.guiCanvasBorder(grpb.han,x,0,bwid,rect.h,3,app.uix.rgb_botbar_button_border);
  aa.guiSpotAdd(parseInt(100+b),areb.left+x,areb.top+0,bwid,rect.h);
  x+=bwid;
  }
 aa.guiCanvasBorder(grpb.han,rect.x,rect.y,rect.w,rect.h,3,app.uix.rgb_botbar_border);
 grpb.obj.ctx.restore();
 grad=null;
 }



/*-----------------------------------------------------------------------*/




 function uixResizeHud (dsz)
 {
 var grph,rect,grpg;
 var ww,hh;

 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((grph=app.uix.hud_grp)==null) { aa.debugAlert(); return false; }
 //if((grp=aa.guiGroupGet(aa.guiIdFind("hud")))==null) { aa.debugAlert(); }
 if(grph.css.display!="none")
  {
  ww=dsz[0]-100;
  hh=dsz[1]/3;
  rect=aa.guiRectSet((dsz[0]/2)-(ww/2),(dsz[1]/2)-(hh/2),ww,hh);
  uixElementSizeSet(grph.obj.id,rect.w,rect.h,rect.x,rect.y,rect.w,rect.h);
  }
 }





 function uixRepaintHud (dsz)
 {
 var grph,i,fnt,fn,fh,fs,rect,str,area,lni,lnw,mes;

 if((grph=app.uix.hud_grp)==null) { return false; }
 if(grph.css.display=="none") { return false; }
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }

 fam=cfg_hud_font;
 area=aa.guiCssAreaGet(grph.han);
 fh=area.height/app.uix.hud_line.length;
 while(1)
  {
  fh=23; break;
  lnw=0;
  for(i=0;i<app.uix.hud_line.length;i++)
   {
   str="00"+" "+app.uix.hud_line[i];
   fnt="300 "+(fh*1.0)+"px '"+fam+"'";
   aa.guiCanvasFontSet(grph.han,fnt);
   grph.obj.ctx.filter="none";
   mes=aa.guiCanvasTextMeasure(grph.han,str);
   if(mes.w>lnw) { lnw=mes.w; lni=i; }
   }
  area=aa.guiCssAreaGet(grph.han);
  break;
  if(area.width>lnw) { break; }
  fh-=2;
  }

 area=aa.guiCssAreaGet(grph.han);
 aa.guiCanvasFillFull(grph.han,aa.guiRgbaString(0x1f,0x12,aa.numRand(100),1.0));
 aa.guiCanvasAlphaSet(grph.han,1.0);
 grph.dom.style.opacity=cfg_hud_opacity;


 fs=fh;
 for(i=0;i<app.uix.hud_line.length;i++)
  {
  fnt="300 "+(fh*1.0)+"px '"+fam+"'";
  str="";
  aa.guiCanvasText(grph.han,5,5+(i*fs),0,null,aa.guiRgbaString(220,220,220-(aa.numRand(2)*100),1.0),fnt,app.uix.hud_line[i]);//  str.padStart(2)+" "+app.uix.hud_line[i]);
  }
 return true;
 }





/*-----------------------------------------------------------------------*/








 function uixResizePopup (dsz)
 {
 var grpb,grpp,rect,areb,bcnt,bwid,arep;
 var v,vx,kind,bf,label,spid,fh,spix,xx;
 var fam,w,muprect,dif,fsub,spo,i;
 var sub,rect,dif,cnt;

 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(app.uixbb.is_started!=true)         { return false; }
 if((grpb=app.uix.bottombar_grp)==null) { return false; }
 if((grpp=app.uix.popup_grp)==null)     { return false; }
 if(app.uixbb.button_pressed==-1)       { uixElementDisplay(grpp.obj.id,false);  return true;  }
 areb=aa.guiCssAreaGet(grpb.han);
 aa.guiSpotRangeRemove(200,599);
 aa.guiSpotRangeRemove(1400,1999);

 if(app.uixbb.button_pressed==0)
  {
  //console.log(app.media.cur_axi+"  "+app.media.cur_vxi+" "+app.media.cur_axo);
  markupDelete(app.mup);
  app.mup=markupNew(25,"asap",10,1);
  for(w=0;w<3;w++)
   {
   if(w==0) {   kind="videoinput"; } else
   if(w==1) {   kind="audioinput"; } else
   if(w==2) {   kind="audiooutput"; }
   vx=aa.mediaDeviceCountGet(kind);
   fam=cfg_popup_font;
   for(v=0;v<vx;v++)
    {
    if(v==0)
     {
     if(w==0) { markupStyle(app.mup,30,aa.guiRgbaString(205,255,55,1.0),300,fam,null); } else
     if(w==1) { markupStyle(app.mup,30,aa.guiRgbaString(55,205,255,1.0),300,fam,null); } else
     if(w==2) { markupStyle(app.mup,30,aa.guiRgbaString(255,205,55,1.0),300,fam,null); }
     if(w==0)     {     markupAppend(app.mup,0,1,"Webcams");     }    else
     if(w==1)     {     markupAppend(app.mup,0,1,"Microphones");     }    else
     if(w==2)     {     markupAppend(app.mup,0,1,"Speakers");     }
     spid=200+(w*100);
     }
    if(w==0) { xx=app.media.cur_vxi; } else
    if(w==1) { xx=app.media.cur_axi; } else
    if(w==2) { xx=app.media.cur_axo; }
    label=aa.mediaDeviceGet(kind,v).label;
    if(v==xx)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
    else         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
    markupAppend(app.mup,spid,2,mediaLabelClean(label));
    spid++;
    }
   }
  sub=0;
  while(1)
   {
   rect=markupCalculate(app.mup);
   dif=areb.top-rect.h;
   if(dif>20)  { break;   }
   if(dif>250)  { app.mup.base_font_size+=5; continue; }
   if(dif>150)  { app.mup.base_font_size+=1; continue; }
   if(dif<-250) { app.mup.base_font_size-=5; continue; }
   app.mup.base_font_size-=1;
   }
  uixElementSizeSet(grpp.obj.id,rect.w,rect.h,rect.x,(areb.top-rect.h)-0,rect.w,rect.h);
  uixElementDisplay(grpp.obj.id,true);
  markupKeep(app.mup);
  }
 else
 if(app.uixbb.button_pressed==1)
  {
  markupDelete(app.mup);
  app.mup=markupNew(25,"asap",10,2);
  spid=1400;
  fam=cfg_popup_font;
  markupStyle(app.mup,30,aa.guiRgbaString(205,255,55,1.0),300,fam);
  markupAppend(app.mup,0,1,"Webcam Effects");
  spix=spid;
  v=spid-spix;
  if(v==app.media.cur_vfxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"None");
  spid++;
  v=spid-spix;
  if(v==app.media.cur_vfxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"Mosaic");
  spid++;
  v=spid-spix;
  if(v==app.media.cur_vfxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"Disco");
  spid++;
  v=spid-spix;
  if(v==app.media.cur_vfxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"Brighten");
  spid++;
  v=spid-spix;
  if(v==app.media.cur_vfxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"Darken");
  spid++;

  spid=1600;
  fam=cfg_popup_font;
  markupStyle(app.mup,30,aa.guiRgbaString(55,205,255,1.0),300,fam);
  markupAppend(app.mup,0,1,"Microphone Effects");
  spix=spid;
  v=spid-spix;
  if(v==app.media.cur_afxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"None");
  spid++;
  /*
  v=spid-spix;
  if(v==app.media.cur_afxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
  else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
  markupAppend(app.mup,spid,2,"Mosaic");
  spid++;
  */
  if(app.self.speed>=cfg_ar_min_speed)
   {
   spid=1800;
   fam=cfg_popup_font;
   markupStyle(app.mup,30,aa.guiRgbaString(255,205,55,1.0),300,fam);
   markupAppend(app.mup,0,1,"AR Effects");
   spix=spid;
   v=spid-spix;
   if(v==app.media.cur_arxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
   else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
   markupAppend(app.mup,spid,2,"None");
   spid++;
   v=spid-spix;
   if(v==app.media.cur_arxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
   else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
   markupAppend(app.mup,spid,2,"Bobble");
   spid++;
   v=spid-spix;
   if(v==app.media.cur_arxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
   else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
   markupAppend(app.mup,spid,2,"BigEyes");
   spid++;
   v=spid-spix;
   if(v==app.media.cur_arxi)    {    markupStyle(app.mup,20,aa.guiRgbaString(255,255,255,1.0),500,null);    }
   else                         {    markupStyle(app.mup,20,aa.guiRgbaString(120,120,120,1.0),500,null);    }
   markupAppend(app.mup,spid,2,"Hot Lips");
   spid++;

   }
  sub=0;
  while(1)
   {
   rect=markupCalculate(app.mup);
   dif=areb.top-rect.h;
   if(dif>30)  { break; }
   if(dif>250)  { app.mup.base_font_size+=5; continue; }
   if(dif>150)  { app.mup.base_font_size+=1; continue; }
   if(dif<-250) { app.mup.base_font_size-=5; continue; }
   app.mup.base_font_size-=1;
   }
  bcnt=app.uixbb.button_info.length;
  bwid=parseInt(areb.width/bcnt);
  rect.x=10+(app.uixbb.button_pressed*bwid);
  if((rect.x+rect.w)>dsz[0])  {  rect.x=dsz[0]-rect.w-10;  }
  uixElementSizeSet(grpp.obj.id,rect.w,rect.h,rect.x,(areb.top-rect.h)-0,rect.w,rect.h);
  uixElementDisplay(grpp.obj.id,true);
  markupKeep(app.mup);
  //console.log(rect);
  }
 else
 if(app.uixbb.button_pressed==2)
  {
  markupDelete(app.mup);
  app.mup=markupNew(25,"asap",10,2);
  spid=2100;
  fam=cfg_popup_font;
  markupStyle(app.mup,30,aa.guiRgbaString(205,255,55,1.0),300,fam);
  markupAppend(app.mup,0,1,"Todo");
  while(1)
   {
   rect=markupCalculate(app.mup);
   dif=areb.top-rect.h;
   if(dif>30)  { break; }
   if(dif>250)  { app.mup.base_font_size+=5; continue; }
   if(dif>150)  { app.mup.base_font_size+=1; continue; }
   if(dif<-250) { app.mup.base_font_size-=5; continue; }
   app.mup.base_font_size-=1;
   }
  bcnt=app.uixbb.button_info.length;
  bwid=parseInt(areb.width/bcnt);
  rect.x=10+(app.uixbb.button_pressed*bwid);
  if((rect.x+rect.w)>dsz[0])  {  rect.x=dsz[0]-rect.w-10;  }
  uixElementSizeSet(grpp.obj.id,rect.w,rect.h,rect.x,(areb.top-rect.h)-0,rect.w,rect.h);
  uixElementDisplay(grpp.obj.id,true);
  markupKeep(app.mup);
  //console.log(rect);
  }
 else
 if(app.uixbb.button_pressed==3)
  {
  markupDelete(app.mup);
  app.mup=markupNew(25,"asap",10,2);
  spid=2300;
  fam=cfg_popup_font;
  markupStyle(app.mup,30,aa.guiRgbaString(205,255,55,1.0),300,fam);
  markupAppend(app.mup,0,1,"Todo also");
  while(1)
   {
   rect=markupCalculate(app.mup);
   dif=areb.top-rect.h;
   if(dif>30)  { break; }
   if(dif>250)  { app.mup.base_font_size+=5; continue; }
   if(dif>150)  { app.mup.base_font_size+=1; continue; }
   if(dif<-250) { app.mup.base_font_size-=5; continue; }
   app.mup.base_font_size-=1;
   }
  bcnt=app.uixbb.button_info.length;
  bwid=parseInt(areb.width/bcnt);
  rect.x=10+(app.uixbb.button_pressed*bwid);
  if((rect.x+rect.w)>dsz[0])  {  rect.x=dsz[0]-rect.w-10;  }
  uixElementSizeSet(grpp.obj.id,rect.w,rect.h,rect.x,(areb.top-rect.h)-0,rect.w,rect.h);
  uixElementDisplay(grpp.obj.id,true);
  markupKeep(app.mup);
  //console.log(rect);
  }
 return true;
 }




 function uixRepaintPopup (dsz)
 {
 var grpp,spid;
 if(app.uixbb.is_started!=true) { return false; }
 if((grpp=app.uix.popup_grp)==null) { return false; }
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(app.uixbb.button_pressed!=-1)
  {
  markupPaint(app.mup);
  //mupPaint(app.mup);
  }
 else
  {
  aa.guiSpotRangeRemove(200,599);
  aa.guiSpotRangeRemove(1400,1999);
  }
 return true;
 }


/*-----------------------------------------------------------------------*/





 function uixResizeComms (dsz)
 {
 var i,rect,grpv,grpo,grpc,grpp,ils;
 var hdiv,vdiv;
 var hdif,vdif;
 var lay,rob,r;


 ils=app.uix.this_disp.is_landscape;
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }

 lay=layoutComms(dsz);
 r=0;

 for(i=0;i<max_peers;i++)
  {
  if(i==0)
   {
   if((grpp=aa.guiGroupGet(aa.guiIdFind("b_precanstream_"+i)))==null)  { aa.debugAlert(); }
   if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_"+i)))==null)  { aa.debugAlert(); }
   if((grpv=aa.guiGroupGet(aa.guiIdFind("b_video_"+i)))==null)      { aa.debugAlert(); }
   if((grpo=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+i)))==null)    { aa.debugAlert(); }
   if(grpv.dom.srcObject!=null)
    {
    rob=lay.ray[r];
    uixElementSizeSet(grpp.obj.id,rob.dw,rob.dh,rob.cx,rob.cy,rob.cw,rob.ch);//rect.x,rect.y,rect.w,rect.h);
    uixElementSizeSet(grpc.obj.id,rob.dw,rob.dh,rob.cx,rob.cy,rob.cw,rob.ch);//rect.x,rect.y,rect.w,rect.h);
    uixElementSizeSet(grpv.obj.id,rob.dw,rob.dh,rob.cx,rob.cy,rob.cw,rob.ch);//rect.x,rect.y,rect.w,rect.h);
    uixElementSizeSet(grpo.obj.id,rob.cw-40,cfg_overlay_height,rob.cx+16,rob.cy+16,rob.cw-40,cfg_overlay_height);
    uixElementDisplay(grpp.obj.id,false);
    uixElementDisplay(grpc.obj.id,true);
    uixElementDisplay(grpv.obj.id,true);
    uixElementDisplay(grpo.obj.id,true);
    r++;
    }
   else
    {
    uixElementDisplay(grpp.obj.id,false);
    uixElementDisplay(grpc.obj.id,false);
    uixElementDisplay(grpv.obj.id,false);
    uixElementDisplay(grpo.obj.id,false);
    }
   }
  else
   {
   grpc=null;
   if((grpv=aa.guiGroupGet(aa.guiIdFind("b_video_"+i)))==null)      { aa.debugAlert(); }
   if((grpo=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+i)))==null)    { aa.debugAlert(); }
   if(grpv.vars.rtc_handle!=0&&grpv.dom.srcObject!=null)
    {
    rob=lay.ray[r];
    uixElementSizeSet(grpv.obj.id,rob.dw,rob.dh,rob.cx,rob.cy,rob.cw,rob.ch);
    uixElementSizeSet(grpo.obj.id,rob.cw-40,cfg_overlay_height,rob.cx+16,rob.cy+16,rob.cw-40,cfg_overlay_height);
    uixElementDisplay(grpv.obj.id,true);
    uixElementDisplay(grpo.obj.id,true);
    r++;
    }
   else
    {
    uixElementDisplay(grpv.obj.id,false);
    uixElementDisplay(grpo.obj.id,false);
    }
   }
  }
 }









 function uixLayoutCommsLandscape (dsz,count)
 {
 var lay,areb,cx,cy,xw,ch,vw,vj,dif,newcount;
 var vert_space,horz_space,tempcx,tempcy,grpb;

 if((grpb=app.uix.bottombar_grp)==null) { return null; }
 lay={};
 lay.ray=[];
 areb=aa.guiCssAreaGet(grpb.han);
 vert_space=areb.top;
 horz_space=areb.width;
 horz_space=dsz[0];
  if(count>=3)
   {
   newcount=2;
   cx=0;
   cy=0;
   ch=vert_space/2;
   cw=ch*dsz[9];
   while(1)
    {
    vw=cw*count;
    vw=cw*newcount;
    if(horz_space>vw) { break;  }
    ch--;
    cw=ch*dsz[9];
    }
   dif=horz_space-(cw*newcount);   cx+=(dif/2);
   dif=(vert_space/2)-(ch*1);       cy+=(dif/2);
   dw=dsz[7];
   dh=dsz[8];
   cx=Math.round(cx);   cy=Math.round(cy);   cw=Math.round(cw);   ch=Math.round(ch);
   tempcx=cx;
   tempcy=cy;
   for(i=0;i<count;i++)
    {
    lay.ray.push({dw:dw,dh:dh,cx:cx,cy:cy,cw:cw,ch:ch});
    cx+=cw;
    if(i==1)     {     cx=tempcx;     cy+=ch;     }
    }
   }
  else
   {
   cx=0;
   cy=0;
   ch=vert_space;
   cw=ch*dsz[9];
   while(1)
    {
    vw=cw*count;
    if(horz_space>vw) { break;  }
    ch--;
    cw=ch*dsz[9];
    }
   dif=horz_space-(cw*count);   cx+=(dif/2);
   dif=vert_space-(ch*1);       cy+=(dif/2);
   dw=dsz[7];
   dh=dsz[8];
   cx=Math.round(cx);   cy=Math.round(cy);   cw=Math.round(cw);   ch=Math.round(ch);
   for(i=0;i<count;i++)  {   lay.ray.push({dw:dw,dh:dh,cx:cx,cy:cy,cw:cw,ch:ch});    cx+=cw;    }
   }
 return lay;
 }







 function uixLayoutCommsPortrait (dsz,count)
 {
 var lay,areb,cx,cy,xw,ch,vw,vj,dif,newcount;
 var vert_space,horz_space,tempcx,tempcy,grpb;

 if((grpb=app.uix.bottombar_grp)==null) { return null; }
 lay={};
 lay.ray=[];
 areb=aa.guiCssAreaGet(grpb.han);
 vert_space=areb.top;
 horz_space=areb.width;
 horz_space=dsz[0];
  if(count>=3)
   {
   newcount=2;
   cx=0;
   cy=0;
   cw=horz_space/2;
   ch=cw/dsz[9];
   while(1)
    {
    vh=ch*count;
    if(vert_space>vh) { break; }
    cw--;
    ch=cw/dsz[9];
    }
   dif=vert_space-(ch*newcount);   cy+=(dif/2);
   dif=(horz_space/2)-(cw*1);   cx+=(dif/1);
   cw--;
   dw=dsz[7];
   dh=dsz[8];
   cx=Math.round(cx);   cy=Math.round(cy);   cw=Math.round(cw);   ch=Math.round(ch);
   tempcx=cx;
   tempcy=cy;
   for(i=0;i<count;i++)
    {
    lay.ray.push({dw:dw,dh:dh,cx:cx,cy:cy,cw:cw,ch:ch});
    cy+=ch;
    if(i==1)
     {
     cy=tempcy;
     cx+=cw;
     }
    }
   }
  else
   {
   cx=0;
   cy=0;
   cw=horz_space;
   ch=cw/dsz[9];
   while(1)
    {
    vh=ch*count;
    if(vert_space>vh) { break; }
    cw--;
    ch=cw/dsz[9];
    }
   dif=vert_space-(ch*count);   cy+=(dif/2);
   dif=horz_space-(cw*1);   cx+=(dif/2);
   dw=dsz[7];
   dh=dsz[8];
   cx=Math.round(cx);   cy=Math.round(cy);   cw=Math.round(cw);   ch=Math.round(ch);
   for(i=0;i<count;i++)
    {
    lay.ray.push({dw:dw,dh:dh,cx:cx,cy:cy,cw:cw,ch:ch});
    cy+=ch;
    }
   }

 return lay;
 }



 function layoutComms (dsz)
 {
 var count,i,grpv;

 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 count=0;
 for(i=0;i<max_peers;i++)
  {
  if((grpv=aa.guiGroupGet(aa.guiIdFind("b_video_"+i)))==null)      { aa.debugAlert(); }
  if(i==0)   {   if(grpv.dom.srcObject!=null)                             {    count++;    }   }
  else       {   if(grpv.vars.rtc_handle!=0&&grpv.dom.srcObject!=null)    {    count++;    }   }
  }
 if(count==0) { count=1; }
 if(app.uix.this_disp.is_landscape)  {  return(uixLayoutCommsLandscape(dsz,count));  }
 return(uixLayoutCommsPortrait(dsz,count));
 }





 function uixRepaintAllOverlays (dsz)
 {
 var i;
 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 for(i=0;i<max_peers;i++) {  uixRepaintOverlay(dsz,i);  }
 }






 function uixRepaintOverlay (dsz,idx)
 {
 var grpo,fh,fnt,txt,grad,grpc;
 var spray,xx,yy,ww,hh,rr,rw,rh;
 var area,j,spid,tht,darkness,sprayx;
 var crs,hor,takeway,ty;

 if(1&&use_profiler==true&&mb_profile_group_rex) {  aaProfilerHit(arguments.callee.name); }
 if((grpo=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+idx)))==null) { aa.debugAlert(); }
 aa.guiCanvasClear(grpo.han,false);
 rect=aa.guiCssAreaGet(grpo.han);
 if(rect.width==0||rect.height==0) { return; }

 aa.guiCanvasAlphaSet(grpo.han,cfg_overlay_alpha);
 grpo.dom.style.opacity=0.7;
 grad=grpo.obj.ctx.createLinearGradient(0,-30,rect.width-20,rect.height/2);
 grad.addColorStop(0.0,app.uix.rgb_overlay_grad_1);
 grad.addColorStop(0.5,app.uix.rgb_overlay_grad_2);
 grad.addColorStop(1.0,app.uix.rgb_overlay_grad_3);
 aa.guiCanvasFill(grpo.han,0,0,rect.width,rect.height,grad);
 grad=null;
 fam=cfg_overlay_font;

 takeway=8;
 fh=Math.round((cfg_overlay_height-10)/cfg_overlay_lines);
 fh-=takeway;

 fnt="400 "+(fh*1.0)+"px '"+fam+"'";
 grpo.obj.ctx.filter="none";

 for(j=0;j<grpo.vars.text.length;j++)
  {
  if(grpo.vars.text[j]!="")
   {
   ty=(j*fh)+(cfg_overlay_lines*takeway);
   uixText3d(grpo.han,5,ty,-1,-1,fnt,app.uix.rgb_text_shadow,app.uix.rgb_text_color,grpo.vars.text[j]+"  ");
   }
  }

 area=aa.guiCssAreaGet(grpo.han);
 spid=parseInt(5000+(idx*100));

 if(idx==0)
  {
  if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
  sprayx=spriteRectGetEx(app.uix.sprite,3,"h",cfg_overlay_icon_height);//cfg_overlay_height/2);

  if(app.media.cur_local_mute==true)  { crs=true;  }
  else                                { crs=false; }
  spriteDrawEx(app.uix.sprite,grpo.obj.id,sprayx.x,sprayx.y,sprayx.w,sprayx.h, rect.width-sprayx.rw-20,5,sprayx.rw,sprayx.rh,0,0,crs);
  aa.guiSpotAdd(parseInt(spid),area.left+(rect.width-sprayx.rw-20),area.top+5,sprayx.rw,sprayx.rh);

  if(cfg_overlay_extra_buttons==true)
   {
   spid++;
   for(hor=0;hor<3;hor++)
    {
    sprayx=spriteRectGetEx(app.uix.sprite,45+(hor*2),"h",cfg_overlay_icon_height/3);
    crs=false;
    spriteDrawEx(app.uix.sprite,grpo.obj.id,sprayx.x,sprayx.y,sprayx.w,sprayx.h,rect.width-sprayx.rw-(120+(hor*50)),5,sprayx.rw,sprayx.rh,0,0,crs);
    aa.guiSpotAdd(spid,area.left+(rect.width-sprayx.rw-(120+(hor*50))),area.top+5,sprayx.rw,sprayx.rh);
    spid++;
    }
   }
  }
 else
  {
  if((grpc=aa.guiGroupGet(aa.guiIdFind("b_video_"+idx)))==null)  { aa.debugAlert(); }
  sprayx=spriteRectGetEx(app.uix.sprite,9,"h",cfg_overlay_icon_height);//cfg_overlay_height/2);

  if(grpc.dom.volume==0||grpc.dom.muted==true) { crs=true;  }
  else                                         { crs=false; }
  spriteDrawEx(app.uix.sprite,grpo.obj.id,sprayx.x,sprayx.y,sprayx.w,sprayx.h,  rect.width-sprayx.rw-10,5,sprayx.rw,sprayx.rh,0,0,crs);
  aa.guiSpotAdd(spid,area.left+(rect.width-sprayx.rw-10),area.top+5,sprayx.rw,sprayx.rh);

  if(cfg_overlay_extra_buttons==true)
   {
   spid++;
   for(hor=0;hor<3;hor++)
    {
    sprayx=spriteRectGetEx(app.uix.sprite,45+(hor*2),"h",cfg_overlay_icon_height/3);
    crs=false;
    spriteDrawEx(app.uix.sprite,grpo.obj.id,sprayx.x,sprayx.y,sprayx.w,sprayx.h,rect.width-sprayx.rw-(120+(hor*50)),5,sprayx.rw,sprayx.rh,0,0,crs);
    aa.guiSpotAdd(spid,area.left+(rect.width-sprayx.rw-(120+(hor*50))),area.top+5,sprayx.rw,sprayx.rh);
    spid++;
    }
   }
  }
 }


