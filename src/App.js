import api from "./api";

import Repositorio from "./Repositorio";

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
      let itemRepositorio = this.criarItemRepositorio(repositorio);
      lstRepositorios.appendChild(itemRepositorio);
    });
  }

  criarItemRepositorio(repositorio) {
    let imagemRepositorio = this.criarImagemRepositorio(repositorio);
    let tituloRepositorio = this.criarTituloRepositorio(repositorio);
    let descricaoRepositorio = this.criarDescricaoRepositorio(repositorio);
    let linkRepositorio = this.criarLinkRepositorio(repositorio);

    let itemRepositorio = document.createElement("li");
    itemRepositorio.appendChild(imagemRepositorio);
    itemRepositorio.appendChild(tituloRepositorio);
    itemRepositorio.appendChild(descricaoRepositorio);
    itemRepositorio.appendChild(linkRepositorio);

    return itemRepositorio;
  }

  criarImagemRepositorio(repositorio) {
    const imagemRepositorio = document.createElement("img");
    imagemRepositorio.setAttribute("src", repositorio.urlAvatar);
    return imagemRepositorio;
  }

  criarTituloRepositorio(repositorio) {
    const tituloRepositorio = document.createElement("strong");
    tituloRepositorio.appendChild(document.createTextNode(repositorio.nome));
    return tituloRepositorio;
  }

  criarDescricaoRepositorio(repositorio) {
    const descricaoRepositorio = document.createElement("p");
    descricaoRepositorio.appendChild(
      document.createTextNode(repositorio.descricao)
    );
    return descricaoRepositorio;
  }

  criarLinkRepositorio(repositorio) {
    const linkRepositorio = document.createElement("a");
    linkRepositorio.setAttribute("target", "_blank");
    linkRepositorio.setAttribute("href", repositorio.urlHtml);
    linkRepositorio.appendChild(document.createTextNode("Acessar"));
    return linkRepositorio;
  }

  removerMensagemCarregando() {
    document.getElementById(this.idSpanCarregando).remove();
  }
}

export default App;
