import * as yup from 'yup';

export const AddQuestionSchema = () => {
    return yup.object().shape({
        title: yup.string().required('Required'),
        feedback_true:yup.string().required('Required'),
        feedback_false:yup.string().required('Required'),
        answers: yup.array().of(
            yup.object().shape({
                text: yup.string().required('Required'),
            })
        ),
    });
}



export const AddExameSchema = () => {
    return yup.object().shape({
        title: yup.string().required('Required'),
        description:yup.string().required('Required'),
        vedioUrl:yup.string().required('Required'),
        questions_answers: yup.array().of(
            yup.object().shape({
                
            })
        ),
    });
}
