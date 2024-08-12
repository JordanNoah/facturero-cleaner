import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, any>;
    config: AxiosRequestConfig;
    request?: any;
}

export class Axios {
    private static instance:Axios
    private readonly axiosInstance: AxiosInstance

    private constructor() {
        this.axiosInstance = axios.create({
            timeout: 5000,
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }

    public static getInstance(): Axios {
        if (!this.instance) {
            this.instance = new Axios()
        }
        return this.instance;
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance
    }

    public async get<T>(url:string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get(url, config)
    }

    public async post<T>(url:string,data?: object, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.post(url,data,config)

        if (response && response.data) {
            return response.data as T;
        } else {
            throw new Error("No data in response")
        }
    }
}