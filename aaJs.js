/**
 aaJS, ope(c)n, Ashod Apakian
 Third party credits:
 jesusgollonet easing functions
 Ruslan Tushov dethrottling
 https://stackoverflow.com/questions/54198165/how-to-increase-decrease-size-of-this-heart-shape-in-canvas/54198508
 Rich Tibbett Nosleep
**/

//'use strict';


var PROMISE_completed=1;
var PROMISE_pending=2;
var PROMISE_rejected=-1;

var aa_ms_running=0;

var aa_profiler={};

const aa_profile_group_handle  =0|0;
const aa_profile_group_promise =0|0;
const aa_profile_group_timer   =0|0;
const aa_profile_group_num     =0|0;
const aa_profile_group_data    =0|0;
const aa_profile_group_string  =0|0;
const aa_profile_group_env     =0|0;
const aa_profile_group_queue   =0|0;
const aa_profile_group_ptr     =0|0;
const aa_profile_group_kbd     =0|0;
const aa_profile_group_gui     =0|0;
const aa_profile_group_media   =0|0;
const aa_profile_group_socket  =0|0;
const aa_profile_group_rtc     =0|0;
const aa_profile_group_main    =0|0;

/*-----------------------------------------------------------------------*/

var aa=(function()
 {
 var   handle_obj={};
 var    debug_obj={};
 var  promise_obj={};
 var    timer_obj={};
 var      num_obj={};
 var     data_obj={};
 var   string_obj={};
 var      env_obj={};
 var    queue_obj={};
 var  pointer_obj={};
 var keyboard_obj={};
 var  storage_obj={};
 var      gui_obj={};
 var    media_obj={};
 var   socket_obj={};
 var      dsp_obj={};
 var    bitio_obj={};
 var      rtc_obj={};
 var     main_obj={};
 var      retcode;//={};


/*-----------------------------------------------------------------------*/

 navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||
 navigator.mozGetUserMedia||navigator.msGetUserMedia||window.RTCPeerConnection;

/*-----------------------------------------------------------------------*/


 function initEverything ()
 {
 retcodeInit();
 handleObjInit();
 debugObjInit();
 promiseObjInit();
 timerObjInit();
 numObjInit();
 dataObjInit();
 stringObjInit();
 envObjInit();
 queueObjInit();
 pointerObjInit();
 keyboardObjInit();
 storageObjInit();
 guiObjInit();
 mediaObjInit();
 socketObjInit();
 dspObjInit();
 bitioObjInit();
 rtcObjInit();
 mainObjInit();
 }


 initEverything();

/*-----------------------------------------------------------------------*/

 function retcodeInit ()
 {
 var obj={};
 obj.RET_NO=0;
 obj.RET_OK=1;
 obj.RET_YES=1;
 obj.RET_BADPARM=2;
 obj.RET_FAILED=3;
 obj.RET_BOUNDS=4;
 obj.RET_FORBIDDEN=5;
 obj.RET_NOMEMORY=6;
 obj.RET_BADHANDLE=7;
 obj.RET_NOTFOUND=8;
 obj.RET_NOTREADY=9;
 obj.RET_EXISTS=10;
 obj.RET_ALREADYOPEN=11;
 obj.RET_NOTOPEN=12;
 obj.RET_INUSE=13;
 obj.RET_NOTSTARTED=14;
 obj.RET_CORRUPTED=15;
 obj.RET_NOTSUPPORTED=16;
 obj.RET_DENIED=17;
 obj.RET_TIMEOUT=18;
 obj.RET_FATAL=19;
 obj.RET_BADSTATE=20;
 obj.RET_FINISHED=21;
 obj.RET_NOTINITIALIZED=22;
 obj.RET_PARTIAL=23;
 obj.RET_ALREADYSTARTED=24;
 obj.RET_ATTENTION=25;
 obj.RET_BADFORMAT=26;
 obj.RET_CANCELLED=27;
 obj.RET_WORKING=28;
 obj.RET_COLLISION=29;
 obj.RET_POSSIBLE=30;
 obj.RET_IGNORE=31;
 obj.RET_INCOMPLETE=32;
 obj.RET_OTHER=33;
 obj.RET_MISSINGPARM=34;
 obj.RET_OVERFLOW=35;
 obj.RET_STILLWORKING=36;
 obj.RET_SAME=37;
 obj.RET_UNDERFLOW=38;
 obj.RET_UNKNOWN=39;
 retcode=Object.freeze(obj);
 //rc=Object.freeze(obj);
 //return rc;
 }


/*-----------------------------------------------------------------------*/




 function handleObjInit ()
 {
 var state;
 if(Object.keys(handle_obj).length!=0) { return; }
 state={};
 state.handle_base=1000000;
 state.handle_array=[];
 handle_obj.state=state;
 handle_obj.is_init=true;
 }





 function handleDefine (type,slots)
 {
 var i,obj,ths;
 ths={};
 ths.base=handle_obj.state.handle_base;
 ths.type=type;
 ths.slots=slots;
 ths.count=0;
 ths.usage=0;
 ths.pf=0;
 ths.array=[];
 for(i=0;i<ths.slots;i++)
  {
  obj={};
  obj.in_use=false;
  obj.self_index=i;
  obj.self_handle=obj.self_index+ths.base;
  obj.han=obj.self_handle;
  obj.comment="";
  ths.array[i]=obj;
  }
 handle_obj.state.handle_array.push(ths);
 handle_obj.state.handle_base+=1000000;
 return ths;
 }




 function handleCheck (handef,handle)
 {
 var obj;
 if(0) { aaProfilerHit(arguments.callee.name); }
 if(isNaN(handle)) { return null; }
 if(handle<handef.base) { return null; }
 handle=handle-handef.base;
 if(handle>=handef.slots) { return null; }
 obj=handef.array[handle];
 if(obj.in_use!=true) { return null; }
 return obj;
 }





 function handleReset (handef,handle)
 {
 var obj,idx,iu;
 if(0) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(handef,handle))==null) { return false; }
 idx=handle-handef.base;
 iu=obj.in_use;
 obj={};
 obj.in_use=false;
 obj.self_index=idx;
 obj.self_handle=obj.self_index+handef.base;
 obj.han=obj.self_handle;
 obj.comment="";
 handef.array[idx]=obj;
 if(iu==true) {  handef.count--; }
 return true;
 }




 function handleGet (handef,index)
 {
 var obj,han;
 if(0) { aaProfilerHit(arguments.callee.name); }
 if(index<0||index>=handef.slots) { return 0; }
 obj=handef.array[index];
 if(obj.in_use!=true) { return 0; }
 han=index+handef.base;
 return han;
 }




 function handleUse (handef,index)
 {
 var obj,han;
 if(aa_profile_group_handle) { aaProfilerHit(arguments.callee.name); }
 if(index<0||index>=handef.slots) { return 0; }
 obj=handef.array[index];
 if(obj.in_use!=false) { return 0; }
 obj.in_use=true;
 handef.array[index]=obj;
 handef.usage++;
 handef.count++;
 han=index+handef.base;
 return han;
 }




 function handleRemove (handef,handle)
 {
 var obj,idx;
 if(aa_profile_group_handle) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(handef,handle))==null) { return false; }
 idx=obj.self_index;
 return(handleReset(handef,handle));
 }






 function handleNext (handef,brute)
 {
 var idx,oto,han,todo,pf;
 if(aa_profile_group_handle) { aaProfilerHit(arguments.callee.name); }
 if(handef.count==0)  {  return 0;  }
 if(brute) { todo=handef.slots; }
 else      { todo=1; }
 for(oto=0;oto<todo;oto++)
  {
  handef.pf++;
  if(handef.pf>=handef.slots) { handef.pf=0; }
  pf=handef.pf;
  han=handleGet(handef,pf);
  if(han>0) { return han; }
  }
 return 0;
 }







 function handleText (handle)
 {
 var i,hd,str,ix,obj;
 for(i=0;i<handle_obj.state.handle_array.length;i++)
  {
  hd=handle_obj.state.handle_array[i];
  if(handle>=hd.base&&handle<(hd.base+hd.slots))
   {
   ix=handle-hd.base;
   obj=hd.array[ix];
   str=hd.type+" index="+ix+" in_use="+obj.in_use;
   return str;
   }
  }
 return null;
 }






 function handleGlobalDump ()
 {
 var i,ths,j;
 for(i=0;i<handle_obj.state.handle_array.length;i++)
  {
  ths=handle_obj.state.handle_array[i];
  if(ths.count==0) { continue; }
  console.log("base="+ths.base+" usage="+ths.count+" of "+ths.slots+"  type="+ths.type+" usage="+ths.usage);
  for(j=0;j<ths.slots;j++)
   {
   obj=ths.array[j];
   if(obj.in_use!=true) { continue; }
   if(obj.self_index!=j) { aa.debugAlert(); }
   if(obj.self_handle!=(ths.base+j)) {  aa.debugAlert(); }
   console.log(" handle="+obj.self_handle+"   "+obj.comment);
   //console.log("  "+j+") handle="+(ths.base+j)+"  "+obj.self_index+"  "+obj.self_handle+"   "+obj.comment);
   }


  //aa.debugLogger(5," base="+ths.base+" usage="+ths.count+" of "+ths.slots+"  "+ths.type);
  }
 }




 function handleGlobalKill ()
 {
 var i,ths,h,obj,han;
 for(h=0;h<handle_obj.state.handle_array.length;h++)
  {
  ths=handle_obj.state.handle_array[h];
  //aa.debugLogger(5,">> base="+ths.base+" usage="+ths.count+" of "+ths.slots+"  "+ths.type);
  for(i=0;i<ths.slots;i++)
   {
   if(ths.count==0) { continue; }
   obj=ths.array[i];
   if(obj.in_use!=true) { continue; }
   han=obj.self_handle;
   ///aa.debugLogger(5,">> base="+ths.base+" usage="+ths.count+" of "+ths.slots+"  "+ths.type+" "+i+" "+ths.slots+" "+obj.self_index+" "+han);
   switch(ths.type)
    {
    case "gui":
    aa.guiDestroy(han);
    break;
    }
   }
  //aa.debugLogger(5," base="+ths.base+" usage="+ths.count+" of "+ths.slots+"  "+ths.type);
  }
 }








 function handleCommentSet (handle,comment)
 {
 var obj,han,index,h,handef;

 if(0) { aaProfilerHit(arguments.callee.name); }
 //return true;
 for(h=0;h<handle_obj.state.handle_array.length;h++)
  {
  handef=handle_obj.state.handle_array[h];
  if(handle<handef.base) { continue; }
  if(handle>=(handef.base+handef.slots)) { continue; }
  index=handle-handef.base;
  obj=handef.array[index];
  if(obj.in_use!=true) { return false; }
  obj.comment=comment;
  return true;
  }
 return false;
 }




 function handleCommentGet (handle)
 {
 var obj,han,index,h,handef;

 if(0) { aaProfilerHit(arguments.callee.name); }
 for(h=0;h<handle_obj.state.handle_array.length;h++)
  {
  handef=handle_obj.state.handle_array[h];
  if(handle<handef.base) { continue; }
  if(handle>=(handef.base+handef.slots)) { continue; }
  index=handle-handef.base;
  obj=handef.array[index];
  if(obj.in_use==true) {  return obj.comment;  }
  }
 return null;
 }




/*-----------------------------------------------------------------------*/




 function debugObjInit ()
 {
 if(Object.keys(debug_obj).length!=0) { return; }
 debug_obj.debug_level=10;
 debug_obj.logger_level=0;
 debug_obj.is_init=true;
 }



 function debugSpeedTest ()
 {
 var i,j,ms,data,fib=[0,1];
 j=0|0;
 i=2|0;
 data=[];
 ms=Date.now();
 while(1)
  {
  fib[i]=fib[i-1]+fib[i-2];
  fib[i]=Math.abs(fib[i])**2;
  data.push(fib[i]);
  if((j++)>=1000)  {  if((Date.now()-ms)>=33) { break; }  j=0|0; }
  i++;
  }
 data=[];
 data=null;
 i=aa.numFixed(i/1000);
 return parseInt(i);
 }




 function debugLineNumber ()
 {
 var ln,e,stack,frame,frameRE;
 e=new Error();
 if(!e.stack)
 try       { throw e;  }
 catch(e)  { if(!e.stack) {  return 0;  } }
 stack=e.stack.toString().split(/\r\n|\n/);
 frameRE=/:(\d+):(?:\d+)[^\d]*$/;
 do { frame=stack.shift();  } while (!frameRE.exec(frame)&&stack.length);
 ln=parseInt(frameRE.exec(stack.shift())[1]);
 return ln;
 }



 function debugFunctionName ()
 {
 var caller,stack,fn,fnRE;
 fnRE=/function\s*([\w\-$]+)?\s*\(/i;
 caller=arguments.callee.caller;
 stack="";
 while(caller)
  {
  fn=fnRE.test(caller.toString())?RegExp.$1||"{?}":"{?}";
  stack=fn;
  break;
  };
 return stack;
 }




 function debugLogFunctionLine ()
 {
 var ln,fn,s,t,su,bias,e,stack,frame,frameRE;
 e=new Error();
 if(!e.stack)
 try       { throw e;  }
 catch(e)  { if(!e.stack) {  return false;  } }
 su=aa.debugStackUsage();
 stack=e.stack.toString().split(/\r\n|\n/);
 frameRE=/:(\d+):(?:\d+)[^\d]*$/;
 do { frame=stack.shift();  } while (!frameRE.exec(frame)&&stack.length);
 ln=parseInt(frameRE.exec(stack.shift())[1]);
 fn=aa.debugStackGet(1);
 //console.log(fn+":"+ln);
 aa.debugLog(fn+":"+ln);
 return true;
 }



 function debugStackUsage ()
 {
 var caller,stack,fn,fnRE;
 fnRE=/function\s*([\w\-$]+)?\s*\(/i;
 caller=arguments.callee.caller;
 stack=0;
 while(caller)
  {
  fn=fnRE.test(caller.toString())?RegExp.$1||"{?}":"{?}";
  stack++;
  caller=caller.arguments.callee.caller;
  };
 return stack;
 }


 function debugStackGet (index)
 {
 var caller,stack,fn,fnRE,i;
 fnRE=/function\s*([\w\-$]+)?\s*\(/i;
 caller=arguments.callee.caller;
 stack="";
 i=0;
 while(caller)
  {
  fn=fnRE.test(caller.toString())?RegExp.$1||"{?}":"{?}";
  stack=fn;
  caller=caller.arguments.callee.caller;
  if(i>=index) { break; }
  i++;
  };
 return stack;
 }



 function debugAlert (txt)
 {
 var ln,fn,str,s,t,su,bias,e,stack,frame,frameRE;
 e=new Error();
 if(!e.stack)
 try       { throw e;  }
 catch(e)  { if(!e.stack) {  return false;  } }
 su=aa.debugStackUsage();
 stack=e.stack.toString().split(/\r\n|\n/);
 frameRE=/:(\d+):(?:\d+)[^\d]*$/;
 do { frame=stack.shift();  } while (!frameRE.exec(frame)&&stack.length);
 ln=parseInt(frameRE.exec(stack.shift())[1]);
 fn=aa.debugStackGet(1);
 str="";
 if(txt) { str+=txt+"\n----------\n"; }
 str+="#"+ln+":  "+fn+"()"+" "+aa.timerMsRunning()+"ms \n";
 for(s=2;(s+1)<su;s++)
  {
  str+="-> "+aa.debugStackGet(s)+"()\n";
  }
 alert(str);
 return true;
 }



 function debugLevelSet (level)
 {
 debug_obj.debug_level=level;
 }





 function debugClear (lines)
 {
 var i,str;
 str="";
 for(i=0;i<lines;i++) { str+="\n"; }
// console.log(str);
 debugLog(str);
 }




 function debugLog (...params)
 {
 if(debug_obj.debug_level==0) { return; }
 /*
 if(debug_obj.debug_log_hud==true)  {  try   {   aa.guiHudLog(params);   }
 catch(error)   {   }  }
 else  {  console.log(...params);  }
 */
 ///console.log(params);
 //console.log(...params);
 //console.log(aa.timerMsRunning());
 setTimeout(console.log.bind(console,...params),0);
 }



 function debugLoggerLevelSet (lev)
 {
 debug_obj.logger_level=lev;
 return true;
 }



 function debugLogger (lev,...params)
 {
 var pre;
 if(debug_obj.logger_level>lev) { return false; }
 if(0)
  {
  pre=aa.timerMsRunning()+": ";
  pre+=params;
  setTimeout(console.log.bind(console,pre),0);
  }
 else
  {
  setTimeout(console.log.bind(console,...params),0);
  }
 //console.log(...params);
 return true;
 }




 function debugMemoryUsage ()
 {
 var supported,obj;
 supported=false;
 obj={};
 try   { if(performance.memory) { supported=true; }  }
 catch { }
 if(supported==true)
  {
  obj.heap_limit=performance.memory.jsHeapSizeLimit;
  obj.heap_size=performance.memory.totalJSHeapSize;
  obj.heap_used=performance.memory.usedJSHeapSize;
  obj.heap_limit_kb=parseInt(obj.heap_limit/1024.0);
  obj.heap_size_kb=parseInt(obj.heap_size/1024.0);
  obj.heap_used_kb=parseInt(obj.heap_used/1024.0);
  }
 else
  {
  obj.heap_limit=0;
  obj.heap_size=0;
  obj.heap_used=0;
  obj.heap_limit_kb=0
  obj.heap_size_kb=0
  obj.heap_used_kb=0
  }
 return obj;
 }



/*-----------------------------------------------------------------------*/



 function promiseObjInit ()
 {
 if(Object.keys(promise_obj).length!=0) { return; }
 promise_obj.handef=handleDefine("promise",128);
 promise_obj.is_init=true;
 }





 function promiseCreate (nativepromise,etc)
 {
 var i,h,obj,ispending,isrejected,isfullfilled,result;
 if(1&&aa_profile_group_promise) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 for(i=0;i<promise_obj.handef.slots;i++)
  {
  obj=promise_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  h=handleUse(promise_obj.handef,i);
  if(h==0) { alert("promisecreate handle use returned 0"); }
  if(0)    { console.log("promise create "+h+"   "+promise_obj.handef.slots+"  "+promise_obj.handef.count+"  "+etc); }
  obj.vars={};
  obj.vars.native_promise=nativepromise;
  obj.vars.is_pending=true;
  obj.vars.is_rejected=false;
  obj.vars.is_fullfilled=false;
  obj.vars.ms=aa.timerMsRunning();
  obj.vars.val=null;
  obj.vars.err=null;
  obj.vars.etc=etc;
  obj.vars.result=obj.vars.native_promise
  .then(
   function(v)
    {
    ///console.log("fullfilled");
    obj.vars.is_fullfilled=true;
    obj.vars.is_pending=false;
    obj.vars.val=v;
    return v;
    },
   function(e)
    {
    console.log("rejected");
    obj.vars.is_rejected=true;
    obj.vars.is_pending=false;
    obj.vars.err=e;
    throw e;
    })
  .catch(err=>
   {
   ///alert("catch prom ",+obj.vars.err,err);
   console.log("err catch "+obj.vars.err);
   console.log("state="+obj.vars.is_pending+"  "+obj.vars.is_rejected+"  "+obj.vars.is_fullfilled+"  ");
   });
  //alert("fuck "+obj.vars.is_fullfilled+"  "+obj.vars.is_pending+"  "+obj.vars.is_rejected+"  "+obj.vars.val+"  "+obj.vars.err)
  obj.vars.result.val=function()           {  return obj.vars.val;         }
  obj.vars.result.err=function()           {  return obj.vars.err;         }
  obj.vars.result.is_fullfilled=function() {  return obj.vars.is_fullfilled; };
  obj.vars.result.is_pending=function()    {  return obj.vars.is_pending;    };
  obj.vars.result.is_rejected=function()   {  return obj.vars.is_rejected;   };
  return h;
  }
 alert("promisecreate couldnt find an empty handle, handef.slots="+promise_obj.handef.slots+"  "+promise_obj.handef.count);
 ///aa.debugAlert(promise_obj.handef.count);
 return 0;
 }




 function promiseDestroy (handle)
 {
 var obj,etc,ret;
 if(1&&aa_profile_group_promise) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=handleCheck(promise_obj.handef,handle))==null)
  {
  alert("promisedelay handlecheck failed");
  return false;
  }
 etc=obj.vars.etc;
 obj.vars={};
 ret=handleRemove(promise_obj.handef,handle);
 if(ret!=true)
  {
  alert("promisedestroy, handleremove returned "+ret);
  }
 else
  {
  if(0) {  console.log("promise destroy "+handle+"   "+promise_obj.handef.slots+"  "+promise_obj.handef.count+" "+etc); }
  }
 return true;
 }




 function promiseGet (handle)
 {
 if(1&&aa_profile_group_promise) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(handleCheck(promise_obj.handef,handle));
 }




 function promiseStatus (handle)
 {
 var obj,status;
 if(1&&aa_profile_group_promise) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=promiseGet(handle))==null) { return null; }
 status={};
 status.state=0;
 status.native_promise=obj.vars.native_promise;
 status.result=obj.vars.result;
 status.val=obj.vars.result.val();
 status.err=obj.vars.result.err();
 status.etc=obj.vars.etc;
 if(obj.vars.result.is_fullfilled()) { status.state=PROMISE_completed; }
 if(obj.vars.result.is_pending())    { status.state=PROMISE_pending;   }
 if(obj.vars.result.is_rejected())   { status.state=PROMISE_rejected;  }
 status.elapsed=aa.timerMsRunning()-obj.vars.ms;
 return status;
 }





/*-----------------------------------------------------------------------*/




 function timerObjInit ()
 {
 if(Object.keys(timer_obj).length!=0) { return; }
 timer_obj.msec_base=new Date().valueOf();
 if("performance" in window)  {  timer_obj.perf_base=performance.now();  }
 else                         {  timer_obj.perf_base=new Date().valueOf();  }
 timer_obj.is_init=true;
 }




 function timerTikNow (useperf)
 {
 var t;
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(useperf)
  {
  if("performance" in window)   {   t=performance.now()-timer_obj.perf_base;   }
  else   {   t=new Date().valueOf()-timer_obj.msec_base;   }
  }
 else  {  t=Date.now()-timer_obj.msec_base;  }
 return t;
 }



 function timerTikElapsed (useperf,tik)
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(timerTikNow(useperf)-tik);
 }



 function timerMsRunning ()
 {
 var ms;
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 //if(aa_profile_group_timer) { aaProfilerHit(arguments.callee.name); }
 ms=timerTikNow(false);
 aa_ms_running=ms;
 return ms;
 }


 function timerMsElapsed (ms)
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(aa.timerMsRunning()-ms);
 }






 function timerMicroRunning ()
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(timerTikNow(true));
 }



 function timerTimeoutSet (to)
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 var tmo={};
 tmo.type='timeout';
 tmo.ms=aa.timerMsRunning();
 tmo.el=0;
 tmo.to=to;
 return tmo;
 }


 function timerTimeoutReset (tmo,newto)
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 tmo.ms=aa.timerMsRunning();
 tmo.el=0;
 if(arguments.length==2) { tmo.to=newto;  }
 return tmo;
 }



 function timerTimeoutTest (tmo)
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 tmo.el=aa.timerMsRunning()-tmo.ms;
 if(tmo.el>=tmo.to) { return true; }
 return false;
 }



 function timerRaterInit ()
 {
 var obj;
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 obj={};
 obj.type="rater";
 obj.started=false;
 obj.tik=timerTikNow(true);
 obj.elapsed=0;
 obj.hits=0;
 obj.hz=0;
 return obj;
 }


 function timerRaterUpdate (obj,hits)
 {
 if(1&&aa_profile_group_timer) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="rater") { return null; }
 if(obj.started==false)
  {
  obj.started=true;
  obj.tik=timerTikNow(true);
  }
 obj.hits+=hits;
 obj.elapsed=timerTikElapsed(true,obj.tik);
 obj.hz=obj.hits/(obj.elapsed/1000);
 return obj;
 }






/*-----------------------------------------------------------------------*/



 function numObjInit ()
 {
 if(Object.keys(num_obj).length!=0) { return; }
 num_obj.is_init=true;
 }




 function numRand (max)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 var val=Math.floor(Math.random()*Math.floor(max));
 return parseInt(val%max);
 }



 function numFixed (numb,places)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return numb.toFixed(places);
 }



 function numPercentOf (numb,tot)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return(tot/100)*numb;
 }



 function numPercentIs (numb,tot)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return(100.0/tot)*numb;
 }




 function numPad(numb,width,z)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 z=z||'0';
 numb=numb+'';
 return numb.length>=width?numb:new Array(width-numb.length +1).join(z)+numb;
 }




 function numIntToHex(intg)
 {
 var code;
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 code=Math.round(intg).toString(16);
 (code.length>1)||(code='0'+code);
 return code;
 }



 function numRound(numb,precision)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return Number.parseFloat(numb).toPrecision(precision+1);
 }




 function numFloatFormat (numb,wholewid,pad,isps,fracwid)
 {
 var n,arr,txt;
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 n=numFixed(parseFloat(numb),fracwid);
 arr=n.toString().split(".");
 if(isps)  {  arr[0]=arr[0].padStart(wholewid,pad);  }
 else      {  arr[0]=arr[0].padEnd(wholewid,pad);  }
 if(fracwid>0) { txt=arr[0]+"."+arr[1] }
 else          { txt=arr[0]; }
 return txt;
 }



 function numIsWhole (numb)
 {
 var res;
 res=((numb-Math.floor(numb))!==0);
 if(res) { return false; }
 return true;
 }




 function numBitGet(numb,bit)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return((numb>>bit)%2!=0)
 }


 function numBitSet(numb,bit)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return numb|1<<bit;
 }


 function numBitClear(numb,bit)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return numb&~(1<<bit);
 }


 function numBitToggle(numb,bit)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 return numBitGet(numb,bit)?numBitClear(numb,bit):numBitSet(numb,bit);
 }



 function numDegreesToRadian (deg)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 var d;
 d=deg*(Math.PI/180);
 return d;
 }




 function numDistanceGet (x1,y1,x2,y2)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 var x,y;
 x=x2-x1;
 y=y2-y1;
 return Math.sqrt((x*x)+(y*y));
 }



 function numAngleGet (x1,y1,x2,y2)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 var x,y;
 x=x2-x1;
 y=y2-y1;
 return Math.atan2(y,x)*180/Math.PI;
 }


 function numRotate (x,y,cx,cy,deg)
 {
 if(aa_profile_group_num) { aaProfilerHit(arguments.callee.name); }
 var rad,px,py,np;
 rad=deg*(Math.PI/180);
 px=x;
 py=y;
 px-=cx;
 py-=cy;
 np=[];
 np[0]=px*Math.cos(rad)-py*Math.sin(rad);
 np[1]=px*Math.sin(rad)+py*Math.cos(rad);
 np[0]+=cx;
 np[1]+=cy;
 return np;
 }


