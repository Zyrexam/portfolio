import { tickerStats } from "../content";

/**
 * Stats ticker — duplicated list, translateX(-50%) loop, pauses on hover,
 * disabled under prefers-reduced-motion (see globals.css).
 */
export function Ticker() {
  return (
    <div className="ticker" role="marquee" aria-label="Quick stats">
      <p className="sr-only">{tickerStats.join(" · ")}</p>
      <div className="ticker__row" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="ticker__list">
            {tickerStats.map((stat) => (
              <li key={stat} className="type-ticker">
                {stat}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
