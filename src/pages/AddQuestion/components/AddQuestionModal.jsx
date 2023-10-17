import { Box, Button, Checkbox, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AppInput from '../../../common/AppInput';
import { ErrorMessage, FieldArray, Formik } from 'formik';
import { AddQuestionSchema } from '../../../controllers/ValidationSchema';

const AddQuestionModal = ({onAddQuestion}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialValues = {
    answers: [
      { text: '', is_true: false, id: new Date }
    ],
    title: "",
    feedback_true:"",
    feedback_false:""
  }


  const onSubmit = (values) => {
    onAddQuestion({...values , id:new Date()} )
    onClose()
  }
  return (
    <>
      <Button onClick={onOpen}>+ Add question</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add question</ModalHeader>
          <ModalCloseButton />

          <Formik validationSchema={AddQuestionSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ handleSubmit, errors, touched, values, handleChange, handleBlur }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <VStack spacing={6} align="flex-start">
                    <AppInput
                      name="title"
                      type="text"
                      placeholder="Question Title"
                      error={errors.title}
                      touched={touched.title}
                      lable="Title"
                    />
                     <AppInput
                      name="feedback_true"
                      placeholder="Feedback if true"
                      error={errors['feedback_true']}
                      touched={touched["feedback_true"]}
                      lable={"Feedback if true"}
                    />
                     <AppInput
                      name="feedback_false"
                      type="text"
                      placeholder="Feedback if false"
                      error={errors.feedback_false}
                      touched={touched.feedback_false}
                      lable={"Feedback if false"}
                    />

                    {/* start  answers */}
                    <FieldArray
                      name="answers"
                      render={(arrayHelpers,) => {
                        const answers = values.answers;
                        return <>
                          {values?.answers && values?.answers.length > 0 && answers?.map((item, index) => {
                            const name = values?.answers[index]
                            return (
                              <Box key={index} flex={1} width={"100%"} className='flex row justify-between	'>
                                <AppInput
                                  name={`Question${index + 1}`}
                                  type="text"
                                  placeholder={`Question ${index + 1}`}
                                  onChange={handleChange(`answers.${index}.text`)}
                                  onBlur={handleBlur(`answers.${index}.text`)}
                                  value={item?.text}
                                  error={errors.answers?.[index]?.text}
                                  touched={touched.answers?.[index]?.text}
                                />

                                <Checkbox
                                  onBlur={handleBlur(`answers.${index}.is_true`)}
                                  onChange={handleChange(`answers.${index}.is_true`)}
                                  padding={2}
                                  defaultChecked={item?.is_true}
                                >Correct</Checkbox >
                              </Box>
                            )
                          })}


                          <Button onClick={() => {
                            arrayHelpers.push({ text: "", is_true: false, id: new Date() })
                          }}>+ Add Answer</Button>

                          
                        </>
                      }}
                    />
                    {/* end  answers */}


                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant='ghost' colorScheme='red' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button type="submit" colorScheme='blue' variant='ghost'>Add</Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddQuestionModal;