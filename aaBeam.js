




 function beamNew (purpose,maxpeers,nick,room,url)
 {
 var beamobj,p;
 beamobj={};
 beamobj.type="beamobj";
 beamobj.purpose=purpose;
 beamobj.max_peers=maxpeers;
 beamobj.room=room;
 beamobj.nick=nick;
 beamobj.url=url;
 beamobj.stage=100;
 beamobj.is_ready=false;
 beamobj.is_full=false;
 beamobj.ms=aa_ms_running;
 beamobj.elapsed=0;
 beamobj.my_id=0;
 beamobj.my_alias="";
  beamobj.peer_count=0;
  beamobj.peer_count_connected=0;
 beamobj.peer_array=[];
 beamobj.peer_pf=0;
 beamobj.sock_handle=0;
 for(p=0;p<beamobj.max_peers;p++)  {  beamPeerInit(beamobj,p);  }
 beamobj.sock_handle=aa.socketCreate(beamobj.url);
 aa.handleCommentSet(beamobj.sock_handle,"beam socket");
 console.log("connect "+beamobj.url);
 console.log("room "+beamobj.room);
 console.log("nick "+beamobj.nick);
 return beamobj;
 }




 function beamDelete (beamobj)
 {
 var p,peerobj,grpc;

 if(beamobj==undefined) { return null; }
 if(beamobj.type!="beamobj") { return null; }
 console.log("PEER_COUNT="+beamobj.peer_count+"  PEER_COUNT_CONNECTED="+beamobj.peer_count_connected);
 for(p=0;p<beamobj.max_peers;p++)
  {
  peerobj=beamPeerByIndex(beamobj,p);
  if(peerobj.in_use!=true) { continue; }
  if(peerobj.id_dif!=0)   {   beamPeerUnuse(beamobj,peerobj.self_index);      }
  }
 grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0"));
 if(grpc!=null)
  {
  if(grpc.vars.rtc_handle!=0)
   {
   alert("is "+grpc.vars.rtc_handle);
   }
  }
 console.log("PEER_COUNT="+beamobj.peer_count+"  PEER_COUNT_CONNECTED="+beamobj.peer_count_connected);
  aa.socketDestroy(beamobj.sock_handle);
 beamobj.sock_handle=0;
 beamobj.peer_array=[];
 beamobj={};
 return beamobj;
 }




 function beamCountSet (beamobj,peercount,peerconnectedcount)
 {
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 beamobj.peer_count=peercount;
 beamobj.peer_count_connected=peerconnectedcount;
 //console.log("PEER_COUNT="+beamobj.peer_count+"  PEER_COUNT_CONNECTED="+beamobj.peer_count_connected);
 }






 function beamPeerInit (beamobj,peerindex)
 {
 var peerobj;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 peerobj={};
 peerobj.in_use=false;
 peerobj.type="peerobj";
 peerobj.self_index=peerindex;
 peerobj.phaze=0;
 peerobj.sent_final_ice=false
 peerobj.rvcd_final_ice=false;
 peerobj.rtc_handle=0;
 peerobj.r_queue_handle=0;
 peerobj.r_queue_status=null;
 peerobj.ms=0;
 peerobj.cycle=0;
 peerobj.id=0;
 peerobj.alias=null;
 peerobj.id_dif=null;
 beamobj.peer_array[peerindex]=peerobj;
 return peerobj;
 }




 function beamPeerNext (beamobj,brute)
 {
 var p,peerobj;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(brute==true)
  {
  for(p=0;p<beamobj.max_peers;p++)
   {
   beamobj.peer_pf++;
   beamobj.peer_pf%=beamobj.max_peers;
   peerobj=beamobj.peer_array[beamobj.peer_pf];
   if(peerobj==null)        { continue; }
   if(peerobj.in_use!=true) { continue; }
   if(peerobj.id_dif==0) { continue; }
   //console.log(peerobj.id_dif);
   return peerobj;
   }
  return null;
  }
 for(p=0;p<beamobj.max_peers;p++)
  {
  beamobj.peer_pf++;
  beamobj.peer_pf%=beamobj.max_peers;
  peerobj=beamobj.peer_array[beamobj.peer_pf];
  if(peerobj==null)        { break; }
  if(peerobj.in_use!=true) { break; }
  if(peerobj.id_dif==0) { continue; }
  return peerobj;
  }
 return null;
 }






 function beamPeerUnusedGet (beamobj)
 {
 var p,peerobj;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 for(p=0;p<beamobj.max_peers;p++)
  {
  peerobj=beamPeerByIndex(beamobj,p);
  if(peerobj.in_use!=false) { continue; }
  return peerobj;
  }
 return null;
 }









 function beamPeerUse (beamobj,peerindex,id,alias)
 {
 var peerobj;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(peerindex<0||peerindex>=beamobj.peer_array.length)  {  throw("cunt");  }
 peerobj=beamobj.peer_array[peerindex];
 if(peerobj.in_use!=false)  {  throw("peerinuse");  }
 peerobj.in_use=true;
 peerobj.type="peerobj";
 peerobj.self_index=peerindex;
 peerobj.phaze=0;
 peerobj.sent_final_ice=false
 peerobj.rvcd_final_ice=false;
 peerobj.rtc_handle=0;
 peerobj.r_queue_handle=aa.queueCreate();
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 aa.handleCommentSet(peerobj.r_queue_handle,"beam peer queue "+peerindex);
 peerobj.ms=aa.timerMsRunning();
 peerobj.cycle=0;
 peerobj.id=id;
 peerobj.alias=alias;
 peerobj.id_dif=(peerobj.id+"").localeCompare(beamobj.my_id+""); //!!!!!!!!!
 beamCountSet(beamobj,beamobj.peer_count+1,beamobj.peer_count_connected);
 if(id!=beamobj.my_id) {  console.log("peeruse "+id+" "+alias); }
 return peerobj;
 }





 function beamPeerUnuse (beamobj,peerindex)
 {
 var peerobj,rtc,grp,isplaying,grpo,idx;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(peerindex<0||peerindex>=beamobj.peer_array.length)  {  throw("cunt");  }
 peerobj=beamobj.peer_array[peerindex];
 if(peerobj.in_use!=true)  {  throw("peernotinuse");  }
 if(peerobj.phaze==200||peerobj.phaze==2000)
  {
  beamCountSet(beamobj,beamobj.peer_count,beamobj.peer_count_connected-1);
  }
 if(peerobj.r_queue_handle!=0)
  {
  aa.queueDestroy(peerobj.r_queue_handle);
  peerobj.r_queue_handle=0;
  }
 beamPeerVideoUnattach(beamobj,peerobj);
 beamPeerInit(beamobj,peerindex);
 beamCountSet(beamobj,beamobj.peer_count-1,beamobj.peer_count_connected);
 return peerobj;
 }







 function beamPeerByIndex (beamobj,peerindex)
 {
 var peerobj;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(peerindex>=beamobj.max_peers) { return null; }
 peerobj=beamobj.peer_array[peerindex];
 return peerobj;
 }







 function beamPeerById (beamobj,peerid)
 {
 var p,peerobj;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(peerid<=0) { aa.debugAlert(); }
 for(p=0;p<beamobj.max_peers;p++)
  {
  peerobj=beamobj.peer_array[p];
  if(peerobj.in_use!=true) { continue; }
  if(peerobj.id!=peerid)   { continue; }
  return peerobj;
  }
 return null;
 }






 function beamWrite (beamobj,how,id,ref,msg)
 {
 var peerobj,status,pkt;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(how!="say"&&how!="scream"&&how!="shout")  { return false; }

 //status=aa.socketStatus(beamobj.sock_handle);
 //if(status.is_open!=true) { return false; }
 if(how=="say")
  {
  peerobj=beamPeerById(beamobj,id);
  if(peerobj==null) { aa.debugAlert("beamwrite, no peer "+id); return false; }
  }
 if(how=="say")  {  pkt={"cmd":how,"target":id,"ref":ref,"msg":msg};  }
 else            {  pkt={"cmd":how,"ref":ref,"msg":msg};  }
 aa.socketWrite(beamobj.sock_handle,JSON.stringify(pkt));
 return true;
 }





 function beamRead (beamobj,id)
 {
 var status,peerobj,msg;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 peerobj=beamPeerById(beamobj,id);
 if(peerobj==null) { aa.debugAlert(); }
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 if(peerobj.r_queue_status==null) aa.debugAlert("beamread2 "+id);
 if(peerobj.r_queue_status.msgs_queued==0) {  return null;  }
 if((msg=aa.queueRead(peerobj.r_queue_handle))==null) aa.debugAlert("beamread3");
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 return msg;
 }







 function beamPeek (beamobj,id)
 {
 var status,peerobj,msg;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 peerobj=beamPeerById(beamobj,id);
 if(peerobj==null) { aa.debugAlert(); }
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 if(peerobj.r_queue_status==null) aa.debugAlert("beampeek2 "+id);
 if(peerobj.r_queue_status.msgs_queued==0) {  return null;  }
 if((msg=aa.queuePeek(peerobj.r_queue_handle,0))==null) aa.debugAlert("wsds3dwe00");
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 return msg;
 }








 function beamDiscard (beamobj,id)
 {
 var status,peerobj,msg;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 peerobj=beamPeerById(beamobj,id);
 if(peerobj==null) { aa.debugAlert(); }
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 if(peerobj.r_queue_status==null) aa.debugAlert("wxwew00");
 if(peerobj.r_queue_status.msgs_queued==0) { return true;  }
 if((msg=aa.queueRead(peerobj.r_queue_handle))==null) aa.debugAlert("xwxwxwx00");
 peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
 return true;
 }






 function beamPromiseBoss (beamobj,peerobj)
 {
 var res,rtc,status,val,ret;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 res={};
 res.rc=aa.retcode.RET_NOTREADY;
 res.val=null;
 if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { res.rc=aa.retcode.RET_NOTFOUND;   return res;  }
 status=aa.rtcStatus(peerobj.rtc_handle);
 if(status.in_promise!=true)   { res.rc=aa.retcode.RET_NOTSTARTED; return res;  }
 val=false;
 if(status.promise_status.state==PROMISE_completed)
  {
  val=status.promise_status.val;
  if((ret=aa.rtcPromiseClear(peerobj.rtc_handle))!=true) { aa.debugAlert(); }
  }
 else
 if(status.promise_status.state==PROMISE_rejected)
  {
  val=null;
  if((ret=aa.rtcPromiseClear(peerobj.rtc_handle))!=true) { aa.debugAlert(); }
  }
 if(val===null)            { res.rc=aa.retcode.RET_FAILED;     return res;  }
 if(val===false)           { res.rc=aa.retcode.RET_WORKING;    return res;  }
 res.rc=aa.retcode.RET_OK;
 res.val=val;
 return res;
 }







 function beamPromiseGod (beamobj,peerobj)
 {
 var rez;
 rez=beamPromiseBoss(beamobj,peerobj);
 if(rez.rc!=aa.retcode.RET_NOTSTARTED)
  {
  while(1)
   {
   if(rez.rc==aa.retcode.RET_WORKING)    { break; }
   if(rez.rc==aa.retcode.RET_NOTREADY)   { aa.debugAlert(); break; }
   if(rez.rc==aa.retcode.RET_NOTFOUND)   { aa.debugAlert(); break; }
   if(rez.rc==aa.retcode.RET_FAILED)     { aa.debugAlert(); break; }
   if(rez.rc!=aa.retcode.RET_OK)         { aa.debugAlert(); break; }
   //return rez;
   break;
   }
  //return rez;
  }
 return rez;
 }






 function beamHeroshimaWrite (beamobj)
 {
 var msg,ret;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(beamobj.is_ready!=true)   {  return false;  }
 msg={};
 msg.funcname="heroshima";
 if((ret=beamWrite(beamobj,"shout",beamobj.my_id,"ab4",JSON.stringify(msg)))!=true) { aa.debugAlert(ret); }
 return true;
 }





 function beamPeerVideoAttach (beamobj,peerobj)
 {
 var rtc,g,grp,grpo,grpc;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }

 if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
 g=peerobj.self_index;

 grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+g));
 if(grp==null)               { aa.debugAlert(); }
 if(grp.obj.type!="video")   { aa.debugAlert(); }
 if(grp.dom.srcObject!=null) { aa.debugAlert(); }
 if(grp.vars.rtc_handle!=0)  { aa.debugAlert(); }

 uixElementDisplay(grp.obj.id,true);

 if(g==0)
  {
  console.log("VIDEO ATTACH  "+g);
  grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_"+g));
  grpc.vars.rtc_handle=0;
  }
 grpo=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+g));
 uixElementDisplay(grpo.obj.id,true);

 if(g!=0)
  {
  grp.vars.rtc_handle=peerobj.rtc_handle;
  }
 grp.vars.peer_index=peerobj.self_index;
 rtc.vars.gui_id=grp.obj.id;
 grp.dom.srcObject=rtc.vars.rem_stream;
 if(cfg_peer_initially_muted==true)  {  grp.dom.muted=true;  grp.dom.volume=0;  }
 else                                {  grp.dom.muted=false;  grp.dom.volume=1;  }

 ///appLog("attached peer to video");
 grp.dom.play();
 }







 function beamPeerVideoUnattach (beamobj,peerobj)
 {
 var rtc,isplaying,grp,grpo,idx,g,pid,grpc;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }

 ///appLog("unattaching peer from video");
 pid=peerobj.id;
 if(peerobj.rtc_handle>0)
  {
  if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) aa.debugAlert();
  if(rtc.vars.gui_id!=null)
   {
   grp=aa.guiGroupGet(aa.guiIdFind(rtc.vars.gui_id));
   if(grp!=null)
    {
    ///console.log("CCC "+grp.obj.id);
    isplaying=grp.dom.currentTime>0&&!grp.dom.paused&&!grp.dom.ended&&grp.dom.readyState>2;
    grp.vars.rtc_handle=0;
    if(isplaying) {       grp.dom.pause();    }
    grp.dom.currentTime=0;
    grp.dom.srcObject=null;
    idx=rtc.vars.peer_index;

    grpo=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+idx));
    g=peerobj.self_index;
    grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+g));
    uixElementDisplay(grp.obj.id,false);
    grpo=aa.guiGroupGet(aa.guiIdFind("b_overlay_"+g));
    uixElementDisplay(grpo.obj.id,false);

    //console.log("VIDEO ATTACH  "+g);
    grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_"+g));
    if(grpc!=null)
     {
     ///console.log("B_CANSTREAM_"+g+"  force grpc.vars.rtc_handle=0").
     grpc.vars.rtc_handle=0;
     }

    }
   rtc.vars.gui_id=null;
   }
  ///console.log("video unattach "+pid+"  RTC DESTROY "+peerobj.rtc_handle);
  aa.rtcDestroy(peerobj.rtc_handle);
  peerobj.rtc_handle=0;
  }
 }












 function beamYield (beamobj)
 {
 var status,peerobj,p,i,ret,g,c,po;
 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(beamobj.type==undefined)   { return false; }
 status=aa.socketStatus(beamobj.sock_handle);
 if((status.is_closed==true||status.is_error==true)&&(1))  {  return false;  }

 switch(beamobj.stage)
  {
  case 100:
  pkt={"cmd":"join","room":beamobj.room,"alias":beamobj.nick,"fingerprint":app.self.envinfo.finger_print,"envinfo":app.self.env_string,"geoinfo":app.geo_string,"testcount":beamobj.max_peers};
  aa.socketWrite(beamobj.sock_handle,JSON.stringify(pkt));
  beamobj.stage=150;
  break;


  case 150:
  while(1)
   {
   if((pkt=aa.socketRead(beamobj.sock_handle))==null) { break; }
   jsn=JSON.parse(pkt);
   switch(jsn.cmd)
    {
    default:
    aa.debugAlert(" unknown cmd="+jsn.cmd);
    break;

    case "hi":
    beamobj.my_id=jsn.uuid;
    beamobj.my_alias=jsn.hancock;
    if(app.display_nick==null||app.display_nick=="")
     {
     app.display_nick="user-"+beamobj.my_id;
     if(aa.stringIndexOf(true,beamobj.my_alias," ",0)==-1)
      {
      app.display_nick=beamobj.my_alias;
      }
     }

    uixPaintAll(true);
    appLog("MY_ID="+beamobj.my_id+"  MY_ALIAS="+beamobj.my_alias);
    for(p=0;p<beamobj.max_peers;p++)
     {
     if((peerobj=beamPeerById(beamobj,jsn.uuid))!=null) { aa.debugAlert(); }
     peerobj=beamPeerUse(beamobj,p,jsn.uuid,jsn.hancock);
     break;
     }
    for(i=0;i<jsn.peerCount;i++)
     {
     if((peerobj=beamPeerById(beamobj,jsn.peerList[i].uuid))!=null) { continue; }
     if((peerobj=beamPeerUnusedGet(beamobj))==null)                 { aa.debugAlert(); }
     p=peerobj.self_index;
     peerobj=beamPeerUse(beamobj,p,jsn.peerList[i].uuid,jsn.peerList[i].hancock);
     }
    if(beamobj.peer_count>beamobj.max_peers)  // test before join loop
     {
     beamobj.is_full=true;
     beamobj.stage=66;
     return false;
     }
    beamobj.is_ready=true;
    beamobj.stage=200;
    break;


    case "full":
    ///appLog("got full");
    beamobj.is_full=true;
    beamobj.stage=66;
    break;
    }
   if(beamobj.stage!=150) { break; }
   }
  break;




  case 200:
  beamobj.elapsed=aa_ms_running-beamobj.ms;
  if((po=beamPeerNext(beamobj,true))!=null)  {   beamPeerYield(beamobj,po.self_index);    }
  //if((po=beamPeerNext(beamobj,false))!=null)  {   beamPeerYield(beamobj,po.self_index);    }
  //if((po=beamPeerNext(beamobj,false))!=null)  {   beamPeerYield(beamobj,po.self_index);    }
  //if((po=beamPeerNext(beamobj,false))!=null)  {   beamPeerYield(beamobj,po.self_index);    }
  while(1)
   {
   if((pkt=aa.socketRead(beamobj.sock_handle))==null) { break; }
   jsn=JSON.parse(pkt);
   switch(jsn.cmd)
    {
    default:
    aa.debugAlert("unknown cmd="+jsn.cmd);
    break;

    case "joined":
    if((peerobj=beamPeerById(beamobj,jsn.uuid))!=null) { aa.debugAlert(); }
    if(jsn.uuid==beamobj.my_id) { aa.debugAlert(); }
    if((peerobj=beamPeerUnusedGet(beamobj))==null)     { aa.debugAlert(); }
    p=peerobj.self_index;
    peerobj=beamPeerUse(beamobj,p,jsn.uuid,jsn.hancock);
    break;


    case "left":
    if((peerobj=beamPeerById(beamobj,jsn.uuid))==null) { console.log("left , peerbyId=null "+jsn.uuid); break; }
    ///appLog("peer self index leaving "+peerobj.self_index);
    beamPeerUnuse(beamobj,peerobj.self_index);
    break;

    case "screamed":
    case "shouted":
    case "said":
    msg=JSON.parse(jsn.msg);
    if(jsn.to_uuid!=beamobj.my_id)  { aa.debugAlert("to is not me "+jsn.to_uuid);  break; }
    if((peerobj=beamPeerById(beamobj,jsn.uuid))==null) { aa.debugAlert("from isnt a peer "+jsn.uuid); break; }
    if(msg.funcname=="heroshima")  {  aa.envReload(true,250+aa.numRand(350));    break;     }
    aa.queueWrite(peerobj.r_queue_handle,jsn);
    peerobj.r_queue_status=aa.queueStatus(peerobj.r_queue_handle);
    break;
    }
   if(beamobj.stage!=200) {  break; }
   }
  }
 return true;
 }








 function beamPeerYield (beamobj,peerindex)
 {
 var peerobj,rtc,grp,g,oix,grpo;
 var aibrate,aobrate;
 var vibrate,vobrate;
 var el,now,bytes,headerBytes,packets,bitrate,headerrate;
 var grpc,sbx,thing;

 if(1&&use_profiler==true&&mb_profile_group_beam) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(peerindex>=beamobj.max_peers) { return; }

 peerobj=beamobj.peer_array[peerindex];
 if(peerobj==null)        { return; }
 if(peerobj.in_use!=true) { return; }
 if(peerobj.is_leaving)     { aa.debugAlert();  return;  }
 if(beamobj.is_ready!=true) { aa.debugAlert(); }

 switch(peerobj.phaze)
  {
  case 0:
  peerobj.phaze=100;
  break;

  case 66:
  case 666:
  break;



                case 100: // creation of individual WebRtc connections
                if(peerobj.id_dif==0)
                 {
                 beamCountSet(beamobj,beamobj.peer_count,beamobj.peer_count_connected+1);
                 peerobj.phaze=200;
                 break;
                 }
                peerobj.rtc_handle=aa.rtcCreate({'iceServers':[{'urls':'stun:stun.l.google.com:19302'}]});
                console.log("peerobj rtc="+peerobj.self_index+" "+peerobj.rtc_handle);
                ///sbx="";
                ///sbx=tokTxt(sbx,"s",20,40,"creating webrtc connection, phaze="+peerobj.phaze+" pidx="+peerobj.self_index);
                ///console.log(sbx);
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                rtc.vars.peer_index=peerobj.self_index;
                if((grp=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
                rtc.vars.pc.addTrack(grp.vars.audio_processor.destination.stream.getAudioTracks()[0] , grp.vars.audio_processor.stream);
                rtc.vars.pc.addTrack(grp.vars.audio_processor.stream.getVideoTracks()[0] , grp.vars.audio_processor.stream);

                //grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+g));
                //grp.dom.setSinkId(aa.mediaDeviceGet("audiooutput",axo).deviceId);
                //grp.vars.rtc_handle=peerobj.rtc_handle;
                //grp.vars.peer_index=peerobj.self_index;
                if(peerobj.id_dif>0)  {    peerobj.phaze=400;    break;    }
                if(peerobj.id_dif<0)  {    peerobj.phaze=600;    break;    }
                break;








        case 200: // Peer connection to self
        pkt=beamPeek(beamobj,peerobj.id);
        if(pkt==null||pkt==false) { break; }
        msg=JSON.parse(pkt.msg);
        if(msg.funcname=="heroshima")
         {
         aa.debugLogger(60,"*** !!!got heroshima from "+pkt.uuid+"  "+pkt.hancock);
         beamDiscard(beamobj,peerobj.id);
         aa.envReload(true,250+aa.numRand(350));
         peerobj.phaze=666;
         break;
         }
        beamDiscard(beamobj,peerobj.id);
        break;






                case 400:
                ///appLog("creating offer, phaze="+peerobj.phaze);
                aa.rtcOfferCreate(peerobj.rtc_handle);
                peerobj.phaze=430;
                break;


                case 430:
                rez=beamPromiseGod(beamobj,peerobj);
                if(rez.rc!=aa.retcode.RET_NOTSTARTED)
                 {
                 if(rez.rc!=aa.retcode.RET_OK)  { break; }
                 if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                 rtc.vars.offer=rez.val;
                 peerobj.phaze=435;
                 ///appLog("offer created going to phaze "+peerobj.phaze);
                 }
                break;


                case 435:
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                if(1&&manip_sdp==true)  {  rtc.vars.offer.sdp=mediaSdpManipulate(rtc.vars.offer.sdp,sbool,arata,vrata);  }
                ///appLog("setting local with offer, phaze="+peerobj.phaze);
                aa.rtcDescLocalSet(peerobj.rtc_handle,rtc.vars.offer);
                peerobj.phaze=440;
                break;


                case 440:
                rez=beamPromiseGod(beamobj,peerobj);
                if(rez.rc!=aa.retcode.RET_OK)  { break; }
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                msg={};
                msg.funcname="offer";
                msg.desc=rtc.vars.offer;
                beamWrite(beamobj,"say",peerobj.id,"ab4",JSON.stringify(msg));
                peerobj.phaze=460;
                break;



                case 460:
                pkt=beamPeek(beamobj,peerobj.id);
                if(pkt==null||pkt==false) { break; }
                msg=JSON.parse(pkt.msg);
                if(msg.funcname!="answer")
                 {
                 console.log("phaze="+peerobj.phaze+" funcname wrong="+msg.funcname);
                 beamDiscard(beamobj,peerobj.id);
                 break;
                 }
                beamDiscard(beamobj,peerobj.id);
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                rtc.vars.answer=msg;
                peerobj.phaze=470;
                ///appLog("phaze = "+peerobj.phaze);
                break;



                case 470:
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                aa.rtcDescRemoteSet(peerobj.rtc_handle,rtc.vars.answer.desc);
                ///appLog("descremset, phaze = "+peerobj.phaze);
                peerobj.phaze=480;
                break;


                case 480:
                rez=beamPromiseGod(beamobj,peerobj);
                if(rez.rc!=aa.retcode.RET_OK)  { break; }
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                ///appLog("remset phaze = "+peerobj.phaze);
                peerobj.phaze=900;
                break;





           case 600: // We are accepting from this peer
           if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
           pkt=beamPeek(beamobj,peerobj.id)
           if(pkt==null||pkt==false) { break; }
           msg=JSON.parse(pkt.msg);
           if(msg.funcname!="offer")
            {
            console.log("phaze="+peerobj.phaze+" funcname wrong="+msg.funcname);
            beamDiscard(beamobj,peerobj.id);
            break;
            }
           beamDiscard(beamobj,peerobj.id);
           rtc.vars.offer=msg.desc;
           ///appLog("got offer from peer ,phaze="+peerobj.phaze);
           aa.rtcDescRemoteSet(peerobj.rtc_handle,rtc.vars.offer);
           peerobj.phaze=610;
           break;



           case 610:
           rez=beamPromiseGod(beamobj,peerobj);
           if(rez.rc==aa.retcode.RET_NOTSTARTED) { aa.debugAlert("phaze="+peerobj.phaze+" notstarted"); }
           if(rez.rc!=aa.retcode.RET_OK)  { break; }
           if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
           ///appLog("creating answer, phaze="+peerobj.phaze);
           aa.rtcAnswerCreate(peerobj.rtc_handle);
           peerobj.phaze=640;
           break;





           case 640:
           rez=beamPromiseGod(beamobj,peerobj);
           if(rez.rc!=aa.retcode.RET_OK)  { break; }
           if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
           rtc.vars.answer=rez.val;
           peerobj.phaze=645;
           break;




           case 645:
           if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
           if(1&&manip_sdp==true)  { rtc.vars.answer.sdp=mediaSdpManipulate(rtc.vars.answer.sdp,sbool,arata,vrata);      }
           ///appLog("setting local desc, with andwer , phaze="+peerobj.phaze);
           aa.rtcDescLocalSet(peerobj.rtc_handle,rtc.vars.answer);
           peerobj.phaze=647;
           break;



           case 647:
           rez=beamPromiseGod(beamobj,peerobj);
           if(rez.rc==aa.retcode.RET_NOTSTARTED) { aa.debugAlert("phaze="+peerobj.phaze+" notstarted"); }
           if(rez.rc!=aa.retcode.RET_OK)  { break; }
           if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
           ///appLog("got desclocal set, sending answer");
           msg={};
           msg.funcname="answer";
           msg.desc=rtc.vars.pc.localDescription;
           beamWrite(beamobj,"say",peerobj.id,"ab4",JSON.stringify(msg));
           peerobj.phaze=900;
           break;



           case 900:
           peerobj.phaze=1000;
           break;






                 case 1000: // Exchange ice
                 rez=beamPromiseGod(beamobj,peerobj);
                 //if(rez.rc==aa.retcode.RET_NOTSTARTED) { aa.debugAlert("phaze="+peerobj.phaze+" notstarted"); }
                 //console.log(rez.rc);
                 if(rez.rc!=aa.retcode.RET_NOTSTARTED)
                  {
                  if(rez.rc!=aa.retcode.RET_OK)  { break; }
                  }
                 if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                 ///appLog("exchanging ice");
                 status=aa.rtcStatus(peerobj.rtc_handle);
                 while(1)
                  {
                  pkt=beamPeek(beamobj,peerobj.id)
                  if(pkt==null||pkt==false) { break; }
                  msg=JSON.parse(pkt.msg);
                  if(msg.funcname=="ice")
                   {
                   xxx={candidate:msg.ice};
                   if(msg.ice) { aa.rtcIceCandidateAdd(peerobj.rtc_handle,xxx);    }
                   else        { aa.rtcIceCandidateAdd(peerobj.rtc_handle,".");  peerobj.rcvd_final_ice=true; }
                   beamDiscard(beamobj,peerobj.id);
                   status=aa.rtcStatus(peerobj.rtc_handle);
                   break;
                   }
                  beamDiscard(beamobj,peerobj.id);
                  status=aa.rtcStatus(peerobj.rtc_handle);
                  break;
                  }
                 if((ice=aa.rtcIceCandidateGet(peerobj.rtc_handle))!=null)
                  {
                  msg={};
                  msg.funcname="ice";
                  if(ice==".") { msg.ice="";  peerobj.sent_final_ice=true; }
                  else         { msg.ice=ice; }
                  beamWrite(beamobj,"say",peerobj.id,"ab4",JSON.stringify(msg));
                  break;
                  }
                 if(peerobj.phaze!=1000) { break; }
                 if(peerobj.sent_final_ice!=true) { break; }
                 if(peerobj.rcvd_final_ice!=true) { break; }
                 ///appLog("sent and rcvd final ice, phaze="+peerobj.phaze);
                 peerobj.phaze=1200;
                 break;





                case 1200: // wait for remote stream
                if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }
                status=aa.rtcStatus(peerobj.rtc_handle);
                if(rtc.vars.gui_id==null&&rtc.vars.rem_stream!=null) { peerobj.phaze=1300;  break;   }
                if(rtc.vars.gui_id!=null) { console.log("guiid !=null = "+rtc.vars.gui_id);  break;     }
                break;







                            case 1300: // attach to unused video element
                            beamPeerVideoAttach(beamobj,peerobj);
                            //console.log("attach = "+peerobj.self_index);
                            //console.log(aa.mediaDeviceCountGet("audiooutput"));
                            //console.log(app.media.cur_axo);
                            grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+peerobj.self_index));
                            //console.log(aa.mediaDeviceGet("audiooutput",app.media.cur_oxi));
                            if(aa.mediaDeviceCountGet("audiooutput")>app.media.cur_axo)
                             {
                             grp.dom.setSinkId(aa.mediaDeviceGet("audiooutput",app.media.cur_axo).deviceId);
                             }
                            beamCountSet(beamobj,beamobj.peer_count,beamobj.peer_count_connected+1);
                            appLog("established ");
                            peerobj.phaze=2000;
                            break;






                     case 2000:  // established
                     rez=beamPromiseGod(beamobj,peerobj);
                     if(rez.rc!=aa.retcode.RET_OK)  { break; }
                     if((rtc=aa.rtcGet(peerobj.rtc_handle))==null) { aa.debugAlert("rtcget"); }

                     while(1)
                      {
                      pkt=beamPeek(beamobj,peerobj.id)
                      if(pkt==null||pkt==false) { break; }
                      msg=JSON.parse(pkt.msg);
                      beamDiscard(beamobj,peerobj.id);
                      status=aa.rtcStatus(peerobj.rtc_handle);
                      }

                     peerobj.cycle++;
                     break;
  }
 }





