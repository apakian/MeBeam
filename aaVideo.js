


 function videoLoadEvent (event)
 {
 var han,grp;
// if(profile_group_video) { aaProfilerHit(arguments.callee.name); }
 switch(event.type)
  {
  default:
  alert("et="+event.type);
  break;

  case "loadedmetadata":
  if((han=aa.guiIdFind(event.target.id))==0)  { aa.debugAlert(); }
  grp=aa.guiGroupGet(han);
  grp.vars.is_meta=true;
  break;

  case "loadstart":
  break;

  case "progress":
  break;

  case "ended":
  if((han=aa.guiIdFind(event.target.id))==0) { aa.debugAlert(); }
  grp=aa.guiGroupGet(han);
  grp.vars.is_ended=true;
  break;

  case "canplay":
  break;

  case "canplaythrough":
  if((han=aa.guiIdFind(event.target.id))==0) { aa.debugAlert(); }
  grp=aa.guiGroupGet(han);
  grp.vars.can_play=true;
  break;

  case "error":
  if((han=aa.guiIdFind(event.target.id))==0) { aa.debugAlert(); }
  grp=aa.guiGroupGet(han);
  grp.vars.is_failed=true;
  alert("error "+grp.dom.error.code);
  break;
  }
 if((han=aa.guiIdFind(event.target.id))>0)
  {
  if((grp=aa.guiGroupGet(han))!=null) { grp.vars.last_event=event.type;   }
  }
 return true;
 }




 function videoLoad (handle,url)
 {
 var grp;
 //if(profile_group_video) { aaProfilerHit(arguments.callee.name); }
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 grp.vars.can_play=false;
 grp.vars.is_meta=false;
 grp.vars.is_failed=false;
 grp.vars.is_ended=false;
 grp.vars.is_playing=false;
 grp.vars.is_paused=false;
 grp.vars.last_event="";
 grp.vars.url=url;
 grp.vars.udata=0;
 grp.vars.vdata=0;
 grp.vars.frame_number=0;
 grp.vars.prev_time=-1;
 grp.dom.load();
 grp.dom.src=grp.vars.url;
 grp.dom.loop=false;
 if(0) { grp.dom.muted=false;  grp.dom.volume=0.0; }
 else  { grp.dom.muted=true;   grp.dom.volume=0.0; }
 grp.dom.setAttribute('playsinline','playsinline');
 grp.dom.setAttribute('webkit-playsinline','webkit-playsinline');
 //grp.dom.setAttribute('autoplay','');
 //grp.dom.autoplay=true;
 grp.dom.autoplay=false;
 grp.dom.controls=true;
 grp.dom.defaulMuted=false;
 grp.dom.muted=false;
 grp.dom.volume=0.5;

 grp.dom.defaultPlaybackRate=1.0;
 grp.dom.playbackRate=1.0;
 grp.dom.addEventListener('loadedmetadata',videoLoadEvent);
 grp.dom.addEventListener('loadstart',videoLoadEvent);
 grp.dom.addEventListener('progress',videoLoadEvent);
 grp.dom.addEventListener('canplay',videoLoadEvent);
 grp.dom.addEventListener('canplaythrough',videoLoadEvent);
 grp.dom.addEventListener('ended',videoLoadEvent);
 grp.dom.addEventListener('error',videoLoadEvent);
 return true;
 }





 function videoFree (handle)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 //grp.dom.pause();
 //grp.dom.load();
 grp.dom.src="";
 //grp.vars.is_paused=false;
 grp.dom.removeEventListener('loadstart',videoLoadEvent);
 grp.dom.removeEventListener('progress',videoLoadEvent);
 grp.dom.removeEventListener('canplay',videoLoadEvent);
 grp.dom.removeEventListener('canplaythrough',videoLoadEvent);
 grp.dom.removeEventListener('ended',videoLoadEvent);
 grp.dom.removeEventListener('error',videoLoadEvent);
 delete grp.vars.can_play;
 delete grp.vars.is_failed;
 delete grp.vars.is_ended;
 delete grp.vars.is_playing;
 delete grp.vars.is_paused;
 delete grp.vars.url;
 delete grp.vars.last_event;
 return true;
 }




 function videoStatus (handle)
 {
 var grp,status,cc,vl,bi;
 if((grp=aa.guiGroupGet(handle))==null) { return null; }
 grp.vars.is_playing=grp.dom.currentTime>0&&!grp.dom.paused&&!grp.dom.ended&&grp.dom.readyState>2;
 status={};
 //aa.debugLog(grp.dom.readyState);
 //aa.debugLog(grp.vars);
 status.ready_state=grp.dom.readyState;
 status.can_play=grp.vars.can_play;
 //alert(grp.vars.can_play);
 status.is_meta=grp.vars.is_meta;
 status.is_failed=grp.vars.is_failed;
 status.is_ended=grp.vars.is_ended;
 status.is_playing=grp.vars.is_playing;
 status.is_paused=grp.vars.is_paused;
 status.last_event=grp.vars.last_event;
 status.current_time=grp.dom.currentTime;
 status.duration=grp.dom.duration;
 status.play_rate=grp.dom.playbackRate;
 status.cook_code=0;
 cc=0;
 bi=11;
  vl=status.ready_state;    cc+=(vl<<bi); bi--;
  vl=status.can_play; cc+=(vl<<bi); bi--;
  vl=status.is_meta; cc+=(vl<<bi); bi--;
  vl=status.is_failed; cc+=(vl<<bi); bi--;
  vl=status.is_ended; cc+=(vl<<bi); bi--;
  vl=status.is_playing; cc+=(vl<<bi); bi--;
  vl=status.is_paused; cc+=(vl<<bi); bi--;
  vl=status.last_event; cc+=(vl<<bi); bi--;
  vl=status.duration; cc+=(vl<<bi); bi--;
  vl=status.play_rate; cc+=(vl<<bi); bi--;
//  vl=app.ui_group[5].dom.currentTime;
//  if(vl<1)   {   cc+=(vl<<bi);   bi--;   }
//  else       {   cc+=(vl<<bi);   bi--;   }
 status.cook_code=cc;
 return status;
 }




 function videoChange (handle,blob)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 videoPause(grp.han);
 grp.dom.src=URL.createObjectURL(blob);
 grp.dom.load();
 grp.vars.frame_number=0;
 grp.vars.prev_time=-1;
 grp.dom.currentTime=0;
 return true;
 }





 function videoPause (handle)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 grp.dom.pause();
 grp.vars.is_paused=true;
 return true;
 }



 function videoAuto (handle,state)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 if(state)
  {
  grp.dom.defaulMuted=true;
  grp.dom.muted=true;
  grp.dom.volume=0.0;
  grp.dom.autoplay=true;
  grp.dom.controls=false;
  }
 else
  {
  grp.dom.defaulMuted=false;
  grp.dom.muted=false;
  grp.dom.volume=0.3;
  grp.dom.autoplay=false;
  grp.dom.controls=true;
  }
 return true;
 }





 function videoPlay (handle)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 grp.dom.play()
 .then(()=>{ grp.vars.is_paused=false;  })
 .catch(function(error)
  {
  console.log(error);
  });

  /*

 try
  {
  grp.dom.play();
  grp.vars.is_paused=false;
  }
 catch(e)
  {
  console.log(e);
  }
  */
 return true;
 }


 function videoMute (handle,state)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 if(state) { grp.dom.muted=true;   grp.dom.volume=0.0; }
 else      { grp.dom.muted=false;  grp.dom.volume=0.5; }
 return true;
 }



 function videoSeek (handle,secs)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 grp.dom.currentTime=(secs).toFixed(1);
 ///aa.debugLog("seek = "+secs+"  "+grp.dom.currentTime);
 return true;
 }



 function videoRate (handle,rate)
 {
 var grp;
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 grp.dom.playbackRate=rate;
 return true;
 }




