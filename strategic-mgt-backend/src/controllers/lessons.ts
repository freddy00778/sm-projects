import { catchErrors } from '../errors';
import DataProvider from "../data/DataProvider";
import LessonsLearntLogHandlers from "../data/lessonsLearntLog/LessonsLearntLogHandlers";
import {humanReadableDate} from "../utils/generalUtils";
// import {humanReadableDate} from "../utils/generalUtils";

export const getLesson = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const lessonHandler = await LessonsLearntLogHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing lesson id").status(400)
        throw new Error('Missing lesson id');
    }

    const lesson = await lessonHandler.get({ id })

    res.respond({  data: lesson });
});

export const getLessons = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const lessonHandler = await LessonsLearntLogHandlers.create(data)
    console.log("Body", req.params)
    // const lesson = await lessonHandler.getAll({})

    const lessons = (await lessonHandler.getAll({})).map((dec, index) => {
        return {
            No: index+1,
            created_at: humanReadableDate(dec.created_at?.toString()),
            // date_logged: humanReadableDate(dec.logged?.toString()),
            ...dec
        }
    })

    res.respond({  data: lessons });
});

export const addLesson = catchErrors(async (req, res) => {
    const lessonData = req.body;

    if (!lessonData) {
        res.status(400).send("Missing lesson data");
        throw new Error('Missing lesson data');
    }

    const data = await DataProvider.create();
    const lessonHandler = await LessonsLearntLogHandlers.create(data);

    const lesson = await lessonHandler.insert(lessonData);
    res.respond({ data: lesson });
})


export const updateLesson = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const lessonHandler = await LessonsLearntLogHandlers.create(data)

    const id = req.params.id;
    const updateData = req.body;
    if (!id || !updateData) {
        res.send("Missing lesson id or update data").status(400)
        throw new Error('Missing lesson id or update data');
    }

    const lesson = await lessonHandler.update({ ...updateData, id })

    res.respond({ data: lesson });
});

export const deleteLesson = catchErrors(async (req, res) => {
    const data = await DataProvider.create()
    const lessonHandler = await LessonsLearntLogHandlers.create(data)

    const id = req.params.id;
    if (!id) {
        res.send("Missing lesson id").status(400)
        throw new Error('Missing lesson id');
    }

    await lessonHandler.deleteLesson({ id })

    res.respond({ message: 'Lesson deleted successfully' });
});
