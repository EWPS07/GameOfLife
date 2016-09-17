import React from 'react'
import ReactDOM from 'react-dom'

import Game from './Game'
class Layout extends React.Component {
	render() {
		return(
			<div id='content'className='text-center'>
				<Game/>
			</div>
		)
	}
}


export default Layout