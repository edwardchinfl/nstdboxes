/* Ideas Backlog
2. import additional attributes and use as filter
11. Remove redundant code
12. Tidy up javascript format
13. Minify/obfuscate code
19. transform
21. video
22. background animation
23. zoom (dimitris)
24. live api to data (dimitris)
25. update specific box
26. feedback function
27. combine boxes from different documents
28. a href parent
29. vw for all - revert to px - done
30. animation
31. bug - gridColumnGap, gridRowGap
32. change all units to vw, vh, vmin, vmax ?
33. lock boxes
34. images - flickr
35. import from google sheet
36. circular menu


Car Park
7. UNIcode lookup

Done
1. user access control -done
4. radius / px ! - done
8. Menu - done !
9. Textarea - bigger - done !
14. Replace menu with icons - done !
15. Use unicode instead of google icons ? - done !
16. bg color bug - done ?
18. position ? - done

*/


function selectbgcolor(){
  /* First part : pre-defined color schemes */
  /* optionlist.innerHTML="";*/
  /* optionlist > xtablediv > xtable > colorchartrow > cell */
  /* optionlist > spectrum */
  if(!CurrentP){
    nbxalert("Error","Please select a box first.","red");
    return;
  }

  if(typeof xtablediv == "undefined"){
    xtablediv=document.createElement("div");
    xtablediv.id="xtablediv";
    xtablediv.style.backgroundColor="white";
    
    xtable=document.createElement("TABLE");
    xtablediv.appendChild(xtable);
    
    for(i=0;i<colorscheme.length;i++){
      colorchartrow=document.createElement("TR")
      colorchartrow.id="CR"+i
      xtable.appendChild(colorchartrow)
      
      cell=document.createElement("TD")
      colorchartrow.appendChild(cell)
      cell.innerHTML=colorscheme[i][0]
      for(j=1;j<6;j++){
        cell=document.createElement("TD")
        cell.id="CR"+i+"C"+j
        cell.setAttribute("row-color",i)
        cell.setAttribute("col-color",j)
        colorchartrow.appendChild(cell)
        cell.style.backgroundColor=colorscheme[i][j]
        var z=colorscheme[i][j]
        cell.style.width="20px"
        cell.style.height="20px"
        cell.style.cursor="pointer";
        cell.onclick=function(){
            setBackgroundColor(this.getAttribute("row-color"),this.getAttribute("col-color"));
            optionlist.style.display="none";
        }
      }
    }
  xtablediv.style.height="250px";
  xtablediv.style.overflow="auto";
  optionlist.appendChild(xtablediv);
  
  }
  if(typeof spectrum=="undefined"){
    
    spectrum=document.createElement("div");
    optionlist.appendChild(spectrum)
    spectrum.id="spectrum";
    spectrum.style.backgroundColor="white";
    spectrum.innerHTML+="<br>Full spectrum <input type='color' id='bgcolorid' value='#000000'>"
    spectrum.innerHTML+="<p id='bgtransparent' onclick=togglebg()></p>"
      
  }
  if(CurrentP.style.backgroundColor=="transparent"){
    elem("bgtransparent").innerHTML="Transparent ?:YES";
  }
  else{
    elem("bgtransparent").innerHTML="Transparent ?:NO";
  }  
  if(CurrentP.style.backgroundColor !="transparent"){
    elem("bgcolorid").value=RGBtoHex(CurrentP.style.backgroundColor);
  }
  else{
    elem("bgcolorid").value="#000000" 
  }
  
  elem("bgcolorid").onchange=function(){
    CurrentP.style.backgroundColor=hexToRGB(this.value);
  }
  setoptionposition();
  show(xtablediv);
  show(spectrum);
  olhdiv1.innerHTML="Background colour"
  show(optionlist);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  //optionlist.onmouseleave=function(){}
    
} 
    
function selectbgimage(){
  optionlist.style.width=wide;
  if(!CurrentP){
    nbxalert("Error","Please select a box first.","red");
    return;
  }
  if(typeof bgdiv=="undefined"){
    bgdiv=document.createElement("div");
    bgdiv.style.marginTop="2rem";
    bgdiv.style.marginLeft="2rem";
    
    bgdiv.style.backgroundColor="white"
    optionlist.appendChild(bgdiv)
  
  }  
    bgdiv.innerHTML="<span onclick={setbgimg('single')} class='nbxbutton'>single</span> or <span onclick={setbgimg('multiple')} class='nbxbutton'>multiple</span> images ?"
  
    setoptionposition();
  

    show(bgdiv);
    olhdiv1.innerHTML="Background image"
    show(optionlist);
    show(optionlistheader,"flex");
    setoptionlistwidth();
    /* override onmouseleave so that can access spectrum */
    //optionlist.onmouseleave=function(){}
    //optionlist.style.maxHeight="400px"
    //optionlist.style.width=computestyle(optionlistheader,"width");
      
  
    

  }

    
function setbgimg(para){
  switch(para){
    case "single":{
      bgtext="<TABLE>"
    
      bgtext+="<TR><TD colspan=2>Single Background image</TD></TR>"
      bgtext+="<TR><TD colspan=2><textarea placeholder='url(..)' onchange={CurrentP.style.backgroundImage=this.value;} id='bgurl' cols='20' rows='3' ></textarea></TD>"
      bgtext+="</TR>"
    
    /* Blend mode */
      bgtext+="<TR onclick={toggle(elem('bgblend'))}>"
      bgtext+='<TD>Blend mode</TD><TD class="option" style="cursor:pointer;" id="currbgblend"> '+computestyle(CurrentP,"background-blend-mode")+'</TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgblend' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>normal</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>multiply</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>screen</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>overlay</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>darken</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>lighten</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>color-dodge</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>saturation</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>color</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgblend','background-blend-mode')}>luminosity</DIV>"
      bgtext+="</DIV></TD></TR>"
      bgtext+="<TR>"
      bgtext+='<TD>Position</TD><TD><input class="option" type="text" size="14" id="currbgpos" onclick={toggle(elem("bgposn"))} value="'+computestyle(CurrentP,"background-position")+'"></TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgposn' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>left top</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>left center</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>left bottom</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>center top</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>center center</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>center bottom</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>right top</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>right center</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgpos','background-position','value')}>right bottom</DIV>"
      bgtext+="</DIV></TD></TR>"
      /* size */
      bgtext+="<TR>"
      bgtext+='<TD>Size</TD><TD><input class="option" type="text" size="14" id="currbgsize" onclick={toggle(elem("bgsize"))} value="'+computestyle(CurrentP,"background-size")+'"></TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgsize' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgsize','background-size','value')}>auto</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgsize','background-size','value')}>cover</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgsize','background-size','value')}>contain</DIV>"
      bgtext+="</DIV></TD></TR>"
      /* repeat */
      bgtext+="<TR onclick={toggle(elem('bgrepeat'))}>"
      bgtext+='<TD>Repeat</TD><TD class="option" id="currbgrepeat"> '+computestyle(CurrentP,"background-repeat")+'</TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgrepeat' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgrepeat','background-repeat')}>repeat</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgrepeat','background-repeat')}>repeat-x</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgrepeat','background-repeat')}>repeat-y</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgrepeat','background-repeat')}>no-repeat</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgrepeat','background-repeat')}>space</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgrepeat','background-repeat')}>round</DIV>"
      bgtext+="</DIV></TD></TR>"
      /* origin */
      
      bgtext+="<TR onclick={toggle(elem('bgorigin'))}>"
      bgtext+='<TD>Origin</TD><TD class="option" id="currbgorigin">'+computestyle(CurrentP,"background-origin")+'</TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgorigin' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgorigin','background-origin')}>padding-box</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgorigin','background-origin')}>border-box</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgorigin','background-origin')}>content-box</DIV>"
      bgtext+="</DIV></TD></TR>"
      /* clip */
      bgtext+="<TR onclick={toggle(elem('bgclip'))}>"
      bgtext+='<TD>Clip</TD><TD class="option" id="currbgclip" >'+computestyle(CurrentP,"background-clip")+'</TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgclip' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgclip','background-clip')}>padding-box</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgclip','background-clip')}>border-box</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgclip','background-clip')}>content-box</DIV>"
      bgtext+="</DIV></TD></TR>"
      /* attachment */
      bgtext+="<TR onclick={toggle(elem('bgatt'))}>"
      bgtext+='<TD>Attachment</TD><TD class="option" id="currbgatt">'+computestyle(CurrentP,"background-attachment")+'</TD>'
      bgtext+="</TR>"
      bgtext+="<TR><TD></TD><TD><DIV class='option1' id='bgatt' style='display:none'>"
      bgtext+="<DIV onclick={updateprop(this,'currbgatt','background-attachment')}>scroll</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgatt','background-attachment')}>fixed</DIV>"
      bgtext+="<DIV onclick={updateprop(this,'currbgatt','background-attachment')}>local</DIV>"
      bgtext+="</DIV></TD></TR>"
      bgtext+="</TABLE>"
      bgdiv.innerHTML=bgtext;
      //console.log("bgdiv "+bgdiv.style.width+"/"+computestyle(bgdiv,"width"));
      elem("bgurl").value=computestyle(CurrentP,'background-image');
      break;
    }
     case "multiple":{
      bgtext="<TABLE><TR><TD>Multiple Background images</TD></TR>"
      bgtext+="<TR><TD><textarea placeholder='url(..),url(...)' onchange={CurrentP.style.background=this.value;} id='bgurl2' cols='30' rows='3' ></textarea></TD>"
      //bgtext+="<TR><TD><span onclick={CurrentP.style.background=elem('bgurl2').value;}class='nbxbutton'>save</span><span class='nbxbutton'>cancel</span> onchange={CurrentP.style.background=this.value;} id='bgurl2' cols='30' rows='3' ></textarea></TD>"
      
      bgtext+="</TR></TABLE>"
      bgdiv.innerHTML=bgtext;
      elem("bgurl2").value=computestyle(CurrentP,'background');
      break;
    } 
         
  }
  //optionlist.style.width="35vw"
  setoptionlistwidth();
}
    
    
    
 

function togglebg(){
  if(CurrentP.style.backgroundColor=="transparent"){
    CurrentP.style.backgroundColor=CurrentP.previousbgcolor;
    elem("bgtransparent").innerHTML="Transparent ?:NO";
  }
  else{
    CurrentP.previousbgcolor=CurrentP.style.backgroundColor;
    CurrentP.style.backgroundColor="transparent";
    elem("bgtransparent").innerHTML="Transparent ?:YES";
  
  }
}

function elem(id){
  return(document.getElementById(id))
}

function toggle(ele){
  if(ele.style.display=="none"){
    ele.style.display="block";
  }
  else{
    ele.style.display="none";
  }
}

function updateprop(ele,id,propname,proptype){
  CurrentP.style[propname]=ele.innerHTML;
  if(proptype=="value"){

  elem(id).value=ele.innerHTML;
  }
  else{
    elem(id).innerHTML=ele.innerHTML;
    
  }
}

function hide(ele){
  //console.log("hiding "+ele.id)
  if(ele.style.display!="none"){
    ele.setAttribute("predisplay",ele.style.display)
  }
  ele.style.display="none";

}

function hideicons(){
  hide(editicon);
  hide(cuticon);
  hide(copyicon);
  hide(pasteicon);
  hide(pastenexticon);
  hide(tipcircle);
}

function setBackgroundColor(i,j){
  CurrentP.style.backgroundColor=colorscheme[i][j];
}

function selectfontsize(){
  optionlist.style.width=narrow;
  if(!CurrentP){
    nbxalert("Error","Please select a box","red");
    return;
  }
  // optionlist > fsinputdiv 
  if(typeof fsinputdiv == "undefined"){
    fsinputdiv=document.createElement("div");
    fsinputdiv.id="fsinputdiv";
    fsinputdiv.style.marginTop="2vh";
    fsinputdiv.style.textAlign="right";
    fsinputdiv.style.marginRight="2rem";
    //fsinputcont.style.position="fixed";
    //fsinputdiv.style.paddingTop="5px";
    cfs=setvalue("data_remsize",getComputedStyle(document.documentElement).getPropertyValue('--nbx-rem-size'))
    addsection(fsinputdiv,"Size of 1 REM "+showi('remsize')+" :<input type='text' size='6' id='fs' value="+cfs+" onchange=setroot('fs',this.value)>")
    
    addsection(fsinputdiv,"Font size of box :<input type='text' id='fontsizeinput' size='6'  onchange={CurrentB.style.fontSize=this.value+'rem';}>");
    fsselectdiv=document.createElement("SELECT");
    //fsselectdiv.className="option1"
    fsinputdiv.appendChild(fsselectdiv);
    j=0.0
    for(i=1;i<=20;i++){
      option=document.createElement("option")
      j=j+0.1;
      option.text=j.toString().substring(0,3);
      fsselectdiv.add(option);
    }
    for(i=2.0;i<=10.0;i++){
      option=document.createElement("option")
      option.text=i.toString().substring(0,2);
      fsselectdiv.add(option);
    }
    fsselectdiv.onchange=function(){
      CurrentB.style.fontSize=this.value+'rem';
      elem('fontsizeinput').value=this.value; 
    }
    fsselectdiv.size="10";
    fsselectdiv.style.width="4vw"
    
    

    optionlist.appendChild(fsinputdiv);

  }  
//optionlist > fontsizediv > fontsizeitem
    setoptionposition(); 
    cfs=setvalue("data_remsize",getComputedStyle(document.documentElement).getPropertyValue('--nbx-rem-size'))
    
    elem("fontsizeinput").value=parseInt(computestyle(CurrentB,"font-size").split('px')[0]) / parseInt(cfs.split('px')[0]);
    show(fsinputdiv);
    //show(fontsizediv);
    show(optionlist);
    show(optionlistheader,"flex")
  
    olhdiv1.innerHTML="Font size in REM"
    setoptionlistwidth();
    
    
} 

function selecttextalignment(){
  if(!CurrentB){
    nbxalert("Error","Please select a box","red");
    return;
  }
  switch(CurrentB.style.textAlign){
    case "left" :
      x="center";
      x_icon="format_align_center";
      break;
    case "center" :
      x="right";
      x_icon="format_align_right";
      break;
    case "right" :
        x="justify";
        x_icon="format_align_justify";
        break;
        
    case "justify" :
      x="left";
      x_icon="format_align_left";
      break;
    default:
      x="center";
      x_icon="format_align_center";      
  }
  CurrentB.style.textAlign=x;
  //elem("mi"+menuitem["TextAlign"][0]).innerHTML="<i style='font-size:12px' class='material-icons'>"+x_icon+"</i>"
    
}

function z_initfileops(){

//fileops=elem("fileops")

text="<TABLE><TR><TD>File action</TD><TD>"
text+="<select id='filesource'>"
text+="<option value='sb'>Save in local storage</option>"
text+="<option value='rb'>Get from local storage</option>"
//text+="<option value='rc'>Download from Cloud (v0)</option>"
//text+="<option value='sc'>Upload to Cloud</option>"
//text+="<option value='rd'>Download from Cloud</option>"

text+="<option value='sc'>Upload to Cloud</option>"
text+="<option value='rx'>Download from Cloud</option>"
text+="<option value='ri'>Insert from Cloud</option>"


//text+="<option value='ro'>Download from Archive (old)</option>"
text+="</select>"
text+="</TD></TR><TR><TD>"

text+="Filename :</TD><TD> <input type='text' id='filename'></TD></TR>"
text+="<TR><TD colspan='2'><DIV id='accessright' display='none'></DIV></TD</TR>"
text+="<TR><TD colspan='2' style='text-align:center'>"
text+="<button onclick={hide(elem('accessright'));hide(closeicon);fileaction()}>go</button></TD></TR></TABLE>"



fileops.innerHTML=text
filename=elem("filename");
filename.onchange=function(){
  console.log(this.value);
  this.value.replace(/ /g,"_");
  CurrentWebPage=this.value;
  console.log(this.value)
}
filesource=elem("filesource");

filesource.onchange=function(){
  if(this.value=="sb"){
    hide(files);
    hide(closeicon);
    hide(elem("accessright"));
  }
  if(this.value=="rb"){
    hide(files);
    hide(closeicon);
    hide(elem("accessright"));
    showbrowserfiles()
  }
  if(this.value=="ri"||this.value=="rx"){
    //elem('filename').value="";
    hide(elem("accessright"));
    
    showcloudfiles();
    //addclosebutton(files,"bottomright",closeicon);
  
    
  }
  if(this.value=="sc"||this.value=="sx"){ 
      hide(files);
      hide(closeicon); 
      txt='<label for="accessrightoptions">Access control </label>'
      txt+='<select id="accessrightoptions">'
      txt+='<option value="vo">Anyone can view</option>'
      txt+='<option value="vd">Only domain members can view</option>'
      
      txt+='<option value="ve">Anyone can edit</option>'
      txt+='<option value="ed">Only domain members can edit</option>'
    
      txt+='<option value="oo">Only owner can view and edit</option>'
      txt+='</select>'
      elem("accessright").innerHTML=txt;
      show(elem("accessright"))
  }
}
filesource.onclick=filesource.onchange;
fileops.style.display="none";

}

function initfindelement(){
findelement=elem("findelement")
ftext="Find <input type='text' id='findtext'>"
ftext+="<button onclick='findelements()'>go</button>"
findelement.innerHTML=ftext;
findelement.style.display='none'
}

function findelements(){
  
searchlist=[]

texttofind=elem('findtext')
listofp=document.getElementsByTagName("p")
//console.log("p "+listofp.length)
j=0
for(i=0;i<listofp.length;i++){
  //console.log(listofp[i].innerHTML+"/"+texttofind.value)
  if(listofp[i].innerHTML.toUpperCase().indexOf(texttofind.value.toUpperCase())!=-1 ){
    searchlist[j]=[];
       searchlist[j][0]=listofp[i].id
       searchlist[j][1]=listofp[i].parentElement.id
       searchlist[j][2]=listofp[i].parentElement.parentElement.childNodes[0].innerHTML
       searchlist[j][3]=listofp[i].innerHTML.slice(0,30)+"..."
       //console.log(searchlist[j])
       j++;
  }
}
searchresults=elem("searchresults")
searchresults.innerHTML=""
//console.log("search items "+searchlist.length)
for(j=0;j<searchlist.length;j++){
  searchresults.innerHTML+="<DIV class='option' onclick={zoomon('"+searchlist[j][1]+"')}>"+searchlist[j][1]+" : "+searchlist[j][3]+"</DIV>"
  
}
//console.log(searchresults.innerHTML);

searchresults.style.top=parseInt(findelement.style.top.split("px")[0])+findelement.offsetHeight+"px"
searchresults.style.left=findelement.style.left
searchresults.style.display="block"
searchresults.style.position="fixed"
searchresults.style.zIndex="4"
//console.log(searchresults.style.top);
//console.log(searchresults.style.left);

searchresults.onmouseleave=function(){this.style.display="none"}
}

function newfindelements(event){
  
  findelement=elem("findelement")
  if(findelement.style.display!="none"){
    findelement.style.display="none";
    return;
  }
  ftext="Find <input type='text' id='findtext'>"
  ftext+="<button onclick='findelements()'>go</button>"
  ftext+="<button onclick='hide(this.parentElement)'>x</button>"
  
  findelement.innerHTML=ftext;
  findelement.style.display='block'
  findelement.style.top="100px"
  //parseInt(event.target.top.split("px")[0])+event.target.offsetHeight+"px"
  findelement.style.left="100px"
  findelement.style.position="fixed"
  findelement.style.height="1.8rem"
  findelement.style.textAlign="center"
  findelement.style.width="20vw";
  //event.target.left;
  //findelements();



}

function zoomon(elementID){
  console.log("zooming on"+elementID)
  element=elem(elementID)
  if(element.getAttribute("predisplay")!=""){
    element.style.display=element.getAttribute("predisplay")
  }
  else{
    element.style.display="block";
  }
  parent=element.parentElement
  while (parent.style.display=="none"){
    if(parent.getAttribute("predisplay")!=""){
      parent.style.display=parent.getAttribute("predisplay")
    }
    else{
      parent.style.display="block";
    } 
    parent=parent.parentElement;
  }
  element.scrollIntoView(); 
  if(element.tagName=="P"){
  showoutline(element.parentElement,"p");
  }
  else{
    showoutline(element,"p");
  }


}

function saveinbrowser(ev){
  optionlist.style.width=wide;
  if(typeof filesavediv=="undefined"){
    filesavediv=document.createElement("DIV");
    filesavediv.innerHTML="<br>Nested Box Title<br> "
    filesavediv.style.padding="2rem";
    filesavediv.style.textAlign="center"
    filename=document.createElement("input");
    filename.id="filename"
    filename.type='text';
    filename.size='40';
    filesavediv.appendChild(filename)
    filesavediv.innerHTML+="<br><br><br>"
    pageorboxdiv=document.createElement("DIV");
    filesavediv.appendChild(pageorboxdiv);
    txt='<label for="pageorbox">Save what ?</label><br>'
    txt+='<select id="pageorbox">'
    txt+='<option value="wp">Main Nested Box</option>'
    txt+='<option value="bx">Selected box(container)</option>'  
    txt+='</select>'
    pageorboxdiv.innerHTML+=txt





    save_browser=document.createElement("div");
    save_browser.innerHTML="Save in the browser"
    save_browser.classList.add("nbxbutton")
    filesavediv.appendChild(save_browser)
    filename.onchange=function(){
      //console.log(this.value);
      this.value.replace(/ /g,"_");
      //CurrentWebPage=this.value;
      //console.log(this.value)
    }

    save_browser.onclick=function(){
    
      //console.log("Hello"+filename.value)
  
      save_restore('sb',elem("filename").value,updcwp);
      
    }
    optionlist.appendChild(filesavediv)
  }
  filename.value=CurrentWebPage;
  console.log("gg"+filename.value)
  elem("filename").value=CurrentWebPage;
  console.log("fn"+elem("filename").value+"/"+CurrentWebPage)
  setoptionposition("Font",ev);
  olhdiv1.innerHTML="Saving nested box in local browser"
  
  show(optionlist);
  show(filesavediv);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  
  //optionlist.onmouseleave=function(){};
  //addclosebutton(optionlist,"topleft",closeicon);


}

function saveincloud(ev){
  optionlist.style.width=wide;
  if(typeof filesavecdiv=="undefined"){
    filesavecdiv=document.createElement("DIV");
    filesavecdiv.innerHTML="<br>Nested Box Title "+showi("title")+"<br> "
    filesavecdiv.style.padding="2rem";
    
    filenamec=document.createElement("input");
    filenamec.type='text';
    filenamec.id="filenamec";
    filenamec.size='40';
    
    filesavecdiv.appendChild(filenamec)
    filesavecdiv.innerHTML+="<br><br>"

    cpageorboxdiv=document.createElement("DIV");
    filesavecdiv.appendChild(cpageorboxdiv);
    txt='<label for="cpageorbox">Save what ?</label><br>'
    txt+='<select id="cpageorbox">'
    txt+='<option value="wp">Main Nested Box</option>'
    txt+='<option value="bx">Selected nested box</option>'  
    txt+='</select>'
    cpageorboxdiv.innerHTML+=txt







    accessright=document.createElement("div");
    filesavecdiv.appendChild(accessright)
    txt='<label for="accessrightoptions">Who can access this Nested Box ?</label><br>'
    txt+='<select id="accessrightoptions">'
    txt+='<option value="vo">Anyone can view</option>'
    txt+='<option value="vd">Only email domain members can view</option>'
      
    txt+='<option value="ve">Anyone can edit</option>'
    txt+='<option value="ed">Only email domain members can edit</option>'
    
    txt+='<option value="oo">Only the owner can view and edit</option>'
    txt+='</select>'
    
    accessright.innerHTML=txt+"<br><br>";
    

    save_cloud=document.createElement("div");
    save_cloud.innerHTML="Save in the Cloud"
    save_cloud.classList.add("nbxbutton")
    filesavecdiv.appendChild(save_cloud)
    filesavecdiv.style.textAlign="center"
    /*
    filenamec.onchange=function(){
      console.log("before :"+this.value);
      this.value.replace(/" "/g,"_");
      //CurrentWebPage=this.value;
      console.log("after :"+this.value)
    }
    */
    save_cloud.onclick=function(){
      //console.log("Hello b"+elem("filenamec").value)
      
      x=elem("filenamec").value.replace(/[$? ]/g,"_");
      elem("filenamec").value=x;
      //console.log("Hello a"+elem("filenamec").value)
      //alert(ev.Target.innerHTML)
      //ev.Target.style.opacity=1.0
      filesavecdiv.style.cursor="wait";
      save_restore('sc',elem("filenamec").value);
      
      CurrentWebPage=elem("filenamec").value;
    }
    optionlist.appendChild(filesavecdiv)
  }
  //console.log("here "+elem("filenamec").value)
  filesavecdiv.style.cursor="default";
  elem("filenamec").value=CurrentWebPage;
  //console.log(CurrentWebPage+"/"+elem("filenamec").value)
  //console.log("there "+elem("filenamec").value)
  
  setoptionposition();
  olhdiv1.innerHTML="Uploading Nested Box to the Cloud"
  
  show(optionlist);
  show(filesavecdiv);
  optionlist.onmouseleave=function(){};
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //addclosebutton(optionlist,"topleft",closeicon);

}


function showbrowserfiles(ev){
  optionlist.style.width=wide;
  if(typeof filesdiv=="undefined" || lastdownload!="browser"){
    filesdiv=document.createElement("div")
    optionlist.appendChild(filesdiv)
    filesdiv.id="files2"
    
  }
  filesdiv.innerHTML=""
  filesdiv.style.backgroundColor="white"
  for(let i=0; i<localStorage.length; i++) {
    x=document.createElement("div");
    x.style.display="flex";
    x.style.flexDirection="row";
    x.style.justifyContent="space-between";
    
    //x.style.display="inline-block";
    filesdiv.appendChild(x)
    keyitem=document.createElement("div");
    keyitem.style.cursor="pointer";
    x.appendChild(keyitem);
    keyitem.innerHTML=localStorage.key(i);
    //keyitem.fname=localStorage.key(i);
    keyitem.style.paddingLeft="1rem";
    keyitem.style.display="inline-block";

     
    bin=document.createElement("div")
    bin.fname=localStorage.key(i)
    bin.style.display="inline-block";
    bin.style.paddingLeft="2rem";
    bin.style.textAlign="right";
    bin.style.cursor="pointer";
    bin.innerHTML="&#128465";
    x.appendChild(bin)
    bin.onclick=function(){
      if(prompt("Do you want to delete "+this.fname+"?","Yes")){
        localStorage.removeItem(this.fname);
        //console.log("Document successfully deleted!");
      }
    }
     //console.log(keyitem.innerHTML)
     keyitem.onclick=function(){
       save_restore("rb",this.innerHTML,updcwp)
       //elem("filename").value=this.innerHTML;
       //files.style.display="none"
       //CurrentWebPage=this.innerHTML
       hide(optionlist);
      }
    }
    lastdownload="browser";  
  setoptionposition("Font",ev)
  olhdiv1.innerHTML="Load from Browser "+showi("loadbrowser")
  
  show(optionlist);
  show(filesdiv);
  //optionlist.onmouseleave=function(){}
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  
  
}

function resetGroup(){
  elem("GroupContainer").innerHTML="<DIV id='Group' class='nbx'><p id='firstp'  onclick='myPopUp(event)' ondblclick='showhide(event)'>Main Nested Box</p></DIV>"

}

filesrefreshed=false;
lastdownload="";

function showcloudfiles(ev,action_type){
  //alert("Edward 1");
  optionlist.style.width=wide;
 //alert("action_type"+action_type)
if(firebase.auth().currentUser == null){
    firebase.auth().signInAnonymously();
  //  alert("You need to sign in first before you can download documents from the NestedBoxes Cloud.")
    return;
}
  
if(typeof filesdiv=="undefined"){
    //console.log("I am xxx")
    filesdiv=document.createElement("div")
    filesdiv.id="files"
    filesdiv.classList.add("files");
    optionlist.appendChild(filesdiv);
    hide(filesdiv);
    filesdiv.style.backgroundColor="white"
    

  }
  //filesdiv.classList.add("optionbox")
  //filesdiv.classList.add("files")
  
 if(!filesrefreshed || lastdownload!="cloud"){ 
   
  filesdiv.innerHTML="<div style='position:fixed;background-color:white;margin-left:-15px;margin-top:5px;'><div style=';display:flex;flex-direction:row;justify-content:space-around;margin-bottom:5px;border-bottom:1px solid gray;'>"+
  "<div style='font-weight:bold;font-style:normal;padding-right:5px;'>owner</div>|<div style='padding-left:5px;padding-right:5px;font-weight:normal;font-style:normal;'>can edit</div>|<div style='padding-left:5px;font-weight:normal;font-style:italic;'>view only</div><div>"+showi('accessright')+"</div></div></div>"
  elem("menu").style.cursor="wait"
  elem("optionlist").style.cursor="wait"
  

 
  db.collection(currentCollection).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id);
        if(checkAccessRights(doc.data().allow_view,
            doc.data().allow_edit,
            firebase.auth().currentUser.email,
            doc.data().creator_email,
            firebase.auth().currentUser.uid,
            doc.data().creator_id)){
          keyitem=document.createElement("div");
          keyitem.style.cursor="pointer";
          filesdiv.appendChild(keyitem);
          keyitem.boxid=doc.id;
          vtext="";
          suffix="";
          if(doc.data().allow_view=="all"){
            vtext="v";
            suffix="av";
          }
          
          if(doc.data().allow_view=="domain"){
            vtext="v:"+doc.data().creator_email.split('@')[1];
            suffix="dv";
            } 
          
          
          if(doc.data().allow_edit=="all"){
            vtext="e";
            suffix="ae";
          }
          
          if(doc.data().allow_edit=="domain"){
            vtext="e:"+doc.data().creator_email.split('@')[1]
            suffix="de"
          }

          if(doc.data().creator_id==firebase.auth().currentUser.uid){
              vtext="o";
              if(suffix==""){
                suffix="oo"
              }
          } 
          
          switch(vtext){
            case "o":
              keyitem.style.fontWeight="bold";
              keyitem.style.fontStyle="normal";
              break;
            case "e":
              keyitem.style.fontWeight="normal";
              keyitem.style.fontStyle="normal";
              break;
            case "v":
              keyitem.style.fontStyle="italic";
              keyitem.style.fontWeight="normal";
              break;
            default:
              keyitem.style.fontStyle="normal";
              keyitem.style.fontWeight="normal";
              keyitem.style.color="red";
              break; 

          }
          
          x=document.createElement("div")
          keyitem.appendChild(x)
          keyitem.style.display="flex";
          keyitem.style.flexDirection="row";
          keyitem.style.justifyContent="space-between";
    
          x.innerHTML=doc.id
          x.style.display="inline-block"
          //keyitem.innerHTML=doc.id
          //+((vtext=='o')?("<span>&#128465</span>"):"")
          keyitem.style.paddingLeft="1rem";
          if(vtext=="o"){
            x.innerHTML+="["+suffix+"]";

            bin=document.createElement("div")
            bin.style.display="inline-block";
            bin.style.paddingLeft="2rem";
            bin.style.textAlign="right";
            bin.style.cursor="pointer";
            bin.innerHTML="&#128465";
            
            keyitem.appendChild(bin)
            bin.onclick=function(){
              if(prompt("Do you want to delete "+this.parentElement.boxid+"?","Yes")){
                db.collection(currentCollection).doc(this.parentElement.boxid).delete().then(() => {
                  this.parentElement.remove();
                  console.log("Document successfully deleted!");
              }).catch((error) => {
                  console.error("Error removing document: ", error);
              });
              }
            }
            lock=document.createElement("div")
            lock.style.display="inline-block";
            lock.style.paddingLeft="2rem";
            lock.style.textAlign="right";
            lock.style.cursor="pointer";
            lock.innerHTML="&#128274";
            
            keyitem.appendChild(lock)
            lock.onclick=function(){
              token=prompt("Set code :","");
              if(token!=null){
                db.collection(currentCollection).doc(this.parentElement.boxid).get().then((doc) => {
                  if (doc.exists) {
                    console.log("document exists")
                elem("Group").outerHTML=doc.data().boxcontent;
                storeingroup("data_token",token)
                alert(elem("Group").getAttribute("data_token"));
                temptext=elem("Group").outerHTML;
                console.log(temptext)
                db.collection(currentCollection).doc(this.parentElement.boxid).update({boxcontent:temptext})
                temptext="";
                resetGroup();
                console.log(temptext)
                alert("Code has been set.")
                  }
                })  
                
                
                
                
              }
            }
          }


          x.style.width="80%";
          x.onclick=function(){
            //alert(action_type + this.parentElement.boxid)
            document.body.style.cursor="wait";
            save_restore(action_type,this.parentElement.boxid);
            document.body.style.cursor="default";

            //CurrentWebPage=this.parentElement.boxid;
            hide(filesdiv);
            hide(optionlist);
            //hide(closeicon);
           // elem("filename").value=this.boxid;
           // files.style.display="none"
           // hide(closeicon);
          }
       }
       else{
        // console.log(doc.id+"-not accessible");
       }
       
    });
}).then(function(){
  elem("menu").style.cursor="default";
  elem("optionlist").style.cursor="default";
    
  olhdiv1.innerHTML="Cloud:Click here to refresh list."+showi("refreshcloud")
 
  //optionlist.style.maxHeight="300px";
  olhdiv1.onclick=function(){
    filesrefreshed=false;
    showcloudfiles(ev,action_type)
  } 
  setoptionposition()
  show(optionlist);

  show(filesdiv);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  

});

