import   {useState }  from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';
// import Toast from 'react-native-root-toast';
// import { useTranslation } from 'react-i18next';
import { BASE_END_POINT } from '../AppConfig';
// import { showToastErrorMSG } from '../utils/utilsFunctions';
import {message } from 'antd';
import { console_log } from '../utils/functions';

//'multipart/form-data'

export const putData = async({route , token , data ,formData})=>{
    const Data = formData ? data : JSON.stringify(data)
    // console.log(Data )

    return axios.put(`${BASE_END_POINT}/${route}`, Data , {
        headers: {
            'Content-Type': formData? 'multipart/form-data': 'application/json',
            "Authorization": token?`Bearer ${token}`:null,
            provider:"CATALYTIC_PRICE"
        },
    })
}


    
const usePutData = () => {
    const [loading , setLoading] = useState(false)
    const [resData , setresData] = useState(null)
    const [errors , setErrors] = useState(null)
    const token = useSelector(state => state?.User?.token)
    const [messageApi, contextHolder] = message.useMessage();


    const error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
          });
      };
   
    // const {t} = useTranslation()

    const putdata = async({route , data , formData})=>{
        console_log({route , data , token , formData})
        try {

            setLoading(true)
            const res = await putData({route , token , data , formData})
            console.log('resresresresres',{res} , )
           
          console_log( res?.status , "===" ,res?.status === 200 && res?.data?.success )
            if(res?.data?.header?.httpStatusCode === 200 ){
                console_log(res)
                setErrors(null)
                setresData(res.data)
                setLoading(false)
                return res?.data
            }else{
                console_log(res?.data?.header)
                setErrors(res?.data?.header)
                error(res?.data?.header?.userMessage)
                setLoading(false)
            }
            return res?.data
        } catch (error) {
            setErrors(error)
            // showToastErrorMSG(error , t)
           
            console.log("error ==> ",error)
            setLoading(false)
            return false
        } 

        setLoading(false)
    }




    return (
        {
            loading : loading,
            res:resData, 
            errors:errors,
            putData:putdata,
            contextHolder
        }
    );
}


export default usePutData;