/*-----------------------------------------------------------------------*/




 function dataObjInit ()
 {
 if(Object.keys(data_obj).length!=0) { return; }
 data_obj.is_init=true;
 }



 function dataArray2DCreate (rows)
 {
 var i,arr;
 if(data_obj.is_init!=true) { aa.debugAlert(); return null; }
 arr=[];
 for(i=0;i<rows;i++) { arr[i]=[];}
 return arr;
 }




 function dataObjectApxSize (object)
 {
 var objectList,stack,bytes,value,i;
 if(data_obj.is_init!=true) { return 0; }
 objectList=[];
 stack=[object];
 bytes=0;
 while(stack.length)
  {
  value=stack.pop();
  if(typeof value==='boolean') { bytes+=4;              }        else
  if(typeof value==='string')  { bytes+=value.length*2; }        else
  if(typeof value==='number')  { bytes+=8;              }        else
  if(typeof value==='object'&&objectList.indexOf(value)===-1)
   {
   objectList.push(value);
   for(i in value) {  stack.push(value[i]);    }
   }
  }
 return bytes;
 }



 function dataGlobalExists (varname)
 {
 const globalEval=eval;
 try  {  globalEval(varname);  return true;  }
 catch (e)  {  return false;  }
 return null;
 }



 function dataGlobalPropertiesGet (prefix)
 {
 var keyValues,global;
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 keyValues=[];
 global=window;
 for(var prop in global)
  {
  if(prop.indexOf(prefix)==0)
   {
   keyValues.push(prop+"="+global[prop]);
   }
  }
 return keyValues.join('&');
 }




 function dataObjectIsEmpty (obj)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 for(var prop in obj) { if(obj.hasOwnProperty(prop)) return false;  }
 return true;
 }



 function dataObjectIsUndefined (obj)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 return(typeof obj!=='undefined');
 }


 function dataObjectLength (obj)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 if(obj===undefined||obj===null) { return 0; }
 return(Object.keys(obj).length);
 }



 function dataValueExists (val)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 if(val===undefined) { return false; }
 if(val===null)      { return false; }
 if(val===false)     { return false; }
 if(val==="")        { return false; }
 return true;
 }



 function dataValueIsEmpty (val)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 return (val==null||val.length===0||val==="");
 }


 function dataValueIsNotEmpty (val)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 return !(val==null||val.length===0||val==="");
 }



 function dataArrayVargs ()
 {
 var a,ray=[];
 for(a=0;a<arguments.length;a++)
  {
  ray.push(arguments[a]);
  }
 return ray;
 }




 function dataArrayRotate (arr,reverse)
 {
 if(reverse) { arr.unshift(arr.pop()); }
 else        { arr.push(arr.shift());  }
 return arr;
 }




 function dataArrayUniqueCount (arr)
 {
 if(aa_profile_group_data) { aaProfilerHit(arguments.callee.name); }
 return new Set(arr).size;
 }




 function dataFloat32ArrayToUint8Array (array)
 {
 var output=array.buffer;
 return new Uint8Array(output);
 }


 function dataUint8ArrayToFloat32Array (array)
 {
 var output=array.buffer;
 return new Float32Array(output);
 }




 function dataFloat32ArrayToInt16Array (array)
 {
 var i,s,output=new Int16Array(array.length);
 for(i=0;i<array.length;i++)
  {
  s=Math.max(-1,Math.min(1,array[i]));
  output[i]=s<0?s*0x8000:s*0x7FFF;
  }
 return output;
 }




 function dataInt16ArrayToFloat32Array (array)
 {
 var i,s,n,f,output=new Float32Array(array.length);
 for(i=0;i<array.length;i++)
  {
  n=array[i];
  f=(n>=0x8000)?-(0x10000-n)/0x8000:n/0x7FFF;
  output[i]=f;
  }
 return output;
 }





 function dataInt16ArrayToUint8Array (array)
 {
 var i,s,output=new Uint8Array(array.length*2);
 for(i=0;i<array.length;i++)
  {
  s=array[i];
  output[(i*2)+0]=(s/256)%256;
  output[(i*2)+1]=(s&256)%256;
  }
 return output;
 }



 function dataUint8ArrayToInt16Array (array)
 {
 var o,i,s1,s2,output=new Int16Array(array.length/2);
 o=0;
 for(i=0;i<array.length;i+=2)
  {
  s1=array[(i+0)]|0;
  s2=array[(i+1)]|0;
  output[o]=(s1*256)+s2;
  o++;
  }
 return output;
 }





/*-----------------------------------------------------------------------*/




 function stringObjInit ()
 {
 if(Object.keys(string_obj).length!=0) { return; }
 string_obj.is_init=true;
 }




 function stringIndexOf (cs,str,mat,from)
 {
 var stxt,mtxt;
 if(str==undefined)      { return -1; }
 if(arguments.length<3)  { return -1; }
 if(arguments.length>4)  { return -1; }
 if(cs)
  {
  stxt=str;
  mtxt=mat;
  }
 else
  {
  stxt=str.toLowerCase();
  mtxt=mat.toLowerCase();
  }
 if(arguments.length==3)  { return stxt.indexOf(mtxt);  }
 if(str==undefined||str.length<=0) { return -1; }
 if(stxt==undefined||stxt.length==undefined||stxt.length<=0)  { return -1; }
 return stxt.indexOf(mtxt,from);
 }




 function stringLastCharGet (str)
 {
 var ch;
 if(aa_profile_group_string) { aaProfilerHit(arguments.callee.name); }
 ch=str[str.length-1];
 return ch;
 }




 function stringLastCharTrim (str)
 {
 str=str.substring(0,str.length-1);
 return str;
 }


 function stringFirstCharGet (str)
 {
 var ch;
 ch=str[0];
 return ch;
 }




 function stringFirstCharTrim (str)
 {
 str=str.substring(1,str.length);
 return str;
 }



 function stringSha256 (str)
 {
 var mathPow,maxWord,lengthProperty,i,j,result,words,strBitLength;
 var hash,k,primeCounter,isComposite,candidate,w,oldHash;
 var i2,w15,a,b,e,temp1,temp2,w2;
 function _rightRotate(value,amount) { return (value>>>amount)|(value<<(32-amount)); };
 lengthProperty='length'
 result='';
 words=[];
 strBitLength=str[lengthProperty]*8;
 mathPow=Math.pow;
 maxWord=mathPow(2,32);
 hash=stringSha256.h=stringSha256.h||[];
 k=stringSha256.k=stringSha256.k||[];
 primeCounter=k[lengthProperty];
 isComposite={};
 for(candidate=2;primeCounter<64;candidate++)
  {
  if(isComposite[candidate]) { continue; }
  for(i=0;i<313;i+=candidate) { isComposite[i]=candidate; }
  hash[primeCounter]=(mathPow(candidate,.5)*maxWord)|0;
  k[primeCounter++]=(mathPow(candidate,1/3)*maxWord)|0;
  }
 str+='\x80';
 while(str[lengthProperty]%64-56) { str+='\x00'; }
 for(i=0;i<str[lengthProperty];i++)
  {
  j=str.charCodeAt(i);
  if(j>>8) { return; }
  words[i>>2]|=j<<((3-i)%4)*8;
  }
 words[words[lengthProperty]]=((strBitLength/maxWord)|0);
 words[words[lengthProperty]]=(strBitLength)
 for(j=0;j<words[lengthProperty];)
  {
  w=words.slice(j,j+=16);
  oldHash=hash;
  hash=hash.slice(0,8);
  for(i=0;i<64;i++)
   {
   i2=i+j;
   w15=w[i-15],w2=w[i-2];
   a=hash[0],e=hash[4];
   temp1=hash[7]+(_rightRotate(e,6)^_rightRotate(e,11)^_rightRotate(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:
    (
    w[i-16]+(_rightRotate(w15,7)^_rightRotate(w15,18)^(w15>>>3))+w[i-7]+(_rightRotate(w2,17)^_rightRotate(w2,19)^(w2>>>10)))|0);
    temp2=(_rightRotate(a,2)^_rightRotate(a,13)^_rightRotate(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
    hash=[(temp1+temp2)|0].concat(hash);
    hash[4]=(hash[4]+temp1)|0;
    }
  for(i=0;i<8;i++) { hash[i]=(hash[i]+oldHash[i])|0; }
  }
 for(i=0;i<8;i++)
  {
  for(j=3;j+1;j--) { b=(hash[i]>>(j*8))&255;  result+=((b<16)?0:'')+b.toString(16);   }
  }
 return result;
 }



 function stringUuid (usedash)
 {
 if(usedash)
  {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
  }
 return ([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));
 }



 function stringBase64FromUint8 (buffer)
 {
 var bin,len,i;
 bin="";
 len=buffer.byteLength;
 for(i=0;i<len;i++) {  bin+=String.fromCharCode(buffer[i]); }
 return window.btoa(bin);
 }



 function stringBase64ToUint8 (str)
 {
 var bs,len,bytes,i;
 bs=window.atob(str);
 len=bs.length;
 bytes=new Uint8Array(len);
 for(i=0;i<len;i++) { bytes[i]=bs.charCodeAt(i); }
 return bytes;//bytes.buffer;
 }


 function stringSplitter (str,by)
 {
 return str.split(by).reduce((accum,curr)=>
  {
  if(accum.isConcatting)           { accum.soFar[accum.soFar.length-1]+=','+curr;  }
  else                             { accum.soFar.push(curr);                       }
  if(curr.split('"').length%2==0)  { accum.isConcatting=!accum.isConcatting;       }
  return accum;
  },
 {soFar:[],isConcatting:false}).soFar;
 }




 function stringTime (unixtimestamp)
 {
 var ux,a,months,year,month,date,hour,min,sec,time,ap;
 if(aa_profile_group_string) { aaProfilerHit(arguments.callee.name); }
 ux=parseInt(unixtimestamp/1000);
 a=new Date(ux);
 months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 year=a.getFullYear();
 month=months[a.getMonth()];
 date=a.getDate();
 hour=a.getHours();
 min=a.getMinutes();
 sec=a.getSeconds();
 if(min<10)   { min="0"+min; }
 if(sec<10)   { sec="0"+sec; }
 if(hour<12)  { ap="am";           } else
 if(hour>12)  { ap="pm"; hour-=12; } else
 if(hour==12) { ap="pm"; }
 year=year%1000;
 time=date+' '+month+' '+year+'  '+hour+':'+min+':'+sec+" "+ap;
 return time;
 }




 function stringParms (name)
 {
 var txt,a;
 txt=name+"(";
 for(a=1;a<arguments.length;a++)
  {
  if(a>1) { txt+=","; }
  txt+=arguments[a];
  }
 txt+=")";
 return txt;
 }



/*-----------------------------------------------------------------------*/



 function envObjInit ()
 {
 var state;
 if(Object.keys(env_obj).length!=0) { return; }
 env_obj.info=envInfoGet();
 env_obj.event_proc=null;
 env_obj.event_listening=false;
 env_obj.is_init=true;
 state={};
 state.wheel=0;
 state.is_focus=true;
 state.wheel_event_count=0;
 state.focus_event_count=0;
 state.event_count=0;
 state.prev_event_count=0;
 state.is_reloading=false;
 env_obj.state=state;
 env_obj.event_listening=true;
 env_obj.event_proc=envEventProc;
 window.addEventListener("wheel",env_obj.event_proc);
 window.addEventListener("blur",env_obj.event_proc);
 window.addEventListener("focus",env_obj.event_proc);
 }




 function envInfoGet ()
 {
 var obj,brp,check,ti,so,parts,kv,who,mat,off,ver;
 var name,pre,p0,p1,px;
 var isOpera,isFirefox,isSafari,isIE,isEdge,isChrome,isEdgeChromium,isSamsung;
 var fp0,hasLocalStorage,hasSessionStorage,hasIndexDb,isCanvasSupported,isOldIos;
 var elem,keys,canvas,ctx,txt;
 if(env_obj.info) { return env_obj.info; }
 obj={};
 isOpera=(!!window.opr&&!!opr.addons)||!!window.opera||navigator.userAgent.indexOf(' OPR/')>=0;
 isFirefox=typeof InstallTrigger!=='undefined';
 isSafari=/constructor/i.test(window.HTMLElement)||(function (p) { return p.toString()==="[object SafariRemoteNotification]"; })(!window['safari']||(typeof safari!=='undefined'&&safari.pushNotification));
 isIE=false||!!document.documentMode;
 isEdge=!isIE&&!!window.StyleMedia;
 isChrome=(!!window.chrome&&navigator.userAgent.indexOf("Chrome")!=-1);
 isEdgeChromium=isChrome&&(navigator.userAgent.indexOf("Edg")!=-1);
 isSamsung=navigator.userAgent.match(/SamsungBrowser/i);
 isOldIos=(typeof navigator!=="undefined"&&parseFloat((""+(/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))< 10&&!window.MSStream);
 who=-1;
 name="";
 ver="";
 pre="";
 if(isSamsung)      { who=7; name="Samsung"; }  else
 if(isEdgeChromium) { who=6; name="EdgeChromium"; }  else
 if(isChrome)       { who=5; name="Chrome"; }  else
 if(isEdge)         { who=4; name="Edge"; }  else
 if(isIE)           { who=3; name="IE"; }  else
 if(isSafari)       { who=2; name="Safari"; }  else
 if(isFirefox)      { who=1; name="Firefox"; }  else
 if(isOpera)        { who=0; name="Opera"; }
 if(who==1) { pre=" Firefox/";  } else
 if(who==5) { pre=" Chrome/";   } else
 if(who==6) { pre=" Edg/";      }

 if(who==-1)
  {
  while(1)
   {
   if (navigator.userAgent.indexOf("Firefox") != -1 ) { who=1; name="Firefox"; pre=" Firefox/"; break; }
   if (navigator.userAgent.indexOf("Mozilla") != -1 ) { who=1; name="Firefox"; pre=" Firefox/"; break; }
   break;
   }
  }

 if(pre!="")
  {
  mat=pre;
  off=stringIndexOf(false,navigator.userAgent,mat);
  if(off>=0) { off+=mat.length; }
  ver=navigator.userAgent.substring(off);
  off=stringIndexOf(false,ver," ");
  if(off>=0) { ver=ver.substring(0,off); }
  pre=ver;
  }
 obj.platform=navigator.platform;
 obj.ver=ver;
 obj.who=who;
 obj.name=name;
 obj.ua=navigator.userAgent;
 obj.url=window.location;
 obj.browser_args=[];
 so=obj.url.search.substring(1).split("&").reduce(function(result,value)
  {
  parts=value.split('=');
  kv={};
  if(parts[0])
   {
   kv.key=decodeURIComponent(parts[0]);
   kv.val=decodeURIComponent(parts[1]);
   obj.browser_args.push(kv);
   }
  },{})
 obj.browser_pathpart=obj.url.pathname.split('/');
 brp=navigator.platform;
 ti=stringIndexOf(0,brp,"win");
 if(ti>=0) { obj.is_win=true;  }
 else      { obj.is_win=false; }
 obj.is_standalone=(window.matchMedia('(display-mode: standalone)').matches);
 check=false;
 (function(a)
  {
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
   {
   check=true;
   }
  })(navigator.userAgent||navigator.vendor||window.opera);
 obj.is_mobile=check;
 if(obj.is_mobile==true&&obj.is_win==false) { obj.is_real_mobile=true;  }
 else                                       { obj.is_real_mobile=false; }
 try{ hasLocalStorage=!!window.localStorage;      }   catch(e) { hasLocalStorage=true;  };
 try{ hasSessionStorage=!!window.sessionStorage;  }   catch(e) { hasSessionStorage=true;  };
 try{ hasIndexDb=!!window.indexedDB;              }   catch(e) { hasIndexDb=true;  };
 elem=document.createElement('canvas');
 isCanvasSupported=!!(elem.getContext && elem.getContext('2d'));
 keys=[];
 //keys.push(navigator.userAgent);
 //keys.push(navigator.language);
 keys.push(screen.colorDepth);
 keys.push(new Date().getTimezoneOffset());
 keys.push(hasSessionStorage);
 keys.push(hasLocalStorage);
 keys.push(hasIndexDb);
 if(document.body){  keys.push(typeof(document.body.addBehavior));      }
 else             {  keys.push(typeof undefined);      }
 keys.push(typeof(window.openDatabase));
 //keys.push(navigator.cpuClass);
 //keys.push(navigator.platform);
 //keys.push(navigator.doNotTrack);
 if(isCanvasSupported)
  {
  canvas=document.createElement('canvas');
  ctx=canvas.getContext('2d');
  txt='aaLib.DNA.RNA.NOJAB.NOCVPP.fingerprint.unq';
  ctx.textBaseline="top";
  ctx.font="14.43px Arial";
  ctx.textAlign="alphabetic";
  ctx.fillStyle="#f60";
  ctx.fillRect(125,1,62.123,20.234);
  ctx.fillStyle="#069";
  ctx.fillText(txt,2,15);
  ctx.fillStyle="rgba(102,204,0,0.72)";
  ctx.fillText(txt,4,17);
  keys.push(canvas.toDataURL("image/jpeg",0.57));
  }
 fp0=""+keys.join('###');
 obj.finger_print=stringSha256(fp0);
 if(obj.who==-1||obj.name=="")
  {
  if(stringIndexOf(false,obj.ua,"iphone")>=0)
   {
   if(stringIndexOf(false,obj.ua,"safari")>=0)
    {
    if(stringIndexOf(false,obj.ua,"apple")>=0)
     {
     if(obj.who==-1)  { obj.who=2; }
     if(obj.name=="") { obj.name="Safari"; }
     p0=stringIndexOf(false,obj.ua,"version/");
     if(p0>=0)
      {
      p1=stringIndexOf(false,obj.ua," ",p0);
      if(p1>0&&p1>p0)
       {
       p0+=8;
       px=obj.ua.substring(p0,p1);
       obj.ver=px;
       }
      }

     }
    }
   }
  }
 return obj;
 }





 function envBrowserArg (key)
 {
 var b;
 for(b=0;b<aa.env_obj.info.browser_args.length;b++)
  {
  if(aa.env_obj.info.browser_args[b].key!=key) { continue; }
  return(aa.env_obj.info.browser_args[b]);
  }
 return "";
 }


 function envBrowserArgByKey (key)
 {
 var b;
 try
  {
  for(b=0;b<aa.env_obj.info.browser_args.length;b++)
   {
   if(aa.env_obj.info.browser_args[b].key!=key) { continue; }
   return(aa.env_obj.info.browser_args[b]);
   }
  return "";
  }
 catch(e)
  {
  alert(e);
  return null;
  }
 }



 function envBrowserArgByIndex (index)
 {
 try
  {
  if(index>=aa.env_obj.info.browser_args.length) { return ""; }
  return(aa.env_obj.info.browser_args[index]);
  }
 catch(e)
  {
  alert(e);
  return null;
  }
 }




 function envEventProc (event)
 {
 var w,f,msg;
 if(aa_profile_group_env) { aaProfilerHit(arguments.callee.name); }
 if(event==null) { alert("epnull"); return; }
 switch(event.type)
  {
  case "blur":
  if(env_obj.state.is_focus==true)
   {
   env_obj.state.is_focus=false;
   env_obj.state.focus_event_count++;
   env_obj.state.event_count++;
   }
  if(aa.pointer_obj.state.is_started)
   {
   for(f=0;f<aa.pointer_obj.state.finger_cache.length;f++)
    {
    if(aa.pointer_obj.state.finger_cache[f].length>0)
     {
     msg={};
     msg.finger=f;
     msg.event={};
     msg.event.type="blurcancel";
     msg.event.isPrimary=aa.pointer_obj.state.finger_cache[f][0].event.isPrimary;
     msg.event.pointerId=aa.pointer_obj.state.finger_cache[f][0].event.pointerId;
     aa.queueWrite(aa.pointer_obj.state.event_queue_handle,msg);
     aa.pointer_obj.state.event_queue_status=aa.queueStatus(aa.pointer_obj.state.event_queue_handle);
     }
    }
   }
  break;
  case "focus":
  if(env_obj.state.is_focus==false)
   {
   env_obj.state.is_focus=true;
   env_obj.state.focus_event_count++;
   env_obj.state.event_count++;
   }
  break;
  case "wheel":
  w=event.deltaY;
  if(w<0) { w=+1; } else
  if(w>0) { w=-1; } else { w=0; }
  if(env_obj.state.wheel!=w)
   {
   env_obj.state.wheel=w;
   env_obj.state.wheel_event_count++;
   env_obj.state.event_count++;
   }
  break;
  }
 }













 function envDisplayGet ()
 {
 var swp,ori,ora,disp={};

 if(aa_profile_group_env) { aaProfilerHit(arguments.callee.name); }
 ori=(screen.orientation||{}).type||screen.mozOrientation||screen.msOrientation||window.orientation;
 ora=(screen.orientation||{}).angle;
 disp.win_wid=document.documentElement.clientWidth||window.innerWidth||document.body.clientWidth;
 disp.win_hit=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
 disp.scr_wid=screen.width;
 disp.scr_hit=screen.height;

 if(ora==undefined||ora==null)
  {
  if(Number.isInteger(ori))  {   ora=ori;   ori=null;   }
  if(ori==undefined||ori==null)
   {
   if(Number.isInteger(ora))
    {
    switch(ora)
     {
     case   0: ori="Portrait-primary"; break;
     case  90: ori="Landscape-primary"; break;
     case 180: ori="Portrait-secondary"; break;
     case -90:
     case 270: ori="Landscape-secondary"; break;
     default: aa.debugAlert("ora="+ora); break;
     }
    }
   }
  }

 disp.orient=ori;
 disp.angle=ora;


 disp.density=1.0;
 if(window.devicePixelRatio!=0.0) { disp.density=window.devicePixelRatio; }

 disp.is_fse=false;
 if(document.fullscreenElement) { disp.is_fse=true;  }

 disp.is_landscape=false;
 if(disp.win_wid>disp.win_hit) { disp.is_landscape=true;  }

 if(disp.is_landscape==true)
  {
  if(disp.scr_hit>disp.scr_wid)
   {
   swp=disp.scr_hit;
   disp.scr_hit=disp.scr_wid;
   disp.scr_wid=swp;
   }
  }
 else
  {
  if(disp.scr_wid>disp.scr_hit)
   {
   swp=disp.scr_hit;
   disp.scr_hit=disp.scr_wid;
   disp.scr_wid=swp;
   }
  }
 disp.wh_ratio=disp.win_wid/disp.win_hit;
 disp.hw_ratio=disp.win_hit/disp.win_wid;
 return disp;
 }




 function envDisplayCompareText (disp,lastdisp)
 {
 var txt="";
 while(1)
  {
  if(lastdisp.win_wid==undefined||disp.win_wid!=lastdisp.win_wid) { txt+="1Winwid "; }
  if(lastdisp.win_hit==undefined||disp.win_hit!=lastdisp.win_hit) { txt+="2Winhit "; }
  if(lastdisp.scr_wid==undefined||disp.scr_wid!=lastdisp.scr_wid) { txt+="4Scrwid "; }
  if(lastdisp.scr_hit==undefined||disp.scr_hit!=lastdisp.scr_hit) { txt+="8Scrhit "; }
  if(lastdisp.density==undefined||disp.density!=lastdisp.density) { txt+="16Dens "; }
  if(lastdisp.is_fse==undefined||disp.is_fse!=lastdisp.is_fse)   { txt+="32Fse "; }
  if(lastdisp.is_landscape==undefined||disp.is_landscape!=lastdisp.is_landscape) { txt+="64IsLAND "; }
  if(lastdisp.wh_ratio==undefined||disp.wh_ratio!=lastdisp.wh_ratio) { txt+="128whRAt "; }
  if(lastdisp.hw_ratio==undefined||disp.hw_ratio!=lastdisp.hw_ratio) { txt+="256hwRAt "; }
  if(lastdisp.orient==undefined||disp.orient!=lastdisp.orient)   { txt+="512Orient "; }
  if(lastdisp.angle==undefined||disp.angle!=lastdisp.angle)   { txt+="1024Angle "; }

  break;
  }
 return txt;
 }



 function envDisplayCompare (disp,lastdisp)
 {
 var change=0;
 if(aa_profile_group_env) { aaProfilerHit(arguments.callee.name); }
 while(1)
  {
  if(lastdisp.win_wid==undefined||disp.win_wid!=lastdisp.win_wid) { change+=1; }
  if(lastdisp.win_hit==undefined||disp.win_hit!=lastdisp.win_hit) { change+=2; }
  if(lastdisp.scr_wid==undefined||disp.scr_wid!=lastdisp.scr_wid) { change+=4; }
  if(lastdisp.scr_hit==undefined||disp.scr_hit!=lastdisp.scr_hit) { change+=8; }
  if(lastdisp.density==undefined||disp.density!=lastdisp.density) { change+=16; }
  if(lastdisp.is_fse==undefined||disp.is_fse!=lastdisp.is_fse)   { change+=32; }
  if(lastdisp.is_landscape==undefined||disp.is_landscape!=lastdisp.is_landscape) { change+=64; }
  if(lastdisp.wh_ratio==undefined||disp.wh_ratio!=lastdisp.wh_ratio) { change+=128; }
  if(lastdisp.hw_ratio==undefined||disp.hw_ratio!=lastdisp.hw_ratio) { change+=256; }
  if(lastdisp.orient==undefined||disp.orient!=lastdisp.orient)   { change+=512; }
  if(lastdisp.angle==undefined||disp.angle!=lastdisp.angle)   { change+=1024; }
  break;
  }
 return change;
 }





 function envZoomFix()
 {
 var viewport,body,wid,hit,isff;
 aa.debugAlert();
 viewport=document.querySelector('meta[name="viewport"]');
 if(viewport===null)
  {
  viewport=document.createElement("meta");
  viewport.setAttribute("name","viewport");
  document.head.appendChild(viewport);
  viewport=document.querySelector('meta[name="viewport"]');
  }
 if(viewport)
  {
  wid=200;
  hit=200;
  isff=typeof InstallTrigger!=='undefined';
  if(isff)
   {
   body=document.getElementsByTagName('body')[0];
   wid=(document.documentElement.clientWidth||window.innerWidth||document.body.clientWidth);
   hit=(document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight);
   }
  viewport.content="initial-scale=1";
  viewport.content="width="+(wid);
  viewport.content="height="+(hit);
  viewport.content="maximum-scale=1"; // newly added
  viewport.content="user-scalable=0"; // was no
//  viewport.content="initial-scale=1,width="+(wid)+",maximum-scale=1,user-scalable=0";
  return true;
  }
 return false;
 }




 function envTitleSet (title)
 {
 document.title=title;
 }



 function envTitleGet ()
 {
 return document.title;
 }



 function envReload (forced,ms)
 {
 if(aa.env_obj.state.is_reloading===true) { aa.debugAlert(); return true; }
 ms=parseInt(ms+aa.numRand(500));
 setTimeout(function() { window.location.reload(forced);  return false;  }, ms);
 return true;
 }


 function envGoto (ms,url)
 {
 if(aa.env_obj.state.is_reloading===true) { aa.debugAlert(); return true; }
 ms=parseInt(ms+aa.numRand(500));
 setTimeout(function() { window.location.href=url;  return false;  }, ms);
 return true;
 }



 function envFavIconGet ()
 {
 return document.getElementById("favicon");
 }




 function envFavIconSet (url)
 {
 var fi;
 fi=envFavIconGet();
 fi.href=url;
 }



 function envManifestInit (id)
 {
 var obj;
 obj={};
 obj.type="manifest";
 obj.id=id;
 obj.manifest={};
 //document.querySelector("#"+obj.id).setAttribute('href','/my-dynamic-manifest-url.json');
 return obj;
 }



 function envManifestSet (obj,key,val)
 {
 if(obj.type!="manifest") { return null; }
 obj.manifest[key]=val;
 return obj;
 }



 function envManifestApply (obj)
 {
 var sm,bl,mu;
 if(obj.type!="manifest") { return null; }
 sm=JSON.stringify(obj.manifest);
 bl=new Blob([sm],{type:'application/json'});
 mu=URL.createObjectURL(bl);
 document.querySelector('#manifestId').setAttribute('href',mu);
 return true;
 }




 function zenvManifestApply (obj)
 {
 var sid,sm,blob,mu;
 var mf,nm,link;
 if(obj.type!="manifest") { return false; }
 sm=JSON.stringify(obj.manifest);
 ///aa.debugLogger(5,sm);
 //sm=obj.
 blob=new Blob([sm],{type:'application/json'});
 mu=URL.createObjectURL(blob);
 document.getElementById(obj.id).setAttribute('href',mu);
 /*
 document.querySelector("#"+obj.id).setAttribute('href',mu);
 mf=document.getElementById(obj.id);
 nm=document.createElement('link');
 nm.id='manifest';
 nm.rel='manifest';
 nm.href=mu;
 mf.parentNode.replaceChild(nm,mf)
 link=document.createElement('link');
 link.href=mu;
 link.rel='manifest';
 document.getElementsByTagName('head')[0].appendChild(link);
*/
 return true;
 }




/*
 man=aa.envManifestInit();
 man=aa.envManifestSet(man,"background_color","#2f3399");
 man=aa.envManifestSet(man,"categories",["books","education","medical"]);
 man=aa.envManifestSet(man,"description","You see what I'm saying!");
 man=aa.envManifestSet(man,"dir","auto");
 man=aa.envManifestSet(man,"display","standalone");
 man=aa.envManifestSet(man,"icons",[{"src":"https://mebeam.com/favicon.png","sizes":"32x32","type":"image/png"},{"src":"https://mebeam.com/favicon192x192.png","sizes":"192x192","type":"image/png"},{"src":"https://mebeam.com/splash512x512.png","sizes":"512x512","type":"image/png"}]);
 man=aa.envManifestSet(man,"lang","en-US");
 man=aa.envManifestSet(man,"name","MeBeam. You see what I'm saying!");
 man=aa.envManifestSet(man,"orientation","portrait");
 man=aa.envManifestSet(man,"scope","https://mebeam.com/");
 man=aa.envManifestSet(man,"screenshots",[{"src":"https://mebeam.com/favicon192x192.png","sizes":"192x192","type":"image/png"}]);
 man=aa.envManifestSet(man,"short_name","MeBeam");
 man=aa.envManifestSet(man,"start_url","https://mebeam.com/");
 man=aa.envManifestSet(man,"theme_color","#2FfF7F");
 aa.envManifestApply(man,"manifestId");
*/

/*-----------------------------------------------------------------------*/





 function queueObjInit ()
 {
 if(Object.keys(queue_obj).length!=0) { return; }
 queue_obj.handef=handleDefine("queue",256);
 queue_obj.is_init=true;
 }




 function queueCreate ()
 {
 var i,h,obj;
 if(aa_profile_group_queue) { aaProfilerHit(arguments.callee.name); }
 for(i=0;i<queue_obj.handef.slots;i++)
  {
  obj=queue_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  obj.ms_start=timerMsRunning();
  obj.msgs_total=0|0;
  obj.msgs_queued=0|0;
  obj.msgs_queue=[];
  h=handleUse(queue_obj.handef,i)
  return h;
  }
 return 0;
 }



 function queueDestroy (handle)
 {
 var obj;
 if((obj=handleCheck(queue_obj.handef,handle))==null) { return false; }
 obj.msgs_queue=[];
 handleRemove(queue_obj.handef,handle);
 return true;
 }




 function queueGet (handle)
 {
 if(1&&aa_profile_group_queue) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(handleCheck(queue_obj.handef,handle));
 }



 function queueWrite (handle,data)
 {
 var obj;
 if(1&&aa_profile_group_queue) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=handleCheck(queue_obj.handef,handle))==null) { alert(); aa.debugLogger(5,"queuewrite handle check fail "+handle); return false; }
 obj.msgs_queued++;
 obj.msgs_queue.push(data);
 return true;
 }


 function queueRead (handle)
 {
 var msg,obj,bu8;
 if(1&&aa_profile_group_queue) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=handleCheck(queue_obj.handef,handle))==null) {  return null; }
 if(obj.msgs_queued==0) {   return null; }
 msg=obj.msgs_queue.shift();
 obj.msgs_queued--;
 obj.msgs_total++;
 return msg;
 }



 function queuePeek (handle,ofs)
 {
 var msg,obj;
 if(1&&aa_profile_group_queue) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=handleCheck(queue_obj.handef,handle))==null) { return null; }
 if(ofs<0) { return null; }
 if(ofs>=obj.msgs_queued) { return null; }
 msg=obj.msgs_queue[ofs];
 return msg;
 }



 function queueDiscard (handle)
 {
 var obj;
 if(1&&aa_profile_group_queue) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=handleCheck(queue_obj.handef,handle))==null) { return false; }
 if(obj.msgs_queued==0) {  return false; }
 obj.msgs_queue.shift();
 obj.msgs_queued--;
 obj.msgs_total++;
 return true;
 }




 function queueStatus (handle)
 {
 var obj,info;
 if(1&&aa_profile_group_queue) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=handleCheck(queue_obj.handef,handle))==null) { alert(handle); return null; }
 info={};
 info.msgs_queued=obj.msgs_queued;
 info.msgs_total=obj.msgs_total;
 return info;
 }




