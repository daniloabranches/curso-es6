class ItemHtmlRepositorio {
  constructor(repositorio) {
    this.repositorio = repositorio;

    this.criarItemRepositorio();
  }

  obterItemHtmlRepositorio() {
    return this.itemHtmlRepositorio;
  }

  criarItemRepositorio() {
    let imagemRepositorio = this.criarImagemRepositorio(this.repositorio);
    let tituloRepositorio = this.criarTituloRepositorio(this.repositorio);
    let descricaoRepositorio = this.criarDescricaoRepositorio(this.repositorio);
    let linkRepositorio = this.criarLinkRepositorio(this.repositorio);

    let itemHtmlRepositorio = document.createElement("li");
    itemHtmlRepositorio.appendChild(imagemRepositorio);
    itemHtmlRepositorio.appendChild(tituloRepositorio);
    itemHtmlRepositorio.appendChild(descricaoRepositorio);
    itemHtmlRepositorio.appendChild(linkRepositorio);

    this.itemHtmlRepositorio = itemHtmlRepositorio;
  }

  criarImagemRepositorio() {
    const imagemRepositorio = document.createElement("img");
    imagemRepositorio.setAttribute("src", this.repositorio.urlAvatar);
    return imagemRepositorio;
  }

  criarTituloRepositorio() {
    const tituloRepositorio = document.createElement("strong");
    tituloRepositorio.appendChild(
      document.createTextNode(this.repositorio.nome)
    );
    return tituloRepositorio;
  }

  criarDescricaoRepositorio() {
    const descricaoRepositorio = document.createElement("p");
    descricaoRepositorio.appendChild(
      document.createTextNode(this.repositorio.descricao)
    );
    return descricaoRepositorio;
  }

  criarLinkRepositorio() {
    const linkRepositorio = document.createElement("a");
    linkRepositorio.setAttribute("target", "_blank");
    linkRepositorio.setAttribute("href", this.repositorio.urlHtml);
    linkRepositorio.appendChild(document.createTextNode("Acessar"));
    return linkRepositorio;
  }
}

export default ItemHtmlRepositorio;
