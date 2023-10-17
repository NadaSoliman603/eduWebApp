import { Formik } from "formik";
import { Box, Button, Card, CardBody, CardHeader, Checkbox, Flex, Heading, VStack } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react'
import AppInput from "../../common/AppInput";
import AddQuestionModal from "./components/AddQuestionModal";
import { useRef } from "react";
import { AddExameSchema } from "../../controllers/ValidationSchema";


const initialValues = {
    title: "",
    description: "",
    vedioUrl: "",
    questions_answers: []
}

export default function AddQuestion() {
    const formikRef = useRef()
    const onSubmit = (value) => {
        console.log(value)
    }

    const onAddQuestion = (value) => {
        const val = formikRef.current?.values?.questions_answers

        formikRef.current?.setFieldValue('questions_answers', [...val, value,])

    }
    return (
        <Flex bg="gray.100" align="center" justify="center" py={20} minHeight="100vh">
            <Box bg="white" p={6} rounded="md" w={"60%"}>
                <Text as="h2" className="text-center" fontSize='3xl'>Add Exmape</Text>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    innerRef={formikRef}
                    validationSchema={AddExameSchema}
                >
                    {({ handleSubmit, errors, touched, values }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={6} align="flex-start">
                                <AppInput
                                    name="title"
                                    type="text"
                                    placeholder="Question Title"
                                    lable={"Title"} />

                                <AppInput
                                    name="description"
                                    type="text"
                                    placeholder="Question Description"
                                    lable={"Description"} />

                                <AppInput
                                    name="vedioUrl"
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=e6EGQFJLl04"
                                    lable={"Vedio Link"} />

                                <AddQuestionModal onAddQuestion={onAddQuestion} />

                                {values?.questions_answers?.map((item, index) => {
                                    return <Card key={index} flex={1} className="row" width={"100%"} >
                                        <CardBody >
                                            <Heading py={2} size='md'>{index + 1}. {item?.title}</Heading>
                                            <hr />
                                            {item?.answers.map((item, index) => {
                                                console.log(item)
                                                return <>
                                                    <Box key={index}>
                                                        <Checkbox
                                                            disabled={true}
                                                            onChange={() => { }}
                                                            padding={2}
                                                            defaultChecked={item?.is_true}
                                                        >{item?.text}</Checkbox >
                                                    </Box>
                                                </>
                                            })}

                                            <Text>feedback if true: {item?.feedback_true}</Text>
                                            <Text>feedback if false: {item?.feedback_false}</Text>
                                        </CardBody>

                                    </Card>
                                })}


                                <Button type="submit" colorScheme="purple" width="full">
                                    Add
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
        </Flex>
    );
}