/*-----------------------------------------------------------------------*/





 function pointerObjInit ()
 {
 var state,c;
 if(Object.keys(pointer_obj).length!=0) { return; }
 state={};
 state.is_started=false;
 state.finger_cache=dataArray2DCreate(10);
 state.finger_read=[10];
 state.fingers_down=0;
 pointer_obj.state=state;
 pointer_obj.is_init=true;
 }




 function pointerStart ()
 {
 if(pointer_obj.state.is_started!=false) { return false; }
// alert();
 pointer_obj.state.is_started=true;
 pointer_obj.state.event_count=0;
 pointer_obj.state.event_queue_handle=aa.queueCreate();
 pointer_obj.state.event_queue_status=aa.queueStatus(pointer_obj.state.event_queue_handle);
 aa.handleCommentSet(pointer_obj.state.event_queue_handle,"pointerQueue");
 window.addEventListener("pointerdown",function(ev) { pointerOnEvent("pointerdown",ev); },false);
 window.addEventListener("pointerup",function(ev)   { pointerOnEvent("pointerup",ev); },false);
 window.addEventListener("pointermove",function(ev) { pointerOnEvent("pointermove",ev); },false);
 window.addEventListener("pointerover",function(ev) { pointerOnEvent("pointerover",ev); },false);
 window.addEventListener("pointercancel",function(ev) { pointerOnEvent("pointercancel",ev); },false);
 window.addEventListener("pointerout",function(ev) { pointerOnEvent("pointerout",ev); },false);
 window.addEventListener("pointerleave",function(ev) { pointerOnEvent("pointerleave",ev); },false);
 window.addEventListener("pointerenter",function(ev) { pointerOnEvent("pointerenter",ev); },false);
 window.addEventListener("gotpointercapture",function(ev) { pointerOnEvent("gotpointercapture",ev); },false);
 window.addEventListener("lostpointercapture",function(ev) { pointerOnEvent("lostpointercapture",ev); },false);
 window.addEventListener("touchstart",function(ev) { touchOnEvent("touchstart",ev); },false);
 return true;
 }






 function pointerCacheAdd (msg)
 {
 var fi,fx,fc,fl;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) {   return false; }
 if(msg.event.pointerId<0) {    return false; }
 for(fi=0;fi<pointer_obj.state.finger_cache.length;fi++)
  {
  fl=pointer_obj.state.finger_cache[fi].length;
  if(fl==0) { continue; }
  fc=pointer_obj.state.finger_cache[fi][0];
  if(fc.event.pointerId==msg.event.pointerId)
   {
   pointer_obj.state.finger_cache[fi].push(msg);
   return true;
   }
  }
 for(fi=0;fi<pointer_obj.state.finger_cache.length;fi++)
  {
  fl=pointer_obj.state.finger_cache[fi].length;
  if(fl!=0) { continue; }
  pointer_obj.state.finger_cache[fi].push(msg);
  pointer_obj.state.fingers_down++;
  return true;
  }
 return false;
 }



 function pointerCacheRemove (ptrid)
 {
 var fi,fl,fc;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) { return false; }
 if(ptrid<0) { return false; }
 for(fi=0;fi<pointer_obj.state.finger_cache.length;fi++)
  {
  fl=pointer_obj.state.finger_cache[fi].length;
  if(fl==0) { continue; }
  fc=pointer_obj.state.finger_cache[fi][0];
  if(fc.event.pointerId!=ptrid) { continue; }
  pointer_obj.state.finger_cache[fi]=[];
  pointer_obj.state.fingers_down--;
  pointer_obj.state.finger_read[fi]=0;
  return true;
  }
 return false;
 }


 function pointerCacheGetById (ptrid)
 {
 var fi,fl,fc;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) { return null; }
 if(ptrid<0) { return null; }
 for(fi=0;fi<pointer_obj.state.finger_cache.length;fi++)
  {
  fl=pointer_obj.state.finger_cache[fi].length;
  if(fl==0) { continue; }
  fc=pointer_obj.state.finger_cache[fi][0];
  if(fc.event.pointerId!=ptrid) { continue; }
  return pointer_obj.state.finger_cache[fi];
  }
 return null;
 }


 function pointerCacheGetByIndex (index)
 {
 var fi,fl,fc;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) { return null; }
 if(index<0) { return null; }
 if(index>=pointer_obj.state.finger_cache.length) { return null; }
 fl=pointer_obj.state.finger_cache[index].length;
 if(fl==0) { return null; }
 fc=pointer_obj.state.finger_cache[index][0];
 return pointer_obj.state.finger_cache[index];
 }



 function touchOnEvent (name,ev)
 {
 var msg;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 msg={};
 ev.preventDefault();
 return true;
 }



 function pointerOnEvent (name,ev)
 {
 var msg;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 //if(name=="gotpointercapture"||name=="pointerdown")  { window.releasePointerCapture(ev.pointerId);  }


 msg={};
 msg.event={};
 msg.event.pointerType=ev.pointerType;
 msg.event.type=ev.type;
 msg.event.pageX=ev.pageX;
 msg.event.pageY=ev.pageY;
 msg.event.offsetX=ev.offsetX;
 msg.event.offsetY=ev.offsetY;

// msg={};
// msg.event=ev;

 aa.queueWrite(pointer_obj.state.event_queue_handle,msg);
 pointer_obj.state.event_queue_status=aa.queueStatus(pointer_obj.state.event_queue_handle);
 //uixHudLog(10,4,pointer_obj.state.event_queue_handle+" "+ev.pointerType+"  "+ev.type+"  "+pointer_obj.state.event_queue_status.msgs_total+" "+pointer_obj.state.event_queue_status.msgs_queued);

 ev.preventDefault();
 return true;
 }





 function pointerPeek (ofs)
 {
 var msg;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) { return null; }
 msg=aa.queuePeek(pointer_obj.state.event_queue_handle,ofs);
 return msg;
 }




 function pointerRead ()
 {
 var msg;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) { return null; }
 msg=aa.queueRead(pointer_obj.state.event_queue_handle);
 pointer_obj.state.event_queue_status=aa.queueStatus(pointer_obj.state.event_queue_handle);
 return msg;
 }



 function pointerStatus ()
 {
 var info;
 if(aa_profile_group_ptr) { aaProfilerHit(arguments.callee.name); }
 if(pointer_obj.state.is_started!=true) { return null; }
 pointer_obj.state.event_queue_status=aa.queueStatus(pointer_obj.state.event_queue_handle);
 info={};
 info.msgs_queued=pointer_obj.state.event_queue_status.msgs_queued;
 info.msgs_total=pointer_obj.state.event_queue_status.msgs_total;
 return info;
 }




/*-----------------------------------------------------------------------*/



 function keyboardObjInit ()
 {
 var state,i;
 if(Object.keys(keyboard_obj).length!=0) { return; }
 state={};
 state.is_started=false;
 state.down_count=0;
 state.event_count=0;
 state.hit_map=[];
 for(i=0;i<256;i++) { state.hit_map[i]=0; }
 state.event_queue_handle=0;
 state.event_queue_status=null;
 keyboard_obj.state=state;
 keyboard_obj.is_init=true;
 }







 function keyboardStart ()
 {
 var i;
 if(keyboard_obj.state.is_started!=false) { return false; }
 keyboard_obj.state.is_started=true;
 keyboard_obj.state.down_count=0;
 keyboard_obj.state.event_count=0;
 keyboard_obj.state.hit_map=[];
 for(i=0;i<256;i++) { keyboard_obj.state.hit_map[i]=0; }
 keyboard_obj.state.event_queue_handle=aa.queueCreate();
 keyboard_obj.state.event_queue_status=aa.queueStatus(keyboard_obj.state.event_queue_handle);
 aa.handleCommentSet(keyboard_obj.state.event_queue_handle,"keyboardQueue");
 document.addEventListener('keyup',function(event)    { keyboardOnEvent("keyup",event);    });
 document.addEventListener('keydown',function(event)  { keyboardOnEvent("keydown",event);  });
 document.addEventListener('keypress',function(event) { keyboardOnEvent("keypress",event); });
 return true;
 }



 function keyboardOnEvent (name,ev)
 {
 var msg,kc;
 if(aa_profile_group_kbd) { aaProfilerHit(arguments.callee.name); }
 if(ev.defaultPrevented) { return;  }
 kc=ev.keyCode||ev.key;
 if(isNaN(kc))  {  aa.debugAlert();  }
 msg={};
 msg.name=name;
 msg.keyCode=kc;
 msg.key=ev.key;
 msg.ascii=ev.key.charCodeAt(0);
 msg.alt_key=ev.altKey;
 msg.ctrl_key=ev.ctrlKey;
 msg.shift_key=ev.shiftKey;
 aa.queueWrite(keyboard_obj.state.event_queue_handle,msg);
 keyboard_obj.state.event_queue_status=aa.queueStatus(keyboard_obj.state.event_queue_handle);
 if(name=="keydown")
  {
  if(keyboard_obj.state.hit_map[kc]==0)
   {
   keyboard_obj.state.event_count++;
   keyboard_obj.state.down_count++;
   keyboard_obj.state.hit_map[kc]=1;
   }
  }
 else
 if(name=="keyup")
  {
  if(keyboard_obj.state.hit_map[kc]>0)
   {
   keyboard_obj.state.event_count++;
   keyboard_obj.state.down_count--;
   keyboard_obj.state.hit_map[kc]=0;
   }
  }
 }



 function keyboardPeek (ofs)
 {
 var msg;
 if(aa_profile_group_kbd) { aaProfilerHit(arguments.callee.name); }
 if(keyboard_obj.state.is_started!=true) { return null; }
 msg=aa.queuePeek(keyboard_obj.state.event_queue_handle,ofs);
 return msg;
 }




 function keyboardRead ()
 {
 var msg;
 if(aa_profile_group_kbd) { aaProfilerHit(arguments.callee.name); }
 if(keyboard_obj.state.is_started!=true) { return null; }
 msg=aa.queueRead(keyboard_obj.state.event_queue_handle);
 keyboard_obj.state.event_queue_status=aa.queueStatus(keyboard_obj.state.event_queue_handle);
 return msg;
 }






 function keyboardStatus ()
 {
 var i,j,info,len;
 if(aa_profile_group_kbd) { aaProfilerHit(arguments.callee.name); }
 if(keyboard_obj.state.is_started!=true) { return null; }
 keyboard_obj.state.event_queue_status=aa.queueStatus(keyboard_obj.state.event_queue_handle);
 info={};
 info.down_count=keyboard_obj.state.down_count;
 info.event_count=keyboard_obj.state.event_count;
 info.hit_rep=[];
 info.hit_key=[];
 len=keyboard_obj.state.hit_map.length;
 j=0;
 for(i=0;i<len;i++)
  {
  if(keyboard_obj.state.hit_map[i]==0) { continue; }
  info.hit_key[j]=i;
  info.hit_rep[j]=keyboard_obj.state.hit_map[i];
  j++;
  }
 if(j!=info.down_count) { aa.debugAlert(); }
 info.msgs_queued=keyboard_obj.state.event_queue_status.msgs_queued;
 info.msgs_total=keyboard_obj.state.event_queue_status.msgs_total;
 return info;
 }






/*-----------------------------------------------------------------------*/





 function storageObjInit ()
 {
 let test='test';
 if(Object.keys(storage_obj).length!=0) { return; }
 try
  {
  localStorage.setItem(test,test);
  localStorage.removeItem(test);
  }
 catch(e)
  {
  alert(e);
  return false;
  }
 storage_obj.handef=handleDefine("storage",64);
 storage_obj.is_init=true;
 }





 function storageCreate (issesh)
 {
 var i,h,obj;
 if(storage_obj.is_init!=true) { return 0; }
 for(i=0;i<storage_obj.handef.slots;i++)
  {
  obj=storage_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  h=handleUse(storage_obj.handef,i)
  if(issesh) { obj.is_session=true; }
  else       { obj.is_session=false; }
  obj.count=0;
  if(obj.is_session)   {   obj.count=sessionStorage.length;   }
  else                 {   obj.count=localStorage.length;     }
  return h;
  }
 return 0;
 }





 function storageDestroy (handle)
 {
 var obj;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return false; }
 handleRemove(storage_obj.handef,handle);
 return true;
 }





 function storageGet (handle)
 {
 return(handleCheck(storage_obj.handef,handle));
 }




 function storagePurge (handle)
 {
 var obj;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return false; }
 if(obj.is_session)  {  sessionStorage.clear();  }
 else                {  localStorage.clear();  }
 if(obj.is_session)  {  obj.count=sessionStorage.length;   }
 else                {  obj.count=localStorage.length;     }
 return true;
 }




 function storageRead (handle,key)
 {
 var obj,val;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return false; }
 if(obj.is_session)  {  val=sessionStorage.getItem(key);  }
 else                {  val=localStorage.getItem(key);  }
 if(obj.is_session)  {  obj.count=sessionStorage.length;   }
 else                {  obj.count=localStorage.length;     }
 return val;
 }




 function storageWrite (handle,key,val)
 {
 var obj;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return false; }
 if(obj.is_session)  {  sessionStorage.setItem(key,val);  }
 else                {  localStorage.setItem(key,val);  }
 if(obj.is_session)  {  obj.count=sessionStorage.length;   }
 else                {  obj.count=localStorage.length;     }
 return true;
 }



 function storageRemove (handle,key)
 {
 var obj;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return false; }
 if(obj.is_session)  {  sessionStorage.removeItem(key);  }
 else                {  localStorage.removeItem(key);  }
 if(obj.is_session)  {  obj.count=sessionStorage.length;   }
 else                {  obj.count=localStorage.length;     }
 return true;
 }






 function storageTuple (handle,index)
 {
 var obj,key,val,nfo;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return false; }
 if(obj.is_session)  {  key=sessionStorage.key(index);  val=sessionStorage.getItem(key);  }
 else                {  key=localStorage.key(index);    val=localStorage.getItem(key);    }
 if(obj.is_session)  {  obj.count=sessionStorage.length;   }
 else                {  obj.count=localStorage.length;     }
 nfo={};
 nfo.key=key;
 nfo.val=val;
 return nfo;
 }





 function storageStatus (handle)
 {
 var obj,info;
 if((obj=handleCheck(storage_obj.handef,handle))==null) { return null; }
 info={};
 if(obj.is_session)  { info.is_session=true;   info.count=sessionStorage.length;   }
 else                { info.is_session=false;  info.count=localStorage.length;     }
 return info;
 }




/*-----------------------------------------------------------------------*/



 function guiObjInit ()
 {
 if(Object.keys(gui_obj).length!=0) { return; }
 gui_obj.handef=handleDefine("gui",64);
 gui_obj.is_init=true;
 gui_obj.spot_array=[];
 }


//       fill: this is the default value which stretches the image to fit the content box, regardless of its aspect-ratio.
//    contain: increases or decreases the size of the image to fill the box whilst preserving its aspect-ratio.
//      cover: the image will fill the height and width of its box, once again maintaining its aspect ratio but often cropping the image in the process.
//       none: image will ignore the height and width of the parent and retain its original size.
// scale-down: the image will compare the difference between none and contain in order to find the smallest concrete object size.



 function guiCreate (type,id)
 {
 var s,h,obj;
 switch(type)
  {
  default:  return 0;
  case "video":
  case "canvas":
  case "img":
  case "table":
  case "tr":
  case "td":
  case "div":
  case "span":
  case "p":
  case "source":
  break;
  }
 for(s=0;s<gui_obj.handef.slots;s++)
  {
  obj=gui_obj.handef.array[s];
  if(obj.in_use!=false)                   { continue;   }
  if((h=handleUse(gui_obj.handef,s))==0)  { return 0;   }
  obj.type=type;
   obj.dom_size_set=false; //========
   obj.css_size_set=false;
  obj.vars={};
  obj.vars.is_retina=false;
  obj.vars.stage=0;
  if(id) {  obj.id=id;           }
  else   {  obj.id=type+"id"+s;  }
  obj.ctx=null;
  obj.dom=document.createElement(type);
  obj.dom.id=obj.id;
  obj.dom.setAttribute('id',obj.id);
  if(type=="video")
   {
   obj.dom.volume=0;
   obj.dom.muted=true;  //////////===================
   obj.dom.autoplay=false;
   obj.dom.controls=false;//false;
   obj.dom.loop=false;
   }
  obj.dom.style.objectFit="contain";
  obj.dom.style.objectPosition="50% 50%";
  obj.dom.style.position="absolute";
  obj.dom.style.zIndex=1000; // higher zi is on top
  obj.dom.style.opacity=1.0;
  obj.dom.style.display="none";
  aa.guiParentAdd(h,0);
  if(type=="canvas")
   {
   obj.ctx=document.getElementById(obj.id).getContext("2d");
   obj.ctx.self_handle=h;
   obj.ctx.han=h;
   obj.ctx.scale_factor=1.0;
   guiCanvasReset(h);
   }
  return h;
  }
 return 0;
 }





 function guiDestroy (handle)
 {
 var obj;
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 guiParentRemove(handle,0);
 handleRemove(gui_obj.handef,handle);
 return true;
 }






 function guiGet (handle,what)
 {
 var obj;
 if(0&&aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null)   { return null; }
 if((arguments.length==1)||(what==null||what=="obj")) { return obj;           }
 if(arguments.length==2&&what=="dom")                 { return obj.dom;       }
 if(arguments.length==2&&what=="css")                 { return obj.dom.style; }
 if(arguments.length==2&&what=="ctx")                 { return obj.ctx;       }
 if(arguments.length==2&&what=="vars")                { return obj.vars;      }
 return null;
 }





 function guiGroupGet (handle)
 {
 var obj,grp;

 if(1&&aa_profile_group_gui) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 //if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return null; }
 grp={};
 grp.han=handle;
 grp.obj=obj;
 grp.dom=guiGet(grp.han,"dom");
 grp.css=guiGet(grp.han,"css");
 grp.ctx=guiGet(grp.han,"ctx");
 grp.vars=grp.obj.vars;
 return grp;
 }




 function guiIdFind (id)
 {
 var obj,s,c;
 if(1&&aa_profile_group_gui) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 //if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 c=0;
 for(s=0;s<gui_obj.handef.slots;s++)
  {
  if(c>=gui_obj.handef.count) { break; }
  obj=gui_obj.handef.array[s];
  if(obj.in_use!=true) { continue;   }
  if(obj.id==id)   {   return obj.self_handle;   }
  c++;
  }
 return 0;
 }




 function guiParentAdd    (handle,nhandle)
 {
 var obj,nobj;
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(nhandle==0)
  {
  ///document.getElementById("bodid").appendChild(obj.dom);
  document.body.appendChild(obj.dom);
  obj.parent_handle=nhandle;
  }
 else
  {
  if((nobj=handleCheck(gui_obj.handef,nhandle))==null) { return false; }
  obj.dom.appendChild(nobj.dom);
  obj.parent_handle=nhandle;
  }
 return true;
 }


 function guiParentRemove (handle,nhandle)
 {
 var obj,pobj;
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(nhandle==0)
  {
  document.body.removeChild(obj.dom);
  obj.parent_handle=nhandle;
  }
 else
  {
  if((nobj=handleCheck(gui_obj.handef,nhandle))==null) { return false; }
  obj.dom.removeChild(nobj.dom);
  obj.parent_handle=0;
  }
 return true;
 }




 function guiSizeSet (handle,wid,hit)
 {
 var obj,dom;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 dom=obj.dom;
 if(wid!=null) { dom.width=wid;  }
 if(hit!=null) { dom.height=hit; }
 return true;
 }


 function guiVideoSizeSet (handle,wid,hit)
 {
 var obj,dom;
 aleert("this is readonly");
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 dom=obj.dom;
 dom.videoWidth=wid;
 dom.videoHeight=hit;
 return true;
 }





 function guiCssAreaSet (handle,x,y,w,h)
 {
 var obj,css;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 css=obj.dom.style;
 if(x!=null) { css.left=x+"px"; }
 if(y!=null) { css.top=y+"px"; }
 if(w!=null) { css.width=w+"px"; }
 if(h!=null) { css.height=h+"px"; }
 return true;
 }





 function guiCssAreaGet (handle)
 {
 var obj,area,rect;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return null; }
 rect=obj.dom.getBoundingClientRect();
 area={};
 area.type="area";
 area.left=rect.left;
 area.top=rect.top;
 area.width=rect.width;
 area.height=rect.height;
 area.lstr=area.left+"px";
 area.tstr=area.top+"px";
 area.wstr=area.width+"px";
 area.hstr=area.height+"px";
 return area;
 }


 function guiCssCordSet (handle,x,y)
 {
 var obj,css;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 css=obj.dom.style;
 css.left=x+"px";
 css.top=y+"px";
 return true;
 }


 function guiCssSizeSet (handle,w,h)
 {
 var obj,css;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 css=obj.dom.style;
 css.width=w+"px";
 css.height=h+"px";
 return true;
 }



 function guiCanvasFix (handle,wid,hit,csw,csh,hq)
 {
 var obj,ctx,dpr,dom,css,area,w,h;
 //aa.debugAlert();
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { aa.debugAlert(); return false; }
 if(obj.type!="canvas") { return false; }

 ctx=obj.ctx;
 dom=obj.dom;
 css=obj.dom.style;
 dpr=window.devicePixelRatio||1;
 if(!hq) { dpr=1; }

 //area=dom.getBoundingClientRect();
 //area=aa.guiCssAreaGet(handle);
 area=guiCssAreaGet(handle);
 w=Math.floor(wid*dpr);
 h=Math.floor(hit*dpr);

 if((dom.width!=w)||(dom.height!=h))
  {
  dom.width=w;//wid*dpr;
  dom.height=h;//hit*dpr;
  }
 if(ctx.scale_factor!=dpr)
  {
  //aa.debugAlert();
  ctx.scale(dpr,dpr);
  ctx.scale_factor=dpr;
  }
 if((area.width!=csw)||(area.height!=csh))
  {
  dom.style.width=csw+"px";
  dom.style.height=csh+"px";
  }
 return true;
 }


//if(dpr!=group.ctx.scale_factor)   {   group.ctx.scale(dpr,dpr);   group.ctx.scale_factor=dpr;   }




