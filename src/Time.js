import React, { Component } from 'react'

export default class Time extends Component {
    constructor(props){
        super(props)
        this.state={
            date: new Date()
        }
    }
    componentDidMount(){
        this.timer = setInterval(
            ()=> this.tick(),1000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    tick(){
        this.setState({
            date:new Date()
        })
    }
    render() {
        // console.log(this.props.date)
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}
// setInterval(Time,1000)