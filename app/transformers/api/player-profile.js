/**
 * @overview
 *
 * @since 0.1.0
 */
import { asBool, asNumber } from '../primitive';
import { fromJS } from 'immutable';

/**
 * @param {Object} d
 * @returns {PlayerProfileRecord|Map}
 */
export const playerProfile = (d) => fromJS({
  id: asNumber(d.api_member_id),
  nickname: d.api_nickname,
  level: asNumber(d.api_level),
  rank: asNumber(d.api_rank),
  limits: {
    maxShips: d.api_max_chara,
    maxFurniture: d.api_max_kagu,
    maxSlotItems: d.api_max_slotitem
  },
  flags: {
    lsc: asBool(d.api_large_dock)
  },
  coins: asNumber(d.api_fcoin),
  medals: d.api_medals,
  comment: d.api_comment,
  furniture: d.api_furniture,
  fleetCount: d.api_count_deck,
  missions: {
    total: d.api_ms_count,
    wins: (d.api_ms_count - (d.api_ms_count - d.api_ms_success)),
    losses: (d.api_ms_count - d.api_ms_success)
  },
  practice: {
    total: (d.api_pt_win + d.api_pt_lose),
    wins: d.api_pt_win,
    losses: d.api_pt_lose
  },
  sorties: {
    total: (d.api_st_win + d.api_st_lose),
    wins: d.api_st_win,
    losses: d.api_st_lose
  },
  docks: {
    constructionDockCount: d.api_count_kdock,
    repairDockCount: d.api_count_ndock
  },
  startTime: d.api_starttime,
  tutorial: {
    inProgress: asBool(d.api_tutorial),
    progress: d.api_tutorial_progress
  },
  $_unknown: {
    active: asBool(d.api_active_flag),
    playtime: d.api_playtime,
    ptChallenged: d.api_pt_challenged,
    ptChallengedWon: d.api_pt_challenged_won,
    pvp: d.api_pvp,
    commentId: d.api_comment_id,
    nicknameId: d.api_nickname_id
  }
});
