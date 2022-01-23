import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    const errorDetails = {
      error: error,
      errorInfo: errorInfo,
    };

    this.setState(errorDetails);

    // Intentionally added to place output in browser console
    console.log(errorDetails);
  }

  render() {
    if (this.state.errorInfo) {
      return <h2 className="flex flex-col flex-x-center flex-y-center">Something went wrong!</h2>;
    }
    return this.props.children;
  }
}
