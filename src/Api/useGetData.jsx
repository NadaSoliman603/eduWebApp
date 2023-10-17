import  {useState } from 'react';
import axios from "axios"
import { BASE_END_POINT } from "../AppConfig"
import { useTranslation } from 'react-i18next';
import useApiEffect from '../hooks/use-api-effect';
import { message } from 'antd';
import { console_log } from '../utils/functions';



export const getDat = ({ route, token, fullRoute }) => {
    const apiRoute = fullRoute ? fullRoute :`${ BASE_END_POINT}/${route}`
    return axios.get(`${apiRoute}`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
            "lang": 'en'
        },
    })
}


const useGetData = ({ route, notLoadData , onSucsses , params}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [errors, setErrors] = useState(null)
    const token =  sessionStorage.getItem("_UT")//useSelector(state => state?.User?.token)
    const [loadingMoredata, setLoadingMoredata] = useState(false)
    const {t} = useTranslation()
    const [messageApi, contextHolder] = message.useMessage();
     console_log({token})

    const error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
          });
      };

    const feachData = async ({ route , params }) => {
        // if (notLoadData)return;
         console_log({ route , params })
        const apiParams = new URLSearchParams(params);
        try {
            setLoading(true)
             console_log({  route  , token})
            console_log(token)
            const res = await getDat({ route:!params ? route:`${route}?${apiParams.toString()}`, token })
            
            console_log({res})
            console_log("res?.data?.header?.headerCode === 200" , res?.data?.header?.headerCode === 200)
            if (res?.data?.header?.headerCode === 200) {
                // console?.log({res})
                setData(res.data?.body)
                setLoading(false)
                const updateData = ({newData})=>{
                    setData(newData)
                }
               onSucsses(res?.data?.body , updateData)
               return res?.data
            } else {
                 // console?.log(res?.data?.header)
                setErrors(res?.data?.header)
                error(res?.data?.header?.userMessage)
            }
            setLoading(false)
            return res
        } catch (error) {
            setLoading(false)
            setErrors(true)
            // showToastErrorMSG(error , t)
            // Toast.show(error?.response?.data?.errors?.msg?.map((item=> item?.msg+" , " || "")), {
            //     type: "warning",
            //     position: Toast.positions.BOTTOM,
            //     duration: 2000,
            // })
             console_log(error)
        }
       
        setLoading(false)
    }


    useApiEffect(() => {
        if (!notLoadData) feachData({ route, token , params })
        return()=>{
            onRefresh()
        }
    }, []);


    //=====================
    //loading more Data
    //====================
    const loadMoreData = async () => {
        if (data?.links?.next) {
            // const nextParams = `page=${data?.page+1}&limit=20`
            // const nextLink = route?.includes("?")  ? `${route}&${nextParams}` : `${route}?${nextParams}`
             console_log({data ,route } , )

            try {
                // setLoadingMoredata(true)
                // const res = await getDat({ route: nextLink, token })
                // //console.log({ res })
                // setLoadingMoredata(false)
                // if (res.status === 200 && res.data.success) {
                //     //console.log(data?.data)
                //     const updatedData = { ...res?.data, data: [...data?.data, ...res?.data?.data], }
                //     setData(updatedData)
                //     //console.log({ updatedData })
                // }

            } catch (error) {
                //  console.log(error)
                // showToastErrorMSG(error , t)
            }

        }
    }


    


    //=====================
    //Reloade data 
    //====================
    const onRefresh = () => {
        feachData({ route, token })
    }

    return (
        {

            loading: loading,
            data: data,
            errors: errors,
            setData: setData,
            getData: feachData,
            loadMoreData: loadMoreData,
            loadingMoredata: loadingMoredata,
            onRefresh: onRefresh

        }
    );
}


export default useGetData;