import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { ErrorMessage, Field } from 'formik';
import  React from 'react';

const AppInput = (props) => {
    const {name , lable , type ,  placeholder , error , touched} = props

    return (
        <FormControl  isInvalid={error && touched}>
        {lable && <FormLabel htmlFor={name}>{lable}</FormLabel>}
        <Field
            {...props}
          as={Input}
          name={name}
          type={type || "text"}
          placeholder={placeholder}
        />
        {error && touched &&  <Text  color={"red"}>{error}</Text>}
      </FormControl>
    );
}

export default AppInput;