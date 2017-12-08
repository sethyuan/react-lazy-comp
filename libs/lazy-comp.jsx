import React from "react"
import Lazy from "../components/lazy"

export default function lazyComp(name, importFn, errorComp) {
  class LazyComp extends React.PureComponent {
    static displayName = name

    render() {
      return (
        <Lazy modules={{ [name]: importFn }} errorComp={errorComp}>
          {({ [name]: Comp }) => <Comp {...this.props} />}
        </Lazy>
      )
    }
  }
  return LazyComp
}