/*
 function scaleCanvas(canvas, context, width, height)
 {
 const devicePixelRatio=window.devicePixelRatio||1;
 const backingStoreRatio=(context.webkitBackingStorePixelRatio||context.mozBackingStorePixelRatio||context.msBackingStorePixelRatio||
                          context.oBackingStorePixelRatio||context.backingStorePixelRatio||1);
 const ratio=devicePixelRatio/backingStoreRatio;
 if(devicePixelRatio!==backingStoreRatio)
  {
  canvas.width=width*ratio;
  canvas.height=height*ratio;
  canvas.style.width=width+'px';
  canvas.style.height=height+'px';
  }
 else
  {
  canvas.width=width;
  canvas.height=height;
  canvas.style.width='';
  canvas.style.height='';
  }
 context.scale(ratio,ratio);
 }
*/





 function guiSizeFix (handle,wid,hit,hq,dv)
 {
 var group,dpr,odpr,w,h,ww,wh,area;
 //aa.debugAlert();
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((group=guiGroupGet(handle))==null) { return false; }
 dpr=window.devicePixelRatio||1;
 odpr=dpr;
 if(!hq) { dpr=1; }
 if(dv>1&&dv<=dpr)  {  dpr=dv;  }
 if(dpr>odpr)       { dpr=odpr; }
 if(group.obj.type=="canvas")
  {
  ww=document.documentElement.clientWidth||window.innerWidth||document.body.clientWidth;
  wh=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
  if(group.dom.width!=(wid*dpr)||group.dom.height!=(hit*dpr))   {   guiSizeSet(handle,w,h);   }
  }
 else
  {
  if(group.dom.width!=wid||group.dom.height!=hit)   {   guiSizeSet(handle,wid,hit);   }
  }
 if(group.obj.type=="canvas")
  {
  if(dpr!=group.ctx.scale_factor)   {   group.ctx.scale(dpr,dpr);   group.ctx.scale_factor=dpr;   }
  }
 return true;
 }



 function guiRetinaSet (handle,x,y,w,h)
 {
 var obj,ratio;
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 ratio=Math.ceil(window.devicePixelRatio);
 aa.guiSizeSet(handle,w*ratio,h*ratio);
 aa.guiCssAreaSet(handle,x,y,w,h);
 obj.ctx.setTransform(ratio,0,0,ratio,0,0);
 obj.vars.is_retina=true;
 return true;
 }





 function guiLineHeightGet (handle,lines)
 {
 var ah,fh,dn,obj;
 if((obj=handleCheck(gui_obj.handef,handle))==null) { aa.debugAlert(); return null; }
 //if((obj=aa.guiGet(handle))==null) { alert(); return 0; }
 ah=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
 dn=1.0;
 if(window.devicePixelRatio!=0.0) { dn=window.devicePixelRatio; }
 fh=((ah/dn)/lines);
 fh=fh*dn;
 fh=fh*obj.ctx.scale_factor;
 return fh;
 }



 function guiPixelHeightGet (handle,pixels)
 {
 var ah,fh,dn,obj;
 aa.debugAlert();
 if((obj=handleCheck(gui_obj.handef,handle))==null) { aa.debugAlert(); return null; }
 //if((obj=aa.guiGet(handle))==null) { alert(); return 0; }
 //ah=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
 ah=document.documentElement.clientHeight||window.innerHeight||document.body.clientHeight;
 dn=1.0;
 if(window.devicePixelRatio!=0.0) { dn=window.devicePixelRatio; }
 //fh=((ah/dn)/lines);
// fh=(pixels/dn);
 fh=((ah/dn)*pixels);
 fh=fh*dn;
 fh=fh*obj.ctx.scale_factor;
 return fh;
 }




 function guiCanvasClear (handle,full)
 {
 var obj,ctx;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 ctx=obj.ctx;
 if(full) { ctx.save();  ctx.setTransform(1,0,0,1,0,0);  }
 ctx.clearRect(0,0,obj.dom.width,obj.dom.height);
 if(full) { ctx.restore();  }
 return true;
 }




 function guiCanvasReset (handle)
 {
 var obj,ctx;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 ctx=aa.guiGet(handle,"ctx");
 ctx.globalAlpha=1;
 ctx.mozImageSmoothingEnabled=false;
 ctx.oImageSmoothingEnabled=false;
 ctx.webkitImageSmoothingEnabled=false;
 ctx.msImageSmoothingEnabled=false;
 ctx.imageSmoothingEnabled=false;
 ctx.lineWidth=1.0;
 ctx.lineCap="butt";
 ctx.lineDashOffset=0.0;
 ctx.lineJoin="miter";
 ctx.miterLimit=10.0;
 ctx.shadowColor="none";
 ctx.shadowBlur=0;
 ctx.shadowOffsetX=0;
 ctx.shadowOffsetY=0;
 ctx.textAlign="left";
 ctx.textBaseline="top";
 aa.guiCanvasSmoothingSet(handle,false,null,null,null,null);
 return true;
 }




 function guiCanvasSmoothingSet (handle,state,offx,offy,blur,color)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(state==false)
  {
  obj.ctx.mozImageSmoothingEnabled=false;
  obj.ctx.oImageSmoothingEnabled=false;
  obj.ctx.webkitImageSmoothingEnabled=false;
  obj.ctx.imageSmoothingEnabled=false;
  obj.ctx.shadowBlur=0;
  obj.ctx.shadowOffsetX=0;
  obj.ctx.shadowOffsetY=0;
  obj.ctx.shadowColor="none";
  }
 else
  {
  obj.ctx.mozImageSmoothingEnabled=true;
  obj.ctx.oImageSmoothingEnabled=true;
  obj.ctx.webkitImageSmoothingEnabled=true;
  obj.ctx.imageSmoothingEnabled=true;
  obj.ctx.shadowBlur=blur;
  obj.ctx.shadowOffsetX=offx;
  obj.ctx.shadowOffsetY=offy;
  obj.ctx.shadowColor=color;
  }
 return true;
 }




 function guiCanvasAlphaSet (handle,alpha)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 obj.ctx.globalAlpha=alpha;
 return true;
 }





//let metrics = ctx.measureText(text);
//let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
//let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

 function guiCanvasTextMeasure (handle,txt)
 {
 var obj,ctx,rec,methit,metwid,metrix,ha,hb,ww0,ww1,ww2,ww3;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 ctx=obj.ctx;
 metrix=ctx.measureText(txt);
 methit=0;
 ha=hb=0;

 ww0=Math.abs(metrix.actualBoundingBoxLeft)+Math.abs(metrix.actualBoundingBoxRight);
 ww2=Math.abs(metrix.fontBoundingBoxAscent)+Math.abs(metrix.fontBoundingBoxDescent);
 //ww2=Math.abs(metrix.actualBoundingBoxAscent)+Math.abs(metrix.actualBoundingBoxDescent);
 ww1=0;
 ww3=metrix.width;
 rec={};
 rec.type="rect";
 rec.x=0;
 rec.y=0;
 rec.w=parseInt(ww3);
 rec.h=parseInt(ww2);
 return rec;
 }










 function guiCanvasImageGet (handle,x,y,w,h)
 {
 var obj,img;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return null; }
 img=obj.ctx.getImageData(x,y,w,h);
 return img;
 //img=obj.ctx.getImageData(x,y,w,h);
 //return img;
 }





 function guiCanvasImagePut (handle,x,y,sx,sy,sw,sh,img)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 obj.ctx.putImageData(img,x,y,sx,sy,sw,sh);
 return true;
 }




 function guiCanvasImageDraw (handle,x,y,w,h,dx,dy,dw,dh,img)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 //aa.debugLogger(5,"img=");
 //aa.debugLogger(5,img);
 //aa.debugLogger(5,obj.ctx);
 //aa.debugLogger(5,"sas");
 //aa.debugLogger(5,img.data);
 obj.ctx.drawImage(img,x,y,w,h,dx,dy,dw,dh);
 //aa.debugLogger(5,"ss");
 return true;
 }





 function guiCanvasImageWarp3 (handle,xyuv0,xyuv1,xyuv2,img)
 {
 var obj,x0,x1,x2,y0,y1,y2,u0,u1,u2,v0,v1,v2;
 var delta_0,delta_a,delta_b,delta_c,delta_d,delta_e,delta_f;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=aa.handleCheck(aa.gui_obj.handef,handle))==null) { return false; }
 x0=xyuv0.x;
 x1=xyuv1.x;
 x2=xyuv2.x;
 y0=xyuv0.y;
 y1=xyuv1.y;
 y2=xyuv2.y;
 u0=xyuv0.u;
 u1=xyuv1.u;
 u2=xyuv2.u;
 v0=xyuv0.v;
 v1=xyuv1.v;
 v2=xyuv2.v;
 obj.ctx.save();
 obj.ctx.imageSmoothingEnabled=true;
 obj.ctx.imageSmoothingQuality="high";

 obj.ctx.beginPath();
 obj.ctx.moveTo(x0,y0);
 obj.ctx.lineTo(x1,y1);
 obj.ctx.lineTo(x2,y2);
 obj.ctx.closePath();
 obj.ctx.clip();
 delta_0=u0*v1+v0*u2+u1*v2-v1*u2-v0*u1-u0*v2;
 delta_a=x0*v1+v0*x2+x1*v2-v1*x2-v0*x1-x0*v2;
 delta_b=u0*x1+x0*u2+u1*x2-x1*u2-x0*u1-u0*x2;
 delta_c=u0*v1*x2+v0*x1*u2+x0*u1*v2-x0*v1*u2-v0*u1*x2-u0*x1*v2;
 delta_d=y0*v1+v0*y2+y1*v2-v1*y2-v0*y1-y0*v2;
 delta_e=u0*y1+y0*u2+u1*y2-y1*u2-y0*u1-u0*y2;
 delta_f=u0*v1*y2+v0*y1*u2+y0*u1*v2-y0*v1*u2-v0*u1*y2-u0*y1*v2;
 obj.ctx.transform(delta_a/delta_0,delta_d/delta_0,delta_b/delta_0,delta_e/delta_0,delta_c/delta_0,delta_f/delta_0);
 obj.ctx.drawImage(img,0,0);
 obj.ctx.restore();
 return true;
 }



 function guiCanvasImageWarp4 (handle,xyuv0,xyuv1,xyuv2,xyuv3,img)
 {
 var obj,x0,x1,x2,y0,y1,y2,u0,u1,u2,v0,v1,v2;
 var delta_0,delta_a,delta_b,delta_c,delta_d,delta_e,delta_f;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=aa.handleCheck(aa.gui_obj.handef,handle))==null) { return false; }
 x0=xyuv0.x;
 x1=xyuv1.x;
 x2=xyuv2.x;
 y0=xyuv0.y;
 y1=xyuv1.y;
 y2=xyuv2.y;
 u0=xyuv0.u;
 u1=xyuv1.u;
 u2=xyuv2.u;
 v0=xyuv0.v;
 v1=xyuv1.v;
 v2=xyuv2.v;
 obj.ctx.save();
 obj.ctx.beginPath();
 obj.ctx.moveTo(x0,y0);
 obj.ctx.lineTo(x1,y1);
 obj.ctx.lineTo(x2,y2);
 obj.ctx.closePath();
 obj.ctx.clip();
 delta_0=u0*v1+v0*u2+u1*v2-v1*u2-v0*u1-u0*v2;
 delta_a=x0*v1+v0*x2+x1*v2-v1*x2-v0*x1-x0*v2;
 delta_b=u0*x1+x0*u2+u1*x2-x1*u2-x0*u1-u0*x2;
 delta_c=u0*v1*x2+v0*x1*u2+x0*u1*v2-x0*v1*u2-v0*u1*x2-u0*x1*v2;
 delta_d=y0*v1+v0*y2+y1*v2-v1*y2-v0*y1-y0*v2;
 delta_e=u0*y1+y0*u2+u1*y2-y1*u2-y0*u1-u0*y2;
 delta_f=u0*v1*y2+v0*y1*u2+y0*u1*v2-y0*v1*u2-v0*u1*y2-u0*y1*v2;
 obj.ctx.transform(delta_a/delta_0,delta_d/delta_0,delta_b/delta_0,delta_e/delta_0,delta_c/delta_0,delta_f/delta_0);
 obj.ctx.drawImage(img,0,0);
 obj.ctx.restore();
 x0=xyuv2.x;
 x1=xyuv3.x;
 x2=xyuv0.x;
 y0=xyuv2.y;
 y1=xyuv3.y;
 y2=xyuv0.y;
 u0=xyuv2.u;
 u1=xyuv3.u;
 u2=xyuv0.u;
 v0=xyuv2.v;
 v1=xyuv3.v;
 v2=xyuv0.v;
 obj.ctx.save();
 obj.ctx.beginPath();
 obj.ctx.moveTo(x0,y0);
 obj.ctx.lineTo(x1,y1);
 obj.ctx.lineTo(x2,y2);
 obj.ctx.closePath();
 obj.ctx.clip();
 delta_0=u0*v1+v0*u2+u1*v2-v1*u2-v0*u1-u0*v2;
 delta_a=x0*v1+v0*x2+x1*v2-v1*x2-v0*x1-x0*v2;
 delta_b=u0*x1+x0*u2+u1*x2-x1*u2-x0*u1-u0*x2;
 delta_c=u0*v1*x2+v0*x1*u2+x0*u1*v2-x0*v1*u2-v0*u1*x2-u0*x1*v2;
 delta_d=y0*v1+v0*y2+y1*v2-v1*y2-v0*y1-y0*v2;
 delta_e=u0*y1+y0*u2+u1*y2-y1*u2-y0*u1-u0*y2;
 delta_f=u0*v1*y2+v0*y1*u2+y0*u1*v2-y0*v1*u2-v0*u1*y2-u0*y1*v2;
 obj.ctx.transform(delta_a/delta_0,delta_d/delta_0,delta_b/delta_0,delta_e/delta_0,delta_c/delta_0,delta_f/delta_0);
 obj.ctx.drawImage(img,0,0);
 obj.ctx.restore();
 return true;
 }








 function guiCanvasScroll (handle,x,y,w,h,sx,sy)
 {
 var obj,img;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 img=obj.ctx.getImageData(x,y,w,h);
 obj.ctx.putImageData(img,x+sx,y+sy,0,0,w,h);
 return true;
 }






 function guiCanvasBorder (handle,x,y,w,h,blw,bcl)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 if(bcl) { obj.ctx.strokeStyle=bcl; }
 if(blw) { obj.ctx.lineWidth=blw;   }
 //obj.ctx.strokeRect(x,y,w-blw,h-blw);
 obj.ctx.strokeRect(x,y,w,h);
 return true;
 }



 function guiCanvasFill (handle,x,y,w,h,fcl)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 obj.ctx.beginPath();
 if(fcl) { obj.ctx.fillStyle=fcl; }
 obj.ctx.fillRect(x,y,w,h);//0,0,1,1);//x,y,10,10);//w,h);
 obj.ctx.closePath();
 return true;
 }



 function guiCanvasFillFull (handle,fcl)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 return(aa.guiCanvasFill(handle,0,0,obj.dom.width,obj.dom.height,fcl));
 }




 function guiCanvasArcBorder (handle,x,y,r,sa,ea,blw,bcl)
 {
 var obj,rs,re;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 obj.ctx.beginPath();
 rs=aa.numDegreesToRadian(sa);
 re=aa.numDegreesToRadian(ea);
 if(bcl) { obj.ctx.strokeStyle=bcl; }
 if(blw) { obj.ctx.lineWidth=blw;   }
 obj.ctx.arc(x,y,r,rs,re);
 obj.ctx.stroke();
 obj.ctx.closePath();
 return true;
 }



 function guiCanvasArcFill (handle,x,y,r,sa,ea,fcl)
 {
 var obj,rs,re;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 obj.ctx.beginPath();
 if(fcl) { obj.ctx.fillStyle=fcl; }
 rs=aa.numDegreesToRadian(sa);
 re=aa.numDegreesToRadian(ea);
 obj.ctx.arc(x,y,r,rs,re);
 obj.ctx.fill();
 obj.ctx.closePath();
 return true;
 }



 function guiCanvasLine (handle,x1,y1,x2,y2,lw,cl)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 if(cl) { obj.ctx.strokeStyle=cl; }
 if(lw) { obj.ctx.lineWidth=lw;   }
 obj.ctx.beginPath();
 obj.ctx.moveTo(x1,y1);
 obj.ctx.lineTo(x2,y2);
 obj.ctx.stroke();
 return true;
 }




 function guiCanvasFontMatch (handle,weight,family,doheight,widhit,req)
 {
 var obj,ofnt,txt,fnt,px,recta,mul,okpx;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=aa.handleCheck(aa.gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                                   { return false; }
 ofnt=obj.ctx.font;
 okpx=0;
 if(doheight)
  {
  txt="W";
  for(px=4;px<256;px+=4)
   {
   fnt=weight+" "+px+"px "+family;;
   aa.guiCanvasFontSet(handle,fnt);
   recta=aa.guiCanvasTextMeasure(handle,txt);
   mul=recta.h*req;
   if(mul>widhit) { break; }
   //okpx=px;
   okpx=recta.h;
   }
  }
 else
  {
  txt="W";
  for(px=4;px<256;px+=4)
   {
   fnt=weight+" "+px+"px "+family;;
   aa.guiCanvasFontSet(handle,fnt);
   recta=aa.guiCanvasTextMeasure(handle,txt);
   mul=recta.w*req;
   //aa.debugLogger(5,px+" "+recta.w+"  "+req+"  "+mul+"  "+widhit);
   if(mul>widhit) { break; }
   okpx=recta.w;//px;
   }
  }
 obj.ctx.font=ofnt;
 //aa.debugLogger(5,"ans="+okpx);
 return okpx;
 }



 function guiCanvasFontSet (handle,font)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 obj.ctx.textAlign="left";
 obj.ctx.textBaseline="top";
 obj.ctx.font=font;
 return true;
 }




 function guiCanvasText (handle,x,y,slw,sc,fc,font,text)
 {
 var obj,mes,rec;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 if(font) { obj.ctx.font=font; }
 obj.ctx.textAlign="left";
 obj.ctx.textBaseline="top";
 //mes=aa.guiCanvasTextMeasure(obj.han,text);
 //rec=aa.guiRectSet(x,y,mes.w,mes.h);
 if(slw)      { obj.ctx.lineWidth=slw; }
 if(sc&&slw)
  {
  obj.ctx.strokeStyle=sc;
  obj.ctx.strokeText(text,x,y);//rec.x,rec.y);
  }
 if(fc)
  {
  obj.ctx.fillStyle=fc;
  obj.ctx.fillText(text,x,y);//rec.x,rec.y);
  }
 return true;
 }



 function guiCanvasRounded (handle,x,y,w,h,radius,lw,bc,fc)
 {
 var obj,k,r,b;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 if(lw) { obj.ctx.lineWidth=lw; } //obj.ctx.lineJoin="round"; }
 if(fc) { obj.ctx.fillStyle=fc; }
 if(bc) { obj.ctx.strokeStyle=bc; }
 k=4*(Math.SQRT2-1)/3;
 r=x+w;
 b=y+h;
 obj.ctx.beginPath();
 obj.ctx.moveTo(x+radius,y);
 obj.ctx.lineTo(r-radius,y);
 obj.ctx.bezierCurveTo(r+radius*(k-1),y,r,y+radius*(1-k),r,y+radius);
 obj.ctx.lineTo(r,b-radius);
 obj.ctx.bezierCurveTo(r,b+radius*(k-1),r+radius*(k-1),b,r-radius,b);
 obj.ctx.lineTo(x+radius,b);
 obj.ctx.bezierCurveTo(x+radius*(1-k),b,x,b+radius*(k-1),x,b-radius);
 obj.ctx.lineTo(x,y+radius);
 obj.ctx.bezierCurveTo(x,y+radius*(1-k),x+radius*(1-k),y,x+radius,y);
 if(fc) { obj.ctx.fill(); }
 if(bc) { obj.ctx.stroke(); }
// aa.debugLogger(5,aa.debugFunctionName());
 return true;
 }




 function guiCanvasTriangle (handle,x1,y1,x2,y2,x3,y3,lw,bc,fc)
 {
 var grp;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((grp=aa.guiGroupGet(handle))==null) { return false; }
 if(lw) { grp.ctx.lineWidth=lw;  } // grp.ctx.lineJoin="round";
 if(fc) { grp.ctx.fillStyle=fc; }
 if(bc) { grp.ctx.strokeStyle=bc; }
 grp.ctx.beginPath();
 grp.ctx.moveTo(x1,y1);
 grp.ctx.lineTo(x2,y2);
 grp.ctx.lineTo(x3,y3);
 grp.ctx.closePath();
 if(fc) { grp.ctx.fill(); }
 if(bc) { grp.ctx.stroke(); }
 return true;
 }





 function guiCanvasGrid (handle,x,y,w,h,xd,yd,lw,lc)
 {
 var obj,xx,yy,zz,dw,dh;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 // aaProfilerHit("aa.guiCanvasGrid"); ///======================
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(obj.type!="canvas")                             { return false; }
 obj.ctx.save();
 if(lw) { obj.ctx.lineWidth=lw; }
 if(lc) { obj.ctx.strokeStyle=lc; }
 if(xd<=1) { xd=1; }
 if(yd<=1) { yd=1; }
 dw=w/xd;
 dh=h/yd;
 obj.ctx.beginPath();
 for(zz=0;zz<=xd;zz++)
  {
  obj.ctx.moveTo(x+(zz*dw),y);
  obj.ctx.lineTo(x+(zz*dw),(y+h)-0);
  }
 for(zz=0;zz<=yd;zz++)
  {
  obj.ctx.moveTo(x,y+(zz*dh));
  obj.ctx.lineTo((x+w)-0,y+(zz*dh));
  }
 obj.ctx.closePath();
  //if((pc%10)==0) { rgb=aa.guiRgbaString(22,25,25,1.0); }
  //else           { rgb=aa.guiRgbaString(22,25,25,0.5); }
  //if(1) { aa.guiCanvasLine(grp.han,pa,(u|0)+0,pb,(u|0)+0,1,rgb); }
  //if((pc%10)==0) { rgb=aa.guiRgbaString(5,120,170,1.0); }
  //else           { rgb=aa.guiRgbaString(2,122,125,0.5); }
  //if(1) { aa.guiCanvasLine(grp.han,pa,(u|0)+1,pb,(u|0)+1,1,rgb); }
  //pc++;
  //u+=dvh
  //}
   /*
 for(xx=0;xx<w;xx+=dw)
  {
  obj.ctx.moveTo(x+xx,y);
  obj.ctx.lineTo(x+xx,y+h-1);
  for(yy=0;yy<h;yy+=dh)
   {
   obj.ctx.moveTo(x,y+yy);
   obj.ctx.lineTo(x+w-1,y+yy);
   }
  }
  */
 obj.ctx.stroke();
 obj.ctx.restore();
 return true;
 }





 function guiCssOpacitySet (handle,opacity)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 obj.dom.style.opacity=opacity;
 return true;
 }



 function guiCssDisplaySet (handle,pos,zindex,opacity,display)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 if(pos)        { obj.dom.style.position=pos;  }
 if(zindex)     { obj.dom.style.zIndex=zindex; }
 if(opacity>=0) { obj.dom.style.opacity=opacity; }
 if(display)    { obj.dom.style.display=display; }
 return true;
 }






 function guiCssOutlineSet (handle,pixels,offset,style,rgba)
 {
 var obj,css,sty;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }

 sty=style;
 switch(style)
  {
  case "0": case 0:  sty="auto"; break;
  case "1": case 1:  sty="none"; break;
  case "2": case 2:  sty="dotted"; break;
  case "3": case 3:  sty="dashed"; break;
  case "4": case 4:  sty="solid"; break;
  case "5": case 5:  sty="double"; break;
  case "6": case 6:  sty="groove"; break;
  case "7": case 7:  sty="ridge"; break;
  case "8": case 8:  sty="inset"; break;
  case "9": case 9:  sty="outset"; break;
  }


  /*
outline-style: auto;
outline-style: none;
outline-style: dotted;
outline-style: dashed;
outline-style: solid;
outline-style: double;
outline-style: groove;
outline-style: ridge;
outline-style: inset;
outline-style: outset;
*/

 css=obj.dom.style;
 css.outlineColor=rgba;
 css.outlineOffset=offset+"px";
 css.outlineStyle=sty;///style
 css.outlineWidth=pixels+"px";
 return true;
 }



 function guiRectsGet (handle)
 {
 var rec,dec,rco,obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(gui_obj.handef,handle))==null) { return false; }
 rco={};
 rec=aa.guiRectSet(0,0,obj.dom.width,obj.dom.height);
 dec=aa.guiRectSet(obj.dom.style.left,obj.dom.style.top,obj.dom.style.width,obj.dom.style.height);

 dec.x=parseInt(dec.x.substring(0,dec.x.length-2));
 dec.y=parseInt(dec.y.substring(0,dec.y.length-2));
 dec.w=parseInt(dec.w.substring(0,dec.w.length-2));
 dec.h=parseInt(dec.h.substring(0,dec.h.length-2));
