import React from "react"
import lazyLoad from "../libs/lazy-modules"

export default class Lazy extends React.Component {
  state = {
    modules: {},
    err: null,
  }

  render() {
    if (Object.keys(this.state.modules).length > 0) {
      return React.Children.only(this.props.children(this.state.modules))
    } else if (this.state.err) {
      return this.props.errorComp || null
    } else {
      return null
    }
  }

  componentDidMount() {
    this.loadModules()
  }

  componentDidUpdate(prevProps, prevState) {
    const { modules } = this.props
    const { modules: prevModules } = prevProps
    const modulesDiffer = Object.keys(modules).some(
      k => modules[k] !== prevModules[k],
    )
    if (modulesDiffer) this.loadModules()
  }

  async loadModules() {
    try {
      const modules = await lazyLoad(this.props.modules)
      this.setState({ modules })
    } catch (e) {
      // ignore, pass empty modules
      this.setState({ err: e })
    }
  }
}
