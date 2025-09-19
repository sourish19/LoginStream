import { ErrorBoundary } from 'react-error-boundary'
import FallBack from './FallBack'

// Global error boundary if any component throws an error, since the app is small not including error boundary in each components
const ErrorBoundaryWrapper = ({ children }) => {
  const handleErrorReset = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/'
    } else {
      window.location.reload()
    }
  }


  return (
    <ErrorBoundary FallbackComponent={FallBack} >
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWrapper
