import axios from "axios";
import { Game } from "../interfaces/Game";

export function getGames(): Promise<Game[]> {
  return axios('http://localhost:80/games')
    .then((res) => res.data);
};