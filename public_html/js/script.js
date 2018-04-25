/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function dragstart(event){
    event.dataTransfer.setData("text", $(this).attr("id"));
    $("#info_przeniesienie").fadeIn();
}
function dragend(event){
    $("#info_przeniesienie").fadeOut();
}
$(document).ready(function(){
    
    //Zdarzenie hover przyjmuje dwie funkcjię, jedną która jest wywołana kiedy ktoś najedzie, a druga kiedy opuści element
    
    $(".przedmioty").hover(function() 
    {
        $(".opis", this).fadeIn();
    },
    function()
    {
        $(".opis", this).fadeOut();
    }).dragstart(function(event) // jak zaczniemy przeciaganie
    {
       event.dataTransfer.setData("text", $(this).attr("id")); 
       $("#info_przeniesienie").fadeIn();
    }).dragend(function(){
       $("#info_przeniesienie").fadeOut();
    });
    
    //aby odwołać się do odmyślnego koloru, trzeba stworzyć zmienną, 
    //która będzi eprzechowywała wartośc atrybutu backgorund-color:
    
    var default_color = $("#koszyk").css("background-color"); //przypisujemy wartość atrybutu bkgrd-clr do zmiennej
    
    $("#koszyk").dragover(function(event){
        event.preventDefault();
        $(this).css("background-color", "teal");
    }).dragleave(function(event){
        $(this).css("background-color", default_color);     //odnosimy sie do domyślnego koloru, dzięki temu zabiegowi jezeli
                                                            //ktoś zmieni wartość w pliku CSS, to zmieni sie ona również tu
    }).drop(function(event)
    {
       event.preventDefault();
       $(this).css("background-color", default_color);
       var idElementu = event.dataTransfer.getData("text");
       var nazwa = $("#"+idElementu+" .nazwa").text(); //od idElementu poszukujemy takiego elementu, który ma klasę class="nazwa"
       var cena = $("#"+idElementu+" .cena").text(); // pobieramy element nazwa i cena
//       alert(nazwa);
    //Tworzymy kolejno nowy list item, który pozwoli nam dodawać do koszyka elementy, tworymy zatem w html ul i dajemy id="koszyk_sklepowy"
    
       var li = "<li class='produkt_w_koszyku'><b>"+ nazwa +"</b><span class='cena_w_koszyku'>"+ cena +" zł</span></li>" ;
        
        $("#koszyk_sklepowy").append(li);
        
        //koncowo chcemy aby nasze ceny się sumowały, musimy zatem przejść po wszystkich  elementach, służy do tego funkcja each
        // trzeba takze stworzyć zmienną która będzie zbierała siebie i dodawan element:
        var suma = 0;
        $("#koszyk_sklepowy .cena_w_koszyku").each(function(){
            suma += parseFloat($(this).text()); //przypisujemy daną(this) zawartość ceny do sumy, ale trzeba ja sparsować na floaty!
        //kiedy zostanie to juz policzone trzbea wejść do spana i do ceny i podmienić zwartość
        $("#cena span").text(suma.toFixed(2)); //jako text przypisujemy naszą sumę, która jest zaokrąglona do 2 miejsc po przecinku
        });
    });
});






