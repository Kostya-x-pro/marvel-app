import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// ErrorBoundary НЕ ловит ошибки:
// 1. которые происходят в нём самом
// 2. которые происходят в обработчиках событий
// 3. которые происходят в асинхронном коде
// 4. серверный рендоринг

class ErrorBoundary extends Component{
  state = {
    error: false,
  }
  // Этот метод в отличии от componentDidCatch обновляет только "state"
  // static getDerivedStateFromError(error) {
  //   return {error: true};
  // }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true
    })
  }

  render() {
    // Если что то пошло не так то и в стейте "error" будет равен "true" то мы рендорим какой то компонент
    if (this.state.error) {  
      return <ErrorMessage/>
    }
    // Если же ок то рендорим "this.props.children" (это по сути то что находится внутри компонента ErorBoundary например компонент "RandonChar")
    return this.props.children
  }
}

export default ErrorBoundary;