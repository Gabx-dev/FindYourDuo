import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

// Components
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from 'phosphor-react';
import { Input } from './form/Input';

// Services
import { getGames } from '../services/GameService';

// Interfaces
import { Game } from '../interfaces/Game';

export function CreateAdModal() {
  const handleCreateAdSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:80/games/${data.game}/ads`, {
        name: data['player-name'],
        discord: data.discord,
        yearsPlaying: parseInt(data['years-playing'].toString()),
        weekDays: weekDays.map((value) => parseInt(value)),
        startTime: data['start-time'],
        endTime: data['end-time'],
        usesVoiceChannel: usesVoiceChannel
      });
      alert('Anúncio criado com sucesso');
    } catch (e) {
      alert('Erro ao criar o anúncio')
      console.log(e);
    }
  }

  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [usesVoiceChannel, setUsesVoiceChannel] = useState<boolean | 'indeterminate'>();

  useEffect(() => {
    getGames().then(data => setGames(data))
  })

  return (
    <Dialog.DialogPortal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] text-white py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
        <Dialog.Title className="text-4xl font-black">Publique um anúncio</Dialog.Title>
        <form
          onSubmit={handleCreateAdSubmit}
          title="Anúncio"
          className="mt-8 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Game</label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 -x-4 rounded text-sm placeholder:text-zinc-500">
              <option disabled selected>Selecione o game que deseja jogar</option>
              {games.map((game) => {
                return <option value={game.id}>{game.title}</option>
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="player-name">Seu nome ou nickname</label>
            <Input id="player-name" name="player-name" placeholder="Como te chamam dentro do game" />
          </div>

          <div className="grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="years-playing">Anos jogando</label>
              <Input id="years-playing" name="years-playing" type="number" placeholder="Tudo bem ser zero" />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Discord</label>
              <Input id="discord" name="discord" placeholder="Usuário#12345" />
            </div>
          </div>

          <div className="flex gap-6">
            <fieldset
              title="Quando costuma jogar?"
              className="flex flex-col gap-2">
              <label>Quando costuma jogar?</label>
              <ToggleGroup.Root type="multiple" className="gap-2 grid grid-cols-4"
                defaultValue={[]}
                onValueChange={setWeekDays}>
                <ToggleGroup.Item value="0"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-500'}`}
                  aria-label="Segunda-feira"
                  title="Segunda-feira">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value="1"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-500'}`}
                  aria-label="Terça-feira"
                  title="Terça-feira">
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item value="2"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-500'}`}
                  aria-label="Quarta-feira"
                  title="Quarta-feira">
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item value="3"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-500'}`}
                  aria-label="Quinta-feira"
                  title="Quinta-feira">
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item value="4"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-500'}`}
                  aria-label="Sexta-feira"
                  title="Sexta-feira">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value="5"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-500'}`}
                  aria-label="Sábado"
                  title="Sábado">
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item value="6"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  aria-label="Domingo"
                  title="Domingo">
                  D
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </fieldset>

            <fieldset
              title="Qual horário do dia?"
              className="flex-1">
              <label>Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input id="start-time" name="start-time" type="time" placeholder="De" title="De" />
                <Input id="end-time" name="end-time" type="time" placeholder="Até" title="Até" />
              </div>
            </fieldset>
          </div>

          <div className="mt-2 flex gap-2 items-center">
            <Checkbox.Root
              id="uses-voice-channel"
              className="w-6 h-6 rounded bg-zinc-900"
              onCheckedChange={(checked) => setUsesVoiceChannel(checked === true ? checked : false)}>
              <Checkbox.CheckboxIndicator>
                <Check className="w-4 h-4 text-emerald-400 p-1" />
              </Checkbox.CheckboxIndicator>
            </Checkbox.Root>
            <label
              htmlFor="uses-voice-channel"
              className="text-sm">Costumo me conectar ao chat de voz</label>
          </div>

          <footer className="mt-4 justify-end">
            <div className="flex gap-4">
              <Dialog.Close className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold">
                Cancelar
              </Dialog.Close>
              <button type="submit" className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3">
                <GameController size="24" />
                Encontrar duo
              </button>
            </div>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.DialogPortal>
  );
}