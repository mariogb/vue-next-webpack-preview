class DCLon0{
    private dc: string | null = null
    private parentDc: string | null = null
    private parentDc2: string | null = null

    private offset:number =  0
    private max: number = 4
    private currentPage:number = 1
    
    constructor(dc: string, parentDc: string, parentDc2: string) {
        this.dc = dc
        if (parentDc !== undefined) {
            this.parentDc=parentDc
        }
        if (parentDc2 !== undefined) {
            this.parentDc2 = parentDc2
        }
    }


    public  doList2():void {
        
    }



}