"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { MdArrowDropDown } from "react-icons/md";
import { Fragment } from "react";

type AssetProps = {
  tickers: string[];
  selectedTicker: string;
  weight: string;
  onChangeTicker: (ticker: string) => void;
  onChangeWeight: (weight: string) => void;
};

export default function Asset({
  tickers,
  selectedTicker,
  weight,
  onChangeTicker,
  onChangeWeight,
}: AssetProps) {
  return (
    <div className="flex w-full gap-2">
      <div className="relative w-full">
        <Listbox value={selectedTicker} onChange={onChangeTicker}>
          <div className="relative w-full">
            <ListboxButton
              className="w-full rounded-md border-2 border-gray-300 py-2 pl-3 pr-10 text-left"
            >
              <span className="block truncate">{selectedTicker}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <MdArrowDropDown className="h-5 w-5" />
              </span>
            </ListboxButton>

            <ListboxOptions
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg focus:outline-none"
            >
              {tickers.map((ticker) => (
                <ListboxOption key={ticker} value={ticker} as={Fragment}>
                  {({ selected }) => (
                    <li
                      className={`cursor-pointer select-none py-2 px-3 ${
                        selected
                          ? "bg-emerald-50 text-accent font-medium"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <span className="block truncate">{ticker}</span>
                    </li>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      <input
        type="number"
        step="0.01"
        min="0"
        max="1"
        placeholder="Weight"
        value={weight}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "" || (Number(val) >= 0 && Number(val) <= 1)) {
            onChangeWeight(val);
          }
        }}
        className="w-48 p-2"
      />
    </div>
  );
}