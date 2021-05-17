import React, { Component } from 'react'
import styles from './NavBar.module.css'
import { withStyles } from '@material-ui/core/styles';
// import { purple } from '@material-ui/core/colors';
import { Switch } from '@material-ui/core';

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = { isChecked: true }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        if (this.state.isChecked) {
            this.setState({
                isChecked: false,
            })
            this.props.parentCallback({ isDark: false })
        }
        else {
            this.setState({
                isChecked: true,
            })
            this.props.parentCallback({ isDark: true })
        }
        // console.log("x");
    }

    render() {
        const IOSSwitch = withStyles((theme) => ({
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: theme.spacing(1),
            },
            switchBase: {
                padding: 1,
                '&$checked': {
                    transform: 'translateX(16px)',
                    color: theme.palette.common.white,
                    '& + $track': {
                        backgroundColor: '#555',
                        opacity: 1,
                        border: 'none',
                    },
                },
                '&$focusVisible $thumb': {
                    color: '#555',
                    border: '6px solid #fff',
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            track: {
                borderRadius: 16,
                border: `1px solid ${theme.palette.grey[400]}`,
                backgroundColor: theme.palette.grey[50],
                opacity: 1,
                transition: theme.transitions.create(['background-color', 'border']),
            },
            checked: {},
            focusVisible: {},
        }))(({ classes, ...props }) => {
            return (
                <Switch
                    focusVisibleClassName={classes.focusVisible}
                    disableRipple
                    classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    {...props}
                />
            );
        });

        return (
            <div className={styles.mainWrapper}>
                <div style={{ textAlign: 'center', padding: '16px 0', width: '100%' }}><span >INFINITE CALENDAR</span></div>
                <div className={styles.switch}>
                    <IOSSwitch checked={this.state.isChecked} size="small" onChange={this.handleChange} name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }} />
                </div>
            </div>
        )
    }
}
