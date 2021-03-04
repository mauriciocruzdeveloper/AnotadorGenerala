  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Anotador de Generala',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
        {path: '/anotador/',        url: 'anotador.html',},
        {path: '/index/',        url: 'index.html',},
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var nomPlayer = [];
//VER COMO SE DECLARA CORRECTAMENTE UNA MATRIZ
//VER SI CONVIENE DECLARAR LAS VARIABLES DENTRO DE LOS PAGE INIT CORRESPONDIENTES EN LUGAR DE HACER TODAS GLOBALES
var arrayPuntos = new Array(6);
arrayPuntos[0] = new Array(11);
arrayPuntos[1] = new Array(11);
arrayPuntos[2] = new Array(11);
arrayPuntos[3] = new Array(11);
arrayPuntos[4] = new Array(11);
arrayPuntos[5] = new Array(11);
var puntajePlayer = [];
var cantidadJugadores = 2;

function inicializarVariables(){
    console.log("inicializarVariables");
    for(i=0;i<6;i++){
        for(j=0;j<11;j++){
            arrayPuntos[i][j]=0;
        };
    };

    for(i=0;i<6;i++){
        nomPlayer[i]="";
    };

    for(i=0;i<6;i++){
        puntajePlayer[i]=0;
    };
};


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    inicializarVariables();
});

// Option 1. Using one 'page:init' handler for all pages


$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    console.log('page init index');
    $$("#inJugar").on('click', function() {
        console.log('click en jugar');

        var faltaNombre;
        for(i=0;i<cantidadJugadores;i++){
            if($$("#inomP"+i).val() == ""){
                faltaNombre=true;
                break;
            };
        };

        if(faltaNombre){
            app.dialog.alert("Completa todo los campos","Atención");
        }else{
            for(i=0;i<cantidadJugadores;i++){
                nomPlayer[i] = $$("#inomP"+(i+1)).val();
            };
            mainView.router.navigate('/anotador/');
        };
    });

    $$("#inOpciones").on("change",function(){
 
        cantidadJugadores = $$(this).val();

        var contenidoHTML = "";

        for(i=1;i<=cantidadJugadores;i++){

            console.log("ENTRA AL FOR");

            contenidoHTML+='<div class="list no-hairlines-md">';
            contenidoHTML+='<ul>';
            contenidoHTML+='<li class="item-content item-input">';                    
            contenidoHTML+='<div class="item-inner">';                      
            contenidoHTML+='<div class="item-inner">';                            
            contenidoHTML+='<div class="item-title item-floating-label">Jugador '+i+'</div>';                               
            contenidoHTML+='<div class="item-input-wrap">'; 
            contenidoHTML+='<input id="inomP'+i+'" type="text" placeholder="Nombre del Jugador '+i+'" required />';          
            contenidoHTML+='<span class="input-clear-button"></span>';
            contenidoHTML+='</div>';
            contenidoHTML+='</div>';
            contenidoHTML+='</li>';
            contenidoHTML+='</ul>';
            contenidoHTML+='</div>';
        };

        $$("#inContenedorPlayers").html(contenidoHTML);


    });


});



// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="anotador"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('page init anotador');

    var contenidoHTML = "";
    var etiquetas = ["UNO","DOS","TRES","CUATRO","CINCO","SEIS","ESCALERA","FULL","POKER","GENERALA","D. GENERALA"];

    contenidoHTML+='<div class="row">';
        contenidoHTML+='<div class="col-35">';
            contenidoHTML+='<button class="button button-raised button-fill">JUEGO</button>';
        contenidoHTML+='</div>';
        contenidoHTML+='<div class="col-65">';
            contenidoHTML+='<div class="row">';
            for(j=0;j<cantidadJugadores;j++){
                contenidoHTML+='<div class="col"><button id="anomP'+(j+1)+'" class="button button-raised button-fill">Jugador '+(j+1)+'</button></div>';
            };
            contenidoHTML+='</div>';
        contenidoHTML+='</div>';
    contenidoHTML+='</div>';

    for(i=0;i<11;i++){
        contenidoHTML+='<div class="row">';
        contenidoHTML+='<div class="col-35">'
        contenidoHTML+='<button class="button button-raised button-fill">'+etiquetas[i]+'</button>';
        contenidoHTML+='</div>';
        contenidoHTML+='<div class="col-65">';
        contenidoHTML+='<div class="row">'
        for(j=0;j<cantidadJugadores;j++){
            //ver línea de abajo. hay que considerar que hay dos ac según el juego. ac-1 y ac-2.
            contenidoHTML+='<div class="col"><button data-juego='+(i+1)+' data-player='+(j+1)+' id="anJ'+(i+1)+'P'+(j+1)+'" class="';
            if(i<6){contenidoHTML+='ac-1';}else{contenidoHTML+='ac-2';};
            contenidoHTML+=' button button-raised">-</button></div>';
        };
        contenidoHTML+='</div>';
        contenidoHTML+='</div>';
        contenidoHTML+='</div>';
    };

    contenidoHTML+='<div class="row">';
    contenidoHTML+='<div class="col-35">';
    contenidoHTML+='<button class="button button-raised button-fill">TOTAL</button>';
    contenidoHTML+='</div>';
    contenidoHTML+='<div class="col-65">';
    contenidoHTML+='<div class="row">'
    for(j=0;j<cantidadJugadores;j++){
        contenidoHTML+='<div class="col"><button id="anTotP'+(j+1)+'" class="button button-raised">-</button></div>';
    };
    contenidoHTML+='</div></div></div>';

    $$("#anAnotador").html(contenidoHTML);


    for(i=0;i<cantidadJugadores;i++){
        $$("#anomP"+(i+1)).text(nomPlayer[i]);
    };

    function calcularPuntaje(){
        console.log('calcularPuntaje');
        for(i=0;i<cantidadJugadores;i++){
            puntajePlayer[i]=0;
        };
        
        for(j=0;j<cantidadJugadores;j++){
            for(var i=0; i<11; i++){
                puntajePlayer[j]+=arrayPuntos[j][i];
            };
        };


    };

    function limpiarAnotador(){
        //PARA AGREGAR LOS GUIONES SE PODRÍAN AGREGAR UNA CLASE A TODOS LOS ELEMENTOS A LOS CUALES HAY QUE
        //ASIGNARLES UN GUION. ASÍ SÓLO CON SELECCIONAR ESA CLASE LE MODIFICO MEDIANTE TEXT
        console.log('limpiarAnotador');
        for(i=0;i<11;i++){
            for(j=0;j<cantidadJugadores;j++){
                $$("#anJ" + (i+1) + "P" + (j+1)).text("-");
                arrayPuntos[j][i] = 0;
            };
        };
        for(j=1;j<=cantidadJugadores;j++){
            $$("#anTotP"+j).text("-");
        };
    };

    function asignarPuntos(juego, player, seleccion){
        console.log('asignarPuntos');
        var operador1 = 0;
        var puntos = 0;

        switch(juego){
            case 1: operador1 = 1; break;
            case 2: operador1 = 2; break;
            case 3: operador1 = 3; break;
            case 4: operador1 = 4; break;
            case 5: operador1 = 5; break;
            case 6: operador1 = 6; break;
            case 7: operador1 = 5; break;
            case 8: operador1 = 7; break;
            case 9: operador1 = 9; break;
            case 10: operador1 = 11; break;
            case 11: operador1 = 13; break;
        };

        switch(seleccion){
            case "Servido": puntos = operador1 * 5; break;
            case "No Servido": puntos = operador1 * 5 - 5; break;
            case "Tachar": puntos = 0; break;
            case "Uno": puntos = operador1 * 1; break;
            case "Dos": puntos = operador1 * 2; break;
            case "Tres": puntos = operador1 * 3; break;
            case "Cuatro": puntos = operador1 * 4; break;
            case "Cinco": puntos = operador1 * 5; break;
            case "Seis": puntos = operador1 * 6; break;
        };

        arrayPuntos[player-1][juego-1] = puntos;

        var texto = "";
        if(seleccion=="Tachar"){texto = "x"}else{texto = puntos};
        $$("#anJ" + juego + "P" + player).text(texto);

        calcularPuntaje();

        for(j=0;j<cantidadJugadores;j++){
            $$("#anTotP"+(j+1)).text(puntajePlayer[j]);
        };

    };

    $$("#anTerminar").on('click', function() {
        console.log('click en terminar');
        calcularPuntaje();

        var textoAlert = "";
        for(j=0;j<cantidadJugadores;j++){
            textoAlert+=nomPlayer[j] + " : " + puntajePlayer[j] + "<br/>";
        };

        app.dialog.confirm(textoAlert,"Puntuaciones",function(){
            inicializarVariables();
            limpiarAnotador();
            mainView.router.navigate('/index/');
        });
    });

    $$("#anFlechaBack").on('click', function() {
        console.log('click en flecha back');
        app.dialog.confirm("","¿Volver? Se borrarán los puntos",function(){
            limpiarAnotador();
            mainView.router.navigate('/index/');
        });
    });


    $$("#anLimpiar").on('click', function() {
        console.log('click en limpiar');
        app.dialog.confirm(" ","¿Limpiar anotador?",function(){
            console.log('LIMPIAR ANOTADOR');
            limpiarAnotador();
        });
    });

    $$(".ac-1").on("click",function(){
        console.log('click en botones ac-1');

//saco los datos de data-juego y data-player

        var juego = parseInt($$(this).data("juego"));
        var player = parseInt($$(this).data("player"));

        var ac1 = app.actions.create({
            buttons: [
                {
                    text: 'Dado ' + juego,
                    label: true
                },
                {
                    text: 'Uno',
                    onClick: function(){
                        console.log('selecciona el juego Uno');
                        asignarPuntos(juego, player, 'Uno');
                    }
                },
                {
                    text: 'Dos',
                    onClick: function(){
                        console.log('selecciona el juego Dos');
                        asignarPuntos(juego, player, 'Dos');
                    }
                },
                {
                    text: 'Tres',
                    onClick: function(){
                        console.log('selecciona el juego Tres');
                        asignarPuntos(juego, player, 'Tres');
                    }
                },
                {
                    text: 'Cuatro',
                    onClick: function(){
                        console.log('selecciona el juego Cuatro');
                        asignarPuntos(juego, player, 'Cuatro');
                    }
                },
                {
                    text: 'Cinco',
                    onClick: function(){
                        console.log('selecciona el juego Cinco');
                        asignarPuntos(juego, player, 'Cinco');
                    }
                },
                {
                    text: 'Tachar',
                    onClick: function(){
                        console.log('selecciona el juego Tachar');
                        asignarPuntos(juego, player, 'Tachar');
                    }
                },
            ]
        });


        ac1.open();
    });

    $$(".ac-2").on("click",function(){
        console.log('click en botones ac-2');

        var juego = parseInt($$(this).data("juego"));
        var player = parseInt($$(this).data("player"));
        var juegoText = "";

        switch(juego){
            case 7:
                juegoText = "Escalera";
                break;
            case 8:
                juegoText = "Full";
                break;
            case 9:
                juegoText = "Poker";
                break;
            case 10:
                juegoText = "Generala";
                break;
            case 11:
                juegoText = "D. Generala";
                break;
        };

        var ac2 = app.actions.create({
                buttons: [
                    {
                        text: 'Juego ' + juegoText,
                        label: true
                    },
                    {
                        text: 'Servido',
                        onClick: function(){
                            console.log('selecciona el juego Servido');
                            asignarPuntos(juego, player, 'Servido');
                        }
                    },
                    {
                        text: 'No Servido',
                        onClick: function(){
                            console.log('selecciona el juego No Servido');
                            asignarPuntos(juego, player, 'No Servido');
                        }
                    },
                    {
                        text: 'Tachar',
                        onClick: function(){
                            console.log('selecciona el juego Tachar');
                            asignarPuntos(juego, player, 'Tachar');
                        }
                    },
                ],
                
            });

        ac2.open();
    });
});

