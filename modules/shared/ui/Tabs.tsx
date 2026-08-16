"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface Props {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
}: Readonly<Props>) {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? tabs[0]?.id,
  );

  function selectTab(id: string) {
    setActiveTab(id);
    onChange?.(id);
  }

  return (
    <div className="border-b border-slate-200">

      <nav className="flex gap-2">

        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className={
                active
                  ? "border-b-2 border-blue-600 px-4 py-3 font-semibold text-blue-600"
                  : "border-b-2 border-transparent px-4 py-3 text-slate-500 transition hover:text-slate-900"
              }
            >
              {tab.label}
            </button>
          );
        })}

      </nav>

    </div>
  );
}