filesrefreshed=true;
lastdownload="cloud";
  
 } 
 else{
   console.log("Edward is here");
  olhdiv1.innerHTML="Cloud:Click here to refresh list."
 
 setoptionposition()
 olhdiv1.onclick=function(){
   filesrefreshed=false;
   showcloudfiles(ev,action_type)
  }
  show(optionlist);
  show(filesdiv);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //show(optionlistheader,"flex")
  //optionlist.style.maxHeight="300px"
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  
  //optionlist.onmouseleave=function(){}
 
}

}







function checkAccessRights(data_a_v,data_a_e,fb_email,data_email,fb_uid,data_uid){

if(data_a_v=="all" || data_a_e=="all"){
  return(true)
}

if(data_a_v=="domain" || data_a_e=="domain"){
  if(fb_email != null){
    if(fb_email.split("@")[0]==data_email.split("@")[0]){
      return(true);
    }
    else{
      return(false);
    }
  }  
  else{
     return(false);
  } 
}  

if(data_a_v=="none" && data_a_e=="none"){
  
    if(fb_uid==data_uid){
      return(true);
    }
    else{
      return(false);
    }
  
}
}  
   

function setflex(ev){
if(typeof flexdiv =="undefined"){
  flexdiv=document.createElement("div")
  text="<TABLE>"
  
  // Display
  text+="<TR>"
  text+="<TD>"
  text+="Display :"
  text+="</TD>"
  text+="<TD>"
  text+="<p id='v_display'>"
  text+="</p"
  text+="</TD>"
  text+="</TR>"
  
  // Direction
  text+="<TR>"
  text+="<TD>"
  text+="<label for='v_flex_d'> Direction : </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<select id='v_flex_d'>"
  text+="<option value='column'>column</option>"
  text+="<option value='column-reverse'>column reverse</option>"
  text+="<option value='row'>row</option>"
  text+="<option value='row-reverse'>row-reverse</option>"
  text+="</select"
  text+="</TD>"
  text+="</TR>"
  // Flex Wrap
  text+="<TR>"
  text+="<TD>"
  text+="<label for='v_flex_w'> Flex-wrap : </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<select id='v_flex_w'>"
  text+="<option value='wrap'>wrap</option>"
  text+="<option value='nowrap'>nowrap</option>"
  text+="<option value='wrap-reverse'>wrap-reverse</option>"
  text+="</select"
  text+="</TD>"
  text+="</TR>"
  // Justify Content
  text+="<TR>"
  text+="<TD>"
  text+="<label for='v_flex_jc'> Justify content : </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<select id='v_flex_jc'>"
  text+="<option value='center'>center</option>"
  text+="<option value='flex-start'>flex start</option>"
  text+="<option value='flex-end'>flex end</option>"
  text+="<option value='space-around'>space around</option>"
  text+="<option value='space-between'>space between</option>"
  text+="</select"
  text+="</TD>"
  text+="</TR>"
  // Align Items
  text+="<TR>"
  text+="<TD>"
  text+="<label for='v_flex_ai'> Align-items : </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<select id='v_flex_ai'>"
  text+="<option value='center'>center</option>"
  text+="<option value='flex-start'>flex start</option>"
  text+="<option value='flex-end'>flex end</option>"
  text+="<option value='stretch'>stretch</option>"
  text+="<option value='baseline'>baseline</option>"
  text+="</select"
  text+="</TD>"
  text+="</TR>"
  // Align Contents
  text+="<TR>"
  text+="<TD>"
  text+="<label for='v_flex_ac'> Align content : </label>"
  text+="</TD>"
  text+="<TD>"

  text+="<select id='v_flex_ac'>"
  text+="<option value='center'>center</option>"
  text+="<option value='flex-start'>flex start</option>"
  text+="<option value='flex-end'>flex end</option>"
  text+="<option value='space-around'>space around</option>"
  text+="<option value='space-between'>space between</option>"
  text+="</select"
  text+="</TD>"
  text+="</TR>"

  text+="</TABLE>"

  flexdiv.innerHTML=text;
  optionlist.appendChild(flexdiv);
}
elem("v_display").innerHTML=CurrentP.style.display;
elem("v_flex_d").onchange=function(){CurrentP.style.flexDirection=this.value}
//flex wrap
elem("v_flex_w").onchange=function(){CurrentP.style.flexWrap=this.value}
//flex justify content
elem("v_flex_jc").onchange=function(){CurrentP.style.justifyContent=this.value}
//flex align items
elem("v_flex_ai").onchange=function(){CurrentP.style.alignItems=this.value}
//flex Content items
elem("v_flex_ac").onchange=function(){CurrentP.style.alignContent=this.value}

// set current flex config
//flex
elem("v_flex_d").value=CurrentP.style.flexDirection;
//flex wrap
elem("v_flex_w").value=CurrentP.style.flexWrap;
//flex justify content
elem("v_flex_jc").value=CurrentP.style.justifyContent;
//flex align items
elem("v_flex_ai").value=CurrentP.style.alignItems;
//flex Content items
elem("v_flex_ac").value=CurrentP.style.alignContent;


setoptionposition("",ev)
olhdiv1.innerHTML="Define flex parameters of box"
  
show(flexdiv);
show(optionlist);
show(optionlistheader,"flex");
setoptionlistwidth();
//optionlist.onmouseleave=function(){};
 //addclosebutton(optionlist,"bottomright",closeicon);
 
}

function setchildgrid(ev){
  //console.log("hello again");
  //hide(displaydiv)
if(typeof gridchilddiv == "undefined"){
  gridchilddiv=document.createElement("div")
  text="<TABLE>"
  // Display
  
  
  // Grid Position - Col
  text+="<TR>"
  text+="<TD>"
  text+="<label for='gdcolstart'>Start from grid col </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<input type='text' name='gdcolstart' id='gdcolstart' size='2'>"
  text+="</TD>"
  text+="<TD>"
  
  text+="<label for='gdcolend'>span # cols</label>"
  text+="</TD>"
  text+="<TD>"
  text+="<input type='text' name='gdcolend' id='gdcolend' size='2'>"
  text+="</TD>"
  text+="</TR>"
// Grid Position - Row
  text+="<TR>"
  text+="<TD>"
  text+="<label for='gdrowstart'>Start from grid row </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<input type='text'  id='gdrowstart' size='2'>"
  text+="</TD>"
  text+="<TD>"
  text+="<label for='gdrowend'>span # rows</label>"
  text+="</TD>"
  text+="<TD>"
  text+="<input type='text' name='gdrowend' id='gdrowend' size='2'>"
  text+="</TD>"
  text+="</TR>"
// Template cols and rows
    text+="<TR>"
    text+="<TD>"
    text+="<p>Grid Area</p>"
    text+="</TD>"
    text+="<TD colspan='3'>"
    text+="<textarea id='gdarea'></textarea>"
    text+="</TD>"
    text+="</TR>"
    
  
  text+="</TABLE>"
  
  gridchilddiv.innerHTML=text;
  optionlist.appendChild(gridchilddiv);
}  

//elem("g_display").innerHTML=CurrentP.style.display;



gdcolstartv=elem("gdcolstart")
gdcolstartv.value=CurrentP.style.gridColumnStart;
gdcolstartv.onchange=function(){CurrentP.style.gridColumnStart=this.value}

gdcolendv=elem("gdcolend")
gdcolendv.value=CurrentP.style.gridColumnEnd.split("span")[1];
gdcolendv.onchange=function(){alert(this.value);CurrentP.style.gridColumnEnd="span "+this.value}
//alert(CurrentP.style.gridColumnEnd)

gdrowstartv=elem("gdrowstart")
gdrowstartv.value=CurrentP.style.gridRowStart;
gdrowstartv.onchange=function(){alert(this.value);CurrentP.style.gridRowStart=this.value}

gdrowendv=elem("gdrowend")
gdrowendv.value=CurrentP.style.gridRowEnd.split("span")[1];
gdrowendv.onchange=function(){CurrentP.style.gridRowEnd="span "+this.value}
//alert(CurrentP.style.gridRowEnd)

gdareav=elem("gdarea")
  
  gdareav.value=CurrentP.style.gridArea;
  //gdareav.cols="53"
  gdareav.rows="3"
  gdareav.onchange=function(){CurrentP.style.gridArea=this.value;console.log("GA"+CurrentP.style.gridArea)}
  



 setoptionposition("",ev);
 show(gridchilddiv);
 show(optionlist); 
 optionlist.onmouseleave=function(){}
 //addclosebutton(optionlist,"bottomright",closeicon);
  
  
  }

  function setgrid(ev){
    console.log("hello again");
    //hide(displaydiv)
  if(typeof griddiv == "undefined"){
    griddiv=document.createElement("div");
    text="<TABLE>"
    // Gap between columns and rows 
    text+="<TR>"
    text+="<TD>"
    text+="<label for='gdcolgap'>Gap between columns (px)</label>"
    text+="</TD>"
    text+="<TD>"
    text+="<input type='text' id='gdcolgap' size='2'>"
    text+="</TD>"
    text+="</TR>"
    text+="<TR>"
    
    text+="<TD>"
    text+="<label for='gdrowgap'>Gap between rows (px)</label>"
    text+="</TD>"
    text+="<TD>"
    text+="<input type='text' name='gdrowgap' id='gdrowgap' size='2'>"
    text+="</TD>"
    text+="<TD>"
    text+="<label for='v_flex_jc'> Justify content : </label>"
    text+="</TD>"
    text+="<TD>"
    text+="<select id='v_flex_jc'>"
    text+="<option value='center'>center</option>"
    text+="<option value='flex-start'>flex start</option>"
    text+="<option value='flex-end'>flex end</option>"
    text+="<option value='space-around'>space around</option>"
    text+="<option value='space-between'>space between</option>"
    text+="</select"
    text+="</TD>"
    




    // Template
    text+="<TR>"
    text+="<TD>"  
    text+="<p>Template cols :</p>" 
    text+="</TD>"
    text+="<TD colspan='3'>"
    text+="<textarea id='gdtempcol'></textarea>"
    text+="</TD>"
    text+="</TR>"
    text+="<TR>"
    text+="<TD>"  
    text+="<p>Template rows :</p>" 
    text+="</TD>"
    text+="<TD colspan='3'>"
    text+="<textarea id='gdtemprow'></textarea>"
    
    text+="</TD>"
    text+="</TR>"
  
   // Justify Content
  text+="<TR>"
  text+="<TD>"
  text+="<label for='gdjc'>Aign horizontally : </label>"
  text+="</TD>"
  text+="<TD>"
  text+="<select id='gdjc'>"
  text+="<option value='center'>center</option>"
  text+="<option value='start'>start</option>"
  text+="<option value='end'>end</option>"
  text+="<option value='space-evenly'>space evenly</option>"
  text+="<option value='space-around'>space around</option>"
  text+="<option value='space-between'>space between</option>"
  text+="</select"
  text+="</TD>"
  text+="</TR>"
  
  // Align Contents
    text+="<TR>"
    text+="<TD>"
    text+="<label for='gdac'>Align vertically : </label>"
    text+="</TD>"
    text+="<TD>"
    
    text+="<select id='gdac'>"
    text+="<option value='center'>center</option>"
    text+="<option value='start'>start</option>"
    text+="<option value='end'>end</option>"
    text+="<option value='space-evenly'>space evenly</option>"
    text+="<option value='space-around'>space around</option>"
    text+="<option value='space-between'>space between</option>"
    text+="</select"
    text+="</TD>"
    text+="</TR>"
   
    text+="<TR>" 
    text+="<TD>"
    text+="<p>Template Area</p>"
    text+="</TD>"
    text+="<TD colspan='3'>"
    text+="<textarea id='gdtemparea'></textarea>"
    text+="</TD>"
    text+="</TR>"
    text+="</TABLE>"
    
    griddiv.innerHTML=text;
    optionlist.appendChild(griddiv);
    //addclosebutton(optionlist,"bottomright",closeicon)
  }  
  //alert("I am here")
  //elem("g_display").innerHTML=CurrentP.style.display;
  
  
  gdcolgapv=elem("gdcolgap")
  console.log("col gap "+window.getComputedStyle(CurrentP, null).getPropertyValue("grid-column-gap"))
  //gdcolgapv.value=CurrentP.style.gridColumnGap.split('px')[0];
  gdcolgapv.value=window.getComputedStyle(CurrentP, null).getPropertyValue("grid-column-gap").split('px')[0];
  
  //console.log(gdcolgapv.value)
  
  gdcolgapv.onchange=function(){CurrentP.style["grid-column-gap"]=this.value+"px"};
  //function(){}
  
  gdrowgapv=elem("gdrowgap")
  //console.log("row gap "+CurrentP.style.gridRowGap)
  
  gdrowgapv.value=window.getComputedStyle(CurrentP, null).getPropertyValue("grid-row-gap").split('px')[0];
  gdrowgapv.onchange=function(){CurrentP.style["grid-row-gap"]=this.value+'px'}
  
  elem("v_flex_jc").onchange=function(){CurrentP.style.justifyContent=this.value}
  elem("v_flex_jc").value=CurrentP.style.justifyContent;

  
  gdtempcolv=elem("gdtempcol")
  gdtempcolv.value=CurrentP.style.gridTemplateColumns;
  //gdtempcolv.cols="53"
  gdtempcolv.rows="1"
  gdtempcolv.onchange=function(){CurrentP.style.gridTemplateColumns=this.value}
  
  gdtemprowv=elem("gdtemprow")
  //gdtemprowv.cols="53"
  gdtemprowv.rows="1"
  gdtemprowv.value=CurrentP.style.gridTemplateRows;
  gdtemprowv.onchange=function(){CurrentP.style.gridTemplateRows=this.value}
  
  gdjcv=elem("gdjc")
  gdjcv.value=CurrentP.style.justifyContent;
  gdjcv.onchange=function(){CurrentP.style.justifyContent=this.value}
  
  gdacv=elem("gdac")
  gdacv.value=CurrentP.style.alignContent;
  gdacv.onchange=function(){CurrentP.style.alignContent=this.value}
  
  
  gdtempareav=elem("gdtemparea")
  gdtempareav.value=CurrentP.style.gridTemplateArea;
  //gdtempareav.cols="53"
  gdtempareav.rows="3"
  
  gdtempareav.onchange=function(){CurrentP.style.gridTemplateArea=this.value}
  
   setoptionposition("",ev);
   olhdiv1.innerHTML="Define box's grid parameters"
  
   show(griddiv);
   show(optionlist); 
   show(optionlistheader,"flex");
   setoptionlistwidth();

   //optionlist.onmouseleave=function(){}
   //addclosebutton(optionlist,"bottomright",closeicon);
    
    
    }
  
function setshadow(){
  optionlist.style.width=narrow;
  if(!CurrentP){
    nbxalert("Error","Please select a box","red");
    return;
  }
  if(typeof shadowdiv == "undefined"){
    shadowdiv=document.createElement("div")
    shadowdiv.style.marginTop="1rem";
    shadowdiv.style.marginLeft="1rem";

    //stext="<div><input type='range'value='0' min='0' max='10' id='shadowh' onchange=updBoxShadow('h',this.value)></div>"
    
    stext="<TABLE>"
    stext+="<TR><TD><label for='shadowc'>Colour </label></TD>"
    stext+="<TD><input type='color' id='shadowc' onclick=setShadowcolor(this) onchange=updBoxShadow('c',this.value)></TD></TR>"   
    
    stext+="<TR><TD><label for='shadowh'>Horizontal </label></TD>"
    stext+="<TD><input type='range'value='0' min='-50' max='50' id='shadowh' onchange=updBoxShadow('h',this.value)></TD></TR>"
    
    stext+="<TR><TD><label for='shadowv'>Vertical </label></TD>"
    stext+="<TD><input type='range' value='0' min='-50' max='50' id='shadowv' onchange=updBoxShadow('v',this.value)></TD></TR>"   
    stext+="<TR><TD><label for='shadowb'>Blur </label></TD>"
    stext+="<TD><input type='range' value='0' min='0' max='50' id='shadowb' onchange=updBoxShadow('b',this.value)></TD></TR>"   
    stext+="<TR><TD><label for='shadows'>Spread </label></TD>"
    stext+="<TD><input type='range' value='0' min='-50' max='50' id='shadows' onchange=updBoxShadow('s',this.value)></TD></TR>"   
    stext+="</TABLE>"
    shadowdiv.innerHTML=stext
    optionlist.appendChild(shadowdiv)
  }

  /* obtain boxshadow values of CurrentP */
  bstr=[]
  for(i=0;i<4;i++){
    bstr[i]="0";
  }

    curShadow=CurrentP.style.boxShadow
    console.log("curShadow: "+curShadow)
    
    if(curShadow.length==0||curShadow=="none"){
      clr="";
      console.log("no shadow clr "+clr)
    }
    else{
      console.log("shadow exists "+ curShadow)
      clr=curShadow.split(") ")[0]
      if(clr.length>0){
        clr+=")";
        curShadow=curShadow.replace(clr,"");
        console.log("a "+curShadow)
      }
      bstr=curShadow.split("px")
      console.log("b "+bstr)
    }
      for(i=0;i<4;i++){
        if(bstr[i]==undefined){
          bstr[i]="0"
        }
      }
    //elem("shadowc").value=RGBtoHex(clr);
    elem("shadowh").value=bstr[0];
    elem("shadowv").value=bstr[1];
    elem("shadowb").value=bstr[2];
    elem("shadows").value=bstr[3];
    
    //console.log("check 1 "+ elem("shadowc").value+" "+RGBtoHex(clr));
    //console.log("check 2 "+elem("shadowh").value+" "+bstr[0]);
    setoptionposition("",event)
    olhdiv1.innerHTML="Define shadows..."
  
    optionlist.onmouseleave=function(){};
    show(shadowdiv);
    show(optionlist);
    show(optionlistheader,"flex");
    setoptionlistwidth();
    //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  
    //addclosebutton(optionlist,"rightbottom",closeicon);
      
   


}


frame=[]
for(i=0;i<5;i++)frame[i]=[];

frame[0]=frame["Top"]=["Top","borderTopWidth","borderTopStyle","borderTopColor","paddingTop","marginTop"]
frame[1]=frame["Right"]=["Right","borderRightWidth","borderRightStyle","borderRightColor","paddingRight","marginRight"]
frame[2]=frame["Bottom"]=["Bottom","borderBottomWidth","borderBottomStyle","borderBottomColor","paddingBottom","marginBottom"]
frame[4]=frame["Left"]=["Left","borderLeftWidth","borderLeftStyle","borderLeftColor","paddingLeft","marginLeft"]



function setframe(event){
// All, BorderWidth, BorderColor, BorderType,Padding, Margin

// Top, BorderWidth, BorderColor, BorderType,Padding, Margin
// Right, BorderWidth, BorderColor, BorderType,Padding, Margin
// Bottom, BorderWidth, BorderColor, BorderType,Padding, Margin
// Left, BorderWidth, BorderColor, BorderType,Padding, Margin
optionlist.style.width=wide;
if(!CurrentP){
  nbxalert("Error","Please select a box","red");
  return;
}
if(typeof framediv =="undefined"){
  framediv=document.createElement("div")
  framediv.id="framediv"
  /*framediv.style.className="menu"*/
  text="<DIV style='text-align:center;display:grid;grid-template-columns:repeat(7,auto);grid-column-gap:5px;'>"
  text+="<DIV>Sides</DIV>"
  text+="<DIV>Width</DIV>"
  text+="<DIV>Color</DIV>"
  text+="<DIV>Style</DIV>"
  text+="<DIV>Padding</DIV>"
  text+="<DIV>Margin</DIV>"
  text+="<DIV>Radius</DIV>"
 //all //
  
  text+="<DIV><i class='material-icons-outlined'>border_outer</i></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'border-width',this)} value='0' onchange={CurrentP.style.borderWidth=this.value} id='bdwidth' size='6'></DIV>"
  text+="<DIV style='width:20px'><input type='color' onclick={this.value=RGBtoHex(CurrentP.style.borderColor)} onchange={CurrentP.style.borderColor=hexToRGB(this.value)} id='bdcolor'></DIV>"
  text+="<DIV><select onchange={CurrentP.style.borderStyle=this.value;} id='bdstyle'>"
  text=text+borderoptions
  text+="</select></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'padding',this)} value='0' onchange={CurrentP.style.padding=this.value;} id='padding' size='6'></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'margin',this)} value='0' onchange={CurrentP.style.margin=this.value;} id='margin' size='6'></DIV>"
  text+="<DIV><input type='text' value='0' onchange={CurrentP.style.borderRadius=this.value;} id='borderradius' size='9'></DIV>"
  
  


  //Top//
  text+="<DIV><i class='material-icons-outlined'>border_top</i></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'border-top-width',this)} value='0' onchange={CurrentP.style.borderTopWidth=this.value} id='bdtopwidth' name='bdtopwidth' size='6'></DIV>"
  text+="<DIV><input type='color' onclick={this.value=RGBtoHex(CurrentP.style.borderTopColor)} onchange={CurrentP.style.borderTopColor=hexToRGB(this.value)} id='bdtopcolor'></DIV>"
  text+="<DIV><select onchange={CurrentP.style.borderTopStyle=this.value;} id='bdtopstyle'>"
  text=text+borderoptions
  text+="</select></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'padding-top',this)} value='0' onchange={CurrentP.style.paddingTop=this.value;} id='paddingtop' size='6'></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'margin-top',this)} value='0' onchange={CurrentP.style.marginTop=this.value;} id='margintop' size='6'></DIV>"
  text+="<DIV><input type='text' value='0' onchange={CurrentP.style.borderTopLeftRadius=this.value;} id='bordertopleftradius' size='9'></DIV>"
  
   // RIGHT
   text+="<DIV><i class='material-icons-outlined'>border_right</i></DIV>"
   text+="<DIV><input type='text' onclick={pickwidth(event,'border-right-width',this)} onchange={CurrentP.style.borderRightWidth=this.value;} id='bdrightwidth' size='6'></DIV>"
   text+="<DIV><input type='color' onclick={this.value=RGBtoHex(CurrentP.style.borderRightColor)} onchange={CurrentP.style.borderRightColor=hexToRGB(this.value)} id='bdrightcolor'></DIV>"
   text+="<DIV><select onchange={CurrentP.style.borderRightStyle=this.value;} id='bdrightstyle'>"
   text=text+borderoptions
   text+="</select></DIV>"
   text+="<DIV><input type='text' onclick={pickwidth(event,'padding-right',this)} onchange={CurrentP.style.paddingRight=this.value;} id='paddingright' size='6'></DIV>"
   text+="<DIV><input type='text' onclick={pickwidth(event,'margin-right',this)} onchange={CurrentP.style.marginRight=this.value;} id='marginright' size='6'></DIV>"
   text+="<DIV><input type='text' onchange={CurrentP.style.borderTopRightRadius=this.value;} id='bordertoprightradius' size='9'></DIV>"
   //text+="</TR>"
   // BOTTOM
   text+="<DIV><i class='material-icons-outlined'>border_bottom</i></DIV>"
   text+="<DIV><input type='text' onclick={pickwidth(event,'border-bottom-width',this)} onchange={CurrentP.style.borderBottomWidth=this.value} id='bdbottomwidth' size='6'></DIV>"
   text+="<DIV><input type='color' onclick={this.value=RGBtoHex(CurrentP.style.borderBottomColor)} onchange={CurrentP.style.borderBottomColor=hexToRGB(this.value)} id='bdbottomcolor'></DIV>"
   text+="<DIV><select onchange={CurrentP.style.borderBottomStyle=this.value;} id='bdbottomstyle'>"
   text=text+borderoptions
   text+="</select></DIV>"
   text+="<DIV><input type='text' onclick={pickwidth(event,'padding-bottom',this)} onchange={CurrentP.style.paddingBottom=this.value;} id='paddingbottom' size='6'></DIV>"
   text+="<DIV><input type='text' onclick={pickwidth(event,'margin-bottom',this)} onchange={CurrentP.style.marginBottom=this.value;} id='marginbottom' size='6'></DIV>"
   text+="<DIV><input type='text' onchange={CurrentP.style.borderBottomRightRadius=this.value;} id='borderbottomrightradius' size='9'></DIV>"
    // LEFT
    text+="<DIV><i class='material-icons-outlined'>border_left</i></DIV>"
    text+="<DIV><input type='text' onclick={pickwidth(event,'border-left-width',this)} onchange={CurrentP.style['border-left-width']=this.value} id='bdleftwidth' size='6'></DIV>"
    text+="<DIV><input type='color' onclick={this.value=RGBtoHex(CurrentP.style.borderLeftColor)} onchange={CurrentP.style.borderLeftColor=hexToRGB(this.value)} id='bdleftcolor'></DIV>"
    text+="<DIV><select onchange={CurrentP.style.borderLeftStyle=this.value;} id='bdleftstyle'>"
    text=text+borderoptions
    text+="</select></DIV>"
    text+="<DIV><input type='text' onclick={pickwidth(event,'padding-left',this)} onchange={CurrentP.style.paddingLeft=this.value;} id='paddingleft' size='6'></DIV>"
    text+="<DIV><input type='text' onclick={pickwidth(event,'margin-left',this)} onchange={CurrentP.style.marginLeft=this.value;} id='marginleft' size='6'></DIV>"
    text+="<DIV><input type='text' onchange={CurrentP.style.borderBottomLeftRadius=this.value;} id='borderbottomleftradius' size='9'></DIV>"
    // OUTLINE
    text+="<DIV><i class='material-icons-outlined'>select_all</i></DIV>"
  text+="<DIV><input type='text' onclick={pickwidth(event,'outline-width',this)} value='0' onchange={CurrentP.style.outlineWidth=this.value} id='outlwidth' size='6'></DIV>"
  text+="<DIV style='width:20px'><input type='color' onclick={this.value=RGBtoHex(CurrentP.style.outlineColor)} onchange={CurrentP.style.outlineColor=hexToRGB(this.value)} id='outlcolor'></DIV>"
  text+="<DIV><select onchange={CurrentP.style.outlineStyle=this.value;} id='outlstyle'>"
  text=text+borderoptions
  text+="</select></DIV>"
  text+="<DIV>[outline]</DIV>"
  text+="<DIV></DIV>"
  text+="<DIV></DIV>"
  text+="</DIV>"
  
  framediv.innerHTML=text
  optionlist.appendChild(framediv);
}
/*
//elem("bdwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-width").split("px")[0];
elem("bdwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-width");
elem("bdwidth").value=CurrentP.style.borderWidth.split("vw")[0];

elem('bdcolor').value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("border-color"));
elem('bdstyle').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-style");
//elem('padding').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding").split("px")[0];
//elem('margin').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin").split("px")[0];
//elem('padding').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding");
//elem('margin').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin");
elem('padding').value=CurrentP.style.padding.split("vw")[0];
elem('margin').value=CurrentP.style.margin.split("vw")[0];


elem('borderradius').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-radius");
*/
elem("bdwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-top-width");
//elem("bdtopwidth").value=CurrentP.style.borderTopWidth.split("vh")[0]

elem('bdcolor').value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("border-color"));
elem('bdstyle').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-style");
elem('padding').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding");
elem('margin').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin");
elem('borderradius').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-radius");





elem("bdtopwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-top-width");
//elem("bdtopwidth").value=CurrentP.style.borderTopWidth.split("vh")[0]

elem('bdtopcolor').value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("border-top-color"));
elem('bdtopstyle').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-top-style");
elem('paddingtop').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding-top");
elem('margintop').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin-top");
//elem('paddingtop').value=CurrentP.style.paddingTop.split("vh")[0];
//elem('margintop').value=CurrentP.style.marginTop.split("vh")[0];

elem('bordertopleftradius').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-top-left-radius");

elem("bdrightwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-right-width");
//elem("bdrightwidth").value=CurrentP.style.borderRightWidth.split("vw")[0];

elem('bdrightcolor').value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("border-right-color"));
elem('bdrightstyle').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-right-style");
elem('paddingright').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding-right");
elem('marginright').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin-right");
//elem('paddingright').value=CurrentP.style.paddingRight.split("vw")[0];
//elem('marginright').value=CurrentP.style.marginRight.split("vw")[0];

elem('bordertoprightradius').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-top-right-radius");

elem("bdbottomwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-bottom-width");
//elem("bdbottomwidth").value=CurrentP.style.borderBottomWidth.split("vh")[0];

elem('bdbottomcolor').value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("border-bottom-color"));
elem('bdbottomstyle').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-bottom-style");
elem('paddingbottom').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding-bottom");
elem('marginbottom').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin-bottom");
//elem('paddingbottom').value=CurrentP.style.paddingBottom.split("vh")[0];
//elem('marginbottom').value=CurrentP.style.marginBottom.split("vh")[0];
elem('borderbottomrightradius').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-bottom-right-radius");

elem("bdleftwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-left-width");
//elem("bdleftwidth").value=CurrentP.style.borderLeftWidth.split("vw")[0];
elem('bdleftcolor').value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("border-left-color"));
elem('bdleftstyle').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-left-style");
elem('paddingleft').value=window.getComputedStyle(CurrentP, null).getPropertyValue("padding-left");
elem('marginleft').value=window.getComputedStyle(CurrentP, null).getPropertyValue("margin-left");
//elem('paddingleft').value=CurrentP.style.paddingLeft.split("vw")[0];
//elem('marginleft').value=CurrentP.style.marginLeft.split("vw")[0];
elem('borderbottomleftradius').value=window.getComputedStyle(CurrentP, null).getPropertyValue("border-bottom-left-radius");

elem("outlwidth").value=window.getComputedStyle(CurrentP, null).getPropertyValue("outline-width");
elem("outlcolor").value=RGBtoHex(window.getComputedStyle(CurrentP, null).getPropertyValue("outline-color"));
elem("outlstyle").value=window.getComputedStyle(CurrentP, null).getPropertyValue("outline-style");




  setoptionposition();
  olhdiv1.innerHTML="Define borders,padding,margin,radius.."
  
  show(framediv);
  show(widthdiv);
  show(optionlist);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  
  
  //addclosebutton(optionlist,"bottomright",closeicon,widthdiv);
  
}

function setoptionlistwidth(){
  hwidth=parseInt(computestyle(optionlistheader,"width").split("px")[0]);
  owidth=parseInt(computestyle(optionlist,"width").split("px")[0]);
  //console.log("h"+hwidth+"/"+"o"+owidth)
  if(hwidth>owidth){
    owidth=hwidth+2;//to account for left and right border
    optionlist.style.width=owidth+"px";
  }
    else{
    hwidth=owidth-2
    optionlistheader.style.width=hwidth+"px";
    }
  

}



function pickwidth(ev,bdr,ele){
  //console.log("hello")
    widthdiv.innerHTML="";
    widthsizes=[0,1,2,3,4,5]
    for(i=0;i<widthsizes.length;i++){
      widthitem=document.createElement("div")
      widthitem.innerHTML=widthsizes[i];
      widthitem.onclick=function(){
        //alert(this.innerHTML)
        hide(widthdiv);
        
        ev.target.value=parseInt(this.innerHTML);
        CurrentP.style[bdr]=this.innerHTML+"px";

        //return(this.innerHTML); 
      } 
      widthdiv.appendChild(widthitem)   
    }
    
    widthdiv.style.zIndex=3;
    widthdiv.style.position="fixed";
    widthdiv.style.width="40px";
    widthdiv.style.textAlign="center";
    
    widthdiv.style.backgroundColor="white";
    widthdiv.style.border="1px solid black";
    
    
    //document.body.appendChild(widthdiv);
    
    widthdiv.onmouseleave =function(){hide(this)}
   /*if(ele){
      console.log("Ele "+ele.style.top+"/"+ele.style.left)
      widthdiv.style.top=ele.style.top;
      widthdiv.style.left=ele.style.left;
      
    }
    else{
     */ 
    //console.log({ev})
    //widthdiv.style.top=(ev.screenY-24)+"px";
    //widthdiv.style.top=ele.style.top;
    //console.log("ele "+ele.id+"/"+ele.style.top+"/"+ele.style.left)
    //console.log({ele})
    widthdiv.style.top=(ev.y)+"px";
    
    widthdiv.style.left=(ev.x)+"px";
    //widthdiv.style.left=ele.style.left;
    
    //console.log("ev "+widthdiv.style.top+"/"+widthdiv.style.left)
    //}
    widthdiv.style.display="block";
  
    //console.log(widthdiv.style.top+"/"+widthdiv.style.left+"/"+widthdiv.innerHTML)
    

    
} 

var selectedclass=[]
  

