import { Box, Button, Card, Checkbox, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { quiz } from '../../constants/dataConstants';
import { CardBody } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const QuestionList = () => {
    const quiz = useSelector(state=>state?.quiz)
    return (
        <Flex bg="gray.100" align="center" justify="center" py={20} minHeight="100vh">
            <Box bg="white" p={6} rounded="md" w={"60%"}>
                <Heading>{quiz?.title}</Heading>
                <Text>{quiz?.description}</Text>
                <hr/>
                {quiz?.questions_answers?.map((item, index) => {
                    return <Box py={3}>
                        <Card key={index} flex={1} className="row" width={"100%"} >
                            <CardBody >
                                <Heading py={2} size='md'>{index + 1}. {item?.title}</Heading>
                                <hr />
                                {item?.answers.map((item, index) => {
                                    return <>
                                        <Box key={index}>
                                            <Checkbox
                                                onChange={() => { }}
                                                padding={2}
                                                defaultChecked={false}
                                            >{item?.text}</Checkbox >
                                        </Box>
                                    </>
                                })}

                                {/* <Text>feedback if true: {item?.feedback_true}</Text>
                                <Text>feedback if false: {item?.feedback_false}</Text> */}
                            </CardBody>

                        </Card>
                    </Box>
                })}
                <Button type="submit" colorScheme="purple" width="full">
                    Send
                </Button>
            </Box>
        </Flex>
    );
}

export default QuestionList;