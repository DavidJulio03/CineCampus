const carteleraRepository = require('../repository/carteleraRepository');
const hallRepository = require('../repository/hallRepository');
const { ErrorResponse, SuccessResponse } = require('../utils/respuestasHTTP');

class carteleraService {

    async crearFuncionSegura(data) {
        try {
            // 1. Clonación de asientos: Buscamos el diseño original de la sala
            const hall = await hallRepository.obtenerHallPorIdRepository(data.hall_id);
            if (hall.status !== 200) return hall;
            
            // Asignamos el "mapa vacío" de la sala a la nueva función
            data.asientos = hall.data.asientos;

            // 2. Validación de Horario: ¿La sala está ocupada?
            const funcionesEnSala = await carteleraRepository.obtenerFuncionesPorSalaRepository(data.hall_id);
            
            if (funcionesEnSala.status === 200) {
                const hayChoque = funcionesEnSala.data.some(f => {
                    return (
                        (data.fecha.fecha_inicio >= f.fecha.fecha_inicio && data.fecha.fecha_inicio < f.fecha.fecha_fin) ||
                        (data.fecha.fecha_fin > f.fecha.fecha_inicio && data.fecha.fecha_fin <= f.fecha.fecha_fin)
                    );
                });

                if (hayChoque) {
                    return new ErrorResponse(409, 'La sala ya tiene una función programada en ese horario');
                }
            }

            return await carteleraRepository.crearFuncionRepository(data);

        } catch (error) {
            return new ErrorResponse(500, 'Error en lógica de creación', error);
        }
    }

    /**
     * MÉTODO 2: Actualizar función con restricciones estrictas
     */
    async actualizarFuncionEstricta(id, data) {
        try {
            // 1. Obtener el estado actual de la función antes de actualizar
            const funcionActual = await carteleraRepository.obtenerFuncionPorIdRepository(id);
            if (funcionActual.status !== 200) return funcionActual;

            // 2. Verificar si hay asientos reservados ("OCUPADO")
            // Aplanamos la matriz para buscar si existe algún string que diga "OCUPADO"
            const tieneReservas = funcionActual.data.asientos.flat().includes("OCUPADO");

            // REGLA A: Si hay reservas, no se puede cambiar el esquema de asientos
            if (data.asientos && tieneReservas) {
                return new ErrorResponse(400, 'No se puede modificar el mapa de asientos porque ya existen reservas confirmadas');
            }

            // REGLA B: Si hay reservas, no se puede cambiar la fecha (aunque el horario esté libre)
            if (data.fecha && tieneReservas) {
                return new ErrorResponse(400, 'No se puede cambiar la fecha de una función que ya tiene boletos vendidos');
            }

            // REGLA C: Si se cambia la fecha, validar que no choque con otra función
            if (data.fecha) {
                const funcionesEnSala = await carteleraRepository.obtenerFuncionesPorSalaRepository(funcionActual.data.hall_id);
                
                const hayChoque = funcionesEnSala.data.some(f => {
                    // Ignoramos la función actual que estamos editando
                    if (f._id.toString() === id) return false;

                    return (
                        (data.fecha.fecha_inicio >= f.fecha.fecha_inicio && data.fecha.fecha_inicio < f.fecha.fecha_fin) ||
                        (data.fecha.fecha_fin > f.fecha.fecha_inicio && data.fecha.fecha_fin <= f.fecha.fecha_fin)
                    );
                });

                if (hayChoque) {
                    return new ErrorResponse(409, 'El nuevo horario entra en conflicto con otra función existente');
                }
            }

            // Si pasa todas las validaciones, procedemos
            return await carteleraRepository.actualizarFuncionRepository(id, data);

        } catch (error) {
            return new ErrorResponse(500, 'Error en lógica de actualización', error);
        }
    }
}

module.exports = new carteleraService();