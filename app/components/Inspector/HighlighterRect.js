import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InspectorCSS from '../Inspector.css';

/**
 * Absolute positioned divs that overlay the app screenshot and highlight the bounding
 * boxes of the elements in the app
 */
export default class HighlighterRect extends Component {

  render () {
    const {selectedElement = {}, setHoveredElement, unsetHoveredElement, hoveredPath, selectElement, unselectElement, node, zIndex, scaleRatio} = this.props;
    const {path} = selectedElement;

    let {bounds} = node.attributes || {};
    if (bounds) {

      // Parse the bounds from string to array
      let [x1, y1, x2, y2] = bounds.split(/\[|\]|,/).filter((str) => str !== '');

      // Calculate left, top, width and height coordinates
      let left = x1 / scaleRatio;
      let top = y1 / scaleRatio;
      let width = (x2 - x1) / scaleRatio;
      let height = (y2 - y1) / scaleRatio;

      // Add class + special classes to hovered and selected elements
      let highlighterClasses = [InspectorCSS['highlighter-box']];
      hoveredPath === node.path && highlighterClasses.push(InspectorCSS['hovered-element-box']);
      path === node.path && highlighterClasses.push(InspectorCSS['inspected-element-box']);

      return <div className={highlighterClasses.join(' ').trim()} 
        onMouseOver={() => setHoveredElement(node.path)}
        onMouseOut={unsetHoveredElement} 
        onClick={() => node.path === path ? unselectElement() : selectElement(node.path)}
        key={node.path}
        style={{zIndex, left, top, width, height}}>
        <div></div>
      </div>;

    } else {
      return null;
    }
  }
}
