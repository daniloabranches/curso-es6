class Repositorio {
  constructor(response) {
    const {
      name,
      description,
      html_url,
      owner: { avatar_url }
    } = response.data;

    this.nome = name;
    this.descricao = description;
    this.urlAvatar = avatar_url;
    this.urlHtml = html_url;
  }
}

export default Repositorio;
