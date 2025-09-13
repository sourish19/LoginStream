import{ ErrorBoundaryWrapper} from './pages'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <ErrorBoundaryWrapper>
      <AppRoutes />
    </ErrorBoundaryWrapper>
  )
}

export default App
