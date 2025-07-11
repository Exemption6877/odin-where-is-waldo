import App from "./App";
import GameboardChoice from "./components/Gameboard/GameboardChoice";
import Greeting from "./components/Greeting";

const routes = [
  {
    path: "/",
    component: <App />,
    children: [
      { index: true, element: <Greeting /> },
      { path: "choice", element: <GameboardChoice /> },
    ],
  },
];

export default routes;