/*
 dec.x=(dec.x.substring(0,dec.x.length-2));
 dec.y=(dec.y.substring(0,dec.y.length-2));
 dec.w=(dec.w.substring(0,dec.w.length-2));
 dec.h=(dec.h.substring(0,dec.h.length-2));
 */
 rco.can_rect=rec;
 rco.dom_rect=dec;
 if(window.devicePixelRatio) { rco.density=window.devicePixelRatio; }
 else                        { rco.density=1.0; }
 rco.iensity=1.0/rco.density;
 return rco;
 }










 function guiEaseInit (type,start,dest,minstart,maxdest,duration)
 {
 var ez;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 ez={};
 ez.state=true;
 switch(type)
  {
  default:
  case "linear":       case 0:  ez.mode=0;  ez.type="linear"; ez.mul=1; break;
  case "inquad":       case 1:  ez.mode=1;  ez.type="inquad"; ez.mul=1; break;
  case "outquad":      case 2:  ez.mode=2;  ez.type="outquad"; ez.mul=1; break;
  case "inoutquad":    case 3:  ez.mode=3;  ez.type="inoutquad"; ez.mul=2; break;
  case "incube":       case 4:  ez.mode=4;  ez.type="incube"; ez.mul=1; break;
  case "outcube":      case 5:  ez.mode=5;  ez.type="outcube"; ez.mul=1; break;
  case "inoutcube":    case 6:  ez.mode=6;  ez.type="inoutcube"; ez.mul=2; break;
  case "inquart":      case 7:  ez.mode=7;  ez.type="inquart"; ez.mul=1; break;
  case "outquart":     case 8:  ez.mode=8;  ez.type="outquart"; ez.mul=1; break;
  case "inoutquart":   case 9:  ez.mode=9;  ez.type="inoutquart"; ez.mul=2; break;
  case "inquint":      case 10: ez.mode=10; ez.type="inquint"; ez.mul=1; break;
  case "outquint":     case 11: ez.mode=11; ez.type="outquint"; ez.mul=1; break;
  case "inoutquint":   case 12: ez.mode=12; ez.type="inoutquint"; ez.mul=2; break;
  case "insine":       case 13: ez.mode=13; ez.type="insine"; ez.mul=1; break;
  case "outsine":      case 14: ez.mode=14; ez.type="outsine"; ez.mul=1; break;
  case "inoutsine":    case 15: ez.mode=15; ez.type="inoutsine"; ez.mul=2; break;
  case "inexpo":       case 16: ez.mode=16; ez.type="inexpo"; ez.mul=1; break;
  case "outexpo":      case 17: ez.mode=17; ez.type="outexpo"; ez.mul=1; break;
  case "inoutexpo":    case 18: ez.mode=18; ez.type="inoutexpo"; ez.mul=2; break;
  case "incirc":       case 19: ez.mode=19; ez.type="incirc"; ez.mul=1; break;
  case "outcirc":      case 20: ez.mode=20; ez.type="outcirc"; ez.mul=1; break;
  case "inoutcirc":    case 21: ez.mode=21; ez.type="inoutcirc"; ez.mul=2; break;
  case "inback":       case 22: ez.mode=22; ez.type="inback"; ez.mul=1; break;
  case "outback":      case 23: ez.mode=23; ez.type="outback"; ez.mul=1; break;
  case "inoutback":    case 24: ez.mode=24; ez.type="inoutback"; ez.mul=2; break;
  case "inbounce":     case 25: ez.mode=25; ez.type="inbounce"; ez.mul=1; break;
  case "outbounce":    case 26: ez.mode=26; ez.type="outbounce"; ez.mul=1; break;
  case "inoutbounce":  case 27: ez.mode=27; ez.type="inoutbounce"; ez.mul=2; break;
  case "inelastic":    case 28: ez.mode=28; ez.type="inelastic"; ez.mul=1; break;
  case "outelastic":   case 29: ez.mode=29; ez.type="outelastic"; ez.mul=1; break;
  case "inoutelastic": case 30: ez.mode=30; ez.type="inoutelastic"; ez.mul=2; break;
  }
 ez.start=start;
 ez.dest=dest;
 ez.duration=duration;
 ez.times=aa.timerMsRunning();
 ez.timee=ez.times+ez.duration;
 ez.mins=minstart;
 ez.maxd=maxdest;
 ez.prev_res=0;
 ez.vars={};
 return ez;
 }




 function guiEaseProcess (ez)
 {
 var res,s,a,now,z,val,os,d;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(ez.state==false) { return ez.prev_res; }
 now=aa.timerMsRunning();
 os=ez.state;
 ///if(now>=ez.timee) { ez.state=false; }
 if(ez.state!=os)  {  }
 val=(now-ez.times)/ez.duration;
 val=val*ez.mul;
 function _linear(n)       { return n; }
 function _inQuad(n)       { return n*n; }
 function _outQuad(n)      { return n*(2-n); }
 function _inOutQuad(n)    { n*=2;  if(n<1) return 0.5*n*n;  return-0.5*(--n*(n-2)-1); }
 function _inCube(n)       { return n*n*n; }
 function _outCube(n)      { return --n*n*n+1; }
 function _inOutCube(n)    { n*=2;  if(n<1) return 0.5*n*n*n;  return 0.5*((n-=2)*n*n+2); }
 function _inQuart(n)      { return n*n*n*n; }
 function _outQuart(n)     { return 1-(--n*n*n*n); }
 function _inOutQuart(n)   { n*=2;  if(n<1) return 0.5*n*n*n*n;  return -0.5*((n-=2)*n*n*n-2); }
 function _inQuint(n)      { return n*n*n*n*n; }
 function _outQuint(n)     { return --n*n*n*n*n+1; }
 function _inOutQuint(n)   { n*=2;  if(n<1) return 0.5*n*n*n*n*n;  return 0.5*((n-=2)*n*n*n*n+2); }
 function _inSine(n)       { return 1-Math.cos(n*Math.PI/2); }
 function _outSine(n)      { return Math.sin(n*Math.PI/2); }
 function _inOutSine(n)    { return .5*(1-Math.cos(Math.PI*n)); }
 function _inExpo(n)       { return 0==n?0:Math.pow(1024,n-1); }
 function _outExpo(n)      { return 1==n?n:1-Math.pow(2,-10*n); }
 function _inOutExpo(n)    { if(0==n) return 0;
                            if(1==n) return 1;
                            if((n*=2)<1) return .5*Math.pow(1024,n-1);
                            return .5*(-Math.pow(2,-10*(n-1))+2);
                          }
 function _inCirc(n)       { return 1-Math.sqrt(1-n*n); }
 function _outCirc(n)      { return Math.sqrt(1-(--n*n)); }
 function _inOutCirc(n)    { n*=2;  if(n<1) return -0.5*(Math.sqrt(1-n*n)-1);  return 0.5*(Math.sqrt(1-(n-=2)*n)+1); }
 function _inBack(n)       { s=1.70158;  return n*n*((s+1)*n-s); }
 function _outBack(n)      { s=1.70158;  return --n*n*((s+1)*n+s)+1; }
 function _inOutBack(n)    { s=1.70158*1.525;  if((n*=2)<1) return 0.5*(n*n*((s+1)*n-s));  return 0.5*((n-=2)*n*((s+1)*n+s)+2); }
 function _inBounce(n)     { return 1-_outBounce(1-n); }
 function _outBounce(n)    { if(n<(1/2.75))   { return 7.5625*n*n; }
                            if(n<(2/2.75))   { return 7.5625*(n-=(1.5/2.75))*n+0.75;  }
                            if(n<(2.5/2.75)) { return 7.5625*(n-=(2.25/2.75))*n+0.9375;  }
                            return 7.5625*(n-=(2.625/2.75))*n+0.984375;  }
 function _inOutBounce(n)  { if(n<.5) return _inBounce(n*2)*.5;  return  _outBounce(n*2-1)*.5+.5; }
 function _inElastic(n)    { a=0.1; p=0.4;
                            if(n===0) return 0;
                            if(n===1) return 1;
                            if(!a||a<1) { a=1; s=p/4; } else s=p*Math.asin(1/a)/(2*Math.PI);
                            return-(a*Math.pow(2,10*(n-=1))*Math.sin((n-s)*(2*Math.PI)/p));
                          }
 function _outElastic(n)   { a=0.1; p=0.4;
                            if(n===0) return 0;
                            if(n===1) return 1;
                            if(!a||a<1) { a=1; s=p/4; }  else s=p*Math.asin(1/a)/(2*Math.PI);
                            return (a*Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p)+1);
                            }
 function _inOutElastic(n) { a=0.1; p=0.4;
                            if(n===0) return 0;
                            if(n===1) return 1;
                            if(!a||a<1) { a=1; s=p/4; }  else s=p*Math.asin(1/a)/(2*Math.PI);
                            if((n*=2)<1) return-0.5*(a*Math.pow(2,10*(n-=1))*Math.sin((n-s)*(2*Math.PI)/p));
                            return a*Math.pow(2,-10*(n-=1))*Math.sin((n-s)*(2*Math.PI)/p)*0.5+1;
                            }
 switch(ez.mode)
  {
  case 0:  res=_linear(val);       break;
  case 1:  res=_inQuad(val);       break;
  case 2:  res=_outQuad(val);      break;
  case 3:  res=_inOutQuad(val);    break;
  case 4:  res=_inCube(val);       break;
  case 5:  res=_outCube(val);      break;
  case 6:  res=_inOutCube(val);    break;
  case 7:  res=_inQuart(val);      break;
  case 8:  res=_outQuart(val);     break;
  case 9:  res=_inOutQuart(val);   break;
  case 10: res=_inQuint(val);      break;
  case 11: res=_outQuint(val);     break;
  case 12: res=_inOutQuint(val);   break;
  case 13: res=_inSine(val);       break;
  case 14: res=_outSine(val);      break;
  case 15: res=_inOutSine(val);    break;
  case 16: res=_inExpo(val);       break;
  case 17: res=_outExpo(val);      break;
  case 18: res=_inOutExpo(val);    break;
  case 19: res=_inCirc(val);       break;
  case 20: res=_outCirc(val);      break;
  case 21: res=_inOutCirc(val);    break;
  case 22: res=_inBack(val);       break;
  case 23: res=_outBack(val);      break;
  case 24: res=_inOutBack(val);    break;
  case 25: res=_inBounce(val);     break;
  case 26: res=_outBounce(val);    break;
  case 27: res=_inOutBounce(val);  break;
  case 28: res=_inElastic(val);    break;
  case 29: res=_outElastic(val);   break;
  case 30: res=_inOutElastic(val); break;
  }
 z=ez.start+(ez.dest-ez.start)*res;
 if(z<=ez.mins)  { z=ez.mins; }
 if(z>=ez.maxd)  { z=ez.maxd  }
 d=z-ez.prev_res;
 ez.prev_res=z;
 if(now>=ez.timee&&ez.state==true)
  {
  if(z==ez.maxd||z==ez.mins)
   {
   //uixHudLine(11,"z="+z+"  "+ez.mins+"  "+ez.maxd);
   //console.log("z="+z+"  "+ez.maxd+"  "+ez.mins);
   ez.state=false;
   }
  }

 //return d;
 return z;
 }




 function guiRgbaString (r,g,b,a)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(aa.stringParms("rgb",r,g,b,a));
 //return("rgba("+r+","+g+","+b+","+a+")");
 }


 function guiRgbaStringCommon (index,opacity)
 {
 var opa;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(opacity===undefined||opacity===null||arguments.length==1)  {  opa=1;  }
 else                                                          {  opa=opacity;  }
 if(opa<0) { opa=0; }
 if(opa>1) { opa=1; }
 switch(index%14)
  {
  case 0:  return(guiRgbaString(0,0,0,opa));
  case 1:  return(guiRgbaString(255,255,255,opa));
  case 2:  return(guiRgbaString(255,80,80,opa));
  case 3:  return(guiRgbaString(0,255,0,opa));
  case 4:  return(guiRgbaString(0,200,255,opa));
  case 5:  return(guiRgbaString(0,255,255,opa));
  case 6:  return(guiRgbaString(255,0,255,opa));
  case 7:  return(guiRgbaString(255,255,0,opa));
  case 8:  return(guiRgbaString(255,128,128,opa));
  case 9:  return(guiRgbaString(128,255,128,opa));
  case 10: return(guiRgbaString(128,128,255,opa));
  case 11: return(guiRgbaString(128,255,255,opa));
  case 12: return(guiRgbaString(255,128,255,opa));
  case 13: return(guiRgbaString(255,255,128,opa));
  }
 }




 function guiRectSet (x,y,w,h)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 var rec={};
 rec.type='rect';
 rec.x=x;
 rec.y=y;
 rec.w=w;
 rec.h=h;
 return rec;
 }




 function guiRectAdjust (rec,xa,ya,wa,ha)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 rec.x+=xa;
 rec.y+=ya;
 rec.w+=wa;
 rec.h+=ha;
 return rec;
 }




 function guiAreaSet (l,t,w,h)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 var area={};
 area.type="area";
 area.left=l;
 area.top=t;
 area.width=w;
 area.height=h;
 area.lstr=area.left+"px";
 area.tstr=area.top+"px";
 area.wstr=area.width+"px";
 area.hstr=area.height+"px";
 return area;
 }


 function guiAreaAdjust (area,la,ta,wa,ha)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(area.type!="area") { aa.debugAlert(); }
 area.type="area";
 area.left+=la;
 area.top+=ta;
 area.width+=wa;
 area.height+=ha;
 area.lstr=area.left+"px";
 area.tstr=area.top+"px";
 area.wstr=area.width+"px";
 area.hstr=area.height+"px";
 return area;
 }




 function guiXyUvSet (x,y,u,v)
 {
 var xyuv={};
 xyuv.type='xyuv';
 xyuv.x=x;
 xyuv.y=y;
 xyuv.u=u;
 xyuv.v=v;
 return xyuv;
 }



 function guiRgbaSet (r,g,b,a)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 var rgba={};
 rgba.type="rgba";
 rgba.r=r;
 rgba.g=g;
 rgba.b=b;
 rgba.a=a;
 return rgba;
 }



 function guiRgbaAdjust (rgba,ra,ga,ba,aa)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(rgba.type!="rgba") { return rgba; }
 rgba.r+=ra;
 rgba.g+=ga;
 rgba.b+=ba;
 rgba.a+=aa;
 return rgba;
 }





 function guiRgbaToHsva (rgba)
 {
 var hsva;
 var r,g,b;
 var h,s,v;
 var max,min,d;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(rgba.type!="rgba") { return rgba; }
 r=rgba.r;
 g=rgba.g;
 b=rgba.b;
 max=Math.max(r,g,b);
 min=Math.min(r,g,b);
 v=max;
 d=max-min;
 s=max===0?0:d/max;
 if(max==min)
  {
  h=0;
  }
 else
  {
  switch(max)
   {
   case r: h=(g-b)/d+(g<b?6:0); break;
   case g: h=(b-r)/d+2; break;
   case b: h=(r-g)/d+4; break;
   }
  h/=6;
  }
 v=v/255;
 hsva=guiHsvaSet(h,s,v,rgba.a);
 return hsva;
 }





 function guiRgbaToString (rgba)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(rgba.type!="rgba") { return rgba; }
 return("rgba("+rgba.r+","+rgba.g+","+rgba.b+","+rgba.a+")");
 }








 function guiHsvaSet (h,s,v,a)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 var hsva={};
 hsva.type="hsva";
 hsva.h=h;
 hsva.s=s;
 hsva.v=v;
 hsva.a=a;
 return hsva;
 }



 function guiHsvaAdjust (hsva,ha,sa,va,aa)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(hsva.type!="hsva") { return hsva; }
 hsva.h+=ha;
 hsva.s+=sa;
 hsva.v+=va;
 hsva.a+=aa;
 return hsva;
 }




 function guiHsvaToRgba (hsva)
 {
 var r,g,b;
 var i,f,p,q,t;
 var rgba;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(hsva.type!="hsva") { return hsva; }
 i=Math.floor(hsva.h*6);
 f=hsva.h*6-i;
 p=hsva.v*(1-hsva.s);
 q=hsva.v*(1-f*hsva.s);
 t=hsva.v*(1-(1-f)*hsva.s);
 switch(i%6)
  {
  case 0: r=hsva.v, g=t, b=p; break;
  case 1: r=q, g=hsva.v, b=p; break;
  case 2: r=p, g=hsva.v, b=t; break;
  case 3: r=p, g=q, b=hsva.v; break;
  case 4: r=t, g=p, b=hsva.v; break;
  case 5: r=hsva.v, g=p, b=q; break;
  }
 r=Math.round(r*255);
 g=Math.round(g*255);
 b=Math.round(b*255);
 rgba=guiRgbaSet(r,g,b,hsva.a);
 return rgba;
 }





 function guiUpdateAreaInit ()
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 obj={};
 obj.type="updatearea";
 obj.state=0;
 obj.is_fin=false;
 obj.rect=guiRectSet(0,0,0,0);
 return obj;
 }



 function guiUpdateAreaFin (obj)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(obj.type!="updatearea") { return null; }
 obj.is_fin=true;
 return obj;
 }



 function guiUpdateAreaAdd (obj,x,y,w,h)
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 var x1,y1,x2,y2;
 var x3,y3,x4,y4;
 if(obj.type!="updatearea") { return null; }
 if(obj.state==0)
  {
  obj.rect.x=x;
  obj.rect.y=y;
  obj.rect.w=w;
  obj.rect.h=h;
  obj.state=1;
  }
 else
  {
  x1=obj.rect.x;
  y1=obj.rect.y;
  x2=(obj.rect.x+obj.rect.w)-1;
  y2=(obj.rect.y+obj.rect.h)-1;
  x3=x;
  y3=y;
  x4=(x+w)-1;
  y4=(y+h)-1;
  if(x3<x1) { x1=x3; }
  if(x4>x2) { x2=x4; }
  if(y3<y1) { y1=y3; }
  if(y4>y2) { y2=y4; }
  obj.rect.x=x1;
  obj.rect.y=x2;
  obj.rect.w=(x2-x1)+1;
  obj.rect.h=(y2-y1)+1;
  }
 return obj;
 }









 function guiSpotClear ()
 {
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 console.log(arguments.callee.name);
 gui_obj.spot_array=[];
 return true;
 }






 function guiSpotFind (id)
 {
 var i,obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 for(i=0;i<gui_obj.spot_array.length;i++)
  {
  obj=gui_obj.spot_array[i];
  if(obj.id==id) { return obj; }
  }
 return null;
 }




 function guiSpotRemove (id)
 {
 var i,obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 for(i=0;i<gui_obj.spot_array.length;i++)
  {
  obj=gui_obj.spot_array[i];
  if(obj.id==id) { gui_obj.spot_array.splice(i,1);  return true;   }
  }
 return false;
 }



 function guiSpotRangeRemove (idstart,idend)
 {
 var i,obj,s;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if(idstart>idend) { s=idstart; idstart=idend; idend=s; }
 for(i=0;i<gui_obj.spot_array.length;i++)
  {
  obj=gui_obj.spot_array[i];
  if(obj.id>=idstart&&obj.id<=idend)    {    gui_obj.spot_array.splice(i,1);     }
  }
 return false;
 }



 function guiSpotAdd (id,x,y,w,h)
 {
 var i,obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=guiSpotFind(id))!=null)  {  guiSpotRemove(id);  }
 obj={};
 obj.id=parseInt(id);
 obj.val=-1;
 obj.x=x;
 obj.y=y;
 obj.w=w;
 obj.h=h;
 gui_obj.spot_array.push(obj);
 //console.log(arguments.callee.name+"  ",id,x,y,w,h);
 return true;
 }





 function guiSpotAdjust (id,xa,ya,wa,ha)
 {
 var obj;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 if((obj=guiSpotFind(id))==null) { return false; }
 obj.x+=xa;
 obj.y+=ya;
 obj.w+=wa;
 obj.h+=ha;
 return true;
 }




 function guiSpotMatch (x,y)
 {
 var i,obj,hx1,hy1,hx2,hy2;
 if(aa_profile_group_gui) { aaProfilerHit(arguments.callee.name); }
 for(i=0;i<gui_obj.spot_array.length;i++)
  {
  obj=gui_obj.spot_array[i];
 // console.log(i+" / "+gui_obj.spot_array.length,obj);
  hx1=obj.x;
  hy1=obj.y;
  hx2=hx1+obj.w;
  hy2=hy1+obj.h;
  if((x>=hx1&&x<hx2)&&(y>=hy1&&y<hy2))  {   return obj;   }
  }
 return null
 }



 function guiSpotDump ()
 {
 var out="";
 for(i=0;i<gui_obj.spot_array.length;i++)
  {
  obj=gui_obj.spot_array[i];
  out+="i/"+gui_obj.spot_array.length+" ";
  out+="id="+obj.id+"  ";
  out+="val="+obj.val+"  ";
  out+="x1="+obj.x+"  ";
  out+="y1="+obj.y+"  ";
  out+="x2="+((obj.x+obj.w)-1)+"  ";
  out+="y2="+((obj.y+obj.h)-1)+"  ";

  out+="w="+obj.w+"  ";
  out+="h="+obj.h+"  ";
  out+="\r\n";
  }
 return out;
 }




/*-----------------------------------------------------------------------*/





 function guiFontLoad (name,type,url)
 {
 var fontobj;
 fontobj={};
 fontobj.type="fontload";
 fontobj.name=name;
 fontobj.format=type;
 fontobj.url=url;
 fontobj.font=null;
 fontobj.is_error=false;
 fontobj.is_ready=false;
 fontobj.promise_object=null;
 fontobj.promise_handle=0;
 fontobj.promise_val=null;
 fontobj.stage=100;
 return fontobj;
 }




 function guiFontDelete (fontobj)
 {
 var b;
 if(fontobj==undefined)       { return false; }
 if(fontobj==null)            { return false; }
 if(fontobj.type!="fontload") { return false; }
 if(fontobj.promise_handle!=0)
  {
  aa.debugAlert();
  }
 if(fontobj.font!=null)
  {
  b=document.fonts.delete(fontobj.font);
  if(b!=true) { aa.debugAlert(); return false; }
  fontobj.font=null;
  }
 fontobj.promise_val=null;
 fontobj.promise_object=null;
 fontobj.font=null;
 fontobj={};
 return true;
 }







 function guiFontStatus (fontobj)
 {
 var txt,status,fnt;
 if(fontobj==undefined)       { return false; }
 if(fontobj==null)            { return false; }
 if(fontobj.type!="fontload") { return false; }
 switch(fontobj.stage)
  {
  case 100:
  txt="url("+fontobj.url+") format('"+fontobj.format+"')";
  fontobj.font=new FontFace(fontobj.name,txt);
  fontobj.stage=120;
  break;

  case 120:
  fontobj.promise_object=fontobj.font.load();
  //console.log(fontobj.promise_object);
  fontobj.promise_handle=aa.promiseCreate(fontobj.promise_object,fontobj.stage);
  if(fontobj.promise_handle==0) { aa.debugAlert(); }
  fontobj.stage=140;
  break;


  case 140:
  status=aa.promiseStatus(fontobj.promise_handle);
  if(status.state==PROMISE_pending)   { break; }
  if(status.state==PROMISE_rejected)  { aa.debugAlert("err="+status.err); fontobj.is_error=true;    aa.debugAlert();   fontobj.stage=666;   break;    }
  if(status.state!=PROMISE_completed) { aa.debugAlert("ss="+status.state); break;  }
  fontobj.promise_val=status.val;
  if(aa.promiseDestroy(fontobj.promise_handle)!=true) { aa.debugAlert(); }
  fontobj.promise_handle=0;
  document.fonts.add(fontobj.promise_val);
  fontobj.is_ready=true;
  fontobj.stage=200;
  break;

  case 200:
  return true;
  }
 return false;
 }






