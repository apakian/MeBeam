



 function uixStart ()
 {
 var i,grp,x,y,w,h,disp,grpx,j;

 app.uix.is_started=true;
 app.uix.cog=new Array(10).fill(0);
 app.uix.blit_initial=0;
 app.uix.blit_elapsed=0;
 app.uix.blit_cycle=0;
 app.uix.blit_hz=0;
 app.uix.disp_change=false;
 app.uix.disp_change_count=0;
 app.uix.paint_all=true;
 app.uix.last_disp={};
 app.uix.this_disp={};
 app.uix.sprite={};
 app.uix.group=[];

 app.uix.rgb_cross=aa.guiRgbaString(250,0,0,0.9);
 app.uix.rgb_markup_def_font=aa.guiRgbaString(205,255,55,1.0);
 app.uix.rgb_markup_grad_1=aa.guiRgbaString(10,10,110,1.0);
 app.uix.rgb_markup_grad_2=aa.guiRgbaString(10,20,10,1.0);
 app.uix.rgb_markup_grad_3=aa.guiRgbaString(10,10,10,1.0);
 app.uix.rgb_markup_border=aa.guiRgbaString(10,166,210,0.7);
 app.uix.rgb_botbar_grad_1=aa.guiRgbaString(10,10,90,1.0);
 app.uix.rgb_botbar_grad_2=aa.guiRgbaString(20,10,20,1.0);
 app.uix.rgb_botbar_grad_3=aa.guiRgbaString(10,20,140,1.0);
 app.uix.rgb_botbar_text=aa.guiRgbaString(140,140,140,1.0);
 app.uix.rgb_botbar_text_pressed=aa.guiRgbaString(255,255,255,1.0);
 app.uix.rgb_botbar_text_shadow=aa.guiRgbaString(0x10,0x10,0x10,1.0);
 app.uix.rgb_botbar_button_border=aa.guiRgbaString(10,10,100,1.0);
 app.uix.rgb_botbar_border=aa.guiRgbaString(10,10,100,1.0);
 app.uix.rgb_overlay_grad_1=aa.guiRgbaString(0,0,200,1.0);
 app.uix.rgb_overlay_grad_2=aa.guiRgbaString(20,10,90,0.7);
 app.uix.rgb_overlay_grad_3=aa.guiRgbaString(210,20,40,0.1);
 app.uix.rgb_text_shadow=aa.guiRgbaString(20,20,20,1.0);
 app.uix.rgb_text_color=aa.guiRgbaString(180,200,250,1);
 app.uix.rgb_vad_color_1=aa.guiRgbaString(200,200,5,1);
 app.uix.rgb_vad_color_2=aa.guiRgbaString(50,100,200,1);





 app.uix.b_video_0_grp=null;
 app.uix.b_canstream_0_grp=null;
 app.uix.b_overlay_0_grp=null;
 app.uix.hud_grp=null;
 app.uix.bottombar_grp=null;
 app.uix.popup_grp=null;

 app.uix.font=[];
 app.uix.fonts_ready=false;

 app.uix.hud_line=[];
 for(i=0;i<20;i++) { app.uix.hud_line[i]=""; }

 app.uix.did_swap=false;

 uixElementCreate("canvas","hud"      ,9600,1.0 ,null,null);//uixHudResize,uixHudRepaint);
 uixElementCreate("canvas","bottombar",8600,1.0 ,null,null);//uixBottomBarResize,uixBottomBarRepaint);
 uixElementCreate("canvas","popup"    ,9700,1.0 ,null,null);//popupRepaint);
 uixElementCreate("canvas","splash"   ,9800,1.0 ,null,null);//popupRepaint);
 for(i=0;i<max_peers;i++)
  {
  if(i==0)
   {
   uixElementCreate("canstream","b_canstream_"+i,8300,1.0 ,null,null);
   uixElementCreate("canvas","b_precanstream_"+i,8100,1.0 ,null,null);
   uixElementCreate("video"    ,"b_video_"+i    ,8350,1.0  ,null,null);
   uixElementCreate("canvas"   ,"b_overlay_"+i  ,8400,1.0  ,null,null);
   }
  else
   {
   uixElementCreate("video"    ,"b_video_"+i    ,7350,1.0  ,null,null);
   uixElementCreate("canvas"   ,"b_overlay_"+i  ,7400,1.0  ,null,null);
   }
  }
 app.uix.b_video_0_grp=uixElementGroupFind("b_video_0");
 app.uix.b_canstream_0_grp=uixElementGroupFind("b_canstream_0");
 app.uix.b_precanstream_0_grp=uixElementGroupFind("b_precanstream_0");
 app.uix.b_overlay_0_grp=uixElementGroupFind("b_overlay_0");
 app.uix.hud_grp=uixElementGroupFind("hud");
 app.uix.bottombar_grp=uixElementGroupFind("bottombar");
 app.uix.popup_grp=uixElementGroupFind("popup");
 app.uix.splash_grp=uixElementGroupFind("splash");
 for(i=0;i<max_peers;i++)
  {
  grpx=uixElementGroupFind("b_overlay_"+i);
  grpx.vars.text=[];
  grpx.vars.teth=[];
  for(j=0;j<cfg_overlay_lines;j++)
   {
   uixOverlaySet("b_overlay_"+i,j,"");
   }
  }

 ///console.log("loading fonts");
 uixFontLoadThem();
 if(cfg_use_keyboard==true)
  {
  aa.keyboardStart();
  }
 aa.pointerStart();
 window.requestAnimationFrame(uixBlitEx);
 }




 function uixPaintAll (state)
 {
 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name); }
 ///console.log(arguments.callee.name+"/"+arguments.callee.caller.name+"  "+state);
 app.uix.paint_all=state;
 }






 function uixFontLoadThem ()
 {
 app.uix.font.push(aa.guiFontLoad("asap","woff","https://mebeam.com/fonts/dyn/asap.woff?4"));
 app.uix.font.push(aa.guiFontLoad("fira","woff","https://mebeam.com/fonts/dyn/fira.woff?4"));
// app.uix.font.push(aa.guiFontLoad("lato","truetype","https://mebeam.com/fonts/dyn/lato.ttf?4"));
 app.uix.font.push(aa.guiFontLoad("saira","woff","https://mebeam.com/fonts/dyn/saira.woff?4"));
 app.uix.font.push(aa.guiFontLoad("srccodepro","woff","https://mebeam.com/fonts/dyn/srccodepro.woff?4"));
 }




