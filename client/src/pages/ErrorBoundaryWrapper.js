import { ErrorBoundary } from 'react-error-boundary'
import FallBack from './FallBack'

const ErrorBoundaryWrapper = ({ children }) => {
  const handleErrorReset = () => {
  if (window.location.pathname !== '/') {
    window.location.href = '/';
  } else {
    window.location.reload();
  }
  }

  const handleError = (error, errorInfo) => {
    // Log error to monitoring service
    console.error('ErrorBoundaryWrapper caught an error:', error, errorInfo)
  }

  return (
    <ErrorBoundary FallbackComponent={FallBack} onError={handleError} onReset={handleErrorReset}>
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryWrapper
