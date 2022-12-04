class Person{

    constructor(state,x,y){

        this.state=state
        this.saw = false

    }

    getstate(){
        return this.state
    }

    setstate(state){
        this.state = state
    }

    getSpecialetat(){  
        
        if( this.state == 2){
               return 1
        }
       return 0;
    }

    setsaw(boolean_){
        this.saw = boolean_
    }
    getsaw(){
        return this.saw 
    }
    
}

















