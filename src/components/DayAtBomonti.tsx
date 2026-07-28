type DayCopy = {
  kicker: string;
  title: string;
  description: string;
  stops: string[][];
};

export function DayAtBomonti({ copy }: { copy: DayCopy }) {
  return (
    <section className="day-section section-pad">
      <div className="day-atmosphere" aria-hidden="true" />
      <div className="section-shell day-layout">
        <div className="day-heading">
          <p className="kicker">{copy.kicker}</p>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <ol className="day-timeline">
          {copy.stops.map(([time, title, description], index) => (
            <li key={time}>
              <span className="day-time">{time}</span>
              <div className="day-dot" aria-hidden="true"><i /></div>
              <div className="day-stop">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
