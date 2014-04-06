

function take_pic(){
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
	    destinationType: Camera.DestinationType.FILE_URI });

	function onSuccess(imageURI) {
	    image.src = imageURI;
	    convertImgToBase64('imageURI', function(base64Img){
	    	denuncia(base64Img, "");
	    });
	    
	    
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
	
}


function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null; 
    };
    img.src = url;
}

function setUser(datos){
	//la funcion de insertar;
}

function denuncia(foto,desc){
	//aqui la funcion de chekin de riesgo;
	CurrentPosition(function(pos){
		var lat=pos.coords.latitude;
        var log=pos.coords.longitude; 
        $.ajax({
            type: "POST",
            url: '					Procuraduria/denuncias',
            data: "lat="+lat+"&long="+log+"&foto=+"+foto+"&desc="+desc+"",
            success: function(response, status, xhr) {
            	alert("Denuncia anonima realizada");
                }
            });
		
	},null);
	
	
}


var CurrentPosition = function(callbacksusessc,error) {
    var success = callbacksusessc;
    var fail = error;
    console.log("Getting geolocation . . .");
    navigator.geolocation.getCurrentPosition(success, fail);
};






