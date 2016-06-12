/**
 * @overview
 *  Log crafting in a saner way
 *
 * @since 0.2.0
 */
import { fromJS, Map } from 'immutable';
import { ApiEvents, ConstructionType, ApplicationEvents } from '../../constants';
import { CraftedEntityRecord } from '../../records';

/**
 * Hold the current entity here for a while until it's valid.
 * @type {CraftedEntityRecord|Map}
 * @todo Log this in the state instead to make logger pure
 */
let currentEntity = null;

export default function createCraftLogger() {
  console.log('Create crafting logger');
  return () => (next) => (action) => {
    const { type, payload } = action;
    let createdEntityObject = null;
    let nextValue;

    switch (type) {
      // region # CRAFT_ITEM
      case ApiEvents.CRAFT_ITEM:
        currentEntity = new CraftedEntityRecord({
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
        currentEntity = new CraftedEntityRecord({
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
        nextValue = next(action);
        return nextValue;
      // endregion
    }

    // The record will be valid only when it will have all the data it needs
    // Will be different for type ITEM and SHIP.
    console.log('Created object is valid;', currentEntity.toObject());
    console.log(`Dispatching record with event ${ApplicationEvents.CREATED_ENTITY}`);
    createdEntityObject = fromJS(currentEntity.toJS());
    const finalAction = {
      ...action,
      ...{ payload: payload.merge(createdEntityObject) }
    };
    nextValue = next(finalAction);
    return nextValue;
  };
}
