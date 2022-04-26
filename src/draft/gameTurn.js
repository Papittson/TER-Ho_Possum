function action(creature) {}

function gameTurn(players) {
  //const randomPlayers = ? randomize playerList
  for (let player of players) {
    //randomize player.creature list
    for (let creature of players.creature) {
      action(creature);
    }
  }
}

function startTurns(players) {
  gameTurn(players);
}
