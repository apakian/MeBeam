


 function mediaFxBrighten (wid,hit,level,capframe)
 {
 var xx,yy,r,g,b,a,i;
 if(level==1) { return; }
 for(yy=0;yy<hit;yy++)
  {
  for(xx=0;xx<wid;xx++)
   {
   i=(yy*wid)+xx;
   r=capframe.data[i*4+0]; g=capframe.data[i*4+1];  b=capframe.data[i*4+2];  a=capframe.data[i*4+3];
   r=parseInt(r*level);
   g=parseInt(g*level);
   b=parseInt(b*level);
   capframe.data[i*4+0]=r; capframe.data[i*4+1]=g;  capframe.data[i*4+2]=b;  capframe.data[i*4+3]=a;
   }
  }
 return;
 }





 function mediaFxCensor (wid,hit,divparm,capframe)
 {
 var xx,yy,ii,jj,r,g,b,a,i,o,rt,gt,bt,dv,cy,mul;
 if(divparm<2) { return; }
 dv=divparm;
 for(yy=0;yy<hit;yy+=dv)
  {
  for(xx=0;xx<wid;xx+=dv)
   {
   rt=gt=bt=0;
   for(ii=0;ii<dv;ii++)
    {
    for(jj=0;jj<dv;jj++)
     {
     o=((yy+ii)*wid)+xx+jj;
     r=capframe.data[o*4+0];
     g=capframe.data[o*4+1];
     b=capframe.data[o*4+2];
     rt+=r;
     gt+=g;
     bt+=b;
     }
    }
   rt=parseInt(rt/(dv*dv));
   gt=parseInt(gt/(dv*dv));
   bt=parseInt(bt/(dv*dv));
   for(ii=0;ii<dv;ii++)
    {
    for(jj=0;jj<dv;jj++)
     {
     o=((yy+ii)*wid)+xx+jj;
     capframe.data[o*4+0]=rt;
     capframe.data[o*4+1]=gt;
     capframe.data[o*4+2]=bt;
     }
    }
   }
  }
 return;
 }





 function mediaFxFlashing (wid,hit,what,mul,capframe)
 {
 var xx,yy,r,g,b,a,i;
 for(yy=0;yy<hit;yy++)
  {
  for(xx=0;xx<wid;xx++)
   {
   i=(yy*wid)+xx;
   r=capframe.data[i*4+0];
   g=capframe.data[i*4+1];
   b=capframe.data[i*4+2];
   a=capframe.data[i*4+3];
   if(what==0) { r=r*mul; }   else
   if(what==1) { g=g*mul; }   else
   if(what==2) { b=b*mul; }   else
   if(what==3) { r=r*mul; g=g*mul; }    else
   if(what==4) { g=g*mul; b=b*mul; }    else
   if(what==5) { b=b*mul; r=r*mul;}
   capframe.data[i*4+0]=r;
   capframe.data[i*4+1]=g;
   capframe.data[i*4+2]=b;
   capframe.data[i*4+3]=a;
   }
  }
 return;
 }













 function mediaLocalGainMuteSet (gainval,muteval)
 {
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 app.media.cur_local_gain=gainval;
 app.media.cur_local_mute=muteval;
 }






 function mediaStart ()
 {
 var io,tf,mat,key,val;

 app.media.is_started=true;
 app.media.cur_axi=0;  // current mic
 app.media.cur_vxi=0;  // current cam
 app.media.cur_axo=0;  // current speakers

 app.media.cur_vfxi=0; // current vid fx
 app.media.cur_afxi=0; // current aud fx
 app.media.cur_arxi=0; // current AR fx

 app.media.ever_ar_stage=0;

 app.media.is_swapping=false;
 app.media.cam_swap_stage=0;
 app.media.mic_swap_stage=0;
 app.media.cam_swap_axi=0;
 app.media.cam_swap_vxi=0;


 //mediaStoreLastDevice();
 mediaLocalGainMuteSet(0.0,true);
 }






 function mediaReadLastDevice ()
 {
 var key,val,kind,v,lab;

// return;

 key="last_mic";
 val=aa.storageRead(app.db,key);
 kind="audioinput";
 for(v=0;v<aa.mediaDeviceCountGet(kind);v++)
  {
  lab=aa.mediaDeviceGet(kind,v).label;
  lab=mediaLabelClean(lab);
  if(lab==val)   { app.media.cur_axi=v;  break;   }
  }

 key="last_vid";
 val=aa.storageRead(app.db,key);
 //console.log("last vid ="+val);
 kind="videoinput";
 for(v=0;v<aa.mediaDeviceCountGet(kind);v++)
  {
  lab=aa.mediaDeviceGet(kind,v).label;
  lab=mediaLabelClean(lab);
  //console.log(v+"  "+lab);
  if(lab==val)   {  app.media.cur_vxi=v;  break;   }
  }


 key="last_spk";
 val=aa.storageRead(app.db,key);
 kind="audiooutput";
 app.media.cur_axo=0;
 if(aa.mediaDeviceCountGet(kind)>0)
  {
  for(v=0;v<aa.mediaDeviceCountGet(kind);v++)
   {
   lab=aa.mediaDeviceGet(kind,v).label;
   lab=mediaLabelClean(lab);
   if(lab==val)   {   app.media.cur_axo=v;  break;   }
   }
  }


 ///console.log(key+"="+val);
 }



 function mediaStoreLastDevice ()
 {
 var kind,key,val;

 //return;

// console.log(app.media.cur_axi+"  "+app.media.cur_vxi+" "+app.media.cur_axo);
 //console.log(aa.main_state.stage);
 kind="videoinput";
 key="last_vid";
 val=aa.mediaDeviceGet(kind,app.media.cur_vxi).label;
 val=mediaLabelClean(val);
 aa.storageWrite(app.db,key,val);

 kind="audioinput";
 key="last_mic";
 val=aa.mediaDeviceGet(kind,app.media.cur_axi).label;
 val=mediaLabelClean(val);
 aa.storageWrite(app.db,key,val);


 kind="audiooutput";
 key="last_spk";
 if(aa.mediaDeviceCountGet(kind)>0)
  {
  val=aa.mediaDeviceGet(kind,app.media.cur_axo).label;
  val=mediaLabelClean(val);
  aa.storageWrite(app.db,key,val);
  }


 }





 function mediaMicSwap (axi)
 {
 var pxi;
 if(app.media.is_swapping!=false) { aa.debugAlert(); return false; }
 if(axi==null) { return false; }
 pxi=app.media.cur_axi;
 app.media.is_swapping=true;
 app.media.mic_swap_stage=1;
 app.media.mic_swap_axi=axi;
 appLog("MicSwap from "+pxi+" to "+axi);
 return true;
 }





 function mediaCamSwap (vxi)
 {
 var pxi;
 if(app.media.is_swapping!=false) { aa.debugAlert(); return false; }
 if(vxi==null) { return false; }
 pxi=app.media.cur_vxi;
 app.media.is_swapping=true;
 app.media.cam_swap_stage=1;
 app.media.cam_swap_vxi=vxi;
 appLog("CamSwap from "+pxi+" to "+vxi);
 return true;
 }




 function mediaSwapYield ()
 {
 if(app.media.is_swapping!=true) { return; }
 mediaSwapMicYield();
 mediaSwapCamYield();
 }








 function mediaSwapMicYield ()
 {
 var obj,ret,mob,grp,stream,rtc,status,grpc,vstream,astream,cstream,grpv;
 switch(app.media.mic_swap_stage)
  {
  case 0:
  return;

  case 1:
  app.media.cur_axi=app.media.mic_swap_axi;
  app.media.cur_axi%=aa.mediaDeviceCountGet("audioinput");
  app.media_handle2=mediaPairCreate(app.media.cur_axi,app.media.cur_vxi);
  app.media.mic_swap_stage=2;
  appLog("swapMicYield going to stage "+app.media.mic_swap_stage);
  return;


  case 2:
  status=aa.mediaStatus(app.media_handle2);
  obj=aa.mediaGet(app.media_handle2);
  if(obj.res==null) { return; }
  if(obj.res=="ok")
   {
   if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
   if(grpc.vars.rtc_handle!=0)
    {
    appLog("campaircreated rtc_handle="+grpc.vars.rtc_handle);
    if((rtc=aa.rtcGet(grpc.vars.rtc_handle))==null) { aa.debugAlert("rtcget "+grpc.vars.rtc_handle); }
    }
   appLog("unattaching app.media_handle, and destroying");
   aa.mediaAttach(app.media_handle,null);
   aa.mediaDestroy(app.media_handle);
   appLog("attaching media_handle2 to b_video_0");
   ret=aa.mediaAttach(app.media_handle2,aa.guiGroupGet(aa.guiIdFind("b_video_0")).han);
   app.media_handle=app.media_handle2;
   app.media_handle2=0;

   if((obj=aa.mediaGet(app.media_handle))===null) { aa.debugAlert(); }
   if((grpv=aa.guiGroupGet(aa.guiIdFind("b_video_0")))==null) { aa.debugAlert(); }
   grpv.vars.prev_time=0;
   grpv.vars.frame_number=0;
   grpv.vars.fps=0;
   swapKing();
   uixPaintAll(true);
   appLog("swap mic yield OK !!");
   app.media.mic_swap_stage=0;

   mediaStoreLastDevice();
   app.media.is_swapping=false;
   }
  else
  if(obj.res=="err")   {   aa.debugAlert(obj.res);   }
  return;
  }
 }







 function mediaSwapCamYield ()
 {
 var obj,ret,mob,grp,stream,rtc,status,grpc,vstream,astream,cstream,grpv;
 switch(app.media.cam_swap_stage)
  {
  case 0:
  return;

  case 1:
  app.media.cur_vxi=app.media.cam_swap_vxi;
  app.media.cur_vxi%=aa.mediaDeviceCountGet("videoinput");
  app.media_handle2=mediaPairCreate(app.media.cur_axi,app.media.cur_vxi);
  app.media.cam_swap_stage=2;
  appLog("swapCamYield going to stage "+app.media.cam_swap_stage);
  return;

  case 2:
  status=aa.mediaStatus(app.media_handle2);
  obj=aa.mediaGet(app.media_handle2);
  if(obj.res==null) { return; }
  if(obj.res=="ok")
   {
   if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
   if(grpc.vars.rtc_handle!=0)  {  if((rtc=aa.rtcGet(grpc.vars.rtc_handle))==null) { aa.debugAlert("rtcget"); }    }

   aa.mediaAttach(app.media_handle,null);
   aa.mediaDestroy(app.media_handle);
   if((ret=aa.mediaAttach(app.media_handle2,aa.guiGroupGet(aa.guiIdFind("b_video_0")).han))!=true) { aa.debugAlert("media attach  ="+ret); }
   app.media_handle=app.media_handle2;
   app.media_handle2=0;
   if((obj=aa.mediaGet(app.media_handle))===null) { aa.debugAlert(); }
   if((grpv=aa.guiGroupGet(aa.guiIdFind("b_video_0")))==null) { aa.debugAlert(); }
   grpv.vars.prev_time=0;
   grpv.vars.frame_number=0;
   grpv.vars.fps=0;
   swapKing();
   uixPaintAll(true);
   appLog("swap CAM yield OK !@!");
   app.media.cam_swap_stage=0;
   mediaStoreLastDevice();
   app.media.is_swapping=false;
   }
  else
  if(obj.res=="err")   {   aa.debugAlert(obj.res);   }
  return;
  }
 }





 function mediaDump ()
 {
 var v,vx,a,ax,o,ox,kind,lab;
 kind="videoinput";
 vx=aa.mediaDeviceCountGet(kind);
 for(v=0;v<vx;v++)
  {
  //alert(aa.mediaDeviceGet(kind,v).deviceId);
  label=aa.mediaDeviceGet(kind,v).label;
  console.log("vid "+v+"/"+vx+" "+mediaLabelClean(label));
  }
 kind="audioinput";
 ax=aa.mediaDeviceCountGet(kind);
 for(a=0;a<ax;a++)
  {
  ///alert(aa.mediaDeviceGet(kind,a).deviceId);
  label=aa.mediaDeviceGet(kind,a).label;
  console.log("aud "+a+"/"+ax+" "+mediaLabelClean(label));
  }
 kind="audiooutput";
 ox=aa.mediaDeviceCountGet(kind);
 for(o=0;o<ox;o++)
  {
  label=aa.mediaDeviceGet(kind,o).label;
  console.log("out "+o+"/"+ox+" "+mediaLabelClean(label));
  }
 }



 function labelZap (str,mat,into,todo)
 {
 var matlen,off;
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 //alert("lain");
 while(1)
  {
  matlen=mat.length;
  off=aa.stringIndexOf(false,str,mat,0);
  if(off<0) { break;  }
  if(into>=0) { off+=into; matlen-=into; }
  if(todo>=0) { matlen=todo; }
  str=str.substring(0,off)+str.substring(off+matlen);
  }
  //alert("laout");
 return str;
 }





 function mediaLabelClean (txt)
 {
 var ret,ix,str,len,c0,c1,c2,ok,off,mat,matlen;
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 str=txt;
 len=str.length;
 if(1&&len>11)
  {
  c0=str[len-11];  c1=str[len-6];  c2=str[len-1];
  if(c0=="("&&c1==":"&&c2==")")
   {
   ok=true;
   for(c=(len-10);c<len-2;c++)
    {
    if(ok>='0'&&ok<='9') { continue; }
    if(ok>='a'&&ok<='f') { continue; }
    ok=false;
    break;
    }
   if(ok==true)  { str=str.substring(0,len-12);  len=str.length;   }
   }
  }
 if(1)
  {
  str=labelZap(str," - ",0,2);
  str=labelZap(str,"-");
  str=labelZap(str,"(r)");
  str=labelZap(str,"(");
  str=labelZap(str,")");
  str=labelZap(str,"Default ",3,4);
  str=labelZap(str," SPEAKER ",3,2);
  str=labelZap(str," SPKER ",4,1);
  str=labelZap(str,"Speakers ",2,2);
  str=labelZap(str,"Spkers ",3,1);
  str=labelZap(str,"Bluetooth",1,3);
  str=labelZap(str,"Microphone ",3,7);
  str=labelZap(str,"Communications",4,9);
  str=labelZap(str,"Camera",3,3);
  str=labelZap(str,"Webcam",0,3);
  //str=labelZap(str,"Bluetooth",3,1);
  }
 return str;
 }





 function mediaPairCreate (axi,vxi)
 {
 var ax,vx,ox,han,wid,hit,dsz;//,afps,bfps;
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 if(axi) { ax=axi; } else ax=0;
 if(vxi) { vx=vxi; } else vx=0;
 ax%=aa.mediaDeviceCountGet("audioinput");
 vx%=aa.mediaDeviceCountGet("videoinput");
 app.media.cur_axi=ax;
 app.media.cur_vxi=vx;
 dsz=uixDispSizes();
 wid=dsz[7];
 hit=dsz[8];
 //wid=99999;
 han=aa.mediaCreate(
//  {deviceId:{exact:aa.mediaDeviceGet("videoinput",vx).deviceId},width:{min:wid,ideal:wid,max:wid},height:{min:hit,ideal:hit,max:hit},frameRate:{ideal:afps,max:bfps}  },
  {deviceId:{exact:aa.mediaDeviceGet("videoinput",vx).deviceId},width:{min:wid,ideal:wid,max:wid},height:{min:hit,ideal:hit,max:hit},frameRate:{ideal:v_fps}  },
  {deviceId:{exact:aa.mediaDeviceGet("audioinput",ax).deviceId},channelCount:1,sampleRate:{min:16000,ideal:48000,max:48000},
   latency:0,
   echoCancellation:x_aec,noiseSuppression:x_nsu,autoGainControl:x_agc,
   googEchoCancellation:x_aec,googNoiseSuppression:x_nsu,googAutoGainControl:x_agc
  });
 aa.handleCommentSet(han,"media pair create");
 console.log("media create "+han);
 return han;
 }










 function mediaChangeSinks (axo)
 {
 var g,grp;
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 axo%=aa.mediaDeviceCountGet("audiooutput");
 for(g=0;g<max_peers;g++)
  {
  if(g==0) { continue; }
  grp=aa.guiGroupGet(aa.guiIdFind("b_video_"+g));
  if(grp==null)             { continue; }
  if(grp.obj.type!="video") { continue; }
  if(grp.dom.videoWidth==0) { continue; }
  grp.dom.setSinkId(aa.mediaDeviceGet("audiooutput",axo).deviceId);
  }
 app.media.cur_axo=axo;  // current speakers
 ///mediaStoreLastDevice();
 //mediaChangeSinks(app.media.cur_oxi);
 ///unee uixNeeds(true,true);
 }





 function mediaSdpFix (sdp)
 {
 var lines,newlines,curline,li,off,stage,ostage,parts,pi,val,which,temp,codes,c;
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 temp="";
 lines=sdp.split("\r\n");
 newlines="";
 stage=0;
 ostage=0;
 li=0;
 while(1)
  {
  if(li>=lines.length) { break; }
  ostage=stage;
  switch(stage)
   {
   case 0:
   if(aa.stringIndexOf(true,lines[li],"m=")===0) {  stage=100; break; }
   newlines+=lines[li]+"\r\n";
   li++;
   break;

   case 100:
   if(aa.stringIndexOf(true,lines[li],"m=application")===0) {  stage=200; break; }
   if(aa.stringIndexOf(true,lines[li],"m=audio")===0)       {  stage=400; break; }
   if(aa.stringIndexOf(true,lines[li],"m=video")===0)       {  stage=600; break; }
   li++;
   stage=0;
   break;

   case 200:
   newlines+=lines[li]+"\r\n";
   li++;
   stage=220;
   break;

   case 220:
   if(aa.stringIndexOf(true,lines[li],"m=")===0) {  stage=100; break; }
   newlines+=lines[li]+"\r\n";
   li++;
   break;

   case 400:
   newlines+=lines[li]+"\r\n";
   li++;
   stage=420;
   break;

   case 420:
   if(aa.stringIndexOf(true,lines[li],"m=")===0) {  stage=100; break; }
   newlines+=lines[li]+"\r\n";
   li++;
   break;

   case 600:
   curline="";
   codes=[];
   parts=lines[li].split(" ");
   for(pi=0;pi<parts.length;pi++)
    {
    if(pi<3) { curline+=parts[pi]+" "; continue; }
    val=parseInt(parts[pi]);
    if(val==96||val==97) { continue; }
    codes.push(val);
    }
   curline+="96 97 ";
   for(c=0;c<codes.length;c++)
    {
    val=codes[c];
    curline+=val+" ";
    }
   curline=aa.stringLastCharTrim(curline);
   newlines+=curline+"\r\n";
   li++;
   stage=620;
   break;

   case 620:
   if(aa.stringIndexOf(true,lines[li],"m=")===0) {  stage=100; break; }
   newlines+=lines[li]+"\r\n";
   li++;
   break;
   }
  }
 newlines=aa.stringLastCharTrim(newlines);
 newlines=aa.stringLastCharTrim(newlines);
 return newlines;
 }






 function mediaSdpBitRateSet                (sdp,media,bitrate)
 {
 var line,lines,i,newLines;
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 lines=sdp.split("\r\n");
 line=-1;
 for(i=0;i<lines.length;i++)
  {
  if(lines[i].indexOf("m="+media)===0) {  line=i;   break;   }
  }
 if(line===-1)  { return sdp;  }
 line++;
 while(lines[line].indexOf("i=")===0||lines[line].indexOf("c=")===0) { line++;  }
 if(lines[line].indexOf("b")===0)
  {
  lines[line]="b=AS:"+bitrate;
  return lines.join("\r\n");
  }
 newLines=lines.slice(0, line)
 newLines.push("b=AS:"+bitrate)
 newLines=newLines.concat(lines.slice(line, lines.length))
 return newLines.join("\r\n")
 }






 function mediaSdpManipulate (sdp,fix,arate,vrate)
 {
 if(fix===true)  {  sdp=mediaSdpFix(sdp);  }
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 if(arate>0)     {  sdp=mediaSdpBitRateSet(sdp,"audio",arate); }
 if(vrate>0)     {  sdp=mediaSdpBitRateSet(sdp,"video",vrate); }
 return sdp;
 }




 function mediaCombineStreams (astream,vstream)
 {
 var stream,tr=[];
 if(1&&use_profiler==true&&mb_profile_group_media) {  aaProfilerHit(arguments.callee.name); }
 tr=tr.concat(astream);
 tr=tr.concat(vstream);
 stream=new MediaStream(tr);
 return stream;
 }






