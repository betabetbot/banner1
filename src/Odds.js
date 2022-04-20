import { useEffect, useState, useRef } from "react";
import "./App.css";

function Odds({ event }) {
  const [oddsData, setOddsData] = useState([]);
  useEffect(() => {
    fetch(
      `https://eapi.enetpulse.com/preodds/event/?odds_providerFK=180&username=brobetapiusr&token=9851ce958d2c588be4eba8597b9d0750&outcome_scopeFK=1&outcome_typeFK=1&objectFK=${event.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        let arrTeams = Object.values(data.preodds);
        let odds = [];

        for (let i = 0; i < arrTeams.length; i++) {
          let preodds = arrTeams[i].preodds_bettingoffers;
          odds.push(preodds[Object.keys(preodds)[0]].odds);
        }
        setOddsData(odds);
      });
  }, [event]);

  return (
    <div className="event container">
      {oddsData.length ? (
        <>
          <div className="start col-xs-5">{event.startdate}</div>
          <div className="tournament col-xs-7">
            {event.tournament_stage_name}
          </div>{" "}
          <div className="name1 col-sm-12">
            {Object.values(event?.event_participants)[0]?.participant?.name}
            <div className="vs">VS</div>{" "}
            <div className="name2  col-sm-12">
              {Object.values(event?.event_participants)[1]?.participant?.name}
            </div>
          </div>{" "}
          <div className="row">
            {oddsData.map((odd, i) => (
              <div key={i} className="blk col-sm-4">
                {Number(odd).toFixed(2)}
              </div>
            ))}{" "}
          </div>
        </>
      ) : null}
    </div>
  );
}
export default Odds;
