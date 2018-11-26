var table = document.getElementById("table-cartas");
var numeroDeLinhas  = table.rows.length;
var currentCardEditionId;

function adicionar() {
	numeroDeLinhas++;
	var row = table.insertRow(table.rows.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = '<div id="card-id-'+(numeroDeLinhas - 1).toString()+'">'+(numeroDeLinhas - 1).toString()+'</div>';
	cell2.innerHTML = '<div id="card-name-'+(numeroDeLinhas - 1).toString()+'">-</div>';
	cell3.innerHTML = '<div id="card-edic-'+(numeroDeLinhas - 1).toString()+'">-</div>';
	cell4.innerHTML = '<button type="button" class="btn btn-primary btn-edit" id="btn-editar-'+(numeroDeLinhas - 1).toString()+'">Editar</button>';
	cell5.innerHTML = '<button type="button" class="btn btn-danger" id="btn-excluir-'+(numeroDeLinhas - 1).toString()+'" onclick="excluir(this)">Excluir</button>';
	
	var idDosCampos = JSON.stringify({"id":"card-id-"+(numeroDeLinhas - 1).toString(), "nome":"card-name-"+(numeroDeLinhas - 1).toString(),"edicao": "card-edic-"+(numeroDeLinhas - 1).toString()});
	$('#btn-editar-'+(numeroDeLinhas - 1).toString()).attr({'value': idDosCampos});
	$('#btn-excluir-'+(numeroDeLinhas - 1).toString()).attr({'value': idDosCampos});
	
	$('#btn-editar-'+(numeroDeLinhas - 1).toString()).on('click', function(){
		limparModalEdicao();
		currentCardEditionId = JSON.parse($(this).val());

		var registroExistente = findCardByID(currentCardEditionId.id);

		if(registroExistente != null){ //carregando dados já salvos
			var card = tblCards[registroExistente];
			$('#txt-nome').val(card.Nome);
			$('#txt-edicao').val(card.Edicao);
			$('#txt-cmc').val(card.Cmc);
			$('#txt-ilustrador').val(card.Ilustrador);
			$('#txt-tipo').val(card.Tipo);
			for(var i = 0; i < card.Cores.length; i++){
				if(card.Cores[i].isChecked){
					$('#'+card.Cores[i].id).prop("checked", true);
				}
			}
		}

		$('#modal-detalhes').modal('show');
	});
}
			
function excluir(o) {
	currentCardEditionId = JSON.parse(o.value);
	excluirRegistro(currentCardEditionId.id);
	var p=o.parentNode.parentNode;
	p.parentNode.removeChild(p);
}

function changeProfile() {
	$('#image').click();
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.readAsDataURL(input.files[0]);
		reader.onload = function (e) {
			$('#preview').attr('src', e.target.result);
		};
	}
}

function removeImage() {
    $('#preview').attr('src', 'noimage.jpg');
}

function limparModalEdicao() {
	$("#txt-nome").val("");
	$("#txt-edicao").val("");
	$("#txt-tipo").val("");
	$("#txt-cmc").val("");
	$("#txt-ilustrador").val("");

	$('.check-color').each(function(){
        $(this).prop( "checked", false );
    });
}

function carregarDadosIniciais(){
	var row = '';
	var card;
	for(var i = 0; i < tblCards.length; i++){
		card = tblCards[i];
		var cardId = card.Id[8];
		row = '<tr>';
		row += '<td><div id="'+cardId+'">'+cardId+'</div></td>';
		row += '<td><div id="card-name-'+cardId+'">'+card.Nome+'</div></td>';
		row += '<td><div id="card-edic-'+cardId+'">'+card.Edicao+'</div></td>';
		row += '<td><button type="button" class="btn btn-primary btn-edit" id="btn-editar-'+cardId+'">Editar</button></td>';
		row += '<td><button type="button" class="btn btn-danger" id="btn-excluir-'+cardId+'" onclick="excluir(this)">Excluir</button></td>';
		row += '</tr>';
		$('#table-cartas > tbody:last-child').append(row);

		var idDosCampos = JSON.stringify({"id":"card-id-"+cardId, "nome":"card-name-"+cardId,"edicao": "card-edic-"+cardId});
		$('#btn-editar-'+cardId).attr({'value': idDosCampos});
		$('#btn-excluir-'+cardId).attr({'value': idDosCampos});

		$('#btn-editar-'+cardId).on('click', function(){
			limparModalEdicao();
			currentCardEditionId = JSON.parse($(this).val());
	
			var registroExistente = findCardByID(currentCardEditionId.id);
	
			if(registroExistente != null){ //carregando dados já salvos
				var card = tblCards[registroExistente];
				$('#txt-nome').val(card.Nome);
				$('#txt-edicao').val(card.Edicao);
				$('#txt-cmc').val(card.Cmc);
				$('#txt-ilustrador').val(card.Ilustrador);
				$('#txt-tipo').val(card.Tipo);
				for(var i = 0; i < card.Cores.length; i++){
					if(card.Cores[i].isChecked){
						$('#'+card.Cores[i].id).prop("checked", true);
					}
				}
			}
	
			$('#modal-detalhes').modal('show');
		});
		numeroDeLinhas++;
	}
}

$('#btn-imagem').click(function(e){
      e.preventDefault();
});

$('#btn-confirm-modal').click(function(){
	salvarRegistro();
});

$('#image').change(function () {
	var imgPath = this.value;
	var ext = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
	if (ext == "gif" || ext == "png" || ext == "jpg" || ext == "jpeg")
		readURL(this);
	else{
		alert("Por favor, escolha um arquivo de imagem (jpg, jpeg, png).")
		removeImage();
	}
});

$(document).ready(function(){
	$("#txt-filtrar").on("keyup", function() {
	  var value = $(this).val().toLowerCase();
	  $("#table-cartas tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	  });
	});
  });