function setstyleclass(){
  //classdiv > classp, classta
  optionlist.style.width=wide;
  if(!CurrentP){
    nbxalert("Error","Please select a box first","red")
  }
  selectedclass=[];
  if(typeof classdiv != "undefined")
   classdiv.remove();
   classdiv=document.createElement("div")
   classdiv.className="optionlist"
   classp=document.createElement("p")
    

   classp.innerHTML+="<br>Assigned classes"
   classp.style.fontWeight="bolder";
   classdiv.appendChild(classp)
   classta=document.createElement("textarea")
    //classta.innerHTML="I am here"
   classta.id="classta";
   classta.className='nbx';
   classdiv.appendChild(classta)
    
   classdiv.style.paddingLeft="2rem"
   classdiv.style.paddingRight="2rem"
   classdiv.style.paddingBottom="2rem"
   classta.style.marginBottom="2rem";
   classta.onchange=function(){
     CurrentP.className=classta.value;
   }
    

    
  classdivtab=document.createElement("div")
  //classdivtab.style.display="table";
  classdiv.appendChild(classdivtab);
  
  showcurrclass(CurrentP);
  
  addstyleoption("layout");
  addstyleoption("background");
  addstyleoption("fontcolor");
  addstyleoption("borders");
  addstyleoption("padding");
  addstyleoption("margin");
  addstyleoption("misc");
  addstyleoption("slides");
  addstyleoption("menu");
  addstyleoption("bullets");
  addstyleoption("image");
  
    
  
  classreset=document.createElement("div")
    classdiv.appendChild(classreset)
    classreset1=document.createElement("span")
    classreset.appendChild(classreset1)
    classreset1.innerHTML="Reset style of Selected Box Only"
    classreset1.className="nbxbutton"
    classreset1.onclick=function(){
      resetDefault('current');
      selectedclass=[];
      CurrentP.className='';
      classta.value='';
    }
    classreset2=document.createElement("span")
    classreset.appendChild(classreset2)
    classreset2.innerHTML="Reset style of Selected and Descendant Boxes"
    classreset2.className="nbxbutton"
    classreset2.onclick=function(){
      resetDefault('all');
      selectedclass=[];
      CurrentP.className='';
      classta.value='';
    } 
    
  
  
  optionlist.appendChild(classdiv);
  
  setoptionposition("Font",event);
  //console.log("Read only"+classta.readOnly)
  classta.value=CurrentP.className;
  //console.log({classta})
  //optionlist.onmouseleave=function(){}
  olhdiv1.innerHTML="Assign box to style classes"
  
  show(classdiv);
  show(optionlist);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  


}

function showcurrclass(ele){
  console.log({ele})
classes=ele.classList;
for(i=0;i<classes.length;i++){
  for(j=0;j<styleclass.length;j++){
    if(styleclass[j][1]==classes[i]){
      indx=styleclassord[styleclass[j][0]]
      selectedclass[indx]=classes[i];
    }
  }
}
}


function createtestboxes(){
    
  testbigbox=document.createElement("div");
  testbigbox.className="nbx"
  testbigbox.style.overflow="auto"
  testbigbox.style.position='fixed';
  testbigbox.style.top="5vh";
  testbigbox.style.left="30vw";
  testbigbox.style.width="60vw";
  testbigbox.style.height="80vh";
  
  testbigbox.style.display.zIndex=3;
  testbigbox.style.backgroundColor="white";
  testbigbox.innerHTML="<span style='text-align:right;' onclick={hide(testbigbox)}>[X]Style Preview</span>"
  //testbigbox.style.textAlign="right"

  
  document.body.appendChild(testbigbox)
  
  testbox=document.createElement('div');
  testbigbox.appendChild(testbox)
  //testbox.style.display='block';
  
  
  testbox.id='nbxtestbox'
  for(i=0;i<12;i++){
    temp=document.createElement('div');
    temp.innerHTML='<p>Heading L1'+"</p>"
    temp.className="nbx";
    testbox.appendChild(temp)
      for(j=0;j<2;j++){
        temp1=document.createElement('div');
        temp1.innerHTML='<p>Subheading L2</p>'
        temp1.className="nbx"
        temp.appendChild(temp1)
        if(i % 3 ==0 ){
        for(k=0;k<3;k++){
          temp2=document.createElement('div');
          temp2.innerHTML='<p>Section L3 - The quick brown fox..</p>'
          temp2.className="nbx"
        
          temp1.appendChild(temp2)
          temp3=document.createElement('div');
          temp3.innerHTML='<p>Topic L4 - jumps over the lazy dog. The quick brown fox jumps over the lazy dog.</p>'
          temp3.className="nbx"
        
          temp2.appendChild(temp3)
          temp4=document.createElement('div');
          temp4.innerHTML='<p>Item L5 - and the lazy dog woke up and barked at the fox.</p>'
          temp4.className="nbx"
        
          temp3.appendChild(temp4);
        }
      }
      }
  }


}

function addstyleoption(style_type){
  //classdivtab > temp > temp0,temp01
  temp=document.createElement("div")
  //temp.className="grid12"
  
  classdivtab.appendChild(temp);
  
  //temp.style.display="table-row";
  //temp.style.flexDirection="row";
  //temp.justifyContent="space between";
  //console.log(15-style_type.length)
  temp0=document.createElement("div");
  //temp0.style.width="3rem";
  //temp0.style.display="table-cell";
  temp.appendChild(temp0);
  temp0.innerHTML=style_type
  temp0.style.fontWeight="bolder";
  temp01=document.createElement("div");
  temp0.style.marginBottom="0px";
  temp0.style.paddingBottom="0px";
  temp0.style.lineHeight="1rem";
  
  //temp01.style.display="table-cell";
  temp.appendChild(temp01);
  
  temp01text="<select id='nbx"+style_type+"' "
  temp01.style.marginBottom="1rem";
  index=styleclassord[style_type]
  tvalue=" "
  if(selectedclass[index]!=null){
    tvalue=selectedclass[index];
  }
  

  temp01text+="value='"+tvalue+"' "
  temp01text+=" onchange=updclasslist(this.value,'"+style_type+"')>"
  
//console.log(temp01text)

  //temp1=document.createElement("select")
  //temp1.id="nbx"+style_type;
  //temp1
  //temp01.appendChild(temp1)
  //console.log(temp1.innerHTML)
  opt="<option></option>"
  for(i=0;i<styleclass.length;i++){
    if(styleclass[i][0]==style_type){
      if(tvalue!=" " && styleclass[i][1]==tvalue){
        stext="selected";
      }
      else{
        stext="";
      }
      opt+="<option value='"+styleclass[i][1]+"' title='"+helptext[styleclass[i][1]]+"' "+stext+">"+(styleclass[i][1]+": "+styleclass[i][2]).slice(0,50)+"</option>"
    }
  }
  //console.log(opt)
  //console.log({classdiv})
  //z=document.getElementById("nbx"+style_type)
  //console.log(z.innerHTML)
  temp01text+=opt;
  temp01text+="</select>"
  temp01.innerHTML=temp01text;
  
}

function updclasslist(cls,styletype){
  index=styleclassord[styletype]
  selectedclass[index]=cls;
  console.log(selectedclass.join(' '))
  CurrentP.className=selectedclass.join(' ');
  classta.value=selectedclass.join(' ');

  console.log(classta.value)
  console.log({selectedclass})
  
}


function viewstyleclass(){
  for(i=0;i<styleclass.length;i++){
    console.log(i+":"+styleclass[i][0]+"/"+styleclass[i][1]+"/"+styleclass[i][2])
  }
}



function moveboxout(action){
  
    if(CurrentP){
      if(CurrentP.id!="Group"){
        ElementStore=cloneElement(CurrentP)
        hideoutline(ElementStore);
        if(action=='cut'){
        CurrentP.remove();
        CurrentP=null;
        }
      }
      else{
        
        nbxalert("Error","The main nested box cannot be "+(action=='cut'?'moved':'cloned')+" to Temporary Storage. Please select a box within.","red")
      }   
    }
    else{
      nbxalert("Error","Please select a box to "+(action=='cut'?'move':'clone')+" to Temporary Storage.","red")
    }   
   
}

function moveboxin(){
  
  if(ElementStore){
    if(CurrentP){
      x=cloneElement(ElementStore)
      CurrentP.appendChild(x);
 
      t=CurrentP.lastChild.getElementsByTagName("P")
      restoreevents(t);
      
      //console.log("t[0]:"+t[0].id)
      myPopUp(event,t[0]);
      //myPopUp(event,t);
      }
    else{
      nbxalert("Error","You have not selected the box into which to place the box from storage.","red")
    } 
  } 
  else{
    nbxalert("Error","Temporary Storage is empty.","red")
  }
  
}

function cloneboxnext(){
  if(CurrentP){
    if(CurrentP.id!="Group"){

      n=cloneElement(CurrentP)
      hideoutline(n);
      CurrentP.insertAdjacentElement("afterend", n);
      t=CurrentP.nextSibling.getElementsByTagName("P");
      restoreevents(t);
      console.log("t[0]:"+t[0].id)
      myPopUp(event,t[0]);
      
      
    }
    else{
      nbxalert("Error","The main nested ox cannot be cloned.Please select a box within the main box","red")
    }
  }
  else{
    nbxalert("Error","Please select a box to clone.","red")
  }  
}

function restoreevents(ele){
  //console.log(ele.id+"/"+ele.length);
  for(i=0;i<ele.length;i++){
    //console.log("hello"+ele[i].id)
    ele[i].onclick=function(){myPopUp(event)};
    ele[i].ondblclick=function(){showhide(event)};
  }
} 

function pasteboxnext(){
  
  if(ElementStore){
    if(CurrentP){
       if(CurrentP.id!="Group"){
          x=cloneElement(ElementStore);
          CurrentP.insertAdjacentElement("afterend", x);
          
          t=CurrentP.nextSibling.getElementsByTagName("P");
          restoreevents(t);
          
      console.log("t[0]:"+t[0].id)
      myPopUp(event,t[0]);
          //myPopUp(event,t);
          //ElementStore.remove();
       }
       else{
        nbxalert("Error","You can relocate a box from Temporary Storage inside the main nested box but NOT adjacent to it.","red");
        return;
       }
    }
    else{
      nbxalert("Error","You have not selected a box into which to relocate the box from Temporary Storage.","red");
      return;
    }      
  }
  else{
    nbxalert("Error","Temporary Storage is empty.","red");
    return;
    
  }

}          

function computestyle(ele,prop){
  return(window.getComputedStyle(ele, null).getPropertyValue(prop))
}

function viewboxdetails(){
optionlist.style.width=wide;

  if(!CurrentB){
    nbxalert("Error","Please select a box to view its details","orange")
    return;
  }

if(typeof techdiv == "undefined"){
  techdiv=document.createElement("div")
  techdiv.className="optionlist"
  optionlist.appendChild(techdiv)
}

stext="<TABLE><TR></TR>"
stext+="<TR><TD> Clear style settings</TD><TD onclick={resetDefault('current');viewboxdetails();} class='nbxbutton'>Selected box only</TD></TR><TR>"
stext+="<TD></TD><TD onclick={resetDefault('all');viewboxdetails();} class='nbxbutton'}>Selected and descendant boxes</TD></TR>"
stext+="<TR><TD> Display Style </TD><TD onclick={setdisplaymode(event,viewboxdetails)} class='nbxbutton'>"+computestyle(CurrentP,"display")+"</TD></TR>"
stext+="<TR><TD>Opacity</TD><TD> <input id='opaque' type='range' min='0' max='10' onchange={CurrentP.style.opacity=this.value/10}></TD>"
stext+="</TR><TR>"
    
stext+="<TD>Line height</TD><TD><input type='text' onchange={CurrentP.style.lineHeight=this.value} value="+computestyle(CurrentP,"line-height")+"></TD>"
stext+="</TR><TR>"

stext+="<TD>Letter spacing</TD><TD><input type='text' onchange={CurrentB.style.letterSpacing=this.value} value="+computestyle(CurrentB,"letter-spacing")+"></TD>"
stext+="</TR><TR>"
stext+="<TD>Width</TD><TD><input type='text' onchange={CurrentP.style.width=this.value} value="+computestyle(CurrentP,"width")+"></TD>"
stext+="</TR><TR>"
stext+="<TD>Min-width</TD><TD><input type='text' onchange={CurrentP.style.minWidth=this.value} value="+computestyle(CurrentP,"min-width")+"></TD>"
stext+="</TR><TR>"
stext+="<TD>Max-width</TD><TD><input type='text' onchange={CurrentP.style.maxWidth=this.value} value="+computestyle(CurrentP,"max-width")+"></TD>"
stext+="</TR><TR>"

stext+="<TD>Height</TD><TD><input type='text' onchange={CurrentP.style.height=this.value} value="+computestyle(CurrentP,"height")+"></TD>"
stext+="</TR><TR>"
stext+="<TD>Min-height</TD><TD><input type='text' onchange={CurrentP.style.minHeight=this.value} value="+computestyle(CurrentP,"min-height")+"></TD>"
stext+="</TR><TR>"
stext+="<TD>Max-height</TD><TD><input type='text' onchange={CurrentP.style.maxHeight=this.value} value="+computestyle(CurrentP,"max-height")+"></TD>"
stext+="</TR><TR>"

stext+="<TD>Column count</TD><TD><input type='text' onchange={CurrentP.style.columnCount=this.value} value="+computestyle(CurrentB,"column-count")+"></TD>"
stext+="</TR><TR>"
stext+="<TD>Column gap</TD><TD><input type='text' onchange={CurrentP.style.columnGap=this.value} value="+computestyle(CurrentB,"column-gap")+"></TD>"
stext+="</TR><TR>"


stext+="<TD>Position</TD><TD id='currpos' class='nbxbutton' onmouseover={this.style.cursor='pointer'} onclick={toggle(elem('choices'))}>"+computestyle(CurrentP,"position")+"</TD>"
stext+="</TR><TR><TD></TD><TD><DIV id='choices' class='optionlist' style='display:none'>"
  stext+="<DIV onclick={updateprop(this,'currpos','position');hide(elem('choices'));}>static</DIV>"
  stext+="<DIV onclick={updateprop(this,'currpos','position');hide(elem('choices'));}>relative</DIV>"
  stext+="<DIV onclick={updateprop(this,'currpos','position');hide(elem('choices'));}>fixed</DIV>"
  stext+="<DIV onclick={updateprop(this,'currpos','position');hide(elem('choices'));}>absolute</DIV>"
  stext+="<DIV onclick={updateprop(this,'currpos','position');hide(elem('choices'));}>sticky</DIV>"
stext+="</DIV></TD></TR>" 

stext+="</TR><TR>"
stext+="<TD>Overflow</TD><TD id='currflow' class='nbxbutton' onmouseover={this.style.cursor='pointer'} onclick={toggle(elem('oflow'))}>"+computestyle(CurrentP,"overflow")+"</TD>"
stext+="</TR><TR><TD></TD><TD><DIV id='oflow' class='optionlist' style='display:none'>"
  stext+="<DIV onclick={updateprop(this,'currflow','overflow');hide(elem('oflow'));}>visible</DIV>"
  stext+="<DIV onclick={updateprop(this,'currflow','overflow');hide(elem('oflow'));}>hidden</DIV>"
  stext+="<DIV onclick={updateprop(this,'currflow','overflow');hide(elem('oflow'));}>scroll</DIV>"
  stext+="<DIV onclick={updateprop(this,'currflow','overflow');hide(elem('oflow'));}>auto</DIV>"
stext+="</DIV></TD></TR><TR>" 
stext+="<TD>Whitespace</TD><TD id='whspace' class='nbxbutton' onmouseover={this.style.cursor='pointer'} onclick={toggle(elem('wspace'))}>"+computestyle(CurrentP,"white-space")+"</TD>"
stext+="</TR><TR><TD></TD><TD><DIV id='wspace' class='optionlist' style='display:none'>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>normal</DIV>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>nowrap</DIV>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>pre</DIV>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>pre-line</DIV>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>pre-wrap</DIV>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>initial</DIV>"
  stext+="<DIV onclick={updateprop(this,'whspace','white-space');hide(elem('wspace'));}>inherit</DIV>"

  stext+="</DIV></TD>"
stext+="</TR><TR>"
stext+="<TD>Vertical alignment</TD><TD id='vtalign' class='nbxbutton' onmouseover={this.style.cursor='pointer'} onclick={toggle(elem('valign'))}>"+computestyle(CurrentP,"vertical-align")+"</TD>"
stext+="</TR><TR><TD></TD><TD><DIV id='valign' class='optionlist' style='display:none'>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>baseline</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>sub</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>super</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>top</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>text-top</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>middle</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>bottom</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>text-bottom</DIV>"
  stext+="<DIV onclick={updateprop(this,'vtalign','vertical-align');hide(elem('valign'));}>initial</DIV>"
  
  stext+="</DIV></TD>"
  stext+="</TR><TR>"
  
  stext+="<TD>Vertical alignment (%,px,..)</TD><TD><input type='text' onchange={CurrentP.style.verticalAlign=this.value} value="+computestyle(CurrentP,"vertical-align")+"></TD>"
  stext+="</TR><TR>"

stext+="<TD>Top/Left </TD><TD><input type='TEXT' size='6' onchange={CurrentP.style.top=this.value} value='"+computestyle(CurrentB,"top")+"'>/<input type='TEXT' size='6' onchange={CurrentP.style.left=this.value} value='"+computestyle(CurrentB,"left")+"'></TD>"
stext+="</TR><TR>"


stext+="<TD>zIndex </TD><TD id='zi' class='nbxbutton' onmouseover={this.style.cursor='pointer'} onclick={toggle(elem('zilist'))}>"+computestyle(CurrentB,"z-index")+"</TD>"
stext+="</TR><TR><TD></TD><TD><DIV id='zilist' class='optionlist' style='display:none'>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>-1</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>0</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>1</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>2</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>3</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>4</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>5</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>6</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>7</DIV>"
stext+="<DIV onclick={updateprop(this,'zi','zIndex');hide(elem('zilist'));}>8</DIV>"
stext+="</DIV></TD></TR>" 

stext+="<TR><TD>Select Parent</TD><TD style='cursor:pointer;' onclick={myPopUp(event,CurrentP.parentElement.children[0]);}>"+CurrentP.parentElement.id+"</TD></TR>"
if(CurrentP.nextSibling!=null){
  stext+="<TR><TD>Select Next Sibling</TD><TD style='cursor:pointer;' onclick={myPopUp(event,CurrentP.nextSibling.children[0]);}>"+CurrentP.nextSibling.id+"</TD></TR>"
}
if(CurrentP.previousSibling!=null){
  stext+="<TR><TD>Select Previous Sibling</TD><TD style='cursor:pointer;' onclick={myPopUp(event,CurrentP.previousSibling.children[0]);}>"+CurrentP.previousSibling.id+"</TD></TR>"
}
if(CurrentP.children[1]!=null){
  stext+="<TR><TD>Select Child</TD><TD style='cursor:pointer;' onclick={myPopUp(event,CurrentP.children[1].children[0]);}>"+CurrentP.children[1].id+"</TD></TR>"
}




stext+="<TR><TD>Transform</TD><TD><input type='TEXT' size='20' value='"+CurrentP.style.transform+"' onchange={CurrentP.style.transform=this.value}></TD></TR>"
stext+="<TR><TD>Transition</TD><TD><input type='TEXT' size='20' value='"+CurrentP.style.transition+"' onchange={CurrentP.style.transition=this.value}></TD></TR>"







stext+="<TR><TD>Font face</TD><TD>"+computestyle(CurrentB,"font-family")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Font color</TD><TD>"+computestyle(CurrentB,"color")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Font size</TD><TD>"+computestyle(CurrentB,"font-size")+"</TD>"
stext+="</TR><TR>"

stext+="<TD>Font weight</TD><TD>"+computestyle(CurrentB,"font-weight")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Font style</TD><TD>"+computestyle(CurrentB,"font-style")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Text Decoration</TD><TD>"+computestyle(CurrentB,"text-decoration")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Text Alignment</TD><TD>"+computestyle(CurrentB,"text-align")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Display</TD><TD>"+computestyle(CurrentP,"display")+"</TD>"
stext+="</TR><TR>"
stext+="<TD>Float</TD><TD>"+computestyle(CurrentB,"float")+"</TD>"
stext+="</TR>"




//stext+="<TR><TD>Parent ID</TD><TD><input type='TEXT' value="+CurrentP.id+" onchange={CurrentP.id=this.value}></TD></TR>"

//stext+="<TR><TD>Parent ID</TD><TD onmouseover={this.style.cursor='pointer'} onclick={toggle(elem('childrendiv'))}>"+CurrentP.id+"</TD></TR>"
stext+="<TR><TD>Parent ID</TD><TD onclick={myPopUp(event,CurrentP.parentElement.children[0]);}>"+CurrentP.parentElement.id+"</TD></TR>"

stext+="<TR><TD>Level</TD><TD>"+findLevel(CurrentP)+"</TD></TR>"
stext+="<TR><TD>No of Siblings</TD><TD>"+(CurrentP.parentElement.childElementCount-1)+"</TD></TR>"


//stext+="<TR><TD></TD><TD><DIV id='childrendiv' style='display:none'>"+CurrentP.children[0].id+"</DIV></TD></TR>"
//for(i=1;i<CurrentP.children.length;i++){
//  stext+="<TR><TD>child "+i+"</TD><TD><DIV onclick={updatecurrentBP(this)}>"+CurrentP.children[i].id+"</DIV></TD>"
//}
//x=CurrentP.nextElementSibling
//i=1
//while(x!=null){
//  stext+="<TR><TD>next sibling "+i+"</TD><TD><DIV onclick={updatecurrentBP(this)}>"+x.id+"</DIV></TD>"
//  i+=1;
//  x=x.nextElementSibling;
//}
//x=CurrentP.previousElementSibling
//i=1
//while(x!=null){
//  stext+="<TR><TD>prev sibling "+i+"</TD><TD><DIV onclick={updatecurrentBP(this)}>"+x.id+"</DIV></TD>"
//  i+=1;
//  x=x.previousElementSibling;
//}

stext+="</TR>"
stext+="<TR>"



stext+="<TD>Tag</TD><TD>"+CurrentB.tagName+"</TD></TR>"
stext+="<TR><TD>CurrentB</TD><TD>"+CurrentB.id+"</TD></TR>"
stext+="<TR><TD>CurrentP</TD><TD>"+CurrentP.id+"</TD></TR>"

//stext+="<TD>Content Editable ?</TD><TD>"+CurrentB.contentEditable+"</TD>"
//stext+="<TD>Parent - Content Editable ?</TD><TD>"+CurrentP.contentEditable+"</TD>"
stext+="</TABLE>"
//techdiv.style.height="300px";
techdiv.style.overflow="auto";
techdiv.style.backgroundColor="white";
techdiv.innerHTML=stext;
techdiv.style.width="100%";
elem("opaque").value=CurrentP.style.opacity*10
setoptionposition("Font",event);
olhdiv1.innerHTML="View/Edit Other Style Options"
show(techdiv);
show(optionlist);
show(optionlistheader,"flex");
setoptionlistwidth();
//optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
//optionlist.style.display="TABLE"
//optionlist.style.display="block"


}

/*
function gotoParent(ele){
  CurrentB=ele.parentElement.children[0];
  CurrentP=CurrentB.parentElement;
  myPopUp(event,ele.parentElement.children[0]);

}
*/

function resetDefault(scope){
  //alert("I am here");
  switch(scope){
    case "all":
      //alert("Hello");
      resetElement(CurrentP);
      resetElement(CurrentB);
  
    elements=CurrentP.getElementsByTagName("div")
    for(i=0;i<elements.length;i++){
      resetElement(elements[i])
    }
    elements=CurrentP.getElementsByTagName("p")
    for(i=0;i<elements.length;i++){
      resetElement(elements[i])
    }
    
    break;
  
    case "current":
      resetElement(CurrentP);
      resetElement(CurrentB);
      break;
  }
}      

function resetElement(ele){
  ele.style.cssText="";
  ele.className="";
}


function oldresetElement(ele){  
  ele.classList="";

ele.style.backgroundColor=null;
ele.style.borders=null;
ele.style.borderWidth=null;
ele.style.borderRadius=null;
ele.style.boxShadow=null;
ele.style.outline=null;
ele.style.color=null;
ele.style.margin=null;
ele.style.marginLeft=null;
ele.style.marginRight=null;
ele.style.marginTop=null;
ele.style.marginBottom=null;
ele.style.display=null;
ele.style.flexDirection=null;
ele.style.alignItems=null;
ele.style.alignContent=null;
ele.style.gridTemplateColumns=null;
ele.style.gridRowGap=null;
ele.style.justifyContent=null;


ele.style.padding=null;
ele.style.fontSize=null;
ele.style.fontFamily=null;
ele.style.fontStyle=null;
ele.style.fontWeight=null;
ele.style.textDecoration=null;
ele.style.textAlign=null;
ele.style.width=null;
ele.style.height=null;
if(ele){
  //alert("length :"+ele.classList.length)
  for(var j=0;j<ele.classList.length;j++){
    //alert(j+"/"+ele.id+"/"+ele.classList.item(j))
    classtoremove=ele.classList.item(j);
    if(classtoremove!=null && classtoremove!="undefined"){
    ele.classList.remove(classtoremove);
    }

  }
}




}

function z_updatecurrentBP(ele){
  //console.log("i am here>" + ele.innerHTML);
  //hideoutline(CurrentP,"p");
  hideoutline(CurrentB,"b");
  CurrentP=elem(ele.innerHTML);
  CurrentB=CurrentP.children[0];
  showoutline(CurrentB,"b");
  //showoutline(CurrentP,"p");
  hide(elem('childrendiv'));
  hide(elem('tipcircle'));
  shownohiddenboxes(CurrentB);
}
allOutline=false;

function toggleoutline(ele){
  if(!ele){
    ele=elem("Group");
  }
  if(allOutline==false){
    newoutline="1px dotted red";
    allOutline=true;
  }
  else{
    newoutline="0px";
    allOutline=false;
  }
  x=ele.getElementsByTagName("DIV")
  
    for(i=0;i<x.length;i++){
      x[i].style.outline=newoutline;
      //showboxes(x[i]);
      
      
        /*temp[i]=document.createElement("DIV")
        temp[i]
        x[i].appendChild(temp[i])
        temp[i].innerHTML="L"+findLevel(x[i])+":S"+(x[i].parentElement.childElementCount-1)
        //x[i].appendChild(lvl);
        temp[i].style.top=computestyle(x[i],"top");
        temp[i].style.left=computestyle(x[i],"left");
        temp[i].style.position="fixed";
        temp[i].style.zIndex=2;
        */
      
    }
    ele.style.outline=newoutline;
  
}

function showboxesall(){
  ptag=elem("Group").getElementsByTagName("P")
  //alert("ptag length:"+ptag.length)
  for(i=0;i<ptag.length;i++){
    //alert(i+"/"+ptag[i].innerHTML);
    showboxes(ptag[i]);
  }
  
  }


function showboxes(ele){
  //console.log("ele id"+ele.id+"/"+ele.innerHTML.slice(0,10))
  if(ele.parentElement.childElementCount>1 && ele.parentElement.children[1].style.display=="none"){
    ele.parentElement.classList.add("boxes");
  }
  else{
    ele.parentElement.classList.remove("boxes");
  }
}

function showoutline(ele,type){

if(type=="p"){
  ele.style.outline="2px dashed blue";
}
else{
  ele.style.outline="1px dotted red";
}

}


function hideoutline(ele,type){
  if(typeof ele != "undefined"){
  ele.style.outline="0px"
  }
}

function updateposition(ele){
  CurrentB.style.position=ele.innerHTML;
  elem('currpos').innerHTML=ele.innerHTML
}
function updateflow(ele){
  CurrentB.style.overflow=ele.innerHTML;
  elem('currflow').innerHTML=ele.innerHTML
}

function updBoxShadow(dim,val){
  console.log("updBox "+dim+":"+val)
bstr=[]
curShadow=CurrentP.style.boxShadow
console.log("curShadow :"+curShadow+":"+curShadow.length)
if(curShadow=="none"||curShadow.length==0){
  clr="";
  for(i=0;i<4;i++){
    bstr[i]="0"
  }

}
else{
  //console.log("cP "+ curShadow)
  clr=curShadow.split(") ")[0]
  if(clr.length>0){
    clr+=")";
    curShadow=curShadow.replace(clr,"");
   // console.log("a "+curShadow)

  }
  bstr=curShadow.split("px")
  console.log("b "+bstr)

  for(i=0;i<4;i++){
    if(bstr[i]==undefined){
      bstr[i]="0"
    }
  }
}

//console.log("clr "+clr)
//bstr=CurrentP.style.boxShadow.split(") ")[0].split("px ")
//console.log("bstr "+clr)



//console.log("dim "+dim+" val "+val+" bstr "+bstr)
  switch(dim){
    case "c":{
    //alert("c "+ val)
    //get first para and replace it with hex version
    clr=hexToRGB(val);
    console.log("c "+clr)
    break;
    }
    case "h":{
      //alert("h "+ val)
      bstr[0]=val;
      console.log("0 "+bstr[0])
    
      break;
      
    }
    case "v":{
     // alert("v "+ val)
     bstr[1]=val;
     console.log("1 "+bstr[1])
    
      break;
      
    }
    case "b":{
      //alert("b "+ val)
      bstr[2]=val;
      console.log("2 "+bstr[2])
    
      break;
      
    }
    case "s":{
      //alert("s "+ val)
      bstr[3]=val;
      console.log("3 "+bstr[3])
    
      break;
      
    }
  }
if(clr==""){
  clr="rgb(0,0,0)"
}
console.log("zz"+clr+" "+bstr[0]+"px "+bstr[1]+"px "+bstr[2]+"px "+bstr[3]+"px")
console.log("CP bs:"+CurrentP.style.boxShadow)
CurrentP.style.boxShadow=bstr[0]+"px "+bstr[1]+"px "+bstr[2]+"px "+bstr[3]+"px "+clr;
console.log("xx "+CurrentP.style.boxShadow)
}
  
function setShadowcolor(th){

curShadow=CurrentP.style.boxShadow;
if(curShadow=="none"){
  curShadow="rgb(0,0,0)";
}

//console.log("current Shadow"+curShadow)
//bstr=[]
clr=curShadow.split(") ")[0]
  if(clr.length>0){
    clr+=")";
    curShadow=curShadow.replace(clr,"");
    //bstr=curShadow.split("px")
  }
  else{
    clr="rgb(0,0,0)"
    //bstr[0]=bstr[1]=bstr[2]=bstr[3]=0
  }
  console.log("clr"+clr)
  th.value=RGBtoHex(clr);
  
  
}

function setdisplaymode(ev,callback){
  optionlist.style.width=narrow;
  if(!CurrentP){
    alert("Please select a box first");
    return;
  }
  if(typeof displaydiv == "undefined"){
    displaydiv=document.createElement("div");
    displaydiv.className="optionlist"
    displaydiv.style.marginLeft="2rem";
    //displaydiv.style.backgroundColor="white";
    //displaydiv.style.maxHeight="300px";
    for(i=0;i<displays.length;i++){
      displayitem=document.createElement("div")
      //displayitem.style.paddingLeft="1rem";
      displayitem.innerHTML=displays[i];
    //displayitem.style.display=displays[i];
    
    displayitem.onclick=function(){
      
      switch(this.innerHTML){
        case "flex":
          CurrentP.style.display=this.innerHTML;
          setflex(ev);
          break;
        case "grid":
          //alert("hello");
          //if(CurrentP.parentElement.style.display=="grid"){
          //setchildgrid(ev);}
          //else{
          CurrentP.style.display=this.innerHTML;
          setgrid(ev);
          //}
          break; 
        case "grid item":
          if(CurrentP.parentElement.style.display=="grid"){
            setchildgrid(ev);}
          break;  
        
          case "inline-grid" :
            //alert("hello");
            if(CurrentP.parentElement.style.display=="inline-grid"){
            setchildgrid(ev);}
            else{
              CurrentP.style.display=this.innerHTML;
            setgrid(ev);
            }
            break; 
          default:
            CurrentP.style.display=this.innerHTML;
            callback();

             
      }
      
      //display_element=elem("mi"+menuitem["Display"][0])
      //display_element.innerHTML=this.innerHTML;
    }  
  displaydiv.appendChild(displayitem);
  }
  optionlist.appendChild(displaydiv);
}
  olhdiv1.innerHTML="Display mode :"+computestyle(CurrentP,"display")

  setoptionposition("Font",event);
  //show(optionlistheader,"flex")
  show(displaydiv);
  show(optionlist);
  show(optionlistheader,"flex");
  setoptionlistwidth();
  
}   

function initpositionlist(){

  positionid=menuitem["Position"][0]
  positionlist=elem("positionlist")
  //resizelist.style.maxHeight="300px"
  positions=["static","relative","absolute","fixed","sticky"]
  positiondiv=document.createElement("div")
  positiondiv.style.backgroundColor="white"

// Left/Top
  xydiv=document.createElement("div")
  positiondiv.appendChild(xydiv)
  xyitem=document.createElement("p")
  xyitem.innerHTML="Left:"
  xydiv.appendChild(xyitem);
  xinput=document.createElement("input")
  xyitem.appendChild(xinput)
  xinput.id="leftcoord"
  xinput.type="text"
  xinput.size="4"
  xinput.onchange=function(){
    CurrentP.style.left=this.value+"px";
  }
  xyitem=document.createElement("p")
  xyitem.innerHTML="Top:"
  xydiv.appendChild(xyitem);
  yinput=document.createElement("input")
  yinput.id="topcoord"
  xyitem.appendChild(yinput)
  yinput.type="text"
  yinput.size="4"
  yinput.onchange=function(){
    CurrentP.style.top=this.value+"px";
  }


  //zIndex
  zdiv=document.createElement("div")
  positiondiv.appendChild(zdiv)
  zitem=document.createElement("p")
  zitem.innerHTML="z-index :"
  zdiv.appendChild(zitem);
  zinput=document.createElement("input")
  zinput.id="zindexcoord"
  zitem.appendChild(zinput)
  zinput.type="text"
  zinput.size="2"
  zinput.onchange=function(){

    CurrentP.style.zIndex=this.value;
  }

  
  positionlist.appendChild(positiondiv)
  position_element=elem("mi"+menuitem["Position"][0])
  //fontsizediv.style.display="flex"
  //fontsizediv.style.flexDirection="row"
  for(i=0;i<positions.length;i++){
    positionitem=document.createElement("div")
  
    positionitem.innerHTML=positions[i];
    //alert(i+" "+resize[i])
    positionitem.onclick=function(){
      CurrentP.style.position=this.innerHTML;
      //console.log("onclick "+CurrentP.style.position)
      //CurrentP.style.overflow="auto"
      position_element.innerHTML=this.innerHTML;
      
      //fontsizelist.style.display="none";
    }
    
    positiondiv.appendChild(positionitem);
  }
    //overflow
  
  overflows=["visible","hidden","scroll","auto"]
  
  overflowdiv=document.createElement("div")
  overflowdiv.style.backgroundColor="white"
   
  positionlist.appendChild(overflowdiv)
  //position_element=elem("mi"+menuitem["Position"][0])
  //fontsizediv.style.display="flex"
  //fontsizediv.style.flexDirection="row"
  for(j=0;j<overflows.length;j++){
    positionitem=document.createElement("div")
  
    positionitem.innerHTML=overflows[j];
    //alert(i+" "+resize[i])
    positionitem.onclick=function(){
      CurrentP.style.overflow=this.innerHTML;
      //console.log("onclick "+CurrentP.style.position)
      //CurrentP.style.overflow="auto"
      //position_element.innerHTML=this.innerHTML;
      
      //fontsizelist.style.display="none";
    }
    
    positiondiv.appendChild(positionitem);

  }
  positionlist.onmouseleave=function(){
    positionlist.style.display="none";
    }
    positionlist.style.display="none";

}

