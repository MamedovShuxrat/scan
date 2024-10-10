import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    return isAuthenticated ? <Component{...rest} /> : <Navigate to="/login" />
}

export default ProtectedRoute