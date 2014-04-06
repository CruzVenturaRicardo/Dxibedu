var res = [];
var x = [];
var next = [];
var selectEntidad;
var selectResultado;
var selectDominio;
var selectResultado;
var ent;
var dom;
var a;
var anio;
var dominio;
	

function getDataAll(cons)
{
    selectEntidad = document.getElementById("entidad");
    selectResultado = document.getElementById("anio");
    ent = "\'" + selectEntidad.options[selectEntidad.selectedIndex].value + "\'";
    a = "\'" + selectResultado.options[selectResultado.selectedIndex].value + "\'";
	
    var data=new Array();
	var c=new Array(); 
	
    $.ajax({
        type: "GET",
        url: 'http://procuxd.esy.es/lalala.php',
        data: "cons="+cons,
		success: function(response, status, xhr) {
			$.each(response, function(obj) {
				if(this[1]!==null)
					if(c[this[1].split('-')[0]])
						c[this[1].split('-')[0]]++;
					else
						c[this[1].split('-')[0]]=1;
					real=response;
            });
			var data= new Array();
			var labels=new Array();
			for(var key in c){
				labels.push(key);
				data.push(c[key]);
			}
			drawsBarra(data,labels);
        },
        error: function(xml) {
            alert("error");
        }
		
		
    });
}

	
	

function getData(cons)
{
    selectEntidad = document.getElementById("entidad");
    selectResultado = document.getElementById("anio");
    ent = "\'" + selectEntidad.options[selectEntidad.selectedIndex].value + "\'";
    a = "\'" + selectResultado.options[selectResultado.selectedIndex].value + "\'";
	
    var data=new Array();
	var c=0; 
	
    $.ajax({
        type: "GET",
        url: 'http://procuxd.esy.es/lalala.php',
        data: "cons="+cons,
		success: function(response, status, xhr) {
			real=response;
			$.each(response, function() {
				c++;
            });
	
	data.push(c);
			drawsBarra(data);
			
        },
        error: function(xml) {
            alert("error");
        }
		
		
    });
}


function getData2(cons)
{
   var meses=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    var data=new Array();
	var c=0; 
    $.ajax({
        type: "GET",
        url: 'http://procuxd.esy.es/lalala.php',
        data: "cons="+cons,
		success: function(response, status, xhr) {
			real=response;
			var personas=document.getElementById("personas");
			for(var obj=0;obj<response.length && obj<5;obj++){
				var hijo=document.createElement("li");
					var datos='<span class="date">'+meses[response[obj][1].split('-')[1]-1]+'<strong>'+response[obj][1].split('-')[2]+'</strong></span>';
					datos+='<h3><a href="#">'+response[obj][0]+'</a></h3>';
					datos+='<p>'+response[obj][2]+'</p>';
				console.log(response[obj][0]);
				hijo.innerHTML=datos;
				personas.appendChild(hijo);
			}
        },
        error: function(xml) {
            alert("error");
        }
		
		
    });
	

}


function drawsBarra(l,labels) {

    $('#container').highcharts({
		chart: {
            type: 'column',
			backgroundColor:'#000'
		},
        title: {
			color:"#FFF",
            text: 'Gráfica de Resultados',
			font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
        },
        subtitle: {
            text: 'Gráfica de Resultados',
			style: {
					color: '#fff',
					fontWeight: 'bold',
					font: '20px Century Gothic, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
				}
        },
        xAxis: {
            categories: labels,
			labels:{ 
			style: {
				color: '#fff',
				fontWeight: 'bold'
			}
			}
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor en %'
            },
			labels:{
				style: {
					color: '#fff',
					fontWeight: 'bold'
				}
			}
        },
		 
      
        tooltip: {
            headerFormat: '<span style="font-size:16px; align:center;">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">Valor: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
			backgroundColor:'#000',
            shared: true,
            useHTML: true,
			animation: true,
			style: {
                padding: 10,
                fontWeight: 'bold',
				color:"#fff"
				
            }
 	       },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
			 series: {
                shadow: true,
				 states: {
                    hover: {
                        brightness: 0.1
                    }
				}
            }
        },
		
        series: [{
                name: 'Estado',
                data: l,
				color:'#0D74EB'

            }]
    });

}