/*-----------------------------------------------------------------------*/



 function mediaObjInit ()
 {
 var state;
 if(Object.keys(media_obj).length!=0) { return; }

 state={};
 state.detect_stage=0;
 state.detect_state="idle";
 state.detect_obj={};
 state.vars={};
 state.vars.stage=0;
 state.vars.in_promise=false;
 state.vars.promise_info="";
 state.vars.promise_object=null;
 state.vars.prosync_handle=0;
 state.vars.promise_val=null;
 state.vars.is_error=false;

 media_obj.handef=handleDefine("media",64);
 media_obj.state=state;
 media_obj.is_init=true;
 }





 function mediaDeviceDetectReset ()
 {
 var obj;

 obj=media_obj;
 if(obj.state.detect_stage!=300) { return false; }
 obj.state.detect_stage=0;
 obj.state.detect_state="idle";
 obj.state.detect_obj.ray=[];
 obj.state.detect_obj={};
 return true;
 }




 function mediaDeviceDetect ()
 {
 var obj,constraints,jex,prosta;

 obj=media_obj;
 switch(obj.state.detect_stage)
  {
  case 0:
  ///obj.state.detect_stage=100;
  obj.state.detect_stage=200;
  console.log("adding mediadevicedetect worker");
  aa.mainWorkerAdd("media.Detect",mediaDeviceDetect,1);
  break;

  case 100:
  aa.debugAlert();
  console.log("mdd: stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
  obj.state.detect_state="detecting";
  obj.state.detect_obj={};
  obj.state.detect_obj.res=null;
  obj.state.detect_obj.e_constraint=null;
  obj.state.detect_obj.e_name=null;
  obj.state.detect_obj.e_msg=null;
  obj.state.detect_obj.stream=null;
  obj.state.detect_stage=120;
  break;



  case 120:
  console.log("mdd: stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
  constraints={audio:true,video:true};
  jex=navigator.mediaDevices.getUserMedia(constraints);
  obj.state.vars.in_promise=true;
  obj.state.vars.promise_info="mediadetectgetusermedia";
  obj.state.vars.promise_object=jex;
  obj.state.vars.prosync_handle=aa.promiseCreate(obj.state.vars.promise_object,obj.state.detect_stage);
  obj.state.detect_stage=122;
  break;



// if overconstrained error will include constraintName

  case 122:
  if(obj.state.vars.in_promise==true)
   {
   prosta=aa.promiseStatus(obj.state.vars.prosync_handle);
   if(prosta==null) aa.debugAlert();
   switch(prosta.state)
    {
    case PROMISE_rejected:
    console.log("mdd: rej stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
    obj.state.detect_obj.res="err";
    obj.state.detect_obj.e_name=prosta.err.name;
    obj.state.detect_obj.e_msg=prosta.err.message;
    obj.state.detect_obj.e_code=prosta.err.code;
    alert("deto="+obj.state.detect_obj);
    //  aa.debugLogger(50,prosta.err.name+"  "+prosta.err.message+"  "+prosta.err.code);
    aa.promiseDestroy(obj.state.vars.prosync_handle);
    obj.state.vars.in_promise=false;
    obj.state.vars.promise_info="";
    obj.state.vars.promise_object=null;
    obj.state.vars.prosync_handle=0;
    obj.state.detect_state="failed";
    aa.mainWorkerRemove("media.Detect");
    obj.state.detect_stage=166;
    break;

    case PROMISE_completed:
    console.log("mdd: ok stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
    //aa.debugLogger(50,"media detect ok");
    obj.state.detect_obj.res="ok";
    obj.state.detect_obj.stream=prosta.val;
    obj.state.detect_obj.stream.getTracks().forEach(function(track) {  track.stop();  });
    aa.promiseDestroy(obj.state.vars.prosync_handle);
    obj.state.vars.in_promise=false;
    obj.state.vars.promise_info="";
    obj.state.vars.promise_object=null;
    obj.state.vars.prosync_handle=0;
    obj.state.detect_stage=200;
    break;

    default:
    ///aa.debugLogger(5,"psss="+prosta.state);
    break;
    }
   }
  else
   {
   aa.debugAlert();
   }
  break;


  case 166:
  break;

  case 200:
  console.log("mdd: stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
  obj.state.detect_obj={};
  obj.state.detect_obj.res=null;
  obj.state.detect_obj.devix=0;
  obj.state.detect_obj.ready=false;
  obj.state.detect_obj.e_constraint=null
  obj.state.detect_obj.e_name=null
  obj.state.detect_obj.e_msg=null
  obj.state.detect_obj.ray=[];
  obj.state.detect_obj.cap=[];
  obj.state.detect_stage=220;
  break;



  case 220:
  console.log("mdd enumerate");
  navigator.mediaDevices.enumerateDevices()
  .then(function(devs)
   {
   devs.forEach(function(device)
    {
    obj.state.detect_obj.ray[obj.state.detect_obj.devix]=device;
    if(device.getCapabilities) { obj.state.detect_obj.cap[obj.state.detect_obj.devix]=device.getCapabilities(); }
    else                       { obj.state.detect_obj.cap[obj.state.detect_obj.devix]=null;  }
///    console.log(device);
    obj.state.detect_obj.devix++;
    });
   obj.state.detect_obj.res="ok";
   })
  .catch(function(error)
   {
   aa.debugAlert();
   obj.state.detect_obj.res="err";
   obj.state.detect_obj.e_name=error.name;
   obj.state.detect_obj.e_msg=error.message;
   obj.state.detect_obj.e_code=error.code;
   });
  obj.state.detect_stage=240;
  break;



  case 240:
  if(obj.state.detect_obj.res==null) { break; }
  if(obj.state.detect_obj.res!="ok")
   {
   console.log("mdd: !ok stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
   aa.debugAlert();
   obj.state.detect_state="failed";
   obj.state.detect_obj.ready=true;
   aa.mainWorkerRemove("media.Detect");
   obj.state.detect_stage=266;
   break;
   }
             console.log("mdd: ready stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
  obj.state.detect_state="ready";
  obj.state.detect_obj.ready=true;
  aa.mainWorkerRemove("media.Detect");
  console.log("worker removed");
  obj.state.detect_stage=300;
  break;


  case 300:
  break;
  }
 return true;
 }




 function mediaDeviceCountGet (kind)
 {
 var obj,i,c,dev;
 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 obj=media_obj;
 if(obj.state.detect_state!="ready") { return -1; }
 c=0;
 for(i=0;i<obj.state.detect_obj.ray.length;i++)
  {
  dev=obj.state.detect_obj.ray[i];
  if(kind!=null&&dev.kind!=kind) { continue; }
  c++;
  }
 return c;
 }




 function mediaDeviceGet (kind,index)
 {
 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 var obj,i,c,dev;
 obj=media_obj;
 if(obj.state.detect_state!="ready") { return null; }
 if(index>=mediaDeviceCountGet(kind)) { return null; }
 c=0;
 for(i=0;i<obj.state.detect_obj.ray.length;i++)
  {
  dev=obj.state.detect_obj.ray[i]
  if(dev.kind!=kind) { continue; }
  if(c!=index) { c++; continue; }
  return dev;
  }
 return null;
 }



 function mediaDeviceCapsGet (kind,index)
 {
 var obj,i,c,dev;
 obj=media_obj;
 if(obj.state.detect_state!="ready") { return null; }
 c=0;
 for(i=0;i<obj.state.detect_obj.ray.length;i++)
  {
  dev=obj.state.detect_obj.ray[i]
  if(dev.kind!=kind) { continue; }
  if(c!=index) { c++; continue; }
  dev=obj.state.detect_obj.cap[i];
  return dev;
  }
 return null;
 }





 function mediaCreate (vconstraints,aconstraints)
 {
 var i,h,obj;
 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 if(media_obj.is_init!=true) {  return 0; }
/// if(media_obj.state.detect_state!="ready") { return 0; }
 for(i=0;i<media_obj.handef.slots;i++)
  {
  obj=media_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  h=handleUse(media_obj.handef,i)
  obj.is_recording=false;
  obj.is_attached=false;
  obj.is_canvas=false;
  obj.v_contraints=vconstraints;
  obj.a_contraints=aconstraints;
  obj.img_capture=null;
  obj.pho_caps=null;
  obj.torch_available=null;
  obj.torch_state=false;
  obj.vars={};
  obj.avc={};
  obj.prom_handle=0;
  obj.prom_object=null;
  obj.prom_val=null;
  if(vconstraints) { obj.avc.video=obj.v_contraints; }
  if(aconstraints) { obj.avc.audio=obj.a_contraints; }
  obj.res=null;
  obj.e_name=null;
  obj.e_msg=null;
  obj.stream=null;
  obj.a_stream=null;
  obj.v_stream=null;
  obj.a_settings=null;
  obj.v_settings=null;
  obj.attached_handle=0;
  obj.output_media_stream=null;
  obj.output_tracks=[];
  obj.stage=100;
  obj.recorder={};
  aa.debugLogger(70,"mediaCreate() index "+i+"  "+aa.timerMsRunning());
  return h;
  }
 return 0;
 }








 function mediaDestroy (handle)
 {
 var obj;
 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 ///if(media_obj.state.detect_state!="ready") { return false; }
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_attached==true)
  {
  aa.debugAlert();
  aa.mediaAttach(handle,null);
  }
 if(obj.pho_caps)     {  obj.pho_caps=null;    }
 if(obj.img_capture)  {  obj.img_capture=null; }
 if(obj.is_recording)
  {
  }
 handleRemove(media_obj.handef,handle);
 return true;
 }




 function mediaGet (handle)
 {
 var obj;
 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 obj=handleCheck(media_obj.handef,handle);
 //if(obj!=null) console.log(obj);
 return(obj);
 }










 function mediaAttach (handle,dhandle)
 {
 var obj,dobj,isplaying,stream,tracks;

 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }

 //aa.debugLogger(70,"mdd: stage "+obj.state.detect_stage+" "+aa.timerMsRunning());
 aa.debugLogger(70,"media attach  "+obj.is_attached+"  "+handle+" "+dhandle+"  "+aa.timerMsRunning());

 //if(obj.is_attached)  {  aa.debugAlert("already attached to media");  }
 if(dhandle!=null)
  {
  if((dobj=aa.guiGet(dhandle))==null)          { return false; }
  aa.debugLogger(5,"===== mediaattach() type "+dobj.type+" id="+dobj.id);
  if(dobj.type=="video")
   {
   dobj.dom.setAttribute('autoplay', '');
   dobj.dom.setAttribute('muted', '');      //////////===================
   dobj.dom.setAttribute('playsinline', '');
   obj.is_attached=true;
   obj.is_canvas=false;
   obj.attached_handle=dhandle;
   dobj.dom.srcObject=obj.output_media_stream;
   dobj.frame_number=0;
   dobj.prev_time=-1;
   dobj.dom.volume=0;
   dobj.dom.muted=true;  //////////===================
   //dobj.dom.muted=false;   dobj.dom.volume=unmuted_audio_volume_def;
   isplaying=dobj.dom.currentTime>0&&!dobj.dom.paused&&!dobj.dom.ended&&dobj.dom.readyState>2;
   aa.debugLogger(75,"ATTACH - ISPLAYING="+(!isplaying)+"  "+obj.stage+" "+aa.timerMsRunning());
   dobj.dom.play();
   }
  else
   {
   aa.debugAlert("trying to attach type "+dobj.type);
   }
  }
 else
  {
  ///aa.debugAlert();
  if(obj.is_attached!=true) { return false; }
  if((dobj=aa.guiGet(obj.attached_handle))==null)  { aa.debugLogger(5,"cant find attached handle"); }
  dobj.dom.setAttribute('autoplay', '');
  dobj.dom.setAttribute('muted', '');  //////////===================
  dobj.dom.setAttribute('playsinline', '');
  stream=dobj.dom.srcObject;
  tracks=obj.output_media_stream.getTracks();
  tracks.forEach(function(track) { track.stop();  });

//  dobj.dom.muted=true; //////////===================
//  dobj.dom.volume=0;

  dobj.dom.volume=0;
  dobj.dom.muted=true; //////////===================

  dobj.dom.srcObject=null;
  dobj.frame_number=0;
  dobj.prev_time=-1;
  obj.is_attached=false;
  obj.is_canvas=false;
  obj.attached_handle=0;
  aa.debugLogger(5,"========== detattch");
  }
 return true;
 }





 function mediaTorchSet (handle,state)
 {
 var obj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.torch_available!=true) { return false; }
 if(state)
  {
  obj.v_stream.applyConstraints({advanced: [{torch: true}]})
  .then(()=>{  obj.torch_state=true;   })
  .catch(e=>{  alert(e);   });
  }
 else
  {
  if(obj.torch_state!=true) { return false; }
  obj.v_stream.applyConstraints({advanced: [{torch: false}]})
  .then(()=>{ obj.torch_state=false;   })
  .catch(e=>{ alert(e);   });
  }
 return true;
 }












 function mediaStatus (handle)
 {
 var obj,trk,avc,asettings,status;

 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 switch(obj.stage)
  {
  case 1001:
  obj.prom_object=navigator.mediaDevices.getUserMedia(obj.avc);
  console.log(obj.prom_object);
  obj.prom_handle=aa.promiseCreate(obj.prom_object,obj.stage);
  if(obj.prom_handle==0) { aa.debugAlert(); }
  console.log("promise created "+obj.prom_handle);
  obj.stage=120;
  break;

  case 120:
  status=aa.promiseStatus(obj.prom_handle);
  console.log(status);
  if(status.state==PROMISE_pending)   { break; }
  if(status.state==PROMISE_rejected)  { aa.debugAlert("err="+status.err); obj.is_error=true;    aa.debugAlert();  obj.stage=666;   break;    }
  alert();
  if(status.state!=PROMISE_completed) { aa.debugAlert("ss="+status.state); break;  }
  console.log("ok");
  obj.prom_val=status.val;
  if(aa.promiseDestroy(obj.prom_handle)!=true) { aa.debugAlert(); }
  obj.prom_handle=0;
  obj.stream=obj.prom_val;
  obj.a_stream=stream.getAudioTracks()[0];
  obj.v_stream=stream.getVideoTracks()[0];
  obj.stage=140;
  break;

  case 140:
  if(obj.v_contraints)   {   obj.output_tracks=obj.output_tracks.concat(obj.v_stream);   }
  if(obj.a_contraints)   {   obj.output_tracks=obj.output_tracks.concat(obj.a_stream);   }
  if(typeof MediaStream!=='undefined')
   {
   obj.output_media_stream=new MediaStream(obj.output_tracks);
   obj.stream.getTracks().forEach(function(track)    {    obj.output_media_stream.addTrack(track);    });
   }
  else
   {
   obj.output_media_stream=obj.stream;
   }
  obj.a_settings=obj.a_stream.getSettings();
  obj.v_settings=obj.v_stream.getSettings();
  obj.torch_available=false;
  console.log("aa mediaStatus() stage="+obj.stage+"  checking torch "+aa.timerMsRunning());
  if('ImageCapture' in window)
   {
   trk=obj.output_media_stream.getVideoTracks()[0];
   obj.img_capture=new ImageCapture(trk);
   obj.pho_caps=obj.img_capture.getPhotoCapabilities().then(()=>
    {
    obj.v_stream.applyConstraints({advanced: [{torch: false}]})
    .then(()=> { obj.torch_state=false;    obj.torch_available=true;    })
    .catch(e=> { });
    }).
   catch(()=>{ });
   }
  obj.stage=300;
  break;







  case 100: // creating
  console.log("getting user media, obj.stage=100");
  console.log(obj.avc);
  navigator.mediaDevices.getUserMedia(obj.avc)
  .then(function(stream)
   {
   console.log("aa mediaStatus() stage="+obj.stage+"  gum ok "+aa.timerMsRunning());
   obj.res="ok";
   obj.stream=stream;
   obj.a_stream=stream.getAudioTracks()[0];
   obj.v_stream=stream.getVideoTracks()[0];
   })
  .catch(function(error)
   {
   console.log(error);
   obj.res="err";
   obj.e_constraint=error.constraint;
   obj.e_name=error.name;
   obj.e_msg=error.message;
   obj.e_code=error.code;
   console.log("aa.stage="+aa.main_state.stage+"  media status promise error="+obj.e_constraint+"  "+obj.e_name+" "+obj.e_msg+"  "+obj.e_code);
   });
  obj.stage=200;
  break;



  case 200:
  if(obj.res==null)  { break; }
  console.log(obj.res);
  if(obj.res=="err") { console.log("false 1"); return false; }
  if(obj.v_contraints)   {   obj.output_tracks=obj.output_tracks.concat(obj.v_stream);   }
  if(obj.a_contraints)   {   obj.output_tracks=obj.output_tracks.concat(obj.a_stream);   }
  if(typeof MediaStream!=='undefined')
   {
   obj.output_media_stream=new MediaStream(obj.output_tracks);
   obj.stream.getTracks().forEach(function(track)    {    obj.output_media_stream.addTrack(track);    });
   }
  else
   {
   obj.output_media_stream=obj.stream;
   }
  obj.a_settings=obj.a_stream.getSettings();
  obj.v_settings=obj.v_stream.getSettings();
  obj.torch_available=false;
  console.log("aa mediaStatus() stage="+obj.stage+"  checking torch "+aa.timerMsRunning());
  if('ImageCapture' in window)
   {
   trk=obj.output_media_stream.getVideoTracks()[0];
   obj.img_capture=new ImageCapture(trk);
   obj.pho_caps=obj.img_capture.getPhotoCapabilities().then(()=>
    {
    obj.v_stream.applyConstraints({advanced: [{torch: false}]})
    .then(()=> { obj.torch_state=false;    obj.torch_available=true;    })
    .catch(e=> { });
    }).
   catch(()=>{ });
   }
  obj.stage=300;
  break;

  case 300:
  return true;
  }
 //console.log("false 2 "+obj.stage);
 return false;
 }



 /*
 function mediaAudioVolumeSet (handle,level)
 {
 var obj,dobj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_attached!=true) { return false; }
 if((dobj=aa.guiGet(obj.attached_handle))==null)  { aa.debugAlert("At="+obj.attached_handle+" isa="+obj.is_attached); return false; }
 if(level<0) { level=0; }
 if(level>1) { level=1; }
 if(level==0)  { dobj.dom.volume=0;      dobj.dom.muted=true;   }
 else          { dobj.dom.volume=level;  dobj.dom.muted=false;  }
 return true;
 }


 function mediaAudioVolumeGet (handle)
 {
 var obj,dobj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_attached!=true) { return false; }
 if((dobj=aa.guiGet(obj.attached_handle))==null)  { aa.debugAlert(); return false; }
 if(dobj.dom.muted==true||dobj.dom.volume==0) { return 0; }
 else { return dobj.dom.volume; }
 }

*/


 function mediaAudioMuteSet (handle,state)  //////////===================
 {
 var obj;
 aa.debugAlert();
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_attached!=true) { return false; }
 if(state) {    obj.output_media_stream.getAudioTracks()[0].enabled=false; }
 else      {    obj.output_media_stream.getAudioTracks()[0].enabled=true; }
 return true;
 }


 function mediaAudioMuteGet (handle)
 {
 var obj,state;
 aa.debugAlert();
 if((obj=handleCheck(media_obj.handef,handle))==null) { return null; }
 if(obj.is_attached!=true) { return null; }
 state=obj.output_media_stream.getAudioTracks()[0].enabled;
 if(state) { return false; }
 return true;
 }


  //stream.getAudioTracks()[0].enabled=state;
//  stream.getAudioTracks()[0].enabled=state;






 function mediaRecorderStart (handle,abps,vbps)
 {
 var obj,options;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_recording==true) { alert("already recording"); return false; }

 if(MediaRecorder.isTypeSupported('video/webm;codecs=vp9'))
  {
  options={audioBitsPerSecond:abps,videoBitsPerSecond:vbps,mimeType:'video/webm;codecs=vp9'};
  }
 else
 if(MediaRecorder.isTypeSupported('video/webm;codecs=vp8'))
  {
  options={audioBitsPerSecond:abps,videoBitsPerSecond:vbps,mimeType:'video/webm;codecs=vp8'};
  }
 else
  {
  options={audioBitsPerSecond:abps,videoBitsPerSecond:vbps};
  }
 obj.is_recording=true;
 obj.recorder={};
 obj.recorder.mr=new MediaRecorder(obj.stream,options);
 obj.recorder.is_stopping=false;
 obj.recorder.is_stop=false;
 obj.recorder.is_start=false;
 obj.recorder.is_error=false;
 obj.recorder.tik=aa.timerMsRunning();

 obj.recorder.view=null;
 obj.recorder.voff=0;
 obj.recorder.vlen=0;
 obj.recorder.vrem=0;
 obj.recorder.vim=null;

 obj.recorder.elapsed=0;
 obj.recorder.dat=[];
 obj.recorder.mr.ondataavailable=function(e)
  {
  if(obj.recorder.dat.length==0)
   {
   if(0) { aa.debugAlert(obj.recorder.mr.mimeType); }
   }
  obj.recorder.dat.push(e.data);
  }
 obj.recorder.mr.onstop=function(e)           {  obj.recorder.is_stop=true;     }
 obj.recorder.mr.onstart=function(e)          {  obj.recorder.is_start=true;    }
 obj.recorder.mr.onerror=function(e)          {  obj.recorder.is_error=true;    }
 obj.recorder.mr.start(1000);
 return true;
 }






 function mediaRecorderStop (handle)
 {
 var obj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_recording!=true) { alert("not recording"); return false; }
 if(obj.recorder.is_stopping==true) { alert("already stopping"); return false; }
 obj.recorder.is_stopping=true;
 obj.recorder.mr.stop();
 return true;
 }



 function mediaRecorderCancel (handle)
 {
 var obj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 aa.debugLogger(5,obj);
 aa.debugLogger(5,obj.recorder);
 aa.debugLogger(5,obj.recorder.reader);
 aa.debugLogger(5,obj.recorder.recordedBlob);
 aa.debugLogger(5,obj.recorder.reader.fr);
 aa.debugLogger(5,obj.recorder.reader.ara);
 return true;
 }




 function mediaRecorderStatus (handle)
 {
 var obj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_recording!=true) { alert("not recording"); return false; }
 if(obj.recorder.is_stopping==true)
  {
  if(obj.recorder.is_stop!=true) { return false; }
  return true;
  }
 obj.recorder.elapsed=aa.timerMsRunning()-obj.recorder.tik;
 return true;
 }





 function mediaRecorderRead (handle)
 {
 var obj;
 if((obj=handleCheck(media_obj.handef,handle))==null) { return false; }
 if(obj.is_recording!=true) { alert("not recording");   return false; }
 if(obj.recorder.is_stop!=true) { alert("read no stop"); return false; }
 obj.recorder.recordedBlob=new Blob(obj.recorder.dat);
 obj.recorder.reader={};
 obj.recorder.reader.is_error=false;
 obj.recorder.reader.is_loadend=false;
 obj.recorder.reader.is_load=false;
 obj.recorder.reader.fr=new FileReader();
 obj.recorder.reader.fr.onerror=function()   { obj.recorder.reader.is_error=true;   }
 obj.recorder.reader.fr.onloadend=function() { obj.recorder.reader.is_loadend=true; }
 obj.recorder.reader.fr.onload=function()
  {
  obj.recorder.reader.ara=obj.recorder.reader.fr.result;
  obj.recorder.reader.is_load=true;
  }
 obj.recorder.reader.fr.readAsArrayBuffer(obj.recorder.recordedBlob);
 return true;
 }








