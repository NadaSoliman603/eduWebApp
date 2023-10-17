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
        // vedioUrl:yup.string().required('Required'),
        vedioUrl:  yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Enter correct url')
        // questions_answers:yup.string().required('Required'),
    });
}
