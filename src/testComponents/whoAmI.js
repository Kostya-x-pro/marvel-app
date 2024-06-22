import React, {Component, Fragment} from 'react'

class WhoAmi extends Component {
  constructor(props) {
    super(props)
    this.state = {
      years: 27,
      plus: '+++',
      minus: '---',
      position: ''
    }
    // 1. Привязка контекста c помощью bind
    this.prevYear = this.prevYear.bind(this);
  }

  prevYear() {
    this.setState(state => {
      return {
        years: state.years - 1
      }
    })
  }

  // 2. Привязка контекста c помощью полей класса
  nextYear = () => {
    this.setState(({years}) => ({years: years + 1}))
  }

  commitInputChanges = (e) => {
    this.setState({
      position: e.target.value
    })
  }
  
  render() {
    const {name, secondName, link} = this.props
    const {plus, minus, years, position} = this.state;

  // 3. Привязка контекста c помощью ананимного колбыка
  //<button onClick={() => this.prevYear}>{minus}</button>

    return (
      // Фрагмент импортированный
      <Fragment> 
        <div style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
          <button onClick={this.nextYear}>{plus}</button>
          <button onClick={this.prevYear}>{minus}</button>
          <h1>My name is: {name}, 
              surename: {secondName}, 
              age: {years}  
              position: {position}
          </h1>
          <a href={link}>My profile</a>
          <form>
            <span>Введите должность</span>
            <input type="text" onChange={this.commitInputChanges} />
          </form>
        </div>
      </Fragment>
    )
  }
}

// Render Props
const DynamicGreating = (props) => {
  return (
    <div className={'mb-3 p-3 boreder-' + props.color}>
      {/* {props.children} */} 
      
      {
        React.Children.map(props.children, child => {
          return React.cloneElement(child, {className: 'shadow p-3 m-3 border rounded'})
        })
      }
    </div>
  )
}

function MyTestApp() {
  return (
    // Фрагмент пустой
    <>
    {/*динамические пропсы  */}
      <DynamicGreating color={'primary'}>
        <h2>This wtll hard</h2>
        <h2>Hello world</h2>
      </DynamicGreating>


      <div className="App">
        <WhoAmi 
          name="John" 
          secondName="Smith"  
          link="facebook.com"/>
        <WhoAmi 
          name="Alex" 
          secondName="Shepard" 
          link="vk.com"/>
      </div>
    </>
  );
}

export default MyTestApp;
