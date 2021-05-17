import React, { Component } from 'react'

import styles from './Tile.module.css'

export default class Tile extends Component {
    constructor(props) {
        super(props)
        this.setState = {};
        this.findMonth = this.findMonth.bind(this)

        //References
        this.tDate = React.createRef()
        this.intObs = React.createRef()
    }

    //To get Month Name (String) from the Month (Integer)
    findMonth(month) {
        if (month === 1)
            return "JAN"
        else if (month === 2)
            return "FEB"
        else if (month === 3)
            return "MAR"
        else if (month === 4)
            return "APR"
        else if (month === 5)
            return "MAY"
        else if (month === 6)
            return "JUN"
        else if (month === 7)
            return "JUL"
        else if (month === 8)
            return "AUG"
        else if (month === 9)
            return "SEP"
        else if (month === 10)
            return "OCT"
        else if (month === 11)
            return "NOV"
        else if (month === 12)
            return "DEC"


    }

    render() {
        if (this.tDate['current'] !== null) {
            this.props.parentCallback(this.tDate['current'].offsetTop)
            window.scrollBy(0, this.tDate['current'].offsetTop)
        }
        // console.log(window.innerWidth, window.outerWidth)
        var styleDate = { fontSize: '30px', fontWeight: '500' };
        var styleTile = {}
        var day = new Date(this.props.year, this.props.month - 1, this.props.date).getDay()
        if (this.props.isDark) {
            if (day === 0) {
                styleTile = { background: 'hsl(228, 27.9%, 12%)', color: 'white' }
            }
            else
                styleTile = { background: 'rgb(31,36,55)', color: 'white' }
        }
        else {
            if (day === 0) {
                styleTile = { background: '#ddd' }
            }
        }

        //styling for small screen
        if (window.innerWidth < 500)
            styleDate = { fontSize: '25px', fontWeight: '600' };
        else
            styleDate = { fontSize: '60px', fontWeight: '550' };
        var spanAll = [];
        if (this.props.data['today']) {
            spanAll.push(<div><span style={styleDate} key={this.props.date + "-" + this.props.month} ref={this.tDate}>{this.props.date}</span><br /><span>TODAY</span></div>
            )
        }
        else if (this.props.date == 1) {
            spanAll.push(<div><span>{this.findMonth(this.props.month)}</span><br /><span style={styleDate} key={this.props.date + "-" + this.props.month}>{this.props.date}</span><br /><span>{this.props.year}</span></div>
            )
        }
        else {
            spanAll.push(<span style={styleDate} key={this.props.date + "-" + this.props.month}>{this.props.date}</span>)
        }
        return (
            <div>
                <div className={styles.tile} style={styleTile}>
                    {spanAll}
                </div >
            </div>
        )
    }
}
