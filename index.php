<?php
$vvv=round(microtime(true)*1000);
$yyy=round(microtime(true)*1000); $yyy=937;
$req=$_SERVER['REQUEST_URI'];
if(empty($_SERVER['HTTPS'])||$_SERVER['HTTPS']==="off") { header('HTTP/1.1 301 Moved Permanently'); header('Location: '.'https://'.$_SERVER['HTTP_HOST'].$req); exit; }
$link=(isset($_SERVER['HTTPS'])&&$_SERVER['HTTPS']==='on'?"https":"http")."://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
function echoScript      ($sf) { echo "<script type='text/javascript' src='".$sf."'></script>\n"; }
function echoCode        ($cd) { echo "<script type='text/javascript'>".$cd."</script>\n";        }
?>
<!doctype html>
<html lang='en'>
<head>
<title>MeBeam - You see what I&apos;m saying</title>
<?php echo "<link rel='manifest' href='https://mebeam.com/manifest.json?".$vvv."'>"; ?>
<meta     name='viewport'               content='user-scalable=no, width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5' />
<meta     name='theme-color'            content='#ffffff'/>
<meta property='og:title'               content="MeBeam - You see what I'm saying">
<meta property='og:description'         content='MeBeam - Video Call'>
<meta property='og:image'               content='/imgs/mblogo200.png'>
<meta property='og:site_name'           content='MeBeam'>
<meta property='og:type'                content='website'>
<meta     name='description'            content='MeBeam - Video Call'>
<meta     name='mobile-web-app-capable' content='yes'>
<meta     name='apple-mobile-web-app-capable'          content='yes'>
<meta     name='apple-mobile-web-app-status-bar-style' content='black-translucent'>
<link rel='icon' type='image/png'            href='/imgs/mblogo32.png'>
<link rel='apple-touch-icon'                 href='/imgs/mblogo152.png'>
<link rel='apple-touch-icon' sizes='76x76'   href='/imgs/mblogo76.png'>
<link rel='apple-touch-icon' sizes='120x120' href='/imgs/mblogo120.png'>
<link rel='apple-touch-icon' sizes='152x152' href='/imgs/mblogo152.png'>
<meta http-equiv='cache-control' content='no-cache, must-revalidate, post-check=0, pre-check=0' >
<meta http-equiv='cache-control' content='max-age=0'>
<meta http-equiv='expires'       content='0'>
<meta http-equiv='expires'       content='Tue, 01 Jan 1980 1:00:00 GMT'>
<meta http-equiv='pragma'        content='no-cache'>
<style type="text/css">
*                           {  margin:0;   padding:0; overflow: hidden;  outline:0;  border:none; width:100%;  height:100%; } //background: none;  }
html                        {  margin:0;   padding:0; overflow: hidden;  outline:0;  border:none; width:100%;  height:100%;  }
body                        {  margin:0;   padding:0; overflow: hidden;  outline:0;  border:none; width:100%;  height:100%; background: #fff;   }
canvas                      {  overflow: hidden; background: none; }
video                       {  overflow: hidden; background: #000; }
#bodid                      {  overflow: hidden; }
a:active,      a:focus      {  outline:0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
button:active, button:focus {  outline:0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
span:active,   span:focus   {  outline:0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
div:active,    div:focus    {  outline:0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
img:active,    img:focus    {  outline:0;  border: none;  -moz-outline-style: none;  box-shadow: none;  text-decoration:none;}
-webkit-text-size-adjust:none;
    -ms-text-size-adjust:none;
   -moz-text-size-adjust:none;
        text-size-adjust:none;
</style>
</head>
<body id="bodid"></body>
<?php
echoScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js?".$yyy);
echoScript("https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection@0.0.3/dist/face-landmarks-detection.js?".$yyy);
$code_host="https://mebeam.com/code";
echoScript($code_host."/aaJs.js?".$vvv);
echoScript($code_host."/aaConfig.js?".$vvv);
echoScript($code_host."/aaApp.js?".$vvv);
echoScript($code_host."/aaCrap.js?".$vvv);
echoScript($code_host."/aaUix.js?".$vvv);
echoScript($code_host."/aaSprite.js?".$vvv);
echoScript($code_host."/aaBeam.js?".$vvv);
echoScript($code_host."/aaFace.js?".$vvv);
echoScript($code_host."/aaMarkup.js?".$vvv);
echoScript($code_host."/aaIO.js?".$vvv);
echoScript($code_host."/aaRex.js?".$vvv);
echoScript($code_host."/aaVam.js?".$vvv);
echoScript($code_host."/aaVideo.js?".$vvv);

?>
</html>
