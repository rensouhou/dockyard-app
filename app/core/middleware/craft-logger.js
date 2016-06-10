/**
 * @overview
 *  Handle and log crafting in a saner way
 *
 * @since 0.2.0
 */
import { List, Record } from 'immutable';
import {
  ApiEvents,
  ConstructionType,
  ApplicationEvents
} from '../../constants';
import { createdEntity } from '../../actions/application';
import { Materials } from '../../records';

// region # CraftedEntity default values
const craftedEntityDefault = {
  type: ConstructionType.NONE,
  entity: {
    baseId: undefined,
    playerId: undefined
  },
  valid: undefined,
  inProgress: undefined,
  dockID: undefined,
  completionTime: undefined,
  consumed: {
    materials: new Materials()
  },
  flags: {
    wasSuccessful: undefined,
    usedDevelopmentMaterials: undefined,
    instant: undefined,
    lsc: undefined
  }
};
// endregion

// region # CraftedEntity record definition
class CraftedEntity extends Record(craftedEntityDefault) {
  isInProgress() {
    return !!this.inProgress;
  }

  isValid() {
    switch (this.type) {
      case ConstructionType.NONE:
        return false;
      case ConstructionType.ITEM:
        return true;
      case ConstructionType.SHIP:
        return !this.isInProgress();
      default:
        break;
    }
  }
}
// endregion

/**
 * Hold the current entity here for a while until it's valid.
 * @type {CraftedEntity|Map}
 * @todo Log this in the state instead to make logger pure
 */
let currentEntity = null;

export const craftLogger = (dispatch) => (next) => (action) => {
  const { type, payload } = action;
  switch (type) {
    // region # CRAFT_ITEM
    case ApiEvents.CRAFT_ITEM:
      currentEntity = new CraftedEntity({
        type: ConstructionType.ITEM,
        consumed: {
          materials: payload.getIn(['consumed', 'materials'])
        },
        flags: payload.get('flags'),
        entity: payload.get('entity')
      });
      break;
    // endregion
    // region # CRAFT_SHIP (part 1/2)
    case ApiEvents.CRAFT_SHIP:
      currentEntity = new CraftedEntity({
        inProgress: true,
        type: ConstructionType.SHIP,
        dockId: payload.get('dockId'),
        flags: payload.get('flags'),
        consumed: {
          materials: payload.getIn(['consumed', 'materials'])
        }
      });
      break;
    // endregion
    // region # CRAFT_SHIP (part 2/2)
    case ApiEvents.GET_CONSTRUCTION_DOCKS:
      currentEntity = currentEntity.merge({
        entity: {
          baseId: payload.getIn(['docks', currentEntity.get('dockId')])
        }
      });
      // This entity should now be valid.
      break;
    // endregion
    // region # Default case (ignore)
    default:
      break;
    // endregion
  }

  // The record will be valid only when it will have all the data it needs
  // Will be different for type ITEM and SHIP.
  if (currentEntity.isValid()) {
    try {
      console.log('Created object is valid;', currentEntity.toString());
      console.log(`Dispatching record with event ${ApplicationEvents.CREATED_ENTITY}`);
      const createdRecord = new Record(createdEntity);
      dispatch(createdEntity(createdRecord));
      currentEntity = new CraftedEntity();
    }
    catch (e) {
      console.error(`Error in dispatching; ${e.message}`);
      console.error(e.stack);
    }
  }

  next(action);
};
