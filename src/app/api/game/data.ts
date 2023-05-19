class Player {
  public uuid: string;
  public name: string;

  constructor(name: string) {
    this.uuid = Math.floor(Math.random() * 9000000000) + 1000000000 + "";
    this.name = name;
  }
}

class Game {
  public id: number;
  public players: Player[] = [];

  constructor() {
    this.id = Math.floor(Math.random() * 900) + 100;
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(player: Player) {
    this.players = this.players.filter((p) => p !== player);
  }
}

class Data {
  activeGames: Game[] = [];

  createGame() {
    this.activeGames.push(new Game());
  }

  getGame(id: number) {
    return this.activeGames.find((g) => g.id === id);
  }

  getGames() {
    return this.activeGames;
  }

  joinGame(id: number, name: string): Player | null {
    const game = this.getGame(id);
    const player = new Player(name);
    if (!game) return null;
    game.addPlayer(player);
    return player;
  }
}

export class GameData {
  private static _instance: GameData;
  private data: Data = new Data();
  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public static get instance() {
    return this._instance.data || (this._instance = new this()).data;
  }
}
