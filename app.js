class Sorteio {

	constructor (nome){
		this.nome = nome
	}

	validarDados() {

		for(let i in this) {

			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor () {
		let id = localStorage.getItem('id')

		if (id === null) {
			localStorage.setItem('id',0)
		} 
	}

	getProximoId () {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId)+1
	}

	gravar (d) {
		let id = this.getProximoId()

		localStorage.setItem('id',id)

		localStorage.setItem(id,JSON.stringify(d))
	}

	recuperarTodosRegistros() {

        let listaNomes = Array()

		let id = localStorage.getItem('id')

		let listaNome = JSON.parse(localStorage.getItem(id))

		listaNomes.push(listaNome)

		return listaNomes

	}

	atualizaListaCompleta() {
	
		let listaNomes = Array()
	
			let id = localStorage.getItem('id')
	
			for(let i = 1; i <= id; i++){
	
				let listaNome = JSON.parse(localStorage.getItem(i))

				if(listaNome == null) {
					continue
				}
				
				listaNomes.push(listaNome)
			}
	
			return listaNomes
	}

	pesquisar(lista) {

		console.log(lista)
	}

}

let bd = new Bd()


function cadastrarPessoa() {

	let nome = document.getElementById('nome')


	let sorteio = new Sorteio (
		nome.value)

	if (sorteio.validarDados()) {

		bd.gravar(sorteio)

	/*	Swal.fire({
  			icon: 'success',
  			title: 'Ok!',
  			text: 'Dados registrados',
		})		*/
		nome.value = ''

		if(document.getElementById('nome').value != null) {
			carregaLista()
		}

	} else {

		Swal.fire({
  			icon: 'error',
  			title: 'Oops...',
  			text: 'Dados Inválidos',
  			footer: 'Verifique se o nome foi preenchido corretamente.'
		})
	}
   
}

document.addEventListener("keypress", function(e) {
  if(e.key === 'Enter') {
  
  	const btn = document.querySelector("#enviar");

    btn.click();
  
  }
})

function carregaLista() {
	
	let nomes = Array()

	nomes = bd.recuperarTodosRegistros()

	let listaNomes = document.getElementById('listaNomes')

	let linha = listaNomes.insertRow()

	nomes.forEach(function(d) {

		linha.insertCell(0).innerText = `${d.nome}`
	})
	
}


function limparLista() {

	localStorage.clear()
	location.reload()
}

function sorteio() {

	if(localStorage.getItem('id') > 0) {
	
		let sorteado = JSON.parse(localStorage.getItem(Math.floor(Math.random() * localStorage.getItem('id')) +1)).nome
	

		Swal.fire({
	  			icon: 'success',
	  			title: sorteado
		})
	} else { 

		Swal.fire({
  			icon: 'error',
  			title: 'Oops...',
  			text: 'Verifique se há nomes na lista.'
		})
	}
}

/*
function carregaListaCompleta() {
	
	let listaNomes = Array()

	listaNomes = bd.atualizaListaCompleta()

	let listaNome = document.getElementById('listaNomes')

	listaNomes.forEach(function(d) {

		let linha = listaNome.insertRow()


		linha.insertCell(0).innerText = `${d.nome}`

		let btn = document.createElement("button")
		btn.className = "btn btn-danger"
		btn.innerHTML = '<i class = "fas fa-times"></i>'
		linha.insertCell(1).append(btn)
	})

}*/

function deletaRegistro() {
	
	let deletaRegistro = localStorage.getItem('id')

	alert(deletaRegistro)
}
