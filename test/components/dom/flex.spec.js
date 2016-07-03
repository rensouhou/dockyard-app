/* eslint no-unused-expressions: 0 */
/**
 * @overview
 * @since 0.4.0
 */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { Flex } from '../../../app/components/dom';

function setup() {
  const actions = {};
  const attributes = {};
  const component = renderIntoDocument(<Flex {...attributes} />);
  return { component };
}

describe('DOM Flex component', () => {
  it('should be true', () => {
    expect(true).to.equal(true);
  });
});
