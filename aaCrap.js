



 function uixBottomBarStart ()
 {
 app.uixbb.is_started=true;
 app.uixbb.is_spinning=false;
 app.uixbb.spin_angle=0;
 app.uixbb.spin_ms=0;

 app.uixbb.button_pressed=-1;
 app.uixbb.button_info=[];
 app.uixbb.button_info.push({sprite_index:43,text:"Devices"});
 app.uixbb.button_info.push({sprite_index:21,text:"Effects"});
 app.uixbb.button_info.push({sprite_index:20,text:"Next"});
 //app.uixbb.button_info.push({sprite_index:27,text:"Next"});
 //app.uixbb.button_info.push({sprite_index:15,text:"Settings"});
 if(use_options_menu==true)
  {
  app.uixbb.button_info.push({sprite_index:15,text:"Settings"});
  //app.uixbb.button_info.push({sprite_index:15,text:"Options"});
  }
 }



 function uixBottomBarSpinState (state)
 {
 if(state==true)
  {
  app.uixbb.is_spinning=true;
  app.uixbb.spin_angle=0;
  app.uixbb.spin_ms=aa.timerMsRunning();
  console.log("spin start");
  }
 else
  {
  app.uixbb.is_spinning=false;
  app.uixbb.spin_angle=0;
  console.log("spin stop");
  }
 }




 function uixBottomBarSpin ()
 {
 var el,ms,dsz;
 if(app.uixbb.is_spinning!=true) { return; }
 ms=aa.timerMsRunning();
 el=ms-app.uixbb.spin_ms;
 if(el<3) { return; }
 app.uixbb.spin_angle++;
 app.uixbb.spin_ms=ms;
 dsz=uixDispSizes();
 uixRepaintBottomBar(dsz);
 }





 function uixBottomBarPress (index)
 {
 var rect;
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 app.uixbb.button_pressed=index;
 app.uix.paint_all=true;
 }








 function uixHudLineCount ()
 {
 var l,c;
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 c=0;
 for(l=0;l<app.uix.hud_line.length;l++)
  {
  if(app.uix.hud_line[l].length>0) { c++; }
  }
 return c;
 }





 function uixHudLine (line,txt)
 {
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 if(line<0||line>=app.uix.hud_line.length) { return false; }
 app.uix.hud_line[line]=txt;
 return true;
 }





 function uixHudLog (line,lines,txt)
 {
 var i,l;
 l=line;
 if(app.uix.hud_line==undefined) { return false; }
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 if(l<0||l>=app.uix.hud_line.length) { return false; }
 if(lines<0)                         { return false; }
 if(lines==0)                        { return true;  }
 l+=lines;
 if(l>=app.uix.hud_line.length) { return false; }
 for(i=0;i<lines;i++)  {  app.uix.hud_line[line+i+0]=app.uix.hud_line[line+i+1];  }
 app.uix.hud_line[(line+lines)-1]=txt;

 uixRepaintHud();
 return true;
 }







 function uixCanvasOrientationFix ()
 {
 var grpa,grpb,grpp,vwid,vhit,soz;
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }

 soz=uixCameraSize(cam_res_short,cam_res_wid,cam_res_rot);
 vwid=soz.w;
 vhit=soz.h;

 if((grpa=app.uix.b_video_0_grp)==null)      { aa.debugAlert();}
 if((grpb=app.uix.b_canstream_0_grp)==null)  { aa.debugAlert();}
 if((grpp=app.uix.b_precanstream_0_grp)==null)  { aa.debugAlert();}

 if(grpa.dom.videoWidth==vwid)
  {
  if(grpb.dom.width!=vwid)      {      aa.guiSizeSet(grpb.han,vwid,vhit);      }
  if(grpp.dom.width!=vwid)      {      aa.guiSizeSet(grpp.han,vwid,vhit);      }
  }
 else
 if(grpa.dom.videoWidth==vhit)
  {
  if(grpb.dom.width!=vhit)      {      aa.guiSizeSet(grpb.han,vhit,vwid);      }
  if(grpp.dom.width!=vhit)      {      aa.guiSizeSet(grpp.han,vhit,vwid);      }
  }
 }






 function uixOverlaySet (id,line,txt)
 {
 var grp,ix,dsz,z;
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 grp=aa.guiGroupGet(aa.guiIdFind(id));
 if(grp==null) { aa.debugAlert(); }
 ix=aa.stringLastCharGet(id);
 grp.vars.text[line]=txt;
 grp.vars.teth[line]=aa.timerMsRunning();
 }






 function uixOverlayLog (id,line,lines,txt)
 {
 var i,li,tl,grp,ix,dsz;
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 grp=aa.guiGroupGet(aa.guiIdFind(id));
 if(grp==null) { aa.debugAlert(); }
 ix=aa.stringLastCharGet(id);
 tl=grp.vars.text.length;
 li=line;
 if(li>=tl)  { throw("uiOverlayLog tl="+tl+" used="+li); }
 if(li<0||li>=tl) { return false; }
 if(lines<0)      { return false; }
 if(lines==0)     { return true;  }
 li+=lines;
 if(li>tl) { return false; }
 for(i=0;i<lines;i++)  {  grp.vars.text[line+i+0]=grp.vars.text[line+i+1];  }
 grp.vars.text[(line+lines)-1]=txt;
 for(i=0;i<lines;i++)  {  grp.vars.teth[line+i+0]=grp.vars.teth[line+i+1];  }
 grp.vars.teth[(line+lines)-1]=aa.timerMsRunning();
 //uixRepaintOverlay(dsz,i);
 return true;
 }








 function tokTxt (txt,pd,pv,tc,str)
 {
 var t,etc,end;
 if(1&&use_profiler==true&&mb_profile_group_crap) {  aaProfilerHit(arguments.callee.name); }
 str+="";
 end="";
 for(t=0;t<tc;t++) { end+=" "; }
 etc="";
 if(pd=="S"||pd=="s")    {  etc=str.padStart(pv);  } else
 if(pd=="E"||pd=="e")    {  etc=str.padEnd(pv);    }
 etc+=end;
 txt+=etc;
 return txt;
 }


