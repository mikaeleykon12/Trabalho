export default class Consumo {
  #nome;
  #consumo;

  getNome() {
    return this.#nome;
  }

  setNome(nome) {
    this.#nome = nome;
  }

  getMatricula() {
    return this.#consumo;
  }

  setMatricula(consumo) {
    this.#consumo = consumo;
  }

  constructor(nome, matricula) {
    this.#nome = nome;
    this.#consumo = consumo;
  }
}
