import   {useState }  from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';
import { BASE_END_POINT } from '../AppConfig';
import {message } from 'antd';
import { console_log } from '../utils/functions';


export const deleteData = async({route , token , data ,})=>{

    console_log(`${BASE_END_POINT}/${route}`)

    return axios.delete(`${BASE_END_POINT}/${route}`    , {
        headers: {
            'Content-Type':  'application/json',
            "Authorization": `Bearer ${token}`,
            provider:"CATALYTIC_PRICE"
        },
    })
}


    
const useDeleteData = () => {
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
   

    const deletedata = async({route , data , })=>{
        console_log({route , data , token , })
        try {

            setLoading(true)
            const res = await deleteData({route , token , data , })       
            console_log({res})    
            if(res?.data?.header?.httpStatusCode === 200 ){
               console_log(res)
                setErrors(null)
                setresData(res.data)
                setLoading(false)
                return res
               
            }else{
                setErrors(res?.data?.header)
                error(res?.data?.header?.userMessage)
                return res
            }
           
        } catch (error) {
            setErrors(error)
            console_log(error)
            console_log("error ==> ",error)
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
            deleteData:deletedata,
            contextHolder
        }
    );
}


export default useDeleteData;