import React, { Component, } from 'react';

import NavBar from './Component/navbar/NavBar';
import DayTile from './Component/Daytile/DayTile';
import Tile from './Component/tile/Tile'
import styles from './App.module.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { year: 0, month: 0, scrollPosition: 0, isDark: true }

    this.handleScroll = this.handleScroll.bind(this)
    this.handleDateObject = this.handleDateObject.bind(this)
    this.findData = this.findData.bind(this)
    this.handleParentCallbackNavbar = this.handleParentCallbackNavbar.bind(this)

    this.scroll = React.createRef()
  }

  componentDidMount() {
    this.setState({
      initialYear: this.props.year,
      finalYear: this.props.year,
    })

    window.addEventListener('scroll', this.handleScroll);

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  //Parent Callback from Tile Component to get Today Prop
  handleParentCallback(top) {
    console.log(top + 50);
    window.scrollBy(0, top - 100)
  }


  findData(year, month, date) {
    var d = new Date()
    var tdd = d.getDate()
    var tmm = d.getMonth() + 1
    var tyy = d.getFullYear()

    var obj = { active: false };
    if (year === tyy && month === tmm && date === tdd) {
      obj.today = true
    }
    else {
      obj.today = false
    }
    return obj;
  }

  //To find the Last date of a month
  handleDateObject(month, year) {
    var obj = { lastDate: 0 };
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
      obj.lastDate = 31;
    }
    else if (month === 2) {
      if (year % 4 === 0 || (year % 400 === 0)) {
        obj.lastDate = 29;
      }
      else {
        obj.lastDate = 28;
      }
    }
    else {
      obj.lastDate = 30;
    }
    return obj;
  }

  //To handle Scroll
  handleScroll(e) {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    // console.log(top);
    if (top <= 2000) {
      this.loading("-");
    }
    if (top + document.documentElement.clientHeight + 2000 > document.documentElement.scrollHeight) {
      // do something at end of scroll
      this.loading("+");
    }
  }

  //To update lower or Upper Dates
  loading(x) {
    if (x === "+") {
      if (this.state.finalYear - this.state.initialYear > 2) {
        this.setState({
          finalYear: this.state.finalYear + 1,
          initialYear: this.state.initialYear + 1,
        })
      }
      else {
        this.setState({
          finalYear: this.state.finalYear + 1,
        })
      }
    }
    if (x === "-") {
      if (this.state.finalYear - this.state.initialYear > 2) {
        this.setState({
          finalYear: this.state.finalYear - 1,
          initialYear: this.state.initialYear - 1,
        })
      }
      else {
        this.setState({
          scrollPosition: document.documentElement.scrollHeight,
          initialYear: this.state.initialYear - 1,
        })
      }
    }
  }

  //Get Value of Dark or Light State from Navbar Switch
  handleParentCallbackNavbar(checkedObj) {
    if (checkedObj['isDark']) {
      this.setState({ isDark: true, });
    }
    else {
      this.setState({ isDark: false, });
    }
  }

  render() {
    var children = [];
    for (var i = this.state.initialYear; i <= this.state.finalYear; i++) {
      var month = 1
      var dateObject = { lastDate: 1 }
      var firstDay = new Date(i, 0, 1).getDay()
      // console.log(firstDay);
      dateObject.firstDay = firstDay
      dateObject.month = month
      for (var k = month; k <= 12; k++) {
        var objDate = this.handleDateObject(k, i)
        for (var j = 1; j <= objDate['lastDate']; j++) {
          var obj = this.findData(i, k, j)
          if (j === 1 && k === 1 && i === this.state.initialYear) {
            for (var l = 0; l < firstDay - 1; l++)
              children.push(<span key={'0' + l}> </span>)
          }
          children.push(<Tile parentCallback={this.handleParentCallback} isDark={this.state.isDark} key={j + "-" + k + "-" + i} data={obj} month={k} year={i} date={j} />)
        }
      }
    }
    return (
      <div>
        <div style={{ position: 'fixed', top: '0', right: '0', width: '100%', zIndex: '2', }}>
          <NavBar parentCallback={this.handleParentCallbackNavbar} />
          <DayTile /></div>
        <div className={styles.wrapper} ref={this.scroll} onScroll={this.handleScroll}>
          {children}
        </div>
      </div >
    )
  };
}

export default App;
