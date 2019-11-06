import api from "./api";

import Repositorio from "./Repositorio";
import ItemHtmlRepositorio from "./ItemHtmlRepositorio";

class App {
  constructor() {
    this.repositorios = [];

    this.idSpanCarregando = "spanCarregando";

    this.formularioRepositorios = document.getElementById("frmRepositorios");

    this.registrarEventos();
  }

  registrarEventos() {
    this.formularioRepositorios.onsubmit = event =>
      this.adicionarRepositorio(event);
  }

  async adicionarRepositorio(event) {
    event.preventDefault();

    const nomeRepositorio = document.querySelector(
      "input[name=txtRepositorio]"
    );

    if (nomeRepositorio.value.length === 0) {
      alert("Informe o repositório");
      return;
    }

    try {
      this.exibirMensagemCarregando();

      const response = await api.get(`/repos/${nomeRepositorio.value}`);

      this.adicionarRepositorioListaInterna(response);

      nomeRepositorio.innerHTML = "";

      this.recarregarListaRepositorios();
    } catch (error) {
      alert("O repositório não existe");
    }

    this.removerMensagemCarregando();
  }

  exibirMensagemCarregando() {
    let spanCarregando = document.createElement("span");
    spanCarregando.appendChild(document.createTextNode("Carregando"));
    spanCarregando.setAttribute("id", this.idSpanCarregando);

    this.formularioRepositorios.appendChild(spanCarregando);
  }

  adicionarRepositorioListaInterna(response) {
    this.repositorios.push(new Repositorio(response));
  }

  recarregarListaRepositorios() {
    const lstRepositorios = document.getElementById("lstRepositorios");
    lstRepositorios.innerHTML = "";

    this.repositorios.forEach(repositorio => {
      lstRepositorios.appendChild(
        new ItemHtmlRepositorio(repositorio).obterItemHtmlRepositorio()
      );
    });
  }

  removerMensagemCarregando() {
    document.getElementById(this.idSpanCarregando).remove();
  }
}

export default App;
