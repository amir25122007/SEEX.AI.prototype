"use client";

import { useId, useState, type FormEvent } from "react";
import { AngleDownIcon, ArrowUpRightIcon, LayerGroupIcon, PaperclipIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export const quickPrompts = [
  "Презентация",
  "Карточка товара",
  "Резюме",
  "Отчёт в Excel",
  "Обработка фото",
] as const;

const PLACEHOLDER = "Опишите задачу, например: презентация для инвесторов на 10 слайдов";

type PromptComposerProps = {
  className?: string;
};

/**
 * Prompt composer + quick prompt chips — Figma composerShell (1394:4333)
 * and the chip row (1394:4348). Visual only: submit does nothing yet.
 *
 * Positioned by the Hero; the block is 735px wide (shell) and the chip row
 * sits 41.34px below the shell (887.07 − 653.10 − 192.73).
 */
export function PromptComposer({ className }: PromptComposerProps) {
  const [prompt, setPrompt] = useState("");
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className={cn("flex w-[735px] flex-col items-center", className)}>
      <form
        onSubmit={handleSubmit}
        // Shell: white 16 %, white 34 % 1.04px inside stroke, r 41.41, padding 14.49,
        // background blur 24.85 (CSS 12.43).
        className="w-full rounded-[41.41px] bg-white/16 p-[14.49px] shadow-[inset_0_0_0_1.04px_rgb(255_255_255/0.34)] backdrop-blur-[12.43px]"
      >
        <div className="flex h-[161.68px] flex-col gap-[8.28px] overflow-hidden rounded-[22.77px] bg-white pt-[20.7px] pr-[8.28px] pb-[8.28px] pl-[20.7px] shadow-[0_8.28px_28.99px_rgb(102_26_0/0.18)]">
          <label htmlFor={inputId} className="sr-only">
            Опишите задачу
          </label>
          <textarea
            id={inputId}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder={PLACEHOLDER}
            rows={3}
            className="h-[83px] w-full resize-none bg-transparent pr-[12.42px] font-sans text-[16.56px] leading-[24.85px] text-[#1a1a23] outline-none placeholder:text-soft"
          />

          <div className="flex h-[41.41px] items-center gap-[8.28px]">
            <button
              type="button"
              aria-label="Прикрепить файл"
              className="flex size-[37.27px] shrink-0 items-center justify-center rounded-full text-soft transition-opacity duration-200 hover:opacity-70"
            >
              <PaperclipIcon className="h-[15.25px] w-[13.34px]" />
            </button>

            <button
              type="button"
              className="flex h-[30.02px] shrink-0 items-center gap-[6.21px] rounded-full bg-[#ffede6] px-[10.35px] font-sans text-[12.42px] leading-[16.56px] font-medium text-[#d4460e] shadow-[inset_0_0_0_1.04px_#f0c9b4]"
            >
              <span className="flex size-[16.56px] items-center justify-center">
                <LayerGroupIcon className="h-[14.07px] w-[13.8px]" />
              </span>
              Сценарии
            </button>

            <button
              type="button"
              className="flex h-[30.02px] shrink-0 items-center gap-[6.21px] rounded-full bg-[#f6f2ee] px-[10.35px] font-sans text-[12.42px] leading-[16.56px] font-medium text-[#1a1a23] shadow-[inset_0_0_0_1.04px_#e6deed]"
            >
              Модель: авто
              <span className="flex size-[14.49px] items-center justify-center text-soft">
                <AngleDownIcon className="h-[3.77px] w-[6.37px]" />
              </span>
            </button>

            <span className="flex-1" />

            <button
              type="submit"
              aria-label="Отправить"
              className="flex size-[41.41px] shrink-0 items-center justify-center rounded-[26.92px] bg-lime text-black shadow-[0_0_18.63px_rgb(194_239_75/0.5)] transition-[filter] duration-200 hover:brightness-105"
            >
              <span className="flex size-6 items-center justify-center">
                <ArrowUpRightIcon className="size-[12.43px]" />
              </span>
            </button>
          </div>
        </div>
      </form>

      <ul className="mt-[43.35px] flex h-[37.98px] w-[722px] items-center justify-center gap-[14.05px]">
        {quickPrompts.map((label) => (
          <li key={label}>
            <button
              type="button"
              onClick={() => setPrompt(label)}
              className="flex h-[37.98px] items-center rounded-full bg-lime px-[18.88px] text-[15px] leading-normal font-normal whitespace-nowrap text-ink shadow-[0_4px_16px_rgb(194_240_74/0.45)] transition-[filter] duration-200 hover:brightness-105"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
