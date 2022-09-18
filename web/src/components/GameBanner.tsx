import React from "react"

interface GameBannerProps {
  title: string,
  bannerUrl: string,
  adsCount: number
}
export function GameBanner(props: GameBannerProps) {
  return (<li className="relative rounded-lg overflow-hidden">
    <a href="">
      <img src={props.bannerUrl} alt=""/>
      <div className="w-full pt-16 pb-4 px-4 absolute bottom-0 left-0 right-0">
        <div className="font-bold text-white block">{props.title}</div>
        <span className="text-zinc-300 text-sm block">{props.adsCount} anúncios</span>
      </div>
    </a>
  </li>);
}