function showhide(event){
  //console.log("showhide activate")
  no_siblings=CurrentB.parentElement.childElementCount;

  newdisplaymode="";
  if(no_siblings>1){
    if (computestyle(CurrentB.parentElement.children[1],"display") !="none"){
   newdisplaymode="none";
    }
  
  //console.log("new display mode:"+newdisplaymode)
   
  for(i=1;i<no_siblings;i++){
    if(newdisplaymode=="none"){
      CurrentB.parentElement.children[i].setAttribute("predisplay",computestyle(CurrentP.children[i],"display"))
      CurrentB.parentElement.children[i].style.display = newdisplaymode;
    }
    else{
      //console.log("showhide before: "+computestyle(CurrentB.parentElement.children[i],"display"))
      if(CurrentB.parentElement.children[i].getAttribute("predisplay")!="none"){
        //console.log(CurrentB.parentElement.children[i].id+":"+CurrentB.parentElement.children[i].getAttribute("predisplay"))
      CurrentB.parentElement.children[i].style.display=CurrentB.parentElement.children[i].getAttribute("predisplay");
      }
      else{
        console.log(CurrentB.parentElement.children[i].id+"no predisplay")
        CurrentB.parentElement.children[i].style.display="block";
      }
      //console.log("showhide after: "+computestyle(CurrentB.parentElement.children[i],"display"))
      
    }
    
  }
  shownohiddenboxes(CurrentB); 
}
/*
else{
  if(CurrentB.parentElement.id!="Group"){
  CurrentB.parentElement.setAttribute("predisplay",computestyle(CurrentB.parentElement,"display"))
  CurrentB.parentElement.style.display="none";
  hideicons();
  showboxes(CurrentB.parentElement)
  //shownohiddenboxes(CurrentB.parentElement);
  //}
  //.style.display="none";
  //hidemenu();
}
}
*/
 showboxes(CurrentB);

}

function createbox(boxname,id) {  
  // This creates a DIV element which contains another DIV containing the title
  // First step is to create the container DIV 
  var newbox = document.createElement("div");
  if(!id){
    next_box_id=BoxPrefix+Last_ID;
    newbox.id=next_box_id;
    Last_ID+=1;
  }
  else{
    next_box_id=BoxPrefix+id;
    newbox.id=next_box_id;

  }
  
  if(boxname=="")
  
  txt=NewBoxPrefix +Last_ID;
  else
  txt=boxname;
  //console.log("txt:"+txt)
  if(txt.length==0)txt="*";//txt cannot be null string
  newbox.className="nbx";
  
  // Second step is to create the child DIV and append it to the above container DIV
  var newtextbox=document.createElement("p")
  if(!id){
  newtextbox.id=BoxPrefix+Last_ID;
  Last_ID+=1;
  }
  else{
    id++;
    newtextbox.id=BoxPrefix+id;
  }
  var node=document.createTextNode(txt);
  newtextbox.appendChild(node)
  //newtextbox.onclick=function(){showhide(this.parentNode.id)};
  newbox.appendChild(newtextbox)
  newtextbox.onclick=function(){myPopUp(event)};
  /*
  newtextbox.onmouseover=function(){
    if(event.clientX-this.offsetLeft<10 || this.offsetLeft+this.offsetWidth-event.clientX<10 || event.clientY-this.offsetTop<10 || this.offsetTop+this.offsetHeight-event.clientY<10){
      this.style.cursor="move";
      CurrentP.style.position="absolute"
      dragElement(this) 
      console.log("I am here !!!")
      dragMouseDown(); 
    }
  }
  */
  //newtextbox.onmouseover=function(){shownohiddenboxes(event)};
  newtextbox.ondblclick=function(){showhide(event)};
  newtextbox.style.cursor="context-menu"; 
  //newtextbox.addEventListener("drop",function(){drop(event);});
  //      newtextbox.addEventListener("dragover",function(){allowDrop(event);});
  //      newtextbox.addEventListener("dragstart",function(){drag(event);});
        //newtextbox.contentEditable=true;
  //      newtextbox.draggable="true"
      
//alert(newbox.id);      
  return(newbox);
}

function toggleMode(el){
  if(currentMode == "VIEW"){
    el.style.color="red";
    //innerHTML=seticon(12,'create');
    currentMode="EDIT";
    //el.style.backgroundColor="#4CAF50";
    elem("menu").style.display="flex";
    document.getElementById("menu").style.width = "auto";
    document.getElementById("menu").style.height = "auto";
    elem("GroupContainer").style.marginLeft="40px"

    


    if(CurrentB != null){
      CurrentB=elem("Group").children[0]
    }
    //elem("buffer").style.height=elem("header").offsetHeight+"px";

    /*
    if(tipcircle!=null){
      if(tipcircle.offsetTop<=elem("menu").offsetTop){
        x=tipcircle.offsetTop+elem("menu").offsetHeight;
        tipcircle.style.top=x+"px";
      }

    }
    */
    //showMenu(0,10);
  }
  else{
    //alert("I am here")
    //el.innerHTML=seticon(12,'visibility');
    el.style.color="blue";
    elem("GroupContainer").style.paddingTop="37px";
    
    currentMode="VIEW"
    elem("menu").style.display="none";
    optionlist.style.display="none";
    tipcircle.style.display="none";
    editicon.style.display="none";
    

    elem("GroupContainer").style.marginLeft=0;
    

  }
  
}

var Last_ID=1; //Last ID assigned to a new box
var StorageFolder="wikibox"; // Used in older version; Can be deleted later
var BoxPrefix="MFB";
var ElementStore; //To store box when you cut it
var CurrentB; //Current Box
var CurrentP; //Parent of Current Box
var styleObj; // to store default Style
var placemarker="^"; //to replace & when storing//not required for new cloud ?
var currentMode="VIEW";
var tipcircle=document.createElement("div"); //stores no of hidden boxes of currentBox
var editicon=document.createElement("div");
var cuticon=document.createElement("div");
var copyicon=document.createElement("div");
var pasteicon=document.createElement("div");
var pastenexticon=document.createElement("div");
const optionlist=document.createElement("div"); //general box to hold parameter options

var fileops=document.createElement("div"); //for dialogue on file operations 
var importdataframe=document.createElement("div"); //for importing from excel
var findelement=document.createElement("div"); //to specify search string
var searchresults=document.createElement("div"); // to show search results
var files=document.createElement("div"); //for storing and showing list of files from browser/cloud//
//var closeicon=document.createElement("div"); // cick on this to close optionlist
var tipdiv=document.createElement("div"); //tooltip
var chevrondiv=document.createElement("div"); //general box to hold parameter options
var widthdiv=document.createElement("div"); //for list of width options in setframe //  
//var importedHTML=document.createElement("div"); // To store imported HTML file
var ViewOnly=0; //If True, not allowed to toggle to EditMode
var CurrentWebPage=""; //Filename of current web page
var starticon=document.createElement("div"); 
var editboxpos="top" //position of edit box
var fixedbanner=document.createElement("div");
var showIcons="Yes";
var showLvl="No";
var currentCollection="boxes";
const narrow="15vw"
const wide="30vw"
const rtbullet="&#8250;"
const space="&#32;"


function createBodyElement(ele,ele_class,id){

  //ele=document.createElement(tag);
  ele.id=id;
  ele.className=ele_class;
  document.body.appendChild(ele);
  ele.style.display="none";
  
}

function initoption(){
  optionlistheader=document.createElement("div")
  optionlistheader.className="optionheader"
  optionlist.appendChild(optionlistheader);
  optionblanklines=document.createElement("div")
  optionblanklines.style.height="20px";
  optionlist.appendChild(optionblanklines);
  optionlist.appendChild(widthdiv);
  //optionlistheader.classList.add("optionheader")
  //optionlistheader>olhdiv1+olhdiv2
  olhdiv1=document.createElement("div")
  olhdiv2=document.createElement("div")
  optionlistheader.appendChild(olhdiv1);
  optionlistheader.appendChild(olhdiv2);
  //olhdiv1.style.display="block";
  //olhdiv2.style.display="block";
  
  //optionlistheader.style.display="flex";
  //optionlistheader.style.justifyContent="space-between";
  olhdivup=document.createElement("span")
  olhdivdn=document.createElement("span")
  olhdivrt=document.createElement("span")
  olhdivlt=document.createElement("span")
  
  olhdivcl=document.createElement("span")
  olhdiv2.appendChild(olhdivdn);
  olhdiv2.appendChild(olhdivup);
  olhdiv2.appendChild(olhdivrt);
  olhdiv2.appendChild(olhdivlt);
  
  
  
  olhdiv2.appendChild(olhdivcl);
  
  olhdivdn.innerHTML="&#x2193;&#32;"
  olhdivdn.className="nbxpointer"
  olhdivdn.onclick=function(){
    newtop=Math.min(window.innerHeight-100,parseInt(computestyle(optionlist,"top").split("px")[0])+50)
    optionlist.style.top=newtop+"px"
  
  }
  
  
  olhdivup.innerHTML="&#x2191;&#32;"
  olhdivup.className="nbxpointer"
  olhdivup.onclick=function(){
    
    newtop=Math.max(50,parseInt(computestyle(optionlist,"top").split("px")[0])-50)  
    optionlist.style.top=newtop+"px" 
  }
  
  olhdivrt.innerHTML="&#x2192;&#32;"
  olhdivrt.className="nbxpointer"
  olhdivrt.onclick=function(){
    newtop=Math.min(window.innerHeight-100,parseInt(computestyle(optionlist,"left").split("px")[0])+50)  
    optionlist.style.left=newtop+"px" 
  }
  olhdivlt.innerHTML="&#x2190;&#32;"
  olhdivlt.className="nbxpointer"
  olhdivlt.onclick=function(){
    newtop=Math.max(20,parseInt(computestyle(optionlist,"left").split("px")[0])-50)  
    optionlist.style.left=newtop+"px" 
  }
  
  
  olhdivcl.innerHTML="&#x2715;"
  olhdivcl.className="nbxpointer"
  
  olhdivcl.onclick=function(){
    olhdiv1.innerHTML="";
    hide(optionlist);
  }
  
  
  optionlist.onmouseleave=function(){
    olhdiv1.innerHTML="";
    hide(this); 
  } 
    
  
}

function drawAll(){

createBodyElement(tipcircle,"tipcircle","tipcircle")
createBodyElement(editicon,"editicon","editicon")
createBodyElement(cuticon,"editicon","cuticon")
createBodyElement(copyicon,"editicon","copyicon")
createBodyElement(pasteicon,"editicon","pasteicon")
createBodyElement(pastenexticon,"editicon","pasteicon")

createBodyElement(fixedbanner,"fixedbanner","fixedbanner")

fixedbanner.style.top=setvalue("data_editboxpos","5px")

createBodyElement(fileops,"optionbox","fileops")
createBodyElement(importdataframe,"optionbox","importdataframe")
createBodyElement(findelement,"optionbox","findelement")
createBodyElement(searchresults,"optionbox","searchresults")
//createBodyElement(files,"div","optionbox","files");
createBodyElement(optionlist,"optionbox","optionlist");
//createBodyElement(importedHTML,"div","nbx","ihtml");
//importedHTML.style.display="block";
defDirectEdit=setvalue("data_directedit","No") //contentEditable=false
NewBoxPrefix=setvalue("data_newboxprefix","Box id:")
initoption()
//optionlist
//optionlist.className="optionlist"
//createBodyElement(closeicon,"div","closeicon","closeicon");
createBodyElement(tipdiv,"tooltip","tooltip");
//createBodyElement(widthdiv,"div","optionbox","withdiv")
createBodyElement(starticon,"starticon","starticon")

starticon.innerHTML="<img src='images/nstdboxes_64x64.png' width='32px'>"
starticon.onclick=function(){toggleMode(this)}
show(starticon);
  buildmenu();
  initfindelement();
 initfontoptions(); 
 
 allOutline=true;
 toggleoutline();
 hideicons();
 
  FileToRestore=location.search;
  if(FileToRestore.indexOf("?")!=-1){
    //console.log(FileToRestore.split("?")[1])
    FileToRestore=FileToRestore.split("?")[1]
    //console.log("FTR:"+FileToRestore)

    if(firebase.auth().currentUser==null){
      firebase.auth().signInAnonymously();
    }
  save_restore("rx",FileToRestore)
  
  }
  window.addEventListener('scroll', function(e) {
    hideicons();
  });
  /* set up buffer so that top part of Group is not hidden by header
  elem("buffer").style.height=(elem("header").offsetHeight+5)+"px";
  */



  //alert(elem("fileops").style["backgroundColor"])
}  

function logout(){
  firebase.auth().signOut()
}
var fontoptions="";

function initfontoptions(){
  
for(i=0;i<=fonttype.length;i++){
  fontoptions+="<option style='font-family:"+fonttype[i]+";' value='"+fonttype[i]+"'>"+fonttype[i]+"</option>"
}
//console.log(fontoptions)
}

function loginuser(ev){


/*  <!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
*/
optionlist.style.width=narrow;
if(typeof logindiv == "undefined"){
  logindiv=document.createElement("div")

  optionlist.appendChild(logindiv)
}
/*
if(firebase.auth().currentUser){
  ltext="You are currently logged in.<br>"
  ltext+="<button id='logout'>log out</button>"
  ltext+="<button id='cancel'>remain logged in</button>"
  logindiv.innerHTML=ltext
  elem('logout').addEventListener("click",e=> {
    firebase.auth().signOut();
    hide(optionlist);
    elem("currentuser").innerHTML="";
    alert('You have logged out');
  })
  elem('cancel').addEventListener("click",e=>{
    hide(optionlist);
    return;
  })
  setoptionposition("",ev)
  show(logindiv);
  show(optionlist);
}
else{
*/
ltext="<div style='background-color:#FFFFFF' id='logindiv'>"
ltext+="<div class='plain' onclick={firebase.auth().signInAnonymously();hide(optionlist)}>Sign in Anonymously</div></div>"
ltext+="<div id='firebaseui-auth-container'></div>"
ltext+="<div id='loader'>Loading...</div>"
logindiv.innerHTML=ltext;
logindiv.className='disabled';
logindiv.style.backgroundColor="#FFFFFF"
setoptionposition()
olhdiv1.innerHTML="Sign In/Out"
show(logindiv)
show(optionlist);
show(optionlistheader,"flex");
setoptionlistwidth();

//optionlist.style.backgroundColor="#FFFFFF"
//optionlist.style.border="1px solid blue"
//console.log(computestyle(optionlist,"width")+"/"+optionlistheader.style.width)


//optionlist.onmouseleave=function(){}


/*
  currlogin="You are currently logged in as "+firebase.auth().currentUser.uid
  if(firebase.auth().currentUser.isAnonymous) {
    currlogin+="(anonymous)"
    elem("currentuser").innerHTML="*Anonymous User*"
  }
  currlogin+="<br><button onclick={firebase.auth().signOut();hide(optionlist);alert('You have been logged out');}>Log off</button> <button onclick={hide(optionlist)};return>cancel</>"
  elem('currlogin').innerHTML=currlogin;
*/
  var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          //return false;
          alert("You have signed in as "+firebase.auth().currentUser.email);
          hide(optionlist);
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.
          //console.log(firebase.auth().currentUser.email)
          //console.log(firebase.auth().currentUser.displayName)
          //elem("currentuser").innerHTML=firebase.auth().currentUser.email
          elem('loader').style.display = 'none';
          //elem('logindivh').style.display = 'none';
          
          //hide(logindiv);
          //console.log(firebase.auth().currentUser)
          //elem("currentuser").innerHTML=firebase.auth().currentUser.email
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      //tosUrl: '<your-tos-url>',
      // Privacy policy url.
      //privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2+64)+"px";

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
    
  

}

/*}*/




function seticon(size,icon_label){
  icon='<i style="text-align:center;font-size:'+size+'px" class="material-icons">'+icon_label+'</i>'
  return(icon)
}



function save_restore(a,storage_label,callback) {
  //storage_label.replace(/ /g,"_");
  //var storage_label = prompt("Please enter label", "MyLabel");
  var bag=document.createElement("div");
  bag.id="bag";
  contents=document.createElement("div");
  contents.id="contents"
  bag.appendChild(contents)
  //console.log(typeof groupcopy)
  //bag.appendChild(groupcopy);
  //console.log(bag)
  //alert("a"+a)
  switch(a){
    case "sb":{
      checkifexist=localStorage.getItem(storage_label);
      
        if(checkifexist==null || (checkifexist!=null && confirm(storage_label+" already exists. Overwrite ?"))){
          //contents.classList= elem("Group").classList;
          //alert("page or box"+elem("pageorbox").value)
          if(elem("pageorbox").value=="wp"){
          contents.innerHTML= elem("GroupContainer").innerHTML;
          }
          else{
            if(elem("pageorbox").value=="bx"){
              if(!CurrentP){
                alert("You have not selected a box to save.")
                return;
              }
              else{
                clone=cloneElement(CurrentP);
                //CopyStyleAll(CurrentP,clone);

                contents.innerHTML="<DIV id='Group'><p id='MFB1'>Extraction from "+CurrentWebPage+"</p>"+clone.outerHTML+"</DIV"
              }
            }
          }
          localStorage.setItem(storage_label,bag.innerHTML);
          alert(storage_label + "has been saved in the local browser");
          hide(optionlist);
          callback(storage_label);

        }
      
      else{
        //contents.classList= elem("Group").classList;
        contents.innerHTML= elem("GroupContainer").innerHTML;
  
        localStorage.setItem(storage_label,bag.innerHTML);
        
      }
      //console.log("Saved to "+storage_label+" in browser");
      break;
    } 
    case "rb":{
      bag.innerHTML=localStorage.getItem(storage_label);
      contents=bag.children[0];
      elem("GroupContainer").innerHTML=contents.innerHTML;
      restoreDIV("Group");
      callback(storage_label);
      linkfonts();
      break;
    }
    
    case "sc":{
      switch(elem("accessrightoptions").value){
        case "vo":
          allow_view="all";
          allow_edit="none";
          break;
        case "vd":
          allow_view="domain";
          allow_edit="none";
          break;
        case "ve":
          allow_edit="all";
          allow_view="all";
          break;
        case "ed":
          allow_edit="domain";
          allow_view="domain";
          break; 
        case "oo":
          allow_edit="none";
          allow_view="none";
          break;
      }    
      
      
        //console.log("storage label:"+storage_label);
        if(elem("cpageorbox").value=="wp"){
          ExtractToSave = elem("Group").outerHTML;
          }
          else{
            if(elem("cpageorbox").value=="bx"){
              if(!CurrentP){
                alert("You have not selected a box to save.")
                return;
              }
              else{
                clone=cloneElement(CurrentP);
                CopyStyleAll(CurrentP,clone);

                ExtractToSave="<DIV id='Group'><p id='MFB1'>Extraction from "+CurrentWebPage+"</p>"+clone.outerHTML+"</DIV"
              }
            }
          }


          //alert(ExtractToSave.length)

        sendtoserver(storage_label,ExtractToSave,allow_edit,allow_view)
        if(callback){
        callback(storage_label)
        }
        break;
    
  }
    case "ri":{
      //getfromserver(storage_label,bag,"new","1");
      //alert(CurrentP.id)
      if(typeof CurrentP == "undefined"){
        alert("To insert a nested box, you first have to select a box")
        
        //getfromserver(storage_label,elem("Group"),"Group");
      
      }
      else{
        //alert("I am CurrentP")
        //console.log("Before :"+CurrentP.style.gridColumnStart)
        copyStyle(CurrentP);
        //alert("I am ... here ")
        getfromserver(storage_label,CurrentP,"insert");
        applyStyle(CurrentP);
        //console.log("After :"+CurrentP.style.gridColumnStart)
        
        
      }
      break;
    }
    case "rx":{
      /* beta restore from Cloud */
      //content.log(storage_label)
      //console.log("I am here")
        
        getfromserver(storage_label,elem("Group"),"open",resetdef);
        break;
      
      
        


      
      
      //restoreDIV("Group");
      //break;
      //loadXMLDoc(storage_label);
      //console.log("After Load..."+elem("Group").innerHTML)
      // Cannot run restoreDIV as loadXMLDoc is asynchronous
      // and document may not be fully loaded   
    } 
    
    

    case "ro":{
      loadXMLDoc(storage_label);
    }         
  }

}



function updcwp(newname){
  CurrentWebPage=newname;
}




function shareboxes(ev){
  
  if(FileToRestore==""){
    if(CurrentWebPage==""){
  
    nbxalert("Error","Your Nested Box does not have a title. You have to save it in the Cloud first to get its URL.","red")
    return;
    }
    else{
      fname=CurrentWebPage;
    }

  }
  else{
    if(CurrentWebPage!=""){
      fname=CurrentWebPage;
    }
    else{
    fname=FileToRestore;
    }
  }
  text="Nested Box URL : http://nstdboxes.com?"+fname+"<br>";
  if(CurrentP){
  text+="Box URL: http://nstdboxes.com?"+fname+"&"+CurrentP.id;
  }
  nbxalert("Sharing your Nested Box URL", text,"green")

  /*
  var text = "mailto:" 
  text+="?subject=Take a look at http://nstdboxes.com?"+fname;
  text+="&body="+"Hi , Recently I found a new app called nstdBoxes (pronounced 'Nested Boxes') which has tools to help users build interesting web pages using the concept of 'boxes within boxes'.. Take a look at what I've built with it: http://nstdboxes.com?"+fname;
  window.open(text);
  emailbox.style.display='none';
  */
}

function restoreDIV(pelid){
// Make a list of all DIVs which are a descendant of pelid eg Group
// If a DIV has a text node (3), then add onclick event listener 
// and change cursor style
//temp=elem("Group").innerHTML
//tempx=temp.replace(/~/gi,"&");
//elem("Group").innerHTML=tempx
      
pel=elem(pelid)
//console.log("restoreDIV "+pel.innerHTML)
  x=document.getElementsByTagName("p")
  pmax=findBiggestID("p","MFB")
  dmax=findBiggestID("div","MFB")
  if(pmax>dmax){
      Last_ID=pmax+1;
    }
    else{
      Last_ID=dmax+1;
    }
  //console.log("Last ID :"+Last_ID)
  //console.log(x.length)
  for(i=0;i<x.length;i++){
    //console.log(x[i].id+x[i].innerHTML)
    
    if(Descendant(x[i],pel)){
      //console.log(i+"/"+x[i].id)
      if(typeof x[i].childNodes[0]!="undefined"){
          //console.log("Node type"+x[i].id+":"+x[i].childNodes[0].nodeType+":"+x[i].innerHTML)
        if([1,3].indexOf(x[i].childNodes[0].nodeType)>-1){
          //console.log(x[i].id+"-"+x[i].innerHTML)
          //console.log("click added to "+x[i].id+":"+x[i].tagName)
          x[i].addEventListener("click",function(){myPopUp(event)});

          //x[i].addEventListener("mouseover",function(){shownohiddenboxes(event)});
          x[i].addEventListener("dblclick",function(){showhide(event);});
          x[i].style.cursor="context-menu";
          //x[i].addEventListener("mouseover",function(){showchevronone(this)});
          //x[i].addEventListener("drop",function(){drop(event);});
          //x[i].addEventListener("dragover",function(){allowDrop(event);});
          //x[i].addEventListener("dragstart",function(){drag(event);});
          x[i].contentEditable=false
          //x[i].draggable="true"
        
          
          
        }
      }
    }
    
  }
  showboxesall();

  

  elem("Group").childNodes[0].addEventListener("click",function(){myPopUp(event)});
  elem("Group").childNodes[0].addEventListener("dblclick",function(){showhide(event)});
  //elem("Group").style.zIndex=-1;
  
  x=elem("Group").getElementsByTagName("a")
  for(i=0;i<x.length;i++){
    x[i].parentElement.addEventListener("click",function(){myPopUp(event)});
    x[i].parentElement.addEventListener("dblclick",function(){showhide(event);});
    
  }
  
  //buildmenu();
  //hidemenu();
} 

function findBiggestID(element_type,prefix,ele){
    if(!ele){
     z=document.getElementsByTagName(element_type);
    }
    else{
      z=ele.getElementsByTagName(element_type)
    } 
     max=0;
     for(i=0;i<z.length;i++){
       if(z[i].id!=""){
        if(z[i].id.indexOf(prefix)!=-1){
          //console.log(z[i].id+" "+z[i].id.split(prefix)[1]+"X")
          idv=parseInt(z[i].id.split(prefix)[1])
          if(idv>max)max=idv;
        }
       }
     }
     return(max)
}

function Descendant(el,pel){
  // Check if el is a descendant of pel
  //var chain=[];
  //var i=0;
  while(el.parentElement!=pel){
    //console.log("1. "+el.id+" <-> "+el.parentElement.id)
    if(el.parentElement.id=="Body" || 
       el.parentElement.id=="fileops"||
       el.parentElement.id=="menu"||
       el.parentElement.id==""
       ){
      
      //console.log("2. "+el.id+" is not a descendant of "+pel.id)

      return(false)
    }
    else {
      el=el.parentElement;
      
    }
      return(true);

  }
}
var upd="false"

function sendtoserver(fname,text,allow_e,allow_v,confirm,callback){
  //text=elem("Group").innerHTML;
 // firebase.database().ref(fname).set({
 //   nbxtext:text
 // });
//console.log(text);
//console.log("fname "+fname)
//console.log("text "+text)
//console.log("allow-e "+allow_e)
//console.log("allow-v "+allow_v)
document.body.style.cursor="wait";
//console.log("Group cursor"+elem("Group").style.cursor)
 if(firebase.auth().currentUser.isAnonymous){
   nbxalert("Upload to Cloud","To upload your Nested Box to the cloud, you have to first log in with an email address.","red")
   elem("fileops").style.display="none";
   return(false);
 }
 var docRef = db.collection(currentCollection).doc(fname);
 
  docRef.get().then((doc) => {
    
      if (doc.exists) {
        upd="";
        //console.log(upd);
        /* check if user is allowed to update document */
        
        if(doc.data().creator_id==firebase.auth().currentUser.uid){
          upd="true";
        }
        else {
         switch(doc.data().allow_edit) {
           case "domain" :
             if(firebase.auth().currentUser.email.split("@")[1]==doc.data().creator_email.split("@")[1])
               upd="true";
             else 
              upd="false";
             break;
           case "all" :
             upd="true";
             break;
           
           default:
             if(doc.data().allow_view=="all" && confirm && confirm=="no"){
               upd="true"
             }
             else{
             upd="false";
             }
         }    
       }
        //checkaccess(doc.data().allow_edit,doc.data().allow_view,doc.data().creator_id,doc.data().creator_email);
        if (upd=="false"){
           nbxalert("ERROR","Sorry, you are not allowed to update this Nested Box. You may however save this Nested Box under a different name.","red")
           return(false);
         }
        if(!confirm || (confirm && confirm=="yes")){ 
        if(!prompt("Overwrite existing Nested Box ?","yes")){
            return(false);
           }
          }   

          curr_creator_email=doc.data().creator_email;
          curr_creator_id=doc.data().creator_id;
          if(doc.data().create_date!=null){
            curr_create_date=doc.data().create_date;
          }
          else{
            curr_create_date=firebase.firestore.FieldValue.serverTimestamp();
          }
          /* Only the creator/owner can update the access right */
          if(doc.data().creator_id==firebase.auth().currentUser.uid){
            new_allow_edit=allow_e;
            new_allow_view=allow_v;  
          }
          else{
            new_allow_edit=doc.data().allow_edit;
            new_allow_view=doc.data().allow_view;
          }
          //alert(text.length)
          docRef.set({
    
            boxcontent:text,
            creator_email:curr_creator_email,
            creator_id:curr_creator_id,
            create_date:curr_create_date,
            updater_email:firebase.auth().currentUser.email,
            updater_id:firebase.auth().currentUser.uid,
            last_update:firebase.firestore.FieldValue.serverTimestamp(),
            allow_edit:new_allow_edit,
            allow_view:new_allow_view
           })
        .then((x) => {
          //alert("Web page successfully saved.");
          if(confirm && confirm=="no"){
            //alert("Calling back...")
            callback(fname,elem("Group"),"open",resetdef)
          nbxalert("Uploading To The Cloud : Successful !","Your input has been uploaded to https://nstdboxes.com?"+fname+" and the download has been refreshed.","green")
          //window.open("https://nstdboxes.com?"+fname);
          }
          else{
          nbxalert("Uploading To The Cloud : Successful !","Your Nested Box has been uploaded to the cloud. You can access it using this URL:https://"+window.location.hostname+"?"+fname,"green")
          //alert("I am here")
          document.body.style.cursor="default";  
          }
          hide(optionlist);
          
          
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          nbxalert("Error During Upload","Error encontered:"+error+"Your Nested BoxNeste was NOT uploaded to the cloud.","red")
          
        });


         
        }
        else{
          console.log("i am here ....")
        docRef.set({
    
        boxcontent:text,
        creator_email:firebase.auth().currentUser.email,
        creator_id:firebase.auth().currentUser.uid,
        create_date:firebase.firestore.FieldValue.serverTimestamp(),    
        updater_email:firebase.auth().currentUser.email,
        updater_id:firebase.auth().currentUser.uid,
        last_update:firebase.firestore.FieldValue.serverTimestamp(),
        allow_edit:allow_e,
        allow_view:allow_v
        })
        .then(() => {
        console.log("Document successfully written.");
        nbxalert("Uploading To The Cloud : Successful !","Your Nested Box has been uploaded to the cloud. You can access it using this URL:https://"+window.location.hostname+"?"+fname,"green")
        document.body.style.cursor="wait";

        hide(optionlist);
        })
        .catch((error) => {
        console.error("Error adding document: ", error);
        nbxalert("Uploading To The Cloud : Not successful","Error encountered:"+error+":Your Nested Box was NOT uploaded to the cloud.","red")
  
        });

        }
      })
   
elem("Group").style.cursor="default"   
    }

function nbxalert(hdrtxt,txt,clr){
   if(typeof msgdiv =="undefined"){
     msgdiv=document.createElement("div");
     msgdiv.id="msgdiv"
     document.body.appendChild(msgdiv);
     msghdrdiv=document.createElement("div");
     msghdrdiv.id="msghdrdiv"
     msghdrdiv.style.color="white";
     msghdrdiv.style.textAlign="center";
     msghdrdiv.style.fontSize="1rem"
     msgdiv.style.borderRadius="3px"
     msgdiv.style.boxShadow="0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)"
     msgdiv.appendChild(msghdrdiv);
     
     msgbdydiv=document.createElement("div");
     msgbdydiv.style.backgroundColor="white";
     msgbdydiv.style.textAlign="center"
     msgbdydiv.style.fontSize="1rem"
     msgbdydiv.style.padding="1rem"

     msgdiv.appendChild(msgbdydiv);

     
     msgdiv.style.top="200px";
     msgdiv.style.left="200px";
     msgdiv.style.maxWidth="30rem";
     //msgdiv.style.zIndex=4;
     msgdiv.style.display="block";
     msgdiv.style.position="fixed";
     //msgdiv.style.padding="1rem";
     
     msgdiv.style.border="1px solid black"
     
     

   }
   show(msgdiv);
   msghdrdiv.innerHTML=hdrtxt;
   msgbdydiv.innerHTML=txt;
   
   msghdrdiv.style.backgroundColor=clr;
   msghdrdiv.onclick=function(){
     hide(this.parentElement);
   }

}

