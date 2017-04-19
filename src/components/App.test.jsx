import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import App from './App'

describe('<App />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(<App />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})
