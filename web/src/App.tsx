import { useEffect, useState } from 'react';

// Components
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

// Styles and assets
import './styles/main.css';
import logo from './assets/logo-nlw-esports.svg'

// Services
import { getGames } from './services/GameService';

// Types
import { Game } from './interfaces/Game';


function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    getGames().then(data => setGames(data))
  });

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <header>
        <img
          src={logo}
          alt="" />
        <h1 className="text-6xl text-white font-semibold-">
          Seu <span className="font-black">duo</span> está aqui
        </h1>
      </header>

      <main>
        <ul className="grid grid-cols-6 gap-6">
          {games.map(game => {
            return (
              <GameBanner
                key={game.id}
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads} />
            );
          })}
        </ul>
      </main>

      <CreateAdBanner />
    </div>
  );
}

export default App