/*-----------------------------------------------------------------------*/





 function socketObjInit ()
 {
 if(Object.keys(socket_obj).length!=0) { return; }
 socket_obj.handef=handleDefine("socket",64);
 socket_obj.is_init=true;
 }




 function socketCreate (url)
 {
 var i,h,obj;
 for(i=0;i<socket_obj.handef.slots;i++)
  {
  obj=socket_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  h=handleUse(socket_obj.handef,i)
  obj.stage=0;
  obj.ms_start=aa.timerMsRunning();
  obj.url=url;
  obj.is_open=false;
  obj.is_closed=false;
  obj.is_error=false;
  obj.is_direct=true;//false;//true;
  obj.rcve_queue_handle=aa.queueCreate();
  aa.handleCommentSet(obj.rcve_queue_handle,"socket rcve_queue");

  obj.xmit_queue_handle=aa.queueCreate();
  aa.handleCommentSet(obj.xmit_queue_handle,"socket xmit_queue");

  obj.cycle_of_timer=0;
  obj.last_timer_ms=0;

  obj.buffered=0;
  obj.buffered_threshold=250000;
  obj.vars={};
  obj.socket=new WebSocket(obj.url);
  obj.socket.binaryType='arraybuffer';
  //obj.socket.binaryType='blob';
  obj.socket.onopen=function()  {   obj.is_open=true;   }
  obj.socket.onclose=function() {   aa.debugLogger(5,"sock.close");  obj.is_closed=true; }
  obj.socket.onerror=function() {   aa.debugLogger(5,"errse");  obj.is_error=true;  }
  obj.socket.onmessage=function(data)
   {
///   aa.debugLogger(5,data.data);
    //aa.debugLogger(5,data.target.binaryType+"  "+data.srcElement.binaryType);
   queueWrite(obj.rcve_queue_handle,data.data);
   }
  return h;
  }
 return 0;
 }







 function socketDestroy (handle)
 {
 var obj;
 if((obj=handleCheck(socket_obj.handef,handle))==null) { return false; }
 if(obj.xmit_queue_handle!=0)  {  queueDestroy(obj.xmit_queue_handle);  obj.xmit_queue_handle=0;  }
 if(obj.rcve_queue_handle!=0)  {  queueDestroy(obj.rcve_queue_handle);  obj.rcve_queue_handle=0;  }
 obj.socket.onclose=function() {};
 obj.socket.close();
 obj.socket=null;
 obj.vars=null;
 handleRemove(socket_obj.handef,handle);
 return true;
 }




 function socketGet (handle)
 {
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 return(handleCheck(socket_obj.handef,handle));
 }




 function socketWrite (handle,msg)
 {
 var obj;
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 if((obj=socketGet(handle))==null) {  return false; }
 if(obj.is_direct==true&&obj.is_open==true)
  {
  //console.log("direc");
  obj.socket.send(msg,{binary:true});
  }
 else
  {
  if(aa.queueWrite(obj.xmit_queue_handle,msg)!=true) { return false; }
  socketProcess(handle);
  }
 return true;
 }




 function socketPeek (handle,ofs)
 {
 var obj,msg;
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 if((obj=socketGet(handle))==null) { return null; }
 msg=queuePeek(obj.rcve_queue_handle,ofs);
 return msg;
 }





 function socketRead (handle)
 {
 var obj,msg;
 var prs,str;
 var ser;
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 if((obj=socketGet(handle))==null) { return null; }
 msg=queueRead(obj.rcve_queue_handle);
 return msg;
 }



 function socketDiscard (handle)
 {
 var obj;
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 if((obj=socketGet(handle))==null) { return null; }
 return(queueDiscard(obj.rcve_queue_handle));
 }



 function socketProcess (handle)
 {
 var obj,info,msg,go;
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 if((obj=socketGet(handle))==null) { return false; }
 go=0;
 while(1)
  {
  go++;
  if(obj.is_direct==true)   {   if((go++)>=2) { break; }   }
  else                      {   if((go++)>=8) { break; }   }
  info=socketStatus(handle);
  if(info.xmit_queue_status.msgs_queued==0) { break; }
  if(info.is_open==true&&info.is_closed==false)
   {
   msg=queueRead(obj.xmit_queue_handle);
   obj.socket.send(msg,{binary:true});
   info=socketStatus(handle);
   }
  else   {   break;   }
  if(info.buffered>obj.buffered_threshold) { console.log(info.buffered); break; }
  }
 if(go>2)
  {
///  console.log(go);
  }
 return true;
 }





 function socketStatus (handle)
 {
 var obj,info;
 //if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 if(1&&aa_profile_group_socket) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if((obj=socketGet(handle))==null) { return null; }
 obj.buffered=obj.socket.bufferedAmount;
 info={};
 info.url=obj.url;
 info.is_open=obj.is_open;
 info.is_closed=obj.is_closed;
 info.is_error=obj.is_error;
 if(aa.main_state.cycle!=obj.cycle_of_timer)
  {
  info.ms=aa.timerMsRunning()-obj.ms_start;
  obj.last_timer_ms=info.ms;
  obj.cycle_of_timer=aa.main_state.cycle;
  }
 else
  {
  info.ms=obj.last_timer_ms;
  }
 info.buffered=obj.buffered;
 info.rcve_queue_status=aa.queueStatus(obj.rcve_queue_handle);
 info.xmit_queue_status=aa.queueStatus(obj.xmit_queue_handle);
 return info;
 }




 function socketYield ()
 {
 var go,h,c;
 if(socket_obj.handef.count==0) { return false; }
 if(1&&aa_profile_group_socket) { aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(aa_profile_group_socket) { aaProfilerHit(arguments.callee.name); }
 c=0;
 for(go=0;go<1;go++)
  {
  if(c>=socket_obj.handef.count) { return true; }
  if((h=handleNext(socket_obj.handef,true))==0) { break; }
  c++;
  socketProcess(h);
  return true;
  }
 return false;
 }




/*-----------------------------------------------------------------------*/





 function dspObjInit ()
 {
 if(Object.keys(dsp_obj).length!=0) { return; }
 dsp_obj.is_init=true;
 }




 function dspAudioResample (isampf32,irate,samples,orate)
 {
 var dstsize,dstdata,iaccum,oaccum,iratio,oratio,i_pos,o_pos,ii,oo;
 iaccum=0;
 oaccum=0;
 i_pos=0;
 o_pos=0;
 iratio=irate/orate;
 oratio=1.0;
 dstsize=Math.ceil(samples/iratio);
 dstdata=new Float32Array(dstsize);
 while(1)
  {
  ii=i_pos|0;
  oo=o_pos|0;
  if(ii>=samples) { break; }
  if(oo>=dstsize)            { break; }
  dstdata[oo]=isampf32[ii];
  oaccum+=oratio;    o_pos=oaccum;
  iaccum+=iratio;    i_pos=iaccum;
  }
 return dstdata;
 }



 function dspSineWaveAt (rate,sampleNumber,tone)
 {
 var sampleFreq=rate/tone;
 return Math.sin(sampleNumber/(sampleFreq/(Math.PI*2)));
 }



 function dspZigZag (size)
 {
 var i,j,e,obj={};
 obj.type="zigzag";
 obj.width=size;
 obj.height=size;
 obj.matrix=[];
 for(i=0;i<size;i++) { obj.matrix[i]=[]; }
 i=1;
 j=1;
 for(e=0;e<size*size;e++)
  {
  obj.matrix[i-1][j-1]=e|0;
  if((i+j)%2==0)
   {
   if(j<size) { j++;  }
   else       { i+=2; }
   if(i>1)    { i--; }
   }
  else
   {
   if(i<size) { i++; }
   else       { j+=2; }
   if(j>1)    { j--; }
   }
  }
 return obj;
 }



 function dspBlockGet (rgbaframe,framewid,framehit,channel,blksize,blkx,blky,block)
 {
 var bx,by,px,py,off,z,skp;
 off=((blky*framewid*4)+(blkx*4)+channel)|0;
 z=0|0;
 skp=((framewid*4)-(blksize*4))|0;
 for(py=0|0;py<blksize|0;py++)
  {
  for(px=0|0;px<blksize|0;px++)
   {
   block[z]=rgbaframe[off|0];
   off+=4|0;
   z+=1|0;
   }
  off+=skp|0;
  }
 return block;
 }




 function dspBlockSet (rgbaframe,framewid,framehit,channel,blksize,blkx,blky,block)
 {
 var bx,by,px,py,off,z,skp;
 off=((blky*framewid*4)+(blkx*4)+channel)|0;
 z=0|0;
 skp=((framewid*4)-(blksize*4))|0;
 for(py=0|0;py<blksize|0;py++)
  {
  for(px=0|0;px<blksize|0;px++)
   {
   rgbaframe[off|0]=block[z];
   off+=4|0;
   z+=1|0;
   }
  off+=skp|0;
  }
 }



 function dspDbCalculate (buf,step)
 {
 var len,sum,i,rms,deb,dec,obj;
 if(aa_profile_group_media) { aaProfilerHit(arguments.callee.name); }
 len=buf.length;
 sum=0;
 for(i=0|0;i<(len);i+=(step|0))  {  sum+=(buf[i]**2);  }
 obj={};
 obj.sum=sum;
 obj.dec=10*Math.log10(sum/len);
 obj.rms=Math.sqrt(sum/len);
 obj.deb=20*Math.log10(obj.rms);
 return obj;
 }




/*-----------------------------------------------------------------------*/




 function bitioObjInit ()
 {
 if(Object.keys(bitio_obj).length!=0) { return; }
 bitio_obj.handef=handleDefine("bitio",32);
 bitio_obj.is_init=true;
 }




 function bitioCreate ()
 {
 var i,h,obj;
 for(i=0;i<bitio_obj.handef.slots;i++)
  {
  obj=bitio_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  h=handleUse(bitio_obj.handef,i)
  obj.vars={};
  obj.main_array=[];
  obj.head_bit_buf=0|0;
  obj.head_bit_count=0;
  obj.tail_bit_buf=0|0;
  obj.tail_bit_count=0;
  return h;
  }
 return 0;
 }



 function bitioDestroy (handle)
 {
 var obj;
 if((obj=handleCheck(bitio_obj.handef,handle))==null) { return false; }
 obj.vars={};
 handleRemove(bitio_obj.handef,handle);
 return true;
 }




 function bitioGet (handle)
 {
 return(handleCheck(bitio_obj.handef,handle));
 }




 function bitioStatus (handle)
 {
 var obj,status;
 if((obj=bitioGet(handle))==null) { return null; }
 status={};
 status.total_bits=(obj.main_array.length*8)+obj.head_bit_count+obj.tail_bit_count;
 status.total_bytes=0;
 if(status.total_bits>0)
  {
  status.total_bytes=(status.total_bits/8)|0;
  if((status.total_bits%8)!=0) { status.total_bytes++; }
  }
 return status;
 }






 function bitioRead (handle)
 {
 var obj,buffer,i,len,val;
 if((obj=bitioGet(handle))==null) { return null; }
 buffer=0;
 i=0;
 len=obj.main_array.length;
 for(;i<len;i++)
  {
  buffer=obj.main_array[i]&((1<<obj.head_bit_count)-1);
  obj.main_array[i]=(obj.head_bit_buf<<(8-obj.head_bit_count))|(obj.main_array[i]>>>obj.head_bit_count);
  obj.head_bit_buf=buffer;
  }
 obj.tail_bit_buf|=obj.head_bit_buf<<obj.tail_bit_count;
 obj.tail_bit_count+=obj.head_bit_count;
 obj.head_bit_buf=0;
 obj.head_bit_count=0;
 if(obj.tail_bit_count>=8)
  {
  obj.main_array.push(obj.tail_bit_buf>>>(obj.tail_bit_count-8));
  obj.tail_bit_buf&=(1<<(obj.tail_bit_count-8))-1;
  obj.tail_bit_count-=8;
  }
 val=obj.main_array.shift();
 return val;
 }





 function bitioWrite (handle,bits,val,prepend)
 {
 var obj;
 if((obj=bitioGet(handle))==null) { return false; }
 if(prepend==true)
  {
  obj.head_bit_buf|=(val<<obj.head_bit_count);
  obj.head_bit_count+=bits;
  while(obj.head_bit_count>=8)
   {
   obj.main_array.unshift(obj.head_bit_buf&255);
   obj.head_bit_buf>>>=8;
   obj.head_bit_count-=8;
   }
  }
 else
  {
  obj.tail_bit_buf=(obj.tail_bit_buf<<bits)|val;
  obj.tail_bit_count+=bits;
  while(obj.tail_bit_count>=8)
   {
   obj.main_array.push(obj.tail_bit_buf>>>(obj.tail_bit_count-8));
   obj.tail_bit_buf&=(1<<(obj.tail_bit_count-8))-1;
   obj.tail_bit_count-=8;
   }
  }
 return true;
 }




/*-----------------------------------------------------------------------*/



 function rtcObjInit ()
 {
 if(Object.keys(rtc_obj).length!=0) { return; }
 rtc_obj.handef=handleDefine("rtc",64);
 rtc_obj.is_init=true;
 }




 function rtcCreate (config)
 {
 var i,h,obj;
 for(i=0;i<rtc_obj.handef.slots;i++)
  {
  obj=rtc_obj.handef.array[i];
  if(obj.in_use!=false) { continue; }
  h=handleUse(rtc_obj.handef,i)
  obj.vars={};
  obj.vars.stage=10;
  obj.vars.user_data="";
  obj.vars.in_promise=false;
  obj.vars.promise_info="";
  obj.vars.promise_object=null;
  obj.vars.prosync_handle=0;
  obj.vars.stats_in_promise=false;
  obj.vars.stats_promise_info="";
  obj.vars.stats_promise_object=null;
  obj.vars.stats_prosync_handle=0;
  obj.vars.loc_desc=null;
  obj.vars.rem_desc=null;
  obj.vars.ice_candi=null;
  obj.vars.offer=null;
  obj.vars.answer=null;
  obj.vars.rem_stream=null;
  obj.vars.gui_id=null;
  //obj.vars.gui_group_index=-1;
  obj.vars.ice_queue_handle=aa.queueCreate();
  obj.vars.ice_queue_status=aa.queueStatus(obj.vars.ice_queue_handle);
  aa.handleCommentSet(obj.vars.ice_queue_handle,"rtc ice queue");
  obj.vars.data_channel=[];
  obj.vars.data_open_count=0;
  obj.vars.data_channel_count=0;
  ///aa.debugLogger(5,"rtcCreate index "+i);
  obj.vars.pc_config=Object.assign({},config);
  obj.vars.pc=new RTCPeerConnection(obj.vars.pc_config);
  ///aa.debugLogger(50,"line="+aa.debugLineNumber()+" RTCPeerConnection");
  obj.vars.pc.self_handle=h;
  obj.vars.pc.han=h;
  obj.vars.pc.onconnectionstatechange=function(e)    { rtcOnProc(this,"onconnectionstatechange",e);   };
  obj.vars.pc.onicecandidate=function(e)             { rtcOnProc(this,"onicecandidate",e);   };
  obj.vars.pc.oniceconnectionstatechange=function(e) { rtcOnProc(this,"oniceconnectionstatechange",e);   };
  obj.vars.pc.onicegatheringstatechange=function(e)  { rtcOnProc(this,"onicegatheringstatechange",e);   };
  obj.vars.pc.onsignalingstatechange=function(e)     { rtcOnProc(this,"onsignalingstatechange",e);   };
  obj.vars.pc.onnegotiationneeded=function(e)        { rtcOnProc(this,"onnegotiationneeded",e);   };
  obj.vars.pc.ontrack=function(e)                    { rtcOnProc(this,"ontrack",e);   };
  obj.vars.pc.onaddtrack=function(e)                 { rtcOnProc(this,"onaddtrack",e);   };
  obj.vars.pc.onremovetrack=function(e)              { rtcOnProc(this,"onremovetrack",e);   };
  obj.vars.pc.onaddstream=function(e)                { rtcOnProc(this,"onaddstream",e);   };
  obj.vars.pc.onremovestream=function(e)             { rtcOnProc(this,"onremovestream",e);   };
  obj.vars.pc.ondatachannel=function(e)              { rtcOnProc(this,"ondatachannel",e);   };
  return h;
  }
 return 0;
 }





 function rtcDestroy (handle)
 {
 var obj,idx,dc,i;
 if((obj=handleCheck(rtc_obj.handef,handle))==null) { return false; }
 if(obj.vars.ice_queue_handle!=0)
  {
  aa.queueDestroy(obj.vars.ice_queue_handle);
  obj.vars.ice_queue_handle=0;
  }
 rtcPromiseClear(handle);

 if(obj.vars.stats_prosync_handle!=0)
  {
  aa.promiseDestroy(obj.vars.stats_prosync_handle);
  obj.vars.stats_in_promise=false;
  obj.vars.stats_promise_info="";
  obj.vars.stats_promise_object=null;
  obj.vars.stats_prosync_handle=0;
  }



 for(i=0;i<obj.vars.data_channel.length;i++)
  {
  dc=obj.vars.data_channel[i];
  if(dc.rcve_queue_handle!=0)
   {
   aa.queueDestroy(dc.rcve_queue_handle);
   dc.rcve_queue_handle=0;
   dc.rcve_queue_status=null;
   }
  dc.cdc.close();
  dc.cdc.onopen=null;
  dc.cdc.onclose=null;
  dc.cdc.onmessage=null;
  dc.cdc=null;
  }
 obj.vars.data_channel=[];
 obj.vars.data_open_count=0;
 obj.vars.data_channel_count=0;
 obj.vars.pc_config=null;
 obj.vars.pc.self_handle=0;
 obj.vars.pc.han=0;
 obj.vars.pc.onconnectionstatechange=null;
 obj.vars.pc.onicecandidate=null;
 obj.vars.pc.oniceconnectionstatechange=null;
 obj.vars.pc.onicegatheringstatechange=null;
 obj.vars.pc.onsignalingstatechange=null;
 obj.vars.pc.onnegotiationneeded=null;
 obj.vars.pc.ontrack=null;
 obj.vars.pc.onaddtrack=null;
 obj.vars.pc.onremovetrack=null;
 obj.vars.pc.onaddstream=null;
 obj.vars.pc.onremovestream=null;
 obj.vars.pc.ondatachannel=null;
 obj.vars.pc.close();
 obj.vars.pc=null;
 obj.vars={};
 handleRemove(rtc_obj.handef,handle);
 return true;
 }





 function rtcGet (handle)
 {
 return(handleCheck(rtc_obj.handef,handle));
 }






 function rtcStatus (handle)
 {
 var obj,status,ps;
 if(aa_profile_group_rtc) { aaProfilerHit(arguments.callee.name); }
 if((obj=rtcGet(handle))==null) { return null; }
 status={};
 status.in_promise=false;
 status.promise_info="";
 status.promise_status=null;
 if(obj.vars.in_promise==true)
  {
  status.in_promise=true;
  status.promise_info=obj.vars.promise_info;
  status.promise_status=aa.promiseStatus(obj.vars.prosync_handle);
  if(status.promise_status.state==PROMISE_completed)
   {
   //switch(obj.vars.stage)
   ///aa.debugLogger(5,obj.vars.stage+"==="+status.promise_status.etc);
   switch(status.promise_status.etc)
    {
    case 100:  obj.vars.offer=status.promise_status.val;  break;
    case 200:  obj.vars.answer=status.promise_status.val;  break;
    case 300:  obj.vars.rem_desc=status.promise_status.val;  break;
    case 400:  obj.vars.loc_desc=status.promise_status.val;  break;
    case 500:  obj.vars.ice_candi=status.promise_status.val;  break;
    default: aa.debugAlert(obj.vars.stage); break;
    }
   }
  }
 return status;
 }






 function rtcPromiseCreate (handle,stage,object,info)
 {
 var obj;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=false) { alert("rtcPromiseCreate not false"); }
 obj.vars.stage=stage;
 switch(stage)
  {
  default: aa.debugAlert(stage); break;
  case 100:  obj.vars.offer=null;  break;
  case 200:  obj.vars.answer=null;  break;
  case 300:  obj.vars.rem_desc=null;  break;
  case 400:  obj.vars.loc_desc=null;  break;
  case 500:  obj.vars.ice_candi=null;  break;
  }
 obj.vars.in_promise=true;
 obj.vars.promise_info=info;
 obj.vars.promise_object=object;
 obj.vars.prosync_handle=aa.promiseCreate(obj.vars.promise_object,stage);
 return true;
 }





 function rtcPromiseClear (handle)
 {
 var obj,ps;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=true)  { return false; }
 ps=aa.promiseStatus(obj.vars.prosync_handle);
 ///if(ps.state!=1) { aa.debugAlert("ps.state="+ps.state); return false; }
 aa.promiseDestroy(obj.vars.prosync_handle);
 obj.vars.in_promise=false;
 obj.vars.promise_info="";
 obj.vars.promise_object=null;
 obj.vars.prosync_handle=0;
 return true;
 }








 function rtcOnProc (pc,name,event)
 {
 var obj,rtc;
 if((rtc=rtcGet(pc.self_handle))==null)
  {
  if(aa_profile_group_rtc) { aa.debugAlert(pc.self_handle+"  "+rtc.vars.stage); }
  }

 switch(name)
  {
  case "onaddstream":  break;
  case "onremovestream":  break;
  case "onaddtrack":  break;
  case "onremovetrack":  break;



  case "ontrack":
  if(event.streams&&event.streams[0])
   {
   ///console.log("#############  ontrack, track has been added");
   ///console.log(event.streams[0]);
   rtc.vars.rem_stream=event.streams[0];
   rtc.vars.gui_id=null;
   }
  break;

  case "onnegotiationneeded":
  aa.debugLog(rtc.vars.user_data+"  "+name+"  !!!!!!!!!!!!!!!!");
  break;

  case "onsignalingstatechange":
  //aa.debugLogger(20,rtc.vars.user_data+"  "+name+"  "+pc.signalingState);
  //console.log(rtc.vars.user_data+"  "+name+"  "+pc.signalingState+"  @@@@@@@@@@");
  ///aa.debugLog(rtc.vars.user_data+"  "+name+"  "+pc.signalingState+"  @@@@@@@@@@");
  break;

  case "onconnectionstatechange":
  ///aa.debugLog(rtc.vars.user_data+"  "+name+"  "+pc.connectionState);
  ///if(pc.connectionState=="connected") fuckok=true;
  break;

  case "onicegatheringstatechange":
  //aa.debugLogger(25,rtc.vars.user_data+"  "+name+"  "+pc.iceGatheringState);
//  console.log(rtc.vars.user_data+"  "+name+"  "+pc.iceGatheringState);
  break;

  case "oniceconnectionstatechange":
  //aa.debugLogger(25,rtc.vars.user_data+"  "+name+"  "+pc.iceConnectionState);
//console.log(rtc.vars.user_data+"  "+name+"  "+pc.iceConnectionState);
  break;

  case "onicecandidate":
  if((obj=rtcGet(pc.self_handle))==null) { aa.debugAlert("line 5485"); }
  if(0) { aa.debugLogger(5,rtc.vars.user_data+"  "+name); }
  if(event.candidate==null||event.candidate=="")
   {
   if(0)    {    aa.debugLogger(5,"onicecandidate end of canidates");    }
   aa.queueWrite(obj.vars.ice_queue_handle,".");
   }
  else
   {
   if(0)    { aa.debugLogger(5,"onicecandidate "+event.candidate);    }
   aa.queueWrite(obj.vars.ice_queue_handle,event.candidate);
   }
  obj.vars.ice_queue_status=aa.queueStatus(obj.vars.ice_queue_handle);
  break;



  case "ondatachannel":
  aa.debugLogger(40,"*** ondatachannel "+rtc.vars.user_data+"  "+name+" "+event.channel.readyState+"  "+event.channel.label);
  rtcDataChannelAdd(pc.self_handle,event.channel.label,event.channel);
  break;


  default:
  break;
  }
 }










 function rtcOfferCreate (handle)
 {
 var obj,jex;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=false) { alert("offercreate"); }
 //aa.debugLogger(50,"line="+aa.debugLineNumber()+" createOffer");
 jex=obj.vars.pc.createOffer();
 rtcPromiseCreate(handle,100,jex,"creating_offer");
 return true;
 }




 function rtcAnswerCreate (handle)
 {
 var obj,jex;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=false) { alert("answercreate"); }
 ///aa.debugLogger(50,"line="+aa.debugLineNumber()+" createAnswer");
 jex=obj.vars.pc.createAnswer();
 rtcPromiseCreate(handle,200,jex,"creating_answer");
 return true;
 }




 function rtcDescRemoteSet (handle,desc)
 {
 var obj,jex,dex;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=false) { alert("setremoteder"); }
 //aa.debugLogger(50,"line="+aa.debugLineNumber()+" setRemoteDescription");
 jex=obj.vars.pc.setRemoteDescription(new RTCSessionDescription(desc));
 rtcPromiseCreate(handle,300,jex,"set_remote_desc");
 return true;
 }




 function rtcDescLocalSet (handle,desc)
 {
 var obj,jex;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=false) { alert("setremoteder"); }
 ///aa.debugLogger(50,"line="+aa.debugLineNumber()+" setLocalDescription");
 jex=obj.vars.pc.setLocalDescription(desc);
 rtcPromiseCreate(handle,400,jex,"set_local_desc");
 return true;
 }



 function rtcIceCandidateAdd (handle,candidate)
 {
 var obj,jex,res;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.in_promise!=false)  {  if(1) alert("icecandidateadd!!x");  }
 if(candidate==".") { return true; }
 //if(obj.vars.in_promise!=false)  {  if(1) alert("icecandidateadd!!");  }
 if(0)  {  aa.debugLogger(5,"rtcIceCandidateAdde "+candidate.candidate);  }
 jex=obj.vars.pc.addIceCandidate(candidate.candidate);
 rtcPromiseCreate(handle,500,jex,"add_ice_candidate");
 return true;
 }



 function rtcIceCandidateGet (handle)
 {
 var obj,ice;
 if((obj=rtcGet(handle))==null) { return null; }
 ice=aa.queueRead(obj.vars.ice_queue_handle);
 obj.vars.ice_queue_status=aa.queueStatus(obj.vars.ice_queue_handle);
 return ice;
 }






 function rtcDataChannelFind (handle,name)
 {
 var obj,idx,dc;
 if((obj=rtcGet(handle))==null) { return -1; }
 if(obj.vars.in_promise!=false) { alert("finddatachannel"); }
 for(idx=0;idx<obj.vars.data_channel.length;idx++)
  {
  dc=obj.vars.data_channel[idx];
  if(dc.name!=name) { continue; }
  return idx;
  }
 return -1;
 }







 function rtcOnData (handle,event)
 {
 var rtc,idx,dc,data;
 if((rtc=rtcGet(handle))==null)
  {
  if(1)
   {
   aa.debugLogger(65,"*************");
   aa.debugLogger(65,"RtcOnData rtc.handle="+handle);
   aa.debugLogger(65,"RtcOnData "+event.type+"  "+event.currentTarget.label);
   aa.debugLogger(65,"*************");
   }
  return false;
  }

 dc=null;
 for(idx=0;idx<rtc.vars.data_channel.length;idx++)
  {
  dc=rtc.vars.data_channel[idx];
  if(dc.name==event.currentTarget.label) { break; }
  }
 if(idx==rtc.vars.data_channel.length) { dc=null; }
 if(dc!==null)
  {
  //if(dc.cdc.readyState!=event.type)  alert(dc.cdc.readyState+" "+event.type);
  if(dc.cdc.readyState!=dc.last_state)
   {
   //aa.debugLogger(5,dc.name+" prev="+dc.last_state+"  rs="+dc.cdc.readyState);
   dc.last_state=dc.cdc.readyState;
   dc.is_open=false;
   if(dc.last_state=="open")     {    dc.is_open=true;    }
   }
  }


 switch(event.type)
  {
  case "open":
  rtc.vars.data_open_count++;
  aa.debugLogger(45,rtc.vars.user_data+"         onData "+event.type+"  "+event.currentTarget.label);
  break;

  case "message":
  //aa.debugLogger(65,rtc.vars.user_data+"         onData "+event.type+"  "+event.currentTarget.label);
  if(dc.rcve_queue_handle==0) { aa.debugAlert(); }
  else
   {
   aa.queueWrite(dc.rcve_queue_handle,event);
   dc.rcve_queue_status=aa.queueStatus(dc.rcve_queue_handle);
   //console.log(idx,dc.rcve_queue_status);
   }
  //data=event.data;
  //aa.debugLogger(65,event);
  //aa.debugLogger(65,event.data);
  break;

  case "closed":
  aa.debugAlert();
  break;

  case "close":
  rtc.vars.data_open_count--;
  aa.debugLogger(45,rtc.vars.user_data+"         onData "+event.type+"  "+event.currentTarget.label);
  break;

  default:
  aa.debugLogger(65,rtc.vars.user_data+"         onData "+event.type+"  "+event.currentTarget.label);
  break;
  }
 }






 function rtcDataChannelCreate (handle,name,maxretransmits,maxpktlifetime,isordered)
 {
 var obj,idx,dc,opts;
 if((obj=rtcGet(handle))==null) { return -1; }
 if(obj.vars.in_promise!=false) { alert("createdatachannel1"); }
 //aa.debugLogger(5,aa.debugFunctionName()+" "+name+" "+mode);
 idx=obj.vars.data_channel.length;
 dc={};
 dc.how="created";
 dc.is_open=false;
 dc.name=name;
 dc.max_retransmits=maxretransmits;
 dc.max_pkt_lifetime=maxpktlifetime;
 dc.is_ordered=isordered;
 dc.last_state="";
 dc.rcve_queue_handle=aa.queueCreate();
 dc.rcve_queue_status=aa.queueStatus(dc.rcve_queue_handle);
 aa.handleCommentSet(dc.rcve_queue_handle,"rtc datachannel create queue");
 dc.cdc={};
 opts={};
 if(maxretransmits!=null) { opts.maxRetransmits=maxretransmits; }
 if(maxpktlifetime!=null) { opts.maxPacketLifeTime=maxpktlifetime; }
 if(isordered!=null)      { opts.ordered=isordered; }
 dc.cdc=obj.vars.pc.createDataChannel(name,opts);
 obj.vars.data_channel[idx]=dc;
 obj.vars.data_channel_count++;
 aa.debugLogger(40,"datachancreate="+name+" idx="+idx,opts);
 dc.cdc.onopen=function(event)    {  rtcOnData(handle,event);  };
 dc.cdc.onclose=function(event)   {  rtcOnData(handle,event);  };
 dc.cdc.onmessage=function(event) {  rtcOnData(handle,event);  };
 return idx;
 }





 function rtcDataChannelAdd (handle,name,cdc)
 {
 var obj,idx,dc;
 if((obj=rtcGet(handle))==null) { return -1; }
 //aa.debugLogger(5,aa.debugFunctionName()+" "+name+" ");
 //aa.debugLogger(5,cdc);
 idx=obj.vars.data_channel.length;
 dc={};
 dc.how="added";
 dc.is_open=false;
 dc.name=name;
 dc.mode=123;
 dc.last_state="";
 dc.rcve_queue_handle=aa.queueCreate();
 dc.rcve_queue_status=aa.queueStatus(dc.rcve_queue_handle);
 aa.handleCommentSet(dc.rcve_queue_handle,"rtc datachannel add queue");
 dc.cdc={};
 dc.cdc=cdc;
 obj.vars.data_channel[idx]=dc;
 obj.vars.data_channel_count++;
 aa.debugLogger(40,"datachanAdd="+name+" idx="+idx);
 dc.cdc.onopen=function(event)    {  rtcOnData(handle,event);  };
 dc.cdc.onclose=function(event)   {  rtcOnData(handle,event);  };
 dc.cdc.onmessage=function(event) {  rtcOnData(handle,event);  };
 return idx;
 }




 function rtcDataChannelSend (handle,idx,msg)
 {
 var obj,dc;
 if((obj=rtcGet(handle))==null) { return false; }
 if(idx>=obj.vars.data_channel.length) { return false; }
 dc=obj.vars.data_channel[idx];
 ///console.log(dc);
 if(dc.is_open!=true) { return false; }
 //console.log(dc);
 ///aa.debugLogger(60,"channelsend "+idx+"  "+dc.last_state);
 dc.cdc.send(msg);
 return true;
 }



 function rtcDataChannelPeek (handle,idx)
 {
 var obj,dc,msg;
 if((obj=rtcGet(handle))==null) { return false; }
 if(idx>=obj.vars.data_channel.length) { return false; }

 dc=obj.vars.data_channel[idx];
 if(dc.is_open!=true) { return false; }
 dc.rcve_queue_status=aa.queueStatus(dc.rcve_queue_handle);
 if(dc.rcve_queue_status.msgs_queued==0) { return null; }
 msg=aa.queuePeek(dc.rcve_queue_handle,0);
 return msg;
 }




 function rtcDataChannelDiscard (handle,idx)
 {
 var obj,dc,msg,ret;
 if((obj=rtcGet(handle))==null) { return false; }
 if(idx>=obj.vars.data_channel.length) { return false; }
 dc=obj.vars.data_channel[idx];
 if(dc.is_open!=true) { return false; }
 dc.rcve_queue_status=aa.queueStatus(dc.rcve_queue_handle);
 if(dc.rcve_queue_status.msgs_queued==0) { return false; }
 if((ret=aa.queueDiscard(dc.rcve_queue_handle,0))!=true) { return ret; }
 dc.rcve_queue_status=aa.queueStatus(dc.rcve_queue_handle);
 return true;
 }




 function rtcDataChannelRead (handle,idx)
 {
 var msg,ret;
 msg=rtcDataChannelPeek(handle,idx);
 if(msg==false||msg==null) { return msg; }
 if((ret=rtcDataChannelDiscard(handle,idx))!=true) { return ret; }
 return msg;
 }




 function rtcStatsGet (handle)
 {
 var obj,jex;
 if((obj=rtcGet(handle))==null) { return false; }
 if(obj.vars.stats_in_promise!=undefined)
  {
  if(obj.vars.stats_in_promise!=false) { aa.debugAlert("in="+obj.vars.stats_in_promise); }
  }
 jex=obj.vars.pc.getStats(null);
 obj.vars.stats_in_promise=true;
 obj.vars.stats_promise_info="getting stats";
 obj.vars.stats_promise_object=jex;
 obj.vars.stats_prosync_handle=aa.promiseCreate(obj.vars.stats_promise_object,222);
 return true;
 }



 function rtcStatsGetStatus (handle)
 {
 var obj,status,val,dat,str,txt,ok,br,bx;
 if((obj=aa.rtcGet(handle))==null) { return false; }
 while(1)
  {
  if(obj.vars.stats_prosync_handle==0) { break; }
  status=aa.promiseStatus(obj.vars.stats_prosync_handle);
  if(status==undefined)
   {
   if((ret=aa.promiseDestroy(obj.vars.stats_prosync_handle))!=true) { }//aa.debugAlert(); }
   obj.vars.stats_prosync_handle=0;
   obj.vars.stats_in_promise=false;
   return true;
   }
  if(status.state==undefined)          { aa.debugAlert(); }
  if(status.state==PROMISE_pending)    { break; }
  if(status.state==PROMISE_rejected)   { aa.debugAlert(status.err+" "+status.etc); }
  if(status.state!=PROMISE_completed)  { aa.debugAlert(status.state); break;  }
  val=status.val;
  if((ret=aa.promiseDestroy(obj.vars.stats_prosync_handle))!=true) { aa.debugAlert(); }
  obj.vars.stats_prosync_handle=0;
  obj.vars.stats_in_promise=false;
  return val;
  }
 return false;
 }













