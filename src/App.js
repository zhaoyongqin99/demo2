import React, { Component } from 'react'
import Board from './Board'
import Time from './Time'
import './App.css'


export default class App extends Component {
    // render() {
    //     return (
    //         <div>

    //         </div>
    //     )
    // }
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            isclick: false,
            winnerlist: [],
            footprint: []
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        // console.log("history", history); //这里是所有的历史记录
        const current = history[history.length - 1]; //取出上一次的跳棋记录
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) { //如果有人赢了 游戏结束
            //squares[i] 表示你点击到的button是否存在值 如果存在 
            //或者计算胜负结果有任意一个满足 那么 游戏就结束 
            //这表示每一个格子都被填上了数据 但是却没有胜利的
            console.log("游戏结束")
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });

    }

    jumpTo(step, e) { //这里表示跳到第几步的跳棋动作
        //console.log(step)  //遍历所有的li 第step个li就是被点击的li 那么我们需要就将其变颜色
        var lilist = document.getElementsByTagName("li");
        lilist = Array.prototype.slice.call(lilist)
        // console.log("lilist",lilist)
        lilist.map((item, index) => {
            item.setAttribute("class", "");
            if (index === step) {
                // console.log("第"+step+"个li被选中")
                item.setAttribute("class", "historyli")
            }
        })
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        // console.log("history", history)

        const current = history[this.state.stepNumber]; //最新的一个操作
        // console.log(current)
        let status;
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        var flag = current.squares.some((item, index) => {
            return item === null
        })
        if (!flag) {
            status = '平局'
        }
        if (calculateWinner(current.squares) != null) {
            const winner = calculateWinner(current.squares).winner;
            status = 'Winner: ' + winner;

            const winnerlist = calculateWinner(current.squares).lines;
            const buttonlist = Array.prototype.slice.call(document.getElementsByTagName("button"));
            buttonlist.map((item, index) => {
                winnerlist.map(i => {
                    if (index === i) {
                        item.setAttribute("class", "square redsquare")
                    }
                })
            })
        }
        const secdetail = history[history.length - 2]; //倒数第二个操作
        // console.log("history倒数第二个", secdetail)
        let row = 0; let col = 0; let foot = "";
        //最新记录和倒数第二次记录的每一个值的下标是一一对应的
        var tempprint = this.state.footprint;
        current.squares.forEach((item, index) => {
            if (secdetail) {
                if (item !== secdetail.squares[index]) {
                    // console.log(index, item)
                    row = parseInt(index / 3) + 1; //行
                    col = index % 3 + 1; //列
                    foot = row + '行' + col + '列';
                    this.state.footprint.push(foot)
                }
            }
        })


        //这里的move就是index step就是index对应的值item
        const moves = history.map((step, move) => {
            // console.log(this.state.footprint)
            const desc = move ? 'Go to move #' + move + ":  " + this.state.footprint[move - 1] : 'Go to game start'
            return (
                <li key={move} onClick={() => this.jumpTo(move)}>
                    {desc}
                </li>
            )
        })


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                    {/* 给组件传handleClick事件 获取点击到的数据 */}
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <Time />
            </div>
        )
    }



}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // console.log(lines[i])
            return {
                winner: squares[a],
                lines: lines[i]
            }
        }
    }
    return null;
}