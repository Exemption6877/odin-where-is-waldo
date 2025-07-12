import App from "./App";
import GameboardChoice from "./components/Gameboard/GameboardChoice";
import Greeting from "./components/Greeting";
import Gameboard from "./components/Gameboard/Gameboard";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Greeting /> },
      { path: "choice", element: <GameboardChoice /> },
      { path: "game/:gameId", element: <Gameboard /> },
    ],
  },
];

export default routes;
