import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();
        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider,
        });
        return response.json(appointment);
    } catch (e) {
        return response.status(400).json({ error: e.message });
    }
});

export default appointmentsRouter;
