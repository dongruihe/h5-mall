import React from 'react'
import PropTypes from 'prop-types'

class HomeSlider extends React.Component {
  constructor(props) {
    super(props);

    // 设置 initial state
    this.state = {

    };
    // ES6 类中函数必须手动绑定
    this.handleChange = this.handleChange.bind(this);


  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
       <div style={{ margin: '0 auto' }} >
          <h2>homeData: {this.props.homeData}</h2>
          <button className='btn btn-primary' onClick={this.props.increment}>
            Increment
          </button>
            {' '}
          <button className='btn btn-secondary' onClick={this.props.doubleAsync}>
            Double (Async)
          </button>
       </div>
    );
  }

}

HomeSlider.propTypes = {
  homeData: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
};
HomeSlider.defaultProps = {
  defaultData: '',
};


export default HomeSlider