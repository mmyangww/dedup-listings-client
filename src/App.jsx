import React,{Component} from 'react'
import axios from 'axios'
import Table from './components/Table'


export default class App extends Component{

	state = {
		tableA:[],
		tableB:[], 
		isLoadingA:false,
		isLoadingB:false,
		errA:'',
		errB:'',
	} 

	updateAppState = (stateObj)=>{
		this.setState(stateObj)
	}

	async componentDidMount() {
        await this.getTable()
    }

	async getTable() {
		this.setState({isLoadingB:true})
        await axios.get(`http://3.21.76.222:9000/listing/tableA`).then(
			response => {
				response.data.code === 500?
					this.setState({isLoadingA:false,errA:response.data.msg}):
					this.setState({isLoadingA:false,tableA:response.data.object})
			},
			error => {
				this.setState({isLoadingA:false,errA:error.message})
			}
		)
		
		this.setState({isLoadingB:true})
        await axios.get(`http://3.21.76.222:9000/listing/tableB`).then(
			response => {
				response.data.code === 500?
					this.setState({isLoadingB:false,errB:response.data.msg}):
					this.setState({isLoadingB:false,tableB:response.data.object})
			},
			error => {
				this.setState({isLoadingB:false,errB:error.message})
			}
		)
    }

	dedup = async ()=>{
		this.setState({isLoadingB:true})
		const resB = await axios.get(`http://3.21.76.222:9000/listing/dedup`).then(
			response => {
				response.data.code === 500?
					this.setState({isLoadingB:false,errB:response.data.msg}):
					this.setState({isLoadingB:false,tableB:response.data.object})
			},
			error => {
				this.setState({isLoadingB:false,errB:error.message})
			}
		)
	}

	render(){
		return (
			<div className="container">
				<h3 className="jumbotron-heading">Click below button to dedup table B</h3>
				<div>
					<button onClick={this.dedup}>Dedup</button>
				</div>
				<Table name="Table A" data={this.state.tableA} isLoading={this.state.isLoadingA} err={this.state.errA}/>
				&nbsp;
				<Table name="Table B" data={this.state.tableB} isLoading={this.state.isLoadingB} err={this.state.errB}/>
			</div>
		)
	}
}
