var oModelHisto={
	init:function(iProgram_,iExercize_){
		this.storageId='histo_exercize_list_'+iProgram_+'_'+iExercize_;

		var sData=localStorage.getItem(this.storageId);
		this.tData=Array();
		if(sData){
			this.tData=JSON.parse( sData );
		}
	},
	exist:function(iProgram_,iExercize_){
		if(localStorage.getItem('histo_exercize_list_'+iProgram_+'_'+iExercize_) ){
			return true;
		}else{
			return false;
		}
	},
	getList:function(){
		return this.tData;
	},
	add:function(obj_){
		var found=0;
		for(var i in this.tData){
			if(this.tData[i].datetime==obj_.datetime){
				found=1;

				this.tData[i].maxWeight=obj_.maxWeight;
				this.tData[i].maxReps=obj_.maxReps;

			}
		}

		if(found==0){
			this.tData.push(obj_);
		}
		
		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	},
	find:function(id_){
		return this.tData[id_];
	},
	/*
	update:function(id_,obj_){
		this.tData[id_]=obj_;

		localStorage.setItem(this.storageId,JSON.stringify(this.tData));
	}
	*/
}