/*-----------------------------------------------------------------------*/





 function kingNew ()
 {
 var obj,grpc;

 if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
 obj={};
 obj.cap_stream=grpc.dom.captureStream(v_fps);
 obj.vid_tracks=obj.cap_stream.getVideoTracks()[0];
 obj.med_object=aa.mediaGet(app.media_handle);
 obj.aud_stream=obj.med_object.a_stream;
 obj.new_stream=mediaCombineStreams(obj.aud_stream,obj.vid_tracks);
 grpc.vars.audio_processor=audioProcessorStart(grpc.obj.id,obj.new_stream);
 return obj;
 }









 function makeKing ()
 {
 var cap_stream,vid_tracks;
 var med_object,aud_stream;
 var new_stream,grpc,tr;
 if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
 appLog("MakeKing()");
 cap_stream=grpc.dom.captureStream(v_fps);
 vid_tracks=cap_stream.getVideoTracks()[0];
 ///console.log("vid_tracks",vid_tracks);
 med_object=aa.mediaGet(app.media_handle);
 aud_stream=med_object.a_stream;
 new_stream=mediaCombineStreams(aud_stream,vid_tracks);
 grpc.vars.audio_processor=audioProcessorStart(grpc.obj.id,new_stream);
 app.aud_pro=grpc.vars.audio_processor;
 }




 function swapKing ()
 {
 var cap_stream,vid_tracks;
 var med_object,aud_stream;
 var new_stream,grpc,tr;
 if((grpc=aa.guiGroupGet(aa.guiIdFind("b_canstream_0")))==null) { aa.debugAlert(); }
 appLog("SwapKing()");
 cap_stream=grpc.dom.captureStream(v_fps);
 vid_tracks=cap_stream.getVideoTracks()[0];
 //console.log("vid_tracks",vid_tracks);
 med_object=aa.mediaGet(app.media_handle);
 aud_stream=med_object.a_stream;
 new_stream=mediaCombineStreams(aud_stream,vid_tracks);
 grpc.vars.audio_processor.microphone.disconnect();
 grpc.vars.audio_processor.microphone=grpc.vars.audio_processor.context.createMediaStreamSource(new_stream);//micstream);
 grpc.vars.audio_processor.microphone.connect(grpc.vars.audio_processor.analyser);
 grpc.vars.audio_processor.stream=new_stream;
 }











 function audioProcessorStart (id,newlycreatedstream)
 {
 var obj,settings,sss;

 obj={};
 obj.id=id;

 obj.context=new AudioContext();
 if(app.media.cur_local_mute==true) {  obj.gain=0.0;  }
 else                               {  obj.gain=app.media.cur_local_gain; }

 sss=newlycreatedstream.getAudioTracks()[0];
 obj.rate=sss.getSettings().sampleRate;

   obj.microphone=obj.context.createMediaStreamSource(newlycreatedstream);//micstream);
  obj.destination=obj.context.createMediaStreamDestination();
     obj.scripter=obj.context.createScriptProcessor(cfg_audio_script_processor_size,1,1);
     obj.scripter.onaudioprocess=function(event) { audioProcessorProc(obj,event);  }

 obj.analyser_cycle=0;
 obj.analyser_level=0;

 obj.analyser=obj.context.createAnalyser();
 obj.analyser.fftSize=cfg_audio_fft_size;
 obj.analyser.smoothingTimeConstant=0.3;
 obj.analyser.maxDecibels=cfg_audio_max_db;
 obj.analyser.minDecibels=cfg_audio_min_db;

          obj.db_range=obj.analyser.maxDecibels-obj.analyser.minDecibels;
   obj.freq_buffer_len=obj.analyser.frequencyBinCount;
 obj.freq_float_buffer=new Float32Array(obj.freq_buffer_len);
        obj.freq_range=obj.rate/2.0;
        obj.band_count=obj.freq_buffer_len;
        obj.band_hertz=obj.freq_range/obj.band_count;


 obj.microphone.connect(obj.analyser);
 obj.analyser.connect(obj.scripter);
 obj.scripter.connect(obj.destination);

 //audioConnectNodes(obj);
 //console.log("RATE="+obj.rate+" range="+obj.freq_range+"  bandcount="+obj.band_count+"  bandhz="+obj.band_hertz);
 //uixHudLog(10,4,"RATE="+obj.rate);
 appLog("RATE="+obj.rate);

 obj.stream=newlycreatedstream;
 return obj;
 }











 function audioProcessorChange ()
 {

 }




 function audioClamp (val,min,max)
 {
 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 return min<max?val<min?min:val>max?max:val:val<max?max:val>min?min:val;
 }



 function audioFreqToIndex (object,freq)
 {
 var index,res;
 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 index=Math.round((freq/object.freq_range)*object.band_count);
 res=audioClamp(index,0,object.band_count);
 return res;
 }




 function audioIndexToFreq (object,index)
 {
 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 var res=(index*object.rate)/(object.band_count*2);
 return res;
 }




 function audioGainApply (ibuf,obuf,gain,minv,maxv)
 {
 var ilen,i,ival,oval;
 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 ilen=ibuf.length;
 if(minv&&maxv)
  {
  for(i=0;i<ilen;i++)
   {
   ival=ibuf[i];
   oval=ival*gain;
   if(oval<minv) { oval=minv;  }  else
   if(oval>maxv) { oval=maxv;  }
   obuf[i]=oval;
   }
  }
 else
  {
  for(i=0;i<ilen;i++)
   {
   ival=ibuf[i];
   oval=ival*gain;
   obuf[i]=oval;
   }
  }

 }






 function audioScriptWithGain (object,event,gain)
 {
 var ibuf,obuf;
 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 ibuf=event.inputBuffer.getChannelData(0);
 obuf=event.outputBuffer.getChannelData(0);
 //audioGainApply(ibuf,obuf,gain,-0.98,+0.98);
 audioGainApply(ibuf,obuf,gain);
 }












 function audioAnalyzeInput (object,event)
 {
 var r,s,fqs,fqe,val,lev;
 var dbf,suv,i,ii,mv,va,vb,dsz;

 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 object.analyser.getFloatFrequencyData(object.freq_float_buffer);
 mv=-Infinity;
 for(i=0,ii=object.freq_buffer_len;i<ii;i++)
  {
  if(object.freq_float_buffer[i]>mv&&object.freq_float_buffer[i]<0) {  mv=object.freq_float_buffer[i];   }
  };

 suv=0;
 s=0;
 for(r=0;r<object.freq_buffer_len;r++)
  {
  //fqs=Math.round(audioIndexToFreq(object,r+0))-0;
  //fqe=Math.round(audioIndexToFreq(object,r+1))-1;
  fqs=r+0;
  fqe=r+1;
  val=object.freq_float_buffer[r];
  val-=object.analyser.minDecibels;
  suv+=val**2;
  s++;
  }
 fqs=Math.round(audioIndexToFreq(object,fqs))-0;
 fqe=Math.round(audioIndexToFreq(object,fqe))-1;
 va=20*Math.log10(suv/s);
 mv=aa.numFixed(mv,1);
 va=aa.numFixed(va,1);

 lev=aa.numFixed((mv-(-160)),0);
 object.analyser_level=lev;
 //console.log(object.analyser_level);

 object.analyser_cycle++;
 }




 function audioProcessorProc (object,event)
 {
 var grp,ix,grpg,flag,flg,r,rlen;
 var val,bar,hits,low,hig,fqs,fqe,cmp,str;
 var new_max_volume;
 var new_base_level_eq;
 var new_alogv;
 var k,grpk,c,f;

 if(1&&use_profiler==true&&mb_profile_group_audio) {  aaProfilerHit(arguments.callee.name); }
 if(object.id=="b_canstream_0")  {  grp=app.uix.b_canstream_0_grp;  }
 else                            {  if((grp=uixElementGroupFind(object.id))==null) { aa.debugAlert(); }  }
 ix=aa.stringLastCharGet(object.id);
 if(ix!=0) alert(ix);

 audioAnalyzeInput(object,event);

 flg=0;

 if(app.media.cur_local_mute==true)  {  audioScriptWithGain(object,event,0);  }
 else                                {  audioScriptWithGain(object,event,app.media.cur_local_gain);  }
 }




