
import Axios from 'axios'
import { Store } from './main'


interface AuthLon{
    pkey: string,      
    access_token:string | null,
    error:string|null 
}
const URLLOGIN: string = "URLLOGIN";
const ACCESSTOKEN: string = "access_token";
class AuthStore extends Store<AuthLon>{
    
    constructor(){
        super()
        this.state.access_token = localStorage.getItem(ACCESSTOKEN)
        this.state.error=null
        this.state.pkey = ''
    }

    protected data(): AuthLon {
       return{ 
           access_token:null,
           pkey:'',
           error:null                    
       }
    }

    public putUrlLogin(server:string):void{
        localStorage.setItem(URLLOGIN,server)
    }

    updateAccessToken(access_token: string|null): void{
        if(access_token===null){
            localStorage.removeItem(ACCESSTOKEN)
        }else{
            localStorage.setItem(ACCESSTOKEN,access_token) 
        }    
        this.state.access_token=access_token
    }

    urlLogin(): string {       
        let urllogin: string | null = localStorage.getItem(URLLOGIN)
        if(urllogin===null){
            return 'localhost:8333'
        }
        return urllogin
    }

    isAuth():boolean{
        return this.state.access_token!==null
    }
    doLogout(){
        this.updateAccessToken(null)
    }
    doLogin(username:string, password:string){
        const h:string = "https://"+this.urlLogin()+'/login'
        const s0 = this
        Axios.post(h,{username,password}).then(function(response){
            let d = response.data
            s0.updateAccessToken(d.access_token)
            localStorage.setItem("refresh_token",d.refresh_token)
            
        }).catch(function(e){
            if(e.status===401){

            }
            if(e.response){
                s0.state.error=e.response.data.message
            }
            console.log('err login:::', e)
        })
    }
    
}

export const authStore: AuthStore = new AuthStore()

