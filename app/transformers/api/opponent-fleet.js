/**
 * @overview
 *
 * @since 0.3.0
 * @author Stefan Rimaila <stefan@rimaila.fi>
 * @module app/transformers/api/opponent-fleet
 */
import { asBool, getObjectOrDefault, notEmpty } from '../primitive';

const opponentShip = o => ({
  id: o.api_id,
  shipId: o.api_ship_id,
  level: o.api_level,
  stars: o.api_star
});

/**
 * @param o
 * @todo(@stuf): add type of `OpponentFleet extends Fleet`
 */
export const opponentFleet = (o) => ({
  id: o.api_member_id,
  level: o.api_level,
  comment: o.api_cmt,
  nickname: o.api_nickname,
  rank: o.api_rank,
  counts: {
    ships: o.api_ship,
    slotItems: o.api_slotitem
  },
  fleet: {
    name: o.api_deckname,
    ships: getObjectOrDefault(o.api_deck).api_ships.filter(notEmpty).map(opponentShip)
  },
  $_unknown: {
    friend: asBool(o.api_friend),
    commentId: o.api_cmt_id,
    nameId: o.api_deckname_id,
    nicknameId: o.api_nickname_id
  }
});