/*-----------------------------------------------------------------------*/





 function uixVideoCanvas ()
 {
 }







 function uixVideoAddVadColor (grp,cw,ch)
 {
 var cgrp=grp;

 if(app.aud_pro==undefined) { return; } //aa.debugAlert(); }
 if(app.aud_pro.analyser_level>=105&&app.media.cur_local_mute==false)
  {
  aa.guiCanvasBorder(cgrp.obj.han,1,1,cw-2,ch-2,2,app.uix.rgb_vad_color_1);
  aa.guiCanvasBorder(cgrp.obj.han,3,3,cw-6,ch-6,2,app.uix.rgb_vad_color_2);
  }
 }






 function uixVideoCanvasPaint (dsz)
 {
 var vgrp,cgrp,ogrp,pgrp;
 var vobj,cobj,oobj;
 var vw,vh,rat,cw,ch,fps,z;
 var acd1,acd2,acd3,acd4,akrec;
 var r,ray,f,k,m,mr,el,mes,msh,cd,ms;
 var iqs,oqs,capframe,smallframe,imda,io,i,j;


 mediaSwapYield();

 vgrp=app.uix.b_video_0_grp;
 if(vgrp.obj==null)         { return; }
 if(vgrp.dom.videoWidth==0) { return; }
 cgrp=app.uix.b_canstream_0_grp;
 if(cgrp.obj==null)         { return; }
 if(cgrp.dom.videoWidth==0) { return; }
 ogrp=app.uix.b_overlay_0_grp;
 if(ogrp.obj==null)         { return; }
 if(ogrp.dom.width==0)      { return; }
 pgrp=app.uix.b_precanstream_0_grp;
 if(pgrp.obj==null)         { return; }
 if(pgrp.dom.width==0)      { return; }


 if(1&&use_profiler==true&&mb_profile_group_video) {  aaProfilerHit(arguments.callee.name); }
 if(app.face0!=undefined)
  {
  faceYield();
  }


 if((app.media.is_swapping==false&&vgrp.obj.dom.readyState==4)&&((vgrp.obj.dom.currentTime>vgrp.obj.vars.prev_time)||(vgrp.obj.vars.prev_time==undefined)))
  {
  if(1&&use_profiler==true&&mb_profile_group_video) {  aaProfilerHit(arguments.callee.name+"_in"); }
  uixCanvasOrientationFix();
  vw=(vgrp.obj.dom.videoWidth);
  vh=(vgrp.obj.dom.videoHeight);
  rat=vw/vh;
  cw=(cgrp.obj.dom.width);
  ch=(cw/rat);
  cw=Math.floor(cw);
  ch=Math.floor(ch);

  if(vgrp.obj.vars.frame_number==undefined)   {   vgrp.obj.vars.frame_number=0; }
  if(vgrp.obj.vars.frame_number==0)           {   vgrp.obj.vars.start_time=vgrp.obj.dom.currentTime;   }
  vgrp.obj.vars.frame_number++;
  vgrp.obj.vars.prev_time=vgrp.obj.dom.currentTime;
  fps=0;
  if(vgrp.obj.vars.frame_number>1) { fps=vgrp.obj.vars.frame_number/(vgrp.obj.dom.currentTime-vgrp.obj.vars.start_time);   }
  vgrp.obj.vars.fps=fps;

  if(app.uix.did_swap==false)
   {
   if(app.face0!=undefined)
    {
    if((app.media.cur_arxi!=0&&app.face0.o_queue.length>0)||(app.media.cur_vfxi!=0))
     {
     cgrp.obj.dom.style.zIndex=8370;
     vgrp.obj.dom.style.zIndex=7000;
  //   vgrp.obj.dom.style.visibility="hidden";
     app.uix.did_swap=true;
     //console.log("swapping");
     //swapZindex(vgrp,cgrp);
     }
    }
   else
    {
//    swapZindex(vgrp,cgrp);
     cgrp.obj.dom.style.zIndex=8370;
//     vgrp.obj.dom.style.visibility="hidden";
     app.uix.did_swap=true;

    }
   }



  if(app.media.cur_arxi!=0)
   {
   aa.guiCanvasImageDraw(pgrp.obj.han,0,0,cw,ch,0,0,vw,vh,vgrp.obj.dom);
   capframe=aa.guiCanvasImageGet(pgrp.obj.han,0,0,cw,ch);
   faceInputPush(app.face0,cw,ch,capframe);
   io=faceOutputPop(app.face0);
   if(io!=null)
    {
    if(app.media.ever_ar_stage==1) { app.media.ever_ar_stage=2; }

    if(app.media.cur_vfxi==0)
     {
     aa.guiCanvasImagePut(cgrp.obj.han,0,0,0,0,io.width,io.height,io.frame);
     }
    else
    if(app.media.cur_vfxi>=1&&app.media.cur_vfxi<=4)
     {
     aa.guiCanvasImagePut(cgrp.obj.han,0,0,0,0,io.width,io.height,io.frame);
     capframe=aa.guiCanvasImageGet(cgrp.obj.han,0,0,cw,ch);
     if(app.media.cur_vfxi==1)  {     mediaFxCensor(capframe.width,capframe.height,10,capframe);      }
     else
     if(app.media.cur_vfxi==2)  {     mediaFxFlashing(capframe.width,capframe.height,aa.numRand(6),aa.numRand(4),capframe); }
     else
     if(app.media.cur_vfxi==3)  {     mediaFxBrighten(capframe.width,capframe.height,1.5,capframe); }
     else
     if(app.media.cur_vfxi==4)  {     mediaFxBrighten(capframe.width,capframe.height,0.5,capframe); }
     aa.guiCanvasImagePut(cgrp.obj.han,0,0,0,0,cw,ch,capframe);
     uixVideoAddVadColor(cgrp,cw,ch);
     }
    if(app.media.cur_arxi==1)
     {
     if(io.data[0])
      {
      acd1=faceCord(app.face0,io,234);
      acd2=faceCord(app.face0,io,10);
      acd3=faceCord(app.face0,io,454);
      acd4=faceCord(app.face0,io,152);
      acd1.x-=22;      acd2.y-=22;      acd3.x+=22;      acd4.y+=22;
      akrec=aa.guiRectSet(acd1.x,acd2.y,(acd3.x-acd1.x)+1,(acd4.y-acd2.y)+1);
      ms=aa.timerMsRunning();
      el=ms-app.uix.cog[0];
      if(el>=20)
       {
       app.uix.cog[0]=ms;
       if(app.uix.cog[1]==0) { app.uix.cog[2]+=12; if(app.uix.cog[2]>=15)  { app.uix.cog[2]=15;  app.uix.cog[1]=1; }                  }
       else                  { app.uix.cog[2]-=12; if(app.uix.cog[2]<=-15) { app.uix.cog[2]=-15; app.uix.cog[1]=0; }                  }
       }
      cgrp.obj.ctx.save();
      cgrp.obj.ctx.translate( akrec.x,akrec.y);
      cgrp.obj.ctx.translate( (akrec.w/2),(akrec.h/2));
      cgrp.obj.ctx.rotate(aa.numDegreesToRadian(app.uix.cog[2]));
      aa.guiCanvasImageDraw(cgrp.obj.han,akrec.x,akrec.y,akrec.w,akrec.h, -(akrec.w/2),-(akrec.h/2),akrec.w,akrec.h,cgrp.obj.dom);
      cgrp.obj.ctx.restore();
      uixVideoAddVadColor(cgrp,cw,ch);
      }
     }
    else
    if(app.media.cur_arxi==2)
     {
     if(io.data[0])
      {
      acd1=faceCord(app.face0,io,246);
      acd2=faceCord(app.face0,io,159);
      acd3=faceCord(app.face0,io,133);
      acd4=faceCord(app.face0,io,145);
      akrec=aa.guiRectSet(acd1.x,acd2.y,(acd3.x-acd1.x)+1,(acd4.y-acd2.y)+1);
      aa.guiCanvasImageDraw(cgrp.obj.han,akrec.x,akrec.y,akrec.w,akrec.h, akrec.x-8,akrec.y-8,akrec.w+16,akrec.h+16,cgrp.obj.dom);
      acd1=faceCord(app.face0,io,362);
      acd2=faceCord(app.face0,io,386);
      acd3=faceCord(app.face0,io,263);
      acd4=faceCord(app.face0,io,374);
      akrec=aa.guiRectSet(acd1.x,acd2.y,(acd3.x-acd1.x)+1,(acd4.y-acd2.y)+1);
      aa.guiCanvasImageDraw(cgrp.obj.han,akrec.x,akrec.y,akrec.w,akrec.h, akrec.x-8,akrec.y-8,akrec.w+16,akrec.h+16,cgrp.obj.dom);
      uixVideoAddVadColor(cgrp,cw,ch);
      }


     }
    else
    if(app.media.cur_arxi==3)
     {
     if(io.data[0])
      {
      aa.guiCanvasImagePut(cgrp.obj.han,0,0,0,0,io.width,io.height,io.frame);
      //aa.guiCanvasImageDraw(cgrp.obj.han,0,0,akrec.x,akrec.y,akrec.w,akrec.h, -(akrec.w/2),-(akrec.h/2),akrec.w,akrec.h,cgrp.obj.dom);


      cgrp.ctx.beginPath();
      ray=faceMarks(1);
      for(i=0;i<ray.length;i++)
       {
       acd1=faceCord(app.face0,io,ray[(i+0)%ray.length]);
       if(i==0) cgrp.ctx.moveTo(acd1.x,acd1.y);
       else     cgrp.ctx.lineTo(acd1.x,acd1.y);
       }
      cgrp.ctx.closePath();
      cgrp.ctx.fillStyle="#ff0000";
      cgrp.ctx.fill();
      cgrp.ctx.beginPath();
      ray=faceMarks(4);
      for(i=0;i<ray.length;i++)
       {
       acd1=faceCord(app.face0,io,ray[(i+0)%ray.length]);
       if(i==0) cgrp.ctx.moveTo(acd1.x,acd1.y);
       else     cgrp.ctx.lineTo(acd1.x,acd1.y);
       }
      cgrp.ctx.closePath();
      cgrp.ctx.fillStyle="#ff0077";
      cgrp.ctx.fill();


      uixVideoAddVadColor(cgrp,cw,ch);
      }
     }
    }
   else
    {
    if(app.media.ever_ar_stage==1)
     {
  //   aa.guiCanvasImageDraw(cgrp.obj.han,0,0,cw,ch,0,0,vw,vh,vgrp.obj.dom);
//     uixVideoAddVadColor(cgrp,cw,ch);
     }
    //console.log(app.media.ever_ar_stage);

    }
   }
  else
  if(app.media.cur_arxi==0)
   {
   if(app.media.cur_vfxi==0)
    {
    aa.guiCanvasImageDraw(cgrp.obj.han,0,0,cw,ch,0,0,vw,vh,vgrp.obj.dom);
    uixVideoAddVadColor(cgrp,cw,ch);
    }
   else
   if(app.media.cur_vfxi>=1&&app.media.cur_vfxi<=4)
    {
    aa.guiCanvasImageDraw(cgrp.obj.han,0,0,cw,ch,0,0,vw,vh,vgrp.obj.dom);
    capframe=aa.guiCanvasImageGet(cgrp.obj.han,0,0,cw,ch);
    if(app.media.cur_vfxi==1)  {    mediaFxCensor(capframe.width,capframe.height,10,capframe);      }
    else
    if(app.media.cur_vfxi==2)  {    mediaFxFlashing(capframe.width,capframe.height,aa.numRand(6),aa.numRand(4),capframe); }
    else
    if(app.media.cur_vfxi==3)  {    mediaFxBrighten(capframe.width,capframe.height,1.5,capframe); }
    else
    if(app.media.cur_vfxi==4)  {    mediaFxBrighten(capframe.width,capframe.height,0.5,capframe); }
    aa.guiCanvasImagePut(cgrp.obj.han,0,0,0,0,cw,ch,capframe);
    uixVideoAddVadColor(cgrp,cw,ch);
    ///console.log("b put "+cw+"  "+ch);
    }
   }
  }



 if(app.face0!=undefined)
  {
  faceYield();
//  console.log(app.face0.o_queue.length);
  }
 }



/*-----------------------------------------------------------------------*/








