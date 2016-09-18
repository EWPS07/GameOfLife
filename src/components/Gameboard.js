import React from 'react'
import ReactDOM from 'react-dom'

// react bootstrap components ------------------
import Grid from '../../node_modules/react-bootstrap/lib/Grid'
import Row from '../../node_modules/react-bootstrap/lib/Row'
import Col from '../../node_modules/react-bootstrap/lib/Col'


// gameboard components---- builds the board from the rows and columns
class Gameboard extends React.Component {
 	render() {
 		let board = this.props.board
		return(
			<div id='containBoard'>
				<div className='centerBoard'></div>
				<div onClick={this.props.update}id='board'>
					{
						this.props.board.map(function(row, index) {
							let currRow = index
							return(
								<Row className='boardRow'key={index}>
									{
										row.map(function(col, index) {
											var killResurect = function() {
												if(board[currRow][index] === 1) {
													board[currRow][index] = 0
												}
												else {
													board[currRow][index] = 1
												}
											}
											if(col === 1) {
												return(
													<div onClick={killResurect}className='cellAlive'key={index}></div>
												)
											}
											else {
												return(
													<div onClick={killResurect}className='cellDead'key={index}></div>
												)
											
											}
										})
									}
								</Row>
							)
						})
					}
				</div>
				<div className='centerBoard'></div>
			</div>
		)
	}
}

export default Gameboard