/*-----------------------------------------------------------------------*/






 function mainObjInit ()
 {
 var state,vars;
 if(Object.keys(main_obj).length!=0) { return; }
 state={};
 vars={};
 state.is_running=false;
 state.is_exiting=false;
 state.version=0;
 state.speed=0;
 state.proc=null;
 state.thread_id=0;
 state.worker_array=[];
 main_obj.state=state;
 main_obj.vars=vars;
 main_obj.vars.app={};
 main_obj.is_init=true;
 }



 function mainClickProc (event)
 {
 if(event==null) { alert("epnull"); return; }
 switch(event.type)
  {
  case "click":
  case "touchend":
  case "tap":
  aa.main_state.initial_click=true;//click_count++;
  break;
  }
 return true;
 }





 function mainStart (ver,spd,mainproc)
 {
 if(main_obj.state.is_running!=false) { return false; }
 //if(conclr) { console.clear(); }
// aa.debugLogger(5,"\n\n\n\n-----------------------");
 document.body.style.touchAction="none";
 document.body.style.pointerEvents="none";
 document.documentElement.style.touchAction="none";


 //clientWidth||window.innerWidth||document.body.clientWidth;
// document.body.style.touchAction="pan-y";
 main_obj.state.version=ver;
 main_obj.state.cycle=-1;
 main_obj.state.thread_id=0;
 main_obj.state.speed_req=spd;
 main_obj.state.speed_got=0;
 main_obj.state.speed_to=0;
 main_obj.state.proc=mainproc;
 main_obj.state.is_running=true;
 main_obj.state.stage=0;
 main_obj.state.initial_click=false;
 mainWorkerAdd("socketYield",socketYield,2);
  main_obj.state.click_listeners=true;
  window.addEventListener("touchend",mainClickProc);
  window.addEventListener("click",mainClickProc);
  window.addEventListener("tap",mainClickProc);

 return true;
 }




 function mainThrottleFix (workerscript)
 {
 if(!/MSIE 10/i.test (navigator.userAgent))
  {
  try
   {
   var blob=new Blob
   (["var fakeIdToId={};\
   onmessage=function (event) \
    {\
    var data=event.data,name=data.name,fakeId=data.fakeId,time;\
    if(data.hasOwnProperty('time')) {	time=data.time; }\
    switch(name) \
     {\
     case 'setInterval':	 fakeIdToId[fakeId]=setInterval(function() {postMessage({fakeId:fakeId});},time); break;\
     case 'clearInterval': if(fakeIdToId.hasOwnProperty(fakeId))     {clearInterval(fakeIdToId[fakeId]); delete fakeIdToId[fakeId]; } break;\
     case 'setTimeout': 	 fakeIdToId[fakeId]=setTimeout(function()  {postMessage({fakeId:fakeId}); if(fakeIdToId.hasOwnProperty(fakeId)) { delete fakeIdToId[fakeId];} },time); break;\
     case 'clearTimeout':	 if(fakeIdToId.hasOwnProperty(fakeId))     {clearTimeout(fakeIdToId[fakeId]); delete fakeIdToId[fakeId]; } break;\
     }\
    }"]);
   workerscript=window.URL.createObjectURL(blob);
   }
  catch(error)
   {
   aa.debugLogger(5,"use non blob (file) copy of blob");
   return false;
   }
  }
  var worker,fakeIdToCallback={},lastFakeId=0,maxFakeId=0x7FFFFFFF;
  if(typeof (Worker)!=='undefined')
   {
   function _getFakeId()
    {
    do { if(lastFakeId==maxFakeId) { lastFakeId=0; } else { lastFakeId++; }  }  while(fakeIdToCallback.hasOwnProperty(lastFakeId));
    return lastFakeId;
    }
   try
    {
    worker=new Worker(workerscript);
    window.setInterval=function(callback,time)
     {
     var fakeId=_getFakeId();
     alert("throt si "+time);
     fakeIdToCallback[fakeId]={callback:callback,parameters:Array.prototype.slice.call(arguments,2)};
     worker.postMessage({name:'setInterval',fakeId:fakeId,time:time});
     return fakeId;
     };
    window.clearInterval=function(fakeId)
     {
     if(fakeIdToCallback.hasOwnProperty(fakeId))
      {
      delete fakeIdToCallback[fakeId];
      worker.postMessage({name:'clearInterval',fakeId:fakeId});
      }
     };
    window.setTimeout=function(callback,time)
     {
     var fakeId=_getFakeId();
     time=time+33;
     //alert("st "+time);
     fakeIdToCallback[fakeId]={callback:callback,parameters:Array.prototype.slice.call(arguments,2),isTimeout:true};
     worker.postMessage({name:'setTimeout',fakeId:fakeId,time:time});
     return fakeId;
     };
    window.clearTimeout=function(fakeId)
     {
     if(fakeIdToCallback.hasOwnProperty(fakeId))
      {
      delete fakeIdToCallback[fakeId];
      worker.postMessage({name:'clearTimeout',fakeId:fakeId});
      }
     };
    worker.onmessage=function(event)
     {
     var data=event.data,fakeId=data.fakeId,request,parameters,callback;
     if(fakeIdToCallback.hasOwnProperty(fakeId))
      {
      request=fakeIdToCallback[fakeId];
      callback=request.callback;
      parameters=request.parameters;
      if(request.hasOwnProperty('isTimeout')&&request.isTimeout) { delete fakeIdToCallback[fakeId]; }
      }
     if(typeof (callback)==='string')
      {
      try {callback=new Function(callback);}
      catch(error)
       {
       ///aa.debugLogger(5,'Error parsing callback code string: ',error);
       }
      }
     if(typeof (callback)==='function')
      {
      callback.apply(window,parameters);
      }
     };
    worker.onerror=function(event)
     {
     ///aa.debugLogger(5,event);
     };
    }
   catch(error)
    {
    ///aa.debugLog ('Initialisation failed');
    console.error(error);
    }
   }
 else
  {
  return false;
  }
 return true;
 }








 function mainWorkerAdd (name,proc,step)
 {
 var work={};
 work.name=name;
 work.proc=proc;
 work.step=step;
 main_obj.state.worker_array.push(work);
 return true;
 }





 function mainWorkerRemove (name)
 {
 var i,work;
 for(i=0;i<main_obj.state.worker_array.length;i++)
  {
  work=main_obj.state.worker_array[i];
  if(work.proc==undefined||work.proc==null) { continue; }
  if(work.name!=name)                       { continue; }
  work.name=null;
  work.proc=null;
  work.step=0;
  return true;
  }
 return false;
 }




 function mainWorkerStep ()
 {
 var i,work;
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 if(main_obj.state.worker_array.length<=0) { return true; }
 for(i=0;i<main_obj.state.worker_array.length;i++)
  {
  work=main_obj.state.worker_array[i];
  if(work.proc==undefined||work.proc==null) { continue; }
  if(work.step<1)                           { continue; }
  if(((main_obj.state.cycle%work.step)==(work.step-1))||(main_obj.state.cycle==1)) {   work.proc();   }
  }
 return true;
 }





 function mainProc ()
 {
 var msr,dif,del;
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 main_obj.state.cycle++;
 mainWorkerStep();
 if(aa.main_state.initial_click==true)
  {
  if(main_obj.state.click_listeners==true)
   {
//   console.log("removing listeners");
   window.removeEventListener("touchend",mainClickProc);
   window.removeEventListener("click",mainClickProc);
   window.removeEventListener("tap",mainClickProc);
   document.body.style.touchAction="none";
   document.body.style.pointerEvents="none";
   document.documentElement.style.touchAction="none";
   }
  main_obj.state.click_listeners=false;
  //document.body.style.touchAction="none";
  }
 main_obj.state.proc();
 msr=aa.timerMsRunning()/1000;
 main_obj.state.speed_got=parseInt(main_obj.state.cycle/msr);
 main_obj.state.speed_to=parseInt((1000/main_obj.state.speed_req));
 dif=main_obj.state.speed_req-main_obj.state.speed_got;
 if(dif!=0)
  {
  del=Math.abs(dif);
  if(del>8)  { del=8; }
  del*=3;
  if(dif>+2)   { main_obj.state.speed_to-=del;   }
  else
  if(dif<-2)  { main_obj.state.speed_to+=del;   }
  if(main_obj.state.speed_to<6) { main_obj.state.speed_to=6; }
  }
 return true;
 }








 function mainRun ()
 {
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 main_obj.state.thread_id=window.setTimeout(function()
  {
  clearTimeout(main_obj.state.thread_id);
  main_obj.state.thread_id=0;
  mainProc();
  if(main_obj.state.is_running==false)
   {
   if(main_obj.state.is_exiting==true) { alert("dl="+aa.debugLineNumber()); }
   }
  if(main_obj.state.is_exiting==true)
   {
   if(main_obj.state.is_running==false) { alert("dl="+aa.debugLineNumber()); }
   main_obj.state.is_running=false;
   }

  if(main_obj.state.is_running==true)
   {
   mainRun();
   }
  else
   {
   console.log("global kill");
   aa.debugLogger(5,"global kill");
    //console.log(arguments.callee.name+"/"+arguments.callee.caller.name);
   aa.handleGlobalKill();
   aa.handleGlobalDump();
   aa.debugLogger(5,JSON.stringify("mu="+aa.debugMemoryUsage(),0,2));
   }
  },main_obj.state.speed_to);
 return true;
 }



 function mainExit (code)
 {
 if(main_obj.state.is_running!=true) { return false; }
 if(main_obj.state.is_exiting!=false) { return true; }
 main_obj.state.is_exiting=true;
 return true;
 }



 function mainProcSet (proc)
 {
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 main_obj.state.proc=proc;
 return true;
 }




 function mainSpeedSet (speed)
 {
 var msr;
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 main_obj.state.speed_req=speed;
 main_obj.state.speed_to=parseInt((1000/main_obj.state.speed_req));
 msr=aa.timerMsRunning()/1000;
 main_obj.state.speed_got=parseInt(main_obj.state.cycle/msr);
 main_obj.state.speed_to=parseInt((1000/main_obj.state.speed_req));
 }




 function mainStageAdjust (by)
 {
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 main_obj.state.stage+=parseInt(by);
 }



 function mainStageSet (stage)
 {
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 main_obj.state.stage=stage;
 }




 function mainStageGet ()
 {
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 return main_obj.state.stage;
 }




 function mainCycleGet ()
 {
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 return main_obj.state.cycle;
 }



 function mainCyclePulse (stride)
 {
 var s1;
 if(aa_profile_group_main) { aaProfilerHit(arguments.callee.name); }
 s1=stride|0;
 if(s1<1) { sl=1; }
 if((main_obj.state.cycle%s1)==0)  {  return true;  }
 return false;
 }






 function mainPluginLoad (url,id)
 {
 var obj,p,s,scr,e,mat,so,ep;
 obj={};
 obj.type="plugin";
 obj.head=document.head;
 obj.state=0;
 obj.is_ready=false;
 obj.vars={};
 obj.res=null;
 obj.api=null;
 obj.api_procs=null;
 obj.script=document.createElement('script');
 obj.script.type='text/javascript';
 obj.script.defer=true;
 obj.script.id=id;
 obj.script.src=url+"?"+aa.numRand(10000000);
 function _eventPath(evt)
  {
  var path=(evt.composedPath&&evt.composedPath())||evt.path,target=evt.target;
  if(path!=null) {  return(path.indexOf(window)<0)?path.concat(window):path; }
  if(target===window) { return [window]; }
  function _getParents(node,memo)
   {
   memo=memo||[]; var pn=node.parentNode;
   if(!pn) { return memo; }
   return _getParents(pn,memo.concat(pn));
   }
  return [target].concat(_getParents(target),window);
  }

 function _pluginErrorHandler(event)
  {
  event.preventDefault();
  obj.is_ready=true;
  obj.res="err";
  obj.state=3;
  };
 window.addEventListener('error',_pluginErrorHandler);

 obj.script.onload=function(event)
  {
  ep=_eventPath(event);
  for(p=0;p<ep.length;p++)
   {
   if(obj.state==1) { break; }
   if(typeof ep[p]==='object')
    {
    if(ep[p].scripts)
     {
     for(e=0;e<ep[p].scripts.length;e++)
      {
      if((so=aa.stringIndexOf(true,ep[p].scripts[e].src,obj.script.src,0))<0) { continue; }
      obj.state=1;
      break;
      }
     }
    }
   }
  if(obj.state==1)
   {
   function _getAllProcs(object)
    {
    return Object.getOwnPropertyNames(object).filter(function(property) { return typeof object[property]=='function'; });
    }
   obj.api=pluginEntry();
   obj.api_procs=_getAllProcs(obj.api);
   obj.is_ready=true;
   obj.res="ok";
   obj.state=2;
   }
  else
   {
   obj.is_ready=true;
   obj.res="err";
   obj.state=3;
   }
  };
 obj.head.appendChild(obj.script);
 return obj;
 }






 function mainPluginFree (obj)
 {
 var elem,res,eid;
 if(obj.type!="plugin") { return false; }
 elem=document.getElementById(obj.script.id);
 elem.parentNode.removeChild(elem);
 obj.type="";
 obj.state=0;
 obj.is_ready=false;
 obj.res=null;
 obj.api=null;
 obj.api_procs=null;
 obj.vars={};
 obj.head={};
 obj.script={};
 delete obj.api;
 delete obj.api_procs;
 delete obj.head;
 delete obj.script;
 delete obj.vars;
 delete obj.state;
 delete obj.is_ready;
 delete obj.res;
 delete obj.type;
 obj={};
 return true;
 }





/*-----------------------------------------------------------------------*/




 return {
 handle_obj:handle_obj,
 debug_obj:debug_obj,
 promise_obj:promise_obj,
 timer_obj:timer_obj,
 num_obj:num_obj,
 data_obj:data_obj,
 string_obj:string_obj,
 env_obj:env_obj,
 queue_obj:queue_obj,
 pointer_obj:pointer_obj,
 keyboard_obj:keyboard_obj,
 storage_obj:storage_obj,
 gui_obj:gui_obj,
 media_obj:media_obj,
 socket_obj:socket_obj,
 dsp_obj:dsp_obj,
 bitio_obj:bitio_obj,
 rtc_obj:rtc_obj,
 main_obj:main_obj,

 retcode:retcode,

 debugSpeedTest:debugSpeedTest,
 debugLineNumber:debugLineNumber,
 debugFunctionName:debugFunctionName,
 debugLogFunctionLine:debugLogFunctionLine,
 debugStackUsage:debugStackUsage,
 debugStackGet:debugStackGet,
 debugAlert:debugAlert,
 debugLevelSet:debugLevelSet,
 debugClear:debugClear,
 debugLog:debugLog,
 debugLoggerLevelSet:debugLoggerLevelSet,
 debugLogger:debugLogger,
 debugMemoryUsage:debugMemoryUsage,

 promiseCreate:promiseCreate,
 promiseDestroy:promiseDestroy,
 promiseGet:promiseGet,
 promiseStatus:promiseStatus,


 timerTikNow:timerTikNow,
 timerTikElapsed:timerTikElapsed,
 timerMsRunning:timerMsRunning,
 timerMsElapsed:timerMsElapsed,
 timerMicroRunning:timerMicroRunning,
 timerTimeoutSet:timerTimeoutSet,
 timerTimeoutReset:timerTimeoutReset,
 timerTimeoutTest:timerTimeoutTest,
 timerRaterInit:timerRaterInit,
 timerRaterUpdate:timerRaterUpdate,

 numRand:numRand,
 numFixed:numFixed,
 numPercentOf:numPercentOf,
 numPercentIs:numPercentIs,
 numPad:numPad,
 numIntToHex:numIntToHex,
 numRound:numRound,
 numFloatFormat:numFloatFormat,
 numIsWhole:numIsWhole,
 numBitGet:numBitGet,
 numBitSet:numBitSet,
 numBitClear:numBitClear,
 numBitToggle:numBitToggle,
 numDegreesToRadian:numDegreesToRadian,
 numDistanceGet:numDistanceGet,
 numAngleGet:numAngleGet,
 numRotate:numRotate,


 dataArray2DCreate:dataArray2DCreate,
 dataObjectApxSize:dataObjectApxSize,
 dataGlobalExists:dataGlobalExists,
 dataGlobalPropertiesGet:dataGlobalPropertiesGet,
 dataObjectIsEmpty:dataObjectIsEmpty,
 dataObjectIsUndefined:dataObjectIsUndefined,
 dataObjectLength:dataObjectLength,
 dataValueExists:dataValueExists,
 dataValueIsEmpty:dataValueIsEmpty,
 dataValueIsNotEmpty:dataValueIsNotEmpty,
 dataArrayVargs:dataArrayVargs,
 dataArrayRotate:dataArrayRotate,
 dataArrayUniqueCount:dataArrayUniqueCount,
 dataFloat32ArrayToUint8Array:dataFloat32ArrayToUint8Array,
 dataUint8ArrayToFloat32Array:dataUint8ArrayToFloat32Array,
 dataFloat32ArrayToInt16Array:dataFloat32ArrayToInt16Array,
 dataInt16ArrayToFloat32Array:dataInt16ArrayToFloat32Array,
 dataInt16ArrayToUint8Array:dataInt16ArrayToUint8Array,
 dataUint8ArrayToInt16Array:dataUint8ArrayToInt16Array,

 stringIndexOf:stringIndexOf,
 stringLastCharGet:stringLastCharGet,
 stringLastCharTrim:stringLastCharTrim,
 stringFirstCharGet:stringFirstCharGet,
 stringFirstCharTrim:stringFirstCharTrim,
 stringSha256:stringSha256,
 stringUuid:stringUuid,
 stringBase64FromUint8:stringBase64FromUint8,
 stringBase64ToUint8:stringBase64ToUint8,
 stringSplitter:stringSplitter,
 stringTime:stringTime,
 stringParms:stringParms,


 envInfoGet:envInfoGet,
 envBrowserArgByKey:envBrowserArgByKey,
 envBrowserArgByIndex:envBrowserArgByIndex,
 envBrowserArg:envBrowserArg,
 envDisplayGet:envDisplayGet,
 envDisplayCompareText:envDisplayCompareText,
 envDisplayCompare:envDisplayCompare,
 envZoomFix:envZoomFix,
 envTitleSet:envTitleSet,
 envTitleGet:envTitleGet,
 envReload:envReload,
 envGoto:envGoto,
 envFavIconGet:envFavIconGet,
 envFavIconSet:envFavIconSet,
 envManifestInit:envManifestInit,
 envManifestSet:envManifestSet,
 envManifestApply:envManifestApply,

 handleDefine:handleDefine,
 handleCheck:handleCheck,
 handleReset:handleReset,
 handleGet:handleGet,
 handleUse:handleUse,
 handleRemove:handleRemove,
 handleNext:handleNext,
 handleText:handleText,
 handleGlobalDump:handleGlobalDump,
 handleGlobalKill:handleGlobalKill,
 handleCommentSet:handleCommentSet,
 handleCommentGet:handleCommentGet,


 queueCreate:queueCreate,
 queueDestroy:queueDestroy,
 queueGet:queueGet,
 queueWrite:queueWrite,
 queueRead:queueRead,
 queuePeek:queuePeek,
 queueDiscard:queueDiscard,
 queueStatus:queueStatus,


 pointerStart:pointerStart,
 pointerCacheAdd:pointerCacheAdd,
 pointerCacheRemove:pointerCacheRemove,
 pointerCacheGetById:pointerCacheGetById,
 pointerCacheGetByIndex:pointerCacheGetByIndex,
 pointerOnEvent:pointerOnEvent,
 pointerPeek:pointerPeek,
 pointerRead:pointerRead,
 pointerStatus:pointerStatus,


 keyboardStart:keyboardStart,
 keyboardPeek:keyboardPeek,
 keyboardRead:keyboardRead,
 keyboardStatus:keyboardStatus,

 storageCreate:storageCreate,
 storageDestroy:storageDestroy,
 storageGet:storageGet,
 storagePurge:storagePurge,
 storageRead:storageRead,
 storageWrite:storageWrite,
 storageRemove:storageRemove,
 storageTuple:storageTuple,
 storageStatus:storageStatus,

 guiCreate:guiCreate,
 guiDestroy:guiDestroy,
 guiGet:guiGet,
 guiGroupGet:guiGroupGet,
 guiIdFind:guiIdFind,
 guiParentAdd:guiParentAdd,
 guiParentRemove:guiParentRemove,
 guiSizeSet:guiSizeSet,
 guiVideoSizeSet:guiVideoSizeSet,
 guiCssAreaSet:guiCssAreaSet,
 guiCssAreaGet:guiCssAreaGet,
 guiCssCordSet:guiCssCordSet,
 guiCssSizeSet:guiCssSizeSet,
 guiCanvasFix:guiCanvasFix,
 guiSizeFix:guiSizeFix,
 guiRetinaSet:guiRetinaSet,
 guiLineHeightGet:guiLineHeightGet,
 guiPixelHeightGet:guiPixelHeightGet,
 guiCanvasClear:guiCanvasClear,
 guiCanvasReset:guiCanvasReset,
 guiCanvasSmoothingSet:guiCanvasSmoothingSet,
 guiCanvasFontMatch:guiCanvasFontMatch,
 guiCanvasFontSet:guiCanvasFontSet,
 guiCanvasTextMeasure:guiCanvasTextMeasure,
 guiCanvasAlphaSet:guiCanvasAlphaSet,
 guiCanvasImageGet:guiCanvasImageGet,
 guiCanvasImagePut:guiCanvasImagePut,
 guiCanvasImageDraw:guiCanvasImageDraw,
 guiCanvasImageWarp3:guiCanvasImageWarp3,
 guiCanvasImageWarp4:guiCanvasImageWarp4,
 guiCanvasScroll:guiCanvasScroll,
 guiCanvasBorder:guiCanvasBorder,
 guiCanvasFill:guiCanvasFill,
 guiCanvasFillFull:guiCanvasFillFull,
 guiCanvasArcBorder:guiCanvasArcBorder,
 guiCanvasArcFill:guiCanvasArcFill,
 guiCanvasLine:guiCanvasLine,
 guiCanvasText:guiCanvasText,
 guiCanvasRounded:guiCanvasRounded,
 guiCanvasTriangle:guiCanvasTriangle,
 guiCanvasGrid:guiCanvasGrid,
 guiCssOpacitySet:guiCssOpacitySet,
 guiCssDisplaySet:guiCssDisplaySet,
 guiCssOutlineSet:guiCssOutlineSet,
 guiRectsGet:guiRectsGet,
 guiEaseInit:guiEaseInit,
 guiEaseProcess:guiEaseProcess,
 guiRgbaString:guiRgbaString,
 guiRgbaStringCommon:guiRgbaStringCommon,
 guiRectSet:guiRectSet,
 guiRectAdjust:guiRectAdjust,
 guiAreaSet:guiAreaSet,
 guiAreaAdjust:guiAreaAdjust,
 guiXyUvSet:guiXyUvSet,
 guiRgbaSet:guiRgbaSet,
 guiRgbaAdjust:guiRgbaAdjust,
 guiRgbaToHsva:guiRgbaToHsva,
 guiRgbaToString:guiRgbaToString,
 guiHsvaSet:guiHsvaSet,
 guiHsvaAdjust:guiHsvaAdjust,
 guiHsvaToRgba:guiHsvaToRgba,
 guiUpdateAreaInit:guiUpdateAreaInit,
 guiUpdateAreaFin:guiUpdateAreaFin,
 guiUpdateAreaAdd:guiUpdateAreaAdd,
 guiSpotClear:guiSpotClear,
 guiSpotFind:guiSpotFind,
 guiSpotRemove:guiSpotRemove,
 guiSpotRangeRemove:guiSpotRangeRemove,
 guiSpotAdd:guiSpotAdd,
 guiSpotAdjust:guiSpotAdjust,
 guiSpotMatch:guiSpotMatch,
 guiSpotDump:guiSpotDump,
 guiFontLoad:guiFontLoad,
 guiFontDelete:guiFontDelete,
 guiFontStatus:guiFontStatus,




 mediaDeviceDetectReset:mediaDeviceDetectReset,
 mediaDeviceDetect:mediaDeviceDetect,
 mediaDeviceCountGet:mediaDeviceCountGet,
 mediaDeviceGet:mediaDeviceGet,
 mediaDeviceCapsGet:mediaDeviceCapsGet,
 mediaCreate:mediaCreate,
 mediaDestroy:mediaDestroy,
 mediaGet:mediaGet,
 mediaAttach:mediaAttach,
 mediaTorchSet:mediaTorchSet,
 mediaStatus:mediaStatus,
 //mediaAudioVolumeSet:mediaAudioVolumeSet,
 //mediaAudioVolumeGet:mediaAudioVolumeGet,
 mediaAudioMuteSet:mediaAudioMuteSet,
 mediaAudioMuteGet:mediaAudioMuteGet,
 mediaRecorderStart:mediaRecorderStart,
 mediaRecorderStop:mediaRecorderStop,
 mediaRecorderCancel:mediaRecorderCancel,
 mediaRecorderStatus:mediaRecorderStatus,
 mediaRecorderRead:mediaRecorderRead,

 socketCreate:socketCreate,
 socketDestroy:socketDestroy,
 socketGet:socketGet,
 socketWrite:socketWrite,
 socketPeek:socketPeek,
 socketRead:socketRead,
 socketDiscard:socketDiscard,
 socketProcess:socketProcess,
 socketStatus:socketStatus,

 dspAudioResample:dspAudioResample,
 dspSineWaveAt:dspSineWaveAt,
 dspZigZag:dspZigZag,
 dspBlockGet:dspBlockGet,
 dspBlockSet:dspBlockSet,
 dspDbCalculate:dspDbCalculate,

 bitioCreate:bitioCreate,
 bitioDestroy:bitioDestroy,
 bitioGet:bitioGet,
 bitioStatus:bitioStatus,
 bitioRead:bitioRead,
 bitioWrite:bitioWrite,

 rtcCreate:rtcCreate,
 rtcDestroy:rtcDestroy,
 rtcGet:rtcGet,
 rtcPromiseClear:rtcPromiseClear,
 //rtcClearPromise:rtcClearPromise,
 //rtcIsBusy:rtcIsBusy,
 rtcStatus:rtcStatus,
 rtcOfferCreate:rtcOfferCreate,
 rtcAnswerCreate:rtcAnswerCreate,
 rtcDescRemoteSet:rtcDescRemoteSet,
 rtcDescLocalSet:rtcDescLocalSet,
 rtcIceCandidateAdd:rtcIceCandidateAdd,
 rtcIceCandidateGet:rtcIceCandidateGet,
 rtcDataChannelFind:rtcDataChannelFind,
 rtcDataChannelCreate:rtcDataChannelCreate,
 rtcDataChannelAdd:rtcDataChannelAdd,
 rtcDataChannelSend:rtcDataChannelSend,
 rtcDataChannelPeek:rtcDataChannelPeek,
 rtcDataChannelDiscard:rtcDataChannelDiscard,
 rtcDataChannelRead:rtcDataChannelRead,
 rtcStatsGet:rtcStatsGet,
 rtcStatsGetStatus:rtcStatsGetStatus,

 main_vars:main_obj.vars,
 main_state:main_obj.state,
 mainClickProc:mainClickProc,
 mainStart:mainStart,
 mainThrottleFix:mainThrottleFix,
 mainWorkerAdd:mainWorkerAdd,
 mainWorkerRemove:mainWorkerRemove,
 mainRun:mainRun,
 mainExit:mainExit,
 mainProcSet:mainProcSet,
 mainSpeedSet:mainSpeedSet,
 mainStageAdjust:mainStageAdjust,
 mainStageSet:mainStageSet,
 mainStageGet:mainStageGet,
 mainCycleGet:mainCycleGet,
 mainCyclePulse:mainCyclePulse,
 mainPluginLoad:mainPluginLoad,
 mainPluginFree:mainPluginFree,
 };


/*-----------------------------------------------------------------------*/

})();



 function aaProfilerStart ()
 {
 var index,obj;
 if(Object.keys(aa_profiler).length!=0) { return true; }
 aa_profiler.is_started=true;
 aa_profiler.msec_base=new Date().valueOf();
 aa_profiler.ray=[];
 aa_profiler.global_hits=0;
 aa_profiler.global_names=0;
 aa_profiler.index_low=1000000000;
 aa_profiler.index_high=0;
 for(index=0;index<25000;index++)
  {
  obj={};
  obj.state=0;
  obj.name="";
  obj.hash=0;
  obj.hits=0;
  obj.flag=0;
  aa_profiler.ray[index]=obj;
  }
 //console.log("aaProfiler started");
 return true;
 }




 function aaProfilerStop ()
 {
 if(Object.keys(aa_profiler).length==0) { return true; }
 aa_profiler.is_started=false;
 aa_profiler={};
 //console.log("aaProfiler stopped");
 return true;
 }





 function aaProfilerDump (minperc,maxperc,minhz,maxhz,minhits,maxnum,dosummary,quick)
 {
 var raylen,index,obj,txt,str,all,perc,band,remain,num;
 var mperc,speed,msr,secs;
 if(Object.keys(aa_profiler).length==0) { return false; }
 if(aa_profiler.is_started!=true)       { return false; }
 raylen=aa_profiler.ray.length;
 mperc=minperc;
 msr=(new Date().valueOf()-aa_profiler.msec_base);
 all="";
 all+="\r\n\r\n";
 all+="***************************\r\n";
 if(dosummary)
  {
  all+="main_cycle="+aa.main_state.cycle+"   ";
  all+="main_stage="+aa.main_state.stage+"\r\n";
  str="ms_running="+msr+"";
  all+=str.padEnd(10)+" ";
  all+="speed_req/got="+aa.main_state.speed_req+"/"+aa.main_state.speed_got+"\r\n";
  all+="global_names="+aa_profiler.global_names+"  global_hits="+aa_profiler.global_hits+"\r\n";
  all+="m/m perc="+minperc+"/"+maxperc+"  ";
  all+="m/m hz="+minhz+"/"+maxhz+"\r\n";
  all+="minhits="+minhits+" maxnum="+maxnum+"\r\n";
  if(aa_profiler.global_hits>0)   {   all+="---------------------------\r\n";   }
  }
 remain=aa_profiler.global_names;
 band=99.0;
 num=0;

 if(quick==true)
  {
  for(index=aa_profiler.index_low;index<(aa_profiler.index_high+1);index++)
   {
   obj=aa_profiler.ray[index];
   if(obj.state==0)     { continue; }
   if(obj.flag)         { continue; }
   if(minhits>obj.hits) { continue; }
   perc=((100.0/aa_profiler.global_hits)*obj.hits).toFixed(2);
   if(perc>=minperc&&perc<=maxperc)
    {
    secs=msr/1000.0;
    speed=obj.hits/secs;
    if((speed>=minhz&&speed<=maxhz)&&(maxnum>num))
     {
     txt="";
     str=""+num+"";         txt+=str.padEnd(4);
     str=""+obj.name+"";    txt+=str.padEnd(44);
     str=""+obj.hits+"";    txt+=str.padEnd(9);
     str=""+perc+"%";       txt+=str.padEnd(9);
     speed=speed.toFixed(2);
     str=""+speed+"hz";     txt+=str.padEnd(8);
     all+=txt+"\r\n";
     }
    }
   obj.flag=1;
   num++;
   }
  }
 else
  {
  while(1)
   {
   if(remain==0) { break; }
   for(index=aa_profiler.index_low;index<(aa_profiler.index_high+1);index++)
    {
    obj=aa_profiler.ray[index];
    if(obj.state==0)     { continue; }
    if(obj.flag)         { continue; }
    if(minhits>obj.hits) { continue; }
    perc=((100.0/aa_profiler.global_hits)*obj.hits).toFixed(2);
    if(perc<band)    { continue; }
    if(perc>=minperc&&perc<=maxperc)
     {
     secs=msr/1000.0;
     speed=obj.hits/secs;
     if((speed>=minhz&&speed<=maxhz)&&(maxnum>num))
      {
      txt="";
      str=""+num+"";         txt+=str.padEnd(4);
      str=""+obj.name+"";    txt+=str.padEnd(44);
      str=""+obj.hits+"";    txt+=str.padEnd(9);
      str=""+perc+"%";       txt+=str.padEnd(9);
      speed=speed.toFixed(2);
      str=""+speed+"hz";     txt+=str.padEnd(8);
      all+=txt+"\r\n";
      }
     }
    obj.flag=1;
    num++;
    remain--;
    }
   if(band<0) { break; }
   band=band-0.01;
   }
  }




 for(index=aa_profiler.index_low;index<(aa_profiler.index_high+1);index++)
  {
  obj=aa_profiler.ray[index];
  if(obj.state) { obj.flag=0; }
  }

 all+="***************************\r\n\r\n";
 return all;
 }








 function aaProfilerHashCode (str)
 {
 var i,char,hash=0|0;
 if(str.length==0) {  return hash;    }
 for(i=0|0;i<str.length;i++)
  {
  char=str.charCodeAt(i);
  hash=((hash<<5)-hash)+char;
  hash=hash&hash;
  }
 if(hash<0) { hash=Math.abs(hash); }
 return hash;
 }





 function aaProfilerHit (name,count)
 {
 var hash,raylen,obj,index,cnt;
 if(Object.keys(aa_profiler).length==0) { return false; }
 if(aa_profiler.is_started!=true) { return false; }
 if(arguments.length==2)  { cnt=count; }
 else                     { cnt=1;     }
 if(cnt<=0)               { return false; }
 raylen=aa_profiler.ray.length;
 hash=aaProfilerHashCode(name);
 index=hash%raylen;
 while(cnt--)
  {
  obj=aa_profiler.ray[index];
  if(index<aa_profiler.index_low)  { aa_profiler.index_low=index; }
  if(index>aa_profiler.index_high) { aa_profiler.index_high=index; }

  if(obj.state==0)
   {
   obj.state=1;
   obj.name=name;
   obj.hash=hash;
   obj.hits=1;
   aa_profiler.global_hits++;
   aa_profiler.global_names++;
   }
  else
  if(obj.state==1)
   {
   if(obj.name!=name||obj.hash!=hash) { alert("profilerErr "+obj.name+"  "+name+"  "+index+"  "+obj.hash+"  "+hash); }
   obj.hits++;
   aa_profiler.global_hits++;
   }
  aa_profiler.ray[index]=obj;
  }
 return true;
 }




