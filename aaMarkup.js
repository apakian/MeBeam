

 function markupNew (bfs,bffam,margin,linemargin)
 {
 var obj;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 obj={};
 obj.type="markup";
 obj.base_font_size=bfs;
 obj.ray=[];
 obj.current={};
 obj.current.font_size=0;
 obj.current.font_family=bffam;
 obj.current.font_weight=500;
 obj.current.font_rgb=app.uix.rgb_markup_def_font;
 obj.widest=0;
 obj.margin=margin;
 obj.line_margin=linemargin;
 return obj;
 }




 function markupDelete (obj)
 {
 var r,rl,ray;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="markup") { return false; }
 rl=obj.ray.length;
 for(r=0;r<rl;r++)  {  ray=obj.ray[r];  ray={};  }
 obj.ray=null;
 obj.current=null;
 obj=null;
 return true;
 }




 function markupStyle (obj,fs,rgb,weight,family)
 {
 var sz;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="markup") { return false; }
 if(fs!=null)
  {
  sz=obj.base_font_size+fs;
  if(sz<0) { return false; }
  obj.current.font_size=fs;
  }
 if(rgb!=null)      {  obj.current.font_rgb=rgb; }
 if(weight!=null)   {  obj.current.font_weight=weight; }
 if(family!=null)   {  obj.current.font_family=family; }
 return true;
 }




 function markupAppend (obj,spid,type,txt)
 {
 var ri;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="markup") { return false; }
 ri={};
 ri.font_size=obj.current.font_size;
 ri.font_rgb=obj.current.font_rgb;
 ri.font_weight=obj.current.font_weight;
 ri.font_family=obj.current.font_family;
 ri.type=type;
 ri.txt=txt;
 ri.x=0;
 ri.y=0;
 ri.w=0;
 ri.h=0;
 ri.spid=spid;
 obj.ray[obj.ray.length]=ri;
 return true;
 }




 function markupCalculate (obj)
 {
 var r,rl,ray,mes,fnt,grp,ff,fs;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="markup")            { return null; }
 if((grp=app.uix.popup_grp)==null) { return null; }
 rl=obj.ray.length;
 ff="9999 9999px 'xxx'";
 for(r=0;r<rl;r++)
  {
  ray=obj.ray[r];
  fs=obj.base_font_size+ray.font_size;
  fnt=ray.font_weight+" "+(fs*1.0)+"px '"+ray.font_family+"'";
  if(fnt!=ff)  {  aa.guiCanvasFontSet(grp.han,fnt);   grp.ctx.filter="none";   ff=fnt;   }
  mes=aa.guiCanvasTextMeasure(grp.han,ray.txt);
  ray.x=obj.margin;
  ray.w=mes.w+(obj.margin*2);
  ray.h=mes.h;
  mes=null;
  }
 obj.widest=0;
 ray=obj.ray[0];
 ray.y=obj.margin;
 mes=ray.y;
 for(r=0;r<rl;r++)
  {
  ray=obj.ray[r];
  if(ray.w>=obj.widest) { obj.widest=ray.w; }
  if(r==0) { mes+=ray.h+obj.line_margin; continue; }
  ray.y=mes;
  mes+=ray.h+obj.line_margin;
  }
 rect=aa.guiRectSet(obj.ray[0].x,obj.ray[0].y, obj.widest, (obj.ray[rl-1].y+obj.ray[rl-1].h)+(obj.margin));
 return rect;
 }




 function markupKeep (obj)
 {
 var r,rl,ray,mes,fnt,grp,ff,fs,areb;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="markup")            { return false }
 if((grp=app.uix.popup_grp)==null) { return false; }
 areb=aa.guiCssAreaGet(grp.han);
 rl=obj.ray.length;
 for(r=0;r<rl;r++)
  {
  ray=obj.ray[r];
  if(ray.spid==0) { continue; }
  aa.guiSpotAdd(ray.spid, areb.left+ray.x,areb.top+ray.y,grp.dom.width-(obj.margin*2),ray.h );
  }
 return true;
 }




 function markupPaint (obj)
 {
 var grp,rect,grad,r,rl,ray,fs,fnt,hit,yy,rgb;
 if(1&&use_profiler==true&&mb_profile_group_markup) {  aaProfilerHit(arguments.callee.name+"/"+arguments.callee.caller.name); }
 if(obj.type!="markup")             { return null; }
 if((grp=app.uix.popup_grp)==null)  { return null; }
 aa.guiCanvasClear(grp.han,false);
 grp.ctx.save();
 rect=aa.guiRectSet(0,0,grp.dom.width,grp.dom.height);
 aa.guiCanvasAlphaSet(grp.han,cfg_popup_alpha);
 grp.dom.style.opacity=1.0;
 grad=grp.ctx.createLinearGradient(rect.x,rect.y-1,(rect.x+rect.w)/2,(rect.y+rect.h)+10);
  grad.addColorStop(0.0,app.uix.rgb_markup_grad_1);
  grad.addColorStop(0.5,app.uix.rgb_markup_grad_2);
  grad.addColorStop(1.0,app.uix.rgb_markup_grad_3);
 aa.guiCanvasFillFull(grp.han,grad);
 aa.guiCanvasBorder(grp.han,rect.x+2,rect.y+2,rect.w-4,rect.h-4,1,app.uix.rgb_markup_border);

 grp.ctx.restore();
 grad=null;
 rl=obj.ray.length;
 for(r=0;r<rl;r++)
  {
  ray=obj.ray[r];
  fs=obj.base_font_size+ray.font_size;
  grp.ctx.filter="none";
  fnt=ray.font_weight+" "+(fs*1.0)+"px '"+ray.font_family+"'";
  if(ray.type==1)
   {
   yy=ray.y+(ray.h*0.85);
   yy=aa.numFixed(yy);
   aa.guiCanvasLine(grp.han,ray.x,yy,(ray.x+grp.dom.width)-(obj.margin*2),yy,2,ray.font_rgb);
   }
  aa.guiCanvasText(grp.han,ray.x,ray.y,0,null,ray.font_rgb,fnt,ray.txt);
  }
 }












