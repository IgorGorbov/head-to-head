import * as React from 'react';
import * as classNames from 'classnames';
import { inject, observer } from 'mobx-react';

interface GamesProps {
  viewStore?: IViewStore;
}

const Games = (props: GamesProps) => {
  const { viewStore } = props;
  const { games } = viewStore;
  return (
    <div>
      {games.length &&
        games.map(({ key, homeTeamName, awayTeamName, homeTeamGoals, awayTeamGoals }) => {
          const homeTeamClass = classNames({
            'center-teams__home': true,
            'is-winner': homeTeamGoals > awayTeamGoals,
          });

          const awayTeamClass = classNames({
            'center-teams__away': true,
            'is-winner': homeTeamGoals < awayTeamGoals,
          });

          const centerClass = classNames({
            'center-teams__center': true,
            'is-winner-home': homeTeamGoals > awayTeamGoals,
            'is-winner-away': homeTeamGoals < awayTeamGoals,
            'is-draw': homeTeamGoals === awayTeamGoals,
          });

          return (
            <span key={key} className="center-teams is-game">
              <span className={homeTeamClass}>{homeTeamName}</span>
              <span className={centerClass}>
                {homeTeamGoals} : {awayTeamGoals}
              </span>
              <span className={awayTeamClass}>{awayTeamName}</span>
            </span>
          );
        })}
    </div>
  );
};

export default inject('viewStore')(observer(Games));
