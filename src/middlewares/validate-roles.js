export const hasRoles = (...roles) => {
    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                message: "Se debe validar el token primero"
            })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(403).json({
                message: `El servicio requiere uno de estos roles: ${roles.join(", ")}`
            })
        }

        next()
    }
}