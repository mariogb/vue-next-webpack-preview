import Axios from 'axios'
import { Store } from './main'

const buildHeaders = (): object => {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        , 'Content-Type': 'application/json;charset=UTF-8'
    }
}

const urlDCS = (key: string): string => {
    let url0: string | null = localStorage.getItem(key)
    if (url0 === null) {
        return 'localhost:8333'
    }
    return url0
}

const mapToListLon = function (m: any) {
    const list0 = m.l;
    const list2 = [];
    var ns = m.names;
    for (var idx in list0) {
        var e = list0[idx];
        var e2: any = {};
        for (var jdx = 0; jdx < ns.length; jdx++) {
            e2[ns[jdx]] = e[jdx];
        }
        list2.push(e2);
    }
    return list2;
}

const convertToLDCObject = function(dc: string, data: any): LDCObject {
    let l_ = mapToListLon(data)
    return {
        dc: dc,
        l: l_,
        names: data.names,
        offset: data.offset,
        total: data.total,
        max: data.max
    }
}

interface SProperty {
    name: string
    template: string
}


interface SMTO {
    t: string
}

interface DCModel {
    pc: string,
    ps: Array<SProperty>| undefined,
    mto: any//Array<SMTO> |undefined,
    // otm:Array |undefined
}
interface EntryDCModel {
    [key: string]: DCModel
}
interface DCMapDCModel {
    mapa: EntryDCModel //Map<string, DCModel> 
}

class DCModelStore extends Store<DCMapDCModel>{

    protected data(): DCMapDCModel {
        return {
            mapa: {}
        }
    }

    public putDCModelInMap(name: string, dcModel: DCModel) {
        this.state.mapa[name] = dcModel
    }

    public loadMasterModel(): void {
        const h = "https://" + urlDCS('URLLOGIN') + '/init0/l_models'
        const s0 = this

        Axios.get(h, { headers: buildHeaders() }).then(function (response) {
            let data: any = response.data
            s0.state.mapa = data

        }).catch(function (e) {
            console.log("Error en load")
        })
    }
}

interface DCData {
    listDcs: any
}

interface LDCObject {
    dc: string,
    l: Array<any>,
    names: Array<any>,
    offset: number,
    total: number,
    max: number
}

class DCDataStore extends Store<DCData>{
    protected data(): DCData {
        return {
            listDcs: {}
        }
    }

    doList2(payload: any): void {
        const h = "https://" + urlDCS('URLLOGIN') + '/' + payload.dc + '/l'
        const s0 = this

        Axios.get(h, { headers: buildHeaders(), params: payload.params }).then(function (response) {
            s0.state.listDcs[payload['k']] = convertToLDCObject(payload.dc, response.data)
        }).catch(function (e) {
            console.log("Error en doList2")
        })
    }

}

export const dcModelStore = new DCModelStore()

export const dcDataStore = new DCDataStore()