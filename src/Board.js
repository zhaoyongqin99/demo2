import React, { Component } from 'react'

{// class Square extends React.Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             value: null,
    //         }
    //     }
    //     render() {
    //         return (
    //             <button 
    //             className="square" 
    //             onClick={() => { this.setState({ value: "X" }) }}>
    //                 {this.state.value}
    //             </button>
    //         )
    //     }
    // }
}

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [0, 1, 2]
        }
    }

    renderSquare(i) { //定义了一个方法引入组件Square
        return <Square
            value={this.props.squares[i]} //对应的取出每一个button的值 然后传过去
            redFlag={this.props.redFlag}
            onClick={() => this.props.onClick(i)} /> //传给每一个button点击事件 
    }

    render() {
        var board = this.state.data.map((item, index) => {
            return (<div className="board-row" key={index}>
                {this.renderSquare(0 + 3 * item)}
                {this.renderSquare(1 + 3 * item)}
                {this.renderSquare(2 + 3 * item)}
            </div>)
        })
        return (
            <div>
                {board}
            </div>
        )
    }
}