function getfromserver(fname,obj,ftype,callback,confirm){
  //  textretrieved = firebase.database().ref(fname).get()
  //  console.log("Text retrieved "+textretrieved)
  boxtoload="";
  //console.log("F:"+fname);
  ViewOnly=0;
  if(fname.indexOf("&")!=-1){
    // fname = filename#objectid
    fname1=fname.split('&')[0];
    if(fname.split('&')[1]){
      if(fname.split('&')[1]=="vo"){
        ViewOnly=1;
      }
      else{
      boxtoload=fname.split('&')[1];
        if(fname.split('&')[2]){
          if(fname.split('&')[2]=="vo"){
            ViewOnly=1;
          }
      
        }
      }
    }  
    console.log("filename "+ fname1+";box id "+boxtoload+";"+ViewOnly)
    fname=fname1;
  }
  
  
  
  //console.log("fname "+fname)
  //CurrentWebPage=fname;
  //console.log("CWP2 "+CurrentWebPage)


    var docRef = db.collection(currentCollection).doc(fname);
  
  docRef.get().then((doc) => {
      if (doc.exists) {
        if(doc.data().creator_id==firebase.auth().currentUser.uid){
          view="ok";
        }
        else {
         switch(doc.data().allow_view) {
           case "domain" :
             if(firebase.auth().currentUser.email.split("@")[1]==creatremail.split("@")[1])
               view="ok";
             else 
               view="notok";
             break;
           case "all" :
              view="ok";
             break;
           default:
             view="notok";
         }    
       }
          if(view=="notok"){
            alert("Sorry, you don't have view access to this Nested Box.");
            return;

          }
            //alert("ftype:"+ftype)
          switch(ftype){

            case "open":
               //alert("I am opening...")
              //console.log("opening...")
              if(boxtoload==""){
                obj.outerHTML=doc.data().boxcontent;
                old_display=obj.style.display;
                obj.style.display="none";
                //console.log(elem("Group").getAttribute('data_token'))
                if(elem("Group").getAttribute('data_token')!=null && elem("Group").getAttribute('data_token')!=""){
                  if(prompt("Code ?","")!=elem("Group").getAttribute('data_token')){
                    alert("Wrong Code");
                    resetGroup();
                    return;
                  }
                  else{
                    obj.style.display=old_display;
                  }
                }
                if(ViewOnly==1){
                  hide(starticon);
                }
              }
              else {
                temp=document.createElement("div");
                temp.style.display="none";
                document.body.appendChild(temp);
                temp.id="XXX"
                temp.innerHTML=doc.data().boxcontent;
                x=temp.getElementsByTagName("DIV")
                for(j=0;j<x.length;j++){
                  if(x[j].id=="Group"){
                    if(x[j].getAttribute('data_token')!=null){
                      if(prompt("Code ?","")!=x[j].getAttribute('data_token')){
                        alert("Wrong Code");
                        return;
                      }
                    }
                    else{
                      break;
                    }
                  }
                }
                temp_eles=temp.getElementsByTagName("*");
                clone=null;
                for(i=0;i<temp_eles.length;i++){
                  if(temp_eles[i].id==boxtoload){
                    //preclone=temp_eles[i].cloneNode(true)
                    //console.log(preclone.innerHTML)
                    clone=cloneElement(temp_eles[i]);
                    break;
                  }
                }
                if(clone){
                  obj.innerHTML=clone.innerHTML;
                  clone.remove();
                  if(ViewOnly==1){
                    hide(starticon);
                      elem("firstp").style.height="0px";
                      elem("buffer").style.height="0px";
                  }
                }   
              }
              restoreDIV("Group");
              CurrentWebPage=fname;
  
              callback();

            break;
          case "insert":
            console.log("I am here : obj"+obj.innerHTML)
            temp=document.createElement("div");
            temp.style.display="none";
            document.body.appendChild(temp);
            temp.id="XXX"
            
            temp.innerHTML=doc.data().boxcontent;
            x=temp.getElementsByTagName("DIV")
                for(j=0;j<x.length;j++){
                  if(x[j].id=="Group"){
                    if(x[j].getAttribute('data_token')!=null){
                      if(prompt("Code ?","")!=x[j].getAttribute('data_token')){
                        alert("Wrong Code");
                        return;
                      }
                    }
                    else{
                      break;
                    }
                  }
                }
            clone0=null;
            if(boxtoload!=""){
              temp_eles=temp.getElementsByTagName("*");
              for(i=0;i<temp_eles.length;i++){
                if(temp_eles[i].id==boxtoload){
                  //preclone=temp_eles[i].cloneNode(true)
                  //console.log(preclone.innerHTML)
                  clone0=cloneElement(temp_eles[i]);
                  //console.log(clone0.classList)
                  break;
                }
              }
              if(clone0){
                temp=cloneElement(clone0);
                //CopyStyleAll(clone0,temp);
                //temp.innerHTML=clone0.innerHTML;
                //temp.classList=clone0.classList;
                clone0.remove();
                
              }
            }


            
            //console.log(temp.innerHTML)
            x=temp.getElementsByTagName("DIV")
            //alert("I am here")
            for(i=0;i<x.length;i++){
              Last_ID++;
              //console.log("old id"+x[i].id)
              x[i].id="MFB"+Last_ID;
              //console.log("new id"+x[i].id)
              
            }
            //alert("I am still here")
            x=temp.getElementsByTagName("P")
            for(i=0;i<x.length;i++){
              Last_ID++;
              //console.log("old id"+x[i].id)
              x[i].id="MFB"+Last_ID;
              //console.log("new id"+x[i].id)
              
            }
            //alert("I am still still here")
            //clone=cloneElement(temp)
            //console.log({clone})
            //console.log({obj})
            //alert()
            //alert("I am still still still here")
            obj.innerHTML+=temp.outerHTML;
            //obj.innerHTML+=clone.outerHTML;
            //obj.classList=clone.classList;
            //alert("I am still still still still here")
            
            //clone.remove();
            obj.style.height="auto";
            obj.style.width="auto";
            obj.children[1].style.display="block";
            temp.remove()
            restoreDIV("Group");
            callback()
            break;
          
          case "update":
            //console.log("updating...");
            temp=document.createElement("div");
            temp.style.display="none";
            document.body.appendChild(temp);
            temp.id="XXX"
            //temp.innerHTML=doc.data().boxcontent;
            obj.innerHTML=doc.data().boxcontent;
            
            //console.log("temp innerHTML"+temp.innerHTML)
            //clone=cloneElement(temp)
            //obj.innerHTML+=clone.innerHTML;
            //console.log("obj innerHTML"+obj.innerHTML)
            
            //clone.remove();
            //console.log("obj innerHTML after"+obj.innerHTML)
            callback(obj,confirm);
            
            break;

          }
      
          //console.log("obj"+obj.innerHTML)
          
        }
        else{
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
  
  
}

function showtoday(){
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
return(today);
}


var targetBox = new Object();
//targetBox.boxid;
//targetBox.newtext;
//targetBox.fname;

function updatewebpage(obj,confirm,callback){
  //var obj=document.createElement("div")
  //getfromserver(fname,obj,"update")
  //console.log("obj "+obj.outerHTML)
  obj_els=obj.getElementsByTagName("*");
    biggestD=findBiggestID("p","MFB",obj);
    console.log("BiggestD "+biggestD);
    biggestD++;

    for(i=0;i<obj_els.length;i++){
      if(obj_els[i].id==targetBox.boxid){
        console.log("Obj ID"+obj_els[i].id)
        obj_els[i].appendChild(createbox(targetBox.newtext,biggestD));
        break;
      }
    }  
    console.log("obj innerHTML:"+obj.innerHTML)
    
  sendtoserver(targetBox.fname,obj.innerHTML,"all","all",confirm,getfromserver);


}

function givefeedback(ev){
  optionlist.style.width=wide;

if(typeof feedbackdiv == "undefined"){
  feedbackdiv=document.createElement("div")
  optionlist.appendChild(feedbackdiv)
  feedbacktext=document.createElement("textarea")
  feedbacktext.id="feedbacktext"
  feedbackdiv.appendChild(feedbacktext);
  feedbacktext.rows=4;
  feedbacktext.cols=50;
  feedbacktext.placeholder="<br><br>Please enter your feedback here";
  fbactiondiv=document.createElement("div");
  feedbackdiv.appendChild(fbactiondiv);
  fbcanceldiv=document.createElement("div");
  fbactiondiv.appendChild(fbcanceldiv);
  fbsenddiv=document.createElement("div");
  fbactiondiv.appendChild(fbsenddiv);
  fbviewdiv=document.createElement("div");
  fbactiondiv.appendChild(fbviewdiv);
  fbactiondiv.style.display="flex"
  fbactiondiv.style.flexDirection="row"
  fbactiondiv.style.justifyContent="space-around"
  fbcanceldiv.classList.add("nbxbutton")
  fbcanceldiv.innerHTML="Cancel"
  fbsenddiv.classList.add("nbxbutton")
  fbsenddiv.innerHTML="Send Feedback"
  
  fbviewdiv.classList.add("nbxbutton")
  fbviewdiv.innerHTML="<a href='https://nstdboxes.com?nbxFeedback&vo' target='_blank'>View Feedback</a>"
  
  fbcanceldiv.onclick=function(){
    hide(optionlist);
  }
  //fbviewdiv.onclick=function(){
  //  window.open("https://nstdboxes.com?nbxFeedback&vo");
    //hide(optionlist);
  //}
  
  
  //feedbackdiv.innerHTML+="<div style='text-align:center;padding:0.5rem;' id='sendfeedback'>Submit Feedback</div>"

}
elem("feedbacktext").value="Date: "+showtoday()+" | From :"+firebase.auth().currentUser.email+(CurrentWebPage!=""?"-"+CurrentWebPage:"");

fbsenddiv.onclick=function(){
  
  console.log("Feedback "+elem("feedbacktext").value)
  var obj=document.createElement("div")
  targetBox.boxid="MFB1"
  targetBox.newtext=elem("feedbacktext").value;
  targetBox.fname="nbxFeedback"
  getfromserver("nbxFeedback",obj,"update",updatewebpage,"no")
  
  //updatewebpage("nbxFeedback","MFB1",elem("feedbacktext").value)
  //console.log("Feedback uploaded")
  hide(optionlist);
}
setoptionposition("Font",ev);
olhdiv1.innerHTML="Feedback"
show(feedbackdiv);
show(optionlist); 
show(optionlistheader,"flex");
setoptionlistwidth();
//optionlist.onmouseleave=function(){}; 
//optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  

}





function changeid(ele,Last_ID){
/* change ID of ele and descendants starting with startID */
console.log(ele.id)
Last_ID++
ele.id="MFB"+Last_ID;
console.log("changed to:"+ele.id)

for(i=0;i<ele.children.length;i++){
  if(ele.children[i].tagName=="DIV"){
    changeid(ele.children[i],Last_ID)
  } 
}
}





function loadXMLDoc(project){  
  url=StorageFolder+"/"+project;
  //alert(url)
  xmlhttp=null
  // code for Mozilla, etc.
  if (window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest()
  }
  // code for IE
  else if (window.ActiveXObject){
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
    }

  if (xmlhttp!=null){
    xmlhttp.onreadystatechange=onResponse;
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
    //console.log(elem("Group").innerHTML)
    }
  else {
    alert("Your browser does not support XMLHTTP.")
  }

}

function onResponse(){
	if(checkReadyState(xmlhttp)){
    xmldata = xmlhttp.responseText;
    //console.log(xmldata)
    elem("Group").innerHTML=xmldata
    //console.log("completed")
    temp=elem("Group").innerHTML
    //console.log("onresponse before "+temp);
    tempx=temp.replace(/~/g,"&");
    //console.log("onresponse after"+tempx);
    
    elem("Group").innerHTML=tempx
    restoreDIV("Group");
    //console.log(elem("Group").innerHTML)
    //elem("Group").innerHTML.replace(/^/g,"&");
    //console.log(elem("Group").innerHTML)
    //alert(xmldata)
    //restoreDIV(elem("Group"));
  }
}

function checkReadyState(obj){
  if(obj.readyState == 4){
    if(obj.status == 200){
      return true;
    }
    else{
      alert("Problem retrieving XML data");
    }
  }
}

// showMENU
first_menu_item=0
no_menu_items=10

function refreshMenu(first,no_menu_items){
  if(first<=0)first=0;
  if(first>(menuitems-2))first=menuitems-2-no_menu_items; 
  for(i=0;i<(menuitems-2);i++){
    elem("mi"+i).style.display="none";
  }
  for(i=first;i<(first+no_menu_items);i++){
    elem("mi"+i).style.display="block";
  }
  //elem("menu").style.width=(no_menu_items+2)*33+"px"
  
}
function showMenu(first,no_of_items){
  var popup = elem("menu");
  popup.style.position="fixed";
  popup.style.zIndex=2;
  popup.style.left="50px"
  popup.style.top="0px"
  popup.style.display="flex"
  popup.style.flexDirection="row"
  refreshMenu(first,no_of_items);
  //popup.style.justifyContent="space-between"

  
}
 
function shownohiddenboxes(el){
  no_siblings=el.parentElement.childElementCount;
  //alert("CurrentB"+CurrentB.id+"/"+el.id+"/no siblings:"+no_siblings)
  //tipcircle=elem("tipcircle")
  no_hidden=0
  for(i=1;i<no_siblings;i++){
    if(el.parentElement.children[i].style.display=="none"){
      no_hidden+=1;
    }
  }
  //tipcircle.innerHTML="<div class='triangle-down'></div><span style='position:fixed;margin-left:-6px;margin-top:-26px;'>"+no_hidden+"</span>"
  offset=0
  if(no_hidden>0){
    offset=-5
    //tipcircle.innerHTML="&#x2304;"
    //tipcircle.innerHTML="&#128317;"
    //tipcircle.innerHTML="<span id='showone' class='icon material-icons-outlined'>check_box_outline_blank</span>"
    //tipcircle.innerHTML+="<span id='showall' class='icon material-icons-outlined'>window</span>"
    //elem('showone').onclick=function(){showhide(event);}
    //elem('showall').onclick=function(){showhideall();}

    tipcircle.innerHTML="&#9660;"
    
  }
  else{
    offset=-5
    //if(no_siblings>1){
    //tipcircle.innerHTML="&#x2303;"
    tipcircle.innerHTML="&#9651;"
    //tipcircle.innerHTML="<span onclick='showhideall()' class='icon material-icons-outlined'>window</span>"
    //}
  }
  //console.log("color:"+tipcircle.style.color)

  //show(tipcircle,"inline-block")
  pad=10
  wid=25
  boxB=el.getBoundingClientRect()
  //tipcircle.style.top=boxB.top +"px" ;
  //tipcircle.style.left=boxB.left+  "px";
  tipcircle.style.top=(boxB.top+boxB.height+offset)+"px";
  //tipcircle.style.left=(boxB.left+parseInt(boxB.width/2))+"px";
  tipcircle.style.left=(boxB.left+pad+"px");
  
  tipcircle.onclick=function(){
   showhide(event);
   //hide(tipcircle);
 }
 
 //editicon.style.="relative"
  if(currentMode=="EDIT"){
    editicon.innerHTML="<span class='icon material-icons-outlined'>edit</span>"
    //editicon.style.left=(boxB.left+parseInt(boxB.width/2)+20)+"px";
    editicon.style.left=(boxB.left+pad+wid)+"px";
    editicon.style.top=(boxB.top+boxB.height+offset)+"px";
      
    //editicon.style.left=(parseInt(tipcircle.style.left.split('px')[0]) + 50) +"px"
    //editicon.style.top=tipcircle.style.top
    editicon.onclick=function(){
    editboxtext(event,CurrentB,"direct");
    }
    show(editicon,"inline-block")
    
    if(!window.matchMedia("(max-width: 700px)").matches && showIcons=="Yes"){
 
    copyicon.innerHTML="<span class='icon material-icons-outlined'>content_copy</span>"
    copyicon.style.left=(boxB.left+pad+2*wid)+"px";
    //copyicon.style.left=(boxB.left+parseInt(boxB.width/2)+60)+"px";
    
    copyicon.style.top=(boxB.top+boxB.height+offset)+"px";
    
  //editicon.style.left=(parseInt(tipcircle.style.left.split('px')[0]) + 50) +"px"
    //editicon.style.top=tipcircle.style.top
    copyicon.onclick=function(){
      moveboxout("copy");
    }
    cuticon.innerHTML="<span class='icon material-icons-outlined'>shopping_cart</span>"
    //cuticon.style.left=(boxB.left+parseInt(boxB.width/2)+40)+"px";
    cuticon.style.left=(boxB.left+pad+3*wid)+"px";
    
    cuticon.style.top=(boxB.top+boxB.height+offset)+"px";
    
    //editicon.style.left=(parseInt(tipcircle.style.left.split('px')[0]) + 50) +"px"
    //editicon.style.top=tipcircle.style.top
    cuticon.onclick=function(){
      moveboxout("cut");
    }

  

    pasteicon.innerHTML="<span class='icon material-icons-outlined'>picture_in_picture_alt</span>"
    pasteicon.style.left=(boxB.left+pad+4*wid)+"px";
    //pasteicon.style.left=(boxB.left+parseInt(boxB.width/2)+80)+"px";
  
    pasteicon.style.top=(boxB.top+boxB.height+offset)+"px";
 
    pasteicon.onclick=function(){
    moveboxin();
    }

    pastenexticon.innerHTML="<span class='icon material-icons-outlined'>dashboard_customize</span>"
    pastenexticon.style.left=(boxB.left+pad+5*wid)+"px";
    //pasteicon.style.left=(boxB.left+parseInt(boxB.width/2)+80)+"px";
    
    pastenexticon.style.top=(boxB.top+boxB.height+offset)+"px";
    
  //editicon.style.left=(parseInt(tipcircle.style.left.split('px')[0]) + 50) +"px"
    //editicon.style.top=tipcircle.style.top
    pastenexticon.onclick=function(){
      pasteboxnext();
    }
    if(showLvl.toUpperCase()=="YES"){
    pastenexticon.innerHTML+="<span>[L"+findLevel(CurrentP)+":S"+(CurrentP.parentElement.childElementCount-1)+"]</span>"
    }
    show(copyicon,"inline-block")
    
    show(cuticon,"inline-block")
    show(pasteicon,"inline-block")
    show(pastenexticon,"inline-block")


  }
    
    
  }
}


chevron=[]
blackdownarrow="&#x25BC;"
whitedownarrow="&#x25BD;"

function z_showchevronone(ele){
  CurrentB=ele;
  CurrentP=CurrentB.parentElement;
  x=document.createElement("span");
  console.log(ele.id)
  if(typeof ele.parentElement == "undefined"){
    return;
  }
  if(ele.parentElement.children.length==0){
    return;
  }
  
  if(ele.parentElement.children[1].style.display=="none"){
    x.innerHTML=blackdownarrow;
  }
  else{
    x.innerHTML=whitedownarrow;
  }
  document.body.appendChild(x);
  x.style.zIndex=parseInt(ele.style.zIndex)+1;
  x.style.position="fixed";
  x.style.top=ele.offsetTop+ele.offsetHeight+"px";
  x.style.left=ele.offsetLeft+(ele.offsetWidth/2)+"px";
  x.style.cursor="pointer";
  x.onmouseover=function(){
    showhide(event);
    if(x.innerHTML==blackdownarrow){
      x.innerHTML=whitedownarrow;
    }
    else{
      x.innerHTML=blackdownarrow;
    }
    hide(x);

  }
  show(x);

} 



function z_showchevronall(){


  var p=document.querySelectorAll("p")
chevrondiv.innerHTML="";
for(i=0;i<p.length;i++){

  chevron[i]=document.createElement("div");
  chevron[i].pid=p[i].id;
  chevron[i].id=p[i].id+"x";
  chevrondiv.appendChild(chevron[i]);

}


}





function myPopUp(event,ele){
 
 allOutline=true;
 toggleoutline();
 hideicons();
/*
 if(CurrentB)
alert("Current B:"+CurrentB.id);
if(ele)
alert("ele:"+ele.id);
if(event)
alert("event id:"+event.currentTarget.id)
*/
  
/*
  if(CurrentB){
    hideoutline(CurrentB);
  }  
  if(CurrentP){
    hideoutline(CurrentP);
  }  
*/
if(ele){
  CurrentB=ele;
  }
else{
  
  
  CurrentB=event.currentTarget;
}
//console.log("CurrentB:"+CurrentB.id+"-"+CurrentB.tagName)
CurrentBtext=CurrentB.innerHTML;
CurrentP=CurrentB.parentElement

//console.log("CurrentP:"+CurrentP.id+"-"+typeof CurrentP)


if(currentMode=="VIEW"){
  showhide(event);
  return;

}
else{
  showoutline(CurrentP,"b");
  //showoutline(CurrentP);
  

}

if(optionlist!=null){
  if(olhdiv1.innerHTML=="Assign box to class..."){
  xtop=optionlist.style.top;
  xleft=optionlist.style.left;
  setstyleclass();
  optionlist.style.top=xtop;
  optionlist.style.left=xleft;
  
  }
  else{
  optionlist.style.display="none";
  }
}
//alert("CurrentB "+CurrentB.id)
  shownohiddenboxes(CurrentB);
 
  if(defDirectEdit!="No"){
    CurrentB.contentEditable=true;
    
    
    
    CurrentB.onblur=function(){
      //console.log("Blurring.."+this.innerHTML+":"+CurrentBtext)
      if(this.innerHTML!=CurrentBtext){
        //console.log("I am stripping..."+this.innerHTML)
        x=striptextblock(this.innerHTML);
        this.innerHTML=x;
      } 
      else{
        //console.log("No change.."+this.innerHTML)
      } 
      
    }
    
  }
  else{
    CurrentB.contentEditable=false;
  }
  //editboxtext(event,CurrentB,"direct");
  

}

function editboxtext(event,elemt,edittype){
  //alert("editboxtext ele"+elemt.id)
  if(CurrentP.getAttribute("nbx_hyper_url")===null && CurrentP.getAttribute("nbx_imgurl")===null){
  
    if(typeof texteditdiv == "undefined"){
      texteditdiv=document.createElement("div")
      texteditdiv.style.display="flex"
      texteditdiv.style.flexDirection="column"
      fixedbanner.appendChild(texteditdiv);
      texteditarea=document.createElement("textarea")
      texteditdiv.appendChild(texteditarea);
      
      actiondiv=document.createElement("div")
      fixedbanner.appendChild(actiondiv)
      actiondiv.style.display="flex"
      
      actiondiv.style.flexDirection="row"
      actiondiv.style.justifyContent="space-around"
      actiondiv.style.zIndex=9;
      submitdiv=document.createElement("div")
      
      submitdiv.classList.add("nbxbutton")
      
      actiondiv.appendChild(submitdiv)
      
      canceldiv=document.createElement("div")
      canceldiv.classList.add("nbxbutton")
      canceldiv.innerHTML="Abort"
      actiondiv.appendChild(canceldiv)
      canceldiv.onclick=function(){
        //texteditarea.value="";
        hide(texteditdiv);
        hide(actiondiv);
        hide(tipcircle);
        hideicons();
      }
      downdiv=document.createElement("div")
      downdiv.classList.add("nbxbutton")
      downdiv.innerHTML="&#x2193;"
      downdiv.style.cursor="pointer"
      actiondiv.appendChild(downdiv)
      downdiv.onclick=function(){
        //texteditarea.value="";
        //console.log(fixedbanner.style.top)
        //txttop=computestyle(fixedbanner,"top")
        //console.log(txttop)
        newtop=Math.min(window.innerHeight-100,parseInt(fixedbanner.style.top.split("px")[0])+200)
        //console.log(newtop)
        fixedbanner.style.top=newtop+"px";
        //console.log(fixedbanner.style.top);
        //alert(window.getComputedStyle(texteditdiv).getPropertyValue("top"))
      }
      updiv=document.createElement("div")
      updiv.classList.add("nbxbutton")
      updiv.innerHTML="&#x2191;"
      updiv.style.cursor="pointer"
      
      actiondiv.appendChild(updiv)
      
      updiv.onclick=function(){
        //texteditarea.value="";
        
        newtop=Math.max(5,parseInt(fixedbanner.style.top.split("px")[0])-200)
        //alert(newtop)
        fixedbanner.style.top=newtop+"px";
        //alert(newtop)
      }

        

      
    } 
    switch(edittype){
      case "direct":
        submitdiv.innerHTML="Update";
        texteditarea.value=elemt.innerHTML;
        submitdiv.onclick=function(){
        //alert("texteditarea:"+texteditarea.value)
        
        //alert(striptextblock(texteditarea.value))
        elemt.innerHTML=striptextblock(texteditarea.value);
        //alert("elemt:"+elemt.id+"/"+elemt.innerHTML)
        hide(texteditdiv);
        hide(actiondiv);
        hide(tipcircle);
        hideicons();
        }
        break;

      case "post":
        submitdiv.style.cursor="default"
        submitdiv.innerHTML="Insert new box into Nested Box in the Cloud"
        texteditarea.value="";
        texteditarea.placeholder="Please enter text for new box";
    
        submitdiv.onclick=function(){
        //alert("texteditarea:"+texteditarea.value)
        //elemt.innerHTML=texteditarea.value;
        //alert("elemt:"+elemt.id+"/"+elemt.innerHTML)
        var obj=document.createElement("div")
        targetBox.boxid=CurrentP.id;
        targetBox.newtext=texteditarea.value;
        targetBox.fname=CurrentWebPage;
        document.body.style.cursor='wait';
        hide(texteditdiv);
        hide(actiondiv);
        hide(tipcircle);
        hideicons();
         
        getfromserver(targetBox.fname,obj,"update",updatewebpage,"no")
  
        //hide(texteditdiv);
        //hide(actiondiv);
        }
        break; 
      }
  
    

    texteditarea.classList.add("optionbox");   
    texteditarea.style.position="initial";
    texteditarea.style.display="block";
    texteditarea.style.color="black";
    texteditarea.style.backgroundColor="white";
    
    texteditarea.style.fontSize=elemt.style.fontSize;
    texteditarea.style.fontFamily=elemt.style.fontFamily;
    texteditarea.style.fontStyle=elemt.style.fontStyle;
    texteditarea.style.fontWeight=elemt.style.fontWeight;
    
    texteditarea.cols="40"
    texteditarea.rows="3"
    texteditarea.style.fontSize="1rem";
    elem("GroupContainer").style.paddingTop="110px";
    actiondiv.style.width=texteditarea.cols+"vw";
    //alert(actiondiv.style.width)
    
    
    
    if(window.matchMedia("(max-width: 700px)").matches){
      
      texteditarea.style.width=(screen.width-100)+"px";

        
      }
    else{  
      texteditarea.style.width="600px";
      
      }
    /*
      console.log("screen height"+screen.height);
      console.log("screen width"+screen.width);
      console.log("text width"+texteditarea.style.width)
      
      console.log("optionlist position"+optionlist.style.position)
      console.log("optionlist top"+optionlist.style.top)
      console.log("optionlist left"+optionlist.style.left)
      console.log("font size"+texteditarea.style.fontSize)
     */  
    show(texteditdiv,"flex");
    show(actiondiv,"flex");
    show(canceldiv);
    show(submitdiv);
    show(fixedbanner);
    //elem("fixedbanner").onmouseleave=function(){elem("GroupContainer").style.paddingTop="37px";hide(this);hide(closeicon)};
      
    //addclosebutton(elem("fixedbanner"),"topleft",closeicon)
      
  }
  else{
    //hide(optionlist);
    setlinks(event);
  }
}


function printboxes(){
hide(topmenu);
hide(menu);

window.print()
show(topmenu);
show(menu,"flex")
}



function setlinks(ev){
  if(!CurrentP){
    nbxalert("Error","Please select a box","red");
    return;
  } 
  optionlist.style.width=narrow;
if(typeof linksdiv == "undefined"){
  linksdiv=document.createElement("div")
  linksdiv.className="optionlist"
  linksdiv.style.width="auto"
  linksdiv.style.marginLeft="1rem";
  optionlist.appendChild(linksdiv);
// hyperlink
  hyperlink=document.createElement("div")
  hyperlink.innerHTML="<br>Hyperlink<br>"
  linksdiv.appendChild(hyperlink)
  url1=document.createElement("textarea")
  url1.id="nbx_url"
  url1.placeholder="eg https://google.com"
  linksdiv.appendChild(url1)
  
 // hyperlink description
  hyperlinkdesc=document.createElement("div")
  hyperlinkdesc.innerHTML+="Description<br>"
  linksdiv.appendChild(hyperlinkdesc)
 
  urldesc=document.createElement("textarea")
  urldesc.id="nbx_urldesc"
  linksdiv.appendChild(urldesc)
 // imgsrc
  imgsrc=document.createElement("div")
  imgsrc.innerHTML+="Image URL<br>"

  linksdiv.appendChild(imgsrc)

  imgsrcurl=document.createElement("textarea")
  imgsrcurl.id="nbx_imgsrcurl"
  imgsrcurl.placeholder="eg https://live.staticflickr.com/65535/50015752748_c48b6e1074_k.jpg"
  linksdiv.appendChild(imgsrcurl)

//imgsrcurl.addEventListener("change",function(){updatetext("img")})
  
  imgwidth=document.createElement("input")
  imgwidth.id="nbx_imgwidth"
  imgwidth.type="text"
  imgwidth.size="4"
  imgwidth.style.marginLeft="1rem";
  //imgwidth.value="300";
  linksdiv.innerHTML+="<br>width :"+space
  linksdiv.appendChild(imgwidth)
  imgheight=document.createElement("input")
  imgheight.id="nbx_imgheight"
  imgheight.type="text"
  imgheight.size="4"
  imgheight.style.marginLeft="1rem";
  //imgheight.value="300";
  linksdiv.innerHTML+="<br>height :"
  linksdiv.appendChild(imgheight)
  imgfit=document.createElement("div")
  imgfit.innerHTML="<span style='width:5rem'>fit :</span>"
  imgfitselect=document.createElement("select")
  linksdiv.appendChild(imgfit);
  imgfit.appendChild(imgfitselect)
  imgfitselect.id='nbx_imgfit'
  imgfitselect.innerHTML=imgfitoptions;
  //<select id='nbx_imgfit'>"+imgfitoptions+"</select>"
  //imgfit.style.marginLeft="1rem";
  linksdiv.innerHTML+="<br>Current Box<br>"
  
  boxtext=document.createElement("textarea")
  boxtext.id="boxtext";
  //boxtext.readOnly=true;
  linksdiv.appendChild(boxtext);
  
//label2=document.createElement("p")
  linksdiv.innerHTML+="<br>Parent<br>"
//boxlabel.appendChild(label2)
  textarea2=document.createElement("textarea")
  linksdiv.appendChild(textarea2);
  textarea2.id="boxtextp"
}

boxtext=elem("boxtext")
boxtext.value=CurrentB.innerHTML
boxtext.style.backgroundColor="#f0f0f0";

boxtext.onchange=function(){CurrentB.innerHTML=this.value}
boxtextp=elem("boxtextp")
boxtextp.readOnly=true;
boxtextp.style.backgroundColor="#f0f0f0";
boxtextp.value=CurrentP.parentElement.children[0].innerHTML
boxtextp.onchange=function(){CurrentP.parentElement.children[0].innerHTML=this.value}

if(CurrentP.getAttribute("nbx_hyper_url")!=null)
elem("nbx_url").value=CurrentP.getAttribute("nbx_hyper_url");
else
elem("nbx_url").value="";
elem("nbx_url").addEventListener("change",function(){updatetext("url")})

if(CurrentP.getAttribute("nbx_hyper_urldesc")!=null)
elem("nbx_urldesc").value=CurrentP.getAttribute("nbx_hyper_urldesc");
else
elem("nbx_urldesc").value="";
elem("nbx_urldesc").addEventListener("change",function(){updatetext("desc")})

if(CurrentP.getAttribute("nbx_imgurl")!=""){
elem("nbx_imgsrcurl").value=CurrentP.getAttribute("nbx_imgurl");
elem("nbx_urldesc").readOnly=true;
//elem("nbx_urldesc").readOnly=true;

}
else
elem("nbx_imgsrcurl").value="";
elem("nbx_imgsrcurl").addEventListener("change",function(){updatetext("img")})

if(CurrentP.getAttribute("nbx_imgwidth")!=null)
elem("nbx_imgwidth").value=CurrentP.getAttribute("nbx_imgwidth");
else
elem("nbx_imgwidth").value="auto";
elem("nbx_imgwidth").addEventListener("change",function(){updatetext()})

if(CurrentP.getAttribute("nbx_imgfit")!=null)
elem("nbx_imgfit").value=CurrentP.getAttribute("nbx_imgfit");
else
elem("nbx_imgfit").value="fill";
elem("nbx_imgfit").addEventListener("change",function(){updatetext()})



if(CurrentP.getAttribute("nbx_imgheight")!=null)
elem("nbx_imgheight").value=CurrentP.getAttribute("nbx_imgheight");
else
elem("nbx_imgheight").value="auto";
elem("nbx_imgheight").addEventListener("change",function(){updatetext()})


setoptionposition("",ev)
olhdiv1.innerHTML="URLs & images.."+showi("image")
  
show(linksdiv);
show(optionlist);
//optionlist.onmouseleave=function(){}
//optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
show(optionlistheader,"flex");
setoptionlistwidth();
}

function updatetext(msg){
  //alert(msg+"has changed")
  // 1. hyper url != null
  // 1A. img src != ""
  // 1B img src == ""
  // 2. hyper url == null
  // 2A. img src !=""
  // 2B. img src ==""
  nbxurl=elem("nbx_url")
  console.log("nbxurl :"+nbxurl.innerHTML)
  console.log("nbx_url :"+elem("nbx_url").value)
  console.log(elem("nbx_url"))
  
  nbxurldesc=elem("nbx_urldesc")
  nbximgsrcurl=elem("nbx_imgsrcurl")
  nbximgwidth=elem("nbx_imgwidth")
  nbximgheight=elem("nbx_imgheight")
  nbximgfit=elem("nbx_imgfit")







  texturl=document.createElement("a")
  console.log("texturl href before :"+texturl.href)
  if(elem("nbx_url").value!="" || elem("nbx_url").value=="javascript:void(0)" ){
  texturl.href=elem("nbx_url").value
  }
  
  console.log("texturl href after:"+texturl.href)
  console.log("nbxurl :"+nbxurl.innerHTML)
  console.log("nbx_url :"+elem("nbx_url").value)
  console.log(elem("nbx_url"))
  

  //texturl.target="_blank"
  //nbxurl="<a href='"+elem("nbx_url").value+"' target='_blank'>"
 
  if(texturl.href!=""){
    console.log("texturl.href "+texturl.href+" is not blank")
    if(nbximgsrcurl.value !=""){
      nbxurldesc.value="<img src='"+nbximgsrcurl.value+"' width='"+nbx_imgwidth.value+"' height='"+nbx_imgheight.value+"'>";

      elem("nbx_urldesc").readOnly=true;
      elem("nbx_urldesc").style.backgroundColor="#f0f0f0";

    }
    else if(nbxurldesc.value=="") {
      if(elem("boxtext").value!="" && !elem("boxtext").value.startsWith("<img")){
          nbxurldesc.value=elem("boxtext").value
        }
        else{
          nbxurldesc.value="link"
          }
          elem("nbx_urldesc").readOnly=false;
          elem("nbx_urldesc").style.backgroundColor="white";
    
      } else if(nbxurldesc.value.startsWith("<img")){
        nbxurldesc.value="";
        elem("nbx_urldesc").readOnly=false;
        elem("nbx_urldesc").style.backgroundColor="white";


      }
      texturl.target="_blank"
      texturl.innerHTML=elem("nbx_urldesc").value
      CurrentB.replaceChild(texturl,CurrentB.childNodes[0])   
  }
  else if(texturl.href==""){
    console.log(">>>"+nbximgsrcurl.value)
    texturl.href="javascript:void(0)"
    texturl.target=""
      
    if(nbximgsrcurl.value !=""){
      texturl.innerHTML="<img src='"+nbximgsrcurl.value+"' width='"+nbx_imgwidth.value+"' height='"+nbx_imgheight.value+"' class='"+nbx_imgfit.value+"'>";
      
    }
    else{
      texturl.innerHTML=""
    }
    console.log("texturl :"+texturl.innerHTML)
    CurrentB.replaceChild(texturl,CurrentB.childNodes[0]) 
      
  }
                 
  
  CurrentB.addEventListener("dblclick",function(){showhide(event)});
  //console.log("CP before"+CurrentP.id+"/"+CurrentP.innerHTML)
  //console.log("CP after"+CurrentP.id+"/"+CurrentP.innerHTML)
  //elem("boxtext").innerHTML=nbxurl.innerHTML;
  boxtext.value=texturl.outerHTML;
  
  //CurrentB.addEventListener("mouseover",function(){myPopUp(event)})
  CurrentP.setAttribute("nbx_hyper_url",nbxurl.value);
  CurrentP.setAttribute("nbx_hyper_urldesc",nbxurldesc.value);
  CurrentP.setAttribute("nbx_imgurl",nbximgsrcurl.value)
  CurrentP.setAttribute("nbx_imgwidth",nbximgwidth.value)
  CurrentP.setAttribute("nbx_imgheight",nbximgheight.value)
  CurrentP.setAttribute("nbx_imgfit",nbximgfit.value)
  
  
}





  
  
  //menuitem[20]=menuitem["Resize"]=["select_all"]
  //menuitem[21]=menuitem["Position"]=["tab_unselected"]
  //menuitem[22]=menuitem["Float"]=["picture_in_picture_alt"]
  

  
function addnewboxinside(){
  if(CurrentP){
    CurrentP.appendChild(createbox(''))
    newbox_id=Last_ID-1;
      CurrentB=document.getElementById("MFB"+newbox_id);
      myPopUp(event,CurrentB);
  }
  else{
    nbxalert('Error','Please select a box in which to add a new box','Red')
  }
}

function addnewboxoutside(){
  
  if(CurrentP){
    if(CurrentP.id!='Group'){
      //console.log("Last_ID before "+Last_ID)
      CurrentP.insertAdjacentElement('afterend', createbox(''))
      //console.log("Last_ID after "+Last_ID)
      
      newbox_id=Last_ID-1;
      CurrentB=document.getElementById("MFB"+newbox_id);
      //console.log("CurrentB "+CurrentB.id)
      
      myPopUp(event,CurrentB);
      } 
    else{
      nbxalert('Error','You cannot add a box adjacent to the main box. Please select a box within the main box','Red')
    }
  }
  else{
    nbxalert('Error', "Please select a box to add a new box adjacent to it",'Red')
  }  
  

}


function moveboxforward(){
  if(CurrentP){
    if(CurrentP.id!="Group"){
      //console.log(typeof CurrentP.nextElementSibling + "/" +CurrentP.nextElementSibling.id)
      if(typeof CurrentP.nextElementSibling!== "undefined" && CurrentP.nextElementSibling!==null){
        
        
        CurrentP.nextElementSibling.insertAdjacentElement('afterend', CurrentP)
        shownohiddenboxes(CurrentP);
      }
      else{
        nbxalert("Error","The selected box cannot be moved further.","red")
      }
    }
    else{
      nbxalert("Error","The main box cannot be moved","Red")
    }  
  }
  else{
    nbxalert("Error", "Please select a box to move.","red")
  }  
}

function moveboxbackward(){

  if(CurrentP){
    if(CurrentP.id!="Group"){
      //console.log("tag"+CurrentP.tagName+" previous "+CurrentP.previousElementSibling.tagName)
      if(typeof CurrentP.previousElementSibling !== "undefined" && CurrentP.previousElementSibling !== null){
        if(CurrentP.previousElementSibling.tagName!="P"){
          CurrentP.previousElementSibling.insertAdjacentElement('beforebegin', CurrentP);
          shownohiddenboxes(CurrentP);
        }
        else{
          nbxalert("Error","The selected box cannot be moved backward any further.","red")
        }
      }
      else{
        nbxalert("Error","The selected box cannot be moved backward any further.","red");
        return;
      }
    }
    else{
      nbxalert("Error","The main box cannot be moved","red");
      return;
    }
  }
  else{
    nbxalert("Error","Please select a box to move","red")
  }  

} 

function showhideall(){

  no_siblings=CurrentB.parentElement.childElementCount;
  //tipcircle=elem("tipcircle")
  no_hidden=0
  for(i=1;i<no_siblings;i++){
    if(CurrentB.parentElement.children[i].style.display=="none"){
      no_hidden+=1;
    }
  }
  if(no_hidden>0){
    var action="Show"}
  else{
    action="Hide"
  } 
//console.log("Action "+action)
showhidechildren(CurrentP,action);

}

function hidebox(ele){
  //console.log(ele.id);
  //console.log(ele.id=="Group");
  //console.log(!ele);
  //console.log(CurrentP.id)
  
  if(!ele){
    nbxalert("Error","Please select a box to hide","orange")
    return;
  }
  else{
    if(ele.id=="Group"){
      nbxalert("Violation","The main nested box cannot be hidden","red")
      return;
    }
    else{
      if(ele.style.display!="none"){
        ele.setAttribute("predisplay",computestyle(ele,"display"));
        ele.style.display="none";
        hideicons();
      }
      else{
        if(ele.getAttribute("predisplay") && ele.getAttribute("predisplay")!="none"){
        ele.style.display=ele.getAttribute("predisplay");
        //alert("I am here");
      }
    }
  }
}
}

function showhidechildren(CurrentBox,action){
  if(CurrentBox.tagName !="P"){
  //console.log("I am here"+CurrentBox.innerHTML)
  for(var i=1;i<CurrentBox.children.length;i++){
    //console.log("i"+i+":"+CurrentBox.children[i].innerHTML)
    if(CurrentBox.children[i].id && CurrentBox.children[i].id.startsWith("MFB")){
      //alert(CurrentBox.children[i].style.display)
      if(CurrentBox.children[i].style.display=="none"){
        if(action=="Show"){
            console.log("show "+CurrentBox.children[i].getAttribute("predisplay"))
            CurrentBox.children[i].style.display=CurrentBox.children[i].getAttribute("predisplay");
          
        }
      }  
      else{
        if(action=="Hide"){ 
          //alert("before:"+CurrentBox.children[i].style.display)
          CurrentBox.children[i].setAttribute("predisplay",CurrentBox.children[i].style.display)
          console.log("hide "+CurrentBox.children[i].getAttribute("predisplay"))
           
          CurrentBox.children[i].style.display = "none";
          //alert("after:"+CurrentBox.children[i].style.display)
        }
      }
      if(CurrentBox.children[i].childNodes.length){
        
        showhidechildren(CurrentBox.children[i],action);
      }
    }  
  }
}
  
}




function selectbold(){
  if(!CurrentB){
    nbxalert("Error","Please select a box","red");
    return;
  }  
    if(CurrentB.style.fontWeight=="normal"){
      CurrentB.style.fontWeight="bold";
    }
    else{
      CurrentB.style.fontWeight="normal";
    }
}  


function selecttextdecoration(){
  if(!CurrentB){
    nbxalert("Error","Please select a box","red");
    return;
  }
  switch(CurrentB.style.textDecoration){
    case "none":
      x="underline";
      break;
    case "underline":
      x="line-through";
      break;
    case "line-through":
      x="overline";
      break;
    case "overline":
      x="none";
      break;
    default:
      x="none";
  }      
    CurrentB.style.textDecoration=x;
  
}



function selectitalic(){
  if(!CurrentB){
    nbxalert("Error","Please select a box","red");
    return;
  }
  if(CurrentB.style.fontStyle=="normal"){
    CurrentB.style.fontStyle="italic";
  }
  else{
    CurrentB.style.fontStyle="normal";
  }
}  




function selectfont(){
  optionlist.style.width=narrow;
  //optionlist > fontitemdiv (optionitem)>fontitem 
  if(!CurrentP){
    nbxalert("Error","Please select a box","red");
    return;
  }
  if(typeof fontitemdiv == "undefined"){
    fontitemdiv=document.createElement("div");
    optionlist.appendChild(fontitemdiv);
  
    //fontitemdiv.style.backgroundColor="white";
    fontitemdiv.id="fontitemdiv";
    fontitemdiv.className="optionitem";
    addsection(fontitemdiv,"Load new fonts "+showi("loadfont")+":")
    xfts=setvalue("data_xfonts","");

    addsection(fontitemdiv,"<input type='text' id='fonts'  onchange=updfont(this.value,selectfont) value='"+xfts+"'>")

  }
   
  for(i=0;i<fonttype.length;i++){ // create array of fonts. fonttype is pre-loaded in nstdbxs-data.js
    fontitem=document.createElement("div");
    fontitem.id="fontitem";
    fontitem.innerHTML=fonttype[i];
    fontitem.style.fontFamily=fonttype[i];
    
    fontitem.onclick=function(){  // when font is selected, update the currentBox, menu and close optionlist
      CurrentB.style.fontFamily=this.innerHTML;
      CurrentB.parentElement.style.fontFamily=this.innerHTML;     
    }
    fontitemdiv.appendChild(fontitem);
    
  }
  elem("fonts").value="";
  olhdiv1.innerHTML=computestyle(CurrentB,"font-family");
  olhdiv1.style.fontFamily=computestyle(CurrentB,"font-family");
  
  setoptionposition(); // position optionlist right below the font item in menu
  //olhdiv1.innerHTML="Font Selection"
  show(optionlist)
  show(fontitemdiv)
  show(optionlistheader,"flex")
  setoptionlistwidth();
  
  //optionlist.style.maxHeight="300px" // list of fonts is long - limit height of optionlist - can scroll within it
  //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  

}  
level=0
box_with_text=[]

function importHTML(ev){
  
  if(typeof importURLdiv == "undefined"){

    importURLdiv=document.createElement("div");
    optionlist.appendChild(importURLdiv);
    importURLdiv.innerHTML="URL:"
    importURLname=document.createElement("input")
    importURLdiv.appendChild(importURLname);
    importURLname.type="text"
    importURLname.size="100"
    importURLaction=document.createElement("div")
    importURLdiv.appendChild(importURLaction);
    importURLaction.innerHTML="Import HTML"
  }

  /*
  inputHTML=document.createElement("div");
  inputHTML.id="inputHTML";
  document.body.appendChild(inputHTML);
  hide(inputHTML);
  */

  importURLaction.onclick=function(){
    console.log("I am here");
    tempIframe=document.createElement("iframe")
    tempIframe.src=importURLname.value
    tempIframe.id="tempIframe"
    document.body.appendChild(tempIframe);
    //console.log(window.frames[0].document.body.innerHTML)
    console.log(tempIframe.contentDocument.body.innerHTML)
  }  
/*
  tempHTMLta=document.createElement("textarea")
  tempHTMLta.rows="10"
  tempHTMLta.cols="300"
  tempHTMLdiv.appendChild(tempHTMLta)
  tempHTMLta.placeholder="Paste the html text here";
  tempHTMLta.onchange=function(){
    inputHTML.innerHTML=this.value;
    
    hide(tempHTMLdiv);
    alert("HTML text ingested");
    console.log(inputHTML.innerHTML)
    processHTML(inputHTML,level);
    console.log("Post Processing:")
    console.log(inputHTML);
    show(inputHTML)
    
    restoreDIV("Group");
    //show(inputHTML)
  }
*/  
  setoptionposition("",ev)
  show(importURLdiv);
  show(optionlist);
  //tempHTMLdiv.style.top="300px"
  //tempHTMLdiv.style.left="500px"
  //show(tempHTMLdiv);
}

item=0
//ancestor="["+level+"-"+item+"]"
// At Level L, there are N nodes. Each can have X nodesentity_no=0
dash="-"
taglist=[]
k=0;
tgtHTML="";
function processHTML(elemnt,tgtbox){
  cbox=0;
  switch(elemnt.tagName){
    case "NOSCRIPT":
    case "SCRIPT":
    case "HEADER":
    case "META":
    case "LINK":
    case "STYLE": 
    case "svg": 
    case "LABEL":
      elemnt.parentNode.removeChild(elemnt);
      elemnt.id="R"+k
      //elemnt.remove();
      break;

    case "A":
    case "IMG" :
    case "SPAN" :
    case "I" :
    case "BUTTON" :
    case "INPUT" :
    case "IFRAME" :
    case "SMALL" :
    case "EM" :    
      //x[i].insertAdjacentElement("afterend", ElementStore)
      // create new box
      // wrap element inside p element of box
      // append new box next to element
      // delete element
      newdivbox=createbox("");
      //console.log("new div box "+ newdivbox.innerHTML);
      newdivbox.children[0].innerHTML=elemnt.outerHTML;
      //console.log("new div box with imported content "+ newdivbox.children[0].innerHTML);
      //tgtHTML+=elemnt.outerHTML

      //elemnt.insertAdjacentElement("afterend",newdivbox);
      tgtbox.parentElement.appendChild(newdivbox);
      cbox=1;
      //elemnt.parentNode.removeChild(elemnt);
      //elemnt.id="R"+k
      //elemnt.remove();
      ;
      break;

    case "DIV":
        tgtbox.parentElement.appendChild(createbox(''));
        elem("MFB"+(Last_ID-1)).innerHTML=elemnt.innerHTML;
        cbox=1;
        //elemnt.id="MFB"+Last_ID;

        //tgtHTML+=elemnt.innerHTML;
        break;

    case "P":
        if(elemnt.parentElement.tagName!="DIV"){
          newdivbox=createbox("");
          //console.log("P:new div box "+ newdivbox.innerHTML);
          
          newdivbox.children[0].innerHTML=elemnt.innerHTML;
          tgtbox.parentElement.appendChild(newdivbox);
          cbox=1;
      
          //console.log("P:new div box with imported content "+ newdivbox.children[0].innerHTML);
          //elemnt.insertAdjacentElement("afterend",newdivbox);

          //elemnt.parentNode.removeChild(elemnt);
          //elemnt.id="R"+k
          //elemnt.remove(); 
                        
        }
        else{
          tgtbox.parentElement.appendChild(createbox(''))
          elem("MFB"+(Last_ID)).innerHTML=elemnt.innerHTML
          cbox=1;
          //Last_ID++;
          //elemnt.id="MFB"+Last_ID;
        
        }
        break;

   // block elements //
    case "ADDRESS":
    case "ARTICLE":
    case "ASIDE":
    case "BLOCKQUOTE":
    case "DETAILS":
    case "DIALOG":
    case "DD":
    case "DL":
    case "DT":
    case "FIELDSET":
    case "FIGCAPTION":
    case "FIGURE":
    case "FOOTER":
    case "FORM":
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
    case "HEADER":
    case "HGROUP":
    case "HR":
    case "LI":
    case "MAIN":
    case "NAV":
    case "OL":
    case "PRE":
    case "SECTION":
    case "TABLE":
    case "UL":

      /* replace tag with DIV*/
      newdivbox=createbox("");
      //console.log("Block : new div box "+ newdivbox.innerHTML);
      //console.log("newdivbox P:"+newdivbox.children[0].innerHTML);
      newdivbox.children[0].innerHTML=elemnt.innerHTML;
      //console.log("Block : new div box with imported content "+ newdivbox.children[0].innerHTML);
      //elemnt.insertAdjacentElement("afterend",newdivbox);
      tgtbox.parentElement.appendChild(newdivbox)
      cbox=1;
         

      //elemnt.parentNode.removeChild(elemnt);
      //elemnt.id="R"+k;
      //elemnt.remove(); 
      //i=i+2;        
      break;
    case "HTML":
    case "HEAD":
    case "BODY" :  
      break;  
    default:
      console.log("TagName "+TagName+" not processed");
      }

  console.log(k+"-"+elemnt.tagName+"-"+elemnt.nodeType+(cbox==1 ? Last_ID-1 : ""));
  k++;
      

  for(let i=0;i<elemnt.children.length;i++){
    
    console.log(elemnt.children[i].innerHTML)
    tgtbox.appendChild(createbox(''));
    processHTML(elemnt.children[i],elem('MFB'+(Last_ID-1)));

  }
   return;

}


function xprocessHTML(ele){
 //elem("ihtml").innerHTML=ele.innerHTML;
  //x=document.getElementsByTagName("*");
  for(let i=0;i<ele.children.length;i++){
    console.log("i -> x length:"+i+"->"+ele.children.length+"->"+ele.children[i].tagName)
  
    
    switch(ele.children[i].tagName){
        case "NOSCRIPT":
        case "SCRIPT":
        case "HEADER":
        case "META":
        case "LINK":
        case "STYLE": 
        case "svg": 
          ele.children[i].remove();
          break;

        case "A":
        case "IMG" :
        case "SPAN" :
        case "I" :
        case "BUTTON" :
        case "INPUT" :
        case "IFRAME" :
        case "SMALL" :
        case "EM" :    
          //x[i].insertAdjacentElement("afterend", ElementStore)
          // create new box
          // wrap element inside p element of box
          // append new box next to element
          // delete element
          newdivbox=createbox("");
          //console.log("new div box "+ newdivbox.innerHTML);
          newdivbox.children[0].innerHTML=ele.children[i].outerHTML;
          //console.log("new div box with imported content "+ newdivbox.children[0].innerHTML);
          ele.children[i].insertAdjacentElement("afterend",newdivbox);
          ele.children[i].remove();
          ;
          break;

        case "DIV":
            Last_ID++;
            ele.children[i].id="MFB"+Last_ID;
            break;

        case "P":
            if(ele.children[i].parentElement.tagName!="DIV"){
              newdivbox=createbox("");
              //console.log("P:new div box "+ newdivbox.innerHTML);
              
              newdivbox.children[0].innerHTML=ele.children[i].innerHTML;
              //console.log("P:new div box with imported content "+ newdivbox.children[0].innerHTML);
              ele.children[i].insertAdjacentElement("afterend",newdivbox);
              ele.children[i].remove(); 
                            
            }
            else{
              Last_ID++;
            ele.children[i].id="MFB"+Last_ID;
            
            }
            break;

       // block elements //
        case "ADDRESS":
        case "ARTICLE":
        case "ASIDE":
        case "BLOCKQUOTE":
        case "DETAILS":
        case "DIALOG":
        case "DD":
        case "DL":
        case "DT":
        case "FIELDSET":
        case "FIGCAPTION":
        case "FIGURE":
        case "FOOTER":
        case "FORM":
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
        case "HEADER":
        case "HGROUP":
        case "HR":
        case "LI":
        case "MAIN":
        case "NAV":
        case "OL":
        case "PRE":
        case "SECTION":
        case "TABLE":
        case "UL":

          /* replace tag with DIV*/
          newdivbox=createbox("");
          //console.log("Block : new div box "+ newdivbox.innerHTML);
          //console.log("newdivbox P:"+newdivbox.children[0].innerHTML);
          newdivbox.children[0].innerHTML=ele.children[i].innerHTML;
          //console.log("Block : new div box with imported content "+ newdivbox.children[0].innerHTML);
          ele.children[i].insertAdjacentElement("afterend",newdivbox);
          ele.children[i].remove(); 
          //i=i+2;        
          break;
        case "HTML":
        case "HEAD":
        case "BODY" :  
          break;  
        default:
          console.log("TagName "+TagName+" not processed");
          
    }
    processHTML(ele.children[i]);
  }
  return;
  //elem("ihtml").style.display="block";
  //console.log(x.outerHTML)
  //CurrentP.innerHTML=x.outerHTML;
}








function show(ele,mode){
  if(mode==null){
    if(ele.getAttribute("predisplay") && ele.getAttribute("predisplay")!="none"){
      ele.style.display=ele.getAttribute("predisplay");
    }
    else{  
      ele.style.display="block";
    }
  }  
  else{
    ele.style.display=mode;
  }
}
   
function resetAllWidth(){
  w=document.getElementsByTagName("div")
  for(i=0;i<w.length;i++){
    w[i].style.maxwidth="inherit";
    w[i].style.resize="none";
    console.log("reset width of "+w[i].id)
  }
  

}  

/* not required 10/4/2021
function changeLevel(){
  newglobalLevel=prompt("Select new level 0-3 ",globalLevel);
  if(newglobalLevel!=globalLevel){
    globalLevel=newglobalLevel;
  buildmenu();
  }
}
*/

function showInfo(ev){
optionlist.style.width=wide;
/* signed in user */
CurrentPerson="";
if(firebase.auth().currentUser){
  if(firebase.auth().currentUser.isAnonymous){
    CurrentPerson="anonymous";
  }
  else{
    CurrentPerson=firebase.auth().currentUser.email
  }
}
else{
  CurrentPerson="not signed in"
}
if(typeof persondiv == "undefined"){
  persondiv=document.createElement("DIV");
  optionlist.appendChild(persondiv) ; 
}
persondiv.innerHTML="";

persondiv.style.padding="5px";
persondiv.style.display="grid";
persondiv.style.gridTemplateColumns="auto auto";
persondiv.style.gridRowGap="10px"
persondiv.style.alignItems="center"
addsection(persondiv,"User:"+showi("user")+CurrentPerson)

persondiv.innerHTML+="<div style='display:flex;border-bottom:0px;flex-direction:row;justify-content:space-around;'><div class='nbxbutton'  onclick='loginuser(event)'>Sign in</div><div class='nbxbutton'  onclick='logout()'>Sign out</div></div>"
addsection(persondiv,"Viewport Width/Height :")
addsection(persondiv,window.innerWidth+"/"+window.innerHeight)
addsection(persondiv,"No of characters :")
addsection(persondiv,elem("Group").outerHTML.length)


addsection(persondiv,"Current Nested Box :"+showi("currnbox"))
addsection(persondiv,CurrentWebPage==""?"Title not defined":CurrentWebPage)
addsection(persondiv,"Temporary Storage:"+showi('tempstorage'))
if(typeof ElementStore != "undefined" && ElementStore !== null){
  storagetext=ElementStore.outerHTML
}
else{
  storagetext="Empty"
}
addsection(persondiv,storagetext)

  


xfts=setvalue("data_xfonts","")
//addsection(persondiv,"Load fonts :")
//addsection(persondiv,"<input type='text' id='fonts'  onchange=updfont(this.value) value='"+xfts+"'>")

if(!window.matchMedia("(max-width: 700px)").matches){
addsection(persondiv,"Allow direct edit ?"+showi('directedit'))
addsection(persondiv,"<input type='text' id='dde' value="+defDirectEdit+" onchange={defDirectEdit=this.value;storeingroup('data_directedit',this.value)}>")
addsection(persondiv,"Show icons near box ?"+showi('showicons'))
addsection(persondiv,"<input type='text' id='sicons' value="+showIcons+" onchange={showIcons=this.value;storeingroup('data_showicons',this.value)}>")
addsection(persondiv,"Show level and siblings ?"+showi('showlevel'))
addsection(persondiv,"<input type='text' id='lvlsib' value="+showLvl+" onchange={showLvl=this.value;storeingroup('data_showlvl',this.value)}>")
}
//addsection(persondiv,"Position of Edit window ?")
//addsection(persondiv,"<span class='nbxbutton' onclick={seteditboxpos('top')}>top</span><span class='nbxbutton' onclick={seteditboxpos('mid')}>mid</span><span class='nbxbutton' onclick={seteditboxpos('bot')}>bot</span>")
addsection(persondiv,"Default parameters of new boxes :"+showi('defnewbox'))
addsection(persondiv,"")
addsection(persondiv,"Text in new box"+showi("textnewbox"))
addsection(persondiv,"<input type='text' value='"+NewBoxPrefix+"' onchange={NewBoxPrefix=this.value;storeingroup('data_newboxprefix',this.value)}>")

dfp=setvalue("data_fontsize",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-font-size'))


dff=setvalue("data_fontfamily",getComputedStyle(document.documentElement).getPropertyValue('--nbx-font-family'))

addsection(persondiv,"<label for='dff'>Font family:</label>")

addsection(persondiv,"<select onchange=setroot('ff',this.value) id='dff' value='"+dff+"'>"+fontoptions+"</select>")

indexselected=0;
for(i=0;i<=fonttype.length;i++){
  if(fonttype[i]==dff){
    indexselected=i;
    break;
    }
    
}
elem('dff').selectedIndex=indexselected;

addsection(persondiv,"Font size (#rem or % parent):"+showi('newfontsize'))
addsection(persondiv,"<input type='text' style='width:50px' value="+dfp+" onchange=setroot('fp',this.value)>")

dbd=setvalue("data_border",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-border'))
addsection(persondiv,"Border width:")
addsection(persondiv,"<input type='text' style='width:50px' value="+dbd+" onchange=setroot('bd',this.value)>")

dbs=setvalue("data_borderstyle",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-border-style'))
addsection(persondiv,"Border style:")
//persondiv.innerHTML+="<input type='text' style='width:50px' value="+dbs+" onchange=setroot('bs',this.value)>"
addsection(persondiv,"<select onchange={setroot('bs',this.value)} value="+dbs+">"+borderoptions+"</select>")

dbc=setvalue("data_bordercolour",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-border-color'))
addsection(persondiv,"Border colour:")
addsection(persondiv,"<input type='text' style='width:50px' value="+dbc+" onchange=setroot('bc',this.value)>")

dbr=setvalue("data_borderradius",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-border-radius'))
addsection(persondiv,"Border radius:")
addsection(persondiv,"<input type='text' style='width:50px' value="+dbr+" onchange=setroot('br',this.value)>")

dpd=setvalue("data_padding",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-padding'))
addsection(persondiv,"Padding:")
addsection(persondiv,"<input type='text' style='width:50px' value="+dpd+" onchange=setroot('pd',this.value)>")

dmg=setvalue("data_margin",getComputedStyle(document.documentElement).getPropertyValue('--nbx-def-margin'))
addsection(persondiv,"Margin:")
addsection(persondiv,"<input type='text' style='width:50px' value="+dmg+" onchange=setroot('mg',this.value)>")

setoptionposition("",ev)
olhdiv1.innerHTML="Edit/view session config"+showi("websession")
  
show(persondiv,"grid");
show(optionlist);
show(optionlistheader,"flex");
setoptionlistwidth();
//optionlist.style.maxHeight="300px"
//addclosebutton(optionlist,"topleft",closeicon)  
//optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
//console.log("OSW:"+optionlistheader.style.width+"/"+computestyle(optionlist,"width"))
  

}


function showi(helpkey){
  txt="<span style='color:black;background-color:yellow;font-size:9px;cursor:pointer' onclick={showhelp(event,'"+helpkey+"')}>&#9432</span>"
  return(txt);
}

function showhelp(event,helpkey){
  if(typeof helpboxdiv=="undefined"){
    helpboxdiv=document.createElement("div")
    document.body.appendChild(helpboxdiv);
    helpheader=document.createElement("div")
    helpheader.style.backgroundColor="rgb(83,207,218)"
    helpheader.innerHTML="nstdBoxes info"
    helpheader.style.textAlign="center";
    
    helpheader.style.position="fixed";
    helpboxdiv.appendChild(helpheader);
    helpboxtext=document.createElement("div");
    helpboxdiv.appendChild(helpboxtext);
    helpboxdiv.style.display="none";

    helpboxdiv.style.position="fixed";
    helpboxdiv.style.zIndex=9;
    helpboxdiv.style.overflow="auto";
    helpboxdiv.style.minWidth="20%"
    helpboxdiv.style.maxWidth="40%";
    helpboxdiv.style.maxHeight="20%";
    helpboxdiv.style.backgroundColor="#EFF2E6";
    helpboxdiv.style.fontSize="10px";
    helpboxdiv.style.border="1px solid grey";
    helpboxtext.style.padding="3px";
    helpboxtext.style.paddingTop="15px";
    
    helpboxdiv.style.borderRadius="3px";
    helpboxdiv.style.boxShadow="0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)"

  

  }
  helpboxtext.innerHTML=helptext[helpkey];
  console.log({helpboxdiv})
  console.log({event})
  
  helpboxdiv.style.top=(event.clientY+10)+"px";
  helpboxdiv.style.left=event.clientX+"px";
  console.log({helpboxdiv})
  
  show(helpboxdiv);
  helpheader.style.width=(parseInt(computestyle(helpboxdiv,"width").split("px")[0])-2)+"px";
  
  //helpboxtext.style.width=helpboxdiv.style.width;
  //show(helpheader)
  helpboxdiv.onclick=function(){
    hide(helpboxdiv);
  }


}



function showoptionlist(){
  show(optionlist);
  optionlist.style.maxHeight="300px"
  //addclosebutton(optionlist,"topleft",closeicon)  
  optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  //console.log("OSW:"+optionlistheader.style.width+"/"+computestyle(optionlist,"width"))
  
}

function updfont(fontlist,callback){
  elem("Group").setAttribute("data_xfonts",fontlist);
  linkfonts(callback);

}

function resetdef(){
  //console.log("Resetting def...")
  document.documentElement.style.setProperty('--nbx-rem-size',setvalue("data_remsize","16px"));
  document.documentElement.style.setProperty('--nbx-font-family',setvalue("data_fontfamily","Roboto"));
  document.documentElement.style.setProperty('--nbx-def-font-size',setvalue("data_fontsize","1rem"));
  document.documentElement.style.setProperty('--nbx-def-padding',setvalue("data_padding","3px"));
  document.documentElement.style.setProperty('--nbx-def-margin',setvalue("data_margin","2px"));
  document.documentElement.style.setProperty('--nbx-def-border',setvalue("data_border","1px"));
  document.documentElement.style.setProperty('--nbx-def-border-color',setvalue("data_bordercolour","black"));
  document.documentElement.style.setProperty('--nbx-def-border-style',setvalue("data_borderstyle","solid"));
  document.documentElement.style.setProperty('--nbx-def-border-radius',setvalue("data_borderradius","3px"));
  document.documentElement.style.setProperty('--nbx-def-bullet-colour',setvalue("data_bulletcolour","red"));
  document.documentElement.style.setProperty('--nbx-view-width',setvalue("data_viewwidth","100vw"));
  document.documentElement.style.setProperty('--nbx-circle-width',setvalue("data_circlewidth","30vw"));
  document.documentElement.style.setProperty('--nbx-circle-height',setvalue("data_circleheight","30vw"));
  document.documentElement.style.setProperty('--nbx-circle-top',setvalue("data_circletop","20vh"));
  document.documentElement.style.setProperty('--nbx-circle-left',setvalue("data_circleleft","30vw"));
  document.documentElement.style.setProperty('--nbx-circle-radius',setvalue("data_circleradius","15vw"));
  document.documentElement.style.setProperty('--nbx-circle-adj-top',setvalue("data_circleadjtop","0.15"));
  document.documentElement.style.setProperty('--nbx-circle-adj-left',setvalue("data_circleadjleft","0.80"));
  document.documentElement.style.setProperty('--nbx-line-height',setvalue("data_lineheight","1.5"));
  //console.log({defstyle})
  for(i=0;i<9;i++){
    for(j=0;j<defstyle.length;j++){
    rvar="--nbx-"+defstyle[j][1]+"-l"+i;
    dvar="data_"+defstyle[j][1]+"_l"+i;
    defvalue=getComputedStyle(document.documentElement).getPropertyValue(rvar);
    
    //console.log(rvar+" default value "+defvalue)
    //console.log(dvar+" NB value "+elem("Group").getAttribute(dvar))
    if(elem("Group").getAttribute(dvar)!=null){

      document.documentElement.style.setProperty(rvar,elem("Group").getAttribute(dvar))
      }
    }
    //console.log("new default value "+getComputedStyle(document.documentElement).getPropertyValue(rvar))
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
   (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
    document.documentElement.style.setProperty('--nbx-bga','scroll'); 
}
  
  
  
  
  defDirectEdit=setvalue("data_directedit","No") //contentEditable=false
  NewBoxPrefix=setvalue("data_newboxprefix","Box id:")
  editboxpos=setvalue("data_editboxpos","top");
  showIcons=setvalue("data_showicons","Yes");
  showLvl=setvalue("data_showlvl","No");



  linkfonts();
}

function setvalue(data_value,css_value){
  if(elem("Group").getAttribute(data_value)!=null){
    return(elem("Group").getAttribute(data_value))
  }
  else{
    return(css_value)
  }
}


function storeingroup(data_value,data){
  elem("Group").setAttribute(data_value,data);
}

function addsection(ele,txt){
  tempdiv=document.createElement("div");
    
  ele.appendChild(tempdiv);
  tempdiv.innerHTML=txt;
}

function setroot(prop,newvalue){
  switch(prop){
    case "fs":
      document.documentElement.style.setProperty('--nbx-rem-size', newvalue)
      storeingroup("data_remsize",newvalue)
      break;
    case "ff":  
      document.documentElement.style.setProperty('--nbx-font-family', newvalue)
      storeingroup("data_fontfamily",newvalue)
      
    break;
    case "fp":  
      document.documentElement.style.setProperty('--nbx-def-font-size', newvalue)
      storeingroup("data_fontsize",newvalue)
      
      break;
    case "pd":  
      document.documentElement.style.setProperty('--nbx-def-padding', newvalue)
      storeingroup("data_padding",newvalue)
      
      break;
    case "mg":  
      document.documentElement.style.setProperty('--nbx-def-margin', newvalue)
      storeingroup("data_margin",newvalue)
      
      break;
    case "bd":  
      document.documentElement.style.setProperty('--nbx-def-border', newvalue)
      storeingroup("data_border",newvalue)
      
      break;
    case "bs":  
      document.documentElement.style.setProperty('--nbx-def-border-style', newvalue)
      storeingroup("data_borderstyle",newvalue)
      
      break;
    case "bc":
      document.documentElement.style.setProperty('--nbx-def-border-color', newvalue)
      storeingroup("data_bordercolour",newvalue)
      
      break;
    case "br":
      document.documentElement.style.setProperty('--nbx-def-border-radius', newvalue)
      storeingroup("data_borderradius",newvalue)
      
      break;
    
                                    
  }
}

function defnbxstyle(){
optionlist.style.width=narrow;
if(typeof nbxstylediv=="undefined"){

  nbxtitlediv=document.createElement("div");
  optionlist.appendChild(nbxtitlediv)
  nbxtitlediv.innerHTML='[To use these styles, assign the main nested box to the "mlevel" class]'
  nbxtitlediv.style.padding='1rem';
  nbxtitlediv.style.textAlign='center';
  nbxstylediv=document.createElement("div")
  nbxstylediv.style.padding="5px";
  nbxstylediv.style.marginLeft="2rem";
  
  nbxstylediv.style.display="grid";
  nbxstylediv.style.gridTemplateColumns="auto auto";
  nbxstylediv.style.gridRowGap="10px"
  nbxstylediv.style.alignItems="center"
  
  optionlist.appendChild(nbxstylediv)
  //nbxstylediv.appendChild(nbxtitlediv)
  //nbxtitlediv.style.gridColumnStart="span 2";
  //nbxtitlediv.style.gridColumnEnd=2;
  //addsection(nbxstylediv,"[To use these styles,")
  //addsection(nbxstylediv,"assign box to 'mlevel' class]")
  
  
optiontext="<select onchange=setstylelvl(this.value) id='nbxlvl' value=0>";
optiontext+="<option value=0>0</option>";
optiontext+="<option value=1>1</option>";
optiontext+="<option value=2>2</option>";
optiontext+="<option value=3>3</option>";
optiontext+="<option value=4>4</option>";
optiontext+="<option value=5>5</option>";
optiontext+="<option value=6>6</option>";
optiontext+="<option value=7>7</option>";
optiontext+="<option value=8>8</option>";

optiontext+="</select>"
addsection(nbxstylediv,"<label for='nbxlvl'>Select level:</label>"+optiontext)

addsection(nbxstylediv,"")

}
setoptionposition();
show(optionlist);
show(nbxstylediv);
show(nbxtitlediv);

  olhdiv1.innerHTML="Define styles for L0 to L8"
  
show(optionlistheader,"flex");
setoptionlistwidth();  
  
  
  

}

function setstylelvl(lvl){
  //console.log("L"+lvl)
  if(typeof nbxstylelvldiv=="undefined"){
    nbxstylelvldiv=document.createElement("div");
    nbxstylelvldiv.style.padding="5px";
    nbxstylelvldiv.style.display="grid";
    nbxstylelvldiv.style.gridTemplateColumns="auto auto";
    nbxstylelvldiv.style.gridRowGap="10px"
    nbxstylelvldiv.style.alignItems="center"
    nbxstylelvldiv.id="Lvl"+lvl
    nbxstylediv.appendChild(nbxstylelvldiv);


  } 
  nbxstylelvldiv.innerHTML="";
  //console.log({defstyle})
  for(i=0;i<defstyle.length;i++){
    //console.log("i"+i+":"+defstyle[i][0])
    //addsection(nbxstylelvldiv,defstyle[i][0])
    tempdiv=document.createElement("div");
    nbxstylelvldiv.appendChild(tempdiv);
    tempdiv.innerHTML=defstyle[i][0];
    tempdiv.style.fontWeight="bolder"

    ivalue=getComputedStyle(document.documentElement).getPropertyValue("--nbx-"+defstyle[i][1]+"-l"+lvl)
    itype=defstyle[i][2]
    istyle=defstyle[i][3]
    itext="<input type='"+itype+"' size='15' style='"+istyle+":"+ivalue+";' value='"+ivalue+"' onchange={updstylelvl('"+lvl+"','"+defstyle[i][1]+"',this.value)}>"
    //console.log(itext)
    //addsection(nbxstylelvldiv,itext)
    tempdiv=document.createElement("div");
    nbxstylelvldiv.appendChild(tempdiv);
    tempdiv.innerHTML=itext;
    tempdiv.style.marginBottom="1rem";

  }
  //console.log({nbxstylelvldiv})
  show(nbxstylelvldiv)
  
}

function updstylelvl(lvl,styl,val){
  console.log("lvl "+lvl)
  document.documentElement.style.setProperty('--nbx-'+styl+'-l'+lvl, val)
  storeingroup("data_"+styl+"_l"+lvl,val)         
}







function seteditboxpos(para){
  editboxpos=para;
  storeingroup("data_editboxpos",para);
  switch(para){
    case "top":
      elem("fixedbanner").style.top="2vh";
      elem("fixedbanner").style.position="fixed";
      elem("fixedbanner").style.zIndex="9";
      
      
      break;
    case "mid":
      elem("fixedbanner").style.top="50vh";
      elem("fixedbanner").style.position="fixed";
      elem("fixedbanner").style.zIndex="9";
      
      break;
    case "bot":
      elem("fixedbanner").style.top="80vh";
      elem("fixedbanner").style.position="fixed";
      elem("fixedbanner").style.zIndex="9";
      
      break;

  }
}

// SET UP MENU

// Define array of arrays
menuitems=50
menuitem=[];
for (i=0;i<menuitem.length;i++){
  menuitem[i]=[];
}
// Initialise menu arrays
  menuitem[0]=menuitem["Font"]=["title","font family","selectfont()"]
  menuitem[1]=menuitem["FontSize"]=["format_size","font size","selectfontsize()"]
  menuitem[2]=menuitem["FontColor"]=["format_color_text","font color","selectfontcolor()"]
  menuitem[3]=menuitem["BackgroundColor"]=["format_color_fill","background colour","selectbgcolor()"]
  menuitem[4]=menuitem["Links"]=["insert_link","hyperlinks & images","setlinks(event)"]
  
  menuitem[5]=menuitem["Frame"]=["border_outer","border","setframe(event)"] //Border Padding Margin Radius
  menuitem[6]=menuitem["Shadow"]=["brightness_3","box shadow","setshadow()"]
  
  menuitem[7]=menuitem["Bold"]=["format_bold","bold","selectbold()"]
  menuitem[8]=menuitem["Italic"]=["format_italic","italic","selectitalic()"]
  menuitem[9]=menuitem["Decoration"]=["format_strikethrough","lines","selecttextdecoration()"]
  menuitem[10]=menuitem["TextAlign"]=["format_align_justify","align text","selecttextalignment()"]
  
  menuitem[11]=menuitem["CloneStyle"]=["content_copy","copy style","moveboxout('copy')"]
  menuitem[12]=menuitem["ApplyStyle"]=["highlight_alt","apply style to box","applyStyle(CurrentP,'solo')"]
  menuitem[13]=menuitem["StyleClass"]=["style","set style class","setstyleclass()"]
  
  menuitem[14]=menuitem["NewBoxInside"]=["picture_in_picture","add new box inside","addnewboxinside()"]
  menuitem[15]=menuitem["NewBoxNext"]=["grid_view","add new box by the side","addnewboxoutside()"]
  

  //menuitem[16]=menuitem["CopyBox"]=["content_copy","make a clone","cloneboxnext()"]
  menuitem[16]=menuitem["CopyBox"]=["content_copy","make a clone","moveboxout('copy')"]
  menuitem[17]=menuitem["CutBox"]=["shopping_cart","move box to storage","moveboxout('cut')"]
  menuitem[18]=menuitem["PasteBoxIn"]=["picture_in_picture_alt","move from storage into this","moveboxin()"]
  menuitem[19]=menuitem["PasteBoxNext"]=["dashboard_customize","move from storage next to this","pasteboxnext()"]
  
  
  
  menuitem[20]=menuitem["MoveBoxFwd"]=["arrow_forward","move box forward","moveboxforward()"]
  menuitem[21]=menuitem["MoveBoxBack"]=["arrow_back","move box backward","moveboxbackward()"]
  
  menuitem[22]=menuitem["Display"]=["view_quilt","display mode","setdisplaymode(event)"]
  //menuitem[28]=menuitem["ImportHTML"]=["input","import URL","importHTML(event)"]
  menuitem[28]=menuitem["ImportHTML"]=["input","import URL","importboxes('LoadBoxesFromDrive')"]
  
  menuitem[23]=menuitem["Visibility"]=["format_shapes","show/hide all","showhideall()"]
  
  menuitem[24]=menuitem["Import"]=["table_chart","Excel->Boxes","importboxes('ExcelToBoxes')"]
  menuitem[25]=menuitem["Tech"]=["settings","technicals","viewboxdetails()"]
  //menuitem[26]=menuitem["Search"]=["find_in_page","Style","selectStyle()"]
  menuitem[26]=menuitem["Search"]=["find_in_page","Search","newfindelements(event)"]
  menuitem[27]=menuitem["SessionDetails"]=["manage_accounts","current session","showInfo(event)"]
  menuitem[28]=menuitem["SignIn"]=["login","Sign In","loginuser()"]
  menuitem[29]=menuitem["SignOut"]=["logout","Sign Out","logout()"]
  menuitem[30]=menuitem["SaveLocal"]=["open_in_browser","save Nested Box in browser storage","saveinbrowser(event)"]
  menuitem[31]=menuitem["GetLocal"]=["browser_updated","load Nested Box from browser storage","showbrowserfiles(event)"]
  menuitem[32]=menuitem["SaveCloud"]=["cloud_upload","save Nested Box in the Cloud","saveincloud(event)"]
  menuitem[33]=menuitem["GetCloud"]=["cloud_download","download Nested Box from the Cloud","showcloudfiles(event,'rx')"]
  menuitem[34]=menuitem["InsertPage"]=["add_box","import Nested Box into selected box","filesrefreshed=false;showcloudfiles(event,'ri')"]
  menuitem[35]=menuitem["Share"]=["share","get Nested Box URL","shareboxes(event)"]
  menuitem[36]=menuitem["GetDrive"]=["file_download","load nested box from gDrive","importboxes('LoadBoxesFromDrive')"]
  menuitem[37]=menuitem["Feedback"]=["chat","provide feedback","givefeedback(event)"]
  menuitem[38]=menuitem["Repair"]=["build","repair box","editboxtext(event,CurrentP,'direct')"]
  menuitem[39]=menuitem["PostBox"]=["post_add","add box into Nested Box in the Cloud","editboxtext(event,CurrentP,'post')"]
  menuitem[40]=menuitem["SortBox"]=["sort_by_alpha","sort text","sortChildElements(CurrentP,'text')"]
  
  menuitem[41]=menuitem["HideBox"]=["visibility_off","hide box","hidebox(CurrentP)"]
  menuitem[42]=menuitem["Bullet"]=["format_list_bulleted","select bullet","selectbullet()"]
  menuitem[43]=menuitem["ApplyStyleAll"]=["flip_to_back", "apply style to boxes","applyStyle(CurrentP,'all')"]
  menuitem[44]=menuitem["SortBoxColour"]=["sort","sort colour","sortChildElements(CurrentP,'colour')"]
  menuitem[45]=menuitem["ShowOutline"]=["view_module","show box outlines","toggleoutline(CurrentP)"]
  menuitem[46]=menuitem["BackgroundImage"]=["image","background image","selectbgimage()"]
  menuitem[47]=menuitem["OpenInNew"]=["open_in_new","open in new window","openinnew(CurrentP)"]
  menuitem[48]=menuitem["InsertBox"]=["note_add","import nested box","importbox(event)"]
  menuitem[49]=menuitem["DefaultStyle"]=["design_services","Set multi-level styles","defnbxstyle()"]
  menuitem[50]=menuitem["Intro"]=["info","Introduction to nstdBoxes","window.open('https://nstdboxes.com?Gallery-intro')"]
  
  
  




function openinnew(ele){
  if(CurrentWebPage && ele){
    if(prompt("Open "+CurrentWebPage+"&"+ele.id+" in new window ?","Y")){
  window.open("https://nstdboxes.com?"+CurrentWebPage+"&"+ele.id);
    }
  }
  else{
    nbxalert("Error","Either main nested box not saved or box not selected","red");
  }

}


function buildmenu(){
menusection=[]
m=elem("menu");
//var menusection=["Box","Content","Font","Facade","Style","Content"]
menusection[0]=[]=menusection["User"]    =["I","N.png","Nested Box actions","Intro","SessionDetails","GetCloud","GetLocal","SaveCloud","SaveLocal","Share","Feedback"]
//menusection[1]=[]=menusection["WebPage"] =["web","Web Page actions","SaveLocal","SaveCloud","GetLocal","GetCloud","Share"]
menusection[1]=[]=menusection["Box"]    =["I","B.png","Box actions","NewBoxInside","NewBoxNext","CopyBox","CutBox","PasteBoxIn","PasteBoxNext","MoveBoxFwd","MoveBoxBack","SortBox","SortBoxColour","HideBox","Visibility","ShowOutline"]
menusection[2]=[]=menusection["Type"]   =["I","T.png","Typeface actions","Font","FontSize","FontColor","Bold","Italic","Decoration","TextAlign","Bullet"]
menusection[3]=[]=menusection["Style"] =["I","S.png","Box styling","BackgroundColor","BackgroundImage","Frame","Shadow","CloneStyle","ApplyStyle","ApplyStyleAll","DefaultStyle","StyleClass","Tech"]
menusection[4]=[]=menusection["Content"]=["I","C.png","Box links","Links","Import","PostBox","InsertPage","InsertBox","OpenInNew","Search","Repair"]


bigitem=[]
item=[]

for(i=0;i<menusection.length;i++){
  bigitem[i]=document.createElement("div")
  if(menusection[i][0]=="G"){
    bigitem[i].innerHTML="<p onmouseover='showtooltip(this.parentElement.tip,event)' onmouseleave='hide(tipdiv)' onclick='togglechild(this.parentElement)'><i class='material-icons-outlined'>"+menusection[i][1]+"</i></p>"
  }
  else{
    bigitem[i].innerHTML="<p onmouseover='showtooltip(this.parentElement.tip,event)' onmouseleave='hide(tipdiv)' onclick='togglechild(this.parentElement)'><img src='images/"+menusection[i][1]+"' width='32px'></p>"
  }
  
  bigitem[i].tip=menusection[i][2]
  
  //bigitem[i].onclick=function(){togglechild(this)}
  //bigitem[i].innerHTML=menusection[i][0];
  bigitem[i].classList.add("bigitem") 
   for(j=3;j<menusection[i].length;j++){
     //alert("Hello")
     //console.log("i:"+i+"j:"+j+":"+menusection[i][j])
     item[j]=document.createElement("div");
     item[j].classList.add("menuitem")
     //console.log(j+":"+item[j])
     item[j].innerHTML="<i class='material-icons-outlined'>"+menuitem[menusection[i][j]][0]+"</i>"

     item[j].func=menuitem[menusection[i][j]][2];
     item[j].label=menuitem[menusection[i][j]][0];
     item[j].tip=menuitem[menusection[i][j]][1];
     item[j].style.display="none";
     item[j].onmouseover=function(){
      showtooltip(this.tip,event);
      }
     item[j].onmouseleave=function(){hide(tipdiv);}
    
    if(menuitem[menusection[i][j]][2]!=null){
    item[j].onclick=function(){

      //alert("option clicked");
      eval(this.func);
      //event.stopPropagation();
      //this.style.opacity=0.5;
      }
    bigitem[i].appendChild(item[j]);  
    }
   }
   m.appendChild(bigitem[i])
}
hide(m);
}

function togglechild(ele){

x=ele.getElementsByTagName("DIV")
for(z=0;z<x.length;z++){
  if(x[z].style.display!="none"){
    x[z].style.display="none";
  }
  else{
    x[z].style.display="block";
  }
}  
}


function linkfont(newfont){
  temp=document.createElement("LINK");
  temp.rel="stylesheet" 
  temp.href="https://fonts.googleapis.com/css?family="+newfont;
  document.getElementsByTagName('head')[0].appendChild(temp)
  newstr=newfont.replace(/[+]/gi," ");
      
  fonttype.push(newstr);

  console.log(fonttype);
  return;
}

function linkfonts(callback){
  if(elem("Group").getAttribute('data_xfonts')!=null){
    console.log(elem("Group").getAttribute('data_xfonts'))
    x=elem("Group").getAttribute('data_xfonts').split(" ");
  
    for(i=0;i<x.length;i++){
      console.log(x[i]+fonttype.indexOf(x[i]))
      news=x[i].replace(/[+]/gi," ");
      console.log(news);
      //blue/g, "red");
      if(fonttype.indexOf(news)==-1){
        console.log('new font')
        linkfont(x[i]);
      }
    }
    hide(optionlist);
    callback();
  }
  else{
    console.log('data_xfonts not defined')
  }

}



function oldbuildmenu(){
  m=elem("menu");
  var menuoption=[]
  for(i=0;i<menuitems;i++){
    //console.log(i)
    menuoption[i]=document.createElement("div");
    menuoption[i].id="mi"+menuitem[i][0];
    menuoption[i].classList.add("menuitem");
    //menuoption[i].classList.add("tooltip");

    menuoption[i].innerHTML="<i style='font-size:14px' class='material-icons'>"+menuitem[i][0]+"</i>"
    //menuoption[i].innerHTML+="<span class='tooltiptext'>"+menuitem[i][1]+"</span>"
    menuoption[i].func=menuitem[i][2];
    menuoption[i].label=menuitem[i][0];
    menuoption[i].tip=menuitem[i][1];
    menuoption[i].onmouseover=function(){
      showtooltip(this.tip,event);
      }
    menuoption[i].onmouseleave=function(){hide(tipdiv);}
    
    if(menuitem[i][2]!=null){
    menuoption[i].onclick=function(){
      //alert("option clicked");
      eval(this.func);
      }
    }
  
    m.appendChild(menuoption[i]);
    hide(m);
    
  }
  /* add color picker to font color */       
}

function selectfontcolor(){
  optionlist.style.width=narrow;
  if(!CurrentP){
    nbxalert("Error","Please select a box","red");
    return;
  }
  if(typeof fcdiv == "undefined"){
    fcdiv=document.createElement("div")
    fcdiv.style.textAlign="center"
    fcdiv.style.marginTop="2rem";
    fcdiv.innerHTML+="<p id='fonttransparency' onclick=togglefonttrans()></p>"
    
    fc=document.createElement("input")
    fc.type="color"
    fcdiv.appendChild(fc)
    fc.onchange=function(){CurrentB.style.color=this.value;}
    fcdiv.style.display="none"
    optionlist.appendChild(fcdiv)
  }  
  setoptionposition("",event)
  olhdiv1.innerHTML="Select Font Colour"

  show(fcdiv);
  if(CurrentB.style.color=="transparent"){
    elem('fonttransparency').innerHTML="Transparent ?: YES";
  }
  else{
    elem('fonttransparency').innerHTML="Transparent ?: NO";
  }
  fc.value=RGBtoHex(window.getComputedStyle(CurrentB, null).getPropertyValue("color"));
  fcdiv.style.width=computestyle(optionlistheader,"width");

  show(optionlist);
  show(optionlistheader,"flex");
  setoptionlistwidth();

  
  optionlist.onmouseleave=function(){};

  //addclosebutton(fcdiv,"topright",closeicon);

}

function togglefonttrans(){
  if(CurrentB.style.color!="transparent"){
     CurrentB.previousfontcolor=CurrentB.style.color;
     CurrentB.style.color="transparent";
     elem('fonttransparency').innerHTML="Transparent ?: YES";

  }
  else{
    if(CurrentB.previousfontcolor){
    CurrentB.style.color=CurrentB.previousfontcolor;
    }
    else{
      CurrentB.style.color="black";
    }
    elem('fonttransparency').innerHTML="Transparent ?: NO";
  }
}

function showtooltip(tip,ev){
  //console.log(id+"/"+tip)
  //loc=elem("mi"+id);
  //console.log(loc.offsetTop+"/"+loc.offsetLeft)
  //console.log(ev.clientX+"/"+ev.screenX+"/"+ev.offsetX+"/"+loc.style.left+"/"+loc.offsetLeft+"/"+window.scrollX)
  //tipdiv.style.top=(loc.offsetTop-25)+"px"
  //tipdiv.style.left=loc.offsetLeft+"px";
  //console.log("ev ClientX"+ev.clientX+"/ev clientY"+ev.clientY)
  //console.log("ev screenX"+ev.screenX+"/ev screenY"+ev.screenY)

  //tipdiv.style.left=(ev.clientX+10)+"px"
  //tipdiv.style.top=(ev.clientY)+"px"
  //tipdiv.style.left=(ev.screenX+10)+"px"
  //tipdiv.style.top=(ev.screenY-117)+"px"
  tipdiv.style.left=(ev.screenX+10)+"px"
  tipdiv.style.top=(ev.screenY-117)+"px"
  

  tipdiv.style.display="block";
  tipdiv.innerHTML=tip;
}








// Create the menu
function getStrValue(s,suffix){
return(s.split(suffix)[0])
}



function setoptionposition(itemlabel,ev){
  //optionlist.style.display="block"
  //optionlist.style.zIndex=1
  //optionlist.style.position="fixed" 
  /*  
  if(ele!=null){
    if(ele.offsetLeft+optionlist.offsetWidth<screen.width){
      optionlist.style.left=ele.style.left;
    }
    else{
      optionlist.style.left=(screen.width-optionlist.offsetWidth)+"px";
    }
    if(ele.offsetTop+optionlist.offsetHeight<screen.height){
      optionlist.style.top=ele.style.top;
    }
    else{
      optionlist.style.top=(screen.Height-optionlist.offsetHeight)+"px";
    }
  }
  else{
    if(ev.clientX + optionlist.scrollWidth<screen.availWidth){
      if(itemlabel=="cover"){
        optionlist.style.left="1px";
      }
      else{
        optionlist.style.left="54px";
      }
    }
    else{
      optionlist.style.left=(screen.availWidth-optionlist.scrollWidth)+"px";
    }
    optionlist.style.top="120px";
  }
  */
  for(i=0;i<optionlist.children.length;i++){
    hide(optionlist.children[i]);
  }
  //optionlistheader.style.minWidth=optionlist.style.width;
  show(optionblanklines);  
  
  optionlist.onmouseleave=function(){};
  

}

function addclosebutton(ele,posn,c_icon,ele2){
  fs=16 // this should be the same as the font size defined in closeicon
  c_icon.innerHTML="&#x2612;";   
  show(c_icon);
  c_icon.onclick=function(){hide(ele);if(ele2){hide(ele2)};hide(c_icon)}
  c_icon.style.zIndex=ele.style.zIndex+1;
  switch(posn){
    case("topleft"):
      c_icon.style.left=ele.offsetLeft+"px";
      c_icon.style.top=ele.offsetTop+"px";
      break;
    case("topright"):
      c_icon.style.left=(ele.offsetLeft+ele.offsetWidth-fs)+"px";
      c_icon.style.top=ele.offsetTop+"px";
      break;
    
      case("bottomright"):
      c_icon.style.left=(ele.offsetLeft+ele.offsetWidth-fs)+"px";
      c_icon.style.top=(ele.offsetTop+ele.offsetHeight-fs)+"px";
      break;

      case("bottomleft"):
      c_icon.style.left=ele.offsetLeft+"px";
      c_icon.style.top=(ele.offsetTop+ele.offsetHeight-fs)+"px";
      break; 
    }     
    
}

function moveElement(d){
if(!CurrentP){
  alert("To move a box, you first have to select one")
  return;
}
if(CurrentP.id=="Group"){
  alert("The main box cannot be moved")
  return;
}
e=CurrentP;

switch(d) {
  case "R":
    //alert("right");
    if(e.nextElementSibiling!==null){
      n=e.nextElementSibling;
      n.insertAdjacentElement("afterend", e)
    }
    else{
      alert("The selected box is at the end position and cannot move further forward.")
    }
    break;
  case "L":
    if(e.previousElementSibiling!==null){
      n=e.previousElementSibling;
      n.insertAdjacentElement("beforebegin", e)
    }
    else{
      alert("The selected box is at the start position and cannot move further backward.")
    }
    
    break;
  default:   
}
//hidemenu();
}

function cloneElement(elem){
  clone=updateElementId(elem.cloneNode(true))
  return(clone)
}

function updateElementId(elementclone){
  Last_ID+=1;
  elementclone.id=BoxPrefix + Last_ID;
  elementclone_elems=elementclone.getElementsByTagName("*")
  
  for(i=0;i<elementclone_elems.length;i++){
    //console.log(elementclone_elems[i].tagName+"-"+elementclone_elems[i].innerHTML)
      
    if(elementclone_elems[i].tagName=="P" || elementclone_elems[i].tagName=="DIV"){
      Last_ID+=1;
    //  console.log(elementclone_elems[i].tagName+"-"+elementclone_elems[i].innerHTML)
      elementclone_elems[i].id=BoxPrefix + Last_ID;
//      if(clone_elems[i].tagName="p"){
//        clone_elems[i].firstChild.onclick=function(){myPopUp(event)};
//      }
    }
  }
return(elementclone)

}

function showcursor(event,s){
  CurrentP.id=event.currentTarget.parentNode.id
  //alert(s+" "+CurrentP.id)

  e=elem(CurrentP.id);
  switch(s){
    case "m":
      e.style.cursor="context-menu";
  }
}
var StyleCopied;
function OldcopyStyle(elem){
  styleObj=window.getComputedStyle(elem, null);
  
  styleObjParent=window.getComputedStyle(elem.parentElement, null);
  styleObjParent.classList=elem.parentElement.classList;
  styleObj.classList=elem.classList
  StyleCoped=elem.style.cssText
  //alert("Style copied.")
}

function copyStyle(elem){
  if(elem){  
      ElementStore=cloneElement(elem)
      //StyleCopied=elem.style.cssText;
      //ApplyComputedStyle(elem,ElementStore);
      //ApplyComputedStyle(elem.children[0],ElementStore.children[0])
      //alert(StyleCopied)  
  }
  else{
    alert("Please select a box to copy its style.")
  }
  
  
}

function applyStyle(elem,scope){
  
  if(elem){
    if(scope=="solo"){
      elem.className=ElementStore.className;
      elem.style.cssText=ElementStore.style.cssText;
      elem.children[0].className=ElementStore.children[0].className;
      elem.children[0].style.cssText=ElementStore.children[0].style.cssText;
      //ApplyComputedStyle(ElementStore,ele);
      //ApplyComputedStyle(ElementStore.children[0],ele.children[0]);
      
    }
    else{
      //alert("I am here" + scope)
      CopyStyleAll(ElementStore,elem)
    } 
  }
  else{
    nbxalert("Error","Please select the box to apply the desired style.","red")
  } 
}   

function CopyStyleAll(source_ele,target_ele){ 
   //alert("Here I am")
   //console.log("Here !"+source_ele.style.cssText)
   target_ele.style.cssText=source_ele.style.cssText
   target_ele.children[0].style.cssText=source_ele.children[0].style.cssText;
   target_ele.className=source_ele.className;
   target_ele.children[0].className=source_ele.children[0].className;
   //ApplyComputedStyle(source_ele,target_ele)
   //ApplyComputedStyle(source_ele.children[0],target_ele.children[0])
   
  //alert(source_ele+": no of children :"+source_ele.children.length)
   for(let i=1;i<source_ele.children.length;i++){
     //console.log(i+":"+source_ele.children[i].id+":"+source_ele.children[i].tagName)
     //console.log(i+":"+source_ele.children[i].children[0].id+":"+source_ele.children[i].children[0].tagName)
    
    if(target_ele.children[i]){
      //console.log("copying "+i+" : "+source_ele.children[i]+" to "+target_ele.children[i])
      CopyStyleAll(source_ele.children[i],target_ele.children[i])

    }
    else{
      return;
    }
    
       
  }
}


function ApplyComputedStyle(source_ele,elem){
  let compStyles=window.getComputedStyle(source_ele);

  //elem.style.cssFloat=compStyles.getPropertyValue("float")
  //elem.style.resize=compStyles.getPropertyValue("resize")
  elem.style.overflow=compStyles.getPropertyValue("overflow")
  //elem.style.height=compStyles.getPropertyValue("height")
  //elem.style.width=compStyles.getPropertyValue("width")
  elem.style.position=compStyles.getPropertyValue("position")
  if(compStyles.getPropertyValue("position")=="absolute" || compStyles.getPropertyValue("position")=="fixed"){
    elem.style.top=compStyles.getPropertyValue("top");
    elem.style.left=compStyles.getPropertyValue("left");
    
  }
  
  elem.style.textAlign=compStyles.getPropertyValue("text-align")
  elem.style.fontFamily=compStyles.getPropertyValue("font-family")
  //console.log(elem.id+"/"+elem.style.fontFamily)
  elem.style.color=compStyles.getPropertyValue("color")
  elem.style.fontSize=compStyles.getPropertyValue("font-size")
  elem.style.fontWeight=compStyles.getPropertyValue("font-weight")
  elem.style.backgroundColor=compStyles.getPropertyValue("background-color")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-image")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-blend-mode")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-repeat")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-position")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-size")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-attachment")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-origin")
  elem.style.backgroundImage=compStyles.getPropertyValue("background-clip")
  
  
  elem.style.borderWidth=compStyles.getPropertyValue("border-width")
  elem.style.borderTopWidth=compStyles.getPropertyValue("border-top-width")
  elem.style.borderRightWidth=compStyles.getPropertyValue("border-right-width")
  elem.style.borderBottomWidth=compStyles.getPropertyValue("border-bottom-width")
  elem.style.borderLeftWidth=compStyles.getPropertyValue("border-left-width")
  
  elem.style.borderColor=compStyles.getPropertyValue("border-color")
  elem.style.borderStyle=compStyles.getPropertyValue("border-style")
  elem.style.borderRadius=compStyles.getPropertyValue("border-radius")
  
  elem.style.boxShadow=compStyles.getPropertyValue("box-shadow")
  elem.style.paddingTop=compStyles.getPropertyValue("padding-top")
  elem.style.paddingRight=compStyles.getPropertyValue("padding-right")
  elem.style.paddingBottom=compStyles.getPropertyValue("padding-bottom")
  elem.style.paddingLeft=compStyles.getPropertyValue("padding-left")

  elem.style.marginTop=compStyles.getPropertyValue("margin-top")
  elem.style.marginRight=compStyles.getPropertyValue("margin-right")
  elem.style.marginBottom=compStyles.getPropertyValue("margin-bottom")
  elem.style.marginLeft=compStyles.getPropertyValue("margin-left")
  elem.style.gridColumnStart=compStyles.getPropertyValue("grid-column-start")
  
  //elem.parentElement.style.width=styleObjParent.getPropertyValue("width")
  //elem.parentElement.style.height=styleObjParent.getPropertyValue("height") 
  elem.style.display=compStyles.getPropertyValue("display")
  //alert("Style applied.")
}




function OldapplyStyle(elem){
  elem.parentElement.classList=styleObjParent.classList
  elem.parentElement.style.cssFloat=styleObjParent.getPropertyValue("float")
  elem.parentElement.style.resize=styleObjParent.getPropertyValue("resize")
  elem.parentElement.style.overflow=styleObjParent.getPropertyValue("overflow")
  
  elem.style.textAlign=styleObj.getPropertyValue("text-align")
  elem.style.fontFamily=styleObj.getPropertyValue("font-family")
  elem.style.color=styleObj.getPropertyValue("color")
  elem.style.fontSize=styleObj.getPropertyValue("font-size")
  elem.style.fontWeight=styleObj.getPropertyValue("font-weight")
  elem.parentElement.style.backgroundColor=styleObjParent.getPropertyValue("background-color")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-image")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-blend-mode")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-repeat")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-position")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-size")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-attachment")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-origin")
  elem.parentElement.style.backgroundImage=styleObjParent.getPropertyValue("background-clip")
  
  
  elem.parentElement.style.borderWidth=styleObjParent.getPropertyValue("border-width")
  elem.parentElement.style.borderTopWidth=styleObjParent.getPropertyValue("border-top-width")
  elem.parentElement.style.borderRightWidth=styleObjParent.getPropertyValue("border-right-width")
  elem.parentElement.style.borderBottomWidth=styleObjParent.getPropertyValue("border-bottom-width")
  elem.parentElement.style.borderLeftWidth=styleObjParent.getPropertyValue("border-left-width")
  
  elem.parentElement.style.borderColor=styleObjParent.getPropertyValue("border-color")
  elem.parentElement.style.borderStyle=styleObjParent.getPropertyValue("border-style")
  elem.parentElement.style.borderRadius=styleObjParent.getPropertyValue("border-radius")
  
  elem.parentElement.style.boxShadow=styleObjParent.getPropertyValue("box-shadow")
  elem.parentElement.style.paddingTop=styleObjParent.getPropertyValue("padding-top")
  elem.parentElement.style.paddingRight=styleObjParent.getPropertyValue("padding-right")
  elem.parentElement.style.paddingBottom=styleObjParent.getPropertyValue("padding-bottom")
  elem.parentElement.style.paddingLeft=styleObjParent.getPropertyValue("padding-left")

  elem.parentElement.style.marginTop=styleObjParent.getPropertyValue("margin-top")
  elem.parentElement.style.marginRight=styleObjParent.getPropertyValue("margin-right")
  elem.parentElement.style.marginBottom=styleObjParent.getPropertyValue("margin-bottom")
  elem.parentElement.style.marginLeft=styleObjParent.getPropertyValue("margin-left")
  elem.parentElement.style.gridColumnStart=styleObjParent.getPropertyValue("grid-column-start")
  
  //elem.parentElement.style.width=styleObjParent.getPropertyValue("width")
  //elem.parentElement.style.height=styleObjParent.getPropertyValue("height") 
  elem.style.display=styleObj.getPropertyValue("display")
  elem.parentElement.style.display=styleObjParent.getPropertyValue("display")  
  elem.classList=styleObj.classList
  //alert("Style applied.")
}

function RGBtoHex(RGBstring){
  if(RGBstring==""){
    return("#000000")
  }
  else{
  color = RGBstring+";" //"rgb(51,51,51);";
  color = '#'+color.match(/\d+/g).map(function(x){ 
      x = parseInt(x).toString(16);
      return (x.length==1) ? "0"+x : x;
  }).join("");
  
  return(color);
  }
}

function hexToRGB(hex, alpha) {
 // alert("hextoRGB "+ hex)
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

function z_filestuff(ev){
  g=elem("fileops")
  elem("filename").value=CurrentWebPage;
  if(g.style.display=="block"){
    g.style.display="none";
    //hide(closeicon);
    hide(files);
    return;
  }
  g.style.position="fixed";
  g.style.zIndex=0;
  f=elem("filestuff")
  g.style.top=(f.offsetTop+f.offsetHeight+5)+"px"
  g.style.left=(f.offsetLeft)+"px"
  //g.style.left=ev.clientX+"px";
  //g.style.top=ev.clientY+"px";
  //console.log(g.style.left+"/"+g.style.top)
  g.style.display="block";
  //g.onmouseleave=function(){hide(g)}
  //addclosebutton(g,"bottomright",closeicon)

}

function z_fileaction(){
  gn=elem("filename");
  go=elem("filesource")
    if(gn.value!=""){
      //console.log(typeof gn.value + "gn:"+gn.value);
      x=gn.value.replace(/ /g,"_");
      //console.log("x "+x)
      gn.value=x;
      //console.log("gn:"+gn.value);
      CurrentWebPage=gn.value
      console.log("CWP"+CurrentWebPage)
      save_restore(go.value,gn.value)
    }
    else{
      alert("File name cannot be blank");
    }
    elem("fileops").style.display="none";
}
  
async function fetchurl(url){
    url=elem("url").value;
    let response = await fetch(url);

let text = await response.text(); // read response body as text
    
console.log(text)
textwindow=elem("textwindow")
    textwindow.innerHTML=text;
}

function nbx_Upload(filetype,processdata){
  //Reference the FileUpload element.
  var fileUpload = elem("fileUpload");
if(filetype=="excel"){
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  console.log(fileUpload.value)
  //if (!regex.test(fileUpload.value.toLowerCase())){
  //  alert('This is not an excel spreadsheet');
  //  return;
  //}

}

  //Validate whether File is valid Excel file.
  //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
  //if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();

          //For Browsers other than IE.
          if (reader.readAsBinaryString) {
              reader.onload = function (e) {
                  processdata(e.target.result);
              };
              console.log(fileUpload.files[0])
              if(typeof fileUpload.files[0]!="undefined"){
              reader.readAsBinaryString(fileUpload.files[0]);
              }
              else{
                if(fileUpload2.value!=""){
                  fetch(fileUpload2.value)
                  .then(response => response.blob())
                  .then(blob => reader.readAsBinaryString(blob))
 
                  //reader.readAsDataURL(fileUpload2.value);
                  //console.log(x);
                  //reader.readAsBinaryString(x)
                }
              }
          } else {
              //For IE Browser.
              reader.onload = function (e) {
                  var data = "";
                  var bytes = new Uint8Array(e.target.result);
                  for (var i = 0; i < bytes.byteLength; i++) {
                      data += String.fromCharCode(bytes[i]);
                  }
                  processdata(data);
              };
              reader.readAsArrayBuffer(fileUpload.files[0]);
          }
      } else {
          alert("This browser does not support HTML5.");
      }
  //} else {
  //    alert("Please upload a valid Excel file.");
  //}

}

z=0
function findLevel(ele){
  //console.log({ele})
  //console.log(ele.id)
  
  
  
  if(ele.id=="Group"){
    return(0)
  }
  else{
    //z=z+1;
    //ele=ele.ParentElement;
    //console.log(ele);
    return(findLevel(ele.parentElement)+1);
  }


}


function ProcessText(data,targetbox){
  //console.log(data)
  tempdiv=createbox("")
  elem("Group").appendChild(tempdiv);
  importedHTML.innerHTML=data;
  //importedHTML=tempdiv;
  importedHTML.style.display="block";
  
  //console.log(tempdiv.outerHTML)
  //tempojb.innerHT
  cloneHTML=cloneElement(importedHTML)
  //importedHTML.innerHTML="";
  
  processHTML(importedHTML,CurrentP);
  //for(i=0;i<querySelectorAll())
  console.log("CLONE :"+cloneHTML.innerHTML);
  //importedHTML=tempdiv
  
}

var excelRows;
var data_item=[];

function ProcessExcel(data) {
  //Read the Excel File data.
  var workbook = XLSX.read(data, {
    type: 'binary'
  });

  //Fetch the name of First Sheet.
  var firstSheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  //excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
  excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{defval: ""});

  //Create a HTML Table element.
  //var table = document.createElement("table");
  //table.border = "1";

  //Add the header row.
  //var row = table.insertRow(-1);

  //Add the header cells.
  //var headerCell = document.createElement("TH");
  //headerCell.innerHTML = "Id";
  //row.appendChild(headerCell);

  //headerCell = document.createElement("TH");
  //headerCell.innerHTML = "Name";
  //row.appendChild(headerCell);

  //headerCell = document.createElement("TH");
  //headerCell.innerHTML = "Country";
  //row.appendChild(headerCell);

  //Add the data rows from Excel file.
  //for (var i = 0; i < excelRows.length; i++) {
      //Add the data row.
    //   var row = table.insertRow(-1);

      //Add the data cells.
    //   var cell = row.insertCell(-1);
    //  cell.innerHTML = excelRows[i].Id;

    //  cell = row.insertCell(-1);
    //  cell.innerHTML = excelRows[i].Name;

    //  cell = row.insertCell(-1);
    //  cell.innerHTML = excelRows[i].Country;
  //}

  //var dvExcel = elem("dvExcel");
  //dvExcel.innerHTML = "";
  //dvExcel.appendChild(table);

  /* count no of fields 
    u=0    
    for (x in excelRows[0]){
    //console.log("x :"+x)
      u++;
    }

    //console.log("u:"+u)
    //alert(u);
    //alert(excelRows[0].length)
    // u is the no of fields

  set up unique array to store unique values per field  
    unique=[]
    for(i=0;i<u;i++){
        unique[i]=[]
        
    }
   */ 
    
    importdatadiv.innerText="Imported File:"+elem("fileUpload").value;
  
    unique=[]
    i=0;
    fieldoptions="<option value=''></option>"
    //console.log("excelRows[0].length "+excelRows[0].length)
    for (x in excelRows[0]){
        console.log(x)
        unique[i]=[]=unique[x]=[x,i]
        fieldoptions+="<option value='"+x+"'>"+x+"</option>"
        i++;
    }

    /* count no of unique values per field */
    
    for(j=0;j<excelRows.length;j++){
      data_item[j]=[]
      for(k in excelRows[j]){
        //console.log("j:"+j+"k:"+excelRows[j][k])
        if((typeof excelRows[j][k]!="undefined") && (typeof unique[k]!="undefined")){
          if(unique[k].includes(excelRows[j][k])==0){
            unique[k].push(excelRows[j][k]);
          }
          index=unique[k][1]
          data_item[j][index]=excelRows[j][k];
          
        }
        else{
          index=unique[k][1];
          data_item[j][index]="";
          
        }
      }
    }
    /* show fields and number of unique values per field */
    text="<TABLE>"

    for(l=0;l<unique.length;l++){
    text+="<TR><TD>"+unique[l][0]+"</TD><TD>"+(unique[l].length-2)+"</TD></TR>"
  }
    text+="</TABLE>"
    selfields.innerHTML+=text;
    selectFields();
    //addclosebutton(optionlist,"bottomright",closeicon)

  /*
    for(i=0;i<data_item.length;i++){
    for(k=0;k<data_item[i].length;k++){
      console.log(i+":"+k+":"+data_item[i][k]);
    }
  }

*/
}

function selectFields(){

  
  selectedfields=elem("selectedfields")
  selectedfields.innerHTML=text;
  selectedfields.innerHTML+= "Level 1: <select id='parentfield'>"+fieldoptions+"</select><br>"
  
  selectedfields.innerHTML+= "Level 2: <select id='childfield'>"+fieldoptions+"</select><br>"
  selectedfields.innerHTML+= "Level 3: <select id='grandchildfield'>"+fieldoptions+"</select><br>"
  selectedfields.innerHTML+= "Level 4: <select id='greatgrandchildfield'>"+fieldoptions+"</select><br>"
  
  selectedfields.innerHTML+="<br><p style='text-align:center'> <input type='button' id='buildbox' value='Build boxes' onclick='buildbox(excelRows)'/></p>"
  selectedfields.innerHTML+="<div id='bbox_status' style='display:none'>status</div>"
  
       // for (var i=0;i<excelRows.length;i++){
        //elem("property").innerHTML+=excelRows[i][x]
         //   for (x in excelRows[0]){
           //     if(unique[x].includes(excelRows[i][x])==false){
            //unique[x].push("abc")
            //alert("unique[x] "+unique[x])
             //       unique[x].push(excelRows[i][x]);
             //       unique[x][1]++;
             //   }   
           // }
       // }
        
        //alert("unique.length "+unique.length)
        //text="There are "+u+" fields whose unique values are"
        //for (j=0;j<unique.length;j++){
            //elem("property").innerHTML+="<br> unique j "+j+"/"+unique[j]
            //text+=unique[j][0]
         //   for (k in unique[j]){
            //    elem("property").innerHTML+="<br>"+j+"/"+k+"/"+unique[j][k]
         //   text+=unique[j][k]+","  
         // }
        //}
        
        //alert(text);
    
    
};

function showcomplmsg(){
  hide(optionlist);
  alert("Import completed");
  showhideall();
  
}

function importbox(event){
  
  if(typeof importboxdiv=="undefined"){
    importboxdiv=document.createElement("div");
    optionlist.appendChild(importboxdiv);
    importboxdiv.style.padding="1rem"
    importboxdiv.style.textAlign="center";

    addsection(importboxdiv,"<br><br>")
    addsection(importboxdiv,"Please enter title of Nested Box  & id of box to import:")
    addsection(importboxdiv,"<input type='text' id='ibxurl' size='40'>")
    addsection(importboxdiv,"<br><br>")
    
    addsection(importboxdiv,"<span class='nbxbutton' style='margin-left:0rem' onclick={getfromserver(elem('ibxurl').value,CurrentP,'insert',showcomplmsg)}>Proceed</span>")


  }
  setoptionposition("Font",event);
  olhdiv1.innerHTML="Importing a box"
 
    show(importboxdiv);
    show(optionlist);
    show(optionlistheader,"flex");
    setoptionlistwidth();
    //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  
    //optionlist.onmouseleave=function(){}
  
  
 
  

}

function importboxes(importtype){
  optionlist.style.width=wide;
  if(!CurrentP){
    nbxalert("Error","Please select a box first.","red");
    return;
  }
  
  //importdataframe=elem("importdataframe")
  if(typeof importdatadiv!="undefined" && importdatadiv.style.display!="none"){
    hide(importdatadiv);
    hide(optionlist);
    return;

  }
  if(typeof importdatadiv=="undefined"){
    //optionlist > importdatadiv > fileUpload, fileUpload2, upload
    importdatadiv=document.createElement("div")
    optionlist.appendChild(importdatadiv);
    importdatadiv.className="optionlist"
    importdatadiv.style.marginLeft="1rem";
    
    fileUpload=document.createElement("input");
    importdatadiv.innerHTML+="<br><b>Option 1</b><br> Upload from local drive:"

    importdatadiv.appendChild(fileUpload);
    fileUpload.id="fileUpload";
    fileUpload.type="file";
    importdatadiv.innerHTML+="<br><br><b>Option 2</b><br>Download from server:"
    fileUpload2=document.createElement("input");
    
    importdatadiv.appendChild(fileUpload2);
    fileUpload2.type="text";
    fileUpload2.size="40";
    fileUpload2.id="fileUpload2";
    elem("fileUpload2").value="https://nstdboxes.com/Data/org_chart.xlsx";
    importdatadiv.innerHTML+="<br><br>"
    
    //importdatadiv.innerHTML+="<br>"

    upload=document.createElement("div");
    importdatadiv.appendChild(upload);
    upload.id="upload";
    upload.innerHTML="import";
    upload.className="nbxbutton";
    

  
  
  }
    
  switch(importtype){
  
    case "ExcelToBoxes":
      {
      upload.onclick=function(){
        nbx_Upload('excel',ProcessExcel);
      }


      if(typeof selfields=="undefined"){
        selfields=document.createElement("div")
        //importdatadiv.appendChild(selfields)
        optionlist.appendChild(selfields)
        selfields.style.maxHeight="20vh"
        selfields.id="selectedfields"
      }
   
      setoptionposition();
      olhdiv1.innerHTML="Importing Excel file";
      show(importdatadiv);
      show(selfields);
      show(optionlist);
      show(optionlistheader,"flex");
      setoptionlistwidth();
      //optionlistheader.style.width=(parseInt(computestyle(optionlist,"width").split("px")[0])-2)+"px";
  
      //optionlist.style.overflow="auto";
      
      //optionlist.onmouseleave=function(){};
  
      break;
      }
    case "LoadBoxesFromDrive":
      {  

      upload.onclick=function(){
        nbx_Upload('text',ProcessText);
      }
      setoptionposition("",event);
      olhdiv1.innerHTML="Importing Box from Drive"
      show(importdatadiv);
      show(optionlist);
      optionlist.maxHeight="200px";
      optionlist.onmouseleave=function(){};
      break;
      }
    
    } 
  



  }






 
var previousP;








function buildbox(jsonfile){
  if(typeof CurrentP=="undefined"){
    nbxalert("Error", "Please select a box to import the data into.", "red");
    return;
  }
  else{
    if(typeof previousP!="undefined"){
      CurrentP=previousP;
      for(i=1;i<CurrentP.children.length;i++){
        _dummyNode = document.createElement('div');
        _dummyNode.appendChild(CurrentP.children[i].parentElement.removeChild(CurrentP.children[i]));
        _dummyNode.innerHTML = "";
        CurrentP.children[i].remove();
      //}
      }
    }
    else{
      previousP=CurrentP;
    }
  }
  /*childfield = name of level 2 field */
  /*parentfield = name of level 1 field */
   parentfield=elem("parentfield").value;
   childfield=elem("childfield").value;
   grandchildfield=elem('grandchildfield').value;
   greatgrandchildfield=elem('greatgrandchildfield').value

non_empty=0;
 if(parentfield=="" || childfield==""){
   alert("The first two levels must be filled")
   return;
 }
 if(grandchildfield=="" && greatgrandchildfield!=""){
  elem('grandchildfield').value=greatgrandchildfield;
   elem('greatgrandchildfield').value="";
 
  grandchildfield=greatgrandchildfield;
   greatgrandchildfield="";
   
 }



   //alert("Child field is "+childfield.value+" Parent field is "+parentfield.value)
  show(elem('bbox_status'));
   for (var i=0;i<jsonfile.length;i++){
     console.log(i+jsonfile[i][parentfield])
     elem('bbox_status').innerHTML="First Parse:"+parseInt(i*100/jsonfile.length)+"%"

     /* for each row, get the parentfield*/
    fieldvalue=jsonfile[i][parentfield]
    
    if(typeof fieldvalue=="undefined" || fieldvalue=="#NA"){
      continue;
    }
    divtags=document.getElementsByTagName("div")
    parentdiv=0
    /* check if there is an existing box for the parent*/
    for (d=0;d<divtags.length;d++){
      if(divtags[d].getAttribute(parentfield.replace(/ /g,"_"))!=null){
        if(divtags[d].getAttribute(parentfield.replace(/ /g,"_"))==fieldvalue){
          parent=elem(divtags[d].id);
          parentdiv=1;
          break;
        }
      }  
        if(divtags[d].getAttribute(childfield.replace(/ /g,"_"))!=null){
          if(divtags[d].getAttribute(childfield.replace(/ /g,"_"))==fieldvalue){
            parent=elem(divtags[d].id);
            parentdiv=1;
          break;  
        }
      }
    } 
    
    if(parentdiv==0){ 
      //console.log("fieldvalue"+typeof fieldvalue+":"+fieldvalue)
      // check if the parent is also a child 
        parent=createbox(fieldvalue);
        parent.setAttribute(parentfield.replace(/ /g,"_"),fieldvalue);
        CurrentP.appendChild(parent);
    } 
    /* get the child field*/
    childfieldvalue=jsonfile[i][childfield]
    if(typeof childfieldvalue=="undefined" || childfieldvalue=="#NA"){
      continue;
    }

    
    divtags=document.getElementsByTagName("div")
    childdiv=0
    /* check if the child has an existing box*/
    for (d=0;d<divtags.length;d++){
     
      //childattrib=childfield.replace(/ /g,"_")
      if(divtags[d].getAttribute(childfield.replace(/ /g,"_"))!=null){
        if(divtags[d].getAttribute(childfield.replace(/ /g,"_"))==childfieldvalue){
          child=elem(divtags[d].id);
          if (child.parentElement.id==parent.id){
            childdiv=1;
            break;
          }
        }
      }
      /* check if the child is also a parent */
      if(divtags[d].getAttribute(parentfield.replace(/ /g,"_"))!=null){
        if(divtags[d].getAttribute(parentfield.replace(/ /g,"_"))==childfieldvalue){
          child=elem(divtags[d].id);
          childdiv=1;
          break;
        }
      }
    }
        //alert(childfieldvalue)
    /* if none, create one  */ 
    if(childdiv==0){
        n=createbox(childfieldvalue);
        //childattrib=
        n.setAttribute(childfield.replace(/ /g,"_"),childfieldvalue);
        parent.appendChild(n);
      }  
    else{
      n=child;
      if(parent!=n){
      parent.appendChild(n);
      }
    }  
    
    
        //alert(childfieldvalue)
   //alert("I am here");
  }

/* connect the grandchildren */
if(elem("grandchildfield").value!=""){
  grandchildfield=elem("grandchildfield").value;

  for (var i=0;i<jsonfile.length;i++){
    elem('bbox_status').innerHTML="Second Parse:"+parseInt(i*100/jsonfile.length)+"%"

    grandchildfieldvalue=jsonfile[i][grandchildfield];
    childfieldvalue=jsonfile[i][childfield];
    parentfieldvalue=jsonfile[i][parentfield];
    if(typeof grandchildfieldvalue=="undefined" || grandchildfieldvalue=="#N/A"){
      continue;
    }
    
      console.log("child: "+childfieldvalue +"- grandchild:"+grandchildfieldvalue)
      divtags=document.getElementsByTagName("div");
      /* check if box exists for the grandchild */
      grandchilddiv=0
      for(d=0;d<divtags.length;d++){
        //console.log(childfield.replace(/ /g,"_"));
        //if(divtags[d].id==""){
        //  console.log("empty id")
        //  continue;
        //}  
        if(attrib(divtags[d],grandchildfield)!=null){
          if(attrib(divtags[d],grandchildfield)==grandchildfieldvalue){
            if(attrib(divtags[d].parentElement,childfield)==childfieldvalue && 
              attrib(divtags[d].parentElement.parentElement,parentfield)==parentfieldvalue){
            
              //child=elem(divtags[d].id);
              grandchilddiv=1;
              grandchild=elem(divtags[d].id)
              break;
            }
          }
        }


      }
      if(grandchilddiv==1){
        if(elem("greatgrandchildfield").value!=""){
          greatgrandchildfield=elem("greatgrandchildfield").value;
          greatgrandchildfieldvalue=jsonfile[i][greatgrandchildfield]
          m=createbox(greatgrandchildfieldvalue);
          m.setAttribute(greatgrandchildfield.replace(/ /g,"_"),greatgrandchildfieldvalue)
          grandchild.appendChild(m);
        }      
      }
      if(grandchilddiv==0){
        for(d=0;d<divtags.length;d++){
          //if(divtags[d].id==""){
          //  console.log("empty id");
          //  continue;
          //}  
          if(attrib(divtags[d],childfield)!=null && attrib(divtags[d],childfield)==childfieldvalue){
            if(attrib(divtags[d].parentElement,parentfield)==parentfieldvalue){
              n=createbox(grandchildfieldvalue);
              n.setAttribute(grandchildfield.replace(/ /g,"_"),grandchildfieldvalue)
              
              elem(divtags[d].id).appendChild(n);
              if(elem("greatgrandchildfield").value!=""){
                greatgrandchildfield=elem("greatgrandchildfield").value;
                greatgrandchildfieldvalue=jsonfile[i][greatgrandchildfield]
          

                m=createbox(greatgrandchildfieldvalue);
                m.setAttribute(greatgrandchildfield.replace(/ /g,"_"),greatgrandchildfieldvalue)
                n.appendChild(m)
              }
            }
          }
        }
      }
    }
  }
  
   assignclass(CurrentP,0);
}

function attrib(ele,attrib_value){

return(ele.getAttribute(attrib_value.replace(/ /g,"_")))

}
// assign classes
boxlevel=[]

function assignclass(parent,level){
  //alert("hello")
  //console.log("parent "+parent.id +"length "+parent.children.length +"level "+level)
  fd="grid1";
  if((level<3) && (parent.children.length<=99) && (parent.children.length>2)){
      fd="grid1111";
      //parent.children[1].style.gridColumn="1/1";
    }      
  parent.classList.add(fd);
  for(boxlevel[level]=0;boxlevel[level]<parent.children.length;boxlevel[level]++){
  
  
    if(parent.children[boxlevel[level]].tagName=="DIV"){
      if(level=="0"){
       parent.children[boxlevel[level]].classList.add("mlevel");
      }
       //parent.children[boxlevel[level]].style.display="none";
    
      assignclass(parent.children[boxlevel[level]],level+1);
    }
  } 
  //showAll();
}  

function showAll(){

  x=document.getElementsByTagName("div")
  for(i=0;i<x.length;i++){
    if(x[i].id.includes("MFB")){
     show(x[i]);
    } 
  }


}









function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  //ev.target.parentElement.style.position="fixed"
  ev.dataTransfer.setData("Text", ev.target.parentElement.id);
  //console.log("top "+ev.target.parentElement.style.top + "/ left :"+ ev.target.parentElement.style.left)
}

function drop(ev) {
  var data = ev.dataTransfer.getData("Text");
  //var obj=elem(data)
  console.log("object id " + data + " top " + obj.style.top + " left " + obj.style.left)
  //console.log("ev cX "+ ev.clientX +" cY" + ev.clientY)
  //elem(data).style.width="90%"
  elem(data).style.position="fixed"
  //elem(data).style.width="90%"
  
  //obj.style.left=ev.clientX
  //obj.style.top=ev.clientY
  ev.target.parentElement.appendChild(elem(data));

  ev.preventDefault();
}


function dragElement(elmnt,elmnt2) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  //console.log("dragging Element "+elmnt.id)
  if (elmnt2) {
    //elmnt2.style.position="absolute";
    /* if present, the header is where you move the DIV from:*/
    elmnt2.onmousedown = dragMouseDown;
  //  console.log(">dragging Element "+elmnt2.id)
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    //elmnt.style.position="absolute";
    elmnt.onmousedown = dragMouseDown;
  }
}  


  function dragMouseDown(e) {
    console.log("dragMouseDown")
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    console.log("element : before "+elmnt.style.top+"/"+elmnt.style.left)
    e = e || window.event;
    console.log("eX "+e.clientX+" eY "+e.clientY)
    console.log("pos1 "+pos1 + "pos2 "+pos2 + "pos3 "+pos3+ "pos4 "+pos4)
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    console.log("element : after "+elmnt.style.top+"/"+elmnt.style.left)
    console.log("pos1 "+pos1 + "pos2 "+pos2 + "pos3 "+pos3+ "pos4 "+pos4)  
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

function z_selectStyle(){

  var components=[]
  components[0]=components['cards']=['shadow','w3-card','w3-card-4']
  components[1]=components['bars']=['border-bar','w3-topbar','w3-rightbar','w3-leftbar','w3-bottombar']
  components[2]=components['borders']=['border','w3-border','w3-border-top','w3-border-right','w3-border-bottom','w3-border-left']
  components[3]=components['corners']=['corner','w3-round','w3-round-large','w3-round-xlarge','w3-round-xxlarge']
  components[4]=components['border-colors']=['border color','w3-border-black','w3-border-red','w3-border-green','w3-border-blue']
text="<table style='background-color:#F2DFCE;'> "
  for(i=0;i<components.length;i++){
    text+="<tr><td colspan='2'>"+components[i][0]+"</td></tr>"
    text+="<tr>"
    for(j=1;j<=components[i].length-1;j++){
       text+="<td style='padding:3px;background-color:#F2DFCE;'><div class='"+components[i][j]+"' style='width:25px;height:25px;background-color:white;' ></div></td>" 
    }
    text+="</tr>"

}  
text+="</table>"
optionlist.innerHTML=text;
optionlist.style.top="100px";
optionlist.style.left="50px";
optionlist.style.display="block";
optionlist.style.backgroundColor="sand";
}

//var GOOGLE_OATH_SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
//var FIREBASE_URL = "https://jrtechnical-testing.firebaseio.com/";

//var GOOGLE_OATH_SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
//var FIREBASE_URL = "https://nestedboxes-99ea8-default-rtdb.firebaseio.com/";

/*
    // called when the Google Client API is done loading
    function handleClientLoad() {
      // load the drive api
      gapi.client.load('drive', 'v2', handleDriveLoad);
    }

    // called when the Google Drive API
    function handleDriveLoad() {
      console.log("handleDriveLoad")
      var ref = new Firebase(FIREBASE_URL);
      ref.onAuth(function(authData) {

        // If the user is already signed in, skip the Popup and go straight to downloading the file list.
        if (authData && authData.google) {
          // NOTE: There currently is no way to view which scopes have been granted via the Firebase API,
          // so you probably need to request all the scopes you need up front.
          // If you want to ask for permissions "incrementally", you will need to use the Google Sign-In API,
          // or do a clever hack (i.e. store the currently granted scopes in Firebase, etc).
          console.log("authdata")
          return handleFirebaseAuthData(null, authData);
        }
        console.log("in between")

        ref.authWithOAuthPopup(
          "google",
          handleFirebaseAuthData,
          {scope: GOOGLE_OATH_SCOPES}
        );
        console.log("I am here")
      });
    }

    /**
     * @param error: contains any error encountered while authenticating. `null` if authentication was successful
     * @param authData: contains the authentication data returned by Firebase
     
    function handleFirebaseAuthData(error, authData) {
      console.log(authData)
      console.log("handling Firebase AuthData")
      if (error) {
        console.log("error")
        return console.log("Login Failed!", error);
      }

      console.log("Authenticated successfully with payload:", authData);

      // reformat the token object for the Google Drive API
      var tokenObject = {
        access_token: authData.google.accessToken
      };

      // set the authentication token
      gapi.auth.setToken(tokenObject);
      console.log("authentication token set");
      // get all the files
      //retrieveAllFiles();
    }

    /**
     * `gapi.client.drive.files.list()` returns paginated results, this will fetch every
     * page and call `handleFileResults` with every batch.
     *
     
    function retrieveAllFiles() {
      console.log("retrieving all files")
      var retrievePageOfFiles = function(request) {
        request.execute(function(resp) {
          handleFileResults(resp.items);
          var nextPageToken = resp.nextPageToken;
          if (nextPageToken) {
            request = gapi.client.drive.files.list({
              'maxResults': 50,
              'pageToken': nextPageToken
            });
            retrievePageOfFiles(request);
          }
        });
      };
      var initialRequest = gapi.client.drive.files.list({maxResults: 50});
      retrievePageOfFiles(initialRequest, []);
    }

    /**
     * Takes the list of files from the Google Drive API and adds them to the DOM as clickable links.
     *
     * @param result - complete list of the users file, as returned by the Google Drive API
     
    function handleFileResults(result) {
      console.log('Got Some Files!', result);

      // copy the results to the DOM as clickable links with fancy icons!
      result.forEach(function(file) {
        var div = document.createElement('div');
        var link = document.createElement('a');
        link.href = file.alternateLink;

        var icon = document.createElement('img');
        icon.src = file.iconLink;

        var title = document.createElement('span');
        title.innerHTML = file.title;

        link.appendChild(icon);
        link.appendChild(title);
        div.appendChild(link);
        document.body.appendChild(div);
      });
    }
*/
function sortChildElements(parentobject,mode){
//parentobject is a div element containing several div elements
// each child div element has a p element
// this function sorts the child elements by their p elements.
if(!parentobject){
  alert("To sort boxes, you first have to select the box containing the boxes.")
  return;
}
//console.log("Before sort.."+parentobject.children.length)
list=[]
for(i=1;i<parentobject.children.length;i++){
  //console.log("i "+i+"/"+parentobject.children[i].tagName+"/"+parentobject.children[i].firstChild.innerHTML)
  if(parentobject.children[i].tagName=="DIV"){
    //console.log(parentobject.children[i].firstChild.innerHTML)
  
    list.push(parentobject.children[i])
    //parentobject.children[i].remove()
    //console.log(list)
  }
} 

for(i=1;i<parentobject.children.length;i++){
  if(parentobject.children[i].tagName=="DIV"){
    parentobject.children[i].remove()
  }
} 


//alert("list.."+list.length) 
//alert("mode"+mode)
if(mode=="text"){
list.sort(function(a,b){
  let x=a.firstChild.innerHTML.toLowerCase();
  let y=b.firstChild.innerHTML.toLowerCase();
  
  if (x<y) {return -1;}
  if (x>y) {return 1;}
  return 0;
});
}
if(mode=="colour"){
  list.sort(function(a,b){
    let x=a.style.backgroundColor;
    let y=b.style.backgroundColor;
    console.log("x "+x+":y "+y)
    if (x<y) {return -1;}
    if (x>y) {return 1;}
    return 0;
  });
    
}

//console.log("After sort ..")
for(i=0;i<list.length;i++){
  //console.log(list[i].firstChild.innerHTML)
  parentobject.appendChild(list[i]);
  //console.log(parentobject.children[1+i].firstChild.innerHTML)
}

}

function selectbullet(){
  optionlist.style.width=narrow;
  if(!CurrentP){
    nbxalert("Error","Please select a box","red");
    return;
  }
  
if(typeof bulletdiv=="undefined"){
  //alert("hello")
  bulletdiv=document.createElement("div")
  bulletdiv.className="optionlist"
  bulletdiv.style.textAlign="center"
  optionlist.appendChild(bulletdiv)
  for(i=0;i<bullets.length;i++){
    bulletitem=document.createElement("div")

    bulletdiv.appendChild(bulletitem)
    bulletitem.innerHTML=bullets[i][1]
    bulletitem.className="optionitem";
    bulletitem.cls=bullets[i][0]
    bulletitem.onclick=function(){
      for(j=0;j<bullets.length;j++){
        CurrentP.classList.remove(bullets[j][0])
      }
    CurrentP.classList.add(this.cls)
    }
  }
}


//console.log(bulletdiv.innerHTML)
setoptionposition("Font",event)
olhdiv1.innerHTML="Selecting Bullet"
show(optionlist)
show(bulletdiv)
show(optionlistheader,"flex");
setoptionlistwidth();
//optionlist.onmouseleave=function(){}
//bulletdiv.style.width=computestyle(optionlistheader,"width");

}

function striptextblock(inputstr){
  if(inputstr.search("<")){
    //alert(inputstr.search("<"));
    for(i=0;i<=block_ele.length;i++){
      str1="<"+block_ele[i]+">";
      re= new RegExp(str1,"gi");
      //console.log("re:"+re)
      newstr=inputstr.replace(re,"");
      //console.log(newstr);
      //console.log(block_ele[i]+":"+newstr);
      inputstr=newstr;
      str1="</"+block_ele[i]+">";
      re= new RegExp(str1,"gi");
      //console.log("re:"+re)
      
      
      newstr=inputstr.replace(re,"");
      //console.log(newstr);
      
      inputstr=newstr;
      //console.log("<"+inputstr.search("<"))
      if(inputstr.search("<")==-1){
        break;
      }

    }
  }
  return(inputstr)  

}