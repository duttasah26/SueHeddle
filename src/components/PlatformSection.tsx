"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PlatformSection() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: "architecture",
      nameKey: "platform.card1Name",
      descKey: "platform.card1Desc",
      items: ["platform.card1Item1", "platform.card1Item2"],
    },
    {
      icon: "commute",
      nameKey: "platform.card2Name",
      descKey: "platform.card2Desc",
      items: ["platform.card2Item1", "platform.card2Item2"],
    },
    {
      icon: "campaign",
      nameKey: "platform.card3Name",
      descKey: "platform.card3Desc",
      items: ["platform.card3Item1", "platform.card3Item2"],
    },
  ];

  return (
    <section id="vision" className="platform">
      <div className="platform-inner">
        <h2 className="platform-heading">
          {t("platform.heading")}<span className="accent">{t("platform.headingAccent")}</span>
        </h2>
        <div className="platform-grid">
          {cards.map(({ icon, nameKey, descKey, items }) => (
            <div className="platform-card" key={nameKey}>
              <span className="material-symbols-outlined platform-icon">{icon}</span>
              <h3 className="platform-card-title">{t(nameKey)}</h3>
              <p className="platform-card-desc">{t(descKey)}</p>
              <ul className="platform-card-items">
                {items.map((itemKey) => (
                  <li className="platform-card-item" key={itemKey}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {t(itemKey)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
