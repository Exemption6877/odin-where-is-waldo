import App from "./App";
import GameboardChoice from "./components/Gameboard/GameboardChoice";
import Greeting from "./components/Greeting/Greeting";
import Gameboard from "./components/Game/Gameboard";
import Results from "./components/Results/Results";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Greeting /> },
      { path: "choice", element: <GameboardChoice /> },
      { path: "game/:gameId", element: <Gameboard /> },
      { path: "game/:gameId/results", element: <Results /> },
    ],
  },
];

export default routes;
