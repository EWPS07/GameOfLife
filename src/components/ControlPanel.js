import React from 'react'
import ReactDOM from 'react-dom'

import Row from '../../node_modules/react-bootstrap/lib/Row'
import Col from '../../node_modules/react-bootstrap/lib/Col'
import ButtonGroup from '../../node_modules/react-bootstrap/lib/ButtonGroup'
import Button from '../../node_modules/react-bootstrap/lib/Button'
import Glyphicon from '../../node_modules/react-bootstrap/lib/Glyphicon'
import PageHeader from '../../node_modules/react-bootstrap/lib/PageHeader'

class ControlPanel extends React.Component {
	render() {
		return(
			<div onChange={this.props.update}id='controlPanel'>
				<h2>John Conway's Game of Life</h2>
				<div id='controlWidget'>
					<Row>
						<button className='widgetItem'onClick={this.props.deadBoard}>Customize</button>
						<button className='widgetItem'onClick={this.props.randomize}>Randomize</button>
						<br/>
						<button className='widgetItem'onClick={this.props.randomSymmetricalPattern}>Symmetrical Pattern</button>
					</Row>
					<br/>
					<ButtonGroup className='widgetItem'>
						<button onClick={this.props.start}><Glyphicon glyph='play'/></button>
						<button onClick={this.props.pause}><Glyphicon glyph='pause'/></button>
					</ButtonGroup>
					<br/>
					<span>Generation: <span id='gen'>{this.props.roundCount}</span></span>
				</div>
				<h2>How it works</h2>
				<span className='lineBreak'>Any living cell with fewer than 2 live neighbors dies</span>
				<br/>
				<span className='lineBreak'>Any living cell with 2 or 3 living neighbors lives on to the next round</span>
				<br/>
				<span className='lineBreak'>Any living cell with more than 3 living neighbors dies</span>
				<br/>
				<span className='lineBreak'>Any dead cell with exactly 3 living neighbors becomes alive</span>
			</div>
		)
	}
}
export default ControlPanel
