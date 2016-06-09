/**
 * @overview
 *  Handle and log crafting in a saner way
 *
 * @since 0.2.0
 */
import { List, Record } from 'immutable';
import { ApiEvents, ConstructionType } from '../../constants';
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
        return this.entity.baseId != null && this.entity.playerId != null;
      default:
        break;
    }
  }
}
// endregion

let loggedObjectsTemp = List();

/**
 * @type {CraftedEntity|Map}
 */
let currentEntity = new CraftedEntity();

export const craftLogger = state => next => (action) => {
  const { type, payload } = action;
  const currentState = state.getState();
  switch (type) {
    // region # CRAFT_ITEM
    case ApiEvents.CRAFT_ITEM:
      currentEntity = currentEntity.merge({
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
      currentEntity = currentEntity.merge({
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
    console.log('Please log this object:', loggedObjectsTemp);
    loggedObjectsTemp = loggedObjectsTemp.push(currentEntity);
    currentEntity = new CraftedEntity();
  }

  next(action);
};
