var tblCards = localStorage.tblCards;
$(document).ready(function() {
tblCards = JSON.parse(tblCards);
if(tblCards.length == 0){
    tblCards = exemplo;
}
    carregarDadosIniciais();
});



function salvarRegistro(){
    var checkCores = [];
    $('.check-color').each(function(){
        checkCores.push({"id": $(this).attr('id'), "isChecked":$(this).is(':checked')});
    });
    //TODO: carregar lista de checkBox (Cores)
	var carta = {
		"Id": currentCardEditionId.id,
		"Nome": document.getElementById("txt-nome").value,
		"Edicao": document.getElementById("txt-edicao").value,
		"Tipo": document.getElementById("txt-tipo").value,
		"Cmc": document.getElementById("txt-cmc").value,
        "Ilustrador": document.getElementById("txt-ilustrador").value,
        "Cores": checkCores
    };
    var registroExistente = findCardByID(carta.Id);
    if(registroExistente == null){ //controle de editarExistente/criarNovo
        tblCards.push(carta);
    }
    else{
        tblCards[registroExistente] = carta;
    }
	localStorage.setItem("tblCards", JSON.stringify(tblCards));
	alert("Dados salvos");
    $('#'+currentCardEditionId.nome).text(document.getElementById("txt-nome").value);
    $('#'+currentCardEditionId.edicao).html(document.getElementById("txt-edicao").value);
    return true;
}

function excluirRegistro(objId){
    var card = findCardByID(objId);
    tblCards.splice(card, 1);
    localStorage.setItem("tblCards", JSON.stringify(tblCards));
}

function findCardByID (cardId){
    for(var i = 0; i < tblCards.length; i++){
        if(tblCards[i].Id === cardId)
            return i;
    }
    return null;
}