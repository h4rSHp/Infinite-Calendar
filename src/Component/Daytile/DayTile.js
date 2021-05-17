import React, { Component } from 'react'
import styles from './DayTile.module.css'

class DayTile extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
            </div>
        )
    }
}

export default DayTile;