/*
 "asap"       // narrow mono
 "fira"       // wider mono
 "lato"       // medium mono
 "saira"      // narrow variable
 "srccodepro" // wide mono
 "sugar"      // narrow variable
 "longisland" // narrow variable
*/

 function uixFontNameByIndex (index)
 {
 var i;

 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name); }
 if(app.uix.fonts_ready!=true) { return null; }
 i=index%app.uix.font.length;
 switch(i)
  {
  case 0: return "asap";
  case 1: return "fira";
  //case 2: return "lato";
  case 2: return "saira";
  case 3: return "srccodepro";
  //case 5: return "sugar";
  //case 6: return "longisland";
  }
 return null;
 }







 function uixElementCreate (type,id,zi,opa,resizeproc,repaintproc)
 {
 var han,grp,vwid,vhit,area;
 var iscs=false;

 if(type=="canstream")  { iscs=true; }
 if(type=="canvas"||type=="canstream")  {  han=aa.guiCreate("canvas",id);  }
 else                                   {  han=aa.guiCreate(type,id);      }

 aa.handleCommentSet(han,"element create "+id);

 if((grp=aa.guiGroupGet(han))==null) { aa.debugAlert(); }

 if(type=="video")
  {
  grp.css.objectFit="cover";
  grp.css.objectPosition="50% 50%";
  grp.dom.setAttribute('playsinline','playsinline');
  grp.dom.setAttribute('webkit-playsinline','webkit-playsinline');
  }
 else
 if(type=="canvas"||type=="canstream")
  {
  if(type=="canstream")
   {
   grp.css.objectFit="cover";
   grp.css.objectPosition="50% 50%";
   }
  type="canvas";
  }
 else
  {
  aa.debugAlert(type,id);
  }

 while(1)
  {
  if(id=="hud")      {   aa.guiCssOutlineSet(han,1,-1,"dashed",aa.guiRgbaString(250,50,50,1));   break;   }
  if(id=="popup")    {  break; } // aa.guiCssOutlineSet(han,4,-3,"dashed",aa.guiRgbaString(50,250,50,1));   break;   }
  if(id=="bottombar"){     break;   }
  if(id=="splash")  { break; } // aa.guiCssOutlineSet(han,4,-4,"dashed",aa.guiRgbaString(50,250,50,1));   break;   }
  if(type=="video")  {   break; } ///aa.guiCssOutlineSet(han,1,-1,"dashed",aa.guiRgbaString(50,250,50,1));   break;   }
  if(iscs==true)     {  break; } // aa.guiCssOutlineSet(han,1,-1,"dashed",aa.guiRgbaString(80,50,250,1));   break;   }
  if(type=="canvas") {   break;   }
  //if(type=="canvas") {   aa.guiCssOutlineSet(han,4,-4,"dashed",aa.guiRgbaString(250,250,50,1));   break;   }
  alert(type+"  "+id);
  break;
  }

 grp.vars.proc_resize=resizeproc;
 grp.vars.proc_repaint=repaintproc;
 grp.vars.rtc_handle=0;
 grp.vars.peer_index=0;
 grp.vars.user_txt="";
 grp.vars.user_etc="";
 grp.vars.vol_level=0;
 if(1) { aa.guiCssDisplaySet(han,"absolute",zi,opa,"none");          }
 else  { aa.guiCssDisplaySet(han,"absolute",zi,opa,"inline-block");  }
 app.uix.group[app.uix.group.length]=grp;
 return han;
 }







 function uixElementSizeSet (id,dw,dh,cx,cy,cw,ch)
 {
 var grp,are;

 while(1)
  {
  if(id=="bottombar")      { if((grp=app.uix.bottombar_grp)==null) { return false; }   break;   }
  if(id=="hud")            { if((grp=app.uix.hud_grp)==null) { return false; }   break;   }
  if(id=="popup")          { if((grp=app.uix.popup_grp)==null) { return false; }   break;   }
  if(id=="b_video_0")      { if((grp=app.uix.b_video_0_grp)==null) { return false; }   break;   }
  if(id=="b_overlay_0")    { if((grp=app.uix.b_overlay_0_grp)==null) { return false; }   break;   }
  if(id=="b_canstream_0")  { if((grp=app.uix.b_canstream_0_grp)==null) { return false; }   break;   }
  if((grp=uixElementGroupFind(id))==null) { return false; }
  break;
  }

 if((dw!=grp.dom.width)||(dh!=grp.dom.height))
  {
  if(1&&use_profiler==true) {  aaProfilerHit("a "+arguments.callee.name+"/"+arguments.callee.caller.name); }
  aa.guiSizeSet(grp.han,dw,dh);
  uixPaintAll(true);
  }

 are=aa.guiCssAreaGet(grp.han);
 if((are.left!=cx)||(are.top!=cy)||(are.width!=cw)||(are.height!=ch))
  {
  if(1&&use_profiler==true) {  aaProfilerHit("b "+arguments.callee.name+"/"+arguments.callee.caller.name); }
  aa.guiCssAreaSet(grp.han,cx,cy,cw,ch);
  uixPaintAll(true);
  }

 return true;
 }





 function uixElementGroupFind (id)
 {
 var i,grp;
 //if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 for(i=0;i<app.uix.group.length;i++)
  {
  grp=app.uix.group[i];
  if(grp.obj.id==id) {  return grp;  }
  }
 return null;
 }




 function uixVideoAndOverlayDisplay (index,state)
 {
 var grp;
 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name); }
 grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+index));
 if(grp==null) { aa.debugAlert(); }
 uixElementDisplay(grp.obj.id,state);
 grp=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+index));
 if(grp==null) { aa.debugAlert(); }
 uixElementDisplay(grp.obj.id,state);
 }







 function uixElementDisplay (id,state)
 {
 var grp,txt,ok;

 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name); }
 if((grp=aa.guiGroupGet(aa.guiIdFind(id)))==null) { return false; }
 while(1)
  {
  if(state==false)
   {
   if(grp.dom.style.display=="none") { break; }
   if(grp.dom.style.display=="inline-block")
    {
    if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
    grp.dom.style.display="none";
    uixPaintAll(true);
    break;
    }
   }
  else
  if(state==true)
   {
   if(grp.dom.style.display=="inline-block") { break; }
   if(grp.dom.style.display=="none")
    {
    if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
    grp.dom.style.display="inline-block";
    uixPaintAll(true);
    break;
    }
   }
  else
  if(state=="toggle")
   {
   if(grp.dom.style.display=="none")
    {
    if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
    grp.dom.style.display="inline-block";
    }
   else
    {
    if(1&&use_profiler==true) {  aaProfilerHit(arguments.callee.name); }
    grp.dom.style.display="none";
    }
   uixPaintAll(true);
   break;
   }
  break;
  }
 return true;
 }





 function uixCameraSize (useshort,rezwid,isrot)
 {
 var sz,ww,hh,swp,obj;
 switch(rezwid)
  {
  default:  alert("rezwid="+rezwid);  break;
  case 160:  ww=rezwid;  if(useshort) { hh=90;  }  else         { hh=120; }  break;
  case 320:  ww=rezwid;  if(useshort) { hh=180; }  else         { hh=240; }  break;
  case 640:  ww=rezwid;  if(useshort) { hh=360; }  else         { hh=480; }  break;
  }
 if(isrot)  {  swp=ww;  ww=hh;  hh=swp;  }
 obj={};
 obj.w=ww;
 obj.h=hh;
 return obj;
 }








 function uixDispSizes ()
 {
 var vwid,vhit,soz,arr=[];
 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 arr[0]=app.uix.this_disp.win_wid;
 arr[1]=app.uix.this_disp.win_hit;
 arr[2]=app.uix.this_disp.scr_wid;
 arr[3]=app.uix.this_disp.scr_hit;
 arr[4]=window.innerHeight;
 arr[5]=document.documentElement.clientHeight;
 arr[6]=Math.abs(window.innerHeight-document.documentElement.clientHeight);
 soz=uixCameraSize(cam_res_short,cam_res_wid,cam_res_rot);
 vwid=soz.w;
 vhit=soz.h;
 arr[7]=vwid;
 arr[8]=vhit;
 arr[9]=arr[7]/arr[8];
 return arr;
 }









 function uixBlitEx (timestamp)
 {
 var dif,e,grp,g,gl,area,dsz,tim;
 var x,y,w,h,i,areab;
 var grpb,grph,grpp;
 var grpc,grpv,grpo;
 var v,t,vx,label,kind;
 var got_dsz;

 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name); }
 got_dsz=false;

 tim=aa_ms_running;
 if(app.uix.blit_initial==0) { app.uix.blit_initial=tim; }
 app.uix.blit_elapsed=tim-app.uix.blit_initial;
 app.uix.blit_hz=app.uix.blit_cycle/(app.uix.blit_elapsed/1000);
 app.uix.this_disp=aa.envDisplayGet();


 if((dif=aa.envDisplayCompare(app.uix.this_disp,app.uix.last_disp))!=0)
  {
  app.uix.disp_change=true;
  }

 if(app.uix.disp_change==true)
  {
  uixPaintAll(true);
  if(app.mup.type!=undefined)  {   markupDelete(app.mup);    app.mup={};    }
  }


 if(app.uix.paint_all==true)
  {
  uixAll();
  uixPaintAll(false);
  }
 else
  {
  if((app.uix.blit_cycle%50)==0)
   {
   if(got_dsz==false) {  dsz=uixDispSizes(); got_dsz=true; }
   //uixRepaintComms(dsz);
   uixRepaintAllOverlays(dsz);
   }
  }

 uixBottomBarSpin();

 if(got_dsz==false) {  dsz=uixDispSizes(); got_dsz=true; }
 uixVideoCanvasPaint(dsz);

 if((app.uix.blit_cycle%30)==0)
  {
  if(got_dsz==false) {  dsz=uixDispSizes(); got_dsz=true; }
  uixHudLine(0,aa.main_state.stage+"  "+aa.main_state.cycle+"  "+aa.timerMsRunning()+" ver="+app_version);
  uixHudLine(1,"spr="+aa.main_state.speed_req+" sgt="+aa.main_state.speed_got+"  cs="+app.self.speed);
  uixHudLine(2,"win="+dsz[0]+"x"+dsz[1]+" ever="+app.media.ever_ar_stage);
  uixHudLine(3,"scr="+dsz[2]+"x"+dsz[3]);
  uixHudLine(4,"wih="+dsz[4]+" dch="+dsz[5]+" dif="+dsz[6]);
  uixHudLine(5,"vwd="+dsz[7]+" vht="+dsz[8]+" rat="+aa.numFixed(dsz[9],2));
  uixHudLine(6,"blt="+aa.numFixed(app.uix.blit_hz,3));
  if(app.beam_obj!=undefined)
   {
   uixHudLine(7,"per="+app.beam_obj.peer_count+" pcc="+app.beam_obj.peer_count_connected+" but="+app.uixbb.button_pressed);
   }
  uixHudLine(8,"vid="+aa.mediaDeviceCountGet("videoinput")+" ain="+aa.mediaDeviceCountGet("audioinput")+" aout="+aa.mediaDeviceCountGet("audiooutput"));
  ///uixHudLog (line,lines,txt)
  if(aa.main_state.cycle>400)   {   uixRepaintHud();   }
   }

 ///uixHudLog(10,4,aa.main_state.cycle)

 app.uix.disp_change=false;
 app.uix.last_disp=app.uix.this_disp;
 app.uix.blit_cycle++;
 window.requestAnimationFrame(uixBlitEx);
 }





 function uixText3d (handle,xpos,ypos,xdif,ydif,fnt,rgb1,rgb2,txt)
 {
 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 aa.guiCanvasText(handle,xpos,ypos,0,null,rgb1,fnt,txt);
 aa.guiCanvasText(handle,xpos+xdif,ypos+ydif,0,null,rgb2,fnt,txt);
 }









 function uixYield ()
 {
 var c,f;
 if(app.uix.is_started!=true) {  return;  }
 if(1&&use_profiler==true&&mb_profile_group_uix) {  aaProfilerHit(arguments.callee.name); }
 if(app.uix.fonts_ready==false)
  {
  for(c=0,f=0;f<app.uix.font.length;f++)
   {
   if(aa.guiFontStatus(app.uix.font[f])==true) { c++; }
   }
  if(c==app.uix.font.length)          {  app.uix.fonts_ready=true;   }
  }
 uixIO();
 }








