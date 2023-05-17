import { IRef } from "@/components/LegionsProListView";
import { ListView } from "@ant-design/react-native";
import { useRef,useState } from "react"
const useList = <T = any>(option: {
    request: (pageIndex: number,pageSize: number,params?: any) => Promise<{
        data: T[];
        total: number;
    }>;
    default_page_size: number;
}) => {
    const [total,setTotal] = useState(0);
    const curr_page = useRef(1);
    const page_size = useRef(option.default_page_size);
    const list_ref = useRef<ListView<T>>(null);
    const getList = async (
        _option?: {
            params?: any;
        }) => {
        _option = _option || {};
        let _params = { ..._option.params };
        const res = await option.request(curr_page.current,page_size.current,_params);
        setTotal(res.total);
        return res.data;

    }
    const refresh = () => {
        curr_page.current = 1;
        setTotal(0);
        list_ref.current?.refresh();
    }
    const onFetch = async (page = 1,
        startFetch: (data: T[],pageLimit: number) => void,
        abortFetch: () => void,) => {
        try {
            curr_page.current = page
            const totalPage = parseInt((((total || 0) + 20 - 1) / 20).toString());
            if (curr_page.current < totalPage||totalPage===0) {
                const res = await getList();
                startFetch(res,page_size.current)
            }
        }
        catch (err) {
            abortFetch() //manually stop the refresh or pagination if it encounters network error
        }
    }
    return {
        ref: list_ref,
        total,
        curr_page,
        page_size,
        refresh,
        onFetch,
    }
}

export default useList