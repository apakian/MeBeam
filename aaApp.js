/*-----------------------------------------------------------------------*/
 window.onload=function() { aa.mainStart(app_version,app_speed,appProc); aa.mainRun(); };
/*-----------------------------------------------------------------------*/
 var app=aa.main_vars.app;
/*-----------------------------------------------------------------------*/


 var the_info="";



 window.onbeforeunload = function(e)
 {
 console.log(" ");
 console.log("onbeforeunload");
 console.log("---------------------");
 };




 function appLog (msg)
 {
 uixHudLog(10,4,msg);
 console.log(msg);
 }



 function appStart ()
 {
 var str;
 app.self={};
 app.uix={};
 app.uixbb={};
 app.media={};
 app.beam_obj=null;
 app.mup={};
 app.db=aa.storageCreate(false);
 app.room_number=0;
 roomNext();
 //aa.debugClear(3);
 aa.debugLoggerLevelSet(80);
 //if('serviceWorker' in navigator) {  navigator.serviceWorker.register('code/aaServiceWorker.js');}
 app.self.envinfo=aa.envInfoGet();
 str="";
 str+=((app.self.envinfo.is_mobile)?"T":"F")+"/";
 str+=((app.self.envinfo.is_real_mobile)?"T":"F")+"/";
 str+=((app.self.envinfo.is_standalone)?"T":"F")+"/";
 str+=((app.self.envinfo.is_win)?"T":"F")+"/";
 str+="`"+app.self.envinfo.name+"`"+"/";
 str+="`"+app.self.envinfo.platform+"`"+"/";
 str+="`"+app.self.envinfo.ver+"`"+"/";
 str+="`"+app.self.envinfo.who+"`"+"/";
 str+="`"+app.self.envinfo.ua+"`";
 app.self.env_string=str;
 app.self.is_what=aa.envBrowserArgByKey("nick").val;
 app.self.is_started=true;
 app.self.speed=0;//500;//aa.debugSpeedTest();
 if(use_profiler==true)
  {
  aaProfilerStart();
  }
 else
  {
  aaProfilerStart();
  }

 }




 function appYield ()
 {
 if(app.self.is_started!=true) {  return;  }
 if(1&&use_profiler==true&&mb_profile_group_app) {  aaProfilerHit(arguments.callee.name); }
 if(1&&aa_ms_running>300&&aa.mainCyclePulse(70)&&aa_profiler.global_hits>0)
  {
  aa.debugLogger(99,aaProfilerDump(0,100,30,50000,0,500,false,true));
  }
 }




 function roomNext ()
 {
 var r,o;
 o=app.room_number;
 while(1)
  {
  r=aa.numRand(10);
  if(r==0&&app.room_number!=0)   {  app.room_number=0;  }
  else                           {  app.room_number+=(r+o);  }
  //app.room_number+=aa.main_state.cycle;
  app.room_number%=max_rooms;
  if(app.room_number!=o) { break; }
  }
 }



 function roomConnect (num)
 {
 app.beam_obj=beamDelete(app.beam_obj);
 if(aa.envBrowserArgByKey("nick").val)
  {
  app.beam_obj=beamNew(null,max_peers,aa.envBrowserArgByKey("nick").val,"room-"+app.room_number,"wss://mebeam.com:443/wss/roomer");
  }
 else
  {
  app.beam_obj=beamNew(null,max_peers,null,"room-"+app.room_number,"wss://mebeam.com:443/wss/roomer");
  }
 }



 function appErrConvert (ename,emsg,ecode,econst,show)
 {
 var what,txt;
 while(1)
  {
  what=0;
  if(ename=="NotFoundError"||ename=="DevicesNotFoundError")               {  what=1; break; }        //required track is missing     }
  if(ename=="NotReadableError"||ename=="TrackStartError")                 {  what=2; break; }        //webcam or mic are already in use     }
  if(ename=="OverconstrainedError"||ename=="ConstraintNotSatisfiedError") {  what=3; break; }        //constraints can not be satisfied by avb. devices     }
  if(ename=="NotAllowedError"||ename=="PermissionDeniedError")            {  what=4; break; }        //permission denied in browser     }
  if(ename=="TypeError"||ename=="TypeError")                              {  what=5; break; }        //empty constraints object      }
  if(ename=="PermissionDismissedError")                                   {  what=6; break; }        //chrome only, dialog ignored
  break;
  }
 if(show==true)
  {
  txt="";
  txt+=ename+"\r\n";
  txt+=emsg+"\r\n";
  txt+=ecode+"\r\n";
  txt+=econst+"\r\n";
  switch(what)
   {
   case 1:   txt+="Required track is missing\r\n";   break;
   case 2:   txt+="Webcam or Mic already in use\r\n";   break;
   case 3:   txt+="Constraints not satisfied\r\n";   break;
   case 4:   txt+="Permission denied in browser\r\n";   break;
   case 5:   txt+="Empty Constraints\r\n";   break;
   case 6:   txt+="Chrome only\r\n";   break;
   }
  alert(txt);
  }

 return what;
 }



 //function appErrMessage




 function appProc ()
 {
 var grp,disp,rect;
 var cstream,vstream,astream,stream,med;
 var grpv,ret,oldstage,val,res,dsz,spray,mes,fnt,txt,grad,mv;

 if(1&&use_profiler==true&&mb_profile_group_app) {  aaProfilerHit(arguments.callee.name); }

 oldstage=aa.main_state.stage;

 switch(aa.main_state.stage)
  {
  case 0:
  appStart();
  aa.mainStageSet(20);
  break;


  case 20:
  aa.main_state.stage++;
  break;

  case 21:
  case 22:
  case 23:
  case 24:
  app.self.speed+=aa.debugSpeedTest();
  aa.main_state.stage++;
  break;



  case 25:
  app.self.speed=aa.numFixed(app.self.speed/5);
  console.log("SPEED="+app.self.speed);
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(100);
  break;



  case 100:
  uixStart();
  aa.mainStageSet(150);
  break;


  case 150:
  //if((grp=uixElementGroupFind("b_video_0"))==null) { aa.debugAlert(); }
  //app.vidz=videoLoad(grp.han,"https://mebeam.com/uservids/v0/tree/d/1/d1bf84b98601c8f92860842065843323.mp4");
  //grp.dom.loop=true;
  //console.log(app.vidz);
  //if(app.uix.fonts_ready!=true) { break; }
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(200);
  break;


  case 200:
  app.uix.sprite=spriteLoad("https://mebeam.com/imgs/style5.png?896");
  console.log(aa.timerMsRunning()+" ms so far...... loading sprite");
  aa.mainStageSet(230);
  break;


  case 230:
  if(app.uix.sprite.is_loading==true) { break; }
  spriteOptimize(app.uix.sprite);
  console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" sprite sheet optimal");
  aa.mainStageSet(250);
  break;


  case 250:
   uixBottomBarStart();
  aa.mainStageSet(330);
  break;



  case 330:
  //app.uix.obama=imageLoad("/imgs/lux2.jpg?13");
  app.uix.lux1=imageLoad("/imgs/lux1.jpg?13");
  //app.uix.ash1=imageLoad("/imgs/ash1.jpg?12");
  //console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(350);
  break;


  case 350:
  //if(app.uix.obama.is_loading==true) { break; }
  //if(app.uix.lux1.is_loading==true) { break; }
  //if(app.uix.ash1.is_loading==true) { break; }
  //console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(355);
  break;


  case 355:
  if((grp=app.uix.splash_grp)==null) { aa.debugAlert(); }
  //dsz=uixDispSizes();
  //uixElementSizeSet(grp.obj.id,dsz[0],dsz[1],0,0,dsz[0],dsz[1]);
  uixElementDisplay(grp.obj.id,true);
  aa.guiCanvasAlphaSet(grp.han,1.0);
  grp.dom.style.opacity=1.0;
  app.splash_x=0;
  app.splash_y=0;
  app.splash_t=0;
  aa.mainStageSet(357);
  break;
//https://mebeam.com/uservids/v0/tree/7/c/7ce583089f1a657ca5463efcaa5ebe6d.mp4
//https://mebeam.com/uservids/v0/tree/d/1/d1bf84b98601c8f92860842065843323.mp4

  case 357:
  if((grp=app.uix.splash_grp)==null) { aa.debugAlert(); }
  app.uix.this_disp=aa.envDisplayGet();
  dsz=uixDispSizes();
  uixElementSizeSet(grp.obj.id,dsz[0],dsz[1],0,0,dsz[0],dsz[1]);
  spray=app.uix.sprite.sheet_map[28];
  mv=(aa.timerMsRunning()/20)%256;
  grad=grp.obj.ctx.createLinearGradient(mv,mv*2,dsz[0],dsz[1]);
  grad.addColorStop(0.0,aa.guiRgbaString(255,255,255,1.0));
  grad.addColorStop(0.5,aa.guiRgbaString(254,231,21,1.0));
  grad.addColorStop(1.0,aa.guiRgbaString(mv,200,21,1.0));
  aa.guiCanvasFillFull(grp.han,grad);
  fnt="600 48px 'arial'";
  txt="Click to Start MeBeam";
  aa.guiCanvasFontSet(grp.han,fnt);
  grp.ctx.filter="none";
  mes=aa.guiCanvasTextMeasure(grp.han,txt);
  spriteDraw(app.uix.sprite,"splash",spray.x1,spray.y1,spray.w,spray.h,   (dsz[0]/2)-(50/2),(dsz[1]/2)-(50), 100,100,0,0);
  uixText3d(grp.han,(dsz[0]/2)-(mes.w/2),(dsz[1]/2)+70,-3,-3,fnt,app.uix.rgb_text_shadow,aa.guiRgbaString((mv/4)|0,255,255,1.0),txt);
  fnt="600 37px 'tahoma'";
  txt="v "+((app_version/100)|0)+"."+((app_version%100)|0);
  aa.guiCanvasFontSet(grp.han,fnt);
  grp.ctx.filter="none";
  mes=aa.guiCanvasTextMeasure(grp.han,txt);
  uixText3d(grp.han,(dsz[0]/2)-(mes.w/2),(dsz[1]/2)+120,-4,-4,fnt,app.uix.rgb_text_shadow,aa.guiRgbaString(254,255,255,1.0),txt);
  //app_version
  spray=null;
  grad=null;
  if(aa.main_state.initial_click!=true) { break; }
  //uixElementDisplay(grp.obj.id,false);
  aa.mainStageSet(380);
  break;






  case 380:
  if(app.uix.fonts_ready!=true) { break; }
  if(app.uix.lux1.is_loading!=false) { break; }
  if((grp=app.uix.splash_grp)==null) { aa.debugAlert(); }
  uixElementDisplay(grp.obj.id,false);
  mediaStart();
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(450);
  //aa.mainStageSet(465);
  break;


  case 450:
  console.log("media create empty");
  app.media_handle=aa.mediaCreate({},{});
  //aa.handleCommentSet(app.media_handle,"media create 450");
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(460);
  break;


  case 460:
  aa.mediaStatus(app.media_handle);
  med=aa.mediaGet(app.media_handle);
  if(med.res===null)  { break; }
  if(med.res==="err")
   {
   console.log("mdd res=err");
   val=appErrConvert(med.e_name,med.e_msg,med.e_code,med.e_constraint,true);
   aa.mainStageSet(666);
   break;
   }
  if(med.res!=="ok")  { break; }
  if(med.stage!=300)  { break; }
  if((ret=aa.mediaDestroy(app.media_handle))!=true) {  console.log("media destroy ="+ret); alert(); }
  app.media_handle=0;
  console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(465);
  break;


  case 465:
  console.log("media detect");
  aa.mediaDeviceDetect();
  aa.mainStageSet(470);
  break;



  case 470:
  if(aa.media_obj.state.detect_state!="failed"&&aa.media_obj.state.detect_state!="ready")  {   break;   }
  console.log(aa.media_obj.state.detect_state);
  if(aa.media_obj.state.detect_state=="failed") { alert(aa.media_obj.state.detect_obj.e_name+"  "+aa.media_obj.state.detect_obj.e_msg); aa.mainStageSet(666);  break;   }
  if(0) { mediaDump(); }
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(475);
  break;

  case 475:
  console.log("reading devices from db");
  mediaReadLastDevice();
  mediaStoreLastDevice();
  console.log("storing devices to db");
  aa.mainStageSet(480);
  break;


  case 480:
  console.log(app.media.cur_axi+"  "+app.media.cur_vxi+" "+app.media.cur_axo);
  app.media_handle=mediaPairCreate(app.media.cur_axi,app.media.cur_vxi);
  console.log("pair created "+app.media_handle);
  aa.mainStageSet(490);
  break;



  case 490:
  res=aa.mediaStatus(app.media_handle);
  med=aa.mediaGet(app.media_handle);
  if(med.res===null)  { break; }
  console.log("pair ="+med.res);
  if(med.res==="err")
   {
   val=appErrConvert(med.e_name,med.e_msg,med.e_code,med.e_constraint,true);
   aa.mainStageSet(666);
   break;
   }
  if(med.res!=="ok")  { break; }
  if(med.stage!=300)  { break; }

  if((grpv=uixElementGroupFind("b_video_0"))==null) { aa.debugAlert(); }
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);


  aa.mediaAttach(app.media_handle,grpv.han);

  if(cfg_loopback_muted==true)   {   grpv.dom.muted=true;    grpv.dom.volume=0;   }
  else                           {   grpv.dom.muted=false;   grpv.dom.volume=1;   }
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(495);
  break;



  case 495:
  if(cfg_hud_initially_visible==true)  { uixHudStateSet(true); }
  makeKing();
  ///console.log(aa.timerMsRunning()+" ms so far...... stage "+aa.main_state.stage+" speed="+app.self.speed);
  aa.mainStageSet(500);
  break;



  case 500:
  if(app.face0==undefined)
   {
   if((grp=uixElementGroupFind("b_video_0"))==null) { aa.debugAlert(); }
   app.face0=faceCreate("b_video_0");
   }
  aa.mainStageSet(510);
  break;


  case 510:
  roomConnect(app.room_number);
  aa.mainStageSet(530);
  break;


  case 530:
  uixPaintAll(true);
  aa.mainStageSet(580);
  break;


  case 540:
  aa.mainStageSet(580);
  break;


  case 580:
  if(app.beam_obj.is_ready!=true)
   {
   if(app.beam_obj.is_full==true)
    {
    console.log(app.room_number+" room full");
    roomNext();
    aa.mainStageSet(510);
    break;
    }
   break;
   }
  //uixBottomBarSpinState(false);
  uixPaintAll(true);
  aa.mainStageSet(700);
  break;



  case 700:
  if(app.uixbb.is_spinning==true)
   {
   if(app.beam_obj.stage==200&&app.beam_obj.elapsed>1000)
    {
    uixBottomBarSpinState(false);
    uixPaintAll(true);
    }
   }
  break;
  }

 appYield();
 uixYield();
 if(app.beam_obj!=undefined) { beamYield(app.beam_obj);  }
 if(app.face0!=undefined)    { faceYield(app.face0);     }


 }


