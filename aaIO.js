

 function uixIOPointerUp (ptr)
 {
 var px,py,ox,oy,tg;
 var spot,ix,iy;
 var grpc,grp;
 var dsz,txt,elp;


 //uixHudLog(10,4,ptr.event.type+" "+ptr.event.pageX);
 if(ptr.event.type!="pointerup") { return false; }
 dsz=uixDispSizes();
 px=aa.numFixed(ptr.event.pageX,0);
 py=aa.numFixed(ptr.event.pageY,0);
 ox=aa.numFixed(ptr.event.offsetX,0);
 oy=aa.numFixed(ptr.event.offsetY,0);

 spot=aa.guiSpotMatch(px,py);



 if(spot==null)
  {
  if(app.uixbb.button_pressed!=-1)  {  uixBottomBarPress(-1);   }
  uixPaintAll(true);
  return false;
  }

 if((spot.id>=100&&spot.id<=103)&&(spot.id!=102&&spot.id!=103))
  {
  ix=spot.id-100;
  if(app.uixbb.button_pressed==ix)  {  uixBottomBarPress(-1);   }
  else                              {  uixBottomBarPress(ix);   }
  uixPaintAll(true);
  return true;
  }

 if(spot.id==102)
  {
  if(aa.main_state.stage>=700)
   {
   uixBottomBarPress(-1);
   uixBottomBarSpinState(true);
   roomNext();
   aa.mainStageSet(510);
   }
  uixPaintAll(true);
  return true;
  }

 if(spot.id==103)
  {
  if(aa.main_state.stage>=700)
   {
   uixBottomBarPress(-1);
   inviteOthers();
   }
  uixPaintAll(true);
  return true;
  }

 if(spot.id>=5000&&spot.id<=(5000+(max_peers*100)) )
  {
  ix=parseInt((spot.id-5000)/100);
  iy=parseInt((spot.id-5000)%100);
  if(ix==0&&iy==0)
   {
   if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
   if(app.media.cur_local_mute==true) {  mediaLocalGainMuteSet(cfg_default_audio_gain,false); } // THE GAIN
   else                               {  mediaLocalGainMuteSet(0.0,true);  }
   grpc.vars.audio_processor.gain=app.media.cur_local_gain;
   uixPaintAll(true);
   return true;
   }
  if(ix!=0&&iy==0)
   {
   grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+ix));
   if(grp==null)               { aa.debugAlert(); }
   if(grp.dom.volume==0||grp.dom.muted==true)  {    grp.dom.muted=false;    grp.dom.volume=1;    }
   else                                        {    grp.dom.muted=true;    grp.dom.volume=0;     }
   uixPaintAll(true);
   return true;
   }
  return false;
  }

  if(app.uixbb.button_pressed==0)
   {
   if(spot.id>=200&&spot.id<=299)
    {
    ix=spot.id-200;
    if(ix!=app.media.cur_vxi)
     {
     console.log("webcam change from "+app.media.cur_vxi+"  to "+ix);
     mediaCamSwap(ix);//app.media.cur_axi,ix);
     uixBottomBarPress(-1);
     uixPaintAll(true);
     return true;
     }
    }
   else
   if(spot.id>=300&&spot.id<=399)
    {
    ix=spot.id-300;
    if(ix!=app.media.cur_axi)
     {
     console.log("microphone change from "+app.media.cur_axi+"  to "+ix);
     mediaMicSwap(ix);//,app.media.cur_vxi);
     uixBottomBarPress(-1);
     uixPaintAll(true);
     return true;
     }
    }
   else
   if(spot.id>=400&&spot.id<=499)
    {
    ix=spot.id-400;
    if(ix!=app.media.cur_axo)
     {
     console.log("speaker change from "+app.media.cur_axo+"  to "+ix);
     mediaChangeSinks(ix);
    uixBottomBarPress(-1);
     uixPaintAll(true);
     return true;

     }
    }
   }
  else
  if(app.uixbb.button_pressed==1)
   {
   if(spot.id>=1400&&spot.id<=1599)
    {
    ix=spot.id-1400;
    app.media.cur_vfxi=ix;
    uixBottomBarPress(-1);
    uixPaintAll(true);
    return true;
    }
   if(spot.id>=1600&&spot.id<=1799)
    {
    ix=spot.id-1600;
    app.media.cur_afxi=ix;
    uixBottomBarPress(-1);
    uixPaintAll(true);
    return true;
    }
   if(spot.id>=1800&&spot.id<=1999)
    {
    ix=spot.id-1800;
    app.media.cur_arxi=ix;
    if(app.media.ever_ar_stage==0)
     {
     app.media.ever_ar_stage=1;
     }
    uixBottomBarPress(-1);
    uixPaintAll(true);
    return true;
    }
   }

 return false;
 }







 function uixIO ()
 {
 var kbs,pts,key,ptr,gos;

 if(app.uix.is_started!=true) {  return;  }
 if(1&&use_profiler==true&&mb_profile_group_io) {  aaProfilerHit(arguments.callee.name); }


 gos=0;
 while(1)
  {
  gos++;
  if(gos>=10) { break; }
  if(cfg_use_keyboard==true)
   {
   kbs=aa.keyboardStatus();
   pts=aa.pointerStatus();
   if(kbs.msgs_queued==0&&pts.msgs_queued==0) { break; }
   //uixHudLine(9,"ptr="+pts.msgs_total+"  "+pts.msgs_queued);
   key=aa.keyboardRead();
   ptr=aa.pointerRead();
   if(key==null&&ptr==null) { break; }
   }
  else
   {
   pts=aa.pointerStatus();
   if(pts.msgs_queued==0) { break; }
   ptr=aa.pointerRead();
   if(ptr==null) { break; }
   }
  while(1)
   {
   if(ptr==null)                                                      { break; }
   if(ptr.event.pointerType!="mouse"&&ptr.event.pointerType!="touch") { break; }
   uixIOPointerUp(ptr);
   break;
   }
  if(cfg_use_keyboard==true)
   {
   while(1)
    {
    if(key==null) { break; }
    if(key.name=="keyup"&&(key.key>="0"&&key.key<="9"))
     {
     if(key.key==1)     {     uixHudStateSet("toggle");     }
     else
     if(key.key==3)     {     mediaCamSwap(0,1);     }
     else
     if(key.key==9)     {     beamHeroshimaWrite(app.beam_obj);     }
     }
    break;
    }
   }
  }

 }



