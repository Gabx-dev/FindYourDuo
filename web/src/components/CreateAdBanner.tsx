import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from "./CreateAdModal";

export function CreateAdBanner() {
  return (
    <Dialog.Root><div className="self-stretch rounded-lg mt-8 overflow-hidden bg-[#2A2634] px-8 py-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl text-white font-black block">Não encontrou seu duo?</h2>
        <p className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</p>
      </div>

      <Dialog.DialogTrigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
        <MagnifyingGlassPlus size={24} />
        Publicar anúncio
      </Dialog.DialogTrigger>

      <CreateAdModal />
    </div></Dialog.Root>
  );
}