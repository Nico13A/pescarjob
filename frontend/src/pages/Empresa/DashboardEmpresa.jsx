import { useState, useEffect } from "react"
import EmpresaLayout from "../../layout/EmpresaLayout"
import { obtenerOfertas } from "../../services/oferta"

const DashboardEmpresa = () => {
    const [ofertas, setOfertas] = useState()
    useEffect(() => {
        const cargarOfertas = async () => {
            const res = await obtenerOfertas();
            setOfertas(res.data)
        }
        cargarOfertas()
    }, [])
    
    return (
        <EmpresaLayout>
            <div>
                <h1>Mis Ofertas</h1>
                <ul>
                    {ofertas && ofertas.map(of => (
                        <li key={of.idoferta}>{of.titulo} - {of.estado}</li>
                    ))}
                </ul>
            </div>
        </EmpresaLayout>
    )
}

export default DashboardEmpresa