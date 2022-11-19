import React, { Component } from 'react'
import Row from '../Row'

export default class Table extends Component {
	
	render() {
		const {name, data,isLoading,err} = this.props

		return (
			<section>
				<div><h3>{name}</h3></div>
				<div className="container">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Address</th>
								<th scope="col">City</th>
								<th scope="col">State</th>
							</tr>
						</thead>
						<tbody>
							{
								isLoading ? <tr><th scope="col">Loading......</th></tr> :
								err ? <tr style={{color:'red'}}><th scope="col">{err}</th></tr> :
								data?.map((row, index) => {
									return <Row key={row.address} row={row} index={index+1}/>
								})
							}
						</tbody>
					</table>
				</div>
			</section>
		)
	}
}
