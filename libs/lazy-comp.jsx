import React from "react"
import Lazy from "../components/lazy"

export default function lazyComp(name, path, errorComp) {
  class LazyComp extends React.PureComponent {
    static displayName = name

    render() {
      return (
        <Lazy modules={{ Comp: () => import(path) }} errorComp={errorComp}>
          {({ Comp }) => <Comp {...this.props} />}
        </Lazy>
      )
    }
  }
  return LazyComp
}
