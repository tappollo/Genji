import { PureComponent, Component } from 'react';

class Stateful extends Component {
  constructor(props) {
    super(props);
    this.state = props.state || {};
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { children } = this.props;
    return children({
      state: this.state,
      setState: (state) => {
        if (this.mounted) {
          this.setState(state)
        }
      },
      getState: () => this.state,
      object: this
    });
  }
}

export class OnMountAndUnMount extends Component {
  componentDidMount() {
    this.props.children({
      mount: true,
      object: this,
    });
  }
  componentWillUnmount() {
    this.props.children({
      mount: false,
      object: this,
    });
  }
  render() {
    return null;
  }
}

export class Onmount extends Component {
  componentDidMount() {
    this.props.children({
      mount: true,
      object: this,
    });
  }
  componentWillUnmount() {
    if (this.props.callOnUnmount) {
      this.props.children({
        mount: false,
        object: this,
      });
    }
  }
  render() {
    return null;
  }
}

export class Onunmount extends Component {
  componentWillUnmount() {
    this.props.children();
  }
  render() {
    return null;
  }
}

export const Assemble = ({children, ...props}) => children(props);

export default Stateful;
