screen_width = screen.width;
num=0
const images = [];
let click = "";
if(screen_width>=1000){
    num=10;
} else if(screen_width>=800){
    num=15;
} else if(screen_width>=600){
    num=20;
} else if(screen_width>=400){
    num=25;
} else{
    num=30;
}

const api_url =
	"https://api.github.com/repos/Arnab-NandaGoswami/TourGhatshila/contents/Images";

async function getapi(url) {
	
	const response = await fetch(url);
	
	var data = await response.json();
	console.log(data);
	if (response) {
		hideloader();
	}
	await show(data);
    await firstLoad(data);
    if(click === "prev") {
        document.body.innerHTML = '';
        await goPrev(data);
    }
    if(click === "next") {
        document.body.innerHTML = ''
        await goNext(data);
    }
}
getapi(api_url);

function hideloader() {
	document.getElementById('loading').style.display = 'none';
}
function show(data) {
	// var responseData = JSON.parse(responseBody);
    // data.forEach( (item,index) =>{
    //     console.log(item.download_url);
        // $("body").append( "<img id='" + index + "'" + " style='"+"width: "+num+"%;height: "+num+"%;padding:5px;' " + "src='"+ item.download_url +"' onclick='myFunction(this)'>" );
    // });
    data.forEach(element => {
        images.push(element.download_url);
    });
    console.log(data[0]);
}

function myFunction(imgs) {
    document.getElementById("preview").src = imgs.src;
    let w = "100%";
    $("#preview").width(w);
    $("#preview").height("auto");
    $("#buttons").append('<br id="lineBreak"><button id="imgPreview" onclick="closePreview()">Close Preview</button>');
}

function closePreview(){
    document.getElementById("imgPreview").remove();
    document.getElementById("lineBreak").remove();
    document.getElementById("preview").src = "";
}

let value = 0;

function firstLoad(data){
    let last = value+10
    let first = value
    let tag = 1;
    while (images[first] && first<last){
        console.log(images[first]);
        let h=num+"%";
        document.getElementById("tag"+tag).src = images[first];
        $("#tag"+tag).width(h);
        $("#tag"+tag).height(h);
        document.getElementById("tag"+tag).style.padding = "5";
        first++;
        tag++;
    }
}

function goPrev(data) {
    click = "prev";
    value = value - 10;
    if(value<0){
        value=0
    }
    console.log("prev button click " + value);
    let last = value+10
    let first = value
    let id = 1
    let tag = 1;
    while (images[first] && first<last){
        console.log(images[first]);
        // $("body").append( "<img id='" + id + "'" + " style='"+"width: "+num+"%;height: "+num+"%;padding:5px;' " + "src='"+ images[first] +"' onclick='myFunction(this)'>" );
        let h=num+"%";
        document.getElementById("tag"+tag).src = images[first];
        $("#tag"+tag).width(h);
        $("#tag"+tag).height(h);
        document.getElementById("tag"+tag).style.padding = "5";
        first++;
        id++
        tag++;
    }
}

function goNext(data) {
    click = "next";
    let l = value
    value = value + 10;
    if(value>images.length-1){
        value=l
    }
    console.log("next button click " + value);
    let last = value+10
    let first = value
    let tag = 1
    while (images[first] && first<last){
        console.log(images[first]);
        let h=num+"%";
        document.getElementById("tag"+tag).src = images[first];
        $("#tag"+tag).width(h);
        $("#tag"+tag).height(h);
        document.getElementById("tag"+tag).style.padding = "5";
        first++;
        tag++;
    }
}
