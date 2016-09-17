import React from 'react'
import ReactDOM from 'react-dom'

// react-bootsrap components ----------------------
import Grid from '../../node_modules/react-bootstrap/lib/Grid'
import Row from '../../node_modules/react-bootstrap/lib/Row'
import Col from '../../node_modules/react-bootstrap/lib/Col'

// application components -------------------------
import ControlPanel from './ControlPanel'
import Gameboard from './Gameboard'

// main Game component  --------------------------------------------
class Game extends React.Component {
	constructor() {
		super()
		this.state={board: [], roundCount: 0}
	}

	// initalize empty board -------------------------
	deadBoard(e) {
		this.reset()
		this.setState({board: []})
		for(var s=0;s<150;s++) {
			this.state.board[s] = []
		}
		for(var n=0;n<150;n++) {
			for(var e=0;e<150;e++) {
				var DorA = 0
				this.state.board[n].push(DorA)
				this.setState({board: this.state.board})
			}
		}
	}

	// randomly populate board with living and dead cells ------
	randomize(e) {
		this.reset()
		this.setState({board: []})
		for(var s=0;s<150;s++) {
			this.state.board[s] = []
		}
		for(var n=0;n<150;n++) {
			for(var e=0;e<150;e++) {
				var DorA = Math.floor(Math.random() * (1 - 0 + 5)) + 0;
				if(DorA === 1) {
					DorA = 1
				}
				else {
					DorA = 0
				}
				this.state.board[n].push(DorA)
				this.setState({board: this.state.board})
			}
		}
	}
	randomSymmetricalPattern(e) {
		this.reset()
		var quadrantTl =[]
		var quadrantTr = []
		var topHalf = []
		var bottomHalf = []
		var whole = []

		//get random selection of alive and dead
		for(var i=0;i<25;i++) {
			quadrantTl.push([])
			quadrantTr.push([])
			topHalf.push([])
		}
		// get random numbers for top left
		for(var r=0;r<quadrantTl.length;r++) {
			for(var g=0;g<25;g++) {
				var randomNumber = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
				if(randomNumber === 0) {
					var cell = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
				}
				else {
					var cell = Math.floor(Math.random() * (1 - 0 + 5)) + 0;
					if(cell === 1) {
						cell = 1
					}
					else {
						cell = 0
					}
				}
				quadrantTl[r].push(cell)	
			}
		}
		for(var i=0;i<quadrantTl.length;i++) {
			for(var j=quadrantTl[i].length-1;j>-1;j--) {
				quadrantTr[i].push(quadrantTl[i][j])
			}
		}
		for(var i=0;i<topHalf.length;i++) {
			topHalf[i] = quadrantTl[i].concat(quadrantTr[i])
		}
		for(var i=topHalf.length-1;i>-1;i--) {
			bottomHalf.push(topHalf[i])
		}
		console.log('top half', topHalf)
		console.log('bottom half', bottomHalf)
		whole = topHalf.concat(bottomHalf)
		console.log(whole);
		for(var i=0;i<whole.length;i++) {
			for(var j=0;j<25;j++) {
				whole[i].push(0)
				whole[i].unshift(0)
			}
		}
		var fill = []
		for(var g=0;g<50;g++) {
			fill.push([])
		}
		for(var h=0;h<fill.length;h++) {
			for(var i=0;i<150;i++) {
				fill[h].push(0)
			}
		}
		whole = fill.concat(whole.concat(fill))
		console.log(whole)
		this.setState({board: whole})
	}
	// find out who lives and who dies --------------------------
	calculate(e) {
		console.log('calculate')
		var liveNeighbors = 0
		var boardToChange = []

		for(var i=0;i<this.state.board.length-1;i++) {
			boardToChange.push([i])
		}
		// var boardToChange = this.state.board
		
		boardToChange.push(this.state.board)
		for(var c=0;c<this.state.board.length;c++) {
			for(var d=0;d<this.state.board[c].length;d++) {
				liveNeighbors=0
				var pR,
					cR,
					nR,
					pC,
					cC,
					nC
				if(c===0) {
					pR = this.state.board.length-1
					nR = c+1
				}
				else if(c===this.state.board.length-1) {
					pR = c-1
					nR = 0
				}
				else {
					pR = c-1
					nR = c+1
				}
				cR = c
				cC = d
				if(d===0) {
					pC = this.state.board.length-1
					nC = d+1
				}
				else if(d === this.state.board.length-1) {
					pC = d-1
					nC = 0
				}
				else {
					pC = d-1
					nC = d+1
				}
				cR = c
				cC = d
				if(this.state.board[pR][pC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[pR][cC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[pR][nC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[cR][pC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[cR][nC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[nR][pC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[nR][cC] === 1) {
					liveNeighbors+=1
				}
				if(this.state.board[nR][nC] === 1) {
					liveNeighbors+=1
				}

				if(liveNeighbors === 3) {
					boardToChange[cR][cC] = 1
					liveNeighbors=0
				}
				else if(liveNeighbors === 2) {
					if(this.state.board[cR][cC] === 1) {
						boardToChange[cR][cC] = 1
						liveNeighbors=0
					}
					else {
						boardToChange[cR][cC] = 0
						liveNeighbors=0
					}
				}
				else {
					boardToChange[cR][cC] = 0
					liveNeighbors=0
				}
				liveNeighbors=0
				boardToChange = boardToChange
			}
		}
		this.setState({board: boardToChange, roundCount: this.state.roundCount+=1})
		boardToChange = undefined
	}
	// start the lifecyle ----------------------
	start(e) {
		var intervalId = setInterval(this.calculate.bind(this), 5)
		this.setState({intervalId: intervalId})
	}
	// pause the lifecyle ----------------------
	pause(e) {
		clearInterval(this.state.intervalId)
	}
	// clear board of living cells --------------
	reset(e) {
		clearInterval(this.state.intervalId)
		this.setState({board: [], roundCount: 0})
	}
	// update state -----------------------------
	update(e) {
		this.setState({board: this.state.board, roundCount: this.state.roundCount})
	}
	render() {
		return(
			<div>
				<div id='game'>
					<Row>
						<Col xs={3}>
							<ControlPanel roundCount={this.state.roundCount}randomSymmetricalPattern={this.randomSymmetricalPattern.bind(this)}randomize={this.randomize.bind(this)}start={this.start.bind(this)} pause={this.pause.bind(this)}reset={this.reset.bind(this)} deadBoard={this.deadBoard.bind(this)} update={this.update.bind(this)}></ControlPanel>
						</Col>
						<Col xs={9}>
							<Gameboard onClick={this.update.bind(this)}board={this.state.board}update={this.update.bind(this)}/>
						</Col>
					</Row>
				</div>
			</div>
		)
	}

}

export default Game